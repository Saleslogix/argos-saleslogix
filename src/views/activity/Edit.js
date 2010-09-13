/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

Mobile.SalesLogix.Activity.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
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
        Mobile.SalesLogix.Activity.Edit.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'activity_edit',
            title: this.titleText,
            resourceKind: 'activities'
        });

        this.layout = [
            {name: 'Type', label: this.typeText, type: 'text'},
            {name: 'Regarding', label: this.regardingText, type: 'text'},
            {name: 'Priority', label: this.priorityText, type: 'text'},
            {name: 'Category', label: this.categoryText, type: 'text'},
            {name: 'StartDate', label: this.startingText, type: 'text'},
            {name: 'Timeless', label: this.timelessText, type: 'boolean'},
            {name: 'Duration', label: this.durationText, type: 'text'},
            {name: 'Alarm', label: this.alarmText, type: 'boolean'},
            {name: 'AlarmTime', label: this.alarmTimeText, type: 'text'},
            {name: 'Rollover', label: this.rolloverText, type: 'boolean'},
            {name: 'LeadId', label: this.leadIdText, type: 'lookup', view: 'user_list', keyProperty: '$key', textProperty: 'UserInfo', textTemplate: Mobile.SalesLogix.Template.nameLF},
            {name: 'ContactName', label: this.contactText, type: 'text'},
            {name: 'AccountName', label: this.accountText, type: 'text'},
            {name: 'OpportunityName', label: this.opportunityText, type: 'text'},
            {name: 'TicketNumber', label: this.ticketNumberText, type: 'text'},
            {name: 'LeadName', label: this.leadText, type: 'text'},
            {name: 'Company', label: this.companyText, type: 'text'},
            {name: 'LongNotes', label: this.longNotesText, type: 'text'}
        ];
    },
    init: function() {
        Mobile.SalesLogix.Activity.Edit.superclass.init.call(this);
    },
    createRequest: function() {
        return new Sage.SData.Client.SDataSingleResourceRequest(this.getService())
            .setResourceKind(this.resourceKind)
            .setQueryArgs({
                'select': [
                    'Type',
                    'Regarding',
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
            })
            .setResourceSelector(String.format("'{0}'", this.entry['$key']));
    }
});