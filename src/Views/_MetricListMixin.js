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
        createToolLayout: function() {
            return this.tools || (this.tools = {
                tbar: [{
                    id: 'configure',
                    action: 'navigateToConfigurationView'
                }]
            });
        },
        navigateToConfigurationView: function() {
            var view = App.getView(this.configurationView);
            if (view) {
                view.resourceKind = this.resourceKind;
                view.show({ returnTo: -1 });
            }
        },
        postCreate: function() {
            this.inherited(arguments);
        },
        onShow: function() {
            this.inherited(arguments);
            this.metricWidgets = [];

            var widgetOptions;
            // Create metrics widgets and place them in the metricNode
            widgetOptions = this.createMetricWidgetsLayout() || [];
            array.forEach(widgetOptions, function(options) {
                var widget = new MetricWidget(options);
                widget.placeAt(this.metricNode, 'last');
                this.metricWidgets.push(widget);
            }, this);

            array.forEach(this.metricWidgets, function(metricWidget) {
                metricWidget.requestData();
            }, this);
        }
    });
});
