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
                    queryName: "executeMetric",
                    queryArgs: {
                        _filterName: "AccountManager",
                        _metricName: "TotalRevenue"
                    },
                    metricDisplayName: "Total Revenue",
                    filterDisplayName: "Account Manager",
                    chartType: "bar",
                    aggregate: "sum",
                    formatter: "bigNumber",
                    enabled: false
                }, {
                    title: this.accountsText.averageTime,
                    queryName: "executeMetric",
                    queryArgs: {
                        _filterName: "Type",
                        _metricName: "AverageTimeAsCustomer"
                    },
                    metricDisplayName: "Average Time as Customer",
                    filterDisplayName: "Type",
                    chartType: "pie",
                    aggregate: "avg",
                    formatter: "fixedLocale",
                    enabled: false
                }, {
                    title: this.accountsText.total,
                    queryName: "executeMetric",
                    queryArgs: {
                        "_filterName": "AccountManager",
                        "_metricName": "CountAccounts"
                    },
                    metricDisplayName: "Count Accounts",
                    filterDisplayName: "Account Manager",
                    chartType: "bar",
                    aggregate: "sum",
                    formatter: "bigNumber",
                    enabled: false
                }]
            }, {
                resourceKind: 'opportunities',
                children: [{
                    title: this.opportunitiesText.total,
                    queryName: "executeMetric",
                    queryArgs: {
                        _filterName: "AccountManager",
                        _metricName: "CountOpportunities"
                    },
                    metricDisplayName: "Count Opportunities",
                    filterDisplayName: "Account Manager",
                    chartType: "bar",
                    aggregate: "sum",
                    formatter: "bigNumber",
                    enabled: false
                }, {
                    title: this.opportunitiesText.potential,
                    queryName: "executeMetric",
                    queryArgs: {
                        _filterName: "AccountManager",
                        _metricName: "SumSalesPotential"
                    },
                    metricDisplayName: "Sum Sales Potential",
                    filterDisplayName: "Account Manager",
                    chartType: "bar",
                    aggregate: "sum",
                    formatter: "bigNumber",
                    enabled: false
                }, {
                    title: this.opportunitiesText.montlyPotential,
                    queryName: "executeMetric",
                    queryArgs: {
                        _filterName: "EstimatedClose",
                        _metricName: "SumSalesPotential"
                    },
                    metricDisplayName: "Sum Sales Potential",
                    filterDisplayName: "Estimated Close",
                    chartType: "line",
                    aggregate: "avg",
                    formatter: "bigNumber",
                    enabled: false
                }
                ]
            }, {
                resourceKind: 'tickets',
                children: [{
                    title: this.ticketsText.total,
                    queryName: "executeMetric",
                    queryArgs: {
                        _filterName: "Category",
                        _metricName: "TicketCount"
                    },
                    metricDisplayName: "Ticket Count",
                    filterDisplayName: "Category",
                    chartType: "bar",
                    aggregate: "sum",
                    formatter: "bigNumber",
                    enabled: false
                }, {
                    title: this.ticketsText.averageOpen,
                    queryName: "executeMetric",
                    queryArgs: {
                        _filterName: "AssignedTo",
                        _metricName: "OpenTicketAgingAverage"
                    },
                    metricDisplayName: "Open Ticket Aging Average",
                    filterDisplayName: "Assigned To",
                    chartType: "bar",
                    aggregate: "avg",
                    formatter: "fixedLocale",
                    enabled: false
                }]
            }, {
                resourceKind: 'contacts',
                children: [{
                    title: this.contactsText.total,
                    queryName: "executeMetric",
                    queryArgs: {
                        _filterName: "AccountManager",
                        _metricName: "CountContacts"
                    },
                    metricDisplayName: "Count Contacts",
                    filterDisplayName: "Account Manager",
                    chartType: "bar",
                    aggregate: "sum",
                    formatter: "bigNumber",
                    enabled: true
                }]
            }, {
                resourceKind: 'leads',
                children: [{
                        title: this.leadsText.total,
                        queryName: "executeMetric",
                        queryArgs: {
                            _filterName: "Owner",
                            _metricName: "CountLeads"
                        },
                        metricDisplayName: "Count Leads",
                        filterDisplayName: "Owner",
                        chartType: "bar",
                        aggregate: "sum",
                        formatter: "bigNumber",
                        enabled: false
                }]
            }, {
                resourceKind: 'history',
                children: [{
                        title: this.historyText.total,
                        queryName: "executeMetric",
                        queryArgs: {
                            _filterName: "Type",
                            _metricName: "CountHistory"
                        },
                        metricDisplayName: "Count History",
                        filterDisplayName: "Type",
                        chartType: "bar",
                        aggregate: "sum",
                        formatter: "bigNumber",
                        enabled: true
                    }, {
                        title: this.historyText.duration,
                        queryName: "executeMetric",
                        queryArgs: {
                            _filterName: "Type",
                            _metricName: "TotalDuration"
                        },
                        metricDisplayName: "Total Duration",
                        filterDisplayName: "Type",
                        chartType: "bar",
                        aggregate: "sum",
                        formatter: "bigNumber",
                        enabled: true
                }]
            }];
        }
    });

    lang.setObject('Mobile.SalesLogix.DefaultMetrics', __class);
    return __class;

});
