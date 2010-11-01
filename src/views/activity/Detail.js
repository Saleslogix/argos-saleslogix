/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

(function() {
    Mobile.SalesLogix.Activity.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
        //Localization
        accountText: 'account',
        alarmText: 'reminder',
        alarmTimeText: 'reminder',
        categoryText: 'category',
        companyText: 'company',
        contactText: 'contact',
        durationText: 'duration',
        fbarHomeTitleText: 'home',
        fbarScheduleTitleText: 'schedule',
        leadIdText: 'leader',
        leadText: 'lead',
        longNotesText: 'notes',
        opportunityText: 'opportunity',
        priorityText: 'priority',
        regardingText: 'regarding',
        rolloverText: 'auto rollover',
        startingText: 'start time',
        ticketNumberText: 'ticket',
        timelessText: 'timeless',
        titleText: 'Activity',
        typeText: 'type',

        //View Properties
        activityTypeText: {
            'atAppointment': 'Meeting',
            'atLiterature': 'Literature Request',
            'atPhoneCall': 'Phone Call',
            'atPersonal': 'Personal Activity',
            'atToDo': 'To-Do'
        },
        editView: 'activity_edit',
        id: 'activity_detail',
        querySelect: [
            'AccountName',
            'Alarm',
            'AlarmTime',
            'Category',
            'Company',
            'ContactName',
            'Description',
            'Duration',
            'LeadId',
            'LeadName',
            'LongNotes',
            'OpportunityName',
            'Priority',
            'Rollover',
            'StartDate',
            'TicketNumber',
            'Timeless',
            'Type'
        ],
        resourceKind: 'activities',

        formatActivityType: function(val) {
            return this.activityTypeText[val] || val;
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
                    name: 'StartDate',
                    label: this.startingText,
                    renderer: Mobile.SalesLogix.Format.date
                },
                {
                    name: 'Timeless',
                    label: this.timelessText
                },
                {
                    name: 'Duration',
                    label: this.durationText
                },
                {
                    name: 'Alarm',
                    label: this.alarmText
                },
                {
                    name: 'AlarmTime',
                    label: this.alarmTimeText,
                    renderer: Mobile.SalesLogix.Format.date.createDelegate(
                        this, ['M/d/yyyy hh:MM:ss'], true
                    )
                },
                {
                    name: 'Rollover',
                    label: this.rolloverText
                },
                {
                    name: 'LeadId',
                    label: this.leadIdText
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