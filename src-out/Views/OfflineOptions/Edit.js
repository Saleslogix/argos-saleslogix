define('crm/Views/OfflineOptions/Edit', ['module', 'exports', 'dojo/_base/declare', 'argos/_EditBase', 'argos/_RelatedViewWidgetEditMixin', 'dojo/Deferred', 'argos/I18n'], function (module, exports, _declare, _EditBase2, _RelatedViewWidgetEditMixin, _Deferred, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _EditBase3 = _interopRequireDefault(_EditBase2);

  var _RelatedViewWidgetEditMixin2 = _interopRequireDefault(_RelatedViewWidgetEditMixin);

  var _Deferred2 = _interopRequireDefault(_Deferred);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('offlineOptionsEdit');

  /**
   * @class crm.Views.OfflineOptions.Edit
   *
   * @extends argos.Edit
   *
   */
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

  var __class = (0, _declare2.default)('crm.Views.OfflineOptions.Edit', [_EditBase3.default, _RelatedViewWidgetEditMixin2.default], {
    // Localization
    titleText: resource.titleText,
    multiColumnView: false,
    // View Properties
    id: 'offline_options_edit',
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        relatedView: {
          widgetType: 'offlineUsageWidget',
          id: 'offline_usage_widget'
        }
      }]);
    },
    requestData: function requestData() {
      var _this = this;

      return this.getOfflineOptions().then(function (data) {
        _this._onGetComplete(data);
      }, function (err) {
        _this._onGetError(null, err);
      });
    },
    getOfflineOptions: function getOfflineOptions() {
      var def = new _Deferred2.default();
      def.resolve({ maxdays: 5 });
      return def.promise;
    },
    onRefreshUpdate: function onRefreshUpdate() {
      this.requestData();
    },
    transitionAway: function transitionAway() {
      // force soho dropdown to close since they dont close on a button click elsewhere on UI
      $(this.relatedViewManagers.offline_usage_widget.relatedViews.offline_usage_widget_undefined._olderThanDropdown.dropdownSelect).data('dropdown').close();
      this.inherited(transitionAway, arguments);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9PZmZsaW5lT3B0aW9ucy9FZGl0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsInRpdGxlVGV4dCIsIm11bHRpQ29sdW1uVmlldyIsImlkIiwiY3JlYXRlTGF5b3V0IiwibGF5b3V0IiwicmVsYXRlZFZpZXciLCJ3aWRnZXRUeXBlIiwicmVxdWVzdERhdGEiLCJnZXRPZmZsaW5lT3B0aW9ucyIsInRoZW4iLCJkYXRhIiwiX29uR2V0Q29tcGxldGUiLCJlcnIiLCJfb25HZXRFcnJvciIsImRlZiIsInJlc29sdmUiLCJtYXhkYXlzIiwicHJvbWlzZSIsIm9uUmVmcmVzaFVwZGF0ZSIsInRyYW5zaXRpb25Bd2F5IiwiJCIsInJlbGF0ZWRWaWV3TWFuYWdlcnMiLCJvZmZsaW5lX3VzYWdlX3dpZGdldCIsInJlbGF0ZWRWaWV3cyIsIm9mZmxpbmVfdXNhZ2Vfd2lkZ2V0X3VuZGVmaW5lZCIsIl9vbGRlclRoYW5Ecm9wZG93biIsImRyb3Bkb3duU2VsZWN0IiwiY2xvc2UiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQSxNQUFNQSxXQUFXLG9CQUFZLG9CQUFaLENBQWpCOztBQUVBOzs7Ozs7QUF2QkE7Ozs7Ozs7Ozs7Ozs7OztBQTZCQSxNQUFNQyxVQUFVLHVCQUFRLCtCQUFSLEVBQXlDLDBEQUF6QyxFQUErRTtBQUM3RjtBQUNBQyxlQUFXRixTQUFTRSxTQUZ5RTtBQUc3RkMscUJBQWlCLEtBSDRFO0FBSTdGO0FBQ0FDLFFBQUksc0JBTHlGO0FBTTdGQyxrQkFBYyxTQUFTQSxZQUFULEdBQXdCO0FBQ3BDLGFBQU8sS0FBS0MsTUFBTCxLQUFnQixLQUFLQSxNQUFMLEdBQWMsQ0FBQztBQUNwQ0MscUJBQWE7QUFDWEMsc0JBQVksb0JBREQ7QUFFWEosY0FBSTtBQUZPO0FBRHVCLE9BQUQsQ0FBOUIsQ0FBUDtBQU1ELEtBYjRGO0FBYzdGSyxpQkFBYSxTQUFTQSxXQUFULEdBQXVCO0FBQUE7O0FBQ2xDLGFBQU8sS0FBS0MsaUJBQUwsR0FBeUJDLElBQXpCLENBQThCLFVBQUNDLElBQUQsRUFBVTtBQUM3QyxjQUFLQyxjQUFMLENBQW9CRCxJQUFwQjtBQUNELE9BRk0sRUFFSixVQUFDRSxHQUFELEVBQVM7QUFDVixjQUFLQyxXQUFMLENBQWlCLElBQWpCLEVBQXVCRCxHQUF2QjtBQUNELE9BSk0sQ0FBUDtBQUtELEtBcEI0RjtBQXFCN0ZKLHVCQUFtQixTQUFTQSxpQkFBVCxHQUE2QjtBQUM5QyxVQUFNTSxNQUFNLHdCQUFaO0FBQ0FBLFVBQUlDLE9BQUosQ0FBWSxFQUFFQyxTQUFTLENBQVgsRUFBWjtBQUNBLGFBQU9GLElBQUlHLE9BQVg7QUFDRCxLQXpCNEY7QUEwQjdGQyxxQkFBaUIsU0FBU0EsZUFBVCxHQUEyQjtBQUMxQyxXQUFLWCxXQUFMO0FBQ0QsS0E1QjRGO0FBNkI3Rlksb0JBQWdCLFNBQVNBLGNBQVQsR0FBMEI7QUFDeEM7QUFDQUMsUUFBRSxLQUFLQyxtQkFBTCxDQUNDQyxvQkFERCxDQUVDQyxZQUZELENBR0NDLDhCQUhELENBSUNDLGtCQUpELENBS0NDLGNBTEgsRUFLbUJoQixJQUxuQixDQUt3QixVQUx4QixFQUtvQ2lCLEtBTHBDO0FBTUEsV0FBS0MsU0FBTCxDQUFlVCxjQUFmLEVBQStCVSxTQUEvQjtBQUNEO0FBdEM0RixHQUEvRSxDQUFoQjs7b0JBeUNlOUIsTyIsImZpbGUiOiJFZGl0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IF9FZGl0QmFzZSBmcm9tICdhcmdvcy9fRWRpdEJhc2UnO1xyXG5pbXBvcnQgX1JlbGF0ZWRXaWRnZXRFZGl0TWl4aW4gZnJvbSAnYXJnb3MvX1JlbGF0ZWRWaWV3V2lkZ2V0RWRpdE1peGluJztcclxuaW1wb3J0IERlZmVycmVkIGZyb20gJ2Rvam8vRGVmZXJyZWQnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdvZmZsaW5lT3B0aW9uc0VkaXQnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLk9mZmxpbmVPcHRpb25zLkVkaXRcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuRWRpdFxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5PZmZsaW5lT3B0aW9ucy5FZGl0JywgW19FZGl0QmFzZSwgX1JlbGF0ZWRXaWRnZXRFZGl0TWl4aW5dLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgbXVsdGlDb2x1bW5WaWV3OiBmYWxzZSxcclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ29mZmxpbmVfb3B0aW9uc19lZGl0JyxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICByZWxhdGVkVmlldzoge1xyXG4gICAgICAgIHdpZGdldFR5cGU6ICdvZmZsaW5lVXNhZ2VXaWRnZXQnLFxyXG4gICAgICAgIGlkOiAnb2ZmbGluZV91c2FnZV93aWRnZXQnLFxyXG4gICAgICB9LFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbiAgcmVxdWVzdERhdGE6IGZ1bmN0aW9uIHJlcXVlc3REYXRhKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0T2ZmbGluZU9wdGlvbnMoKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgIHRoaXMuX29uR2V0Q29tcGxldGUoZGF0YSk7XHJcbiAgICB9LCAoZXJyKSA9PiB7XHJcbiAgICAgIHRoaXMuX29uR2V0RXJyb3IobnVsbCwgZXJyKTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZ2V0T2ZmbGluZU9wdGlvbnM6IGZ1bmN0aW9uIGdldE9mZmxpbmVPcHRpb25zKCkge1xyXG4gICAgY29uc3QgZGVmID0gbmV3IERlZmVycmVkKCk7XHJcbiAgICBkZWYucmVzb2x2ZSh7IG1heGRheXM6IDUgfSk7XHJcbiAgICByZXR1cm4gZGVmLnByb21pc2U7XHJcbiAgfSxcclxuICBvblJlZnJlc2hVcGRhdGU6IGZ1bmN0aW9uIG9uUmVmcmVzaFVwZGF0ZSgpIHtcclxuICAgIHRoaXMucmVxdWVzdERhdGEoKTtcclxuICB9LFxyXG4gIHRyYW5zaXRpb25Bd2F5OiBmdW5jdGlvbiB0cmFuc2l0aW9uQXdheSgpIHtcclxuICAgIC8vIGZvcmNlIHNvaG8gZHJvcGRvd24gdG8gY2xvc2Ugc2luY2UgdGhleSBkb250IGNsb3NlIG9uIGEgYnV0dG9uIGNsaWNrIGVsc2V3aGVyZSBvbiBVSVxyXG4gICAgJCh0aGlzLnJlbGF0ZWRWaWV3TWFuYWdlcnNcclxuICAgICAgLm9mZmxpbmVfdXNhZ2Vfd2lkZ2V0XHJcbiAgICAgIC5yZWxhdGVkVmlld3NcclxuICAgICAgLm9mZmxpbmVfdXNhZ2Vfd2lkZ2V0X3VuZGVmaW5lZFxyXG4gICAgICAuX29sZGVyVGhhbkRyb3Bkb3duXHJcbiAgICAgIC5kcm9wZG93blNlbGVjdCkuZGF0YSgnZHJvcGRvd24nKS5jbG9zZSgpO1xyXG4gICAgdGhpcy5pbmhlcml0ZWQodHJhbnNpdGlvbkF3YXksIGFyZ3VtZW50cyk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=