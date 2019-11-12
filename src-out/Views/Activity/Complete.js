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
      this.inherited(arguments);

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

      this.inherited(arguments);

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
      this.inherited(arguments);
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
      this.inherited(arguments);
    },
    onUpdateCompleted: function onUpdateCompleted(entry) {
      if (!entry) {
        return;
      }

      var followup = this.fields.Followup.getValue() === 'none' ? this.getInherited(arguments) : this.navigateToFollowUpView;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BY3Rpdml0eS9Db21wbGV0ZS5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsImR0Rm9ybWF0UmVzb3VyY2UiLCJfX2NsYXNzIiwiYWN0aXZpdHlJbmZvVGV4dCIsImFjY291bnRUZXh0IiwiY29udGFjdFRleHQiLCJvcHBvcnR1bml0eVRleHQiLCJ0aWNrZXROdW1iZXJUZXh0IiwiY29tcGFueVRleHQiLCJsZWFkVGV4dCIsImFzU2NoZWR1bGVkVGV4dCIsImNhdGVnb3J5VGV4dCIsImNhdGVnb3J5VGl0bGVUZXh0IiwiY29tcGxldGVkVGV4dCIsImNvbXBsZXRlZEZvcm1hdFRleHQiLCJjb21wbGV0ZWRGb3JtYXRUZXh0MjQiLCJjb21wbGV0aW9uVGV4dCIsImR1cmF0aW9uVGV4dCIsImR1cmF0aW9uVGl0bGVUZXh0IiwiZHVyYXRpb25JbnZhbGlkVGV4dCIsImNhcnJ5T3Zlck5vdGVzVGV4dCIsImZvbGxvd1VwVGV4dCIsImZvbGxvd1VwVGl0bGVUZXh0IiwibGVhZGVyVGV4dCIsImxvbmdOb3Rlc1RleHQiLCJsb25nTm90ZXNUaXRsZVRleHQiLCJvdGhlckluZm9UZXh0IiwicHJpb3JpdHlUZXh0IiwicHJpb3JpdHlUaXRsZVRleHQiLCJyZWdhcmRpbmdUZXh0IiwicmVnYXJkaW5nVGl0bGVUZXh0IiwicmVzdWx0VGV4dCIsInJlc3VsdFRpdGxlVGV4dCIsInN0YXJ0aW5nVGV4dCIsInN0YXJ0aW5nRm9ybWF0VGV4dCIsInN0YXJ0aW5nRm9ybWF0VGV4dDI0Iiwic3RhcnRpbmdUaW1lbGVzc0Zvcm1hdFRleHQiLCJ0aW1lbGVzc1RleHQiLCJyZWN1cnJpbmdBY3Rpdml0eUlkU2VwYXJhdG9yIiwiZHVyYXRpb25WYWx1ZVRleHQiLCJub25lVGV4dCIsInF1YXJ0ZXJIb3VyVGV4dCIsImhhbGZIb3VyVGV4dCIsImhvdXJUZXh0IiwiaG91ckFuZEhhbGZUZXh0IiwidHdvSG91cnNUZXh0IiwiZm9sbG93dXBWYWx1ZVRleHQiLCJub25lIiwibm9uZVByb3BUZXh0IiwiYXRQaG9uZUNhbGwiLCJwaG9uZUNhbGxUZXh0IiwiYXRBcHBvaW50bWVudCIsIm1lZXRpbmdUZXh0IiwiYXRUb0RvIiwidG9Eb1RleHQiLCJhdFBlcnNvbmFsIiwicGVyc29uYWxUZXh0IiwiaWQiLCJmb2xsb3d1cFZpZXciLCJmaWVsZHNGb3JMZWFkcyIsImZpZWxkc0ZvclN0YW5kYXJkIiwicGlja2xpc3RzQnlUeXBlIiwiQ2F0ZWdvcnkiLCJEZXNjcmlwdGlvbiIsIlJlc3VsdCIsImF0TGl0ZXJhdHVyZSIsImF0RU1haWwiLCJlbnRpdHlOYW1lIiwicXVlcnlTZWxlY3QiLCJyZXNvdXJjZUtpbmQiLCJjb250cmFjdE5hbWUiLCJpbml0IiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiY29ubmVjdCIsImZpZWxkcyIsIkxlYWRlciIsIm9uTGVhZGVyQ2hhbmdlIiwiVGltZWxlc3MiLCJvblRpbWVsZXNzQ2hhbmdlIiwiQXNTY2hlZHVsZWQiLCJvbkFzU2NoZWR1bGVkQ2hhbmdlIiwiRm9sbG93dXAiLCJvbkZvbGxvd3VwQ2hhbmdlIiwiTGVhZCIsIm9uTGVhZENoYW5nZSIsIm9uUmVzdWx0Q2hhbmdlIiwidmFsdWUiLCJmaWVsZCIsInNldFZhbHVlIiwidGV4dCIsIlJlc3VsdENvZGUiLCJleGVjIiwia2V5IiwiaXNBY3Rpdml0eUZvckxlYWQiLCJlbnRyeSIsInRlc3QiLCJMZWFkSWQiLCJiZWZvcmVUcmFuc2l0aW9uVG8iLCJjb25jYXQiLCJmb3JFYWNoIiwiaGlkZUZpZWxkcyIsIml0ZW0iLCJoaWRlIiwib3B0aW9ucyIsInNob3ciLCJ0b2dnbGVTZWxlY3RGaWVsZCIsImRpc2FibGUiLCJlbmFibGUiLCJEdXJhdGlvbiIsInN0YXJ0RGF0ZUZpZWxkIiwiU3RhcnREYXRlIiwic3RhcnREYXRlIiwiZ2V0VmFsdWUiLCJkYXRlRm9ybWF0VGV4dCIsInNob3dUaW1lUGlja2VyIiwidGltZWxlc3MiLCJpc0RhdGVUaW1lbGVzcyIsImNsb25lIiwiY2xlYXJUaW1lIiwiYWRkIiwibWludXRlcyIsImdldFRpbWV6b25lT2Zmc2V0Iiwic2Vjb25kcyIsIkFwcCIsImlzMjRIb3VyQ2xvY2siLCJkYXRlIiwiZ2V0VVRDSG91cnMiLCJnZXRVVENNaW51dGVzIiwiZ2V0VVRDU2Vjb25kcyIsInNjaGVkdWxlZCIsImR1cmF0aW9uIiwibW9tZW50IiwiY29tcGxldGVkRGF0ZSIsInRvRGF0ZSIsIkNvbXBsZXRlZERhdGUiLCJEYXRlIiwiQ2FycnlPdmVyTm90ZXMiLCJzZWxlY3Rpb24iLCJnZXRTZWxlY3Rpb24iLCJpbnNlcnQiLCJDb21wYW55IiwiZm9ybWF0UGlja2xpc3RGb3JUeXBlIiwidHlwZSIsIndoaWNoIiwic2V0VmFsdWVzIiwidXNlcklkIiwiVXNlcklkIiwiJGtleSIsImZvcm1hdEZvbGxvd3VwVGV4dCIsInZhbCIsImNyZWF0ZUR1cmF0aW9uRGF0YSIsImxpc3QiLCJoYXNPd25Qcm9wZXJ0eSIsInB1c2giLCIkZGVzY3JpcHRvciIsIiRyZXNvdXJjZXMiLCJjcmVhdGVGb2xsb3d1cERhdGEiLCJmb2xsb3d1cCIsIm5hdmlnYXRlVG9Gb2xsb3dVcFZpZXciLCJ2aWV3IiwiZ2V0VmlldyIsImZvbGxvd3VwRW50cnkiLCJUeXBlIiwiQWNjb3VudElkIiwiQWNjb3VudE5hbWUiLCJDb250YWN0SWQiLCJDb250YWN0TmFtZSIsIkxlYWROYW1lIiwiTG9uZ05vdGVzIiwiT3Bwb3J0dW5pdHlJZCIsIk9wcG9ydHVuaXR5TmFtZSIsIlRpY2tldElkIiwiVGlja2V0TnVtYmVyIiwidGl0bGUiLCJyZXR1cm5UbyIsImNvbXBsZXRlQWN0aXZpdHkiLCJjYWxsYmFjayIsImFjdGl2aXR5TW9kZWwiLCJNb2RlbE1hbmFnZXIiLCJnZXRNb2RlbCIsIkFDVElWSVRZIiwiU0RBVEEiLCJzdWNjZXNzIiwicmVmcmVzaFN0YWxlIiwic2NvcGUiLCJ0aGVDYWxsYmFjayIsInRoZUVudHJ5IiwicmVmcmVzaFN0YWxlVmlld3MiLCJyZWZyZXNoU3RhbGVEZXRhaWxWaWV3cyIsInB1Ymxpc2giLCJhcHBseSIsInRoZW4iLCJvblJlcXVlc3RGYWlsdXJlIiwib25QdXRDb21wbGV0ZSIsIl9jb21wbGV0ZWRCYXNlZE9uIiwic3BsaXQiLCJsZW5ndGgiLCJvblVwZGF0ZUNvbXBsZXRlZCIsImdldEluaGVyaXRlZCIsIiRjb21wbGV0ZWRCYXNlZE9uIiwiZm9ybWF0RGVwZW5kZW50UXVlcnkiLCJkZXBlbmRlbnRWYWx1ZSIsImZvcm1hdCIsInByb3BlcnR5IiwidGhlUHJvcGVydHkiLCJzdWJzdGl0dXRlIiwiY3JlYXRlTGF5b3V0IiwibGF5b3V0IiwibmFtZSIsImNvbGxhcHNlZCIsImNoaWxkcmVuIiwiZGVwZW5kc09uIiwibGFiZWwiLCJwaWNrbGlzdCIsImJpbmREZWxlZ2F0ZSIsIm9yZGVyQnkiLCJtYXhUZXh0TGVuZ3RoIiwidmFsaWRhdG9yIiwiZXhjZWVkc01heFRleHRMZW5ndGgiLCJub3RlUHJvcGVydHkiLCJmb3JtYXRTdHJpbmciLCJtaW5WYWx1ZSIsImV4aXN0cyIsImlzRGF0ZUluUmFuZ2UiLCJkYXRhIiwiZm4iLCJ0ZXN0RGlzYWJsZWQiLCJpc0Rpc2FibGVkIiwibWVzc2FnZSIsImluY2x1ZGUiLCJzdG9yYWdlTW9kZSIsInRleHRSZW5kZXJlciIsInJlcXVpcmVTZWxlY3Rpb24iLCJ2YWx1ZUtleVByb3BlcnR5IiwidmFsdWVUZXh0UHJvcGVydHkiLCJ0ZXh0UHJvcGVydHkiLCJ0ZXh0VGVtcGxhdGUiLCJuYW1lTEYiLCJlbXB0eVRleHQiLCJhcHBseVRvIiwid2hlcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRCQSxNQUFNQSxXQUFXLG9CQUFZLGtCQUFaLENBQWpCLEMsQ0E1QkE7Ozs7Ozs7Ozs7Ozs7OztBQTZCQSxNQUFNQyxtQkFBbUIsb0JBQVksZ0NBQVosQ0FBekI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkEsTUFBTUMsVUFBVSx1QkFBUSw2QkFBUixFQUF1QyxnQkFBdkMsRUFBK0M7QUFDN0Q7QUFDQUMs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RUFBcUUsV0FBckU7QUFYTixTQXhETyxFQW9FUDtBQUNESCxxQkFBVyxTQURWO0FBRURDLGlCQUFPLEtBQUs5TSxnQkFGWDtBQUdEME0sZ0JBQU0sUUFITDtBQUlETCxvQkFBVSxRQUpUO0FBS0Q3RCxnQkFBTSxRQUxMO0FBTURnRyxxQkFBVyxFQU5WO0FBT0RDLG1CQUFTLEdBUFI7QUFRRE4sNEJBQWtCLFVBUmpCO0FBU0RDLDZCQUFtQixjQVRsQjtBQVVEM0UsZ0JBQU0sZ0JBVkw7QUFXRGlGLGlCQUFPLEtBQUt4QyxvQkFBTCxDQUEwQmMsWUFBMUIsQ0FBdUMsSUFBdkMsRUFBNkMsc0JBQTdDLEVBQXFFLFdBQXJFO0FBWE4sU0FwRU8sRUFnRlA7QUFDREYsaUJBQU8sS0FBSzVNLFFBRFg7QUFFRHdNLGdCQUFNLE1BRkw7QUFHREwsb0JBQVUsTUFIVDtBQUlEN0QsZ0JBQU0sUUFKTDtBQUtEZ0cscUJBQVcsRUFMVjtBQU1EQyxtQkFBUyxHQU5SO0FBT0ROLDRCQUFrQixRQVBqQjtBQVFEQyw2QkFBbUIsVUFSbEI7QUFTRDNFLGdCQUFNO0FBVEwsU0FoRk8sRUEwRlA7QUFDRHFELGlCQUFPLEtBQUs3TSxXQURYO0FBRUR5TSxnQkFBTSxhQUZMO0FBR0RMLG9CQUFVLGFBSFQ7QUFJRDdELGdCQUFNO0FBSkwsU0ExRk87QUFKVCxPQTFIa0MsQ0FBOUIsQ0FBUDtBQStORDtBQXhsQjRELEdBQS9DLENBQWhCOztvQkEybEJlN0ksTyIsImZpbGUiOiJDb21wbGV0ZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBjb25uZWN0IGZyb20gJ2Rvam8vX2Jhc2UvY29ubmVjdCc7XHJcbmltcG9ydCBzdHJpbmcgZnJvbSAnZG9qby9zdHJpbmcnO1xyXG5pbXBvcnQgZW52aXJvbm1lbnQgZnJvbSAnLi4vLi4vRW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgdmFsaWRhdG9yIGZyb20gJy4uLy4uL1ZhbGlkYXRvcic7XHJcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuLi8uLi9UZW1wbGF0ZSc7XHJcbmltcG9ydCB1dGlsaXR5IGZyb20gJ2FyZ29zL1V0aWxpdHknO1xyXG5pbXBvcnQgRWRpdCBmcm9tICdhcmdvcy9FZGl0JztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBNT0RFTF9UWVBFUyBmcm9tICdhcmdvcy9Nb2RlbHMvVHlwZXMnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYWN0aXZpdHlDb21wbGV0ZScpO1xyXG5jb25zdCBkdEZvcm1hdFJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2FjdGl2aXR5Q29tcGxldGVEYXRlVGltZUZvcm1hdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuQWN0aXZpdHkuQ29tcGxldGVcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuRWRpdFxyXG4gKiBAbWl4aW5zIGFyZ29zLkVkaXRcclxuICpcclxuICogQHJlcXVpcmVzIGFyZ29zLkVkaXRcclxuICogQHJlcXVpcmVzIGFyZ29zLlV0aWxpdHlcclxuICpcclxuICogQHJlcXVpcmVzIGNybS5FbnZpcm9ubWVudFxyXG4gKiBAcmVxdWlyZXMgY3JtLlZhbGlkYXRvclxyXG4gKiBAcmVxdWlyZXMgY3JtLlRlbXBsYXRlXHJcbiAqXHJcbiAqIEByZXF1aXJlcyBtb21lbnRcclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuQWN0aXZpdHkuQ29tcGxldGUnLCBbRWRpdF0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICBhY3Rpdml0eUluZm9UZXh0OiByZXNvdXJjZS5hY3Rpdml0eUluZm9UZXh0LFxyXG4gIGFjY291bnRUZXh0OiByZXNvdXJjZS5hY2NvdW50VGV4dCxcclxuICBjb250YWN0VGV4dDogcmVzb3VyY2UuY29udGFjdFRleHQsXHJcbiAgb3Bwb3J0dW5pdHlUZXh0OiByZXNvdXJjZS5vcHBvcnR1bml0eVRleHQsXHJcbiAgdGlja2V0TnVtYmVyVGV4dDogcmVzb3VyY2UudGlja2V0TnVtYmVyVGV4dCxcclxuICBjb21wYW55VGV4dDogcmVzb3VyY2UuY29tcGFueVRleHQsXHJcbiAgbGVhZFRleHQ6IHJlc291cmNlLmxlYWRUZXh0LFxyXG4gIGFzU2NoZWR1bGVkVGV4dDogcmVzb3VyY2UuYXNTY2hlZHVsZWRUZXh0LFxyXG4gIGNhdGVnb3J5VGV4dDogcmVzb3VyY2UuY2F0ZWdvcnlUZXh0LFxyXG4gIGNhdGVnb3J5VGl0bGVUZXh0OiByZXNvdXJjZS5jYXRlZ29yeVRpdGxlVGV4dCxcclxuICBjb21wbGV0ZWRUZXh0OiByZXNvdXJjZS5jb21wbGV0ZWRUZXh0LFxyXG4gIGNvbXBsZXRlZEZvcm1hdFRleHQ6IGR0Rm9ybWF0UmVzb3VyY2UuY29tcGxldGVkRm9ybWF0VGV4dCxcclxuICBjb21wbGV0ZWRGb3JtYXRUZXh0MjQ6IGR0Rm9ybWF0UmVzb3VyY2UuY29tcGxldGVkRm9ybWF0VGV4dDI0LFxyXG4gIGNvbXBsZXRpb25UZXh0OiByZXNvdXJjZS5jb21wbGV0aW9uVGV4dCxcclxuICBkdXJhdGlvblRleHQ6IHJlc291cmNlLmR1cmF0aW9uVGV4dCxcclxuICBkdXJhdGlvblRpdGxlVGV4dDogcmVzb3VyY2UuZHVyYXRpb25UaXRsZVRleHQsXHJcbiAgZHVyYXRpb25JbnZhbGlkVGV4dDogcmVzb3VyY2UuZHVyYXRpb25JbnZhbGlkVGV4dCxcclxuICBjYXJyeU92ZXJOb3Rlc1RleHQ6IHJlc291cmNlLmNhcnJ5T3Zlck5vdGVzVGV4dCxcclxuICBmb2xsb3dVcFRleHQ6IHJlc291cmNlLmZvbGxvd1VwVGV4dCxcclxuICBmb2xsb3dVcFRpdGxlVGV4dDogcmVzb3VyY2UuZm9sbG93VXBUaXRsZVRleHQsXHJcbiAgbGVhZGVyVGV4dDogcmVzb3VyY2UubGVhZGVyVGV4dCxcclxuICBsb25nTm90ZXNUZXh0OiByZXNvdXJjZS5sb25nTm90ZXNUZXh0LFxyXG4gIGxvbmdOb3Rlc1RpdGxlVGV4dDogcmVzb3VyY2UubG9uZ05vdGVzVGl0bGVUZXh0LFxyXG4gIG90aGVySW5mb1RleHQ6IHJlc291cmNlLm90aGVySW5mb1RleHQsXHJcbiAgcHJpb3JpdHlUZXh0OiByZXNvdXJjZS5wcmlvcml0eVRleHQsXHJcbiAgcHJpb3JpdHlUaXRsZVRleHQ6IHJlc291cmNlLnByaW9yaXR5VGl0bGVUZXh0LFxyXG4gIHJlZ2FyZGluZ1RleHQ6IHJlc291cmNlLnJlZ2FyZGluZ1RleHQsXHJcbiAgcmVnYXJkaW5nVGl0bGVUZXh0OiByZXNvdXJjZS5yZWdhcmRpbmdUaXRsZVRleHQsXHJcbiAgcmVzdWx0VGV4dDogcmVzb3VyY2UucmVzdWx0VGV4dCxcclxuICByZXN1bHRUaXRsZVRleHQ6IHJlc291cmNlLnJlc3VsdFRpdGxlVGV4dCxcclxuICBzdGFydGluZ1RleHQ6IHJlc291cmNlLnN0YXJ0aW5nVGV4dCxcclxuICBzdGFydGluZ0Zvcm1hdFRleHQ6IGR0Rm9ybWF0UmVzb3VyY2Uuc3RhcnRpbmdGb3JtYXRUZXh0LFxyXG4gIHN0YXJ0aW5nRm9ybWF0VGV4dDI0OiBkdEZvcm1hdFJlc291cmNlLnN0YXJ0aW5nRm9ybWF0VGV4dDI0LFxyXG4gIHN0YXJ0aW5nVGltZWxlc3NGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLnN0YXJ0aW5nVGltZWxlc3NGb3JtYXRUZXh0LFxyXG4gIHRpbWVsZXNzVGV4dDogcmVzb3VyY2UudGltZWxlc3NUZXh0LFxyXG4gIHJlY3VycmluZ0FjdGl2aXR5SWRTZXBhcmF0b3I6ICc7JyxcclxuICBkdXJhdGlvblZhbHVlVGV4dDoge1xyXG4gICAgMDogcmVzb3VyY2Uubm9uZVRleHQsXHJcbiAgICAxNTogcmVzb3VyY2UucXVhcnRlckhvdXJUZXh0LFxyXG4gICAgMzA6IHJlc291cmNlLmhhbGZIb3VyVGV4dCxcclxuICAgIDYwOiByZXNvdXJjZS5ob3VyVGV4dCxcclxuICAgIDkwOiByZXNvdXJjZS5ob3VyQW5kSGFsZlRleHQsXHJcbiAgICAxMjA6IHJlc291cmNlLnR3b0hvdXJzVGV4dCxcclxuICB9LFxyXG4gIGZvbGxvd3VwVmFsdWVUZXh0OiB7XHJcbiAgICBub25lOiByZXNvdXJjZS5ub25lUHJvcFRleHQsXHJcbiAgICBhdFBob25lQ2FsbDogcmVzb3VyY2UucGhvbmVDYWxsVGV4dCxcclxuICAgIGF0QXBwb2ludG1lbnQ6IHJlc291cmNlLm1lZXRpbmdUZXh0LFxyXG4gICAgYXRUb0RvOiByZXNvdXJjZS50b0RvVGV4dCxcclxuICAgIGF0UGVyc29uYWw6IHJlc291cmNlLnBlcnNvbmFsVGV4dCxcclxuICB9LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ2FjdGl2aXR5X2NvbXBsZXRlJyxcclxuICBmb2xsb3d1cFZpZXc6ICdhY3Rpdml0eV9lZGl0JyxcclxuICBmaWVsZHNGb3JMZWFkczogWydBY2NvdW50TmFtZScsICdMZWFkJ10sXHJcbiAgZmllbGRzRm9yU3RhbmRhcmQ6IFsnQWNjb3VudCcsICdDb250YWN0JywgJ09wcG9ydHVuaXR5JywgJ1RpY2tldCddLFxyXG4gIHBpY2tsaXN0c0J5VHlwZToge1xyXG4gICAgYXRBcHBvaW50bWVudDoge1xyXG4gICAgICBDYXRlZ29yeTogJ01lZXRpbmcgQ2F0ZWdvcnkgQ29kZXMnLFxyXG4gICAgICBEZXNjcmlwdGlvbjogJ01lZXRpbmcgUmVnYXJkaW5nJyxcclxuICAgICAgUmVzdWx0OiAnTWVldGluZyBSZXN1bHQgQ29kZXMnLFxyXG4gICAgfSxcclxuICAgIGF0TGl0ZXJhdHVyZToge1xyXG4gICAgICBEZXNjcmlwdGlvbjogJ0xpdCBSZXF1ZXN0IFJlZ2FyZGluZycsXHJcbiAgICB9LFxyXG4gICAgYXRQZXJzb25hbDoge1xyXG4gICAgICBDYXRlZ29yeTogJ01lZXRpbmcgQ2F0ZWdvcnkgQ29kZXMnLFxyXG4gICAgICBEZXNjcmlwdGlvbjogJ1BlcnNvbmFsIEFjdGl2aXR5IFJlZ2FyZGluZycsXHJcbiAgICAgIFJlc3VsdDogJ1BlcnNvbmFsIEFjdGl2aXR5IFJlc3VsdCBDb2RlcycsXHJcbiAgICB9LFxyXG4gICAgYXRQaG9uZUNhbGw6IHtcclxuICAgICAgQ2F0ZWdvcnk6ICdQaG9uZSBDYWxsIENhdGVnb3J5IENvZGVzJyxcclxuICAgICAgRGVzY3JpcHRpb246ICdQaG9uZSBDYWxsIFJlZ2FyZGluZycsXHJcbiAgICAgIFJlc3VsdDogJ1Bob25lIENhbGwgUmVzdWx0IENvZGVzJyxcclxuICAgIH0sXHJcbiAgICBhdFRvRG86IHtcclxuICAgICAgQ2F0ZWdvcnk6ICdUbyBEbyBDYXRlZ29yeSBDb2RlcycsXHJcbiAgICAgIERlc2NyaXB0aW9uOiAnVG8gRG8gUmVnYXJkaW5nJyxcclxuICAgICAgUmVzdWx0OiAnVG8gRG8gUmVzdWx0IENvZGVzJyxcclxuICAgIH0sXHJcbiAgICBhdEVNYWlsOiB7XHJcbiAgICAgIENhdGVnb3J5OiAnRS1tYWlsIENhdGVnb3J5IENvZGVzJyxcclxuICAgICAgRGVzY3JpcHRpb246ICdFLW1haWwgUmVnYXJkaW5nJyxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgZW50aXR5TmFtZTogJ0FjdGl2aXR5JyxcclxuICBxdWVyeVNlbGVjdDogW1xyXG4gICAgJ0FjY291bnRJZCcsXHJcbiAgICAnQWNjb3VudE5hbWUnLFxyXG4gICAgJ0FsYXJtJyxcclxuICAgICdBbGFybVRpbWUnLFxyXG4gICAgJ0NhdGVnb3J5JyxcclxuICAgICdDb250YWN0SWQnLFxyXG4gICAgJ0NvbnRhY3ROYW1lJyxcclxuICAgICdDb21wbGV0ZWREYXRlJyxcclxuICAgICdEZXNjcmlwdGlvbicsXHJcbiAgICAnRHVyYXRpb24nLFxyXG4gICAgJ0xlYWRlci8ka2V5JyxcclxuICAgICdMZWFkSWQnLFxyXG4gICAgJ0xlYWROYW1lJyxcclxuICAgICdMb25nTm90ZXMnLFxyXG4gICAgJ09wcG9ydHVuaXR5SWQnLFxyXG4gICAgJ09wcG9ydHVuaXR5TmFtZScsXHJcbiAgICAnUHJpb3JpdHknLFxyXG4gICAgJ1JlZ2FyZGluZycsXHJcbiAgICAnUmVzdWx0JyxcclxuICAgICdSb2xsb3ZlcicsXHJcbiAgICAnU3RhcnREYXRlJyxcclxuICAgICdUaWNrZXRJZCcsXHJcbiAgICAnVGlja2V0TnVtYmVyJyxcclxuICAgICdUaW1lbGVzcycsXHJcbiAgICAnVHlwZScsXHJcbiAgICAnUmVjdXJyaW5nJyxcclxuICAgICdSZWN1cnJlbmNlU3RhdGUnLFxyXG4gICAgJ0FsbG93QWRkJyxcclxuICAgICdBbGxvd0VkaXQnLFxyXG4gICAgJ0FsbG93RGVsZXRlJyxcclxuICAgICdBbGxvd0NvbXBsZXRlJyxcclxuICBdLFxyXG4gIHJlc291cmNlS2luZDogJ2FjdGl2aXRpZXMnLFxyXG4gIGNvbnRyYWN0TmFtZTogJ3N5c3RlbScsXHJcblxyXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG5cclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5MZWFkZXIsICdvbkNoYW5nZScsIHRoaXMub25MZWFkZXJDaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLlRpbWVsZXNzLCAnb25DaGFuZ2UnLCB0aGlzLm9uVGltZWxlc3NDaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLkFzU2NoZWR1bGVkLCAnb25DaGFuZ2UnLCB0aGlzLm9uQXNTY2hlZHVsZWRDaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLkZvbGxvd3VwLCAnb25DaGFuZ2UnLCB0aGlzLm9uRm9sbG93dXBDaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLkxlYWQsICdvbkNoYW5nZScsIHRoaXMub25MZWFkQ2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5SZXN1bHQsICdvbkNoYW5nZScsIHRoaXMub25SZXN1bHRDaGFuZ2UpO1xyXG4gIH0sXHJcbiAgb25SZXN1bHRDaGFuZ2U6IGZ1bmN0aW9uIG9uUmVzdWx0Q2hhbmdlKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgLy8gU2V0IHRoZSBSZXN1bHQgZmllbGQgYmFjayB0byB0aGUgdGV4dCB2YWx1ZSwgYW5kIHRha2UgdGhlIHBpY2tsaXN0IGNvZGUgYW5kIHNldCB0aGF0IHRvIHRoZSBSZXN1bHRzQ29kZVxyXG4gICAgZmllbGQuc2V0VmFsdWUodmFsdWUudGV4dCk7XHJcblxyXG4gICAgLy8gTWF4IGxlbmd0aCBmb3IgUkVTVUxUQ09ERSBpcyA4IGNoYXJzLCB0aGUgc2RhdGEgZW5kcG9pbnQgZG9lc24ndCBoYW5kbGUgdGhpcywgc28gd2Ugd2lsbCB0cnVuY2F0ZSBsaWtlIHRoZSBMQU4gaWYgbmVjZXNzYXJ5XHJcbiAgICB0aGlzLmZpZWxkcy5SZXN1bHRDb2RlLnNldFZhbHVlKCgvLnswLDh9L2lnKVxyXG4gICAgICAuZXhlYyh2YWx1ZS5rZXkpKTtcclxuICB9LFxyXG4gIGlzQWN0aXZpdHlGb3JMZWFkOiBmdW5jdGlvbiBpc0FjdGl2aXR5Rm9yTGVhZChlbnRyeSkge1xyXG4gICAgcmV0dXJuIGVudHJ5ICYmIC9eW1xcd117MTJ9JC8udGVzdChlbnRyeS5MZWFkSWQpO1xyXG4gIH0sXHJcbiAgYmVmb3JlVHJhbnNpdGlvblRvOiBmdW5jdGlvbiBiZWZvcmVUcmFuc2l0aW9uVG8oKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG5cclxuICAgIHRoaXMuZmllbGRzRm9yU3RhbmRhcmQuY29uY2F0KHRoaXMuZmllbGRzRm9yTGVhZHMpLmZvckVhY2goZnVuY3Rpb24gaGlkZUZpZWxkcyhpdGVtKSB7XHJcbiAgICAgIGlmICh0aGlzLmZpZWxkc1tpdGVtXSkge1xyXG4gICAgICAgIHRoaXMuZmllbGRzW2l0ZW1dLmhpZGUoKTtcclxuICAgICAgfVxyXG4gICAgfSwgdGhpcyk7XHJcblxyXG4gICAgY29uc3QgZW50cnkgPSB0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmVudHJ5O1xyXG4gICAgaWYgKHRoaXMuaXNBY3Rpdml0eUZvckxlYWQoZW50cnkpKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzRm9yTGVhZHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmZpZWxkc1tpdGVtXSkge1xyXG4gICAgICAgICAgdGhpcy5maWVsZHNbaXRlbV0uc2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSwgdGhpcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZpZWxkc0ZvclN0YW5kYXJkLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICBpZiAodGhpcy5maWVsZHNbaXRlbV0pIHtcclxuICAgICAgICAgIHRoaXMuZmllbGRzW2l0ZW1dLnNob3coKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIHRoaXMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgdG9nZ2xlU2VsZWN0RmllbGQ6IGZ1bmN0aW9uIHRvZ2dsZVNlbGVjdEZpZWxkKGZpZWxkLCBkaXNhYmxlKSB7XHJcbiAgICBpZiAoZGlzYWJsZSkge1xyXG4gICAgICBmaWVsZC5kaXNhYmxlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmaWVsZC5lbmFibGUoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uVGltZWxlc3NDaGFuZ2U6IGZ1bmN0aW9uIG9uVGltZWxlc3NDaGFuZ2UodmFsdWUpIHtcclxuICAgIHRoaXMudG9nZ2xlU2VsZWN0RmllbGQodGhpcy5maWVsZHMuRHVyYXRpb24sIHZhbHVlKTtcclxuXHJcbiAgICBjb25zdCBzdGFydERhdGVGaWVsZCA9IHRoaXMuZmllbGRzLlN0YXJ0RGF0ZTtcclxuICAgIGxldCBzdGFydERhdGUgPSBzdGFydERhdGVGaWVsZC5nZXRWYWx1ZSgpO1xyXG5cclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICBzdGFydERhdGVGaWVsZC5kYXRlRm9ybWF0VGV4dCA9IHRoaXMuc3RhcnRpbmdUaW1lbGVzc0Zvcm1hdFRleHQ7XHJcbiAgICAgIHN0YXJ0RGF0ZUZpZWxkLnNob3dUaW1lUGlja2VyID0gZmFsc2U7XHJcbiAgICAgIHN0YXJ0RGF0ZUZpZWxkLnRpbWVsZXNzID0gdHJ1ZTtcclxuICAgICAgaWYgKCF0aGlzLmlzRGF0ZVRpbWVsZXNzKHN0YXJ0RGF0ZSkgJiYgc3RhcnREYXRlLmNsb25lKSB7XHJcbiAgICAgICAgc3RhcnREYXRlID0gc3RhcnREYXRlLmNsb25lKCkuY2xlYXJUaW1lKCkuYWRkKHtcclxuICAgICAgICAgIG1pbnV0ZXM6IC0xICogc3RhcnREYXRlLmdldFRpbWV6b25lT2Zmc2V0KCksXHJcbiAgICAgICAgICBzZWNvbmRzOiA1LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHN0YXJ0RGF0ZUZpZWxkLnNldFZhbHVlKHN0YXJ0RGF0ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdGFydERhdGVGaWVsZC5kYXRlRm9ybWF0VGV4dCA9IChBcHAuaXMyNEhvdXJDbG9jaygpKSA/IHRoaXMuc3RhcnRpbmdGb3JtYXRUZXh0MjQgOiB0aGlzLnN0YXJ0aW5nRm9ybWF0VGV4dDtcclxuICAgICAgc3RhcnREYXRlRmllbGQuc2hvd1RpbWVQaWNrZXIgPSB0cnVlO1xyXG4gICAgICBzdGFydERhdGVGaWVsZC50aW1lbGVzcyA9IGZhbHNlO1xyXG4gICAgICBpZiAodGhpcy5pc0RhdGVUaW1lbGVzcyhzdGFydERhdGUpKSB7XHJcbiAgICAgICAgc3RhcnREYXRlID0gc3RhcnREYXRlLmNsb25lKClcclxuICAgICAgICAgIC5hZGQoe1xyXG4gICAgICAgICAgICBtaW51dGVzOiBzdGFydERhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKSArIDEsXHJcbiAgICAgICAgICAgIHNlY29uZHM6IC01LFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgc3RhcnREYXRlRmllbGQuc2V0VmFsdWUoc3RhcnREYXRlKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGlzRGF0ZVRpbWVsZXNzOiBmdW5jdGlvbiBpc0RhdGVUaW1lbGVzcyhkYXRlKSB7XHJcbiAgICBpZiAoIWRhdGUpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGRhdGUuZ2V0VVRDSG91cnMoKSAhPT0gMCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoZGF0ZS5nZXRVVENNaW51dGVzKCkgIT09IDApIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGRhdGUuZ2V0VVRDU2Vjb25kcygpICE9PSA1KSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9LFxyXG4gIG9uQXNTY2hlZHVsZWRDaGFuZ2U6IGZ1bmN0aW9uIG9uQXNTY2hlZHVsZWRDaGFuZ2Uoc2NoZWR1bGVkKSB7XHJcbiAgICBpZiAoc2NoZWR1bGVkKSB7XHJcbiAgICAgIGNvbnN0IGR1cmF0aW9uID0gdGhpcy5maWVsZHMuRHVyYXRpb24uZ2V0VmFsdWUoKTtcclxuICAgICAgY29uc3Qgc3RhcnREYXRlID0gbW9tZW50KHRoaXMuZmllbGRzLlN0YXJ0RGF0ZS5nZXRWYWx1ZSgpKTtcclxuICAgICAgY29uc3QgY29tcGxldGVkRGF0ZSA9IHN0YXJ0RGF0ZS5hZGQoe1xyXG4gICAgICAgIG1pbnV0ZXM6IGR1cmF0aW9uLFxyXG4gICAgICB9KVxyXG4gICAgICAgIC50b0RhdGUoKTtcclxuXHJcbiAgICAgIHRoaXMudG9nZ2xlU2VsZWN0RmllbGQodGhpcy5maWVsZHMuQ29tcGxldGVkRGF0ZSwgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuZmllbGRzLkNvbXBsZXRlZERhdGUuc2V0VmFsdWUoY29tcGxldGVkRGF0ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnRvZ2dsZVNlbGVjdEZpZWxkKHRoaXMuZmllbGRzLkNvbXBsZXRlZERhdGUsIGZhbHNlKTtcclxuICAgICAgdGhpcy5maWVsZHMuQ29tcGxldGVkRGF0ZS5zZXRWYWx1ZShuZXcgRGF0ZSgpKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uRm9sbG93dXBDaGFuZ2U6IGZ1bmN0aW9uIG9uRm9sbG93dXBDaGFuZ2UodmFsdWUpIHtcclxuICAgIGNvbnN0IGRpc2FibGUgPSAodmFsdWUgPT09ICdub25lJyB8fCAodmFsdWUgJiYgdmFsdWUua2V5ID09PSAnbm9uZScpKTtcclxuICAgIHRoaXMudG9nZ2xlU2VsZWN0RmllbGQodGhpcy5maWVsZHMuQ2FycnlPdmVyTm90ZXMsIGRpc2FibGUpO1xyXG4gIH0sXHJcbiAgb25MZWFkQ2hhbmdlOiBmdW5jdGlvbiBvbkxlYWRDaGFuZ2UodmFsdWUsIGZpZWxkKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb24gPSBmaWVsZC5nZXRTZWxlY3Rpb24oKTtcclxuXHJcbiAgICBpZiAoc2VsZWN0aW9uICYmIHRoaXMuaW5zZXJ0KSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLkNvbXBhbnkuc2V0VmFsdWUodXRpbGl0eS5nZXRWYWx1ZShzZWxlY3Rpb24sICdDb21wYW55JykpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZm9ybWF0UGlja2xpc3RGb3JUeXBlOiBmdW5jdGlvbiBmb3JtYXRQaWNrbGlzdEZvclR5cGUodHlwZSwgd2hpY2gpIHtcclxuICAgIHJldHVybiB0aGlzLnBpY2tsaXN0c0J5VHlwZVt0eXBlXSAmJiB0aGlzLnBpY2tsaXN0c0J5VHlwZVt0eXBlXVt3aGljaF07XHJcbiAgfSxcclxuICBzZXRWYWx1ZXM6IGZ1bmN0aW9uIHNldFZhbHVlcygpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICB0aGlzLmZpZWxkcy5DYXJyeU92ZXJOb3Rlcy5zZXRWYWx1ZSh0cnVlKTtcclxuICAgIHRoaXMuZmllbGRzLkNvbXBsZXRlZERhdGUuc2V0VmFsdWUobmV3IERhdGUoKSk7XHJcbiAgICB0aGlzLmZpZWxkcy5Gb2xsb3d1cC5zZXRWYWx1ZSgnbm9uZScpO1xyXG4gICAgdGhpcy5maWVsZHMuUmVzdWx0LnNldFZhbHVlKCdDb21wbGV0ZScpO1xyXG4gICAgdGhpcy5maWVsZHMuUmVzdWx0Q29kZS5zZXRWYWx1ZSgnQ09NJyk7XHJcblxyXG4gICAgdGhpcy50b2dnbGVTZWxlY3RGaWVsZCh0aGlzLmZpZWxkcy5DYXJyeU92ZXJOb3RlcywgdHJ1ZSk7XHJcbiAgICB0aGlzLnRvZ2dsZVNlbGVjdEZpZWxkKHRoaXMuZmllbGRzLkNvbXBsZXRlZERhdGUsIGZhbHNlKTtcclxuICB9LFxyXG4gIG9uTGVhZGVyQ2hhbmdlOiBmdW5jdGlvbiBvbkxlYWRlckNoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIGNvbnN0IHVzZXJJZCA9IGZpZWxkLmdldFZhbHVlKCk7XHJcbiAgICB0aGlzLmZpZWxkcy5Vc2VySWQuc2V0VmFsdWUodXNlcklkICYmIHVzZXJJZC4ka2V5KTtcclxuICB9LFxyXG4gIGZvcm1hdEZvbGxvd3VwVGV4dDogZnVuY3Rpb24gZm9ybWF0Rm9sbG93dXBUZXh0KHZhbCwga2V5LCB0ZXh0KSB7XHJcbiAgICByZXR1cm4gdGhpcy5mb2xsb3d1cFZhbHVlVGV4dFtrZXldIHx8IHRleHQ7XHJcbiAgfSxcclxuICBjcmVhdGVEdXJhdGlvbkRhdGE6IGZ1bmN0aW9uIGNyZWF0ZUR1cmF0aW9uRGF0YSgpIHtcclxuICAgIGNvbnN0IGxpc3QgPSBbXTtcclxuICAgIGZvciAoY29uc3QgZHVyYXRpb24gaW4gdGhpcy5kdXJhdGlvblZhbHVlVGV4dCkge1xyXG4gICAgICBpZiAodGhpcy5kdXJhdGlvblZhbHVlVGV4dC5oYXNPd25Qcm9wZXJ0eShkdXJhdGlvbikpIHtcclxuICAgICAgICBsaXN0LnB1c2goe1xyXG4gICAgICAgICAgJGtleTogZHVyYXRpb24sXHJcbiAgICAgICAgICAkZGVzY3JpcHRvcjogdGhpcy5kdXJhdGlvblZhbHVlVGV4dFtkdXJhdGlvbl0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAkcmVzb3VyY2VzOiBsaXN0LFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGNyZWF0ZUZvbGxvd3VwRGF0YTogZnVuY3Rpb24gY3JlYXRlRm9sbG93dXBEYXRhKCkge1xyXG4gICAgY29uc3QgbGlzdCA9IFtdO1xyXG5cclxuICAgIGZvciAoY29uc3QgZm9sbG93dXAgaW4gdGhpcy5mb2xsb3d1cFZhbHVlVGV4dCkge1xyXG4gICAgICBpZiAodGhpcy5mb2xsb3d1cFZhbHVlVGV4dC5oYXNPd25Qcm9wZXJ0eShmb2xsb3d1cCkpIHtcclxuICAgICAgICBsaXN0LnB1c2goe1xyXG4gICAgICAgICAgJGtleTogZm9sbG93dXAsXHJcbiAgICAgICAgICAkZGVzY3JpcHRvcjogdGhpcy5mb2xsb3d1cFZhbHVlVGV4dFtmb2xsb3d1cF0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAkcmVzb3VyY2VzOiBsaXN0LFxyXG4gICAgfTtcclxuICB9LFxyXG4gIG5hdmlnYXRlVG9Gb2xsb3dVcFZpZXc6IGZ1bmN0aW9uIG5hdmlnYXRlVG9Gb2xsb3dVcFZpZXcoZW50cnkpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLmZvbGxvd3VwVmlldyk7XHJcbiAgICBjb25zdCBmb2xsb3d1cEVudHJ5ID0ge1xyXG4gICAgICBUeXBlOiB0aGlzLmZpZWxkcy5Gb2xsb3d1cC5nZXRWYWx1ZSgpLFxyXG4gICAgICBEZXNjcmlwdGlvbjogZW50cnkuRGVzY3JpcHRpb24sXHJcbiAgICAgIEFjY291bnRJZDogZW50cnkuQWNjb3VudElkLFxyXG4gICAgICBBY2NvdW50TmFtZTogZW50cnkuQWNjb3VudE5hbWUsXHJcbiAgICAgIENvbnRhY3RJZDogZW50cnkuQ29udGFjdElkLFxyXG4gICAgICBDb250YWN0TmFtZTogZW50cnkuQ29udGFjdE5hbWUsXHJcbiAgICAgIExlYWRJZDogZW50cnkuTGVhZElkLFxyXG4gICAgICBMZWFkTmFtZTogZW50cnkuTGVhZE5hbWUsXHJcbiAgICAgIExvbmdOb3RlczogKHRoaXMuZmllbGRzLkNhcnJ5T3Zlck5vdGVzLmdldFZhbHVlKCkgJiYgZW50cnkuTG9uZ05vdGVzKSB8fCAnJyxcclxuICAgICAgT3Bwb3J0dW5pdHlJZDogZW50cnkuT3Bwb3J0dW5pdHlJZCxcclxuICAgICAgT3Bwb3J0dW5pdHlOYW1lOiBlbnRyeS5PcHBvcnR1bml0eU5hbWUsXHJcbiAgICAgIFN0YXJ0RGF0ZTogbW9tZW50KClcclxuICAgICAgICAudG9EYXRlKCksXHJcbiAgICAgIFRpY2tldElkOiBlbnRyeS5UaWNrZXRJZCxcclxuICAgICAgVGlja2V0TnVtYmVyOiBlbnRyeS5UaWNrZXROdW1iZXIsXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFJldHVybiB0byBhY3Rpdml0eSBsaXN0IHZpZXcgYWZ0ZXIgZm9sbG93IHVwLlxyXG4gICAgdmlldy5zaG93KHtcclxuICAgICAgZW50cnk6IGZvbGxvd3VwRW50cnksXHJcbiAgICAgIGluc2VydDogdHJ1ZSxcclxuICAgICAgdGl0bGU6IHRoaXMuZm9sbG93dXBWYWx1ZVRleHRbdGhpcy5maWVsZHMuRm9sbG93dXAuZ2V0VmFsdWUoKV0sXHJcbiAgICB9LCB7XHJcbiAgICAgIHJldHVyblRvOiAtMSxcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgY29tcGxldGVBY3Rpdml0eTogZnVuY3Rpb24gY29tcGxldGVBY3Rpdml0eShlbnRyeSwgY2FsbGJhY2spIHtcclxuICAgIGNvbnN0IGFjdGl2aXR5TW9kZWwgPSBBcHAuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKE1PREVMX05BTUVTLkFDVElWSVRZLCBNT0RFTF9UWVBFUy5TREFUQSk7XHJcbiAgICBlbnRyeS5MZWFkZXIgPSB0aGlzLmZpZWxkcy5MZWFkZXIuZ2V0VmFsdWUoKTtcclxuICAgIGVudHJ5LlJlc3VsdCA9IHRoaXMuZmllbGRzLlJlc3VsdC5nZXRWYWx1ZSgpO1xyXG4gICAgZW50cnkuUmVzdWx0Q29kZSA9IHRoaXMuZmllbGRzLlJlc3VsdENvZGUuZ2V0VmFsdWUoKTtcclxuICAgIGVudHJ5LkNvbXBsZXRlZERhdGUgPSB0aGlzLmZpZWxkcy5Db21wbGV0ZWREYXRlLmdldFZhbHVlKCk7XHJcblxyXG4gICAgY29uc3Qgc3VjY2VzcyA9IChmdW5jdGlvbiByZWZyZXNoU3RhbGUoc2NvcGUsIHRoZUNhbGxiYWNrLCB0aGVFbnRyeSkge1xyXG4gICAgICByZXR1cm4gZnVuY3Rpb24gcmVmcmVzaFN0YWxlVmlld3MoKSB7XHJcbiAgICAgICAgZW52aXJvbm1lbnQucmVmcmVzaFN0YWxlRGV0YWlsVmlld3MoKTtcclxuICAgICAgICBjb25uZWN0LnB1Ymxpc2goJy9hcHAvcmVmcmVzaCcsIFt7XHJcbiAgICAgICAgICByZXNvdXJjZUtpbmQ6ICdoaXN0b3J5JyxcclxuICAgICAgICB9XSk7XHJcblxyXG4gICAgICAgIHRoZUNhbGxiYWNrLmFwcGx5KHNjb3BlLCBbdGhlRW50cnldKTtcclxuICAgICAgfTtcclxuICAgIH0pKHRoaXMsIGNhbGxiYWNrLCBlbnRyeSk7XHJcblxyXG4gICAgaWYgKGFjdGl2aXR5TW9kZWwpIHtcclxuICAgICAgYWN0aXZpdHlNb2RlbC5jb21wbGV0ZUFjdGl2aXR5KGVudHJ5KS50aGVuKHN1Y2Nlc3MsIHRoaXMub25SZXF1ZXN0RmFpbHVyZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvblB1dENvbXBsZXRlOiBmdW5jdGlvbiBvblB1dENvbXBsZXRlKGVudHJ5KSB7XHJcbiAgICB0aGlzLl9jb21wbGV0ZWRCYXNlZE9uID0gbnVsbDtcclxuICAgIGlmIChlbnRyeS4ka2V5LnNwbGl0KHRoaXMucmVjdXJyaW5nQWN0aXZpdHlJZFNlcGFyYXRvcikubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgIHRoaXMuX2NvbXBsZXRlZEJhc2VkT24gPSBlbnRyeTtcclxuICAgIH1cclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBvblVwZGF0ZUNvbXBsZXRlZDogZnVuY3Rpb24gb25VcGRhdGVDb21wbGV0ZWQoZW50cnkpIHtcclxuICAgIGlmICghZW50cnkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZvbGxvd3VwID0gdGhpcy5maWVsZHMuRm9sbG93dXAuZ2V0VmFsdWUoKSA9PT0gJ25vbmUnID8gdGhpcy5nZXRJbmhlcml0ZWQoYXJndW1lbnRzKSA6IHRoaXMubmF2aWdhdGVUb0ZvbGxvd1VwVmlldztcclxuICAgIGVudHJ5LiRjb21wbGV0ZWRCYXNlZE9uID0gdGhpcy5fY29tcGxldGVkQmFzZWRPbjtcclxuICAgIHRoaXMuY29tcGxldGVBY3Rpdml0eShlbnRyeSwgZm9sbG93dXApO1xyXG4gIH0sXHJcbiAgZm9ybWF0RGVwZW5kZW50UXVlcnk6IGZ1bmN0aW9uIGZvcm1hdERlcGVuZGVudFF1ZXJ5KGRlcGVuZGVudFZhbHVlLCBmb3JtYXQsIHByb3BlcnR5KSB7XHJcbiAgICBjb25zdCB0aGVQcm9wZXJ0eSA9IHByb3BlcnR5IHx8ICcka2V5JztcclxuXHJcbiAgICByZXR1cm4gc3RyaW5nLnN1YnN0aXR1dGUoZm9ybWF0LCBbdXRpbGl0eS5nZXRWYWx1ZShkZXBlbmRlbnRWYWx1ZSwgdGhlUHJvcGVydHkpXSk7XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICB0aXRsZTogdGhpcy5hY3Rpdml0eUluZm9UZXh0LFxyXG4gICAgICBuYW1lOiAnQWN0aXZpdHlJbmZvU2VjdGlvbicsXHJcbiAgICAgIGNvbGxhcHNlZDogZmFsc2UsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIG5hbWU6ICdUeXBlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1R5cGUnLFxyXG4gICAgICAgIHR5cGU6ICdoaWRkZW4nLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgZGVwZW5kc09uOiAnVHlwZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucmVnYXJkaW5nVGV4dCxcclxuICAgICAgICBuYW1lOiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIHBpY2tsaXN0OiB0aGlzLmZvcm1hdFBpY2tsaXN0Rm9yVHlwZS5iaW5kRGVsZWdhdGUodGhpcywgJ0Rlc2NyaXB0aW9uJyksXHJcbiAgICAgICAgdGl0bGU6IHRoaXMucmVnYXJkaW5nVGl0bGVUZXh0LFxyXG4gICAgICAgIG9yZGVyQnk6ICd0ZXh0IGFzYycsXHJcbiAgICAgICAgdHlwZTogJ3BpY2tsaXN0JyxcclxuICAgICAgICBtYXhUZXh0TGVuZ3RoOiA2NCxcclxuICAgICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmxvbmdOb3Rlc1RleHQsXHJcbiAgICAgICAgbm90ZVByb3BlcnR5OiBmYWxzZSxcclxuICAgICAgICBuYW1lOiAnTG9uZ05vdGVzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0xvbmdOb3RlcycsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMubG9uZ05vdGVzVGl0bGVUZXh0LFxyXG4gICAgICAgIHR5cGU6ICdub3RlJyxcclxuICAgICAgICB2aWV3OiAndGV4dF9lZGl0JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnN0YXJ0aW5nVGV4dCxcclxuICAgICAgICBuYW1lOiAnU3RhcnREYXRlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1N0YXJ0RGF0ZScsXHJcbiAgICAgICAgdHlwZTogJ2RhdGUnLFxyXG4gICAgICAgIHNob3dUaW1lUGlja2VyOiB0cnVlLFxyXG4gICAgICAgIGZvcm1hdFN0cmluZzogKEFwcC5pczI0SG91ckNsb2NrKCkpID8gdGhpcy5zdGFydGluZ0Zvcm1hdFRleHQyNCA6IHRoaXMuc3RhcnRpbmdGb3JtYXRUZXh0LFxyXG4gICAgICAgIG1pblZhbHVlOiAobmV3IERhdGUoMTkwMCwgMCwgMSkpLFxyXG4gICAgICAgIHZhbGlkYXRvcjogW1xyXG4gICAgICAgICAgdmFsaWRhdG9yLmV4aXN0cyxcclxuICAgICAgICAgIHZhbGlkYXRvci5pc0RhdGVJblJhbmdlLFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5kdXJhdGlvblRleHQsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMuZHVyYXRpb25UaXRsZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0R1cmF0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0R1cmF0aW9uJyxcclxuICAgICAgICB0eXBlOiAnZHVyYXRpb24nLFxyXG4gICAgICAgIHZpZXc6ICdzZWxlY3RfbGlzdCcsXHJcbiAgICAgICAgZGF0YTogdGhpcy5jcmVhdGVEdXJhdGlvbkRhdGEoKSxcclxuICAgICAgICB2YWxpZGF0b3I6IHtcclxuICAgICAgICAgIGZuOiBmdW5jdGlvbiB0ZXN0RGlzYWJsZWQodmFsLCBmaWVsZCkge1xyXG4gICAgICAgICAgICBpZiAoZmllbGQuaXNEaXNhYmxlZCgpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghL15cXGQrJC8udGVzdCh2YWwpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBtZXNzYWdlOiB0aGlzLmR1cmF0aW9uSW52YWxpZFRleHQsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnRpbWVsZXNzVGV4dCxcclxuICAgICAgICBuYW1lOiAnVGltZWxlc3MnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnVGltZWxlc3MnLFxyXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcclxuICAgICAgfV0sXHJcbiAgICB9LCB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmNvbXBsZXRpb25UZXh0LFxyXG4gICAgICBuYW1lOiAnQ29tcGxldGlvblNlY3Rpb24nLFxyXG4gICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBsYWJlbDogdGhpcy5hc1NjaGVkdWxlZFRleHQsXHJcbiAgICAgICAgaW5jbHVkZTogZmFsc2UsXHJcbiAgICAgICAgbmFtZTogJ0FzU2NoZWR1bGVkJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0FzU2NoZWR1bGVkJyxcclxuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5jb21wbGV0ZWRUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdDb21wbGV0ZWREYXRlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0NvbXBsZXRlZERhdGUnLFxyXG4gICAgICAgIHR5cGU6ICdkYXRlJyxcclxuICAgICAgICBzaG93VGltZVBpY2tlcjogdHJ1ZSxcclxuICAgICAgICBmb3JtYXRTdHJpbmc6IHRoaXMuY29tcGxldGVkRm9ybWF0VGV4dCxcclxuICAgICAgICBtaW5WYWx1ZTogKG5ldyBEYXRlKDE5MDAsIDAsIDEpKSxcclxuICAgICAgICB2YWxpZGF0b3I6IFtcclxuICAgICAgICAgIHZhbGlkYXRvci5leGlzdHMsXHJcbiAgICAgICAgICB2YWxpZGF0b3IuaXNEYXRlSW5SYW5nZSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgZGVwZW5kc09uOiAnVHlwZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucmVzdWx0VGV4dCxcclxuICAgICAgICBuYW1lOiAnUmVzdWx0JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1Jlc3VsdCcsXHJcbiAgICAgICAgc3RvcmFnZU1vZGU6ICdjb2RlJywgLy8gVGhlIG9uUmVzdWx0Q2hhbmdlIGNoYW5nZXMgdGhlIHZhbHVlIGJhY2sgdG8gdGV4dFxyXG4gICAgICAgIHBpY2tsaXN0OiB0aGlzLmZvcm1hdFBpY2tsaXN0Rm9yVHlwZS5iaW5kRGVsZWdhdGUodGhpcywgJ1Jlc3VsdCcpLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLnJlc3VsdFRpdGxlVGV4dCxcclxuICAgICAgICBvcmRlckJ5OiAndGV4dCBhc2MnLFxyXG4gICAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICAgICAgbWF4VGV4dExlbmd0aDogNjQsXHJcbiAgICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnUmVzdWx0Q29kZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdSZXN1bHRDb2RlJyxcclxuICAgICAgICB0eXBlOiAnaGlkZGVuJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmZvbGxvd1VwVGV4dCxcclxuICAgICAgICB0aXRsZTogdGhpcy5mb2xsb3dVcFRpdGxlVGV4dCxcclxuICAgICAgICBuYW1lOiAnRm9sbG93dXAnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRm9sbG93dXAnLFxyXG4gICAgICAgIHR5cGU6ICdzZWxlY3QnLFxyXG4gICAgICAgIHZpZXc6ICdzZWxlY3RfbGlzdCcsXHJcbiAgICAgICAgdGV4dFJlbmRlcmVyOiB0aGlzLmZvcm1hdEZvbGxvd3VwVGV4dC5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICAgICAgcmVxdWlyZVNlbGVjdGlvbjogdHJ1ZSxcclxuICAgICAgICB2YWx1ZUtleVByb3BlcnR5OiBmYWxzZSxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogZmFsc2UsXHJcbiAgICAgICAgZGF0YTogdGhpcy5jcmVhdGVGb2xsb3d1cERhdGEoKSxcclxuICAgICAgICBpbmNsdWRlOiBmYWxzZSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmNhcnJ5T3Zlck5vdGVzVGV4dCxcclxuICAgICAgICBpbmNsdWRlOiBmYWxzZSxcclxuICAgICAgICBuYW1lOiAnQ2FycnlPdmVyTm90ZXMnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ2FycnlPdmVyTm90ZXMnLFxyXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcclxuICAgICAgfV0sXHJcbiAgICB9LCB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLm90aGVySW5mb1RleHQsXHJcbiAgICAgIG5hbWU6ICdPdGhlckluZm9TZWN0aW9uJyxcclxuICAgICAgY29sbGFwc2VkOiBmYWxzZSxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMucHJpb3JpdHlUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdQcmlvcml0eScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdQcmlvcml0eScsXHJcbiAgICAgICAgcGlja2xpc3Q6ICdQcmlvcml0aWVzJyxcclxuICAgICAgICB0aXRsZTogdGhpcy5wcmlvcml0eVRpdGxlVGV4dCxcclxuICAgICAgICB0eXBlOiAncGlja2xpc3QnLFxyXG4gICAgICAgIG1heFRleHRMZW5ndGg6IDY0LFxyXG4gICAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4Y2VlZHNNYXhUZXh0TGVuZ3RoLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgZGVwZW5kc09uOiAnVHlwZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuY2F0ZWdvcnlUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdDYXRlZ29yeScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDYXRlZ29yeScsXHJcbiAgICAgICAgcGlja2xpc3Q6IHRoaXMuZm9ybWF0UGlja2xpc3RGb3JUeXBlLmJpbmREZWxlZ2F0ZSh0aGlzLCAnQ2F0ZWdvcnknKSxcclxuICAgICAgICBvcmRlckJ5OiAndGV4dCBhc2MnLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLmNhdGVnb3J5VGl0bGVUZXh0LFxyXG4gICAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICAgICAgbWF4VGV4dExlbmd0aDogNjQsXHJcbiAgICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICB0eXBlOiAnaGlkZGVuJyxcclxuICAgICAgICBuYW1lOiAnVXNlcklkJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1VzZXJJZCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5sZWFkZXJUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdMZWFkZXInLFxyXG4gICAgICAgIHByb3BlcnR5OiAnTGVhZGVyJyxcclxuICAgICAgICBpbmNsdWRlOiBmYWxzZSxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICB0ZXh0UHJvcGVydHk6ICdVc2VySW5mbycsXHJcbiAgICAgICAgdGV4dFRlbXBsYXRlOiB0ZW1wbGF0ZS5uYW1lTEYsXHJcbiAgICAgICAgcmVxdWlyZVNlbGVjdGlvbjogdHJ1ZSxcclxuICAgICAgICB2aWV3OiAndXNlcl9saXN0JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFjY291bnRUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdBY2NvdW50JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0FjY291bnQnLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgICAgYXBwbHlUbzogJy4nLFxyXG4gICAgICAgIHZhbHVlS2V5UHJvcGVydHk6ICdBY2NvdW50SWQnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIHZpZXc6ICdhY2NvdW50X3JlbGF0ZWQnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgZGVwZW5kc09uOiAnQWNjb3VudCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuY29udGFjdFRleHQsXHJcbiAgICAgICAgbmFtZTogJ0NvbnRhY3QnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ29udGFjdCcsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICBhcHBseVRvOiAnLicsXHJcbiAgICAgICAgdmFsdWVLZXlQcm9wZXJ0eTogJ0NvbnRhY3RJZCcsXHJcbiAgICAgICAgdmFsdWVUZXh0UHJvcGVydHk6ICdDb250YWN0TmFtZScsXHJcbiAgICAgICAgdmlldzogJ2NvbnRhY3RfcmVsYXRlZCcsXHJcbiAgICAgICAgd2hlcmU6IHRoaXMuZm9ybWF0RGVwZW5kZW50UXVlcnkuYmluZERlbGVnYXRlKHRoaXMsICdBY2NvdW50LklkIGVxIFwiJHswfVwiJywgJ0FjY291bnRJZCcpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgZGVwZW5kc09uOiAnQWNjb3VudCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMub3Bwb3J0dW5pdHlUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdPcHBvcnR1bml0eScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdPcHBvcnR1bml0eScsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICBhcHBseVRvOiAnLicsXHJcbiAgICAgICAgdmFsdWVLZXlQcm9wZXJ0eTogJ09wcG9ydHVuaXR5SWQnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnT3Bwb3J0dW5pdHlOYW1lJyxcclxuICAgICAgICB2aWV3OiAnb3Bwb3J0dW5pdHlfcmVsYXRlZCcsXHJcbiAgICAgICAgd2hlcmU6IHRoaXMuZm9ybWF0RGVwZW5kZW50UXVlcnkuYmluZERlbGVnYXRlKHRoaXMsICdBY2NvdW50LklkIGVxIFwiJHswfVwiJywgJ0FjY291bnRJZCcpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgZGVwZW5kc09uOiAnQWNjb3VudCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMudGlja2V0TnVtYmVyVGV4dCxcclxuICAgICAgICBuYW1lOiAnVGlja2V0JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1RpY2tldCcsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICBhcHBseVRvOiAnLicsXHJcbiAgICAgICAgdmFsdWVLZXlQcm9wZXJ0eTogJ1RpY2tldElkJyxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ1RpY2tldE51bWJlcicsXHJcbiAgICAgICAgdmlldzogJ3RpY2tldF9yZWxhdGVkJyxcclxuICAgICAgICB3aGVyZTogdGhpcy5mb3JtYXREZXBlbmRlbnRRdWVyeS5iaW5kRGVsZWdhdGUodGhpcywgJ0FjY291bnQuSWQgZXEgXCIkezB9XCInLCAnQWNjb3VudElkJyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5sZWFkVGV4dCxcclxuICAgICAgICBuYW1lOiAnTGVhZCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdMZWFkJyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIGFwcGx5VG86ICcuJyxcclxuICAgICAgICB2YWx1ZUtleVByb3BlcnR5OiAnTGVhZElkJyxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ0xlYWROYW1lJyxcclxuICAgICAgICB2aWV3OiAnbGVhZF9yZWxhdGVkJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmNvbXBhbnlUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdBY2NvdW50TmFtZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdBY2NvdW50TmFtZScsXHJcbiAgICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICB9XSxcclxuICAgIH1dKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==