define("crm/Integrations/BOE/Views/Account/SalesDashboardWidget", ["exports", "dojo/_base/declare", "dojo/_base/lang", "dojo/string", "argos/Convert", "argos/RelatedViewManager", "../../DashboardWidget", "argos/I18n", "crm/Format", "crm/Aggregate", "icboe/Aggregate"], function (_exports, _declare, _lang, _string, _Convert, _RelatedViewManager, _DashboardWidget, _I18n, _Format, _Aggregate, _Aggregate2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _string = _interopRequireDefault(_string);
  _Convert = _interopRequireDefault(_Convert);
  _RelatedViewManager = _interopRequireDefault(_RelatedViewManager);
  _DashboardWidget = _interopRequireDefault(_DashboardWidget);
  _I18n = _interopRequireDefault(_I18n);
  _Format = _interopRequireDefault(_Format);
  _Aggregate = _interopRequireDefault(_Aggregate);
  _Aggregate2 = _interopRequireDefault(_Aggregate2);

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
  var resource = (0, _I18n["default"])('salesDashboardWidget');

  var __class = (0, _declare["default"])('crm.Integrations.BOE.Views.Account.SalesDashboardWidget', [_DashboardWidget["default"]], {
    // Localization
    recentRevenueText: resource.recentRevenueText,
    recentCostText: resource.recentCostText,
    recentProfitText: resource.recentProfitText,
    recentMarginText: resource.recentMarginText,
    yoyRevenueText: resource.yoyRevenueText,
    yoyProfitText: resource.yoyProfitText,
    yoyMarginText: resource.yoyMarginText,
    titleText: resource.titleText,
    categoryText: resource.categoryText,
    // Override variables for _DashboardWidgetBase
    color: '#313236',
    selectedColor: '#50535a',
    dayValue: 90,
    yearDays: 365,
    queriedOnce: false,
    // Codes for the status picklist of the entity
    openCode: 'Open',
    pendingCode: 'Pending',
    partialPaidCode: 'PartialPaid',
    paidCode: 'Paid',
    closedCode: 'Closed',
    canceledCode: 'Canceled',
    formatModule: _Format["default"],

    /*
       * Values for the metrics
       * name: valueNeeded by the widget,
       * aggregate: function to aggregate the value,
       * aggregateModule: path to the file holding the aggregate function,
       * value: set to null (will hold the value once queried),
       * queryIndex: the index of the query based on how it was added to queryArgs in the setQueryArgs function,
       * dateDependent: bool to let the base know whether to refresh the value on a range change
       */
    values: [{
      name: 'revenue',
      aggregate: 'sum',
      aggregateModule: _Aggregate["default"],
      value: null,
      queryIndex: 0,
      dateDependent: true
    }, {
      name: 'cost',
      aggregate: 'sum',
      aggregateModule: _Aggregate["default"],
      value: null,
      queryIndex: 1,
      dateDependent: true
    }, {
      name: 'profit',
      aggregate: 'calcProfit',
      aggregateModule: _Aggregate2["default"],
      value: null,
      queryIndex: [0, 1],
      dateDependent: true
    }, {
      name: 'margin',
      aggregate: 'calcMargin',
      aggregateModule: _Aggregate2["default"],
      value: null,
      queryIndex: [0, 1],
      dateDependent: true
    }, {
      name: 'yoyRevenue',
      aggregate: 'calcYoYRevenue',
      aggregateModule: _Aggregate2["default"],
      value: null,
      queryIndex: [2, 3],
      dateDependent: false
    }, {
      name: 'yoyProfit',
      aggregate: 'calcYoYProfit',
      aggregateModule: _Aggregate2["default"],
      value: null,
      queryIndex: [2, 3, 4, 5],
      dateDependent: false
    }, {
      name: 'yoyMargin',
      aggregate: 'calcYoYMargin',
      aggregateModule: _Aggregate2["default"],
      value: null,
      queryIndex: [2, 3, 4, 5],
      dateDependent: true
    }],
    resourceKind: 'accounts',
    querySelect: ['AccountName'],
    queryArgs: null,
    getWhere: function getWhere() {
      return "Id eq '".concat(this.parentEntry.$key, "'");
    },
    getBaseQuery: function getBaseQuery(entry) {
      var query = "(Account.Id eq \"".concat(entry.$key, "\" and (ErpStatus eq \"").concat(this.openCode, "\" or ErpStatus eq \"").concat(this.partialPaidCode, "\" or ErpStatus eq \"").concat(this.pendingCode, "\" or ErpStatus eq \"").concat(this.paidCode, "\"))");
      return query;
    },
    createRangeLayout: function createRangeLayout() {
      var rangeLayout = [{
        value: 30
      }, {
        value: 60
      }, {
        value: 90
      }, {
        value: 180
      }, {
        value: 365
      }];
      return rangeLayout;
    },
    createMetricLayout: function createMetricLayout(entry) {
      this.setQueryArgs(entry);
      /*
         * Format of metric layout:
         * formatter: value,
         * formatModule: module to load that contains the value,
         * title: title of the widget,
         * valueNeeded: value that the widget consumes
       */

      var metricLayout = [{
        formatter: 'bigNumber',
        formatModule: this.formatModule,
        title: this.recentRevenueText,
        valueNeeded: 'revenue',
        decorator: 'positiveTrend'
      }, {
        formatter: 'bigNumber',
        formatModule: this.formatModule,
        title: this.recentProfitText,
        valueNeeded: 'profit',
        decorator: 'positiveTrend'
      }, {
        formatter: 'percent',
        formatModule: this.formatModule,
        title: this.recentMarginText,
        valueNeeded: 'margin',
        decorator: 'positiveTrend'
      }, {
        formatter: 'percent',
        formatModule: this.formatModule,
        title: this.yoyRevenueText,
        valueNeeded: 'yoyRevenue',
        decorator: 'positiveTrend'
      }, {
        formatter: 'percent',
        formatModule: this.formatModule,
        title: this.yoyProfitText,
        valueNeeded: 'yoyProfit',
        decorator: 'positiveTrend'
      }, {
        formatter: 'percent',
        formatModule: this.formatModule,
        title: this.yoyMarginText,
        valueNeeded: 'yoyMargin',
        decorator: 'positiveTrend'
      }];
      return metricLayout;
    },
    setQueryArgs: function setQueryArgs(entry) {
      // This function builds the query args array in an order that matches the queryIndex values needed by the values array
      this.queryArgs = [];
      this.queryArgs.push(['erpInvoices', {
        _activeFilter: "".concat(this.getBaseQuery(entry), " and ").concat(this.pastDays('ErpDocumentDate', this.dayValue, null)),
        _filterName: 'ErpStatus',
        _metricName: 'SumGrandTotal'
      }], ['erpInvoices', {
        _activeFilter: "".concat(this.getBaseQuery(entry), " and ").concat(this.pastDays('ErpDocumentDate', this.dayValue, null)),
        _filterName: 'ErpStatus',
        _metricName: 'SumExtendedCost'
      }]);

      if (!this.queriedOnce) {
        this.queryArgs.push(['erpInvoices', {
          _activeFilter: "".concat(this.getBaseQuery(entry), " and ").concat(this.pastDays('ErpDocumentDate', this.yearDays, null)),
          _filterName: 'ErpStatus',
          _metricName: 'SumGrandTotal'
        }], ['erpInvoices', {
          _activeFilter: "".concat(this.getBaseQuery(entry), " and ").concat(this.pastDays('ErpDocumentDate', 2 * this.yearDays, this.yearDays)),
          _filterName: 'ErpStatus',
          _metricName: 'SumGrandTotal'
        }], ['erpInvoices', {
          _activeFilter: "".concat(this.getBaseQuery(entry), " and ").concat(this.pastDays('ErpDocumentDate', this.yearDays, null)),
          _filterName: 'ErpStatus',
          _metricName: 'SumExtendedCost'
        }], ['erpInvoices', {
          _activeFilter: "".concat(this.getBaseQuery(entry), " and ").concat(this.pastDays('ErpDocumentDate', 2 * this.yearDays, this.yearDays)),
          _filterName: 'ErpStatus',
          _metricName: 'SumExtendedCost'
        }]);
      }

      this.queriedOnce = true;
    },
    pastDays: function pastDays(property, from, to) {
      var now = moment();
      var pastWeekStart = now.clone().subtract(from, 'days').startOf('day');
      var today;

      if (!to) {
        today = now.clone().endOf('day');
      } else {
        today = now.clone().subtract(to, 'days').endOf('day');
      }

      var query = _string["default"].substitute("((".concat(property, " between @${0}@ and @${1}@) or (").concat(property, " between @${2}@ and @${3}@))"), [_Convert["default"].toIsoStringFromDate(pastWeekStart.toDate()), _Convert["default"].toIsoStringFromDate(today.toDate()), pastWeekStart.format('YYYY-MM-DDT00:00:00[Z]'), today.format('YYYY-MM-DDT23:59:59[Z]')]);

      return query;
    }
  });

  var rvm = new _RelatedViewManager["default"]();
  rvm.registerType('account_sales_dashboard_widget', __class);

  _lang["default"].setObject('icboe.Views.Account.SalesDashboardWidget', __class);

  var _default = __class;
  _exports["default"] = _default;
});