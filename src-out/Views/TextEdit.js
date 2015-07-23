define('crm/Views/TextEdit', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Edit'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _argosEdit) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _Edit = _interopRequireDefault(_argosEdit);

    /**
     * @class crm.Views.TextEdit
     *
     *
     * @extends argos.Edit
     *
     */
    var __class = (0, _declare['default'])('crm.Views.TextEdit', [_Edit['default']], {
        //View Properties
        id: 'text_edit',
        titleText: 'Edit Text',

        createLayout: function createLayout() {
            return this.layout || (this.layout = [{
                label: '',
                cls: 'note-text-row',
                name: 'Notes',
                type: 'textarea'
            }]);
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Views.TextEdit', __class);
    module.exports = __class;
});
