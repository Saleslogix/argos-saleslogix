/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.History");

(function() {
    Mobile.SalesLogix.History.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
        //Localization
        accountText: 'account',
        categoryText: 'category',
        companyText: 'company',
        contactText: 'contact',
        fbarHomeTitleText: 'home',
        fbarScheduleTitleText: 'schedule',
        leaderText: 'leader',
        leadText: 'lead',
        longNotesText: 'notes',
        opportunityText: 'opportunity',
        priorityText: 'priority',
        regardingText: 'regarding',
        ticketNumberText: 'ticket',
        titleText: 'History',
        typeText: 'type',

        //View Properties
        id: 'history_detail',
        querySelect: [
            'AccountName',
            'Category',
            'Company',
            'ContactName',
            'Description',
            'LeadId',
            'LeadName',
            'LongNotes',
            'OpportunityName',
            'Priority',
            'TicketNumber',
            'Type'
        ],
        resourceKind: 'history',

        formatActivityType: function(val) {
            var actTypeLookup = Mobile.SalesLogix.Activity.ActivityTypesLookup,
                histActTypeLookup = Mobile.SalesLogix.History.ActivityTypesLookup;

            return actTypeLookup[val] || histActTypeLookup[val] || val;
        },               
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    name: 'Type',
                    label: this.typeText,
                    renderer: this.formatActivityType
                },
                {
                    name: 'Description',
                    label: this.regardingText
                },
                {
                    name: 'Priority',
                    label: this.priorityText
                },
                {
                    name: 'Category',
                    label: this.categoryText
                },
                {
                    name: 'LeadId',
                    label: this.leaderText
                },
                {
                    name: 'ContactName',
                    label: this.contactText
                },
                {
                    name: 'AccountName',
                    label: this.accountText
                },
                {
                    name: 'OpportunityName',
                    label: this.opportunityText
                },
                {
                    name: 'TicketNumber',
                    label: this.ticketNumberText
                },
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
            ]);
        }        
    });
})();