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
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import platformUtility from 'argos/Utility';
import convert from 'argos/Convert';
import Detail from 'argos/Detail';
import getResource from 'argos/I18n';
import Deferred from 'dojo/Deferred';
import template from '../../Template';
import format from '../../Format';
import environment from '../../Environment';
import recur from '../../Recurrence';
import utility from '../../Utility';
import MODEL_NAMES from '../../Models/Names';
import { getPicklistByActivityType } from '../../Models/Activity/ActivityTypePicklists';

const resource = getResource('activityDetail');
const dtFormatResource = getResource('activityDetailDateTimeFormat');

/**
 * @class crm.Views.Activity.Detail
 *
 *
 * @extends argos.Detail
 * @mixins argos.Detail
 *
 * @requires argos.Detail
 * @requires argos.Utility
 * @requires argos.Convert
 * @requires crm.Format
 * @requires crm.Template
 * @requires crm.Environment
 * @requires crm.Recurrence
 * @requires crm.Utility
 *
 */
const __class = declare('crm.Views.Activity.Detail', [Detail], {
  // Localization
  actionsText: resource.actionsText,
  completeActivityText: resource.completeActivityText,
  completeOccurrenceText: resource.completeOccurrenceText,
  completeSeriesText: resource.completeSeriesText,
  locationText: resource.locationText,
  alarmText: resource.alarmText,
  alarmTimeText: resource.alarmTimeText,
  categoryText: resource.categoryText,
  durationText: resource.durationText,
  leaderText: resource.leaderText,
  longNotesText: resource.longNotesText,
  priorityText: resource.priorityText,
  regardingText: resource.regardingText,
  rolloverText: resource.rolloverText,
  startTimeText: resource.startTimeText,
  allDayText: resource.allDayText,
  timelessText: resource.timelessText,
  titleText: resource.titleText,
  typeText: resource.typeText,
  companyText: resource.companyText,
  leadText: resource.leadText,
  accountText: resource.accountText,
  contactText: resource.contactText,
  opportunityText: resource.opportunityText,
  ticketNumberText: resource.ticketNumberText,
  startDateFormatText: dtFormatResource.startDateFormatText,
  startDateFormatText24: dtFormatResource.startDateFormatText24,
  timelessDateFormatText: dtFormatResource.timelessDateFormatText,
  alarmDateFormatText: dtFormatResource.alarmDateFormatText,
  alarmDateFormatText24: dtFormatResource.alarmDateFormatText24,
  recurrenceText: resource.recurrenceText,
  confirmEditRecurrenceText: resource.confirmEditRecurrenceText,
  relatedAttachmentText: resource.relatedAttachmentText,
  relatedAttachmentTitleText: resource.relatedAttachmentTitleText,
  relatedItemsText: resource.relatedItemsText,
  phoneText: resource.phoneText,
  entityText: resource.entityText,
  activityTypeText: {
    atToDo: resource.toDoText,
    atPhoneCall: resource.phoneCallText,
    atAppointment: resource.meetingText,
    atLiterature: resource.literatureText,
    atPersonal: resource.personalText,
  },

  // View Properties
  id: 'activity_detail',
  completeView: 'activity_complete',
  editView: 'activity_edit',
  security: null, // 'Entities/Activity/View',
  enableOffline: true,
  resourceKind: 'activities',
  modelName: MODEL_NAMES.ACTIVITY,
  recurringActivityIdSeparator: ';',

  formatActivityType: function formatActivityType(val) {
    return this.activityTypeText[val] || val;
  },
  navigateToEditView: function navigateToEditView() {
    if (!this.isActivityRecurringSeries(this.entry)) {
      // normal activity
      this.onEditActivity(this.entry);
    } else {
      if (confirm(this.confirmEditRecurrenceText)) { // eslint-disable-line
       // edit series
        this.entry.recurrence.Leader = this.entry.Leader;
        this.onEditActivity(this.entry.recurrence);
      } else {
        // complete the occrence
        if (this.entry.RecurrenceState === 'rstOccurrence') {
          this.onEditActivity(this.entry);
        } else {
          // we need to resolve occurance
          this.getOccurance(this.entry).then(
            (occurance) => {
              if (occurance) {
                if (this.entry.Leader) {
                  occurance.Leader = this.entry.Leader;
                }
                this.onEditActivity(occurance);
              }
            });
        }
      }
    }
  },
  getOccurance: function getOccurance(entry) {
    const def = new Deferred();
    const key = entry.$key;
    // Check to ensure we have a composite key (meaning we have the occurance, not the master)
    if (this.isActivityRecurring(entry) && key.split(this.recurringActivityIdSeparator)
      .length !== 2) {
      // Fetch the occurance, and continue on to the complete screen
      const request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService())
        .setResourceKind('activities')
        .setContractName('system')
        .setQueryArg('where', `id eq '${key}'`)
        .setCount(1);

      request.read({
        success: function success(feed) {
          if (feed && feed.$resources && feed.$resources.length > 0) {
            def.resolve(feed.$resources[0]);
          }
          def.reject();
        },
        scope: this,
      });
    } else {
      def.reject();
    }
    return def.promise;
  },
  onEditActivity: function onEditActivity(entry) {
    const view = App.getView(this.editView);
    if (view) {
      view.show({
        entry,
      });
    }
  },
  navigateToCompleteView: function navigateToCompleteView(completionTitle, isSeries) {
    const view = App.getView(this.completeView);

    if (view) {
      environment.refreshActivityLists();
      const options = {
        title: completionTitle,
        template: {},
      };

      if (isSeries) {
        this.entry.recurrence.Leader = this.entry.Leader;
        options.entry = this.entry.recurrence;
      } else {
        options.entry = this.entry;
      }

      view.show(options, {
        returnTo: -1,
      });
    }
  },
  completeActivity: function completeActivity() {
    this.navigateToCompleteView(this.completeActivityText);
  },
  completeOccurrence: function completeOccurrence() {
    const entry = this.entry;
    const key = entry.$key;

    // Check to ensure we have a composite key (meaning we have the occurance, not the master)
    if (this.isActivityRecurring(entry) && key.split(this.recurringActivityIdSeparator)
      .length !== 2) {
      // Fetch the occurance, and continue on to the complete screen
      const request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService())
        .setResourceKind('activities')
        .setContractName('system')
        .setQueryArg('where', `id eq '${key}'`)
        .setCount(1);

      request.read({
        success: this.processOccurance,
        scope: this,
      });
    } else {
      this.navigateToCompleteView(this.completeOccurrenceText);
    }
  },
  processOccurance: function processOccurance(feed) {
    if (feed && feed.$resources && feed.$resources.length > 0) {
      if (this.entry.Leader) {
        feed.$resources[0].Leader = this.entry.Leader;
      }
      this.entry = feed.$resources[0];
      this.navigateToCompleteView(this.completeOccurrenceText);
    }
  },
  completeSeries: function completeSeries() {
    this.navigateToCompleteView(this.completeSeriesText, true);
  },
  isActivityRecurring: function isActivityRecurring(entry) {
    return entry && (entry.Recurring || entry.RecurrenceState === 'rstOccurrence');
  },
  isActivityRecurringSeries: function isActivityRecurringSeries(entry) {
    return this.isActivityRecurring(entry) && !recur.isAfterCompletion(entry.RecurPeriod);
  },
  isActivityForLead: function isActivityForLead(entry) {
    return entry && /^[\w]{12}$/.test(entry.LeadId);
  },
  isActivityTimeless: function isActivityTimeless(entry) {
    return entry && convert.toBoolean(entry.Timeless);
  },
  doesActivityHaveReminder: function doesActivityHaveReminder(entry) {
    return convert.toBoolean(entry && entry.Alarm);
  },
  checkCanComplete: function checkCanComplete(entry) {
    return !(entry && (entry.AllowComplete));
  },
  formatPicklist: function formatPicklist(property) {
    return format.picklist(this.app.picklistService, this._model, property);
  },
  formatRelatedQuery: function formatRelatedQuery(entry, fmt, property) {
    let toReturn;
    if (property === 'activityId') {
      toReturn = string.substitute(fmt, [utility.getRealActivityId(entry.$key)]);
    } else {
      const theProperty = property || '$key';
      toReturn = string.substitute(fmt, [platformUtility.getValue(entry, theProperty, '')]);
    }
    return toReturn;
  },
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      list: true,
      title: this.actionsText,
      cls: 'action-list',
      name: 'QuickActionsSection',
      children: [{
        name: 'CompleteActivityAction',
        property: 'Description',
        label: this.completeActivityText,
        iconClass: 'checkbox',
        action: 'completeActivity',
        disabled: this.checkCanComplete.bind(this),
        exclude: this.isActivityRecurringSeries.bind(this),
        renderer: function renderer(value) {
          // INFORCRM-17347: The property binding for Description is not used.
          // However, if it is null/empty it will cause the action to hide.
          // We will work around this by returning a truthy string.
          if (!value) {
            return ' ';
          }

          return value;
        },
      }, {
        name: 'completeOccurrenceAction',
        property: 'StartDate',
        label: this.completeOccurrenceText,
        iconClass: 'checkbox',
        action: 'completeOccurrence',
        disabled: this.checkCanComplete.bind(this),
        renderer: format.date.bindDelegate(this, (App.is24HourClock()) ? this.startDateFormatText24 : this.startDateFormatText, false),
        include: this.isActivityRecurringSeries.bind(this),
      }, {
        name: 'completeSeriesAction',
        property: 'Description',
        label: this.completeSeriesText,
        iconClass: 'checkbox',
        action: 'completeSeries',
        disabled: this.checkCanComplete.bind(this),
        include: this.isActivityRecurringSeries.bind(this),
      }],
    }, {
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        name: 'Description',
        property: 'Description',
        label: this.regardingText,
        renderer: format.picklist(this.app.picklistService, null, null, getPicklistByActivityType(this.entry.Type, 'Description')),
      }, {
        name: 'LongNotes',
        property: 'LongNotes',
        label: this.longNotesText,
      }, {
        name: 'ContactName',
        property: 'ContactName',
        exclude: this.isActivityForLead.bind(this),
        label: this.contactText,
        view: 'contact_detail',
        key: 'ContactId',
        descriptor: 'ContactName',
      }, {
        name: 'PhoneNumber',
        property: 'PhoneNumber',
        label: this.phoneText,
        renderer: format.phone.bindDelegate(this, true),
      }, {
        name: 'Type',
        property: 'Type',
        label: this.typeText,
        renderer: this.formatActivityType.bindDelegate(this),
      }, {
        name: 'Category',
        property: 'Category',
        label: this.categoryText,
        renderer: format.picklist(this.app.picklistService, null, null, getPicklistByActivityType(this.entry.Type, 'Category')),
      }, {
        name: 'Location',
        property: 'Location',
        label: this.locationText,
      }, {
        name: 'Priority',
        property: 'Priority',
        label: this.priorityText,
        renderer: this.formatPicklist('Priority'),
      }, {
        name: 'Leader',
        property: 'Leader.UserInfo',
        label: this.leaderText,
        template: template.nameLF,
      }, {
        name: 'AccountName',
        property: 'AccountName',
        exclude: this.isActivityForLead.bind(this),
        label: this.accountText,
        view: 'account_detail',
        key: 'AccountId',
        descriptor: 'AccountName',
      }, {
        name: 'OpportunityName',
        property: 'OpportunityName',
        exclude: this.isActivityForLead.bind(this),
        label: this.opportunityText,
        view: 'opportunity_detail',
        key: 'OpportunityId',
        descriptor: 'OpportunityName',
      }, {
        name: 'TicketNumber',
        property: 'TicketNumber',
        exclude: this.isActivityForLead.bind(this),
        label: this.ticketNumberText,
        view: 'ticket_detail',
        key: 'TicketId',
        descriptor: 'TicketNumber',
      }, {
        name: 'LeadName',
        property: 'LeadName',
        include: this.isActivityForLead.bind(this),
        label: this.leadText,
        view: 'lead_detail',
        key: 'LeadId',
        descriptor: 'LeadName',
      }, {
        name: 'AccountName',
        property: 'AccountName',
        include: this.isActivityForLead.bind(this),
        label: this.companyText,
      }, {
        name: 'StartDate',
        property: 'StartDate',
        label: this.startTimeText,
        renderer: format.date.bindDelegate(this, (App.is24HourClock()) ? this.startDateFormatText24 : this.startDateFormatText, false),
        exclude: this.isActivityTimeless.bind(this),
      }, {
        name: 'StartDateTimeless',
        property: 'StartDate',
        label: this.allDayText,
        renderer: format.date.bindDelegate(this, this.timelessDateFormatText, true),
        include: this.isActivityTimeless.bind(this),
      }, {
        name: 'Timeless',
        property: 'Timeless',
        label: this.timelessText,
        type: 'boolean',
        include: false,
      }, {
        name: 'Duration',
        property: 'Duration',
        label: this.durationText,
        renderer: format.timespan,
        exclude: this.isActivityTimeless.bind(this),
      }, {
        name: 'Alarm',
        property: 'Alarm',
        label: this.alarmText,
        renderer: format.yesNo,
        exclude: this.doesActivityHaveReminder.bind(this),
      }, {
        name: 'AlarmTime',
        property: 'AlarmTime',
        label: this.alarmTimeText,
        renderer: format.date.bindDelegate(this, (App.is24HourClock()) ? this.alarmDateFormatText24 : this.alarmDateFormatText, null, true),
        include: this.doesActivityHaveReminder.bind(this),
      }, {
        name: 'Rollover',
        property: 'Rollover',
        label: this.rolloverText,
        include: this.isActivityTimeless.bind(this),
        renderer: format.yesNo,
      }, {
        name: 'RecurrenceUI',
        property: 'recurrence',
        label: this.recurrenceText,
        include: this.isActivityRecurring.bind(this),
        renderer: function renderRecurrence(value) {
          return recur.toString(value);
        },
      }],
    }, {
      title: this.relatedItemsText,
      list: true,
      name: 'RelatedItemsSection',
      children: [{
        name: 'AttachmentRelated',
        label: this.relatedAttachmentText,
        where: this.formatRelatedQuery.bindDelegate(this, 'activityId eq "${0}"', 'activityId'), // must be lower case because of feed
        view: 'activity_attachment_related',
        title: this.relatedAttachmentTitleText,
      }],
    }]);
  },
  getOfflineIcon: function getOfflineIcon() {
    const model = this.getModel();
    return model.getIconClass(this.entry);
  },
});

lang.setObject('Mobile.SalesLogix.Views.Activity.Detail', __class);
export default __class;
