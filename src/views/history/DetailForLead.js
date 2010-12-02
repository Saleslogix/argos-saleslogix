/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.History");

(function() {
    Mobile.SalesLogix.History.DetailForLead = Ext.extend(Mobile.SalesLogix.History.DetailBase, {
        //Localization
        companyText: 'company',
        leadText: 'lead',
        longNotesText: 'notes',
        //View Properties
        id: 'history_detail_for_lead',
        querySelect: [
            'AccountName',
            'Category',
            'CompletedDate',
            'ContactName',
            'Description',
            'Duration',
            'LeadName',
            'LongNotes',
            'OpportunityName',
            'Priority',
            'StartDate',
            'TicketNumber',
            'Timeless',
            'Type',
            'UserName'
        ],

        createLayout: function() {
            var base = Mobile.SalesLogix.History.DetailForLead.superclass.createLayout;

            return this.layout || (this.layout = base.apply(this, arguments).concat([
                {
                    name: 'LeadName',
                    label: this.leadText
                },
                {
                    name: 'AccountName',
                    label: this.companyText
                },
                {
                    name: 'LongNotes',
                    label: this.longNotesText
                }
            ]));
        }
    });
})();
