define("crm/Views/RecentlyViewed/TotalMetricWidget", ["exports", "../MetricWidget", "dojo/_base/declare", "dojo/_base/lang", "dojo/when", "argos/Models/Types", "dojo/Deferred", "dojo/store/util/QueryResults"], function (_exports, _MetricWidget, _declare, _lang, _when, _Types, _Deferred, _QueryResults) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _MetricWidget = _interopRequireDefault(_MetricWidget);
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _when = _interopRequireDefault(_when);
  _Types = _interopRequireDefault(_Types);
  _Deferred = _interopRequireDefault(_Deferred);
  _QueryResults = _interopRequireDefault(_QueryResults);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  var _default = (0, _declare["default"])('crm.Views.RecentlyViewed.TotalMetricWidget', [_MetricWidget["default"]], {
    navToReportView: function navToReportView() {},
    _buildQueryOptions: function _buildQueryOptions() {
      var filters = App.preferences && App.preferences.recentlyViewedEntityFilters ? App.preferences.recentlyViewedEntityFilters : [];
      return {
        returnQueryResults: true,
        filter: function filter(entity) {
          // If the user has entity filters stored in preferences, filter based on that
          if (filters) {
            return filters.some(function (filter) {
              return entity.entityName === filter.name && filter.enabled;
            });
          } // User has no entity filter preferences (from right drawer)


          return true;
        }
      };
    },
    _getData: function _getData() {
      var queryOptions = this._buildQueryOptions();

      var model = App.ModelManager.getModel('RecentlyViewed', _Types["default"].OFFLINE);
      var queryResults = model.getEntries(null, queryOptions);
      (0, _when["default"])(queryResults, _lang["default"].hitch(this, this._onQuerySuccessCount, queryResults), _lang["default"].hitch(this, this._onQueryError));
    },
    _onQuerySuccessCount: function _onQuerySuccessCount(results) {
      var def = new _Deferred["default"]();
      (0, _when["default"])(results.total, function (total) {
        var metricResults = [{
          name: 'count',
          value: total
        }];
        def.resolve(metricResults);
      });

      this._onQuerySuccess((0, _QueryResults["default"])(def.promise)); // eslint-disable-line

    }
  });

  _exports["default"] = _default;
});