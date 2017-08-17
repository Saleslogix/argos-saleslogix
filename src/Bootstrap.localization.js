/**
 * @module crm.Bootstrap.localization
 */

export function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const http = new XMLHttpRequest();

    http.open('GET', url);
    http.addEventListener('load', (response) => {
      resolve(response.target.response);
    });
    http.addEventListener('error', err => reject(err));
    http.addEventListener('abort', err => reject(err));
    http.send();
  });
}

export function l20nLoadFunc(localeFiles) {
  return new Promise((resolve) => {
    const https = localeFiles.map(file => makeRequest(file));
    Promise.all(https).then((files) => {
      resolve(files);
    });
  });
}

export function l20nNoFetchFunc(localeFiles) {
  return new Promise((resolve) => {
    resolve(localeFiles);
  });
}

export function l20nLinkFunc(files, context, defaultContext) {
  files.forEach((file) => {
    [context, defaultContext].forEach((ctx) => {
      ctx.linkResource((locale) => {
        return [file.base, locale, file.file].join('/');
      });
    });
  });
}

export function l20nAddResourceFunc(files, context, defaultContext) {
  files.forEach((file) => {
    [context, defaultContext].forEach((ctx) => {
      ctx.addResource(file);
    });
  });
}

/**
 * Bootstrap localization
 * This function handles the bootstrapping of localization for
 * the application.
 * fetchFunc - Takes an array of processed locale files, returns a promise
 * processFunc - Takes the results from fetchFunc along with the current context and defaultContext
 */
export function bootstrapLocalization({
  supportedLocales,
  defaultLocale,
  currentLocale,
  localeFiles,
  fetchFunc = l20nNoFetchFunc,
  processFunc = l20nLinkFunc,
  asGlobal = false,
}) {
  const promise = new Promise((resolve) => {
    // The L20n context (ctx) should only call linkResource once per file.
    // We need to:
    //    * Strip out the locale from the path string (map)
    //    * Remove duplicates (reduce)
    //    * link each resource against a locale (forEach)
    const processedLocaleFiles = localeFiles.map((path) => {
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

    fetchFunc(processedLocaleFiles).then((files) => {
      const ctx = window.L20n.getContext();
      const defaultCtx = window.L20n.getContext();

      processFunc(files, ctx, defaultCtx);

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
