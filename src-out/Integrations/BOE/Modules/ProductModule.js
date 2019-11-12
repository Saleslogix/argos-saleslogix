define('crm/Integrations/BOE/Modules/ProductModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './_Module', '../Models/Product/Offline', '../Models/Product/SData'], function (module, exports, _declare, _lang, _Module2) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Module3 = _interopRequireDefault(_Module2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Modules.ProductModule', [_Module3.default], {
    init: function init() {},
    loadViews: function loadViews() {},
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

  _lang2.default.setObject('icboe.Modules.ProductModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZHVsZXMvUHJvZHVjdE1vZHVsZS5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiaW5pdCIsImxvYWRWaWV3cyIsImxvYWRDdXN0b21pemF0aW9ucyIsImxvYWRUb29sYmFycyIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkEsTUFBTUEsVUFBVSx1QkFBUSw0Q0FBUixFQUFzRCxrQkFBdEQsRUFBaUU7QUFDL0VDLFVBQU0sU0FBU0EsSUFBVCxHQUFnQixDQUNyQixDQUY4RTtBQUcvRUMsZUFBVyxTQUFTQSxTQUFULEdBQXFCLENBQy9CLENBSjhFO0FBSy9FQyx3QkFBb0IsU0FBU0Esa0JBQVQsR0FBOEIsQ0FDakQsQ0FOOEU7QUFPL0VDLGtCQUFjLFNBQVNBLFlBQVQsR0FBd0IsQ0FDckM7QUFSOEUsR0FBakUsQ0FBaEIsQyxDQXJCQTs7Ozs7Ozs7Ozs7Ozs7O0FBZ0NBLGlCQUFLQyxTQUFMLENBQWUsNkJBQWYsRUFBOENMLE9BQTlDO29CQUNlQSxPIiwiZmlsZSI6IlByb2R1Y3RNb2R1bGUuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgX01vZHVsZSBmcm9tICcuL19Nb2R1bGUnO1xyXG5pbXBvcnQgJy4uL01vZGVscy9Qcm9kdWN0L09mZmxpbmUnO1xyXG5pbXBvcnQgJy4uL01vZGVscy9Qcm9kdWN0L1NEYXRhJztcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5Nb2R1bGVzLlByb2R1Y3RNb2R1bGUnLCBbX01vZHVsZV0sIHtcclxuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xyXG4gIH0sXHJcbiAgbG9hZFZpZXdzOiBmdW5jdGlvbiBsb2FkVmlld3MoKSB7XHJcbiAgfSxcclxuICBsb2FkQ3VzdG9taXphdGlvbnM6IGZ1bmN0aW9uIGxvYWRDdXN0b21pemF0aW9ucygpIHtcclxuICB9LFxyXG4gIGxvYWRUb29sYmFyczogZnVuY3Rpb24gbG9hZFRvb2xiYXJzKCkge1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLk1vZHVsZXMuUHJvZHVjdE1vZHVsZScsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=