define('crm/Integrations/BOE/Views/Account/OpenDashboardWidget', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Convert', 'argos/RelatedViewManager', '../../DashboardWidget', 'argos/I18n', 'crm/Format', 'crm/Aggregate'], function (module, exports, _declare, _lang, _Convert, _RelatedViewManager, _DashboardWidget, _I18n, _Format, _Aggregate) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Convert2 = _interopRequireDefault(_Convert);

  var _RelatedViewManager2 = _interopRequireDefault(_RelatedViewManager);

  var _DashboardWidget2 = _interopRequireDefault(_DashboardWidget);

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

  var resource = (0, _I18n2.default)('openDashboardWidget');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.Account.OpenDashboardWidget', [_DashboardWidget2.default], {
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
      aggregateModule: _Aggregate2.default,
      value: null,
      queryIndex: 0,
      count: true,
      dateDependent: true
    }, {
      name: 'invoices',
      aggregate: 'sum',
      aggregateModule: _Aggregate2.default,
      value: null,
      queryIndex: 1,
      count: true,
      dateDependent: true
    }, {
      name: 'salesOrders',
      aggregate: 'sum',
      aggregateModule: _Aggregate2.default,
      value: null,
      queryIndex: 2,
      count: true,
      dateDependent: false
    }],

    resourceKind: 'accounts',
    querySelect: ['AccountName'],
    getWhere: function getWhere() {
      return 'Id eq \'' + this.parentEntry.$key + '\'';
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
        formatterModule: _Format2.default,
        title: this.agingQuotesText,
        countTitle: this.quotesTotalingText,
        valueNeeded: 'quotes'
      }, {
        navTo: 'account_lateinvoice_related',
        formatter: 'bigNumber',
        formatterModule: _Format2.default,
        title: this.agingInvoicesText,
        countTitle: this.invoicesTotalingText,
        valueNeeded: 'invoices'
      }, {
        navTo: 'account_opensalesorders_related',
        formatter: 'bigNumber',
        formatterModule: _Format2.default,
        title: this.agingSalesOrdersText,
        countTitle: this.ordersTotalingText,
        valueNeeded: 'salesOrders'
      }];

      return metricLayout;
    },
    setQueryArgs: function setQueryArgs(entry) {
      this.queryArgs = [];

      this.queryArgs.push(['quotes', {
        _activeFilter: 'Account.Id eq "' + entry.$key + '" and ' + '(' + '(' + '(ErpExtId ne null) and ' + ('(ErpStatus eq "' + this.openCode + '"') + (' or ErpStatus eq "' + this.pendingCode + '"') + (' or ErpStatus eq "' + this.approvedCode + '"') + (') and (' + this.pastDays('DocumentDate') + ')') + ')' + ' or ' + '(' + '(ErpExtId eq null) and ' + ('(Status eq "' + this.newText + '"') + (' or Status eq "' + this.openText + '"') + (' or Status eq "' + this.approvedText + '"') + (' or Status eq "' + this.pendingText + '"') + (' or Status eq "' + this.awardedText + '"') + (') and (' + this.pastDays('StartDate') + ')') + ')' + ')',
        _filterName: 'AccountManager',
        _metricName: 'SumGrandTotal'
      }], ['erpInvoices', {
        _activeFilter: 'Account.Id eq "' + entry.$key + '" and ' + '(' + ('(ErpStatus eq "' + this.openCode + '"') + (' or ErpStatus eq "' + this.partialPaidCode + '"') + (' or ErpStatus eq "' + this.disputeCode + '"') + ')' + (') and ' + this.pastDays('ErpDocumentDate')),
        _filterName: 'ErpStatus',
        _metricName: 'SumGrandTotal'
      }], ['salesOrders', {
        _activeFilter: 'Account.Id eq "' + entry.$key + '" and ' + '(' + '(' + '(ErpExtId ne null) and ' + '(' + ('(ERPSalesOrder.ERPStatus eq "' + this.openCode + '"') + (' or ERPSalesOrder.ERPStatus eq "' + this.holdCode + '"') + (' or ERPSalesOrder.ERPStatus eq "' + this.partialShipCode + '"') + (' or ERPSalesOrder.ERPStatus eq "' + this.approvedCode + '"') + (') and ' + this.pastDays('ErpDocumentDate') // ' and ' +
        // '(SalesOrderItems.ErpStatus eq "' + this.openCode + '"' + // This does not work since it creates a cartesion duplicate result for each line
        //    ' or SalesOrderItems.ErpStatus eq "' + this.partialShipCode + '"' +
        //    ' or SalesOrderItems.ErpStatus eq "' + this.holdCode + '"' +
        //  ') and ' +
        //  this.pastDays('SalesOrderItems.ErpRequiredDeliveryDate') +
        + ')') + ') or ' + '((ErpExtId eq null) and ' + ('(Status eq "' + this.openOrderText + '"') + (' or Status eq "' + this.salesOrderText + '"') + (' or Status eq "' + this.salesHoldText + '"') + (' or Status eq "' + this.creditHoldText + '"') + (' or Status eq "' + this.adminHoldText + '"') + (' or Status eq "' + this.holdText + '"') + (' or Status eq "' + this.orderedText + '"') + (' or Status eq "' + this.partiallyShippedText + '"') + (' or Status eq "' + this.pendingText + '"') + (') and (' + this.pastDays('OrderDate') + ')') + ')' + ')',
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

      var query = '(' + property + ' lt @' + _Convert2.default.toIsoStringFromDate(pastDay.toDate()) + '@ or (' + property + ' lt @' + pastDay.format('YYYY-MM-DDT00:00:00[Z]') + '@))';
      return query;
    }
  });
  var rvm = new _RelatedViewManager2.default();
  rvm.registerType('account_open_dashboard_widget', __class);
  _lang2.default.setObject('icboe.Views.Account.OpenDashboardWidget', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0FjY291bnQvT3BlbkRhc2hib2FyZFdpZGdldC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJvcGVuU2FsZXNPcmRlcnNUZXh0Iiwib3BlblF1b3Rlc1RleHQiLCJvdXRzdGFuZGluZ0ludm9pY2VzVGV4dCIsImxhdGVJbnZvaWNlc1RleHQiLCJsYXRlU2FsZXNPcmRlcnNUZXh0IiwiYWdpbmdJbnZvaWNlc1RleHQiLCJhZ2luZ1NhbGVzT3JkZXJzVGV4dCIsImFnaW5nUXVvdGVzVGV4dCIsInRpdGxlVGV4dCIsImNhdGVnb3J5VGV4dCIsInF1b3Rlc1RvdGFsaW5nVGV4dCIsIm9yZGVyc1RvdGFsaW5nVGV4dCIsImludm9pY2VzVG90YWxpbmdUZXh0Iiwib3Blbk9yZGVyVGV4dCIsInNhbGVzT3JkZXJUZXh0Iiwic2FsZXNIb2xkVGV4dCIsImNyZWRpdEhvbGRUZXh0IiwiYWRtaW5Ib2xkVGV4dCIsImhvbGRUZXh0Iiwib3JkZXJlZFRleHQiLCJwYXJ0aWFsbHlTaGlwcGVkVGV4dCIsInBlbmRpbmdUZXh0IiwibmV3VGV4dCIsIm9wZW5UZXh0IiwiYXBwcm92ZWRUZXh0IiwiYXdhcmRlZFRleHQiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJkYXlWYWx1ZSIsIm5ld0NvZGUiLCJvcGVuQ29kZSIsImFwcHJvdmVkQ29kZSIsIndvcmtpbmdDb2RlIiwicGFydGlhbFNoaXBDb2RlIiwicGFydGlhbFBhaWRDb2RlIiwiY2xvc2VkQ29kZSIsImRpc3B1dGVDb2RlIiwiaG9sZENvZGUiLCJwZW5kaW5nQ29kZSIsInZhbHVlcyIsIm5hbWUiLCJhZ2dyZWdhdGUiLCJhZ2dyZWdhdGVNb2R1bGUiLCJ2YWx1ZSIsInF1ZXJ5SW5kZXgiLCJjb3VudCIsImRhdGVEZXBlbmRlbnQiLCJyZXNvdXJjZUtpbmQiLCJxdWVyeVNlbGVjdCIsImdldFdoZXJlIiwicGFyZW50RW50cnkiLCIka2V5IiwiY3JlYXRlUmFuZ2VMYXlvdXQiLCJyYW5nZUxheW91dCIsInZhbHVlVW5pdCIsImNyZWF0ZU1ldHJpY0xheW91dCIsImVudHJ5Iiwic2V0UXVlcnlBcmdzIiwibWV0cmljTGF5b3V0IiwibmF2VG8iLCJmb3JtYXR0ZXIiLCJmb3JtYXR0ZXJNb2R1bGUiLCJ0aXRsZSIsImNvdW50VGl0bGUiLCJ2YWx1ZU5lZWRlZCIsInF1ZXJ5QXJncyIsInB1c2giLCJfYWN0aXZlRmlsdGVyIiwicGFzdERheXMiLCJfZmlsdGVyTmFtZSIsIl9tZXRyaWNOYW1lIiwic2V0Q291bnRUaXRsZXMiLCJwcm9wZXJ0eSIsIm5vdyIsIm1vbWVudCIsInBhc3REYXkiLCJjbG9uZSIsInN1YnRyYWN0Iiwic3RhcnRPZiIsInF1ZXJ5IiwidG9Jc29TdHJpbmdGcm9tRGF0ZSIsInRvRGF0ZSIsImZvcm1hdCIsInJ2bSIsInJlZ2lzdGVyVHlwZSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQXlCQSxNQUFNQSxXQUFXLG9CQUFZLHFCQUFaLENBQWpCOztBQUVBLE1BQU1DLFVBQVUsdUJBQVEsd0RBQVIsRUFBa0UsMkJBQWxFLEVBQXFGO0FBQ25HO0FBQ0FDLHlCQUFxQkYsU0FBU0UsbUJBRnFFO0FBR25HQyxvQkFBZ0JILFNBQVNHLGNBSDBFO0FBSW5HQyw2QkFBeUJKLFNBQVNJLHVCQUppRTtBQUtuR0Msc0JBQWtCTCxTQUFTSyxnQkFMd0U7QUFNbkdDLHlCQUFxQk4sU0FBU00sbUJBTnFFO0FBT25HQyx1QkFBbUJQLFNBQVNPLGlCQVB1RTtBQVFuR0MsMEJBQXNCUixTQUFTUSxvQkFSb0U7QUFTbkdDLHFCQUFpQlQsU0FBU1MsZUFUeUU7QUFVbkdDLGVBQVdWLFNBQVNVLFNBVitFO0FBV25HQyxrQkFBY1gsU0FBU1csWUFYNEU7QUFZbkdDLHdCQUFvQlosU0FBU1ksa0JBWnNFO0FBYW5HQyx3QkFBb0JiLFNBQVNhLGtCQWJzRTtB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QTFCLEVBQW9DLE1BQXBDLEVBQTRDa0QsT0FBNUMsQ0FBb0QsS0FBcEQsQ0FBaEI7O0FBRUEsVUFBTUMsY0FBWVAsUUFBWixhQUE0QixrQkFBUVEsbUJBQVIsQ0FBNEJMLFFBQVFNLE1BQVIsRUFBNUIsQ0FBNUIsY0FBa0ZULFFBQWxGLGFBQWtHRyxRQUFRTyxNQUFSLENBQWUsd0JBQWYsQ0FBbEcsUUFBTjtBQUNBLGFBQU9ILEtBQVA7QUFDRDtBQTlOa0csR0FBckYsQ0FBaEI7QUFnT0EsTUFBTUksTUFBTSxrQ0FBWjtBQUNBQSxNQUFJQyxZQUFKLENBQWlCLCtCQUFqQixFQUFrRHJGLE9BQWxEO0FBQ0EsaUJBQUtzRixTQUFMLENBQWUseUNBQWYsRUFBMER0RixPQUExRDtvQkFDZUEsTyIsImZpbGUiOiJPcGVuRGFzaGJvYXJkV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IGNvbnZlcnQgZnJvbSAnYXJnb3MvQ29udmVydCc7XHJcbmltcG9ydCBSZWxhdGVkVmlld01hbmFnZXIgZnJvbSAnYXJnb3MvUmVsYXRlZFZpZXdNYW5hZ2VyJztcclxuaW1wb3J0IERhc2hib2FyZFdpZGdldCBmcm9tICcuLi8uLi9EYXNoYm9hcmRXaWRnZXQnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnY3JtL0Zvcm1hdCc7XHJcbmltcG9ydCBhZ2dyZWdhdGUgZnJvbSAnY3JtL0FnZ3JlZ2F0ZSc7XHJcblxyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnb3BlbkRhc2hib2FyZFdpZGdldCcpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLkFjY291bnQuT3BlbkRhc2hib2FyZFdpZGdldCcsIFtEYXNoYm9hcmRXaWRnZXRdLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgb3BlblNhbGVzT3JkZXJzVGV4dDogcmVzb3VyY2Uub3BlblNhbGVzT3JkZXJzVGV4dCxcclxuICBvcGVuUXVvdGVzVGV4dDogcmVzb3VyY2Uub3BlblF1b3Rlc1RleHQsXHJcbiAgb3V0c3RhbmRpbmdJbnZvaWNlc1RleHQ6IHJlc291cmNlLm91dHN0YW5kaW5nSW52b2ljZXNUZXh0LFxyXG4gIGxhdGVJbnZvaWNlc1RleHQ6IHJlc291cmNlLmxhdGVJbnZvaWNlc1RleHQsXHJcbiAgbGF0ZVNhbGVzT3JkZXJzVGV4dDogcmVzb3VyY2UubGF0ZVNhbGVzT3JkZXJzVGV4dCxcclxuICBhZ2luZ0ludm9pY2VzVGV4dDogcmVzb3VyY2UuYWdpbmdJbnZvaWNlc1RleHQsXHJcbiAgYWdpbmdTYWxlc09yZGVyc1RleHQ6IHJlc291cmNlLmFnaW5nU2FsZXNPcmRlcnNUZXh0LFxyXG4gIGFnaW5nUXVvdGVzVGV4dDogcmVzb3VyY2UuYWdpbmdRdW90ZXNUZXh0LFxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIGNhdGVnb3J5VGV4dDogcmVzb3VyY2UuY2F0ZWdvcnlUZXh0LFxyXG4gIHF1b3Rlc1RvdGFsaW5nVGV4dDogcmVzb3VyY2UucXVvdGVzVG90YWxpbmdUZXh0LFxyXG4gIG9yZGVyc1RvdGFsaW5nVGV4dDogcmVzb3VyY2Uub3JkZXJzVG90YWxpbmdUZXh0LFxyXG4gIGludm9pY2VzVG90YWxpbmdUZXh0OiByZXNvdXJjZS5pbnZvaWNlc1RvdGFsaW5nVGV4dCxcclxuXHJcbiAgLy8gY3JtIHN0YXR1cyBmb3IgU2FsZXNPcmRlclxyXG4gIG9wZW5PcmRlclRleHQ6IHJlc291cmNlLm9wZW5PcmRlclRleHQsXHJcbiAgc2FsZXNPcmRlclRleHQ6IHJlc291cmNlLnNhbGVzT3JkZXJUZXh0LFxyXG4gIHNhbGVzSG9sZFRleHQ6IHJlc291cmNlLnNhbGVzSG9sZFRleHQsXHJcbiAgY3JlZGl0SG9sZFRleHQ6IHJlc291cmNlLmNyZWRpdEhvbGRUZXh0LFxyXG4gIGFkbWluSG9sZFRleHQ6IHJlc291cmNlLmFkbWluSG9sZFRleHQsXHJcbiAgaG9sZFRleHQ6IHJlc291cmNlLmhvbGRUZXh0LFxyXG4gIG9yZGVyZWRUZXh0OiByZXNvdXJjZS5vcmRlcmVkVGV4dCxcclxuICBwYXJ0aWFsbHlTaGlwcGVkVGV4dDogcmVzb3VyY2UucGFydGlhbGx5U2hpcHBlZFRleHQsXHJcbiAgcGVuZGluZ1RleHQ6IHJlc291cmNlLnBlbmRpbmdUZXh0LFxyXG4gIG5ld1RleHQ6IHJlc291cmNlLm5ld1RleHQsXHJcbiAgb3BlblRleHQ6IHJlc291cmNlLm9wZW5UZXh0LFxyXG4gIGFwcHJvdmVkVGV4dDogcmVzb3VyY2UuYXBwcm92ZWRUZXh0LFxyXG4gIGF3YXJkZWRUZXh0OiByZXNvdXJjZS5hd2FyZGVkVGV4dCxcclxuICAvLyBPdmVycmlkZSB2YXJpYWJsZXMgZm9yIF9EYXNoYm9hcmRXaWRnZXRCYXNlXHJcbiAgY29sb3I6ICcjMzEzMjM2JyxcclxuICBzZWxlY3RlZENvbG9yOiAnIzUwNTM1YScsXHJcbiAgZGF5VmFsdWU6IDAsXHJcblxyXG4gIC8vIENvZGVzIHVzZWQgZm9yIHRoZSBzdGF0dXMgb2YgdGhlIGVudGl0eVxyXG4gIG5ld0NvZGU6ICdOZXcnLFxyXG4gIG9wZW5Db2RlOiAnT3BlbicsXHJcbiAgYXBwcm92ZWRDb2RlOiAnQXBwcm92ZWQnLFxyXG4gIHdvcmtpbmdDb2RlOiAnV29ya2luZycsXHJcbiAgcGFydGlhbFNoaXBDb2RlOiAnUGFydGlhbGx5U2hpcHBlZCcsXHJcbiAgcGFydGlhbFBhaWRDb2RlOiAnUGFydGlhbFBhaWQnLFxyXG4gIGNsb3NlZENvZGU6ICdDbG9zZWQnLFxyXG4gIGRpc3B1dGVDb2RlOiAnRGlzcHV0ZScsXHJcbiAgaG9sZENvZGU6ICdIb2xkJyxcclxuICBwZW5kaW5nQ29kZTogJ1BlbmRpbmcnLFxyXG5cclxuICAvLyBWYWx1ZXMgZm9yIHRoZSBtZXRyaWNzXHJcbiAgdmFsdWVzOiBbe1xyXG4gICAgbmFtZTogJ3F1b3RlcycsXHJcbiAgICBhZ2dyZWdhdGU6ICdzdW0nLFxyXG4gICAgYWdncmVnYXRlTW9kdWxlOiBhZ2dyZWdhdGUsXHJcbiAgICB2YWx1ZTogbnVsbCxcclxuICAgIHF1ZXJ5SW5kZXg6IDAsXHJcbiAgICBjb3VudDogdHJ1ZSxcclxuICAgIGRhdGVEZXBlbmRlbnQ6IHRydWUsXHJcbiAgfSwge1xyXG4gICAgbmFtZTogJ2ludm9pY2VzJyxcclxuICAgIGFnZ3JlZ2F0ZTogJ3N1bScsXHJcbiAgICBhZ2dyZWdhdGVNb2R1bGU6IGFnZ3JlZ2F0ZSxcclxuICAgIHZhbHVlOiBudWxsLFxyXG4gICAgcXVlcnlJbmRleDogMSxcclxuICAgIGNvdW50OiB0cnVlLFxyXG4gICAgZGF0ZURlcGVuZGVudDogdHJ1ZSxcclxuICB9LCB7XHJcbiAgICBuYW1lOiAnc2FsZXNPcmRlcnMnLFxyXG4gICAgYWdncmVnYXRlOiAnc3VtJyxcclxuICAgIGFnZ3JlZ2F0ZU1vZHVsZTogYWdncmVnYXRlLFxyXG4gICAgdmFsdWU6IG51bGwsXHJcbiAgICBxdWVyeUluZGV4OiAyLFxyXG4gICAgY291bnQ6IHRydWUsXHJcbiAgICBkYXRlRGVwZW5kZW50OiBmYWxzZSxcclxuICB9XSxcclxuXHJcbiAgcmVzb3VyY2VLaW5kOiAnYWNjb3VudHMnLFxyXG4gIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAnQWNjb3VudE5hbWUnLFxyXG4gIF0sXHJcbiAgZ2V0V2hlcmU6IGZ1bmN0aW9uIGdldFdoZXJlKCkge1xyXG4gICAgcmV0dXJuIGBJZCBlcSAnJHt0aGlzLnBhcmVudEVudHJ5LiRrZXl9J2A7XHJcbiAgfSxcclxuICAvLyBDcmVhdGVzIHRoZSByYW5nZSB3aWRnZXRzLCB2YWx1ZSBjYW4gaGF2ZSB2YWx1ZVVuaXQgdG8gYXBwbHkgbmV4dCB0byB0aGUgbnVtYmVyXHJcbiAgY3JlYXRlUmFuZ2VMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZVJhbmdlTGF5b3V0KCkge1xyXG4gICAgY29uc3QgcmFuZ2VMYXlvdXQgPSBbe1xyXG4gICAgICB2YWx1ZTogMCxcclxuICAgICAgdmFsdWVVbml0OiAnKycsXHJcbiAgICB9LCB7XHJcbiAgICAgIHZhbHVlOiAzMCxcclxuICAgICAgdmFsdWVVbml0OiAnKycsXHJcbiAgICB9LCB7XHJcbiAgICAgIHZhbHVlOiA2MCxcclxuICAgICAgdmFsdWVVbml0OiAnKycsXHJcbiAgICB9LCB7XHJcbiAgICAgIHZhbHVlOiA5MCxcclxuICAgICAgdmFsdWVVbml0OiAnKycsXHJcbiAgICB9LCB7XHJcbiAgICAgIHZhbHVlOiAxODAsXHJcbiAgICAgIHZhbHVlVW5pdDogJysnLFxyXG4gICAgfV07XHJcbiAgICByZXR1cm4gcmFuZ2VMYXlvdXQ7XHJcbiAgfSxcclxuICBjcmVhdGVNZXRyaWNMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZU1ldHJpY0xheW91dChlbnRyeSkge1xyXG4gICAgdGhpcy5zZXRRdWVyeUFyZ3MoZW50cnkpO1xyXG5cclxuICAgIGNvbnN0IG1ldHJpY0xheW91dCA9IFt7XHJcbiAgICAgIG5hdlRvOiAnYWNjb3VudF9vcGVucXVvdGVzX3JlbGF0ZWQnLFxyXG4gICAgICBmb3JtYXR0ZXI6ICdiaWdOdW1iZXInLFxyXG4gICAgICBmb3JtYXR0ZXJNb2R1bGU6IGZvcm1hdCxcclxuICAgICAgdGl0bGU6IHRoaXMuYWdpbmdRdW90ZXNUZXh0LFxyXG4gICAgICBjb3VudFRpdGxlOiB0aGlzLnF1b3Rlc1RvdGFsaW5nVGV4dCxcclxuICAgICAgdmFsdWVOZWVkZWQ6ICdxdW90ZXMnLFxyXG4gICAgfSwge1xyXG4gICAgICBuYXZUbzogJ2FjY291bnRfbGF0ZWludm9pY2VfcmVsYXRlZCcsXHJcbiAgICAgIGZvcm1hdHRlcjogJ2JpZ051bWJlcicsXHJcbiAgICAgIGZvcm1hdHRlck1vZHVsZTogZm9ybWF0LFxyXG4gICAgICB0aXRsZTogdGhpcy5hZ2luZ0ludm9pY2VzVGV4dCxcclxuICAgICAgY291bnRUaXRsZTogdGhpcy5pbnZvaWNlc1RvdGFsaW5nVGV4dCxcclxuICAgICAgdmFsdWVOZWVkZWQ6ICdpbnZvaWNlcycsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hdlRvOiAnYWNjb3VudF9vcGVuc2FsZXNvcmRlcnNfcmVsYXRlZCcsXHJcbiAgICAgIGZvcm1hdHRlcjogJ2JpZ051bWJlcicsXHJcbiAgICAgIGZvcm1hdHRlck1vZHVsZTogZm9ybWF0LFxyXG4gICAgICB0aXRsZTogdGhpcy5hZ2luZ1NhbGVzT3JkZXJzVGV4dCxcclxuICAgICAgY291bnRUaXRsZTogdGhpcy5vcmRlcnNUb3RhbGluZ1RleHQsXHJcbiAgICAgIHZhbHVlTmVlZGVkOiAnc2FsZXNPcmRlcnMnLFxyXG4gICAgfV07XHJcblxyXG4gICAgcmV0dXJuIG1ldHJpY0xheW91dDtcclxuICB9LFxyXG4gIHNldFF1ZXJ5QXJnczogZnVuY3Rpb24gc2V0UXVlcnlBcmdzKGVudHJ5KSB7XHJcbiAgICB0aGlzLnF1ZXJ5QXJncyA9IFtdO1xyXG5cclxuICAgIHRoaXMucXVlcnlBcmdzLnB1c2goW1xyXG4gICAgICAncXVvdGVzJyxcclxuICAgICAge1xyXG4gICAgICAgIF9hY3RpdmVGaWx0ZXI6IGBBY2NvdW50LklkIGVxIFwiJHtlbnRyeS4ka2V5fVwiIGFuZCBgICtcclxuICAgICAgICAgICAgICAgICcoJyArXHJcbiAgICAgICAgICAgICAgICAgICcoJyArXHJcbiAgICAgICAgICAgICAgICAgICAgJyhFcnBFeHRJZCBuZSBudWxsKSBhbmQgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgYChFcnBTdGF0dXMgZXEgXCIke3RoaXMub3BlbkNvZGV9XCJgICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYCBvciBFcnBTdGF0dXMgZXEgXCIke3RoaXMucGVuZGluZ0NvZGV9XCJgICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYCBvciBFcnBTdGF0dXMgZXEgXCIke3RoaXMuYXBwcm92ZWRDb2RlfVwiYCArXHJcbiAgICAgICAgICAgICAgICAgICAgIGApIGFuZCAoJHt0aGlzLnBhc3REYXlzKCdEb2N1bWVudERhdGUnKX0pYCArXHJcbiAgICAgICAgICAgICAgICAgICcpJyArXHJcbiAgICAgICAgICAgICAgICAgICcgb3IgJyArXHJcbiAgICAgICAgICAgICAgICAgICcoJyArXHJcbiAgICAgICAgICAgICAgICAgICAgJyhFcnBFeHRJZCBlcSBudWxsKSBhbmQgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICBgKFN0YXR1cyBlcSBcIiR7dGhpcy5uZXdUZXh0fVwiYCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgYCBvciBTdGF0dXMgZXEgXCIke3RoaXMub3BlblRleHR9XCJgICtcclxuICAgICAgICAgICAgICAgICAgICAgICBgIG9yIFN0YXR1cyBlcSBcIiR7dGhpcy5hcHByb3ZlZFRleHR9XCJgICtcclxuICAgICAgICAgICAgICAgICAgICAgICBgIG9yIFN0YXR1cyBlcSBcIiR7dGhpcy5wZW5kaW5nVGV4dH1cImAgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGAgb3IgU3RhdHVzIGVxIFwiJHt0aGlzLmF3YXJkZWRUZXh0fVwiYCArXHJcbiAgICAgICAgICAgICAgICAgICAgICBgKSBhbmQgKCR7dGhpcy5wYXN0RGF5cygnU3RhcnREYXRlJyl9KWAgK1xyXG4gICAgICAgICAgICAgICAgICAnKScgK1xyXG4gICAgICAgICAgICAgICAgJyknLFxyXG4gICAgICAgIF9maWx0ZXJOYW1lOiAnQWNjb3VudE1hbmFnZXInLFxyXG4gICAgICAgIF9tZXRyaWNOYW1lOiAnU3VtR3JhbmRUb3RhbCcsXHJcbiAgICAgIH0sXHJcbiAgICBdLCBbXHJcbiAgICAgICdlcnBJbnZvaWNlcycsXHJcbiAgICAgIHtcclxuICAgICAgICBfYWN0aXZlRmlsdGVyOiBgQWNjb3VudC5JZCBlcSBcIiR7ZW50cnkuJGtleX1cIiBhbmQgYCArXHJcbiAgICAgICAgICAgJygnICtcclxuICAgICAgICAgICAgYChFcnBTdGF0dXMgZXEgXCIke3RoaXMub3BlbkNvZGV9XCJgICtcclxuICAgICAgICAgICAgICBgIG9yIEVycFN0YXR1cyBlcSBcIiR7dGhpcy5wYXJ0aWFsUGFpZENvZGV9XCJgICtcclxuICAgICAgICAgICAgICBgIG9yIEVycFN0YXR1cyBlcSBcIiR7dGhpcy5kaXNwdXRlQ29kZX1cImAgK1xyXG4gICAgICAgICAgICAgJyknICtcclxuICAgICAgICAgICBgKSBhbmQgJHt0aGlzLnBhc3REYXlzKCdFcnBEb2N1bWVudERhdGUnKX1gLFxyXG4gICAgICAgIF9maWx0ZXJOYW1lOiAnRXJwU3RhdHVzJyxcclxuICAgICAgICBfbWV0cmljTmFtZTogJ1N1bUdyYW5kVG90YWwnLFxyXG4gICAgICB9LFxyXG4gICAgXSwgW1xyXG4gICAgICAnc2FsZXNPcmRlcnMnLFxyXG4gICAgICB7XHJcbiAgICAgICAgX2FjdGl2ZUZpbHRlcjogYEFjY291bnQuSWQgZXEgXCIke2VudHJ5LiRrZXl9XCIgYW5kIGAgK1xyXG4gICAgICAgICAgICcoJyArXHJcbiAgICAgICAgICAgICAnKCcgK1xyXG4gICAgICAgICAgICAgICAnKEVycEV4dElkIG5lIG51bGwpIGFuZCAnICtcclxuICAgICAgICAgICAgICAgJygnICtcclxuICAgICAgICAgICAgICAgICBgKEVSUFNhbGVzT3JkZXIuRVJQU3RhdHVzIGVxIFwiJHt0aGlzLm9wZW5Db2RlfVwiYCArXHJcbiAgICAgICAgICAgICAgICAgIGAgb3IgRVJQU2FsZXNPcmRlci5FUlBTdGF0dXMgZXEgXCIke3RoaXMuaG9sZENvZGV9XCJgICtcclxuICAgICAgICAgICAgICAgICAgYCBvciBFUlBTYWxlc09yZGVyLkVSUFN0YXR1cyBlcSBcIiR7dGhpcy5wYXJ0aWFsU2hpcENvZGV9XCJgICtcclxuICAgICAgICAgICAgICAgICAgYCBvciBFUlBTYWxlc09yZGVyLkVSUFN0YXR1cyBlcSBcIiR7dGhpcy5hcHByb3ZlZENvZGV9XCJgICtcclxuICAgICAgICAgICAgICAgICBgKSBhbmQgJHt0aGlzLnBhc3REYXlzKCdFcnBEb2N1bWVudERhdGUnKSAvLyAnIGFuZCAnICtcclxuICAgICAgICAgICAgICAgICAvLyAnKFNhbGVzT3JkZXJJdGVtcy5FcnBTdGF0dXMgZXEgXCInICsgdGhpcy5vcGVuQ29kZSArICdcIicgKyAvLyBUaGlzIGRvZXMgbm90IHdvcmsgc2luY2UgaXQgY3JlYXRlcyBhIGNhcnRlc2lvbiBkdXBsaWNhdGUgcmVzdWx0IGZvciBlYWNoIGxpbmVcclxuICAgICAgICAgICAgICAgICAvLyAgICAnIG9yIFNhbGVzT3JkZXJJdGVtcy5FcnBTdGF0dXMgZXEgXCInICsgdGhpcy5wYXJ0aWFsU2hpcENvZGUgKyAnXCInICtcclxuICAgICAgICAgICAgICAgICAvLyAgICAnIG9yIFNhbGVzT3JkZXJJdGVtcy5FcnBTdGF0dXMgZXEgXCInICsgdGhpcy5ob2xkQ29kZSArICdcIicgK1xyXG4gICAgICAgICAgICAgICAgIC8vICAnKSBhbmQgJyArXHJcbiAgICAgICAgICAgICAgICAgLy8gIHRoaXMucGFzdERheXMoJ1NhbGVzT3JkZXJJdGVtcy5FcnBSZXF1aXJlZERlbGl2ZXJ5RGF0ZScpICtcclxuICAgICAgICAgICAgICAgICB9KWAgK1xyXG4gICAgICAgICAgICAgJykgb3IgJyArXHJcbiAgICAgICAgICAgICAnKChFcnBFeHRJZCBlcSBudWxsKSBhbmQgJyArXHJcbiAgICAgICAgICAgICBgKFN0YXR1cyBlcSBcIiR7dGhpcy5vcGVuT3JkZXJUZXh0fVwiYCArXHJcbiAgICAgICAgICAgICBgIG9yIFN0YXR1cyBlcSBcIiR7dGhpcy5zYWxlc09yZGVyVGV4dH1cImAgK1xyXG4gICAgICAgICAgICAgYCBvciBTdGF0dXMgZXEgXCIke3RoaXMuc2FsZXNIb2xkVGV4dH1cImAgK1xyXG4gICAgICAgICAgICAgYCBvciBTdGF0dXMgZXEgXCIke3RoaXMuY3JlZGl0SG9sZFRleHR9XCJgICtcclxuICAgICAgICAgICAgIGAgb3IgU3RhdHVzIGVxIFwiJHt0aGlzLmFkbWluSG9sZFRleHR9XCJgICtcclxuICAgICAgICAgICAgIGAgb3IgU3RhdHVzIGVxIFwiJHt0aGlzLmhvbGRUZXh0fVwiYCArXHJcbiAgICAgICAgICAgICBgIG9yIFN0YXR1cyBlcSBcIiR7dGhpcy5vcmRlcmVkVGV4dH1cImAgK1xyXG4gICAgICAgICAgICAgYCBvciBTdGF0dXMgZXEgXCIke3RoaXMucGFydGlhbGx5U2hpcHBlZFRleHR9XCJgICtcclxuICAgICAgICAgICAgIGAgb3IgU3RhdHVzIGVxIFwiJHt0aGlzLnBlbmRpbmdUZXh0fVwiYCArXHJcbiAgICAgICAgICAgICBgKSBhbmQgKCR7dGhpcy5wYXN0RGF5cygnT3JkZXJEYXRlJyl9KWAgK1xyXG4gICAgICAgICAgICAgJyknICtcclxuICAgICAgICAgICAnKScsXHJcbiAgICAgICAgX2ZpbHRlck5hbWU6ICdBY2NvdW50TWFuYWdlcicsXHJcbiAgICAgICAgX21ldHJpY05hbWU6ICdTdW1HcmFuZFRvdGFsJyxcclxuICAgICAgfSxcclxuICAgIF0pO1xyXG4gICAgdGhpcy5zZXRDb3VudFRpdGxlcygpO1xyXG4gIH0sXHJcbiAgc2V0Q291bnRUaXRsZXM6IGZ1bmN0aW9uIHNldENvdW50VGl0bGVzKCkge1xyXG4gIH0sXHJcbiAgcGFzdERheXM6IGZ1bmN0aW9uIHBhc3REYXlzKHByb3BlcnR5KSB7XHJcbiAgICBjb25zdCBub3cgPSBtb21lbnQoKTtcclxuXHJcbiAgICBpZiAodGhpcy5kYXlWYWx1ZSA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gJzEgZXEgMSc7XHJcbiAgICB9XHJcbiAgICBjb25zdCBwYXN0RGF5ID0gbm93LmNsb25lKCkuc3VidHJhY3QodGhpcy5kYXlWYWx1ZSwgJ2RheXMnKS5zdGFydE9mKCdkYXknKTtcclxuXHJcbiAgICBjb25zdCBxdWVyeSA9IGAoJHtwcm9wZXJ0eX0gbHQgQCR7Y29udmVydC50b0lzb1N0cmluZ0Zyb21EYXRlKHBhc3REYXkudG9EYXRlKCkpfUAgb3IgKCR7cHJvcGVydHl9IGx0IEAke3Bhc3REYXkuZm9ybWF0KCdZWVlZLU1NLUREVDAwOjAwOjAwW1pdJyl9QCkpYDtcclxuICAgIHJldHVybiBxdWVyeTtcclxuICB9LFxyXG59KTtcclxuY29uc3QgcnZtID0gbmV3IFJlbGF0ZWRWaWV3TWFuYWdlcigpO1xyXG5ydm0ucmVnaXN0ZXJUeXBlKCdhY2NvdW50X29wZW5fZGFzaGJvYXJkX3dpZGdldCcsIF9fY2xhc3MpO1xyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuVmlld3MuQWNjb3VudC5PcGVuRGFzaGJvYXJkV2lkZ2V0JywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==