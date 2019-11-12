define('crm/Views/Charts/GenericLine', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/array', 'dojo/dom-geometry', 'argos/View', './_ChartMixin'], function (module, exports, _declare, _array, _domGeometry, _View, _ChartMixin2) {
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
   * @class crm.Views.Charts.GenericLine
   *
   * @extends argos.View
   * @mixins crm.Views.Charts._ChartMixin
   *
   */
  var __class = (0, _declare2.default)('crm.Views.Charts.GenericLine', [_View2.default, _ChartMixin3.default], /** @lends crm.Views.Charts.GenericLine# */{
    id: 'chart_generic_line',
    titleText: '',
    expose: false,
    chart: null,
    lineColor: '#1D5F8A',
    pointColor: '#1D5F8A',
    fillColor: 'rgba(8,150,233, 0.2)',

    chartOptions: {
      scaleShowGridLines: false,
      bezierCurve: true,
      bezierCurveTension: 0.4,
      pointDot: true,
      pointDotRadius: 4,
      datasetFill: true,
      legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
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
          strokeColor: this.lineColor,
          pointColor: this.pointColor,
          fillColor: this.fillColor,
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

      this.chart = new window.Chart(ctx).Line(data, this.chartOptions); // eslint-disable-line
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9DaGFydHMvR2VuZXJpY0xpbmUuanMiXSwibmFtZXMiOlsiX19jbGFzcyIsImlkIiwidGl0bGVUZXh0IiwiZXhwb3NlIiwiY2hhcnQiLCJsaW5lQ29sb3IiLCJwb2ludENvbG9yIiwiZmlsbENvbG9yIiwiY2hhcnRPcHRpb25zIiwic2NhbGVTaG93R3JpZExpbmVzIiwiYmV6aWVyQ3VydmUiLCJiZXppZXJDdXJ2ZVRlbnNpb24iLCJwb2ludERvdCIsInBvaW50RG90UmFkaXVzIiwiZGF0YXNldEZpbGwiLCJsZWdlbmRUZW1wbGF0ZSIsImF0dHJpYnV0ZU1hcCIsImNoYXJ0Q29udGVudCIsIm5vZGUiLCJ0eXBlIiwidGl0bGUiLCJwcm90b3R5cGUiLCJzZWxlY3RlZCIsImNyZWF0ZUNoYXJ0IiwicmF3RGF0YSIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsInNob3dTZWFyY2hFeHByZXNzaW9uIiwibGFiZWxzIiwic2VyaWVzRGF0YSIsIm1hcCIsIml0ZW0iLCJwdXNoIiwiJGRlc2NyaXB0b3IiLCJNYXRoIiwicm91bmQiLCJ2YWx1ZSIsImRhdGEiLCJkYXRhc2V0cyIsImxhYmVsIiwic3Ryb2tlQ29sb3IiLCJkZXN0cm95IiwiYm94IiwiZ2V0TWFyZ2luQm94IiwiZG9tTm9kZSIsImNvbnRlbnROb2RlIiwid2lkdGgiLCJ3IiwiaGVpZ2h0IiwiaCIsImN0eCIsImdldENvbnRleHQiLCJ3aW5kb3ciLCJDaGFydCIsIkxpbmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQTs7Ozs7OztBQU9BLE1BQU1BLFVBQVUsdUJBQVEsOEJBQVIsRUFBd0Msc0NBQXhDLEVBQTZELDJDQUEyQztBQUN0SEMsUUFBSSxvQkFEa0g7QUFFdEhDLGVBQVcsRUFGMkc7QUFHdEhDLFlBQVEsS0FIOEc7QUFJdEhDLFdBQU8sSUFKK0c7QUFLdEhDLGVBQVcsU0FMMkc7QUFNdEhDLGdCQUFZLFNBTjBHO0FBT3RIQyxlQUFXLHNCQVAyRzs7QUFTdEhDLGtCQUFjO0FBQ1pDLDBCQUFvQixLQURSO0FBRVpDLG1CQUFhLElBRkQ7QUFHWkMsMEJBQW9CLEdBSFI7QUFJWkMsZ0JBQVUsSUFKRTtBQUtaQyxzQkFBZ0IsQ0FMSjtBQU1aQyxtQkFBYSxJQU5EO0FBT1pDLHNCQUFnQjtBQVBKLEtBVHdHOztBQW1CdEhDLGtCQUFjO0FBQ1pDLG9CQUFjO0FBQ1pDLGNBQU0sYUFETTtBQUVaQyxjQUFNO0FBRk0sT0FERjtBQUtaQyxhQUFPLGVBQUtDLFNBQUwsQ0FBZUwsWUFBZixDQUE0QkksS0FMdkI7QUFNWkUsZ0JBQVUsZUFBS0QsU0FBTCxDQUFlTCxZQUFmLENBQTRCTTtBQU4xQixLQW5Cd0c7O0FBNEJ0SEMsaUJBQWEsU0FBU0EsV0FBVCxDQUFxQkMsT0FBckIsRUFBOEI7QUFDekMsV0FBS0MsU0FBTCxDQUFlQyxTQUFmOztBQUVBLFdBQUtDLG9CQUFMOztBQUVBLFVBQU1DLFNBQVMsRUFBZjtBQUNBLFVBQU1DLGFBQWEsZ0JBQU1DLEdBQU4sQ0FBVU4sT0FBVixFQUFtQixVQUFDTyxJQUFELEVBQVU7QUFDOUNILGVBQU9JLElBQVAsQ0FBWUQsS0FBS0UsV0FBakI7QUFDQSxlQUFPQyxLQUFLQyxLQUFMLENBQVdKLEtBQUtLLEtBQWhCLENBQVA7QUFDRCxPQUhrQixDQUFuQjs7QUFLQSxVQUFNQyxPQUFPO0FBQ1hULHNCQURXO0FBRVhVLGtCQUFVLENBQUM7QUFDVEMsaUJBQU8sU0FERTtBQUVUQyx1QkFBYSxLQUFLbkMsU0FGVDtBQUdUQyxzQkFBWSxLQUFLQSxVQUhSO0FBSVRDLHFCQUFXLEtBQUtBLFNBSlA7QUFLVDhCLGdCQUFNUjtBQUxHLFNBQUQ7QUFGQyxPQUFiOztBQVdBLFVBQUksS0FBS3pCLEtBQVQsRUFBZ0I7QUFDZCxhQUFLQSxLQUFMLENBQVdxQyxPQUFYO0FBQ0Q7O0FBRUQsVUFBTUMsTUFBTSxzQkFBT0MsWUFBUCxDQUFvQixLQUFLQyxPQUF6QixDQUFaO0FBQ0EsV0FBS0MsV0FBTCxDQUFpQkMsS0FBakIsR0FBeUJKLElBQUlLLENBQTdCO0FBQ0EsV0FBS0YsV0FBTCxDQUFpQkcsTUFBakIsR0FBMEJOLElBQUlPLENBQTlCOztBQUVBLFVBQU1DLE1BQU0sS0FBS0wsV0FBTCxDQUFpQk0sVUFBakIsQ0FBNEIsSUFBNUIsQ0FBWjs7QUFFQSxXQUFLL0MsS0FBTCxHQUFhLElBQUlnRCxPQUFPQyxLQUFYLENBQWlCSCxHQUFqQixFQUFzQkksSUFBdEIsQ0FBMkJqQixJQUEzQixFQUFpQyxLQUFLN0IsWUFBdEMsQ0FBYixDQWhDeUMsQ0FnQ3lCO0FBQ25FO0FBN0RxSCxHQUF4RyxDQUFoQixDLENBNUJBOzs7Ozs7Ozs7Ozs7Ozs7b0JBNEZlUixPIiwiZmlsZSI6IkdlbmVyaWNMaW5lLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGFycmF5IGZyb20gJ2Rvam8vX2Jhc2UvYXJyYXknO1xyXG5pbXBvcnQgZG9tR2VvIGZyb20gJ2Rvam8vZG9tLWdlb21ldHJ5JztcclxuaW1wb3J0IFZpZXcgZnJvbSAnYXJnb3MvVmlldyc7XHJcbmltcG9ydCBfQ2hhcnRNaXhpbiBmcm9tICcuL19DaGFydE1peGluJztcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLkNoYXJ0cy5HZW5lcmljTGluZVxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5WaWV3XHJcbiAqIEBtaXhpbnMgY3JtLlZpZXdzLkNoYXJ0cy5fQ2hhcnRNaXhpblxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5DaGFydHMuR2VuZXJpY0xpbmUnLCBbVmlldywgX0NoYXJ0TWl4aW5dLCAvKiogQGxlbmRzIGNybS5WaWV3cy5DaGFydHMuR2VuZXJpY0xpbmUjICove1xyXG4gIGlkOiAnY2hhcnRfZ2VuZXJpY19saW5lJyxcclxuICB0aXRsZVRleHQ6ICcnLFxyXG4gIGV4cG9zZTogZmFsc2UsXHJcbiAgY2hhcnQ6IG51bGwsXHJcbiAgbGluZUNvbG9yOiAnIzFENUY4QScsXHJcbiAgcG9pbnRDb2xvcjogJyMxRDVGOEEnLFxyXG4gIGZpbGxDb2xvcjogJ3JnYmEoOCwxNTAsMjMzLCAwLjIpJyxcclxuXHJcbiAgY2hhcnRPcHRpb25zOiB7XHJcbiAgICBzY2FsZVNob3dHcmlkTGluZXM6IGZhbHNlLFxyXG4gICAgYmV6aWVyQ3VydmU6IHRydWUsXHJcbiAgICBiZXppZXJDdXJ2ZVRlbnNpb246IDAuNCxcclxuICAgIHBvaW50RG90OiB0cnVlLFxyXG4gICAgcG9pbnREb3RSYWRpdXM6IDQsXHJcbiAgICBkYXRhc2V0RmlsbDogdHJ1ZSxcclxuICAgIGxlZ2VuZFRlbXBsYXRlOiAnPHVsIGNsYXNzPVwiPCU9bmFtZS50b0xvd2VyQ2FzZSgpJT4tbGVnZW5kXCI+PCUgZm9yICh2YXIgaT0wOyBpPGRhdGFzZXRzLmxlbmd0aDsgaSsrKXslPjxsaT48c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6PCU9ZGF0YXNldHNbaV0uc3Ryb2tlQ29sb3IlPlwiPjwvc3Bhbj48JWlmKGRhdGFzZXRzW2ldLmxhYmVsKXslPjwlPWRhdGFzZXRzW2ldLmxhYmVsJT48JX0lPjwvbGk+PCV9JT48L3VsPicsXHJcbiAgfSxcclxuXHJcbiAgYXR0cmlidXRlTWFwOiB7XHJcbiAgICBjaGFydENvbnRlbnQ6IHtcclxuICAgICAgbm9kZTogJ2NvbnRlbnROb2RlJyxcclxuICAgICAgdHlwZTogJ2lubmVySFRNTCcsXHJcbiAgICB9LFxyXG4gICAgdGl0bGU6IFZpZXcucHJvdG90eXBlLmF0dHJpYnV0ZU1hcC50aXRsZSxcclxuICAgIHNlbGVjdGVkOiBWaWV3LnByb3RvdHlwZS5hdHRyaWJ1dGVNYXAuc2VsZWN0ZWQsXHJcbiAgfSxcclxuXHJcbiAgY3JlYXRlQ2hhcnQ6IGZ1bmN0aW9uIGNyZWF0ZUNoYXJ0KHJhd0RhdGEpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcblxyXG4gICAgdGhpcy5zaG93U2VhcmNoRXhwcmVzc2lvbigpO1xyXG5cclxuICAgIGNvbnN0IGxhYmVscyA9IFtdO1xyXG4gICAgY29uc3Qgc2VyaWVzRGF0YSA9IGFycmF5Lm1hcChyYXdEYXRhLCAoaXRlbSkgPT4ge1xyXG4gICAgICBsYWJlbHMucHVzaChpdGVtLiRkZXNjcmlwdG9yKTtcclxuICAgICAgcmV0dXJuIE1hdGgucm91bmQoaXRlbS52YWx1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICBsYWJlbHMsXHJcbiAgICAgIGRhdGFzZXRzOiBbe1xyXG4gICAgICAgIGxhYmVsOiAnRGVmYXVsdCcsXHJcbiAgICAgICAgc3Ryb2tlQ29sb3I6IHRoaXMubGluZUNvbG9yLFxyXG4gICAgICAgIHBvaW50Q29sb3I6IHRoaXMucG9pbnRDb2xvcixcclxuICAgICAgICBmaWxsQ29sb3I6IHRoaXMuZmlsbENvbG9yLFxyXG4gICAgICAgIGRhdGE6IHNlcmllc0RhdGEsXHJcbiAgICAgIH1dLFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAodGhpcy5jaGFydCkge1xyXG4gICAgICB0aGlzLmNoYXJ0LmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBib3ggPSBkb21HZW8uZ2V0TWFyZ2luQm94KHRoaXMuZG9tTm9kZSk7XHJcbiAgICB0aGlzLmNvbnRlbnROb2RlLndpZHRoID0gYm94Lnc7XHJcbiAgICB0aGlzLmNvbnRlbnROb2RlLmhlaWdodCA9IGJveC5oO1xyXG5cclxuICAgIGNvbnN0IGN0eCA9IHRoaXMuY29udGVudE5vZGUuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcbiAgICB0aGlzLmNoYXJ0ID0gbmV3IHdpbmRvdy5DaGFydChjdHgpLkxpbmUoZGF0YSwgdGhpcy5jaGFydE9wdGlvbnMpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=