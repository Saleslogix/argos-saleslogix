/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");
Mobile.SalesLogix.Activity.TypesMap = {
    "atToDo": "To-Do",
    "atPhoneCall": "Phone Call",
    "atAppointment": "Meeting",
    "atLiterature": "Literature Request",
    "atPersonal": "Personal Activity"
};
Mobile.SalesLogix.Activity.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
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
    constructor: function(o) {
        Mobile.SalesLogix.Activity.Detail.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'activity_detail',
            title: this.titleText,
            editor: 'activity_edit',
            resourceKind: 'activities'
        });
        
        Ext.apply(this.tools || {}, {
            fbar: [{
                name: 'home',
                title: 'home',                        
                cls: 'tool-note',
                icon: 'content/images/welcome_32x32.gif',
                fn: App.goHome,
                scope: this
            },{
                name: 'schedule',
                title: 'schedule',                        
                cls: 'tool-note',
                icon: 'content/images/Schdedule_To_Do_32x32.gif',
                fn: App.navigateToNewActivity,
                scope: this
            }]
        });
        
        var typeRenderer = function(val) {
            if (Mobile.SalesLogix.Activity.TypesMap && Mobile.SalesLogix.Activity.TypesMap[val])
            {
                return Mobile.SalesLogix.Activity.TypesMap[val];
            }
            return val;
        };
        var datetimeRenderer = function(val) {
            return Mobile.SalesLogix.Format.date(val, 'M/d/yyyy hh:MM:ss');
        };
        this.layout = [
            {name: 'Type', label: this.typeText, renderer: typeRenderer},
            {name: 'Description', label: this.regardingText},
            {name: 'Priority', label: this.priorityText},
            {name: 'Category', label: this.categoryText},
            {name: 'StartDate', label: this.startingText, renderer: Mobile.SalesLogix.Format.date},
            {name: 'Timeless', label: this.timelessText},
            {name: 'Duration', label: this.durationText},
            {name: 'Alarm', label: this.alarmText},
            {name: 'AlarmTime', label: this.alarmTimeText, renderer: datetimeRenderer},
            {name: 'Rollover', label: this.rolloverText},
            {name: 'LeadId', label: this.leadIdText},
            {name: 'ContactName', label: this.contactText},
            {name: 'AccountName', label: this.accountText},
            {name: 'OpportunityName', label: this.opportunityText},
            {name: 'TicketNumber', label: this.ticketNumberText},
            {name: 'LeadName', label: this.leadText},
            {name: 'AccountName', label: this.companyText},
            {name: 'LongNotes', label: this.longNotesText}
           ];
    },
    init: function() {
        Mobile.SalesLogix.Activity.Detail.superclass.init.call(this);
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Activity.Detail.superclass.createRequest.call(this);

        request
            .setQueryArgs({
                'select': [
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
                ]
            });

        return request;
    }
});