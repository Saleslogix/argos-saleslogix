define('crm/Bootstrap', ['module', 'exports', './MingleUtility', 'argos/LanguageService'], function (module, exports, _MingleUtility, _LanguageService) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = bootstrap;

  var _MingleUtility2 = _interopRequireDefault(_MingleUtility);

  var _LanguageService2 = _interopRequireDefault(_LanguageService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @module crm/Bootstrap
   */
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

  function bootstrap(_ref) {
    var serviceWorkerPath = _ref.serviceWorkerPath,
        serviceWorkerRegistrationOptions = _ref.serviceWorkerRegistrationOptions,
        supportedLocales = _ref.supportedLocales,
        defaultLocale = _ref.defaultLocale,
        currentLocale = _ref.currentLocale,
        parentLocale = _ref.parentLocale,
        defaultRegionLocale = _ref.defaultRegionLocale,
        currentRegionLocale = _ref.currentRegionLocale,
        parentRegionLocale = _ref.parentRegionLocale,
        application = _ref.application,
        configuration = _ref.configuration,
        legacyLocalization = _ref.legacyLocalization,
        legacyLocalizationFallback = _ref.legacyLocalizationFallback,
        localeFiles = _ref.localeFiles,
        regionalFiles = _ref.regionalFiles,
        isRegionMetric = _ref.isRegionMetric,
        _ref$cacheFiles = _ref.cacheFiles,
        cacheFiles = _ref$cacheFiles === undefined ? [] : _ref$cacheFiles,
        rootElement = _ref.rootElement;

    function mapFiles(files, ctx, defaultCtx) {
      return files.map(function (path) {
        var trimmed = path;
        supportedLocales.forEach(function (locale) {
          trimmed = trimmed.replace(new RegExp('/' + locale + '/'), '/');
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
      }, []).forEach(function (pathInfo) {
        [ctx, defaultCtx].forEach(function (context) {
          context.linkResource(function (locale) {
            return [pathInfo.base, locale, pathInfo.file].join('/');
          });
        });
      });
    }
    var languageService = new _LanguageService2.default();
    var ctx = window.L20n.getContext();
    var defaultCtx = window.L20n.getContext();

    var ctxRegional = window.L20n.getContext();
    var defaultCtxRegional = window.L20n.getContext();
    var localesLong = {
      en: 'en-US',
      'en-GB': 'en-GB',
      de: 'de-DE',
      fr: 'fr-FR',
      it: 'it-IT',
      ru: 'ru-RU',
      'zh-CN': 'zh-CN',
      'zh-TW': 'zh-TW',
      es: 'es-ES',
      'pt-BR': 'pt-BR',
      ja: 'ja-JP',
      nl: 'nl-NL',
      th: 'th-TH'
    };
    // The L20n context (ctx) should only call linkResource once per file.
    // We need to:
    //    * Strip out the locale from the path string (map)
    //    * Remove duplicates (reduce)
    //    * link each resource against a locale (forEach)
    mapFiles(localeFiles, ctx, defaultCtx);
    mapFiles(regionalFiles, ctxRegional, defaultCtxRegional);

    ctx.registerLocales(defaultLocale, supportedLocales);
    ctx.requestLocales(currentLocale);
    defaultCtx.registerLocales(defaultLocale);
    defaultCtx.requestLocales(defaultLocale);

    ctxRegional.registerLocales(defaultRegionLocale, supportedLocales);
    ctxRegional.requestLocales(currentRegionLocale);
    defaultCtxRegional.registerLocales(defaultRegionLocale);
    defaultCtxRegional.requestLocales(defaultRegionLocale);

    window.localeContext = ctx;
    window.defaultLocaleContext = defaultCtx;
    window.regionalContext = ctxRegional;
    window.defaultregionalContext = defaultCtxRegional;

    // Set the window locale for the Soho Library
    var normalizedLocale = languageService.bestAvailableLocale(supportedLocales, currentLocale) || currentLocale;
    var normalizedRegionLocale = languageService.bestAvailableLocale(supportedLocales, currentRegionLocale) || currentRegionLocale;
    if (localesLong[normalizedLocale]) {
      Soho.Locale.set(localesLong[normalizedLocale]);
    }
    languageService.setLanguage(normalizedLocale || currentLocale || parentLocale || defaultLocale);
    languageService.setRegion(normalizedRegionLocale || currentRegionLocale || parentRegionLocale || defaultRegionLocale);

    Promise.all([new Promise(function (resolve) {
      ctxRegional.ready(function () {
        return resolve(true);
      });
    }), new Promise(function (resolve) {
      defaultCtxRegional.ready(function () {
        return resolve(true);
      });
    }), new Promise(function (resolve) {
      ctx.ready(function () {
        return resolve(true);
      });
    }), new Promise(function (resolve) {
      defaultCtx.ready(function () {
        return resolve(true);
      });
    })]).then(function () {
      window.require([application].concat(configuration), function (Application, appConfig) {
        var completed = false;
        var mingleAuthResults = void 0;

        if (appConfig.mingleEnabled || appConfig.enableMingle) {
          mingleAuthResults = _MingleUtility2.default.populateAccessToken(appConfig);
          if (!mingleAuthResults) {
            return;
          }
        }
        var req = function req(requires) {
          require(requires.concat('dojo/domReady!'), function () {
            if (completed) {
              return;
            }

            var results = moment.locale(parentRegionLocale);

            // moment will return the set culture if successful, otherwise it returns the currently set culture.
            // Check to see if the culture set failed, and attept to use the specific culture instead
            if (results !== parentRegionLocale.toLocaleLowerCase()) {
              results = moment.locale(currentRegionLocale);
              if (results !== currentRegionLocale.toLocaleLowerCase()) {
                console.error('Failed to set the culture for moment.js, culture set to ' + results); // eslint-disable-line
              }
            }
            var instance = new Application(appConfig);
            instance.serviceWorkerPath = serviceWorkerPath;
            instance.serviceWorkerRegistrationOptions = serviceWorkerRegistrationOptions;
            instance.context.localization = {
              localeContext: ctx,
              defaultLocaleContext: defaultCtx,
              locale: normalizedLocale || currentLocale || defaultLocale,
              region: normalizedRegionLocale || currentRegionLocale || defaultRegionLocale,
              supportedLocales: supportedLocales
            };
            instance.localeContext = ctx;
            instance.isRegionMetric = isRegionMetric;
            instance.mingleAuthResults = mingleAuthResults;
            instance.activate();
            instance.init(rootElement);
            instance.registerCacheUrls(cacheFiles);
            instance.run();
            completed = true;
          });
        };

        require.on('error', function () {
          console.log('Error loading localization, falling back to "en"'); // eslint-disable-line
          req(legacyLocalizationFallback);
        });

        req(legacyLocalization);
      });
    });
  }
  module.exports = exports['default'];
});