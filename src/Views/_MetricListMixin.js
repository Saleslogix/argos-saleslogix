define('Mobile/SalesLogix/Views/_MetricListMixin', [
    'dojo/_base/declare',
    'dojo/_base/array'
], function(
    declare,
    array
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
            // Create metrics widgets
            this.metricWidgets = this.metricWidgets || this.createMetricWidgetsLayout();
            array.forEach(this.metricWidgets, function(metricWidget) {
                metricWidget.placeAt(this.metricNode, 'last');
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
