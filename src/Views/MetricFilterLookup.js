/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/MetricFilterLookup', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    lang,
    List
) {

    return declare('Mobile.SalesLogix.Views.MetricFilterLookup', [List], {
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
        resourcePredicate: '',// this should be the entity name
        resourceProperty: 'filters',

        show: function(options, transitionOptions) {
            if (options.resourcePredicate) {
                this.resourcePredicate = options.resourcePredicate;
            }

            this.inherited(arguments);
        }
    });
});
