define("crm/Integrations/BOE/Views/ERPReceivableItems/Detail", ["exports", "dojo/_base/declare", "dojo/_base/lang", "crm/Format", "argos/Detail", "../../Models/Names", "argos/I18n"], function (_exports, _declare, _lang, _Format, _Detail, _Names, _I18n) {
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
  var resource = (0, _I18n["default"])('erpReceivableItemsDetail');

  var __class = (0, _declare["default"])('crm.Integrations.BOE.Views.ERPReceivableItems.Detail', [_Detail["default"]], {
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
    modelName: _Names["default"].ERPRECEIVABLEITEM,
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
          return _Format["default"].multiCurrency.call(null, val, this.entry.ErpReceivable.CurrencyCode);
        }

        return _Format["default"].currency.call(null, val);
      }

      return _Format["default"].currency.call(null, val);
    }
  });

  _lang["default"].setObject('icboe.Views.ERPReceivableItems.Detail', __class);

  var _default = __class;
  _exports["default"] = _default;
});