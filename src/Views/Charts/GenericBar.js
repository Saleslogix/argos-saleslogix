import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import array from 'dojo/_base/array';
import domGeo from 'dojo/dom-geometry';
import View from 'argos/View';
import _ChartMixin from './_ChartMixin';

/**
 * @class crm.Views.Charts.GenericBar
 *
 * @extends argos.View
 * @mixins crm.Views.Charts._ChartMixin
 *
 */
const __class = declare('crm.Views.Charts.GenericBar', [View, _ChartMixin], /** @lends crm.Views.Charts.GenericBar# */{
  id: 'chart_generic_bar',
  titleText: '',
  expose: false,
  chart: null,
  barColor: '#1D5F8A',

  chartOptions: {
    scaleBeginAtZero: false,
    barShowStroke: false,
    legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
  },

  formatter: function formatter(val) {
    return val;
  },

  attributeMap: {
    chartContent: {
      node: 'contentNode',
      type: 'innerHTML',
    },
  },

  createChart: function createChart(rawData) {
    this.inherited(arguments);

    this.showSearchExpression();

    const labels = [];
    const seriesData = array.map(rawData, (item) => {
      labels.push(item.$descriptor);
      return Math.round(item.value);
    });

    const data = {
      labels,
      datasets: [{
        label: 'Default',
        fillColor: this.barColor,
        data: seriesData,
      }],
    };

    if (this.chart) {
      this.chart.destroy();
    }

    const box = domGeo.getMarginBox(this.domNode);
    this.contentNode.width = box.w;
    this.contentNode.height = box.h;

    const ctx = this.contentNode.getContext('2d');

    this.chart = new window.Chart(ctx).Bar(data, this.chartOptions); // eslint-disable-line
  },
});

lang.setObject('Mobile.SalesLogix.Views.Charts.GenericBar', __class);
export default __class;
