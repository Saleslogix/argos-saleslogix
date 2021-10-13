define('crm/Integrations/BOE/_DashboardWidgetBase', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/when', 'dojo/promise/all', 'dojo/_base/Deferred', '../../Format', '../../Aggregate', 'argos/Convert', 'argos/RelatedViewManager', 'argos/_RelatedViewWidgetBase', 'argos/Store/SData', './Utility', 'argos/I18n', 'dojo/string'], function (module, exports, _declare, _lang, _when, _all, _Deferred, _Format, _Aggregate, _Convert, _RelatedViewManager, _RelatedViewWidgetBase2, _SData, _Utility, _I18n, _string) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _when2 = _interopRequireDefault(_when);

  var _all2 = _interopRequireDefault(_all);

  var _Deferred2 = _interopRequireDefault(_Deferred);

  var _Format2 = _interopRequireDefault(_Format);

  var _Aggregate2 = _interopRequireDefault(_Aggregate);

  var _Convert2 = _interopRequireDefault(_Convert);

  var _RelatedViewManager2 = _interopRequireDefault(_RelatedViewManager);

  var _RelatedViewWidgetBase3 = _interopRequireDefault(_RelatedViewWidgetBase2);

  var _SData2 = _interopRequireDefault(_SData);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _string2 = _interopRequireDefault(_string);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  const resource = (0, _I18n2.default)('dashboardWidgetBase');

  const __class = (0, _declare2.default)('crm.Integrations.BOE._DashboardWidgetBase', [_RelatedViewWidgetBase3.default], {
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
    formatter: _Format2.default.bigNumber,
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
    dashboardHeaderTemplateStart: new Simplate(['{% if($.titleText || $.categoryText) { %}', `<div class="dashboard-header accordion" data-dojo-attach-point="dashboardHeaderNode">
      <div class="accordion-header is-selected">
        <a href="#" class="dashboard-header-text">
        {%! $$.dashboardIconTemplate %}
        {% if($.titleText) { %}
          <div class="dashboard-title">{%: ($.titleText) %} {%: $$.getFormattedCurrencyCodeForTitle() %}</div>
        {% } %}
        {% if($.categoryText) { %}
         <div class="dashboard-category">{%: ($.categoryText) %}</div>
        {% } %}
        </a>
      </div>
    `, '{% } %}']),
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
      let promise;
      if (!this.enabled) {
        return promise;
      }
      this.rebuildValues();

      if (!this.loadingNode) {
        this.loadingNode = $(this.loadingTemplate.apply(this));
      }
      if (this.hasParentEntry()) {
        promise = this.getData();
        promise.then(data => {
          if (data && data.length > 0) {
            this.entry = data[0];
            this.processEntry(this.entry);
          } else {
            this.buildNoDataView({ message: 'no data found' });
          }
        }, data => {
          this.buildErrorView(data);
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
      const deferred = new _Deferred2.default();
      const store = this.getStore();

      if (store) {
        const queryOptions = {};
        const queryResults = store.query(null, queryOptions);
        (0, _when2.default)(queryResults, feed => {
          deferred.resolve(feed);
        }, err => {
          deferred.reject({ message: `error:${err}` });
        });
        return deferred.promise;
      }
      deferred.reject({ message: 'no data found' });
      return deferred.promise;
    },
    getFormattedCurrencyCodeForTitle: function getFormattedCurrencyCodeForTitle() {
      let result = '';
      const baseCurrencyCode = _Utility2.default.getBaseCurrencyCode();

      if (baseCurrencyCode) {
        result = `(${baseCurrencyCode})`;
      }

      return result;
    },
    getQueryData: function getQueryData() {
      const queryOptions = {
        count: this.pageSize,
        start: 0
      };
      const queryResults = [];
      const store = this.getQueryStore();

      store.forEach(storeInstance => {
        queryResults.push(storeInstance.query(null, queryOptions));
      }, this);

      // Maintain the query order in the data from the resolve
      (0, _all2.default)(queryResults).then(results => {
        if (results.length > 1) {
          this.sendValues(results);
        } else {
          this.sendValues(results[0]);
        }
      });
    },
    registerWidget: function registerWidget(widget) {
      this.metricWidgets.push(widget);
    },
    sendValues: function sendValues(results) {
      this.metricWidgets.forEach(widget => {
        const obj = this.values.filter(this.checkForValue, widget)[0];
        let valueFn;
        let values;
        const valueIndex = [];
        if (!obj.value) {
          if (obj.aggregate) {
            if (obj.aggregateModule) {
              valueFn = obj.aggregateModule[obj.aggregate];
            } else {
              valueFn = _Aggregate2.default[obj.aggregate];
            }
          }
          if (!(obj.queryIndex instanceof Array)) {
            // Single query, so get the single index value from the results
            valueIndex.push(obj.queryIndex);
            values = results[obj.queryIndex];
            (0, _when2.default)(valueFn, fn => {
              this.applyValue(widget, fn, values, valueIndex, obj);
            }, function onError(error) {
              this._onQueryError(error, widget);
            });
          } else {
            // Multi query, so pull the indices and add them to a result array to pass to the aggregate function
            values = [];
            for (let j = 0; j < obj.queryIndex.length; j++) {
              values.push(results[obj.queryIndex[j]]);
              valueIndex.push(obj.queryIndex[j]);
            }
            (0, _when2.default)(valueFn, fn => {
              this.applyValue(widget, fn, values, valueIndex, obj);
            }, function onError(error) {
              this._onQueryError(error, widget);
            });
          }
        } else {
          this.applyValue(widget, null, null, valueIndex, obj);
        }
      });
    },
    applyValue: function applyValue(widget, valueFn, values, valueIndex, obj) {
      let formatterFn;

      // Sales dashboard widget is using formatModule, but all of the others are using formatterModule. Accept both so overrides happen correctly.
      if (widget.formatterModule && widget.formatter || widget.formatModule && widget.formatter) {
        const module = widget.formatterModule || widget.formatModule;
        formatterFn = module[widget.formatter];
      }

      if (valueFn) {
        // If there is a function to call, call it and apply that value to the obj.value
        obj.value = _Utility2.default.aggregateLookup[obj.aggregate](valueFn, widget, values); // fn.call(widget, result);

        // lets set the color on the widget.
        this.applyDecorator(obj.value, widget);
      }

      // get the formatter
      (0, _when2.default)(formatterFn, func => {
        if (typeof func === 'function') {
          widget.formatter = func;
        }
      });

      // Apply the value to the widget itself by passing obj.value (from the values array) to the value property of the widget
      if (obj.count) {
        this._getCountValue(widget, obj).then(result => {
          if (result >= 0) {
            obj.countValue = result;
          }
          this.applyDataToWidget(widget, obj);
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
          const decorators = this.getDecorators();
          const decorator = decorators[widget.decorator];
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
      $(widget.metricDetailNode).replaceWith(widget.itemTemplate.apply({ value: error }, widget));
    },
    _getCountValue: function _getCountValue(widget, obj) {
      const def = new _Deferred2.default();
      const queryArg = this.queryArgs && this.queryArgs[obj.queryIndex] ? this.queryArgs[obj.queryIndex] : null;
      if (!queryArg) {
        def.resolved(-1);
        return def.promise;
      }

      const queryOptions = {
        count: 1,
        start: 0,
        select: ['$key'],
        where: queryArg[1]._activeFilter
      };

      const store = new _SData2.default({
        service: App.services.crm,
        contractName: 'dynamic',
        resourceKind: queryArg[0], // resourcekind;
        scope: this
      });

      const queryResults = store.query(null, queryOptions);
      (0, _when2.default)(queryResults, () => {
        def.resolve(queryResults.total);
      }, error => {
        console.warn(error); //eslint-disable-line
        def.reject(error);
      });
      return def.promise;
    },
    applyDataToWidget: function applyDataToWidget(widget, data) {
      $(widget.metricDetailNode).empty();
      if (!data.error) {
        if (data.count && data.countValue >= 0) {
          $(widget.metricDetailNode).prepend($(`<span class="metric-count">${_string2.default.substitute(data.countTitle ? _Format2.default.encode(data.countTitle) : _Format2.default.encode(widget.countTitle), [_Format2.default.encode(data.countValue)])}</span>`));
        }
      }

      $(widget.metricDetailNode).prepend(widget.itemTemplate.apply({ value: data.value }, widget));
    },
    navToReportView: function navToReportView() {
      let view;

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
      const view = this.parent;
      view.dayValue = this.value;
      // Change the previously selected range color back to what it was and the new selected range color to selected
      view.selectedRange.style['background-color'] = view.getColor();
      view.selectedRange = this.domNode.parentNode;
      view.selectedRange.style['background-color'] = view.getSelectedColor();
      view.rebuildWidgets(view.entry);
    },
    buildView: function buildView() {},
    buildNoDataView: function buildNoDataView(entry) {
      const frag = document.createDocumentFragment();
      const node = $(this.nodataTemplate.apply(entry, this));
      frag.appendChild(node);
      if (frag.childNodes.length > 0) {
        $(this.metricsNode).append(frag);
      }
    },
    getAbrv: function getAbrv() {
      let abrv = '';
      abrv = _Format2.default.formatUserInitial(this.titleText);
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
      const store = new _SData2.default({
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
      const store = [];

      if (!(this.queryArgs instanceof Array) && this.queryArgs) {
        this.queryArgs = [this.queryArgs];
      }
      if (!this.queryName) {
        this.queryName = 'executeMetric';
      }

      this.queryArgs.forEach(function createStore(arg) {
        store.push(new _SData2.default({
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
      for (let z = 0; z < this.values.length; z++) {
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
      const now = moment();
      const pastWeekStart = now.clone().subtract(from, 'days').startOf('day');
      let today;

      if (!to) {
        today = now.clone().endOf('day');
      } else {
        today = now.clone().subtract(to, 'days').endOf('day');
      }

      const query = `((${property} between @${_Convert2.default.toIsoStringFromDate(pastWeekStart.toDate())}@ and @${_Convert2.default.toIsoStringFromDate(today.toDate())}@) or (${property} between @${pastWeekStart.format('YYYY-MM-DDT00:00:00[Z]')}@ and @${today.format('YYYY-MM-DDT23:59:59[Z]')}@))`;
      return query;
    },
    /*
     * Sets up the date range search query based on the this.dayValue and searches between that many days ago and today
     * @params {string} Property to be searched for
     */
    pastDaysLt: function pastDaysLt(property) {
      const now = moment();
      const pastDay = now.clone().subtract(this.dayValue, 'days').startOf('day');

      const query = `(${property} lt @${_Convert2.default.toIsoStringFromDate(pastDay.toDate())}@ or (${property} lt @${pastDay.format('YYYY-MM-DDT00:00:00[Z]')}@))`;
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
        this.metricWidgets.forEach(widget => {
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

  const rvm = new _RelatedViewManager2.default();
  rvm.registerType('dashboard_widget_base', __class);
  _lang2.default.setObject('crm.Views._DashboardWidgetBase', __class);
  _lang2.default.setObject('icboe._DashboardWidgetBase', __class);
  exports.default = __class;
  module.exports = exports['default'];
});