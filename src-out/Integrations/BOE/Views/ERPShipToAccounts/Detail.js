define("crm/Integrations/BOE/Views/ERPShipToAccounts/Detail", ["exports", "dojo/_base/declare", "dojo/_base/lang", "crm/Format", "argos/Detail", "../../Models/Names", "argos/I18n"], function (_exports, _declare, _lang, _Format, _Detail, _Names, _I18n) {
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
  var resource = (0, _I18n["default"])('erpShipToAccountsDetail');

  var __class = (0, _declare["default"])('crm.Integrations.BOE.Views.ERPShipToAccounts.Detail', [_Detail["default"]], {
    // Localization
    titleText: resource.titleText,
    actionsText: resource.actionsText,
    relatedItemsText: resource.relatedItemsText,
    nameText: resource.nameText,
    addressText: resource.addressText,
    statusText: resource.statusText,
    mainPhoneText: resource.mainPhoneText,
    faxText: resource.faxText,
    emailText: resource.emailText,
    paymentTermText: resource.paymentTermText,
    carrierText: resource.carrierText,
    entityText: resource.entityText,
    // Related Views
    accountsText: resource.accountsText,
    openQuotesText: resource.openQuotesText,
    salesOrdersText: resource.salesOrdersText,
    invoicesText: resource.invoicesText,
    shipmentsText: resource.shipmentsText,
    receivablesText: resource.receivablesText,
    returnsText: resource.returnsText,
    contactAssociationText: resource.contactAssociationText,
    shipToText: resource.shipToText,
    billToText: resource.billToText,
    salesPersonText: resource.salesPersonText,
    // Picklist Codes
    openCode: 'Open',
    newCode: 'New',
    approvedCode: 'Approved',
    workingCode: 'Working',
    partialShipCode: 'PartiallyShipped',
    partialPaidCode: 'PartialPaid',
    closedCode: 'Closed',
    disputeCode: 'Dispute',
    pickReadyCode: 'PickReady',
    releasedCode: 'Released',
    allocatedCode: 'Allocated',
    stagedCode: 'Staged',
    loadedCode: 'Loaded',
    // View Properties
    id: 'erpshiptoaccount_detail',
    modelName: _Names["default"].ERPSHIPTOACCOUNT,
    resourceKind: 'erpShipToAccounts',
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
          name: 'Name',
          property: 'ErpShipTo.Name',
          label: this.nameText
        }, {
          name: 'Address',
          property: 'ErpShipTo.Address',
          label: this.addressText,
          renderer: function renderer(val) {
            if (val) {
              return _Format["default"].address(val);
            }
          }
        }, {
          name: 'ERPStatus',
          property: 'ErpShipTo.ErpStatus',
          label: this.statusText
        }, {
          name: 'MainPhone',
          property: 'ErpShipTo.MainPhone',
          label: this.mainPhoneText,
          renderer: function renderer(val) {
            if (val) {
              return _Format["default"].phone(val);
            }
          }
        }, {
          name: 'Fax',
          property: 'ErpShipTo.Fax',
          label: this.faxText
        }, {
          name: 'Email',
          property: 'ErpShipTo.Email',
          label: this.emailText,
          renderer: function renderer(val) {
            if (val) {
              return _Format["default"].mail(val);
            }
          }
        }, {
          name: 'ERPPaymentTerm',
          property: 'ErpShipTo.PaymentTermId',
          label: this.paymentTermText
        }, {
          name: 'Carrier',
          property: 'ErpShipTo.CarrierName',
          label: this.carrierText
        }]
      }, {
        title: this.relatedItemsText,
        list: true,
        name: 'RelatedItemsSection',
        children: [// {
        // name: 'ShipToAccounts',
        // label: this.accountsText,
        // where: function(entry) {
        // return 'ErpShipToAccounts.Id eq "' + entry.$key + '"';
        // },
        // view: 'erpshiptoaccount_accounts_related'
        // },
        {
          name: 'OpenQuotesList',
          label: this.openQuotesText,
          where: function where(entry) {
            return "ShipTo.ErpShipToAccounts.Id eq \"".concat(entry.$key, "\" and (Status eq \"").concat(this.openCode, "\" or Status eq \"").concat(this.newCode, "\")");
          },
          view: 'erpshiptoaccount_quotes_related'
        }, {
          name: 'SalesOrders',
          label: this.salesOrdersText,
          where: function where(entry) {
            return "ErpShipTo.ErpShipToAccounts.Id eq \"".concat(entry.$key, "\" and (Status eq \"").concat(this.openCode, "\" or Status eq \"").concat(this.approvedCode, "\" or Status eq \"").concat(this.workingCode, "\" or Status eq \"").concat(this.partialShipCode, "\")");
          },
          view: 'erpshiptoaccount_salesorders_related'
        }, // {
        // name: 'OpenInvoices',
        // label: this.invoicesText,
        // where: function(entry) {
        // return 'ErpShipTo.ErpShipToAccounts.Id eq "' + entry.$key + '" and ErpStatus eq "Open"';
        // },
        // view: 'erpshiptoaccount_invoices_related'
        // },
        {
          name: 'Shipments',
          label: this.shipmentsText,
          where: function where(entry) {
            return "ErpShipTo.ErpShipToAccounts.Id eq \"".concat(entry.$key, "\" and (ErpStatus eq \"").concat(this.openCode, "\" or ErpStatus eq \"").concat(this.partialShipCode, "\" or ErpStatus eq \"").concat(this.releasedCode, "\" or ErpStatus eq \"").concat(this.allocatedCode, "\" or ErpStatus eq \"").concat(this.stagedCode, "\" or ErpStatus eq \"").concat(this.loadedCode, "\")");
          },
          view: 'erpshiptoaccount_shipments_related'
        }, // {
        // name: 'Receivables',
        // label: this.receivablesText,
        // where: function(entry) {
        // return 'ErpShipTo.ErpShipToAccounts.Id eq "' + entry.$key + '"';
        // },
        // view: 'erpshiptoaccount_receivables_related'
        // },
        {
          name: 'Returns',
          label: this.returnsText,
          where: function where(entry) {
            return "ErpShipTo.ErpShipToAccounts.Id eq \"".concat(entry.$key, "\"");
          },
          view: 'erpshiptoaccount_returns_related'
        }, {
          name: 'ContactAssociations',
          label: this.contactAssociationText,
          where: function where(entry) {
            return "Account.ErpShipToAccounts.Id eq \"".concat(entry.$key, "\"");
          },
          view: 'erpshiptoaccount_contactassociations_related'
        } // , {
        // name: 'Bill-To',
        // label: this.billToText,
        // where: function(entry) {
        // return 'ErpBillTo.ErpBillToAccounts.Id eq "' + entry.$key + '"';
        // },
        // view: 'erpshiptoaccount_billto_related'
        // },
        // {
        // name: 'SalesPerson',
        // label: this.salesPersonText,
        // where: function(entry) {
        // return 'SalesOrder.ErpShipTo.ErpShipToAccounts.Id eq "' + entry.$key + '"';
        // },
        // view: 'erpshiptoaccount_salesperson_related'
        // }
        ]
      }]);
    }
  });

  _lang["default"].setObject('icboe.Views.ERPShipToAccounts.Detail', __class);

  var _default = __class;
  _exports["default"] = _default;
});