define('crm/Integrations/BOE/Modules/SalesOrderModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './_Module', 'crm/Views/Attachment/List', '../Views/BackOffices/List', '../Views/BackOfficeAccountingEntities/List', '../Views/ERPBillTos/List', '../Views/Carriers/List', '../Views/ERPInvoiceItems/List', '../Views/Locations/List', '../Views/Products/List', '../Views/SalesOrders/List', '../Views/SalesOrders/Detail', '../Views/SalesOrders/Edit', '../Views/SalesOrderItems/List', '../Views/ERPSalesOrderPersons/List', '../Views/ERPShipTos/List', '../Views/ERPShipmentItems/List', '../Views/SyncResults/List', '../Models/SalesOrder/Offline', '../Models/SalesOrder/SData', '../Models/ErpSalesOrderPerson/Offline', '../Models/ErpSalesOrderPerson/SData'], function (module, exports, _declare, _lang, _Module2, _List, _List3, _List5, _List7, _List9, _List11, _List13, _List15, _List17, _Detail, _Edit, _List19, _List21, _List23, _List25, _List27) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Module3 = _interopRequireDefault(_Module2);

  var _List2 = _interopRequireDefault(_List);

  var _List4 = _interopRequireDefault(_List3);

  var _List6 = _interopRequireDefault(_List5);

  var _List8 = _interopRequireDefault(_List7);

  var _List10 = _interopRequireDefault(_List9);

  var _List12 = _interopRequireDefault(_List11);

  var _List14 = _interopRequireDefault(_List13);

  var _List16 = _interopRequireDefault(_List15);

  var _List18 = _interopRequireDefault(_List17);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _List20 = _interopRequireDefault(_List19);

  var _List22 = _interopRequireDefault(_List21);

  var _List24 = _interopRequireDefault(_List23);

  var _List26 = _interopRequireDefault(_List25);

  var _List28 = _interopRequireDefault(_List27);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Modules.SalesOrderModule', [_Module3.default], {
    defaultViews: ['salesorder_list'],
    init: function init() {
      App.picklistService.registerPicklistToView('SyncStatus', 'salesorder_detail');
      App.picklistService.registerPicklistToView('ErpSalesOrderStatus', 'salesorder_detail');
    },
    loadViews: function loadViews() {
      var am = this.applicationModule;
      am.registerView(new _List18.default({
        expose: true
      }));

      am.registerView(new _Detail2.default());
      am.registerView(new _Edit2.default());
      am.registerView(new _List20.default({
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

      am.registerView(new _List10.default({
        id: 'salesorder_carriers'
      }));

      am.registerView(new _List2.default({
        id: 'salesorder_attachments_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List12.default({
        id: 'salesorder_invoice_items_related',
        hasSettings: false,
        expose: false
      }));

      am.registerView(new _List26.default({
        id: 'salesorder_shipment_items_related',
        hasSettings: false,
        expose: false
      }));

      am.registerView(new _List16.default({
        id: 'salesorder_product_related',
        expose: false
      }));

      am.registerView(new _List4.default({
        id: 'salesorder_backoffice_related',
        hasSettings: false,
        groupsEnabled: false
      }));

      am.registerView(new _List6.default({
        id: 'salesorder_backofficeaccountingentity_related',
        hasSettings: false,
        groupsEnabled: false
      }));

      am.registerView(new _List14.default({
        id: 'order_location_list',
        hasSettings: false
      }));

      am.registerView(new _List14.default({
        id: 'order_warehouse_list',
        hasSettings: false
      }));

      am.registerView(new _List28.default({
        id: 'order_syncresult_related',
        hasSettings: false
      }));

      am.registerView(new _List8.default({
        id: 'salesorder_billTo_related',
        hasSettings: false,
        expose: false,
        groupsEnabled: false
      }));

      am.registerView(new _List24.default({
        id: 'salesorder_shipTo_related',
        hasSettings: false,
        expose: false,
        groupsEnabled: false
      }));

      am.registerView(new _List22.default({
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
  }); /* Copyright 2017 Infor
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

  _lang2.default.setObject('icboe.Modules.SalesOrderModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});