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

import declare from 'dojo/_base/declare';
import connect from 'dojo/_base/connect';
import string from 'dojo/string';
import environment from '../../Environment';
import validator from '../../Validator';
import template from '../../Template';
import utility from 'argos/Utility';
import Edit from 'argos/Edit';
import MODEL_NAMES from '../../Models/Names';
import MODEL_TYPES from 'argos/Models/Types';
import getResource from 'argos/I18n';


const resource = getResource('activityComplete');
const dtFormatResource = getResource('activityCompleteDateTimeFormat');

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
const __class = declare('crm.Views.Activity.Complete', [Edit], {
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
    120: resource.twoHoursText,
  },
  followupValueText: {
    none: resource.nonePropText,
    atPhoneCall: resource.phoneCallText,
    atAppointment: resource.meetingText,
    atToDo: resource.toDoText,
    atPersonal: resource.personalText,
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
      Result: 'Meeting Result Codes',
    },
    atLiterature: {
      Description: 'Lit Request Regarding',
    },
    atPersonal: {
      Category: 'Meeting Category Codes',
      Description: 'Personal Activity Regarding',
      Result: 'Personal Activity Result Codes',
    },
    atPhoneCall: {
      Category: 'Phone Call Category Codes',
      Description: 'Phone Call Regarding',
      Result: 'Phone Call Result Codes',
    },
    atToDo: {
      Category: 'To Do Category Codes',
      Description: 'To Do Regarding',
      Result: 'To Do Result Codes',
    },
    atEMail: {
      Category: 'E-mail Category Codes',
      Description: 'E-mail Regarding',
    },
  },

  entityName: 'Activity',
  querySelect: [
    'AccountId',
    'AccountName',
    'Alarm',
    'AlarmTime',
    'Category',
    'ContactId',
    'ContactName',
    'CompletedDate',
    'Description',
    'Duration',
    'Leader/$key',
    'LeadId',
    'LeadName',
    'LongNotes',
    'OpportunityId',
    'OpportunityName',
    'Priority',
    'Regarding',
    'Result',
    'Rollover',
    'StartDate',
    'TicketId',
    'TicketNumber',
    'Timeless',
    'Type',
    'Recurring',
    'RecurrenceState',
    'AllowAdd',
    'AllowEdit',
    'AllowDelete',
    'AllowComplete',
  ],
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
    this.fields.ResultCode.setValue((/.{0,8}/ig)
      .exec(value.key));
  },
  isActivityForLead: function isActivityForLead(entry) {
    return entry && /^[\w]{12}$/.test(entry.LeadId);
  },
  beforeTransitionTo: function beforeTransitionTo() {
    this.inherited(arguments);

    this.fieldsForStandard.concat(this.fieldsForLeads).forEach(function hideFields(item) {
      if (this.fields[item]) {
        this.fields[item].hide();
      }
    }, this);

    const entry = this.options && this.options.entry;
    if (this.isActivityForLead(entry)) {
      this.fieldsForLeads.forEach((item) => {
        if (this.fields[item]) {
          this.fields[item].show();
        }
      }, this);
    } else {
      this.fieldsForStandard.forEach((item) => {
        if (this.fields[item]) {
          this.fields[item].show();
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

    const startDateField = this.fields.StartDate;
    let startDate = startDateField.getValue();

    if (value) {
      startDateField.dateFormatText = this.startingTimelessFormatText;
      startDateField.showTimePicker = false;
      startDateField.timeless = true;
      if (!this.isDateTimeless(startDate) && startDate.clone) {
        startDate = startDate.clone().clearTime().add({
          minutes: -1 * startDate.getTimezoneOffset(),
          seconds: 5,
        });
      }
      startDateField.setValue(startDate);
    } else {
      startDateField.dateFormatText = (App.is24HourClock()) ? this.startingFormatText24 : this.startingFormatText;
      startDateField.showTimePicker = true;
      startDateField.timeless = false;
      if (this.isDateTimeless(startDate)) {
        startDate = startDate.clone()
          .add({
            minutes: startDate.getTimezoneOffset() + 1,
            seconds: -5,
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
        minutes: duration,
      })
        .toDate();

      this.toggleSelectField(this.fields.CompletedDate, true);
      this.fields.CompletedDate.setValue(completedDate);
    } else {
      this.toggleSelectField(this.fields.CompletedDate, false);
      this.fields.CompletedDate.setValue(new Date());
    }
  },
  onFollowupChange: function onFollowupChange(value) {
    const disable = (value === 'none' || (value && value.key === 'none'));
    this.toggleSelectField(this.fields.CarryOverNotes, disable);
  },
  onLeadChange: function onLeadChange(value, field) {
    const selection = field.getSelection();

    if (selection && this.insert) {
      this.fields.Company.setValue(utility.getValue(selection, 'Company'));
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
    const userId = field.getValue();
    this.fields.UserId.setValue(userId && userId.$key);
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
          $descriptor: this.durationValueText[duration],
        });
      }
    }

    return {
      $resources: list,
    };
  },
  createFollowupData: function createFollowupData() {
    const list = [];

    for (const followup in this.followupValueText) {
      if (this.followupValueText.hasOwnProperty(followup)) {
        list.push({
          $key: followup,
          $descriptor: this.followupValueText[followup],
        });
      }
    }

    return {
      $resources: list,
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
      LongNotes: (this.fields.CarryOverNotes.getValue() && entry.LongNotes) || '',
      OpportunityId: entry.OpportunityId,
      OpportunityName: entry.OpportunityName,
      StartDate: moment()
        .toDate(),
      TicketId: entry.TicketId,
      TicketNumber: entry.TicketNumber,
    };

    // Return to activity list view after follow up.
    view.show({
      entry: followupEntry,
      insert: true,
      title: this.followupValueText[this.fields.Followup.getValue()],
    }, {
      returnTo: -1,
    });
  },
  completeActivity: function completeActivity(entry, callback) {
    const activityModel = App.ModelManager.getModel(MODEL_NAMES.ACTIVITY, MODEL_TYPES.SDATA);
    entry.Leader = this.fields.Leader.getValue();
    entry.Result = this.fields.Result.getValue();
    entry.ResultCode = this.fields.ResultCode.getValue();
    entry.CompletedDate = this.fields.CompletedDate.getValue();

    const success = (function refreshStale(scope, theCallback, theEntry) {
      return function refreshStaleViews() {
        environment.refreshStaleDetailViews();
        connect.publish('/app/refresh', [{
          resourceKind: 'history',
        }]);

        theCallback.apply(scope, [theEntry]);
      };
    })(this, callback, entry);

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

    const followup = this.fields.Followup.getValue() === 'none' ? this.getInherited(arguments) : this.navigateToFollowUpView;
    entry.$completedBasedOn = this._completedBasedOn;
    this.completeActivity(entry, followup);
  },
  formatDependentQuery: function formatDependentQuery(dependentValue, format, property) {
    const theProperty = property || '$key';

    return string.substitute(format, [utility.getValue(dependentValue, theProperty)]);
  },
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: this.activityInfoText,
      name: 'ActivityInfoSection',
      collapsed: false,
      children: [{
        name: 'Type',
        property: 'Type',
        type: 'hidden',
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
        validator: validator.exceedsMaxTextLength,
      }, {
        label: this.longNotesText,
        noteProperty: false,
        name: 'LongNotes',
        property: 'LongNotes',
        title: this.longNotesTitleText,
        type: 'note',
        view: 'text_edit',
      }, {
        label: this.startingText,
        name: 'StartDate',
        property: 'StartDate',
        type: 'date',
        showTimePicker: true,
        formatString: (App.is24HourClock()) ? this.startingFormatText24 : this.startingFormatText,
        minValue: (new Date(1900, 0, 1)),
        validator: [
          validator.exists,
          validator.isDateInRange,
        ],
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
          message: this.durationInvalidText,
        },
      }, {
        label: this.timelessText,
        name: 'Timeless',
        property: 'Timeless',
        type: 'boolean',
      }],
    }, {
      title: this.completionText,
      name: 'CompletionSection',
      collapsed: false,
      children: [{
        label: this.asScheduledText,
        include: false,
        name: 'AsScheduled',
        property: 'AsScheduled',
        type: 'boolean',
      }, {
        label: this.completedText,
        name: 'CompletedDate',
        property: 'CompletedDate',
        type: 'date',
        showTimePicker: true,
        formatString: this.completedFormatText,
        minValue: (new Date(1900, 0, 1)),
        validator: [
          validator.exists,
          validator.isDateInRange,
        ],
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
        validator: validator.exceedsMaxTextLength,
      }, {
        name: 'ResultCode',
        property: 'ResultCode',
        type: 'hidden',
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
        include: false,
      }, {
        label: this.carryOverNotesText,
        include: false,
        name: 'CarryOverNotes',
        property: 'CarryOverNotes',
        type: 'boolean',
      }],
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
        validator: validator.exceedsMaxTextLength,
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
        validator: validator.exceedsMaxTextLength,
      }, {
        type: 'hidden',
        name: 'UserId',
        property: 'UserId',
      }, {
        label: this.leaderText,
        name: 'Leader',
        property: 'Leader',
        include: false,
        type: 'lookup',
        textProperty: 'UserInfo',
        textTemplate: template.nameLF,
        requireSelection: true,
        view: 'user_list',
      }, {
        label: this.accountText,
        name: 'Account',
        property: 'Account',
        type: 'lookup',
        emptyText: '',
        applyTo: '.',
        valueKeyProperty: 'AccountId',
        valueTextProperty: 'AccountName',
        view: 'account_related',
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
        where: this.formatDependentQuery.bindDelegate(this, 'Account.Id eq "${0}"', 'AccountId'),
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
        where: this.formatDependentQuery.bindDelegate(this, 'Account.Id eq "${0}"', 'AccountId'),
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
        where: this.formatDependentQuery.bindDelegate(this, 'Account.Id eq "${0}"', 'AccountId'),
      }, {
        label: this.leadText,
        name: 'Lead',
        property: 'Lead',
        type: 'lookup',
        emptyText: '',
        applyTo: '.',
        valueKeyProperty: 'LeadId',
        valueTextProperty: 'LeadName',
        view: 'lead_related',
      }, {
        label: this.companyText,
        name: 'AccountName',
        property: 'AccountName',
        type: 'text',
      }],
    }]);
  },
});

export default __class;
