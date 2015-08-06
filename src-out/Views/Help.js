define('crm/Views/Help', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'dojo/dom-class', 'dojo/dom-construct', 'argos/ErrorManager', 'argos/Detail', 'argos/_LegacySDataDetailMixin', 'dojo/NodeList-manipulate'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _dojoDomClass, _dojoDomConstruct, _argosErrorManager, _argosDetail, _argos_LegacySDataDetailMixin, _dojoNodeListManipulate) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _string = _interopRequireDefault(_dojoString);

  var _domClass = _interopRequireDefault(_dojoDomClass);

  var _domConstruct = _interopRequireDefault(_dojoDomConstruct);

  var _ErrorManager = _interopRequireDefault(_argosErrorManager);

  var _Detail = _interopRequireDefault(_argosDetail);

  var _LegacySDataDetailMixin2 = _interopRequireDefault(_argos_LegacySDataDetailMixin);

  /**
   * @class crm.Views.Help
   *
   *
   * @extends argos.Detail
   * @mixins argos._LegacySDataDetailMixin
   *
   */
  var __class = (0, _declare['default'])('crm.Views.Help', [_Detail['default'], _LegacySDataDetailMixin2['default']], {
    // Templates
    errorTemplate: new Simplate(['<div data-dojo-attach-point="errorNode" class="panel-validation-summary">', '<h2>{%: $.errorText %}</h2>', '<ul>', '<li>{%: $.errorMessageText %}</li>', '</ul>', '</div>']),

    // Localization
    titleText: 'Help',
    errorText: 'Error',
    errorMessageText: 'Unable to load the help document.',

    // View Properties
    id: 'help',
    url: 'help/help.html',
    expose: false,

    createToolLayout: function createToolLayout() {
      return this.tools && (this.tools.tbar = []);
    },
    onRequestFailure: function onRequestFailure(response, o) {
      _domConstruct['default'].place(this.errorTemplate.apply(this), this.contentNode, 'last');
      _domClass['default'].remove(this.domNode, 'panel-loading');

      _ErrorManager['default'].addError(response, o, this.options, 'failure');
    },
    onLocalizedRequestFirstFailure: function onLocalizedRequestFirstFailure() {
      Sage.SData.Client.Ajax.request({
        url: this.resolveGenericLocalizedUrl(),
        cache: true,
        success: this.onRequestSuccess,
        failure: this.onLocalizedRequestSecondFailure,
        scope: this
      });
    },
    onLocalizedRequestSecondFailure: function onLocalizedRequestSecondFailure() {
      Sage.SData.Client.Ajax.request({
        url: this.url,
        cache: true,
        success: this.onRequestSuccess,
        failure: this.onRequestFailure,
        scope: this
      });
    },
    onRequestSuccess: function onRequestSuccess(response, o) {
      this.processContent(response, o);
      _domClass['default'].remove(this.domNode, 'panel-loading');
    },
    resolveLocalizedUrl: function resolveLocalizedUrl() {
      var localizedUrl = _string['default'].substitute('help/help_${0}.html', [Mobile.CultureInfo.name]);
      return localizedUrl;
    },
    resolveGenericLocalizedUrl: function resolveGenericLocalizedUrl() {
      var languageSpec = Mobile.CultureInfo.name;
      var languageGen = languageSpec.indexOf('-') !== -1 ? languageSpec.split('-')[0] : languageSpec;
      var localizedUrl = _string['default'].substitute('help/help_${0}.html', [languageGen]);
      return localizedUrl;
    },
    requestData: function requestData() {
      _domClass['default'].add(this.domNode, 'panel-loading');

      Sage.SData.Client.Ajax.request({
        url: this.resolveLocalizedUrl(),
        cache: true,
        success: this.onRequestSuccess,
        failure: this.onLocalizedRequestFirstFailure,
        scope: this
      });
    },
    processContent: function processContent(xhr) {
      _domConstruct['default'].place(xhr.responseText, this.contentNode, 'last');
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.Help', __class);
  module.exports = __class;
});
