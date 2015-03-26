/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('crm/Fields/RecurrencesField', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'argos/Fields/EditorField',
    'argos/FieldManager'
], function(
    declare,
    lang,
    EditorField,
    FieldManager
) {
    var control = declare('crm.Fields.RecurrencesField', [EditorField], {
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
            '<button class="button simpleSubHeaderButton {% if ($$.iconClass) { %} {%: $$.iconClass %} {% } %}" aria-label="{%: $.lookupLabelText %}"><span>{%: $.lookupText %}</span></button>',
            '<div data-dojo-attach-point="inputNode" class="note-text"></div>'
        ]),
        iconClass: 'fa fa-ellipsis-h fa-lg',

        setText: function(text) {
            this.set('noteText', text);
        }
    });

    lang.setObject('Mobile.SalesLogix.Fields.RecurrencesField', control);
    return FieldManager.register('recurrences', control);
});
