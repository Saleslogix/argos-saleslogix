/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Account");

(function() {
    Mobile.SalesLogix.History.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        //Localization
        accountText: 'account',
        activityCategoryTitleText: 'Activity Category',
        activityDescriptionTitleText: 'Activity Description',
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
        priorityTitleText: 'Priority',
        regardingText: 'regarding',
        ticketNumberText: 'ticket',
        titleText: 'History',
        typeText: 'type',

        //View Properties
        entityName: 'History',
        id: 'history_edit',
        picklistsByType: {
            'atAppointment': {
                'Category': 'Meeting Category Codes',
                'Description': 'Meeting Regarding'
            },
            'atLiterature': {
                'Description': 'Lit Request Regarding'
            },
            'atPersonal': {
                'Category': 'Meeting Category Codes',
                'Description': 'Personal Activity Regarding'
            },
            'atPhoneCall': {
                'Category': 'Phone Call Category Codes',
                'Description': 'Phone Call Regarding'
            },
            'atToDo': {
                'Category': 'To Do Category Codes',
                'Description': 'To Do Regarding'
            }
        },
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

        formatPicklistForType: function(type, which) {
            console.log(type, which)
            return this.picklistsByType[type] && this.picklistsByType[type][which];
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    name: 'Type',
                    type: 'hidden'
                },
                {
                    dependsOn: 'Type',
                    label: this.regardingText,
                    name: 'Description',
                    picklist: this.formatPicklistForType.createDelegate(
                        this, ['Description'], true
                    ),
                    title: this.activityDescriptionTitleText,
                    type: 'picklist'
                },
                {
                    label: this.priorityText,
                    name: 'Priority',
                    picklist: 'Priorities',
                    title: this.priorityTitleText,
                    type: 'picklist'
                },
                {
                    dependsOn: 'Type',
                    label: this.categoryText,
                    name: 'Category',
                    picklist: this.formatPicklistForType.createDelegate(
                        this, ['Category'], true
                    ),
                    title: this.activityCategoryTitleText,
                    type: 'picklist'
                },
                {
                    name: 'ContactName',
                    label: this.contactText,
                    type: 'text'
                },
                {
                    name: 'AccountName',
                    label: this.accountText,
                    type: 'text'
                },
                {
                    name: 'OpportunityName',
                    label: this.opportunityText,
                    type: 'text'
                },
                {
                    name: 'TicketNumber',
                    label: this.ticketNumberText,
                    type: 'text'
                },
                {
                    name: 'LeadName',
                    label: this.leadText,
                    type: 'text'
                },
                {
                    name: 'AccountName',
                    label: this.companyText,
                    type: 'text'
                },
                {
                    name: 'LongNotes',
                    label: this.longNotesText,
                    noteProperty: false,
                    type: 'note',
                    view: 'text_edit'
                }
            ]);
        }        
    });
})();