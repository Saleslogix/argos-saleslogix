define("crm/Integrations/BOE/Views/ERPShipTos/Detail", ["exports", "dojo/_base/declare", "dojo/_base/lang", "crm/Format", "argos/Detail", "../../Models/Names", "argos/I18n"], function (_exports, _declare, _lang, _Format, _Detail, _Names, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _Format = _interopRequireDefault(_Format);
  _Detail = _interopRequireDefault(_Detail);
  _Names = _interopRequireDefault(_Names);
  _I18n = _interopRequireDefault(_I18n);

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
  var resource = (0, _I18n["default"])('erpShipTosDetail');

  var __class = (0, _declare["default"])('crm.Integrations.BOE.Views.ERPShipTos.Detail', [_Detail["default"]], {
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
    billToText: resource.billToText,
    accountsText: resource.accountsText,
    contactAssociationsText: resource.contactAssociationsText,
    receivablesText: resource.receivablesText,
    invoicesText: resource.invoicesText,
    returnsText: resource.returnsText,
    quotesText: resource.quotesText,
    salesOrdersText: resource.salesOrdersText,
    syncHistoryText: resource.syncHistoryText,
    // View Properties
    id: 'erpshipto_detail',
    modelName: _Names["default"].ERPSHIPTO,
    resourceKind: 'erpShipTos',
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
              return _Format["default"].address(val);
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
            return "ErpShipToAccounts.ErpShipTo.Id eq \"".concat(entry.$key, "\"");
          },
          view: 'shipto_accounts_related'
        }, {
          name: 'BillTos',
          label: this.billToText,
          where: function where(entry) {
            return "ErpBillToShipTos.ErpShipTo.Id eq \"".concat(entry.$key, "\"");
          },
          view: 'shipto_billtos_related'
        }, {
          name: 'Quotes',
          label: this.quotesText,
          where: function where(entry) {
            return "ShipTo.Id eq \"".concat(entry.$key, "\"");
          },
          view: 'shipto_quotes_related'
        }, {
          name: 'SalesOrders',
          label: this.salesOrdersText,
          where: function where(entry) {
            return "ErpShipTo.Id eq \"".concat(entry.$key, "\"");
          },
          view: 'shipto_orders_related'
        }, {
          name: 'Receivables',
          label: this.receivablesText,
          where: function where(entry) {
            return "ErpShipTo.Id eq \"".concat(entry.$key, "\"");
          },
          view: 'shipto_receivables_related'
        }, {
          name: 'Invoices',
          label: this.invoicesText,
          where: function where(entry) {
            return "ErpShipTo.Id eq \"".concat(entry.$key, "\"");
          },
          view: 'shipto_invoices_related'
        }, {
          name: 'Returns',
          label: this.returnsText,
          where: function where(entry) {
            return "ErpShipTo.Id eq \"".concat(entry.$key, "\"");
          },
          view: 'shipto_returns_related'
        }, {
          name: 'SyncHistory',
          label: this.syncHistoryText,
          where: function where(entry) {
            return "EntityType eq \"ERPShipTo\" and EntityId eq \"".concat(entry.$key, "\"");
          },
          view: 'shipto_synchistory_related'
        }]
      }]);
    },
    formatPicklist: function formatPicklist(property) {
      return _Format["default"].picklist(this.app.picklistService, this._model, property);
    },
    formatMultiCurrency: function formatMultiCurrency(val) {
      if (App.hasMultiCurrency() && val) {
        if (this.entry.ErpInvoice.CurrencyCode) {
          return _Format["default"].multiCurrency.call(null, val, this.entry.ErpInvoice.CurrencyCode);
        }

        return _Format["default"].currency.call(null, val);
      }

      return _Format["default"].currency.call(null, val);
    }
  });

  _lang["default"].setObject('icboe.Views.ERPShipTos.Detail', __class);

  var _default = __class;
  _exports["default"] = _default;
});