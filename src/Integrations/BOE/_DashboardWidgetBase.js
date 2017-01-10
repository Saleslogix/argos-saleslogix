/*
* See copyright file.
*/
import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import when from 'dojo/when';
import all from 'dojo/promise/all';
import Deferred from 'dojo/_base/Deferred';
import domConstruct from 'dojo/dom-construct';
import array from 'dojo/_base/array';
import crmFormat from '../../Format';
import convert from 'argos/Convert';
import RelatedViewManager from 'argos/RelatedViewManager';
import _RelatedViewWidgetBase from 'argos/_RelatedViewWidgetBase';
import SData from 'argos/Store/SData';
import Utility from './Utility';
import domClass from 'dojo/dom-class';
import getResource from 'argos/I18n';

const resource = getResource('dashboardWidgetBase');

/**
 * @class crm.Views._DashboardWidgetBase
 *
 *
 * @extends argos._RelatedViewWidgetBase
 *
 */
const __class = declare('crm.Integrations.BOE._DashboardWidgetBase', [_RelatedViewWidgetBase], {
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
  formatter: 'bigNumber',
  contractName: 'dynamic',
  collapsedClass: 'collapsed',
  autoLoad: false,
  isLoaded: false,
  enabled: false,
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
  pageSize: 100,
  dayValue: 7,
  decorators: null,
  relatedContentTemplate: new Simplate([
    '{% if($.enabled) { %}',
    '{%! $$.dashboardTemplate %}',
    '{% } %}',
  ]),
  dashboardTemplate: new Simplate([
    '<div class="dashboard-widget">',
    '{%! $$.dashboardHeaderTemplate %}',
    '<div class="node-container">',
    '{%! $$.dashboardRangeTemplate %}',
    '<div data-dojo-attach-point="metricsNode" class="dashboard-metric-list"></div>',
    '</div>',
    '</div>',
  ]),
  dashboardIconTemplate: new Simplate([
    '{% if($.titleText) { %}',
    '<span class="dashboard-icon" style="background-color:{%= $$.getColor($) %}" >',
    '{%: $$.getAbrv($) %}',
    '</span>',
    '{% } %}',
  ]),
  dashboardHeaderTemplate: new Simplate([
    '{% if($.titleText || $.categoryText) { %}',
    '<div data-dojo-attach-point="dashboardHeaderNode" data-dojo-attach-event="onclick:toggleView" class="dashboard-header {%: $._getCollapsedClass() %} {%: $$.headerClass %}">',
    '<div class="dashboard-header-content">',
    '{%! $$.dashboardIconTemplate %}',
    '<div class="dashboard-header-text">',
    '{% if($.titleText) { %}',
    '<div class="dashboard-title">{%: $.titleText %} {%: $$.getFormattedCurrencyCodeForTitle() %}</div>',
    '{% } %}',
    '{% if($.categoryText) { %}',
    '<div class="dashboard-category">{%: $.categoryText %}</div>',
    '{% } %}',
    '</div>',
    '</div>',
    '<button class="fa fa-chevron-down"></button>',
    '</div>',
    '{% } %}',
  ]),
  dashboardRangeTemplate: new Simplate([
    '{% if($.createRangeLayout) { %}',
    '<div data-dojo-attach-point="rangeNode" class="dashboard-range-list"></div>',
    '{% } %}',
  ]),
  rangeItemTemplate: new Simplate([
    '<div class="dashboard-range-item" style="background-color:{%= $$.getColor($) %}">',
    '</div>',
  ]),
  metricItemTemplate: new Simplate([
    '<div class="dashboard-metric-item {%: $.cls %}" style="background-color:{%= $$.getMetricColor($) %}">',
    '</div>',
  ]),
  nodataTemplate: new Simplate([
    '<div class="dashboard-nodatafound">',
    '{%: $.message %}',
    '</div>',
  ]),
  onInit: function onInit() {
    this.service = App.getService(false);
    if (this.autoLoad && this.enabled) {
      this.onLoad();
    }
  },
  hasParentEntry: function hasParentEntry() {
    return (this.parentEntry) ? true : false;
  },
  onLoad: function onLoad() {
    let promise;
    if (!this.enabled) {
      return promise;
    }
    this.rebuildValues();

    if (!this.loadingNode) {
      this.loadingNode = domConstruct.toDom(this.loadingTemplate.apply(this));
    }
    if (this.hasParentEntry()) {
      promise = this.getData();
      promise.then((data) => {
        if (data && data.length > 0) {
          this.entry = data[0];
          this.processEntry(this.entry);
        } else {
          this.buildNoDataView({ message: 'no data found' });
        }
      }, (data) => {
        this.buildErrorView(data);
      });
    } else {
      this.buildErrorView({});
    }
    this.isLoaded = true;
  },
  processEntry: function processEntry(entry) {
    this.buildView(entry);
  },
  getData: function getData() {
    const deferred = new Deferred();
    const store = this.getStore();

    if (store) {
      const queryOptions = {};
      const queryResults = store.query(null, queryOptions);
      when(queryResults, (feed) => {
        deferred.resolve(feed);
      }, (err) => {
        deferred.reject({ message: `error:${err}` });
      });
      return deferred.promise;
    }
    deferred.reject({ message: 'no data found' });
    return deferred.promise;
  },
  getFormattedCurrencyCodeForTitle: function getFormattedCurrencyCodeForTitle() {
    let result = '';
    const baseCurrencyCode = Utility.getBaseCurrencyCode();

    if (baseCurrencyCode) {
      result = `(${baseCurrencyCode})`;
    }

    return result;
  },
  getQueryData: function getQueryData() {
    const queryOptions = {
      count: this.pageSize,
      start: 0,
    };
    const queryResults = [];
    const store = this.getQueryStore();

    array.forEach(store, (storeInstance) => {
      queryResults.push(storeInstance.query(null, queryOptions));
    }, this);

    // Maintain the query order in the data from the resolve
    all(queryResults).then((results) => {
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
    array.forEach(this.metricWidgets, function handleWidget(widget) {
      const obj = this.values.filter(this.checkForValue, widget)[0];
      let valueFn;
      let values;
      const valueIndex = [];
      if (!obj.value) {
        if (obj.aggregateModule && obj.aggregate) {
          valueFn = this._loadModuleFunction(obj.aggregateModule, obj.aggregate);
        }
        if (!(obj.queryIndex instanceof Array)) {
          // Single query, so get the single index value from the results
          valueIndex.push(obj.queryIndex);
          values = results[obj.queryIndex];
          when(valueFn, (fn) => {
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
          when(valueFn, (fn) => {
            this.applyValue(widget, fn, values, valueIndex, obj);
          }, function onError(error) {
            this._onQueryError(error, widget);
          });
        }
      } else {
        this.applyValue(widget, null, null, valueIndex, obj);
      }
    }, this);
  },
  applyValue: function applyValue(widget, valueFn, values, valueIndex, obj) {
    let formatterFn;

    // Sales dashboard widget is using formatModule, but all of the others are using formatterModule. Accept both so overrides happen correctly.
    if ((widget.formatterModule && widget.formatter) || (widget.formatModule && widget.formatter)) {
      const module = widget.formatterModule || widget.formatModule;
      formatterFn = this._loadModuleFunction(module, widget.formatter);
    }

    if (valueFn) {
      // If there is a function to call, call it and apply that value to the obj.value
      obj.value = Utility.aggregateLookup[obj.aggregate](valueFn, widget, values); // fn.call(widget, result);

      // lets set the color on the widget.
      this.applyDecorator(obj.value, widget);
    }

    // get the formatter
    when(formatterFn, (func) => {
      if (typeof func === 'function') {
        widget.formatter = func;
      }
    });

    // Apply the value to the widget itself by passing obj.value (from the values array) to the value property of the widget
    if (obj.count) {
      this._getCountValue(widget, obj).then((result) => {
        if (result >= 0) {
          obj.countValue = result;
          this.applyDataToWidget(widget, obj);
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
          },
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
          },
        },
      };
    }
    return this.decorators;
  },
  checkForValue: function checkForValue(value) {
    return value.name === this.valueNeeded;
  },
  _loadModuleFunction: function _loadModuleFunction(module, fn) {
    const def = new Deferred();
    try {
      require([module], lang.hitch(this, (mod) => {
        if (typeof mod === 'function') {
          const instance = new mod(); // eslint-disable-line
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
    domConstruct.place(widget.itemTemplate.apply({ value: error }, widget), widget.metricDetailNode, 'replace');
  },
  _getCountfromView: function _getCountfromView(widget, obj) {
    const view = App.getView(widget.navTo);
    const options = {};

    if (view) {
      options.where = widget.activeFilter ? widget.activeFilter : '';
      view.getListCount(options).then((result) => {
        if (result >= 0) {
          obj.count = result;
          domConstruct.empty(widget.metricDetailNode);
          domConstruct.place(domConstruct.toDom(`<span class="metric-count">${obj.count} ${obj.countTitle}</span>`), widget.metricDetailNode);
          domConstruct.place(widget.itemTemplate.apply({ value: obj.value }, widget), widget.metricDetailNode);
        }
      }, (error) => {
        console.warn(error); //eslint-disable-line
        domConstruct.empty(widget.metricDetailNode);
        domConstruct.place(widget.itemTemplate.apply({ value: obj.value }, widget), widget.metricDetailNode);
      });
    }
  },
  _getCountValue: function _getCountValue(widget, obj) {
    const def = new Deferred();
    const queryArg = (this.queryArgs && this.queryArgs[obj.queryIndex]) ? this.queryArgs[obj.queryIndex] : null;
    if (!queryArg) {
      def.resolved(-1);
      return def.promise;
    }

    const queryOptions = {
      count: 1,
      start: 0,
      select: ['$key'],
      where: queryArg[1]._activeFilter,
    };

    const store = new SData({
      service: App.services.crm,
      contractName: 'dynamic',
      resourceKind: queryArg[0], // resourcekind;
      scope: this,
    });

    const queryResults = store.query(null, queryOptions);
    when(queryResults, () => {
      def.resolve(queryResults.total);
    }, (error) => {
      console.warn(error); //eslint-disable-line
      def.reject(error);
    });
    return def.promise;
  },
  applyDataToWidget: function applyDataToWidget(widget, data) {
    domConstruct.empty(widget.metricDetailNode);
    if (!data.error) {
      if (data.count && (data.countValue >= 0)) {
        domConstruct.place(domConstruct.toDom(`<span class="metric-count">${data.countValue} ${(data.countTitle) ? data.countTitle : widget.countTitle}</span>`), widget.metricDetailNode);
      }
      domConstruct.place(widget.itemTemplate.apply({ value: data.value }, widget), widget.metricDetailNode);
    } else {
      domConstruct.place(widget.itemTemplate.apply({ value: data.value }, widget), widget.metricDetailNode);
    }
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
    const node = domConstruct.toDom(this.nodataTemplate.apply(entry, this));
    frag.appendChild(node);
    if (frag.childNodes.length > 0) {
      domConstruct.place(frag, this.metricsNode, 'last');
    }
  },
  getAbrv: function getAbrv() {
    let abrv = '';
    abrv = crmFormat.formatUserInitial(this.titleText);
    return abrv;
  },
  getColor: function getColor() {
    return this.color;
  },
  getMetricColor: function getMetricColor() {
    return (this.metricColor) ? this.metricColor : '';
  },
  getSelectedColor: function getSelectedColor() {
    return this.selectedColor;
  },
  getStore: function getStore() {
    const store = new SData({
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
      scope: this,
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

    array.forEach(this.queryArgs, function createStore(arg) {
      store.push(new SData({
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
        scope: this,
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
  /**
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

    const query = string.substitute(
      `((${property} between @\${0}@ and @\${1}@) or (${property} between @\${2}@ and @\${3}@))`,
      [
        convert.toIsoStringFromDate(pastWeekStart.toDate()),
        convert.toIsoStringFromDate(today.toDate()),
        pastWeekStart.format('YYYY-MM-DDT00:00:00[Z]'),
        today.format('YYYY-MM-DDT23:59:59[Z]'),
      ]
    );
    return query;
  },
  /**
   * Sets up the date range search query based on the this.dayValue and searches between that many days ago and today
   * @params {string} Property to be searched for
   */
  pastDaysLt: function pastDaysLt(property) {
    const now = moment();
    const pastDay = now.clone().subtract(this.dayValue, 'days').startOf('day');

    const query = string.substitute(
      `(${property} lt @\${0}@ or (${property} lt @\${1}@))`,
      [
        convert.toIsoStringFromDate(pastDay.toDate()),
        pastDay.format('YYYY-MM-DDT00:00:00[Z]'),
      ]
    );
    return query;
  },
  hasValidOptions: function hasValidOptions(options) {
    return options
        && options.valueNeeded;
  },
  hasValueOptions: function hasValueOptions(options) {
    return options
        && options.value;
  },
  destroyWidgets: function destroyWidgets() {
    array.forEach(this.metricWidgets, (widget) => {
      widget.destroy();
    }, this);
  },
  toggleView: function toggleView(evt) {
    this.onToggleView();
    evt.stopPropagation();
  },
  onToggleView: function onToggleView(forceOpen) {
    if (forceOpen) {
      domClass.remove(this.dashboardHeaderNode, this.collapsedClass);
    } else {
      domClass.toggle(this.dashboardHeaderNode, this.collapsedClass);
    }

    if (!this.isLoaded) {
      this.onLoad();
    }
  },
  _getCollapsedClass: function _getCollapsedClass() {
    return (this.autoLoad) ? '' : this.collapsedClass;
  },
});

const rvm = new RelatedViewManager();
rvm.registerType('dashboard_widget_base', __class);
lang.setObject('crm.Views._DashboardWidgetBase', __class);
lang.setObject('icboe._DashboardWidgetBase', __class);
export default __class;
