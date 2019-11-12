define('crm/Integrations/BOE/Views/QuotePersons/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'crm/Format', 'crm/Views/_RightDrawerListMixin', 'crm/Views/_MetricListMixin', 'crm/Views/_GroupListMixin', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _List, _Format, _RightDrawerListMixin2, _MetricListMixin2, _GroupListMixin2, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _List2 = _interopRequireDefault(_List);

  var _Format2 = _interopRequireDefault(_Format);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _GroupListMixin3 = _interopRequireDefault(_GroupListMixin2);

  var _Names2 = _interopRequireDefault(_Names);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('quotePersonList'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.QuotePersons.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default, _GroupListMixin3.default], {
    formatter: _Format2.default,
    // Templates
    itemTemplate: new Simplate(['<p class="micro-text"><label class="group-label">{%: $$.personNameText %}</label> {%: $.Person.Name %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.quoteNumberText %}</label> {%: $.Quote.QuoteNumber %}</p>']),

    // Localization
    titleText: resource.titleText,
    personNameText: resource.personNameText,
    quoteNumberText: resource.quoteNumberText,

    // View Properties
    id: 'quotePerson_list',
    modelName: _Names2.default.QUOTEPERSON,
    resourceKind: 'quotePersons',
    allowSelection: true,
    enableActions: false,
    expose: false,
    security: 'Entities/ErpPerson/View',
    insertSecurity: 'Entities/ErpPerson/Add',

    // Card layout
    itemIconClass: '',

    // Groups
    enableDynamicGroupLayout: false,
    groupsEnabled: false,

    // Metrics
    entityName: 'Quote Person',

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(Quote.QuoteNumber) like "' + q + '%" or upper(Person.Name) like "' + q + '%"';
    }
  });

  _lang2.default.setObject('icboe.Views.QuotePersons.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL1F1b3RlUGVyc29ucy9MaXN0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsImZvcm1hdHRlciIsIml0ZW1UZW1wbGF0ZSIsIlNpbXBsYXRlIiwidGl0bGVUZXh0IiwicGVyc29uTmFtZVRleHQiLCJxdW90ZU51bWJlclRleHQiLCJpZCIsIm1vZGVsTmFtZSIsIlFVT1RFUEVSU09OIiwicmVzb3VyY2VLaW5kIiwiYWxsb3dTZWxlY3Rpb24iLCJlbmFibGVBY3Rpb25zIiwiZXhwb3NlIiwic2VjdXJpdHkiLCJpbnNlcnRTZWN1cml0eSIsIml0ZW1JY29uQ2xhc3MiLCJlbmFibGVEeW5hbWljR3JvdXBMYXlvdXQiLCJncm91cHNFbmFibGVkIiwiZW50aXR5TmFtZSIsImZvcm1hdFNlYXJjaFF1ZXJ5Iiwic2VhcmNoUXVlcnkiLCJxIiwiZXNjYXBlU2VhcmNoUXVlcnkiLCJ0b1VwcGVyQ2FzZSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsTUFBTUEsV0FBVyxvQkFBWSxpQkFBWixDQUFqQixDLENBekJBOzs7Ozs7Ozs7Ozs7Ozs7QUEyQkEsTUFBTUMsVUFBVSx1QkFBUSw4Q0FBUixFQUF3RCxxR0FBeEQsRUFBMEg7QUFDeElDLCtCQUR3STtBQUV4STtBQUNBQyxrQkFBYyxJQUFJQyxRQUFKLENBQWEsQ0FDekIsNEdBRHlCLEVBRXpCLG1IQUZ5QixDQUFiLENBSDBIOztBQVF4STtBQUNBQyxlQUFXTCxTQUFTSyxTQVRvSDtBQVV4SUMsb0JBQWdCTixTQUFTTSxjQVYrRztBQVd4SUMscUJBQWlCUCxTQUFTTyxlQVg4Rzs7QUFheEk7QUFDQUMsUUFBSSxrQkFkb0k7QUFleElDLGVBQVcsZ0JBQVlDLFdBZmlIO0FBZ0J4SUMsa0JBQWMsY0FoQjBIO0FBaUJ4SUMsb0JBQWdCLElBakJ3SDtBQWtCeElDLG1CQUFlLEtBbEJ5SDtBQW1CeElDLFlBQVEsS0FuQmdJO0FBb0J4SUMsY0FBVSx5QkFwQjhIO0FBcUJ4SUMsb0JBQWdCLHdCQXJCd0g7O0FBdUJ4STtBQUNBQyxtQkFBZSxFQXhCeUg7O0FBMEJ4STtBQUNBQyw4QkFBMEIsS0EzQjhHO0FBNEJ4SUMsbUJBQWUsS0E1QnlIOztBQThCeEk7QUFDQUMsZ0JBQVksY0EvQjRIOztBQWlDeElDLHVCQUFtQixTQUFTQSxpQkFBVCxDQUEyQkMsV0FBM0IsRUFBd0M7QUFDekQsVUFBTUMsSUFBSSxLQUFLQyxpQkFBTCxDQUF1QkYsWUFBWUcsV0FBWixFQUF2QixDQUFWO0FBQ0EsaURBQXlDRixDQUF6Qyx1Q0FBNEVBLENBQTVFO0FBQ0Q7QUFwQ3VJLEdBQTFILENBQWhCOztBQXVDQSxpQkFBS0csU0FBTCxDQUFlLCtCQUFmLEVBQWdEekIsT0FBaEQ7b0JBQ2VBLE8iLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBMaXN0IGZyb20gJ2FyZ29zL0xpc3QnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJ2NybS9Gb3JtYXQnO1xyXG5pbXBvcnQgX1JpZ2h0RHJhd2VyTGlzdE1peGluIGZyb20gJ2NybS9WaWV3cy9fUmlnaHREcmF3ZXJMaXN0TWl4aW4nO1xyXG5pbXBvcnQgX01ldHJpY0xpc3RNaXhpbiBmcm9tICdjcm0vVmlld3MvX01ldHJpY0xpc3RNaXhpbic7XHJcbmltcG9ydCBfR3JvdXBMaXN0TWl4aW4gZnJvbSAnY3JtL1ZpZXdzL19Hcm91cExpc3RNaXhpbic7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi8uLi9Nb2RlbHMvTmFtZXMnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdxdW90ZVBlcnNvbkxpc3QnKTtcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5WaWV3cy5RdW90ZVBlcnNvbnMuTGlzdCcsIFtMaXN0LCBfUmlnaHREcmF3ZXJMaXN0TWl4aW4sIF9NZXRyaWNMaXN0TWl4aW4sIF9Hcm91cExpc3RNaXhpbl0sIHtcclxuICBmb3JtYXR0ZXI6IGZvcm1hdCxcclxuICAvLyBUZW1wbGF0ZXNcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQucGVyc29uTmFtZVRleHQgJX08L2xhYmVsPiB7JTogJC5QZXJzb24uTmFtZSAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLnF1b3RlTnVtYmVyVGV4dCAlfTwvbGFiZWw+IHslOiAkLlF1b3RlLlF1b3RlTnVtYmVyICV9PC9wPicsXHJcbiAgXSksXHJcblxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIHBlcnNvbk5hbWVUZXh0OiByZXNvdXJjZS5wZXJzb25OYW1lVGV4dCxcclxuICBxdW90ZU51bWJlclRleHQ6IHJlc291cmNlLnF1b3RlTnVtYmVyVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdxdW90ZVBlcnNvbl9saXN0JyxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLlFVT1RFUEVSU09OLFxyXG4gIHJlc291cmNlS2luZDogJ3F1b3RlUGVyc29ucycsXHJcbiAgYWxsb3dTZWxlY3Rpb246IHRydWUsXHJcbiAgZW5hYmxlQWN0aW9uczogZmFsc2UsXHJcbiAgZXhwb3NlOiBmYWxzZSxcclxuICBzZWN1cml0eTogJ0VudGl0aWVzL0VycFBlcnNvbi9WaWV3JyxcclxuICBpbnNlcnRTZWN1cml0eTogJ0VudGl0aWVzL0VycFBlcnNvbi9BZGQnLFxyXG5cclxuICAvLyBDYXJkIGxheW91dFxyXG4gIGl0ZW1JY29uQ2xhc3M6ICcnLFxyXG5cclxuICAvLyBHcm91cHNcclxuICBlbmFibGVEeW5hbWljR3JvdXBMYXlvdXQ6IGZhbHNlLFxyXG4gIGdyb3Vwc0VuYWJsZWQ6IGZhbHNlLFxyXG5cclxuICAvLyBNZXRyaWNzXHJcbiAgZW50aXR5TmFtZTogJ1F1b3RlIFBlcnNvbicsXHJcblxyXG4gIGZvcm1hdFNlYXJjaFF1ZXJ5OiBmdW5jdGlvbiBmb3JtYXRTZWFyY2hRdWVyeShzZWFyY2hRdWVyeSkge1xyXG4gICAgY29uc3QgcSA9IHRoaXMuZXNjYXBlU2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkudG9VcHBlckNhc2UoKSk7XHJcbiAgICByZXR1cm4gYHVwcGVyKFF1b3RlLlF1b3RlTnVtYmVyKSBsaWtlIFwiJHtxfSVcIiBvciB1cHBlcihQZXJzb24uTmFtZSkgbGlrZSBcIiR7cX0lXCJgO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLlZpZXdzLlF1b3RlUGVyc29ucy5MaXN0JywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==