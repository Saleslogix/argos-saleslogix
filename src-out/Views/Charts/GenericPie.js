define('crm/Views/Charts/GenericPie', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/_base/array', 'dojo/dom-geometry', 'argos/View', './_ChartMixin'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojo_baseArray, _dojoDomGeometry, _argosView, _ChartMixin2) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _array = _interopRequireDefault(_dojo_baseArray);

  var _domGeo = _interopRequireDefault(_dojoDomGeometry);

  var _View = _interopRequireDefault(_argosView);

  var _ChartMixin3 = _interopRequireDefault(_ChartMixin2);

  /**
   * @class crm.Views.Charts.GenericPie
   *
   * @extends argos.View
   * @mixins crm.Views.Charts._ChartMixin
   *
   * @requires argos.View
   *
   */
  var __class = (0, _declare['default'])('crm.Views.Charts.GenericPie', [_View['default'], _ChartMixin3['default']], {
    id: 'chart_generic_pie',
    titleText: '',
    expose: false,
    chart: null,

    seriesColors: ['#1c9a18', '#6ec90d', '#bff485', '#bce8fc', '#47b2f0', '#0c7ad8'],

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
      this.inherited(arguments);

      var ctx, box, data, chart, defaultRenderAs;

      defaultRenderAs = 'Doughnut';

      this.showSearchExpression();

      data = _array['default'].map(rawData, (function (item, idx) {
        return {
          value: Math.round(item.value),
          color: this._getItemColor(idx),
          highlight: '',
          label: item.name

        };
      }).bind(this));

      if (this.chart) {
        this.chart.destroy();
      }

      box = _domGeo['default'].getMarginBox(this.domNode);
      this.contentNode.width = box.w;
      this.contentNode.height = box.h;

      ctx = this.contentNode.getContext('2d');

      chart = new window.Chart(ctx);

      // Ensure the chart has the ability to render this type
      this.renderAs = window.Chart.types.hasOwnProperty(this.renderAs) ? this.renderAs : defaultRenderAs;

      this.chart = chart[this.renderAs](data, this.chartOptions);
      this.showLegend();
    },
    _getItemColor: function _getItemColor(index) {
      var len, n;
      len = this.seriesColors.length;
      n = Math.floor(index / len);

      // if n is 0, the index will fall within the seriesColor array,
      // otherwise we will need to re-scale the index to fall within that array.
      if (n > 0) {
        index = index - len * n;
      }

      return this.seriesColors[index];
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.Charts.GenericPie', __class);
  module.exports = __class;
});
