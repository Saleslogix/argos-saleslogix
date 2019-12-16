define('crm/Integrations/BOE/Views/Locations/QuoteItemAvailabilityList', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './PricingAvailabilityList', '../../PricingAvailabilityService', '../../Models/Names'], function (module, exports, _declare, _lang, _PricingAvailabilityList, _PricingAvailabilityService, _Names) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _PricingAvailabilityList2 = _interopRequireDefault(_PricingAvailabilityList);

  var _PricingAvailabilityService2 = _interopRequireDefault(_PricingAvailabilityService);

  var _Names2 = _interopRequireDefault(_Names);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.Locations.QuoteItemAvailabilityList', [_PricingAvailabilityList2.default], {
    // View Properties
    id: 'locations_quoteItemAvailabilityList',
    modelName: _Names2.default.QUOTEITEM,
    processWarehouse: function processWarehouse(warehouse) {
      var _this = this;

      var promise = new Promise(function (resolve) {
        _this._model.updateItemWithWarehouse(_this.options.quoteItem, warehouse).then(function (result) {
          resolve(result);
        });
      });
      return promise;
    },
    getAvailability: function getAvailability() {
      var _this2 = this;

      var promise = new Promise(function (resolve) {
        if (_this2.options && _this2.options.quoteItem) {
          _PricingAvailabilityService2.default.getQuoteItemAvailability(_this2.options.quoteItem).then(function (entries) {
            resolve(entries);
          }, function () {
            resolve([]);
          });
        }
      });
      return promise;
    }
  }); /* Copyright 2017 Infor
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

  _lang2.default.setObject('icboe.Views.Locations.QuoteItemAvailabilityList', __class);
  exports.default = __class;
  module.exports = exports['default'];
});