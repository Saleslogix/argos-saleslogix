/*
 * Copyright (c) 1997-2014, SalesLogix, NA., LLC. All rights reserved.
 */

define('crm/DefaultMetrics', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'argos/_CustomizationMixin'
], function(
    declare,
    lang,
    _CustomizationMixin
) {
    var __class = declare('crm.DefaultMetrics', [_CustomizationMixin], {
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
        getDefinitions: function() {
            return this._createCustomizedLayout(this.createLayout(), 'definitions');
        },
        createLayout: function() {
            return [
            {
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
                }
                ]
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

    lang.setObject('Mobile.SalesLogix.DefaultMetrics', __class);
    return __class;

});
