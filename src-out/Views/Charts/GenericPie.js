define('crm/Views/Charts/GenericPie', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/array', 'dojo/dom-geometry', 'argos/View', './_ChartMixin'], function (module, exports, _declare, _array, _domGeometry, _View, _ChartMixin2) {
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
   * @class crm.Views.Charts.GenericPie
   *
   * @extends argos.View
   * @mixins crm.Views.Charts._ChartMixin
   *
   */
  var __class = (0, _declare2.default)('crm.Views.Charts.GenericPie', [_View2.default, _ChartMixin3.default], /** @lends crm.Views.Charts.GenericPie# */{
    id: 'chart_generic_pie',
    titleText: '',
    expose: false,
    chart: null,

    seriesColors: ['#1D5F8A', '#8ED1C6', '#9279A6', '#5C5C5C', '#F2BC41', '#66A140', '#AD4242', '#8DC9E6', '#EFA836', '#317C73', '#EB9D9D', '#999999', '#488421', '#C7B4DB', '#54A1D3', '#6e5282', '#AFDC91', '#69ADA3', '#DB7726', '#D8D8D8'],

    chartOptions: {
      segmentShowStroke: true,
      segmentStrokeColor: '#EBEBEB',
      segmentStrokeWidth: 1,
      animateScale: false,
      legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li data-segment="<%= i %>"><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
    },

    /**
     * @property {String}
     * The type of chart that should be rendered. Can either be Pie or Doughnut. A bad or unknown value will result in a default of Doughnut.
     */
    renderAs: 'Doughnut',

    formatter: function formatter(val) {
      return val;
    },

    createChart: function createChart(rawData) {
      var _this = this;

      this.inherited(arguments);

      var defaultRenderAs = 'Doughnut';

      this.showSearchExpression();

      var data = _array2.default.map(rawData, function (item, idx) {
        return {
          value: Math.round(item.value),
          color: _this._getItemColor(idx),
          highlight: '',
          label: item.name
        };
      });

      if (this.chart) {
        this.chart.destroy();
      }

      var box = _domGeometry2.default.getMarginBox(this.domNode);
      this.contentNode.width = box.w;
      this.contentNode.height = box.h;

      var ctx = this.contentNode.getContext('2d');

      var chart = new window.Chart(ctx);

      // Ensure the chart has the ability to render this type
      this.renderAs = window.Chart.types.hasOwnProperty(this.renderAs) ? this.renderAs : defaultRenderAs;

      this.chart = chart[this.renderAs](data, this.chartOptions);
      this.showLegend();
    },
    _getItemColor: function _getItemColor(index) {
      var len = this.seriesColors.length;
      var n = Math.floor(index / len);
      var theIndex = index;

      // if n is 0, the index will fall within the seriesColor array,
      // otherwise we will need to re-scale the index to fall within that array.
      if (n > 0) {
        theIndex = index - len * n;
      }

      return this.seriesColors[theIndex];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9DaGFydHMvR2VuZXJpY1BpZS5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiaWQiLCJ0aXRsZVRleHQiLCJleHBvc2UiLCJjaGFydCIsInNlcmllc0NvbG9ycyIsImNoYXJ0T3B0aW9ucyIsInNlZ21lbnRTaG93U3Ryb2tlIiwic2VnbWVudFN0cm9rZUNvbG9yIiwic2VnbWVudFN0cm9rZVdpZHRoIiwiYW5pbWF0ZVNjYWxlIiwibGVnZW5kVGVtcGxhdGUiLCJyZW5kZXJBcyIsImZvcm1hdHRlciIsInZhbCIsImNyZWF0ZUNoYXJ0IiwicmF3RGF0YSIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImRlZmF1bHRSZW5kZXJBcyIsInNob3dTZWFyY2hFeHByZXNzaW9uIiwiZGF0YSIsIm1hcCIsIml0ZW0iLCJpZHgiLCJ2YWx1ZSIsIk1hdGgiLCJyb3VuZCIsImNvbG9yIiwiX2dldEl0ZW1Db2xvciIsImhpZ2hsaWdodCIsImxhYmVsIiwibmFtZSIsImRlc3Ryb3kiLCJib3giLCJnZXRNYXJnaW5Cb3giLCJkb21Ob2RlIiwiY29udGVudE5vZGUiLCJ3aWR0aCIsInciLCJoZWlnaHQiLCJoIiwiY3R4IiwiZ2V0Q29udGV4dCIsIndpbmRvdyIsIkNoYXJ0IiwidHlwZXMiLCJoYXNPd25Qcm9wZXJ0eSIsInNob3dMZWdlbmQiLCJpbmRleCIsImxlbiIsImxlbmd0aCIsIm4iLCJmbG9vciIsInRoZUluZGV4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkE7Ozs7Ozs7QUFPQSxNQUFNQSxVQUFVLHVCQUFRLDZCQUFSLEVBQXVDLHNDQUF2QyxFQUE0RCwwQ0FBMEM7QUFDcEhDLFFBQUksbUJBRGdIO0FBRXBIQyxlQUFXLEVBRnlHO0FBR3BIQyxZQUFRLEtBSDRHO0FBSXBIQyxXQUFPLElBSjZHOztBQU1wSEMsa0JBQWMsQ0FBQyxTQUFELEVBQVksU0FBWixFQUF1QixTQUF2QixFQUFrQyxTQUFsQyxFQUE2QyxTQUE3QyxFQUF3RCxTQUF4RCxFQUFtRSxTQUFuRSxFQUNaLFNBRFksRUFDRCxTQURDLEVBQ1UsU0FEVixFQUNxQixTQURyQixFQUNnQyxTQURoQyxFQUMyQyxTQUQzQyxFQUNzRCxTQUR0RCxFQUVaLFNBRlksRUFFRCxTQUZDLEVBRVUsU0FGVixFQUVxQixTQUZyQixFQUVnQyxTQUZoQyxFQUUyQyxTQUYzQyxDQU5zRzs7QUFXcEhDLGtCQUFjO0FBQ1pDLHlCQUFtQixJQURQO0FBRVpDLDBCQUFvQixTQUZSO0FBR1pDLDBCQUFvQixDQUhSO0FBSVpDLG9CQUFjLEtBSkY7QUFLWkMsc0JBQWdCO0FBTEosS0FYc0c7O0FBbUJwSDs7OztBQUlBQyxjQUFVLFVBdkIwRzs7QUF5QnBIQyxlQUFXLFNBQVNBLFNBQVQsQ0FBbUJDLEdBQW5CLEVBQXdCO0FBQ2pDLGFBQU9BLEdBQVA7QUFDRCxLQTNCbUg7O0FBNkJwSEMsaUJBQWEsU0FBU0EsV0FBVCxDQUFxQkMsT0FBckIsRUFBOEI7QUFBQTs7QUFDekMsV0FBS0MsU0FBTCxDQUFlQyxTQUFmOztBQUVBLFVBQU1DLGtCQUFrQixVQUF4Qjs7QUFFQSxXQUFLQyxvQkFBTDs7QUFFQSxVQUFNQyxPQUFPLGdCQUFNQyxHQUFOLENBQVVOLE9BQVYsRUFBbUIsVUFBQ08sSUFBRCxFQUFPQyxHQUFQLEVBQWU7QUFDN0MsZUFBTztBQUNMQyxpQkFBT0MsS0FBS0MsS0FBTCxDQUFXSixLQUFLRSxLQUFoQixDQURGO0FBRUxHLGlCQUFPLE1BQUtDLGFBQUwsQ0FBbUJMLEdBQW5CLENBRkY7QUFHTE0scUJBQVcsRUFITjtBQUlMQyxpQkFBT1IsS0FBS1M7QUFKUCxTQUFQO0FBTUQsT0FQWSxDQUFiOztBQVNBLFVBQUksS0FBSzVCLEtBQVQsRUFBZ0I7QUFDZCxhQUFLQSxLQUFMLENBQVc2QixPQUFYO0FBQ0Q7O0FBRUQsVUFBTUMsTUFBTSxzQkFBT0MsWUFBUCxDQUFvQixLQUFLQyxPQUF6QixDQUFaO0FBQ0EsV0FBS0MsV0FBTCxDQUFpQkMsS0FBakIsR0FBeUJKLElBQUlLLENBQTdCO0FBQ0EsV0FBS0YsV0FBTCxDQUFpQkcsTUFBakIsR0FBMEJOLElBQUlPLENBQTlCOztBQUVBLFVBQU1DLE1BQU0sS0FBS0wsV0FBTCxDQUFpQk0sVUFBakIsQ0FBNEIsSUFBNUIsQ0FBWjs7QUFFQSxVQUFNdkMsUUFBUSxJQUFJd0MsT0FBT0MsS0FBWCxDQUFpQkgsR0FBakIsQ0FBZDs7QUFFQTtBQUNBLFdBQUs5QixRQUFMLEdBQWdCZ0MsT0FBT0MsS0FBUCxDQUFhQyxLQUFiLENBQW1CQyxjQUFuQixDQUFrQyxLQUFLbkMsUUFBdkMsSUFBbUQsS0FBS0EsUUFBeEQsR0FBbUVPLGVBQW5GOztBQUVBLFdBQUtmLEtBQUwsR0FBYUEsTUFBTSxLQUFLUSxRQUFYLEVBQXFCUyxJQUFyQixFQUEyQixLQUFLZixZQUFoQyxDQUFiO0FBQ0EsV0FBSzBDLFVBQUw7QUFDRCxLQTlEbUg7QUErRHBIbkIsbUJBQWUsU0FBU0EsYUFBVCxDQUF1Qm9CLEtBQXZCLEVBQThCO0FBQzNDLFVBQU1DLE1BQU0sS0FBSzdDLFlBQUwsQ0FBa0I4QyxNQUE5QjtBQUNBLFVBQU1DLElBQUkxQixLQUFLMkIsS0FBTCxDQUFXSixRQUFRQyxHQUFuQixDQUFWO0FBQ0EsVUFBSUksV0FBV0wsS0FBZjs7QUFFQTtBQUNBO0FBQ0EsVUFBSUcsSUFBSSxDQUFSLEVBQVc7QUFDVEUsbUJBQVdMLFFBQVNDLE1BQU1FLENBQTFCO0FBQ0Q7O0FBRUQsYUFBTyxLQUFLL0MsWUFBTCxDQUFrQmlELFFBQWxCLENBQVA7QUFDRDtBQTNFbUgsR0FBdEcsQ0FBaEIsQyxDQTVCQTs7Ozs7Ozs7Ozs7Ozs7O29CQTBHZXRELE8iLCJmaWxlIjoiR2VuZXJpY1BpZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBhcnJheSBmcm9tICdkb2pvL19iYXNlL2FycmF5JztcclxuaW1wb3J0IGRvbUdlbyBmcm9tICdkb2pvL2RvbS1nZW9tZXRyeSc7XHJcbmltcG9ydCBWaWV3IGZyb20gJ2FyZ29zL1ZpZXcnO1xyXG5pbXBvcnQgX0NoYXJ0TWl4aW4gZnJvbSAnLi9fQ2hhcnRNaXhpbic7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5DaGFydHMuR2VuZXJpY1BpZVxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5WaWV3XHJcbiAqIEBtaXhpbnMgY3JtLlZpZXdzLkNoYXJ0cy5fQ2hhcnRNaXhpblxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5DaGFydHMuR2VuZXJpY1BpZScsIFtWaWV3LCBfQ2hhcnRNaXhpbl0sIC8qKiBAbGVuZHMgY3JtLlZpZXdzLkNoYXJ0cy5HZW5lcmljUGllIyAqL3tcclxuICBpZDogJ2NoYXJ0X2dlbmVyaWNfcGllJyxcclxuICB0aXRsZVRleHQ6ICcnLFxyXG4gIGV4cG9zZTogZmFsc2UsXHJcbiAgY2hhcnQ6IG51bGwsXHJcblxyXG4gIHNlcmllc0NvbG9yczogWycjMUQ1RjhBJywgJyM4RUQxQzYnLCAnIzkyNzlBNicsICcjNUM1QzVDJywgJyNGMkJDNDEnLCAnIzY2QTE0MCcsICcjQUQ0MjQyJyxcclxuICAgICcjOERDOUU2JywgJyNFRkE4MzYnLCAnIzMxN0M3MycsICcjRUI5RDlEJywgJyM5OTk5OTknLCAnIzQ4ODQyMScsICcjQzdCNERCJyxcclxuICAgICcjNTRBMUQzJywgJyM2ZTUyODInLCAnI0FGREM5MScsICcjNjlBREEzJywgJyNEQjc3MjYnLCAnI0Q4RDhEOCcsXHJcbiAgXSxcclxuXHJcbiAgY2hhcnRPcHRpb25zOiB7XHJcbiAgICBzZWdtZW50U2hvd1N0cm9rZTogdHJ1ZSxcclxuICAgIHNlZ21lbnRTdHJva2VDb2xvcjogJyNFQkVCRUInLFxyXG4gICAgc2VnbWVudFN0cm9rZVdpZHRoOiAxLFxyXG4gICAgYW5pbWF0ZVNjYWxlOiBmYWxzZSxcclxuICAgIGxlZ2VuZFRlbXBsYXRlOiAnPHVsIGNsYXNzPVwiPCU9bmFtZS50b0xvd2VyQ2FzZSgpJT4tbGVnZW5kXCI+PCUgZm9yICh2YXIgaT0wOyBpPHNlZ21lbnRzLmxlbmd0aDsgaSsrKXslPjxsaSBkYXRhLXNlZ21lbnQ9XCI8JT0gaSAlPlwiPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjo8JT1zZWdtZW50c1tpXS5maWxsQ29sb3IlPlwiPjwvc3Bhbj48JWlmKHNlZ21lbnRzW2ldLmxhYmVsKXslPjwlPXNlZ21lbnRzW2ldLmxhYmVsJT48JX0lPjwvbGk+PCV9JT48L3VsPicsXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9XHJcbiAgICogVGhlIHR5cGUgb2YgY2hhcnQgdGhhdCBzaG91bGQgYmUgcmVuZGVyZWQuIENhbiBlaXRoZXIgYmUgUGllIG9yIERvdWdobnV0LiBBIGJhZCBvciB1bmtub3duIHZhbHVlIHdpbGwgcmVzdWx0IGluIGEgZGVmYXVsdCBvZiBEb3VnaG51dC5cclxuICAgKi9cclxuICByZW5kZXJBczogJ0RvdWdobnV0JyxcclxuXHJcbiAgZm9ybWF0dGVyOiBmdW5jdGlvbiBmb3JtYXR0ZXIodmFsKSB7XHJcbiAgICByZXR1cm4gdmFsO1xyXG4gIH0sXHJcblxyXG4gIGNyZWF0ZUNoYXJ0OiBmdW5jdGlvbiBjcmVhdGVDaGFydChyYXdEYXRhKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG5cclxuICAgIGNvbnN0IGRlZmF1bHRSZW5kZXJBcyA9ICdEb3VnaG51dCc7XHJcblxyXG4gICAgdGhpcy5zaG93U2VhcmNoRXhwcmVzc2lvbigpO1xyXG5cclxuICAgIGNvbnN0IGRhdGEgPSBhcnJheS5tYXAocmF3RGF0YSwgKGl0ZW0sIGlkeCkgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHZhbHVlOiBNYXRoLnJvdW5kKGl0ZW0udmFsdWUpLFxyXG4gICAgICAgIGNvbG9yOiB0aGlzLl9nZXRJdGVtQ29sb3IoaWR4KSxcclxuICAgICAgICBoaWdobGlnaHQ6ICcnLFxyXG4gICAgICAgIGxhYmVsOiBpdGVtLm5hbWUsXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAodGhpcy5jaGFydCkge1xyXG4gICAgICB0aGlzLmNoYXJ0LmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBib3ggPSBkb21HZW8uZ2V0TWFyZ2luQm94KHRoaXMuZG9tTm9kZSk7XHJcbiAgICB0aGlzLmNvbnRlbnROb2RlLndpZHRoID0gYm94Lnc7XHJcbiAgICB0aGlzLmNvbnRlbnROb2RlLmhlaWdodCA9IGJveC5oO1xyXG5cclxuICAgIGNvbnN0IGN0eCA9IHRoaXMuY29udGVudE5vZGUuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcbiAgICBjb25zdCBjaGFydCA9IG5ldyB3aW5kb3cuQ2hhcnQoY3R4KTtcclxuXHJcbiAgICAvLyBFbnN1cmUgdGhlIGNoYXJ0IGhhcyB0aGUgYWJpbGl0eSB0byByZW5kZXIgdGhpcyB0eXBlXHJcbiAgICB0aGlzLnJlbmRlckFzID0gd2luZG93LkNoYXJ0LnR5cGVzLmhhc093blByb3BlcnR5KHRoaXMucmVuZGVyQXMpID8gdGhpcy5yZW5kZXJBcyA6IGRlZmF1bHRSZW5kZXJBcztcclxuXHJcbiAgICB0aGlzLmNoYXJ0ID0gY2hhcnRbdGhpcy5yZW5kZXJBc10oZGF0YSwgdGhpcy5jaGFydE9wdGlvbnMpO1xyXG4gICAgdGhpcy5zaG93TGVnZW5kKCk7XHJcbiAgfSxcclxuICBfZ2V0SXRlbUNvbG9yOiBmdW5jdGlvbiBfZ2V0SXRlbUNvbG9yKGluZGV4KSB7XHJcbiAgICBjb25zdCBsZW4gPSB0aGlzLnNlcmllc0NvbG9ycy5sZW5ndGg7XHJcbiAgICBjb25zdCBuID0gTWF0aC5mbG9vcihpbmRleCAvIGxlbik7XHJcbiAgICBsZXQgdGhlSW5kZXggPSBpbmRleDtcclxuXHJcbiAgICAvLyBpZiBuIGlzIDAsIHRoZSBpbmRleCB3aWxsIGZhbGwgd2l0aGluIHRoZSBzZXJpZXNDb2xvciBhcnJheSxcclxuICAgIC8vIG90aGVyd2lzZSB3ZSB3aWxsIG5lZWQgdG8gcmUtc2NhbGUgdGhlIGluZGV4IHRvIGZhbGwgd2l0aGluIHRoYXQgYXJyYXkuXHJcbiAgICBpZiAobiA+IDApIHtcclxuICAgICAgdGhlSW5kZXggPSBpbmRleCAtIChsZW4gKiBuKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5zZXJpZXNDb2xvcnNbdGhlSW5kZXhdO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19