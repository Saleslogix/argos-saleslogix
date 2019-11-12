define('crm/Integrations/BOE/Modules/ReceivableLineModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './_Module', '../Views/ERPReceivableItems/Detail', '../Models/ErpReceivableItem/Offline', '../Models/ErpReceivableItem/SData'], function (module, exports, _declare, _lang, _Module2, _Detail) {
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Modules.ReceivableLineModule', [_Module3.default], {
    init: function init() {},
    loadViews: function loadViews() {
      var am = this.applicationModule;
      am.registerView(new _Detail2.default());
    },
    loadCustomizations: function loadCustomizations() {},
    loadToolbars: function loadToolbars() {}
  });

  _lang2.default.setObject('icboe.Modules.ReceivableLineModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZHVsZXMvUmVjZWl2YWJsZUxpbmVNb2R1bGUuanMiXSwibmFtZXMiOlsiX19jbGFzcyIsImluaXQiLCJsb2FkVmlld3MiLCJhbSIsImFwcGxpY2F0aW9uTW9kdWxlIiwicmVnaXN0ZXJWaWV3IiwibG9hZEN1c3RvbWl6YXRpb25zIiwibG9hZFRvb2xiYXJzIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxNQUFNQSxVQUFVLHVCQUFRLG1EQUFSLEVBQTZELGtCQUE3RCxFQUF3RTtBQUN0RkMsVUFBTSxTQUFTQSxJQUFULEdBQWdCLENBQ3JCLENBRnFGO0FBR3RGQyxlQUFXLFNBQVNBLFNBQVQsR0FBcUI7QUFDOUIsVUFBTUMsS0FBSyxLQUFLQyxpQkFBaEI7QUFDQUQsU0FBR0UsWUFBSCxDQUFnQixzQkFBaEI7QUFDRCxLQU5xRjtBQU90RkMsd0JBQW9CLFNBQVNBLGtCQUFULEdBQThCLENBQ2pELENBUnFGO0FBU3RGQyxrQkFBYyxTQUFTQSxZQUFULEdBQXdCLENBQ3JDO0FBVnFGLEdBQXhFLENBQWhCOztBQWFBLGlCQUFLQyxTQUFMLENBQWUsb0NBQWYsRUFBcURSLE9BQXJEO29CQUNlQSxPIiwiZmlsZSI6IlJlY2VpdmFibGVMaW5lTW9kdWxlLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IF9Nb2R1bGUgZnJvbSAnLi9fTW9kdWxlJztcclxuaW1wb3J0IEVSUFJlY2VpdmFibGVJdGVtc0RldGFpbCBmcm9tICcuLi9WaWV3cy9FUlBSZWNlaXZhYmxlSXRlbXMvRGV0YWlsJztcclxuaW1wb3J0ICcuLi9Nb2RlbHMvRXJwUmVjZWl2YWJsZUl0ZW0vT2ZmbGluZSc7XHJcbmltcG9ydCAnLi4vTW9kZWxzL0VycFJlY2VpdmFibGVJdGVtL1NEYXRhJztcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5Nb2R1bGVzLlJlY2VpdmFibGVMaW5lTW9kdWxlJywgW19Nb2R1bGVdLCB7XHJcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICB9LFxyXG4gIGxvYWRWaWV3czogZnVuY3Rpb24gbG9hZFZpZXdzKCkge1xyXG4gICAgY29uc3QgYW0gPSB0aGlzLmFwcGxpY2F0aW9uTW9kdWxlO1xyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBFUlBSZWNlaXZhYmxlSXRlbXNEZXRhaWwoKSk7XHJcbiAgfSxcclxuICBsb2FkQ3VzdG9taXphdGlvbnM6IGZ1bmN0aW9uIGxvYWRDdXN0b21pemF0aW9ucygpIHtcclxuICB9LFxyXG4gIGxvYWRUb29sYmFyczogZnVuY3Rpb24gbG9hZFRvb2xiYXJzKCkge1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLk1vZHVsZXMuUmVjZWl2YWJsZUxpbmVNb2R1bGUnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19