define('crm/Integrations/BOE/Views/ERPInvoicePersons/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'crm/Views/_RightDrawerListMixin', 'crm/Views/_MetricListMixin', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _List, _RightDrawerListMixin2, _MetricListMixin2, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _List2 = _interopRequireDefault(_List);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _Names2 = _interopRequireDefault(_Names);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('erpInvoicePersonsList'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPInvoicePersons.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.ErpPerson.Name %}</p>', '<p class="micro-text address">{%: $.ErpPerson.Address.FullAddress %}</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'invoiceperson_list',
    modelName: _Names2.default.ERPINVOICEPERSON,
    resourceKind: 'erpInvoicePersons',
    allowSelection: true,
    enableActions: true,
    security: 'Entities/ErpPerson/View',
    insertSecurity: 'Entities/ErpPerson/Add',

    // Card layout
    itemIconClass: 'user',

    // Groups
    enableDynamicGroupLayout: true,
    groupsEnabled: true,

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(ErpPerson.Name) like "%' + q + '%"';
    }
  });

  _lang2.default.setObject('icboe.Views.ERPInvoicePersons.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0VSUEludm9pY2VQZXJzb25zL0xpc3QuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiaXRlbVRlbXBsYXRlIiwiU2ltcGxhdGUiLCJ0aXRsZVRleHQiLCJpZCIsIm1vZGVsTmFtZSIsIkVSUElOVk9JQ0VQRVJTT04iLCJyZXNvdXJjZUtpbmQiLCJhbGxvd1NlbGVjdGlvbiIsImVuYWJsZUFjdGlvbnMiLCJzZWN1cml0eSIsImluc2VydFNlY3VyaXR5IiwiaXRlbUljb25DbGFzcyIsImVuYWJsZUR5bmFtaWNHcm91cExheW91dCIsImdyb3Vwc0VuYWJsZWQiLCJmb3JtYXRTZWFyY2hRdWVyeSIsInNlYXJjaFF1ZXJ5IiwicSIsImVzY2FwZVNlYXJjaFF1ZXJ5IiwidG9VcHBlckNhc2UiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsTUFBTUEsV0FBVyxvQkFBWSx1QkFBWixDQUFqQixDLENBdkJBOzs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsTUFBTUMsVUFBVSx1QkFBUSxtREFBUixFQUE2RCwyRUFBN0QsRUFBOEc7QUFDNUg7QUFDQUMsa0JBQWMsSUFBSUMsUUFBSixDQUFhLENBQ3pCLHlEQUR5QixFQUV6QiwwRUFGeUIsQ0FBYixDQUY4Rzs7QUFPNUg7QUFDQUMsZUFBV0osU0FBU0ksU0FSd0c7O0FBVTVIO0FBQ0FDLFFBQUksb0JBWHdIO0FBWTVIQyxlQUFXLGdCQUFZQyxnQkFacUc7QUFhNUhDLGtCQUFjLG1CQWI4RztBQWM1SEMsb0JBQWdCLElBZDRHO0FBZTVIQyxtQkFBZSxJQWY2RztBQWdCNUhDLGNBQVUseUJBaEJrSDtBQWlCNUhDLG9CQUFnQix3QkFqQjRHOztBQW1CNUg7QUFDQUMsbUJBQWUsTUFwQjZHOztBQXNCNUg7QUFDQUMsOEJBQTBCLElBdkJrRztBQXdCNUhDLG1CQUFlLElBeEI2Rzs7QUEwQjVIQyx1QkFBbUIsU0FBU0EsaUJBQVQsQ0FBMkJDLFdBQTNCLEVBQXdDO0FBQ3pELFVBQU1DLElBQUksS0FBS0MsaUJBQUwsQ0FBdUJGLFlBQVlHLFdBQVosRUFBdkIsQ0FBVjtBQUNBLCtDQUF1Q0YsQ0FBdkM7QUFDRDtBQTdCMkgsR0FBOUcsQ0FBaEI7O0FBZ0NBLGlCQUFLRyxTQUFMLENBQWUsb0NBQWYsRUFBcURwQixPQUFyRDtvQkFDZUEsTyIsImZpbGUiOiJMaXN0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IExpc3QgZnJvbSAnYXJnb3MvTGlzdCc7XHJcbmltcG9ydCBfUmlnaHREcmF3ZXJMaXN0TWl4aW4gZnJvbSAnY3JtL1ZpZXdzL19SaWdodERyYXdlckxpc3RNaXhpbic7XHJcbmltcG9ydCBfTWV0cmljTGlzdE1peGluIGZyb20gJ2NybS9WaWV3cy9fTWV0cmljTGlzdE1peGluJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2VycEludm9pY2VQZXJzb25zTGlzdCcpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLkVSUEludm9pY2VQZXJzb25zLkxpc3QnLCBbTGlzdCwgX1JpZ2h0RHJhd2VyTGlzdE1peGluLCBfTWV0cmljTGlzdE1peGluXSwge1xyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cImxpc3R2aWV3LWhlYWRpbmdcIj57JTogJC5FcnBQZXJzb24uTmFtZSAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dCBhZGRyZXNzXCI+eyU6ICQuRXJwUGVyc29uLkFkZHJlc3MuRnVsbEFkZHJlc3MgJX08L3A+JyxcclxuICBdKSxcclxuXHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnaW52b2ljZXBlcnNvbl9saXN0JyxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLkVSUElOVk9JQ0VQRVJTT04sXHJcbiAgcmVzb3VyY2VLaW5kOiAnZXJwSW52b2ljZVBlcnNvbnMnLFxyXG4gIGFsbG93U2VsZWN0aW9uOiB0cnVlLFxyXG4gIGVuYWJsZUFjdGlvbnM6IHRydWUsXHJcbiAgc2VjdXJpdHk6ICdFbnRpdGllcy9FcnBQZXJzb24vVmlldycsXHJcbiAgaW5zZXJ0U2VjdXJpdHk6ICdFbnRpdGllcy9FcnBQZXJzb24vQWRkJyxcclxuXHJcbiAgLy8gQ2FyZCBsYXlvdXRcclxuICBpdGVtSWNvbkNsYXNzOiAndXNlcicsXHJcblxyXG4gIC8vIEdyb3Vwc1xyXG4gIGVuYWJsZUR5bmFtaWNHcm91cExheW91dDogdHJ1ZSxcclxuICBncm91cHNFbmFibGVkOiB0cnVlLFxyXG5cclxuICBmb3JtYXRTZWFyY2hRdWVyeTogZnVuY3Rpb24gZm9ybWF0U2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkpIHtcclxuICAgIGNvbnN0IHEgPSB0aGlzLmVzY2FwZVNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5LnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgcmV0dXJuIGB1cHBlcihFcnBQZXJzb24uTmFtZSkgbGlrZSBcIiUke3F9JVwiYDtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5WaWV3cy5FUlBJbnZvaWNlUGVyc29ucy5MaXN0JywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==