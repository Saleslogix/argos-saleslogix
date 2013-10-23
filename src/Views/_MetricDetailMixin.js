/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/_MetricDetailMixin', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/aspect',
    './MetricWidget'
], function(
    declare,
    array,
    lang,
    aspect,
    MetricWidget
) {
    return declare('Mobile.SalesLogix.Views._MetricDetailMixin', null, {
        // Metrics
        metricNode: null,
        metricWidgets: null,
        entityName: '',

        postMixInProperties: function() {
            this.widgetTemplate = new Simplate([
                '<div id="{%= $.id %}" title="{%= $.titleText %}" class="overthrow detail panel {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>',
                '{%! $.loadingTemplate %}',
                '<ul data-dojo-attach-point="metricNode" class="metric-list"></ul>',
                '<div class="panel-content" data-dojo-attach-point="contentNode"></div>',
                '</div>'
            ]);
        },
        postCreate: function() {
            this.inherited(arguments);
        },
        destroyWidgets: function() {
            array.forEach(this.metricWidgets, function(widget) {
                widget.destroy();
            }, this);
        },
        processEntry: function(entry) {
            this.inherited(arguments);
            this.rebuildWidgets(entry);
        },
        createMetricWidgetsLayout: function(entry) {
        },
        rebuildWidgets: function(entry) {
            this.destroyWidgets();
            this.metricWidgets = [];

            var widgetOptions;
            // Create metrics widgets and place them in the metricNode
            widgetOptions = this.createMetricWidgetsLayout(entry) || [];
            array.forEach(widgetOptions, function(options) {
                if (this.hasValidOptions(options)) {
                    var widget = new MetricWidget(options);
                    widget.placeAt(this.metricNode, 'last');
                    widget.requestData();
                    this.metricWidgets.push(widget);
                }
            }, this);
        },
        hasValidOptions: function(options) {
            return options 
                && options.queryArgs 
                && options.queryArgs._filterName 
                && options.queryArgs._metricName;
        }
    });
});

