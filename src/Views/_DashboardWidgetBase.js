/*
 * See copyright file.
 */


define('crm/Views/_DashboardWidgetBase', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/event',
    'dojo/on',
    'dojo/string',
    'dojo/dom-class',
    'dojo/when',
    'dojo/promise/all',
    'dojo/_base/Deferred',
    'dojo/dom-construct',
    'dojo/query',
    'dojo/dom-attr',
    'dojo/_base/connect',
    'dojo/_base/array',
    'argos/Utility',
    'argos/Format',
    'crm/Format',
    'argos/Convert',
    'moment',
    'argos/RelatedViewManager',
    'argos/_RelatedViewWidgetBase',
    'crm/Action',
    'argos/Store/SData',
    'crm/Views/MetricWidget',
    'crm/Views/DateRangeWidget'
], function(
    declare,
    lang,
    event,
    on,
    string,
    domClass,
    when,
    all,
    Deferred,
    domConstruct,
    query,
    domAttr,
    connect,
    array,
    utility,
    format,
    crmFormat,
    convert,
    moment,
    RelatedViewManager,
    _RelatedViewWidgetBase,
    action,
    SData,
    MetricWidget,
    DateRangeWidget
) {
    var __class = declare('crm.Views._DashboardWidgetBase', [_RelatedViewWidgetBase], {
        owner: null,
        id: 'dashboard-widget-base',
        titleText: 'Dashboard',
        categoryText: 'Category',
        color: '#4b5656',
        selectedColor: '#4b1212',
        metricWidgets: null,
        metricLayout: null,
        rangeLayout: null,
        store: null,
        service: null,
        selectedRange: null,
        values: null,
        formatter: 'bigNumber',
        contractName: 'dynamic',
        /**
        * @cfg {String} resourceKind
        * The SData resource kind the view is responsible for.  This will be used as the default resource kind
        * for all SData requests.
        */
        resourceKind: null,
        /**
         * @cfg {String[]}
         * A list of fields to be selected in an SData request.
         */
        querySelect: null,
        /**
         * @cfg {String[]?}
         * A list of child properties to be included in an SData request.
         */
        queryInclude: null,
        queryName: null,
        /**
         * @cfg {String}
         * A where clause to filter the  SData request.
         */
        queryWhere: '',
        /**
         * @cfg {String}
         * A orderBy clause to sort the  SData request.
         */
        queryOrderBy: '',
        /**
         * @cfg {String?/Function?}
         * The default resource property for an SData request.
         */
        resourceProperty: null,
        /**
         * @cfg {String?/Function?}
         * The default resource predicate for an SData request.
         */
        resourcePredicate: null,
        applicationName: null,
        itemsProperty: '$resources',
        idProperty: '$key',
        labelProperty: '$descriptor',
        entityProperty: '$name',
        versionProperty: '$etag',
        maxItems: 500,
        dayValue: 7,

        // Lookup table for the aggregate functions
        aggregateLookup: {
            'calcProfit': function(fn, widget, data) {
                var revenue, cost;
                revenue = data[0];
                cost = data[1];

                return fn.call(widget, revenue, cost);
            },
            'calcMargin': function(fn, widget, data) {
                var revenue, cost;

                revenue = data[0];
                cost = data[1];

                return fn.call(widget, revenue, cost);
            },
            'calcYoYRevenue': function(fn, widget, data) {
                var pastYear, between;

                pastYear = data[0];
                between = data[1];

                return fn.call(widget, pastYear, between);
            },
            'calcYoYProfit': function(fn, widget, data) {
                return fn.call(widget, data[0], data[2], data[1], data[3]);
            },
            'calcYoYMargin': function(fn, widget, data) {
                return fn.call(widget, data[0], data[2], data[1], data[3]);
            },
            'sum': function(fn, widget, data) {
                 return fn.call(widget, data);
            }
        },
        relatedContentTemplate: new Simplate([
            '{%! $$.dashboardTemplate %}',
        ]),
        dashboardTemplate: new Simplate([
            '<div class="dashboard-widget">',
                '{%! $$.dashboardHeaderTemplate %}',
                '<div class="node-container">',
                    '{%! $$.dashboardRangeTemplate %}',
                    '<div data-dojo-attach-point="metricsNode" class="dashboard-metric-list"></div>',
                '</div>',
            '</div>'
        ]),
        dashboardIconTemplate: new Simplate([
            '{% if($.titleText) { %}',
                  '<span class="dashboard-icon" style="background-color:{%= $$.getColor($) %}" >',
                  '{%: $$.getAbrv($) %}',
                  '</span>',
            '{% } %}'
        ]),
        dashboardHeaderTemplate: new Simplate([
            '{% if($.titleText || $.categoryText) { %}',
                '<div class="dashboard-header {%: $$.headerClass %}" data-action="toggleSection">',
                    '<div class="dashboard-header-content">',
                    '{%! $$.dashboardIconTemplate %}',
                        '<div class="dashboard-header-text">',
                            '{% if($.titleText) { %}',
                                '<div class="dashboard-title">{%: $.titleText %}</div>',
                            '{% } %}',
                            '{% if($.categoryText) { %}',
                                '<div class="dashboard-category">{%: $.categoryText %}</div>',
                            '{% } %}',
                        '</div>',
                    '</div>',
                    '<button class="fa fa-chevron-down"></button>',
                '</div>',
            '{% } %}'
        ]),
        dashboardRangeTemplate: new Simplate([
            '{% if($.createRangeLayout) { %}',
                '<div data-dojo-attach-point="rangeNode" class="dashboard-range-list"></div>',
            '{% } %}'
        ]),
        rangeItemTemplate: new Simplate([
            '<div class="dashboard-range-item" style="background-color:{%= $$.getColor($) %}">',
            '</div>'
        ]),
        metricItemTemplate: new Simplate([
             '<div class="dashboard-metric-item {%: $.cls %}" style="background-color:{%= $$.getMetricColor($) %}">',
             '</div>'
        ]),
        nodataTemplate: new Simplate([
            '<div class="dashboard-nodatafound">',
             '{%: $.message %}',
            '</div>'
        ]),
        onInit: function() {
            this.service = App.getService(false);
            this.inherited(arguments);
        },
        hasParentEntry: function() {
            return (this.parentEntry) ? true : false;
        },
        onLoad: function() {
            var promise;
            this.rebuildValues();

            if (!this.loadingNode) {
                this.loadingNode = domConstruct.toDom(this.loadingTemplate.apply(this));
            }
            if (this.hasParentEntry()) {
                promise = this.getData();
                promise.then(function(data) {
                    if (data && data.length > 0) {
                        this.entry = data[0];
                        this.processEntry(this.entry);
                    } else {
                        this.buildNoDataView({ message: 'no data found' });
                    }

                }.bind(this), function(data) {
                    this.buildErrorView(data);

                }.bind(this));
            } else {
                this.buildErrorView({});
            }

        },
        processEntry: function(entry) {
            this.buildView(entry);
        },
        getData: function() {
            var queryResults,
                deferred,
                store,
                queryOptions;

            deferred = new Deferred();
            store = this.getStore();

            if (store) {
                queryOptions = {};
                queryResults = store.query(null, queryOptions);
                when(queryResults, function(feed) {
                    deferred.resolve(feed);
                }.bind(this), function(err) {
                    deferred.reject({ message: 'error:' + err });
                }.bind(this));
                return deferred.promise;
            } else {
                deferred.reject({ message: 'no data found' });
            }
            return deferred.promise;
        },
        getQueryData: function() {
            var queryResults,
                store,
                queryOptions;

            queryOptions = {
                count: this.pageSize,
                start: this.position
            };
            queryResults = [];
            store = this.getQueryStore();

            array.forEach(store, function(storeInstance) {
                queryResults.push(storeInstance.query(null, queryOptions));
            }, this);

            //Maintain the query order in the data from the resolve
            all(queryResults).then(function(results) {
                if(results.length > 1) {
                    this.sendValues(results);
                } else {
                    this.sendValues(results[0]);
                }
            }.bind(this));
        },
        registerWidget: function(widget) {
            this.metricWidgets.push(widget);
        },
        sendValues: function(results) {
            array.forEach(this.metricWidgets, function(widget) {
                var obj, result, valueFn;

                obj = this.values.filter(this.checkForValue, widget)[0];

                if (!obj.value) {
                    if (obj.aggregateModule && obj.aggregate) {
                        valueFn = this._loadModuleFunction(obj.aggregateModule, obj.aggregate);
                    }
                    if (!(obj.queryIndex instanceof Array)) {
                        // Single query, so get the single index value from the results
                        result = results[obj.queryIndex];
                        when(valueFn, function(fn) {this.applyValue(widget, fn, result, obj);}.bind(this), function(error) {this._onQueryError(error, widget);});
                    } else {
                        // Multi query, so pull the indices and add them to a result array to pass to the aggregate function
                        result = [];
                        for (var j = 0; j < obj.queryIndex.length; j++) {
                            result.push(results[obj.queryIndex[j]]);
                        }
                        when(valueFn, function(fn) {this.applyValue(widget, fn, result, obj);}.bind(this), function(error) {this._onQueryError(error, widget);});
                    }
                } else {
                    this.applyValue(widget, null, null, obj);
                }
            }, this);
        },
        applyValue: function(widget, fn, result, obj) {
            var formatterFn;

            if (widget.formatModule && widget.formatter) {
                formatterFn = this._loadModuleFunction(widget.formatModule, widget.formatter);
            }

            if (fn) {
                // If there is a function to call, call it and apply that value to the obj.value
                obj.value = this.aggregateLookup[obj.aggregate](fn, widget, result);//fn.call(widget, result);
            }

            // get the formatter
            when(formatterFn, function(fn) {
                if (typeof fn === 'function') {
                    widget.formatter = fn;
                }
            });

            // Apply the value to the widget itself by passing obj.value (from the values array) to the value property of the widget
            if (obj.count) {
                this._getCountfromView(widget, obj);
            } else {
                domConstruct.empty(widget.metricDetailNode);
                domConstruct.place(widget.itemTemplate.apply({ value: obj.value }, widget), widget.metricDetailNode);
            }

        },
        checkForValue: function(value) {
            return value.name === this.valueNeeded;
        },
        _loadModuleFunction: function(module, fn) {
            var def = new Deferred();
            try {
                require([module], lang.hitch(this, function(mod) {
                    var instance;
                    if (typeof mod === 'function') {
                        instance = new mod();
                        def.resolve(instance[fn]);
                    } else {
                        def.resolve(mod[fn]);
                    }
                }));
            } catch(err) {
                def.reject(err);
            }
            return def.promise;
        },
        _onQueryError: function(error, widget) {
            domConstruct.place(widget.itemTemplate.apply({ value: error }, widget), widget.metricDetailNode, 'replace');
        },
        _getCountfromView: function(widget, obj) {
            var view = App.getView(widget.navTo), options = {};

            if (view) {
                options.where = widget.activeFilter ? widget.activeFilter : '';
                view.getListCount(options).then(function(result) {
                    if (result >= 0) {
                        obj.count = result;
                        domConstruct.empty(widget.metricDetailNode);
                        domConstruct.place(domConstruct.toDom("<span class='metric-count'>" + obj.count + " " +  obj.countTitle + "</span>"), widget.metricDetailNode);
                        domConstruct.place(widget.itemTemplate.apply({ value: obj.value }, widget), widget.metricDetailNode);
                    }
                }, function(error) {
                        console.warn(error);
                        domConstruct.empty(widget.metricDetailNode);
                        domConstruct.place(widget.itemTemplate.apply({ value: obj.value }, widget), widget.metricDetailNode);
                });
            }
        },
        navToReportView: function () {
            var view;

            if (this.navTo) {
                view = App.getView(this.navTo);
            } else {
                if (this.chartType) {
                    view = App.getView(this.chartTypeMapping[this.chartType]);
                    view.formatter = this.formatter;
                }
            }

            if (view) {
                view.parent = this;
                view.show({ returnTo: this.returnToId, titleText: this.titleText, where: this.activeFilter});
            }
        },
        changeRange: function() {
            var view;
            view = this.parent;
            view.dayValue = this.value;
            // Change the previously selected range color back to what it was and the new selected range color to selected
            view.selectedRange.style['background-color'] = view.getColor();
            view.selectedRange = this.domNode.parentNode;
            view.selectedRange.style['background-color'] = view.getSelectedColor();
            view.rebuildWidgets(view.entry);
        },
        buildView: function(entry) {
            var itemNode, frag, rangeFrag, widgetOptions, rangeOptions, obj;
            frag = document.createDocumentFragment();
            rangeFrag = document.createDocumentFragment();

            this.destroyWidgets();
            this.metricWidgets = [];
            this.rangeWidgets = [];
            // Create metrics widgets and place them in the metricsNode
            widgetOptions = this.createMetricLayout(entry) || [];
            array.forEach(widgetOptions, function(options) {
                if (this.hasValidOptions(options)) {
                    // Check if widget has a navigate to view option
                    if (options.navTo) {
                        obj = this.values.filter(this.checkForValue, options)[0];
                        options['navToReportView'] = this.navToReportView;
                        if (!(obj.queryIndex instanceof Array)) {
                            // Get the active filter from the query args array and pass it as an option to the widget to be consumed by the navToReportView function
                            options['activeFilter'] = this.queryArgs[obj.queryIndex][1]._activeFilter;
                        }
                    }
                    var widget = new MetricWidget(options);
                    itemNode = domConstruct.toDom(this.metricItemTemplate.apply(options, this));
                    frag.appendChild(itemNode);
                    widget.placeAt(itemNode, 'last');
                    this.registerWidget(widget);
                }
            }, this);
            this.getQueryData();

            // Check if range widgets are desired, if so create and place in rangeNode
            if (this.createRangeLayout) {
                rangeOptions = this.createRangeLayout() || [];
                array.forEach(rangeOptions, function(options) {
                    options['changeRange'] = this.changeRange;
                    options['parent'] = this;
                    var widget = new DateRangeWidget(options);
                    itemNode = domConstruct.toDom(this.rangeItemTemplate.apply(options, this));
                    if (options.value === this.dayValue) {
                        this.selectedRange = itemNode;
                    }
                    rangeFrag.appendChild(itemNode);
                    widget.placeAt(itemNode, 'last');
                }, this);
            }
            if (rangeFrag.childNodes.length > 0) {
                if (!this.selectedRange) {
                    this.selectedRange = rangeFrag.childNodes[0];
                }
                this.selectedRange.style['background-color'] = this.getSelectedColor();
                domConstruct.place(rangeFrag, this.rangeNode, 'last');
            }
            if (frag.childNodes.length > 0) {
                domConstruct.place(frag, this.metricsNode, 'last');
            }
        },
        buildNoDataView: function(entry) {
            var node,
                frag;
            frag = document.createDocumentFragment();
            node = domConstruct.toDom(this.nodataTemplate.apply(entry, this));
            frag.appendChild(node);
            if (frag.childNodes.length > 0) {
                domConstruct.place(frag, this.metricsNode, 'last');
            }
        },
        getAbrv: function() {
            var abrv = '';
            abrv = crmFormat.formatUserInitial(this.titleText);
            return abrv;
        },
        getColor: function() {
            return this.color;
        },
        getMetricColor: function() {
            return (this.metricColor) ? this.metricColor : this.color;
        },
        getSelectedColor: function() {
            return this.selectedColor;
        },
        getStore: function() {
            var store = new SData({
                service: this.service,
                contractName: this.contractName,
                resourceKind: this.resourceKind,
                resourceProperty: this.resourceProperty,
                resourcePredicate: this.resourcePredicate,
                include: this.queryInclude,
                select: this.querySelect,
                orderBy: this.queryOrderBy,
                where: this.getWhere(),
                itemsProperty: this.itemsProperty,
                idProperty: this.idProperty,
                labelProperty: this.labelProperty,
                entityProperty: this.entityProperty,
                versionProperty: this.versionProperty,
                start: 0,
                count: this.maxItems,
                scope: this
            });
            return store;
        },
        getWhere: function() {
            return this.queryWhere;
        },
        getQueryStore: function() {
            var store = [];

            if (!(this.queryArgs instanceof Array) && this.queryArgs) {
                this.queryArgs = [this.queryArgs];
            }
            if (!this.queryName) {
                this.queryName = 'executeMetric';
            }

            array.forEach(this.queryArgs, function(arg) {
                store.push(new SData({
                    request: this.request,
                    service: App.services.crm,
                    resourceKind: arg.shift(),
                    resourcePredicate: this.resourcePredicate,
                    contractName: this.contractName,
                    queryName: this.queryName,
                    queryArgs: arg.shift(),
                    orderBy: this.queryOrderBy,
                    idProperty: this.idProperty,
                    applicationName: this.applicationName,
                    scope: this
                }));
            }, this);

            return store;
        },
        rebuildWidgets: function(entry) {
            //this.destroyWidgets();
            domConstruct.empty(this.metricsNode);
            this.metricWidgets = [];
            this.rebuildValues();

            var widgetOptions, itemNode, frag, obj;
            frag = document.createDocumentFragment();
            // Create metrics widgets and place them in the metricNode
            widgetOptions = this.createMetricLayout(entry) || [];
            array.forEach(widgetOptions, function(options) {
                if (this.hasValidOptions(options)) {
                    // Check if widget has a navigate to view option
                    if (options.navTo) {
                        obj = this.values.filter(this.checkForValue, options)[0];
                        options['navToReportView'] = this.navToReportView;
                        if (!(obj.queryIndex instanceof Array)) {
                            // Get the active filter from the query args array and pass it as an option to the widget to be consumed by the navToReportView function
                            options['activeFilter'] = this.queryArgs[obj.queryIndex][1]._activeFilter;
                        }
                    }
                    options['dayValue'] = this.dayValue;
                    var widget = new MetricWidget(options);
                    itemNode = domConstruct.toDom(this.metricItemTemplate.apply(options, this));
                    frag.appendChild(itemNode);
                    widget.placeAt(itemNode, 'last');
                    this.registerWidget(widget);
                    //widget.requestData();
                }
            }, this);
            this.getQueryData();
            if (frag.childNodes.length > 0) {
                domConstruct.place(frag, this.metricsNode, 'last');
            }
        },
        rebuildValues: function() {
            // TODO: add in functionality to check if value is dependent on datetime (i.e. rangeValue dependent) and force it to update if necessary
            for (var z = 0; z < this.values.length; z++) {
                this.values[z].value = null;
                if (this.values[z].count >= 0) {
                    this.values[z].count = true;
                }
            }
        },
        /**
         * Sets up the date range search query based upon the from and to value (can use this.dayValue which is set by the range nodes)
         * @params {string, int, int} Property to be searched for, the days ago from the current, and days up to (from current)
         */
        pastDays: function(property, from, to) {
            var now, pastWeekStart, today, query;

            now = moment();

            pastWeekStart = now.clone().subtract(from, 'days').startOf('day');

            if (!to) {
                today = now.clone().endOf('day');
            } else {
                today = now.clone().subtract(to, 'days').endOf('day');
            }

            query = string.substitute(
                    '((' + property + ' between @${0}@ and @${1}@) or (' + property + ' between @${2}@ and @${3}@))',
                    [
                    convert.toIsoStringFromDate(pastWeekStart.toDate()),
                    convert.toIsoStringFromDate(today.toDate()),
                    pastWeekStart.format('YYYY-MM-DDT00:00:00[Z]'),
                    today.format('YYYY-MM-DDT23:59:59[Z]')
                    ]
            );
            return query;
        },
        /**
         * Sets up the date range search query based on the this.dayValue and searches between that many days ago and today
         * @params {string} Property to be searched for
         */
        pastDaysLt: function(property) {
            var now, pastDay, query;

            now = moment();

            pastDay = now.clone().subtract(this.dayValue, 'days').startOf('day');

            query = string.substitute(
                    '(' + property + ' lt @${0}@ or (' + property + ' lt @${1}@))',
                    [
                    convert.toIsoStringFromDate(pastDay.toDate()),
                    pastDay.format('YYYY-MM-DDT00:00:00[Z]'),
                    ]
            );
            return query;
        },
        hasValidOptions: function(options) {
            return options
                && options.valueNeeded;
        },
        hasValueOptions: function(options) {
           return options
                && options.value;
        },
        destroyWidgets: function() {
            array.forEach(this.metricWidgets, function(widget) {
                widget.destroy();
            }, this);
        }
    });
    var rvm = new RelatedViewManager();
    rvm.registerType('dashboard_widget_base', __class);
    return __class;
});
