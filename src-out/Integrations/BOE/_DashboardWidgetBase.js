define("crm/Integrations/BOE/_DashboardWidgetBase", ["exports", "dojo/_base/declare", "dojo/_base/lang", "dojo/when", "dojo/promise/all", "dojo/_base/Deferred", "../../Format", "../../Aggregate", "argos/Convert", "argos/RelatedViewManager", "argos/_RelatedViewWidgetBase", "argos/Store/SData", "./Utility", "argos/I18n", "dojo/string"], function (_exports, _declare, _lang, _when, _all, _Deferred, _Format, _Aggregate, _Convert, _RelatedViewManager, _RelatedViewWidgetBase2, _SData, _Utility, _I18n, _string) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _when = _interopRequireDefault(_when);
  _all = _interopRequireDefault(_all);
  _Deferred = _interopRequireDefault(_Deferred);
  _Format = _interopRequireDefault(_Format);
  _Aggregate = _interopRequireDefault(_Aggregate);
  _Convert = _interopRequireDefault(_Convert);
  _RelatedViewManager = _interopRequireDefault(_RelatedViewManager);
  _RelatedViewWidgetBase2 = _interopRequireDefault(_RelatedViewWidgetBase2);
  _SData = _interopRequireDefault(_SData);
  _Utility = _interopRequireDefault(_Utility);
  _I18n = _interopRequireDefault(_I18n);
  _string = _interopRequireDefault(_string);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  /* Copyright 2017 Infor
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var resource = (0, _I18n["default"])('dashboardWidgetBase');

  var __class = (0, _declare["default"])('crm.Integrations.BOE._DashboardWidgetBase', [_RelatedViewWidgetBase2["default"]], {
    owner: null,
    id: 'dashboard-widget-base',
    titleText: resource.titleText,
    categoryText: resource.categoryText,
    color: '#4b5656',
    selectedColor: '#4b1212',
    metricWidgets: null,
    metricLayout: null,
    rangeLayout: null,
    store: null,
    service: null,
    selectedRange: null,
    values: null,
    formatter: _Format["default"].bigNumber,
    contractName: 'dynamic',
    autoLoad: false,
    isLoaded: false,
    enabled: false,

    /*
    * @cfg {String} resourceKind
    * The SData resource kind the view is responsible for.  This will be used as the default resource kind
    * for all SData requests.
    */
    resourceKind: null,

    /*
     * @cfg {String[]}
     * A list of fields to be selected in an SData request.
     */
    querySelect: null,

    /*
     * @cfg {String[]?}
     * A list of child properties to be included in an SData request.
     */
    queryInclude: null,
    queryName: null,

    /*
     * @cfg {String}
     * A where clause to filter the  SData request.
     */
    queryWhere: '',

    /*
     * @cfg {String}
     * A orderBy clause to sort the  SData request.
     */
    queryOrderBy: '',

    /*
     * @cfg {String?/Function?}
     * The default resource property for an SData request.
     */
    resourceProperty: null,

    /*
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
    pageSize: 100,
    dayValue: 7,
    decorators: null,
    relatedContentTemplate: new Simplate(['{% if($.enabled) { %}', '{%! $$.dashboardTemplate %}', '{% } %}']),
    dashboardTemplate: new Simplate(['<div class="dashboard-widget">', '{%! $$.dashboardHeaderTemplateStart %}', '<div class="node-container accordion-pane">', '{%! $$.dashboardRangeTemplate %}', '<div data-dojo-attach-point="metricsNode" class="dashboard-metric-list"></div>', '</div>', '</div>', '{%! $$.dashboardHeaderTemplateEnd %}']),
    dashboardIconTemplate: new Simplate(['{% if($.titleText) { %}', '<span class="dashboard-icon round info badge" style="background-color:{%= $$.getColor($) %}" >', '{%: $$.getAbrv($) %}', '</span>', '{% } %}']),
    dashboardHeaderTemplateEnd: new Simplate(['{% if($.titleText || $.categoryText) { %}', '</div>', '{% } %}']),
    dashboardHeaderTemplateStart: new Simplate(['{% if($.titleText || $.categoryText) { %}', "<div class=\"dashboard-header accordion\" data-dojo-attach-point=\"dashboardHeaderNode\">\n      <div class=\"accordion-header is-selected\">\n        <a href=\"#\" class=\"dashboard-header-text\">\n        {%! $$.dashboardIconTemplate %}\n        {% if($.titleText) { %}\n          <div class=\"dashboard-title\">{%: ($.titleText) %} {%: $$.getFormattedCurrencyCodeForTitle() %}</div>\n        {% } %}\n        {% if($.categoryText) { %}\n         <div class=\"dashboard-category\">{%: ($.categoryText) %}</div>\n        {% } %}\n        </a>\n      </div>\n    ", '{% } %}']),
    dashboardRangeTemplate: new Simplate(['{% if($.createRangeLayout) { %}', '<div data-dojo-attach-point="rangeNode" class="dashboard-range-list"></div>', '{% } %}']),
    rangeItemTemplate: new Simplate(['<div class="dashboard-range-item" style="background-color:{%= $$.getColor($) %}">', '</div>']),
    metricItemTemplate: new Simplate(['<div class="dashboard-metric-item {%: $.cls %}" style="background-color:{%= $$.getMetricColor($) %}">', '</div>']),
    nodataTemplate: new Simplate(['<div class="dashboard-nodatafound">', '{%: $.message %}', '</div>']),
    onInit: function onInit() {
      this.service = App.getService(false);

      if (this.autoLoad && this.enabled) {
        this.onLoad();
      }
    },
    hasParentEntry: function hasParentEntry() {
      return this.parentEntry ? true : false;
    },
    onLoad: function onLoad() {
      var _this = this;

      var promise;

      if (!this.enabled) {
        return promise;
      }

      this.rebuildValues();

      if (!this.loadingNode) {
        this.loadingNode = $(this.loadingTemplate.apply(this));
      }

      if (this.hasParentEntry()) {
        promise = this.getData();
        promise.then(function (data) {
          if (data && data.length > 0) {
            _this.entry = data[0];

            _this.processEntry(_this.entry);
          } else {
            _this.buildNoDataView({
              message: 'no data found'
            });
          }
        }, function (data) {
          _this.buildErrorView(data);
        });
      } else {
        this.buildErrorView({});
      }

      this.isLoaded = true;
      $(this.dashboardHeaderNode).accordion();
    },
    processEntry: function processEntry(entry) {
      this.buildView(entry);
    },
    getData: function getData() {
      var deferred = new _Deferred["default"]();
      var store = this.getStore();

      if (store) {
        var queryOptions = {};
        var queryResults = store.query(null, queryOptions);
        (0, _when["default"])(queryResults, function (feed) {
          deferred.resolve(feed);
        }, function (err) {
          deferred.reject({
            message: "error:".concat(err)
          });
        });
        return deferred.promise;
      }

      deferred.reject({
        message: 'no data found'
      });
      return deferred.promise;
    },
    getFormattedCurrencyCodeForTitle: function getFormattedCurrencyCodeForTitle() {
      var result = '';

      var baseCurrencyCode = _Utility["default"].getBaseCurrencyCode();

      if (baseCurrencyCode) {
        result = "(".concat(baseCurrencyCode, ")");
      }

      return result;
    },
    getQueryData: function getQueryData() {
      var _this2 = this;

      var queryOptions = {
        count: this.pageSize,
        start: 0
      };
      var queryResults = [];
      var store = this.getQueryStore();
      store.forEach(function (storeInstance) {
        queryResults.push(storeInstance.query(null, queryOptions));
      }, this); // Maintain the query order in the data from the resolve

      (0, _all["default"])(queryResults).then(function (results) {
        if (results.length > 1) {
          _this2.sendValues(results);
        } else {
          _this2.sendValues(results[0]);
        }
      });
    },
    registerWidget: function registerWidget(widget) {
      this.metricWidgets.push(widget);
    },
    sendValues: function sendValues(results) {
      var _this3 = this;

      this.metricWidgets.forEach(function (widget) {
        var obj = _this3.values.filter(_this3.checkForValue, widget)[0];

        var valueFn;
        var values;
        var valueIndex = [];

        if (!obj.value) {
          if (obj.aggregate) {
            if (obj.aggregateModule) {
              valueFn = obj.aggregateModule[obj.aggregate];
            } else {
              valueFn = _Aggregate["default"][obj.aggregate];
            }
          }

          if (!(obj.queryIndex instanceof Array)) {
            // Single query, so get the single index value from the results
            valueIndex.push(obj.queryIndex);
            values = results[obj.queryIndex];
            (0, _when["default"])(valueFn, function (fn) {
              _this3.applyValue(widget, fn, values, valueIndex, obj);
            }, function onError(error) {
              this._onQueryError(error, widget);
            });
          } else {
            // Multi query, so pull the indices and add them to a result array to pass to the aggregate function
            values = [];

            for (var j = 0; j < obj.queryIndex.length; j++) {
              values.push(results[obj.queryIndex[j]]);
              valueIndex.push(obj.queryIndex[j]);
            }

            (0, _when["default"])(valueFn, function (fn) {
              _this3.applyValue(widget, fn, values, valueIndex, obj);
            }, function onError(error) {
              this._onQueryError(error, widget);
            });
          }
        } else {
          _this3.applyValue(widget, null, null, valueIndex, obj);
        }
      });
    },
    applyValue: function applyValue(widget, valueFn, values, valueIndex, obj) {
      var _this4 = this;

      var formatterFn; // Sales dashboard widget is using formatModule, but all of the others are using formatterModule. Accept both so overrides happen correctly.

      if (widget.formatterModule && widget.formatter || widget.formatModule && widget.formatter) {
        var module = widget.formatterModule || widget.formatModule;
        formatterFn = module[widget.formatter];
      }

      if (valueFn) {
        // If there is a function to call, call it and apply that value to the obj.value
        obj.value = _Utility["default"].aggregateLookup[obj.aggregate](valueFn, widget, values); // fn.call(widget, result);
        // lets set the color on the widget.

        this.applyDecorator(obj.value, widget);
      } // get the formatter


      (0, _when["default"])(formatterFn, function (func) {
        if (typeof func === 'function') {
          widget.formatter = func;
        }
      }); // Apply the value to the widget itself by passing obj.value (from the values array) to the value property of the widget

      if (obj.count) {
        this._getCountValue(widget, obj).then(function (result) {
          if (result >= 0) {
            obj.countValue = result;
          }

          _this4.applyDataToWidget(widget, obj);
        });
      } else {
        this.applyDataToWidget(widget, obj);
      }
    },
    applyDecorator: function applyDecorator(value, widget) {
      if (widget.decorator) {
        if (typeof widget.decorator === 'function') {
          widget.decorator(value, widget);
        } else {
          var decorators = this.getDecorators();
          var decorator = decorators[widget.decorator];

          if (decorator && decorator.fn) {
            decorator.fn.call(decorator, value, widget);
          }
        }
      }
    },
    getDecorators: function getDecorators() {
      if (!this.decorators) {
        this.decorators = {
          positiveTrend: {
            positiveValueColor: 'green',
            negativeValueColor: 'red',
            fn: function fn(value, metricWidget) {
              if (value > 0) {
                metricWidget.setValueColor(this.positiveValueColor);
              } else {
                metricWidget.setValueColor(this.negativeValueColor);
              }
            }
          },
          negativeTrend: {
            positiveValueColor: 'red',
            negativeValueColor: 'green',
            fn: function fn(value, metricWidget) {
              if (value > 0) {
                metricWidget.setValueColor(this.positiveValueColor);
              } else {
                metricWidget.setValueColor(this.negativeValueColor);
              }
            }
          }
        };
      }

      return this.decorators;
    },
    checkForValue: function checkForValue(value) {
      return value.name === this.valueNeeded;
    },
    _onQueryError: function _onQueryError(error, widget) {
      $(widget.metricDetailNode).replaceWith(widget.itemTemplate.apply({
        value: error
      }, widget));
    },
    _getCountValue: function _getCountValue(widget, obj) {
      var def = new _Deferred["default"]();
      var queryArg = this.queryArgs && this.queryArgs[obj.queryIndex] ? this.queryArgs[obj.queryIndex] : null;

      if (!queryArg) {
        def.resolved(-1);
        return def.promise;
      }

      var queryOptions = {
        count: 1,
        start: 0,
        select: ['$key'],
        where: queryArg[1]._activeFilter
      };
      var store = new _SData["default"]({
        service: App.services.crm,
        contractName: 'dynamic',
        resourceKind: queryArg[0],
        // resourcekind;
        scope: this
      });
      var queryResults = store.query(null, queryOptions);
      (0, _when["default"])(queryResults, function () {
        def.resolve(queryResults.total);
      }, function (error) {
        console.warn(error); //eslint-disable-line

        def.reject(error);
      });
      return def.promise;
    },
    applyDataToWidget: function applyDataToWidget(widget, data) {
      $(widget.metricDetailNode).empty();

      if (!data.error) {
        if (data.count && data.countValue >= 0) {
          $(widget.metricDetailNode).prepend($("<span class=\"metric-count\">".concat(_string["default"].substitute(data.countTitle ? _Format["default"].encode(data.countTitle) : _Format["default"].encode(widget.countTitle), [_Format["default"].encode(data.countValue)]), "</span>")));
        }
      }

      $(widget.metricDetailNode).prepend(widget.itemTemplate.apply({
        value: data.value
      }, widget));
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
        view.show({
          returnTo: this.returnToId,
          titleText: this.titleText,
          where: this.activeFilter
        });
      }
    },
    changeRange: function changeRange() {
      var view = this.parent;
      view.dayValue = this.value; // Change the previously selected range color back to what it was and the new selected range color to selected

      view.selectedRange.style['background-color'] = view.getColor();
      view.selectedRange = this.domNode.parentNode;
      view.selectedRange.style['background-color'] = view.getSelectedColor();
      view.rebuildWidgets(view.entry);
    },
    buildView: function buildView() {},
    buildNoDataView: function buildNoDataView(entry) {
      var frag = document.createDocumentFragment();
      var node = $(this.nodataTemplate.apply(entry, this));
      frag.appendChild(node);

      if (frag.childNodes.length > 0) {
        $(this.metricsNode).append(frag);
      }
    },
    getAbrv: function getAbrv() {
      var abrv = '';
      abrv = _Format["default"].formatUserInitial(this.titleText);
      return abrv;
    },
    getColor: function getColor() {
      return this.color;
    },
    getMetricColor: function getMetricColor() {
      return this.metricColor ? this.metricColor : '';
    },
    getSelectedColor: function getSelectedColor() {
      return this.selectedColor;
    },
    getStore: function getStore() {
      var store = new _SData["default"]({
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

      this.queryArgs.forEach(function createStore(arg) {
        store.push(new _SData["default"]({
          request: this.request,
          service: App.services.crm,
          resourceKind: arg[0],
          resourcePredicate: this.resourcePredicate,
          contractName: this.contractName,
          queryName: this.queryName,
          queryArgs: arg[1],
          orderBy: this.queryOrderBy,
          idProperty: this.idProperty,
          applicationName: this.applicationName,
          scope: this
        }));
      }, this);
      return store;
    },
    rebuildWidgets: function rebuildWidgets() {},
    rebuildValues: function rebuildValues() {
      // TODO: add in functionality to check if value is dependent on datetime (i.e. rangeValue dependent) and force it to update if necessary
      for (var z = 0; z < this.values.length; z++) {
        this.values[z].value = null;

        if (this.values[z].count >= 0) {
          this.values[z].count = true;
        }
      }
    },

    /*
     * Sets up the date range search query based upon the from and to value (can use this.dayValue which is set by the range nodes)
     * @params {string, int, int} Property to be searched for, the days ago from the current, and days up to (from current)
     */
    pastDays: function pastDays(property, from, to) {
      var now = moment();
      var pastWeekStart = now.clone().subtract(from, 'days').startOf('day');
      var today;

      if (!to) {
        today = now.clone().endOf('day');
      } else {
        today = now.clone().subtract(to, 'days').endOf('day');
      }

      var query = "((".concat(property, " between @").concat(_Convert["default"].toIsoStringFromDate(pastWeekStart.toDate()), "@ and @").concat(_Convert["default"].toIsoStringFromDate(today.toDate()), "@) or (").concat(property, " between @").concat(pastWeekStart.format('YYYY-MM-DDT00:00:00[Z]'), "@ and @").concat(today.format('YYYY-MM-DDT23:59:59[Z]'), "@))");
      return query;
    },

    /*
     * Sets up the date range search query based on the this.dayValue and searches between that many days ago and today
     * @params {string} Property to be searched for
     */
    pastDaysLt: function pastDaysLt(property) {
      var now = moment();
      var pastDay = now.clone().subtract(this.dayValue, 'days').startOf('day');
      var query = "(".concat(property, " lt @").concat(_Convert["default"].toIsoStringFromDate(pastDay.toDate()), "@ or (").concat(property, " lt @").concat(pastDay.format('YYYY-MM-DDT00:00:00[Z]'), "@))");
      return query;
    },
    hasValidOptions: function hasValidOptions(options) {
      return options && options.valueNeeded;
    },
    hasValueOptions: function hasValueOptions(options) {
      return options && options.value;
    },
    destroyWidgets: function destroyWidgets() {
      if (this.metricWidgets) {
        this.metricWidgets.forEach(function (widget) {
          widget.destroy();
        });
      }
    },
    toggleView: function toggleView(evt) {
      this.onToggleView();
      evt.stopPropagation();
    },
    onToggleView: function onToggleView(forceOpen) {
      if (!this.isLoaded) {
        this.onLoad();
      }

      $(this.dashboardHeaderNode).toggleClass(this.collapsedClass, forceOpen);
    }
  });

  var rvm = new _RelatedViewManager["default"]();
  rvm.registerType('dashboard_widget_base', __class);

  _lang["default"].setObject('crm.Views._DashboardWidgetBase', __class);

  _lang["default"].setObject('icboe._DashboardWidgetBase', __class);

  var _default = __class;
  _exports["default"] = _default;
});