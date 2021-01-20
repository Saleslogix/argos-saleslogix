define('crm/Integrations/BOE/Views/ERPReceivables/Detail', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'crm/Format', 'argos/Detail', '../../Models/Names', 'argos/I18n', '../../Utility'], function (module, exports, _declare, _lang, _Format, _Detail, _Names, _I18n, _Utility) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Format2 = _interopRequireDefault(_Format);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _Names2 = _interopRequireDefault(_Names);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Utility2 = _interopRequireDefault(_Utility);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('erpReceivablesDetail'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPReceivables.Detail', [_Detail2.default], {
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
    modelName: _Names2.default.ERPRECEIVABLE,
    resourceKind: 'erpReceivables',
    enableOffline: true,
    _sdataProps: ['$key', '$url', '$uuid', '$lookup'],
    _hasNonEmptyAddress: function _hasNonEmptyAddress(address) {
      var _this = this;

      var keys = void 0;
      if (address) {
        keys = Object.keys(address).filter(function (key) {
          return _this._sdataProps.indexOf(key) === -1;
        });
      }

      return keys && keys.length > 0;
    },
    _renderAddress: function _renderAddress(data) {
      if (this._hasNonEmptyAddress(data)) {
        return _Format2.default.address(data);
      }
    },
    createLayout: function createLayout() {
      var _this2 = this;

      return this.layout || (this.layout = [{
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          name: 'ErpExtId',
          property: 'ErpExtId',
          label: this.receivablesIdText
        }, {
          name: 'AccountName',
          property: 'Account.AccountName',
          label: this.accountText,
          view: 'account_detail',
          key: 'Account.$key'
        }, {
          name: 'InvoiceNumber',
          property: 'ErpInvoiceNumber',
          label: this.invoiceNumberText,
          view: 'invoice_detail',
          key: 'ErpInvoice.$key'
        }, {
          name: 'ReceivableBaseAmount',
          property: 'ReceivableBaseAmount',
          label: this.receivableBaseAmountText,
          renderer: function renderer(value) {
            return _Utility2.default.formatMultiCurrency(value, _this2.entry.BaseCurrencyCode);
          }
        }, {
          name: 'ReceivableAmount',
          property: 'ReceivableAmount',
          label: this.receivableAmountText,
          renderer: function renderer(value) {
            return _Utility2.default.formatMultiCurrency(value, _this2.entry.CurrencyCode);
          }
        }, {
          name: 'ReceivedBaseAmount',
          property: 'ReceivedBaseAmount',
          label: this.receivedBaseAmountText,
          renderer: function renderer(value) {
            return _Utility2.default.formatMultiCurrency(value, _this2.entry.BaseCurrencyCode);
          }
        }, {
          name: 'ReceivedAmount',
          property: 'ReceivedAmount',
          label: this.receivedAmountText,
          renderer: function renderer(value) {
            return _Utility2.default.formatMultiCurrency(value, _this2.entry.CurrencyCode);
          }
        }, {
          name: 'ErpStatus',
          property: 'ErpStatus',
          label: this.erpStatusText
        }, {
          name: 'ErpStatusDate',
          property: 'ErpStatusDate',
          label: this.erpStatusDateText,
          renderer: _Format2.default.date.bind(this)
        }, {
          name: 'ErpDocumentDate',
          property: 'ErpDocumentDate',
          label: this.documentDateText,
          renderer: function renderer(data) {
            return _Format2.default.date(data);
          }
        }, {
          name: 'ErpPaymentTermId',
          property: 'ErpPaymentTermId',
          label: this.paymentTermText
        }, {
          name: 'ErpBillTo',
          property: 'ErpBillTo.Name',
          label: this.billToText,
          view: 'erpbillto_detail',
          key: 'ErpBillTo.$key'
        }, {
          name: 'ErpBillToAddress',
          property: 'ErpBillTo.Address',
          label: this.billToAddressText,
          renderer: this._renderAddress.bind(this)
        }, {
          name: 'ErpShipTo',
          property: 'ErpShipTo.Name',
          label: this.shipToText,
          view: 'erpshipto_detail',
          key: 'ErpShipTo.$key'
        }, {
          name: 'ErpShipToAddress',
          property: 'ErpShipTo.Address',
          label: this.shipToAddressText,
          renderer: this._renderAddress.bind(this)
        }, {
          name: 'ErpPayFrom',
          property: 'ErpPayFrom.Address',
          label: this.payFromText,
          renderer: this._renderAddress.bind(this)
        }]
      }, {
        title: this.relatedItemsText,
        list: true,
        name: 'RelatedItemsSection',
        children: [{
          name: 'ERPReceivableItems',
          label: this.receivableItemsText,
          where: function where(entry) {
            return 'ErpReceivable.Id eq "' + entry.$key + '"';
          },
          view: 'erpreceivable_items_related'
        }]
      }]);
    }
  });

  _lang2.default.setObject('icboe.Views.ERPReceivables.Detail', __class);
  exports.default = __class;
  module.exports = exports['default'];
});