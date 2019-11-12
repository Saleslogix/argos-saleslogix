define('crm/Integrations/BOE/Views/ERPBillTos/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'crm/Views/_RightDrawerListMixin', 'crm/Views/_MetricListMixin', 'crm/Views/_GroupListMixin', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _List, _RightDrawerListMixin2, _MetricListMixin2, _GroupListMixin2, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _List2 = _interopRequireDefault(_List);

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

  var resource = (0, _I18n2.default)('erpBillTosList');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ErpBillTos.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default, _GroupListMixin3.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.Name %}</p>', '<p class="listview-heading address">{%: $.Address.FullAddress %}</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'erpbillto_list',
    detailView: 'erpbillto_detail',
    insertView: 'erpbillto_edit',
    allowSelection: true,
    enableActions: false,
    expose: false,
    modelName: _Names2.default.ERPBILLTO,
    resourceKind: 'erpBillTos',
    security: 'Entities/ErpBillTo/View',
    insertSecurity: 'Entities/ErpBillTo/Add',

    // Card layout
    itemIconClass: '',

    // Groups
    enableDynamicGroupLayout: true,
    groupsEnabled: true,

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(Name) like "%' + q + '%"';
    }
  });

  _lang2.default.setObject('icboe.Views.ErpBillTos.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0VSUEJpbGxUb3MvTGlzdC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJpdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsInRpdGxlVGV4dCIsImlkIiwiZGV0YWlsVmlldyIsImluc2VydFZpZXciLCJhbGxvd1NlbGVjdGlvbiIsImVuYWJsZUFjdGlvbnMiLCJleHBvc2UiLCJtb2RlbE5hbWUiLCJFUlBCSUxMVE8iLCJyZXNvdXJjZUtpbmQiLCJzZWN1cml0eSIsImluc2VydFNlY3VyaXR5IiwiaXRlbUljb25DbGFzcyIsImVuYWJsZUR5bmFtaWNHcm91cExheW91dCIsImdyb3Vwc0VuYWJsZWQiLCJmb3JtYXRTZWFyY2hRdWVyeSIsInNlYXJjaFF1ZXJ5IiwicSIsImVzY2FwZVNlYXJjaFF1ZXJ5IiwidG9VcHBlckNhc2UiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsTUFBTUEsV0FBVyxvQkFBWSxnQkFBWixDQUFqQjs7QUFFQSxNQUFNQyxVQUFVLHVCQUFRLDRDQUFSLEVBQXNELHFHQUF0RCxFQUF3SDtBQUN0STtBQUNBQyxrQkFBYyxJQUFJQyxRQUFKLENBQWEsQ0FDekIsK0NBRHlCLEVBRXpCLHNFQUZ5QixDQUFiLENBRndIOztBQU90STtBQUNBQyxlQUFXSixTQUFTSSxTQVJrSDs7QUFVdEk7QUFDQUMsUUFBSSxnQkFYa0k7QUFZdElDLGdCQUFZLGtCQVowSDtBQWF0SUMsZ0JBQVksZ0JBYjBIO0FBY3RJQyxvQkFBZ0IsSUFkc0g7QUFldElDLG1CQUFlLEtBZnVIO0FBZ0J0SUMsWUFBUSxLQWhCOEg7QUFpQnRJQyxlQUFXLGdCQUFZQyxTQWpCK0c7QUFrQnRJQyxrQkFBYyxZQWxCd0g7QUFtQnRJQyxjQUFVLHlCQW5CNEg7QUFvQnRJQyxvQkFBZ0Isd0JBcEJzSDs7QUFzQnRJO0FBQ0FDLG1CQUFlLEVBdkJ1SDs7QUF5QnRJO0FBQ0FDLDhCQUEwQixJQTFCNEc7QUEyQnRJQyxtQkFBZSxJQTNCdUg7O0FBNkJ0SUMsdUJBQW1CLFNBQVNBLGlCQUFULENBQTJCQyxXQUEzQixFQUF3QztBQUN6RCxVQUFNQyxJQUFJLEtBQUtDLGlCQUFMLENBQXVCRixZQUFZRyxXQUFaLEVBQXZCLENBQVY7QUFDQSxxQ0FBNkJGLENBQTdCO0FBQ0Q7QUFoQ3FJLEdBQXhILENBQWhCOztBQW1DQSxpQkFBS0csU0FBTCxDQUFlLDZCQUFmLEVBQThDdkIsT0FBOUM7b0JBQ2VBLE8iLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBMaXN0IGZyb20gJ2FyZ29zL0xpc3QnO1xyXG5pbXBvcnQgX1JpZ2h0RHJhd2VyTGlzdE1peGluIGZyb20gJ2NybS9WaWV3cy9fUmlnaHREcmF3ZXJMaXN0TWl4aW4nO1xyXG5pbXBvcnQgX01ldHJpY0xpc3RNaXhpbiBmcm9tICdjcm0vVmlld3MvX01ldHJpY0xpc3RNaXhpbic7XHJcbmltcG9ydCBfR3JvdXBMaXN0TWl4aW4gZnJvbSAnY3JtL1ZpZXdzL19Hcm91cExpc3RNaXhpbic7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi8uLi9Nb2RlbHMvTmFtZXMnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdlcnBCaWxsVG9zTGlzdCcpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLkVycEJpbGxUb3MuTGlzdCcsIFtMaXN0LCBfUmlnaHREcmF3ZXJMaXN0TWl4aW4sIF9NZXRyaWNMaXN0TWl4aW4sIF9Hcm91cExpc3RNaXhpbl0sIHtcclxuICAvLyBUZW1wbGF0ZXNcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPHAgY2xhc3M9XCJsaXN0dmlldy1oZWFkaW5nXCI+eyU6ICQuTmFtZSAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibGlzdHZpZXctaGVhZGluZyBhZGRyZXNzXCI+eyU6ICQuQWRkcmVzcy5GdWxsQWRkcmVzcyAlfTwvcD4nLFxyXG4gIF0pLFxyXG5cclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdlcnBiaWxsdG9fbGlzdCcsXHJcbiAgZGV0YWlsVmlldzogJ2VycGJpbGx0b19kZXRhaWwnLFxyXG4gIGluc2VydFZpZXc6ICdlcnBiaWxsdG9fZWRpdCcsXHJcbiAgYWxsb3dTZWxlY3Rpb246IHRydWUsXHJcbiAgZW5hYmxlQWN0aW9uczogZmFsc2UsXHJcbiAgZXhwb3NlOiBmYWxzZSxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLkVSUEJJTExUTyxcclxuICByZXNvdXJjZUtpbmQ6ICdlcnBCaWxsVG9zJyxcclxuICBzZWN1cml0eTogJ0VudGl0aWVzL0VycEJpbGxUby9WaWV3JyxcclxuICBpbnNlcnRTZWN1cml0eTogJ0VudGl0aWVzL0VycEJpbGxUby9BZGQnLFxyXG5cclxuICAvLyBDYXJkIGxheW91dFxyXG4gIGl0ZW1JY29uQ2xhc3M6ICcnLFxyXG5cclxuICAvLyBHcm91cHNcclxuICBlbmFibGVEeW5hbWljR3JvdXBMYXlvdXQ6IHRydWUsXHJcbiAgZ3JvdXBzRW5hYmxlZDogdHJ1ZSxcclxuXHJcbiAgZm9ybWF0U2VhcmNoUXVlcnk6IGZ1bmN0aW9uIGZvcm1hdFNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5KSB7XHJcbiAgICBjb25zdCBxID0gdGhpcy5lc2NhcGVTZWFyY2hRdWVyeShzZWFyY2hRdWVyeS50b1VwcGVyQ2FzZSgpKTtcclxuICAgIHJldHVybiBgdXBwZXIoTmFtZSkgbGlrZSBcIiUke3F9JVwiYDtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5WaWV3cy5FcnBCaWxsVG9zLkxpc3QnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19