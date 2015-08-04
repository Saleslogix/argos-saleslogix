import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import DecimalField from 'argos/Fields/DecimalField';
import FieldManager from 'argos/FieldManager';

const control = declare('crm.Fields.MultiCurrencyField', [DecimalField], {
  attributeMap: {
    inputValue: {
      node: 'inputNode',
      type: 'attribute',
      attribute: 'value',
    },
    currencyCode: {
      node: 'currencyCodeNode',
      type: 'innerHTML',
    },
  },
  widgetTemplate: new Simplate([
    '<label for="{%= $.name %}">{%: $.label %}</label>',
    '{% if ($.enableClearButton && !$.readonly) { %}',
    '<button class="clear-button" data-dojo-attach-point="clearNode" data-dojo-attach-event="onclick:_onClearClick"></button>',
    '{% } %}',
    '<span data-dojo-attach-point="currencyCodeNode" class="currency-code-editlabel">{%: $.currencyCode %}</span>',
    '<input data-dojo-attach-point="inputNode" data-dojo-attach-event="onkeyup: _onKeyUp, onblur: _onBlur, onfocus: _onFocus" class="text-input" type="{%: $.inputType %}" name="{%= $.name %}" {% if ($.readonly) { %} readonly {% } %}>',
  ]),
  currencyCode: '',
  setCurrencyCode: function setCurrencyCode(code) {
    this.set('currencyCode', code);
  },
});

lang.setObject('Mobile.SalesLogix.Fields.MultiCurrencyField', control);
export default FieldManager.register('multiCurrency', control);
