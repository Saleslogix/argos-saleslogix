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

import MetricWidget from '../MetricWidget';
import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import when from 'dojo/when';
import Deferred from 'dojo/Deferred';
import MODEL_TYPES from 'argos/Models/Types';
import QueryResults from 'dojo/store/util/QueryResults';

export default declare('crm.Views.Activity.MyDayMetricWidget', [MetricWidget], {
  navToReportView: function navToReportView() {},
  activityType: '',
  _buildQueryOptions: function _buildQueryOptions() {
    const self = this;
    return {
      returnQueryResults: true,
      filter: (entity) => {
        if (entity.Type === self.activityType) {
          if (self.parent) {
            const filter = self.parent.getCurrentFilter();
            if (filter && filter.fn) {
              const result = filter.fn.apply(self.parent, [entity]);
              if (result) {
                return true;
              }
              return false;
            }
          }
          return true;
        }

        return false;
      },
    };
  },
  _getData: function _getData() {
    const queryOptions = this._buildQueryOptions();
    const model = App.ModelManager.getModel('Activity', MODEL_TYPES.OFFLINE);
    const queryResults = model.getEntries(null, queryOptions);
    when(queryResults, lang.hitch(this, this._onQuerySuccessCount, queryResults), lang.hitch(this, this._onQueryError));
  },
  _onQuerySuccessCount: function _onQuerySuccessCount(results) {
    const def = new Deferred();
    when(results.total, (total) => {
      const metricResults = [{
        name: this.activityType,
        value: total,
      }];
      def.resolve(metricResults);
    });
    this._onQuerySuccess(QueryResults(def.promise)); // eslint-disable-line
  },
});
