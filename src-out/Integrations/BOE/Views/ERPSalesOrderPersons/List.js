define('crm/Integrations/BOE/Views/ERPSalesOrderPersons/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'crm/Views/_RightDrawerListMixin', 'crm/Views/_MetricListMixin', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _List, _RightDrawerListMixin2, _MetricListMixin2, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _List2 = _interopRequireDefault(_List);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _Names2 = _interopRequireDefault(_Names);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('erpSalesOrderPersonsList'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPSalesOrderPersons.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default], {
    // Templates
    // TODO: Need template from PM
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.ErpPerson.Name %}</p>', '<p class="micro-text address">{%: $.ErpPerson.Address.FullAddress %}</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'erpsalesorderperson_list',
    modelName: _Names2.default.ERPSALESORDERPERSON,
    resourceKind: 'erpSalesOrderPersons',
    allowSelection: true,
    enableActions: true,
    security: 'Entities/ErpPerson/View',
    insertSecurity: 'Entities/ErpPerson/Add',

    // Card layout
    itemIconClass: 'user',

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(ErpPerson.Name) like "%' + q + '%"';
    }
  });

  _lang2.default.setObject('icboe.Views.ERPSalesOrderPersons.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0VSUFNhbGVzT3JkZXJQZXJzb25zL0xpc3QuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiaXRlbVRlbXBsYXRlIiwiU2ltcGxhdGUiLCJ0aXRsZVRleHQiLCJpZCIsIm1vZGVsTmFtZSIsIkVSUFNBTEVTT1JERVJQRVJTT04iLCJyZXNvdXJjZUtpbmQiLCJhbGxvd1NlbGVjdGlvbiIsImVuYWJsZUFjdGlvbnMiLCJzZWN1cml0eSIsImluc2VydFNlY3VyaXR5IiwiaXRlbUljb25DbGFzcyIsImZvcm1hdFNlYXJjaFF1ZXJ5Iiwic2VhcmNoUXVlcnkiLCJxIiwiZXNjYXBlU2VhcmNoUXVlcnkiLCJ0b1VwcGVyQ2FzZSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxNQUFNQSxXQUFXLG9CQUFZLDBCQUFaLENBQWpCLEMsQ0F2QkE7Ozs7Ozs7Ozs7Ozs7OztBQXlCQSxNQUFNQyxVQUFVLHVCQUFRLHNEQUFSLEVBQWdFLDJFQUFoRSxFQUFpSDtBQUMvSDtBQUNBO0FBQ0FDLGtCQUFjLElBQUlDLFFBQUosQ0FBYSxDQUN6Qix5REFEeUIsRUFFekIsMEVBRnlCLENBQWIsQ0FIaUg7O0FBUS9IO0FBQ0FDLGVBQVdKLFNBQVNJLFNBVDJHOztBQVcvSDtBQUNBQyxRQUFJLDBCQVoySDtBQWEvSEMsZUFBVyxnQkFBWUMsbUJBYndHO0FBYy9IQyxrQkFBYyxzQkFkaUg7QUFlL0hDLG9CQUFnQixJQWYrRztBQWdCL0hDLG1CQUFlLElBaEJnSDtBQWlCL0hDLGNBQVUseUJBakJxSDtBQWtCL0hDLG9CQUFnQix3QkFsQitHOztBQW9CL0g7QUFDQUMsbUJBQWUsTUFyQmdIOztBQXVCL0hDLHVCQUFtQixTQUFTQSxpQkFBVCxDQUEyQkMsV0FBM0IsRUFBd0M7QUFDekQsVUFBTUMsSUFBSSxLQUFLQyxpQkFBTCxDQUF1QkYsWUFBWUcsV0FBWixFQUF2QixDQUFWO0FBQ0EsK0NBQXVDRixDQUF2QztBQUNEO0FBMUI4SCxHQUFqSCxDQUFoQjs7QUE2QkEsaUJBQUtHLFNBQUwsQ0FBZSx1Q0FBZixFQUF3RGxCLE9BQXhEO29CQUNlQSxPIiwiZmlsZSI6Ikxpc3QuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuaW1wb3J0IF9SaWdodERyYXdlckxpc3RNaXhpbiBmcm9tICdjcm0vVmlld3MvX1JpZ2h0RHJhd2VyTGlzdE1peGluJztcclxuaW1wb3J0IF9NZXRyaWNMaXN0TWl4aW4gZnJvbSAnY3JtL1ZpZXdzL19NZXRyaWNMaXN0TWl4aW4nO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXJwU2FsZXNPcmRlclBlcnNvbnNMaXN0Jyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuRVJQU2FsZXNPcmRlclBlcnNvbnMuTGlzdCcsIFtMaXN0LCBfUmlnaHREcmF3ZXJMaXN0TWl4aW4sIF9NZXRyaWNMaXN0TWl4aW5dLCB7XHJcbiAgLy8gVGVtcGxhdGVzXHJcbiAgLy8gVE9ETzogTmVlZCB0ZW1wbGF0ZSBmcm9tIFBNXHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxwIGNsYXNzPVwibGlzdHZpZXctaGVhZGluZ1wiPnslOiAkLkVycFBlcnNvbi5OYW1lICV9PC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0IGFkZHJlc3NcIj57JTogJC5FcnBQZXJzb24uQWRkcmVzcy5GdWxsQWRkcmVzcyAlfTwvcD4nLFxyXG4gIF0pLFxyXG5cclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdlcnBzYWxlc29yZGVycGVyc29uX2xpc3QnLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuRVJQU0FMRVNPUkRFUlBFUlNPTixcclxuICByZXNvdXJjZUtpbmQ6ICdlcnBTYWxlc09yZGVyUGVyc29ucycsXHJcbiAgYWxsb3dTZWxlY3Rpb246IHRydWUsXHJcbiAgZW5hYmxlQWN0aW9uczogdHJ1ZSxcclxuICBzZWN1cml0eTogJ0VudGl0aWVzL0VycFBlcnNvbi9WaWV3JyxcclxuICBpbnNlcnRTZWN1cml0eTogJ0VudGl0aWVzL0VycFBlcnNvbi9BZGQnLFxyXG5cclxuICAvLyBDYXJkIGxheW91dFxyXG4gIGl0ZW1JY29uQ2xhc3M6ICd1c2VyJyxcclxuXHJcbiAgZm9ybWF0U2VhcmNoUXVlcnk6IGZ1bmN0aW9uIGZvcm1hdFNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5KSB7XHJcbiAgICBjb25zdCBxID0gdGhpcy5lc2NhcGVTZWFyY2hRdWVyeShzZWFyY2hRdWVyeS50b1VwcGVyQ2FzZSgpKTtcclxuICAgIHJldHVybiBgdXBwZXIoRXJwUGVyc29uLk5hbWUpIGxpa2UgXCIlJHtxfSVcImA7XHJcbiAgfSxcclxufSk7XHJcblxyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuVmlld3MuRVJQU2FsZXNPcmRlclBlcnNvbnMuTGlzdCcsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=