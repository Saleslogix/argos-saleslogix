define('crm/Views/Event/List', ['module', 'exports', 'dojo/_base/declare', 'argos/List', 'argos/I18n'], function (module, exports, _declare, _List, _I18n) {
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

  var resource = (0, _I18n2.default)('eventList'); /* Copyright 2017 Infor
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

  var dtFormatResource = (0, _I18n2.default)('eventListDateTimeFormat');

  /**
   * @class crm.Views.Event.List
   *
   * @extends argos.List
   *
   * @requires crm.Format
   */
  var __class = (0, _declare2.default)('crm.Views.Event.List', [_List2.default], {
    // Localization
    titleText: resource.titleText,
    eventDateFormatText: dtFormatResource.eventDateFormatText,
    eventDateFormatText24: dtFormatResource.eventDateFormatText24,
    eventText: resource.eventText,

    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%= $.Description %}</p>', '<p class="micro-text">', '{%: crm.Format.date($.StartDate, (App.is24HourClock()) ? $$.eventDateFormatText24 : $$.eventDateFormatText) %}', '&nbsp;-&nbsp;', '{%: crm.Format.date($.EndDate, (App.is24HourClock()) ? $$.eventDateFormatText24 : $$.eventDateFormatText) %}', '</p>']),

    // View Properties
    id: 'event_list',
    security: null, // 'Entities/Event/View',
    detailView: 'event_detail',
    insertView: 'event_edit',
    queryOrderBy: 'StartDate asc',
    queryWhere: null,
    querySelect: ['Description', 'StartDate', 'EndDate', 'UserId', 'Type'],
    resourceKind: 'events',

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(Description) like "%' + q + '%"';
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9FdmVudC9MaXN0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiZHRGb3JtYXRSZXNvdXJjZSIsIl9fY2xhc3MiLCJ0aXRsZVRleHQiLCJldmVudERhdGVGb3JtYXRUZXh0IiwiZXZlbnREYXRlRm9ybWF0VGV4dDI0IiwiZXZlbnRUZXh0IiwiaXRlbVRlbXBsYXRlIiwiU2ltcGxhdGUiLCJpZCIsInNlY3VyaXR5IiwiZGV0YWlsVmlldyIsImluc2VydFZpZXciLCJxdWVyeU9yZGVyQnkiLCJxdWVyeVdoZXJlIiwicXVlcnlTZWxlY3QiLCJyZXNvdXJjZUtpbmQiLCJmb3JtYXRTZWFyY2hRdWVyeSIsInNlYXJjaFF1ZXJ5IiwicSIsImVzY2FwZVNlYXJjaFF1ZXJ5IiwidG9VcHBlckNhc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBLE1BQU1BLFdBQVcsb0JBQVksV0FBWixDQUFqQixDLENBbkJBOzs7Ozs7Ozs7Ozs7Ozs7QUFvQkEsTUFBTUMsbUJBQW1CLG9CQUFZLHlCQUFaLENBQXpCOztBQUVBOzs7Ozs7O0FBT0EsTUFBTUMsVUFBVSx1QkFBUSxzQkFBUixFQUFnQyxnQkFBaEMsRUFBd0M7QUFDdEQ7QUFDQUMsZUFBV0gsU0FBU0csU0FGa0M7QUFHdERDLHlCQUFxQkgsaUJBQWlCRyxtQkFIZ0I7QUFJdERDLDJCQUF1QkosaUJBQWlCSSxxQkFKYztBQUt0REMsZUFBV04sU0FBU00sU0FMa0M7O0FBT3REO0FBQ0FDLGtCQUFjLElBQUlDLFFBQUosQ0FBYSxDQUN6QixzREFEeUIsRUFFekIsd0JBRnlCLEVBR3pCLGdIQUh5QixFQUl6QixlQUp5QixFQUt6Qiw4R0FMeUIsRUFNekIsTUFOeUIsQ0FBYixDQVJ3Qzs7QUFpQnREO0FBQ0FDLFFBQUksWUFsQmtEO0FBbUJ0REMsY0FBVSxJQW5CNEMsRUFtQnRDO0FBQ2hCQyxnQkFBWSxjQXBCMEM7QUFxQnREQyxnQkFBWSxZQXJCMEM7QUFzQnREQyxrQkFBYyxlQXRCd0M7QUF1QnREQyxnQkFBWSxJQXZCMEM7QUF3QnREQyxpQkFBYSxDQUNYLGFBRFcsRUFFWCxXQUZXLEVBR1gsU0FIVyxFQUlYLFFBSlcsRUFLWCxNQUxXLENBeEJ5QztBQStCdERDLGtCQUFjLFFBL0J3Qzs7QUFpQ3REQyx1QkFBbUIsU0FBU0EsaUJBQVQsQ0FBMkJDLFdBQTNCLEVBQXdDO0FBQ3pELFVBQU1DLElBQUksS0FBS0MsaUJBQUwsQ0FBdUJGLFlBQVlHLFdBQVosRUFBdkIsQ0FBVjtBQUNBLDRDQUFvQ0YsQ0FBcEM7QUFDRDtBQXBDcUQsR0FBeEMsQ0FBaEI7O29CQXVDZWpCLE8iLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBMaXN0IGZyb20gJ2FyZ29zL0xpc3QnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdldmVudExpc3QnKTtcclxuY29uc3QgZHRGb3JtYXRSZXNvdXJjZSA9IGdldFJlc291cmNlKCdldmVudExpc3REYXRlVGltZUZvcm1hdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuRXZlbnQuTGlzdFxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5MaXN0XHJcbiAqXHJcbiAqIEByZXF1aXJlcyBjcm0uRm9ybWF0XHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLkV2ZW50Lkxpc3QnLCBbTGlzdF0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBldmVudERhdGVGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLmV2ZW50RGF0ZUZvcm1hdFRleHQsXHJcbiAgZXZlbnREYXRlRm9ybWF0VGV4dDI0OiBkdEZvcm1hdFJlc291cmNlLmV2ZW50RGF0ZUZvcm1hdFRleHQyNCxcclxuICBldmVudFRleHQ6IHJlc291cmNlLmV2ZW50VGV4dCxcclxuXHJcbiAgLy8gVGVtcGxhdGVzXHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxwIGNsYXNzPVwibGlzdHZpZXctaGVhZGluZ1wiPnslPSAkLkRlc2NyaXB0aW9uICV9PC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+JyxcclxuICAgICd7JTogY3JtLkZvcm1hdC5kYXRlKCQuU3RhcnREYXRlLCAoQXBwLmlzMjRIb3VyQ2xvY2soKSkgPyAkJC5ldmVudERhdGVGb3JtYXRUZXh0MjQgOiAkJC5ldmVudERhdGVGb3JtYXRUZXh0KSAlfScsXHJcbiAgICAnJm5ic3A7LSZuYnNwOycsXHJcbiAgICAneyU6IGNybS5Gb3JtYXQuZGF0ZSgkLkVuZERhdGUsIChBcHAuaXMyNEhvdXJDbG9jaygpKSA/ICQkLmV2ZW50RGF0ZUZvcm1hdFRleHQyNCA6ICQkLmV2ZW50RGF0ZUZvcm1hdFRleHQpICV9JyxcclxuICAgICc8L3A+JyxcclxuICBdKSxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdldmVudF9saXN0JyxcclxuICBzZWN1cml0eTogbnVsbCwgLy8gJ0VudGl0aWVzL0V2ZW50L1ZpZXcnLFxyXG4gIGRldGFpbFZpZXc6ICdldmVudF9kZXRhaWwnLFxyXG4gIGluc2VydFZpZXc6ICdldmVudF9lZGl0JyxcclxuICBxdWVyeU9yZGVyQnk6ICdTdGFydERhdGUgYXNjJyxcclxuICBxdWVyeVdoZXJlOiBudWxsLFxyXG4gIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAnRGVzY3JpcHRpb24nLFxyXG4gICAgJ1N0YXJ0RGF0ZScsXHJcbiAgICAnRW5kRGF0ZScsXHJcbiAgICAnVXNlcklkJyxcclxuICAgICdUeXBlJyxcclxuICBdLFxyXG4gIHJlc291cmNlS2luZDogJ2V2ZW50cycsXHJcblxyXG4gIGZvcm1hdFNlYXJjaFF1ZXJ5OiBmdW5jdGlvbiBmb3JtYXRTZWFyY2hRdWVyeShzZWFyY2hRdWVyeSkge1xyXG4gICAgY29uc3QgcSA9IHRoaXMuZXNjYXBlU2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkudG9VcHBlckNhc2UoKSk7XHJcbiAgICByZXR1cm4gYHVwcGVyKERlc2NyaXB0aW9uKSBsaWtlIFwiJSR7cX0lXCJgO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19