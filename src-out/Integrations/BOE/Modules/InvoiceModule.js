define("crm/Integrations/BOE/Modules/InvoiceModule", ["exports", "dojo/_base/declare", "dojo/_base/lang", "./_Module", "../Views/ERPInvoices/Detail", "../Views/ERPInvoices/List", "../Views/ERPInvoiceItems/Detail", "../Views/ERPInvoiceItems/List", "../Views/ERPReceivables/List", "../Models/ErpInvoice/Offline", "../Models/ErpInvoice/SData", "../Models/ErpInvoiceItem/Offline", "../Models/ErpInvoiceItem/SData", "../Models/ErpInvoicePerson/Offline", "../Models/ErpInvoicePerson/SData"], function (_exports, _declare, _lang, _Module2, _Detail, _List, _Detail2, _List2, _List3, _Offline, _SData, _Offline2, _SData2, _Offline3, _SData3) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _Module2 = _interopRequireDefault(_Module2);
  _Detail = _interopRequireDefault(_Detail);
  _List = _interopRequireDefault(_List);
  _Detail2 = _interopRequireDefault(_Detail2);
  _List2 = _interopRequireDefault(_List2);
  _List3 = _interopRequireDefault(_List3);

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
  var __class = (0, _declare["default"])('crm.Integrations.BOE.Modules.InvoiceModule', [_Module2["default"]], {
    defaultViews: ['invoice_list'],
    init: function init() {
      App.picklistService.registerPicklistToView('ErpInvoiceStatus');
    },
    loadViews: function loadViews() {
      var am = this.applicationModule;
      am.registerView(new _List["default"]());
      am.registerView(new _Detail["default"]());
      am.registerView(new _Detail2["default"]());
      am.registerView(new _List2["default"]({
        id: 'invoice_items_related',
        hasSettings: false,
        expose: false
      }));
      am.registerView(new _List3["default"]({
        id: 'invoice_receivables_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false
      }));
    },
    loadCustomizations: function loadCustomizations() {
      var am = this.applicationModule;
      am.registerCustomization('detail/tools', 'invoice_detail', {
        at: function at(tool) {
          return tool.id === 'edit';
        },
        type: 'remove'
      });
      am.registerCustomization('detail/tools', 'invoice_item_detail', {
        at: function at(tool) {
          return tool.id === 'edit';
        },
        type: 'remove'
      });
      am.registerCustomization('list/tools', 'invoice_list', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });
      am.registerCustomization('list/tools', 'invoice_items_related', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });
    },
    loadToolbars: function loadToolbars() {}
  });

  _lang["default"].setObject('icboe.Modules.InvoiceModule', __class);

  var _default = __class;
  _exports["default"] = _default;
});