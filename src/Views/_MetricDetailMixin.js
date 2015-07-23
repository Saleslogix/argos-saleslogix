import declare from 'dojo/_base/declare';
import array from 'dojo/_base/array';
import lang from 'dojo/_base/lang';
import aspect from 'dojo/aspect';
import MetricWidget from './MetricWidget';

/**
 * @class crm.Views._MetricDetailMixin
 *
 * Mixin for adding KPI widgets to detail views.
 *
 * @since 3.0
 *
 * @requires crm.Views.MetricWidget
 *
 */
var __class = declare('crm.Views._MetricDetailMixin', null, {
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
    createMetricWidgetsLayout: function() {
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

lang.setObject('Mobile.SalesLogix.Views._MetricDetailMixin', __class);
export default __class;


