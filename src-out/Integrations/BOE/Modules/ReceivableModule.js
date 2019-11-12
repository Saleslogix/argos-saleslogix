define('crm/Integrations/BOE/Modules/ReceivableModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './_Module', '../Views/ERPReceivables/Detail', '../Views/ERPReceivables/List', '../Views/ERPReceivableItems/List', '../Models/ErpReceivable/Offline', '../Models/ErpReceivable/SData'], function (module, exports, _declare, _lang, _Module2, _Detail, _List, _List3) {
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Modules.ReceivableModule', [_Module3.default], {
    defaultViews: ['erpreceivables_list'],
    init: function init() {},
    loadViews: function loadViews() {
      var am = this.applicationModule;

      am.registerView(new _Detail2.default());
      am.registerView(new _List2.default({
        expose: true
      }));

      am.registerView(new _List4.default({
        id: 'erpreceivable_items_related',
        expose: false
      }));
    },
    loadCustomizations: function loadCustomizations() {
      var am = this.applicationModule;

      am.registerCustomization('detail/tools', 'erpreceivables_detail', {
        at: function at(tool) {
          return tool.id === 'edit';
        },
        type: 'remove'
      });

      am.registerCustomization('list/tools', 'erpreceivables_list', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });

      am.registerCustomization('list/tools', 'erpreceivable_items_related', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });

      am.registerCustomization('detail/tools', 'erpreceivable_items_detail', {
        at: function at(tool) {
          return tool.id === 'edit';
        },
        type: 'remove'
      });
    },
    loadToolbars: function loadToolbars() {}
  });

  _lang2.default.setObject('icboe.Modules.ReceivableModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZHVsZXMvUmVjZWl2YWJsZU1vZHVsZS5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiZGVmYXVsdFZpZXdzIiwiaW5pdCIsImxvYWRWaWV3cyIsImFtIiwiYXBwbGljYXRpb25Nb2R1bGUiLCJyZWdpc3RlclZpZXciLCJleHBvc2UiLCJpZCIsImxvYWRDdXN0b21pemF0aW9ucyIsInJlZ2lzdGVyQ3VzdG9taXphdGlvbiIsImF0IiwidG9vbCIsInR5cGUiLCJsb2FkVG9vbGJhcnMiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxNQUFNQSxVQUFVLHVCQUFRLCtDQUFSLEVBQXlELGtCQUF6RCxFQUFvRTtBQUNsRkMsa0JBQWMsQ0FBQyxxQkFBRCxDQURvRTtBQUVsRkMsVUFBTSxTQUFTQSxJQUFULEdBQWdCLENBQ3JCLENBSGlGO0FBSWxGQyxlQUFXLFNBQVNBLFNBQVQsR0FBcUI7QUFDOUIsVUFBTUMsS0FBSyxLQUFLQyxpQkFBaEI7O0FBRUFELFNBQUdFLFlBQUgsQ0FBZ0Isc0JBQWhCO0FBQ0FGLFNBQUdFLFlBQUgsQ0FBZ0IsbUJBQXVCO0FBQ3JDQyxnQkFBUTtBQUQ2QixPQUF2QixDQUFoQjs7QUFJQUgsU0FBR0UsWUFBSCxDQUFnQixtQkFBMkI7QUFDekNFLFlBQUksNkJBRHFDO0FBRXpDRCxnQkFBUTtBQUZpQyxPQUEzQixDQUFoQjtBQUlELEtBaEJpRjtBQWlCbEZFLHdCQUFvQixTQUFTQSxrQkFBVCxHQUE4QjtBQUNoRCxVQUFNTCxLQUFLLEtBQUtDLGlCQUFoQjs7QUFFQUQsU0FBR00scUJBQUgsQ0FBeUIsY0FBekIsRUFBeUMsdUJBQXpDLEVBQWtFO0FBQ2hFQyxZQUFJLFNBQVNBLEVBQVQsQ0FBWUMsSUFBWixFQUFrQjtBQUNwQixpQkFBT0EsS0FBS0osRUFBTCxLQUFZLE1BQW5CO0FBQ0QsU0FIK0Q7QUFJaEVLLGNBQU07QUFKMEQsT0FBbEU7O0FBT0FULFNBQUdNLHFCQUFILENBQXlCLFlBQXpCLEVBQXVDLHFCQUF2QyxFQUE4RDtBQUM1REMsWUFBSSxTQUFTQSxFQUFULENBQVlDLElBQVosRUFBa0I7QUFDcEIsaUJBQU9BLEtBQUtKLEVBQUwsS0FBWSxLQUFuQjtBQUNELFNBSDJEO0FBSTVESyxjQUFNO0FBSnNELE9BQTlEOztBQU9BVCxTQUFHTSxxQkFBSCxDQUF5QixZQUF6QixFQUF1Qyw2QkFBdkMsRUFBc0U7QUFDcEVDLFlBQUksU0FBU0EsRUFBVCxDQUFZQyxJQUFaLEVBQWtCO0FBQ3BCLGlCQUFPQSxLQUFLSixFQUFMLEtBQVksS0FBbkI7QUFDRCxTQUhtRTtBQUlwRUssY0FBTTtBQUo4RCxPQUF0RTs7QUFPQVQsU0FBR00scUJBQUgsQ0FBeUIsY0FBekIsRUFBeUMsNEJBQXpDLEVBQXVFO0FBQ3JFQyxZQUFJLFNBQVNBLEVBQVQsQ0FBWUMsSUFBWixFQUFrQjtBQUNwQixpQkFBT0EsS0FBS0osRUFBTCxLQUFZLE1BQW5CO0FBQ0QsU0FIb0U7QUFJckVLLGNBQU07QUFKK0QsT0FBdkU7QUFNRCxLQS9DaUY7QUFnRGxGQyxrQkFBYyxTQUFTQSxZQUFULEdBQXdCLENBQ3JDO0FBakRpRixHQUFwRSxDQUFoQjs7QUFvREEsaUJBQUtDLFNBQUwsQ0FBZSxnQ0FBZixFQUFpRGYsT0FBakQ7b0JBQ2VBLE8iLCJmaWxlIjoiUmVjZWl2YWJsZU1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBfTW9kdWxlIGZyb20gJy4vX01vZHVsZSc7XHJcbmltcG9ydCBFUlBSZWNlaXZhYmxlc0RldGFpbCBmcm9tICcuLi9WaWV3cy9FUlBSZWNlaXZhYmxlcy9EZXRhaWwnO1xyXG5pbXBvcnQgRVJQUmVjZWl2YWJsZXNMaXN0IGZyb20gJy4uL1ZpZXdzL0VSUFJlY2VpdmFibGVzL0xpc3QnO1xyXG5pbXBvcnQgRVJQUmVjZWl2YWJsZUl0ZW1zTGlzdCBmcm9tICcuLi9WaWV3cy9FUlBSZWNlaXZhYmxlSXRlbXMvTGlzdCc7XHJcbmltcG9ydCAnLi4vTW9kZWxzL0VycFJlY2VpdmFibGUvT2ZmbGluZSc7XHJcbmltcG9ydCAnLi4vTW9kZWxzL0VycFJlY2VpdmFibGUvU0RhdGEnO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLk1vZHVsZXMuUmVjZWl2YWJsZU1vZHVsZScsIFtfTW9kdWxlXSwge1xyXG4gIGRlZmF1bHRWaWV3czogWydlcnByZWNlaXZhYmxlc19saXN0J10sXHJcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICB9LFxyXG4gIGxvYWRWaWV3czogZnVuY3Rpb24gbG9hZFZpZXdzKCkge1xyXG4gICAgY29uc3QgYW0gPSB0aGlzLmFwcGxpY2F0aW9uTW9kdWxlO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgRVJQUmVjZWl2YWJsZXNEZXRhaWwoKSk7XHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IEVSUFJlY2VpdmFibGVzTGlzdCh7XHJcbiAgICAgIGV4cG9zZTogdHJ1ZSxcclxuICAgIH0pKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IEVSUFJlY2VpdmFibGVJdGVtc0xpc3Qoe1xyXG4gICAgICBpZDogJ2VycHJlY2VpdmFibGVfaXRlbXNfcmVsYXRlZCcsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICB9KSk7XHJcbiAgfSxcclxuICBsb2FkQ3VzdG9taXphdGlvbnM6IGZ1bmN0aW9uIGxvYWRDdXN0b21pemF0aW9ucygpIHtcclxuICAgIGNvbnN0IGFtID0gdGhpcy5hcHBsaWNhdGlvbk1vZHVsZTtcclxuXHJcbiAgICBhbS5yZWdpc3RlckN1c3RvbWl6YXRpb24oJ2RldGFpbC90b29scycsICdlcnByZWNlaXZhYmxlc19kZXRhaWwnLCB7XHJcbiAgICAgIGF0OiBmdW5jdGlvbiBhdCh0b29sKSB7XHJcbiAgICAgICAgcmV0dXJuIHRvb2wuaWQgPT09ICdlZGl0JztcclxuICAgICAgfSxcclxuICAgICAgdHlwZTogJ3JlbW92ZScsXHJcbiAgICB9KTtcclxuXHJcbiAgICBhbS5yZWdpc3RlckN1c3RvbWl6YXRpb24oJ2xpc3QvdG9vbHMnLCAnZXJwcmVjZWl2YWJsZXNfbGlzdCcsIHtcclxuICAgICAgYXQ6IGZ1bmN0aW9uIGF0KHRvb2wpIHtcclxuICAgICAgICByZXR1cm4gdG9vbC5pZCA9PT0gJ25ldyc7XHJcbiAgICAgIH0sXHJcbiAgICAgIHR5cGU6ICdyZW1vdmUnLFxyXG4gICAgfSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJDdXN0b21pemF0aW9uKCdsaXN0L3Rvb2xzJywgJ2VycHJlY2VpdmFibGVfaXRlbXNfcmVsYXRlZCcsIHtcclxuICAgICAgYXQ6IGZ1bmN0aW9uIGF0KHRvb2wpIHtcclxuICAgICAgICByZXR1cm4gdG9vbC5pZCA9PT0gJ25ldyc7XHJcbiAgICAgIH0sXHJcbiAgICAgIHR5cGU6ICdyZW1vdmUnLFxyXG4gICAgfSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJDdXN0b21pemF0aW9uKCdkZXRhaWwvdG9vbHMnLCAnZXJwcmVjZWl2YWJsZV9pdGVtc19kZXRhaWwnLCB7XHJcbiAgICAgIGF0OiBmdW5jdGlvbiBhdCh0b29sKSB7XHJcbiAgICAgICAgcmV0dXJuIHRvb2wuaWQgPT09ICdlZGl0JztcclxuICAgICAgfSxcclxuICAgICAgdHlwZTogJ3JlbW92ZScsXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGxvYWRUb29sYmFyczogZnVuY3Rpb24gbG9hZFRvb2xiYXJzKCkge1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLk1vZHVsZXMuUmVjZWl2YWJsZU1vZHVsZScsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=