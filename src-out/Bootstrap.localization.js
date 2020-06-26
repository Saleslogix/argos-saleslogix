define("crm/Bootstrap.localization", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.makeRequest = makeRequest;
  _exports.l20nLoadFunc = l20nLoadFunc;
  _exports.l20nNoFetchFunc = l20nNoFetchFunc;
  _exports.l20nLinkFunc = l20nLinkFunc;
  _exports.l20nAddResourceFunc = l20nAddResourceFunc;
  _exports.bootstrapLocalization = bootstrapLocalization;

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
    return new Promise(function (resolve, reject) {
      var http = new XMLHttpRequest();
      http.open('GET', url);
      http.addEventListener('load', function (response) {
        resolve(response.target.response);
      });
      http.addEventListener('error', function (err) {
        return reject(err);
      });
      http.addEventListener('abort', function (err) {
        return reject(err);
      });
      http.send();
    });
  }

  function l20nLoadFunc(localeFiles) {
    return new Promise(function (resolve) {
      var https = localeFiles.map(function (file) {
        return makeRequest(file);
      });
      Promise.all(https).then(function (files) {
        resolve(files);
      });
    });
  }

  function l20nNoFetchFunc(localeFiles) {
    return new Promise(function (resolve) {
      resolve(localeFiles);
    });
  }

  function l20nLinkFunc(files, context, defaultContext) {
    files.forEach(function (file) {
      [context, defaultContext].forEach(function (ctx) {
        ctx.linkResource(function (locale) {
          return [file.base, locale, file.file].join('/');
        });
      });
    });
  }

  function l20nAddResourceFunc(files, context, defaultContext) {
    files.forEach(function (file) {
      [context, defaultContext].forEach(function (ctx) {
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


  function bootstrapLocalization(_ref) {
    var supportedLocales = _ref.supportedLocales,
        defaultLocale = _ref.defaultLocale,
        currentLocale = _ref.currentLocale,
        localeFiles = _ref.localeFiles,
        _ref$fetchFunc = _ref.fetchFunc,
        fetchFunc = _ref$fetchFunc === void 0 ? l20nNoFetchFunc : _ref$fetchFunc,
        _ref$processFunc = _ref.processFunc,
        processFunc = _ref$processFunc === void 0 ? l20nLinkFunc : _ref$processFunc,
        _ref$asGlobal = _ref.asGlobal,
        asGlobal = _ref$asGlobal === void 0 ? false : _ref$asGlobal;
    var promise = new Promise(function (resolve) {
      // The L20n context (ctx) should only call linkResource once per file.
      // We need to:
      //    * Strip out the locale from the path string (map)
      //    * Remove duplicates (reduce)
      //    * link each resource against a locale (forEach)
      var processedLocaleFiles = localeFiles.map(function (path) {
        var trimmed = path;
        supportedLocales.forEach(function (locale) {
          trimmed = trimmed.replace(new RegExp("/".concat(locale, "/")), '/');
        });
        var index = trimmed.lastIndexOf('/');
        var basePath = trimmed.substring(0, index);
        var file = trimmed.substring(index + 1, trimmed.length);
        return {
          base: basePath,
          file: file
        };
      }).reduce(function (p, c) {
        if (p.some(function (pathInfo) {
          return pathInfo.base === c.base && pathInfo.file === c.file;
        })) {
          return p;
        }

        return p.concat(c);
      }, []);
      fetchFunc(processedLocaleFiles).then(function (files) {
        var ctx = window.L20n.getContext();
        var defaultCtx = window.L20n.getContext();
        processFunc(files, ctx, defaultCtx);
        ctx.registerLocales(defaultLocale, supportedLocales);
        ctx.requestLocales(currentLocale);
        defaultCtx.registerLocales(defaultLocale);
        defaultCtx.requestLocales(defaultLocale);
        window.localeContext = ctx;
        window.defaultLocaleContext = defaultCtx;
        Promise.all([new Promise(function (res) {
          ctx.ready(function () {
            return res(true);
          });
        }), new Promise(function (res) {
          defaultCtx.ready(function () {
            return res(true);
          });
        })]).then(function () {
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