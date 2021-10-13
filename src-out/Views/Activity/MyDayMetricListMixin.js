define('crm/Views/Activity/MyDayMetricListMixin', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './MyDayMetricWidget', '../_MetricListMixin'], function (module, exports, _declare, _lang, _MyDayMetricWidget, _MetricListMixin2) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _MyDayMetricWidget2 = _interopRequireDefault(_MyDayMetricWidget);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

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

  var __class = (0, _declare2.default)('crm.Views.Activity.MyDayMetricListMixin', [_MetricListMixin3.default], {

    metricWidgetCtor: _MyDayMetricWidget2.default,
    _applyStateToWidgetOptions: function _applyStateToWidgetOptions(widgetOptions) {
      var options = widgetOptions;
      options.parent = this;
      return options;
    },
    createMetricWidgetsLayout: function createMetricWidgetsLayout() {
      var metrics = [];
      var filtered = [];

      metrics = App.getMetricsByResourceKind('userActivities');

      if (metrics.length > 0) {
        filtered = metrics.filter(function (item) {
          return item.enabled;
        });
      }

      return _lang2.default.clone(filtered);
    }
  });
  exports.default = __class;
  module.exports = exports['default'];
});