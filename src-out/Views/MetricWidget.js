define('crm/Views/MetricWidget', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/Deferred', 'dojo/when', 'dijit/_Widget', 'argos/_Templated', 'argos/Store/SData', 'argos/I18n', 'crm/Format', 'crm/Aggregate'], function (module, exports, _declare, _lang, _Deferred, _when, _Widget2, _Templated2, _SData, _I18n, _Format, _Aggregate) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Deferred2 = _interopRequireDefault(_Deferred);

  var _when2 = _interopRequireDefault(_when);

  var _Widget3 = _interopRequireDefault(_Widget2);

  var _Templated3 = _interopRequireDefault(_Templated2);

  var _SData2 = _interopRequireDefault(_SData);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Format2 = _interopRequireDefault(_Format);

  var _Aggregate2 = _interopRequireDefault(_Aggregate);

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

  var resource = (0, _I18n2.default)('metricWidget');

  /**
   * @class crm.Views.MetricWidget
   */
  var __class = (0, _declare2.default)('crm.Views.MetricWidget', [_Widget3.default, _Templated3.default], /** @lends crm.Views.MetricWidget# */{
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

    formatModule: _Format2.default,
    formatter: _Format2.default.bigNumber,

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
    aggregateModule: _Aggregate2.default,
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
      this.requestDataDeferred = new _Deferred2.default();
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
      (0, _when2.default)(queryResults, _lang2.default.hitch(this, this._onQuerySuccess, queryResults), _lang2.default.hitch(this, this._onQueryError));
    },
    _onQuerySuccess: function _onQuerySuccess(queryResults) {
      var _this2 = this;

      (0, _when2.default)(queryResults.total, function (total) {
        queryResults.forEach(_lang2.default.hitch(_this2, _this2._processItem));

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
      var store = new _SData2.default({
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

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9NZXRyaWNXaWRnZXQuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwid2lkZ2V0VGVtcGxhdGUiLCJTaW1wbGF0ZSIsIml0ZW1UZW1wbGF0ZSIsImVycm9yVGVtcGxhdGUiLCJsb2FkaW5nVGVtcGxhdGUiLCJ0aXRsZSIsImxvYWRpbmdUZXh0IiwiZXJyb3JUZXh0IiwicXVlcnlTZWxlY3QiLCJxdWVyeU5hbWUiLCJxdWVyeUFyZ3MiLCJxdWVyeU9yZGVyQnkiLCJyZXNvdXJjZUtpbmQiLCJyZXNvdXJjZVByZWRpY2F0ZSIsImNvbnRyYWN0TmFtZSIsImtleVByb3BlcnR5IiwiYXBwbGljYXRpb25OYW1lIiwicG9zaXRpb24iLCJwYWdlU2l6ZSIsInN0b3JlIiwiX2RhdGEiLCJ2YWx1ZSIsInJlcXVlc3REYXRhRGVmZXJyZWQiLCJtZXRyaWNEZXRhaWxOb2RlIiwiY3VycmVudFNlYXJjaEV4cHJlc3Npb24iLCJjaGFydFR5cGUiLCJjaGFydFR5cGVNYXBwaW5nIiwicGllIiwiYmFyIiwibGluZSIsImZvcm1hdE1vZHVsZSIsImZvcm1hdHRlciIsImJpZ051bWJlciIsInZhbHVlRm4iLCJkYXRhIiwicmVkdWNlIiwicCIsImMiLCJhZ2dyZWdhdGVNb2R1bGUiLCJhZ2dyZWdhdGUiLCJyZXF1ZXN0RGF0YSIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImxlbmd0aCIsIl9nZXREYXRhIiwidGhlbiIsInJlc3VsdHMiLCJFcnJvciIsImNhbGwiLCIkIiwicmVwbGFjZVdpdGgiLCJhcHBseSIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsIm5hdlRvUmVwb3J0VmlldyIsInZpZXciLCJBcHAiLCJnZXRWaWV3IiwicGFyZW50Iiwic2hvdyIsInJldHVyblRvIiwicmV0dXJuVG9JZCIsIl9idWlsZFF1ZXJ5T3B0aW9ucyIsImNvdW50Iiwic3RhcnQiLCJfYnVpbGRRdWVyeUV4cHJlc3Npb24iLCJxdWVyeU9wdGlvbnMiLCJxdWVyeUV4cHJlc3Npb24iLCJnZXQiLCJxdWVyeVJlc3VsdHMiLCJxdWVyeSIsImhpdGNoIiwiX29uUXVlcnlTdWNjZXNzIiwiX29uUXVlcnlFcnJvciIsInRvdGFsIiwiZm9yRWFjaCIsIl9wcm9jZXNzSXRlbSIsImxlZnQiLCJyZXNvbHZlIiwiaXRlbSIsInB1c2giLCJyZWplY3QiLCJjcmVhdGVTdG9yZSIsInJlcXVlc3QiLCJzZXJ2aWNlIiwic2VydmljZXMiLCJjcm0iLCJzZWxlY3QiLCJvcmRlckJ5IiwiaWRQcm9wZXJ0eSIsInNjb3BlIiwiX2dldFN0b3JlQXR0ciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUEyQkEsTUFBTUEsV0FBVyxvQkFBWSxjQUFaLENBQWpCOztBQUVBOzs7QUFHQSxNQUFNQyxVQUFVLHVCQUFRLHdCQUFSLEVBQWtDLHVDQUFsQyxFQUF5RCxxQ0FBcUM7QUFDNUc7Ozs7QUFJQUMsb0JBQWdCLElBQUlDLFFBQUosQ0FBYSxDQUMzQiw2QkFEMkIsRUFFM0Isc0dBRjJCLEVBRzNCLHVFQUgyQixFQUkzQiwwQkFKMkIsRUFLM0IsUUFMMkIsRUFNM0IsV0FOMkIsRUFPM0IsUUFQMkIsQ0FBYixDQUw0Rjs7QUFlNUc7Ozs7QUFJQUMsa0JBQWMsSUFBSUQsUUFBSixDQUFhLENBQ3pCLDREQUR5QixFQUV6QixtREFGeUIsQ0FBYixDQW5COEY7O0FBd0I1Rzs7O0FBR0FFLG1CQUFlLElBQUlGLFFBQUosQ0FBYSxDQUMxQixxREFEMEIsQ0FBYixDQTNCNkY7O0FBK0I1Rzs7OztBQUlBRyxxQkFBaUIsSUFBSUgsUUFBSixDQUFhLENBQzVCLGlEQUQ0QixFQUU1Qix1Q0FGNEIsRUFHNUIsMkRBSDRCLEVBSTVCLHFDQUo0QixFQUs1Qiw2QkFMNEIsRUFNNUIsNkJBTjRCLEVBTzVCLCtCQVA0QixFQVE1Qiw4QkFSNEIsRUFTNUIsOEJBVDRCLEVBVTVCLFFBVjRCLEVBVzVCLG1DQVg0QixFQVk1QixRQVo0QixFQWE1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QkFBaUIsS0FBS0EsZUFYSztBQVkzQjJFLGVBQU87QUFab0IsT0FBZixDQUFkOztBQWVBLGFBQU94RSxLQUFQO0FBQ0QsS0FsTjJHO0FBbU41R3lFLG1CQUFlLFNBQVNBLGFBQVQsR0FBeUI7QUFDdEMsYUFBTyxLQUFLekUsS0FBTCxLQUFlLEtBQUtBLEtBQUwsR0FBYSxLQUFLZ0UsV0FBTCxFQUE1QixDQUFQO0FBQ0Q7QUFyTjJHLEdBQTlGLENBQWhCOztvQkF3TmVwRixPIiwiZmlsZSI6Ik1ldHJpY1dpZGdldC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBEZWZlcnJlZCBmcm9tICdkb2pvL0RlZmVycmVkJztcclxuaW1wb3J0IHdoZW4gZnJvbSAnZG9qby93aGVuJztcclxuaW1wb3J0IF9XaWRnZXQgZnJvbSAnZGlqaXQvX1dpZGdldCc7XHJcbmltcG9ydCBfVGVtcGxhdGVkIGZyb20gJ2FyZ29zL19UZW1wbGF0ZWQnO1xyXG5pbXBvcnQgU0RhdGFTdG9yZSBmcm9tICdhcmdvcy9TdG9yZS9TRGF0YSc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICdjcm0vRm9ybWF0JztcclxuaW1wb3J0IGFnZ3JlZ2F0ZSBmcm9tICdjcm0vQWdncmVnYXRlJztcclxuXHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdtZXRyaWNXaWRnZXQnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLk1ldHJpY1dpZGdldFxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5NZXRyaWNXaWRnZXQnLCBbX1dpZGdldCwgX1RlbXBsYXRlZF0sIC8qKiBAbGVuZHMgY3JtLlZpZXdzLk1ldHJpY1dpZGdldCMgKi97XHJcbiAgLyoqXHJcbiAgICogQHByb3BlcnR5IHtTaW1wbGF0ZX1cclxuICAgKiBTaW1wbGUgdGhhdCBkZWZpbmVzIHRoZSBIVE1MIE1hcmt1cFxyXG4gICAqL1xyXG4gIHdpZGdldFRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxkaXYgY2xhc3M9XCJtZXRyaWMtd2lkZ2V0XCI+JyxcclxuICAgICc8YnV0dG9uIGRhdGEtZG9qby1hdHRhY2gtZXZlbnQ9XCJvbmNsaWNrOm5hdlRvUmVwb3J0Vmlld1wiIHslIGlmICghJC5jaGFydFR5cGUpIHsgJX0gZGlzYWJsZWQgeyUgfSAlfT4nLFxyXG4gICAgJzxkaXYgZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cIm1ldHJpY0RldGFpbE5vZGVcIiBjbGFzcz1cIm1ldHJpYy1kZXRhaWxcIj4nLFxyXG4gICAgJ3slISAkLmxvYWRpbmdUZW1wbGF0ZSAlfScsXHJcbiAgICAnPC9kaXY+JyxcclxuICAgICc8L2J1dHRvbj4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcblxyXG4gIC8qKlxyXG4gICAqIEBwcm9wZXJ0eSB7U2ltcGxhdGV9XHJcbiAgICogSFRNTCBtYXJrdXAgZm9yIHRoZSBtZXRyaWMgZGV0YWlsIChuYW1lL3ZhbHVlKVxyXG4gICAqL1xyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8aDEgY2xhc3M9XCJtZXRyaWMtdmFsdWVcIj57JTogJCQuZm9ybWF0dGVyKCQudmFsdWUpICV9PC9oMT4nLFxyXG4gICAgJzxzcGFuIGNsYXNzPVwibWV0cmljLXRpdGxlXCI+eyU6ICQkLnRpdGxlICV9PC9zcGFuPicsXHJcbiAgXSksXHJcblxyXG4gIC8qKlxyXG4gICAqIEBwcm9wZXJ0eSB7U2ltcGxhdGV9XHJcbiAgICovXHJcbiAgZXJyb3JUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGNsYXNzPVwibWV0cmljLXRpdGxlXCI+eyU6ICQkLmVycm9yVGV4dCAlfTwvZGl2PicsXHJcbiAgXSksXHJcblxyXG4gIC8qKlxyXG4gICAqIEBwcm9wZXJ0eSB7U2ltcGxhdGV9XHJcbiAgICogSFRNTCBtYXJrdXAgZm9yIHRoZSBsb2FkaW5nIHRleHQgYW5kIGljb25cclxuICAgKi9cclxuICBsb2FkaW5nVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGRpdiBjbGFzcz1cIm1ldHJpYy10aXRsZSBsaXN0LWxvYWRpbmcgYnVzeS1zbVwiPicsXHJcbiAgICAnPHNwYW4gY2xhc3M9XCJsaXN0LWxvYWRpbmctaW5kaWNhdG9yXCI+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwiYnVzeS1pbmRpY2F0b3ItY29udGFpbmVyXCIgYXJpYS1saXZlPVwicG9saXRlXCI+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwiYnVzeS1pbmRpY2F0b3IgYWN0aXZlXCI+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwiYmFyIG9uZVwiPjwvZGl2PicsXHJcbiAgICAnPGRpdiBjbGFzcz1cImJhciB0d29cIj48L2Rpdj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJiYXIgdGhyZWVcIj48L2Rpdj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJiYXIgZm91clwiPjwvZGl2PicsXHJcbiAgICAnPGRpdiBjbGFzcz1cImJhciBmaXZlXCI+PC9kaXY+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gICAgJzxzcGFuPnslOiAkLmxvYWRpbmdUZXh0ICV9PC9zcGFuPicsXHJcbiAgICAnPC9kaXY+JyxcclxuICAgICc8L3NwYW4+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gIF0pLFxyXG5cclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZTogJycsXHJcbiAgbG9hZGluZ1RleHQ6IHJlc291cmNlLmxvYWRpbmdUZXh0LFxyXG4gIGVycm9yVGV4dDogcmVzb3VyY2UuZXJyb3JUZXh0LFxyXG5cclxuICAvLyBTdG9yZSBPcHRpb25zXHJcbiAgcXVlcnlTZWxlY3Q6IG51bGwsXHJcbiAgcXVlcnlOYW1lOiBudWxsLFxyXG4gIHF1ZXJ5QXJnczogbnVsbCxcclxuICBxdWVyeU9yZGVyQnk6IG51bGwsXHJcbiAgcmVzb3VyY2VLaW5kOiBudWxsLFxyXG4gIHJlc291cmNlUHJlZGljYXRlOiBudWxsLFxyXG4gIGNvbnRyYWN0TmFtZTogbnVsbCxcclxuICBrZXlQcm9wZXJ0eTogbnVsbCxcclxuICBhcHBsaWNhdGlvbk5hbWU6IG51bGwsXHJcbiAgcG9zaXRpb246IDAsXHJcbiAgcGFnZVNpemU6IDEwMCxcclxuXHJcbiAgc3RvcmU6IG51bGwsXHJcblxyXG4gIF9kYXRhOiBudWxsLFxyXG4gIHZhbHVlOiBudWxsLFxyXG4gIHJlcXVlc3REYXRhRGVmZXJyZWQ6IG51bGwsXHJcbiAgbWV0cmljRGV0YWlsTm9kZTogbnVsbCxcclxuICBjdXJyZW50U2VhcmNoRXhwcmVzc2lvbjogJycsXHJcblxyXG4gIC8vIENoYXJ0IFByb3BlcnRpZXNcclxuICBjaGFydFR5cGU6IG51bGwsXHJcbiAgY2hhcnRUeXBlTWFwcGluZzoge1xyXG4gICAgcGllOiAnY2hhcnRfZ2VuZXJpY19waWUnLFxyXG4gICAgYmFyOiAnY2hhcnRfZ2VuZXJpY19iYXInLFxyXG4gICAgbGluZTogJ2NoYXJ0X2dlbmVyaWNfbGluZScsXHJcbiAgfSxcclxuXHJcbiAgZm9ybWF0TW9kdWxlOiBmb3JtYXQsXHJcbiAgZm9ybWF0dGVyOiBmb3JtYXQuYmlnTnVtYmVyLFxyXG5cclxuICAvKipcclxuICAgKiBDYWxjdWxhdGVzIHRoZSB2YWx1ZSBzaG93biBpbiB0aGUgbWV0cmljIHdpZGdldCBidXR0b24uXHJcbiAgICogQHBhcmFtIHtBcnJheX0gZGF0YSBBcnJheSBvZiBkYXRhIHVzZWQgZm9yIHRoZSBtZXRyaWNcclxuICAgKiBAcmV0dXJuIHtpbnR9IFJldHVybnMgYSB2YWx1ZSBjYWxjdWxhdGVkIGZyb20gZGF0YSAoU1VNL0FWRy9NQVgvTUlOL1doYXRldmVyKVxyXG4gICAqL1xyXG4gIHZhbHVlRm46IGZ1bmN0aW9uIHZhbHVlRm4oZGF0YSA9IFtdKSB7XHJcbiAgICByZXR1cm4gZGF0YS5yZWR1Y2UoKHAsIGMpID0+IHAgKyBjLnZhbHVlLCAwKTtcclxuICB9LFxyXG5cclxuICAvLyBGdW5jdGlvbnMgY2FuJ3QgYmUgc3RvcmVkIGluIGxvY2Fsc3RvcmFnZSwgc2F2ZSB0aGUgbW9kdWxlL2ZuIHN0cmluZ3MgYW5kIGxvYWQgdGhlbSBsYXRlciB2aWEgQU1EXHJcbiAgYWdncmVnYXRlTW9kdWxlOiBhZ2dyZWdhdGUsXHJcbiAgYWdncmVnYXRlOiBudWxsLFxyXG5cclxuICAvKipcclxuICAgKiBSZXF1ZXN0cyB0aGUgd2lkZ2V0J3MgZGF0YSwgdmFsdWUgZm4sIGZvcm1hdCBmbiwgYW5kIHJlbmRlcnMgaXQncyBpdGVtVGVtcGxhdGVcclxuICAgKi9cclxuICByZXF1ZXN0RGF0YTogZnVuY3Rpb24gcmVxdWVzdERhdGEoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChyZXF1ZXN0RGF0YSwgYXJndW1lbnRzKTtcclxuXHJcbiAgICBpZiAodGhpcy5fZGF0YSAmJiB0aGlzLl9kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2RhdGEgPSBbXTtcclxuICAgIHRoaXMucmVxdWVzdERhdGFEZWZlcnJlZCA9IG5ldyBEZWZlcnJlZCgpO1xyXG4gICAgdGhpcy5fZ2V0RGF0YSgpO1xyXG5cclxuICAgIHRoaXMucmVxdWVzdERhdGFEZWZlcnJlZFxyXG4gICAgICAudGhlbigocmVzdWx0cykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSByZXN1bHRzO1xyXG4gICAgICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbiBlcnJvciBvY2N1cnJlZCBsb2FkaW5nIHRoZSBLUEkgd2lkZ2V0IGRhdGEuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnZhbHVlRm4gPSB0aGlzLmFnZ3JlZ2F0ZU1vZHVsZVt0aGlzLmFnZ3JlZ2F0ZV07XHJcbiAgICAgICAgdGhpcy5mb3JtYXR0ZXIgPSB0aGlzLmZvcm1hdE1vZHVsZVt0aGlzLmZvcm1hdHRlcl07XHJcblxyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy52YWx1ZSA9IHRoaXMudmFsdWVGbi5jYWxsKHRoaXMsIGRhdGEpO1xyXG4gICAgICAgICQodGhpcy5tZXRyaWNEZXRhaWxOb2RlKS5yZXBsYWNlV2l0aCh0aGlzLml0ZW1UZW1wbGF0ZS5hcHBseSh7XHJcbiAgICAgICAgICB2YWx1ZSxcclxuICAgICAgICB9LCB0aGlzKSk7XHJcbiAgICAgIH0sIChlcnIpID0+IHtcclxuICAgICAgICAvLyBFcnJvclxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICAgICQodGhpcy5tZXRyaWNEZXRhaWxOb2RlKS5yZXBsYWNlV2l0aCh0aGlzLmVycm9yVGVtcGxhdGUuYXBwbHkoe30sIHRoaXMpKTtcclxuICAgICAgfSk7XHJcbiAgfSxcclxuICBuYXZUb1JlcG9ydFZpZXc6IGZ1bmN0aW9uIG5hdlRvUmVwb3J0VmlldygpIHtcclxuICAgIGlmICghdGhpcy5jaGFydFR5cGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLmNoYXJ0VHlwZU1hcHBpbmdbdGhpcy5jaGFydFR5cGVdKTtcclxuXHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICB2aWV3LnBhcmVudCA9IHRoaXM7XHJcbiAgICAgIHZpZXcuZm9ybWF0dGVyID0gdGhpcy5mb3JtYXR0ZXI7XHJcbiAgICAgIHZpZXcuc2hvdyh7XHJcbiAgICAgICAgcmV0dXJuVG86IHRoaXMucmV0dXJuVG9JZCxcclxuICAgICAgICBjdXJyZW50U2VhcmNoRXhwcmVzc2lvbjogdGhpcy5jdXJyZW50U2VhcmNoRXhwcmVzc2lvbixcclxuICAgICAgICB0aXRsZTogdGhpcy50aXRsZSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBfYnVpbGRRdWVyeU9wdGlvbnM6IGZ1bmN0aW9uIF9idWlsZFF1ZXJ5T3B0aW9ucygpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNvdW50OiB0aGlzLnBhZ2VTaXplLFxyXG4gICAgICBzdGFydDogdGhpcy5wb3NpdGlvbixcclxuICAgIH07XHJcbiAgfSxcclxuICBfYnVpbGRRdWVyeUV4cHJlc3Npb246IGZ1bmN0aW9uIF9idWlsZFF1ZXJ5RXhwcmVzc2lvbigpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH0sXHJcbiAgX2dldERhdGE6IGZ1bmN0aW9uIF9nZXREYXRhKCkge1xyXG4gICAgY29uc3QgcXVlcnlPcHRpb25zID0gdGhpcy5fYnVpbGRRdWVyeU9wdGlvbnMoKTtcclxuICAgIGNvbnN0IHF1ZXJ5RXhwcmVzc2lvbiA9IHRoaXMuX2J1aWxkUXVlcnlFeHByZXNzaW9uKCk7XHJcbiAgICBjb25zdCBzdG9yZSA9IHRoaXMuZ2V0KCdzdG9yZScpO1xyXG4gICAgY29uc3QgcXVlcnlSZXN1bHRzID0gc3RvcmUucXVlcnkocXVlcnlFeHByZXNzaW9uLCBxdWVyeU9wdGlvbnMpO1xyXG4gICAgd2hlbihxdWVyeVJlc3VsdHMsIGxhbmcuaGl0Y2godGhpcywgdGhpcy5fb25RdWVyeVN1Y2Nlc3MsIHF1ZXJ5UmVzdWx0cyksIGxhbmcuaGl0Y2godGhpcywgdGhpcy5fb25RdWVyeUVycm9yKSk7XHJcbiAgfSxcclxuICBfb25RdWVyeVN1Y2Nlc3M6IGZ1bmN0aW9uIF9vblF1ZXJ5U3VjY2VzcyhxdWVyeVJlc3VsdHMpIHtcclxuICAgIHdoZW4ocXVlcnlSZXN1bHRzLnRvdGFsLCAodG90YWwpID0+IHtcclxuICAgICAgcXVlcnlSZXN1bHRzLmZvckVhY2gobGFuZy5oaXRjaCh0aGlzLCB0aGlzLl9wcm9jZXNzSXRlbSkpO1xyXG5cclxuICAgICAgbGV0IGxlZnQgPSAtMTtcclxuICAgICAgaWYgKHRvdGFsID4gLTEpIHtcclxuICAgICAgICBsZWZ0ID0gdG90YWwgLSAodGhpcy5wb3NpdGlvbiArIHRoaXMucGFnZVNpemUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAobGVmdCA+IDApIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbiArIHRoaXMucGFnZVNpemU7XHJcbiAgICAgICAgdGhpcy5fZ2V0RGF0YSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIFNpZ25hbCBjb21wbGV0ZVxyXG4gICAgICAgIHRoaXMucmVxdWVzdERhdGFEZWZlcnJlZC5yZXNvbHZlKHRoaXMuX2RhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIF9wcm9jZXNzSXRlbTogZnVuY3Rpb24gX3Byb2Nlc3NJdGVtKGl0ZW0pIHtcclxuICAgIHRoaXMuX2RhdGEucHVzaChpdGVtKTtcclxuICB9LFxyXG4gIF9vblF1ZXJ5RXJyb3I6IGZ1bmN0aW9uIF9vblF1ZXJ5RXJyb3IoZXJyb3IpIHtcclxuICAgIHRoaXMucmVxdWVzdERhdGFEZWZlcnJlZC5yZWplY3QoZXJyb3IpO1xyXG4gIH0sXHJcbiAgY3JlYXRlU3RvcmU6IGZ1bmN0aW9uIGNyZWF0ZVN0b3JlKCkge1xyXG4gICAgY29uc3Qgc3RvcmUgPSBuZXcgU0RhdGFTdG9yZSh7XHJcbiAgICAgIHJlcXVlc3Q6IHRoaXMucmVxdWVzdCxcclxuICAgICAgc2VydmljZTogQXBwLnNlcnZpY2VzLmNybSxcclxuICAgICAgcmVzb3VyY2VLaW5kOiB0aGlzLnJlc291cmNlS2luZCxcclxuICAgICAgcmVzb3VyY2VQcmVkaWNhdGU6IHRoaXMucmVzb3VyY2VQcmVkaWNhdGUsXHJcbiAgICAgIGNvbnRyYWN0TmFtZTogdGhpcy5jb250cmFjdE5hbWUsXHJcbiAgICAgIHNlbGVjdDogdGhpcy5xdWVyeVNlbGVjdCxcclxuICAgICAgcXVlcnlOYW1lOiB0aGlzLnF1ZXJ5TmFtZSxcclxuICAgICAgcXVlcnlBcmdzOiB0aGlzLnF1ZXJ5QXJncyxcclxuICAgICAgb3JkZXJCeTogdGhpcy5xdWVyeU9yZGVyQnksXHJcbiAgICAgIGlkUHJvcGVydHk6IHRoaXMua2V5UHJvcGVydHksXHJcbiAgICAgIGFwcGxpY2F0aW9uTmFtZTogdGhpcy5hcHBsaWNhdGlvbk5hbWUsXHJcbiAgICAgIHNjb3BlOiB0aGlzLFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHN0b3JlO1xyXG4gIH0sXHJcbiAgX2dldFN0b3JlQXR0cjogZnVuY3Rpb24gX2dldFN0b3JlQXR0cigpIHtcclxuICAgIHJldHVybiB0aGlzLnN0b3JlIHx8ICh0aGlzLnN0b3JlID0gdGhpcy5jcmVhdGVTdG9yZSgpKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==