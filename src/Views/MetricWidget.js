/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/MetricWidget', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/Deferred',
    'dojo/when',
    'dojo/promise/all',
    'dojo/dom-construct',
    'dojo/aspect',
    'dijit/_Widget',
    'Sage/Platform/Mobile/_Templated',
    'Sage/Platform/Mobile/Store/SData'
], function(
    declare,
    lang,
    array,
    Deferred,
    when,
    all,
    domConstruct,
    aspect,
    _Widget,
    _Templated,
    SDataStore
) {
    return declare('Mobile.SalesLogix.Views.MetricWidget', [_Widget, _Templated], {
        /**
         * @property {Simplate}
         * Simple that defines the HTML Markup
        */
        widgetTemplate: new Simplate([
            '<div class="metric-widget">',
                '<button data-dojo-attach-event="onclick:navToReportView">',
                    '<div data-dojo-attach-point="metricDetailNode" class="metric-detail">',
                        '{%! $.loadingTemplate %}',
                    '</div>',
                '</button>',
            '</div>'
        ]),

        /**
         * @property {Simplate}
         * HTML markup for the metric detail (name/value) 
        */
        itemTemplate: new Simplate([
            '<div class="metric-title">{%: $$.title %}</div>',
            '<div class="metric-value">{%: $$.formatter($.value) %}</div>'
        ]),

        /**
         * @property {Simplate}
         * HTML markup for the loading text and icon 
        */
        loadingTemplate: new Simplate([
            '<div class="metric-title list-loading">',
                '<span class="list-loading-indicator"><div>{%= $.loadingText %}</div></span>',
            '</div>'
        ]),

        // Localization
        title: '',
        loadingText: 'loading...',

        // Store Options
        querySelect: null, 
        queryName: null,
        queryArgs: null,
        queryOrderBy: null,
        resourceKind: null,
        resourcePredicate: null,
        contractName: null,
        keyProperty: null, 
        applicationName: null,
        position: 0,
        pageSize: 100,

        store: null,

        _data: null,
        requestDataDeferred: null,
        metricDetailNode: null,
        currentSearchExpression: '',

        // Chart Properties
        chartType: null,
        chartTypeMapping: {
            'pie': 'chart_generic_pie',
            'bar': 'chart_generic_bar'
        },

        // Functions can't be stored in localstorage, save the module/fn strings and load them later via AMD
        formatModule: 'Mobile/SalesLogix/Format',// AMD Module
        formatter: 'bigNumber',// Function of formatModule module 

        /**
         * Loads a module/function via AMD and wraps it in a deferred 
         * @return {object} Returns a deferred with the function loaded via AMD require
        */
        getFormatterFnDeferred: function() {
            if (this.formatModule && this.formatter) {
                return this._loadModuleFunction(this.formatModule, this.formatter);
            }

            // Return the default fn if aggregateModule and aggregate were not assigned
            var d = new Deferred();
            d.resolve(this.formatter);
            return d.promise;
        },

        /**
         * Calculates the value shown in the metric widget button.
         * @param {Array} data Array of data used for the metric
         * @return {int} Returns a value calculated from data (SUM/AVG/MAX/MIN/Whatever)
        */
        valueFn: function(data) {
            var total = 0;
            array.forEach(data, function(item) {
                total = total + item.value;
            }, this);

            return total;
        },

        // Functions can't be stored in localstorage, save the module/fn strings and load them later via AMD
        aggregateModule: 'Mobile/SalesLogix/Aggregate',
        aggregate: null,//'valueFn',

        /**
         * Loads a module/function via AMD and wraps it in a deferred 
         * @return {object} Returns a deferred with the function loaded via AMD require
        */
        getValueFnDeferred: function() {
            if (this.aggregateModule && this.aggregate) {
                return this._loadModuleFunction(this.aggregateModule, this.aggregate);
            }

            // Return the default fn if aggregateModule and aggregate were not assigned
            var d = new Deferred();
            d.resolve(this.valueFn);
            return d.promise;
        },
        _loadModuleFunction: function(module, fn) {
            // Attempt to load the function fn from the AMD module 
            var def = new Deferred();
            try {
                require([module], lang.hitch(this, function(mod) {
                    var instance;
                    // Handle if required module is a ctor else object
                    if (typeof mod === 'function') {
                        instance = new mod();
                        def.resolve(instance[fn]);
                    } else {
                        def.resolve(mod[fn]);
                    }
                }));
            } catch (err) {
                def.reject(err);
            }

            // the promise property prevents consumer from calling resolve/reject on the Deferred while still allowing access to the value
            return def.promise; 
        },
        /**
         * Requests the widget's data, value fn, format fn, and renders it's itemTemplate 
        */
        requestData: function() {
            var loadFormatter, loadValueFn;

            this.inherited(arguments);

            if (this._data && this._data.length > 0) {
                return;
            }

            this._data = [];
            this.requestDataDeferred = new Deferred();
            this._getData();

            loadFormatter = this.getFormatterFnDeferred();// deferred for loading in our formatter
            loadValueFn = this.getValueFnDeferred();// deferred for loading in value function

            all([loadValueFn, loadFormatter, this.requestDataDeferred]).then(lang.hitch(this, function(results) {
                var valueFn, formatterFn, data, value;
                if (!results[0] || !results[1] || !results[2]) {
                    throw new Error('An error occurred loading the KPI widget data.');
                }

                valueFn = results[0];
                formatterFn = results[1];
                data = results[2];

                if (typeof valueFn === 'function') {
                    this.valueFn = valueFn;
                }

                if (typeof formatterFn === 'function') {
                    this.formatter = formatterFn;
                }

                value = this.valueFn.call(this, data);
                domConstruct.place(this.itemTemplate.apply({value: value}, this), this.metricDetailNode, 'replace');
            }));
        },
        navToReportView: function() {
            var view, signal;
            view = App.getView(this.chartTypeMapping[this.chartType]);

            if (view) {
                view.titleText = this.title;
                view.formatter = this.formatter;
                signal = aspect.after(view, 'show', lang.hitch(this, function() {
                    setTimeout(lang.hitch(this, function() {
                        view.createChart(this._data);
                        signal.remove();
                    }), 1);
                }));

                view.show({ returnTo: this.returnToId, currentSearchExpression: this.currentSearchExpression });
            }
        },
        _getData: function() {
            var store, queryOptions, queryResults;
            queryOptions = {
                count: this.pageSize,
                start: this.position
            };

            store = this.get('store');
            queryResults = store.query(null, queryOptions);

            when(queryResults, lang.hitch(this, this._onQuerySuccess, queryResults), lang.hitch(this, this._onQueryError));
        },
        _onQuerySuccess: function(queryResults, items) {
            var total = queryResults.total;

            queryResults.forEach(lang.hitch(this, this._processItem));

            var left = -1;
            if (total > -1) {
                left = total - (this.position + this.pageSize);
            }

            if (left > 0) {
                this.position = this.position + this.pageSize; 
                this._getData();
            } else {
                // Signal complete
                this.requestDataDeferred.resolve(this._data);
            }
        },
        _processItem: function(item) {
            this._data.push(item);
        },
        _onQueryError: function(queryOptions, error) {
        },
        createStore: function() {
            var store = new SDataStore({
                service: App.services.crm,
                resourceKind: this.resourceKind,
                resourcePredicate: this.resourcePredicate,
                contractName: this.contractName,
                select: this.querySelect,
                queryName: this.queryName,
                queryArgs: this.queryArgs,
                orderBy: this.queryOrderBy,
                idProperty: this.keyProperty,
                applicationName: this.applicationName,
                scope: this
            });

            return store;
        },
        _getStoreAttr: function() {
            return this.store || (this.store = this.createStore());
        }
    });
});
