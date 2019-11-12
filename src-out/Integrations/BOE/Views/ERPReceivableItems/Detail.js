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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0VSUFJlY2VpdmFibGVJdGVtcy9EZXRhaWwuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwidGl0bGVUZXh0IiwibGluZU51bWJlclRleHQiLCJyZWNlaXZhYmxlc0lkVGV4dCIsImludm9pY2VJZFRleHQiLCJwcm9kdWN0TmFtZVRleHQiLCJwcm9kdWN0RGVzY1RleHQiLCJleHRQcmljZVRleHQiLCJsaW5lVG90YWxUZXh0IiwiZW50aXR5VGV4dCIsImlkIiwibW9kZWxOYW1lIiwiRVJQUkVDRUlWQUJMRUlURU0iLCJyZXNvdXJjZUtpbmQiLCJlbmFibGVPZmZsaW5lIiwiY3JlYXRlTGF5b3V0IiwibGF5b3V0IiwidGl0bGUiLCJkZXRhaWxzVGV4dCIsIm5hbWUiLCJjaGlsZHJlbiIsInByb3BlcnR5IiwibGFiZWwiLCJrZXkiLCJ2aWV3IiwicmVuZGVyZXIiLCJmb3JtYXRNdWx0aUN1cnJlbmN5IiwiYmluZERlbGVnYXRlIiwidmFsIiwiQXBwIiwiaGFzTXVsdGlDdXJyZW5jeSIsImVudHJ5IiwiRXJwUmVjZWl2YWJsZSIsIkN1cnJlbmN5Q29kZSIsIm11bHRpQ3VycmVuY3kiLCJjYWxsIiwiY3VycmVuY3kiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxNQUFNQSxXQUFXLG9CQUFZLDBCQUFaLENBQWpCOztBQUVBLE1BQU1DLFVBQVUsdUJBQVEsc0RBQVIsRUFBZ0Usa0JBQWhFLEVBQTBFO0FBQ3hGO0FBQ0FDLGVBQVdGLFNBQVNFLFNBRm9FO0FBR3hGQyxvQkFBZ0JILFNBQVNHLGNBSCtEO0FBSXhGQyx1QkFBbUJKLFNBQVNJLGlCQUo0RDtBQUt4RkMsbUJBQWVMLFNBQVNLLGFBTGdFO0FBTXhGQyxxQkFBaUJOLFNBQVNNLGVBTjhEO0FBT3hGQyxxQkFBaUJQLFNBQVNPLGVBUDhEO0FBUXhGQyxrQkFBY1IsU0FBU1EsWUFSaUU7QUFTeEZDLG1CQUFlVCxTQUFTUyxhQVRnRTtBQVV4RkMsZ0JBQVlWLFNBQVNVLFVBVm1FOztBQVl4RjtBQUNBQyxRQUFJLDJCQWJvRjtBQWN4RjtBQUNBQyxlQUFXLGdCQUFZQyxpQkFmaUU7QUFnQnhGQyxrQkFBYyxvQkFoQjBFO0FBaUJ4RkMsbUJBQWUsSUFqQnlFOztBQW1CeEZDLGtCQUFjLFNBQVNBLFlBQVQsR0FBd0I7QUFDcEMsYUFBTyxLQUFLQyxNQUFMLEtBQWdCLEtBQUtBLE1BQUwsR0FBYyxDQUFDO0FBQ3BDQyxlQUFPLEtBQUtDLFdBRHdCO0FBRXBDQyxjQUFNLGdCQUY4QjtBQUdwQ0Msa0JBQVUsQ0FBQztBQUNURCxnQkFBTSxlQURHO0FBRVRFLG9CQUFVLGVBRkQ7QUFHVEMsaUJBQU8sS0FBS3BCO0FBSEgsU0FBRCxFQUlQO0FBQ0RpQixnQkFBTSxlQURMO0FBRURFLG9CQUFVLHdCQUZUO0FBR0RDLGlCQUFPLEtBQUtuQixpQkFIWDtBQUlEb0IsZUFBSyxvQkFKSjtBQUtEQyxnQkFBTTtBQUxMLFNBSk8sRUFVUDtBQUNETCxnQkFBTSxXQURMO0FBRURFLG9CQUFVLHFCQUZUO0FBR0RDLGlCQUFPLEtBQUtsQixhQUhYO0FBSURtQixlQUFLLGlCQUpKO0FBS0RDLGdCQUFNO0FBTEwsU0FWTyxFQWdCUDtBQUNETCxnQkFBTSxhQURMO0FBRURFLG9CQUFVLGNBRlQ7QUFHREMsaUJBQU8sS0FBS2pCO0FBSFgsU0FoQk8sRUFvQlA7QUFDRGMsZ0JBQU0sYUFETDtBQUVERSxvQkFBVSxxQkFGVDtBQUdEQyxpQkFBTyxLQUFLaEI7QUFIWCxTQXBCTyxFQXdCUDtBQUNEYSxnQkFBTSxlQURMO0FBRURFLG9CQUFVLGVBRlQ7QUFHREMsaUJBQU8sS0FBS2YsWUFIWDtBQUlEa0Isb0JBQVcsS0FBS0MsbUJBQU4sQ0FBMkJDLFlBQTNCLENBQXdDLElBQXhDO0FBSlQsU0F4Qk8sRUE2QlA7QUFDRFIsZ0JBQU0sY0FETDtBQUVERSxvQkFBVSxvQkFGVDtBQUdEQyxpQkFBTyxLQUFLZCxhQUhYO0FBSURpQixvQkFBVyxLQUFLQyxtQkFBTixDQUEyQkMsWUFBM0IsQ0FBd0MsSUFBeEM7QUFKVCxTQTdCTztBQUgwQixPQUFELENBQTlCLENBQVA7QUF1Q0QsS0EzRHVGO0FBNER4RkQseUJBQXFCLFNBQVNBLG1CQUFULENBQTZCRSxHQUE3QixFQUFrQztBQUNyRCxVQUFJQyxJQUFJQyxnQkFBSixNQUEwQkYsR0FBOUIsRUFBbUM7QUFDakMsWUFBSSxLQUFLRyxLQUFMLENBQVdDLGFBQVgsQ0FBeUJDLFlBQTdCLEVBQTJDO0FBQ3pDLGlCQUFPLGlCQUFPQyxhQUFQLENBQXFCQyxJQUFyQixDQUEwQixJQUExQixFQUFnQ1AsR0FBaEMsRUFBcUMsS0FBS0csS0FBTCxDQUFXQyxhQUFYLENBQXlCQyxZQUE5RCxDQUFQO0FBQ0Q7QUFDRCxlQUFPLGlCQUFPRyxRQUFQLENBQWdCRCxJQUFoQixDQUFxQixJQUFyQixFQUEyQlAsR0FBM0IsQ0FBUDtBQUNEO0FBQ0QsYUFBTyxpQkFBT1EsUUFBUCxDQUFnQkQsSUFBaEIsQ0FBcUIsSUFBckIsRUFBMkJQLEdBQTNCLENBQVA7QUFDRDtBQXBFdUYsR0FBMUUsQ0FBaEI7O0FBdUVBLGlCQUFLUyxTQUFMLENBQWUsdUNBQWYsRUFBd0RyQyxPQUF4RDtvQkFDZUEsTyIsImZpbGUiOiJEZXRhaWwuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJ2NybS9Gb3JtYXQnO1xyXG5pbXBvcnQgRGV0YWlsIGZyb20gJ2FyZ29zL0RldGFpbCc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi8uLi9Nb2RlbHMvTmFtZXMnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdlcnBSZWNlaXZhYmxlSXRlbXNEZXRhaWwnKTtcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5WaWV3cy5FUlBSZWNlaXZhYmxlSXRlbXMuRGV0YWlsJywgW0RldGFpbF0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBsaW5lTnVtYmVyVGV4dDogcmVzb3VyY2UubGluZU51bWJlclRleHQsXHJcbiAgcmVjZWl2YWJsZXNJZFRleHQ6IHJlc291cmNlLnJlY2VpdmFibGVzSWRUZXh0LFxyXG4gIGludm9pY2VJZFRleHQ6IHJlc291cmNlLmludm9pY2VJZFRleHQsXHJcbiAgcHJvZHVjdE5hbWVUZXh0OiByZXNvdXJjZS5wcm9kdWN0TmFtZVRleHQsXHJcbiAgcHJvZHVjdERlc2NUZXh0OiByZXNvdXJjZS5wcm9kdWN0RGVzY1RleHQsXHJcbiAgZXh0UHJpY2VUZXh0OiByZXNvdXJjZS5leHRQcmljZVRleHQsXHJcbiAgbGluZVRvdGFsVGV4dDogcmVzb3VyY2UubGluZVRvdGFsVGV4dCxcclxuICBlbnRpdHlUZXh0OiByZXNvdXJjZS5lbnRpdHlUZXh0LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ2VycHJlY2VpdmFibGVpdGVtc19kZXRhaWwnLFxyXG4gIC8vIHNlY3VyaXR5OiAnRW50aXRpZXMvRVJQUmVjZWl2YWJsZUl0ZW1zL1ZpZXcnLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuRVJQUkVDRUlWQUJMRUlURU0sXHJcbiAgcmVzb3VyY2VLaW5kOiAnZXJwUmVjZWl2YWJsZUl0ZW1zJyxcclxuICBlbmFibGVPZmZsaW5lOiB0cnVlLFxyXG5cclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICB0aXRsZTogdGhpcy5kZXRhaWxzVGV4dCxcclxuICAgICAgbmFtZTogJ0RldGFpbHNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbmFtZTogJ0VycExpbmVOdW1iZXInLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwTGluZU51bWJlcicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMubGluZU51bWJlclRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnUmVjZWl2YWJsZXNJRCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBSZWNlaXZhYmxlLkVycEV4dElkJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5yZWNlaXZhYmxlc0lkVGV4dCxcclxuICAgICAgICBrZXk6ICdFcnBSZWNlaXZhYmxlLiRrZXknLFxyXG4gICAgICAgIHZpZXc6ICdlcnByZWNlaXZhYmxlc19kZXRhaWwnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0ludm9pY2VJRCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBJbnZvaWNlLkVycEV4dElkJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5pbnZvaWNlSWRUZXh0LFxyXG4gICAgICAgIGtleTogJ0VycEludm9pY2UuJGtleScsXHJcbiAgICAgICAgdmlldzogJ2ludm9pY2VfZGV0YWlsJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdQcm9kdWN0TmFtZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdQcm9kdWN0Lk5hbWUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnByb2R1Y3ROYW1lVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdQcm9kdWN0RGVzYycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdQcm9kdWN0LkRlc2NyaXB0aW9uJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5wcm9kdWN0RGVzY1RleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXh0ZW5kZWRQcmljZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFeHRlbmRlZFByaWNlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5leHRQcmljZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6ICh0aGlzLmZvcm1hdE11bHRpQ3VycmVuY3kpLmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFUlBMaW5lVG90YWwnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwTGluZVRvdGFsQW1vdW50JyxcclxuICAgICAgICBsYWJlbDogdGhpcy5saW5lVG90YWxUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiAodGhpcy5mb3JtYXRNdWx0aUN1cnJlbmN5KS5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICAgIH1dLFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbiAgZm9ybWF0TXVsdGlDdXJyZW5jeTogZnVuY3Rpb24gZm9ybWF0TXVsdGlDdXJyZW5jeSh2YWwpIHtcclxuICAgIGlmIChBcHAuaGFzTXVsdGlDdXJyZW5jeSgpICYmIHZhbCkge1xyXG4gICAgICBpZiAodGhpcy5lbnRyeS5FcnBSZWNlaXZhYmxlLkN1cnJlbmN5Q29kZSkge1xyXG4gICAgICAgIHJldHVybiBmb3JtYXQubXVsdGlDdXJyZW5jeS5jYWxsKG51bGwsIHZhbCwgdGhpcy5lbnRyeS5FcnBSZWNlaXZhYmxlLkN1cnJlbmN5Q29kZSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZvcm1hdC5jdXJyZW5jeS5jYWxsKG51bGwsIHZhbCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZm9ybWF0LmN1cnJlbmN5LmNhbGwobnVsbCwgdmFsKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5WaWV3cy5FUlBSZWNlaXZhYmxlSXRlbXMuRGV0YWlsJywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==