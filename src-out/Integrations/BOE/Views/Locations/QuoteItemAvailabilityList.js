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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0xvY2F0aW9ucy9RdW90ZUl0ZW1BdmFpbGFiaWxpdHlMaXN0LmpzIl0sIm5hbWVzIjpbIl9fY2xhc3MiLCJpZCIsIm1vZGVsTmFtZSIsIlFVT1RFSVRFTSIsInByb2Nlc3NXYXJlaG91c2UiLCJ3YXJlaG91c2UiLCJwcm9taXNlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJfbW9kZWwiLCJ1cGRhdGVJdGVtV2l0aFdhcmVob3VzZSIsIm9wdGlvbnMiLCJxdW90ZUl0ZW0iLCJ0aGVuIiwicmVzdWx0IiwiZ2V0QXZhaWxhYmlsaXR5IiwiZ2V0UXVvdGVJdGVtQXZhaWxhYmlsaXR5IiwiZW50cmllcyIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU1BLFVBQVUsdUJBQVEsZ0VBQVIsRUFBMEUsbUNBQTFFLEVBQWtGO0FBQ2hHO0FBQ0FDLFFBQUkscUNBRjRGO0FBR2hHQyxlQUFXLGdCQUFZQyxTQUh5RTtBQUloR0Msc0JBQWtCLFNBQVNBLGdCQUFULENBQTBCQyxTQUExQixFQUFxQztBQUFBOztBQUNyRCxVQUFNQyxVQUFVLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQWE7QUFDdkMsY0FBS0MsTUFBTCxDQUFZQyx1QkFBWixDQUFvQyxNQUFLQyxPQUFMLENBQWFDLFNBQWpELEVBQTREUCxTQUE1RCxFQUF1RVEsSUFBdkUsQ0FBNEUsVUFBQ0MsTUFBRCxFQUFZO0FBQ3RGTixrQkFBUU0sTUFBUjtBQUNELFNBRkQ7QUFHRCxPQUplLENBQWhCO0FBS0EsYUFBT1IsT0FBUDtBQUNELEtBWCtGO0FBWWhHUyxxQkFBaUIsU0FBU0EsZUFBVCxHQUEyQjtBQUFBOztBQUMxQyxVQUFNVCxVQUFVLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQWE7QUFDdkMsWUFBSSxPQUFLRyxPQUFMLElBQWdCLE9BQUtBLE9BQUwsQ0FBYUMsU0FBakMsRUFBNEM7QUFDMUMsK0NBQTJCSSx3QkFBM0IsQ0FBb0QsT0FBS0wsT0FBTCxDQUFhQyxTQUFqRSxFQUE0RUMsSUFBNUUsQ0FBaUYsVUFBQ0ksT0FBRCxFQUFhO0FBQzVGVCxvQkFBUVMsT0FBUjtBQUNELFdBRkQsRUFFRyxZQUFNO0FBQ1BULG9CQUFRLEVBQVI7QUFDRCxXQUpEO0FBS0Q7QUFDRixPQVJlLENBQWhCO0FBU0EsYUFBT0YsT0FBUDtBQUNEO0FBdkIrRixHQUFsRixDQUFoQixDLENBckJBOzs7Ozs7Ozs7Ozs7Ozs7QUErQ0EsaUJBQUtZLFNBQUwsQ0FBZSxpREFBZixFQUFrRWxCLE9BQWxFO29CQUNlQSxPIiwiZmlsZSI6IlF1b3RlSXRlbUF2YWlsYWJpbGl0eUxpc3QuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgTGlzdCBmcm9tICcuL1ByaWNpbmdBdmFpbGFiaWxpdHlMaXN0JztcclxuaW1wb3J0IFByaWNpbmdBdmFpbGFiaWxpdHlTZXJ2aWNlIGZyb20gJy4uLy4uL1ByaWNpbmdBdmFpbGFiaWxpdHlTZXJ2aWNlJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuTG9jYXRpb25zLlF1b3RlSXRlbUF2YWlsYWJpbGl0eUxpc3QnLCBbTGlzdF0sIHtcclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ2xvY2F0aW9uc19xdW90ZUl0ZW1BdmFpbGFiaWxpdHlMaXN0JyxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLlFVT1RFSVRFTSxcclxuICBwcm9jZXNzV2FyZWhvdXNlOiBmdW5jdGlvbiBwcm9jZXNzV2FyZWhvdXNlKHdhcmVob3VzZSkge1xyXG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHRoaXMuX21vZGVsLnVwZGF0ZUl0ZW1XaXRoV2FyZWhvdXNlKHRoaXMub3B0aW9ucy5xdW90ZUl0ZW0sIHdhcmVob3VzZSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfSxcclxuICBnZXRBdmFpbGFiaWxpdHk6IGZ1bmN0aW9uIGdldEF2YWlsYWJpbGl0eSgpIHtcclxuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5xdW90ZUl0ZW0pIHtcclxuICAgICAgICBQcmljaW5nQXZhaWxhYmlsaXR5U2VydmljZS5nZXRRdW90ZUl0ZW1BdmFpbGFiaWxpdHkodGhpcy5vcHRpb25zLnF1b3RlSXRlbSkudGhlbigoZW50cmllcykgPT4ge1xyXG4gICAgICAgICAgcmVzb2x2ZShlbnRyaWVzKTtcclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICByZXNvbHZlKFtdKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcHJvbWlzZTtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5WaWV3cy5Mb2NhdGlvbnMuUXVvdGVJdGVtQXZhaWxhYmlsaXR5TGlzdCcsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=