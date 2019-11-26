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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BY3Rpdml0eS9FZGl0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiZHRGb3JtYXRSZXNvdXJjZSIsIl9fY2xhc3MiLCJhY3Rpdml0eUNhdGVnb3J5VGl0bGVUZXh0IiwiYWN0aXZpdHlEZXNjcmlwdGlvblRpdGxlVGV4dCIsImxvY2F0aW9uVGV4dCIsImFjdGl2aXR5VHlwZVRpdGxlVGV4dCIsImFsYXJtVGV4dCIsInJlbWluZGVyVGV4dCIsImNhdGVnb3J5VGV4dCIsImR1cmF0aW9uVGV4dCIsImR1cmF0aW9uVGl0bGVUZXh0IiwiZHVyYXRpb25JbnZhbGlkVGV4dCIsInJlbWluZGVySW52YWxpZFRleHQiLCJyZW1pbmRlclRpdGxlVGV4dCIsImxlYWRlclRleHQiLCJsb25nTm90ZXNUZXh0IiwibG9uZ05vdGVzVGl0bGVUZXh0IiwicHJpb3JpdHlUZXh0IiwicHJpb3JpdHlUaXRsZVRleHQiLCJyZWdhcmRpbmdUZXh0Iiwicm9sbG92ZXJUZXh0Iiwic3RhcnRpbmdUZXh0Iiwic3RhcnRpbmdGb3JtYXRUZXh0Iiwic3RhcnRpbmdGb3JtYXRUZXh0MjQiLCJzdGFydGluZ1RpbWVsZXNzRm9ybWF0VGV4dCIsInJlcGVhdHNUZXh0IiwicmVjdXJyaW5nVGV4dCIsInJlY3VycmluZ1RpdGxlVGV4dCIsInRpbWVsZXNzVGV4dCIsInRpdGxlVGV4dCIsInR5cGVUZXh0IiwiYWNjb3VudFRleHQiLCJjb250YWN0VGV4dCIsIm9wcG9ydHVuaXR5VGV4dCIsInRpY2tldE51bWJlclRleHQiLCJjb21wYW55VGV4dCIsImxlYWRUZXh0IiwiaXNMZWFkVGV4dCIsInllc1RleHQiLCJub1RleHQiLCJwaG9uZVRleHQiLCJ1cGRhdGVVc2VyQWN0RXJyb3JUZXh0IiwicmVtaW5kZXJWYWx1ZVRleHQiLCJub25lVGV4dCIsImZpdmVNaW5UZXh0IiwicXVhcnRlckhvdXJUZXh0IiwiaGFsZkhvdXJUZXh0IiwiaG91clRleHQiLCJkYXlUZXh0IiwiZHVyYXRpb25WYWx1ZVRleHQiLCJob3VyQW5kSGFsZlRleHQiLCJ0d29Ib3Vyc1RleHQiLCJST1VORF9NSU5VVEVTIiwiaWQiLCJkZXRhaWxWaWV3IiwiZmllbGRzRm9yTGVhZHMiLCJmaWVsZHNGb3JTdGFuZGFyZCIsInBpY2tsaXN0c0J5VHlwZSIsImF0QXBwb2ludG1lbnQiLCJDYXRlZ29yeSIsIkRlc2NyaXB0aW9uIiwiYXRMaXRlcmF0dXJlIiwiYXRQZXJzb25hbCIsImF0UGhvbmVDYWxsIiwiYXRUb0RvIiwiYXRFTWFpbCIsImdyb3VwT3B0aW9uc0J5VHlwZSIsImVudGl0eU5hbWUiLCJtb2RlbE5hbWUiLCJBQ1RJVklUWSIsImluc2VydFNlY3VyaXR5IiwidXBkYXRlU2VjdXJpdHkiLCJjb250cmFjdE5hbWUiLCJyZXNvdXJjZUtpbmQiLCJyZWN1cnJlbmNlIiwiX3ByZXZpb3VzUmVjdXJyZW5jZSIsImluaXQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJSZWN1ckl0ZXJhdGlvbnMiLCJSZWN1clBlcmlvZCIsIlJlY3VyUGVyaW9kU3BlYyIsImNvbm5lY3QiLCJmaWVsZHMiLCJMZWFkIiwib25MZWFkQ2hhbmdlIiwiSXNMZWFkIiwib25Jc0xlYWRDaGFuZ2UiLCJMZWFkZXIiLCJvbkxlYWRlckNoYW5nZSIsIlRpbWVsZXNzIiwib25UaW1lbGVzc0NoYW5nZSIsIkFsYXJtIiwib25BbGFybUNoYW5nZSIsIkFjY291bnQiLCJvbkFjY291bnRDaGFuZ2UiLCJDb250YWN0Iiwib25Db250YWN0Q2hhbmdlIiwiT3Bwb3J0dW5pdHkiLCJvbk9wcG9ydHVuaXR5Q2hhbmdlIiwiVGlja2V0Iiwib25UaWNrZXRDaGFuZ2UiLCJTdGFydERhdGUiLCJvblN0YXJ0RGF0ZUNoYW5nZSIsIlJlY3VycmVuY2VVSSIsIm9uUmVjdXJyZW5jZVVJQ2hhbmdlIiwiUmVjdXJyZW5jZSIsIm9uUmVjdXJyZW5jZUNoYW5nZSIsIm9uQWRkQ29tcGxldGUiLCJyZWZyZXNoQWN0aXZpdHlMaXN0cyIsIm9uUHV0Q29tcGxldGUiLCJlbnRyeSIsInVwZGF0ZWRFbnRyeSIsInZpZXciLCJBcHAiLCJnZXRWaWV3Iiwib3JpZ2luYWxLZXkiLCJvcHRpb25zIiwiJGtleSIsImVuYWJsZSIsInB1Ymxpc2giLCJrZXkiLCJkYXRhIiwic2hvdyIsInJldHVyblRvIiwib25VcGRhdGVDb21wbGV0ZWQiLCJjb252ZXJ0RW50cnkiLCJyZXF1ZXN0TGVhZGVyIiwidXNlcklkIiwicmVxdWVzdCIsIlNhZ2UiLCJTRGF0YSIsIkNsaWVudCIsIlNEYXRhU2luZ2xlUmVzb3VyY2VSZXF1ZXN0IiwiZ2V0Q29ubmVjdGlvbiIsInNldFJlc291cmNlS2luZCIsInNldFJlc291cmNlU2VsZWN0b3IiLCJzZXRRdWVyeUFyZyIsImpvaW4iLCJyZWFkIiwic3VjY2VzcyIsInByb2Nlc3NMZWFkZXIiLCJmYWlsdXJlIiwicmVxdWVzdExlYWRlckZhaWx1cmUiLCJzY29wZSIsImxlYWRlciIsInNldFZhbHVlIiwiY3VycmVudFVzZXJDYW5FZGl0IiwiQWxsb3dFZGl0IiwiY3VycmVudFVzZXJDYW5TZXRBbGFybSIsImNvbnRleHQiLCJ1c2VyIiwiaXNBY3Rpdml0eUZvckxlYWQiLCJ0ZXN0IiwiTGVhZElkIiwiaXNBY3Rpdml0eVJlY3VycmluZyIsIlJlY3VycmVuY2VTdGF0ZSIsImdldFZhbHVlIiwiaXNJbkxlYWRDb250ZXh0IiwiaW5zZXJ0IiwiX2dldE5hdkNvbnRleHQiLCJpc0xlYWRDb250ZXh0IiwibGVhZCIsImJlZm9yZVRyYW5zaXRpb25UbyIsImlzRm9yTGVhZCIsInVuZGVmaW5lZCIsInNob3dGaWVsZHNGb3JMZWFkIiwic2hvd0ZpZWxkc0ZvclN0YW5kYXJkIiwiZGlzYWJsZUZpZWxkcyIsInByZWRpY2F0ZSIsIm5hbWUiLCJkaXNhYmxlIiwiZW5hYmxlRmllbGRzIiwidmFsdWUiLCJjb25jYXQiLCJmb3JFYWNoIiwiaXRlbSIsImhpZGUiLCJ0b2dnbGVTZWxlY3RGaWVsZCIsImZpZWxkIiwiRHVyYXRpb24iLCJzdGFydERhdGVGaWVsZCIsIlJvbGxvdmVyIiwiZGF0ZUZvcm1hdFRleHQiLCJzaG93VGltZVBpY2tlciIsInRpbWVsZXNzIiwic3RhcnREYXRlIiwiX2dldE5ld1N0YXJ0RGF0ZSIsImlzMjRIb3VyQ2xvY2siLCJSZW1pbmRlciIsInNlbGVjdGlvbiIsImdldFNlbGVjdGlvbiIsIkFjY291bnROYW1lIiwiY3VycmVudFNlbGVjdGlvbiIsIldvcmtQaG9uZSIsInBob25lRmllbGQiLCJQaG9uZU51bWJlciIsInJlc291cmNlSWQiLCJzcGxpdCIsIlVzZXJJZCIsIiRkZXNjcmlwdG9yIiwiZiIsImRlcGVuZHNPbiIsIndoZXJlIiwiQWNjb3VudElkIiwiTWFpblBob25lIiwib25BY2NvdW50RGVwZW5kZW50Q2hhbmdlIiwiZmllbGRzUGhvbmVOdW1iZXIiLCJwaG9uZSIsImFjY291bnRGaWVsZCIsImdldFJlY3VyUGVyaW9kU3BlYyIsInJlc2V0UmVjdXJyZW5jZSIsImNyZWF0ZVNpbXBsaWZpZWRPcHRpb25zIiwicmVwZWF0cyIsImdldFBhbmVsIiwiY3VycmVudFZhbHVlIiwib3B0Iiwic2ltcGxpZmllZE9wdGlvbnMiLCJhcmdvcyIsIkNvbnZlcnQiLCJ0b0RhdGVGcm9tU3RyaW5nIiwiY3VycmVudERhdGUiLCJnZXREYXRlIiwiZ2V0TW9udGgiLCJvIiwiUmVjdXJyaW5nIiwiRW5kRGF0ZSIsImNhbGNFbmREYXRlIiwiZm9ybWF0UGlja2xpc3RGb3JUeXBlIiwidHlwZSIsIndoaWNoIiwiZm9ybWF0UmVjdXJyZW5jZSIsInRvU3RyaW5nIiwiX2dldENhbGN1bGF0ZWRTdGFydFRpbWUiLCJzZWxlY3RlZERhdGUiLCJub3ciLCJtb21lbnQiLCJ0aGlzU2VsZWN0ZWREYXRlIiwiaXNNb21lbnQiLCJjbG9uZSIsInN0YXJ0T2YiLCJob3VycyIsImFkZCIsIm1pbnV0ZXMiLCJNYXRoIiwiZmxvb3IiLCJhcHBseVVzZXJBY3Rpdml0eUNvbnRleHQiLCJvcHRpb25zRGF0ZSIsImFwcGx5Q29udGV4dCIsImFjdGl2aXR5VHlwZSIsImFjdGl2aXR5R3JvdXAiLCJhY3Rpdml0eUR1cmF0aW9uIiwidXNlck9wdGlvbnMiLCJhbGFybUVuYWJsZWQiLCJhbGFybUR1cmF0aW9uIiwidG9EYXRlIiwiVHlwZSIsImxlYWRlckZpZWxkIiwiZm91bmQiLCJzb3VyY2UiLCJsb29rdXAiLCJhY2NvdW50cyIsImFwcGx5QWNjb3VudENvbnRleHQiLCJjb250YWN0cyIsImFwcGx5Q29udGFjdENvbnRleHQiLCJvcHBvcnR1bml0aWVzIiwiYXBwbHlPcHBvcnR1bml0eUNvbnRleHQiLCJ0aWNrZXRzIiwiYXBwbHlUaWNrZXRDb250ZXh0IiwibGVhZHMiLCJhcHBseUxlYWRDb250ZXh0IiwiY2FsbCIsIm5hdkNvbnRleHQiLCJxdWVyeU5hdmlnYXRpb25Db250ZXh0Iiwic2V0U2VsZWN0aW9uIiwiY29udGFjdEZpZWxkIiwiQ29udGFjdElkIiwiQ29udGFjdE5hbWUiLCJ0aWNrZXRGaWVsZCIsIlRpY2tldElkIiwiVGlja2V0TnVtYmVyIiwib3Bwb3J0dW5pdHlGaWVsZCIsIk9wcG9ydHVuaXR5SWQiLCJPcHBvcnR1bml0eU5hbWUiLCJsZWFkRmllbGQiLCJMZWFkTmFtZSIsIkNvbXBhbnkiLCJpc0xlYWRGaWVsZCIsInNldFZhbHVlcyIsInZhbHVlcyIsIkFsYXJtVGltZSIsInN0YXJ0VGltZSIsImlzRGF0ZVRpbWVsZXNzIiwiZ2V0VGltZXpvbmVPZmZzZXQiLCJnZXRUaW1lIiwic3BhbiIsInJlbWluZGVyIiwiZml4ZWQiLCJkZW55RWRpdCIsImFsbG93U2V0QWxhcm0iLCJkYXRlIiwiZ2V0VVRDSG91cnMiLCJnZXRVVENNaW51dGVzIiwiZ2V0VVRDU2Vjb25kcyIsImlzRGF0ZVRpbWVsZXNzTG9jYWwiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJnZXRTZWNvbmRzIiwiZ2V0VmFsdWVzIiwiaXNTdGFydERhdGVEaXJ0eSIsImlzRGlydHkiLCJpc1JlbWluZGVyRGlydHkiLCJyZW1pbmRlckluIiwiYWxhcm1UaW1lIiwiX2dldE5ld0FsYXJtVGltZSIsImNyZWF0ZVJlbWluZGVyRGF0YSIsImxpc3QiLCJkdXJhdGlvbiIsImhhc093blByb3BlcnR5IiwicHVzaCIsIiRyZXNvdXJjZXMiLCJjcmVhdGVEdXJhdGlvbkRhdGEiLCJjcmVhdGVSZWN1cnJpbmdEYXRhIiwiZm9ybWF0RGVwZW5kZW50UXVlcnkiLCJkZXBlbmRlbnRWYWx1ZSIsInRoZUZvcm1hdCIsInByb3BlcnR5Iiwic3Vic3RpdHV0ZSIsIm9yZ2luYWxTdGFydERhdGUiLCJpc1RpbWVMZXNzRGF0ZSIsIndyYXBwZWQiLCJ1dGMiLCJmb3JtYXQiLCJjdXJyZW50VGltZSIsInN1YnRyYWN0IiwidXRjT2Zmc2V0Iiwic2Vjb25kcyIsImRheXMiLCJjcmVhdGVMYXlvdXQiLCJsYXlvdXQiLCJsYWJlbCIsInBpY2tsaXN0IiwiYmluZERlbGVnYXRlIiwidGl0bGUiLCJvcmRlckJ5IiwibWF4VGV4dExlbmd0aCIsInZhbGlkYXRvciIsImV4Y2VlZHNNYXhUZXh0TGVuZ3RoIiwiYXV0b0ZvY3VzIiwibm90ZVByb3BlcnR5Iiwic2hvd1JlbGF0aXZlRGF0ZVRpbWUiLCJtaW5WYWx1ZSIsIkRhdGUiLCJleGlzdHMiLCJpc0RhdGVJblJhbmdlIiwiaW5jbHVkZSIsImV4Y2x1ZGUiLCJhcHBseVRvIiwiZm9ybWF0VmFsdWUiLCJyZXF1aXJlU2VsZWN0aW9uIiwib25UZXh0Iiwib2ZmVGV4dCIsImVtcHR5VGV4dCIsInZhbHVlS2V5UHJvcGVydHkiLCJ2YWx1ZVRleHRQcm9wZXJ0eSIsInBheWxvYWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUE2QkEsTUFBTUEsV0FBVyxvQkFBWSxjQUFaLENBQWpCO0FBQ0EsTUFBTUMsbUJBQW1CLG9CQUFZLDRCQUFaLENBQXpCOztBQUVBOzs7OztBQUtBLE1BQU1DLFVBQVUsdUJBQVEseUJBQVIsRUFBbUMsZ0JBQW5DLEVBQTJDLHNDQUFzQztBQUMvRjtBQUNBQywrQkFBMkJILFNBQVNHLHlCQUYyRDtBQUcvRkMsa0NBQThCSixTQUFTSSw0QkFId0Q7QUFJL0ZDLGtCQUFjTCxTQUFTSyxZQUp3RTtBQUsvRkMsMkJBQXVCTixTQUFTTSxxQkFMK0Q7QUFNL0ZDLGVBQVdQLFNBQVNPLFNBTjJFO0FBTy9GQyxrQkFBY1IsU0FBU1EsWUFQd0U7QUFRL0ZDLGtCQUFjVCxTQUFTUyxZQVJ3RTtBQVMvRkMsa0JBQWNWLFNBQVNVLFlBVHdFO0FBVS9GQyx1QkFBbUJYLFNBQVNXLGlCQVZtRTtBQVcvRkMseUJBQXFCWixTQUFTWSxtQkFYaUU7QUFZL0ZDLHlCQUFxQmIsU0FBU2EsbUJBWmlFO0FBYS9GQyx1QkFBbUJkLFNBQVNhLG1CQWJtRTtBQWMvRkUsZ0JBQVlmLFNBQVNlLFVBZDBFO0FBZS9GQyxtQkFBZWhCLFNBQVNnQixhQWZ1RTtBQWdCL0ZDLHdCQUFvQmpCLFNBQVNpQixrQkFoQmtFO0FBaUIvRkMsa0JBQWNsQixTQUFTa0IsWUFqQndFO0FBa0IvRkMsdUJBQW1CbkIsU0FBU21CLGlCQWxCbUU7QUFtQi9GQyxtQkFBZXBCLFNBQVNvQixhQW5CdUU7QUFvQi9GQyxrQkFBY3JCLFNBQVNxQixZQXBCd0U7QUFxQi9GQyxrQkFBY3RCLFNBQVNzQixZQXJCd0U7QUFzQi9GQyx3QkFBb0J0QixpQkFBaUJzQixrQkF0QjBEO0FBdUIvRkMsMEJBQXNCdkIsaUJBQWlCdUIsb0JBdkJ3RDtBQXdCL0ZDLGdDQUE0QnhCLGlCQUFpQndCLDBCQXhCa0Q7QUF5Qi9GQyxpQkFBYTFCLFNBQVMwQixXQXpCeUU7QUEwQi9GQyxtQkFBZTNCLFNBQVMyQixhQTFCdUU7QUEyQi9GQyx3QkFBb0I1QixTQUFTNEIsa0JBM0JrRTtBQTRCL0ZDLGtCQUFjN0IsU0FBUzZCLFlBNUJ3RTtBQTZCL0ZDLGVBQVc5QixTQUFTOEIsU0E3QjJFO0FBOEIvRkMsY0FBVS9CLFNBQVMrQixRQTlCNEU7QUErQi9GQyxpQkFBYWhDLFNBQVNnQyxXQS9CeUU7QUFnQy9GQyxpQkFBYWpDLFNBQVNpQyxXQWhDeUU7QUFpQy9GQyxxQkFBaUJsQyxTQUFTa0MsZUFqQ3FFO0FBa0MvRkMsc0JBQWtCbkMsU0FBU21DLGdCQWxDb0U7QUFtQy9GQyxpQkFBYXBDLFNBQVNvQyxXQW5DeUU7QUFvQy9GQyxjQUFVckMsU0FBU3FDLFFBcEM0RTtBQXFDL0ZDLGdCQUFZdEMsU0FBU3NDLFVBckMwRTtBQXNDL0ZDLGFBQVN2QyxTQUFTdUMsT0F0QzZFO0FBdUMvRkMsWUFBUXhDLFNBQVN3QyxNQXZDOEU7QUF3Qy9GQyxlQUFXekMsU0FBU3lDLFNBeEMyRTtBQXlDL0ZDLDRCQUF3QjFDLFNBQVMwQyxzQkF6QzhEO0FBMEMvRkMsdUJBQW1CO0FBQ2pCLFNBQUczQyxTQUFTNEMsUUFESztBQUVqQixTQUFHNUMsU0FBUzZDLFdBRks7QUFHakIsVUFBSTdDLFNBQVM4QyxlQUhJO0FBSWpCLFVBQUk5QyxTQUFTK0MsWUFKSTtBQUtqQixVQUFJL0MsU0FBU2dELFFBTEk7QUFNakIsWUFBTWhELFNBQVNpRDtBQU5FLEtBMUM0RTtBQWtEL0ZDLHVCQUFtQjtBQUNqQixTQUFHbEQsU0FBUzRDLFFBREs7QUFFakIsVUFBSTVDLFNBQVM4QyxlQUZJO0FBR2pCLFVBQUk5QyxTQUFTK0MsWUFISTtBQUlqQixVQUFJL0MsU0FBU2dELFFBSkk7QUFLakIsVUFBSWhELFNBQVNtRCxlQUxJO0FBTWpCLFdBQUtuRCxTQUFTb0Q7QUFORyxLQWxENEU7O0FBMkQvRjs7OztBQUlBQyxtQkFBZSxFQS9EZ0Y7O0FBaUUvRjtBQUNBQyxRQUFJLGVBbEUyRjtBQW1FL0ZDLGdCQUFZLGlCQW5FbUY7QUFvRS9GQyxvQkFBZ0IsQ0FBQyxhQUFELEVBQWdCLE1BQWhCLENBcEUrRTtBQXFFL0ZDLHVCQUFtQixDQUFDLFNBQUQsRUFBWSxTQUFaLEVBQXVCLGFBQXZCLEVBQXNDLFFBQXRDLENBckU0RTtBQXNFL0Y7OztBQUdBQyxxQkFBaUI7QUFDZkMscUJBQWU7QUFDYkMsa0JBQVUsd0JBREc7QUFFYkMscUJBQWE7QUFGQSxPQURBO0FBS2ZDLG9CQUFjO0FBQ1pELHFCQUFhO0FBREQsT0FMQztBQVFmRSxrQkFBWTtBQUNWSCxrQkFBVSx3QkFEQTtBQUVWQyxxQkFBYTtBQUZILE9BUkc7QUFZZkcsbUJBQWE7QUFDWEosa0JBQVUsMkJBREM7QUFFWEMscUJBQWE7QUFGRixPQVpFO0FBZ0JmSSxjQUFRO0FBQ05MLGtCQUFVLHNCQURKO0FBRU5DLHFCQUFhO0FBRlAsT0FoQk87QUFvQmZLLGVBQVM7QUFDUE4sa0JBQVUsdUJBREg7QUFFUEMscUJBQWE7QUFGTjtBQXBCTSxLQXpFOEU7QUFrRy9GTSx3QkFBb0I7QUFDbEJGLGNBQVEscUJBRFU7QUFFbEJGLGtCQUFZLHlCQUZNO0FBR2xCQyxtQkFBYSxzQkFISztBQUlsQkwscUJBQWU7QUFKRyxLQWxHMkU7O0FBeUcvRlMsZ0JBQVksVUF6R21GO0FBMEcvRkMsZUFBVyxnQkFBWUMsUUExR3dFO0FBMkcvRkMsb0JBQWdCLElBM0crRSxFQTJHekU7QUFDdEJDLG9CQUFnQixJQTVHK0UsRUE0R3pFO0FBQ3RCQyxrQkFBYyxRQTdHaUY7QUE4Ry9GQyxrQkFBYyxZQTlHaUY7QUErRy9GQyxnQkFBWSxJQS9HbUY7QUFnSC9GQyx5QkFBcUIsSUFoSDBFOztBQWtIL0ZDLFVBQU0sU0FBU0EsSUFBVCxHQUFnQjtBQUNwQixXQUFLQyxTQUFMLENBQWVELElBQWYsRUFBcUJFLFNBQXJCOztBQUVBLFdBQUtKLFVBQUwsR0FBa0I7QUFDaEJLLHlCQUFpQixHQUREO0FBRWhCQyxxQkFBYSxJQUZHO0FBR2hCQyx5QkFBaUI7QUFIRCxPQUFsQjs7QUFNQSxXQUFLQyxPQUFMLENBQWEsS0FBS0MsTUFBTCxDQUFZQyxJQUF6QixFQUErQixVQUEvQixFQUEyQyxLQUFLQyxZQUFoRDtBQUNBLFdBQUtILE9BQUwsQ0FBYSxLQUFLQyxNQUFMLENBQVlHLE1BQXpCLEVBQWlDLFVBQWpDLEVBQTZDLEtBQUtDLGNBQWxEO0FBQ0EsV0FBS0wsT0FBTCxDQUFhLEtBQUtDLE1BQUwsQ0FBWUssTUFBekIsRUFBaUMsVUFBakMsRUFBNkMsS0FBS0MsY0FBbEQ7QUFDQSxXQUFLUCxPQUFMLENBQWEsS0FBS0MsTUFBTCxDQUFZTyxRQUF6QixFQUFtQyxVQUFuQyxFQUErQyxLQUFLQyxnQkFBcEQ7QUFDQSxXQUFLVCxPQUFMLENBQWEsS0FBS0MsTUFBTCxDQUFZUyxLQUF6QixFQUFnQyxVQUFoQyxFQUE0QyxLQUFLQyxhQUFqRDs7QUFFQSxXQUFLWCxPQUFMLENBQWEsS0FBS0MsTUFBTCxDQUFZVyxPQUF6QixFQUFrQyxVQUFsQyxFQUE4QyxLQUFLQyxlQUFuRDtBQUNBLFdBQUtiLE9BQUwsQ0FBYSxLQUFLQyxNQUFMLENBQVlhLE9BQXpCLEVBQWtDLFVBQWxDLEVBQThDLEtBQUtDLGVBQW5EO0FBQ0EsV0FBS2YsT0FBTCxDQUFhLEtBQUtDLE1BQUwsQ0FBWWUsV0FBekIsRUFBc0MsVUFBdEMsRUFBa0QsS0FBS0MsbUJBQXZEO0FBQ0EsV0FBS2pCLE9BQUwsQ0FBYSxLQUFLQyxNQUFMLENBQVlpQixNQUF6QixFQUFpQyxVQUFqQyxFQUE2QyxLQUFLQyxjQUFsRDtBQUNBLFdBQUtuQixPQUFMLENBQWEsS0FBS0MsTUFBTCxDQUFZbUIsU0FBekIsRUFBb0MsVUFBcEMsRUFBZ0QsS0FBS0MsaUJBQXJEO0FBQ0EsV0FBS3JCLE9BQUwsQ0FBYSxLQUFLQyxNQUFMLENBQVlxQixZQUF6QixFQUF1QyxVQUF2QyxFQUFtRCxLQUFLQyxvQkFBeEQ7QUFDQSxXQUFLdkIsT0FBTCxDQUFhLEtBQUtDLE1BQUwsQ0FBWXVCLFVBQXpCLEVBQXFDLFVBQXJDLEVBQWlELEtBQUtDLGtCQUF0RDtBQUNELEtBeEk4RjtBQXlJL0ZDLG1CQUFlLFNBQVNBLGFBQVQsR0FBeUI7QUFDdEMsNEJBQVlDLG9CQUFaO0FBQ0EsV0FBS2hDLFNBQUwsQ0FBZStCLGFBQWYsRUFBOEI5QixTQUE5QjtBQUNELEtBNUk4RjtBQTZJL0ZnQyxtQkFBZSxTQUFTQSxhQUFULENBQXVCQyxLQUF2QixFQUE4QkMsWUFBOUIsRUFBNEM7QUFDekQsVUFBTUMsT0FBT0MsSUFBSUMsT0FBSixDQUFZLEtBQUs3RCxVQUFqQixDQUFiO0FBQ0EsVUFBTThELGNBQWUsS0FBS0MsT0FBTCxDQUFhTixLQUFiLElBQXNCLEtBQUtNLE9BQUwsQ0FBYU4sS0FBYixDQUFtQk8sSUFBMUMsSUFBbUROLGFBQWFNLElBQXBGOztBQUVBLFdBQUtDLE1BQUw7O0FBRUEsNEJBQVlWLG9CQUFaO0FBQ0Esd0JBQVFXLE9BQVIsQ0FBZ0IsY0FBaEIsRUFBZ0MsQ0FBQztBQUMvQi9DLHNCQUFjLEtBQUtBLFlBRFk7QUFFL0JnRCxhQUFLVCxhQUFhTSxJQUZhO0FBRy9CSSxjQUFNVjtBQUh5QixPQUFELENBQWhDOztBQU1BLFVBQUlBLGFBQWFNLElBQWIsS0FBc0JGLFdBQXRCLElBQXFDSCxJQUF6QyxFQUErQztBQUM3QztBQUNBQSxhQUFLVSxJQUFMLENBQVU7QUFDUkYsZUFBS1QsYUFBYU07QUFEVixTQUFWLEVBRUc7QUFDRE0sb0JBQVUsQ0FBQztBQURWLFNBRkg7QUFLRCxPQVBELE1BT087QUFDTCxhQUFLQyxpQkFBTCxDQUF1QmIsWUFBdkI7QUFDRDtBQUNGLEtBcEs4RjtBQXFLL0ZjLGtCQUFjLFNBQVNBLFlBQVQsR0FBd0I7QUFDcEMsVUFBTWYsUUFBUSxLQUFLbEMsU0FBTCxDQUFlaUQsWUFBZixFQUE2QmhELFNBQTdCLENBQWQ7QUFDQSxVQUFJLENBQUMsS0FBS3VDLE9BQUwsQ0FBYU4sS0FBbEIsRUFBeUI7QUFDdkIsWUFBSUEsU0FBU0EsTUFBTXZCLE1BQU4sQ0FBYThCLElBQTFCLEVBQWdDO0FBQzlCLGVBQUtTLGFBQUwsQ0FBbUJoQixNQUFNdkIsTUFBTixDQUFhOEIsSUFBaEM7QUFDRDtBQUNGOztBQUVELGFBQU9QLEtBQVA7QUFDRCxLQTlLOEY7QUErSy9GZ0IsbUJBQWUsU0FBU0EsYUFBVCxDQUF1QkMsTUFBdkIsRUFBK0I7QUFDNUMsVUFBTUMsVUFBVSxJQUFJQyxLQUFLQyxLQUFMLENBQVdDLE1BQVgsQ0FBa0JDLDBCQUF0QixDQUFpRCxLQUFLQyxhQUFMLEVBQWpELEVBQ2JDLGVBRGEsQ0FDRyxPQURILEVBRWJDLG1CQUZhLFFBRVdSLE1BRlgsU0FHYlMsV0FIYSxDQUdELFFBSEMsRUFHUyxDQUNyQixvQkFEcUIsRUFFckIsbUJBRnFCLEVBR3JCQyxJQUhxQixDQUdoQixHQUhnQixDQUhULENBQWhCOztBQVFBVCxjQUFRVSxJQUFSLENBQWE7QUFDWEMsaUJBQVMsS0FBS0MsYUFESDtBQUVYQyxpQkFBUyxLQUFLQyxvQkFGSDtBQUdYQyxlQUFPO0FBSEksT0FBYjtBQUtELEtBN0w4RjtBQThML0ZELDBCQUFzQixTQUFTQSxvQkFBVCxHQUFnQyxDQUFFLENBOUx1QztBQStML0ZGLG1CQUFlLFNBQVNBLGFBQVQsQ0FBdUJJLE1BQXZCLEVBQStCO0FBQzVDLFVBQUlBLE1BQUosRUFBWTtBQUNWLGFBQUtsQyxLQUFMLENBQVd2QixNQUFYLEdBQW9CeUQsTUFBcEI7QUFDQSxhQUFLOUQsTUFBTCxDQUFZSyxNQUFaLENBQW1CMEQsUUFBbkIsQ0FBNEJELE1BQTVCO0FBQ0Q7QUFDRixLQXBNOEY7QUFxTS9GRSx3QkFBb0IsU0FBU0Esa0JBQVQsQ0FBNEJwQyxLQUE1QixFQUFtQztBQUNyRCxhQUFRQSxTQUFVQSxNQUFNcUMsU0FBeEI7QUFDRCxLQXZNOEY7QUF3TS9GQyw0QkFBd0IsU0FBU0Esc0JBQVQsQ0FBZ0N0QyxLQUFoQyxFQUF1QztBQUM3RCxhQUFPLENBQUMsQ0FBQ0EsS0FBRixJQUFZQSxNQUFNdkIsTUFBTixDQUFhOEIsSUFBYixLQUFzQkosSUFBSW9DLE9BQUosQ0FBWUMsSUFBWixDQUFpQmpDLElBQTFEO0FBQ0QsS0ExTThGO0FBMk0vRmtDLHVCQUFtQixTQUFTQSxpQkFBVCxDQUEyQnpDLEtBQTNCLEVBQWtDO0FBQ25ELGFBQU9BLFNBQVMsYUFBYTBDLElBQWIsQ0FBa0IxQyxNQUFNMkMsTUFBeEIsQ0FBaEI7QUFDRCxLQTdNOEY7QUE4TS9GQyx5QkFBcUIsU0FBU0EsbUJBQVQsR0FBK0I7QUFDbEQsYUFBUSxZQUFELENBQ0pGLElBREksQ0FDQyxLQUFLdEUsTUFBTCxDQUFZeUUsZUFBWixDQUE0QkMsUUFBNUIsRUFERDtBQUFQO0FBRUQsS0FqTjhGO0FBa04vRkMscUJBQWlCLFNBQVNBLGVBQVQsR0FBMkI7QUFDMUMsVUFBTUMsU0FBUyxLQUFLMUMsT0FBTCxJQUFnQixLQUFLQSxPQUFMLENBQWEwQyxNQUE1QztBQUNBLFVBQU1oRCxRQUFRLEtBQUtNLE9BQUwsSUFBZ0IsS0FBS0EsT0FBTCxDQUFhTixLQUEzQztBQUNBLFVBQU11QyxVQUFVLEtBQUtVLGNBQUwsRUFBaEI7QUFDQSxVQUFJQyxnQkFBZ0IsS0FBcEI7O0FBRUEsVUFBSVgsUUFBUTdFLFlBQVIsS0FBeUIsT0FBN0IsRUFBc0M7QUFDcEN3Rix3QkFBZ0IsSUFBaEI7QUFDRDs7QUFFRCxVQUFNQyxPQUFRSCxVQUFVRSxhQUFYLElBQTZCLEtBQUtULGlCQUFMLENBQXVCekMsS0FBdkIsQ0FBMUM7O0FBRUEsYUFBTyxDQUFDLENBQUNtRCxJQUFUO0FBQ0QsS0EvTjhGO0FBZ08vRkMsd0JBQW9CLFNBQVNBLGtCQUFULEdBQThCO0FBQ2hELFdBQUt0RixTQUFMLENBQWVzRixrQkFBZixFQUFtQ3JGLFNBQW5DOztBQUVBO0FBQ0E7QUFDQSxVQUFJLEtBQUt1QyxPQUFMLENBQWErQyxTQUFiLEtBQTJCQyxTQUEvQixFQUEwQztBQUN4QztBQUNEOztBQUVELFdBQUtoRCxPQUFMLENBQWErQyxTQUFiLEdBQXlCLEtBQUtOLGVBQUwsRUFBekI7O0FBRUEsVUFBSSxLQUFLekMsT0FBTCxDQUFhK0MsU0FBakIsRUFBNEI7QUFDMUIsYUFBS0UsaUJBQUw7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLQyxxQkFBTDtBQUNEO0FBQ0YsS0FoUDhGO0FBaVAvRkMsbUJBQWUsU0FBU0EsYUFBVCxDQUF1QkMsU0FBdkIsRUFBa0M7QUFDL0MsV0FBSyxJQUFNQyxJQUFYLElBQW1CLEtBQUt2RixNQUF4QixFQUFnQztBQUM5QixZQUFJLENBQUNzRixTQUFELElBQWNBLFVBQVUsS0FBS3RGLE1BQUwsQ0FBWXVGLElBQVosQ0FBVixDQUFsQixFQUFnRDtBQUM5QyxlQUFLdkYsTUFBTCxDQUFZdUYsSUFBWixFQUFrQkMsT0FBbEI7QUFDRDtBQUNGO0FBQ0YsS0F2UDhGO0FBd1AvRkMsa0JBQWMsU0FBU0EsWUFBVCxDQUFzQkgsU0FBdEIsRUFBaUM7QUFDN0MsV0FBSyxJQUFNQyxJQUFYLElBQW1CLEtBQUt2RixNQUF4QixFQUFnQztBQUM5QixZQUFJLENBQUNzRixTQUFELElBQWNBLFVBQVUsS0FBS3RGLE1BQUwsQ0FBWXVGLElBQVosQ0FBVixDQUFsQixFQUFnRDtBQUM5QyxlQUFLdkYsTUFBTCxDQUFZdUYsSUFBWixFQUFrQm5ELE1BQWxCO0FBQ0Q7QUFDRjtBQUNGLEtBOVA4RjtBQStQL0ZoQyxvQkFBZ0IsU0FBU0EsY0FBVCxDQUF3QnNGLEtBQXhCLEVBQStCO0FBQzdDLFdBQUt4RCxPQUFMLENBQWErQyxTQUFiLEdBQXlCUyxLQUF6Qjs7QUFFQSxVQUFJLEtBQUt4RCxPQUFMLENBQWErQyxTQUFqQixFQUE0QjtBQUMxQixhQUFLRSxpQkFBTDtBQUNELE9BRkQsTUFFTztBQUNMLGFBQUtDLHFCQUFMO0FBQ0Q7QUFDRixLQXZROEY7QUF3US9GRCx1QkFBbUIsU0FBU0EsaUJBQVQsR0FBNkI7QUFBQTs7QUFDOUMsV0FBSzlHLGlCQUFMLENBQXVCc0gsTUFBdkIsQ0FBOEIsS0FBS3ZILGNBQW5DLEVBQW1Ed0gsT0FBbkQsQ0FBMkQsVUFBQ0MsSUFBRCxFQUFVO0FBQ25FLFlBQUksTUFBSzdGLE1BQUwsQ0FBWTZGLElBQVosQ0FBSixFQUF1QjtBQUNyQixnQkFBSzdGLE1BQUwsQ0FBWTZGLElBQVosRUFBa0JDLElBQWxCO0FBQ0Q7QUFDRixPQUpELEVBSUcsSUFKSDs7QUFNQSxXQUFLMUgsY0FBTCxDQUFvQndILE9BQXBCLENBQTRCLFVBQUNDLElBQUQsRUFBVTtBQUNwQyxZQUFJLE1BQUs3RixNQUFMLENBQVk2RixJQUFaLENBQUosRUFBdUI7QUFDckIsZ0JBQUs3RixNQUFMLENBQVk2RixJQUFaLEVBQWtCckQsSUFBbEI7QUFDRDtBQUNGLE9BSkQsRUFJRyxJQUpIO0FBS0QsS0FwUjhGO0FBcVIvRjRDLDJCQUF1QixTQUFTQSxxQkFBVCxHQUFpQztBQUFBOztBQUN0RCxXQUFLL0csaUJBQUwsQ0FBdUJzSCxNQUF2QixDQUE4QixLQUFLdkgsY0FBbkMsRUFBbUR3SCxPQUFuRCxDQUEyRCxVQUFDQyxJQUFELEVBQVU7QUFDbkUsWUFBSSxPQUFLN0YsTUFBTCxDQUFZNkYsSUFBWixDQUFKLEVBQXVCO0FBQ3JCLGlCQUFLN0YsTUFBTCxDQUFZNkYsSUFBWixFQUFrQkMsSUFBbEI7QUFDRDtBQUNGLE9BSkQsRUFJRyxJQUpIOztBQU1BLFdBQUt6SCxpQkFBTCxDQUF1QnVILE9BQXZCLENBQStCLFVBQUNDLElBQUQsRUFBVTtBQUN2QyxZQUFJLE9BQUs3RixNQUFMLENBQVk2RixJQUFaLENBQUosRUFBdUI7QUFDckIsaUJBQUs3RixNQUFMLENBQVk2RixJQUFaLEVBQWtCckQsSUFBbEI7QUFDRDtBQUNGLE9BSkQsRUFJRyxJQUpIO0FBS0QsS0FqUzhGO0FBa1MvRnVELHVCQUFtQixTQUFTQSxpQkFBVCxDQUEyQkMsS0FBM0IsRUFBa0NSLE9BQWxDLEVBQTJDO0FBQzVELFVBQUlBLE9BQUosRUFBYTtBQUNYUSxjQUFNUixPQUFOO0FBQ0QsT0FGRCxNQUVPO0FBQ0xRLGNBQU01RCxNQUFOO0FBQ0Q7QUFDRixLQXhTOEY7QUF5Uy9GNUIsc0JBQWtCLFNBQVNBLGdCQUFULENBQTBCa0YsS0FBMUIsRUFBaUM7QUFDakQsV0FBS0ssaUJBQUwsQ0FBdUIsS0FBSy9GLE1BQUwsQ0FBWWlHLFFBQW5DLEVBQTZDUCxLQUE3QztBQUNBLFVBQU1RLGlCQUFpQixLQUFLbEcsTUFBTCxDQUFZbUIsU0FBbkM7O0FBRUEsVUFBSXVFLEtBQUosRUFBVztBQUFFO0FBQ1gsYUFBSzFGLE1BQUwsQ0FBWW1HLFFBQVosQ0FBcUIvRCxNQUFyQjtBQUNBOEQsdUJBQWVFLGNBQWYsR0FBZ0MsS0FBSy9KLDBCQUFyQztBQUNBNkosdUJBQWVHLGNBQWYsR0FBZ0MsS0FBaEM7QUFDQUgsdUJBQWVJLFFBQWYsR0FBMEIsSUFBMUI7QUFDQSxZQUFNQyxZQUFZLEtBQUtDLGdCQUFMLENBQXNCTixlQUFleEIsUUFBZixFQUF0QixFQUFpRCxJQUFqRCxDQUFsQjs7QUFFQSxZQUFJNkIsU0FBSixFQUFlO0FBQ2JMLHlCQUFlbkMsUUFBZixDQUF3QndDLFNBQXhCO0FBQ0Q7QUFDRixPQVZELE1BVU87QUFBRTtBQUNQLGFBQUt2RyxNQUFMLENBQVltRyxRQUFaLENBQXFCcEMsUUFBckIsQ0FBOEIsS0FBOUI7QUFDQSxhQUFLL0QsTUFBTCxDQUFZbUcsUUFBWixDQUFxQlgsT0FBckI7QUFDQVUsdUJBQWVFLGNBQWYsR0FBaUNyRSxJQUFJMEUsYUFBSixFQUFELEdBQXdCLEtBQUtySyxvQkFBN0IsR0FBb0QsS0FBS0Qsa0JBQXpGO0FBQ0ErSix1QkFBZUcsY0FBZixHQUFnQyxJQUFoQztBQUNBSCx1QkFBZUksUUFBZixHQUEwQixLQUExQjtBQUNBLFlBQU1DLGFBQVksS0FBS0MsZ0JBQUwsQ0FBc0JOLGVBQWV4QixRQUFmLEVBQXRCLEVBQWlELEtBQWpELENBQWxCOztBQUVBLFlBQUk2QixVQUFKLEVBQWU7QUFDYkwseUJBQWVuQyxRQUFmLENBQXdCd0MsVUFBeEI7QUFDRDtBQUNGO0FBQ0YsS0FuVThGO0FBb1UvRjdGLG1CQUFlLFNBQVNBLGFBQVQsR0FBeUI7QUFDdEMsVUFBSSxLQUFLVixNQUFMLENBQVlTLEtBQVosQ0FBa0JpRSxRQUFsQixFQUFKLEVBQWtDO0FBQ2hDLGFBQUsxRSxNQUFMLENBQVkwRyxRQUFaLENBQXFCdEUsTUFBckI7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLcEMsTUFBTCxDQUFZMEcsUUFBWixDQUFxQmxCLE9BQXJCO0FBQ0Q7QUFDRixLQTFVOEY7QUEyVS9GdEYsa0JBQWMsU0FBU0EsWUFBVCxDQUFzQndGLEtBQXRCLEVBQTZCTSxLQUE3QixFQUFvQztBQUNoRCxVQUFNVyxZQUFZWCxNQUFNWSxZQUFOLEVBQWxCOztBQUVBLFVBQUlELGFBQWEsS0FBSy9CLE1BQXRCLEVBQThCO0FBQzVCLGFBQUs1RSxNQUFMLENBQVk2RyxXQUFaLENBQXdCOUMsUUFBeEIsQ0FBaUMsa0JBQVFXLFFBQVIsQ0FBaUJpQyxTQUFqQixFQUE0QixTQUE1QixDQUFqQztBQUNEOztBQUVELFVBQU0vRSxRQUFRb0UsTUFBTWMsZ0JBQXBCO0FBQ0EsVUFBSWxGLE1BQU1tRixTQUFWLEVBQXFCO0FBQ25CLFlBQU1DLGFBQWEsS0FBS2hILE1BQUwsQ0FBWWlILFdBQS9CO0FBQ0FELG1CQUFXakQsUUFBWCxDQUFvQm5DLE1BQU1tRixTQUExQjtBQUNEO0FBQ0YsS0F2VjhGO0FBd1YvRnpHLG9CQUFnQixTQUFTQSxjQUFULENBQXdCb0YsS0FBeEIsRUFBK0JNLEtBQS9CLEVBQXNDO0FBQ3BELFVBQU01QixPQUFPNEIsTUFBTXRCLFFBQU4sRUFBYjtBQUNBLFVBQUl3QyxhQUFhLEVBQWpCOztBQUVBLFVBQUk1RSxNQUFNOEIsS0FBS2pDLElBQWY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFJRyxHQUFKLEVBQVM7QUFDUEEsY0FBTUEsSUFBSTZFLEtBQUosQ0FBVSxHQUFWLENBQU47QUFDQUQscUJBQWE1RSxJQUFJLENBQUosQ0FBYjtBQUNBLFlBQUk0RSxVQUFKLEVBQWdCO0FBQ2QsZUFBS2xILE1BQUwsQ0FBWW9ILE1BQVosQ0FBbUJyRCxRQUFuQixDQUE0Qm1ELFVBQTVCOztBQUVBO0FBQ0EsZUFBS2xILE1BQUwsQ0FBWUssTUFBWixDQUFtQjBELFFBQW5CLENBQTRCO0FBQzFCNUIsa0JBQU0rRSxVQURvQjtBQUUxQkcseUJBQWFqRCxLQUFLaUQ7QUFGUSxXQUE1QjtBQUlEO0FBQ0Y7QUFDRixLQS9XOEY7QUFnWC9GekcscUJBQWlCLFNBQVNBLGVBQVQsQ0FBeUI4RSxLQUF6QixFQUFnQ00sS0FBaEMsRUFBdUM7QUFDdEQsVUFBTWhHLFNBQVMsS0FBS0EsTUFBcEI7QUFDQSxPQUFDLFNBQUQsRUFBWSxhQUFaLEVBQTJCLFFBQTNCLEVBQXFDNEYsT0FBckMsQ0FBNkMsVUFBQzBCLENBQUQsRUFBTztBQUNsRCxZQUFJNUIsS0FBSixFQUFXO0FBQ1QxRixpQkFBT3NILENBQVAsRUFBVUMsU0FBVixHQUFzQixTQUF0QjtBQUNBdkgsaUJBQU9zSCxDQUFQLEVBQVVFLEtBQVYsd0JBQW9DOUIsTUFBTStCLFNBQU4sSUFBbUIvQixNQUFNcEQsR0FBN0Q7O0FBRUEsY0FBSXRDLE9BQU9zSCxDQUFQLEVBQVVSLGdCQUFWLElBQ0Y5RyxPQUFPc0gsQ0FBUCxFQUFVUixnQkFBVixDQUEyQm5HLE9BQTNCLENBQW1Dd0IsSUFBbkMsTUFBNkN1RCxNQUFNK0IsU0FBTixJQUFtQi9CLE1BQU1wRCxHQUF0RSxDQURGLEVBQzhFO0FBQzVFdEMsbUJBQU9zSCxDQUFQLEVBQVV2RCxRQUFWLENBQW1CLEtBQW5CO0FBQ0Q7O0FBRUQ7QUFDQSxjQUFJLENBQUMvRCxPQUFPc0gsQ0FBUCxFQUFVUixnQkFBZixFQUFpQztBQUMvQjlHLG1CQUFPc0gsQ0FBUCxFQUFVdkQsUUFBVixDQUFtQixJQUFuQjtBQUNEO0FBQ0YsU0FiRCxNQWFPO0FBQ0wvRCxpQkFBT3NILENBQVAsRUFBVUMsU0FBVixHQUFzQixJQUF0QjtBQUNBdkgsaUJBQU9zSCxDQUFQLEVBQVVFLEtBQVYsR0FBa0IsNkJBQWxCO0FBQ0Q7QUFDRixPQWxCRDs7QUFvQkEsVUFBSTlCLFVBQVUsSUFBVixJQUFrQixPQUFPQSxLQUFQLEtBQWlCLFdBQXZDLEVBQW9EO0FBQ2xEO0FBQ0Q7O0FBRUQsVUFBTTlELFFBQVFvRSxNQUFNYyxnQkFBcEI7QUFDQSxVQUFJbEYsU0FBU0EsTUFBTThGLFNBQW5CLEVBQThCO0FBQzVCLFlBQU1WLGFBQWEsS0FBS2hILE1BQUwsQ0FBWWlILFdBQS9CO0FBQ0FELG1CQUFXakQsUUFBWCxDQUFvQm5DLE1BQU04RixTQUExQjtBQUNEO0FBQ0YsS0EvWThGO0FBZ1ovRjVHLHFCQUFpQixTQUFTQSxlQUFULENBQXlCNEUsS0FBekIsRUFBZ0NNLEtBQWhDLEVBQXVDO0FBQ3RELFdBQUsyQix3QkFBTCxDQUE4QmpDLEtBQTlCLEVBQXFDTSxLQUFyQztBQUNBLFVBQU1wRSxRQUFRb0UsTUFBTWMsZ0JBQXBCOztBQUVBLFVBQUlsRixTQUFTQSxNQUFNbUYsU0FBbkIsRUFBOEI7QUFDNUIsWUFBTUMsYUFBYSxLQUFLaEgsTUFBTCxDQUFZaUgsV0FBL0I7QUFDQUQsbUJBQVdqRCxRQUFYLENBQW9CbkMsTUFBTW1GLFNBQTFCO0FBQ0Q7QUFDRixLQXhaOEY7QUF5Wi9GL0YseUJBQXFCLFNBQVNBLG1CQUFULENBQTZCMEUsS0FBN0IsRUFBb0NNLEtBQXBDLEVBQTJDO0FBQzlELFdBQUsyQix3QkFBTCxDQUE4QmpDLEtBQTlCLEVBQXFDTSxLQUFyQztBQUNBLFVBQU1wRSxRQUFRb0UsTUFBTWMsZ0JBQXBCOztBQUVBLFVBQUlsRixTQUFTQSxNQUFNakIsT0FBZixJQUEwQmlCLE1BQU1qQixPQUFOLENBQWMrRyxTQUE1QyxFQUF1RDtBQUNyRCxZQUFNVixhQUFhLEtBQUtZLGlCQUF4QjtBQUNBWixtQkFBV2pELFFBQVgsQ0FBb0JuQyxNQUFNakIsT0FBTixDQUFjK0csU0FBbEM7QUFDRDtBQUNGLEtBamE4RjtBQWthL0Z4RyxvQkFBZ0IsU0FBU0EsY0FBVCxDQUF3QndFLEtBQXhCLEVBQStCTSxLQUEvQixFQUFzQztBQUNwRCxXQUFLMkIsd0JBQUwsQ0FBOEJqQyxLQUE5QixFQUFxQ00sS0FBckM7QUFDQSxVQUFNcEUsUUFBUW9FLE1BQU1jLGdCQUFwQjtBQUNBLFVBQU1lLFFBQVFqRyxTQUFTQSxNQUFNZixPQUFmLElBQTBCZSxNQUFNZixPQUFOLENBQWNrRyxTQUF4QyxJQUFxRG5GLFNBQVNBLE1BQU1qQixPQUFmLElBQTBCaUIsTUFBTWpCLE9BQU4sQ0FBYytHLFNBQTNHO0FBQ0EsVUFBSUcsS0FBSixFQUFXO0FBQ1QsWUFBTWIsYUFBYSxLQUFLaEgsTUFBTCxDQUFZaUgsV0FBL0I7QUFDQUQsbUJBQVdqRCxRQUFYLENBQW9COEQsS0FBcEI7QUFDRDtBQUNGLEtBMWE4RjtBQTJhL0ZGLDhCQUEwQixTQUFTQSx3QkFBVCxDQUFrQ2pDLEtBQWxDLEVBQXlDTSxLQUF6QyxFQUFnRDtBQUN4RSxVQUFJTixTQUFTLENBQUNNLE1BQU11QixTQUFoQixJQUE2QnZCLE1BQU1jLGdCQUFuQyxJQUF1RGQsTUFBTWMsZ0JBQU4sQ0FBdUJuRyxPQUFsRixFQUEyRjtBQUN6RixZQUFNbUgsZUFBZSxLQUFLOUgsTUFBTCxDQUFZVyxPQUFqQztBQUNBbUgscUJBQWEvRCxRQUFiLENBQXNCO0FBQ3BCMEQscUJBQVd6QixNQUFNYyxnQkFBTixDQUF1Qm5HLE9BQXZCLENBQStCd0IsSUFEdEI7QUFFcEIwRSx1QkFBYWIsTUFBTWMsZ0JBQU4sQ0FBdUJuRyxPQUF2QixDQUErQmtHO0FBRnhCLFNBQXRCO0FBSUEsYUFBS2pHLGVBQUwsQ0FBcUJrSCxhQUFhcEQsUUFBYixFQUFyQixFQUE4Q29ELFlBQTlDO0FBQ0Q7QUFDRixLQXBiOEY7QUFxYi9GMUcsdUJBQW1CLFNBQVNBLGlCQUFULENBQTJCc0UsS0FBM0IsRUFBa0M7QUFDbkQsV0FBS25HLFVBQUwsQ0FBZ0I0QixTQUFoQixHQUE0QnVFLEtBQTVCO0FBQ0E7QUFDQSxXQUFLbkcsVUFBTCxDQUFnQk8sZUFBaEIsR0FBa0MscUJBQU1pSSxrQkFBTixDQUNoQyxLQUFLeEksVUFBTCxDQUFnQk0sV0FEZ0IsRUFFaEMsS0FBS04sVUFBTCxDQUFnQjRCLFNBRmdCLEVBR2hDLEtBQUs1QixVQUFMLENBQWdCTyxlQUFoQixHQUFrQyxLQUFLUCxVQUFMLENBQWdCTyxlQUFoQixHQUFrQyxLQUhwQyxFQUcyQztBQUMzRSxXQUFLUCxVQUFMLENBQWdCTyxlQUFoQixHQUFrQyxLQUpGLENBSVE7QUFKUixPQUFsQztBQU1BLFdBQUtrSSxlQUFMLENBQXFCLEtBQUt6SSxVQUExQjs7QUFFQSwyQkFBTTBJLHVCQUFOLENBQThCdkMsS0FBOUI7O0FBRUEsVUFBTXdDLFVBQVcsS0FBSzNJLFVBQUwsQ0FBZ0JrRixlQUFoQixLQUFvQyxXQUFyRDtBQUNBLFdBQUt6RSxNQUFMLENBQVlxQixZQUFaLENBQXlCMEMsUUFBekIsQ0FBa0MscUJBQU1vRSxRQUFOLENBQWVELFdBQVcsS0FBSzNJLFVBQUwsQ0FBZ0JNLFdBQTFDLENBQWxDO0FBQ0QsS0FwYzhGO0FBcWMvRnlCLDBCQUFzQixTQUFTQSxvQkFBVCxDQUE4Qm9FLEtBQTlCLEVBQXFDTSxLQUFyQyxFQUE0QztBQUNoRSxVQUFNMUQsTUFBTTBELE1BQU1vQyxZQUFOLElBQXNCcEMsTUFBTW9DLFlBQU4sQ0FBbUI5RixHQUFyRDtBQUNBLFVBQU0rRixNQUFNLHFCQUFNQyxpQkFBTixDQUF3QmhHLEdBQXhCLENBQVo7QUFDQTtBQUNBLFVBQUksS0FBSzlDLG1CQUFMLEtBQTZCOEMsR0FBakMsRUFBc0M7QUFDcEMrRixZQUFJekksZUFBSixHQUFzQixLQUFLTCxVQUFMLENBQWdCSyxlQUF0QztBQUNEOztBQUVELFdBQUtvSSxlQUFMLENBQXFCSyxHQUFyQjtBQUNBLFdBQUs3SSxtQkFBTCxHQUEyQjhDLEdBQTNCO0FBQ0QsS0EvYzhGO0FBZ2QvRmQsd0JBQW9CLFNBQVNBLGtCQUFULENBQTRCa0UsS0FBNUIsRUFBbUM7QUFDckQ7QUFDQSxVQUFNYSxZQUFZZ0MsTUFBTUMsT0FBTixDQUFjQyxnQkFBZCxDQUErQi9DLE1BQU12RSxTQUFyQyxDQUFsQixDQUZxRCxDQUVjO0FBQ25FLFVBQU11SCxjQUFjLEtBQUsxSSxNQUFMLENBQVltQixTQUFaLENBQXNCdUQsUUFBdEIsRUFBcEI7O0FBRUEsVUFBSTZCLFVBQVVvQyxPQUFWLE9BQXdCRCxZQUFZQyxPQUFaLEVBQXhCLElBQWlEcEMsVUFBVXFDLFFBQVYsT0FBeUJGLFlBQVlFLFFBQVosRUFBOUUsRUFBc0c7QUFDcEcsYUFBSzVJLE1BQUwsQ0FBWW1CLFNBQVosQ0FBc0I0QyxRQUF0QixDQUErQndDLFNBQS9CO0FBQ0Q7O0FBRUQsV0FBS3lCLGVBQUwsQ0FBcUJ0QyxLQUFyQjtBQUNELEtBMWQ4RjtBQTJkL0ZzQyxxQkFBaUIsU0FBU0EsZUFBVCxDQUF5QmEsQ0FBekIsRUFBNEI7QUFDM0MsV0FBS3RKLFVBQUwsQ0FBZ0I0QixTQUFoQixHQUE0QixLQUFLbkIsTUFBTCxDQUFZbUIsU0FBWixDQUFzQnVELFFBQXRCLEVBQTVCOztBQUVBLFVBQUksT0FBT21FLEVBQUVDLFNBQVQsS0FBdUIsV0FBdkIsSUFBc0NELEVBQUVDLFNBQUYsS0FBZ0IsSUFBMUQsRUFBZ0U7QUFDOUQsYUFBS3ZKLFVBQUwsQ0FBZ0J1SixTQUFoQixHQUE0QkQsRUFBRUMsU0FBOUI7QUFDRDs7QUFFRCxVQUFJLE9BQU9ELEVBQUVwRSxlQUFULEtBQTZCLFdBQTdCLElBQTRDb0UsRUFBRXBFLGVBQUYsS0FBc0IsSUFBdEUsRUFBNEU7QUFDMUUsYUFBS2xGLFVBQUwsQ0FBZ0JrRixlQUFoQixHQUFrQ29FLEVBQUVwRSxlQUFwQztBQUNEOztBQUVELFVBQUksT0FBT29FLEVBQUVoSixXQUFULEtBQXlCLFdBQXpCLElBQXdDZ0osRUFBRWhKLFdBQUYsS0FBa0IsSUFBOUQsRUFBb0U7QUFDbEUsYUFBS04sVUFBTCxDQUFnQk0sV0FBaEIsR0FBOEJnSixFQUFFaEosV0FBaEM7QUFDRDs7QUFFRCxVQUFJLE9BQU9nSixFQUFFL0ksZUFBVCxLQUE2QixXQUE3QixJQUE0QytJLEVBQUUvSSxlQUFGLEtBQXNCLElBQXRFLEVBQTRFO0FBQzFFLGFBQUtQLFVBQUwsQ0FBZ0JPLGVBQWhCLEdBQWtDK0ksRUFBRS9JLGVBQXBDO0FBQ0Q7O0FBRUQsVUFBSSxPQUFPK0ksRUFBRWpKLGVBQVQsS0FBNkIsV0FBN0IsSUFBNENpSixFQUFFakosZUFBRixLQUFzQixJQUF0RSxFQUE0RTtBQUMxRSxhQUFLTCxVQUFMLENBQWdCSyxlQUFoQixHQUFrQ2lKLEVBQUVqSixlQUFwQztBQUNEOztBQUVELFdBQUtMLFVBQUwsQ0FBZ0J3SixPQUFoQixHQUEwQixxQkFBTUMsV0FBTixDQUFrQixLQUFLekosVUFBTCxDQUFnQjRCLFNBQWxDLEVBQTZDLEtBQUs1QixVQUFsRCxDQUExQjs7QUFFQSxXQUFLUyxNQUFMLENBQVlxQixZQUFaLENBQXlCMEMsUUFBekIsQ0FBa0MscUJBQU1vRSxRQUFOLENBQWUsS0FBSzVJLFVBQUwsQ0FBZ0JNLFdBQS9CLENBQWxDO0FBQ0EsV0FBS0csTUFBTCxDQUFZdUIsVUFBWixDQUF1QndDLFFBQXZCLENBQWdDLEtBQUt4RSxVQUFyQzs7QUFFQSxXQUFLUyxNQUFMLENBQVk4SSxTQUFaLENBQXNCL0UsUUFBdEIsQ0FBK0IsS0FBS3hFLFVBQUwsQ0FBZ0J1SixTQUEvQztBQUNBLFdBQUs5SSxNQUFMLENBQVlILFdBQVosQ0FBd0JrRSxRQUF4QixDQUFpQyxLQUFLeEUsVUFBTCxDQUFnQk0sV0FBakQ7QUFDQSxXQUFLRyxNQUFMLENBQVlGLGVBQVosQ0FBNEJpRSxRQUE1QixDQUFxQyxLQUFLeEUsVUFBTCxDQUFnQnVKLFNBQWhCLEdBQTRCLEtBQUt2SixVQUFMLENBQWdCTyxlQUE1QyxHQUE4RCxDQUFuRztBQUNBLFdBQUtFLE1BQUwsQ0FBWXlFLGVBQVosQ0FBNEJWLFFBQTVCLENBQXFDLEtBQUt4RSxVQUFMLENBQWdCa0YsZUFBckQ7QUFDQSxXQUFLekUsTUFBTCxDQUFZSixlQUFaLENBQTRCbUUsUUFBNUIsQ0FBcUMsS0FBS3hFLFVBQUwsQ0FBZ0JLLGVBQXJEO0FBQ0EsV0FBS0ksTUFBTCxDQUFZK0ksT0FBWixDQUFvQmhGLFFBQXBCLENBQTZCLEtBQUt4RSxVQUFMLENBQWdCd0osT0FBN0M7O0FBRUEsVUFBSUYsRUFBRUMsU0FBTixFQUFpQjtBQUNmLGFBQUs5SSxNQUFMLENBQVl1QixVQUFaLENBQXVCYSxNQUF2QjtBQUNELE9BRkQsTUFFTztBQUNMLGFBQUtwQyxNQUFMLENBQVl1QixVQUFaLENBQXVCaUUsT0FBdkI7QUFDRDtBQUNGLEtBbmdCOEY7O0FBcWdCL0Z5RCwyQkFBdUIsU0FBU0EscUJBQVQsQ0FBK0JDLElBQS9CLEVBQXFDQyxLQUFyQyxFQUE0QztBQUNqRSxhQUFPLHNEQUEwQkQsSUFBMUIsRUFBZ0NDLEtBQWhDLENBQVA7QUFDRCxLQXZnQjhGO0FBd2dCL0ZDLHNCQUFrQixTQUFTQSxnQkFBVCxDQUEwQjdKLFVBQTFCLEVBQXNDO0FBQ3RELFVBQUksT0FBT0EsVUFBUCxLQUFzQixRQUExQixFQUFvQztBQUNsQyxlQUFPQSxVQUFQO0FBQ0Q7O0FBRUQsYUFBTyxxQkFBTThKLFFBQU4sQ0FBZTlKLFVBQWYsRUFBMkIsSUFBM0IsQ0FBUDtBQUNELEtBOWdCOEY7QUErZ0IvRitKLDZCQUF5QixTQUFTQSx1QkFBVCxDQUFpQ0MsWUFBakMsRUFBK0M7QUFDdEUsVUFBTUMsTUFBTUMsUUFBWjtBQUNBLFVBQUlDLG1CQUFtQkgsWUFBdkI7O0FBRUEsVUFBSSxDQUFDRSxPQUFPRSxRQUFQLENBQWdCSixZQUFoQixDQUFMLEVBQW9DO0FBQ2xDRywyQkFBbUJELE9BQU9GLFlBQVAsQ0FBbkI7QUFDRDs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFNaEQsWUFBWW1ELGlCQUFpQkUsS0FBakIsR0FDZkMsT0FEZSxDQUNQLEtBRE8sRUFFZkMsS0FGZSxDQUVUTixJQUFJTSxLQUFKLEVBRlMsRUFHZkMsR0FIZSxDQUdYO0FBQ0hDLGlCQUFVQyxLQUFLQyxLQUFMLENBQVdWLElBQUlRLE9BQUosS0FBZ0IsS0FBSy9MLGFBQWhDLElBQWlELEtBQUtBLGFBQXZELEdBQXdFLEtBQUtBO0FBRG5GLE9BSFcsQ0FBbEI7O0FBT0EsYUFBT3NJLFNBQVA7QUFDRCxLQXJpQjhGO0FBc2lCL0Y0RCw4QkFBMEIsU0FBU0Esd0JBQVQsQ0FBa0NDLFdBQWxDLEVBQStDO0FBQ3ZFLGFBQU8sS0FBS2QsdUJBQUwsQ0FBNkJjLFdBQTdCLENBQVA7QUFDRCxLQXhpQjhGO0FBeWlCL0ZDLGtCQUFjLFNBQVNBLFlBQVQsR0FBd0I7QUFDcEMsV0FBSzNLLFNBQUwsQ0FBZTJLLFlBQWYsRUFBNkIxSyxTQUE3Qjs7QUFFQSxVQUFJNEcsWUFBWSxLQUFLK0MsdUJBQUwsQ0FBNkJHLFFBQTdCLENBQWhCO0FBQ0EsVUFBTWEsZUFBZSxLQUFLcEksT0FBTCxJQUFnQixLQUFLQSxPQUFMLENBQWFvSSxZQUFsRDtBQUNBLFVBQU1DLGdCQUFnQixLQUFLeEwsa0JBQUwsQ0FBd0J1TCxZQUF4QixLQUF5QyxFQUEvRDtBQUNBLFVBQU1FLG1CQUFtQnpJLElBQUlvQyxPQUFKLENBQVlzRyxXQUFaLElBQTJCMUksSUFBSW9DLE9BQUosQ0FBWXNHLFdBQVosQ0FBMkJGLGFBQTNCLGVBQTNCLElBQW1GLEVBQTVHO0FBQ0EsVUFBTUcsZUFBZTNJLElBQUlvQyxPQUFKLENBQVlzRyxXQUFaLElBQTJCMUksSUFBSW9DLE9BQUosQ0FBWXNHLFdBQVosQ0FBMkJGLGFBQTNCLG1CQUEzQixJQUF1RixJQUE1RztBQUNBLFVBQU1JLGdCQUFnQjVJLElBQUlvQyxPQUFKLENBQVlzRyxXQUFaLElBQTJCMUksSUFBSW9DLE9BQUosQ0FBWXNHLFdBQVosQ0FBMkJGLGFBQTNCLGdCQUEzQixJQUFvRixFQUExRzs7QUFFQSxVQUFJLEtBQUtySSxPQUFMLElBQWdCLEtBQUtBLE9BQUwsQ0FBYXdHLFdBQWpDLEVBQThDO0FBQzVDbkMsb0JBQVksS0FBSzRELHdCQUFMLENBQThCVixPQUFPLEtBQUt2SCxPQUFMLENBQWF3RyxXQUFwQixDQUE5QixDQUFaO0FBQ0Q7O0FBRUQsV0FBSzFJLE1BQUwsQ0FBWW1CLFNBQVosQ0FBc0I0QyxRQUF0QixDQUErQndDLFVBQVVxRSxNQUFWLEVBQS9CO0FBQ0EsV0FBSzVLLE1BQUwsQ0FBWTZLLElBQVosQ0FBaUI5RyxRQUFqQixDQUEwQnVHLFlBQTFCO0FBQ0EsV0FBS3RLLE1BQUwsQ0FBWWlHLFFBQVosQ0FBcUJsQyxRQUFyQixDQUE4QnlHLGdCQUE5QjtBQUNBLFdBQUt4SyxNQUFMLENBQVlTLEtBQVosQ0FBa0JzRCxRQUFsQixDQUEyQjJHLFlBQTNCO0FBQ0EsV0FBSzFLLE1BQUwsQ0FBWTBHLFFBQVosQ0FBcUIzQyxRQUFyQixDQUE4QjRHLGFBQTlCOztBQUVBLFVBQU12RyxPQUFPckMsSUFBSW9DLE9BQUosQ0FBWUMsSUFBekI7QUFDQSxVQUFJQSxJQUFKLEVBQVU7QUFDUixhQUFLcEUsTUFBTCxDQUFZb0gsTUFBWixDQUFtQnJELFFBQW5CLENBQTRCSyxLQUFLakMsSUFBakM7O0FBRUEsWUFBTTJJLGNBQWMsS0FBSzlLLE1BQUwsQ0FBWUssTUFBaEM7QUFDQXlLLG9CQUFZL0csUUFBWixDQUFxQkssSUFBckI7QUFDQSxhQUFLOUQsY0FBTCxDQUFvQjhELElBQXBCLEVBQTBCMEcsV0FBMUI7QUFDRDs7QUFFRCxVQUFNQyxRQUFRLEtBQUtsRyxjQUFMLEVBQWQ7O0FBRUEsVUFBTWlELGVBQWUsS0FBSzlILE1BQUwsQ0FBWVcsT0FBakM7QUFDQSxXQUFLQyxlQUFMLENBQXFCa0gsYUFBYXBELFFBQWIsRUFBckIsRUFBOENvRCxZQUE5Qzs7QUFFQSxVQUFNM0QsVUFBVzRHLFNBQVNBLE1BQU03SSxPQUFmLElBQTBCNkksTUFBTTdJLE9BQU4sQ0FBYzhJLE1BQXpDLElBQW9ERCxLQUFwRTtBQUNBLFVBQU1FLFNBQVM7QUFDYkMsa0JBQVUsS0FBS0MsbUJBREY7QUFFYkMsa0JBQVUsS0FBS0MsbUJBRkY7QUFHYkMsdUJBQWUsS0FBS0MsdUJBSFA7QUFJYkMsaUJBQVMsS0FBS0Msa0JBSkQ7QUFLYkMsZUFBTyxLQUFLQztBQUxDLE9BQWY7O0FBUUEsVUFBSXhILFdBQVc4RyxPQUFPOUcsUUFBUTdFLFlBQWYsQ0FBZixFQUE2QztBQUMzQzJMLGVBQU85RyxRQUFRN0UsWUFBZixFQUE2QnNNLElBQTdCLENBQWtDLElBQWxDLEVBQXdDekgsT0FBeEM7QUFDRDtBQUNGLEtBdmxCOEY7QUF3bEIvRlUsb0JBQWdCLFNBQVNBLGNBQVQsR0FBMEI7QUFDeEMsVUFBTWdILGFBQWE5SixJQUFJK0osc0JBQUosQ0FBMkIsVUFBQ2pELENBQUQsRUFBTztBQUNuRCxZQUFNMUUsVUFBVzBFLEVBQUUzRyxPQUFGLElBQWEyRyxFQUFFM0csT0FBRixDQUFVOEksTUFBeEIsSUFBbUNuQyxDQUFuRDs7QUFFQSxZQUFJLG9EQUFvRHZFLElBQXBELENBQXlESCxRQUFRN0UsWUFBakUsS0FBa0Y2RSxRQUFRN0IsR0FBOUYsRUFBbUc7QUFDakcsaUJBQU8sSUFBUDtBQUNEOztBQUVELGVBQU8sS0FBUDtBQUNELE9BUmtCLENBQW5CO0FBU0EsYUFBT3VKLFVBQVA7QUFDRCxLQW5tQjhGO0FBb21CL0ZWLHlCQUFxQixTQUFTQSxtQkFBVCxDQUE2QmhILE9BQTdCLEVBQXNDO0FBQ3pELFVBQU1yQyxPQUFPQyxJQUFJQyxPQUFKLENBQVltQyxRQUFRakcsRUFBcEIsQ0FBYjtBQUNBLFVBQU0wRCxRQUFRdUMsUUFBUXZDLEtBQVIsSUFBa0JFLFFBQVFBLEtBQUtGLEtBQS9CLElBQXlDdUMsT0FBdkQ7O0FBRUEsVUFBSSxDQUFDdkMsS0FBRCxJQUFVLENBQUNBLE1BQU1PLElBQXJCLEVBQTJCO0FBQ3pCO0FBQ0Q7O0FBRUQsVUFBTTJGLGVBQWUsS0FBSzlILE1BQUwsQ0FBWVcsT0FBakM7QUFDQW1ILG1CQUFhaUUsWUFBYixDQUEwQm5LLEtBQTFCO0FBQ0FrRyxtQkFBYS9ELFFBQWIsQ0FBc0I7QUFDcEIwRCxtQkFBVzdGLE1BQU1PLElBREc7QUFFcEIwRSxxQkFBYWpGLE1BQU15RjtBQUZDLE9BQXRCO0FBSUEsV0FBS3pHLGVBQUwsQ0FBcUJrSCxhQUFhcEQsUUFBYixFQUFyQixFQUE4Q29ELFlBQTlDO0FBQ0QsS0FubkI4RjtBQW9uQi9GdUQseUJBQXFCLFNBQVNBLG1CQUFULENBQTZCbEgsT0FBN0IsRUFBc0M7QUFDekQsVUFBTXJDLE9BQU9DLElBQUlDLE9BQUosQ0FBWW1DLFFBQVFqRyxFQUFwQixDQUFiO0FBQ0EsVUFBTTBELFFBQVF1QyxRQUFRdkMsS0FBUixJQUFrQkUsUUFBUUEsS0FBS0YsS0FBL0IsSUFBeUN1QyxPQUF2RDs7QUFFQSxVQUFJLENBQUN2QyxLQUFELElBQVUsQ0FBQ0EsTUFBTU8sSUFBckIsRUFBMkI7QUFDekI7QUFDRDs7QUFFRCxVQUFNNkosZUFBZSxLQUFLaE0sTUFBTCxDQUFZYSxPQUFqQzs7QUFFQW1MLG1CQUFhRCxZQUFiLENBQTBCbkssS0FBMUI7QUFDQW9LLG1CQUFhakksUUFBYixDQUFzQjtBQUNwQmtJLG1CQUFXckssTUFBTU8sSUFERztBQUVwQitKLHFCQUFhdEssTUFBTXlGO0FBRkMsT0FBdEI7O0FBS0EsV0FBS00sd0JBQUwsQ0FBOEJxRSxhQUFhdEgsUUFBYixFQUE5QixFQUF1RHNILFlBQXZEOztBQUVBLFVBQU1sRSxlQUFlLEtBQUs5SCxNQUFMLENBQVlXLE9BQWpDO0FBQ0FtSCxtQkFBYS9ELFFBQWIsQ0FBc0I7QUFDcEIwRCxtQkFBVyxrQkFBUS9DLFFBQVIsQ0FBaUI5QyxLQUFqQixFQUF3QixjQUF4QixDQURTO0FBRXBCaUYscUJBQWEsa0JBQVFuQyxRQUFSLENBQWlCOUMsS0FBakIsRUFBd0IscUJBQXhCO0FBRk8sT0FBdEI7O0FBS0EsVUFBSUEsTUFBTW1GLFNBQVYsRUFBcUI7QUFDbkIsWUFBTUMsYUFBYSxLQUFLaEgsTUFBTCxDQUFZaUgsV0FBL0I7QUFDQUQsbUJBQVdqRCxRQUFYLENBQW9CbkMsTUFBTW1GLFNBQTFCO0FBQ0Q7QUFDRixLQWhwQjhGO0FBaXBCL0YwRSx3QkFBb0IsU0FBU0Esa0JBQVQsQ0FBNEJ0SCxPQUE1QixFQUFxQztBQUN2RCxVQUFNckMsT0FBT0MsSUFBSUMsT0FBSixDQUFZbUMsUUFBUWpHLEVBQXBCLENBQWI7QUFDQSxVQUFNMEQsUUFBUXVDLFFBQVF2QyxLQUFSLElBQWtCRSxRQUFRQSxLQUFLRixLQUE3Qzs7QUFFQSxVQUFJLENBQUNBLEtBQUQsSUFBVSxDQUFDQSxNQUFNTyxJQUFyQixFQUEyQjtBQUN6QjtBQUNEOztBQUVELFVBQU1nSyxjQUFjLEtBQUtuTSxNQUFMLENBQVlpQixNQUFoQztBQUNBa0wsa0JBQVlKLFlBQVosQ0FBeUJuSyxLQUF6QjtBQUNBdUssa0JBQVlwSSxRQUFaLENBQXFCO0FBQ25CcUksa0JBQVV4SyxNQUFNTyxJQURHO0FBRW5Ca0ssc0JBQWN6SyxNQUFNeUY7QUFGRCxPQUFyQjtBQUlBLFdBQUtNLHdCQUFMLENBQThCd0UsWUFBWXpILFFBQVosRUFBOUIsRUFBc0R5SCxXQUF0RDs7QUFFQSxVQUFNSCxlQUFlLEtBQUtoTSxNQUFMLENBQVlhLE9BQWpDO0FBQ0FtTCxtQkFBYWpJLFFBQWIsQ0FBc0I7QUFDcEJrSSxtQkFBVyxrQkFBUXZILFFBQVIsQ0FBaUI5QyxLQUFqQixFQUF3QixjQUF4QixDQURTO0FBRXBCc0sscUJBQWEsa0JBQVF4SCxRQUFSLENBQWlCOUMsS0FBakIsRUFBd0IsZ0JBQXhCO0FBRk8sT0FBdEI7QUFJQSxXQUFLK0Ysd0JBQUwsQ0FBOEJxRSxhQUFhdEgsUUFBYixFQUE5QixFQUF1RHNILFlBQXZEOztBQUVBLFVBQU1sRSxlQUFlLEtBQUs5SCxNQUFMLENBQVlXLE9BQWpDO0FBQ0FtSCxtQkFBYS9ELFFBQWIsQ0FBc0I7QUFDcEIwRCxtQkFBVyxrQkFBUS9DLFFBQVIsQ0FBaUI5QyxLQUFqQixFQUF3QixjQUF4QixDQURTO0FBRXBCaUYscUJBQWEsa0JBQVFuQyxRQUFSLENBQWlCOUMsS0FBakIsRUFBd0IscUJBQXhCO0FBRk8sT0FBdEI7O0FBS0EsVUFBTWlHLFFBQVFqRyxTQUFTQSxNQUFNZixPQUFmLElBQTBCZSxNQUFNZixPQUFOLENBQWNrRyxTQUF4QyxJQUFxRG5GLFNBQVNBLE1BQU1qQixPQUFmLElBQTBCaUIsTUFBTWpCLE9BQU4sQ0FBYytHLFNBQTNHO0FBQ0EsVUFBSUcsS0FBSixFQUFXO0FBQ1QsWUFBTWIsYUFBYSxLQUFLaEgsTUFBTCxDQUFZaUgsV0FBL0I7QUFDQUQsbUJBQVdqRCxRQUFYLENBQW9COEQsS0FBcEI7QUFDRDtBQUNGLEtBbnJCOEY7QUFvckIvRjBELDZCQUF5QixTQUFTQSx1QkFBVCxDQUFpQ3BILE9BQWpDLEVBQTBDO0FBQ2pFLFVBQU1yQyxPQUFPQyxJQUFJQyxPQUFKLENBQVltQyxRQUFRakcsRUFBcEIsQ0FBYjtBQUNBLFVBQU0wRCxRQUFRdUMsUUFBUXZDLEtBQVIsSUFBa0JFLFFBQVFBLEtBQUtGLEtBQTdDOztBQUVBLFVBQUksQ0FBQ0EsS0FBRCxJQUFVLENBQUNBLE1BQU1PLElBQXJCLEVBQTJCO0FBQ3pCO0FBQ0Q7O0FBRUQsVUFBTW1LLG1CQUFtQixLQUFLdE0sTUFBTCxDQUFZZSxXQUFyQztBQUNBdUwsdUJBQWlCUCxZQUFqQixDQUE4Qm5LLEtBQTlCO0FBQ0EwSyx1QkFBaUJ2SSxRQUFqQixDQUEwQjtBQUN4QndJLHVCQUFlM0ssTUFBTU8sSUFERztBQUV4QnFLLHlCQUFpQjVLLE1BQU15RjtBQUZDLE9BQTFCOztBQUtBLFdBQUtNLHdCQUFMLENBQThCMkUsaUJBQWlCNUgsUUFBakIsRUFBOUIsRUFBMkQ0SCxnQkFBM0Q7O0FBRUEsVUFBTXhFLGVBQWUsS0FBSzlILE1BQUwsQ0FBWVcsT0FBakM7QUFDQW1ILG1CQUFhL0QsUUFBYixDQUFzQjtBQUNwQjBELG1CQUFXLGtCQUFRL0MsUUFBUixDQUFpQjlDLEtBQWpCLEVBQXdCLGNBQXhCLENBRFM7QUFFcEJpRixxQkFBYSxrQkFBUW5DLFFBQVIsQ0FBaUI5QyxLQUFqQixFQUF3QixxQkFBeEI7QUFGTyxPQUF0Qjs7QUFLQSxVQUFJQSxNQUFNakIsT0FBTixJQUFpQmlCLE1BQU1qQixPQUFOLENBQWMrRyxTQUFuQyxFQUE4QztBQUM1QyxZQUFNVixhQUFhLEtBQUtoSCxNQUFMLENBQVlpSCxXQUEvQjtBQUNBRCxtQkFBV2pELFFBQVgsQ0FBb0JuQyxNQUFNakIsT0FBTixDQUFjK0csU0FBbEM7QUFDRDtBQUNGLEtBL3NCOEY7QUFndEIvRmlFLHNCQUFrQixTQUFTQSxnQkFBVCxDQUEwQnhILE9BQTFCLEVBQW1DO0FBQ25ELFVBQU1yQyxPQUFPQyxJQUFJQyxPQUFKLENBQVltQyxRQUFRakcsRUFBcEIsQ0FBYjtBQUNBLFVBQU0wRCxRQUFRdUMsUUFBUXZDLEtBQVIsSUFBa0JFLFFBQVFBLEtBQUtGLEtBQTdDOztBQUVBLFVBQUksQ0FBQ0EsS0FBRCxJQUFVLENBQUNBLE1BQU1PLElBQXJCLEVBQTJCO0FBQ3pCO0FBQ0Q7O0FBRUQsVUFBTXNLLFlBQVksS0FBS3pNLE1BQUwsQ0FBWUMsSUFBOUI7QUFDQXdNLGdCQUFVVixZQUFWLENBQXVCbkssS0FBdkI7QUFDQTZLLGdCQUFVMUksUUFBVixDQUFtQjtBQUNqQlEsZ0JBQVEzQyxNQUFNTyxJQURHO0FBRWpCdUssa0JBQVU5SyxNQUFNeUY7QUFGQyxPQUFuQjtBQUlBLFdBQUtuSCxZQUFMLENBQWtCdU0sVUFBVS9ILFFBQVYsRUFBbEIsRUFBd0MrSCxTQUF4Qzs7QUFFQSxXQUFLek0sTUFBTCxDQUFZNkcsV0FBWixDQUF3QjlDLFFBQXhCLENBQWlDbkMsTUFBTStLLE9BQXZDOztBQUVBLFVBQU1DLGNBQWMsS0FBSzVNLE1BQUwsQ0FBWUcsTUFBaEM7QUFDQXlNLGtCQUFZN0ksUUFBWixDQUFxQkksUUFBUTdFLFlBQVIsS0FBeUIsT0FBOUM7QUFDQSxXQUFLYyxjQUFMLENBQW9Cd00sWUFBWWxJLFFBQVosRUFBcEIsRUFBNENrSSxXQUE1Qzs7QUFFQSxVQUFJaEwsTUFBTW1GLFNBQVYsRUFBcUI7QUFDbkIsWUFBTUMsYUFBYSxLQUFLaEgsTUFBTCxDQUFZaUgsV0FBL0I7QUFDQUQsbUJBQVdqRCxRQUFYLENBQW9CbkMsTUFBTW1GLFNBQTFCO0FBQ0Q7QUFDRixLQTF1QjhGO0FBMnVCL0Y4RixlQUFXLFNBQVNBLFNBQVQsQ0FBbUJDLE1BQW5CLEVBQTJCO0FBQ3BDLFVBQUlBLE9BQU8zTCxTQUFQLElBQW9CMkwsT0FBT0MsU0FBL0IsRUFBMEM7QUFDeEMsWUFBTUMsWUFBYSxLQUFLQyxjQUFMLENBQW9CSCxPQUFPM0wsU0FBM0IsQ0FBRCxHQUEwQ3NJLE9BQU9xRCxPQUFPM0wsU0FBZCxFQUN6RDRJLEdBRHlELENBQ3JEO0FBQ0hDLG1CQUFTOEMsT0FBTzNMLFNBQVAsQ0FBaUIrTCxpQkFBakI7QUFETixTQURxRCxFQUl6RHRDLE1BSnlELEdBS3pEdUMsT0FMeUQsRUFBMUMsR0FLSEwsT0FBTzNMLFNBQVAsQ0FBaUJnTSxPQUFqQixFQUxmOztBQU9BLFlBQU1DLE9BQU9KLFlBQVlGLE9BQU9DLFNBQVAsQ0FBaUJJLE9BQWpCLEVBQXpCLENBUndDLENBUWE7QUFDckQsWUFBTUUsV0FBV0QsUUFBUSxPQUFPLEVBQWYsQ0FBakI7O0FBRUFOLGVBQU9wRyxRQUFQLEdBQWtCLGlCQUFPNEcsS0FBUCxDQUFhRCxRQUFiLEVBQXVCLENBQXZCLENBQWxCO0FBQ0Q7O0FBRUQsV0FBSzNOLFNBQUwsQ0FBZW1OLFNBQWYsRUFBMEJsTixTQUExQjs7QUFFQSxXQUFLOEYsWUFBTDs7QUFFQSxVQUFJcUgsT0FBT3ZNLFFBQVgsRUFBcUI7QUFDbkIsYUFBS1AsTUFBTCxDQUFZaUcsUUFBWixDQUFxQlQsT0FBckI7QUFDQSxhQUFLeEYsTUFBTCxDQUFZbUcsUUFBWixDQUFxQi9ELE1BQXJCO0FBQ0QsT0FIRCxNQUdPO0FBQ0wsYUFBS3BDLE1BQUwsQ0FBWWlHLFFBQVosQ0FBcUI3RCxNQUFyQjtBQUNBLGFBQUtwQyxNQUFMLENBQVltRyxRQUFaLENBQXFCWCxPQUFyQjtBQUNEOztBQUVELFVBQUlzSCxPQUFPck0sS0FBWCxFQUFrQjtBQUNoQixhQUFLVCxNQUFMLENBQVkwRyxRQUFaLENBQXFCdEUsTUFBckI7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLcEMsTUFBTCxDQUFZMEcsUUFBWixDQUFxQmxCLE9BQXJCO0FBQ0Q7O0FBRUQsVUFBSSxLQUFLYixlQUFMLEVBQUosRUFBNEI7QUFDMUIsWUFBTWlJLGNBQWMsS0FBSzVNLE1BQUwsQ0FBWUcsTUFBaEM7QUFDQXlNLG9CQUFZN0ksUUFBWixDQUFxQixJQUFyQjtBQUNBLGFBQUszRCxjQUFMLENBQW9Cd00sWUFBWWxJLFFBQVosRUFBcEIsRUFBNENrSSxXQUE1QztBQUNBLGFBQUs1TSxNQUFMLENBQVlDLElBQVosQ0FBaUI4RCxRQUFqQixDQUEwQitJLE1BQTFCLEVBQWtDLElBQWxDO0FBQ0EsYUFBSzlNLE1BQUwsQ0FBWTZHLFdBQVosQ0FBd0I5QyxRQUF4QixDQUFpQytJLE9BQU9qRyxXQUF4QztBQUNEOztBQUVELFVBQU1qRixRQUFRLEtBQUtNLE9BQUwsQ0FBYU4sS0FBYixJQUFzQixLQUFLQSxLQUF6QztBQUNBLFVBQU0yTCxXQUFXLENBQUMsS0FBS3JMLE9BQUwsQ0FBYTBDLE1BQWQsSUFBd0IsQ0FBQyxLQUFLWixrQkFBTCxDQUF3QnBDLEtBQXhCLENBQTFDO0FBQ0EsVUFBTTRMLGdCQUFnQixDQUFDRCxRQUFELElBQWEsS0FBS3JKLHNCQUFMLENBQTRCdEMsS0FBNUIsQ0FBbkM7O0FBRUEsVUFBSTJMLFFBQUosRUFBYztBQUNaLGFBQUtsSSxhQUFMO0FBQ0Q7O0FBRUQsVUFBSW1JLGFBQUosRUFBbUI7QUFDakIsYUFBSy9ILFlBQUwsQ0FBa0IsVUFBQzZCLENBQUQsRUFBTztBQUN2QixjQUFJd0YsT0FBT3JNLEtBQVgsRUFBa0I7QUFDaEIsbUJBQVEsbUJBQUQsQ0FDSjZELElBREksQ0FDQ2dELEVBQUUvQixJQURIO0FBQVA7QUFFRDtBQUNELGlCQUFRLFVBQUQsQ0FDSmpCLElBREksQ0FDQ2dELEVBQUUvQixJQURIO0FBQVA7QUFFRCxTQVBEO0FBUUQ7O0FBRUQsV0FBS2hHLFVBQUwsQ0FBZ0I0QixTQUFoQixHQUE0Qm9ILE1BQU1DLE9BQU4sQ0FBY0MsZ0JBQWQsQ0FBK0JxRSxPQUFPM0wsU0FBdEMsQ0FBNUIsQ0E1RG9DLENBNEQwQztBQUM5RSxXQUFLNkcsZUFBTCxDQUFxQjhFLE1BQXJCO0FBQ0EsV0FBSzFMLGlCQUFMLENBQXVCLEtBQUtwQixNQUFMLENBQVltQixTQUFaLENBQXNCdUQsUUFBdEIsRUFBdkIsRUFBeUQsS0FBSzFFLE1BQUwsQ0FBWW1CLFNBQXJFO0FBQ0EsVUFBSSxLQUFLcUQsbUJBQVQsRUFBOEI7QUFDNUIsYUFBS3hFLE1BQUwsQ0FBWStJLE9BQVosQ0FBb0JqRCxJQUFwQjtBQUNEO0FBQ0YsS0E3eUI4RjtBQTh5Qi9GbUgsb0JBQWdCLFNBQVNBLGNBQVQsQ0FBd0JRLElBQXhCLEVBQThCO0FBQzVDLFVBQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQ1QsZUFBTyxLQUFQO0FBQ0Q7QUFDRCxVQUFJQSxLQUFLQyxXQUFMLE9BQXVCLENBQTNCLEVBQThCO0FBQzVCLGVBQU8sS0FBUDtBQUNEO0FBQ0QsVUFBSUQsS0FBS0UsYUFBTCxPQUF5QixDQUE3QixFQUFnQztBQUM5QixlQUFPLEtBQVA7QUFDRDtBQUNELFVBQUlGLEtBQUtHLGFBQUwsT0FBeUIsQ0FBN0IsRUFBZ0M7QUFDOUIsZUFBTyxLQUFQO0FBQ0Q7O0FBRUQsYUFBTyxJQUFQO0FBQ0QsS0E3ekI4RjtBQTh6Qi9GQyx5QkFBcUIsU0FBU0EsbUJBQVQsQ0FBNkJKLElBQTdCLEVBQW1DO0FBQ3RELFVBQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQ1QsZUFBTyxLQUFQO0FBQ0Q7QUFDRCxVQUFJQSxLQUFLSyxRQUFMLE9BQW9CLENBQXhCLEVBQTJCO0FBQ3pCLGVBQU8sS0FBUDtBQUNEO0FBQ0QsVUFBSUwsS0FBS00sVUFBTCxPQUFzQixDQUExQixFQUE2QjtBQUMzQixlQUFPLEtBQVA7QUFDRDtBQUNELFVBQUlOLEtBQUtPLFVBQUwsT0FBc0IsQ0FBMUIsRUFBNkI7QUFDM0IsZUFBTyxLQUFQO0FBQ0Q7O0FBRUQsYUFBTyxJQUFQO0FBQ0QsS0E3MEI4RjtBQTgwQi9GQyxlQUFXLFNBQVNBLFNBQVQsR0FBcUI7QUFDOUIsVUFBTUMsbUJBQW1CLEtBQUtsTyxNQUFMLENBQVltQixTQUFaLENBQXNCZ04sT0FBdEIsRUFBekI7QUFDQSxVQUFNQyxrQkFBa0IsS0FBS3BPLE1BQUwsQ0FBWTBHLFFBQVosQ0FBcUJ5SCxPQUFyQixFQUF4QjtBQUNBLFVBQU1FLGFBQWEsS0FBS3JPLE1BQUwsQ0FBWTBHLFFBQVosQ0FBcUJoQyxRQUFyQixFQUFuQjtBQUNBLFVBQU00QixXQUFXLEtBQUt0RyxNQUFMLENBQVlPLFFBQVosQ0FBcUJtRSxRQUFyQixFQUFqQjtBQUNBLFVBQUk2QixZQUFZLEtBQUt2RyxNQUFMLENBQVltQixTQUFaLENBQXNCdUQsUUFBdEIsRUFBaEI7QUFDQSxVQUFJb0ksU0FBUyxLQUFLcE4sU0FBTCxDQUFldU8sU0FBZixFQUEwQnRPLFNBQTFCLENBQWI7O0FBRUE7QUFDQSxVQUFJMkcsUUFBSixFQUFjO0FBQ1p3RyxlQUFPM0wsU0FBUCxHQUFtQm9GLFlBQVksS0FBS0MsZ0JBQUwsQ0FBc0JELFNBQXRCLEVBQWlDLElBQWpDLENBQS9CO0FBQ0Q7O0FBRUQ7QUFDQSxVQUFJQSxjQUFjMkgsb0JBQW9CRSxlQUFsQyxDQUFKLEVBQXdEO0FBQ3REdEIsaUJBQVNBLFVBQVUsRUFBbkI7QUFDQSxZQUFNd0IsWUFBWSxLQUFLQyxnQkFBTCxDQUFzQmhJLFNBQXRCLEVBQWlDRCxRQUFqQyxFQUEyQytILFVBQTNDLENBQWxCO0FBQ0F2QixlQUFPQyxTQUFQLEdBQW1CdUIsU0FBbkI7QUFDRDs7QUFFRCxhQUFPeEIsTUFBUDtBQUNELEtBbjJCOEY7QUFvMkIvRjBCLHdCQUFvQixTQUFTQSxrQkFBVCxHQUE4QjtBQUNoRCxVQUFNQyxPQUFPLEVBQWI7O0FBRUEsV0FBSyxJQUFNQyxRQUFYLElBQXVCLEtBQUtuUixpQkFBNUIsRUFBK0M7QUFDN0MsWUFBSSxLQUFLQSxpQkFBTCxDQUF1Qm9SLGNBQXZCLENBQXNDRCxRQUF0QyxDQUFKLEVBQXFEO0FBQ25ERCxlQUFLRyxJQUFMLENBQVU7QUFDUnpNLGtCQUFNdU0sUUFERTtBQUVSckgseUJBQWEsS0FBSzlKLGlCQUFMLENBQXVCbVIsUUFBdkI7QUFGTCxXQUFWO0FBSUQ7QUFDRjs7QUFFRCxhQUFPO0FBQ0xHLG9CQUFZSjtBQURQLE9BQVA7QUFHRCxLQW4zQjhGO0FBbzNCL0ZLLHdCQUFvQixTQUFTQSxrQkFBVCxHQUE4QjtBQUNoRCxVQUFNTCxPQUFPLEVBQWI7O0FBRUEsV0FBSyxJQUFNQyxRQUFYLElBQXVCLEtBQUs1USxpQkFBNUIsRUFBK0M7QUFDN0MsWUFBSSxLQUFLQSxpQkFBTCxDQUF1QjZRLGNBQXZCLENBQXNDRCxRQUF0QyxDQUFKLEVBQXFEO0FBQ25ERCxlQUFLRyxJQUFMLENBQVU7QUFDUnpNLGtCQUFNdU0sUUFERTtBQUVSckgseUJBQWEsS0FBS3ZKLGlCQUFMLENBQXVCNFEsUUFBdkI7QUFGTCxXQUFWO0FBSUQ7QUFDRjs7QUFFRCxhQUFPO0FBQ0xHLG9CQUFZSjtBQURQLE9BQVA7QUFHRCxLQW40QjhGO0FBbzRCL0ZNLHlCQUFxQixTQUFTQSxtQkFBVCxHQUErQjtBQUNsRCxhQUFPLHFCQUFNOUcsdUJBQU4sQ0FBOEIsS0FBS2pJLE1BQUwsQ0FBWW1CLFNBQVosQ0FBc0J1RCxRQUF0QixFQUE5QixDQUFQO0FBQ0QsS0F0NEI4RjtBQXU0Qi9Gc0ssMEJBQXNCLFNBQVNBLG9CQUFULENBQThCQyxjQUE5QixFQUE4Q0MsU0FBOUMsRUFBeURDLFFBQXpELEVBQW1FO0FBQ3ZGLGFBQU8saUJBQU9DLFVBQVAsQ0FBa0JGLFNBQWxCLEVBQTZCLENBQUMsa0JBQVF4SyxRQUFSLENBQWlCdUssY0FBakIsRUFBaUNFLFlBQVksTUFBN0MsQ0FBRCxDQUE3QixDQUFQO0FBQ0QsS0F6NEI4RjtBQTA0Qi9GM0ksc0JBQWtCLFNBQVNBLGdCQUFULENBQTBCNkksZ0JBQTFCLEVBQTRDL0ksUUFBNUMsRUFBc0Q7QUFDdEUsVUFBSSxDQUFDK0ksZ0JBQUwsRUFBdUI7QUFDckIsZUFBTyxJQUFQO0FBQ0Q7O0FBRUQsVUFBSTlJLFlBQVk4SSxnQkFBaEI7QUFDQSxVQUFNQyxpQkFBaUIsS0FBS3JDLGNBQUwsQ0FBb0IxRyxTQUFwQixLQUFrQyxLQUFLc0gsbUJBQUwsQ0FBeUJ0SCxTQUF6QixDQUF6RDs7QUFFQSxVQUFJRCxRQUFKLEVBQWM7QUFDWixZQUFJLENBQUNnSixjQUFMLEVBQXFCO0FBQ25CLGNBQUlDLFVBQVU5RixPQUFPbEQsU0FBUCxDQUFkO0FBQ0FnSixvQkFBVTlGLE9BQU8rRixHQUFQLENBQVdELFFBQVFFLE1BQVIsQ0FBZSxZQUFmLENBQVgsRUFBeUMsWUFBekMsQ0FBVjtBQUNBRixrQkFBUXhGLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLENBQXZCO0FBQ0F4RCxzQkFBWWdKLFFBQVEzRSxNQUFSLEVBQVo7QUFDRDtBQUNGLE9BUEQsTUFPTztBQUNMLFlBQUkwRSxjQUFKLEVBQW9CO0FBQ2xCLGNBQU1JLGNBQWNqRyxRQUFwQjtBQUNBLGNBQU04RixXQUFVOUYsT0FBT2xELFNBQVAsQ0FBaEI7QUFDQWdKLG1CQUFRSSxRQUFSLENBQWlCO0FBQ2YzRixxQkFBU3VGLFNBQVFLLFNBQVI7QUFETSxXQUFqQjtBQUdBTCxtQkFBUXpGLEtBQVIsQ0FBYzRGLFlBQVk1RixLQUFaLEVBQWQ7QUFDQXlGLG1CQUFRdkYsT0FBUixDQUFnQjBGLFlBQVkxRixPQUFaLEVBQWhCO0FBQ0F1RixtQkFBUU0sT0FBUixDQUFnQixDQUFoQjtBQUNBdEosc0JBQVlnSixTQUFRM0UsTUFBUixFQUFaO0FBQ0Q7QUFDRjs7QUFFRCxhQUFPckUsU0FBUDtBQUNELEtBeDZCOEY7QUF5NkIvRmdJLHNCQUFrQixTQUFTQSxnQkFBVCxDQUEwQmhJLFNBQTFCLEVBQXFDRCxRQUFyQyxFQUErQytILFVBQS9DLEVBQTJEO0FBQzNFLFVBQUlDLGtCQUFKO0FBQ0EsVUFBSSxDQUFDL0gsU0FBTCxFQUFnQjtBQUNkLGVBQU8sSUFBUDtBQUNEOztBQUVELFVBQUlELFFBQUosRUFBYztBQUNaLFlBQU1pSixVQUFVOUYsT0FBT2xELFNBQVAsQ0FBaEI7QUFDQWdKLGdCQUFRSSxRQUFSLENBQWlCO0FBQ2YzRixtQkFBU3VGLFFBQVFLLFNBQVI7QUFETSxTQUFqQjtBQUdBTCxnQkFBUXpGLEtBQVIsQ0FBYyxFQUFkO0FBQ0F5RixnQkFBUXZGLE9BQVIsQ0FBZ0IsQ0FBaEI7QUFDQXVGLGdCQUFRTSxPQUFSLENBQWdCLENBQWhCO0FBQ0F2QixvQkFBWWlCLFFBQVEzRSxNQUFSLEVBQVo7QUFDQTBELG9CQUFZN0UsT0FBTzZFLFNBQVAsRUFDVDFFLEtBRFMsR0FFVEcsR0FGUyxDQUVMO0FBQ0grRixnQkFBTSxDQUFDO0FBREosU0FGSyxFQUtUL0YsR0FMUyxDQUtMO0FBQ0hDLG1CQUFTLENBQUMsQ0FBRCxHQUFLcUU7QUFEWCxTQUxLLEVBUVR6RCxNQVJTLEVBQVo7QUFTRCxPQWxCRCxNQWtCTztBQUNMMEQsb0JBQVk3RSxPQUFPbEQsU0FBUCxFQUNUcUQsS0FEUyxHQUVURyxHQUZTLENBRUw7QUFDSEMsbUJBQVMsQ0FBQyxDQUFELEdBQUtxRTtBQURYLFNBRkssRUFLVHpELE1BTFMsRUFBWjtBQU1EOztBQUVELGFBQU8wRCxTQUFQO0FBQ0QsS0EzOEI4RjtBQTQ4Qi9GeUIsa0JBQWMsU0FBU0EsWUFBVCxHQUF3QjtBQUNwQyxhQUFPLEtBQUtDLE1BQUwsS0FBZ0IsS0FBS0EsTUFBTCxHQUFjLENBQUM7QUFDcEN6SyxjQUFNLE1BRDhCO0FBRXBDNEosa0JBQVUsTUFGMEI7QUFHcENqRyxjQUFNO0FBSDhCLE9BQUQsRUFJbEM7QUFDRDNCLG1CQUFXLE1BRFY7QUFFRDBJLGVBQU8sS0FBS2pVLGFBRlg7QUFHRHVKLGNBQU0sYUFITDtBQUlENEosa0JBQVUsYUFKVDtBQUtEZSxrQkFBVSxLQUFLakgscUJBQUwsQ0FBMkJrSCxZQUEzQixDQUF3QyxJQUF4QyxFQUE4QyxhQUE5QyxDQUxUO0FBTURDLGVBQU8sS0FBS3BWLDRCQU5YO0FBT0RxVixpQkFBUyxVQVBSO0FBUURuSCxjQUFNLFVBUkw7QUFTRG9ILHVCQUFlLEVBVGQ7QUFVREMsbUJBQVcsb0JBQVVDLG9CQVZwQjtBQVdEQyxtQkFBVztBQVhWLE9BSmtDLEVBZ0JsQztBQUNEUixlQUFPLEtBQUtyVSxhQURYO0FBRUQ4VSxzQkFBYyxLQUZiO0FBR0RuTCxjQUFNLFdBSEw7QUFJRDRKLGtCQUFVLFdBSlQ7QUFLRGlCLGVBQU8sS0FBS3ZVLGtCQUxYO0FBTURxTixjQUFNLE1BTkw7QUFPRHBILGNBQU07QUFQTCxPQWhCa0MsRUF3QmxDO0FBQ0R5RCxjQUFNLFVBREw7QUFFRDRKLGtCQUFVLFVBRlQ7QUFHRGMsZUFBTyxLQUFLaFYsWUFIWDtBQUlEaU8sY0FBTSxNQUpMO0FBS0RvSCx1QkFBZSxHQUxkO0FBTURDLG1CQUFXLG9CQUFVQztBQU5wQixPQXhCa0MsRUErQmxDO0FBQ0RQLGVBQU8sS0FBS25VLFlBRFg7QUFFRHlKLGNBQU0sVUFGTDtBQUdENEosa0JBQVUsVUFIVDtBQUlEZSxrQkFBVSxZQUpUO0FBS0RFLGVBQU8sS0FBS3JVLGlCQUxYO0FBTURtTixjQUFNLFVBTkw7QUFPRG9ILHVCQUFlLEVBUGQ7QUFRREMsbUJBQVcsb0JBQVVDO0FBUnBCLE9BL0JrQyxFQXdDbEM7QUFDRGpKLG1CQUFXLE1BRFY7QUFFRDBJLGVBQU8sS0FBSzVVLFlBRlg7QUFHRGtLLGNBQU0sVUFITDtBQUlENEosa0JBQVUsVUFKVDtBQUtEZSxrQkFBVSxLQUFLakgscUJBQUwsQ0FBMkJrSCxZQUEzQixDQUF3QyxJQUF4QyxFQUE4QyxVQUE5QyxDQUxUO0FBTURFLGlCQUFTLFVBTlI7QUFPREQsZUFBTyxLQUFLclYseUJBUFg7QUFRRG1PLGNBQU0sVUFSTDtBQVNEb0gsdUJBQWUsRUFUZDtBQVVEQyxtQkFBVyxvQkFBVUM7QUFWcEIsT0F4Q2tDLEVBbURsQztBQUNEUCxlQUFPLEtBQUsvVCxZQURYO0FBRURxSixjQUFNLFdBRkw7QUFHRDRKLGtCQUFVLFdBSFQ7QUFJRGpHLGNBQU0sTUFKTDtBQUtENUMsa0JBQVUsS0FMVDtBQU1ERCx3QkFBZ0IsSUFOZjtBQU9Ec0ssOEJBQXNCLElBUHJCO0FBUUR2Syx3QkFBaUJyRSxJQUFJMEUsYUFBSixFQUFELEdBQXdCLEtBQUtySyxvQkFBN0IsR0FBb0QsS0FBS0Qsa0JBUnhFO0FBU0R5VSxrQkFBVyxJQUFJQyxJQUFKLENBQVMsSUFBVCxFQUFlLENBQWYsRUFBa0IsQ0FBbEIsQ0FUVjtBQVVETixtQkFBVyxDQUNULG9CQUFVTyxNQURELEVBRVQsb0JBQVVDLGFBRkQ7QUFWVixPQW5Ea0MsRUFpRWxDO0FBQ0Q3SCxjQUFNLE1BREw7QUFFRDNELGNBQU0sU0FGTDtBQUdENEosa0JBQVUsU0FIVDtBQUlEd0IsOEJBQXNCLElBSnJCO0FBS0RLLGlCQUFTO0FBTFIsT0FqRWtDLEVBdUVsQztBQUNEekosbUJBQVcsV0FEVjtBQUVEMEksZUFBTyxLQUFLM1QsV0FGWDtBQUdEOFQsZUFBTyxLQUFLNVQsa0JBSFg7QUFJRCtJLGNBQU0sY0FKTDtBQUtENEosa0JBQVUsY0FMVDtBQU1EakcsY0FBTSxRQU5MO0FBT0RwSCxjQUFNLGFBUEw7QUFRRFMsY0FBTSxLQUFLd00sbUJBQUwsQ0FBeUJvQixZQUF6QixDQUFzQyxJQUF0QyxDQVJMO0FBU0RjLGlCQUFTO0FBVFIsT0F2RWtDLEVBaUZsQztBQUNEMUosbUJBQVcsY0FEVjtBQUVEMEksZUFBTyxLQUFLMVQsYUFGWDtBQUdEZ0osY0FBTSxZQUhMO0FBSUQ0SixrQkFBVSxZQUpUO0FBS0RqRyxjQUFNLGFBTEw7QUFNRGdJLGlCQUFTLEdBTlI7QUFPRHBQLGNBQU0saUJBUEw7QUFRRG1QLGlCQUFTLElBUlI7QUFTREUscUJBQWEsS0FBSy9ILGdCQUFMLENBQXNCK0csWUFBdEIsQ0FBbUMsSUFBbkM7QUFUWixPQWpGa0MsRUEyRmxDO0FBQ0RqSCxjQUFNLFFBREw7QUFFRDNELGNBQU0sYUFGTDtBQUdENEosa0JBQVUsYUFIVDtBQUlENkIsaUJBQVM7QUFKUixPQTNGa0MsRUFnR2xDO0FBQ0Q5SCxjQUFNLFFBREw7QUFFRDNELGNBQU0saUJBRkw7QUFHRDRKLGtCQUFVLGlCQUhUO0FBSUQ2QixpQkFBUztBQUpSLE9BaEdrQyxFQXFHbEM7QUFDRDlILGNBQU0sUUFETDtBQUVEM0QsY0FBTSxpQkFGTDtBQUdENEosa0JBQVUsaUJBSFQ7QUFJRDZCLGlCQUFTO0FBSlIsT0FyR2tDLEVBMEdsQztBQUNEOUgsY0FBTSxRQURMO0FBRUQzRCxjQUFNLFdBRkw7QUFHRDRKLGtCQUFVLFdBSFQ7QUFJRDZCLGlCQUFTO0FBSlIsT0ExR2tDLEVBK0dsQztBQUNEOUgsY0FBTSxRQURMO0FBRUQzRCxjQUFNLGlCQUZMO0FBR0Q0SixrQkFBVSxpQkFIVDtBQUlENkIsaUJBQVM7QUFKUixPQS9Ha0MsRUFvSGxDO0FBQ0RmLGVBQU8sS0FBS3hULFlBRFg7QUFFRDhJLGNBQU0sVUFGTDtBQUdENEosa0JBQVUsVUFIVDtBQUlEakcsY0FBTTtBQUpMLE9BcEhrQyxFQXlIbEM7QUFDRCtHLGVBQU8sS0FBSzNVLFlBRFg7QUFFRDhVLGVBQU8sS0FBSzdVLGlCQUZYO0FBR0RnSyxjQUFNLFVBSEw7QUFJRDRKLGtCQUFVLFVBSlQ7QUFLRGpHLGNBQU0sVUFMTDtBQU1EcEgsY0FBTSxhQU5MO0FBT0RTLGNBQU0sS0FBS3VNLGtCQUFMO0FBUEwsT0F6SGtDLEVBaUlsQztBQUNEdkosY0FBTSxPQURMO0FBRUQ0SixrQkFBVSxPQUZUO0FBR0RjLGVBQU8sS0FBSzlVLFNBSFg7QUFJRCtOLGNBQU07QUFKTCxPQWpJa0MsRUFzSWxDO0FBQ0QrRyxlQUFPLEtBQUs3VSxZQURYO0FBRURnVixlQUFPLEtBQUsxVSxpQkFGWDtBQUdEc1YsaUJBQVMsS0FIUjtBQUlEekwsY0FBTSxVQUpMO0FBS0Q0SixrQkFBVSxVQUxUO0FBTURqRyxjQUFNLFVBTkw7QUFPRHBILGNBQU0sYUFQTDtBQVFEUyxjQUFNLEtBQUtpTSxrQkFBTDtBQVJMLE9BdElrQyxFQStJbEM7QUFDRHlCLGVBQU8sS0FBS2hVLFlBRFg7QUFFRHNKLGNBQU0sVUFGTDtBQUdENEosa0JBQVUsVUFIVDtBQUlEakcsY0FBTTtBQUpMLE9BL0lrQyxFQW9KbEM7QUFDREEsY0FBTSxRQURMO0FBRUQzRCxjQUFNLFFBRkw7QUFHRDRKLGtCQUFVO0FBSFQsT0FwSmtDLEVBd0psQztBQUNEYyxlQUFPLEtBQUt0VSxVQURYO0FBRUQ0SixjQUFNLFFBRkw7QUFHRDRKLGtCQUFVLFFBSFQ7QUFJRDZCLGlCQUFTLElBSlI7QUFLRDlILGNBQU0sUUFMTDtBQU1Ea0ksMEJBQWtCLElBTmpCO0FBT0R0UCxjQUFNO0FBUEwsT0F4SmtDLEVBZ0tsQztBQUNEbU8sZUFBTyxLQUFLL1MsVUFEWDtBQUVEcUksY0FBTSxRQUZMO0FBR0Q0SixrQkFBVSxRQUhUO0FBSUQ2QixpQkFBUyxLQUpSO0FBS0Q5SCxjQUFNLFNBTEw7QUFNRG1JLGdCQUFRLEtBQUtsVSxPQU5aO0FBT0RtVSxpQkFBUyxLQUFLbFU7QUFQYixPQWhLa0MsRUF3S2xDO0FBQ0Q2UyxlQUFPLEtBQUtyVCxXQURYO0FBRUQySSxjQUFNLFNBRkw7QUFHRDRKLGtCQUFVLFNBSFQ7QUFJRGpHLGNBQU0sUUFKTDtBQUtEcUksbUJBQVcsRUFMVjtBQU1ETCxpQkFBUyxHQU5SO0FBT0RNLDBCQUFrQixXQVBqQjtBQVFEQywyQkFBbUIsYUFSbEI7QUFTRDNQLGNBQU07QUFUTCxPQXhLa0MsRUFrTGxDO0FBQ0R5RixtQkFBVyxTQURWO0FBRUQwSSxlQUFPLEtBQUtwVCxXQUZYO0FBR0QwSSxjQUFNLFNBSEw7QUFJRDRKLGtCQUFVLFNBSlQ7QUFLRGpHLGNBQU0sUUFMTDtBQU1EcUksbUJBQVcsRUFOVjtBQU9ETCxpQkFBUyxTQUFTQSxPQUFULENBQWlCUSxPQUFqQixFQUEwQmhNLEtBQTFCLEVBQWlDO0FBQ3hDLGNBQUlBLFVBQVUsSUFBZCxFQUFvQjtBQUNsQmdNLG9CQUFRLEtBQUtGLGdCQUFiLElBQWlDLElBQWpDO0FBQ0FFLG9CQUFRLEtBQUtELGlCQUFiLElBQWtDLElBQWxDO0FBQ0Q7QUFDRixTQVpBO0FBYURELDBCQUFrQixXQWJqQjtBQWNEQywyQkFBbUIsYUFkbEI7QUFlRDNQLGNBQU0saUJBZkw7QUFnQkQwRixlQUFPLEtBQUt3SCxvQkFBTCxDQUEwQm1CLFlBQTFCLENBQ0wsSUFESyxFQUNDLHNCQURELEVBQ3lCLFdBRHpCO0FBaEJOLE9BbExrQyxFQXFNbEM7QUFDRDVJLG1CQUFXLFNBRFY7QUFFRDBJLGVBQU8sS0FBS25ULGVBRlg7QUFHRHlJLGNBQU0sYUFITDtBQUlENEosa0JBQVUsYUFKVDtBQUtEakcsY0FBTSxRQUxMO0FBTURxSSxtQkFBVyxFQU5WO0FBT0RMLGlCQUFTLFNBQVNBLE9BQVQsQ0FBaUJRLE9BQWpCLEVBQTBCaE0sS0FBMUIsRUFBaUM7QUFDeEMsY0FBSUEsVUFBVSxJQUFkLEVBQW9CO0FBQ2xCZ00sb0JBQVEsS0FBS0YsZ0JBQWIsSUFBaUMsSUFBakM7QUFDQUUsb0JBQVEsS0FBS0QsaUJBQWIsSUFBa0MsSUFBbEM7QUFDRDtBQUNGLFNBWkE7QUFhREQsMEJBQWtCLGVBYmpCO0FBY0RDLDJCQUFtQixpQkFkbEI7QUFlRDNQLGNBQU0scUJBZkw7QUFnQkQwRixlQUFPLEtBQUt3SCxvQkFBTCxDQUEwQm1CLFlBQTFCLENBQ0wsSUFESyxFQUNDLHNCQURELEVBQ3lCLFdBRHpCO0FBaEJOLE9Bck1rQyxFQXdObEM7QUFDRDVJLG1CQUFXLFNBRFY7QUFFRDBJLGVBQU8sS0FBS2xULGdCQUZYO0FBR0R3SSxjQUFNLFFBSEw7QUFJRDRKLGtCQUFVLFFBSlQ7QUFLRGpHLGNBQU0sUUFMTDtBQU1EcUksbUJBQVcsRUFOVjtBQU9ETCxpQkFBUyxTQUFTQSxPQUFULENBQWlCUSxPQUFqQixFQUEwQmhNLEtBQTFCLEVBQWlDO0FBQ3hDLGNBQUlBLFVBQVUsSUFBZCxFQUFvQjtBQUNsQmdNLG9CQUFRLEtBQUtGLGdCQUFiLElBQWlDLElBQWpDO0FBQ0FFLG9CQUFRLEtBQUtELGlCQUFiLElBQWtDLElBQWxDO0FBQ0Q7QUFDRixTQVpBO0FBYURELDBCQUFrQixVQWJqQjtBQWNEQywyQkFBbUIsY0FkbEI7QUFlRDNQLGNBQU0sZ0JBZkw7QUFnQkQwRixlQUFPLEtBQUt3SCxvQkFBTCxDQUEwQm1CLFlBQTFCLENBQ0wsSUFESyxFQUNDLHNCQURELEVBQ3lCLFdBRHpCO0FBaEJOLE9BeE5rQyxFQTJPbEM7QUFDREYsZUFBTyxLQUFLaFQsUUFEWDtBQUVEc0ksY0FBTSxNQUZMO0FBR0Q0SixrQkFBVSxNQUhUO0FBSURqRyxjQUFNLFFBSkw7QUFLRHFJLG1CQUFXLEVBTFY7QUFNREwsaUJBQVMsR0FOUjtBQU9ETSwwQkFBa0IsUUFQakI7QUFRREMsMkJBQW1CLFVBUmxCO0FBU0QzUCxjQUFNO0FBVEwsT0EzT2tDLEVBcVBsQztBQUNEbU8sZUFBTyxLQUFLalQsV0FEWDtBQUVEdUksY0FBTSxhQUZMO0FBR0Q0SixrQkFBVSxhQUhUO0FBSURqRyxjQUFNO0FBSkwsT0FyUGtDLEVBMFBsQztBQUNEM0QsY0FBTSxhQURMO0FBRUQ0SixrQkFBVSxhQUZUO0FBR0RjLGVBQU8sS0FBSzVTLFNBSFg7QUFJRDZMLGNBQU0sT0FKTDtBQUtEb0gsdUJBQWUsRUFMZDtBQU1EQyxtQkFBVyxvQkFBVUM7QUFOcEIsT0ExUGtDLENBQTlCLENBQVA7QUFrUUQ7QUEvc0M4RixHQUFqRixDQUFoQjs7b0JBa3RDZTFWLE8iLCJmaWxlIjoiRWRpdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBjb25uZWN0IGZyb20gJ2Rvam8vX2Jhc2UvY29ubmVjdCc7XHJcbmltcG9ydCBzdHJpbmcgZnJvbSAnZG9qby9zdHJpbmcnO1xyXG5pbXBvcnQgZW52aXJvbm1lbnQgZnJvbSAnLi4vLi4vRW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgdmFsaWRhdG9yIGZyb20gJy4uLy4uL1ZhbGlkYXRvcic7XHJcbmltcG9ydCB1dGlsaXR5IGZyb20gJ2FyZ29zL1V0aWxpdHknO1xyXG5pbXBvcnQgRWRpdCBmcm9tICdhcmdvcy9FZGl0JztcclxuaW1wb3J0IHJlY3VyIGZyb20gJy4uLy4uL1JlY3VycmVuY2UnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJ2FyZ29zL0Zvcm1hdCc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCB7IGdldFBpY2tsaXN0QnlBY3Rpdml0eVR5cGUgfSBmcm9tICcuLi8uLi9Nb2RlbHMvQWN0aXZpdHkvQWN0aXZpdHlUeXBlUGlja2xpc3RzJztcclxuXHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdhY3Rpdml0eUVkaXQnKTtcclxuY29uc3QgZHRGb3JtYXRSZXNvdXJjZSA9IGdldFJlc291cmNlKCdhY3Rpdml0eUVkaXREYXRlVGltZUZvcm1hdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuQWN0aXZpdHkuRWRpdFxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5FZGl0XHJcbiAqXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLkFjdGl2aXR5LkVkaXQnLCBbRWRpdF0sIC8qKiBAbGVuZHMgY3JtLlZpZXdzLkFjdGl2aXR5LkVkaXQjICove1xyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIGFjdGl2aXR5Q2F0ZWdvcnlUaXRsZVRleHQ6IHJlc291cmNlLmFjdGl2aXR5Q2F0ZWdvcnlUaXRsZVRleHQsXHJcbiAgYWN0aXZpdHlEZXNjcmlwdGlvblRpdGxlVGV4dDogcmVzb3VyY2UuYWN0aXZpdHlEZXNjcmlwdGlvblRpdGxlVGV4dCxcclxuICBsb2NhdGlvblRleHQ6IHJlc291cmNlLmxvY2F0aW9uVGV4dCxcclxuICBhY3Rpdml0eVR5cGVUaXRsZVRleHQ6IHJlc291cmNlLmFjdGl2aXR5VHlwZVRpdGxlVGV4dCxcclxuICBhbGFybVRleHQ6IHJlc291cmNlLmFsYXJtVGV4dCxcclxuICByZW1pbmRlclRleHQ6IHJlc291cmNlLnJlbWluZGVyVGV4dCxcclxuICBjYXRlZ29yeVRleHQ6IHJlc291cmNlLmNhdGVnb3J5VGV4dCxcclxuICBkdXJhdGlvblRleHQ6IHJlc291cmNlLmR1cmF0aW9uVGV4dCxcclxuICBkdXJhdGlvblRpdGxlVGV4dDogcmVzb3VyY2UuZHVyYXRpb25UaXRsZVRleHQsXHJcbiAgZHVyYXRpb25JbnZhbGlkVGV4dDogcmVzb3VyY2UuZHVyYXRpb25JbnZhbGlkVGV4dCxcclxuICByZW1pbmRlckludmFsaWRUZXh0OiByZXNvdXJjZS5yZW1pbmRlckludmFsaWRUZXh0LFxyXG4gIHJlbWluZGVyVGl0bGVUZXh0OiByZXNvdXJjZS5yZW1pbmRlckludmFsaWRUZXh0LFxyXG4gIGxlYWRlclRleHQ6IHJlc291cmNlLmxlYWRlclRleHQsXHJcbiAgbG9uZ05vdGVzVGV4dDogcmVzb3VyY2UubG9uZ05vdGVzVGV4dCxcclxuICBsb25nTm90ZXNUaXRsZVRleHQ6IHJlc291cmNlLmxvbmdOb3Rlc1RpdGxlVGV4dCxcclxuICBwcmlvcml0eVRleHQ6IHJlc291cmNlLnByaW9yaXR5VGV4dCxcclxuICBwcmlvcml0eVRpdGxlVGV4dDogcmVzb3VyY2UucHJpb3JpdHlUaXRsZVRleHQsXHJcbiAgcmVnYXJkaW5nVGV4dDogcmVzb3VyY2UucmVnYXJkaW5nVGV4dCxcclxuICByb2xsb3ZlclRleHQ6IHJlc291cmNlLnJvbGxvdmVyVGV4dCxcclxuICBzdGFydGluZ1RleHQ6IHJlc291cmNlLnN0YXJ0aW5nVGV4dCxcclxuICBzdGFydGluZ0Zvcm1hdFRleHQ6IGR0Rm9ybWF0UmVzb3VyY2Uuc3RhcnRpbmdGb3JtYXRUZXh0LFxyXG4gIHN0YXJ0aW5nRm9ybWF0VGV4dDI0OiBkdEZvcm1hdFJlc291cmNlLnN0YXJ0aW5nRm9ybWF0VGV4dDI0LFxyXG4gIHN0YXJ0aW5nVGltZWxlc3NGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLnN0YXJ0aW5nVGltZWxlc3NGb3JtYXRUZXh0LFxyXG4gIHJlcGVhdHNUZXh0OiByZXNvdXJjZS5yZXBlYXRzVGV4dCxcclxuICByZWN1cnJpbmdUZXh0OiByZXNvdXJjZS5yZWN1cnJpbmdUZXh0LFxyXG4gIHJlY3VycmluZ1RpdGxlVGV4dDogcmVzb3VyY2UucmVjdXJyaW5nVGl0bGVUZXh0LFxyXG4gIHRpbWVsZXNzVGV4dDogcmVzb3VyY2UudGltZWxlc3NUZXh0LFxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIHR5cGVUZXh0OiByZXNvdXJjZS50eXBlVGV4dCxcclxuICBhY2NvdW50VGV4dDogcmVzb3VyY2UuYWNjb3VudFRleHQsXHJcbiAgY29udGFjdFRleHQ6IHJlc291cmNlLmNvbnRhY3RUZXh0LFxyXG4gIG9wcG9ydHVuaXR5VGV4dDogcmVzb3VyY2Uub3Bwb3J0dW5pdHlUZXh0LFxyXG4gIHRpY2tldE51bWJlclRleHQ6IHJlc291cmNlLnRpY2tldE51bWJlclRleHQsXHJcbiAgY29tcGFueVRleHQ6IHJlc291cmNlLmNvbXBhbnlUZXh0LFxyXG4gIGxlYWRUZXh0OiByZXNvdXJjZS5sZWFkVGV4dCxcclxuICBpc0xlYWRUZXh0OiByZXNvdXJjZS5pc0xlYWRUZXh0LFxyXG4gIHllc1RleHQ6IHJlc291cmNlLnllc1RleHQsXHJcbiAgbm9UZXh0OiByZXNvdXJjZS5ub1RleHQsXHJcbiAgcGhvbmVUZXh0OiByZXNvdXJjZS5waG9uZVRleHQsXHJcbiAgdXBkYXRlVXNlckFjdEVycm9yVGV4dDogcmVzb3VyY2UudXBkYXRlVXNlckFjdEVycm9yVGV4dCxcclxuICByZW1pbmRlclZhbHVlVGV4dDoge1xyXG4gICAgMDogcmVzb3VyY2Uubm9uZVRleHQsXHJcbiAgICA1OiByZXNvdXJjZS5maXZlTWluVGV4dCxcclxuICAgIDE1OiByZXNvdXJjZS5xdWFydGVySG91clRleHQsXHJcbiAgICAzMDogcmVzb3VyY2UuaGFsZkhvdXJUZXh0LFxyXG4gICAgNjA6IHJlc291cmNlLmhvdXJUZXh0LFxyXG4gICAgMTQ0MDogcmVzb3VyY2UuZGF5VGV4dCxcclxuICB9LFxyXG4gIGR1cmF0aW9uVmFsdWVUZXh0OiB7XHJcbiAgICAwOiByZXNvdXJjZS5ub25lVGV4dCxcclxuICAgIDE1OiByZXNvdXJjZS5xdWFydGVySG91clRleHQsXHJcbiAgICAzMDogcmVzb3VyY2UuaGFsZkhvdXJUZXh0LFxyXG4gICAgNjA6IHJlc291cmNlLmhvdXJUZXh0LFxyXG4gICAgOTA6IHJlc291cmNlLmhvdXJBbmRIYWxmVGV4dCxcclxuICAgIDEyMDogcmVzb3VyY2UudHdvSG91cnNUZXh0LFxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfVxyXG4gICAqIFRoZSBudW1iZXIgb2YgbWludXRlcyB0aGF0IHNob3VsZCBiZSByb3VuZGVkIHRvIGFzIGEgZGVmYXVsdCBzdGFydCB3aGVuIGNyZWF0aW5nIGEgbmV3IGFjdGl2aXR5XHJcbiAgICovXHJcbiAgUk9VTkRfTUlOVVRFUzogMTUsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnYWN0aXZpdHlfZWRpdCcsXHJcbiAgZGV0YWlsVmlldzogJ2FjdGl2aXR5X2RldGFpbCcsXHJcbiAgZmllbGRzRm9yTGVhZHM6IFsnQWNjb3VudE5hbWUnLCAnTGVhZCddLFxyXG4gIGZpZWxkc0ZvclN0YW5kYXJkOiBbJ0FjY291bnQnLCAnQ29udGFjdCcsICdPcHBvcnR1bml0eScsICdUaWNrZXQnXSxcclxuICAvKipcclxuICAgKiBAZGVwcmVjYXRlZCBVc2UgQWN0aXZpdHlUeXBlUGlja2xpc3RzIGZyb20gTW9kZXMvQWN0aXZpdHkvQWN0aXZpdHlUeXBlUGlja2xpc3RzIGluc3RlYWRcclxuICAgKi9cclxuICBwaWNrbGlzdHNCeVR5cGU6IHtcclxuICAgIGF0QXBwb2ludG1lbnQ6IHtcclxuICAgICAgQ2F0ZWdvcnk6ICdNZWV0aW5nIENhdGVnb3J5IENvZGVzJyxcclxuICAgICAgRGVzY3JpcHRpb246ICdNZWV0aW5nIFJlZ2FyZGluZycsXHJcbiAgICB9LFxyXG4gICAgYXRMaXRlcmF0dXJlOiB7XHJcbiAgICAgIERlc2NyaXB0aW9uOiAnTGl0IFJlcXVlc3QgUmVnYXJkaW5nJyxcclxuICAgIH0sXHJcbiAgICBhdFBlcnNvbmFsOiB7XHJcbiAgICAgIENhdGVnb3J5OiAnTWVldGluZyBDYXRlZ29yeSBDb2RlcycsXHJcbiAgICAgIERlc2NyaXB0aW9uOiAnUGVyc29uYWwgQWN0aXZpdHkgUmVnYXJkaW5nJyxcclxuICAgIH0sXHJcbiAgICBhdFBob25lQ2FsbDoge1xyXG4gICAgICBDYXRlZ29yeTogJ1Bob25lIENhbGwgQ2F0ZWdvcnkgQ29kZXMnLFxyXG4gICAgICBEZXNjcmlwdGlvbjogJ1Bob25lIENhbGwgUmVnYXJkaW5nJyxcclxuICAgIH0sXHJcbiAgICBhdFRvRG86IHtcclxuICAgICAgQ2F0ZWdvcnk6ICdUbyBEbyBDYXRlZ29yeSBDb2RlcycsXHJcbiAgICAgIERlc2NyaXB0aW9uOiAnVG8gRG8gUmVnYXJkaW5nJyxcclxuICAgIH0sXHJcbiAgICBhdEVNYWlsOiB7XHJcbiAgICAgIENhdGVnb3J5OiAnRS1tYWlsIENhdGVnb3J5IENvZGVzJyxcclxuICAgICAgRGVzY3JpcHRpb246ICdFLW1haWwgUmVnYXJkaW5nJyxcclxuICAgIH0sXHJcbiAgfSxcclxuICBncm91cE9wdGlvbnNCeVR5cGU6IHtcclxuICAgIGF0VG9EbzogJ0FjdGl2aXR5VG9Eb09wdGlvbnMnLFxyXG4gICAgYXRQZXJzb25hbDogJ0FjdGl2aXR5UGVyc29uYWxPcHRpb25zJyxcclxuICAgIGF0UGhvbmVDYWxsOiAnQWN0aXZpdHlQaG9uZU9wdGlvbnMnLFxyXG4gICAgYXRBcHBvaW50bWVudDogJ0FjdGl2aXR5TWVldGluZ09wdGlvbnMnLFxyXG4gIH0sXHJcblxyXG4gIGVudGl0eU5hbWU6ICdBY3Rpdml0eScsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5BQ1RJVklUWSxcclxuICBpbnNlcnRTZWN1cml0eTogbnVsbCwgLy8gJ0VudGl0aWVzL0FjdGl2aXR5L0FkZCcsXHJcbiAgdXBkYXRlU2VjdXJpdHk6IG51bGwsIC8vICdFbnRpdGllcy9BY3Rpdml0eS9FZGl0JyxcclxuICBjb250cmFjdE5hbWU6ICdzeXN0ZW0nLFxyXG4gIHJlc291cmNlS2luZDogJ2FjdGl2aXRpZXMnLFxyXG4gIHJlY3VycmVuY2U6IG51bGwsXHJcbiAgX3ByZXZpb3VzUmVjdXJyZW5jZTogbnVsbCxcclxuXHJcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGluaXQsIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgdGhpcy5yZWN1cnJlbmNlID0ge1xyXG4gICAgICBSZWN1ckl0ZXJhdGlvbnM6ICcwJyxcclxuICAgICAgUmVjdXJQZXJpb2Q6ICctMScsXHJcbiAgICAgIFJlY3VyUGVyaW9kU3BlYzogJzAnLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuTGVhZCwgJ29uQ2hhbmdlJywgdGhpcy5vbkxlYWRDaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLklzTGVhZCwgJ29uQ2hhbmdlJywgdGhpcy5vbklzTGVhZENoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuTGVhZGVyLCAnb25DaGFuZ2UnLCB0aGlzLm9uTGVhZGVyQ2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5UaW1lbGVzcywgJ29uQ2hhbmdlJywgdGhpcy5vblRpbWVsZXNzQ2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5BbGFybSwgJ29uQ2hhbmdlJywgdGhpcy5vbkFsYXJtQ2hhbmdlKTtcclxuXHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuQWNjb3VudCwgJ29uQ2hhbmdlJywgdGhpcy5vbkFjY291bnRDaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLkNvbnRhY3QsICdvbkNoYW5nZScsIHRoaXMub25Db250YWN0Q2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5PcHBvcnR1bml0eSwgJ29uQ2hhbmdlJywgdGhpcy5vbk9wcG9ydHVuaXR5Q2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5UaWNrZXQsICdvbkNoYW5nZScsIHRoaXMub25UaWNrZXRDaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLlN0YXJ0RGF0ZSwgJ29uQ2hhbmdlJywgdGhpcy5vblN0YXJ0RGF0ZUNoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuUmVjdXJyZW5jZVVJLCAnb25DaGFuZ2UnLCB0aGlzLm9uUmVjdXJyZW5jZVVJQ2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5SZWN1cnJlbmNlLCAnb25DaGFuZ2UnLCB0aGlzLm9uUmVjdXJyZW5jZUNoYW5nZSk7XHJcbiAgfSxcclxuICBvbkFkZENvbXBsZXRlOiBmdW5jdGlvbiBvbkFkZENvbXBsZXRlKCkge1xyXG4gICAgZW52aXJvbm1lbnQucmVmcmVzaEFjdGl2aXR5TGlzdHMoKTtcclxuICAgIHRoaXMuaW5oZXJpdGVkKG9uQWRkQ29tcGxldGUsIGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBvblB1dENvbXBsZXRlOiBmdW5jdGlvbiBvblB1dENvbXBsZXRlKGVudHJ5LCB1cGRhdGVkRW50cnkpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLmRldGFpbFZpZXcpO1xyXG4gICAgY29uc3Qgb3JpZ2luYWxLZXkgPSAodGhpcy5vcHRpb25zLmVudHJ5ICYmIHRoaXMub3B0aW9ucy5lbnRyeS4ka2V5KSB8fCB1cGRhdGVkRW50cnkuJGtleTtcclxuXHJcbiAgICB0aGlzLmVuYWJsZSgpO1xyXG5cclxuICAgIGVudmlyb25tZW50LnJlZnJlc2hBY3Rpdml0eUxpc3RzKCk7XHJcbiAgICBjb25uZWN0LnB1Ymxpc2goJy9hcHAvcmVmcmVzaCcsIFt7XHJcbiAgICAgIHJlc291cmNlS2luZDogdGhpcy5yZXNvdXJjZUtpbmQsXHJcbiAgICAgIGtleTogdXBkYXRlZEVudHJ5LiRrZXksXHJcbiAgICAgIGRhdGE6IHVwZGF0ZWRFbnRyeSxcclxuICAgIH1dKTtcclxuXHJcbiAgICBpZiAodXBkYXRlZEVudHJ5LiRrZXkgIT09IG9yaWdpbmFsS2V5ICYmIHZpZXcpIHtcclxuICAgICAgLy8gRWRpdGluZyBzaW5nbGUgb2NjdXJyZW5jZSByZXN1bHRzIGluIG5ldyAka2V5L3JlY29yZFxyXG4gICAgICB2aWV3LnNob3coe1xyXG4gICAgICAgIGtleTogdXBkYXRlZEVudHJ5LiRrZXksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICByZXR1cm5UbzogLTIsXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vblVwZGF0ZUNvbXBsZXRlZCh1cGRhdGVkRW50cnkpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgY29udmVydEVudHJ5OiBmdW5jdGlvbiBjb252ZXJ0RW50cnkoKSB7XHJcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuaW5oZXJpdGVkKGNvbnZlcnRFbnRyeSwgYXJndW1lbnRzKTtcclxuICAgIGlmICghdGhpcy5vcHRpb25zLmVudHJ5KSB7XHJcbiAgICAgIGlmIChlbnRyeSAmJiBlbnRyeS5MZWFkZXIuJGtleSkge1xyXG4gICAgICAgIHRoaXMucmVxdWVzdExlYWRlcihlbnRyeS5MZWFkZXIuJGtleSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZW50cnk7XHJcbiAgfSxcclxuICByZXF1ZXN0TGVhZGVyOiBmdW5jdGlvbiByZXF1ZXN0TGVhZGVyKHVzZXJJZCkge1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBTYWdlLlNEYXRhLkNsaWVudC5TRGF0YVNpbmdsZVJlc291cmNlUmVxdWVzdCh0aGlzLmdldENvbm5lY3Rpb24oKSlcclxuICAgICAgLnNldFJlc291cmNlS2luZCgndXNlcnMnKVxyXG4gICAgICAuc2V0UmVzb3VyY2VTZWxlY3RvcihgJyR7dXNlcklkfSdgKVxyXG4gICAgICAuc2V0UXVlcnlBcmcoJ3NlbGVjdCcsIFtcclxuICAgICAgICAnVXNlckluZm8vRmlyc3ROYW1lJyxcclxuICAgICAgICAnVXNlckluZm8vTGFzdE5hbWUnLFxyXG4gICAgICBdLmpvaW4oJywnKSk7XHJcblxyXG4gICAgcmVxdWVzdC5yZWFkKHtcclxuICAgICAgc3VjY2VzczogdGhpcy5wcm9jZXNzTGVhZGVyLFxyXG4gICAgICBmYWlsdXJlOiB0aGlzLnJlcXVlc3RMZWFkZXJGYWlsdXJlLFxyXG4gICAgICBzY29wZTogdGhpcyxcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgcmVxdWVzdExlYWRlckZhaWx1cmU6IGZ1bmN0aW9uIHJlcXVlc3RMZWFkZXJGYWlsdXJlKCkge30sXHJcbiAgcHJvY2Vzc0xlYWRlcjogZnVuY3Rpb24gcHJvY2Vzc0xlYWRlcihsZWFkZXIpIHtcclxuICAgIGlmIChsZWFkZXIpIHtcclxuICAgICAgdGhpcy5lbnRyeS5MZWFkZXIgPSBsZWFkZXI7XHJcbiAgICAgIHRoaXMuZmllbGRzLkxlYWRlci5zZXRWYWx1ZShsZWFkZXIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgY3VycmVudFVzZXJDYW5FZGl0OiBmdW5jdGlvbiBjdXJyZW50VXNlckNhbkVkaXQoZW50cnkpIHtcclxuICAgIHJldHVybiAoZW50cnkgJiYgKGVudHJ5LkFsbG93RWRpdCkpO1xyXG4gIH0sXHJcbiAgY3VycmVudFVzZXJDYW5TZXRBbGFybTogZnVuY3Rpb24gY3VycmVudFVzZXJDYW5TZXRBbGFybShlbnRyeSkge1xyXG4gICAgcmV0dXJuICEhZW50cnkgJiYgKGVudHJ5LkxlYWRlci4ka2V5ID09PSBBcHAuY29udGV4dC51c2VyLiRrZXkpO1xyXG4gIH0sXHJcbiAgaXNBY3Rpdml0eUZvckxlYWQ6IGZ1bmN0aW9uIGlzQWN0aXZpdHlGb3JMZWFkKGVudHJ5KSB7XHJcbiAgICByZXR1cm4gZW50cnkgJiYgL15bXFx3XXsxMn0kLy50ZXN0KGVudHJ5LkxlYWRJZCk7XHJcbiAgfSxcclxuICBpc0FjdGl2aXR5UmVjdXJyaW5nOiBmdW5jdGlvbiBpc0FjdGl2aXR5UmVjdXJyaW5nKCkge1xyXG4gICAgcmV0dXJuICgvcnN0TWFzdGVyLylcclxuICAgICAgLnRlc3QodGhpcy5maWVsZHMuUmVjdXJyZW5jZVN0YXRlLmdldFZhbHVlKCkpO1xyXG4gIH0sXHJcbiAgaXNJbkxlYWRDb250ZXh0OiBmdW5jdGlvbiBpc0luTGVhZENvbnRleHQoKSB7XHJcbiAgICBjb25zdCBpbnNlcnQgPSB0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmluc2VydDtcclxuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5lbnRyeTtcclxuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLl9nZXROYXZDb250ZXh0KCk7XHJcbiAgICBsZXQgaXNMZWFkQ29udGV4dCA9IGZhbHNlO1xyXG5cclxuICAgIGlmIChjb250ZXh0LnJlc291cmNlS2luZCA9PT0gJ2xlYWRzJykge1xyXG4gICAgICBpc0xlYWRDb250ZXh0ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBsZWFkID0gKGluc2VydCAmJiBpc0xlYWRDb250ZXh0KSB8fCB0aGlzLmlzQWN0aXZpdHlGb3JMZWFkKGVudHJ5KTtcclxuXHJcbiAgICByZXR1cm4gISFsZWFkO1xyXG4gIH0sXHJcbiAgYmVmb3JlVHJhbnNpdGlvblRvOiBmdW5jdGlvbiBiZWZvcmVUcmFuc2l0aW9uVG8oKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChiZWZvcmVUcmFuc2l0aW9uVG8sIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgLy8gd2UgaGlkZSB0aGUgbGVhZCBvciBzdGFuZGFyZCBmaWVsZHMgaGVyZSwgYXMgdGhlIHZpZXcgaXMgY3VycmVudGx5IGhpZGRlbiwgaW4gb3JkZXIgdG8gcHJldmVudCBmbGFzaGluZy5cclxuICAgIC8vIHRoZSB2YWx1ZSBmb3IgdGhlICdJc0xlYWQnIGZpZWxkIHdpbGwgYmUgc2V0IGxhdGVyLCBiYXNlZCBvbiB0aGUgdmFsdWUgZGVyaXZlZCBoZXJlLlxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pc0ZvckxlYWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vcHRpb25zLmlzRm9yTGVhZCA9IHRoaXMuaXNJbkxlYWRDb250ZXh0KCk7XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pc0ZvckxlYWQpIHtcclxuICAgICAgdGhpcy5zaG93RmllbGRzRm9yTGVhZCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zaG93RmllbGRzRm9yU3RhbmRhcmQoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGRpc2FibGVGaWVsZHM6IGZ1bmN0aW9uIGRpc2FibGVGaWVsZHMocHJlZGljYXRlKSB7XHJcbiAgICBmb3IgKGNvbnN0IG5hbWUgaW4gdGhpcy5maWVsZHMpIHtcclxuICAgICAgaWYgKCFwcmVkaWNhdGUgfHwgcHJlZGljYXRlKHRoaXMuZmllbGRzW25hbWVdKSkge1xyXG4gICAgICAgIHRoaXMuZmllbGRzW25hbWVdLmRpc2FibGUoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZW5hYmxlRmllbGRzOiBmdW5jdGlvbiBlbmFibGVGaWVsZHMocHJlZGljYXRlKSB7XHJcbiAgICBmb3IgKGNvbnN0IG5hbWUgaW4gdGhpcy5maWVsZHMpIHtcclxuICAgICAgaWYgKCFwcmVkaWNhdGUgfHwgcHJlZGljYXRlKHRoaXMuZmllbGRzW25hbWVdKSkge1xyXG4gICAgICAgIHRoaXMuZmllbGRzW25hbWVdLmVuYWJsZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBvbklzTGVhZENoYW5nZTogZnVuY3Rpb24gb25Jc0xlYWRDaGFuZ2UodmFsdWUpIHtcclxuICAgIHRoaXMub3B0aW9ucy5pc0ZvckxlYWQgPSB2YWx1ZTtcclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmlzRm9yTGVhZCkge1xyXG4gICAgICB0aGlzLnNob3dGaWVsZHNGb3JMZWFkKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNob3dGaWVsZHNGb3JTdGFuZGFyZCgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2hvd0ZpZWxkc0ZvckxlYWQ6IGZ1bmN0aW9uIHNob3dGaWVsZHNGb3JMZWFkKCkge1xyXG4gICAgdGhpcy5maWVsZHNGb3JTdGFuZGFyZC5jb25jYXQodGhpcy5maWVsZHNGb3JMZWFkcykuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5maWVsZHNbaXRlbV0pIHtcclxuICAgICAgICB0aGlzLmZpZWxkc1tpdGVtXS5oaWRlKCk7XHJcbiAgICAgIH1cclxuICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuZmllbGRzRm9yTGVhZHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5maWVsZHNbaXRlbV0pIHtcclxuICAgICAgICB0aGlzLmZpZWxkc1tpdGVtXS5zaG93KCk7XHJcbiAgICAgIH1cclxuICAgIH0sIHRoaXMpO1xyXG4gIH0sXHJcbiAgc2hvd0ZpZWxkc0ZvclN0YW5kYXJkOiBmdW5jdGlvbiBzaG93RmllbGRzRm9yU3RhbmRhcmQoKSB7XHJcbiAgICB0aGlzLmZpZWxkc0ZvclN0YW5kYXJkLmNvbmNhdCh0aGlzLmZpZWxkc0ZvckxlYWRzKS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmZpZWxkc1tpdGVtXSkge1xyXG4gICAgICAgIHRoaXMuZmllbGRzW2l0ZW1dLmhpZGUoKTtcclxuICAgICAgfVxyXG4gICAgfSwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5maWVsZHNGb3JTdGFuZGFyZC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmZpZWxkc1tpdGVtXSkge1xyXG4gICAgICAgIHRoaXMuZmllbGRzW2l0ZW1dLnNob3coKTtcclxuICAgICAgfVxyXG4gICAgfSwgdGhpcyk7XHJcbiAgfSxcclxuICB0b2dnbGVTZWxlY3RGaWVsZDogZnVuY3Rpb24gdG9nZ2xlU2VsZWN0RmllbGQoZmllbGQsIGRpc2FibGUpIHtcclxuICAgIGlmIChkaXNhYmxlKSB7XHJcbiAgICAgIGZpZWxkLmRpc2FibGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZpZWxkLmVuYWJsZSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25UaW1lbGVzc0NoYW5nZTogZnVuY3Rpb24gb25UaW1lbGVzc0NoYW5nZSh2YWx1ZSkge1xyXG4gICAgdGhpcy50b2dnbGVTZWxlY3RGaWVsZCh0aGlzLmZpZWxkcy5EdXJhdGlvbiwgdmFsdWUpO1xyXG4gICAgY29uc3Qgc3RhcnREYXRlRmllbGQgPSB0aGlzLmZpZWxkcy5TdGFydERhdGU7XHJcblxyXG4gICAgaWYgKHZhbHVlKSB7IC8vIFN0YXJ0RGF0ZSB0aW1lbGVzc1xyXG4gICAgICB0aGlzLmZpZWxkcy5Sb2xsb3Zlci5lbmFibGUoKTtcclxuICAgICAgc3RhcnREYXRlRmllbGQuZGF0ZUZvcm1hdFRleHQgPSB0aGlzLnN0YXJ0aW5nVGltZWxlc3NGb3JtYXRUZXh0O1xyXG4gICAgICBzdGFydERhdGVGaWVsZC5zaG93VGltZVBpY2tlciA9IGZhbHNlO1xyXG4gICAgICBzdGFydERhdGVGaWVsZC50aW1lbGVzcyA9IHRydWU7XHJcbiAgICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IHRoaXMuX2dldE5ld1N0YXJ0RGF0ZShzdGFydERhdGVGaWVsZC5nZXRWYWx1ZSgpLCB0cnVlKTtcclxuXHJcbiAgICAgIGlmIChzdGFydERhdGUpIHtcclxuICAgICAgICBzdGFydERhdGVGaWVsZC5zZXRWYWx1ZShzdGFydERhdGUpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgeyAvLyBTdGFydERhdGUgd2l0aCBvdXQgdGltZSAoVGltZWxlc3MpXHJcbiAgICAgIHRoaXMuZmllbGRzLlJvbGxvdmVyLnNldFZhbHVlKGZhbHNlKTtcclxuICAgICAgdGhpcy5maWVsZHMuUm9sbG92ZXIuZGlzYWJsZSgpO1xyXG4gICAgICBzdGFydERhdGVGaWVsZC5kYXRlRm9ybWF0VGV4dCA9IChBcHAuaXMyNEhvdXJDbG9jaygpKSA/IHRoaXMuc3RhcnRpbmdGb3JtYXRUZXh0MjQgOiB0aGlzLnN0YXJ0aW5nRm9ybWF0VGV4dDtcclxuICAgICAgc3RhcnREYXRlRmllbGQuc2hvd1RpbWVQaWNrZXIgPSB0cnVlO1xyXG4gICAgICBzdGFydERhdGVGaWVsZC50aW1lbGVzcyA9IGZhbHNlO1xyXG4gICAgICBjb25zdCBzdGFydERhdGUgPSB0aGlzLl9nZXROZXdTdGFydERhdGUoc3RhcnREYXRlRmllbGQuZ2V0VmFsdWUoKSwgZmFsc2UpO1xyXG5cclxuICAgICAgaWYgKHN0YXJ0RGF0ZSkge1xyXG4gICAgICAgIHN0YXJ0RGF0ZUZpZWxkLnNldFZhbHVlKHN0YXJ0RGF0ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIG9uQWxhcm1DaGFuZ2U6IGZ1bmN0aW9uIG9uQWxhcm1DaGFuZ2UoKSB7XHJcbiAgICBpZiAodGhpcy5maWVsZHMuQWxhcm0uZ2V0VmFsdWUoKSkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5SZW1pbmRlci5lbmFibGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLlJlbWluZGVyLmRpc2FibGUoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uTGVhZENoYW5nZTogZnVuY3Rpb24gb25MZWFkQ2hhbmdlKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gZmllbGQuZ2V0U2VsZWN0aW9uKCk7XHJcblxyXG4gICAgaWYgKHNlbGVjdGlvbiAmJiB0aGlzLmluc2VydCkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5BY2NvdW50TmFtZS5zZXRWYWx1ZSh1dGlsaXR5LmdldFZhbHVlKHNlbGVjdGlvbiwgJ0NvbXBhbnknKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZW50cnkgPSBmaWVsZC5jdXJyZW50U2VsZWN0aW9uO1xyXG4gICAgaWYgKGVudHJ5LldvcmtQaG9uZSkge1xyXG4gICAgICBjb25zdCBwaG9uZUZpZWxkID0gdGhpcy5maWVsZHMuUGhvbmVOdW1iZXI7XHJcbiAgICAgIHBob25lRmllbGQuc2V0VmFsdWUoZW50cnkuV29ya1Bob25lKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uTGVhZGVyQ2hhbmdlOiBmdW5jdGlvbiBvbkxlYWRlckNoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIGNvbnN0IHVzZXIgPSBmaWVsZC5nZXRWYWx1ZSgpO1xyXG4gICAgbGV0IHJlc291cmNlSWQgPSAnJztcclxuXHJcbiAgICBsZXQga2V5ID0gdXNlci4ka2V5O1xyXG5cclxuICAgIC8vIFRoZSBrZXkgaXMgYSBjb21wb3NpdGUga2V5IG9uIGFjdGl2aXR5cmVzb3VyY2V2aWV3cyBlbmRwb2ludC5cclxuICAgIC8vIFRoZSBmb3JtYXQgaXMgJ1Jlc291cmNlSWQtQWNjZXNzSWQnLlxyXG4gICAgLy8gVGhlIGZlZWQgZG9lcyBpbmNsdWRlIHRoZXNlIGFzIHNlcGVyYXRlIGZpZWxkcywgYnV0IHdlIG5lZWQgdG8ga2VlcCB0aGUgJGtleS8kZGVzY3JpcHRvciBmb3JtYXQgZm9yIGRvaW5nXHJcbiAgICAvLyB0aGUgUFVUIHRvIHRoZSBhY3Rpdml0aWVzIGVuZHBvaW50LiBXZSB3aWxsIGNvbnZlcnQgdGhlIGNvbXBvc2l0ZSBrZXkgdG8gc29tZXRoaW5nIHRoZSBhY3Rpdml0aWVzIGVuZHBvaW50IHdpbGwgdW5kZXJzdGFuZC5cclxuICAgIGlmIChrZXkpIHtcclxuICAgICAga2V5ID0ga2V5LnNwbGl0KCctJyk7XHJcbiAgICAgIHJlc291cmNlSWQgPSBrZXlbMF07XHJcbiAgICAgIGlmIChyZXNvdXJjZUlkKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZHMuVXNlcklkLnNldFZhbHVlKHJlc291cmNlSWQpO1xyXG5cclxuICAgICAgICAvLyBTZXQgYmFjayB0byBhIHNpbmdsZSAka2V5IHNvIHRoZSBQVVQgcmVxdWVzdCBwYXlsb2FkIGlzIG5vdCBtZXNzZWQgdXBcclxuICAgICAgICB0aGlzLmZpZWxkcy5MZWFkZXIuc2V0VmFsdWUoe1xyXG4gICAgICAgICAgJGtleTogcmVzb3VyY2VJZCxcclxuICAgICAgICAgICRkZXNjcmlwdG9yOiB1c2VyLiRkZXNjcmlwdG9yLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBvbkFjY291bnRDaGFuZ2U6IGZ1bmN0aW9uIG9uQWNjb3VudENoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIGNvbnN0IGZpZWxkcyA9IHRoaXMuZmllbGRzO1xyXG4gICAgWydDb250YWN0JywgJ09wcG9ydHVuaXR5JywgJ1RpY2tldCddLmZvckVhY2goKGYpID0+IHtcclxuICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgZmllbGRzW2ZdLmRlcGVuZHNPbiA9ICdBY2NvdW50JztcclxuICAgICAgICBmaWVsZHNbZl0ud2hlcmUgPSBgQWNjb3VudC5JZCBlcSBcIiR7dmFsdWUuQWNjb3VudElkIHx8IHZhbHVlLmtleX1cImA7XHJcblxyXG4gICAgICAgIGlmIChmaWVsZHNbZl0uY3VycmVudFNlbGVjdGlvbiAmJlxyXG4gICAgICAgICAgZmllbGRzW2ZdLmN1cnJlbnRTZWxlY3Rpb24uQWNjb3VudC4ka2V5ICE9PSAodmFsdWUuQWNjb3VudElkIHx8IHZhbHVlLmtleSkpIHtcclxuICAgICAgICAgIGZpZWxkc1tmXS5zZXRWYWx1ZShmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBObyB3YXkgdG8gZGV0ZXJtaW5lIGlmIHRoZSBmaWVsZCBpcyBwYXJ0IG9mIHRoZSBjaGFuZ2VkIGFjY291bnQsIGNsZWFyIGl0XHJcbiAgICAgICAgaWYgKCFmaWVsZHNbZl0uY3VycmVudFNlbGVjdGlvbikge1xyXG4gICAgICAgICAgZmllbGRzW2ZdLnNldFZhbHVlKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmaWVsZHNbZl0uZGVwZW5kc09uID0gbnVsbDtcclxuICAgICAgICBmaWVsZHNbZl0ud2hlcmUgPSAnQWNjb3VudC5BY2NvdW50TmFtZSBuZSBudWxsJztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGVudHJ5ID0gZmllbGQuY3VycmVudFNlbGVjdGlvbjtcclxuICAgIGlmIChlbnRyeSAmJiBlbnRyeS5NYWluUGhvbmUpIHtcclxuICAgICAgY29uc3QgcGhvbmVGaWVsZCA9IHRoaXMuZmllbGRzLlBob25lTnVtYmVyO1xyXG4gICAgICBwaG9uZUZpZWxkLnNldFZhbHVlKGVudHJ5Lk1haW5QaG9uZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvbkNvbnRhY3RDaGFuZ2U6IGZ1bmN0aW9uIG9uQ29udGFjdENoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIHRoaXMub25BY2NvdW50RGVwZW5kZW50Q2hhbmdlKHZhbHVlLCBmaWVsZCk7XHJcbiAgICBjb25zdCBlbnRyeSA9IGZpZWxkLmN1cnJlbnRTZWxlY3Rpb247XHJcblxyXG4gICAgaWYgKGVudHJ5ICYmIGVudHJ5LldvcmtQaG9uZSkge1xyXG4gICAgICBjb25zdCBwaG9uZUZpZWxkID0gdGhpcy5maWVsZHMuUGhvbmVOdW1iZXI7XHJcbiAgICAgIHBob25lRmllbGQuc2V0VmFsdWUoZW50cnkuV29ya1Bob25lKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uT3Bwb3J0dW5pdHlDaGFuZ2U6IGZ1bmN0aW9uIG9uT3Bwb3J0dW5pdHlDaGFuZ2UodmFsdWUsIGZpZWxkKSB7XHJcbiAgICB0aGlzLm9uQWNjb3VudERlcGVuZGVudENoYW5nZSh2YWx1ZSwgZmllbGQpO1xyXG4gICAgY29uc3QgZW50cnkgPSBmaWVsZC5jdXJyZW50U2VsZWN0aW9uO1xyXG5cclxuICAgIGlmIChlbnRyeSAmJiBlbnRyeS5BY2NvdW50ICYmIGVudHJ5LkFjY291bnQuTWFpblBob25lKSB7XHJcbiAgICAgIGNvbnN0IHBob25lRmllbGQgPSB0aGlzLmZpZWxkc1Bob25lTnVtYmVyO1xyXG4gICAgICBwaG9uZUZpZWxkLnNldFZhbHVlKGVudHJ5LkFjY291bnQuTWFpblBob25lKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uVGlja2V0Q2hhbmdlOiBmdW5jdGlvbiBvblRpY2tldENoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIHRoaXMub25BY2NvdW50RGVwZW5kZW50Q2hhbmdlKHZhbHVlLCBmaWVsZCk7XHJcbiAgICBjb25zdCBlbnRyeSA9IGZpZWxkLmN1cnJlbnRTZWxlY3Rpb247XHJcbiAgICBjb25zdCBwaG9uZSA9IGVudHJ5ICYmIGVudHJ5LkNvbnRhY3QgJiYgZW50cnkuQ29udGFjdC5Xb3JrUGhvbmUgfHwgZW50cnkgJiYgZW50cnkuQWNjb3VudCAmJiBlbnRyeS5BY2NvdW50Lk1haW5QaG9uZTtcclxuICAgIGlmIChwaG9uZSkge1xyXG4gICAgICBjb25zdCBwaG9uZUZpZWxkID0gdGhpcy5maWVsZHMuUGhvbmVOdW1iZXI7XHJcbiAgICAgIHBob25lRmllbGQuc2V0VmFsdWUocGhvbmUpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25BY2NvdW50RGVwZW5kZW50Q2hhbmdlOiBmdW5jdGlvbiBvbkFjY291bnREZXBlbmRlbnRDaGFuZ2UodmFsdWUsIGZpZWxkKSB7XHJcbiAgICBpZiAodmFsdWUgJiYgIWZpZWxkLmRlcGVuZHNPbiAmJiBmaWVsZC5jdXJyZW50U2VsZWN0aW9uICYmIGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24uQWNjb3VudCkge1xyXG4gICAgICBjb25zdCBhY2NvdW50RmllbGQgPSB0aGlzLmZpZWxkcy5BY2NvdW50O1xyXG4gICAgICBhY2NvdW50RmllbGQuc2V0VmFsdWUoe1xyXG4gICAgICAgIEFjY291bnRJZDogZmllbGQuY3VycmVudFNlbGVjdGlvbi5BY2NvdW50LiRrZXksXHJcbiAgICAgICAgQWNjb3VudE5hbWU6IGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24uQWNjb3VudC5BY2NvdW50TmFtZSxcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMub25BY2NvdW50Q2hhbmdlKGFjY291bnRGaWVsZC5nZXRWYWx1ZSgpLCBhY2NvdW50RmllbGQpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25TdGFydERhdGVDaGFuZ2U6IGZ1bmN0aW9uIG9uU3RhcnREYXRlQ2hhbmdlKHZhbHVlKSB7XHJcbiAgICB0aGlzLnJlY3VycmVuY2UuU3RhcnREYXRlID0gdmFsdWU7XHJcbiAgICAvLyBOZWVkIHJlY2FsY3VsYXRlIFJlY3VyUGVyaW9kU3BlYyBpbiBjYXNlIHdlZWtkYXkgb24gU3RhcnREYXRlIGNoYW5nZXNcclxuICAgIHRoaXMucmVjdXJyZW5jZS5SZWN1clBlcmlvZFNwZWMgPSByZWN1ci5nZXRSZWN1clBlcmlvZFNwZWMoXHJcbiAgICAgIHRoaXMucmVjdXJyZW5jZS5SZWN1clBlcmlvZCxcclxuICAgICAgdGhpcy5yZWN1cnJlbmNlLlN0YXJ0RGF0ZSxcclxuICAgICAgdGhpcy5yZWN1cnJlbmNlLlJlY3VyUGVyaW9kU3BlYyAtIHRoaXMucmVjdXJyZW5jZS5SZWN1clBlcmlvZFNwZWMgJSA2NTUzNiwgLy8gd2Vla2RheXNcclxuICAgICAgdGhpcy5yZWN1cnJlbmNlLlJlY3VyUGVyaW9kU3BlYyAlIDY1NTM2IC8vIGludGVydmFsXHJcbiAgICApO1xyXG4gICAgdGhpcy5yZXNldFJlY3VycmVuY2UodGhpcy5yZWN1cnJlbmNlKTtcclxuXHJcbiAgICByZWN1ci5jcmVhdGVTaW1wbGlmaWVkT3B0aW9ucyh2YWx1ZSk7XHJcblxyXG4gICAgY29uc3QgcmVwZWF0cyA9ICh0aGlzLnJlY3VycmVuY2UuUmVjdXJyZW5jZVN0YXRlID09PSAncnN0TWFzdGVyJyk7XHJcbiAgICB0aGlzLmZpZWxkcy5SZWN1cnJlbmNlVUkuc2V0VmFsdWUocmVjdXIuZ2V0UGFuZWwocmVwZWF0cyAmJiB0aGlzLnJlY3VycmVuY2UuUmVjdXJQZXJpb2QpKTtcclxuICB9LFxyXG4gIG9uUmVjdXJyZW5jZVVJQ2hhbmdlOiBmdW5jdGlvbiBvblJlY3VycmVuY2VVSUNoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIGNvbnN0IGtleSA9IGZpZWxkLmN1cnJlbnRWYWx1ZSAmJiBmaWVsZC5jdXJyZW50VmFsdWUua2V5O1xyXG4gICAgY29uc3Qgb3B0ID0gcmVjdXIuc2ltcGxpZmllZE9wdGlvbnNba2V5XTtcclxuICAgIC8vIHByZXNlcnZlICNpdGVyYXRpb25zIChhbmQgRW5kRGF0ZSkgaWYgbWF0Y2hpbmcgcmVjdXJyZW5jZVxyXG4gICAgaWYgKHRoaXMuX3ByZXZpb3VzUmVjdXJyZW5jZSA9PT0ga2V5KSB7XHJcbiAgICAgIG9wdC5SZWN1ckl0ZXJhdGlvbnMgPSB0aGlzLnJlY3VycmVuY2UuUmVjdXJJdGVyYXRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVzZXRSZWN1cnJlbmNlKG9wdCk7XHJcbiAgICB0aGlzLl9wcmV2aW91c1JlY3VycmVuY2UgPSBrZXk7XHJcbiAgfSxcclxuICBvblJlY3VycmVuY2VDaGFuZ2U6IGZ1bmN0aW9uIG9uUmVjdXJyZW5jZUNoYW5nZSh2YWx1ZSkge1xyXG4gICAgLy8gZGlkIHRoZSBTdGFydERhdGUgY2hhbmdlIG9uIHRoZSByZWN1cnJlbmNlX2VkaXQgc2NyZWVuP1xyXG4gICAgY29uc3Qgc3RhcnREYXRlID0gYXJnb3MuQ29udmVydC50b0RhdGVGcm9tU3RyaW5nKHZhbHVlLlN0YXJ0RGF0ZSk7IC8vIFRPRE86IEF2b2lkIGdsb2JhbFxyXG4gICAgY29uc3QgY3VycmVudERhdGUgPSB0aGlzLmZpZWxkcy5TdGFydERhdGUuZ2V0VmFsdWUoKTtcclxuXHJcbiAgICBpZiAoc3RhcnREYXRlLmdldERhdGUoKSAhPT0gY3VycmVudERhdGUuZ2V0RGF0ZSgpIHx8IHN0YXJ0RGF0ZS5nZXRNb250aCgpICE9PSBjdXJyZW50RGF0ZS5nZXRNb250aCgpKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLlN0YXJ0RGF0ZS5zZXRWYWx1ZShzdGFydERhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVzZXRSZWN1cnJlbmNlKHZhbHVlKTtcclxuICB9LFxyXG4gIHJlc2V0UmVjdXJyZW5jZTogZnVuY3Rpb24gcmVzZXRSZWN1cnJlbmNlKG8pIHtcclxuICAgIHRoaXMucmVjdXJyZW5jZS5TdGFydERhdGUgPSB0aGlzLmZpZWxkcy5TdGFydERhdGUuZ2V0VmFsdWUoKTtcclxuXHJcbiAgICBpZiAodHlwZW9mIG8uUmVjdXJyaW5nICE9PSAndW5kZWZpbmVkJyAmJiBvLlJlY3VycmluZyAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnJlY3VycmVuY2UuUmVjdXJyaW5nID0gby5SZWN1cnJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiBvLlJlY3VycmVuY2VTdGF0ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgby5SZWN1cnJlbmNlU3RhdGUgIT09IG51bGwpIHtcclxuICAgICAgdGhpcy5yZWN1cnJlbmNlLlJlY3VycmVuY2VTdGF0ZSA9IG8uUmVjdXJyZW5jZVN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2Ygby5SZWN1clBlcmlvZCAhPT0gJ3VuZGVmaW5lZCcgJiYgby5SZWN1clBlcmlvZCAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnJlY3VycmVuY2UuUmVjdXJQZXJpb2QgPSBvLlJlY3VyUGVyaW9kO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2Ygby5SZWN1clBlcmlvZFNwZWMgIT09ICd1bmRlZmluZWQnICYmIG8uUmVjdXJQZXJpb2RTcGVjICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMucmVjdXJyZW5jZS5SZWN1clBlcmlvZFNwZWMgPSBvLlJlY3VyUGVyaW9kU3BlYztcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIG8uUmVjdXJJdGVyYXRpb25zICE9PSAndW5kZWZpbmVkJyAmJiBvLlJlY3VySXRlcmF0aW9ucyAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnJlY3VycmVuY2UuUmVjdXJJdGVyYXRpb25zID0gby5SZWN1ckl0ZXJhdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZWN1cnJlbmNlLkVuZERhdGUgPSByZWN1ci5jYWxjRW5kRGF0ZSh0aGlzLnJlY3VycmVuY2UuU3RhcnREYXRlLCB0aGlzLnJlY3VycmVuY2UpO1xyXG5cclxuICAgIHRoaXMuZmllbGRzLlJlY3VycmVuY2VVSS5zZXRWYWx1ZShyZWN1ci5nZXRQYW5lbCh0aGlzLnJlY3VycmVuY2UuUmVjdXJQZXJpb2QpKTtcclxuICAgIHRoaXMuZmllbGRzLlJlY3VycmVuY2Uuc2V0VmFsdWUodGhpcy5yZWN1cnJlbmNlKTtcclxuXHJcbiAgICB0aGlzLmZpZWxkcy5SZWN1cnJpbmcuc2V0VmFsdWUodGhpcy5yZWN1cnJlbmNlLlJlY3VycmluZyk7XHJcbiAgICB0aGlzLmZpZWxkcy5SZWN1clBlcmlvZC5zZXRWYWx1ZSh0aGlzLnJlY3VycmVuY2UuUmVjdXJQZXJpb2QpO1xyXG4gICAgdGhpcy5maWVsZHMuUmVjdXJQZXJpb2RTcGVjLnNldFZhbHVlKHRoaXMucmVjdXJyZW5jZS5SZWN1cnJpbmcgPyB0aGlzLnJlY3VycmVuY2UuUmVjdXJQZXJpb2RTcGVjIDogMCk7XHJcbiAgICB0aGlzLmZpZWxkcy5SZWN1cnJlbmNlU3RhdGUuc2V0VmFsdWUodGhpcy5yZWN1cnJlbmNlLlJlY3VycmVuY2VTdGF0ZSk7XHJcbiAgICB0aGlzLmZpZWxkcy5SZWN1ckl0ZXJhdGlvbnMuc2V0VmFsdWUodGhpcy5yZWN1cnJlbmNlLlJlY3VySXRlcmF0aW9ucyk7XHJcbiAgICB0aGlzLmZpZWxkcy5FbmREYXRlLnNldFZhbHVlKHRoaXMucmVjdXJyZW5jZS5FbmREYXRlKTtcclxuXHJcbiAgICBpZiAoby5SZWN1cnJpbmcpIHtcclxuICAgICAgdGhpcy5maWVsZHMuUmVjdXJyZW5jZS5lbmFibGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLlJlY3VycmVuY2UuZGlzYWJsZSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGZvcm1hdFBpY2tsaXN0Rm9yVHlwZTogZnVuY3Rpb24gZm9ybWF0UGlja2xpc3RGb3JUeXBlKHR5cGUsIHdoaWNoKSB7XHJcbiAgICByZXR1cm4gZ2V0UGlja2xpc3RCeUFjdGl2aXR5VHlwZSh0eXBlLCB3aGljaCk7XHJcbiAgfSxcclxuICBmb3JtYXRSZWN1cnJlbmNlOiBmdW5jdGlvbiBmb3JtYXRSZWN1cnJlbmNlKHJlY3VycmVuY2UpIHtcclxuICAgIGlmICh0eXBlb2YgcmVjdXJyZW5jZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIHJlY3VycmVuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlY3VyLnRvU3RyaW5nKHJlY3VycmVuY2UsIHRydWUpO1xyXG4gIH0sXHJcbiAgX2dldENhbGN1bGF0ZWRTdGFydFRpbWU6IGZ1bmN0aW9uIF9nZXRDYWxjdWxhdGVkU3RhcnRUaW1lKHNlbGVjdGVkRGF0ZSkge1xyXG4gICAgY29uc3Qgbm93ID0gbW9tZW50KCk7XHJcbiAgICBsZXQgdGhpc1NlbGVjdGVkRGF0ZSA9IHNlbGVjdGVkRGF0ZTtcclxuXHJcbiAgICBpZiAoIW1vbWVudC5pc01vbWVudChzZWxlY3RlZERhdGUpKSB7XHJcbiAgICAgIHRoaXNTZWxlY3RlZERhdGUgPSBtb21lbnQoc2VsZWN0ZWREYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUYWtlIHRoZSBzdGFydCBvZiB0aGUgc2VsZWN0ZWQgZGF0ZSwgYWRkIHRoZSAqY3VycmVudCogdGltZSB0byBpdCxcclxuICAgIC8vIGFuZCByb3VuZCBpdCB1cCB0byB0aGUgbmVhcmVzdCBST1VORF9NSU5VVEVTXHJcbiAgICAvLyBFeGFtcGxlczpcclxuICAgIC8vIDExOjI0IC0+IDExOjMwXHJcbiAgICAvLyAxMToxMiAtPiAxMToxNVxyXG4gICAgLy8gMTE6MzEgLT4gMTE6NDVcclxuICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IHRoaXNTZWxlY3RlZERhdGUuY2xvbmUoKVxyXG4gICAgICAuc3RhcnRPZignZGF5JylcclxuICAgICAgLmhvdXJzKG5vdy5ob3VycygpKVxyXG4gICAgICAuYWRkKHtcclxuICAgICAgICBtaW51dGVzOiAoTWF0aC5mbG9vcihub3cubWludXRlcygpIC8gdGhpcy5ST1VORF9NSU5VVEVTKSAqIHRoaXMuUk9VTkRfTUlOVVRFUykgKyB0aGlzLlJPVU5EX01JTlVURVMsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBzdGFydERhdGU7XHJcbiAgfSxcclxuICBhcHBseVVzZXJBY3Rpdml0eUNvbnRleHQ6IGZ1bmN0aW9uIGFwcGx5VXNlckFjdGl2aXR5Q29udGV4dChvcHRpb25zRGF0ZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2dldENhbGN1bGF0ZWRTdGFydFRpbWUob3B0aW9uc0RhdGUpO1xyXG4gIH0sXHJcbiAgYXBwbHlDb250ZXh0OiBmdW5jdGlvbiBhcHBseUNvbnRleHQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcHBseUNvbnRleHQsIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgbGV0IHN0YXJ0RGF0ZSA9IHRoaXMuX2dldENhbGN1bGF0ZWRTdGFydFRpbWUobW9tZW50KCkpO1xyXG4gICAgY29uc3QgYWN0aXZpdHlUeXBlID0gdGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5hY3Rpdml0eVR5cGU7XHJcbiAgICBjb25zdCBhY3Rpdml0eUdyb3VwID0gdGhpcy5ncm91cE9wdGlvbnNCeVR5cGVbYWN0aXZpdHlUeXBlXSB8fCAnJztcclxuICAgIGNvbnN0IGFjdGl2aXR5RHVyYXRpb24gPSBBcHAuY29udGV4dC51c2VyT3B0aW9ucyAmJiBBcHAuY29udGV4dC51c2VyT3B0aW9uc1tgJHthY3Rpdml0eUdyb3VwfTpEdXJhdGlvbmBdIHx8IDE1O1xyXG4gICAgY29uc3QgYWxhcm1FbmFibGVkID0gQXBwLmNvbnRleHQudXNlck9wdGlvbnMgJiYgQXBwLmNvbnRleHQudXNlck9wdGlvbnNbYCR7YWN0aXZpdHlHcm91cH06QWxhcm1FbmFibGVkYF0gfHwgdHJ1ZTtcclxuICAgIGNvbnN0IGFsYXJtRHVyYXRpb24gPSBBcHAuY29udGV4dC51c2VyT3B0aW9ucyAmJiBBcHAuY29udGV4dC51c2VyT3B0aW9uc1tgJHthY3Rpdml0eUdyb3VwfTpBbGFybUxlYWRgXSB8fCAxNTtcclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5jdXJyZW50RGF0ZSkge1xyXG4gICAgICBzdGFydERhdGUgPSB0aGlzLmFwcGx5VXNlckFjdGl2aXR5Q29udGV4dChtb21lbnQodGhpcy5vcHRpb25zLmN1cnJlbnREYXRlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5maWVsZHMuU3RhcnREYXRlLnNldFZhbHVlKHN0YXJ0RGF0ZS50b0RhdGUoKSk7XHJcbiAgICB0aGlzLmZpZWxkcy5UeXBlLnNldFZhbHVlKGFjdGl2aXR5VHlwZSk7XHJcbiAgICB0aGlzLmZpZWxkcy5EdXJhdGlvbi5zZXRWYWx1ZShhY3Rpdml0eUR1cmF0aW9uKTtcclxuICAgIHRoaXMuZmllbGRzLkFsYXJtLnNldFZhbHVlKGFsYXJtRW5hYmxlZCk7XHJcbiAgICB0aGlzLmZpZWxkcy5SZW1pbmRlci5zZXRWYWx1ZShhbGFybUR1cmF0aW9uKTtcclxuXHJcbiAgICBjb25zdCB1c2VyID0gQXBwLmNvbnRleHQudXNlcjtcclxuICAgIGlmICh1c2VyKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLlVzZXJJZC5zZXRWYWx1ZSh1c2VyLiRrZXkpO1xyXG5cclxuICAgICAgY29uc3QgbGVhZGVyRmllbGQgPSB0aGlzLmZpZWxkcy5MZWFkZXI7XHJcbiAgICAgIGxlYWRlckZpZWxkLnNldFZhbHVlKHVzZXIpO1xyXG4gICAgICB0aGlzLm9uTGVhZGVyQ2hhbmdlKHVzZXIsIGxlYWRlckZpZWxkKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmb3VuZCA9IHRoaXMuX2dldE5hdkNvbnRleHQoKTtcclxuXHJcbiAgICBjb25zdCBhY2NvdW50RmllbGQgPSB0aGlzLmZpZWxkcy5BY2NvdW50O1xyXG4gICAgdGhpcy5vbkFjY291bnRDaGFuZ2UoYWNjb3VudEZpZWxkLmdldFZhbHVlKCksIGFjY291bnRGaWVsZCk7XHJcblxyXG4gICAgY29uc3QgY29udGV4dCA9IChmb3VuZCAmJiBmb3VuZC5vcHRpb25zICYmIGZvdW5kLm9wdGlvbnMuc291cmNlKSB8fCBmb3VuZDtcclxuICAgIGNvbnN0IGxvb2t1cCA9IHtcclxuICAgICAgYWNjb3VudHM6IHRoaXMuYXBwbHlBY2NvdW50Q29udGV4dCxcclxuICAgICAgY29udGFjdHM6IHRoaXMuYXBwbHlDb250YWN0Q29udGV4dCxcclxuICAgICAgb3Bwb3J0dW5pdGllczogdGhpcy5hcHBseU9wcG9ydHVuaXR5Q29udGV4dCxcclxuICAgICAgdGlja2V0czogdGhpcy5hcHBseVRpY2tldENvbnRleHQsXHJcbiAgICAgIGxlYWRzOiB0aGlzLmFwcGx5TGVhZENvbnRleHQsXHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChjb250ZXh0ICYmIGxvb2t1cFtjb250ZXh0LnJlc291cmNlS2luZF0pIHtcclxuICAgICAgbG9va3VwW2NvbnRleHQucmVzb3VyY2VLaW5kXS5jYWxsKHRoaXMsIGNvbnRleHQpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgX2dldE5hdkNvbnRleHQ6IGZ1bmN0aW9uIF9nZXROYXZDb250ZXh0KCkge1xyXG4gICAgY29uc3QgbmF2Q29udGV4dCA9IEFwcC5xdWVyeU5hdmlnYXRpb25Db250ZXh0KChvKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvbnRleHQgPSAoby5vcHRpb25zICYmIG8ub3B0aW9ucy5zb3VyY2UpIHx8IG87XHJcblxyXG4gICAgICBpZiAoL14oYWNjb3VudHN8Y29udGFjdHN8b3Bwb3J0dW5pdGllc3x0aWNrZXRzfGxlYWRzKSQvLnRlc3QoY29udGV4dC5yZXNvdXJjZUtpbmQpICYmIGNvbnRleHQua2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG5hdkNvbnRleHQ7XHJcbiAgfSxcclxuICBhcHBseUFjY291bnRDb250ZXh0OiBmdW5jdGlvbiBhcHBseUFjY291bnRDb250ZXh0KGNvbnRleHQpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyhjb250ZXh0LmlkKTtcclxuICAgIGNvbnN0IGVudHJ5ID0gY29udGV4dC5lbnRyeSB8fCAodmlldyAmJiB2aWV3LmVudHJ5KSB8fCBjb250ZXh0O1xyXG5cclxuICAgIGlmICghZW50cnkgfHwgIWVudHJ5LiRrZXkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFjY291bnRGaWVsZCA9IHRoaXMuZmllbGRzLkFjY291bnQ7XHJcbiAgICBhY2NvdW50RmllbGQuc2V0U2VsZWN0aW9uKGVudHJ5KTtcclxuICAgIGFjY291bnRGaWVsZC5zZXRWYWx1ZSh7XHJcbiAgICAgIEFjY291bnRJZDogZW50cnkuJGtleSxcclxuICAgICAgQWNjb3VudE5hbWU6IGVudHJ5LiRkZXNjcmlwdG9yLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLm9uQWNjb3VudENoYW5nZShhY2NvdW50RmllbGQuZ2V0VmFsdWUoKSwgYWNjb3VudEZpZWxkKTtcclxuICB9LFxyXG4gIGFwcGx5Q29udGFjdENvbnRleHQ6IGZ1bmN0aW9uIGFwcGx5Q29udGFjdENvbnRleHQoY29udGV4dCkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KGNvbnRleHQuaWQpO1xyXG4gICAgY29uc3QgZW50cnkgPSBjb250ZXh0LmVudHJ5IHx8ICh2aWV3ICYmIHZpZXcuZW50cnkpIHx8IGNvbnRleHQ7XHJcblxyXG4gICAgaWYgKCFlbnRyeSB8fCAhZW50cnkuJGtleSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29udGFjdEZpZWxkID0gdGhpcy5maWVsZHMuQ29udGFjdDtcclxuXHJcbiAgICBjb250YWN0RmllbGQuc2V0U2VsZWN0aW9uKGVudHJ5KTtcclxuICAgIGNvbnRhY3RGaWVsZC5zZXRWYWx1ZSh7XHJcbiAgICAgIENvbnRhY3RJZDogZW50cnkuJGtleSxcclxuICAgICAgQ29udGFjdE5hbWU6IGVudHJ5LiRkZXNjcmlwdG9yLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5vbkFjY291bnREZXBlbmRlbnRDaGFuZ2UoY29udGFjdEZpZWxkLmdldFZhbHVlKCksIGNvbnRhY3RGaWVsZCk7XHJcblxyXG4gICAgY29uc3QgYWNjb3VudEZpZWxkID0gdGhpcy5maWVsZHMuQWNjb3VudDtcclxuICAgIGFjY291bnRGaWVsZC5zZXRWYWx1ZSh7XHJcbiAgICAgIEFjY291bnRJZDogdXRpbGl0eS5nZXRWYWx1ZShlbnRyeSwgJ0FjY291bnQuJGtleScpLFxyXG4gICAgICBBY2NvdW50TmFtZTogdXRpbGl0eS5nZXRWYWx1ZShlbnRyeSwgJ0FjY291bnQuQWNjb3VudE5hbWUnKSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChlbnRyeS5Xb3JrUGhvbmUpIHtcclxuICAgICAgY29uc3QgcGhvbmVGaWVsZCA9IHRoaXMuZmllbGRzLlBob25lTnVtYmVyO1xyXG4gICAgICBwaG9uZUZpZWxkLnNldFZhbHVlKGVudHJ5LldvcmtQaG9uZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhcHBseVRpY2tldENvbnRleHQ6IGZ1bmN0aW9uIGFwcGx5VGlja2V0Q29udGV4dChjb250ZXh0KSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoY29udGV4dC5pZCk7XHJcbiAgICBjb25zdCBlbnRyeSA9IGNvbnRleHQuZW50cnkgfHwgKHZpZXcgJiYgdmlldy5lbnRyeSk7XHJcblxyXG4gICAgaWYgKCFlbnRyeSB8fCAhZW50cnkuJGtleSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGlja2V0RmllbGQgPSB0aGlzLmZpZWxkcy5UaWNrZXQ7XHJcbiAgICB0aWNrZXRGaWVsZC5zZXRTZWxlY3Rpb24oZW50cnkpO1xyXG4gICAgdGlja2V0RmllbGQuc2V0VmFsdWUoe1xyXG4gICAgICBUaWNrZXRJZDogZW50cnkuJGtleSxcclxuICAgICAgVGlja2V0TnVtYmVyOiBlbnRyeS4kZGVzY3JpcHRvcixcclxuICAgIH0pO1xyXG4gICAgdGhpcy5vbkFjY291bnREZXBlbmRlbnRDaGFuZ2UodGlja2V0RmllbGQuZ2V0VmFsdWUoKSwgdGlja2V0RmllbGQpO1xyXG5cclxuICAgIGNvbnN0IGNvbnRhY3RGaWVsZCA9IHRoaXMuZmllbGRzLkNvbnRhY3Q7XHJcbiAgICBjb250YWN0RmllbGQuc2V0VmFsdWUoe1xyXG4gICAgICBDb250YWN0SWQ6IHV0aWxpdHkuZ2V0VmFsdWUoZW50cnksICdDb250YWN0LiRrZXknKSxcclxuICAgICAgQ29udGFjdE5hbWU6IHV0aWxpdHkuZ2V0VmFsdWUoZW50cnksICdDb250YWN0Lk5hbWVMRicpLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLm9uQWNjb3VudERlcGVuZGVudENoYW5nZShjb250YWN0RmllbGQuZ2V0VmFsdWUoKSwgY29udGFjdEZpZWxkKTtcclxuXHJcbiAgICBjb25zdCBhY2NvdW50RmllbGQgPSB0aGlzLmZpZWxkcy5BY2NvdW50O1xyXG4gICAgYWNjb3VudEZpZWxkLnNldFZhbHVlKHtcclxuICAgICAgQWNjb3VudElkOiB1dGlsaXR5LmdldFZhbHVlKGVudHJ5LCAnQWNjb3VudC4ka2V5JyksXHJcbiAgICAgIEFjY291bnROYW1lOiB1dGlsaXR5LmdldFZhbHVlKGVudHJ5LCAnQWNjb3VudC5BY2NvdW50TmFtZScpLFxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgcGhvbmUgPSBlbnRyeSAmJiBlbnRyeS5Db250YWN0ICYmIGVudHJ5LkNvbnRhY3QuV29ya1Bob25lIHx8IGVudHJ5ICYmIGVudHJ5LkFjY291bnQgJiYgZW50cnkuQWNjb3VudC5NYWluUGhvbmU7XHJcbiAgICBpZiAocGhvbmUpIHtcclxuICAgICAgY29uc3QgcGhvbmVGaWVsZCA9IHRoaXMuZmllbGRzLlBob25lTnVtYmVyO1xyXG4gICAgICBwaG9uZUZpZWxkLnNldFZhbHVlKHBob25lKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFwcGx5T3Bwb3J0dW5pdHlDb250ZXh0OiBmdW5jdGlvbiBhcHBseU9wcG9ydHVuaXR5Q29udGV4dChjb250ZXh0KSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoY29udGV4dC5pZCk7XHJcbiAgICBjb25zdCBlbnRyeSA9IGNvbnRleHQuZW50cnkgfHwgKHZpZXcgJiYgdmlldy5lbnRyeSk7XHJcblxyXG4gICAgaWYgKCFlbnRyeSB8fCAhZW50cnkuJGtleSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb3Bwb3J0dW5pdHlGaWVsZCA9IHRoaXMuZmllbGRzLk9wcG9ydHVuaXR5O1xyXG4gICAgb3Bwb3J0dW5pdHlGaWVsZC5zZXRTZWxlY3Rpb24oZW50cnkpO1xyXG4gICAgb3Bwb3J0dW5pdHlGaWVsZC5zZXRWYWx1ZSh7XHJcbiAgICAgIE9wcG9ydHVuaXR5SWQ6IGVudHJ5LiRrZXksXHJcbiAgICAgIE9wcG9ydHVuaXR5TmFtZTogZW50cnkuJGRlc2NyaXB0b3IsXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm9uQWNjb3VudERlcGVuZGVudENoYW5nZShvcHBvcnR1bml0eUZpZWxkLmdldFZhbHVlKCksIG9wcG9ydHVuaXR5RmllbGQpO1xyXG5cclxuICAgIGNvbnN0IGFjY291bnRGaWVsZCA9IHRoaXMuZmllbGRzLkFjY291bnQ7XHJcbiAgICBhY2NvdW50RmllbGQuc2V0VmFsdWUoe1xyXG4gICAgICBBY2NvdW50SWQ6IHV0aWxpdHkuZ2V0VmFsdWUoZW50cnksICdBY2NvdW50LiRrZXknKSxcclxuICAgICAgQWNjb3VudE5hbWU6IHV0aWxpdHkuZ2V0VmFsdWUoZW50cnksICdBY2NvdW50LkFjY291bnROYW1lJyksXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZW50cnkuQWNjb3VudCAmJiBlbnRyeS5BY2NvdW50Lk1haW5QaG9uZSkge1xyXG4gICAgICBjb25zdCBwaG9uZUZpZWxkID0gdGhpcy5maWVsZHMuUGhvbmVOdW1iZXI7XHJcbiAgICAgIHBob25lRmllbGQuc2V0VmFsdWUoZW50cnkuQWNjb3VudC5NYWluUGhvbmUpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXBwbHlMZWFkQ29udGV4dDogZnVuY3Rpb24gYXBwbHlMZWFkQ29udGV4dChjb250ZXh0KSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoY29udGV4dC5pZCk7XHJcbiAgICBjb25zdCBlbnRyeSA9IGNvbnRleHQuZW50cnkgfHwgKHZpZXcgJiYgdmlldy5lbnRyeSk7XHJcblxyXG4gICAgaWYgKCFlbnRyeSB8fCAhZW50cnkuJGtleSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbGVhZEZpZWxkID0gdGhpcy5maWVsZHMuTGVhZDtcclxuICAgIGxlYWRGaWVsZC5zZXRTZWxlY3Rpb24oZW50cnkpO1xyXG4gICAgbGVhZEZpZWxkLnNldFZhbHVlKHtcclxuICAgICAgTGVhZElkOiBlbnRyeS4ka2V5LFxyXG4gICAgICBMZWFkTmFtZTogZW50cnkuJGRlc2NyaXB0b3IsXHJcbiAgICB9KTtcclxuICAgIHRoaXMub25MZWFkQ2hhbmdlKGxlYWRGaWVsZC5nZXRWYWx1ZSgpLCBsZWFkRmllbGQpO1xyXG5cclxuICAgIHRoaXMuZmllbGRzLkFjY291bnROYW1lLnNldFZhbHVlKGVudHJ5LkNvbXBhbnkpO1xyXG5cclxuICAgIGNvbnN0IGlzTGVhZEZpZWxkID0gdGhpcy5maWVsZHMuSXNMZWFkO1xyXG4gICAgaXNMZWFkRmllbGQuc2V0VmFsdWUoY29udGV4dC5yZXNvdXJjZUtpbmQgPT09ICdsZWFkcycpO1xyXG4gICAgdGhpcy5vbklzTGVhZENoYW5nZShpc0xlYWRGaWVsZC5nZXRWYWx1ZSgpLCBpc0xlYWRGaWVsZCk7XHJcblxyXG4gICAgaWYgKGVudHJ5LldvcmtQaG9uZSkge1xyXG4gICAgICBjb25zdCBwaG9uZUZpZWxkID0gdGhpcy5maWVsZHMuUGhvbmVOdW1iZXI7XHJcbiAgICAgIHBob25lRmllbGQuc2V0VmFsdWUoZW50cnkuV29ya1Bob25lKTtcclxuICAgIH1cclxuICB9LFxyXG4gIHNldFZhbHVlczogZnVuY3Rpb24gc2V0VmFsdWVzKHZhbHVlcykge1xyXG4gICAgaWYgKHZhbHVlcy5TdGFydERhdGUgJiYgdmFsdWVzLkFsYXJtVGltZSkge1xyXG4gICAgICBjb25zdCBzdGFydFRpbWUgPSAodGhpcy5pc0RhdGVUaW1lbGVzcyh2YWx1ZXMuU3RhcnREYXRlKSkgPyBtb21lbnQodmFsdWVzLlN0YXJ0RGF0ZSlcclxuICAgICAgICAuYWRkKHtcclxuICAgICAgICAgIG1pbnV0ZXM6IHZhbHVlcy5TdGFydERhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50b0RhdGUoKVxyXG4gICAgICAgIC5nZXRUaW1lKCkgOiB2YWx1ZXMuU3RhcnREYXRlLmdldFRpbWUoKTtcclxuXHJcbiAgICAgIGNvbnN0IHNwYW4gPSBzdGFydFRpbWUgLSB2YWx1ZXMuQWxhcm1UaW1lLmdldFRpbWUoKTsgLy8gbXNcclxuICAgICAgY29uc3QgcmVtaW5kZXIgPSBzcGFuIC8gKDEwMDAgKiA2MCk7XHJcblxyXG4gICAgICB2YWx1ZXMuUmVtaW5kZXIgPSBmb3JtYXQuZml4ZWQocmVtaW5kZXIsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW5oZXJpdGVkKHNldFZhbHVlcywgYXJndW1lbnRzKTtcclxuXHJcbiAgICB0aGlzLmVuYWJsZUZpZWxkcygpO1xyXG5cclxuICAgIGlmICh2YWx1ZXMuVGltZWxlc3MpIHtcclxuICAgICAgdGhpcy5maWVsZHMuRHVyYXRpb24uZGlzYWJsZSgpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5Sb2xsb3Zlci5lbmFibGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLkR1cmF0aW9uLmVuYWJsZSgpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5Sb2xsb3Zlci5kaXNhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHZhbHVlcy5BbGFybSkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5SZW1pbmRlci5lbmFibGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLlJlbWluZGVyLmRpc2FibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pc0luTGVhZENvbnRleHQoKSkge1xyXG4gICAgICBjb25zdCBpc0xlYWRGaWVsZCA9IHRoaXMuZmllbGRzLklzTGVhZDtcclxuICAgICAgaXNMZWFkRmllbGQuc2V0VmFsdWUodHJ1ZSk7XHJcbiAgICAgIHRoaXMub25Jc0xlYWRDaGFuZ2UoaXNMZWFkRmllbGQuZ2V0VmFsdWUoKSwgaXNMZWFkRmllbGQpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5MZWFkLnNldFZhbHVlKHZhbHVlcywgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuZmllbGRzLkFjY291bnROYW1lLnNldFZhbHVlKHZhbHVlcy5BY2NvdW50TmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZW50cnkgPSB0aGlzLm9wdGlvbnMuZW50cnkgfHwgdGhpcy5lbnRyeTtcclxuICAgIGNvbnN0IGRlbnlFZGl0ID0gIXRoaXMub3B0aW9ucy5pbnNlcnQgJiYgIXRoaXMuY3VycmVudFVzZXJDYW5FZGl0KGVudHJ5KTtcclxuICAgIGNvbnN0IGFsbG93U2V0QWxhcm0gPSAhZGVueUVkaXQgfHwgdGhpcy5jdXJyZW50VXNlckNhblNldEFsYXJtKGVudHJ5KTtcclxuXHJcbiAgICBpZiAoZGVueUVkaXQpIHtcclxuICAgICAgdGhpcy5kaXNhYmxlRmllbGRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGFsbG93U2V0QWxhcm0pIHtcclxuICAgICAgdGhpcy5lbmFibGVGaWVsZHMoKGYpID0+IHtcclxuICAgICAgICBpZiAodmFsdWVzLkFsYXJtKSB7XHJcbiAgICAgICAgICByZXR1cm4gKC9eQWxhcm18UmVtaW5kZXIkLylcclxuICAgICAgICAgICAgLnRlc3QoZi5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICgvXkFsYXJtJC8pXHJcbiAgICAgICAgICAudGVzdChmLm5hbWUpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlY3VycmVuY2UuU3RhcnREYXRlID0gYXJnb3MuQ29udmVydC50b0RhdGVGcm9tU3RyaW5nKHZhbHVlcy5TdGFydERhdGUpOyAvLyBUT0RPOiBBdm9pZCBnbG9iYWxcclxuICAgIHRoaXMucmVzZXRSZWN1cnJlbmNlKHZhbHVlcyk7XHJcbiAgICB0aGlzLm9uU3RhcnREYXRlQ2hhbmdlKHRoaXMuZmllbGRzLlN0YXJ0RGF0ZS5nZXRWYWx1ZSgpLCB0aGlzLmZpZWxkcy5TdGFydERhdGUpO1xyXG4gICAgaWYgKHRoaXMuaXNBY3Rpdml0eVJlY3VycmluZykge1xyXG4gICAgICB0aGlzLmZpZWxkcy5FbmREYXRlLmhpZGUoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGlzRGF0ZVRpbWVsZXNzOiBmdW5jdGlvbiBpc0RhdGVUaW1lbGVzcyhkYXRlKSB7XHJcbiAgICBpZiAoIWRhdGUpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGRhdGUuZ2V0VVRDSG91cnMoKSAhPT0gMCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoZGF0ZS5nZXRVVENNaW51dGVzKCkgIT09IDApIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGRhdGUuZ2V0VVRDU2Vjb25kcygpICE9PSA1KSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9LFxyXG4gIGlzRGF0ZVRpbWVsZXNzTG9jYWw6IGZ1bmN0aW9uIGlzRGF0ZVRpbWVsZXNzTG9jYWwoZGF0ZSkge1xyXG4gICAgaWYgKCFkYXRlKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChkYXRlLmdldEhvdXJzKCkgIT09IDApIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGRhdGUuZ2V0TWludXRlcygpICE9PSAwKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChkYXRlLmdldFNlY29uZHMoKSAhPT0gNSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSxcclxuICBnZXRWYWx1ZXM6IGZ1bmN0aW9uIGdldFZhbHVlcygpIHtcclxuICAgIGNvbnN0IGlzU3RhcnREYXRlRGlydHkgPSB0aGlzLmZpZWxkcy5TdGFydERhdGUuaXNEaXJ0eSgpO1xyXG4gICAgY29uc3QgaXNSZW1pbmRlckRpcnR5ID0gdGhpcy5maWVsZHMuUmVtaW5kZXIuaXNEaXJ0eSgpO1xyXG4gICAgY29uc3QgcmVtaW5kZXJJbiA9IHRoaXMuZmllbGRzLlJlbWluZGVyLmdldFZhbHVlKCk7XHJcbiAgICBjb25zdCB0aW1lbGVzcyA9IHRoaXMuZmllbGRzLlRpbWVsZXNzLmdldFZhbHVlKCk7XHJcbiAgICBsZXQgc3RhcnREYXRlID0gdGhpcy5maWVsZHMuU3RhcnREYXRlLmdldFZhbHVlKCk7XHJcbiAgICBsZXQgdmFsdWVzID0gdGhpcy5pbmhlcml0ZWQoZ2V0VmFsdWVzLCBhcmd1bWVudHMpO1xyXG5cclxuICAgIC8vIEZpeCB0aW1lbGVzcyBpZiBuZWNlc3NhcnkgKFRoZSBkYXRlIHBpY2tlciB3b24ndCBhZGQgNSBzZWNvbmRzKVxyXG4gICAgaWYgKHRpbWVsZXNzKSB7XHJcbiAgICAgIHZhbHVlcy5TdGFydERhdGUgPSBzdGFydERhdGUgPSB0aGlzLl9nZXROZXdTdGFydERhdGUoc3RhcnREYXRlLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiBTdGFydERhdGUgaXMgZGlydHksIGFsd2F5cyB1cGRhdGUgQWxhcm1UaW1lXHJcbiAgICBpZiAoc3RhcnREYXRlICYmIChpc1N0YXJ0RGF0ZURpcnR5IHx8IGlzUmVtaW5kZXJEaXJ0eSkpIHtcclxuICAgICAgdmFsdWVzID0gdmFsdWVzIHx8IHt9O1xyXG4gICAgICBjb25zdCBhbGFybVRpbWUgPSB0aGlzLl9nZXROZXdBbGFybVRpbWUoc3RhcnREYXRlLCB0aW1lbGVzcywgcmVtaW5kZXJJbik7XHJcbiAgICAgIHZhbHVlcy5BbGFybVRpbWUgPSBhbGFybVRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHZhbHVlcztcclxuICB9LFxyXG4gIGNyZWF0ZVJlbWluZGVyRGF0YTogZnVuY3Rpb24gY3JlYXRlUmVtaW5kZXJEYXRhKCkge1xyXG4gICAgY29uc3QgbGlzdCA9IFtdO1xyXG5cclxuICAgIGZvciAoY29uc3QgZHVyYXRpb24gaW4gdGhpcy5yZW1pbmRlclZhbHVlVGV4dCkge1xyXG4gICAgICBpZiAodGhpcy5yZW1pbmRlclZhbHVlVGV4dC5oYXNPd25Qcm9wZXJ0eShkdXJhdGlvbikpIHtcclxuICAgICAgICBsaXN0LnB1c2goe1xyXG4gICAgICAgICAgJGtleTogZHVyYXRpb24sXHJcbiAgICAgICAgICAkZGVzY3JpcHRvcjogdGhpcy5yZW1pbmRlclZhbHVlVGV4dFtkdXJhdGlvbl0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAkcmVzb3VyY2VzOiBsaXN0LFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGNyZWF0ZUR1cmF0aW9uRGF0YTogZnVuY3Rpb24gY3JlYXRlRHVyYXRpb25EYXRhKCkge1xyXG4gICAgY29uc3QgbGlzdCA9IFtdO1xyXG5cclxuICAgIGZvciAoY29uc3QgZHVyYXRpb24gaW4gdGhpcy5kdXJhdGlvblZhbHVlVGV4dCkge1xyXG4gICAgICBpZiAodGhpcy5kdXJhdGlvblZhbHVlVGV4dC5oYXNPd25Qcm9wZXJ0eShkdXJhdGlvbikpIHtcclxuICAgICAgICBsaXN0LnB1c2goe1xyXG4gICAgICAgICAgJGtleTogZHVyYXRpb24sXHJcbiAgICAgICAgICAkZGVzY3JpcHRvcjogdGhpcy5kdXJhdGlvblZhbHVlVGV4dFtkdXJhdGlvbl0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAkcmVzb3VyY2VzOiBsaXN0LFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGNyZWF0ZVJlY3VycmluZ0RhdGE6IGZ1bmN0aW9uIGNyZWF0ZVJlY3VycmluZ0RhdGEoKSB7XHJcbiAgICByZXR1cm4gcmVjdXIuY3JlYXRlU2ltcGxpZmllZE9wdGlvbnModGhpcy5maWVsZHMuU3RhcnREYXRlLmdldFZhbHVlKCkpO1xyXG4gIH0sXHJcbiAgZm9ybWF0RGVwZW5kZW50UXVlcnk6IGZ1bmN0aW9uIGZvcm1hdERlcGVuZGVudFF1ZXJ5KGRlcGVuZGVudFZhbHVlLCB0aGVGb3JtYXQsIHByb3BlcnR5KSB7XHJcbiAgICByZXR1cm4gc3RyaW5nLnN1YnN0aXR1dGUodGhlRm9ybWF0LCBbdXRpbGl0eS5nZXRWYWx1ZShkZXBlbmRlbnRWYWx1ZSwgcHJvcGVydHkgfHwgJyRrZXknKV0pO1xyXG4gIH0sXHJcbiAgX2dldE5ld1N0YXJ0RGF0ZTogZnVuY3Rpb24gX2dldE5ld1N0YXJ0RGF0ZShvcmdpbmFsU3RhcnREYXRlLCB0aW1lbGVzcykge1xyXG4gICAgaWYgKCFvcmdpbmFsU3RhcnREYXRlKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBzdGFydERhdGUgPSBvcmdpbmFsU3RhcnREYXRlO1xyXG4gICAgY29uc3QgaXNUaW1lTGVzc0RhdGUgPSB0aGlzLmlzRGF0ZVRpbWVsZXNzKHN0YXJ0RGF0ZSkgfHwgdGhpcy5pc0RhdGVUaW1lbGVzc0xvY2FsKHN0YXJ0RGF0ZSk7XHJcblxyXG4gICAgaWYgKHRpbWVsZXNzKSB7XHJcbiAgICAgIGlmICghaXNUaW1lTGVzc0RhdGUpIHtcclxuICAgICAgICBsZXQgd3JhcHBlZCA9IG1vbWVudChzdGFydERhdGUpO1xyXG4gICAgICAgIHdyYXBwZWQgPSBtb21lbnQudXRjKHdyYXBwZWQuZm9ybWF0KCdZWVlZLU1NLUREJyksICdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgd3JhcHBlZC5hZGQoJ3NlY29uZHMnLCA1KTtcclxuICAgICAgICBzdGFydERhdGUgPSB3cmFwcGVkLnRvRGF0ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoaXNUaW1lTGVzc0RhdGUpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IG1vbWVudCgpO1xyXG4gICAgICAgIGNvbnN0IHdyYXBwZWQgPSBtb21lbnQoc3RhcnREYXRlKTtcclxuICAgICAgICB3cmFwcGVkLnN1YnRyYWN0KHtcclxuICAgICAgICAgIG1pbnV0ZXM6IHdyYXBwZWQudXRjT2Zmc2V0KCksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgd3JhcHBlZC5ob3VycyhjdXJyZW50VGltZS5ob3VycygpKTtcclxuICAgICAgICB3cmFwcGVkLm1pbnV0ZXMoY3VycmVudFRpbWUubWludXRlcygpKTtcclxuICAgICAgICB3cmFwcGVkLnNlY29uZHMoMCk7XHJcbiAgICAgICAgc3RhcnREYXRlID0gd3JhcHBlZC50b0RhdGUoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdGFydERhdGU7XHJcbiAgfSxcclxuICBfZ2V0TmV3QWxhcm1UaW1lOiBmdW5jdGlvbiBfZ2V0TmV3QWxhcm1UaW1lKHN0YXJ0RGF0ZSwgdGltZWxlc3MsIHJlbWluZGVySW4pIHtcclxuICAgIGxldCBhbGFybVRpbWU7XHJcbiAgICBpZiAoIXN0YXJ0RGF0ZSkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGltZWxlc3MpIHtcclxuICAgICAgY29uc3Qgd3JhcHBlZCA9IG1vbWVudChzdGFydERhdGUpO1xyXG4gICAgICB3cmFwcGVkLnN1YnRyYWN0KHtcclxuICAgICAgICBtaW51dGVzOiB3cmFwcGVkLnV0Y09mZnNldCgpLFxyXG4gICAgICB9KTtcclxuICAgICAgd3JhcHBlZC5ob3VycygyNCk7XHJcbiAgICAgIHdyYXBwZWQubWludXRlcygwKTtcclxuICAgICAgd3JhcHBlZC5zZWNvbmRzKDApO1xyXG4gICAgICBhbGFybVRpbWUgPSB3cmFwcGVkLnRvRGF0ZSgpO1xyXG4gICAgICBhbGFybVRpbWUgPSBtb21lbnQoYWxhcm1UaW1lKVxyXG4gICAgICAgIC5jbG9uZSgpXHJcbiAgICAgICAgLmFkZCh7XHJcbiAgICAgICAgICBkYXlzOiAtMSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5hZGQoe1xyXG4gICAgICAgICAgbWludXRlczogLTEgKiByZW1pbmRlckluLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRvRGF0ZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxhcm1UaW1lID0gbW9tZW50KHN0YXJ0RGF0ZSlcclxuICAgICAgICAuY2xvbmUoKVxyXG4gICAgICAgIC5hZGQoe1xyXG4gICAgICAgICAgbWludXRlczogLTEgKiByZW1pbmRlckluLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRvRGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhbGFybVRpbWU7XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICBuYW1lOiAnVHlwZScsXHJcbiAgICAgIHByb3BlcnR5OiAnVHlwZScsXHJcbiAgICAgIHR5cGU6ICdoaWRkZW4nLFxyXG4gICAgfSwge1xyXG4gICAgICBkZXBlbmRzT246ICdUeXBlJyxcclxuICAgICAgbGFiZWw6IHRoaXMucmVnYXJkaW5nVGV4dCxcclxuICAgICAgbmFtZTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgcHJvcGVydHk6ICdEZXNjcmlwdGlvbicsXHJcbiAgICAgIHBpY2tsaXN0OiB0aGlzLmZvcm1hdFBpY2tsaXN0Rm9yVHlwZS5iaW5kRGVsZWdhdGUodGhpcywgJ0Rlc2NyaXB0aW9uJyksXHJcbiAgICAgIHRpdGxlOiB0aGlzLmFjdGl2aXR5RGVzY3JpcHRpb25UaXRsZVRleHQsXHJcbiAgICAgIG9yZGVyQnk6ICd0ZXh0IGFzYycsXHJcbiAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICAgIG1heFRleHRMZW5ndGg6IDY0LFxyXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgICAgYXV0b0ZvY3VzOiB0cnVlLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5sb25nTm90ZXNUZXh0LFxyXG4gICAgICBub3RlUHJvcGVydHk6IGZhbHNlLFxyXG4gICAgICBuYW1lOiAnTG9uZ05vdGVzJyxcclxuICAgICAgcHJvcGVydHk6ICdMb25nTm90ZXMnLFxyXG4gICAgICB0aXRsZTogdGhpcy5sb25nTm90ZXNUaXRsZVRleHQsXHJcbiAgICAgIHR5cGU6ICdub3RlJyxcclxuICAgICAgdmlldzogJ3RleHRfZWRpdCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdMb2NhdGlvbicsXHJcbiAgICAgIHByb3BlcnR5OiAnTG9jYXRpb24nLFxyXG4gICAgICBsYWJlbDogdGhpcy5sb2NhdGlvblRleHQsXHJcbiAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgbWF4VGV4dExlbmd0aDogMjU1LFxyXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMucHJpb3JpdHlUZXh0LFxyXG4gICAgICBuYW1lOiAnUHJpb3JpdHknLFxyXG4gICAgICBwcm9wZXJ0eTogJ1ByaW9yaXR5JyxcclxuICAgICAgcGlja2xpc3Q6ICdQcmlvcml0aWVzJyxcclxuICAgICAgdGl0bGU6IHRoaXMucHJpb3JpdHlUaXRsZVRleHQsXHJcbiAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICAgIG1heFRleHRMZW5ndGg6IDY0LFxyXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgIH0sIHtcclxuICAgICAgZGVwZW5kc09uOiAnVHlwZScsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmNhdGVnb3J5VGV4dCxcclxuICAgICAgbmFtZTogJ0NhdGVnb3J5JyxcclxuICAgICAgcHJvcGVydHk6ICdDYXRlZ29yeScsXHJcbiAgICAgIHBpY2tsaXN0OiB0aGlzLmZvcm1hdFBpY2tsaXN0Rm9yVHlwZS5iaW5kRGVsZWdhdGUodGhpcywgJ0NhdGVnb3J5JyksXHJcbiAgICAgIG9yZGVyQnk6ICd0ZXh0IGFzYycsXHJcbiAgICAgIHRpdGxlOiB0aGlzLmFjdGl2aXR5Q2F0ZWdvcnlUaXRsZVRleHQsXHJcbiAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICAgIG1heFRleHRMZW5ndGg6IDY0LFxyXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMuc3RhcnRpbmdUZXh0LFxyXG4gICAgICBuYW1lOiAnU3RhcnREYXRlJyxcclxuICAgICAgcHJvcGVydHk6ICdTdGFydERhdGUnLFxyXG4gICAgICB0eXBlOiAnZGF0ZScsXHJcbiAgICAgIHRpbWVsZXNzOiBmYWxzZSxcclxuICAgICAgc2hvd1RpbWVQaWNrZXI6IHRydWUsXHJcbiAgICAgIHNob3dSZWxhdGl2ZURhdGVUaW1lOiB0cnVlLFxyXG4gICAgICBkYXRlRm9ybWF0VGV4dDogKEFwcC5pczI0SG91ckNsb2NrKCkpID8gdGhpcy5zdGFydGluZ0Zvcm1hdFRleHQyNCA6IHRoaXMuc3RhcnRpbmdGb3JtYXRUZXh0LFxyXG4gICAgICBtaW5WYWx1ZTogKG5ldyBEYXRlKDE5MDAsIDAsIDEpKSxcclxuICAgICAgdmFsaWRhdG9yOiBbXHJcbiAgICAgICAgdmFsaWRhdG9yLmV4aXN0cyxcclxuICAgICAgICB2YWxpZGF0b3IuaXNEYXRlSW5SYW5nZSxcclxuICAgICAgXSxcclxuICAgIH0sIHtcclxuICAgICAgdHlwZTogJ2RhdGUnLFxyXG4gICAgICBuYW1lOiAnRW5kRGF0ZScsXHJcbiAgICAgIHByb3BlcnR5OiAnRW5kRGF0ZScsXHJcbiAgICAgIHNob3dSZWxhdGl2ZURhdGVUaW1lOiB0cnVlLFxyXG4gICAgICBpbmNsdWRlOiB0cnVlLFxyXG4gICAgfSwge1xyXG4gICAgICBkZXBlbmRzT246ICdTdGFydERhdGUnLFxyXG4gICAgICBsYWJlbDogdGhpcy5yZXBlYXRzVGV4dCxcclxuICAgICAgdGl0bGU6IHRoaXMucmVjdXJyaW5nVGl0bGVUZXh0LFxyXG4gICAgICBuYW1lOiAnUmVjdXJyZW5jZVVJJyxcclxuICAgICAgcHJvcGVydHk6ICdSZWN1cnJlbmNlVUknLFxyXG4gICAgICB0eXBlOiAnc2VsZWN0JyxcclxuICAgICAgdmlldzogJ3NlbGVjdF9saXN0JyxcclxuICAgICAgZGF0YTogdGhpcy5jcmVhdGVSZWN1cnJpbmdEYXRhLmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgICAgZXhjbHVkZTogdHJ1ZSxcclxuICAgIH0sIHtcclxuICAgICAgZGVwZW5kc09uOiAnUmVjdXJyZW5jZVVJJyxcclxuICAgICAgbGFiZWw6IHRoaXMucmVjdXJyaW5nVGV4dCxcclxuICAgICAgbmFtZTogJ1JlY3VycmVuY2UnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1JlY3VycmVuY2UnLFxyXG4gICAgICB0eXBlOiAncmVjdXJyZW5jZXMnLFxyXG4gICAgICBhcHBseVRvOiAnLicsXHJcbiAgICAgIHZpZXc6ICdyZWN1cnJlbmNlX2VkaXQnLFxyXG4gICAgICBleGNsdWRlOiB0cnVlLFxyXG4gICAgICBmb3JtYXRWYWx1ZTogdGhpcy5mb3JtYXRSZWN1cnJlbmNlLmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgIH0sIHtcclxuICAgICAgdHlwZTogJ2hpZGRlbicsXHJcbiAgICAgIG5hbWU6ICdSZWN1clBlcmlvZCcsXHJcbiAgICAgIHByb3BlcnR5OiAnUmVjdXJQZXJpb2QnLFxyXG4gICAgICBpbmNsdWRlOiB0cnVlLFxyXG4gICAgfSwge1xyXG4gICAgICB0eXBlOiAnaGlkZGVuJyxcclxuICAgICAgbmFtZTogJ1JlY3VyUGVyaW9kU3BlYycsXHJcbiAgICAgIHByb3BlcnR5OiAnUmVjdXJQZXJpb2RTcGVjJyxcclxuICAgICAgaW5jbHVkZTogdHJ1ZSxcclxuICAgIH0sIHtcclxuICAgICAgdHlwZTogJ2hpZGRlbicsXHJcbiAgICAgIG5hbWU6ICdSZWN1cnJlbmNlU3RhdGUnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1JlY3VycmVuY2VTdGF0ZScsXHJcbiAgICAgIGluY2x1ZGU6IHRydWUsXHJcbiAgICB9LCB7XHJcbiAgICAgIHR5cGU6ICdoaWRkZW4nLFxyXG4gICAgICBuYW1lOiAnUmVjdXJyaW5nJyxcclxuICAgICAgcHJvcGVydHk6ICdSZWN1cnJpbmcnLFxyXG4gICAgICBpbmNsdWRlOiB0cnVlLFxyXG4gICAgfSwge1xyXG4gICAgICB0eXBlOiAnaGlkZGVuJyxcclxuICAgICAgbmFtZTogJ1JlY3VySXRlcmF0aW9ucycsXHJcbiAgICAgIHByb3BlcnR5OiAnUmVjdXJJdGVyYXRpb25zJyxcclxuICAgICAgaW5jbHVkZTogdHJ1ZSxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMudGltZWxlc3NUZXh0LFxyXG4gICAgICBuYW1lOiAnVGltZWxlc3MnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1RpbWVsZXNzJyxcclxuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5kdXJhdGlvblRleHQsXHJcbiAgICAgIHRpdGxlOiB0aGlzLmR1cmF0aW9uVGl0bGVUZXh0LFxyXG4gICAgICBuYW1lOiAnRHVyYXRpb24nLFxyXG4gICAgICBwcm9wZXJ0eTogJ0R1cmF0aW9uJyxcclxuICAgICAgdHlwZTogJ2R1cmF0aW9uJyxcclxuICAgICAgdmlldzogJ3NlbGVjdF9saXN0JyxcclxuICAgICAgZGF0YTogdGhpcy5jcmVhdGVEdXJhdGlvbkRhdGEoKSxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ0FsYXJtJyxcclxuICAgICAgcHJvcGVydHk6ICdBbGFybScsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmFsYXJtVGV4dCxcclxuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5yZW1pbmRlclRleHQsXHJcbiAgICAgIHRpdGxlOiB0aGlzLnJlbWluZGVyVGl0bGVUZXh0LFxyXG4gICAgICBpbmNsdWRlOiBmYWxzZSxcclxuICAgICAgbmFtZTogJ1JlbWluZGVyJyxcclxuICAgICAgcHJvcGVydHk6ICdSZW1pbmRlcicsXHJcbiAgICAgIHR5cGU6ICdkdXJhdGlvbicsXHJcbiAgICAgIHZpZXc6ICdzZWxlY3RfbGlzdCcsXHJcbiAgICAgIGRhdGE6IHRoaXMuY3JlYXRlUmVtaW5kZXJEYXRhKCksXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLnJvbGxvdmVyVGV4dCxcclxuICAgICAgbmFtZTogJ1JvbGxvdmVyJyxcclxuICAgICAgcHJvcGVydHk6ICdSb2xsb3ZlcicsXHJcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcclxuICAgIH0sIHtcclxuICAgICAgdHlwZTogJ2hpZGRlbicsXHJcbiAgICAgIG5hbWU6ICdVc2VySWQnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1VzZXJJZCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLmxlYWRlclRleHQsXHJcbiAgICAgIG5hbWU6ICdMZWFkZXInLFxyXG4gICAgICBwcm9wZXJ0eTogJ0xlYWRlcicsXHJcbiAgICAgIGluY2x1ZGU6IHRydWUsXHJcbiAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICByZXF1aXJlU2VsZWN0aW9uOiB0cnVlLFxyXG4gICAgICB2aWV3OiAnY2FsZW5kYXJfYWNjZXNzX2xpc3QnLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5pc0xlYWRUZXh0LFxyXG4gICAgICBuYW1lOiAnSXNMZWFkJyxcclxuICAgICAgcHJvcGVydHk6ICdJc0xlYWQnLFxyXG4gICAgICBpbmNsdWRlOiBmYWxzZSxcclxuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxyXG4gICAgICBvblRleHQ6IHRoaXMueWVzVGV4dCxcclxuICAgICAgb2ZmVGV4dDogdGhpcy5ub1RleHQsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLmFjY291bnRUZXh0LFxyXG4gICAgICBuYW1lOiAnQWNjb3VudCcsXHJcbiAgICAgIHByb3BlcnR5OiAnQWNjb3VudCcsXHJcbiAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICBhcHBseVRvOiAnLicsXHJcbiAgICAgIHZhbHVlS2V5UHJvcGVydHk6ICdBY2NvdW50SWQnLFxyXG4gICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ0FjY291bnROYW1lJyxcclxuICAgICAgdmlldzogJ2FjY291bnRfcmVsYXRlZCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIGRlcGVuZHNPbjogJ0FjY291bnQnLFxyXG4gICAgICBsYWJlbDogdGhpcy5jb250YWN0VGV4dCxcclxuICAgICAgbmFtZTogJ0NvbnRhY3QnLFxyXG4gICAgICBwcm9wZXJ0eTogJ0NvbnRhY3QnLFxyXG4gICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgYXBwbHlUbzogZnVuY3Rpb24gYXBwbHlUbyhwYXlsb2FkLCB2YWx1ZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgcGF5bG9hZFt0aGlzLnZhbHVlS2V5UHJvcGVydHldID0gbnVsbDtcclxuICAgICAgICAgIHBheWxvYWRbdGhpcy52YWx1ZVRleHRQcm9wZXJ0eV0gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgdmFsdWVLZXlQcm9wZXJ0eTogJ0NvbnRhY3RJZCcsXHJcbiAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnQ29udGFjdE5hbWUnLFxyXG4gICAgICB2aWV3OiAnY29udGFjdF9yZWxhdGVkJyxcclxuICAgICAgd2hlcmU6IHRoaXMuZm9ybWF0RGVwZW5kZW50UXVlcnkuYmluZERlbGVnYXRlKFxyXG4gICAgICAgIHRoaXMsICdBY2NvdW50LklkIGVxIFwiJHswfVwiJywgJ0FjY291bnRJZCdcclxuICAgICAgKSxcclxuICAgIH0sIHtcclxuICAgICAgZGVwZW5kc09uOiAnQWNjb3VudCcsXHJcbiAgICAgIGxhYmVsOiB0aGlzLm9wcG9ydHVuaXR5VGV4dCxcclxuICAgICAgbmFtZTogJ09wcG9ydHVuaXR5JyxcclxuICAgICAgcHJvcGVydHk6ICdPcHBvcnR1bml0eScsXHJcbiAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICBhcHBseVRvOiBmdW5jdGlvbiBhcHBseVRvKHBheWxvYWQsIHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgICAgICBwYXlsb2FkW3RoaXMudmFsdWVLZXlQcm9wZXJ0eV0gPSBudWxsO1xyXG4gICAgICAgICAgcGF5bG9hZFt0aGlzLnZhbHVlVGV4dFByb3BlcnR5XSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICB2YWx1ZUtleVByb3BlcnR5OiAnT3Bwb3J0dW5pdHlJZCcsXHJcbiAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnT3Bwb3J0dW5pdHlOYW1lJyxcclxuICAgICAgdmlldzogJ29wcG9ydHVuaXR5X3JlbGF0ZWQnLFxyXG4gICAgICB3aGVyZTogdGhpcy5mb3JtYXREZXBlbmRlbnRRdWVyeS5iaW5kRGVsZWdhdGUoXHJcbiAgICAgICAgdGhpcywgJ0FjY291bnQuSWQgZXEgXCIkezB9XCInLCAnQWNjb3VudElkJ1xyXG4gICAgICApLFxyXG4gICAgfSwge1xyXG4gICAgICBkZXBlbmRzT246ICdBY2NvdW50JyxcclxuICAgICAgbGFiZWw6IHRoaXMudGlja2V0TnVtYmVyVGV4dCxcclxuICAgICAgbmFtZTogJ1RpY2tldCcsXHJcbiAgICAgIHByb3BlcnR5OiAnVGlja2V0JyxcclxuICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgIGFwcGx5VG86IGZ1bmN0aW9uIGFwcGx5VG8ocGF5bG9hZCwgdmFsdWUpIHtcclxuICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgICAgIHBheWxvYWRbdGhpcy52YWx1ZUtleVByb3BlcnR5XSA9IG51bGw7XHJcbiAgICAgICAgICBwYXlsb2FkW3RoaXMudmFsdWVUZXh0UHJvcGVydHldID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHZhbHVlS2V5UHJvcGVydHk6ICdUaWNrZXRJZCcsXHJcbiAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnVGlja2V0TnVtYmVyJyxcclxuICAgICAgdmlldzogJ3RpY2tldF9yZWxhdGVkJyxcclxuICAgICAgd2hlcmU6IHRoaXMuZm9ybWF0RGVwZW5kZW50UXVlcnkuYmluZERlbGVnYXRlKFxyXG4gICAgICAgIHRoaXMsICdBY2NvdW50LklkIGVxIFwiJHswfVwiJywgJ0FjY291bnRJZCdcclxuICAgICAgKSxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMubGVhZFRleHQsXHJcbiAgICAgIG5hbWU6ICdMZWFkJyxcclxuICAgICAgcHJvcGVydHk6ICdMZWFkJyxcclxuICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgIGFwcGx5VG86ICcuJyxcclxuICAgICAgdmFsdWVLZXlQcm9wZXJ0eTogJ0xlYWRJZCcsXHJcbiAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnTGVhZE5hbWUnLFxyXG4gICAgICB2aWV3OiAnbGVhZF9yZWxhdGVkJyxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMuY29tcGFueVRleHQsXHJcbiAgICAgIG5hbWU6ICdBY2NvdW50TmFtZScsXHJcbiAgICAgIHByb3BlcnR5OiAnQWNjb3VudE5hbWUnLFxyXG4gICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdQaG9uZU51bWJlcicsXHJcbiAgICAgIHByb3BlcnR5OiAnUGhvbmVOdW1iZXInLFxyXG4gICAgICBsYWJlbDogdGhpcy5waG9uZVRleHQsXHJcbiAgICAgIHR5cGU6ICdwaG9uZScsXHJcbiAgICAgIG1heFRleHRMZW5ndGg6IDMyLFxyXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgIH1dKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==