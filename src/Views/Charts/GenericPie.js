define('Mobile/SalesLogix/Views/Charts/GenericPie', [
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
    return declare('Mobile.SalesLogix.Views.Charts.GenericPie', [View], {
        id: 'chart_generic_pie',
        titleText: '',
        expose: false,
        chart: null,
        legend: null,

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
            if (this.chart) {
                this.chart.destroy(true);
            }

            var labels;

            labels = this._labels(feedData);

            this.chart = new Chart(this.contentNode);
            this.chart.setTheme(JulieTheme);
            this.chart.addPlot('default', {
                type: PlotType,
                radius: 75,
                fontColor: 'black',
                labelOffset: -60
            });

            this.chart.addSeries('default', labels);
            this.chart.render();
            //this.createLegend();
        },
        createLegend: function() {
            if (this.legend) {
                this.legend.destroy(true);
            }

            this.legend = new Legend({chart: this.chart}, this.legendNode);
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
