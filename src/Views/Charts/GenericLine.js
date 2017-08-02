import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import View from 'argos/View';
import _ChartMixin from './_ChartMixin';

/**
 * @class crm.Views.Charts.GenericLine
 *
 * @extends argos.View
 * @mixins crm.Views.Charts._ChartMixin
 *
 * @requires argos.View
 *
 */
const __class = declare('crm.Views.Charts.GenericLine', [View, _ChartMixin], {
  id: 'chart_generic_line',
  titleText: '',
  expose: false,
  chart: null,

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
      type: 'line',
      dataset: [{
        data,
      }],
      showLegend: false,
      xAxis: {
        rotate: '-65',
      },
      yAxis: {
        ticks: {
          format: ',.1s',
        },
      },
    });
    this.chart = chart.data('chart');
  },
});

lang.setObject('Mobile.SalesLogix.Views.Charts.GenericLine', __class);
export default __class;
