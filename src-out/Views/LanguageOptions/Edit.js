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
      this.inherited(arguments);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9MYW5ndWFnZU9wdGlvbnMvRWRpdC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJ0aXRsZVRleHQiLCJpZCIsImNyZWF0ZUxheW91dCIsImxheW91dCIsInJlbGF0ZWRWaWV3Iiwid2lkZ2V0VHlwZSIsInJlcXVlc3REYXRhIiwiZ2V0TGFuZ3VhZ2VPcHRpb25zIiwidGhlbiIsImRhdGEiLCJfb25HZXRDb21wbGV0ZSIsImVyciIsIl9vbkdldEVycm9yIiwiZGVmIiwicmVzb2x2ZSIsInByb21pc2UiLCJvblJlZnJlc2hVcGRhdGUiLCJ0cmFuc2l0aW9uQXdheSIsIiQiLCJyZWxhdGVkVmlld01hbmFnZXJzIiwibGFuZ3VhZ2VfdXNhZ2Vfd2lkZ2V0IiwicmVsYXRlZFZpZXdzIiwibGFuZ3VhZ2VfdXNhZ2Vfd2lkZ2V0X3VuZGVmaW5lZCIsIl9yZWdpb25Ecm9wZG93biIsImRyb3Bkb3duU2VsZWN0IiwiY2xvc2UiLCJfbGFuZ3VhZ2VEcm9wZG93biIsImluaGVyaXRlZCIsImFyZ3VtZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU1BLFdBQVcsb0JBQVkscUJBQVosQ0FBakI7O0FBRUE7Ozs7OztBQXZCQTs7Ozs7Ozs7Ozs7Ozs7O0FBNkJBLE1BQU1DLFVBQVUsdUJBQVEsZ0NBQVIsRUFBMEMsMERBQTFDLEVBQWdGO0FBQzlGO0FBQ0FDLGVBQVdGLFNBQVNFLFNBRjBFO0FBRzlGO0FBQ0FDLFFBQUksdUJBSjBGO0FBSzlGQyxrQkFBYyxTQUFTQSxZQUFULEdBQXdCO0FBQ3BDLGFBQU8sS0FBS0MsTUFBTCxLQUFnQixLQUFLQSxNQUFMLEdBQWMsQ0FBQztBQUNwQ0MscUJBQWE7QUFDWEMsc0JBQVkscUJBREQ7QUFFWEosY0FBSTtBQUZPO0FBRHVCLE9BQUQsQ0FBOUIsQ0FBUDtBQU1ELEtBWjZGO0FBYTlGSyxpQkFBYSxTQUFTQSxXQUFULEdBQXVCO0FBQUE7O0FBQ2xDLGFBQU8sS0FBS0Msa0JBQUwsR0FBMEJDLElBQTFCLENBQStCLFVBQUNDLElBQUQsRUFBVTtBQUM5QyxjQUFLQyxjQUFMLENBQW9CRCxJQUFwQjtBQUNELE9BRk0sRUFFSixVQUFDRSxHQUFELEVBQVM7QUFDVixjQUFLQyxXQUFMLENBQWlCLElBQWpCLEVBQXVCRCxHQUF2QjtBQUNELE9BSk0sQ0FBUDtBQUtELEtBbkI2RjtBQW9COUZKLHdCQUFvQixTQUFTQSxrQkFBVCxHQUE4QjtBQUNoRCxVQUFNTSxNQUFNLHdCQUFaO0FBQ0FBLFVBQUlDLE9BQUosQ0FBWSxFQUFaO0FBQ0EsYUFBT0QsSUFBSUUsT0FBWDtBQUNELEtBeEI2RjtBQXlCOUZDLHFCQUFpQixTQUFTQSxlQUFULEdBQTJCO0FBQzFDLFdBQUtWLFdBQUw7QUFDRCxLQTNCNkY7QUE0QjlGVyxvQkFBZ0IsU0FBU0EsY0FBVCxHQUEwQjtBQUN4QztBQUNBQyxRQUFFLEtBQUtDLG1CQUFMLENBQ0NDLHFCQURELENBRUNDLFlBRkQsQ0FHQ0MsK0JBSEQsQ0FJQ0MsZUFKRCxDQUtDQyxjQUxILEVBS21CZixJQUxuQixDQUt3QixVQUx4QixFQUtvQ2dCLEtBTHBDO0FBTUFQLFFBQUUsS0FBS0MsbUJBQUwsQ0FDQ0MscUJBREQsQ0FFQ0MsWUFGRCxDQUdDQywrQkFIRCxDQUlDSSxpQkFKRCxDQUtDRixjQUxILEVBS21CZixJQUxuQixDQUt3QixVQUx4QixFQUtvQ2dCLEtBTHBDO0FBTUEsV0FBS0UsU0FBTCxDQUFlQyxTQUFmO0FBQ0Q7QUEzQzZGLEdBQWhGLENBQWhCOztvQkE4Q2U3QixPIiwiZmlsZSI6IkVkaXQuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgX0VkaXRCYXNlIGZyb20gJ2FyZ29zL19FZGl0QmFzZSc7XHJcbmltcG9ydCBfUmVsYXRlZFdpZGdldEVkaXRNaXhpbiBmcm9tICdhcmdvcy9fUmVsYXRlZFZpZXdXaWRnZXRFZGl0TWl4aW4nO1xyXG5pbXBvcnQgRGVmZXJyZWQgZnJvbSAnZG9qby9EZWZlcnJlZCc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2xhbmd1YWdlT3B0aW9uc0VkaXQnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLk9mZmxpbmVPcHRpb25zLkVkaXRcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuRWRpdFxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5MYW5ndWFnZU9wdGlvbnMuRWRpdCcsIFtfRWRpdEJhc2UsIF9SZWxhdGVkV2lkZ2V0RWRpdE1peGluXSwge1xyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnbGFuZ3VhZ2Vfb3B0aW9uc19lZGl0JyxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICByZWxhdGVkVmlldzoge1xyXG4gICAgICAgIHdpZGdldFR5cGU6ICdsYW5ndWFnZVVzYWdlV2lkZ2V0JyxcclxuICAgICAgICBpZDogJ2xhbmd1YWdlX3VzYWdlX3dpZGdldCcsXHJcbiAgICAgIH0sXHJcbiAgICB9XSk7XHJcbiAgfSxcclxuICByZXF1ZXN0RGF0YTogZnVuY3Rpb24gcmVxdWVzdERhdGEoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRMYW5ndWFnZU9wdGlvbnMoKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgIHRoaXMuX29uR2V0Q29tcGxldGUoZGF0YSk7XHJcbiAgICB9LCAoZXJyKSA9PiB7XHJcbiAgICAgIHRoaXMuX29uR2V0RXJyb3IobnVsbCwgZXJyKTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZ2V0TGFuZ3VhZ2VPcHRpb25zOiBmdW5jdGlvbiBnZXRMYW5ndWFnZU9wdGlvbnMoKSB7XHJcbiAgICBjb25zdCBkZWYgPSBuZXcgRGVmZXJyZWQoKTtcclxuICAgIGRlZi5yZXNvbHZlKHsgfSk7XHJcbiAgICByZXR1cm4gZGVmLnByb21pc2U7XHJcbiAgfSxcclxuICBvblJlZnJlc2hVcGRhdGU6IGZ1bmN0aW9uIG9uUmVmcmVzaFVwZGF0ZSgpIHtcclxuICAgIHRoaXMucmVxdWVzdERhdGEoKTtcclxuICB9LFxyXG4gIHRyYW5zaXRpb25Bd2F5OiBmdW5jdGlvbiB0cmFuc2l0aW9uQXdheSgpIHtcclxuICAgIC8vIGZvcmNlIHNvaG8gZHJvcGRvd24gdG8gY2xvc2Ugc2luY2UgdGhleSBkb250IGNsb3NlIG9uIGEgYnV0dG9uIGNsaWNrIGVsc2V3aGVyZSBvbiBVSVxyXG4gICAgJCh0aGlzLnJlbGF0ZWRWaWV3TWFuYWdlcnNcclxuICAgICAgLmxhbmd1YWdlX3VzYWdlX3dpZGdldFxyXG4gICAgICAucmVsYXRlZFZpZXdzXHJcbiAgICAgIC5sYW5ndWFnZV91c2FnZV93aWRnZXRfdW5kZWZpbmVkXHJcbiAgICAgIC5fcmVnaW9uRHJvcGRvd25cclxuICAgICAgLmRyb3Bkb3duU2VsZWN0KS5kYXRhKCdkcm9wZG93bicpLmNsb3NlKCk7XHJcbiAgICAkKHRoaXMucmVsYXRlZFZpZXdNYW5hZ2Vyc1xyXG4gICAgICAubGFuZ3VhZ2VfdXNhZ2Vfd2lkZ2V0XHJcbiAgICAgIC5yZWxhdGVkVmlld3NcclxuICAgICAgLmxhbmd1YWdlX3VzYWdlX3dpZGdldF91bmRlZmluZWRcclxuICAgICAgLl9sYW5ndWFnZURyb3Bkb3duXHJcbiAgICAgIC5kcm9wZG93blNlbGVjdCkuZGF0YSgnZHJvcGRvd24nKS5jbG9zZSgpO1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==