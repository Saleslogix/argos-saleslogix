define('crm/Views/_MetricListMixin', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/array', 'dojo/_base/lang', 'dojo/aspect', './MetricWidget', '../GroupUtility'], function (exports, module, _dojo_baseDeclare, _dojo_baseArray, _dojo_baseLang, _dojoAspect, _MetricWidget, _GroupUtility) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _array = _interopRequireDefault(_dojo_baseArray);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _aspect = _interopRequireDefault(_dojoAspect);

  var _MetricWidget2 = _interopRequireDefault(_MetricWidget);

  var _GroupUtility2 = _interopRequireDefault(_GroupUtility);

  /**
   * @class crm.Views._MetricListMixin
   *
   * Mixin for adding KPI widgets to list views.
   *
   * @since 3.0
   *
   * @requires crm.Views.MetricWidget
   *
   */
  var __class = (0, _declare['default'])('crm.Views._MetricListMixin', null, {
    // Metrics
    metricNode: null,
    metricWidgets: null,
    configurationView: 'metric_configure',
    entityName: '',

    metricWidgetsBuilt: false,

    postMixInProperties: function postMixInProperties() {
      this.inherited(arguments);
      this.widgetTemplate = new Simplate(['<div id="{%= $.id %}" title="{%= $.titleText %}" class="list {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>', '<div data-dojo-attach-point="searchNode"></div>', '<div class="overthrow scroller" data-dojo-attach-point="scrollerNode">', '<div class="metric-list">', '<div data-dojo-attach-point="metricNode" class="metric-wrapper"></div>', '</div>', '{%! $.emptySelectionTemplate %}', '<ul class="list-content" data-dojo-attach-point="contentNode"></ul>', '{%! $.moreTemplate %}', '{%! $.listActionTemplate %}', '</div>', '</div>']);
    },
    createMetricWidgetsLayout: function createMetricWidgetsLayout() {
      var filtered = [],
          metrics = [];

      metrics = App.getMetricsByResourceKind(this.resourceKind);

      if (metrics.length > 0) {
        filtered = _array['default'].filter(metrics, function (item) {
          return item.enabled;
        });
      }

      return _lang['default'].clone(filtered);
    },
    postCreate: function postCreate() {
      this.inherited(arguments);
    },
    destroyWidgets: function destroyWidgets() {
      _array['default'].forEach(this.metricWidgets, function (widget) {
        widget.destroy();
      }, this);

      this.metricWidgetsBuilt = false;
    },
    requestData: function requestData() {
      this.inherited(arguments);
      this.rebuildWidgets();
    },
    clear: function clear() {
      this.inherited(arguments);
      this.destroyWidgets();
    },
    rebuildWidgets: function rebuildWidgets() {
      if (this.metricWidgetsBuilt) {
        return;
      }

      this.destroyWidgets();
      this.metricWidgets = [];

      if (this.options && this.options.simpleMode && this.options.simpleMode === true) {
        return;
      }

      var widgetOptions;
      // Create metrics widgets and place them in the metricNode
      widgetOptions = this.createMetricWidgetsLayout() || [];
      _array['default'].forEach(widgetOptions, function (options) {
        if (this._hasValidOptions(options)) {
          options.returnToId = this.id;

          if (this.groupsMode) {
            options.queryArgs._activeFilter = '';
            options.request = _GroupUtility2['default'].createGroupMetricRequest({
              groupId: this.currentGroupId,
              queryArgs: options.queryArgs
            });
            options.currentSearchExpression = this._currentGroup && this._currentGroup.displayName;
          } else {
            options.request = null;
            options.resourceKind = this.resourceKind;
            options.currentSearchExpression = this.currentSearchExpression;
            options.queryArgs._activeFilter = this._getCurrentQuery();
          }

          var widget = new _MetricWidget2['default'](options);
          widget.placeAt(this.metricNode, 'last');
          widget.requestData();
          this.metricWidgets.push(widget);
        }
      }, this);

      this.metricWidgetsBuilt = true;
    },
    _getCurrentQuery: function _getCurrentQuery() {
      // Get the current query from the search box, and any context query located in options.where
      var query = this.query,
          where = this.options && this.options.where;
      return _array['default'].filter([query, where], function (item) {
        return !!item;
      }).join(' and ');
    },
    _hasValidOptions: function _hasValidOptions(options) {
      return options && options.queryArgs && options.queryArgs._filterName && options.queryArgs._metricName;
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views._MetricListMixin', __class);
  module.exports = __class;
});
