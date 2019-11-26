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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BY3Rpdml0eS9NeUxpc3QuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJoYXNoVGFnUmVzb3VyY2UiLCJfX2NsYXNzIiwiZm9ybWF0Iiwicm93VGVtcGxhdGUiLCJTaW1wbGF0ZSIsImFjdGl2aXR5VGltZVRlbXBsYXRlIiwiaXRlbVRlbXBsYXRlIiwibmFtZVRlbXBsYXRlIiwidGl0bGVUZXh0IiwiY29tcGxldGVBY3Rpdml0eVRleHQiLCJhY2NlcHRBY3Rpdml0eVRleHQiLCJkZWNsaW5lQWN0aXZpdHlUZXh0IiwiY2FsbFRleHQiLCJjYWxsZWRUZXh0IiwiYWRkQXR0YWNobWVudEFjdGlvblRleHQiLCJ2aWV3Q29udGFjdEFjdGlvblRleHQiLCJ2aWV3QWNjb3VudEFjdGlvblRleHQiLCJ2aWV3T3Bwb3J0dW5pdHlBY3Rpb25UZXh0IiwiaWQiLCJlbnRpdHlOYW1lIiwibW9kZWxOYW1lIiwiVVNFUkFDVElWSVRZIiwiZW5hYmxlT2ZmbGluZSIsImhpc3RvcnlFZGl0VmlldyIsImV4aXN0c1JFIiwicXVlcnlXaGVyZSIsIkFwcCIsImNvbnRleHQiLCJ1c2VyIiwiJGtleSIsInF1ZXJ5T3JkZXJCeSIsInF1ZXJ5U2VsZWN0IiwicmVzb3VyY2VLaW5kIiwiYWxsb3dTZWxlY3Rpb24iLCJlbmFibGVBY3Rpb25zIiwiaGFzaFRhZ1F1ZXJpZXMiLCJhbGFybSIsInJlY3VycmluZyIsInRpbWVsZXNzIiwieWVzdGVyZGF5Iiwibm93IiwibW9tZW50IiwieWVzdGVyZGF5U3RhcnQiLCJjbG9uZSIsInN1YnRyYWN0Iiwic3RhcnRPZiIsInllc3RlcmRheUVuZCIsImVuZE9mIiwidGhlUXVlcnkiLCJ0b0lzb1N0cmluZ0Zyb21EYXRlIiwidG9EYXRlIiwidG9kYXkiLCJ0b2RheVN0YXJ0IiwidG9kYXlFbmQiLCJ0aGlzV2VlayIsIndlZWtTdGFydERhdGUiLCJ3ZWVrRW5kRGF0ZSIsImhhc2hUYWdRdWVyaWVzVGV4dCIsImhhc2hUYWdBbGFybVRleHQiLCJoYXNoVGFnVW5jb25maXJtZWRUZXh0IiwiaGFzaFRhZ0FjY2VwdGVkVGV4dCIsImhhc2hUYWdEZWNsaW5lZFRleHQiLCJoYXNoVGFnUmVjdXJyaW5nVGV4dCIsImhhc2hUYWdUaW1lbGVzc1RleHQiLCJoYXNoVGFnVG9kYXlUZXh0IiwiaGFzaFRhZ1RoaXNXZWVrVGV4dCIsImhhc2hUYWdZZXN0ZXJkYXlUZXh0IiwiY3JlYXRlVG9vbExheW91dCIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsInRvb2xzIiwidGJhciIsIl9yZWZyZXNoQWRkZWQiLCJ3aW5kb3ciLCJzdXBwb3J0c1RvdWNoIiwicHVzaCIsInN2ZyIsImFjdGlvbiIsIl9yZWZyZXNoQ2xpY2tlZCIsImNsZWFyIiwicmVmcmVzaFJlcXVpcmVkIiwicmVmcmVzaCIsIm9uUmVmcmVzaENsaWNrZWQiLCJfY2FsbFBob25lIiwicGFyYW1zIiwiaW52b2tlQWN0aW9uSXRlbUJ5IiwidGhlQWN0aW9uIiwia2V5IiwiZGVmYXVsdFNlYXJjaFRlcm0iLCJlbmFibGVIYXNoVGFncyIsImhhc2h0YWciLCJzdGFydHNXaXRoIiwiY3JlYXRlQWN0aW9uTGF5b3V0IiwiYWN0aW9ucyIsImxhYmVsIiwiZW5hYmxlZCIsInNlbGVjdGlvbiIsImVudHJ5IiwiZGF0YSIsIkFjdGl2aXR5IiwiQWNjb3VudElkIiwiZm4iLCJ2aWV3SWQiLCJvcHRpb25zIiwiZGVzY3JpcHRvciIsIkFjY291bnROYW1lIiwidmlldyIsImdldFZpZXciLCJzaG93IiwiT3Bwb3J0dW5pdHlJZCIsIk9wcG9ydHVuaXR5TmFtZSIsImhhc0NvbnRhY3RPckxlYWQiLCJjbHMiLCJyZWN1ciIsIlJlY3VycmluZyIsIkxlYWRlciIsIkNvbXBsZXRlZERhdGUiLCJEYXRlIiwiUmVzdWx0IiwicmVmcmVzaEFjdGl2aXR5TGlzdHMiLCJjb21wbGV0ZUFjdGl2aXR5IiwiYmluZERlbGVnYXRlIiwiU3RhdHVzIiwiY29uZmlybUFjdGl2aXR5Rm9yIiwiZGVjbGluZUFjdGl2aXR5Rm9yIiwiUGhvbmVOdW1iZXIiLCJwaG9uZSIsInJlY29yZENhbGxUb0hpc3RvcnkiLCJpbml0aWF0ZUNhbGwiLCJhZGRBdHRhY2htZW50Iiwic2VsZWN0RW50cnkiLCJyb3ciLCIkIiwiY29udGVudE5vZGUiLCJmaXJzdCIsImF0dHIiLCJfc2VsZWN0aW9uTW9kZWwiLCJzZWxlY3QiLCJlbnRyaWVzIiwiZ2V0Iiwic2luZ2xlU2VsZWN0Iiwic2luZ2xlU2VsZWN0QWN0aW9uIiwiaW52b2tlU2luZ2xlU2VsZWN0QWN0aW9uIiwiZm9ybWF0U2VhcmNoUXVlcnkiLCJzZWFyY2hRdWVyeSIsImVzY2FwZVNlYXJjaFF1ZXJ5IiwidG9VcHBlckNhc2UiLCJhY3Rpdml0eUlkIiwidXNlcklkIiwiX2dldFVzZXJOb3RpZmljYXRpb25zIiwiYWNjZXB0Iiwic3Vic3RyaW5nIiwicmVxIiwiU2FnZSIsIlNEYXRhIiwiQ2xpZW50IiwiU0RhdGFSZXNvdXJjZUNvbGxlY3Rpb25SZXF1ZXN0IiwiZ2V0U2VydmljZSIsInNldFJlc291cmNlS2luZCIsInNldENvbnRyYWN0TmFtZSIsInNldFF1ZXJ5QXJnIiwicmVhZCIsInN1Y2Nlc3MiLCJ1c2VyTm90aWZpY2F0aW9ucyIsIiRyZXNvdXJjZXMiLCJsZW5ndGgiLCJhY2NlcHRDb25maXJtYXRpb24iLCJkZWNsaW5lQ29uZmlybWF0aW9uIiwiZmFpbHVyZSIsIm9uUmVxdWVzdEZhaWx1cmUiLCJzY29wZSIsIm5vdGlmaWNhdGlvbiIsIl9wb3N0VXNlck5vdGlmaWNhdGlvbnMiLCJvcGVyYXRpb24iLCJwYXlsb2FkIiwiJG5hbWUiLCJyZXF1ZXN0IiwiZW50aXR5IiwiVXNlck5vdGlmaWNhdGlvbklkIiwiU0RhdGFTZXJ2aWNlT3BlcmF0aW9uUmVxdWVzdCIsInNldE9wZXJhdGlvbk5hbWUiLCJ0b0xvd2VyQ2FzZSIsImV4ZWN1dGUiLCJhY3Rpdml0eU1vZGVsIiwiTW9kZWxNYW5hZ2VyIiwiZ2V0TW9kZWwiLCJBQ1RJVklUWSIsIlNEQVRBIiwidGhlbiIsInB1Ymxpc2giLCJlcnIiLCJhZGRFcnJvciIsInJlc3BvbnNlIiwibyIsImhhc0FsYXJtIiwiQWxhcm0iLCJoYXNCZWVuVG91Y2hlZCIsIk1vZGlmeURhdGUiLCJtb2RpZmllZERhdGUiLCJ0b0RhdGVGcm9tU3RyaW5nIiwiY3VycmVudERhdGUiLCJ3ZWVrQWdvIiwiaXNBZnRlciIsImlzQmVmb3JlIiwiaXNJbXBvcnRhbnQiLCJQcmlvcml0eSIsImlzT3ZlcmR1ZSIsIlN0YXJ0RGF0ZSIsInN0YXJ0RGF0ZSIsInNlY29uZHMiLCJNYXRoIiwicm91bmQiLCJtaW5zIiwiaXNUaW1lbGVzc1RvZGF5IiwiVGltZWxlc3MiLCJzdGFydCIsIl9pc1RpbWVsZXNzVG9kYXkiLCJpc1JlY3VycmluZyIsImdldEl0ZW1JY29uQ2xhc3MiLCJ0eXBlIiwiVHlwZSIsIl9nZXRJdGVtSWNvbkNsYXNzIiwiZ2V0SXRlbUFjdGlvbktleSIsImdldEl0ZW1EZXNjcmlwdG9yIiwiJGRlc2NyaXB0b3IiLCJnZXRUaXRsZSIsIl9tb2RlbCIsImdldEVudGl0eURlc2NyaXB0aW9uIiwiQ29udGFjdElkIiwiTGVhZElkIiwibmF2aWdhdGVUb0NvbnRhY3RPckxlYWQiLCJyZXNvbHZlQ29udGFjdE9yTGVhZEVudGl0eSIsIkNvbnRhY3ROYW1lIiwiTGVhZE5hbWUiLCJuYXZpZ2F0ZVRvRGV0YWlsVmlldyIsImFkZGl0aW9uYWxPcHRpb25zIiwibXlMaXN0T3B0aW9ucyIsInJldHVyblRvIiwiZXhpc3RzIiwidGVzdCIsImNvbXBsZXRlIiwidGVtcEVudHJ5IiwiRGVzY3JpcHRpb24iLCJzdWJzdGl0dXRlIiwiVXNlcklkIiwiVXNlck5hbWUiLCJEdXJhdGlvbiIsIm5hdmlnYXRlVG9IaXN0b3J5SW5zZXJ0IiwidGl0bGUiLCJ0ZW1wbGF0ZSIsImluc2VydCIsImNyZWF0ZUJyaWVmY2FzZUVudGl0eSIsImVudGl0eUlkIiwiaW5jbHVkZVJlbGF0ZWQiLCJkZXRhaWxWaWV3IiwiaWNvbkNsYXNzIiwiYWN0aXZhdGVFbnRyeSIsIm15QWN0aXZpdHlLZXkiLCJhY3Rpdml0eVBhcmFtcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQStCQSxNQUFNQSxXQUFXLG9CQUFZLGdCQUFaLENBQWpCO0FBQ0EsTUFBTUMsa0JBQWtCLG9CQUFZLHdCQUFaLENBQXhCOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQSxNQUFNQyxVQUFVLHVCQUFRLDJCQUFSLEVBQXFDLDRDQUFyQyxFQUF3RTtBQUN0RkMsNEJBRHNGO0FBRXRGO0FBQ0E7QUFDQUMsaUJBQWEsSUFBSUMsUUFBSixDQUFhLHErQkFBYixDQUp5RTtBQXlCdEZDLDBCQUFzQixJQUFJRCxRQUFKLENBQWEsQ0FDakMsb0NBRGlDLEVBRWpDLHNCQUZpQyxFQUdqQyxnQkFIaUMsRUFJakMsbUdBSmlDLEVBSW9FO0FBQ3JHLGFBTGlDLENBQWIsQ0F6QmdFO0FBZ0N0RkUsa0JBQWMsSUFBSUYsUUFBSixDQUFhLENBQ3pCLDhCQUR5QixFQUV6Qix5UkFGeUIsRUFHekIsTUFIeUIsRUFJekIsd0JBSnlCLEVBS3pCLGdDQUx5QixFQU16QixNQU55QixFQU96QixrREFQeUIsRUFRekIsd0JBUnlCLEVBU3pCLHFDQVR5QixFQVV6QixvSUFWeUIsRUFVNkc7QUFDdEksYUFYeUIsRUFZekIsTUFaeUIsQ0FBYixDQWhDd0U7QUE4Q3RGRyxrQkFBYyxJQUFJSCxRQUFKLENBQWEsQ0FDekIscUNBRHlCLEVBRXpCLCtEQUZ5QixFQUd6Qiw0Q0FIeUIsRUFJekIsK0JBSnlCLEVBS3pCLGdCQUx5QixFQU16Qiw0QkFOeUIsRUFPekIsU0FQeUIsQ0FBYixDQTlDd0U7O0FBd0R0RjtBQUNBSSxlQUFXVCxTQUFTUyxTQXpEa0U7QUEwRHRGQywwQkFBc0JWLFNBQVNVLG9CQTFEdUQ7QUEyRHRGQyx3QkFBb0JYLFNBQVNXLGtCQTNEeUQ7QUE0RHRGQyx5QkFBcUJaLFNBQVNZLG1CQTVEd0Q7QUE2RHRGQyxjQUFVYixTQUFTYSxRQTdEbUU7QUE4RHRGQyxnQkFBWWQsU0FBU2MsVUE5RGlFO0FBK0R0RkMsNkJBQXlCZixTQUFTZSx1QkEvRG9EO0FBZ0V0RkMsMkJBQXVCaEIsU0FBU2dCLHFCQWhFc0Q7QUFpRXRGQywyQkFBdUJqQixTQUFTaUIscUJBakVzRDtBQWtFdEZDLCtCQUEyQmxCLFNBQVNrQix5QkFsRWtEOztBQW9FdEY7QUFDQUMsUUFBSSxpQkFyRWtGO0FBc0V0RkMsZ0JBQVksY0F0RTBFO0FBdUV0RkMsZUFBVyxnQkFBWUMsWUF2RStEO0FBd0V0RkMsbUJBQWUsSUF4RXVFO0FBeUV0RkMscUJBQWlCLGNBekVxRTtBQTBFdEZDLGNBQVUsWUExRTRFO0FBMkV0RkMsZ0JBQVksU0FBU0EsVUFBVCxHQUFzQjtBQUNoQyw4QkFBc0JDLElBQUlDLE9BQUosQ0FBWUMsSUFBWixDQUFpQkMsSUFBdkM7QUFDRCxLQTdFcUY7QUE4RXRGQyxrQkFBYyx5QkE5RXdFO0FBK0V0RkMsaUJBQWEsQ0FDWCxPQURXLEVBRVgsV0FGVyxFQUdYLFFBSFcsRUFJWCxzQkFKVyxFQUtYLG9CQUxXLEVBTVgsa0JBTlcsRUFPWCxlQVBXLEVBUVgsc0JBUlcsRUFTWCxvQkFUVyxFQVVYLG9CQVZXLEVBV1gsc0JBWFcsRUFZWCxpQkFaVyxFQWFYLG1CQWJXLEVBY1gsaUJBZFcsRUFlWCx3QkFmVyxFQWdCWCxtQkFoQlcsRUFpQlgsaUJBakJXLEVBa0JYLG1CQWxCVyxFQW1CWCxzQkFuQlcsRUFvQlgsb0JBcEJXLEVBcUJYLGdCQXJCVyxFQXNCWCxxQkF0QlcsRUF1QlgsbUJBdkJXLENBL0V5RTtBQXdHdEZDLGtCQUFjLGdCQXhHd0U7QUF5R3RGQyxvQkFBZ0IsSUF6R3NFO0FBMEd0RkMsbUJBQWUsSUExR3VFO0FBMkd0RkMsb0JBQWdCO0FBQ2RDLGFBQU8sd0JBRE87QUFFZCw0QkFBc0IsMkJBRlI7QUFHZCx5QkFBbUIsd0JBSEw7QUFJZCx5QkFBbUIsdUJBSkw7QUFLZEMsaUJBQVcsNEJBTEc7QUFNZEMsZ0JBQVUsMkJBTkk7QUFPZEMsaUJBQVcsU0FBU0EsU0FBVCxHQUFxQjtBQUM5QixZQUFNQyxNQUFNQyxRQUFaO0FBQ0EsWUFBTUMsaUJBQWlCRixJQUFJRyxLQUFKLEdBQVlDLFFBQVosQ0FBcUIsQ0FBckIsRUFBd0IsTUFBeEIsRUFBZ0NDLE9BQWhDLENBQXdDLEtBQXhDLENBQXZCO0FBQ0EsWUFBTUMsZUFBZUosZUFBZUMsS0FBZixHQUF1QkksS0FBdkIsQ0FBNkIsS0FBN0IsQ0FBckI7O0FBRUEsWUFBTUMsNkVBQTJFLGtCQUFRQyxtQkFBUixDQUE0QlAsZUFBZVEsTUFBZixFQUE1QixDQUEzRSxlQUF5SSxrQkFBUUQsbUJBQVIsQ0FBNEJILGFBQWFJLE1BQWIsRUFBNUIsQ0FBekkseUVBQStQUixlQUFleEMsTUFBZixDQUFzQix3QkFBdEIsQ0FBL1AsZUFBd1Q0QyxhQUFhNUMsTUFBYixDQUFvQix3QkFBcEIsQ0FBeFQsUUFBTjtBQUNBLGVBQU84QyxRQUFQO0FBQ0QsT0FkYTtBQWVkRyxhQUFPLFNBQVNBLEtBQVQsR0FBaUI7QUFDdEIsWUFBTVgsTUFBTUMsUUFBWjtBQUNBLFlBQU1XLGFBQWFaLElBQUlHLEtBQUosR0FBWUUsT0FBWixDQUFvQixLQUFwQixDQUFuQjtBQUNBLFlBQU1RLFdBQVdELFdBQVdULEtBQVgsR0FBbUJJLEtBQW5CLENBQXlCLEtBQXpCLENBQWpCOztBQUVBLFlBQU1DLDZFQUEyRSxrQkFBUUMsbUJBQVIsQ0FBNEJHLFdBQVdGLE1BQVgsRUFBNUIsQ0FBM0UsZUFBcUksa0JBQVFELG1CQUFSLENBQTRCSSxTQUFTSCxNQUFULEVBQTVCLENBQXJJLHlFQUF1UEUsV0FBV2xELE1BQVgsQ0FBa0Isd0JBQWxCLENBQXZQLGVBQTRTbUQsU0FBU25ELE1BQVQsQ0FBZ0Isd0JBQWhCLENBQTVTLFFBQU47QUFDQSxlQUFPOEMsUUFBUDtBQUNELE9BdEJhO0FBdUJkLG1CQUFhLFNBQVNNLFFBQVQsR0FBb0I7QUFDL0IsWUFBTWQsTUFBTUMsUUFBWjtBQUNBLFlBQU1jLGdCQUFnQmYsSUFBSUcsS0FBSixHQUFZRSxPQUFaLENBQW9CLE1BQXBCLENBQXRCO0FBQ0EsWUFBTVcsY0FBY0QsY0FBY1osS0FBZCxHQUFzQkksS0FBdEIsQ0FBNEIsTUFBNUIsQ0FBcEI7O0FBRUEsWUFBTUMsNkVBQTJFLGtCQUFRQyxtQkFBUixDQUE0Qk0sY0FBY0wsTUFBZCxFQUE1QixDQUEzRSxlQUF3SSxrQkFBUUQsbUJBQVIsQ0FBNEJPLFlBQVlOLE1BQVosRUFBNUIsQ0FBeEkseUVBQTZQSyxjQUFjckQsTUFBZCxDQUFxQix3QkFBckIsQ0FBN1AsZUFBcVRzRCxZQUFZdEQsTUFBWixDQUFtQix3QkFBbkIsQ0FBclQsUUFBTjtBQUNBLGVBQU84QyxRQUFQO0FBQ0Q7QUE5QmEsS0EzR3NFO0FBMkl0RlMsd0JBQW9CO0FBQ2xCckIsYUFBT3BDLGdCQUFnQjBELGdCQURMO0FBRWxCLDRCQUFzQjFELGdCQUFnQjJELHNCQUZwQjtBQUdsQix5QkFBbUIzRCxnQkFBZ0I0RCxtQkFIakI7QUFJbEIseUJBQW1CNUQsZ0JBQWdCNkQsbUJBSmpCO0FBS2xCeEIsaUJBQVdyQyxnQkFBZ0I4RCxvQkFMVDtBQU1sQnhCLGdCQUFVdEMsZ0JBQWdCK0QsbUJBTlI7QUFPbEJaLGFBQU9uRCxnQkFBZ0JnRSxnQkFQTDtBQVFsQixtQkFBYWhFLGdCQUFnQmlFLG1CQVJYO0FBU2xCMUIsaUJBQVd2QyxnQkFBZ0JrRTtBQVRULEtBM0lrRTtBQXNKdEZDLHNCQUFrQixTQUFTQSxnQkFBVCxHQUE0QjtBQUM1QyxXQUFLQyxTQUFMLENBQWVELGdCQUFmLEVBQWlDRSxTQUFqQztBQUNBLFVBQUksS0FBS0MsS0FBTCxJQUFjLEtBQUtBLEtBQUwsQ0FBV0MsSUFBekIsSUFBaUMsQ0FBQyxLQUFLQyxhQUF2QyxJQUF3RCxDQUFDQyxPQUFPL0MsR0FBUCxDQUFXZ0QsYUFBWCxFQUE3RCxFQUF5RjtBQUN2RixhQUFLSixLQUFMLENBQVdDLElBQVgsQ0FBZ0JJLElBQWhCLENBQXFCO0FBQ25CekQsY0FBSSxTQURlO0FBRW5CMEQsZUFBSyxTQUZjO0FBR25CQyxrQkFBUTtBQUhXLFNBQXJCOztBQU1BLGFBQUtMLGFBQUwsR0FBcUIsSUFBckI7QUFDRDs7QUFFRCxhQUFPLEtBQUtGLEtBQVo7QUFDRCxLQW5LcUY7QUFvS3RGRSxtQkFBZSxLQXBLdUU7QUFxS3RGTSxxQkFBaUIsU0FBU0EsZUFBVCxHQUEyQjtBQUMxQyxXQUFLQyxLQUFMO0FBQ0EsV0FBS0MsZUFBTCxHQUF1QixJQUF2QjtBQUNBLFdBQUtDLE9BQUw7O0FBRUE7QUFDQSxXQUFLQyxnQkFBTDtBQUNELEtBNUtxRjtBQTZLdEZBLHNCQUFrQixTQUFTQSxnQkFBVCxHQUE0QixDQUFFLENBN0tzQztBQThLdEZDLGdCQUFZLFNBQVNBLFVBQVQsQ0FBb0JDLE1BQXBCLEVBQTRCO0FBQ3RDLFdBQUtDLGtCQUFMLENBQXdCLFVBQUNDLFNBQUQsRUFBZTtBQUNyQyxlQUFPQSxVQUFVcEUsRUFBVixLQUFpQixNQUF4QjtBQUNELE9BRkQsRUFFR2tFLE9BQU9HLEdBRlY7QUFHRCxLQWxMcUY7QUFtTHRGQyx1QkFBbUIsU0FBU0EsaUJBQVQsR0FBNkI7QUFDOUMsVUFBSTlELElBQUkrRCxjQUFSLEVBQXdCO0FBQ3RCLFlBQU1DLFVBQVUsS0FBS2pDLGtCQUFMLENBQXdCLFdBQXhCLENBQWhCO0FBQ0EsWUFBSSxPQUFPaUMsT0FBUCxLQUFtQixRQUFuQixJQUErQkEsUUFBUUMsVUFBUixDQUFtQixHQUFuQixDQUFuQyxFQUE0RDtBQUMxRCxpQkFBT0QsT0FBUDtBQUNEOztBQUVELHFCQUFXQSxPQUFYO0FBQ0Q7O0FBRUQsYUFBTyxFQUFQO0FBQ0QsS0E5THFGO0FBK0x0RkUsd0JBQW9CLFNBQVNBLGtCQUFULEdBQThCO0FBQ2hELGFBQU8sS0FBS0MsT0FBTCxLQUFpQixLQUFLQSxPQUFMLEdBQWUsQ0FBQztBQUN0QzNFLFlBQUksYUFEa0M7QUFFdEM0RSxlQUFPLEtBQUs5RSxxQkFGMEI7QUFHdEMrRSxpQkFBUyxTQUFTQSxPQUFULENBQWlCVCxTQUFqQixFQUE0QlUsU0FBNUIsRUFBdUM7QUFDOUMsY0FBTUMsUUFBUUQsYUFBYUEsVUFBVUUsSUFBckM7QUFDQSxjQUFJLENBQUNELEtBQUwsRUFBWTtBQUNWLG1CQUFPLEtBQVA7QUFDRDtBQUNELGNBQUlBLE1BQU1FLFFBQU4sQ0FBZUMsU0FBbkIsRUFBOEI7QUFDNUIsbUJBQU8sSUFBUDtBQUNEO0FBQ0QsaUJBQU8sS0FBUDtBQUNELFNBWnFDO0FBYXRDQyxZQUFJLFNBQVNBLEVBQVQsQ0FBWWYsU0FBWixFQUF1QlUsU0FBdkIsRUFBa0M7QUFDcEMsY0FBTU0sU0FBUyxnQkFBZjtBQUNBLGNBQU1DLFVBQVU7QUFDZGhCLGlCQUFLUyxVQUFVRSxJQUFWLENBQWVDLFFBQWYsQ0FBd0JDLFNBRGY7QUFFZEksd0JBQVlSLFVBQVVFLElBQVYsQ0FBZUMsUUFBZixDQUF3Qk07QUFGdEIsV0FBaEI7O0FBS0EsY0FBTUMsT0FBT2hGLElBQUlpRixPQUFKLENBQVlMLE1BQVosQ0FBYjtBQUNBLGNBQUlJLFFBQVFILE9BQVosRUFBcUI7QUFDbkJHLGlCQUFLRSxJQUFMLENBQVVMLE9BQVY7QUFDRDtBQUNGO0FBeEJxQyxPQUFELEVBeUJwQztBQUNEckYsWUFBSSxpQkFESDtBQUVENEUsZUFBTyxLQUFLN0UseUJBRlg7QUFHRDhFLGlCQUFTLFNBQVNBLE9BQVQsQ0FBaUJULFNBQWpCLEVBQTRCVSxTQUE1QixFQUF1QztBQUM5QyxjQUFNQyxRQUFRRCxhQUFhQSxVQUFVRSxJQUFyQztBQUNBLGNBQUksQ0FBQ0QsS0FBTCxFQUFZO0FBQ1YsbUJBQU8sS0FBUDtBQUNEO0FBQ0QsY0FBSUEsTUFBTUUsUUFBTixDQUFlVSxhQUFuQixFQUFrQztBQUNoQyxtQkFBTyxJQUFQO0FBQ0Q7QUFDRCxpQkFBTyxLQUFQO0FBQ0QsU0FaQTtBQWFEUixZQUFJLFNBQVNBLEVBQVQsQ0FBWWYsU0FBWixFQUF1QlUsU0FBdkIsRUFBa0M7QUFDcEMsY0FBTU0sU0FBUyxvQkFBZjtBQUNBLGNBQU1DLFVBQVU7QUFDZGhCLGlCQUFLUyxVQUFVRSxJQUFWLENBQWVDLFFBQWYsQ0FBd0JVLGFBRGY7QUFFZEwsd0JBQVlSLFVBQVVFLElBQVYsQ0FBZUMsUUFBZixDQUF3Qlc7QUFGdEIsV0FBaEI7QUFJQSxjQUFNSixPQUFPaEYsSUFBSWlGLE9BQUosQ0FBWUwsTUFBWixDQUFiO0FBQ0EsY0FBSUksUUFBUUgsT0FBWixFQUFxQjtBQUNuQkcsaUJBQUtFLElBQUwsQ0FBVUwsT0FBVjtBQUNEO0FBQ0Y7QUF2QkEsT0F6Qm9DLEVBaURwQztBQUNEckYsWUFBSSxhQURIO0FBRUQ0RSxlQUFPLEtBQUsvRSxxQkFGWDtBQUdEOEQsZ0JBQVEseUJBSFA7QUFJRGtCLGlCQUFTLEtBQUtnQjtBQUpiLE9BakRvQyxFQXNEcEM7QUFDRDdGLFlBQUksVUFESDtBQUVEOEYsYUFBSywwQkFGSjtBQUdEbEIsZUFBTyxLQUFLckYsb0JBSFg7QUFJRHNGLGlCQUFTLFNBQVNBLE9BQVQsQ0FBaUJULFNBQWpCLEVBQTRCVSxTQUE1QixFQUF1QztBQUM5QyxjQUFNQyxRQUFRRCxhQUFhQSxVQUFVRSxJQUFyQztBQUNBLGNBQUksQ0FBQ0QsS0FBTCxFQUFZO0FBQ1YsbUJBQU8sS0FBUDtBQUNEOztBQUVELGNBQU1nQixRQUFRaEIsTUFBTUUsUUFBTixDQUFlZSxTQUE3Qjs7QUFFQSxpQkFBT2pCLE1BQU1FLFFBQU4sQ0FBZWdCLE1BQWYsQ0FBc0J0RixJQUF0QixLQUErQkgsSUFBSUMsT0FBSixDQUFZQyxJQUFaLENBQWlCQyxJQUFoRCxJQUF3RCxDQUFDb0YsS0FBaEU7QUFDRCxTQWJBO0FBY0RaLFlBQUssU0FBU0EsRUFBVCxDQUFZZixTQUFaLEVBQXVCVSxTQUF2QixFQUFrQztBQUNyQyxjQUFNQyxRQUFRRCxhQUFhQSxVQUFVRSxJQUF2QixJQUErQkYsVUFBVUUsSUFBVixDQUFlQyxRQUE1RDs7QUFFQUYsZ0JBQU1tQixhQUFOLEdBQXNCLElBQUlDLElBQUosRUFBdEI7QUFDQXBCLGdCQUFNcUIsTUFBTixHQUFlLFVBQWY7O0FBRUEsZ0NBQVlDLG9CQUFaO0FBQ0EsZUFBS0MsZ0JBQUwsQ0FBc0J2QixLQUF0QjtBQUNELFNBUkcsQ0FRRHdCLFlBUkMsQ0FRWSxJQVJaO0FBZEgsT0F0RG9DLEVBNkVwQztBQUNEdkcsWUFBSSxRQURIO0FBRUQ4RixhQUFLLG1CQUZKO0FBR0RsQixlQUFPLEtBQUtwRixrQkFIWDtBQUlEcUYsaUJBQVMsU0FBU0EsT0FBVCxDQUFpQlQsU0FBakIsRUFBNEJVLFNBQTVCLEVBQXVDO0FBQzlDLGNBQU1DLFFBQVFELGFBQWFBLFVBQVVFLElBQXJDO0FBQ0EsY0FBSSxDQUFDRCxLQUFMLEVBQVk7QUFDVixtQkFBTyxLQUFQO0FBQ0Q7O0FBRUQsaUJBQU9BLE1BQU15QixNQUFOLEtBQWlCLGVBQXhCO0FBQ0QsU0FYQTtBQVlEckIsWUFBSyxTQUFTQSxFQUFULENBQVlmLFNBQVosRUFBdUJVLFNBQXZCLEVBQWtDO0FBQ3JDLGNBQU1DLFFBQVFELGFBQWFBLFVBQVVFLElBQXJDO0FBQ0EsZ0NBQVlxQixvQkFBWjtBQUNBLGVBQUtJLGtCQUFMLENBQXdCMUIsTUFBTUUsUUFBTixDQUFldEUsSUFBdkMsRUFBNkNILElBQUlDLE9BQUosQ0FBWUMsSUFBWixDQUFpQkMsSUFBOUQ7QUFDRCxTQUpHLENBSUQ0RixZQUpDLENBSVksSUFKWjtBQVpILE9BN0VvQyxFQThGcEM7QUFDRHZHLFlBQUksU0FESDtBQUVEOEYsYUFBSyxpQkFGSjtBQUdEbEIsZUFBTyxLQUFLbkYsbUJBSFg7QUFJRG9GLGlCQUFTLFNBQVNBLE9BQVQsQ0FBaUJULFNBQWpCLEVBQTRCVSxTQUE1QixFQUF1QztBQUM5QyxjQUFNQyxRQUFRRCxhQUFhQSxVQUFVRSxJQUFyQztBQUNBLGNBQUksQ0FBQ0QsS0FBTCxFQUFZO0FBQ1YsbUJBQU8sS0FBUDtBQUNEOztBQUVELGlCQUFPQSxNQUFNeUIsTUFBTixLQUFpQixlQUF4QjtBQUNELFNBWEE7QUFZRHJCLFlBQUssU0FBU0EsRUFBVCxDQUFZZixTQUFaLEVBQXVCVSxTQUF2QixFQUFrQztBQUNyQyxjQUFNQyxRQUFRRCxhQUFhQSxVQUFVRSxJQUFyQzs7QUFFQSxnQ0FBWXFCLG9CQUFaO0FBQ0EsZUFBS0ssa0JBQUwsQ0FBd0IzQixNQUFNRSxRQUFOLENBQWV0RSxJQUF2QyxFQUE2Q0gsSUFBSUMsT0FBSixDQUFZQyxJQUFaLENBQWlCQyxJQUE5RDtBQUNELFNBTEcsQ0FLRDRGLFlBTEMsQ0FLWSxJQUxaO0FBWkgsT0E5Rm9DLEVBZ0hwQztBQUNEdkcsWUFBSSxNQURIO0FBRUQ4RixhQUFLLE9BRko7QUFHRGxCLGVBQU8sS0FBS2xGLFFBSFg7QUFJRG1GLGlCQUFTLFNBQVNBLE9BQVQsQ0FBaUJULFNBQWpCLEVBQTRCVSxTQUE1QixFQUF1QztBQUM5QyxjQUFNQyxRQUFRRCxhQUFhQSxVQUFVRSxJQUFyQztBQUNBLGlCQUFPRCxTQUFTQSxNQUFNRSxRQUFmLElBQTJCRixNQUFNRSxRQUFOLENBQWUwQixXQUFqRDtBQUNELFNBUEE7QUFRRHhCLFlBQUksU0FBU0EsRUFBVCxDQUFZZixTQUFaLEVBQXVCVSxTQUF2QixFQUFrQztBQUNwQyxjQUFNQyxRQUFRRCxhQUFhQSxVQUFVRSxJQUFyQztBQUNBLGNBQU00QixRQUFRN0IsU0FBU0EsTUFBTUUsUUFBZixJQUEyQkYsTUFBTUUsUUFBTixDQUFlMEIsV0FBeEQ7QUFDQSxjQUFJQyxLQUFKLEVBQVc7QUFDVCxpQkFBS0MsbUJBQUwsQ0FBeUIsU0FBU0MsWUFBVCxHQUF3QjtBQUMvQ3RHLGtCQUFJc0csWUFBSixDQUFpQkYsS0FBakI7QUFDRCxhQUZ3QixDQUV2QkwsWUFGdUIsQ0FFVixJQUZVLENBQXpCLEVBRXNCeEIsS0FGdEI7QUFHRDtBQUNGLFNBUkcsQ0FRRndCLFlBUkUsQ0FRVyxJQVJYO0FBUkgsT0FoSG9DLEVBaUlwQztBQUNEdkcsWUFBSSxlQURIO0FBRUQ4RixhQUFLLFFBRko7QUFHRGxCLGVBQU8sS0FBS2hGLHVCQUhYO0FBSUR1RixZQUFJLGlCQUFPNEIsYUFBUCxDQUFxQlIsWUFBckIsQ0FBa0MsSUFBbEM7QUFKSCxPQWpJb0MsQ0FBaEMsQ0FBUDtBQXVJRCxLQXZVcUY7QUF3VXRGUyxpQkFBYSxTQUFTQSxXQUFULENBQXFCOUMsTUFBckIsRUFBNkI7QUFDeEM7Ozs7QUFJQSxVQUFNK0MsTUFBTUMsbUJBQWdCaEQsT0FBT0csR0FBdkIsVUFBZ0MsS0FBSzhDLFdBQXJDLEVBQWtEQyxLQUFsRCxFQUFaO0FBQ0EsVUFBTS9DLE1BQU00QyxNQUFNQSxJQUFJSSxJQUFKLENBQVMsc0JBQVQsQ0FBTixHQUF5QyxLQUFyRDs7QUFFQSxVQUFJLEtBQUtDLGVBQUwsSUFBd0JqRCxHQUE1QixFQUFpQztBQUMvQixhQUFLaUQsZUFBTCxDQUFxQkMsTUFBckIsQ0FBNEJsRCxHQUE1QixFQUFpQyxLQUFLbUQsT0FBTCxDQUFhbkQsR0FBYixDQUFqQyxFQUFvRDRDLElBQUlRLEdBQUosQ0FBUSxDQUFSLENBQXBEO0FBQ0Q7O0FBRUQsVUFBSSxLQUFLcEMsT0FBTCxDQUFhcUMsWUFBYixJQUE2QixLQUFLckMsT0FBTCxDQUFhc0Msa0JBQTFDLElBQWdFLENBQUMsS0FBSzNHLGFBQTFFLEVBQXlGO0FBQ3ZGLGFBQUs0Ryx3QkFBTDtBQUNEO0FBQ0YsS0F2VnFGO0FBd1Z0RkMsdUJBQW1CLFNBQVNBLGlCQUFULENBQTJCQyxXQUEzQixFQUF3QztBQUN6RCxxREFBNkMsS0FBS0MsaUJBQUwsQ0FBdUJELFlBQVlFLFdBQVosRUFBdkIsQ0FBN0M7QUFDRCxLQTFWcUY7QUEyVnRGdEIsd0JBQW9CLFNBQVNBLGtCQUFULENBQTRCdUIsVUFBNUIsRUFBd0NDLE1BQXhDLEVBQWdEO0FBQ2xFLFdBQUtDLHFCQUFMLENBQTJCRixVQUEzQixFQUF1Q0MsTUFBdkMsRUFBK0MsS0FBL0M7QUFDRCxLQTdWcUY7QUE4VnRGekIsd0JBQW9CLFNBQVNBLGtCQUFULENBQTRCd0IsVUFBNUIsRUFBd0NDLE1BQXhDLEVBQWdEO0FBQ2xFLFdBQUtDLHFCQUFMLENBQTJCRixVQUEzQixFQUF1Q0MsTUFBdkMsRUFBK0MsSUFBL0M7QUFDRCxLQWhXcUY7QUFpV3RGQywyQkFBdUIsU0FBU0EscUJBQVQsQ0FBK0JGLFVBQS9CLEVBQTJDQyxNQUEzQyxFQUFtREUsTUFBbkQsRUFBMkQ7QUFDaEYsVUFBSXBJLEtBQUtpSSxVQUFUO0FBQ0EsVUFBSUEsVUFBSixFQUFnQjtBQUNkakksYUFBS2lJLFdBQVdJLFNBQVgsQ0FBcUIsQ0FBckIsRUFBd0IsRUFBeEIsQ0FBTDtBQUNEOztBQUVELFVBQU1DLE1BQU0sSUFBSUMsS0FBS0MsS0FBTCxDQUFXQyxNQUFYLENBQWtCQyw4QkFBdEIsQ0FBcUQsS0FBS0MsVUFBTCxFQUFyRCxDQUFaO0FBQ0FMLFVBQUlNLGVBQUosQ0FBb0IsbUJBQXBCO0FBQ0FOLFVBQUlPLGVBQUosQ0FBb0IsU0FBcEI7QUFDQVAsVUFBSVEsV0FBSixDQUFnQixPQUFoQix1QkFBMkM5SSxFQUEzQyw4QkFBb0VrSSxNQUFwRTtBQUNBSSxVQUFJUSxXQUFKLENBQWdCLFlBQWhCLEVBQThCLEdBQTlCO0FBQ0FSLFVBQUlTLElBQUosQ0FBUztBQUNQQyxpQkFBUyxTQUFTQSxPQUFULENBQWlCQyxpQkFBakIsRUFBb0M7QUFDM0MsY0FBSUEsa0JBQWtCQyxVQUFsQixJQUFnQ0Qsa0JBQWtCQyxVQUFsQixDQUE2QkMsTUFBN0IsR0FBc0MsQ0FBMUUsRUFBNkU7QUFDM0UsZ0JBQUlmLE1BQUosRUFBWTtBQUNWLG1CQUFLZ0Isa0JBQUwsQ0FBd0JILGtCQUFrQkMsVUFBbEIsQ0FBNkIsQ0FBN0IsQ0FBeEI7QUFDRCxhQUZELE1BRU87QUFDTCxtQkFBS0csbUJBQUwsQ0FBeUJKLGtCQUFrQkMsVUFBbEIsQ0FBNkIsQ0FBN0IsQ0FBekI7QUFDRDtBQUNGO0FBQ0YsU0FUTTtBQVVQSSxpQkFBUyxLQUFLQyxnQkFWUDtBQVdQQyxlQUFPO0FBWEEsT0FBVDtBQWFELEtBelhxRjtBQTBYdEZILHlCQUFxQixTQUFTQSxtQkFBVCxDQUE2QkksWUFBN0IsRUFBMkM7QUFDOUQsV0FBS0Msc0JBQUwsQ0FBNEJELFlBQTVCLEVBQTBDLFNBQTFDO0FBQ0QsS0E1WHFGO0FBNlh0Rkwsd0JBQW9CLFNBQVNBLGtCQUFULENBQTRCSyxZQUE1QixFQUEwQztBQUM1RCxXQUFLQyxzQkFBTCxDQUE0QkQsWUFBNUIsRUFBMEMsUUFBMUM7QUFDRCxLQS9YcUY7QUFnWXRGQyw0QkFBd0IsU0FBU0Esc0JBQVQsQ0FBZ0NELFlBQWhDLEVBQThDRSxTQUE5QyxFQUF5RDtBQUMvRSxVQUFJLENBQUNGLFlBQUQsSUFBaUIsT0FBT0UsU0FBUCxLQUFxQixRQUExQyxFQUFvRDtBQUNsRDtBQUNEO0FBQ0Q7Ozs7QUFJQSxVQUFNQyxVQUFVO0FBQ2RDLGVBQU9GLFNBRE87QUFFZEcsaUJBQVM7QUFDUEMsa0JBQVFOLFlBREQ7QUFFUE8sOEJBQW9CUCxhQUFhOUk7QUFGMUI7QUFGSyxPQUFoQjs7QUFRQSxVQUFNbUosVUFBVSxJQUFJdkIsS0FBS0MsS0FBTCxDQUFXQyxNQUFYLENBQWtCd0IsNEJBQXRCLENBQW1ELEtBQUt0QixVQUFMLEVBQW5ELEVBQ2JFLGVBRGEsQ0FDRyxTQURILEVBRWJELGVBRmEsQ0FFRyxtQkFGSCxFQUdic0IsZ0JBSGEsQ0FHSVAsVUFBVVEsV0FBVixFQUhKLENBQWhCO0FBSUFMLGNBQVFNLE9BQVIsQ0FBZ0JSLE9BQWhCLEVBQXlCO0FBQ3ZCWixpQkFBUyxTQUFTQSxPQUFULEdBQW1CO0FBQzFCLGVBQUtuRixLQUFMO0FBQ0EsZUFBS0UsT0FBTDtBQUNELFNBSnNCO0FBS3ZCdUYsaUJBQVMsS0FBS0MsZ0JBTFM7QUFNdkJDLGVBQU87QUFOZ0IsT0FBekI7QUFRRCxLQTVacUY7QUE2WnRGbEQsc0JBQWtCLFNBQVNBLGdCQUFULENBQTBCdkIsS0FBMUIsRUFBaUM7QUFBQTs7QUFDakQsVUFBTXNGLGdCQUFnQjdKLElBQUk4SixZQUFKLENBQWlCQyxRQUFqQixDQUEwQixnQkFBWUMsUUFBdEMsRUFBZ0QsZ0JBQVlDLEtBQTVELENBQXRCO0FBQ0EsVUFBSUosYUFBSixFQUFtQjtBQUNqQkEsc0JBQWMvRCxnQkFBZCxDQUErQnZCLEtBQS9CLEVBQXNDMkYsSUFBdEMsQ0FBMkMsWUFBTTtBQUMvQyw0QkFBUUMsT0FBUixDQUFnQixjQUFoQixFQUFnQyxDQUFDO0FBQy9CN0osMEJBQWM7QUFEaUIsV0FBRCxDQUFoQzs7QUFJQSxnQkFBSytDLEtBQUw7QUFDQSxnQkFBS0UsT0FBTDtBQUNELFNBUEQsRUFPRyxVQUFDNkcsR0FBRCxFQUFTO0FBQ1YsaUNBQWFDLFFBQWIsQ0FBc0JELEdBQXRCLFNBQWlDLEVBQWpDLEVBQXFDLFNBQXJDO0FBQ0QsU0FURDtBQVVEO0FBQ0YsS0EzYXFGO0FBNGF0RnJCLHNCQUFrQixTQUFTQSxnQkFBVCxDQUEwQnVCLFFBQTFCLEVBQW9DQyxDQUFwQyxFQUF1QztBQUN2RCw2QkFBYUYsUUFBYixDQUFzQkMsUUFBdEIsRUFBZ0NDLENBQWhDLEVBQW1DLEVBQW5DLEVBQXVDLFNBQXZDO0FBQ0QsS0E5YXFGO0FBK2F0RkMsY0FBVSxTQUFTQSxRQUFULENBQWtCakcsS0FBbEIsRUFBeUI7QUFDakMsVUFBSUEsTUFBTUUsUUFBTixJQUFrQkYsTUFBTUUsUUFBTixDQUFlZ0csS0FBZixLQUF5QixJQUEvQyxFQUFxRDtBQUNuRCxlQUFPLElBQVA7QUFDRDs7QUFFRCxhQUFPLEtBQVA7QUFDRCxLQXJicUY7QUFzYnRGQyxvQkFBZ0IsU0FBU0EsY0FBVCxDQUF3Qm5HLEtBQXhCLEVBQStCO0FBQzdDLFVBQUlBLE1BQU1FLFFBQU4sQ0FBZWtHLFVBQW5CLEVBQStCO0FBQzdCLFlBQU1DLGVBQWU3SixPQUFPLGtCQUFROEosZ0JBQVIsQ0FBeUJ0RyxNQUFNRSxRQUFOLENBQWVrRyxVQUF4QyxDQUFQLENBQXJCO0FBQ0EsWUFBTUcsY0FBYy9KLFNBQVNNLEtBQVQsQ0FBZSxLQUFmLENBQXBCO0FBQ0EsWUFBTTBKLFVBQVVoSyxTQUFTRyxRQUFULENBQWtCLENBQWxCLEVBQXFCLE9BQXJCLENBQWhCOztBQUVBLGVBQU8wSixhQUFhSSxPQUFiLENBQXFCRCxPQUFyQixLQUNMSCxhQUFhSyxRQUFiLENBQXNCSCxXQUF0QixDQURGO0FBRUQ7O0FBRUQsYUFBTyxLQUFQO0FBQ0QsS0FqY3FGO0FBa2N0RkksaUJBQWEsU0FBU0EsV0FBVCxDQUFxQjNHLEtBQXJCLEVBQTRCO0FBQ3ZDLGFBQU9BLE1BQU1FLFFBQU4sQ0FBZTBHLFFBQWYsS0FBNEIsTUFBbkM7QUFDRCxLQXBjcUY7QUFxY3RGQyxlQUFXLFNBQVNBLFNBQVQsQ0FBbUI3RyxLQUFuQixFQUEwQjtBQUNuQyxVQUFJQSxNQUFNRSxRQUFOLENBQWU0RyxTQUFuQixFQUE4QjtBQUM1QixZQUFNQyxZQUFZLGtCQUFRVCxnQkFBUixDQUF5QnRHLE1BQU1FLFFBQU4sQ0FBZTRHLFNBQXhDLENBQWxCO0FBQ0EsWUFBTVAsY0FBYyxJQUFJbkYsSUFBSixFQUFwQjtBQUNBLFlBQU00RixVQUFVQyxLQUFLQyxLQUFMLENBQVcsQ0FBQ1gsY0FBY1EsU0FBZixJQUE0QixJQUF2QyxDQUFoQjtBQUNBLFlBQU1JLE9BQU9ILFVBQVUsRUFBdkI7QUFDQSxZQUFJRyxRQUFRLENBQVosRUFBZTtBQUNiLGlCQUFPLElBQVA7QUFDRDtBQUNGO0FBQ0QsYUFBTyxLQUFQO0FBQ0QsS0FoZHFGO0FBaWR0RkMscUJBQWlCLFNBQVNBLGVBQVQsQ0FBeUJwSCxLQUF6QixFQUFnQztBQUMvQyxVQUFJLENBQUNBLEtBQUQsSUFBVSxDQUFDQSxNQUFNRSxRQUFqQixJQUE2QixDQUFDRixNQUFNRSxRQUFOLENBQWVtSCxRQUFqRCxFQUEyRDtBQUN6RCxlQUFPLEtBQVA7QUFDRDs7QUFFRCxVQUFNQyxRQUFROUssT0FBT3dELE1BQU1FLFFBQU4sQ0FBZTRHLFNBQXRCLENBQWQ7QUFDQSxhQUFPLEtBQUtTLGdCQUFMLENBQXNCRCxLQUF0QixDQUFQO0FBQ0QsS0F4ZHFGO0FBeWR0RkUsaUJBQWEsU0FBU0EsV0FBVCxDQUFxQnhILEtBQXJCLEVBQTRCO0FBQ3ZDLFVBQUlBLE1BQU1FLFFBQU4sQ0FBZWUsU0FBbkIsRUFBOEI7QUFDNUIsZUFBTyxJQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFQO0FBQ0QsS0EvZHFGO0FBZ2V0RndHLHNCQUFrQixTQUFTQSxnQkFBVCxDQUEwQnpILEtBQTFCLEVBQWlDO0FBQ2pELFVBQU0wSCxPQUFPMUgsU0FBU0EsTUFBTUUsUUFBZixJQUEyQkYsTUFBTUUsUUFBTixDQUFleUgsSUFBdkQ7QUFDQSxhQUFPLEtBQUtDLGlCQUFMLENBQXVCRixJQUF2QixDQUFQO0FBQ0QsS0FuZXFGO0FBb2V0Rkcsc0JBQWtCLFNBQVNBLGdCQUFULENBQTBCN0gsS0FBMUIsRUFBaUM7QUFDakQsYUFBT0EsTUFBTUUsUUFBTixDQUFldEUsSUFBdEI7QUFDRCxLQXRlcUY7QUF1ZXRGa00sdUJBQW1CLFNBQVNBLGlCQUFULENBQTJCOUgsS0FBM0IsRUFBa0M7QUFDbkQsYUFBT0EsTUFBTUUsUUFBTixDQUFlNkgsV0FBdEI7QUFDRCxLQXplcUY7QUEwZXRGQyxjQUFVLFNBQVNBLFFBQVQsQ0FBa0JoSSxLQUFsQixFQUF5QjtBQUNqQyxVQUFJLENBQUNBLEtBQUQsSUFBVSxDQUFDQSxNQUFNRSxRQUFyQixFQUErQjtBQUM3QixlQUFPLEVBQVA7QUFDRDs7QUFFRCxhQUFRLEtBQUsrSCxNQUFMLElBQWUsS0FBS0EsTUFBTCxDQUFZQyxvQkFBWixDQUFpQ2xJLE1BQU1FLFFBQXZDLENBQWhCLElBQXFFRixNQUFNRSxRQUFOLENBQWU2SCxXQUEzRjtBQUNELEtBaGZxRjtBQWlmdEZqSCxzQkFBa0IsU0FBU0EsZ0JBQVQsQ0FBMEJ6QixTQUExQixFQUFxQ1UsU0FBckMsRUFBZ0Q7QUFDaEUsYUFBUUEsVUFBVUUsSUFBVixDQUFlQyxRQUFmLENBQXdCaUksU0FBekIsSUFBd0NwSSxVQUFVRSxJQUFWLENBQWVDLFFBQWYsQ0FBd0JrSSxNQUF2RTtBQUNELEtBbmZxRjtBQW9mdEZDLDZCQUF5QixTQUFTQSx1QkFBVCxDQUFpQ2hKLFNBQWpDLEVBQTRDVSxTQUE1QyxFQUF1RDtBQUM5RSxVQUFNQyxRQUFRRCxVQUFVRSxJQUFWLENBQWVDLFFBQTdCO0FBQ0EsVUFBTThFLFNBQVMsS0FBS3NELDBCQUFMLENBQWdDdEksS0FBaEMsQ0FBZjtBQUNBLFVBQUlLLGVBQUo7QUFDQSxVQUFJQyxnQkFBSjs7QUFFQSxjQUFRMEUsTUFBUjtBQUNFLGFBQUssU0FBTDtBQUNFM0UsbUJBQVMsZ0JBQVQ7QUFDQUMsb0JBQVU7QUFDUmhCLGlCQUFLVSxNQUFNbUksU0FESDtBQUVSNUgsd0JBQVlQLE1BQU11STtBQUZWLFdBQVY7QUFJQTtBQUNGLGFBQUssTUFBTDtBQUNFbEksbUJBQVMsYUFBVDtBQUNBQyxvQkFBVTtBQUNSaEIsaUJBQUtVLE1BQU1vSSxNQURIO0FBRVI3SCx3QkFBWVAsTUFBTXdJO0FBRlYsV0FBVjtBQUlBO0FBQ0Y7QUFmRjs7QUFrQkEsVUFBTS9ILE9BQU9oRixJQUFJaUYsT0FBSixDQUFZTCxNQUFaLENBQWI7O0FBRUEsVUFBSUksUUFBUUgsT0FBWixFQUFxQjtBQUNuQkcsYUFBS0UsSUFBTCxDQUFVTCxPQUFWO0FBQ0Q7QUFDRixLQWpoQnFGO0FBa2hCdEZtSSwwQkFBc0IsU0FBU0Esb0JBQVQsQ0FBOEJuSixHQUE5QixFQUFtQ2lCLFVBQW5DLEVBQStDbUksaUJBQS9DLEVBQWtFO0FBQ3RGLFVBQU1DLGdCQUFnQkQscUJBQXFCLEVBQTNDO0FBQ0FDLG9CQUFjQyxRQUFkLEdBQXlCLEtBQUszTixFQUE5QjtBQUNBLFdBQUtrRCxTQUFMLENBQWVDLFNBQWYsRUFBMEIsQ0FBQ2tCLEdBQUQsRUFBTWlCLFVBQU4sRUFBa0JvSSxhQUFsQixDQUExQjtBQUNELEtBdGhCcUY7QUF1aEJ0RkwsZ0NBQTRCLFNBQVNBLDBCQUFULENBQW9DdEksS0FBcEMsRUFBMkM7QUFDckUsVUFBTTZJLFNBQVMsS0FBS3ROLFFBQXBCOztBQUVBLFVBQUl5RSxLQUFKLEVBQVc7QUFDVCxZQUFJNkksT0FBT0MsSUFBUCxDQUFZOUksTUFBTW9JLE1BQWxCLENBQUosRUFBK0I7QUFDN0IsaUJBQU8sTUFBUDtBQUNEO0FBQ0QsWUFBSVMsT0FBT0MsSUFBUCxDQUFZOUksTUFBTW1JLFNBQWxCLENBQUosRUFBa0M7QUFDaEMsaUJBQU8sU0FBUDtBQUNEO0FBQ0Y7QUFDRixLQWxpQnFGO0FBbWlCdEZyRyx5QkFBcUIsU0FBU0EsbUJBQVQsQ0FBNkJpSCxRQUE3QixFQUF1Qy9JLEtBQXZDLEVBQThDO0FBQ2pFLFVBQU1nSixZQUFZO0FBQ2hCbEUsZUFBTyxTQURTO0FBRWhCNkMsY0FBTSxhQUZVO0FBR2hCWSxxQkFBYXZJLE1BQU1FLFFBQU4sQ0FBZXFJLFdBSFo7QUFJaEJKLG1CQUFXbkksTUFBTUUsUUFBTixDQUFlaUksU0FKVjtBQUtoQjNILHFCQUFhUixNQUFNRSxRQUFOLENBQWVNLFdBTFo7QUFNaEJMLG1CQUFXSCxNQUFNRSxRQUFOLENBQWVDLFNBTlY7QUFPaEI4SSxxQkFBYSxpQkFBT0MsVUFBUCxDQUFrQixLQUFLdE8sVUFBdkIsRUFBbUMsQ0FBQ29GLE1BQU1FLFFBQU4sQ0FBZXFJLFdBQWYsSUFBOEIsRUFBL0IsQ0FBbkMsQ0FQRztBQVFoQlksZ0JBQVExTixJQUFJQyxPQUFKLElBQWVELElBQUlDLE9BQUosQ0FBWUMsSUFBWixDQUFpQkMsSUFSeEI7QUFTaEJ3TixrQkFBVTNOLElBQUlDLE9BQUosSUFBZUQsSUFBSUMsT0FBSixDQUFZQyxJQUFaLENBQWlCeU4sUUFUMUI7QUFVaEJDLGtCQUFVLEVBVk07QUFXaEJsSSx1QkFBZ0IsSUFBSUMsSUFBSjtBQVhBLE9BQWxCOztBQWNBLFdBQUtrSSx1QkFBTCxDQUE2QixhQUE3QixFQUE0Q04sU0FBNUMsRUFBdURELFFBQXZEO0FBQ0QsS0FuakJxRjs7QUFxakJ0Rk8sNkJBQXlCLFNBQVNBLHVCQUFULENBQWlDNUIsSUFBakMsRUFBdUMxSCxLQUF2QyxFQUE4QytJLFFBQTlDLEVBQXdEO0FBQy9FLFVBQU10SSxPQUFPaEYsSUFBSWlGLE9BQUosQ0FBWSxLQUFLcEYsZUFBakIsQ0FBYjtBQUNBLFVBQUltRixJQUFKLEVBQVU7QUFDUiw4QkFBWWEsb0JBQVo7QUFDQWIsYUFBS0UsSUFBTCxDQUFVO0FBQ1I0SSxpQkFBTywyQkFBaUI3QixJQUFqQixDQURDO0FBRVI4QixvQkFBVSxFQUZGO0FBR1J4SixzQkFIUTtBQUlSeUosa0JBQVE7QUFKQSxTQUFWLEVBS0c7QUFDRFY7QUFEQyxTQUxIO0FBUUQ7QUFDRixLQWxrQnFGO0FBbWtCdEZXLDJCQUF1QixTQUFTQSxxQkFBVCxDQUErQjFKLEtBQS9CLEVBQXNDO0FBQzNELFVBQU1nRixTQUFTO0FBQ2IyRSxrQkFBVTNKLE1BQU1FLFFBQU4sQ0FBZXRFLElBRFo7QUFFYlYsb0JBQVksVUFGQztBQUdib0YsaUJBQVM7QUFDUHNKLDBCQUFnQixJQURUO0FBRVB2SixrQkFBUSxLQUFLd0osVUFGTjtBQUdQQyxxQkFBVyxLQUFLckMsZ0JBQUwsQ0FBc0J6SCxLQUF0QjtBQUhKO0FBSEksT0FBZjtBQVNBLGFBQU9nRixNQUFQO0FBQ0QsS0E5a0JxRjtBQStrQnRGK0UsbUJBQWUsU0FBU0EsYUFBVCxDQUF1QjVLLE1BQXZCLEVBQStCO0FBQzVDLFVBQU1hLFFBQVEsS0FBS3lDLE9BQUwsQ0FBYXRELE9BQU82SyxhQUFwQixDQUFkO0FBQ0EsVUFBSWhLLEtBQUosRUFBVztBQUNULFlBQU1pSyxpQkFBaUI5SyxNQUF2QjtBQUNBOEssdUJBQWUxSixVQUFmLEdBQTRCLEtBQUswSCxNQUFMLENBQVlDLG9CQUFaLENBQWlDbEksTUFBTUUsUUFBdkMsQ0FBNUI7QUFDQSxhQUFLL0IsU0FBTCxDQUFlNEwsYUFBZixFQUE4QjNMLFNBQTlCLEVBQXlDLENBQUM2TCxjQUFELENBQXpDO0FBQ0QsT0FKRCxNQUlPO0FBQ0wsYUFBSzlMLFNBQUwsQ0FBZTRMLGFBQWYsRUFBOEIzTCxTQUE5QjtBQUNEO0FBQ0Y7QUF4bEJxRixHQUF4RSxDQUFoQjs7b0JBMmxCZXBFLE8iLCJmaWxlIjoiTXlMaXN0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGNvbm5lY3QgZnJvbSAnZG9qby9fYmFzZS9jb25uZWN0JztcclxuaW1wb3J0IGVudmlyb25tZW50IGZyb20gJy4uLy4uL0Vudmlyb25tZW50JztcclxuaW1wb3J0IEFjdGl2aXR5TGlzdCBmcm9tICcuL0xpc3QnO1xyXG5pbXBvcnQgY29udmVydCBmcm9tICdhcmdvcy9Db252ZXJ0JztcclxuaW1wb3J0IEVycm9yTWFuYWdlciBmcm9tICdhcmdvcy9FcnJvck1hbmFnZXInO1xyXG5pbXBvcnQgYWN0aW9uIGZyb20gJy4uLy4uL0FjdGlvbic7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnLi4vLi4vRm9ybWF0JztcclxuaW1wb3J0IF9MaXN0T2ZmbGluZU1peGluIGZyb20gJ2FyZ29zL09mZmxpbmUvX0xpc3RPZmZsaW5lTWl4aW4nO1xyXG5pbXBvcnQgTU9ERUxfVFlQRVMgZnJvbSAnYXJnb3MvTW9kZWxzL1R5cGVzJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBBY3Rpdml0eVR5cGVUZXh0IGZyb20gJy4uLy4uL01vZGVscy9BY3Rpdml0eS9BY3Rpdml0eVR5cGVUZXh0JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5pbXBvcnQgc3RyaW5nIGZyb20gJ2Rvam8vc3RyaW5nJztcclxuXHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdhY3Rpdml0eU15TGlzdCcpO1xyXG5jb25zdCBoYXNoVGFnUmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYWN0aXZpdHlNeUxpc3RIYXNoVGFncycpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuQWN0aXZpdHkuTXlMaXN0XHJcbiAqXHJcbiAqIEBleHRlbmRzIGNybS5WaWV3cy5BY3Rpdml0eS5MaXN0XHJcbiAqIEBtaXhpbnMgY3JtLlZpZXdzLkFjdGl2aXR5Lkxpc3RcclxuICpcclxuICogQHJlcXVpcmVzIGFyZ29zLkxpc3RcclxuICogQHJlcXVpcmVzIGFyZ29zLkZvcm1hdFxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuVXRpbGl0eVxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuQ29udmVydFxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuRXJyb3JNYW5hZ2VyXHJcbiAqXHJcbiAqIEByZXF1aXJlcyBjcm0uRm9ybWF0XHJcbiAqIEByZXF1aXJlcyBjcm0uRW52aXJvbm1lbnRcclxuICogQHJlcXVpcmVzIGNybS5WaWV3cy5BY3Rpdml0eS5MaXN0XHJcbiAqIEByZXF1aXJlcyBjcm0uQWN0aW9uXHJcbiAqXHJcbiAqIEByZXF1aXJlcyBtb21lbnRcclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuQWN0aXZpdHkuTXlMaXN0JywgW0FjdGl2aXR5TGlzdCwgX0xpc3RPZmZsaW5lTWl4aW5dLCB7XHJcbiAgZm9ybWF0LFxyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIC8vIENhcmQgVmlld1xyXG4gIHJvd1RlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgYDxkaXYgZGF0YS1hY3Rpb249XCJhY3RpdmF0ZUVudHJ5XCIgZGF0YS1teS1hY3Rpdml0eS1rZXk9XCJ7JT0gJC4ka2V5ICV9XCIgZGF0YS1rZXk9XCJ7JT0gJCQuZ2V0SXRlbUFjdGlvbktleSgkKSAlfVwiIGRhdGEtZGVzY3JpcHRvcj1cInslOiAkJC5nZXRJdGVtRGVzY3JpcHRvcigkKSAlfVwiIGRhdGEtYWN0aXZpdHktdHlwZT1cInslOiAkLkFjdGl2aXR5LlR5cGUgJX1cIj5cclxuICAgICAgPGRpdiBjbGFzcz1cIndpZGdldFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3aWRnZXQtaGVhZGVyXCI+XHJcbiAgICAgICAgICB7JSEgJCQuaXRlbUljb25UZW1wbGF0ZSAlfTxoMiBjbGFzcz1cIndpZGdldC10aXRsZVwiPnslOiAkJC5nZXRUaXRsZSgkKSAlfTwvaDI+XHJcbiAgICAgICAgICB7JSBpZigkJC52aXNpYmxlQWN0aW9ucy5sZW5ndGggPiAwICYmICQkLmVuYWJsZUFjdGlvbnMpIHsgJX1cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi1hY3Rpb25zXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtYWN0aW9uPVwic2VsZWN0RW50cnlcIiBkYXRhLWtleT1cInslPSAkJC5nZXRJdGVtQWN0aW9uS2V5KCQpICV9XCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhdWRpYmxlXCI+QWN0aW9uczwvc3Bhbj5cclxuICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwiaWNvblwiIGZvY3VzYWJsZT1cImZhbHNlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgcm9sZT1cInByZXNlbnRhdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPVwiI2ljb24tbW9yZVwiPjwvdXNlPlxyXG4gICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgeyUhICQkLmxpc3RBY3Rpb25UZW1wbGF0ZSAlfVxyXG4gICAgICAgICAgeyUgfSAlfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWNvbnRlbnRcIj5cclxuICAgICAgICAgIHslISAkJC5pdGVtUm93Q29udGVudFRlbXBsYXRlICV9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+YCxcclxuICBdKSxcclxuICBhY3Rpdml0eVRpbWVUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICd7JSBpZiAoJCQuaXNUaW1lbGVzc1RvZGF5KCQpKSB7ICV9JyxcclxuICAgICd7JTogJCQuYWxsRGF5VGV4dCAlfScsXHJcbiAgICAneyUgfSBlbHNlIHsgJX0nLFxyXG4gICAgJ3slOiAkJC5mb3JtYXQucmVsYXRpdmVEYXRlKCQuQWN0aXZpdHkuU3RhcnREYXRlLCBhcmdvcy5Db252ZXJ0LnRvQm9vbGVhbigkLkFjdGl2aXR5LlRpbWVsZXNzKSkgJX0nLCAvLyBUT0RPOiBBdm9pZCBnbG9iYWxcclxuICAgICd7JSB9ICV9JyxcclxuICBdKSxcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPHAgY2xhc3M9XCJsaXN0dmlldy1oZWFkaW5nXCI+JyxcclxuICAgICc8c3BhbiBjbGFzcz1cInAtZGVzY3JpcHRpb25cIj57JTogJCQuZm9ybWF0LnBpY2tsaXN0KCQkLmFwcC5waWNrbGlzdFNlcnZpY2UsIG51bGwsIG51bGwsICQkLmdldFBpY2tsaXN0QnlBY3Rpdml0eVR5cGUoJC5BY3Rpdml0eS5UeXBlLCBcIkRlc2NyaXB0aW9uXCIpKSgkLkFjdGl2aXR5LkRlc2NyaXB0aW9uKSAlfXslIGlmICgkLlN0YXR1cyA9PT0gXCJhc1VuY29uZmlybWVkXCIpIHsgJX0gKHslOiAkJC5mb3JtYXQudXNlckFjdGl2aXR5U3RhdHVzKCQuU3RhdHVzKSAlfSkgeyUgfSAlfTwvc3Bhbj4nLFxyXG4gICAgJzwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPicsXHJcbiAgICAneyUhICQkLmFjdGl2aXR5VGltZVRlbXBsYXRlICV9JyxcclxuICAgICc8L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj57JSEgJCQubmFtZVRlbXBsYXRlICV9PC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+JyxcclxuICAgICd7JSBpZiAoJC5BY3Rpdml0eS5QaG9uZU51bWJlcikgeyAlfScsXHJcbiAgICAnPHNwYW4gY2xhc3M9XCJoeXBlcmxpbmtcIiBkYXRhLWFjdGlvbj1cIl9jYWxsUGhvbmVcIiBkYXRhLWtleT1cInslOiAkLiRrZXkgJX1cIj57JTogYXJnb3MuRm9ybWF0LnBob25lKCQuQWN0aXZpdHkuUGhvbmVOdW1iZXIpICV9PC9zcGFuPicsIC8vIFRPRE86IEF2b2lkIGdsb2JhbFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gICAgJzwvcD4nLFxyXG4gIF0pLFxyXG4gIG5hbWVUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICd7JSBpZiAoJC5BY3Rpdml0eS5Db250YWN0TmFtZSkgeyAlfScsXHJcbiAgICAneyU6ICQuQWN0aXZpdHkuQ29udGFjdE5hbWUgJX0gfCB7JTogJC5BY3Rpdml0eS5BY2NvdW50TmFtZSAlfScsXHJcbiAgICAneyUgfSBlbHNlIGlmICgkLkFjdGl2aXR5LkFjY291bnROYW1lKSB7ICV9JyxcclxuICAgICd7JTogJC5BY3Rpdml0eS5BY2NvdW50TmFtZSAlfScsXHJcbiAgICAneyUgfSBlbHNlIHsgJX0nLFxyXG4gICAgJ3slOiAkLkFjdGl2aXR5LkxlYWROYW1lICV9JyxcclxuICAgICd7JSB9ICV9JyxcclxuICBdKSxcclxuXHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgY29tcGxldGVBY3Rpdml0eVRleHQ6IHJlc291cmNlLmNvbXBsZXRlQWN0aXZpdHlUZXh0LFxyXG4gIGFjY2VwdEFjdGl2aXR5VGV4dDogcmVzb3VyY2UuYWNjZXB0QWN0aXZpdHlUZXh0LFxyXG4gIGRlY2xpbmVBY3Rpdml0eVRleHQ6IHJlc291cmNlLmRlY2xpbmVBY3Rpdml0eVRleHQsXHJcbiAgY2FsbFRleHQ6IHJlc291cmNlLmNhbGxUZXh0LFxyXG4gIGNhbGxlZFRleHQ6IHJlc291cmNlLmNhbGxlZFRleHQsXHJcbiAgYWRkQXR0YWNobWVudEFjdGlvblRleHQ6IHJlc291cmNlLmFkZEF0dGFjaG1lbnRBY3Rpb25UZXh0LFxyXG4gIHZpZXdDb250YWN0QWN0aW9uVGV4dDogcmVzb3VyY2Uudmlld0NvbnRhY3RBY3Rpb25UZXh0LFxyXG4gIHZpZXdBY2NvdW50QWN0aW9uVGV4dDogcmVzb3VyY2Uudmlld0FjY291bnRBY3Rpb25UZXh0LFxyXG4gIHZpZXdPcHBvcnR1bml0eUFjdGlvblRleHQ6IHJlc291cmNlLnZpZXdPcHBvcnR1bml0eUFjdGlvblRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnbXlhY3Rpdml0eV9saXN0JyxcclxuICBlbnRpdHlOYW1lOiAnVXNlckFjdGl2aXR5JyxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLlVTRVJBQ1RJVklUWSxcclxuICBlbmFibGVPZmZsaW5lOiB0cnVlLFxyXG4gIGhpc3RvcnlFZGl0VmlldzogJ2hpc3RvcnlfZWRpdCcsXHJcbiAgZXhpc3RzUkU6IC9eW1xcd117MTJ9JC8sXHJcbiAgcXVlcnlXaGVyZTogZnVuY3Rpb24gcXVlcnlXaGVyZSgpIHtcclxuICAgIHJldHVybiBgVXNlci5JZCBlcSBcIiR7QXBwLmNvbnRleHQudXNlci4ka2V5fVwiIGFuZCBTdGF0dXMgbmUgXCJhc0RlY2xuZWRcIiBhbmQgQWN0aXZpdHkuVHlwZSBuZSBcImF0TGl0ZXJhdHVyZVwiYDtcclxuICB9LFxyXG4gIHF1ZXJ5T3JkZXJCeTogJ0FjdGl2aXR5LlN0YXJ0RGF0ZSBkZXNjJyxcclxuICBxdWVyeVNlbGVjdDogW1xyXG4gICAgJ0FsYXJtJyxcclxuICAgICdBbGFybVRpbWUnLFxyXG4gICAgJ1N0YXR1cycsXHJcbiAgICAnQWN0aXZpdHkvRGVzY3JpcHRpb24nLFxyXG4gICAgJ0FjdGl2aXR5L1N0YXJ0RGF0ZScsXHJcbiAgICAnQWN0aXZpdHkvRW5kRGF0ZScsXHJcbiAgICAnQWN0aXZpdHkvVHlwZScsXHJcbiAgICAnQWN0aXZpdHkvQWNjb3VudE5hbWUnLFxyXG4gICAgJ0FjdGl2aXR5L0FjY291bnRJZCcsXHJcbiAgICAnQWN0aXZpdHkvQ29udGFjdElkJyxcclxuICAgICdBY3Rpdml0eS9Db250YWN0TmFtZScsXHJcbiAgICAnQWN0aXZpdHkvTGVhZGVyJyxcclxuICAgICdBY3Rpdml0eS9MZWFkTmFtZScsXHJcbiAgICAnQWN0aXZpdHkvTGVhZElkJyxcclxuICAgICdBY3Rpdml0eS9PcHBvcnR1bml0eUlkJyxcclxuICAgICdBY3Rpdml0eS9UaWNrZXRJZCcsXHJcbiAgICAnQWN0aXZpdHkvVXNlcklkJyxcclxuICAgICdBY3Rpdml0eS9UaW1lbGVzcycsXHJcbiAgICAnQWN0aXZpdHkvUGhvbmVOdW1iZXInLFxyXG4gICAgJ0FjdGl2aXR5L1JlY3VycmluZycsXHJcbiAgICAnQWN0aXZpdHkvQWxhcm0nLFxyXG4gICAgJ0FjdGl2aXR5L01vZGlmeURhdGUnLFxyXG4gICAgJ0FjdGl2aXR5L1ByaW9yaXR5JyxcclxuICBdLFxyXG4gIHJlc291cmNlS2luZDogJ3VzZXJBY3Rpdml0aWVzJyxcclxuICBhbGxvd1NlbGVjdGlvbjogdHJ1ZSxcclxuICBlbmFibGVBY3Rpb25zOiB0cnVlLFxyXG4gIGhhc2hUYWdRdWVyaWVzOiB7XHJcbiAgICBhbGFybTogJ0FjdGl2aXR5LkFsYXJtIGVxIHRydWUnLFxyXG4gICAgJ3N0YXR1cy11bmNvbmZpcm1lZCc6ICdTdGF0dXMgZXEgXCJhc1VuY29uZmlybWVkXCInLFxyXG4gICAgJ3N0YXR1cy1hY2NlcHRlZCc6ICdTdGF0dXMgZXEgXCJhc0FjY2VwdGVkXCInLFxyXG4gICAgJ3N0YXR1cy1kZWNsaW5lZCc6ICdTdGF0dXMgZXEgXCJhc0RlY2xuZWRcIicsXHJcbiAgICByZWN1cnJpbmc6ICdBY3Rpdml0eS5SZWN1cnJpbmcgZXEgdHJ1ZScsXHJcbiAgICB0aW1lbGVzczogJ0FjdGl2aXR5LlRpbWVsZXNzIGVxIHRydWUnLFxyXG4gICAgeWVzdGVyZGF5OiBmdW5jdGlvbiB5ZXN0ZXJkYXkoKSB7XHJcbiAgICAgIGNvbnN0IG5vdyA9IG1vbWVudCgpO1xyXG4gICAgICBjb25zdCB5ZXN0ZXJkYXlTdGFydCA9IG5vdy5jbG9uZSgpLnN1YnRyYWN0KDEsICdkYXlzJykuc3RhcnRPZignZGF5Jyk7XHJcbiAgICAgIGNvbnN0IHllc3RlcmRheUVuZCA9IHllc3RlcmRheVN0YXJ0LmNsb25lKCkuZW5kT2YoJ2RheScpO1xyXG5cclxuICAgICAgY29uc3QgdGhlUXVlcnkgPSBgKChBY3Rpdml0eS5UaW1lbGVzcyBlcSBmYWxzZSBhbmQgQWN0aXZpdHkuU3RhcnREYXRlIGJldHdlZW4gQCR7Y29udmVydC50b0lzb1N0cmluZ0Zyb21EYXRlKHllc3RlcmRheVN0YXJ0LnRvRGF0ZSgpKX1AIGFuZCBAJHtjb252ZXJ0LnRvSXNvU3RyaW5nRnJvbURhdGUoeWVzdGVyZGF5RW5kLnRvRGF0ZSgpKX1AKSBvciAoQWN0aXZpdHkuVGltZWxlc3MgZXEgdHJ1ZSBhbmQgQWN0aXZpdHkuU3RhcnREYXRlIGJldHdlZW4gQCR7eWVzdGVyZGF5U3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREVDAwOjAwOjAwW1pdJyl9QCBhbmQgQCR7eWVzdGVyZGF5RW5kLmZvcm1hdCgnWVlZWS1NTS1ERFQyMzo1OTo1OVtaXScpfUApKWA7XHJcbiAgICAgIHJldHVybiB0aGVRdWVyeTtcclxuICAgIH0sXHJcbiAgICB0b2RheTogZnVuY3Rpb24gdG9kYXkoKSB7XHJcbiAgICAgIGNvbnN0IG5vdyA9IG1vbWVudCgpO1xyXG4gICAgICBjb25zdCB0b2RheVN0YXJ0ID0gbm93LmNsb25lKCkuc3RhcnRPZignZGF5Jyk7XHJcbiAgICAgIGNvbnN0IHRvZGF5RW5kID0gdG9kYXlTdGFydC5jbG9uZSgpLmVuZE9mKCdkYXknKTtcclxuXHJcbiAgICAgIGNvbnN0IHRoZVF1ZXJ5ID0gYCgoQWN0aXZpdHkuVGltZWxlc3MgZXEgZmFsc2UgYW5kIEFjdGl2aXR5LlN0YXJ0RGF0ZSBiZXR3ZWVuIEAke2NvbnZlcnQudG9Jc29TdHJpbmdGcm9tRGF0ZSh0b2RheVN0YXJ0LnRvRGF0ZSgpKX1AIGFuZCBAJHtjb252ZXJ0LnRvSXNvU3RyaW5nRnJvbURhdGUodG9kYXlFbmQudG9EYXRlKCkpfUApIG9yIChBY3Rpdml0eS5UaW1lbGVzcyBlcSB0cnVlIGFuZCBBY3Rpdml0eS5TdGFydERhdGUgYmV0d2VlbiBAJHt0b2RheVN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERFQwMDowMDowMFtaXScpfUAgYW5kIEAke3RvZGF5RW5kLmZvcm1hdCgnWVlZWS1NTS1ERFQyMzo1OTo1OVtaXScpfUApKWA7XHJcbiAgICAgIHJldHVybiB0aGVRdWVyeTtcclxuICAgIH0sXHJcbiAgICAndGhpcy13ZWVrJzogZnVuY3Rpb24gdGhpc1dlZWsoKSB7XHJcbiAgICAgIGNvbnN0IG5vdyA9IG1vbWVudCgpO1xyXG4gICAgICBjb25zdCB3ZWVrU3RhcnREYXRlID0gbm93LmNsb25lKCkuc3RhcnRPZignd2VlaycpO1xyXG4gICAgICBjb25zdCB3ZWVrRW5kRGF0ZSA9IHdlZWtTdGFydERhdGUuY2xvbmUoKS5lbmRPZignd2VlaycpO1xyXG5cclxuICAgICAgY29uc3QgdGhlUXVlcnkgPSBgKChBY3Rpdml0eS5UaW1lbGVzcyBlcSBmYWxzZSBhbmQgQWN0aXZpdHkuU3RhcnREYXRlIGJldHdlZW4gQCR7Y29udmVydC50b0lzb1N0cmluZ0Zyb21EYXRlKHdlZWtTdGFydERhdGUudG9EYXRlKCkpfUAgYW5kIEAke2NvbnZlcnQudG9Jc29TdHJpbmdGcm9tRGF0ZSh3ZWVrRW5kRGF0ZS50b0RhdGUoKSl9QCkgb3IgKEFjdGl2aXR5LlRpbWVsZXNzIGVxIHRydWUgYW5kIEFjdGl2aXR5LlN0YXJ0RGF0ZSBiZXR3ZWVuIEAke3dlZWtTdGFydERhdGUuZm9ybWF0KCdZWVlZLU1NLUREVDAwOjAwOjAwW1pdJyl9QCBhbmQgQCR7d2Vla0VuZERhdGUuZm9ybWF0KCdZWVlZLU1NLUREVDIzOjU5OjU5W1pdJyl9QCkpYDtcclxuICAgICAgcmV0dXJuIHRoZVF1ZXJ5O1xyXG4gICAgfSxcclxuICB9LFxyXG4gIGhhc2hUYWdRdWVyaWVzVGV4dDoge1xyXG4gICAgYWxhcm06IGhhc2hUYWdSZXNvdXJjZS5oYXNoVGFnQWxhcm1UZXh0LFxyXG4gICAgJ3N0YXR1cy11bmNvbmZpcm1lZCc6IGhhc2hUYWdSZXNvdXJjZS5oYXNoVGFnVW5jb25maXJtZWRUZXh0LFxyXG4gICAgJ3N0YXR1cy1hY2NlcHRlZCc6IGhhc2hUYWdSZXNvdXJjZS5oYXNoVGFnQWNjZXB0ZWRUZXh0LFxyXG4gICAgJ3N0YXR1cy1kZWNsaW5lZCc6IGhhc2hUYWdSZXNvdXJjZS5oYXNoVGFnRGVjbGluZWRUZXh0LFxyXG4gICAgcmVjdXJyaW5nOiBoYXNoVGFnUmVzb3VyY2UuaGFzaFRhZ1JlY3VycmluZ1RleHQsXHJcbiAgICB0aW1lbGVzczogaGFzaFRhZ1Jlc291cmNlLmhhc2hUYWdUaW1lbGVzc1RleHQsXHJcbiAgICB0b2RheTogaGFzaFRhZ1Jlc291cmNlLmhhc2hUYWdUb2RheVRleHQsXHJcbiAgICAndGhpcy13ZWVrJzogaGFzaFRhZ1Jlc291cmNlLmhhc2hUYWdUaGlzV2Vla1RleHQsXHJcbiAgICB5ZXN0ZXJkYXk6IGhhc2hUYWdSZXNvdXJjZS5oYXNoVGFnWWVzdGVyZGF5VGV4dCxcclxuICB9LFxyXG4gIGNyZWF0ZVRvb2xMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZVRvb2xMYXlvdXQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChjcmVhdGVUb29sTGF5b3V0LCBhcmd1bWVudHMpO1xyXG4gICAgaWYgKHRoaXMudG9vbHMgJiYgdGhpcy50b29scy50YmFyICYmICF0aGlzLl9yZWZyZXNoQWRkZWQgJiYgIXdpbmRvdy5BcHAuc3VwcG9ydHNUb3VjaCgpKSB7XHJcbiAgICAgIHRoaXMudG9vbHMudGJhci5wdXNoKHtcclxuICAgICAgICBpZDogJ3JlZnJlc2gnLFxyXG4gICAgICAgIHN2ZzogJ3JlZnJlc2gnLFxyXG4gICAgICAgIGFjdGlvbjogJ19yZWZyZXNoQ2xpY2tlZCcsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5fcmVmcmVzaEFkZGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy50b29scztcclxuICB9LFxyXG4gIF9yZWZyZXNoQWRkZWQ6IGZhbHNlLFxyXG4gIF9yZWZyZXNoQ2xpY2tlZDogZnVuY3Rpb24gX3JlZnJlc2hDbGlja2VkKCkge1xyXG4gICAgdGhpcy5jbGVhcigpO1xyXG4gICAgdGhpcy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5yZWZyZXNoKCk7XHJcblxyXG4gICAgLy8gSG9vayBmb3IgY3VzdG9taXplcnNcclxuICAgIHRoaXMub25SZWZyZXNoQ2xpY2tlZCgpO1xyXG4gIH0sXHJcbiAgb25SZWZyZXNoQ2xpY2tlZDogZnVuY3Rpb24gb25SZWZyZXNoQ2xpY2tlZCgpIHt9LFxyXG4gIF9jYWxsUGhvbmU6IGZ1bmN0aW9uIF9jYWxsUGhvbmUocGFyYW1zKSB7XHJcbiAgICB0aGlzLmludm9rZUFjdGlvbkl0ZW1CeSgodGhlQWN0aW9uKSA9PiB7XHJcbiAgICAgIHJldHVybiB0aGVBY3Rpb24uaWQgPT09ICdjYWxsJztcclxuICAgIH0sIHBhcmFtcy5rZXkpO1xyXG4gIH0sXHJcbiAgZGVmYXVsdFNlYXJjaFRlcm06IGZ1bmN0aW9uIGRlZmF1bHRTZWFyY2hUZXJtKCkge1xyXG4gICAgaWYgKEFwcC5lbmFibGVIYXNoVGFncykge1xyXG4gICAgICBjb25zdCBoYXNodGFnID0gdGhpcy5oYXNoVGFnUXVlcmllc1RleHRbJ3RoaXMtd2VlayddO1xyXG4gICAgICBpZiAodHlwZW9mIGhhc2h0YWcgPT09ICdzdHJpbmcnICYmIGhhc2h0YWcuc3RhcnRzV2l0aCgnIycpKSB7XHJcbiAgICAgICAgcmV0dXJuIGhhc2h0YWc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBgIyR7aGFzaHRhZ31gO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAnJztcclxuICB9LFxyXG4gIGNyZWF0ZUFjdGlvbkxheW91dDogZnVuY3Rpb24gY3JlYXRlQWN0aW9uTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aW9ucyB8fCAodGhpcy5hY3Rpb25zID0gW3tcclxuICAgICAgaWQ6ICd2aWV3QWNjb3VudCcsXHJcbiAgICAgIGxhYmVsOiB0aGlzLnZpZXdBY2NvdW50QWN0aW9uVGV4dCxcclxuICAgICAgZW5hYmxlZDogZnVuY3Rpb24gZW5hYmxlZCh0aGVBY3Rpb24sIHNlbGVjdGlvbikge1xyXG4gICAgICAgIGNvbnN0IGVudHJ5ID0gc2VsZWN0aW9uICYmIHNlbGVjdGlvbi5kYXRhO1xyXG4gICAgICAgIGlmICghZW50cnkpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGVudHJ5LkFjdGl2aXR5LkFjY291bnRJZCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfSxcclxuICAgICAgZm46IGZ1bmN0aW9uIGZuKHRoZUFjdGlvbiwgc2VsZWN0aW9uKSB7XHJcbiAgICAgICAgY29uc3Qgdmlld0lkID0gJ2FjY291bnRfZGV0YWlsJztcclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAga2V5OiBzZWxlY3Rpb24uZGF0YS5BY3Rpdml0eS5BY2NvdW50SWQsXHJcbiAgICAgICAgICBkZXNjcmlwdG9yOiBzZWxlY3Rpb24uZGF0YS5BY3Rpdml0eS5BY2NvdW50TmFtZSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcodmlld0lkKTtcclxuICAgICAgICBpZiAodmlldyAmJiBvcHRpb25zKSB7XHJcbiAgICAgICAgICB2aWV3LnNob3cob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ3ZpZXdPcHBvcnR1bml0eScsXHJcbiAgICAgIGxhYmVsOiB0aGlzLnZpZXdPcHBvcnR1bml0eUFjdGlvblRleHQsXHJcbiAgICAgIGVuYWJsZWQ6IGZ1bmN0aW9uIGVuYWJsZWQodGhlQWN0aW9uLCBzZWxlY3Rpb24pIHtcclxuICAgICAgICBjb25zdCBlbnRyeSA9IHNlbGVjdGlvbiAmJiBzZWxlY3Rpb24uZGF0YTtcclxuICAgICAgICBpZiAoIWVudHJ5KSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlbnRyeS5BY3Rpdml0eS5PcHBvcnR1bml0eUlkKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9LFxyXG4gICAgICBmbjogZnVuY3Rpb24gZm4odGhlQWN0aW9uLCBzZWxlY3Rpb24pIHtcclxuICAgICAgICBjb25zdCB2aWV3SWQgPSAnb3Bwb3J0dW5pdHlfZGV0YWlsJztcclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAga2V5OiBzZWxlY3Rpb24uZGF0YS5BY3Rpdml0eS5PcHBvcnR1bml0eUlkLFxyXG4gICAgICAgICAgZGVzY3JpcHRvcjogc2VsZWN0aW9uLmRhdGEuQWN0aXZpdHkuT3Bwb3J0dW5pdHlOYW1lLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KHZpZXdJZCk7XHJcbiAgICAgICAgaWYgKHZpZXcgJiYgb3B0aW9ucykge1xyXG4gICAgICAgICAgdmlldy5zaG93KG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgIH0sIHtcclxuICAgICAgaWQ6ICd2aWV3Q29udGFjdCcsXHJcbiAgICAgIGxhYmVsOiB0aGlzLnZpZXdDb250YWN0QWN0aW9uVGV4dCxcclxuICAgICAgYWN0aW9uOiAnbmF2aWdhdGVUb0NvbnRhY3RPckxlYWQnLFxyXG4gICAgICBlbmFibGVkOiB0aGlzLmhhc0NvbnRhY3RPckxlYWQsXHJcbiAgICB9LCB7XHJcbiAgICAgIGlkOiAnY29tcGxldGUnLFxyXG4gICAgICBjbHM6ICdmYSBmYS1jaGVjay1zcXVhcmUgZmEtMngnLFxyXG4gICAgICBsYWJlbDogdGhpcy5jb21wbGV0ZUFjdGl2aXR5VGV4dCxcclxuICAgICAgZW5hYmxlZDogZnVuY3Rpb24gZW5hYmxlZCh0aGVBY3Rpb24sIHNlbGVjdGlvbikge1xyXG4gICAgICAgIGNvbnN0IGVudHJ5ID0gc2VsZWN0aW9uICYmIHNlbGVjdGlvbi5kYXRhO1xyXG4gICAgICAgIGlmICghZW50cnkpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJlY3VyID0gZW50cnkuQWN0aXZpdHkuUmVjdXJyaW5nO1xyXG5cclxuICAgICAgICByZXR1cm4gZW50cnkuQWN0aXZpdHkuTGVhZGVyLiRrZXkgPT09IEFwcC5jb250ZXh0LnVzZXIuJGtleSAmJiAhcmVjdXI7XHJcbiAgICAgIH0sXHJcbiAgICAgIGZuOiAoZnVuY3Rpb24gZm4odGhlQWN0aW9uLCBzZWxlY3Rpb24pIHtcclxuICAgICAgICBjb25zdCBlbnRyeSA9IHNlbGVjdGlvbiAmJiBzZWxlY3Rpb24uZGF0YSAmJiBzZWxlY3Rpb24uZGF0YS5BY3Rpdml0eTtcclxuXHJcbiAgICAgICAgZW50cnkuQ29tcGxldGVkRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgZW50cnkuUmVzdWx0ID0gJ0NvbXBsZXRlJztcclxuXHJcbiAgICAgICAgZW52aXJvbm1lbnQucmVmcmVzaEFjdGl2aXR5TGlzdHMoKTtcclxuICAgICAgICB0aGlzLmNvbXBsZXRlQWN0aXZpdHkoZW50cnkpO1xyXG4gICAgICB9KS5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICB9LCB7XHJcbiAgICAgIGlkOiAnYWNjZXB0JyxcclxuICAgICAgY2xzOiAnZmEgZmEtY2hlY2sgZmEtMngnLFxyXG4gICAgICBsYWJlbDogdGhpcy5hY2NlcHRBY3Rpdml0eVRleHQsXHJcbiAgICAgIGVuYWJsZWQ6IGZ1bmN0aW9uIGVuYWJsZWQodGhlQWN0aW9uLCBzZWxlY3Rpb24pIHtcclxuICAgICAgICBjb25zdCBlbnRyeSA9IHNlbGVjdGlvbiAmJiBzZWxlY3Rpb24uZGF0YTtcclxuICAgICAgICBpZiAoIWVudHJ5KSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZW50cnkuU3RhdHVzID09PSAnYXNVbmNvbmZpcm1lZCc7XHJcbiAgICAgIH0sXHJcbiAgICAgIGZuOiAoZnVuY3Rpb24gZm4odGhlQWN0aW9uLCBzZWxlY3Rpb24pIHtcclxuICAgICAgICBjb25zdCBlbnRyeSA9IHNlbGVjdGlvbiAmJiBzZWxlY3Rpb24uZGF0YTtcclxuICAgICAgICBlbnZpcm9ubWVudC5yZWZyZXNoQWN0aXZpdHlMaXN0cygpO1xyXG4gICAgICAgIHRoaXMuY29uZmlybUFjdGl2aXR5Rm9yKGVudHJ5LkFjdGl2aXR5LiRrZXksIEFwcC5jb250ZXh0LnVzZXIuJGtleSk7XHJcbiAgICAgIH0pLmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgIH0sIHtcclxuICAgICAgaWQ6ICdkZWNsaW5lJyxcclxuICAgICAgY2xzOiAnZmEgZmEtYmFuIGZhLTJ4JyxcclxuICAgICAgbGFiZWw6IHRoaXMuZGVjbGluZUFjdGl2aXR5VGV4dCxcclxuICAgICAgZW5hYmxlZDogZnVuY3Rpb24gZW5hYmxlZCh0aGVBY3Rpb24sIHNlbGVjdGlvbikge1xyXG4gICAgICAgIGNvbnN0IGVudHJ5ID0gc2VsZWN0aW9uICYmIHNlbGVjdGlvbi5kYXRhO1xyXG4gICAgICAgIGlmICghZW50cnkpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlbnRyeS5TdGF0dXMgPT09ICdhc1VuY29uZmlybWVkJztcclxuICAgICAgfSxcclxuICAgICAgZm46IChmdW5jdGlvbiBmbih0aGVBY3Rpb24sIHNlbGVjdGlvbikge1xyXG4gICAgICAgIGNvbnN0IGVudHJ5ID0gc2VsZWN0aW9uICYmIHNlbGVjdGlvbi5kYXRhO1xyXG5cclxuICAgICAgICBlbnZpcm9ubWVudC5yZWZyZXNoQWN0aXZpdHlMaXN0cygpO1xyXG4gICAgICAgIHRoaXMuZGVjbGluZUFjdGl2aXR5Rm9yKGVudHJ5LkFjdGl2aXR5LiRrZXksIEFwcC5jb250ZXh0LnVzZXIuJGtleSk7XHJcbiAgICAgIH0pLmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgIH0sIHtcclxuICAgICAgaWQ6ICdjYWxsJyxcclxuICAgICAgY2xzOiAncGhvbmUnLFxyXG4gICAgICBsYWJlbDogdGhpcy5jYWxsVGV4dCxcclxuICAgICAgZW5hYmxlZDogZnVuY3Rpb24gZW5hYmxlZCh0aGVBY3Rpb24sIHNlbGVjdGlvbikge1xyXG4gICAgICAgIGNvbnN0IGVudHJ5ID0gc2VsZWN0aW9uICYmIHNlbGVjdGlvbi5kYXRhO1xyXG4gICAgICAgIHJldHVybiBlbnRyeSAmJiBlbnRyeS5BY3Rpdml0eSAmJiBlbnRyeS5BY3Rpdml0eS5QaG9uZU51bWJlcjtcclxuICAgICAgfSxcclxuICAgICAgZm46IGZ1bmN0aW9uIGZuKHRoZUFjdGlvbiwgc2VsZWN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgZW50cnkgPSBzZWxlY3Rpb24gJiYgc2VsZWN0aW9uLmRhdGE7XHJcbiAgICAgICAgY29uc3QgcGhvbmUgPSBlbnRyeSAmJiBlbnRyeS5BY3Rpdml0eSAmJiBlbnRyeS5BY3Rpdml0eS5QaG9uZU51bWJlcjtcclxuICAgICAgICBpZiAocGhvbmUpIHtcclxuICAgICAgICAgIHRoaXMucmVjb3JkQ2FsbFRvSGlzdG9yeShmdW5jdGlvbiBpbml0aWF0ZUNhbGwoKSB7XHJcbiAgICAgICAgICAgIEFwcC5pbml0aWF0ZUNhbGwocGhvbmUpO1xyXG4gICAgICAgICAgfS5iaW5kRGVsZWdhdGUodGhpcyksIGVudHJ5KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0uYmluZERlbGVnYXRlKHRoaXMpLFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ2FkZEF0dGFjaG1lbnQnLFxyXG4gICAgICBjbHM6ICdhdHRhY2gnLFxyXG4gICAgICBsYWJlbDogdGhpcy5hZGRBdHRhY2htZW50QWN0aW9uVGV4dCxcclxuICAgICAgZm46IGFjdGlvbi5hZGRBdHRhY2htZW50LmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgIH1dKTtcclxuICB9LFxyXG4gIHNlbGVjdEVudHJ5OiBmdW5jdGlvbiBzZWxlY3RFbnRyeShwYXJhbXMpIHtcclxuICAgIC8qIE92ZXJyaWRlIHNlbGVjdEVudHJ5IGZyb20gdGhlIGJhc2UgTGlzdCBtaXhpbi5cclxuICAgICAqIEdyYWJiaW5nIGEgZGlmZmVyZW50IGtleSBoZXJlLCBzaW5jZSB3ZSB1c2UgZW50cnkuQWN0aXZpdHkuJGtleSBhcyB0aGUgbWFpbiBkYXRhLWtleS5cclxuICAgICAqIFRPRE86IE1ha2UgW2RhdGEta2V5XSBvdmVycmlkZWFibGUgaW4gdGhlIGJhc2UgY2xhc3MuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0IHJvdyA9ICQoYFtkYXRhLWtleT0nJHtwYXJhbXMua2V5fSddYCwgdGhpcy5jb250ZW50Tm9kZSkuZmlyc3QoKTtcclxuICAgIGNvbnN0IGtleSA9IHJvdyA/IHJvdy5hdHRyKCdkYXRhLW15LWFjdGl2aXR5LWtleScpIDogZmFsc2U7XHJcblxyXG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvbk1vZGVsICYmIGtleSkge1xyXG4gICAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3Qoa2V5LCB0aGlzLmVudHJpZXNba2V5XSwgcm93LmdldCgwKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5zaW5nbGVTZWxlY3QgJiYgdGhpcy5vcHRpb25zLnNpbmdsZVNlbGVjdEFjdGlvbiAmJiAhdGhpcy5lbmFibGVBY3Rpb25zKSB7XHJcbiAgICAgIHRoaXMuaW52b2tlU2luZ2xlU2VsZWN0QWN0aW9uKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBmb3JtYXRTZWFyY2hRdWVyeTogZnVuY3Rpb24gZm9ybWF0U2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkpIHtcclxuICAgIHJldHVybiBgdXBwZXIoQWN0aXZpdHkuRGVzY3JpcHRpb24pIGxpa2UgXCIlJHt0aGlzLmVzY2FwZVNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5LnRvVXBwZXJDYXNlKCkpfSVcImA7XHJcbiAgfSxcclxuICBkZWNsaW5lQWN0aXZpdHlGb3I6IGZ1bmN0aW9uIGRlY2xpbmVBY3Rpdml0eUZvcihhY3Rpdml0eUlkLCB1c2VySWQpIHtcclxuICAgIHRoaXMuX2dldFVzZXJOb3RpZmljYXRpb25zKGFjdGl2aXR5SWQsIHVzZXJJZCwgZmFsc2UpO1xyXG4gIH0sXHJcbiAgY29uZmlybUFjdGl2aXR5Rm9yOiBmdW5jdGlvbiBjb25maXJtQWN0aXZpdHlGb3IoYWN0aXZpdHlJZCwgdXNlcklkKSB7XHJcbiAgICB0aGlzLl9nZXRVc2VyTm90aWZpY2F0aW9ucyhhY3Rpdml0eUlkLCB1c2VySWQsIHRydWUpO1xyXG4gIH0sXHJcbiAgX2dldFVzZXJOb3RpZmljYXRpb25zOiBmdW5jdGlvbiBfZ2V0VXNlck5vdGlmaWNhdGlvbnMoYWN0aXZpdHlJZCwgdXNlcklkLCBhY2NlcHQpIHtcclxuICAgIGxldCBpZCA9IGFjdGl2aXR5SWQ7XHJcbiAgICBpZiAoYWN0aXZpdHlJZCkge1xyXG4gICAgICBpZCA9IGFjdGl2aXR5SWQuc3Vic3RyaW5nKDAsIDEyKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXEgPSBuZXcgU2FnZS5TRGF0YS5DbGllbnQuU0RhdGFSZXNvdXJjZUNvbGxlY3Rpb25SZXF1ZXN0KHRoaXMuZ2V0U2VydmljZSgpKTtcclxuICAgIHJlcS5zZXRSZXNvdXJjZUtpbmQoJ3VzZXJOb3RpZmljYXRpb25zJyk7XHJcbiAgICByZXEuc2V0Q29udHJhY3ROYW1lKCdkeW5hbWljJyk7XHJcbiAgICByZXEuc2V0UXVlcnlBcmcoJ3doZXJlJywgYEFjdGl2aXR5SWQgZXEgJyR7aWR9JyBhbmQgVG9Vc2VyLklkIGVxICcke3VzZXJJZH0nYCk7XHJcbiAgICByZXEuc2V0UXVlcnlBcmcoJ3ByZWNlZGVuY2UnLCAnMCcpO1xyXG4gICAgcmVxLnJlYWQoe1xyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKHVzZXJOb3RpZmljYXRpb25zKSB7XHJcbiAgICAgICAgaWYgKHVzZXJOb3RpZmljYXRpb25zLiRyZXNvdXJjZXMgJiYgdXNlck5vdGlmaWNhdGlvbnMuJHJlc291cmNlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBpZiAoYWNjZXB0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWNjZXB0Q29uZmlybWF0aW9uKHVzZXJOb3RpZmljYXRpb25zLiRyZXNvdXJjZXNbMF0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kZWNsaW5lQ29uZmlybWF0aW9uKHVzZXJOb3RpZmljYXRpb25zLiRyZXNvdXJjZXNbMF0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZmFpbHVyZTogdGhpcy5vblJlcXVlc3RGYWlsdXJlLFxyXG4gICAgICBzY29wZTogdGhpcyxcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZGVjbGluZUNvbmZpcm1hdGlvbjogZnVuY3Rpb24gZGVjbGluZUNvbmZpcm1hdGlvbihub3RpZmljYXRpb24pIHtcclxuICAgIHRoaXMuX3Bvc3RVc2VyTm90aWZpY2F0aW9ucyhub3RpZmljYXRpb24sICdEZWNsaW5lJyk7XHJcbiAgfSxcclxuICBhY2NlcHRDb25maXJtYXRpb246IGZ1bmN0aW9uIGFjY2VwdENvbmZpcm1hdGlvbihub3RpZmljYXRpb24pIHtcclxuICAgIHRoaXMuX3Bvc3RVc2VyTm90aWZpY2F0aW9ucyhub3RpZmljYXRpb24sICdBY2NlcHQnKTtcclxuICB9LFxyXG4gIF9wb3N0VXNlck5vdGlmaWNhdGlvbnM6IGZ1bmN0aW9uIF9wb3N0VXNlck5vdGlmaWNhdGlvbnMobm90aWZpY2F0aW9uLCBvcGVyYXRpb24pIHtcclxuICAgIGlmICghbm90aWZpY2F0aW9uIHx8IHR5cGVvZiBvcGVyYXRpb24gIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIC8qXHJcbiAgICAgKiBUbyBnZXQgdGhlIHBheWxvYWQgdGVtcGxhdGU6XHJcbiAgICAgKiBodHRwOi8vbG9jYWxob3N0OjY2NjYvU2x4Q2xpZW50L3NseGRhdGEuYXNoeC9zbHgvZHluYW1pYy8tL3VzZXJOb3RpZmljYXRpb25zLyRzZXJ2aWNlL2FjY2VwdC8kdGVtcGxhdGU/Zm9ybWF0PWpzb25cclxuICAgICAqL1xyXG4gICAgY29uc3QgcGF5bG9hZCA9IHtcclxuICAgICAgJG5hbWU6IG9wZXJhdGlvbixcclxuICAgICAgcmVxdWVzdDoge1xyXG4gICAgICAgIGVudGl0eTogbm90aWZpY2F0aW9uLFxyXG4gICAgICAgIFVzZXJOb3RpZmljYXRpb25JZDogbm90aWZpY2F0aW9uLiRrZXksXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgU2FnZS5TRGF0YS5DbGllbnQuU0RhdGFTZXJ2aWNlT3BlcmF0aW9uUmVxdWVzdCh0aGlzLmdldFNlcnZpY2UoKSlcclxuICAgICAgLnNldENvbnRyYWN0TmFtZSgnZHluYW1pYycpXHJcbiAgICAgIC5zZXRSZXNvdXJjZUtpbmQoJ3VzZXJub3RpZmljYXRpb25zJylcclxuICAgICAgLnNldE9wZXJhdGlvbk5hbWUob3BlcmF0aW9uLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgcmVxdWVzdC5leGVjdXRlKHBheWxvYWQsIHtcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcygpIHtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWx1cmU6IHRoaXMub25SZXF1ZXN0RmFpbHVyZSxcclxuICAgICAgc2NvcGU6IHRoaXMsXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGNvbXBsZXRlQWN0aXZpdHk6IGZ1bmN0aW9uIGNvbXBsZXRlQWN0aXZpdHkoZW50cnkpIHtcclxuICAgIGNvbnN0IGFjdGl2aXR5TW9kZWwgPSBBcHAuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKE1PREVMX05BTUVTLkFDVElWSVRZLCBNT0RFTF9UWVBFUy5TREFUQSk7XHJcbiAgICBpZiAoYWN0aXZpdHlNb2RlbCkge1xyXG4gICAgICBhY3Rpdml0eU1vZGVsLmNvbXBsZXRlQWN0aXZpdHkoZW50cnkpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGNvbm5lY3QucHVibGlzaCgnL2FwcC9yZWZyZXNoJywgW3tcclxuICAgICAgICAgIHJlc291cmNlS2luZDogJ2hpc3RvcnknLFxyXG4gICAgICAgIH1dKTtcclxuXHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICB9LCAoZXJyKSA9PiB7XHJcbiAgICAgICAgRXJyb3JNYW5hZ2VyLmFkZEVycm9yKGVyciwgdGhpcywge30sICdmYWlsdXJlJyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25SZXF1ZXN0RmFpbHVyZTogZnVuY3Rpb24gb25SZXF1ZXN0RmFpbHVyZShyZXNwb25zZSwgbykge1xyXG4gICAgRXJyb3JNYW5hZ2VyLmFkZEVycm9yKHJlc3BvbnNlLCBvLCB7fSwgJ2ZhaWx1cmUnKTtcclxuICB9LFxyXG4gIGhhc0FsYXJtOiBmdW5jdGlvbiBoYXNBbGFybShlbnRyeSkge1xyXG4gICAgaWYgKGVudHJ5LkFjdGl2aXR5ICYmIGVudHJ5LkFjdGl2aXR5LkFsYXJtID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LFxyXG4gIGhhc0JlZW5Ub3VjaGVkOiBmdW5jdGlvbiBoYXNCZWVuVG91Y2hlZChlbnRyeSkge1xyXG4gICAgaWYgKGVudHJ5LkFjdGl2aXR5Lk1vZGlmeURhdGUpIHtcclxuICAgICAgY29uc3QgbW9kaWZpZWREYXRlID0gbW9tZW50KGNvbnZlcnQudG9EYXRlRnJvbVN0cmluZyhlbnRyeS5BY3Rpdml0eS5Nb2RpZnlEYXRlKSk7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbW9tZW50KCkuZW5kT2YoJ2RheScpO1xyXG4gICAgICBjb25zdCB3ZWVrQWdvID0gbW9tZW50KCkuc3VidHJhY3QoMSwgJ3dlZWtzJyk7XHJcblxyXG4gICAgICByZXR1cm4gbW9kaWZpZWREYXRlLmlzQWZ0ZXIod2Vla0FnbykgJiZcclxuICAgICAgICBtb2RpZmllZERhdGUuaXNCZWZvcmUoY3VycmVudERhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LFxyXG4gIGlzSW1wb3J0YW50OiBmdW5jdGlvbiBpc0ltcG9ydGFudChlbnRyeSkge1xyXG4gICAgcmV0dXJuIGVudHJ5LkFjdGl2aXR5LlByaW9yaXR5ID09PSAnSGlnaCc7XHJcbiAgfSxcclxuICBpc092ZXJkdWU6IGZ1bmN0aW9uIGlzT3ZlcmR1ZShlbnRyeSkge1xyXG4gICAgaWYgKGVudHJ5LkFjdGl2aXR5LlN0YXJ0RGF0ZSkge1xyXG4gICAgICBjb25zdCBzdGFydERhdGUgPSBjb252ZXJ0LnRvRGF0ZUZyb21TdHJpbmcoZW50cnkuQWN0aXZpdHkuU3RhcnREYXRlKTtcclxuICAgICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICBjb25zdCBzZWNvbmRzID0gTWF0aC5yb3VuZCgoY3VycmVudERhdGUgLSBzdGFydERhdGUpIC8gMTAwMCk7XHJcbiAgICAgIGNvbnN0IG1pbnMgPSBzZWNvbmRzIC8gNjA7XHJcbiAgICAgIGlmIChtaW5zID49IDEpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0sXHJcbiAgaXNUaW1lbGVzc1RvZGF5OiBmdW5jdGlvbiBpc1RpbWVsZXNzVG9kYXkoZW50cnkpIHtcclxuICAgIGlmICghZW50cnkgfHwgIWVudHJ5LkFjdGl2aXR5IHx8ICFlbnRyeS5BY3Rpdml0eS5UaW1lbGVzcykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3RhcnQgPSBtb21lbnQoZW50cnkuQWN0aXZpdHkuU3RhcnREYXRlKTtcclxuICAgIHJldHVybiB0aGlzLl9pc1RpbWVsZXNzVG9kYXkoc3RhcnQpO1xyXG4gIH0sXHJcbiAgaXNSZWN1cnJpbmc6IGZ1bmN0aW9uIGlzUmVjdXJyaW5nKGVudHJ5KSB7XHJcbiAgICBpZiAoZW50cnkuQWN0aXZpdHkuUmVjdXJyaW5nKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LFxyXG4gIGdldEl0ZW1JY29uQ2xhc3M6IGZ1bmN0aW9uIGdldEl0ZW1JY29uQ2xhc3MoZW50cnkpIHtcclxuICAgIGNvbnN0IHR5cGUgPSBlbnRyeSAmJiBlbnRyeS5BY3Rpdml0eSAmJiBlbnRyeS5BY3Rpdml0eS5UeXBlO1xyXG4gICAgcmV0dXJuIHRoaXMuX2dldEl0ZW1JY29uQ2xhc3ModHlwZSk7XHJcbiAgfSxcclxuICBnZXRJdGVtQWN0aW9uS2V5OiBmdW5jdGlvbiBnZXRJdGVtQWN0aW9uS2V5KGVudHJ5KSB7XHJcbiAgICByZXR1cm4gZW50cnkuQWN0aXZpdHkuJGtleTtcclxuICB9LFxyXG4gIGdldEl0ZW1EZXNjcmlwdG9yOiBmdW5jdGlvbiBnZXRJdGVtRGVzY3JpcHRvcihlbnRyeSkge1xyXG4gICAgcmV0dXJuIGVudHJ5LkFjdGl2aXR5LiRkZXNjcmlwdG9yO1xyXG4gIH0sXHJcbiAgZ2V0VGl0bGU6IGZ1bmN0aW9uIGdldFRpdGxlKGVudHJ5KSB7XHJcbiAgICBpZiAoIWVudHJ5IHx8ICFlbnRyeS5BY3Rpdml0eSkge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICh0aGlzLl9tb2RlbCAmJiB0aGlzLl9tb2RlbC5nZXRFbnRpdHlEZXNjcmlwdGlvbihlbnRyeS5BY3Rpdml0eSkpIHx8IGVudHJ5LkFjdGl2aXR5LiRkZXNjcmlwdG9yO1xyXG4gIH0sXHJcbiAgaGFzQ29udGFjdE9yTGVhZDogZnVuY3Rpb24gaGFzQ29udGFjdE9yTGVhZCh0aGVBY3Rpb24sIHNlbGVjdGlvbikge1xyXG4gICAgcmV0dXJuIChzZWxlY3Rpb24uZGF0YS5BY3Rpdml0eS5Db250YWN0SWQpIHx8IChzZWxlY3Rpb24uZGF0YS5BY3Rpdml0eS5MZWFkSWQpO1xyXG4gIH0sXHJcbiAgbmF2aWdhdGVUb0NvbnRhY3RPckxlYWQ6IGZ1bmN0aW9uIG5hdmlnYXRlVG9Db250YWN0T3JMZWFkKHRoZUFjdGlvbiwgc2VsZWN0aW9uKSB7XHJcbiAgICBjb25zdCBlbnRyeSA9IHNlbGVjdGlvbi5kYXRhLkFjdGl2aXR5O1xyXG4gICAgY29uc3QgZW50aXR5ID0gdGhpcy5yZXNvbHZlQ29udGFjdE9yTGVhZEVudGl0eShlbnRyeSk7XHJcbiAgICBsZXQgdmlld0lkO1xyXG4gICAgbGV0IG9wdGlvbnM7XHJcblxyXG4gICAgc3dpdGNoIChlbnRpdHkpIHtcclxuICAgICAgY2FzZSAnQ29udGFjdCc6XHJcbiAgICAgICAgdmlld0lkID0gJ2NvbnRhY3RfZGV0YWlsJztcclxuICAgICAgICBvcHRpb25zID0ge1xyXG4gICAgICAgICAga2V5OiBlbnRyeS5Db250YWN0SWQsXHJcbiAgICAgICAgICBkZXNjcmlwdG9yOiBlbnRyeS5Db250YWN0TmFtZSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdMZWFkJzpcclxuICAgICAgICB2aWV3SWQgPSAnbGVhZF9kZXRhaWwnO1xyXG4gICAgICAgIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICBrZXk6IGVudHJ5LkxlYWRJZCxcclxuICAgICAgICAgIGRlc2NyaXB0b3I6IGVudHJ5LkxlYWROYW1lLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KHZpZXdJZCk7XHJcblxyXG4gICAgaWYgKHZpZXcgJiYgb3B0aW9ucykge1xyXG4gICAgICB2aWV3LnNob3cob3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBuYXZpZ2F0ZVRvRGV0YWlsVmlldzogZnVuY3Rpb24gbmF2aWdhdGVUb0RldGFpbFZpZXcoa2V5LCBkZXNjcmlwdG9yLCBhZGRpdGlvbmFsT3B0aW9ucykge1xyXG4gICAgY29uc3QgbXlMaXN0T3B0aW9ucyA9IGFkZGl0aW9uYWxPcHRpb25zIHx8IHt9O1xyXG4gICAgbXlMaXN0T3B0aW9ucy5yZXR1cm5UbyA9IHRoaXMuaWQ7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMsIFtrZXksIGRlc2NyaXB0b3IsIG15TGlzdE9wdGlvbnNdKTtcclxuICB9LFxyXG4gIHJlc29sdmVDb250YWN0T3JMZWFkRW50aXR5OiBmdW5jdGlvbiByZXNvbHZlQ29udGFjdE9yTGVhZEVudGl0eShlbnRyeSkge1xyXG4gICAgY29uc3QgZXhpc3RzID0gdGhpcy5leGlzdHNSRTtcclxuXHJcbiAgICBpZiAoZW50cnkpIHtcclxuICAgICAgaWYgKGV4aXN0cy50ZXN0KGVudHJ5LkxlYWRJZCkpIHtcclxuICAgICAgICByZXR1cm4gJ0xlYWQnO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChleGlzdHMudGVzdChlbnRyeS5Db250YWN0SWQpKSB7XHJcbiAgICAgICAgcmV0dXJuICdDb250YWN0JztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgcmVjb3JkQ2FsbFRvSGlzdG9yeTogZnVuY3Rpb24gcmVjb3JkQ2FsbFRvSGlzdG9yeShjb21wbGV0ZSwgZW50cnkpIHtcclxuICAgIGNvbnN0IHRlbXBFbnRyeSA9IHtcclxuICAgICAgJG5hbWU6ICdIaXN0b3J5JyxcclxuICAgICAgVHlwZTogJ2F0UGhvbmVDYWxsJyxcclxuICAgICAgQ29udGFjdE5hbWU6IGVudHJ5LkFjdGl2aXR5LkNvbnRhY3ROYW1lLFxyXG4gICAgICBDb250YWN0SWQ6IGVudHJ5LkFjdGl2aXR5LkNvbnRhY3RJZCxcclxuICAgICAgQWNjb3VudE5hbWU6IGVudHJ5LkFjdGl2aXR5LkFjY291bnROYW1lLFxyXG4gICAgICBBY2NvdW50SWQ6IGVudHJ5LkFjdGl2aXR5LkFjY291bnRJZCxcclxuICAgICAgRGVzY3JpcHRpb246IHN0cmluZy5zdWJzdGl0dXRlKHRoaXMuY2FsbGVkVGV4dCwgW2VudHJ5LkFjdGl2aXR5LkNvbnRhY3ROYW1lIHx8ICcnXSksXHJcbiAgICAgIFVzZXJJZDogQXBwLmNvbnRleHQgJiYgQXBwLmNvbnRleHQudXNlci4ka2V5LFxyXG4gICAgICBVc2VyTmFtZTogQXBwLmNvbnRleHQgJiYgQXBwLmNvbnRleHQudXNlci5Vc2VyTmFtZSxcclxuICAgICAgRHVyYXRpb246IDE1LFxyXG4gICAgICBDb21wbGV0ZWREYXRlOiAobmV3IERhdGUoKSksXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMubmF2aWdhdGVUb0hpc3RvcnlJbnNlcnQoJ2F0UGhvbmVDYWxsJywgdGVtcEVudHJ5LCBjb21wbGV0ZSk7XHJcbiAgfSxcclxuXHJcbiAgbmF2aWdhdGVUb0hpc3RvcnlJbnNlcnQ6IGZ1bmN0aW9uIG5hdmlnYXRlVG9IaXN0b3J5SW5zZXJ0KHR5cGUsIGVudHJ5LCBjb21wbGV0ZSkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KHRoaXMuaGlzdG9yeUVkaXRWaWV3KTtcclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIGVudmlyb25tZW50LnJlZnJlc2hBY3Rpdml0eUxpc3RzKCk7XHJcbiAgICAgIHZpZXcuc2hvdyh7XHJcbiAgICAgICAgdGl0bGU6IEFjdGl2aXR5VHlwZVRleHRbdHlwZV0sXHJcbiAgICAgICAgdGVtcGxhdGU6IHt9LFxyXG4gICAgICAgIGVudHJ5LFxyXG4gICAgICAgIGluc2VydDogdHJ1ZSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGNvbXBsZXRlLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIGNyZWF0ZUJyaWVmY2FzZUVudGl0eTogZnVuY3Rpb24gY3JlYXRlQnJpZWZjYXNlRW50aXR5KGVudHJ5KSB7XHJcbiAgICBjb25zdCBlbnRpdHkgPSB7XHJcbiAgICAgIGVudGl0eUlkOiBlbnRyeS5BY3Rpdml0eS4ka2V5LFxyXG4gICAgICBlbnRpdHlOYW1lOiAnQWN0aXZpdHknLFxyXG4gICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgaW5jbHVkZVJlbGF0ZWQ6IHRydWUsXHJcbiAgICAgICAgdmlld0lkOiB0aGlzLmRldGFpbFZpZXcsXHJcbiAgICAgICAgaWNvbkNsYXNzOiB0aGlzLmdldEl0ZW1JY29uQ2xhc3MoZW50cnkpLFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIHJldHVybiBlbnRpdHk7XHJcbiAgfSxcclxuICBhY3RpdmF0ZUVudHJ5OiBmdW5jdGlvbiBhY3RpdmF0ZUVudHJ5KHBhcmFtcykge1xyXG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmVudHJpZXNbcGFyYW1zLm15QWN0aXZpdHlLZXldO1xyXG4gICAgaWYgKGVudHJ5KSB7XHJcbiAgICAgIGNvbnN0IGFjdGl2aXR5UGFyYW1zID0gcGFyYW1zO1xyXG4gICAgICBhY3Rpdml0eVBhcmFtcy5kZXNjcmlwdG9yID0gdGhpcy5fbW9kZWwuZ2V0RW50aXR5RGVzY3JpcHRpb24oZW50cnkuQWN0aXZpdHkpO1xyXG4gICAgICB0aGlzLmluaGVyaXRlZChhY3RpdmF0ZUVudHJ5LCBhcmd1bWVudHMsIFthY3Rpdml0eVBhcmFtc10pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbmhlcml0ZWQoYWN0aXZhdGVFbnRyeSwgYXJndW1lbnRzKTtcclxuICAgIH1cclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==