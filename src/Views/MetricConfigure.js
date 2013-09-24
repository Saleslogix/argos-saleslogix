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
        advancedText: 'advanced options',
        formatterText: 'formatter',
        aggregateText: 'aggregate',
        reportViewText: 'chart view id',
        metricsSupported: 10,

        // Default advanced options
        defaultFormatType: 'Mobile/SalesLogix/Format',
        defaultFormatFunc: 'bigNumber',
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
                                    name: key + '-formatter',
                                    label: this.formatterText,
                                    type: 'text'
                                },{
                                    name: key + '-aggregate',
                                    label: this.aggregateText,
                                    type: 'text'
                                },{
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

                o[key + '-title'] = item.title;

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

                o[key + '-chartType'] = item.chartType;
                o[key + '-formatter'] = item.formatter || this.defaultFormatFunc;
                o[key + '-aggregate'] = item.aggregate || this.defaultValueFunc;
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
                        title: titleText,//'Open Sales Potential',
                        queryName: 'executeMetric',
                        queryArgs: {
                            '_filterName': filterHidden,
                            '_metricName': metricHidden
                        },
                        formatter: this.fields[key + '-formatter'].getValue() || this.defaultFormatFunc,
                        aggregate: this.fields[key + '-aggregate'].getValue() || this.defaultValueFunc,
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
