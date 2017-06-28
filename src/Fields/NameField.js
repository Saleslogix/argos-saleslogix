import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import EditorField from 'argos/Fields/EditorField';
import FieldManager from 'argos/FieldManager';
import getResource from 'argos/I18n';

const resource = getResource('nameField');

const control = declare('crm.Fields.NameField', [EditorField], {
  // Localization
  emptyText: resource.emptyText,
  widgetTemplate: new Simplate([
    `<label for="{%= $.name %}"
      {% if ($.required) { %}
          class="required"
      {% } %}>{%: $.label %}</label>
    <div class="field field-control-wrapper">
      <button class="button simpleSubHeaderButton field-control-trigger
        aria-label="{%: $.lookupLabelText %}">
        <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-{%: $.iconClass %}"></use>
        </svg>
      </button>
      <input data-dojo-attach-point="inputNode" readonly="readonly" type="text" />
    </div>`,
  ]),

  iconClass: 'quick-edit',

  createNavigationOptions: function createNavigationOptions() {
    const options = this.inherited(arguments);
    // Name does not have an entity.
    delete options.entityName;

    return options;
  },
});

lang.setObject('Mobile.SalesLogix.Fields.NameField', control);
export default FieldManager.register('name', control);
