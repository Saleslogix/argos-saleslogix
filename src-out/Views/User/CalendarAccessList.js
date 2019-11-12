define('crm/Views/User/CalendarAccessList', ['module', 'exports', 'dojo/_base/declare', 'argos/List', 'argos/I18n'], function (module, exports, _declare, _List, _I18n) {
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

  var resource = (0, _I18n2.default)('userCalendarAccessList');

  /**
   * @class crm.Views.User.CalendarAccessList
   *
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

  var __class = (0, _declare2.default)('crm.Views.User.CalendarAccessList', [_List2.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="micro-text">{%: $.SubType %}</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'calendar_access_list',
    queryOrderBy: 'Name',

    queryWhere: function queryWhere() {
      return 'AllowAdd AND (AccessId eq \'EVERYONE\' or AccessId eq \'' + App.context.user.$key + '\') AND Type eq \'User\'';
    },
    querySelect: ['Name', 'SubType', 'AccessId', 'ResourceId'],
    resourceKind: 'activityresourceviews',

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(Name) like "%' + q + '%"';
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9Vc2VyL0NhbGVuZGFyQWNjZXNzTGlzdC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJpdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsInRpdGxlVGV4dCIsImlkIiwicXVlcnlPcmRlckJ5IiwicXVlcnlXaGVyZSIsIkFwcCIsImNvbnRleHQiLCJ1c2VyIiwiJGtleSIsInF1ZXJ5U2VsZWN0IiwicmVzb3VyY2VLaW5kIiwiZm9ybWF0U2VhcmNoUXVlcnkiLCJzZWFyY2hRdWVyeSIsInEiLCJlc2NhcGVTZWFyY2hRdWVyeSIsInRvVXBwZXJDYXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQSxNQUFNQSxXQUFXLG9CQUFZLHdCQUFaLENBQWpCOztBQUVBOzs7OztBQXJCQTs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLE1BQU1DLFVBQVUsdUJBQVEsbUNBQVIsRUFBNkMsZ0JBQTdDLEVBQXFEO0FBQ25FO0FBQ0FDLGtCQUFjLElBQUlDLFFBQUosQ0FBYSxDQUN6Qiw0Q0FEeUIsQ0FBYixDQUZxRDs7QUFNbkU7QUFDQUMsZUFBV0osU0FBU0ksU0FQK0M7O0FBU25FO0FBQ0FDLFFBQUksc0JBVitEO0FBV25FQyxrQkFBYyxNQVhxRDs7QUFhbkVDLGdCQUFZLFNBQVNBLFVBQVQsR0FBc0I7QUFDaEMsMEVBQStEQyxJQUFJQyxPQUFKLENBQVlDLElBQVosQ0FBaUJDLElBQWhGO0FBQ0QsS0Fma0U7QUFnQm5FQyxpQkFBYSxDQUNYLE1BRFcsRUFFWCxTQUZXLEVBR1gsVUFIVyxFQUlYLFlBSlcsQ0FoQnNEO0FBc0JuRUMsa0JBQWMsdUJBdEJxRDs7QUF3Qm5FQyx1QkFBbUIsU0FBU0EsaUJBQVQsQ0FBMkJDLFdBQTNCLEVBQXdDO0FBQ3pELFVBQU1DLElBQUksS0FBS0MsaUJBQUwsQ0FBdUJGLFlBQVlHLFdBQVosRUFBdkIsQ0FBVjtBQUNBLHFDQUE2QkYsQ0FBN0I7QUFDRDtBQTNCa0UsR0FBckQsQ0FBaEI7O29CQThCZWYsTyIsImZpbGUiOiJDYWxlbmRhckFjY2Vzc0xpc3QuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgndXNlckNhbGVuZGFyQWNjZXNzTGlzdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuVXNlci5DYWxlbmRhckFjY2Vzc0xpc3RcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuTGlzdFxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5Vc2VyLkNhbGVuZGFyQWNjZXNzTGlzdCcsIFtMaXN0XSwge1xyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj57JTogJC5TdWJUeXBlICV9PC9wPicsXHJcbiAgXSksXHJcblxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ2NhbGVuZGFyX2FjY2Vzc19saXN0JyxcclxuICBxdWVyeU9yZGVyQnk6ICdOYW1lJyxcclxuXHJcbiAgcXVlcnlXaGVyZTogZnVuY3Rpb24gcXVlcnlXaGVyZSgpIHtcclxuICAgIHJldHVybiBgQWxsb3dBZGQgQU5EIChBY2Nlc3NJZCBlcSAnRVZFUllPTkUnIG9yIEFjY2Vzc0lkIGVxICcke0FwcC5jb250ZXh0LnVzZXIuJGtleX0nKSBBTkQgVHlwZSBlcSAnVXNlcidgO1xyXG4gIH0sXHJcbiAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICdOYW1lJyxcclxuICAgICdTdWJUeXBlJyxcclxuICAgICdBY2Nlc3NJZCcsXHJcbiAgICAnUmVzb3VyY2VJZCcsXHJcbiAgXSxcclxuICByZXNvdXJjZUtpbmQ6ICdhY3Rpdml0eXJlc291cmNldmlld3MnLFxyXG5cclxuICBmb3JtYXRTZWFyY2hRdWVyeTogZnVuY3Rpb24gZm9ybWF0U2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkpIHtcclxuICAgIGNvbnN0IHEgPSB0aGlzLmVzY2FwZVNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5LnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgcmV0dXJuIGB1cHBlcihOYW1lKSBsaWtlIFwiJSR7cX0lXCJgO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19