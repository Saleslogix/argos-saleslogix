/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Charts/GenericBar', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/dom-geometry',
    'dojo/dom-attr',
    'dojox/charting/Chart',
    'dojox/charting/plot2d/Bars',
    'dojox/charting/axis2d/Default',
    'dojox/charting/themes/Julie',
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
    JulieTheme,
    View,
    _ChartMixin
) {
    return declare('Mobile.SalesLogix.Views.Charts.GenericBar', [View, _ChartMixin], {
        id: 'chart_generic_bar',
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
                '<div class="chart-hash" data-dojo-attach-point="searchExpressionNode"></div>',
                '<div class="chart-content" data-dojo-attach-point="contentNode"></div>',
                '<div class="chart-legend" data-dojo-attach-point="legendNode"></div>',
            '</div>'
        ]),
        createChart: function (feedData) {
            if (this.chart) {
                this.chart.destroy(true);
            }

            var labels, box, searchExpressionHeight;

            this.showSearchExpression();
            searchExpressionHeight = this.getSearchExpressionHeight();

            box = domGeo.getMarginBox(this.domNode);
            box.h = box.h - searchExpressionHeight;
            labels = this._labels(feedData);

            this.chart = new Chart(this.contentNode);
            this.chart.setTheme(JulieTheme);
            this.chart.addPlot('default', {
                type: PlotType,
                markers: false,
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
                        text: otherText,
                        value: MAX_ITEMS
                    };
                }
            }, this);

            // Reverse sort to show larger number up top
            data.sort(function(a, b) {
                if (a.y > b.y) {
                    return 1;
                }

                if (b.y > a.y) {
                    return -1;
                }

                return 0;
            });

            return data;
        }
    });
});
