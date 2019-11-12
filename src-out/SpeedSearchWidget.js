define('crm/SpeedSearchWidget', ['module', 'exports', 'dojo/_base/declare', 'argos/SearchWidget', 'argos/I18n'], function (module, exports, _declare, _SearchWidget, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _SearchWidget2 = _interopRequireDefault(_SearchWidget);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('speedSearchWidget');

  /**
   * @class crm.SpeedSearchWidget
   * @mixins argos._Templated
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

  var __class = (0, _declare2.default)('crm.SpeedSearchWidget', [_SearchWidget2.default], /** @lends crm.SpeedSearchWidget# */{
    /**
     * @property {String} searchText The placeholder text for the input.
     */
    searchText: resource.searchText,

    _setQueryValueAttr: function _setQueryValueAttr(value) {
      this._onFocus();
      this.queryNode.value = value;
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGVlZFNlYXJjaFdpZGdldC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJzZWFyY2hUZXh0IiwiX3NldFF1ZXJ5VmFsdWVBdHRyIiwidmFsdWUiLCJfb25Gb2N1cyIsInF1ZXJ5Tm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkEsTUFBTUEsV0FBVyxvQkFBWSxtQkFBWixDQUFqQjs7QUFFQTs7OztBQXJCQTs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLE1BQU1DLFVBQVUsdUJBQVEsdUJBQVIsRUFBaUMsd0JBQWpDLEVBQWlELG9DQUFvQztBQUNuRzs7O0FBR0FDLGdCQUFZRixTQUFTRSxVQUo4RTs7QUFNbkdDLHdCQUFvQixTQUFTQSxrQkFBVCxDQUE0QkMsS0FBNUIsRUFBbUM7QUFDckQsV0FBS0MsUUFBTDtBQUNBLFdBQUtDLFNBQUwsQ0FBZUYsS0FBZixHQUF1QkEsS0FBdkI7QUFDRDtBQVRrRyxHQUFyRixDQUFoQjs7b0JBWWVILE8iLCJmaWxlIjoiU3BlZWRTZWFyY2hXaWRnZXQuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgU2VhcmNoV2lkZ2V0IGZyb20gJ2FyZ29zL1NlYXJjaFdpZGdldCc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3NwZWVkU2VhcmNoV2lkZ2V0Jyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5TcGVlZFNlYXJjaFdpZGdldFxyXG4gKiBAbWl4aW5zIGFyZ29zLl9UZW1wbGF0ZWRcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uU3BlZWRTZWFyY2hXaWRnZXQnLCBbU2VhcmNoV2lkZ2V0XSwgLyoqIEBsZW5kcyBjcm0uU3BlZWRTZWFyY2hXaWRnZXQjICove1xyXG4gIC8qKlxyXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBzZWFyY2hUZXh0IFRoZSBwbGFjZWhvbGRlciB0ZXh0IGZvciB0aGUgaW5wdXQuXHJcbiAgICovXHJcbiAgc2VhcmNoVGV4dDogcmVzb3VyY2Uuc2VhcmNoVGV4dCxcclxuXHJcbiAgX3NldFF1ZXJ5VmFsdWVBdHRyOiBmdW5jdGlvbiBfc2V0UXVlcnlWYWx1ZUF0dHIodmFsdWUpIHtcclxuICAgIHRoaXMuX29uRm9jdXMoKTtcclxuICAgIHRoaXMucXVlcnlOb2RlLnZhbHVlID0gdmFsdWU7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=