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
            scaleBeginAtZero: false,
            barShowStroke: false,
            legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
        },

        formatter: function(val) {
            return val;
        },

        attributeMap: {
            chartContent: {node: 'contentNode', type: 'innerHTML'}
        },

        createChart: function(rawData) {
            this.inherited(arguments);

            var ctx, box, data, labels, seriesData;

            this.showSearchExpression();

            labels = [];
            seriesData = array.map(rawData, function(item) {
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

            box = domGeo.getMarginBox(this.domNode);
            this.contentNode.width = box.w;
            this.contentNode.height = box.h;

            ctx = this.contentNode.getContext('2d');

            this.chart = new window.Chart(ctx).Bar(data, this.chartOptions);
        }
    });

    lang.setObject('Mobile.SalesLogix.Views.Charts.GenericBar', __class);
    return __class;
});
