import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import EditorField from 'argos/Fields/EditorField';
import FieldManager from 'argos/FieldManager';

var control = declare('crm.Fields.AddressField', [EditorField], {
  widgetTemplate: new Simplate([
    '<label for="{%= $.name %}">{%: $.label %}</label>',
    '<button class="button simpleSubHeaderButton {% if ($$.iconClass) { %} {%: $$.iconClass %} {% } %}" aria-label="{%: $.lookupLabelText %}"><span>{%: $.lookupText %}</span></button>',
    '<div data-dojo-attach-point="inputNode"></div>'
  ]),

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

  _enableTextElement: function() {},
  _disableTextElement: function() {},
  setText: function(text) {
    this.set('addressContent', text);
  }
});

lang.setObject('Mobile.SalesLogix.Fields.AddressField', control);
export default FieldManager.register('address', control);
