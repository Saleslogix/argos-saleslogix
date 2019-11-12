define('crm/Integrations/BOE/Views/ERPShipmentItems/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'crm/Format', 'crm/Views/_RightDrawerListMixin', 'crm/Views/_MetricListMixin', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _List, _Format, _RightDrawerListMixin2, _MetricListMixin2, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('erpShipmentItemsList');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPShipmentItems.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default], {
    formatter: _Format2.default,

    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading"><label class="group-label">{%: $$.productNameText %}</label> {%: $.ProductName %}</p>', '{% if ($.SalesOrder) { %}', '<p class="micro-text"><label class="group-label">{%: $$.salesOrderText %}</label> {%: $.SalesOrder.SalesOrderNumber %}</p>', '{% } %}', '<p class="micro-text"><label class="group-label">{%: $$.lineNumberText %}</label> {%: $.ErpLineNumber %}</p>', '{% if ($.ErpShipment) { %}', '<p class="micro-text"><label class="group-label">{%: $$.shipmentIDText %}</label> {%: $.ErpShipment.ErpExtId %}</p>', ' {% } %}', '<p class="micro-text"><label class="group-label">{%: $$.shippedQuantityText %}</label> {%: $.ErpShippedQuantity %} {%: $.ErpShippedUOM %}</p>']),

    // Localization
    titleText: resource.titleText,
    productNameText: resource.productNameText,
    lineNumberText: resource.lineNumberText,
    shipmentIDText: resource.shipmentIDText,
    shippedQuantityText: resource.shippedQuantityText,
    salesOrderText: resource.salesOrderText,

    // View Properties
    id: 'erpshipment_items_list',
    detailView: 'erpshipment_items_detail',
    modelName: _Names2.default.ERPSHIPMENTITEM,
    resourceKind: 'erpShipmentItems',
    allowSelection: true,
    enableActions: true,

    // Card layout
    itemIconClass: 'warehouse',

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(ErpLineNumber) like "' + q + '%" or upper(SalesOrder.SalesOrderNumber) like "' + q + '%" or upper(ProductName) like "' + q + '%"';
    }
  });

  _lang2.default.setObject('icboe.Views.ERPShipmentItems.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0VSUFNoaXBtZW50SXRlbXMvTGlzdC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJmb3JtYXR0ZXIiLCJpdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsInRpdGxlVGV4dCIsInByb2R1Y3ROYW1lVGV4dCIsImxpbmVOdW1iZXJUZXh0Iiwic2hpcG1lbnRJRFRleHQiLCJzaGlwcGVkUXVhbnRpdHlUZXh0Iiwic2FsZXNPcmRlclRleHQiLCJpZCIsImRldGFpbFZpZXciLCJtb2RlbE5hbWUiLCJFUlBTSElQTUVOVElURU0iLCJyZXNvdXJjZUtpbmQiLCJhbGxvd1NlbGVjdGlvbiIsImVuYWJsZUFjdGlvbnMiLCJpdGVtSWNvbkNsYXNzIiwiZm9ybWF0U2VhcmNoUXVlcnkiLCJzZWFyY2hRdWVyeSIsInEiLCJlc2NhcGVTZWFyY2hRdWVyeSIsInRvVXBwZXJDYXNlIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLE1BQU1BLFdBQVcsb0JBQVksc0JBQVosQ0FBakI7O0FBRUEsTUFBTUMsVUFBVSx1QkFBUSxrREFBUixFQUE0RCwyRUFBNUQsRUFBNkc7QUFDM0hDLCtCQUQySDs7QUFHM0g7QUFDQUMsa0JBQWMsSUFBSUMsUUFBSixDQUFhLENBQ3pCLG1IQUR5QixFQUV6QiwyQkFGeUIsRUFHekIsNEhBSHlCLEVBSXpCLFNBSnlCLEVBS3pCLDhHQUx5QixFQU16Qiw0QkFOeUIsRUFPekIscUhBUHlCLEVBUXpCLFVBUnlCLEVBU3pCLCtJQVR5QixDQUFiLENBSjZHOztBQWdCM0g7QUFDQUMsZUFBV0wsU0FBU0ssU0FqQnVHO0FBa0IzSEMscUJBQWlCTixTQUFTTSxlQWxCaUc7QUFtQjNIQyxvQkFBZ0JQLFNBQVNPLGNBbkJrRztBQW9CM0hDLG9CQUFnQlIsU0FBU1EsY0FwQmtHO0FBcUIzSEMseUJBQXFCVCxTQUFTUyxtQkFyQjZGO0FBc0IzSEMsb0JBQWdCVixTQUFTVSxjQXRCa0c7O0FBd0IzSDtBQUNBQyxRQUFJLHdCQXpCdUg7QUEwQjNIQyxnQkFBWSwwQkExQitHO0FBMkIzSEMsZUFBVyxnQkFBWUMsZUEzQm9HO0FBNEIzSEMsa0JBQWMsa0JBNUI2RztBQTZCM0hDLG9CQUFnQixJQTdCMkc7QUE4QjNIQyxtQkFBZSxJQTlCNEc7O0FBZ0MzSDtBQUNBQyxtQkFBZSxXQWpDNEc7O0FBbUMzSEMsdUJBQW1CLFNBQVNBLGlCQUFULENBQTJCQyxXQUEzQixFQUF3QztBQUN6RCxVQUFNQyxJQUFJLEtBQUtDLGlCQUFMLENBQXVCRixZQUFZRyxXQUFaLEVBQXZCLENBQVY7QUFDQSw2Q0FBcUNGLENBQXJDLHVEQUF3RkEsQ0FBeEYsdUNBQTJIQSxDQUEzSDtBQUNEO0FBdEMwSCxHQUE3RyxDQUFoQjs7QUF5Q0EsaUJBQUtHLFNBQUwsQ0FBZSxtQ0FBZixFQUFvRHZCLE9BQXBEO29CQUNlQSxPIiwiZmlsZSI6Ikxpc3QuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICdjcm0vRm9ybWF0JztcclxuaW1wb3J0IF9SaWdodERyYXdlckxpc3RNaXhpbiBmcm9tICdjcm0vVmlld3MvX1JpZ2h0RHJhd2VyTGlzdE1peGluJztcclxuaW1wb3J0IF9NZXRyaWNMaXN0TWl4aW4gZnJvbSAnY3JtL1ZpZXdzL19NZXRyaWNMaXN0TWl4aW4nO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXJwU2hpcG1lbnRJdGVtc0xpc3QnKTtcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5WaWV3cy5FUlBTaGlwbWVudEl0ZW1zLkxpc3QnLCBbTGlzdCwgX1JpZ2h0RHJhd2VyTGlzdE1peGluLCBfTWV0cmljTGlzdE1peGluXSwge1xyXG4gIGZvcm1hdHRlcjogZm9ybWF0LFxyXG5cclxuICAvLyBUZW1wbGF0ZXNcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPHAgY2xhc3M9XCJsaXN0dmlldy1oZWFkaW5nXCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQucHJvZHVjdE5hbWVUZXh0ICV9PC9sYWJlbD4geyU6ICQuUHJvZHVjdE5hbWUgJX08L3A+JyxcclxuICAgICd7JSBpZiAoJC5TYWxlc09yZGVyKSB7ICV9JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj48bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5zYWxlc09yZGVyVGV4dCAlfTwvbGFiZWw+IHslOiAkLlNhbGVzT3JkZXIuU2FsZXNPcmRlck51bWJlciAlfTwvcD4nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLmxpbmVOdW1iZXJUZXh0ICV9PC9sYWJlbD4geyU6ICQuRXJwTGluZU51bWJlciAlfTwvcD4nLFxyXG4gICAgJ3slIGlmICgkLkVycFNoaXBtZW50KSB7ICV9JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj48bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5zaGlwbWVudElEVGV4dCAlfTwvbGFiZWw+IHslOiAkLkVycFNoaXBtZW50LkVycEV4dElkICV9PC9wPicsXHJcbiAgICAnIHslIH0gJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLnNoaXBwZWRRdWFudGl0eVRleHQgJX08L2xhYmVsPiB7JTogJC5FcnBTaGlwcGVkUXVhbnRpdHkgJX0geyU6ICQuRXJwU2hpcHBlZFVPTSAlfTwvcD4nLFxyXG4gIF0pLFxyXG5cclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBwcm9kdWN0TmFtZVRleHQ6IHJlc291cmNlLnByb2R1Y3ROYW1lVGV4dCxcclxuICBsaW5lTnVtYmVyVGV4dDogcmVzb3VyY2UubGluZU51bWJlclRleHQsXHJcbiAgc2hpcG1lbnRJRFRleHQ6IHJlc291cmNlLnNoaXBtZW50SURUZXh0LFxyXG4gIHNoaXBwZWRRdWFudGl0eVRleHQ6IHJlc291cmNlLnNoaXBwZWRRdWFudGl0eVRleHQsXHJcbiAgc2FsZXNPcmRlclRleHQ6IHJlc291cmNlLnNhbGVzT3JkZXJUZXh0LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ2VycHNoaXBtZW50X2l0ZW1zX2xpc3QnLFxyXG4gIGRldGFpbFZpZXc6ICdlcnBzaGlwbWVudF9pdGVtc19kZXRhaWwnLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuRVJQU0hJUE1FTlRJVEVNLFxyXG4gIHJlc291cmNlS2luZDogJ2VycFNoaXBtZW50SXRlbXMnLFxyXG4gIGFsbG93U2VsZWN0aW9uOiB0cnVlLFxyXG4gIGVuYWJsZUFjdGlvbnM6IHRydWUsXHJcblxyXG4gIC8vIENhcmQgbGF5b3V0XHJcbiAgaXRlbUljb25DbGFzczogJ3dhcmVob3VzZScsXHJcblxyXG4gIGZvcm1hdFNlYXJjaFF1ZXJ5OiBmdW5jdGlvbiBmb3JtYXRTZWFyY2hRdWVyeShzZWFyY2hRdWVyeSkge1xyXG4gICAgY29uc3QgcSA9IHRoaXMuZXNjYXBlU2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkudG9VcHBlckNhc2UoKSk7XHJcbiAgICByZXR1cm4gYHVwcGVyKEVycExpbmVOdW1iZXIpIGxpa2UgXCIke3F9JVwiIG9yIHVwcGVyKFNhbGVzT3JkZXIuU2FsZXNPcmRlck51bWJlcikgbGlrZSBcIiR7cX0lXCIgb3IgdXBwZXIoUHJvZHVjdE5hbWUpIGxpa2UgXCIke3F9JVwiYDtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5WaWV3cy5FUlBTaGlwbWVudEl0ZW1zLkxpc3QnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19