define('crm/Integrations/BOE/Modules/BillToAccountModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './_Module', '../../../Views/Account/List', '../Views/ERPBillToAccounts/List', '../Views/ERPBillToAccounts/Edit', '../Views/ERPBillToAccounts/Detail', '../Views/ERPBillTos/List', '../Views/ERPInvoices/List', '../Views/Quotes/List', '../Views/ERPReceivables/List', '../Views/Returns/List', '../Views/SalesOrders/List', '../Models/ErpBillToAccount/Offline', '../Models/ErpBillToAccount/SData'], function (module, exports, _declare, _lang, _Module2, _List, _List3, _Edit, _Detail, _List5, _List7, _List9, _List11, _List13, _List15) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Module3 = _interopRequireDefault(_Module2);

  var _List2 = _interopRequireDefault(_List);

  var _List4 = _interopRequireDefault(_List3);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _List6 = _interopRequireDefault(_List5);

  var _List8 = _interopRequireDefault(_List7);

  var _List10 = _interopRequireDefault(_List9);

  var _List12 = _interopRequireDefault(_List11);

  var _List14 = _interopRequireDefault(_List13);

  var _List16 = _interopRequireDefault(_List15);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  const __class = (0, _declare2.default)('crm.Integrations.BOE.Modules.BillToAccountModule', [_Module3.default], {
    init: function init() {},
    loadViews: function loadViews() {
      const am = this.applicationModule;

      am.registerView(new _Detail2.default());
      am.registerView(new _Edit2.default());
      am.registerView(new _List4.default());

      am.registerView(new _List2.default({
        id: 'billtoaccount_accounts_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List2.default({
        id: 'billtoaccount_accounts',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List6.default({
        id: 'billtoaccount_erpbilltos',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List10.default({
        id: 'billtoaccount_openquotes_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List16.default({
        id: 'billtoaccount_salesorders_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List8.default({
        id: 'billtoaccount_openinvoices_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List12.default({
        id: 'billtoaccount_receivables_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List14.default({
        id: 'billtoaccount_returns_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
    },
    loadCustomizations: function loadCustomizations() {
      this.applicationModule.registerCustomization('detail/tools', 'erpbilltoaccounts_detail', {
        at: function at(tool) {
          return tool.id === 'edit';
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

  _lang2.default.setObject('icboe.Modules.BillToAccountModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});