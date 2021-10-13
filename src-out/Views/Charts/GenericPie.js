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
   * @class
   * @alias module:crm/Views/Charts/GenericPie
   *
   * @extends module:argos/View
   * @mixes module:crm/Views/Charts/_ChartMixin
   *
   */
  const __class = (0, _declare2.default)('crm.Views.Charts.GenericPie', [_View2.default, _ChartMixin3.default], /** @lends module:crm/Views/Charts/GenericPie.prototype */{
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
      this.inherited(createChart, arguments);

      const defaultRenderAs = 'Doughnut';

      this.showSearchExpression();

      const data = _array2.default.map(rawData, (item, idx) => {
        return {
          value: Math.round(item.value),
          color: this._getItemColor(idx),
          highlight: '',
          label: item.name
        };
      });

      if (this.chart) {
        this.chart.destroy();
      }

      const box = _domGeometry2.default.getMarginBox(this.domNode);
      this.contentNode.width = box.w;
      this.contentNode.height = box.h;

      const ctx = this.contentNode.getContext('2d');

      const chart = new window.Chart(ctx);

      // Ensure the chart has the ability to render this type
      this.renderAs = window.Chart.types.hasOwnProperty(this.renderAs) ? this.renderAs : defaultRenderAs;

      this.chart = chart[this.renderAs](data, this.chartOptions);
      this.showLegend();
    },
    _getItemColor: function _getItemColor(index) {
      const len = this.seriesColors.length;
      const n = Math.floor(index / len);
      let theIndex = index;

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

  /**
   * @module crm/Views/Charts/GenericPie
   */
  exports.default = __class;
  module.exports = exports['default'];
});