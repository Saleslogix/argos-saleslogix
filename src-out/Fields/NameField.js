define('crm/Fields/NameField', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Fields/EditorField', 'argos/FieldManager'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _argosFieldsEditorField, _argosFieldManager) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _EditorField = _interopRequireDefault(_argosFieldsEditorField);

    var _FieldManager = _interopRequireDefault(_argosFieldManager);

    var control = (0, _declare['default'])('crm.Fields.NameField', [_EditorField['default']], {
        // Localization
        emptyText: '',

        widgetTemplate: new Simplate(['<label for="{%= $.name %}">{%: $.label %}</label>', '<button class="button simpleSubHeaderButton {% if ($$.iconClass) { %} {%: $$.iconClass %} {% } %}" aria-label="{%: $.lookupLabelText %}"><span>{%: $.lookupText %}</span></button>', '<input data-dojo-attach-point="inputNode" readonly="readonly" type="text" />']),

        iconClass: 'fa fa-pencil fa-lg',

        createNavigationOptions: function createNavigationOptions() {
            var options = this.inherited(arguments);
            //Name does not have an entity.
            delete options.entityName;

            return options;
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Fields.NameField', control);
    module.exports = _FieldManager['default'].register('name', control);
});
