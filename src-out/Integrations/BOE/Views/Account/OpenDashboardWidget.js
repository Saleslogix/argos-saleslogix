define("crm/Integrations/BOE/Views/Account/OpenDashboardWidget", ["exports", "dojo/_base/declare", "dojo/_base/lang", "argos/Convert", "argos/RelatedViewManager", "../../DashboardWidget", "argos/I18n", "crm/Format", "crm/Aggregate"], function (_exports, _declare, _lang, _Convert, _RelatedViewManager, _DashboardWidget, _I18n, _Format, _Aggregate) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _Convert = _interopRequireDefault(_Convert);
  _RelatedViewManager = _interopRequireDefault(_RelatedViewManager);
  _DashboardWidget = _interopRequireDefault(_DashboardWidget);
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
  var resource = (0, _I18n["default"])('openDashboardWidget');

  var __class = (0, _declare["default"])('crm.Integrations.BOE.Views.Account.OpenDashboardWidget', [_DashboardWidget["default"]], {
    // Localization
    openSalesOrdersText: resource.openSalesOrdersText,
    openQuotesText: resource.openQuotesText,
    outstandingInvoicesText: resource.outstandingInvoicesText,
    lateInvoicesText: resource.lateInvoicesText,
    lateSalesOrdersText: resource.lateSalesOrdersText,
    agingInvoicesText: resource.agingInvoicesText,
    agingSalesOrdersText: resource.agingSalesOrdersText,
    agingQuotesText: resource.agingQuotesText,
    titleText: resource.titleText,
    categoryText: resource.categoryText,
    quotesTotalingText: resource.quotesTotalingText,
    ordersTotalingText: resource.ordersTotalingText,
    invoicesTotalingText: resource.invoicesTotalingText,
    // crm status for SalesOrder
    openOrderText: resource.openOrderText,
    salesOrderText: resource.salesOrderText,
    salesHoldText: resource.salesHoldText,
    creditHoldText: resource.creditHoldText,
    adminHoldText: resource.adminHoldText,
    holdText: resource.holdText,
    orderedText: resource.orderedText,
    partiallyShippedText: resource.partiallyShippedText,
    pendingText: resource.pendingText,
    newText: resource.newText,
    openText: resource.openText,
    approvedText: resource.approvedText,
    awardedText: resource.awardedText,
    // Override variables for _DashboardWidgetBase
    color: '#313236',
    selectedColor: '#50535a',
    dayValue: 0,
    // Codes used for the status of the entity
    newCode: 'New',
    openCode: 'Open',
    approvedCode: 'Approved',
    workingCode: 'Working',
    partialShipCode: 'PartiallyShipped',
    partialPaidCode: 'PartialPaid',
    closedCode: 'Closed',
    disputeCode: 'Dispute',
    holdCode: 'Hold',
    pendingCode: 'Pending',
    // Values for the metrics
    values: [{
      name: 'quotes',
      aggregate: 'sum',
      aggregateModule: _Aggregate["default"],
      value: null,
      queryIndex: 0,
      count: true,
      dateDependent: true
    }, {
      name: 'invoices',
      aggregate: 'sum',
      aggregateModule: _Aggregate["default"],
      value: null,
      queryIndex: 1,
      count: true,
      dateDependent: true
    }, {
      name: 'salesOrders',
      aggregate: 'sum',
      aggregateModule: _Aggregate["default"],
      value: null,
      queryIndex: 2,
      count: true,
      dateDependent: false
    }],
    resourceKind: 'accounts',
    querySelect: ['AccountName'],
    getWhere: function getWhere() {
      return "Id eq '".concat(this.parentEntry.$key, "'");
    },
    // Creates the range widgets, value can have valueUnit to apply next to the number
    createRangeLayout: function createRangeLayout() {
      var rangeLayout = [{
        value: 0,
        valueUnit: '+'
      }, {
        value: 30,
        valueUnit: '+'
      }, {
        value: 60,
        valueUnit: '+'
      }, {
        value: 90,
        valueUnit: '+'
      }, {
        value: 180,
        valueUnit: '+'
      }];
      return rangeLayout;
    },
    createMetricLayout: function createMetricLayout(entry) {
      this.setQueryArgs(entry);
      var metricLayout = [{
        navTo: 'account_openquotes_related',
        formatter: 'bigNumber',
        formatterModule: _Format["default"],
        title: this.agingQuotesText,
        countTitle: this.quotesTotalingText,
        valueNeeded: 'quotes'
      }, {
        navTo: 'account_lateinvoice_related',
        formatter: 'bigNumber',
        formatterModule: _Format["default"],
        title: this.agingInvoicesText,
        countTitle: this.invoicesTotalingText,
        valueNeeded: 'invoices'
      }, {
        navTo: 'account_opensalesorders_related',
        formatter: 'bigNumber',
        formatterModule: _Format["default"],
        title: this.agingSalesOrdersText,
        countTitle: this.ordersTotalingText,
        valueNeeded: 'salesOrders'
      }];
      return metricLayout;
    },
    setQueryArgs: function setQueryArgs(entry) {
      this.queryArgs = [];
      this.queryArgs.push(['quotes', {
        _activeFilter: "Account.Id eq \"".concat(entry.$key, "\" and ") + '(' + '(' + '(ErpExtId ne null) and ' + "(ErpStatus eq \"".concat(this.openCode, "\"") + " or ErpStatus eq \"".concat(this.pendingCode, "\"") + " or ErpStatus eq \"".concat(this.approvedCode, "\"") + ") and (".concat(this.pastDays('DocumentDate'), ")") + ')' + ' or ' + '(' + '(ErpExtId eq null) and ' + "(Status eq \"".concat(this.newText, "\"") + " or Status eq \"".concat(this.openText, "\"") + " or Status eq \"".concat(this.approvedText, "\"") + " or Status eq \"".concat(this.pendingText, "\"") + " or Status eq \"".concat(this.awardedText, "\"") + ") and (".concat(this.pastDays('StartDate'), ")") + ')' + ')',
        _filterName: 'AccountManager',
        _metricName: 'SumGrandTotal'
      }], ['erpInvoices', {
        _activeFilter: "Account.Id eq \"".concat(entry.$key, "\" and ") + '(' + "(ErpStatus eq \"".concat(this.openCode, "\"") + " or ErpStatus eq \"".concat(this.partialPaidCode, "\"") + " or ErpStatus eq \"".concat(this.disputeCode, "\"") + ')' + ") and ".concat(this.pastDays('ErpDocumentDate')),
        _filterName: 'ErpStatus',
        _metricName: 'SumGrandTotal'
      }], ['salesOrders', {
        _activeFilter: "Account.Id eq \"".concat(entry.$key, "\" and ") + '(' + '(' + '(ErpExtId ne null) and ' + '(' + "(ERPSalesOrder.ERPStatus eq \"".concat(this.openCode, "\"") + " or ERPSalesOrder.ERPStatus eq \"".concat(this.holdCode, "\"") + " or ERPSalesOrder.ERPStatus eq \"".concat(this.partialShipCode, "\"") + " or ERPSalesOrder.ERPStatus eq \"".concat(this.approvedCode, "\"") + ") and ".concat(this.pastDays('ErpDocumentDate') // ' and ' +
        // '(SalesOrderItems.ErpStatus eq "' + this.openCode + '"' + // This does not work since it creates a cartesion duplicate result for each line
        //    ' or SalesOrderItems.ErpStatus eq "' + this.partialShipCode + '"' +
        //    ' or SalesOrderItems.ErpStatus eq "' + this.holdCode + '"' +
        //  ') and ' +
        //  this.pastDays('SalesOrderItems.ErpRequiredDeliveryDate') +
        , ")") + ') or ' + '((ErpExtId eq null) and ' + "(Status eq \"".concat(this.openOrderText, "\"") + " or Status eq \"".concat(this.salesOrderText, "\"") + " or Status eq \"".concat(this.salesHoldText, "\"") + " or Status eq \"".concat(this.creditHoldText, "\"") + " or Status eq \"".concat(this.adminHoldText, "\"") + " or Status eq \"".concat(this.holdText, "\"") + " or Status eq \"".concat(this.orderedText, "\"") + " or Status eq \"".concat(this.partiallyShippedText, "\"") + " or Status eq \"".concat(this.pendingText, "\"") + ") and (".concat(this.pastDays('OrderDate'), ")") + ')' + ')',
        _filterName: 'AccountManager',
        _metricName: 'SumGrandTotal'
      }]);
      this.setCountTitles();
    },
    setCountTitles: function setCountTitles() {},
    pastDays: function pastDays(property) {
      var now = moment();

      if (this.dayValue === 0) {
        return '1 eq 1';
      }

      var pastDay = now.clone().subtract(this.dayValue, 'days').startOf('day');
      var query = "(".concat(property, " lt @").concat(_Convert["default"].toIsoStringFromDate(pastDay.toDate()), "@ or (").concat(property, " lt @").concat(pastDay.format('YYYY-MM-DDT00:00:00[Z]'), "@))");
      return query;
    }
  });

  var rvm = new _RelatedViewManager["default"]();
  rvm.registerType('account_open_dashboard_widget', __class);

  _lang["default"].setObject('icboe.Views.Account.OpenDashboardWidget', __class);

  var _default = __class;
  _exports["default"] = _default;
});