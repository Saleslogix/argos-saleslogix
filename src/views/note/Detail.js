/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Note");

(function() {
    Mobile.SalesLogix.Note.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
        //Localization
        notesText: 'notes',
        titleText: 'Note',

        //View Properties
        editView: 'history_note_edit',
        id: 'note_detail',
        querySelect: [
            'AccountId',
            'AccountName',
            'ContactId',
            'ContactName',
            'Description',
            'LongNotes',
            'Notes',
            'OpportunityId',
            'OpportunityName',
            'TicketId',
            'TicketNumber',
            'Type',
            'LeadId',
            'LeadName',
            'StartDate'
        ],        
        resourceKind: 'history',

        provideText: function(entry) {
            return entry && (entry['LongNotes'] || entry['Notes']); 
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    label: this.notesText,
                    name: '',
                    provider: this.provideText.createDelegate(this),
                    wrap: Mobile.SalesLogix.Template.noteDetailProperty
                }
            ]);
        }
    });
})();