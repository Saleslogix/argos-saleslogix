define('crm/Views/Charts/GenericBar', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/_base/array', 'dojo/dom-geometry', 'dojo/dom-attr', 'argos/View', './_ChartMixin'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojo_baseArray, _dojoDomGeometry, _dojoDomAttr, _argosView, _ChartMixin2) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _array = _interopRequireDefault(_dojo_baseArray);

    var _domGeo = _interopRequireDefault(_dojoDomGeometry);

    var _domAttr = _interopRequireDefault(_dojoDomAttr);

    var _View = _interopRequireDefault(_argosView);

    var _ChartMixin3 = _interopRequireDefault(_ChartMixin2);

    /**
     * @class crm.Views.Charts.GenericBar
     *
     * @extends argos.View
     * @mixins crm.Views.Charts._ChartMixin
     *
     * @requires argos.View
     *
     */
    var __class = (0, _declare['default'])('crm.Views.Charts.GenericBar', [_View['default'], _ChartMixin3['default']], {
        id: 'chart_generic_bar',
        titleText: '',
        expose: false,
        chart: null,
        barColor: '#0896e9',

        chartOptions: {
            scaleBeginAtZero: false,
            barShowStroke: false,
            legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
        },

        formatter: function formatter(val) {
            return val;
        },

        attributeMap: {
            chartContent: { node: 'contentNode', type: 'innerHTML' }
        },

        createChart: function createChart(rawData) {
            this.inherited(arguments);

            var ctx, box, data, labels, seriesData;

            this.showSearchExpression();

            labels = [];
            seriesData = _array['default'].map(rawData, (function (item) {
                labels.push(item.$descriptor);
                return Math.round(item.value);
            }).bind(this));

            data = {
                labels: labels,
                datasets: [{
                    label: 'Default',
                    fillColor: this.barColor,
                    data: seriesData
                }]
            };

            if (this.chart) {
                this.chart.destroy();
            }

            box = _domGeo['default'].getMarginBox(this.domNode);
            this.contentNode.width = box.w;
            this.contentNode.height = box.h;

            ctx = this.contentNode.getContext('2d');

            this.chart = new window.Chart(ctx).Bar(data, this.chartOptions);
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Views.Charts.GenericBar', __class);
    module.exports = __class;
});
