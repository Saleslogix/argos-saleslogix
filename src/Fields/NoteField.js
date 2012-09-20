define('Mobile/SalesLogix/Fields/NoteField', [
    'dojo/_base/declare',
    'Argos/Fields/EditorField'
], function(
    declare,
    EditorField
) {
    return declare('Mobile.SalesLogix.Fields.NoteField', [EditorField], {
        attributeMap: {
            noteText: {
                node: 'inputNode',
                type: 'innerHTML'
            }
        },
        widgetTemplate: new Simplate([
            '<button class="button simpleSubHeaderButton" aria-label="{%: $.lookupLabelText %}"><span>{%: $.lookupText %}</span></button>',
            '<div data-dojo-attach-point="inputNode" class="note-text"></div>'
        ]),

        // Localization
        emptyText: '',

        noteProperty: 'Notes',

        _enableTextElement: function() {
        },
        _disableTextElement: function() {
        },
        createNavigationOptions: function() {
            var options = this.inherited(arguments);
            //Name does not have an entity.
            delete options.entityName;

            if (!this.noteProperty)
            {
                options.entry = {'Notes': options.entry};
                options.changes = {'Notes': options.changes};
            }

            if (this.title)
                options.title = this.title;

            return options;
        },
        formatValue: function(val) {
            return this.noteProperty ? val[this.noteProperty] : val;
        },
        getValue: function() {
            return this.currentValue;
        },
        getValuesFromView: function() {
            this.inherited(arguments);

            if (!this.noteProperty)
            {
                this.currentValue = this.currentValue.Notes;
                this.validationValue = this.validationValue.Notes;
            }
        },
        setText: function(text) {
            this.set('noteText', text);
        }
    });
});