define('Mobile/SalesLogix/Fields/NameField', [
    'dojo/_base/declare',
    'argos/Fields/EditorField'
], function(
    declare,
    EditorField
) {
    return declare('Mobile.SalesLogix.Fields.NameField', [EditorField], {
        // Localization
        emptyText: '',

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
});