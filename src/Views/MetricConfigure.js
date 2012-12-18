define('Mobile/SalesLogix/Views/MetricConfigure', [
       'dojo/_base/declare',
       'dojo/_base/array',
       'Sage/Platform/Mobile/Edit'
],function(
    declare,
    array,
    Edit
) {
    return declare('Mobile.SalesLogix.Views.MetricConfigure', [Edit], {
        titleText: 'Configure Metric',
        id: 'metric_configure',
        expose: false,

        resourceKind: '',

        metricTitleText: 'Title',
        metricFilterText: 'Filter',
        metricText: 'Metric',
        chartTypeText: 'Chart Type (bar, pie)',
        metricQueryText: 'SData query filter',
        metricsSupported: 3,

        createToolLayout: function() {
            return this.tools || (this.tools = {
                tbar: [{
                    id: 'save',
                    action: 'saveMetricPref'
                }]
            });
        },
        createLayout: function() {
            if (this.layout) {
                return this.layout;
            }

            var i, key;

            this.layout = [];
            for (i = 0; i < this.metricsSupported; i++) {
                key = 'metric' + i;

                this.layout.push({
                    title: this.metricText + ' ' + (i + 1),
                    children: [
                        {
                            name: key + '-title',
                            label: this.metricTitleText,
                            type: 'text'
                        },{
                            name: key + '-filter',
                            label: this.metricFilterText,
                            type: 'text'
                        },{
                            name: key + '-metric',
                            label: this.metricText,
                            type: 'text'
                        },{
                            name: key + '-query',
                            label: this.metricQueryText,
                            type: 'text'
                        },{
                            name: key + '-chartType',
                            label: this.chartTypeText,
                            type: 'text'
                        }
                    ]
                });
            }

            return this.layout;
        },
        refresh: function() {
            this.inherited(arguments);
            var metrics = App.preferences.metrics[this.resourceKind];

            array.forEach(metrics, function(item, i) {
                var o = {};
                o['metric' + i + '-title'] = item.metricTitleText;
                o['metric' + i + '-filter'] = item.queryArgs._filterName;
                o['metric' + i + '-metric'] = item.queryArgs._metricName;
                o['metric' + i + '-query'] = item.queryArgs._activeFilter;
                o['metric' + i + '-chartType'] = item.chartType;
                this.setValues(o, true);
            }, this);
        },
        saveMetricPref: function() {
            var values = this.getValues();
            App.preferences.metrics = App.preferences.metrics || {};

            var i, key, items = [];

            for (i = 0; i < this.metricsSupported; i++) {
                key = 'metric' + i;

                items.push({
                    resourceKind: this.resourceKind,
                    metricTitleText: this.fields['metric' + i + '-title'].getValue(),//'Open Sales Potential',
                    queryName: 'executeMetric',
                    queryArgs: {
                        '_filterName': this.fields['metric' + i + '-filter'].getValue(), //'Stage',
                        '_metricName': this.fields['metric' + i + '-metric'].getValue(), //'SumSalesPotential',
                        '_activeFilter': this.fields['metric' + i + '-query'].getValue() //'Closed eq false'
                    },
                    formatType: 'Mobile/SalesLogix/Format',
                    formatFunc: 'bigNumber',
                    //reportViewId: 'chart_generic_pie',
                    chartType: this.fields['metric' + i + '-chartType'].getValue() //'pie'
                });
            }

            App.preferences.metrics[this.resourceKind] = items;

            /*App.preferences.metrics[this.resourceKind] = [
                {
                    resourceKind: this.resourceKind,
                    metricTitleText: 'Open Sales Potential',
                    queryName: 'executeMetric',
                    queryArgs: {
                        '_filterName': 'Stage',
                        '_metricName': 'SumSalesPotential',
                        '_activeFilter': 'Closed eq false'
                    },
                    formatType: 'Mobile/SalesLogix/Format',
                    formatFunc: 'bigNumber',
                    //reportViewId: 'chart_generic_pie',
                    chartType: 'pie'
                },{
                    resourceKind: this.resourceKind,
                    metricTitleText: 'Actual Amount',
                    queryName: 'executeMetric',
                    queryArgs: {
                        '_filterName': 'AccountManager',
                        '_metricName': 'SumActualAmount'
                    },
                    formatType: 'Mobile/SalesLogix/Format',
                    formatFunc: 'bigNumber',
                    //reportViewId: 'chart_generic_bar',
                    chartType: 'bar'
                },{
                    resourceKind: this.resourceKind,
                    metricTitleText: 'Open Opportunities',
                    queryName: 'executeMetric',
                    queryArgs: {
                        '_filterName': 'AccountManager',
                        '_metricName': 'CountOpportunities',
                        '_activeFilter': 'Closed ne true'
                    },
                    formatType: 'Mobile/SalesLogix/Format',
                    formatFunc: 'bigNumber',
                    //reportViewId: 'chart_generic_bar',
                    chartType: 'bar'
                }
            ];*/

            App.persistPreferences();
            ReUI.back();
        },
    });
});
