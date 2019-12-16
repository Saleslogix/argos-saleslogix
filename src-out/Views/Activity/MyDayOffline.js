define('crm/Views/Activity/MyDayOffline', ['module', 'exports', 'dojo/_base/declare', '../Offline/List', './MyDayMetricListMixin', './MyDayRightDrawerListMixin', '../../Models/Names', 'argos/Models/Types', 'argos/Convert', 'argos/I18n'], function (module, exports, _declare, _List, _MyDayMetricListMixin, _MyDayRightDrawerListMixin, _Names, _Types, _Convert, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _List2 = _interopRequireDefault(_List);

  var _MyDayMetricListMixin2 = _interopRequireDefault(_MyDayMetricListMixin);

  var _MyDayRightDrawerListMixin2 = _interopRequireDefault(_MyDayRightDrawerListMixin);

  var _Names2 = _interopRequireDefault(_Names);

  var _Types2 = _interopRequireDefault(_Types);

  var _Convert2 = _interopRequireDefault(_Convert);

  var _I18n2 = _interopRequireDefault(_I18n);

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

  /**
   * @class crm.Views.Activity.MyDayOffline
   *
   * @extends argos._ListBase
   * @requires argos._ListBase
   *
   *
   */
  var resource = (0, _I18n2.default)('activityMyDayOffline');

  exports.default = (0, _declare2.default)('crm.Views.Activity.MyDayOffline', [_List2.default, _MyDayMetricListMixin2.default, _MyDayRightDrawerListMixin2.default], {
    id: 'myday_offline_list',

    entityName: 'Activity',
    titleText: resource.titleText,
    modelName: _Names2.default.ACTIVITY,
    _currentFilterName: 'today',
    filters: null,
    _initOfflineView: function _initOfflineView() {
      this.offlineContext = {
        entityName: 'Activity',
        viewId: 'activity_related'
      };
      this.refreshRequired = true;
      this._model = App.ModelManager.getModel(this.offlineContext.entityName, _Types2.default.OFFLINE);
      this._entityView = this.getEntityView();
    },
    getFilters: function getFilters() {
      if (!this.filters) {
        this.filters = {
          today: {
            label: resource.todayFilterLabel,
            fn: this.isToday
          },
          'this-week': {
            label: resource.thisWeekFilterLabel,
            fn: this.isThisWeek
          },
          yesterday: {
            label: resource.yesterdayFilterLabel,
            fn: this.isYesterday
          }
        };
      }
      return this.filters;
    },

    getCurrentFilter: function getCurrentFilter() {
      var filters = this.getFilters();
      return filters[this._currentFilterName];
    },
    setCurrentFilter: function setCurrentFilter(name) {
      this._currentFilterName = name;
    },
    _applyStateToQueryOptions: function _applyStateToQueryOptions(queryOptions) {
      var self = this;
      queryOptions.filter = function (entity) {
        var filter = self.getCurrentFilter();
        if (filter && filter.fn) {
          var result = filter.fn.apply(self, [entity]);
          if (result) {
            return true;
          }
        } else {
          return true;
        }
      };

      return queryOptions;
    },
    isToday: function isToday(entry) {
      if (entry.StartDate) {
        var currentDate = moment();
        var startDate = moment(_Convert2.default.toDateFromString(entry.StartDate));
        if (entry.Timeless) {
          startDate = startDate.subtract({
            minutes: startDate.utcOffset()
          });
        }
        if (startDate.isAfter(currentDate.startOf('day')) && startDate.isBefore(moment().endOf('day'))) {
          return true;
        }
      }
      return false;
    },
    isThisWeek: function isThisWeek(entry) {
      if (entry.StartDate) {
        var now = moment();
        var weekStartDate = now.clone().startOf('week');
        var weekEndDate = weekStartDate.clone().endOf('week');
        var startDate = moment(_Convert2.default.toDateFromString(entry.StartDate));
        if (entry.Timeless) {
          startDate = startDate.subtract({
            minutes: startDate.utcOffset()
          });
        }
        if (startDate.isAfter(weekStartDate.startOf('day')) && startDate.isBefore(weekEndDate.endOf('day'))) {
          return true;
        }
      }
      return false;
    },
    isYesterday: function isYesterDay(entry) {
      if (entry.StartDate) {
        var now = moment();
        var yesterday = now.clone().subtract(1, 'days');
        var startDate = moment(_Convert2.default.toDateFromString(entry.StartDate));
        if (entry.Timeless) {
          startDate = startDate.subtract({
            minutes: startDate.utcOffset()
          });
        }
        if (startDate.isAfter(yesterday.startOf('day')) && startDate.isBefore(yesterday.endOf('day'))) {
          return true;
        }
      }
      return false;
    }
  });
  module.exports = exports['default'];
});