define('crm/Integrations/BOE/Models/SalesOrderItem/SData', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names', '../../PricingAvailabilityService'], function (module, exports, _declare, _lang, _Base, _SDataModelBase2, _Manager, _Types, _Names, _PricingAvailabilityService) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Base2 = _interopRequireDefault(_Base);

  var _SDataModelBase3 = _interopRequireDefault(_SDataModelBase2);

  var _Manager2 = _interopRequireDefault(_Manager);

  var _Types2 = _interopRequireDefault(_Types);

  var _Names2 = _interopRequireDefault(_Names);

  var _PricingAvailabilityService2 = _interopRequireDefault(_PricingAvailabilityService);

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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.SalesOrderItem.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'salesorderitem_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'ErpLineNumber',
        querySelect: ['Description', 'ErpLineNumber', 'ExtendedPrice', 'ErpStatus', 'ErpStatusDate', 'Quantity', 'Price', 'ExtendedPrice', 'DocExtendedPrice', 'CalculatedPrice', 'DocCalculatedPrice', 'DocTotalAmount', 'ProductName', 'CreateDate', 'ModifyDate', 'SlxLocation/Description', 'SalesOrder/ErpLogicalId', 'SalesOrder/SalesOrderNumber', 'Salesorder/CurrencyCode', 'Salesorder/BaseCurrencyCode', 'Product/Name']
      }, {
        name: 'detail',
        querySelect: ['Description', 'ErpLineNumber', 'ActualID', 'Discount', 'ExtendedPrice', 'DocExtendedPrice', 'CalculatedPrice', 'DocCalculatedPrice', 'DocTotalAmount', 'ErpStatus', 'Quantity', 'Price', 'ProductName', 'CreateDate', 'ModifyDate', 'SalesOrder/SalesOrderNumber', 'SalesOrder/CurrencyCode', 'Salesorder/BaseCurrencyCode', 'ErpShippedQuantity', 'ErpOpenQuantity', 'ErpDropShip', 'ErpBackOrdered', 'ErpPartialShipAllowed', 'ErpFixedPriceItem', 'ErpRushRequest', 'ErpSubstituteItem', 'SalesOrder/ErpLocation', 'Product/*', 'SlxLocation/*', 'UnitOfMeasure/*'],
        queryInclude: ['$permissions']
      }, {
        name: 'edit',
        querySelect: ['Description', 'ErpLineNumber', 'ErpLineTotalAmount', 'ActualID', 'Discount', 'ErpStatus', 'Quantity', 'Price', 'ExtendedPrice', 'DocExtendedPrice', 'CalculatedPrice', 'DocCalculatedPrice', 'DocTotalAmount', 'ErpUnitPrice', 'ProductName', 'CreateDate', 'ModifyDate', 'SalesOrder/SalesOrderNumber', 'SalesOrder/CurrencyCode', 'Salesorder/BaseCurrencyCode', 'ErpShippedQuantity', 'ErpOpenQuantity', 'ErpDropShip', 'ErpBackOrdered', 'ErpPartialShipAllowed', 'ErpFixedPriceItem', 'ErpRushRequest', 'ErpSubstituteItem', 'SalesOrder/ErpLocation', 'Product/*', 'SlxLocation/*', 'UnitOfMeasure/*'],
        queryInclude: ['$permissions']
      }];
    },
    updateItemWithWarehouse: function updateItemWithWarehouse(orderItem, warehouse) {
      var _this = this;

      var promise = new Promise(function (resolve) {
        _PricingAvailabilityService2.default.updateOrderItemWarehouse(orderItem, warehouse.SlxLocation, warehouse.SlxLocationID, warehouse.ATPDate).then(function () {
          orderItem.SlxLocation = {
            $key: warehouse.SlxLocationID,
            description: warehouse.SlxLocation
          };
          _PricingAvailabilityService2.default.getOrderItemPricing(orderItem).then(function (pricingData) {
            var entry = _this.createPricingEntryForUpdate(orderItem, pricingData);
            _this.updateEntry(entry, { overwrite: true }).then(function (result) {
              resolve(result);
            });
          });
        });
      });
      return promise;
    },
    createPricingEntryForUpdate: function createPricingEntryForUpdate(orderItem, pricingData) {
      var entry = {};
      entry.$key = orderItem.$key;
      if (pricingData) {
        if (pricingData.DocCalculatedPrice) {
          entry.DocCalculatedPrice = pricingData.DocCalculatedPrice.value;
        }
        if (pricingData.DocExtendedPrice) {
          entry.DocExtendedPrice = pricingData.DocExtendedPrice.value;
        }
        if (pricingData.DocTotalAmount) {
          entry.DocTotalAmount = pricingData.DocTotalAmount.value;
        }
      }
      return entry;
    }
  });

  _Manager2.default.register(_Names2.default.SALESORDERITEM, _Types2.default.SDATA, __class);
  _lang2.default.setObject('icboe.Models.SalesOrderItem.SData', __class);
  exports.default = __class;
  module.exports = exports['default'];
});