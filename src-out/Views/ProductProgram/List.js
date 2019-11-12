define('crm/Views/ProductProgram/List', ['module', 'exports', 'dojo/_base/declare', 'argos/List', 'argos/I18n'], function (module, exports, _declare, _List, _I18n) {
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

  var resource = (0, _I18n2.default)('productProgramList');

  /**
   * @class crm.Views.ProductProgram.List
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

  var __class = (0, _declare2.default)('crm.Views.ProductProgram.List', [_List2.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.Program %}</p>', '<p class="micro-text">', '{%: $.Price %}', '</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'productprogram_list',
    security: 'Entities/ProductProgram/View',
    queryOrderBy: 'Program',
    querySelect: ['DefaultProgram', 'Program', 'Price'],
    resourceKind: 'productPrograms',

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return '(upper(Program) like "' + q + '%")';
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9Qcm9kdWN0UHJvZ3JhbS9MaXN0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsIml0ZW1UZW1wbGF0ZSIsIlNpbXBsYXRlIiwidGl0bGVUZXh0IiwiaWQiLCJzZWN1cml0eSIsInF1ZXJ5T3JkZXJCeSIsInF1ZXJ5U2VsZWN0IiwicmVzb3VyY2VLaW5kIiwiZm9ybWF0U2VhcmNoUXVlcnkiLCJzZWFyY2hRdWVyeSIsInEiLCJlc2NhcGVTZWFyY2hRdWVyeSIsInRvVXBwZXJDYXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQSxNQUFNQSxXQUFXLG9CQUFZLG9CQUFaLENBQWpCOztBQUVBOzs7Ozs7O0FBckJBOzs7Ozs7Ozs7Ozs7Ozs7QUE0QkEsTUFBTUMsVUFBVSx1QkFBUSwrQkFBUixFQUF5QyxnQkFBekMsRUFBaUQ7QUFDL0Q7QUFDQUMsa0JBQWMsSUFBSUMsUUFBSixDQUFhLENBQ3pCLGtEQUR5QixFQUV6Qix3QkFGeUIsRUFHekIsZ0JBSHlCLEVBSXpCLE1BSnlCLENBQWIsQ0FGaUQ7O0FBUy9EO0FBQ0FDLGVBQVdKLFNBQVNJLFNBVjJDOztBQVkvRDtBQUNBQyxRQUFJLHFCQWIyRDtBQWMvREMsY0FBVSw4QkFkcUQ7QUFlL0RDLGtCQUFjLFNBZmlEO0FBZ0IvREMsaUJBQWEsQ0FDWCxnQkFEVyxFQUVYLFNBRlcsRUFHWCxPQUhXLENBaEJrRDtBQXFCL0RDLGtCQUFjLGlCQXJCaUQ7O0FBdUIvREMsdUJBQW1CLFNBQVNBLGlCQUFULENBQTJCQyxXQUEzQixFQUF3QztBQUN6RCxVQUFNQyxJQUFJLEtBQUtDLGlCQUFMLENBQXVCRixZQUFZRyxXQUFaLEVBQXZCLENBQVY7QUFDQSx3Q0FBZ0NGLENBQWhDO0FBQ0Q7QUExQjhELEdBQWpELENBQWhCOztvQkE2QmVYLE8iLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBMaXN0IGZyb20gJ2FyZ29zL0xpc3QnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdwcm9kdWN0UHJvZ3JhbUxpc3QnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLlByb2R1Y3RQcm9ncmFtLkxpc3RcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuTGlzdFxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgY3JtLkZvcm1hdFxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5Qcm9kdWN0UHJvZ3JhbS5MaXN0JywgW0xpc3RdLCB7XHJcbiAgLy8gVGVtcGxhdGVzXHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxwIGNsYXNzPVwibGlzdHZpZXctaGVhZGluZ1wiPnslOiAkLlByb2dyYW0gJX08L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj4nLFxyXG4gICAgJ3slOiAkLlByaWNlICV9JyxcclxuICAgICc8L3A+JyxcclxuICBdKSxcclxuXHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAncHJvZHVjdHByb2dyYW1fbGlzdCcsXHJcbiAgc2VjdXJpdHk6ICdFbnRpdGllcy9Qcm9kdWN0UHJvZ3JhbS9WaWV3JyxcclxuICBxdWVyeU9yZGVyQnk6ICdQcm9ncmFtJyxcclxuICBxdWVyeVNlbGVjdDogW1xyXG4gICAgJ0RlZmF1bHRQcm9ncmFtJyxcclxuICAgICdQcm9ncmFtJyxcclxuICAgICdQcmljZScsXHJcbiAgXSxcclxuICByZXNvdXJjZUtpbmQ6ICdwcm9kdWN0UHJvZ3JhbXMnLFxyXG5cclxuICBmb3JtYXRTZWFyY2hRdWVyeTogZnVuY3Rpb24gZm9ybWF0U2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkpIHtcclxuICAgIGNvbnN0IHEgPSB0aGlzLmVzY2FwZVNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5LnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgcmV0dXJuIGAodXBwZXIoUHJvZ3JhbSkgbGlrZSBcIiR7cX0lXCIpYDtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==