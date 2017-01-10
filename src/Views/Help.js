import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import domConstruct from 'dojo/dom-construct';
import _DetailBase from 'argos/_DetailBase';
import ErrorManager from 'argos/ErrorManager';
import getResource from 'argos/I18n';
import 'dojo/NodeList-manipulate';

const resource = getResource('help');

/**
 * @class crm.Views.Help
 *
 *
 * @extends argos.Detail
 * @mixins argos._LegacySDataDetailMixin
 *
 */
const __class = declare('crm.Views.Help', [_DetailBase], {
  // Templates
  errorTemplate: new Simplate([
    '<div data-dojo-attach-point="errorNode">',
    '<h2>{%: $.errorText %}</h2>',
    '<ul>',
    '<li>{%: $.errorMessageText %}</li>',
    '</ul>',
    '</div>',
  ]),

  // Localization
  titleText: resource.titleText,
  errorText: resource.errorText,
  errorMessageText: resource.errorMessageText,
  sectionTitleText: resource.sectionTitleText,

  // View Properties
  id: 'help',
  expose: false,
  promises: null,
  placeDetailHeader: function placeDetailHeader() {
  },
  constructor: function constructor() {
    this.promises = [];
  },
  createToolLayout: function createToolLayout() {
    return this.tools && (this.tools.tbar = []);
  },
  resolveLocalizedUrl: function resolveLocalizedUrl(baseUrl, fileName) {
    const cultureName = Mobile.CultureInfo.name || 'en';
    const localizedUrl = string.substitute('${0}/${1}/${2}', [baseUrl, cultureName, fileName]);
    return localizedUrl;
  },
  resolveGenericLocalizedUrl: function resolveGenericLocalizedUrl(baseUrl, fileName) {
    const languageSpec = Mobile.CultureInfo.name || 'en';
    const languageGen = (languageSpec.indexOf('-') !== -1) ? languageSpec.split('-')[0] : languageSpec;
    const localizedUrl = string.substitute('${0}/${1}/${2}', [baseUrl, languageGen, fileName]);
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
    this.inherited(arguments);
    // Processing the layout should be done now
    const self = this;
    Promise.all(this.promises).then((results) => {
      results.forEach((result) => {
        self.processContent(result.response, result.domNode);
      });
    }, (e) => {
      self.processContent({ responseText: self.errorTemplate.apply(self) }, e.domNode);
    });
    this.promises = [];
  },
  processContent: function processContent(xhr, domNode) {
    domConstruct.place(xhr.responseText, domNode, 'only');
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
                  ErrorManager.addError(response, o, this.options, 'failure');
                  reject({ response, o, domNode });
                },
              });
            },
          });
        },
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
      }],
    });

    this.layout = layout;
    return layout;
  },
});

lang.setObject('Mobile.SalesLogix.Views.Help', __class);
export default __class;
