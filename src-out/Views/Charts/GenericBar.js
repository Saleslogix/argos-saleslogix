define('crm/Views/Charts/GenericBar', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/array', 'dojo/dom-geometry', 'argos/View', './_ChartMixin'], function (module, exports, _declare, _array, _domGeometry, _View, _ChartMixin2) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _array2 = _interopRequireDefault(_array);

  var _domGeometry2 = _interopRequireDefault(_domGeometry);

  var _View2 = _interopRequireDefault(_View);

  var _ChartMixin3 = _interopRequireDefault(_ChartMixin2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @class crm.Views.Charts.GenericBar
   *
   * @extends argos.View
   * @mixins crm.Views.Charts._ChartMixin
   *
   */
  var __class = (0, _declare2.default)('crm.Views.Charts.GenericBar', [_View2.default, _ChartMixin3.default], /** @lends crm.Views.Charts.GenericBar# */{
    id: 'chart_generic_bar',
    titleText: '',
    expose: false,
    chart: null,
    barColor: '#1D5F8A',

    chartOptions: {
      scaleBeginAtZero: false,
      barShowStroke: false,
      legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    },

    formatter: function formatter(val) {
      return val;
    },

    attributeMap: {
      chartContent: {
        node: 'contentNode',
        type: 'innerHTML'
      },
      title: _View2.default.prototype.attributeMap.title,
      selected: _View2.default.prototype.attributeMap.selected
    },

    createChart: function createChart(rawData) {
      this.inherited(createChart, arguments);

      this.showSearchExpression();

      var labels = [];
      var seriesData = _array2.default.map(rawData, function (item) {
        labels.push(item.$descriptor);
        return Math.round(item.value);
      });

      var data = {
        labels: labels,
        datasets: [{
          label: 'Default',
          fillColor: this.barColor,
          data: seriesData
        }]
      };

      if (this.chart) {
        this.chart.destroy();
      }

      var box = _domGeometry2.default.getMarginBox(this.domNode);
      this.contentNode.width = box.w;
      this.contentNode.height = box.h;

      var ctx = this.contentNode.getContext('2d');

      this.chart = new window.Chart(ctx).Bar(data, this.chartOptions); // eslint-disable-line
    }
  }); /* Copyright 2017 Infor
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

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9DaGFydHMvR2VuZXJpY0Jhci5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiaWQiLCJ0aXRsZVRleHQiLCJleHBvc2UiLCJjaGFydCIsImJhckNvbG9yIiwiY2hhcnRPcHRpb25zIiwic2NhbGVCZWdpbkF0WmVybyIsImJhclNob3dTdHJva2UiLCJsZWdlbmRUZW1wbGF0ZSIsImZvcm1hdHRlciIsInZhbCIsImF0dHJpYnV0ZU1hcCIsImNoYXJ0Q29udGVudCIsIm5vZGUiLCJ0eXBlIiwidGl0bGUiLCJwcm90b3R5cGUiLCJzZWxlY3RlZCIsImNyZWF0ZUNoYXJ0IiwicmF3RGF0YSIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsInNob3dTZWFyY2hFeHByZXNzaW9uIiwibGFiZWxzIiwic2VyaWVzRGF0YSIsIm1hcCIsIml0ZW0iLCJwdXNoIiwiJGRlc2NyaXB0b3IiLCJNYXRoIiwicm91bmQiLCJ2YWx1ZSIsImRhdGEiLCJkYXRhc2V0cyIsImxhYmVsIiwiZmlsbENvbG9yIiwiZGVzdHJveSIsImJveCIsImdldE1hcmdpbkJveCIsImRvbU5vZGUiLCJjb250ZW50Tm9kZSIsIndpZHRoIiwidyIsImhlaWdodCIsImgiLCJjdHgiLCJnZXRDb250ZXh0Iiwid2luZG93IiwiQ2hhcnQiLCJCYXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQTs7Ozs7OztBQU9BLE1BQU1BLFVBQVUsdUJBQVEsNkJBQVIsRUFBdUMsc0NBQXZDLEVBQTRELDBDQUEwQztBQUNwSEMsUUFBSSxtQkFEZ0g7QUFFcEhDLGVBQVcsRUFGeUc7QUFHcEhDLFlBQVEsS0FINEc7QUFJcEhDLFdBQU8sSUFKNkc7QUFLcEhDLGNBQVUsU0FMMEc7O0FBT3BIQyxrQkFBYztBQUNaQyx3QkFBa0IsS0FETjtBQUVaQyxxQkFBZSxLQUZIO0FBR1pDLHNCQUFnQjtBQUhKLEtBUHNHOztBQWFwSEMsZUFBVyxTQUFTQSxTQUFULENBQW1CQyxHQUFuQixFQUF3QjtBQUNqQyxhQUFPQSxHQUFQO0FBQ0QsS0FmbUg7O0FBaUJwSEMsa0JBQWM7QUFDWkMsb0JBQWM7QUFDWkMsY0FBTSxhQURNO0FBRVpDLGNBQU07QUFGTSxPQURGO0FBS1pDLGFBQU8sZUFBS0MsU0FBTCxDQUFlTCxZQUFmLENBQTRCSSxLQUx2QjtBQU1aRSxnQkFBVSxlQUFLRCxTQUFMLENBQWVMLFlBQWYsQ0FBNEJNO0FBTjFCLEtBakJzRzs7QUEwQnBIQyxpQkFBYSxTQUFTQSxXQUFULENBQXFCQyxPQUFyQixFQUE4QjtBQUN6QyxXQUFLQyxTQUFMLENBQWVGLFdBQWYsRUFBNEJHLFNBQTVCOztBQUVBLFdBQUtDLG9CQUFMOztBQUVBLFVBQU1DLFNBQVMsRUFBZjtBQUNBLFVBQU1DLGFBQWEsZ0JBQU1DLEdBQU4sQ0FBVU4sT0FBVixFQUFtQixVQUFDTyxJQUFELEVBQVU7QUFDOUNILGVBQU9JLElBQVAsQ0FBWUQsS0FBS0UsV0FBakI7QUFDQSxlQUFPQyxLQUFLQyxLQUFMLENBQVdKLEtBQUtLLEtBQWhCLENBQVA7QUFDRCxPQUhrQixDQUFuQjs7QUFLQSxVQUFNQyxPQUFPO0FBQ1hULHNCQURXO0FBRVhVLGtCQUFVLENBQUM7QUFDVEMsaUJBQU8sU0FERTtBQUVUQyxxQkFBVyxLQUFLL0IsUUFGUDtBQUdUNEIsZ0JBQU1SO0FBSEcsU0FBRDtBQUZDLE9BQWI7O0FBU0EsVUFBSSxLQUFLckIsS0FBVCxFQUFnQjtBQUNkLGFBQUtBLEtBQUwsQ0FBV2lDLE9BQVg7QUFDRDs7QUFFRCxVQUFNQyxNQUFNLHNCQUFPQyxZQUFQLENBQW9CLEtBQUtDLE9BQXpCLENBQVo7QUFDQSxXQUFLQyxXQUFMLENBQWlCQyxLQUFqQixHQUF5QkosSUFBSUssQ0FBN0I7QUFDQSxXQUFLRixXQUFMLENBQWlCRyxNQUFqQixHQUEwQk4sSUFBSU8sQ0FBOUI7O0FBRUEsVUFBTUMsTUFBTSxLQUFLTCxXQUFMLENBQWlCTSxVQUFqQixDQUE0QixJQUE1QixDQUFaOztBQUVBLFdBQUszQyxLQUFMLEdBQWEsSUFBSTRDLE9BQU9DLEtBQVgsQ0FBaUJILEdBQWpCLEVBQXNCSSxHQUF0QixDQUEwQmpCLElBQTFCLEVBQWdDLEtBQUszQixZQUFyQyxDQUFiLENBOUJ5QyxDQThCd0I7QUFDbEU7QUF6RG1ILEdBQXRHLENBQWhCLEMsQ0E1QkE7Ozs7Ozs7Ozs7Ozs7OztvQkF3RmVOLE8iLCJmaWxlIjoiR2VuZXJpY0Jhci5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBhcnJheSBmcm9tICdkb2pvL19iYXNlL2FycmF5JztcclxuaW1wb3J0IGRvbUdlbyBmcm9tICdkb2pvL2RvbS1nZW9tZXRyeSc7XHJcbmltcG9ydCBWaWV3IGZyb20gJ2FyZ29zL1ZpZXcnO1xyXG5pbXBvcnQgX0NoYXJ0TWl4aW4gZnJvbSAnLi9fQ2hhcnRNaXhpbic7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5DaGFydHMuR2VuZXJpY0JhclxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5WaWV3XHJcbiAqIEBtaXhpbnMgY3JtLlZpZXdzLkNoYXJ0cy5fQ2hhcnRNaXhpblxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5DaGFydHMuR2VuZXJpY0JhcicsIFtWaWV3LCBfQ2hhcnRNaXhpbl0sIC8qKiBAbGVuZHMgY3JtLlZpZXdzLkNoYXJ0cy5HZW5lcmljQmFyIyAqL3tcclxuICBpZDogJ2NoYXJ0X2dlbmVyaWNfYmFyJyxcclxuICB0aXRsZVRleHQ6ICcnLFxyXG4gIGV4cG9zZTogZmFsc2UsXHJcbiAgY2hhcnQ6IG51bGwsXHJcbiAgYmFyQ29sb3I6ICcjMUQ1RjhBJyxcclxuXHJcbiAgY2hhcnRPcHRpb25zOiB7XHJcbiAgICBzY2FsZUJlZ2luQXRaZXJvOiBmYWxzZSxcclxuICAgIGJhclNob3dTdHJva2U6IGZhbHNlLFxyXG4gICAgbGVnZW5kVGVtcGxhdGU6ICc8dWwgY2xhc3M9XCI8JT1uYW1lLnRvTG93ZXJDYXNlKCklPi1sZWdlbmRcIj48JSBmb3IgKHZhciBpPTA7IGk8ZGF0YXNldHMubGVuZ3RoOyBpKyspeyU+PGxpPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjo8JT1kYXRhc2V0c1tpXS5maWxsQ29sb3IlPlwiPjwvc3Bhbj48JWlmKGRhdGFzZXRzW2ldLmxhYmVsKXslPjwlPWRhdGFzZXRzW2ldLmxhYmVsJT48JX0lPjwvbGk+PCV9JT48L3VsPicsXHJcbiAgfSxcclxuXHJcbiAgZm9ybWF0dGVyOiBmdW5jdGlvbiBmb3JtYXR0ZXIodmFsKSB7XHJcbiAgICByZXR1cm4gdmFsO1xyXG4gIH0sXHJcblxyXG4gIGF0dHJpYnV0ZU1hcDoge1xyXG4gICAgY2hhcnRDb250ZW50OiB7XHJcbiAgICAgIG5vZGU6ICdjb250ZW50Tm9kZScsXHJcbiAgICAgIHR5cGU6ICdpbm5lckhUTUwnLFxyXG4gICAgfSxcclxuICAgIHRpdGxlOiBWaWV3LnByb3RvdHlwZS5hdHRyaWJ1dGVNYXAudGl0bGUsXHJcbiAgICBzZWxlY3RlZDogVmlldy5wcm90b3R5cGUuYXR0cmlidXRlTWFwLnNlbGVjdGVkLFxyXG4gIH0sXHJcblxyXG4gIGNyZWF0ZUNoYXJ0OiBmdW5jdGlvbiBjcmVhdGVDaGFydChyYXdEYXRhKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChjcmVhdGVDaGFydCwgYXJndW1lbnRzKTtcclxuXHJcbiAgICB0aGlzLnNob3dTZWFyY2hFeHByZXNzaW9uKCk7XHJcblxyXG4gICAgY29uc3QgbGFiZWxzID0gW107XHJcbiAgICBjb25zdCBzZXJpZXNEYXRhID0gYXJyYXkubWFwKHJhd0RhdGEsIChpdGVtKSA9PiB7XHJcbiAgICAgIGxhYmVscy5wdXNoKGl0ZW0uJGRlc2NyaXB0b3IpO1xyXG4gICAgICByZXR1cm4gTWF0aC5yb3VuZChpdGVtLnZhbHVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgIGxhYmVscyxcclxuICAgICAgZGF0YXNldHM6IFt7XHJcbiAgICAgICAgbGFiZWw6ICdEZWZhdWx0JyxcclxuICAgICAgICBmaWxsQ29sb3I6IHRoaXMuYmFyQ29sb3IsXHJcbiAgICAgICAgZGF0YTogc2VyaWVzRGF0YSxcclxuICAgICAgfV0sXHJcbiAgICB9O1xyXG5cclxuICAgIGlmICh0aGlzLmNoYXJ0KSB7XHJcbiAgICAgIHRoaXMuY2hhcnQuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJveCA9IGRvbUdlby5nZXRNYXJnaW5Cb3godGhpcy5kb21Ob2RlKTtcclxuICAgIHRoaXMuY29udGVudE5vZGUud2lkdGggPSBib3gudztcclxuICAgIHRoaXMuY29udGVudE5vZGUuaGVpZ2h0ID0gYm94Lmg7XHJcblxyXG4gICAgY29uc3QgY3R4ID0gdGhpcy5jb250ZW50Tm9kZS5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuICAgIHRoaXMuY2hhcnQgPSBuZXcgd2luZG93LkNoYXJ0KGN0eCkuQmFyKGRhdGEsIHRoaXMuY2hhcnRPcHRpb25zKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19