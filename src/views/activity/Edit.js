/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

(function() {
    Mobile.SalesLogix.Activity.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
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
        longNotesTitleText: 'Notes',
        priorityText: 'priority',
        priorityTitleText: 'Priority',
        regardingText: 'regarding',
        rolloverText: 'auto rollover',
        startingText: 'start time',
        timelessText: 'timeless',
        titleText: 'Activity',
        typeText: 'type',
        accountText: 'account',
        contactText: 'contact',
        opportunityText: 'opportunity',
        ticketNumberText: 'ticket',
        companyText: 'company',
        leadText: 'lead',
        isLeadText: 'for lead',
        yesText: 'YES',
        noText: 'NO',
        updateUserActErrorText: 'An error occured updating user activities.',
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
        id: 'activity_edit',
        fieldsForLeads: ['AccountName', 'Lead'],
        fieldsForStandard: ['Account', 'Contact', 'Opportunity', 'Ticket'],
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
            },
            'atEMail': {
                'Category': 'E-mail Category Codes',
                'Description': 'E-mail Regarding'
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
            'Description',
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
            Mobile.SalesLogix.Activity.Edit.superclass.init.apply(this, arguments);

            this.fields['Lead'].on('change', this.onLeadChange, this);
            this.fields['IsLead'].on('change', this.onIsLeadChange, this);
            this.fields['Leader'].on('change', this.onLeaderChange, this);
            this.fields['Timeless'].on('change', this.onTimelessChange, this);
            this.fields['Alarm'].on('change', this.onAlarmChange, this);
        },
        currentUserCanEdit: function(entry) {
            return !!entry && (entry['UserId'] === App.context['user']['$key']);
        },
        currentUserCanSetAlarm: function(entry) {
            return !!entry && (entry['UserId'] === App.context['user']['$key']);
        },
        isActivityForLead: function(entry) {
            return entry && /^[\w]{12}$/.test(entry['LeadId']);
        },
        isInLeadContext: function() {
            var insert = this.options && this.options.insert,
                entry = this.options && this.options.entry,
                lead = (insert && App.isNavigationFromResourceKind('leads', function(o, c) { return c.key; })) || this.isActivityForLead(entry);

            return !!lead;
        },
        beforeTransitionTo: function() {
            Mobile.SalesLogix.Activity.Complete.superclass.beforeTransitionTo.apply(this, arguments);

            // we hide the lead or standard fields here, as the view is currently hidden, in order to prevent flashing.
            // the value for the 'IsLead' field will be set later, based on the value derived here.

            if (this.options.isForLead != undefined) return;

            this.options.isForLead = this.isInLeadContext();

            if (this.options.isForLead)
                this.showFieldsForLead();
            else
                this.showFieldsForStandard();
        },
        disableFields: function(predicate) {
            for (var name in this.fields)
                if (!predicate || predicate(this.fields[name]))
                    this.fields[name].disable();
        },
        enableFields: function(predicate) {
            for (var name in this.fields)
                if (!predicate || predicate(this.fields[name]))
                    this.fields[name].enable();
        },
        onIsLeadChange: function(value, field) {
            this.options.isForLead = value;

            if (this.options.isForLead)
                this.showFieldsForLead();
            else
                this.showFieldsForStandard();
        },
        showFieldsForLead: function() {
            Ext.each(this.fieldsForStandard.concat(this.fieldsForLeads), function(item) {
                if (this.fields[item])
                    this.fields[item].hide();
            }, this);

            Ext.each(this.fieldsForLeads, function(item) {
                if (this.fields[item])
                    this.fields[item].show();
            }, this);
        },
        showFieldsForStandard: function() {
            Ext.each(this.fieldsForStandard.concat(this.fieldsForLeads), function(item) {
                if (this.fields[item])
                    this.fields[item].hide();
            }, this);

            Ext.each(this.fieldsForStandard, function(item) {
                    if (this.fields[item])
                        this.fields[item].show();
                }, this);
        },
        toggleSelectField: function(field, disable, options) {
            disable === true ? field.disable() : field.enable();
        },
        onTimelessChange: function(value, field) {
            this.toggleSelectField(this.fields['Duration'], value);

            if (value)
            {
                this.fields['Rollover'].enable();
            }
            else
            {
                this.fields['Rollover'].setValue(false);
                this.fields['Rollover'].disable();
            }
        },
        onAlarmChange: function(value, field) {
            this.toggleSelectField(this.fields['Reminder'], !value);
        },
        onLeadChange: function(value, field) {
            var selection = field.getSelection(),
                getV = Sage.Platform.Mobile.Utility.getValue;

            if (selection && this.insert)
            {
                this.fields['AccountName'].setValue(getV(selection, 'Company'));
            }
        },
        onLeaderChange: function(value, field) {
            this.fields['UserId'].setValue(value && value['key']);
        },
        formatPicklistForType: function(type, which) {
            return this.picklistsByType[type] && this.picklistsByType[type][which];
        },
        applyUserActivityContext: function(context) {
            var view = App.getView(context.id);
            if (view && view.currentDate)
            {
                var currentDate = view.currentDate.clone().clearTime(),
                    userOptions = App.context['userOptions'],
                    startTimeOption = userOptions && userOptions['Calendar:DayStartTime'],
                    startTime = startTimeOption && Date.parse(startTimeOption),
                    startDate;

                if (startTime && (currentDate.compareTo(Date.today()) !== 0))
                {
                    startDate = currentDate.clone().set({
                        'hour': startTime.getHours(),
                        'minute': startTime.getMinutes()
                    });
                }
                else
                {
                    startTime = Date.now(),
                    startDate = Date.now().clearTime().set({
                        'hour': startTime.getHours()
                    }).add({
                        'minute': (Math.floor(startTime.getMinutes() / 15) * 15) + 15
                    });
                }

                this.fields['StartDate'].setValue(startDate);
            }
        },
        applyContext: function() {
            Mobile.SalesLogix.Activity.Edit.superclass.applyContext.apply(this, arguments);

            var startTime = Date.now(),
                startDate = Date.now().clearTime().set({
                    'hour': startTime.getHours()
                }).add({
                    'minute': (Math.floor(startTime.getMinutes() / 15) * 15) + 15
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

            var found = App.queryNavigationContext(function(o) {
                var context = (o.options && o.options.source) || o;

                return (/^(accounts|contacts|opportunities|tickets|leads)$/.test(context.resourceKind) && context.key) ||
                       (/^(useractivities)$/.test(context.resourceKind));
            });

            var context = (found && found.options && found.options.source) || found,
                lookup = {
                    'accounts': this.applyAccountContext,
                    'contacts': this.applyContactContext,
                    'opportunities': this.applyOpportunityContext,
                    'tickets': this.applyTicketContext,
                    'leads': this.applyLeadContext,
                    'useractivities': this.applyUserActivityContext
                };

            if (context && lookup[context.resourceKind]) lookup[context.resourceKind].call(this, context);
        },
        applyAccountContext: function(context) {
            var view = App.getView(context.id),
                entry = context.entry || (view && view.entry);

            if (!entry || !entry['$key']) return;

            this.fields['Account'].setValue({
                'AccountId': entry['$key'],
                'AccountName': entry['$descriptor']
            });
        },
        applyContactContext: function(context) {
            var view = App.getView(context.id),
                entry = context.entry || (view && view.entry),
                getV = Sage.Platform.Mobile.Utility.getValue;

            if (!entry || !entry['$key']) return;

            this.fields['Contact'].setValue({
                'ContactId': entry['$key'],
                'ContactName': entry['$descriptor']
            });

            this.fields['Account'].setValue({
                'AccountId': getV(entry, 'Account.$key'),
                'AccountName': getV(entry, 'Account.AccountName')
            });
        },
        applyTicketContext: function(context) {
            var view = App.getView(context.id),
                entry = context.entry || (view && view.entry),
                getV = Sage.Platform.Mobile.Utility.getValue;

            if (!entry || !entry['$key']) return;

            this.fields['Ticket'].setValue({
                'TicketId': entry['$key'],
                'TicketNumber': entry['$descriptor']
            });

            this.fields['Contact'].setValue({
                'ContactId': getV(entry, 'Contact.$key'),
                'ContactName': getV(entry, 'Contact.NameLF')
            });

            this.fields['Account'].setValue({
                'AccountId': getV(entry, 'Account.$key'),
                'AccountName': getV(entry, 'Account.AccountName')
            });
        },
        applyOpportunityContext: function(context) {
            var view = App.getView(context.id),
                entry = context.entry || (view && view.entry),
                getV = Sage.Platform.Mobile.Utility.getValue;

            if (!entry || !entry['$key']) return;

            this.fields['Opportunity'].setValue({
                'OpportunityId': entry['$key'],
                'OpportunityName': entry['$descriptor']
            });

            this.fields['Account'].setValue({
                'AccountId': getV(entry, 'Account.$key'),
                'AccountName': getV(entry, 'Account.AccountName')
            });
        },
        applyLeadContext: function(context) {
            var view = App.getView(context.id),
                entry = context.entry || (view && view.entry),
                getV = Sage.Platform.Mobile.Utility.getValue;

            if (!entry || !entry['$key']) return;

            this.fields['Lead'].setValue({
                'LeadId': entry['$key'],
                'LeadName': entry['$descriptor']
            });

            this.fields['AccountName'].setValue(entry['Company']);
        },        
        setValues: function(values) {
            if (values['StartDate'] && values['AlarmTime'])
            {
                var span = values['StartDate'].getTime() - values['AlarmTime'].getTime(), // ms
                    reminder = span / (1000 * 60);
                
                values['Reminder'] = reminder;
            }

            Mobile.SalesLogix.Activity.Edit.superclass.setValues.apply(this, arguments);

            this.enableFields();

            if (values['Timeless'])
            {
                this.fields['Duration'].disable();
                this.fields['Rollover'].enable();
            }
            else
            {
                this.fields['Duration'].enable();
                this.fields['Rollover'].disable();
            }

            if (values['Alarm'])
                this.fields['Reminder'].enable();
            else
                this.fields['Reminder'].disable();

            this.fields['IsLead'].setValue(this.options.isForLead);

            var entry = this.options.entry,
                denyEdit = !this.options.insert && !this.currentUserCanEdit(entry),
                allowSetAlarm = !denyEdit || this.currentUserCanSetAlarm(entry);

            if (denyEdit)
                this.disableFields();

            if (allowSetAlarm)
                this.enableFields(function(f) { return /^Alarm|Reminder$/.test(f.name) });
        },
        isDateTimeless: function(date) {
            if (date.getUTCHours() != 0) return false;
            if (date.getUTCMinutes() != 0) return false;
            if (date.getUTCSeconds() != 5) return false;

            return true;
        },
        getValues: function() {
            var values = Mobile.SalesLogix.Activity.Edit.superclass.getValues.apply(this, arguments),
                isStartDateDirty = this.fields['StartDate'].isDirty(),
                isTimelessDirty = this.fields['Timeless'].isDirty(),
                isReminderDirty = this.fields['Reminder'].isDirty(),
                startDate = this.fields['StartDate'].getValue(),
                timeless = this.fields['Timeless'].getValue(),
                reminderIn = this.fields['Reminder'].getValue();

            // if StartDate is dirty, always update AlarmTime
            if (startDate && (isStartDateDirty || isReminderDirty))
            {
                values = values || {};
                values['AlarmTime'] = startDate.clone().add({'minutes': -1 * reminderIn});
            }

            // if Timeless
            if (timeless && !this.isDateTimeless(startDate) && (isStartDateDirty || isTimelessDirty))
            {
                var timelessStartDate = startDate.clone()
                    .clearTime()
                    .add({minutes: -1 * startDate.getTimezoneOffset(), seconds: 5});

                values = values || {};
                values['StartDate'] = timelessStartDate;
                values['AlarmTime'] = timelessStartDate.clone().add({'minutes': -1 * reminderIn});
            }

            return values;
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
        formatDependentQuery: function(dependentValue, format, property) {
            var getV = Sage.Platform.Mobile.Utility.getValue;

            property = property || '$key';

            return String.format(format, getV(dependentValue, property));
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                name: 'Type',
                type: 'hidden'
            },{
                dependsOn: 'Type',
                label: this.regardingText,
                name: 'Description',
                picklist: this.formatPicklistForType.createDelegate(
                    this, ['Description'], true
                ),
                title: this.activityDescriptionTitleText,
                orderBy: 'text asc',
                type: 'picklist',
                maxTextLength: 64,
                validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
            },{
                label: this.priorityText,
                name: 'Priority',
                picklist: 'Priorities',
                title: this.priorityTitleText,
                type: 'picklist',
                maxTextLength: 64,
                validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
            },{
                dependsOn: 'Type',
                label: this.categoryText,
                name: 'Category',
                picklist: this.formatPicklistForType.createDelegate(
                    this, ['Category'], true
                ),
                orderBy: 'text asc',
                title: this.activityCategoryTitleText,
                type: 'picklist',
                maxTextLength: 64,
                validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
            },{
                label: this.startingText,
                name: 'StartDate',
                type: 'date',
                showTimePicker: true,
                formatString: 'M/d/yyyy h:mm tt',
                minValue: (new Date(1900, 0, 1)),
                validator: [
                    Mobile.SalesLogix.Validator.exists,
                    Mobile.SalesLogix.Validator.isDateInRange
                ]
            },{
                label: this.timelessText,
                name: 'Timeless',
                type: 'boolean'
            },{
                label: this.durationText,
                name: 'Duration',
                type: 'select',
                view: 'select_list',
                textRenderer: this.formatDurationText.createDelegate(this),
                requireSelection: true,
                valueKeyProperty: false,
                valueTextProperty: false,
                data: this.createDurationData(),
                validator: {
                    fn: function(val, field) {
                        if (field.isDisabled()) return false;
                        if (!/^\d+$/.test(val)) return true;
                    },
                    message: "The field '{2}' must have a value."
                }
            },{
                label: this.alarmText,
                name: 'Alarm',
                type: 'boolean'
            },{
                label: '',
                name: 'Reminder',
                type: 'select',
                view: 'select_list',
                textRenderer: this.formatReminderText.createDelegate(this),
                include: false,
                requireSelection: true,
                valueKeyProperty: false,
                valueTextProperty: false,
                data: this.createReminderData(),
                validator: {
                    fn: function(val, field) {
                        if (field.isDisabled()) return false;
                        if (!/^\d+$/.test(val)) return true;
                    },
                    message: "The field 'reminder' must have a value."
                }
            },{
                label: this.rolloverText,
                name: 'Rollover',
                type: 'boolean'
            },{
                type: 'hidden',
                name: 'UserId'
            },{
                label: this.leaderText,
                name: 'Leader',
                include: false,
                type: 'lookup',
                textProperty: 'UserInfo',
                textTemplate: Mobile.SalesLogix.Template.nameLF,
                requireSelection: true,
                view: 'user_list'
            },{
                label: this.longNotesText,
                noteProperty: false,
                name: 'LongNotes',
                title: this.longNotesTitleText,
                type: 'note',
                view: 'text_edit'
            },{
                label: this.isLeadText,
                name: 'IsLead',
                include: false,
                type: 'boolean',
                onText: this.yesText,
                offText: this.noText
            },{
                label: this.accountText,
                name: 'Account',
                type: 'lookup',
                emptyText: '',
                applyTo: '.',
                valueKeyProperty: 'AccountId',
                valueTextProperty: 'AccountName',
                validator: {
                    //Personal activities don't require an account. We'll just manually
                    //call the validator if it's a non-personal activity.
                    fn: function(value, field, view) {
                        if (view.fields['Type'].getValue() === 'atPersonal') {
                            return false;
                        } else {
                            return Mobile.SalesLogix.Validator.exists.fn(value, field, view);
                        }
                    },
                    message: Mobile.SalesLogix.Validator.exists.message
                },
                view: 'account_related'
            },{
                dependsOn: 'Account',
                label: this.contactText,
                name: 'Contact',
                type: 'lookup',
                emptyText: '',
                applyTo: '.',
                valueKeyProperty: 'ContactId',
                valueTextProperty: 'ContactName',
                view: 'contact_related',
                where: this.formatDependentQuery.createDelegate(
                    this, ['Account.Id eq "{0}"', 'AccountId'], true
                )
            },{
                dependsOn: 'Account',
                label: this.opportunityText,
                name: 'Opportunity',
                type: 'lookup',
                emptyText: '',
                applyTo: '.',
                valueKeyProperty: 'OpportunityId',
                valueTextProperty: 'OpportunityName',
                view: 'opportunity_related',
                where: this.formatDependentQuery.createDelegate(
                    this, ['Account.Id eq "{0}"', 'AccountId'], true
                )
            },{
                dependsOn: 'Account',
                label: this.ticketNumberText,
                name: 'Ticket',
                type: 'lookup',
                emptyText: '',
                applyTo: '.',
                valueKeyProperty: 'TicketId',
                valueTextProperty: 'TicketNumber',
                view: 'ticket_related',
                where: this.formatDependentQuery.createDelegate(
                    this, ['Account.Id eq "{0}"', 'AccountId'], true
                )
            },{
                label: this.leadText,
                name: 'Lead',
                type: 'lookup',
                emptyText: '',
                applyTo: '.',
                valueKeyProperty: 'LeadId',
                valueTextProperty: 'LeadName',
                view: 'lead_related'
            },{
                label: this.companyText,
                name: 'AccountName',
                type: 'text'
            }]);
        }
    });     
})();
