define('crm/Integrations/BOE/Modules/ReturnModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './_Module', '../Models/Return/Offline', '../Models/Return/SData'], function (module, exports, _declare, _lang, _Module2) {
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Modules.ReturnModule', [_Module3.default], {
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

  _lang2.default.setObject('icboe.Modules.ReturnModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZHVsZXMvUmV0dXJuTW9kdWxlLmpzIl0sIm5hbWVzIjpbIl9fY2xhc3MiLCJpbml0IiwibG9hZFZpZXdzIiwibG9hZEN1c3RvbWl6YXRpb25zIiwibG9hZFRvb2xiYXJzIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQSxNQUFNQSxVQUFVLHVCQUFRLDJDQUFSLEVBQXFELGtCQUFyRCxFQUFnRTtBQUM5RUMsVUFBTSxTQUFTQSxJQUFULEdBQWdCLENBQ3JCLENBRjZFO0FBRzlFQyxlQUFXLFNBQVNBLFNBQVQsR0FBcUIsQ0FDL0IsQ0FKNkU7QUFLOUVDLHdCQUFvQixTQUFTQSxrQkFBVCxHQUE4QixDQUNqRCxDQU42RTtBQU85RUMsa0JBQWMsU0FBU0EsWUFBVCxHQUF3QixDQUNyQztBQVI2RSxHQUFoRSxDQUFoQixDLENBckJBOzs7Ozs7Ozs7Ozs7Ozs7QUFnQ0EsaUJBQUtDLFNBQUwsQ0FBZSw0QkFBZixFQUE2Q0wsT0FBN0M7b0JBQ2VBLE8iLCJmaWxlIjoiUmV0dXJuTW9kdWxlLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IF9Nb2R1bGUgZnJvbSAnLi9fTW9kdWxlJztcclxuaW1wb3J0ICcuLi9Nb2RlbHMvUmV0dXJuL09mZmxpbmUnO1xyXG5pbXBvcnQgJy4uL01vZGVscy9SZXR1cm4vU0RhdGEnO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLk1vZHVsZXMuUmV0dXJuTW9kdWxlJywgW19Nb2R1bGVdLCB7XHJcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICB9LFxyXG4gIGxvYWRWaWV3czogZnVuY3Rpb24gbG9hZFZpZXdzKCkge1xyXG4gIH0sXHJcbiAgbG9hZEN1c3RvbWl6YXRpb25zOiBmdW5jdGlvbiBsb2FkQ3VzdG9taXphdGlvbnMoKSB7XHJcbiAgfSxcclxuICBsb2FkVG9vbGJhcnM6IGZ1bmN0aW9uIGxvYWRUb29sYmFycygpIHtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5Nb2R1bGVzLlJldHVybk1vZHVsZScsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=