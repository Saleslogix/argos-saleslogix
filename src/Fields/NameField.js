define('Mobile/SalesLogix/Fields/NameField', [
    'dojo/_base/declare',
    'Sage/Platform/Mobile/Fields/EditorField',
    'Sage/Platform/Mobile/Fields/FieldRegistry'
], function(
    declare,
    EditorField,
    FieldRegistry
) {
    var NameField = declare('Mobile.SalesLogix.Fields.NameField', [EditorField], {
        // Localization
        emptyText: 'no name',

        widgetTemplate: new Simplate([
            '<button class="button simpleSubHeaderButton" aria-label="{%: $.lookupLabelText %}"><span>{%: $.lookupText %}</span></button>',
            '<input data-dojo-attach-point="inputNode" readonly="readonly" type="text" />'
        ]),
        createNavigationOptions: function() {
            var options = this.inherited(arguments);
            //Name does not have an entity.
            delete options.entityName;

            return options;
        }
    });

    FieldRegistry.register('name', NameField);

    return NameField;
});