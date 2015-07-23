define('crm/Views/LogOff', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/View'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _argosView) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _View = _interopRequireDefault(_argosView);

    var __class = (0, _declare['default'])('crm.Views.LogOff', [_View['default']], {
        //Templates
        widgetTemplate: new Simplate(['<div id="{%= $.id %}" title="{%: $.titleText %}" class="panel {%= $.cls %}" hideBackButton="true">', '<h3>{%= $.messageText %}</h3>', '<a href="" data-action="login">{%: $.loginText %}</a>', '</div>']),

        //Localization
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
                tbar: false
            });
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Views.LogOff', __class);
    module.exports = __class;
});
