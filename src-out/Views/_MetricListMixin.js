define('crm/Views/_MetricListMixin', ['module', 'exports', 'dojo/_base/declare', './MetricWidget', '../GroupUtility'], function (module, exports, _declare, _MetricWidget, _GroupUtility) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _MetricWidget2 = _interopRequireDefault(_MetricWidget);

  var _GroupUtility2 = _interopRequireDefault(_GroupUtility);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @class
   * @alias module:crm/Views/_MetricListMixin
   * @mixin
   * @classdesc Mixin for adding KPI widgets to list views.
   * @since 3.0
   */
  const __class = (0, _declare2.default)('crm.Views._MetricListMixin', null, /** @lends module:crm/Views/_MetricListMixin.prototype */{
    // Metrics
    metricTemplate: new Simplate(['<div class="metric-list">', '</div>']),
    metricWrapper: new Simplate(['<div data-dojo-attach-point="metricNode" class="metric-wrapper"></div>']),
    metricNode: null,
    metricWidgets: null,
    entityName: '',

    metricWidgetsBuilt: false,
    metricWidgetCtor: _MetricWidget2.default,
    rebuildingWidgets: false,

    createMetricWidgetsLayout: function createMetricWidgetsLayout() {
      const metrics = App.getMetricsByResourceKind(this.resourceKind);
      return metrics.filter(item => item.enabled);
    },
    postCreate: function postCreate() {
      this.inherited(postCreate, arguments);
      const metricList = $(this.metricTemplate.apply(this)).get(0);
      this.metricNode = $(this.metricWrapper.apply(this)).get(0);
      $(metricList).append(this.metricNode);
      $(this.scrollerNode).prepend(metricList);
    },
    destroyWidgets: function destroyWidgets() {
      if (this.metricWidgets) {
        this.metricWidgets.forEach(widget => {
          widget.destroy();
        });
      }

      this.metricWidgetsBuilt = false;
    },
    requestData: function requestData() {
      this.inherited(requestData, arguments);
      this.rebuildWidgets();
    },
    clear: function clear() {
      this.inherited(clear, arguments);
      this.destroyWidgets();
    },
    _applyStateToWidgetOptions: function _applyStateToWidgetOptions(options) {
      // eslint-disable-line
      if (!this._hasValidOptions(options)) {
        return options;
      }

      options.returnToId = this.id;

      if (this.groupsMode) {
        options.queryArgs._activeFilter = '';
        options.request = _GroupUtility2.default.createGroupMetricRequest({
          groupId: this.currentGroupId,
          queryArgs: options.queryArgs
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
      return new Promise(resolve => {
        const Ctor = this.metricWidgetCtor || _MetricWidget2.default;
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

      if (this.options && this.options.simpleMode && this.options.simpleMode === true) {
        return;
      }

      // Create metrics widgets and place them in the metricNode
      const widgetOptions = this.createMetricWidgetsLayout() || [];
      const widgets = widgetOptions.filter(options => this._hasValidOptions(options)).map(options => {
        const clonedOptions = Object.assign({}, options);
        return this._instantiateMetricWidget(clonedOptions).then(widget => {
          widget.placeAt(this.metricNode, 'last');
          widget.requestData();
          return widget;
        });
      });

      Promise.all(widgets).then(results => {
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
      return [query, where, optionsQuery].filter(item => {
        return !!item;
      }).join(' and ');
    },
    _hasValidOptions: function _hasValidOptions(options) {
      return options && options.queryArgs && options.queryArgs._filterName;
    }
  }); /* Copyright 2017 Infor
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *    http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */

  /**
   * @module crm/Views/_MetricListMixin
   */
  exports.default = __class;
  module.exports = exports['default'];
});