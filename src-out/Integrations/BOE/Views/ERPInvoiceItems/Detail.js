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

  /**
   * @class crm.Integrations.BOE.Views.ERPInvocieItems.Detail
   *
   *
   * @extends argos.Detail
   * @requires argos.Detail
   * @requires crm.Format
   * @requires crm.Template
   *
   */
  var resource = (0, _I18n2.default)('erpInvoiceItemsDetail');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPInvociesItems.Detail', [_Detail2.default], /** @lends crm.Integrations.BOE.Views.ERPInvocieItems.Detail# */{
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0VSUEludm9pY2VJdGVtcy9EZXRhaWwuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwidGl0bGVUZXh0IiwiaW52b2ljZU51bWJlclRleHQiLCJsaW5lVGV4dCIsInF1YW50aXR5VGV4dCIsInByaWNlVGV4dCIsImFtb3VudFRleHQiLCJwcm9kdWN0TmFtZVRleHQiLCJkZXNjcmlwdGlvblRleHQiLCJ0b3RhbFRleHQiLCJyZXF1ZXN0ZWREZWxpdmVyeURhdGVUZXh0IiwidW5pdFByaWNlVGV4dCIsInNhbGVzT3JkZXJOdW1iZXJUZXh0IiwidW5pdFByaWNlUGVyUXVhbml0eVRleHQiLCJ1bml0UHJpY2VQZXJRdWFuaXR5VU9NVGV4dCIsInNhbGVzT3JkZXJMaW5lTnVtYmVyVGV4dCIsImV4dGVuZGVkQ29zdFRleHQiLCJlbnRpdHlUZXh0IiwiaWQiLCJtb2RlbE5hbWUiLCJFUlBJTlZPSUNFSVRFTSIsInJlc291cmNlS2luZCIsImVuYWJsZU9mZmxpbmUiLCJjcmVhdGVMYXlvdXQiLCJsYXlvdXQiLCJ0aXRsZSIsImFjdGlvbnNUZXh0IiwibGlzdCIsImNscyIsIm5hbWUiLCJjaGlsZHJlbiIsImRldGFpbHNUZXh0IiwicHJvcGVydHkiLCJsYWJlbCIsImRlc2NyaXB0b3IiLCJ2aWV3Iiwia2V5IiwicmVuZGVyZXIiLCJ2YWwiLCJlbnRyeSIsIlVuaXRPZk1lYXN1cmUiLCJtdWx0aUN1cnJlbmN5IiwiY2FsbCIsIk5hbWUiLCJjdXJyZW5jeSIsImJpbmREZWxlZ2F0ZSIsImZvcm1hdE11bHRpQ3VycmVuY3kiLCJkYXRlIiwiQXBwIiwiaGFzTXVsdGlDdXJyZW5jeSIsIkJhc2VDdXJyZW5jeUNvZGUiLCJFcnBVbml0UHJpY2VQZXJRdWFuaXR5VU9NIiwiRXJwSW52b2ljZSIsIkN1cnJlbmN5Q29kZSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7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QVAsQ0FBZ0JGLElBQWhCLENBQXFCLElBQXJCLEVBQTJCSixHQUEzQixDQUFQO0FBQ0Q7QUFDRCxhQUFPLGlCQUFPTSxRQUFQLENBQWdCRixJQUFoQixDQUFxQixJQUFyQixFQUEyQkosR0FBM0IsQ0FBUDtBQUNEO0FBdklzSixHQUF6SSxDQUFoQjs7QUEwSUEsaUJBQUtnQixTQUFMLENBQWUscUNBQWYsRUFBc0R0RCxPQUF0RDtvQkFDZUEsTyIsImZpbGUiOiJEZXRhaWwuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLkVSUEludm9jaWVJdGVtcy5EZXRhaWxcclxuICpcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuRGV0YWlsXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5EZXRhaWxcclxuICogQHJlcXVpcmVzIGNybS5Gb3JtYXRcclxuICogQHJlcXVpcmVzIGNybS5UZW1wbGF0ZVxyXG4gKlxyXG4gKi9cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICdjcm0vRm9ybWF0JztcclxuaW1wb3J0IERldGFpbCBmcm9tICdhcmdvcy9EZXRhaWwnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXJwSW52b2ljZUl0ZW1zRGV0YWlsJyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuRVJQSW52b2NpZXNJdGVtcy5EZXRhaWwnLCBbRGV0YWlsXSwgLyoqIEBsZW5kcyBjcm0uSW50ZWdyYXRpb25zLkJPRS5WaWV3cy5FUlBJbnZvY2llSXRlbXMuRGV0YWlsIyAqLyB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgaW52b2ljZU51bWJlclRleHQ6IHJlc291cmNlLmludm9pY2VOdW1iZXJUZXh0LFxyXG4gIGxpbmVUZXh0OiByZXNvdXJjZS5saW5lVGV4dCxcclxuICBxdWFudGl0eVRleHQ6IHJlc291cmNlLnF1YW50aXR5VGV4dCxcclxuICBwcmljZVRleHQ6IHJlc291cmNlLnByaWNlVGV4dCxcclxuICBhbW91bnRUZXh0OiByZXNvdXJjZS5hbW91bnRUZXh0LFxyXG4gIHByb2R1Y3ROYW1lVGV4dDogcmVzb3VyY2UucHJvZHVjdE5hbWVUZXh0LFxyXG4gIGRlc2NyaXB0aW9uVGV4dDogcmVzb3VyY2UuZGVzY3JpcHRpb25UZXh0LFxyXG4gIHRvdGFsVGV4dDogcmVzb3VyY2UudG90YWxUZXh0LFxyXG4gIHJlcXVlc3RlZERlbGl2ZXJ5RGF0ZVRleHQ6IHJlc291cmNlLnJlcXVlc3RlZERlbGl2ZXJ5RGF0ZVRleHQsXHJcbiAgdW5pdFByaWNlVGV4dDogcmVzb3VyY2UudW5pdFByaWNlVGV4dCxcclxuICBzYWxlc09yZGVyTnVtYmVyVGV4dDogcmVzb3VyY2Uuc2FsZXNPcmRlck51bWJlclRleHQsXHJcbiAgdW5pdFByaWNlUGVyUXVhbml0eVRleHQ6IHJlc291cmNlLnVuaXRQcmljZVBlclF1YW5pdHlUZXh0LFxyXG4gIHVuaXRQcmljZVBlclF1YW5pdHlVT01UZXh0OiByZXNvdXJjZS51bml0UHJpY2VQZXJRdWFuaXR5VU9NVGV4dCxcclxuICBzYWxlc09yZGVyTGluZU51bWJlclRleHQ6IHJlc291cmNlLnNhbGVzT3JkZXJMaW5lTnVtYmVyVGV4dCxcclxuICBleHRlbmRlZENvc3RUZXh0OiByZXNvdXJjZS5leHRlbmRlZENvc3RUZXh0LFxyXG4gIGVudGl0eVRleHQ6IHJlc291cmNlLmVudGl0eVRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnaW52b2ljZV9pdGVtX2RldGFpbCcsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5FUlBJTlZPSUNFSVRFTSxcclxuICByZXNvdXJjZUtpbmQ6ICdlcnBJbnZvaWNlSXRlbXMnLFxyXG4gIGVuYWJsZU9mZmxpbmU6IHRydWUsXHJcblxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5b3V0IHx8ICh0aGlzLmxheW91dCA9IFt7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmFjdGlvbnNUZXh0LFxyXG4gICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICBjbHM6ICdhY3Rpb24tbGlzdCcsXHJcbiAgICAgIG5hbWU6ICdRdWlja0FjdGlvbnNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgfSwge1xyXG4gICAgICB0aXRsZTogdGhpcy5kZXRhaWxzVGV4dCxcclxuICAgICAgbmFtZTogJ0RldGFpbHNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbmFtZTogJ0VycExpbmVOdW1iZXInLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwTGluZU51bWJlcicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMubGluZVRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwSW52b2ljZS5JbnZvaWNlTnVtYmVyJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycEludm9pY2UuSW52b2ljZU51bWJlcicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuaW52b2ljZU51bWJlclRleHQsXHJcbiAgICAgICAgZGVzY3JpcHRvcjogJ0ludm9pY2VOdW1iZXInLFxyXG4gICAgICAgIHZpZXc6ICdpbnZvaWNlX2RldGFpbCcsXHJcbiAgICAgICAga2V5OiAnRXJwSW52b2ljZS4ka2V5JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdQcm9kdWN0TmFtZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdQcm9kdWN0TmFtZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucHJvZHVjdE5hbWVUZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5kZXNjcmlwdGlvblRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnUXVhbnRpdHknLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUXVhbnRpdHknLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnF1YW50aXR5VGV4dCxcclxuICAgICAgICByZW5kZXJlcjogKGZ1bmN0aW9uIHJlbmRlcmVyKHZhbCkge1xyXG4gICAgICAgICAgaWYgKHZhbCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5lbnRyeS5Vbml0T2ZNZWFzdXJlKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdC5tdWx0aUN1cnJlbmN5LmNhbGwobnVsbCwgdmFsLCB0aGlzLmVudHJ5LlVuaXRPZk1lYXN1cmUuTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdC5jdXJyZW5jeS5jYWxsKG51bGwsIHZhbCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkuYmluZERlbGVnYXRlKHRoaXMpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYW1vdW50VGV4dCxcclxuICAgICAgICBwcm9wZXJ0eTogJ0V4dGVuZGVkUHJpY2UnLFxyXG4gICAgICAgIHJlbmRlcmVyOiAodGhpcy5mb3JtYXRNdWx0aUN1cnJlbmN5KS5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5leHRlbmRlZENvc3RUZXh0LFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXh0ZW5kZWRDb3N0JyxcclxuICAgICAgICByZW5kZXJlcjogKHRoaXMuZm9ybWF0TXVsdGlDdXJyZW5jeSkuYmluZERlbGVnYXRlKHRoaXMpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMudG90YWxUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdFcnBMaW5lVG90YWxBbW91bnQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwTGluZVRvdGFsQW1vdW50JyxcclxuICAgICAgICByZW5kZXJlcjogKHRoaXMuZm9ybWF0TXVsdGlDdXJyZW5jeSkuYmluZERlbGVnYXRlKHRoaXMpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VycFJlcXVlc3RlZERlbGl2ZXJ5RGF0ZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBSZXF1ZXN0ZWREZWxpdmVyeURhdGUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJlcXVlc3RlZERlbGl2ZXJ5RGF0ZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IChmdW5jdGlvbiByZW5kZXJlcih2YWwpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQuZGF0ZS5jYWxsKG51bGwsIHZhbCk7XHJcbiAgICAgICAgfSkuYmluZERlbGVnYXRlKHRoaXMpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1NhbGVzT3JkZXInLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU2FsZXNPcmRlci5TYWxlc09yZGVyTnVtYmVyJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zYWxlc09yZGVyTnVtYmVyVGV4dCxcclxuICAgICAgICBkZXNjcmlwdG9yOiAnU2FsZXNPcmRlck51bWJlcicsXHJcbiAgICAgICAgdmlldzogJ3NhbGVzb3JkZXJfZGV0YWlsJyxcclxuICAgICAgICBrZXk6ICdTYWxlc09yZGVyLiRrZXknLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1NhbGVzT3JkZXJMaW5lTnVtYmVyJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1NhbGVzT3JkZXJMaW5lUmVmZXJlbmNlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zYWxlc09yZGVyTGluZU51bWJlclRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy51bml0UHJpY2VUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdCYXNlVW5pdFByaWNlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0Jhc2VVbml0UHJpY2UnLFxyXG4gICAgICAgIHJlbmRlcmVyOiAoZnVuY3Rpb24gcmVuZGVyZXIodmFsKSB7XHJcbiAgICAgICAgICBpZiAodmFsKSB7XHJcbiAgICAgICAgICAgIGlmIChBcHAuaGFzTXVsdGlDdXJyZW5jeSgpKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMuZW50cnkuQmFzZUN1cnJlbmN5Q29kZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdC5tdWx0aUN1cnJlbmN5LmNhbGwobnVsbCwgdmFsLCB0aGlzLmVudHJ5LkJhc2VDdXJyZW5jeUNvZGUpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0LmN1cnJlbmN5LmNhbGwobnVsbCwgdmFsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdC5jdXJyZW5jeS5jYWxsKG51bGwsIHZhbCk7XHJcbiAgICAgICAgfSkuYmluZERlbGVnYXRlKHRoaXMpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMudW5pdFByaWNlUGVyUXVhbml0eVRleHQsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBVbml0UHJpY2VQZXJRdWFuaXR5JyxcclxuICAgICAgICByZW5kZXJlcjogKGZ1bmN0aW9uIHJlbmRlcmVyKHZhbCkge1xyXG4gICAgICAgICAgaWYgKHZhbCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5lbnRyeS5FcnBVbml0UHJpY2VQZXJRdWFuaXR5VU9NKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdC5tdWx0aUN1cnJlbmN5LmNhbGwobnVsbCwgdmFsLCB0aGlzLmVudHJ5LkVycFVuaXRQcmljZVBlclF1YW5pdHlVT00pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXQuY3VycmVuY3kuY2FsbChudWxsLCB2YWwpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pLmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgICAgfV0sXHJcbiAgICB9XSk7XHJcbiAgfSxcclxuICBmb3JtYXRNdWx0aUN1cnJlbmN5OiBmdW5jdGlvbiBmb3JtYXRNdWx0aUN1cnJlbmN5KHZhbCkge1xyXG4gICAgaWYgKEFwcC5oYXNNdWx0aUN1cnJlbmN5KCkgJiYgdmFsKSB7XHJcbiAgICAgIGlmICh0aGlzLmVudHJ5LkVycEludm9pY2UuQ3VycmVuY3lDb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdC5tdWx0aUN1cnJlbmN5LmNhbGwobnVsbCwgdmFsLCB0aGlzLmVudHJ5LkVycEludm9pY2UuQ3VycmVuY3lDb2RlKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZm9ybWF0LmN1cnJlbmN5LmNhbGwobnVsbCwgdmFsKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmb3JtYXQuY3VycmVuY3kuY2FsbChudWxsLCB2YWwpO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLlZpZXdzLkVSUEludm9jaWVzSXRlbXMuRGV0YWlsJywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==