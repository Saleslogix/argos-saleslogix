define('crm/Views/Activity/Complete', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/connect', 'dojo/string', '../../Environment', '../../Validator', '../../Models/Activity/ActivityTypePicklists', 'argos/Utility', 'argos/Edit', '../../Models/Names', 'argos/Models/Types', 'argos/I18n'], function (module, exports, _declare, _connect, _string, _Environment, _Validator, _ActivityTypePicklists, _Utility, _Edit, _Names, _Types, _I18n) {
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

  var _Names2 = _interopRequireDefault(_Names);

  var _Types2 = _interopRequireDefault(_Types);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  const resource = (0, _I18n2.default)('activityComplete'); /* Copyright 2017 Infor
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

  const dtFormatResource = (0, _I18n2.default)('activityCompleteDateTimeFormat');

  const __class = (0, _declare2.default)('crm.Views.Activity.Complete', [_Edit2.default], {
    // Localization
    activityInfoText: resource.activityInfoText,
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
    asScheduledText: resource.asScheduledText,
    categoryText: resource.categoryText,
    categoryTitleText: resource.categoryTitleText,
    completedText: resource.completedText,
    completedFormatText: dtFormatResource.completedFormatText,
    completedFormatText24: dtFormatResource.completedFormatText24,
    completionText: resource.completionText,
    durationText: resource.durationText,
    durationTitleText: resource.durationTitleText,
    durationInvalidText: resource.durationInvalidText,
    carryOverNotesText: resource.carryOverNotesText,
    followUpText: resource.followUpText,
    followUpTitleText: resource.followUpTitleText,
    leaderText: resource.leaderText,
    longNotesText: resource.longNotesText,
    longNotesTitleText: resource.longNotesTitleText,
    otherInfoText: resource.otherInfoText,
    priorityText: resource.priorityText,
    priorityTitleText: resource.priorityTitleText,
    regardingText: resource.regardingText,
    regardingTitleText: resource.regardingTitleText,
    resultText: resource.resultText,
    resultTitleText: resource.resultTitleText,
    startingText: resource.startingText,
    startingFormatText: dtFormatResource.startingFormatText,
    startingFormatText24: dtFormatResource.startingFormatText24,
    startingTimelessFormatText: dtFormatResource.startingTimelessFormatText,
    timelessText: resource.timelessText,
    recurringActivityIdSeparator: ';',
    durationValueText: {
      0: resource.noneText,
      5: resource.fiveMinutesText,
      10: resource.tenMinutesText,
      15: resource.quarterHourText,
      30: resource.halfHourText,
      60: resource.hourText,
      120: resource.twoHoursText,
      240: resource.fourHoursText
    },
    followupValueText: {
      none: resource.nonePropText,
      atPhoneCall: resource.phoneCallText,
      atAppointment: resource.meetingText,
      atToDo: resource.toDoText,
      atPersonal: resource.personalText
    },

    // View Properties
    id: 'activity_complete',
    followupView: 'activity_edit',
    fieldsForLeads: ['AccountName', 'Lead'],
    fieldsForStandard: ['Account', 'Contact', 'Opportunity', 'Ticket'],
    picklistsByType: {
      atAppointment: {
        Category: 'Meeting Category Codes',
        Description: 'Meeting Regarding',
        Result: 'Meeting Result Codes'
      },
      atLiterature: {
        Description: 'Lit Request Regarding'
      },
      atPersonal: {
        Category: 'Meeting Category Codes',
        Description: 'Personal Activity Regarding',
        Result: 'Personal Activity Result Codes'
      },
      atPhoneCall: {
        Category: 'Phone Call Category Codes',
        Description: 'Phone Call Regarding',
        Result: 'Phone Call Result Codes'
      },
      atToDo: {
        Category: 'To Do Category Codes',
        Description: 'To Do Regarding',
        Result: 'To Do Result Codes'
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
    querySelect: ['AccountId', 'AccountName', 'Alarm', 'AlarmTime', 'Category', 'ContactId', 'ContactName', 'CompletedDate', 'Description', 'Duration', 'Leader/$key', 'LeadId', 'LeadName', 'LongNotes', 'OpportunityId', 'OpportunityName', 'Priority', 'Regarding', 'Result', 'Rollover', 'StartDate', 'TicketId', 'TicketNumber', 'Timeless', 'Type', 'Recurring', 'RecurrenceState', 'AllowAdd', 'AllowEdit', 'AllowDelete', 'AllowComplete'],
    resourceKind: 'activities',
    contractName: 'system',

    init: function init() {
      this.inherited(init, arguments);

      this.connect(this.fields.Leader, 'onChange', this.onLeaderChange);
      this.connect(this.fields.IsLead, 'onChange', this.onIsLeadChange);
      this.connect(this.fields.Timeless, 'onChange', this.onTimelessChange);
      this.connect(this.fields.AsScheduled, 'onChange', this.onAsScheduledChange);
      this.connect(this.fields.Followup, 'onChange', this.onFollowupChange);
      this.connect(this.fields.Lead, 'onChange', this.onLeadChange);
      this.connect(this.fields.Result, 'onChange', this.onResultChange);

      this.connect(this.fields.Account, 'onChange', this.onAccountChange);
      this.connect(this.fields.Contact, 'onChange', this.onContactChange);
      this.connect(this.fields.Opportunity, 'onChange', this.onOpportunityChange);
      this.connect(this.fields.Ticket, 'onChange', this.onTicketChange);
    },
    onResultChange: function onResultChange(value, field) {
      // Set the Result field back to the text value, and take the picklist code and set that to the ResultsCode
      field.setValue(value.text);

      // Max length for RESULTCODE is 8 chars, the sdata endpoint doesn't handle this, so we will truncate like the LAN if necessary
      this.fields.ResultCode.setValue(/.{0,8}/ig.exec(value.key));
    },
    isActivityForLead: function isActivityForLead(entry) {
      return entry && /^[\w]{12}$/.test(entry.LeadId);
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
    isInLeadContext: function isInLeadContext() {
      const insert = this.options && this.options.insert;
      const entry = this.options && this.options.entry;
      const context = this._getNavContext();
      let isLeadContext = false;

      if (context.resourceKind === 'leads') {
        isLeadContext = true;
      }

      const lead = insert && isLeadContext || this.isActivityForLead(entry);

      return !!lead;
    },
    toggleSelectField: function toggleSelectField(field, disable) {
      if (disable) {
        field.disable();
      } else {
        field.enable();
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
      this.fieldsForStandard.concat(this.fieldsForLeads).forEach(item => {
        if (this.fields[item]) {
          this.fields[item].hide();
        }
      }, this);

      this.fieldsForLeads.forEach(item => {
        if (this.fields[item]) {
          this.fields[item].show();
        }
      }, this);
    },
    showFieldsForStandard: function showFieldsForStandard() {
      this.fieldsForStandard.concat(this.fieldsForLeads).forEach(item => {
        if (this.fields[item]) {
          this.fields[item].hide();
        }
      }, this);

      this.fieldsForStandard.forEach(item => {
        if (this.fields[item]) {
          this.fields[item].show();
        }
      }, this);
    },
    onTimelessChange: function onTimelessChange(value) {
      this.toggleSelectField(this.fields.Duration, value);

      const startDateField = this.fields.StartDate;
      let startDate = startDateField.getValue();

      if (value) {
        startDateField.dateFormatText = this.startingTimelessFormatText;
        startDateField.showTimePicker = false;
        startDateField.timeless = true;
        if (!this.isDateTimeless(startDate) && startDate.clone) {
          startDate = startDate.clone().clearTime().add({
            minutes: -1 * startDate.getTimezoneOffset(),
            seconds: 5
          });
        }

        startDateField.setValue(startDate);
      } else {
        startDateField.dateFormatText = App.is24HourClock() ? this.startingFormatText24 : this.startingFormatText;
        startDateField.showTimePicker = true;
        startDateField.timeless = false;
        if (this.isDateTimeless(startDate)) {
          startDate = startDate.clone().add({
            minutes: startDate.getTimezoneOffset() + 1,
            seconds: -5
          });
        }
        startDateField.setValue(startDate);
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
    onAsScheduledChange: function onAsScheduledChange(scheduled) {
      if (scheduled) {
        const duration = this.fields.Duration.getValue();
        const startDate = moment(this.fields.StartDate.getValue());
        const completedDate = startDate.add({
          minutes: duration
        }).toDate();

        this.toggleSelectField(this.fields.CompletedDate, true);
        this.fields.CompletedDate.setValue(completedDate);
      } else {
        this.toggleSelectField(this.fields.CompletedDate, false);
        this.fields.CompletedDate.setValue(new Date());
      }
    },
    onFollowupChange: function onFollowupChange(value) {
      const disable = value === 'none' || value && value.key === 'none';
      this.toggleSelectField(this.fields.CarryOverNotes, disable);
    },
    onLeadChange: function onLeadChange(value, field) {
      const selection = field.getSelection();

      if (selection && this.insert) {
        this.fields.AccountName.setValue(_Utility2.default.getValue(selection, 'Company'));
      }

      const entry = field.currentSelection;
      if (entry.WorkPhone) {
        const phoneField = this.fields.PhoneNumber;
        phoneField.setValue(entry.WorkPhone);
      }
    },
    formatPicklistForType: function formatPicklistForType(type, which) {
      return (0, _ActivityTypePicklists.getPicklistByActivityType)(type, which);
    },
    setValues: function setValues(values) {
      this.inherited(setValues, arguments);
      this.fields.CarryOverNotes.setValue(true);
      this.fields.CompletedDate.setValue(new Date());
      this.fields.Followup.setValue('none');
      this.fields.Result.setValue('Complete');
      this.fields.ResultCode.setValue('COM');

      this.toggleSelectField(this.fields.CarryOverNotes, true);
      this.toggleSelectField(this.fields.CompletedDate, false);
      if (this.isInLeadContext()) {
        const isLeadField = this.fields.IsLead;
        if (isLeadField) {
          isLeadField.setValue(true);
          this.onIsLeadChange(isLeadField.getValue(), isLeadField);
        }

        this.fields.Lead.setValue(values, true);
        this.fields.AccountName.setValue(values.AccountName);
      }
    },
    onLeaderChange: function onLeaderChange(value, field) {
      const user = field.getValue();
      let resourceId = '';

      let key = user.$key;

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
            $descriptor: value && value.text
          });
        }
      }
    },
    convertEntry: function convertEntry() {
      const entry = this.inherited(convertEntry, arguments);
      if (!this.options.entry) {
        if (entry && entry.Leader.$key) {
          this.requestLeader(entry.Leader.$key);
        }
      }

      return entry;
    },
    requestLeader: function requestLeader(userId) {
      const request = new Sage.SData.Client.SDataSingleResourceRequest(this.getConnection()).setResourceKind('users').setResourceSelector(`'${userId}'`).setQueryArg('select', ['UserInfo/FirstName', 'UserInfo/LastName'].join(','));

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
    formatFollowupText: function formatFollowupText(val, key, text) {
      return this.followupValueText[key] || text;
    },
    createDurationData: function createDurationData() {
      const list = [];
      for (const duration in this.durationValueText) {
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
    createFollowupData: function createFollowupData() {
      const list = [];

      for (const followup in this.followupValueText) {
        if (this.followupValueText.hasOwnProperty(followup)) {
          list.push({
            $key: followup,
            $descriptor: this.followupValueText[followup]
          });
        }
      }

      return {
        $resources: list
      };
    },
    navigateToFollowUpView: function navigateToFollowUpView(entry) {
      const view = App.getView(this.followupView);
      const followupEntry = {
        Type: this.fields.Followup.getValue(),
        Description: entry.Description,
        AccountId: entry.AccountId,
        AccountName: entry.AccountName,
        ContactId: entry.ContactId,
        ContactName: entry.ContactName,
        LeadId: entry.LeadId,
        LeadName: entry.LeadName,
        LongNotes: this.fields.CarryOverNotes.getValue() && entry.LongNotes || '',
        OpportunityId: entry.OpportunityId,
        OpportunityName: entry.OpportunityName,
        StartDate: moment().toDate(),
        TicketId: entry.TicketId,
        TicketNumber: entry.TicketNumber
      };

      // Return to activity list view after follow up.
      view.show({
        entry: followupEntry,
        insert: true,
        title: this.followupValueText[this.fields.Followup.getValue()]
      }, {
        returnTo: -1
      });
    },
    applyContext: function applyContext() {
      this.inherited(applyContext, arguments);
      const startDate = this._getCalculatedStartTime(moment());
      const activityType = this.options && this.options.activityType;
      const activityGroup = this.groupOptionsByType[activityType] || '';
      const activityDuration = App.context.userOptions && App.context.userOptions[`${activityGroup}:Duration`] || 15;
      this.fields.StartDate.setValue(startDate.toDate());
      this.fields.Type.setValue(activityType);
      this.fields.Duration.setValue(activityDuration);
      const user = App.context.user;
      if (user) {
        this.fields.UserId.setValue(user.$key);

        const leaderField = this.fields.Leader;
        leaderField.setValue(user);
        this.onLeaderChange(user, leaderField);
      }

      const found = this._getNavContext();
      const accountField = this.fields.Account;
      this.onAccountChange(accountField.getValue(), accountField);

      const context = found && found.options && found.options.source || found;
      const lookup = {
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
    _getCalculatedStartTime: function _getCalculatedStartTime(selectedDate) {
      const now = moment();
      let thisSelectedDate = selectedDate;

      if (!moment.isMoment(selectedDate)) {
        thisSelectedDate = moment(selectedDate);
      }

      // Take the start of the selected date, add the *current* time to it,
      // and round it up to the nearest ROUND_MINUTES
      // Examples:
      // 11:24 -> 11:30
      // 11:12 -> 11:15
      // 11:31 -> 11:45
      const startDate = thisSelectedDate.clone().startOf('day').hours(now.hours()).add({
        minutes: Math.floor(now.minutes() / this.ROUND_MINUTES) * this.ROUND_MINUTES + this.ROUND_MINUTES
      });

      return startDate;
    },
    applyAccountContext: function applyAccountContext(context) {
      const view = App.getView(context.id);
      const entry = context.entry || view && view.entry || context;

      if (!entry || !entry.$key) {
        return;
      }

      const accountField = this.fields.Account;
      accountField.setSelection(entry);
      accountField.setValue({
        AccountId: entry.$key,
        AccountName: entry.$descriptor
      });
      this.onAccountChange(accountField.getValue(), accountField);
    },
    applyContactContext: function applyContactContext(context) {
      const view = App.getView(context.id);
      const entry = context.entry || view && view.entry || context;

      if (!entry || !entry.$key) {
        return;
      }

      const contactField = this.fields.Contact;

      contactField.setSelection(entry);
      contactField.setValue({
        ContactId: entry.$key,
        ContactName: entry.$descriptor
      });

      this.onAccountDependentChange(contactField.getValue(), contactField);

      const accountField = this.fields.Account;
      accountField.setValue({
        AccountId: _Utility2.default.getValue(entry, 'Account.$key'),
        AccountName: _Utility2.default.getValue(entry, 'Account.AccountName')
      });

      if (entry.WorkPhone) {
        const phoneField = this.fields.PhoneNumber;
        phoneField.setValue(entry.WorkPhone);
      }
    },
    applyTicketContext: function applyTicketContext(context) {
      const view = App.getView(context.id);
      const entry = context.entry || view && view.entry;

      if (!entry || !entry.$key) {
        return;
      }

      const ticketField = this.fields.Ticket;
      ticketField.setSelection(entry);
      ticketField.setValue({
        TicketId: entry.$key,
        TicketNumber: entry.$descriptor
      });
      this.onAccountDependentChange(ticketField.getValue(), ticketField);

      const contactField = this.fields.Contact;
      contactField.setValue({
        ContactId: _Utility2.default.getValue(entry, 'Contact.$key'),
        ContactName: _Utility2.default.getValue(entry, 'Contact.NameLF')
      });
      this.onAccountDependentChange(contactField.getValue(), contactField);

      const accountField = this.fields.Account;
      accountField.setValue({
        AccountId: _Utility2.default.getValue(entry, 'Account.$key'),
        AccountName: _Utility2.default.getValue(entry, 'Account.AccountName')
      });

      const phone = entry && entry.Contact && entry.Contact.WorkPhone || entry && entry.Account && entry.Account.MainPhone;
      if (phone) {
        const phoneField = this.fields.PhoneNumber;
        phoneField.setValue(phone);
      }
    },
    applyOpportunityContext: function applyOpportunityContext(context) {
      const view = App.getView(context.id);
      const entry = context.entry || view && view.entry;

      if (!entry || !entry.$key) {
        return;
      }

      const opportunityField = this.fields.Opportunity;
      opportunityField.setSelection(entry);
      opportunityField.setValue({
        OpportunityId: entry.$key,
        OpportunityName: entry.$descriptor
      });

      this.onAccountDependentChange(opportunityField.getValue(), opportunityField);

      const accountField = this.fields.Account;
      accountField.setValue({
        AccountId: _Utility2.default.getValue(entry, 'Account.$key'),
        AccountName: _Utility2.default.getValue(entry, 'Account.AccountName')
      });

      if (entry.Account && entry.Account.MainPhone) {
        const phoneField = this.fields.PhoneNumber;
        phoneField.setValue(entry.Account.MainPhone);
      }
    },
    applyLeadContext: function applyLeadContext(context) {
      const view = App.getView(context.id);
      const entry = context.entry || view && view.entry;

      if (!entry || !entry.$key) {
        return;
      }

      const leadField = this.fields.Lead;
      leadField.setSelection(entry);
      leadField.setValue({
        LeadId: entry.$key,
        LeadName: entry.$descriptor
      });
      this.onLeadChange(leadField.getValue(), leadField);

      this.fields.AccountName.setValue(entry.Company);

      const isLeadField = this.fields.IsLead;
      if (isLeadField) {
        isLeadField.setValue(context.resourceKind === 'leads');
        this.onIsLeadChange(isLeadField.getValue(), isLeadField);
      }

      if (entry.WorkPhone) {
        const phoneField = this.fields.PhoneNumber;
        phoneField.setValue(entry.WorkPhone);
      }
    },
    onAccountChange: function onAccountChange(value, field) {
      const fields = this.fields;
      ['Contact', 'Opportunity', 'Ticket'].forEach(f => {
        if (value) {
          fields[f].dependsOn = 'Account';
          fields[f].where = `Account.Id eq "${value.AccountId || value.key}"`;

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

      const entry = field.currentSelection;
      if (entry && entry.MainPhone) {
        const phoneField = this.fields.PhoneNumber;
        phoneField.setValue(entry.MainPhone);
      }
    },
    onContactChange: function onContactChange(value, field) {
      this.onAccountDependentChange(value, field);
      const entry = field.currentSelection;

      if (entry && entry.WorkPhone) {
        const phoneField = this.fields.PhoneNumber;
        phoneField.setValue(entry.WorkPhone);
      }
    },
    onOpportunityChange: function onOpportunityChange(value, field) {
      this.onAccountDependentChange(value, field);
      const entry = field.currentSelection;

      if (entry && entry.Account && entry.Account.MainPhone) {
        const phoneField = this.fieldsPhoneNumber;
        phoneField.setValue(entry.Account.MainPhone);
      }
    },
    onTicketChange: function onTicketChange(value, field) {
      this.onAccountDependentChange(value, field);
      const entry = field.currentSelection;
      const phone = entry && entry.Contact && entry.Contact.WorkPhone || entry && entry.Account && entry.Account.MainPhone;
      if (phone) {
        const phoneField = this.fields.PhoneNumber;
        phoneField.setValue(phone);
      }
    },
    onAccountDependentChange: function onAccountDependentChange(value, field) {
      if (value && !field.dependsOn && field.currentSelection && field.currentSelection.Account) {
        const accountField = this.fields.Account;
        accountField.setValue({
          AccountId: field.currentSelection.Account.$key,
          AccountName: field.currentSelection.Account.AccountName
        });
        this.onAccountChange(accountField.getValue(), accountField);
      }
    },
    completeActivity: function completeActivity(entry, callback) {
      const activityModel = App.ModelManager.getModel(_Names2.default.ACTIVITY, _Types2.default.SDATA);
      entry.Leader = this.fields.Leader.getValue();
      entry.Result = this.fields.Result.getValue();
      entry.ResultCode = this.fields.ResultCode.getValue();
      entry.CompletedDate = this.fields.CompletedDate.getValue();

      const success = function refreshStale(scope, theCallback, theEntry) {
        return function refreshStaleViews() {
          _Environment2.default.refreshStaleDetailViews();
          _connect2.default.publish('/app/refresh', [{
            resourceKind: 'history'
          }]);

          theCallback.apply(scope, [theEntry]);
        };
      }(this, callback, entry);

      if (activityModel) {
        activityModel.completeActivity(entry).then(success, this.onRequestFailure);
      }
    },
    onInsertCompleted: function onInsertCompleted(entry) {
      // Activity inserted, so now complete it like our normal flow
      this.onUpdateCompleted(entry);
    },
    onPutComplete: function onPutComplete(entry) {
      this._completedBasedOn = null;
      if (entry.$key.split(this.recurringActivityIdSeparator).length === 2) {
        this._completedBasedOn = entry;
      }
      this.inherited(onPutComplete, arguments);
    },
    onUpdateCompleted: function onUpdateCompleted(entry) {
      if (!entry) {
        return;
      }

      const followup = this.fields.Followup.getValue() === 'none' ? this.getInherited(onUpdateCompleted, arguments) : this.navigateToFollowUpView;
      entry.$completedBasedOn = this._completedBasedOn;
      this.completeActivity(entry, followup);
    },
    formatDependentQuery: function formatDependentQuery(dependentValue, format, property) {
      const theProperty = property || '$key';

      return _string2.default.substitute(format, [_Utility2.default.getValue(dependentValue, theProperty)]);
    },
    _getNavContext: function _getNavContext() {
      const navContext = App.queryNavigationContext(o => {
        const context = o.options && o.options.source || o;

        if (/^(accounts|contacts|opportunities|tickets|leads)$/.test(context.resourceKind) && context.key) {
          return true;
        }

        return false;
      });
      return navContext;
    },
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        title: this.activityInfoText,
        name: 'ActivityInfoSection',
        collapsed: false,
        children: [{
          name: 'Type',
          property: 'Type',
          type: 'hidden'
        }, {
          dependsOn: 'Type',
          label: this.regardingText,
          name: 'Description',
          property: 'Description',
          picklist: this.formatPicklistForType.bindDelegate(this, 'Description'),
          title: this.regardingTitleText,
          orderBy: 'text asc',
          type: 'picklist',
          maxTextLength: 64,
          validator: _Validator2.default.exceedsMaxTextLength
        }, {
          label: this.longNotesText,
          noteProperty: false,
          name: 'LongNotes',
          property: 'LongNotes',
          title: this.longNotesTitleText,
          type: 'note',
          view: 'text_edit'
        }, {
          label: this.startingText,
          name: 'StartDate',
          property: 'StartDate',
          type: 'date',
          showTimePicker: true,
          dateFormatText: App.is24HourClock() ? this.startingFormatText24 : this.startingFormatText,
          minValue: new Date(1900, 0, 1),
          validator: [_Validator2.default.exists, _Validator2.default.isDateInRange]
        }, {
          label: this.durationText,
          title: this.durationTitleText,
          name: 'Duration',
          property: 'Duration',
          type: 'duration',
          view: 'select_list',
          data: this.createDurationData(),
          validator: {
            fn: function testDisabled(val, field) {
              if (field.isDisabled()) {
                return false;
              }
              if (!/^\d+$/.test(val)) {
                return true;
              }
            },
            message: this.durationInvalidText
          }
        }, {
          label: this.timelessText,
          name: 'Timeless',
          property: 'Timeless',
          type: 'boolean'
        }]
      }, {
        title: this.completionText,
        name: 'CompletionSection',
        collapsed: false,
        children: [{
          label: this.asScheduledText,
          include: false,
          name: 'AsScheduled',
          property: 'AsScheduled',
          type: 'boolean'
        }, {
          label: this.completedText,
          name: 'CompletedDate',
          property: 'CompletedDate',
          type: 'date',
          showTimePicker: true,
          dateFormatText: this.completedFormatText,
          minValue: new Date(1900, 0, 1),
          validator: [_Validator2.default.exists, _Validator2.default.isDateInRange]
        }, {
          dependsOn: 'Type',
          label: this.resultText,
          name: 'Result',
          property: 'Result',
          storageMode: 'code', // The onResultChange changes the value back to text
          picklist: this.formatPicklistForType.bindDelegate(this, 'Result'),
          title: this.resultTitleText,
          orderBy: 'text asc',
          type: 'picklist',
          maxTextLength: 64,
          validator: _Validator2.default.exceedsMaxTextLength
        }, {
          name: 'ResultCode',
          property: 'ResultCode',
          type: 'hidden'
        }, {
          label: this.followUpText,
          title: this.followUpTitleText,
          name: 'Followup',
          property: 'Followup',
          type: 'select',
          view: 'select_list',
          textRenderer: this.formatFollowupText.bindDelegate(this),
          requireSelection: true,
          valueKeyProperty: false,
          valueTextProperty: false,
          data: this.createFollowupData(),
          include: false
        }, {
          label: this.carryOverNotesText,
          include: false,
          name: 'CarryOverNotes',
          property: 'CarryOverNotes',
          type: 'boolean'
        }]
      }, {
        title: this.otherInfoText,
        name: 'OtherInfoSection',
        collapsed: false,
        children: [{
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
          title: this.categoryTitleText,
          type: 'picklist',
          maxTextLength: 64,
          validator: _Validator2.default.exceedsMaxTextLength
        }, {
          type: 'hidden',
          name: 'UserId',
          property: 'UserId'
        }, {
          label: this.leaderText,
          name: 'Leader',
          property: 'Leader',
          include: false,
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
          applyTo: '.',
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
          applyTo: '.',
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
          applyTo: '.',
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
        }]
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});