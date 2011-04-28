/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.History");

(function() {
    Mobile.SalesLogix.History.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
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
        dateFormatString: 'M/d/yyyy h:mm:ss tt',
        resourceKind: 'history',
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
                options: {
                    title: this.detailsText
                },
                as: [{
                    name: 'StartDate',
                    label: this.scheduledText,
                    renderer: Mobile.SalesLogix.Format.date.createDelegate(
                        this, [this.dateFormatString], true
                    ),
                    exclude: this.isHistoryOfType.createDelegate(
                        this, ['atNote'], true
                    )
                },{
                    name: 'CompletedDate',
                    label: this.completedText,
                    renderer: Mobile.SalesLogix.Format.date.createDelegate(
                        this, [this.dateFormatString], true
                    ),
                    exclude: this.isHistoryOfType.createDelegate(
                        this, ['atNote'], true
                    )
                },{
                    name: 'ModifyDate',
                    label: this.modifiedText,
                    renderer: Mobile.SalesLogix.Format.date.createDelegate(
                        this, [this.dateFormatString], true
                    ),
                    include: this.isHistoryOfType.createDelegate(
                        this, ['atNote'], true
                    )
                },{
                    name: 'Description',
                    label: this.regardingText
                }]
            },{
                options: {
                    title: this.notesText
                },
                as: [{
                    name: 'LongNotes',
                    label: this.longNotesText,
                    provider: this.provideText.createDelegate(this),
                    wrap: Mobile.SalesLogix.Template.noteDetailProperty
                }]
            },{
                options: {
                    title: this.relatedItemsText
                },
                as: [{
                    name: 'AccountName',
                    exclude: this.isHistoryForLead,
                    label: this.accountText,
                    view: 'account_detail',
                    key: 'AccountId',
                    descriptor: 'AccountName',
                    property: true
                },{
                    name: 'ContactName',
                    exclude: this.isHistoryForLead,
                    label: this.contactText,
                    view: 'contact_detail',
                    key: 'ContactId',
                    descriptor: 'ContactName',
                    property: true
                },{
                    name: 'OpportunityName',
                    exclude: this.isHistoryForLead,
                    label: this.opportunityText,
                    view: 'opportunity_detail',
                    key: 'OpportunityId',
                    descriptor: 'OpportunityName',
                    property: true
                },{
                    name: 'TicketNumber',
                    exclude: this.isHistoryForLead,
                    label: this.ticketNumberText,
                    view: 'ticket_detail',
                    key: 'TicketId',
                    descriptor: 'TicketNumber',
                    property: true
                },{
                    name: 'LeadName',
                    include: this.isHistoryForLead,
                    label: this.leadText,
                    view: 'lead_detail',
                    key: 'LeadId',
                    descriptor: 'LeadName',
                    property: true
                },{
                    name: 'AccountName',
                    include: this.isHistoryForLead,
                    label: this.companyText
                }]
            }]);
        }
    });
})();