import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import domClass from 'dojo/dom-class';
import domConstruct from 'dojo/dom-construct';
import ErrorManager from 'argos/ErrorManager';
import Detail from 'argos/Detail';
import _LegacySDataDetailMixin from 'argos/_LegacySDataDetailMixin';
import 'dojo/NodeList-manipulate';

/**
 * @class crm.Views.Help
 *
 *
 * @extends argos.Detail
 * @mixins argos._LegacySDataDetailMixin
 *
 */
var __class = declare('crm.Views.Help', [Detail, _LegacySDataDetailMixin], {
  //Templates
  errorTemplate: new Simplate([
    '<div data-dojo-attach-point="errorNode" class="panel-validation-summary">',
    '<h2>{%: $.errorText %}</h2>',
    '<ul>',
    '<li>{%: $.errorMessageText %}</li>',
    '</ul>',
    '</div>'
  ]),

  //Localization
  titleText: 'Help',
  errorText: 'Error',
  errorMessageText: 'Unable to load the help document.',

  //View Properties
  id: 'help',
  url: 'help/help.html',
  expose: false,

  createToolLayout: function() {
    return this.tools && (this.tools.tbar = []);
  },
  onRequestFailure: function(response, o) {
    domConstruct.place(this.errorTemplate.apply(this), this.contentNode, 'last');
    domClass.remove(this.domNode, 'panel-loading');

    ErrorManager.addError(response, o, this.options, 'failure');
  },
  onLocalizedRequestFirstFailure: function() {
    Sage.SData.Client.Ajax.request({
      url: this.resolveGenericLocalizedUrl(),
      cache: true,
      success: this.onRequestSuccess,
      failure: this.onLocalizedRequestSecondFailure,
      scope: this
    });
  },
  onLocalizedRequestSecondFailure: function() {
    Sage.SData.Client.Ajax.request({
      url: this.url,
      cache: true,
      success: this.onRequestSuccess,
      failure: this.onRequestFailure,
      scope: this
    });
  },
  onRequestSuccess: function(response, o) {
    this.processContent(response, o);
    domClass.remove(this.domNode, 'panel-loading');
  },
  resolveLocalizedUrl: function() {
    var localizedUrl = string.substitute('help/help_${0}.html', [Mobile.CultureInfo['name']]);
    return localizedUrl;
  },
  resolveGenericLocalizedUrl: function() {
    var languageSpec = Mobile.CultureInfo['name'],
      languageGen = (languageSpec.indexOf('-') !== -1) ? languageSpec.split('-')[0] : languageSpec,
      localizedUrl = string.substitute('help/help_${0}.html', [languageGen]);
    return localizedUrl;
  },
  requestData: function() {
    domClass.add(this.domNode, 'panel-loading');

    Sage.SData.Client.Ajax.request({
      url: this.resolveLocalizedUrl(),
      cache: true,
      success: this.onRequestSuccess,
      failure: this.onLocalizedRequestFirstFailure,
      scope: this
    });
  },
  processContent: function(xhr) {
    domConstruct.place(xhr.responseText, this.contentNode, 'last');
  }
});

lang.setObject('Mobile.SalesLogix.Views.Help', __class);
export default __class;
