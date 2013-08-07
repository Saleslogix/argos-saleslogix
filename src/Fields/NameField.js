/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Fields/NameField', [
    'dojo/_base/declare',
    'Sage/Platform/Mobile/Fields/EditorField',
    'Sage/Platform/Mobile/FieldManager'
], function(
    declare,
    EditorField,
    FieldManager
) {
    var control = declare('Mobile.SalesLogix.Fields.NameField', [EditorField], {
        // Localization
        emptyText: '',

        widgetTemplate: new Simplate([
            '<label for="{%= $.name %}">{%: $.label %}</label>',
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

    return FieldManager.register('name', control);
});
