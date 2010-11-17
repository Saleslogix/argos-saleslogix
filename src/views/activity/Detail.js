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
        leaderText: 'leader',
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
        editView: 'activity_edit',
        id: 'activity_detail',
        querySelect: [
            'AccountId',
            'AccountName',
            'Alarm',
            'AlarmTime',
            'Category',
            'Company',
            'ContactId',
            'ContactName',
            'Description',
            'Duration',
            'LeadId',
            'LeadName',
            'LongNotes',
            'OpportunityId',
            'OpportunityName',
            'Priority',
            'Rollover',
            'StartDate',
            'TicketId',
            'TicketNumber',
            'Timeless',
            'Type'
        ],
        resourceKind: 'activities',

        formatActivityType: function(val) {
            return Mobile.SalesLogix.Activity.ActivityTypesLookup[val] || val;
        },
        init: function() {
            Mobile.SalesLogix.Activity.Detail.superclass.init.apply(this, arguments);

            this.tools.fbar = [{
                cls: 'tool-note',
                fn: function() {
                    App.navigateToActivityInsertView.call(App, {"id": this.id});
                },
                icon: 'content/images/icons/job_24.png',
                name: 'schedule',
                scope: this,
                title: this.fbarScheduleTitleText
            }];
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