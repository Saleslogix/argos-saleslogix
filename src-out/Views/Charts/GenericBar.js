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
      this.inherited(arguments);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9DaGFydHMvR2VuZXJpY0Jhci5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiaWQiLCJ0aXRsZVRleHQiLCJleHBvc2UiLCJjaGFydCIsImJhckNvbG9yIiwiY2hhcnRPcHRpb25zIiwic2NhbGVCZWdpbkF0WmVybyIsImJhclNob3dTdHJva2UiLCJsZWdlbmRUZW1wbGF0ZSIsImZvcm1hdHRlciIsInZhbCIsImF0dHJpYnV0ZU1hcCIsImNoYXJ0Q29udGVudCIsIm5vZGUiLCJ0eXBlIiwidGl0bGUiLCJwcm90b3R5cGUiLCJzZWxlY3RlZCIsImNyZWF0ZUNoYXJ0IiwicmF3RGF0YSIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsInNob3dTZWFyY2hFeHByZXNzaW9uIiwibGFiZWxzIiwic2VyaWVzRGF0YSIsIm1hcCIsIml0ZW0iLCJwdXNoIiwiJGRlc2NyaXB0b3IiLCJNYXRoIiwicm91bmQiLCJ2YWx1ZSIsImRhdGEiLCJkYXRhc2V0cyIsImxhYmVsIiwiZmlsbENvbG9yIiwiZGVzdHJveSIsImJveCIsImdldE1hcmdpbkJveCIsImRvbU5vZGUiLCJjb250ZW50Tm9kZSIsIndpZHRoIiwidyIsImhlaWdodCIsImgiLCJjdHgiLCJnZXRDb250ZXh0Iiwid2luZG93IiwiQ2hhcnQiLCJCYXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQTs7Ozs7OztBQU9BLE1BQU1BLFVBQVUsdUJBQVEsNkJBQVIsRUFBdUMsc0NBQXZDLEVBQTRELDBDQUEwQztBQUNwSEMsUUFBSSxtQkFEZ0g7QUFFcEhDLGVBQVcsRUFGeUc7QUFHcEhDLFlBQVEsS0FINEc7QUFJcEhDLFdBQU8sSUFKNkc7QUFLcEhDLGNBQVUsU0FMMEc7O0FBT3BIQyxrQkFBYztBQUNaQyx3QkFBa0IsS0FETjtBQUVaQyxxQkFBZSxLQUZIO0FBR1pDLHNCQUFnQjtBQUhKLEtBUHNHOztBQWFwSEMsZUFBVyxTQUFTQSxTQUFULENBQW1CQyxHQUFuQixFQUF3QjtBQUNqQyxhQUFPQSxHQUFQO0FBQ0QsS0FmbUg7O0FBaUJwSEMsa0JBQWM7QUFDWkMsb0JBQWM7QUFDWkMsY0FBTSxhQURNO0FBRVpDLGNBQU07QUFGTSxPQURGO0FBS1pDLGFBQU8sZUFBS0MsU0FBTCxDQUFlTCxZQUFmLENBQTRCSSxLQUx2QjtBQU1aRSxnQkFBVSxlQUFLRCxTQUFMLENBQWVMLFlBQWYsQ0FBNEJNO0FBTjFCLEtBakJzRzs7QUEwQnBIQyxpQkFBYSxTQUFTQSxXQUFULENBQXFCQyxPQUFyQixFQUE4QjtBQUN6QyxXQUFLQyxTQUFMLENBQWVDLFNBQWY7O0FBRUEsV0FBS0Msb0JBQUw7O0FBRUEsVUFBTUMsU0FBUyxFQUFmO0FBQ0EsVUFBTUMsYUFBYSxnQkFBTUMsR0FBTixDQUFVTixPQUFWLEVBQW1CLFVBQUNPLElBQUQsRUFBVTtBQUM5Q0gsZUFBT0ksSUFBUCxDQUFZRCxLQUFLRSxXQUFqQjtBQUNBLGVBQU9DLEtBQUtDLEtBQUwsQ0FBV0osS0FBS0ssS0FBaEIsQ0FBUDtBQUNELE9BSGtCLENBQW5COztBQUtBLFVBQU1DLE9BQU87QUFDWFQsc0JBRFc7QUFFWFUsa0JBQVUsQ0FBQztBQUNUQyxpQkFBTyxTQURFO0FBRVRDLHFCQUFXLEtBQUsvQixRQUZQO0FBR1Q0QixnQkFBTVI7QUFIRyxTQUFEO0FBRkMsT0FBYjs7QUFTQSxVQUFJLEtBQUtyQixLQUFULEVBQWdCO0FBQ2QsYUFBS0EsS0FBTCxDQUFXaUMsT0FBWDtBQUNEOztBQUVELFVBQU1DLE1BQU0sc0JBQU9DLFlBQVAsQ0FBb0IsS0FBS0MsT0FBekIsQ0FBWjtBQUNBLFdBQUtDLFdBQUwsQ0FBaUJDLEtBQWpCLEdBQXlCSixJQUFJSyxDQUE3QjtBQUNBLFdBQUtGLFdBQUwsQ0FBaUJHLE1BQWpCLEdBQTBCTixJQUFJTyxDQUE5Qjs7QUFFQSxVQUFNQyxNQUFNLEtBQUtMLFdBQUwsQ0FBaUJNLFVBQWpCLENBQTRCLElBQTVCLENBQVo7O0FBRUEsV0FBSzNDLEtBQUwsR0FBYSxJQUFJNEMsT0FBT0MsS0FBWCxDQUFpQkgsR0FBakIsRUFBc0JJLEdBQXRCLENBQTBCakIsSUFBMUIsRUFBZ0MsS0FBSzNCLFlBQXJDLENBQWIsQ0E5QnlDLENBOEJ3QjtBQUNsRTtBQXpEbUgsR0FBdEcsQ0FBaEIsQyxDQTVCQTs7Ozs7Ozs7Ozs7Ozs7O29CQXdGZU4sTyIsImZpbGUiOiJHZW5lcmljQmFyLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGFycmF5IGZyb20gJ2Rvam8vX2Jhc2UvYXJyYXknO1xyXG5pbXBvcnQgZG9tR2VvIGZyb20gJ2Rvam8vZG9tLWdlb21ldHJ5JztcclxuaW1wb3J0IFZpZXcgZnJvbSAnYXJnb3MvVmlldyc7XHJcbmltcG9ydCBfQ2hhcnRNaXhpbiBmcm9tICcuL19DaGFydE1peGluJztcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLkNoYXJ0cy5HZW5lcmljQmFyXHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLlZpZXdcclxuICogQG1peGlucyBjcm0uVmlld3MuQ2hhcnRzLl9DaGFydE1peGluXHJcbiAqXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLkNoYXJ0cy5HZW5lcmljQmFyJywgW1ZpZXcsIF9DaGFydE1peGluXSwgLyoqIEBsZW5kcyBjcm0uVmlld3MuQ2hhcnRzLkdlbmVyaWNCYXIjICove1xyXG4gIGlkOiAnY2hhcnRfZ2VuZXJpY19iYXInLFxyXG4gIHRpdGxlVGV4dDogJycsXHJcbiAgZXhwb3NlOiBmYWxzZSxcclxuICBjaGFydDogbnVsbCxcclxuICBiYXJDb2xvcjogJyMxRDVGOEEnLFxyXG5cclxuICBjaGFydE9wdGlvbnM6IHtcclxuICAgIHNjYWxlQmVnaW5BdFplcm86IGZhbHNlLFxyXG4gICAgYmFyU2hvd1N0cm9rZTogZmFsc2UsXHJcbiAgICBsZWdlbmRUZW1wbGF0ZTogJzx1bCBjbGFzcz1cIjwlPW5hbWUudG9Mb3dlckNhc2UoKSU+LWxlZ2VuZFwiPjwlIGZvciAodmFyIGk9MDsgaTxkYXRhc2V0cy5sZW5ndGg7IGkrKyl7JT48bGk+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOjwlPWRhdGFzZXRzW2ldLmZpbGxDb2xvciU+XCI+PC9zcGFuPjwlaWYoZGF0YXNldHNbaV0ubGFiZWwpeyU+PCU9ZGF0YXNldHNbaV0ubGFiZWwlPjwlfSU+PC9saT48JX0lPjwvdWw+JyxcclxuICB9LFxyXG5cclxuICBmb3JtYXR0ZXI6IGZ1bmN0aW9uIGZvcm1hdHRlcih2YWwpIHtcclxuICAgIHJldHVybiB2YWw7XHJcbiAgfSxcclxuXHJcbiAgYXR0cmlidXRlTWFwOiB7XHJcbiAgICBjaGFydENvbnRlbnQ6IHtcclxuICAgICAgbm9kZTogJ2NvbnRlbnROb2RlJyxcclxuICAgICAgdHlwZTogJ2lubmVySFRNTCcsXHJcbiAgICB9LFxyXG4gICAgdGl0bGU6IFZpZXcucHJvdG90eXBlLmF0dHJpYnV0ZU1hcC50aXRsZSxcclxuICAgIHNlbGVjdGVkOiBWaWV3LnByb3RvdHlwZS5hdHRyaWJ1dGVNYXAuc2VsZWN0ZWQsXHJcbiAgfSxcclxuXHJcbiAgY3JlYXRlQ2hhcnQ6IGZ1bmN0aW9uIGNyZWF0ZUNoYXJ0KHJhd0RhdGEpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcblxyXG4gICAgdGhpcy5zaG93U2VhcmNoRXhwcmVzc2lvbigpO1xyXG5cclxuICAgIGNvbnN0IGxhYmVscyA9IFtdO1xyXG4gICAgY29uc3Qgc2VyaWVzRGF0YSA9IGFycmF5Lm1hcChyYXdEYXRhLCAoaXRlbSkgPT4ge1xyXG4gICAgICBsYWJlbHMucHVzaChpdGVtLiRkZXNjcmlwdG9yKTtcclxuICAgICAgcmV0dXJuIE1hdGgucm91bmQoaXRlbS52YWx1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICBsYWJlbHMsXHJcbiAgICAgIGRhdGFzZXRzOiBbe1xyXG4gICAgICAgIGxhYmVsOiAnRGVmYXVsdCcsXHJcbiAgICAgICAgZmlsbENvbG9yOiB0aGlzLmJhckNvbG9yLFxyXG4gICAgICAgIGRhdGE6IHNlcmllc0RhdGEsXHJcbiAgICAgIH1dLFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAodGhpcy5jaGFydCkge1xyXG4gICAgICB0aGlzLmNoYXJ0LmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBib3ggPSBkb21HZW8uZ2V0TWFyZ2luQm94KHRoaXMuZG9tTm9kZSk7XHJcbiAgICB0aGlzLmNvbnRlbnROb2RlLndpZHRoID0gYm94Lnc7XHJcbiAgICB0aGlzLmNvbnRlbnROb2RlLmhlaWdodCA9IGJveC5oO1xyXG5cclxuICAgIGNvbnN0IGN0eCA9IHRoaXMuY29udGVudE5vZGUuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcbiAgICB0aGlzLmNoYXJ0ID0gbmV3IHdpbmRvdy5DaGFydChjdHgpLkJhcihkYXRhLCB0aGlzLmNoYXJ0T3B0aW9ucyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==