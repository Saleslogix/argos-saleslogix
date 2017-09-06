import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import MetricWidget from './MetricWidget';
import GroupUtility from '../GroupUtility';


/**
 * @class crm.Views._MetricListMixin
 * @classdesc Mixin for adding KPI widgets to list views.
 * @since 3.0
 *
 * @requires crm.Views.MetricWidget
 *
 */
const __class = declare('crm.Views._MetricListMixin', null, {
  // Metrics
  metricTemplate: new Simplate([
    '<div class="metric-list">',
    '</div>',
  ]),
  metricWrapper: new Simplate([
    '<div data-dojo-attach-point="metricNode" class="metric-wrapper"></div>',
  ]),
  metricNode: null,
  metricWidgets: null,
  entityName: '',

  metricWidgetsBuilt: false,
  metricWidgetCtor: MetricWidget,
  rebuildingWidgets: false,

  createMetricWidgetsLayout: function createMetricWidgetsLayout() {
    const metrics = App.getMetricsByResourceKind(this.resourceKind);
    return metrics.filter(item => item.enabled);
  },
  postCreate: function postCreate() {
    this.inherited(arguments);
    const metricList = $(this.metricTemplate.apply(this)).get(0);
    this.metricNode = $(this.metricWrapper.apply(this)).get(0);
    $(metricList).append(this.metricNode);
    $(this.scrollerNode).prepend(metricList);
  },
  destroyWidgets: function destroyWidgets() {
    if (this.metricWidgets) {
      this.metricWidgets.forEach((widget) => {
        widget.destroy();
      });
    }

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
      if (options.queryArgs) {
        options.queryArgs._activeFilter = this._getCurrentQuery(options);
      }
    }

    return options;
  },
  _instantiateMetricWidget: function _instantiateMetricWidget(options) {
    return new Promise((resolve) => {
      const Ctor = this.metricWidgetCtor || MetricWidget;
      const instance = new Ctor(this._applyStateToWidgetOptions(options));
      resolve(instance);
    });
  },
  rebuildWidgets: function rebuildWidgets() {
    if (this.metricWidgetsBuilt || this.rebuildingWidgets) {
      return;
    }
    this.rebuildingWidgets = true;
    this.destroyWidgets();

    if (this.options && this.options.simpleMode && (this.options.simpleMode === true)) {
      return;
    }

    // Create metrics widgets and place them in the metricNode
    const widgetOptions = this.createMetricWidgetsLayout() || [];
    const widgets = widgetOptions.filter(options => this._hasValidOptions(options))
      .map((options) => {
        const clonedOptions = Object.assign({}, options);
        return this._instantiateMetricWidget(clonedOptions).then((widget) => {
          widget.placeAt(this.metricNode, 'last');
          widget.requestData();
          return widget;
        });
      });

    Promise.all(widgets).then((results) => {
      this.metricWidgets = results;
      this.metricWidgetsBuilt = true;
      this.rebuildingWidgets = false;
    });
  },
  _getCurrentQuery: function _getCurrentQuery(options) {
    // Get the current query from the search box, and any context query located in options.where
    const query = this.query;
    const where = this.options && this.options.where;
    const optionsQuery = options && options.queryArgs && options.queryArgs.activeFilter;
    return [query, where, optionsQuery].filter((item) => {
      return !!item;
    })
      .join(' and ');
  },
  _hasValidOptions: function _hasValidOptions(options) {
    return (options && options.queryArgs && options.queryArgs._filterName);
  },
});

lang.setObject('Mobile.SalesLogix.Views._MetricListMixin', __class);
export default __class;
