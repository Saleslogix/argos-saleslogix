define('crm/Integrations/BOE/Views/ERPBillTos/Detail', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'crm/Format', 'argos/Detail', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _Format, _Detail, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Format2 = _interopRequireDefault(_Format);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _Names2 = _interopRequireDefault(_Names);

  var _I18n2 = _interopRequireDefault(_I18n);

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

  var resource = (0, _I18n2.default)('erpBillTosDetail');

  /**
   * @class crm.Integrations.BOE.Views.ERPBillTos.Detail
   * @extends argos.Detail
   */
  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPBillTos.Detail', [_Detail2.default], /** @lends crm.Integrations.BOE.Views.ERPBillTos.Detail# */{
    // Localization
    titleText: resource.titleText,
    relatedItemsText: resource.relatedItemsText,
    entityText: resource.entityText,
    backOfficeIdText: resource.backOfficeIdText,
    nameText: resource.nameText,
    faxText: resource.faxText,
    phoneText: resource.phoneText,
    emailText: resource.emailText,
    addressText: resource.addressText,
    statusText: resource.statusText,
    syncStatusText: resource.syncStatusText,
    logicalIdText: resource.logicalIdText,
    accountingEntityIdText: resource.accountingEntityIdText,
    ownerText: resource.ownerText,
    shipToText: resource.shipToText,
    accountsText: resource.accountsText,
    contactAssociationsText: resource.contactAssociationsText,
    receivablesText: resource.receivablesText,
    invoicesText: resource.invoicesText,
    returnsText: resource.returnsText,
    quotesText: resource.quotesText,
    salesOrdersText: resource.salesOrdersText,
    syncHistoryText: resource.syncHistoryText,

    // View Properties
    id: 'erpbillto_detail',
    modelName: _Names2.default.ERPBILLTO,
    resourceKind: 'erpBillTos',
    enableOffline: true,

    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        title: this.actionsText,
        list: true,
        cls: 'action-list',
        name: 'QuickActionsSection',
        children: []
      }, {
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          name: 'ErpExtId',
          property: 'ErpExtId',
          label: this.backOfficeIdText
        }, {
          name: 'Name',
          property: 'Name',
          label: this.nameText
        }, {
          name: 'Phone',
          property: 'MainPhone',
          label: this.phoneText
        }, {
          name: 'Email',
          property: 'Email',
          label: this.emailText
        }, {
          name: 'Address',
          property: 'Address',
          label: this.addressText,
          renderer: function renderer(val) {
            if (val) {
              return _Format2.default.address(val);
            }
          }
        }, {
          name: 'Status',
          property: 'ErpStatus',
          label: this.statusText
        }, {
          name: 'Owner',
          property: 'Owner.OwnerDescription',
          label: this.ownerText
        }, {
          name: 'Fax',
          property: 'Fax',
          label: this.faxText
        }, {
          name: 'SyncStatus',
          property: 'SyncStatus',
          label: this.syncStatusText,
          renderer: this.formatPicklist('SyncStatus')
        }, {
          name: 'LogicalId',
          property: 'ErpLogicalId',
          label: this.logicalIdText
        }, {
          name: 'AccountingEntityId',
          property: 'ErpAccountingEntityId',
          label: this.accountingEntityIdText
        }]
      }, {
        title: this.relatedItemsText,
        name: 'RelatedItemsSection',
        list: true,
        children: [{
          name: 'Accounts',
          label: this.accountsText,
          where: function where(entry) {
            return 'ErpBillToAccounts.ErpBillTo.Id eq "' + entry.$key + '"';
          },
          view: 'billto_accounts_related'
        }, {
          name: 'ShipTos',
          label: this.shipToText,
          where: function where(entry) {
            return 'ErpBillToShipTos.ErpShipTo.Id eq "' + entry.$key + '"';
          },
          view: 'billto_shiptos_related'
        }, {
          name: 'Quotes',
          label: this.quotesText,
          where: function where(entry) {
            return 'BillTo.Id eq "' + entry.$key + '"';
          },
          view: 'billto_quotes_related'
        }, {
          name: 'SalesOrders',
          label: this.salesOrdersText,
          where: function where(entry) {
            return 'ErpBillTo.Id eq "' + entry.$key + '"';
          },
          view: 'billto_orders_related'
        }, {
          name: 'Receivables',
          label: this.receivablesText,
          where: function where(entry) {
            return 'ErpBillTo.Id eq "' + entry.$key + '"';
          },
          view: 'billto_receivables_related'
        }, {
          name: 'Invoices',
          label: this.invoicesText,
          where: function where(entry) {
            return 'ErpBillTo.Id eq "' + entry.$key + '"';
          },
          view: 'billto_invoices_related'
        }, {
          name: 'Returns',
          label: this.returnsText,
          where: function where(entry) {
            return 'ErpBillTo.Id eq "' + entry.$key + '"';
          },
          view: 'billto_returns_related'
        }, {
          name: 'SyncHistory',
          label: this.syncHistoryText,
          where: function where(entry) {
            return 'EntityType eq "ERPBillTo" and EntityId eq "' + entry.$key + '"';
          },
          view: 'billto_synchistory_related'
        }]
      }]);
    },
    formatPicklist: function formatPicklist(property) {
      return _Format2.default.picklist(this.app.picklistService, this._model, property);
    },
    formatMultiCurrency: function formatMultiCurrency(val) {
      if (App.hasMultiCurrency() && val) {
        if (this.entry.ErpInvoice.CurrencyCode) {
          return _Format2.default.multiCurrency.call(null, val, this.entry.ErpInvoice.CurrencyCode);
        }
        return _Format2.default.currency.call(null, val);
      }
      return _Format2.default.currency.call(null, val);
    }
  });

  _lang2.default.setObject('icboe.Views.ERPBillTos.Detail', __class);
  exports.default = __class;
  module.exports = exports['default'];
});