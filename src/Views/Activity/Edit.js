/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Activity/Edit', [
    'dojo/_base/declare',
    'dojo/_base/connect',
    'dojo/_base/array',
    'dojo/string',
    'Mobile/SalesLogix/Environment',
    'Mobile/SalesLogix/Template',
    'Mobile/SalesLogix/Validator',
    'Sage/Platform/Mobile/Utility',
    'Sage/Platform/Mobile/Edit',
    'Mobile/SalesLogix/Recurrence',
    'moment'
], function(
    declare,
    connect,
    array,
    string,
    environment,
    template,
    validator,
    utility,
    Edit,
    recur,
    moment
) {

    return declare('Mobile.SalesLogix.Views.Activity.Edit', [Edit], {
        //Localization
        activityCategoryTitleText: 'Activity Category',
        activityDescriptionTitleText: 'Activity Description',
        locationText: 'location',
        activityTypeTitleText: 'Activity Type',
        alarmText: 'alarm',
        reminderText: '',
        categoryText: 'category',
        durationText: 'duration',
        durationTitleText: 'Duration',
        durationInvalidText: "The field '${2}' must have a value.",
        reminderInvalidText: "The field 'reminder' must have a value.",
        reminderTitleText: 'Reminder',
        leaderText: 'leader',
        longNotesText: 'notes',
        longNotesTitleText: 'Notes',
        priorityText: 'priority',
        priorityTitleText: 'Priority',
        regardingText: 'regarding',
        rolloverText: 'auto rollover',
        startingText: 'start time',
        startingFormatText: 'M/D/YYYY h:mm A',
        startingTimelessFormatText: 'M/D/YYYY',
        repeatsText: 'repeats',
        recurringText: 'recurring',
        recurringTitleText: 'Recurring',
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
        phoneText: 'phone',

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
        detailView: 'activity_detail',
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
        groupOptionsByType: {
            atToDo: 'ActivityToDoOptions',
            atPersonal: 'ActivityPersonalOptions',
            atPhoneCall: 'ActivityPhoneOptions',
            atAppointment: 'ActivityMeetingOptions'
        },

        entityName: 'Activity',
        insertSecurity: null, //'Entities/Activity/Add',
        updateSecurity: null, //'Entities/Activity/Edit',
        contractName: 'system',
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
            'Leader/$key',
            'LeadId',
            'LeadName',
            'Location',
            'LongNotes',
            'OpportunityId',
            'OpportunityName',
            'PhoneNumber',
            'Priority',
            'Regarding',
            'Rollover',
            'StartDate',
            'EndDate',
            'TicketId',
            'TicketNumber',
            'Timeless',
            'Type',
            'UserId',
            'Recurring',
            'RecurrenceState',
            'RecurPeriod',
            'RecurPeriodSpec',
            'RecurIterations'
        ],
        resourceKind: 'activities',
        recurrence: {},

        init: function() {
            this.inherited(arguments);

            this.connect(this.fields['Lead'], 'onChange', this.onLeadChange);
            this.connect(this.fields['IsLead'], 'onChange', this.onIsLeadChange);
            this.connect(this.fields['Leader'], 'onChange', this.onLeaderChange);
            this.connect(this.fields['Timeless'], 'onChange', this.onTimelessChange);
            this.connect(this.fields['Alarm'], 'onChange', this.onAlarmChange);

            this.connect(this.fields['Account'], 'onChange', this.onAccountChange);
            this.connect(this.fields['Contact'], 'onChange', this.onContactChange);
            this.connect(this.fields['Opportunity'], 'onChange', this.onOpportunityChange);
            this.connect(this.fields['Ticket'], 'onChange', this.onTicketChange);
            this.connect(this.fields['StartDate'], 'onChange', this.onStartDateChange);
            this.connect(this.fields['RecurrenceUI'], 'onChange', this.onRecurrenceUIChange);
            this.connect(this.fields['Recurrence'], 'onChange', this.onRecurrenceChange);
        },
        onInsertSuccess: function(entry) {
            environment.refreshActivityLists();
            this.inherited(arguments);
        },
        onUpdateSuccess: function(entry) {
            var view = App.getView(this.detailView),
                originalKey = this.options.entry['$key'];

            this.enable();

            environment.refreshActivityLists();
            connect.publish('/app/refresh', [{
                resourceKind: this.resourceKind,
                key: entry['$key'],
                data: entry
            }]);

            if (entry['$key'] != originalKey && view) {
                // Editing single occurrence results in new $key/record
                view.show({
                        key: entry['$key']
                    }, {
                        returnTo: -2
                    });

            } else {
                this.onUpdateCompleted(entry);
            }
        },
        currentUserCanEdit: function(entry) {
            return !!entry && (entry['Leader']['$key'] === App.context['user']['$key']);
        },
        currentUserCanSetAlarm: function(entry) {
            return !!entry && (entry['Leader']['$key'] === App.context['user']['$key']);
        },
        isActivityForLead: function(entry) {
            return entry && /^[\w]{12}$/.test(entry['LeadId']);
        },
        isActivityRecurring: function(entry) {
            return (/rstMaster/).test(this.fields['RecurrenceState'].getValue());
        },
        isInLeadContext: function() {
            var insert = this.options && this.options.insert,
                entry = this.options && this.options.entry,
                lead = (insert && App.isNavigationFromResourceKind('leads', function(o, c) {
                    return c.key;
                })) || this.isActivityForLead(entry);

            return !!lead;
        },
        beforeTransitionTo: function() {
            this.inherited(arguments);

            // we hide the lead or standard fields here, as the view is currently hidden, in order to prevent flashing.
            // the value for the 'IsLead' field will be set later, based on the value derived here.
            if (this.options.isForLead !== undefined) {
                return;
            }

            this.options.isForLead = this.isInLeadContext();

            if (this.options.isForLead) {
                this.showFieldsForLead();
            } else {
                this.showFieldsForStandard();
            }
        },
        disableFields: function(predicate) {
            for (var name in this.fields) {
                if (!predicate || predicate(this.fields[name])) {
                    this.fields[name].disable();
                }
            }
        },
        enableFields: function(predicate) {
            for (var name in this.fields) {
                if (!predicate || predicate(this.fields[name])) {
                    this.fields[name].enable();
                }
            }
        },
        onIsLeadChange: function(value, field) {
            this.options.isForLead = value;

            if (this.options.isForLead) {
                this.showFieldsForLead();
            } else {
                this.showFieldsForStandard();
            }
        },
        showFieldsForLead: function() {
            array.forEach(this.fieldsForStandard.concat(this.fieldsForLeads), function(item) {
                if (this.fields[item]) {
                    this.fields[item].hide();
                }
            }, this);

            array.forEach(this.fieldsForLeads, function(item) {
                if (this.fields[item]) {
                    this.fields[item].show();
                }
            }, this);
        },
        showFieldsForStandard: function() {
            array.forEach(this.fieldsForStandard.concat(this.fieldsForLeads), function(item) {
                if (this.fields[item]) {
                    this.fields[item].hide();
                }
            }, this);

            array.forEach(this.fieldsForStandard, function(item) {
                if (this.fields[item]) {
                    this.fields[item].show();
                }
            }, this);
        },
        toggleSelectField: function(field, disable) {
            if (disable) {
                field.disable();
            } else {
                field.enable();
            }
        },
        onTimelessChange: function(value, field) {
            this.toggleSelectField(this.fields['Duration'], value);

            var startDateField = this.fields['StartDate'],
                wrapped = moment(startDateField.getValue()),
                startDate = wrapped && wrapped.toDate();

            if (value) {
                this.fields['Rollover'].enable();
                startDateField['dateFormatText'] = this.startingTimelessFormatText;
                startDateField['showTimePicker'] = false;
                startDateField['timeless'] = true;
                if (!this.isDateTimeless(startDate)) {
                    wrapped.startOf('day');
                    wrapped.add((-1 * wrapped.zone()), 'minutes');
                    wrapped.add(5, 'seconds');
                    startDate = wrapped.toDate();
                }
                startDateField.setValue(startDate);
            } else {
                this.fields['Rollover'].setValue(false);
                this.fields['Rollover'].disable();
                startDateField['dateFormatText'] = this.startingFormatText;
                startDateField['showTimePicker'] = true;
                startDateField['timeless'] = false;
                if (this.isDateTimeless(startDate)) {
                    wrapped.startOf('day');
                    wrapped.add((wrapped.zone() + 1), 'minutes');
                    wrapped.add(-5, 'seconds');
                    startDate = wrapped.toDate();
                }
                startDateField.setValue(startDate);
            }
        },
        onAlarmChange: function() {
            if (this.fields['Alarm'].getValue()) {
                this.fields['Reminder'].enable();
            } else {
                this.fields['Reminder'].disable();
            }
        },
        onLeadChange: function(value, field) {
            var selection = field.getSelection(),
                phoneField,
                entry;

            if (selection && this.insert) {
                this.fields['AccountName'].setValue(utility.getValue(selection, 'Company'));
            }

            entry = field.currentSelection;
            if (entry.WorkPhone) {
                phoneField = this.fields['PhoneNumber'];
                phoneField.setValue(entry.WorkPhone);
            }
        },
        onLeaderChange: function(value, field) {
            var userId = field.getValue();
            this.fields['UserId'].setValue(userId && userId['$key']);
        },
        onAccountChange: function(value, field) {
            var fields, entry, phoneField;

            fields = this.fields;
            array.forEach(['Contact', 'Opportunity', 'Ticket'], function(f) {
                if (value) {
                    fields[f].dependsOn = 'Account';
                    fields[f].where = string.substitute('Account.Id eq "${0}"', [value['AccountId'] || value['key']]);

                    if (fields[f].currentSelection &&
                        fields[f].currentSelection['Account']['$key'] != (value['AccountId'] || value['key'])) {

                        fields[f].setValue(false);
                    }

                } else {
                    fields[f].dependsOn = null;
                    fields[f].where = 'Account.AccountName ne null';
                }
            });

            entry = field.currentSelection;
            if (entry && entry.MainPhone) {
                phoneField = this.fields['PhoneNumber'];
                phoneField.setValue(entry.MainPhone);
            }
        },
        onContactChange: function(value, field) {
            this.onAccountDependentChange(value, field);

            var entry, phoneField;

            entry = field.currentSelection;

            if (entry && entry.WorkPhone) {
                phoneField = this.fields['PhoneNumber'];
                phoneField.setValue(entry.WorkPhone);
            }
        },
        onOpportunityChange: function(value, field) {
            this.onAccountDependentChange(value, field);

            var entry, phoneField;

            entry = field.currentSelection;

            if (entry && entry.Account && entry.Account.MainPhone) {
                phoneField = this.fields['PhoneNumber'];
                phoneField.setValue(entry.Account.MainPhone);
            }
        },
        onTicketChange: function(value, field) {
            this.onAccountDependentChange(value, field);

            var entry, phoneField, phone;

            entry = field.currentSelection;
            phone = entry && entry.Contact && entry.Contact.WorkPhone || entry && entry.Account && entry.Account.MainPhone;
            if (phone) {
                phoneField = this.fields['PhoneNumber'];
                phoneField.setValue(phone);
            }
        },
        onAccountDependentChange: function(value, field) {
            if (value && !field.dependsOn && field.currentSelection && field.currentSelection['Account']) {
                var accountField = this.fields['Account'];
                accountField.setValue({
                    'AccountId': field.currentSelection['Account']['$key'],
                    'AccountName': field.currentSelection['Account']['AccountName']
                });
                this.onAccountChange(accountField.getValue(), accountField);
            }
        },
        onStartDateChange: function(value, field) {
            this.recurrence.StartDate = value;
            // Need recalculate RecurPeriodSpec in case weekday on StartDate changes
            this.recurrence.RecurPeriodSpec = recur.getRecurPeriodSpec(
                this.recurrence.RecurPeriod,
                this.recurrence.StartDate,
                this.recurrence.RecurPeriodSpec - this.recurrence.RecurPeriodSpec % 65536, // weekdays
                this.recurrence.RecurPeriodSpec % 65536 // interval
            );
            this.resetRecurrence(this.recurrence);

            recur.createSimplifiedOptions(value);

            var repeats = ('rstMaster' == this.recurrence.RecurrenceState);
            this.fields['RecurrenceUI'].setValue(recur.getPanel(repeats && this.recurrence.RecurPeriod));
        },
        onRecurrenceUIChange: function(value, field) {
            var opt = recur.simplifiedOptions[field.currentSelection.$key];
            // preserve #iterations (and EndDate) if matching recurrence
            if (opt.RecurPeriodSpec == this.recurrence.RecurPeriodSpec) {
                opt.RecurIterations = this.recurrence.RecurIterations;
            }

            this.resetRecurrence(opt);
        },
        onRecurrenceChange: function(value, field) {
            // did the StartDate change on the recurrence_edit screen?
            var startDate = Sage.Platform.Mobile.Convert.toDateFromString(value['StartDate']),
                currentDate = this.fields['StartDate'].getValue();

            if (startDate.getDate() != currentDate.getDate() || startDate.getMonth() != currentDate.getMonth()) {
                this.fields['StartDate'].setValue(startDate);
            }

            this.resetRecurrence(value);
        },
        resetRecurrence: function(o) {
            this.recurrence.StartDate = this.fields['StartDate'].getValue();

            this.recurrence.Recurring = o.Recurring;
            this.recurrence.RecurrenceState = o.RecurrenceState;
            this.recurrence.RecurPeriod = o.RecurPeriod;
            this.recurrence.RecurPeriodSpec = o.RecurPeriodSpec;
            this.recurrence.RecurIterations = o.RecurIterations;
            this.recurrence.EndDate = recur.calcEndDate(this.recurrence.StartDate, this.recurrence);

            this.fields['RecurrenceUI'].setValue(recur.getPanel(this.recurrence.RecurPeriod));
            this.fields['Recurrence'].setValue(this.recurrence);

            this.fields['Recurring'].setValue(this.recurrence.Recurring);
            this.fields['RecurPeriod'].setValue(this.recurrence.RecurPeriod);
            this.fields['RecurPeriodSpec'].setValue(this.recurrence.Recurring ? this.recurrence.RecurPeriodSpec : 0);
            this.fields['RecurrenceState'].setValue(this.recurrence.RecurrenceState);
            this.fields['RecurIterations'].setValue(this.recurrence.RecurIterations);
            this.fields['EndDate'].setValue(this.recurrence.EndDate);

            if (o.Recurring) {
                this.fields['Recurrence'].enable();
            } else {
                this.fields['Recurrence'].disable();
            }

        },

        formatPicklistForType: function(type, which) {
            return this.picklistsByType[type] && this.picklistsByType[type][which];
        },
        formatRecurrence: function(recurrence) {
            if (typeof recurrence === 'string') {
                return recurrence;
            }

            return recur.toString(recurrence, true);
        },
        applyUserActivityContext: function(context) {
            var view = App.getView(context.id);
            if (view && view.currentDate)
            {
                var currentDate = view.currentDate.startOf('day'),
                    userOptions = App.context['userOptions'],
                    startTimeOption = userOptions && userOptions['Calendar:DayStartTime'],
                    startTime = startTimeOption && moment(startTimeOption, 'h:mma'),
                    startDate;

                if (startTime && (currentDate.valueOf() == moment().startOf('day').valueOf()))
                {
                    startDate = currentDate.clone()
                        .hours(startTime.hours())
                        .minutes(startTime.minutes());
                }
                else
                {
                    startTime = moment();
                    startDate = currentDate.startOf('day').hours(startTime.hours())
                        .add({'minutes': (Math.floor(startTime.minutes() / 15) * 15) + 15});
                }

                this.fields['StartDate'].setValue(startDate.toDate());
            }
        },
        applyContext: function() {
            this.inherited(arguments);

            var startTime = moment(),
                startDate = moment().startOf('day').hours(startTime.hours()).add({
                    'minutes': (Math.floor(startTime.minutes() / 15) * 15) + 15
                }),
                activityType = this.options && this.options.activityType,
                activityGroup = this.groupOptionsByType[activityType] || '',
                activityDuration = App.context.userOptions && App.context.userOptions[activityGroup + ':Duration'] || 15,
                alarmEnabled = App.context.userOptions && App.context.userOptions[activityGroup + ':AlarmEnabled'] || true,
                alarmDuration = App.context.userOptions && App.context.userOptions[activityGroup + ':AlarmLead'] || 15;

            this.fields['StartDate'].setValue(startDate.toDate());
            this.fields['Type'].setValue(activityType);
            this.fields['Duration'].setValue(activityDuration);
            this.fields['Alarm'].setValue(alarmEnabled);
            this.fields['Reminder'].setValue(alarmDuration);

            var user = App.context['user'];
            if (user) {
                this.fields['UserId'].setValue(user['$key']);

                var leaderField = this.fields['Leader'];
                leaderField.setValue(user);
                this.onLeaderChange(user, leaderField);
            }

            var found = App.queryNavigationContext(function(o) {
                var context = (o.options && o.options.source) || o;

                if (/^(accounts|contacts|opportunities|tickets|leads)$/.test(context.resourceKind) && context.key) {
                    return true;
                }

                if (/^(useractivities)$/.test(context.resourceKind)) {
                    return true;
                }

                if (/^(activities)$/.test(context.resourceKind) && context.options['currentDate']) {
                    return true;
                }

                return false;
            });

            var accountField = this.fields['Account'];
            this.onAccountChange(accountField.getValue(), accountField);

            var context = (found && found.options && found.options.source) || found,
                lookup = {
                    'accounts': this.applyAccountContext,
                    'contacts': this.applyContactContext,
                    'opportunities': this.applyOpportunityContext,
                    'tickets': this.applyTicketContext,
                    'leads': this.applyLeadContext,
                    'useractivities': this.applyUserActivityContext,
                    'activities': this.applyUserActivityContext
                };

            if (context && lookup[context.resourceKind]) {
                lookup[context.resourceKind].call(this, context);
            }
        },
        applyAccountContext: function(context) {
            var view = App.getView(context.id),
                entry = context.entry || (view && view.entry) || context;

            if (!entry || !entry['$key']) {
                return;
            }

            var accountField = this.fields['Account'];
            accountField.setSelection(entry);
            accountField.setValue({
                'AccountId': entry['$key'],
                'AccountName': entry['$descriptor']
            });
            this.onAccountChange(accountField.getValue(), accountField);
        },
        applyContactContext: function(context) {
            var view, entry, contactField, accountField, phoneField;

            view = App.getView(context.id);
            entry = context.entry || (view && view.entry) || context;

            if (!entry || !entry['$key']) {
                return;
            }

            contactField = this.fields['Contact'];

            contactField.setSelection(entry);
            contactField.setValue({
                'ContactId': entry['$key'],
                'ContactName': entry['$descriptor']
            });

            this.onAccountDependentChange(contactField.getValue(), contactField);

            accountField = this.fields['Account'];
            accountField.setValue({
                'AccountId': utility.getValue(entry, 'Account.$key'),
                'AccountName': utility.getValue(entry, 'Account.AccountName')
            });

            if (entry.WorkPhone) {
                phoneField = this.fields['PhoneNumber'];
                phoneField.setValue(entry.WorkPhone);
            }
        },
        applyTicketContext: function(context) {
            var view = App.getView(context.id),
                entry = context.entry || (view && view.entry),
                phoneField,
                phone,
                accountField,
                contactField,
                ticketField;

            if (!entry || !entry['$key']) {
                return;
            }

            ticketField = this.fields['Ticket'];
            ticketField.setSelection(entry);
            ticketField.setValue({
                'TicketId': entry['$key'],
                'TicketNumber': entry['$descriptor']
            });
            this.onAccountDependentChange(ticketField.getValue(), ticketField);

            contactField = this.fields['Contact'];
            contactField.setValue({
                'ContactId': utility.getValue(entry, 'Contact.$key'),
                'ContactName': utility.getValue(entry, 'Contact.NameLF')
            });
            this.onAccountDependentChange(contactField.getValue(), contactField);

            accountField = this.fields['Account'];
            accountField.setValue({
                'AccountId': utility.getValue(entry, 'Account.$key'),
                'AccountName': utility.getValue(entry, 'Account.AccountName')
            });

            phone = entry && entry.Contact && entry.Contact.WorkPhone || entry && entry.Account && entry.Account.MainPhone;
            if (phone) {
                phoneField = this.fields['PhoneNumber'];
                phoneField.setValue(phone);
            }
        },
        applyOpportunityContext: function(context) {
            var view = App.getView(context.id),
                entry = context.entry || (view && view.entry),
                phoneField;

            if (!entry || !entry['$key']) {
                return;
            }

            var opportunityField = this.fields['Opportunity'];
            opportunityField.setSelection(entry);
            opportunityField.setValue({
                'OpportunityId': entry['$key'],
                'OpportunityName': entry['$descriptor']
            });
            this.onAccountDependentChange(opportunityField.getValue(), opportunityField);

            var accountField = this.fields['Account'];
            accountField.setValue({
                'AccountId': utility.getValue(entry, 'Account.$key'),
                'AccountName': utility.getValue(entry, 'Account.AccountName')
            });

            if (entry.Account && entry.Account.MainPhone) {
                phoneField = this.fields['PhoneNumber'];
                phoneField.setValue(entry.Account.MainPhone);
            }
        },
        applyLeadContext: function(context) {
            var view = App.getView(context.id),
                entry = context.entry || (view && view.entry),
                phoneField;

            if (!entry || !entry['$key']) {
                return;
            }

            var leadField = this.fields['Lead'];
            leadField.setSelection(entry);
            leadField.setValue({
                'LeadId': entry['$key'],
                'LeadName': entry['$descriptor']
            });
            this.onLeadChange(leadField.getValue(), leadField);

            this.fields['AccountName'].setValue(entry['Company']);

            var isLeadField = this.fields['IsLead'];
            isLeadField.setValue(context.resourceKind == 'leads');
            this.onIsLeadChange(isLeadField.getValue(), isLeadField);

            if (entry.WorkPhone) {
                phoneField = this.fields['PhoneNumber'];
                phoneField.setValue(entry.WorkPhone);
            }
        },
        setValues: function(values) {
            if (values['StartDate'] && values['AlarmTime']) {
                var startTime = (this.isDateTimeless(values['StartDate']))
                    ? moment(values['StartDate']).add({minutes: values['StartDate'].getTimezoneOffset()}).toDate().getTime()
                    : values['StartDate'].getTime();

                var span = startTime - values['AlarmTime'].getTime(), // ms
                    reminder = span / (1000 * 60);

                values['Reminder'] = reminder;
            }

            this.inherited(arguments);

            this.enableFields();

            if (values['Timeless']) {
                this.fields['Duration'].disable();
                this.fields['Rollover'].enable();
            } else {
                this.fields['Duration'].enable();
                this.fields['Rollover'].disable();
            }

            if (values['Alarm']) {
                this.fields['Reminder'].enable();
            } else {
                this.fields['Reminder'].disable();
            }

            if (this.isInLeadContext()) {
                var isLeadField = this.fields['IsLead'];
                isLeadField.setValue(true);
                this.onIsLeadChange(isLeadField.getValue(), isLeadField);
                this.fields['Lead'].setValue(values, true);
                this.fields['AccountName'].setValue(values['AccountName']);
            }

            var entry = this.options.entry || this.entry,
                denyEdit = !this.options.insert && !this.currentUserCanEdit(entry),
                allowSetAlarm = !denyEdit || this.currentUserCanSetAlarm(entry);

            if (denyEdit) {
                this.disableFields();
            }

            if (allowSetAlarm) {
                this.enableFields(function(f) {
                    return (/^Alarm|Reminder$/).test(f.name);
                });
            }

            this.recurrence.StartDate = Sage.Platform.Mobile.Convert.toDateFromString(values.StartDate);
            this.resetRecurrence(values);
            this.onStartDateChange(this.fields['StartDate'].getValue(), this.fields['StartDate']);
            if (this.isActivityRecurring) {
                this.fields['EndDate'].hide();
            }

        },
        isDateTimeless: function(date) {
            if (!date) {
                return false;
            }
            if (date.getUTCHours() !== 0) {
                return false;
            }
            if (date.getUTCMinutes() !== 0) {
                return false;
            }
            if (date.getUTCSeconds() !== 5) {
                return false;
            }

            return true;
        },
        getValues: function() {
            var values = this.inherited(arguments),
                isStartDateDirty = this.fields['StartDate'].isDirty(),
                isReminderDirty = this.fields['Reminder'].isDirty(),
                startDate = this.fields['StartDate'].getValue(),
                reminderIn = this.fields['Reminder'].getValue(),
                timeless = this.fields['Timeless'].getValue();

            // if StartDate is dirty, always update AlarmTime
            if (startDate && (isStartDateDirty || isReminderDirty)) {
                values = values || {};
                values['AlarmTime'] = moment(startDate).clone().add({'minutes': -1 * reminderIn}).toDate();

                // if timeless, convert back to local time
                if (timeless)
                    values['AlarmTime'] = moment(values['AlarmTime']).add({'minutes': startDate.getTimezoneOffset()}).toDate();
            }

            return values;
        },
        createReminderData: function() {
            var list = [];

            for (var duration in this.reminderValueText) {
                list.push({
                    '$key': duration,
                    '$descriptor': this.reminderValueText[duration]
                });
            }

            return {'$resources': list};
        },
        createDurationData: function() {
            var list = [];

            for (var duration in this.durationValueText) {
                list.push({
                    '$key': duration,
                    '$descriptor': this.durationValueText[duration]
                });
            }

            return {'$resources': list};
        },
        createRecurringData: function() {
            return recur.createSimplifiedOptions(this.fields['StartDate'].getValue());
        },
        formatDependentQuery: function(dependentValue, format, property) {
            return string.substitute(format, [utility.getValue(dependentValue, property || '$key')]);
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                    name: 'Type',
                    property: 'Type',
                    type: 'hidden'
                }, {
                    dependsOn: 'Type',
                    label: this.regardingText,
                    name: 'Description',
                    property: 'Description',
                    picklist: this.formatPicklistForType.bindDelegate(this, 'Description'),
                    title: this.activityDescriptionTitleText,
                    orderBy: 'text asc',
                    type: 'picklist',
                    maxTextLength: 64,
                    validator: validator.exceedsMaxTextLength
                }, {
                    name: 'Location',
                    property: 'Location',
                    label: this.locationText,
                    type: 'text'
                }, {
                    label: this.priorityText,
                    name: 'Priority',
                    property: 'Priority',
                    picklist: 'Priorities',
                    title: this.priorityTitleText,
                    type: 'picklist',
                    maxTextLength: 64,
                    validator: validator.exceedsMaxTextLength
                }, {
                    dependsOn: 'Type',
                    label: this.categoryText,
                    name: 'Category',
                    property: 'Category',
                    picklist: this.formatPicklistForType.bindDelegate(this, 'Category'),
                    orderBy: 'text asc',
                    title: this.activityCategoryTitleText,
                    type: 'picklist',
                    maxTextLength: 64,
                    validator: validator.exceedsMaxTextLength
                }, {
                    label: this.startingText,
                    name: 'StartDate',
                    property: 'StartDate',
                    type: 'date',
                    timeless: false,
                    showTimePicker: true,
                    dateFormatText: this.startingFormatText,
                    minValue: (new Date(1900, 0, 1)),
                    validator: [
                        validator.exists,
                        validator.isDateInRange
                    ]
                }, {
                    type: 'date',
                    name: 'EndDate',
                    property: 'EndDate',
                    include: this.isActivityRecurring
                }, {
                    dependsOn: 'StartDate',
                    label: this.repeatsText,
                    title: this.recurringTitleText,
                    name: 'RecurrenceUI',
                    property: 'RecurrenceUI',
                    type: 'select',
                    view: 'select_list',
                    data: this.createRecurringData.bindDelegate(this),
                    exclude: true
                }, {
                    dependsOn: 'RecurrenceUI',
                    label: this.recurringText,
                    name: 'Recurrence',
                    property: 'Recurrence',
                    type: 'recurrences',
                    applyTo: '.',
                    view: 'recurrence_edit',
                    exclude: true,
                    formatValue: this.formatRecurrence.bindDelegate(this)
                }, {
                    type: 'hidden',
                    name: 'RecurPeriod',
                    property: 'RecurPeriod',
                    include: this.isActivityRecurring
                }, {
                    type: 'hidden',
                    name: 'RecurPeriodSpec',
                    property: 'RecurPeriodSpec',
                    include: this.isActivityRecurring
                }, {
                    type: 'hidden',
                    name: 'RecurrenceState',
                    property: 'RecurrenceState',
                    include: this.isActivityRecurring
                }, {
                    type: 'hidden',
                    name: 'Recurring',
                    property: 'Recurring',
                    include: this.isActivityRecurring
                }, {
                    type: 'hidden',
                    name: 'RecurIterations',
                    property: 'RecurIterations',
                    include: this.isActivityRecurring
                }, {
                    label: this.timelessText,
                    name: 'Timeless',
                    property: 'Timeless',
                    type: 'boolean'
                }, {
                    label: this.durationText,
                    title: this.durationTitleText,
                    name: 'Duration',
                    property: 'Duration',
                    type: 'duration',
                    view: 'select_list',
                    data: this.createDurationData()
                }, {
                    name: 'Alarm',
                    property: 'Alarm',
                    label: this.alarmText,
                    type: 'boolean'
                }, {
                    label: this.reminderText,
                    title: this.reminderTitleText,
                    include: false,
                    name: 'Reminder',
                    property: 'Reminder',
                    type: 'duration',
                    view: 'select_list',
                    data: this.createReminderData()
                }, {
                    label: this.rolloverText,
                    name: 'Rollover',
                    property: 'Rollover',
                    type: 'boolean'
                }, {
                    type: 'hidden',
                    name: 'UserId',
                    property: 'UserId'
                }, {
                    label: this.leaderText,
                    name: 'Leader',
                    property: 'Leader',
                    include: true,
                    type: 'lookup',
                    textProperty: 'UserInfo',
                    textTemplate: template.nameLF,
                    requireSelection: true,
                    view: 'user_list',
                    where: 'Type ne "Template" and Type ne "Retired"'
                }, {
                    label: this.longNotesText,
                    noteProperty: false,
                    name: 'LongNotes',
                    property: 'LongNotes',
                    title: this.longNotesTitleText,
                    type: 'note',
                    view: 'text_edit'
                }, {
                    label: this.isLeadText,
                    name: 'IsLead',
                    property: 'IsLead',
                    include: false,
                    type: 'boolean',
                    onText: this.yesText,
                    offText: this.noText
                }, {
                    label: this.accountText,
                    name: 'Account',
                    property: 'Account',
                    type: 'lookup',
                    emptyText: '',
                    applyTo: '.',
                    valueKeyProperty: 'AccountId',
                    valueTextProperty: 'AccountName',
                    view: 'account_related'
                }, {
                    dependsOn: 'Account',
                    label: this.contactText,
                    name: 'Contact',
                    property: 'Contact',
                    type: 'lookup',
                    emptyText: '',
                    applyTo: '.',
                    valueKeyProperty: 'ContactId',
                    valueTextProperty: 'ContactName',
                    view: 'contact_related',
                    where: this.formatDependentQuery.bindDelegate(
                        this, 'Account.Id eq "${0}"', 'AccountId'
                    )
                }, {
                    dependsOn: 'Account',
                    label: this.opportunityText,
                    name: 'Opportunity',
                    property: 'Opportunity',
                    type: 'lookup',
                    emptyText: '',
                    applyTo: '.',
                    valueKeyProperty: 'OpportunityId',
                    valueTextProperty: 'OpportunityName',
                    view: 'opportunity_related',
                    where: this.formatDependentQuery.bindDelegate(
                        this, 'Account.Id eq "${0}"', 'AccountId'
                    )
                }, {
                    dependsOn: 'Account',
                    label: this.ticketNumberText,
                    name: 'Ticket',
                    property: 'Ticket',
                    type: 'lookup',
                    emptyText: '',
                    applyTo: '.',
                    valueKeyProperty: 'TicketId',
                    valueTextProperty: 'TicketNumber',
                    view: 'ticket_related',
                    where: this.formatDependentQuery.bindDelegate(
                        this, 'Account.Id eq "${0}"', 'AccountId'
                    )
                }, {
                    label: this.leadText,
                    name: 'Lead',
                    property: 'Lead',
                    type: 'lookup',
                    emptyText: '',
                    applyTo: '.',
                    valueKeyProperty: 'LeadId',
                    valueTextProperty: 'LeadName',
                    view: 'lead_related'
                }, {
                    label: this.companyText,
                    name: 'AccountName',
                    property: 'AccountName',
                    type: 'text'
                }, {
                    name: 'PhoneNumber',
                    property: 'PhoneNumber',
                    label: this.phoneText,
                    type: 'phone',
                    maxTextLength: 32,
                    validator: validator.exceedsMaxTextLength
                }
            ]);
        }
    });
});

