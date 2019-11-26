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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BY3Rpdml0eS9MaXN0LmpzIl0sIm5hbWVzIjpbImFjdGl2aXR5VHlwZUljb25zIiwicmVzb3VyY2UiLCJoYXNoVGFnUmVzb3VyY2UiLCJfX2NsYXNzIiwiYWxsRGF5VGV4dCIsImNvbXBsZXRlQWN0aXZpdHlUZXh0IiwiY2FsbFRleHQiLCJjYWxsZWRUZXh0IiwiYWRkQXR0YWNobWVudEFjdGlvblRleHQiLCJvdmVyZHVlVGV4dCIsImFsYXJtVGV4dCIsInRvdWNoZWRUZXh0IiwiaW1wb3J0YW50VGV4dCIsInJlY3VycmluZ1RleHQiLCJ0aXRsZVRleHQiLCJoYXNoVGFnUXVlcmllc1RleHQiLCJhbGFybSIsInJlY3VycmluZyIsInRpbWVsZXNzIiwidGltZWxlc3NUZXh0IiwidG9kYXkiLCJ0b2RheVRleHQiLCJ0aGlzV2Vla1RleHQiLCJ5ZXN0ZXJkYXkiLCJ5ZXN0ZXJkYXlUZXh0IiwiaXRlbUljb24iLCJkZWZhdWx0IiwiYXRBcHBvaW50bWVudCIsImZvcm1hdCIsImdldFBpY2tsaXN0QnlBY3Rpdml0eVR5cGUiLCJyb3dUZW1wbGF0ZSIsIlNpbXBsYXRlIiwiYWN0aXZpdHlUaW1lVGVtcGxhdGUiLCJpdGVtVGVtcGxhdGUiLCJuYW1lVGVtcGxhdGUiLCJpZCIsInNlY3VyaXR5IiwiaWNvbkNsYXNzIiwiZGV0YWlsVmlldyIsImluc2VydFZpZXciLCJoaXN0b3J5RWRpdFZpZXciLCJlbmFibGVBY3Rpb25zIiwicGFnZVNpemUiLCJyZXNvdXJjZUtpbmQiLCJtb2RlbE5hbWUiLCJBQ1RJVklUWSIsImhhc2hUYWdRdWVyaWVzIiwiY29tcHV0ZVllc3RlcmRheSIsIm5vdyIsIm1vbWVudCIsInllc3RlcmRheVN0YXJ0IiwiY2xvbmUiLCJzdWJ0cmFjdCIsInN0YXJ0T2YiLCJ5ZXN0ZXJkYXlFbmQiLCJlbmRPZiIsInF1ZXJ5IiwidG9Jc29TdHJpbmdGcm9tRGF0ZSIsInRvRGF0ZSIsImNvbXB1dGVUb2RheSIsInRvZGF5U3RhcnQiLCJ0b2RheUVuZCIsImNvbXB1dGVUaGlzV2VlayIsIndlZWtTdGFydERhdGUiLCJ3ZWVrRW5kRGF0ZSIsImRlZmF1bHRTZWFyY2hUZXJtIiwiQXBwIiwiZW5hYmxlSGFzaFRhZ3MiLCJoYXNodGFnIiwic3RhcnRzV2l0aCIsImZvcm1hdFNlYXJjaFF1ZXJ5Iiwic2VhcmNoUXVlcnkiLCJlc2NhcGVTZWFyY2hRdWVyeSIsInRvVXBwZXJDYXNlIiwiZm9ybWF0RGF0ZVRpbWUiLCJnZXRJdGVtQWN0aW9uS2V5IiwiZW50cnkiLCIka2V5IiwiZ2V0SXRlbURlc2NyaXB0b3IiLCIkZGVzY3JpcHRvciIsImdldFRpdGxlIiwiX21vZGVsIiwiZ2V0RW50aXR5RGVzY3JpcHRpb24iLCJjcmVhdGVJbmRpY2F0b3JMYXlvdXQiLCJpdGVtSW5kaWNhdG9ycyIsImNscyIsImxhYmVsIiwib25BcHBseSIsInBhcmVudCIsImlzRW5hYmxlZCIsImhhc0FsYXJtIiwiaXNJbXBvcnRhbnQiLCJpc1JlY3VycmluZyIsImlzT3ZlcmR1ZSIsImhhc0JlZW5Ub3VjaGVkIiwiTW9kaWZ5RGF0ZSIsIm1vZGlmaWVkRGF0ZSIsInRvRGF0ZUZyb21TdHJpbmciLCJjdXJyZW50RGF0ZSIsIndlZWtBZ28iLCJpc0FmdGVyIiwiaXNCZWZvcmUiLCJQcmlvcml0eSIsIlN0YXJ0RGF0ZSIsInN0YXJ0RGF0ZSIsIkRhdGUiLCJzZWNvbmRzIiwiTWF0aCIsInJvdW5kIiwibWlucyIsImlzVGltZWxlc3NUb2RheSIsIlRpbWVsZXNzIiwic3RhcnQiLCJfaXNUaW1lbGVzc1RvZGF5IiwibWludXRlcyIsInV0Y09mZnNldCIsIlJlY3VycmVuY2VTdGF0ZSIsIkFsYXJtIiwiZ2V0SXRlbUljb25DbGFzcyIsInR5cGUiLCJUeXBlIiwiX2dldEl0ZW1JY29uQ2xhc3MiLCJjcmVhdGVBY3Rpb25MYXlvdXQiLCJhY3Rpb25zIiwiZW5hYmxlZCIsInRoZUFjdGlvbiIsInNlbGVjdGlvbiIsImRhdGEiLCJyZWN1ciIsIkxlYWRlciIsImNvbnRleHQiLCJ1c2VyIiwiZm4iLCJDb21wbGV0ZWREYXRlIiwiUmVzdWx0IiwicmVmcmVzaEFjdGl2aXR5TGlzdHMiLCJjb21wbGV0ZUFjdGl2aXR5IiwiYmluZERlbGVnYXRlIiwiUGhvbmVOdW1iZXIiLCJwaG9uZSIsInJlY29yZENhbGxUb0hpc3RvcnkiLCJpbml0aWF0ZUNhbGwiLCJhZGRBdHRhY2htZW50IiwiY29tcGxldGUiLCJ0ZW1wRW50cnkiLCIkbmFtZSIsIkNvbnRhY3ROYW1lIiwiQ29udGFjdElkIiwiQWNjb3VudE5hbWUiLCJBY2NvdW50SWQiLCJEZXNjcmlwdGlvbiIsInN1YnN0aXR1dGUiLCJVc2VySWQiLCJVc2VyTmFtZSIsIkR1cmF0aW9uIiwibmF2aWdhdGVUb0hpc3RvcnlJbnNlcnQiLCJhY3Rpdml0eU1vZGVsIiwiTW9kZWxNYW5hZ2VyIiwiZ2V0TW9kZWwiLCJTREFUQSIsInRoZW4iLCJwdWJsaXNoIiwiY2xlYXIiLCJyZWZyZXNoIiwiZXJyIiwib25SZXF1ZXN0RmFpbHVyZSIsInJlc3BvbnNlIiwibyIsImFkZEVycm9yIiwiYWN0aXZhdGVFbnRyeSIsInBhcmFtcyIsImVudHJpZXMiLCJrZXkiLCJhY3Rpdml0eVBhcmFtcyIsImRlc2NyaXB0b3IiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BMkJZQSxpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS1osTUFBTUMsV0FBVyxvQkFBWSxjQUFaLENBQWpCLEMsQ0FoQ0E7Ozs7Ozs7Ozs7Ozs7OztBQWlDQSxNQUFNQyxrQkFBa0Isb0JBQVksc0JBQVosQ0FBeEI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkEsTUFBTUMsVUFBVSx1QkFBUSx5QkFBUixFQUFtQyxnREFBbkMsRUFBa0U7QUFDaEY7QUFDQUMsZ0JBQVlILFNBQVNHLFVBRjJEO0FBR2hGQywwQkFBc0JKLFNBQVNJLG9CQUhpRDtBQUloRkMsY0FBVUwsU0FBU0ssUUFKNkQ7QUFLaEZD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U0FBTCxDQUFlTixhQUFmLEVBQThCTyxTQUE5QixFQUF5QyxDQUFDSCxjQUFELENBQXpDO0FBQ0QsT0FKRCxNQUlPO0FBQ0wsYUFBS0UsU0FBTCxDQUFlTixhQUFmLEVBQThCTyxTQUE5QjtBQUNEO0FBQ0Y7QUFsVytFLEdBQWxFLENBQWhCOztvQkFxV2U3SyxPIiwiZmlsZSI6Ikxpc3QuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgY29ubmVjdCBmcm9tICdkb2pvL19iYXNlL2Nvbm5lY3QnO1xyXG5pbXBvcnQgX1JpZ2h0RHJhd2VyTGlzdE1peGluIGZyb20gJy4uL19SaWdodERyYXdlckxpc3RNaXhpbic7XHJcbmltcG9ydCBMaXN0IGZyb20gJ2FyZ29zL0xpc3QnO1xyXG5pbXBvcnQgY29udmVydCBmcm9tICdhcmdvcy9Db252ZXJ0JztcclxuaW1wb3J0IGFjdGlvbiBmcm9tICcuLi8uLi9BY3Rpb24nO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJy4uLy4uL0Zvcm1hdCc7XHJcbmltcG9ydCBlbnZpcm9ubWVudCBmcm9tICcuLi8uLi9FbnZpcm9ubWVudCc7XHJcbmltcG9ydCBFcnJvck1hbmFnZXIgZnJvbSAnYXJnb3MvRXJyb3JNYW5hZ2VyJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBNT0RFTF9UWVBFUyBmcm9tICdhcmdvcy9Nb2RlbHMvVHlwZXMnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCAqIGFzIGFjdGl2aXR5VHlwZUljb25zIGZyb20gJy4uLy4uL01vZGVscy9BY3Rpdml0eS9BY3Rpdml0eVR5cGVJY29uJztcclxuaW1wb3J0IHsgZ2V0UGlja2xpc3RCeUFjdGl2aXR5VHlwZSB9IGZyb20gJy4uLy4uL01vZGVscy9BY3Rpdml0eS9BY3Rpdml0eVR5cGVQaWNrbGlzdHMnO1xyXG5pbXBvcnQgc3RyaW5nIGZyb20gJ2Rvam8vc3RyaW5nJztcclxuXHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdhY3Rpdml0eUxpc3QnKTtcclxuY29uc3QgaGFzaFRhZ1Jlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2FjdGl2aXR5TGlzdEhhc2hUYWdzJyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5BY3Rpdml0eS5MaXN0XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkxpc3RcclxuICogQG1peGlucyBjcm0uVmlld3MuX1JpZ2h0RHJhd2VyTGlzdE1peGluXHJcbiAqXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5MaXN0XHJcbiAqIEByZXF1aXJlcyBhcmdvcy5VdGlsaXR5XHJcbiAqIEByZXF1aXJlcyBhcmdvcy5Db252ZXJ0XHJcbiAqIEByZXF1aXJlcyBhcmdvcy5FcnJvck1hbmFnZXJcclxuICogQHJlcXVpcmVzIGNybS5BY3Rpb25cclxuICogQHJlcXVpcmVzIGNybS5FbnZpcm9ubWVudFxyXG4gKiBAcmVxdWlyZXMgY3JtLkZvcm1hdFxyXG4gKiBAcmVxdWlyZXMgY3JtLlZpZXdzLl9SaWdodERyYXdlckxpc3RNaXhpblxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5BY3Rpdml0eS5MaXN0JywgW0xpc3QsIF9SaWdodERyYXdlckxpc3RNaXhpbl0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICBhbGxEYXlUZXh0OiByZXNvdXJjZS5hbGxEYXlUZXh0LFxyXG4gIGNvbXBsZXRlQWN0aXZpdHlUZXh0OiByZXNvdXJjZS5jb21wbGV0ZUFjdGl2aXR5VGV4dCxcclxuICBjYWxsVGV4dDogcmVzb3VyY2UuY2FsbFRleHQsXHJcbiAgY2FsbGVkVGV4dDogcmVzb3VyY2UuY2FsbGVkVGV4dCxcclxuICBhZGRBdHRhY2htZW50QWN0aW9uVGV4dDogcmVzb3VyY2UuYWRkQXR0YWNobWVudEFjdGlvblRleHQsXHJcbiAgb3ZlcmR1ZVRleHQ6IHJlc291cmNlLm92ZXJkdWVUZXh0LFxyXG4gIGFsYXJtVGV4dDogcmVzb3VyY2UuYWxhcm1UZXh0LFxyXG4gIHRvdWNoZWRUZXh0OiByZXNvdXJjZS50b3VjaGVkVGV4dCxcclxuICBpbXBvcnRhbnRUZXh0OiByZXNvdXJjZS5pbXBvcnRhbnRUZXh0LFxyXG4gIHJlY3VycmluZ1RleHQ6IHJlc291cmNlLnJlY3VycmluZ1RleHQsXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgaGFzaFRhZ1F1ZXJpZXNUZXh0OiB7XHJcbiAgICBhbGFybTogaGFzaFRhZ1Jlc291cmNlLmFsYXJtVGV4dCxcclxuICAgIHJlY3VycmluZzogaGFzaFRhZ1Jlc291cmNlLnJlY3VycmluZ1RleHQsXHJcbiAgICB0aW1lbGVzczogaGFzaFRhZ1Jlc291cmNlLnRpbWVsZXNzVGV4dCxcclxuICAgIHRvZGF5OiBoYXNoVGFnUmVzb3VyY2UudG9kYXlUZXh0LFxyXG4gICAgJ3RoaXMtd2Vlayc6IGhhc2hUYWdSZXNvdXJjZS50aGlzV2Vla1RleHQsXHJcbiAgICB5ZXN0ZXJkYXk6IGhhc2hUYWdSZXNvdXJjZS55ZXN0ZXJkYXlUZXh0LFxyXG4gIH0sXHJcbiAgLy8gQ2FyZCBWaWV3XHJcbiAgaXRlbUljb246IGFjdGl2aXR5VHlwZUljb25zLmRlZmF1bHQuYXRBcHBvaW50bWVudCxcclxuICBmb3JtYXQsXHJcbiAgZ2V0UGlja2xpc3RCeUFjdGl2aXR5VHlwZSxcclxuXHJcbiAgLy8gVGVtcGxhdGVzXHJcbiAgLy8gQ2FyZCBWaWV3XHJcbiAgcm93VGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICBgPGRpdiBhcyBkYXRhLWFjdGlvbj1cImFjdGl2YXRlRW50cnlcIiBkYXRhLWtleT1cInslPSAkJC5nZXRJdGVtQWN0aW9uS2V5KCQpICV9XCIgZGF0YS1kZXNjcmlwdG9yPVwieyU6ICQkLmdldEl0ZW1EZXNjcmlwdG9yKCQpICV9XCIgZGF0YS1hY3Rpdml0eS10eXBlPVwieyU6ICQuVHlwZSAlfVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwid2lkZ2V0XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIndpZGdldC1oZWFkZXJcIj5cclxuICAgICAgICAgIHslISAkJC5pdGVtSWNvblRlbXBsYXRlICV9PGgyIGNsYXNzPVwid2lkZ2V0LXRpdGxlXCI+eyU6ICQkLmdldFRpdGxlKCQpICV9PC9oMj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4tYWN0aW9uc1wiIHR5cGU9XCJidXR0b25cIiBkYXRhLWFjdGlvbj1cInNlbGVjdEVudHJ5XCIgZGF0YS1rZXk9XCJ7JT0gJCQuZ2V0SXRlbUFjdGlvbktleSgkKSAlfVwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImF1ZGlibGVcIj5BY3Rpb25zPC9zcGFuPlxyXG4gICAgICAgICAgICA8c3ZnIGNsYXNzPVwiaWNvblwiIGZvY3VzYWJsZT1cImZhbHNlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgcm9sZT1cInByZXNlbnRhdGlvblwiPlxyXG4gICAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj1cIiNpY29uLW1vcmVcIj48L3VzZT5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIHslISAkJC5saXN0QWN0aW9uVGVtcGxhdGUgJX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1jb250ZW50XCI+XHJcbiAgICAgICAgICB7JSEgJCQuaXRlbVJvd0NvbnRlbnRUZW1wbGF0ZSAlfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PmAsXHJcbiAgXSksXHJcbiAgYWN0aXZpdHlUaW1lVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAneyUgaWYgKCQkLmlzVGltZWxlc3NUb2RheSgkKSkgeyAlfScsXHJcbiAgICAneyU6ICQkLmFsbERheVRleHQgJX0nLFxyXG4gICAgJ3slIH0gZWxzZSB7ICV9JyxcclxuICAgICd7JTogJCQuZm9ybWF0LnJlbGF0aXZlRGF0ZSgkLlN0YXJ0RGF0ZSwgYXJnb3MuQ29udmVydC50b0Jvb2xlYW4oJC5UaW1lbGVzcykpICV9JywgLy8gVE9ETzogQXZvaWQgZ2xvYmFsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgXSksXHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxwIGNsYXNzPVwibGlzdHZpZXctaGVhZGluZ1wiPicsXHJcbiAgICAnPHNwYW4gY2xhc3M9XCJwLWRlc2NyaXB0aW9uXCI+eyU6ICQkLmZvcm1hdC5waWNrbGlzdCgkJC5hcHAucGlja2xpc3RTZXJ2aWNlLCBudWxsLCBudWxsLCAkJC5nZXRQaWNrbGlzdEJ5QWN0aXZpdHlUeXBlKCQuVHlwZSwgXCJEZXNjcmlwdGlvblwiKSkoJC5EZXNjcmlwdGlvbikgJX08L3NwYW4+JyxcclxuICAgICc8L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj4nLFxyXG4gICAgJ3slISAkJC5hY3Rpdml0eVRpbWVUZW1wbGF0ZSAlfScsXHJcbiAgICAnPC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+eyUhICQkLm5hbWVUZW1wbGF0ZSAlfTwvcD4nLFxyXG4gIF0pLFxyXG4gIG5hbWVUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICd7JSBpZiAoJC5Db250YWN0TmFtZSkgeyAlfScsXHJcbiAgICAneyU6ICQuQ29udGFjdE5hbWUgJX0gfCB7JTogJC5BY2NvdW50TmFtZSAlfScsXHJcbiAgICAneyUgfSBlbHNlIGlmICgkLkFjY291bnROYW1lKSB7ICV9JyxcclxuICAgICd7JTogJC5BY2NvdW50TmFtZSAlfScsXHJcbiAgICAneyUgfSBlbHNlIHsgJX0nLFxyXG4gICAgJ3slOiAkLkxlYWROYW1lICV9JyxcclxuICAgICd7JSB9ICV9JyxcclxuICBdKSxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdhY3Rpdml0eV9saXN0JyxcclxuICBzZWN1cml0eTogbnVsbCwgLy8gJ0VudGl0aWVzL0FjdGl2aXR5L1ZpZXcnLFxyXG4gIGljb25DbGFzczogJ2ZhIGZhLWNoZWNrLXNxdWFyZS1vIGZhLWxnJyxcclxuICBkZXRhaWxWaWV3OiAnYWN0aXZpdHlfZGV0YWlsJyxcclxuICBpbnNlcnRWaWV3OiAnYWN0aXZpdHlfdHlwZXNfbGlzdCcsXHJcbiAgaGlzdG9yeUVkaXRWaWV3OiAnaGlzdG9yeV9lZGl0JyxcclxuICBlbmFibGVBY3Rpb25zOiB0cnVlLFxyXG4gIHBhZ2VTaXplOiAxMDUsXHJcbiAgcmVzb3VyY2VLaW5kOiAnYWN0aXZpdGllcycsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5BQ1RJVklUWSxcclxuXHJcbiAgaGFzaFRhZ1F1ZXJpZXM6IHtcclxuICAgIGFsYXJtOiAnQWxhcm0gZXEgdHJ1ZScsXHJcbiAgICByZWN1cnJpbmc6ICdSZWN1cnJpbmcgZXEgdHJ1ZScsXHJcbiAgICB0aW1lbGVzczogJ1RpbWVsZXNzIGVxIHRydWUnLFxyXG4gICAgeWVzdGVyZGF5OiBmdW5jdGlvbiBjb21wdXRlWWVzdGVyZGF5KCkge1xyXG4gICAgICBjb25zdCBub3cgPSBtb21lbnQoKTtcclxuICAgICAgY29uc3QgeWVzdGVyZGF5U3RhcnQgPSBub3cuY2xvbmUoKVxyXG4gICAgICAgIC5zdWJ0cmFjdCgxLCAnZGF5cycpXHJcbiAgICAgICAgLnN0YXJ0T2YoJ2RheScpO1xyXG4gICAgICBjb25zdCB5ZXN0ZXJkYXlFbmQgPSB5ZXN0ZXJkYXlTdGFydC5jbG9uZSgpXHJcbiAgICAgICAgLmVuZE9mKCdkYXknKTtcclxuXHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gYCgoVGltZWxlc3MgZXEgZmFsc2UgYW5kIFN0YXJ0RGF0ZSBiZXR3ZWVuIEAke2NvbnZlcnQudG9Jc29TdHJpbmdGcm9tRGF0ZSh5ZXN0ZXJkYXlTdGFydC50b0RhdGUoKSl9QCBhbmQgQCR7Y29udmVydC50b0lzb1N0cmluZ0Zyb21EYXRlKHllc3RlcmRheUVuZC50b0RhdGUoKSl9QCkgb3IgKFRpbWVsZXNzIGVxIHRydWUgYW5kIFN0YXJ0RGF0ZSBiZXR3ZWVuIEAke3llc3RlcmRheVN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERFQwMDowMDowMFtaXScpfUAgYW5kIEAke3llc3RlcmRheUVuZC5mb3JtYXQoJ1lZWVktTU0tRERUMjM6NTk6NTlbWl0nKX1AKSlgO1xyXG4gICAgICByZXR1cm4gcXVlcnk7XHJcbiAgICB9LFxyXG4gICAgdG9kYXk6IGZ1bmN0aW9uIGNvbXB1dGVUb2RheSgpIHtcclxuICAgICAgY29uc3Qgbm93ID0gbW9tZW50KCk7XHJcbiAgICAgIGNvbnN0IHRvZGF5U3RhcnQgPSBub3cuY2xvbmUoKVxyXG4gICAgICAgIC5zdGFydE9mKCdkYXknKTtcclxuICAgICAgY29uc3QgdG9kYXlFbmQgPSB0b2RheVN0YXJ0LmNsb25lKClcclxuICAgICAgICAuZW5kT2YoJ2RheScpO1xyXG5cclxuICAgICAgY29uc3QgcXVlcnkgPSBgKChUaW1lbGVzcyBlcSBmYWxzZSBhbmQgU3RhcnREYXRlIGJldHdlZW4gQCR7Y29udmVydC50b0lzb1N0cmluZ0Zyb21EYXRlKHRvZGF5U3RhcnQudG9EYXRlKCkpfUAgYW5kIEAke2NvbnZlcnQudG9Jc29TdHJpbmdGcm9tRGF0ZSh0b2RheUVuZC50b0RhdGUoKSl9QCkgb3IgKFRpbWVsZXNzIGVxIHRydWUgYW5kIFN0YXJ0RGF0ZSBiZXR3ZWVuIEAke3RvZGF5U3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREVDAwOjAwOjAwW1pdJyl9QCBhbmQgQCR7dG9kYXlFbmQuZm9ybWF0KCdZWVlZLU1NLUREVDIzOjU5OjU5W1pdJyl9QCkpYDtcclxuICAgICAgcmV0dXJuIHF1ZXJ5O1xyXG4gICAgfSxcclxuICAgICd0aGlzLXdlZWsnOiBmdW5jdGlvbiBjb21wdXRlVGhpc1dlZWsoKSB7XHJcbiAgICAgIGNvbnN0IG5vdyA9IG1vbWVudCgpO1xyXG4gICAgICBjb25zdCB3ZWVrU3RhcnREYXRlID0gbm93LmNsb25lKClcclxuICAgICAgICAuc3RhcnRPZignd2VlaycpO1xyXG4gICAgICBjb25zdCB3ZWVrRW5kRGF0ZSA9IHdlZWtTdGFydERhdGUuY2xvbmUoKVxyXG4gICAgICAgIC5lbmRPZignd2VlaycpO1xyXG5cclxuICAgICAgY29uc3QgcXVlcnkgPSBgKChUaW1lbGVzcyBlcSBmYWxzZSBhbmQgU3RhcnREYXRlIGJldHdlZW4gQCR7Y29udmVydC50b0lzb1N0cmluZ0Zyb21EYXRlKHdlZWtTdGFydERhdGUudG9EYXRlKCkpfUAgYW5kIEAke2NvbnZlcnQudG9Jc29TdHJpbmdGcm9tRGF0ZSh3ZWVrRW5kRGF0ZS50b0RhdGUoKSl9QCkgb3IgKFRpbWVsZXNzIGVxIHRydWUgYW5kIFN0YXJ0RGF0ZSBiZXR3ZWVuIEAke3dlZWtTdGFydERhdGUuZm9ybWF0KCdZWVlZLU1NLUREVDAwOjAwOjAwW1pdJyl9QCBhbmQgQCR7d2Vla0VuZERhdGUuZm9ybWF0KCdZWVlZLU1NLUREVDIzOjU5OjU5W1pdJyl9QCkpYDtcclxuICAgICAgcmV0dXJuIHF1ZXJ5O1xyXG4gICAgfSxcclxuICB9LFxyXG4gIGRlZmF1bHRTZWFyY2hUZXJtOiBmdW5jdGlvbiBkZWZhdWx0U2VhcmNoVGVybSgpIHtcclxuICAgIGlmIChBcHAuZW5hYmxlSGFzaFRhZ3MpIHtcclxuICAgICAgY29uc3QgaGFzaHRhZyA9IHRoaXMuaGFzaFRhZ1F1ZXJpZXNUZXh0Wyd0aGlzLXdlZWsnXTtcclxuICAgICAgaWYgKHR5cGVvZiBoYXNodGFnID09PSAnc3RyaW5nJyAmJiBoYXNodGFnLnN0YXJ0c1dpdGgoJyMnKSkge1xyXG4gICAgICAgIHJldHVybiBoYXNodGFnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gYCMke2hhc2h0YWd9YDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfSxcclxuICBmb3JtYXRTZWFyY2hRdWVyeTogZnVuY3Rpb24gZm9ybWF0U2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkpIHtcclxuICAgIHJldHVybiBgdXBwZXIoRGVzY3JpcHRpb24pIGxpa2UgXCIlJHt0aGlzLmVzY2FwZVNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5LnRvVXBwZXJDYXNlKCkpfSVcImA7XHJcbiAgfSxcclxuICBmb3JtYXREYXRlVGltZTogZnVuY3Rpb24gZm9ybWF0RGF0ZVRpbWUoKSB7XHJcbiAgICByZXR1cm4gJ1N0YXJ0VGltZSc7XHJcbiAgfSxcclxuICBnZXRJdGVtQWN0aW9uS2V5OiBmdW5jdGlvbiBnZXRJdGVtQWN0aW9uS2V5KGVudHJ5KSB7XHJcbiAgICByZXR1cm4gZW50cnkuJGtleTtcclxuICB9LFxyXG4gIGdldEl0ZW1EZXNjcmlwdG9yOiBmdW5jdGlvbiBnZXRJdGVtRGVzY3JpcHRvcihlbnRyeSkge1xyXG4gICAgcmV0dXJuIGVudHJ5LiRkZXNjcmlwdG9yO1xyXG4gIH0sXHJcbiAgZ2V0VGl0bGU6IGZ1bmN0aW9uIGdldFRpdGxlKGVudHJ5KSB7XHJcbiAgICBpZiAoIWVudHJ5KSB7XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKHRoaXMuX21vZGVsICYmIHRoaXMuX21vZGVsLmdldEVudGl0eURlc2NyaXB0aW9uKGVudHJ5KSkgfHwgZW50cnkuJGRlc2NyaXB0b3I7XHJcbiAgfSxcclxuICBjcmVhdGVJbmRpY2F0b3JMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUluZGljYXRvckxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLml0ZW1JbmRpY2F0b3JzIHx8ICh0aGlzLml0ZW1JbmRpY2F0b3JzID0gW3tcclxuICAgICAgaWQ6ICdhbGFybScsXHJcbiAgICAgIGNsczogJ25vdGlmaWNhdGlvbicsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmFsYXJtVGV4dCxcclxuICAgICAgb25BcHBseTogZnVuY3Rpb24gb25BcHBseShlbnRyeSwgcGFyZW50KSB7XHJcbiAgICAgICAgdGhpcy5pc0VuYWJsZWQgPSBwYXJlbnQuaGFzQWxhcm0oZW50cnkpO1xyXG4gICAgICB9LFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ2ltcG9ydGFudCcsXHJcbiAgICAgIGNsczogJ3N0YXItZmlsbGVkJyxcclxuICAgICAgbGFiZWw6IHRoaXMuaW1wb3J0YW50VGV4dCxcclxuICAgICAgb25BcHBseTogZnVuY3Rpb24gb25BcHBseShlbnRyeSwgcGFyZW50KSB7XHJcbiAgICAgICAgdGhpcy5pc0VuYWJsZWQgPSBwYXJlbnQuaXNJbXBvcnRhbnQoZW50cnkpO1xyXG4gICAgICB9LFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ3JlY3VycmluZycsXHJcbiAgICAgIGNsczogJ2xvYWQnLFxyXG4gICAgICBsYWJlbDogdGhpcy5yZWN1cnJpbmdUZXh0LFxyXG4gICAgICBvbkFwcGx5OiBmdW5jdGlvbiBvbkFwcGx5KGVudHJ5LCBwYXJlbnQpIHtcclxuICAgICAgICB0aGlzLmlzRW5hYmxlZCA9IHBhcmVudC5pc1JlY3VycmluZyhlbnRyeSwgdGhpcyk7XHJcbiAgICAgIH0sXHJcbiAgICB9LCB7XHJcbiAgICAgIGlkOiAnb3ZlcmR1ZScsXHJcbiAgICAgIGNsczogJ2Vycm9yJyxcclxuICAgICAgbGFiZWw6IHRoaXMub3ZlcmR1ZVRleHQsXHJcbiAgICAgIG9uQXBwbHk6IGZ1bmN0aW9uIG9uQXBwbHkoZW50cnksIHBhcmVudCkge1xyXG4gICAgICAgIHRoaXMuaXNFbmFibGVkID0gcGFyZW50LmlzT3ZlcmR1ZShlbnRyeSk7XHJcbiAgICAgIH0sXHJcbiAgICB9LCB7XHJcbiAgICAgIGlkOiAndG91Y2hlZCcsXHJcbiAgICAgIGNsczogJ2ZsYWcnLFxyXG4gICAgICBsYWJlbDogdGhpcy50b3VjaGVkVGV4dCxcclxuICAgICAgb25BcHBseTogZnVuY3Rpb24gb25BcHBseShlbnRyeSwgcGFyZW50KSB7XHJcbiAgICAgICAgdGhpcy5pc0VuYWJsZWQgPSBwYXJlbnQuaGFzQmVlblRvdWNoZWQoZW50cnkpO1xyXG4gICAgICB9LFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbiAgaGFzQmVlblRvdWNoZWQ6IGZ1bmN0aW9uIGhhc0JlZW5Ub3VjaGVkKGVudHJ5KSB7XHJcbiAgICBpZiAoZW50cnkuTW9kaWZ5RGF0ZSkge1xyXG4gICAgICBjb25zdCBtb2RpZmllZERhdGUgPSBtb21lbnQoY29udmVydC50b0RhdGVGcm9tU3RyaW5nKGVudHJ5Lk1vZGlmeURhdGUpKTtcclxuICAgICAgY29uc3QgY3VycmVudERhdGUgPSBtb21lbnQoKVxyXG4gICAgICAgIC5lbmRPZignZGF5Jyk7XHJcbiAgICAgIGNvbnN0IHdlZWtBZ28gPSBtb21lbnQoKVxyXG4gICAgICAgIC5zdWJ0cmFjdCgxLCAnd2Vla3MnKTtcclxuXHJcbiAgICAgIHJldHVybiBtb2RpZmllZERhdGUuaXNBZnRlcih3ZWVrQWdvKSAmJlxyXG4gICAgICAgIG1vZGlmaWVkRGF0ZS5pc0JlZm9yZShjdXJyZW50RGF0ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSxcclxuICBpc0ltcG9ydGFudDogZnVuY3Rpb24gaXNJbXBvcnRhbnQoZW50cnkpIHtcclxuICAgIHJldHVybiBlbnRyeS5Qcmlvcml0eSA9PT0gJ0hpZ2gnO1xyXG4gIH0sXHJcbiAgaXNPdmVyZHVlOiBmdW5jdGlvbiBpc092ZXJkdWUoZW50cnkpIHtcclxuICAgIGlmIChlbnRyeS5TdGFydERhdGUpIHtcclxuICAgICAgY29uc3Qgc3RhcnREYXRlID0gY29udmVydC50b0RhdGVGcm9tU3RyaW5nKGVudHJ5LlN0YXJ0RGF0ZSk7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgY29uc3Qgc2Vjb25kcyA9IE1hdGgucm91bmQoKGN1cnJlbnREYXRlIC0gc3RhcnREYXRlKSAvIDEwMDApO1xyXG4gICAgICBjb25zdCBtaW5zID0gc2Vjb25kcyAvIDYwO1xyXG4gICAgICBpZiAobWlucyA+PSAxKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LFxyXG4gIGlzVGltZWxlc3NUb2RheTogZnVuY3Rpb24gaXNUaW1lbGVzc1RvZGF5KGVudHJ5KSB7XHJcbiAgICBpZiAoIWVudHJ5IHx8ICFlbnRyeS5UaW1lbGVzcykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3RhcnQgPSBtb21lbnQoZW50cnkuU3RhcnREYXRlKTtcclxuICAgIHJldHVybiB0aGlzLl9pc1RpbWVsZXNzVG9kYXkoc3RhcnQpO1xyXG4gIH0sXHJcbiAgX2lzVGltZWxlc3NUb2RheTogZnVuY3Rpb24gX2lzVGltZWxlc3NUb2RheShzdGFydCkge1xyXG4gICAgLy8gU3RhcnQgaXMgVVRDLCBjb252ZXJ0IGl0IHRvIGxvY2FsIHRpbWUgc28gd2UgY2FuIGNvbXBhcmUgaXQgYWdhaW5zdCBcIm5vd1wiXHJcbiAgICBzdGFydC5zdWJ0cmFjdCh7XHJcbiAgICAgIG1pbnV0ZXM6IHN0YXJ0LnV0Y09mZnNldCgpLFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gc3RhcnQuaXNBZnRlcihtb21lbnQoKVxyXG4gICAgICAuc3RhcnRPZignZGF5JykpICYmIHN0YXJ0LmlzQmVmb3JlKG1vbWVudCgpXHJcbiAgICAgIC5lbmRPZignZGF5JykpO1xyXG4gIH0sXHJcbiAgaXNSZWN1cnJpbmc6IGZ1bmN0aW9uIGlzUmVjdXJyaW5nKGVudHJ5KSB7XHJcbiAgICBpZiAoZW50cnkuUmVjdXJyZW5jZVN0YXRlKSB7XHJcbiAgICAgIGlmIChlbnRyeS5SZWN1cnJlbmNlU3RhdGUgPT09ICdyc3RPY2N1cnJlbmNlJykge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSxcclxuICBoYXNBbGFybTogZnVuY3Rpb24gaGFzQWxhcm0oZW50cnkpIHtcclxuICAgIGlmIChlbnRyeS5BbGFybSA9PT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LFxyXG4gIGdldEl0ZW1JY29uQ2xhc3M6IGZ1bmN0aW9uIGdldEl0ZW1JY29uQ2xhc3MoZW50cnkpIHtcclxuICAgIGNvbnN0IHR5cGUgPSBlbnRyeSAmJiBlbnRyeS5UeXBlO1xyXG4gICAgcmV0dXJuIHRoaXMuX2dldEl0ZW1JY29uQ2xhc3ModHlwZSk7XHJcbiAgfSxcclxuICBfZ2V0SXRlbUljb25DbGFzczogZnVuY3Rpb24gX2dldEl0ZW1JY29uQ2xhc3ModHlwZSkge1xyXG4gICAgcmV0dXJuIGFjdGl2aXR5VHlwZUljb25zLmRlZmF1bHRbdHlwZV07XHJcbiAgfSxcclxuICBjcmVhdGVBY3Rpb25MYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbkxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmFjdGlvbnMgfHwgKHRoaXMuYWN0aW9ucyA9IFt7XHJcbiAgICAgIGlkOiAnY29tcGxldGUnLFxyXG4gICAgICBjbHM6ICdjaGVja2JveCcsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmNvbXBsZXRlQWN0aXZpdHlUZXh0LFxyXG4gICAgICBlbmFibGVkOiBmdW5jdGlvbiBlbmFibGVkKHRoZUFjdGlvbiwgc2VsZWN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgZW50cnkgPSBzZWxlY3Rpb24gJiYgc2VsZWN0aW9uLmRhdGE7XHJcbiAgICAgICAgaWYgKCFlbnRyeSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVjdXIgPSBmYWxzZTtcclxuICAgICAgICBpZiAoZW50cnkuUmVjdXJyZW5jZVN0YXRlID09PSAncnN0T2NjdXJyZW5jZScpIHtcclxuICAgICAgICAgIHJlY3VyID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlbnRyeS5MZWFkZXIuJGtleSA9PT0gQXBwLmNvbnRleHQudXNlci4ka2V5ICYmICFyZWN1cjtcclxuICAgICAgfSxcclxuICAgICAgZm46IChmdW5jdGlvbiBmbih0aGVBY3Rpb24sIHNlbGVjdGlvbikge1xyXG4gICAgICAgIGNvbnN0IGVudHJ5ID0gc2VsZWN0aW9uICYmIHNlbGVjdGlvbi5kYXRhICYmIHNlbGVjdGlvbi5kYXRhO1xyXG5cclxuICAgICAgICBlbnRyeS5Db21wbGV0ZWREYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICBlbnRyeS5SZXN1bHQgPSAnQ29tcGxldGUnO1xyXG5cclxuICAgICAgICBlbnZpcm9ubWVudC5yZWZyZXNoQWN0aXZpdHlMaXN0cygpO1xyXG4gICAgICAgIHRoaXMuY29tcGxldGVBY3Rpdml0eShlbnRyeSk7XHJcbiAgICAgIH0pXHJcbiAgICAgICAgLmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgIH0sIHtcclxuICAgICAgaWQ6ICdjYWxsJyxcclxuICAgICAgY2xzOiAncGhvbmUnLFxyXG4gICAgICBsYWJlbDogdGhpcy5jYWxsVGV4dCxcclxuICAgICAgZW5hYmxlZDogZnVuY3Rpb24gZW5hYmxlZCh0aGVBY3Rpb24sIHNlbGVjdGlvbikge1xyXG4gICAgICAgIGNvbnN0IGVudHJ5ID0gc2VsZWN0aW9uICYmIHNlbGVjdGlvbi5kYXRhO1xyXG4gICAgICAgIHJldHVybiBlbnRyeSAmJiBlbnRyeS5QaG9uZU51bWJlcjtcclxuICAgICAgfSxcclxuICAgICAgZm46IGZ1bmN0aW9uIGZuKHRoZUFjdGlvbiwgc2VsZWN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgZW50cnkgPSBzZWxlY3Rpb24gJiYgc2VsZWN0aW9uLmRhdGE7XHJcbiAgICAgICAgY29uc3QgcGhvbmUgPSBlbnRyeSAmJiBlbnRyeS5QaG9uZU51bWJlcjtcclxuICAgICAgICBpZiAocGhvbmUpIHtcclxuICAgICAgICAgIHRoaXMucmVjb3JkQ2FsbFRvSGlzdG9yeShmdW5jdGlvbiBpbml0aWF0ZUNhbGwoKSB7XHJcbiAgICAgICAgICAgIEFwcC5pbml0aWF0ZUNhbGwocGhvbmUpO1xyXG4gICAgICAgICAgfS5iaW5kRGVsZWdhdGUodGhpcyksIGVudHJ5KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0uYmluZERlbGVnYXRlKHRoaXMpLFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ2FkZEF0dGFjaG1lbnQnLFxyXG4gICAgICBjbHM6ICdhdHRhY2gnLFxyXG4gICAgICBsYWJlbDogdGhpcy5hZGRBdHRhY2htZW50QWN0aW9uVGV4dCxcclxuICAgICAgZm46IGFjdGlvbi5hZGRBdHRhY2htZW50LmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgIH1dKTtcclxuICB9LFxyXG4gIHJlY29yZENhbGxUb0hpc3Rvcnk6IGZ1bmN0aW9uIHJlY29yZENhbGxUb0hpc3RvcnkoY29tcGxldGUsIGVudHJ5KSB7XHJcbiAgICBjb25zdCB0ZW1wRW50cnkgPSB7XHJcbiAgICAgICRuYW1lOiAnSGlzdG9yeScsXHJcbiAgICAgIFR5cGU6ICdhdFBob25lQ2FsbCcsXHJcbiAgICAgIENvbnRhY3ROYW1lOiBlbnRyeS5Db250YWN0TmFtZSxcclxuICAgICAgQ29udGFjdElkOiBlbnRyeS5Db250YWN0SWQsXHJcbiAgICAgIEFjY291bnROYW1lOiBlbnRyeS5BY2NvdW50TmFtZSxcclxuICAgICAgQWNjb3VudElkOiBlbnRyeS5BY2NvdW50SWQsXHJcbiAgICAgIERlc2NyaXB0aW9uOiBzdHJpbmcuc3Vic3RpdHV0ZSh0aGlzLmNhbGxlZFRleHQsIFtlbnRyeS5Db250YWN0TmFtZSB8fCAnJ10pLFxyXG4gICAgICBVc2VySWQ6IEFwcC5jb250ZXh0ICYmIEFwcC5jb250ZXh0LnVzZXIuJGtleSxcclxuICAgICAgVXNlck5hbWU6IEFwcC5jb250ZXh0ICYmIEFwcC5jb250ZXh0LnVzZXIuVXNlck5hbWUsXHJcbiAgICAgIER1cmF0aW9uOiAxNSxcclxuICAgICAgQ29tcGxldGVkRGF0ZTogKG5ldyBEYXRlKCkpLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLm5hdmlnYXRlVG9IaXN0b3J5SW5zZXJ0KCdhdFBob25lQ2FsbCcsIHRlbXBFbnRyeSwgY29tcGxldGUpO1xyXG4gIH0sXHJcbiAgbmF2aWdhdGVUb0hpc3RvcnlJbnNlcnQ6IGZ1bmN0aW9uIG5hdmlnYXRlVG9IaXN0b3J5SW5zZXJ0KHR5cGUsIGVudHJ5LCBjb21wbGV0ZSkge1xyXG4gICAgYWN0aW9uLm5hdmlnYXRlVG9IaXN0b3J5SW5zZXJ0KGVudHJ5LCBjb21wbGV0ZSk7XHJcbiAgfSxcclxuICBjb21wbGV0ZUFjdGl2aXR5OiBmdW5jdGlvbiBjb21wbGV0ZUFjdGl2aXR5KGVudHJ5KSB7XHJcbiAgICBjb25zdCBhY3Rpdml0eU1vZGVsID0gQXBwLk1vZGVsTWFuYWdlci5nZXRNb2RlbChNT0RFTF9OQU1FUy5BQ1RJVklUWSwgTU9ERUxfVFlQRVMuU0RBVEEpO1xyXG4gICAgaWYgKGFjdGl2aXR5TW9kZWwpIHtcclxuICAgICAgYWN0aXZpdHlNb2RlbC5jb21wbGV0ZUFjdGl2aXR5KGVudHJ5KS50aGVuKCgpID0+IHtcclxuICAgICAgICBjb25uZWN0LnB1Ymxpc2goJy9hcHAvcmVmcmVzaCcsIFt7XHJcbiAgICAgICAgICByZXNvdXJjZUtpbmQ6ICdoaXN0b3J5JyxcclxuICAgICAgICB9XSk7XHJcblxyXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgfSwgKGVycikgPT4ge1xyXG4gICAgICAgIHRoaXMub25SZXF1ZXN0RmFpbHVyZShlcnIsIHRoaXMpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uUmVxdWVzdEZhaWx1cmU6IGZ1bmN0aW9uIG9uUmVxdWVzdEZhaWx1cmUocmVzcG9uc2UsIG8pIHtcclxuICAgIEVycm9yTWFuYWdlci5hZGRFcnJvcihyZXNwb25zZSwgbywge30sICdmYWlsdXJlJyk7XHJcbiAgfSxcclxuICBhY3RpdmF0ZUVudHJ5OiBmdW5jdGlvbiBhY3RpdmF0ZUVudHJ5KHBhcmFtcykge1xyXG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmVudHJpZXNbcGFyYW1zLmtleV07XHJcbiAgICBpZiAoZW50cnkpIHtcclxuICAgICAgY29uc3QgYWN0aXZpdHlQYXJhbXMgPSBwYXJhbXM7XHJcbiAgICAgIGFjdGl2aXR5UGFyYW1zLmRlc2NyaXB0b3IgPSB0aGlzLl9tb2RlbC5nZXRFbnRpdHlEZXNjcmlwdGlvbihlbnRyeSk7XHJcbiAgICAgIHRoaXMuaW5oZXJpdGVkKGFjdGl2YXRlRW50cnksIGFyZ3VtZW50cywgW2FjdGl2aXR5UGFyYW1zXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmluaGVyaXRlZChhY3RpdmF0ZUVudHJ5LCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19