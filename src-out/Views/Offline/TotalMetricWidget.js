define("crm/Views/Offline/TotalMetricWidget", ["exports", "../MetricWidget", "dojo/_base/declare"], function (_exports, _MetricWidget, _declare) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _MetricWidget = _interopRequireDefault(_MetricWidget);
  _declare = _interopRequireDefault(_declare);

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
  var _default = (0, _declare["default"])('crm.Views.Offline.TotalMetricWidget', [_MetricWidget["default"]], {
    navToReportView: function navToReportView() {},
    _buildQueryOptions: function _buildQueryOptions() {
      return {};
    },
    _buildQueryExpression: function _buildQueryExpression() {
      var filters = this.activeEntityFilters || [];
      return {
        map: function map(doc, emit) {
          // If the user has entity filters stored in preferences, filter based on that
          if (App.preferences && App.preferences.offlineEntityFilters) {
            filters.forEach(function (f) {
              if (doc.entityName === f.name) {
                emit(1);
              }
            });
          } else {
            // User has no entity filter preferences (from right drawer)
            emit(1);
          }
        },
        reduce: '_count'
      };
    },
    createStore: function createStore() {
      this._model = App.modelManager.getModel('');
    }
  });

  _exports["default"] = _default;
});