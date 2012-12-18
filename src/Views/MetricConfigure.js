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

        metricTitleText: 'title',
        metricFilterText: 'filter',
        metricText: 'metric',
        chartTypeText: 'chart type',
        metricQueryText: 'sdata query filter',
        advancedText: 'advanced options',
        formatTypeText: 'format type',
        formatFuncText: 'format function',
        valueTypeText: 'value type',
        valueFuncText: 'value function',
        reportViewText: 'chart view id',
        metricsSupported: 3,

        // Default advanced options
        defaultFormatType: 'Mobile/SalesLogix/Format',
        defaultFormatFunc: 'bigNumber',
        defaultValueType: 'Mobile/SalesLogix/Aggregate',
        defaultValueFunc: 'sum',

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
                            name: key + '-metric',
                            label: this.metricText,
                            type: 'text'
                        },{
                            name: key + '-filter',
                            label: this.metricFilterText,
                            type: 'text'
                        },{
                            name: key + '-chartType',
                            label: this.chartTypeText,
                            type: 'text'
                        },{
                            title: this.metricText + ' ' + (i + 1) + ' ' + this.advancedText,
                            collapsed: true,
                            children: [
                                {
                                    name: key + '-query',
                                    label: this.metricQueryText,
                                    type: 'text'
                                },{
                                    name: key + '-formatType',
                                    label: this.formatTypeText,
                                    type: 'text'
                                },{
                                    name: key + '-formatFunc',
                                    label: this.formatFuncText,
                                    type: 'text'
                                },{
                                    name: key + '-valueType',
                                    label: this.valueTypeText,
                                    type: 'text'
                                },{
                                    name: key + '-valueFunc',
                                    label: this.valueFuncText,
                                    type: 'text'
                                },{
                                    name: key + '-reportViewId',
                                    label: this.reportViewText, 
                                    type: 'text'
                                }
                            ]
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
                o['metric' + i + '-reportViewId'] = item.reportViewId;
                o['metric' + i + '-formatType'] = item.formatType || this.defaultFormatType;
                o['metric' + i + '-formatFunc'] = item.formatFunc || this.defaultFormatFunc;
                o['metric' + i + '-valueType'] = item.valueType || this.defaultValueType;
                o['metric' + i + '-valueFunc'] = item.valueFunc || this.defaultValueFunc;
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
                    formatType: this.fields['metric' + i + '-formatType'].getValue() || this.defaultFormatType,
                    formatFunc: this.fields['metric' + i + '-formatFunc'].getValue() || this.defaultFormatFunc,
                    valueType: this.fields['metric' + i + '-valueType'].getValue() || this.defaultValueType,
                    valueFunc: this.fields['metric' + i + '-valueFunc'].getValue() || this.defaultValueFunc,
                    reportViewId: this.fields['metric' + i + '-reportViewId'].getValue(),
                    chartType: this.fields['metric' + i + '-chartType'].getValue() //'pie'
                });
            }

            App.preferences.metrics[this.resourceKind] = items;
            App.persistPreferences();
            ReUI.back();
        },
    });
});
