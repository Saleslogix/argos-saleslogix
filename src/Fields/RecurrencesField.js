/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Fields/RecurrencesField', [
    'dojo/_base/declare',
    'Sage/Platform/Mobile/Fields/EditorField',
    'Sage/Platform/Mobile/FieldManager'
], function(
    declare,
    EditorField,
    FieldManager
) {
    var control = declare('Mobile.SalesLogix.Fields.RecurrencesField', [EditorField], {
        // Localization
        titleText: 'Recurring',
        emptyText: '',
        attributeMap: {
            noteText: {
                node: 'inputNode',
                type: 'innerHTML'
            }
        },

        widgetTemplate: new Simplate([
            '<label for="{%= $.name %}">{%: $.label %}</label>',
            '<button class="button simpleSubHeaderButton" aria-label="{%: $.lookupLabelText %}"><span>{%: $.lookupText %}</span></button>',
            '<div data-dojo-attach-point="inputNode" class="note-text"></div>'
        ]),

        setText: function(text) {
            this.set('noteText', text);
        }
    });

    return FieldManager.register('recurrences', control);
});
