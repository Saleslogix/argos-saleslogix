/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

(function() {
    Mobile.SalesLogix.Activity.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
        id: 'activity_detail',
        editView: 'activity_edit',
        activityTypeText: {
            'atToDo': 'To-Do',
            'atPhoneCall': 'Phone Call',
            'atAppointment': 'Meeting',
            'atLiterature': 'Literature Request',
            'atPersonal': 'Personal Activity'
        },
        titleText: 'Activity',
        typeText: 'type',
        categoryText: 'category',
        accountText: 'account',
        startingText: 'start time',
        timelessText: 'timeless',
        durationText: 'duration',
        alarmText: 'reminder',
        alarmTimeText: 'reminder',
        rolloverText: 'auto rollover',
        leadIdText: 'leader',
        opportunityText: 'opportunity',
        ticketNumberText: 'ticket',
        leadText: 'lead',
        longNotesText: 'notes',
        contactText: 'contact',
        regardingText: 'regarding',
        companyText: 'company',
        priorityText: 'priority',
        resourceKind: 'activities',
        querySelect: [
            'Type',
            'Description',
            'Priority',
            'Category',
            'StartDate',
            'Timeless',
            'Duration',
            'Alarm',
            'AlarmTime',
            'Rollover',
            'LeadId',
            'ContactName',
            'AccountName',
            'OpportunityName',
            'TicketNumber',
            'LeadName',
            'Company',
            'LongNotes'
        ],
        formatActivityType: function(val) {
            return this.activityTypeText[val] || val;
        },
        init: function() {
            Mobile.SalesLogix.Activity.Detail.superclass.init.apply(this, arguments);

            this.tools.fbar = [{
                name: 'home',
                title: 'home',
                cls: 'tool-note',
                icon: 'content/images/welcome_32x32.gif',
                fn: App.navigateToHomeView,
                scope: this
            },{
                name: 'schedule',
                title: 'schedule',
                cls: 'tool-note',
                icon: 'content/images/Schdedule_To_Do_32x32.gif',
                fn: App.navigateToActivityInsertView,
                scope: this
            }];
        },               
        createLayout: function() {
            return this.layout || (this.layout = [
                {name: 'Type', label: this.typeText, renderer: this.formatActivityType},
                {name: 'Description', label: this.regardingText},
                {name: 'Priority', label: this.priorityText},
                {name: 'Category', label: this.categoryText},
                {name: 'StartDate', label: this.startingText, renderer: Mobile.SalesLogix.Format.date},
                {name: 'Timeless', label: this.timelessText},
                {name: 'Duration', label: this.durationText},
                {name: 'Alarm', label: this.alarmText},
                {name: 'AlarmTime', label: this.alarmTimeText, renderer: Mobile.SalesLogix.Format.date.createDelegate(this, ['M/d/yyyy hh:MM:ss'], true)},
                {name: 'Rollover', label: this.rolloverText},
                {name: 'LeadId', label: this.leadIdText},
                {name: 'ContactName', label: this.contactText},
                {name: 'AccountName', label: this.accountText},
                {name: 'OpportunityName', label: this.opportunityText},
                {name: 'TicketNumber', label: this.ticketNumberText},
                {name: 'LeadName', label: this.leadText},
                {name: 'AccountName', label: this.companyText},
                {name: 'LongNotes', label: this.longNotesText}
            ]);
        }        
    });
})();