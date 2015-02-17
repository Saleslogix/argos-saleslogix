/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class crm.Views.Charts.GenericBar
 *
 * @extends argos.View
 * @mixins crm.Views.Charts._ChartMixin
 *
 * @requires argos.View
 *
 */
define('crm/Views/Charts/GenericBar', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/dom-geometry',
    'dojo/dom-attr',
    'argos/View',
    './_ChartMixin'
], function(
    declare,
    lang,
    array,
    domGeo,
    domAttr,
    View,
    _ChartMixin
) {
    var __class = declare('crm.Views.Charts.GenericBar', [View, _ChartMixin], {
        id: 'chart_generic_bar',
        titleText: '',
        expose: false,
        chart: null,
        barColor: '#0896e9',

        chartOptions: {
            barShowStroke: false
        },

        formatter: function(val) {
            return val;
        },

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
                        fillColor: this.barColor,
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

            this.chart = new window.Chart(ctx).Bar(data, this.chartOptions);
        }
    });

    lang.setObject('Mobile.SalesLogix.Views.Charts.GenericBar', __class);
    return __class;
});
