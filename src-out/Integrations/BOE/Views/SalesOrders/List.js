define("crm/Integrations/BOE/Views/SalesOrders/List", ["exports", "dojo/_base/declare", "dojo/_base/lang", "argos/List", "crm/Format", "crm/Action", "crm/Views/_RightDrawerListMixin", "crm/Views/_MetricListMixin", "crm/Views/_GroupListMixin", "../../Models/Names", "argos/Models/Types", "argos/I18n", "../../Utility"], function (_exports, _declare, _lang, _List, _Format, _Action, _RightDrawerListMixin2, _MetricListMixin2, _GroupListMixin2, _Names, _Types, _I18n, _Utility) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _List = _interopRequireDefault(_List);
  _Format = _interopRequireDefault(_Format);
  _Action = _interopRequireDefault(_Action);
  _RightDrawerListMixin2 = _interopRequireDefault(_RightDrawerListMixin2);
  _MetricListMixin2 = _interopRequireDefault(_MetricListMixin2);
  _GroupListMixin2 = _interopRequireDefault(_GroupListMixin2);
  _Names = _interopRequireDefault(_Names);
  _Types = _interopRequireDefault(_Types);
  _I18n = _interopRequireDefault(_I18n);
  _Utility = _interopRequireDefault(_Utility);

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
  var resource = (0, _I18n["default"])('salesOrdersList');

  var __class = (0, _declare["default"])('crm.Integrations.BOE.Views.SalesOrders.List', [_List["default"], _RightDrawerListMixin2["default"], _MetricListMixin2["default"], _GroupListMixin2["default"]], {
    formatter: _Format["default"],
    util: _Utility["default"],
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
    modelName: _Names["default"].SALESORDER,
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
        enabled: _Action["default"].hasProperty.bindDelegate(this, 'Account.$key'),
        fn: _Action["default"].navigateToEntity.bindDelegate(this, {
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
        var salesOrderModel = App.ModelManager.getModel(_Names["default"].SALESORDER, _Types["default"].SDATA);
        var isClosedPromise = salesOrderModel.isClosed(key);
        isClosedPromise.then(function (isClosed) {
          if (isClosed) {
            App.modal.createSimpleAlert({
              title: 'alert',
              content: "".concat(_this.statusLabelText, ": ").concat(selection.data.Status || '')
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
      return "(upper(SalesOrderNumber) like \"".concat(q, "%\" ) or (upper(ErpExtId) like \"", 0, "%\" ) or (upper(CustomerPurchaseOrderNumber) like \"").concat(q, "%\" ) or (upper(Account.AccountName) like \"").concat(q, "%\" ) ");
    },
    formatErpStatus: function formatErpStatus(value) {
      var text = App.picklistService.getPicklistItemTextByCode('ErpSalesOrderStatus', value);

      if (text) {
        return text;
      }

      return value;
    }
  });

  _lang["default"].setObject('icboe.Views.SalesOrders.List', __class);

  var _default = __class;
  _exports["default"] = _default;
});