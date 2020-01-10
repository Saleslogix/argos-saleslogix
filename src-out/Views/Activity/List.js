define('crm/Views/Activity/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/connect', '../_RightDrawerListMixin', 'argos/List', 'argos/Convert', '../../Action', '../../Format', '../../Environment', 'argos/ErrorManager', '../../Models/Names', 'argos/Models/Types', 'argos/I18n', '../../Models/Activity/ActivityTypeIcon', '../../Models/Activity/ActivityTypePicklists', 'dojo/string'], function (module, exports, _declare, _connect, _RightDrawerListMixin2, _List, _Convert, _Action, _Format, _Environment, _ErrorManager, _Names, _Types, _I18n, _ActivityTypeIcon, _ActivityTypePicklists, _string) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _connect2 = _interopRequireDefault(_connect);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _List2 = _interopRequireDefault(_List);

  var _Convert2 = _interopRequireDefault(_Convert);

  var _Action2 = _interopRequireDefault(_Action);

  var _Format2 = _interopRequireDefault(_Format);

  var _Environment2 = _interopRequireDefault(_Environment);

  var _ErrorManager2 = _interopRequireDefault(_ErrorManager);

  var _Names2 = _interopRequireDefault(_Names);

  var _Types2 = _interopRequireDefault(_Types);

  var _I18n2 = _interopRequireDefault(_I18n);

  var activityTypeIcons = _interopRequireWildcard(_ActivityTypeIcon);

  var _string2 = _interopRequireDefault(_string);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('activityList'); /* Copyright 2017 Infor
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

  var hashTagResource = (0, _I18n2.default)('activityListHashTags');

  var __class = (0, _declare2.default)('crm.Views.Activity.List', [_List2.default, _RightDrawerListMixin3.default], {
    // Localization
    allDayText: resource.allDayText,
    completeActivityText: resource.completeActivityText,
    callText: resource.callText,
    calledText: resource.calledText,
    addAttachmentActionText: resource.addAttachmentActionText,
    overdueText: resource.overdueText,
    alarmText: resource.alarmText,
    touchedText: resource.touchedText,
    importantText: resource.importantText,
    recurringText: resource.recurringText,
    titleText: resource.titleText,
    addUnscheduledText: resource.addUnscheduledText,
    hashTagQueriesText: {
      alarm: hashTagResource.alarmText,
      recurring: hashTagResource.recurringText,
      timeless: hashTagResource.timelessText,
      today: hashTagResource.todayText,
      'this-week': hashTagResource.thisWeekText,
      yesterday: hashTagResource.yesterdayText
    },
    // Card View
    itemIcon: activityTypeIcons.default.atAppointment,
    format: _Format2.default,
    getPicklistByActivityType: _ActivityTypePicklists.getPicklistByActivityType,

    // Templates
    // Card View
    rowTemplate: new Simplate(['<div as data-action="activateEntry" data-key="{%= $$.getItemActionKey($) %}" data-descriptor="{%: $$.getItemDescriptor($) %}" data-activity-type="{%: $.Type %}">\n      <div class="widget">\n        <div class="widget-header">\n          {%! $$.itemIconTemplate %}<h2 class="widget-title">{%: $$.getTitle($) %}</h2>\n          <button class="btn-actions" type="button" data-action="selectEntry" data-key="{%= $$.getItemActionKey($) %}">\n            <span class="audible">Actions</span>\n            <svg class="icon" focusable="false" aria-hidden="true" role="presentation">\n              <use xlink:href="#icon-more"></use>\n            </svg>\n          </button>\n          {%! $$.listActionTemplate %}\n        </div>\n        <div class="card-content">\n          {%! $$.itemRowContentTemplate %}\n        </div>\n      </div>\n    </div>']),
    activityTimeTemplate: new Simplate(['{% if ($$.isTimelessToday($)) { %}', '{%: $$.allDayText %}', '{% } else { %}', '{%: $$.format.relativeDate($.StartDate, argos.Convert.toBoolean($.Timeless)) %}', // TODO: Avoid global
    '{% } %}']),
    itemTemplate: new Simplate(['<p class="listview-heading">', '<span class="p-description">{%: $$.format.picklist($$.app.picklistService, null, null, $$.getPicklistByActivityType($.Type, "Description"))($.Description) %}</span>', '</p>', '<p class="micro-text">', '{%! $$.activityTimeTemplate %}', '</p>', '<p class="micro-text">{%! $$.nameTemplate %}</p>']),
    nameTemplate: new Simplate(['{% if ($.ContactName) { %}', '{%: $.ContactName %} | {%: $.AccountName %}', '{% } else if ($.AccountName) { %}', '{%: $.AccountName %}', '{% } else { %}', '{%: $.LeadName %}', '{% } %}']),

    // View Properties
    id: 'activity_list',
    security: null, // 'Entities/Activity/View',
    iconClass: 'fa fa-check-square-o fa-lg',
    detailView: 'activity_detail',
    insertView: 'activity_types_list',
    historyEditView: 'history_edit',
    enableActions: true,
    pageSize: 105,
    resourceKind: 'activities',
    modelName: _Names2.default.ACTIVITY,

    hashTagQueries: {
      alarm: 'Alarm eq true',
      recurring: 'Recurring eq true',
      timeless: 'Timeless eq true',
      yesterday: function computeYesterday() {
        var now = moment();
        var yesterdayStart = now.clone().subtract(1, 'days').startOf('day');
        var yesterdayEnd = yesterdayStart.clone().endOf('day');

        var query = '((Timeless eq false and StartDate between @' + _Convert2.default.toIsoStringFromDate(yesterdayStart.toDate()) + '@ and @' + _Convert2.default.toIsoStringFromDate(yesterdayEnd.toDate()) + '@) or (Timeless eq true and StartDate between @' + yesterdayStart.format('YYYY-MM-DDT00:00:00[Z]') + '@ and @' + yesterdayEnd.format('YYYY-MM-DDT23:59:59[Z]') + '@))';
        return query;
      },
      today: function computeToday() {
        var now = moment();
        var todayStart = now.clone().startOf('day');
        var todayEnd = todayStart.clone().endOf('day');

        var query = '((Timeless eq false and StartDate between @' + _Convert2.default.toIsoStringFromDate(todayStart.toDate()) + '@ and @' + _Convert2.default.toIsoStringFromDate(todayEnd.toDate()) + '@) or (Timeless eq true and StartDate between @' + todayStart.format('YYYY-MM-DDT00:00:00[Z]') + '@ and @' + todayEnd.format('YYYY-MM-DDT23:59:59[Z]') + '@))';
        return query;
      },
      'this-week': function computeThisWeek() {
        var now = moment();
        var weekStartDate = now.clone().startOf('week');
        var weekEndDate = weekStartDate.clone().endOf('week');

        var query = '((Timeless eq false and StartDate between @' + _Convert2.default.toIsoStringFromDate(weekStartDate.toDate()) + '@ and @' + _Convert2.default.toIsoStringFromDate(weekEndDate.toDate()) + '@) or (Timeless eq true and StartDate between @' + weekStartDate.format('YYYY-MM-DDT00:00:00[Z]') + '@ and @' + weekEndDate.format('YYYY-MM-DDT23:59:59[Z]') + '@))';
        return query;
      }
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
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      return 'upper(Description) like "%' + this.escapeSearchQuery(searchQuery.toUpperCase()) + '%"';
    },
    formatDateTime: function formatDateTime() {
      return 'StartTime';
    },
    getItemActionKey: function getItemActionKey(entry) {
      return entry.$key;
    },
    getItemDescriptor: function getItemDescriptor(entry) {
      return entry.$descriptor;
    },
    getTitle: function getTitle(entry) {
      if (!entry) {
        return '';
      }

      return this._model && this._model.getEntityDescription(entry) || entry.$descriptor;
    },
    createToolLayout: function createToolLayout() {
      this.inherited(createToolLayout, arguments);
      if (this.tools && this.tools.tbar) {
        this.tools.tbar.unshift({
          id: 'newUnscheduled',
          svg: 'add',
          title: this.addUnscheduledText,
          action: 'navigateToNewUnscheduled',
          security: this.app.getViewSecurity(this.insertView, 'insert')
        });
      }

      return this.tools;
    },
    navigateToNewUnscheduled: function navigateToNewUnscheduled() {
      var additionalOptions = {
        unscheduled: true
      };

      this.navigateToInsertView(additionalOptions);
    },
    createIndicatorLayout: function createIndicatorLayout() {
      return this.itemIndicators || (this.itemIndicators = [{
        id: 'alarm',
        cls: 'notification',
        label: this.alarmText,
        onApply: function onApply(entry, parent) {
          this.isEnabled = parent.hasAlarm(entry);
        }
      }, {
        id: 'important',
        cls: 'star-filled',
        label: this.importantText,
        onApply: function onApply(entry, parent) {
          this.isEnabled = parent.isImportant(entry);
        }
      }, {
        id: 'recurring',
        cls: 'load',
        label: this.recurringText,
        onApply: function onApply(entry, parent) {
          this.isEnabled = parent.isRecurring(entry, this);
        }
      }, {
        id: 'overdue',
        cls: 'error',
        label: this.overdueText,
        onApply: function onApply(entry, parent) {
          this.isEnabled = parent.isOverdue(entry);
        }
      }, {
        id: 'touched',
        cls: 'flag',
        label: this.touchedText,
        onApply: function onApply(entry, parent) {
          this.isEnabled = parent.hasBeenTouched(entry);
        }
      }]);
    },
    hasBeenTouched: function hasBeenTouched(entry) {
      if (entry.ModifyDate) {
        var modifiedDate = moment(_Convert2.default.toDateFromString(entry.ModifyDate));
        var currentDate = moment().endOf('day');
        var weekAgo = moment().subtract(1, 'weeks');

        return modifiedDate.isAfter(weekAgo) && modifiedDate.isBefore(currentDate);
      }
      return false;
    },
    isImportant: function isImportant(entry) {
      return entry.Priority === 'High';
    },
    isOverdue: function isOverdue(entry) {
      if (entry.StartDate) {
        var startDate = _Convert2.default.toDateFromString(entry.StartDate);
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
      if (!entry || !entry.Timeless) {
        return false;
      }

      var start = moment(entry.StartDate);
      return this._isTimelessToday(start);
    },
    _isTimelessToday: function _isTimelessToday(start) {
      // Start is UTC, convert it to local time so we can compare it against "now"
      start.subtract({
        minutes: start.utcOffset()
      });
      return start.isAfter(moment().startOf('day')) && start.isBefore(moment().endOf('day'));
    },
    isRecurring: function isRecurring(entry) {
      if (entry.RecurrenceState) {
        if (entry.RecurrenceState === 'rstOccurrence') {
          return true;
        }
      }
      return false;
    },
    hasAlarm: function hasAlarm(entry) {
      if (entry.Alarm === true) {
        return true;
      }
      return false;
    },
    getItemIconClass: function getItemIconClass(entry) {
      var type = entry && entry.Type;
      return this._getItemIconClass(type);
    },
    _getItemIconClass: function _getItemIconClass(type) {
      return activityTypeIcons.default[type];
    },
    createActionLayout: function createActionLayout() {
      return this.actions || (this.actions = [{
        id: 'complete',
        cls: 'checkbox',
        label: this.completeActivityText,
        enabled: function enabled(theAction, selection) {
          var entry = selection && selection.data;
          if (!entry) {
            return false;
          }
          var recur = false;
          if (entry.RecurrenceState === 'rstOccurrence') {
            recur = true;
          }

          return entry.Leader.$key === App.context.user.$key && !recur;
        },
        fn: function fn(theAction, selection) {
          var entry = selection && selection.data && selection.data;

          entry.CompletedDate = new Date();
          entry.Result = 'Complete';

          _Environment2.default.refreshActivityLists();
          this.completeActivity(entry);
        }.bindDelegate(this)
      }, {
        id: 'call',
        cls: 'phone',
        label: this.callText,
        enabled: function enabled(theAction, selection) {
          var entry = selection && selection.data;
          return entry && entry.PhoneNumber;
        },
        fn: function fn(theAction, selection) {
          var entry = selection && selection.data;
          var phone = entry && entry.PhoneNumber;
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
    recordCallToHistory: function recordCallToHistory(complete, entry) {
      var tempEntry = {
        $name: 'History',
        Type: 'atPhoneCall',
        ContactName: entry.ContactName,
        ContactId: entry.ContactId,
        AccountName: entry.AccountName,
        AccountId: entry.AccountId,
        Description: _string2.default.substitute(this.calledText, [entry.ContactName || '']),
        UserId: App.context && App.context.user.$key,
        UserName: App.context && App.context.user.UserName,
        Duration: 15,
        CompletedDate: new Date()
      };

      this.navigateToHistoryInsert('atPhoneCall', tempEntry, complete);
    },
    navigateToHistoryInsert: function navigateToHistoryInsert(type, entry, complete) {
      _Action2.default.navigateToHistoryInsert(entry, complete);
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
          _this.onRequestFailure(err, _this);
        });
      }
    },
    onRequestFailure: function onRequestFailure(response, o) {
      _ErrorManager2.default.addError(response, o, {}, 'failure');
    },
    activateEntry: function activateEntry(params) {
      var entry = this.entries[params.key];
      if (entry) {
        var activityParams = params;
        activityParams.descriptor = this._model.getEntityDescription(entry);
        this.inherited(activateEntry, arguments, [activityParams]);
      } else {
        this.inherited(activateEntry, arguments);
      }
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});