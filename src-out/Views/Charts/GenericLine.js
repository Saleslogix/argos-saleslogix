/**
 * @class crm.Views.Charts.GenericLine
 *
 * @extends argos.View
 * @mixins crm.Views.Charts._ChartMixin
 *
 * @requires argos.View
 *
 */
define('crm/Views/Charts/GenericLine', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/dom-geometry',
    'dojo/dom-attr',
    'argos/View',
    './_ChartMixin'
], function (declare, lang, array, domGeo, domAttr, View, _ChartMixin) {
    var __class = declare('crm.Views.Charts.GenericLine', [View, _ChartMixin], {
        id: 'chart_generic_line',
        titleText: '',
        expose: false,
        chart: null,
        lineColor: '#0896e9',
        pointColor: '#0896e9',
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
            chartContent: { node: 'contentNode', type: 'innerHTML' }
        },
        createChart: function (rawData) {
            this.inherited(arguments);
            var ctx, box, data, labels, seriesData;
            this.showSearchExpression();
            labels = [];
            seriesData = array.map(rawData, function (item) {
                labels.push(item.$descriptor);
                return Math.round(item.value);
            }.bind(this));
            data = {
                labels: labels,
                datasets: [
                    {
                        label: 'Default',
                        strokeColor: this.lineColor,
                        pointColor: this.pointColor,
                        fillColor: this.fillColor,
                        data: seriesData
                    }
                ]
            };
            if (this.chart) {
                this.chart.destroy();
            }
            box = domGeo.getMarginBox(this.domNode);
            this.contentNode.width = box.w;
            this.contentNode.height = box.h;
            ctx = this.contentNode.getContext('2d');
            this.chart = new window.Chart(ctx).Line(data, this.chartOptions);
        }
    });
    lang.setObject('Mobile.SalesLogix.Views.Charts.GenericLine', __class);
    return __class;
});
