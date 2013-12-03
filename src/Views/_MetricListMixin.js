/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/_MetricListMixin', [
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
    return declare('Mobile.SalesLogix.Views._MetricListMixin', null, {
        // Metrics
        metricNode: null,
        metricWidgets: null,
        configurationView: 'metric_configure',
        entityName: '',

        metricWidgetsBuilt: false,

        postMixInProperties: function() {
            this.inherited(arguments);
            this.widgetTemplate =  new Simplate([
                '<div id="{%= $.id %}" title="{%= $.titleText %}" class="overthrow list {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>',
                '<div data-dojo-attach-point="searchNode"></div>',
                '<div data-dojo-attach-point="metricNode" class="metric-list"></div>',
                '{%! $.emptySelectionTemplate %}',
                '<ul class="list-content" data-dojo-attach-point="contentNode"></ul>',
                '{%! $.moreTemplate %}',
                '{%! $.listActionTemplate %}',
                '</div>'
            ]);
        },
        createMetricWidgetsLayout: function() {
            var filtered = [],
                prefs;
            prefs = App.preferences && App.preferences.metrics && App.preferences.metrics[this.resourceKind];

            if (prefs) {
                filtered = array.filter(prefs, function(item) {
                    return item.enabled;
                });
            }

            return filtered;
        },
        postCreate: function() {
            this.inherited(arguments);
        },
        destroyWidgets: function() {
            array.forEach(this.metricWidgets, function(widget) {
                widget.destroy();
            }, this);

            this.metricWidgetsBuilt = false;
        },
        requestData: function() {
            this.inherited(arguments);
            this.rebuildWidgets();
        },
        clear: function() {
            this.inherited(arguments);
            this.destroyWidgets();
        },
        rebuildWidgets: function() {
            if (this.metricWidgetsBuilt) {
                return;
            }

            this.destroyWidgets();
            this.metricWidgets = [];

            if (this.options && this.options.simpleMode && (this.options.simpleMode === true)) {
                return;
            }

            var widgetOptions;
            // Create metrics widgets and place them in the metricNode
            widgetOptions = this.createMetricWidgetsLayout() || [];
            array.forEach(widgetOptions, function(options) {
                if (this._hasValidOptions(options)) {
                    options.returnToId = this.id;
                    options.parentResourceKind = this.resourceKind;
                    options.resourceKind = this.resourceKind;
                    options.currentSearchExpression = this.currentSearchExpression;
                    options.queryArgs._activeFilter = this._getCurrentQuery();

                    var widget = new MetricWidget(options);
                    widget.placeAt(this.metricNode, 'last');
                    widget.requestData();
                    this.metricWidgets.push(widget);
                }
            }, this);

            this.metricWidgetsBuilt = true;
        },
        _getCurrentQuery: function() {
            // Get the current query from the search box, and any context query located in options.where
            var query = this.query,
                where = this.options && this.options.where;
            return array.filter([query, where], function(item) {
                return !!item;
            }).join(' and ');
        },
        _hasValidOptions: function(options) {
            return options 
                && options.queryArgs 
                && options.queryArgs._filterName 
                && options.queryArgs._metricName;
        }
    });
});
