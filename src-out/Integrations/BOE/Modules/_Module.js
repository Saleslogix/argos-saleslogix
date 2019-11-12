define('crm/Integrations/BOE/Modules/_Module', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang'], function (module, exports, _declare, _lang) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Modules._Module', null, {
    applicationModule: null,
    defaultViews: null,
    constructor: function constructor(applicationModule) {
      this.applicationModule = applicationModule;
    },
    init: function init() {},
    initDynamic: function initDynamic() {},
    loadViews: function loadViews() {},
    loadCustomizations: function loadCustomizations() {},
    loadToolbars: function loadToolbars() {},
    registerDefaultViews: function registerDefaultViews(views) {
      if (this.defaultViews && views) {
        this.defaultViews.forEach(function (defaultView) {
          var idx = views.indexOf(defaultView);
          if (idx === -1) {
            views.push(defaultView);
          }
        });
      }
    }
  });

  _lang2.default.setObject('icboe.Modules._Module', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZHVsZXMvX01vZHVsZS5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiYXBwbGljYXRpb25Nb2R1bGUiLCJkZWZhdWx0Vmlld3MiLCJjb25zdHJ1Y3RvciIsImluaXQiLCJpbml0RHluYW1pYyIsImxvYWRWaWV3cyIsImxvYWRDdXN0b21pemF0aW9ucyIsImxvYWRUb29sYmFycyIsInJlZ2lzdGVyRGVmYXVsdFZpZXdzIiwidmlld3MiLCJmb3JFYWNoIiwiZGVmYXVsdFZpZXciLCJpZHgiLCJpbmRleE9mIiwicHVzaCIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQWtCQSxNQUFNQSxVQUFVLHVCQUFRLHNDQUFSLEVBQWdELElBQWhELEVBQXNEO0FBQ3BFQyx1QkFBbUIsSUFEaUQ7QUFFcEVDLGtCQUFjLElBRnNEO0FBR3BFQyxpQkFBYSxTQUFTQSxXQUFULENBQXFCRixpQkFBckIsRUFBd0M7QUFDbkQsV0FBS0EsaUJBQUwsR0FBeUJBLGlCQUF6QjtBQUNELEtBTG1FO0FBTXBFRyxVQUFNLFNBQVNBLElBQVQsR0FBZ0IsQ0FDckIsQ0FQbUU7QUFRcEVDLGlCQUFhLFNBQVNBLFdBQVQsR0FBdUIsQ0FDbkMsQ0FUbUU7QUFVcEVDLGVBQVcsU0FBU0EsU0FBVCxHQUFxQixDQUMvQixDQVhtRTtBQVlwRUMsd0JBQW9CLFNBQVNBLGtCQUFULEdBQThCLENBQ2pELENBYm1FO0FBY3BFQyxrQkFBYyxTQUFTQSxZQUFULEdBQXdCLENBQ3JDLENBZm1FO0FBZ0JwRUMsMEJBQXNCLFNBQVNBLG9CQUFULENBQThCQyxLQUE5QixFQUFxQztBQUN6RCxVQUFJLEtBQUtSLFlBQUwsSUFBcUJRLEtBQXpCLEVBQWdDO0FBQzlCLGFBQUtSLFlBQUwsQ0FBa0JTLE9BQWxCLENBQTBCLFVBQUNDLFdBQUQsRUFBaUI7QUFDekMsY0FBTUMsTUFBTUgsTUFBTUksT0FBTixDQUFjRixXQUFkLENBQVo7QUFDQSxjQUFJQyxRQUFRLENBQUMsQ0FBYixFQUFnQjtBQUNkSCxrQkFBTUssSUFBTixDQUFXSCxXQUFYO0FBQ0Q7QUFDRixTQUxEO0FBTUQ7QUFDRjtBQXpCbUUsR0FBdEQsQ0FBaEI7O0FBNEJBLGlCQUFLSSxTQUFMLENBQWUsdUJBQWYsRUFBd0NoQixPQUF4QztvQkFDZUEsTyIsImZpbGUiOiJfTW9kdWxlLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5Nb2R1bGVzLl9Nb2R1bGUnLCBudWxsLCB7XHJcbiAgYXBwbGljYXRpb25Nb2R1bGU6IG51bGwsXHJcbiAgZGVmYXVsdFZpZXdzOiBudWxsLFxyXG4gIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBjb25zdHJ1Y3RvcihhcHBsaWNhdGlvbk1vZHVsZSkge1xyXG4gICAgdGhpcy5hcHBsaWNhdGlvbk1vZHVsZSA9IGFwcGxpY2F0aW9uTW9kdWxlO1xyXG4gIH0sXHJcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICB9LFxyXG4gIGluaXREeW5hbWljOiBmdW5jdGlvbiBpbml0RHluYW1pYygpIHtcclxuICB9LFxyXG4gIGxvYWRWaWV3czogZnVuY3Rpb24gbG9hZFZpZXdzKCkge1xyXG4gIH0sXHJcbiAgbG9hZEN1c3RvbWl6YXRpb25zOiBmdW5jdGlvbiBsb2FkQ3VzdG9taXphdGlvbnMoKSB7XHJcbiAgfSxcclxuICBsb2FkVG9vbGJhcnM6IGZ1bmN0aW9uIGxvYWRUb29sYmFycygpIHtcclxuICB9LFxyXG4gIHJlZ2lzdGVyRGVmYXVsdFZpZXdzOiBmdW5jdGlvbiByZWdpc3RlckRlZmF1bHRWaWV3cyh2aWV3cykge1xyXG4gICAgaWYgKHRoaXMuZGVmYXVsdFZpZXdzICYmIHZpZXdzKSB7XHJcbiAgICAgIHRoaXMuZGVmYXVsdFZpZXdzLmZvckVhY2goKGRlZmF1bHRWaWV3KSA9PiB7XHJcbiAgICAgICAgY29uc3QgaWR4ID0gdmlld3MuaW5kZXhPZihkZWZhdWx0Vmlldyk7XHJcbiAgICAgICAgaWYgKGlkeCA9PT0gLTEpIHtcclxuICAgICAgICAgIHZpZXdzLnB1c2goZGVmYXVsdFZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcblxyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuTW9kdWxlcy5fTW9kdWxlJywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==