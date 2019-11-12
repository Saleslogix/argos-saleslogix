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

  /**
   * @class crm.Views.Activity.Edit
   * @extends argos.Edit
   *
   */
  var __class = (0, _declare2.default)('crm.Views.Activity.Edit', [_Edit2.default], /** @lends crm.Views.Activity.Edit# */{
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
      15: resource.quarterHourText,
      30: resource.halfHourText,
      60: resource.hourText,
      90: resource.hourAndHalfText,
      120: resource.twoHoursText
    },

    /**
     * @property {Number}
     * The number of minutes that should be rounded to as a default start when creating a new activity
     */
    ROUND_MINUTES: 15,

    // View Properties
    id: 'activity_edit',
    detailView: 'activity_detail',
    fieldsForLeads: ['AccountName', 'Lead'],
    fieldsForStandard: ['Account', 'Contact', 'Opportunity', 'Ticket'],
    /**
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
      this.inherited(arguments);

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
      this.inherited(arguments);
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
      var entry = this.inherited(arguments);
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

          if (fields[f].currentSelection && fields[f].currentSelection.Account.$key !== (value.AccountId || value.key)) {
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
      this.inherited(arguments);

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

      this.inherited(arguments);

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
      var values = this.inherited(arguments);

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
        validator: _Validator2.default.exceedsMaxTextLength
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BY3Rpdml0eS9FZGl0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiZHRGb3JtYXRSZXNvdXJjZSIsIl9fY2xhc3MiLCJhY3Rpdml0eUNhdGVnb3J5VGl0bGVUZXh0IiwiYWN0aXZpdHlEZXNjcmlwdGlvblRpdGxlVGV4dCIsImxvY2F0aW9uVGV4dCIsImFjdGl2aXR5VHlwZVRpdGxlVGV4dCIsImFsYXJtVGV4dCIsInJlbWluZGVyVGV4dCIsImNhdGVnb3J5VGV4dCIsImR1cmF0aW9uVGV4dCIsImR1cmF0aW9uVGl0bGVUZXh0IiwiZHVyYXRpb25JbnZhbGlkVGV4dCIsInJlbWluZGVySW52YWxpZFRleHQiLCJyZW1pbmRlclRpdGxlVGV4dCIsImxlYWRlclRleHQiLCJsb25nTm90ZXNUZXh0IiwibG9uZ05vdGVzVGl0bGVUZXh0IiwicHJpb3JpdHlUZXh0IiwicHJpb3JpdHlUaXRsZVRleHQiLCJyZWdhcmRpbmdUZXh0Iiwicm9sbG92ZXJUZXh0Iiwic3RhcnRpbmdUZXh0Iiwic3RhcnRpbmdGb3JtYXRUZXh0Iiwic3RhcnRpbmdGb3JtYXRUZXh0MjQiLCJzdGFydGluZ1RpbWVsZXNzRm9ybWF0VGV4dCIsInJlcGVhdHNUZXh0IiwicmVjdXJyaW5nVGV4dCIsInJlY3VycmluZ1RpdGxlVGV4dCIsInRpbWVsZXNzVGV4dCIsInRpdGxlVGV4dCIsInR5cGVUZXh0IiwiYWNjb3VudFRleHQiLCJjb250YWN0VGV4dCIsIm9wcG9ydHVuaXR5VGV4dCIsInRpY2tldE51bWJlclRleHQiLCJjb21wYW55VGV4dCIsImxlYWRUZXh0IiwiaXNMZWFkVGV4dCIsInllc1RleHQiLCJub1RleHQiLCJwaG9uZVRleHQiLCJ1cGRhdGVVc2VyQWN0RXJyb3JUZXh0IiwicmVtaW5kZXJWYWx1ZVRleHQiLCJub25lVGV4dCIsImZpdmVNaW5UZXh0IiwicXVhcnRlckhvdXJUZXh0IiwiaGFsZkhvdXJUZXh0IiwiaG91clRleHQiLCJkYXlUZXh0IiwiZHVyYXRpb25WYWx1ZVRleHQiLCJob3VyQW5kSGFsZlRleHQiLCJ0d29Ib3Vyc1RleHQiLCJST1VORF9NSU5VVEVTIiwiaWQiLCJkZXRhaWxWaWV3IiwiZmllbGRzRm9yTGVhZHMiLCJmaWVsZHNGb3JTdGFuZGFyZCIsInBpY2tsaXN0c0J5VHlwZSIsImF0QXBwb2ludG1lbnQiLCJDYXRlZ29yeSIsIkRlc2NyaXB0aW9uIiwiYXRMaXRlcmF0dXJlIiwiYXRQZXJzb25hbCIsImF0UGhvbmVDYWxsIiwiYXRUb0RvIiwiYXRFTWFpbCIsImdyb3VwT3B0aW9uc0J5VHlwZSIsImVudGl0eU5hbWUiLCJtb2RlbE5hbWUiLCJBQ1RJVklUWSIsImluc2VydFNlY3VyaXR5IiwidXBkYXRlU2VjdXJpdHkiLCJjb250cmFjdE5hbWUiLCJyZXNvdXJjZUtpbmQiLCJyZWN1cnJlbmNlIiwiX3ByZXZpb3VzUmVjdXJyZW5jZSIsImluaXQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJSZWN1ckl0ZXJhdGlvbnMiLCJSZWN1clBlcmlvZCIsIlJlY3VyUGVyaW9kU3BlYyIsImNvbm5lY3QiLCJmaWVsZHMiLCJMZWFkIiwib25MZWFkQ2hhbmdlIiwiSXNMZWFkIiwib25Jc0xlYWRDaGFuZ2UiLCJMZWFkZXIiLCJvbkxlYWRlckNoYW5nZSIsIlRpbWVsZXNzIiwib25UaW1lbGVzc0NoYW5nZSIsIkFsYXJtIiwib25BbGFybUNoYW5nZSIsIkFjY291bnQiLCJvbkFjY291bnRDaGFuZ2UiLCJDb250YWN0Iiwib25Db250YWN0Q2hhbmdlIiwiT3Bwb3J0dW5pdHkiLCJvbk9wcG9ydHVuaXR5Q2hhbmdlIiwiVGlja2V0Iiwib25UaWNrZXRDaGFuZ2UiLCJTdGFydERhdGUiLCJvblN0YXJ0RGF0ZUNoYW5nZSIsIlJlY3VycmVuY2VVSSIsIm9uUmVjdXJyZW5jZVVJQ2hhbmdlIiwiUmVjdXJyZW5jZSIsIm9uUmVjdXJyZW5jZUNoYW5nZSIsIm9uQWRkQ29tcGxldGUiLCJyZWZyZXNoQWN0aXZpdHlMaXN0cyIsIm9uUHV0Q29tcGxldGUiLCJlbnRyeSIsInVwZGF0ZWRFbnRyeSIsInZpZXciLCJBcHAiLCJnZXRWaWV3Iiwib3JpZ2luYWxLZXkiLCJvcHRpb25zIiwiJGtleSIsImVuYWJsZSIsInB1Ymxpc2giLCJrZXkiLCJkYXRhIiwic2hvdyIsInJldHVyblRvIiwib25VcGRhdGVDb21wbGV0ZWQiLCJjb252ZXJ0RW50cnkiLCJyZXF1ZXN0TGVhZGVyIiwidXNlcklkIiwicmVxdWVzdCIsIlNhZ2UiLCJTRGF0YSIsIkNsaWVudCIsIlNEYXRhU2luZ2xlUmVzb3VyY2VSZXF1ZXN0IiwiZ2V0Q29ubmVjdGlvbiIsInNldFJlc291cmNlS2luZCIsInNldFJlc291cmNlU2VsZWN0b3IiLCJzZXRRdWVyeUFyZyIsImpvaW4iLCJyZWFkIiwic3VjY2VzcyIsInByb2Nlc3NMZWFkZXIiLCJmYWlsdXJlIiwicmVxdWVzdExlYWRlckZhaWx1cmUiLCJzY29wZSIsImxlYWRlciIsInNldFZhbHVlIiwiY3VycmVudFVzZXJDYW5FZGl0IiwiQWxsb3dFZGl0IiwiY3VycmVudFVzZXJDYW5TZXRBbGFybSIsImNvbnRleHQiLCJ1c2VyIiwiaXNBY3Rpdml0eUZvckxlYWQiLCJ0ZXN0IiwiTGVhZElkIiwiaXNBY3Rpdml0eVJlY3VycmluZyIsIlJlY3VycmVuY2VTdGF0ZSIsImdldFZhbHVlIiwiaXNJbkxlYWRDb250ZXh0IiwiaW5zZXJ0IiwiX2dldE5hdkNvbnRleHQiLCJpc0xlYWRDb250ZXh0IiwibGVhZCIsImJlZm9yZVRyYW5zaXRpb25UbyIsImlzRm9yTGVhZCIsInVuZGVmaW5lZCIsInNob3dGaWVsZHNGb3JMZWFkIiwic2hvd0ZpZWxkc0ZvclN0YW5kYXJkIiwiZGlzYWJsZUZpZWxkcyIsInByZWRpY2F0ZSIsIm5hbWUiLCJkaXNhYmxlIiwiZW5hYmxlRmllbGRzIiwidmFsdWUiLCJjb25jYXQiLCJmb3JFYWNoIiwiaXRlbSIsImhpZGUiLCJ0b2dnbGVTZWxlY3RGaWVsZCIsImZpZWxkIiwiRHVyYXRpb24iLCJzdGFydERhdGVGaWVsZCIsIlJvbGxvdmVyIiwiZGF0ZUZvcm1hdFRleHQiLCJzaG93VGltZVBpY2tlciIsInRpbWVsZXNzIiwic3RhcnREYXRlIiwiX2dldE5ld1N0YXJ0RGF0ZSIsImlzMjRIb3VyQ2xvY2siLCJSZW1pbmRlciIsInNlbGVjdGlvbiIsImdldFNlbGVjdGlvbiIsIkFjY291bnROYW1lIiwiY3VycmVudFNlbGVjdGlvbiIsIldvcmtQaG9uZSIsInBob25lRmllbGQiLCJQaG9uZU51bWJlciIsInJlc291cmNlSWQiLCJzcGxpdCIsIlVzZXJJZCIsIiRkZXNjcmlwdG9yIiwiZiIsImRlcGVuZHNPbiIsIndoZXJlIiwiQWNjb3VudElkIiwiTWFpblBob25lIiwib25BY2NvdW50RGVwZW5kZW50Q2hhbmdlIiwiZmllbGRzUGhvbmVOdW1iZXIiLCJwaG9uZSIsImFjY291bnRGaWVsZCIsImdldFJlY3VyUGVyaW9kU3BlYyIsInJlc2V0UmVjdXJyZW5jZSIsImNyZWF0ZVNpbXBsaWZpZWRPcHRpb25zIiwicmVwZWF0cyIsImdldFBhbmVsIiwiY3VycmVudFZhbHVlIiwib3B0Iiwic2ltcGxpZmllZE9wdGlvbnMiLCJhcmdvcyIsIkNvbnZlcnQiLCJ0b0RhdGVGcm9tU3RyaW5nIiwiY3VycmVudERhdGUiLCJnZXREYXRlIiwiZ2V0TW9udGgiLCJvIiwiUmVjdXJyaW5nIiwiRW5kRGF0ZSIsImNhbGNFbmREYXRlIiwiZm9ybWF0UGlja2xpc3RGb3JUeXBlIiwidHlwZSIsIndoaWNoIiwiZm9ybWF0UmVjdXJyZW5jZSIsInRvU3RyaW5nIiwiX2dldENhbGN1bGF0ZWRTdGFydFRpbWUiLCJzZWxlY3RlZERhdGUiLCJub3ciLCJtb21lbnQiLCJ0aGlzU2VsZWN0ZWREYXRlIiwiaXNNb21lbnQiLCJjbG9uZSIsInN0YXJ0T2YiLCJob3VycyIsImFkZCIsIm1pbnV0ZXMiLCJNYXRoIiwiZmxvb3IiLCJhcHBseVVzZXJBY3Rpdml0eUNvbnRleHQiLCJvcHRpb25zRGF0ZSIsImFwcGx5Q29udGV4dCIsImFjdGl2aXR5VHlwZSIsImFjdGl2aXR5R3JvdXAiLCJhY3Rpdml0eUR1cmF0aW9uIiwidXNlck9wdGlvbnMiLCJhbGFybUVuYWJsZWQiLCJhbGFybUR1cmF0aW9uIiwidG9EYXRlIiwiVHlwZSIsImxlYWRlckZpZWxkIiwiZm91bmQiLCJzb3VyY2UiLCJsb29rdXAiLCJhY2NvdW50cyIsImFwcGx5QWNjb3VudENvbnRleHQiLCJjb250YWN0cyIsImFwcGx5Q29udGFjdENvbnRleHQiLCJvcHBvcnR1bml0aWVzIiwiYXBwbHlPcHBvcnR1bml0eUNvbnRleHQiLCJ0aWNrZXRzIiwiYXBwbHlUaWNrZXRDb250ZXh0IiwibGVhZHMiLCJhcHBseUxlYWRDb250ZXh0IiwiY2FsbCIsIm5hdkNvbnRleHQiLCJxdWVyeU5hdmlnYXRpb25Db250ZXh0Iiwic2V0U2VsZWN0aW9uIiwiY29udGFjdEZpZWxkIiwiQ29udGFjdElkIiwiQ29udGFjdE5hbWUiLCJ0aWNrZXRGaWVsZCIsIlRpY2tldElkIiwiVGlja2V0TnVtYmVyIiwib3Bwb3J0dW5pdHlGaWVsZCIsIk9wcG9ydHVuaXR5SWQiLCJPcHBvcnR1bml0eU5hbWUiLCJsZWFkRmllbGQiLCJMZWFkTmFtZSIsIkNvbXBhbnkiLCJpc0xlYWRGaWVsZCIsInNldFZhbHVlcyIsInZhbHVlcyIsIkFsYXJtVGltZSIsInN0YXJ0VGltZSIsImlzRGF0ZVRpbWVsZXNzIiwiZ2V0VGltZXpvbmVPZmZzZXQiLCJnZXRUaW1lIiwic3BhbiIsInJlbWluZGVyIiwiZml4ZWQiLCJkZW55RWRpdCIsImFsbG93U2V0QWxhcm0iLCJkYXRlIiwiZ2V0VVRDSG91cnMiLCJnZXRVVENNaW51dGVzIiwiZ2V0VVRDU2Vjb25kcyIsImlzRGF0ZVRpbWVsZXNzTG9jYWwiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJnZXRTZWNvbmRzIiwiZ2V0VmFsdWVzIiwiaXNTdGFydERhdGVEaXJ0eSIsImlzRGlydHkiLCJpc1JlbWluZGVyRGlydHkiLCJyZW1pbmRlckluIiwiYWxhcm1UaW1lIiwiX2dldE5ld0FsYXJtVGltZSIsImNyZWF0ZVJlbWluZGVyRGF0YSIsImxpc3QiLCJkdXJhdGlvbiIsImhhc093blByb3BlcnR5IiwicHVzaCIsIiRyZXNvdXJjZXMiLCJjcmVhdGVEdXJhdGlvbkRhdGEiLCJjcmVhdGVSZWN1cnJpbmdEYXRhIiwiZm9ybWF0RGVwZW5kZW50UXVlcnkiLCJkZXBlbmRlbnRWYWx1ZSIsInRoZUZvcm1hdCIsInByb3BlcnR5Iiwic3Vic3RpdHV0ZSIsIm9yZ2luYWxTdGFydERhdGUiLCJpc1RpbWVMZXNzRGF0ZSIsIndyYXBwZWQiLCJ1dGMiLCJmb3JtYXQiLCJjdXJyZW50VGltZSIsInN1YnRyYWN0IiwidXRjT2Zmc2V0Iiwic2Vjb25kcyIsImRheXMiLCJjcmVhdGVMYXlvdXQiLCJsYXlvdXQiLCJsYWJlbCIsInBpY2tsaXN0IiwiYmluZERlbGVnYXRlIiwidGl0bGUiLCJvcmRlckJ5IiwibWF4VGV4dExlbmd0aCIsInZhbGlkYXRvciIsImV4Y2VlZHNNYXhUZXh0TGVuZ3RoIiwiYXV0b0ZvY3VzIiwibm90ZVByb3BlcnR5Iiwic2hvd1JlbGF0aXZlRGF0ZVRpbWUiLCJtaW5WYWx1ZSIsIkRhdGUiLCJleGlzdHMiLCJpc0RhdGVJblJhbmdlIiwiaW5jbHVkZSIsImV4Y2x1ZGUiLCJhcHBseVRvIiwiZm9ybWF0VmFsdWUiLCJyZXF1aXJlU2VsZWN0aW9uIiwib25UZXh0Iiwib2ZmVGV4dCIsImVtcHR5VGV4dCIsInZhbHVlS2V5UHJvcGVydHkiLCJ2YWx1ZVRleHRQcm9wZXJ0eSIsInBheWxvYWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUE2QkEsTUFBTUEsV0FBVyxvQkFBWSxjQUFaLENBQWpCO0FBQ0EsTUFBTUMsbUJBQW1CLG9CQUFZLDRCQUFaLENBQXpCOztBQUVBOzs7OztBQUtBLE1BQU1DLFVBQVUsdUJBQVEseUJBQVIsRUFBbUMsZ0JBQW5DLEVBQTJDLHNDQUFzQztBQUMvRjtBQUNBQywrQkFBMkJILFNBQVNH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QUNBRSxvQkFBUSxLQUFLRCxpQkFBYixJQUFrQyxJQUFsQztBQUNEO0FBQ0YsU0FaQTtBQWFERCwwQkFBa0IsVUFiakI7QUFjREMsMkJBQW1CLGNBZGxCO0FBZUQzUCxjQUFNLGdCQWZMO0FBZ0JEMEYsZUFBTyxLQUFLd0gsb0JBQUwsQ0FBMEJtQixZQUExQixDQUNMLElBREssRUFDQyxzQkFERCxFQUN5QixXQUR6QjtBQWhCTixPQXhOa0MsRUEyT2xDO0FBQ0RGLGVBQU8sS0FBS2hULFFBRFg7QUFFRHNJLGNBQU0sTUFGTDtBQUdENEosa0JBQVUsTUFIVDtBQUlEakcsY0FBTSxRQUpMO0FBS0RxSSxtQkFBVyxFQUxWO0FBTURMLGlCQUFTLEdBTlI7QUFPRE0sMEJBQWtCLFFBUGpCO0FBUURDLDJCQUFtQixVQVJsQjtBQVNEM1AsY0FBTTtBQVRMLE9BM09rQyxFQXFQbEM7QUFDRG1PLGVBQU8sS0FBS2pULFdBRFg7QUFFRHVJLGNBQU0sYUFGTDtBQUdENEosa0JBQVUsYUFIVDtBQUlEakcsY0FBTTtBQUpMLE9BclBrQyxFQTBQbEM7QUFDRDNELGNBQU0sYUFETDtBQUVENEosa0JBQVUsYUFGVDtBQUdEYyxlQUFPLEtBQUs1UyxTQUhYO0FBSUQ2TCxjQUFNLE9BSkw7QUFLRG9ILHVCQUFlLEVBTGQ7QUFNREMsbUJBQVcsb0JBQVVDO0FBTnBCLE9BMVBrQyxDQUE5QixDQUFQO0FBa1FEO0FBL3NDOEYsR0FBakYsQ0FBaEI7O29CQWt0Q2UxVixPIiwiZmlsZSI6IkVkaXQuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgY29ubmVjdCBmcm9tICdkb2pvL19iYXNlL2Nvbm5lY3QnO1xyXG5pbXBvcnQgc3RyaW5nIGZyb20gJ2Rvam8vc3RyaW5nJztcclxuaW1wb3J0IGVudmlyb25tZW50IGZyb20gJy4uLy4uL0Vudmlyb25tZW50JztcclxuaW1wb3J0IHZhbGlkYXRvciBmcm9tICcuLi8uLi9WYWxpZGF0b3InO1xyXG5pbXBvcnQgdXRpbGl0eSBmcm9tICdhcmdvcy9VdGlsaXR5JztcclxuaW1wb3J0IEVkaXQgZnJvbSAnYXJnb3MvRWRpdCc7XHJcbmltcG9ydCByZWN1ciBmcm9tICcuLi8uLi9SZWN1cnJlbmNlJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICdhcmdvcy9Gb3JtYXQnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi8uLi9Nb2RlbHMvTmFtZXMnO1xyXG5pbXBvcnQgeyBnZXRQaWNrbGlzdEJ5QWN0aXZpdHlUeXBlIH0gZnJvbSAnLi4vLi4vTW9kZWxzL0FjdGl2aXR5L0FjdGl2aXR5VHlwZVBpY2tsaXN0cyc7XHJcblxyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYWN0aXZpdHlFZGl0Jyk7XHJcbmNvbnN0IGR0Rm9ybWF0UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYWN0aXZpdHlFZGl0RGF0ZVRpbWVGb3JtYXQnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLkFjdGl2aXR5LkVkaXRcclxuICogQGV4dGVuZHMgYXJnb3MuRWRpdFxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5BY3Rpdml0eS5FZGl0JywgW0VkaXRdLCAvKiogQGxlbmRzIGNybS5WaWV3cy5BY3Rpdml0eS5FZGl0IyAqL3tcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICBhY3Rpdml0eUNhdGVnb3J5VGl0bGVUZXh0OiByZXNvdXJjZS5hY3Rpdml0eUNhdGVnb3J5VGl0bGVUZXh0LFxyXG4gIGFjdGl2aXR5RGVzY3JpcHRpb25UaXRsZVRleHQ6IHJlc291cmNlLmFjdGl2aXR5RGVzY3JpcHRpb25UaXRsZVRleHQsXHJcbiAgbG9jYXRpb25UZXh0OiByZXNvdXJjZS5sb2NhdGlvblRleHQsXHJcbiAgYWN0aXZpdHlUeXBlVGl0bGVUZXh0OiByZXNvdXJjZS5hY3Rpdml0eVR5cGVUaXRsZVRleHQsXHJcbiAgYWxhcm1UZXh0OiByZXNvdXJjZS5hbGFybVRleHQsXHJcbiAgcmVtaW5kZXJUZXh0OiByZXNvdXJjZS5yZW1pbmRlclRleHQsXHJcbiAgY2F0ZWdvcnlUZXh0OiByZXNvdXJjZS5jYXRlZ29yeVRleHQsXHJcbiAgZHVyYXRpb25UZXh0OiByZXNvdXJjZS5kdXJhdGlvblRleHQsXHJcbiAgZHVyYXRpb25UaXRsZVRleHQ6IHJlc291cmNlLmR1cmF0aW9uVGl0bGVUZXh0LFxyXG4gIGR1cmF0aW9uSW52YWxpZFRleHQ6IHJlc291cmNlLmR1cmF0aW9uSW52YWxpZFRleHQsXHJcbiAgcmVtaW5kZXJJbnZhbGlkVGV4dDogcmVzb3VyY2UucmVtaW5kZXJJbnZhbGlkVGV4dCxcclxuICByZW1pbmRlclRpdGxlVGV4dDogcmVzb3VyY2UucmVtaW5kZXJJbnZhbGlkVGV4dCxcclxuICBsZWFkZXJUZXh0OiByZXNvdXJjZS5sZWFkZXJUZXh0LFxyXG4gIGxvbmdOb3Rlc1RleHQ6IHJlc291cmNlLmxvbmdOb3Rlc1RleHQsXHJcbiAgbG9uZ05vdGVzVGl0bGVUZXh0OiByZXNvdXJjZS5sb25nTm90ZXNUaXRsZVRleHQsXHJcbiAgcHJpb3JpdHlUZXh0OiByZXNvdXJjZS5wcmlvcml0eVRleHQsXHJcbiAgcHJpb3JpdHlUaXRsZVRleHQ6IHJlc291cmNlLnByaW9yaXR5VGl0bGVUZXh0LFxyXG4gIHJlZ2FyZGluZ1RleHQ6IHJlc291cmNlLnJlZ2FyZGluZ1RleHQsXHJcbiAgcm9sbG92ZXJUZXh0OiByZXNvdXJjZS5yb2xsb3ZlclRleHQsXHJcbiAgc3RhcnRpbmdUZXh0OiByZXNvdXJjZS5zdGFydGluZ1RleHQsXHJcbiAgc3RhcnRpbmdGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLnN0YXJ0aW5nRm9ybWF0VGV4dCxcclxuICBzdGFydGluZ0Zvcm1hdFRleHQyNDogZHRGb3JtYXRSZXNvdXJjZS5zdGFydGluZ0Zvcm1hdFRleHQyNCxcclxuICBzdGFydGluZ1RpbWVsZXNzRm9ybWF0VGV4dDogZHRGb3JtYXRSZXNvdXJjZS5zdGFydGluZ1RpbWVsZXNzRm9ybWF0VGV4dCxcclxuICByZXBlYXRzVGV4dDogcmVzb3VyY2UucmVwZWF0c1RleHQsXHJcbiAgcmVjdXJyaW5nVGV4dDogcmVzb3VyY2UucmVjdXJyaW5nVGV4dCxcclxuICByZWN1cnJpbmdUaXRsZVRleHQ6IHJlc291cmNlLnJlY3VycmluZ1RpdGxlVGV4dCxcclxuICB0aW1lbGVzc1RleHQ6IHJlc291cmNlLnRpbWVsZXNzVGV4dCxcclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICB0eXBlVGV4dDogcmVzb3VyY2UudHlwZVRleHQsXHJcbiAgYWNjb3VudFRleHQ6IHJlc291cmNlLmFjY291bnRUZXh0LFxyXG4gIGNvbnRhY3RUZXh0OiByZXNvdXJjZS5jb250YWN0VGV4dCxcclxuICBvcHBvcnR1bml0eVRleHQ6IHJlc291cmNlLm9wcG9ydHVuaXR5VGV4dCxcclxuICB0aWNrZXROdW1iZXJUZXh0OiByZXNvdXJjZS50aWNrZXROdW1iZXJUZXh0LFxyXG4gIGNvbXBhbnlUZXh0OiByZXNvdXJjZS5jb21wYW55VGV4dCxcclxuICBsZWFkVGV4dDogcmVzb3VyY2UubGVhZFRleHQsXHJcbiAgaXNMZWFkVGV4dDogcmVzb3VyY2UuaXNMZWFkVGV4dCxcclxuICB5ZXNUZXh0OiByZXNvdXJjZS55ZXNUZXh0LFxyXG4gIG5vVGV4dDogcmVzb3VyY2Uubm9UZXh0LFxyXG4gIHBob25lVGV4dDogcmVzb3VyY2UucGhvbmVUZXh0LFxyXG4gIHVwZGF0ZVVzZXJBY3RFcnJvclRleHQ6IHJlc291cmNlLnVwZGF0ZVVzZXJBY3RFcnJvclRleHQsXHJcbiAgcmVtaW5kZXJWYWx1ZVRleHQ6IHtcclxuICAgIDA6IHJlc291cmNlLm5vbmVUZXh0LFxyXG4gICAgNTogcmVzb3VyY2UuZml2ZU1pblRleHQsXHJcbiAgICAxNTogcmVzb3VyY2UucXVhcnRlckhvdXJUZXh0LFxyXG4gICAgMzA6IHJlc291cmNlLmhhbGZIb3VyVGV4dCxcclxuICAgIDYwOiByZXNvdXJjZS5ob3VyVGV4dCxcclxuICAgIDE0NDA6IHJlc291cmNlLmRheVRleHQsXHJcbiAgfSxcclxuICBkdXJhdGlvblZhbHVlVGV4dDoge1xyXG4gICAgMDogcmVzb3VyY2Uubm9uZVRleHQsXHJcbiAgICAxNTogcmVzb3VyY2UucXVhcnRlckhvdXJUZXh0LFxyXG4gICAgMzA6IHJlc291cmNlLmhhbGZIb3VyVGV4dCxcclxuICAgIDYwOiByZXNvdXJjZS5ob3VyVGV4dCxcclxuICAgIDkwOiByZXNvdXJjZS5ob3VyQW5kSGFsZlRleHQsXHJcbiAgICAxMjA6IHJlc291cmNlLnR3b0hvdXJzVGV4dCxcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBAcHJvcGVydHkge051bWJlcn1cclxuICAgKiBUaGUgbnVtYmVyIG9mIG1pbnV0ZXMgdGhhdCBzaG91bGQgYmUgcm91bmRlZCB0byBhcyBhIGRlZmF1bHQgc3RhcnQgd2hlbiBjcmVhdGluZyBhIG5ldyBhY3Rpdml0eVxyXG4gICAqL1xyXG4gIFJPVU5EX01JTlVURVM6IDE1LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ2FjdGl2aXR5X2VkaXQnLFxyXG4gIGRldGFpbFZpZXc6ICdhY3Rpdml0eV9kZXRhaWwnLFxyXG4gIGZpZWxkc0ZvckxlYWRzOiBbJ0FjY291bnROYW1lJywgJ0xlYWQnXSxcclxuICBmaWVsZHNGb3JTdGFuZGFyZDogWydBY2NvdW50JywgJ0NvbnRhY3QnLCAnT3Bwb3J0dW5pdHknLCAnVGlja2V0J10sXHJcbiAgLyoqXHJcbiAgICogQGRlcHJlY2F0ZWQgVXNlIEFjdGl2aXR5VHlwZVBpY2tsaXN0cyBmcm9tIE1vZGVzL0FjdGl2aXR5L0FjdGl2aXR5VHlwZVBpY2tsaXN0cyBpbnN0ZWFkXHJcbiAgICovXHJcbiAgcGlja2xpc3RzQnlUeXBlOiB7XHJcbiAgICBhdEFwcG9pbnRtZW50OiB7XHJcbiAgICAgIENhdGVnb3J5OiAnTWVldGluZyBDYXRlZ29yeSBDb2RlcycsXHJcbiAgICAgIERlc2NyaXB0aW9uOiAnTWVldGluZyBSZWdhcmRpbmcnLFxyXG4gICAgfSxcclxuICAgIGF0TGl0ZXJhdHVyZToge1xyXG4gICAgICBEZXNjcmlwdGlvbjogJ0xpdCBSZXF1ZXN0IFJlZ2FyZGluZycsXHJcbiAgICB9LFxyXG4gICAgYXRQZXJzb25hbDoge1xyXG4gICAgICBDYXRlZ29yeTogJ01lZXRpbmcgQ2F0ZWdvcnkgQ29kZXMnLFxyXG4gICAgICBEZXNjcmlwdGlvbjogJ1BlcnNvbmFsIEFjdGl2aXR5IFJlZ2FyZGluZycsXHJcbiAgICB9LFxyXG4gICAgYXRQaG9uZUNhbGw6IHtcclxuICAgICAgQ2F0ZWdvcnk6ICdQaG9uZSBDYWxsIENhdGVnb3J5IENvZGVzJyxcclxuICAgICAgRGVzY3JpcHRpb246ICdQaG9uZSBDYWxsIFJlZ2FyZGluZycsXHJcbiAgICB9LFxyXG4gICAgYXRUb0RvOiB7XHJcbiAgICAgIENhdGVnb3J5OiAnVG8gRG8gQ2F0ZWdvcnkgQ29kZXMnLFxyXG4gICAgICBEZXNjcmlwdGlvbjogJ1RvIERvIFJlZ2FyZGluZycsXHJcbiAgICB9LFxyXG4gICAgYXRFTWFpbDoge1xyXG4gICAgICBDYXRlZ29yeTogJ0UtbWFpbCBDYXRlZ29yeSBDb2RlcycsXHJcbiAgICAgIERlc2NyaXB0aW9uOiAnRS1tYWlsIFJlZ2FyZGluZycsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgZ3JvdXBPcHRpb25zQnlUeXBlOiB7XHJcbiAgICBhdFRvRG86ICdBY3Rpdml0eVRvRG9PcHRpb25zJyxcclxuICAgIGF0UGVyc29uYWw6ICdBY3Rpdml0eVBlcnNvbmFsT3B0aW9ucycsXHJcbiAgICBhdFBob25lQ2FsbDogJ0FjdGl2aXR5UGhvbmVPcHRpb25zJyxcclxuICAgIGF0QXBwb2ludG1lbnQ6ICdBY3Rpdml0eU1lZXRpbmdPcHRpb25zJyxcclxuICB9LFxyXG5cclxuICBlbnRpdHlOYW1lOiAnQWN0aXZpdHknLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuQUNUSVZJVFksXHJcbiAgaW5zZXJ0U2VjdXJpdHk6IG51bGwsIC8vICdFbnRpdGllcy9BY3Rpdml0eS9BZGQnLFxyXG4gIHVwZGF0ZVNlY3VyaXR5OiBudWxsLCAvLyAnRW50aXRpZXMvQWN0aXZpdHkvRWRpdCcsXHJcbiAgY29udHJhY3ROYW1lOiAnc3lzdGVtJyxcclxuICByZXNvdXJjZUtpbmQ6ICdhY3Rpdml0aWVzJyxcclxuICByZWN1cnJlbmNlOiBudWxsLFxyXG4gIF9wcmV2aW91c1JlY3VycmVuY2U6IG51bGwsXHJcblxyXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG5cclxuICAgIHRoaXMucmVjdXJyZW5jZSA9IHtcclxuICAgICAgUmVjdXJJdGVyYXRpb25zOiAnMCcsXHJcbiAgICAgIFJlY3VyUGVyaW9kOiAnLTEnLFxyXG4gICAgICBSZWN1clBlcmlvZFNwZWM6ICcwJyxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLkxlYWQsICdvbkNoYW5nZScsIHRoaXMub25MZWFkQ2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5Jc0xlYWQsICdvbkNoYW5nZScsIHRoaXMub25Jc0xlYWRDaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLkxlYWRlciwgJ29uQ2hhbmdlJywgdGhpcy5vbkxlYWRlckNoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuVGltZWxlc3MsICdvbkNoYW5nZScsIHRoaXMub25UaW1lbGVzc0NoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuQWxhcm0sICdvbkNoYW5nZScsIHRoaXMub25BbGFybUNoYW5nZSk7XHJcblxyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLkFjY291bnQsICdvbkNoYW5nZScsIHRoaXMub25BY2NvdW50Q2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5Db250YWN0LCAnb25DaGFuZ2UnLCB0aGlzLm9uQ29udGFjdENoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuT3Bwb3J0dW5pdHksICdvbkNoYW5nZScsIHRoaXMub25PcHBvcnR1bml0eUNoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuVGlja2V0LCAnb25DaGFuZ2UnLCB0aGlzLm9uVGlja2V0Q2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5TdGFydERhdGUsICdvbkNoYW5nZScsIHRoaXMub25TdGFydERhdGVDaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLlJlY3VycmVuY2VVSSwgJ29uQ2hhbmdlJywgdGhpcy5vblJlY3VycmVuY2VVSUNoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuUmVjdXJyZW5jZSwgJ29uQ2hhbmdlJywgdGhpcy5vblJlY3VycmVuY2VDaGFuZ2UpO1xyXG4gIH0sXHJcbiAgb25BZGRDb21wbGV0ZTogZnVuY3Rpb24gb25BZGRDb21wbGV0ZSgpIHtcclxuICAgIGVudmlyb25tZW50LnJlZnJlc2hBY3Rpdml0eUxpc3RzKCk7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgb25QdXRDb21wbGV0ZTogZnVuY3Rpb24gb25QdXRDb21wbGV0ZShlbnRyeSwgdXBkYXRlZEVudHJ5KSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcodGhpcy5kZXRhaWxWaWV3KTtcclxuICAgIGNvbnN0IG9yaWdpbmFsS2V5ID0gKHRoaXMub3B0aW9ucy5lbnRyeSAmJiB0aGlzLm9wdGlvbnMuZW50cnkuJGtleSkgfHwgdXBkYXRlZEVudHJ5LiRrZXk7XHJcblxyXG4gICAgdGhpcy5lbmFibGUoKTtcclxuXHJcbiAgICBlbnZpcm9ubWVudC5yZWZyZXNoQWN0aXZpdHlMaXN0cygpO1xyXG4gICAgY29ubmVjdC5wdWJsaXNoKCcvYXBwL3JlZnJlc2gnLCBbe1xyXG4gICAgICByZXNvdXJjZUtpbmQ6IHRoaXMucmVzb3VyY2VLaW5kLFxyXG4gICAgICBrZXk6IHVwZGF0ZWRFbnRyeS4ka2V5LFxyXG4gICAgICBkYXRhOiB1cGRhdGVkRW50cnksXHJcbiAgICB9XSk7XHJcblxyXG4gICAgaWYgKHVwZGF0ZWRFbnRyeS4ka2V5ICE9PSBvcmlnaW5hbEtleSAmJiB2aWV3KSB7XHJcbiAgICAgIC8vIEVkaXRpbmcgc2luZ2xlIG9jY3VycmVuY2UgcmVzdWx0cyBpbiBuZXcgJGtleS9yZWNvcmRcclxuICAgICAgdmlldy5zaG93KHtcclxuICAgICAgICBrZXk6IHVwZGF0ZWRFbnRyeS4ka2V5LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgcmV0dXJuVG86IC0yLFxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub25VcGRhdGVDb21wbGV0ZWQodXBkYXRlZEVudHJ5KTtcclxuICAgIH1cclxuICB9LFxyXG4gIGNvbnZlcnRFbnRyeTogZnVuY3Rpb24gY29udmVydEVudHJ5KCkge1xyXG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuZW50cnkpIHtcclxuICAgICAgaWYgKGVudHJ5ICYmIGVudHJ5LkxlYWRlci4ka2V5KSB7XHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0TGVhZGVyKGVudHJ5LkxlYWRlci4ka2V5KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBlbnRyeTtcclxuICB9LFxyXG4gIHJlcXVlc3RMZWFkZXI6IGZ1bmN0aW9uIHJlcXVlc3RMZWFkZXIodXNlcklkKSB7XHJcbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhU2luZ2xlUmVzb3VyY2VSZXF1ZXN0KHRoaXMuZ2V0Q29ubmVjdGlvbigpKVxyXG4gICAgICAuc2V0UmVzb3VyY2VLaW5kKCd1c2VycycpXHJcbiAgICAgIC5zZXRSZXNvdXJjZVNlbGVjdG9yKGAnJHt1c2VySWR9J2ApXHJcbiAgICAgIC5zZXRRdWVyeUFyZygnc2VsZWN0JywgW1xyXG4gICAgICAgICdVc2VySW5mby9GaXJzdE5hbWUnLFxyXG4gICAgICAgICdVc2VySW5mby9MYXN0TmFtZScsXHJcbiAgICAgIF0uam9pbignLCcpKTtcclxuXHJcbiAgICByZXF1ZXN0LnJlYWQoe1xyXG4gICAgICBzdWNjZXNzOiB0aGlzLnByb2Nlc3NMZWFkZXIsXHJcbiAgICAgIGZhaWx1cmU6IHRoaXMucmVxdWVzdExlYWRlckZhaWx1cmUsXHJcbiAgICAgIHNjb3BlOiB0aGlzLFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICByZXF1ZXN0TGVhZGVyRmFpbHVyZTogZnVuY3Rpb24gcmVxdWVzdExlYWRlckZhaWx1cmUoKSB7fSxcclxuICBwcm9jZXNzTGVhZGVyOiBmdW5jdGlvbiBwcm9jZXNzTGVhZGVyKGxlYWRlcikge1xyXG4gICAgaWYgKGxlYWRlcikge1xyXG4gICAgICB0aGlzLmVudHJ5LkxlYWRlciA9IGxlYWRlcjtcclxuICAgICAgdGhpcy5maWVsZHMuTGVhZGVyLnNldFZhbHVlKGxlYWRlcik7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjdXJyZW50VXNlckNhbkVkaXQ6IGZ1bmN0aW9uIGN1cnJlbnRVc2VyQ2FuRWRpdChlbnRyeSkge1xyXG4gICAgcmV0dXJuIChlbnRyeSAmJiAoZW50cnkuQWxsb3dFZGl0KSk7XHJcbiAgfSxcclxuICBjdXJyZW50VXNlckNhblNldEFsYXJtOiBmdW5jdGlvbiBjdXJyZW50VXNlckNhblNldEFsYXJtKGVudHJ5KSB7XHJcbiAgICByZXR1cm4gISFlbnRyeSAmJiAoZW50cnkuTGVhZGVyLiRrZXkgPT09IEFwcC5jb250ZXh0LnVzZXIuJGtleSk7XHJcbiAgfSxcclxuICBpc0FjdGl2aXR5Rm9yTGVhZDogZnVuY3Rpb24gaXNBY3Rpdml0eUZvckxlYWQoZW50cnkpIHtcclxuICAgIHJldHVybiBlbnRyeSAmJiAvXltcXHddezEyfSQvLnRlc3QoZW50cnkuTGVhZElkKTtcclxuICB9LFxyXG4gIGlzQWN0aXZpdHlSZWN1cnJpbmc6IGZ1bmN0aW9uIGlzQWN0aXZpdHlSZWN1cnJpbmcoKSB7XHJcbiAgICByZXR1cm4gKC9yc3RNYXN0ZXIvKVxyXG4gICAgICAudGVzdCh0aGlzLmZpZWxkcy5SZWN1cnJlbmNlU3RhdGUuZ2V0VmFsdWUoKSk7XHJcbiAgfSxcclxuICBpc0luTGVhZENvbnRleHQ6IGZ1bmN0aW9uIGlzSW5MZWFkQ29udGV4dCgpIHtcclxuICAgIGNvbnN0IGluc2VydCA9IHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuaW5zZXJ0O1xyXG4gICAgY29uc3QgZW50cnkgPSB0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmVudHJ5O1xyXG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMuX2dldE5hdkNvbnRleHQoKTtcclxuICAgIGxldCBpc0xlYWRDb250ZXh0ID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKGNvbnRleHQucmVzb3VyY2VLaW5kID09PSAnbGVhZHMnKSB7XHJcbiAgICAgIGlzTGVhZENvbnRleHQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxlYWQgPSAoaW5zZXJ0ICYmIGlzTGVhZENvbnRleHQpIHx8IHRoaXMuaXNBY3Rpdml0eUZvckxlYWQoZW50cnkpO1xyXG5cclxuICAgIHJldHVybiAhIWxlYWQ7XHJcbiAgfSxcclxuICBiZWZvcmVUcmFuc2l0aW9uVG86IGZ1bmN0aW9uIGJlZm9yZVRyYW5zaXRpb25UbygpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcblxyXG4gICAgLy8gd2UgaGlkZSB0aGUgbGVhZCBvciBzdGFuZGFyZCBmaWVsZHMgaGVyZSwgYXMgdGhlIHZpZXcgaXMgY3VycmVudGx5IGhpZGRlbiwgaW4gb3JkZXIgdG8gcHJldmVudCBmbGFzaGluZy5cclxuICAgIC8vIHRoZSB2YWx1ZSBmb3IgdGhlICdJc0xlYWQnIGZpZWxkIHdpbGwgYmUgc2V0IGxhdGVyLCBiYXNlZCBvbiB0aGUgdmFsdWUgZGVyaXZlZCBoZXJlLlxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pc0ZvckxlYWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vcHRpb25zLmlzRm9yTGVhZCA9IHRoaXMuaXNJbkxlYWRDb250ZXh0KCk7XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pc0ZvckxlYWQpIHtcclxuICAgICAgdGhpcy5zaG93RmllbGRzRm9yTGVhZCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zaG93RmllbGRzRm9yU3RhbmRhcmQoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGRpc2FibGVGaWVsZHM6IGZ1bmN0aW9uIGRpc2FibGVGaWVsZHMocHJlZGljYXRlKSB7XHJcbiAgICBmb3IgKGNvbnN0IG5hbWUgaW4gdGhpcy5maWVsZHMpIHtcclxuICAgICAgaWYgKCFwcmVkaWNhdGUgfHwgcHJlZGljYXRlKHRoaXMuZmllbGRzW25hbWVdKSkge1xyXG4gICAgICAgIHRoaXMuZmllbGRzW25hbWVdLmRpc2FibGUoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZW5hYmxlRmllbGRzOiBmdW5jdGlvbiBlbmFibGVGaWVsZHMocHJlZGljYXRlKSB7XHJcbiAgICBmb3IgKGNvbnN0IG5hbWUgaW4gdGhpcy5maWVsZHMpIHtcclxuICAgICAgaWYgKCFwcmVkaWNhdGUgfHwgcHJlZGljYXRlKHRoaXMuZmllbGRzW25hbWVdKSkge1xyXG4gICAgICAgIHRoaXMuZmllbGRzW25hbWVdLmVuYWJsZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBvbklzTGVhZENoYW5nZTogZnVuY3Rpb24gb25Jc0xlYWRDaGFuZ2UodmFsdWUpIHtcclxuICAgIHRoaXMub3B0aW9ucy5pc0ZvckxlYWQgPSB2YWx1ZTtcclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmlzRm9yTGVhZCkge1xyXG4gICAgICB0aGlzLnNob3dGaWVsZHNGb3JMZWFkKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNob3dGaWVsZHNGb3JTdGFuZGFyZCgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2hvd0ZpZWxkc0ZvckxlYWQ6IGZ1bmN0aW9uIHNob3dGaWVsZHNGb3JMZWFkKCkge1xyXG4gICAgdGhpcy5maWVsZHNGb3JTdGFuZGFyZC5jb25jYXQodGhpcy5maWVsZHNGb3JMZWFkcykuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5maWVsZHNbaXRlbV0pIHtcclxuICAgICAgICB0aGlzLmZpZWxkc1tpdGVtXS5oaWRlKCk7XHJcbiAgICAgIH1cclxuICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuZmllbGRzRm9yTGVhZHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5maWVsZHNbaXRlbV0pIHtcclxuICAgICAgICB0aGlzLmZpZWxkc1tpdGVtXS5zaG93KCk7XHJcbiAgICAgIH1cclxuICAgIH0sIHRoaXMpO1xyXG4gIH0sXHJcbiAgc2hvd0ZpZWxkc0ZvclN0YW5kYXJkOiBmdW5jdGlvbiBzaG93RmllbGRzRm9yU3RhbmRhcmQoKSB7XHJcbiAgICB0aGlzLmZpZWxkc0ZvclN0YW5kYXJkLmNvbmNhdCh0aGlzLmZpZWxkc0ZvckxlYWRzKS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmZpZWxkc1tpdGVtXSkge1xyXG4gICAgICAgIHRoaXMuZmllbGRzW2l0ZW1dLmhpZGUoKTtcclxuICAgICAgfVxyXG4gICAgfSwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5maWVsZHNGb3JTdGFuZGFyZC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmZpZWxkc1tpdGVtXSkge1xyXG4gICAgICAgIHRoaXMuZmllbGRzW2l0ZW1dLnNob3coKTtcclxuICAgICAgfVxyXG4gICAgfSwgdGhpcyk7XHJcbiAgfSxcclxuICB0b2dnbGVTZWxlY3RGaWVsZDogZnVuY3Rpb24gdG9nZ2xlU2VsZWN0RmllbGQoZmllbGQsIGRpc2FibGUpIHtcclxuICAgIGlmIChkaXNhYmxlKSB7XHJcbiAgICAgIGZpZWxkLmRpc2FibGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZpZWxkLmVuYWJsZSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25UaW1lbGVzc0NoYW5nZTogZnVuY3Rpb24gb25UaW1lbGVzc0NoYW5nZSh2YWx1ZSkge1xyXG4gICAgdGhpcy50b2dnbGVTZWxlY3RGaWVsZCh0aGlzLmZpZWxkcy5EdXJhdGlvbiwgdmFsdWUpO1xyXG4gICAgY29uc3Qgc3RhcnREYXRlRmllbGQgPSB0aGlzLmZpZWxkcy5TdGFydERhdGU7XHJcblxyXG4gICAgaWYgKHZhbHVlKSB7IC8vIFN0YXJ0RGF0ZSB0aW1lbGVzc1xyXG4gICAgICB0aGlzLmZpZWxkcy5Sb2xsb3Zlci5lbmFibGUoKTtcclxuICAgICAgc3RhcnREYXRlRmllbGQuZGF0ZUZvcm1hdFRleHQgPSB0aGlzLnN0YXJ0aW5nVGltZWxlc3NGb3JtYXRUZXh0O1xyXG4gICAgICBzdGFydERhdGVGaWVsZC5zaG93VGltZVBpY2tlciA9IGZhbHNlO1xyXG4gICAgICBzdGFydERhdGVGaWVsZC50aW1lbGVzcyA9IHRydWU7XHJcbiAgICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IHRoaXMuX2dldE5ld1N0YXJ0RGF0ZShzdGFydERhdGVGaWVsZC5nZXRWYWx1ZSgpLCB0cnVlKTtcclxuXHJcbiAgICAgIGlmIChzdGFydERhdGUpIHtcclxuICAgICAgICBzdGFydERhdGVGaWVsZC5zZXRWYWx1ZShzdGFydERhdGUpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgeyAvLyBTdGFydERhdGUgd2l0aCBvdXQgdGltZSAoVGltZWxlc3MpXHJcbiAgICAgIHRoaXMuZmllbGRzLlJvbGxvdmVyLnNldFZhbHVlKGZhbHNlKTtcclxuICAgICAgdGhpcy5maWVsZHMuUm9sbG92ZXIuZGlzYWJsZSgpO1xyXG4gICAgICBzdGFydERhdGVGaWVsZC5kYXRlRm9ybWF0VGV4dCA9IChBcHAuaXMyNEhvdXJDbG9jaygpKSA/IHRoaXMuc3RhcnRpbmdGb3JtYXRUZXh0MjQgOiB0aGlzLnN0YXJ0aW5nRm9ybWF0VGV4dDtcclxuICAgICAgc3RhcnREYXRlRmllbGQuc2hvd1RpbWVQaWNrZXIgPSB0cnVlO1xyXG4gICAgICBzdGFydERhdGVGaWVsZC50aW1lbGVzcyA9IGZhbHNlO1xyXG4gICAgICBjb25zdCBzdGFydERhdGUgPSB0aGlzLl9nZXROZXdTdGFydERhdGUoc3RhcnREYXRlRmllbGQuZ2V0VmFsdWUoKSwgZmFsc2UpO1xyXG5cclxuICAgICAgaWYgKHN0YXJ0RGF0ZSkge1xyXG4gICAgICAgIHN0YXJ0RGF0ZUZpZWxkLnNldFZhbHVlKHN0YXJ0RGF0ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIG9uQWxhcm1DaGFuZ2U6IGZ1bmN0aW9uIG9uQWxhcm1DaGFuZ2UoKSB7XHJcbiAgICBpZiAodGhpcy5maWVsZHMuQWxhcm0uZ2V0VmFsdWUoKSkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5SZW1pbmRlci5lbmFibGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLlJlbWluZGVyLmRpc2FibGUoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uTGVhZENoYW5nZTogZnVuY3Rpb24gb25MZWFkQ2hhbmdlKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gZmllbGQuZ2V0U2VsZWN0aW9uKCk7XHJcblxyXG4gICAgaWYgKHNlbGVjdGlvbiAmJiB0aGlzLmluc2VydCkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5BY2NvdW50TmFtZS5zZXRWYWx1ZSh1dGlsaXR5LmdldFZhbHVlKHNlbGVjdGlvbiwgJ0NvbXBhbnknKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZW50cnkgPSBmaWVsZC5jdXJyZW50U2VsZWN0aW9uO1xyXG4gICAgaWYgKGVudHJ5LldvcmtQaG9uZSkge1xyXG4gICAgICBjb25zdCBwaG9uZUZpZWxkID0gdGhpcy5maWVsZHMuUGhvbmVOdW1iZXI7XHJcbiAgICAgIHBob25lRmllbGQuc2V0VmFsdWUoZW50cnkuV29ya1Bob25lKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uTGVhZGVyQ2hhbmdlOiBmdW5jdGlvbiBvbkxlYWRlckNoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIGNvbnN0IHVzZXIgPSBmaWVsZC5nZXRWYWx1ZSgpO1xyXG4gICAgbGV0IHJlc291cmNlSWQgPSAnJztcclxuXHJcbiAgICBsZXQga2V5ID0gdXNlci4ka2V5O1xyXG5cclxuICAgIC8vIFRoZSBrZXkgaXMgYSBjb21wb3NpdGUga2V5IG9uIGFjdGl2aXR5cmVzb3VyY2V2aWV3cyBlbmRwb2ludC5cclxuICAgIC8vIFRoZSBmb3JtYXQgaXMgJ1Jlc291cmNlSWQtQWNjZXNzSWQnLlxyXG4gICAgLy8gVGhlIGZlZWQgZG9lcyBpbmNsdWRlIHRoZXNlIGFzIHNlcGVyYXRlIGZpZWxkcywgYnV0IHdlIG5lZWQgdG8ga2VlcCB0aGUgJGtleS8kZGVzY3JpcHRvciBmb3JtYXQgZm9yIGRvaW5nXHJcbiAgICAvLyB0aGUgUFVUIHRvIHRoZSBhY3Rpdml0aWVzIGVuZHBvaW50LiBXZSB3aWxsIGNvbnZlcnQgdGhlIGNvbXBvc2l0ZSBrZXkgdG8gc29tZXRoaW5nIHRoZSBhY3Rpdml0aWVzIGVuZHBvaW50IHdpbGwgdW5kZXJzdGFuZC5cclxuICAgIGlmIChrZXkpIHtcclxuICAgICAga2V5ID0ga2V5LnNwbGl0KCctJyk7XHJcbiAgICAgIHJlc291cmNlSWQgPSBrZXlbMF07XHJcbiAgICAgIGlmIChyZXNvdXJjZUlkKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZHMuVXNlcklkLnNldFZhbHVlKHJlc291cmNlSWQpO1xyXG5cclxuICAgICAgICAvLyBTZXQgYmFjayB0byBhIHNpbmdsZSAka2V5IHNvIHRoZSBQVVQgcmVxdWVzdCBwYXlsb2FkIGlzIG5vdCBtZXNzZWQgdXBcclxuICAgICAgICB0aGlzLmZpZWxkcy5MZWFkZXIuc2V0VmFsdWUoe1xyXG4gICAgICAgICAgJGtleTogcmVzb3VyY2VJZCxcclxuICAgICAgICAgICRkZXNjcmlwdG9yOiB1c2VyLiRkZXNjcmlwdG9yLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBvbkFjY291bnRDaGFuZ2U6IGZ1bmN0aW9uIG9uQWNjb3VudENoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIGNvbnN0IGZpZWxkcyA9IHRoaXMuZmllbGRzO1xyXG4gICAgWydDb250YWN0JywgJ09wcG9ydHVuaXR5JywgJ1RpY2tldCddLmZvckVhY2goKGYpID0+IHtcclxuICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgZmllbGRzW2ZdLmRlcGVuZHNPbiA9ICdBY2NvdW50JztcclxuICAgICAgICBmaWVsZHNbZl0ud2hlcmUgPSBgQWNjb3VudC5JZCBlcSBcIiR7dmFsdWUuQWNjb3VudElkIHx8IHZhbHVlLmtleX1cImA7XHJcblxyXG4gICAgICAgIGlmIChmaWVsZHNbZl0uY3VycmVudFNlbGVjdGlvbiAmJlxyXG4gICAgICAgICAgZmllbGRzW2ZdLmN1cnJlbnRTZWxlY3Rpb24uQWNjb3VudC4ka2V5ICE9PSAodmFsdWUuQWNjb3VudElkIHx8IHZhbHVlLmtleSkpIHtcclxuICAgICAgICAgIGZpZWxkc1tmXS5zZXRWYWx1ZShmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBObyB3YXkgdG8gZGV0ZXJtaW5lIGlmIHRoZSBmaWVsZCBpcyBwYXJ0IG9mIHRoZSBjaGFuZ2VkIGFjY291bnQsIGNsZWFyIGl0XHJcbiAgICAgICAgaWYgKCFmaWVsZHNbZl0uY3VycmVudFNlbGVjdGlvbikge1xyXG4gICAgICAgICAgZmllbGRzW2ZdLnNldFZhbHVlKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmaWVsZHNbZl0uZGVwZW5kc09uID0gbnVsbDtcclxuICAgICAgICBmaWVsZHNbZl0ud2hlcmUgPSAnQWNjb3VudC5BY2NvdW50TmFtZSBuZSBudWxsJztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGVudHJ5ID0gZmllbGQuY3VycmVudFNlbGVjdGlvbjtcclxuICAgIGlmIChlbnRyeSAmJiBlbnRyeS5NYWluUGhvbmUpIHtcclxuICAgICAgY29uc3QgcGhvbmVGaWVsZCA9IHRoaXMuZmllbGRzLlBob25lTnVtYmVyO1xyXG4gICAgICBwaG9uZUZpZWxkLnNldFZhbHVlKGVudHJ5Lk1haW5QaG9uZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvbkNvbnRhY3RDaGFuZ2U6IGZ1bmN0aW9uIG9uQ29udGFjdENoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIHRoaXMub25BY2NvdW50RGVwZW5kZW50Q2hhbmdlKHZhbHVlLCBmaWVsZCk7XHJcbiAgICBjb25zdCBlbnRyeSA9IGZpZWxkLmN1cnJlbnRTZWxlY3Rpb247XHJcblxyXG4gICAgaWYgKGVudHJ5ICYmIGVudHJ5LldvcmtQaG9uZSkge1xyXG4gICAgICBjb25zdCBwaG9uZUZpZWxkID0gdGhpcy5maWVsZHMuUGhvbmVOdW1iZXI7XHJcbiAgICAgIHBob25lRmllbGQuc2V0VmFsdWUoZW50cnkuV29ya1Bob25lKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uT3Bwb3J0dW5pdHlDaGFuZ2U6IGZ1bmN0aW9uIG9uT3Bwb3J0dW5pdHlDaGFuZ2UodmFsdWUsIGZpZWxkKSB7XHJcbiAgICB0aGlzLm9uQWNjb3VudERlcGVuZGVudENoYW5nZSh2YWx1ZSwgZmllbGQpO1xyXG4gICAgY29uc3QgZW50cnkgPSBmaWVsZC5jdXJyZW50U2VsZWN0aW9uO1xyXG5cclxuICAgIGlmIChlbnRyeSAmJiBlbnRyeS5BY2NvdW50ICYmIGVudHJ5LkFjY291bnQuTWFpblBob25lKSB7XHJcbiAgICAgIGNvbnN0IHBob25lRmllbGQgPSB0aGlzLmZpZWxkc1Bob25lTnVtYmVyO1xyXG4gICAgICBwaG9uZUZpZWxkLnNldFZhbHVlKGVudHJ5LkFjY291bnQuTWFpblBob25lKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uVGlja2V0Q2hhbmdlOiBmdW5jdGlvbiBvblRpY2tldENoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIHRoaXMub25BY2NvdW50RGVwZW5kZW50Q2hhbmdlKHZhbHVlLCBmaWVsZCk7XHJcbiAgICBjb25zdCBlbnRyeSA9IGZpZWxkLmN1cnJlbnRTZWxlY3Rpb247XHJcbiAgICBjb25zdCBwaG9uZSA9IGVudHJ5ICYmIGVudHJ5LkNvbnRhY3QgJiYgZW50cnkuQ29udGFjdC5Xb3JrUGhvbmUgfHwgZW50cnkgJiYgZW50cnkuQWNjb3VudCAmJiBlbnRyeS5BY2NvdW50Lk1haW5QaG9uZTtcclxuICAgIGlmIChwaG9uZSkge1xyXG4gICAgICBjb25zdCBwaG9uZUZpZWxkID0gdGhpcy5maWVsZHMuUGhvbmVOdW1iZXI7XHJcbiAgICAgIHBob25lRmllbGQuc2V0VmFsdWUocGhvbmUpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25BY2NvdW50RGVwZW5kZW50Q2hhbmdlOiBmdW5jdGlvbiBvbkFjY291bnREZXBlbmRlbnRDaGFuZ2UodmFsdWUsIGZpZWxkKSB7XHJcbiAgICBpZiAodmFsdWUgJiYgIWZpZWxkLmRlcGVuZHNPbiAmJiBmaWVsZC5jdXJyZW50U2VsZWN0aW9uICYmIGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24uQWNjb3VudCkge1xyXG4gICAgICBjb25zdCBhY2NvdW50RmllbGQgPSB0aGlzLmZpZWxkcy5BY2NvdW50O1xyXG4gICAgICBhY2NvdW50RmllbGQuc2V0VmFsdWUoe1xyXG4gICAgICAgIEFjY291bnRJZDogZmllbGQuY3VycmVudFNlbGVjdGlvbi5BY2NvdW50LiRrZXksXHJcbiAgICAgICAgQWNjb3VudE5hbWU6IGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24uQWNjb3VudC5BY2NvdW50TmFtZSxcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMub25BY2NvdW50Q2hhbmdlKGFjY291bnRGaWVsZC5nZXRWYWx1ZSgpLCBhY2NvdW50RmllbGQpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25TdGFydERhdGVDaGFuZ2U6IGZ1bmN0aW9uIG9uU3RhcnREYXRlQ2hhbmdlKHZhbHVlKSB7XHJcbiAgICB0aGlzLnJlY3VycmVuY2UuU3RhcnREYXRlID0gdmFsdWU7XHJcbiAgICAvLyBOZWVkIHJlY2FsY3VsYXRlIFJlY3VyUGVyaW9kU3BlYyBpbiBjYXNlIHdlZWtkYXkgb24gU3RhcnREYXRlIGNoYW5nZXNcclxuICAgIHRoaXMucmVjdXJyZW5jZS5SZWN1clBlcmlvZFNwZWMgPSByZWN1ci5nZXRSZWN1clBlcmlvZFNwZWMoXHJcbiAgICAgIHRoaXMucmVjdXJyZW5jZS5SZWN1clBlcmlvZCxcclxuICAgICAgdGhpcy5yZWN1cnJlbmNlLlN0YXJ0RGF0ZSxcclxuICAgICAgdGhpcy5yZWN1cnJlbmNlLlJlY3VyUGVyaW9kU3BlYyAtIHRoaXMucmVjdXJyZW5jZS5SZWN1clBlcmlvZFNwZWMgJSA2NTUzNiwgLy8gd2Vla2RheXNcclxuICAgICAgdGhpcy5yZWN1cnJlbmNlLlJlY3VyUGVyaW9kU3BlYyAlIDY1NTM2IC8vIGludGVydmFsXHJcbiAgICApO1xyXG4gICAgdGhpcy5yZXNldFJlY3VycmVuY2UodGhpcy5yZWN1cnJlbmNlKTtcclxuXHJcbiAgICByZWN1ci5jcmVhdGVTaW1wbGlmaWVkT3B0aW9ucyh2YWx1ZSk7XHJcblxyXG4gICAgY29uc3QgcmVwZWF0cyA9ICh0aGlzLnJlY3VycmVuY2UuUmVjdXJyZW5jZVN0YXRlID09PSAncnN0TWFzdGVyJyk7XHJcbiAgICB0aGlzLmZpZWxkcy5SZWN1cnJlbmNlVUkuc2V0VmFsdWUocmVjdXIuZ2V0UGFuZWwocmVwZWF0cyAmJiB0aGlzLnJlY3VycmVuY2UuUmVjdXJQZXJpb2QpKTtcclxuICB9LFxyXG4gIG9uUmVjdXJyZW5jZVVJQ2hhbmdlOiBmdW5jdGlvbiBvblJlY3VycmVuY2VVSUNoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIGNvbnN0IGtleSA9IGZpZWxkLmN1cnJlbnRWYWx1ZSAmJiBmaWVsZC5jdXJyZW50VmFsdWUua2V5O1xyXG4gICAgY29uc3Qgb3B0ID0gcmVjdXIuc2ltcGxpZmllZE9wdGlvbnNba2V5XTtcclxuICAgIC8vIHByZXNlcnZlICNpdGVyYXRpb25zIChhbmQgRW5kRGF0ZSkgaWYgbWF0Y2hpbmcgcmVjdXJyZW5jZVxyXG4gICAgaWYgKHRoaXMuX3ByZXZpb3VzUmVjdXJyZW5jZSA9PT0ga2V5KSB7XHJcbiAgICAgIG9wdC5SZWN1ckl0ZXJhdGlvbnMgPSB0aGlzLnJlY3VycmVuY2UuUmVjdXJJdGVyYXRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVzZXRSZWN1cnJlbmNlKG9wdCk7XHJcbiAgICB0aGlzLl9wcmV2aW91c1JlY3VycmVuY2UgPSBrZXk7XHJcbiAgfSxcclxuICBvblJlY3VycmVuY2VDaGFuZ2U6IGZ1bmN0aW9uIG9uUmVjdXJyZW5jZUNoYW5nZSh2YWx1ZSkge1xyXG4gICAgLy8gZGlkIHRoZSBTdGFydERhdGUgY2hhbmdlIG9uIHRoZSByZWN1cnJlbmNlX2VkaXQgc2NyZWVuP1xyXG4gICAgY29uc3Qgc3RhcnREYXRlID0gYXJnb3MuQ29udmVydC50b0RhdGVGcm9tU3RyaW5nKHZhbHVlLlN0YXJ0RGF0ZSk7IC8vIFRPRE86IEF2b2lkIGdsb2JhbFxyXG4gICAgY29uc3QgY3VycmVudERhdGUgPSB0aGlzLmZpZWxkcy5TdGFydERhdGUuZ2V0VmFsdWUoKTtcclxuXHJcbiAgICBpZiAoc3RhcnREYXRlLmdldERhdGUoKSAhPT0gY3VycmVudERhdGUuZ2V0RGF0ZSgpIHx8IHN0YXJ0RGF0ZS5nZXRNb250aCgpICE9PSBjdXJyZW50RGF0ZS5nZXRNb250aCgpKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLlN0YXJ0RGF0ZS5zZXRWYWx1ZShzdGFydERhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVzZXRSZWN1cnJlbmNlKHZhbHVlKTtcclxuICB9LFxyXG4gIHJlc2V0UmVjdXJyZW5jZTogZnVuY3Rpb24gcmVzZXRSZWN1cnJlbmNlKG8pIHtcclxuICAgIHRoaXMucmVjdXJyZW5jZS5TdGFydERhdGUgPSB0aGlzLmZpZWxkcy5TdGFydERhdGUuZ2V0VmFsdWUoKTtcclxuXHJcbiAgICBpZiAodHlwZW9mIG8uUmVjdXJyaW5nICE9PSAndW5kZWZpbmVkJyAmJiBvLlJlY3VycmluZyAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnJlY3VycmVuY2UuUmVjdXJyaW5nID0gby5SZWN1cnJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiBvLlJlY3VycmVuY2VTdGF0ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgby5SZWN1cnJlbmNlU3RhdGUgIT09IG51bGwpIHtcclxuICAgICAgdGhpcy5yZWN1cnJlbmNlLlJlY3VycmVuY2VTdGF0ZSA9IG8uUmVjdXJyZW5jZVN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2Ygby5SZWN1clBlcmlvZCAhPT0gJ3VuZGVmaW5lZCcgJiYgby5SZWN1clBlcmlvZCAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnJlY3VycmVuY2UuUmVjdXJQZXJpb2QgPSBvLlJlY3VyUGVyaW9kO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2Ygby5SZWN1clBlcmlvZFNwZWMgIT09ICd1bmRlZmluZWQnICYmIG8uUmVjdXJQZXJpb2RTcGVjICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMucmVjdXJyZW5jZS5SZWN1clBlcmlvZFNwZWMgPSBvLlJlY3VyUGVyaW9kU3BlYztcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIG8uUmVjdXJJdGVyYXRpb25zICE9PSAndW5kZWZpbmVkJyAmJiBvLlJlY3VySXRlcmF0aW9ucyAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnJlY3VycmVuY2UuUmVjdXJJdGVyYXRpb25zID0gby5SZWN1ckl0ZXJhdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZWN1cnJlbmNlLkVuZERhdGUgPSByZWN1ci5jYWxjRW5kRGF0ZSh0aGlzLnJlY3VycmVuY2UuU3RhcnREYXRlLCB0aGlzLnJlY3VycmVuY2UpO1xyXG5cclxuICAgIHRoaXMuZmllbGRzLlJlY3VycmVuY2VVSS5zZXRWYWx1ZShyZWN1ci5nZXRQYW5lbCh0aGlzLnJlY3VycmVuY2UuUmVjdXJQZXJpb2QpKTtcclxuICAgIHRoaXMuZmllbGRzLlJlY3VycmVuY2Uuc2V0VmFsdWUodGhpcy5yZWN1cnJlbmNlKTtcclxuXHJcbiAgICB0aGlzLmZpZWxkcy5SZWN1cnJpbmcuc2V0VmFsdWUodGhpcy5yZWN1cnJlbmNlLlJlY3VycmluZyk7XHJcbiAgICB0aGlzLmZpZWxkcy5SZWN1clBlcmlvZC5zZXRWYWx1ZSh0aGlzLnJlY3VycmVuY2UuUmVjdXJQZXJpb2QpO1xyXG4gICAgdGhpcy5maWVsZHMuUmVjdXJQZXJpb2RTcGVjLnNldFZhbHVlKHRoaXMucmVjdXJyZW5jZS5SZWN1cnJpbmcgPyB0aGlzLnJlY3VycmVuY2UuUmVjdXJQZXJpb2RTcGVjIDogMCk7XHJcbiAgICB0aGlzLmZpZWxkcy5SZWN1cnJlbmNlU3RhdGUuc2V0VmFsdWUodGhpcy5yZWN1cnJlbmNlLlJlY3VycmVuY2VTdGF0ZSk7XHJcbiAgICB0aGlzLmZpZWxkcy5SZWN1ckl0ZXJhdGlvbnMuc2V0VmFsdWUodGhpcy5yZWN1cnJlbmNlLlJlY3VySXRlcmF0aW9ucyk7XHJcbiAgICB0aGlzLmZpZWxkcy5FbmREYXRlLnNldFZhbHVlKHRoaXMucmVjdXJyZW5jZS5FbmREYXRlKTtcclxuXHJcbiAgICBpZiAoby5SZWN1cnJpbmcpIHtcclxuICAgICAgdGhpcy5maWVsZHMuUmVjdXJyZW5jZS5lbmFibGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLlJlY3VycmVuY2UuZGlzYWJsZSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGZvcm1hdFBpY2tsaXN0Rm9yVHlwZTogZnVuY3Rpb24gZm9ybWF0UGlja2xpc3RGb3JUeXBlKHR5cGUsIHdoaWNoKSB7XHJcbiAgICByZXR1cm4gZ2V0UGlja2xpc3RCeUFjdGl2aXR5VHlwZSh0eXBlLCB3aGljaCk7XHJcbiAgfSxcclxuICBmb3JtYXRSZWN1cnJlbmNlOiBmdW5jdGlvbiBmb3JtYXRSZWN1cnJlbmNlKHJlY3VycmVuY2UpIHtcclxuICAgIGlmICh0eXBlb2YgcmVjdXJyZW5jZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIHJlY3VycmVuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlY3VyLnRvU3RyaW5nKHJlY3VycmVuY2UsIHRydWUpO1xyXG4gIH0sXHJcbiAgX2dldENhbGN1bGF0ZWRTdGFydFRpbWU6IGZ1bmN0aW9uIF9nZXRDYWxjdWxhdGVkU3RhcnRUaW1lKHNlbGVjdGVkRGF0ZSkge1xyXG4gICAgY29uc3Qgbm93ID0gbW9tZW50KCk7XHJcbiAgICBsZXQgdGhpc1NlbGVjdGVkRGF0ZSA9IHNlbGVjdGVkRGF0ZTtcclxuXHJcbiAgICBpZiAoIW1vbWVudC5pc01vbWVudChzZWxlY3RlZERhdGUpKSB7XHJcbiAgICAgIHRoaXNTZWxlY3RlZERhdGUgPSBtb21lbnQoc2VsZWN0ZWREYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUYWtlIHRoZSBzdGFydCBvZiB0aGUgc2VsZWN0ZWQgZGF0ZSwgYWRkIHRoZSAqY3VycmVudCogdGltZSB0byBpdCxcclxuICAgIC8vIGFuZCByb3VuZCBpdCB1cCB0byB0aGUgbmVhcmVzdCBST1VORF9NSU5VVEVTXHJcbiAgICAvLyBFeGFtcGxlczpcclxuICAgIC8vIDExOjI0IC0+IDExOjMwXHJcbiAgICAvLyAxMToxMiAtPiAxMToxNVxyXG4gICAgLy8gMTE6MzEgLT4gMTE6NDVcclxuICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IHRoaXNTZWxlY3RlZERhdGUuY2xvbmUoKVxyXG4gICAgICAuc3RhcnRPZignZGF5JylcclxuICAgICAgLmhvdXJzKG5vdy5ob3VycygpKVxyXG4gICAgICAuYWRkKHtcclxuICAgICAgICBtaW51dGVzOiAoTWF0aC5mbG9vcihub3cubWludXRlcygpIC8gdGhpcy5ST1VORF9NSU5VVEVTKSAqIHRoaXMuUk9VTkRfTUlOVVRFUykgKyB0aGlzLlJPVU5EX01JTlVURVMsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBzdGFydERhdGU7XHJcbiAgfSxcclxuICBhcHBseVVzZXJBY3Rpdml0eUNvbnRleHQ6IGZ1bmN0aW9uIGFwcGx5VXNlckFjdGl2aXR5Q29udGV4dChvcHRpb25zRGF0ZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2dldENhbGN1bGF0ZWRTdGFydFRpbWUob3B0aW9uc0RhdGUpO1xyXG4gIH0sXHJcbiAgYXBwbHlDb250ZXh0OiBmdW5jdGlvbiBhcHBseUNvbnRleHQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG5cclxuICAgIGxldCBzdGFydERhdGUgPSB0aGlzLl9nZXRDYWxjdWxhdGVkU3RhcnRUaW1lKG1vbWVudCgpKTtcclxuICAgIGNvbnN0IGFjdGl2aXR5VHlwZSA9IHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuYWN0aXZpdHlUeXBlO1xyXG4gICAgY29uc3QgYWN0aXZpdHlHcm91cCA9IHRoaXMuZ3JvdXBPcHRpb25zQnlUeXBlW2FjdGl2aXR5VHlwZV0gfHwgJyc7XHJcbiAgICBjb25zdCBhY3Rpdml0eUR1cmF0aW9uID0gQXBwLmNvbnRleHQudXNlck9wdGlvbnMgJiYgQXBwLmNvbnRleHQudXNlck9wdGlvbnNbYCR7YWN0aXZpdHlHcm91cH06RHVyYXRpb25gXSB8fCAxNTtcclxuICAgIGNvbnN0IGFsYXJtRW5hYmxlZCA9IEFwcC5jb250ZXh0LnVzZXJPcHRpb25zICYmIEFwcC5jb250ZXh0LnVzZXJPcHRpb25zW2Ake2FjdGl2aXR5R3JvdXB9OkFsYXJtRW5hYmxlZGBdIHx8IHRydWU7XHJcbiAgICBjb25zdCBhbGFybUR1cmF0aW9uID0gQXBwLmNvbnRleHQudXNlck9wdGlvbnMgJiYgQXBwLmNvbnRleHQudXNlck9wdGlvbnNbYCR7YWN0aXZpdHlHcm91cH06QWxhcm1MZWFkYF0gfHwgMTU7XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuY3VycmVudERhdGUpIHtcclxuICAgICAgc3RhcnREYXRlID0gdGhpcy5hcHBseVVzZXJBY3Rpdml0eUNvbnRleHQobW9tZW50KHRoaXMub3B0aW9ucy5jdXJyZW50RGF0ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmllbGRzLlN0YXJ0RGF0ZS5zZXRWYWx1ZShzdGFydERhdGUudG9EYXRlKCkpO1xyXG4gICAgdGhpcy5maWVsZHMuVHlwZS5zZXRWYWx1ZShhY3Rpdml0eVR5cGUpO1xyXG4gICAgdGhpcy5maWVsZHMuRHVyYXRpb24uc2V0VmFsdWUoYWN0aXZpdHlEdXJhdGlvbik7XHJcbiAgICB0aGlzLmZpZWxkcy5BbGFybS5zZXRWYWx1ZShhbGFybUVuYWJsZWQpO1xyXG4gICAgdGhpcy5maWVsZHMuUmVtaW5kZXIuc2V0VmFsdWUoYWxhcm1EdXJhdGlvbik7XHJcblxyXG4gICAgY29uc3QgdXNlciA9IEFwcC5jb250ZXh0LnVzZXI7XHJcbiAgICBpZiAodXNlcikge1xyXG4gICAgICB0aGlzLmZpZWxkcy5Vc2VySWQuc2V0VmFsdWUodXNlci4ka2V5KTtcclxuXHJcbiAgICAgIGNvbnN0IGxlYWRlckZpZWxkID0gdGhpcy5maWVsZHMuTGVhZGVyO1xyXG4gICAgICBsZWFkZXJGaWVsZC5zZXRWYWx1ZSh1c2VyKTtcclxuICAgICAgdGhpcy5vbkxlYWRlckNoYW5nZSh1c2VyLCBsZWFkZXJGaWVsZCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZm91bmQgPSB0aGlzLl9nZXROYXZDb250ZXh0KCk7XHJcblxyXG4gICAgY29uc3QgYWNjb3VudEZpZWxkID0gdGhpcy5maWVsZHMuQWNjb3VudDtcclxuICAgIHRoaXMub25BY2NvdW50Q2hhbmdlKGFjY291bnRGaWVsZC5nZXRWYWx1ZSgpLCBhY2NvdW50RmllbGQpO1xyXG5cclxuICAgIGNvbnN0IGNvbnRleHQgPSAoZm91bmQgJiYgZm91bmQub3B0aW9ucyAmJiBmb3VuZC5vcHRpb25zLnNvdXJjZSkgfHwgZm91bmQ7XHJcbiAgICBjb25zdCBsb29rdXAgPSB7XHJcbiAgICAgIGFjY291bnRzOiB0aGlzLmFwcGx5QWNjb3VudENvbnRleHQsXHJcbiAgICAgIGNvbnRhY3RzOiB0aGlzLmFwcGx5Q29udGFjdENvbnRleHQsXHJcbiAgICAgIG9wcG9ydHVuaXRpZXM6IHRoaXMuYXBwbHlPcHBvcnR1bml0eUNvbnRleHQsXHJcbiAgICAgIHRpY2tldHM6IHRoaXMuYXBwbHlUaWNrZXRDb250ZXh0LFxyXG4gICAgICBsZWFkczogdGhpcy5hcHBseUxlYWRDb250ZXh0LFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoY29udGV4dCAmJiBsb29rdXBbY29udGV4dC5yZXNvdXJjZUtpbmRdKSB7XHJcbiAgICAgIGxvb2t1cFtjb250ZXh0LnJlc291cmNlS2luZF0uY2FsbCh0aGlzLCBjb250ZXh0KTtcclxuICAgIH1cclxuICB9LFxyXG4gIF9nZXROYXZDb250ZXh0OiBmdW5jdGlvbiBfZ2V0TmF2Q29udGV4dCgpIHtcclxuICAgIGNvbnN0IG5hdkNvbnRleHQgPSBBcHAucXVlcnlOYXZpZ2F0aW9uQ29udGV4dCgobykgPT4ge1xyXG4gICAgICBjb25zdCBjb250ZXh0ID0gKG8ub3B0aW9ucyAmJiBvLm9wdGlvbnMuc291cmNlKSB8fCBvO1xyXG5cclxuICAgICAgaWYgKC9eKGFjY291bnRzfGNvbnRhY3RzfG9wcG9ydHVuaXRpZXN8dGlja2V0c3xsZWFkcykkLy50ZXN0KGNvbnRleHQucmVzb3VyY2VLaW5kKSAmJiBjb250ZXh0LmtleSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBuYXZDb250ZXh0O1xyXG4gIH0sXHJcbiAgYXBwbHlBY2NvdW50Q29udGV4dDogZnVuY3Rpb24gYXBwbHlBY2NvdW50Q29udGV4dChjb250ZXh0KSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoY29udGV4dC5pZCk7XHJcbiAgICBjb25zdCBlbnRyeSA9IGNvbnRleHQuZW50cnkgfHwgKHZpZXcgJiYgdmlldy5lbnRyeSkgfHwgY29udGV4dDtcclxuXHJcbiAgICBpZiAoIWVudHJ5IHx8ICFlbnRyeS4ka2V5KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhY2NvdW50RmllbGQgPSB0aGlzLmZpZWxkcy5BY2NvdW50O1xyXG4gICAgYWNjb3VudEZpZWxkLnNldFNlbGVjdGlvbihlbnRyeSk7XHJcbiAgICBhY2NvdW50RmllbGQuc2V0VmFsdWUoe1xyXG4gICAgICBBY2NvdW50SWQ6IGVudHJ5LiRrZXksXHJcbiAgICAgIEFjY291bnROYW1lOiBlbnRyeS4kZGVzY3JpcHRvcixcclxuICAgIH0pO1xyXG4gICAgdGhpcy5vbkFjY291bnRDaGFuZ2UoYWNjb3VudEZpZWxkLmdldFZhbHVlKCksIGFjY291bnRGaWVsZCk7XHJcbiAgfSxcclxuICBhcHBseUNvbnRhY3RDb250ZXh0OiBmdW5jdGlvbiBhcHBseUNvbnRhY3RDb250ZXh0KGNvbnRleHQpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyhjb250ZXh0LmlkKTtcclxuICAgIGNvbnN0IGVudHJ5ID0gY29udGV4dC5lbnRyeSB8fCAodmlldyAmJiB2aWV3LmVudHJ5KSB8fCBjb250ZXh0O1xyXG5cclxuICAgIGlmICghZW50cnkgfHwgIWVudHJ5LiRrZXkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNvbnRhY3RGaWVsZCA9IHRoaXMuZmllbGRzLkNvbnRhY3Q7XHJcblxyXG4gICAgY29udGFjdEZpZWxkLnNldFNlbGVjdGlvbihlbnRyeSk7XHJcbiAgICBjb250YWN0RmllbGQuc2V0VmFsdWUoe1xyXG4gICAgICBDb250YWN0SWQ6IGVudHJ5LiRrZXksXHJcbiAgICAgIENvbnRhY3ROYW1lOiBlbnRyeS4kZGVzY3JpcHRvcixcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMub25BY2NvdW50RGVwZW5kZW50Q2hhbmdlKGNvbnRhY3RGaWVsZC5nZXRWYWx1ZSgpLCBjb250YWN0RmllbGQpO1xyXG5cclxuICAgIGNvbnN0IGFjY291bnRGaWVsZCA9IHRoaXMuZmllbGRzLkFjY291bnQ7XHJcbiAgICBhY2NvdW50RmllbGQuc2V0VmFsdWUoe1xyXG4gICAgICBBY2NvdW50SWQ6IHV0aWxpdHkuZ2V0VmFsdWUoZW50cnksICdBY2NvdW50LiRrZXknKSxcclxuICAgICAgQWNjb3VudE5hbWU6IHV0aWxpdHkuZ2V0VmFsdWUoZW50cnksICdBY2NvdW50LkFjY291bnROYW1lJyksXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZW50cnkuV29ya1Bob25lKSB7XHJcbiAgICAgIGNvbnN0IHBob25lRmllbGQgPSB0aGlzLmZpZWxkcy5QaG9uZU51bWJlcjtcclxuICAgICAgcGhvbmVGaWVsZC5zZXRWYWx1ZShlbnRyeS5Xb3JrUGhvbmUpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXBwbHlUaWNrZXRDb250ZXh0OiBmdW5jdGlvbiBhcHBseVRpY2tldENvbnRleHQoY29udGV4dCkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KGNvbnRleHQuaWQpO1xyXG4gICAgY29uc3QgZW50cnkgPSBjb250ZXh0LmVudHJ5IHx8ICh2aWV3ICYmIHZpZXcuZW50cnkpO1xyXG5cclxuICAgIGlmICghZW50cnkgfHwgIWVudHJ5LiRrZXkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRpY2tldEZpZWxkID0gdGhpcy5maWVsZHMuVGlja2V0O1xyXG4gICAgdGlja2V0RmllbGQuc2V0U2VsZWN0aW9uKGVudHJ5KTtcclxuICAgIHRpY2tldEZpZWxkLnNldFZhbHVlKHtcclxuICAgICAgVGlja2V0SWQ6IGVudHJ5LiRrZXksXHJcbiAgICAgIFRpY2tldE51bWJlcjogZW50cnkuJGRlc2NyaXB0b3IsXHJcbiAgICB9KTtcclxuICAgIHRoaXMub25BY2NvdW50RGVwZW5kZW50Q2hhbmdlKHRpY2tldEZpZWxkLmdldFZhbHVlKCksIHRpY2tldEZpZWxkKTtcclxuXHJcbiAgICBjb25zdCBjb250YWN0RmllbGQgPSB0aGlzLmZpZWxkcy5Db250YWN0O1xyXG4gICAgY29udGFjdEZpZWxkLnNldFZhbHVlKHtcclxuICAgICAgQ29udGFjdElkOiB1dGlsaXR5LmdldFZhbHVlKGVudHJ5LCAnQ29udGFjdC4ka2V5JyksXHJcbiAgICAgIENvbnRhY3ROYW1lOiB1dGlsaXR5LmdldFZhbHVlKGVudHJ5LCAnQ29udGFjdC5OYW1lTEYnKSxcclxuICAgIH0pO1xyXG4gICAgdGhpcy5vbkFjY291bnREZXBlbmRlbnRDaGFuZ2UoY29udGFjdEZpZWxkLmdldFZhbHVlKCksIGNvbnRhY3RGaWVsZCk7XHJcblxyXG4gICAgY29uc3QgYWNjb3VudEZpZWxkID0gdGhpcy5maWVsZHMuQWNjb3VudDtcclxuICAgIGFjY291bnRGaWVsZC5zZXRWYWx1ZSh7XHJcbiAgICAgIEFjY291bnRJZDogdXRpbGl0eS5nZXRWYWx1ZShlbnRyeSwgJ0FjY291bnQuJGtleScpLFxyXG4gICAgICBBY2NvdW50TmFtZTogdXRpbGl0eS5nZXRWYWx1ZShlbnRyeSwgJ0FjY291bnQuQWNjb3VudE5hbWUnKSxcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHBob25lID0gZW50cnkgJiYgZW50cnkuQ29udGFjdCAmJiBlbnRyeS5Db250YWN0LldvcmtQaG9uZSB8fCBlbnRyeSAmJiBlbnRyeS5BY2NvdW50ICYmIGVudHJ5LkFjY291bnQuTWFpblBob25lO1xyXG4gICAgaWYgKHBob25lKSB7XHJcbiAgICAgIGNvbnN0IHBob25lRmllbGQgPSB0aGlzLmZpZWxkcy5QaG9uZU51bWJlcjtcclxuICAgICAgcGhvbmVGaWVsZC5zZXRWYWx1ZShwaG9uZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhcHBseU9wcG9ydHVuaXR5Q29udGV4dDogZnVuY3Rpb24gYXBwbHlPcHBvcnR1bml0eUNvbnRleHQoY29udGV4dCkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KGNvbnRleHQuaWQpO1xyXG4gICAgY29uc3QgZW50cnkgPSBjb250ZXh0LmVudHJ5IHx8ICh2aWV3ICYmIHZpZXcuZW50cnkpO1xyXG5cclxuICAgIGlmICghZW50cnkgfHwgIWVudHJ5LiRrZXkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9wcG9ydHVuaXR5RmllbGQgPSB0aGlzLmZpZWxkcy5PcHBvcnR1bml0eTtcclxuICAgIG9wcG9ydHVuaXR5RmllbGQuc2V0U2VsZWN0aW9uKGVudHJ5KTtcclxuICAgIG9wcG9ydHVuaXR5RmllbGQuc2V0VmFsdWUoe1xyXG4gICAgICBPcHBvcnR1bml0eUlkOiBlbnRyeS4ka2V5LFxyXG4gICAgICBPcHBvcnR1bml0eU5hbWU6IGVudHJ5LiRkZXNjcmlwdG9yLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5vbkFjY291bnREZXBlbmRlbnRDaGFuZ2Uob3Bwb3J0dW5pdHlGaWVsZC5nZXRWYWx1ZSgpLCBvcHBvcnR1bml0eUZpZWxkKTtcclxuXHJcbiAgICBjb25zdCBhY2NvdW50RmllbGQgPSB0aGlzLmZpZWxkcy5BY2NvdW50O1xyXG4gICAgYWNjb3VudEZpZWxkLnNldFZhbHVlKHtcclxuICAgICAgQWNjb3VudElkOiB1dGlsaXR5LmdldFZhbHVlKGVudHJ5LCAnQWNjb3VudC4ka2V5JyksXHJcbiAgICAgIEFjY291bnROYW1lOiB1dGlsaXR5LmdldFZhbHVlKGVudHJ5LCAnQWNjb3VudC5BY2NvdW50TmFtZScpLFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGVudHJ5LkFjY291bnQgJiYgZW50cnkuQWNjb3VudC5NYWluUGhvbmUpIHtcclxuICAgICAgY29uc3QgcGhvbmVGaWVsZCA9IHRoaXMuZmllbGRzLlBob25lTnVtYmVyO1xyXG4gICAgICBwaG9uZUZpZWxkLnNldFZhbHVlKGVudHJ5LkFjY291bnQuTWFpblBob25lKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFwcGx5TGVhZENvbnRleHQ6IGZ1bmN0aW9uIGFwcGx5TGVhZENvbnRleHQoY29udGV4dCkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KGNvbnRleHQuaWQpO1xyXG4gICAgY29uc3QgZW50cnkgPSBjb250ZXh0LmVudHJ5IHx8ICh2aWV3ICYmIHZpZXcuZW50cnkpO1xyXG5cclxuICAgIGlmICghZW50cnkgfHwgIWVudHJ5LiRrZXkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxlYWRGaWVsZCA9IHRoaXMuZmllbGRzLkxlYWQ7XHJcbiAgICBsZWFkRmllbGQuc2V0U2VsZWN0aW9uKGVudHJ5KTtcclxuICAgIGxlYWRGaWVsZC5zZXRWYWx1ZSh7XHJcbiAgICAgIExlYWRJZDogZW50cnkuJGtleSxcclxuICAgICAgTGVhZE5hbWU6IGVudHJ5LiRkZXNjcmlwdG9yLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLm9uTGVhZENoYW5nZShsZWFkRmllbGQuZ2V0VmFsdWUoKSwgbGVhZEZpZWxkKTtcclxuXHJcbiAgICB0aGlzLmZpZWxkcy5BY2NvdW50TmFtZS5zZXRWYWx1ZShlbnRyeS5Db21wYW55KTtcclxuXHJcbiAgICBjb25zdCBpc0xlYWRGaWVsZCA9IHRoaXMuZmllbGRzLklzTGVhZDtcclxuICAgIGlzTGVhZEZpZWxkLnNldFZhbHVlKGNvbnRleHQucmVzb3VyY2VLaW5kID09PSAnbGVhZHMnKTtcclxuICAgIHRoaXMub25Jc0xlYWRDaGFuZ2UoaXNMZWFkRmllbGQuZ2V0VmFsdWUoKSwgaXNMZWFkRmllbGQpO1xyXG5cclxuICAgIGlmIChlbnRyeS5Xb3JrUGhvbmUpIHtcclxuICAgICAgY29uc3QgcGhvbmVGaWVsZCA9IHRoaXMuZmllbGRzLlBob25lTnVtYmVyO1xyXG4gICAgICBwaG9uZUZpZWxkLnNldFZhbHVlKGVudHJ5LldvcmtQaG9uZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBzZXRWYWx1ZXM6IGZ1bmN0aW9uIHNldFZhbHVlcyh2YWx1ZXMpIHtcclxuICAgIGlmICh2YWx1ZXMuU3RhcnREYXRlICYmIHZhbHVlcy5BbGFybVRpbWUpIHtcclxuICAgICAgY29uc3Qgc3RhcnRUaW1lID0gKHRoaXMuaXNEYXRlVGltZWxlc3ModmFsdWVzLlN0YXJ0RGF0ZSkpID8gbW9tZW50KHZhbHVlcy5TdGFydERhdGUpXHJcbiAgICAgICAgLmFkZCh7XHJcbiAgICAgICAgICBtaW51dGVzOiB2YWx1ZXMuU3RhcnREYXRlLmdldFRpbWV6b25lT2Zmc2V0KCksXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudG9EYXRlKClcclxuICAgICAgICAuZ2V0VGltZSgpIDogdmFsdWVzLlN0YXJ0RGF0ZS5nZXRUaW1lKCk7XHJcblxyXG4gICAgICBjb25zdCBzcGFuID0gc3RhcnRUaW1lIC0gdmFsdWVzLkFsYXJtVGltZS5nZXRUaW1lKCk7IC8vIG1zXHJcbiAgICAgIGNvbnN0IHJlbWluZGVyID0gc3BhbiAvICgxMDAwICogNjApO1xyXG5cclxuICAgICAgdmFsdWVzLlJlbWluZGVyID0gZm9ybWF0LmZpeGVkKHJlbWluZGVyLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG5cclxuICAgIHRoaXMuZW5hYmxlRmllbGRzKCk7XHJcblxyXG4gICAgaWYgKHZhbHVlcy5UaW1lbGVzcykge1xyXG4gICAgICB0aGlzLmZpZWxkcy5EdXJhdGlvbi5kaXNhYmxlKCk7XHJcbiAgICAgIHRoaXMuZmllbGRzLlJvbGxvdmVyLmVuYWJsZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5maWVsZHMuRHVyYXRpb24uZW5hYmxlKCk7XHJcbiAgICAgIHRoaXMuZmllbGRzLlJvbGxvdmVyLmRpc2FibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodmFsdWVzLkFsYXJtKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLlJlbWluZGVyLmVuYWJsZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5maWVsZHMuUmVtaW5kZXIuZGlzYWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmlzSW5MZWFkQ29udGV4dCgpKSB7XHJcbiAgICAgIGNvbnN0IGlzTGVhZEZpZWxkID0gdGhpcy5maWVsZHMuSXNMZWFkO1xyXG4gICAgICBpc0xlYWRGaWVsZC5zZXRWYWx1ZSh0cnVlKTtcclxuICAgICAgdGhpcy5vbklzTGVhZENoYW5nZShpc0xlYWRGaWVsZC5nZXRWYWx1ZSgpLCBpc0xlYWRGaWVsZCk7XHJcbiAgICAgIHRoaXMuZmllbGRzLkxlYWQuc2V0VmFsdWUodmFsdWVzLCB0cnVlKTtcclxuICAgICAgdGhpcy5maWVsZHMuQWNjb3VudE5hbWUuc2V0VmFsdWUodmFsdWVzLkFjY291bnROYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMub3B0aW9ucy5lbnRyeSB8fCB0aGlzLmVudHJ5O1xyXG4gICAgY29uc3QgZGVueUVkaXQgPSAhdGhpcy5vcHRpb25zLmluc2VydCAmJiAhdGhpcy5jdXJyZW50VXNlckNhbkVkaXQoZW50cnkpO1xyXG4gICAgY29uc3QgYWxsb3dTZXRBbGFybSA9ICFkZW55RWRpdCB8fCB0aGlzLmN1cnJlbnRVc2VyQ2FuU2V0QWxhcm0oZW50cnkpO1xyXG5cclxuICAgIGlmIChkZW55RWRpdCkge1xyXG4gICAgICB0aGlzLmRpc2FibGVGaWVsZHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYWxsb3dTZXRBbGFybSkge1xyXG4gICAgICB0aGlzLmVuYWJsZUZpZWxkcygoZikgPT4ge1xyXG4gICAgICAgIGlmICh2YWx1ZXMuQWxhcm0pIHtcclxuICAgICAgICAgIHJldHVybiAoL15BbGFybXxSZW1pbmRlciQvKVxyXG4gICAgICAgICAgICAudGVzdChmLm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKC9eQWxhcm0kLylcclxuICAgICAgICAgIC50ZXN0KGYubmFtZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVjdXJyZW5jZS5TdGFydERhdGUgPSBhcmdvcy5Db252ZXJ0LnRvRGF0ZUZyb21TdHJpbmcodmFsdWVzLlN0YXJ0RGF0ZSk7IC8vIFRPRE86IEF2b2lkIGdsb2JhbFxyXG4gICAgdGhpcy5yZXNldFJlY3VycmVuY2UodmFsdWVzKTtcclxuICAgIHRoaXMub25TdGFydERhdGVDaGFuZ2UodGhpcy5maWVsZHMuU3RhcnREYXRlLmdldFZhbHVlKCksIHRoaXMuZmllbGRzLlN0YXJ0RGF0ZSk7XHJcbiAgICBpZiAodGhpcy5pc0FjdGl2aXR5UmVjdXJyaW5nKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLkVuZERhdGUuaGlkZSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgaXNEYXRlVGltZWxlc3M6IGZ1bmN0aW9uIGlzRGF0ZVRpbWVsZXNzKGRhdGUpIHtcclxuICAgIGlmICghZGF0ZSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoZGF0ZS5nZXRVVENIb3VycygpICE9PSAwKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChkYXRlLmdldFVUQ01pbnV0ZXMoKSAhPT0gMCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoZGF0ZS5nZXRVVENTZWNvbmRzKCkgIT09IDUpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0sXHJcbiAgaXNEYXRlVGltZWxlc3NMb2NhbDogZnVuY3Rpb24gaXNEYXRlVGltZWxlc3NMb2NhbChkYXRlKSB7XHJcbiAgICBpZiAoIWRhdGUpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGRhdGUuZ2V0SG91cnMoKSAhPT0gMCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoZGF0ZS5nZXRNaW51dGVzKCkgIT09IDApIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGRhdGUuZ2V0U2Vjb25kcygpICE9PSA1KSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9LFxyXG4gIGdldFZhbHVlczogZnVuY3Rpb24gZ2V0VmFsdWVzKCkge1xyXG4gICAgY29uc3QgaXNTdGFydERhdGVEaXJ0eSA9IHRoaXMuZmllbGRzLlN0YXJ0RGF0ZS5pc0RpcnR5KCk7XHJcbiAgICBjb25zdCBpc1JlbWluZGVyRGlydHkgPSB0aGlzLmZpZWxkcy5SZW1pbmRlci5pc0RpcnR5KCk7XHJcbiAgICBjb25zdCByZW1pbmRlckluID0gdGhpcy5maWVsZHMuUmVtaW5kZXIuZ2V0VmFsdWUoKTtcclxuICAgIGNvbnN0IHRpbWVsZXNzID0gdGhpcy5maWVsZHMuVGltZWxlc3MuZ2V0VmFsdWUoKTtcclxuICAgIGxldCBzdGFydERhdGUgPSB0aGlzLmZpZWxkcy5TdGFydERhdGUuZ2V0VmFsdWUoKTtcclxuICAgIGxldCB2YWx1ZXMgPSB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG5cclxuICAgIC8vIEZpeCB0aW1lbGVzcyBpZiBuZWNlc3NhcnkgKFRoZSBkYXRlIHBpY2tlciB3b24ndCBhZGQgNSBzZWNvbmRzKVxyXG4gICAgaWYgKHRpbWVsZXNzKSB7XHJcbiAgICAgIHZhbHVlcy5TdGFydERhdGUgPSBzdGFydERhdGUgPSB0aGlzLl9nZXROZXdTdGFydERhdGUoc3RhcnREYXRlLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiBTdGFydERhdGUgaXMgZGlydHksIGFsd2F5cyB1cGRhdGUgQWxhcm1UaW1lXHJcbiAgICBpZiAoc3RhcnREYXRlICYmIChpc1N0YXJ0RGF0ZURpcnR5IHx8IGlzUmVtaW5kZXJEaXJ0eSkpIHtcclxuICAgICAgdmFsdWVzID0gdmFsdWVzIHx8IHt9O1xyXG4gICAgICBjb25zdCBhbGFybVRpbWUgPSB0aGlzLl9nZXROZXdBbGFybVRpbWUoc3RhcnREYXRlLCB0aW1lbGVzcywgcmVtaW5kZXJJbik7XHJcbiAgICAgIHZhbHVlcy5BbGFybVRpbWUgPSBhbGFybVRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHZhbHVlcztcclxuICB9LFxyXG4gIGNyZWF0ZVJlbWluZGVyRGF0YTogZnVuY3Rpb24gY3JlYXRlUmVtaW5kZXJEYXRhKCkge1xyXG4gICAgY29uc3QgbGlzdCA9IFtdO1xyXG5cclxuICAgIGZvciAoY29uc3QgZHVyYXRpb24gaW4gdGhpcy5yZW1pbmRlclZhbHVlVGV4dCkge1xyXG4gICAgICBpZiAodGhpcy5yZW1pbmRlclZhbHVlVGV4dC5oYXNPd25Qcm9wZXJ0eShkdXJhdGlvbikpIHtcclxuICAgICAgICBsaXN0LnB1c2goe1xyXG4gICAgICAgICAgJGtleTogZHVyYXRpb24sXHJcbiAgICAgICAgICAkZGVzY3JpcHRvcjogdGhpcy5yZW1pbmRlclZhbHVlVGV4dFtkdXJhdGlvbl0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAkcmVzb3VyY2VzOiBsaXN0LFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGNyZWF0ZUR1cmF0aW9uRGF0YTogZnVuY3Rpb24gY3JlYXRlRHVyYXRpb25EYXRhKCkge1xyXG4gICAgY29uc3QgbGlzdCA9IFtdO1xyXG5cclxuICAgIGZvciAoY29uc3QgZHVyYXRpb24gaW4gdGhpcy5kdXJhdGlvblZhbHVlVGV4dCkge1xyXG4gICAgICBpZiAodGhpcy5kdXJhdGlvblZhbHVlVGV4dC5oYXNPd25Qcm9wZXJ0eShkdXJhdGlvbikpIHtcclxuICAgICAgICBsaXN0LnB1c2goe1xyXG4gICAgICAgICAgJGtleTogZHVyYXRpb24sXHJcbiAgICAgICAgICAkZGVzY3JpcHRvcjogdGhpcy5kdXJhdGlvblZhbHVlVGV4dFtkdXJhdGlvbl0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAkcmVzb3VyY2VzOiBsaXN0LFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGNyZWF0ZVJlY3VycmluZ0RhdGE6IGZ1bmN0aW9uIGNyZWF0ZVJlY3VycmluZ0RhdGEoKSB7XHJcbiAgICByZXR1cm4gcmVjdXIuY3JlYXRlU2ltcGxpZmllZE9wdGlvbnModGhpcy5maWVsZHMuU3RhcnREYXRlLmdldFZhbHVlKCkpO1xyXG4gIH0sXHJcbiAgZm9ybWF0RGVwZW5kZW50UXVlcnk6IGZ1bmN0aW9uIGZvcm1hdERlcGVuZGVudFF1ZXJ5KGRlcGVuZGVudFZhbHVlLCB0aGVGb3JtYXQsIHByb3BlcnR5KSB7XHJcbiAgICByZXR1cm4gc3RyaW5nLnN1YnN0aXR1dGUodGhlRm9ybWF0LCBbdXRpbGl0eS5nZXRWYWx1ZShkZXBlbmRlbnRWYWx1ZSwgcHJvcGVydHkgfHwgJyRrZXknKV0pO1xyXG4gIH0sXHJcbiAgX2dldE5ld1N0YXJ0RGF0ZTogZnVuY3Rpb24gX2dldE5ld1N0YXJ0RGF0ZShvcmdpbmFsU3RhcnREYXRlLCB0aW1lbGVzcykge1xyXG4gICAgaWYgKCFvcmdpbmFsU3RhcnREYXRlKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBzdGFydERhdGUgPSBvcmdpbmFsU3RhcnREYXRlO1xyXG4gICAgY29uc3QgaXNUaW1lTGVzc0RhdGUgPSB0aGlzLmlzRGF0ZVRpbWVsZXNzKHN0YXJ0RGF0ZSkgfHwgdGhpcy5pc0RhdGVUaW1lbGVzc0xvY2FsKHN0YXJ0RGF0ZSk7XHJcblxyXG4gICAgaWYgKHRpbWVsZXNzKSB7XHJcbiAgICAgIGlmICghaXNUaW1lTGVzc0RhdGUpIHtcclxuICAgICAgICBsZXQgd3JhcHBlZCA9IG1vbWVudChzdGFydERhdGUpO1xyXG4gICAgICAgIHdyYXBwZWQgPSBtb21lbnQudXRjKHdyYXBwZWQuZm9ybWF0KCdZWVlZLU1NLUREJyksICdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgd3JhcHBlZC5hZGQoJ3NlY29uZHMnLCA1KTtcclxuICAgICAgICBzdGFydERhdGUgPSB3cmFwcGVkLnRvRGF0ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoaXNUaW1lTGVzc0RhdGUpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IG1vbWVudCgpO1xyXG4gICAgICAgIGNvbnN0IHdyYXBwZWQgPSBtb21lbnQoc3RhcnREYXRlKTtcclxuICAgICAgICB3cmFwcGVkLnN1YnRyYWN0KHtcclxuICAgICAgICAgIG1pbnV0ZXM6IHdyYXBwZWQudXRjT2Zmc2V0KCksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgd3JhcHBlZC5ob3VycyhjdXJyZW50VGltZS5ob3VycygpKTtcclxuICAgICAgICB3cmFwcGVkLm1pbnV0ZXMoY3VycmVudFRpbWUubWludXRlcygpKTtcclxuICAgICAgICB3cmFwcGVkLnNlY29uZHMoMCk7XHJcbiAgICAgICAgc3RhcnREYXRlID0gd3JhcHBlZC50b0RhdGUoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdGFydERhdGU7XHJcbiAgfSxcclxuICBfZ2V0TmV3QWxhcm1UaW1lOiBmdW5jdGlvbiBfZ2V0TmV3QWxhcm1UaW1lKHN0YXJ0RGF0ZSwgdGltZWxlc3MsIHJlbWluZGVySW4pIHtcclxuICAgIGxldCBhbGFybVRpbWU7XHJcbiAgICBpZiAoIXN0YXJ0RGF0ZSkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGltZWxlc3MpIHtcclxuICAgICAgY29uc3Qgd3JhcHBlZCA9IG1vbWVudChzdGFydERhdGUpO1xyXG4gICAgICB3cmFwcGVkLnN1YnRyYWN0KHtcclxuICAgICAgICBtaW51dGVzOiB3cmFwcGVkLnV0Y09mZnNldCgpLFxyXG4gICAgICB9KTtcclxuICAgICAgd3JhcHBlZC5ob3VycygyNCk7XHJcbiAgICAgIHdyYXBwZWQubWludXRlcygwKTtcclxuICAgICAgd3JhcHBlZC5zZWNvbmRzKDApO1xyXG4gICAgICBhbGFybVRpbWUgPSB3cmFwcGVkLnRvRGF0ZSgpO1xyXG4gICAgICBhbGFybVRpbWUgPSBtb21lbnQoYWxhcm1UaW1lKVxyXG4gICAgICAgIC5jbG9uZSgpXHJcbiAgICAgICAgLmFkZCh7XHJcbiAgICAgICAgICBkYXlzOiAtMSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5hZGQoe1xyXG4gICAgICAgICAgbWludXRlczogLTEgKiByZW1pbmRlckluLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRvRGF0ZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxhcm1UaW1lID0gbW9tZW50KHN0YXJ0RGF0ZSlcclxuICAgICAgICAuY2xvbmUoKVxyXG4gICAgICAgIC5hZGQoe1xyXG4gICAgICAgICAgbWludXRlczogLTEgKiByZW1pbmRlckluLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRvRGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhbGFybVRpbWU7XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICBuYW1lOiAnVHlwZScsXHJcbiAgICAgIHByb3BlcnR5OiAnVHlwZScsXHJcbiAgICAgIHR5cGU6ICdoaWRkZW4nLFxyXG4gICAgfSwge1xyXG4gICAgICBkZXBlbmRzT246ICdUeXBlJyxcclxuICAgICAgbGFiZWw6IHRoaXMucmVnYXJkaW5nVGV4dCxcclxuICAgICAgbmFtZTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgcHJvcGVydHk6ICdEZXNjcmlwdGlvbicsXHJcbiAgICAgIHBpY2tsaXN0OiB0aGlzLmZvcm1hdFBpY2tsaXN0Rm9yVHlwZS5iaW5kRGVsZWdhdGUodGhpcywgJ0Rlc2NyaXB0aW9uJyksXHJcbiAgICAgIHRpdGxlOiB0aGlzLmFjdGl2aXR5RGVzY3JpcHRpb25UaXRsZVRleHQsXHJcbiAgICAgIG9yZGVyQnk6ICd0ZXh0IGFzYycsXHJcbiAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICAgIG1heFRleHRMZW5ndGg6IDY0LFxyXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgICAgYXV0b0ZvY3VzOiB0cnVlLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5sb25nTm90ZXNUZXh0LFxyXG4gICAgICBub3RlUHJvcGVydHk6IGZhbHNlLFxyXG4gICAgICBuYW1lOiAnTG9uZ05vdGVzJyxcclxuICAgICAgcHJvcGVydHk6ICdMb25nTm90ZXMnLFxyXG4gICAgICB0aXRsZTogdGhpcy5sb25nTm90ZXNUaXRsZVRleHQsXHJcbiAgICAgIHR5cGU6ICdub3RlJyxcclxuICAgICAgdmlldzogJ3RleHRfZWRpdCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdMb2NhdGlvbicsXHJcbiAgICAgIHByb3BlcnR5OiAnTG9jYXRpb24nLFxyXG4gICAgICBsYWJlbDogdGhpcy5sb2NhdGlvblRleHQsXHJcbiAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgbWF4VGV4dExlbmd0aDogMjU1LFxyXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMucHJpb3JpdHlUZXh0LFxyXG4gICAgICBuYW1lOiAnUHJpb3JpdHknLFxyXG4gICAgICBwcm9wZXJ0eTogJ1ByaW9yaXR5JyxcclxuICAgICAgcGlja2xpc3Q6ICdQcmlvcml0aWVzJyxcclxuICAgICAgdGl0bGU6IHRoaXMucHJpb3JpdHlUaXRsZVRleHQsXHJcbiAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICAgIG1heFRleHRMZW5ndGg6IDY0LFxyXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgIH0sIHtcclxuICAgICAgZGVwZW5kc09uOiAnVHlwZScsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmNhdGVnb3J5VGV4dCxcclxuICAgICAgbmFtZTogJ0NhdGVnb3J5JyxcclxuICAgICAgcHJvcGVydHk6ICdDYXRlZ29yeScsXHJcbiAgICAgIHBpY2tsaXN0OiB0aGlzLmZvcm1hdFBpY2tsaXN0Rm9yVHlwZS5iaW5kRGVsZWdhdGUodGhpcywgJ0NhdGVnb3J5JyksXHJcbiAgICAgIG9yZGVyQnk6ICd0ZXh0IGFzYycsXHJcbiAgICAgIHRpdGxlOiB0aGlzLmFjdGl2aXR5Q2F0ZWdvcnlUaXRsZVRleHQsXHJcbiAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICAgIG1heFRleHRMZW5ndGg6IDY0LFxyXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMuc3RhcnRpbmdUZXh0LFxyXG4gICAgICBuYW1lOiAnU3RhcnREYXRlJyxcclxuICAgICAgcHJvcGVydHk6ICdTdGFydERhdGUnLFxyXG4gICAgICB0eXBlOiAnZGF0ZScsXHJcbiAgICAgIHRpbWVsZXNzOiBmYWxzZSxcclxuICAgICAgc2hvd1RpbWVQaWNrZXI6IHRydWUsXHJcbiAgICAgIHNob3dSZWxhdGl2ZURhdGVUaW1lOiB0cnVlLFxyXG4gICAgICBkYXRlRm9ybWF0VGV4dDogKEFwcC5pczI0SG91ckNsb2NrKCkpID8gdGhpcy5zdGFydGluZ0Zvcm1hdFRleHQyNCA6IHRoaXMuc3RhcnRpbmdGb3JtYXRUZXh0LFxyXG4gICAgICBtaW5WYWx1ZTogKG5ldyBEYXRlKDE5MDAsIDAsIDEpKSxcclxuICAgICAgdmFsaWRhdG9yOiBbXHJcbiAgICAgICAgdmFsaWRhdG9yLmV4aXN0cyxcclxuICAgICAgICB2YWxpZGF0b3IuaXNEYXRlSW5SYW5nZSxcclxuICAgICAgXSxcclxuICAgIH0sIHtcclxuICAgICAgdHlwZTogJ2RhdGUnLFxyXG4gICAgICBuYW1lOiAnRW5kRGF0ZScsXHJcbiAgICAgIHByb3BlcnR5OiAnRW5kRGF0ZScsXHJcbiAgICAgIHNob3dSZWxhdGl2ZURhdGVUaW1lOiB0cnVlLFxyXG4gICAgICBpbmNsdWRlOiB0cnVlLFxyXG4gICAgfSwge1xyXG4gICAgICBkZXBlbmRzT246ICdTdGFydERhdGUnLFxyXG4gICAgICBsYWJlbDogdGhpcy5yZXBlYXRzVGV4dCxcclxuICAgICAgdGl0bGU6IHRoaXMucmVjdXJyaW5nVGl0bGVUZXh0LFxyXG4gICAgICBuYW1lOiAnUmVjdXJyZW5jZVVJJyxcclxuICAgICAgcHJvcGVydHk6ICdSZWN1cnJlbmNlVUknLFxyXG4gICAgICB0eXBlOiAnc2VsZWN0JyxcclxuICAgICAgdmlldzogJ3NlbGVjdF9saXN0JyxcclxuICAgICAgZGF0YTogdGhpcy5jcmVhdGVSZWN1cnJpbmdEYXRhLmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgICAgZXhjbHVkZTogdHJ1ZSxcclxuICAgIH0sIHtcclxuICAgICAgZGVwZW5kc09uOiAnUmVjdXJyZW5jZVVJJyxcclxuICAgICAgbGFiZWw6IHRoaXMucmVjdXJyaW5nVGV4dCxcclxuICAgICAgbmFtZTogJ1JlY3VycmVuY2UnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1JlY3VycmVuY2UnLFxyXG4gICAgICB0eXBlOiAncmVjdXJyZW5jZXMnLFxyXG4gICAgICBhcHBseVRvOiAnLicsXHJcbiAgICAgIHZpZXc6ICdyZWN1cnJlbmNlX2VkaXQnLFxyXG4gICAgICBleGNsdWRlOiB0cnVlLFxyXG4gICAgICBmb3JtYXRWYWx1ZTogdGhpcy5mb3JtYXRSZWN1cnJlbmNlLmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgIH0sIHtcclxuICAgICAgdHlwZTogJ2hpZGRlbicsXHJcbiAgICAgIG5hbWU6ICdSZWN1clBlcmlvZCcsXHJcbiAgICAgIHByb3BlcnR5OiAnUmVjdXJQZXJpb2QnLFxyXG4gICAgICBpbmNsdWRlOiB0cnVlLFxyXG4gICAgfSwge1xyXG4gICAgICB0eXBlOiAnaGlkZGVuJyxcclxuICAgICAgbmFtZTogJ1JlY3VyUGVyaW9kU3BlYycsXHJcbiAgICAgIHByb3BlcnR5OiAnUmVjdXJQZXJpb2RTcGVjJyxcclxuICAgICAgaW5jbHVkZTogdHJ1ZSxcclxuICAgIH0sIHtcclxuICAgICAgdHlwZTogJ2hpZGRlbicsXHJcbiAgICAgIG5hbWU6ICdSZWN1cnJlbmNlU3RhdGUnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1JlY3VycmVuY2VTdGF0ZScsXHJcbiAgICAgIGluY2x1ZGU6IHRydWUsXHJcbiAgICB9LCB7XHJcbiAgICAgIHR5cGU6ICdoaWRkZW4nLFxyXG4gICAgICBuYW1lOiAnUmVjdXJyaW5nJyxcclxuICAgICAgcHJvcGVydHk6ICdSZWN1cnJpbmcnLFxyXG4gICAgICBpbmNsdWRlOiB0cnVlLFxyXG4gICAgfSwge1xyXG4gICAgICB0eXBlOiAnaGlkZGVuJyxcclxuICAgICAgbmFtZTogJ1JlY3VySXRlcmF0aW9ucycsXHJcbiAgICAgIHByb3BlcnR5OiAnUmVjdXJJdGVyYXRpb25zJyxcclxuICAgICAgaW5jbHVkZTogdHJ1ZSxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMudGltZWxlc3NUZXh0LFxyXG4gICAgICBuYW1lOiAnVGltZWxlc3MnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1RpbWVsZXNzJyxcclxuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5kdXJhdGlvblRleHQsXHJcbiAgICAgIHRpdGxlOiB0aGlzLmR1cmF0aW9uVGl0bGVUZXh0LFxyXG4gICAgICBuYW1lOiAnRHVyYXRpb24nLFxyXG4gICAgICBwcm9wZXJ0eTogJ0R1cmF0aW9uJyxcclxuICAgICAgdHlwZTogJ2R1cmF0aW9uJyxcclxuICAgICAgdmlldzogJ3NlbGVjdF9saXN0JyxcclxuICAgICAgZGF0YTogdGhpcy5jcmVhdGVEdXJhdGlvbkRhdGEoKSxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ0FsYXJtJyxcclxuICAgICAgcHJvcGVydHk6ICdBbGFybScsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmFsYXJtVGV4dCxcclxuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5yZW1pbmRlclRleHQsXHJcbiAgICAgIHRpdGxlOiB0aGlzLnJlbWluZGVyVGl0bGVUZXh0LFxyXG4gICAgICBpbmNsdWRlOiBmYWxzZSxcclxuICAgICAgbmFtZTogJ1JlbWluZGVyJyxcclxuICAgICAgcHJvcGVydHk6ICdSZW1pbmRlcicsXHJcbiAgICAgIHR5cGU6ICdkdXJhdGlvbicsXHJcbiAgICAgIHZpZXc6ICdzZWxlY3RfbGlzdCcsXHJcbiAgICAgIGRhdGE6IHRoaXMuY3JlYXRlUmVtaW5kZXJEYXRhKCksXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLnJvbGxvdmVyVGV4dCxcclxuICAgICAgbmFtZTogJ1JvbGxvdmVyJyxcclxuICAgICAgcHJvcGVydHk6ICdSb2xsb3ZlcicsXHJcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcclxuICAgIH0sIHtcclxuICAgICAgdHlwZTogJ2hpZGRlbicsXHJcbiAgICAgIG5hbWU6ICdVc2VySWQnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1VzZXJJZCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLmxlYWRlclRleHQsXHJcbiAgICAgIG5hbWU6ICdMZWFkZXInLFxyXG4gICAgICBwcm9wZXJ0eTogJ0xlYWRlcicsXHJcbiAgICAgIGluY2x1ZGU6IHRydWUsXHJcbiAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICByZXF1aXJlU2VsZWN0aW9uOiB0cnVlLFxyXG4gICAgICB2aWV3OiAnY2FsZW5kYXJfYWNjZXNzX2xpc3QnLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5pc0xlYWRUZXh0LFxyXG4gICAgICBuYW1lOiAnSXNMZWFkJyxcclxuICAgICAgcHJvcGVydHk6ICdJc0xlYWQnLFxyXG4gICAgICBpbmNsdWRlOiBmYWxzZSxcclxuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxyXG4gICAgICBvblRleHQ6IHRoaXMueWVzVGV4dCxcclxuICAgICAgb2ZmVGV4dDogdGhpcy5ub1RleHQsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLmFjY291bnRUZXh0LFxyXG4gICAgICBuYW1lOiAnQWNjb3VudCcsXHJcbiAgICAgIHByb3BlcnR5OiAnQWNjb3VudCcsXHJcbiAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICBhcHBseVRvOiAnLicsXHJcbiAgICAgIHZhbHVlS2V5UHJvcGVydHk6ICdBY2NvdW50SWQnLFxyXG4gICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ0FjY291bnROYW1lJyxcclxuICAgICAgdmlldzogJ2FjY291bnRfcmVsYXRlZCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIGRlcGVuZHNPbjogJ0FjY291bnQnLFxyXG4gICAgICBsYWJlbDogdGhpcy5jb250YWN0VGV4dCxcclxuICAgICAgbmFtZTogJ0NvbnRhY3QnLFxyXG4gICAgICBwcm9wZXJ0eTogJ0NvbnRhY3QnLFxyXG4gICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgYXBwbHlUbzogZnVuY3Rpb24gYXBwbHlUbyhwYXlsb2FkLCB2YWx1ZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgcGF5bG9hZFt0aGlzLnZhbHVlS2V5UHJvcGVydHldID0gbnVsbDtcclxuICAgICAgICAgIHBheWxvYWRbdGhpcy52YWx1ZVRleHRQcm9wZXJ0eV0gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgdmFsdWVLZXlQcm9wZXJ0eTogJ0NvbnRhY3RJZCcsXHJcbiAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnQ29udGFjdE5hbWUnLFxyXG4gICAgICB2aWV3OiAnY29udGFjdF9yZWxhdGVkJyxcclxuICAgICAgd2hlcmU6IHRoaXMuZm9ybWF0RGVwZW5kZW50UXVlcnkuYmluZERlbGVnYXRlKFxyXG4gICAgICAgIHRoaXMsICdBY2NvdW50LklkIGVxIFwiJHswfVwiJywgJ0FjY291bnRJZCdcclxuICAgICAgKSxcclxuICAgIH0sIHtcclxuICAgICAgZGVwZW5kc09uOiAnQWNjb3VudCcsXHJcbiAgICAgIGxhYmVsOiB0aGlzLm9wcG9ydHVuaXR5VGV4dCxcclxuICAgICAgbmFtZTogJ09wcG9ydHVuaXR5JyxcclxuICAgICAgcHJvcGVydHk6ICdPcHBvcnR1bml0eScsXHJcbiAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICBhcHBseVRvOiBmdW5jdGlvbiBhcHBseVRvKHBheWxvYWQsIHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgICAgICBwYXlsb2FkW3RoaXMudmFsdWVLZXlQcm9wZXJ0eV0gPSBudWxsO1xyXG4gICAgICAgICAgcGF5bG9hZFt0aGlzLnZhbHVlVGV4dFByb3BlcnR5XSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICB2YWx1ZUtleVByb3BlcnR5OiAnT3Bwb3J0dW5pdHlJZCcsXHJcbiAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnT3Bwb3J0dW5pdHlOYW1lJyxcclxuICAgICAgdmlldzogJ29wcG9ydHVuaXR5X3JlbGF0ZWQnLFxyXG4gICAgICB3aGVyZTogdGhpcy5mb3JtYXREZXBlbmRlbnRRdWVyeS5iaW5kRGVsZWdhdGUoXHJcbiAgICAgICAgdGhpcywgJ0FjY291bnQuSWQgZXEgXCIkezB9XCInLCAnQWNjb3VudElkJ1xyXG4gICAgICApLFxyXG4gICAgfSwge1xyXG4gICAgICBkZXBlbmRzT246ICdBY2NvdW50JyxcclxuICAgICAgbGFiZWw6IHRoaXMudGlja2V0TnVtYmVyVGV4dCxcclxuICAgICAgbmFtZTogJ1RpY2tldCcsXHJcbiAgICAgIHByb3BlcnR5OiAnVGlja2V0JyxcclxuICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgIGFwcGx5VG86IGZ1bmN0aW9uIGFwcGx5VG8ocGF5bG9hZCwgdmFsdWUpIHtcclxuICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgICAgIHBheWxvYWRbdGhpcy52YWx1ZUtleVByb3BlcnR5XSA9IG51bGw7XHJcbiAgICAgICAgICBwYXlsb2FkW3RoaXMudmFsdWVUZXh0UHJvcGVydHldID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHZhbHVlS2V5UHJvcGVydHk6ICdUaWNrZXRJZCcsXHJcbiAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnVGlja2V0TnVtYmVyJyxcclxuICAgICAgdmlldzogJ3RpY2tldF9yZWxhdGVkJyxcclxuICAgICAgd2hlcmU6IHRoaXMuZm9ybWF0RGVwZW5kZW50UXVlcnkuYmluZERlbGVnYXRlKFxyXG4gICAgICAgIHRoaXMsICdBY2NvdW50LklkIGVxIFwiJHswfVwiJywgJ0FjY291bnRJZCdcclxuICAgICAgKSxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMubGVhZFRleHQsXHJcbiAgICAgIG5hbWU6ICdMZWFkJyxcclxuICAgICAgcHJvcGVydHk6ICdMZWFkJyxcclxuICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgIGFwcGx5VG86ICcuJyxcclxuICAgICAgdmFsdWVLZXlQcm9wZXJ0eTogJ0xlYWRJZCcsXHJcbiAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnTGVhZE5hbWUnLFxyXG4gICAgICB2aWV3OiAnbGVhZF9yZWxhdGVkJyxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMuY29tcGFueVRleHQsXHJcbiAgICAgIG5hbWU6ICdBY2NvdW50TmFtZScsXHJcbiAgICAgIHByb3BlcnR5OiAnQWNjb3VudE5hbWUnLFxyXG4gICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdQaG9uZU51bWJlcicsXHJcbiAgICAgIHByb3BlcnR5OiAnUGhvbmVOdW1iZXInLFxyXG4gICAgICBsYWJlbDogdGhpcy5waG9uZVRleHQsXHJcbiAgICAgIHR5cGU6ICdwaG9uZScsXHJcbiAgICAgIG1heFRleHRMZW5ndGg6IDMyLFxyXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgIH1dKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==