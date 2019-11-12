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
      this.inherited(arguments);
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
        this.inherited(arguments, [activityParams]);
      } else {
        this.inherited(arguments);
      }
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BY3Rpdml0eS9NeUxpc3QuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJoYXNoVGFnUmVzb3VyY2UiLCJfX2NsYXNzIiwiZm9ybWF0Iiwicm93VGVtcGxhdGUiLCJTaW1wbGF0ZSIsImFjdGl2aXR5VGltZVRlbXBsYXRlIiwiaXRlbVRlbXBsYXRlIiwibmFtZVRlbXBsYXRlIiwidGl0bGVUZXh0IiwiY29tcGxldGVBY3Rpdml0eVRleHQiLCJhY2NlcHRBY3Rpdml0eVRleHQiLCJkZWNsaW5lQWN0aXZpdHlUZXh0IiwiY2FsbFRleHQiLCJjYWxsZWRUZXh0IiwiYWRkQXR0YWNobWVudEFjdGlvblRleHQiLCJ2aWV3Q29udGFjdEFjdGlvblRleHQiLCJ2aWV3QWNjb3VudEFjdGlvblRleHQiLCJ2aWV3T3Bwb3J0dW5pdHlBY3Rpb25UZXh0IiwiaWQiLCJlbnRpdHlOYW1lIiwibW9kZWxOYW1lIiwiVVNFUkFDVElWSVRZIiwiZW5hYmxlT2ZmbGluZSIsImhpc3RvcnlFZGl0VmlldyIsImV4aXN0c1JFIiwicXVlcnlXaGVyZSIsIkFwcCIsImNvbnRleHQiLCJ1c2VyIiwiJGtleSIsInF1ZXJ5T3JkZXJCeSIsInF1ZXJ5U2VsZWN0IiwicmVzb3VyY2VLaW5kIiwiYWxsb3dTZWxlY3Rpb24iLCJlbmFibGVBY3Rpb25zIiwiaGFzaFRhZ1F1ZXJpZXMiLCJhbGFybSIsInJlY3VycmluZyIsInRpbWVsZXNzIiwieWVzdGVyZGF5Iiwibm93IiwibW9tZW50IiwieWVzdGVyZGF5U3RhcnQiLCJjbG9uZSIsInN1YnRyYWN0Iiwic3RhcnRPZiIsInllc3RlcmRheUVuZCIsImVuZE9mIiwidGhlUXVlcnkiLCJ0b0lzb1N0cmluZ0Zyb21EYXRlIiwidG9EYXRlIiwidG9kYXkiLCJ0b2RheVN0YXJ0IiwidG9kYXlFbmQiLCJ0aGlzV2VlayIsIndlZWtTdGFydERhdGUiLCJ3ZWVrRW5kRGF0ZSIsImhhc2hUYWdRdWVyaWVzVGV4dCIsImhhc2hUYWdBbGFybVRleHQiLCJoYXNoVGFnVW5jb25maXJtZWRUZXh0IiwiaGFzaFRhZ0FjY2VwdGVkVGV4dCIsImhhc2hUYWdEZWNsaW5lZFRleHQiLCJoYXNoVGFnUmVjdXJyaW5nVGV4dCIsImhhc2hUYWdUaW1lbGVzc1RleHQiLCJoYXNoVGFnVG9kYXlUZXh0IiwiaGFzaFRhZ1RoaXNXZWVrVGV4dCIsImhhc2hUYWdZZXN0ZXJkYXlUZXh0IiwiY3JlYXRlVG9vbExheW91dCIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsInRvb2xzIiwidGJhciIsIl9yZWZyZXNoQWRkZWQiLCJ3aW5kb3ciLCJzdXBwb3J0c1RvdWNoIiwicHVzaCIsInN2ZyIsImFjdGlvbiIsIl9yZWZyZXNoQ2xpY2tlZCIsImNsZWFyIiwicmVmcmVzaFJlcXVpcmVkIiwicmVmcmVzaCIsIm9uUmVmcmVzaENsaWNrZWQiLCJfY2FsbFBob25lIiwicGFyYW1zIiwiaW52b2tlQWN0aW9uSXRlbUJ5IiwidGhlQWN0aW9uIiwia2V5IiwiZGVmYXVsdFNlYXJjaFRlcm0iLCJlbmFibGVIYXNoVGFncyIsImhhc2h0YWciLCJzdGFydHNXaXRoIiwiY3JlYXRlQWN0aW9uTGF5b3V0IiwiYWN0aW9ucyIsImxhYmVsIiwiZW5hYmxlZCIsInNlbGVjdGlvbiIsImVudHJ5IiwiZGF0YSIsIkFjdGl2aXR5IiwiQWNjb3VudElkIiwiZm4iLCJ2aWV3SWQiLCJvcHRpb25zIiwiZGVzY3JpcHRvciIsIkFjY291bnROYW1lIiwidmlldyIsImdldFZpZXciLCJzaG93IiwiT3Bwb3J0dW5pdHlJZCIsIk9wcG9ydHVuaXR5TmFtZSIsImhhc0NvbnRhY3RPckxlYWQiLCJjbHMiLCJyZWN1ciIsIlJlY3VycmluZyIsIkxlYWRlciIsIkNvbXBsZXRlZERhdGUiLCJEYXRlIiwiUmVzdWx0IiwicmVmcmVzaEFjdGl2aXR5TGlzdHMiLCJjb21wbGV0ZUFjdGl2aXR5IiwiYmluZERlbGVnYXRlIiwiU3RhdHVzIiwiY29uZmlybUFjdGl2aXR5Rm9yIiwiZGVjbGluZUFjdGl2aXR5Rm9yIiwiUGhvbmVOdW1iZXIiLCJwaG9uZSIsInJlY29yZENhbGxUb0hpc3RvcnkiLCJpbml0aWF0ZUNhbGwiLCJhZGRBdHRhY2htZW50Iiwic2VsZWN0RW50cnkiLCJyb3ciLCIkIiwiY29udGVudE5vZGUiLCJmaXJzdCIsImF0dHIiLCJfc2VsZWN0aW9uTW9kZWwiLCJzZWxlY3QiLCJlbnRyaWVzIiwiZ2V0Iiwic2luZ2xlU2VsZWN0Iiwic2luZ2xlU2VsZWN0QWN0aW9uIiwiaW52b2tlU2luZ2xlU2VsZWN0QWN0aW9uIiwiZm9ybWF0U2VhcmNoUXVlcnkiLCJzZWFyY2hRdWVyeSIsImVzY2FwZVNlYXJjaFF1ZXJ5IiwidG9VcHBlckNhc2UiLCJhY3Rpdml0eUlkIiwidXNlcklkIiwiX2dldFVzZXJOb3RpZmljYXRpb25zIiwiYWNjZXB0Iiwic3Vic3RyaW5nIiwicmVxIiwiU2FnZSIsIlNEYXRhIiwiQ2xpZW50IiwiU0RhdGFSZXNvdXJjZUNvbGxlY3Rpb25SZXF1ZXN0IiwiZ2V0U2VydmljZSIsInNldFJlc291cmNlS2luZCIsInNldENvbnRyYWN0TmFtZSIsInNldFF1ZXJ5QXJnIiwicmVhZCIsInN1Y2Nlc3MiLCJ1c2VyTm90aWZpY2F0aW9ucyIsIiRyZXNvdXJjZXMiLCJsZW5ndGgiLCJhY2NlcHRDb25maXJtYXRpb24iLCJkZWNsaW5lQ29uZmlybWF0aW9uIiwiZmFpbHVyZSIsIm9uUmVxdWVzdEZhaWx1cmUiLCJzY29wZSIsIm5vdGlmaWNhdGlvbiIsIl9wb3N0VXNlck5vdGlmaWNhdGlvbnMiLCJvcGVyYXRpb24iLCJwYXlsb2FkIiwiJG5hbWUiLCJyZXF1ZXN0IiwiZW50aXR5IiwiVXNlck5vdGlmaWNhdGlvbklkIiwiU0RhdGFTZXJ2aWNlT3BlcmF0aW9uUmVxdWVzdCIsInNldE9wZXJhdGlvbk5hbWUiLCJ0b0xvd2VyQ2FzZSIsImV4ZWN1dGUiLCJhY3Rpdml0eU1vZGVsIiwiTW9kZWxNYW5hZ2VyIiwiZ2V0TW9kZWwiLCJBQ1RJVklUWSIsIlNEQVRBIiwidGhlbiIsInB1Ymxpc2giLCJlcnIiLCJhZGRFcnJvciIsInJlc3BvbnNlIiwibyIsImhhc0FsYXJtIiwiQWxhcm0iLCJoYXNCZWVuVG91Y2hlZCIsIk1vZGlmeURhdGUiLCJtb2RpZmllZERhdGUiLCJ0b0RhdGVGcm9tU3RyaW5nIiwiY3VycmVudERhdGUiLCJ3ZWVrQWdvIiwiaXNBZnRlciIsImlzQmVmb3JlIiwiaXNJbXBvcnRhbnQiLCJQcmlvcml0eSIsImlzT3ZlcmR1ZSIsIlN0YXJ0RGF0ZSIsInN0YXJ0RGF0ZSIsInNlY29uZHMiLCJNYXRoIiwicm91bmQiLCJtaW5zIiwiaXNUaW1lbGVzc1RvZGF5IiwiVGltZWxlc3MiLCJzdGFydCIsIl9pc1RpbWVsZXNzVG9kYXkiLCJpc1JlY3VycmluZyIsImdldEl0ZW1JY29uQ2xhc3MiLCJ0eXBlIiwiVHlwZSIsIl9nZXRJdGVtSWNvbkNsYXNzIiwiZ2V0SXRlbUFjdGlvbktleSIsImdldEl0ZW1EZXNjcmlwdG9yIiwiJGRlc2NyaXB0b3IiLCJnZXRUaXRsZSIsIl9tb2RlbCIsImdldEVudGl0eURlc2NyaXB0aW9uIiwiQ29udGFjdElkIiwiTGVhZElkIiwibmF2aWdhdGVUb0NvbnRhY3RPckxlYWQiLCJyZXNvbHZlQ29udGFjdE9yTGVhZEVudGl0eSIsIkNvbnRhY3ROYW1lIiwiTGVhZE5hbWUiLCJuYXZpZ2F0ZVRvRGV0YWlsVmlldyIsImFkZGl0aW9uYWxPcHRpb25zIiwibXlMaXN0T3B0aW9ucyIsInJldHVyblRvIiwiZXhpc3RzIiwidGVzdCIsImNvbXBsZXRlIiwidGVtcEVudHJ5IiwiRGVzY3JpcHRpb24iLCJzdWJzdGl0dXRlIiwiVXNlcklkIiwiVXNlck5hbWUiLCJEdXJhdGlvbiIsIm5hdmlnYXRlVG9IaXN0b3J5SW5zZXJ0IiwidGl0bGUiLCJ0ZW1wbGF0ZSIsImluc2VydCIsImNyZWF0ZUJyaWVmY2FzZUVudGl0eSIsImVudGl0eUlkIiwiaW5jbHVkZVJlbGF0ZWQiLCJkZXRhaWxWaWV3IiwiaWNvbkNsYXNzIiwiYWN0aXZhdGVFbnRyeSIsIm15QWN0aXZp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a0JBQVUzSixNQUFNRSxRQUFOLENBQWV0RSxJQURaO0FBRWJWLG9CQUFZLFVBRkM7QUFHYm9GLGlCQUFTO0FBQ1BzSiwwQkFBZ0IsSUFEVDtBQUVQdkosa0JBQVEsS0FBS3dKLFVBRk47QUFHUEMscUJBQVcsS0FBS3JDLGdCQUFMLENBQXNCekgsS0FBdEI7QUFISjtBQUhJLE9BQWY7QUFTQSxhQUFPZ0YsTUFBUDtBQUNELEtBOWtCcUY7QUEra0J0RitFLG1CQUFlLFNBQVNBLGFBQVQsQ0FBdUI1SyxNQUF2QixFQUErQjtBQUM1QyxVQUFNYSxRQUFRLEtBQUt5QyxPQUFMLENBQWF0RCxPQUFPNkssYUFBcEIsQ0FBZDtBQUNBLFVBQUloSyxLQUFKLEVBQVc7QUFDVCxZQUFNaUssaUJBQWlCOUssTUFBdkI7QUFDQThLLHVCQUFlMUosVUFBZixHQUE0QixLQUFLMEgsTUFBTCxDQUFZQyxvQkFBWixDQUFpQ2xJLE1BQU1FLFFBQXZDLENBQTVCO0FBQ0EsYUFBSy9CLFNBQUwsQ0FBZUMsU0FBZixFQUEwQixDQUFDNkwsY0FBRCxDQUExQjtBQUNELE9BSkQsTUFJTztBQUNMLGFBQUs5TCxTQUFMLENBQWVDLFNBQWY7QUFDRDtBQUNGO0FBeGxCcUYsR0FBeEUsQ0FBaEI7O29CQTJsQmVwRSxPIiwiZmlsZSI6Ik15TGlzdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBjb25uZWN0IGZyb20gJ2Rvam8vX2Jhc2UvY29ubmVjdCc7XHJcbmltcG9ydCBlbnZpcm9ubWVudCBmcm9tICcuLi8uLi9FbnZpcm9ubWVudCc7XHJcbmltcG9ydCBBY3Rpdml0eUxpc3QgZnJvbSAnLi9MaXN0JztcclxuaW1wb3J0IGNvbnZlcnQgZnJvbSAnYXJnb3MvQ29udmVydCc7XHJcbmltcG9ydCBFcnJvck1hbmFnZXIgZnJvbSAnYXJnb3MvRXJyb3JNYW5hZ2VyJztcclxuaW1wb3J0IGFjdGlvbiBmcm9tICcuLi8uLi9BY3Rpb24nO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJy4uLy4uL0Zvcm1hdCc7XHJcbmltcG9ydCBfTGlzdE9mZmxpbmVNaXhpbiBmcm9tICdhcmdvcy9PZmZsaW5lL19MaXN0T2ZmbGluZU1peGluJztcclxuaW1wb3J0IE1PREVMX1RZUEVTIGZyb20gJ2FyZ29zL01vZGVscy9UeXBlcyc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi8uLi9Nb2RlbHMvTmFtZXMnO1xyXG5pbXBvcnQgQWN0aXZpdHlUeXBlVGV4dCBmcm9tICcuLi8uLi9Nb2RlbHMvQWN0aXZpdHkvQWN0aXZpdHlUeXBlVGV4dCc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuaW1wb3J0IHN0cmluZyBmcm9tICdkb2pvL3N0cmluZyc7XHJcblxyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYWN0aXZpdHlNeUxpc3QnKTtcclxuY29uc3QgaGFzaFRhZ1Jlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2FjdGl2aXR5TXlMaXN0SGFzaFRhZ3MnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLkFjdGl2aXR5Lk15TGlzdFxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBjcm0uVmlld3MuQWN0aXZpdHkuTGlzdFxyXG4gKiBAbWl4aW5zIGNybS5WaWV3cy5BY3Rpdml0eS5MaXN0XHJcbiAqXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5MaXN0XHJcbiAqIEByZXF1aXJlcyBhcmdvcy5Gb3JtYXRcclxuICogQHJlcXVpcmVzIGFyZ29zLlV0aWxpdHlcclxuICogQHJlcXVpcmVzIGFyZ29zLkNvbnZlcnRcclxuICogQHJlcXVpcmVzIGFyZ29zLkVycm9yTWFuYWdlclxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgY3JtLkZvcm1hdFxyXG4gKiBAcmVxdWlyZXMgY3JtLkVudmlyb25tZW50XHJcbiAqIEByZXF1aXJlcyBjcm0uVmlld3MuQWN0aXZpdHkuTGlzdFxyXG4gKiBAcmVxdWlyZXMgY3JtLkFjdGlvblxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgbW9tZW50XHJcbiAqXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLkFjdGl2aXR5Lk15TGlzdCcsIFtBY3Rpdml0eUxpc3QsIF9MaXN0T2ZmbGluZU1peGluXSwge1xyXG4gIGZvcm1hdCxcclxuICAvLyBUZW1wbGF0ZXNcclxuICAvLyBDYXJkIFZpZXdcclxuICByb3dUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgIGA8ZGl2IGRhdGEtYWN0aW9uPVwiYWN0aXZhdGVFbnRyeVwiIGRhdGEtbXktYWN0aXZpdHkta2V5PVwieyU9ICQuJGtleSAlfVwiIGRhdGEta2V5PVwieyU9ICQkLmdldEl0ZW1BY3Rpb25LZXkoJCkgJX1cIiBkYXRhLWRlc2NyaXB0b3I9XCJ7JTogJCQuZ2V0SXRlbURlc2NyaXB0b3IoJCkgJX1cIiBkYXRhLWFjdGl2aXR5LXR5cGU9XCJ7JTogJC5BY3Rpdml0eS5UeXBlICV9XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJ3aWRnZXRcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwid2lkZ2V0LWhlYWRlclwiPlxyXG4gICAgICAgICAgeyUhICQkLml0ZW1JY29uVGVtcGxhdGUgJX08aDIgY2xhc3M9XCJ3aWRnZXQtdGl0bGVcIj57JTogJCQuZ2V0VGl0bGUoJCkgJX08L2gyPlxyXG4gICAgICAgICAgeyUgaWYoJCQudmlzaWJsZUFjdGlvbnMubGVuZ3RoID4gMCAmJiAkJC5lbmFibGVBY3Rpb25zKSB7ICV9XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4tYWN0aW9uc1wiIHR5cGU9XCJidXR0b25cIiBkYXRhLWFjdGlvbj1cInNlbGVjdEVudHJ5XCIgZGF0YS1rZXk9XCJ7JT0gJCQuZ2V0SXRlbUFjdGlvbktleSgkKSAlfVwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXVkaWJsZVwiPkFjdGlvbnM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgPHN2ZyBjbGFzcz1cImljb25cIiBmb2N1c2FibGU9XCJmYWxzZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHJvbGU9XCJwcmVzZW50YXRpb25cIj5cclxuICAgICAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj1cIiNpY29uLW1vcmVcIj48L3VzZT5cclxuICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIHslISAkJC5saXN0QWN0aW9uVGVtcGxhdGUgJX1cclxuICAgICAgICAgIHslIH0gJX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1jb250ZW50XCI+XHJcbiAgICAgICAgICB7JSEgJCQuaXRlbVJvd0NvbnRlbnRUZW1wbGF0ZSAlfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PmAsXHJcbiAgXSksXHJcbiAgYWN0aXZpdHlUaW1lVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAneyUgaWYgKCQkLmlzVGltZWxlc3NUb2RheSgkKSkgeyAlfScsXHJcbiAgICAneyU6ICQkLmFsbERheVRleHQgJX0nLFxyXG4gICAgJ3slIH0gZWxzZSB7ICV9JyxcclxuICAgICd7JTogJCQuZm9ybWF0LnJlbGF0aXZlRGF0ZSgkLkFjdGl2aXR5LlN0YXJ0RGF0ZSwgYXJnb3MuQ29udmVydC50b0Jvb2xlYW4oJC5BY3Rpdml0eS5UaW1lbGVzcykpICV9JywgLy8gVE9ETzogQXZvaWQgZ2xvYmFsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgXSksXHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxwIGNsYXNzPVwibGlzdHZpZXctaGVhZGluZ1wiPicsXHJcbiAgICAnPHNwYW4gY2xhc3M9XCJwLWRlc2NyaXB0aW9uXCI+eyU6ICQkLmZvcm1hdC5waWNrbGlzdCgkJC5hcHAucGlja2xpc3RTZXJ2aWNlLCBudWxsLCBudWxsLCAkJC5nZXRQaWNrbGlzdEJ5QWN0aXZpdHlUeXBlKCQuQWN0aXZpdHkuVHlwZSwgXCJEZXNjcmlwdGlvblwiKSkoJC5BY3Rpdml0eS5EZXNjcmlwdGlvbikgJX17JSBpZiAoJC5TdGF0dXMgPT09IFwiYXNVbmNvbmZpcm1lZFwiKSB7ICV9ICh7JTogJCQuZm9ybWF0LnVzZXJBY3Rpdml0eVN0YXR1cygkLlN0YXR1cykgJX0pIHslIH0gJX08L3NwYW4+JyxcclxuICAgICc8L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj4nLFxyXG4gICAgJ3slISAkJC5hY3Rpdml0eVRpbWVUZW1wbGF0ZSAlfScsXHJcbiAgICAnPC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+eyUhICQkLm5hbWVUZW1wbGF0ZSAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPicsXHJcbiAgICAneyUgaWYgKCQuQWN0aXZpdHkuUGhvbmVOdW1iZXIpIHsgJX0nLFxyXG4gICAgJzxzcGFuIGNsYXNzPVwiaHlwZXJsaW5rXCIgZGF0YS1hY3Rpb249XCJfY2FsbFBob25lXCIgZGF0YS1rZXk9XCJ7JTogJC4ka2V5ICV9XCI+eyU6IGFyZ29zLkZvcm1hdC5waG9uZSgkLkFjdGl2aXR5LlBob25lTnVtYmVyKSAlfTwvc3Bhbj4nLCAvLyBUT0RPOiBBdm9pZCBnbG9iYWxcclxuICAgICd7JSB9ICV9JyxcclxuICAgICc8L3A+JyxcclxuICBdKSxcclxuICBuYW1lVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAneyUgaWYgKCQuQWN0aXZpdHkuQ29udGFjdE5hbWUpIHsgJX0nLFxyXG4gICAgJ3slOiAkLkFjdGl2aXR5LkNvbnRhY3ROYW1lICV9IHwgeyU6ICQuQWN0aXZpdHkuQWNjb3VudE5hbWUgJX0nLFxyXG4gICAgJ3slIH0gZWxzZSBpZiAoJC5BY3Rpdml0eS5BY2NvdW50TmFtZSkgeyAlfScsXHJcbiAgICAneyU6ICQuQWN0aXZpdHkuQWNjb3VudE5hbWUgJX0nLFxyXG4gICAgJ3slIH0gZWxzZSB7ICV9JyxcclxuICAgICd7JTogJC5BY3Rpdml0eS5MZWFkTmFtZSAlfScsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgXSksXHJcblxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIGNvbXBsZXRlQWN0aXZpdHlUZXh0OiByZXNvdXJjZS5jb21wbGV0ZUFjdGl2aXR5VGV4dCxcclxuICBhY2NlcHRBY3Rpdml0eVRleHQ6IHJlc291cmNlLmFjY2VwdEFjdGl2aXR5VGV4dCxcclxuICBkZWNsaW5lQWN0aXZpdHlUZXh0OiByZXNvdXJjZS5kZWNsaW5lQWN0aXZpdHlUZXh0LFxyXG4gIGNhbGxUZXh0OiByZXNvdXJjZS5jYWxsVGV4dCxcclxuICBjYWxsZWRUZXh0OiByZXNvdXJjZS5jYWxsZWRUZXh0LFxyXG4gIGFkZEF0dGFjaG1lbnRBY3Rpb25UZXh0OiByZXNvdXJjZS5hZGRBdHRhY2htZW50QWN0aW9uVGV4dCxcclxuICB2aWV3Q29udGFjdEFjdGlvblRleHQ6IHJlc291cmNlLnZpZXdDb250YWN0QWN0aW9uVGV4dCxcclxuICB2aWV3QWNjb3VudEFjdGlvblRleHQ6IHJlc291cmNlLnZpZXdBY2NvdW50QWN0aW9uVGV4dCxcclxuICB2aWV3T3Bwb3J0dW5pdHlBY3Rpb25UZXh0OiByZXNvdXJjZS52aWV3T3Bwb3J0dW5pdHlBY3Rpb25UZXh0LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ215YWN0aXZpdHlfbGlzdCcsXHJcbiAgZW50aXR5TmFtZTogJ1VzZXJBY3Rpdml0eScsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5VU0VSQUNUSVZJVFksXHJcbiAgZW5hYmxlT2ZmbGluZTogdHJ1ZSxcclxuICBoaXN0b3J5RWRpdFZpZXc6ICdoaXN0b3J5X2VkaXQnLFxyXG4gIGV4aXN0c1JFOiAvXltcXHddezEyfSQvLFxyXG4gIHF1ZXJ5V2hlcmU6IGZ1bmN0aW9uIHF1ZXJ5V2hlcmUoKSB7XHJcbiAgICByZXR1cm4gYFVzZXIuSWQgZXEgXCIke0FwcC5jb250ZXh0LnVzZXIuJGtleX1cIiBhbmQgU3RhdHVzIG5lIFwiYXNEZWNsbmVkXCIgYW5kIEFjdGl2aXR5LlR5cGUgbmUgXCJhdExpdGVyYXR1cmVcImA7XHJcbiAgfSxcclxuICBxdWVyeU9yZGVyQnk6ICdBY3Rpdml0eS5TdGFydERhdGUgZGVzYycsXHJcbiAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICdBbGFybScsXHJcbiAgICAnQWxhcm1UaW1lJyxcclxuICAgICdTdGF0dXMnLFxyXG4gICAgJ0FjdGl2aXR5L0Rlc2NyaXB0aW9uJyxcclxuICAgICdBY3Rpdml0eS9TdGFydERhdGUnLFxyXG4gICAgJ0FjdGl2aXR5L0VuZERhdGUnLFxyXG4gICAgJ0FjdGl2aXR5L1R5cGUnLFxyXG4gICAgJ0FjdGl2aXR5L0FjY291bnROYW1lJyxcclxuICAgICdBY3Rpdml0eS9BY2NvdW50SWQnLFxyXG4gICAgJ0FjdGl2aXR5L0NvbnRhY3RJZCcsXHJcbiAgICAnQWN0aXZpdHkvQ29udGFjdE5hbWUnLFxyXG4gICAgJ0FjdGl2aXR5L0xlYWRlcicsXHJcbiAgICAnQWN0aXZpdHkvTGVhZE5hbWUnLFxyXG4gICAgJ0FjdGl2aXR5L0xlYWRJZCcsXHJcbiAgICAnQWN0aXZpdHkvT3Bwb3J0dW5pdHlJZCcsXHJcbiAgICAnQWN0aXZpdHkvVGlja2V0SWQnLFxyXG4gICAgJ0FjdGl2aXR5L1VzZXJJZCcsXHJcbiAgICAnQWN0aXZpdHkvVGltZWxlc3MnLFxyXG4gICAgJ0FjdGl2aXR5L1Bob25lTnVtYmVyJyxcclxuICAgICdBY3Rpdml0eS9SZWN1cnJpbmcnLFxyXG4gICAgJ0FjdGl2aXR5L0FsYXJtJyxcclxuICAgICdBY3Rpdml0eS9Nb2RpZnlEYXRlJyxcclxuICAgICdBY3Rpdml0eS9Qcmlvcml0eScsXHJcbiAgXSxcclxuICByZXNvdXJjZUtpbmQ6ICd1c2VyQWN0aXZpdGllcycsXHJcbiAgYWxsb3dTZWxlY3Rpb246IHRydWUsXHJcbiAgZW5hYmxlQWN0aW9uczogdHJ1ZSxcclxuICBoYXNoVGFnUXVlcmllczoge1xyXG4gICAgYWxhcm06ICdBY3Rpdml0eS5BbGFybSBlcSB0cnVlJyxcclxuICAgICdzdGF0dXMtdW5jb25maXJtZWQnOiAnU3RhdHVzIGVxIFwiYXNVbmNvbmZpcm1lZFwiJyxcclxuICAgICdzdGF0dXMtYWNjZXB0ZWQnOiAnU3RhdHVzIGVxIFwiYXNBY2NlcHRlZFwiJyxcclxuICAgICdzdGF0dXMtZGVjbGluZWQnOiAnU3RhdHVzIGVxIFwiYXNEZWNsbmVkXCInLFxyXG4gICAgcmVjdXJyaW5nOiAnQWN0aXZpdHkuUmVjdXJyaW5nIGVxIHRydWUnLFxyXG4gICAgdGltZWxlc3M6ICdBY3Rpdml0eS5UaW1lbGVzcyBlcSB0cnVlJyxcclxuICAgIHllc3RlcmRheTogZnVuY3Rpb24geWVzdGVyZGF5KCkge1xyXG4gICAgICBjb25zdCBub3cgPSBtb21lbnQoKTtcclxuICAgICAgY29uc3QgeWVzdGVyZGF5U3RhcnQgPSBub3cuY2xvbmUoKS5zdWJ0cmFjdCgxLCAnZGF5cycpLnN0YXJ0T2YoJ2RheScpO1xyXG4gICAgICBjb25zdCB5ZXN0ZXJkYXlFbmQgPSB5ZXN0ZXJkYXlTdGFydC5jbG9uZSgpLmVuZE9mKCdkYXknKTtcclxuXHJcbiAgICAgIGNvbnN0IHRoZVF1ZXJ5ID0gYCgoQWN0aXZpdHkuVGltZWxlc3MgZXEgZmFsc2UgYW5kIEFjdGl2aXR5LlN0YXJ0RGF0ZSBiZXR3ZWVuIEAke2NvbnZlcnQudG9Jc29TdHJpbmdGcm9tRGF0ZSh5ZXN0ZXJkYXlTdGFydC50b0RhdGUoKSl9QCBhbmQgQCR7Y29udmVydC50b0lzb1N0cmluZ0Zyb21EYXRlKHllc3RlcmRheUVuZC50b0RhdGUoKSl9QCkgb3IgKEFjdGl2aXR5LlRpbWVsZXNzIGVxIHRydWUgYW5kIEFjdGl2aXR5LlN0YXJ0RGF0ZSBiZXR3ZWVuIEAke3llc3RlcmRheVN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERFQwMDowMDowMFtaXScpfUAgYW5kIEAke3llc3RlcmRheUVuZC5mb3JtYXQoJ1lZWVktTU0tRERUMjM6NTk6NTlbWl0nKX1AKSlgO1xyXG4gICAgICByZXR1cm4gdGhlUXVlcnk7XHJcbiAgICB9LFxyXG4gICAgdG9kYXk6IGZ1bmN0aW9uIHRvZGF5KCkge1xyXG4gICAgICBjb25zdCBub3cgPSBtb21lbnQoKTtcclxuICAgICAgY29uc3QgdG9kYXlTdGFydCA9IG5vdy5jbG9uZSgpLnN0YXJ0T2YoJ2RheScpO1xyXG4gICAgICBjb25zdCB0b2RheUVuZCA9IHRvZGF5U3RhcnQuY2xvbmUoKS5lbmRPZignZGF5Jyk7XHJcblxyXG4gICAgICBjb25zdCB0aGVRdWVyeSA9IGAoKEFjdGl2aXR5LlRpbWVsZXNzIGVxIGZhbHNlIGFuZCBBY3Rpdml0eS5TdGFydERhdGUgYmV0d2VlbiBAJHtjb252ZXJ0LnRvSXNvU3RyaW5nRnJvbURhdGUodG9kYXlTdGFydC50b0RhdGUoKSl9QCBhbmQgQCR7Y29udmVydC50b0lzb1N0cmluZ0Zyb21EYXRlKHRvZGF5RW5kLnRvRGF0ZSgpKX1AKSBvciAoQWN0aXZpdHkuVGltZWxlc3MgZXEgdHJ1ZSBhbmQgQWN0aXZpdHkuU3RhcnREYXRlIGJldHdlZW4gQCR7dG9kYXlTdGFydC5mb3JtYXQoJ1lZWVktTU0tRERUMDA6MDA6MDBbWl0nKX1AIGFuZCBAJHt0b2RheUVuZC5mb3JtYXQoJ1lZWVktTU0tRERUMjM6NTk6NTlbWl0nKX1AKSlgO1xyXG4gICAgICByZXR1cm4gdGhlUXVlcnk7XHJcbiAgICB9LFxyXG4gICAgJ3RoaXMtd2Vlayc6IGZ1bmN0aW9uIHRoaXNXZWVrKCkge1xyXG4gICAgICBjb25zdCBub3cgPSBtb21lbnQoKTtcclxuICAgICAgY29uc3Qgd2Vla1N0YXJ0RGF0ZSA9IG5vdy5jbG9uZSgpLnN0YXJ0T2YoJ3dlZWsnKTtcclxuICAgICAgY29uc3Qgd2Vla0VuZERhdGUgPSB3ZWVrU3RhcnREYXRlLmNsb25lKCkuZW5kT2YoJ3dlZWsnKTtcclxuXHJcbiAgICAgIGNvbnN0IHRoZVF1ZXJ5ID0gYCgoQWN0aXZpdHkuVGltZWxlc3MgZXEgZmFsc2UgYW5kIEFjdGl2aXR5LlN0YXJ0RGF0ZSBiZXR3ZWVuIEAke2NvbnZlcnQudG9Jc29TdHJpbmdGcm9tRGF0ZSh3ZWVrU3RhcnREYXRlLnRvRGF0ZSgpKX1AIGFuZCBAJHtjb252ZXJ0LnRvSXNvU3RyaW5nRnJvbURhdGUod2Vla0VuZERhdGUudG9EYXRlKCkpfUApIG9yIChBY3Rpdml0eS5UaW1lbGVzcyBlcSB0cnVlIGFuZCBBY3Rpdml0eS5TdGFydERhdGUgYmV0d2VlbiBAJHt3ZWVrU3RhcnREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERFQwMDowMDowMFtaXScpfUAgYW5kIEAke3dlZWtFbmREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERFQyMzo1OTo1OVtaXScpfUApKWA7XHJcbiAgICAgIHJldHVybiB0aGVRdWVyeTtcclxuICAgIH0sXHJcbiAgfSxcclxuICBoYXNoVGFnUXVlcmllc1RleHQ6IHtcclxuICAgIGFsYXJtOiBoYXNoVGFnUmVzb3VyY2UuaGFzaFRhZ0FsYXJtVGV4dCxcclxuICAgICdzdGF0dXMtdW5jb25maXJtZWQnOiBoYXNoVGFnUmVzb3VyY2UuaGFzaFRhZ1VuY29uZmlybWVkVGV4dCxcclxuICAgICdzdGF0dXMtYWNjZXB0ZWQnOiBoYXNoVGFnUmVzb3VyY2UuaGFzaFRhZ0FjY2VwdGVkVGV4dCxcclxuICAgICdzdGF0dXMtZGVjbGluZWQnOiBoYXNoVGFnUmVzb3VyY2UuaGFzaFRhZ0RlY2xpbmVkVGV4dCxcclxuICAgIHJlY3VycmluZzogaGFzaFRhZ1Jlc291cmNlLmhhc2hUYWdSZWN1cnJpbmdUZXh0LFxyXG4gICAgdGltZWxlc3M6IGhhc2hUYWdSZXNvdXJjZS5oYXNoVGFnVGltZWxlc3NUZXh0LFxyXG4gICAgdG9kYXk6IGhhc2hUYWdSZXNvdXJjZS5oYXNoVGFnVG9kYXlUZXh0LFxyXG4gICAgJ3RoaXMtd2Vlayc6IGhhc2hUYWdSZXNvdXJjZS5oYXNoVGFnVGhpc1dlZWtUZXh0LFxyXG4gICAgeWVzdGVyZGF5OiBoYXNoVGFnUmVzb3VyY2UuaGFzaFRhZ1llc3RlcmRheVRleHQsXHJcbiAgfSxcclxuICBjcmVhdGVUb29sTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVUb29sTGF5b3V0KCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICAgIGlmICh0aGlzLnRvb2xzICYmIHRoaXMudG9vbHMudGJhciAmJiAhdGhpcy5fcmVmcmVzaEFkZGVkICYmICF3aW5kb3cuQXBwLnN1cHBvcnRzVG91Y2goKSkge1xyXG4gICAgICB0aGlzLnRvb2xzLnRiYXIucHVzaCh7XHJcbiAgICAgICAgaWQ6ICdyZWZyZXNoJyxcclxuICAgICAgICBzdmc6ICdyZWZyZXNoJyxcclxuICAgICAgICBhY3Rpb246ICdfcmVmcmVzaENsaWNrZWQnLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMuX3JlZnJlc2hBZGRlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMudG9vbHM7XHJcbiAgfSxcclxuICBfcmVmcmVzaEFkZGVkOiBmYWxzZSxcclxuICBfcmVmcmVzaENsaWNrZWQ6IGZ1bmN0aW9uIF9yZWZyZXNoQ2xpY2tlZCgpIHtcclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIHRoaXMucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuICAgIHRoaXMucmVmcmVzaCgpO1xyXG5cclxuICAgIC8vIEhvb2sgZm9yIGN1c3RvbWl6ZXJzXHJcbiAgICB0aGlzLm9uUmVmcmVzaENsaWNrZWQoKTtcclxuICB9LFxyXG4gIG9uUmVmcmVzaENsaWNrZWQ6IGZ1bmN0aW9uIG9uUmVmcmVzaENsaWNrZWQoKSB7fSxcclxuICBfY2FsbFBob25lOiBmdW5jdGlvbiBfY2FsbFBob25lKHBhcmFtcykge1xyXG4gICAgdGhpcy5pbnZva2VBY3Rpb25JdGVtQnkoKHRoZUFjdGlvbikgPT4ge1xyXG4gICAgICByZXR1cm4gdGhlQWN0aW9uLmlkID09PSAnY2FsbCc7XHJcbiAgICB9LCBwYXJhbXMua2V5KTtcclxuICB9LFxyXG4gIGRlZmF1bHRTZWFyY2hUZXJtOiBmdW5jdGlvbiBkZWZhdWx0U2VhcmNoVGVybSgpIHtcclxuICAgIGlmIChBcHAuZW5hYmxlSGFzaFRhZ3MpIHtcclxuICAgICAgY29uc3QgaGFzaHRhZyA9IHRoaXMuaGFzaFRhZ1F1ZXJpZXNUZXh0Wyd0aGlzLXdlZWsnXTtcclxuICAgICAgaWYgKHR5cGVvZiBoYXNodGFnID09PSAnc3RyaW5nJyAmJiBoYXNodGFnLnN0YXJ0c1dpdGgoJyMnKSkge1xyXG4gICAgICAgIHJldHVybiBoYXNodGFnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gYCMke2hhc2h0YWd9YDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfSxcclxuICBjcmVhdGVBY3Rpb25MYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbkxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmFjdGlvbnMgfHwgKHRoaXMuYWN0aW9ucyA9IFt7XHJcbiAgICAgIGlkOiAndmlld0FjY291bnQnLFxyXG4gICAgICBsYWJlbDogdGhpcy52aWV3QWNjb3VudEFjdGlvblRleHQsXHJcbiAgICAgIGVuYWJsZWQ6IGZ1bmN0aW9uIGVuYWJsZWQodGhlQWN0aW9uLCBzZWxlY3Rpb24pIHtcclxuICAgICAgICBjb25zdCBlbnRyeSA9IHNlbGVjdGlvbiAmJiBzZWxlY3Rpb24uZGF0YTtcclxuICAgICAgICBpZiAoIWVudHJ5KSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlbnRyeS5BY3Rpdml0eS5BY2NvdW50SWQpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH0sXHJcbiAgICAgIGZuOiBmdW5jdGlvbiBmbih0aGVBY3Rpb24sIHNlbGVjdGlvbikge1xyXG4gICAgICAgIGNvbnN0IHZpZXdJZCA9ICdhY2NvdW50X2RldGFpbCc7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgIGtleTogc2VsZWN0aW9uLmRhdGEuQWN0aXZpdHkuQWNjb3VudElkLFxyXG4gICAgICAgICAgZGVzY3JpcHRvcjogc2VsZWN0aW9uLmRhdGEuQWN0aXZpdHkuQWNjb3VudE5hbWUsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KHZpZXdJZCk7XHJcbiAgICAgICAgaWYgKHZpZXcgJiYgb3B0aW9ucykge1xyXG4gICAgICAgICAgdmlldy5zaG93KG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgIH0sIHtcclxuICAgICAgaWQ6ICd2aWV3T3Bwb3J0dW5pdHknLFxyXG4gICAgICBsYWJlbDogdGhpcy52aWV3T3Bwb3J0dW5pdHlBY3Rpb25UZXh0LFxyXG4gICAgICBlbmFibGVkOiBmdW5jdGlvbiBlbmFibGVkKHRoZUFjdGlvbiwgc2VsZWN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgZW50cnkgPSBzZWxlY3Rpb24gJiYgc2VsZWN0aW9uLmRhdGE7XHJcbiAgICAgICAgaWYgKCFlbnRyeSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZW50cnkuQWN0aXZpdHkuT3Bwb3J0dW5pdHlJZCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfSxcclxuICAgICAgZm46IGZ1bmN0aW9uIGZuKHRoZUFjdGlvbiwgc2VsZWN0aW9uKSB7XHJcbiAgICAgICAgY29uc3Qgdmlld0lkID0gJ29wcG9ydHVuaXR5X2RldGFpbCc7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgIGtleTogc2VsZWN0aW9uLmRhdGEuQWN0aXZpdHkuT3Bwb3J0dW5pdHlJZCxcclxuICAgICAgICAgIGRlc2NyaXB0b3I6IHNlbGVjdGlvbi5kYXRhLkFjdGl2aXR5Lk9wcG9ydHVuaXR5TmFtZSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh2aWV3SWQpO1xyXG4gICAgICAgIGlmICh2aWV3ICYmIG9wdGlvbnMpIHtcclxuICAgICAgICAgIHZpZXcuc2hvdyhvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICB9LCB7XHJcbiAgICAgIGlkOiAndmlld0NvbnRhY3QnLFxyXG4gICAgICBsYWJlbDogdGhpcy52aWV3Q29udGFjdEFjdGlvblRleHQsXHJcbiAgICAgIGFjdGlvbjogJ25hdmlnYXRlVG9Db250YWN0T3JMZWFkJyxcclxuICAgICAgZW5hYmxlZDogdGhpcy5oYXNDb250YWN0T3JMZWFkLFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ2NvbXBsZXRlJyxcclxuICAgICAgY2xzOiAnZmEgZmEtY2hlY2stc3F1YXJlIGZhLTJ4JyxcclxuICAgICAgbGFiZWw6IHRoaXMuY29tcGxldGVBY3Rpdml0eVRleHQsXHJcbiAgICAgIGVuYWJsZWQ6IGZ1bmN0aW9uIGVuYWJsZWQodGhlQWN0aW9uLCBzZWxlY3Rpb24pIHtcclxuICAgICAgICBjb25zdCBlbnRyeSA9IHNlbGVjdGlvbiAmJiBzZWxlY3Rpb24uZGF0YTtcclxuICAgICAgICBpZiAoIWVudHJ5KSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCByZWN1ciA9IGVudHJ5LkFjdGl2aXR5LlJlY3VycmluZztcclxuXHJcbiAgICAgICAgcmV0dXJuIGVudHJ5LkFjdGl2aXR5LkxlYWRlci4ka2V5ID09PSBBcHAuY29udGV4dC51c2VyLiRrZXkgJiYgIXJlY3VyO1xyXG4gICAgICB9LFxyXG4gICAgICBmbjogKGZ1bmN0aW9uIGZuKHRoZUFjdGlvbiwgc2VsZWN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgZW50cnkgPSBzZWxlY3Rpb24gJiYgc2VsZWN0aW9uLmRhdGEgJiYgc2VsZWN0aW9uLmRhdGEuQWN0aXZpdHk7XHJcblxyXG4gICAgICAgIGVudHJ5LkNvbXBsZXRlZERhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGVudHJ5LlJlc3VsdCA9ICdDb21wbGV0ZSc7XHJcblxyXG4gICAgICAgIGVudmlyb25tZW50LnJlZnJlc2hBY3Rpdml0eUxpc3RzKCk7XHJcbiAgICAgICAgdGhpcy5jb21wbGV0ZUFjdGl2aXR5KGVudHJ5KTtcclxuICAgICAgfSkuYmluZERlbGVnYXRlKHRoaXMpLFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ2FjY2VwdCcsXHJcbiAgICAgIGNsczogJ2ZhIGZhLWNoZWNrIGZhLTJ4JyxcclxuICAgICAgbGFiZWw6IHRoaXMuYWNjZXB0QWN0aXZpdHlUZXh0LFxyXG4gICAgICBlbmFibGVkOiBmdW5jdGlvbiBlbmFibGVkKHRoZUFjdGlvbiwgc2VsZWN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgZW50cnkgPSBzZWxlY3Rpb24gJiYgc2VsZWN0aW9uLmRhdGE7XHJcbiAgICAgICAgaWYgKCFlbnRyeSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVudHJ5LlN0YXR1cyA9PT0gJ2FzVW5jb25maXJtZWQnO1xyXG4gICAgICB9LFxyXG4gICAgICBmbjogKGZ1bmN0aW9uIGZuKHRoZUFjdGlvbiwgc2VsZWN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgZW50cnkgPSBzZWxlY3Rpb24gJiYgc2VsZWN0aW9uLmRhdGE7XHJcbiAgICAgICAgZW52aXJvbm1lbnQucmVmcmVzaEFjdGl2aXR5TGlzdHMoKTtcclxuICAgICAgICB0aGlzLmNvbmZpcm1BY3Rpdml0eUZvcihlbnRyeS5BY3Rpdml0eS4ka2V5LCBBcHAuY29udGV4dC51c2VyLiRrZXkpO1xyXG4gICAgICB9KS5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICB9LCB7XHJcbiAgICAgIGlkOiAnZGVjbGluZScsXHJcbiAgICAgIGNsczogJ2ZhIGZhLWJhbiBmYS0yeCcsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmRlY2xpbmVBY3Rpdml0eVRleHQsXHJcbiAgICAgIGVuYWJsZWQ6IGZ1bmN0aW9uIGVuYWJsZWQodGhlQWN0aW9uLCBzZWxlY3Rpb24pIHtcclxuICAgICAgICBjb25zdCBlbnRyeSA9IHNlbGVjdGlvbiAmJiBzZWxlY3Rpb24uZGF0YTtcclxuICAgICAgICBpZiAoIWVudHJ5KSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZW50cnkuU3RhdHVzID09PSAnYXNVbmNvbmZpcm1lZCc7XHJcbiAgICAgIH0sXHJcbiAgICAgIGZuOiAoZnVuY3Rpb24gZm4odGhlQWN0aW9uLCBzZWxlY3Rpb24pIHtcclxuICAgICAgICBjb25zdCBlbnRyeSA9IHNlbGVjdGlvbiAmJiBzZWxlY3Rpb24uZGF0YTtcclxuXHJcbiAgICAgICAgZW52aXJvbm1lbnQucmVmcmVzaEFjdGl2aXR5TGlzdHMoKTtcclxuICAgICAgICB0aGlzLmRlY2xpbmVBY3Rpdml0eUZvcihlbnRyeS5BY3Rpdml0eS4ka2V5LCBBcHAuY29udGV4dC51c2VyLiRrZXkpO1xyXG4gICAgICB9KS5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICB9LCB7XHJcbiAgICAgIGlkOiAnY2FsbCcsXHJcbiAgICAgIGNsczogJ3Bob25lJyxcclxuICAgICAgbGFiZWw6IHRoaXMuY2FsbFRleHQsXHJcbiAgICAgIGVuYWJsZWQ6IGZ1bmN0aW9uIGVuYWJsZWQodGhlQWN0aW9uLCBzZWxlY3Rpb24pIHtcclxuICAgICAgICBjb25zdCBlbnRyeSA9IHNlbGVjdGlvbiAmJiBzZWxlY3Rpb24uZGF0YTtcclxuICAgICAgICByZXR1cm4gZW50cnkgJiYgZW50cnkuQWN0aXZpdHkgJiYgZW50cnkuQWN0aXZpdHkuUGhvbmVOdW1iZXI7XHJcbiAgICAgIH0sXHJcbiAgICAgIGZuOiBmdW5jdGlvbiBmbih0aGVBY3Rpb24sIHNlbGVjdGlvbikge1xyXG4gICAgICAgIGNvbnN0IGVudHJ5ID0gc2VsZWN0aW9uICYmIHNlbGVjdGlvbi5kYXRhO1xyXG4gICAgICAgIGNvbnN0IHBob25lID0gZW50cnkgJiYgZW50cnkuQWN0aXZpdHkgJiYgZW50cnkuQWN0aXZpdHkuUGhvbmVOdW1iZXI7XHJcbiAgICAgICAgaWYgKHBob25lKSB7XHJcbiAgICAgICAgICB0aGlzLnJlY29yZENhbGxUb0hpc3RvcnkoZnVuY3Rpb24gaW5pdGlhdGVDYWxsKCkge1xyXG4gICAgICAgICAgICBBcHAuaW5pdGlhdGVDYWxsKHBob25lKTtcclxuICAgICAgICAgIH0uYmluZERlbGVnYXRlKHRoaXMpLCBlbnRyeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgIH0sIHtcclxuICAgICAgaWQ6ICdhZGRBdHRhY2htZW50JyxcclxuICAgICAgY2xzOiAnYXR0YWNoJyxcclxuICAgICAgbGFiZWw6IHRoaXMuYWRkQXR0YWNobWVudEFjdGlvblRleHQsXHJcbiAgICAgIGZuOiBhY3Rpb24uYWRkQXR0YWNobWVudC5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICB9XSk7XHJcbiAgfSxcclxuICBzZWxlY3RFbnRyeTogZnVuY3Rpb24gc2VsZWN0RW50cnkocGFyYW1zKSB7XHJcbiAgICAvKiBPdmVycmlkZSBzZWxlY3RFbnRyeSBmcm9tIHRoZSBiYXNlIExpc3QgbWl4aW4uXHJcbiAgICAgKiBHcmFiYmluZyBhIGRpZmZlcmVudCBrZXkgaGVyZSwgc2luY2Ugd2UgdXNlIGVudHJ5LkFjdGl2aXR5LiRrZXkgYXMgdGhlIG1haW4gZGF0YS1rZXkuXHJcbiAgICAgKiBUT0RPOiBNYWtlIFtkYXRhLWtleV0gb3ZlcnJpZGVhYmxlIGluIHRoZSBiYXNlIGNsYXNzLlxyXG4gICAgICovXHJcbiAgICBjb25zdCByb3cgPSAkKGBbZGF0YS1rZXk9JyR7cGFyYW1zLmtleX0nXWAsIHRoaXMuY29udGVudE5vZGUpLmZpcnN0KCk7XHJcbiAgICBjb25zdCBrZXkgPSByb3cgPyByb3cuYXR0cignZGF0YS1teS1hY3Rpdml0eS1rZXknKSA6IGZhbHNlO1xyXG5cclxuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25Nb2RlbCAmJiBrZXkpIHtcclxuICAgICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0KGtleSwgdGhpcy5lbnRyaWVzW2tleV0sIHJvdy5nZXQoMCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnMuc2luZ2xlU2VsZWN0ICYmIHRoaXMub3B0aW9ucy5zaW5nbGVTZWxlY3RBY3Rpb24gJiYgIXRoaXMuZW5hYmxlQWN0aW9ucykge1xyXG4gICAgICB0aGlzLmludm9rZVNpbmdsZVNlbGVjdEFjdGlvbigpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZm9ybWF0U2VhcmNoUXVlcnk6IGZ1bmN0aW9uIGZvcm1hdFNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5KSB7XHJcbiAgICByZXR1cm4gYHVwcGVyKEFjdGl2aXR5LkRlc2NyaXB0aW9uKSBsaWtlIFwiJSR7dGhpcy5lc2NhcGVTZWFyY2hRdWVyeShzZWFyY2hRdWVyeS50b1VwcGVyQ2FzZSgpKX0lXCJgO1xyXG4gIH0sXHJcbiAgZGVjbGluZUFjdGl2aXR5Rm9yOiBmdW5jdGlvbiBkZWNsaW5lQWN0aXZpdHlGb3IoYWN0aXZpdHlJZCwgdXNlcklkKSB7XHJcbiAgICB0aGlzLl9nZXRVc2VyTm90aWZpY2F0aW9ucyhhY3Rpdml0eUlkLCB1c2VySWQsIGZhbHNlKTtcclxuICB9LFxyXG4gIGNvbmZpcm1BY3Rpdml0eUZvcjogZnVuY3Rpb24gY29uZmlybUFjdGl2aXR5Rm9yKGFjdGl2aXR5SWQsIHVzZXJJZCkge1xyXG4gICAgdGhpcy5fZ2V0VXNlck5vdGlmaWNhdGlvbnMoYWN0aXZpdHlJZCwgdXNlcklkLCB0cnVlKTtcclxuICB9LFxyXG4gIF9nZXRVc2VyTm90aWZpY2F0aW9uczogZnVuY3Rpb24gX2dldFVzZXJOb3RpZmljYXRpb25zKGFjdGl2aXR5SWQsIHVzZXJJZCwgYWNjZXB0KSB7XHJcbiAgICBsZXQgaWQgPSBhY3Rpdml0eUlkO1xyXG4gICAgaWYgKGFjdGl2aXR5SWQpIHtcclxuICAgICAgaWQgPSBhY3Rpdml0eUlkLnN1YnN0cmluZygwLCAxMik7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVxID0gbmV3IFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhUmVzb3VyY2VDb2xsZWN0aW9uUmVxdWVzdCh0aGlzLmdldFNlcnZpY2UoKSk7XHJcbiAgICByZXEuc2V0UmVzb3VyY2VLaW5kKCd1c2VyTm90aWZpY2F0aW9ucycpO1xyXG4gICAgcmVxLnNldENvbnRyYWN0TmFtZSgnZHluYW1pYycpO1xyXG4gICAgcmVxLnNldFF1ZXJ5QXJnKCd3aGVyZScsIGBBY3Rpdml0eUlkIGVxICcke2lkfScgYW5kIFRvVXNlci5JZCBlcSAnJHt1c2VySWR9J2ApO1xyXG4gICAgcmVxLnNldFF1ZXJ5QXJnKCdwcmVjZWRlbmNlJywgJzAnKTtcclxuICAgIHJlcS5yZWFkKHtcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2Vzcyh1c2VyTm90aWZpY2F0aW9ucykge1xyXG4gICAgICAgIGlmICh1c2VyTm90aWZpY2F0aW9ucy4kcmVzb3VyY2VzICYmIHVzZXJOb3RpZmljYXRpb25zLiRyZXNvdXJjZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgaWYgKGFjY2VwdCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjY2VwdENvbmZpcm1hdGlvbih1c2VyTm90aWZpY2F0aW9ucy4kcmVzb3VyY2VzWzBdKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVjbGluZUNvbmZpcm1hdGlvbih1c2VyTm90aWZpY2F0aW9ucy4kcmVzb3VyY2VzWzBdKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWx1cmU6IHRoaXMub25SZXF1ZXN0RmFpbHVyZSxcclxuICAgICAgc2NvcGU6IHRoaXMsXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGRlY2xpbmVDb25maXJtYXRpb246IGZ1bmN0aW9uIGRlY2xpbmVDb25maXJtYXRpb24obm90aWZpY2F0aW9uKSB7XHJcbiAgICB0aGlzLl9wb3N0VXNlck5vdGlmaWNhdGlvbnMobm90aWZpY2F0aW9uLCAnRGVjbGluZScpO1xyXG4gIH0sXHJcbiAgYWNjZXB0Q29uZmlybWF0aW9uOiBmdW5jdGlvbiBhY2NlcHRDb25maXJtYXRpb24obm90aWZpY2F0aW9uKSB7XHJcbiAgICB0aGlzLl9wb3N0VXNlck5vdGlmaWNhdGlvbnMobm90aWZpY2F0aW9uLCAnQWNjZXB0Jyk7XHJcbiAgfSxcclxuICBfcG9zdFVzZXJOb3RpZmljYXRpb25zOiBmdW5jdGlvbiBfcG9zdFVzZXJOb3RpZmljYXRpb25zKG5vdGlmaWNhdGlvbiwgb3BlcmF0aW9uKSB7XHJcbiAgICBpZiAoIW5vdGlmaWNhdGlvbiB8fCB0eXBlb2Ygb3BlcmF0aW9uICE9PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgICogVG8gZ2V0IHRoZSBwYXlsb2FkIHRlbXBsYXRlOlxyXG4gICAgICogaHR0cDovL2xvY2FsaG9zdDo2NjY2L1NseENsaWVudC9zbHhkYXRhLmFzaHgvc2x4L2R5bmFtaWMvLS91c2VyTm90aWZpY2F0aW9ucy8kc2VydmljZS9hY2NlcHQvJHRlbXBsYXRlP2Zvcm1hdD1qc29uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0IHBheWxvYWQgPSB7XHJcbiAgICAgICRuYW1lOiBvcGVyYXRpb24sXHJcbiAgICAgIHJlcXVlc3Q6IHtcclxuICAgICAgICBlbnRpdHk6IG5vdGlmaWNhdGlvbixcclxuICAgICAgICBVc2VyTm90aWZpY2F0aW9uSWQ6IG5vdGlmaWNhdGlvbi4ka2V5LFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhU2VydmljZU9wZXJhdGlvblJlcXVlc3QodGhpcy5nZXRTZXJ2aWNlKCkpXHJcbiAgICAgIC5zZXRDb250cmFjdE5hbWUoJ2R5bmFtaWMnKVxyXG4gICAgICAuc2V0UmVzb3VyY2VLaW5kKCd1c2Vybm90aWZpY2F0aW9ucycpXHJcbiAgICAgIC5zZXRPcGVyYXRpb25OYW1lKG9wZXJhdGlvbi50b0xvd2VyQ2FzZSgpKTtcclxuICAgIHJlcXVlc3QuZXhlY3V0ZShwYXlsb2FkLCB7XHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3MoKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICB9LFxyXG4gICAgICBmYWlsdXJlOiB0aGlzLm9uUmVxdWVzdEZhaWx1cmUsXHJcbiAgICAgIHNjb3BlOiB0aGlzLFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBjb21wbGV0ZUFjdGl2aXR5OiBmdW5jdGlvbiBjb21wbGV0ZUFjdGl2aXR5KGVudHJ5KSB7XHJcbiAgICBjb25zdCBhY3Rpdml0eU1vZGVsID0gQXBwLk1vZGVsTWFuYWdlci5nZXRNb2RlbChNT0RFTF9OQU1FUy5BQ1RJVklUWSwgTU9ERUxfVFlQRVMuU0RBVEEpO1xyXG4gICAgaWYgKGFjdGl2aXR5TW9kZWwpIHtcclxuICAgICAgYWN0aXZpdHlNb2RlbC5jb21wbGV0ZUFjdGl2aXR5KGVudHJ5KS50aGVuKCgpID0+IHtcclxuICAgICAgICBjb25uZWN0LnB1Ymxpc2goJy9hcHAvcmVmcmVzaCcsIFt7XHJcbiAgICAgICAgICByZXNvdXJjZUtpbmQ6ICdoaXN0b3J5JyxcclxuICAgICAgICB9XSk7XHJcblxyXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgfSwgKGVycikgPT4ge1xyXG4gICAgICAgIEVycm9yTWFuYWdlci5hZGRFcnJvcihlcnIsIHRoaXMsIHt9LCAnZmFpbHVyZScpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uUmVxdWVzdEZhaWx1cmU6IGZ1bmN0aW9uIG9uUmVxdWVzdEZhaWx1cmUocmVzcG9uc2UsIG8pIHtcclxuICAgIEVycm9yTWFuYWdlci5hZGRFcnJvcihyZXNwb25zZSwgbywge30sICdmYWlsdXJlJyk7XHJcbiAgfSxcclxuICBoYXNBbGFybTogZnVuY3Rpb24gaGFzQWxhcm0oZW50cnkpIHtcclxuICAgIGlmIChlbnRyeS5BY3Rpdml0eSAmJiBlbnRyeS5BY3Rpdml0eS5BbGFybSA9PT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSxcclxuICBoYXNCZWVuVG91Y2hlZDogZnVuY3Rpb24gaGFzQmVlblRvdWNoZWQoZW50cnkpIHtcclxuICAgIGlmIChlbnRyeS5BY3Rpdml0eS5Nb2RpZnlEYXRlKSB7XHJcbiAgICAgIGNvbnN0IG1vZGlmaWVkRGF0ZSA9IG1vbWVudChjb252ZXJ0LnRvRGF0ZUZyb21TdHJpbmcoZW50cnkuQWN0aXZpdHkuTW9kaWZ5RGF0ZSkpO1xyXG4gICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG1vbWVudCgpLmVuZE9mKCdkYXknKTtcclxuICAgICAgY29uc3Qgd2Vla0FnbyA9IG1vbWVudCgpLnN1YnRyYWN0KDEsICd3ZWVrcycpO1xyXG5cclxuICAgICAgcmV0dXJuIG1vZGlmaWVkRGF0ZS5pc0FmdGVyKHdlZWtBZ28pICYmXHJcbiAgICAgICAgbW9kaWZpZWREYXRlLmlzQmVmb3JlKGN1cnJlbnREYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSxcclxuICBpc0ltcG9ydGFudDogZnVuY3Rpb24gaXNJbXBvcnRhbnQoZW50cnkpIHtcclxuICAgIHJldHVybiBlbnRyeS5BY3Rpdml0eS5Qcmlvcml0eSA9PT0gJ0hpZ2gnO1xyXG4gIH0sXHJcbiAgaXNPdmVyZHVlOiBmdW5jdGlvbiBpc092ZXJkdWUoZW50cnkpIHtcclxuICAgIGlmIChlbnRyeS5BY3Rpdml0eS5TdGFydERhdGUpIHtcclxuICAgICAgY29uc3Qgc3RhcnREYXRlID0gY29udmVydC50b0RhdGVGcm9tU3RyaW5nKGVudHJ5LkFjdGl2aXR5LlN0YXJ0RGF0ZSk7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgY29uc3Qgc2Vjb25kcyA9IE1hdGgucm91bmQoKGN1cnJlbnREYXRlIC0gc3RhcnREYXRlKSAvIDEwMDApO1xyXG4gICAgICBjb25zdCBtaW5zID0gc2Vjb25kcyAvIDYwO1xyXG4gICAgICBpZiAobWlucyA+PSAxKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LFxyXG4gIGlzVGltZWxlc3NUb2RheTogZnVuY3Rpb24gaXNUaW1lbGVzc1RvZGF5KGVudHJ5KSB7XHJcbiAgICBpZiAoIWVudHJ5IHx8ICFlbnRyeS5BY3Rpdml0eSB8fCAhZW50cnkuQWN0aXZpdHkuVGltZWxlc3MpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN0YXJ0ID0gbW9tZW50KGVudHJ5LkFjdGl2aXR5LlN0YXJ0RGF0ZSk7XHJcbiAgICByZXR1cm4gdGhpcy5faXNUaW1lbGVzc1RvZGF5KHN0YXJ0KTtcclxuICB9LFxyXG4gIGlzUmVjdXJyaW5nOiBmdW5jdGlvbiBpc1JlY3VycmluZyhlbnRyeSkge1xyXG4gICAgaWYgKGVudHJ5LkFjdGl2aXR5LlJlY3VycmluZykge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSxcclxuICBnZXRJdGVtSWNvbkNsYXNzOiBmdW5jdGlvbiBnZXRJdGVtSWNvbkNsYXNzKGVudHJ5KSB7XHJcbiAgICBjb25zdCB0eXBlID0gZW50cnkgJiYgZW50cnkuQWN0aXZpdHkgJiYgZW50cnkuQWN0aXZpdHkuVHlwZTtcclxuICAgIHJldHVybiB0aGlzLl9nZXRJdGVtSWNvbkNsYXNzKHR5cGUpO1xyXG4gIH0sXHJcbiAgZ2V0SXRlbUFjdGlvbktleTogZnVuY3Rpb24gZ2V0SXRlbUFjdGlvbktleShlbnRyeSkge1xyXG4gICAgcmV0dXJuIGVudHJ5LkFjdGl2aXR5LiRrZXk7XHJcbiAgfSxcclxuICBnZXRJdGVtRGVzY3JpcHRvcjogZnVuY3Rpb24gZ2V0SXRlbURlc2NyaXB0b3IoZW50cnkpIHtcclxuICAgIHJldHVybiBlbnRyeS5BY3Rpdml0eS4kZGVzY3JpcHRvcjtcclxuICB9LFxyXG4gIGdldFRpdGxlOiBmdW5jdGlvbiBnZXRUaXRsZShlbnRyeSkge1xyXG4gICAgaWYgKCFlbnRyeSB8fCAhZW50cnkuQWN0aXZpdHkpIHtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAodGhpcy5fbW9kZWwgJiYgdGhpcy5fbW9kZWwuZ2V0RW50aXR5RGVzY3JpcHRpb24oZW50cnkuQWN0aXZpdHkpKSB8fCBlbnRyeS5BY3Rpdml0eS4kZGVzY3JpcHRvcjtcclxuICB9LFxyXG4gIGhhc0NvbnRhY3RPckxlYWQ6IGZ1bmN0aW9uIGhhc0NvbnRhY3RPckxlYWQodGhlQWN0aW9uLCBzZWxlY3Rpb24pIHtcclxuICAgIHJldHVybiAoc2VsZWN0aW9uLmRhdGEuQWN0aXZpdHkuQ29udGFjdElkKSB8fCAoc2VsZWN0aW9uLmRhdGEuQWN0aXZpdHkuTGVhZElkKTtcclxuICB9LFxyXG4gIG5hdmlnYXRlVG9Db250YWN0T3JMZWFkOiBmdW5jdGlvbiBuYXZpZ2F0ZVRvQ29udGFjdE9yTGVhZCh0aGVBY3Rpb24sIHNlbGVjdGlvbikge1xyXG4gICAgY29uc3QgZW50cnkgPSBzZWxlY3Rpb24uZGF0YS5BY3Rpdml0eTtcclxuICAgIGNvbnN0IGVudGl0eSA9IHRoaXMucmVzb2x2ZUNvbnRhY3RPckxlYWRFbnRpdHkoZW50cnkpO1xyXG4gICAgbGV0IHZpZXdJZDtcclxuICAgIGxldCBvcHRpb25zO1xyXG5cclxuICAgIHN3aXRjaCAoZW50aXR5KSB7XHJcbiAgICAgIGNhc2UgJ0NvbnRhY3QnOlxyXG4gICAgICAgIHZpZXdJZCA9ICdjb250YWN0X2RldGFpbCc7XHJcbiAgICAgICAgb3B0aW9ucyA9IHtcclxuICAgICAgICAgIGtleTogZW50cnkuQ29udGFjdElkLFxyXG4gICAgICAgICAgZGVzY3JpcHRvcjogZW50cnkuQ29udGFjdE5hbWUsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnTGVhZCc6XHJcbiAgICAgICAgdmlld0lkID0gJ2xlYWRfZGV0YWlsJztcclxuICAgICAgICBvcHRpb25zID0ge1xyXG4gICAgICAgICAga2V5OiBlbnRyeS5MZWFkSWQsXHJcbiAgICAgICAgICBkZXNjcmlwdG9yOiBlbnRyeS5MZWFkTmFtZSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh2aWV3SWQpO1xyXG5cclxuICAgIGlmICh2aWV3ICYmIG9wdGlvbnMpIHtcclxuICAgICAgdmlldy5zaG93KG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgbmF2aWdhdGVUb0RldGFpbFZpZXc6IGZ1bmN0aW9uIG5hdmlnYXRlVG9EZXRhaWxWaWV3KGtleSwgZGVzY3JpcHRvciwgYWRkaXRpb25hbE9wdGlvbnMpIHtcclxuICAgIGNvbnN0IG15TGlzdE9wdGlvbnMgPSBhZGRpdGlvbmFsT3B0aW9ucyB8fCB7fTtcclxuICAgIG15TGlzdE9wdGlvbnMucmV0dXJuVG8gPSB0aGlzLmlkO1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzLCBba2V5LCBkZXNjcmlwdG9yLCBteUxpc3RPcHRpb25zXSk7XHJcbiAgfSxcclxuICByZXNvbHZlQ29udGFjdE9yTGVhZEVudGl0eTogZnVuY3Rpb24gcmVzb2x2ZUNvbnRhY3RPckxlYWRFbnRpdHkoZW50cnkpIHtcclxuICAgIGNvbnN0IGV4aXN0cyA9IHRoaXMuZXhpc3RzUkU7XHJcblxyXG4gICAgaWYgKGVudHJ5KSB7XHJcbiAgICAgIGlmIChleGlzdHMudGVzdChlbnRyeS5MZWFkSWQpKSB7XHJcbiAgICAgICAgcmV0dXJuICdMZWFkJztcclxuICAgICAgfVxyXG4gICAgICBpZiAoZXhpc3RzLnRlc3QoZW50cnkuQ29udGFjdElkKSkge1xyXG4gICAgICAgIHJldHVybiAnQ29udGFjdCc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHJlY29yZENhbGxUb0hpc3Rvcnk6IGZ1bmN0aW9uIHJlY29yZENhbGxUb0hpc3RvcnkoY29tcGxldGUsIGVudHJ5KSB7XHJcbiAgICBjb25zdCB0ZW1wRW50cnkgPSB7XHJcbiAgICAgICRuYW1lOiAnSGlzdG9yeScsXHJcbiAgICAgIFR5cGU6ICdhdFBob25lQ2FsbCcsXHJcbiAgICAgIENvbnRhY3ROYW1lOiBlbnRyeS5BY3Rpdml0eS5Db250YWN0TmFtZSxcclxuICAgICAgQ29udGFjdElkOiBlbnRyeS5BY3Rpdml0eS5Db250YWN0SWQsXHJcbiAgICAgIEFjY291bnROYW1lOiBlbnRyeS5BY3Rpdml0eS5BY2NvdW50TmFtZSxcclxuICAgICAgQWNjb3VudElkOiBlbnRyeS5BY3Rpdml0eS5BY2NvdW50SWQsXHJcbiAgICAgIERlc2NyaXB0aW9uOiBzdHJpbmcuc3Vic3RpdHV0ZSh0aGlzLmNhbGxlZFRleHQsIFtlbnRyeS5BY3Rpdml0eS5Db250YWN0TmFtZSB8fCAnJ10pLFxyXG4gICAgICBVc2VySWQ6IEFwcC5jb250ZXh0ICYmIEFwcC5jb250ZXh0LnVzZXIuJGtleSxcclxuICAgICAgVXNlck5hbWU6IEFwcC5jb250ZXh0ICYmIEFwcC5jb250ZXh0LnVzZXIuVXNlck5hbWUsXHJcbiAgICAgIER1cmF0aW9uOiAxNSxcclxuICAgICAgQ29tcGxldGVkRGF0ZTogKG5ldyBEYXRlKCkpLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLm5hdmlnYXRlVG9IaXN0b3J5SW5zZXJ0KCdhdFBob25lQ2FsbCcsIHRlbXBFbnRyeSwgY29tcGxldGUpO1xyXG4gIH0sXHJcblxyXG4gIG5hdmlnYXRlVG9IaXN0b3J5SW5zZXJ0OiBmdW5jdGlvbiBuYXZpZ2F0ZVRvSGlzdG9yeUluc2VydCh0eXBlLCBlbnRyeSwgY29tcGxldGUpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLmhpc3RvcnlFZGl0Vmlldyk7XHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICBlbnZpcm9ubWVudC5yZWZyZXNoQWN0aXZpdHlMaXN0cygpO1xyXG4gICAgICB2aWV3LnNob3coe1xyXG4gICAgICAgIHRpdGxlOiBBY3Rpdml0eVR5cGVUZXh0W3R5cGVdLFxyXG4gICAgICAgIHRlbXBsYXRlOiB7fSxcclxuICAgICAgICBlbnRyeSxcclxuICAgICAgICBpbnNlcnQ6IHRydWUsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBjb21wbGV0ZSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjcmVhdGVCcmllZmNhc2VFbnRpdHk6IGZ1bmN0aW9uIGNyZWF0ZUJyaWVmY2FzZUVudGl0eShlbnRyeSkge1xyXG4gICAgY29uc3QgZW50aXR5ID0ge1xyXG4gICAgICBlbnRpdHlJZDogZW50cnkuQWN0aXZpdHkuJGtleSxcclxuICAgICAgZW50aXR5TmFtZTogJ0FjdGl2aXR5JyxcclxuICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgIGluY2x1ZGVSZWxhdGVkOiB0cnVlLFxyXG4gICAgICAgIHZpZXdJZDogdGhpcy5kZXRhaWxWaWV3LFxyXG4gICAgICAgIGljb25DbGFzczogdGhpcy5nZXRJdGVtSWNvbkNsYXNzKGVudHJ5KSxcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgICByZXR1cm4gZW50aXR5O1xyXG4gIH0sXHJcbiAgYWN0aXZhdGVFbnRyeTogZnVuY3Rpb24gYWN0aXZhdGVFbnRyeShwYXJhbXMpIHtcclxuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5lbnRyaWVzW3BhcmFtcy5teUFjdGl2aXR5S2V5XTtcclxuICAgIGlmIChlbnRyeSkge1xyXG4gICAgICBjb25zdCBhY3Rpdml0eVBhcmFtcyA9IHBhcmFtcztcclxuICAgICAgYWN0aXZpdHlQYXJhbXMuZGVzY3JpcHRvciA9IHRoaXMuX21vZGVsLmdldEVudGl0eURlc2NyaXB0aW9uKGVudHJ5LkFjdGl2aXR5KTtcclxuICAgICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzLCBbYWN0aXZpdHlQYXJhbXNdKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=