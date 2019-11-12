define('crm/Views/OpportunityProduct/List', ['module', 'exports', 'dojo/_base/declare', 'argos/List', 'argos/I18n'], function (module, exports, _declare, _List, _I18n) {
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

  var resource = (0, _I18n2.default)('opportunityProductList');

  /**
   * @class crm.Views.OpportunityProduct.List
   *
   * @extends argos.List
   *
   * @requires crm.Format
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

  var __class = (0, _declare2.default)('crm.Views.OpportunityProduct.List', [_List2.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="micro-text">', '{% if ($.Product) { %} {%: $.Product.Family %} | {% } %}', '{%: $.Program %} | {%: crm.Format.currency($.Price) %}', '</p>', '<p class="micro-text">', '{%: $.Quantity %} x {%: crm.Format.currency($.CalculatedPrice) %} ', '({%: crm.Format.percent($.Discount) %}) = ', '<strong>', '{% if (App.hasMultiCurrency()) { %}', '{%: crm.Format.multiCurrency($.ExtendedPrice, App.getBaseExchangeRate().code) %}', '{% } else { %}', '{%: crm.Format.currency($.ExtendedPrice) %}', '{% } %}', '</strong>', '</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'opportunityproduct_list',
    security: 'Entities/Opportunity/View',
    detailView: 'opportunityproduct_detail',
    insertView: 'opportunityproduct_edit',
    queryOrderBy: 'Sort',
    querySelect: ['Product/Name', 'Product/Family', 'Program', 'Price', 'Discount', 'CalculatedPrice', 'Quantity', 'ExtendedPrice'],
    resourceKind: 'opportunityproducts',
    allowSelection: true,
    enableActions: true,

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return '(upper(Product.Name) like "' + q + '%" or upper(Product.Family) like "' + q + '%")';
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9PcHBvcnR1bml0eVByb2R1Y3QvTGlzdC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJpdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsInRpdGxlVGV4dCIsImlkIiwic2VjdXJpdHkiLCJkZXRhaWxWaWV3IiwiaW5zZXJ0VmlldyIsInF1ZXJ5T3JkZXJCeSIsInF1ZXJ5U2VsZWN0IiwicmVzb3VyY2VLaW5kIiwiYWxsb3dTZWxlY3Rpb24iLCJlbmFibGVBY3Rpb25zIiwiZm9ybWF0U2VhcmNoUXVlcnkiLCJzZWFyY2hRdWVyeSIsInEiLCJlc2NhcGVTZWFyY2hRdWVyeSIsInRvVXBwZXJDYXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQSxNQUFNQSxXQUFXLG9CQUFZLHdCQUFaLENBQWpCOztBQUVBOzs7Ozs7O0FBckJBOzs7Ozs7Ozs7Ozs7Ozs7QUE0QkEsTUFBTUMsVUFBVSx1QkFBUSxtQ0FBUixFQUE2QyxnQkFBN0MsRUFBcUQ7QUFDbkU7QUFDQUMsa0JBQWMsSUFBSUMsUUFBSixDQUFhLENBQ3pCLHdCQUR5QixFQUV6QiwwREFGeUIsRUFHekIsd0RBSHlCLEVBSXpCLE1BSnlCLEVBS3pCLHdCQUx5QixFQU16QixvRUFOeUIsRUFPekIsNENBUHlCLEVBUXpCLFVBUnlCLEVBU3pCLHFDQVR5QixFQVV6QixrRkFWeUIsRUFXekIsZ0JBWHlCLEVBWXpCLDZDQVp5QixFQWF6QixTQWJ5QixFQWN6QixXQWR5QixFQWV6QixNQWZ5QixDQUFiLENBRnFEOztBQW9CbkU7QUFDQUMsZUFBV0osU0FBU0ksU0FyQitDOztBQXVCbkU7QUFDQUMsUUFBSSx5QkF4QitEO0FBeUJuRUMsY0FBVSwyQkF6QnlEO0FBMEJuRUMsZ0JBQVksMkJBMUJ1RDtBQTJCbkVDLGdCQUFZLHlCQTNCdUQ7QUE0Qm5FQyxrQkFBYyxNQTVCcUQ7QUE2Qm5FQyxpQkFBYSxDQUNYLGNBRFcsRUFFWCxnQkFGVyxFQUdYLFNBSFcsRUFJWCxPQUpXLEVBS1gsVUFMVyxFQU1YLGlCQU5XLEVBT1gsVUFQVyxFQVFYLGVBUlcsQ0E3QnNEO0FBdUNuRUMsa0JBQWMscUJBdkNxRDtBQXdDbkVDLG9CQUFnQixJQXhDbUQ7QUF5Q25FQyxtQkFBZSxJQXpDb0Q7O0FBMkNuRUMsdUJBQW1CLFNBQVNBLGlCQUFULENBQTJCQyxXQUEzQixFQUF3QztBQUN6RCxVQUFNQyxJQUFJLEtBQUtDLGlCQUFMLENBQXVCRixZQUFZRyxXQUFaLEVBQXZCLENBQVY7QUFDQSw2Q0FBcUNGLENBQXJDLDBDQUEyRUEsQ0FBM0U7QUFDRDtBQTlDa0UsR0FBckQsQ0FBaEI7O29CQWlEZWYsTyIsImZpbGUiOiJMaXN0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IExpc3QgZnJvbSAnYXJnb3MvTGlzdCc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ29wcG9ydHVuaXR5UHJvZHVjdExpc3QnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLk9wcG9ydHVuaXR5UHJvZHVjdC5MaXN0XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkxpc3RcclxuICpcclxuICogQHJlcXVpcmVzIGNybS5Gb3JtYXRcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuT3Bwb3J0dW5pdHlQcm9kdWN0Lkxpc3QnLCBbTGlzdF0sIHtcclxuICAvLyBUZW1wbGF0ZXNcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+JyxcclxuICAgICd7JSBpZiAoJC5Qcm9kdWN0KSB7ICV9IHslOiAkLlByb2R1Y3QuRmFtaWx5ICV9IHwgeyUgfSAlfScsXHJcbiAgICAneyU6ICQuUHJvZ3JhbSAlfSB8IHslOiBjcm0uRm9ybWF0LmN1cnJlbmN5KCQuUHJpY2UpICV9JyxcclxuICAgICc8L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj4nLFxyXG4gICAgJ3slOiAkLlF1YW50aXR5ICV9IHggeyU6IGNybS5Gb3JtYXQuY3VycmVuY3koJC5DYWxjdWxhdGVkUHJpY2UpICV9ICcsXHJcbiAgICAnKHslOiBjcm0uRm9ybWF0LnBlcmNlbnQoJC5EaXNjb3VudCkgJX0pID0gJyxcclxuICAgICc8c3Ryb25nPicsXHJcbiAgICAneyUgaWYgKEFwcC5oYXNNdWx0aUN1cnJlbmN5KCkpIHsgJX0nLFxyXG4gICAgJ3slOiBjcm0uRm9ybWF0Lm11bHRpQ3VycmVuY3koJC5FeHRlbmRlZFByaWNlLCBBcHAuZ2V0QmFzZUV4Y2hhbmdlUmF0ZSgpLmNvZGUpICV9JyxcclxuICAgICd7JSB9IGVsc2UgeyAlfScsXHJcbiAgICAneyU6IGNybS5Gb3JtYXQuY3VycmVuY3koJC5FeHRlbmRlZFByaWNlKSAlfScsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgICAnPC9zdHJvbmc+JyxcclxuICAgICc8L3A+JyxcclxuICBdKSxcclxuXHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnb3Bwb3J0dW5pdHlwcm9kdWN0X2xpc3QnLFxyXG4gIHNlY3VyaXR5OiAnRW50aXRpZXMvT3Bwb3J0dW5pdHkvVmlldycsXHJcbiAgZGV0YWlsVmlldzogJ29wcG9ydHVuaXR5cHJvZHVjdF9kZXRhaWwnLFxyXG4gIGluc2VydFZpZXc6ICdvcHBvcnR1bml0eXByb2R1Y3RfZWRpdCcsXHJcbiAgcXVlcnlPcmRlckJ5OiAnU29ydCcsXHJcbiAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICdQcm9kdWN0L05hbWUnLFxyXG4gICAgJ1Byb2R1Y3QvRmFtaWx5JyxcclxuICAgICdQcm9ncmFtJyxcclxuICAgICdQcmljZScsXHJcbiAgICAnRGlzY291bnQnLFxyXG4gICAgJ0NhbGN1bGF0ZWRQcmljZScsXHJcbiAgICAnUXVhbnRpdHknLFxyXG4gICAgJ0V4dGVuZGVkUHJpY2UnLFxyXG4gIF0sXHJcbiAgcmVzb3VyY2VLaW5kOiAnb3Bwb3J0dW5pdHlwcm9kdWN0cycsXHJcbiAgYWxsb3dTZWxlY3Rpb246IHRydWUsXHJcbiAgZW5hYmxlQWN0aW9uczogdHJ1ZSxcclxuXHJcbiAgZm9ybWF0U2VhcmNoUXVlcnk6IGZ1bmN0aW9uIGZvcm1hdFNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5KSB7XHJcbiAgICBjb25zdCBxID0gdGhpcy5lc2NhcGVTZWFyY2hRdWVyeShzZWFyY2hRdWVyeS50b1VwcGVyQ2FzZSgpKTtcclxuICAgIHJldHVybiBgKHVwcGVyKFByb2R1Y3QuTmFtZSkgbGlrZSBcIiR7cX0lXCIgb3IgdXBwZXIoUHJvZHVjdC5GYW1pbHkpIGxpa2UgXCIke3F9JVwiKWA7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=