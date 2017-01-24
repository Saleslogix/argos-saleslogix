export function l20nLoadFunc(localeFiles) {
  return new Promise((complete) => {
    const makeRequest = url => new Promise((resolve, reject) => {
      const http = new XMLHttpRequest();

      http.open('GET', url, false);
      // http.setRequestHeader('Content-Type', 'text/plain; charset=UTF-8');
      http.addEventListener('load', (response) => {
        resolve(response.target.response);
      });
      http.addEventListener('error', err => reject(err));
      http.addEventListener('abort', err => reject(err));
      http.send();
    });

    const https = localeFiles.map(file => makeRequest(file));
    Promise.all(https).then((files) => {
      complete(files);
    });
  });
}

/**
 * Bootstrap localization
 * This function handles the bootstrapping of localization for
 * the application.
 */
export function bootstrapLocalization({
  supportedLocales,
  defaultLocale,
  currentLocale,
  localeFiles,
  fetchFunc = l20nLoadFunc,
  asGlobal = false,
}) {
  const promise = new Promise((resolve) => {
    // The L20n context (ctx) should only call linkResource once per file.
    // We need to:
    //    * Strip out the locale from the path string (map)
    //    * Remove duplicates (reduce)
    //    * link each resource against a locale (forEach)
    localeFiles.map((path) => {
      let trimmed = path;
      supportedLocales.forEach((locale) => {
        trimmed = trimmed.replace(new RegExp(`/${locale}/`), '/');
      });

      const index = trimmed.lastIndexOf('/');
      const basePath = trimmed.substring(0, index);
      const file = trimmed.substring(index + 1, trimmed.length);
      return {
        base: basePath,
        file,
      };
    })
    .reduce((p, c) => {
      if (p.some(pathInfo => pathInfo.base === c.base && pathInfo.file === c.file)) {
        return p;
      }

      return p.concat(c);
    }, []);

    fetchFunc(localeFiles).then((files) => {
      const ctx = window.L20n.getContext();
      const defaultCtx = window.L20n.getContext();

      files.forEach((file) => {
        [ctx, defaultCtx].forEach((context) => {
          context.addResource(file);
        });
      });

      ctx.registerLocales(defaultLocale, supportedLocales);
      ctx.requestLocales(currentLocale);
      defaultCtx.registerLocales(defaultLocale);
      defaultCtx.requestLocales(defaultLocale);

      window.localeContext = ctx;
      window.defaultLocaleContext = defaultCtx;

      Promise.all([new Promise((res) => {
        ctx.ready(() => res(true));
      }), new Promise((res) => {
        defaultCtx.ready(() => res(true));
      })]).then(() => {
        resolve();
      });
    });
  });
  if (asGlobal) {
    window[asGlobal] = promise;
  }
  return promise;
}
