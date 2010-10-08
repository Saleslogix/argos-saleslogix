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
        activityTypeTitleText: 'Activity Type',
        activityDescriptionTitleText: 'Activity Description',
        activityCategoryTitleText: 'Activity Category',
        priorityTitleText: 'Priority',
        resourceKind: 'activities',
        entityName: 'Activity', // todo: is this correct?
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
        createTypeList: function() {
            var list = [];
            for (var type in this.activityTypeText)
                list.push({
                    '$key': type,
                    '$descriptor': this.activityTypeText[type] 
                });
            return {'$resources': list};
        },       
        formatTypeDependentPicklist: function(type, which) {
            return this.picklistsByType[type] && this.picklistsByType[type][which];
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    name: 'Type',
                    label: this.typeText,
                    type: 'select',
                    view: 'select_list',                    
                    title: this.activityTypeTitleText,
                    data: this.createTypeList()
                },
                {
                    name: 'Description',
                    label: this.regardingText,
                    type: 'picklist',
                    picklist: this.formatTypeDependentPicklist.createDelegate(this, ['Description'], true),
                    title: this.activityDescriptionTitleText,
                    dependsOn: 'Type'
                },
                {
                    name: 'Priority',
                    label: this.priorityText,
                    type: 'picklist',
                    picklist: 'Priorities',                    
                    title: this.priorityTitleText
                },
                {
                    name: 'Category',
                    label: this.categoryText,
                    type: 'picklist',
                    picklist: this.formatTypeDependentPicklist.createDelegate(this, ['Category'], true),
                    title: this.activityCategoryTitleText,
                    dependsOn: 'Type'
                },
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