import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import Deferred from 'dojo/Deferred';
import when from 'dojo/when';
import all from 'dojo/promise/all';
import domConstruct from 'dojo/dom-construct';
import _Widget from 'dijit/_Widget';
import _Templated from 'argos/_Templated';
import SDataStore from 'argos/Store/SData';
import getResource from 'argos/I18n';

const resource = getResource('metricWidget');

/**
 * @class crm.Views.MetricWidget
 *
 *
 * @requires argos._Templated
 * @requires argos.Store.SData
 *
 */
const __class = declare('crm.Views.MetricWidget', [_Widget, _Templated], {
  /**
   * @property {Simplate}
   * Simple that defines the HTML Markup
   */
  widgetTemplate: new Simplate([
    '<div class="metric-widget">',
    '<button data-dojo-attach-event="onclick:navToReportView" {% if (!$.chartType) { %} disabled {% } %}>',
    '<div data-dojo-attach-point="metricDetailNode" class="metric-detail">',
    '{%! $.loadingTemplate %}',
    '</div>',
    '</button>',
    '</div>',
  ]),

  /**
   * @property {Simplate}
   * HTML markup for the metric detail (name/value)
   */
  itemTemplate: new Simplate([
    '<h1 class="metric-value">{%: $$.formatter($.value) %}</h1>',
    '<span class="metric-title">{%: $$.title %}</span>',
  ]),

  /**
   * @property {Simplate}
   */
  errorTemplate: new Simplate([
    '<div class="metric-title">{%: $$.errorText %}</div>',
  ]),

  /**
   * @property {Simplate}
   * HTML markup for the loading text and icon
   */
  loadingTemplate: new Simplate([
    '<div class="metric-title list-loading">',
    '<span class="list-loading-indicator">',
    '<div aria-live="polite">',
    '<div class="busyIndicator busyIndicator--small">',
    '<div class="busyIndicator__bar busyIndicator__bar--small busyIndicator__bar--one"></div>',
    '<div class="busyIndicator__bar busyIndicator__bar--small busyIndicator__bar--two"></div>',
    '<div class="busyIndicator__bar busyIndicator__bar--small busyIndicator__bar--three"></div>',
    '<div class="busyIndicator__bar busyIndicator__bar--small busyIndicator__bar--four"></div>',
    '<div class="busyIndicator__bar busyIndicator__bar--small busyIndicator__bar--five"></div>',
    '</div>',
    '<span class="busyIndicator__label">{%: $.loadingText %}</span>',
    '</div>',
    '</span>',
    '</div>',
  ]),

  // Localization
  title: '',
  loadingText: resource.loadingText,
  errorText: resource.errorText,

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
  value: null,
  requestDataDeferred: null,
  metricDetailNode: null,
  currentSearchExpression: '',

  // Chart Properties
  chartType: null,
  chartTypeMapping: {
    pie: 'chart_generic_pie',
    bar: 'chart_generic_bar',
    line: 'chart_generic_line',
  },

  // Functions can't be stored in localstorage, save the module/fn strings and load them later via AMD
  formatModule: 'crm/Format', // AMD Module
  formatter: 'bigNumber', // Function of formatModule module

  /**
   * Loads a module/function via AMD and wraps it in a deferred
   * @return {object} Returns a deferred with the function loaded via AMD require
   */
  getFormatterFnDeferred: function getFormatterFnDeferred() {
    if (this.formatModule && this.formatter) {
      return this._loadModuleFunction(this.formatModule, this.formatter);
    }

    // Return the default fn if aggregateModule and aggregate were not assigned
    const d = new Deferred();
    d.resolve(this.formatter);
    return d.promise;
  },

  /**
   * Calculates the value shown in the metric widget button.
   * @param {Array} data Array of data used for the metric
   * @return {int} Returns a value calculated from data (SUM/AVG/MAX/MIN/Whatever)
   */
  valueFn: function valueFn(data = []) {
    return data.reduce((p, c) => p + c.value, 0);
  },

  // Functions can't be stored in localstorage, save the module/fn strings and load them later via AMD
  aggregateModule: 'crm/Aggregate',
  aggregate: null,

  /**
   * Loads a module/function via AMD and wraps it in a deferred
   * @return {object} Returns a deferred with the function loaded via AMD require
   */
  getValueFnDeferred: function getValueFnDeferred() {
    if (this.aggregateModule && this.aggregate) {
      return this._loadModuleFunction(this.aggregateModule, this.aggregate);
    }

    // Return the default fn if aggregateModule and aggregate were not assigned
    const d = new Deferred();
    d.resolve(this.valueFn);
    return d.promise;
  },
  _loadModuleFunction: function _loadModuleFunction(module, fn) {
    // Attempt to load the function fn from the AMD module
    const def = new Deferred();
    try {
      require([module], lang.hitch(this, (Mod) => {
        // Handle if required module is a ctor else object
        if (typeof Mod === 'function') {
          const instance = new Mod();
          def.resolve(instance[fn]);
        } else {
          def.resolve(Mod[fn]);
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
  requestData: function requestData() {
    this.inherited(arguments);

    if (this._data && this._data.length > 0) {
      return;
    }

    this._data = [];
    this.requestDataDeferred = new Deferred();
    this._getData();

    const loadFormatter = this.getFormatterFnDeferred(); // deferred for loading in our formatter
    const loadValueFn = this.getValueFnDeferred(); // deferred for loading in value function

    all([loadValueFn, loadFormatter, this.requestDataDeferred])
      .then((results) => {
        if (!results[0] || !results[1] || !results[2]) {
          throw new Error('An error occurred loading the KPI widget data.');
        }

        const valueFn = results[0];
        const formatterFn = results[1];
        const data = results[2];

        if (typeof valueFn === 'function') {
          this.valueFn = valueFn;
        }

        if (typeof formatterFn === 'function') {
          this.formatter = formatterFn;
        }

        const value = this.value = this.valueFn.call(this, data);
        domConstruct.place(this.itemTemplate.apply({
          value,
        }, this), this.metricDetailNode, 'replace');
      }, (err) => {
        // Error
        console.error(err); // eslint-disable-line
        domConstruct.place(this.errorTemplate.apply({}, this), this.metricDetailNode, 'replace');
      });
  },
  navToReportView: function navToReportView() {
    if (!this.chartType) {
      return;
    }

    const view = App.getView(this.chartTypeMapping[this.chartType]);

    if (view) {
      view.parent = this;
      view.formatter = this.formatter;
      view.show({
        returnTo: this.returnToId,
        currentSearchExpression: this.currentSearchExpression,
        title: this.title,
      });
    }
  },
  _buildQueryOptions: function _buildQueryOptions() {
    return {
      count: this.pageSize,
      start: this.position,
    };
  },
  _buildQueryExpression: function _buildQueryExpression() {
    return null;
  },
  _getData: function _getData() {
    const queryOptions = this._buildQueryOptions();
    const queryExpression = this._buildQueryExpression();
    const store = this.get('store');
    const queryResults = store.query(queryExpression, queryOptions);
    when(queryResults, lang.hitch(this, this._onQuerySuccess, queryResults), lang.hitch(this, this._onQueryError));
  },
  _onQuerySuccess: function _onQuerySuccess(queryResults) {
    when(queryResults.total, (total) => {
      queryResults.forEach(lang.hitch(this, this._processItem));

      let left = -1;
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
    });
  },
  _processItem: function _processItem(item) {
    this._data.push(item);
  },
  _onQueryError: function _onQueryError(error) {
    this.requestDataDeferred.reject(error);
  },
  createStore: function createStore() {
    const store = new SDataStore({
      request: this.request,
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
      scope: this,
    });

    return store;
  },
  _getStoreAttr: function _getStoreAttr() {
    return this.store || (this.store = this.createStore());
  },
});

lang.setObject('Mobile.SalesLogix.Views.MetricWidget', __class);
export default __class;
