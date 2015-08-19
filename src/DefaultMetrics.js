/*
 * Copyright (c) 1997-2014, SalesLogix, NA., LLC. All rights reserved.
 */
import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _CustomizationMixin from 'argos/_CustomizationMixin';
import Utility from 'argos/Utility';

const __class = declare('crm.DefaultMetrics', [_CustomizationMixin], {
  // Localization
  localeId: 'defaultMetrics',
  accountsText: {
  },
  accountsKeys: [
    'totalRevenue',
    'averageTime',
    'total',
  ],
  accountsValues: null,
  opportunitiesText: {
  },
  opportunitiesKeys: [
    'total',
    'potential',
    'monthlyPotential',
  ],
  opportunitiesValues: null,
  ticketsText: {
  },
  ticketsKeys: [
    'total',
    'averageOpen',
  ],
  ticketsValues: null,
  contactsText: {
  },
  contactsKeys: [
    'total',
  ],
  contactsValues: null,
  leadsText: {
  },
  leadsKeys: [
    'total',
  ],
  leadsValues: null,
  historyText: {
  },
  historyKeys: [
    'total',
    'duration',
  ],
  historyValues: null,
  customizationSet: 'metrics',
  id: 'default_metrics',
  getDefinitions: function getDefinitions() {
    if (!this.accountsValues) {
      this.accountsValues = [
        this.totalRevenue,
        this.averageTime,
        this.totalAccounts,
      ];
      Utility.extendObjectKeyValue(this.accountsText, this.accountsKeys, this.accountsValues);
    }
    if (!this.opportunitiesValues) {
      this.opportunitiesValues = [
        this.totalOpportunities,
        this.potential,
        this.montlyPotential,
      ];
      Utility.extendObjectKeyValue(this.opportunitiesText, this.opportunitiesKeys, this.opportunitiesValues);
    }
    if (!this.ticketsValues) {
      this.ticketsValues = [
        this.totalTickets,
        this.averageOpen,
      ];
      Utility.extendObjectKeyValue(this.ticketsText, this.ticketsKeys, this.ticketsValues);
    }
    if (!this.contactsValues) {
      this.contactsValues = [
        this.totalContacts,
      ];
      Utility.extendObjectKeyValue(this.contactsText, this.contactsKeys, this.contactsValues);
    }
    if (!this.leadsValues) {
      this.leadsValues = [
        this.totalLeads,
      ];
      Utility.extendObjectKeyValue(this.leadsText, this.leadsKeys, this.leadsValues);
    }
    if (!this.historyValues) {
      this.historyValues = [
        this.totalHistory,
        this.duration,
      ];
      Utility.extendObjectKeyValue(this.historyText, this.historyKeys, this.historyValues);
    }
    return this._createCustomizedLayout(this.createLayout(), 'definitions');
  },
  createLayout: function createLayout() {
    return [{
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
          '_filterName': 'AccountManager',
          '_metricName': 'CountAccounts',
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
    }];
  },
});

lang.setObject('Mobile.SalesLogix.DefaultMetrics', __class);
export default __class;
