import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import View from 'argos/View';
import _ChartMixin from './_ChartMixin';

/**
 * @class crm.Views.Charts.GenericBar
 *
 * @extends argos.View
 * @mixins crm.Views.Charts._ChartMixin
 *
 * @requires argos.View
 *
 */
const __class = declare('crm.Views.Charts.GenericBar', [View, _ChartMixin], {
  id: 'chart_generic_bar',
  titleText: '',
  expose: false,
  chart: null,

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

    const data = rawData.map((item) => {
      return {
        name: item.$descriptor,
        value: item.value,
      };
    });

    const chart = $(this.contentNode).chart({
      type: 'column',
      dataset: [{
        data,
      }],
      showLegend: false,
      xAxis: {
        rotate: '-65',
      },
    });
    this.chart = chart.data('chart');
  },
});

lang.setObject('Mobile.SalesLogix.Views.Charts.GenericBar', __class);
export default __class;
