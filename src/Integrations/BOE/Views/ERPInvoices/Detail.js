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

/**
 * @class crm.Views.Account.Detail
 *
 *
 * @extends argos.Detail
 * @requires argos.Detail
 * @requires crm.Format
 * @requires crm.Template
 *
 */
import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import format from 'crm/Format';
import Detail from 'argos/Detail';
import MODEL_NAMES from '../../Models/Names';
import utility from '../../Utility';
import getResource from 'argos/I18n';

const resource = getResource('erpInvoicesDetail');

const __class = declare('crm.Integrations.BOE.Views.ERPInvoices.Detail', [Detail], {
  // Localization
  titleText: resource.titleText,
  accountText: resource.accountText,
  statusText: resource.statusText,
  ownerText: resource.ownerText,
  termsText: resource.termsText,
  statusDateText: resource.statusDateText,
  unknownText: resource.unknownText,
  descriptionText: resource.descriptionText,
  invoiceNumberText: resource.invoiceNumberText,
  extendedBaseAmountText: resource.extendedBaseAmountText,
  extendedAmountText: resource.extendedAmountText,
  totalBaseAmountText: resource.totalBaseAmountText,
  totalAmountText: resource.totalAmountText,
  nameText: resource.nameText,
  mainPhoneText: resource.mainPhoneText,
  addressText: resource.addressText,
  actionsText: resource.actionsText,
  relatedItemsText: resource.relatedItemsText,
  invoiceItemsText: resource.invoiceItemsText,
  receivablesText: resource.receivablesText,
  billToText: resource.billToText,
  shipToText: resource.shipToText,
  salesPersonsText: resource.salesPersonsText,
  entityText: resource.entityText,
  documentDateText: resource.documentDateText,


  // View Properties
  id: 'invoice_detail',
  modelName: MODEL_NAMES.ERPINVOICE,
  resourceKind: 'erpInvoices',
  enableOffline: true,

  callMainPhone: function callMainPhone() {
    this.recordCallToHistory(lang.hitch(this, function initiateCall() {
      App.initiateCall(this.entry.MainPhone);
    }));
  },
  formatPicklist: function formatPicklist(property) {
    return format.picklist(this.app.picklistService, this._model, property);
  },
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: this.actionsText,
      list: true,
      cls: 'action-list',
      name: 'QuickActionsSection',
      children: [],
    }, {
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        name: 'InvoiceNumber',
        property: 'InvoiceNumber',
        label: this.invoiceNumberText,
      }, {
        name: 'AccountName',
        property: 'Account.AccountName',
        label: this.accountText,
        descriptor: 'AccountName',
        view: 'account_detail',
        key: 'Account.$key',
      }, {
        name: 'Description',
        property: 'Description',
        label: this.descriptionText,
      }, {
        label: this.extendedBaseAmountText,
        name: 'ErpExtendedBaseAmount',
        property: 'ErpExtendedBaseAmount',
        renderer: (value) => {
          return utility.formatMultiCurrency(value, this.entry.BaseCurrencyCode);
        },
      }, {
        label: this.extendedAmountText,
        name: 'ErpExtendedAmount',
        property: 'ErpExtendedAmount',
        renderer: (value) => {
          return utility.formatMultiCurrency(value, this.entry.CurrencyCode);
        },
      }, {
        label: this.totalBaseAmountText,
        name: 'ErpTotalBaseAmount',
        property: 'ErpTotalBaseAmount',
        renderer: (value) => {
          return utility.formatMultiCurrency(value, this.entry.BaseCurrencyCode);
        },
      }, {
        label: this.totalAmountText,
        name: 'GrandTotal',
        property: 'GrandTotal',
        renderer: (value) => {
          return utility.formatMultiCurrency(value, this.entry.CurrencyCode);
        },
      }, {
        name: 'ErpStatus',
        property: 'ErpStatus',
        label: this.statusText,
        renderer: this.formatPicklist('ErpStatus'),
      }, {
        name: 'ErpStatusDate',
        property: 'ErpStatusDate',
        label: this.statusDateText,
        renderer: format.date.bindDelegate(this, null, true),
      }, {
        name: 'ErpDocumentDate',
        property: 'ErpDocumentDate',
        label: this.documentDateText,
        renderer: function renderer(data) {
          return format.date(data);
        },
      }, {
        name: 'ErpPaymentTermId',
        property: 'ErpPaymentTermId',
        label: this.termsText,
      }],
    }, {
      title: this.billToText,
      name: 'BillToSection',
      children: [{
        name: 'BillToName',
        property: 'ErpBillTo.Name',
        label: this.nameText,
        view: 'erpbillto_detail',
        key: 'ErpBillTo.$key',
      }, {
        name: 'BillToMainPhone',
        property: 'ErpBillTo.MainPhone',
        label: this.mainPhoneText,
      }, {
        name: 'BillToAddress',
        property: 'ErpBillTo.Address',
        label: this.addressText,
        renderer: (val) => {
          if (val) {
            return format.address(val);
          }
        },
      }],
    }, {
      title: this.shipToText,
      name: 'ShipSection',
      children: [{
        name: 'ShipToName',
        property: 'ErpShipTo.Name',
        label: this.nameText,
        view: 'erpshipto_detail',
        key: 'ErpShipTo.$key',
      }, {
        name: 'ShipToMainPhone',
        property: 'ErpShipTo.MainPhone',
        label: this.mainPhoneText,
      }, {
        name: 'ShipToAddress',
        property: 'ErpShipTo.Address',
        label: this.addressText,
        renderer: (val) => {
          if (val) {
            return format.address(val);
          }
        },
      }],
    }, {
      title: this.relatedItemsText,
      list: true,
      name: 'RelatedItemsSection',
      children: [{
        name: 'ERPInvoiceItemsRelated',
        label: this.invoiceItemsText,
        where: this.formatRelatedQuery.bindDelegate(this, 'ErpInvoice.Id eq "${0}"'),
        view: 'invoice_items_related',
      }, {
        name: 'ERPReceivable',
        label: this.receivablesText,
        where: this.formatRelatedQuery.bindDelegate(this, 'ErpInvoice.Id eq "${0}"'),
        view: 'invoice_receivables_related',
      },
      ],
    }]);
  },
});

lang.setObject('icboe.Views.ERPInvoices.Detail', __class);
export default __class;
