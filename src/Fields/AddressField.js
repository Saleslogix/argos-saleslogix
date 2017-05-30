import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import EditorField from 'argos/Fields/EditorField';
import FieldManager from 'argos/FieldManager';
import getResource from 'argos/I18n';

const resource = getResource('addressField');

const control = declare('crm.Fields.AddressField', [EditorField], {
  widgetTemplate: new Simplate([
    `<label for="{%= $.name %}">{%: $.label %}</label>
    <div class="field field-control-wrapper">
      <button
        class="button simpleSubHeaderButton field-control-trigger"
        aria-label="{%: $.lookupLabelText %}">
        <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-{%: $.iconClass %}"></use>
        </svg>
      </button>
      <label data-dojo-attach-point="inputNode"></label>
    </div>`,
  ]),
  iconClass: 'quick-edit',

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
