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
      this.inherited(processEntry, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9IZWxwLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsImVycm9yVGVtcGxhdGUiLCJTaW1wbGF0ZSIsInRpdGxlVGV4dCIsImVycm9yVGV4dCIsImVycm9yTWVzc2FnZVRleHQiLCJzZWN0aW9uVGl0bGVUZXh0IiwiaWQiLCJleHBvc2UiLCJwcm9taXNlcyIsInBsYWNlRGV0YWlsSGVhZGVyIiwiY29uc3RydWN0b3IiLCJjcmVhdGVUb29sTGF5b3V0IiwidG9vbHMiLCJ0YmFyIiwicmVzb2x2ZUxvY2FsaXplZFVybCIsImJhc2VVcmwiLCJmaWxlTmFtZSIsImN1bHR1cmVOYW1lIiwiQXBwIiwiY29udGV4dCIsImxvY2FsaXphdGlvbiIsImxvY2FsZSIsImxvY2FsaXplZFVybCIsInJlc29sdmVHZW5lcmljTG9jYWxpemVkVXJsIiwibGFuZ3VhZ2VTcGVjIiwibGFuZ3VhZ2VHZW4iLCJpbmRleE9mIiwic3BsaXQiLCJfc2FuaXRpemVVcmwiLCJ1cmwiLCJyZXBsYWNlIiwicmVxdWVzdERhdGEiLCJwcm9jZXNzRW50cnkiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJzZWxmIiwiUHJvbWlzZSIsImFsbCIsInRoZW4iLCJyZXN1bHRzIiwiZm9yRWFjaCIsInJlc3VsdCIsInByb2Nlc3NDb250ZW50IiwicmVzcG9uc2UiLCJkb21Ob2RlIiwiZSIsInJlc3BvbnNlVGV4dCIsImFwcGx5IiwieGhyIiwiJCIsImVtcHR5IiwiYXBwZW5kIiwiZ2V0SGVscCIsImRlZmF1bHRVcmwiLCJyZXEiLCJTYWdlIiwiU0RhdGEiLCJDbGllbnQiLCJBamF4IiwicmVxdWVzdCIsImNsZWFuQmFzZVVybCIsInJlc29sdmUiLCJyZWplY3QiLCJjYWNoZSIsInN1Y2Nlc3MiLCJmYWlsdXJlIiwibyIsImFkZEVycm9yIiwib3B0aW9ucyIsIm9uSGVscFJvd0NyZWF0ZWQiLCJsYXlvdXRSb3ciLCJwdXNoIiwiY3JlYXRlTGF5b3V0IiwibGF5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QUtMLE1BQUwsR0FBY0EsTUFBZDtBQUNBLGFBQU9BLE1BQVA7QUFDRDtBQXpIc0QsR0FBekMsQ0FBaEI7O29CQTRIZTFFLE8iLCJmaWxlIjoiSGVscC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBfRGV0YWlsQmFzZSBmcm9tICdhcmdvcy9fRGV0YWlsQmFzZSc7XHJcbmltcG9ydCBFcnJvck1hbmFnZXIgZnJvbSAnYXJnb3MvRXJyb3JNYW5hZ2VyJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5pbXBvcnQgJ2Rvam8vTm9kZUxpc3QtbWFuaXB1bGF0ZSc7XHJcblxyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnaGVscCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuSGVscFxyXG4gKlxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5EZXRhaWxcclxuICogQG1peGlucyBhcmdvcy5fTGVnYWN5U0RhdGFEZXRhaWxNaXhpblxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5IZWxwJywgW19EZXRhaWxCYXNlXSwge1xyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIGVycm9yVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGRpdiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwiZXJyb3JOb2RlXCI+JyxcclxuICAgICc8aDI+eyU6ICQuZXJyb3JUZXh0ICV9PC9oMj4nLFxyXG4gICAgJzx1bD4nLFxyXG4gICAgJzxsaT57JTogJC5lcnJvck1lc3NhZ2VUZXh0ICV9PC9saT4nLFxyXG4gICAgJzwvdWw+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gIF0pLFxyXG5cclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBlcnJvclRleHQ6IHJlc291cmNlLmVycm9yVGV4dCxcclxuICBlcnJvck1lc3NhZ2VUZXh0OiByZXNvdXJjZS5lcnJvck1lc3NhZ2VUZXh0LFxyXG4gIHNlY3Rpb25UaXRsZVRleHQ6IHJlc291cmNlLnNlY3Rpb25UaXRsZVRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnaGVscCcsXHJcbiAgZXhwb3NlOiBmYWxzZSxcclxuICBwcm9taXNlczogbnVsbCxcclxuICBwbGFjZURldGFpbEhlYWRlcjogZnVuY3Rpb24gcGxhY2VEZXRhaWxIZWFkZXIoKSB7XHJcbiAgfSxcclxuICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnByb21pc2VzID0gW107XHJcbiAgfSxcclxuICBjcmVhdGVUb29sTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVUb29sTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudG9vbHMgJiYgKHRoaXMudG9vbHMudGJhciA9IFtdKTtcclxuICB9LFxyXG4gIHJlc29sdmVMb2NhbGl6ZWRVcmw6IGZ1bmN0aW9uIHJlc29sdmVMb2NhbGl6ZWRVcmwoYmFzZVVybCwgZmlsZU5hbWUpIHtcclxuICAgIGNvbnN0IGN1bHR1cmVOYW1lID0gQXBwLmNvbnRleHQubG9jYWxpemF0aW9uLmxvY2FsZSB8fCAnZW4nO1xyXG4gICAgY29uc3QgbG9jYWxpemVkVXJsID0gYCR7YmFzZVVybH0vJHtjdWx0dXJlTmFtZX0vJHtmaWxlTmFtZX1gO1xyXG4gICAgcmV0dXJuIGxvY2FsaXplZFVybDtcclxuICB9LFxyXG4gIHJlc29sdmVHZW5lcmljTG9jYWxpemVkVXJsOiBmdW5jdGlvbiByZXNvbHZlR2VuZXJpY0xvY2FsaXplZFVybChiYXNlVXJsLCBmaWxlTmFtZSkge1xyXG4gICAgY29uc3QgbGFuZ3VhZ2VTcGVjID0gQXBwLmNvbnRleHQubG9jYWxpemF0aW9uLmxvY2FsZSB8fCAnZW4nO1xyXG4gICAgY29uc3QgbGFuZ3VhZ2VHZW4gPSAobGFuZ3VhZ2VTcGVjLmluZGV4T2YoJy0nKSAhPT0gLTEpID8gbGFuZ3VhZ2VTcGVjLnNwbGl0KCctJylbMF0gOiBsYW5ndWFnZVNwZWM7XHJcbiAgICBjb25zdCBsb2NhbGl6ZWRVcmwgPSBgJHtiYXNlVXJsfS8ke2xhbmd1YWdlR2VufS8ke2ZpbGVOYW1lfWA7XHJcbiAgICByZXR1cm4gbG9jYWxpemVkVXJsO1xyXG4gIH0sXHJcbiAgX3Nhbml0aXplVXJsOiBmdW5jdGlvbiBfc2FuaXRpemVVcmwodXJsID0gJycpIHtcclxuICAgIC8vIFJlbW92ZSB0cmFpbGluZyBzbGFzaGVzXHJcbiAgICByZXR1cm4gdXJsLnJlcGxhY2UoL1tcXC98XFxcXF0qJC8sICcnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gIH0sXHJcbiAgcmVxdWVzdERhdGE6IGZ1bmN0aW9uIHJlcXVlc3REYXRhKCkge1xyXG4gICAgdGhpcy5wcm9jZXNzRW50cnkoe30pO1xyXG4gIH0sXHJcbiAgcHJvY2Vzc0VudHJ5OiBmdW5jdGlvbiBwcm9jZXNzRW50cnkoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChwcm9jZXNzRW50cnksIGFyZ3VtZW50cyk7XHJcbiAgICAvLyBQcm9jZXNzaW5nIHRoZSBsYXlvdXQgc2hvdWxkIGJlIGRvbmUgbm93XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIFByb21pc2UuYWxsKHRoaXMucHJvbWlzZXMpLnRoZW4oKHJlc3VsdHMpID0+IHtcclxuICAgICAgcmVzdWx0cy5mb3JFYWNoKChyZXN1bHQpID0+IHtcclxuICAgICAgICBzZWxmLnByb2Nlc3NDb250ZW50KHJlc3VsdC5yZXNwb25zZSwgcmVzdWx0LmRvbU5vZGUpO1xyXG4gICAgICB9KTtcclxuICAgIH0sIChlKSA9PiB7XHJcbiAgICAgIHNlbGYucHJvY2Vzc0NvbnRlbnQoeyByZXNwb25zZVRleHQ6IHNlbGYuZXJyb3JUZW1wbGF0ZS5hcHBseShzZWxmKSB9LCBlLmRvbU5vZGUpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnByb21pc2VzID0gW107XHJcbiAgfSxcclxuICBwcm9jZXNzQ29udGVudDogZnVuY3Rpb24gcHJvY2Vzc0NvbnRlbnQoeGhyLCBkb21Ob2RlKSB7XHJcbiAgICAkKGRvbU5vZGUpLmVtcHR5KCkuYXBwZW5kKHhoci5yZXNwb25zZVRleHQpO1xyXG4gIH0sXHJcbiAgZ2V0SGVscDogZnVuY3Rpb24gZ2V0SGVscCh7IGJhc2VVcmwsIGZpbGVOYW1lLCBkZWZhdWx0VXJsIH0sIGRvbU5vZGUpIHtcclxuICAgIGNvbnN0IHJlcSA9IFNhZ2UuU0RhdGEuQ2xpZW50LkFqYXgucmVxdWVzdDtcclxuICAgIGNvbnN0IGNsZWFuQmFzZVVybCA9IHRoaXMuX3Nhbml0aXplVXJsKGJhc2VVcmwpO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgcmVxKHtcclxuICAgICAgICB1cmw6IHRoaXMucmVzb2x2ZUxvY2FsaXplZFVybChjbGVhbkJhc2VVcmwsIGZpbGVOYW1lKSxcclxuICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICBzdWNjZXNzOiByZXNwb25zZSA9PiByZXNvbHZlKHsgcmVzcG9uc2UsIGRvbU5vZGUgfSksXHJcbiAgICAgICAgZmFpbHVyZTogKCkgPT4ge1xyXG4gICAgICAgICAgLy8gRmlyc3QgZmFpbHVyZSwgdHJ5IHRvIGdldCB0aGUgcGFyZW50IGxvY2FsZVxyXG4gICAgICAgICAgcmVxKHtcclxuICAgICAgICAgICAgdXJsOiB0aGlzLnJlc29sdmVHZW5lcmljTG9jYWxpemVkVXJsKGNsZWFuQmFzZVVybCwgZmlsZU5hbWUpLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogcmVzcG9uc2UgPT4gcmVzb2x2ZSh7IHJlc3BvbnNlLCBkb21Ob2RlIH0pLFxyXG4gICAgICAgICAgICBmYWlsdXJlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgLy8gU2Vjb25kIGZhaWx1cmUsIHVzZSB0aGUgZGVmYXVsdCB1cmxcclxuICAgICAgICAgICAgICByZXEoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBkZWZhdWx0VXJsLFxyXG4gICAgICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXNwb25zZSA9PiByZXNvbHZlKHsgcmVzcG9uc2UsIGRvbU5vZGUgfSksXHJcbiAgICAgICAgICAgICAgICBmYWlsdXJlOiAocmVzcG9uc2UsIG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgLy8gVGhlIGRlZmF1bHQgaGVscCBmYWlsZWQuIExvZyB0aGUgZXJyb3IsIGFzIHNvbWV0aGluZyBpc1xyXG4gICAgICAgICAgICAgICAgICAvLyBwcm9iYWJseSB3cm9uZyB3aXRoIHRoZSBsYXlvdXQuXHJcbiAgICAgICAgICAgICAgICAgIEVycm9yTWFuYWdlci5hZGRFcnJvcihyZXNwb25zZSwgbywgdGhpcy5vcHRpb25zLCAnZmFpbHVyZScpO1xyXG4gICAgICAgICAgICAgICAgICByZWplY3QoeyByZXNwb25zZSwgbywgZG9tTm9kZSB9KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgb25IZWxwUm93Q3JlYXRlZDogZnVuY3Rpb24gb25IZWxwUm93Q3JlYXRlZChsYXlvdXRSb3csIGRvbU5vZGUpIHtcclxuICAgIHRoaXMucHJvbWlzZXMucHVzaCh0aGlzLmdldEhlbHAobGF5b3V0Um93LCBkb21Ob2RlKSk7XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIGlmICh0aGlzLmxheW91dCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYXlvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbGF5b3V0ID0gW107XHJcblxyXG4gICAgbGF5b3V0LnB1c2goe1xyXG4gICAgICB0aXRsZTogdGhpcy5zZWN0aW9uVGl0bGVUZXh0LFxyXG4gICAgICBuYW1lOiAnSGVscFNlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBuYW1lOiAnQ1JNSGVscCcsXHJcbiAgICAgICAgYmFzZVVybDogJ2hlbHAvbG9jYWxlcy9jcm0nLFxyXG4gICAgICAgIGZpbGVOYW1lOiAnaGVscC5odG1sJyxcclxuICAgICAgICBkZWZhdWx0VXJsOiAnaGVscC9sb2NhbGVzL2NybS9lbi9oZWxwLmh0bWwnLFxyXG4gICAgICAgIG9uQ3JlYXRlOiB0aGlzLm9uSGVscFJvd0NyZWF0ZWQsXHJcbiAgICAgICAgY2xzOiAnY3JtaGVscCcsXHJcbiAgICAgIH1dLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5sYXlvdXQgPSBsYXlvdXQ7XHJcbiAgICByZXR1cm4gbGF5b3V0O1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19