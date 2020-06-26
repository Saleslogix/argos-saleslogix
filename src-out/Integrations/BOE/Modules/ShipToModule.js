define("crm/Integrations/BOE/Modules/ShipToModule", ["exports", "dojo/_base/declare", "dojo/_base/lang", "./_Module", "crm/Views/Account/List", "../Views/ERPBillTos/List", "../Views/ERPInvoices/List", "../Views/Quotes/List", "../Views/ERPReceivables/List", "../Views/Returns/List", "../Views/SalesOrders/List", "../Views/ERPShipTos/Detail", "../Views/ERPShipTos/Edit", "../Views/ERPShipTos/List", "../Views/SyncResults/List", "../Models/ErpShipToAccount/Offline", "../Models/ErpShipToAccount/SData", "../Models/ErpShipTo/Offline", "../Models/ErpShipTo/SData"], function (_exports, _declare, _lang, _Module2, _List, _List2, _List3, _List4, _List5, _List6, _List7, _Detail, _Edit, _List8, _List9, _Offline, _SData, _Offline2, _SData2) {
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
  _Detail = _interopRequireDefault(_Detail);
  _Edit = _interopRequireDefault(_Edit);
  _List8 = _interopRequireDefault(_List8);
  _List9 = _interopRequireDefault(_List9);

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
  var __class = (0, _declare["default"])('crm.Integrations.BOE.Modules.ShipToModule', [_Module2["default"]], {
    init: function init() {
      App.picklistService.registerPicklistToView('SyncStatus', 'erpshipto_detail');
    },
    loadViews: function loadViews() {
      var am = this.applicationModule;
      am.registerView(new _List8["default"]());
      am.registerView(new _Detail["default"]());
      am.registerView(new _Edit["default"]());
      am.registerView(new _List["default"]({
        id: 'shipto_accounts_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      am.registerView(new _List2["default"]({
        id: 'shipto_billtos_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      am.registerView(new _List4["default"]({
        id: 'shipto_quotes_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      am.registerView(new _List7["default"]({
        id: 'shipto_orders_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      am.registerView(new _List5["default"]({
        id: 'shipto_receivables_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      am.registerView(new _List3["default"]({
        id: 'shipto_invoices_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      am.registerView(new _List6["default"]({
        id: 'shipto_returns_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      am.registerView(new _List9["default"]({
        id: 'shipto_synchistory_related'
      }));
    },
    loadCustomizations: function loadCustomizations() {
      var am = this.applicationModule;
      am.registerCustomization('detail/tools', 'erpshipto_detail', {
        at: function at(tool) {
          return tool.id === 'edit';
        },
        type: 'remove'
      });
      am.registerCustomization('list/tools', 'shipto_accounts_related', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });
      am.registerCustomization('list/tools', 'shipto_receivables_related', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });
      am.registerCustomization('list/tools', 'shipto_invoices_related', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });
      am.registerCustomization('list/tools', 'shipto_returns_related', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });
    },
    loadToolbars: function loadToolbars() {}
  });

  _lang["default"].setObject('icboe.Modules.ShipToModule', __class);

  var _default = __class;
  _exports["default"] = _default;
});