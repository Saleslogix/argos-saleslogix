define('crm/Integrations/BOE/Views/Account/NewDashboardWidget', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Convert', 'argos/RelatedViewManager', '../../DashboardWidget', 'argos/I18n', 'crm/Format', 'crm/Aggregate'], function (module, exports, _declare, _lang, _Convert, _RelatedViewManager, _DashboardWidget, _I18n, _Format, _Aggregate) {
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

  var resource = (0, _I18n2.default)('newDashboardWidget');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.Account.NewDashboardWidget', [_DashboardWidget2.default], {
    // Localization
    newQuotesText: resource.newQuotesText,
    newOrdersText: resource.newOrdersText,
    newShipmentsText: resource.newShipmentsText,
    newInvoicesText: resource.newInvoicesText,
    newReceivablesText: resource.newReceivablesText,
    titleText: resource.titleText,
    categoryText: resource.categoryText,
    quotesTotalingText: resource.quotesTotalingText,
    ordersTotalingText: resource.ordersTotalingText,
    shipmentsTotalingText: resource.shipmentsTotalingText,
    invoicesTotalingText: resource.invoicesTotalingText,
    receivablesTotalingText: resource.receivablesTotalingText,

    // Override variables for _DashboardWidgetBase
    color: '#313236',
    selectedColor: '#50535a',
    dayValue: 7,

    // crm status for SalesOrder
    closedText: resource.closedText,
    deletedText: resource.deletedText,
    replacedText: resource.replacedText,
    canceledText: resource.canceledText,
    unapprovedText: resource.unapprovedText,

    // Codes used for the status of the entity
    openCode: 'New',
    closedCode: 'Closed',
    replacedCode: 'Replaced',
    cancledCode: 'Canceled',
    deletedCode: 'Deleted',
    voidCode: 'Void',
    proformaCode: 'Proforma',
    unapprovedCode: 'Unapproved',
    holdCode: 'Hold',
    disputeCode: 'Dispute',
    writeOffCode: 'WriteOff',

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
      name: 'salesOrders',
      aggregate: 'sum',
      aggregateModule: _Aggregate2.default,
      value: null,
      queryIndex: 1,
      count: true,
      dateDependent: true
    }, {
      name: 'shipments',
      aggregate: 'sum',
      aggregateModule: _Aggregate2.default,
      value: null,
      queryIndex: 2,
      count: true,
      dateDependent: true
    }, {
      name: 'invoices',
      aggregate: 'sum',
      aggregateModule: _Aggregate2.default,
      value: null,
      queryIndex: 3,
      count: true,
      dateDependent: true
    }, {
      name: 'receivables',
      aggregate: 'sum',
      aggregateModule: _Aggregate2.default,
      value: null,
      queryIndex: 4,
      count: true,
      dateDependent: false
    }],

    resourceKind: 'accounts',
    querySelect: ['AccountName'],
    queryArgs: null,
    getWhere: function getWhere() {
      return 'Id eq \'' + this.parentEntry.$key + '\'';
    },
    // Creates the range widgets, timespan is based on three categories: d - day, m - month, y - year
    createRangeLayout: function createRangeLayout() {
      var rangeLayout = [{
        value: 7
      }, {
        value: 14
      }, {
        value: 30
      }, {
        value: 90
      }];
      return rangeLayout;
    },
    createMetricLayout: function createMetricLayout(entry) {
      this.setQueryArgs(entry);

      var metricLayout = [{
        navTo: 'account_newquotes_related',
        formatter: 'bigNumber',
        formatterModule: _Format2.default,
        title: this.newQuotesText,
        countTitle: this.quotesTotalingText,
        valueNeeded: 'quotes'
      }, {
        navTo: 'account_neworders_related',
        formatter: 'bigNumber',
        formatterModule: _Format2.default,
        title: this.newOrdersText,
        countTitle: this.ordersTotalingText,
        valueNeeded: 'salesOrders'
      }, {
        navTo: 'account_newerpshipments_related',
        formatter: 'bigNumber',
        formatterModule: _Format2.default,
        title: this.newShipmentsText,
        countTitle: this.shipmentsTotalingText,
        valueNeeded: 'shipments'
      }, {
        navTo: 'account_newerpinvoice_related',
        formatter: 'bigNumber',
        formatterModule: _Format2.default,
        title: this.newInvoicesText,
        countTitle: this.invoicesTotalingText,
        valueNeeded: 'invoices'
      }, {
        navTo: 'account_newerpreceivables_related',
        formatter: 'bigNumber',
        formatterModule: _Format2.default,
        title: this.newReceivablesText,
        countTitle: this.receivablesTotalingText,
        valueNeeded: 'receivables'
      }];

      return metricLayout;
    },
    setQueryArgs: function setQueryArgs(entry) {
      this.queryArgs = [];

      this.queryArgs.push(['quotes', {
        _activeFilter: 'Account.Id eq "' + entry.$key + '" and' + '(' + '((ErpExtId ne null) and ' + ('(ErpStatus ne "' + this.replacedCode + '") and ') + ('(ErpStatus ne "' + this.cancledCode + '") and ') + ('(ErpStatus ne "' + this.deletedCode + '") and ') + ('(' + this.pastDays('DocumentDate') + ')') + ')' + ' or ' + '((ErpExtId eq null) and ' + '(' + ('(Status ne "' + this.closedText + '") and ') + ('(Status ne "' + this.cancledText + '") and ') + ('(Status ne "' + this.replacedText + '") and ') + ('(Status ne "' + this.deletedText + '") and ') + ('(Status ne "' + this.unapprovedText + '") and ') + ('(' + this.pastDays('StartDate') + ')') + ')' + ')' + ')',
        _filterName: 'AccountManager',
        _metricName: 'SumGrandTotal'
      }], ['salesOrders', {
        _activeFilter: 'Account.Id eq "' + entry.$key + '" and IsQuote eq false and ' + '(' + '((ErpExtId ne null) and ' + ('(ERPSalesOrder.ERPStatus ne "' + this.cancledCode + '") and ') + ('(ERPSalesOrder.ERPStatus ne "' + this.deletedCode + '") and ') + ('(ERPSalesOrder.ERPStatus ne "' + this.unapprovedCode + '") and ') + ('(' + this.pastDays('ErpDocumentDate') + ')') + ')' + ' or ' + '((ErpExtId eq null) and ' + ('(Status ne "' + this.closedText + '") and ') + ('(Status ne "' + this.cancledText + '") and ') + ('(Status ne "' + this.deletedText + '") and ') + ('(Status ne "' + this.replacedText + '") and ') + ('(Status ne "' + this.unapprovedText + '") and ') + ('(' + this.pastDays('OrderDate') + ')') + ')' + ')',
        _filterName: 'AccountManager',
        _metricName: 'SumGrandTotal'
      }], ['erpShipments', {
        _activeFilter: 'Account.Id eq "' + entry.$key + '" and ' + ('ErpStatus ne "' + this.cancledCode + '" and ') + ('ErpStatus ne "' + this.deletedCode + '" and ') + ('ErpStatus ne "' + this.holdCode + '" and ' + this.pastDays('ErpDocumentDate')),
        _filterName: 'ERPStatus',
        _metricName: 'SumTotalAmount'
      }], ['erpInvoices', {
        _activeFilter: 'Account.Id eq "' + entry.$key + '" and ' + ('ErpStatus ne "' + this.proformaCode + '" and ') + ('ErpStatus ne "' + this.voidCode + '" and ') + ('ErpStatus ne "' + this.disputeCode + '" and ') + ('ErpStatus ne "' + this.writeOffCode + '" and ' + this.pastDays('ErpDocumentDate')),
        _filterName: 'ErpStatus',
        _metricName: 'SumGrandTotal'
      }], ['erpReceivables', {
        _activeFilter: 'Account.Id eq "' + entry.$key + '" and ErpStatus ne "' + this.voidCode + '" and ' + this.pastDays('ErpDocumentDate'),
        _filterName: 'ErpStatus',
        _metricName: 'SumGrandTotal'
      }]);

      this.setCountTitles();
    },
    setCountTitles: function setCountTitles() {},
    pastDays: function pastDays(property) {
      var now = moment();

      var pastWeekStart = now.clone().subtract(this.dayValue, 'days').startOf('day');
      var today = now.clone().endOf('day');

      var query = '((' + property + ' between @' + _Convert2.default.toIsoStringFromDate(pastWeekStart.toDate()) + '@ and @' + _Convert2.default.toIsoStringFromDate(today.toDate()) + '@) or (' + property + ' between @' + pastWeekStart.format('YYYY-MM-DDT00:00:00[Z]') + '@ and @' + today.format('YYYY-MM-DDT23:59:59[Z]') + '@))';
      return query;
    }
  });
  var rvm = new _RelatedViewManager2.default();
  rvm.registerType('account_new_dashboard_widget', __class);
  _lang2.default.setObject('icboe.Views.Account.NewDashboardWidget', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0FjY291bnQvTmV3RGFzaGJvYXJkV2lkZ2V0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsIm5ld1F1b3Rlc1RleHQiLCJuZXdPcmRlcnNUZXh0IiwibmV3U2hpcG1lbnRzVGV4dCIsIm5ld0ludm9pY2VzVGV4dCIsIm5ld1JlY2VpdmFibGVzVGV4dCIsInRpdGxlVGV4dCIsImNhdGVnb3J5VGV4dCIsInF1b3Rlc1RvdGFsaW5nVGV4dCIsIm9yZGVyc1RvdGFsaW5nVGV4dCIsInNoaXBtZW50c1RvdGFsaW5nVGV4dCIsImludm9pY2VzVG90YWxpbmdUZXh0IiwicmVjZWl2YWJsZXNUb3RhbGluZ1RleHQiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJkYXlWYWx1ZSIsImNsb3NlZFRleHQiLCJkZWxldGVkVGV4dCIsInJlcGxhY2VkVGV4dCIsImNhbmNlbGVkVGV4dCIsInVuYXBwcm92ZWRUZXh0Iiwib3BlbkNvZGUiLCJjbG9zZWRDb2RlIiwicmVwbGFjZWRDb2RlIiwiY2FuY2xlZENvZGUiLCJkZWxldGVkQ29kZSIsInZvaWRDb2RlIiwicHJvZm9ybWFDb2RlIiwidW5hcHByb3ZlZENvZGUiLCJob2xkQ29kZSIsImRpc3B1dGVDb2RlIiwid3JpdGVPZmZDb2RlIiwidmFsdWVzIiwibmFtZSIsImFnZ3JlZ2F0ZSIsImFnZ3JlZ2F0ZU1vZHVsZSIsInZhbHVlIiwicXVlcnlJbmRleCIsImNvdW50IiwiZGF0ZURlcGVuZGVudCIsInJlc291cmNlS2luZCIsInF1ZXJ5U2VsZWN0IiwicXVlcnlBcmdzIiwiZ2V0V2hlcmUiLCJwYXJlbnRFbnRyeSIsIiRrZXkiLCJjcmVhdGVSYW5nZUxheW91dCIsInJhbmdlTGF5b3V0IiwiY3JlYXRlTWV0cmljTGF5b3V0IiwiZW50cnkiLCJzZXRRdWVyeUFyZ3MiLCJtZXRyaWNMYXlvdXQiLCJuYXZUbyIsImZvcm1hdHRlciIsImZvcm1hdHRlck1vZHVsZSIsInRpdGxlIiwiY291bnRUaXRsZSIsInZhbHVlTmVlZGVkIiwicHVzaCIsIl9hY3RpdmVGaWx0ZXIiLCJwYXN0RGF5cyIsImNhbmNsZWRUZXh0IiwiX2ZpbHRlck5hbWUiLCJfbWV0cmljTmFtZSIsInNldENvdW50VGl0bGVzIiwicHJvcGVydHkiLCJub3ciLCJtb21lbnQiLCJwYXN0V2Vla1N0YXJ0IiwiY2xvbmUiLCJzdWJ0cmFjdCIsInN0YXJ0T2YiLCJ0b2RheSIsImVuZE9mIiwicXVlcnkiLCJ0b0lzb1N0cmluZ0Zyb21EYXRlIiwidG9EYXRlIiwiZm9ybWF0IiwicnZtIiwicmVnaXN0ZXJUeXBlIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLE1BQU1BLFdBQVcsb0JBQVksb0JBQVosQ0FBakI7O0FBRUEsTUFBTUMsVUFBVSx1QkFBUSx1REFBUixFQUFpRSwyQkFBakUsRUFBb0Y7QUFDbEc7QUFDQUMsbUJBQWVGLFNBQVNFLGFBRjBFO0FBR2xHQyxtQkFBZUgsU0FBU0csYUFIMEU7QUFJbEdDLHNCQUFrQkosU0FBU0ksZ0JBSnVFO0FBS2xHQyxxQkFBaUJMLFNBQVNLLGVBTHdFO0FBTWxHQyx3QkFBb0JOLFNBQVNNLGtCQU5xRTtBQU9sR0MsZUFBV1AsU0FBU08sU0FQOEU7QUFRbEdDLGtCQUFjUixTQUFTUSxZQVIyRTtBQVNsR0Msd0JBQW9CVCxTQUFTUyxrQkFUcUU7QUFVbEdDLHdCQUFvQlYsU0FBU1Usa0JBVnFFO0FBV2xHQywyQkFBdUJYLFNBQVNXLHFCQVhrRTtBQVlsR0MsMEJBQXNCWixTQUFTWSxvQkFabUU7QUFhbEdDLDZCQUF5QmIsU0FBU2EsdUJBYmdFOztBQWVsRztBQUNBQyxXQUFPLFNBaEIyRjtBQWlCbEdDLG1CQUFlLFNBakJtRjtBQWtCbEdDLGNBQVUsQ0FsQndGOztBQW9CbEc7QUFDQUMsZ0JBQVlqQixTQUFTaUIsVUFyQjZFO0FBc0JsR0MsaUJBQWFs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QWdCLFNBQVNBLGNBQVQsR0FBMEIsQ0FDekMsQ0ExT2lHO0FBMk9sR0osY0FBVSxTQUFTQSxRQUFULENBQWtCSyxRQUFsQixFQUE0QjtBQUNwQyxVQUFNQyxNQUFNQyxRQUFaOztBQUVBLFVBQU1DLGdCQUFnQkYsSUFBSUcsS0FBSixHQUFZQyxRQUFaLENBQXFCLEtBQUt2RCxRQUExQixFQUFvQyxNQUFwQyxFQUE0Q3dELE9BQTVDLENBQW9ELEtBQXBELENBQXRCO0FBQ0EsVUFBTUMsUUFBUU4sSUFBSUcsS0FBSixHQUFZSSxLQUFaLENBQWtCLEtBQWxCLENBQWQ7O0FBRUEsVUFBTUMsZUFBYVQsUUFBYixrQkFBa0Msa0JBQVFVLG1CQUFSLENBQTRCUCxjQUFjUSxNQUFkLEVBQTVCLENBQWxDLGVBQStGLGtCQUFRRCxtQkFBUixDQUE0QkgsTUFBTUksTUFBTixFQUE1QixDQUEvRixlQUFvSlgsUUFBcEosa0JBQXlLRyxjQUFjUyxNQUFkLENBQXFCLHdCQUFyQixDQUF6SyxlQUFpT0wsTUFBTUssTUFBTixDQUFhLHdCQUFiLENBQWpPLFFBQU47QUFDQSxhQUFPSCxLQUFQO0FBQ0Q7QUFuUGlHLEdBQXBGLENBQWhCO0FBcVBBLE1BQU1JLE1BQU0sa0NBQVo7QUFDQUEsTUFBSUMsWUFBSixDQUFpQiw4QkFBakIsRUFBaUQvRSxPQUFqRDtBQUNBLGlCQUFLZ0YsU0FBTCxDQUFlLHdDQUFmLEVBQXlEaEYsT0FBekQ7b0JBQ2VBLE8iLCJmaWxlIjoiTmV3RGFzaGJvYXJkV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IGNvbnZlcnQgZnJvbSAnYXJnb3MvQ29udmVydCc7XHJcbmltcG9ydCBSZWxhdGVkVmlld01hbmFnZXIgZnJvbSAnYXJnb3MvUmVsYXRlZFZpZXdNYW5hZ2VyJztcclxuaW1wb3J0IERhc2hib2FyZFdpZGdldCBmcm9tICcuLi8uLi9EYXNoYm9hcmRXaWRnZXQnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnY3JtL0Zvcm1hdCc7XHJcbmltcG9ydCBhZ2dyZWdhdGUgZnJvbSAnY3JtL0FnZ3JlZ2F0ZSc7XHJcblxyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnbmV3RGFzaGJvYXJkV2lkZ2V0Jyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuQWNjb3VudC5OZXdEYXNoYm9hcmRXaWRnZXQnLCBbRGFzaGJvYXJkV2lkZ2V0XSwge1xyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIG5ld1F1b3Rlc1RleHQ6IHJlc291cmNlLm5ld1F1b3Rlc1RleHQsXHJcbiAgbmV3T3JkZXJzVGV4dDogcmVzb3VyY2UubmV3T3JkZXJzVGV4dCxcclxuICBuZXdTaGlwbWVudHNUZXh0OiByZXNvdXJjZS5uZXdTaGlwbWVudHNUZXh0LFxyXG4gIG5ld0ludm9pY2VzVGV4dDogcmVzb3VyY2UubmV3SW52b2ljZXNUZXh0LFxyXG4gIG5ld1JlY2VpdmFibGVzVGV4dDogcmVzb3VyY2UubmV3UmVjZWl2YWJsZXNUZXh0LFxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIGNhdGVnb3J5VGV4dDogcmVzb3VyY2UuY2F0ZWdvcnlUZXh0LFxyXG4gIHF1b3Rlc1RvdGFsaW5nVGV4dDogcmVzb3VyY2UucXVvdGVzVG90YWxpbmdUZXh0LFxyXG4gIG9yZGVyc1RvdGFsaW5nVGV4dDogcmVzb3VyY2Uub3JkZXJzVG90YWxpbmdUZXh0LFxyXG4gIHNoaXBtZW50c1RvdGFsaW5nVGV4dDogcmVzb3VyY2Uuc2hpcG1lbnRzVG90YWxpbmdUZXh0LFxyXG4gIGludm9pY2VzVG90YWxpbmdUZXh0OiByZXNvdXJjZS5pbnZvaWNlc1RvdGFsaW5nVGV4dCxcclxuICByZWNlaXZhYmxlc1RvdGFsaW5nVGV4dDogcmVzb3VyY2UucmVjZWl2YWJsZXNUb3RhbGluZ1RleHQsXHJcblxyXG4gIC8vIE92ZXJyaWRlIHZhcmlhYmxlcyBmb3IgX0Rhc2hib2FyZFdpZGdldEJhc2VcclxuICBjb2xvcjogJyMzMTMyMzYnLFxyXG4gIHNlbGVjdGVkQ29sb3I6ICcjNTA1MzVhJyxcclxuICBkYXlWYWx1ZTogNyxcclxuXHJcbiAgLy8gY3JtIHN0YXR1cyBmb3IgU2FsZXNPcmRlclxyXG4gIGNsb3NlZFRleHQ6IHJlc291cmNlLmNsb3NlZFRleHQsXHJcbiAgZGVsZXRlZFRleHQ6IHJlc291cmNlLmRlbGV0ZWRUZXh0LFxyXG4gIHJlcGxhY2VkVGV4dDogcmVzb3VyY2UucmVwbGFjZWRUZXh0LFxyXG4gIGNhbmNlbGVkVGV4dDogcmVzb3VyY2UuY2FuY2VsZWRUZXh0LFxyXG4gIHVuYXBwcm92ZWRUZXh0OiByZXNvdXJjZS51bmFwcHJvdmVkVGV4dCxcclxuXHJcbiAgLy8gQ29kZXMgdXNlZCBmb3IgdGhlIHN0YXR1cyBvZiB0aGUgZW50aXR5XHJcbiAgb3BlbkNvZGU6ICdOZXcnLFxyXG4gIGNsb3NlZENvZGU6ICdDbG9zZWQnLFxyXG4gIHJlcGxhY2VkQ29kZTogJ1JlcGxhY2VkJyxcclxuICBjYW5jbGVkQ29kZTogJ0NhbmNlbGVkJyxcclxuICBkZWxldGVkQ29kZTogJ0RlbGV0ZWQnLFxyXG4gIHZvaWRDb2RlOiAnVm9pZCcsXHJcbiAgcHJvZm9ybWFDb2RlOiAnUHJvZm9ybWEnLFxyXG4gIHVuYXBwcm92ZWRDb2RlOiAnVW5hcHByb3ZlZCcsXHJcbiAgaG9sZENvZGU6ICdIb2xkJyxcclxuICBkaXNwdXRlQ29kZTogJ0Rpc3B1dGUnLFxyXG4gIHdyaXRlT2ZmQ29kZTogJ1dyaXRlT2ZmJyxcclxuXHJcbiAgLy8gVmFsdWVzIGZvciB0aGUgbWV0cmljc1xyXG4gIHZhbHVlczogW3tcclxuICAgIG5hbWU6ICdxdW90ZXMnLFxyXG4gICAgYWdncmVnYXRlOiAnc3VtJyxcclxuICAgIGFnZ3JlZ2F0ZU1vZHVsZTogYWdncmVnYXRlLFxyXG4gICAgdmFsdWU6IG51bGwsXHJcbiAgICBxdWVyeUluZGV4OiAwLFxyXG4gICAgY291bnQ6IHRydWUsXHJcbiAgICBkYXRlRGVwZW5kZW50OiB0cnVlLFxyXG4gIH0sIHtcclxuICAgIG5hbWU6ICdzYWxlc09yZGVycycsXHJcbiAgICBhZ2dyZWdhdGU6ICdzdW0nLFxyXG4gICAgYWdncmVnYXRlTW9kdWxlOiBhZ2dyZWdhdGUsXHJcbiAgICB2YWx1ZTogbnVsbCxcclxuICAgIHF1ZXJ5SW5kZXg6IDEsXHJcbiAgICBjb3VudDogdHJ1ZSxcclxuICAgIGRhdGVEZXBlbmRlbnQ6IHRydWUsXHJcbiAgfSwge1xyXG4gICAgbmFtZTogJ3NoaXBtZW50cycsXHJcbiAgICBhZ2dyZWdhdGU6ICdzdW0nLFxyXG4gICAgYWdncmVnYXRlTW9kdWxlOiBhZ2dyZWdhdGUsXHJcbiAgICB2YWx1ZTogbnVsbCxcclxuICAgIHF1ZXJ5SW5kZXg6IDIsXHJcbiAgICBjb3VudDogdHJ1ZSxcclxuICAgIGRhdGVEZXBlbmRlbnQ6IHRydWUsXHJcbiAgfSwge1xyXG4gICAgbmFtZTogJ2ludm9pY2VzJyxcclxuICAgIGFnZ3JlZ2F0ZTogJ3N1bScsXHJcbiAgICBhZ2dyZWdhdGVNb2R1bGU6IGFnZ3JlZ2F0ZSxcclxuICAgIHZhbHVlOiBudWxsLFxyXG4gICAgcXVlcnlJbmRleDogMyxcclxuICAgIGNvdW50OiB0cnVlLFxyXG4gICAgZGF0ZURlcGVuZGVudDogdHJ1ZSxcclxuICB9LCB7XHJcbiAgICBuYW1lOiAncmVjZWl2YWJsZXMnLFxyXG4gICAgYWdncmVnYXRlOiAnc3VtJyxcclxuICAgIGFnZ3JlZ2F0ZU1vZHVsZTogYWdncmVnYXRlLFxyXG4gICAgdmFsdWU6IG51bGwsXHJcbiAgICBxdWVyeUluZGV4OiA0LFxyXG4gICAgY291bnQ6IHRydWUsXHJcbiAgICBkYXRlRGVwZW5kZW50OiBmYWxzZSxcclxuICB9XSxcclxuXHJcbiAgcmVzb3VyY2VLaW5kOiAnYWNjb3VudHMnLFxyXG4gIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAnQWNjb3VudE5hbWUnLFxyXG4gIF0sXHJcbiAgcXVlcnlBcmdzOiBudWxsLFxyXG4gIGdldFdoZXJlOiBmdW5jdGlvbiBnZXRXaGVyZSgpIHtcclxuICAgIHJldHVybiBgSWQgZXEgJyR7dGhpcy5wYXJlbnRFbnRyeS4ka2V5fSdgO1xyXG4gIH0sXHJcbiAgLy8gQ3JlYXRlcyB0aGUgcmFuZ2Ugd2lkZ2V0cywgdGltZXNwYW4gaXMgYmFzZWQgb24gdGhyZWUgY2F0ZWdvcmllczogZCAtIGRheSwgbSAtIG1vbnRoLCB5IC0geWVhclxyXG4gIGNyZWF0ZVJhbmdlTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVSYW5nZUxheW91dCgpIHtcclxuICAgIGNvbnN0IHJhbmdlTGF5b3V0ID0gW3tcclxuICAgICAgdmFsdWU6IDcsXHJcbiAgICB9LCB7XHJcbiAgICAgIHZhbHVlOiAxNCxcclxuICAgIH0sIHtcclxuICAgICAgdmFsdWU6IDMwLFxyXG4gICAgfSwge1xyXG4gICAgICB2YWx1ZTogOTAsXHJcbiAgICB9XTtcclxuICAgIHJldHVybiByYW5nZUxheW91dDtcclxuICB9LFxyXG4gIGNyZWF0ZU1ldHJpY0xheW91dDogZnVuY3Rpb24gY3JlYXRlTWV0cmljTGF5b3V0KGVudHJ5KSB7XHJcbiAgICB0aGlzLnNldFF1ZXJ5QXJncyhlbnRyeSk7XHJcblxyXG4gICAgY29uc3QgbWV0cmljTGF5b3V0ID0gW3tcclxuICAgICAgbmF2VG86ICdhY2NvdW50X25ld3F1b3Rlc19yZWxhdGVkJyxcclxuICAgICAgZm9ybWF0dGVyOiAnYmlnTnVtYmVyJyxcclxuICAgICAgZm9ybWF0dGVyTW9kdWxlOiBmb3JtYXQsXHJcbiAgICAgIHRpdGxlOiB0aGlzLm5ld1F1b3Rlc1RleHQsXHJcbiAgICAgIGNvdW50VGl0bGU6IHRoaXMucXVvdGVzVG90YWxpbmdUZXh0LFxyXG4gICAgICB2YWx1ZU5lZWRlZDogJ3F1b3RlcycsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hdlRvOiAnYWNjb3VudF9uZXdvcmRlcnNfcmVsYXRlZCcsXHJcbiAgICAgIGZvcm1hdHRlcjogJ2JpZ051bWJlcicsXHJcbiAgICAgIGZvcm1hdHRlck1vZHVsZTogZm9ybWF0LFxyXG4gICAgICB0aXRsZTogdGhpcy5uZXdPcmRlcnNUZXh0LFxyXG4gICAgICBjb3VudFRpdGxlOiB0aGlzLm9yZGVyc1RvdGFsaW5nVGV4dCxcclxuICAgICAgdmFsdWVOZWVkZWQ6ICdzYWxlc09yZGVycycsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hdlRvOiAnYWNjb3VudF9uZXdlcnBzaGlwbWVudHNfcmVsYXRlZCcsXHJcbiAgICAgIGZvcm1hdHRlcjogJ2JpZ051bWJlcicsXHJcbiAgICAgIGZvcm1hdHRlck1vZHVsZTogZm9ybWF0LFxyXG4gICAgICB0aXRsZTogdGhpcy5uZXdTaGlwbWVudHNUZXh0LFxyXG4gICAgICBjb3VudFRpdGxlOiB0aGlzLnNoaXBtZW50c1RvdGFsaW5nVGV4dCxcclxuICAgICAgdmFsdWVOZWVkZWQ6ICdzaGlwbWVudHMnLFxyXG4gICAgfSwge1xyXG4gICAgICBuYXZUbzogJ2FjY291bnRfbmV3ZXJwaW52b2ljZV9yZWxhdGVkJyxcclxuICAgICAgZm9ybWF0dGVyOiAnYmlnTnVtYmVyJyxcclxuICAgICAgZm9ybWF0dGVyTW9kdWxlOiBmb3JtYXQsXHJcbiAgICAgIHRpdGxlOiB0aGlzLm5ld0ludm9pY2VzVGV4dCxcclxuICAgICAgY291bnRUaXRsZTogdGhpcy5pbnZvaWNlc1RvdGFsaW5nVGV4dCxcclxuICAgICAgdmFsdWVOZWVkZWQ6ICdpbnZvaWNlcycsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hdlRvOiAnYWNjb3VudF9uZXdlcnByZWNlaXZhYmxlc19yZWxhdGVkJyxcclxuICAgICAgZm9ybWF0dGVyOiAnYmlnTnVtYmVyJyxcclxuICAgICAgZm9ybWF0dGVyTW9kdWxlOiBmb3JtYXQsXHJcbiAgICAgIHRpdGxlOiB0aGlzLm5ld1JlY2VpdmFibGVzVGV4dCxcclxuICAgICAgY291bnRUaXRsZTogdGhpcy5yZWNlaXZhYmxlc1RvdGFsaW5nVGV4dCxcclxuICAgICAgdmFsdWVOZWVkZWQ6ICdyZWNlaXZhYmxlcycsXHJcbiAgICB9XTtcclxuXHJcbiAgICByZXR1cm4gbWV0cmljTGF5b3V0O1xyXG4gIH0sXHJcbiAgc2V0UXVlcnlBcmdzOiBmdW5jdGlvbiBzZXRRdWVyeUFyZ3MoZW50cnkpIHtcclxuICAgIHRoaXMucXVlcnlBcmdzID0gW107XHJcblxyXG4gICAgdGhpcy5xdWVyeUFyZ3MucHVzaChbXHJcbiAgICAgICdxdW90ZXMnLFxyXG4gICAgICB7XHJcbiAgICAgICAgX2FjdGl2ZUZpbHRlcjogYEFjY291bnQuSWQgZXEgXCIke2VudHJ5LiRrZXl9XCIgYW5kYCArXHJcbiAgICAgICAgICAgJygnICtcclxuICAgICAgICAgICAgICcoKEVycEV4dElkIG5lIG51bGwpIGFuZCAnICtcclxuICAgICAgICAgICAgICAgIGAoRXJwU3RhdHVzIG5lIFwiJHt0aGlzLnJlcGxhY2VkQ29kZX1cIikgYW5kIGAgK1xyXG4gICAgICAgICAgICAgICAgYChFcnBTdGF0dXMgbmUgXCIke3RoaXMuY2FuY2xlZENvZGV9XCIpIGFuZCBgICtcclxuICAgICAgICAgICAgICAgIGAoRXJwU3RhdHVzIG5lIFwiJHt0aGlzLmRlbGV0ZWRDb2RlfVwiKSBhbmQgYCArXHJcbiAgICAgICAgICAgICAgIGAoJHt0aGlzLnBhc3REYXlzKCdEb2N1bWVudERhdGUnKX0pYCArXHJcbiAgICAgICAgICAgICAnKScgK1xyXG4gICAgICAgICAgICAgJyBvciAnICtcclxuICAgICAgICAgICAgICcoKEVycEV4dElkIGVxIG51bGwpIGFuZCAnICtcclxuICAgICAgICAgICAgICAgJygnICtcclxuICAgICAgICAgICAgICAgICBgKFN0YXR1cyBuZSBcIiR7dGhpcy5jbG9zZWRUZXh0fVwiKSBhbmQgYCArXHJcbiAgICAgICAgICAgICAgICAgYChTdGF0dXMgbmUgXCIke3RoaXMuY2FuY2xlZFRleHR9XCIpIGFuZCBgICtcclxuICAgICAgICAgICAgICAgICBgKFN0YXR1cyBuZSBcIiR7dGhpcy5yZXBsYWNlZFRleHR9XCIpIGFuZCBgICtcclxuICAgICAgICAgICAgICAgICBgKFN0YXR1cyBuZSBcIiR7dGhpcy5kZWxldGVkVGV4dH1cIikgYW5kIGAgK1xyXG4gICAgICAgICAgICAgICAgIGAoU3RhdHVzIG5lIFwiJHt0aGlzLnVuYXBwcm92ZWRUZXh0fVwiKSBhbmQgYCArXHJcbiAgICAgICAgICAgICAgICAgYCgke3RoaXMucGFzdERheXMoJ1N0YXJ0RGF0ZScpfSlgICtcclxuICAgICAgICAgICAgICAgICcpJyArXHJcbiAgICAgICAgICAgICAnKScgK1xyXG4gICAgICAgICAgICcpJyxcclxuICAgICAgICBfZmlsdGVyTmFtZTogJ0FjY291bnRNYW5hZ2VyJyxcclxuICAgICAgICBfbWV0cmljTmFtZTogJ1N1bUdyYW5kVG90YWwnLFxyXG4gICAgICB9LFxyXG4gICAgXSwgW1xyXG4gICAgICAnc2FsZXNPcmRlcnMnLFxyXG4gICAgICB7XHJcbiAgICAgICAgX2FjdGl2ZUZpbHRlcjogYEFjY291bnQuSWQgZXEgXCIke2VudHJ5LiRrZXl9XCIgYW5kIElzUXVvdGUgZXEgZmFsc2UgYW5kIGAgK1xyXG4gICAgICAgICAgICAgICAgJygnICtcclxuICAgICAgICAgICAgICAgICAgJygoRXJwRXh0SWQgbmUgbnVsbCkgYW5kICcgK1xyXG4gICAgICAgICAgICAgICAgICAgIGAoRVJQU2FsZXNPcmRlci5FUlBTdGF0dXMgbmUgXCIke3RoaXMuY2FuY2xlZENvZGV9XCIpIGFuZCBgICtcclxuICAgICAgICAgICAgICAgICAgICBgKEVSUFNhbGVzT3JkZXIuRVJQU3RhdHVzIG5lIFwiJHt0aGlzLmRlbGV0ZWRDb2RlfVwiKSBhbmQgYCArXHJcbiAgICAgICAgICAgICAgICAgICAgYChFUlBTYWxlc09yZGVyLkVSUFN0YXR1cyBuZSBcIiR7dGhpcy51bmFwcHJvdmVkQ29kZX1cIikgYW5kIGAgK1xyXG4gICAgICAgICAgICAgICAgICAgIGAoJHt0aGlzLnBhc3REYXlzKCdFcnBEb2N1bWVudERhdGUnKX0pYCArXHJcbiAgICAgICAgICAgICAgICAgICcpJyArXHJcbiAgICAgICAgICAgICAgICAgICcgb3IgJyArXHJcbiAgICAgICAgICAgICAgICAgICcoKEVycEV4dElkIGVxIG51bGwpIGFuZCAnICtcclxuICAgICAgICAgICAgICAgICAgICBgKFN0YXR1cyBuZSBcIiR7dGhpcy5jbG9zZWRUZXh0fVwiKSBhbmQgYCArXHJcbiAgICAgICAgICAgICAgICAgICAgYChTdGF0dXMgbmUgXCIke3RoaXMuY2FuY2xlZFRleHR9XCIpIGFuZCBgICtcclxuICAgICAgICAgICAgICAgICAgICBgKFN0YXR1cyBuZSBcIiR7dGhpcy5kZWxldGVkVGV4dH1cIikgYW5kIGAgK1xyXG4gICAgICAgICAgICAgICAgICAgIGAoU3RhdHVzIG5lIFwiJHt0aGlzLnJlcGxhY2VkVGV4dH1cIikgYW5kIGAgK1xyXG4gICAgICAgICAgICAgICAgICAgIGAoU3RhdHVzIG5lIFwiJHt0aGlzLnVuYXBwcm92ZWRUZXh0fVwiKSBhbmQgYCArXHJcbiAgICAgICAgICAgICAgICAgICAgYCgke3RoaXMucGFzdERheXMoJ09yZGVyRGF0ZScpfSlgICtcclxuICAgICAgICAgICAgICAgICAgICcpJyArXHJcbiAgICAgICAgICAgICAgICAgJyknLFxyXG4gICAgICAgIF9maWx0ZXJOYW1lOiAnQWNjb3VudE1hbmFnZXInLFxyXG4gICAgICAgIF9tZXRyaWNOYW1lOiAnU3VtR3JhbmRUb3RhbCcsXHJcbiAgICAgIH0sXHJcbiAgICBdLCBbXHJcbiAgICAgICdlcnBTaGlwbWVudHMnLFxyXG4gICAgICB7XHJcbiAgICAgICAgX2FjdGl2ZUZpbHRlcjogYEFjY291bnQuSWQgZXEgXCIke2VudHJ5LiRrZXl9XCIgYW5kIGAgK1xyXG4gICAgICAgICAgICAgYEVycFN0YXR1cyBuZSBcIiR7dGhpcy5jYW5jbGVkQ29kZX1cIiBhbmQgYCArXHJcbiAgICAgICAgICAgICBgRXJwU3RhdHVzIG5lIFwiJHt0aGlzLmRlbGV0ZWRDb2RlfVwiIGFuZCBgICtcclxuICAgICAgICAgICAgIGBFcnBTdGF0dXMgbmUgXCIke3RoaXMuaG9sZENvZGV9XCIgYW5kICR7XHJcbiAgICAgICAgICAgICAgIHRoaXMucGFzdERheXMoJ0VycERvY3VtZW50RGF0ZScpfWAsXHJcbiAgICAgICAgX2ZpbHRlck5hbWU6ICdFUlBTdGF0dXMnLFxyXG4gICAgICAgIF9tZXRyaWNOYW1lOiAnU3VtVG90YWxBbW91bnQnLFxyXG4gICAgICB9LFxyXG4gICAgXSwgW1xyXG4gICAgICAnZXJwSW52b2ljZXMnLFxyXG4gICAgICB7XHJcbiAgICAgICAgX2FjdGl2ZUZpbHRlcjogYEFjY291bnQuSWQgZXEgXCIke2VudHJ5LiRrZXl9XCIgYW5kIGAgK1xyXG4gICAgICAgICAgICAgYEVycFN0YXR1cyBuZSBcIiR7dGhpcy5wcm9mb3JtYUNvZGV9XCIgYW5kIGAgK1xyXG4gICAgICAgICAgICAgYEVycFN0YXR1cyBuZSBcIiR7dGhpcy52b2lkQ29kZX1cIiBhbmQgYCArXHJcbiAgICAgICAgICAgICBgRXJwU3RhdHVzIG5lIFwiJHt0aGlzLmRpc3B1dGVDb2RlfVwiIGFuZCBgICtcclxuICAgICAgICAgICAgIGBFcnBTdGF0dXMgbmUgXCIke3RoaXMud3JpdGVPZmZDb2RlfVwiIGFuZCAke1xyXG4gICAgICAgICAgICAgICB0aGlzLnBhc3REYXlzKCdFcnBEb2N1bWVudERhdGUnKX1gLFxyXG4gICAgICAgIF9maWx0ZXJOYW1lOiAnRXJwU3RhdHVzJyxcclxuICAgICAgICBfbWV0cmljTmFtZTogJ1N1bUdyYW5kVG90YWwnLFxyXG4gICAgICB9LFxyXG4gICAgXSwgW1xyXG4gICAgICAnZXJwUmVjZWl2YWJsZXMnLFxyXG4gICAgICB7XHJcbiAgICAgICAgX2FjdGl2ZUZpbHRlcjogYEFjY291bnQuSWQgZXEgXCIke2VudHJ5LiRrZXl9XCIgYW5kIEVycFN0YXR1cyBuZSBcIiR7dGhpcy52b2lkQ29kZX1cIiBhbmQgJHt0aGlzLnBhc3REYXlzKCdFcnBEb2N1bWVudERhdGUnKX1gLFxyXG4gICAgICAgIF9maWx0ZXJOYW1lOiAnRXJwU3RhdHVzJyxcclxuICAgICAgICBfbWV0cmljTmFtZTogJ1N1bUdyYW5kVG90YWwnLFxyXG4gICAgICB9LFxyXG4gICAgXSk7XHJcblxyXG4gICAgdGhpcy5zZXRDb3VudFRpdGxlcygpO1xyXG4gIH0sXHJcbiAgc2V0Q291bnRUaXRsZXM6IGZ1bmN0aW9uIHNldENvdW50VGl0bGVzKCkge1xyXG4gIH0sXHJcbiAgcGFzdERheXM6IGZ1bmN0aW9uIHBhc3REYXlzKHByb3BlcnR5KSB7XHJcbiAgICBjb25zdCBub3cgPSBtb21lbnQoKTtcclxuXHJcbiAgICBjb25zdCBwYXN0V2Vla1N0YXJ0ID0gbm93LmNsb25lKCkuc3VidHJhY3QodGhpcy5kYXlWYWx1ZSwgJ2RheXMnKS5zdGFydE9mKCdkYXknKTtcclxuICAgIGNvbnN0IHRvZGF5ID0gbm93LmNsb25lKCkuZW5kT2YoJ2RheScpO1xyXG5cclxuICAgIGNvbnN0IHF1ZXJ5ID0gYCgoJHtwcm9wZXJ0eX0gYmV0d2VlbiBAJHtjb252ZXJ0LnRvSXNvU3RyaW5nRnJvbURhdGUocGFzdFdlZWtTdGFydC50b0RhdGUoKSl9QCBhbmQgQCR7Y29udmVydC50b0lzb1N0cmluZ0Zyb21EYXRlKHRvZGF5LnRvRGF0ZSgpKX1AKSBvciAoJHtwcm9wZXJ0eX0gYmV0d2VlbiBAJHtwYXN0V2Vla1N0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERFQwMDowMDowMFtaXScpfUAgYW5kIEAke3RvZGF5LmZvcm1hdCgnWVlZWS1NTS1ERFQyMzo1OTo1OVtaXScpfUApKWA7XHJcbiAgICByZXR1cm4gcXVlcnk7XHJcbiAgfSxcclxufSk7XHJcbmNvbnN0IHJ2bSA9IG5ldyBSZWxhdGVkVmlld01hbmFnZXIoKTtcclxucnZtLnJlZ2lzdGVyVHlwZSgnYWNjb3VudF9uZXdfZGFzaGJvYXJkX3dpZGdldCcsIF9fY2xhc3MpO1xyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuVmlld3MuQWNjb3VudC5OZXdEYXNoYm9hcmRXaWRnZXQnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19