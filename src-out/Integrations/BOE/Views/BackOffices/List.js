define('crm/Integrations/BOE/Views/BackOffices/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _List, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('backOfficesList'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.BackOffices.List', [_List2.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.BackOfficeName %}</p>', '<p class="micro-text">{%: $.LogicalId %}</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'backoffices_list',
    detailView: '',
    modelName: _Names2.default.BACKOFFICE,
    resourceKind: 'backOffices',
    enableActions: false,
    expose: false,
    security: 'Entities/BackOffice/View',
    insertSecurity: 'Entities/BackOffice/Add',

    // Card layout
    itemIconClass: '',

    // Metrics
    entityName: 'BackOffice',

    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {});
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(BackOfficeName) like "' + q + '%" or upper(LogicalId) like "' + q + '%"';
    }
  });

  _lang2.default.setObject('icboe.Views.BackOffices.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0JhY2tPZmZpY2VzL0xpc3QuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiaXRlbVRlbXBsYXRlIiwiU2ltcGxhdGUiLCJ0aXRsZVRleHQiLCJpZCIsImRldGFpbFZpZXciLCJtb2RlbE5hbWUiLCJCQUNLT0ZGSUNFIiwicmVzb3VyY2VLaW5kIiwiZW5hYmxlQWN0aW9ucyIsImV4cG9zZSIsInNlY3VyaXR5IiwiaW5zZXJ0U2VjdXJpdHkiLCJpdGVtSWNvbkNsYXNzIiwiZW50aXR5TmFtZSIsImNyZWF0ZVRvb2xMYXlvdXQiLCJ0b29scyIsImZvcm1hdFNlYXJjaFF1ZXJ5Iiwic2VhcmNoUXVlcnkiLCJxIiwiZXNjYXBlU2VhcmNoUXVlcnkiLCJ0b1VwcGVyQ2FzZSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU1BLFdBQVcsb0JBQVksaUJBQVosQ0FBakIsQyxDQXJCQTs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE1BQU1DLFVBQVUsdUJBQVEsNkNBQVIsRUFBdUQsZ0JBQXZELEVBQStEO0FBQzdFO0FBQ0FDLGtCQUFjLElBQUlDLFFBQUosQ0FBYSxDQUN6Qix5REFEeUIsRUFFekIsOENBRnlCLENBQWIsQ0FGK0Q7O0FBTzdFO0FBQ0FDLGVBQVdKLFNBQVNJLFNBUnlEOztBQVU3RTtBQUNBQyxRQUFJLGtCQVh5RTtBQVk3RUMsZ0JBQVksRUFaaUU7QUFhN0VDLGVBQVcsZ0JBQVlDLFVBYnNEO0FBYzdFQyxrQkFBYyxhQWQrRDtBQWU3RUMsbUJBQWUsS0FmOEQ7QUFnQjdFQyxZQUFRLEtBaEJxRTtBQWlCN0VDLGNBQVUsMEJBakJtRTtBQWtCN0VDLG9CQUFnQix5QkFsQjZEOztBQW9CN0U7QUFDQUMsbUJBQWUsRUFyQjhEOztBQXVCN0U7QUFDQUMsZ0JBQVksWUF4QmlFOztBQTBCN0VDLHNCQUFrQixTQUFTQSxnQkFBVCxHQUE0QjtBQUM1QyxhQUFPLEtBQUtDLEtBQUwsS0FBZSxLQUFLQSxLQUFMLEdBQWEsRUFBNUIsQ0FBUDtBQUVELEtBN0I0RTtBQThCN0VDLHVCQUFtQixTQUFTQSxpQkFBVCxDQUEyQkMsV0FBM0IsRUFBd0M7QUFDekQsVUFBTUMsSUFBSSxLQUFLQyxpQkFBTCxDQUF1QkYsWUFBWUcsV0FBWixFQUF2QixDQUFWO0FBQ0EsOENBQXNDRixDQUF0QyxxQ0FBdUVBLENBQXZFO0FBQ0Q7QUFqQzRFLEdBQS9ELENBQWhCOztBQW9DQSxpQkFBS0csU0FBTCxDQUFlLDhCQUFmLEVBQStDdEIsT0FBL0M7b0JBQ2VBLE8iLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBMaXN0IGZyb20gJ2FyZ29zL0xpc3QnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYmFja09mZmljZXNMaXN0Jyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuQmFja09mZmljZXMuTGlzdCcsIFtMaXN0XSwge1xyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cImxpc3R2aWV3LWhlYWRpbmdcIj57JTogJC5CYWNrT2ZmaWNlTmFtZSAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPnslOiAkLkxvZ2ljYWxJZCAlfTwvcD4nLFxyXG4gIF0pLFxyXG5cclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdiYWNrb2ZmaWNlc19saXN0JyxcclxuICBkZXRhaWxWaWV3OiAnJyxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLkJBQ0tPRkZJQ0UsXHJcbiAgcmVzb3VyY2VLaW5kOiAnYmFja09mZmljZXMnLFxyXG4gIGVuYWJsZUFjdGlvbnM6IGZhbHNlLFxyXG4gIGV4cG9zZTogZmFsc2UsXHJcbiAgc2VjdXJpdHk6ICdFbnRpdGllcy9CYWNrT2ZmaWNlL1ZpZXcnLFxyXG4gIGluc2VydFNlY3VyaXR5OiAnRW50aXRpZXMvQmFja09mZmljZS9BZGQnLFxyXG5cclxuICAvLyBDYXJkIGxheW91dFxyXG4gIGl0ZW1JY29uQ2xhc3M6ICcnLFxyXG5cclxuICAvLyBNZXRyaWNzXHJcbiAgZW50aXR5TmFtZTogJ0JhY2tPZmZpY2UnLFxyXG5cclxuICBjcmVhdGVUb29sTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVUb29sTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudG9vbHMgfHwgKHRoaXMudG9vbHMgPSB7XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGZvcm1hdFNlYXJjaFF1ZXJ5OiBmdW5jdGlvbiBmb3JtYXRTZWFyY2hRdWVyeShzZWFyY2hRdWVyeSkge1xyXG4gICAgY29uc3QgcSA9IHRoaXMuZXNjYXBlU2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkudG9VcHBlckNhc2UoKSk7XHJcbiAgICByZXR1cm4gYHVwcGVyKEJhY2tPZmZpY2VOYW1lKSBsaWtlIFwiJHtxfSVcIiBvciB1cHBlcihMb2dpY2FsSWQpIGxpa2UgXCIke3F9JVwiYDtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5WaWV3cy5CYWNrT2ZmaWNlcy5MaXN0JywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==