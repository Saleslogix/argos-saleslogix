define('crm/Bootstrap.localization', ['exports'], function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.makeRequest = makeRequest;
  exports.l20nLoadFunc = l20nLoadFunc;
  exports.l20nNoFetchFunc = l20nNoFetchFunc;
  exports.l20nLinkFunc = l20nLinkFunc;
  exports.l20nAddResourceFunc = l20nAddResourceFunc;
  exports.bootstrapLocalization = bootstrapLocalization;
  /* Copyright 2017 Infor
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @module crm/Bootstrap/localization
   */

  function makeRequest(url) {
    return new Promise((resolve, reject) => {
      const http = new XMLHttpRequest();

      http.open('GET', url);
      http.addEventListener('load', response => {
        resolve(response.target.response);
      });
      http.addEventListener('error', err => reject(err));
      http.addEventListener('abort', err => reject(err));
      http.send();
    });
  }

  function l20nLoadFunc(localeFiles) {
    return new Promise(resolve => {
      const https = localeFiles.map(file => makeRequest(file));
      Promise.all(https).then(files => {
        resolve(files);
      });
    });
  }

  function l20nNoFetchFunc(localeFiles) {
    return new Promise(resolve => {
      resolve(localeFiles);
    });
  }

  function l20nLinkFunc(files, context, defaultContext) {
    files.forEach(file => {
      [context, defaultContext].forEach(ctx => {
        ctx.linkResource(locale => {
          return [file.base, locale, file.file].join('/');
        });
      });
    });
  }

  function l20nAddResourceFunc(files, context, defaultContext) {
    files.forEach(file => {
      [context, defaultContext].forEach(ctx => {
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
  function bootstrapLocalization({
    supportedLocales,
    defaultLocale,
    currentLocale,
    localeFiles,
    fetchFunc = l20nNoFetchFunc,
    processFunc = l20nLinkFunc,
    asGlobal = false
  }) {
    const promise = new Promise(resolve => {
      // The L20n context (ctx) should only call linkResource once per file.
      // We need to:
      //    * Strip out the locale from the path string (map)
      //    * Remove duplicates (reduce)
      //    * link each resource against a locale (forEach)
      const processedLocaleFiles = localeFiles.map(path => {
        let trimmed = path;
        supportedLocales.forEach(locale => {
          trimmed = trimmed.replace(new RegExp(`/${locale}/`), '/');
        });

        const index = trimmed.lastIndexOf('/');
        const basePath = trimmed.substring(0, index);
        const file = trimmed.substring(index + 1, trimmed.length);
        return {
          base: basePath,
          file
        };
      }).reduce((p, c) => {
        if (p.some(pathInfo => pathInfo.base === c.base && pathInfo.file === c.file)) {
          return p;
        }

        return p.concat(c);
      }, []);

      fetchFunc(processedLocaleFiles).then(files => {
        const ctx = window.L20n.getContext();
        const defaultCtx = window.L20n.getContext();

        processFunc(files, ctx, defaultCtx);

        ctx.registerLocales(defaultLocale, supportedLocales);
        ctx.requestLocales(currentLocale);
        defaultCtx.registerLocales(defaultLocale);
        defaultCtx.requestLocales(defaultLocale);

        window.localeContext = ctx;
        window.defaultLocaleContext = defaultCtx;

        Promise.all([new Promise(res => {
          ctx.ready(() => res(true));
        }), new Promise(res => {
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
});