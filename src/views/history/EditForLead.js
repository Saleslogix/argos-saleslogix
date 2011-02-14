/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.History");

(function() {
    Mobile.SalesLogix.History.EditForLead = Ext.extend(Mobile.SalesLogix.History.EditBase, {
        //Localization
        companyText: 'company',
        leadText: 'lead',
        longNotesText: 'notes',
        longNotesTitleText: 'Notes',

        //View Properties
        id: 'history_edit_for_lead',
        querySelect: [
            'AccountId',
            'AccountName',
            'Category',
            'Company',
            'Description',
            'LeadId',
            'LeadName',
            'LongNotes',
            'Priority',
            'Type',
            'UserId',
            'UserName'
        ],

        createLayout: function() {
            var layout = Mobile.SalesLogix.History.EditForLead.superclass.createLayout.apply(this, arguments),
                lastItem = layout.length - 1,
                moreSection = layout[lastItem];
                
            this.layout = layout;
            this.layout[lastItem].as = moreSection.as.concat([
                {
                    label: this.companyText,
                    name: 'AccountName',
                    type: 'text'
                },
                {
                    label: this.leadText,
                    name: 'Lead',
                    type: 'lookup',
                    emptyText: '',
                    applyTo: '.',
                    valueKeyProperty: 'LeadId',
                    valueTextProperty: 'LeadName',
                    view: 'lead_related'
                }
            ]);

            return this.layout;
        }        
    });
})();