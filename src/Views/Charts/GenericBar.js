define('Mobile/SalesLogix/Views/Charts/GenericBar', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/dom-geometry',
    'dojox/charting/Chart',
    'dojox/charting/plot2d/Bars',
    'dojox/charting/axis2d/Default',
    'dojox/charting/themes/Julie',
    'Sage/Platform/Mobile/View'
], function(
    declare,
    lang,
    array,
    domGeo,
    Chart,
    PlotType,
    Default,
    JulieTheme,
    View
) {
    return declare('Mobile.SalesLogix.Views.Charts.GenericBar', [View], {
        id: 'chart_generic_bar',
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

            var labels, box;

            box = domGeo.getMarginBox(this.domNode);
            labels = this._labels(feedData);

            this.chart = new Chart(this.contentNode);
            this.chart.setTheme(JulieTheme);
            this.chart.addPlot('default', {
                type: PlotType,
                markers: true,
                gap: 5,
                majorLabels: true,
                minorTickets: false,
                minorLabels: false,
                microTicks: false
            });

            this.chart.addAxis('x', {
                vertical: true,
                title: '',
                labels: labels,
                labelFunc: function(formattedValue, rawValue) {
                    var item = labels[rawValue - 1];
                    return item && item.text;
                }
            });

            this.chart.addAxis('y', {
                title: '',
                titleOrientation: 'away'
            });

            this.chart.addSeries('default', labels);
            this.chart.render();
            this.chart.resize(box.w, box.h);
        },
        _labels: function(feedData) {
            var data = [];
            array.forEach(feedData, function(item, index) {
                data.push({
                    y: item.value,
                    text: item.$descriptor + ' (' + this.formatter(item.value) + ')',
                    value: index
                });
            }, this);

            return data;
        }
    });
});
