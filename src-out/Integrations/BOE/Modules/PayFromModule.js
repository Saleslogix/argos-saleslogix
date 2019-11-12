define('crm/Integrations/BOE/Modules/PayFromModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './_Module'], function (module, exports, _declare, _lang, _Module2) {
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Modules.PayFromModule', [_Module3.default], {
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

  _lang2.default.setObject('icboe.Modules.PayFromModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZHVsZXMvUGF5RnJvbU1vZHVsZS5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiaW5pdCIsImxvYWRWaWV3cyIsImxvYWRDdXN0b21pemF0aW9ucyIsImxvYWRUb29sYmFycyIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkEsTUFBTUEsVUFBVSx1QkFBUSw0Q0FBUixFQUFzRCxrQkFBdEQsRUFBaUU7QUFDL0VDLFVBQU0sU0FBU0EsSUFBVCxHQUFnQixDQUNyQixDQUY4RTtBQUcvRUMsZUFBVyxTQUFTQSxTQUFULEdBQXFCLENBQy9CLENBSjhFO0FBSy9FQyx3QkFBb0IsU0FBU0Esa0JBQVQsR0FBOEIsQ0FDakQsQ0FOOEU7QUFPL0VDLGtCQUFjLFNBQVNBLFlBQVQsR0FBd0IsQ0FDckM7QUFSOEUsR0FBakUsQ0FBaEIsQyxDQW5CQTs7Ozs7Ozs7Ozs7Ozs7O0FBOEJBLGlCQUFLQyxTQUFMLENBQWUsNkJBQWYsRUFBOENMLE9BQTlDO29CQUNlQSxPIiwiZmlsZSI6IlBheUZyb21Nb2R1bGUuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgX01vZHVsZSBmcm9tICcuL19Nb2R1bGUnO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLk1vZHVsZXMuUGF5RnJvbU1vZHVsZScsIFtfTW9kdWxlXSwge1xyXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgfSxcclxuICBsb2FkVmlld3M6IGZ1bmN0aW9uIGxvYWRWaWV3cygpIHtcclxuICB9LFxyXG4gIGxvYWRDdXN0b21pemF0aW9uczogZnVuY3Rpb24gbG9hZEN1c3RvbWl6YXRpb25zKCkge1xyXG4gIH0sXHJcbiAgbG9hZFRvb2xiYXJzOiBmdW5jdGlvbiBsb2FkVG9vbGJhcnMoKSB7XHJcbiAgfSxcclxufSk7XHJcblxyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuTW9kdWxlcy5QYXlGcm9tTW9kdWxlJywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==