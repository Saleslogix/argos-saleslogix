define("crm/Integrations/BOE/DashboardWidget", ["exports", "dojo/_base/declare", "dojo/_base/lang", "argos/RelatedViewManager", "../../Views/MetricWidget", "./DateRangeWidget", "./_DashboardWidgetBase"], function (_exports, _declare, _lang, _RelatedViewManager, _MetricWidget, _DateRangeWidget, _DashboardWidgetBase2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _RelatedViewManager = _interopRequireDefault(_RelatedViewManager);
  _MetricWidget = _interopRequireDefault(_MetricWidget);
  _DateRangeWidget = _interopRequireDefault(_DateRangeWidget);
  _DashboardWidgetBase2 = _interopRequireDefault(_DashboardWidgetBase2);

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
  var __class = (0, _declare["default"])('crm.Integrations.BOE.DashboardWidget', [_DashboardWidgetBase2["default"]], {
    buildView: function buildView(entry) {
      this.destroyWidgets();
      this.metricWidgets = [];
      this.rangeWidgets = [];
      this.createMetricWidgets(entry);
      this.createRangeWidgets();
      this.getQueryData();
    },
    createMetricWidgets: function createMetricWidgets(entry) {
      var _this = this;

      // Create metrics widgets and place them in the metricsNode
      var frag = document.createDocumentFragment();
      var widgetOptions = this.createMetricLayout(entry) || [];
      widgetOptions.forEach(function (options) {
        if (_this.hasValidOptions(options)) {
          // Check if widget has a navigate to view option
          if (options.navTo) {
            var obj = _this.values.filter(_this.checkForValue, options)[0];

            options.navToReportView = _this.navToReportView;
            options.chartType = 'noChart';

            if (!(obj.queryIndex instanceof Array)) {
              // Get the active filter from the query args array and pass it as an option to the widget to be consumed by the navToReportView function
              options.activeFilter = _this.queryArgs[obj.queryIndex][1]._activeFilter;
            }
          }

          var widget = new _MetricWidget["default"](options);
          var itemNode = $(_this.metricItemTemplate.apply(options, _this));
          frag.appendChild(itemNode.get(0));
          $(itemNode).append($(widget)[0].domNode);

          _this.registerWidget(widget);
        }
      });

      if (frag.childNodes.length) {
        $(this.metricsNode).append(frag);
      }
    },
    createRangeWidgets: function createRangeWidgets() {
      var _this2 = this;

      var rangeFrag = document.createDocumentFragment(); // Check if range widgets are desired, if so create and place in rangeNode

      if (this.createRangeLayout) {
        var rangeOptions = this.createRangeLayout() || [];
        rangeOptions.forEach(function (options) {
          options.changeRange = _this2.changeRange;
          options.parent = _this2;
          var widget = new _DateRangeWidget["default"](options);
          var itemNode = $(_this2.rangeItemTemplate.apply(options, _this2)).get(0);

          if (options.value === _this2.dayValue) {
            _this2.selectedRange = itemNode;
          }

          rangeFrag.appendChild(itemNode);
          $(itemNode).append($(widget)[0].domNode);
        });
      }

      if (rangeFrag.childNodes.length) {
        if (!this.selectedRange) {
          this.selectedRange = rangeFrag.childNodes[0];
        }

        this.selectedRange.style['background-color'] = this.getSelectedColor();
        $(this.rangeNode).append(rangeFrag);
      }
    },
    rebuildWidgets: function rebuildWidgets(entry) {
      // this.destroyWidgets();
      $(this.metricsNode).empty();
      this.metricWidgets = [];
      this.rebuildValues();
      this.createMetricWidgets(entry);
      this.getQueryData();
    }
  });

  var rvm = new _RelatedViewManager["default"]();
  rvm.registerType('dashboard_widget', __class);

  _lang["default"].setObject('crm.Views.DashboardWidget', __class);

  var _default = __class;
  _exports["default"] = _default;
});