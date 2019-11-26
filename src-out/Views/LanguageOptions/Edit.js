define('crm/Views/LanguageOptions/Edit', ['module', 'exports', 'dojo/_base/declare', 'argos/_EditBase', 'argos/_RelatedViewWidgetEditMixin', 'dojo/Deferred', 'argos/I18n'], function (module, exports, _declare, _EditBase2, _RelatedViewWidgetEditMixin, _Deferred, _I18n) {
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

  var resource = (0, _I18n2.default)('languageOptionsEdit');

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

  var __class = (0, _declare2.default)('crm.Views.LanguageOptions.Edit', [_EditBase3.default, _RelatedViewWidgetEditMixin2.default], {
    // Localization
    titleText: resource.titleText,
    // View Properties
    id: 'language_options_edit',
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        relatedView: {
          widgetType: 'languageUsageWidget',
          id: 'language_usage_widget'
        }
      }]);
    },
    requestData: function requestData() {
      var _this = this;

      return this.getLanguageOptions().then(function (data) {
        _this._onGetComplete(data);
      }, function (err) {
        _this._onGetError(null, err);
      });
    },
    getLanguageOptions: function getLanguageOptions() {
      var def = new _Deferred2.default();
      def.resolve({});
      return def.promise;
    },
    onRefreshUpdate: function onRefreshUpdate() {
      this.requestData();
    },
    transitionAway: function transitionAway() {
      // force soho dropdown to close since they dont close on a button click elsewhere on UI
      $(this.relatedViewManagers.language_usage_widget.relatedViews.language_usage_widget_undefined._regionDropdown.dropdownSelect).data('dropdown').close();
      $(this.relatedViewManagers.language_usage_widget.relatedViews.language_usage_widget_undefined._languageDropdown.dropdownSelect).data('dropdown').close();
      this.inherited(transitionAway, arguments);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9MYW5ndWFnZU9wdGlvbnMvRWRpdC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJ0aXRsZVRleHQiLCJpZCIsImNyZWF0ZUxheW91dCIsImxheW91dCIsInJlbGF0ZWRWaWV3Iiwid2lkZ2V0VHlwZSIsInJlcXVlc3REYXRhIiwiZ2V0TGFuZ3VhZ2VPcHRpb25zIiwidGhlbiIsImRhdGEiLCJfb25HZXRDb21wbGV0ZSIsImVyciIsIl9vbkdldEVycm9yIiwiZGVmIiwicmVzb2x2ZSIsInByb21pc2UiLCJvblJlZnJlc2hVcGRhdGUiLCJ0cmFuc2l0aW9uQXdheSIsIiQiLCJyZWxhdGVkVmlld01hbmFnZXJzIiwibGFuZ3VhZ2VfdXNhZ2Vfd2lkZ2V0IiwicmVsYXRlZFZpZXdzIiwibGFuZ3VhZ2VfdXNhZ2Vfd2lkZ2V0X3VuZGVmaW5lZCIsIl9yZWdpb25Ecm9wZG93biIsImRyb3Bkb3duU2VsZWN0IiwiY2xvc2UiLCJfbGFuZ3VhZ2VEcm9wZG93biIsImluaGVyaXRlZCIsImFyZ3VtZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU1BLFdBQVcsb0JBQVkscUJBQVosQ0FBakI7O0FBRUE7Ozs7OztBQXZCQTs7Ozs7Ozs7Ozs7Ozs7O0FBNkJBLE1BQU1DLFVBQVUsdUJBQVEsZ0NBQVIsRUFBMEMsMERBQTFDLEVBQWdGO0FBQzlGO0FBQ0FDLGVBQVdGLFNBQVNFLFNBRjBFO0FBRzlGO0FBQ0FDLFFBQUksdUJBSjBGO0FBSzlGQyxrQkFBYyxTQUFTQSxZQUFULEdBQXdCO0FBQ3BDLGFBQU8sS0FBS0MsTUFBTCxLQUFnQixLQUFLQSxNQUFMLEdBQWMsQ0FBQztBQUNwQ0MscUJBQWE7QUFDWEMsc0JBQVkscUJBREQ7QUFFWEosY0FBSTtBQUZPO0FBRHVCLE9BQUQsQ0FBOUIsQ0FBUDtBQU1ELEtBWjZGO0FBYTlGSyxpQkFBYSxTQUFTQSxXQUFULEdBQXVCO0FBQUE7O0FBQ2xDLGFBQU8sS0FBS0Msa0JBQUwsR0FBMEJDLElBQTFCLENBQStCLFVBQUNDLElBQUQsRUFBVTtBQUM5QyxjQUFLQyxjQUFMLENBQW9CRCxJQUFwQjtBQUNELE9BRk0sRUFFSixVQUFDRSxHQUFELEVBQVM7QUFDVixjQUFLQyxXQUFMLENBQWlCLElBQWpCLEVBQXVCRCxHQUF2QjtBQUNELE9BSk0sQ0FBUDtBQUtELEtBbkI2RjtBQW9COUZKLHdCQUFvQixTQUFTQSxrQkFBVCxHQUE4QjtBQUNoRCxVQUFNTSxNQUFNLHdCQUFaO0FBQ0FBLFVBQUlDLE9BQUosQ0FBWSxFQUFaO0FBQ0EsYUFBT0QsSUFBSUUsT0FBWDtBQUNELEtBeEI2RjtBQXlCOUZDLHFCQUFpQixTQUFTQSxlQUFULEdBQTJCO0FBQzFDLFdBQUtWLFdBQUw7QUFDRCxLQTNCNkY7QUE0QjlGVyxvQkFBZ0IsU0FBU0EsY0FBVCxHQUEwQjtBQUN4QztBQUNBQyxRQUFFLEtBQUtDLG1CQUFMLENBQ0NDLHFCQURELENBRUNDLFlBRkQsQ0FHQ0MsK0JBSEQsQ0FJQ0MsZUFKRCxDQUtDQyxjQUxILEVBS21CZixJQUxuQixDQUt3QixVQUx4QixFQUtvQ2dCLEtBTHBDO0FBTUFQLFFBQUUsS0FBS0MsbUJBQUwsQ0FDQ0MscUJBREQsQ0FFQ0MsWUFGRCxDQUdDQywrQkFIRCxDQUlDSSxpQkFKRCxDQUtDRixjQUxILEVBS21CZixJQUxuQixDQUt3QixVQUx4QixFQUtvQ2dCLEtBTHBDO0FBTUEsV0FBS0UsU0FBTCxDQUFlVixjQUFmLEVBQStCVyxTQUEvQjtBQUNEO0FBM0M2RixHQUFoRixDQUFoQjs7b0JBOENlN0IsTyIsImZpbGUiOiJFZGl0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IF9FZGl0QmFzZSBmcm9tICdhcmdvcy9fRWRpdEJhc2UnO1xyXG5pbXBvcnQgX1JlbGF0ZWRXaWRnZXRFZGl0TWl4aW4gZnJvbSAnYXJnb3MvX1JlbGF0ZWRWaWV3V2lkZ2V0RWRpdE1peGluJztcclxuaW1wb3J0IERlZmVycmVkIGZyb20gJ2Rvam8vRGVmZXJyZWQnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdsYW5ndWFnZU9wdGlvbnNFZGl0Jyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5PZmZsaW5lT3B0aW9ucy5FZGl0XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkVkaXRcclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuTGFuZ3VhZ2VPcHRpb25zLkVkaXQnLCBbX0VkaXRCYXNlLCBfUmVsYXRlZFdpZGdldEVkaXRNaXhpbl0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ2xhbmd1YWdlX29wdGlvbnNfZWRpdCcsXHJcbiAgY3JlYXRlTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXlvdXQgfHwgKHRoaXMubGF5b3V0ID0gW3tcclxuICAgICAgcmVsYXRlZFZpZXc6IHtcclxuICAgICAgICB3aWRnZXRUeXBlOiAnbGFuZ3VhZ2VVc2FnZVdpZGdldCcsXHJcbiAgICAgICAgaWQ6ICdsYW5ndWFnZV91c2FnZV93aWRnZXQnLFxyXG4gICAgICB9LFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbiAgcmVxdWVzdERhdGE6IGZ1bmN0aW9uIHJlcXVlc3REYXRhKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0TGFuZ3VhZ2VPcHRpb25zKCkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICB0aGlzLl9vbkdldENvbXBsZXRlKGRhdGEpO1xyXG4gICAgfSwgKGVycikgPT4ge1xyXG4gICAgICB0aGlzLl9vbkdldEVycm9yKG51bGwsIGVycik7XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGdldExhbmd1YWdlT3B0aW9uczogZnVuY3Rpb24gZ2V0TGFuZ3VhZ2VPcHRpb25zKCkge1xyXG4gICAgY29uc3QgZGVmID0gbmV3IERlZmVycmVkKCk7XHJcbiAgICBkZWYucmVzb2x2ZSh7IH0pO1xyXG4gICAgcmV0dXJuIGRlZi5wcm9taXNlO1xyXG4gIH0sXHJcbiAgb25SZWZyZXNoVXBkYXRlOiBmdW5jdGlvbiBvblJlZnJlc2hVcGRhdGUoKSB7XHJcbiAgICB0aGlzLnJlcXVlc3REYXRhKCk7XHJcbiAgfSxcclxuICB0cmFuc2l0aW9uQXdheTogZnVuY3Rpb24gdHJhbnNpdGlvbkF3YXkoKSB7XHJcbiAgICAvLyBmb3JjZSBzb2hvIGRyb3Bkb3duIHRvIGNsb3NlIHNpbmNlIHRoZXkgZG9udCBjbG9zZSBvbiBhIGJ1dHRvbiBjbGljayBlbHNld2hlcmUgb24gVUlcclxuICAgICQodGhpcy5yZWxhdGVkVmlld01hbmFnZXJzXHJcbiAgICAgIC5sYW5ndWFnZV91c2FnZV93aWRnZXRcclxuICAgICAgLnJlbGF0ZWRWaWV3c1xyXG4gICAgICAubGFuZ3VhZ2VfdXNhZ2Vfd2lkZ2V0X3VuZGVmaW5lZFxyXG4gICAgICAuX3JlZ2lvbkRyb3Bkb3duXHJcbiAgICAgIC5kcm9wZG93blNlbGVjdCkuZGF0YSgnZHJvcGRvd24nKS5jbG9zZSgpO1xyXG4gICAgJCh0aGlzLnJlbGF0ZWRWaWV3TWFuYWdlcnNcclxuICAgICAgLmxhbmd1YWdlX3VzYWdlX3dpZGdldFxyXG4gICAgICAucmVsYXRlZFZpZXdzXHJcbiAgICAgIC5sYW5ndWFnZV91c2FnZV93aWRnZXRfdW5kZWZpbmVkXHJcbiAgICAgIC5fbGFuZ3VhZ2VEcm9wZG93blxyXG4gICAgICAuZHJvcGRvd25TZWxlY3QpLmRhdGEoJ2Ryb3Bkb3duJykuY2xvc2UoKTtcclxuICAgIHRoaXMuaW5oZXJpdGVkKHRyYW5zaXRpb25Bd2F5LCBhcmd1bWVudHMpO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19