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

      this.inherited(createChart, arguments);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9DaGFydHMvR2VuZXJpY1BpZS5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiaWQiLCJ0aXRsZVRleHQiLCJleHBvc2UiLCJjaGFydCIsInNlcmllc0NvbG9ycyIsImNoYXJ0T3B0aW9ucyIsInNlZ21lbnRTaG93U3Ryb2tlIiwic2VnbWVudFN0cm9rZUNvbG9yIiwic2VnbWVudFN0cm9rZVdpZHRoIiwiYW5pbWF0ZVNjYWxlIiwibGVnZW5kVGVtcGxhdGUiLCJyZW5kZXJBcyIsImZvcm1hdHRlciIsInZhbCIsImNyZWF0ZUNoYXJ0IiwicmF3RGF0YSIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImRlZmF1bHRSZW5kZXJBcyIsInNob3dTZWFyY2hFeHByZXNzaW9uIiwiZGF0YSIsIm1hcCIsIml0ZW0iLCJpZHgiLCJ2YWx1ZSIsIk1hdGgiLCJyb3VuZCIsImNvbG9yIiwiX2dldEl0ZW1Db2xvciIsImhpZ2hsaWdodCIsImxhYmVsIiwibmFtZSIsImRlc3Ryb3kiLCJib3giLCJnZXRNYXJnaW5Cb3giLCJkb21Ob2RlIiwiY29udGVudE5vZGUiLCJ3aWR0aCIsInciLCJoZWlnaHQiLCJoIiwiY3R4IiwiZ2V0Q29udGV4dCIsIndpbmRvdyIsIkNoYXJ0IiwidHlwZXMiLCJoYXNPd25Qcm9wZXJ0eSIsInNob3dMZWdlbmQiLCJpbmRleCIsImxlbiIsImxlbmd0aCIsIm4iLCJmbG9vciIsInRoZUluZGV4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkE7Ozs7Ozs7QUFPQSxNQUFNQSxVQUFVLHVCQUFRLDZCQUFSLEVBQXVDLHNDQUF2QyxFQUE0RCwwQ0FBMEM7QUFDcEhDLFFBQUksbUJBRGdIO0FBRXBIQyxlQUFXLEVBRnlHO0FBR3BIQyxZQUFRLEtBSDRHO0FBSXBIQyxXQUFPLElBSjZHOztBQU1wSEMsa0JBQWMsQ0FBQyxTQUFELEVBQVksU0FBWixFQUF1QixTQUF2QixFQUFrQyxTQUFsQyxFQUE2QyxTQUE3QyxFQUF3RCxTQUF4RCxFQUFtRSxTQUFuRSxFQUNaLFNBRFksRUFDRCxTQURDLEVBQ1UsU0FEVixFQUNxQixTQURyQixFQUNnQyxTQURoQyxFQUMyQyxTQUQzQyxFQUNzRCxTQUR0RCxFQUVaLFNBRlksRUFFRCxTQUZDLEVBRVUsU0FGVixFQUVxQixTQUZyQixFQUVnQyxTQUZoQyxFQUUyQyxTQUYzQyxDQU5zRzs7QUFXcEhDLGtCQUFjO0FBQ1pDLHlCQUFtQixJQURQO0FBRVpDLDBCQUFvQixTQUZSO0FBR1pDLDBCQUFvQixDQUhSO0FBSVpDLG9CQUFjLEtBSkY7QUFLWkMsc0JBQWdCO0FBTEosS0FYc0c7O0FBbUJwSDs7OztBQUlBQyxjQUFVLFVBdkIwRzs7QUF5QnBIQyxlQUFXLFNBQVNBLFNBQVQsQ0FBbUJDLEdBQW5CLEVBQXdCO0FBQ2pDLGFBQU9BLEdBQVA7QUFDRCxLQTNCbUg7O0FBNkJwSEMsaUJBQWEsU0FBU0EsV0FBVCxDQUFxQkMsT0FBckIsRUFBOEI7QUFBQTs7QUFDekMsV0FBS0MsU0FBTCxDQUFlRixXQUFmLEVBQTRCRyxTQUE1Qjs7QUFFQSxVQUFNQyxrQkFBa0IsVUFBeEI7O0FBRUEsV0FBS0Msb0JBQUw7O0FBRUEsVUFBTUMsT0FBTyxnQkFBTUMsR0FBTixDQUFVTixPQUFWLEVBQW1CLFVBQUNPLElBQUQsRUFBT0MsR0FBUCxFQUFlO0FBQzdDLGVBQU87QUFDTEMsaUJBQU9DLEtBQUtDLEtBQUwsQ0FBV0osS0FBS0UsS0FBaEIsQ0FERjtBQUVMRyxpQkFBTyxNQUFLQyxhQUFMLENBQW1CTCxHQUFuQixDQUZGO0FBR0xNLHFCQUFXLEVBSE47QUFJTEMsaUJBQU9SLEtBQUtTO0FBSlAsU0FBUDtBQU1ELE9BUFksQ0FBYjs7QUFTQSxVQUFJLEtBQUs1QixLQUFULEVBQWdCO0FBQ2QsYUFBS0EsS0FBTCxDQUFXNkIsT0FBWDtBQUNEOztBQUVELFVBQU1DLE1BQU0sc0JBQU9DLFlBQVAsQ0FBb0IsS0FBS0MsT0FBekIsQ0FBWjtBQUNBLFdBQUtDLFdBQUwsQ0FBaUJDLEtBQWpCLEdBQXlCSixJQUFJSyxDQUE3QjtBQUNBLFdBQUtGLFdBQUwsQ0FBaUJHLE1BQWpCLEdBQTBCTixJQUFJTyxDQUE5Qjs7QUFFQSxVQUFNQyxNQUFNLEtBQUtMLFdBQUwsQ0FBaUJNLFVBQWpCLENBQTRCLElBQTVCLENBQVo7O0FBRUEsVUFBTXZDLFFBQVEsSUFBSXdDLE9BQU9DLEtBQVgsQ0FBaUJILEdBQWpCLENBQWQ7O0FBRUE7QUFDQSxXQUFLOUIsUUFBTCxHQUFnQmdDLE9BQU9DLEtBQVAsQ0FBYUMsS0FBYixDQUFtQkMsY0FBbkIsQ0FBa0MsS0FBS25DLFFBQXZDLElBQW1ELEtBQUtBLFFBQXhELEdBQW1FTyxlQUFuRjs7QUFFQSxXQUFLZixLQUFMLEdBQWFBLE1BQU0sS0FBS1EsUUFBWCxFQUFxQlMsSUFBckIsRUFBMkIsS0FBS2YsWUFBaEMsQ0FBYjtBQUNBLFdBQUswQyxVQUFMO0FBQ0QsS0E5RG1IO0FBK0RwSG5CLG1CQUFlLFNBQVNBLGFBQVQsQ0FBdUJvQixLQUF2QixFQUE4QjtBQUMzQyxVQUFNQyxNQUFNLEtBQUs3QyxZQUFMLENBQWtCOEMsTUFBOUI7QUFDQSxVQUFNQyxJQUFJMUIsS0FBSzJCLEtBQUwsQ0FBV0osUUFBUUMsR0FBbkIsQ0FBVjtBQUNBLFVBQUlJLFdBQVdMLEtBQWY7O0FBRUE7QUFDQTtBQUNBLFVBQUlHLElBQUksQ0FBUixFQUFXO0FBQ1RFLG1CQUFXTCxRQUFTQyxNQUFNRSxDQUExQjtBQUNEOztBQUVELGFBQU8sS0FBSy9DLFlBQUwsQ0FBa0JpRCxRQUFsQixDQUFQO0FBQ0Q7QUEzRW1ILEdBQXRHLENBQWhCLEMsQ0E1QkE7Ozs7Ozs7Ozs7Ozs7OztvQkEwR2V0RCxPIiwiZmlsZSI6IkdlbmVyaWNQaWUuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgYXJyYXkgZnJvbSAnZG9qby9fYmFzZS9hcnJheSc7XHJcbmltcG9ydCBkb21HZW8gZnJvbSAnZG9qby9kb20tZ2VvbWV0cnknO1xyXG5pbXBvcnQgVmlldyBmcm9tICdhcmdvcy9WaWV3JztcclxuaW1wb3J0IF9DaGFydE1peGluIGZyb20gJy4vX0NoYXJ0TWl4aW4nO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuQ2hhcnRzLkdlbmVyaWNQaWVcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuVmlld1xyXG4gKiBAbWl4aW5zIGNybS5WaWV3cy5DaGFydHMuX0NoYXJ0TWl4aW5cclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuQ2hhcnRzLkdlbmVyaWNQaWUnLCBbVmlldywgX0NoYXJ0TWl4aW5dLCAvKiogQGxlbmRzIGNybS5WaWV3cy5DaGFydHMuR2VuZXJpY1BpZSMgKi97XHJcbiAgaWQ6ICdjaGFydF9nZW5lcmljX3BpZScsXHJcbiAgdGl0bGVUZXh0OiAnJyxcclxuICBleHBvc2U6IGZhbHNlLFxyXG4gIGNoYXJ0OiBudWxsLFxyXG5cclxuICBzZXJpZXNDb2xvcnM6IFsnIzFENUY4QScsICcjOEVEMUM2JywgJyM5Mjc5QTYnLCAnIzVDNUM1QycsICcjRjJCQzQxJywgJyM2NkExNDAnLCAnI0FENDI0MicsXHJcbiAgICAnIzhEQzlFNicsICcjRUZBODM2JywgJyMzMTdDNzMnLCAnI0VCOUQ5RCcsICcjOTk5OTk5JywgJyM0ODg0MjEnLCAnI0M3QjREQicsXHJcbiAgICAnIzU0QTFEMycsICcjNmU1MjgyJywgJyNBRkRDOTEnLCAnIzY5QURBMycsICcjREI3NzI2JywgJyNEOEQ4RDgnLFxyXG4gIF0sXHJcblxyXG4gIGNoYXJ0T3B0aW9uczoge1xyXG4gICAgc2VnbWVudFNob3dTdHJva2U6IHRydWUsXHJcbiAgICBzZWdtZW50U3Ryb2tlQ29sb3I6ICcjRUJFQkVCJyxcclxuICAgIHNlZ21lbnRTdHJva2VXaWR0aDogMSxcclxuICAgIGFuaW1hdGVTY2FsZTogZmFsc2UsXHJcbiAgICBsZWdlbmRUZW1wbGF0ZTogJzx1bCBjbGFzcz1cIjwlPW5hbWUudG9Mb3dlckNhc2UoKSU+LWxlZ2VuZFwiPjwlIGZvciAodmFyIGk9MDsgaTxzZWdtZW50cy5sZW5ndGg7IGkrKyl7JT48bGkgZGF0YS1zZWdtZW50PVwiPCU9IGkgJT5cIj48c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6PCU9c2VnbWVudHNbaV0uZmlsbENvbG9yJT5cIj48L3NwYW4+PCVpZihzZWdtZW50c1tpXS5sYWJlbCl7JT48JT1zZWdtZW50c1tpXS5sYWJlbCU+PCV9JT48L2xpPjwlfSU+PC91bD4nLFxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfVxyXG4gICAqIFRoZSB0eXBlIG9mIGNoYXJ0IHRoYXQgc2hvdWxkIGJlIHJlbmRlcmVkLiBDYW4gZWl0aGVyIGJlIFBpZSBvciBEb3VnaG51dC4gQSBiYWQgb3IgdW5rbm93biB2YWx1ZSB3aWxsIHJlc3VsdCBpbiBhIGRlZmF1bHQgb2YgRG91Z2hudXQuXHJcbiAgICovXHJcbiAgcmVuZGVyQXM6ICdEb3VnaG51dCcsXHJcblxyXG4gIGZvcm1hdHRlcjogZnVuY3Rpb24gZm9ybWF0dGVyKHZhbCkge1xyXG4gICAgcmV0dXJuIHZhbDtcclxuICB9LFxyXG5cclxuICBjcmVhdGVDaGFydDogZnVuY3Rpb24gY3JlYXRlQ2hhcnQocmF3RGF0YSkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoY3JlYXRlQ2hhcnQsIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgY29uc3QgZGVmYXVsdFJlbmRlckFzID0gJ0RvdWdobnV0JztcclxuXHJcbiAgICB0aGlzLnNob3dTZWFyY2hFeHByZXNzaW9uKCk7XHJcblxyXG4gICAgY29uc3QgZGF0YSA9IGFycmF5Lm1hcChyYXdEYXRhLCAoaXRlbSwgaWR4KSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdmFsdWU6IE1hdGgucm91bmQoaXRlbS52YWx1ZSksXHJcbiAgICAgICAgY29sb3I6IHRoaXMuX2dldEl0ZW1Db2xvcihpZHgpLFxyXG4gICAgICAgIGhpZ2hsaWdodDogJycsXHJcbiAgICAgICAgbGFiZWw6IGl0ZW0ubmFtZSxcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICh0aGlzLmNoYXJ0KSB7XHJcbiAgICAgIHRoaXMuY2hhcnQuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJveCA9IGRvbUdlby5nZXRNYXJnaW5Cb3godGhpcy5kb21Ob2RlKTtcclxuICAgIHRoaXMuY29udGVudE5vZGUud2lkdGggPSBib3gudztcclxuICAgIHRoaXMuY29udGVudE5vZGUuaGVpZ2h0ID0gYm94Lmg7XHJcblxyXG4gICAgY29uc3QgY3R4ID0gdGhpcy5jb250ZW50Tm9kZS5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuICAgIGNvbnN0IGNoYXJ0ID0gbmV3IHdpbmRvdy5DaGFydChjdHgpO1xyXG5cclxuICAgIC8vIEVuc3VyZSB0aGUgY2hhcnQgaGFzIHRoZSBhYmlsaXR5IHRvIHJlbmRlciB0aGlzIHR5cGVcclxuICAgIHRoaXMucmVuZGVyQXMgPSB3aW5kb3cuQ2hhcnQudHlwZXMuaGFzT3duUHJvcGVydHkodGhpcy5yZW5kZXJBcykgPyB0aGlzLnJlbmRlckFzIDogZGVmYXVsdFJlbmRlckFzO1xyXG5cclxuICAgIHRoaXMuY2hhcnQgPSBjaGFydFt0aGlzLnJlbmRlckFzXShkYXRhLCB0aGlzLmNoYXJ0T3B0aW9ucyk7XHJcbiAgICB0aGlzLnNob3dMZWdlbmQoKTtcclxuICB9LFxyXG4gIF9nZXRJdGVtQ29sb3I6IGZ1bmN0aW9uIF9nZXRJdGVtQ29sb3IoaW5kZXgpIHtcclxuICAgIGNvbnN0IGxlbiA9IHRoaXMuc2VyaWVzQ29sb3JzLmxlbmd0aDtcclxuICAgIGNvbnN0IG4gPSBNYXRoLmZsb29yKGluZGV4IC8gbGVuKTtcclxuICAgIGxldCB0aGVJbmRleCA9IGluZGV4O1xyXG5cclxuICAgIC8vIGlmIG4gaXMgMCwgdGhlIGluZGV4IHdpbGwgZmFsbCB3aXRoaW4gdGhlIHNlcmllc0NvbG9yIGFycmF5LFxyXG4gICAgLy8gb3RoZXJ3aXNlIHdlIHdpbGwgbmVlZCB0byByZS1zY2FsZSB0aGUgaW5kZXggdG8gZmFsbCB3aXRoaW4gdGhhdCBhcnJheS5cclxuICAgIGlmIChuID4gMCkge1xyXG4gICAgICB0aGVJbmRleCA9IGluZGV4IC0gKGxlbiAqIG4pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnNlcmllc0NvbG9yc1t0aGVJbmRleF07XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=