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

      this.inherited(arguments);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9NZXRyaWNXaWRnZXQuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwid2lkZ2V0VGVtcGxhdGUiLCJTaW1wbGF0ZSIsIml0ZW1UZW1wbGF0ZSIsImVycm9yVGVtcGxhdGUiLCJsb2FkaW5nVGVtcGxhdGUiLCJ0aXRsZSIsImxvYWRpbmdUZXh0IiwiZXJyb3JUZXh0IiwicXVlcnlTZWxlY3QiLCJxdWVyeU5hbWUiLCJxdWVyeUFyZ3MiLCJxdWVyeU9yZGVyQnkiLCJyZXNvdXJjZUtpbmQiLCJyZXNvdXJjZVByZWRpY2F0ZSIsImNvbnRyYWN0TmFtZSIsImtleVByb3BlcnR5IiwiYXBwbGljYXRpb25OYW1lIiwicG9zaXRpb24iLCJwYWdlU2l6ZSIsInN0b3JlIiwiX2RhdGEiLCJ2YWx1ZSIsInJlcXVlc3REYXRhRGVmZXJyZWQiLCJtZXRyaWNEZXRhaWxOb2RlIiwiY3VycmVudFNlYXJjaEV4cHJlc3Npb24iLCJjaGFydFR5cGUiLCJjaGFydFR5cGVNYXBwaW5nIiwicGllIiwiYmFyIiwibGluZSIsImZvcm1hdE1vZHVsZSIsImZvcm1hdHRlciIsImJpZ051bWJlciIsInZhbHVlRm4iLCJkYXRhIiwicmVkdWNlIiwicCIsImMiLCJhZ2dyZWdhdGVNb2R1bGUiLCJhZ2dyZWdhdGUiLCJyZXF1ZXN0RGF0YSIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImxlbmd0aCIsIl9nZXREYXRhIiwidGhlbiIsInJlc3VsdHMiLCJFcnJvciIsImNhbGwiLCIkIiwicmVwbGFjZVdpdGgiLCJhcHBseSIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsIm5hdlRvUmVwb3J0VmlldyIsInZpZXciLCJBcHAiLCJnZXRWaWV3IiwicGFyZW50Iiwic2hvdyIsInJldHVyblRvIiwicmV0dXJuVG9JZCIsIl9idWlsZFF1ZXJ5T3B0aW9ucyIsImNvdW50Iiwic3RhcnQiLCJfYnVpbGRRdWVyeUV4cHJlc3Npb24iLCJxdWVyeU9wdGlvbnMiLCJxdWVyeUV4cHJlc3Npb24iLCJnZXQiLCJxdWVyeVJlc3VsdHMiLCJxdWVyeSIsImhpdGNoIiwiX29uUXVlcnlTdWNjZXNzIiwiX29uUXVlcnlFcnJvciIsInRvdGFsIiwiZm9yRWFjaCIsIl9wcm9jZXNzSXRlbSIsImxlZnQiLCJyZXNvbHZlIiwiaXRlbSIsInB1c2giLCJyZWplY3QiLCJjcmVhdGVTdG9yZSIsInJlcXVlc3QiLCJzZXJ2aWNlIiwic2VydmljZXMiLCJjcm0iLCJzZWxlY3QiLCJvcmRlckJ5IiwiaWRQcm9wZXJ0eSIsInNjb3BlIiwiX2dldFN0b3JlQXR0ciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUEyQkEsTUFBTUEsV0FBVyxvQkFBWSxjQUFaLENBQWpCOztBQUVBOzs7QUFHQSxNQUFNQyxVQUFVLHVCQUFRLHdCQUFSLEVBQWtDLHVDQUFsQyxFQUF5RCxxQ0FBcUM7QUFDNUc7Ozs7QUFJQUMsb0JBQWdCLElBQUlDLFFBQUosQ0FBYSxDQUMzQiw2QkFEMkIsRUFFM0Isc0dBRjJCLEVBRzNCLHVFQUgyQixFQUkzQiwwQkFKMkIsRUFLM0IsUUFMMkIsRUFNM0IsV0FOMkIsRUFPM0IsUUFQMkIsQ0FBYixDQUw0Rjs7QUFlNUc7Ozs7QUFJQUMsa0JBQWMsSUFBSUQsUUFBSixDQUFhLENBQ3pCLDREQUR5QixFQUV6QixtREFGeUIsQ0FBYixDQW5COEY7O0FBd0I1Rzs7O0FBR0FFLG1CQUFlLElBQUlGLFFBQUosQ0FBYSxDQUMxQixxREFEMEIsQ0FBYixDQTNCNkY7O0FBK0I1Rzs7OztBQUlBRyxxQkFBaUIsSUFBSUgsUUFBSixDQUFhLENBQzVCLGlEQUQ0QixFQUU1Qix1Q0FGNEIsRUFHNUIsMkRBSDRCLEVBSTVCLHFDQUo0QixFQUs1Qiw2QkFMNEIsRUFNNUIsNkJBTjRCLEVBTzVCLCtCQVA0QixFQVE1Qiw4QkFSNEIsRUFTNUIsOEJBVDRCLEVBVTVCLFFBVjRCLEVBVzVCLG1DQVg0QixFQVk1QixRQVo0QixFQWE1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QVhLO0FBWTNCMkUsZUFBTztBQVpvQixPQUFmLENBQWQ7O0FBZUEsYUFBT3hFLEtBQVA7QUFDRCxLQWxOMkc7QUFtTjVHeUUsbUJBQWUsU0FBU0EsYUFBVCxHQUF5QjtBQUN0QyxhQUFPLEtBQUt6RSxLQUFMLEtBQWUsS0FBS0EsS0FBTCxHQUFhLEtBQUtnRSxXQUFMLEVBQTVCLENBQVA7QUFDRDtBQXJOMkcsR0FBOUYsQ0FBaEI7O29CQXdOZXBGLE8iLCJmaWxlIjoiTWV0cmljV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IERlZmVycmVkIGZyb20gJ2Rvam8vRGVmZXJyZWQnO1xyXG5pbXBvcnQgd2hlbiBmcm9tICdkb2pvL3doZW4nO1xyXG5pbXBvcnQgX1dpZGdldCBmcm9tICdkaWppdC9fV2lkZ2V0JztcclxuaW1wb3J0IF9UZW1wbGF0ZWQgZnJvbSAnYXJnb3MvX1RlbXBsYXRlZCc7XHJcbmltcG9ydCBTRGF0YVN0b3JlIGZyb20gJ2FyZ29zL1N0b3JlL1NEYXRhJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJ2NybS9Gb3JtYXQnO1xyXG5pbXBvcnQgYWdncmVnYXRlIGZyb20gJ2NybS9BZ2dyZWdhdGUnO1xyXG5cclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ21ldHJpY1dpZGdldCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuTWV0cmljV2lkZ2V0XHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLk1ldHJpY1dpZGdldCcsIFtfV2lkZ2V0LCBfVGVtcGxhdGVkXSwgLyoqIEBsZW5kcyBjcm0uVmlld3MuTWV0cmljV2lkZ2V0IyAqL3tcclxuICAvKipcclxuICAgKiBAcHJvcGVydHkge1NpbXBsYXRlfVxyXG4gICAqIFNpbXBsZSB0aGF0IGRlZmluZXMgdGhlIEhUTUwgTWFya3VwXHJcbiAgICovXHJcbiAgd2lkZ2V0VGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGRpdiBjbGFzcz1cIm1ldHJpYy13aWRnZXRcIj4nLFxyXG4gICAgJzxidXR0b24gZGF0YS1kb2pvLWF0dGFjaC1ldmVudD1cIm9uY2xpY2s6bmF2VG9SZXBvcnRWaWV3XCIgeyUgaWYgKCEkLmNoYXJ0VHlwZSkgeyAlfSBkaXNhYmxlZCB7JSB9ICV9PicsXHJcbiAgICAnPGRpdiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwibWV0cmljRGV0YWlsTm9kZVwiIGNsYXNzPVwibWV0cmljLWRldGFpbFwiPicsXHJcbiAgICAneyUhICQubG9hZGluZ1RlbXBsYXRlICV9JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gICAgJzwvYnV0dG9uPicsXHJcbiAgICAnPC9kaXY+JyxcclxuICBdKSxcclxuXHJcbiAgLyoqXHJcbiAgICogQHByb3BlcnR5IHtTaW1wbGF0ZX1cclxuICAgKiBIVE1MIG1hcmt1cCBmb3IgdGhlIG1ldHJpYyBkZXRhaWwgKG5hbWUvdmFsdWUpXHJcbiAgICovXHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxoMSBjbGFzcz1cIm1ldHJpYy12YWx1ZVwiPnslOiAkJC5mb3JtYXR0ZXIoJC52YWx1ZSkgJX08L2gxPicsXHJcbiAgICAnPHNwYW4gY2xhc3M9XCJtZXRyaWMtdGl0bGVcIj57JTogJCQudGl0bGUgJX08L3NwYW4+JyxcclxuICBdKSxcclxuXHJcbiAgLyoqXHJcbiAgICogQHByb3BlcnR5IHtTaW1wbGF0ZX1cclxuICAgKi9cclxuICBlcnJvclRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxkaXYgY2xhc3M9XCJtZXRyaWMtdGl0bGVcIj57JTogJCQuZXJyb3JUZXh0ICV9PC9kaXY+JyxcclxuICBdKSxcclxuXHJcbiAgLyoqXHJcbiAgICogQHByb3BlcnR5IHtTaW1wbGF0ZX1cclxuICAgKiBIVE1MIG1hcmt1cCBmb3IgdGhlIGxvYWRpbmcgdGV4dCBhbmQgaWNvblxyXG4gICAqL1xyXG4gIGxvYWRpbmdUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGNsYXNzPVwibWV0cmljLXRpdGxlIGxpc3QtbG9hZGluZyBidXN5LXNtXCI+JyxcclxuICAgICc8c3BhbiBjbGFzcz1cImxpc3QtbG9hZGluZy1pbmRpY2F0b3JcIj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJidXN5LWluZGljYXRvci1jb250YWluZXJcIiBhcmlhLWxpdmU9XCJwb2xpdGVcIj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJidXN5LWluZGljYXRvciBhY3RpdmVcIj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJiYXIgb25lXCI+PC9kaXY+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwiYmFyIHR3b1wiPjwvZGl2PicsXHJcbiAgICAnPGRpdiBjbGFzcz1cImJhciB0aHJlZVwiPjwvZGl2PicsXHJcbiAgICAnPGRpdiBjbGFzcz1cImJhciBmb3VyXCI+PC9kaXY+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwiYmFyIGZpdmVcIj48L2Rpdj4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgICAnPHNwYW4+eyU6ICQubG9hZGluZ1RleHQgJX08L3NwYW4+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gICAgJzwvc3Bhbj4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcblxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlOiAnJyxcclxuICBsb2FkaW5nVGV4dDogcmVzb3VyY2UubG9hZGluZ1RleHQsXHJcbiAgZXJyb3JUZXh0OiByZXNvdXJjZS5lcnJvclRleHQsXHJcblxyXG4gIC8vIFN0b3JlIE9wdGlvbnNcclxuICBxdWVyeVNlbGVjdDogbnVsbCxcclxuICBxdWVyeU5hbWU6IG51bGwsXHJcbiAgcXVlcnlBcmdzOiBudWxsLFxyXG4gIHF1ZXJ5T3JkZXJCeTogbnVsbCxcclxuICByZXNvdXJjZUtpbmQ6IG51bGwsXHJcbiAgcmVzb3VyY2VQcmVkaWNhdGU6IG51bGwsXHJcbiAgY29udHJhY3ROYW1lOiBudWxsLFxyXG4gIGtleVByb3BlcnR5OiBudWxsLFxyXG4gIGFwcGxpY2F0aW9uTmFtZTogbnVsbCxcclxuICBwb3NpdGlvbjogMCxcclxuICBwYWdlU2l6ZTogMTAwLFxyXG5cclxuICBzdG9yZTogbnVsbCxcclxuXHJcbiAgX2RhdGE6IG51bGwsXHJcbiAgdmFsdWU6IG51bGwsXHJcbiAgcmVxdWVzdERhdGFEZWZlcnJlZDogbnVsbCxcclxuICBtZXRyaWNEZXRhaWxOb2RlOiBudWxsLFxyXG4gIGN1cnJlbnRTZWFyY2hFeHByZXNzaW9uOiAnJyxcclxuXHJcbiAgLy8gQ2hhcnQgUHJvcGVydGllc1xyXG4gIGNoYXJ0VHlwZTogbnVsbCxcclxuICBjaGFydFR5cGVNYXBwaW5nOiB7XHJcbiAgICBwaWU6ICdjaGFydF9nZW5lcmljX3BpZScsXHJcbiAgICBiYXI6ICdjaGFydF9nZW5lcmljX2JhcicsXHJcbiAgICBsaW5lOiAnY2hhcnRfZ2VuZXJpY19saW5lJyxcclxuICB9LFxyXG5cclxuICBmb3JtYXRNb2R1bGU6IGZvcm1hdCxcclxuICBmb3JtYXR0ZXI6IGZvcm1hdC5iaWdOdW1iZXIsXHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGN1bGF0ZXMgdGhlIHZhbHVlIHNob3duIGluIHRoZSBtZXRyaWMgd2lkZ2V0IGJ1dHRvbi5cclxuICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhIEFycmF5IG9mIGRhdGEgdXNlZCBmb3IgdGhlIG1ldHJpY1xyXG4gICAqIEByZXR1cm4ge2ludH0gUmV0dXJucyBhIHZhbHVlIGNhbGN1bGF0ZWQgZnJvbSBkYXRhIChTVU0vQVZHL01BWC9NSU4vV2hhdGV2ZXIpXHJcbiAgICovXHJcbiAgdmFsdWVGbjogZnVuY3Rpb24gdmFsdWVGbihkYXRhID0gW10pIHtcclxuICAgIHJldHVybiBkYXRhLnJlZHVjZSgocCwgYykgPT4gcCArIGMudmFsdWUsIDApO1xyXG4gIH0sXHJcblxyXG4gIC8vIEZ1bmN0aW9ucyBjYW4ndCBiZSBzdG9yZWQgaW4gbG9jYWxzdG9yYWdlLCBzYXZlIHRoZSBtb2R1bGUvZm4gc3RyaW5ncyBhbmQgbG9hZCB0aGVtIGxhdGVyIHZpYSBBTURcclxuICBhZ2dyZWdhdGVNb2R1bGU6IGFnZ3JlZ2F0ZSxcclxuICBhZ2dyZWdhdGU6IG51bGwsXHJcblxyXG4gIC8qKlxyXG4gICAqIFJlcXVlc3RzIHRoZSB3aWRnZXQncyBkYXRhLCB2YWx1ZSBmbiwgZm9ybWF0IGZuLCBhbmQgcmVuZGVycyBpdCdzIGl0ZW1UZW1wbGF0ZVxyXG4gICAqL1xyXG4gIHJlcXVlc3REYXRhOiBmdW5jdGlvbiByZXF1ZXN0RGF0YSgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcblxyXG4gICAgaWYgKHRoaXMuX2RhdGEgJiYgdGhpcy5fZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9kYXRhID0gW107XHJcbiAgICB0aGlzLnJlcXVlc3REYXRhRGVmZXJyZWQgPSBuZXcgRGVmZXJyZWQoKTtcclxuICAgIHRoaXMuX2dldERhdGEoKTtcclxuXHJcbiAgICB0aGlzLnJlcXVlc3REYXRhRGVmZXJyZWRcclxuICAgICAgLnRoZW4oKHJlc3VsdHMpID0+IHtcclxuICAgICAgICBjb25zdCBkYXRhID0gcmVzdWx0cztcclxuICAgICAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQW4gZXJyb3Igb2NjdXJyZWQgbG9hZGluZyB0aGUgS1BJIHdpZGdldCBkYXRhLicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52YWx1ZUZuID0gdGhpcy5hZ2dyZWdhdGVNb2R1bGVbdGhpcy5hZ2dyZWdhdGVdO1xyXG4gICAgICAgIHRoaXMuZm9ybWF0dGVyID0gdGhpcy5mb3JtYXRNb2R1bGVbdGhpcy5mb3JtYXR0ZXJdO1xyXG5cclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMudmFsdWUgPSB0aGlzLnZhbHVlRm4uY2FsbCh0aGlzLCBkYXRhKTtcclxuICAgICAgICAkKHRoaXMubWV0cmljRGV0YWlsTm9kZSkucmVwbGFjZVdpdGgodGhpcy5pdGVtVGVtcGxhdGUuYXBwbHkoe1xyXG4gICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgfSwgdGhpcykpO1xyXG4gICAgICB9LCAoZXJyKSA9PiB7XHJcbiAgICAgICAgLy8gRXJyb3JcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICAkKHRoaXMubWV0cmljRGV0YWlsTm9kZSkucmVwbGFjZVdpdGgodGhpcy5lcnJvclRlbXBsYXRlLmFwcGx5KHt9LCB0aGlzKSk7XHJcbiAgICAgIH0pO1xyXG4gIH0sXHJcbiAgbmF2VG9SZXBvcnRWaWV3OiBmdW5jdGlvbiBuYXZUb1JlcG9ydFZpZXcoKSB7XHJcbiAgICBpZiAoIXRoaXMuY2hhcnRUeXBlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcodGhpcy5jaGFydFR5cGVNYXBwaW5nW3RoaXMuY2hhcnRUeXBlXSk7XHJcblxyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5wYXJlbnQgPSB0aGlzO1xyXG4gICAgICB2aWV3LmZvcm1hdHRlciA9IHRoaXMuZm9ybWF0dGVyO1xyXG4gICAgICB2aWV3LnNob3coe1xyXG4gICAgICAgIHJldHVyblRvOiB0aGlzLnJldHVyblRvSWQsXHJcbiAgICAgICAgY3VycmVudFNlYXJjaEV4cHJlc3Npb246IHRoaXMuY3VycmVudFNlYXJjaEV4cHJlc3Npb24sXHJcbiAgICAgICAgdGl0bGU6IHRoaXMudGl0bGUsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgX2J1aWxkUXVlcnlPcHRpb25zOiBmdW5jdGlvbiBfYnVpbGRRdWVyeU9wdGlvbnMoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjb3VudDogdGhpcy5wYWdlU2l6ZSxcclxuICAgICAgc3RhcnQ6IHRoaXMucG9zaXRpb24sXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgX2J1aWxkUXVlcnlFeHByZXNzaW9uOiBmdW5jdGlvbiBfYnVpbGRRdWVyeUV4cHJlc3Npb24oKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9LFxyXG4gIF9nZXREYXRhOiBmdW5jdGlvbiBfZ2V0RGF0YSgpIHtcclxuICAgIGNvbnN0IHF1ZXJ5T3B0aW9ucyA9IHRoaXMuX2J1aWxkUXVlcnlPcHRpb25zKCk7XHJcbiAgICBjb25zdCBxdWVyeUV4cHJlc3Npb24gPSB0aGlzLl9idWlsZFF1ZXJ5RXhwcmVzc2lvbigpO1xyXG4gICAgY29uc3Qgc3RvcmUgPSB0aGlzLmdldCgnc3RvcmUnKTtcclxuICAgIGNvbnN0IHF1ZXJ5UmVzdWx0cyA9IHN0b3JlLnF1ZXJ5KHF1ZXJ5RXhwcmVzc2lvbiwgcXVlcnlPcHRpb25zKTtcclxuICAgIHdoZW4ocXVlcnlSZXN1bHRzLCBsYW5nLmhpdGNoKHRoaXMsIHRoaXMuX29uUXVlcnlTdWNjZXNzLCBxdWVyeVJlc3VsdHMpLCBsYW5nLmhpdGNoKHRoaXMsIHRoaXMuX29uUXVlcnlFcnJvcikpO1xyXG4gIH0sXHJcbiAgX29uUXVlcnlTdWNjZXNzOiBmdW5jdGlvbiBfb25RdWVyeVN1Y2Nlc3MocXVlcnlSZXN1bHRzKSB7XHJcbiAgICB3aGVuKHF1ZXJ5UmVzdWx0cy50b3RhbCwgKHRvdGFsKSA9PiB7XHJcbiAgICAgIHF1ZXJ5UmVzdWx0cy5mb3JFYWNoKGxhbmcuaGl0Y2godGhpcywgdGhpcy5fcHJvY2Vzc0l0ZW0pKTtcclxuXHJcbiAgICAgIGxldCBsZWZ0ID0gLTE7XHJcbiAgICAgIGlmICh0b3RhbCA+IC0xKSB7XHJcbiAgICAgICAgbGVmdCA9IHRvdGFsIC0gKHRoaXMucG9zaXRpb24gKyB0aGlzLnBhZ2VTaXplKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGxlZnQgPiAwKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb24gKyB0aGlzLnBhZ2VTaXplO1xyXG4gICAgICAgIHRoaXMuX2dldERhdGEoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBTaWduYWwgY29tcGxldGVcclxuICAgICAgICB0aGlzLnJlcXVlc3REYXRhRGVmZXJyZWQucmVzb2x2ZSh0aGlzLl9kYXRhKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBfcHJvY2Vzc0l0ZW06IGZ1bmN0aW9uIF9wcm9jZXNzSXRlbShpdGVtKSB7XHJcbiAgICB0aGlzLl9kYXRhLnB1c2goaXRlbSk7XHJcbiAgfSxcclxuICBfb25RdWVyeUVycm9yOiBmdW5jdGlvbiBfb25RdWVyeUVycm9yKGVycm9yKSB7XHJcbiAgICB0aGlzLnJlcXVlc3REYXRhRGVmZXJyZWQucmVqZWN0KGVycm9yKTtcclxuICB9LFxyXG4gIGNyZWF0ZVN0b3JlOiBmdW5jdGlvbiBjcmVhdGVTdG9yZSgpIHtcclxuICAgIGNvbnN0IHN0b3JlID0gbmV3IFNEYXRhU3RvcmUoe1xyXG4gICAgICByZXF1ZXN0OiB0aGlzLnJlcXVlc3QsXHJcbiAgICAgIHNlcnZpY2U6IEFwcC5zZXJ2aWNlcy5jcm0sXHJcbiAgICAgIHJlc291cmNlS2luZDogdGhpcy5yZXNvdXJjZUtpbmQsXHJcbiAgICAgIHJlc291cmNlUHJlZGljYXRlOiB0aGlzLnJlc291cmNlUHJlZGljYXRlLFxyXG4gICAgICBjb250cmFjdE5hbWU6IHRoaXMuY29udHJhY3ROYW1lLFxyXG4gICAgICBzZWxlY3Q6IHRoaXMucXVlcnlTZWxlY3QsXHJcbiAgICAgIHF1ZXJ5TmFtZTogdGhpcy5xdWVyeU5hbWUsXHJcbiAgICAgIHF1ZXJ5QXJnczogdGhpcy5xdWVyeUFyZ3MsXHJcbiAgICAgIG9yZGVyQnk6IHRoaXMucXVlcnlPcmRlckJ5LFxyXG4gICAgICBpZFByb3BlcnR5OiB0aGlzLmtleVByb3BlcnR5LFxyXG4gICAgICBhcHBsaWNhdGlvbk5hbWU6IHRoaXMuYXBwbGljYXRpb25OYW1lLFxyXG4gICAgICBzY29wZTogdGhpcyxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBzdG9yZTtcclxuICB9LFxyXG4gIF9nZXRTdG9yZUF0dHI6IGZ1bmN0aW9uIF9nZXRTdG9yZUF0dHIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zdG9yZSB8fCAodGhpcy5zdG9yZSA9IHRoaXMuY3JlYXRlU3RvcmUoKSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=