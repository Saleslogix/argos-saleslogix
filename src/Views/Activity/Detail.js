import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import platformUtility from 'argos/Utility';
import convert from 'argos/Convert';
import Detail from 'argos/Detail';
import template from '../../Template';
import format from '../../Format';
import environment from '../../Environment';
import recur from '../../Recurrence';
import ActivityModel from '../../Models/Activity';
import utility from '../../Utility';

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
  activityTypeText: {
    'atToDo': 'To-Do',
    'atPhoneCall': 'Phone Call',
    'atAppointment': 'Meeting',
    'atLiterature': 'Literature Request',
    'atPersonal': 'Personal Activity',
  },
  actionsText: 'Quick Actions',
  completeActivityText: 'Complete Activity',
  completeOccurrenceText: 'Complete Occurrence',
  completeSeriesText: 'Complete Series',
  locationText: 'location',
  alarmText: 'alarm',
  alarmTimeText: 'alarm',
  categoryText: 'category',
  durationText: 'duration',
  leaderText: 'leader',
  longNotesText: 'notes',
  priorityText: 'priority',
  regardingText: 'regarding',
  rolloverText: 'auto rollover',
  startTimeText: 'start time',
  allDayText: 'all day',
  timelessText: 'timeless',
  titleText: 'Activity',
  typeText: 'type',
  companyText: 'company',
  leadText: 'lead',
  accountText: 'account',
  contactText: 'contact',
  opportunityText: 'opportunity',
  ticketNumberText: 'ticket',
  whenText: 'When',
  whoText: 'Who',
  startDateFormatText: 'M/D/YYYY h:mm:ss A',
  timelessDateFormatText: 'M/D/YYYY',
  alarmDateFormatText: 'M/D/YYYY h:mm:ss A',
  recurrenceText: 'recurrence',
  confirmEditRecurrenceText: 'Edit all Occurrences? Cancel to edit single Occurrence.',
  relatedAttachmentText: 'Attachments',
  relatedAttachmentTitleText: 'Activity Attachments',
  relatedItemsText: 'Related Items',
  phoneText: 'phone',
  moreDetailsText: 'More Details',
  entityText: 'Activity',

  // View Properties
  id: 'activity_detail',
  completeView: 'activity_complete',
  editView: 'activity_edit',
  security: null, // 'Entities/Activity/View',
  enableOffline: true,
  getModel: function getModel() {
    const model = new ActivityModel();
    return model;
  },
  recurringActivityIdSeparator: ';',

  formatActivityType: function formatActivityType(val) {
    return this.activityTypeText[val] || val;
  },
  navigateToEditView: function navigateToEditView() {
    const view = App.getView(this.editView);

    if (view) {
      if (this.isActivityRecurringSeries(this.entry) && confirm(this.confirmEditRecurrenceText)) { // eslint-disable-line
        this.entry.recurrence.Leader = this.entry.Leader;
        view.show({
          entry: this.entry.recurrence,
        });
      } else {
        view.show({
          entry: this.entry,
        });
      }
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
    if (this.isActivityRecurring(entry) && key.split(this.recurringActivityIdSeparator).length !== 2) {
      // Fetch the occurance, and continue on to the complete screen
      const request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService())
        .setResourceKind('activities')
        .setContractName('system')
        .setQueryArg('where', "id eq '" + key + "'")
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
        iconClass: 'fa fa-check-square fa-lg',
        action: 'completeActivity',
        disabled: this.checkCanComplete.bind(this),
        exclude: this.isActivityRecurringSeries.bind(this),
      }, {
        name: 'completeOccurrenceAction',
        property: 'StartDate',
        label: this.completeOccurrenceText,
        iconClass: 'fa fa-check-square fa-lg',
        action: 'completeOccurrence',
        disabled: this.checkCanComplete.bind(this),
        renderer: format.date.bindDelegate(this, this.startDateFormatText, false),
        include: this.isActivityRecurringSeries.bind(this),
      }, {
        name: 'completeSeriesAction',
        property: 'Description',
        label: this.completeSeriesText,
        iconClass: 'fa fa-check-square fa-lg',
        action: 'completeSeries',
        disabled: this.checkCanComplete.bind(this),
        include: this.isActivityRecurringSeries.bind(this),
      }],
    }, {
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        name: 'Type',
        property: 'Type',
        label: this.typeText,
        renderer: this.formatActivityType.bindDelegate(this),
      }, {
        name: 'Description',
        property: 'Description',
        label: this.regardingText,
      }, {
        name: 'PhoneNumber',
        property: 'PhoneNumber',
        label: this.phoneText,
        renderer: format.phone.bindDelegate(this, false),
      }, {
        name: 'LongNotes',
        property: 'LongNotes',
        label: this.longNotesText,
      }],
    }, {
      title: this.whenText,
      name: 'WhenSection',
      children: [{
        name: 'StartDate',
        property: 'StartDate',
        label: this.startTimeText,
        renderer: format.date.bindDelegate(this, this.startDateFormatText, false),
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
        renderer: format.date.bindDelegate(this, this.alarmDateFormatText, null, true),
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
      title: this.whoText,
      name: 'WhoSection',
      children: [{
        name: 'Leader',
        property: 'Leader.UserInfo',
        label: this.leaderText,
        template: template.nameLF,
      }, {
        name: 'ContactName',
        property: 'ContactName',
        exclude: this.isActivityForLead.bind(this),
        label: this.contactText,
        view: 'contact_detail',
        key: 'ContactId',
        descriptor: 'ContactName',
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
      }],
    }, {
      title: this.moreDetailsText,
      name: 'MoreDetailsSection',
      collapsed: true,
      children: [{
        name: 'Category',
        property: 'Category',
        label: this.categoryText,
      }, {
        name: 'Location',
        property: 'Location',
        label: this.locationText,
      }, {
        name: 'Priority',
        property: 'Priority',
        label: this.priorityText,
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
});

lang.setObject('Mobile.SalesLogix.Views.Activity.Detail', __class);
export default __class;
