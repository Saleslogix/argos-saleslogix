define('crm/Integrations/BOE/Views/SalesOrders/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'crm/Format', 'crm/Action', 'crm/Views/_RightDrawerListMixin', 'crm/Views/_MetricListMixin', 'crm/Views/_GroupListMixin', '../../Models/Names', 'argos/Models/Types', 'argos/I18n', '../../Utility'], function (module, exports, _declare, _lang, _List, _Format, _Action, _RightDrawerListMixin2, _MetricListMixin2, _GroupListMixin2, _Names, _Types, _I18n, _Utility) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _List2 = _interopRequireDefault(_List);

  var _Format2 = _interopRequireDefault(_Format);

  var _Action2 = _interopRequireDefault(_Action);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _GroupListMixin3 = _interopRequireDefault(_GroupListMixin2);

  var _Names2 = _interopRequireDefault(_Names);

  var _Types2 = _interopRequireDefault(_Types);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Utility2 = _interopRequireDefault(_Utility);

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

  var resource = (0, _I18n2.default)('salesOrdersList');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.SalesOrders.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default, _GroupListMixin3.default], {
    formatter: _Format2.default,
    util: _Utility2.default,
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.SalesOrderNumber %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.erpOrderIdText %}</label> {%: $.ErpExtId %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.customerPONumberText %}</label> {%: $.CustomerPurchaseOrderNumber %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.accountText %}</label> {%: $.Account.AccountName %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.orderDateText %}</label> {%: $$.formatter.date($.OrderDate) %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.baseGrandTotalText %}</label> ', '{%: $$.util.formatMultiCurrency($.GrandTotal, $.BaseCurrencyCode) %}', '</p>', '<p class="micro-text"><label class="group-label">{%: $$.grandTotalText %}</label> ', '{%: $$.util.formatMultiCurrency($.DocGrandTotal, $.CurrencyCode) %}', '</p>', '{% if ($.ErpExtId) { %}', '<p class="micro-text"><label class="group-label">{%: $$.erpStatusLabelText %}</label> {%: $$.formatErpStatus($.ERPSalesOrder.ERPStatus) %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.documentDateText %}</label> {%: $$.formatter.date($.ErpDocumentDate) %}</p>', '{% } else { %}', '<p class="micro-text"><label class="group-label">{%: $$.statusLabelText %}</label> {%: $.Status %}</p>', '{% } %}']),

    // Localization
    titleText: resource.titleText,
    accountText: resource.accountText,
    erpOrderIdText: resource.erpOrderIdText,
    grandTotalText: resource.grandTotalText,
    baseGrandTotalText: resource.baseGrandTotalText,
    statusLabelText: resource.statusLabelText,
    erpStatusLabelText: resource.erpStatusLabelText,
    customerPONumberText: resource.customerPONumberText,
    orderDateText: resource.orderDateText,
    viewAccountActionText: resource.viewAccountActionText,
    addLineItemsText: resource.addLineItemsText,
    documentDateText: resource.documentDateText,

    // View Properties
    id: 'salesorder_list',
    modelName: _Names2.default.SALESORDER,
    resourceKind: 'salesOrders',
    allowSelection: true,
    enableActions: true,
    detailView: 'salesorder_detail',
    insertView: 'salesorder_edit',
    security: 'Entities/SalesOrder/View',
    insertSecurity: 'Entities/SalesOrder/Add',

    // Card layout
    itemIconClass: 'cart',

    // Groups
    enableDynamicGroupLayout: true,
    groupsEnabled: true,

    // Metrics
    entityName: 'SalesOrder',

    createActionLayout: function createActionLayout() {
      return this.actions || (this.actions = [{
        id: 'viewAccount',
        label: this.viewAccountActionText,
        enabled: _Action2.default.hasProperty.bindDelegate(this, 'Account.$key'),
        fn: _Action2.default.navigateToEntity.bindDelegate(this, {
          view: 'account_detail',
          keyProperty: 'Account.$key',
          textProperty: 'Account.AccountName'
        })
      }, {
        id: 'addOrderItem',
        cls: 'bullet-list',
        label: this.addLineItemsText,
        fn: this.onAddLineItems,
        security: 'Entities/SalesOrder/Add'
      }]);
    },
    onAddLineItems: function onAddLineItems(evt, selection) {
      var _this = this;

      var key = selection && selection.data && selection.data.$key;
      if (key) {
        var salesOrderModel = App.ModelManager.getModel(_Names2.default.SALESORDER, _Types2.default.SDATA);
        var isClosedPromise = salesOrderModel.isClosed(key);
        isClosedPromise.then(function (isClosed) {
          if (isClosed) {
            App.modal.createSimpleAlert({
              title: 'alert',
              content: _this.statusLabelText + ': ' + (selection.data.Status || '')
            });
            return;
          }
          _this.navigateToLineItems(evt, selection);
        });
      }
    },
    navigateToLineItems: function navigateToLineItems(evt, selection) {
      var view = App.getView('salesorder_item_edit');
      if (view) {
        var options = {
          insert: true,
          context: {
            SalesOrder: selection.data
          }
        };
        view.show(options);
      }
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return '(upper(SalesOrderNumber) like "' + q + '%" ) or (upper(ErpExtId) like "' + 0 + '%" ) or (upper(CustomerPurchaseOrderNumber) like "' + q + '%" ) or (upper(Account.AccountName) like "' + q + '%" ) ';
    },
    formatErpStatus: function formatErpStatus(value) {
      var text = App.picklistService.getPicklistItemTextByCode('ErpSalesOrderStatus', value);
      if (text) {
        return text;
      }
      return value;
    }
  });

  _lang2.default.setObject('icboe.Views.SalesOrders.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL1NhbGVzT3JkZXJzL0xpc3QuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiZm9ybWF0dGVyIiwidXRpbCIsIml0ZW1UZW1wbGF0ZSIsIlNpbXBsYXRlIiwidGl0bGVUZXh0IiwiYWNjb3VudFRleHQiLCJlcnBPcmRlcklkVGV4dCIsImdyYW5kVG90YWxUZXh0IiwiYmFzZUdyYW5kVG90YWxUZXh0Iiwic3RhdHVzTGFiZWxUZXh0IiwiZXJwU3RhdHVzTGFiZWxUZXh0IiwiY3VzdG9tZXJQT051bWJlclRleHQiLCJvcmRlckRhdGVUZXh0Iiwidmlld0FjY291bnRBY3Rpb25UZXh0IiwiYWRkTGluZUl0ZW1zVGV4dCIsImRvY3VtZW50RGF0ZVRleHQiLCJpZCIsIm1vZGVsTmFtZSIsIlNBTEVTT1JERVIiLCJyZXNvdXJjZUtpbmQiLCJhbGxvd1NlbGVjdGlvbiIsImVuYWJsZUFjdGlvbnMiLCJkZXRhaWxWaWV3IiwiaW5zZXJ0VmlldyIsInNlY3VyaXR5IiwiaW5zZXJ0U2VjdXJpdHkiLCJpdGVtSWNvbkNsYXNzIiwiZW5hYmxlRHluYW1pY0dyb3VwTGF5b3V0IiwiZ3JvdXBzRW5hYmxlZCIsImVudGl0eU5hbWUiLCJjcmVhdGVBY3Rpb25MYXlvdXQiLCJhY3Rpb25zIiwibGFiZWwiLCJlbmFibGVkIiwiaGFzUHJvcGVydHkiLCJiaW5kRGVsZWdhdGUiLCJmbiIsIm5hdmlnYXRlVG9FbnRpdHkiLCJ2aWV3Iiwia2V5UHJvcGVydHkiLCJ0ZXh0UHJvcGVydHkiLCJjbHMiLCJvbkFkZExpbmVJdGVtcyIsImV2dCIsInNlbGVjdGlvbiIsImtleSIsImRhdGEiLCIka2V5Iiwic2FsZXNPcmRlck1vZGVsIiwiQXBwIiwiTW9kZWxNYW5hZ2VyIiwiZ2V0TW9kZWwiLCJTREFUQSIsImlzQ2xvc2VkUHJvbWlzZSIsImlzQ2xvc2VkIiwidGhlbiIsIm1vZGFsIiwiY3JlYXRlU2ltcGxlQWxlcnQiLCJ0aXRsZSIsImNvbnRlbnQiLCJTdGF0dXMiLCJuYXZpZ2F0ZVRvTGluZUl0ZW1zIiwiZ2V0VmlldyIsIm9wdGlvbnMiLCJpbnNlcnQiLCJjb250ZXh0IiwiU2FsZXNPcmRlciIsInNob3ciLCJmb3JtYXRTZWFyY2hRdWVyeSIsInNlYXJjaFF1ZXJ5IiwicSIsImVzY2FwZVNlYXJjaFF1ZXJ5IiwidG9VcHBlckNhc2UiLCJmb3JtYXRFcnBTdGF0dXMiLCJ2YWx1ZSIsInRleHQiLCJwaWNrbGlzdFNlcnZpY2UiLCJnZXRQaWNrbGlzdEl0ZW1UZXh0QnlDb2RlIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUE0QkEsTUFBTUEsV0FBVyxvQkFBWSxpQkFBWixDQUFqQjs7QUFFQSxNQUFNQyxVQUFVLHVCQUFRLDZDQUFSLEVBQXVELHFHQUF2RCxFQUF5SDtBQUN2SUMsK0JBRHVJO0FBRXZJQywyQkFGdUk7QUFHdkk7QUFDQUMsa0JBQWMsSUFBSUMsUUFBSixDQUFhLENBQ3pCLDJEQUR5QixFQUV6Qix5R0FGeUIsRUFHekIsa0lBSHlCLEVBSXpCLGlIQUp5QixFQUt6Qiw0SEFMeUIsRUFNekIsd0ZBTnlCLEVBT3pCLHNFQVB5QixFQVF6QixNQVJ5QixFQVN6QixvRkFUeUIsRUFVekIscUVBVnlCLEVBV3pCLE1BWHlCLEVBWXpCLHlCQVp5QixFQWF6QixnSkFieUIsRUFjekIscUlBZHlCLEVBZXpCLGdCQWZ5QixFQWdCekIsd0dBaEJ5QixFQWlCekIsU0FqQnlCLENBQWIsQ0FKeUg7O0FBd0J2STtBQUNBQyxlQUFXTixTQUFTTSxTQXpCbUg7QUEwQnZJQyxpQkFBYVAsU0FBU08sV0ExQmlIO0FBMkJ2SUMsb0JBQWdCUixTQUFTUSxjQTNCOEc7QUE0QnZJQyxvQkFBZ0JULFNBQVNTLGNBNUI4RztBQTZCdklDLHdCQUFvQlYsU0FBU1Usa0JBN0IwRztBQThCdklDLHFCQUFpQlgsU0FBU1csZUE5QjZHO0FBK0J2SUMsd0JBQW9CWixTQUFTWSxrQkEvQjBHO0FBZ0N2SUMsMEJBQXNCYixTQUFTYSxvQkFoQ3dHO0FBaUN2SUMsbUJBQWVkLFNBQVNjLGFBakMrRztBQWtDdklDLDJCQUF1QmYsU0FBU2UscUJBbEN1RztBQW1DdklDLHNCQUFrQmhCLFNBQVNnQixnQkFuQzRHO0FBb0N2SUMsc0JBQWtCakIsU0FBU2lCLGdCQXBDNEc7O0FBc0N2STtBQUNBQyxRQUFJLGlCQXZDbUk7QUF3Q3ZJQyxlQUFXLGdCQUFZQyxVQXhDZ0g7QUF5Q3ZJQyxrQkFBYyxhQXpDeUg7QUEwQ3ZJQyxvQkFBZ0IsSUExQ3VIO0FBMkN2SUMsbUJBQWUsSUEzQ3dIO0FBNEN2SUMsZ0JBQVksbUJBNUMySDtBQTZDdklDLGdCQUFZLGlCQTdDMkg7QUE4Q3ZJQyxjQUFVLDBCQTlDNkg7QUErQ3ZJQyxvQkFBZ0IseUJBL0N1SDs7QUFpRHZJO0FBQ0FDLG1CQUFlLE1BbER3SDs7QUFvRHZJO0FBQ0FDLDhCQUEwQixJQXJENkc7QUFzRHZJQyxtQkFBZSxJQXREd0g7O0FBd0R2STtBQUNBQyxnQkFBWSxZQXpEMkg7O0FBMkR2SUMsd0JBQW9CLFNBQVNBLGtCQUFULEdBQThCO0FBQ2hELGFBQU8sS0FBS0MsT0FBTCxLQUFpQixLQUFLQSxPQUFMLEdBQWUsQ0FBQztBQUN0Q2YsWUFBSSxhQURrQztBQUV0Q2dCLGVBQU8sS0FBS25CLHFCQUYwQjtBQUd0Q29CLGlCQUFTLGlCQUFPQyxXQUFQLENBQW1CQyxZQUFuQixDQUFnQyxJQUFoQyxFQUFzQyxjQUF0QyxDQUg2QjtBQUl0Q0MsWUFBSSxpQkFBT0MsZ0JBQVAsQ0FBd0JGLFlBQXhCLENBQXFDLElBQXJDLEVBQTJDO0FBQzdDRyxnQkFBTSxnQkFEdUM7QUFFN0NDLHVCQUFhLGNBRmdDO0FBRzdDQyx3QkFBYztBQUgrQixTQUEzQztBQUprQyxPQUFELEVBU3BDO0FBQ0R4QixZQUFJLGNBREg7QUFFRHlCLGFBQUssYUFGSjtBQUdEVCxlQUFPLEtBQUtsQixnQkFIWDtBQUlEc0IsWUFBSSxLQUFLTSxjQUpSO0FBS0RsQixrQkFBVTtBQUxULE9BVG9DLENBQWhDLENBQVA7QUFnQkQsS0E1RXNJO0FBNkV2SWtCLG9CQUFnQixTQUFTQSxjQUFULENBQXdCQyxHQUF4QixFQUE2QkMsU0FBN0IsRUFBd0M7QUFBQTs7QUFDdEQsVUFBTUMsTUFBTUQsYUFBYUEsVUFBVUUsSUFBdkIsSUFBK0JGLFVBQVVFLElBQVYsQ0FBZUMsSUFBMUQ7QUFDQSxVQUFJRixHQUFKLEVBQVM7QUFDUCxZQUFNRyxrQkFBa0JDLElBQUlDLFlBQUosQ0FBaUJDLFFBQWpCLENBQTBCLGdCQUFZakMsVUFBdEMsRUFBa0QsZ0JBQVlrQyxLQUE5RCxDQUF4QjtBQUNBLFlBQU1DLGtCQUFrQkwsZ0JBQWdCTSxRQUFoQixDQUF5QlQsR0FBekIsQ0FBeEI7QUFDQVEsd0JBQWdCRSxJQUFoQixDQUFxQixVQUFDRCxRQUFELEVBQWM7QUFDakMsY0FBSUEsUUFBSixFQUFjO0FBQ1pMLGdCQUFJTyxLQUFKLENBQVVDLGlCQUFWLENBQTRCO0FBQzFCQyxxQkFBTyxPQURtQjtBQUUxQkMsdUJBQVksTUFBS2xELGVBQWpCLFdBQXFDbUMsVUFBVUUsSUFBVixDQUFlYyxNQUFmLElBQXlCLEVBQTlEO0FBRjBCLGFBQTVCO0FBSUE7QUFDRDtBQUNELGdCQUFLQyxtQkFBTCxDQUF5QmxCLEdBQXpCLEVBQThCQyxTQUE5QjtBQUNELFNBVEQ7QUFVRDtBQUNGLEtBN0ZzSTtBQThGdklpQix5QkFBcUIsU0FBU0EsbUJBQVQsQ0FBNkJsQixHQUE3QixFQUFrQ0MsU0FBbEMsRUFBNkM7QUFDaEUsVUFBTU4sT0FBT1csSUFBSWEsT0FBSixDQUFZLHNCQUFaLENBQWI7QUFDQSxVQUFJeEIsSUFBSixFQUFVO0FBQ1IsWUFBTXlCLFVBQVU7QUFDZEMsa0JBQVEsSUFETTtBQUVkQyxtQkFBUztBQUNQQyx3QkFBWXRCLFVBQVVFO0FBRGY7QUFGSyxTQUFoQjtBQU1BUixhQUFLNkIsSUFBTCxDQUFVSixPQUFWO0FBQ0Q7QUFDRixLQXpHc0k7QUEwR3ZJSyx1QkFBbUIsU0FBU0EsaUJBQVQsQ0FBMkJDLFdBQTNCLEVBQXdDO0FBQ3pELFVBQU1DLElBQUksS0FBS0MsaUJBQUwsQ0FBdUJGLFlBQVlHLFdBQVosRUFBdkIsQ0FBVjtBQUNBLGlEQUF5Q0YsQ0FBekMsdUNBQTRFLENBQTVFLDBEQUFrSUEsQ0FBbEksa0RBQWdMQSxDQUFoTDtBQUNELEtBN0dzSTtBQThHdklHLHFCQUFpQixTQUFTQSxlQUFULENBQXlCQyxLQUF6QixFQUFnQztBQUMvQyxVQUFNQyxPQUFPMUIsSUFBSTJCLGVBQUosQ0FBb0JDLHlCQUFwQixDQUE4QyxxQkFBOUMsRUFBcUVILEtBQXJFLENBQWI7QUFDQSxVQUFJQyxJQUFKLEVBQVU7QUFDUixlQUFPQSxJQUFQO0FBQ0Q7QUFDRCxhQUFPRCxLQUFQO0FBQ0Q7QUFwSHNJLEdBQXpILENBQWhCOztBQXVIQSxpQkFBS0ksU0FBTCxDQUFlLDhCQUFmLEVBQStDL0UsT0FBL0M7b0JBQ2VBLE8iLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBMaXN0IGZyb20gJ2FyZ29zL0xpc3QnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJ2NybS9Gb3JtYXQnO1xyXG5pbXBvcnQgYWN0aW9uIGZyb20gJ2NybS9BY3Rpb24nO1xyXG5pbXBvcnQgX1JpZ2h0RHJhd2VyTGlzdE1peGluIGZyb20gJ2NybS9WaWV3cy9fUmlnaHREcmF3ZXJMaXN0TWl4aW4nO1xyXG5pbXBvcnQgX01ldHJpY0xpc3RNaXhpbiBmcm9tICdjcm0vVmlld3MvX01ldHJpY0xpc3RNaXhpbic7XHJcbmltcG9ydCBfR3JvdXBMaXN0TWl4aW4gZnJvbSAnY3JtL1ZpZXdzL19Hcm91cExpc3RNaXhpbic7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi8uLi9Nb2RlbHMvTmFtZXMnO1xyXG5pbXBvcnQgTU9ERUxfVFlQRVMgZnJvbSAnYXJnb3MvTW9kZWxzL1R5cGVzJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5pbXBvcnQgdXRpbGl0eSBmcm9tICcuLi8uLi9VdGlsaXR5JztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3NhbGVzT3JkZXJzTGlzdCcpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLlNhbGVzT3JkZXJzLkxpc3QnLCBbTGlzdCwgX1JpZ2h0RHJhd2VyTGlzdE1peGluLCBfTWV0cmljTGlzdE1peGluLCBfR3JvdXBMaXN0TWl4aW5dLCB7XHJcbiAgZm9ybWF0dGVyOiBmb3JtYXQsXHJcbiAgdXRpbDogdXRpbGl0eSxcclxuICAvLyBUZW1wbGF0ZXNcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPHAgY2xhc3M9XCJsaXN0dmlldy1oZWFkaW5nXCI+eyU6ICQuU2FsZXNPcmRlck51bWJlciAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLmVycE9yZGVySWRUZXh0ICV9PC9sYWJlbD4geyU6ICQuRXJwRXh0SWQgJX08L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj48bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5jdXN0b21lclBPTnVtYmVyVGV4dCAlfTwvbGFiZWw+IHslOiAkLkN1c3RvbWVyUHVyY2hhc2VPcmRlck51bWJlciAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLmFjY291bnRUZXh0ICV9PC9sYWJlbD4geyU6ICQuQWNjb3VudC5BY2NvdW50TmFtZSAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLm9yZGVyRGF0ZVRleHQgJX08L2xhYmVsPiB7JTogJCQuZm9ybWF0dGVyLmRhdGUoJC5PcmRlckRhdGUpICV9PC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQuYmFzZUdyYW5kVG90YWxUZXh0ICV9PC9sYWJlbD4gJyxcclxuICAgICd7JTogJCQudXRpbC5mb3JtYXRNdWx0aUN1cnJlbmN5KCQuR3JhbmRUb3RhbCwgJC5CYXNlQ3VycmVuY3lDb2RlKSAlfScsXHJcbiAgICAnPC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQuZ3JhbmRUb3RhbFRleHQgJX08L2xhYmVsPiAnLFxyXG4gICAgJ3slOiAkJC51dGlsLmZvcm1hdE11bHRpQ3VycmVuY3koJC5Eb2NHcmFuZFRvdGFsLCAkLkN1cnJlbmN5Q29kZSkgJX0nLFxyXG4gICAgJzwvcD4nLFxyXG4gICAgJ3slIGlmICgkLkVycEV4dElkKSB7ICV9JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj48bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5lcnBTdGF0dXNMYWJlbFRleHQgJX08L2xhYmVsPiB7JTogJCQuZm9ybWF0RXJwU3RhdHVzKCQuRVJQU2FsZXNPcmRlci5FUlBTdGF0dXMpICV9PC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQuZG9jdW1lbnREYXRlVGV4dCAlfTwvbGFiZWw+IHslOiAkJC5mb3JtYXR0ZXIuZGF0ZSgkLkVycERvY3VtZW50RGF0ZSkgJX08L3A+JyxcclxuICAgICd7JSB9IGVsc2UgeyAlfScsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQuc3RhdHVzTGFiZWxUZXh0ICV9PC9sYWJlbD4geyU6ICQuU3RhdHVzICV9PC9wPicsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgXSksXHJcblxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIGFjY291bnRUZXh0OiByZXNvdXJjZS5hY2NvdW50VGV4dCxcclxuICBlcnBPcmRlcklkVGV4dDogcmVzb3VyY2UuZXJwT3JkZXJJZFRleHQsXHJcbiAgZ3JhbmRUb3RhbFRleHQ6IHJlc291cmNlLmdyYW5kVG90YWxUZXh0LFxyXG4gIGJhc2VHcmFuZFRvdGFsVGV4dDogcmVzb3VyY2UuYmFzZUdyYW5kVG90YWxUZXh0LFxyXG4gIHN0YXR1c0xhYmVsVGV4dDogcmVzb3VyY2Uuc3RhdHVzTGFiZWxUZXh0LFxyXG4gIGVycFN0YXR1c0xhYmVsVGV4dDogcmVzb3VyY2UuZXJwU3RhdHVzTGFiZWxUZXh0LFxyXG4gIGN1c3RvbWVyUE9OdW1iZXJUZXh0OiByZXNvdXJjZS5jdXN0b21lclBPTnVtYmVyVGV4dCxcclxuICBvcmRlckRhdGVUZXh0OiByZXNvdXJjZS5vcmRlckRhdGVUZXh0LFxyXG4gIHZpZXdBY2NvdW50QWN0aW9uVGV4dDogcmVzb3VyY2Uudmlld0FjY291bnRBY3Rpb25UZXh0LFxyXG4gIGFkZExpbmVJdGVtc1RleHQ6IHJlc291cmNlLmFkZExpbmVJdGVtc1RleHQsXHJcbiAgZG9jdW1lbnREYXRlVGV4dDogcmVzb3VyY2UuZG9jdW1lbnREYXRlVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdzYWxlc29yZGVyX2xpc3QnLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuU0FMRVNPUkRFUixcclxuICByZXNvdXJjZUtpbmQ6ICdzYWxlc09yZGVycycsXHJcbiAgYWxsb3dTZWxlY3Rpb246IHRydWUsXHJcbiAgZW5hYmxlQWN0aW9uczogdHJ1ZSxcclxuICBkZXRhaWxWaWV3OiAnc2FsZXNvcmRlcl9kZXRhaWwnLFxyXG4gIGluc2VydFZpZXc6ICdzYWxlc29yZGVyX2VkaXQnLFxyXG4gIHNlY3VyaXR5OiAnRW50aXRpZXMvU2FsZXNPcmRlci9WaWV3JyxcclxuICBpbnNlcnRTZWN1cml0eTogJ0VudGl0aWVzL1NhbGVzT3JkZXIvQWRkJyxcclxuXHJcbiAgLy8gQ2FyZCBsYXlvdXRcclxuICBpdGVtSWNvbkNsYXNzOiAnY2FydCcsXHJcblxyXG4gIC8vIEdyb3Vwc1xyXG4gIGVuYWJsZUR5bmFtaWNHcm91cExheW91dDogdHJ1ZSxcclxuICBncm91cHNFbmFibGVkOiB0cnVlLFxyXG5cclxuICAvLyBNZXRyaWNzXHJcbiAgZW50aXR5TmFtZTogJ1NhbGVzT3JkZXInLFxyXG5cclxuICBjcmVhdGVBY3Rpb25MYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbkxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmFjdGlvbnMgfHwgKHRoaXMuYWN0aW9ucyA9IFt7XHJcbiAgICAgIGlkOiAndmlld0FjY291bnQnLFxyXG4gICAgICBsYWJlbDogdGhpcy52aWV3QWNjb3VudEFjdGlvblRleHQsXHJcbiAgICAgIGVuYWJsZWQ6IGFjdGlvbi5oYXNQcm9wZXJ0eS5iaW5kRGVsZWdhdGUodGhpcywgJ0FjY291bnQuJGtleScpLFxyXG4gICAgICBmbjogYWN0aW9uLm5hdmlnYXRlVG9FbnRpdHkuYmluZERlbGVnYXRlKHRoaXMsIHtcclxuICAgICAgICB2aWV3OiAnYWNjb3VudF9kZXRhaWwnLFxyXG4gICAgICAgIGtleVByb3BlcnR5OiAnQWNjb3VudC4ka2V5JyxcclxuICAgICAgICB0ZXh0UHJvcGVydHk6ICdBY2NvdW50LkFjY291bnROYW1lJyxcclxuICAgICAgfSksXHJcbiAgICB9LCB7XHJcbiAgICAgIGlkOiAnYWRkT3JkZXJJdGVtJyxcclxuICAgICAgY2xzOiAnYnVsbGV0LWxpc3QnLFxyXG4gICAgICBsYWJlbDogdGhpcy5hZGRMaW5lSXRlbXNUZXh0LFxyXG4gICAgICBmbjogdGhpcy5vbkFkZExpbmVJdGVtcyxcclxuICAgICAgc2VjdXJpdHk6ICdFbnRpdGllcy9TYWxlc09yZGVyL0FkZCcsXHJcbiAgICB9XSk7XHJcbiAgfSxcclxuICBvbkFkZExpbmVJdGVtczogZnVuY3Rpb24gb25BZGRMaW5lSXRlbXMoZXZ0LCBzZWxlY3Rpb24pIHtcclxuICAgIGNvbnN0IGtleSA9IHNlbGVjdGlvbiAmJiBzZWxlY3Rpb24uZGF0YSAmJiBzZWxlY3Rpb24uZGF0YS4ka2V5O1xyXG4gICAgaWYgKGtleSkge1xyXG4gICAgICBjb25zdCBzYWxlc09yZGVyTW9kZWwgPSBBcHAuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKE1PREVMX05BTUVTLlNBTEVTT1JERVIsIE1PREVMX1RZUEVTLlNEQVRBKTtcclxuICAgICAgY29uc3QgaXNDbG9zZWRQcm9taXNlID0gc2FsZXNPcmRlck1vZGVsLmlzQ2xvc2VkKGtleSk7XHJcbiAgICAgIGlzQ2xvc2VkUHJvbWlzZS50aGVuKChpc0Nsb3NlZCkgPT4ge1xyXG4gICAgICAgIGlmIChpc0Nsb3NlZCkge1xyXG4gICAgICAgICAgQXBwLm1vZGFsLmNyZWF0ZVNpbXBsZUFsZXJ0KHtcclxuICAgICAgICAgICAgdGl0bGU6ICdhbGVydCcsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGAke3RoaXMuc3RhdHVzTGFiZWxUZXh0fTogJHtzZWxlY3Rpb24uZGF0YS5TdGF0dXMgfHwgJyd9YCxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5hdmlnYXRlVG9MaW5lSXRlbXMoZXZ0LCBzZWxlY3Rpb24pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIG5hdmlnYXRlVG9MaW5lSXRlbXM6IGZ1bmN0aW9uIG5hdmlnYXRlVG9MaW5lSXRlbXMoZXZ0LCBzZWxlY3Rpb24pIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldygnc2FsZXNvcmRlcl9pdGVtX2VkaXQnKTtcclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgaW5zZXJ0OiB0cnVlLFxyXG4gICAgICAgIGNvbnRleHQ6IHtcclxuICAgICAgICAgIFNhbGVzT3JkZXI6IHNlbGVjdGlvbi5kYXRhLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcbiAgICAgIHZpZXcuc2hvdyhvcHRpb25zKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGZvcm1hdFNlYXJjaFF1ZXJ5OiBmdW5jdGlvbiBmb3JtYXRTZWFyY2hRdWVyeShzZWFyY2hRdWVyeSkge1xyXG4gICAgY29uc3QgcSA9IHRoaXMuZXNjYXBlU2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkudG9VcHBlckNhc2UoKSk7XHJcbiAgICByZXR1cm4gYCh1cHBlcihTYWxlc09yZGVyTnVtYmVyKSBsaWtlIFwiJHtxfSVcIiApIG9yICh1cHBlcihFcnBFeHRJZCkgbGlrZSBcIiR7MH0lXCIgKSBvciAodXBwZXIoQ3VzdG9tZXJQdXJjaGFzZU9yZGVyTnVtYmVyKSBsaWtlIFwiJHtxfSVcIiApIG9yICh1cHBlcihBY2NvdW50LkFjY291bnROYW1lKSBsaWtlIFwiJHtxfSVcIiApIGA7XHJcbiAgfSxcclxuICBmb3JtYXRFcnBTdGF0dXM6IGZ1bmN0aW9uIGZvcm1hdEVycFN0YXR1cyh2YWx1ZSkge1xyXG4gICAgY29uc3QgdGV4dCA9IEFwcC5waWNrbGlzdFNlcnZpY2UuZ2V0UGlja2xpc3RJdGVtVGV4dEJ5Q29kZSgnRXJwU2FsZXNPcmRlclN0YXR1cycsIHZhbHVlKTtcclxuICAgIGlmICh0ZXh0KSB7XHJcbiAgICAgIHJldHVybiB0ZXh0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLlZpZXdzLlNhbGVzT3JkZXJzLkxpc3QnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19