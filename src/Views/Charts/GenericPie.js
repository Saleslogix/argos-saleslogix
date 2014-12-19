/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.Charts.GenericPie
 *
 * @extends Sage.Platform.Mobile.View
 * @mixins Mobile.SalesLogix.Views.Charts._ChartMixin
 *
 * @requires Sage.Platform.Mobile.View
 *
 */
define('Mobile/SalesLogix/Views/Charts/GenericPie', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/dom-geometry',
    'Sage/Platform/Mobile/View',
    './_ChartMixin'
], function(
    declare,
    lang,
    array,
    domGeo,
    View,
    _ChartMixin
) {

    return declare('Mobile.SalesLogix.Views.Charts.GenericPie', [View, _ChartMixin], {
        id: 'chart_generic_pie',
        titleText: '',
        expose: false,
        chart: null,
        seriesColors: [
            '#1c9a18',
            '#6ec90d',
            '#bff485',
            '#bce8fc',
            '#47b2f0',
            '#0c7ad8'
        ],

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
        createChart: function(rawData) {
            this.inherited(arguments);

            var ctx, box, searchExpressionHeight, data;

            this.showSearchExpression();
            searchExpressionHeight = this.getSearchExpressionHeight();

            box = domGeo.getMarginBox(this.domNode);
            box.h = box.h - searchExpressionHeight;

            data = array.map(rawData, function(item, idx) {
                return {
                    value: Math.round(item.value),
                    color: this._getItemColor(idx),
                    highlight: '',
                    label: item.name

                };
            }.bind(this));

            if (this.chart) {
                this.chart.destroy();
            }

            this.contentNode.width = box.w;
            this.contentNode.height = box.h;

            ctx = this.contentNode.getContext('2d');

            this.chart = new window.Chart(ctx).Pie(data, {
                segmentShowStroke: false,
                segmentStrokeColor: '#EBEBEB',
                segmentStrokeWidth: 5,
                animateScale: false
            });
        },
        _getItemColor: function(index) {
            var len, n;
            len = this.seriesColors.length;
            n = Math.floor(index / len);

            // if n is 0, the index will fall within the seriesColor array,
            // otherwise we will need to re-scale the index to fall within that array.
            if (n > 0) {
                index = index - (len * n);
            }

            return this.seriesColors[index];
        }
    });
});
