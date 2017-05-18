import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import Deferred from 'dojo/Deferred';
import when from 'dojo/when';
import _Widget from 'dijit/_Widget';
import _Templated from 'argos/_Templated';
import SDataStore from 'argos/Store/SData';
import getResource from 'argos/I18n';
import format from 'crm/Format';
import aggregate from 'crm/Aggregate';


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
    '<div class="metric-title list-loading busy-sm">',
    '<span class="list-loading-indicator">',
    '<div class="busy-indicator-container" aria-live="polite">',
    '<div class="busy-indicator active">',
    '<div class="bar one"></div>',
    '<div class="bar two"></div>',
    '<div class="bar three"></div>',
    '<div class="bar four"></div>',
    '<div class="bar five"></div>',
    '</div>',
    '<span>{%: $.loadingText %}</span>',
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

  formatModule: format,
  formatter: format.bigNumber,

  /**
   * Calculates the value shown in the metric widget button.
   * @param {Array} data Array of data used for the metric
   * @return {int} Returns a value calculated from data (SUM/AVG/MAX/MIN/Whatever)
   */
  valueFn: function valueFn(data = []) {
    return data.reduce((p, c) => p + c.value, 0);
  },

  // Functions can't be stored in localstorage, save the module/fn strings and load them later via AMD
  aggregateModule: aggregate,
  aggregate: null,

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

    this.requestDataDeferred
      .then((results) => {
        const data = results;
        if (!data) {
          throw new Error('An error occurred loading the KPI widget data.');
        }

        this.valueFn = this.aggregateModule[this.aggregate];
        this.formatter = this.formatModule[this.formatter];

        const value = this.value = this.valueFn.call(this, data);
        $(this.metricDetailNode).replaceWith(this.itemTemplate.apply({
          value,
        }, this));
      }, (err) => {
        // Error
        console.error(err); // eslint-disable-line
        $(this.metricDetailNode).replaceWith(this.errorTemplate.apply({}, this));
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
      App.scene.show(view.id, {
        returnTo: this.returnToId,
        currentSearchExpression: this.currentSearchExpression,
        title: this.title,
      }, null, this.returnToId);
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
