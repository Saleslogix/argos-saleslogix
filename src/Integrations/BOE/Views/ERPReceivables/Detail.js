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

import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import format from 'crm/Format';
import Detail from 'argos/Detail';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';
import utility from '../../Utility';

const resource = getResource('erpReceivablesDetail');

const __class = declare('crm.Integrations.BOE.Views.ERPReceivables.Detail', [Detail], {
  // Localization
  titleText: resource.titleText,
  receivablesIdText: resource.receivablesIdText,
  accountText: resource.accountText,
  invoiceNumberText: resource.invoiceNumberText,
  receivableAmountText: resource.receivableAmountText,
  receivedAmountText: resource.receivedAmountText,
  receivableBaseAmountText: resource.receivableBaseAmountText,
  receivedBaseAmountText: resource.receivedBaseAmountText,
  erpStatusText: resource.erpStatusText,
  erpStatusDateText: resource.erpStatusDateText,
  paymentTermText: resource.paymentTermText,
  billToText: resource.billToText,
  billToAddressText: resource.billToAddressText,
  shipToText: resource.shipToText,
  shipToAddressText: resource.shipToAddressText,
  payFromText: resource.payFromText,
  relatedItemsText: resource.relatedItemsText,
  receivableItemsText: resource.receivableItemsText,
  entityText: resource.entityText,
  documentDateText: resource.documentDateText,

  // View Properties
  id: 'erpreceivables_detail',
  modelName: MODEL_NAMES.ERPRECEIVABLE,
  resourceKind: 'erpReceivables',
  enableOffline: true,
  _sdataProps: [
    '$key',
    '$url',
    '$uuid',
    '$lookup',
  ],
  _hasNonEmptyAddress: function _hasNonEmptyAddress(address) {
    let keys;
    if (address) {
      keys = Object.keys(address).filter((key) => {
        return this._sdataProps.indexOf(key) === -1;
      });
    }

    return keys && keys.length > 0;
  },
  _renderAddress: function _renderAddress(data) {
    if (this._hasNonEmptyAddress(data)) {
      return format.address(data);
    }
  },
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        name: 'ErpExtId',
        property: 'ErpExtId',
        label: this.receivablesIdText,
      }, {
        name: 'AccountName',
        property: 'Account.AccountName',
        label: this.accountText,
        view: 'account_detail',
        key: 'Account.$key',
      }, {
        name: 'InvoiceNumber',
        property: 'ErpInvoiceNumber',
        label: this.invoiceNumberText,
        view: 'invoice_detail',
        key: 'ErpInvoice.$key',
      }, {
        name: 'ReceivableBaseAmount',
        property: 'ReceivableBaseAmount',
        label: this.receivableBaseAmountText,
        renderer: (value) => {
          return utility.formatMultiCurrency(value, this.entry.BaseCurrencyCode);
        },
      }, {
        name: 'ReceivableAmount',
        property: 'ReceivableAmount',
        label: this.receivableAmountText,
        renderer: (value) => {
          return utility.formatMultiCurrency(value, this.entry.CurrencyCode);
        },
      }, {
        name: 'ReceivedBaseAmount',
        property: 'ReceivedBaseAmount',
        label: this.receivedBaseAmountText,
        renderer: (value) => {
          return utility.formatMultiCurrency(value, this.entry.BaseCurrencyCode);
        },
      }, {
        name: 'ReceivedAmount',
        property: 'ReceivedAmount',
        label: this.receivedAmountText,
        renderer: (value) => {
          return utility.formatMultiCurrency(value, this.entry.CurrencyCode);
        },
      }, {
        name: 'ErpStatus',
        property: 'ErpStatus',
        label: this.erpStatusText,
      }, {
        name: 'ErpStatusDate',
        property: 'ErpStatusDate',
        label: this.erpStatusDateText,
        renderer: format.date.bind(this),
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
        label: this.paymentTermText,
      }, {
        name: 'ErpBillTo',
        property: 'ErpBillTo.Name',
        label: this.billToText,
        view: 'erpbillto_detail',
        key: 'ErpBillTo.$key',
      }, {
        name: 'ErpBillToAddress',
        property: 'ErpBillTo.Address',
        label: this.billToAddressText,
        renderer: this._renderAddress.bind(this),
      }, {
        name: 'ErpShipTo',
        property: 'ErpShipTo.Name',
        label: this.shipToText,
        view: 'erpshipto_detail',
        key: 'ErpShipTo.$key',
      }, {
        name: 'ErpShipToAddress',
        property: 'ErpShipTo.Address',
        label: this.shipToAddressText,
        renderer: this._renderAddress.bind(this),
      }, {
        name: 'ErpPayFrom',
        property: 'ErpPayFrom.Address',
        label: this.payFromText,
        renderer: this._renderAddress.bind(this),
      }],
    }, {
      title: this.relatedItemsText,
      list: true,
      name: 'RelatedItemsSection',
      children: [{
        name: 'ERPReceivableItems',
        label: this.receivableItemsText,
        where: function where(entry) {
          return `ErpReceivable.Id eq "${entry.$key}"`;
        },
        view: 'erpreceivable_items_related',
      }],
    }]);
  },
});

lang.setObject('icboe.Views.ERPReceivables.Detail', __class);
export default __class;
