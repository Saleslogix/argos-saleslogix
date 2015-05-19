/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
/**
 * @class crm.Views.MetricFilterLookup
 *
 *
 * @extends argos.List
 *
 */
define('crm/Views/MetricFilterLookup', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'argos/List'
], function (declare, lang, List) {
    var __class = declare('crm.Views.MetricFilterLookup', [List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.$descriptor %}</h3>'
        ]),
        //Localization
        titleText: 'Filter/Metric Lookup',
        //View Properties
        pageSize: 200,
        expose: false,
        enableSearch: false,
        id: 'metric_filter_lookup',
        queryOrderBy: '',
        querySelect: [],
        contractName: 'metadata',
        resourceKind: 'entities',
        resourcePredicate: '',
        resourceProperty: 'filters',
        show: function (options) {
            if (options.resourcePredicate) {
                this.resourcePredicate = options.resourcePredicate;
            }
            this.inherited(arguments);
        }
    });
    lang.setObject('Mobile.SalesLogix.Views.MetricFilterLookup', __class);
    return __class;
});
