/**
 * @class Mobile.SalesLogix.Views.Charts.GenericLine
 *
 * @extends Sage.Platform.Mobile.View
 * @mixins Mobile.SalesLogix.Views.Charts._ChartMixin
 *
 * @requires Sage.Platform.Mobile.View
 *
 */
define('Mobile/SalesLogix/Views/Charts/GenericLine', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/dom-geometry',
    'dojo/dom-attr',
    'dojox/charting/Chart',
    'dojox/charting/plot2d/Bars',
    'dojox/charting/axis2d/Default',
    'Sage/Platform/Mobile/View',
    './_ChartMixin'
], function(
    declare,
    lang,
    array,
    domGeo,
    domAttr,
    Chart,
    PlotType,
    Default,
    View,
    _ChartMixin
) {
    return declare('Mobile.SalesLogix.Views.Charts.GenericLine', [View, _ChartMixin], {
        id: 'chart_generic_line',
        titleText: '',
        expose: false,
        chart: null,
        lineColor: '#0896e9',
        pointColor: '#0896e9',

        attributeMap: {
            chartContent: {node: 'contentNode', type: 'innerHTML'}
        },

        widgetTemplate: new Simplate([
            '<div id="{%= $.id %}" title="{%= $.titleText %}" class="list {%= $.cls %}">',
                '<div class="chart-hash" data-dojo-attach-point="searchExpressionNode"></div>',
                '<canvas class="chart-content" data-dojo-attach-point="contentNode"></canvas>',
            '</div>'
        ]),
        createChart: function (rawData) {
            this.inherited(arguments);

            var ctx, box, searchExpressionHeight, data, labels, seriesData;

            this.showSearchExpression();
            searchExpressionHeight = this.getSearchExpressionHeight();

            box = domGeo.getMarginBox(this.domNode);
            box.h = box.h - searchExpressionHeight;

            labels = [];
            seriesData = array.map(rawData, function(item, idx) {
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
                        data: seriesData
                    }
                ]
            };

            if (this.chart) {
                this.chart.destroy();
            }

            this.contentNode.width = box.w;
            this.contentNode.height = box.h;

            ctx = this.contentNode.getContext('2d');

            this.chart = new window.Chart(ctx).Line(data, {
                scaleShowGridLines: false,
                bezierCurve: true,
                bezierCurveTension: 0.4,
                pointDot: true,
                pointDotRadius: 4,
                datasetFill: false
            });
        }
    });
});
