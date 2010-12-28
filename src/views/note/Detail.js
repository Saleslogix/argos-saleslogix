/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Note");

(function() {
    Mobile.SalesLogix.Note.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
        //Localization
        fbarHomeTitleText: 'home',
        notesText: 'notes',
        titleText: 'Note',

        //View Properties
        editView: 'note_edit',
        id: 'note_detail',
        querySelect: [
            'Notes',
            'LongNotes'
        ],        
        resourceKind: 'history',

        provideText: function(entry) {
            return entry && (entry['LongNotes'] || entry['Notes']); 
        },
        renderText: function(text) {
            var encoded = Sage.Platform.Mobile.Format.encode(text);

            return Sage.Platform.Mobile.Format.nl2br(encoded);
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    label: this.notesText,
                    name: '',
                    provider: this.provideText.createDelegate(this),
                    renderer: this.renderText.createDelegate(this)
                }
            ]);
        }
    });
})();