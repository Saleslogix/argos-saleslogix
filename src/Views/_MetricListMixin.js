define('Mobile/SalesLogix/Views/_MetricListMixin', [
    'dojo/_base/declare',
    'dojo/_base/array',
    './MetricWidget'
], function(
    declare,
    array,
    MetricWidget
) {
    return declare('Mobile.SalesLogix.Views._MetricListMixin', null, {
        // Metrics
        metricNode: null,
        metricWidgets: null,

        postMixInProperties: function() {
            this.widgetTemplate =  new Simplate([
                '<div id="{%= $.id %}" title="{%= $.titleText %}" class="list {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>',
                '<div data-dojo-attach-point="searchNode"></div>',
                '<ul data-dojo-attach-point="metricNode" class="metric-list"></ul>',
                '<a href="#" class="android-6059-fix">fix for android issue #6059</a>',
                '{%! $.emptySelectionTemplate %}',
                '<ul class="list-content" data-dojo-attach-point="contentNode"></ul>',
                '{%! $.moreTemplate %}',
                '{%! $.listActionTemplate %}',
                '</div>'
            ]);
        },
        createMetricWidgetsLayout: function() {
        },
        postCreate: function() {
            this.inherited(arguments);

            var widgetOptions;
            this.metricWidgets = [];

            // Create metrics widgets and place them in the metricNode
            widgetOptions = this.createMetricWidgetsLayout() || [];
            array.forEach(widgetOptions, function(options) {
                var widget = new MetricWidget(options);
                widget.placeAt(this.metricNode, 'last');
                this.metricWidgets.push(widget);
            }, this);
        },
        onShow: function() {
            this.inherited(arguments);
            array.forEach(this.metricWidgets, function(metricWidget) {
                metricWidget.requestData();
            }, this);
        }
    });
});
