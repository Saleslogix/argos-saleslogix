/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

(function() {
    Mobile.SalesLogix.Activity.EditBase = Ext.extend(Sage.Platform.Mobile.Edit, {
        //Localization
        activityCategoryTitleText: 'Activity Category',
        activityDescriptionTitleText: 'Activity Description',
        activityTypeTitleText: 'Activity Type',
        alarmText: 'reminder',
        alarmTimeText: ' ',
        categoryText: 'category',
        durationText: 'duration',
        leadIdText: 'leader',
        longNotesText: 'notes',
        priorityText: 'priority',
        priorityTitleText: 'Priority',
        regardingText: 'regarding',
        rolloverText: 'auto rollover',
        startingText: 'start time',
        timelessText: 'timeless',
        titleText: 'Activity',
        typeText: 'type',
        reminderValueText: {
            0: 'none',
            5: '5 minutes',
            15: '15 minutes',
            30: '30 minutes',
            60: '1 hour',
            1440: '1 day'
        },
        durationValueText: {
            0: 'none',
            15: '15 minutes',
            30: '30 minutes',
            60: '1 hour',
            90: '1.5 hours',
            120: '2 hours'
        },

        //View Properties        
        picklistsByType: {
            'atAppointment': {
                'Category': 'Meeting Category Codes',
                'Description': 'Meeting Regarding'
            },
            'atLiterature': {
                'Description': 'Lit Request Regarding'
            },
            'atPersonal': {
                'Category': 'Meeting Category Codes',
                'Description': 'Personal Activity Regarding'
            },
            'atPhoneCall': {
                'Category': 'Phone Call Category Codes',
                'Description': 'Phone Call Regarding'
            },
            'atToDo': {
                'Category': 'To Do Category Codes',
                'Description': 'To Do Regarding'
            }
        },       

        entityName: 'Activity', // todo: is this correct?
        querySelect: [
            'AccountId',
            'AccountName',
            'Alarm',
            'AlarmTime',
            'Category',
            'ContactId',
            'ContactName',
            'Duration',
            'LeadId',
            'LeadName',
            'LongNotes',
            'OpportunityId',
            'OpportunityName',
            'Priority',
            'Regarding',
            'Rollover',
            'StartDate',
            'TicketId',
            'TicketNumber',
            'Timeless',
            'Type',
            'UserId'
        ],
        resourceKind: 'activities',
       
        formatPicklistForType: function(type, which) {
            return this.picklistsByType[type.$key] && this.picklistsByType[type.$key][which];
        },
        applyContext: function() {
            Mobile.SalesLogix.Activity.EditBase.superclass.applyContext.apply(this, arguments);

            this.fields['Type'].setValue(this.options && this.options.activityType);
        },        
        createReminderData: function() {
            var list = [];

            for (var duration in this.reminderValueText)
            {
                list.push({
                    '$key': duration,
                    '$descriptor': this.reminderValueText[duration]
                });
            }

            return {'$resources': list};
        },
        createDurationData: function() {
            var list = [];

            for (var duration in this.durationValueText)
            {
                list.push({
                    '$key': duration,
                    '$descriptor': this.durationValueText[duration]
                });
            }

            return {'$resources': list};
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    name: 'Type',
                    type: 'hidden'
                },
                {
                    dependsOn: 'Type',
                    label: this.regardingText,
                    name: 'Description',
                    picklist: this.formatPicklistForType.createDelegate(
                        this, ['Description'], true
                    ),
                    title: this.activityDescriptionTitleText,
                    type: 'picklist'
                },
                {
                    label: this.priorityText,
                    name: 'Priority',
                    picklist: 'Priorities',
                    title: this.priorityTitleText,
                    type: 'picklist'
                },
                {
                    dependsOn: 'Type',
                    label: this.categoryText,
                    name: 'Category',
                    picklist: this.formatPicklistForType.createDelegate(
                        this, ['Category'], true
                    ),
                    title: this.activityCategoryTitleText,
                    type: 'picklist'
                },
                {
                    label: this.startingText,
                    name: 'StartDate',
                    showTime: true,
                    type: 'date'
                },
                {
                    label: this.timelessText,
                    name: 'Timeless',
                    type: 'boolean'
                },
                {
                    label: this.durationText,
                    name: 'Duration',
                    type: 'select',
                    view: 'select_list',
                    requireSelection: true,
                    valueKeyProperty: false,
                    valueTextProperty: false,
                    data: this.createDurationData()
                },
                {
                    label: this.alarmText,
                    name: 'Alarm',
                    type: 'boolean'
                },
                {
                    label: this.alarmTimeText,
                    name: 'AlarmTime',
                    type: 'select',
                    view: 'select_list',
                    include: false,
                    requireSelection: true,
                    valueKeyProperty: false,
                    valueTextProperty: false,
                    data: this.createReminderData()
                },
                {
                    label: this.rolloverText,
                    name: 'Rollover',
                    type: 'boolean'
                },
                {
                    label: this.leadIdText,
                    name: 'UserId',
                    textProperty: 'UserInfo',
                    textTemplate: Mobile.SalesLogix.Template.nameLF,
                    type: 'lookup',
                    view: 'user_list'
                },
                {
                    label: this.longNotesText,
                    multiline: true,
                    name: 'LongNotes',
                    type: 'text'
                }
            ]);
        }
    });     
})();