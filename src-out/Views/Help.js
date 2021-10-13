define('crm/Views/Help', ['module', 'exports', 'dojo/_base/declare', 'argos/_DetailBase', 'argos/ErrorManager', 'argos/I18n'], function (module, exports, _declare, _DetailBase2, _ErrorManager, _I18n) {
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

  const resource = (0, _I18n2.default)('help');

  const __class = (0, _declare2.default)('crm.Views.Help', [_DetailBase3.default], {
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
      const cultureName = App.context.localization.locale || 'en';
      const localizedUrl = `${baseUrl}/${cultureName}/${fileName}`;
      return localizedUrl;
    },
    resolveGenericLocalizedUrl: function resolveGenericLocalizedUrl(baseUrl, fileName) {
      const languageSpec = App.context.localization.locale || 'en';
      const languageGen = languageSpec.indexOf('-') !== -1 ? languageSpec.split('-')[0] : languageSpec;
      const localizedUrl = `${baseUrl}/${languageGen}/${fileName}`;
      return localizedUrl;
    },
    _sanitizeUrl: function _sanitizeUrl(url = '') {
      // Remove trailing slashes
      return url.replace(/[\/|\\]*$/, ''); // eslint-disable-line
    },
    requestData: function requestData() {
      this.processEntry({});
    },
    processEntry: function processEntry() {
      this.inherited(processEntry, arguments);
      // Processing the layout should be done now
      const self = this;
      Promise.all(this.promises).then(results => {
        results.forEach(result => {
          self.processContent(result.response, result.domNode);
        });
      }, e => {
        self.processContent({ responseText: self.errorTemplate.apply(self) }, e.domNode);
      });
      this.promises = [];
    },
    processContent: function processContent(xhr, domNode) {
      $(domNode).empty().append(xhr.responseText);
    },
    getHelp: function getHelp({ baseUrl, fileName, defaultUrl }, domNode) {
      const req = Sage.SData.Client.Ajax.request;
      const cleanBaseUrl = this._sanitizeUrl(baseUrl);
      return new Promise((resolve, reject) => {
        req({
          url: this.resolveLocalizedUrl(cleanBaseUrl, fileName),
          cache: true,
          success: response => resolve({ response, domNode }),
          failure: () => {
            // First failure, try to get the parent locale
            req({
              url: this.resolveGenericLocalizedUrl(cleanBaseUrl, fileName),
              cache: true,
              success: response => resolve({ response, domNode }),
              failure: () => {
                // Second failure, use the default url
                req({
                  url: defaultUrl,
                  cache: true,
                  success: response => resolve({ response, domNode }),
                  failure: (response, o) => {
                    // The default help failed. Log the error, as something is
                    // probably wrong with the layout.
                    _ErrorManager2.default.addError(response, o, this.options, 'failure');
                    reject({ response, o, domNode });
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

      const layout = [];

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