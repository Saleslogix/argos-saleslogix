define("crm/Views/_MetricDetailMixin", ["exports", "dojo/_base/declare", "./MetricWidget"], function (_exports, _declare, _MetricWidget) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _MetricWidget = _interopRequireDefault(_MetricWidget);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  /* Copyright 2017 Infor
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
   * @module crm/Views/_MetricDetailMixin
   */

  /**
   * @class
   * @alias module:crm/Views/_MetricDetailMixin
   * @mixin
   * @classdesc Mixin for adding KPI widgets to detail views.
   * @since 3.0
   *
   */
  var __class = (0, _declare["default"])('crm.Views._MetricDetailMixin', null,
  /** @lends module:crm/Views/_MetricDetailMixin.prototype */
  {
    // Metrics
    metricNode: null,
    metricWidgets: null,
    entityName: '',
    postMixInProperties: function postMixInProperties() {
      this.widgetTemplate = new Simplate(['<div id="{%= $.id %}" data-title="{%= $.titleText %}" class="overthrow detail panel {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>', '{%! $.loadingTemplate %}', '<ul data-dojo-attach-point="metricNode" class="metric-list"></ul>', '<div class="panel-content" data-dojo-attach-point="contentNode"></div>', '</div>']);
    },
    postCreate: function postCreate() {
      this.inherited(postCreate, arguments);
    },
    destroyWidgets: function destroyWidgets() {
      if (this.metricWidgets) {
        this.metricWidgets.forEach(function (widget) {
          widget.destroy();
        });
      }
    },
    processEntry: function processEntry(entry) {
      this.inherited(processEntry, arguments);
      this.rebuildWidgets(entry);
    },
    createMetricWidgetsLayout: function createMetricWidgetsLayout() {},
    rebuildWidgets: function rebuildWidgets(entry) {
      var _this = this;

      this.destroyWidgets();
      this.metricWidgets = []; // Create metrics widgets and place them in the metricNode

      var widgetOptions = this.createMetricWidgetsLayout(entry) || [];
      widgetOptions.forEach(function (options) {
        if (_this.hasValidOptions(options)) {
          var widget = new _MetricWidget["default"](options);
          widget.placeAt(_this.metricNode, 'last');
          widget.requestData();

          _this.metricWidgets.push(widget);
        }
      }, this);
    },
    hasValidOptions: function hasValidOptions(options) {
      return options && options.queryArgs && options.queryArgs._filterName && options.queryArgs._metricName;
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});