define('crm/Integrations/BOE/Modules/ShipmentLineModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './_Module', '../Views/ERPShipmentItems/Detail', '../Models/ErpShipmentItem/Offline', '../Models/ErpShipmentItem/SData'], function (module, exports, _declare, _lang, _Module2, _Detail) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Module3 = _interopRequireDefault(_Module2);

  var _Detail2 = _interopRequireDefault(_Detail);

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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Modules.ShipmentLineModule', [_Module3.default], {
    init: function init() {},
    loadViews: function loadViews() {
      var am = this.applicationModule;
      am.registerView(new _Detail2.default());
    },
    loadCustomizations: function loadCustomizations() {
      var am = this.applicationModule;
      am.registerCustomization('detail/tools', 'erpshipment_items_detail', {
        at: function at(tool) {
          return tool.id === 'edit';
        },
        type: 'remove'
      });
    },
    loadToolbars: function loadToolbars() {}
  });

  _lang2.default.setObject('icboe.Modules.ShipmentLineModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZHVsZXMvU2hpcG1lbnRMaW5lTW9kdWxlLmpzIl0sIm5hbWVzIjpbIl9fY2xhc3MiLCJpbml0IiwibG9hZFZpZXdzIiwiYW0iLCJhcHBsaWNhdGlvbk1vZHVsZSIsInJlZ2lzdGVyVmlldyIsImxvYWRDdXN0b21pemF0aW9ucyIsInJlZ2lzdGVyQ3VzdG9taXphdGlvbiIsImF0IiwidG9vbCIsImlkIiwidHlwZSIsImxvYWRUb29sYmFycyIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsTUFBTUEsVUFBVSx1QkFBUSxpREFBUixFQUEyRCxrQkFBM0QsRUFBc0U7QUFDcEZDLFVBQU0sU0FBU0EsSUFBVCxHQUFnQixDQUNyQixDQUZtRjtBQUdwRkMsZUFBVyxTQUFTQSxTQUFULEdBQXFCO0FBQzlCLFVBQU1DLEtBQUssS0FBS0MsaUJBQWhCO0FBQ0FELFNBQUdFLFlBQUgsQ0FBZ0Isc0JBQWhCO0FBQ0QsS0FObUY7QUFPcEZDLHdCQUFvQixTQUFTQSxrQkFBVCxHQUE4QjtBQUNoRCxVQUFNSCxLQUFLLEtBQUtDLGlCQUFoQjtBQUNBRCxTQUFHSSxxQkFBSCxDQUF5QixjQUF6QixFQUF5QywwQkFBekMsRUFBcUU7QUFDbkVDLFlBQUksU0FBU0EsRUFBVCxDQUFZQyxJQUFaLEVBQWtCO0FBQ3BCLGlCQUFPQSxLQUFLQyxFQUFMLEtBQVksTUFBbkI7QUFDRCxTQUhrRTtBQUluRUMsY0FBTTtBQUo2RCxPQUFyRTtBQU1ELEtBZm1GO0FBZ0JwRkMsa0JBQWMsU0FBU0EsWUFBVCxHQUF3QixDQUNyQztBQWpCbUYsR0FBdEUsQ0FBaEI7O0FBb0JBLGlCQUFLQyxTQUFMLENBQWUsa0NBQWYsRUFBbURiLE9BQW5EO29CQUNlQSxPIiwiZmlsZSI6IlNoaXBtZW50TGluZU1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBfTW9kdWxlIGZyb20gJy4vX01vZHVsZSc7XHJcbmltcG9ydCBTaGlwbWVudEl0ZW1zRGV0YWlsIGZyb20gJy4uL1ZpZXdzL0VSUFNoaXBtZW50SXRlbXMvRGV0YWlsJztcclxuaW1wb3J0ICcuLi9Nb2RlbHMvRXJwU2hpcG1lbnRJdGVtL09mZmxpbmUnO1xyXG5pbXBvcnQgJy4uL01vZGVscy9FcnBTaGlwbWVudEl0ZW0vU0RhdGEnO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLk1vZHVsZXMuU2hpcG1lbnRMaW5lTW9kdWxlJywgW19Nb2R1bGVdLCB7XHJcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICB9LFxyXG4gIGxvYWRWaWV3czogZnVuY3Rpb24gbG9hZFZpZXdzKCkge1xyXG4gICAgY29uc3QgYW0gPSB0aGlzLmFwcGxpY2F0aW9uTW9kdWxlO1xyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBTaGlwbWVudEl0ZW1zRGV0YWlsKCkpO1xyXG4gIH0sXHJcbiAgbG9hZEN1c3RvbWl6YXRpb25zOiBmdW5jdGlvbiBsb2FkQ3VzdG9taXphdGlvbnMoKSB7XHJcbiAgICBjb25zdCBhbSA9IHRoaXMuYXBwbGljYXRpb25Nb2R1bGU7XHJcbiAgICBhbS5yZWdpc3RlckN1c3RvbWl6YXRpb24oJ2RldGFpbC90b29scycsICdlcnBzaGlwbWVudF9pdGVtc19kZXRhaWwnLCB7XHJcbiAgICAgIGF0OiBmdW5jdGlvbiBhdCh0b29sKSB7XHJcbiAgICAgICAgcmV0dXJuIHRvb2wuaWQgPT09ICdlZGl0JztcclxuICAgICAgfSxcclxuICAgICAgdHlwZTogJ3JlbW92ZScsXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGxvYWRUb29sYmFyczogZnVuY3Rpb24gbG9hZFRvb2xiYXJzKCkge1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLk1vZHVsZXMuU2hpcG1lbnRMaW5lTW9kdWxlJywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==