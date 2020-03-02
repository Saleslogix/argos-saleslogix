define('crm/Views/Activity/Complete', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/connect', 'dojo/string', '../../Environment', '../../Validator', '../../Template', 'argos/Utility', 'argos/Edit', '../../Models/Names', 'argos/Models/Types', 'argos/I18n'], function (module, exports, _declare, _connect, _string, _Environment, _Validator, _Template, _Utility, _Edit, _Names, _Types, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _connect2 = _interopRequireDefault(_connect);

  var _string2 = _interopRequireDefault(_string);

  var _Environment2 = _interopRequireDefault(_Environment);

  var _Validator2 = _interopRequireDefault(_Validator);

  var _Template2 = _interopRequireDefault(_Template);

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

  var resource = (0, _I18n2.default)('activityComplete'); /* Copyright 2017 Infor
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

  var dtFormatResource = (0, _I18n2.default)('activityCompleteDateTimeFormat');

  var __class = (0, _declare2.default)('crm.Views.Activity.Complete', [_Edit2.default], {
    // Localization
    activityInfoText: resource.activityInfoText,
    accountText: resource.accountText,
    contactText: resource.contactText,
    opportunityText: resource.opportunityText,
    ticketNumberText: resource.ticketNumberText,
    companyText: resource.companyText,
    leadText: resource.leadText,
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

    entityName: 'Activity',
    querySelect: ['AccountId', 'AccountName', 'Alarm', 'AlarmTime', 'Category', 'ContactId', 'ContactName', 'CompletedDate', 'Description', 'Duration', 'Leader/$key', 'LeadId', 'LeadName', 'LongNotes', 'OpportunityId', 'OpportunityName', 'Priority', 'Regarding', 'Result', 'Rollover', 'StartDate', 'TicketId', 'TicketNumber', 'Timeless', 'Type', 'Recurring', 'RecurrenceState', 'AllowAdd', 'AllowEdit', 'AllowDelete', 'AllowComplete'],
    resourceKind: 'activities',
    contractName: 'system',

    init: function init() {
      this.inherited(init, arguments);

      this.connect(this.fields.Leader, 'onChange', this.onLeaderChange);
      this.connect(this.fields.Timeless, 'onChange', this.onTimelessChange);
      this.connect(this.fields.AsScheduled, 'onChange', this.onAsScheduledChange);
      this.connect(this.fields.Followup, 'onChange', this.onFollowupChange);
      this.connect(this.fields.Lead, 'onChange', this.onLeadChange);
      this.connect(this.fields.Result, 'onChange', this.onResultChange);
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
      var _this = this;

      this.inherited(beforeTransitionTo, arguments);

      this.fieldsForStandard.concat(this.fieldsForLeads).forEach(function hideFields(item) {
        if (this.fields[item]) {
          this.fields[item].hide();
        }
      }, this);

      var entry = this.options && this.options.entry;
      if (this.isActivityForLead(entry)) {
        this.fieldsForLeads.forEach(function (item) {
          if (_this.fields[item]) {
            _this.fields[item].show();
          }
        }, this);
      } else {
        this.fieldsForStandard.forEach(function (item) {
          if (_this.fields[item]) {
            _this.fields[item].show();
          }
        }, this);
      }
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
      var startDate = startDateField.getValue();

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
        var duration = this.fields.Duration.getValue();
        var startDate = moment(this.fields.StartDate.getValue());
        var completedDate = startDate.add({
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
      var disable = value === 'none' || value && value.key === 'none';
      this.toggleSelectField(this.fields.CarryOverNotes, disable);
    },
    onLeadChange: function onLeadChange(value, field) {
      var selection = field.getSelection();

      if (selection && this.insert) {
        this.fields.Company.setValue(_Utility2.default.getValue(selection, 'Company'));
      }
    },
    formatPicklistForType: function formatPicklistForType(type, which) {
      return this.picklistsByType[type] && this.picklistsByType[type][which];
    },
    setValues: function setValues() {
      this.inherited(setValues, arguments);
      this.fields.CarryOverNotes.setValue(true);
      this.fields.CompletedDate.setValue(new Date());
      this.fields.Followup.setValue('none');
      this.fields.Result.setValue('Complete');
      this.fields.ResultCode.setValue('COM');

      this.toggleSelectField(this.fields.CarryOverNotes, true);
      this.toggleSelectField(this.fields.CompletedDate, false);
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
            $descriptor: value && value.text
          });
        }
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
    formatFollowupText: function formatFollowupText(val, key, text) {
      return this.followupValueText[key] || text;
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
    createFollowupData: function createFollowupData() {
      var list = [];

      for (var followup in this.followupValueText) {
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
      var view = App.getView(this.followupView);
      var followupEntry = {
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
      var user = App.context.user;
      if (user) {
        this.fields.UserId.setValue(user.$key);

        var leaderField = this.fields.Leader;
        leaderField.setValue(user);
        this.onLeaderChange(user, leaderField);
      }
    },
    completeActivity: function completeActivity(entry, callback) {
      var activityModel = App.ModelManager.getModel(_Names2.default.ACTIVITY, _Types2.default.SDATA);
      entry.Leader = this.fields.Leader.getValue();
      entry.Result = this.fields.Result.getValue();
      entry.ResultCode = this.fields.ResultCode.getValue();
      entry.CompletedDate = this.fields.CompletedDate.getValue();

      var success = function refreshStale(scope, theCallback, theEntry) {
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

      var followup = this.fields.Followup.getValue() === 'none' ? this.getInherited(onUpdateCompleted, arguments) : this.navigateToFollowUpView;
      entry.$completedBasedOn = this._completedBasedOn;
      this.completeActivity(entry, followup);
    },
    formatDependentQuery: function formatDependentQuery(dependentValue, format, property) {
      var theProperty = property || '$key';

      return _string2.default.substitute(format, [_Utility2.default.getValue(dependentValue, theProperty)]);
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
        }]
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});