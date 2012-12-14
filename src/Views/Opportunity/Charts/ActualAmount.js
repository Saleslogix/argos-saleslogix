define('Mobile/SalesLogix/Views/Opportunity/Charts/ActualAmount', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojox/charting/Chart',
    'dojox/charting/plot2d/Pie',
    'dojox/charting/axis2d/Default',
    'dojox/charting/widget/Legend',
    'dojox/charting/themes/Julie',
    'Sage/Platform/Mobile/View'
], function(
    declare,
    lang,
    array,
    Chart,
    PlotType,
    Default,
    Legend,
    JulieTheme,
    View
) {
    return declare('Mobile.SalesLogix.Views.Opportunity.Charts.ActualAmount', [View], {
        id: 'chart_opportunity_actualamount',
        titleText: 'Actual Amount',
        expose: false,

        formatter: function(val) {
            return val;
        },

        attributeMap: {
            chartContent: {node: 'contentNode', type: 'innerHTML'}
        },
        widgetTemplate: new Simplate([
            '<div id="{%= $.id %}" title="{%= $.titleText %}" class="list {%= $.cls %}">',
                '<div class="chart-content" data-dojo-attach-point="contentNode"></div>',
                '<div class="chart-legend" data-dojo-attach-point="legendNode"></div>',
            '</div>'
        ]),
        createChart: function (feedData) {
            var chart, data, labels;

            labels = this._labels(feedData);

            chart = new Chart(this.contentNode);
            chart.setTheme(JulieTheme);
            chart.addPlot('default', {
                type: PlotType,
                radius: 75,
                //fontColor: 'black',
                labelOffset: -100,
                labelStyle: 'columns',
                labelWiring: 'ccc'
            });

            chart.addSeries('Actual Amount', labels);
            chart.render();
            //this.createLegend(chart);
        },
        createLegend: function(chart) {
            return new Legend({chart: chart}, this.legendNode);
        },
        _labels: function(feedData) {
            var data = [];
            array.forEach(feedData, function(item, index) {
                data.push({
                    y: item.value,
                    text: item.$descriptor + ' (' + this.formatter(item.value) + ')'
                });
            }, this);

            return data;
        }
    });
});
