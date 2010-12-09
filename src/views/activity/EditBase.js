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
        alarmTimeText: '',
        categoryText: 'category',
        durationText: 'duration',
        leaderText: 'leader',
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

        init: function() {
            Mobile.SalesLogix.Activity.EditBase.superclass.init.apply(this, arguments);

            this.fields['Leader'].on('change', this.onLeaderChange, this);
            this.fields['Timeless'].on('change', this.onTimelessChange, this);
            this.fields['Alarm'].on('change', this.onAlarmChange, this);
        },
        disableSelectField: function(field, disable) {
            if (disable === true)
            {
                field.containerEl.addClass('field-disabled');
                field.view = false;
            }
            else
            {
                field.containerEl.removeClass('field-disabled');
                field.view = 'select_list';
            }
        },
        onTimelessChange: function(value, field) {
            this.disableSelectField(this.fields['Duration'], value);
        },
        onAlarmChange: function(value, field) {
            this.disableSelectField(this.fields['Reminder'], !value);
        },
        formatPicklistForType: function(type, which) {
            return this.picklistsByType[type] && this.picklistsByType[type][which];
        },
        applyContext: function() {
            Mobile.SalesLogix.Activity.EditBase.superclass.applyContext.apply(this, arguments);

            var startDate = new Date(),
                startMinutes = startDate.getMinutes();
            startDate.setSeconds(0);
            startDate.setMinutes(0);
            startDate.add({
                'minutes': (Math.floor(startMinutes / 15) * 15) + 15
            });

            this.fields['StartDate'].setValue(startDate);
            this.fields['Reminder'].setValue(15);

            this.fields['Type'].setValue(this.options && this.options.activityType);

            var user = App.context['user'];
            if (user)
            {    
                this.fields['UserId'].setValue(user['$key']);
                this.fields['Leader'].setValue(user);
            }
        },
        setValues: function(values) {
            if (values['StartDate'] && values['AlarmTime'])
            {
                var span = values['StartDate'].getTime() - values['AlarmTime'].getTime(); // ms
                var reminder = span / (1000 * 60);

                values['Reminder'] = reminder;
            }

            Mobile.SalesLogix.Activity.EditBase.superclass.setValues.apply(this, arguments);

            this.onTimelessChange((!!values['Timeless']), this.fields['Duration']);
            this.onAlarmChange((!!values['Alarm']), this.fields['Reminder']);
        },
        getValues: function() {
            var values = Mobile.SalesLogix.Activity.EditBase.superclass.getValues.apply(this, arguments);

            var reminder = this.fields['Reminder'].isDirty() && this.fields['Reminder'].getValue();
                        
            if (values['StartDate'] && reminder)            
                values['AlarmTime'] = values['StartDate'].clone().add({'minutes': -1 * reminder});
           
            return values;
        },
        onLeaderChange: function(value, field) {
            this.fields['UserId'].setValue(value && value['key']);
        },
        formatReminderText: function(val, key, text) {
            return this.reminderValueText[key] || text;
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
        formatDurationText: function(val, key, text) {
            return this.durationValueText[key] || text;
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
                    type: 'date',
                    showTimePicker: true,
                    formatString: 'M/d/yyyy h:mm tt'
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
                    textRenderer: this.formatDurationText.createDelegate(this),
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
                    label: '',
                    name: 'Reminder',
                    type: 'select',
                    view: 'select_list',
                    textRenderer: this.formatReminderText.createDelegate(this),
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
                    type: 'hidden',
                    name: 'UserId'
                },
                {
                    label: this.leaderText,
                    name: 'Leader',
                    include: false,
                    type: 'lookup',
                    textProperty: 'UserInfo',
                    textTemplate: Mobile.SalesLogix.Template.nameLF,
                    requireSelection: true,
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