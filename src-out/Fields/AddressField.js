define('crm/Fields/AddressField', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Fields/EditorField', 'argos/FieldManager'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _argosFieldsEditorField, _argosFieldManager) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _EditorField = _interopRequireDefault(_argosFieldsEditorField);

    var _FieldManager = _interopRequireDefault(_argosFieldManager);

    var control = (0, _declare['default'])('crm.Fields.AddressField', [_EditorField['default']], {
        widgetTemplate: new Simplate(['<label for="{%= $.name %}">{%: $.label %}</label>', '<button class="button simpleSubHeaderButton {% if ($$.iconClass) { %} {%: $$.iconClass %} {% } %}" aria-label="{%: $.lookupLabelText %}"><span>{%: $.lookupText %}</span></button>', '<div data-dojo-attach-point="inputNode"></div>']),

        iconClass: 'fa fa-pencil fa-lg',

        attributeMap: {
            addressContent: {
                node: 'inputNode',
                type: 'innerHTML'
            }
        },
        rows: 4,
        lookupLabelText: 'edit',
        emptyText: '',

        _enableTextElement: function _enableTextElement() {},
        _disableTextElement: function _disableTextElement() {},
        setText: function setText(text) {
            this.set('addressContent', text);
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Fields.AddressField', control);
    module.exports = _FieldManager['default'].register('address', control);
});
