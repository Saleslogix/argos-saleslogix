/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Charts/GenericPie', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/dom-geometry',
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
    domGeo,
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
        otherText: 'Other',
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

            labels = this._labels(feedData);
            box = domGeo.getMarginBox(this.domNode);

            this.chart = new Chart(this.contentNode);
            this.chart.setTheme(JulieTheme);
            this.chart.addPlot('default', {
                type: PlotType,
                fontColor: 'black',
                labelOffset: 50,
                radius: box.w >= box.h /* check lanscape or portrait mode */ ? 
                    Math.floor(box.h / 2) - 10 :
                    Math.floor(box.w / 2) - 10
            });

            this.chart.addSeries('default', labels);
            this.chart.render();
            this.chart.resize(box.w, box.h);
        },
        createLegend: function() {
            if (this.legend) {
                this.legend.destroy(true);
            }

            this.legend = new Legend({chart: this.chart}, this.legendNode);
        },
        _labels: function(feedData) {
            var data = [], MAX_ITEMS = 5, otherY = 0, otherText;
            array.forEach(feedData, function(item, index) {
                if (index < MAX_ITEMS) {
                    data.push({
                        y: item.value,
                        text: item.$descriptor + ' (' + this.formatter(item.value) + ')',
                        value: index
                    });
                } else {
                    otherY = otherY + item.value;
                    otherText = this.otherText + ' (' + this.formatter(otherY) + ')';
                    data[MAX_ITEMS] = {
                        y: otherY,
                        text: otherText
                    };
                }
            }, this);

            return data;
        }
    });
});
