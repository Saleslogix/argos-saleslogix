define('crm/Integrations/BOE/Views/ERPReceivableItems/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'crm/Format', 'crm/Views/_RightDrawerListMixin', 'crm/Views/_MetricListMixin', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _List, _Format, _RightDrawerListMixin2, _MetricListMixin2, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _List2 = _interopRequireDefault(_List);

  var _Format2 = _interopRequireDefault(_Format);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

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

  var resource = (0, _I18n2.default)('erpReceivableItemsList');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPReceivableItems.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default], {
    formatter: _Format2.default,
    itemTemplate: new Simplate(['<p class="listview-heading"><label class="group-label">{%: $$.lineNumberText %}</label> {%: $.ErpLineNumber %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.receivablesIdText %}</label> {%: $.ErpReceivable.ErpExtId %}</p>', '{% if ($.ErpInvoice && $.ErpInvoice.ErpExtId) { %}', '<p class="micro-text"><label class="group-label">{%: $$.invoiceIDText %}</label> {%: $.ErpInvoice.ErpExtId %}</p>', '{% } %}', '<p class="micro-text"><label class="group-label">{%: $$.productNameText %}</label> {%: $.ProductName %}</p>', '{% if ($.ErpLineTotalAmount) { %}', '<p class="micro-text"><label class="group-label">{%: $$.lineTotalText %}</label> ', '{% if (App.hasMultiCurrency() && $.ErpReceivable.CurrencyCode) { %}', '{%: $$.formatter.multiCurrency($.ErpLineTotalAmount, $.ErpReceivable.CurrencyCode) %}', '{% } else { %}', '{%: $$.formatter.currency($.ErpLineTotalAmount) %} ', '{% } %}</p>', '{% } %}']),

    // Localization
    titleText: resource.titleText,
    lineNumberText: resource.lineNumberText,
    receivablesIdText: resource.receivablesIdText,
    productNameText: resource.productNameText,
    lineTotalText: resource.lineTotalText,
    invoiceIDText: resource.invoiceIDText,

    // Card layout
    itemIconClass: 'confirm',

    // View Properties
    id: 'erpreceivable_items_list',
    modelName: _Names2.default.ERPRECEIVABLEITEM,
    resourceKind: 'erpReceivableItems',
    detailView: 'erpreceivableitems_detail',
    expose: false,
    allowSelection: true,
    enableActions: true,
    security: 'Entities/Receivable/View',
    insertSecurity: 'Entities/Receivable/Add',

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(ErpReceivable.ErpExtId) like "%' + q + '%" or upper(ErpInvoice.ErpExtId) like "%' + q + '%"';
    }
  });

  _lang2.default.setObject('icboe.Views.ERPReceivableItems.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0VSUFJlY2VpdmFibGVJdGVtcy9MaXN0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsImZvcm1hdHRlciIsIml0ZW1UZW1wbGF0ZSIsIlNpbXBsYXRlIiwidGl0bGVUZXh0IiwibGluZU51bWJlclRleHQiLCJyZWNlaXZhYmxlc0lkVGV4dCIsInByb2R1Y3ROYW1lVGV4dCIsImxpbmVUb3RhbFRleHQiLCJpbnZvaWNlSURUZXh0IiwiaXRlbUljb25DbGFzcyIsImlkIiwibW9kZWxOYW1lIiwiRVJQUkVDRUlWQUJMRUlURU0iLCJyZXNvdXJjZUtpbmQiLCJkZXRhaWxWaWV3IiwiZXhwb3NlIiwiYWxsb3dTZWxlY3Rpb24iLCJlbmFibGVBY3Rpb25zIiwic2VjdXJpdHkiLCJpbnNlcnRTZWN1cml0eSIsImZvcm1hdFNlYXJjaFF1ZXJ5Iiwic2VhcmNoUXVlcnkiLCJxIiwiZXNjYXBlU2VhcmNoUXVlcnkiLCJ0b1VwcGVyQ2FzZSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxNQUFNQSxXQUFXLG9CQUFZLHdCQUFaLENBQWpCOztBQUVBLE1BQU1DLFVBQVUsdUJBQVEsb0RBQVIsRUFBOEQsMkVBQTlELEVBQStHO0FBQzdIQywrQkFENkg7QUFFN0hDLGtCQUFjLElBQUlDLFFBQUosQ0FBYSxDQUN6QixvSEFEeUIsRUFFekIsMEhBRnlCLEVBR3pCLG9EQUh5QixFQUl6QixtSEFKeUIsRUFLekIsU0FMeUIsRUFNekIsNkdBTnlCLEVBT3pCLG1DQVB5QixFQVF6QixtRkFSeUIsRUFTekIscUVBVHlCLEVBVXpCLHVGQVZ5QixFQVd6QixnQkFYeUIsRUFZekIscURBWnlCLEVBYXpCLGFBYnlCLEVBY3pCLFNBZHlCLENBQWIsQ0FGK0c7O0FBbUI3SDtBQUNBQyxlQUFXTCxTQUFTSyxTQXBCeUc7QUFxQjdIQyxvQkFBZ0JOLFNBQVNNLGNBckJvRztBQXNCN0hDLHVCQUFtQlAsU0FBU08saUJBdEJpRztBQXVCN0hDLHFCQUFpQlIsU0FBU1EsZUF2Qm1HO0FBd0I3SEMsbUJBQWVULFNBQVNTLGFBeEJxRztBQXlCN0hDLG1CQUFlVixTQUFTVSxhQXpCcUc7O0FBMkI3SDtBQUNBQyxtQkFBZSxTQTVCOEc7O0FBOEI3SDtBQUNBQyxRQUFJLDBCQS9CeUg7QUFnQzdIQyxlQUFXLGdCQUFZQyxpQkFoQ3NHO0FBaUM3SEMsa0JBQWMsb0JBakMrRztBQWtDN0hDLGdCQUFZLDJCQWxDaUg7QUFtQzdIQyxZQUFRLEtBbkNxSDtBQW9DN0hDLG9CQUFnQixJQXBDNkc7QUFxQzdIQyxtQkFBZSxJQXJDOEc7QUFzQzdIQyxjQUFVLDBCQXRDbUg7QUF1QzdIQyxvQkFBZ0IseUJBdkM2Rzs7QUF5QzdIQyx1QkFBbUIsU0FBU0EsaUJBQVQsQ0FBMkJDLFdBQTNCLEVBQXdDO0FBQ3pELFVBQU1DLElBQUksS0FBS0MsaUJBQUwsQ0FBdUJGLFlBQVlHLFdBQVosRUFBdkIsQ0FBVjtBQUNBLHVEQUErQ0YsQ0FBL0MsZ0RBQTJGQSxDQUEzRjtBQUNEO0FBNUM0SCxHQUEvRyxDQUFoQjs7QUErQ0EsaUJBQUtHLFNBQUwsQ0FBZSxxQ0FBZixFQUFzRDFCLE9BQXREO29CQUNlQSxPIiwiZmlsZSI6Ikxpc3QuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICdjcm0vRm9ybWF0JztcclxuaW1wb3J0IF9SaWdodERyYXdlckxpc3RNaXhpbiBmcm9tICdjcm0vVmlld3MvX1JpZ2h0RHJhd2VyTGlzdE1peGluJztcclxuaW1wb3J0IF9NZXRyaWNMaXN0TWl4aW4gZnJvbSAnY3JtL1ZpZXdzL19NZXRyaWNMaXN0TWl4aW4nO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXJwUmVjZWl2YWJsZUl0ZW1zTGlzdCcpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLkVSUFJlY2VpdmFibGVJdGVtcy5MaXN0JywgW0xpc3QsIF9SaWdodERyYXdlckxpc3RNaXhpbiwgX01ldHJpY0xpc3RNaXhpbl0sIHtcclxuICBmb3JtYXR0ZXI6IGZvcm1hdCxcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPHAgY2xhc3M9XCJsaXN0dmlldy1oZWFkaW5nXCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQubGluZU51bWJlclRleHQgJX08L2xhYmVsPiB7JTogJC5FcnBMaW5lTnVtYmVyICV9PC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQucmVjZWl2YWJsZXNJZFRleHQgJX08L2xhYmVsPiB7JTogJC5FcnBSZWNlaXZhYmxlLkVycEV4dElkICV9PC9wPicsXHJcbiAgICAneyUgaWYgKCQuRXJwSW52b2ljZSAmJiAkLkVycEludm9pY2UuRXJwRXh0SWQpIHsgJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLmludm9pY2VJRFRleHQgJX08L2xhYmVsPiB7JTogJC5FcnBJbnZvaWNlLkVycEV4dElkICV9PC9wPicsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQucHJvZHVjdE5hbWVUZXh0ICV9PC9sYWJlbD4geyU6ICQuUHJvZHVjdE5hbWUgJX08L3A+JyxcclxuICAgICd7JSBpZiAoJC5FcnBMaW5lVG90YWxBbW91bnQpIHsgJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLmxpbmVUb3RhbFRleHQgJX08L2xhYmVsPiAnLFxyXG4gICAgJ3slIGlmIChBcHAuaGFzTXVsdGlDdXJyZW5jeSgpICYmICQuRXJwUmVjZWl2YWJsZS5DdXJyZW5jeUNvZGUpIHsgJX0nLFxyXG4gICAgJ3slOiAkJC5mb3JtYXR0ZXIubXVsdGlDdXJyZW5jeSgkLkVycExpbmVUb3RhbEFtb3VudCwgJC5FcnBSZWNlaXZhYmxlLkN1cnJlbmN5Q29kZSkgJX0nLFxyXG4gICAgJ3slIH0gZWxzZSB7ICV9JyxcclxuICAgICd7JTogJCQuZm9ybWF0dGVyLmN1cnJlbmN5KCQuRXJwTGluZVRvdGFsQW1vdW50KSAlfSAnLFxyXG4gICAgJ3slIH0gJX08L3A+JyxcclxuICAgICd7JSB9ICV9JyxcclxuICBdKSxcclxuXHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgbGluZU51bWJlclRleHQ6IHJlc291cmNlLmxpbmVOdW1iZXJUZXh0LFxyXG4gIHJlY2VpdmFibGVzSWRUZXh0OiByZXNvdXJjZS5yZWNlaXZhYmxlc0lkVGV4dCxcclxuICBwcm9kdWN0TmFtZVRleHQ6IHJlc291cmNlLnByb2R1Y3ROYW1lVGV4dCxcclxuICBsaW5lVG90YWxUZXh0OiByZXNvdXJjZS5saW5lVG90YWxUZXh0LFxyXG4gIGludm9pY2VJRFRleHQ6IHJlc291cmNlLmludm9pY2VJRFRleHQsXHJcblxyXG4gIC8vIENhcmQgbGF5b3V0XHJcbiAgaXRlbUljb25DbGFzczogJ2NvbmZpcm0nLFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ2VycHJlY2VpdmFibGVfaXRlbXNfbGlzdCcsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5FUlBSRUNFSVZBQkxFSVRFTSxcclxuICByZXNvdXJjZUtpbmQ6ICdlcnBSZWNlaXZhYmxlSXRlbXMnLFxyXG4gIGRldGFpbFZpZXc6ICdlcnByZWNlaXZhYmxlaXRlbXNfZGV0YWlsJyxcclxuICBleHBvc2U6IGZhbHNlLFxyXG4gIGFsbG93U2VsZWN0aW9uOiB0cnVlLFxyXG4gIGVuYWJsZUFjdGlvbnM6IHRydWUsXHJcbiAgc2VjdXJpdHk6ICdFbnRpdGllcy9SZWNlaXZhYmxlL1ZpZXcnLFxyXG4gIGluc2VydFNlY3VyaXR5OiAnRW50aXRpZXMvUmVjZWl2YWJsZS9BZGQnLFxyXG5cclxuICBmb3JtYXRTZWFyY2hRdWVyeTogZnVuY3Rpb24gZm9ybWF0U2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkpIHtcclxuICAgIGNvbnN0IHEgPSB0aGlzLmVzY2FwZVNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5LnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgcmV0dXJuIGB1cHBlcihFcnBSZWNlaXZhYmxlLkVycEV4dElkKSBsaWtlIFwiJSR7cX0lXCIgb3IgdXBwZXIoRXJwSW52b2ljZS5FcnBFeHRJZCkgbGlrZSBcIiUke3F9JVwiYDtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5WaWV3cy5FUlBSZWNlaXZhYmxlSXRlbXMuTGlzdCcsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=