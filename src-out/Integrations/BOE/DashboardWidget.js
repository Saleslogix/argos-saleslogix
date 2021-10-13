define('crm/Integrations/BOE/DashboardWidget', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/RelatedViewManager', '../../Views/MetricWidget', './DateRangeWidget', './_DashboardWidgetBase'], function (module, exports, _declare, _lang, _RelatedViewManager, _MetricWidget, _DateRangeWidget, _DashboardWidgetBase2) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _RelatedViewManager2 = _interopRequireDefault(_RelatedViewManager);

  var _MetricWidget2 = _interopRequireDefault(_MetricWidget);

  var _DateRangeWidget2 = _interopRequireDefault(_DateRangeWidget);

  var _DashboardWidgetBase3 = _interopRequireDefault(_DashboardWidgetBase2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  const __class = (0, _declare2.default)('crm.Integrations.BOE.DashboardWidget', [_DashboardWidgetBase3.default], {
    buildView: function buildView(entry) {
      this.destroyWidgets();
      this.metricWidgets = [];
      this.rangeWidgets = [];
      this.createMetricWidgets(entry);
      this.createRangeWidgets();
      this.getQueryData();
    },
    createMetricWidgets: function createMetricWidgets(entry) {
      // Create metrics widgets and place them in the metricsNode
      const frag = document.createDocumentFragment();
      const widgetOptions = this.createMetricLayout(entry) || [];
      widgetOptions.forEach(options => {
        if (this.hasValidOptions(options)) {
          // Check if widget has a navigate to view option
          if (options.navTo) {
            const obj = this.values.filter(this.checkForValue, options)[0];
            options.navToReportView = this.navToReportView;
            options.chartType = 'noChart';
            if (!(obj.queryIndex instanceof Array)) {
              // Get the active filter from the query args array and pass it as an option to the widget to be consumed by the navToReportView function
              options.activeFilter = this.queryArgs[obj.queryIndex][1]._activeFilter;
            }
          }
          const widget = new _MetricWidget2.default(options);
          const itemNode = $(this.metricItemTemplate.apply(options, this));
          frag.appendChild(itemNode.get(0));
          $(itemNode).append($(widget)[0].domNode);
          this.registerWidget(widget);
        }
      });
      if (frag.childNodes.length) {
        $(this.metricsNode).append(frag);
      }
    },
    createRangeWidgets: function createRangeWidgets() {
      const rangeFrag = document.createDocumentFragment();
      // Check if range widgets are desired, if so create and place in rangeNode
      if (this.createRangeLayout) {
        const rangeOptions = this.createRangeLayout() || [];
        rangeOptions.forEach(options => {
          options.changeRange = this.changeRange;
          options.parent = this;
          const widget = new _DateRangeWidget2.default(options);
          const itemNode = $(this.rangeItemTemplate.apply(options, this)).get(0);
          if (options.value === this.dayValue) {
            this.selectedRange = itemNode;
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

  const rvm = new _RelatedViewManager2.default();
  rvm.registerType('dashboard_widget', __class);
  _lang2.default.setObject('crm.Views.DashboardWidget', __class);
  exports.default = __class;
  module.exports = exports['default'];
});