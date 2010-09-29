/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

(function() {  
    Mobile.SalesLogix.Activity.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        id: 'activity_edit',
        picklistsByType: {
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
        },
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
        ],        
        formatDescriptionPredicate: function(val) {
            return String.format("name eq '{0}'", this.picklistsByType[val] ? this.picklistsByType[val]['Description'] : '');
        },
        formatCategoryPredicate: function(val) {
            return String.format("name eq '{0}'", this.picklistsByType[val] ? this.picklistsByType[val]['Category'] : '');
        },       
        init: function() {
            Mobile.SalesLogix.Activity.Edit.superclass.init.call(this);
        },
        createTypeList: function() {
            var list = [];
            for (var type in this.activityTypeText)
                list.push({
                    '$key': type,
                    '$descriptor': this.activityTypeText[type] 
                });
            return list;
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {name: 'Type', label: this.typeText, type: 'select', view: 'select_list', title: 'Activity Type', list: this.createTypeList()},
                {name: 'Description', label: this.regardingText, type: 'pickup', view: 'pick_list', resourcePredicate: this.formatDescriptionPredicate.createDelegate(this), title: 'Activity Description', dependsOn: 'Type', errMsg: 'A "Type" is required for "Description"', orderBy: 'sort asc'},
                {name: 'Priority', label: this.priorityText, type: 'pickup', view: 'pick_list', resourcePredicate: 'name eq "Priorities"', title: 'Priorities', orderBy: 'sort asc'},
                {name: 'Category', label: this.categoryText, type: 'pickup', view: 'pick_list', resourcePredicate: this.formatCategoryPredicate.createDelegate(this), title: 'Activity Category', dependsOn: 'Type', errMsg: 'A "Type" is required for "Category"', orderBy: 'sort asc'},
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
            ]);
        }
    });
})();