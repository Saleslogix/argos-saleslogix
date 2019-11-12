define('crm/Integrations/BOE/Views/Carriers/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _List, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _List2 = _interopRequireDefault(_List);

  var _Names2 = _interopRequireDefault(_Names);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('carriersList'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.Carriers.List', [_List2.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.CarrierName %}</p>', '<p class="micro-text">{%: $.LogicalId %}</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'carriers_list',
    detailView: '',
    modelName: _Names2.default.CARRIER,
    resourceKind: 'carriers',
    enableActions: false,
    expose: false,
    security: 'Entities/Carrier/View',
    insertSecurity: 'Entities/Carrier/Add',

    // Card layout
    itemIconClass: '',

    // Metrics
    entityName: 'Carrier',

    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {});
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(CarrierName) like "' + q + '%"';
    }
  });

  _lang2.default.setObject('icboe.Views.Carriers.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0NhcnJpZXJzL0xpc3QuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiaXRlbVRlbXBsYXRlIiwiU2ltcGxhdGUiLCJ0aXRsZVRleHQiLCJpZCIsImRldGFpbFZpZXciLCJtb2RlbE5hbWUiLCJDQVJSSUVSIiwicmVzb3VyY2VLaW5kIiwiZW5hYmxlQWN0aW9ucyIsImV4cG9zZSIsInNlY3VyaXR5IiwiaW5zZXJ0U2VjdXJpdHkiLCJpdGVtSWNvbkNsYXNzIiwiZW50aXR5TmFtZSIsImNyZWF0ZVRvb2xMYXlvdXQiLCJ0b29scyIsImZvcm1hdFNlYXJjaFF1ZXJ5Iiwic2VhcmNoUXVlcnkiLCJxIiwiZXNjYXBlU2VhcmNoUXVlcnkiLCJ0b1VwcGVyQ2FzZSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU1BLFdBQVcsb0JBQVksY0FBWixDQUFqQixDLENBckJBOzs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsTUFBTUMsVUFBVSx1QkFBUSwwQ0FBUixFQUFvRCxnQkFBcEQsRUFBNEQ7QUFDMUU7QUFDQUMsa0JBQWMsSUFBSUMsUUFBSixDQUFhLENBQ3pCLHNEQUR5QixFQUV6Qiw4Q0FGeUIsQ0FBYixDQUY0RDs7QUFPMUU7QUFDQUMsZUFBV0osU0FBU0ksU0FSc0Q7O0FBVTFFO0FBQ0FDLFFBQUksZUFYc0U7QUFZMUVDLGdCQUFZLEVBWjhEO0FBYTFFQyxlQUFXLGdCQUFZQyxPQWJtRDtBQWMxRUMsa0JBQWMsVUFkNEQ7QUFlMUVDLG1CQUFlLEtBZjJEO0FBZ0IxRUMsWUFBUSxLQWhCa0U7QUFpQjFFQyxjQUFVLHVCQWpCZ0U7QUFrQjFFQyxvQkFBZ0Isc0JBbEIwRDs7QUFvQjFFO0FBQ0FDLG1CQUFlLEVBckIyRDs7QUF1QjFFO0FBQ0FDLGdCQUFZLFNBeEI4RDs7QUEwQjFFQyxzQkFBa0IsU0FBU0EsZ0JBQVQsR0FBNEI7QUFDNUMsYUFBTyxLQUFLQyxLQUFMLEtBQWUsS0FBS0EsS0FBTCxHQUFhLEVBQTVCLENBQVA7QUFFRCxLQTdCeUU7QUE4QjFFQyx1QkFBbUIsU0FBU0EsaUJBQVQsQ0FBMkJDLFdBQTNCLEVBQXdDO0FBQ3pELFVBQU1DLElBQUksS0FBS0MsaUJBQUwsQ0FBdUJGLFlBQVlHLFdBQVosRUFBdkIsQ0FBVjtBQUNBLDJDQUFtQ0YsQ0FBbkM7QUFDRDtBQWpDeUUsR0FBNUQsQ0FBaEI7O0FBb0NBLGlCQUFLRyxTQUFMLENBQWUsMkJBQWYsRUFBNEN0QixPQUE1QztvQkFDZUEsTyIsImZpbGUiOiJMaXN0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IExpc3QgZnJvbSAnYXJnb3MvTGlzdCc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi8uLi9Nb2RlbHMvTmFtZXMnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdjYXJyaWVyc0xpc3QnKTtcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5WaWV3cy5DYXJyaWVycy5MaXN0JywgW0xpc3RdLCB7XHJcbiAgLy8gVGVtcGxhdGVzXHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxwIGNsYXNzPVwibGlzdHZpZXctaGVhZGluZ1wiPnslOiAkLkNhcnJpZXJOYW1lICV9PC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+eyU6ICQuTG9naWNhbElkICV9PC9wPicsXHJcbiAgXSksXHJcblxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ2NhcnJpZXJzX2xpc3QnLFxyXG4gIGRldGFpbFZpZXc6ICcnLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuQ0FSUklFUixcclxuICByZXNvdXJjZUtpbmQ6ICdjYXJyaWVycycsXHJcbiAgZW5hYmxlQWN0aW9uczogZmFsc2UsXHJcbiAgZXhwb3NlOiBmYWxzZSxcclxuICBzZWN1cml0eTogJ0VudGl0aWVzL0NhcnJpZXIvVmlldycsXHJcbiAgaW5zZXJ0U2VjdXJpdHk6ICdFbnRpdGllcy9DYXJyaWVyL0FkZCcsXHJcblxyXG4gIC8vIENhcmQgbGF5b3V0XHJcbiAgaXRlbUljb25DbGFzczogJycsXHJcblxyXG4gIC8vIE1ldHJpY3NcclxuICBlbnRpdHlOYW1lOiAnQ2FycmllcicsXHJcblxyXG4gIGNyZWF0ZVRvb2xMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZVRvb2xMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50b29scyB8fCAodGhpcy50b29scyA9IHtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZm9ybWF0U2VhcmNoUXVlcnk6IGZ1bmN0aW9uIGZvcm1hdFNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5KSB7XHJcbiAgICBjb25zdCBxID0gdGhpcy5lc2NhcGVTZWFyY2hRdWVyeShzZWFyY2hRdWVyeS50b1VwcGVyQ2FzZSgpKTtcclxuICAgIHJldHVybiBgdXBwZXIoQ2Fycmllck5hbWUpIGxpa2UgXCIke3F9JVwiYDtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5WaWV3cy5DYXJyaWVycy5MaXN0JywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==