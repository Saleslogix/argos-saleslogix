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
import MetricWidget from './MetricWidget';

/**
 * @class crm.Views._MetricDetailMixin
 * @classdesc Mixin for adding KPI widgets to detail views.
 * @since 3.0
 *
 * @requires crm.Views.MetricWidget
 *
 */
const __class = declare('crm.Views._MetricDetailMixin', null, {
  // Metrics
  metricNode: null,
  metricWidgets: null,
  entityName: '',

  postMixInProperties: function postMixInProperties() {
    this.widgetTemplate = new Simplate([
      '<div id="{%= $.id %}" data-title="{%= $.titleText %}" class="overthrow detail panel {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>',
      '{%! $.loadingTemplate %}',
      '<ul data-dojo-attach-point="metricNode" class="metric-list"></ul>',
      '<div class="panel-content" data-dojo-attach-point="contentNode"></div>',
      '</div>',
    ]);
  },
  postCreate: function postCreate() {
    this.inherited(postCreate, arguments);
  },
  destroyWidgets: function destroyWidgets() {
    if (this.metricWidgets) {
      this.metricWidgets.forEach((widget) => {
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
    this.destroyWidgets();
    this.metricWidgets = [];

    // Create metrics widgets and place them in the metricNode
    const widgetOptions = this.createMetricWidgetsLayout(entry) || [];
    widgetOptions.forEach((options) => {
      if (this.hasValidOptions(options)) {
        const widget = new MetricWidget(options);
        widget.placeAt(this.metricNode, 'last');
        widget.requestData();
        this.metricWidgets.push(widget);
      }
    }, this);
  },
  hasValidOptions: function hasValidOptions(options) {
    return options && options.queryArgs && options.queryArgs._filterName && options.queryArgs._metricName;
  },
});

export default __class;
