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
import MyDayMetricWidget from './MyDayMetricWidget';
import _MetricListMixin from '../_MetricListMixin';
/**
 * @class crm.Views.Activity.MyDayMetricListMixin
 *
 *
 * @requires crm.Views.MetricWidget
 * @extends crm.Views._MetricListMixin
 *
 */
const __class = declare('crm.Views.Activity.MyDayMetricListMixin', [_MetricListMixin], {

  metricWidgetCtor: MyDayMetricWidget,
  _applyStateToWidgetOptions: function _applyStateToWidgetOptions(widgetOptions) {
    const options = widgetOptions;
    options.parent = this;
    return options;
  },
  createMetricWidgetsLayout: function createMetricWidgetsLayout() {
    let metrics = [];
    let filtered = [];

    metrics = App.getMetricsByResourceKind('userActivities');

    if (metrics.length > 0) {
      filtered = metrics.filter((item) => {
        return item.enabled;
      });
    }

    return lang.clone(filtered);
  },
});
export default __class;
