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
import string from 'dojo/string';
import convert from 'argos/Convert';
import RelatedViewManager from 'argos/RelatedViewManager';
import DashboardWidget from '../../DashboardWidget';
import getResource from 'argos/I18n';


const resource = getResource('activityDashboardWidget');

const __class = declare('crm.Integrations.BOE.Views.Account.ActivityDashboardWidget', [DashboardWidget], {
  // Localization
  recentText: resource.recentText,
  myPendingText: resource.myPendingText,
  pendingText: resource.pendingText,
  lateText: resource.lateText,
  titleText: resource.titleText,
  categoryText: resource.categoryText,

  // Override variables for _DashboardWidgetBase
  color: '#313236',
  selectedColor: '#50535a',
  dayValue: 7,

  // Codes used for the status of the entity
  openCode: 'Open',
  closedCode: 'Closed',

  resourceKind: 'accounts',
  querySelect: [
    'AccountName',
  ],
  getWhere: function getWhere() {
    return `Id eq '${this.parentEntry.$key}'`;
  },

  createRangeLayout: function createRangeLayout() {
    const rangeLayout = [{
      value: 7,
    }, {
      value: 14,
    }, {
      value: 21,
    }, {
      value: 30,
    }];
    return rangeLayout;
  },
  createMetricLayout: function createMetricLayout(entry) {
    const metricLayout = [{
      navTo: 'account_newquotes_related',
      formatter: 'bigNumber',
      title: this.recentText,
      queryArgs: {
        _activeFilter: `AccountId eq "${entry.$key}" and ${this.pastDays('CreateDate')}`,
        _filterName: 'ActivityType',
        _metricName: 'CountActivities',
      },
      queryName: 'executeMetric',
      resourceKind: 'activities',
      aggregate: 'sum',
      valueType: 'crm/Aggregate',
    }];

    return metricLayout;
  },
  pastDays: function pastDays(property) {
    const now = moment();

    const pastWeekStart = now.clone().subtract(this.dayValue, 'days').startOf('day');
    const today = now.clone().endOf('day');

    const queries = string.substitute(
      `((${property} between @\${0}@ and @\${1}@) or (${property} between @\${2}@ and @\${3}@))`,
      [
        convert.toIsoStringFromDate(pastWeekStart.toDate()),
        convert.toIsoStringFromDate(today.toDate()),
        pastWeekStart.format('YYYY-MM-DDT00:00:00[Z]'),
        today.format('YYYY-MM-DDT23:59:59[Z]'),
      ]
    );
    return queries;
  },
});
const rvm = new RelatedViewManager();
rvm.registerType('account_activity_dashboard_widget', __class);
lang.setObject('icboe.Views.Account.ActivityDashboardWidget', __class);
export default __class;
