const CACHE_VERSION = '4.3.0';
const CURRENT_CACHE = 'argos-saleslogix-cache-v' + CACHE_VERSION; // eslint-disable-line

self.addEventListener('install', (event) => { // eslint-disable-line
  // Perform install steps
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    // Delete caches that are not current
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CURRENT_CACHE) {
            return caches.delete(cacheName);
          }

          return Promise.resolve(true);
        })
      );
    }),
    (() => {
      if (self.registration.navigationPreload) {
        return self.registration.navigationPreload.enable();
      }
    })(),
    self.clients.claim()
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
      ).catch(() => {
        if (event.request.url.includes('ping.gif')) {
          return Promise.resolve(new Response(null, { status: 408, statusText: 'timeout' }));
        }

        return caches.match('index.aspx');
      })
  );
});

// Process incoming postMessages
self.addEventListener('message', (event) => {
  const promise = caches.open(CURRENT_CACHE).then((cache) => {
    if (event.data.command === 'add') {
      if (typeof event.data.url !== 'string') {
        throw new Error('Add command must have a url');
      }

      const request = new Request(event.data.url, { mode: 'no-cors' });
      return fetch(request).then((response) => {
        return cache.put(event.data.url, response);
      }).then(() => {
        event.ports[0].postMessage({
          results: 'added',
          url: event.data.url,
        });
      });
    }

    if (event.data.command === 'addall') {
      const urls = event.data.urls;
      if (!Array.isArray(urls)) {
        throw new Error('Add all command must have a urls array');
      }

      // Attempt to fetch the first resource from the cache to see if it exists..
      return cache.match(urls[0]).then((match) => {
        // Resource exists, assume we added them all
        if (match) {
          event.ports[0].postMessage({
            results: 'skipped',
          });

          return;
        }

        return cache.addAll(urls).then(() => {
          event.ports[0].postMessage({
            results: 'added',
            length: urls.length,
          });
        });
      });
    }

    throw new Error('Message was not understood.');
  }).catch((err) => {
    event.ports[0].postMessage({ error: err.toString() });
  });

  event.waitUntil(promise);
});
