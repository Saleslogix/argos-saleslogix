import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import query from 'dojo/query';
import domClass from 'dojo/dom-class';
import template from '../../Template';
import format from '../../Format';
import environment from '../../Environment';
import convert from 'argos/Convert';
import Detail from 'argos/Detail';
import recur from '../../Recurrence';
import utility from '../../Utility';
import platformUtility from 'argos/Utility';

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
  // Templates
  leaderTemplate: template.nameLF,

  // Localization
  localeId: 'activityDetail',
  activityTypeText: {
  },
  activityTypeKeys: [
    'atLiterature',
    'atPhoneCall',
    'atAppointment',
    'atToDo',
    'atPersonal',
  ],
  activityTypeValues: null,

  // View Properties
  id: 'activity_detail',
  completeView: 'activity_complete',
  editView: 'activity_edit',
  security: null, // 'Entities/Activity/View',
  contractName: 'system',
  querySelect: [
    'AccountId',
    'AccountName',
    'Alarm',
    'AlarmTime',
    'Category',
    'Company',
    'ContactId',
    'ContactName',
    'Description',
    'Duration',
    'Leader/$key',
    'LeadId',
    'LeadName',
    'Location',
    'LongNotes',
    'OpportunityId',
    'OpportunityName',
    'PhoneNumber',
    'Priority',
    'Rollover',
    'StartDate',
    'EndDate',
    'TicketId',
    'TicketNumber',
    'Timeless',
    'Type',
    'Recurring',
    'RecurPeriod',
    'RecurPeriodSpec',
    'RecurIterations',
    'RecurrenceState',
    'AllowAdd',
    'AllowEdit',
    'AllowDelete',
    'AllowComplete',

  ],
  resourceKind: 'activities',
  recurringActivityIdSeparator: ';',
  recurrence: {},

  formatActivityType: function formatActivityType(val) {
    return this.activityTypeText[val] || val;
  },
  navigateToEditView: function navigateToEditView() {
    const view = App.getView(this.editView);

    if (view) {
      if (this.isActivityRecurringSeries(this.entry) && confirm(this.confirmEditRecurrenceText)) { // eslint-disable-line
        this.recurrence.Leader = this.entry.Leader;
        view.show({
          entry: this.recurrence,
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
        this.recurrence.Leader = this.entry.Leader;
        options.entry = this.recurrence;
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
  requestLeader: function requestLeader(userId) {
    const request = new Sage.SData.Client.SDataSingleResourceRequest(this.getConnection())
      .setResourceKind('users')
      .setResourceSelector(string.substitute("'${0}'", [userId]))
      .setQueryArg('select', [
        'UserInfo/FirstName',
        'UserInfo/LastName',
      ].join(','));

    request.read({
      success: this.processLeader,
      failure: this.requestLeaderFailure,
      scope: this,
    });
  },
  requestLeaderFailure: function requestLeaderFailure() {},
  processLeader: function processLeader(leader) {
    if (leader) {
      this.entry.Leader = leader;

      // There could be a timing issue here. The call to request the leader is done before the layout is processed,
      // so we could potentially end up in here before any dom was created for the view.
      // TODO: Fix
      const rowNode = query('[data-property="Leader"]');
      const contentNode = rowNode && query('[data-property="Leader"] > span', this.domNode);

      if (rowNode && rowNode.length > 0) {
        domClass.remove(rowNode[0], 'content-loading');
      }

      if (contentNode && contentNode.length > 0) {
        contentNode[0].innerHTML = this.leaderTemplate.apply(leader.UserInfo);
      }
    }
  },
  requestRecurrence: function requestRecurrence(key) {
    const request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService())
      .setResourceKind(this.resourceKind)
      .setResourceSelector(string.substitute("'${0}'", [key]))
      .setContractName(this.contractName)
      .setQueryArg('select', this.querySelect.join(','));

    request.allowCacheUse = false;
    request.read({
      success: this.processRecurrence,
      failure: this.requestRecurrenceFailure,
      scope: this,
    });
    return;
  },
  processRecurrence: function processRecurrence(recurrence) {
    if (recurrence) {
      this.recurrence = recurrence;

      const rowNode = query('[data-property="RecurrenceUI"]');
      const contentNode = rowNode && query('[data-property="RecurrenceUI"] > span', this.domNode);

      if (rowNode && rowNode.length > 0) {
        domClass.remove(rowNode[0], 'content-loading');
      }

      if (contentNode && contentNode.length > 0) {
        contentNode[0].innerHTML = recur.toString(this.recurrence);
      }
    }
  },
  requestRecurrenceFailure: function requestRecurrenceFailure() {},
  checkCanComplete: function checkCanComplete(entry) {
    return !(entry && (entry.AllowComplete));
  },
  preProcessEntry: function preProcessEntry(entry) {
    if (entry && entry.Leader.$key) {
      this.requestLeader(entry.Leader.$key);
    }
    if (this.isActivityRecurring(entry)) {
      this.requestRecurrence(entry.$key.split(this.recurringActivityIdSeparator).shift());
    }

    return entry;
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
    this.activityTypeValues = [
      this.literatureText,
      this.phoneCallText,
      this.meetingText,
      this.toDoText,
      this.personalText,
    ];
    platformUtility.extendObjectKeyValue(this.activityTypeText, this.activityTypeKeys, this.activityTypeValues);
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
        disabled: this.checkCanComplete,
        exclude: this.isActivityRecurringSeries,
      }, {
        name: 'completeOccurrenceAction',
        property: 'StartDate',
        label: this.completeOccurrenceText,
        iconClass: 'fa fa-check-square fa-lg',
        action: 'completeOccurrence',
        disabled: this.checkCanComplete,
        renderer: format.date.bindDelegate(this, this.startDateFormatText, false),
        include: this.isActivityRecurringSeries,
      }, {
        name: 'completeSeriesAction',
        property: 'Description',
        label: this.completeSeriesText,
        iconClass: 'fa fa-check-square fa-lg',
        action: 'completeSeries',
        disabled: this.checkCanComplete,
        include: this.isActivityRecurringSeries,
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
        exclude: this.isActivityTimeless,
      }, {
        name: 'StartDateTimeless',
        property: 'StartDate',
        label: this.allDayText,
        renderer: format.date.bindDelegate(this, this.timelessDateFormatText, true),
        include: this.isActivityTimeless,
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
        exclude: this.isActivityTimeless,
      }, {
        name: 'Alarm',
        property: 'Alarm',
        label: this.alarmText,
        renderer: format.yesNo,
        exclude: this.doesActivityHaveReminder,
      }, {
        name: 'AlarmTime',
        property: 'AlarmTime',
        label: this.alarmTimeText,
        renderer: format.date.bindDelegate(this, this.alarmDateFormatText, null, true),
        include: this.doesActivityHaveReminder,
      }, {
        name: 'Rollover',
        property: 'Rollover',
        label: this.rolloverText,
        include: this.isActivityTimeless,
        renderer: format.yesNo,
      }, {
        name: 'RecurrenceUI',
        property: 'RecurrenceUI',
        label: this.recurrenceText,
        include: this.isActivityRecurring,
        cls: 'content-loading',
        value: 'loading...',
      }],
    }, {
      title: this.whoText,
      name: 'WhoSection',
      children: [{
        name: 'Leader',
        property: 'Leader',
        label: this.leaderText,
        cls: 'content-loading',
        value: 'loading...',
      }, {
        name: 'ContactName',
        property: 'ContactName',
        exclude: this.isActivityForLead,
        label: this.contactText,
        view: 'contact_detail',
        key: 'ContactId',
        descriptor: 'ContactName',
      }, {
        name: 'AccountName',
        property: 'AccountName',
        exclude: this.isActivityForLead,
        label: this.accountText,
        view: 'account_detail',
        key: 'AccountId',
        descriptor: 'AccountName',
      }, {
        name: 'OpportunityName',
        property: 'OpportunityName',
        exclude: this.isActivityForLead,
        label: this.opportunityText,
        view: 'opportunity_detail',
        key: 'OpportunityId',
        descriptor: 'OpportunityName',
      }, {
        name: 'TicketNumber',
        property: 'TicketNumber',
        exclude: this.isActivityForLead,
        label: this.ticketNumberText,
        view: 'ticket_detail',
        key: 'TicketId',
        descriptor: 'TicketNumber',
      }, {
        name: 'LeadName',
        property: 'LeadName',
        include: this.isActivityForLead,
        label: this.leadText,
        view: 'lead_detail',
        key: 'LeadId',
        descriptor: 'LeadName',
      }, {
        name: 'AccountName',
        property: 'AccountName',
        include: this.isActivityForLead,
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
