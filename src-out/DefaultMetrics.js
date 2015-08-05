define('crm/DefaultMetrics', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/_CustomizationMixin'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _argos_CustomizationMixin) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  /*
   * Copyright (c) 1997-2014, SalesLogix, NA., LLC. All rights reserved.
   */

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _CustomizationMixin2 = _interopRequireDefault(_argos_CustomizationMixin);

  var __class = (0, _declare['default'])('crm.DefaultMetrics', [_CustomizationMixin2['default']], {
    // Localiztion
    accountsText: {
      totalRevenue: 'Total Revenue',
      averageTime: 'Avg Time as Customer',
      total: 'Total Accounts'
    },
    opportunitiesText: {
      total: 'Total Opportunities',
      potential: 'Total Sales Potential',
      montlyPotential: 'Average Monthly Sales Potential'
    },
    ticketsText: {
      total: 'Total Tickets',
      averageOpen: 'Open Age Average'
    },
    contactsText: {
      total: 'Total Contacts'
    },
    leadsText: {
      total: 'Total Leads'
    },
    historyText: {
      total: 'Total History',
      duration: 'Total Duration'
    },
    customizationSet: 'metrics',
    id: 'default_metrics',
    getDefinitions: function getDefinitions() {
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
            _metricName: 'TotalRevenue'
          },
          chartType: 'bar',
          aggregate: 'sum',
          formatter: 'bigNumber',
          enabled: false
        }, {
          title: this.accountsText.averageTime,
          queryName: 'executeMetric',
          queryArgs: {
            _filterName: 'Type',
            _metricName: 'AverageTimeAsCustomer'
          },
          chartType: 'pie',
          aggregate: 'avg',
          formatter: 'fixedLocale',
          enabled: false
        }, {
          title: this.accountsText.total,
          queryName: 'executeMetric',
          queryArgs: {
            '_filterName': 'AccountManager',
            '_metricName': 'CountAccounts'
          },
          chartType: 'bar',
          aggregate: 'sum',
          formatter: 'bigNumber',
          enabled: false
        }]
      }, {
        resourceKind: 'opportunities',
        children: [{
          title: this.opportunitiesText.total,
          queryName: 'executeMetric',
          queryArgs: {
            _filterName: 'AccountManager',
            _metricName: 'CountOpportunities'
          },
          chartType: 'bar',
          aggregate: 'sum',
          formatter: 'bigNumber',
          enabled: false
        }, {
          title: this.opportunitiesText.potential,
          queryName: 'executeMetric',
          queryArgs: {
            _filterName: 'AccountManager',
            _metricName: 'SumSalesPotential'
          },
          chartType: 'bar',
          aggregate: 'sum',
          formatter: 'bigNumber',
          enabled: false
        }, {
          title: this.opportunitiesText.montlyPotential,
          queryName: 'executeMetric',
          queryArgs: {
            _filterName: 'EstimatedClose',
            _metricName: 'SumSalesPotential'
          },
          chartType: 'line',
          aggregate: 'avg',
          formatter: 'bigNumber',
          enabled: false
        }]
      }, {
        resourceKind: 'tickets',
        children: [{
          title: this.ticketsText.total,
          queryName: 'executeMetric',
          queryArgs: {
            _filterName: 'Category',
            _metricName: 'TicketCount'
          },
          chartType: 'bar',
          aggregate: 'sum',
          formatter: 'bigNumber',
          enabled: false
        }, {
          title: this.ticketsText.averageOpen,
          queryName: 'executeMetric',
          queryArgs: {
            _filterName: 'AssignedTo',
            _metricName: 'OpenTicketAgingAverage'
          },
          chartType: 'bar',
          aggregate: 'avg',
          formatter: 'fixedLocale',
          enabled: false
        }]
      }, {
        resourceKind: 'contacts',
        children: [{
          title: this.contactsText.total,
          queryName: 'executeMetric',
          queryArgs: {
            _filterName: 'AccountManager',
            _metricName: 'CountContacts'
          },
          chartType: 'bar',
          aggregate: 'sum',
          formatter: 'bigNumber',
          enabled: false
        }]
      }, {
        resourceKind: 'leads',
        children: [{
          title: this.leadsText.total,
          queryName: 'executeMetric',
          queryArgs: {
            _filterName: 'Owner',
            _metricName: 'CountLeads'
          },
          chartType: 'bar',
          aggregate: 'sum',
          formatter: 'bigNumber',
          enabled: false
        }]
      }, {
        resourceKind: 'history',
        children: [{
          title: this.historyText.total,
          queryName: 'executeMetric',
          queryArgs: {
            _filterName: 'Type',
            _metricName: 'CountHistory'
          },
          chartType: 'bar',
          aggregate: 'sum',
          formatter: 'bigNumber',
          enabled: false
        }, {
          title: this.historyText.duration,
          queryName: 'executeMetric',
          queryArgs: {
            _filterName: 'Type',
            _metricName: 'TotalDuration'
          },
          chartType: 'bar',
          aggregate: 'sum',
          formatter: 'bigNumber',
          enabled: false
        }]
      }];
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.DefaultMetrics', __class);
  module.exports = __class;
});
