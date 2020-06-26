define("crm/Views/MetricWidget", ["exports", "dojo/_base/declare", "dojo/_base/lang", "dojo/Deferred", "dojo/when", "dijit/_Widget", "argos/_Templated", "argos/Store/SData", "argos/I18n", "crm/Format", "crm/Aggregate"], function (_exports, _declare, _lang, _Deferred, _when, _Widget2, _Templated2, _SData, _I18n, _Format, _Aggregate) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _Deferred = _interopRequireDefault(_Deferred);
  _when = _interopRequireDefault(_when);
  _Widget2 = _interopRequireDefault(_Widget2);
  _Templated2 = _interopRequireDefault(_Templated2);
  _SData = _interopRequireDefault(_SData);
  _I18n = _interopRequireDefault(_I18n);
  _Format = _interopRequireDefault(_Format);
  _Aggregate = _interopRequireDefault(_Aggregate);

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

  /**
   * @module crm/Views/MetricWidget
   */
  var resource = (0, _I18n["default"])('metricWidget');
  /**
   * @class
   * @alias module:crm/Views/MetricWidget
   */

  var __class = (0, _declare["default"])('crm.Views.MetricWidget', [_Widget2["default"], _Templated2["default"]],
  /** @lends module:crm/Views/MetricWidget.prototype */
  {
    /**
     * @property {Simplate}
     * Simple that defines the HTML Markup
     */
    widgetTemplate: new Simplate(['<div class="metric-widget">', '<button data-dojo-attach-event="onclick:navToReportView" {% if (!$.chartType) { %} disabled {% } %}>', '<div data-dojo-attach-point="metricDetailNode" class="metric-detail">', '{%! $.loadingTemplate %}', '</div>', '</button>', '</div>']),

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
    loadingTemplate: new Simplate(['<div class="metric-title list-loading busy-sm">', '<span class="list-loading-indicator">', '<div class="busy-indicator-container" aria-live="polite">', '<div class="busy-indicator active">', '<div class="bar one"></div>', '<div class="bar two"></div>', '<div class="bar three"></div>', '<div class="bar four"></div>', '<div class="bar five"></div>', '</div>', '<span>{%: $.loadingText %}</span>', '</div>', '</span>', '</div>']),
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
      line: 'chart_generic_line'
    },
    formatModule: _Format["default"],
    formatter: _Format["default"].bigNumber,

    /**
     * Calculates the value shown in the metric widget button.
     * @param {Array} data Array of data used for the metric
     * @return {int} Returns a value calculated from data (SUM/AVG/MAX/MIN/Whatever)
     */
    valueFn: function valueFn() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return data.reduce(function (p, c) {
        return p + c.value;
      }, 0);
    },
    // Functions can't be stored in localstorage, save the module/fn strings and load them later via AMD
    aggregateModule: _Aggregate["default"],
    aggregate: null,

    /**
     * Requests the widget's data, value fn, format fn, and renders it's itemTemplate
     */
    requestData: function requestData() {
      var _this = this;

      this.inherited(requestData, arguments);

      if (this._data && this._data.length > 0) {
        return;
      }

      this._data = [];
      this.requestDataDeferred = new _Deferred["default"]();

      this._getData();

      this.requestDataDeferred.then(function (results) {
        var data = results;

        if (!data) {
          throw new Error('An error occurred loading the KPI widget data.');
        }

        _this.valueFn = _this.aggregateModule[_this.aggregate];
        _this.formatter = _this.formatModule[_this.formatter];

        var value = _this.value = _this.valueFn.call(_this, data);

        $(_this.metricDetailNode).replaceWith(_this.itemTemplate.apply({
          value: value
        }, _this));
      }, function (err) {
        // Error
        console.error(err); // eslint-disable-line

        $(_this.metricDetailNode).replaceWith(_this.errorTemplate.apply({}, _this));
      });
    },
    navToReportView: function navToReportView() {
      if (!this.chartType) {
        return;
      }

      var view = App.getView(this.chartTypeMapping[this.chartType]);

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
    _buildQueryOptions: function _buildQueryOptions() {
      return {
        count: this.pageSize,
        start: this.position
      };
    },
    _buildQueryExpression: function _buildQueryExpression() {
      return null;
    },
    _getData: function _getData() {
      var queryOptions = this._buildQueryOptions();

      var queryExpression = this._buildQueryExpression();

      var store = this.get('store');
      var queryResults = store.query(queryExpression, queryOptions);
      (0, _when["default"])(queryResults, _lang["default"].hitch(this, this._onQuerySuccess, queryResults), _lang["default"].hitch(this, this._onQueryError));
    },
    _onQuerySuccess: function _onQuerySuccess(queryResults) {
      var _this2 = this;

      (0, _when["default"])(queryResults.total, function (total) {
        queryResults.forEach(_lang["default"].hitch(_this2, _this2._processItem));
        var left = -1;

        if (total > -1) {
          left = total - (_this2.position + _this2.pageSize);
        }

        if (left > 0) {
          _this2.position = _this2.position + _this2.pageSize;

          _this2._getData();
        } else {
          // Signal complete
          _this2.requestDataDeferred.resolve(_this2._data);
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
      var store = new _SData["default"]({
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

  var _default = __class;
  _exports["default"] = _default;
});