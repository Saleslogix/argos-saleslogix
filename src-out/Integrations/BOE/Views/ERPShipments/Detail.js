define('crm/Integrations/BOE/Views/ERPShipments/Detail', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'crm/Format', 'argos/Detail', '../../Models/Names', '../../Utility', 'argos/I18n'], function (module, exports, _declare, _lang, _Format, _Detail, _Names, _Utility, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Format2 = _interopRequireDefault(_Format);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _Names2 = _interopRequireDefault(_Names);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('erpShipmentsDetail'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPShipments.Detail', [_Detail2.default], {
    // Localization
    titleText: resource.titleText,
    actionsText: resource.actionsText,
    relatedItemsText: resource.relatedItemsText,
    shipmentIdText: resource.shipmentIdText,
    accountText: resource.accountText,
    datePromisedText: resource.datePromisedText,
    actualShipDateText: resource.actualShipDateText,
    actualDeliveryDateText: resource.actualDeliveryDateText,
    carrierText: resource.carrierText,
    erpStatusText: resource.erpStatusText,
    erpStatusDateText: resource.erpStatusDateText,
    warehouseLocationText: resource.warehouseLocationText,
    partialShipAllowedText: resource.partialShipAllowedText,
    grossWeightText: resource.grossWeightText,
    declaredValueText: resource.declaredValueText,
    shipmentTotalAmountText: resource.shipmentTotalAmountText,
    shipmentTotalBaseAmountText: resource.shipmentTotalBaseAmountText,
    paymentTermText: resource.paymentTermText,
    shipToText: resource.shipToText,
    shipToAddressText: resource.shipToAddressText,
    shipmentLinesText: resource.shipmentLinesText,
    entityText: resource.entityText,
    documentDateText: resource.documentDateText,
    // View Properties
    id: 'erpshipments_detail',
    modelName: _Names2.default.ERPSHIPMENT,
    resourceKind: 'erpShipments',
    enableOffline: true,

    createLayout: function createLayout() {
      var _this = this;

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
          name: 'ShipmentId',
          property: 'ErpExtId',
          label: this.shipmentIdText
        }, {
          name: 'Account',
          property: 'Account.AccountName',
          label: this.accountText,
          view: 'account_detail',
          key: 'Account.$key'
        }, {
          name: 'DatePromised',
          property: 'DatePromised',
          label: this.datePromisedText,
          renderer: function renderer(data) {
            return _Format2.default.date(data);
          }
        }, {
          name: 'ActualShipDate',
          property: 'ErpActualShipDate',
          label: this.actualShipDateText,
          renderer: function renderer(data) {
            return _Format2.default.date(data);
          }
        }, {
          name: 'ActualDeliveryDate',
          property: 'ErpActualDeliveryDate',
          label: this.actualDeliveryDateText,
          renderer: function renderer(data) {
            return _Format2.default.date(data);
          }
        }, {
          name: 'ErpDocumentDate',
          property: 'ErpDocumentDate',
          label: this.documentDateText,
          renderer: function renderer(data) {
            return _Format2.default.date(data);
          }
        }, {
          name: 'Carrier',
          property: 'ErpCarrierParty',
          label: this.carrierText
        }, {
          name: 'ERPStatus',
          property: 'ErpStatus',
          label: this.erpStatusText
        }, {
          name: 'ERPStatusDate',
          property: 'ErpStatusDate',
          label: this.erpStatusDateText,
          renderer: function renderer(data) {
            return _Format2.default.date(data);
          }
        }, {
          name: 'WarehouseLocation',
          property: 'SlxLocation.Name',
          label: this.warehouseLocationText,
          renderer: function renderer(val) {
            if (val) {
              return val;
            }
            return '';
          }
        }, {
          name: 'PartialShipAllowed',
          property: 'ErpPartialShipAllowed',
          label: this.partialShipAllowedText,
          renderer: function renderer(data) {
            return _Format2.default.yesNo(data);
          }
        }, {
          name: 'GrossWeight',
          property: 'ErpGrossWeight',
          label: this.grossWeightText,
          renderer: function renderer(val) {
            if (this.entry.ErpGrossWeightUnit && val) {
              return _Format2.default.multiCurrency.call(null, val, this.entry.ErpGrossWeightUnit);
            }
            return _Format2.default.currency.call(null, val);
          }
        }, {
          name: 'DeclaredValue',
          property: 'ErpDeclaredValue',
          label: this.declaredValueText,
          renderer: function renderer(value) {
            return _Utility2.default.formatMultiCurrency(value, _this.entry.CurrencyCode);
          }
        }, {
          name: 'ShipmentTotalBaseAmount',
          property: 'ShipmentTotalBaseAmount',
          label: this.shipmentTotalBaseAmountText,
          renderer: function renderer(value) {
            return _Utility2.default.formatMultiCurrency(value, _this.entry.BaseCurrencyCode);
          }
        }, {
          name: 'ShipmentTotalAmount',
          property: 'ShipmentTotalAmount',
          label: this.shipmentTotalAmountText,
          renderer: function renderer(value) {
            return _Utility2.default.formatMultiCurrency(value, _this.entry.CurrencyCode);
          }
        }, {
          name: 'PaymentTerm',
          property: 'ErpIncoTerm',
          label: this.paymentTermText
        }, {
          name: 'ShipTo',
          property: 'ErpShipTo.Name',
          label: this.shipToText,
          view: 'erpshipto_detail',
          key: 'ErpShipTo.$key'
        }, {
          name: 'ShipToAddress',
          property: 'ErpShipTo.Address',
          label: this.shipToAddressText,
          renderer: function renderer(data) {
            if (data) {
              return _Format2.default.address(data);
            }
          }
        }]
      }, {
        title: this.relatedItemsText,
        list: true,
        name: 'RelatedItemsSection',
        children: [{
          name: 'ShipmentLines',
          label: this.shipmentLinesText,
          where: function where(entry) {
            return 'ErpShipment.Id eq "' + entry.$key + '"';
          },
          view: 'shipment_lines_related'
        }]
      }]);
    }
  });

  _lang2.default.setObject('icboe.Views.ERPShipments.Detail', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0VSUFNoaXBtZW50cy9EZXRhaWwuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwidGl0bGVUZXh0IiwiYWN0aW9uc1RleHQiLCJyZWxhdGVkSXRlbXNUZXh0Iiwic2hpcG1lbnRJZFRleHQiLCJhY2NvdW50VGV4dCIsImRhdGVQcm9taXNlZFRleHQiLCJhY3R1YWxTaGlwRGF0ZVRleHQiLCJhY3R1YWxEZWxpdmVyeURhdGVUZXh0IiwiY2FycmllclRleHQiLCJlcnBTdGF0dXNUZXh0IiwiZXJwU3RhdHVzRGF0ZVRleHQiLCJ3YXJlaG91c2VMb2NhdGlvblRleHQiLCJwYXJ0aWFsU2hpcEFsbG93ZWRUZXh0IiwiZ3Jvc3NXZWlnaHRUZXh0IiwiZGVjbGFyZWRWYWx1ZVRleHQiLCJzaGlwbWVudFRvdGFsQW1vdW50VGV4dCIsInNoaXBtZW50VG90YWxCYXNlQW1vdW50VGV4dCIsInBheW1lbnRUZXJtVGV4dCIsInNoaXBUb1RleHQiLCJzaGlwVG9BZGRyZXNzVGV4dCIsInNoaXBtZW50TGluZXNUZXh0IiwiZW50aXR5VGV4dCIsImRvY3VtZW50RGF0ZVRleHQiLCJpZCIsIm1vZGVsTmFtZSIsIkVSUFNISVBNRU5UIiwicmVzb3VyY2VLaW5kIiwiZW5hYmxlT2ZmbGluZSIsImNyZWF0ZUxheW91dCIsImxheW91dCIsInRpdGxlIiwibGlzdCIsImNscyIsIm5hbWUiLCJjaGlsZHJlbiIsImRldGFpbHNUZXh0IiwicHJvcGVydHkiLCJsYWJlbCIsInZpZXciLCJrZXkiLCJyZW5kZXJlciIsImRhdGEiLCJkYXRlIiwidmFsIiwieWVzTm8iLCJlbnRyeSIsIkVycEdyb3NzV2VpZ2h0VW5pdCIsIm11bHRpQ3VycmVuY3kiLCJjYWxsIiwiY3VycmVuY3kiLCJ2YWx1ZSIsImZvcm1hdE11bHRpQ3VycmVuY3kiLCJDdXJyZW5jeUNvZGUiLCJCYXNlQ3VycmVuY3lDb2RlIiwiYWRk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LGFBREw7QUFFREcsb0JBQVUsYUFGVDtBQUdEQyxpQkFBTyxLQUFLcEI7QUFIWCxTQXJHTyxFQXlHUDtBQUNEZ0IsZ0JBQU0sUUFETDtBQUVERyxvQkFBVSxnQkFGVDtBQUdEQyxpQkFBTyxLQUFLbkIsVUFIWDtBQUlEb0IsZ0JBQU0sa0JBSkw7QUFLREMsZUFBSztBQUxKLFNBekdPLEVBK0dQO0FBQ0ROLGdCQUFNLGVBREw7QUFFREcsb0JBQVUsbUJBRlQ7QUFHREMsaUJBQU8sS0FBS2xCLGlCQUhYO0FBSURxQixvQkFBVSxTQUFTQSxRQUFULENBQWtCQyxJQUFsQixFQUF3QjtBQUNoQyxnQkFBSUEsSUFBSixFQUFVO0FBQ1IscUJBQU8saUJBQU9hLE9BQVAsQ0FBZWIsSUFBZixDQUFQO0FBQ0Q7QUFDRjtBQVJBLFNBL0dPO0FBSFQsT0FOa0MsRUFrSWxDO0FBQ0RYLGVBQU8sS0FBSzVCLGdCQURYO0FBRUQ2QixjQUFNLElBRkw7QUFHREUsY0FBTSxxQkFITDtBQUlEQyxrQkFBVSxDQUFDO0FBQ1RELGdCQUFNLGVBREc7QUFFVEksaUJBQU8sS0FBS2pCLGlCQUZIO0FBR1RtQyxpQkFBTyxTQUFTQSxLQUFULENBQWVWLEtBQWYsRUFBc0I7QUFDM0IsMkNBQTZCQSxNQUFNVyxJQUFuQztBQUNELFdBTFE7QUFNVGxCLGdCQUFNO0FBTkcsU0FBRDtBQUpULE9BbElrQyxDQUE5QixDQUFQO0FBK0lEO0FBL0tpRixHQUFwRSxDQUFoQjs7QUFrTEEsaUJBQUttQixTQUFMLENBQWUsaUNBQWYsRUFBa0QxRCxPQUFsRDtvQkFDZUEsTyIsImZpbGUiOiJEZXRhaWwuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJ2NybS9Gb3JtYXQnO1xyXG5pbXBvcnQgRGV0YWlsIGZyb20gJ2FyZ29zL0RldGFpbCc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi8uLi9Nb2RlbHMvTmFtZXMnO1xyXG5pbXBvcnQgdXRpbGl0eSBmcm9tICcuLi8uLi9VdGlsaXR5JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXJwU2hpcG1lbnRzRGV0YWlsJyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuRVJQU2hpcG1lbnRzLkRldGFpbCcsIFtEZXRhaWxdLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgYWN0aW9uc1RleHQ6IHJlc291cmNlLmFjdGlvbnNUZXh0LFxyXG4gIHJlbGF0ZWRJdGVtc1RleHQ6IHJlc291cmNlLnJlbGF0ZWRJdGVtc1RleHQsXHJcbiAgc2hpcG1lbnRJZFRleHQ6IHJlc291cmNlLnNoaXBtZW50SWRUZXh0LFxyXG4gIGFjY291bnRUZXh0OiByZXNvdXJjZS5hY2NvdW50VGV4dCxcclxuICBkYXRlUHJvbWlzZWRUZXh0OiByZXNvdXJjZS5kYXRlUHJvbWlzZWRUZXh0LFxyXG4gIGFjdHVhbFNoaXBEYXRlVGV4dDogcmVzb3VyY2UuYWN0dWFsU2hpcERhdGVUZXh0LFxyXG4gIGFjdHVhbERlbGl2ZXJ5RGF0ZVRleHQ6IHJlc291cmNlLmFjdHVhbERlbGl2ZXJ5RGF0ZVRleHQsXHJcbiAgY2FycmllclRleHQ6IHJlc291cmNlLmNhcnJpZXJUZXh0LFxyXG4gIGVycFN0YXR1c1RleHQ6IHJlc291cmNlLmVycFN0YXR1c1RleHQsXHJcbiAgZXJwU3RhdHVzRGF0ZVRleHQ6IHJlc291cmNlLmVycFN0YXR1c0RhdGVUZXh0LFxyXG4gIHdhcmVob3VzZUxvY2F0aW9uVGV4dDogcmVzb3VyY2Uud2FyZWhvdXNlTG9jYXRpb25UZXh0LFxyXG4gIHBhcnRpYWxTaGlwQWxsb3dlZFRleHQ6IHJlc291cmNlLnBhcnRpYWxTaGlwQWxsb3dlZFRleHQsXHJcbiAgZ3Jvc3NXZWlnaHRUZXh0OiByZXNvdXJjZS5ncm9zc1dlaWdodFRleHQsXHJcbiAgZGVjbGFyZWRWYWx1ZVRleHQ6IHJlc291cmNlLmRlY2xhcmVkVmFsdWVUZXh0LFxyXG4gIHNoaXBtZW50VG90YWxBbW91bnRUZXh0OiByZXNvdXJjZS5zaGlwbWVudFRvdGFsQW1vdW50VGV4dCxcclxuICBzaGlwbWVudFRvdGFsQmFzZUFtb3VudFRleHQ6IHJlc291cmNlLnNoaXBtZW50VG90YWxCYXNlQW1vdW50VGV4dCxcclxuICBwYXltZW50VGVybVRleHQ6IHJlc291cmNlLnBheW1lbnRUZXJtVGV4dCxcclxuICBzaGlwVG9UZXh0OiByZXNvdXJjZS5zaGlwVG9UZXh0LFxyXG4gIHNoaXBUb0FkZHJlc3NUZXh0OiByZXNvdXJjZS5zaGlwVG9BZGRyZXNzVGV4dCxcclxuICBzaGlwbWVudExpbmVzVGV4dDogcmVzb3VyY2Uuc2hpcG1lbnRMaW5lc1RleHQsXHJcbiAgZW50aXR5VGV4dDogcmVzb3VyY2UuZW50aXR5VGV4dCxcclxuICBkb2N1bWVudERhdGVUZXh0OiByZXNvdXJjZS5kb2N1bWVudERhdGVUZXh0LFxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnZXJwc2hpcG1lbnRzX2RldGFpbCcsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5FUlBTSElQTUVOVCxcclxuICByZXNvdXJjZUtpbmQ6ICdlcnBTaGlwbWVudHMnLFxyXG4gIGVuYWJsZU9mZmxpbmU6IHRydWUsXHJcblxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5b3V0IHx8ICh0aGlzLmxheW91dCA9IFt7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmFjdGlvbnNUZXh0LFxyXG4gICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICBjbHM6ICdhY3Rpb24tbGlzdCcsXHJcbiAgICAgIG5hbWU6ICdRdWlja0FjdGlvbnNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgfSwge1xyXG4gICAgICB0aXRsZTogdGhpcy5kZXRhaWxzVGV4dCxcclxuICAgICAgbmFtZTogJ0RldGFpbHNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbmFtZTogJ1NoaXBtZW50SWQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwRXh0SWQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnNoaXBtZW50SWRUZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0FjY291bnQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQWNjb3VudC5BY2NvdW50TmFtZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWNjb3VudFRleHQsXHJcbiAgICAgICAgdmlldzogJ2FjY291bnRfZGV0YWlsJyxcclxuICAgICAgICBrZXk6ICdBY2NvdW50LiRrZXknLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0RhdGVQcm9taXNlZCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdEYXRlUHJvbWlzZWQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmRhdGVQcm9taXNlZFRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQuZGF0ZShkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0FjdHVhbFNoaXBEYXRlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycEFjdHVhbFNoaXBEYXRlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5hY3R1YWxTaGlwRGF0ZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQuZGF0ZShkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0FjdHVhbERlbGl2ZXJ5RGF0ZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBBY3R1YWxEZWxpdmVyeURhdGUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFjdHVhbERlbGl2ZXJ5RGF0ZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQuZGF0ZShkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VycERvY3VtZW50RGF0ZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBEb2N1bWVudERhdGUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmRvY3VtZW50RGF0ZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQuZGF0ZShkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0NhcnJpZXInLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwQ2FycmllclBhcnR5JyxcclxuICAgICAgICBsYWJlbDogdGhpcy5jYXJyaWVyVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFUlBTdGF0dXMnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwU3RhdHVzJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5lcnBTdGF0dXNUZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VSUFN0YXR1c0RhdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwU3RhdHVzRGF0ZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZXJwU3RhdHVzRGF0ZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQuZGF0ZShkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1dhcmVob3VzZUxvY2F0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1NseExvY2F0aW9uLk5hbWUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLndhcmVob3VzZUxvY2F0aW9uVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIodmFsKSB7XHJcbiAgICAgICAgICBpZiAodmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdQYXJ0aWFsU2hpcEFsbG93ZWQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwUGFydGlhbFNoaXBBbGxvd2VkJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5wYXJ0aWFsU2hpcEFsbG93ZWRUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0Lnllc05vKGRhdGEpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnR3Jvc3NXZWlnaHQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwR3Jvc3NXZWlnaHQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmdyb3NzV2VpZ2h0VGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIodmFsKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5lbnRyeS5FcnBHcm9zc1dlaWdodFVuaXQgJiYgdmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXQubXVsdGlDdXJyZW5jeS5jYWxsKG51bGwsIHZhbCwgdGhpcy5lbnRyeS5FcnBHcm9zc1dlaWdodFVuaXQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdC5jdXJyZW5jeS5jYWxsKG51bGwsIHZhbCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdEZWNsYXJlZFZhbHVlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycERlY2xhcmVkVmFsdWUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmRlY2xhcmVkVmFsdWVUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiAodmFsdWUpID0+IHtcclxuICAgICAgICAgIHJldHVybiB1dGlsaXR5LmZvcm1hdE11bHRpQ3VycmVuY3kodmFsdWUsIHRoaXMuZW50cnkuQ3VycmVuY3lDb2RlKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1NoaXBtZW50VG90YWxCYXNlQW1vdW50JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1NoaXBtZW50VG90YWxCYXNlQW1vdW50JyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zaGlwbWVudFRvdGFsQmFzZUFtb3VudFRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHV0aWxpdHkuZm9ybWF0TXVsdGlDdXJyZW5jeSh2YWx1ZSwgdGhpcy5lbnRyeS5CYXNlQ3VycmVuY3lDb2RlKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1NoaXBtZW50VG90YWxBbW91bnQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU2hpcG1lbnRUb3RhbEFtb3VudCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc2hpcG1lbnRUb3RhbEFtb3VudFRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHV0aWxpdHkuZm9ybWF0TXVsdGlDdXJyZW5jeSh2YWx1ZSwgdGhpcy5lbnRyeS5DdXJyZW5jeUNvZGUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnUGF5bWVudFRlcm0nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwSW5jb1Rlcm0nLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnBheW1lbnRUZXJtVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTaGlwVG8nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwU2hpcFRvLk5hbWUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnNoaXBUb1RleHQsXHJcbiAgICAgICAgdmlldzogJ2VycHNoaXB0b19kZXRhaWwnLFxyXG4gICAgICAgIGtleTogJ0VycFNoaXBUby4ka2V5JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTaGlwVG9BZGRyZXNzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFNoaXBUby5BZGRyZXNzJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zaGlwVG9BZGRyZXNzVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIoZGF0YSkge1xyXG4gICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdC5hZGRyZXNzKGRhdGEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH1dLFxyXG4gICAgfSwge1xyXG4gICAgICB0aXRsZTogdGhpcy5yZWxhdGVkSXRlbXNUZXh0LFxyXG4gICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICBuYW1lOiAnUmVsYXRlZEl0ZW1zU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIG5hbWU6ICdTaGlwbWVudExpbmVzJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zaGlwbWVudExpbmVzVGV4dCxcclxuICAgICAgICB3aGVyZTogZnVuY3Rpb24gd2hlcmUoZW50cnkpIHtcclxuICAgICAgICAgIHJldHVybiBgRXJwU2hpcG1lbnQuSWQgZXEgXCIke2VudHJ5LiRrZXl9XCJgO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdmlldzogJ3NoaXBtZW50X2xpbmVzX3JlbGF0ZWQnLFxyXG4gICAgICB9XSxcclxuICAgIH1dKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5WaWV3cy5FUlBTaGlwbWVudHMuRGV0YWlsJywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==