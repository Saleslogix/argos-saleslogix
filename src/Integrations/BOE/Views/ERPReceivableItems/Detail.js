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

const resource = getResource('erpReceivableItemsDetail');

const __class = declare('crm.Integrations.BOE.Views.ERPReceivableItems.Detail', [Detail], {
  // Localization
  titleText: resource.titleText,
  lineNumberText: resource.lineNumberText,
  receivablesIdText: resource.receivablesIdText,
  invoiceIdText: resource.invoiceIdText,
  productNameText: resource.productNameText,
  productDescText: resource.productDescText,
  extPriceText: resource.extPriceText,
  lineTotalText: resource.lineTotalText,
  entityText: resource.entityText,

  // View Properties
  id: 'erpreceivableitems_detail',
  // security: 'Entities/ERPReceivableItems/View',
  modelName: MODEL_NAMES.ERPRECEIVABLEITEM,
  resourceKind: 'erpReceivableItems',
  enableOffline: true,

  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        name: 'ErpLineNumber',
        property: 'ErpLineNumber',
        label: this.lineNumberText,
      }, {
        name: 'ReceivablesID',
        property: 'ErpReceivable.ErpExtId',
        label: this.receivablesIdText,
        key: 'ErpReceivable.$key',
        view: 'erpreceivables_detail',
      }, {
        name: 'InvoiceID',
        property: 'ErpInvoice.ErpExtId',
        label: this.invoiceIdText,
        key: 'ErpInvoice.$key',
        view: 'invoice_detail',
      }, {
        name: 'ProductName',
        property: 'Product.Name',
        label: this.productNameText,
      }, {
        name: 'ProductDesc',
        property: 'Product.Description',
        label: this.productDescText,
      }, {
        name: 'ExtendedPrice',
        property: 'ExtendedPrice',
        label: this.extPriceText,
        renderer: (this.formatMultiCurrency).bindDelegate(this),
      }, {
        name: 'ERPLineTotal',
        property: 'ErpLineTotalAmount',
        label: this.lineTotalText,
        renderer: (this.formatMultiCurrency).bindDelegate(this),
      }],
    }]);
  },
  formatMultiCurrency: function formatMultiCurrency(val) {
    if (App.hasMultiCurrency() && val) {
      if (this.entry.ErpReceivable.CurrencyCode) {
        return format.multiCurrency.call(null, val, this.entry.ErpReceivable.CurrencyCode);
      }
      return format.currency.call(null, val);
    }
    return format.currency.call(null, val);
  },
});

lang.setObject('icboe.Views.ERPReceivableItems.Detail', __class);
export default __class;
