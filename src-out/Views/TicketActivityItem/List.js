define('crm/Views/TicketActivityItem/List', ['module', 'exports', 'dojo/_base/declare', 'argos/List', 'argos/I18n'], function (module, exports, _declare, _List, _I18n) {
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

  var resource = (0, _I18n2.default)('ticketActivityItemList');

  /**
   * @class crm.Views.TicketActivityItem.List
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

  var __class = (0, _declare2.default)('crm.Views.TicketActivityItem.List', [_List2.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="micro-text">{%: $.Product.ActualId %} - {%: crm.Format.currency($.ItemAmount) %}</p>', '<p class="micro-text">{%: $.ItemDescription %}</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'ticketactivityitem_list',
    detailView: 'ticketactivityitem_detail',
    expose: false,
    querySelect: ['Product/Name', 'Product/ActualId', 'ItemDescription', 'ItemAmount'],
    resourceKind: 'ticketActivityItems',

    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        tbar: []
      });
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return '(upper(Product.Name) like "' + q + '%" or upper(Product.Family) like "' + q + '%")';
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9UaWNrZXRBY3Rpdml0eUl0ZW0vTGlzdC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJpdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsInRpdGxlVGV4dCIsImlkIiwiZGV0YWlsVmlldyIsImV4cG9zZSIsInF1ZXJ5U2VsZWN0IiwicmVzb3VyY2VLaW5kIiwiY3JlYXRlVG9vbExheW91dCIsInRvb2xzIiwidGJhciIsImZvcm1hdFNlYXJjaFF1ZXJ5Iiwic2VhcmNoUXVlcnkiLCJxIiwiZXNjYXBlU2VhcmNoUXVlcnkiLCJ0b1VwcGVyQ2FzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkEsTUFBTUEsV0FBVyxvQkFBWSx3QkFBWixDQUFqQjs7QUFFQTs7Ozs7OztBQXJCQTs7Ozs7Ozs7Ozs7Ozs7O0FBNEJBLE1BQU1DLFVBQVUsdUJBQVEsbUNBQVIsRUFBNkMsZ0JBQTdDLEVBQXFEO0FBQ25FO0FBQ0FDLGtCQUFjLElBQUlDLFFBQUosQ0FBYSxDQUN6QixnR0FEeUIsRUFFekIsb0RBRnlCLENBQWIsQ0FGcUQ7O0FBT25FO0FBQ0FDLGVBQVdKLFNBQVNJLFNBUitDOztBQVVuRTtBQUNBQyxRQUFJLHlCQVgrRDtBQVluRUMsZ0JBQVksMkJBWnVEO0FBYW5FQyxZQUFRLEtBYjJEO0FBY25FQyxpQkFBYSxDQUNYLGNBRFcsRUFFWCxrQkFGVyxFQUdYLGlCQUhXLEVBSVgsWUFKVyxDQWRzRDtBQW9CbkVDLGtCQUFjLHFCQXBCcUQ7O0FBc0JuRUMsc0JBQWtCLFNBQVNBLGdCQUFULEdBQTRCO0FBQzVDLGFBQU8sS0FBS0MsS0FBTCxLQUFlLEtBQUtBLEtBQUwsR0FBYTtBQUNqQ0MsY0FBTTtBQUQyQixPQUE1QixDQUFQO0FBR0QsS0ExQmtFO0FBMkJuRUMsdUJBQW1CLFNBQVNBLGlCQUFULENBQTJCQyxXQUEzQixFQUF3QztBQUN6RCxVQUFNQyxJQUFJLEtBQUtDLGlCQUFMLENBQXVCRixZQUFZRyxXQUFaLEVBQXZCLENBQVY7QUFDQSw2Q0FBcUNGLENBQXJDLDBDQUEyRUEsQ0FBM0U7QUFDRDtBQTlCa0UsR0FBckQsQ0FBaEI7O29CQWlDZWQsTyIsImZpbGUiOiJMaXN0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IExpc3QgZnJvbSAnYXJnb3MvTGlzdCc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3RpY2tldEFjdGl2aXR5SXRlbUxpc3QnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLlRpY2tldEFjdGl2aXR5SXRlbS5MaXN0XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkxpc3RcclxuICpcclxuICogQHJlcXVpcmVzIGNybS5Gb3JtYXRcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuVGlja2V0QWN0aXZpdHlJdGVtLkxpc3QnLCBbTGlzdF0sIHtcclxuICAvLyBUZW1wbGF0ZXNcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+eyU6ICQuUHJvZHVjdC5BY3R1YWxJZCAlfSAtIHslOiBjcm0uRm9ybWF0LmN1cnJlbmN5KCQuSXRlbUFtb3VudCkgJX08L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj57JTogJC5JdGVtRGVzY3JpcHRpb24gJX08L3A+JyxcclxuICBdKSxcclxuXHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAndGlja2V0YWN0aXZpdHlpdGVtX2xpc3QnLFxyXG4gIGRldGFpbFZpZXc6ICd0aWNrZXRhY3Rpdml0eWl0ZW1fZGV0YWlsJyxcclxuICBleHBvc2U6IGZhbHNlLFxyXG4gIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAnUHJvZHVjdC9OYW1lJyxcclxuICAgICdQcm9kdWN0L0FjdHVhbElkJyxcclxuICAgICdJdGVtRGVzY3JpcHRpb24nLFxyXG4gICAgJ0l0ZW1BbW91bnQnLFxyXG4gIF0sXHJcbiAgcmVzb3VyY2VLaW5kOiAndGlja2V0QWN0aXZpdHlJdGVtcycsXHJcblxyXG4gIGNyZWF0ZVRvb2xMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZVRvb2xMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50b29scyB8fCAodGhpcy50b29scyA9IHtcclxuICAgICAgdGJhcjogW10sXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGZvcm1hdFNlYXJjaFF1ZXJ5OiBmdW5jdGlvbiBmb3JtYXRTZWFyY2hRdWVyeShzZWFyY2hRdWVyeSkge1xyXG4gICAgY29uc3QgcSA9IHRoaXMuZXNjYXBlU2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkudG9VcHBlckNhc2UoKSk7XHJcbiAgICByZXR1cm4gYCh1cHBlcihQcm9kdWN0Lk5hbWUpIGxpa2UgXCIke3F9JVwiIG9yIHVwcGVyKFByb2R1Y3QuRmFtaWx5KSBsaWtlIFwiJHtxfSVcIilgO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19