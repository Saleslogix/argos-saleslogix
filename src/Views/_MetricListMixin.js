import declare from 'dojo/_base/declare';
import array from 'dojo/_base/array';
import lang from 'dojo/_base/lang';
import domConstruct from 'dojo/dom-construct';
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
  metricTemplate: new Simplate([
    '<div class="metric-list">',
    '<div data-dojo-attach-point="metricNode" class="metric-wrapper"></div>',
    '</div>',
  ]),
  metricNode: null,
  metricWidgets: null,
  entityName: '',

  metricWidgetsBuilt: false,
  metricWidgetCtor: MetricWidget,

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
    this.metricNode = domConstruct.toDom(this.metricTemplate.apply(this));
    domConstruct.place(this.metricNode, this.scrollerNode, 'first');
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
  _applyStateToWidgetOptions: function _applyStateToWidgetOptions(options) {// eslint-disable-line
    if (!this._hasValidOptions(options)) {
      return options;
    }

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
      options.queryArgs._activeFilter = this._getCurrentQuery(options);
    }

    return options;
  },
  _instantiateMetricWidget: function _instantiateWidget(options) {
    const Ctor = this.metricWidgetCtor || MetricWidget;
    return new Ctor(this._applyStateToWidgetOptions(options));
  },
  rebuildWidgets: function rebuildWidgets() {
    if (this.metricWidgetsBuilt) {
      return;
    }

    this.destroyWidgets();

    if (this.options && this.options.simpleMode && (this.options.simpleMode === true)) {
      return;
    }

    // Create metrics widgets and place them in the metricNode
    const widgetOptions = this.createMetricWidgetsLayout() || [];
    this.metricWidgets = widgetOptions.filter((options) => this._hasValidOptions(options))
      .map((options) => {
        const widget = this._instantiateMetricWidget(options);
        widget.placeAt(this.metricNode, 'last');
        widget.requestData();
        return widget;
      });

    this.metricWidgetsBuilt = true;
  },
  _getCurrentQuery: function _getCurrentQuery(options) {
    // Get the current query from the search box, and any context query located in options.where
    const query = this.query;
    const where = this.options && this.options.where;
    const optionsQuery = options && options.queryArgs && options.queryArgs._activeFilter;
    return array.filter([query, where, optionsQuery], function checkItem(item) {
        return !!item;
      })
      .join(' and ');
  },
  _hasValidOptions: function _hasValidOptions(options) {
    return options && options.queryArgs && options.queryArgs._filterName && options.queryArgs._metricName;
  },
});

lang.setObject('Mobile.SalesLogix.Views._MetricListMixin', __class);
export default __class;
