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
      this.inherited(postCreate, arguments);
    },
    destroyWidgets: function destroyWidgets() {
      if (this.metricWidgets) {
        this.metricWidgets.forEach(function (widget) {
          widget.destroy();
        });
      }
    },
    processEntry: function processEntry(entry) {
      this.inherited(processEntry, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9fTWV0cmljRGV0YWlsTWl4aW4uanMiXSwibmFtZXMiOlsiX19jbGFzcyIsIm1ldHJpY05vZGUiLCJtZXRyaWNXaWRnZXRzIiwiZW50aXR5TmFtZSIsInBvc3RNaXhJblByb3BlcnRpZXMiLCJ3aWRnZXRUZW1wbGF0ZSIsIlNpbXBsYXRlIiwicG9zdENyZWF0ZSIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImRlc3Ryb3lXaWRnZXRzIiwiZm9yRWFjaCIsIndpZGdldCIsImRlc3Ryb3kiLCJwcm9jZXNzRW50cnkiLCJlbnRyeSIsInJlYnVpbGRXaWRnZXRzIiwiY3JlYXRlTWV0cmljV2lkZ2V0c0xheW91dCIsIndpZGdldE9wdGlvbnMiLCJvcHRpb25zIiwiaGFzVmFsaWRPcHRpb25zIiwicGxhY2VBdCIsInJlcXVlc3REYXRhIiwicHVzaCIsInF1ZXJ5QXJncyIsIl9maWx0ZXJOYW1lIiwiX21ldHJpY05hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQWtCQTs7Ozs7Ozs7QUFsQkE7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxNQUFNQSxVQUFVLHVCQUFRLDhCQUFSLEVBQXdDLElBQXhDLEVBQThDO0FBQzVEO0FBQ0FDLGdCQUFZLElBRmdEO0FBRzVEQyxtQkFBZSxJQUg2QztBQUk1REMsZ0JBQVksRUFKZ0Q7O0FBTTVEQyx5QkFBcUIsU0FBU0EsbUJBQVQsR0FBK0I7QUFDbEQsV0FBS0MsY0FBTCxHQUFzQixJQUFJQyxRQUFKLENBQWEsQ0FDakMsaUxBRGlDLEVBRWpDLDBCQUZpQyxFQUdqQyxtRUFIaUMsRUFJakMsd0VBSmlDLEVBS2pDLFFBTGlDLENBQWIsQ0FBdEI7QUFPRCxLQWQyRDtBQWU1REMsZ0JBQVksU0FBU0EsVUFBVCxHQUFzQjtBQUNoQyxXQUFLQyxTQUFMLENBQWVELFVBQWYsRUFBMkJFLFNBQTNCO0FBQ0QsS0FqQjJEO0FBa0I1REMsb0JBQWdCLFNBQVNBLGNBQVQsR0FBMEI7QUFDeEMsVUFBSSxLQUFLUixhQUFULEVBQXdCO0FBQ3RCLGFBQUtBLGFBQUwsQ0FBbUJTLE9BQW5CLENBQTJCLFVBQUNDLE1BQUQsRUFBWTtBQUNyQ0EsaUJBQU9DLE9BQVA7QUFDRCxTQUZEO0FBR0Q7QUFDRixLQXhCMkQ7QUF5QjVEQyxrQkFBYyxTQUFTQSxZQUFULENBQXNCQyxLQUF0QixFQUE2QjtBQUN6QyxXQUFLUCxTQUFMLENBQWVNLFlBQWYsRUFBNkJMLFNBQTdCO0FBQ0EsV0FBS08sY0FBTCxDQUFvQkQsS0FBcEI7QUFDRCxLQTVCMkQ7QUE2QjVERSwrQkFBMkIsU0FBU0EseUJBQVQsR0FBcUMsQ0FBRSxDQTdCTjtBQThCNURELG9CQUFnQixTQUFTQSxjQUFULENBQXdCRCxLQUF4QixFQUErQjtBQUFBOztBQUM3QyxXQUFLTCxjQUFMO0FBQ0EsV0FBS1IsYUFBTCxHQUFxQixFQUFyQjs7QUFFQTtBQUNBLFVBQU1nQixnQkFBZ0IsS0FBS0QseUJBQUwsQ0FBK0JGLEtBQS9CLEtBQXlDLEVBQS9EO0FBQ0FHLG9CQUFjUCxPQUFkLENBQXNCLFVBQUNRLE9BQUQsRUFBYTtBQUNqQyxZQUFJLE1BQUtDLGVBQUwsQ0FBcUJELE9BQXJCLENBQUosRUFBbUM7QUFDakMsY0FBTVAsU0FBUywyQkFBaUJPLE9BQWpCLENBQWY7QUFDQVAsaUJBQU9TLE9BQVAsQ0FBZSxNQUFLcEIsVUFBcEIsRUFBZ0MsTUFBaEM7QUFDQVcsaUJBQU9VLFdBQVA7QUFDQSxnQkFBS3BCLGFBQUwsQ0FBbUJxQixJQUFuQixDQUF3QlgsTUFBeEI7QUFDRDtBQUNGLE9BUEQsRUFPRyxJQVBIO0FBUUQsS0E1QzJEO0FBNkM1RFEscUJBQWlCLFNBQVNBLGVBQVQsQ0FBeUJELE9BQXpCLEVBQWtDO0FBQ2pELGFBQU9BLFdBQVdBLFFBQVFLLFNBQW5CLElBQWdDTCxRQUFRSyxTQUFSLENBQWtCQyxXQUFsRCxJQUFpRU4sUUFBUUssU0FBUixDQUFrQkUsV0FBMUY7QUFDRDtBQS9DMkQsR0FBOUMsQ0FBaEI7O29CQWtEZTFCLE8iLCJmaWxlIjoiX01ldHJpY0RldGFpbE1peGluLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IE1ldHJpY1dpZGdldCBmcm9tICcuL01ldHJpY1dpZGdldCc7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5fTWV0cmljRGV0YWlsTWl4aW5cclxuICogQGNsYXNzZGVzYyBNaXhpbiBmb3IgYWRkaW5nIEtQSSB3aWRnZXRzIHRvIGRldGFpbCB2aWV3cy5cclxuICogQHNpbmNlIDMuMFxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgY3JtLlZpZXdzLk1ldHJpY1dpZGdldFxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5fTWV0cmljRGV0YWlsTWl4aW4nLCBudWxsLCB7XHJcbiAgLy8gTWV0cmljc1xyXG4gIG1ldHJpY05vZGU6IG51bGwsXHJcbiAgbWV0cmljV2lkZ2V0czogbnVsbCxcclxuICBlbnRpdHlOYW1lOiAnJyxcclxuXHJcbiAgcG9zdE1peEluUHJvcGVydGllczogZnVuY3Rpb24gcG9zdE1peEluUHJvcGVydGllcygpIHtcclxuICAgIHRoaXMud2lkZ2V0VGVtcGxhdGUgPSBuZXcgU2ltcGxhdGUoW1xyXG4gICAgICAnPGRpdiBpZD1cInslPSAkLmlkICV9XCIgZGF0YS10aXRsZT1cInslPSAkLnRpdGxlVGV4dCAlfVwiIGNsYXNzPVwib3ZlcnRocm93IGRldGFpbCBwYW5lbCB7JT0gJC5jbHMgJX1cIiB7JSBpZiAoJC5yZXNvdXJjZUtpbmQpIHsgJX1kYXRhLXJlc291cmNlLWtpbmQ9XCJ7JT0gJC5yZXNvdXJjZUtpbmQgJX1cInslIH0gJX0+JyxcclxuICAgICAgJ3slISAkLmxvYWRpbmdUZW1wbGF0ZSAlfScsXHJcbiAgICAgICc8dWwgZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cIm1ldHJpY05vZGVcIiBjbGFzcz1cIm1ldHJpYy1saXN0XCI+PC91bD4nLFxyXG4gICAgICAnPGRpdiBjbGFzcz1cInBhbmVsLWNvbnRlbnRcIiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwiY29udGVudE5vZGVcIj48L2Rpdj4nLFxyXG4gICAgICAnPC9kaXY+JyxcclxuICAgIF0pO1xyXG4gIH0sXHJcbiAgcG9zdENyZWF0ZTogZnVuY3Rpb24gcG9zdENyZWF0ZSgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKHBvc3RDcmVhdGUsIGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBkZXN0cm95V2lkZ2V0czogZnVuY3Rpb24gZGVzdHJveVdpZGdldHMoKSB7XHJcbiAgICBpZiAodGhpcy5tZXRyaWNXaWRnZXRzKSB7XHJcbiAgICAgIHRoaXMubWV0cmljV2lkZ2V0cy5mb3JFYWNoKCh3aWRnZXQpID0+IHtcclxuICAgICAgICB3aWRnZXQuZGVzdHJveSgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIHByb2Nlc3NFbnRyeTogZnVuY3Rpb24gcHJvY2Vzc0VudHJ5KGVudHJ5KSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChwcm9jZXNzRW50cnksIGFyZ3VtZW50cyk7XHJcbiAgICB0aGlzLnJlYnVpbGRXaWRnZXRzKGVudHJ5KTtcclxuICB9LFxyXG4gIGNyZWF0ZU1ldHJpY1dpZGdldHNMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZU1ldHJpY1dpZGdldHNMYXlvdXQoKSB7fSxcclxuICByZWJ1aWxkV2lkZ2V0czogZnVuY3Rpb24gcmVidWlsZFdpZGdldHMoZW50cnkpIHtcclxuICAgIHRoaXMuZGVzdHJveVdpZGdldHMoKTtcclxuICAgIHRoaXMubWV0cmljV2lkZ2V0cyA9IFtdO1xyXG5cclxuICAgIC8vIENyZWF0ZSBtZXRyaWNzIHdpZGdldHMgYW5kIHBsYWNlIHRoZW0gaW4gdGhlIG1ldHJpY05vZGVcclxuICAgIGNvbnN0IHdpZGdldE9wdGlvbnMgPSB0aGlzLmNyZWF0ZU1ldHJpY1dpZGdldHNMYXlvdXQoZW50cnkpIHx8IFtdO1xyXG4gICAgd2lkZ2V0T3B0aW9ucy5mb3JFYWNoKChvcHRpb25zKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmhhc1ZhbGlkT3B0aW9ucyhvcHRpb25zKSkge1xyXG4gICAgICAgIGNvbnN0IHdpZGdldCA9IG5ldyBNZXRyaWNXaWRnZXQob3B0aW9ucyk7XHJcbiAgICAgICAgd2lkZ2V0LnBsYWNlQXQodGhpcy5tZXRyaWNOb2RlLCAnbGFzdCcpO1xyXG4gICAgICAgIHdpZGdldC5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgIHRoaXMubWV0cmljV2lkZ2V0cy5wdXNoKHdpZGdldCk7XHJcbiAgICAgIH1cclxuICAgIH0sIHRoaXMpO1xyXG4gIH0sXHJcbiAgaGFzVmFsaWRPcHRpb25zOiBmdW5jdGlvbiBoYXNWYWxpZE9wdGlvbnMob3B0aW9ucykge1xyXG4gICAgcmV0dXJuIG9wdGlvbnMgJiYgb3B0aW9ucy5xdWVyeUFyZ3MgJiYgb3B0aW9ucy5xdWVyeUFyZ3MuX2ZpbHRlck5hbWUgJiYgb3B0aW9ucy5xdWVyeUFyZ3MuX21ldHJpY05hbWU7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=