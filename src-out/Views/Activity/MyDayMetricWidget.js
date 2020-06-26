define("crm/Views/Activity/MyDayMetricWidget", ["exports", "../MetricWidget", "dojo/_base/declare", "dojo/_base/lang", "dojo/when", "dojo/Deferred", "argos/Models/Types", "dojo/store/util/QueryResults"], function (_exports, _MetricWidget, _declare, _lang, _when, _Deferred, _Types, _QueryResults) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _MetricWidget = _interopRequireDefault(_MetricWidget);
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _when = _interopRequireDefault(_when);
  _Deferred = _interopRequireDefault(_Deferred);
  _Types = _interopRequireDefault(_Types);
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
  var _default = (0, _declare["default"])('crm.Views.Activity.MyDayMetricWidget', [_MetricWidget["default"]], {
    navToReportView: function navToReportView() {},
    activityType: '',
    _buildQueryOptions: function _buildQueryOptions() {
      var self = this;
      return {
        returnQueryResults: true,
        filter: function filter(entity) {
          if (entity.Type === self.activityType) {
            if (self.parent) {
              var filter = self.parent.getCurrentFilter();

              if (filter && filter.fn) {
                var result = filter.fn.apply(self.parent, [entity]);

                if (result) {
                  return true;
                }

                return false;
              }
            }

            return true;
          }

          return false;
        }
      };
    },
    _getData: function _getData() {
      var queryOptions = this._buildQueryOptions();

      var model = App.ModelManager.getModel('Activity', _Types["default"].OFFLINE);
      var queryResults = model.getEntries(null, queryOptions);
      (0, _when["default"])(queryResults, _lang["default"].hitch(this, this._onQuerySuccessCount, queryResults), _lang["default"].hitch(this, this._onQueryError));
    },
    _onQuerySuccessCount: function _onQuerySuccessCount(results) {
      var _this = this;

      var def = new _Deferred["default"]();
      (0, _when["default"])(results.total, function (total) {
        var metricResults = [{
          name: _this.activityType,
          value: total
        }];
        def.resolve(metricResults);
      });

      this._onQuerySuccess((0, _QueryResults["default"])(def.promise)); // eslint-disable-line

    }
  });

  _exports["default"] = _default;
});