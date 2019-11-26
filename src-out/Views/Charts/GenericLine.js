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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9DaGFydHMvR2VuZXJpY0xpbmUuanMiXSwibmFtZXMiOlsiX19jbGFzcyIsImlkIiwidGl0bGVUZXh0IiwiZXhwb3NlIiwiY2hhcnQiLCJsaW5lQ29sb3IiLCJwb2ludENvbG9yIiwiZmlsbENvbG9yIiwiY2hhcnRPcHRpb25zIiwic2NhbGVTaG93R3JpZExpbmVzIiwiYmV6aWVyQ3VydmUiLCJiZXppZXJDdXJ2ZVRlbnNpb24iLCJwb2ludERvdCIsInBvaW50RG90UmFkaXVzIiwiZGF0YXNldEZpbGwiLCJsZWdlbmRUZW1wbGF0ZSIsImF0dHJpYnV0ZU1hcCIsImNoYXJ0Q29udGVudCIsIm5vZGUiLCJ0eXBlIiwidGl0bGUiLCJwcm90b3R5cGUiLCJzZWxlY3RlZCIsImNyZWF0ZUNoYXJ0IiwicmF3RGF0YSIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsInNob3dTZWFyY2hFeHByZXNzaW9uIiwibGFiZWxzIiwic2VyaWVzRGF0YSIsIm1hcCIsIml0ZW0iLCJwdXNoIiwiJGRlc2NyaXB0b3IiLCJNYXRoIiwicm91bmQiLCJ2YWx1ZSIsImRhdGEiLCJkYXRhc2V0cyIsImxhYmVsIiwic3Ryb2tlQ29sb3IiLCJkZXN0cm95IiwiYm94IiwiZ2V0TWFyZ2luQm94IiwiZG9tTm9kZSIsImNvbnRlbnROb2RlIiwid2lkdGgiLCJ3IiwiaGVpZ2h0IiwiaCIsImN0eCIsImdldENvbnRleHQiLCJ3aW5kb3ciLCJDaGFydCIsIkxpbmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQTs7Ozs7OztBQU9BLE1BQU1BLFVBQVUsdUJBQVEsOEJBQVIsRUFBd0Msc0NBQXhDLEVBQTZELDJDQUEyQztBQUN0SEMsUUFBSSxvQkFEa0g7QUFFdEhDLGVBQVcsRUFGMkc7QUFHdEhDLFlBQVEsS0FIOEc7QUFJdEhDLFdBQU8sSUFKK0c7QUFLdEhDLGVBQVcsU0FMMkc7QUFNdEhDLGdCQUFZLFNBTjBHO0FBT3RIQyxlQUFXLHNCQVAyRzs7QUFTdEhDLGtCQUFjO0FBQ1pDLDBCQUFvQixLQURSO0FBRVpDLG1CQUFhLElBRkQ7QUFHWkMsMEJBQW9CLEdBSFI7QUFJWkMsZ0JBQVUsSUFKRTtBQUtaQyxzQkFBZ0IsQ0FMSjtBQU1aQyxtQkFBYSxJQU5EO0FBT1pDLHNCQUFnQjtBQVBKLEtBVHdHOztBQW1CdEhDLGtCQUFjO0FBQ1pDLG9CQUFjO0FBQ1pDLGNBQU0sYUFETTtBQUVaQyxjQUFNO0FBRk0sT0FERjtBQUtaQyxhQUFPLGVBQUtDLFNBQUwsQ0FBZUwsWUFBZixDQUE0QkksS0FMdkI7QUFNWkUsZ0JBQVUsZUFBS0QsU0FBTCxDQUFlTCxZQUFmLENBQTRCTTtBQU4xQixLQW5Cd0c7O0FBNEJ0SEMsaUJBQWEsU0FBU0EsV0FBVCxDQUFxQkMsT0FBckIsRUFBOEI7QUFDekMsV0FBS0MsU0FBTCxDQUFlRixXQUFmLEVBQTRCRyxTQUE1Qjs7QUFFQSxXQUFLQyxvQkFBTDs7QUFFQSxVQUFNQyxTQUFTLEVBQWY7QUFDQSxVQUFNQyxhQUFhLGdCQUFNQyxHQUFOLENBQVVOLE9BQVYsRUFBbUIsVUFBQ08sSUFBRCxFQUFVO0FBQzlDSCxlQUFPSSxJQUFQLENBQVlELEtBQUtFLFdBQWpCO0FBQ0EsZUFBT0MsS0FBS0MsS0FBTCxDQUFXSixLQUFLSyxLQUFoQixDQUFQO0FBQ0QsT0FIa0IsQ0FBbkI7O0FBS0EsVUFBTUMsT0FBTztBQUNYVCxzQkFEVztBQUVYVSxrQkFBVSxDQUFDO0FBQ1RDLGlCQUFPLFNBREU7QUFFVEMsdUJBQWEsS0FBS25DLFNBRlQ7QUFHVEMsc0JBQVksS0FBS0EsVUFIUjtBQUlUQyxxQkFBVyxLQUFLQSxTQUpQO0FBS1Q4QixnQkFBTVI7QUFMRyxTQUFEO0FBRkMsT0FBYjs7QUFXQSxVQUFJLEtBQUt6QixLQUFULEVBQWdCO0FBQ2QsYUFBS0EsS0FBTCxDQUFXcUMsT0FBWDtBQUNEOztBQUVELFVBQU1DLE1BQU0sc0JBQU9DLFlBQVAsQ0FBb0IsS0FBS0MsT0FBekIsQ0FBWjtBQUNBLFdBQUtDLFdBQUwsQ0FBaUJDLEtBQWpCLEdBQXlCSixJQUFJSyxDQUE3QjtBQUNBLFdBQUtGLFdBQUwsQ0FBaUJHLE1BQWpCLEdBQTBCTixJQUFJTyxDQUE5Qjs7QUFFQSxVQUFNQyxNQUFNLEtBQUtMLFdBQUwsQ0FBaUJNLFVBQWpCLENBQTRCLElBQTVCLENBQVo7O0FBRUEsV0FBSy9DLEtBQUwsR0FBYSxJQUFJZ0QsT0FBT0MsS0FBWCxDQUFpQkgsR0FBakIsRUFBc0JJLElBQXRCLENBQTJCakIsSUFBM0IsRUFBaUMsS0FBSzdCLFlBQXRDLENBQWIsQ0FoQ3lDLENBZ0N5QjtBQUNuRTtBQTdEcUgsR0FBeEcsQ0FBaEIsQyxDQTVCQTs7Ozs7Ozs7Ozs7Ozs7O29CQTRGZVIsTyIsImZpbGUiOiJHZW5lcmljTGluZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBhcnJheSBmcm9tICdkb2pvL19iYXNlL2FycmF5JztcclxuaW1wb3J0IGRvbUdlbyBmcm9tICdkb2pvL2RvbS1nZW9tZXRyeSc7XHJcbmltcG9ydCBWaWV3IGZyb20gJ2FyZ29zL1ZpZXcnO1xyXG5pbXBvcnQgX0NoYXJ0TWl4aW4gZnJvbSAnLi9fQ2hhcnRNaXhpbic7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5DaGFydHMuR2VuZXJpY0xpbmVcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuVmlld1xyXG4gKiBAbWl4aW5zIGNybS5WaWV3cy5DaGFydHMuX0NoYXJ0TWl4aW5cclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuQ2hhcnRzLkdlbmVyaWNMaW5lJywgW1ZpZXcsIF9DaGFydE1peGluXSwgLyoqIEBsZW5kcyBjcm0uVmlld3MuQ2hhcnRzLkdlbmVyaWNMaW5lIyAqL3tcclxuICBpZDogJ2NoYXJ0X2dlbmVyaWNfbGluZScsXHJcbiAgdGl0bGVUZXh0OiAnJyxcclxuICBleHBvc2U6IGZhbHNlLFxyXG4gIGNoYXJ0OiBudWxsLFxyXG4gIGxpbmVDb2xvcjogJyMxRDVGOEEnLFxyXG4gIHBvaW50Q29sb3I6ICcjMUQ1RjhBJyxcclxuICBmaWxsQ29sb3I6ICdyZ2JhKDgsMTUwLDIzMywgMC4yKScsXHJcblxyXG4gIGNoYXJ0T3B0aW9uczoge1xyXG4gICAgc2NhbGVTaG93R3JpZExpbmVzOiBmYWxzZSxcclxuICAgIGJlemllckN1cnZlOiB0cnVlLFxyXG4gICAgYmV6aWVyQ3VydmVUZW5zaW9uOiAwLjQsXHJcbiAgICBwb2ludERvdDogdHJ1ZSxcclxuICAgIHBvaW50RG90UmFkaXVzOiA0LFxyXG4gICAgZGF0YXNldEZpbGw6IHRydWUsXHJcbiAgICBsZWdlbmRUZW1wbGF0ZTogJzx1bCBjbGFzcz1cIjwlPW5hbWUudG9Mb3dlckNhc2UoKSU+LWxlZ2VuZFwiPjwlIGZvciAodmFyIGk9MDsgaTxkYXRhc2V0cy5sZW5ndGg7IGkrKyl7JT48bGk+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOjwlPWRhdGFzZXRzW2ldLnN0cm9rZUNvbG9yJT5cIj48L3NwYW4+PCVpZihkYXRhc2V0c1tpXS5sYWJlbCl7JT48JT1kYXRhc2V0c1tpXS5sYWJlbCU+PCV9JT48L2xpPjwlfSU+PC91bD4nLFxyXG4gIH0sXHJcblxyXG4gIGF0dHJpYnV0ZU1hcDoge1xyXG4gICAgY2hhcnRDb250ZW50OiB7XHJcbiAgICAgIG5vZGU6ICdjb250ZW50Tm9kZScsXHJcbiAgICAgIHR5cGU6ICdpbm5lckhUTUwnLFxyXG4gICAgfSxcclxuICAgIHRpdGxlOiBWaWV3LnByb3RvdHlwZS5hdHRyaWJ1dGVNYXAudGl0bGUsXHJcbiAgICBzZWxlY3RlZDogVmlldy5wcm90b3R5cGUuYXR0cmlidXRlTWFwLnNlbGVjdGVkLFxyXG4gIH0sXHJcblxyXG4gIGNyZWF0ZUNoYXJ0OiBmdW5jdGlvbiBjcmVhdGVDaGFydChyYXdEYXRhKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChjcmVhdGVDaGFydCwgYXJndW1lbnRzKTtcclxuXHJcbiAgICB0aGlzLnNob3dTZWFyY2hFeHByZXNzaW9uKCk7XHJcblxyXG4gICAgY29uc3QgbGFiZWxzID0gW107XHJcbiAgICBjb25zdCBzZXJpZXNEYXRhID0gYXJyYXkubWFwKHJhd0RhdGEsIChpdGVtKSA9PiB7XHJcbiAgICAgIGxhYmVscy5wdXNoKGl0ZW0uJGRlc2NyaXB0b3IpO1xyXG4gICAgICByZXR1cm4gTWF0aC5yb3VuZChpdGVtLnZhbHVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgIGxhYmVscyxcclxuICAgICAgZGF0YXNldHM6IFt7XHJcbiAgICAgICAgbGFiZWw6ICdEZWZhdWx0JyxcclxuICAgICAgICBzdHJva2VDb2xvcjogdGhpcy5saW5lQ29sb3IsXHJcbiAgICAgICAgcG9pbnRDb2xvcjogdGhpcy5wb2ludENvbG9yLFxyXG4gICAgICAgIGZpbGxDb2xvcjogdGhpcy5maWxsQ29sb3IsXHJcbiAgICAgICAgZGF0YTogc2VyaWVzRGF0YSxcclxuICAgICAgfV0sXHJcbiAgICB9O1xyXG5cclxuICAgIGlmICh0aGlzLmNoYXJ0KSB7XHJcbiAgICAgIHRoaXMuY2hhcnQuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJveCA9IGRvbUdlby5nZXRNYXJnaW5Cb3godGhpcy5kb21Ob2RlKTtcclxuICAgIHRoaXMuY29udGVudE5vZGUud2lkdGggPSBib3gudztcclxuICAgIHRoaXMuY29udGVudE5vZGUuaGVpZ2h0ID0gYm94Lmg7XHJcblxyXG4gICAgY29uc3QgY3R4ID0gdGhpcy5jb250ZW50Tm9kZS5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuICAgIHRoaXMuY2hhcnQgPSBuZXcgd2luZG93LkNoYXJ0KGN0eCkuTGluZShkYXRhLCB0aGlzLmNoYXJ0T3B0aW9ucyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==