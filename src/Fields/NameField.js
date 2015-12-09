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
    '<label for="{%= $.name %}">{%: $.label %}</label>',
    '<button class="button simpleSubHeaderButton {% if ($$.iconClass) { %} {%: $$.iconClass %} {% } %}" aria-label="{%: $.lookupLabelText %}"><span>{%: $.lookupText %}</span></button>',
    '<input data-dojo-attach-point="inputNode" readonly="readonly" type="text" />',
  ]),

  iconClass: 'fa fa-pencil fa-lg',

  createNavigationOptions: function createNavigationOptions() {
    const options = this.inherited(arguments);
    // Name does not have an entity.
    delete options.entityName;

    return options;
  },
});

lang.setObject('Mobile.SalesLogix.Fields.NameField', control);
export default FieldManager.register('name', control);
