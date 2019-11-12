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

  /**
   * @class crm.Views.Activity.MyDayMetricListMixin
   *
   *
   * @requires crm.Views.MetricWidget
   * @extends crm.Views._MetricListMixin
   *
   */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BY3Rpdml0eS9NeURheU1ldHJpY0xpc3RNaXhpbi5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwibWV0cmljV2lkZ2V0Q3RvciIsIl9hcHBseVN0YXRlVG9XaWRnZXRPcHRpb25zIiwid2lkZ2V0T3B0aW9ucyIsIm9wdGlvbnMiLCJwYXJlbnQiLCJjcmVhdGVNZXRyaWNXaWRnZXRzTGF5b3V0IiwibWV0cmljcyIsImZpbHRlcmVkIiwiQXBwIiwiZ2V0TWV0cmljc0J5UmVzb3VyY2VLaW5kIiwibGVuZ3RoIiwiZmlsdGVyIiwiaXRlbSIsImVuYWJsZWQiLCJjbG9uZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQTs7Ozs7Ozs7QUFuQkE7Ozs7Ozs7Ozs7Ozs7OztBQTJCQSxNQUFNQSxVQUFVLHVCQUFRLHlDQUFSLEVBQW1ELDJCQUFuRCxFQUF1RTs7QUFFckZDLGlEQUZxRjtBQUdyRkMsZ0NBQTRCLFNBQVNBLDBCQUFULENBQW9DQyxhQUFwQyxFQUFtRDtBQUM3RSxVQUFNQyxVQUFVRCxhQUFoQjtBQUNBQyxjQUFRQyxNQUFSLEdBQWlCLElBQWpCO0FBQ0EsYUFBT0QsT0FBUDtBQUNELEtBUG9GO0FBUXJGRSwrQkFBMkIsU0FBU0EseUJBQVQsR0FBcUM7QUFDOUQsVUFBSUMsVUFBVSxFQUFkO0FBQ0EsVUFBSUMsV0FBVyxFQUFmOztBQUVBRCxnQkFBVUUsSUFBSUMsd0JBQUosQ0FBNkIsZ0JBQTdCLENBQVY7O0FBRUEsVUFBSUgsUUFBUUksTUFBUixHQUFpQixDQUFyQixFQUF3QjtBQUN0QkgsbUJBQVdELFFBQVFLLE1BQVIsQ0FBZSxVQUFDQyxJQUFELEVBQVU7QUFDbEMsaUJBQU9BLEtBQUtDLE9BQVo7QUFDRCxTQUZVLENBQVg7QUFHRDs7QUFFRCxhQUFPLGVBQUtDLEtBQUwsQ0FBV1AsUUFBWCxDQUFQO0FBQ0Q7QUFyQm9GLEdBQXZFLENBQWhCO29CQXVCZVIsTyIsImZpbGUiOiJNeURheU1ldHJpY0xpc3RNaXhpbi5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBNeURheU1ldHJpY1dpZGdldCBmcm9tICcuL015RGF5TWV0cmljV2lkZ2V0JztcclxuaW1wb3J0IF9NZXRyaWNMaXN0TWl4aW4gZnJvbSAnLi4vX01ldHJpY0xpc3RNaXhpbic7XHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLkFjdGl2aXR5Lk15RGF5TWV0cmljTGlzdE1peGluXHJcbiAqXHJcbiAqXHJcbiAqIEByZXF1aXJlcyBjcm0uVmlld3MuTWV0cmljV2lkZ2V0XHJcbiAqIEBleHRlbmRzIGNybS5WaWV3cy5fTWV0cmljTGlzdE1peGluXHJcbiAqXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLkFjdGl2aXR5Lk15RGF5TWV0cmljTGlzdE1peGluJywgW19NZXRyaWNMaXN0TWl4aW5dLCB7XHJcblxyXG4gIG1ldHJpY1dpZGdldEN0b3I6IE15RGF5TWV0cmljV2lkZ2V0LFxyXG4gIF9hcHBseVN0YXRlVG9XaWRnZXRPcHRpb25zOiBmdW5jdGlvbiBfYXBwbHlTdGF0ZVRvV2lkZ2V0T3B0aW9ucyh3aWRnZXRPcHRpb25zKSB7XHJcbiAgICBjb25zdCBvcHRpb25zID0gd2lkZ2V0T3B0aW9ucztcclxuICAgIG9wdGlvbnMucGFyZW50ID0gdGhpcztcclxuICAgIHJldHVybiBvcHRpb25zO1xyXG4gIH0sXHJcbiAgY3JlYXRlTWV0cmljV2lkZ2V0c0xheW91dDogZnVuY3Rpb24gY3JlYXRlTWV0cmljV2lkZ2V0c0xheW91dCgpIHtcclxuICAgIGxldCBtZXRyaWNzID0gW107XHJcbiAgICBsZXQgZmlsdGVyZWQgPSBbXTtcclxuXHJcbiAgICBtZXRyaWNzID0gQXBwLmdldE1ldHJpY3NCeVJlc291cmNlS2luZCgndXNlckFjdGl2aXRpZXMnKTtcclxuXHJcbiAgICBpZiAobWV0cmljcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGZpbHRlcmVkID0gbWV0cmljcy5maWx0ZXIoKGl0ZW0pID0+IHtcclxuICAgICAgICByZXR1cm4gaXRlbS5lbmFibGVkO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbGFuZy5jbG9uZShmaWx0ZXJlZCk7XHJcbiAgfSxcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==