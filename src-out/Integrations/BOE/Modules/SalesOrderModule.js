define("crm/Integrations/BOE/Modules/SalesOrderModule", ["exports", "dojo/_base/declare", "dojo/_base/lang", "./_Module", "crm/Views/Attachment/List", "../Views/BackOffices/List", "../Views/BackOfficeAccountingEntities/List", "../Views/ERPBillTos/List", "../Views/Carriers/List", "../Views/ERPInvoiceItems/List", "../Views/Locations/List", "../Views/Products/List", "../Views/SalesOrders/List", "../Views/SalesOrders/Detail", "../Views/SalesOrders/Edit", "../Views/SalesOrderItems/List", "../Views/ERPSalesOrderPersons/List", "../Views/ERPShipTos/List", "../Views/ERPShipmentItems/List", "../Views/SyncResults/List", "../Models/SalesOrder/Offline", "../Models/SalesOrder/SData", "../Models/ErpSalesOrderPerson/Offline", "../Models/ErpSalesOrderPerson/SData"], function (_exports, _declare, _lang, _Module2, _List, _List2, _List3, _List4, _List5, _List6, _List7, _List8, _List9, _Detail, _Edit, _List10, _List11, _List12, _List13, _List14, _Offline, _SData, _Offline2, _SData2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _Module2 = _interopRequireDefault(_Module2);
  _List = _interopRequireDefault(_List);
  _List2 = _interopRequireDefault(_List2);
  _List3 = _interopRequireDefault(_List3);
  _List4 = _interopRequireDefault(_List4);
  _List5 = _interopRequireDefault(_List5);
  _List6 = _interopRequireDefault(_List6);
  _List7 = _interopRequireDefault(_List7);
  _List8 = _interopRequireDefault(_List8);
  _List9 = _interopRequireDefault(_List9);
  _Detail = _interopRequireDefault(_Detail);
  _Edit = _interopRequireDefault(_Edit);
  _List10 = _interopRequireDefault(_List10);
  _List11 = _interopRequireDefault(_List11);
  _List12 = _interopRequireDefault(_List12);
  _List13 = _interopRequireDefault(_List13);
  _List14 = _interopRequireDefault(_List14);

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
  var __class = (0, _declare["default"])('crm.Integrations.BOE.Modules.SalesOrderModule', [_Module2["default"]], {
    defaultViews: ['salesorder_list'],
    init: function init() {
      App.picklistService.registerPicklistToView('SyncStatus', 'salesorder_detail');
      App.picklistService.registerPicklistToView('ErpSalesOrderStatus', 'salesorder_detail');
    },
    loadViews: function loadViews() {
      var am = this.applicationModule;
      am.registerView(new _List9["default"]({
        expose: true
      }));
      am.registerView(new _Detail["default"]());
      am.registerView(new _Edit["default"]());
      am.registerView(new _List10["default"]({
        id: 'salesorder_items_related',
        hasSettings: false,
        expose: false,
        addLineItems: function addLineItems() {
          var _this = this;

          if (!this.options.selectedEntry.ErpLogicalId) {
            App.modal.createSimpleDialog({
              title: 'alert',
              content: this.accountingEntityRequiredText,
              getContent: function getContent() {
                return;
              }
            }).then(function () {
              var orderEdit = App.getView('salesorder_edit');

              if (orderEdit) {
                var options = {
                  entry: _this.options.selectedEntry,
                  fromContext: _this.options.fromContext
                };
                orderEdit.show(options);
              }
            });
            return;
          }

          var view = App.getView('salesorder_item_edit');

          if (view) {
            var options = {
              insert: true,
              context: {
                SalesOrder: this.options.selectedEntry
              }
            };
            this.refreshRequired = true;
            view.show(options);
          }
        },
        createToolLayout: function createToolLayout() {
          return this.tools || (this.tools = {
            tbar: [{
              id: 'new',
              svg: 'add',
              action: 'addLineItems',
              security: this.app.getViewSecurity(this.insertView, 'insert')
            }]
          });
        }
      }));
      am.registerView(new _List5["default"]({
        id: 'salesorder_carriers'
      }));
      am.registerView(new _List["default"]({
        id: 'salesorder_attachments_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      am.registerView(new _List6["default"]({
        id: 'salesorder_invoice_items_related',
        hasSettings: false,
        expose: false
      }));
      am.registerView(new _List13["default"]({
        id: 'salesorder_shipment_items_related',
        hasSettings: false,
        expose: false
      }));
      am.registerView(new _List8["default"]({
        id: 'salesorder_product_related',
        expose: false
      }));
      am.registerView(new _List2["default"]({
        id: 'salesorder_backoffice_related',
        hasSettings: false,
        groupsEnabled: false
      }));
      am.registerView(new _List3["default"]({
        id: 'salesorder_backofficeaccountingentity_related',
        hasSettings: false,
        groupsEnabled: false
      }));
      am.registerView(new _List7["default"]({
        id: 'order_location_list',
        hasSettings: false
      }));
      am.registerView(new _List7["default"]({
        id: 'order_warehouse_list',
        hasSettings: false
      }));
      am.registerView(new _List14["default"]({
        id: 'order_syncresult_related',
        hasSettings: false
      }));
      am.registerView(new _List4["default"]({
        id: 'salesorder_billTo_related',
        hasSettings: false,
        expose: false,
        groupsEnabled: false
      }));
      am.registerView(new _List12["default"]({
        id: 'salesorder_shipTo_related',
        hasSettings: false,
        expose: false,
        groupsEnabled: false
      }));
      am.registerView(new _List11["default"]({
        id: 'salesorder_salesperson_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
    },
    loadCustomizations: function loadCustomizations() {
      var am = this.applicationModule;
      am.registerCustomization('list/tools', 'salesorder_invoice_items_related', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });
      am.registerCustomization('list/tools', 'salesorder_shipment_items_related', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });
    },
    loadToolbars: function loadToolbars() {}
  });

  _lang["default"].setObject('icboe.Modules.SalesOrderModule', __class);

  var _default = __class;
  _exports["default"] = _default;
});