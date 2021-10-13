define('crm/Integrations/BOE/Views/ERPReceivableItems/Detail', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'crm/Format', 'argos/Detail', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _Format, _Detail, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('erpReceivableItemsDetail');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPReceivableItems.Detail', [_Detail2.default], {
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
    modelName: _Names2.default.ERPRECEIVABLEITEM,
    resourceKind: 'erpReceivableItems',
    enableOffline: true,

    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          name: 'ErpLineNumber',
          property: 'ErpLineNumber',
          label: this.lineNumberText
        }, {
          name: 'ReceivablesID',
          property: 'ErpReceivable.ErpExtId',
          label: this.receivablesIdText,
          key: 'ErpReceivable.$key',
          view: 'erpreceivables_detail'
        }, {
          name: 'InvoiceID',
          property: 'ErpInvoice.ErpExtId',
          label: this.invoiceIdText,
          key: 'ErpInvoice.$key',
          view: 'invoice_detail'
        }, {
          name: 'ProductName',
          property: 'Product.Name',
          label: this.productNameText
        }, {
          name: 'ProductDesc',
          property: 'Product.Description',
          label: this.productDescText
        }, {
          name: 'ExtendedPrice',
          property: 'ExtendedPrice',
          label: this.extPriceText,
          renderer: this.formatMultiCurrency.bindDelegate(this)
        }, {
          name: 'ERPLineTotal',
          property: 'ErpLineTotalAmount',
          label: this.lineTotalText,
          renderer: this.formatMultiCurrency.bindDelegate(this)
        }]
      }]);
    },
    formatMultiCurrency: function formatMultiCurrency(val) {
      if (App.hasMultiCurrency() && val) {
        if (this.entry.ErpReceivable.CurrencyCode) {
          return _Format2.default.multiCurrency.call(null, val, this.entry.ErpReceivable.CurrencyCode);
        }
        return _Format2.default.currency.call(null, val);
      }
      return _Format2.default.currency.call(null, val);
    }
  });

  _lang2.default.setObject('icboe.Views.ERPReceivableItems.Detail', __class);
  exports.default = __class;
  module.exports = exports['default'];
});