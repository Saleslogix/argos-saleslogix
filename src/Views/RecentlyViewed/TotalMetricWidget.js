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
import MODEL_TYPES from 'argos/Models/Types';
import Deferred from 'dojo/Deferred';
import QueryResults from 'dojo/store/util/QueryResults';

export default declare('crm.Views.RecentlyViewed.TotalMetricWidget', [MetricWidget], {
  navToReportView: function navToReportView() {},
  _buildQueryOptions: function _buildQueryOptions() {
    return { returnQueryResults: true };
  },
  _buildQueryExpression: function _buildQueryExpression() {
    const filters = (App.preferences && App.preferences.recentlyViewedEntityFilters) ? App.preferences.recentlyViewedEntityFilters : [];
    return function filter(doc, emit) {
      // If the user has entity filters stored in preferences, filter based on that
      if (filters) {
        filters.forEach((f) => {
          if ((doc.entity.entityName === f.name) && f.enabled) {
            emit(doc.entity);
          }
        });
      } else {
        // User has no entity filter preferences (from right drawer)
        emit(doc.entity);
      }
    };
  },
  _getData: function _getData() {
    const queryOptions = this._buildQueryOptions();
    const queryExpression = this._buildQueryExpression();
    const model = App.ModelManager.getModel('RecentlyViewed', MODEL_TYPES.OFFLINE);
    const queryResults = model.getEntries(queryExpression, queryOptions);
    when(queryResults, lang.hitch(this, this._onQuerySuccessCount, queryResults), lang.hitch(this, this._onQueryError));
  },
  _onQuerySuccessCount: function _onQuerySuccessCount(results) {
    const def = new Deferred();
    when(results.total, (total) => {
      const metricResults = [{
        name: 'count',
        value: total,
      }];
      def.resolve(metricResults);
    });
    this._onQuerySuccess(QueryResults(def.promise)); // eslint-disable-line
  },
});
