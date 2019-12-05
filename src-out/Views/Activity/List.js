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

  /**
   * @class crm.Views.Activity.List
   *
   * @extends argos.List
   * @mixins crm.Views._RightDrawerListMixin
   *
   * @requires argos.List
   * @requires argos.Utility
   * @requires argos.Convert
   * @requires argos.ErrorManager
   * @requires crm.Action
   * @requires crm.Environment
   * @requires crm.Format
   * @requires crm.Views._RightDrawerListMixin
   *
   */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BY3Rpdml0eS9MaXN0LmpzIl0sIm5hbWVzIjpbImFjdGl2aXR5VHlwZUljb25zIiwicmVzb3VyY2UiLCJoYXNoVGFnUmVzb3VyY2UiLCJfX2NsYXNzIiwiYWxsRGF5VGV4dCIsImNvbXBsZXRlQWN0aXZpdHlUZXh0IiwiY2FsbFRleHQiLCJjYWxsZWRUZXh0IiwiYWRkQXR0YWNobWVudEFjdGlvblRleHQiLCJvdmVyZHVlVGV4dCIsImFsYXJtVGV4dCIsInRvdWNoZWRUZXh0IiwiaW1wb3J0YW50VGV4dCIsInJlY3VycmluZ1RleHQiLCJ0aXRsZVRleHQiLCJhZGRVbnNjaGVkdWxlZFRleHQiLCJoYXNoVGFnUXVlcmllc1RleHQiLCJhbGFybSIsInJlY3VycmluZyIsInRpbWVsZXNzIiwidGltZWxlc3NUZXh0IiwidG9kYXkiLCJ0b2RheVRleHQiLCJ0aGlzV2Vla1RleHQiLCJ5ZXN0ZXJkYXkiLCJ5ZXN0ZXJkYXlUZXh0IiwiaXRlbUljb24iLCJkZWZhdWx0IiwiYXRBcHBvaW50bWVudCIsImZvcm1hdCIsImdldFBpY2tsaXN0QnlBY3Rpdml0eVR5cGUiLCJyb3dUZW1wbGF0ZSIsIlNpbXBsYXRlIiwiYWN0aXZpdHlUaW1lVGVtcGxhdGUiLCJpdGVtVGVtcGxhdGUiLCJuYW1lVGVtcGxhdGUiLCJpZCIsInNlY3VyaXR5IiwiaWNvbkNsYXNzIiwiZGV0YWlsVmlldyIsImluc2VydFZpZXciLCJoaXN0b3J5RWRpdFZpZXciLCJlbmFibGVBY3Rpb25zIiwicGFnZVNpemUiLCJyZXNvdXJjZUtpbmQiLCJtb2RlbE5hbWUiLCJBQ1RJVklUWSIsImhhc2hUYWdRdWVyaWVzIiwiY29tcHV0ZVllc3RlcmRheSIsIm5vdyIsIm1vbWVudCIsInllc3RlcmRheVN0YXJ0IiwiY2xvbmUiLCJzdWJ0cmFjdCIsInN0YXJ0T2YiLCJ5ZXN0ZXJkYXlFbmQiLCJlbmRPZiIsInF1ZXJ5IiwidG9Jc29TdHJpbmdGcm9tRGF0ZSIsInRvRGF0ZSIsImNvbXB1dGVUb2RheSIsInRvZGF5U3RhcnQiLCJ0b2RheUVuZCIsImNvbXB1dGVUaGlzV2VlayIsIndlZWtTdGFydERhdGUiLCJ3ZWVrRW5kRGF0ZSIsImRlZmF1bHRTZWFyY2hUZXJtIiwiQXBwIiwiZW5hYmxlSGFzaFRhZ3MiLCJoYXNodGFnIiwic3RhcnRzV2l0aCIsImZvcm1hdFNlYXJjaFF1ZXJ5Iiwic2VhcmNoUXVlcnkiLCJlc2NhcGVTZWFyY2hRdWVyeSIsInRvVXBwZXJDYXNlIiwiZm9ybWF0RGF0ZVRpbWUiLCJnZXRJdGVtQWN0aW9uS2V5IiwiZW50cnkiLCIka2V5IiwiZ2V0SXRlbURlc2NyaXB0b3IiLCIkZGVzY3JpcHRvciIsImdldFRpdGxlIiwiX21vZGVsIiwiZ2V0RW50aXR5RGVzY3JpcHRpb24iLCJjcmVhdGVUb29sTGF5b3V0IiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwidG9vbHMiLCJ0YmFyIiwidW5zaGlmdCIsInN2ZyIsInRpdGxlIiwiYWN0aW9uIiwiYXBwIiwiZ2V0Vmlld1NlY3VyaXR5IiwibmF2aWdhdGVUb05ld1Vuc2NoZWR1bGVkIiwiYWRkaXRpb25hbE9wdGlvbnMiLCJ1bnNjaGVkdWxlZCIsIm5hdmlnYXRlVG9JbnNlcnRWaWV3IiwiY3JlYXRlSW5kaWNhdG9yTGF5b3V0IiwiaXRlbUluZGljYXRvcnMiLCJjbHMiLCJsYWJlbCIsIm9uQXBwbHkiLCJwYXJlbnQiLCJpc0VuYWJsZWQiLCJoYXNBbGFybSIsImlzSW1wb3J0YW50IiwiaXNSZWN1cnJpbmciLCJpc092ZXJkdWUiLCJoYXNCZWVuVG91Y2hlZCIsIk1vZGlmeURhdGUiLCJtb2RpZmllZERhdGUiLCJ0b0RhdGVGcm9tU3RyaW5nIiwiY3VycmVudERhdGUiLCJ3ZWVrQWdvIiwiaXNBZnRlciIsImlzQmVmb3JlIiwiUHJpb3JpdHkiLCJTdGFydERhdGUiLCJzdGFydERhdGUiLCJEYXRlIiwic2Vjb25kcyIsIk1hdGgiLCJyb3VuZCIsIm1pbnMiLCJpc1RpbWVsZXNzVG9kYXkiLCJUaW1lbGVzcyIsInN0YXJ0IiwiX2lzVGltZWxlc3NUb2RheSIsIm1pbnV0ZXMiLCJ1dGNPZmZzZXQiLCJSZWN1cnJlbmNlU3RhdGUiLCJBbGFybSIsImdldEl0ZW1JY29uQ2xhc3MiLCJ0eXBlIiwiVHlwZSIsIl9nZXRJdGVtSWNvbkNsYXNzIiwiY3JlYXRlQWN0aW9uTGF5b3V0IiwiYWN0aW9ucyIsImVuYWJsZWQiLCJ0aGVBY3Rpb24iLCJzZWxlY3Rpb24iLCJkYXRhIiwicmVjdXIiLCJMZWFkZXIiLCJjb250ZXh0IiwidXNlciIsImZuIiwiQ29tcGxldGVkRGF0ZSIsIlJlc3VsdCIsInJlZnJlc2hBY3Rpdml0eUxpc3RzIiwiY29tcGxldGVBY3Rpdml0eSIsImJpbmREZWxlZ2F0ZSIsIlBob25lTnVtYmVyIiwicGhvbmUiLCJyZWNvcmRDYWxsVG9IaXN0b3J5IiwiaW5pdGlhdGVDYWxsIiwiYWRkQXR0YWNobWVudCIsImNvbXBsZXRlIiwidGVtcEVudHJ5IiwiJG5hbWUiLCJDb250YWN0TmFtZSIsIkNvbnRhY3RJZCIsIkFjY291bnROYW1lIiwiQWNjb3VudElkIiwiRGVzY3JpcHRpb24iLCJzdWJzdGl0dXRlIiwiVXNlcklkIiwiVXNlck5hbWUiLCJEdXJhdGlvbiIsIm5hdmlnYXRlVG9IaXN0b3J5SW5zZXJ0IiwiYWN0aXZpdHlNb2RlbCIsIk1vZGVsTWFuYWdlciIsImdldE1vZGVsIiwiU0RBVEEiLCJ0aGVuIiwicHVibGlzaCIsImNsZWFyIiwicmVmcmVzaCIsImVyciIsIm9uUmVxdWVzdEZhaWx1cmUiLCJyZXNwb25zZSIsIm8iLCJhZGRFcnJvciIsImFjdGl2YXRlRW50cnkiLCJwYXJhbXMiLCJlbnRyaWVzIiwia2V5IiwiYWN0aXZpdHlQYXJhbXMiLCJkZXNjcmlwdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQTJCWUEsaUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtaLE1BQU1DLFdBQVcsb0JBQVksY0FBWixDQUFqQixDLENBaENBOzs7Ozs7Ozs7Ozs7Ozs7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OiJMaXN0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGNvbm5lY3QgZnJvbSAnZG9qby9fYmFzZS9jb25uZWN0JztcclxuaW1wb3J0IF9SaWdodERyYXdlckxpc3RNaXhpbiBmcm9tICcuLi9fUmlnaHREcmF3ZXJMaXN0TWl4aW4nO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuaW1wb3J0IGNvbnZlcnQgZnJvbSAnYXJnb3MvQ29udmVydCc7XHJcbmltcG9ydCBhY3Rpb24gZnJvbSAnLi4vLi4vQWN0aW9uJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICcuLi8uLi9Gb3JtYXQnO1xyXG5pbXBvcnQgZW52aXJvbm1lbnQgZnJvbSAnLi4vLi4vRW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgRXJyb3JNYW5hZ2VyIGZyb20gJ2FyZ29zL0Vycm9yTWFuYWdlcic7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi8uLi9Nb2RlbHMvTmFtZXMnO1xyXG5pbXBvcnQgTU9ERUxfVFlQRVMgZnJvbSAnYXJnb3MvTW9kZWxzL1R5cGVzJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5pbXBvcnQgKiBhcyBhY3Rpdml0eVR5cGVJY29ucyBmcm9tICcuLi8uLi9Nb2RlbHMvQWN0aXZpdHkvQWN0aXZpdHlUeXBlSWNvbic7XHJcbmltcG9ydCB7IGdldFBpY2tsaXN0QnlBY3Rpdml0eVR5cGUgfSBmcm9tICcuLi8uLi9Nb2RlbHMvQWN0aXZpdHkvQWN0aXZpdHlUeXBlUGlja2xpc3RzJztcclxuaW1wb3J0IHN0cmluZyBmcm9tICdkb2pvL3N0cmluZyc7XHJcblxyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYWN0aXZpdHlMaXN0Jyk7XHJcbmNvbnN0IGhhc2hUYWdSZXNvdXJjZSA9IGdldFJlc291cmNlKCdhY3Rpdml0eUxpc3RIYXNoVGFncycpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuQWN0aXZpdHkuTGlzdFxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5MaXN0XHJcbiAqIEBtaXhpbnMgY3JtLlZpZXdzLl9SaWdodERyYXdlckxpc3RNaXhpblxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuTGlzdFxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuVXRpbGl0eVxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuQ29udmVydFxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuRXJyb3JNYW5hZ2VyXHJcbiAqIEByZXF1aXJlcyBjcm0uQWN0aW9uXHJcbiAqIEByZXF1aXJlcyBjcm0uRW52aXJvbm1lbnRcclxuICogQHJlcXVpcmVzIGNybS5Gb3JtYXRcclxuICogQHJlcXVpcmVzIGNybS5WaWV3cy5fUmlnaHREcmF3ZXJMaXN0TWl4aW5cclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuQWN0aXZpdHkuTGlzdCcsIFtMaXN0LCBfUmlnaHREcmF3ZXJMaXN0TWl4aW5dLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgYWxsRGF5VGV4dDogcmVzb3VyY2UuYWxsRGF5VGV4dCxcclxuICBjb21wbGV0ZUFjdGl2aXR5VGV4dDogcmVzb3VyY2UuY29tcGxldGVBY3Rpdml0eVRleHQsXHJcbiAgY2FsbFRleHQ6IHJlc291cmNlLmNhbGxUZXh0LFxyXG4gIGNhbGxlZFRleHQ6IHJlc291cmNlLmNhbGxlZFRleHQsXHJcbiAgYWRkQXR0YWNobWVudEFjdGlvblRleHQ6IHJlc291cmNlLmFkZEF0dGFjaG1lbnRBY3Rpb25UZXh0LFxyXG4gIG92ZXJkdWVUZXh0OiByZXNvdXJjZS5vdmVyZHVlVGV4dCxcclxuICBhbGFybVRleHQ6IHJlc291cmNlLmFsYXJtVGV4dCxcclxuICB0b3VjaGVkVGV4dDogcmVzb3VyY2UudG91Y2hlZFRleHQsXHJcbiAgaW1wb3J0YW50VGV4dDogcmVzb3VyY2UuaW1wb3J0YW50VGV4dCxcclxuICByZWN1cnJpbmdUZXh0OiByZXNvdXJjZS5yZWN1cnJpbmdUZXh0LFxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIGFkZFVuc2NoZWR1bGVkVGV4dDogcmVzb3VyY2UuYWRkVW5zY2hlZHVsZWRUZXh0LFxyXG4gIGhhc2hUYWdRdWVyaWVzVGV4dDoge1xyXG4gICAgYWxhcm06IGhhc2hUYWdSZXNvdXJjZS5hbGFybVRleHQsXHJcbiAgICByZWN1cnJpbmc6IGhhc2hUYWdSZXNvdXJjZS5yZWN1cnJpbmdUZXh0LFxyXG4gICAgdGltZWxlc3M6IGhhc2hUYWdSZXNvdXJjZS50aW1lbGVzc1RleHQsXHJcbiAgICB0b2RheTogaGFzaFRhZ1Jlc291cmNlLnRvZGF5VGV4dCxcclxuICAgICd0aGlzLXdlZWsnOiBoYXNoVGFnUmVzb3VyY2UudGhpc1dlZWtUZXh0LFxyXG4gICAgeWVzdGVyZGF5OiBoYXNoVGFnUmVzb3VyY2UueWVzdGVyZGF5VGV4dCxcclxuICB9LFxyXG4gIC8vIENhcmQgVmlld1xyXG4gIGl0ZW1JY29uOiBhY3Rpdml0eVR5cGVJY29ucy5kZWZhdWx0LmF0QXBwb2ludG1lbnQsXHJcbiAgZm9ybWF0LFxyXG4gIGdldFBpY2tsaXN0QnlBY3Rpdml0eVR5cGUsXHJcblxyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIC8vIENhcmQgVmlld1xyXG4gIHJvd1RlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgYDxkaXYgYXMgZGF0YS1hY3Rpb249XCJhY3RpdmF0ZUVudHJ5XCIgZGF0YS1rZXk9XCJ7JT0gJCQuZ2V0SXRlbUFjdGlvbktleSgkKSAlfVwiIGRhdGEtZGVzY3JpcHRvcj1cInslOiAkJC5nZXRJdGVtRGVzY3JpcHRvcigkKSAlfVwiIGRhdGEtYWN0aXZpdHktdHlwZT1cInslOiAkLlR5cGUgJX1cIj5cclxuICAgICAgPGRpdiBjbGFzcz1cIndpZGdldFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3aWRnZXQtaGVhZGVyXCI+XHJcbiAgICAgICAgICB7JSEgJCQuaXRlbUljb25UZW1wbGF0ZSAlfTxoMiBjbGFzcz1cIndpZGdldC10aXRsZVwiPnslOiAkJC5nZXRUaXRsZSgkKSAlfTwvaDI+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuLWFjdGlvbnNcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS1hY3Rpb249XCJzZWxlY3RFbnRyeVwiIGRhdGEta2V5PVwieyU9ICQkLmdldEl0ZW1BY3Rpb25LZXkoJCkgJX1cIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhdWRpYmxlXCI+QWN0aW9uczwvc3Bhbj5cclxuICAgICAgICAgICAgPHN2ZyBjbGFzcz1cImljb25cIiBmb2N1c2FibGU9XCJmYWxzZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHJvbGU9XCJwcmVzZW50YXRpb25cIj5cclxuICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1tb3JlXCI+PC91c2U+XHJcbiAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICB7JSEgJCQubGlzdEFjdGlvblRlbXBsYXRlICV9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtY29udGVudFwiPlxyXG4gICAgICAgICAgeyUhICQkLml0ZW1Sb3dDb250ZW50VGVtcGxhdGUgJX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5gLFxyXG4gIF0pLFxyXG4gIGFjdGl2aXR5VGltZVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJ3slIGlmICgkJC5pc1RpbWVsZXNzVG9kYXkoJCkpIHsgJX0nLFxyXG4gICAgJ3slOiAkJC5hbGxEYXlUZXh0ICV9JyxcclxuICAgICd7JSB9IGVsc2UgeyAlfScsXHJcbiAgICAneyU6ICQkLmZvcm1hdC5yZWxhdGl2ZURhdGUoJC5TdGFydERhdGUsIGFyZ29zLkNvbnZlcnQudG9Cb29sZWFuKCQuVGltZWxlc3MpKSAlfScsIC8vIFRPRE86IEF2b2lkIGdsb2JhbFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gIF0pLFxyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cImxpc3R2aWV3LWhlYWRpbmdcIj4nLFxyXG4gICAgJzxzcGFuIGNsYXNzPVwicC1kZXNjcmlwdGlvblwiPnslOiAkJC5mb3JtYXQucGlja2xpc3QoJCQuYXBwLnBpY2tsaXN0U2VydmljZSwgbnVsbCwgbnVsbCwgJCQuZ2V0UGlja2xpc3RCeUFjdGl2aXR5VHlwZSgkLlR5cGUsIFwiRGVzY3JpcHRpb25cIikpKCQuRGVzY3JpcHRpb24pICV9PC9zcGFuPicsXHJcbiAgICAnPC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+JyxcclxuICAgICd7JSEgJCQuYWN0aXZpdHlUaW1lVGVtcGxhdGUgJX0nLFxyXG4gICAgJzwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPnslISAkJC5uYW1lVGVtcGxhdGUgJX08L3A+JyxcclxuICBdKSxcclxuICBuYW1lVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAneyUgaWYgKCQuQ29udGFjdE5hbWUpIHsgJX0nLFxyXG4gICAgJ3slOiAkLkNvbnRhY3ROYW1lICV9IHwgeyU6ICQuQWNjb3VudE5hbWUgJX0nLFxyXG4gICAgJ3slIH0gZWxzZSBpZiAoJC5BY2NvdW50TmFtZSkgeyAlfScsXHJcbiAgICAneyU6ICQuQWNjb3VudE5hbWUgJX0nLFxyXG4gICAgJ3slIH0gZWxzZSB7ICV9JyxcclxuICAgICd7JTogJC5MZWFkTmFtZSAlfScsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgXSksXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnYWN0aXZpdHlfbGlzdCcsXHJcbiAgc2VjdXJpdHk6IG51bGwsIC8vICdFbnRpdGllcy9BY3Rpdml0eS9WaWV3JyxcclxuICBpY29uQ2xhc3M6ICdmYSBmYS1jaGVjay1zcXVhcmUtbyBmYS1sZycsXHJcbiAgZGV0YWlsVmlldzogJ2FjdGl2aXR5X2RldGFpbCcsXHJcbiAgaW5zZXJ0VmlldzogJ2FjdGl2aXR5X3R5cGVzX2xpc3QnLFxyXG4gIGhpc3RvcnlFZGl0VmlldzogJ2hpc3RvcnlfZWRpdCcsXHJcbiAgZW5hYmxlQWN0aW9uczogdHJ1ZSxcclxuICBwYWdlU2l6ZTogMTA1LFxyXG4gIHJlc291cmNlS2luZDogJ2FjdGl2aXRpZXMnLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuQUNUSVZJVFksXHJcblxyXG4gIGhhc2hUYWdRdWVyaWVzOiB7XHJcbiAgICBhbGFybTogJ0FsYXJtIGVxIHRydWUnLFxyXG4gICAgcmVjdXJyaW5nOiAnUmVjdXJyaW5nIGVxIHRydWUnLFxyXG4gICAgdGltZWxlc3M6ICdUaW1lbGVzcyBlcSB0cnVlJyxcclxuICAgIHllc3RlcmRheTogZnVuY3Rpb24gY29tcHV0ZVllc3RlcmRheSgpIHtcclxuICAgICAgY29uc3Qgbm93ID0gbW9tZW50KCk7XHJcbiAgICAgIGNvbnN0IHllc3RlcmRheVN0YXJ0ID0gbm93LmNsb25lKClcclxuICAgICAgICAuc3VidHJhY3QoMSwgJ2RheXMnKVxyXG4gICAgICAgIC5zdGFydE9mKCdkYXknKTtcclxuICAgICAgY29uc3QgeWVzdGVyZGF5RW5kID0geWVzdGVyZGF5U3RhcnQuY2xvbmUoKVxyXG4gICAgICAgIC5lbmRPZignZGF5Jyk7XHJcblxyXG4gICAgICBjb25zdCBxdWVyeSA9IGAoKFRpbWVsZXNzIGVxIGZhbHNlIGFuZCBTdGFydERhdGUgYmV0d2VlbiBAJHtjb252ZXJ0LnRvSXNvU3RyaW5nRnJvbURhdGUoeWVzdGVyZGF5U3RhcnQudG9EYXRlKCkpfUAgYW5kIEAke2NvbnZlcnQudG9Jc29TdHJpbmdGcm9tRGF0ZSh5ZXN0ZXJkYXlFbmQudG9EYXRlKCkpfUApIG9yIChUaW1lbGVzcyBlcSB0cnVlIGFuZCBTdGFydERhdGUgYmV0d2VlbiBAJHt5ZXN0ZXJkYXlTdGFydC5mb3JtYXQoJ1lZWVktTU0tRERUMDA6MDA6MDBbWl0nKX1AIGFuZCBAJHt5ZXN0ZXJkYXlFbmQuZm9ybWF0KCdZWVlZLU1NLUREVDIzOjU5OjU5W1pdJyl9QCkpYDtcclxuICAgICAgcmV0dXJuIHF1ZXJ5O1xyXG4gICAgfSxcclxuICAgIHRvZGF5OiBmdW5jdGlvbiBjb21wdXRlVG9kYXkoKSB7XHJcbiAgICAgIGNvbnN0IG5vdyA9IG1vbWVudCgpO1xyXG4gICAgICBjb25zdCB0b2RheVN0YXJ0ID0gbm93LmNsb25lKClcclxuICAgICAgICAuc3RhcnRPZignZGF5Jyk7XHJcbiAgICAgIGNvbnN0IHRvZGF5RW5kID0gdG9kYXlTdGFydC5jbG9uZSgpXHJcbiAgICAgICAgLmVuZE9mKCdkYXknKTtcclxuXHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gYCgoVGltZWxlc3MgZXEgZmFsc2UgYW5kIFN0YXJ0RGF0ZSBiZXR3ZWVuIEAke2NvbnZlcnQudG9Jc29TdHJpbmdGcm9tRGF0ZSh0b2RheVN0YXJ0LnRvRGF0ZSgpKX1AIGFuZCBAJHtjb252ZXJ0LnRvSXNvU3RyaW5nRnJvbURhdGUodG9kYXlFbmQudG9EYXRlKCkpfUApIG9yIChUaW1lbGVzcyBlcSB0cnVlIGFuZCBTdGFydERhdGUgYmV0d2VlbiBAJHt0b2RheVN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERFQwMDowMDowMFtaXScpfUAgYW5kIEAke3RvZGF5RW5kLmZvcm1hdCgnWVlZWS1NTS1ERFQyMzo1OTo1OVtaXScpfUApKWA7XHJcbiAgICAgIHJldHVybiBxdWVyeTtcclxuICAgIH0sXHJcbiAgICAndGhpcy13ZWVrJzogZnVuY3Rpb24gY29tcHV0ZVRoaXNXZWVrKCkge1xyXG4gICAgICBjb25zdCBub3cgPSBtb21lbnQoKTtcclxuICAgICAgY29uc3Qgd2Vla1N0YXJ0RGF0ZSA9IG5vdy5jbG9uZSgpXHJcbiAgICAgICAgLnN0YXJ0T2YoJ3dlZWsnKTtcclxuICAgICAgY29uc3Qgd2Vla0VuZERhdGUgPSB3ZWVrU3RhcnREYXRlLmNsb25lKClcclxuICAgICAgICAuZW5kT2YoJ3dlZWsnKTtcclxuXHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gYCgoVGltZWxlc3MgZXEgZmFsc2UgYW5kIFN0YXJ0RGF0ZSBiZXR3ZWVuIEAke2NvbnZlcnQudG9Jc29TdHJpbmdGcm9tRGF0ZSh3ZWVrU3RhcnREYXRlLnRvRGF0ZSgpKX1AIGFuZCBAJHtjb252ZXJ0LnRvSXNvU3RyaW5nRnJvbURhdGUod2Vla0VuZERhdGUudG9EYXRlKCkpfUApIG9yIChUaW1lbGVzcyBlcSB0cnVlIGFuZCBTdGFydERhdGUgYmV0d2VlbiBAJHt3ZWVrU3RhcnREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERFQwMDowMDowMFtaXScpfUAgYW5kIEAke3dlZWtFbmREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERFQyMzo1OTo1OVtaXScpfUApKWA7XHJcbiAgICAgIHJldHVybiBxdWVyeTtcclxuICAgIH0sXHJcbiAgfSxcclxuICBkZWZhdWx0U2VhcmNoVGVybTogZnVuY3Rpb24gZGVmYXVsdFNlYXJjaFRlcm0oKSB7XHJcbiAgICBpZiAoQXBwLmVuYWJsZUhhc2hUYWdzKSB7XHJcbiAgICAgIGNvbnN0IGhhc2h0YWcgPSB0aGlzLmhhc2hUYWdRdWVyaWVzVGV4dFsndGhpcy13ZWVrJ107XHJcbiAgICAgIGlmICh0eXBlb2YgaGFzaHRhZyA9PT0gJ3N0cmluZycgJiYgaGFzaHRhZy5zdGFydHNXaXRoKCcjJykpIHtcclxuICAgICAgICByZXR1cm4gaGFzaHRhZztcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGAjJHtoYXNodGFnfWA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICcnO1xyXG4gIH0sXHJcbiAgZm9ybWF0U2VhcmNoUXVlcnk6IGZ1bmN0aW9uIGZvcm1hdFNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5KSB7XHJcbiAgICByZXR1cm4gYHVwcGVyKERlc2NyaXB0aW9uKSBsaWtlIFwiJSR7dGhpcy5lc2NhcGVTZWFyY2hRdWVyeShzZWFyY2hRdWVyeS50b1VwcGVyQ2FzZSgpKX0lXCJgO1xyXG4gIH0sXHJcbiAgZm9ybWF0RGF0ZVRpbWU6IGZ1bmN0aW9uIGZvcm1hdERhdGVUaW1lKCkge1xyXG4gICAgcmV0dXJuICdTdGFydFRpbWUnO1xyXG4gIH0sXHJcbiAgZ2V0SXRlbUFjdGlvbktleTogZnVuY3Rpb24gZ2V0SXRlbUFjdGlvbktleShlbnRyeSkge1xyXG4gICAgcmV0dXJuIGVudHJ5LiRrZXk7XHJcbiAgfSxcclxuICBnZXRJdGVtRGVzY3JpcHRvcjogZnVuY3Rpb24gZ2V0SXRlbURlc2NyaXB0b3IoZW50cnkpIHtcclxuICAgIHJldHVybiBlbnRyeS4kZGVzY3JpcHRvcjtcclxuICB9LFxyXG4gIGdldFRpdGxlOiBmdW5jdGlvbiBnZXRUaXRsZShlbnRyeSkge1xyXG4gICAgaWYgKCFlbnRyeSkge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICh0aGlzLl9tb2RlbCAmJiB0aGlzLl9tb2RlbC5nZXRFbnRpdHlEZXNjcmlwdGlvbihlbnRyeSkpIHx8IGVudHJ5LiRkZXNjcmlwdG9yO1xyXG4gIH0sXHJcbiAgY3JlYXRlVG9vbExheW91dDogZnVuY3Rpb24gY3JlYXRlVG9vbExheW91dCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGNyZWF0ZVRvb2xMYXlvdXQsIGFyZ3VtZW50cyk7XHJcbiAgICBpZiAodGhpcy50b29scyAmJiB0aGlzLnRvb2xzLnRiYXIpIHtcclxuICAgICAgdGhpcy50b29scy50YmFyLnVuc2hpZnQoe1xyXG4gICAgICAgIGlkOiAnbmV3VW5zY2hlZHVsZWQnLFxyXG4gICAgICAgIHN2ZzogJ2FkZCcsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMuYWRkVW5zY2hlZHVsZWRUZXh0LFxyXG4gICAgICAgIGFjdGlvbjogJ25hdmlnYXRlVG9OZXdVbnNjaGVkdWxlZCcsXHJcbiAgICAgICAgc2VjdXJpdHk6IHRoaXMuYXBwLmdldFZpZXdTZWN1cml0eSh0aGlzLmluc2VydFZpZXcsICdpbnNlcnQnKSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMudG9vbHM7XHJcbiAgfSxcclxuICBuYXZpZ2F0ZVRvTmV3VW5zY2hlZHVsZWQ6IGZ1bmN0aW9uIG5hdmlnYXRlVG9OZXdVbnNjaGVkdWxlZCgpIHtcclxuICAgIGNvbnN0IGFkZGl0aW9uYWxPcHRpb25zID0ge1xyXG4gICAgICB1bnNjaGVkdWxlZDogdHJ1ZSxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5uYXZpZ2F0ZVRvSW5zZXJ0VmlldyhhZGRpdGlvbmFsT3B0aW9ucyk7XHJcbiAgfSxcclxuICBjcmVhdGVJbmRpY2F0b3JMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUluZGljYXRvckxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLml0ZW1JbmRpY2F0b3JzIHx8ICh0aGlzLml0ZW1JbmRpY2F0b3JzID0gW3tcclxuICAgICAgaWQ6ICdhbGFybScsXHJcbiAgICAgIGNsczogJ25vdGlmaWNhdGlvbicsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmFsYXJtVGV4dCxcclxuICAgICAgb25BcHBseTogZnVuY3Rpb24gb25BcHBseShlbnRyeSwgcGFyZW50KSB7XHJcbiAgICAgICAgdGhpcy5pc0VuYWJsZWQgPSBwYXJlbnQuaGFzQWxhcm0oZW50cnkpO1xyXG4gICAgICB9LFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ2ltcG9ydGFudCcsXHJcbiAgICAgIGNsczogJ3N0YXItZmlsbGVkJyxcclxuICAgICAgbGFiZWw6IHRoaXMuaW1wb3J0YW50VGV4dCxcclxuICAgICAgb25BcHBseTogZnVuY3Rpb24gb25BcHBseShlbnRyeSwgcGFyZW50KSB7XHJcbiAgICAgICAgdGhpcy5pc0VuYWJsZWQgPSBwYXJlbnQuaXNJbXBvcnRhbnQoZW50cnkpO1xyXG4gICAgICB9LFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ3JlY3VycmluZycsXHJcbiAgICAgIGNsczogJ2xvYWQnLFxyXG4gICAgICBsYWJlbDogdGhpcy5yZWN1cnJpbmdUZXh0LFxyXG4gICAgICBvbkFwcGx5OiBmdW5jdGlvbiBvbkFwcGx5KGVudHJ5LCBwYXJlbnQpIHtcclxuICAgICAgICB0aGlzLmlzRW5hYmxlZCA9IHBhcmVudC5pc1JlY3VycmluZyhlbnRyeSwgdGhpcyk7XHJcbiAgICAgIH0sXHJcbiAgICB9LCB7XHJcbiAgICAgIGlkOiAnb3ZlcmR1ZScsXHJcbiAgICAgIGNsczogJ2Vycm9yJyxcclxuICAgICAgbGFiZWw6IHRoaXMub3ZlcmR1ZVRleHQsXHJcbiAgICAgIG9uQXBwbHk6IGZ1bmN0aW9uIG9uQXBwbHkoZW50cnksIHBhcmVudCkge1xyXG4gICAgICAgIHRoaXMuaXNFbmFibGVkID0gcGFyZW50LmlzT3ZlcmR1ZShlbnRyeSk7XHJcbiAgICAgIH0sXHJcbiAgICB9LCB7XHJcbiAgICAgIGlkOiAndG91Y2hlZCcsXHJcbiAgICAgIGNsczogJ2ZsYWcnLFxyXG4gICAgICBsYWJlbDogdGhpcy50b3VjaGVkVGV4dCxcclxuICAgICAgb25BcHBseTogZnVuY3Rpb24gb25BcHBseShlbnRyeSwgcGFyZW50KSB7XHJcbiAgICAgICAgdGhpcy5pc0VuYWJsZWQgPSBwYXJlbnQuaGFzQmVlblRvdWNoZWQoZW50cnkpO1xyXG4gICAgICB9LFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbiAgaGFzQmVlblRvdWNoZWQ6IGZ1bmN0aW9uIGhhc0JlZW5Ub3VjaGVkKGVudHJ5KSB7XHJcbiAgICBpZiAoZW50cnkuTW9kaWZ5RGF0ZSkge1xyXG4gICAgICBjb25zdCBtb2RpZmllZERhdGUgPSBtb21lbnQoY29udmVydC50b0RhdGVGcm9tU3RyaW5nKGVudHJ5Lk1vZGlmeURhdGUpKTtcclxuICAgICAgY29uc3QgY3VycmVudERhdGUgPSBtb21lbnQoKVxyXG4gICAgICAgIC5lbmRPZignZGF5Jyk7XHJcbiAgICAgIGNvbnN0IHdlZWtBZ28gPSBtb21lbnQoKVxyXG4gICAgICAgIC5zdWJ0cmFjdCgxLCAnd2Vla3MnKTtcclxuXHJcbiAgICAgIHJldHVybiBtb2RpZmllZERhdGUuaXNBZnRlcih3ZWVrQWdvKSAmJlxyXG4gICAgICAgIG1vZGlmaWVkRGF0ZS5pc0JlZm9yZShjdXJyZW50RGF0ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSxcclxuICBpc0ltcG9ydGFudDogZnVuY3Rpb24gaXNJbXBvcnRhbnQoZW50cnkpIHtcclxuICAgIHJldHVybiBlbnRyeS5Qcmlvcml0eSA9PT0gJ0hpZ2gnO1xyXG4gIH0sXHJcbiAgaXNPdmVyZHVlOiBmdW5jdGlvbiBpc092ZXJkdWUoZW50cnkpIHtcclxuICAgIGlmIChlbnRyeS5TdGFydERhdGUpIHtcclxuICAgICAgY29uc3Qgc3RhcnREYXRlID0gY29udmVydC50b0RhdGVGcm9tU3RyaW5nKGVudHJ5LlN0YXJ0RGF0ZSk7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgY29uc3Qgc2Vjb25kcyA9IE1hdGgucm91bmQoKGN1cnJlbnREYXRlIC0gc3RhcnREYXRlKSAvIDEwMDApO1xyXG4gICAgICBjb25zdCBtaW5zID0gc2Vjb25kcyAvIDYwO1xyXG4gICAgICBpZiAobWlucyA+PSAxKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LFxyXG4gIGlzVGltZWxlc3NUb2RheTogZnVuY3Rpb24gaXNUaW1lbGVzc1RvZGF5KGVudHJ5KSB7XHJcbiAgICBpZiAoIWVudHJ5IHx8ICFlbnRyeS5UaW1lbGVzcykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3RhcnQgPSBtb21lbnQoZW50cnkuU3RhcnREYXRlKTtcclxuICAgIHJldHVybiB0aGlzLl9pc1RpbWVsZXNzVG9kYXkoc3RhcnQpO1xyXG4gIH0sXHJcbiAgX2lzVGltZWxlc3NUb2RheTogZnVuY3Rpb24gX2lzVGltZWxlc3NUb2RheShzdGFydCkge1xyXG4gICAgLy8gU3RhcnQgaXMgVVRDLCBjb252ZXJ0IGl0IHRvIGxvY2FsIHRpbWUgc28gd2UgY2FuIGNvbXBhcmUgaXQgYWdhaW5zdCBcIm5vd1wiXHJcbiAgICBzdGFydC5zdWJ0cmFjdCh7XHJcbiAgICAgIG1pbnV0ZXM6IHN0YXJ0LnV0Y09mZnNldCgpLFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gc3RhcnQuaXNBZnRlcihtb21lbnQoKVxyXG4gICAgICAuc3RhcnRPZignZGF5JykpICYmIHN0YXJ0LmlzQmVmb3JlKG1vbWVudCgpXHJcbiAgICAgIC5lbmRPZignZGF5JykpO1xyXG4gIH0sXHJcbiAgaXNSZWN1cnJpbmc6IGZ1bmN0aW9uIGlzUmVjdXJyaW5nKGVudHJ5KSB7XHJcbiAgICBpZiAoZW50cnkuUmVjdXJyZW5jZVN0YXRlKSB7XHJcbiAgICAgIGlmIChlbnRyeS5SZWN1cnJlbmNlU3RhdGUgPT09ICdyc3RPY2N1cnJlbmNlJykge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSxcclxuICBoYXNBbGFybTogZnVuY3Rpb24gaGFzQWxhcm0oZW50cnkpIHtcclxuICAgIGlmIChlbnRyeS5BbGFybSA9PT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LFxyXG4gIGdldEl0ZW1JY29uQ2xhc3M6IGZ1bmN0aW9uIGdldEl0ZW1JY29uQ2xhc3MoZW50cnkpIHtcclxuICAgIGNvbnN0IHR5cGUgPSBlbnRyeSAmJiBlbnRyeS5UeXBlO1xyXG4gICAgcmV0dXJuIHRoaXMuX2dldEl0ZW1JY29uQ2xhc3ModHlwZSk7XHJcbiAgfSxcclxuICBfZ2V0SXRlbUljb25DbGFzczogZnVuY3Rpb24gX2dldEl0ZW1JY29uQ2xhc3ModHlwZSkge1xyXG4gICAgcmV0dXJuIGFjdGl2aXR5VHlwZUljb25zLmRlZmF1bHRbdHlwZV07XHJcbiAgfSxcclxuICBjcmVhdGVBY3Rpb25MYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbkxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmFjdGlvbnMgfHwgKHRoaXMuYWN0aW9ucyA9IFt7XHJcbiAgICAgIGlkOiAnY29tcGxldGUnLFxyXG4gICAgICBjbHM6ICdjaGVja2JveCcsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmNvbXBsZXRlQWN0aXZpdHlUZXh0LFxyXG4gICAgICBlbmFibGVkOiBmdW5jdGlvbiBlbmFibGVkKHRoZUFjdGlvbiwgc2VsZWN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgZW50cnkgPSBzZWxlY3Rpb24gJiYgc2VsZWN0aW9uLmRhdGE7XHJcbiAgICAgICAgaWYgKCFlbnRyeSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVjdXIgPSBmYWxzZTtcclxuICAgICAgICBpZiAoZW50cnkuUmVjdXJyZW5jZVN0YXRlID09PSAncnN0T2NjdXJyZW5jZScpIHtcclxuICAgICAgICAgIHJlY3VyID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlbnRyeS5MZWFkZXIuJGtleSA9PT0gQXBwLmNvbnRleHQudXNlci4ka2V5ICYmICFyZWN1cjtcclxuICAgICAgfSxcclxuICAgICAgZm46IChmdW5jdGlvbiBmbih0aGVBY3Rpb24sIHNlbGVjdGlvbikge1xyXG4gICAgICAgIGNvbnN0IGVudHJ5ID0gc2VsZWN0aW9uICYmIHNlbGVjdGlvbi5kYXRhICYmIHNlbGVjdGlvbi5kYXRhO1xyXG5cclxuICAgICAgICBlbnRyeS5Db21wbGV0ZWREYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICBlbnRyeS5SZXN1bHQgPSAnQ29tcGxldGUnO1xyXG5cclxuICAgICAgICBlbnZpcm9ubWVudC5yZWZyZXNoQWN0aXZpdHlMaXN0cygpO1xyXG4gICAgICAgIHRoaXMuY29tcGxldGVBY3Rpdml0eShlbnRyeSk7XHJcbiAgICAgIH0pXHJcbiAgICAgICAgLmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgIH0sIHtcclxuICAgICAgaWQ6ICdjYWxsJyxcclxuICAgICAgY2xzOiAncGhvbmUnLFxyXG4gICAgICBsYWJlbDogdGhpcy5jYWxsVGV4dCxcclxuICAgICAgZW5hYmxlZDogZnVuY3Rpb24gZW5hYmxlZCh0aGVBY3Rpb24sIHNlbGVjdGlvbikge1xyXG4gICAgICAgIGNvbnN0IGVudHJ5ID0gc2VsZWN0aW9uICYmIHNlbGVjdGlvbi5kYXRhO1xyXG4gICAgICAgIHJldHVybiBlbnRyeSAmJiBlbnRyeS5QaG9uZU51bWJlcjtcclxuICAgICAgfSxcclxuICAgICAgZm46IGZ1bmN0aW9uIGZuKHRoZUFjdGlvbiwgc2VsZWN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgZW50cnkgPSBzZWxlY3Rpb24gJiYgc2VsZWN0aW9uLmRhdGE7XHJcbiAgICAgICAgY29uc3QgcGhvbmUgPSBlbnRyeSAmJiBlbnRyeS5QaG9uZU51bWJlcjtcclxuICAgICAgICBpZiAocGhvbmUpIHtcclxuICAgICAgICAgIHRoaXMucmVjb3JkQ2FsbFRvSGlzdG9yeShmdW5jdGlvbiBpbml0aWF0ZUNhbGwoKSB7XHJcbiAgICAgICAgICAgIEFwcC5pbml0aWF0ZUNhbGwocGhvbmUpO1xyXG4gICAgICAgICAgfS5iaW5kRGVsZWdhdGUodGhpcyksIGVudHJ5KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0uYmluZERlbGVnYXRlKHRoaXMpLFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ2FkZEF0dGFjaG1lbnQnLFxyXG4gICAgICBjbHM6ICdhdHRhY2gnLFxyXG4gICAgICBsYWJlbDogdGhpcy5hZGRBdHRhY2htZW50QWN0aW9uVGV4dCxcclxuICAgICAgZm46IGFjdGlvbi5hZGRBdHRhY2htZW50LmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgIH1dKTtcclxuICB9LFxyXG4gIHJlY29yZENhbGxUb0hpc3Rvcnk6IGZ1bmN0aW9uIHJlY29yZENhbGxUb0hpc3RvcnkoY29tcGxldGUsIGVudHJ5KSB7XHJcbiAgICBjb25zdCB0ZW1wRW50cnkgPSB7XHJcbiAgICAgICRuYW1lOiAnSGlzdG9yeScsXHJcbiAgICAgIFR5cGU6ICdhdFBob25lQ2FsbCcsXHJcbiAgICAgIENvbnRhY3ROYW1lOiBlbnRyeS5Db250YWN0TmFtZSxcclxuICAgICAgQ29udGFjdElkOiBlbnRyeS5Db250YWN0SWQsXHJcbiAgICAgIEFjY291bnROYW1lOiBlbnRyeS5BY2NvdW50TmFtZSxcclxuICAgICAgQWNjb3VudElkOiBlbnRyeS5BY2NvdW50SWQsXHJcbiAgICAgIERlc2NyaXB0aW9uOiBzdHJpbmcuc3Vic3RpdHV0ZSh0aGlzLmNhbGxlZFRleHQsIFtlbnRyeS5Db250YWN0TmFtZSB8fCAnJ10pLFxyXG4gICAgICBVc2VySWQ6IEFwcC5jb250ZXh0ICYmIEFwcC5jb250ZXh0LnVzZXIuJGtleSxcclxuICAgICAgVXNlck5hbWU6IEFwcC5jb250ZXh0ICYmIEFwcC5jb250ZXh0LnVzZXIuVXNlck5hbWUsXHJcbiAgICAgIER1cmF0aW9uOiAxNSxcclxuICAgICAgQ29tcGxldGVkRGF0ZTogKG5ldyBEYXRlKCkpLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLm5hdmlnYXRlVG9IaXN0b3J5SW5zZXJ0KCdhdFBob25lQ2FsbCcsIHRlbXBFbnRyeSwgY29tcGxldGUpO1xyXG4gIH0sXHJcbiAgbmF2aWdhdGVUb0hpc3RvcnlJbnNlcnQ6IGZ1bmN0aW9uIG5hdmlnYXRlVG9IaXN0b3J5SW5zZXJ0KHR5cGUsIGVudHJ5LCBjb21wbGV0ZSkge1xyXG4gICAgYWN0aW9uLm5hdmlnYXRlVG9IaXN0b3J5SW5zZXJ0KGVudHJ5LCBjb21wbGV0ZSk7XHJcbiAgfSxcclxuICBjb21wbGV0ZUFjdGl2aXR5OiBmdW5jdGlvbiBjb21wbGV0ZUFjdGl2aXR5KGVudHJ5KSB7XHJcbiAgICBjb25zdCBhY3Rpdml0eU1vZGVsID0gQXBwLk1vZGVsTWFuYWdlci5nZXRNb2RlbChNT0RFTF9OQU1FUy5BQ1RJVklUWSwgTU9ERUxfVFlQRVMuU0RBVEEpO1xyXG4gICAgaWYgKGFjdGl2aXR5TW9kZWwpIHtcclxuICAgICAgYWN0aXZpdHlNb2RlbC5jb21wbGV0ZUFjdGl2aXR5KGVudHJ5KS50aGVuKCgpID0+IHtcclxuICAgICAgICBjb25uZWN0LnB1Ymxpc2goJy9hcHAvcmVmcmVzaCcsIFt7XHJcbiAgICAgICAgICByZXNvdXJjZUtpbmQ6ICdoaXN0b3J5JyxcclxuICAgICAgICB9XSk7XHJcblxyXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgfSwgKGVycikgPT4ge1xyXG4gICAgICAgIHRoaXMub25SZXF1ZXN0RmFpbHVyZShlcnIsIHRoaXMpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uUmVxdWVzdEZhaWx1cmU6IGZ1bmN0aW9uIG9uUmVxdWVzdEZhaWx1cmUocmVzcG9uc2UsIG8pIHtcclxuICAgIEVycm9yTWFuYWdlci5hZGRFcnJvcihyZXNwb25zZSwgbywge30sICdmYWlsdXJlJyk7XHJcbiAgfSxcclxuICBhY3RpdmF0ZUVudHJ5OiBmdW5jdGlvbiBhY3RpdmF0ZUVudHJ5KHBhcmFtcykge1xyXG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmVudHJpZXNbcGFyYW1zLmtleV07XHJcbiAgICBpZiAoZW50cnkpIHtcclxuICAgICAgY29uc3QgYWN0aXZpdHlQYXJhbXMgPSBwYXJhbXM7XHJcbiAgICAgIGFjdGl2aXR5UGFyYW1zLmRlc2NyaXB0b3IgPSB0aGlzLl9tb2RlbC5nZXRFbnRpdHlEZXNjcmlwdGlvbihlbnRyeSk7XHJcbiAgICAgIHRoaXMuaW5oZXJpdGVkKGFjdGl2YXRlRW50cnksIGFyZ3VtZW50cywgW2FjdGl2aXR5UGFyYW1zXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmluaGVyaXRlZChhY3RpdmF0ZUVudHJ5LCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19