define('crm/Views/ExchangeRateLookup', ['module', 'exports', 'dojo/_base/declare', 'argos/List', 'argos/_LegacySDataListMixin', 'argos/I18n'], function (module, exports, _declare, _List, _LegacySDataListMixin2, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _List2 = _interopRequireDefault(_List);

  var _LegacySDataListMixin3 = _interopRequireDefault(_LegacySDataListMixin2);

  var _I18n2 = _interopRequireDefault(_I18n);

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

  var resource = (0, _I18n2.default)('exchangeRateLookup');

  /**
   * @class crm.Views.ExchangeRateLookup
   *
   *
   * @extends argos.List
   * @mixins argos._LegacySDataListMixin
   *
   */
  var __class = (0, _declare2.default)('crm.Views.ExchangeRateLookup', [_List2.default, _LegacySDataListMixin3.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.$key %} ({%: $.Rate %})</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    expose: false,
    enableSearch: false,
    id: 'exchangerate_lookup',

    requestData: function requestData() {
      this.processFeed();
    },
    processFeed: function processFeed() {
      var rates = App.context && App.context.exchangeRates;
      var list = [];
      var feed = {};

      for (var prop in rates) {
        if (rates.hasOwnProperty(prop)) {
          list.push({
            $key: prop,
            $descriptor: prop,
            Rate: rates[prop]
          });
        }
      }

      feed.$resources = list;

      this.inherited(arguments, [feed]);
    },
    hasMoreData: function hasMoreData() {
      return false;
    },
    refreshRequiredFor: function refreshRequiredFor() {
      return true;
    },
    formatSearchQuery: function formatSearchQuery() {}
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9FeGNoYW5nZVJhdGVMb29rdXAuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiaXRlbVRlbXBsYXRlIiwiU2ltcGxhdGUiLCJ0aXRsZVRleHQiLCJleHBvc2UiLCJlbmFibGVTZWFyY2giLCJpZCIsInJlcXVlc3REYXRhIiwicHJvY2Vzc0ZlZWQiLCJyYXRlcyIsIkFwcCIsImNvbnRleHQiLCJleGNoYW5nZVJhdGVzIiwibGlzdCIsImZlZWQiLCJwcm9wIiwiaGFzT3duUHJvcGVydHkiLCJwdXNoIiwiJGtleSIsIiRkZXNjcmlwdG9yIiwiUmF0ZSIsIiRyZXNvdXJjZXMiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJoYXNNb3JlRGF0YSIsInJlZnJlc2hSZXF1aXJlZEZvciIsImZvcm1hdFNlYXJjaFF1ZXJ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQW9CQSxNQUFNQSxXQUFXLG9CQUFZLG9CQUFaLENBQWpCOztBQUVBOzs7Ozs7OztBQVFBLE1BQU1DLFVBQVUsdUJBQVEsOEJBQVIsRUFBd0MsZ0RBQXhDLEVBQXVFO0FBQ3JGO0FBQ0FDLGtCQUFjLElBQUlDLFFBQUosQ0FBYSxDQUN6QiwrREFEeUIsQ0FBYixDQUZ1RTs7QUFNckY7QUFDQUMsZUFBV0osU0FBU0ksU0FQaUU7O0FBU3JGO0FBQ0FDLFlBQVEsS0FWNkU7QUFXckZDLGtCQUFjLEtBWHVFO0FBWXJGQyxRQUFJLHFCQVppRjs7QUFjckZDLGlCQUFhLFNBQVNBLFdBQVQsR0FBdUI7QUFDbEMsV0FBS0MsV0FBTDtBQUNELEtBaEJvRjtBQWlCckZBLGlCQUFhLFNBQVNBLFdBQVQsR0FBdUI7QUFDbEMsVUFBTUMsUUFBUUMsSUFBSUMsT0FBSixJQUFlRCxJQUFJQyxPQUFKLENBQVlDLGFBQXpDO0FBQ0EsVUFBTUMsT0FBTyxFQUFiO0FBQ0EsVUFBTUMsT0FBTyxFQUFiOztBQUVBLFdBQUssSUFBTUMsSUFBWCxJQUFtQk4sS0FBbkIsRUFBMEI7QUFDeEIsWUFBSUEsTUFBTU8sY0FBTixDQUFxQkQsSUFBckIsQ0FBSixFQUFnQztBQUM5QkYsZUFBS0ksSUFBTCxDQUFVO0FBQ1JDLGtCQUFNSCxJQURFO0FBRVJJLHlCQUFhSixJQUZMO0FBR1JLLGtCQUFNWCxNQUFNTSxJQUFOO0FBSEUsV0FBVjtBQUtEO0FBQ0Y7O0FBRURELFdBQUtPLFVBQUwsR0FBa0JSLElBQWxCOztBQUVBLFdBQUtTLFNBQUwsQ0FBZUMsU0FBZixFQUEwQixDQUFDVCxJQUFELENBQTFCO0FBQ0QsS0FuQ29GO0FBb0NyRlUsaUJBQWEsU0FBU0EsV0FBVCxHQUF1QjtBQUNsQyxhQUFPLEtBQVA7QUFDRCxLQXRDb0Y7QUF1Q3JGQyx3QkFBb0IsU0FBU0Esa0JBQVQsR0FBOEI7QUFDaEQsYUFBTyxJQUFQO0FBQ0QsS0F6Q29GO0FBMENyRkMsdUJBQW1CLFNBQVNBLGlCQUFULEdBQTZCLENBQy9DO0FBM0NvRixHQUF2RSxDQUFoQjs7b0JBOENlMUIsTyIsImZpbGUiOiJFeGNoYW5nZVJhdGVMb29rdXAuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuaW1wb3J0IF9MZWdhY3lTRGF0YUxpc3RNaXhpbiBmcm9tICdhcmdvcy9fTGVnYWN5U0RhdGFMaXN0TWl4aW4nO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdleGNoYW5nZVJhdGVMb29rdXAnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLkV4Y2hhbmdlUmF0ZUxvb2t1cFxyXG4gKlxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5MaXN0XHJcbiAqIEBtaXhpbnMgYXJnb3MuX0xlZ2FjeVNEYXRhTGlzdE1peGluXHJcbiAqXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLkV4Y2hhbmdlUmF0ZUxvb2t1cCcsIFtMaXN0LCBfTGVnYWN5U0RhdGFMaXN0TWl4aW5dLCB7XHJcbiAgLy8gVGVtcGxhdGVzXHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxwIGNsYXNzPVwibGlzdHZpZXctaGVhZGluZ1wiPnslOiAkLiRrZXkgJX0gKHslOiAkLlJhdGUgJX0pPC9wPicsXHJcbiAgXSksXHJcblxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBleHBvc2U6IGZhbHNlLFxyXG4gIGVuYWJsZVNlYXJjaDogZmFsc2UsXHJcbiAgaWQ6ICdleGNoYW5nZXJhdGVfbG9va3VwJyxcclxuXHJcbiAgcmVxdWVzdERhdGE6IGZ1bmN0aW9uIHJlcXVlc3REYXRhKCkge1xyXG4gICAgdGhpcy5wcm9jZXNzRmVlZCgpO1xyXG4gIH0sXHJcbiAgcHJvY2Vzc0ZlZWQ6IGZ1bmN0aW9uIHByb2Nlc3NGZWVkKCkge1xyXG4gICAgY29uc3QgcmF0ZXMgPSBBcHAuY29udGV4dCAmJiBBcHAuY29udGV4dC5leGNoYW5nZVJhdGVzO1xyXG4gICAgY29uc3QgbGlzdCA9IFtdO1xyXG4gICAgY29uc3QgZmVlZCA9IHt9O1xyXG5cclxuICAgIGZvciAoY29uc3QgcHJvcCBpbiByYXRlcykge1xyXG4gICAgICBpZiAocmF0ZXMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcclxuICAgICAgICBsaXN0LnB1c2goe1xyXG4gICAgICAgICAgJGtleTogcHJvcCxcclxuICAgICAgICAgICRkZXNjcmlwdG9yOiBwcm9wLFxyXG4gICAgICAgICAgUmF0ZTogcmF0ZXNbcHJvcF0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmZWVkLiRyZXNvdXJjZXMgPSBsaXN0O1xyXG5cclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cywgW2ZlZWRdKTtcclxuICB9LFxyXG4gIGhhc01vcmVEYXRhOiBmdW5jdGlvbiBoYXNNb3JlRGF0YSgpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LFxyXG4gIHJlZnJlc2hSZXF1aXJlZEZvcjogZnVuY3Rpb24gcmVmcmVzaFJlcXVpcmVkRm9yKCkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSxcclxuICBmb3JtYXRTZWFyY2hRdWVyeTogZnVuY3Rpb24gZm9ybWF0U2VhcmNoUXVlcnkoKSB7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=