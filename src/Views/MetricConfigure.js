/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/MetricConfigure', [
       'dojo/_base/declare',
       'dojo/_base/lang',
       'dojo/_base/array',
       'Sage/Platform/Mobile/Edit'
],function(
    declare,
    lang,
    array,
    Edit
) {
    return declare('Mobile.SalesLogix.Views.MetricConfigure', [Edit], {
        titleText: 'Configure Metric',
        id: 'metric_configure',
        expose: false,

        resourceKind: '',
        entityName: '',

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
        metricsSupported: 10,

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
        init: function() {
            this.inherited(arguments);

            var i;

            for (i = 0; i < this.metricsSupported; i++) {
                this.connect(this.fields['metric' + i + '-metric'], 'onChange', lang.hitch(this, this.onMetricChange, i));
                this.connect(this.fields['metric' + i + '-filter'], 'onChange', lang.hitch(this, this.onFilterChange, i));
            }
        },
        onMetricChange: function(index, value, field) {
            var selection = field.getSelection(),
                key = 'metric' + index;

            if (selection) {
                this.fields[key + '-metricName'].setValue(selection.filterName);
            }
        },
        onFilterChange: function(index, value, field) {
            var selection = field.getSelection(),
                key = 'metric' + index;

            if (selection) {
                this.fields[key + '-filterName'].setValue(selection.filterName);
            }
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
                            label: this.metricText,
                            name: key + '-metric',
                            keyProperty: 'filterName',
                            type: 'lookup',
                            view: 'metric_filter_lookup',
                            resourcePredicate: lang.hitch(this, function() {
                                return "'" + this.entityName + "'";
                            }),
                            where: "filterType eq 'analyticsMetric'" 
                        },{
                            name: key + '-filterName',
                            property: key + '-filterName',
                            type: 'hidden'
                        },{
                            label: this.metricFilterText,
                            name: key + '-filter',
                            keyProperty: 'filterName',
                            type: 'lookup',
                            view: 'metric_filter_lookup',
                            resourcePredicate: lang.hitch(this, function() {
                                return "'" + this.entityName + "'";
                            }),
                            where: "filterType ne 'analyticsMetric'" 
                        },{
                            name: key + '-metricName',
                            property: key + '-metricName',
                            type: 'hidden'
                        },{
                            name: key + '-chartType',
                            label: this.chartTypeText,
                            type: 'select',
                            view: 'select_list',
                            data: {
                                '$resources': [
                                    {'$key': 'bar', '$descriptor': 'bar'},
                                    {'$key': 'pie', '$descriptor': 'pie'}
                                ]
                            }
                        },{
                            title: this.metricText + ' ' + (i + 1) + ' ' + this.advancedText,
                            collapsed: false,
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
            var metrics = App.preferences.metrics && App.preferences.metrics[this.resourceKind];

            array.forEach(metrics, function(item, i) {
                var o = {}, key = 'metric' + i;

                o[key + '-title'] = item.metricTitleText;

                // Hidden fields
                o[key + '-filterName'] = item.queryArgs._filterName;
                o[key + '-metricName'] = item.queryArgs._metricName;

                // Display name for filter
                o[key + '-filter'] = {
                    filterName: item.queryArgs._filterName,
                    $descriptor: item.filterDisplayName
                };

                // Display name for metric
                o[key + '-metric'] = {
                    filterName: item.queryArgs._metricName,
                    $descriptor: item.metricDisplayName
                };

                o[key + '-query'] = item.queryArgs._activeFilter;
                o[key + '-chartType'] = item.chartType;
                o[key + '-reportViewId'] = item.reportViewId;
                o[key + '-formatType'] = item.formatType || this.defaultFormatType;
                o[key + '-formatFunc'] = item.formatFunc || this.defaultFormatFunc;
                o[key + '-valueType'] = item.valueType || this.defaultValueType;
                o[key + '-valueFunc'] = item.valueFunc || this.defaultValueFunc;
                this.setValues(o, true);
            }, this);
        },
        saveMetricPref: function() {
            var values = this.getValues();
            App.preferences.metrics = App.preferences.metrics || {};

            var i, key, items = [], filterItem, metricItem, filterHidden, metricHidden, titleText;

            for (i = 0; i < this.metricsSupported; i++) {
                key = 'metric' + i;
                titleText = this.fields[key + '-title'].getValue(),//'Open Sales Potential',

                // Display name (object)
                filterItem = this.fields[key + '-filter'].getValue();
                metricItem = this.fields[key + '-metric'].getValue();

                // Hidden field values (string)
                filterHidden = this.fields[key + '-filterName'].getValue();
                metricHidden = this.fields[key + '-metricName'].getValue();

                if (titleText) {
                    items.push({
                        resourceKind: this.resourceKind,
                        metricTitleText: titleText,//'Open Sales Potential',
                        queryName: 'executeMetric',
                        queryArgs: {
                            '_filterName': filterHidden,
                            '_metricName': metricHidden, 
                            '_activeFilter': this.fields[key + '-query'].getValue() //'Closed eq false'
                        },
                        formatType: this.fields[key + '-formatType'].getValue() || this.defaultFormatType,
                        formatFunc: this.fields[key + '-formatFunc'].getValue() || this.defaultFormatFunc,
                        valueType: this.fields[key + '-valueType'].getValue() || this.defaultValueType,
                        valueFunc: this.fields[key + '-valueFunc'].getValue() || this.defaultValueFunc,
                        reportViewId: this.fields[key + '-reportViewId'].getValue(),
                        chartType: this.fields[key + '-chartType'].getValue(), //'pie', 'bar'
                        metricDisplayName: metricItem && metricItem.$descriptor, 
                        filterDisplayName: filterItem && filterItem.$descriptor,
                        enabled: false
                    });
                }
            }

            App.preferences.metrics[this.resourceKind] = items;
            App.persistPreferences();
            ReUI.back();
        }
    });
});
