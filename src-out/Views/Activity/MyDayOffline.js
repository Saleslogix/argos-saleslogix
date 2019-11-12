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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BY3Rpdml0eS9NeURheU9mZmxpbmUuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJpZCIsImVudGl0eU5hbWUiLCJ0aXRsZVRleHQiLCJtb2RlbE5hbWUiLCJBQ1RJVklUWSIsIl9jdXJyZW50RmlsdGVyTmFtZSIsImZpbHRlcnMiLCJfaW5pdE9mZmxpbmVWaWV3Iiwib2ZmbGluZUNvbnRleHQiLCJ2aWV3SWQiLCJyZWZyZXNoUmVxdWlyZWQiLCJfbW9kZWwiLCJBcHAiLCJNb2RlbE1hbmFnZXIiLCJnZXRNb2RlbCIsIk9GRkxJTkUiLCJfZW50aXR5VmlldyIsImdldEVudGl0eVZpZXciLCJnZXRGaWx0ZXJzIiwidG9kYXkiLCJsYWJlbCIsInRvZGF5RmlsdGVyTGFiZWwiLCJmbiIsImlzVG9kYXkiLCJ0aGlzV2Vla0ZpbHRlckxhYmVsIiwiaXNUaGlzV2VlayIsInllc3RlcmRheSIsInllc3RlcmRheUZpbHRlckxhYmVsIiwiaXNZZXN0ZXJkYXkiLCJnZXRDdXJyZW50RmlsdGVyIiwic2V0Q3VycmVudEZpbHRlciIsIm5hbWUiLCJfYXBwbHlTdGF0ZVRvUXVlcnlPcHRpb25zIiwicXVlcnlPcHRpb25zIiwic2VsZiIsImZpbHRlciIsImVudGl0eSIsInJlc3VsdCIsImFwcGx5IiwiZW50cnkiLCJTdGFydERhdGUiLCJjdXJyZW50RGF0ZSIsIm1vbWVudCIsInN0YXJ0RGF0ZSIsInRvRGF0ZUZyb21TdHJpbmciLCJUaW1lbGVzcyIsInN1YnRyYWN0IiwibWludXRlcyIsInV0Y09mZnNldCIsImlzQWZ0ZXIiLCJzdGFydE9mIiwiaXNCZWZvcmUiLCJlbmRPZiIsIm5vdyIsIndlZWtTdGFydERhdGUiLCJjbG9uZSIsIndlZWtFbmREYXRlIiwiaXNZZXN0ZXJEYXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFlQTs7Ozs7Ozs7QUFrQkEsTUFBTUEsV0FBVyxv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QURvQixXQUFuQixDQUFaO0FBR0Q7QUFDRCxZQUFJTCxVQUFVTSxPQUFWLENBQWtCdkIsVUFBVXdCLE9BQVYsQ0FBa0IsS0FBbEIsQ0FBbEIsS0FBK0NQLFVBQVVRLFFBQVYsQ0FBbUJ6QixVQUFVMEIsS0FBVixDQUFnQixLQUFoQixDQUFuQixDQUFuRCxFQUErRjtBQUM3RixpQkFBTyxJQUFQO0FBQ0Q7QUFDRjtBQUNELGFBQU8sS0FBUDtBQUNEO0FBM0d1SCxHQUEzRyxDIiwiZmlsZSI6Ik15RGF5T2ZmbGluZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLkFjdGl2aXR5Lk15RGF5T2ZmbGluZVxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5fTGlzdEJhc2VcclxuICogQHJlcXVpcmVzIGFyZ29zLl9MaXN0QmFzZVxyXG4gKlxyXG4gKlxyXG4gKi9cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IE9mZmxpbmVMaXN0IGZyb20gJy4uL09mZmxpbmUvTGlzdCc7XHJcbmltcG9ydCBNeURheU1ldHJpY0xpc3RNaXhpbiBmcm9tICcuL015RGF5TWV0cmljTGlzdE1peGluJztcclxuaW1wb3J0IE15RGF5UmlnaHREcmF3ZXJMaXN0TWl4aW4gZnJvbSAnLi9NeURheVJpZ2h0RHJhd2VyTGlzdE1peGluJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBNT0RFTF9UWVBFUyBmcm9tICdhcmdvcy9Nb2RlbHMvVHlwZXMnO1xyXG5pbXBvcnQgY29udmVydCBmcm9tICdhcmdvcy9Db252ZXJ0JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2FjdGl2aXR5TXlEYXlPZmZsaW5lJyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWNsYXJlKCdjcm0uVmlld3MuQWN0aXZpdHkuTXlEYXlPZmZsaW5lJywgW09mZmxpbmVMaXN0LCBNeURheU1ldHJpY0xpc3RNaXhpbiwgTXlEYXlSaWdodERyYXdlckxpc3RNaXhpbl0sIHtcclxuICBpZDogJ215ZGF5X29mZmxpbmVfbGlzdCcsXHJcblxyXG4gIGVudGl0eU5hbWU6ICdBY3Rpdml0eScsXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5BQ1RJVklUWSxcclxuICBfY3VycmVudEZpbHRlck5hbWU6ICd0b2RheScsXHJcbiAgZmlsdGVyczogbnVsbCxcclxuICBfaW5pdE9mZmxpbmVWaWV3OiBmdW5jdGlvbiBfaW5pdE9mZmxpbmVWaWV3KCkge1xyXG4gICAgdGhpcy5vZmZsaW5lQ29udGV4dCA9IHtcclxuICAgICAgZW50aXR5TmFtZTogJ0FjdGl2aXR5JyxcclxuICAgICAgdmlld0lkOiAnYWN0aXZpdHlfcmVsYXRlZCcsXHJcbiAgICB9O1xyXG4gICAgdGhpcy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5fbW9kZWwgPSBBcHAuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKHRoaXMub2ZmbGluZUNvbnRleHQuZW50aXR5TmFtZSwgTU9ERUxfVFlQRVMuT0ZGTElORSk7XHJcbiAgICB0aGlzLl9lbnRpdHlWaWV3ID0gdGhpcy5nZXRFbnRpdHlWaWV3KCk7XHJcbiAgfSxcclxuICBnZXRGaWx0ZXJzOiBmdW5jdGlvbiBnZXRGaWx0ZXJzKCkge1xyXG4gICAgaWYgKCF0aGlzLmZpbHRlcnMpIHtcclxuICAgICAgdGhpcy5maWx0ZXJzID0ge1xyXG4gICAgICAgIHRvZGF5OiB7XHJcbiAgICAgICAgICBsYWJlbDogcmVzb3VyY2UudG9kYXlGaWx0ZXJMYWJlbCxcclxuICAgICAgICAgIGZuOiB0aGlzLmlzVG9kYXksXHJcbiAgICAgICAgfSxcclxuICAgICAgICAndGhpcy13ZWVrJzoge1xyXG4gICAgICAgICAgbGFiZWw6IHJlc291cmNlLnRoaXNXZWVrRmlsdGVyTGFiZWwsXHJcbiAgICAgICAgICBmbjogdGhpcy5pc1RoaXNXZWVrLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeWVzdGVyZGF5OiB7XHJcbiAgICAgICAgICBsYWJlbDogcmVzb3VyY2UueWVzdGVyZGF5RmlsdGVyTGFiZWwsXHJcbiAgICAgICAgICBmbjogdGhpcy5pc1llc3RlcmRheSxcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuZmlsdGVycztcclxuICB9LFxyXG5cclxuICBnZXRDdXJyZW50RmlsdGVyOiBmdW5jdGlvbiBnZXRDdXJyZW50RmlsdGVyKCkge1xyXG4gICAgY29uc3QgZmlsdGVycyA9IHRoaXMuZ2V0RmlsdGVycygpO1xyXG4gICAgcmV0dXJuIGZpbHRlcnNbdGhpcy5fY3VycmVudEZpbHRlck5hbWVdO1xyXG4gIH0sXHJcbiAgc2V0Q3VycmVudEZpbHRlcjogZnVuY3Rpb24gc2V0Q3VycmVudEZpbHRlcihuYW1lKSB7XHJcbiAgICB0aGlzLl9jdXJyZW50RmlsdGVyTmFtZSA9IG5hbWU7XHJcbiAgfSxcclxuICBfYXBwbHlTdGF0ZVRvUXVlcnlPcHRpb25zOiBmdW5jdGlvbiBfYXBwbHlTdGF0ZVRvUXVlcnlPcHRpb25zKHF1ZXJ5T3B0aW9ucykge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBxdWVyeU9wdGlvbnMuZmlsdGVyID0gKGVudGl0eSkgPT4ge1xyXG4gICAgICBjb25zdCBmaWx0ZXIgPSBzZWxmLmdldEN1cnJlbnRGaWx0ZXIoKTtcclxuICAgICAgaWYgKGZpbHRlciAmJiBmaWx0ZXIuZm4pIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBmaWx0ZXIuZm4uYXBwbHkoc2VsZiwgW2VudGl0eV0pO1xyXG4gICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gcXVlcnlPcHRpb25zO1xyXG4gIH0sXHJcbiAgaXNUb2RheTogZnVuY3Rpb24gaXNUb2RheShlbnRyeSkge1xyXG4gICAgaWYgKGVudHJ5LlN0YXJ0RGF0ZSkge1xyXG4gICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG1vbWVudCgpO1xyXG4gICAgICBsZXQgc3RhcnREYXRlID0gbW9tZW50KGNvbnZlcnQudG9EYXRlRnJvbVN0cmluZyhlbnRyeS5TdGFydERhdGUpKTtcclxuICAgICAgaWYgKGVudHJ5LlRpbWVsZXNzKSB7XHJcbiAgICAgICAgc3RhcnREYXRlID0gc3RhcnREYXRlLnN1YnRyYWN0KHtcclxuICAgICAgICAgIG1pbnV0ZXM6IHN0YXJ0RGF0ZS51dGNPZmZzZXQoKSxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoc3RhcnREYXRlLmlzQWZ0ZXIoY3VycmVudERhdGUuc3RhcnRPZignZGF5JykpICYmIHN0YXJ0RGF0ZS5pc0JlZm9yZShtb21lbnQoKS5lbmRPZignZGF5JykpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LFxyXG4gIGlzVGhpc1dlZWs6IGZ1bmN0aW9uIGlzVGhpc1dlZWsoZW50cnkpIHtcclxuICAgIGlmIChlbnRyeS5TdGFydERhdGUpIHtcclxuICAgICAgY29uc3Qgbm93ID0gbW9tZW50KCk7XHJcbiAgICAgIGNvbnN0IHdlZWtTdGFydERhdGUgPSBub3cuY2xvbmUoKS5zdGFydE9mKCd3ZWVrJyk7XHJcbiAgICAgIGNvbnN0IHdlZWtFbmREYXRlID0gd2Vla1N0YXJ0RGF0ZS5jbG9uZSgpLmVuZE9mKCd3ZWVrJyk7XHJcbiAgICAgIGxldCBzdGFydERhdGUgPSBtb21lbnQoY29udmVydC50b0RhdGVGcm9tU3RyaW5nKGVudHJ5LlN0YXJ0RGF0ZSkpO1xyXG4gICAgICBpZiAoZW50cnkuVGltZWxlc3MpIHtcclxuICAgICAgICBzdGFydERhdGUgPSBzdGFydERhdGUuc3VidHJhY3Qoe1xyXG4gICAgICAgICAgbWludXRlczogc3RhcnREYXRlLnV0Y09mZnNldCgpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChzdGFydERhdGUuaXNBZnRlcih3ZWVrU3RhcnREYXRlLnN0YXJ0T2YoJ2RheScpKSAmJiBzdGFydERhdGUuaXNCZWZvcmUod2Vla0VuZERhdGUuZW5kT2YoJ2RheScpKSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSxcclxuICBpc1llc3RlcmRheTogZnVuY3Rpb24gaXNZZXN0ZXJEYXkoZW50cnkpIHtcclxuICAgIGlmIChlbnRyeS5TdGFydERhdGUpIHtcclxuICAgICAgY29uc3Qgbm93ID0gbW9tZW50KCk7XHJcbiAgICAgIGNvbnN0IHllc3RlcmRheSA9IG5vdy5jbG9uZSgpLnN1YnRyYWN0KDEsICdkYXlzJyk7XHJcbiAgICAgIGxldCBzdGFydERhdGUgPSBtb21lbnQoY29udmVydC50b0RhdGVGcm9tU3RyaW5nKGVudHJ5LlN0YXJ0RGF0ZSkpO1xyXG4gICAgICBpZiAoZW50cnkuVGltZWxlc3MpIHtcclxuICAgICAgICBzdGFydERhdGUgPSBzdGFydERhdGUuc3VidHJhY3Qoe1xyXG4gICAgICAgICAgbWludXRlczogc3RhcnREYXRlLnV0Y09mZnNldCgpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChzdGFydERhdGUuaXNBZnRlcih5ZXN0ZXJkYXkuc3RhcnRPZignZGF5JykpICYmIHN0YXJ0RGF0ZS5pc0JlZm9yZSh5ZXN0ZXJkYXkuZW5kT2YoJ2RheScpKSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSxcclxufSk7XHJcbiJdfQ==