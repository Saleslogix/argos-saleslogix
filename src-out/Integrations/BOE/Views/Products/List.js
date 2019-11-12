define('crm/Integrations/BOE/Views/Products/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'crm/Format', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _List, _Format, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _List2 = _interopRequireDefault(_List);

  var _Format2 = _interopRequireDefault(_Format);

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

  var resource = (0, _I18n2.default)('productsList');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.Products.List', [_List2.default], {
    formatter: _Format2.default,
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.Name %}</p>', '{% if ($.Description) { %}', '<p class="micro-text">{%: $.Description %}</p>', '{% } %}', '{% if ($.Family) { %}', '<p class="micro-text"><label class="group-label">{%: $$.familyText %}</label> {%: $.Family %}</p>', '{% } %}', '{% if ($.Status) { %}', '<p class="micro-text"><label class="group-label">{%: $$.statusText %}</label> {%: $.Status %}</p>', '{% } %}', '{% if ($.Price) { %}', '<p class="micro-text"><label class="group-label">{%: $$.priceText %} </label>', '{% if (App.hasMultiCurrency() && $.CurrencyCode) { %}', '{%: $$.formatter.multiCurrency($.Price, $.CurrencyCode) %}', '{% } else { %}', '{%: $$.formatter.currency($.Price) %} ', '{% } %}</p>', '{% } %}']),

    // Localization
    titleText: resource.titleText,
    familyText: resource.familyText,
    statusText: resource.statusText,
    priceText: resource.priceText,

    // View Properties
    id: 'products_list',
    detailView: '',
    modelName: _Names2.default.PRODUCT,
    resourceKind: 'products',
    enableActions: false,
    expose: false,
    security: 'Entities/Product/View',
    insertSecurity: 'Entities/Product/Add',

    // Card layout
    itemIconClass: '',

    // Metrics
    entityName: 'Product',

    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {});
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(Name) like "' + q + '%" or upper(Family) like "' + q + '%" or ActualId like "' + q + '%"';
    }
  });

  _lang2.default.setObject('icboe.Views.Products.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL1Byb2R1Y3RzL0xpc3QuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiZm9ybWF0dGVyIiwiaXRlbVRlbXBsYXRlIiwiU2ltcGxhdGUiLCJ0aXRsZVRleHQiLCJmYW1pbHlUZXh0Iiwic3RhdHVzVGV4dCIsInByaWNlVGV4dCIsImlkIiwiZGV0YWlsVmlldyIsIm1vZGVsTmFtZSIsIlBST0RVQ1QiLCJyZXNvdXJjZUtpbmQiLCJlbmFibGVBY3Rpb25zIiwiZXhwb3NlIiwic2VjdXJpdHkiLCJpbnNlcnRTZWN1cml0eSIsIml0ZW1JY29uQ2xhc3MiLCJlbnRpdHlOYW1lIiwiY3JlYXRlVG9vbExheW91dCIsInRvb2xzIiwiZm9ybWF0U2VhcmNoUXVlcnkiLCJzZWFyY2hRdWVyeSIsInEiLCJlc2NhcGVTZWFyY2hRdWVyeSIsInRvVXBwZXJDYXNlIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsTUFBTUEsV0FBVyxvQkFBWSxjQUFaLENBQWpCOztBQUVBLE1BQU1DLFVBQVUsdUJBQVEsMENBQVIsRUFBb0QsZ0JBQXBELEVBQTREO0FBQzFFQywrQkFEMEU7QUFFMUU7QUFDQUMsa0JBQWMsSUFBSUMsUUFBSixDQUFhLENBQ3pCLCtDQUR5QixFQUV6Qiw0QkFGeUIsRUFHekIsZ0RBSHlCLEVBSXpCLFNBSnlCLEVBS3pCLHVCQUx5QixFQU16QixtR0FOeUIsRUFPekIsU0FQeUIsRUFRekIsdUJBUnlCLEVBU3pCLG1HQVR5QixFQVV6QixTQVZ5QixFQVd6QixzQkFYeUIsRUFZekIsK0VBWnlCLEVBYXpCLHVEQWJ5QixFQWN6Qiw0REFkeUIsRUFlekIsZ0JBZnlCLEVBZ0J6Qix3Q0FoQnlCLEVBaUJ6QixhQWpCeUIsRUFrQnpCLFNBbEJ5QixDQUFiLENBSDREOztBQXdCMUU7QUFDQUMsZUFBV0wsU0FBU0ssU0F6QnNEO0FBMEIxRUMsZ0JBQVlOLFNBQVNNLFVBMUJxRDtBQTJCMUVDLGdCQUFZUCxTQUFTTyxVQTNCcUQ7QUE0QjFFQyxlQUFXUixTQUFTUSxTQTVCc0Q7O0FBOEIxRTtBQUNBQyxRQUFJLGVBL0JzRTtBQWdDMUVDLGdCQUFZLEVBaEM4RDtBQWlDMUVDLGVBQVcsZ0JBQVlDLE9BakNtRDtBQWtDMUVDLGtCQUFjLFVBbEM0RDtBQW1DMUVDLG1CQUFlLEtBbkMyRDtBQW9DMUVDLFlBQVEsS0FwQ2tFO0FBcUMxRUMsY0FBVSx1QkFyQ2dFO0FBc0MxRUMsb0JBQWdCLHNCQXRDMEQ7O0FBd0MxRTtBQUNBQyxtQkFBZSxFQXpDMkQ7O0FBMkMxRTtBQUNBQyxnQkFBWSxTQTVDOEQ7O0FBOEMxRUMsc0JBQWtCLFNBQVNBLGdCQUFULEdBQTRCO0FBQzVDLGFBQU8sS0FBS0MsS0FBTCxLQUFlLEtBQUtBLEtBQUwsR0FBYSxFQUE1QixDQUFQO0FBRUQsS0FqRHlFO0FBa0QxRUMsdUJBQW1CLFNBQVNBLGlCQUFULENBQTJCQyxXQUEzQixFQUF3QztBQUN6RCxVQUFNQyxJQUFJLEtBQUtDLGlCQUFMLENBQXVCRixZQUFZRyxXQUFaLEVBQXZCLENBQVY7QUFDQSxvQ0FBNEJGLENBQTVCLGtDQUEwREEsQ0FBMUQsNkJBQW1GQSxDQUFuRjtBQUNEO0FBckR5RSxHQUE1RCxDQUFoQjs7QUF3REEsaUJBQUtHLFNBQUwsQ0FBZSwyQkFBZixFQUE0QzFCLE9BQTVDO29CQUNlQSxPIiwiZmlsZSI6Ikxpc3QuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICdjcm0vRm9ybWF0JztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3Byb2R1Y3RzTGlzdCcpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLlByb2R1Y3RzLkxpc3QnLCBbTGlzdF0sIHtcclxuICBmb3JtYXR0ZXI6IGZvcm1hdCxcclxuICAvLyBUZW1wbGF0ZXNcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPHAgY2xhc3M9XCJsaXN0dmlldy1oZWFkaW5nXCI+eyU6ICQuTmFtZSAlfTwvcD4nLFxyXG4gICAgJ3slIGlmICgkLkRlc2NyaXB0aW9uKSB7ICV9JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj57JTogJC5EZXNjcmlwdGlvbiAlfTwvcD4nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gICAgJ3slIGlmICgkLkZhbWlseSkgeyAlfScsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQuZmFtaWx5VGV4dCAlfTwvbGFiZWw+IHslOiAkLkZhbWlseSAlfTwvcD4nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gICAgJ3slIGlmICgkLlN0YXR1cykgeyAlfScsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQuc3RhdHVzVGV4dCAlfTwvbGFiZWw+IHslOiAkLlN0YXR1cyAlfTwvcD4nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gICAgJ3slIGlmICgkLlByaWNlKSB7ICV9JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj48bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5wcmljZVRleHQgJX0gPC9sYWJlbD4nLFxyXG4gICAgJ3slIGlmIChBcHAuaGFzTXVsdGlDdXJyZW5jeSgpICYmICQuQ3VycmVuY3lDb2RlKSB7ICV9JyxcclxuICAgICd7JTogJCQuZm9ybWF0dGVyLm11bHRpQ3VycmVuY3koJC5QcmljZSwgJC5DdXJyZW5jeUNvZGUpICV9JyxcclxuICAgICd7JSB9IGVsc2UgeyAlfScsXHJcbiAgICAneyU6ICQkLmZvcm1hdHRlci5jdXJyZW5jeSgkLlByaWNlKSAlfSAnLFxyXG4gICAgJ3slIH0gJX08L3A+JyxcclxuICAgICd7JSB9ICV9JyxcclxuICBdKSxcclxuXHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgZmFtaWx5VGV4dDogcmVzb3VyY2UuZmFtaWx5VGV4dCxcclxuICBzdGF0dXNUZXh0OiByZXNvdXJjZS5zdGF0dXNUZXh0LFxyXG4gIHByaWNlVGV4dDogcmVzb3VyY2UucHJpY2VUZXh0LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ3Byb2R1Y3RzX2xpc3QnLFxyXG4gIGRldGFpbFZpZXc6ICcnLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuUFJPRFVDVCxcclxuICByZXNvdXJjZUtpbmQ6ICdwcm9kdWN0cycsXHJcbiAgZW5hYmxlQWN0aW9uczogZmFsc2UsXHJcbiAgZXhwb3NlOiBmYWxzZSxcclxuICBzZWN1cml0eTogJ0VudGl0aWVzL1Byb2R1Y3QvVmlldycsXHJcbiAgaW5zZXJ0U2VjdXJpdHk6ICdFbnRpdGllcy9Qcm9kdWN0L0FkZCcsXHJcblxyXG4gIC8vIENhcmQgbGF5b3V0XHJcbiAgaXRlbUljb25DbGFzczogJycsXHJcblxyXG4gIC8vIE1ldHJpY3NcclxuICBlbnRpdHlOYW1lOiAnUHJvZHVjdCcsXHJcblxyXG4gIGNyZWF0ZVRvb2xMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZVRvb2xMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50b29scyB8fCAodGhpcy50b29scyA9IHtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZm9ybWF0U2VhcmNoUXVlcnk6IGZ1bmN0aW9uIGZvcm1hdFNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5KSB7XHJcbiAgICBjb25zdCBxID0gdGhpcy5lc2NhcGVTZWFyY2hRdWVyeShzZWFyY2hRdWVyeS50b1VwcGVyQ2FzZSgpKTtcclxuICAgIHJldHVybiBgdXBwZXIoTmFtZSkgbGlrZSBcIiR7cX0lXCIgb3IgdXBwZXIoRmFtaWx5KSBsaWtlIFwiJHtxfSVcIiBvciBBY3R1YWxJZCBsaWtlIFwiJHtxfSVcImA7XHJcbiAgfSxcclxufSk7XHJcblxyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuVmlld3MuUHJvZHVjdHMuTGlzdCcsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=