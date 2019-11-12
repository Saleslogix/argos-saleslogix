define('crm/Views/Competitor/List', ['module', 'exports', 'dojo/_base/declare', 'argos/List', 'argos/I18n'], function (module, exports, _declare, _List, _I18n) {
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

  var resource = (0, _I18n2.default)('competitorList');

  /**
   * @class crm.Views.Competitor.List
   *
   * @extends argos.List
   *
   * @requires argos.List
   *
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

  var __class = (0, _declare2.default)('crm.Views.Competitor.List', [_List2.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%= $.CompetitorName %}</p>', '{% if ($.WebAddress) { %}<p class="micro-text">{%= $.WebAddress %}</p>{% } %}']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    detailView: 'competitor_detail',
    id: 'competitor_list',
    security: 'Entities/Competitor/View',
    insertView: 'competitor_edit',
    queryOrderBy: 'CompetitorName asc',
    querySelect: ['CompetitorName', 'WebAddress'],
    resourceKind: 'competitors',

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery);
      return '(CompetitorName like "%' + q + '%")';
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9Db21wZXRpdG9yL0xpc3QuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiaXRlbVRlbXBsYXRlIiwiU2ltcGxhdGUiLCJ0aXRsZVRleHQiLCJkZXRhaWxWaWV3IiwiaWQiLCJzZWN1cml0eSIsImluc2VydFZpZXciLCJxdWVyeU9yZGVyQnkiLCJxdWVyeVNlbGVjdCIsInJlc291cmNlS2luZCIsImZvcm1hdFNlYXJjaFF1ZXJ5Iiwic2VhcmNoUXVlcnkiLCJxIiwiZXNjYXBlU2VhcmNoUXVlcnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBLE1BQU1BLFdBQVcsb0JBQVksZ0JBQVosQ0FBakI7O0FBRUE7Ozs7Ozs7O0FBckJBOzs7Ozs7Ozs7Ozs7Ozs7QUE2QkEsTUFBTUMsVUFBVSx1QkFBUSwyQkFBUixFQUFxQyxnQkFBckMsRUFBNkM7QUFDM0Q7QUFDQUMsa0JBQWMsSUFBSUMsUUFBSixDQUFhLENBQ3pCLHlEQUR5QixFQUV6QiwrRUFGeUIsQ0FBYixDQUY2Qzs7QUFPM0Q7QUFDQUMsZUFBV0osU0FBU0ksU0FSdUM7O0FBVTNEO0FBQ0FDLGdCQUFZLG1CQVgrQztBQVkzREMsUUFBSSxpQkFadUQ7QUFhM0RDLGNBQVUsMEJBYmlEO0FBYzNEQyxnQkFBWSxpQkFkK0M7QUFlM0RDLGtCQUFjLG9CQWY2QztBQWdCM0RDLGlCQUFhLENBQ1gsZ0JBRFcsRUFFWCxZQUZXLENBaEI4QztBQW9CM0RDLGtCQUFjLGFBcEI2Qzs7QUFzQjNEQyx1QkFBbUIsU0FBU0EsaUJBQVQsQ0FBMkJDLFdBQTNCLEVBQXdDO0FBQ3pELFVBQU1DLElBQUksS0FBS0MsaUJBQUwsQ0FBdUJGLFdBQXZCLENBQVY7QUFDQSx5Q0FBaUNDLENBQWpDO0FBQ0Q7QUF6QjBELEdBQTdDLENBQWhCOztvQkE0QmViLE8iLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBMaXN0IGZyb20gJ2FyZ29zL0xpc3QnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdjb21wZXRpdG9yTGlzdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuQ29tcGV0aXRvci5MaXN0XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkxpc3RcclxuICpcclxuICogQHJlcXVpcmVzIGFyZ29zLkxpc3RcclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuQ29tcGV0aXRvci5MaXN0JywgW0xpc3RdLCB7XHJcbiAgLy8gVGVtcGxhdGVzXHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxwIGNsYXNzPVwibGlzdHZpZXctaGVhZGluZ1wiPnslPSAkLkNvbXBldGl0b3JOYW1lICV9PC9wPicsXHJcbiAgICAneyUgaWYgKCQuV2ViQWRkcmVzcykgeyAlfTxwIGNsYXNzPVwibWljcm8tdGV4dFwiPnslPSAkLldlYkFkZHJlc3MgJX08L3A+eyUgfSAlfScsXHJcbiAgXSksXHJcblxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBkZXRhaWxWaWV3OiAnY29tcGV0aXRvcl9kZXRhaWwnLFxyXG4gIGlkOiAnY29tcGV0aXRvcl9saXN0JyxcclxuICBzZWN1cml0eTogJ0VudGl0aWVzL0NvbXBldGl0b3IvVmlldycsXHJcbiAgaW5zZXJ0VmlldzogJ2NvbXBldGl0b3JfZWRpdCcsXHJcbiAgcXVlcnlPcmRlckJ5OiAnQ29tcGV0aXRvck5hbWUgYXNjJyxcclxuICBxdWVyeVNlbGVjdDogW1xyXG4gICAgJ0NvbXBldGl0b3JOYW1lJyxcclxuICAgICdXZWJBZGRyZXNzJyxcclxuICBdLFxyXG4gIHJlc291cmNlS2luZDogJ2NvbXBldGl0b3JzJyxcclxuXHJcbiAgZm9ybWF0U2VhcmNoUXVlcnk6IGZ1bmN0aW9uIGZvcm1hdFNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5KSB7XHJcbiAgICBjb25zdCBxID0gdGhpcy5lc2NhcGVTZWFyY2hRdWVyeShzZWFyY2hRdWVyeSk7XHJcbiAgICByZXR1cm4gYChDb21wZXRpdG9yTmFtZSBsaWtlIFwiJSR7cX0lXCIpYDtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==