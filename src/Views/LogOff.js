import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import View from 'argos/View';
import getResource from 'argos/I18n';

const resource = getResource('logOff');

const __class = declare('crm.Views.LogOff', [View], {
  // Templates
  widgetTemplate: new Simplate([
    '<div class="panel">',
    '<div class="wrapper">',
    '<div data-title="{%: $.titleText %}" class="signin {%= $.cls %}" hideBackButton="true">',
    '<p>{%= $.messageText %}</p>',
    '<p><a href="#" class="hyperlink" data-action="login">{%: $.loginText %}</a></p>',
    '</div>',
    '</div>',
    '</div>',
  ]),

  // Localization
  messageText: resource.messageText,
  loginText: resource.loginText,
  titleText: resource.titleText,

  id: 'logoff',

  login: function login() {
    window.location.reload();
  },

  createToolLayout: function createToolLayout() {
    return this.tools || (this.tools = {
      bbar: false,
      tbar: false,
    });
  },
});

lang.setObject('Mobile.SalesLogix.Views.LogOff', __class);
export default __class;
