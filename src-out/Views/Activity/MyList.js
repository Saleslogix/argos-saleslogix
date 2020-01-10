define('crm/Views/Activity/MyList', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/connect', '../../Environment', './List', 'argos/Convert', 'argos/ErrorManager', '../../Action', '../../Format', 'argos/Offline/_ListOfflineMixin', 'argos/Models/Types', '../../Models/Names', '../../Models/Activity/ActivityTypeText', 'argos/I18n', 'dojo/string'], function (module, exports, _declare, _connect, _Environment, _List, _Convert, _ErrorManager, _Action, _Format, _ListOfflineMixin2, _Types, _Names, _ActivityTypeText, _I18n, _string) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _connect2 = _interopRequireDefault(_connect);

  var _Environment2 = _interopRequireDefault(_Environment);

  var _List2 = _interopRequireDefault(_List);

  var _Convert2 = _interopRequireDefault(_Convert);

  var _ErrorManager2 = _interopRequireDefault(_ErrorManager);

  var _Action2 = _interopRequireDefault(_Action);

  var _Format2 = _interopRequireDefault(_Format);

  var _ListOfflineMixin3 = _interopRequireDefault(_ListOfflineMixin2);

  var _Types2 = _interopRequireDefault(_Types);

  var _Names2 = _interopRequireDefault(_Names);

  var _ActivityTypeText2 = _interopRequireDefault(_ActivityTypeText);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _string2 = _interopRequireDefault(_string);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  var resource = (0, _I18n2.default)('activityMyList');
  var hashTagResource = (0, _I18n2.default)('activityMyListHashTags');

  var __class = (0, _declare2.default)('crm.Views.Activity.MyList', [_List2.default, _ListOfflineMixin3.default], {
    format: _Format2.default,
    // Templates
    // Card View
    rowTemplate: new Simplate(['<div data-action="activateEntry" data-my-activity-key="{%= $.$key %}" data-key="{%= $$.getItemActionKey($) %}" data-descriptor="{%: $$.getItemDescriptor($) %}" data-activity-type="{%: $.Activity.Type %}">\n      <div class="widget">\n        <div class="widget-header">\n          {%! $$.itemIconTemplate %}<h2 class="widget-title">{%: $$.getTitle($) %}</h2>\n          {% if($$.visibleActions.length > 0 && $$.enableActions) { %}\n            <button class="btn-actions" type="button" data-action="selectEntry" data-key="{%= $$.getItemActionKey($) %}">\n              <span class="audible">Actions</span>\n              <svg class="icon" focusable="false" aria-hidden="true" role="presentation">\n                <use xlink:href="#icon-more"></use>\n              </svg>\n            </button>\n            {%! $$.listActionTemplate %}\n          {% } %}\n        </div>\n        <div class="card-content">\n          {%! $$.itemRowContentTemplate %}\n        </div>\n      </div>\n    </div>']),
    activityTimeTemplate: new Simplate(['{% if ($$.isTimelessToday($)) { %}', '{%: $$.allDayText %}', '{% } else { %}', '{%: $$.format.relativeDate($.Activity.StartDate, argos.Convert.toBoolean($.Activity.Timeless)) %}', // TODO: Avoid global
    '{% } %}']),
    itemTemplate: new Simplate(['<p class="listview-heading">', '<span class="p-description">{%: $$.format.picklist($$.app.picklistService, null, null, $$.getPicklistByActivityType($.Activity.Type, "Description"))($.Activity.Description) %}{% if ($.Status === "asUnconfirmed") { %} ({%: $$.format.userActivityStatus($.Status) %}) {% } %}</span>', '</p>', '<p class="micro-text">', '{%! $$.activityTimeTemplate %}', '</p>', '<p class="micro-text">{%! $$.nameTemplate %}</p>', '<p class="micro-text">', '{% if ($.Activity.PhoneNumber) { %}', '<span class="hyperlink" data-action="_callPhone" data-key="{%: $.$key %}">{%: argos.Format.phone($.Activity.PhoneNumber) %}</span>', // TODO: Avoid global
    '{% } %}', '</p>']),
    nameTemplate: new Simplate(['{% if ($.Activity.ContactName) { %}', '{%: $.Activity.ContactName %} | {%: $.Activity.AccountName %}', '{% } else if ($.Activity.AccountName) { %}', '{%: $.Activity.AccountName %}', '{% } else { %}', '{%: $.Activity.LeadName %}', '{% } %}']),

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
    modelName: _Names2.default.USERACTIVITY,
    enableOffline: true,
    historyEditView: 'history_edit',
    existsRE: /^[\w]{12}$/,
    queryWhere: function queryWhere() {
      return 'User.Id eq "' + App.context.user.$key + '" and Status ne "asDeclned" and Activity.Type ne "atLiterature"';
    },
    queryOrderBy: 'Activity.StartDate desc',
    querySelect: ['Alarm', 'AlarmTime', 'Status', 'Activity/Description', 'Activity/StartDate', 'Activity/EndDate', 'Activity/Type', 'Activity/AccountName', 'Activity/AccountId', 'Activity/ContactId', 'Activity/ContactName', 'Activity/Leader', 'Activity/LeadName', 'Activity/LeadId', 'Activity/OpportunityId', 'Activity/TicketId', 'Activity/UserId', 'Activity/Timeless', 'Activity/PhoneNumber', 'Activity/Recurring', 'Activity/Alarm', 'Activity/ModifyDate', 'Activity/Priority'],
    resourceKind: 'userActivities',
    allowSelection: true,
    enableActions: true,
    hashTagQueries: {
      alarm: 'Activity.Alarm eq true',
      'status-unconfirmed': 'Status eq "asUnconfirmed"',
      'status-accepted': 'Status eq "asAccepted"',
      'status-declined': 'Status eq "asDeclned"',
      recurring: 'Activity.Recurring eq true',
      timeless: 'Activity.Timeless eq true',
      yesterday: function yesterday() {
        var now = moment();
        var yesterdayStart = now.clone().subtract(1, 'days').startOf('day');
        var yesterdayEnd = yesterdayStart.clone().endOf('day');

        var theQuery = '((Activity.Timeless eq false and Activity.StartDate between @' + _Convert2.default.toIsoStringFromDate(yesterdayStart.toDate()) + '@ and @' + _Convert2.default.toIsoStringFromDate(yesterdayEnd.toDate()) + '@) or (Activity.Timeless eq true and Activity.StartDate between @' + yesterdayStart.format('YYYY-MM-DDT00:00:00[Z]') + '@ and @' + yesterdayEnd.format('YYYY-MM-DDT23:59:59[Z]') + '@))';
        return theQuery;
      },
      today: function today() {
        var now = moment();
        var todayStart = now.clone().startOf('day');
        var todayEnd = todayStart.clone().endOf('day');

        var theQuery = '((Activity.Timeless eq false and Activity.StartDate between @' + _Convert2.default.toIsoStringFromDate(todayStart.toDate()) + '@ and @' + _Convert2.default.toIsoStringFromDate(todayEnd.toDate()) + '@) or (Activity.Timeless eq true and Activity.StartDate between @' + todayStart.format('YYYY-MM-DDT00:00:00[Z]') + '@ and @' + todayEnd.format('YYYY-MM-DDT23:59:59[Z]') + '@))';
        return theQuery;
      },
      'this-week': function thisWeek() {
        var now = moment();
        var weekStartDate = now.clone().startOf('week');
        var weekEndDate = weekStartDate.clone().endOf('week');

        var theQuery = '((Activity.Timeless eq false and Activity.StartDate between @' + _Convert2.default.toIsoStringFromDate(weekStartDate.toDate()) + '@ and @' + _Convert2.default.toIsoStringFromDate(weekEndDate.toDate()) + '@) or (Activity.Timeless eq true and Activity.StartDate between @' + weekStartDate.format('YYYY-MM-DDT00:00:00[Z]') + '@ and @' + weekEndDate.format('YYYY-MM-DDT23:59:59[Z]') + '@))';
        return theQuery;
      }
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
      yesterday: hashTagResource.hashTagYesterdayText
    },
    createToolLayout: function createToolLayout() {
      this.inherited(createToolLayout, arguments);
      if (this.tools && this.tools.tbar && !this._refreshAdded && !window.App.supportsTouch()) {
        this.tools.tbar.push({
          id: 'refresh',
          svg: 'refresh',
          action: '_refreshClicked'
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
      this.invokeActionItemBy(function (theAction) {
        return theAction.id === 'call';
      }, params.key);
    },
    defaultSearchTerm: function defaultSearchTerm() {
      if (App.enableHashTags) {
        var hashtag = this.hashTagQueriesText['this-week'];
        if (typeof hashtag === 'string' && hashtag.startsWith('#')) {
          return hashtag;
        }

        return '#' + hashtag;
      }

      return '';
    },
    createActionLayout: function createActionLayout() {
      return this.actions || (this.actions = [{
        id: 'viewAccount',
        label: this.viewAccountActionText,
        enabled: function enabled(theAction, selection) {
          var entry = selection && selection.data;
          if (!entry) {
            return false;
          }
          if (entry.Activity.AccountId) {
            return true;
          }
          return false;
        },
        fn: function fn(theAction, selection) {
          var viewId = 'account_detail';
          var options = {
            key: selection.data.Activity.AccountId,
            descriptor: selection.data.Activity.AccountName
          };

          var view = App.getView(viewId);
          if (view && options) {
            view.show(options);
          }
        }
      }, {
        id: 'viewOpportunity',
        label: this.viewOpportunityActionText,
        enabled: function enabled(theAction, selection) {
          var entry = selection && selection.data;
          if (!entry) {
            return false;
          }
          if (entry.Activity.OpportunityId) {
            return true;
          }
          return false;
        },
        fn: function fn(theAction, selection) {
          var viewId = 'opportunity_detail';
          var options = {
            key: selection.data.Activity.OpportunityId,
            descriptor: selection.data.Activity.OpportunityName
          };
          var view = App.getView(viewId);
          if (view && options) {
            view.show(options);
          }
        }
      }, {
        id: 'viewContact',
        label: this.viewContactActionText,
        action: 'navigateToContactOrLead',
        enabled: this.hasContactOrLead
      }, {
        id: 'complete',
        cls: 'fa fa-check-square fa-2x',
        label: this.completeActivityText,
        enabled: function enabled(theAction, selection) {
          var entry = selection && selection.data;
          if (!entry) {
            return false;
          }

          var recur = entry.Activity.Recurring;

          return entry.Activity.Leader.$key === App.context.user.$key && !recur;
        },
        fn: function fn(theAction, selection) {
          var entry = selection && selection.data && selection.data.Activity;

          entry.CompletedDate = new Date();
          entry.Result = 'Complete';

          _Environment2.default.refreshActivityLists();
          this.completeActivity(entry);
        }.bindDelegate(this)
      }, {
        id: 'accept',
        cls: 'fa fa-check fa-2x',
        label: this.acceptActivityText,
        enabled: function enabled(theAction, selection) {
          var entry = selection && selection.data;
          if (!entry) {
            return false;
          }

          return entry.Status === 'asUnconfirmed';
        },
        fn: function fn(theAction, selection) {
          var entry = selection && selection.data;
          _Environment2.default.refreshActivityLists();
          this.confirmActivityFor(entry.Activity.$key, App.context.user.$key);
        }.bindDelegate(this)
      }, {
        id: 'decline',
        cls: 'fa fa-ban fa-2x',
        label: this.declineActivityText,
        enabled: function enabled(theAction, selection) {
          var entry = selection && selection.data;
          if (!entry) {
            return false;
          }

          return entry.Status === 'asUnconfirmed';
        },
        fn: function fn(theAction, selection) {
          var entry = selection && selection.data;

          _Environment2.default.refreshActivityLists();
          this.declineActivityFor(entry.Activity.$key, App.context.user.$key);
        }.bindDelegate(this)
      }, {
        id: 'call',
        cls: 'phone',
        label: this.callText,
        enabled: function enabled(theAction, selection) {
          var entry = selection && selection.data;
          return entry && entry.Activity && entry.Activity.PhoneNumber;
        },
        fn: function fn(theAction, selection) {
          var entry = selection && selection.data;
          var phone = entry && entry.Activity && entry.Activity.PhoneNumber;
          if (phone) {
            this.recordCallToHistory(function initiateCall() {
              App.initiateCall(phone);
            }.bindDelegate(this), entry);
          }
        }.bindDelegate(this)
      }, {
        id: 'addAttachment',
        cls: 'attach',
        label: this.addAttachmentActionText,
        fn: _Action2.default.addAttachment.bindDelegate(this)
      }]);
    },
    selectEntry: function selectEntry(params) {
      /* Override selectEntry from the base List mixin.
       * Grabbing a different key here, since we use entry.Activity.$key as the main data-key.
       * TODO: Make [data-key] overrideable in the base class.
       */
      var row = $('[data-key=\'' + params.key + '\']', this.contentNode).first();
      var key = row ? row.attr('data-my-activity-key') : false;

      if (this._selectionModel && key) {
        this._selectionModel.select(key, this.entries[key], row.get(0));
      }

      if (this.options.singleSelect && this.options.singleSelectAction && !this.enableActions) {
        this.invokeSingleSelectAction();
      }
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      return 'upper(Activity.Description) like "%' + this.escapeSearchQuery(searchQuery.toUpperCase()) + '%"';
    },
    declineActivityFor: function declineActivityFor(activityId, userId) {
      this._getUserNotifications(activityId, userId, false);
    },
    confirmActivityFor: function confirmActivityFor(activityId, userId) {
      this._getUserNotifications(activityId, userId, true);
    },
    _getUserNotifications: function _getUserNotifications(activityId, userId, accept) {
      var id = activityId;
      if (activityId) {
        id = activityId.substring(0, 12);
      }

      var req = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService());
      req.setResourceKind('userNotifications');
      req.setContractName('dynamic');
      req.setQueryArg('where', 'ActivityId eq \'' + id + '\' and ToUser.Id eq \'' + userId + '\'');
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
        scope: this
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
      var payload = {
        $name: operation,
        request: {
          entity: notification,
          UserNotificationId: notification.$key
        }
      };

      var request = new Sage.SData.Client.SDataServiceOperationRequest(this.getService()).setContractName('dynamic').setResourceKind('usernotifications').setOperationName(operation.toLowerCase());
      request.execute(payload, {
        success: function success() {
          this.clear();
          this.refresh();
        },
        failure: this.onRequestFailure,
        scope: this
      });
    },
    completeActivity: function completeActivity(entry) {
      var _this = this;

      var activityModel = App.ModelManager.getModel(_Names2.default.ACTIVITY, _Types2.default.SDATA);
      if (activityModel) {
        activityModel.completeActivity(entry).then(function () {
          _connect2.default.publish('/app/refresh', [{
            resourceKind: 'history'
          }]);

          _this.clear();
          _this.refresh();
        }, function (err) {
          _ErrorManager2.default.addError(err, _this, {}, 'failure');
        });
      }
    },
    onRequestFailure: function onRequestFailure(response, o) {
      _ErrorManager2.default.addError(response, o, {}, 'failure');
    },
    hasAlarm: function hasAlarm(entry) {
      if (entry.Activity && entry.Activity.Alarm === true) {
        return true;
      }

      return false;
    },
    hasBeenTouched: function hasBeenTouched(entry) {
      if (entry.Activity.ModifyDate) {
        var modifiedDate = moment(_Convert2.default.toDateFromString(entry.Activity.ModifyDate));
        var currentDate = moment().endOf('day');
        var weekAgo = moment().subtract(1, 'weeks');

        return modifiedDate.isAfter(weekAgo) && modifiedDate.isBefore(currentDate);
      }

      return false;
    },
    isImportant: function isImportant(entry) {
      return entry.Activity.Priority === 'High';
    },
    isOverdue: function isOverdue(entry) {
      if (entry.Activity.StartDate) {
        var startDate = _Convert2.default.toDateFromString(entry.Activity.StartDate);
        var currentDate = new Date();
        var seconds = Math.round((currentDate - startDate) / 1000);
        var mins = seconds / 60;
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

      var start = moment(entry.Activity.StartDate);
      return this._isTimelessToday(start);
    },
    isRecurring: function isRecurring(entry) {
      if (entry.Activity.Recurring) {
        return true;
      }

      return false;
    },
    getItemIconClass: function getItemIconClass(entry) {
      var type = entry && entry.Activity && entry.Activity.Type;
      return this._getItemIconClass(type);
    },
    getItemActionKey: function getItemActionKey(entry) {
      return entry.Activity.$key;
    },
    getItemDescriptor: function getItemDescriptor(entry) {
      return entry.Activity.$descriptor;
    },
    getTitle: function getTitle(entry) {
      if (!entry || !entry.Activity) {
        return '';
      }

      return this._model && this._model.getEntityDescription(entry.Activity) || entry.Activity.$descriptor;
    },
    hasContactOrLead: function hasContactOrLead(theAction, selection) {
      return selection.data.Activity.ContactId || selection.data.Activity.LeadId;
    },
    navigateToContactOrLead: function navigateToContactOrLead(theAction, selection) {
      var entry = selection.data.Activity;
      var entity = this.resolveContactOrLeadEntity(entry);
      var viewId = void 0;
      var options = void 0;

      switch (entity) {
        case 'Contact':
          viewId = 'contact_detail';
          options = {
            key: entry.ContactId,
            descriptor: entry.ContactName
          };
          break;
        case 'Lead':
          viewId = 'lead_detail';
          options = {
            key: entry.LeadId,
            descriptor: entry.LeadName
          };
          break;
        default:
      }

      var view = App.getView(viewId);

      if (view && options) {
        view.show(options);
      }
    },
    navigateToDetailView: function navigateToDetailView(key, descriptor, additionalOptions) {
      var myListOptions = additionalOptions || {};
      myListOptions.returnTo = this.id;
      this.inherited(arguments, [key, descriptor, myListOptions]);
    },
    resolveContactOrLeadEntity: function resolveContactOrLeadEntity(entry) {
      var exists = this.existsRE;

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
      var tempEntry = {
        $name: 'History',
        Type: 'atPhoneCall',
        ContactName: entry.Activity.ContactName,
        ContactId: entry.Activity.ContactId,
        AccountName: entry.Activity.AccountName,
        AccountId: entry.Activity.AccountId,
        Description: _string2.default.substitute(this.calledText, [entry.Activity.ContactName || '']),
        UserId: App.context && App.context.user.$key,
        UserName: App.context && App.context.user.UserName,
        Duration: 15,
        CompletedDate: new Date()
      };

      this.navigateToHistoryInsert('atPhoneCall', tempEntry, complete);
    },

    navigateToHistoryInsert: function navigateToHistoryInsert(type, entry, complete) {
      var view = App.getView(this.historyEditView);
      if (view) {
        _Environment2.default.refreshActivityLists();
        view.show({
          title: _ActivityTypeText2.default[type],
          template: {},
          entry: entry,
          insert: true
        }, {
          complete: complete
        });
      }
    },
    createBriefcaseEntity: function createBriefcaseEntity(entry) {
      var entity = {
        entityId: entry.Activity.$key,
        entityName: 'Activity',
        options: {
          includeRelated: true,
          viewId: this.detailView,
          iconClass: this.getItemIconClass(entry)
        }
      };
      return entity;
    },
    activateEntry: function activateEntry(params) {
      var entry = this.entries[params.myActivityKey];
      if (entry) {
        var activityParams = params;
        activityParams.descriptor = this._model.getEntityDescription(entry.Activity);
        this.inherited(activateEntry, arguments, [activityParams]);
      } else {
        this.inherited(activateEntry, arguments);
      }
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});