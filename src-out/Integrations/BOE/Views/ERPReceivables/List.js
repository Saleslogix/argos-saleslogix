define('crm/Integrations/BOE/Views/ERPReceivables/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'crm/Format', 'crm/Views/_RightDrawerListMixin', 'crm/Views/_MetricListMixin', 'crm/Views/_GroupListMixin', '../../Models/Names', 'argos/I18n', '../../Utility'], function (module, exports, _declare, _lang, _List, _Format, _RightDrawerListMixin2, _MetricListMixin2, _GroupListMixin2, _Names, _I18n, _Utility) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _List2 = _interopRequireDefault(_List);

  var _Format2 = _interopRequireDefault(_Format);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _GroupListMixin3 = _interopRequireDefault(_GroupListMixin2);

  var _Names2 = _interopRequireDefault(_Names);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Utility2 = _interopRequireDefault(_Utility);

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

  var resource = (0, _I18n2.default)('erpReceivablesList');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPReceivables.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default, _GroupListMixin3.default], {
    formatter: _Format2.default,
    util: _Utility2.default,
    itemTemplate: new Simplate(['<p class="micro-text"><label class="group-label">{%: $$.receivableIDText %}</label> {%: $.ErpExtId %}</p>', '{% if ($.ErpInvoice && $.ErpInvoice.InvoiceNumber) { %}', '<p class="micro-text"><label class="group-label">{%: $$.invoiceIDText %}</label> {%: $.ErpInvoice.InvoiceNumber %}</p>', '{% } %}', '{% if ($.Account && $.Account.AccountName) { %}', '<p class="micro-text"><label class="group-label">{%: $$.accountNameText %}</label> {%: $.Account.AccountName %}</p>', '{% } %}', '<p class="micro-text"><label class="group-label">{%: $$.receivedBaseAmountText %}</label> ', '{%: $$.util.formatMultiCurrency($.ReceivedBaseAmount, $.BaseCurrencyCode) %}', '</p>', '<p class="micro-text"><label class="group-label">{%: $$.receivedAmountText %}</label> ', '{%: $$.util.formatMultiCurrency($.ReceivedAmount, $.CurrencyCode) %}', '</p>', '<p class="micro-text"><label class="group-label">{%: $$.receivableBaseAmountText %}</label> ', '{%: $$.util.formatMultiCurrency($.ReceivableBaseAmount, $.BaseCurrencyCode) %}', '</p>', '<p class="micro-text"><label class="group-label">{%: $$.receivableAmountText %}</label> ', '{%: $$.util.formatMultiCurrency($.ReceivableAmount, $.CurrencyCode) %}', '</p>', '<p class="micro-text"><label class="group-label">{%: $$.erpStatusText %}</label> {%: $.ErpStatus %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.erpStatusDateText %}</label> {%: $$.formatter.date($.ErpStatusDate) %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.documentDateText %}</label> {%: $$.formatter.date($.ErpDocumentDate) %}</p>']),

    // Localization
    titleText: resource.titleText,
    receivableIDText: resource.receivableIDText,
    invoiceIDText: resource.invoiceIDText,
    erpStatusText: resource.erpStatusText,
    erpStatusDateText: resource.erpStatusDateText,
    receivedAmountText: resource.receivedAmountText,
    receivedBaseAmountText: resource.receivedBaseAmountText,
    receivableAmountText: resource.receivableAmountText,
    receivableBaseAmountText: resource.receivableBaseAmountText,
    accountNameText: resource.accountNameText,
    documentDateText: resource.documentDateText,

    // View Properties
    id: 'erpreceivables_list',
    detailView: 'erpreceivables_detail',
    modelName: _Names2.default.ERPRECEIVABLE,
    resourceKind: 'erpReceivables',
    allowSelection: true,
    enableActions: true,
    expose: true,
    security: 'Entities/ErpReceivable/View',
    insertSecurity: 'Entities/ErpReceivable/Add',

    // Card layout
    itemIconClass: 'confirm',

    // Groups
    enableDynamicGroupLayout: true,
    groupsEnabled: true,
    entityName: 'ERPReceivable',

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(ErpExtId) like "%' + q + '%" or upper(Account.AccountName) like "%' + q + '%" or upper(ErpInvoice.InvoiceNumber) like "%' + q + '%"';
    }
  });

  _lang2.default.setObject('icboe.Views.ERPReceivables.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0VSUFJlY2VpdmFibGVzL0xpc3QuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiZm9ybWF0dGVyIiwidXRpbCIsIml0ZW1UZW1wbGF0ZSIsIlNpbXBsYXRlIiwidGl0bGVUZXh0IiwicmVjZWl2YWJsZUlEVGV4dCIsImludm9pY2VJRFRleHQiLCJlcnBTdGF0dXNUZXh0IiwiZXJwU3RhdHVzRGF0ZVRleHQiLCJyZWNlaXZlZEFtb3VudFRleHQiLCJyZWNlaXZlZEJhc2VBbW91bnRUZXh0IiwicmVjZWl2YWJsZUFtb3VudFRleHQiLCJyZWNlaXZhYmxlQmFzZUFtb3VudFRleHQiLCJhY2NvdW50TmFtZVRleHQiLCJkb2N1bWVudERhdGVUZXh0IiwiaWQiLCJkZXRhaWxWaWV3IiwibW9kZWxOYW1lIiwiRVJQUkVDRUlWQUJMRSIsInJlc291cmNlS2luZCIsImFsbG93U2VsZWN0aW9uIiwiZW5hYmxlQWN0aW9ucyIsImV4cG9zZSIsInNlY3VyaXR5IiwiaW5zZXJ0U2VjdXJpdHkiLCJpdGVtSWNvbkNsYXNzIiwiZW5hYmxlRHluYW1pY0dyb3VwTGF5b3V0IiwiZ3JvdXBzRW5hYmxlZCIsImVudGl0eU5hbWUiLCJmb3JtYXRTZWFyY2hRdWVyeSIsInNlYXJjaFF1ZXJ5IiwicSIsImVzY2FwZVNlYXJjaFF1ZXJ5IiwidG9VcHBlckNhc2UiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLE1BQU1BLFdBQVcsb0JBQVksb0JBQVosQ0FBakI7O0FBRUEsTUFBTUMsVUFBVSx1QkFBUSxnREFBUixFQUEwRCxxR0FBMUQsRUFBNEg7QUFDMUlDLCtCQUQwSTtBQUUxSUMsMkJBRjBJO0FBRzFJQyxrQkFBYyxJQUFJQyxRQUFKLENBQWEsQ0FDekIsMkdBRHlCLEVBRXpCLHlEQUZ5QixFQUd6Qix3SEFIeUIsRUFJekIsU0FKeUIsRUFLekIsaURBTHlCLEVBTXpCLHFIQU55QixFQU96QixTQVB5QixFQVF6Qiw0RkFSeUIsRUFTekIsOEVBVHlCLEVBVXpCLE1BVnlCLEVBV3pCLHdGQVh5QixFQVl6QixzRUFaeUIsRUFhekIsTUFieUIsRUFjekIsOEZBZHlCLEVBZXpCLGdGQWZ5QixFQWdCekIsTUFoQnlCLEVBaUJ6QiwwRkFqQnlCLEVBa0J6Qix3RUFsQnlCLEVBbUJ6QixNQW5CeUIsRUFvQnpCLHlHQXBCeUIsRUFxQnpCLG9JQXJCeUIsRUFzQnpCLHFJQXRCeUIsQ0FBYixDQUg0SDs7QUE0QjFJO0FBQ0FDLGVBQVdOLFNBQVNNLFNBN0JzSDtBQThCMUlDLHNCQUFrQlAsU0FBU08sZ0JBOUIrRztBQStCMUlDLG1CQUFlUixTQUFTUSxhQS9Ca0g7QUFnQzFJQyxtQkFBZVQsU0FBU1MsYUFoQ2tIO0FBaUMxSUMsdUJBQW1CVixTQUFTVSxpQkFqQzhHO0FBa0MxSUMsd0JBQW9CWCxTQUFTVyxrQkFsQzZHO0FBbUMxSUMsNEJBQXdCWixTQUFTWSxzQkFuQ3lHO0FBb0MxSUMsMEJBQXNCYixTQUFTYSxvQkFwQzJHO0FBcUMxSUMsOEJBQTBCZCxTQUFTYyx3QkFyQ3VHO0FBc0MxSUMscUJBQWlCZixTQUFTZSxlQXRDZ0g7QUF1QzFJQyxzQkFBa0JoQixTQUFTZ0IsZ0JBdkMrRzs7QUF5QzFJO0FBQ0FDLFFBQUkscUJBMUNzSTtBQTJDMUlDLGdCQUFZLHVCQTNDOEg7QUE0QzFJQyxlQUFXLGdCQUFZQyxhQTVDbUg7QUE2QzFJQyxrQkFBYyxnQkE3QzRIO0FBOEMxSUMsb0JBQWdCLElBOUMwSDtBQStDMUlDLG1CQUFlLElBL0MySDtBQWdEMUlDLFlBQVEsSUFoRGtJO0FBaUQxSUMsY0FBVSw2QkFqRGdJO0FBa0QxSUMsb0JBQWdCLDRCQWxEMEg7O0FBb0QxSTtBQUNBQyxtQkFBZSxTQXJEMkg7O0FBdUQxSTtBQUNBQyw4QkFBMEIsSUF4RGdIO0FBeUQxSUMsbUJBQWUsSUF6RDJIO0FBMEQxSUMsZ0JBQVksZUExRDhIOztBQTREMUlDLHVCQUFtQixTQUFTQSxpQkFBVCxDQUEyQkMsV0FBM0IsRUFBd0M7QUFDekQsVUFBTUMsSUFBSSxLQUFLQyxpQkFBTCxDQUF1QkYsWUFBWUcsV0FBWixFQUF2QixDQUFWO0FBQ0EseUNBQWlDRixDQUFqQyxnREFBNkVBLENBQTdFLHFEQUE4SEEsQ0FBOUg7QUFDRDtBQS9EeUksR0FBNUgsQ0FBaEI7O0FBa0VBLGlCQUFLRyxTQUFMLENBQWUsaUNBQWYsRUFBa0RuQyxPQUFsRDtvQkFDZUEsTyIsImZpbGUiOiJMaXN0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IExpc3QgZnJvbSAnYXJnb3MvTGlzdCc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnY3JtL0Zvcm1hdCc7XHJcbmltcG9ydCBfUmlnaHREcmF3ZXJMaXN0TWl4aW4gZnJvbSAnY3JtL1ZpZXdzL19SaWdodERyYXdlckxpc3RNaXhpbic7XHJcbmltcG9ydCBfTWV0cmljTGlzdE1peGluIGZyb20gJ2NybS9WaWV3cy9fTWV0cmljTGlzdE1peGluJztcclxuaW1wb3J0IF9Hcm91cExpc3RNaXhpbiBmcm9tICdjcm0vVmlld3MvX0dyb3VwTGlzdE1peGluJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuaW1wb3J0IHV0aWxpdHkgZnJvbSAnLi4vLi4vVXRpbGl0eSc7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdlcnBSZWNlaXZhYmxlc0xpc3QnKTtcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5WaWV3cy5FUlBSZWNlaXZhYmxlcy5MaXN0JywgW0xpc3QsIF9SaWdodERyYXdlckxpc3RNaXhpbiwgX01ldHJpY0xpc3RNaXhpbiwgX0dyb3VwTGlzdE1peGluXSwge1xyXG4gIGZvcm1hdHRlcjogZm9ybWF0LFxyXG4gIHV0aWw6IHV0aWxpdHksXHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLnJlY2VpdmFibGVJRFRleHQgJX08L2xhYmVsPiB7JTogJC5FcnBFeHRJZCAlfTwvcD4nLFxyXG4gICAgJ3slIGlmICgkLkVycEludm9pY2UgJiYgJC5FcnBJbnZvaWNlLkludm9pY2VOdW1iZXIpIHsgJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLmludm9pY2VJRFRleHQgJX08L2xhYmVsPiB7JTogJC5FcnBJbnZvaWNlLkludm9pY2VOdW1iZXIgJX08L3A+JyxcclxuICAgICd7JSB9ICV9JyxcclxuICAgICd7JSBpZiAoJC5BY2NvdW50ICYmICQuQWNjb3VudC5BY2NvdW50TmFtZSkgeyAlfScsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQuYWNjb3VudE5hbWVUZXh0ICV9PC9sYWJlbD4geyU6ICQuQWNjb3VudC5BY2NvdW50TmFtZSAlfTwvcD4nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLnJlY2VpdmVkQmFzZUFtb3VudFRleHQgJX08L2xhYmVsPiAnLFxyXG4gICAgJ3slOiAkJC51dGlsLmZvcm1hdE11bHRpQ3VycmVuY3koJC5SZWNlaXZlZEJhc2VBbW91bnQsICQuQmFzZUN1cnJlbmN5Q29kZSkgJX0nLFxyXG4gICAgJzwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLnJlY2VpdmVkQW1vdW50VGV4dCAlfTwvbGFiZWw+ICcsXHJcbiAgICAneyU6ICQkLnV0aWwuZm9ybWF0TXVsdGlDdXJyZW5jeSgkLlJlY2VpdmVkQW1vdW50LCAkLkN1cnJlbmN5Q29kZSkgJX0nLFxyXG4gICAgJzwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLnJlY2VpdmFibGVCYXNlQW1vdW50VGV4dCAlfTwvbGFiZWw+ICcsXHJcbiAgICAneyU6ICQkLnV0aWwuZm9ybWF0TXVsdGlDdXJyZW5jeSgkLlJlY2VpdmFibGVCYXNlQW1vdW50LCAkLkJhc2VDdXJyZW5jeUNvZGUpICV9JyxcclxuICAgICc8L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj48bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5yZWNlaXZhYmxlQW1vdW50VGV4dCAlfTwvbGFiZWw+ICcsXHJcbiAgICAneyU6ICQkLnV0aWwuZm9ybWF0TXVsdGlDdXJyZW5jeSgkLlJlY2VpdmFibGVBbW91bnQsICQuQ3VycmVuY3lDb2RlKSAlfScsXHJcbiAgICAnPC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQuZXJwU3RhdHVzVGV4dCAlfTwvbGFiZWw+IHslOiAkLkVycFN0YXR1cyAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLmVycFN0YXR1c0RhdGVUZXh0ICV9PC9sYWJlbD4geyU6ICQkLmZvcm1hdHRlci5kYXRlKCQuRXJwU3RhdHVzRGF0ZSkgJX08L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj48bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5kb2N1bWVudERhdGVUZXh0ICV9PC9sYWJlbD4geyU6ICQkLmZvcm1hdHRlci5kYXRlKCQuRXJwRG9jdW1lbnREYXRlKSAlfTwvcD4nLFxyXG4gIF0pLFxyXG5cclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICByZWNlaXZhYmxlSURUZXh0OiByZXNvdXJjZS5yZWNlaXZhYmxlSURUZXh0LFxyXG4gIGludm9pY2VJRFRleHQ6IHJlc291cmNlLmludm9pY2VJRFRleHQsXHJcbiAgZXJwU3RhdHVzVGV4dDogcmVzb3VyY2UuZXJwU3RhdHVzVGV4dCxcclxuICBlcnBTdGF0dXNEYXRlVGV4dDogcmVzb3VyY2UuZXJwU3RhdHVzRGF0ZVRleHQsXHJcbiAgcmVjZWl2ZWRBbW91bnRUZXh0OiByZXNvdXJjZS5yZWNlaXZlZEFtb3VudFRleHQsXHJcbiAgcmVjZWl2ZWRCYXNlQW1vdW50VGV4dDogcmVzb3VyY2UucmVjZWl2ZWRCYXNlQW1vdW50VGV4dCxcclxuICByZWNlaXZhYmxlQW1vdW50VGV4dDogcmVzb3VyY2UucmVjZWl2YWJsZUFtb3VudFRleHQsXHJcbiAgcmVjZWl2YWJsZUJhc2VBbW91bnRUZXh0OiByZXNvdXJjZS5yZWNlaXZhYmxlQmFzZUFtb3VudFRleHQsXHJcbiAgYWNjb3VudE5hbWVUZXh0OiByZXNvdXJjZS5hY2NvdW50TmFtZVRleHQsXHJcbiAgZG9jdW1lbnREYXRlVGV4dDogcmVzb3VyY2UuZG9jdW1lbnREYXRlVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdlcnByZWNlaXZhYmxlc19saXN0JyxcclxuICBkZXRhaWxWaWV3OiAnZXJwcmVjZWl2YWJsZXNfZGV0YWlsJyxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLkVSUFJFQ0VJVkFCTEUsXHJcbiAgcmVzb3VyY2VLaW5kOiAnZXJwUmVjZWl2YWJsZXMnLFxyXG4gIGFsbG93U2VsZWN0aW9uOiB0cnVlLFxyXG4gIGVuYWJsZUFjdGlvbnM6IHRydWUsXHJcbiAgZXhwb3NlOiB0cnVlLFxyXG4gIHNlY3VyaXR5OiAnRW50aXRpZXMvRXJwUmVjZWl2YWJsZS9WaWV3JyxcclxuICBpbnNlcnRTZWN1cml0eTogJ0VudGl0aWVzL0VycFJlY2VpdmFibGUvQWRkJyxcclxuXHJcbiAgLy8gQ2FyZCBsYXlvdXRcclxuICBpdGVtSWNvbkNsYXNzOiAnY29uZmlybScsXHJcblxyXG4gIC8vIEdyb3Vwc1xyXG4gIGVuYWJsZUR5bmFtaWNHcm91cExheW91dDogdHJ1ZSxcclxuICBncm91cHNFbmFibGVkOiB0cnVlLFxyXG4gIGVudGl0eU5hbWU6ICdFUlBSZWNlaXZhYmxlJyxcclxuXHJcbiAgZm9ybWF0U2VhcmNoUXVlcnk6IGZ1bmN0aW9uIGZvcm1hdFNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5KSB7XHJcbiAgICBjb25zdCBxID0gdGhpcy5lc2NhcGVTZWFyY2hRdWVyeShzZWFyY2hRdWVyeS50b1VwcGVyQ2FzZSgpKTtcclxuICAgIHJldHVybiBgdXBwZXIoRXJwRXh0SWQpIGxpa2UgXCIlJHtxfSVcIiBvciB1cHBlcihBY2NvdW50LkFjY291bnROYW1lKSBsaWtlIFwiJSR7cX0lXCIgb3IgdXBwZXIoRXJwSW52b2ljZS5JbnZvaWNlTnVtYmVyKSBsaWtlIFwiJSR7cX0lXCJgO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLlZpZXdzLkVSUFJlY2VpdmFibGVzLkxpc3QnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19