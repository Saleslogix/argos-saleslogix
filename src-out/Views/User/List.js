define('crm/Views/User/List', ['module', 'exports', 'dojo/_base/declare', 'argos/List', 'argos/I18n'], function (module, exports, _declare, _List, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _List2 = _interopRequireDefault(_List);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('userList');

  /**
   * @class crm.Views.User.List
   *
   * @extends argos.List
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

  var __class = (0, _declare2.default)('crm.Views.User.List', [_List2.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.UserInfo.LastName %}, {%: $.UserInfo.FirstName %}</p>', '<p class="micro-text">{%: $.UserInfo.Title %}</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'user_list',
    isCardView: false,
    queryOrderBy: 'UserInfo.LastName asc, UserInfo.FirstName asc',

    // Excluded types for the queryWhere
    // Type:
    // 3 - WebViewer
    // 5 - Retired
    // 6 - Template
    // 7 - AddOn
    queryWhere: 'Enabled eq true and (Type ne 3 AND Type ne 5 AND Type ne 6 AND Type ne 7)',
    querySelect: ['UserInfo/FirstName', 'UserInfo/LastName', 'UserInfo/Title', 'UserInfo/UserName'],
    resourceKind: 'users',

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(UserInfo.UserName) like "%' + q + '%"';
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9Vc2VyL0xpc3QuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiaXRlbVRlbXBsYXRlIiwiU2ltcGxhdGUiLCJ0aXRsZVRleHQiLCJpZCIsImlzQ2FyZFZpZXciLCJxdWVyeU9yZGVyQnkiLCJxdWVyeVdoZXJlIiwicXVlcnlTZWxlY3QiLCJyZXNvdXJjZUtpbmQiLCJmb3JtYXRTZWFyY2hRdWVyeSIsInNlYXJjaFF1ZXJ5IiwicSIsImVzY2FwZVNlYXJjaFF1ZXJ5IiwidG9VcHBlckNhc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBLE1BQU1BLFdBQVcsb0JBQVksVUFBWixDQUFqQjs7QUFFQTs7Ozs7QUFyQkE7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxNQUFNQyxVQUFVLHVCQUFRLHFCQUFSLEVBQStCLGdCQUEvQixFQUF1QztBQUNyRDtBQUNBQyxrQkFBYyxJQUFJQyxRQUFKLENBQWEsQ0FDekIseUZBRHlCLEVBRXpCLG1EQUZ5QixDQUFiLENBRnVDOztBQU9yRDtBQUNBQyxlQUFXSixTQUFTSSxTQVJpQzs7QUFVckQ7QUFDQUMsUUFBSSxXQVhpRDtBQVlyREMsZ0JBQVksS0FaeUM7QUFhckRDLGtCQUFjLCtDQWJ1Qzs7QUFlckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLGdCQUFZLDJFQXJCeUM7QUFzQnJEQyxpQkFBYSxDQUNYLG9CQURXLEVBRVgsbUJBRlcsRUFHWCxnQkFIVyxFQUlYLG1CQUpXLENBdEJ3QztBQTRCckRDLGtCQUFjLE9BNUJ1Qzs7QUE4QnJEQyx1QkFBbUIsU0FBU0EsaUJBQVQsQ0FBMkJDLFdBQTNCLEVBQXdDO0FBQ3pELFVBQU1DLElBQUksS0FBS0MsaUJBQUwsQ0FBdUJGLFlBQVlHLFdBQVosRUFBdkIsQ0FBVjtBQUNBLGtEQUEwQ0YsQ0FBMUM7QUFDRDtBQWpDb0QsR0FBdkMsQ0FBaEI7O29CQW9DZVosTyIsImZpbGUiOiJMaXN0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IExpc3QgZnJvbSAnYXJnb3MvTGlzdCc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3VzZXJMaXN0Jyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5Vc2VyLkxpc3RcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuTGlzdFxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5Vc2VyLkxpc3QnLCBbTGlzdF0sIHtcclxuICAvLyBUZW1wbGF0ZXNcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPHAgY2xhc3M9XCJsaXN0dmlldy1oZWFkaW5nXCI+eyU6ICQuVXNlckluZm8uTGFzdE5hbWUgJX0sIHslOiAkLlVzZXJJbmZvLkZpcnN0TmFtZSAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPnslOiAkLlVzZXJJbmZvLlRpdGxlICV9PC9wPicsXHJcbiAgXSksXHJcblxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ3VzZXJfbGlzdCcsXHJcbiAgaXNDYXJkVmlldzogZmFsc2UsXHJcbiAgcXVlcnlPcmRlckJ5OiAnVXNlckluZm8uTGFzdE5hbWUgYXNjLCBVc2VySW5mby5GaXJzdE5hbWUgYXNjJyxcclxuXHJcbiAgLy8gRXhjbHVkZWQgdHlwZXMgZm9yIHRoZSBxdWVyeVdoZXJlXHJcbiAgLy8gVHlwZTpcclxuICAvLyAzIC0gV2ViVmlld2VyXHJcbiAgLy8gNSAtIFJldGlyZWRcclxuICAvLyA2IC0gVGVtcGxhdGVcclxuICAvLyA3IC0gQWRkT25cclxuICBxdWVyeVdoZXJlOiAnRW5hYmxlZCBlcSB0cnVlIGFuZCAoVHlwZSBuZSAzIEFORCBUeXBlIG5lIDUgQU5EIFR5cGUgbmUgNiBBTkQgVHlwZSBuZSA3KScsXHJcbiAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICdVc2VySW5mby9GaXJzdE5hbWUnLFxyXG4gICAgJ1VzZXJJbmZvL0xhc3ROYW1lJyxcclxuICAgICdVc2VySW5mby9UaXRsZScsXHJcbiAgICAnVXNlckluZm8vVXNlck5hbWUnLFxyXG4gIF0sXHJcbiAgcmVzb3VyY2VLaW5kOiAndXNlcnMnLFxyXG5cclxuICBmb3JtYXRTZWFyY2hRdWVyeTogZnVuY3Rpb24gZm9ybWF0U2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkpIHtcclxuICAgIGNvbnN0IHEgPSB0aGlzLmVzY2FwZVNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5LnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgcmV0dXJuIGB1cHBlcihVc2VySW5mby5Vc2VyTmFtZSkgbGlrZSBcIiUke3F9JVwiYDtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==