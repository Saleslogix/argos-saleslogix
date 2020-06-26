define("crm/Integrations/BOE/Views/ERPShipments/Detail", ["exports", "dojo/_base/declare", "dojo/_base/lang", "crm/Format", "argos/Detail", "../../Models/Names", "../../Utility", "argos/I18n"], function (_exports, _declare, _lang, _Format, _Detail, _Names, _Utility, _I18n) {
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
  _Utility = _interopRequireDefault(_Utility);
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
  var resource = (0, _I18n["default"])('erpShipmentsDetail');

  var __class = (0, _declare["default"])('crm.Integrations.BOE.Views.ERPShipments.Detail', [_Detail["default"]], {
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
    modelName: _Names["default"].ERPSHIPMENT,
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
            return _Format["default"].date(data);
          }
        }, {
          name: 'ActualShipDate',
          property: 'ErpActualShipDate',
          label: this.actualShipDateText,
          renderer: function renderer(data) {
            return _Format["default"].date(data);
          }
        }, {
          name: 'ActualDeliveryDate',
          property: 'ErpActualDeliveryDate',
          label: this.actualDeliveryDateText,
          renderer: function renderer(data) {
            return _Format["default"].date(data);
          }
        }, {
          name: 'ErpDocumentDate',
          property: 'ErpDocumentDate',
          label: this.documentDateText,
          renderer: function renderer(data) {
            return _Format["default"].date(data);
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
            return _Format["default"].date(data);
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
            return _Format["default"].yesNo(data);
          }
        }, {
          name: 'GrossWeight',
          property: 'ErpGrossWeight',
          label: this.grossWeightText,
          renderer: function renderer(val) {
            if (this.entry.ErpGrossWeightUnit && val) {
              return _Format["default"].multiCurrency.call(null, val, this.entry.ErpGrossWeightUnit);
            }

            return _Format["default"].currency.call(null, val);
          }
        }, {
          name: 'DeclaredValue',
          property: 'ErpDeclaredValue',
          label: this.declaredValueText,
          renderer: function renderer(value) {
            return _Utility["default"].formatMultiCurrency(value, _this.entry.CurrencyCode);
          }
        }, {
          name: 'ShipmentTotalBaseAmount',
          property: 'ShipmentTotalBaseAmount',
          label: this.shipmentTotalBaseAmountText,
          renderer: function renderer(value) {
            return _Utility["default"].formatMultiCurrency(value, _this.entry.BaseCurrencyCode);
          }
        }, {
          name: 'ShipmentTotalAmount',
          property: 'ShipmentTotalAmount',
          label: this.shipmentTotalAmountText,
          renderer: function renderer(value) {
            return _Utility["default"].formatMultiCurrency(value, _this.entry.CurrencyCode);
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
              return _Format["default"].address(data);
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
            return "ErpShipment.Id eq \"".concat(entry.$key, "\"");
          },
          view: 'shipment_lines_related'
        }]
      }]);
    }
  });

  _lang["default"].setObject('icboe.Views.ERPShipments.Detail', __class);

  var _default = __class;
  _exports["default"] = _default;
});