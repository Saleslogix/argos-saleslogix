define('crm/Views/_MetricDetailMixin', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/array', 'dojo/_base/lang', 'dojo/aspect', './MetricWidget'], function (exports, module, _dojo_baseDeclare, _dojo_baseArray, _dojo_baseLang, _dojoAspect, _MetricWidget) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _array = _interopRequireDefault(_dojo_baseArray);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _aspect = _interopRequireDefault(_dojoAspect);

    var _MetricWidget2 = _interopRequireDefault(_MetricWidget);

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
    var __class = (0, _declare['default'])('crm.Views._MetricDetailMixin', null, {
        // Metrics
        metricNode: null,
        metricWidgets: null,
        entityName: '',

        postMixInProperties: function postMixInProperties() {
            this.widgetTemplate = new Simplate(['<div id="{%= $.id %}" title="{%= $.titleText %}" class="overthrow detail panel {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>', '{%! $.loadingTemplate %}', '<ul data-dojo-attach-point="metricNode" class="metric-list"></ul>', '<div class="panel-content" data-dojo-attach-point="contentNode"></div>', '</div>']);
        },
        postCreate: function postCreate() {
            this.inherited(arguments);
        },
        destroyWidgets: function destroyWidgets() {
            _array['default'].forEach(this.metricWidgets, function (widget) {
                widget.destroy();
            }, this);
        },
        processEntry: function processEntry(entry) {
            this.inherited(arguments);
            this.rebuildWidgets(entry);
        },
        createMetricWidgetsLayout: function createMetricWidgetsLayout() {},
        rebuildWidgets: function rebuildWidgets(entry) {
            this.destroyWidgets();
            this.metricWidgets = [];

            var widgetOptions;
            // Create metrics widgets and place them in the metricNode
            widgetOptions = this.createMetricWidgetsLayout(entry) || [];
            _array['default'].forEach(widgetOptions, function (options) {
                if (this.hasValidOptions(options)) {
                    var widget = new _MetricWidget2['default'](options);
                    widget.placeAt(this.metricNode, 'last');
                    widget.requestData();
                    this.metricWidgets.push(widget);
                }
            }, this);
        },
        hasValidOptions: function hasValidOptions(options) {
            return options && options.queryArgs && options.queryArgs._filterName && options.queryArgs._metricName;
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Views._MetricDetailMixin', __class);
    module.exports = __class;
});
