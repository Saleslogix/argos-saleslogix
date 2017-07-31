import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import View from 'argos/View';
import _ChartMixin from './_ChartMixin';

/**
 * @class crm.Views.Charts.GenericPie
 *
 * @extends argos.View
 * @mixins crm.Views.Charts._ChartMixin
 *
 * @requires argos.View
 *
 */
const __class = declare('crm.Views.Charts.GenericPie', [View, _ChartMixin], {
  id: 'chart_generic_pie',
  titleText: '',
  expose: false,
  chart: null,

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

    this.showSearchExpression();

    const data = rawData.map((item) => {
      return {
        name: item.$descriptor,
        value: Math.round(item.value),
      };
    });

    const chart = $(this.contentNode).chart({
      type: 'pie',
      dataset: [{
        data,
      }],
      labels: {
        lineColor: 'color-as-arc',
      },
      animate: false
    });
    this.chart = chart.data('chart');
  },
});

lang.setObject('Mobile.SalesLogix.Views.Charts.GenericPie', __class);
export default __class;
