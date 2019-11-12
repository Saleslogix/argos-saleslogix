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
    var supportedLocales = _ref.supportedLocales,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Cb290c3RyYXAuanMiXSwibmFtZXMiOlsiYm9vdHN0cmFwIiwic3VwcG9ydGVkTG9jYWxlcyIsImRlZmF1bHRMb2NhbGUiLCJjdXJyZW50TG9jYWxlIiwicGFyZW50TG9jYWxlIiwiZGVmYXVsdFJlZ2lvbkxvY2FsZSIsImN1cnJlbnRSZWdpb25Mb2NhbGUiLCJwYXJlbnRSZWdpb25Mb2NhbGUiLCJhcHBsaWNhdGlvbiIsImNvbmZpZ3VyYXRpb24iLCJsZWdhY3lMb2NhbGl6YXRpb24iLCJsZWdhY3lMb2NhbGl6YXRpb25GYWxsYmFjayIsImxvY2FsZUZpbGVzIiwicmVnaW9uYWxGaWxlcyIsImlzUmVnaW9uTWV0cmljIiwicm9vdEVsZW1lbnQiLCJtYXBGaWxlcyIsImZpbGVzIiwiY3R4IiwiZGVmYXVsdEN0eCIsIm1hcCIsInBhdGgiLCJ0cmltbWVkIiwiZm9yRWFjaCIsImxvY2FsZSIsInJlcGxhY2UiLCJSZWdFeHAiLCJpbmRleCIsImxhc3RJbmRleE9mIiwiYmFzZVBhdGgiLCJzdWJzdHJpbmciLCJmaWxlIiwibGVuZ3RoIiwiYmFzZSIsInJlZHVjZSIsInAiLCJjIiwic29tZSIsInBhdGhJbmZvIiwiY29uY2F0IiwiY29udGV4dCIsImxpbmtSZXNvdXJjZSIsImpvaW4iLCJsYW5ndWFnZVNlcnZpY2UiLCJ3aW5kb3ciLCJMMjBuIiwiZ2V0Q29udGV4dCIsImN0eFJlZ2lvbmFsIiwiZGVmYXVsdEN0eFJlZ2lvbmFsIiwibG9jYWxlc0xvbmciLCJlbiIsImRlIiwiZnIiLCJpdCIsInJ1IiwiZXMiLCJqYSIsIm5sIiwidGgiLCJyZWdpc3RlckxvY2FsZXMiLCJyZXF1ZXN0TG9jYWxlcyIsImxvY2FsZUNvbnRleHQiLCJkZWZhdWx0TG9jYWxlQ29udGV4dCIsInJlZ2lvbmFsQ29udGV4dCIsImRlZmF1bHRyZWdpb25hbENvbnRleHQiLCJub3JtYWxpemVkTG9jYWxlIiwiYmVzdEF2YWlsYWJsZUxvY2FsZSIsIm5vcm1hbGl6ZWRSZWdpb25Mb2NhbGUiLCJTb2hvIiwiTG9jYWxlIiwic2V0Iiwic2V0TGFuZ3VhZ2UiLCJzZXRSZWdpb24iLCJQcm9taXNlIiwiYWxsIiwicmVzb2x2ZSIsInJlYWR5IiwidGhlbiIsInJlcXVpcmUiLCJBcHBsaWNhdGlvbiIsImFwcENvbmZpZyIsImNvbXBsZXRlZCIsIm1pbmdsZUF1dGhSZXN1bHRzIiwibWluZ2xlRW5hYmxlZCIsImVuYWJsZU1pbmdsZSIsInBvcHVsYXRlQWNjZXNzVG9rZW4iLCJyZXEiLCJyZXF1aXJlcyIsInJlc3VsdHMiLCJtb21lbnQiLCJ0b0xvY2FsZUxvd2VyQ2FzZSIsImNvbnNvbGUiLCJlcnJvciIsImluc3RhbmNlIiwibG9jYWxpemF0aW9uIiwicmVnaW9uIiwiYWN0aXZhdGUiLCJpbml0IiwicnVuIiwib24iLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7b0JBa0J3QkEsUzs7Ozs7Ozs7Ozs7O0FBbEJ4Qjs7Ozs7Ozs7Ozs7Ozs7O0FBa0JlLFdBQVNBLFNBQVQsT0FnQlo7QUFBQSxRQWZEQyxnQkFlQyxRQWZEQSxnQkFlQztBQUFBLFFBZERDLGFBY0MsUUFkREEsYUFjQztBQUFBLFFBYkRDLGFBYUMsUUFiREEsYUFhQztBQUFBLFFBWkRDLFlBWUMsUUFaREEsWUFZQztBQUFBLFFBWERDLG1CQVdDLFFBWERBLG1CQVdDO0FBQUEsUUFWREMsbUJBVUMsUUFWREEsbUJBVUM7QUFBQSxRQVREQyxrQkFTQyxRQVREQSxrQkFTQztBQUFBLFFBUkRDLFdBUUMsUUFSREEsV0FRQztBQUFBLFFBUERDLGFBT0MsUUFQREEsYUFPQztBQUFBLFFBTkRDLGtCQU1DLFFBTkRBLGtCQU1DO0FBQUEsUUFMREMsMEJBS0MsUUFMREEsMEJBS0M7QUFBQSxRQUpEQyxXQUlDLFFBSkRBLFdBSUM7QUFBQSxRQUhEQyxhQUdDLFFBSERBLGFBR0M7QUFBQSxRQUZEQyxjQUVDLFFBRkRBLGNBRUM7QUFBQSxRQUREQyxXQUNDLFFBRERBLFdBQ0M7O0FBQ0QsYUFBU0MsUUFBVCxDQUFrQkMsS0FBbEIsRUFBeUJDLEdB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QUlkLFdBQUosQ0FBZ0JDLFNBQWhCLENBQWpCO0FBQ0FhLHFCQUFTckQsT0FBVCxDQUFpQnNELFlBQWpCLEdBQWdDO0FBQzlCakMsNkJBQWUzQyxHQURlO0FBRTlCNEMsb0NBQXNCM0MsVUFGUTtBQUc5Qkssc0JBQVF5QyxvQkFBb0I5RCxhQUFwQixJQUFxQ0QsYUFIZjtBQUk5QjZGLHNCQUFRNUIsMEJBQTBCN0QsbUJBQTFCLElBQWlERCxtQkFKM0I7QUFLOUJKO0FBTDhCLGFBQWhDO0FBT0E0RixxQkFBU2hDLGFBQVQsR0FBeUIzQyxHQUF6QjtBQUNBMkUscUJBQVMvRSxjQUFULEdBQTBCQSxjQUExQjtBQUNBK0UscUJBQVNYLGlCQUFULEdBQTZCQSxpQkFBN0I7QUFDQVcscUJBQVNHLFFBQVQ7QUFDQUgscUJBQVNJLElBQVQsQ0FBY2xGLFdBQWQ7QUFDQThFLHFCQUFTSyxHQUFUO0FBQ0FqQix3QkFBWSxJQUFaO0FBQ0QsV0E5QkQ7QUErQkQsU0FoQ0Q7O0FBa0NBSCxnQkFBUXFCLEVBQVIsQ0FBVyxPQUFYLEVBQW9CLFlBQU07QUFDeEJSLGtCQUFRUyxHQUFSLENBQVksa0RBQVosRUFEd0IsQ0FDeUM7QUFDakVkLGNBQUkzRSwwQkFBSjtBQUNELFNBSEQ7O0FBS0EyRSxZQUFJNUUsa0JBQUo7QUFDRCxPQWxERDtBQW1ERCxLQTVERDtBQTZERCIsImZpbGUiOiJCb290c3RyYXAuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgTWluZ2xlVXRpbGl0eSBmcm9tICcuL01pbmdsZVV0aWxpdHknO1xyXG5pbXBvcnQgTGFuZ3VhZ2VTZXJ2aWNlIGZyb20gJ2FyZ29zL0xhbmd1YWdlU2VydmljZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBib290c3RyYXAoe1xyXG4gIHN1cHBvcnRlZExvY2FsZXMsXHJcbiAgZGVmYXVsdExvY2FsZSxcclxuICBjdXJyZW50TG9jYWxlLFxyXG4gIHBhcmVudExvY2FsZSwgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICBkZWZhdWx0UmVnaW9uTG9jYWxlLFxyXG4gIGN1cnJlbnRSZWdpb25Mb2NhbGUsXHJcbiAgcGFyZW50UmVnaW9uTG9jYWxlLFxyXG4gIGFwcGxpY2F0aW9uLFxyXG4gIGNvbmZpZ3VyYXRpb24sXHJcbiAgbGVnYWN5TG9jYWxpemF0aW9uLFxyXG4gIGxlZ2FjeUxvY2FsaXphdGlvbkZhbGxiYWNrLFxyXG4gIGxvY2FsZUZpbGVzLFxyXG4gIHJlZ2lvbmFsRmlsZXMsXHJcbiAgaXNSZWdpb25NZXRyaWMsXHJcbiAgcm9vdEVsZW1lbnQsXHJcbn0pIHtcclxuICBmdW5jdGlvbiBtYXBGaWxlcyhmaWxlcywgY3R4LCBkZWZhdWx0Q3R4KSB7XHJcbiAgICByZXR1cm4gZmlsZXMubWFwKChwYXRoKSA9PiB7XHJcbiAgICAgIGxldCB0cmltbWVkID0gcGF0aDtcclxuICAgICAgc3VwcG9ydGVkTG9jYWxlcy5mb3JFYWNoKChsb2NhbGUpID0+IHtcclxuICAgICAgICB0cmltbWVkID0gdHJpbW1lZC5yZXBsYWNlKG5ldyBSZWdFeHAoYC8ke2xvY2FsZX0vYCksICcvJyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgaW5kZXggPSB0cmltbWVkLmxhc3RJbmRleE9mKCcvJyk7XHJcbiAgICAgIGNvbnN0IGJhc2VQYXRoID0gdHJpbW1lZC5zdWJzdHJpbmcoMCwgaW5kZXgpO1xyXG4gICAgICBjb25zdCBmaWxlID0gdHJpbW1lZC5zdWJzdHJpbmcoaW5kZXggKyAxLCB0cmltbWVkLmxlbmd0aCk7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgYmFzZTogYmFzZVBhdGgsXHJcbiAgICAgICAgZmlsZSxcclxuICAgICAgfTtcclxuICAgIH0pXHJcbiAgICAgIC5yZWR1Y2UoKHAsIGMpID0+IHtcclxuICAgICAgICBpZiAocC5zb21lKChwYXRoSW5mbykgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHBhdGhJbmZvLmJhc2UgPT09IGMuYmFzZSAmJiBwYXRoSW5mby5maWxlID09PSBjLmZpbGU7XHJcbiAgICAgICAgfSkpIHtcclxuICAgICAgICAgIHJldHVybiBwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHAuY29uY2F0KGMpO1xyXG4gICAgICB9LCBbXSlcclxuICAgICAgLmZvckVhY2goKHBhdGhJbmZvKSA9PiB7XHJcbiAgICAgICAgW2N0eCwgZGVmYXVsdEN0eF0uZm9yRWFjaCgoY29udGV4dCkgPT4ge1xyXG4gICAgICAgICAgY29udGV4dC5saW5rUmVzb3VyY2UoKGxvY2FsZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gW3BhdGhJbmZvLmJhc2UsIGxvY2FsZSwgcGF0aEluZm8uZmlsZV0uam9pbignLycpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuICBjb25zdCBsYW5ndWFnZVNlcnZpY2UgPSBuZXcgTGFuZ3VhZ2VTZXJ2aWNlKCk7XHJcbiAgY29uc3QgY3R4ID0gd2luZG93LkwyMG4uZ2V0Q29udGV4dCgpO1xyXG4gIGNvbnN0IGRlZmF1bHRDdHggPSB3aW5kb3cuTDIwbi5nZXRDb250ZXh0KCk7XHJcblxyXG4gIGNvbnN0IGN0eFJlZ2lvbmFsID0gd2luZG93LkwyMG4uZ2V0Q29udGV4dCgpO1xyXG4gIGNvbnN0IGRlZmF1bHRDdHhSZWdpb25hbCA9IHdpbmRvdy5MMjBuLmdldENvbnRleHQoKTtcclxuICBjb25zdCBsb2NhbGVzTG9uZyA9IHtcclxuICAgIGVuOiAnZW4tVVMnLFxyXG4gICAgJ2VuLUdCJzogJ2VuLUdCJyxcclxuICAgIGRlOiAnZGUtREUnLFxyXG4gICAgZnI6ICdmci1GUicsXHJcbiAgICBpdDogJ2l0LUlUJyxcclxuICAgIHJ1OiAncnUtUlUnLFxyXG4gICAgJ3poLUNOJzogJ3poLUNOJyxcclxuICAgICd6aC1UVyc6ICd6aC1UVycsXHJcbiAgICBlczogJ2VzLUVTJyxcclxuICAgICdwdC1CUic6ICdwdC1CUicsXHJcbiAgICBqYTogJ2phLUpQJyxcclxuICAgIG5sOiAnbmwtTkwnLFxyXG4gICAgdGg6ICd0aC1USCcsXHJcbiAgfTtcclxuICAvLyBUaGUgTDIwbiBjb250ZXh0IChjdHgpIHNob3VsZCBvbmx5IGNhbGwgbGlua1Jlc291cmNlIG9uY2UgcGVyIGZpbGUuXHJcbiAgLy8gV2UgbmVlZCB0bzpcclxuICAvLyAgICAqIFN0cmlwIG91dCB0aGUgbG9jYWxlIGZyb20gdGhlIHBhdGggc3RyaW5nIChtYXApXHJcbiAgLy8gICAgKiBSZW1vdmUgZHVwbGljYXRlcyAocmVkdWNlKVxyXG4gIC8vICAgICogbGluayBlYWNoIHJlc291cmNlIGFnYWluc3QgYSBsb2NhbGUgKGZvckVhY2gpXHJcbiAgbWFwRmlsZXMobG9jYWxlRmlsZXMsIGN0eCwgZGVmYXVsdEN0eCk7XHJcbiAgbWFwRmlsZXMocmVnaW9uYWxGaWxlcywgY3R4UmVnaW9uYWwsIGRlZmF1bHRDdHhSZWdpb25hbCk7XHJcblxyXG4gIGN0eC5yZWdpc3RlckxvY2FsZXMoZGVmYXVsdExvY2FsZSwgc3VwcG9ydGVkTG9jYWxlcyk7XHJcbiAgY3R4LnJlcXVlc3RMb2NhbGVzKGN1cnJlbnRMb2NhbGUpO1xyXG4gIGRlZmF1bHRDdHgucmVnaXN0ZXJMb2NhbGVzKGRlZmF1bHRMb2NhbGUpO1xyXG4gIGRlZmF1bHRDdHgucmVxdWVzdExvY2FsZXMoZGVmYXVsdExvY2FsZSk7XHJcblxyXG4gIGN0eFJlZ2lvbmFsLnJlZ2lzdGVyTG9jYWxlcyhkZWZhdWx0UmVnaW9uTG9jYWxlLCBzdXBwb3J0ZWRMb2NhbGVzKTtcclxuICBjdHhSZWdpb25hbC5yZXF1ZXN0TG9jYWxlcyhjdXJyZW50UmVnaW9uTG9jYWxlKTtcclxuICBkZWZhdWx0Q3R4UmVnaW9uYWwucmVnaXN0ZXJMb2NhbGVzKGRlZmF1bHRSZWdpb25Mb2NhbGUpO1xyXG4gIGRlZmF1bHRDdHhSZWdpb25hbC5yZXF1ZXN0TG9jYWxlcyhkZWZhdWx0UmVnaW9uTG9jYWxlKTtcclxuXHJcbiAgd2luZG93LmxvY2FsZUNvbnRleHQgPSBjdHg7XHJcbiAgd2luZG93LmRlZmF1bHRMb2NhbGVDb250ZXh0ID0gZGVmYXVsdEN0eDtcclxuICB3aW5kb3cucmVnaW9uYWxDb250ZXh0ID0gY3R4UmVnaW9uYWw7XHJcbiAgd2luZG93LmRlZmF1bHRyZWdpb25hbENvbnRleHQgPSBkZWZhdWx0Q3R4UmVnaW9uYWw7XHJcblxyXG4gIC8vIFNldCB0aGUgd2luZG93IGxvY2FsZSBmb3IgdGhlIFNvaG8gTGlicmFyeVxyXG4gIGNvbnN0IG5vcm1hbGl6ZWRMb2NhbGUgPSBsYW5ndWFnZVNlcnZpY2UuYmVzdEF2YWlsYWJsZUxvY2FsZShzdXBwb3J0ZWRMb2NhbGVzLCBjdXJyZW50TG9jYWxlKSB8fCBjdXJyZW50TG9jYWxlO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRSZWdpb25Mb2NhbGUgPSBsYW5ndWFnZVNlcnZpY2UuYmVzdEF2YWlsYWJsZUxvY2FsZShzdXBwb3J0ZWRMb2NhbGVzLCBjdXJyZW50UmVnaW9uTG9jYWxlKSB8fCBjdXJyZW50UmVnaW9uTG9jYWxlO1xyXG4gIGlmIChsb2NhbGVzTG9uZ1tub3JtYWxpemVkTG9jYWxlXSkge1xyXG4gICAgU29oby5Mb2NhbGUuc2V0KGxvY2FsZXNMb25nW25vcm1hbGl6ZWRMb2NhbGVdKTtcclxuICB9XHJcbiAgbGFuZ3VhZ2VTZXJ2aWNlLnNldExhbmd1YWdlKG5vcm1hbGl6ZWRMb2NhbGUgfHwgY3VycmVudExvY2FsZSB8fCBwYXJlbnRMb2NhbGUgfHwgZGVmYXVsdExvY2FsZSk7XHJcbiAgbGFuZ3VhZ2VTZXJ2aWNlLnNldFJlZ2lvbihub3JtYWxpemVkUmVnaW9uTG9jYWxlIHx8IGN1cnJlbnRSZWdpb25Mb2NhbGUgfHwgcGFyZW50UmVnaW9uTG9jYWxlIHx8IGRlZmF1bHRSZWdpb25Mb2NhbGUpO1xyXG5cclxuICBQcm9taXNlLmFsbChbbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgIGN0eFJlZ2lvbmFsLnJlYWR5KCgpID0+IHJlc29sdmUodHJ1ZSkpO1xyXG4gIH0pLCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgZGVmYXVsdEN0eFJlZ2lvbmFsLnJlYWR5KCgpID0+IHJlc29sdmUodHJ1ZSkpO1xyXG4gIH0pLCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgY3R4LnJlYWR5KCgpID0+IHJlc29sdmUodHJ1ZSkpO1xyXG4gIH0pLCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgZGVmYXVsdEN0eC5yZWFkeSgoKSA9PiByZXNvbHZlKHRydWUpKTtcclxuICB9KV0pLnRoZW4oKCkgPT4ge1xyXG4gICAgd2luZG93LnJlcXVpcmUoW2FwcGxpY2F0aW9uXS5jb25jYXQoY29uZmlndXJhdGlvbiksIChBcHBsaWNhdGlvbiwgYXBwQ29uZmlnKSA9PiB7XHJcbiAgICAgIGxldCBjb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgbGV0IG1pbmdsZUF1dGhSZXN1bHRzO1xyXG5cclxuICAgICAgaWYgKGFwcENvbmZpZy5taW5nbGVFbmFibGVkIHx8IGFwcENvbmZpZy5lbmFibGVNaW5nbGUpIHtcclxuICAgICAgICBtaW5nbGVBdXRoUmVzdWx0cyA9IE1pbmdsZVV0aWxpdHkucG9wdWxhdGVBY2Nlc3NUb2tlbihhcHBDb25maWcpO1xyXG4gICAgICAgIGlmICghbWluZ2xlQXV0aFJlc3VsdHMpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgcmVxID0gKHJlcXVpcmVzKSA9PiB7XHJcbiAgICAgICAgcmVxdWlyZShyZXF1aXJlcy5jb25jYXQoJ2Rvam8vZG9tUmVhZHkhJyksICgpID0+IHtcclxuICAgICAgICAgIGlmIChjb21wbGV0ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGxldCByZXN1bHRzID0gbW9tZW50LmxvY2FsZShwYXJlbnRSZWdpb25Mb2NhbGUpO1xyXG5cclxuICAgICAgICAgIC8vIG1vbWVudCB3aWxsIHJldHVybiB0aGUgc2V0IGN1bHR1cmUgaWYgc3VjY2Vzc2Z1bCwgb3RoZXJ3aXNlIGl0IHJldHVybnMgdGhlIGN1cnJlbnRseSBzZXQgY3VsdHVyZS5cclxuICAgICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgY3VsdHVyZSBzZXQgZmFpbGVkLCBhbmQgYXR0ZXB0IHRvIHVzZSB0aGUgc3BlY2lmaWMgY3VsdHVyZSBpbnN0ZWFkXHJcbiAgICAgICAgICBpZiAocmVzdWx0cyAhPT0gcGFyZW50UmVnaW9uTG9jYWxlLnRvTG9jYWxlTG93ZXJDYXNlKCkpIHtcclxuICAgICAgICAgICAgcmVzdWx0cyA9IG1vbWVudC5sb2NhbGUoY3VycmVudFJlZ2lvbkxvY2FsZSk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHRzICE9PSBjdXJyZW50UmVnaW9uTG9jYWxlLnRvTG9jYWxlTG93ZXJDYXNlKCkpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gc2V0IHRoZSBjdWx0dXJlIGZvciBtb21lbnQuanMsIGN1bHR1cmUgc2V0IHRvICR7cmVzdWx0c31gKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBBcHBsaWNhdGlvbihhcHBDb25maWcpO1xyXG4gICAgICAgICAgaW5zdGFuY2UuY29udGV4dC5sb2NhbGl6YXRpb24gPSB7XHJcbiAgICAgICAgICAgIGxvY2FsZUNvbnRleHQ6IGN0eCxcclxuICAgICAgICAgICAgZGVmYXVsdExvY2FsZUNvbnRleHQ6IGRlZmF1bHRDdHgsXHJcbiAgICAgICAgICAgIGxvY2FsZTogbm9ybWFsaXplZExvY2FsZSB8fCBjdXJyZW50TG9jYWxlIHx8IGRlZmF1bHRMb2NhbGUsXHJcbiAgICAgICAgICAgIHJlZ2lvbjogbm9ybWFsaXplZFJlZ2lvbkxvY2FsZSB8fCBjdXJyZW50UmVnaW9uTG9jYWxlIHx8IGRlZmF1bHRSZWdpb25Mb2NhbGUsXHJcbiAgICAgICAgICAgIHN1cHBvcnRlZExvY2FsZXMsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgaW5zdGFuY2UubG9jYWxlQ29udGV4dCA9IGN0eDtcclxuICAgICAgICAgIGluc3RhbmNlLmlzUmVnaW9uTWV0cmljID0gaXNSZWdpb25NZXRyaWM7XHJcbiAgICAgICAgICBpbnN0YW5jZS5taW5nbGVBdXRoUmVzdWx0cyA9IG1pbmdsZUF1dGhSZXN1bHRzO1xyXG4gICAgICAgICAgaW5zdGFuY2UuYWN0aXZhdGUoKTtcclxuICAgICAgICAgIGluc3RhbmNlLmluaXQocm9vdEVsZW1lbnQpO1xyXG4gICAgICAgICAgaW5zdGFuY2UucnVuKCk7XHJcbiAgICAgICAgICBjb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgcmVxdWlyZS5vbignZXJyb3InLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGxvYWRpbmcgbG9jYWxpemF0aW9uLCBmYWxsaW5nIGJhY2sgdG8gXCJlblwiJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICByZXEobGVnYWN5TG9jYWxpemF0aW9uRmFsbGJhY2spO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJlcShsZWdhY3lMb2NhbGl6YXRpb24pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuIl19