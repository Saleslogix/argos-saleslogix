define('crm/Views/Activity/Edit', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/_base/connect', 'dojo/_base/array', 'dojo/string', '../../Environment', '../../Template', '../../Validator', 'argos/Utility', 'argos/Edit', '../../Recurrence', 'argos/Format', 'moment'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojo_baseConnect, _dojo_baseArray, _dojoString, _Environment, _Template, _Validator, _argosUtility, _argosEdit, _Recurrence, _argosFormat, _moment) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _connect = _interopRequireDefault(_dojo_baseConnect);

    var _array = _interopRequireDefault(_dojo_baseArray);

    var _string = _interopRequireDefault(_dojoString);

    var _environment = _interopRequireDefault(_Environment);

    var _template = _interopRequireDefault(_Template);

    var _validator = _interopRequireDefault(_Validator);

    var _utility = _interopRequireDefault(_argosUtility);

    var _Edit = _interopRequireDefault(_argosEdit);

    var _recur = _interopRequireDefault(_Recurrence);

    var _format = _interopRequireDefault(_argosFormat);

    var _moment2 = _interopRequireDefault(_moment);

    /**
    * @class crm.Views.Activity.Edit
    *
    * @extends argos.Edit
    *
    * @requires argos.Edit
    * @requires argos.Utility
    * @requires crm.Format
    * @requires crm.Validator
    * @requires crm.Template
    * @requires crm.Environment
    * @requires crm.Recurrence
    *
    * @requires moment
    *
    */
    var __class = (0, _declare['default'])('crm.Views.Activity.Edit', [_Edit['default']], {
        //Localization
        activityCategoryTitleText: 'Activity Category',
        activityDescriptionTitleText: 'Activity Description',
        locationText: 'location',
        activityTypeTitleText: 'Activity Type',
        alarmText: 'alarm',
        reminderText: 'reminder',
        categoryText: 'category',
        durationText: 'duration',
        durationTitleText: 'Duration',
        durationInvalidText: 'The field \'${2}\' must have a value.',
        reminderInvalidText: 'The field \'reminder\' must have a value.',
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

        /**
         * @property {Number}
         * The number of minutes that should be rounded to as a default start when creating a new activity
         */
        ROUND_MINUTES: 15,

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
        querySelect: ['AccountId', 'AccountName', 'Alarm', 'AlarmTime', 'Category', 'ContactId', 'ContactName', 'Description', 'Duration', 'Leader/$key', 'LeadId', 'LeadName', 'Location', 'LongNotes', 'OpportunityId', 'OpportunityName', 'PhoneNumber', 'Priority', 'Regarding', 'Rollover', 'StartDate', 'EndDate', 'TicketId', 'TicketNumber', 'Timeless', 'Type', 'UserId', 'Recurring', 'RecurrenceState', 'RecurPeriod', 'RecurPeriodSpec', 'RecurIterations', 'AllowAdd', 'AllowEdit', 'AllowDelete', 'AllowComplete'],
        resourceKind: 'activities',
        recurrence: null,
        _previousRecurrence: null,

        init: function init() {
            this.inherited(arguments);

            this.recurrence = {
                RecurIterations: '0',
                RecurPeriod: '-1',
                RecurPeriodSpec: '0'
            };

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
        onAddComplete: function onAddComplete() {
            _environment['default'].refreshActivityLists();
            this.inherited(arguments);
        },
        onPutComplete: function onPutComplete(entry) {
            var view = App.getView(this.detailView),
                originalKey = this.options.entry && this.options.entry['$key'] || entry['$key'];

            this.enable();

            _environment['default'].refreshActivityLists();
            _connect['default'].publish('/app/refresh', [{
                resourceKind: this.resourceKind,
                key: entry['$key'],
                data: entry
            }]);

            if (entry['$key'] !== originalKey && view) {
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
        convertEntry: function convertEntry() {
            var entry = this.inherited(arguments);
            if (!this.options.entry) {
                if (entry && entry['Leader']['$key']) {
                    this.requestLeader(entry['Leader']['$key']);
                }
            }

            return entry;
        },
        requestLeader: function requestLeader(userId) {
            var request = new Sage.SData.Client.SDataSingleResourceRequest(this.getConnection()).setResourceKind('users').setResourceSelector(_string['default'].substitute('\'${0}\'', [userId])).setQueryArg('select', ['UserInfo/FirstName', 'UserInfo/LastName'].join(','));

            request.read({
                success: this.processLeader,
                failure: this.requestLeaderFailure,
                scope: this
            });
        },
        requestLeaderFailure: function requestLeaderFailure() {},
        processLeader: function processLeader(leader) {
            if (leader) {
                this.entry['Leader'] = leader;
                this.fields['Leader'].setValue(leader);
            }
        },
        currentUserCanEdit: function currentUserCanEdit(entry) {
            return entry && entry['AllowEdit'];
        },
        currentUserCanSetAlarm: function currentUserCanSetAlarm(entry) {
            return !!entry && entry['Leader']['$key'] === App.context['user']['$key'];
        },
        isActivityForLead: function isActivityForLead(entry) {
            return entry && /^[\w]{12}$/.test(entry['LeadId']);
        },
        isActivityRecurring: function isActivityRecurring() {
            return /rstMaster/.test(this.fields['RecurrenceState'].getValue());
        },
        isInLeadContext: function isInLeadContext() {
            var lead,
                isLeadContext,
                insert = this.options && this.options.insert,
                entry = this.options && this.options.entry,
                context = this._getNavContext();
            isLeadContext = false;
            if (context.resourceKind === 'leads') {
                isLeadContext = true;
            }

            lead = insert && isLeadContext || this.isActivityForLead(entry);

            return !!lead;
        },
        beforeTransitionTo: function beforeTransitionTo() {
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
        disableFields: function disableFields(predicate) {
            for (var name in this.fields) {
                if (!predicate || predicate(this.fields[name])) {
                    this.fields[name].disable();
                }
            }
        },
        enableFields: function enableFields(predicate) {
            for (var name in this.fields) {
                if (!predicate || predicate(this.fields[name])) {
                    this.fields[name].enable();
                }
            }
        },
        onIsLeadChange: function onIsLeadChange(value) {
            this.options.isForLead = value;

            if (this.options.isForLead) {
                this.showFieldsForLead();
            } else {
                this.showFieldsForStandard();
            }
        },
        showFieldsForLead: function showFieldsForLead() {
            _array['default'].forEach(this.fieldsForStandard.concat(this.fieldsForLeads), function (item) {
                if (this.fields[item]) {
                    this.fields[item].hide();
                }
            }, this);

            _array['default'].forEach(this.fieldsForLeads, function (item) {
                if (this.fields[item]) {
                    this.fields[item].show();
                }
            }, this);
        },
        showFieldsForStandard: function showFieldsForStandard() {
            _array['default'].forEach(this.fieldsForStandard.concat(this.fieldsForLeads), function (item) {
                if (this.fields[item]) {
                    this.fields[item].hide();
                }
            }, this);

            _array['default'].forEach(this.fieldsForStandard, function (item) {
                if (this.fields[item]) {
                    this.fields[item].show();
                }
            }, this);
        },
        toggleSelectField: function toggleSelectField(field, disable) {
            if (disable) {
                field.disable();
            } else {
                field.enable();
            }
        },
        onTimelessChange: function onTimelessChange(value) {
            this.toggleSelectField(this.fields['Duration'], value);
            var startDate, startDateField;

            startDateField = this.fields['StartDate'];

            if (value) {
                // StartDate timeless
                this.fields['Rollover'].enable();
                startDateField['dateFormatText'] = this.startingTimelessFormatText;
                startDateField['showTimePicker'] = false;
                startDateField['timeless'] = true;
                startDate = this._getNewStartDate(startDateField.getValue(), true);

                if (startDate) {
                    startDateField.setValue(startDate);
                }
            } else {
                // StartDate with out time (Timeless)
                this.fields['Rollover'].setValue(false);
                this.fields['Rollover'].disable();
                startDateField['dateFormatText'] = this.startingFormatText;
                startDateField['showTimePicker'] = true;
                startDateField['timeless'] = false;
                startDate = this._getNewStartDate(startDateField.getValue(), false);

                if (startDate) {
                    startDateField.setValue(startDate);
                }
            }
        },
        onAlarmChange: function onAlarmChange() {
            if (this.fields['Alarm'].getValue()) {
                this.fields['Reminder'].enable();
            } else {
                this.fields['Reminder'].disable();
            }
        },
        onLeadChange: function onLeadChange(value, field) {
            var selection = field.getSelection(),
                phoneField,
                entry;

            if (selection && this.insert) {
                this.fields['AccountName'].setValue(_utility['default'].getValue(selection, 'Company'));
            }

            entry = field.currentSelection;
            if (entry.WorkPhone) {
                phoneField = this.fields['PhoneNumber'];
                phoneField.setValue(entry.WorkPhone);
            }
        },
        onLeaderChange: function onLeaderChange(value, field) {
            var user = field.getValue(),
                key,
                resourceId = '';

            key = user['$key'];

            // The key is a composite key on activityresourceviews endpoint.
            // The format is 'ResourceId-AccessId'.
            // The feed does include these as seperate fields, but we need to keep the $key/$descriptor format for doing
            // the PUT to the activities endpoint. We will convert the composite key to something the activities endpoint will understand.
            if (key) {
                key = key.split('-');
                resourceId = key[0];
                if (resourceId) {
                    this.fields['UserId'].setValue(resourceId);

                    // Set back to a single $key so the PUT request payload is not messed up
                    this.fields['Leader'].setValue({
                        '$key': resourceId,
                        '$descriptor': user['$descriptor']
                    });
                }
            }
        },
        onAccountChange: function onAccountChange(value, field) {
            if (value === null || typeof value === 'undefined') {
                return;
            }

            var fields, entry, phoneField;

            fields = this.fields;
            _array['default'].forEach(['Contact', 'Opportunity', 'Ticket'], function (f) {
                if (value) {
                    fields[f].dependsOn = 'Account';
                    fields[f].where = _string['default'].substitute('Account.Id eq "${0}"', [value['AccountId'] || value['key']]);

                    if (fields[f].currentSelection && fields[f].currentSelection['Account']['$key'] !== (value['AccountId'] || value['key'])) {

                        fields[f].setValue(false);
                    }

                    // No way to determine if the field is part of the changed account, clear it
                    if (!fields[f].currentSelection) {
                        fields[f].setValue(null);
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
        onContactChange: function onContactChange(value, field) {
            this.onAccountDependentChange(value, field);

            var entry, phoneField;

            entry = field.currentSelection;

            if (entry && entry.WorkPhone) {
                phoneField = this.fields['PhoneNumber'];
                phoneField.setValue(entry.WorkPhone);
            }
        },
        onOpportunityChange: function onOpportunityChange(value, field) {
            this.onAccountDependentChange(value, field);

            var entry, phoneField;

            entry = field.currentSelection;

            if (entry && entry.Account && entry.Account.MainPhone) {
                phoneField = this.fields['PhoneNumber'];
                phoneField.setValue(entry.Account.MainPhone);
            }
        },
        onTicketChange: function onTicketChange(value, field) {
            this.onAccountDependentChange(value, field);

            var entry, phoneField, phone;

            entry = field.currentSelection;
            phone = entry && entry.Contact && entry.Contact.WorkPhone || entry && entry.Account && entry.Account.MainPhone;
            if (phone) {
                phoneField = this.fields['PhoneNumber'];
                phoneField.setValue(phone);
            }
        },
        onAccountDependentChange: function onAccountDependentChange(value, field) {
            if (value && !field.dependsOn && field.currentSelection && field.currentSelection['Account']) {
                var accountField = this.fields['Account'];
                accountField.setValue({
                    'AccountId': field.currentSelection['Account']['$key'],
                    'AccountName': field.currentSelection['Account']['AccountName']
                });
                this.onAccountChange(accountField.getValue(), accountField);
            }
        },
        onStartDateChange: function onStartDateChange(value) {
            this.recurrence.StartDate = value;
            // Need recalculate RecurPeriodSpec in case weekday on StartDate changes
            this.recurrence.RecurPeriodSpec = _recur['default'].getRecurPeriodSpec(this.recurrence.RecurPeriod, this.recurrence.StartDate, this.recurrence.RecurPeriodSpec - this.recurrence.RecurPeriodSpec % 65536, // weekdays
            this.recurrence.RecurPeriodSpec % 65536 // interval
            );
            this.resetRecurrence(this.recurrence);

            _recur['default'].createSimplifiedOptions(value);

            var repeats = 'rstMaster' === this.recurrence.RecurrenceState;
            this.fields['RecurrenceUI'].setValue(_recur['default'].getPanel(repeats && this.recurrence.RecurPeriod));
        },
        onRecurrenceUIChange: function onRecurrenceUIChange(value, field) {
            var opt, key;

            key = field.currentValue && field.currentValue.key;
            opt = _recur['default'].simplifiedOptions[key];
            // preserve #iterations (and EndDate) if matching recurrence
            if (this._previousRecurrence === key) {
                opt.RecurIterations = this.recurrence.RecurIterations;
            }

            this.resetRecurrence(opt);
            this._previousRecurrence = key;
        },
        onRecurrenceChange: function onRecurrenceChange(value) {
            // did the StartDate change on the recurrence_edit screen?
            var startDate = argos.Convert.toDateFromString(value['StartDate']),
                currentDate = this.fields['StartDate'].getValue();

            if (startDate.getDate() !== currentDate.getDate() || startDate.getMonth() !== currentDate.getMonth()) {
                this.fields['StartDate'].setValue(startDate);
            }

            this.resetRecurrence(value);
        },
        resetRecurrence: function resetRecurrence(o) {
            this.recurrence.StartDate = this.fields['StartDate'].getValue();

            if (typeof o.Recurring !== 'undefined' && o.Recurring !== null) {
                this.recurrence.Recurring = o.Recurring;
            }

            if (typeof o.RecurrenceState !== 'undefined' && o.RecurrenceState !== null) {
                this.recurrence.RecurrenceState = o.RecurrenceState;
            }

            if (typeof o.RecurPeriod !== 'undefined' && o.RecurPeriod !== null) {
                this.recurrence.RecurPeriod = o.RecurPeriod;
            }

            if (typeof o.RecurPeriodSpec !== 'undefined' && o.RecurPeriodSpec !== null) {
                this.recurrence.RecurPeriodSpec = o.RecurPeriodSpec;
            }

            if (typeof o.RecurIterations !== 'undefined' && o.RecurIterations !== null) {
                this.recurrence.RecurIterations = o.RecurIterations;
            }

            this.recurrence.EndDate = _recur['default'].calcEndDate(this.recurrence.StartDate, this.recurrence);

            this.fields['RecurrenceUI'].setValue(_recur['default'].getPanel(this.recurrence.RecurPeriod));
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

        formatPicklistForType: function formatPicklistForType(type, which) {
            return this.picklistsByType[type] && this.picklistsByType[type][which];
        },
        formatRecurrence: function formatRecurrence(recurrence) {
            if (typeof recurrence === 'string') {
                return recurrence;
            }

            return _recur['default'].toString(recurrence, true);
        },
        _getCalculatedStartTime: function _getCalculatedStartTime(selectedDate) {
            var now = (0, _moment2['default'])(),
                startDate;

            if (!_moment2['default'].isMoment(selectedDate)) {
                selectedDate = (0, _moment2['default'])(selectedDate);
            }

            // Take the start of the selected date, add the *current* time to it,
            // and round it up to the nearest ROUND_MINUTES
            // Examples:
            // 11:24 -> 11:30
            // 11:12 -> 11:15
            // 11:31 -> 11:45
            startDate = selectedDate.clone().startOf('day').hours(now.hours()).add({ 'minutes': Math.floor(now.minutes() / this.ROUND_MINUTES) * this.ROUND_MINUTES + this.ROUND_MINUTES });

            return startDate;
        },
        applyUserActivityContext: function applyUserActivityContext(optionsDate) {
            return this._getCalculatedStartTime(optionsDate);
        },
        applyContext: function applyContext() {
            this.inherited(arguments);

            var startDate = this._getCalculatedStartTime((0, _moment2['default'])()),
                user,
                found,
                accountField,
                leaderField,
                context,
                lookup,
                activityType = this.options && this.options.activityType,
                activityGroup = this.groupOptionsByType[activityType] || '',
                activityDuration = App.context.userOptions && App.context.userOptions[activityGroup + ':Duration'] || 15,
                alarmEnabled = App.context.userOptions && App.context.userOptions[activityGroup + ':AlarmEnabled'] || true,
                alarmDuration = App.context.userOptions && App.context.userOptions[activityGroup + ':AlarmLead'] || 15;

            if (this.options && this.options.currentDate) {
                startDate = this.applyUserActivityContext((0, _moment2['default'])(this.options.currentDate));
            }

            this.fields['StartDate'].setValue(startDate.toDate());
            this.fields['Type'].setValue(activityType);
            this.fields['Duration'].setValue(activityDuration);
            this.fields['Alarm'].setValue(alarmEnabled);
            this.fields['Reminder'].setValue(alarmDuration);

            user = App.context['user'];
            if (user) {
                this.fields['UserId'].setValue(user['$key']);

                leaderField = this.fields['Leader'];
                leaderField.setValue(user);
                this.onLeaderChange(user, leaderField);
            }

            found = this._getNavContext();

            accountField = this.fields['Account'];
            this.onAccountChange(accountField.getValue(), accountField);

            context = found && found.options && found.options.source || found;
            lookup = {
                'accounts': this.applyAccountContext,
                'contacts': this.applyContactContext,
                'opportunities': this.applyOpportunityContext,
                'tickets': this.applyTicketContext,
                'leads': this.applyLeadContext
            };

            if (context && lookup[context.resourceKind]) {
                lookup[context.resourceKind].call(this, context);
            }
        },
        _getNavContext: function _getNavContext() {
            var navContext = App.queryNavigationContext(function (o) {
                var context = o.options && o.options.source || o;

                if (/^(accounts|contacts|opportunities|tickets|leads)$/.test(context.resourceKind) && context.key) {
                    return true;
                }

                return false;
            });
            return navContext;
        },
        applyAccountContext: function applyAccountContext(context) {
            var view = App.getView(context.id),
                accountField,
                entry = context.entry || view && view.entry || context;

            if (!entry || !entry['$key']) {
                return;
            }

            accountField = this.fields['Account'];
            accountField.setSelection(entry);
            accountField.setValue({
                'AccountId': entry['$key'],
                'AccountName': entry['$descriptor']
            });
            this.onAccountChange(accountField.getValue(), accountField);
        },
        applyContactContext: function applyContactContext(context) {
            var view, entry, contactField, accountField, phoneField;

            view = App.getView(context.id);
            entry = context.entry || view && view.entry || context;

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
                'AccountId': _utility['default'].getValue(entry, 'Account.$key'),
                'AccountName': _utility['default'].getValue(entry, 'Account.AccountName')
            });

            if (entry.WorkPhone) {
                phoneField = this.fields['PhoneNumber'];
                phoneField.setValue(entry.WorkPhone);
            }
        },
        applyTicketContext: function applyTicketContext(context) {
            var view = App.getView(context.id),
                entry = context.entry || view && view.entry,
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
                'ContactId': _utility['default'].getValue(entry, 'Contact.$key'),
                'ContactName': _utility['default'].getValue(entry, 'Contact.NameLF')
            });
            this.onAccountDependentChange(contactField.getValue(), contactField);

            accountField = this.fields['Account'];
            accountField.setValue({
                'AccountId': _utility['default'].getValue(entry, 'Account.$key'),
                'AccountName': _utility['default'].getValue(entry, 'Account.AccountName')
            });

            phone = entry && entry.Contact && entry.Contact.WorkPhone || entry && entry.Account && entry.Account.MainPhone;
            if (phone) {
                phoneField = this.fields['PhoneNumber'];
                phoneField.setValue(phone);
            }
        },
        applyOpportunityContext: function applyOpportunityContext(context) {
            var view = App.getView(context.id),
                entry = context.entry || view && view.entry,
                opportunityField,
                accountField,
                phoneField;

            if (!entry || !entry['$key']) {
                return;
            }

            opportunityField = this.fields['Opportunity'];
            opportunityField.setSelection(entry);
            opportunityField.setValue({
                'OpportunityId': entry['$key'],
                'OpportunityName': entry['$descriptor']
            });

            this.onAccountDependentChange(opportunityField.getValue(), opportunityField);

            accountField = this.fields['Account'];
            accountField.setValue({
                'AccountId': _utility['default'].getValue(entry, 'Account.$key'),
                'AccountName': _utility['default'].getValue(entry, 'Account.AccountName')
            });

            if (entry.Account && entry.Account.MainPhone) {
                phoneField = this.fields['PhoneNumber'];
                phoneField.setValue(entry.Account.MainPhone);
            }
        },
        applyLeadContext: function applyLeadContext(context) {
            var view = App.getView(context.id),
                entry = context.entry || view && view.entry,
                leadField,
                isLeadField,
                phoneField;

            if (!entry || !entry['$key']) {
                return;
            }

            leadField = this.fields['Lead'];
            leadField.setSelection(entry);
            leadField.setValue({
                'LeadId': entry['$key'],
                'LeadName': entry['$descriptor']
            });
            this.onLeadChange(leadField.getValue(), leadField);

            this.fields['AccountName'].setValue(entry['Company']);

            isLeadField = this.fields['IsLead'];
            isLeadField.setValue(context.resourceKind === 'leads');
            this.onIsLeadChange(isLeadField.getValue(), isLeadField);

            if (entry.WorkPhone) {
                phoneField = this.fields['PhoneNumber'];
                phoneField.setValue(entry.WorkPhone);
            }
        },
        setValues: function setValues(values) {
            var startTime, span, isLeadField, entry, denyEdit, allowSetAlarm, reminder;

            if (values['StartDate'] && values['AlarmTime']) {
                startTime = this.isDateTimeless(values['StartDate']) ? (0, _moment2['default'])(values['StartDate']).add({ minutes: values['StartDate'].getTimezoneOffset() }).toDate().getTime() : values['StartDate'].getTime();

                span = startTime - values['AlarmTime'].getTime(); // ms
                reminder = span / (1000 * 60);

                values['Reminder'] = _format['default'].fixed(reminder, 0);
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
                isLeadField = this.fields['IsLead'];
                isLeadField.setValue(true);
                this.onIsLeadChange(isLeadField.getValue(), isLeadField);
                this.fields['Lead'].setValue(values, true);
                this.fields['AccountName'].setValue(values['AccountName']);
            }

            entry = this.options.entry || this.entry;
            denyEdit = !this.options.insert && !this.currentUserCanEdit(entry);
            allowSetAlarm = !denyEdit || this.currentUserCanSetAlarm(entry);

            if (denyEdit) {
                this.disableFields();
            }

            if (allowSetAlarm) {
                this.enableFields(function (f) {
                    return /^Alarm|Reminder$/.test(f.name);
                });
            }

            this.recurrence.StartDate = argos.Convert.toDateFromString(values.StartDate);
            this.resetRecurrence(values);
            this.onStartDateChange(this.fields['StartDate'].getValue(), this.fields['StartDate']);
            if (this.isActivityRecurring) {
                this.fields['EndDate'].hide();
            }
        },
        isDateTimeless: function isDateTimeless(date) {
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
        isDateTimelessLocal: function isDateTimelessLocal(date) {
            if (!date) {
                return false;
            }
            if (date.getHours() !== 0) {
                return false;
            }
            if (date.getMinutes() !== 0) {
                return false;
            }
            if (date.getSeconds() !== 5) {
                return false;
            }

            return true;
        },
        getValues: function getValues() {
            var values = this.inherited(arguments),
                isStartDateDirty = this.fields['StartDate'].isDirty(),
                isReminderDirty = this.fields['Reminder'].isDirty(),
                startDate = this.fields['StartDate'].getValue(),
                reminderIn = this.fields['Reminder'].getValue(),
                timeless = this.fields['Timeless'].getValue(),
                alarmTime;

            // Fix timeless if necessary (The date picker won't add 5 seconds)
            if (timeless) {
                values['StartDate'] = startDate = this._getNewStartDate(startDate, true);
            }

            // if StartDate is dirty, always update AlarmTime
            if (startDate && (isStartDateDirty || isReminderDirty)) {
                values = values || {};
                alarmTime = this._getNewAlarmTime(startDate, timeless, reminderIn);
                values['AlarmTime'] = alarmTime;
            }

            return values;
        },
        createReminderData: function createReminderData() {
            var list = [],
                duration;

            for (duration in this.reminderValueText) {
                if (this.reminderValueText.hasOwnProperty(duration)) {
                    list.push({
                        '$key': duration,
                        '$descriptor': this.reminderValueText[duration]
                    });
                }
            }

            return { '$resources': list };
        },
        createDurationData: function createDurationData() {
            var list = [],
                duration;

            for (duration in this.durationValueText) {
                if (this.durationValueText.hasOwnProperty(duration)) {
                    list.push({
                        '$key': duration,
                        '$descriptor': this.durationValueText[duration]
                    });
                }
            }

            return { '$resources': list };
        },
        createRecurringData: function createRecurringData() {
            return _recur['default'].createSimplifiedOptions(this.fields['StartDate'].getValue());
        },
        formatDependentQuery: function formatDependentQuery(dependentValue, format, property) {
            return _string['default'].substitute(format, [_utility['default'].getValue(dependentValue, property || '$key')]);
        },
        _getNewStartDate: function _getNewStartDate(orginalStartDate, timeless) {
            var startDate, currentTime, wrapped, isTimeLessDate;

            if (!orginalStartDate) {
                return null;
            }

            startDate = orginalStartDate;
            isTimeLessDate = this.isDateTimeless(startDate) || this.isDateTimelessLocal(startDate);

            if (timeless) {
                if (!isTimeLessDate) {
                    wrapped = (0, _moment2['default'])(startDate);
                    wrapped = _moment2['default'].utc(wrapped.format('YYYY-MM-DD'), 'YYYY-MM-DD');
                    wrapped.add('seconds', 5);
                    startDate = wrapped.toDate();
                }
            } else {
                if (isTimeLessDate) {
                    currentTime = (0, _moment2['default'])();
                    wrapped = (0, _moment2['default'])(startDate);
                    wrapped.add({ minutes: wrapped.zone() });
                    wrapped.hours(currentTime.hours());
                    wrapped.minutes(currentTime.minutes());
                    wrapped.seconds(0);
                    startDate = wrapped.toDate();
                }
            }

            return startDate;
        },
        _getNewAlarmTime: function _getNewAlarmTime(startDate, timeless, reminderIn) {
            var alarmTime, wrapped;

            if (!startDate) {
                return null;
            }

            if (timeless) {
                wrapped = (0, _moment2['default'])(startDate);
                wrapped.add({ minutes: wrapped.zone() });
                wrapped.hours(24);
                wrapped.minutes(0);
                wrapped.seconds(0);
                alarmTime = wrapped.toDate();
                alarmTime = (0, _moment2['default'])(alarmTime).clone().add({ 'days': -1 }).add({ 'minutes': -1 * reminderIn }).toDate();
            } else {
                alarmTime = (0, _moment2['default'])(startDate).clone().add({ 'minutes': -1 * reminderIn }).toDate();
            }

            return alarmTime;
        },
        createLayout: function createLayout() {
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
                validator: _validator['default'].exceedsMaxTextLength,
                autoFocus: true
            }, {
                label: this.longNotesText,
                noteProperty: false,
                name: 'LongNotes',
                property: 'LongNotes',
                title: this.longNotesTitleText,
                type: 'note',
                view: 'text_edit'
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
                validator: _validator['default'].exceedsMaxTextLength
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
                validator: _validator['default'].exceedsMaxTextLength
            }, {
                label: this.startingText,
                name: 'StartDate',
                property: 'StartDate',
                type: 'date',
                timeless: false,
                showTimePicker: true,
                dateFormatText: this.startingFormatText,
                minValue: new Date(1900, 0, 1),
                validator: [_validator['default'].exists, _validator['default'].isDateInRange]
            }, {
                type: 'date',
                name: 'EndDate',
                property: 'EndDate',
                include: true
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
                include: true
            }, {
                type: 'hidden',
                name: 'RecurPeriodSpec',
                property: 'RecurPeriodSpec',
                include: true
            }, {
                type: 'hidden',
                name: 'RecurrenceState',
                property: 'RecurrenceState',
                include: true
            }, {
                type: 'hidden',
                name: 'Recurring',
                property: 'Recurring',
                include: true
            }, {
                type: 'hidden',
                name: 'RecurIterations',
                property: 'RecurIterations',
                include: true
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
                requireSelection: true,
                view: 'calendar_access_list'
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
                applyTo: function applyTo(payload, value) {
                    if (value === null) {
                        payload[this.valueKeyProperty] = null;
                        payload[this.valueTextProperty] = null;
                    }
                },
                valueKeyProperty: 'ContactId',
                valueTextProperty: 'ContactName',
                view: 'contact_related',
                where: this.formatDependentQuery.bindDelegate(this, 'Account.Id eq "${0}"', 'AccountId')
            }, {
                dependsOn: 'Account',
                label: this.opportunityText,
                name: 'Opportunity',
                property: 'Opportunity',
                type: 'lookup',
                emptyText: '',
                applyTo: function applyTo(payload, value) {
                    if (value === null) {
                        payload[this.valueKeyProperty] = null;
                        payload[this.valueTextProperty] = null;
                    }
                },
                valueKeyProperty: 'OpportunityId',
                valueTextProperty: 'OpportunityName',
                view: 'opportunity_related',
                where: this.formatDependentQuery.bindDelegate(this, 'Account.Id eq "${0}"', 'AccountId')
            }, {
                dependsOn: 'Account',
                label: this.ticketNumberText,
                name: 'Ticket',
                property: 'Ticket',
                type: 'lookup',
                emptyText: '',
                applyTo: function applyTo(payload, value) {
                    if (value === null) {
                        payload[this.valueKeyProperty] = null;
                        payload[this.valueTextProperty] = null;
                    }
                },
                valueKeyProperty: 'TicketId',
                valueTextProperty: 'TicketNumber',
                view: 'ticket_related',
                where: this.formatDependentQuery.bindDelegate(this, 'Account.Id eq "${0}"', 'AccountId')
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
                validator: _validator['default'].exceedsMaxTextLength
            }]);
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Views.Activity.Edit', __class);
    module.exports = __class;
});
