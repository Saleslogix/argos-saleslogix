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
import _CustomizationMixin from 'argos/_CustomizationMixin';
import getResource from 'argos/I18n';

const resource = getResource('defaultMetrics');

const __class = declare('crm.DefaultMetrics', [_CustomizationMixin], {
  // Localiztion
  accountsText: {
    totalRevenue: resource.totalRevenue,
    averageTime: resource.averageTime,
    total: resource.totalAccounts,
  },
  opportunitiesText: {
    total: resource.totalOpportunities,
    potential: resource.potential,
    montlyPotential: resource.montlyPotential,
  },
  ticketsText: {
    total: resource.totalTickets,
    averageOpen: resource.averageOpen,
  },
  contactsText: {
    total: resource.totalContacts,
  },
  leadsText: {
    total: resource.totalLeads,
  },
  historyText: {
    total: resource.totalHistory,
    duration: resource.duration,
  },
  offlineText: {
    total: resource.totalRecentlyViewed,
  },
  customizationSet: 'metrics',
  id: 'default_metrics',
  getDefinitions: function getDefinitions() {
    return this._createCustomizedLayout(this.createLayout(), 'definitions');
  },
  createLayout: function createLayout() {
    return [{
      resourceKind: 'userActivities',
      children: [{
        title: resource.meetings,
        queryName: 'executeMetric',
        queryArgs: {
          _filterName: 'ActivityType',
          activeFilter: "Activity.Type eq 'atAppointment'",
        },
        activityType: 'atAppointment',
        aggregate: 'sum',
        formatter: 'bigNumber',
        enabled: false,
      }, {
        title: resource.calls,
        queryName: 'executeMetric',
        queryArgs: {
          _filterName: 'ActivityType',
          activeFilter: "Activity.Type eq 'atPhoneCall'",
        },
        activityType: 'atPhoneCall',
        aggregate: 'sum',
        formatter: 'bigNumber',
        enabled: false,
      }, {
        title: resource.todos,
        queryName: 'executeMetric',
        queryArgs: {
          _filterName: 'ActivityType',
          activeFilter: "Activity.Type eq 'atToDo'",
        },
        activityType: 'atToDo',
        aggregate: 'sum',
        formatter: 'bigNumber',
        enabled: false,
      }, {
        title: resource.personal,
        queryName: 'executeMetric',
        queryArgs: {
          _filterName: 'ActivityType',
          activeFilter: "Activity.Type eq 'atPersonal'",
        },
        activityType: 'atPersonal',
        aggregate: 'sum',
        formatter: 'bigNumber',
        enabled: false,
      }],
    }, {
      resourceKind: 'accounts',
      children: [{
        title: this.accountsText.totalRevenue,
        queryName: 'executeMetric',
        queryArgs: {
          _filterName: 'AccountManager',
          _metricName: 'TotalRevenue',
        },
        chartType: 'bar',
        aggregate: 'sum',
        formatter: 'bigNumber',
        enabled: false,
      }, {
        title: this.accountsText.averageTime,
        queryName: 'executeMetric',
        queryArgs: {
          _filterName: 'Type',
          _metricName: 'AverageTimeAsCustomer',
        },
        chartType: 'pie',
        aggregate: 'avg',
        formatter: 'fixedLocale',
        enabled: false,
      }, {
        title: this.accountsText.total,
        queryName: 'executeMetric',
        queryArgs: {
          _filterName: 'AccountManager',
          _metricName: 'CountAccounts',
        },
        chartType: 'bar',
        aggregate: 'sum',
        formatter: 'bigNumber',
        enabled: false,
      }],
    }, {
      resourceKind: 'opportunities',
      children: [{
        title: this.opportunitiesText.total,
        queryName: 'executeMetric',
        queryArgs: {
          _filterName: 'AccountManager',
          _metricName: 'CountOpportunities',
        },
        chartType: 'bar',
        aggregate: 'sum',
        formatter: 'bigNumber',
        enabled: false,
      }, {
        title: this.opportunitiesText.potential,
        queryName: 'executeMetric',
        queryArgs: {
          _filterName: 'AccountManager',
          _metricName: 'SumSalesPotential',
        },
        chartType: 'bar',
        aggregate: 'sum',
        formatter: 'bigNumber',
        enabled: false,
      }, {
        title: this.opportunitiesText.montlyPotential,
        queryName: 'executeMetric',
        queryArgs: {
          _filterName: 'EstimatedClose',
          _metricName: 'SumSalesPotential',
        },
        chartType: 'line',
        aggregate: 'avg',
        formatter: 'bigNumber',
        enabled: false,
      }],
    }, {
      resourceKind: 'tickets',
      children: [{
        title: this.ticketsText.total,
        queryName: 'executeMetric',
        queryArgs: {
          _filterName: 'Category',
          _metricName: 'TicketCount',
        },
        chartType: 'bar',
        aggregate: 'sum',
        formatter: 'bigNumber',
        enabled: false,
      }, {
        title: this.ticketsText.averageOpen,
        queryName: 'executeMetric',
        queryArgs: {
          _filterName: 'AssignedTo',
          _metricName: 'OpenTicketAgingAverage',
        },
        chartType: 'bar',
        aggregate: 'avg',
        formatter: 'fixedLocale',
        enabled: false,
      }],
    }, {
      resourceKind: 'contacts',
      children: [{
        title: this.contactsText.total,
        queryName: 'executeMetric',
        queryArgs: {
          _filterName: 'AccountManager',
          _metricName: 'CountContacts',
        },
        chartType: 'bar',
        aggregate: 'sum',
        formatter: 'bigNumber',
        enabled: false,
      }],
    }, {
      resourceKind: 'leads',
      children: [{
        title: this.leadsText.total,
        queryName: 'executeMetric',
        queryArgs: {
          _filterName: 'Owner',
          _metricName: 'CountLeads',
        },
        chartType: 'bar',
        aggregate: 'sum',
        formatter: 'bigNumber',
        enabled: false,
      }],
    }, {
      resourceKind: 'history',
      children: [{
        title: this.historyText.total,
        queryName: 'executeMetric',
        queryArgs: {
          _filterName: 'Type',
          _metricName: 'CountHistory',
        },
        chartType: 'bar',
        aggregate: 'sum',
        formatter: 'bigNumber',
        enabled: false,
      }, {
        title: this.historyText.duration,
        queryName: 'executeMetric',
        queryArgs: {
          _filterName: 'Type',
          _metricName: 'TotalDuration',
        },
        chartType: 'bar',
        aggregate: 'sum',
        formatter: 'bigNumber',
        enabled: false,
      }],
    }, {
      resourceKind: 'offline',
      children: [{
        title: this.offlineText.total,
        chartType: 'bar',
        aggregate: 'sum',
        formatter: 'bigNumber',
        enabled: false,
      }],
    }];
  },
});

lang.setObject('Mobile.SalesLogix.DefaultMetrics', __class);
export default __class;
