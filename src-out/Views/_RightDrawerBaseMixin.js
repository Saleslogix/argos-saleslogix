define('crm/Views/_RightDrawerBaseMixin', ['module', 'exports', 'dojo/_base/declare'], function (module, exports, _declare) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  // Base Mixin for the right drawer/menu. This is responsible for creating the toggle button on the toolbar and managing the state of the right menu (loaded/unloaded).
  //
  // Lifecycles:
  // -- Loading of the right menu --
  // 1. Toggle button clicked
  // 2. setupRightDrawer
  // 3. loadRightDrawer
  //
  // -- Unloading of the right menu --
  // 1. onBeforeTransitionAway
  // 2. unloadRightDrawer
  /**
   * @class crm.Views._RightDrawerBaseMixin
   * @classdesc The base mixin for the right drawer.
   * @since 3.0
   */
  var __class = (0, _declare2.default)('crm.Views._RightDrawerBaseMixin', null, /** @lends crm.Views._RightDrawerBaseMixin# */{
    drawerLoaded: false,
    /**
     * @property {Boolean}
     * Add a flag so the view can opt-out of the right drawer if the mixin is used (_related views)
     */
    // hasSettings: false,
    toolsAdded: false,

    setupRightDrawer: function setupRightDrawer() {},
    loadRightDrawer: function loadRightDrawer() {
      // TODO: onTransitionAway is not called for "my schedule" nor is it called once local storage has group settings after first load
      // This avoid drawer refresh to happen which causes list from prev view to load
      // Aftter commenting out this code Drawer refresh is being called twice on each view change - find a way to call it once
      // if (this.drawerLoaded || this.hasSettings) {
      if (!this.hasSettings) {
        return;
      }

      this.setupRightDrawer();
      var drawer = App.getView('right_drawer');
      if (drawer) {
        drawer.refresh();
        // this.drawerLoaded = true;
      }
    },
    show: function show(options) {
      this.ensureToolsCreated(options);
      this.inherited(show, arguments);
    },
    ensureToolsCreated: function ensureToolsCreated(options) {
      // Inject tools into options if it exists
      if (options && options.tools) {
        this._addTools(options.tools);
      }
    },
    onToolLayoutCreated: function onToolLayoutCreated(tools) {
      var theTools = tools || {
        tbar: []
      };
      if (!this.toolsAdded) {
        this._addTools(theTools);
        this.toolsAdded = true;
      }
      this.inherited(onToolLayoutCreated, arguments);
    },
    _addTools: function _addTools(tools) {
      // eslint-disable-line
      if (!this.hasSettings) {
        return;
      }
    },
    onTransitionTo: function onTransitionTo() {
      if (!this.hasSettings) {
        return;
      }

      this.loadRightDrawer();
    },
    onTransitionAway: function onTransitionAway() {
      if (!this.hasSettings) {
        return;
      }

      var drawer = App.getView('right_drawer');
      if (drawer) {
        this.unloadRightDrawer();
        drawer.clear();
        // this.drawerLoaded = false;
      }
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

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9fUmlnaHREcmF3ZXJCYXNlTWl4aW4uanMiXSwibmFtZXMiOlsiX19jbGFzcyIsImRyYXdlckxvYWRlZCIsInRvb2xzQWRkZWQiLCJzZXR1cFJpZ2h0RHJhd2VyIiwibG9hZFJpZ2h0RHJhd2VyIiwiaGFzU2V0dGluZ3MiLCJkcmF3ZXIiLCJBcHAiLCJnZXRWaWV3IiwicmVmcmVzaCIsInNob3ciLCJvcHRpb25zIiwiZW5zdXJlVG9vbHNDcmVhdGVkIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwidG9vbHMiLCJfYWRkVG9vbHMiLCJvblRvb2xMYXlvdXRDcmVhdGVkIiwidGhlVG9vbHMiLCJ0YmFyIiwib25UcmFuc2l0aW9uVG8iLCJvblRyYW5zaXRpb25Bd2F5IiwidW5sb2FkUmlnaHREcmF3ZXIiLCJjbGVhciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQWlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0EsTUFBTUEsVUFBVSx1QkFBUSxpQ0FBUixFQUEyQyxJQUEzQyxFQUFpRCw4Q0FBOEM7QUFDN0dDLGtCQUFjLEtBRCtGO0FBRTdHOzs7O0FBSUE7QUFDQUMsZ0JBQVksS0FQaUc7O0FBUzdHQyxzQkFBa0IsU0FBU0EsZ0JBQVQsR0FBNEIsQ0FBRSxDQVQ2RDtBQVU3R0MscUJBQWlCLFNBQVNBLGVBQVQsR0FBMkI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFJLENBQUMsS0FBS0MsV0FBVixFQUF1QjtBQUNyQjtBQUNEOztBQUVELFdBQUtGLGdCQUFMO0FBQ0EsVUFBTUcsU0FBU0MsSUFBSUMsT0FBSixDQUFZLGNBQVosQ0FBZjtBQUNBLFVBQUlGLE1BQUosRUFBWTtBQUNWQSxlQUFPRyxPQUFQO0FBQ0E7QUFDRDtBQUNGLEtBekI0RztBQTBCN0dDLFVBQU0sU0FBU0EsSUFBVCxDQUFjQyxPQUFkLEVBQXVCO0FBQzNCLFdBQUtDLGtCQUFMLENBQXdCRCxPQUF4QjtBQUNBLFdBQUtFLFNBQUwsQ0FBZUgsSUFBZixFQUFxQkksU0FBckI7QUFDRCxLQTdCNEc7QUE4QjdHRix3QkFBb0IsU0FBU0Esa0JBQVQsQ0FBNEJELE9BQTVCLEVBQXFDO0FBQ3ZEO0FBQ0EsVUFBSUEsV0FBV0EsUUFBUUksS0FBdkIsRUFBOEI7QUFDNUIsYUFBS0MsU0FBTCxDQUFlTCxRQUFRSSxLQUF2QjtBQUNEO0FBQ0YsS0FuQzRHO0FBb0M3R0UseUJBQXFCLFNBQVNBLG1CQUFULENBQTZCRixLQUE3QixFQUFvQztBQUN2RCxVQUFNRyxXQUFXSCxTQUFTO0FBQ3hCSSxjQUFNO0FBRGtCLE9BQTFCO0FBR0EsVUFBSSxDQUFDLEtBQUtqQixVQUFWLEVBQXNCO0FBQ3BCLGFBQUtjLFNBQUwsQ0FBZUUsUUFBZjtBQUNBLGFBQUtoQixVQUFMLEdBQWtCLElBQWxCO0FBQ0Q7QUFDRCxXQUFLVyxTQUFMLENBQWVJLG1CQUFmLEVBQW9DSCxTQUFwQztBQUNELEtBN0M0RztBQThDN0dFLGVBQVcsU0FBU0EsU0FBVCxDQUFtQkQsS0FBbkIsRUFBMEI7QUFBRTtBQUNyQyxVQUFJLENBQUMsS0FBS1YsV0FBVixFQUF1QjtBQUNyQjtBQUNEO0FBQ0YsS0FsRDRHO0FBbUQ3R2Usb0JBQWdCLFNBQVNBLGNBQVQsR0FBMEI7QUFDeEMsVUFBSSxDQUFDLEtBQUtmLFdBQVYsRUFBdUI7QUFDckI7QUFDRDs7QUFFRCxXQUFLRCxlQUFMO0FBQ0QsS0F6RDRHO0FBMEQ3R2lCLHNCQUFrQixTQUFTQSxnQkFBVCxHQUE0QjtBQUM1QyxVQUFJLENBQUMsS0FBS2hCLFdBQVYsRUFBdUI7QUFDckI7QUFDRDs7QUFFRCxVQUFNQyxTQUFTQyxJQUFJQyxPQUFKLENBQVksY0FBWixDQUFmO0FBQ0EsVUFBSUYsTUFBSixFQUFZO0FBQ1YsYUFBS2dCLGlCQUFMO0FBQ0FoQixlQUFPaUIsS0FBUDtBQUNBO0FBQ0Q7QUFDRjtBQXJFNEcsR0FBL0YsQ0FBaEIsQyxDQWpDQTs7Ozs7Ozs7Ozs7Ozs7O29CQXlHZXZCLE8iLCJmaWxlIjoiX1JpZ2h0RHJhd2VyQmFzZU1peGluLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuXHJcbi8vIEJhc2UgTWl4aW4gZm9yIHRoZSByaWdodCBkcmF3ZXIvbWVudS4gVGhpcyBpcyByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgdGhlIHRvZ2dsZSBidXR0b24gb24gdGhlIHRvb2xiYXIgYW5kIG1hbmFnaW5nIHRoZSBzdGF0ZSBvZiB0aGUgcmlnaHQgbWVudSAobG9hZGVkL3VubG9hZGVkKS5cclxuLy9cclxuLy8gTGlmZWN5Y2xlczpcclxuLy8gLS0gTG9hZGluZyBvZiB0aGUgcmlnaHQgbWVudSAtLVxyXG4vLyAxLiBUb2dnbGUgYnV0dG9uIGNsaWNrZWRcclxuLy8gMi4gc2V0dXBSaWdodERyYXdlclxyXG4vLyAzLiBsb2FkUmlnaHREcmF3ZXJcclxuLy9cclxuLy8gLS0gVW5sb2FkaW5nIG9mIHRoZSByaWdodCBtZW51IC0tXHJcbi8vIDEuIG9uQmVmb3JlVHJhbnNpdGlvbkF3YXlcclxuLy8gMi4gdW5sb2FkUmlnaHREcmF3ZXJcclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuX1JpZ2h0RHJhd2VyQmFzZU1peGluXHJcbiAqIEBjbGFzc2Rlc2MgVGhlIGJhc2UgbWl4aW4gZm9yIHRoZSByaWdodCBkcmF3ZXIuXHJcbiAqIEBzaW5jZSAzLjBcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuX1JpZ2h0RHJhd2VyQmFzZU1peGluJywgbnVsbCwgLyoqIEBsZW5kcyBjcm0uVmlld3MuX1JpZ2h0RHJhd2VyQmFzZU1peGluIyAqL3tcclxuICBkcmF3ZXJMb2FkZWQ6IGZhbHNlLFxyXG4gIC8qKlxyXG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn1cclxuICAgKiBBZGQgYSBmbGFnIHNvIHRoZSB2aWV3IGNhbiBvcHQtb3V0IG9mIHRoZSByaWdodCBkcmF3ZXIgaWYgdGhlIG1peGluIGlzIHVzZWQgKF9yZWxhdGVkIHZpZXdzKVxyXG4gICAqL1xyXG4gIC8vIGhhc1NldHRpbmdzOiBmYWxzZSxcclxuICB0b29sc0FkZGVkOiBmYWxzZSxcclxuXHJcbiAgc2V0dXBSaWdodERyYXdlcjogZnVuY3Rpb24gc2V0dXBSaWdodERyYXdlcigpIHt9LFxyXG4gIGxvYWRSaWdodERyYXdlcjogZnVuY3Rpb24gbG9hZFJpZ2h0RHJhd2VyKCkge1xyXG4gICAgLy8gVE9ETzogb25UcmFuc2l0aW9uQXdheSBpcyBub3QgY2FsbGVkIGZvciBcIm15IHNjaGVkdWxlXCIgbm9yIGlzIGl0IGNhbGxlZCBvbmNlIGxvY2FsIHN0b3JhZ2UgaGFzIGdyb3VwIHNldHRpbmdzIGFmdGVyIGZpcnN0IGxvYWRcclxuICAgIC8vIFRoaXMgYXZvaWQgZHJhd2VyIHJlZnJlc2ggdG8gaGFwcGVuIHdoaWNoIGNhdXNlcyBsaXN0IGZyb20gcHJldiB2aWV3IHRvIGxvYWRcclxuICAgIC8vIEFmdHRlciBjb21tZW50aW5nIG91dCB0aGlzIGNvZGUgRHJhd2VyIHJlZnJlc2ggaXMgYmVpbmcgY2FsbGVkIHR3aWNlIG9uIGVhY2ggdmlldyBjaGFuZ2UgLSBmaW5kIGEgd2F5IHRvIGNhbGwgaXQgb25jZVxyXG4gICAgLy8gaWYgKHRoaXMuZHJhd2VyTG9hZGVkIHx8IHRoaXMuaGFzU2V0dGluZ3MpIHtcclxuICAgIGlmICghdGhpcy5oYXNTZXR0aW5ncykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZXR1cFJpZ2h0RHJhd2VyKCk7XHJcbiAgICBjb25zdCBkcmF3ZXIgPSBBcHAuZ2V0VmlldygncmlnaHRfZHJhd2VyJyk7XHJcbiAgICBpZiAoZHJhd2VyKSB7XHJcbiAgICAgIGRyYXdlci5yZWZyZXNoKCk7XHJcbiAgICAgIC8vIHRoaXMuZHJhd2VyTG9hZGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9LFxyXG4gIHNob3c6IGZ1bmN0aW9uIHNob3cob3B0aW9ucykge1xyXG4gICAgdGhpcy5lbnN1cmVUb29sc0NyZWF0ZWQob3B0aW9ucyk7XHJcbiAgICB0aGlzLmluaGVyaXRlZChzaG93LCBhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgZW5zdXJlVG9vbHNDcmVhdGVkOiBmdW5jdGlvbiBlbnN1cmVUb29sc0NyZWF0ZWQob3B0aW9ucykge1xyXG4gICAgLy8gSW5qZWN0IHRvb2xzIGludG8gb3B0aW9ucyBpZiBpdCBleGlzdHNcclxuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMudG9vbHMpIHtcclxuICAgICAgdGhpcy5fYWRkVG9vbHMob3B0aW9ucy50b29scyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvblRvb2xMYXlvdXRDcmVhdGVkOiBmdW5jdGlvbiBvblRvb2xMYXlvdXRDcmVhdGVkKHRvb2xzKSB7XHJcbiAgICBjb25zdCB0aGVUb29scyA9IHRvb2xzIHx8IHtcclxuICAgICAgdGJhcjogW10sXHJcbiAgICB9O1xyXG4gICAgaWYgKCF0aGlzLnRvb2xzQWRkZWQpIHtcclxuICAgICAgdGhpcy5fYWRkVG9vbHModGhlVG9vbHMpO1xyXG4gICAgICB0aGlzLnRvb2xzQWRkZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pbmhlcml0ZWQob25Ub29sTGF5b3V0Q3JlYXRlZCwgYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIF9hZGRUb29sczogZnVuY3Rpb24gX2FkZFRvb2xzKHRvb2xzKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgIGlmICghdGhpcy5oYXNTZXR0aW5ncykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgfSxcclxuICBvblRyYW5zaXRpb25UbzogZnVuY3Rpb24gb25UcmFuc2l0aW9uVG8oKSB7XHJcbiAgICBpZiAoIXRoaXMuaGFzU2V0dGluZ3MpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubG9hZFJpZ2h0RHJhd2VyKCk7XHJcbiAgfSxcclxuICBvblRyYW5zaXRpb25Bd2F5OiBmdW5jdGlvbiBvblRyYW5zaXRpb25Bd2F5KCkge1xyXG4gICAgaWYgKCF0aGlzLmhhc1NldHRpbmdzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkcmF3ZXIgPSBBcHAuZ2V0VmlldygncmlnaHRfZHJhd2VyJyk7XHJcbiAgICBpZiAoZHJhd2VyKSB7XHJcbiAgICAgIHRoaXMudW5sb2FkUmlnaHREcmF3ZXIoKTtcclxuICAgICAgZHJhd2VyLmNsZWFyKCk7XHJcbiAgICAgIC8vIHRoaXMuZHJhd2VyTG9hZGVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=