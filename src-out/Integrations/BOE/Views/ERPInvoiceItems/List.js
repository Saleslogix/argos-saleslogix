define('crm/Integrations/BOE/Views/ERPInvoiceItems/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'crm/Views/_MetricListMixin', 'crm/Views/_RightDrawerListMixin', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _List, _MetricListMixin2, _RightDrawerListMixin2, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _List2 = _interopRequireDefault(_List);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _Names2 = _interopRequireDefault(_Names);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('erpInvoiceItemsList');

  /**
   * @class crm.Integrations.BOE.Views.ERPInvoiceItems.List
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPInvoiceItems.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default], /** @lends crm.Integrations.BOE.Views.ERPInvoiceItems.List# */{
    itemTemplate: new Simplate(['<p class="listview-heading"><label class="group-label">{%: $$.productNameText %}</label> {%: $.ProductName %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.invoiceIdText %}</label> {%: $.ErpInvoice.InvoiceNumber %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.descriptionText %}</label> {%: $.Description %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.lineText %}</label> {%: $.ErpLineNumber %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.quantityText %}</label> {%: $.Quantity %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.priceText %}</label> {%: $.Price %}</p>', '{% if ($.ErpLineTotalAmount) { %}', '<p class="micro-text"> <label class="group-label">{%: $$.amountText %}</label> <strong>', '{% if (App.hasMultiCurrency() && $.ErpInvoice.CurrencyCode) { %}', '{%: crm.Format.multiCurrency($.ErpLineTotalAmount, $.ErpInvoice.CurrencyCode) %}', '{% } else { %}', '{%: crm.Format.currency($.ErpLineTotalAmount) %}', '{% } %}', '</strong></p>', '{% } %}']),

    // Localization
    titleText: resource.titleText,
    lineText: resource.lineText,
    quantityText: resource.quantityText,
    priceText: resource.priceText,
    amountText: resource.amountText,
    productNameText: resource.productNameText,
    descriptionText: resource.descriptionText,
    invoiceIdText: resource.invoiceIdText,

    // View Properties
    id: 'invoice_item_list',
    detailView: 'invoice_item_detail',
    allowSelection: true,
    enableActions: true,
    modelName: _Names2.default.ERPINVOICEITEM,
    resourceKind: 'erpInvoiceItems',

    // Card layout
    itemIconClass: 'bullet-list',

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(ProductName) like "' + q + '%" or upper(ErpLineNumber) like "' + q + '%" or upper(Description) like "' + q + '%"';
    }
  });

  _lang2.default.setObject('crm.Views.ERPInvoiceItems.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0VSUEludm9pY2VJdGVtcy9MaXN0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsIml0ZW1UZW1wbGF0ZSIsIlNpbXBsYXRlIiwidGl0bGVUZXh0IiwibGluZVRleHQiLCJxdWFudGl0eVRleHQiLCJwcmljZVRleHQiLCJhbW91bnRUZXh0IiwicHJvZHVjdE5hbWVUZXh0IiwiZGVzY3JpcHRpb25UZXh0IiwiaW52b2ljZUlkVGV4dCIsImlkIiwiZGV0YWlsVmlldyIsImFsbG93U2VsZWN0aW9uIiwiZW5hYmxlQWN0aW9ucyIsIm1vZGVsTmFtZSIsIkVSUElOVk9JQ0VJVEVNIiwicmVzb3VyY2VLaW5kIiwiaXRlbUljb25DbGFzcyIsImZvcm1hdFNlYXJjaFF1ZXJ5Iiwic2VhcmNoUXVlcnkiLCJxIiwiZXNjYXBlU2VhcmNoUXVlcnkiLCJ0b1VwcGVyQ2FzZSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxNQUFNQSxXQUFXLG9CQUFZLHFCQUFaLENBQWpCOztBQUVBOzs7O0FBekJBOzs7Ozs7Ozs7Ozs7Ozs7QUE2QkEsTUFBTUMsVUFBVSx1QkFBUSxpREFBUixFQUEyRCwyRUFBM0QsRUFBNEcsOERBQThEO0FBQ3hMQyxrQkFBYyxJQUFJQyxRQUFKLENBQWEsQ0FDekIsbUhBRHlCLEVBRXpCLHdIQUZ5QixFQUd6Qiw2R0FIeUIsRUFJekIsd0dBSnlCLEVBS3pCLHVHQUx5QixFQU16QixpR0FOeUIsRUFPekIsbUNBUHlCLEVBUXpCLHlGQVJ5QixFQVN6QixrRUFUeUIsRUFVekIsa0ZBVnlCLEVBV3pCLGdCQVh5QixFQVl6QixrREFaeUIsRUFhekIsU0FieUIsRUFjekIsZUFkeUIsRUFlekIsU0FmeUIsQ0FBYixDQUQwSzs7QUFtQnhMO0FBQ0FDLGVBQVdKLFNBQVNJLFNBcEJvSztBQXFCeExDLGNBQVVMLFNBQVNLLFFBckJxSztBQXNCeExDLGtCQUFjTixTQUFTTSxZQXRCaUs7QUF1QnhMQyxlQUFXUCxTQUFTTyxTQXZCb0s7QUF3QnhMQyxnQkFBWVIsU0FBU1EsVUF4Qm1LO0FBeUJ4TEMscUJBQWlCVCxTQUFTUyxlQXpCOEo7QUEwQnhMQyxxQkFBaUJWLFNBQVNVLGVBMUI4SjtBQTJCeExDLG1CQUFlWCxTQUFTVyxhQTNCZ0s7O0FBNkJ4TDtBQUNBQyxRQUFJLG1CQTlCb0w7QUErQnhMQyxnQkFBWSxxQkEvQjRLO0FBZ0N4TEMsb0JBQWdCLElBaEN3SztBQWlDeExDLG1CQUFlLElBakN5SztBQWtDeExDLGVBQVcsZ0JBQVlDLGNBbENpSztBQW1DeExDLGtCQUFjLGlCQW5DMEs7O0FBcUN4TDtBQUNBQyxtQkFBZSxhQXRDeUs7O0FBd0N4TEMsdUJBQW1CLFNBQVNBLGlCQUFULENBQTJCQyxXQUEzQixFQUF3QztBQUN6RCxVQUFNQyxJQUFJLEtBQUtDLGlCQUFMLENBQXVCRixZQUFZRyxXQUFaLEVBQXZCLENBQVY7QUFDQSwyQ0FBbUNGLENBQW5DLHlDQUF3RUEsQ0FBeEUsdUNBQTJHQSxDQUEzRztBQUNEO0FBM0N1TCxHQUExSyxDQUFoQjs7QUE4Q0EsaUJBQUtHLFNBQUwsQ0FBZSxnQ0FBZixFQUFpRHhCLE9BQWpEO29CQUNlQSxPIiwiZmlsZSI6Ikxpc3QuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuaW1wb3J0IF9NZXRyaWNMaXN0TWl4aW4gZnJvbSAnY3JtL1ZpZXdzL19NZXRyaWNMaXN0TWl4aW4nO1xyXG5pbXBvcnQgX1JpZ2h0RHJhd2VyTGlzdE1peGluIGZyb20gJ2NybS9WaWV3cy9fUmlnaHREcmF3ZXJMaXN0TWl4aW4nO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXJwSW52b2ljZUl0ZW1zTGlzdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uSW50ZWdyYXRpb25zLkJPRS5WaWV3cy5FUlBJbnZvaWNlSXRlbXMuTGlzdFxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5MaXN0XHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuRVJQSW52b2ljZUl0ZW1zLkxpc3QnLCBbTGlzdCwgX1JpZ2h0RHJhd2VyTGlzdE1peGluLCBfTWV0cmljTGlzdE1peGluXSwgLyoqIEBsZW5kcyBjcm0uSW50ZWdyYXRpb25zLkJPRS5WaWV3cy5FUlBJbnZvaWNlSXRlbXMuTGlzdCMgKi97XHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxwIGNsYXNzPVwibGlzdHZpZXctaGVhZGluZ1wiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLnByb2R1Y3ROYW1lVGV4dCAlfTwvbGFiZWw+IHslOiAkLlByb2R1Y3ROYW1lICV9PC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQuaW52b2ljZUlkVGV4dCAlfTwvbGFiZWw+IHslOiAkLkVycEludm9pY2UuSW52b2ljZU51bWJlciAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLmRlc2NyaXB0aW9uVGV4dCAlfTwvbGFiZWw+IHslOiAkLkRlc2NyaXB0aW9uICV9PC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQubGluZVRleHQgJX08L2xhYmVsPiB7JTogJC5FcnBMaW5lTnVtYmVyICV9PC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQucXVhbnRpdHlUZXh0ICV9PC9sYWJlbD4geyU6ICQuUXVhbnRpdHkgJX08L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj48bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5wcmljZVRleHQgJX08L2xhYmVsPiB7JTogJC5QcmljZSAlfTwvcD4nLFxyXG4gICAgJ3slIGlmICgkLkVycExpbmVUb3RhbEFtb3VudCkgeyAlfScsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+IDxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLmFtb3VudFRleHQgJX08L2xhYmVsPiA8c3Ryb25nPicsXHJcbiAgICAneyUgaWYgKEFwcC5oYXNNdWx0aUN1cnJlbmN5KCkgJiYgJC5FcnBJbnZvaWNlLkN1cnJlbmN5Q29kZSkgeyAlfScsXHJcbiAgICAneyU6IGNybS5Gb3JtYXQubXVsdGlDdXJyZW5jeSgkLkVycExpbmVUb3RhbEFtb3VudCwgJC5FcnBJbnZvaWNlLkN1cnJlbmN5Q29kZSkgJX0nLFxyXG4gICAgJ3slIH0gZWxzZSB7ICV9JyxcclxuICAgICd7JTogY3JtLkZvcm1hdC5jdXJyZW5jeSgkLkVycExpbmVUb3RhbEFtb3VudCkgJX0nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gICAgJzwvc3Ryb25nPjwvcD4nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gIF0pLFxyXG5cclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBsaW5lVGV4dDogcmVzb3VyY2UubGluZVRleHQsXHJcbiAgcXVhbnRpdHlUZXh0OiByZXNvdXJjZS5xdWFudGl0eVRleHQsXHJcbiAgcHJpY2VUZXh0OiByZXNvdXJjZS5wcmljZVRleHQsXHJcbiAgYW1vdW50VGV4dDogcmVzb3VyY2UuYW1vdW50VGV4dCxcclxuICBwcm9kdWN0TmFtZVRleHQ6IHJlc291cmNlLnByb2R1Y3ROYW1lVGV4dCxcclxuICBkZXNjcmlwdGlvblRleHQ6IHJlc291cmNlLmRlc2NyaXB0aW9uVGV4dCxcclxuICBpbnZvaWNlSWRUZXh0OiByZXNvdXJjZS5pbnZvaWNlSWRUZXh0LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ2ludm9pY2VfaXRlbV9saXN0JyxcclxuICBkZXRhaWxWaWV3OiAnaW52b2ljZV9pdGVtX2RldGFpbCcsXHJcbiAgYWxsb3dTZWxlY3Rpb246IHRydWUsXHJcbiAgZW5hYmxlQWN0aW9uczogdHJ1ZSxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLkVSUElOVk9JQ0VJVEVNLFxyXG4gIHJlc291cmNlS2luZDogJ2VycEludm9pY2VJdGVtcycsXHJcblxyXG4gIC8vIENhcmQgbGF5b3V0XHJcbiAgaXRlbUljb25DbGFzczogJ2J1bGxldC1saXN0JyxcclxuXHJcbiAgZm9ybWF0U2VhcmNoUXVlcnk6IGZ1bmN0aW9uIGZvcm1hdFNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5KSB7XHJcbiAgICBjb25zdCBxID0gdGhpcy5lc2NhcGVTZWFyY2hRdWVyeShzZWFyY2hRdWVyeS50b1VwcGVyQ2FzZSgpKTtcclxuICAgIHJldHVybiBgdXBwZXIoUHJvZHVjdE5hbWUpIGxpa2UgXCIke3F9JVwiIG9yIHVwcGVyKEVycExpbmVOdW1iZXIpIGxpa2UgXCIke3F9JVwiIG9yIHVwcGVyKERlc2NyaXB0aW9uKSBsaWtlIFwiJHtxfSVcImA7XHJcbiAgfSxcclxufSk7XHJcblxyXG5sYW5nLnNldE9iamVjdCgnY3JtLlZpZXdzLkVSUEludm9pY2VJdGVtcy5MaXN0JywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==