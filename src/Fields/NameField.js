/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('crm/Fields/NameField', [
    'dojo/_base/declare',
    'argos/Fields/EditorField',
    'argos/FieldManager'
], function(
    declare,
    EditorField,
    FieldManager
) {
    var control = declare('crm.Fields.NameField', [EditorField], {
        // Localization
        emptyText: '',

        widgetTemplate: new Simplate([
            '<label for="{%= $.name %}">{%: $.label %}</label>',
            '<button class="button simpleSubHeaderButton {% if ($$.iconClass) { %} {%: $$.iconClass %} {% } %}" aria-label="{%: $.lookupLabelText %}"><span>{%: $.lookupText %}</span></button>',
            '<input data-dojo-attach-point="inputNode" readonly="readonly" type="text" />'
        ]),

        iconClass: 'fa fa-pencil fa-lg',

        createNavigationOptions: function() {
            var options = this.inherited(arguments);
            //Name does not have an entity.
            delete options.entityName;

            return options;
        }
    });

    return FieldManager.register('name', control);
});
