import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import View from 'argos/View';

const __class = declare('crm.Views.LogOff', [View], {
  // Templates
  widgetTemplate: new Simplate([
    '<div id="{%= $.id %}" title="{%: $.titleText %}" class="panel {%= $.cls %}" hideBackButton="true">',
    '<h3>{%= $.messageText %}</h3>',
    '<a href="" data-action="login">{%: $.loginText %}</a>',
    '</div>',
  ]),

  // Localization
  messageText: 'You have been logged out. Please close your browser window.',
  loginText: 'Click here to log back in.',
  titleText: 'Logged Out',

  id: 'logoff',

  login: function login() {
    window.open('#_login', '_blank', 'menubar,status,scrollbars,toolbar,location,personalbar');
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
