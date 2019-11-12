define('crm/Integrations/BOE/Modules/ShipmentModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './_Module', '../Views/ERPShipments/Detail', '../Views/ERPShipments/List', '../Views/ERPShipmentItems/List', '../Models/ErpShipment/Offline', '../Models/ErpShipment/SData'], function (module, exports, _declare, _lang, _Module2, _Detail, _List, _List3) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Module3 = _interopRequireDefault(_Module2);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _List2 = _interopRequireDefault(_List);

  var _List4 = _interopRequireDefault(_List3);

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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Modules.ShipmentModule', [_Module3.default], {
    defaultViews: ['erpshipments_list'],
    init: function init() {},
    loadViews: function loadViews() {
      var am = this.applicationModule;

      am.registerView(new _Detail2.default());
      am.registerView(new _List2.default());

      am.registerView(new _List4.default({
        id: 'shipment_lines_related',
        hasSettings: false,
        expose: false
      }));
    },
    loadCustomizations: function loadCustomizations() {
      var am = this.applicationModule;
      am.registerCustomization('list/tools', 'erpshipments_list', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });

      am.registerCustomization('list/tools', 'shipment_lines_related', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });

      am.registerCustomization('detail/tools', 'erpshipments_detail', {
        at: function at(tool) {
          return tool.id === 'edit';
        },
        type: 'remove'
      });
    },
    loadToolbars: function loadToolbars() {}
  });
  _lang2.default.setObject('icboe.Modules.ShipmentModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZHVsZXMvU2hpcG1lbnRNb2R1bGUuanMiXSwibmFtZXMiOlsiX19jbGFzcyIsImRlZmF1bHRWaWV3cyIsImluaXQiLCJsb2FkVmlld3MiLCJhbSIsImFwcGxpY2F0aW9uTW9kdWxlIiwicmVnaXN0ZXJWaWV3IiwiaWQiLCJoYXNTZXR0aW5ncyIsImV4cG9zZSIsImxvYWRDdXN0b21pemF0aW9ucyIsInJlZ2lzdGVyQ3VzdG9taXphdGlvbiIsImF0IiwidG9vbCIsInR5cGUiLCJsb2FkVG9vbGJhcnMiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxNQUFNQSxVQUFVLHVCQUFRLDZDQUFSLEVBQXVELGtCQUF2RCxFQUFrRTtBQUNoRkMsa0JBQWMsQ0FBQyxtQkFBRCxDQURrRTtBQUVoRkMsVUFBTSxTQUFTQSxJQUFULEdBQWdCLENBQ3JCLENBSCtFO0FBSWhGQyxlQUFXLFNBQVNBLFNBQVQsR0FBcUI7QUFDOUIsVUFBTUMsS0FBSyxLQUFLQyxpQkFBaEI7O0FBRUFELFNBQUdFLFlBQUgsQ0FBZ0Isc0JBQWhCO0FBQ0FGLFNBQUdFLFlBQUgsQ0FBZ0Isb0JBQWhCOztBQUVBRixTQUFHRSxZQUFILENBQWdCLG1CQUFzQjtBQUNwQ0MsWUFBSSx3QkFEZ0M7QUFFcENDLHFCQUFhLEtBRnVCO0FBR3BDQyxnQkFBUTtBQUg0QixPQUF0QixDQUFoQjtBQUtELEtBZitFO0FBZ0JoRkMsd0JBQW9CLFNBQVNBLGtCQUFULEdBQThCO0FBQ2hELFVBQU1OLEtBQUssS0FBS0MsaUJBQWhCO0FBQ0FELFNBQUdPLHFCQUFILENBQXlCLFlBQXpCLEVBQXVDLG1CQUF2QyxFQUE0RDtBQUMxREMsWUFBSSxTQUFTQSxFQUFULENBQVlDLElBQVosRUFBa0I7QUFDcEIsaUJBQU9BLEtBQUtOLEVBQUwsS0FBWSxLQUFuQjtBQUNELFNBSHlEO0FBSTFETyxjQUFNO0FBSm9ELE9BQTVEOztBQU9BVixTQUFHTyxxQkFBSCxDQUF5QixZQUF6QixFQUF1Qyx3QkFBdkMsRUFBaUU7QUFDL0RDLFlBQUksU0FBU0EsRUFBVCxDQUFZQyxJQUFaLEVBQWtCO0FBQ3BCLGlCQUFPQSxLQUFLTixFQUFMLEtBQVksS0FBbkI7QUFDRCxTQUg4RDtBQUkvRE8sY0FBTTtBQUp5RCxPQUFqRTs7QUFPQVYsU0FBR08scUJBQUgsQ0FBeUIsY0FBekIsRUFBeUMscUJBQXpDLEVBQWdFO0FBQzlEQyxZQUFJLFNBQVNBLEVBQVQsQ0FBWUMsSUFBWixFQUFrQjtBQUNwQixpQkFBT0EsS0FBS04sRUFBTCxLQUFZLE1BQW5CO0FBQ0QsU0FINkQ7QUFJOURPLGNBQU07QUFKd0QsT0FBaEU7QUFNRCxLQXRDK0U7QUF1Q2hGQyxrQkFBYyxTQUFTQSxZQUFULEdBQXdCLENBQ3JDO0FBeEMrRSxHQUFsRSxDQUFoQjtBQTBDQSxpQkFBS0MsU0FBTCxDQUFlLDhCQUFmLEVBQStDaEIsT0FBL0M7b0JBQ2VBLE8iLCJmaWxlIjoiU2hpcG1lbnRNb2R1bGUuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgX01vZHVsZSBmcm9tICcuL19Nb2R1bGUnO1xyXG5pbXBvcnQgU2hpcG1lbnRzRGV0YWlsIGZyb20gJy4uL1ZpZXdzL0VSUFNoaXBtZW50cy9EZXRhaWwnO1xyXG5pbXBvcnQgU2hpcG1lbnRzTGlzdCBmcm9tICcuLi9WaWV3cy9FUlBTaGlwbWVudHMvTGlzdCc7XHJcbmltcG9ydCBTaGlwbWVudEl0ZW1zTGlzdCBmcm9tICcuLi9WaWV3cy9FUlBTaGlwbWVudEl0ZW1zL0xpc3QnO1xyXG5pbXBvcnQgJy4uL01vZGVscy9FcnBTaGlwbWVudC9PZmZsaW5lJztcclxuaW1wb3J0ICcuLi9Nb2RlbHMvRXJwU2hpcG1lbnQvU0RhdGEnO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLk1vZHVsZXMuU2hpcG1lbnRNb2R1bGUnLCBbX01vZHVsZV0sIHtcclxuICBkZWZhdWx0Vmlld3M6IFsnZXJwc2hpcG1lbnRzX2xpc3QnXSxcclxuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xyXG4gIH0sXHJcbiAgbG9hZFZpZXdzOiBmdW5jdGlvbiBsb2FkVmlld3MoKSB7XHJcbiAgICBjb25zdCBhbSA9IHRoaXMuYXBwbGljYXRpb25Nb2R1bGU7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBTaGlwbWVudHNEZXRhaWwoKSk7XHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IFNoaXBtZW50c0xpc3QoKSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBTaGlwbWVudEl0ZW1zTGlzdCh7XHJcbiAgICAgIGlkOiAnc2hpcG1lbnRfbGluZXNfcmVsYXRlZCcsXHJcbiAgICAgIGhhc1NldHRpbmdzOiBmYWxzZSxcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgIH0pKTtcclxuICB9LFxyXG4gIGxvYWRDdXN0b21pemF0aW9uczogZnVuY3Rpb24gbG9hZEN1c3RvbWl6YXRpb25zKCkge1xyXG4gICAgY29uc3QgYW0gPSB0aGlzLmFwcGxpY2F0aW9uTW9kdWxlO1xyXG4gICAgYW0ucmVnaXN0ZXJDdXN0b21pemF0aW9uKCdsaXN0L3Rvb2xzJywgJ2VycHNoaXBtZW50c19saXN0Jywge1xyXG4gICAgICBhdDogZnVuY3Rpb24gYXQodG9vbCkge1xyXG4gICAgICAgIHJldHVybiB0b29sLmlkID09PSAnbmV3JztcclxuICAgICAgfSxcclxuICAgICAgdHlwZTogJ3JlbW92ZScsXHJcbiAgICB9KTtcclxuXHJcbiAgICBhbS5yZWdpc3RlckN1c3RvbWl6YXRpb24oJ2xpc3QvdG9vbHMnLCAnc2hpcG1lbnRfbGluZXNfcmVsYXRlZCcsIHtcclxuICAgICAgYXQ6IGZ1bmN0aW9uIGF0KHRvb2wpIHtcclxuICAgICAgICByZXR1cm4gdG9vbC5pZCA9PT0gJ25ldyc7XHJcbiAgICAgIH0sXHJcbiAgICAgIHR5cGU6ICdyZW1vdmUnLFxyXG4gICAgfSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJDdXN0b21pemF0aW9uKCdkZXRhaWwvdG9vbHMnLCAnZXJwc2hpcG1lbnRzX2RldGFpbCcsIHtcclxuICAgICAgYXQ6IGZ1bmN0aW9uIGF0KHRvb2wpIHtcclxuICAgICAgICByZXR1cm4gdG9vbC5pZCA9PT0gJ2VkaXQnO1xyXG4gICAgICB9LFxyXG4gICAgICB0eXBlOiAncmVtb3ZlJyxcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgbG9hZFRvb2xiYXJzOiBmdW5jdGlvbiBsb2FkVG9vbGJhcnMoKSB7XHJcbiAgfSxcclxufSk7XHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5Nb2R1bGVzLlNoaXBtZW50TW9kdWxlJywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==