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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0VSUFJlY2VpdmFibGVzL0RldGFpbC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJ0aXRsZVRleHQiLCJyZWNlaXZhYmxlc0lkVGV4dCIsImFjY291bnRUZXh0IiwiaW52b2ljZU51bWJlclRleHQiLCJyZWNlaXZhYmxlQW1vdW50VGV4dCIsInJlY2VpdmVkQW1vdW50VGV4dCIsInJlY2VpdmFibGVCYXNlQW1vdW50VGV4dCIsInJlY2VpdmVkQmFzZUFtb3VudFRleHQiLCJlcnBTdGF0dXNUZXh0IiwiZXJwU3RhdHVzRGF0ZVRleHQiLCJwYXltZW50VGVybVRleHQiLCJiaWxsVG9UZXh0IiwiYmlsbFRvQWRkcmVzc1RleHQiLCJzaGlwVG9UZXh0Iiwic2hpcFRvQWRkcmVzc1RleHQiLCJwYXlGcm9tVGV4dCIsInJlbGF0ZWRJdGVtc1RleHQiLCJyZWNlaXZhYmxlSXRlbXNUZXh0IiwiZW50aXR5VGV4dCIsImRvY3VtZW50RGF0ZVRleHQiLCJpZCIsIm1vZGVsTmFtZSIsIkVSUFJFQ0VJVkFCTEUiLCJyZXNvdXJjZUtpbmQiLCJlbmFibGVPZmZsaW5lIiwiX3NkYXRhUHJvcHMiLCJfaGFzTm9uRW1wdHlBZGRyZXNzIiwiYWRkcmVzcyIsImtleXMiLCJPYmplY3QiLCJmaWx0ZXIiLCJrZXkiLCJpbmRleE9mIiwibGVuZ3RoIiwiX3JlbmRlckFkZHJlc3MiLCJkYXRhIiwiY3JlYXRlTGF5b3V0IiwibGF5b3V0IiwidGl0bGUiLCJkZXRhaWxzVGV4dCIsIm5hbWUiLCJjaGlsZHJlbiIsInByb3BlcnR5IiwibGFiZWwiLCJ2aWV3IiwicmVuZGVyZXIiLCJ2YWx1ZSIsImZvcm1hdE11bHRpQ3VycmVuY3kiLCJlbnRyeSIsIkJhc2VDdXJyZW5jeUNvZGUiLCJDdXJyZW5jeUNvZGUiLCJkYXRlIiwiYmluZCIsImxpc3QiLCJ3aGVyZSIsIiRrZXkiLCJzZXRPYmplY3QiXSwi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QztBQUNURCxnQkFBTSxvQkFERztBQUVURyxpQkFBTyxLQUFLMUIsbUJBRkg7QUFHVHFDLGlCQUFPLFNBQVNBLEtBQVQsQ0FBZU4sS0FBZixFQUFzQjtBQUMzQiw2Q0FBK0JBLE1BQU1PLElBQXJDO0FBQ0QsV0FMUTtBQU1UWCxnQkFBTTtBQU5HLFNBQUQ7QUFKVCxPQS9Ga0MsQ0FBOUIsQ0FBUDtBQTRHRDtBQTlKbUYsR0FBdEUsQ0FBaEI7O0FBaUtBLGlCQUFLWSxTQUFMLENBQWUsbUNBQWYsRUFBb0R6RCxPQUFwRDtvQkFDZUEsTyIsImZpbGUiOiJEZXRhaWwuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJ2NybS9Gb3JtYXQnO1xyXG5pbXBvcnQgRGV0YWlsIGZyb20gJ2FyZ29zL0RldGFpbCc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi8uLi9Nb2RlbHMvTmFtZXMnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCB1dGlsaXR5IGZyb20gJy4uLy4uL1V0aWxpdHknO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXJwUmVjZWl2YWJsZXNEZXRhaWwnKTtcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5WaWV3cy5FUlBSZWNlaXZhYmxlcy5EZXRhaWwnLCBbRGV0YWlsXSwge1xyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIHJlY2VpdmFibGVzSWRUZXh0OiByZXNvdXJjZS5yZWNlaXZhYmxlc0lkVGV4dCxcclxuICBhY2NvdW50VGV4dDogcmVzb3VyY2UuYWNjb3VudFRleHQsXHJcbiAgaW52b2ljZU51bWJlclRleHQ6IHJlc291cmNlLmludm9pY2VOdW1iZXJUZXh0LFxyXG4gIHJlY2VpdmFibGVBbW91bnRUZXh0OiByZXNvdXJjZS5yZWNlaXZhYmxlQW1vdW50VGV4dCxcclxuICByZWNlaXZlZEFtb3VudFRleHQ6IHJlc291cmNlLnJlY2VpdmVkQW1vdW50VGV4dCxcclxuICByZWNlaXZhYmxlQmFzZUFtb3VudFRleHQ6IHJlc291cmNlLnJlY2VpdmFibGVCYXNlQW1vdW50VGV4dCxcclxuICByZWNlaXZlZEJhc2VBbW91bnRUZXh0OiByZXNvdXJjZS5yZWNlaXZlZEJhc2VBbW91bnRUZXh0LFxyXG4gIGVycFN0YXR1c1RleHQ6IHJlc291cmNlLmVycFN0YXR1c1RleHQsXHJcbiAgZXJwU3RhdHVzRGF0ZVRleHQ6IHJlc291cmNlLmVycFN0YXR1c0RhdGVUZXh0LFxyXG4gIHBheW1lbnRUZXJtVGV4dDogcmVzb3VyY2UucGF5bWVudFRlcm1UZXh0LFxyXG4gIGJpbGxUb1RleHQ6IHJlc291cmNlLmJpbGxUb1RleHQsXHJcbiAgYmlsbFRvQWRkcmVzc1RleHQ6IHJlc291cmNlLmJpbGxUb0FkZHJlc3NUZXh0LFxyXG4gIHNoaXBUb1RleHQ6IHJlc291cmNlLnNoaXBUb1RleHQsXHJcbiAgc2hpcFRvQWRkcmVzc1RleHQ6IHJlc291cmNlLnNoaXBUb0FkZHJlc3NUZXh0LFxyXG4gIHBheUZyb21UZXh0OiByZXNvdXJjZS5wYXlGcm9tVGV4dCxcclxuICByZWxhdGVkSXRlbXNUZXh0OiByZXNvdXJjZS5yZWxhdGVkSXRlbXNUZXh0LFxyXG4gIHJlY2VpdmFibGVJdGVtc1RleHQ6IHJlc291cmNlLnJlY2VpdmFibGVJdGVtc1RleHQsXHJcbiAgZW50aXR5VGV4dDogcmVzb3VyY2UuZW50aXR5VGV4dCxcclxuICBkb2N1bWVudERhdGVUZXh0OiByZXNvdXJjZS5kb2N1bWVudERhdGVUZXh0LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ2VycHJlY2VpdmFibGVzX2RldGFpbCcsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5FUlBSRUNFSVZBQkxFLFxyXG4gIHJlc291cmNlS2luZDogJ2VycFJlY2VpdmFibGVzJyxcclxuICBlbmFibGVPZmZsaW5lOiB0cnVlLFxyXG4gIF9zZGF0YVByb3BzOiBbXHJcbiAgICAnJGtleScsXHJcbiAgICAnJHVybCcsXHJcbiAgICAnJHV1aWQnLFxyXG4gICAgJyRsb29rdXAnLFxyXG4gIF0sXHJcbiAgX2hhc05vbkVtcHR5QWRkcmVzczogZnVuY3Rpb24gX2hhc05vbkVtcHR5QWRkcmVzcyhhZGRyZXNzKSB7XHJcbiAgICBsZXQga2V5cztcclxuICAgIGlmIChhZGRyZXNzKSB7XHJcbiAgICAgIGtleXMgPSBPYmplY3Qua2V5cyhhZGRyZXNzKS5maWx0ZXIoKGtleSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZGF0YVByb3BzLmluZGV4T2Yoa2V5KSA9PT0gLTE7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBrZXlzICYmIGtleXMubGVuZ3RoID4gMDtcclxuICB9LFxyXG4gIF9yZW5kZXJBZGRyZXNzOiBmdW5jdGlvbiBfcmVuZGVyQWRkcmVzcyhkYXRhKSB7XHJcbiAgICBpZiAodGhpcy5faGFzTm9uRW1wdHlBZGRyZXNzKGRhdGEpKSB7XHJcbiAgICAgIHJldHVybiBmb3JtYXQuYWRkcmVzcyhkYXRhKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5b3V0IHx8ICh0aGlzLmxheW91dCA9IFt7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmRldGFpbHNUZXh0LFxyXG4gICAgICBuYW1lOiAnRGV0YWlsc1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBuYW1lOiAnRXJwRXh0SWQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwRXh0SWQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJlY2VpdmFibGVzSWRUZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0FjY291bnROYW1lJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0FjY291bnQuQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFjY291bnRUZXh0LFxyXG4gICAgICAgIHZpZXc6ICdhY2NvdW50X2RldGFpbCcsXHJcbiAgICAgICAga2V5OiAnQWNjb3VudC4ka2V5JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdJbnZvaWNlTnVtYmVyJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycEludm9pY2VOdW1iZXInLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmludm9pY2VOdW1iZXJUZXh0LFxyXG4gICAgICAgIHZpZXc6ICdpbnZvaWNlX2RldGFpbCcsXHJcbiAgICAgICAga2V5OiAnRXJwSW52b2ljZS4ka2V5JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdSZWNlaXZhYmxlQmFzZUFtb3VudCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdSZWNlaXZhYmxlQmFzZUFtb3VudCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucmVjZWl2YWJsZUJhc2VBbW91bnRUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiAodmFsdWUpID0+IHtcclxuICAgICAgICAgIHJldHVybiB1dGlsaXR5LmZvcm1hdE11bHRpQ3VycmVuY3kodmFsdWUsIHRoaXMuZW50cnkuQmFzZUN1cnJlbmN5Q29kZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdSZWNlaXZhYmxlQW1vdW50JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1JlY2VpdmFibGVBbW91bnQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJlY2VpdmFibGVBbW91bnRUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiAodmFsdWUpID0+IHtcclxuICAgICAgICAgIHJldHVybiB1dGlsaXR5LmZvcm1hdE11bHRpQ3VycmVuY3kodmFsdWUsIHRoaXMuZW50cnkuQ3VycmVuY3lDb2RlKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1JlY2VpdmVkQmFzZUFtb3VudCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdSZWNlaXZlZEJhc2VBbW91bnQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJlY2VpdmVkQmFzZUFtb3VudFRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHV0aWxpdHkuZm9ybWF0TXVsdGlDdXJyZW5jeSh2YWx1ZSwgdGhpcy5lbnRyeS5CYXNlQ3VycmVuY3lDb2RlKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1JlY2VpdmVkQW1vdW50JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1JlY2VpdmVkQW1vdW50JyxcclxuICAgICAgICBsYWJlbDogdGhpcy5yZWNlaXZlZEFtb3VudFRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHV0aWxpdHkuZm9ybWF0TXVsdGlDdXJyZW5jeSh2YWx1ZSwgdGhpcy5lbnRyeS5DdXJyZW5jeUNvZGUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwU3RhdHVzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFN0YXR1cycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZXJwU3RhdHVzVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFcnBTdGF0dXNEYXRlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFN0YXR1c0RhdGUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmVycFN0YXR1c0RhdGVUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmb3JtYXQuZGF0ZS5iaW5kKHRoaXMpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VycERvY3VtZW50RGF0ZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBEb2N1bWVudERhdGUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmRvY3VtZW50RGF0ZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQuZGF0ZShkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VycFBheW1lbnRUZXJtSWQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwUGF5bWVudFRlcm1JZCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucGF5bWVudFRlcm1UZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VycEJpbGxUbycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBCaWxsVG8uTmFtZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYmlsbFRvVGV4dCxcclxuICAgICAgICB2aWV3OiAnZXJwYmlsbHRvX2RldGFpbCcsXHJcbiAgICAgICAga2V5OiAnRXJwQmlsbFRvLiRrZXknLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VycEJpbGxUb0FkZHJlc3MnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwQmlsbFRvLkFkZHJlc3MnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmJpbGxUb0FkZHJlc3NUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiB0aGlzLl9yZW5kZXJBZGRyZXNzLmJpbmQodGhpcyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwU2hpcFRvJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFNoaXBUby5OYW1lJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zaGlwVG9UZXh0LFxyXG4gICAgICAgIHZpZXc6ICdlcnBzaGlwdG9fZGV0YWlsJyxcclxuICAgICAgICBrZXk6ICdFcnBTaGlwVG8uJGtleScsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwU2hpcFRvQWRkcmVzcycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBTaGlwVG8uQWRkcmVzcycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc2hpcFRvQWRkcmVzc1RleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IHRoaXMuX3JlbmRlckFkZHJlc3MuYmluZCh0aGlzKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFcnBQYXlGcm9tJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFBheUZyb20uQWRkcmVzcycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucGF5RnJvbVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IHRoaXMuX3JlbmRlckFkZHJlc3MuYmluZCh0aGlzKSxcclxuICAgICAgfV0sXHJcbiAgICB9LCB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLnJlbGF0ZWRJdGVtc1RleHQsXHJcbiAgICAgIGxpc3Q6IHRydWUsXHJcbiAgICAgIG5hbWU6ICdSZWxhdGVkSXRlbXNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbmFtZTogJ0VSUFJlY2VpdmFibGVJdGVtcycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucmVjZWl2YWJsZUl0ZW1zVGV4dCxcclxuICAgICAgICB3aGVyZTogZnVuY3Rpb24gd2hlcmUoZW50cnkpIHtcclxuICAgICAgICAgIHJldHVybiBgRXJwUmVjZWl2YWJsZS5JZCBlcSBcIiR7ZW50cnkuJGtleX1cImA7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB2aWV3OiAnZXJwcmVjZWl2YWJsZV9pdGVtc19yZWxhdGVkJyxcclxuICAgICAgfV0sXHJcbiAgICB9XSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuVmlld3MuRVJQUmVjZWl2YWJsZXMuRGV0YWlsJywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==