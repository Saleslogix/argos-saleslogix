/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

define('Mobile/SalesLogix/Views/History/Detail', ['Sage/Platform/Mobile/Detail'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.History.Detail', [Sage.Platform.Mobile.Detail], {
        //Localization
        categoryText: 'category',
        completedText: 'completed',
        durationText: 'duration',
        leaderText: 'leader',
        longNotesText: 'notes',
        notesText: 'Notes',
        priorityText: 'priority',
        regardingText: 'regarding',
        scheduledText: 'scheduled',
        timelessText: 'timeless',
        companyText: 'company',
        leadText: 'lead',
        titleText: 'History',
        accountText: 'account',
        contactText: 'contact',
        opportunityText: 'opportunity',
        ticketNumberText: 'ticket',
        moreDetailsText: 'More Details',
        relatedItemsText: 'Related Items',
        modifiedText: 'modified',
        typeText: 'type',
        activityTypeText: {
            'atToDo': 'To-Do',
            'atPhoneCall': 'Phone Call',
            'atAppointment': 'Meeting',
            'atLiterature': 'Literature Request',
            'atPersonal': 'Personal Activity',
            'atQuestion': 'Question',
            'atEMail': 'E-mail'
        },
        //View Properties
        id: 'history_detail',
        existsRE: /^[\w]{12}$/,
        editView: 'history_edit',
        dateFormatText: 'M/d/yyyy h:mm:ss tt',
        resourceKind: 'history',
        security: null, //'Entities/History/View',
        querySelect: [
            'AccountId',
            'AccountName',
            'Category',
            'ModifyDate',
            'CompletedDate',
            'ContactId',
            'ContactName',
            'Description',
            'Duration',
            'Notes',
            'LongNotes',
            'OpportunityId',
            'OpportunityName',
            'Priority',
            'StartDate',
            'TicketId',
            'TicketNumber',
            'LeadId',
            'LeadName',
            'Timeless',
            'Type',
            'UserName'
        ],

        formatActivityType: function(val) {
            return this.activityTypeText[val] || val;
        },
        isHistoryForLead: function(entry) {
            return this.existsRE.test(entry && entry['LeadId']);
        },
        isHistoryForActivity: function(entry) {
            return this.existsRE.test(entry && entry['ActivityId']);
        },
        isHistoryOfType: function(entry, type) {
            return entry && (entry['Type'] === type);
        },
        provideText: function(entry) {
            return entry && (entry['LongNotes'] || entry['Notes']);
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                title: this.detailsText,
                name: 'DetailsSection',
                children: [{
                    name: 'StartDate',
                    property: 'StartDate',
                    label: this.scheduledText,
                    renderer: Mobile.SalesLogix.Format.date.bindDelegate(
                        this, this.dateFormatText
                    ),
                    exclude: this.isHistoryOfType.bindDelegate(this, 'atNote')
                },{
                    name: 'CompletedDate',
                    property: 'CompletedDate',
                    label: this.completedText,
                    renderer: Mobile.SalesLogix.Format.date.bindDelegate(
                        this, this.dateFormatText
                    ),
                    exclude: this.isHistoryOfType.bindDelegate(this, 'atNote')
                },{
                    name: 'ModifyDate',
                    property: 'ModifyDate',
                    label: this.modifiedText,
                    renderer: Mobile.SalesLogix.Format.date.bindDelegate(
                        this, this.dateFormatText
                    ),
                    include: this.isHistoryOfType.bindDelegate(this, 'atNote')
                },{
                    name: 'Description',
                    property: 'Description',
                    label: this.regardingText
                }]
            },{
                title: this.notesText,
                name: 'NotesSection',
                children: [{
                    name: 'LongNotes',
                    property: 'LongNotes',
                    label: this.longNotesText,
                    provider: this.provideText.bindDelegate(this),
                    wrap: Mobile.SalesLogix.Template.noteDetailProperty
                }]
            },{
                title: this.relatedItemsText,
                name: 'RelatedItemsSection',
                children: [{
                    name: 'AccountName',
                    property: 'AccountName',
                    exclude: this.isHistoryForLead,
                    label: this.accountText,
                    view: 'account_detail',
                    key: 'AccountId',
                    descriptor: 'AccountName'
                },{
                    name: 'ContactName',
                    property: 'ContactName',
                    exclude: this.isHistoryForLead,
                    label: this.contactText,
                    view: 'contact_detail',
                    key: 'ContactId',
                    descriptor: 'ContactName'
                },{
                    name: 'OpportunityName',
                    property: 'OpportunityName',
                    exclude: this.isHistoryForLead,
                    label: this.opportunityText,
                    view: 'opportunity_detail',
                    key: 'OpportunityId',
                    descriptor: 'OpportunityName'
                },{
                    name: 'TicketNumber',
                    property: 'TicketNumber',
                    exclude: this.isHistoryForLead,
                    label: this.ticketNumberText,
                    view: 'ticket_detail',
                    key: 'TicketId',
                    descriptor: 'TicketNumber'
                },{
                    name: 'LeadName',
                    property: 'LeadName',
                    include: this.isHistoryForLead,
                    label: this.leadText,
                    view: 'lead_detail',
                    key: 'LeadId',
                    descriptor: 'LeadName'
                },{
                    name: 'AccountName',
                    property: 'AccountName',
                    include: this.isHistoryForLead,
                    label: this.companyText
                }]
            }]);
        }
    });
});