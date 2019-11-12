define('crm/Views/_MetricDetailMixin', ['module', 'exports', 'dojo/_base/declare', './MetricWidget'], function (module, exports, _declare, _MetricWidget) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _MetricWidget2 = _interopRequireDefault(_MetricWidget);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @class crm.Views._MetricDetailMixin
   * @classdesc Mixin for adding KPI widgets to detail views.
   * @since 3.0
   *
   * @requires crm.Views.MetricWidget
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

  var __class = (0, _declare2.default)('crm.Views._MetricDetailMixin', null, {
    // Metrics
    metricNode: null,
    metricWidgets: null,
    entityName: '',

    postMixInProperties: function postMixInProperties() {
      this.widgetTemplate = new Simplate(['<div id="{%= $.id %}" data-title="{%= $.titleText %}" class="overthrow detail panel {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>', '{%! $.loadingTemplate %}', '<ul data-dojo-attach-point="metricNode" class="metric-list"></ul>', '<div class="panel-content" data-dojo-attach-point="contentNode"></div>', '</div>']);
    },
    postCreate: function postCreate() {
      this.inherited(arguments);
    },
    destroyWidgets: function destroyWidgets() {
      if (this.metricWidgets) {
        this.metricWidgets.forEach(function (widget) {
          widget.destroy();
        });
      }
    },
    processEntry: function processEntry(entry) {
      this.inherited(arguments);
      this.rebuildWidgets(entry);
    },
    createMetricWidgetsLayout: function createMetricWidgetsLayout() {},
    rebuildWidgets: function rebuildWidgets(entry) {
      var _this = this;

      this.destroyWidgets();
      this.metricWidgets = [];

      // Create metrics widgets and place them in the metricNode
      var widgetOptions = this.createMetricWidgetsLayout(entry) || [];
      widgetOptions.forEach(function (options) {
        if (_this.hasValidOptions(options)) {
          var widget = new _MetricWidget2.default(options);
          widget.placeAt(_this.metricNode, 'last');
          widget.requestData();
          _this.metricWidgets.push(widget);
        }
      }, this);
    },
    hasValidOptions: function hasValidOptions(options) {
      return options && options.queryArgs && options.queryArgs._filterName && options.queryArgs._metricName;
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9fTWV0cmljRGV0YWlsTWl4aW4uanMiXSwibmFtZXMiOlsiX19jbGFzcyIsIm1ldHJpY05vZGUiLCJtZXRyaWNXaWRnZXRzIiwiZW50aXR5TmFtZSIsInBvc3RNaXhJblByb3BlcnRpZXMiLCJ3aWRnZXRUZW1wbGF0ZSIsIlNpbXBsYXRlIiwicG9zdENyZWF0ZSIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImRlc3Ryb3lXaWRnZXRzIiwiZm9yRWFjaCIsIndpZGdldCIsImRlc3Ryb3kiLCJwcm9jZXNzRW50cnkiLCJlbnRyeSIsInJlYnVpbGRXaWRnZXRzIiwiY3JlYXRlTWV0cmljV2lkZ2V0c0xheW91dCIsIndpZGdldE9wdGlvbnMiLCJvcHRpb25zIiwiaGFzVmFsaWRPcHRpb25zIiwicGxhY2VBdCIsInJlcXVlc3REYXRhIiwicHVzaCIsInF1ZXJ5QXJncyIsIl9maWx0ZXJOYW1lIiwiX21ldHJpY05hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQWtCQTs7Ozs7Ozs7QUFsQkE7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxNQUFNQSxVQUFVLHVCQUFRLDhCQUFSLEVBQXdDLElBQXhDLEVBQThDO0FBQzVEO0FBQ0FDLGdCQUFZLElBRmdEO0FBRzVEQyxtQkFBZSxJQUg2QztBQUk1REMsZ0JBQVksRUFKZ0Q7O0FBTTVEQyx5QkFBcUIsU0FBU0EsbUJBQVQsR0FBK0I7QUFDbEQsV0FBS0MsY0FBTCxHQUFzQixJQUFJQyxRQUFKLENBQWEsQ0FDakMsaUxBRGlDLEVBRWpDLDBCQUZpQyxFQUdqQyxtRUFIaUMsRUFJakMsd0VBSmlDLEVBS2pDLFFBTGlDLENBQWIsQ0FBdEI7QUFPRCxLQWQyRDtBQWU1REMsZ0JBQVksU0FBU0EsVUFBVCxHQUFzQjtBQUNoQyxXQUFLQyxTQUFMLENBQWVDLFNBQWY7QUFDRCxLQWpCMkQ7QUFrQjVEQyxvQkFBZ0IsU0FBU0EsY0FBVCxHQUEwQjtBQUN4QyxVQUFJLEtBQUtSLGFBQVQsRUFBd0I7QUFDdEIsYUFBS0EsYUFBTCxDQUFtQlMsT0FBbkIsQ0FBMkIsVUFBQ0MsTUFBRCxFQUFZO0FBQ3JDQSxpQkFBT0MsT0FBUDtBQUNELFNBRkQ7QUFHRDtBQUNGLEtBeEIyRDtBQXlCNURDLGtCQUFjLFNBQVNBLFlBQVQsQ0FBc0JDLEtBQXRCLEVBQTZCO0FBQ3pDLFdBQUtQLFNBQUwsQ0FBZUMsU0FBZjtBQUNBLFdBQUtPLGNBQUwsQ0FBb0JELEtBQXBCO0FBQ0QsS0E1QjJEO0FBNkI1REUsK0JBQTJCLFNBQVNBLHlCQUFULEdBQXFDLENBQUUsQ0E3Qk47QUE4QjVERCxvQkFBZ0IsU0FBU0EsY0FBVCxDQUF3QkQsS0FBeEIsRUFBK0I7QUFBQTs7QUFDN0MsV0FBS0wsY0FBTDtBQUNBLFdBQUtSLGFBQUwsR0FBcUIsRUFBckI7O0FBRUE7QUFDQSxVQUFNZ0IsZ0JBQWdCLEtBQUtELHlCQUFMLENBQStCRixLQUEvQixLQUF5QyxFQUEvRDtBQUNBRyxvQkFBY1AsT0FBZCxDQUFzQixVQUFDUSxPQUFELEVBQWE7QUFDakMsWUFBSSxNQUFLQyxlQUFMLENBQXFCRCxPQUFyQixDQUFKLEVBQW1DO0FBQ2pDLGNBQU1QLFNBQVMsMkJBQWlCTyxPQUFqQixDQUFmO0FBQ0FQLGlCQUFPUyxPQUFQLENBQWUsTUFBS3BCLFVBQXBCLEVBQWdDLE1BQWhDO0FBQ0FXLGlCQUFPVSxXQUFQO0FBQ0EsZ0JBQUtwQixhQUFMLENBQW1CcUIsSUFBbkIsQ0FBd0JYLE1BQXhCO0FBQ0Q7QUFDRixPQVBELEVBT0csSUFQSDtBQVFELEtBNUMyRDtBQTZDNURRLHFCQUFpQixTQUFTQSxlQUFULENBQXlCRCxPQUF6QixFQUFrQztBQUNqRCxhQUFPQSxXQUFXQSxRQUFRSyxTQUFuQixJQUFnQ0wsUUFBUUssU0FBUixDQUFrQkMsV0FBbEQsSUFBaUVOLFFBQVFLLFNBQVIsQ0FBa0JFLFdBQTFGO0FBQ0Q7QUEvQzJELEdBQTlDLENBQWhCOztvQkFrRGUxQixPIiwiZmlsZSI6Il9NZXRyaWNEZXRhaWxNaXhpbi5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBNZXRyaWNXaWRnZXQgZnJvbSAnLi9NZXRyaWNXaWRnZXQnO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuX01ldHJpY0RldGFpbE1peGluXHJcbiAqIEBjbGFzc2Rlc2MgTWl4aW4gZm9yIGFkZGluZyBLUEkgd2lkZ2V0cyB0byBkZXRhaWwgdmlld3MuXHJcbiAqIEBzaW5jZSAzLjBcclxuICpcclxuICogQHJlcXVpcmVzIGNybS5WaWV3cy5NZXRyaWNXaWRnZXRcclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuX01ldHJpY0RldGFpbE1peGluJywgbnVsbCwge1xyXG4gIC8vIE1ldHJpY3NcclxuICBtZXRyaWNOb2RlOiBudWxsLFxyXG4gIG1ldHJpY1dpZGdldHM6IG51bGwsXHJcbiAgZW50aXR5TmFtZTogJycsXHJcblxyXG4gIHBvc3RNaXhJblByb3BlcnRpZXM6IGZ1bmN0aW9uIHBvc3RNaXhJblByb3BlcnRpZXMoKSB7XHJcbiAgICB0aGlzLndpZGdldFRlbXBsYXRlID0gbmV3IFNpbXBsYXRlKFtcclxuICAgICAgJzxkaXYgaWQ9XCJ7JT0gJC5pZCAlfVwiIGRhdGEtdGl0bGU9XCJ7JT0gJC50aXRsZVRleHQgJX1cIiBjbGFzcz1cIm92ZXJ0aHJvdyBkZXRhaWwgcGFuZWwgeyU9ICQuY2xzICV9XCIgeyUgaWYgKCQucmVzb3VyY2VLaW5kKSB7ICV9ZGF0YS1yZXNvdXJjZS1raW5kPVwieyU9ICQucmVzb3VyY2VLaW5kICV9XCJ7JSB9ICV9PicsXHJcbiAgICAgICd7JSEgJC5sb2FkaW5nVGVtcGxhdGUgJX0nLFxyXG4gICAgICAnPHVsIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJtZXRyaWNOb2RlXCIgY2xhc3M9XCJtZXRyaWMtbGlzdFwiPjwvdWw+JyxcclxuICAgICAgJzxkaXYgY2xhc3M9XCJwYW5lbC1jb250ZW50XCIgZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cImNvbnRlbnROb2RlXCI+PC9kaXY+JyxcclxuICAgICAgJzwvZGl2PicsXHJcbiAgICBdKTtcclxuICB9LFxyXG4gIHBvc3RDcmVhdGU6IGZ1bmN0aW9uIHBvc3RDcmVhdGUoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgZGVzdHJveVdpZGdldHM6IGZ1bmN0aW9uIGRlc3Ryb3lXaWRnZXRzKCkge1xyXG4gICAgaWYgKHRoaXMubWV0cmljV2lkZ2V0cykge1xyXG4gICAgICB0aGlzLm1ldHJpY1dpZGdldHMuZm9yRWFjaCgod2lkZ2V0KSA9PiB7XHJcbiAgICAgICAgd2lkZ2V0LmRlc3Ryb3koKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBwcm9jZXNzRW50cnk6IGZ1bmN0aW9uIHByb2Nlc3NFbnRyeShlbnRyeSkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICAgIHRoaXMucmVidWlsZFdpZGdldHMoZW50cnkpO1xyXG4gIH0sXHJcbiAgY3JlYXRlTWV0cmljV2lkZ2V0c0xheW91dDogZnVuY3Rpb24gY3JlYXRlTWV0cmljV2lkZ2V0c0xheW91dCgpIHt9LFxyXG4gIHJlYnVpbGRXaWRnZXRzOiBmdW5jdGlvbiByZWJ1aWxkV2lkZ2V0cyhlbnRyeSkge1xyXG4gICAgdGhpcy5kZXN0cm95V2lkZ2V0cygpO1xyXG4gICAgdGhpcy5tZXRyaWNXaWRnZXRzID0gW107XHJcblxyXG4gICAgLy8gQ3JlYXRlIG1ldHJpY3Mgd2lkZ2V0cyBhbmQgcGxhY2UgdGhlbSBpbiB0aGUgbWV0cmljTm9kZVxyXG4gICAgY29uc3Qgd2lkZ2V0T3B0aW9ucyA9IHRoaXMuY3JlYXRlTWV0cmljV2lkZ2V0c0xheW91dChlbnRyeSkgfHwgW107XHJcbiAgICB3aWRnZXRPcHRpb25zLmZvckVhY2goKG9wdGlvbnMpID0+IHtcclxuICAgICAgaWYgKHRoaXMuaGFzVmFsaWRPcHRpb25zKG9wdGlvbnMpKSB7XHJcbiAgICAgICAgY29uc3Qgd2lkZ2V0ID0gbmV3IE1ldHJpY1dpZGdldChvcHRpb25zKTtcclxuICAgICAgICB3aWRnZXQucGxhY2VBdCh0aGlzLm1ldHJpY05vZGUsICdsYXN0Jyk7XHJcbiAgICAgICAgd2lkZ2V0LnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgdGhpcy5tZXRyaWNXaWRnZXRzLnB1c2god2lkZ2V0KTtcclxuICAgICAgfVxyXG4gICAgfSwgdGhpcyk7XHJcbiAgfSxcclxuICBoYXNWYWxpZE9wdGlvbnM6IGZ1bmN0aW9uIGhhc1ZhbGlkT3B0aW9ucyhvcHRpb25zKSB7XHJcbiAgICByZXR1cm4gb3B0aW9ucyAmJiBvcHRpb25zLnF1ZXJ5QXJncyAmJiBvcHRpb25zLnF1ZXJ5QXJncy5fZmlsdGVyTmFtZSAmJiBvcHRpb25zLnF1ZXJ5QXJncy5fbWV0cmljTmFtZTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==