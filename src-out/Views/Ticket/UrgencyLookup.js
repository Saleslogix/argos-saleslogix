define('crm/Views/Ticket/UrgencyLookup', ['module', 'exports', 'dojo/_base/declare', 'argos/List', 'argos/I18n'], function (module, exports, _declare, _List, _I18n) {
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

  var resource = (0, _I18n2.default)('ticketUrgencyLookup');

  /**
   * @class crm.Views.Ticket.UrgencyLookup
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

  var __class = (0, _declare2.default)('crm.Views.Ticket.UrgencyLookup', [_List2.default], {
    // Localization
    titleText: resource.titleText,

    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.Description %}</p>']),

    // View Properties
    id: 'urgency_list',
    queryOrderBy: 'UrgencyCode asc',
    querySelect: ['Description', 'UrgencyCode'],
    resourceKind: 'urgencies',
    isCardView: false,
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var toUpper = searchQuery && searchQuery.toUpperCase() || '';
      var escaped = this.escapeSearchQuery(toUpper);
      return 'upper(Description) like "%' + escaped + '%"';
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9UaWNrZXQvVXJnZW5jeUxvb2t1cC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJ0aXRsZVRleHQiLCJpdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsImlkIiwicXVlcnlPcmRlckJ5IiwicXVlcnlTZWxlY3QiLCJyZXNvdXJjZUtpbmQiLCJpc0NhcmRWaWV3IiwiZm9ybWF0U2VhcmNoUXVlcnkiLCJzZWFyY2hRdWVyeSIsInRvVXBwZXIiLCJ0b1VwcGVyQ2FzZSIsImVzY2FwZWQiLCJlc2NhcGVTZWFyY2hRdWVyeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkEsTUFBTUEsV0FBVyxvQkFBWSxxQkFBWixDQUFqQjs7QUFFQTs7Ozs7QUFyQkE7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxNQUFNQyxVQUFVLHVCQUFRLGdDQUFSLEVBQTBDLGdCQUExQyxFQUFrRDtBQUNoRTtBQUNBQyxlQUFXRixTQUFTRSxTQUY0Qzs7QUFJaEU7QUFDQUMsa0JBQWMsSUFBSUMsUUFBSixDQUFhLENBQ3pCLHNEQUR5QixDQUFiLENBTGtEOztBQVNoRTtBQUNBQyxRQUFJLGNBVjREO0FBV2hFQyxrQkFBYyxpQkFYa0Q7QUFZaEVDLGlCQUFhLENBQ1gsYUFEVyxFQUVYLGFBRlcsQ0FabUQ7QUFnQmhFQyxrQkFBYyxXQWhCa0Q7QUFpQmhFQyxnQkFBWSxLQWpCb0Q7QUFrQmhFQyx1QkFBbUIsU0FBU0EsaUJBQVQsQ0FBMkJDLFdBQTNCLEVBQXdDO0FBQ3pELFVBQU1DLFVBQVVELGVBQWVBLFlBQVlFLFdBQVosRUFBZixJQUE0QyxFQUE1RDtBQUNBLFVBQU1DLFVBQVUsS0FBS0MsaUJBQUwsQ0FBdUJILE9BQXZCLENBQWhCO0FBQ0EsNENBQW9DRSxPQUFwQztBQUNEO0FBdEIrRCxHQUFsRCxDQUFoQjs7b0JBeUJlYixPIiwiZmlsZSI6IlVyZ2VuY3lMb29rdXAuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgndGlja2V0VXJnZW5jeUxvb2t1cCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuVGlja2V0LlVyZ2VuY3lMb29rdXBcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuTGlzdFxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5UaWNrZXQuVXJnZW5jeUxvb2t1cCcsIFtMaXN0XSwge1xyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG5cclxuICAvLyBUZW1wbGF0ZXNcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPHAgY2xhc3M9XCJsaXN0dmlldy1oZWFkaW5nXCI+eyU6ICQuRGVzY3JpcHRpb24gJX08L3A+JyxcclxuICBdKSxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICd1cmdlbmN5X2xpc3QnLFxyXG4gIHF1ZXJ5T3JkZXJCeTogJ1VyZ2VuY3lDb2RlIGFzYycsXHJcbiAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICdEZXNjcmlwdGlvbicsXHJcbiAgICAnVXJnZW5jeUNvZGUnLFxyXG4gIF0sXHJcbiAgcmVzb3VyY2VLaW5kOiAndXJnZW5jaWVzJyxcclxuICBpc0NhcmRWaWV3OiBmYWxzZSxcclxuICBmb3JtYXRTZWFyY2hRdWVyeTogZnVuY3Rpb24gZm9ybWF0U2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkpIHtcclxuICAgIGNvbnN0IHRvVXBwZXIgPSBzZWFyY2hRdWVyeSAmJiBzZWFyY2hRdWVyeS50b1VwcGVyQ2FzZSgpIHx8ICcnO1xyXG4gICAgY29uc3QgZXNjYXBlZCA9IHRoaXMuZXNjYXBlU2VhcmNoUXVlcnkodG9VcHBlcik7XHJcbiAgICByZXR1cm4gYHVwcGVyKERlc2NyaXB0aW9uKSBsaWtlIFwiJSR7ZXNjYXBlZH0lXCJgO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19