define('crm/Integrations/BOE/Views/ERPBillToAccounts/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'crm/Views/_RightDrawerListMixin', 'crm/Views/_MetricListMixin', 'crm/Views/_GroupListMixin', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _List, _RightDrawerListMixin2, _MetricListMixin2, _GroupListMixin2, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _List2 = _interopRequireDefault(_List);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _GroupListMixin3 = _interopRequireDefault(_GroupListMixin2);

  var _Names2 = _interopRequireDefault(_Names);

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

  var resource = (0, _I18n2.default)('erpBillToAccountsList');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPBillToAccounts.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default, _GroupListMixin3.default], {
    // Templates
    // TODO: Need template from PM
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.ErpBillTo.Name %}</p>', '<p class="micro-text address">{%: $.ErpBillTo.Address.FullAddress %}</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'erpbilltoaccounts_list',
    detailView: 'erpbilltoaccounts_detail',
    insertView: 'erpbilltoaccounts_edit',
    resourceKind: 'erpBillToAccounts',
    allowSelection: true,
    enableActions: false,
    expose: false,
    modelName: _Names2.default.ERPBILLTOACCOUNT,
    security: 'Entities/ErpBillTo/View',
    insertSecurity: 'Entities/ErpBillTo/Add',

    // Card layout
    itemIconClass: 'spreadsheet',

    // Groups
    enableDynamicGroupLayout: true,
    groupsEnabled: true,

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(ErpBillTo.Name) like "%' + q + '%"';
    }
  });

  _lang2.default.setObject('icboe.Views.ERPBillToAccounts.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0VSUEJpbGxUb0FjY291bnRzL0xpc3QuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiaXRlbVRlbXBsYXRlIiwiU2ltcGxhdGUiLCJ0aXRsZVRleHQiLCJpZCIsImRldGFpbFZpZXciLCJpbnNlcnRWaWV3IiwicmVzb3VyY2VLaW5kIiwiYWxsb3dTZWxlY3Rpb24iLCJlbmFibGVBY3Rpb25zIiwiZXhwb3NlIiwibW9kZWxOYW1lIiwiRVJQQklMTFRPQUNDT1VOVCIsInNlY3VyaXR5IiwiaW5zZXJ0U2VjdXJpdHkiLCJpdGVtSWNvbkNsYXNzIiwiZW5hYmxlRHluYW1pY0dyb3VwTGF5b3V0IiwiZ3JvdXBzRW5hYmxlZCIsImZvcm1hdFNlYXJjaFF1ZXJ5Iiwic2VhcmNoUXVlcnkiLCJxIiwiZXNjYXBlU2VhcmNoUXVlcnkiLCJ0b1VwcGVyQ2FzZSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxNQUFNQSxXQUFXLG9CQUFZLHVCQUFaLENBQWpCOztBQUVBLE1BQU1DLFVBQVUsdUJBQVEsbURBQVIsRUFBNkQscUdBQTdELEVBQStIO0FBQzdJO0FBQ0E7QUFDQUMsa0JBQWMsSUFBSUMsUUFBSixDQUFhLENBQ3pCLHlEQUR5QixFQUV6QiwwRUFGeUIsQ0FBYixDQUgrSDs7QUFRN0k7QUFDQUMsZUFBV0osU0FBU0ksU0FUeUg7O0FBVzdJO0FBQ0FDLFFBQUksd0JBWnlJO0FBYTdJQyxnQkFBWSwwQkFiaUk7QUFjN0lDLGdCQUFZLHdCQWRpSTtBQWU3SUMsa0JBQWMsbUJBZitIO0FBZ0I3SUMsb0JBQWdCLElBaEI2SDtBQWlCN0lDLG1CQUFlLEtBakI4SDtBQWtCN0lDLFlBQVEsS0FsQnFJO0FBbUI3SUMsZUFBVyxnQkFBWUMsZ0JBbkJzSDtBQW9CN0lDLGNBQVUseUJBcEJtSTtBQXFCN0lDLG9CQUFnQix3QkFyQjZIOztBQXVCN0k7QUFDQUMsbUJBQWUsYUF4QjhIOztBQTBCN0k7QUFDQUMsOEJBQTBCLElBM0JtSDtBQTRCN0lDLG1CQUFlLElBNUI4SDs7QUE4QjdJQyx1QkFBbUIsU0FBU0EsaUJBQVQsQ0FBMkJDLFdBQTNCLEVBQXdDO0FBQ3pELFVBQU1DLElBQUksS0FBS0MsaUJBQUwsQ0FBdUJGLFlBQVlHLFdBQVosRUFBdkIsQ0FBVjtBQUNBLCtDQUF1Q0YsQ0FBdkM7QUFDRDtBQWpDNEksR0FBL0gsQ0FBaEI7O0FBb0NBLGlCQUFLRyxTQUFMLENBQWUsb0NBQWYsRUFBcUR2QixPQUFyRDtvQkFDZUEsTyIsImZpbGUiOiJMaXN0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IExpc3QgZnJvbSAnYXJnb3MvTGlzdCc7XHJcbmltcG9ydCBfUmlnaHREcmF3ZXJMaXN0TWl4aW4gZnJvbSAnY3JtL1ZpZXdzL19SaWdodERyYXdlckxpc3RNaXhpbic7XHJcbmltcG9ydCBfTWV0cmljTGlzdE1peGluIGZyb20gJ2NybS9WaWV3cy9fTWV0cmljTGlzdE1peGluJztcclxuaW1wb3J0IF9Hcm91cExpc3RNaXhpbiBmcm9tICdjcm0vVmlld3MvX0dyb3VwTGlzdE1peGluJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2VycEJpbGxUb0FjY291bnRzTGlzdCcpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLkVSUEJpbGxUb0FjY291bnRzLkxpc3QnLCBbTGlzdCwgX1JpZ2h0RHJhd2VyTGlzdE1peGluLCBfTWV0cmljTGlzdE1peGluLCBfR3JvdXBMaXN0TWl4aW5dLCB7XHJcbiAgLy8gVGVtcGxhdGVzXHJcbiAgLy8gVE9ETzogTmVlZCB0ZW1wbGF0ZSBmcm9tIFBNXHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxwIGNsYXNzPVwibGlzdHZpZXctaGVhZGluZ1wiPnslOiAkLkVycEJpbGxUby5OYW1lICV9PC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0IGFkZHJlc3NcIj57JTogJC5FcnBCaWxsVG8uQWRkcmVzcy5GdWxsQWRkcmVzcyAlfTwvcD4nLFxyXG4gIF0pLFxyXG5cclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdlcnBiaWxsdG9hY2NvdW50c19saXN0JyxcclxuICBkZXRhaWxWaWV3OiAnZXJwYmlsbHRvYWNjb3VudHNfZGV0YWlsJyxcclxuICBpbnNlcnRWaWV3OiAnZXJwYmlsbHRvYWNjb3VudHNfZWRpdCcsXHJcbiAgcmVzb3VyY2VLaW5kOiAnZXJwQmlsbFRvQWNjb3VudHMnLFxyXG4gIGFsbG93U2VsZWN0aW9uOiB0cnVlLFxyXG4gIGVuYWJsZUFjdGlvbnM6IGZhbHNlLFxyXG4gIGV4cG9zZTogZmFsc2UsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5FUlBCSUxMVE9BQ0NPVU5ULFxyXG4gIHNlY3VyaXR5OiAnRW50aXRpZXMvRXJwQmlsbFRvL1ZpZXcnLFxyXG4gIGluc2VydFNlY3VyaXR5OiAnRW50aXRpZXMvRXJwQmlsbFRvL0FkZCcsXHJcblxyXG4gIC8vIENhcmQgbGF5b3V0XHJcbiAgaXRlbUljb25DbGFzczogJ3NwcmVhZHNoZWV0JyxcclxuXHJcbiAgLy8gR3JvdXBzXHJcbiAgZW5hYmxlRHluYW1pY0dyb3VwTGF5b3V0OiB0cnVlLFxyXG4gIGdyb3Vwc0VuYWJsZWQ6IHRydWUsXHJcblxyXG4gIGZvcm1hdFNlYXJjaFF1ZXJ5OiBmdW5jdGlvbiBmb3JtYXRTZWFyY2hRdWVyeShzZWFyY2hRdWVyeSkge1xyXG4gICAgY29uc3QgcSA9IHRoaXMuZXNjYXBlU2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkudG9VcHBlckNhc2UoKSk7XHJcbiAgICByZXR1cm4gYHVwcGVyKEVycEJpbGxUby5OYW1lKSBsaWtlIFwiJSR7cX0lXCJgO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLlZpZXdzLkVSUEJpbGxUb0FjY291bnRzLkxpc3QnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19