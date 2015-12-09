import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import EditorField from 'argos/Fields/EditorField';
import FieldManager from 'argos/FieldManager';
import getResource from 'argos/I18n';

const resource = getResource('addressField');

const control = declare('crm.Fields.AddressField', [EditorField], {
  widgetTemplate: new Simplate([
    '<label for="{%= $.name %}">{%: $.label %}</label>',
    '<button class="button simpleSubHeaderButton {% if ($$.iconClass) { %} {%: $$.iconClass %} {% } %}" aria-label="{%: $.lookupLabelText %}"><span>{%: $.lookupText %}</span></button>',
    '<div data-dojo-attach-point="inputNode"></div>',
  ]),

  iconClass: 'fa fa-pencil fa-lg',

  attributeMap: {
    addressContent: {
      node: 'inputNode',
      type: 'innerHTML',
    },
  },
  rows: 4,
  lookupLabelText: resource.lookupLabelText,
  emptyText: resource.emptyText,

  _enableTextElement: function _enableTextElement() {},
  _disableTextElement: function _disableTextElement() {},
  setText: function setText(text) {
    this.set('addressContent', text);
  },
});

lang.setObject('Mobile.SalesLogix.Fields.AddressField', control);
export default FieldManager.register('address', control);
