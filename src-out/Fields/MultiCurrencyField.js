define('crm/Fields/MultiCurrencyField', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Fields/DecimalField', 'argos/FieldManager'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _argosFieldsDecimalField, _argosFieldManager) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _DecimalField = _interopRequireDefault(_argosFieldsDecimalField);

  var _FieldManager = _interopRequireDefault(_argosFieldManager);

  var control = (0, _declare['default'])('crm.Fields.MultiCurrencyField', [_DecimalField['default']], {
    attributeMap: {
      inputValue: {
        node: 'inputNode',
        type: 'attribute',
        attribute: 'value'
      },
      currencyCode: {
        node: 'currencyCodeNode',
        type: 'innerHTML'
      }
    },
    widgetTemplate: new Simplate(['<label for="{%= $.name %}">{%: $.label %}</label>', '{% if ($.enableClearButton && !$.readonly) { %}', '<button class="clear-button" data-dojo-attach-point="clearNode" data-dojo-attach-event="onclick:_onClearClick"></button>', '{% } %}', '<span data-dojo-attach-point="currencyCodeNode" class="currency-code-editlabel">{%: $.currencyCode %}</span>', '<input data-dojo-attach-point="inputNode" data-dojo-attach-event="onkeyup: _onKeyUp, onblur: _onBlur, onfocus: _onFocus" class="text-input" type="{%: $.inputType %}" name="{%= $.name %}" {% if ($.readonly) { %} readonly {% } %}>']),
    currencyCode: '',
    setCurrencyCode: function setCurrencyCode(code) {
      this.set('currencyCode', code);
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Fields.MultiCurrencyField', control);
  module.exports = _FieldManager['default'].register('multiCurrency', control);
});
