/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");
Mobile.SalesLogix.Activity.TypeDependentPicklists = {
    'atToDo': {
        'Description': 'To Do Regarding',
        'Category': 'To Do Category Codes'
    },
    'atPhoneCall': {
        'Description': 'Phone Call Regarding',
        'Category': 'Phone Call Category Codes'
    },
    'atAppointment': {
        'Description': 'Meeting Regarding',
        'Category': 'Meeting Category Codes'
    },
    'atLiterature': {
        'Description': 'Lit Request Regarding'
    },
    'atPersonal': {
        'Description': 'Personal Activity Regarding',
        'Category': 'Meeting Category Codes'
    }
};
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

        var typeList = [
            {'$key': "atToDo", '$descriptor': "To-Do"},
            {'$key': "atPhoneCall", '$descriptor': "Phone Call"},
            {'$key': "atAppointment", '$descriptor': "Meeting"},
            {'$key': "atLiterature", '$descriptor': "Literature Request"},
            {'$key': "atPersonal", '$descriptor': "Personal Activity"}
        ];

        this.layout = [
            {name: 'Type', label: this.typeText, type: 'select', view: 'select_list', title: 'Activity Type', list: typeList},
            {name: 'Description', label: this.regardingText, type: 'pickup', view: 'act_desc_pick_list', resourcePredicate: this.setResourcePredicateForDesc, title: 'Activity Description', dependsOn: 'Type', errMsg: 'A "Type" is required for "Description"', orderBy: 'sort asc'},
            {name: 'Priority', label: this.priorityText, type: 'pickup', view: 'act_priority_pick_list', resourcePredicate: 'name eq "Priorities"', title: 'Priorities', orderBy: 'sort asc'},
            {name: 'Category', label: this.categoryText, type: 'pickup', view: 'act_category_pick_list', resourcePredicate: this.setResourcePredicateForCategory, title: 'Activity Category', dependsOn: 'Type', errMsg: 'A "Type" is required for "Category"', orderBy: 'sort asc'},
            {name: 'StartDate', label: this.startingText, type: 'text'},
            {name: 'Timeless', label: this.timelessText, type: 'boolean'},
            {name: 'Duration', label: this.durationText, type: 'text', validator: Mobile.SalesLogix.Validator.isInteger},
            {name: 'Alarm', label: this.alarmText, type: 'boolean'},
            {name: 'AlarmTime', label: this.alarmTimeText, type: 'text'},
            {name: 'Rollover', label: this.rolloverText, type: 'boolean'},
            {name: 'LeadId', label: this.leadIdText, type: 'text'},
            {name: 'ContactName', label: this.contactText, type: 'text'},
            {name: 'AccountName', label: this.accountText, type: 'text'},
            {name: 'OpportunityName', label: this.opportunityText, type: 'text'},
            {name: 'TicketNumber', label: this.ticketNumberText, type: 'text'},
            {name: 'LeadName', label: this.leadText, type: 'text'},
            {name: 'AccountName', label: this.companyText, type: 'text'},
            {name: 'LongNotes', label: this.longNotesText, type: 'text'}
        ];
    },
    setResourcePredicateForDesc: function(val) {
        val = Mobile.SalesLogix.Activity.TypeDependentPicklists[val].Description || null;
        if (val) return "name eq '" + val + "'";
        return null;
    },
    setResourcePredicateForCategory: function(val) {
        val = Mobile.SalesLogix.Activity.TypeDependentPicklists[val].Category || null;
        if (val) return "name eq '" + val + "'";
        return null;
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