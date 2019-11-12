define('crm/Integrations/BOE/Modules/SalesOrderItemModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './_Module', '../Views/Locations/PricingAvailabilityList', '../Views/SalesOrders/List', '../Views/SalesOrderItems/Detail', '../Views/SalesOrderItems/Edit', '../Views/UnitsOfMeasure/List', '../Views/Locations/List', '../Models/SalesOrderItem/Offline', '../Models/SalesOrderItem/SData'], function (module, exports, _declare, _lang, _Module2, _PricingAvailabilityList, _List, _Detail, _Edit, _List3, _List5) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Module3 = _interopRequireDefault(_Module2);

  var _PricingAvailabilityList2 = _interopRequireDefault(_PricingAvailabilityList);

  var _List2 = _interopRequireDefault(_List);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _List4 = _interopRequireDefault(_List3);

  var _List6 = _interopRequireDefault(_List5);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Modules.SalesOrderItemModule', [_Module3.default], {
    init: function init() {},
    loadViews: function loadViews() {
      var am = this.applicationModule;
      am.registerView(new _Detail2.default());
      am.registerView(new _List2.default({
        expose: false,
        id: 'orderitem_salesorder_list'
      }));
      am.registerView(new _Edit2.default());
      am.registerView(new _List4.default({
        id: 'orderitem_unitofmeasure_list',
        hasSettings: false
      }));

      am.registerView(new _PricingAvailabilityList2.default({
        id: 'orderline_pricingAvailabilityLocations',
        entityType: 'SalesOrderItem',
        requestType: 'SalesOrderItemAvailable',
        parentEntity: 'SalesOrder',
        singleSelectAction: 'complete'
      }));

      am.registerView(new _List6.default());
    },
    loadCustomizations: function loadCustomizations() {},
    loadToolbars: function loadToolbars() {}
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

  _lang2.default.setObject('icboe.Modules.SalesOrderItemModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZHVsZXMvU2FsZXNPcmRlckl0ZW1Nb2R1bGUuanMiXSwibmFtZXMiOlsiX19jbGFzcyIsImluaXQiLCJsb2FkVmlld3MiLCJhbSIsImFwcGxpY2F0aW9uTW9kdWxlIiwicmVnaXN0ZXJWaWV3IiwiZXhwb3NlIiwiaWQiLCJoYXNTZXR0aW5ncyIsImVudGl0eVR5cGUiLCJyZXF1ZXN0VHlwZSIsInBhcmVudEVudGl0eSIsInNpbmdsZVNlbGVjdEFjdGlvbiIsImxvYWRDdXN0b21pemF0aW9ucyIsImxvYWRUb29sYmFycyIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQkEsTUFBTUEsVUFBVSx1QkFBUSxtREFBUixFQUE2RCxrQkFBN0QsRUFBd0U7QUFDdEZDLFVBQU0sU0FBU0EsSUFBVCxHQUFnQixDQUNyQixDQUZxRjtBQUd0RkMsZUFBVyxTQUFTQSxTQUFULEdBQXFCO0FBQzlCLFVBQU1DLEtBQUssS0FBS0MsaUJBQWhCO0FBQ0FELFNBQUdFLFlBQUgsQ0FBZ0Isc0JBQWhCO0FBQ0FGLFNBQUdFLFlBQUgsQ0FBZ0IsbUJBQW1CO0FBQ2pDQyxnQkFBUSxLQUR5QjtBQUVqQ0MsWUFBSTtBQUY2QixPQUFuQixDQUFoQjtBQUlBSixTQUFHRSxZQUFILENBQWdCLG9CQUFoQjtBQUNBRixTQUFHRSxZQUFILENBQWdCLG1CQUFzQjtBQUNwQ0UsWUFBSSw4QkFEZ0M7QUFFcENDLHFCQUFhO0FBRnVCLE9BQXRCLENBQWhCOztBQUtBTCxTQUFHRSxZQUFILENBQWdCLHNDQUFvQztBQUNsREUsWUFBSSx3Q0FEOEM7QUFFbERFLG9CQUFZLGdCQUZzQztBQUdsREMscUJBQWEseUJBSHFDO0FBSWxEQyxzQkFBYyxZQUpvQztBQUtsREMsNEJBQW9CO0FBTDhCLE9BQXBDLENBQWhCOztBQVFBVCxTQUFHRSxZQUFILENBQWdCLG9CQUFoQjtBQUNELEtBekJxRjtBQTBCdEZRLHdCQUFvQixTQUFTQSxrQkFBVCxHQUE4QixDQUNqRCxDQTNCcUY7QUE0QnRGQyxrQkFBYyxTQUFTQSxZQUFULEdBQXdCLENBQ3JDO0FBN0JxRixHQUF4RSxDQUFoQixDLENBM0JBOzs7Ozs7Ozs7Ozs7Ozs7QUEyREEsaUJBQUtDLFNBQUwsQ0FBZSxvQ0FBZixFQUFxRGYsT0FBckQ7b0JBQ2VBLE8iLCJmaWxlIjoiU2FsZXNPcmRlckl0ZW1Nb2R1bGUuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgX01vZHVsZSBmcm9tICcuL19Nb2R1bGUnO1xyXG5pbXBvcnQgTG9jYXRpb25QcmljaW5nQXZhaWxhYmlsaXR5TGlzdCBmcm9tICcuLi9WaWV3cy9Mb2NhdGlvbnMvUHJpY2luZ0F2YWlsYWJpbGl0eUxpc3QnO1xyXG5pbXBvcnQgU2FsZXNPcmRlckxpc3QgZnJvbSAnLi4vVmlld3MvU2FsZXNPcmRlcnMvTGlzdCc7XHJcbmltcG9ydCBTYWxlc09yZGVySXRlbURldGFpbCBmcm9tICcuLi9WaWV3cy9TYWxlc09yZGVySXRlbXMvRGV0YWlsJztcclxuaW1wb3J0IFNhbGVzT3JkZXJJdGVtRWRpdCBmcm9tICcuLi9WaWV3cy9TYWxlc09yZGVySXRlbXMvRWRpdCc7XHJcbmltcG9ydCBVbml0T2ZNZWFzdXJlTGlzdCBmcm9tICcuLi9WaWV3cy9Vbml0c09mTWVhc3VyZS9MaXN0JztcclxuaW1wb3J0IFNseExvY2F0aW9uTGlzdCBmcm9tICcuLi9WaWV3cy9Mb2NhdGlvbnMvTGlzdCc7XHJcbmltcG9ydCAnLi4vTW9kZWxzL1NhbGVzT3JkZXJJdGVtL09mZmxpbmUnO1xyXG5pbXBvcnQgJy4uL01vZGVscy9TYWxlc09yZGVySXRlbS9TRGF0YSc7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuTW9kdWxlcy5TYWxlc09yZGVySXRlbU1vZHVsZScsIFtfTW9kdWxlXSwge1xyXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgfSxcclxuICBsb2FkVmlld3M6IGZ1bmN0aW9uIGxvYWRWaWV3cygpIHtcclxuICAgIGNvbnN0IGFtID0gdGhpcy5hcHBsaWNhdGlvbk1vZHVsZTtcclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgU2FsZXNPcmRlckl0ZW1EZXRhaWwoKSk7XHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IFNhbGVzT3JkZXJMaXN0KHtcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgICAgaWQ6ICdvcmRlcml0ZW1fc2FsZXNvcmRlcl9saXN0JyxcclxuICAgIH0pKTtcclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgU2FsZXNPcmRlckl0ZW1FZGl0KCkpO1xyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBVbml0T2ZNZWFzdXJlTGlzdCh7XHJcbiAgICAgIGlkOiAnb3JkZXJpdGVtX3VuaXRvZm1lYXN1cmVfbGlzdCcsXHJcbiAgICAgIGhhc1NldHRpbmdzOiBmYWxzZSxcclxuICAgIH0pKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IExvY2F0aW9uUHJpY2luZ0F2YWlsYWJpbGl0eUxpc3Qoe1xyXG4gICAgICBpZDogJ29yZGVybGluZV9wcmljaW5nQXZhaWxhYmlsaXR5TG9jYXRpb25zJyxcclxuICAgICAgZW50aXR5VHlwZTogJ1NhbGVzT3JkZXJJdGVtJyxcclxuICAgICAgcmVxdWVzdFR5cGU6ICdTYWxlc09yZGVySXRlbUF2YWlsYWJsZScsXHJcbiAgICAgIHBhcmVudEVudGl0eTogJ1NhbGVzT3JkZXInLFxyXG4gICAgICBzaW5nbGVTZWxlY3RBY3Rpb246ICdjb21wbGV0ZScsXHJcbiAgICB9KSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBTbHhMb2NhdGlvbkxpc3QoKSk7XHJcbiAgfSxcclxuICBsb2FkQ3VzdG9taXphdGlvbnM6IGZ1bmN0aW9uIGxvYWRDdXN0b21pemF0aW9ucygpIHtcclxuICB9LFxyXG4gIGxvYWRUb29sYmFyczogZnVuY3Rpb24gbG9hZFRvb2xiYXJzKCkge1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLk1vZHVsZXMuU2FsZXNPcmRlckl0ZW1Nb2R1bGUnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19