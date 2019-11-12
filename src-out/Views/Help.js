define('crm/Views/Help', ['module', 'exports', 'dojo/_base/declare', 'argos/_DetailBase', 'argos/ErrorManager', 'argos/I18n', 'dojo/NodeList-manipulate'], function (module, exports, _declare, _DetailBase2, _ErrorManager, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _DetailBase3 = _interopRequireDefault(_DetailBase2);

  var _ErrorManager2 = _interopRequireDefault(_ErrorManager);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('help');

  /**
   * @class crm.Views.Help
   *
   *
   * @extends argos.Detail
   * @mixins argos._LegacySDataDetailMixin
   *
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

  var __class = (0, _declare2.default)('crm.Views.Help', [_DetailBase3.default], {
    // Templates
    errorTemplate: new Simplate(['<div data-dojo-attach-point="errorNode">', '<h2>{%: $.errorText %}</h2>', '<ul>', '<li>{%: $.errorMessageText %}</li>', '</ul>', '</div>']),

    // Localization
    titleText: resource.titleText,
    errorText: resource.errorText,
    errorMessageText: resource.errorMessageText,
    sectionTitleText: resource.sectionTitleText,

    // View Properties
    id: 'help',
    expose: false,
    promises: null,
    placeDetailHeader: function placeDetailHeader() {},
    constructor: function constructor() {
      this.promises = [];
    },
    createToolLayout: function createToolLayout() {
      return this.tools && (this.tools.tbar = []);
    },
    resolveLocalizedUrl: function resolveLocalizedUrl(baseUrl, fileName) {
      var cultureName = App.context.localization.locale || 'en';
      var localizedUrl = baseUrl + '/' + cultureName + '/' + fileName;
      return localizedUrl;
    },
    resolveGenericLocalizedUrl: function resolveGenericLocalizedUrl(baseUrl, fileName) {
      var languageSpec = App.context.localization.locale || 'en';
      var languageGen = languageSpec.indexOf('-') !== -1 ? languageSpec.split('-')[0] : languageSpec;
      var localizedUrl = baseUrl + '/' + languageGen + '/' + fileName;
      return localizedUrl;
    },
    _sanitizeUrl: function _sanitizeUrl() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      // Remove trailing slashes
      return url.replace(/[\/|\\]*$/, ''); // eslint-disable-line
    },
    requestData: function requestData() {
      this.processEntry({});
    },
    processEntry: function processEntry() {
      this.inherited(arguments);
      // Processing the layout should be done now
      var self = this;
      Promise.all(this.promises).then(function (results) {
        results.forEach(function (result) {
          self.processContent(result.response, result.domNode);
        });
      }, function (e) {
        self.processContent({ responseText: self.errorTemplate.apply(self) }, e.domNode);
      });
      this.promises = [];
    },
    processContent: function processContent(xhr, domNode) {
      $(domNode).empty().append(xhr.responseText);
    },
    getHelp: function getHelp(_ref, domNode) {
      var _this = this;

      var baseUrl = _ref.baseUrl,
          fileName = _ref.fileName,
          defaultUrl = _ref.defaultUrl;

      var req = Sage.SData.Client.Ajax.request;
      var cleanBaseUrl = this._sanitizeUrl(baseUrl);
      return new Promise(function (resolve, reject) {
        req({
          url: _this.resolveLocalizedUrl(cleanBaseUrl, fileName),
          cache: true,
          success: function success(response) {
            return resolve({ response: response, domNode: domNode });
          },
          failure: function failure() {
            // First failure, try to get the parent locale
            req({
              url: _this.resolveGenericLocalizedUrl(cleanBaseUrl, fileName),
              cache: true,
              success: function success(response) {
                return resolve({ response: response, domNode: domNode });
              },
              failure: function failure() {
                // Second failure, use the default url
                req({
                  url: defaultUrl,
                  cache: true,
                  success: function success(response) {
                    return resolve({ response: response, domNode: domNode });
                  },
                  failure: function failure(response, o) {
                    // The default help failed. Log the error, as something is
                    // probably wrong with the layout.
                    _ErrorManager2.default.addError(response, o, _this.options, 'failure');
                    reject({ response: response, o: o, domNode: domNode });
                  }
                });
              }
            });
          }
        });
      });
    },
    onHelpRowCreated: function onHelpRowCreated(layoutRow, domNode) {
      this.promises.push(this.getHelp(layoutRow, domNode));
    },
    createLayout: function createLayout() {
      if (this.layout) {
        return this.layout;
      }

      var layout = [];

      layout.push({
        title: this.sectionTitleText,
        name: 'HelpSection',
        children: [{
          name: 'CRMHelp',
          baseUrl: 'help/locales/crm',
          fileName: 'help.html',
          defaultUrl: 'help/locales/crm/en/help.html',
          onCreate: this.onHelpRowCreated,
          cls: 'crmhelp'
        }]
      });

      this.layout = layout;
      return layout;
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9IZWxwLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsImVycm9yVGVtcGxhdGUiLCJTaW1wbGF0ZSIsInRpdGxlVGV4dCIsImVycm9yVGV4dCIsImVycm9yTWVzc2FnZVRleHQiLCJzZWN0aW9uVGl0bGVUZXh0IiwiaWQiLCJleHBvc2UiLCJwcm9taXNlcyIsInBsYWNlRGV0YWlsSGVhZGVyIiwiY29uc3RydWN0b3IiLCJjcmVhdGVUb29sTGF5b3V0IiwidG9vbHMiLCJ0YmFyIiwicmVzb2x2ZUxvY2FsaXplZFVybCIsImJhc2VVcmwiLCJmaWxlTmFtZSIsImN1bHR1cmVOYW1lIiwiQXBwIiwiY29udGV4dCIsImxvY2FsaXphdGlvbiIsImxvY2FsZSIsImxvY2FsaXplZFVybCIsInJlc29sdmVHZW5lcmljTG9jYWxpemVkVXJsIiwibGFuZ3VhZ2VTcGVjIiwibGFuZ3VhZ2VHZW4iLCJpbmRleE9mIiwic3BsaXQiLCJfc2FuaXRpemVVcmwiLCJ1cmwiLCJyZXBsYWNlIiwicmVxdWVzdERhdGEiLCJwcm9jZXNzRW50cnkiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJzZWxmIiwiUHJvbWlzZSIsImFsbCIsInRoZW4iLCJyZXN1bHRzIiwiZm9yRWFjaCIsInJlc3VsdCIsInByb2Nlc3NDb250ZW50IiwicmVzcG9uc2UiLCJkb21Ob2RlIiwiZSIsInJlc3BvbnNlVGV4dCIsImFwcGx5IiwieGhyIiwiJCIsImVtcHR5IiwiYXBwZW5kIiwiZ2V0SGVscCIsImRlZmF1bHRVcmwiLCJyZXEiLCJTYWdlIiwiU0RhdGEiLCJDbGllbnQiLCJBamF4IiwicmVxdWVzdCIsImNsZWFuQmFzZVVybCIsInJlc29sdmUiLCJyZWplY3QiLCJjYWNoZSIsInN1Y2Nlc3MiLCJmYWlsdXJlIiwibyIsImFkZEVycm9yIiwib3B0aW9ucyIsIm9uSGVscFJvd0NyZWF0ZWQiLCJsYXlvdXRSb3ciLCJwdXNoIiwiY3JlYXRlTGF5b3V0IiwibGF5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QSxNQUFkO0FBQ0EsYUFBT0EsTUFBUDtBQUNEO0FBekhzRCxHQUF6QyxDQUFoQjs7b0JBNEhlMUUsTyIsImZpbGUiOiJIZWxwLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IF9EZXRhaWxCYXNlIGZyb20gJ2FyZ29zL19EZXRhaWxCYXNlJztcclxuaW1wb3J0IEVycm9yTWFuYWdlciBmcm9tICdhcmdvcy9FcnJvck1hbmFnZXInO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCAnZG9qby9Ob2RlTGlzdC1tYW5pcHVsYXRlJztcclxuXHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdoZWxwJyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5IZWxwXHJcbiAqXHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkRldGFpbFxyXG4gKiBAbWl4aW5zIGFyZ29zLl9MZWdhY3lTRGF0YURldGFpbE1peGluXHJcbiAqXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLkhlbHAnLCBbX0RldGFpbEJhc2VdLCB7XHJcbiAgLy8gVGVtcGxhdGVzXHJcbiAgZXJyb3JUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJlcnJvck5vZGVcIj4nLFxyXG4gICAgJzxoMj57JTogJC5lcnJvclRleHQgJX08L2gyPicsXHJcbiAgICAnPHVsPicsXHJcbiAgICAnPGxpPnslOiAkLmVycm9yTWVzc2FnZVRleHQgJX08L2xpPicsXHJcbiAgICAnPC91bD4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcblxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIGVycm9yVGV4dDogcmVzb3VyY2UuZXJyb3JUZXh0LFxyXG4gIGVycm9yTWVzc2FnZVRleHQ6IHJlc291cmNlLmVycm9yTWVzc2FnZVRleHQsXHJcbiAgc2VjdGlvblRpdGxlVGV4dDogcmVzb3VyY2Uuc2VjdGlvblRpdGxlVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdoZWxwJyxcclxuICBleHBvc2U6IGZhbHNlLFxyXG4gIHByb21pc2VzOiBudWxsLFxyXG4gIHBsYWNlRGV0YWlsSGVhZGVyOiBmdW5jdGlvbiBwbGFjZURldGFpbEhlYWRlcigpIHtcclxuICB9LFxyXG4gIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMucHJvbWlzZXMgPSBbXTtcclxuICB9LFxyXG4gIGNyZWF0ZVRvb2xMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZVRvb2xMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50b29scyAmJiAodGhpcy50b29scy50YmFyID0gW10pO1xyXG4gIH0sXHJcbiAgcmVzb2x2ZUxvY2FsaXplZFVybDogZnVuY3Rpb24gcmVzb2x2ZUxvY2FsaXplZFVybChiYXNlVXJsLCBmaWxlTmFtZSkge1xyXG4gICAgY29uc3QgY3VsdHVyZU5hbWUgPSBBcHAuY29udGV4dC5sb2NhbGl6YXRpb24ubG9jYWxlIHx8ICdlbic7XHJcbiAgICBjb25zdCBsb2NhbGl6ZWRVcmwgPSBgJHtiYXNlVXJsfS8ke2N1bHR1cmVOYW1lfS8ke2ZpbGVOYW1lfWA7XHJcbiAgICByZXR1cm4gbG9jYWxpemVkVXJsO1xyXG4gIH0sXHJcbiAgcmVzb2x2ZUdlbmVyaWNMb2NhbGl6ZWRVcmw6IGZ1bmN0aW9uIHJlc29sdmVHZW5lcmljTG9jYWxpemVkVXJsKGJhc2VVcmwsIGZpbGVOYW1lKSB7XHJcbiAgICBjb25zdCBsYW5ndWFnZVNwZWMgPSBBcHAuY29udGV4dC5sb2NhbGl6YXRpb24ubG9jYWxlIHx8ICdlbic7XHJcbiAgICBjb25zdCBsYW5ndWFnZUdlbiA9IChsYW5ndWFnZVNwZWMuaW5kZXhPZignLScpICE9PSAtMSkgPyBsYW5ndWFnZVNwZWMuc3BsaXQoJy0nKVswXSA6IGxhbmd1YWdlU3BlYztcclxuICAgIGNvbnN0IGxvY2FsaXplZFVybCA9IGAke2Jhc2VVcmx9LyR7bGFuZ3VhZ2VHZW59LyR7ZmlsZU5hbWV9YDtcclxuICAgIHJldHVybiBsb2NhbGl6ZWRVcmw7XHJcbiAgfSxcclxuICBfc2FuaXRpemVVcmw6IGZ1bmN0aW9uIF9zYW5pdGl6ZVVybCh1cmwgPSAnJykge1xyXG4gICAgLy8gUmVtb3ZlIHRyYWlsaW5nIHNsYXNoZXNcclxuICAgIHJldHVybiB1cmwucmVwbGFjZSgvW1xcL3xcXFxcXSokLywgJycpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgfSxcclxuICByZXF1ZXN0RGF0YTogZnVuY3Rpb24gcmVxdWVzdERhdGEoKSB7XHJcbiAgICB0aGlzLnByb2Nlc3NFbnRyeSh7fSk7XHJcbiAgfSxcclxuICBwcm9jZXNzRW50cnk6IGZ1bmN0aW9uIHByb2Nlc3NFbnRyeSgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICAvLyBQcm9jZXNzaW5nIHRoZSBsYXlvdXQgc2hvdWxkIGJlIGRvbmUgbm93XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIFByb21pc2UuYWxsKHRoaXMucHJvbWlzZXMpLnRoZW4oKHJlc3VsdHMpID0+IHtcclxuICAgICAgcmVzdWx0cy5mb3JFYWNoKChyZXN1bHQpID0+IHtcclxuICAgICAgICBzZWxmLnByb2Nlc3NDb250ZW50KHJlc3VsdC5yZXNwb25zZSwgcmVzdWx0LmRvbU5vZGUpO1xyXG4gICAgICB9KTtcclxuICAgIH0sIChlKSA9PiB7XHJcbiAgICAgIHNlbGYucHJvY2Vzc0NvbnRlbnQoeyByZXNwb25zZVRleHQ6IHNlbGYuZXJyb3JUZW1wbGF0ZS5hcHBseShzZWxmKSB9LCBlLmRvbU5vZGUpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnByb21pc2VzID0gW107XHJcbiAgfSxcclxuICBwcm9jZXNzQ29udGVudDogZnVuY3Rpb24gcHJvY2Vzc0NvbnRlbnQoeGhyLCBkb21Ob2RlKSB7XHJcbiAgICAkKGRvbU5vZGUpLmVtcHR5KCkuYXBwZW5kKHhoci5yZXNwb25zZVRleHQpO1xyXG4gIH0sXHJcbiAgZ2V0SGVscDogZnVuY3Rpb24gZ2V0SGVscCh7IGJhc2VVcmwsIGZpbGVOYW1lLCBkZWZhdWx0VXJsIH0sIGRvbU5vZGUpIHtcclxuICAgIGNvbnN0IHJlcSA9IFNhZ2UuU0RhdGEuQ2xpZW50LkFqYXgucmVxdWVzdDtcclxuICAgIGNvbnN0IGNsZWFuQmFzZVVybCA9IHRoaXMuX3Nhbml0aXplVXJsKGJhc2VVcmwpO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgcmVxKHtcclxuICAgICAgICB1cmw6IHRoaXMucmVzb2x2ZUxvY2FsaXplZFVybChjbGVhbkJhc2VVcmwsIGZpbGVOYW1lKSxcclxuICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICBzdWNjZXNzOiByZXNwb25zZSA9PiByZXNvbHZlKHsgcmVzcG9uc2UsIGRvbU5vZGUgfSksXHJcbiAgICAgICAgZmFpbHVyZTogKCkgPT4ge1xyXG4gICAgICAgICAgLy8gRmlyc3QgZmFpbHVyZSwgdHJ5IHRvIGdldCB0aGUgcGFyZW50IGxvY2FsZVxyXG4gICAgICAgICAgcmVxKHtcclxuICAgICAgICAgICAgdXJsOiB0aGlzLnJlc29sdmVHZW5lcmljTG9jYWxpemVkVXJsKGNsZWFuQmFzZVVybCwgZmlsZU5hbWUpLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogcmVzcG9uc2UgPT4gcmVzb2x2ZSh7IHJlc3BvbnNlLCBkb21Ob2RlIH0pLFxyXG4gICAgICAgICAgICBmYWlsdXJlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgLy8gU2Vjb25kIGZhaWx1cmUsIHVzZSB0aGUgZGVmYXVsdCB1cmxcclxuICAgICAgICAgICAgICByZXEoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBkZWZhdWx0VXJsLFxyXG4gICAgICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXNwb25zZSA9PiByZXNvbHZlKHsgcmVzcG9uc2UsIGRvbU5vZGUgfSksXHJcbiAgICAgICAgICAgICAgICBmYWlsdXJlOiAocmVzcG9uc2UsIG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgLy8gVGhlIGRlZmF1bHQgaGVscCBmYWlsZWQuIExvZyB0aGUgZXJyb3IsIGFzIHNvbWV0aGluZyBpc1xyXG4gICAgICAgICAgICAgICAgICAvLyBwcm9iYWJseSB3cm9uZyB3aXRoIHRoZSBsYXlvdXQuXHJcbiAgICAgICAgICAgICAgICAgIEVycm9yTWFuYWdlci5hZGRFcnJvcihyZXNwb25zZSwgbywgdGhpcy5vcHRpb25zLCAnZmFpbHVyZScpO1xyXG4gICAgICAgICAgICAgICAgICByZWplY3QoeyByZXNwb25zZSwgbywgZG9tTm9kZSB9KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgb25IZWxwUm93Q3JlYXRlZDogZnVuY3Rpb24gb25IZWxwUm93Q3JlYXRlZChsYXlvdXRSb3csIGRvbU5vZGUpIHtcclxuICAgIHRoaXMucHJvbWlzZXMucHVzaCh0aGlzLmdldEhlbHAobGF5b3V0Um93LCBkb21Ob2RlKSk7XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIGlmICh0aGlzLmxheW91dCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYXlvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbGF5b3V0ID0gW107XHJcblxyXG4gICAgbGF5b3V0LnB1c2goe1xyXG4gICAgICB0aXRsZTogdGhpcy5zZWN0aW9uVGl0bGVUZXh0LFxyXG4gICAgICBuYW1lOiAnSGVscFNlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBuYW1lOiAnQ1JNSGVscCcsXHJcbiAgICAgICAgYmFzZVVybDogJ2hlbHAvbG9jYWxlcy9jcm0nLFxyXG4gICAgICAgIGZpbGVOYW1lOiAnaGVscC5odG1sJyxcclxuICAgICAgICBkZWZhdWx0VXJsOiAnaGVscC9sb2NhbGVzL2NybS9lbi9oZWxwLmh0bWwnLFxyXG4gICAgICAgIG9uQ3JlYXRlOiB0aGlzLm9uSGVscFJvd0NyZWF0ZWQsXHJcbiAgICAgICAgY2xzOiAnY3JtaGVscCcsXHJcbiAgICAgIH1dLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5sYXlvdXQgPSBsYXlvdXQ7XHJcbiAgICByZXR1cm4gbGF5b3V0O1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19