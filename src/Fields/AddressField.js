define('Mobile/SalesLogix/Fields/AddressField', [
    'dojo/_base/declare',
    'Argos/Fields/EditorField'
], function(
    declare,
    EditorField
) {
    return declare('Mobile.SalesLogix.Fields.AddressField', [EditorField], {
        widgetTemplate: new Simplate([
            '<button class="button simpleSubHeaderButton" aria-label="{%: $.lookupLabelText %}"><span>{%: $.lookupText %}</span></button>',
            '<div data-dojo-attach-point="inputNode"></div>'
        ]),
        attributeMap: {
            addressContent : {
                node: 'inputNode',
                type: 'innerHTML'
            }
        },
        rows: 4,
        lookupLabelText: 'edit',
        emptyText: 'no address',

        _enableTextElement: function() {
        },
        _disableTextElement: function() {
        },
        setText: function(text) {
            this.set('addressContent', text);
        }
    });
});