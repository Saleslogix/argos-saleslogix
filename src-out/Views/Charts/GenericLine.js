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
   * @class
   * @alias module:crm/Views/Charts/GenericLine
   *
   * @extends module:argos/View
   * @mixes module:crm/Views/Charts/_ChartMixin
   *
   */
  const __class = (0, _declare2.default)('crm.Views.Charts.GenericLine', [_View2.default, _ChartMixin3.default], /** @lends module:crm/Views/Charts/GenericLine.prototype */{
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

      const labels = [];
      const seriesData = _array2.default.map(rawData, item => {
        labels.push(item.$descriptor);
        return Math.round(item.value);
      });

      const data = {
        labels,
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

      const box = _domGeometry2.default.getMarginBox(this.domNode);
      this.contentNode.width = box.w;
      this.contentNode.height = box.h;

      const ctx = this.contentNode.getContext('2d');

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

  /**
   * @module crm/Views/Charts/GenericLine
   */
  exports.default = __class;
  module.exports = exports['default'];
});