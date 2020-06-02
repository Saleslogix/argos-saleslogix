const CACHE_VERSION = '4.2.0';
const CURRENT_CACHE = 'argos-saleslogix-cache-v' + CACHE_VERSION; // eslint-disable-line

self.addEventListener('install', (event) => { // eslint-disable-line
  // Perform install steps
  // TODO: Add static assets here?
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
    })()
  );
  self.clients.claim();
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
      )
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

    throw new Error('Message was not understood.');
  }).catch((err) => {
    console.error(err); // eslint-disable-line
    event.ports[0].postMessage({ error: err.toString() });
  });

  event.waitUntil(promise);
});
