define('crm/Views/Address/List', ['module', 'exports', 'dojo/_base/declare', '../../Format', 'argos/List', 'argos/I18n'], function (module, exports, _declare, _Format, _List, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Format2 = _interopRequireDefault(_Format);

  var _List2 = _interopRequireDefault(_List);

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

  var resource = (0, _I18n2.default)('addressList');

  /**
   * @class crm.Views.Address.List
   *
   * @extends argos.List
   *
   * @requires argos.List
   *
   * @requires crm.Format
   *
   */
  var __class = (0, _declare2.default)('crm.Views.Address.List', [_List2.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.$descriptor %}</p>', '<p class="micro-text">{%= $$.format.address($, true) %}</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    detailView: null,
    id: 'address_list',
    security: null, // 'Entities/Address/View',
    insertSecurity: 'Entities/Address/Add',
    insertView: 'address_edit',
    resourceKind: 'addresses',
    allowSelection: true,
    enableActions: true,
    format: _Format2.default,
    isCardView: false,

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return '(upper(Description) like "' + q + '%" or upper(City) like "' + q + '%")';
    },
    // Disable Add/Insert on toolbar
    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        tbar: []
      });
    },
    selectEntry: function selectEntry(params) {
      var row = $(params.$source).closest('[data-key]')[0];
      var key = row ? $(row).attr('data-key') : false;

      if (this._selectionModel && key) {
        App.showMapForAddress(_Format2.default.address(this.entries[key], true, ' '));
      }
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BZGRyZXNzL0xpc3QuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiaXRlbVRlbXBsYXRlIiwiU2ltcGxhdGUiLCJ0aXRsZVRleHQiLCJkZXRhaWxWaWV3IiwiaWQiLCJzZWN1cml0eSIsImluc2VydFNlY3VyaXR5IiwiaW5zZXJ0VmlldyIsInJlc291cmNlS2luZCIsImFsbG93U2VsZWN0aW9uIiwiZW5hYmxlQWN0aW9ucyIsImZvcm1hdCIsImlzQ2FyZFZpZXciLCJmb3JtYXRTZWFyY2hRdWVyeSIsInNlYXJjaFF1ZXJ5IiwicSIsImVzY2FwZVNlYXJjaFF1ZXJ5IiwidG9VcHBlckNhc2UiLCJjcmVhdGVUb29sTGF5b3V0IiwidG9vbHMiLCJ0YmFyIiwic2VsZWN0RW50cnkiLCJwYXJhbXMiLCJyb3ciLCIkIiwiJHNvdXJjZSIsImNsb3Nlc3QiLCJrZXkiLCJhdHRyIiwiX3NlbGVjdGlvbk1vZGVsIiwiQXBwIiwic2hvd01hcEZvckFkZHJlc3MiLCJhZGRyZXNzIiwiZW50cmllcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFxQkEsTUFBTUEsV0FBVyxvQkFBWSxhQUFaLENBQWpCOztBQUVBOzs7Ozs7Ozs7O0FBVUEsTUFBTUMsVUFBVSx1QkFBUSx3QkFBUixFQUFrQyxnQkFBbEMsRUFBMEM7QUFDeEQ7QUFDQUMsa0JBQWMsSUFBSUMsUUFBSixDQUFhLENBQ3pCLHNEQUR5QixFQUV6Qiw2REFGeUIsQ0FBYixDQUYwQzs7QUFPeEQ7QUFDQUMsZUFBV0osU0FBU0ksU0FSb0M7O0FBVXhEO0FBQ0FDLGdCQUFZLElBWDRDO0FBWXhEQyxRQUFJLGNBWm9EO0FBYXhEQyxjQUFVLElBYjhDLEVBYXhDO0FBQ2hCQyxvQkFBZ0Isc0JBZHdDO0FBZXhEQyxnQkFBWSxjQWY0QztBQWdCeERDLGtCQUFjLFdBaEIwQztBQWlCeERDLG9CQUFnQixJQWpCd0M7QUFrQnhEQyxtQkFBZSxJQWxCeUM7QUFtQnhEQyw0QkFuQndEO0FBb0J4REMsZ0JBQVksS0FwQjRDOztBQXNCeERDLHVCQUFtQixTQUFTQSxpQkFBVCxDQUEyQkMsV0FBM0IsRUFBd0M7QUFDekQsVUFBTUMsSUFBSSxLQUFLQyxpQkFBTCxDQUF1QkYsWUFBWUcsV0FBWixFQUF2QixDQUFWO0FBQ0EsNENBQW9DRixDQUFwQyxnQ0FBZ0VBLENBQWhFO0FBQ0QsS0F6QnVEO0FBMEJ4RDtBQUNBRyxzQkFBa0IsU0FBU0EsZ0JBQVQsR0FBNEI7QUFDNUMsYUFBTyxLQUFLQyxLQUFMLEtBQWUsS0FBS0EsS0FBTCxHQUFhO0FBQ2pDQyxjQUFNO0FBRDJCLE9BQTVCLENBQVA7QUFHRCxLQS9CdUQ7QUFnQ3hEQyxpQkFBYSxTQUFTQSxXQUFULENBQXFCQyxNQUFyQixFQUE2QjtBQUN4QyxVQUFNQyxNQUFNQyxFQUFFRixPQUFPRyxPQUFULEVBQWtCQyxPQUFsQixDQUEwQixZQUExQixFQUF3QyxDQUF4QyxDQUFaO0FBQ0EsVUFBTUMsTUFBTUosTUFBTUMsRUFBRUQsR0FBRixFQUFPSyxJQUFQLENBQVksVUFBWixDQUFOLEdBQWdDLEtBQTVDOztBQUVBLFVBQUksS0FBS0MsZUFBTCxJQUF3QkYsR0FBNUIsRUFBaUM7QUFDL0JHLFlBQUlDLGlCQUFKLENBQXNCLGlCQUFPQyxPQUFQLENBQWUsS0FBS0MsT0FBTCxDQUFhTixHQUFiLENBQWYsRUFBa0MsSUFBbEMsRUFBd0MsR0FBeEMsQ0FBdEI7QUFDRDtBQUNGO0FBdkN1RCxHQUExQyxDQUFoQjs7b0JBMENlNUIsTyIsImZpbGUiOiJMaXN0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICcuLi8uLi9Gb3JtYXQnO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2FkZHJlc3NMaXN0Jyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5BZGRyZXNzLkxpc3RcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuTGlzdFxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuTGlzdFxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgY3JtLkZvcm1hdFxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5BZGRyZXNzLkxpc3QnLCBbTGlzdF0sIHtcclxuICAvLyBUZW1wbGF0ZXNcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPHAgY2xhc3M9XCJsaXN0dmlldy1oZWFkaW5nXCI+eyU6ICQuJGRlc2NyaXB0b3IgJX08L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj57JT0gJCQuZm9ybWF0LmFkZHJlc3MoJCwgdHJ1ZSkgJX08L3A+JyxcclxuICBdKSxcclxuXHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGRldGFpbFZpZXc6IG51bGwsXHJcbiAgaWQ6ICdhZGRyZXNzX2xpc3QnLFxyXG4gIHNlY3VyaXR5OiBudWxsLCAvLyAnRW50aXRpZXMvQWRkcmVzcy9WaWV3JyxcclxuICBpbnNlcnRTZWN1cml0eTogJ0VudGl0aWVzL0FkZHJlc3MvQWRkJyxcclxuICBpbnNlcnRWaWV3OiAnYWRkcmVzc19lZGl0JyxcclxuICByZXNvdXJjZUtpbmQ6ICdhZGRyZXNzZXMnLFxyXG4gIGFsbG93U2VsZWN0aW9uOiB0cnVlLFxyXG4gIGVuYWJsZUFjdGlvbnM6IHRydWUsXHJcbiAgZm9ybWF0LFxyXG4gIGlzQ2FyZFZpZXc6IGZhbHNlLFxyXG5cclxuICBmb3JtYXRTZWFyY2hRdWVyeTogZnVuY3Rpb24gZm9ybWF0U2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkpIHtcclxuICAgIGNvbnN0IHEgPSB0aGlzLmVzY2FwZVNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5LnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgcmV0dXJuIGAodXBwZXIoRGVzY3JpcHRpb24pIGxpa2UgXCIke3F9JVwiIG9yIHVwcGVyKENpdHkpIGxpa2UgXCIke3F9JVwiKWA7XHJcbiAgfSxcclxuICAvLyBEaXNhYmxlIEFkZC9JbnNlcnQgb24gdG9vbGJhclxyXG4gIGNyZWF0ZVRvb2xMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZVRvb2xMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50b29scyB8fCAodGhpcy50b29scyA9IHtcclxuICAgICAgdGJhcjogW10sXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHNlbGVjdEVudHJ5OiBmdW5jdGlvbiBzZWxlY3RFbnRyeShwYXJhbXMpIHtcclxuICAgIGNvbnN0IHJvdyA9ICQocGFyYW1zLiRzb3VyY2UpLmNsb3Nlc3QoJ1tkYXRhLWtleV0nKVswXTtcclxuICAgIGNvbnN0IGtleSA9IHJvdyA/ICQocm93KS5hdHRyKCdkYXRhLWtleScpIDogZmFsc2U7XHJcblxyXG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvbk1vZGVsICYmIGtleSkge1xyXG4gICAgICBBcHAuc2hvd01hcEZvckFkZHJlc3MoZm9ybWF0LmFkZHJlc3ModGhpcy5lbnRyaWVzW2tleV0sIHRydWUsICcgJykpO1xyXG4gICAgfVxyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19