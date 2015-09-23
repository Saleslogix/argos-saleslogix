import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import query from 'dojo/query';
import connect from 'dojo/_base/connect';
import environment from '../../Environment';
import convert from 'argos/Convert';
import ErrorManager from 'argos/ErrorManager';
import List from 'argos/List';
import action from '../../Action';
import _CardLayoutListMixin from '../_CardLayoutListMixin';
import _RightDrawerListMixin from '../_RightDrawerListMixin';
import _MetricListMixin from '../_MetricListMixin';
import MODEL_NAMES from '../../Models/Names';

const resource = window.localeContext.getEntitySync('activityMyDay').attributes;

/**
 * @class crm.Views.Activity.MyDay
 *
 * @requires argos._ListBase
 * @requires argos.Format
 * @requires argos.Utility
 * @requires argos.Convert
 * @requires argos.ErrorManager
 *
 * @requires crm.Format
 * @requires crm.Environment
 * @requires crm.Views.Activity.List
 * @requires crm.Action
 */
const __class = declare('crm.Views.Activity.MyDay', [List, _RightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin], {

  // Templates
  // Card View
  itemRowContainerTemplate: new Simplate([
    '<li data-action="activateEntry" data-my-activity-key="{%= $.$key %}" data-key="{%= $$.getItemActionKey($) %}" data-descriptor="{%: $$.getItemDescriptor($) %}" data-activity-type="{%: $.Activity.Type %}">',
    '{%! $$.itemRowContentTemplate %}',
    '</li>',
  ]),
  activityTimeTemplate: new Simplate([
    '{% if ($$.isTimelessToday($)) { %}',
    '{%: $$.allDayText %}',
    '{% } else { %}',
    '{%: crm.Format.relativeDate($.Activity.StartDate, argos.Convert.toBoolean($.Activity.Timeless)) %}',
    '{% } %}',
  ]),
  itemTemplate: new Simplate([
    '<h3>',
    '<span class="p-description">{%: $.Activity.Description %}{% if ($.Status === "asUnconfirmed") { %} ({%: crm.Format.userActivityStatus($.Status) %}) {% } %}</span>',
    '</h3>',
    '<h4>',
    '{%! $$.activityTimeTemplate %}',
    '</h4>',
    '<h4>{%! $$.nameTemplate %}</h4>',
    '<h4>',
    '{% if ($.Activity.PhoneNumber) { %}',
    '<span class="href" data-action="_callPhone" data-key="{%: $.$key %}">{%: argos.Format.phone($.Activity.PhoneNumber) %}</span>',
    '{% } %}',
    '</h4>',
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
  id: 'myday_list',
  resourceKind: 'userActivities',
  modelName: MODEL_NAMES.ACTIVITY,
  enableSearch: false,
  iconClass: 'fa fa-check-square-o fa-lg',
  detailView: 'activity_detail',
  insertView: 'activity_types_list',
  historyEditView: 'history_edit',
  pageSize: 105,

  existsRE: /^[\w]{12}$/,
  requestDataUsingModel: function requestDataUsingModel() {
    return this._model.getMyDayEntries(this.query, this.options);
  },
  _getCurrentQuery: function _getCurrentQuery(options) {
    const myDayQuery = this._model.getMyDayQuery();
    const optionsQuery = options && options.queryArgs && options.queryArgs._activeFilter;
    return [myDayQuery, optionsQuery].filter(function checkItem(item) {
        return !!item;
      })
      .join(' and ');
  },
  resourceKind: 'userActivities',
  allowSelection: true,
  enableActions: true,
  createToolLayout: function createToolLayout() {
    this.inherited(arguments);
    if (this.tools && this.tools.tbar && !this._refreshAdded && !window.App.supportsTouch()) {
      this.tools.tbar.push({
        id: 'refresh',
        cls: 'fa fa-refresh fa-fw fa-lg',
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
    this.invokeActionItemBy(function setActionId(theAction) {
      return theAction.id === 'call';
    }, params.key);
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
      cls: 'fa fa-phone-square fa-2x',
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
      cls: 'fa fa-paperclip fa-2x',
      label: this.addAttachmentActionText,
      fn: action.addAttachment.bindDelegate(this),
    }]);
  },
  selectEntry: function selectEntry(params, evt, node) {
    /* Override selectEntry from the base List mixin.
     * Grabbing a different key here, since we use entry.Activity.$key as the main data-key.
     * TODO: Make [data-key] overrideable in the base class.
     */
    const row = query(node).closest('[data-my-activity-key]')[0];
    const key = row ? row.getAttribute('data-my-activity-key') : false;

    if (this._selectionModel && key) {
      this._selectionModel.toggle(key, this.entries[key], row);
    }

    if (this.options.singleSelect && this.options.singleSelectAction && !this.enableActions) {
      this.invokeSingleSelectAction();
    }
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
    req.setQueryArg('where', string.substitute('ActivityId eq \'${0}\' and ToUser.Id eq \'${1}\'', [id, userId]));
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
      '$name': operation,
      'request': {
        'entity': notification,
        'UserNotificationId': notification.$key,
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
    const completeActivityEntry = {
      '$name': 'ActivityComplete',
      'request': {
        'entity': {
          '$key': entry.$key,
        },
        'ActivityId': entry.$key,
        'userId': entry.Leader.$key,
        'result': entry.Result,
        'completeDate': entry.CompletedDate,
      },
    };

    const request = new Sage.SData.Client.SDataServiceOperationRequest(this.getService())
      .setResourceKind('activities')
      .setContractName('system')
      .setOperationName('Complete');

    request.execute(completeActivityEntry, {
      success: function success() {
        connect.publish('/app/refresh', [{
          resourceKind: 'history',
        }]);

        this.clear();
        this.refresh();
      },
      failure: this.onRequestFailure,
      scope: this,
    });
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
    if (entry.Activity.Priority) {
      if (entry.Activity.Priority === 'High') {
        return true;
      }
    }

    return false;
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
  _getItemIconClass: function _getItemIconClass(type) {
    let cls = this._model.activityIndicatorIconByType[type];
    if (cls) {
      cls = cls + ' fa-2x';
    }

    return cls;
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
      '$name': 'History',
      'Type': 'atPhoneCall',
      'ContactName': entry.Activity.ContactName,
      'ContactId': entry.Activity.ContactId,
      'AccountName': entry.Activity.AccountName,
      'AccountId': entry.Activity.AccountId,
      'Description': string.substitute('${0} ${1}', [this.calledText, (entry.Activity.ContactName || '')]),
      'UserId': App.context && App.context.user.$key,
      'UserName': App.context && App.context.user.UserName,
      'Duration': 15,
      'CompletedDate': (new Date()),
    };

    this.navigateToHistoryInsert('atPhoneCall', tempEntry, complete);
  },

  navigateToHistoryInsert: function navigateToHistoryInsert(type, entry, complete) {
    const view = App.getView(this.historyEditView);
    if (view) {
      environment.refreshActivityLists();
      view.show({
        title: this.activityTypeText[type],
        template: {},
        entry: entry,
        insert: true,
      }, {
        complete: complete,
      });
    }
  },
});

lang.setObject('Mobile.SalesLogix.Views.Activity.MyDay', __class);
export default __class;
