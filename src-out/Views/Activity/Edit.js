define('crm/Views/Activity/Edit', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/connect', 'dojo/string', '../../Environment', '../../Validator', 'argos/Utility', 'argos/Edit', '../../Recurrence', 'argos/Format', 'argos/I18n', '../../Models/Names', '../../Models/Activity/ActivityTypePicklists'], function (module, exports, _declare, _connect, _string, _Environment, _Validator, _Utility, _Edit, _Recurrence, _Format, _I18n, _Names, _ActivityTypePicklists) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _connect2 = _interopRequireDefault(_connect);

  var _string2 = _interopRequireDefault(_string);

  var _Environment2 = _interopRequireDefault(_Environment);

  var _Validator2 = _interopRequireDefault(_Validator);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _Recurrence2 = _interopRequireDefault(_Recurrence);

  var _Format2 = _interopRequireDefault(_Format);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Names2 = _interopRequireDefault(_Names);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /* Copyright 2017 Infor
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var resource = (0, _I18n2.default)('activityEdit');
  var dtFormatResource = (0, _I18n2.default)('activityEditDateTimeFormat');

  var __class = (0, _declare2.default)('crm.Views.Activity.Edit', [_Edit2.default], {
    // Localization
    activityCategoryTitleText: resource.activityCategoryTitleText,
    activityDescriptionTitleText: resource.activityDescriptionTitleText,
    locationText: resource.locationText,
    activityTypeTitleText: resource.activityTypeTitleText,
    alarmText: resource.alarmText,
    reminderText: resource.reminderText,
    categoryText: resource.categoryText,
    durationText: resource.durationText,
    durationTitleText: resource.durationTitleText,
    durationInvalidText: resource.durationInvalidText,
    reminderInvalidText: resource.reminderInvalidText,
    reminderTitleText: resource.reminderInvalidText,
    leaderText: resource.leaderText,
    longNotesText: resource.longNotesText,
    longNotesTitleText: resource.longNotesTitleText,
    priorityText: resource.priorityText,
    priorityTitleText: resource.priorityTitleText,
    regardingText: resource.regardingText,
    rolloverText: resource.rolloverText,
    startingText: resource.startingText,
    startingFormatText: dtFormatResource.startingFormatText,
    startingFormatText24: dtFormatResource.startingFormatText24,
    startingTimelessFormatText: dtFormatResource.startingTimelessFormatText,
    repeatsText: resource.repeatsText,
    recurringText: resource.recurringText,
    recurringTitleText: resource.recurringTitleText,
    timelessText: resource.timelessText,
    titleText: resource.titleText,
    typeText: resource.typeText,
    accountText: resource.accountText,
    contactText: resource.contactText,
    opportunityText: resource.opportunityText,
    ticketNumberText: resource.ticketNumberText,
    companyText: resource.companyText,
    leadText: resource.leadText,
    isLeadText: resource.isLeadText,
    yesText: resource.yesText,
    noText: resource.noText,
    phoneText: resource.phoneText,
    updateUserActErrorText: resource.updateUserActErrorText,
    reminderValueText: {
      0: resource.noneText,
      5: resource.fiveMinText,
      15: resource.quarterHourText,
      30: resource.halfHourText,
      60: resource.hourText,
      1440: resource.dayText
    },
    durationValueText: {
      0: resource.noneText,
      5: resource.fiveMinText,
      10: resource.tenMinutesText,
      15: resource.quarterHourText,
      30: resource.halfHourText,
      60: resource.hourText,
      120: resource.twoHoursText,
      240: resource.fourHoursText
    },

    /*
     * The number of minutes that should be rounded to as a default start when creating a new activity
     */
    ROUND_MINUTES: 15,

    // View Properties
    id: 'activity_edit',
    detailView: 'activity_detail',
    fieldsForLeads: ['AccountName', 'Lead'],
    fieldsForStandard: ['Account', 'Contact', 'Opportunity', 'Ticket'],
    /*
     * @deprecated Use ActivityTypePicklists from Modes/Activity/ActivityTypePicklists instead
     */
    picklistsByType: {
      atAppointment: {
        Category: 'Meeting Category Codes',
        Description: 'Meeting Regarding'
      },
      atLiterature: {
        Description: 'Lit Request Regarding'
      },
      atPersonal: {
        Category: 'Meeting Category Codes',
        Description: 'Personal Activity Regarding'
      },
      atPhoneCall: {
        Category: 'Phone Call Category Codes',
        Description: 'Phone Call Regarding'
      },
      atToDo: {
        Category: 'To Do Category Codes',
        Description: 'To Do Regarding'
      },
      atEMail: {
        Category: 'E-mail Category Codes',
        Description: 'E-mail Regarding'
      }
    },
    groupOptionsByType: {
      atToDo: 'ActivityToDoOptions',
      atPersonal: 'ActivityPersonalOptions',
      atPhoneCall: 'ActivityPhoneOptions',
      atAppointment: 'ActivityMeetingOptions'
    },

    entityName: 'Activity',
    modelName: _Names2.default.ACTIVITY,
    insertSecurity: null, // 'Entities/Activity/Add',
    updateSecurity: null, // 'Entities/Activity/Edit',
    contractName: 'system',
    resourceKind: 'activities',
    recurrence: null,
    _previousRecurrence: null,

    init: function init() {
      this.inherited(init, arguments);

      this.recurrence = {
        RecurIterations: '0',
        RecurPeriod: '-1',
        RecurPeriodSpec: '0'
      };

      this.connect(this.fields.Lead, 'onChange', this.onLeadChange);
      this.connect(this.fields.IsLead, 'onChange', this.onIsLeadChange);
      this.connect(this.fields.Leader, 'onChange', this.onLeaderChange);
      this.connect(this.fields.Timeless, 'onChange', this.onTimelessChange);
      this.connect(this.fields.Alarm, 'onChange', this.onAlarmChange);

      this.connect(this.fields.Account, 'onChange', this.onAccountChange);
      this.connect(this.fields.Contact, 'onChange', this.onContactChange);
      this.connect(this.fields.Opportunity, 'onChange', this.onOpportunityChange);
      this.connect(this.fields.Ticket, 'onChange', this.onTicketChange);
      this.connect(this.fields.StartDate, 'onChange', this.onStartDateChange);
      this.connect(this.fields.RecurrenceUI, 'onChange', this.onRecurrenceUIChange);
      this.connect(this.fields.Recurrence, 'onChange', this.onRecurrenceChange);
    },
    onAddComplete: function onAddComplete() {
      _Environment2.default.refreshActivityLists();
      this.inherited(onAddComplete, arguments);
    },
    onPutComplete: function onPutComplete(entry, updatedEntry) {
      var view = App.getView(this.detailView);
      var originalKey = this.options.entry && this.options.entry.$key || updatedEntry.$key;

      this.enable();

      _Environment2.default.refreshActivityLists();
      _connect2.default.publish('/app/refresh', [{
        resourceKind: this.resourceKind,
        key: updatedEntry.$key,
        data: updatedEntry
      }]);

      if (updatedEntry.$key !== originalKey && view) {
        // Editing single occurrence results in new $key/record
        view.show({
          key: updatedEntry.$key
        }, {
          returnTo: -2
        });
      } else {
        this.onUpdateCompleted(updatedEntry);
      }
    },
    convertEntry: function convertEntry() {
      var entry = this.inherited(convertEntry, arguments);
      if (!this.options.entry) {
        if (entry && entry.Leader.$key) {
          this.requestLeader(entry.Leader.$key);
        }
      }

      return entry;
    },
    requestLeader: function requestLeader(userId) {
      var request = new Sage.SData.Client.SDataSingleResourceRequest(this.getConnection()).setResourceKind('users').setResourceSelector('\'' + userId + '\'').setQueryArg('select', ['UserInfo/FirstName', 'UserInfo/LastName'].join(','));

      request.read({
        success: this.processLeader,
        failure: this.requestLeaderFailure,
        scope: this
      });
    },
    requestLeaderFailure: function requestLeaderFailure() {},
    processLeader: function processLeader(leader) {
      if (leader) {
        this.entry.Leader = leader;
        this.fields.Leader.setValue(leader);
      }
    },
    currentUserCanEdit: function currentUserCanEdit(entry) {
      return entry && entry.AllowEdit;
    },
    currentUserCanSetAlarm: function currentUserCanSetAlarm(entry) {
      return !!entry && entry.Leader.$key === App.context.user.$key;
    },
    isActivityForLead: function isActivityForLead(entry) {
      return entry && /^[\w]{12}$/.test(entry.LeadId);
    },
    isActivityRecurring: function isActivityRecurring() {
      return (/rstMaster/.test(this.fields.RecurrenceState.getValue())
      );
    },
    isInLeadContext: function isInLeadContext() {
      var insert = this.options && this.options.insert;
      var entry = this.options && this.options.entry;
      var context = this._getNavContext();
      var isLeadContext = false;

      if (context.resourceKind === 'leads') {
        isLeadContext = true;
      }

      var lead = insert && isLeadContext || this.isActivityForLead(entry);

      return !!lead;
    },
    beforeTransitionTo: function beforeTransitionTo() {
      this.inherited(beforeTransitionTo, arguments);

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
      var _this = this;

      this.fieldsForStandard.concat(this.fieldsForLeads).forEach(function (item) {
        if (_this.fields[item]) {
          _this.fields[item].hide();
        }
      }, this);

      this.fieldsForLeads.forEach(function (item) {
        if (_this.fields[item]) {
          _this.fields[item].show();
        }
      }, this);
    },
    showFieldsForStandard: function showFieldsForStandard() {
      var _this2 = this;

      this.fieldsForStandard.concat(this.fieldsForLeads).forEach(function (item) {
        if (_this2.fields[item]) {
          _this2.fields[item].hide();
        }
      }, this);

      this.fieldsForStandard.forEach(function (item) {
        if (_this2.fields[item]) {
          _this2.fields[item].show();
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
      this.toggleSelectField(this.fields.Duration, value);
      var startDateField = this.fields.StartDate;

      if (value) {
        // StartDate timeless
        this.fields.Rollover.enable();
        startDateField.dateFormatText = this.startingTimelessFormatText;
        startDateField.showTimePicker = false;
        startDateField.timeless = true;
        var startDate = this._getNewStartDate(startDateField.getValue(), true);

        if (startDate) {
          startDateField.setValue(startDate);
        }
      } else {
        // StartDate with out time (Timeless)
        this.fields.Rollover.setValue(false);
        this.fields.Rollover.disable();
        startDateField.dateFormatText = App.is24HourClock() ? this.startingFormatText24 : this.startingFormatText;
        startDateField.showTimePicker = true;
        startDateField.timeless = false;
        var _startDate = this._getNewStartDate(startDateField.getValue(), false);

        if (_startDate) {
          startDateField.setValue(_startDate);
        }
      }
    },
    onAlarmChange: function onAlarmChange() {
      if (this.fields.Alarm.getValue()) {
        this.fields.Reminder.enable();
      } else {
        this.fields.Reminder.disable();
      }
    },
    onLeadChange: function onLeadChange(value, field) {
      var selection = field.getSelection();

      if (selection && this.insert) {
        this.fields.AccountName.setValue(_Utility2.default.getValue(selection, 'Company'));
      }

      var entry = field.currentSelection;
      if (entry.WorkPhone) {
        var phoneField = this.fields.PhoneNumber;
        phoneField.setValue(entry.WorkPhone);
      }
    },
    onLeaderChange: function onLeaderChange(value, field) {
      var user = field.getValue();
      var resourceId = '';

      var key = user.$key;

      // The key is a composite key on activityresourceviews endpoint.
      // The format is 'ResourceId-AccessId'.
      // The feed does include these as seperate fields, but we need to keep the $key/$descriptor format for doing
      // the PUT to the activities endpoint. We will convert the composite key to something the activities endpoint will understand.
      if (key) {
        key = key.split('-');
        resourceId = key[0];
        if (resourceId) {
          this.fields.UserId.setValue(resourceId);

          // Set back to a single $key so the PUT request payload is not messed up
          this.fields.Leader.setValue({
            $key: resourceId,
            $descriptor: user.$descriptor
          });
        }
      }
    },
    onAccountChange: function onAccountChange(value, field) {
      var fields = this.fields;
      ['Contact', 'Opportunity', 'Ticket'].forEach(function (f) {
        if (value) {
          fields[f].dependsOn = 'Account';
          fields[f].where = 'Account.Id eq "' + (value.AccountId || value.key) + '"';

          if (fields[f].currentSelection && fields[f].currentSelection.Account && fields[f].currentSelection.Account.$key !== (value.AccountId || value.key)) {
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

      if (value === null || typeof value === 'undefined') {
        return;
      }

      var entry = field.currentSelection;
      if (entry && entry.MainPhone) {
        var phoneField = this.fields.PhoneNumber;
        phoneField.setValue(entry.MainPhone);
      }
    },
    onContactChange: function onContactChange(value, field) {
      this.onAccountDependentChange(value, field);
      var entry = field.currentSelection;

      if (entry && entry.WorkPhone) {
        var phoneField = this.fields.PhoneNumber;
        phoneField.setValue(entry.WorkPhone);
      }
    },
    onOpportunityChange: function onOpportunityChange(value, field) {
      this.onAccountDependentChange(value, field);
      var entry = field.currentSelection;

      if (entry && entry.Account && entry.Account.MainPhone) {
        var phoneField = this.fieldsPhoneNumber;
        phoneField.setValue(entry.Account.MainPhone);
      }
    },
    onTicketChange: function onTicketChange(value, field) {
      this.onAccountDependentChange(value, field);
      var entry = field.currentSelection;
      var phone = entry && entry.Contact && entry.Contact.WorkPhone || entry && entry.Account && entry.Account.MainPhone;
      if (phone) {
        var phoneField = this.fields.PhoneNumber;
        phoneField.setValue(phone);
      }
    },
    onAccountDependentChange: function onAccountDependentChange(value, field) {
      if (value && !field.dependsOn && field.currentSelection && field.currentSelection.Account) {
        var accountField = this.fields.Account;
        accountField.setValue({
          AccountId: field.currentSelection.Account.$key,
          AccountName: field.currentSelection.Account.AccountName
        });
        this.onAccountChange(accountField.getValue(), accountField);
      }
    },
    onStartDateChange: function onStartDateChange(value) {
      this.recurrence.StartDate = value;
      // Need recalculate RecurPeriodSpec in case weekday on StartDate changes
      this.recurrence.RecurPeriodSpec = _Recurrence2.default.getRecurPeriodSpec(this.recurrence.RecurPeriod, this.recurrence.StartDate, this.recurrence.RecurPeriodSpec - this.recurrence.RecurPeriodSpec % 65536, // weekdays
      this.recurrence.RecurPeriodSpec % 65536 // interval
      );
      this.resetRecurrence(this.recurrence);

      _Recurrence2.default.createSimplifiedOptions(value);

      var repeats = this.recurrence.RecurrenceState === 'rstMaster';
      this.fields.RecurrenceUI.setValue(_Recurrence2.default.getPanel(repeats && this.recurrence.RecurPeriod));
    },
    onRecurrenceUIChange: function onRecurrenceUIChange(value, field) {
      var key = field.currentValue && field.currentValue.key;
      var opt = _Recurrence2.default.simplifiedOptions[key];
      // preserve #iterations (and EndDate) if matching recurrence
      if (this._previousRecurrence === key) {
        opt.RecurIterations = this.recurrence.RecurIterations;
      }

      this.resetRecurrence(opt);
      this._previousRecurrence = key;
    },
    onRecurrenceChange: function onRecurrenceChange(value) {
      // did the StartDate change on the recurrence_edit screen?
      var startDate = argos.Convert.toDateFromString(value.StartDate); // TODO: Avoid global
      var currentDate = this.fields.StartDate.getValue();

      if (startDate.getDate() !== currentDate.getDate() || startDate.getMonth() !== currentDate.getMonth()) {
        this.fields.StartDate.setValue(startDate);
      }

      this.resetRecurrence(value);
    },
    resetRecurrence: function resetRecurrence(o) {
      this.recurrence.StartDate = this.fields.StartDate.getValue();

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

      this.recurrence.EndDate = _Recurrence2.default.calcEndDate(this.recurrence.StartDate, this.recurrence);

      this.fields.RecurrenceUI.setValue(_Recurrence2.default.getPanel(this.recurrence.RecurPeriod));
      this.fields.Recurrence.setValue(this.recurrence);

      this.fields.Recurring.setValue(this.recurrence.Recurring);
      this.fields.RecurPeriod.setValue(this.recurrence.RecurPeriod);
      this.fields.RecurPeriodSpec.setValue(this.recurrence.Recurring ? this.recurrence.RecurPeriodSpec : 0);
      this.fields.RecurrenceState.setValue(this.recurrence.RecurrenceState);
      this.fields.RecurIterations.setValue(this.recurrence.RecurIterations);
      this.fields.EndDate.setValue(this.recurrence.EndDate);

      if (o.Recurring) {
        this.fields.Recurrence.enable();
      } else {
        this.fields.Recurrence.disable();
      }
    },

    formatPicklistForType: function formatPicklistForType(type, which) {
      return (0, _ActivityTypePicklists.getPicklistByActivityType)(type, which);
    },
    formatRecurrence: function formatRecurrence(recurrence) {
      if (typeof recurrence === 'string') {
        return recurrence;
      }

      return _Recurrence2.default.toString(recurrence, true);
    },
    _getCalculatedStartTime: function _getCalculatedStartTime(selectedDate) {
      var now = moment();
      var thisSelectedDate = selectedDate;

      if (!moment.isMoment(selectedDate)) {
        thisSelectedDate = moment(selectedDate);
      }

      // Take the start of the selected date, add the *current* time to it,
      // and round it up to the nearest ROUND_MINUTES
      // Examples:
      // 11:24 -> 11:30
      // 11:12 -> 11:15
      // 11:31 -> 11:45
      var startDate = thisSelectedDate.clone().startOf('day').hours(now.hours()).add({
        minutes: Math.floor(now.minutes() / this.ROUND_MINUTES) * this.ROUND_MINUTES + this.ROUND_MINUTES
      });

      return startDate;
    },
    applyUserActivityContext: function applyUserActivityContext(optionsDate) {
      return this._getCalculatedStartTime(optionsDate);
    },
    applyContext: function applyContext() {
      this.inherited(applyContext, arguments);

      var startDate = this._getCalculatedStartTime(moment());
      var activityType = this.options && this.options.activityType;
      var activityGroup = this.groupOptionsByType[activityType] || '';
      var activityDuration = App.context.userOptions && App.context.userOptions[activityGroup + ':Duration'] || 15;
      var alarmEnabled = App.context.userOptions && App.context.userOptions[activityGroup + ':AlarmEnabled'] || true;
      var alarmDuration = App.context.userOptions && App.context.userOptions[activityGroup + ':AlarmLead'] || 15;

      if (this.options && this.options.currentDate) {
        startDate = this.applyUserActivityContext(moment(this.options.currentDate));
      }

      this.fields.StartDate.setValue(startDate.toDate());
      this.fields.Type.setValue(activityType);
      this.fields.Duration.setValue(activityDuration);
      this.fields.Alarm.setValue(alarmEnabled);
      this.fields.Reminder.setValue(alarmDuration);

      var user = App.context.user;
      if (user) {
        this.fields.UserId.setValue(user.$key);

        var leaderField = this.fields.Leader;
        leaderField.setValue(user);
        this.onLeaderChange(user, leaderField);
      }

      var found = this._getNavContext();

      var accountField = this.fields.Account;
      this.onAccountChange(accountField.getValue(), accountField);

      var context = found && found.options && found.options.source || found;
      var lookup = {
        accounts: this.applyAccountContext,
        contacts: this.applyContactContext,
        opportunities: this.applyOpportunityContext,
        tickets: this.applyTicketContext,
        leads: this.applyLeadContext
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
      var view = App.getView(context.id);
      var entry = context.entry || view && view.entry || context;

      if (!entry || !entry.$key) {
        return;
      }

      var accountField = this.fields.Account;
      accountField.setSelection(entry);
      accountField.setValue({
        AccountId: entry.$key,
        AccountName: entry.$descriptor
      });
      this.onAccountChange(accountField.getValue(), accountField);
    },
    applyContactContext: function applyContactContext(context) {
      var view = App.getView(context.id);
      var entry = context.entry || view && view.entry || context;

      if (!entry || !entry.$key) {
        return;
      }

      var contactField = this.fields.Contact;

      contactField.setSelection(entry);
      contactField.setValue({
        ContactId: entry.$key,
        ContactName: entry.$descriptor
      });

      this.onAccountDependentChange(contactField.getValue(), contactField);

      var accountField = this.fields.Account;
      accountField.setValue({
        AccountId: _Utility2.default.getValue(entry, 'Account.$key'),
        AccountName: _Utility2.default.getValue(entry, 'Account.AccountName')
      });

      if (entry.WorkPhone) {
        var phoneField = this.fields.PhoneNumber;
        phoneField.setValue(entry.WorkPhone);
      }
    },
    applyTicketContext: function applyTicketContext(context) {
      var view = App.getView(context.id);
      var entry = context.entry || view && view.entry;

      if (!entry || !entry.$key) {
        return;
      }

      var ticketField = this.fields.Ticket;
      ticketField.setSelection(entry);
      ticketField.setValue({
        TicketId: entry.$key,
        TicketNumber: entry.$descriptor
      });
      this.onAccountDependentChange(ticketField.getValue(), ticketField);

      var contactField = this.fields.Contact;
      contactField.setValue({
        ContactId: _Utility2.default.getValue(entry, 'Contact.$key'),
        ContactName: _Utility2.default.getValue(entry, 'Contact.NameLF')
      });
      this.onAccountDependentChange(contactField.getValue(), contactField);

      var accountField = this.fields.Account;
      accountField.setValue({
        AccountId: _Utility2.default.getValue(entry, 'Account.$key'),
        AccountName: _Utility2.default.getValue(entry, 'Account.AccountName')
      });

      var phone = entry && entry.Contact && entry.Contact.WorkPhone || entry && entry.Account && entry.Account.MainPhone;
      if (phone) {
        var phoneField = this.fields.PhoneNumber;
        phoneField.setValue(phone);
      }
    },
    applyOpportunityContext: function applyOpportunityContext(context) {
      var view = App.getView(context.id);
      var entry = context.entry || view && view.entry;

      if (!entry || !entry.$key) {
        return;
      }

      var opportunityField = this.fields.Opportunity;
      opportunityField.setSelection(entry);
      opportunityField.setValue({
        OpportunityId: entry.$key,
        OpportunityName: entry.$descriptor
      });

      this.onAccountDependentChange(opportunityField.getValue(), opportunityField);

      var accountField = this.fields.Account;
      accountField.setValue({
        AccountId: _Utility2.default.getValue(entry, 'Account.$key'),
        AccountName: _Utility2.default.getValue(entry, 'Account.AccountName')
      });

      if (entry.Account && entry.Account.MainPhone) {
        var phoneField = this.fields.PhoneNumber;
        phoneField.setValue(entry.Account.MainPhone);
      }
    },
    applyLeadContext: function applyLeadContext(context) {
      var view = App.getView(context.id);
      var entry = context.entry || view && view.entry;

      if (!entry || !entry.$key) {
        return;
      }

      var leadField = this.fields.Lead;
      leadField.setSelection(entry);
      leadField.setValue({
        LeadId: entry.$key,
        LeadName: entry.$descriptor
      });
      this.onLeadChange(leadField.getValue(), leadField);

      this.fields.AccountName.setValue(entry.Company);

      var isLeadField = this.fields.IsLead;
      isLeadField.setValue(context.resourceKind === 'leads');
      this.onIsLeadChange(isLeadField.getValue(), isLeadField);

      if (entry.WorkPhone) {
        var phoneField = this.fields.PhoneNumber;
        phoneField.setValue(entry.WorkPhone);
      }
    },
    setValues: function setValues(values) {
      if (values.StartDate && values.AlarmTime) {
        var startTime = this.isDateTimeless(values.StartDate) ? moment(values.StartDate).add({
          minutes: values.StartDate.getTimezoneOffset()
        }).toDate().getTime() : values.StartDate.getTime();

        var span = startTime - values.AlarmTime.getTime(); // ms
        var reminder = span / (1000 * 60);

        values.Reminder = _Format2.default.fixed(reminder, 0);
      }

      this.inherited(setValues, arguments);

      this.enableFields();

      if (values.Timeless) {
        this.fields.Duration.disable();
        this.fields.Rollover.enable();
      } else {
        this.fields.Duration.enable();
        this.fields.Rollover.disable();
      }

      if (values.Alarm) {
        this.fields.Reminder.enable();
      } else {
        this.fields.Reminder.disable();
      }

      if (this.isInLeadContext()) {
        var isLeadField = this.fields.IsLead;
        isLeadField.setValue(true);
        this.onIsLeadChange(isLeadField.getValue(), isLeadField);
        this.fields.Lead.setValue(values, true);
        this.fields.AccountName.setValue(values.AccountName);
      }

      var entry = this.options.entry || this.entry;
      var denyEdit = !this.options.insert && !this.currentUserCanEdit(entry);
      var allowSetAlarm = !denyEdit || this.currentUserCanSetAlarm(entry);

      if (denyEdit) {
        this.disableFields();
      }

      if (allowSetAlarm) {
        this.enableFields(function (f) {
          if (values.Alarm) {
            return (/^Alarm|Reminder$/.test(f.name)
            );
          }
          return (/^Alarm$/.test(f.name)
          );
        });
      }

      if (this.options && this.options.activityType === 'atPersonal') {
        this.fields.Category.disable();
      } else {
        this.fields.Category.enable();
      }

      this.recurrence.StartDate = argos.Convert.toDateFromString(values.StartDate); // TODO: Avoid global
      this.resetRecurrence(values);
      this.onStartDateChange(this.fields.StartDate.getValue(), this.fields.StartDate);
      if (this.isActivityRecurring) {
        this.fields.EndDate.hide();
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
      var isStartDateDirty = this.fields.StartDate.isDirty();
      var isReminderDirty = this.fields.Reminder.isDirty();
      var reminderIn = this.fields.Reminder.getValue();
      var timeless = this.fields.Timeless.getValue();
      var startDate = this.fields.StartDate.getValue();
      var values = this.inherited(getValues, arguments);

      // Fix timeless if necessary (The date picker won't add 5 seconds)
      if (timeless) {
        values.StartDate = startDate = this._getNewStartDate(startDate, true);
      }

      // if StartDate is dirty, always update AlarmTime
      if (startDate && (isStartDateDirty || isReminderDirty)) {
        values = values || {};
        var alarmTime = this._getNewAlarmTime(startDate, timeless, reminderIn);
        values.AlarmTime = alarmTime;
      }

      if (this.fields.IsLead.getValue() === false) {
        values.LeadId = null;
        values.LeadName = null;
      }

      return values;
    },
    createReminderData: function createReminderData() {
      var list = [];

      for (var duration in this.reminderValueText) {
        if (this.reminderValueText.hasOwnProperty(duration)) {
          list.push({
            $key: duration,
            $descriptor: this.reminderValueText[duration]
          });
        }
      }

      return {
        $resources: list
      };
    },
    createDurationData: function createDurationData() {
      var list = [];

      for (var duration in this.durationValueText) {
        if (this.durationValueText.hasOwnProperty(duration)) {
          list.push({
            $key: duration,
            $descriptor: this.durationValueText[duration]
          });
        }
      }

      return {
        $resources: list
      };
    },
    createRecurringData: function createRecurringData() {
      return _Recurrence2.default.createSimplifiedOptions(this.fields.StartDate.getValue());
    },
    formatDependentQuery: function formatDependentQuery(dependentValue, theFormat, property) {
      return _string2.default.substitute(theFormat, [_Utility2.default.getValue(dependentValue, property || '$key')]);
    },
    _getNewStartDate: function _getNewStartDate(orginalStartDate, timeless) {
      if (!orginalStartDate) {
        return null;
      }

      var startDate = orginalStartDate;
      var isTimeLessDate = this.isDateTimeless(startDate) || this.isDateTimelessLocal(startDate);

      if (timeless) {
        if (!isTimeLessDate) {
          var wrapped = moment(startDate);
          wrapped = moment.utc(wrapped.format('YYYY-MM-DD'), 'YYYY-MM-DD');
          wrapped.add('seconds', 5);
          startDate = wrapped.toDate();
        }
      } else {
        if (isTimeLessDate) {
          var currentTime = moment();
          var _wrapped = moment(startDate);
          _wrapped.subtract({
            minutes: _wrapped.utcOffset()
          });
          _wrapped.hours(currentTime.hours());
          _wrapped.minutes(currentTime.minutes());
          _wrapped.seconds(0);
          startDate = _wrapped.toDate();
        }
      }

      return startDate;
    },
    _getNewAlarmTime: function _getNewAlarmTime(startDate, timeless, reminderIn) {
      var alarmTime = void 0;
      if (!startDate) {
        return null;
      }

      if (timeless) {
        var wrapped = moment(startDate);
        wrapped.subtract({
          minutes: wrapped.utcOffset()
        });
        wrapped.hours(24);
        wrapped.minutes(0);
        wrapped.seconds(0);
        alarmTime = wrapped.toDate();
        alarmTime = moment(alarmTime).clone().add({
          days: -1
        }).add({
          minutes: -1 * reminderIn
        }).toDate();
      } else {
        alarmTime = moment(startDate).clone().add({
          minutes: -1 * reminderIn
        }).toDate();
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
        validator: _Validator2.default.exceedsMaxTextLength,
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
        type: 'text',
        maxTextLength: 255,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        label: this.priorityText,
        name: 'Priority',
        property: 'Priority',
        picklist: 'Priorities',
        title: this.priorityTitleText,
        type: 'picklist',
        maxTextLength: 64,
        validator: _Validator2.default.exceedsMaxTextLength
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
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        label: this.startingText,
        name: 'StartDate',
        property: 'StartDate',
        type: 'date',
        timeless: false,
        showTimePicker: true,
        showRelativeDateTime: true,
        dateFormatText: App.is24HourClock() ? this.startingFormatText24 : this.startingFormatText,
        minValue: new Date(1900, 0, 1),
        validator: [_Validator2.default.exists, _Validator2.default.isDateInRange]
      }, {
        type: 'date',
        name: 'EndDate',
        property: 'EndDate',
        showRelativeDateTime: true,
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
        where: this.formatDependentQuery.bindDelegate(this, 'Account.Id eq "${0}"', 'AccountId'),
        requireSelection: false
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
        validator: _Validator2.default.exceedsMaxTextLength
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});