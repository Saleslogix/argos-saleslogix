define('crm/Integrations/BOE/Views/Locations/SalesOrderItemAvailabilityList', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './PricingAvailabilityList', '../../PricingAvailabilityService', '../../Models/Names'], function (module, exports, _declare, _lang, _PricingAvailabilityList, _PricingAvailabilityService, _Names) {
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.Locations.SalesOrderItemAvailabilityList', [_PricingAvailabilityList2.default], {
    // View Properties
    id: 'locations_salesOrderItemAvailabilityList',
    modelName: _Names2.default.SALESORDERITEM,
    processWarehouse: function processWarehouse(warehouse) {
      var _this = this;

      var promise = new Promise(function (resolve) {
        _this._model.updateItemWithWarehouse(_this.options.orderItem, warehouse).then(function (result) {
          resolve(result);
        });
      });
      return promise;
    },
    getAvailability: function getAvailabilityy() {
      var _this2 = this;

      var promise = new Promise(function (resolve) {
        if (_this2.options && _this2.options.orderItem) {
          _PricingAvailabilityService2.default.getOrderItemAvailability(_this2.options.orderItem).then(function (entries) {
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

  _lang2.default.setObject('icboe.Views.Locations.SalesOrderItemAvailabilityList', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0xvY2F0aW9ucy9TYWxlc09yZGVySXRlbUF2YWlsYWJpbGl0eUxpc3QuanMiXSwibmFtZXMiOlsiX19jbGFzcyIsImlkIiwibW9kZWxOYW1lIiwiU0FMRVNPUkRFUklURU0iLCJwcm9jZXNzV2FyZWhvdXNlIiwid2FyZWhvdXNlIiwicHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiX21vZGVsIiwidXBkYXRlSXRlbVdpdGhXYXJlaG91c2UiLCJvcHRpb25zIiwib3JkZXJJdGVtIiwidGhlbiIsInJlc3VsdCIsImdldEF2YWlsYWJpbGl0eSIsImdldEF2YWlsYWJpbGl0eXkiLCJnZXRPcmRlckl0ZW1BdmFpbGFiaWxpdHkiLCJlbnRyaWVzIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkEsTUFBTUEsVUFBVSx1QkFBUSxxRUFBUixFQUErRSxtQ0FBL0UsRUFBdUY7QUFDckc7QUFDQUMsUUFBSSwwQ0FGaUc7QUFHckdDLGVBQVcsZ0JBQVlDLGNBSDhFO0FBSXJHQyxzQkFBa0IsU0FBU0EsZ0JBQVQsQ0FBMEJDLFNBQTFCLEVBQXFDO0FBQUE7O0FBQ3JELFVBQU1DLFVBQVUsSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBYTtBQUN2QyxjQUFLQyxNQUFMLENBQVlDLHVCQUFaLENBQW9DLE1BQUtDLE9BQUwsQ0FBYUMsU0FBakQsRUFBNERQLFNBQTVELEVBQXVFUSxJQUF2RSxDQUE0RSxVQUFDQyxNQUFELEVBQVk7QUFDdEZOLGtCQUFRTSxNQUFSO0FBQ0QsU0FGRDtBQUdELE9BSmUsQ0FBaEI7QUFLQSxhQUFPUixPQUFQO0FBQ0QsS0FYb0c7QUFZckdTLHFCQUFpQixTQUFTQyxnQkFBVCxHQUE0QjtBQUFBOztBQUMzQyxVQUFNVixVQUFVLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQWE7QUFDdkMsWUFBSSxPQUFLRyxPQUFMLElBQWdCLE9BQUtBLE9BQUwsQ0FBYUMsU0FBakMsRUFBNEM7QUFDMUMsK0NBQTJCSyx3QkFBM0IsQ0FBb0QsT0FBS04sT0FBTCxDQUFhQyxTQUFqRSxFQUE0RUMsSUFBNUUsQ0FBaUYsVUFBQ0ssT0FBRCxFQUFhO0FBQzVGVixvQkFBUVUsT0FBUjtBQUNELFdBRkQsRUFFRyxZQUFNO0FBQ1BWLG9CQUFRLEVBQVI7QUFDRCxXQUpEO0FBS0Q7QUFDRixPQVJlLENBQWhCO0FBU0EsYUFBT0YsT0FBUDtBQUNEO0FBdkJvRyxHQUF2RixDQUFoQixDLENBckJBOzs7Ozs7Ozs7Ozs7Ozs7QUErQ0EsaUJBQUthLFNBQUwsQ0FBZSxzREFBZixFQUF1RW5CLE9BQXZFO29CQUNlQSxPIiwiZmlsZSI6IlNhbGVzT3JkZXJJdGVtQXZhaWxhYmlsaXR5TGlzdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBMaXN0IGZyb20gJy4vUHJpY2luZ0F2YWlsYWJpbGl0eUxpc3QnO1xyXG5pbXBvcnQgUHJpY2luZ0F2YWlsYWJpbGl0eVNlcnZpY2UgZnJvbSAnLi4vLi4vUHJpY2luZ0F2YWlsYWJpbGl0eVNlcnZpY2UnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5WaWV3cy5Mb2NhdGlvbnMuU2FsZXNPcmRlckl0ZW1BdmFpbGFiaWxpdHlMaXN0JywgW0xpc3RdLCB7XHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdsb2NhdGlvbnNfc2FsZXNPcmRlckl0ZW1BdmFpbGFiaWxpdHlMaXN0JyxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLlNBTEVTT1JERVJJVEVNLFxyXG4gIHByb2Nlc3NXYXJlaG91c2U6IGZ1bmN0aW9uIHByb2Nlc3NXYXJlaG91c2Uod2FyZWhvdXNlKSB7XHJcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgdGhpcy5fbW9kZWwudXBkYXRlSXRlbVdpdGhXYXJlaG91c2UodGhpcy5vcHRpb25zLm9yZGVySXRlbSwgd2FyZWhvdXNlKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcHJvbWlzZTtcclxuICB9LFxyXG4gIGdldEF2YWlsYWJpbGl0eTogZnVuY3Rpb24gZ2V0QXZhaWxhYmlsaXR5eSgpIHtcclxuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5vcmRlckl0ZW0pIHtcclxuICAgICAgICBQcmljaW5nQXZhaWxhYmlsaXR5U2VydmljZS5nZXRPcmRlckl0ZW1BdmFpbGFiaWxpdHkodGhpcy5vcHRpb25zLm9yZGVySXRlbSkudGhlbigoZW50cmllcykgPT4ge1xyXG4gICAgICAgICAgcmVzb2x2ZShlbnRyaWVzKTtcclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICByZXNvbHZlKFtdKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcHJvbWlzZTtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5WaWV3cy5Mb2NhdGlvbnMuU2FsZXNPcmRlckl0ZW1BdmFpbGFiaWxpdHlMaXN0JywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==