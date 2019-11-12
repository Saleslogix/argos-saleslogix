define('crm/Views/Contract/List', ['module', 'exports', 'dojo/_base/declare', 'argos/List', 'argos/I18n'], function (module, exports, _declare, _List, _I18n) {
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

  var resource = (0, _I18n2.default)('contractList');

  /**
   * @class crm.Views.Contract.List
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

  var __class = (0, _declare2.default)('crm.Views.Contract.List', [_List2.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%= $.Account ? $.Account.AccountName : "" %}</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    contextView: 'context_dialog',
    detailView: 'contract_detail',
    id: 'contract_list',
    security: 'Entities/Contract/View',
    insertView: 'contract_edit',
    queryOrderBy: 'ReferenceNumber asc',
    querySelect: ['Account/AccountName', 'Contact/FullName', 'ReferenceNumber'],
    resourceKind: 'contracts',

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery);
      return '(ReferenceNumber like "%' + q + '%")';
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9Db250cmFjdC9MaXN0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsIml0ZW1UZW1wbGF0ZSIsIlNpbXBsYXRlIiwidGl0bGVUZXh0IiwiY29udGV4dFZpZXciLCJkZXRhaWxWaWV3IiwiaWQiLCJzZWN1cml0eSIsImluc2VydFZpZXciLCJxdWVyeU9yZGVyQnkiLCJxdWVyeVNlbGVjdCIsInJlc291cmNlS2luZCIsImZvcm1hdFNlYXJjaFF1ZXJ5Iiwic2VhcmNoUXVlcnkiLCJxIiwiZXNjYXBlU2VhcmNoUXVlcnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBLE1BQU1BLFdBQVcsb0JBQVksY0FBWixDQUFqQjs7QUFFQTs7Ozs7QUFyQkE7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxNQUFNQyxVQUFVLHVCQUFRLHlCQUFSLEVBQW1DLGdCQUFuQyxFQUEyQztBQUN6RDtBQUNBQyxrQkFBYyxJQUFJQyxRQUFKLENBQWEsQ0FDekIsK0VBRHlCLENBQWIsQ0FGMkM7O0FBTXpEO0FBQ0FDLGVBQVdKLFNBQVNJLFNBUHFDOztBQVN6RDtBQUNBQyxpQkFBYSxnQkFWNEM7QUFXekRDLGdCQUFZLGlCQVg2QztBQVl6REMsUUFBSSxlQVpxRDtBQWF6REMsY0FBVSx3QkFiK0M7QUFjekRDLGdCQUFZLGVBZDZDO0FBZXpEQyxrQkFBYyxxQkFmMkM7QUFnQnpEQyxpQkFBYSxDQUNYLHFCQURXLEVBRVgsa0JBRlcsRUFHWCxpQkFIVyxDQWhCNEM7QUFxQnpEQyxrQkFBYyxXQXJCMkM7O0FBdUJ6REMsdUJBQW1CLFNBQVNBLGlCQUFULENBQTJCQyxXQUEzQixFQUF3QztBQUN6RCxVQUFNQyxJQUFJLEtBQUtDLGlCQUFMLENBQXVCRixXQUF2QixDQUFWO0FBQ0EsMENBQWtDQyxDQUFsQztBQUNEO0FBMUJ3RCxHQUEzQyxDQUFoQjs7b0JBNkJlZCxPIiwiZmlsZSI6Ikxpc3QuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnY29udHJhY3RMaXN0Jyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5Db250cmFjdC5MaXN0XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkxpc3RcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuQ29udHJhY3QuTGlzdCcsIFtMaXN0XSwge1xyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cImxpc3R2aWV3LWhlYWRpbmdcIj57JT0gJC5BY2NvdW50ID8gJC5BY2NvdW50LkFjY291bnROYW1lIDogXCJcIiAlfTwvcD4nLFxyXG4gIF0pLFxyXG5cclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgY29udGV4dFZpZXc6ICdjb250ZXh0X2RpYWxvZycsXHJcbiAgZGV0YWlsVmlldzogJ2NvbnRyYWN0X2RldGFpbCcsXHJcbiAgaWQ6ICdjb250cmFjdF9saXN0JyxcclxuICBzZWN1cml0eTogJ0VudGl0aWVzL0NvbnRyYWN0L1ZpZXcnLFxyXG4gIGluc2VydFZpZXc6ICdjb250cmFjdF9lZGl0JyxcclxuICBxdWVyeU9yZGVyQnk6ICdSZWZlcmVuY2VOdW1iZXIgYXNjJyxcclxuICBxdWVyeVNlbGVjdDogW1xyXG4gICAgJ0FjY291bnQvQWNjb3VudE5hbWUnLFxyXG4gICAgJ0NvbnRhY3QvRnVsbE5hbWUnLFxyXG4gICAgJ1JlZmVyZW5jZU51bWJlcicsXHJcbiAgXSxcclxuICByZXNvdXJjZUtpbmQ6ICdjb250cmFjdHMnLFxyXG5cclxuICBmb3JtYXRTZWFyY2hRdWVyeTogZnVuY3Rpb24gZm9ybWF0U2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkpIHtcclxuICAgIGNvbnN0IHEgPSB0aGlzLmVzY2FwZVNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5KTtcclxuICAgIHJldHVybiBgKFJlZmVyZW5jZU51bWJlciBsaWtlIFwiJSR7cX0lXCIpYDtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==