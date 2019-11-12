define('crm/Views/Product/List', ['module', 'exports', 'dojo/_base/declare', 'argos/List', 'argos/I18n'], function (module, exports, _declare, _List, _I18n) {
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

  var resource = (0, _I18n2.default)('productList');

  /**
   * @class crm.Views.Product.List
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

  var __class = (0, _declare2.default)('crm.Views.Product.List', [_List2.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.Name %} | {%: $.Description %}</p>', '<p class="micro-text">', '{%: $.Family %}', '</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'product_list',
    security: 'Entities/Product/View',
    queryOrderBy: 'Name',
    querySelect: ['Description', 'Name', 'Family', 'Price', 'Program', 'FixedCost'],
    resourceKind: 'products',

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return '(upper(Name) like "' + q + '%" or upper(Family) like "' + q + '%")';
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9Qcm9kdWN0L0xpc3QuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiaXRlbVRlbXBsYXRlIiwiU2ltcGxhdGUiLCJ0aXRsZVRleHQiLCJpZCIsInNlY3VyaXR5IiwicXVlcnlPcmRlckJ5IiwicXVlcnlTZWxlY3QiLCJyZXNvdXJjZUtpbmQiLCJmb3JtYXRTZWFyY2hRdWVyeSIsInNlYXJjaFF1ZXJ5IiwicSIsImVzY2FwZVNlYXJjaFF1ZXJ5IiwidG9VcHBlckNhc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBLE1BQU1BLFdBQVcsb0JBQVksYUFBWixDQUFqQjs7QUFFQTs7Ozs7OztBQXJCQTs7Ozs7Ozs7Ozs7Ozs7O0FBNEJBLE1BQU1DLFVBQVUsdUJBQVEsd0JBQVIsRUFBa0MsZ0JBQWxDLEVBQTBDO0FBQ3hEO0FBQ0FDLGtCQUFjLElBQUlDLFFBQUosQ0FBYSxDQUN6QixzRUFEeUIsRUFFekIsd0JBRnlCLEVBR3pCLGlCQUh5QixFQUl6QixNQUp5QixDQUFiLENBRjBDOztBQVN4RDtBQUNBQyxlQUFXSixTQUFTSSxTQVZvQzs7QUFZeEQ7QUFDQUMsUUFBSSxjQWJvRDtBQWN4REMsY0FBVSx1QkFkOEM7QUFleERDLGtCQUFjLE1BZjBDO0FBZ0J4REMsaUJBQWEsQ0FDWCxhQURXLEVBRVgsTUFGVyxFQUdYLFFBSFcsRUFJWCxPQUpXLEVBS1gsU0FMVyxFQU1YLFdBTlcsQ0FoQjJDO0FBd0J4REMsa0JBQWMsVUF4QjBDOztBQTBCeERDLHVCQUFtQixTQUFTQSxpQkFBVCxDQUEyQkMsV0FBM0IsRUFBd0M7QUFDekQsVUFBTUMsSUFBSSxLQUFLQyxpQkFBTCxDQUF1QkYsWUFBWUcsV0FBWixFQUF2QixDQUFWO0FBQ0EscUNBQTZCRixDQUE3QixrQ0FBMkRBLENBQTNEO0FBQ0Q7QUE3QnVELEdBQTFDLENBQWhCOztvQkFnQ2VYLE8iLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBMaXN0IGZyb20gJ2FyZ29zL0xpc3QnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdwcm9kdWN0TGlzdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuUHJvZHVjdC5MaXN0XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkxpc3RcclxuICpcclxuICogQHJlcXVpcmVzIGNybS5Gb3JtYXRcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuUHJvZHVjdC5MaXN0JywgW0xpc3RdLCB7XHJcbiAgLy8gVGVtcGxhdGVzXHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxwIGNsYXNzPVwibGlzdHZpZXctaGVhZGluZ1wiPnslOiAkLk5hbWUgJX0gfCB7JTogJC5EZXNjcmlwdGlvbiAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPicsXHJcbiAgICAneyU6ICQuRmFtaWx5ICV9JyxcclxuICAgICc8L3A+JyxcclxuICBdKSxcclxuXHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAncHJvZHVjdF9saXN0JyxcclxuICBzZWN1cml0eTogJ0VudGl0aWVzL1Byb2R1Y3QvVmlldycsXHJcbiAgcXVlcnlPcmRlckJ5OiAnTmFtZScsXHJcbiAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICdEZXNjcmlwdGlvbicsXHJcbiAgICAnTmFtZScsXHJcbiAgICAnRmFtaWx5JyxcclxuICAgICdQcmljZScsXHJcbiAgICAnUHJvZ3JhbScsXHJcbiAgICAnRml4ZWRDb3N0JyxcclxuICBdLFxyXG4gIHJlc291cmNlS2luZDogJ3Byb2R1Y3RzJyxcclxuXHJcbiAgZm9ybWF0U2VhcmNoUXVlcnk6IGZ1bmN0aW9uIGZvcm1hdFNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5KSB7XHJcbiAgICBjb25zdCBxID0gdGhpcy5lc2NhcGVTZWFyY2hRdWVyeShzZWFyY2hRdWVyeS50b1VwcGVyQ2FzZSgpKTtcclxuICAgIHJldHVybiBgKHVwcGVyKE5hbWUpIGxpa2UgXCIke3F9JVwiIG9yIHVwcGVyKEZhbWlseSkgbGlrZSBcIiR7cX0lXCIpYDtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==