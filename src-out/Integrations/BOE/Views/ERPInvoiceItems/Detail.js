define('crm/Integrations/BOE/Views/ERPInvoiceItems/Detail', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'crm/Format', 'argos/Detail', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _Format, _Detail, _Names, _I18n) {
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
  const resource = (0, _I18n2.default)('erpInvoiceItemsDetail');

  const __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPInvociesItems.Detail', [_Detail2.default], {
    // Localization
    titleText: resource.titleText,
    invoiceNumberText: resource.invoiceNumberText,
    lineText: resource.lineText,
    quantityText: resource.quantityText,
    priceText: resource.priceText,
    amountText: resource.amountText,
    productNameText: resource.productNameText,
    descriptionText: resource.descriptionText,
    totalText: resource.totalText,
    requestedDeliveryDateText: resource.requestedDeliveryDateText,
    unitPriceText: resource.unitPriceText,
    salesOrderNumberText: resource.salesOrderNumberText,
    unitPricePerQuanityText: resource.unitPricePerQuanityText,
    unitPricePerQuanityUOMText: resource.unitPricePerQuanityUOMText,
    salesOrderLineNumberText: resource.salesOrderLineNumberText,
    extendedCostText: resource.extendedCostText,
    entityText: resource.entityText,

    // View Properties
    id: 'invoice_item_detail',
    modelName: _Names2.default.ERPINVOICEITEM,
    resourceKind: 'erpInvoiceItems',
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
          name: 'ErpLineNumber',
          property: 'ErpLineNumber',
          label: this.lineText
        }, {
          name: 'ErpInvoice.InvoiceNumber',
          property: 'ErpInvoice.InvoiceNumber',
          label: this.invoiceNumberText,
          descriptor: 'InvoiceNumber',
          view: 'invoice_detail',
          key: 'ErpInvoice.$key'
        }, {
          name: 'ProductName',
          property: 'ProductName',
          label: this.productNameText
        }, {
          name: 'Description',
          property: 'Description',
          label: this.descriptionText
        }, {
          name: 'Quantity',
          property: 'Quantity',
          label: this.quantityText,
          renderer: function renderer(val) {
            if (val) {
              if (this.entry.UnitOfMeasure) {
                return _Format2.default.multiCurrency.call(null, val, this.entry.UnitOfMeasure.Name);
              }
              return _Format2.default.currency.call(null, val);
            }
          }.bindDelegate(this)
        }, {
          label: this.amountText,
          property: 'ExtendedPrice',
          renderer: this.formatMultiCurrency.bindDelegate(this)
        }, {
          label: this.extendedCostText,
          property: 'ExtendedCost',
          renderer: this.formatMultiCurrency.bindDelegate(this)
        }, {
          label: this.totalText,
          name: 'ErpLineTotalAmount',
          property: 'ErpLineTotalAmount',
          renderer: this.formatMultiCurrency.bindDelegate(this)
        }, {
          name: 'ErpRequestedDeliveryDate',
          property: 'ErpRequestedDeliveryDate',
          label: this.requestedDeliveryDateText,
          renderer: function renderer(val) {
            return _Format2.default.date.call(null, val);
          }.bindDelegate(this)
        }, {
          name: 'SalesOrder',
          property: 'SalesOrder.SalesOrderNumber',
          label: this.salesOrderNumberText,
          descriptor: 'SalesOrderNumber',
          view: 'salesorder_detail',
          key: 'SalesOrder.$key'
        }, {
          name: 'SalesOrderLineNumber',
          property: 'SalesOrderLineReference',
          label: this.salesOrderLineNumberText
        }, {
          label: this.unitPriceText,
          name: 'BaseUnitPrice',
          property: 'BaseUnitPrice',
          renderer: function renderer(val) {
            if (val) {
              if (App.hasMultiCurrency()) {
                if (this.entry.BaseCurrencyCode) {
                  return _Format2.default.multiCurrency.call(null, val, this.entry.BaseCurrencyCode);
                }
                return _Format2.default.currency.call(null, val);
              }
            }
            return _Format2.default.currency.call(null, val);
          }.bindDelegate(this)
        }, {
          label: this.unitPricePerQuanityText,
          property: 'ErpUnitPricePerQuanity',
          renderer: function renderer(val) {
            if (val) {
              if (this.entry.ErpUnitPricePerQuanityUOM) {
                return _Format2.default.multiCurrency.call(null, val, this.entry.ErpUnitPricePerQuanityUOM);
              }
              return _Format2.default.currency.call(null, val);
            }
          }.bindDelegate(this)
        }]
      }]);
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

  _lang2.default.setObject('icboe.Views.ERPInvociesItems.Detail', __class);
  exports.default = __class;
  module.exports = exports['default'];
});