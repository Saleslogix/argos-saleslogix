import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import array from 'dojo/_base/array';
import domGeo from 'dojo/dom-geometry';
import View from 'argos/View';
import _ChartMixin from './_ChartMixin';

/**
 * @class crm.Views.Charts.GenericLine
 *
 * @extends argos.View
 * @mixins crm.Views.Charts._ChartMixin
 *
 */
const __class = declare('crm.Views.Charts.GenericLine', [View, _ChartMixin], /** @lends crm.Views.Charts.GenericLine# */{
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
    legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
  },

  attributeMap: {
    chartContent: {
      node: 'contentNode',
      type: 'innerHTML',
    },
    title: View.prototype.attributeMap.title,
    selected: View.prototype.attributeMap.selected,
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
        strokeColor: this.lineColor,
        pointColor: this.pointColor,
        fillColor: this.fillColor,
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

    this.chart = new window.Chart(ctx).Line(data, this.chartOptions); // eslint-disable-line
  },
});

lang.setObject('Mobile.SalesLogix.Views.Charts.GenericLine', __class);
export default __class;
