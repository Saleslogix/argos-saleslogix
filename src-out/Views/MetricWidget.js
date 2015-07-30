define('crm/Views/MetricWidget', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/_base/array', 'dojo/Deferred', 'dojo/when', 'dojo/promise/all', 'dojo/dom-construct', 'dijit/_Widget', 'argos/_Templated', 'argos/Store/SData'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojo_baseArray, _dojoDeferred, _dojoWhen, _dojoPromiseAll, _dojoDomConstruct, _dijit_Widget, _argos_Templated, _argosStoreSData) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _array = _interopRequireDefault(_dojo_baseArray);

  var _Deferred = _interopRequireDefault(_dojoDeferred);

  var _when = _interopRequireDefault(_dojoWhen);

  var _all = _interopRequireDefault(_dojoPromiseAll);

  var _domConstruct = _interopRequireDefault(_dojoDomConstruct);

  var _Widget2 = _interopRequireDefault(_dijit_Widget);

  var _Templated2 = _interopRequireDefault(_argos_Templated);

  var _SDataStore = _interopRequireDefault(_argosStoreSData);

  /**
   * @class crm.Views.MetricWidget
   *
   *
   * @requires argos._Templated
   * @requires argos.Store.SData
   *
   */
  var __class = (0, _declare['default'])('crm.Views.MetricWidget', [_Widget2['default'], _Templated2['default']], {
    /**
     * @property {Simplate}
     * Simple that defines the HTML Markup
     */
    widgetTemplate: new Simplate(['<div class="metric-widget">', '<button data-dojo-attach-event="onclick:navToReportView">', '<div data-dojo-attach-point="metricDetailNode" class="metric-detail">', '{%! $.loadingTemplate %}', '</div>', '</button>', '</div>']),

    /**
     * @property {Simplate}
     * HTML markup for the metric detail (name/value)
     */
    itemTemplate: new Simplate(['<h1 class="metric-value">{%: $$.formatter($.value) %}</h1>', '<span class="metric-title">{%: $$.title %}</span>']),

    /**
     * @property {Simplate}
     */
    errorTemplate: new Simplate(['<div class="metric-title">{%: $$.errorText %}</div>']),

    /**
     * @property {Simplate}
     * HTML markup for the loading text and icon
     */
    loadingTemplate: new Simplate(['<div class="metric-title list-loading">', '<span class="list-loading-indicator"><span class="fa fa-spinner fa-spin"></span><div>{%= $.loadingText %}</div></span>', '</div>']),

    // Localization
    title: '',
    loadingText: 'loading...',
    errorText: 'Error loading widget.',

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
      'pie': 'chart_generic_pie',
      'bar': 'chart_generic_bar',
      'line': 'chart_generic_line'
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
      var d = new _Deferred['default']();
      d.resolve(this.formatter);
      return d.promise;
    },

    /**
     * Calculates the value shown in the metric widget button.
     * @param {Array} data Array of data used for the metric
     * @return {int} Returns a value calculated from data (SUM/AVG/MAX/MIN/Whatever)
     */
    valueFn: function valueFn(data) {
      var total = 0;
      _array['default'].forEach(data, function (item) {
        total = total + item.value;
      }, this);

      return total;
    },

    // Functions can't be stored in localstorage, save the module/fn strings and load them later via AMD
    aggregateModule: 'crm/Aggregate',
    aggregate: null, //'valueFn',

    /**
     * Loads a module/function via AMD and wraps it in a deferred
     * @return {object} Returns a deferred with the function loaded via AMD require
     */
    getValueFnDeferred: function getValueFnDeferred() {
      if (this.aggregateModule && this.aggregate) {
        return this._loadModuleFunction(this.aggregateModule, this.aggregate);
      }

      // Return the default fn if aggregateModule and aggregate were not assigned
      var d = new _Deferred['default']();
      d.resolve(this.valueFn);
      return d.promise;
    },
    _loadModuleFunction: function _loadModuleFunction(module, fn) {
      // Attempt to load the function fn from the AMD module
      var def = new _Deferred['default']();
      try {
        require([module], _lang['default'].hitch(this, function (mod) {
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
    requestData: function requestData() {
      var loadFormatter, loadValueFn;

      this.inherited(arguments);

      if (this._data && this._data.length > 0) {
        return;
      }

      this._data = [];
      this.requestDataDeferred = new _Deferred['default']();
      this._getData();

      loadFormatter = this.getFormatterFnDeferred(); // deferred for loading in our formatter
      loadValueFn = this.getValueFnDeferred(); // deferred for loading in value function

      (0, _all['default'])([loadValueFn, loadFormatter, this.requestDataDeferred]).then(_lang['default'].hitch(this, function (results) {
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

        value = this.value = this.valueFn.call(this, data);
        _domConstruct['default'].place(this.itemTemplate.apply({
          value: value
        }, this), this.metricDetailNode, 'replace');
      }), _lang['default'].hitch(this, function (err) {
        // Error
        console.error(err);
        _domConstruct['default'].place(this.errorTemplate.apply({}, this), this.metricDetailNode, 'replace');
      }));
    },
    navToReportView: function navToReportView() {
      var view;
      view = App.getView(this.chartTypeMapping[this.chartType]);

      if (view) {
        view.parent = this;
        view.formatter = this.formatter;
        view.show({
          returnTo: this.returnToId,
          currentSearchExpression: this.currentSearchExpression,
          title: this.title
        });
      }
    },
    _getData: function _getData() {
      var store, queryOptions, queryResults;
      queryOptions = {
        count: this.pageSize,
        start: this.position
      };

      store = this.get('store');
      queryResults = store.query(null, queryOptions);

      (0, _when['default'])(queryResults, _lang['default'].hitch(this, this._onQuerySuccess, queryResults), _lang['default'].hitch(this, this._onQueryError));
    },
    _onQuerySuccess: function _onQuerySuccess(queryResults) {
      var total, left;

      total = queryResults.total;

      queryResults.forEach(_lang['default'].hitch(this, this._processItem));

      left = -1;
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
    _processItem: function _processItem(item) {
      this._data.push(item);
    },
    _onQueryError: function _onQueryError(error) {
      this.requestDataDeferred.reject(error);
    },
    createStore: function createStore() {
      var store = new _SDataStore['default']({
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
        scope: this
      });

      return store;
    },
    _getStoreAttr: function _getStoreAttr() {
      return this.store || (this.store = this.createStore());
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.MetricWidget', __class);
  module.exports = __class;
});
