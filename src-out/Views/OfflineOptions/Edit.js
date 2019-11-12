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
      this.inherited(arguments);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9PZmZsaW5lT3B0aW9ucy9FZGl0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsInRpdGxlVGV4dCIsIm11bHRpQ29sdW1uVmlldyIsImlkIiwiY3JlYXRlTGF5b3V0IiwibGF5b3V0IiwicmVsYXRlZFZpZXciLCJ3aWRnZXRUeXBlIiwicmVxdWVzdERhdGEiLCJnZXRPZmZsaW5lT3B0aW9ucyIsInRoZW4iLCJkYXRhIiwiX29uR2V0Q29tcGxldGUiLCJlcnIiLCJfb25HZXRFcnJvciIsImRlZiIsInJlc29sdmUiLCJtYXhkYXlzIiwicHJvbWlzZSIsIm9uUmVmcmVzaFVwZGF0ZSIsInRyYW5zaXRpb25Bd2F5IiwiJCIsInJlbGF0ZWRWaWV3TWFuYWdlcnMiLCJvZmZsaW5lX3VzYWdlX3dpZGdldCIsInJlbGF0ZWRWaWV3cyIsIm9mZmxpbmVfdXNhZ2Vfd2lkZ2V0X3VuZGVmaW5lZCIsIl9vbGRlclRoYW5Ecm9wZG93biIsImRyb3Bkb3duU2VsZWN0IiwiY2xvc2UiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQSxNQUFNQSxXQUFXLG9CQUFZLG9CQUFaLENBQWpCOztBQUVBOzs7Ozs7QUF2QkE7Ozs7Ozs7Ozs7Ozs7OztBQTZCQSxNQUFNQyxVQUFVLHVCQUFRLCtCQUFSLEVBQXlDLDBEQUF6QyxFQUErRTtBQUM3RjtBQUNBQyxlQUFXRixTQUFTRSxTQUZ5RTtBQUc3RkMscUJBQWlCLEtBSDRFO0FBSTdGO0FBQ0FDLFFBQUksc0JBTHlGO0FBTTdGQyxrQkFBYyxTQUFTQSxZQUFULEdBQXdCO0FBQ3BDLGFBQU8sS0FBS0MsTUFBTCxLQUFnQixLQUFLQSxNQUFMLEdBQWMsQ0FBQztBQUNwQ0MscUJBQWE7QUFDWEMsc0JBQVksb0JBREQ7QUFFWEosY0FBSTtBQUZPO0FBRHVCLE9BQUQsQ0FBOUIsQ0FBUDtBQU1ELEtBYjRGO0FBYzdGSyxpQkFBYSxTQUFTQSxXQUFULEdBQXVCO0FBQUE7O0FBQ2xDLGFBQU8sS0FBS0MsaUJBQUwsR0FBeUJDLElBQXpCLENBQThCLFVBQUNDLElBQUQsRUFBVTtBQUM3QyxjQUFLQyxjQUFMLENBQW9CRCxJQUFwQjtBQUNELE9BRk0sRUFFSixVQUFDRSxHQUFELEVBQVM7QUFDVixjQUFLQyxXQUFMLENBQWlCLElBQWpCLEVBQXVCRCxHQUF2QjtBQUNELE9BSk0sQ0FBUDtBQUtELEtBcEI0RjtBQXFCN0ZKLHVCQUFtQixTQUFTQSxpQkFBVCxHQUE2QjtBQUM5QyxVQUFNTSxNQUFNLHdCQUFaO0FBQ0FBLFVBQUlDLE9BQUosQ0FBWSxFQUFFQyxTQUFTLENBQVgsRUFBWjtBQUNBLGFBQU9GLElBQUlHLE9BQVg7QUFDRCxLQXpCNEY7QUEwQjdGQyxxQkFBaUIsU0FBU0EsZUFBVCxHQUEyQjtBQUMxQyxXQUFLWCxXQUFMO0FBQ0QsS0E1QjRGO0FBNkI3Rlksb0JBQWdCLFNBQVNBLGNBQVQsR0FBMEI7QUFDeEM7QUFDQUMsUUFBRSxLQUFLQyxtQkFBTCxDQUNDQyxvQkFERCxDQUVDQyxZQUZELENBR0NDLDhCQUhELENBSUNDLGtCQUpELENBS0NDLGNBTEgsRUFLbUJoQixJQUxuQixDQUt3QixVQUx4QixFQUtvQ2lCLEtBTHBDO0FBTUEsV0FBS0MsU0FBTCxDQUFlQyxTQUFmO0FBQ0Q7QUF0QzRGLEdBQS9FLENBQWhCOztvQkF5Q2U5QixPIiwiZmlsZSI6IkVkaXQuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgX0VkaXRCYXNlIGZyb20gJ2FyZ29zL19FZGl0QmFzZSc7XHJcbmltcG9ydCBfUmVsYXRlZFdpZGdldEVkaXRNaXhpbiBmcm9tICdhcmdvcy9fUmVsYXRlZFZpZXdXaWRnZXRFZGl0TWl4aW4nO1xyXG5pbXBvcnQgRGVmZXJyZWQgZnJvbSAnZG9qby9EZWZlcnJlZCc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ29mZmxpbmVPcHRpb25zRWRpdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuT2ZmbGluZU9wdGlvbnMuRWRpdFxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5FZGl0XHJcbiAqXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLk9mZmxpbmVPcHRpb25zLkVkaXQnLCBbX0VkaXRCYXNlLCBfUmVsYXRlZFdpZGdldEVkaXRNaXhpbl0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBtdWx0aUNvbHVtblZpZXc6IGZhbHNlLFxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnb2ZmbGluZV9vcHRpb25zX2VkaXQnLFxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5b3V0IHx8ICh0aGlzLmxheW91dCA9IFt7XHJcbiAgICAgIHJlbGF0ZWRWaWV3OiB7XHJcbiAgICAgICAgd2lkZ2V0VHlwZTogJ29mZmxpbmVVc2FnZVdpZGdldCcsXHJcbiAgICAgICAgaWQ6ICdvZmZsaW5lX3VzYWdlX3dpZGdldCcsXHJcbiAgICAgIH0sXHJcbiAgICB9XSk7XHJcbiAgfSxcclxuICByZXF1ZXN0RGF0YTogZnVuY3Rpb24gcmVxdWVzdERhdGEoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRPZmZsaW5lT3B0aW9ucygpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgdGhpcy5fb25HZXRDb21wbGV0ZShkYXRhKTtcclxuICAgIH0sIChlcnIpID0+IHtcclxuICAgICAgdGhpcy5fb25HZXRFcnJvcihudWxsLCBlcnIpO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBnZXRPZmZsaW5lT3B0aW9uczogZnVuY3Rpb24gZ2V0T2ZmbGluZU9wdGlvbnMoKSB7XHJcbiAgICBjb25zdCBkZWYgPSBuZXcgRGVmZXJyZWQoKTtcclxuICAgIGRlZi5yZXNvbHZlKHsgbWF4ZGF5czogNSB9KTtcclxuICAgIHJldHVybiBkZWYucHJvbWlzZTtcclxuICB9LFxyXG4gIG9uUmVmcmVzaFVwZGF0ZTogZnVuY3Rpb24gb25SZWZyZXNoVXBkYXRlKCkge1xyXG4gICAgdGhpcy5yZXF1ZXN0RGF0YSgpO1xyXG4gIH0sXHJcbiAgdHJhbnNpdGlvbkF3YXk6IGZ1bmN0aW9uIHRyYW5zaXRpb25Bd2F5KCkge1xyXG4gICAgLy8gZm9yY2Ugc29obyBkcm9wZG93biB0byBjbG9zZSBzaW5jZSB0aGV5IGRvbnQgY2xvc2Ugb24gYSBidXR0b24gY2xpY2sgZWxzZXdoZXJlIG9uIFVJXHJcbiAgICAkKHRoaXMucmVsYXRlZFZpZXdNYW5hZ2Vyc1xyXG4gICAgICAub2ZmbGluZV91c2FnZV93aWRnZXRcclxuICAgICAgLnJlbGF0ZWRWaWV3c1xyXG4gICAgICAub2ZmbGluZV91c2FnZV93aWRnZXRfdW5kZWZpbmVkXHJcbiAgICAgIC5fb2xkZXJUaGFuRHJvcGRvd25cclxuICAgICAgLmRyb3Bkb3duU2VsZWN0KS5kYXRhKCdkcm9wZG93bicpLmNsb3NlKCk7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19