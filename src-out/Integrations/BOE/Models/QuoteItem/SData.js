define('crm/Integrations/BOE/Models/QuoteItem/SData', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names', '../../PricingAvailabilityService'], function (module, exports, _declare, _lang, _Base, _SDataModelBase2, _Manager, _Types, _Names, _PricingAvailabilityService) {
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.QuoteItem.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'quoteitem_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'ErpLineNumber',
        querySelect: ['Description', 'ErpLineNumber', 'ErpLineTotalAmount', 'ErpStatus', 'ErpStatusDate', 'Quantity', 'Price', 'ExtendedPrice', 'DocExtendedPrice', 'CalculatedPrice', 'DocCalculatedPrice', 'DocTotalAmount', 'ErpUnitPrice', 'ProductName', 'CreateDate', 'ModifyDate', 'Quote/ErpLogicalId', 'Quote/QuoteNumber', 'Quote/CurrencyCode', 'Quote/BaseCurrencyCode', 'SlxLocation/Description', 'Product/Name', 'UnitOfMeasure/*', 'SlxLocation/*']
      }, {
        name: 'detail',
        querySelect: ['Description', 'ErpLineNumber', 'ExtendedPrice', 'ActualId', 'Discount', 'CalculatedPrice', 'Status', 'Quantity', 'Price', 'ExtendedPrice', 'DocExtendedPrice', 'CalculatedPrice', 'DocTotalAmount', 'DocCalculatedPrice', 'ProductName', 'CreateDate', 'ModifyDate', 'Quote/QuoteNumber', 'OpenQuantity', 'DropShip', 'FixedPrice', 'RushRequest', 'Quote/CurrencyCode', 'Quote/BaseCurrencyCode', 'Quote/ErpLogicalId', 'Product/*', 'UnitOfMeasure/*', 'SlxLocation/*', 'Product/Name'],
        queryInclude: ['$permissions']
      }, {
        name: 'edit',
        querySelect: ['Description', 'ExtendedPrice', 'ActualId', 'Discount', 'CalculatedPrice', 'Status', 'Quantity', 'Price', 'ExtendedPrice', 'DocExtendedPrice', 'CalculatedPrice', 'DocCalculatedPrice', 'DocTotalAmount', 'ProductName', 'CreateDate', 'ModifyDate', 'Quote/QuoteNumber', 'Quote/ErpLogicalId', 'OpenQuantity', 'DropShip', 'FixedPrice', 'RushRequest', 'Quote/CurrencyCode', 'Quote/BaseCurrencyCode', 'Product/*', 'UnitOfMeasure/*', 'SlxLocation/*'],
        queryInclude: ['$permissions']
      }];
    },
    updateItemWithWarehouse: function updateItemWithWarehouse(quoteItem, warehouse) {
      var _this = this;

      var promise = new Promise(function (resolve) {
        _PricingAvailabilityService2.default.updateQuoteItemWarehouse(quoteItem, warehouse.SlxLocation, warehouse.SlxLocationID, warehouse.ATPDate).then(function () {
          quoteItem.SlxLocation = {
            $key: warehouse.SlxLocationID,
            description: warehouse.SlxLocation
          };
          _PricingAvailabilityService2.default.getQuoteItemPricing(quoteItem).then(function (pricingData) {
            var entry = _this.createPricingEntryForUpdate(quoteItem, pricingData);
            _this.updateEntry(entry, { overwrite: true }).then(function (result) {
              resolve(result);
            });
          });
        });
      });
      return promise;
    },
    createPricingEntryForUpdate: function createPricingEntryForUpdate(quoteItem, pricingData) {
      var entry = {};
      entry.$key = quoteItem.$key;
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

  _Manager2.default.register(_Names2.default.QUOTEITEM, _Types2.default.SDATA, __class);
  _lang2.default.setObject('icboe.Models.QuoteItem.SData', __class);
  exports.default = __class;
  module.exports = exports['default'];
});