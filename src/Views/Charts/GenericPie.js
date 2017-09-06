import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import array from 'dojo/_base/array';
import domGeo from 'dojo/dom-geometry';
import View from 'argos/View';
import _ChartMixin from './_ChartMixin';

/**
 * @class crm.Views.Charts.GenericPie
 *
 * @extends argos.View
 * @mixins crm.Views.Charts._ChartMixin
 *
 */
const __class = declare('crm.Views.Charts.GenericPie', [View, _ChartMixin], /** @lends crm.Views.Charts.GenericPie# */{
  id: 'chart_generic_pie',
  titleText: '',
  expose: false,
  chart: null,

  seriesColors: ['#1D5F8A', '#8ED1C6', '#9279A6', '#5C5C5C', '#F2BC41', '#66A140', '#AD4242',
    '#8DC9E6', '#EFA836', '#317C73', '#EB9D9D', '#999999', '#488421', '#C7B4DB',
    '#54A1D3', '#6e5282', '#AFDC91', '#69ADA3', '#DB7726', '#D8D8D8',
  ],

  chartOptions: {
    segmentShowStroke: true,
    segmentStrokeColor: '#EBEBEB',
    segmentStrokeWidth: 1,
    animateScale: false,
    legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li data-segment="<%= i %>"><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>',
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
    this.inherited(arguments);

    const defaultRenderAs = 'Doughnut';

    this.showSearchExpression();

    const data = array.map(rawData, (item, idx) => {
      return {
        value: Math.round(item.value),
        color: this._getItemColor(idx),
        highlight: '',
        label: item.name,
      };
    });

    if (this.chart) {
      this.chart.destroy();
    }

    const box = domGeo.getMarginBox(this.domNode);
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
      theIndex = index - (len * n);
    }

    return this.seriesColors[theIndex];
  },
});

lang.setObject('Mobile.SalesLogix.Views.Charts.GenericPie', __class);
export default __class;
