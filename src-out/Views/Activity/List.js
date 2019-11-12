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
        this.inherited(arguments, [activityParams]);
      } else {
        this.inherited(arguments);
      }
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BY3Rpdml0eS9MaXN0LmpzIl0sIm5hbWVzIjpbImFjdGl2aXR5VHlwZUljb25zIiwicmVzb3VyY2UiLCJoYXNoVGFnUmVzb3VyY2UiLCJfX2NsYXNzIiwiYWxsRGF5VGV4dCIsImNvbXBsZXRlQWN0aXZpdHlUZXh0IiwiY2FsbFRleHQiLCJjYWxsZWRUZXh0IiwiYWRkQXR0YWNobWVudEFjdGlvblRleHQiLCJvdmVyZHVlVGV4dCIsImFsYXJtVGV4dCIsInRvdWNoZWRUZXh0IiwiaW1wb3J0YW50VGV4dCIsInJlY3VycmluZ1RleHQiLCJ0aXRsZVRleHQiLCJoYXNoVGFnUXVlcmllc1RleHQiLCJhbGFybSIsInJlY3VycmluZyIsInRpbWVsZXNzIiwidGltZWxlc3NUZXh0IiwidG9kYXkiLCJ0b2RheVRleHQiLCJ0aGlzV2Vla1RleHQiLCJ5ZXN0ZXJkYXkiLCJ5ZXN0ZXJkYXlUZXh0IiwiaXRlbUljb24iLCJkZWZhdWx0IiwiYXRBcHBvaW50bWVudCIsImZvcm1hdCIsImdldFBpY2tsaXN0QnlBY3Rpdml0eVR5cGUiLCJyb3dUZW1wbGF0ZSIsIlNpbXBsYXRlIiwiYWN0aXZpdHlUaW1lVGVtcGxhdGUiLCJpdGVtVGVtcGxhdGUiLCJuYW1lVGVtcGxhdGUiLCJpZCIsInNlY3VyaXR5IiwiaWNvbkNsYXNzIiwiZGV0YWlsVmlldyIsImluc2VydFZpZXciLCJoaXN0b3J5RWRpdFZpZXciLCJlbmFibGVBY3Rpb25zIiwicGFnZVNpemUiLCJyZXNvdXJjZUtpbmQiLCJtb2RlbE5hbWUiLCJBQ1RJVklUWSIsImhhc2hUYWdRdWVyaWVzIiwiY29tcHV0ZVllc3RlcmRheSIsIm5vdyIsIm1vbWVudCIsInllc3RlcmRheVN0YXJ0IiwiY2xvbmUiLCJzdWJ0cmFjdCIsInN0YXJ0T2YiLCJ5ZXN0ZXJkYXlFbmQiLCJlbmRPZiIsInF1ZXJ5IiwidG9Jc29TdHJpbmdGcm9tRGF0ZSIsInRvRGF0ZSIsImNvbXB1dGVUb2RheSIsInRvZGF5U3RhcnQiLCJ0b2RheUVuZCIsImNvbXB1dGVUaGlzV2VlayIsIndlZWtTdGFydERhdGUiLCJ3ZWVrRW5kRGF0ZSIsImRlZmF1bHRTZWFyY2hUZXJtIiwiQXBwIiwiZW5hYmxlSGFzaFRhZ3MiLCJoYXNodGFnIiwic3RhcnRzV2l0aCIsImZvcm1hdFNlYXJjaFF1ZXJ5Iiwic2VhcmNoUXVlcnkiLCJlc2NhcGVTZWFyY2hRdWVyeSIsInRvVXBwZXJDYXNlIiwiZm9ybWF0RGF0ZVRpbWUiLCJnZXRJdGVtQWN0aW9uS2V5IiwiZW50cnkiLCIka2V5IiwiZ2V0SXRlbURlc2NyaXB0b3IiLCIkZGVzY3JpcHRvciIsImdldFRpdGxlIiwiX21vZGVsIiwiZ2V0RW50aXR5RGVzY3JpcHRpb24iLCJjcmVhdGVJbmRpY2F0b3JMYXlvdXQiLCJpdGVtSW5kaWNhdG9ycyIsImNscyIsImxhYmVsIiwib25BcHBseSIsInBhcmVudCIsImlzRW5hYmxlZCIsImhhc0FsYXJtIiwiaXNJbXBvcnRhbnQiLCJpc1JlY3VycmluZyIsImlzT3ZlcmR1ZSIsImhhc0JlZW5Ub3VjaGVkIiwiTW9kaWZ5RGF0ZSIsIm1vZGlmaWVkRGF0ZSIsInRvRGF0ZUZyb21TdHJpbmciLCJjdXJyZW50RGF0ZSIsIndlZWtBZ28iLCJpc0FmdGVyIiwiaXNCZWZvcmUiLCJQcmlvcml0eSIsIlN0YXJ0RGF0ZSIsInN0YXJ0RGF0ZSIsIkRhdGUiLCJzZWNvbmRzIiwiTWF0aCIsInJvdW5kIiwibWlucyIsImlzVGltZWxlc3NUb2RheSIsIlRpbWVsZXNzIiwic3RhcnQiLCJfaXNUaW1lbGVzc1RvZGF5IiwibWludXRlcyIsInV0Y09mZnNldCIsIlJlY3VycmVuY2VTdGF0ZSIsIkFsYXJtIiwiZ2V0SXRlbUljb25DbGFzcyIsInR5cGUiLCJUeXBlIiwiX2dldEl0ZW1JY29uQ2xhc3MiLCJjcmVhdGVBY3Rpb25MYXlvdXQiLCJhY3Rpb25zIiwiZW5hYmxlZCIsInRoZUFjdGlvbiIsInNlbGVjdGlvbiIsImRhdGEiLCJyZWN1ciIsIkxlYWRlciIsImNvbnRleHQiLCJ1c2VyIiwiZm4iLCJDb21wbGV0ZWREYXRlIiwiUmVzdWx0IiwicmVmcmVzaEFjdGl2aXR5TGlzdHMiLCJjb21wbGV0ZUFjdGl2aXR5IiwiYmluZERlbGVnYXRlIiwiUGhvbmVOdW1iZXIiLCJwaG9uZSIsInJlY29yZENhbGxUb0hpc3RvcnkiLCJpbml0aWF0ZUNhbGwiLCJhZGRBdHRhY2htZW50IiwiY29tcGxldGUiLCJ0ZW1wRW50cnkiLCIkbmFtZSIsIkNvbnRhY3ROYW1lIiwiQ29udGFjdElkIiwiQWNjb3VudE5hbWUiLCJBY2NvdW50SWQiLCJEZXNjcmlwdGlvbiIsInN1YnN0aXR1dGUiLCJVc2VySWQiLCJVc2VyTmFtZSIsIkR1cmF0aW9uIiwibmF2aWdhdGVUb0hpc3RvcnlJbnNlcnQiLCJhY3Rpdml0eU1vZGVsIiwiTW9kZWxNYW5hZ2VyIiwiZ2V0TW9kZWwiLCJTREFUQSIsInRoZW4iLCJwdWJsaXNoIiwiY2xlYXIiLCJyZWZyZXNoIiwiZXJyIiwib25SZXF1ZXN0RmFpbHVyZSIsInJlc3BvbnNlIiwibyIsImFkZEVycm9yIiwiYWN0aXZhdGVFbnRyeSIsInBhcmFtcyIsImVudHJpZXMiLCJrZXkiLCJhY3Rpdml0eVBhcmFtcyIsImRlc2NyaXB0b3IiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BMkJZQSxpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS1osTUFBTUMsV0FBVyxvQkFBWSxjQUFaLENBQWpCLEMsQ0FoQ0E7Ozs7Ozs7Ozs7Ozs7OztBQWlDQSxNQUFNQyxrQkFBa0Isb0JBQVksc0JBQVosQ0FBeEI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkEsTUFBTUMsVUFBVSx1QkFBUSx5QkFBUixFQUFtQyxnREFBbkMsRUFBa0U7QUFDaEY7QUFDQUMsZ0JBQVlILFNBQVNHLFVBRjJEO0FBR2hGQywwQkFBc0JKLFNBQVNJLG9CQUhpRDtBQUloRkMsY0FBVUwsU0FBU0ssUUFKNkQ7QUFLaEZD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U0FBTCxDQUFlQyxTQUFmLEVBQTBCLENBQUNILGNBQUQsQ0FBMUI7QUFDRCxPQUpELE1BSU87QUFDTCxhQUFLRSxTQUFMLENBQWVDLFNBQWY7QUFDRDtBQUNGO0FBbFcrRSxHQUFsRSxDQUFoQjs7b0JBcVdlN0ssTyIsImZpbGUiOiJMaXN0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGNvbm5lY3QgZnJvbSAnZG9qby9fYmFzZS9jb25uZWN0JztcclxuaW1wb3J0IF9SaWdodERyYXdlckxpc3RNaXhpbiBmcm9tICcuLi9fUmlnaHREcmF3ZXJMaXN0TWl4aW4nO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuaW1wb3J0IGNvbnZlcnQgZnJvbSAnYXJnb3MvQ29udmVydCc7XHJcbmltcG9ydCBhY3Rpb24gZnJvbSAnLi4vLi4vQWN0aW9uJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICcuLi8uLi9Gb3JtYXQnO1xyXG5pbXBvcnQgZW52aXJvbm1lbnQgZnJvbSAnLi4vLi4vRW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgRXJyb3JNYW5hZ2VyIGZyb20gJ2FyZ29zL0Vycm9yTWFuYWdlcic7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi8uLi9Nb2RlbHMvTmFtZXMnO1xyXG5pbXBvcnQgTU9ERUxfVFlQRVMgZnJvbSAnYXJnb3MvTW9kZWxzL1R5cGVzJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5pbXBvcnQgKiBhcyBhY3Rpdml0eVR5cGVJY29ucyBmcm9tICcuLi8uLi9Nb2RlbHMvQWN0aXZpdHkvQWN0aXZpdHlUeXBlSWNvbic7XHJcbmltcG9ydCB7IGdldFBpY2tsaXN0QnlBY3Rpdml0eVR5cGUgfSBmcm9tICcuLi8uLi9Nb2RlbHMvQWN0aXZpdHkvQWN0aXZpdHlUeXBlUGlja2xpc3RzJztcclxuaW1wb3J0IHN0cmluZyBmcm9tICdkb2pvL3N0cmluZyc7XHJcblxyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYWN0aXZpdHlMaXN0Jyk7XHJcbmNvbnN0IGhhc2hUYWdSZXNvdXJjZSA9IGdldFJlc291cmNlKCdhY3Rpdml0eUxpc3RIYXNoVGFncycpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuQWN0aXZpdHkuTGlzdFxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5MaXN0XHJcbiAqIEBtaXhpbnMgY3JtLlZpZXdzLl9SaWdodERyYXdlckxpc3RNaXhpblxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuTGlzdFxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuVXRpbGl0eVxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuQ29udmVydFxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuRXJyb3JNYW5hZ2VyXHJcbiAqIEByZXF1aXJlcyBjcm0uQWN0aW9uXHJcbiAqIEByZXF1aXJlcyBjcm0uRW52aXJvbm1lbnRcclxuICogQHJlcXVpcmVzIGNybS5Gb3JtYXRcclxuICogQHJlcXVpcmVzIGNybS5WaWV3cy5fUmlnaHREcmF3ZXJMaXN0TWl4aW5cclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuQWN0aXZpdHkuTGlzdCcsIFtMaXN0LCBfUmlnaHREcmF3ZXJMaXN0TWl4aW5dLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgYWxsRGF5VGV4dDogcmVzb3VyY2UuYWxsRGF5VGV4dCxcclxuICBjb21wbGV0ZUFjdGl2aXR5VGV4dDogcmVzb3VyY2UuY29tcGxldGVBY3Rpdml0eVRleHQsXHJcbiAgY2FsbFRleHQ6IHJlc291cmNlLmNhbGxUZXh0LFxyXG4gIGNhbGxlZFRleHQ6IHJlc291cmNlLmNhbGxlZFRleHQsXHJcbiAgYWRkQXR0YWNobWVudEFjdGlvblRleHQ6IHJlc291cmNlLmFkZEF0dGFjaG1lbnRBY3Rpb25UZXh0LFxyXG4gIG92ZXJkdWVUZXh0OiByZXNvdXJjZS5vdmVyZHVlVGV4dCxcclxuICBhbGFybVRleHQ6IHJlc291cmNlLmFsYXJtVGV4dCxcclxuICB0b3VjaGVkVGV4dDogcmVzb3VyY2UudG91Y2hlZFRleHQsXHJcbiAgaW1wb3J0YW50VGV4dDogcmVzb3VyY2UuaW1wb3J0YW50VGV4dCxcclxuICByZWN1cnJpbmdUZXh0OiByZXNvdXJjZS5yZWN1cnJpbmdUZXh0LFxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIGhhc2hUYWdRdWVyaWVzVGV4dDoge1xyXG4gICAgYWxhcm06IGhhc2hUYWdSZXNvdXJjZS5hbGFybVRleHQsXHJcbiAgICByZWN1cnJpbmc6IGhhc2hUYWdSZXNvdXJjZS5yZWN1cnJpbmdUZXh0LFxyXG4gICAgdGltZWxlc3M6IGhhc2hUYWdSZXNvdXJjZS50aW1lbGVzc1RleHQsXHJcbiAgICB0b2RheTogaGFzaFRhZ1Jlc291cmNlLnRvZGF5VGV4dCxcclxuICAgICd0aGlzLXdlZWsnOiBoYXNoVGFnUmVzb3VyY2UudGhpc1dlZWtUZXh0LFxyXG4gICAgeWVzdGVyZGF5OiBoYXNoVGFnUmVzb3VyY2UueWVzdGVyZGF5VGV4dCxcclxuICB9LFxyXG4gIC8vIENhcmQgVmlld1xyXG4gIGl0ZW1JY29uOiBhY3Rpdml0eVR5cGVJY29ucy5kZWZhdWx0LmF0QXBwb2ludG1lbnQsXHJcbiAgZm9ybWF0LFxyXG4gIGdldFBpY2tsaXN0QnlBY3Rpdml0eVR5cGUsXHJcblxyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIC8vIENhcmQgVmlld1xyXG4gIHJvd1RlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgYDxkaXYgYXMgZGF0YS1hY3Rpb249XCJhY3RpdmF0ZUVudHJ5XCIgZGF0YS1rZXk9XCJ7JT0gJCQuZ2V0SXRlbUFjdGlvbktleSgkKSAlfVwiIGRhdGEtZGVzY3JpcHRvcj1cInslOiAkJC5nZXRJdGVtRGVzY3JpcHRvcigkKSAlfVwiIGRhdGEtYWN0aXZpdHktdHlwZT1cInslOiAkLlR5cGUgJX1cIj5cclxuICAgICAgPGRpdiBjbGFzcz1cIndpZGdldFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3aWRnZXQtaGVhZGVyXCI+XHJcbiAgICAgICAgICB7JSEgJCQuaXRlbUljb25UZW1wbGF0ZSAlfTxoMiBjbGFzcz1cIndpZGdldC10aXRsZVwiPnslOiAkJC5nZXRUaXRsZSgkKSAlfTwvaDI+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuLWFjdGlvbnNcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS1hY3Rpb249XCJzZWxlY3RFbnRyeVwiIGRhdGEta2V5PVwieyU9ICQkLmdldEl0ZW1BY3Rpb25LZXkoJCkgJX1cIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhdWRpYmxlXCI+QWN0aW9uczwvc3Bhbj5cclxuICAgICAgICAgICAgPHN2ZyBjbGFzcz1cImljb25cIiBmb2N1c2FibGU9XCJmYWxzZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHJvbGU9XCJwcmVzZW50YXRpb25cIj5cclxuICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1tb3JlXCI+PC91c2U+XHJcbiAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICB7JSEgJCQubGlzdEFjdGlvblRlbXBsYXRlICV9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtY29udGVudFwiPlxyXG4gICAgICAgICAgeyUhICQkLml0ZW1Sb3dDb250ZW50VGVtcGxhdGUgJX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5gLFxyXG4gIF0pLFxyXG4gIGFjdGl2aXR5VGltZVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJ3slIGlmICgkJC5pc1RpbWVsZXNzVG9kYXkoJCkpIHsgJX0nLFxyXG4gICAgJ3slOiAkJC5hbGxEYXlUZXh0ICV9JyxcclxuICAgICd7JSB9IGVsc2UgeyAlfScsXHJcbiAgICAneyU6ICQkLmZvcm1hdC5yZWxhdGl2ZURhdGUoJC5TdGFydERhdGUsIGFyZ29zLkNvbnZlcnQudG9Cb29sZWFuKCQuVGltZWxlc3MpKSAlfScsIC8vIFRPRE86IEF2b2lkIGdsb2JhbFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gIF0pLFxyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cImxpc3R2aWV3LWhlYWRpbmdcIj4nLFxyXG4gICAgJzxzcGFuIGNsYXNzPVwicC1kZXNjcmlwdGlvblwiPnslOiAkJC5mb3JtYXQucGlja2xpc3QoJCQuYXBwLnBpY2tsaXN0U2VydmljZSwgbnVsbCwgbnVsbCwgJCQuZ2V0UGlja2xpc3RCeUFjdGl2aXR5VHlwZSgkLlR5cGUsIFwiRGVzY3JpcHRpb25cIikpKCQuRGVzY3JpcHRpb24pICV9PC9zcGFuPicsXHJcbiAgICAnPC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+JyxcclxuICAgICd7JSEgJCQuYWN0aXZpdHlUaW1lVGVtcGxhdGUgJX0nLFxyXG4gICAgJzwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPnslISAkJC5uYW1lVGVtcGxhdGUgJX08L3A+JyxcclxuICBdKSxcclxuICBuYW1lVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAneyUgaWYgKCQuQ29udGFjdE5hbWUpIHsgJX0nLFxyXG4gICAgJ3slOiAkLkNvbnRhY3ROYW1lICV9IHwgeyU6ICQuQWNjb3VudE5hbWUgJX0nLFxyXG4gICAgJ3slIH0gZWxzZSBpZiAoJC5BY2NvdW50TmFtZSkgeyAlfScsXHJcbiAgICAneyU6ICQuQWNjb3VudE5hbWUgJX0nLFxyXG4gICAgJ3slIH0gZWxzZSB7ICV9JyxcclxuICAgICd7JTogJC5MZWFkTmFtZSAlfScsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgXSksXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnYWN0aXZpdHlfbGlzdCcsXHJcbiAgc2VjdXJpdHk6IG51bGwsIC8vICdFbnRpdGllcy9BY3Rpdml0eS9WaWV3JyxcclxuICBpY29uQ2xhc3M6ICdmYSBmYS1jaGVjay1zcXVhcmUtbyBmYS1sZycsXHJcbiAgZGV0YWlsVmlldzogJ2FjdGl2aXR5X2RldGFpbCcsXHJcbiAgaW5zZXJ0VmlldzogJ2FjdGl2aXR5X3R5cGVzX2xpc3QnLFxyXG4gIGhpc3RvcnlFZGl0VmlldzogJ2hpc3RvcnlfZWRpdCcsXHJcbiAgZW5hYmxlQWN0aW9uczogdHJ1ZSxcclxuICBwYWdlU2l6ZTogMTA1LFxyXG4gIHJlc291cmNlS2luZDogJ2FjdGl2aXRpZXMnLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuQUNUSVZJVFksXHJcblxyXG4gIGhhc2hUYWdRdWVyaWVzOiB7XHJcbiAgICBhbGFybTogJ0FsYXJtIGVxIHRydWUnLFxyXG4gICAgcmVjdXJyaW5nOiAnUmVjdXJyaW5nIGVxIHRydWUnLFxyXG4gICAgdGltZWxlc3M6ICdUaW1lbGVzcyBlcSB0cnVlJyxcclxuICAgIHllc3RlcmRheTogZnVuY3Rpb24gY29tcHV0ZVllc3RlcmRheSgpIHtcclxuICAgICAgY29uc3Qgbm93ID0gbW9tZW50KCk7XHJcbiAgICAgIGNvbnN0IHllc3RlcmRheVN0YXJ0ID0gbm93LmNsb25lKClcclxuICAgICAgICAuc3VidHJhY3QoMSwgJ2RheXMnKVxyXG4gICAgICAgIC5zdGFydE9mKCdkYXknKTtcclxuICAgICAgY29uc3QgeWVzdGVyZGF5RW5kID0geWVzdGVyZGF5U3RhcnQuY2xvbmUoKVxyXG4gICAgICAgIC5lbmRPZignZGF5Jyk7XHJcblxyXG4gICAgICBjb25zdCBxdWVyeSA9IGAoKFRpbWVsZXNzIGVxIGZhbHNlIGFuZCBTdGFydERhdGUgYmV0d2VlbiBAJHtjb252ZXJ0LnRvSXNvU3RyaW5nRnJvbURhdGUoeWVzdGVyZGF5U3RhcnQudG9EYXRlKCkpfUAgYW5kIEAke2NvbnZlcnQudG9Jc29TdHJpbmdGcm9tRGF0ZSh5ZXN0ZXJkYXlFbmQudG9EYXRlKCkpfUApIG9yIChUaW1lbGVzcyBlcSB0cnVlIGFuZCBTdGFydERhdGUgYmV0d2VlbiBAJHt5ZXN0ZXJkYXlTdGFydC5mb3JtYXQoJ1lZWVktTU0tRERUMDA6MDA6MDBbWl0nKX1AIGFuZCBAJHt5ZXN0ZXJkYXlFbmQuZm9ybWF0KCdZWVlZLU1NLUREVDIzOjU5OjU5W1pdJyl9QCkpYDtcclxuICAgICAgcmV0dXJuIHF1ZXJ5O1xyXG4gICAgfSxcclxuICAgIHRvZGF5OiBmdW5jdGlvbiBjb21wdXRlVG9kYXkoKSB7XHJcbiAgICAgIGNvbnN0IG5vdyA9IG1vbWVudCgpO1xyXG4gICAgICBjb25zdCB0b2RheVN0YXJ0ID0gbm93LmNsb25lKClcclxuICAgICAgICAuc3RhcnRPZignZGF5Jyk7XHJcbiAgICAgIGNvbnN0IHRvZGF5RW5kID0gdG9kYXlTdGFydC5jbG9uZSgpXHJcbiAgICAgICAgLmVuZE9mKCdkYXknKTtcclxuXHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gYCgoVGltZWxlc3MgZXEgZmFsc2UgYW5kIFN0YXJ0RGF0ZSBiZXR3ZWVuIEAke2NvbnZlcnQudG9Jc29TdHJpbmdGcm9tRGF0ZSh0b2RheVN0YXJ0LnRvRGF0ZSgpKX1AIGFuZCBAJHtjb252ZXJ0LnRvSXNvU3RyaW5nRnJvbURhdGUodG9kYXlFbmQudG9EYXRlKCkpfUApIG9yIChUaW1lbGVzcyBlcSB0cnVlIGFuZCBTdGFydERhdGUgYmV0d2VlbiBAJHt0b2RheVN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERFQwMDowMDowMFtaXScpfUAgYW5kIEAke3RvZGF5RW5kLmZvcm1hdCgnWVlZWS1NTS1ERFQyMzo1OTo1OVtaXScpfUApKWA7XHJcbiAgICAgIHJldHVybiBxdWVyeTtcclxuICAgIH0sXHJcbiAgICAndGhpcy13ZWVrJzogZnVuY3Rpb24gY29tcHV0ZVRoaXNXZWVrKCkge1xyXG4gICAgICBjb25zdCBub3cgPSBtb21lbnQoKTtcclxuICAgICAgY29uc3Qgd2Vla1N0YXJ0RGF0ZSA9IG5vdy5jbG9uZSgpXHJcbiAgICAgICAgLnN0YXJ0T2YoJ3dlZWsnKTtcclxuICAgICAgY29uc3Qgd2Vla0VuZERhdGUgPSB3ZWVrU3RhcnREYXRlLmNsb25lKClcclxuICAgICAgICAuZW5kT2YoJ3dlZWsnKTtcclxuXHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gYCgoVGltZWxlc3MgZXEgZmFsc2UgYW5kIFN0YXJ0RGF0ZSBiZXR3ZWVuIEAke2NvbnZlcnQudG9Jc29TdHJpbmdGcm9tRGF0ZSh3ZWVrU3RhcnREYXRlLnRvRGF0ZSgpKX1AIGFuZCBAJHtjb252ZXJ0LnRvSXNvU3RyaW5nRnJvbURhdGUod2Vla0VuZERhdGUudG9EYXRlKCkpfUApIG9yIChUaW1lbGVzcyBlcSB0cnVlIGFuZCBTdGFydERhdGUgYmV0d2VlbiBAJHt3ZWVrU3RhcnREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERFQwMDowMDowMFtaXScpfUAgYW5kIEAke3dlZWtFbmREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERFQyMzo1OTo1OVtaXScpfUApKWA7XHJcbiAgICAgIHJldHVybiBxdWVyeTtcclxuICAgIH0sXHJcbiAgfSxcclxuICBkZWZhdWx0U2VhcmNoVGVybTogZnVuY3Rpb24gZGVmYXVsdFNlYXJjaFRlcm0oKSB7XHJcbiAgICBpZiAoQXBwLmVuYWJsZUhhc2hUYWdzKSB7XHJcbiAgICAgIGNvbnN0IGhhc2h0YWcgPSB0aGlzLmhhc2hUYWdRdWVyaWVzVGV4dFsndGhpcy13ZWVrJ107XHJcbiAgICAgIGlmICh0eXBlb2YgaGFzaHRhZyA9PT0gJ3N0cmluZycgJiYgaGFzaHRhZy5zdGFydHNXaXRoKCcjJykpIHtcclxuICAgICAgICByZXR1cm4gaGFzaHRhZztcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGAjJHtoYXNodGFnfWA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICcnO1xyXG4gIH0sXHJcbiAgZm9ybWF0U2VhcmNoUXVlcnk6IGZ1bmN0aW9uIGZvcm1hdFNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5KSB7XHJcbiAgICByZXR1cm4gYHVwcGVyKERlc2NyaXB0aW9uKSBsaWtlIFwiJSR7dGhpcy5lc2NhcGVTZWFyY2hRdWVyeShzZWFyY2hRdWVyeS50b1VwcGVyQ2FzZSgpKX0lXCJgO1xyXG4gIH0sXHJcbiAgZm9ybWF0RGF0ZVRpbWU6IGZ1bmN0aW9uIGZvcm1hdERhdGVUaW1lKCkge1xyXG4gICAgcmV0dXJuICdTdGFydFRpbWUnO1xyXG4gIH0sXHJcbiAgZ2V0SXRlbUFjdGlvbktleTogZnVuY3Rpb24gZ2V0SXRlbUFjdGlvbktleShlbnRyeSkge1xyXG4gICAgcmV0dXJuIGVudHJ5LiRrZXk7XHJcbiAgfSxcclxuICBnZXRJdGVtRGVzY3JpcHRvcjogZnVuY3Rpb24gZ2V0SXRlbURlc2NyaXB0b3IoZW50cnkpIHtcclxuICAgIHJldHVybiBlbnRyeS4kZGVzY3JpcHRvcjtcclxuICB9LFxyXG4gIGdldFRpdGxlOiBmdW5jdGlvbiBnZXRUaXRsZShlbnRyeSkge1xyXG4gICAgaWYgKCFlbnRyeSkge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICh0aGlzLl9tb2RlbCAmJiB0aGlzLl9tb2RlbC5nZXRFbnRpdHlEZXNjcmlwdGlvbihlbnRyeSkpIHx8IGVudHJ5LiRkZXNjcmlwdG9yO1xyXG4gIH0sXHJcbiAgY3JlYXRlSW5kaWNhdG9yTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVJbmRpY2F0b3JMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pdGVtSW5kaWNhdG9ycyB8fCAodGhpcy5pdGVtSW5kaWNhdG9ycyA9IFt7XHJcbiAgICAgIGlkOiAnYWxhcm0nLFxyXG4gICAgICBjbHM6ICdub3RpZmljYXRpb24nLFxyXG4gICAgICBsYWJlbDogdGhpcy5hbGFybVRleHQsXHJcbiAgICAgIG9uQXBwbHk6IGZ1bmN0aW9uIG9uQXBwbHkoZW50cnksIHBhcmVudCkge1xyXG4gICAgICAgIHRoaXMuaXNFbmFibGVkID0gcGFyZW50Lmhhc0FsYXJtKGVudHJ5KTtcclxuICAgICAgfSxcclxuICAgIH0sIHtcclxuICAgICAgaWQ6ICdpbXBvcnRhbnQnLFxyXG4gICAgICBjbHM6ICdzdGFyLWZpbGxlZCcsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmltcG9ydGFudFRleHQsXHJcbiAgICAgIG9uQXBwbHk6IGZ1bmN0aW9uIG9uQXBwbHkoZW50cnksIHBhcmVudCkge1xyXG4gICAgICAgIHRoaXMuaXNFbmFibGVkID0gcGFyZW50LmlzSW1wb3J0YW50KGVudHJ5KTtcclxuICAgICAgfSxcclxuICAgIH0sIHtcclxuICAgICAgaWQ6ICdyZWN1cnJpbmcnLFxyXG4gICAgICBjbHM6ICdsb2FkJyxcclxuICAgICAgbGFiZWw6IHRoaXMucmVjdXJyaW5nVGV4dCxcclxuICAgICAgb25BcHBseTogZnVuY3Rpb24gb25BcHBseShlbnRyeSwgcGFyZW50KSB7XHJcbiAgICAgICAgdGhpcy5pc0VuYWJsZWQgPSBwYXJlbnQuaXNSZWN1cnJpbmcoZW50cnksIHRoaXMpO1xyXG4gICAgICB9LFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ292ZXJkdWUnLFxyXG4gICAgICBjbHM6ICdlcnJvcicsXHJcbiAgICAgIGxhYmVsOiB0aGlzLm92ZXJkdWVUZXh0LFxyXG4gICAgICBvbkFwcGx5OiBmdW5jdGlvbiBvbkFwcGx5KGVudHJ5LCBwYXJlbnQpIHtcclxuICAgICAgICB0aGlzLmlzRW5hYmxlZCA9IHBhcmVudC5pc092ZXJkdWUoZW50cnkpO1xyXG4gICAgICB9LFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ3RvdWNoZWQnLFxyXG4gICAgICBjbHM6ICdmbGFnJyxcclxuICAgICAgbGFiZWw6IHRoaXMudG91Y2hlZFRleHQsXHJcbiAgICAgIG9uQXBwbHk6IGZ1bmN0aW9uIG9uQXBwbHkoZW50cnksIHBhcmVudCkge1xyXG4gICAgICAgIHRoaXMuaXNFbmFibGVkID0gcGFyZW50Lmhhc0JlZW5Ub3VjaGVkKGVudHJ5KTtcclxuICAgICAgfSxcclxuICAgIH1dKTtcclxuICB9LFxyXG4gIGhhc0JlZW5Ub3VjaGVkOiBmdW5jdGlvbiBoYXNCZWVuVG91Y2hlZChlbnRyeSkge1xyXG4gICAgaWYgKGVudHJ5Lk1vZGlmeURhdGUpIHtcclxuICAgICAgY29uc3QgbW9kaWZpZWREYXRlID0gbW9tZW50KGNvbnZlcnQudG9EYXRlRnJvbVN0cmluZyhlbnRyeS5Nb2RpZnlEYXRlKSk7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbW9tZW50KClcclxuICAgICAgICAuZW5kT2YoJ2RheScpO1xyXG4gICAgICBjb25zdCB3ZWVrQWdvID0gbW9tZW50KClcclxuICAgICAgICAuc3VidHJhY3QoMSwgJ3dlZWtzJyk7XHJcblxyXG4gICAgICByZXR1cm4gbW9kaWZpZWREYXRlLmlzQWZ0ZXIod2Vla0FnbykgJiZcclxuICAgICAgICBtb2RpZmllZERhdGUuaXNCZWZvcmUoY3VycmVudERhdGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0sXHJcbiAgaXNJbXBvcnRhbnQ6IGZ1bmN0aW9uIGlzSW1wb3J0YW50KGVudHJ5KSB7XHJcbiAgICByZXR1cm4gZW50cnkuUHJpb3JpdHkgPT09ICdIaWdoJztcclxuICB9LFxyXG4gIGlzT3ZlcmR1ZTogZnVuY3Rpb24gaXNPdmVyZHVlKGVudHJ5KSB7XHJcbiAgICBpZiAoZW50cnkuU3RhcnREYXRlKSB7XHJcbiAgICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IGNvbnZlcnQudG9EYXRlRnJvbVN0cmluZyhlbnRyeS5TdGFydERhdGUpO1xyXG4gICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIGNvbnN0IHNlY29uZHMgPSBNYXRoLnJvdW5kKChjdXJyZW50RGF0ZSAtIHN0YXJ0RGF0ZSkgLyAxMDAwKTtcclxuICAgICAgY29uc3QgbWlucyA9IHNlY29uZHMgLyA2MDtcclxuICAgICAgaWYgKG1pbnMgPj0gMSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSxcclxuICBpc1RpbWVsZXNzVG9kYXk6IGZ1bmN0aW9uIGlzVGltZWxlc3NUb2RheShlbnRyeSkge1xyXG4gICAgaWYgKCFlbnRyeSB8fCAhZW50cnkuVGltZWxlc3MpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN0YXJ0ID0gbW9tZW50KGVudHJ5LlN0YXJ0RGF0ZSk7XHJcbiAgICByZXR1cm4gdGhpcy5faXNUaW1lbGVzc1RvZGF5KHN0YXJ0KTtcclxuICB9LFxyXG4gIF9pc1RpbWVsZXNzVG9kYXk6IGZ1bmN0aW9uIF9pc1RpbWVsZXNzVG9kYXkoc3RhcnQpIHtcclxuICAgIC8vIFN0YXJ0IGlzIFVUQywgY29udmVydCBpdCB0byBsb2NhbCB0aW1lIHNvIHdlIGNhbiBjb21wYXJlIGl0IGFnYWluc3QgXCJub3dcIlxyXG4gICAgc3RhcnQuc3VidHJhY3Qoe1xyXG4gICAgICBtaW51dGVzOiBzdGFydC51dGNPZmZzZXQoKSxcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHN0YXJ0LmlzQWZ0ZXIobW9tZW50KClcclxuICAgICAgLnN0YXJ0T2YoJ2RheScpKSAmJiBzdGFydC5pc0JlZm9yZShtb21lbnQoKVxyXG4gICAgICAuZW5kT2YoJ2RheScpKTtcclxuICB9LFxyXG4gIGlzUmVjdXJyaW5nOiBmdW5jdGlvbiBpc1JlY3VycmluZyhlbnRyeSkge1xyXG4gICAgaWYgKGVudHJ5LlJlY3VycmVuY2VTdGF0ZSkge1xyXG4gICAgICBpZiAoZW50cnkuUmVjdXJyZW5jZVN0YXRlID09PSAncnN0T2NjdXJyZW5jZScpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0sXHJcbiAgaGFzQWxhcm06IGZ1bmN0aW9uIGhhc0FsYXJtKGVudHJ5KSB7XHJcbiAgICBpZiAoZW50cnkuQWxhcm0gPT09IHRydWUpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSxcclxuICBnZXRJdGVtSWNvbkNsYXNzOiBmdW5jdGlvbiBnZXRJdGVtSWNvbkNsYXNzKGVudHJ5KSB7XHJcbiAgICBjb25zdCB0eXBlID0gZW50cnkgJiYgZW50cnkuVHlwZTtcclxuICAgIHJldHVybiB0aGlzLl9nZXRJdGVtSWNvbkNsYXNzKHR5cGUpO1xyXG4gIH0sXHJcbiAgX2dldEl0ZW1JY29uQ2xhc3M6IGZ1bmN0aW9uIF9nZXRJdGVtSWNvbkNsYXNzKHR5cGUpIHtcclxuICAgIHJldHVybiBhY3Rpdml0eVR5cGVJY29ucy5kZWZhdWx0W3R5cGVdO1xyXG4gIH0sXHJcbiAgY3JlYXRlQWN0aW9uTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVBY3Rpb25MYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25zIHx8ICh0aGlzLmFjdGlvbnMgPSBbe1xyXG4gICAgICBpZDogJ2NvbXBsZXRlJyxcclxuICAgICAgY2xzOiAnY2hlY2tib3gnLFxyXG4gICAgICBsYWJlbDogdGhpcy5jb21wbGV0ZUFjdGl2aXR5VGV4dCxcclxuICAgICAgZW5hYmxlZDogZnVuY3Rpb24gZW5hYmxlZCh0aGVBY3Rpb24sIHNlbGVjdGlvbikge1xyXG4gICAgICAgIGNvbnN0IGVudHJ5ID0gc2VsZWN0aW9uICYmIHNlbGVjdGlvbi5kYXRhO1xyXG4gICAgICAgIGlmICghZW50cnkpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJlY3VyID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKGVudHJ5LlJlY3VycmVuY2VTdGF0ZSA9PT0gJ3JzdE9jY3VycmVuY2UnKSB7XHJcbiAgICAgICAgICByZWN1ciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZW50cnkuTGVhZGVyLiRrZXkgPT09IEFwcC5jb250ZXh0LnVzZXIuJGtleSAmJiAhcmVjdXI7XHJcbiAgICAgIH0sXHJcbiAgICAgIGZuOiAoZnVuY3Rpb24gZm4odGhlQWN0aW9uLCBzZWxlY3Rpb24pIHtcclxuICAgICAgICBjb25zdCBlbnRyeSA9IHNlbGVjdGlvbiAmJiBzZWxlY3Rpb24uZGF0YSAmJiBzZWxlY3Rpb24uZGF0YTtcclxuXHJcbiAgICAgICAgZW50cnkuQ29tcGxldGVkRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgZW50cnkuUmVzdWx0ID0gJ0NvbXBsZXRlJztcclxuXHJcbiAgICAgICAgZW52aXJvbm1lbnQucmVmcmVzaEFjdGl2aXR5TGlzdHMoKTtcclxuICAgICAgICB0aGlzLmNvbXBsZXRlQWN0aXZpdHkoZW50cnkpO1xyXG4gICAgICB9KVxyXG4gICAgICAgIC5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICB9LCB7XHJcbiAgICAgIGlkOiAnY2FsbCcsXHJcbiAgICAgIGNsczogJ3Bob25lJyxcclxuICAgICAgbGFiZWw6IHRoaXMuY2FsbFRleHQsXHJcbiAgICAgIGVuYWJsZWQ6IGZ1bmN0aW9uIGVuYWJsZWQodGhlQWN0aW9uLCBzZWxlY3Rpb24pIHtcclxuICAgICAgICBjb25zdCBlbnRyeSA9IHNlbGVjdGlvbiAmJiBzZWxlY3Rpb24uZGF0YTtcclxuICAgICAgICByZXR1cm4gZW50cnkgJiYgZW50cnkuUGhvbmVOdW1iZXI7XHJcbiAgICAgIH0sXHJcbiAgICAgIGZuOiBmdW5jdGlvbiBmbih0aGVBY3Rpb24sIHNlbGVjdGlvbikge1xyXG4gICAgICAgIGNvbnN0IGVudHJ5ID0gc2VsZWN0aW9uICYmIHNlbGVjdGlvbi5kYXRhO1xyXG4gICAgICAgIGNvbnN0IHBob25lID0gZW50cnkgJiYgZW50cnkuUGhvbmVOdW1iZXI7XHJcbiAgICAgICAgaWYgKHBob25lKSB7XHJcbiAgICAgICAgICB0aGlzLnJlY29yZENhbGxUb0hpc3RvcnkoZnVuY3Rpb24gaW5pdGlhdGVDYWxsKCkge1xyXG4gICAgICAgICAgICBBcHAuaW5pdGlhdGVDYWxsKHBob25lKTtcclxuICAgICAgICAgIH0uYmluZERlbGVnYXRlKHRoaXMpLCBlbnRyeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgIH0sIHtcclxuICAgICAgaWQ6ICdhZGRBdHRhY2htZW50JyxcclxuICAgICAgY2xzOiAnYXR0YWNoJyxcclxuICAgICAgbGFiZWw6IHRoaXMuYWRkQXR0YWNobWVudEFjdGlvblRleHQsXHJcbiAgICAgIGZuOiBhY3Rpb24uYWRkQXR0YWNobWVudC5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICB9XSk7XHJcbiAgfSxcclxuICByZWNvcmRDYWxsVG9IaXN0b3J5OiBmdW5jdGlvbiByZWNvcmRDYWxsVG9IaXN0b3J5KGNvbXBsZXRlLCBlbnRyeSkge1xyXG4gICAgY29uc3QgdGVtcEVudHJ5ID0ge1xyXG4gICAgICAkbmFtZTogJ0hpc3RvcnknLFxyXG4gICAgICBUeXBlOiAnYXRQaG9uZUNhbGwnLFxyXG4gICAgICBDb250YWN0TmFtZTogZW50cnkuQ29udGFjdE5hbWUsXHJcbiAgICAgIENvbnRhY3RJZDogZW50cnkuQ29udGFjdElkLFxyXG4gICAgICBBY2NvdW50TmFtZTogZW50cnkuQWNjb3VudE5hbWUsXHJcbiAgICAgIEFjY291bnRJZDogZW50cnkuQWNjb3VudElkLFxyXG4gICAgICBEZXNjcmlwdGlvbjogc3RyaW5nLnN1YnN0aXR1dGUodGhpcy5jYWxsZWRUZXh0LCBbZW50cnkuQ29udGFjdE5hbWUgfHwgJyddKSxcclxuICAgICAgVXNlcklkOiBBcHAuY29udGV4dCAmJiBBcHAuY29udGV4dC51c2VyLiRrZXksXHJcbiAgICAgIFVzZXJOYW1lOiBBcHAuY29udGV4dCAmJiBBcHAuY29udGV4dC51c2VyLlVzZXJOYW1lLFxyXG4gICAgICBEdXJhdGlvbjogMTUsXHJcbiAgICAgIENvbXBsZXRlZERhdGU6IChuZXcgRGF0ZSgpKSxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5uYXZpZ2F0ZVRvSGlzdG9yeUluc2VydCgnYXRQaG9uZUNhbGwnLCB0ZW1wRW50cnksIGNvbXBsZXRlKTtcclxuICB9LFxyXG4gIG5hdmlnYXRlVG9IaXN0b3J5SW5zZXJ0OiBmdW5jdGlvbiBuYXZpZ2F0ZVRvSGlzdG9yeUluc2VydCh0eXBlLCBlbnRyeSwgY29tcGxldGUpIHtcclxuICAgIGFjdGlvbi5uYXZpZ2F0ZVRvSGlzdG9yeUluc2VydChlbnRyeSwgY29tcGxldGUpO1xyXG4gIH0sXHJcbiAgY29tcGxldGVBY3Rpdml0eTogZnVuY3Rpb24gY29tcGxldGVBY3Rpdml0eShlbnRyeSkge1xyXG4gICAgY29uc3QgYWN0aXZpdHlNb2RlbCA9IEFwcC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoTU9ERUxfTkFNRVMuQUNUSVZJVFksIE1PREVMX1RZUEVTLlNEQVRBKTtcclxuICAgIGlmIChhY3Rpdml0eU1vZGVsKSB7XHJcbiAgICAgIGFjdGl2aXR5TW9kZWwuY29tcGxldGVBY3Rpdml0eShlbnRyeSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgY29ubmVjdC5wdWJsaXNoKCcvYXBwL3JlZnJlc2gnLCBbe1xyXG4gICAgICAgICAgcmVzb3VyY2VLaW5kOiAnaGlzdG9yeScsXHJcbiAgICAgICAgfV0pO1xyXG5cclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgIH0sIChlcnIpID0+IHtcclxuICAgICAgICB0aGlzLm9uUmVxdWVzdEZhaWx1cmUoZXJyLCB0aGlzKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvblJlcXVlc3RGYWlsdXJlOiBmdW5jdGlvbiBvblJlcXVlc3RGYWlsdXJlKHJlc3BvbnNlLCBvKSB7XHJcbiAgICBFcnJvck1hbmFnZXIuYWRkRXJyb3IocmVzcG9uc2UsIG8sIHt9LCAnZmFpbHVyZScpO1xyXG4gIH0sXHJcbiAgYWN0aXZhdGVFbnRyeTogZnVuY3Rpb24gYWN0aXZhdGVFbnRyeShwYXJhbXMpIHtcclxuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5lbnRyaWVzW3BhcmFtcy5rZXldO1xyXG4gICAgaWYgKGVudHJ5KSB7XHJcbiAgICAgIGNvbnN0IGFjdGl2aXR5UGFyYW1zID0gcGFyYW1zO1xyXG4gICAgICBhY3Rpdml0eVBhcmFtcy5kZXNjcmlwdG9yID0gdGhpcy5fbW9kZWwuZ2V0RW50aXR5RGVzY3JpcHRpb24oZW50cnkpO1xyXG4gICAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMsIFthY3Rpdml0eVBhcmFtc10pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICAgIH1cclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==