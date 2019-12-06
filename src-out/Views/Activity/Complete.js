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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BY3Rpdml0eS9Db21wbGV0ZS5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsImR0Rm9ybWF0UmVzb3VyY2UiLCJfX2NsYXNzIiwiYWN0aXZpdHlJbmZvVGV4dCIsImFjY291bnRUZXh0IiwiY29udGFjdFRleHQiLCJvcHBvcnR1bml0eVRleHQiLCJ0aWNrZXROdW1iZXJUZXh0IiwiY29tcGFueVRleHQiLCJsZWFkVGV4dCIsImFzU2NoZWR1bGVkVGV4dCIsImNhdGVnb3J5VGV4dCIsImNhdGVnb3J5VGl0bGVUZXh0IiwiY29tcGxldGVkVGV4dCIsImNvbXBsZXRlZEZvcm1hdFRleHQiLCJjb21wbGV0ZWRGb3JtYXRUZXh0MjQiLCJjb21wbGV0aW9uVGV4dCIsImR1cmF0aW9uVGV4dCIsImR1cmF0aW9uVGl0bGVUZXh0IiwiZHVyYXRpb25JbnZhbGlkVGV4dCIsImNhcnJ5T3Zlck5vdGVzVGV4dCIsImZvbGxvd1VwVGV4dCIsImZvbGxvd1VwVGl0bGVUZXh0IiwibGVhZGVyVGV4dCIsImxvbmdOb3Rlc1RleHQiLCJsb25nTm90ZXNUaXRsZVRleHQiLCJvdGhlckluZm9UZXh0IiwicHJpb3JpdHlUZXh0IiwicHJpb3JpdHlUaXRsZVRleHQiLCJyZWdhcmRpbmdUZXh0IiwicmVnYXJkaW5nVGl0bGVUZXh0IiwicmVzdWx0VGV4dCIsInJlc3VsdFRpdGxlVGV4dCIsInN0YXJ0aW5nVGV4dCIsInN0YXJ0aW5nRm9ybWF0VGV4dCIsInN0YXJ0aW5nRm9ybWF0VGV4dDI0Iiwic3RhcnRpbmdUaW1lbGVzc0Zvcm1hdFRleHQiLCJ0aW1lbGVzc1RleHQiLCJyZWN1cnJpbmdBY3Rpdml0eUlkU2VwYXJhdG9yIiwiZHVyYXRpb25WYWx1ZVRleHQiLCJub25lVGV4dCIsInF1YXJ0ZXJIb3VyVGV4dCIsImhhbGZIb3VyVGV4dCIsImhvdXJUZXh0IiwiaG91ckFuZEhhbGZUZXh0IiwidHdvSG91cnNUZXh0IiwiZm9sbG93dXBWYWx1ZVRleHQiLCJub25lIiwibm9uZVByb3BUZXh0IiwiYXRQaG9uZUNhbGwiLCJwaG9uZUNhbGxUZXh0IiwiYXRBcHBvaW50bWVudCIsIm1lZXRpbmdUZXh0IiwiYXRUb0RvIiwidG9Eb1RleHQiLCJhdFBlcnNvbmFsIiwicGVyc29uYWxUZXh0IiwiaWQiLCJmb2xsb3d1cFZpZXciLCJmaWVsZHNGb3JMZWFkcyIsImZpZWxkc0ZvclN0YW5kYXJkIiwicGlja2xpc3RzQnlUeXBlIiwiQ2F0ZWdvcnkiLCJEZXNjcmlwdGlvbiIsIlJlc3VsdCIsImF0TGl0ZXJhdHVyZSIsImF0RU1haWwiLCJlbnRpdHlOYW1lIiwicXVlcnlTZWxlY3QiLCJyZXNvdXJjZUtpbmQiLCJjb250cmFjdE5hbWUiLCJpbml0IiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiY29ubmVjdCIsImZpZWxkcyIsIkxlYWRlciIsIm9uTGVhZGVyQ2hhbmdlIiwiVGltZWxlc3MiLCJvblRpbWVsZXNzQ2hhbmdlIiwiQXNTY2hlZHVsZWQiLCJvbkFzU2NoZWR1bGVkQ2hhbmdlIiwiRm9sbG93dXAiLCJvbkZvbGxvd3VwQ2hhbmdlIiwiTGVhZCIsIm9uTGVhZENoYW5nZSIsIm9uUmVzdWx0Q2hhbmdlIiwidmFsdWUiLCJmaWVsZCIsInNldFZhbHVlIiwidGV4dCIsIlJlc3VsdENvZGUiLCJleGVjIiwia2V5IiwiaXNBY3Rpdml0eUZvckxlYWQiLCJlbnRyeSIsInRlc3QiLCJMZWFkSWQiLCJiZWZvcmVUcmFuc2l0aW9uVG8iLCJjb25jYXQiLCJmb3JFYWNoIiwiaGlkZUZpZWxkcyIsIml0ZW0iLCJoaWRlIiwib3B0aW9ucyIsInNob3ciLCJ0b2dnbGVTZWxlY3RGaWVsZCIsImRpc2FibGUiLCJlbmFibGUiLCJEdXJhdGlvbiIsInN0YXJ0RGF0ZUZpZWxkIiwiU3RhcnREYXRlIiwic3RhcnREYXRlIiwiZ2V0VmFsdWUiLCJkYXRlRm9ybWF0VGV4dCIsInNob3dUaW1lUGlja2VyIiwidGltZWxlc3MiLCJpc0RhdGVUaW1lbGVzcyIsImNsb25lIiwiY2xlYXJUaW1lIiwiYWRkIiwibWludXRlcyIsImdldFRpbWV6b25lT2Zmc2V0Iiwic2Vjb25kcyIsIkFwcCIsImlzMjRIb3VyQ2xvY2siLCJkYXRlIiwiZ2V0VVRDSG91cnMiLCJnZXRVVENNaW51dGVzIiwiZ2V0VVRDU2Vjb25kcyIsInNjaGVkdWxlZCIsImR1cmF0aW9uIiwibW9tZW50IiwiY29tcGxldGVkRGF0ZSIsInRvRGF0ZSIsIkNvbXBsZXRlZERhdGUiLCJEYXRlIiwiQ2FycnlPdmVyTm90ZXMiLCJzZWxlY3Rpb24iLCJnZXRTZWxlY3Rpb24iLCJpbnNlcnQiLCJDb21wYW55IiwiZm9ybWF0UGlja2xpc3RGb3JUeXBlIiwidHlwZSIsIndoaWNoIiwic2V0VmFsdWVzIiwidXNlcklkIiwiVXNlcklkIiwiJGtleSIsImZvcm1hdEZvbGxvd3VwVGV4dCIsInZhbCIsImNyZWF0ZUR1cmF0aW9uRGF0YSIsImxpc3QiLCJoYXNPd25Qcm9wZXJ0eSIsInB1c2giLCIkZGVzY3JpcHRvciIsIiRyZXNvdXJjZXMiLCJjcmVhdGVGb2xsb3d1cERhdGEiLCJmb2xsb3d1cCIsIm5hdmlnYXRlVG9Gb2xsb3dVcFZpZXciLCJ2aWV3IiwiZ2V0VmlldyIsImZvbGxvd3VwRW50cnkiLCJUeXBlIiwiQWNjb3VudElkIiwiQWNjb3VudE5hbWUiLCJDb250YWN0SWQiLCJDb250YWN0TmFtZSIsIkxlYWROYW1lIiwiTG9uZ05vdGVzIiwiT3Bwb3J0dW5pdHlJZCIsIk9wcG9ydHVuaXR5TmFtZSIsIlRpY2tldElkIiwiVGlja2V0TnVtYmVyIiwidGl0bGUiLCJyZXR1cm5UbyIsImNvbXBsZXRlQWN0aXZpdHkiLCJjYWxsYmFjayIsImFjdGl2aXR5TW9kZWwiLCJNb2RlbE1hbmFnZXIiLCJnZXRNb2RlbCIsIkFDVElWSVRZIiwiU0RBVEEiLCJzdWNjZXNzIiwicmVmcmVzaFN0YWxlIiwic2NvcGUiLCJ0aGVDYWxsYmFjayIsInRoZUVudHJ5IiwicmVmcmVzaFN0YWxlVmlld3MiLCJyZWZyZXNoU3RhbGVEZXRhaWxWaWV3cyIsInB1Ymxpc2giLCJhcHBseSIsInRoZW4iLCJvblJlcXVlc3RGYWlsdXJlIiwib25JbnNlcnRDb21wbGV0ZWQiLCJvblVwZGF0ZUNvbXBsZXRlZCIsIm9uUHV0Q29tcGxldGUiLCJfY29tcGxldGVkQmFzZWRPbiIsInNwbGl0IiwibGVuZ3RoIiwiZ2V0SW5oZXJpdGVkIiwiJGNvbXBsZXRlZEJhc2VkT24iLCJmb3JtYXREZXBlbmRlbnRRdWVyeSIsImRlcGVuZGVudFZhbHVlIiwiZm9ybWF0IiwicHJvcGVydHkiLCJ0aGVQcm9wZXJ0eSIsInN1YnN0aXR1dGUiLCJjcmVhdGVMYXlvdXQiLCJsYXlvdXQiLCJuYW1lIiwiY29sbGFwc2VkIiwiY2hpbGRyZW4iLCJkZXBlbmRzT24iLCJsYWJlbCIsInBpY2tsaXN0IiwiYmluZERlbGVnYXRlIiwib3JkZXJCeSIsIm1heFRleHRMZW5ndGgiLCJ2YWxpZGF0b3IiLCJleGNlZWRzTWF4VGV4dExlbmd0aCIsIm5vdGVQcm9wZXJ0eSIsImZvcm1hdFN0cmluZyIsIm1pblZhbHVlIiwiZXhpc3RzIiwiaXNEYXRlSW5SYW5nZSIsImRhdGEiLCJmbiIsInRlc3REaXNhYmxlZCIsImlzRGlzYWJsZWQiLCJtZXNzYWdlIiwiaW5jbHVkZSIsInN0b3JhZ2VNb2RlIiwidGV4dFJlbmRlcmVyIiwicmVxdWlyZVNlbGVjdGlvbiIsInZhbHVlS2V5UHJvcGVydHkiLCJ2YWx1ZVRleHRQcm9wZXJ0eSIsInRleHRQcm9wZXJ0eSIsInRleHRUZW1wbGF0ZSIsIm5hbWVMRiIsImVtcHR5VGV4dCIsImFwcGx5VG8iLCJ3aGVyZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNEJBLE1BQU1BLFdBQVcsb0JBQVksa0JBQVosQ0FBakIsQyxDQTVCQTs7Ozs7Ozs7Ozs7Ozs7O0FBNkJBLE1BQU1DLG1CQUFtQixvQkFBWSxnQ0FBWixDQUF6Qjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQSxNQUFNQyxVQUFVLHVCQUFRLDZCQUFSLEVBQXVDLGdCQUF2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MDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGNvbm5lY3QgZnJvbSAnZG9qby9fYmFzZS9jb25uZWN0JztcclxuaW1wb3J0IHN0cmluZyBmcm9tICdkb2pvL3N0cmluZyc7XHJcbmltcG9ydCBlbnZpcm9ubWVudCBmcm9tICcuLi8uLi9FbnZpcm9ubWVudCc7XHJcbmltcG9ydCB2YWxpZGF0b3IgZnJvbSAnLi4vLi4vVmFsaWRhdG9yJztcclxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4uLy4uL1RlbXBsYXRlJztcclxuaW1wb3J0IHV0aWxpdHkgZnJvbSAnYXJnb3MvVXRpbGl0eSc7XHJcbmltcG9ydCBFZGl0IGZyb20gJ2FyZ29zL0VkaXQnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuaW1wb3J0IE1PREVMX1RZUEVTIGZyb20gJ2FyZ29zL01vZGVscy9UeXBlcyc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdhY3Rpdml0eUNvbXBsZXRlJyk7XHJcbmNvbnN0IGR0Rm9ybWF0UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYWN0aXZpdHlDb21wbGV0ZURhdGVUaW1lRm9ybWF0Jyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5BY3Rpdml0eS5Db21wbGV0ZVxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5FZGl0XHJcbiAqIEBtaXhpbnMgYXJnb3MuRWRpdFxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuRWRpdFxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuVXRpbGl0eVxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgY3JtLkVudmlyb25tZW50XHJcbiAqIEByZXF1aXJlcyBjcm0uVmFsaWRhdG9yXHJcbiAqIEByZXF1aXJlcyBjcm0uVGVtcGxhdGVcclxuICpcclxuICogQHJlcXVpcmVzIG1vbWVudFxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5BY3Rpdml0eS5Db21wbGV0ZScsIFtFZGl0XSwge1xyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIGFjdGl2aXR5SW5mb1RleHQ6IHJlc291cmNlLmFjdGl2aXR5SW5mb1RleHQsXHJcbiAgYWNjb3VudFRleHQ6IHJlc291cmNlLmFjY291bnRUZXh0LFxyXG4gIGNvbnRhY3RUZXh0OiByZXNvdXJjZS5jb250YWN0VGV4dCxcclxuICBvcHBvcnR1bml0eVRleHQ6IHJlc291cmNlLm9wcG9ydHVuaXR5VGV4dCxcclxuICB0aWNrZXROdW1iZXJUZXh0OiByZXNvdXJjZS50aWNrZXROdW1iZXJUZXh0LFxyXG4gIGNvbXBhbnlUZXh0OiByZXNvdXJjZS5jb21wYW55VGV4dCxcclxuICBsZWFkVGV4dDogcmVzb3VyY2UubGVhZFRleHQsXHJcbiAgYXNTY2hlZHVsZWRUZXh0OiByZXNvdXJjZS5hc1NjaGVkdWxlZFRleHQsXHJcbiAgY2F0ZWdvcnlUZXh0OiByZXNvdXJjZS5jYXRlZ29yeVRleHQsXHJcbiAgY2F0ZWdvcnlUaXRsZVRleHQ6IHJlc291cmNlLmNhdGVnb3J5VGl0bGVUZXh0LFxyXG4gIGNvbXBsZXRlZFRleHQ6IHJlc291cmNlLmNvbXBsZXRlZFRleHQsXHJcbiAgY29tcGxldGVkRm9ybWF0VGV4dDogZHRGb3JtYXRSZXNvdXJjZS5jb21wbGV0ZWRGb3JtYXRUZXh0LFxyXG4gIGNvbXBsZXRlZEZvcm1hdFRleHQyNDogZHRGb3JtYXRSZXNvdXJjZS5jb21wbGV0ZWRGb3JtYXRUZXh0MjQsXHJcbiAgY29tcGxldGlvblRleHQ6IHJlc291cmNlLmNvbXBsZXRpb25UZXh0LFxyXG4gIGR1cmF0aW9uVGV4dDogcmVzb3VyY2UuZHVyYXRpb25UZXh0LFxyXG4gIGR1cmF0aW9uVGl0bGVUZXh0OiByZXNvdXJjZS5kdXJhdGlvblRpdGxlVGV4dCxcclxuICBkdXJhdGlvbkludmFsaWRUZXh0OiByZXNvdXJjZS5kdXJhdGlvbkludmFsaWRUZXh0LFxyXG4gIGNhcnJ5T3Zlck5vdGVzVGV4dDogcmVzb3VyY2UuY2FycnlPdmVyTm90ZXNUZXh0LFxyXG4gIGZvbGxvd1VwVGV4dDogcmVzb3VyY2UuZm9sbG93VXBUZXh0LFxyXG4gIGZvbGxvd1VwVGl0bGVUZXh0OiByZXNvdXJjZS5mb2xsb3dVcFRpdGxlVGV4dCxcclxuICBsZWFkZXJUZXh0OiByZXNvdXJjZS5sZWFkZXJUZXh0LFxyXG4gIGxvbmdOb3Rlc1RleHQ6IHJlc291cmNlLmxvbmdOb3Rlc1RleHQsXHJcbiAgbG9uZ05vdGVzVGl0bGVUZXh0OiByZXNvdXJjZS5sb25nTm90ZXNUaXRsZVRleHQsXHJcbiAgb3RoZXJJbmZvVGV4dDogcmVzb3VyY2Uub3RoZXJJbmZvVGV4dCxcclxuICBwcmlvcml0eVRleHQ6IHJlc291cmNlLnByaW9yaXR5VGV4dCxcclxuICBwcmlvcml0eVRpdGxlVGV4dDogcmVzb3VyY2UucHJpb3JpdHlUaXRsZVRleHQsXHJcbiAgcmVnYXJkaW5nVGV4dDogcmVzb3VyY2UucmVnYXJkaW5nVGV4dCxcclxuICByZWdhcmRpbmdUaXRsZVRleHQ6IHJlc291cmNlLnJlZ2FyZGluZ1RpdGxlVGV4dCxcclxuICByZXN1bHRUZXh0OiByZXNvdXJjZS5yZXN1bHRUZXh0LFxyXG4gIHJlc3VsdFRpdGxlVGV4dDogcmVzb3VyY2UucmVzdWx0VGl0bGVUZXh0LFxyXG4gIHN0YXJ0aW5nVGV4dDogcmVzb3VyY2Uuc3RhcnRpbmdUZXh0LFxyXG4gIHN0YXJ0aW5nRm9ybWF0VGV4dDogZHRGb3JtYXRSZXNvdXJjZS5zdGFydGluZ0Zvcm1hdFRleHQsXHJcbiAgc3RhcnRpbmdGb3JtYXRUZXh0MjQ6IGR0Rm9ybWF0UmVzb3VyY2Uuc3RhcnRpbmdGb3JtYXRUZXh0MjQsXHJcbiAgc3RhcnRpbmdUaW1lbGVzc0Zvcm1hdFRleHQ6IGR0Rm9ybWF0UmVzb3VyY2Uuc3RhcnRpbmdUaW1lbGVzc0Zvcm1hdFRleHQsXHJcbiAgdGltZWxlc3NUZXh0OiByZXNvdXJjZS50aW1lbGVzc1RleHQsXHJcbiAgcmVjdXJyaW5nQWN0aXZpdHlJZFNlcGFyYXRvcjogJzsnLFxyXG4gIGR1cmF0aW9uVmFsdWVUZXh0OiB7XHJcbiAgICAwOiByZXNvdXJjZS5ub25lVGV4dCxcclxuICAgIDE1OiByZXNvdXJjZS5xdWFydGVySG91clRleHQsXHJcbiAgICAzMDogcmVzb3VyY2UuaGFsZkhvdXJUZXh0LFxyXG4gICAgNjA6IHJlc291cmNlLmhvdXJUZXh0LFxyXG4gICAgOTA6IHJlc291cmNlLmhvdXJBbmRIYWxmVGV4dCxcclxuICAgIDEyMDogcmVzb3VyY2UudHdvSG91cnNUZXh0LFxyXG4gIH0sXHJcbiAgZm9sbG93dXBWYWx1ZVRleHQ6IHtcclxuICAgIG5vbmU6IHJlc291cmNlLm5vbmVQcm9wVGV4dCxcclxuICAgIGF0UGhvbmVDYWxsOiByZXNvdXJjZS5waG9uZUNhbGxUZXh0LFxyXG4gICAgYXRBcHBvaW50bWVudDogcmVzb3VyY2UubWVldGluZ1RleHQsXHJcbiAgICBhdFRvRG86IHJlc291cmNlLnRvRG9UZXh0LFxyXG4gICAgYXRQZXJzb25hbDogcmVzb3VyY2UucGVyc29uYWxUZXh0LFxyXG4gIH0sXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnYWN0aXZpdHlfY29tcGxldGUnLFxyXG4gIGZvbGxvd3VwVmlldzogJ2FjdGl2aXR5X2VkaXQnLFxyXG4gIGZpZWxkc0ZvckxlYWRzOiBbJ0FjY291bnROYW1lJywgJ0xlYWQnXSxcclxuICBmaWVsZHNGb3JTdGFuZGFyZDogWydBY2NvdW50JywgJ0NvbnRhY3QnLCAnT3Bwb3J0dW5pdHknLCAnVGlja2V0J10sXHJcbiAgcGlja2xpc3RzQnlUeXBlOiB7XHJcbiAgICBhdEFwcG9pbnRtZW50OiB7XHJcbiAgICAgIENhdGVnb3J5OiAnTWVldGluZyBDYXRlZ29yeSBDb2RlcycsXHJcbiAgICAgIERlc2NyaXB0aW9uOiAnTWVldGluZyBSZWdhcmRpbmcnLFxyXG4gICAgICBSZXN1bHQ6ICdNZWV0aW5nIFJlc3VsdCBDb2RlcycsXHJcbiAgICB9LFxyXG4gICAgYXRMaXRlcmF0dXJlOiB7XHJcbiAgICAgIERlc2NyaXB0aW9uOiAnTGl0IFJlcXVlc3QgUmVnYXJkaW5nJyxcclxuICAgIH0sXHJcbiAgICBhdFBlcnNvbmFsOiB7XHJcbiAgICAgIENhdGVnb3J5OiAnTWVldGluZyBDYXRlZ29yeSBDb2RlcycsXHJcbiAgICAgIERlc2NyaXB0aW9uOiAnUGVyc29uYWwgQWN0aXZpdHkgUmVnYXJkaW5nJyxcclxuICAgICAgUmVzdWx0OiAnUGVyc29uYWwgQWN0aXZpdHkgUmVzdWx0IENvZGVzJyxcclxuICAgIH0sXHJcbiAgICBhdFBob25lQ2FsbDoge1xyXG4gICAgICBDYXRlZ29yeTogJ1Bob25lIENhbGwgQ2F0ZWdvcnkgQ29kZXMnLFxyXG4gICAgICBEZXNjcmlwdGlvbjogJ1Bob25lIENhbGwgUmVnYXJkaW5nJyxcclxuICAgICAgUmVzdWx0OiAnUGhvbmUgQ2FsbCBSZXN1bHQgQ29kZXMnLFxyXG4gICAgfSxcclxuICAgIGF0VG9Ebzoge1xyXG4gICAgICBDYXRlZ29yeTogJ1RvIERvIENhdGVnb3J5IENvZGVzJyxcclxuICAgICAgRGVzY3JpcHRpb246ICdUbyBEbyBSZWdhcmRpbmcnLFxyXG4gICAgICBSZXN1bHQ6ICdUbyBEbyBSZXN1bHQgQ29kZXMnLFxyXG4gICAgfSxcclxuICAgIGF0RU1haWw6IHtcclxuICAgICAgQ2F0ZWdvcnk6ICdFLW1haWwgQ2F0ZWdvcnkgQ29kZXMnLFxyXG4gICAgICBEZXNjcmlwdGlvbjogJ0UtbWFpbCBSZWdhcmRpbmcnLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBlbnRpdHlOYW1lOiAnQWN0aXZpdHknLFxyXG4gIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAnQWNjb3VudElkJyxcclxuICAgICdBY2NvdW50TmFtZScsXHJcbiAgICAnQWxhcm0nLFxyXG4gICAgJ0FsYXJtVGltZScsXHJcbiAgICAnQ2F0ZWdvcnknLFxyXG4gICAgJ0NvbnRhY3RJZCcsXHJcbiAgICAnQ29udGFjdE5hbWUnLFxyXG4gICAgJ0NvbXBsZXRlZERhdGUnLFxyXG4gICAgJ0Rlc2NyaXB0aW9uJyxcclxuICAgICdEdXJhdGlvbicsXHJcbiAgICAnTGVhZGVyLyRrZXknLFxyXG4gICAgJ0xlYWRJZCcsXHJcbiAgICAnTGVhZE5hbWUnLFxyXG4gICAgJ0xvbmdOb3RlcycsXHJcbiAgICAnT3Bwb3J0dW5pdHlJZCcsXHJcbiAgICAnT3Bwb3J0dW5pdHlOYW1lJyxcclxuICAgICdQcmlvcml0eScsXHJcbiAgICAnUmVnYXJkaW5nJyxcclxuICAgICdSZXN1bHQnLFxyXG4gICAgJ1JvbGxvdmVyJyxcclxuICAgICdTdGFydERhdGUnLFxyXG4gICAgJ1RpY2tldElkJyxcclxuICAgICdUaWNrZXROdW1iZXInLFxyXG4gICAgJ1RpbWVsZXNzJyxcclxuICAgICdUeXBlJyxcclxuICAgICdSZWN1cnJpbmcnLFxyXG4gICAgJ1JlY3VycmVuY2VTdGF0ZScsXHJcbiAgICAnQWxsb3dBZGQnLFxyXG4gICAgJ0FsbG93RWRpdCcsXHJcbiAgICAnQWxsb3dEZWxldGUnLFxyXG4gICAgJ0FsbG93Q29tcGxldGUnLFxyXG4gIF0sXHJcbiAgcmVzb3VyY2VLaW5kOiAnYWN0aXZpdGllcycsXHJcbiAgY29udHJhY3ROYW1lOiAnc3lzdGVtJyxcclxuXHJcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGluaXQsIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLkxlYWRlciwgJ29uQ2hhbmdlJywgdGhpcy5vbkxlYWRlckNoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuVGltZWxlc3MsICdvbkNoYW5nZScsIHRoaXMub25UaW1lbGVzc0NoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuQXNTY2hlZHVsZWQsICdvbkNoYW5nZScsIHRoaXMub25Bc1NjaGVkdWxlZENoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuRm9sbG93dXAsICdvbkNoYW5nZScsIHRoaXMub25Gb2xsb3d1cENoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuTGVhZCwgJ29uQ2hhbmdlJywgdGhpcy5vbkxlYWRDaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLlJlc3VsdCwgJ29uQ2hhbmdlJywgdGhpcy5vblJlc3VsdENoYW5nZSk7XHJcbiAgfSxcclxuICBvblJlc3VsdENoYW5nZTogZnVuY3Rpb24gb25SZXN1bHRDaGFuZ2UodmFsdWUsIGZpZWxkKSB7XHJcbiAgICAvLyBTZXQgdGhlIFJlc3VsdCBmaWVsZCBiYWNrIHRvIHRoZSB0ZXh0IHZhbHVlLCBhbmQgdGFrZSB0aGUgcGlja2xpc3QgY29kZSBhbmQgc2V0IHRoYXQgdG8gdGhlIFJlc3VsdHNDb2RlXHJcbiAgICBmaWVsZC5zZXRWYWx1ZSh2YWx1ZS50ZXh0KTtcclxuXHJcbiAgICAvLyBNYXggbGVuZ3RoIGZvciBSRVNVTFRDT0RFIGlzIDggY2hhcnMsIHRoZSBzZGF0YSBlbmRwb2ludCBkb2Vzbid0IGhhbmRsZSB0aGlzLCBzbyB3ZSB3aWxsIHRydW5jYXRlIGxpa2UgdGhlIExBTiBpZiBuZWNlc3NhcnlcclxuICAgIHRoaXMuZmllbGRzLlJlc3VsdENvZGUuc2V0VmFsdWUoKC8uezAsOH0vaWcpXHJcbiAgICAgIC5leGVjKHZhbHVlLmtleSkpO1xyXG4gIH0sXHJcbiAgaXNBY3Rpdml0eUZvckxlYWQ6IGZ1bmN0aW9uIGlzQWN0aXZpdHlGb3JMZWFkKGVudHJ5KSB7XHJcbiAgICByZXR1cm4gZW50cnkgJiYgL15bXFx3XXsxMn0kLy50ZXN0KGVudHJ5LkxlYWRJZCk7XHJcbiAgfSxcclxuICBiZWZvcmVUcmFuc2l0aW9uVG86IGZ1bmN0aW9uIGJlZm9yZVRyYW5zaXRpb25UbygpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGJlZm9yZVRyYW5zaXRpb25UbywgYXJndW1lbnRzKTtcclxuXHJcbiAgICB0aGlzLmZpZWxkc0ZvclN0YW5kYXJkLmNvbmNhdCh0aGlzLmZpZWxkc0ZvckxlYWRzKS5mb3JFYWNoKGZ1bmN0aW9uIGhpZGVGaWVsZHMoaXRlbSkge1xyXG4gICAgICBpZiAodGhpcy5maWVsZHNbaXRlbV0pIHtcclxuICAgICAgICB0aGlzLmZpZWxkc1tpdGVtXS5oaWRlKCk7XHJcbiAgICAgIH1cclxuICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5lbnRyeTtcclxuICAgIGlmICh0aGlzLmlzQWN0aXZpdHlGb3JMZWFkKGVudHJ5KSkge1xyXG4gICAgICB0aGlzLmZpZWxkc0ZvckxlYWRzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICBpZiAodGhpcy5maWVsZHNbaXRlbV0pIHtcclxuICAgICAgICAgIHRoaXMuZmllbGRzW2l0ZW1dLnNob3coKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIHRoaXMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5maWVsZHNGb3JTdGFuZGFyZC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZmllbGRzW2l0ZW1dKSB7XHJcbiAgICAgICAgICB0aGlzLmZpZWxkc1tpdGVtXS5zaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCB0aGlzKTtcclxuICAgIH1cclxuICB9LFxyXG4gIHRvZ2dsZVNlbGVjdEZpZWxkOiBmdW5jdGlvbiB0b2dnbGVTZWxlY3RGaWVsZChmaWVsZCwgZGlzYWJsZSkge1xyXG4gICAgaWYgKGRpc2FibGUpIHtcclxuICAgICAgZmllbGQuZGlzYWJsZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZmllbGQuZW5hYmxlKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvblRpbWVsZXNzQ2hhbmdlOiBmdW5jdGlvbiBvblRpbWVsZXNzQ2hhbmdlKHZhbHVlKSB7XHJcbiAgICB0aGlzLnRvZ2dsZVNlbGVjdEZpZWxkKHRoaXMuZmllbGRzLkR1cmF0aW9uLCB2YWx1ZSk7XHJcblxyXG4gICAgY29uc3Qgc3RhcnREYXRlRmllbGQgPSB0aGlzLmZpZWxkcy5TdGFydERhdGU7XHJcbiAgICBsZXQgc3RhcnREYXRlID0gc3RhcnREYXRlRmllbGQuZ2V0VmFsdWUoKTtcclxuXHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgc3RhcnREYXRlRmllbGQuZGF0ZUZvcm1hdFRleHQgPSB0aGlzLnN0YXJ0aW5nVGltZWxlc3NGb3JtYXRUZXh0O1xyXG4gICAgICBzdGFydERhdGVGaWVsZC5zaG93VGltZVBpY2tlciA9IGZhbHNlO1xyXG4gICAgICBzdGFydERhdGVGaWVsZC50aW1lbGVzcyA9IHRydWU7XHJcbiAgICAgIGlmICghdGhpcy5pc0RhdGVUaW1lbGVzcyhzdGFydERhdGUpICYmIHN0YXJ0RGF0ZS5jbG9uZSkge1xyXG4gICAgICAgIHN0YXJ0RGF0ZSA9IHN0YXJ0RGF0ZS5jbG9uZSgpLmNsZWFyVGltZSgpLmFkZCh7XHJcbiAgICAgICAgICBtaW51dGVzOiAtMSAqIHN0YXJ0RGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpLFxyXG4gICAgICAgICAgc2Vjb25kczogNSxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBzdGFydERhdGVGaWVsZC5zZXRWYWx1ZShzdGFydERhdGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3RhcnREYXRlRmllbGQuZGF0ZUZvcm1hdFRleHQgPSAoQXBwLmlzMjRIb3VyQ2xvY2soKSkgPyB0aGlzLnN0YXJ0aW5nRm9ybWF0VGV4dDI0IDogdGhpcy5zdGFydGluZ0Zvcm1hdFRleHQ7XHJcbiAgICAgIHN0YXJ0RGF0ZUZpZWxkLnNob3dUaW1lUGlja2VyID0gdHJ1ZTtcclxuICAgICAgc3RhcnREYXRlRmllbGQudGltZWxlc3MgPSBmYWxzZTtcclxuICAgICAgaWYgKHRoaXMuaXNEYXRlVGltZWxlc3Moc3RhcnREYXRlKSkge1xyXG4gICAgICAgIHN0YXJ0RGF0ZSA9IHN0YXJ0RGF0ZS5jbG9uZSgpXHJcbiAgICAgICAgICAuYWRkKHtcclxuICAgICAgICAgICAgbWludXRlczogc3RhcnREYXRlLmdldFRpbWV6b25lT2Zmc2V0KCkgKyAxLFxyXG4gICAgICAgICAgICBzZWNvbmRzOiAtNSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHN0YXJ0RGF0ZUZpZWxkLnNldFZhbHVlKHN0YXJ0RGF0ZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBpc0RhdGVUaW1lbGVzczogZnVuY3Rpb24gaXNEYXRlVGltZWxlc3MoZGF0ZSkge1xyXG4gICAgaWYgKCFkYXRlKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChkYXRlLmdldFVUQ0hvdXJzKCkgIT09IDApIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGRhdGUuZ2V0VVRDTWludXRlcygpICE9PSAwKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChkYXRlLmdldFVUQ1NlY29uZHMoKSAhPT0gNSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSxcclxuICBvbkFzU2NoZWR1bGVkQ2hhbmdlOiBmdW5jdGlvbiBvbkFzU2NoZWR1bGVkQ2hhbmdlKHNjaGVkdWxlZCkge1xyXG4gICAgaWYgKHNjaGVkdWxlZCkge1xyXG4gICAgICBjb25zdCBkdXJhdGlvbiA9IHRoaXMuZmllbGRzLkR1cmF0aW9uLmdldFZhbHVlKCk7XHJcbiAgICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IG1vbWVudCh0aGlzLmZpZWxkcy5TdGFydERhdGUuZ2V0VmFsdWUoKSk7XHJcbiAgICAgIGNvbnN0IGNvbXBsZXRlZERhdGUgPSBzdGFydERhdGUuYWRkKHtcclxuICAgICAgICBtaW51dGVzOiBkdXJhdGlvbixcclxuICAgICAgfSlcclxuICAgICAgICAudG9EYXRlKCk7XHJcblxyXG4gICAgICB0aGlzLnRvZ2dsZVNlbGVjdEZpZWxkKHRoaXMuZmllbGRzLkNvbXBsZXRlZERhdGUsIHRydWUpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5Db21wbGV0ZWREYXRlLnNldFZhbHVlKGNvbXBsZXRlZERhdGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50b2dnbGVTZWxlY3RGaWVsZCh0aGlzLmZpZWxkcy5Db21wbGV0ZWREYXRlLCBmYWxzZSk7XHJcbiAgICAgIHRoaXMuZmllbGRzLkNvbXBsZXRlZERhdGUuc2V0VmFsdWUobmV3IERhdGUoKSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvbkZvbGxvd3VwQ2hhbmdlOiBmdW5jdGlvbiBvbkZvbGxvd3VwQ2hhbmdlKHZhbHVlKSB7XHJcbiAgICBjb25zdCBkaXNhYmxlID0gKHZhbHVlID09PSAnbm9uZScgfHwgKHZhbHVlICYmIHZhbHVlLmtleSA9PT0gJ25vbmUnKSk7XHJcbiAgICB0aGlzLnRvZ2dsZVNlbGVjdEZpZWxkKHRoaXMuZmllbGRzLkNhcnJ5T3Zlck5vdGVzLCBkaXNhYmxlKTtcclxuICB9LFxyXG4gIG9uTGVhZENoYW5nZTogZnVuY3Rpb24gb25MZWFkQ2hhbmdlKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gZmllbGQuZ2V0U2VsZWN0aW9uKCk7XHJcblxyXG4gICAgaWYgKHNlbGVjdGlvbiAmJiB0aGlzLmluc2VydCkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5Db21wYW55LnNldFZhbHVlKHV0aWxpdHkuZ2V0VmFsdWUoc2VsZWN0aW9uLCAnQ29tcGFueScpKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGZvcm1hdFBpY2tsaXN0Rm9yVHlwZTogZnVuY3Rpb24gZm9ybWF0UGlja2xpc3RGb3JUeXBlKHR5cGUsIHdoaWNoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5waWNrbGlzdHNCeVR5cGVbdHlwZV0gJiYgdGhpcy5waWNrbGlzdHNCeVR5cGVbdHlwZV1bd2hpY2hdO1xyXG4gIH0sXHJcbiAgc2V0VmFsdWVzOiBmdW5jdGlvbiBzZXRWYWx1ZXMoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChzZXRWYWx1ZXMsIGFyZ3VtZW50cyk7XHJcbiAgICB0aGlzLmZpZWxkcy5DYXJyeU92ZXJOb3Rlcy5zZXRWYWx1ZSh0cnVlKTtcclxuICAgIHRoaXMuZmllbGRzLkNvbXBsZXRlZERhdGUuc2V0VmFsdWUobmV3IERhdGUoKSk7XHJcbiAgICB0aGlzLmZpZWxkcy5Gb2xsb3d1cC5zZXRWYWx1ZSgnbm9uZScpO1xyXG4gICAgdGhpcy5maWVsZHMuUmVzdWx0LnNldFZhbHVlKCdDb21wbGV0ZScpO1xyXG4gICAgdGhpcy5maWVsZHMuUmVzdWx0Q29kZS5zZXRWYWx1ZSgnQ09NJyk7XHJcblxyXG4gICAgdGhpcy50b2dnbGVTZWxlY3RGaWVsZCh0aGlzLmZpZWxkcy5DYXJyeU92ZXJOb3RlcywgdHJ1ZSk7XHJcbiAgICB0aGlzLnRvZ2dsZVNlbGVjdEZpZWxkKHRoaXMuZmllbGRzLkNvbXBsZXRlZERhdGUsIGZhbHNlKTtcclxuICB9LFxyXG4gIG9uTGVhZGVyQ2hhbmdlOiBmdW5jdGlvbiBvbkxlYWRlckNoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIGNvbnN0IHVzZXJJZCA9IGZpZWxkLmdldFZhbHVlKCk7XHJcbiAgICB0aGlzLmZpZWxkcy5Vc2VySWQuc2V0VmFsdWUodXNlcklkICYmIHVzZXJJZC4ka2V5KTtcclxuICB9LFxyXG4gIGZvcm1hdEZvbGxvd3VwVGV4dDogZnVuY3Rpb24gZm9ybWF0Rm9sbG93dXBUZXh0KHZhbCwga2V5LCB0ZXh0KSB7XHJcbiAgICByZXR1cm4gdGhpcy5mb2xsb3d1cFZhbHVlVGV4dFtrZXldIHx8IHRleHQ7XHJcbiAgfSxcclxuICBjcmVhdGVEdXJhdGlvbkRhdGE6IGZ1bmN0aW9uIGNyZWF0ZUR1cmF0aW9uRGF0YSgpIHtcclxuICAgIGNvbnN0IGxpc3QgPSBbXTtcclxuICAgIGZvciAoY29uc3QgZHVyYXRpb24gaW4gdGhpcy5kdXJhdGlvblZhbHVlVGV4dCkge1xyXG4gICAgICBpZiAodGhpcy5kdXJhdGlvblZhbHVlVGV4dC5oYXNPd25Qcm9wZXJ0eShkdXJhdGlvbikpIHtcclxuICAgICAgICBsaXN0LnB1c2goe1xyXG4gICAgICAgICAgJGtleTogZHVyYXRpb24sXHJcbiAgICAgICAgICAkZGVzY3JpcHRvcjogdGhpcy5kdXJhdGlvblZhbHVlVGV4dFtkdXJhdGlvbl0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAkcmVzb3VyY2VzOiBsaXN0LFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGNyZWF0ZUZvbGxvd3VwRGF0YTogZnVuY3Rpb24gY3JlYXRlRm9sbG93dXBEYXRhKCkge1xyXG4gICAgY29uc3QgbGlzdCA9IFtdO1xyXG5cclxuICAgIGZvciAoY29uc3QgZm9sbG93dXAgaW4gdGhpcy5mb2xsb3d1cFZhbHVlVGV4dCkge1xyXG4gICAgICBpZiAodGhpcy5mb2xsb3d1cFZhbHVlVGV4dC5oYXNPd25Qcm9wZXJ0eShmb2xsb3d1cCkpIHtcclxuICAgICAgICBsaXN0LnB1c2goe1xyXG4gICAgICAgICAgJGtleTogZm9sbG93dXAsXHJcbiAgICAgICAgICAkZGVzY3JpcHRvcjogdGhpcy5mb2xsb3d1cFZhbHVlVGV4dFtmb2xsb3d1cF0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAkcmVzb3VyY2VzOiBsaXN0LFxyXG4gICAgfTtcclxuICB9LFxyXG4gIG5hdmlnYXRlVG9Gb2xsb3dVcFZpZXc6IGZ1bmN0aW9uIG5hdmlnYXRlVG9Gb2xsb3dVcFZpZXcoZW50cnkpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLmZvbGxvd3VwVmlldyk7XHJcbiAgICBjb25zdCBmb2xsb3d1cEVudHJ5ID0ge1xyXG4gICAgICBUeXBlOiB0aGlzLmZpZWxkcy5Gb2xsb3d1cC5nZXRWYWx1ZSgpLFxyXG4gICAgICBEZXNjcmlwdGlvbjogZW50cnkuRGVzY3JpcHRpb24sXHJcbiAgICAgIEFjY291bnRJZDogZW50cnkuQWNjb3VudElkLFxyXG4gICAgICBBY2NvdW50TmFtZTogZW50cnkuQWNjb3VudE5hbWUsXHJcbiAgICAgIENvbnRhY3RJZDogZW50cnkuQ29udGFjdElkLFxyXG4gICAgICBDb250YWN0TmFtZTogZW50cnkuQ29udGFjdE5hbWUsXHJcbiAgICAgIExlYWRJZDogZW50cnkuTGVhZElkLFxyXG4gICAgICBMZWFkTmFtZTogZW50cnkuTGVhZE5hbWUsXHJcbiAgICAgIExvbmdOb3RlczogKHRoaXMuZmllbGRzLkNhcnJ5T3Zlck5vdGVzLmdldFZhbHVlKCkgJiYgZW50cnkuTG9uZ05vdGVzKSB8fCAnJyxcclxuICAgICAgT3Bwb3J0dW5pdHlJZDogZW50cnkuT3Bwb3J0dW5pdHlJZCxcclxuICAgICAgT3Bwb3J0dW5pdHlOYW1lOiBlbnRyeS5PcHBvcnR1bml0eU5hbWUsXHJcbiAgICAgIFN0YXJ0RGF0ZTogbW9tZW50KClcclxuICAgICAgICAudG9EYXRlKCksXHJcbiAgICAgIFRpY2tldElkOiBlbnRyeS5UaWNrZXRJZCxcclxuICAgICAgVGlja2V0TnVtYmVyOiBlbnRyeS5UaWNrZXROdW1iZXIsXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFJldHVybiB0byBhY3Rpdml0eSBsaXN0IHZpZXcgYWZ0ZXIgZm9sbG93IHVwLlxyXG4gICAgdmlldy5zaG93KHtcclxuICAgICAgZW50cnk6IGZvbGxvd3VwRW50cnksXHJcbiAgICAgIGluc2VydDogdHJ1ZSxcclxuICAgICAgdGl0bGU6IHRoaXMuZm9sbG93dXBWYWx1ZVRleHRbdGhpcy5maWVsZHMuRm9sbG93dXAuZ2V0VmFsdWUoKV0sXHJcbiAgICB9LCB7XHJcbiAgICAgIHJldHVyblRvOiAtMSxcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgY29tcGxldGVBY3Rpdml0eTogZnVuY3Rpb24gY29tcGxldGVBY3Rpdml0eShlbnRyeSwgY2FsbGJhY2spIHtcclxuICAgIGNvbnN0IGFjdGl2aXR5TW9kZWwgPSBBcHAuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKE1PREVMX05BTUVTLkFDVElWSVRZLCBNT0RFTF9UWVBFUy5TREFUQSk7XHJcbiAgICBlbnRyeS5MZWFkZXIgPSB0aGlzLmZpZWxkcy5MZWFkZXIuZ2V0VmFsdWUoKTtcclxuICAgIGVudHJ5LlJlc3VsdCA9IHRoaXMuZmllbGRzLlJlc3VsdC5nZXRWYWx1ZSgpO1xyXG4gICAgZW50cnkuUmVzdWx0Q29kZSA9IHRoaXMuZmllbGRzLlJlc3VsdENvZGUuZ2V0VmFsdWUoKTtcclxuICAgIGVudHJ5LkNvbXBsZXRlZERhdGUgPSB0aGlzLmZpZWxkcy5Db21wbGV0ZWREYXRlLmdldFZhbHVlKCk7XHJcblxyXG4gICAgY29uc3Qgc3VjY2VzcyA9IChmdW5jdGlvbiByZWZyZXNoU3RhbGUoc2NvcGUsIHRoZUNhbGxiYWNrLCB0aGVFbnRyeSkge1xyXG4gICAgICByZXR1cm4gZnVuY3Rpb24gcmVmcmVzaFN0YWxlVmlld3MoKSB7XHJcbiAgICAgICAgZW52aXJvbm1lbnQucmVmcmVzaFN0YWxlRGV0YWlsVmlld3MoKTtcclxuICAgICAgICBjb25uZWN0LnB1Ymxpc2goJy9hcHAvcmVmcmVzaCcsIFt7XHJcbiAgICAgICAgICByZXNvdXJjZUtpbmQ6ICdoaXN0b3J5JyxcclxuICAgICAgICB9XSk7XHJcblxyXG4gICAgICAgIHRoZUNhbGxiYWNrLmFwcGx5KHNjb3BlLCBbdGhlRW50cnldKTtcclxuICAgICAgfTtcclxuICAgIH0pKHRoaXMsIGNhbGxiYWNrLCBlbnRyeSk7XHJcblxyXG4gICAgaWYgKGFjdGl2aXR5TW9kZWwpIHtcclxuICAgICAgYWN0aXZpdHlNb2RlbC5jb21wbGV0ZUFjdGl2aXR5KGVudHJ5KS50aGVuKHN1Y2Nlc3MsIHRoaXMub25SZXF1ZXN0RmFpbHVyZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvbkluc2VydENvbXBsZXRlZDogZnVuY3Rpb24gb25JbnNlcnRDb21wbGV0ZWQoZW50cnkpIHtcclxuICAgIC8vIEFjdGl2aXR5IGluc2VydGVkLCBzbyBub3cgY29tcGxldGUgaXQgbGlrZSBvdXIgbm9ybWFsIGZsb3dcclxuICAgIHRoaXMub25VcGRhdGVDb21wbGV0ZWQoZW50cnkpO1xyXG4gIH0sXHJcbiAgb25QdXRDb21wbGV0ZTogZnVuY3Rpb24gb25QdXRDb21wbGV0ZShlbnRyeSkge1xyXG4gICAgdGhpcy5fY29tcGxldGVkQmFzZWRPbiA9IG51bGw7XHJcbiAgICBpZiAoZW50cnkuJGtleS5zcGxpdCh0aGlzLnJlY3VycmluZ0FjdGl2aXR5SWRTZXBhcmF0b3IpLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICB0aGlzLl9jb21wbGV0ZWRCYXNlZE9uID0gZW50cnk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmluaGVyaXRlZChvblB1dENvbXBsZXRlLCBhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgb25VcGRhdGVDb21wbGV0ZWQ6IGZ1bmN0aW9uIG9uVXBkYXRlQ29tcGxldGVkKGVudHJ5KSB7XHJcbiAgICBpZiAoIWVudHJ5KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmb2xsb3d1cCA9IHRoaXMuZmllbGRzLkZvbGxvd3VwLmdldFZhbHVlKCkgPT09ICdub25lJyA/IHRoaXMuZ2V0SW5oZXJpdGVkKG9uVXBkYXRlQ29tcGxldGVkLCBhcmd1bWVudHMpIDogdGhpcy5uYXZpZ2F0ZVRvRm9sbG93VXBWaWV3O1xyXG4gICAgZW50cnkuJGNvbXBsZXRlZEJhc2VkT24gPSB0aGlzLl9jb21wbGV0ZWRCYXNlZE9uO1xyXG4gICAgdGhpcy5jb21wbGV0ZUFjdGl2aXR5KGVudHJ5LCBmb2xsb3d1cCk7XHJcbiAgfSxcclxuICBmb3JtYXREZXBlbmRlbnRRdWVyeTogZnVuY3Rpb24gZm9ybWF0RGVwZW5kZW50UXVlcnkoZGVwZW5kZW50VmFsdWUsIGZvcm1hdCwgcHJvcGVydHkpIHtcclxuICAgIGNvbnN0IHRoZVByb3BlcnR5ID0gcHJvcGVydHkgfHwgJyRrZXknO1xyXG5cclxuICAgIHJldHVybiBzdHJpbmcuc3Vic3RpdHV0ZShmb3JtYXQsIFt1dGlsaXR5LmdldFZhbHVlKGRlcGVuZGVudFZhbHVlLCB0aGVQcm9wZXJ0eSldKTtcclxuICB9LFxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5b3V0IHx8ICh0aGlzLmxheW91dCA9IFt7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmFjdGl2aXR5SW5mb1RleHQsXHJcbiAgICAgIG5hbWU6ICdBY3Rpdml0eUluZm9TZWN0aW9uJyxcclxuICAgICAgY29sbGFwc2VkOiBmYWxzZSxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbmFtZTogJ1R5cGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnVHlwZScsXHJcbiAgICAgICAgdHlwZTogJ2hpZGRlbicsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBkZXBlbmRzT246ICdUeXBlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5yZWdhcmRpbmdUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgcGlja2xpc3Q6IHRoaXMuZm9ybWF0UGlja2xpc3RGb3JUeXBlLmJpbmREZWxlZ2F0ZSh0aGlzLCAnRGVzY3JpcHRpb24nKSxcclxuICAgICAgICB0aXRsZTogdGhpcy5yZWdhcmRpbmdUaXRsZVRleHQsXHJcbiAgICAgICAgb3JkZXJCeTogJ3RleHQgYXNjJyxcclxuICAgICAgICB0eXBlOiAncGlja2xpc3QnLFxyXG4gICAgICAgIG1heFRleHRMZW5ndGg6IDY0LFxyXG4gICAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4Y2VlZHNNYXhUZXh0TGVuZ3RoLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMubG9uZ05vdGVzVGV4dCxcclxuICAgICAgICBub3RlUHJvcGVydHk6IGZhbHNlLFxyXG4gICAgICAgIG5hbWU6ICdMb25nTm90ZXMnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnTG9uZ05vdGVzJyxcclxuICAgICAgICB0aXRsZTogdGhpcy5sb25nTm90ZXNUaXRsZVRleHQsXHJcbiAgICAgICAgdHlwZTogJ25vdGUnLFxyXG4gICAgICAgIHZpZXc6ICd0ZXh0X2VkaXQnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc3RhcnRpbmdUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdTdGFydERhdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU3RhcnREYXRlJyxcclxuICAgICAgICB0eXBlOiAnZGF0ZScsXHJcbiAgICAgICAgc2hvd1RpbWVQaWNrZXI6IHRydWUsXHJcbiAgICAgICAgZm9ybWF0U3RyaW5nOiAoQXBwLmlzMjRIb3VyQ2xvY2soKSkgPyB0aGlzLnN0YXJ0aW5nRm9ybWF0VGV4dDI0IDogdGhpcy5zdGFydGluZ0Zvcm1hdFRleHQsXHJcbiAgICAgICAgbWluVmFsdWU6IChuZXcgRGF0ZSgxOTAwLCAwLCAxKSksXHJcbiAgICAgICAgdmFsaWRhdG9yOiBbXHJcbiAgICAgICAgICB2YWxpZGF0b3IuZXhpc3RzLFxyXG4gICAgICAgICAgdmFsaWRhdG9yLmlzRGF0ZUluUmFuZ2UsXHJcbiAgICAgICAgXSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmR1cmF0aW9uVGV4dCxcclxuICAgICAgICB0aXRsZTogdGhpcy5kdXJhdGlvblRpdGxlVGV4dCxcclxuICAgICAgICBuYW1lOiAnRHVyYXRpb24nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRHVyYXRpb24nLFxyXG4gICAgICAgIHR5cGU6ICdkdXJhdGlvbicsXHJcbiAgICAgICAgdmlldzogJ3NlbGVjdF9saXN0JyxcclxuICAgICAgICBkYXRhOiB0aGlzLmNyZWF0ZUR1cmF0aW9uRGF0YSgpLFxyXG4gICAgICAgIHZhbGlkYXRvcjoge1xyXG4gICAgICAgICAgZm46IGZ1bmN0aW9uIHRlc3REaXNhYmxlZCh2YWwsIGZpZWxkKSB7XHJcbiAgICAgICAgICAgIGlmIChmaWVsZC5pc0Rpc2FibGVkKCkpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCEvXlxcZCskLy50ZXN0KHZhbCkpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG1lc3NhZ2U6IHRoaXMuZHVyYXRpb25JbnZhbGlkVGV4dCxcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMudGltZWxlc3NUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdUaW1lbGVzcycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdUaW1lbGVzcycsXHJcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxyXG4gICAgICB9XSxcclxuICAgIH0sIHtcclxuICAgICAgdGl0bGU6IHRoaXMuY29tcGxldGlvblRleHQsXHJcbiAgICAgIG5hbWU6ICdDb21wbGV0aW9uU2VjdGlvbicsXHJcbiAgICAgIGNvbGxhcHNlZDogZmFsc2UsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFzU2NoZWR1bGVkVGV4dCxcclxuICAgICAgICBpbmNsdWRlOiBmYWxzZSxcclxuICAgICAgICBuYW1lOiAnQXNTY2hlZHVsZWQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQXNTY2hlZHVsZWQnLFxyXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmNvbXBsZXRlZFRleHQsXHJcbiAgICAgICAgbmFtZTogJ0NvbXBsZXRlZERhdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ29tcGxldGVkRGF0ZScsXHJcbiAgICAgICAgdHlwZTogJ2RhdGUnLFxyXG4gICAgICAgIHNob3dUaW1lUGlja2VyOiB0cnVlLFxyXG4gICAgICAgIGZvcm1hdFN0cmluZzogdGhpcy5jb21wbGV0ZWRGb3JtYXRUZXh0LFxyXG4gICAgICAgIG1pblZhbHVlOiAobmV3IERhdGUoMTkwMCwgMCwgMSkpLFxyXG4gICAgICAgIHZhbGlkYXRvcjogW1xyXG4gICAgICAgICAgdmFsaWRhdG9yLmV4aXN0cyxcclxuICAgICAgICAgIHZhbGlkYXRvci5pc0RhdGVJblJhbmdlLFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBkZXBlbmRzT246ICdUeXBlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5yZXN1bHRUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdSZXN1bHQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUmVzdWx0JyxcclxuICAgICAgICBzdG9yYWdlTW9kZTogJ2NvZGUnLCAvLyBUaGUgb25SZXN1bHRDaGFuZ2UgY2hhbmdlcyB0aGUgdmFsdWUgYmFjayB0byB0ZXh0XHJcbiAgICAgICAgcGlja2xpc3Q6IHRoaXMuZm9ybWF0UGlja2xpc3RGb3JUeXBlLmJpbmREZWxlZ2F0ZSh0aGlzLCAnUmVzdWx0JyksXHJcbiAgICAgICAgdGl0bGU6IHRoaXMucmVzdWx0VGl0bGVUZXh0LFxyXG4gICAgICAgIG9yZGVyQnk6ICd0ZXh0IGFzYycsXHJcbiAgICAgICAgdHlwZTogJ3BpY2tsaXN0JyxcclxuICAgICAgICBtYXhUZXh0TGVuZ3RoOiA2NCxcclxuICAgICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdSZXN1bHRDb2RlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1Jlc3VsdENvZGUnLFxyXG4gICAgICAgIHR5cGU6ICdoaWRkZW4nLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZm9sbG93VXBUZXh0LFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLmZvbGxvd1VwVGl0bGVUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdGb2xsb3d1cCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdGb2xsb3d1cCcsXHJcbiAgICAgICAgdHlwZTogJ3NlbGVjdCcsXHJcbiAgICAgICAgdmlldzogJ3NlbGVjdF9saXN0JyxcclxuICAgICAgICB0ZXh0UmVuZGVyZXI6IHRoaXMuZm9ybWF0Rm9sbG93dXBUZXh0LmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgICAgICByZXF1aXJlU2VsZWN0aW9uOiB0cnVlLFxyXG4gICAgICAgIHZhbHVlS2V5UHJvcGVydHk6IGZhbHNlLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiBmYWxzZSxcclxuICAgICAgICBkYXRhOiB0aGlzLmNyZWF0ZUZvbGxvd3VwRGF0YSgpLFxyXG4gICAgICAgIGluY2x1ZGU6IGZhbHNlLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuY2FycnlPdmVyTm90ZXNUZXh0LFxyXG4gICAgICAgIGluY2x1ZGU6IGZhbHNlLFxyXG4gICAgICAgIG5hbWU6ICdDYXJyeU92ZXJOb3RlcycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDYXJyeU92ZXJOb3RlcycsXHJcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxyXG4gICAgICB9XSxcclxuICAgIH0sIHtcclxuICAgICAgdGl0bGU6IHRoaXMub3RoZXJJbmZvVGV4dCxcclxuICAgICAgbmFtZTogJ090aGVySW5mb1NlY3Rpb24nLFxyXG4gICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBsYWJlbDogdGhpcy5wcmlvcml0eVRleHQsXHJcbiAgICAgICAgbmFtZTogJ1ByaW9yaXR5JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1ByaW9yaXR5JyxcclxuICAgICAgICBwaWNrbGlzdDogJ1ByaW9yaXRpZXMnLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLnByaW9yaXR5VGl0bGVUZXh0LFxyXG4gICAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICAgICAgbWF4VGV4dExlbmd0aDogNjQsXHJcbiAgICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBkZXBlbmRzT246ICdUeXBlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5jYXRlZ29yeVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0NhdGVnb3J5JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0NhdGVnb3J5JyxcclxuICAgICAgICBwaWNrbGlzdDogdGhpcy5mb3JtYXRQaWNrbGlzdEZvclR5cGUuYmluZERlbGVnYXRlKHRoaXMsICdDYXRlZ29yeScpLFxyXG4gICAgICAgIG9yZGVyQnk6ICd0ZXh0IGFzYycsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMuY2F0ZWdvcnlUaXRsZVRleHQsXHJcbiAgICAgICAgdHlwZTogJ3BpY2tsaXN0JyxcclxuICAgICAgICBtYXhUZXh0TGVuZ3RoOiA2NCxcclxuICAgICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIHR5cGU6ICdoaWRkZW4nLFxyXG4gICAgICAgIG5hbWU6ICdVc2VySWQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnVXNlcklkJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmxlYWRlclRleHQsXHJcbiAgICAgICAgbmFtZTogJ0xlYWRlcicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdMZWFkZXInLFxyXG4gICAgICAgIGluY2x1ZGU6IGZhbHNlLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIHRleHRQcm9wZXJ0eTogJ1VzZXJJbmZvJyxcclxuICAgICAgICB0ZXh0VGVtcGxhdGU6IHRlbXBsYXRlLm5hbWVMRixcclxuICAgICAgICByZXF1aXJlU2VsZWN0aW9uOiB0cnVlLFxyXG4gICAgICAgIHZpZXc6ICd1c2VyX2xpc3QnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWNjb3VudFRleHQsXHJcbiAgICAgICAgbmFtZTogJ0FjY291bnQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQWNjb3VudCcsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICBhcHBseVRvOiAnLicsXHJcbiAgICAgICAgdmFsdWVLZXlQcm9wZXJ0eTogJ0FjY291bnRJZCcsXHJcbiAgICAgICAgdmFsdWVUZXh0UHJvcGVydHk6ICdBY2NvdW50TmFtZScsXHJcbiAgICAgICAgdmlldzogJ2FjY291bnRfcmVsYXRlZCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBkZXBlbmRzT246ICdBY2NvdW50JyxcclxuICAgICAgICBsYWJlbDogdGhpcy5jb250YWN0VGV4dCxcclxuICAgICAgICBuYW1lOiAnQ29udGFjdCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDb250YWN0JyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIGFwcGx5VG86ICcuJyxcclxuICAgICAgICB2YWx1ZUtleVByb3BlcnR5OiAnQ29udGFjdElkJyxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ0NvbnRhY3ROYW1lJyxcclxuICAgICAgICB2aWV3OiAnY29udGFjdF9yZWxhdGVkJyxcclxuICAgICAgICB3aGVyZTogdGhpcy5mb3JtYXREZXBlbmRlbnRRdWVyeS5iaW5kRGVsZWdhdGUodGhpcywgJ0FjY291bnQuSWQgZXEgXCIkezB9XCInLCAnQWNjb3VudElkJyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBkZXBlbmRzT246ICdBY2NvdW50JyxcclxuICAgICAgICBsYWJlbDogdGhpcy5vcHBvcnR1bml0eVRleHQsXHJcbiAgICAgICAgbmFtZTogJ09wcG9ydHVuaXR5JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ09wcG9ydHVuaXR5JyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIGFwcGx5VG86ICcuJyxcclxuICAgICAgICB2YWx1ZUtleVByb3BlcnR5OiAnT3Bwb3J0dW5pdHlJZCcsXHJcbiAgICAgICAgdmFsdWVUZXh0UHJvcGVydHk6ICdPcHBvcnR1bml0eU5hbWUnLFxyXG4gICAgICAgIHZpZXc6ICdvcHBvcnR1bml0eV9yZWxhdGVkJyxcclxuICAgICAgICB3aGVyZTogdGhpcy5mb3JtYXREZXBlbmRlbnRRdWVyeS5iaW5kRGVsZWdhdGUodGhpcywgJ0FjY291bnQuSWQgZXEgXCIkezB9XCInLCAnQWNjb3VudElkJyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBkZXBlbmRzT246ICdBY2NvdW50JyxcclxuICAgICAgICBsYWJlbDogdGhpcy50aWNrZXROdW1iZXJUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdUaWNrZXQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnVGlja2V0JyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIGFwcGx5VG86ICcuJyxcclxuICAgICAgICB2YWx1ZUtleVByb3BlcnR5OiAnVGlja2V0SWQnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnVGlja2V0TnVtYmVyJyxcclxuICAgICAgICB2aWV3OiAndGlja2V0X3JlbGF0ZWQnLFxyXG4gICAgICAgIHdoZXJlOiB0aGlzLmZvcm1hdERlcGVuZGVudFF1ZXJ5LmJpbmREZWxlZ2F0ZSh0aGlzLCAnQWNjb3VudC5JZCBlcSBcIiR7MH1cIicsICdBY2NvdW50SWQnKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmxlYWRUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdMZWFkJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0xlYWQnLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgICAgYXBwbHlUbzogJy4nLFxyXG4gICAgICAgIHZhbHVlS2V5UHJvcGVydHk6ICdMZWFkSWQnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnTGVhZE5hbWUnLFxyXG4gICAgICAgIHZpZXc6ICdsZWFkX3JlbGF0ZWQnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuY29tcGFueVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0FjY291bnROYW1lJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0FjY291bnROYW1lJyxcclxuICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgIH1dLFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19