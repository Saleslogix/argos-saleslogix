define('crm/Views/UpdateToolbar', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/_base/window', 'dojo/dom-class', 'argos/MainToolbar'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojo_baseWindow, _dojoDomClass, _argosMainToolbar) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _win = _interopRequireDefault(_dojo_baseWindow);

    var _domClass = _interopRequireDefault(_dojoDomClass);

    var _MainToolbar = _interopRequireDefault(_argosMainToolbar);

    /**
     * @class crm.Views.UpdateToolbar
     *
     *
     * @extends argos.MainToolbar
     *
     */
    var __class = (0, _declare['default'])('crm.Views.UpdateToolbar', [_MainToolbar['default']], {
        widgetTemplate: new Simplate(['<div class="update-toolbar">', '<h1 data-action="reload">{%= $.updateText %}</h1>', '</div>']),

        updateText: 'An update is available.  Click to reload.',

        managed: false,

        show: function show() {
            _domClass['default'].add(_win['default'].body(), 'update-available');

            this.showTools([{
                id: 'cancel',
                side: 'right',
                fn: this.cancel,
                scope: this
            }]);

            this.inherited(arguments);
        },

        showTools: function showTools() {
            this.inherited(arguments);
        },

        hide: function hide() {
            _domClass['default'].remove(_win['default'].body(), 'update-available');
        },
        reload: function reload() {
            App.reload();
        },
        cancel: function cancel() {
            this.hide();
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Views.UpdateToolbar', __class);
    module.exports = __class;
});
