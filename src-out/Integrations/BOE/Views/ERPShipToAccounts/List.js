define('crm/Integrations/BOE/Views/ERPShipToAccounts/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'crm/Views/_RightDrawerListMixin', 'crm/Views/_MetricListMixin', 'crm/Views/_GroupListMixin', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _List, _RightDrawerListMixin2, _MetricListMixin2, _GroupListMixin2, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('erpShipToAccountsList');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPShipToAccounts.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default, _GroupListMixin3.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.ErpShipTo.Name %}</p>', '<p class="micro-text address">{%: $.ErpShipTo.Address.FullAddress %}</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'erpshiptoaccount_list',
    detailView: 'erpshiptoaccount_detail',
    insertView: 'erpshiptoaccount_edit',
    modelName: _Names2.default.ERPSHIPTOACCOUNT,
    resourceKind: 'erpShipToAccounts',
    allowSelection: true,
    enableActions: true,
    expose: false,
    security: 'Entities/ErpShipTo/View',
    insertSecurity: 'Entities/ErpShipTo/Add',

    // Groups
    enableDynamicGroupLayout: false,
    groupsEnabled: false,

    // Card layout
    itemIconClass: 'warehouse',

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      return 'upper(ErpShipTo.Name) like "%' + this.escapeSearchQuery(searchQuery.toUpperCase()) + '%"';
    }
  });

  _lang2.default.setObject('icboe.Views.ERPShipToAccounts.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0VSUFNoaXBUb0FjY291bnRzL0xpc3QuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiaXRlbVRlbXBsYXRlIiwiU2ltcGxhdGUiLCJ0aXRsZVRleHQiLCJpZCIsImRldGFpbFZpZXciLCJpbnNlcnRWaWV3IiwibW9kZWxOYW1lIiwiRVJQU0hJUFRPQUNDT1VOVCIsInJlc291cmNlS2luZCIsImFsbG93U2VsZWN0aW9uIiwiZW5hYmxlQWN0aW9ucyIsImV4cG9zZSIsInNlY3VyaXR5IiwiaW5zZXJ0U2VjdXJpdHkiLCJlbmFibGVEeW5hbWljR3JvdXBMYXlvdXQiLCJncm91cHNFbmFibGVkIiwiaXRlbUljb25DbGFzcyIsImZvcm1hdFNlYXJjaFF1ZXJ5Iiwic2VhcmNoUXVlcnkiLCJlc2NhcGVTZWFyY2hRdWVyeSIsInRvVXBwZXJDYXNlIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLE1BQU1BLFdBQVcsb0JBQVksdUJBQVosQ0FBakI7O0FBRUEsTUFBTUMsVUFBVSx1QkFBUSxtREFBUixFQUE2RCxxR0FBN0QsRUFBK0g7QUFDN0k7QUFDQUMsa0JBQWMsSUFBSUMsUUFBSixDQUFhLENBQ3pCLHlEQUR5QixFQUV6QiwwRUFGeUIsQ0FBYixDQUYrSDs7QUFPN0k7QUFDQUMsZUFBV0osU0FBU0ksU0FSeUg7O0FBVTdJO0FBQ0FDLFFBQUksdUJBWHlJO0FBWTdJQyxnQkFBWSx5QkFaaUk7QUFhN0lDLGdCQUFZLHVCQWJpSTtBQWM3SUMsZUFBVyxnQkFBWUMsZ0JBZHNIO0FBZTdJQyxrQkFBYyxtQkFmK0g7QUFnQjdJQyxvQkFBZ0IsSUFoQjZIO0FBaUI3SUMsbUJBQWUsSUFqQjhIO0FBa0I3SUMsWUFBUSxLQWxCcUk7QUFtQjdJQyxjQUFVLHlCQW5CbUk7QUFvQjdJQyxvQkFBZ0Isd0JBcEI2SDs7QUFzQjdJO0FBQ0FDLDhCQUEwQixLQXZCbUg7QUF3QjdJQyxtQkFBZSxLQXhCOEg7O0FBMEI3STtBQUNBQyxtQkFBZSxXQTNCOEg7O0FBNkI3SUMsdUJBQW1CLFNBQVNBLGlCQUFULENBQTJCQyxXQUEzQixFQUF3QztBQUN6RCwrQ0FBdUMsS0FBS0MsaUJBQUwsQ0FBdUJELFlBQVlFLFdBQVosRUFBdkIsQ0FBdkM7QUFDRDtBQS9CNEksR0FBL0gsQ0FBaEI7O0FBa0NBLGlCQUFLQyxTQUFMLENBQWUsb0NBQWYsRUFBcUR0QixPQUFyRDtvQkFDZUEsTyIsImZpbGUiOiJMaXN0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IExpc3QgZnJvbSAnYXJnb3MvTGlzdCc7XHJcbmltcG9ydCBfUmlnaHREcmF3ZXJMaXN0TWl4aW4gZnJvbSAnY3JtL1ZpZXdzL19SaWdodERyYXdlckxpc3RNaXhpbic7XHJcbmltcG9ydCBfTWV0cmljTGlzdE1peGluIGZyb20gJ2NybS9WaWV3cy9fTWV0cmljTGlzdE1peGluJztcclxuaW1wb3J0IF9Hcm91cExpc3RNaXhpbiBmcm9tICdjcm0vVmlld3MvX0dyb3VwTGlzdE1peGluJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2VycFNoaXBUb0FjY291bnRzTGlzdCcpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLkVSUFNoaXBUb0FjY291bnRzLkxpc3QnLCBbTGlzdCwgX1JpZ2h0RHJhd2VyTGlzdE1peGluLCBfTWV0cmljTGlzdE1peGluLCBfR3JvdXBMaXN0TWl4aW5dLCB7XHJcbiAgLy8gVGVtcGxhdGVzXHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxwIGNsYXNzPVwibGlzdHZpZXctaGVhZGluZ1wiPnslOiAkLkVycFNoaXBUby5OYW1lICV9PC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0IGFkZHJlc3NcIj57JTogJC5FcnBTaGlwVG8uQWRkcmVzcy5GdWxsQWRkcmVzcyAlfTwvcD4nLFxyXG4gIF0pLFxyXG5cclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdlcnBzaGlwdG9hY2NvdW50X2xpc3QnLFxyXG4gIGRldGFpbFZpZXc6ICdlcnBzaGlwdG9hY2NvdW50X2RldGFpbCcsXHJcbiAgaW5zZXJ0VmlldzogJ2VycHNoaXB0b2FjY291bnRfZWRpdCcsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5FUlBTSElQVE9BQ0NPVU5ULFxyXG4gIHJlc291cmNlS2luZDogJ2VycFNoaXBUb0FjY291bnRzJyxcclxuICBhbGxvd1NlbGVjdGlvbjogdHJ1ZSxcclxuICBlbmFibGVBY3Rpb25zOiB0cnVlLFxyXG4gIGV4cG9zZTogZmFsc2UsXHJcbiAgc2VjdXJpdHk6ICdFbnRpdGllcy9FcnBTaGlwVG8vVmlldycsXHJcbiAgaW5zZXJ0U2VjdXJpdHk6ICdFbnRpdGllcy9FcnBTaGlwVG8vQWRkJyxcclxuXHJcbiAgLy8gR3JvdXBzXHJcbiAgZW5hYmxlRHluYW1pY0dyb3VwTGF5b3V0OiBmYWxzZSxcclxuICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuXHJcbiAgLy8gQ2FyZCBsYXlvdXRcclxuICBpdGVtSWNvbkNsYXNzOiAnd2FyZWhvdXNlJyxcclxuXHJcbiAgZm9ybWF0U2VhcmNoUXVlcnk6IGZ1bmN0aW9uIGZvcm1hdFNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5KSB7XHJcbiAgICByZXR1cm4gYHVwcGVyKEVycFNoaXBUby5OYW1lKSBsaWtlIFwiJSR7dGhpcy5lc2NhcGVTZWFyY2hRdWVyeShzZWFyY2hRdWVyeS50b1VwcGVyQ2FzZSgpKX0lXCJgO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLlZpZXdzLkVSUFNoaXBUb0FjY291bnRzLkxpc3QnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19