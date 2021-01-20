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

import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import RelatedViewManager from 'argos/RelatedViewManager';
import MetricWidget from '../../Views/MetricWidget';
import DateRangeWidget from './DateRangeWidget';
import _DashboardWidgetBase from './_DashboardWidgetBase';

const __class = declare('crm.Integrations.BOE.DashboardWidget', [_DashboardWidgetBase], {
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
    widgetOptions.forEach((options) => {
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
        const widget = new MetricWidget(options);
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
      rangeOptions.forEach((options) => {
        options.changeRange = this.changeRange;
        options.parent = this;
        const widget = new DateRangeWidget(options);
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
  },
});

const rvm = new RelatedViewManager();
rvm.registerType('dashboard_widget', __class);
lang.setObject('crm.Views.DashboardWidget', __class);
export default __class;
