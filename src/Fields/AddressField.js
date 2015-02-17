/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('crm/Fields/AddressField', [
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

        _enableTextElement: function() {
        },
        _disableTextElement: function() {
        },
        setText: function(text) {
            this.set('addressContent', text);
        }
    });

    lang.setObject('Mobile.SalesLogix.Fields.AddressField', control);
    return FieldManager.register('address', control);
});
