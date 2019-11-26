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

  /**
   * @class crm.Views.Activity.Complete
   *
   * @extends argos.Edit
   * @mixins argos.Edit
   *
   * @requires argos.Edit
   * @requires argos.Utility
   *
   * @requires crm.Environment
   * @requires crm.Validator
   * @requires crm.Template
   *
   * @requires moment
   *
   */
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
      15: resource.quarterHourText,
      30: resource.halfHourText,
      60: resource.hourText,
      90: resource.hourAndHalfText,
      120: resource.twoHoursText
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
      var userId = field.getValue();
      this.fields.UserId.setValue(userId && userId.$key);
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
          formatString: App.is24HourClock() ? this.startingFormatText24 : this.startingFormatText,
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
          formatString: this.completedFormatText,
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
          textProperty: 'UserInfo',
          textTemplate: _Template2.default.nameLF,
          requireSelection: true,
          view: 'user_list'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BY3Rpdml0eS9Db21wbGV0ZS5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsImR0Rm9ybWF0UmVzb3VyY2UiLCJfX2NsYXNzIiwiYWN0aXZpdHlJbmZvVGV4dCIsImFjY291bnRUZXh0IiwiY29udGFjdFRleHQiLCJvcHBvcnR1bml0eVRleHQiLCJ0aWNrZXROdW1iZXJUZXh0IiwiY29tcGFueVRleHQiLCJsZWFkVGV4dCIsImFzU2NoZWR1bGVkVGV4dCIsImNhdGVnb3J5VGV4dCIsImNhdGVnb3J5VGl0bGVUZXh0IiwiY29tcGxldGVkVGV4dCIsImNvbXBsZXRlZEZvcm1hdFRleHQiLCJjb21wbGV0ZWRGb3JtYXRUZXh0MjQiLCJjb21wbGV0aW9uVGV4dCIsImR1cmF0aW9uVGV4dCIsImR1cmF0aW9uVGl0bGVUZXh0IiwiZHVyYXRpb25JbnZhbGlkVGV4dCIsImNhcnJ5T3Zlck5vdGVzVGV4dCIsImZvbGxvd1VwVGV4dCIsImZvbGxvd1VwVGl0bGVUZXh0IiwibGVhZGVyVGV4dCIsImxvbmdOb3Rlc1RleHQiLCJsb25nTm90ZXNUaXRsZVRleHQiLCJvdGhlckluZm9UZXh0IiwicHJpb3JpdHlUZXh0IiwicHJpb3JpdHlUaXRsZVRleHQiLCJyZWdhcmRpbmdUZXh0IiwicmVnYXJkaW5nVGl0bGVUZXh0IiwicmVzdWx0VGV4dCIsInJlc3VsdFRpdGxlVGV4dCIsInN0YXJ0aW5nVGV4dCIsInN0YXJ0aW5nRm9ybWF0VGV4dCIsInN0YXJ0aW5nRm9ybWF0VGV4dDI0Iiwic3RhcnRpbmdUaW1lbGVzc0Zvcm1hdFRleHQiLCJ0aW1lbGVzc1RleHQiLCJyZWN1cnJpbmdBY3Rpdml0eUlkU2VwYXJhdG9yIiwiZHVyYXRpb25WYWx1ZVRleHQiLCJub25lVGV4dCIsInF1YXJ0ZXJIb3VyVGV4dCIsImhhbGZIb3VyVGV4dCIsImhvdXJUZXh0IiwiaG91ckFuZEhhbGZUZXh0IiwidHdvSG91cnNUZXh0IiwiZm9sbG93dXBWYWx1ZVRleHQiLCJub25lIiwibm9uZVByb3BUZXh0IiwiYXRQaG9uZUNhbGwiLCJwaG9uZUNhbGxUZXh0IiwiYXRBcHBvaW50bWVudCIsIm1lZXRpbmdUZXh0IiwiYXRUb0RvIiwidG9Eb1RleHQiLCJhdFBlcnNvbmFsIiwicGVyc29uYWxUZXh0IiwiaWQiLCJmb2xsb3d1cFZpZXciLCJmaWVsZHNGb3JMZWFkcyIsImZpZWxkc0ZvclN0YW5kYXJkIiwicGlja2xpc3RzQnlUeXBlIiwiQ2F0ZWdvcnkiLCJEZXNjcmlwdGlvbiIsIlJlc3VsdCIsImF0TGl0ZXJhdHVyZSIsImF0RU1haWwiLCJlbnRpdHlOYW1lIiwicXVlcnlTZWxlY3QiLCJyZXNvdXJjZUtpbmQiLCJjb250cmFjdE5hbWUiLCJpbml0IiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiY29ubmVjdCIsImZpZWxkcyIsIkxlYWRlciIsIm9uTGVhZGVyQ2hhbmdlIiwiVGltZWxlc3MiLCJvblRpbWVsZXNzQ2hhbmdlIiwiQXNTY2hlZHVsZWQiLCJvbkFzU2NoZWR1bGVkQ2hhbmdlIiwiRm9sbG93dXAiLCJvbkZvbGxvd3VwQ2hhbmdlIiwiTGVhZCIsIm9uTGVhZENoYW5nZSIsIm9uUmVzdWx0Q2hhbmdlIiwidmFsdWUiLCJmaWVsZCIsInNldFZhbHVlIiwidGV4dCIsIlJlc3VsdENvZGUiLCJleGVjIiwia2V5IiwiaXNBY3Rpdml0eUZvckxlYWQiLCJlbnRyeSIsInRlc3QiLCJMZWFkSWQiLCJiZWZvcmVUcmFuc2l0aW9uVG8iLCJjb25jYXQiLCJmb3JFYWNoIiwiaGlkZUZpZWxkcyIsIml0ZW0iLCJoaWRlIiwib3B0aW9ucyIsInNob3ciLCJ0b2dnbGVTZWxlY3RGaWVsZCIsImRpc2FibGUiLCJlbmFibGUiLCJEdXJhdGlvbiIsInN0YXJ0RGF0ZUZpZWxkIiwiU3RhcnREYXRlIiwic3RhcnREYXRlIiwiZ2V0VmFsdWUiLCJkYXRlRm9ybWF0VGV4dCIsInNob3dUaW1lUGlja2VyIiwidGltZWxlc3MiLCJpc0RhdGVUaW1lbGVzcyIsImNsb25lIiwiY2xlYXJUaW1lIiwiYWRkIiwibWludXRlcyIsImdldFRpbWV6b25lT2Zmc2V0Iiwic2Vjb25kcyIsIkFwcCIsImlzMjRIb3VyQ2xvY2siLCJkYXRlIiwiZ2V0VVRDSG91cnMiLCJnZXRVVENNaW51dGVzIiwiZ2V0VVRDU2Vjb25kcyIsInNjaGVkdWxlZCIsImR1cmF0aW9uIiwibW9tZW50IiwiY29tcGxldGVkRGF0ZSIsInRvRGF0ZSIsIkNvbXBsZXRlZERhdGUiLCJEYXRlIiwiQ2FycnlPdmVyTm90ZXMiLCJzZWxlY3Rpb24iLCJnZXRTZWxlY3Rpb24iLCJpbnNlcnQiLCJDb21wYW55IiwiZm9ybWF0UGlja2xpc3RGb3JUeXBlIiwidHlwZSIsIndoaWNoIiwic2V0VmFsdWVzIiwidXNlcklkIiwiVXNlcklkIiwiJGtleSIsImZvcm1hdEZvbGxvd3VwVGV4dCIsInZhbCIsImNyZWF0ZUR1cmF0aW9uRGF0YSIsImxpc3QiLCJoYXNPd25Qcm9wZXJ0eSIsInB1c2giLCIkZGVzY3JpcHRvciIsIiRyZXNvdXJjZXMiLCJjcmVhdGVGb2xsb3d1cERhdGEiLCJmb2xsb3d1cCIsIm5hdmlnYXRlVG9Gb2xsb3dVcFZpZXciLCJ2aWV3IiwiZ2V0VmlldyIsImZvbGxvd3VwRW50cnkiLCJUeXBlIiwiQWNjb3VudElkIiwiQWNjb3VudE5hbWUiLCJDb250YWN0SWQiLCJDb250YWN0TmFtZSIsIkxlYWROYW1lIiwiTG9uZ05vdGVzIiwiT3Bwb3J0dW5pdHlJZCIsIk9wcG9ydHVuaXR5TmFtZSIsIlRpY2tldElkIiwiVGlja2V0TnVtYmVyIiwidGl0bGUiLCJyZXR1cm5UbyIsImNvbXBsZXRlQWN0aXZpdHkiLCJjYWxsYmFjayIsImFjdGl2aXR5TW9kZWwiLCJNb2RlbE1hbmFnZXIiLCJnZXRNb2RlbCIsIkFDVElWSVRZIiwiU0RBVEEiLCJzdWNjZXNzIiwicmVmcmVzaFN0YWxlIiwic2NvcGUiLCJ0aGVDYWxsYmFjayIsInRoZUVudHJ5IiwicmVmcmVzaFN0YWxlVmlld3MiLCJyZWZyZXNoU3RhbGVEZXRhaWxWaWV3cyIsInB1Ymxpc2giLCJhcHBseSIsInRoZW4iLCJvblJlcXVlc3RGYWlsdXJlIiwib25QdXRDb21wbGV0ZSIsIl9jb21wbGV0ZWRCYXNlZE9uIiwic3BsaXQiLCJsZW5ndGgiLCJvblVwZGF0ZUNvbXBsZXRlZCIsImdldEluaGVyaXRlZCIsIiRjb21wbGV0ZWRCYXNlZE9uIiwiZm9ybWF0RGVwZW5kZW50UXVlcnkiLCJkZXBlbmRlbnRWYWx1ZSIsImZvcm1hdCIsInByb3BlcnR5IiwidGhlUHJvcGVydHkiLCJzdWJzdGl0dXRlIiwiY3JlYXRlTGF5b3V0IiwibGF5b3V0IiwibmFtZSIsImNvbGxhcHNlZCIsImNoaWxkcmVuIiwiZGVwZW5kc09uIiwibGFiZWwiLCJwaWNrbGlzdCIsImJpbmREZWxlZ2F0ZSIsIm9yZGVyQnkiLCJtYXhUZXh0TGVuZ3RoIiwidmFsaWRhdG9yIiwiZXhjZWVkc01heFRleHRMZW5ndGgiLCJub3RlUHJvcGVydHkiLCJmb3JtYXRTdHJpbmciLCJtaW5WYWx1ZSIsImV4aXN0cyIsImlzRGF0ZUluUmFuZ2UiLCJkYXRhIiwiZm4iLCJ0ZXN0RGlzYWJsZWQiLCJpc0Rpc2FibGVkIiwibWVzc2FnZSIsImluY2x1ZGUiLCJzdG9yYWdlTW9kZSIsInRleHRSZW5kZXJlciIsInJlcXVpcmVTZWxlY3Rpb24iLCJ2YWx1ZUtleVByb3BlcnR5IiwidmFsdWVUZXh0UHJvcGVydHkiLCJ0ZXh0UHJvcGVydHkiLCJ0ZXh0VGVtcGxhdGUiLCJuYW1lTEYiLCJlbXB0eVRleHQiLCJhcHBseVRvIiwid2hlcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRCQSxNQUFNQSxXQUFXLG9CQUFZLGtCQUFaLENBQWpCLEMsQ0E1QkE7Ozs7Ozs7Ozs7Ozs7OztBQTZCQSxNQUFNQyxtQkFBbUIsb0JBQVksZ0NBQVosQ0FBekI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkEsTUFBTUMsVUFBVSx1QkFBUSw2QkFBUixFQUF1QyxnQkFBdkMsRUFBK0M7QUFDN0Q7QUFDQUMs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QU0scUJBVkw7QUFXRGlGLGlCQUFPLEtBQUt4QyxvQkFBTCxDQUEwQmMsWUFBMUIsQ0FBdUMsSUFBdkMsRUFBNkMsc0JBQTdDLEVBQXFFLFdBQXJFO0FBWE4sU0F4RE8sRUFvRVA7QUFDREgscUJBQVcsU0FEVjtBQUVEQyxpQkFBTyxLQUFLOU0sZ0JBRlg7QUFHRDBNLGdCQUFNLFFBSEw7QUFJREwsb0JBQVUsUUFKVDtBQUtEN0QsZ0JBQU0sUUFMTDtBQU1EZ0cscUJBQVcsRUFOVjtBQU9EQyxtQkFBUyxHQVBSO0FBUUROLDRCQUFrQixVQVJqQjtBQVNEQyw2QkFBbUIsY0FUbEI7QUFVRDNFLGdCQUFNLGdCQVZMO0FBV0RpRixpQkFBTyxLQUFLeEMsb0JBQUwsQ0FBMEJjLFlBQTFCLENBQXVDLElBQXZDLEVBQTZDLHNCQUE3QyxFQUFxRSxXQUFyRTtBQVhOLFNBcEVPLEVBZ0ZQO0FBQ0RGLGlCQUFPLEtBQUs1TSxRQURYO0FBRUR3TSxnQkFBTSxNQUZMO0FBR0RMLG9CQUFVLE1BSFQ7QUFJRDdELGdCQUFNLFFBSkw7QUFLRGdHLHFCQUFXLEVBTFY7QUFNREMsbUJBQVMsR0FOUjtBQU9ETiw0QkFBa0IsUUFQakI7QUFRREMsNkJBQW1CLFVBUmxCO0FBU0QzRSxnQkFBTTtBQVRMLFNBaEZPLEVBMEZQO0FBQ0RxRCxpQkFBTyxLQUFLN00sV0FEWDtBQUVEeU0sZ0JBQU0sYUFGTDtBQUdETCxvQkFBVSxhQUhUO0FBSUQ3RCxnQkFBTTtBQUpMLFNBMUZPO0FBSlQsT0ExSGtDLENBQTlCLENBQVA7QUErTkQ7QUF4bEI0RCxHQUEvQyxDQUFoQjs7b0JBMmxCZTdJLE8iLCJmaWxlIjoiQ29tcGxldGUuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgY29ubmVjdCBmcm9tICdkb2pvL19iYXNlL2Nvbm5lY3QnO1xyXG5pbXBvcnQgc3RyaW5nIGZyb20gJ2Rvam8vc3RyaW5nJztcclxuaW1wb3J0IGVudmlyb25tZW50IGZyb20gJy4uLy4uL0Vudmlyb25tZW50JztcclxuaW1wb3J0IHZhbGlkYXRvciBmcm9tICcuLi8uLi9WYWxpZGF0b3InO1xyXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi4vLi4vVGVtcGxhdGUnO1xyXG5pbXBvcnQgdXRpbGl0eSBmcm9tICdhcmdvcy9VdGlsaXR5JztcclxuaW1wb3J0IEVkaXQgZnJvbSAnYXJnb3MvRWRpdCc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi8uLi9Nb2RlbHMvTmFtZXMnO1xyXG5pbXBvcnQgTU9ERUxfVFlQRVMgZnJvbSAnYXJnb3MvTW9kZWxzL1R5cGVzJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2FjdGl2aXR5Q29tcGxldGUnKTtcclxuY29uc3QgZHRGb3JtYXRSZXNvdXJjZSA9IGdldFJlc291cmNlKCdhY3Rpdml0eUNvbXBsZXRlRGF0ZVRpbWVGb3JtYXQnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLkFjdGl2aXR5LkNvbXBsZXRlXHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkVkaXRcclxuICogQG1peGlucyBhcmdvcy5FZGl0XHJcbiAqXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5FZGl0XHJcbiAqIEByZXF1aXJlcyBhcmdvcy5VdGlsaXR5XHJcbiAqXHJcbiAqIEByZXF1aXJlcyBjcm0uRW52aXJvbm1lbnRcclxuICogQHJlcXVpcmVzIGNybS5WYWxpZGF0b3JcclxuICogQHJlcXVpcmVzIGNybS5UZW1wbGF0ZVxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgbW9tZW50XHJcbiAqXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLkFjdGl2aXR5LkNvbXBsZXRlJywgW0VkaXRdLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgYWN0aXZpdHlJbmZvVGV4dDogcmVzb3VyY2UuYWN0aXZpdHlJbmZvVGV4dCxcclxuICBhY2NvdW50VGV4dDogcmVzb3VyY2UuYWNjb3VudFRleHQsXHJcbiAgY29udGFjdFRleHQ6IHJlc291cmNlLmNvbnRhY3RUZXh0LFxyXG4gIG9wcG9ydHVuaXR5VGV4dDogcmVzb3VyY2Uub3Bwb3J0dW5pdHlUZXh0LFxyXG4gIHRpY2tldE51bWJlclRleHQ6IHJlc291cmNlLnRpY2tldE51bWJlclRleHQsXHJcbiAgY29tcGFueVRleHQ6IHJlc291cmNlLmNvbXBhbnlUZXh0LFxyXG4gIGxlYWRUZXh0OiByZXNvdXJjZS5sZWFkVGV4dCxcclxuICBhc1NjaGVkdWxlZFRleHQ6IHJlc291cmNlLmFzU2NoZWR1bGVkVGV4dCxcclxuICBjYXRlZ29yeVRleHQ6IHJlc291cmNlLmNhdGVnb3J5VGV4dCxcclxuICBjYXRlZ29yeVRpdGxlVGV4dDogcmVzb3VyY2UuY2F0ZWdvcnlUaXRsZVRleHQsXHJcbiAgY29tcGxldGVkVGV4dDogcmVzb3VyY2UuY29tcGxldGVkVGV4dCxcclxuICBjb21wbGV0ZWRGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLmNvbXBsZXRlZEZvcm1hdFRleHQsXHJcbiAgY29tcGxldGVkRm9ybWF0VGV4dDI0OiBkdEZvcm1hdFJlc291cmNlLmNvbXBsZXRlZEZvcm1hdFRleHQyNCxcclxuICBjb21wbGV0aW9uVGV4dDogcmVzb3VyY2UuY29tcGxldGlvblRleHQsXHJcbiAgZHVyYXRpb25UZXh0OiByZXNvdXJjZS5kdXJhdGlvblRleHQsXHJcbiAgZHVyYXRpb25UaXRsZVRleHQ6IHJlc291cmNlLmR1cmF0aW9uVGl0bGVUZXh0LFxyXG4gIGR1cmF0aW9uSW52YWxpZFRleHQ6IHJlc291cmNlLmR1cmF0aW9uSW52YWxpZFRleHQsXHJcbiAgY2FycnlPdmVyTm90ZXNUZXh0OiByZXNvdXJjZS5jYXJyeU92ZXJOb3Rlc1RleHQsXHJcbiAgZm9sbG93VXBUZXh0OiByZXNvdXJjZS5mb2xsb3dVcFRleHQsXHJcbiAgZm9sbG93VXBUaXRsZVRleHQ6IHJlc291cmNlLmZvbGxvd1VwVGl0bGVUZXh0LFxyXG4gIGxlYWRlclRleHQ6IHJlc291cmNlLmxlYWRlclRleHQsXHJcbiAgbG9uZ05vdGVzVGV4dDogcmVzb3VyY2UubG9uZ05vdGVzVGV4dCxcclxuICBsb25nTm90ZXNUaXRsZVRleHQ6IHJlc291cmNlLmxvbmdOb3Rlc1RpdGxlVGV4dCxcclxuICBvdGhlckluZm9UZXh0OiByZXNvdXJjZS5vdGhlckluZm9UZXh0LFxyXG4gIHByaW9yaXR5VGV4dDogcmVzb3VyY2UucHJpb3JpdHlUZXh0LFxyXG4gIHByaW9yaXR5VGl0bGVUZXh0OiByZXNvdXJjZS5wcmlvcml0eVRpdGxlVGV4dCxcclxuICByZWdhcmRpbmdUZXh0OiByZXNvdXJjZS5yZWdhcmRpbmdUZXh0LFxyXG4gIHJlZ2FyZGluZ1RpdGxlVGV4dDogcmVzb3VyY2UucmVnYXJkaW5nVGl0bGVUZXh0LFxyXG4gIHJlc3VsdFRleHQ6IHJlc291cmNlLnJlc3VsdFRleHQsXHJcbiAgcmVzdWx0VGl0bGVUZXh0OiByZXNvdXJjZS5yZXN1bHRUaXRsZVRleHQsXHJcbiAgc3RhcnRpbmdUZXh0OiByZXNvdXJjZS5zdGFydGluZ1RleHQsXHJcbiAgc3RhcnRpbmdGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLnN0YXJ0aW5nRm9ybWF0VGV4dCxcclxuICBzdGFydGluZ0Zvcm1hdFRleHQyNDogZHRGb3JtYXRSZXNvdXJjZS5zdGFydGluZ0Zvcm1hdFRleHQyNCxcclxuICBzdGFydGluZ1RpbWVsZXNzRm9ybWF0VGV4dDogZHRGb3JtYXRSZXNvdXJjZS5zdGFydGluZ1RpbWVsZXNzRm9ybWF0VGV4dCxcclxuICB0aW1lbGVzc1RleHQ6IHJlc291cmNlLnRpbWVsZXNzVGV4dCxcclxuICByZWN1cnJpbmdBY3Rpdml0eUlkU2VwYXJhdG9yOiAnOycsXHJcbiAgZHVyYXRpb25WYWx1ZVRleHQ6IHtcclxuICAgIDA6IHJlc291cmNlLm5vbmVUZXh0LFxyXG4gICAgMTU6IHJlc291cmNlLnF1YXJ0ZXJIb3VyVGV4dCxcclxuICAgIDMwOiByZXNvdXJjZS5oYWxmSG91clRleHQsXHJcbiAgICA2MDogcmVzb3VyY2UuaG91clRleHQsXHJcbiAgICA5MDogcmVzb3VyY2UuaG91ckFuZEhhbGZUZXh0LFxyXG4gICAgMTIwOiByZXNvdXJjZS50d29Ib3Vyc1RleHQsXHJcbiAgfSxcclxuICBmb2xsb3d1cFZhbHVlVGV4dDoge1xyXG4gICAgbm9uZTogcmVzb3VyY2Uubm9uZVByb3BUZXh0LFxyXG4gICAgYXRQaG9uZUNhbGw6IHJlc291cmNlLnBob25lQ2FsbFRleHQsXHJcbiAgICBhdEFwcG9pbnRtZW50OiByZXNvdXJjZS5tZWV0aW5nVGV4dCxcclxuICAgIGF0VG9EbzogcmVzb3VyY2UudG9Eb1RleHQsXHJcbiAgICBhdFBlcnNvbmFsOiByZXNvdXJjZS5wZXJzb25hbFRleHQsXHJcbiAgfSxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdhY3Rpdml0eV9jb21wbGV0ZScsXHJcbiAgZm9sbG93dXBWaWV3OiAnYWN0aXZpdHlfZWRpdCcsXHJcbiAgZmllbGRzRm9yTGVhZHM6IFsnQWNjb3VudE5hbWUnLCAnTGVhZCddLFxyXG4gIGZpZWxkc0ZvclN0YW5kYXJkOiBbJ0FjY291bnQnLCAnQ29udGFjdCcsICdPcHBvcnR1bml0eScsICdUaWNrZXQnXSxcclxuICBwaWNrbGlzdHNCeVR5cGU6IHtcclxuICAgIGF0QXBwb2ludG1lbnQ6IHtcclxuICAgICAgQ2F0ZWdvcnk6ICdNZWV0aW5nIENhdGVnb3J5IENvZGVzJyxcclxuICAgICAgRGVzY3JpcHRpb246ICdNZWV0aW5nIFJlZ2FyZGluZycsXHJcbiAgICAgIFJlc3VsdDogJ01lZXRpbmcgUmVzdWx0IENvZGVzJyxcclxuICAgIH0sXHJcbiAgICBhdExpdGVyYXR1cmU6IHtcclxuICAgICAgRGVzY3JpcHRpb246ICdMaXQgUmVxdWVzdCBSZWdhcmRpbmcnLFxyXG4gICAgfSxcclxuICAgIGF0UGVyc29uYWw6IHtcclxuICAgICAgQ2F0ZWdvcnk6ICdNZWV0aW5nIENhdGVnb3J5IENvZGVzJyxcclxuICAgICAgRGVzY3JpcHRpb246ICdQZXJzb25hbCBBY3Rpdml0eSBSZWdhcmRpbmcnLFxyXG4gICAgICBSZXN1bHQ6ICdQZXJzb25hbCBBY3Rpdml0eSBSZXN1bHQgQ29kZXMnLFxyXG4gICAgfSxcclxuICAgIGF0UGhvbmVDYWxsOiB7XHJcbiAgICAgIENhdGVnb3J5OiAnUGhvbmUgQ2FsbCBDYXRlZ29yeSBDb2RlcycsXHJcbiAgICAgIERlc2NyaXB0aW9uOiAnUGhvbmUgQ2FsbCBSZWdhcmRpbmcnLFxyXG4gICAgICBSZXN1bHQ6ICdQaG9uZSBDYWxsIFJlc3VsdCBDb2RlcycsXHJcbiAgICB9LFxyXG4gICAgYXRUb0RvOiB7XHJcbiAgICAgIENhdGVnb3J5OiAnVG8gRG8gQ2F0ZWdvcnkgQ29kZXMnLFxyXG4gICAgICBEZXNjcmlwdGlvbjogJ1RvIERvIFJlZ2FyZGluZycsXHJcbiAgICAgIFJlc3VsdDogJ1RvIERvIFJlc3VsdCBDb2RlcycsXHJcbiAgICB9LFxyXG4gICAgYXRFTWFpbDoge1xyXG4gICAgICBDYXRlZ29yeTogJ0UtbWFpbCBDYXRlZ29yeSBDb2RlcycsXHJcbiAgICAgIERlc2NyaXB0aW9uOiAnRS1tYWlsIFJlZ2FyZGluZycsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIGVudGl0eU5hbWU6ICdBY3Rpdml0eScsXHJcbiAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICdBY2NvdW50SWQnLFxyXG4gICAgJ0FjY291bnROYW1lJyxcclxuICAgICdBbGFybScsXHJcbiAgICAnQWxhcm1UaW1lJyxcclxuICAgICdDYXRlZ29yeScsXHJcbiAgICAnQ29udGFjdElkJyxcclxuICAgICdDb250YWN0TmFtZScsXHJcbiAgICAnQ29tcGxldGVkRGF0ZScsXHJcbiAgICAnRGVzY3JpcHRpb24nLFxyXG4gICAgJ0R1cmF0aW9uJyxcclxuICAgICdMZWFkZXIvJGtleScsXHJcbiAgICAnTGVhZElkJyxcclxuICAgICdMZWFkTmFtZScsXHJcbiAgICAnTG9uZ05vdGVzJyxcclxuICAgICdPcHBvcnR1bml0eUlkJyxcclxuICAgICdPcHBvcnR1bml0eU5hbWUnLFxyXG4gICAgJ1ByaW9yaXR5JyxcclxuICAgICdSZWdhcmRpbmcnLFxyXG4gICAgJ1Jlc3VsdCcsXHJcbiAgICAnUm9sbG92ZXInLFxyXG4gICAgJ1N0YXJ0RGF0ZScsXHJcbiAgICAnVGlja2V0SWQnLFxyXG4gICAgJ1RpY2tldE51bWJlcicsXHJcbiAgICAnVGltZWxlc3MnLFxyXG4gICAgJ1R5cGUnLFxyXG4gICAgJ1JlY3VycmluZycsXHJcbiAgICAnUmVjdXJyZW5jZVN0YXRlJyxcclxuICAgICdBbGxvd0FkZCcsXHJcbiAgICAnQWxsb3dFZGl0JyxcclxuICAgICdBbGxvd0RlbGV0ZScsXHJcbiAgICAnQWxsb3dDb21wbGV0ZScsXHJcbiAgXSxcclxuICByZXNvdXJjZUtpbmQ6ICdhY3Rpdml0aWVzJyxcclxuICBjb250cmFjdE5hbWU6ICdzeXN0ZW0nLFxyXG5cclxuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoaW5pdCwgYXJndW1lbnRzKTtcclxuXHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuTGVhZGVyLCAnb25DaGFuZ2UnLCB0aGlzLm9uTGVhZGVyQ2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5UaW1lbGVzcywgJ29uQ2hhbmdlJywgdGhpcy5vblRpbWVsZXNzQ2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5Bc1NjaGVkdWxlZCwgJ29uQ2hhbmdlJywgdGhpcy5vbkFzU2NoZWR1bGVkQ2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5Gb2xsb3d1cCwgJ29uQ2hhbmdlJywgdGhpcy5vbkZvbGxvd3VwQ2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5MZWFkLCAnb25DaGFuZ2UnLCB0aGlzLm9uTGVhZENoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuUmVzdWx0LCAnb25DaGFuZ2UnLCB0aGlzLm9uUmVzdWx0Q2hhbmdlKTtcclxuICB9LFxyXG4gIG9uUmVzdWx0Q2hhbmdlOiBmdW5jdGlvbiBvblJlc3VsdENoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIC8vIFNldCB0aGUgUmVzdWx0IGZpZWxkIGJhY2sgdG8gdGhlIHRleHQgdmFsdWUsIGFuZCB0YWtlIHRoZSBwaWNrbGlzdCBjb2RlIGFuZCBzZXQgdGhhdCB0byB0aGUgUmVzdWx0c0NvZGVcclxuICAgIGZpZWxkLnNldFZhbHVlKHZhbHVlLnRleHQpO1xyXG5cclxuICAgIC8vIE1heCBsZW5ndGggZm9yIFJFU1VMVENPREUgaXMgOCBjaGFycywgdGhlIHNkYXRhIGVuZHBvaW50IGRvZXNuJ3QgaGFuZGxlIHRoaXMsIHNvIHdlIHdpbGwgdHJ1bmNhdGUgbGlrZSB0aGUgTEFOIGlmIG5lY2Vzc2FyeVxyXG4gICAgdGhpcy5maWVsZHMuUmVzdWx0Q29kZS5zZXRWYWx1ZSgoLy57MCw4fS9pZylcclxuICAgICAgLmV4ZWModmFsdWUua2V5KSk7XHJcbiAgfSxcclxuICBpc0FjdGl2aXR5Rm9yTGVhZDogZnVuY3Rpb24gaXNBY3Rpdml0eUZvckxlYWQoZW50cnkpIHtcclxuICAgIHJldHVybiBlbnRyeSAmJiAvXltcXHddezEyfSQvLnRlc3QoZW50cnkuTGVhZElkKTtcclxuICB9LFxyXG4gIGJlZm9yZVRyYW5zaXRpb25UbzogZnVuY3Rpb24gYmVmb3JlVHJhbnNpdGlvblRvKCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYmVmb3JlVHJhbnNpdGlvblRvLCBhcmd1bWVudHMpO1xyXG5cclxuICAgIHRoaXMuZmllbGRzRm9yU3RhbmRhcmQuY29uY2F0KHRoaXMuZmllbGRzRm9yTGVhZHMpLmZvckVhY2goZnVuY3Rpb24gaGlkZUZpZWxkcyhpdGVtKSB7XHJcbiAgICAgIGlmICh0aGlzLmZpZWxkc1tpdGVtXSkge1xyXG4gICAgICAgIHRoaXMuZmllbGRzW2l0ZW1dLmhpZGUoKTtcclxuICAgICAgfVxyXG4gICAgfSwgdGhpcyk7XHJcblxyXG4gICAgY29uc3QgZW50cnkgPSB0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmVudHJ5O1xyXG4gICAgaWYgKHRoaXMuaXNBY3Rpdml0eUZvckxlYWQoZW50cnkpKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzRm9yTGVhZHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmZpZWxkc1tpdGVtXSkge1xyXG4gICAgICAgICAgdGhpcy5maWVsZHNbaXRlbV0uc2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSwgdGhpcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZpZWxkc0ZvclN0YW5kYXJkLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICBpZiAodGhpcy5maWVsZHNbaXRlbV0pIHtcclxuICAgICAgICAgIHRoaXMuZmllbGRzW2l0ZW1dLnNob3coKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIHRoaXMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgdG9nZ2xlU2VsZWN0RmllbGQ6IGZ1bmN0aW9uIHRvZ2dsZVNlbGVjdEZpZWxkKGZpZWxkLCBkaXNhYmxlKSB7XHJcbiAgICBpZiAoZGlzYWJsZSkge1xyXG4gICAgICBmaWVsZC5kaXNhYmxlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmaWVsZC5lbmFibGUoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uVGltZWxlc3NDaGFuZ2U6IGZ1bmN0aW9uIG9uVGltZWxlc3NDaGFuZ2UodmFsdWUpIHtcclxuICAgIHRoaXMudG9nZ2xlU2VsZWN0RmllbGQodGhpcy5maWVsZHMuRHVyYXRpb24sIHZhbHVlKTtcclxuXHJcbiAgICBjb25zdCBzdGFydERhdGVGaWVsZCA9IHRoaXMuZmllbGRzLlN0YXJ0RGF0ZTtcclxuICAgIGxldCBzdGFydERhdGUgPSBzdGFydERhdGVGaWVsZC5nZXRWYWx1ZSgpO1xyXG5cclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICBzdGFydERhdGVGaWVsZC5kYXRlRm9ybWF0VGV4dCA9IHRoaXMuc3RhcnRpbmdUaW1lbGVzc0Zvcm1hdFRleHQ7XHJcbiAgICAgIHN0YXJ0RGF0ZUZpZWxkLnNob3dUaW1lUGlja2VyID0gZmFsc2U7XHJcbiAgICAgIHN0YXJ0RGF0ZUZpZWxkLnRpbWVsZXNzID0gdHJ1ZTtcclxuICAgICAgaWYgKCF0aGlzLmlzRGF0ZVRpbWVsZXNzKHN0YXJ0RGF0ZSkgJiYgc3RhcnREYXRlLmNsb25lKSB7XHJcbiAgICAgICAgc3RhcnREYXRlID0gc3RhcnREYXRlLmNsb25lKCkuY2xlYXJUaW1lKCkuYWRkKHtcclxuICAgICAgICAgIG1pbnV0ZXM6IC0xICogc3RhcnREYXRlLmdldFRpbWV6b25lT2Zmc2V0KCksXHJcbiAgICAgICAgICBzZWNvbmRzOiA1LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHN0YXJ0RGF0ZUZpZWxkLnNldFZhbHVlKHN0YXJ0RGF0ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdGFydERhdGVGaWVsZC5kYXRlRm9ybWF0VGV4dCA9IChBcHAuaXMyNEhvdXJDbG9jaygpKSA/IHRoaXMuc3RhcnRpbmdGb3JtYXRUZXh0MjQgOiB0aGlzLnN0YXJ0aW5nRm9ybWF0VGV4dDtcclxuICAgICAgc3RhcnREYXRlRmllbGQuc2hvd1RpbWVQaWNrZXIgPSB0cnVlO1xyXG4gICAgICBzdGFydERhdGVGaWVsZC50aW1lbGVzcyA9IGZhbHNlO1xyXG4gICAgICBpZiAodGhpcy5pc0RhdGVUaW1lbGVzcyhzdGFydERhdGUpKSB7XHJcbiAgICAgICAgc3RhcnREYXRlID0gc3RhcnREYXRlLmNsb25lKClcclxuICAgICAgICAgIC5hZGQoe1xyXG4gICAgICAgICAgICBtaW51dGVzOiBzdGFydERhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKSArIDEsXHJcbiAgICAgICAgICAgIHNlY29uZHM6IC01LFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgc3RhcnREYXRlRmllbGQuc2V0VmFsdWUoc3RhcnREYXRlKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGlzRGF0ZVRpbWVsZXNzOiBmdW5jdGlvbiBpc0RhdGVUaW1lbGVzcyhkYXRlKSB7XHJcbiAgICBpZiAoIWRhdGUpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGRhdGUuZ2V0VVRDSG91cnMoKSAhPT0gMCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoZGF0ZS5nZXRVVENNaW51dGVzKCkgIT09IDApIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGRhdGUuZ2V0VVRDU2Vjb25kcygpICE9PSA1KSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9LFxyXG4gIG9uQXNTY2hlZHVsZWRDaGFuZ2U6IGZ1bmN0aW9uIG9uQXNTY2hlZHVsZWRDaGFuZ2Uoc2NoZWR1bGVkKSB7XHJcbiAgICBpZiAoc2NoZWR1bGVkKSB7XHJcbiAgICAgIGNvbnN0IGR1cmF0aW9uID0gdGhpcy5maWVsZHMuRHVyYXRpb24uZ2V0VmFsdWUoKTtcclxuICAgICAgY29uc3Qgc3RhcnREYXRlID0gbW9tZW50KHRoaXMuZmllbGRzLlN0YXJ0RGF0ZS5nZXRWYWx1ZSgpKTtcclxuICAgICAgY29uc3QgY29tcGxldGVkRGF0ZSA9IHN0YXJ0RGF0ZS5hZGQoe1xyXG4gICAgICAgIG1pbnV0ZXM6IGR1cmF0aW9uLFxyXG4gICAgICB9KVxyXG4gICAgICAgIC50b0RhdGUoKTtcclxuXHJcbiAgICAgIHRoaXMudG9nZ2xlU2VsZWN0RmllbGQodGhpcy5maWVsZHMuQ29tcGxldGVkRGF0ZSwgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuZmllbGRzLkNvbXBsZXRlZERhdGUuc2V0VmFsdWUoY29tcGxldGVkRGF0ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnRvZ2dsZVNlbGVjdEZpZWxkKHRoaXMuZmllbGRzLkNvbXBsZXRlZERhdGUsIGZhbHNlKTtcclxuICAgICAgdGhpcy5maWVsZHMuQ29tcGxldGVkRGF0ZS5zZXRWYWx1ZShuZXcgRGF0ZSgpKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uRm9sbG93dXBDaGFuZ2U6IGZ1bmN0aW9uIG9uRm9sbG93dXBDaGFuZ2UodmFsdWUpIHtcclxuICAgIGNvbnN0IGRpc2FibGUgPSAodmFsdWUgPT09ICdub25lJyB8fCAodmFsdWUgJiYgdmFsdWUua2V5ID09PSAnbm9uZScpKTtcclxuICAgIHRoaXMudG9nZ2xlU2VsZWN0RmllbGQodGhpcy5maWVsZHMuQ2FycnlPdmVyTm90ZXMsIGRpc2FibGUpO1xyXG4gIH0sXHJcbiAgb25MZWFkQ2hhbmdlOiBmdW5jdGlvbiBvbkxlYWRDaGFuZ2UodmFsdWUsIGZpZWxkKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb24gPSBmaWVsZC5nZXRTZWxlY3Rpb24oKTtcclxuXHJcbiAgICBpZiAoc2VsZWN0aW9uICYmIHRoaXMuaW5zZXJ0KSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLkNvbXBhbnkuc2V0VmFsdWUodXRpbGl0eS5nZXRWYWx1ZShzZWxlY3Rpb24sICdDb21wYW55JykpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZm9ybWF0UGlja2xpc3RGb3JUeXBlOiBmdW5jdGlvbiBmb3JtYXRQaWNrbGlzdEZvclR5cGUodHlwZSwgd2hpY2gpIHtcclxuICAgIHJldHVybiB0aGlzLnBpY2tsaXN0c0J5VHlwZVt0eXBlXSAmJiB0aGlzLnBpY2tsaXN0c0J5VHlwZVt0eXBlXVt3aGljaF07XHJcbiAgfSxcclxuICBzZXRWYWx1ZXM6IGZ1bmN0aW9uIHNldFZhbHVlcygpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKHNldFZhbHVlcywgYXJndW1lbnRzKTtcclxuICAgIHRoaXMuZmllbGRzLkNhcnJ5T3Zlck5vdGVzLnNldFZhbHVlKHRydWUpO1xyXG4gICAgdGhpcy5maWVsZHMuQ29tcGxldGVkRGF0ZS5zZXRWYWx1ZShuZXcgRGF0ZSgpKTtcclxuICAgIHRoaXMuZmllbGRzLkZvbGxvd3VwLnNldFZhbHVlKCdub25lJyk7XHJcbiAgICB0aGlzLmZpZWxkcy5SZXN1bHQuc2V0VmFsdWUoJ0NvbXBsZXRlJyk7XHJcbiAgICB0aGlzLmZpZWxkcy5SZXN1bHRDb2RlLnNldFZhbHVlKCdDT00nKTtcclxuXHJcbiAgICB0aGlzLnRvZ2dsZVNlbGVjdEZpZWxkKHRoaXMuZmllbGRzLkNhcnJ5T3Zlck5vdGVzLCB0cnVlKTtcclxuICAgIHRoaXMudG9nZ2xlU2VsZWN0RmllbGQodGhpcy5maWVsZHMuQ29tcGxldGVkRGF0ZSwgZmFsc2UpO1xyXG4gIH0sXHJcbiAgb25MZWFkZXJDaGFuZ2U6IGZ1bmN0aW9uIG9uTGVhZGVyQ2hhbmdlKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgY29uc3QgdXNlcklkID0gZmllbGQuZ2V0VmFsdWUoKTtcclxuICAgIHRoaXMuZmllbGRzLlVzZXJJZC5zZXRWYWx1ZSh1c2VySWQgJiYgdXNlcklkLiRrZXkpO1xyXG4gIH0sXHJcbiAgZm9ybWF0Rm9sbG93dXBUZXh0OiBmdW5jdGlvbiBmb3JtYXRGb2xsb3d1cFRleHQodmFsLCBrZXksIHRleHQpIHtcclxuICAgIHJldHVybiB0aGlzLmZvbGxvd3VwVmFsdWVUZXh0W2tleV0gfHwgdGV4dDtcclxuICB9LFxyXG4gIGNyZWF0ZUR1cmF0aW9uRGF0YTogZnVuY3Rpb24gY3JlYXRlRHVyYXRpb25EYXRhKCkge1xyXG4gICAgY29uc3QgbGlzdCA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBkdXJhdGlvbiBpbiB0aGlzLmR1cmF0aW9uVmFsdWVUZXh0KSB7XHJcbiAgICAgIGlmICh0aGlzLmR1cmF0aW9uVmFsdWVUZXh0Lmhhc093blByb3BlcnR5KGR1cmF0aW9uKSkge1xyXG4gICAgICAgIGxpc3QucHVzaCh7XHJcbiAgICAgICAgICAka2V5OiBkdXJhdGlvbixcclxuICAgICAgICAgICRkZXNjcmlwdG9yOiB0aGlzLmR1cmF0aW9uVmFsdWVUZXh0W2R1cmF0aW9uXSxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICRyZXNvdXJjZXM6IGxpc3QsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgY3JlYXRlRm9sbG93dXBEYXRhOiBmdW5jdGlvbiBjcmVhdGVGb2xsb3d1cERhdGEoKSB7XHJcbiAgICBjb25zdCBsaXN0ID0gW107XHJcblxyXG4gICAgZm9yIChjb25zdCBmb2xsb3d1cCBpbiB0aGlzLmZvbGxvd3VwVmFsdWVUZXh0KSB7XHJcbiAgICAgIGlmICh0aGlzLmZvbGxvd3VwVmFsdWVUZXh0Lmhhc093blByb3BlcnR5KGZvbGxvd3VwKSkge1xyXG4gICAgICAgIGxpc3QucHVzaCh7XHJcbiAgICAgICAgICAka2V5OiBmb2xsb3d1cCxcclxuICAgICAgICAgICRkZXNjcmlwdG9yOiB0aGlzLmZvbGxvd3VwVmFsdWVUZXh0W2ZvbGxvd3VwXSxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICRyZXNvdXJjZXM6IGxpc3QsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgbmF2aWdhdGVUb0ZvbGxvd1VwVmlldzogZnVuY3Rpb24gbmF2aWdhdGVUb0ZvbGxvd1VwVmlldyhlbnRyeSkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KHRoaXMuZm9sbG93dXBWaWV3KTtcclxuICAgIGNvbnN0IGZvbGxvd3VwRW50cnkgPSB7XHJcbiAgICAgIFR5cGU6IHRoaXMuZmllbGRzLkZvbGxvd3VwLmdldFZhbHVlKCksXHJcbiAgICAgIERlc2NyaXB0aW9uOiBlbnRyeS5EZXNjcmlwdGlvbixcclxuICAgICAgQWNjb3VudElkOiBlbnRyeS5BY2NvdW50SWQsXHJcbiAgICAgIEFjY291bnROYW1lOiBlbnRyeS5BY2NvdW50TmFtZSxcclxuICAgICAgQ29udGFjdElkOiBlbnRyeS5Db250YWN0SWQsXHJcbiAgICAgIENvbnRhY3ROYW1lOiBlbnRyeS5Db250YWN0TmFtZSxcclxuICAgICAgTGVhZElkOiBlbnRyeS5MZWFkSWQsXHJcbiAgICAgIExlYWROYW1lOiBlbnRyeS5MZWFkTmFtZSxcclxuICAgICAgTG9uZ05vdGVzOiAodGhpcy5maWVsZHMuQ2FycnlPdmVyTm90ZXMuZ2V0VmFsdWUoKSAmJiBlbnRyeS5Mb25nTm90ZXMpIHx8ICcnLFxyXG4gICAgICBPcHBvcnR1bml0eUlkOiBlbnRyeS5PcHBvcnR1bml0eUlkLFxyXG4gICAgICBPcHBvcnR1bml0eU5hbWU6IGVudHJ5Lk9wcG9ydHVuaXR5TmFtZSxcclxuICAgICAgU3RhcnREYXRlOiBtb21lbnQoKVxyXG4gICAgICAgIC50b0RhdGUoKSxcclxuICAgICAgVGlja2V0SWQ6IGVudHJ5LlRpY2tldElkLFxyXG4gICAgICBUaWNrZXROdW1iZXI6IGVudHJ5LlRpY2tldE51bWJlcixcclxuICAgIH07XHJcblxyXG4gICAgLy8gUmV0dXJuIHRvIGFjdGl2aXR5IGxpc3QgdmlldyBhZnRlciBmb2xsb3cgdXAuXHJcbiAgICB2aWV3LnNob3coe1xyXG4gICAgICBlbnRyeTogZm9sbG93dXBFbnRyeSxcclxuICAgICAgaW5zZXJ0OiB0cnVlLFxyXG4gICAgICB0aXRsZTogdGhpcy5mb2xsb3d1cFZhbHVlVGV4dFt0aGlzLmZpZWxkcy5Gb2xsb3d1cC5nZXRWYWx1ZSgpXSxcclxuICAgIH0sIHtcclxuICAgICAgcmV0dXJuVG86IC0xLFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBjb21wbGV0ZUFjdGl2aXR5OiBmdW5jdGlvbiBjb21wbGV0ZUFjdGl2aXR5KGVudHJ5LCBjYWxsYmFjaykge1xyXG4gICAgY29uc3QgYWN0aXZpdHlNb2RlbCA9IEFwcC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoTU9ERUxfTkFNRVMuQUNUSVZJVFksIE1PREVMX1RZUEVTLlNEQVRBKTtcclxuICAgIGVudHJ5LkxlYWRlciA9IHRoaXMuZmllbGRzLkxlYWRlci5nZXRWYWx1ZSgpO1xyXG4gICAgZW50cnkuUmVzdWx0ID0gdGhpcy5maWVsZHMuUmVzdWx0LmdldFZhbHVlKCk7XHJcbiAgICBlbnRyeS5SZXN1bHRDb2RlID0gdGhpcy5maWVsZHMuUmVzdWx0Q29kZS5nZXRWYWx1ZSgpO1xyXG4gICAgZW50cnkuQ29tcGxldGVkRGF0ZSA9IHRoaXMuZmllbGRzLkNvbXBsZXRlZERhdGUuZ2V0VmFsdWUoKTtcclxuXHJcbiAgICBjb25zdCBzdWNjZXNzID0gKGZ1bmN0aW9uIHJlZnJlc2hTdGFsZShzY29wZSwgdGhlQ2FsbGJhY2ssIHRoZUVudHJ5KSB7XHJcbiAgICAgIHJldHVybiBmdW5jdGlvbiByZWZyZXNoU3RhbGVWaWV3cygpIHtcclxuICAgICAgICBlbnZpcm9ubWVudC5yZWZyZXNoU3RhbGVEZXRhaWxWaWV3cygpO1xyXG4gICAgICAgIGNvbm5lY3QucHVibGlzaCgnL2FwcC9yZWZyZXNoJywgW3tcclxuICAgICAgICAgIHJlc291cmNlS2luZDogJ2hpc3RvcnknLFxyXG4gICAgICAgIH1dKTtcclxuXHJcbiAgICAgICAgdGhlQ2FsbGJhY2suYXBwbHkoc2NvcGUsIFt0aGVFbnRyeV0pO1xyXG4gICAgICB9O1xyXG4gICAgfSkodGhpcywgY2FsbGJhY2ssIGVudHJ5KTtcclxuXHJcbiAgICBpZiAoYWN0aXZpdHlNb2RlbCkge1xyXG4gICAgICBhY3Rpdml0eU1vZGVsLmNvbXBsZXRlQWN0aXZpdHkoZW50cnkpLnRoZW4oc3VjY2VzcywgdGhpcy5vblJlcXVlc3RGYWlsdXJlKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uUHV0Q29tcGxldGU6IGZ1bmN0aW9uIG9uUHV0Q29tcGxldGUoZW50cnkpIHtcclxuICAgIHRoaXMuX2NvbXBsZXRlZEJhc2VkT24gPSBudWxsO1xyXG4gICAgaWYgKGVudHJ5LiRrZXkuc3BsaXQodGhpcy5yZWN1cnJpbmdBY3Rpdml0eUlkU2VwYXJhdG9yKS5sZW5ndGggPT09IDIpIHtcclxuICAgICAgdGhpcy5fY29tcGxldGVkQmFzZWRPbiA9IGVudHJ5O1xyXG4gICAgfVxyXG4gICAgdGhpcy5pbmhlcml0ZWQob25QdXRDb21wbGV0ZSwgYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIG9uVXBkYXRlQ29tcGxldGVkOiBmdW5jdGlvbiBvblVwZGF0ZUNvbXBsZXRlZChlbnRyeSkge1xyXG4gICAgaWYgKCFlbnRyeSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZm9sbG93dXAgPSB0aGlzLmZpZWxkcy5Gb2xsb3d1cC5nZXRWYWx1ZSgpID09PSAnbm9uZScgPyB0aGlzLmdldEluaGVyaXRlZChvblVwZGF0ZUNvbXBsZXRlZCwgYXJndW1lbnRzKSA6IHRoaXMubmF2aWdhdGVUb0ZvbGxvd1VwVmlldztcclxuICAgIGVudHJ5LiRjb21wbGV0ZWRCYXNlZE9uID0gdGhpcy5fY29tcGxldGVkQmFzZWRPbjtcclxuICAgIHRoaXMuY29tcGxldGVBY3Rpdml0eShlbnRyeSwgZm9sbG93dXApO1xyXG4gIH0sXHJcbiAgZm9ybWF0RGVwZW5kZW50UXVlcnk6IGZ1bmN0aW9uIGZvcm1hdERlcGVuZGVudFF1ZXJ5KGRlcGVuZGVudFZhbHVlLCBmb3JtYXQsIHByb3BlcnR5KSB7XHJcbiAgICBjb25zdCB0aGVQcm9wZXJ0eSA9IHByb3BlcnR5IHx8ICcka2V5JztcclxuXHJcbiAgICByZXR1cm4gc3RyaW5nLnN1YnN0aXR1dGUoZm9ybWF0LCBbdXRpbGl0eS5nZXRWYWx1ZShkZXBlbmRlbnRWYWx1ZSwgdGhlUHJvcGVydHkpXSk7XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICB0aXRsZTogdGhpcy5hY3Rpdml0eUluZm9UZXh0LFxyXG4gICAgICBuYW1lOiAnQWN0aXZpdHlJbmZvU2VjdGlvbicsXHJcbiAgICAgIGNvbGxhcHNlZDogZmFsc2UsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIG5hbWU6ICdUeXBlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1R5cGUnLFxyXG4gICAgICAgIHR5cGU6ICdoaWRkZW4nLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgZGVwZW5kc09uOiAnVHlwZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucmVnYXJkaW5nVGV4dCxcclxuICAgICAgICBuYW1lOiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIHBpY2tsaXN0OiB0aGlzLmZvcm1hdFBpY2tsaXN0Rm9yVHlwZS5iaW5kRGVsZWdhdGUodGhpcywgJ0Rlc2NyaXB0aW9uJyksXHJcbiAgICAgICAgdGl0bGU6IHRoaXMucmVnYXJkaW5nVGl0bGVUZXh0LFxyXG4gICAgICAgIG9yZGVyQnk6ICd0ZXh0IGFzYycsXHJcbiAgICAgICAgdHlwZTogJ3BpY2tsaXN0JyxcclxuICAgICAgICBtYXhUZXh0TGVuZ3RoOiA2NCxcclxuICAgICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmxvbmdOb3Rlc1RleHQsXHJcbiAgICAgICAgbm90ZVByb3BlcnR5OiBmYWxzZSxcclxuICAgICAgICBuYW1lOiAnTG9uZ05vdGVzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0xvbmdOb3RlcycsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMubG9uZ05vdGVzVGl0bGVUZXh0LFxyXG4gICAgICAgIHR5cGU6ICdub3RlJyxcclxuICAgICAgICB2aWV3OiAndGV4dF9lZGl0JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnN0YXJ0aW5nVGV4dCxcclxuICAgICAgICBuYW1lOiAnU3RhcnREYXRlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1N0YXJ0RGF0ZScsXHJcbiAgICAgICAgdHlwZTogJ2RhdGUnLFxyXG4gICAgICAgIHNob3dUaW1lUGlja2VyOiB0cnVlLFxyXG4gICAgICAgIGZvcm1hdFN0cmluZzogKEFwcC5pczI0SG91ckNsb2NrKCkpID8gdGhpcy5zdGFydGluZ0Zvcm1hdFRleHQyNCA6IHRoaXMuc3RhcnRpbmdGb3JtYXRUZXh0LFxyXG4gICAgICAgIG1pblZhbHVlOiAobmV3IERhdGUoMTkwMCwgMCwgMSkpLFxyXG4gICAgICAgIHZhbGlkYXRvcjogW1xyXG4gICAgICAgICAgdmFsaWRhdG9yLmV4aXN0cyxcclxuICAgICAgICAgIHZhbGlkYXRvci5pc0RhdGVJblJhbmdlLFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5kdXJhdGlvblRleHQsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMuZHVyYXRpb25UaXRsZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0R1cmF0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0R1cmF0aW9uJyxcclxuICAgICAgICB0eXBlOiAnZHVyYXRpb24nLFxyXG4gICAgICAgIHZpZXc6ICdzZWxlY3RfbGlzdCcsXHJcbiAgICAgICAgZGF0YTogdGhpcy5jcmVhdGVEdXJhdGlvbkRhdGEoKSxcclxuICAgICAgICB2YWxpZGF0b3I6IHtcclxuICAgICAgICAgIGZuOiBmdW5jdGlvbiB0ZXN0RGlzYWJsZWQodmFsLCBmaWVsZCkge1xyXG4gICAgICAgICAgICBpZiAoZmllbGQuaXNEaXNhYmxlZCgpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghL15cXGQrJC8udGVzdCh2YWwpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBtZXNzYWdlOiB0aGlzLmR1cmF0aW9uSW52YWxpZFRleHQsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnRpbWVsZXNzVGV4dCxcclxuICAgICAgICBuYW1lOiAnVGltZWxlc3MnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnVGltZWxlc3MnLFxyXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcclxuICAgICAgfV0sXHJcbiAgICB9LCB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmNvbXBsZXRpb25UZXh0LFxyXG4gICAgICBuYW1lOiAnQ29tcGxldGlvblNlY3Rpb24nLFxyXG4gICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBsYWJlbDogdGhpcy5hc1NjaGVkdWxlZFRleHQsXHJcbiAgICAgICAgaW5jbHVkZTogZmFsc2UsXHJcbiAgICAgICAgbmFtZTogJ0FzU2NoZWR1bGVkJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0FzU2NoZWR1bGVkJyxcclxuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5jb21wbGV0ZWRUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdDb21wbGV0ZWREYXRlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0NvbXBsZXRlZERhdGUnLFxyXG4gICAgICAgIHR5cGU6ICdkYXRlJyxcclxuICAgICAgICBzaG93VGltZVBpY2tlcjogdHJ1ZSxcclxuICAgICAgICBmb3JtYXRTdHJpbmc6IHRoaXMuY29tcGxldGVkRm9ybWF0VGV4dCxcclxuICAgICAgICBtaW5WYWx1ZTogKG5ldyBEYXRlKDE5MDAsIDAsIDEpKSxcclxuICAgICAgICB2YWxpZGF0b3I6IFtcclxuICAgICAgICAgIHZhbGlkYXRvci5leGlzdHMsXHJcbiAgICAgICAgICB2YWxpZGF0b3IuaXNEYXRlSW5SYW5nZSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgZGVwZW5kc09uOiAnVHlwZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucmVzdWx0VGV4dCxcclxuICAgICAgICBuYW1lOiAnUmVzdWx0JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1Jlc3VsdCcsXHJcbiAgICAgICAgc3RvcmFnZU1vZGU6ICdjb2RlJywgLy8gVGhlIG9uUmVzdWx0Q2hhbmdlIGNoYW5nZXMgdGhlIHZhbHVlIGJhY2sgdG8gdGV4dFxyXG4gICAgICAgIHBpY2tsaXN0OiB0aGlzLmZvcm1hdFBpY2tsaXN0Rm9yVHlwZS5iaW5kRGVsZWdhdGUodGhpcywgJ1Jlc3VsdCcpLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLnJlc3VsdFRpdGxlVGV4dCxcclxuICAgICAgICBvcmRlckJ5OiAndGV4dCBhc2MnLFxyXG4gICAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICAgICAgbWF4VGV4dExlbmd0aDogNjQsXHJcbiAgICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnUmVzdWx0Q29kZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdSZXN1bHRDb2RlJyxcclxuICAgICAgICB0eXBlOiAnaGlkZGVuJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmZvbGxvd1VwVGV4dCxcclxuICAgICAgICB0aXRsZTogdGhpcy5mb2xsb3dVcFRpdGxlVGV4dCxcclxuICAgICAgICBuYW1lOiAnRm9sbG93dXAnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRm9sbG93dXAnLFxyXG4gICAgICAgIHR5cGU6ICdzZWxlY3QnLFxyXG4gICAgICAgIHZpZXc6ICdzZWxlY3RfbGlzdCcsXHJcbiAgICAgICAgdGV4dFJlbmRlcmVyOiB0aGlzLmZvcm1hdEZvbGxvd3VwVGV4dC5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICAgICAgcmVxdWlyZVNlbGVjdGlvbjogdHJ1ZSxcclxuICAgICAgICB2YWx1ZUtleVByb3BlcnR5OiBmYWxzZSxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogZmFsc2UsXHJcbiAgICAgICAgZGF0YTogdGhpcy5jcmVhdGVGb2xsb3d1cERhdGEoKSxcclxuICAgICAgICBpbmNsdWRlOiBmYWxzZSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmNhcnJ5T3Zlck5vdGVzVGV4dCxcclxuICAgICAgICBpbmNsdWRlOiBmYWxzZSxcclxuICAgICAgICBuYW1lOiAnQ2FycnlPdmVyTm90ZXMnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ2FycnlPdmVyTm90ZXMnLFxyXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcclxuICAgICAgfV0sXHJcbiAgICB9LCB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLm90aGVySW5mb1RleHQsXHJcbiAgICAgIG5hbWU6ICdPdGhlckluZm9TZWN0aW9uJyxcclxuICAgICAgY29sbGFwc2VkOiBmYWxzZSxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMucHJpb3JpdHlUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdQcmlvcml0eScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdQcmlvcml0eScsXHJcbiAgICAgICAgcGlja2xpc3Q6ICdQcmlvcml0aWVzJyxcclxuICAgICAgICB0aXRsZTogdGhpcy5wcmlvcml0eVRpdGxlVGV4dCxcclxuICAgICAgICB0eXBlOiAncGlja2xpc3QnLFxyXG4gICAgICAgIG1heFRleHRMZW5ndGg6IDY0LFxyXG4gICAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4Y2VlZHNNYXhUZXh0TGVuZ3RoLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgZGVwZW5kc09uOiAnVHlwZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuY2F0ZWdvcnlUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdDYXRlZ29yeScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDYXRlZ29yeScsXHJcbiAgICAgICAgcGlja2xpc3Q6IHRoaXMuZm9ybWF0UGlja2xpc3RGb3JUeXBlLmJpbmREZWxlZ2F0ZSh0aGlzLCAnQ2F0ZWdvcnknKSxcclxuICAgICAgICBvcmRlckJ5OiAndGV4dCBhc2MnLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLmNhdGVnb3J5VGl0bGVUZXh0LFxyXG4gICAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICAgICAgbWF4VGV4dExlbmd0aDogNjQsXHJcbiAgICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICB0eXBlOiAnaGlkZGVuJyxcclxuICAgICAgICBuYW1lOiAnVXNlcklkJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1VzZXJJZCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5sZWFkZXJUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdMZWFkZXInLFxyXG4gICAgICAgIHByb3BlcnR5OiAnTGVhZGVyJyxcclxuICAgICAgICBpbmNsdWRlOiBmYWxzZSxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICB0ZXh0UHJvcGVydHk6ICdVc2VySW5mbycsXHJcbiAgICAgICAgdGV4dFRlbXBsYXRlOiB0ZW1wbGF0ZS5uYW1lTEYsXHJcbiAgICAgICAgcmVxdWlyZVNlbGVjdGlvbjogdHJ1ZSxcclxuICAgICAgICB2aWV3OiAndXNlcl9saXN0JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFjY291bnRUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdBY2NvdW50JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0FjY291bnQnLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgICAgYXBwbHlUbzogJy4nLFxyXG4gICAgICAgIHZhbHVlS2V5UHJvcGVydHk6ICdBY2NvdW50SWQnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIHZpZXc6ICdhY2NvdW50X3JlbGF0ZWQnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgZGVwZW5kc09uOiAnQWNjb3VudCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuY29udGFjdFRleHQsXHJcbiAgICAgICAgbmFtZTogJ0NvbnRhY3QnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ29udGFjdCcsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICBhcHBseVRvOiAnLicsXHJcbiAgICAgICAgdmFsdWVLZXlQcm9wZXJ0eTogJ0NvbnRhY3RJZCcsXHJcbiAgICAgICAgdmFsdWVUZXh0UHJvcGVydHk6ICdDb250YWN0TmFtZScsXHJcbiAgICAgICAgdmlldzogJ2NvbnRhY3RfcmVsYXRlZCcsXHJcbiAgICAgICAgd2hlcmU6IHRoaXMuZm9ybWF0RGVwZW5kZW50UXVlcnkuYmluZERlbGVnYXRlKHRoaXMsICdBY2NvdW50LklkIGVxIFwiJHswfVwiJywgJ0FjY291bnRJZCcpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgZGVwZW5kc09uOiAnQWNjb3VudCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMub3Bwb3J0dW5pdHlUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdPcHBvcnR1bml0eScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdPcHBvcnR1bml0eScsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICBhcHBseVRvOiAnLicsXHJcbiAgICAgICAgdmFsdWVLZXlQcm9wZXJ0eTogJ09wcG9ydHVuaXR5SWQnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnT3Bwb3J0dW5pdHlOYW1lJyxcclxuICAgICAgICB2aWV3OiAnb3Bwb3J0dW5pdHlfcmVsYXRlZCcsXHJcbiAgICAgICAgd2hlcmU6IHRoaXMuZm9ybWF0RGVwZW5kZW50UXVlcnkuYmluZERlbGVnYXRlKHRoaXMsICdBY2NvdW50LklkIGVxIFwiJHswfVwiJywgJ0FjY291bnRJZCcpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgZGVwZW5kc09uOiAnQWNjb3VudCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMudGlja2V0TnVtYmVyVGV4dCxcclxuICAgICAgICBuYW1lOiAnVGlja2V0JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1RpY2tldCcsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICBhcHBseVRvOiAnLicsXHJcbiAgICAgICAgdmFsdWVLZXlQcm9wZXJ0eTogJ1RpY2tldElkJyxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ1RpY2tldE51bWJlcicsXHJcbiAgICAgICAgdmlldzogJ3RpY2tldF9yZWxhdGVkJyxcclxuICAgICAgICB3aGVyZTogdGhpcy5mb3JtYXREZXBlbmRlbnRRdWVyeS5iaW5kRGVsZWdhdGUodGhpcywgJ0FjY291bnQuSWQgZXEgXCIkezB9XCInLCAnQWNjb3VudElkJyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5sZWFkVGV4dCxcclxuICAgICAgICBuYW1lOiAnTGVhZCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdMZWFkJyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIGFwcGx5VG86ICcuJyxcclxuICAgICAgICB2YWx1ZUtleVByb3BlcnR5OiAnTGVhZElkJyxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ0xlYWROYW1lJyxcclxuICAgICAgICB2aWV3OiAnbGVhZF9yZWxhdGVkJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmNvbXBhbnlUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdBY2NvdW50TmFtZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdBY2NvdW50TmFtZScsXHJcbiAgICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICB9XSxcclxuICAgIH1dKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==