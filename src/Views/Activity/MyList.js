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
import environment from '../../Environment';
import ActivityList from './List';
import convert from 'argos/Convert';
import ErrorManager from 'argos/ErrorManager';
import action from '../../Action';
import format from '../../Format';
import _ListOfflineMixin from 'argos/Offline/_ListOfflineMixin';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../../Models/Names';
import ActivityTypeText from '../../Models/Activity/ActivityTypeText';
import getResource from 'argos/I18n';
import string from 'dojo/string';


const resource = getResource('activityMyList');
const hashTagResource = getResource('activityMyListHashTags');

/**
 * @class crm.Views.Activity.MyList
 *
 * @extends crm.Views.Activity.List
 * @mixins crm.Views.Activity.List
 *
 * @requires argos.List
 * @requires argos.Format
 * @requires argos.Utility
 * @requires argos.Convert
 * @requires argos.ErrorManager
 *
 * @requires crm.Format
 * @requires crm.Environment
 * @requires crm.Views.Activity.List
 * @requires crm.Action
 *
 * @requires moment
 *
 */
const __class = declare('crm.Views.Activity.MyList', [ActivityList, _ListOfflineMixin], {
  format,
  // Templates
  // Card View
  rowTemplate: new Simplate([
    `<div data-action="activateEntry" data-my-activity-key="{%= $.$key %}" data-key="{%= $$.getItemActionKey($) %}" data-descriptor="{%: $$.getItemDescriptor($) %}" data-activity-type="{%: $.Activity.Type %}">
      <div class="widget">
        <div class="widget-header">
          {%! $$.itemIconTemplate %}<h2 class="widget-title">{%: $$.getItemDescriptor($) %}</h2>
          {% if($$.visibleActions.length > 0 && $$.enableActions) { %}
            <button class="btn-actions" type="button" data-action="selectEntry" data-key="{%= $$.getItemActionKey($) %}">
              <span class="audible">Actions</span>
              <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
                <use xlink:href="#icon-more"></use>
              </svg>
            </button>
            {%! $$.listActionTemplate %}
          {% } %}
        </div>
        <div class="card-content">
          {%! $$.itemRowContentTemplate %}
        </div>
      </div>
    </div>`,
  ]),
  activityTimeTemplate: new Simplate([
    '{% if ($$.isTimelessToday($)) { %}',
    '{%: $$.allDayText %}',
    '{% } else { %}',
    '{%: $$.format.relativeDate($.Activity.StartDate, argos.Convert.toBoolean($.Activity.Timeless)) %}', // TODO: Avoid global
    '{% } %}',
  ]),
  itemTemplate: new Simplate([
    '<p class="listview-heading">',
    '<span class="p-description">{%: $$.format.picklist($$.app.picklistService, null, null, $$.getPicklistByActivityType($.Activity.Type, "Description"))($.Activity.Description) %}{% if ($.Status === "asUnconfirmed") { %} ({%: $$.format.userActivityStatus($.Status) %}) {% } %}</span>',
    '</p>',
    '<p class="micro-text">',
    '{%! $$.activityTimeTemplate %}',
    '</p>',
    '<p class="micro-text">{%! $$.nameTemplate %}</p>',
    '<p class="micro-text">',
    '{% if ($.Activity.PhoneNumber) { %}',
    '<span class="hyperlink" data-action="_callPhone" data-key="{%: $.$key %}">{%: argos.Format.phone($.Activity.PhoneNumber) %}</span>', // TODO: Avoid global
    '{% } %}',
    '</p>',
  ]),
  nameTemplate: new Simplate([
    '{% if ($.Activity.ContactName) { %}',
    '{%: $.Activity.ContactName %} | {%: $.Activity.AccountName %}',
    '{% } else if ($.Activity.AccountName) { %}',
    '{%: $.Activity.AccountName %}',
    '{% } else { %}',
    '{%: $.Activity.LeadName %}',
    '{% } %}',
  ]),

  // Localization
  titleText: resource.titleText,
  completeActivityText: resource.completeActivityText,
  acceptActivityText: resource.acceptActivityText,
  declineActivityText: resource.declineActivityText,
  callText: resource.callText,
  calledText: resource.calledText,
  addAttachmentActionText: resource.addAttachmentActionText,
  viewContactActionText: resource.viewContactActionText,
  viewAccountActionText: resource.viewAccountActionText,
  viewOpportunityActionText: resource.viewOpportunityActionText,

  // View Properties
  id: 'myactivity_list',
  entityName: 'UserActivity',
  modelName: MODEL_NAMES.USERACTIVITY,
  enableOffline: true,
  historyEditView: 'history_edit',
  existsRE: /^[\w]{12}$/,
  queryWhere: function queryWhere() {
    return `User.Id eq "${App.context.user.$key}" and Status ne "asDeclned" and Activity.Type ne "atLiterature"`;
  },
  queryOrderBy: 'Activity.StartDate desc',
  querySelect: [
    'Alarm',
    'AlarmTime',
    'Status',
    'Activity/Description',
    'Activity/StartDate',
    'Activity/EndDate',
    'Activity/Type',
    'Activity/AccountName',
    'Activity/AccountId',
    'Activity/ContactId',
    'Activity/ContactName',
    'Activity/Leader',
    'Activity/LeadName',
    'Activity/LeadId',
    'Activity/OpportunityId',
    'Activity/TicketId',
    'Activity/UserId',
    'Activity/Timeless',
    'Activity/PhoneNumber',
    'Activity/Recurring',
    'Activity/Alarm',
    'Activity/ModifyDate',
    'Activity/Priority',
  ],
  resourceKind: 'userActivities',
  allowSelection: true,
  enableActions: true,
  hashTagQueries: {
    alarm: 'Alarm eq true',
    'status-unconfirmed': 'Status eq "asUnconfirmed"',
    'status-accepted': 'Status eq "asAccepted"',
    'status-declined': 'Status eq "asDeclned"',
    recurring: 'Activity.Recurring eq true',
    timeless: 'Activity.Timeless eq true',
    yesterday: function yesterday() {
      const now = moment();
      const yesterdayStart = now.clone().subtract(1, 'days').startOf('day');
      const yesterdayEnd = yesterdayStart.clone().endOf('day');

      const theQuery = `((Activity.Timeless eq false and Activity.StartDate between @${convert.toIsoStringFromDate(yesterdayStart.toDate())}@ and @${convert.toIsoStringFromDate(yesterdayEnd.toDate())}@) or (Activity.Timeless eq true and Activity.StartDate between @${yesterdayStart.format('YYYY-MM-DDT00:00:00[Z]')}@ and @${yesterdayEnd.format('YYYY-MM-DDT23:59:59[Z]')}@))`;
      return theQuery;
    },
    today: function today() {
      const now = moment();
      const todayStart = now.clone().startOf('day');
      const todayEnd = todayStart.clone().endOf('day');

      const theQuery = `((Activity.Timeless eq false and Activity.StartDate between @${convert.toIsoStringFromDate(todayStart.toDate())}@ and @${convert.toIsoStringFromDate(todayEnd.toDate())}@) or (Activity.Timeless eq true and Activity.StartDate between @${todayStart.format('YYYY-MM-DDT00:00:00[Z]')}@ and @${todayEnd.format('YYYY-MM-DDT23:59:59[Z]')}@))`;
      return theQuery;
    },
    'this-week': function thisWeek() {
      const now = moment();
      const weekStartDate = now.clone().startOf('week');
      const weekEndDate = weekStartDate.clone().endOf('week');

      const theQuery = `((Activity.Timeless eq false and Activity.StartDate between @${convert.toIsoStringFromDate(weekStartDate.toDate())}@ and @${convert.toIsoStringFromDate(weekEndDate.toDate())}@) or (Activity.Timeless eq true and Activity.StartDate between @${weekStartDate.format('YYYY-MM-DDT00:00:00[Z]')}@ and @${weekEndDate.format('YYYY-MM-DDT23:59:59[Z]')}@))`;
      return theQuery;
    },
  },
  hashTagQueriesText: {
    alarm: hashTagResource.hashTagAlarmText,
    'status-unconfirmed': hashTagResource.hashTagUnconfirmedText,
    'status-accepted': hashTagResource.hashTagAcceptedText,
    'status-declined': hashTagResource.hashTagDeclinedText,
    recurring: hashTagResource.hashTagRecurringText,
    timeless: hashTagResource.hashTagTimelessText,
    today: hashTagResource.hashTagTodayText,
    'this-week': hashTagResource.hashTagThisWeekText,
    yesterday: hashTagResource.hashTagYesterdayText,
  },
  createToolLayout: function createToolLayout() {
    this.inherited(arguments);
    if (this.tools && this.tools.tbar && !this._refreshAdded && !window.App.supportsTouch()) {
      this.tools.tbar.push({
        id: 'refresh',
        svg: 'refresh',
        action: '_refreshClicked',
      });

      this._refreshAdded = true;
    }

    return this.tools;
  },
  _refreshAdded: false,
  _refreshClicked: function _refreshClicked() {
    this.clear();
    this.refreshRequired = true;
    this.refresh();

    // Hook for customizers
    this.onRefreshClicked();
  },
  onRefreshClicked: function onRefreshClicked() {},
  _callPhone: function _callPhone(params) {
    this.invokeActionItemBy((theAction) => {
      return theAction.id === 'call';
    }, params.key);
  },
  defaultSearchTerm: function defaultSearchTerm() {
    if (App.enableHashTags) {
      const hashtag = this.hashTagQueriesText['this-week'];
      if (typeof hashtag === 'string' && hashtag.startsWith('#')) {
        return hashtag;
      }

      return `#${hashtag}`;
    }

    return '';
  },
  createActionLayout: function createActionLayout() {
    return this.actions || (this.actions = [{
      id: 'viewAccount',
      label: this.viewAccountActionText,
      enabled: function enabled(theAction, selection) {
        const entry = selection && selection.data;
        if (!entry) {
          return false;
        }
        if (entry.Activity.AccountId) {
          return true;
        }
        return false;
      },
      fn: function fn(theAction, selection) {
        const viewId = 'account_detail';
        const options = {
          key: selection.data.Activity.AccountId,
          descriptor: selection.data.Activity.AccountName,
        };

        const view = App.getView(viewId);
        if (view && options) {
          view.show(options);
        }
      },
    }, {
      id: 'viewOpportunity',
      label: this.viewOpportunityActionText,
      enabled: function enabled(theAction, selection) {
        const entry = selection && selection.data;
        if (!entry) {
          return false;
        }
        if (entry.Activity.OpportunityId) {
          return true;
        }
        return false;
      },
      fn: function fn(theAction, selection) {
        const viewId = 'opportunity_detail';
        const options = {
          key: selection.data.Activity.OpportunityId,
          descriptor: selection.data.Activity.OpportunityName,
        };
        const view = App.getView(viewId);
        if (view && options) {
          view.show(options);
        }
      },
    }, {
      id: 'viewContact',
      label: this.viewContactActionText,
      action: 'navigateToContactOrLead',
      enabled: this.hasContactOrLead,
    }, {
      id: 'complete',
      cls: 'fa fa-check-square fa-2x',
      label: this.completeActivityText,
      enabled: function enabled(theAction, selection) {
        const entry = selection && selection.data;
        if (!entry) {
          return false;
        }

        const recur = entry.Activity.Recurring;

        return entry.Activity.Leader.$key === App.context.user.$key && !recur;
      },
      fn: (function fn(theAction, selection) {
        const entry = selection && selection.data && selection.data.Activity;

        entry.CompletedDate = new Date();
        entry.Result = 'Complete';

        environment.refreshActivityLists();
        this.completeActivity(entry);
      }).bindDelegate(this),
    }, {
      id: 'accept',
      cls: 'fa fa-check fa-2x',
      label: this.acceptActivityText,
      enabled: function enabled(theAction, selection) {
        const entry = selection && selection.data;
        if (!entry) {
          return false;
        }

        return entry.Status === 'asUnconfirmed';
      },
      fn: (function fn(theAction, selection) {
        const entry = selection && selection.data;
        environment.refreshActivityLists();
        this.confirmActivityFor(entry.Activity.$key, App.context.user.$key);
      }).bindDelegate(this),
    }, {
      id: 'decline',
      cls: 'fa fa-ban fa-2x',
      label: this.declineActivityText,
      enabled: function enabled(theAction, selection) {
        const entry = selection && selection.data;
        if (!entry) {
          return false;
        }

        return entry.Status === 'asUnconfirmed';
      },
      fn: (function fn(theAction, selection) {
        const entry = selection && selection.data;

        environment.refreshActivityLists();
        this.declineActivityFor(entry.Activity.$key, App.context.user.$key);
      }).bindDelegate(this),
    }, {
      id: 'call',
      cls: 'phone',
      label: this.callText,
      enabled: function enabled(theAction, selection) {
        const entry = selection && selection.data;
        return entry && entry.Activity && entry.Activity.PhoneNumber;
      },
      fn: function fn(theAction, selection) {
        const entry = selection && selection.data;
        const phone = entry && entry.Activity && entry.Activity.PhoneNumber;
        if (phone) {
          this.recordCallToHistory(function initiateCall() {
            App.initiateCall(phone);
          }.bindDelegate(this), entry);
        }
      }.bindDelegate(this),
    }, {
      id: 'addAttachment',
      cls: 'attach',
      label: this.addAttachmentActionText,
      fn: action.addAttachment.bindDelegate(this),
    }]);
  },
  selectEntry: function selectEntry(params) {
    /* Override selectEntry from the base List mixin.
     * Grabbing a different key here, since we use entry.Activity.$key as the main data-key.
     * TODO: Make [data-key] overrideable in the base class.
     */
    const row = $(`[data-key='${params.key}']`, this.contentNode).first();
    const key = row ? row.attr('data-my-activity-key') : false;

    if (this._selectionModel && key) {
      this._selectionModel.select(key, this.entries[key], row.get(0));
    }

    if (this.options.singleSelect && this.options.singleSelectAction && !this.enableActions) {
      this.invokeSingleSelectAction();
    }
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return `upper(Activity.Description) like "%${this.escapeSearchQuery(searchQuery.toUpperCase())}%"`;
  },
  declineActivityFor: function declineActivityFor(activityId, userId) {
    this._getUserNotifications(activityId, userId, false);
  },
  confirmActivityFor: function confirmActivityFor(activityId, userId) {
    this._getUserNotifications(activityId, userId, true);
  },
  _getUserNotifications: function _getUserNotifications(activityId, userId, accept) {
    let id = activityId;
    if (activityId) {
      id = activityId.substring(0, 12);
    }

    const req = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService());
    req.setResourceKind('userNotifications');
    req.setContractName('dynamic');
    req.setQueryArg('where', `ActivityId eq '${id}' and ToUser.Id eq '${userId}'`);
    req.setQueryArg('precedence', '0');
    req.read({
      success: function success(userNotifications) {
        if (userNotifications.$resources && userNotifications.$resources.length > 0) {
          if (accept) {
            this.acceptConfirmation(userNotifications.$resources[0]);
          } else {
            this.declineConfirmation(userNotifications.$resources[0]);
          }
        }
      },
      failure: this.onRequestFailure,
      scope: this,
    });
  },
  declineConfirmation: function declineConfirmation(notification) {
    this._postUserNotifications(notification, 'Decline');
  },
  acceptConfirmation: function acceptConfirmation(notification) {
    this._postUserNotifications(notification, 'Accept');
  },
  _postUserNotifications: function _postUserNotifications(notification, operation) {
    if (!notification || typeof operation !== 'string') {
      return;
    }
    /*
     * To get the payload template:
     * http://localhost:6666/SlxClient/slxdata.ashx/slx/dynamic/-/userNotifications/$service/accept/$template?format=json
     */
    const payload = {
      $name: operation,
      request: {
        entity: notification,
        UserNotificationId: notification.$key,
      },
    };

    const request = new Sage.SData.Client.SDataServiceOperationRequest(this.getService())
      .setContractName('dynamic')
      .setResourceKind('usernotifications')
      .setOperationName(operation.toLowerCase());
    request.execute(payload, {
      success: function success() {
        this.clear();
        this.refresh();
      },
      failure: this.onRequestFailure,
      scope: this,
    });
  },
  completeActivity: function completeActivity(entry) {
    const activityModel = App.ModelManager.getModel(MODEL_NAMES.ACTIVITY, MODEL_TYPES.SDATA);
    if (activityModel) {
      activityModel.completeActivity(entry).then(() => {
        connect.publish('/app/refresh', [{
          resourceKind: 'history',
        }]);

        this.clear();
        this.refresh();
      }, (err) => {
        ErrorManager.addError(err, this, {}, 'failure');
      });
    }
  },
  onRequestFailure: function onRequestFailure(response, o) {
    ErrorManager.addError(response, o, {}, 'failure');
  },
  hasAlarm: function hasAlarm(entry) {
    if (entry.Activity && entry.Activity.Alarm === true) {
      return true;
    }

    return false;
  },
  hasBeenTouched: function hasBeenTouched(entry) {
    if (entry.Activity.ModifyDate) {
      const modifiedDate = moment(convert.toDateFromString(entry.Activity.ModifyDate));
      const currentDate = moment().endOf('day');
      const weekAgo = moment().subtract(1, 'weeks');

      return modifiedDate.isAfter(weekAgo) &&
        modifiedDate.isBefore(currentDate);
    }

    return false;
  },
  isImportant: function isImportant(entry) {
    return entry.Activity.Priority === 'High';
  },
  isOverdue: function isOverdue(entry) {
    if (entry.Activity.StartDate) {
      const startDate = convert.toDateFromString(entry.Activity.StartDate);
      const currentDate = new Date();
      const seconds = Math.round((currentDate - startDate) / 1000);
      const mins = seconds / 60;
      if (mins >= 1) {
        return true;
      }
    }
    return false;
  },
  isTimelessToday: function isTimelessToday(entry) {
    if (!entry || !entry.Activity || !entry.Activity.Timeless) {
      return false;
    }

    const start = moment(entry.Activity.StartDate);
    return this._isTimelessToday(start);
  },
  isRecurring: function isRecurring(entry) {
    if (entry.Activity.Recurring) {
      return true;
    }

    return false;
  },
  getItemIconClass: function getItemIconClass(entry) {
    const type = entry && entry.Activity && entry.Activity.Type;
    return this._getItemIconClass(type);
  },
  getItemActionKey: function getItemActionKey(entry) {
    return entry.Activity.$key;
  },
  getItemDescriptor: function getItemDescriptor(entry) {
    return entry.Activity.$descriptor;
  },
  hasContactOrLead: function hasContactOrLead(theAction, selection) {
    return (selection.data.Activity.ContactId) || (selection.data.Activity.LeadId);
  },
  navigateToContactOrLead: function navigateToContactOrLead(theAction, selection) {
    const entry = selection.data.Activity;
    const entity = this.resolveContactOrLeadEntity(entry);
    let viewId;
    let options;

    switch (entity) {
      case 'Contact':
        viewId = 'contact_detail';
        options = {
          key: entry.ContactId,
          descriptor: entry.ContactName,
        };
        break;
      case 'Lead':
        viewId = 'lead_detail';
        options = {
          key: entry.LeadId,
          descriptor: entry.LeadName,
        };
        break;
      default:
    }

    const view = App.getView(viewId);

    if (view && options) {
      view.show(options);
    }
  },
  navigateToDetailView: function navigateToDetailView(key, descriptor, additionalOptions) {
    const myListOptions = additionalOptions || {};
    myListOptions.returnTo = this.id;
    this.inherited(arguments, [key, descriptor, myListOptions]);
  },
  resolveContactOrLeadEntity: function resolveContactOrLeadEntity(entry) {
    const exists = this.existsRE;

    if (entry) {
      if (exists.test(entry.LeadId)) {
        return 'Lead';
      }
      if (exists.test(entry.ContactId)) {
        return 'Contact';
      }
    }
  },
  recordCallToHistory: function recordCallToHistory(complete, entry) {
    const tempEntry = {
      $name: 'History',
      Type: 'atPhoneCall',
      ContactName: entry.Activity.ContactName,
      ContactId: entry.Activity.ContactId,
      AccountName: entry.Activity.AccountName,
      AccountId: entry.Activity.AccountId,
      Description: string.substitute(this.calledText, [entry.Activity.ContactName || '']),
      UserId: App.context && App.context.user.$key,
      UserName: App.context && App.context.user.UserName,
      Duration: 15,
      CompletedDate: (new Date()),
    };

    this.navigateToHistoryInsert('atPhoneCall', tempEntry, complete);
  },

  navigateToHistoryInsert: function navigateToHistoryInsert(type, entry, complete) {
    const view = App.getView(this.historyEditView);
    if (view) {
      environment.refreshActivityLists();
      view.show({
        title: ActivityTypeText[type],
        template: {},
        entry,
        insert: true,
      }, {
        complete,
      });
    }
  },
  createBriefcaseEntity: function createBriefcaseEntity(entry) {
    const entity = {
      entityId: entry.Activity.$key,
      entityName: 'Activity',
      options: {
        includeRelated: true,
        viewId: this.detailView,
        iconClass: this.getItemIconClass(entry),
      },
    };
    return entity;
  },
});

export default __class;
