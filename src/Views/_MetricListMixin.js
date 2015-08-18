import declare from 'dojo/_base/declare';
import array from 'dojo/_base/array';
import lang from 'dojo/_base/lang';
import MetricWidget from './MetricWidget';
import GroupUtility from '../GroupUtility';

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
const __class = declare('crm.Views._MetricListMixin', null, {
  // Metrics
  metricNode: null,
  metricWidgets: null,
  configurationView: 'metric_configure',
  entityName: '',

  metricWidgetsBuilt: false,

  postMixInProperties: function postMixInProperties() {
    this.inherited(arguments);
    this.widgetTemplate = new Simplate([
      '<div id="{%= $.id %}" title="{%= $.titleText %}" class="list {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>',
      '<div data-dojo-attach-point="searchNode"></div>',
      '<div class="overthrow scroller" data-dojo-attach-point="scrollerNode">',
      '<div class="metric-list">',
      '<div data-dojo-attach-point="metricNode" class="metric-wrapper"></div>',
      '</div>',
      '{%! $.emptySelectionTemplate %}',
      '<ul class="list-content" data-dojo-attach-point="contentNode"></ul>',
      '{%! $.moreTemplate %}',
      '{%! $.listActionTemplate %}',
      '</div>',
      '</div>',
    ]);
  },
  createMetricWidgetsLayout: function createMetricWidgetsLayout() {
    let metrics = [];
    let filtered = [];

    metrics = App.getMetricsByResourceKind(this.resourceKind);

    if (metrics.length > 0) {
      filtered = array.filter(metrics, function enableFilteredItems(item) {
        return item.enabled;
      });
    }

    return lang.clone(filtered);
  },
  postCreate: function postCreate() {
    this.inherited(arguments);
  },
  destroyWidgets: function destroyWidgets() {
    array.forEach(this.metricWidgets, function destroy(widget) {
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

    if (this.options && this.options.simpleMode && (this.options.simpleMode === true)) {
      return;
    }

    // Create metrics widgets and place them in the metricNode
    const widgetOptions = this.createMetricWidgetsLayout() || [];
    array.forEach(widgetOptions, function createAndPlaceWidgets(options) {
      if (this._hasValidOptions(options)) {
        options.returnToId = this.id;

        if (this.groupsMode) {
          options.queryArgs._activeFilter = '';
          options.request = GroupUtility.createGroupMetricRequest({
            groupId: this.currentGroupId,
            queryArgs: options.queryArgs,
          });
          options.currentSearchExpression = this._currentGroup && this._currentGroup.displayName;
        } else {
          options.request = null;
          options.resourceKind = this.resourceKind;
          options.currentSearchExpression = this.currentSearchExpression;
          options.queryArgs._activeFilter = this._getCurrentQuery();
        }

        const widget = new MetricWidget(options);
        widget.placeAt(this.metricNode, 'last');
        widget.requestData();
        this.metricWidgets.push(widget);
      }
    }, this);

    this.metricWidgetsBuilt = true;
  },
  _getCurrentQuery: function _getCurrentQuery() {
    // Get the current query from the search box, and any context query located in options.where
    const query = this.query;
    const where = this.options && this.options.where;
    return array.filter([query, where], function checkItem(item) {
      return !!item;
    }).join(' and ');
  },
  _hasValidOptions: function _hasValidOptions(options) {
    return options && options.queryArgs && options.queryArgs._filterName && options.queryArgs._metricName;
  },
});

lang.setObject('Mobile.SalesLogix.Views._MetricListMixin', __class);
export default __class;
