define('crm/Fields/RecurrencesField', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Fields/EditorField', 'argos/FieldManager'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _argosFieldsEditorField, _argosFieldManager) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _EditorField = _interopRequireDefault(_argosFieldsEditorField);

  var _FieldManager = _interopRequireDefault(_argosFieldManager);

  var control = (0, _declare['default'])('crm.Fields.RecurrencesField', [_EditorField['default']], {
    // Localization
    titleText: 'Recurring',
    emptyText: '',
    attributeMap: {
      noteText: {
        node: 'inputNode',
        type: 'innerHTML'
      }
    },

    widgetTemplate: new Simplate(['<label for="{%= $.name %}">{%: $.label %}</label>', '<button class="button simpleSubHeaderButton {% if ($$.iconClass) { %} {%: $$.iconClass %} {% } %}" aria-label="{%: $.lookupLabelText %}"><span>{%: $.lookupText %}</span></button>', '<div data-dojo-attach-point="inputNode" class="note-text"></div>']),
    iconClass: 'fa fa-ellipsis-h fa-lg',

    setText: function setText(text) {
      this.set('noteText', text);
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Fields.RecurrencesField', control);
  module.exports = _FieldManager['default'].register('recurrences', control);
});
