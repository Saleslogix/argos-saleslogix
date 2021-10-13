define('crm/Integrations/BOE/Modules/BillToModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './_Module', '../../../Views/Account/List', '../Views/ERPBillTos/Detail', '../Views/ERPBillTos/Edit', '../Views/ERPBillTos/List', '../Views/ERPInvoices/List', '../Views/Quotes/List', '../Views/ERPReceivables/List', '../Views/Returns/List', '../Views/SalesOrders/List', '../Views/ERPShipTos/List', '../Views/SyncResults/List', '../Models/ErpBillTo/Offline', '../Models/ErpBillTo/SData'], function (module, exports, _declare, _lang, _Module2, _List, _Detail, _Edit, _List3, _List5, _List7, _List9, _List11, _List13, _List15, _List17) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Module3 = _interopRequireDefault(_Module2);

  var _List2 = _interopRequireDefault(_List);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _List4 = _interopRequireDefault(_List3);

  var _List6 = _interopRequireDefault(_List5);

  var _List8 = _interopRequireDefault(_List7);

  var _List10 = _interopRequireDefault(_List9);

  var _List12 = _interopRequireDefault(_List11);

  var _List14 = _interopRequireDefault(_List13);

  var _List16 = _interopRequireDefault(_List15);

  var _List18 = _interopRequireDefault(_List17);

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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Modules.BillToModule', [_Module3.default], {
    init: function init() {
      App.picklistService.registerPicklistToView('SyncStatus', 'erpbillto_detail');
    },
    loadViews: function loadViews() {
      var am = this.applicationModule;
      am.registerView(new _List4.default());
      am.registerView(new _Detail2.default());
      am.registerView(new _Edit2.default());

      am.registerView(new _List2.default({
        id: 'billto_accounts_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      am.registerView(new _List16.default({
        id: 'billto_shiptos_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      am.registerView(new _List8.default({
        id: 'billto_quotes_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      am.registerView(new _List14.default({
        id: 'billto_orders_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      am.registerView(new _List10.default({
        id: 'billto_receivables_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      am.registerView(new _List6.default({
        id: 'billto_invoices_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      am.registerView(new _List12.default({
        id: 'billto_returns_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      am.registerView(new _List18.default({
        id: 'billto_synchistory_related'
      }));
    },
    loadCustomizations: function loadCustomizations() {
      var am = this.applicationModule;
      am.registerCustomization('detail/tools', 'erpbillto_detail', {
        at: function at(tool) {
          return tool.id === 'edit';
        },
        type: 'remove'
      });
      am.registerCustomization('list/tools', 'billto_accounts_related', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });
      am.registerCustomization('list/tools', 'billto_receivables_related', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });
      am.registerCustomization('list/tools', 'billto_invoices_related', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });
      am.registerCustomization('list/tools', 'billto_returns_related', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });
    },
    loadToolbars: function loadToolbars() {}
  });

  _lang2.default.setObject('icboe.Modules.BillToModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});