define('crm/Views/_DashboardWidgetBase', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/_base/event', 'dojo/on', 'dojo/string', 'dojo/dom-class', 'dojo/when', 'dojo/promise/all', 'dojo/_base/Deferred', 'dojo/dom-construct', 'dojo/query', 'dojo/dom-attr', 'dojo/_base/connect', 'dojo/_base/array', 'argos/Utility', 'argos/Format', 'crm/Format', 'argos/Convert', 'moment', 'argos/RelatedViewManager', 'argos/_RelatedViewWidgetBase', 'crm/Action', 'argos/Store/SData', 'crm/Views/MetricWidget', 'crm/Views/DateRangeWidget'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojo_baseEvent, _dojoOn, _dojoString, _dojoDomClass, _dojoWhen, _dojoPromiseAll, _dojo_baseDeferred, _dojoDomConstruct, _dojoQuery, _dojoDomAttr, _dojo_baseConnect, _dojo_baseArray, _argosUtility, _argosFormat, _crmFormat, _argosConvert, _moment, _argosRelatedViewManager, _argos_RelatedViewWidgetBase, _crmAction, _argosStoreSData, _crmViewsMetricWidget, _crmViewsDateRangeWidget) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    /*
    * See copyright file.
    */

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _event = _interopRequireDefault(_dojo_baseEvent);

    var _on = _interopRequireDefault(_dojoOn);

    var _string = _interopRequireDefault(_dojoString);

    var _domClass = _interopRequireDefault(_dojoDomClass);

    var _when = _interopRequireDefault(_dojoWhen);

    var _all = _interopRequireDefault(_dojoPromiseAll);

    var _Deferred = _interopRequireDefault(_dojo_baseDeferred);

    var _domConstruct = _interopRequireDefault(_dojoDomConstruct);

    var _query = _interopRequireDefault(_dojoQuery);

    var _domAttr = _interopRequireDefault(_dojoDomAttr);

    var _connect = _interopRequireDefault(_dojo_baseConnect);

    var _array = _interopRequireDefault(_dojo_baseArray);

    var _utility = _interopRequireDefault(_argosUtility);

    var _format = _interopRequireDefault(_argosFormat);

    var _crmFormat2 = _interopRequireDefault(_crmFormat);

    var _convert = _interopRequireDefault(_argosConvert);

    var _moment2 = _interopRequireDefault(_moment);

    var _RelatedViewManager = _interopRequireDefault(_argosRelatedViewManager);

    var _RelatedViewWidgetBase2 = _interopRequireDefault(_argos_RelatedViewWidgetBase);

    var _action = _interopRequireDefault(_crmAction);

    var _SData = _interopRequireDefault(_argosStoreSData);

    var _MetricWidget = _interopRequireDefault(_crmViewsMetricWidget);

    var _DateRangeWidget = _interopRequireDefault(_crmViewsDateRangeWidget);

    /**
     * @class crm.Views._DashboardWidgetBase
     *
     *
     * @extends argos._RelatedViewWidgetBase
     *
     */
    var __class = (0, _declare['default'])('crm.Views._DashboardWidgetBase', [_RelatedViewWidgetBase2['default']], {
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
            'calcProfit': function calcProfit(fn, widget, data) {
                var revenue, cost;
                revenue = data[0];
                cost = data[1];

                return fn.call(widget, revenue, cost);
            },
            'calcMargin': function calcMargin(fn, widget, data) {
                var revenue, cost;

                revenue = data[0];
                cost = data[1];

                return fn.call(widget, revenue, cost);
            },
            'calcYoYRevenue': function calcYoYRevenue(fn, widget, data) {
                var pastYear, between;

                pastYear = data[0];
                between = data[1];

                return fn.call(widget, pastYear, between);
            },
            'calcYoYProfit': function calcYoYProfit(fn, widget, data) {
                return fn.call(widget, data[0], data[2], data[1], data[3]);
            },
            'calcYoYMargin': function calcYoYMargin(fn, widget, data) {
                return fn.call(widget, data[0], data[2], data[1], data[3]);
            },
            'sum': function sum(fn, widget, data) {
                return fn.call(widget, data);
            }
        },
        relatedContentTemplate: new Simplate(['{%! $$.dashboardTemplate %}']),
        dashboardTemplate: new Simplate(['<div class="dashboard-widget">', '{%! $$.dashboardHeaderTemplate %}', '<div class="node-container">', '{%! $$.dashboardRangeTemplate %}', '<div data-dojo-attach-point="metricsNode" class="dashboard-metric-list"></div>', '</div>', '</div>']),
        dashboardIconTemplate: new Simplate(['{% if($.titleText) { %}', '<span class="dashboard-icon" style="background-color:{%= $$.getColor($) %}" >', '{%: $$.getAbrv($) %}', '</span>', '{% } %}']),
        dashboardHeaderTemplate: new Simplate(['{% if($.titleText || $.categoryText) { %}', '<div class="dashboard-header {%: $$.headerClass %}" data-action="toggleSection">', '<div class="dashboard-header-content">', '{%! $$.dashboardIconTemplate %}', '<div class="dashboard-header-text">', '{% if($.titleText) { %}', '<div class="dashboard-title">{%: $.titleText %}</div>', '{% } %}', '{% if($.categoryText) { %}', '<div class="dashboard-category">{%: $.categoryText %}</div>', '{% } %}', '</div>', '</div>', '<button class="fa fa-chevron-down"></button>', '</div>', '{% } %}']),
        dashboardRangeTemplate: new Simplate(['{% if($.createRangeLayout) { %}', '<div data-dojo-attach-point="rangeNode" class="dashboard-range-list"></div>', '{% } %}']),
        rangeItemTemplate: new Simplate(['<div class="dashboard-range-item" style="background-color:{%= $$.getColor($) %}">', '</div>']),
        metricItemTemplate: new Simplate(['<div class="dashboard-metric-item {%: $.cls %}" style="background-color:{%= $$.getMetricColor($) %}">', '</div>']),
        nodataTemplate: new Simplate(['<div class="dashboard-nodatafound">', '{%: $.message %}', '</div>']),
        onInit: function onInit() {
            this.service = App.getService(false);
            this.inherited(arguments);
        },
        hasParentEntry: function hasParentEntry() {
            return this.parentEntry ? true : false;
        },
        onLoad: function onLoad() {
            var promise;
            this.rebuildValues();

            if (!this.loadingNode) {
                this.loadingNode = _domConstruct['default'].toDom(this.loadingTemplate.apply(this));
            }
            if (this.hasParentEntry()) {
                promise = this.getData();
                promise.then((function (data) {
                    if (data && data.length > 0) {
                        this.entry = data[0];
                        this.processEntry(this.entry);
                    } else {
                        this.buildNoDataView({ message: 'no data found' });
                    }
                }).bind(this), (function (data) {
                    this.buildErrorView(data);
                }).bind(this));
            } else {
                this.buildErrorView({});
            }
        },
        processEntry: function processEntry(entry) {
            this.buildView(entry);
        },
        getData: function getData() {
            var queryResults, deferred, store, queryOptions;

            deferred = new _Deferred['default']();
            store = this.getStore();

            if (store) {
                queryOptions = {};
                queryResults = store.query(null, queryOptions);
                (0, _when['default'])(queryResults, (function (feed) {
                    deferred.resolve(feed);
                }).bind(this), (function (err) {
                    deferred.reject({ message: 'error:' + err });
                }).bind(this));
                return deferred.promise;
            } else {
                deferred.reject({ message: 'no data found' });
            }
            return deferred.promise;
        },
        getQueryData: function getQueryData() {
            var queryResults, store, queryOptions;

            queryOptions = {
                count: this.pageSize,
                start: this.position
            };
            queryResults = [];
            store = this.getQueryStore();

            _array['default'].forEach(store, function (storeInstance) {
                queryResults.push(storeInstance.query(null, queryOptions));
            }, this);

            //Maintain the query order in the data from the resolve
            (0, _all['default'])(queryResults).then((function (results) {
                if (results.length > 1) {
                    this.sendValues(results);
                } else {
                    this.sendValues(results[0]);
                }
            }).bind(this));
        },
        registerWidget: function registerWidget(widget) {
            this.metricWidgets.push(widget);
        },
        sendValues: function sendValues(results) {
            _array['default'].forEach(this.metricWidgets, function (widget) {
                var obj, result, valueFn;

                obj = this.values.filter(this.checkForValue, widget)[0];

                if (!obj.value) {
                    if (obj.aggregateModule && obj.aggregate) {
                        valueFn = this._loadModuleFunction(obj.aggregateModule, obj.aggregate);
                    }
                    if (!(obj.queryIndex instanceof Array)) {
                        // Single query, so get the single index value from the results
                        result = results[obj.queryIndex];
                        (0, _when['default'])(valueFn, (function (fn) {
                            this.applyValue(widget, fn, result, obj);
                        }).bind(this), function (error) {
                            this._onQueryError(error, widget);
                        });
                    } else {
                        // Multi query, so pull the indices and add them to a result array to pass to the aggregate function
                        result = [];
                        for (var j = 0; j < obj.queryIndex.length; j++) {
                            result.push(results[obj.queryIndex[j]]);
                        }
                        (0, _when['default'])(valueFn, (function (fn) {
                            this.applyValue(widget, fn, result, obj);
                        }).bind(this), function (error) {
                            this._onQueryError(error, widget);
                        });
                    }
                } else {
                    this.applyValue(widget, null, null, obj);
                }
            }, this);
        },
        applyValue: function applyValue(widget, fn, result, obj) {
            var formatterFn;

            if (widget.formatModule && widget.formatter) {
                formatterFn = this._loadModuleFunction(widget.formatModule, widget.formatter);
            }

            if (fn) {
                // If there is a function to call, call it and apply that value to the obj.value
                obj.value = this.aggregateLookup[obj.aggregate](fn, widget, result); //fn.call(widget, result);
            }

            // get the formatter
            (0, _when['default'])(formatterFn, function (fn) {
                if (typeof fn === 'function') {
                    widget.formatter = fn;
                }
            });

            // Apply the value to the widget itself by passing obj.value (from the values array) to the value property of the widget
            if (obj.count) {
                this._getCountfromView(widget, obj);
            } else {
                _domConstruct['default'].empty(widget.metricDetailNode);
                _domConstruct['default'].place(widget.itemTemplate.apply({ value: obj.value }, widget), widget.metricDetailNode);
            }
        },
        checkForValue: function checkForValue(value) {
            return value.name === this.valueNeeded;
        },
        _loadModuleFunction: function _loadModuleFunction(module, fn) {
            var def = new _Deferred['default']();
            try {
                require([module], _lang['default'].hitch(this, function (mod) {
                    var instance;
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
            return def.promise;
        },
        _onQueryError: function _onQueryError(error, widget) {
            _domConstruct['default'].place(widget.itemTemplate.apply({ value: error }, widget), widget.metricDetailNode, 'replace');
        },
        _getCountfromView: function _getCountfromView(widget, obj) {
            var view = App.getView(widget.navTo),
                options = {};

            if (view) {
                options.where = widget.activeFilter ? widget.activeFilter : '';
                view.getListCount(options).then(function (result) {
                    if (result >= 0) {
                        obj.count = result;
                        _domConstruct['default'].empty(widget.metricDetailNode);
                        _domConstruct['default'].place(_domConstruct['default'].toDom("<span class='metric-count'>" + obj.count + " " + obj.countTitle + "</span>"), widget.metricDetailNode);
                        _domConstruct['default'].place(widget.itemTemplate.apply({ value: obj.value }, widget), widget.metricDetailNode);
                    }
                }, function (error) {
                    console.warn(error);
                    _domConstruct['default'].empty(widget.metricDetailNode);
                    _domConstruct['default'].place(widget.itemTemplate.apply({ value: obj.value }, widget), widget.metricDetailNode);
                });
            }
        },
        navToReportView: function navToReportView() {
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
                view.show({ returnTo: this.returnToId, titleText: this.titleText, where: this.activeFilter });
            }
        },
        changeRange: function changeRange() {
            var view;
            view = this.parent;
            view.dayValue = this.value;
            // Change the previously selected range color back to what it was and the new selected range color to selected
            view.selectedRange.style['background-color'] = view.getColor();
            view.selectedRange = this.domNode.parentNode;
            view.selectedRange.style['background-color'] = view.getSelectedColor();
            view.rebuildWidgets(view.entry);
        },
        buildView: function buildView(entry) {
            var itemNode, frag, rangeFrag, widgetOptions, rangeOptions, obj;
            frag = document.createDocumentFragment();
            rangeFrag = document.createDocumentFragment();

            this.destroyWidgets();
            this.metricWidgets = [];
            this.rangeWidgets = [];
            // Create metrics widgets and place them in the metricsNode
            widgetOptions = this.createMetricLayout(entry) || [];
            _array['default'].forEach(widgetOptions, function (options) {
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
                    var widget = new _MetricWidget['default'](options);
                    itemNode = _domConstruct['default'].toDom(this.metricItemTemplate.apply(options, this));
                    frag.appendChild(itemNode);
                    widget.placeAt(itemNode, 'last');
                    this.registerWidget(widget);
                }
            }, this);
            this.getQueryData();

            // Check if range widgets are desired, if so create and place in rangeNode
            if (this.createRangeLayout) {
                rangeOptions = this.createRangeLayout() || [];
                _array['default'].forEach(rangeOptions, function (options) {
                    options['changeRange'] = this.changeRange;
                    options['parent'] = this;
                    var widget = new _DateRangeWidget['default'](options);
                    itemNode = _domConstruct['default'].toDom(this.rangeItemTemplate.apply(options, this));
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
                _domConstruct['default'].place(rangeFrag, this.rangeNode, 'last');
            }
            if (frag.childNodes.length > 0) {
                _domConstruct['default'].place(frag, this.metricsNode, 'last');
            }
        },
        buildNoDataView: function buildNoDataView(entry) {
            var node, frag;
            frag = document.createDocumentFragment();
            node = _domConstruct['default'].toDom(this.nodataTemplate.apply(entry, this));
            frag.appendChild(node);
            if (frag.childNodes.length > 0) {
                _domConstruct['default'].place(frag, this.metricsNode, 'last');
            }
        },
        getAbrv: function getAbrv() {
            var abrv = '';
            abrv = _crmFormat2['default'].formatUserInitial(this.titleText);
            return abrv;
        },
        getColor: function getColor() {
            return this.color;
        },
        getMetricColor: function getMetricColor() {
            return this.metricColor ? this.metricColor : this.color;
        },
        getSelectedColor: function getSelectedColor() {
            return this.selectedColor;
        },
        getStore: function getStore() {
            var store = new _SData['default']({
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
        getWhere: function getWhere() {
            return this.queryWhere;
        },
        getQueryStore: function getQueryStore() {
            var store = [];

            if (!(this.queryArgs instanceof Array) && this.queryArgs) {
                this.queryArgs = [this.queryArgs];
            }
            if (!this.queryName) {
                this.queryName = 'executeMetric';
            }

            _array['default'].forEach(this.queryArgs, function (arg) {
                store.push(new _SData['default']({
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
        rebuildWidgets: function rebuildWidgets(entry) {
            //this.destroyWidgets();
            _domConstruct['default'].empty(this.metricsNode);
            this.metricWidgets = [];
            this.rebuildValues();

            var widgetOptions, itemNode, frag, obj;
            frag = document.createDocumentFragment();
            // Create metrics widgets and place them in the metricNode
            widgetOptions = this.createMetricLayout(entry) || [];
            _array['default'].forEach(widgetOptions, function (options) {
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
                    var widget = new _MetricWidget['default'](options);
                    itemNode = _domConstruct['default'].toDom(this.metricItemTemplate.apply(options, this));
                    frag.appendChild(itemNode);
                    widget.placeAt(itemNode, 'last');
                    this.registerWidget(widget);
                    //widget.requestData();
                }
            }, this);
            this.getQueryData();
            if (frag.childNodes.length > 0) {
                _domConstruct['default'].place(frag, this.metricsNode, 'last');
            }
        },
        rebuildValues: function rebuildValues() {
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
        pastDays: function pastDays(property, from, to) {
            var now, pastWeekStart, today, query;

            now = (0, _moment2['default'])();

            pastWeekStart = now.clone().subtract(from, 'days').startOf('day');

            if (!to) {
                today = now.clone().endOf('day');
            } else {
                today = now.clone().subtract(to, 'days').endOf('day');
            }

            query = _string['default'].substitute('((' + property + ' between @${0}@ and @${1}@) or (' + property + ' between @${2}@ and @${3}@))', [_convert['default'].toIsoStringFromDate(pastWeekStart.toDate()), _convert['default'].toIsoStringFromDate(today.toDate()), pastWeekStart.format('YYYY-MM-DDT00:00:00[Z]'), today.format('YYYY-MM-DDT23:59:59[Z]')]);
            return query;
        },
        /**
         * Sets up the date range search query based on the this.dayValue and searches between that many days ago and today
         * @params {string} Property to be searched for
         */
        pastDaysLt: function pastDaysLt(property) {
            var now, pastDay, query;

            now = (0, _moment2['default'])();

            pastDay = now.clone().subtract(this.dayValue, 'days').startOf('day');

            query = _string['default'].substitute('(' + property + ' lt @${0}@ or (' + property + ' lt @${1}@))', [_convert['default'].toIsoStringFromDate(pastDay.toDate()), pastDay.format('YYYY-MM-DDT00:00:00[Z]')]);
            return query;
        },
        hasValidOptions: function hasValidOptions(options) {
            return options && options.valueNeeded;
        },
        hasValueOptions: function hasValueOptions(options) {
            return options && options.value;
        },
        destroyWidgets: function destroyWidgets() {
            _array['default'].forEach(this.metricWidgets, function (widget) {
                widget.destroy();
            }, this);
        }
    });

    var rvm = new _RelatedViewManager['default']();
    rvm.registerType('dashboard_widget_base', __class);
    module.exports = __class;
});
