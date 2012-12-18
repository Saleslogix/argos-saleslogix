define('Mobile/SalesLogix/Views/MetricWidget', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/_base/Deferred',
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
            '<li class="metric-widget">',
                '<button data-dojo-attach-event="onclick:navToReportView">',
                    '<div data-dojo-attach-point="metricDetailNode" class="metric-detail">',
                    '</div>',
                '</button>',
            '</li>'
        ]),

        /**
         * @property {Simplate}
         * HTML markup for the metric detail (name/value) 
        */
        itemTemplate: new Simplate([
            '<div class="metric-title">{%: $$.metricTitleText %}</div>',
            '<div class="metric-value">{%: $$.formatter($.value) %}</div>'
        ]),

        metricTitleText: '',

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

        // Chart Properties
        _data: null,
        _dataDeferred: null,

        metricDetailNode: null,
        reportViewId: null,
        chartType: null,
        chartTypeMapping: {
            'pie': 'chart_generic_pie',
            'bar': 'chart_generic_bar'
        },

        /**
         * Formats the value shown in the metric widget button.
         * @param {int} val Value to format
         * @return {String} Return formatted value
        */
        formatter: function(val) {
            return val;
        },

        // Functions can't be stored in localstorage, save the module/fn strings and load them later via AMD
        formatType: 'Mobile/SalesLogix/Format',// AMD Module
        formatFunc: 'bigNumber',// Function of formatType module 

        _loadFormatter: function() {
            // Attempt to load the formatType AMD module and return its formatFun 
            var def = new Deferred();
            try {
                require([this.formatType], lang.hitch(this, function(f) {
                    // TODO: Handle cases where f is ctor?
                    def.resolve(f[this.formatFunc]);
                }));
            } catch (err) {
                def.reject(err);
            }

            return def.promise;
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
        requestData: function() {
            this.inherited(arguments);
            if (this._data && this._data.length > 0) {
                return;
            }

            this._data = [];

            this._dataDeferred = new Deferred();
            this._getData();

            var loadFormatter = this._loadFormatter();// deferred for loading in our formatter

            // Chained deferreds
            // Load the format function via require -> then load the data
            loadFormatter.then(lang.hitch(this, function(fn) {
                // Formatter deferred.then
                if (typeof fn === 'function') {
                    this.formatter = fn;
                }

                // Return the data deferred for the next part of the chain
                return this._dataDeferred;

            })).then(lang.hitch(this, function(data) {
                // Data deferred.then
                var value = this.valueFn.call(this, data);
                domConstruct.place(this.itemTemplate.apply({value: value}, this), this.metricDetailNode, 'replace');

            }));
        },
        navToReportView: function() {
            var view = App.getView(this.chartTypeMapping[this.chartType] || this.reportViewId);

            if (view) {
                aspect.after(view, 'show', lang.hitch(this, function() {
                    view.titleText = this.metricTitleText;
                    view.formatter = this.formatter;
                    view.createChart(this._data);
                }));

                view.show({ returnTo: -1 });
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

            Deferred.when(queryResults, lang.hitch(this, this._onQuerySuccess, queryResults), lang.hitch(this, this._onQueryError));
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
                this._dataDeferred.callback(this._data);
            }
        },
        _processItem: function(item) {
            this._data.push(item);
        },
        _onQueryError: function(queryOptions, error) {
        },
        createStore: function() {
            var store = new SDataStore({
                service: App.services['crm'],
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
            return (this.store = this.createStore());
        }
    });
});
