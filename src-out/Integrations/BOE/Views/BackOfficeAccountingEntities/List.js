define('crm/Integrations/BOE/Views/BackOfficeAccountingEntities/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _List, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('backOfficeAccountingEntitiesList'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.BackOfficeAccountingEntities.List', [_List2.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.Name %}</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'backofficeaccountingentities_list',
    detailView: '',
    modelName: _Names2.default.BACKOFFICEACCOUNTINGENTITY,
    resourceKind: 'backOfficeAccountingEntities',
    enableActions: false,
    expose: false,
    security: 'Entities/BackOfficeAcctEntity/View',
    insertSecurity: 'Entities/BackOfficeAcctEntity/Add',

    // Card layout
    itemIconClass: '',

    // Metrics
    entityName: 'BackOfficeAccountingEntities',

    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {});
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(Name) like "' + q + '%"';
    }
  });

  _lang2.default.setObject('icboe.Views.BackOfficeAccountingEntities.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0JhY2tPZmZpY2VBY2NvdW50aW5nRW50aXRpZXMvTGlzdC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJpdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsInRpdGxlVGV4dCIsImlkIiwiZGV0YWlsVmlldyIsIm1vZGVsTmFtZSIsIkJBQ0tPRkZJQ0VBQ0NPVU5USU5HRU5USVRZIiwicmVzb3VyY2VLaW5kIiwiZW5hYmxlQWN0aW9ucyIsImV4cG9zZSIsInNlY3VyaXR5IiwiaW5zZXJ0U2VjdXJpdHkiLCJpdGVtSWNvbkNsYXNzIiwiZW50aXR5TmFtZSIsImNyZWF0ZVRvb2xMYXlvdXQiLCJ0b29scyIsImZvcm1hdFNlYXJjaFF1ZXJ5Iiwic2VhcmNoUXVlcnkiLCJxIiwiZXNjYXBlU2VhcmNoUXVlcnkiLCJ0b1VwcGVyQ2FzZSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU1BLFdBQVcsb0JBQVksa0NBQVosQ0FBakIsQyxDQXJCQTs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE1BQU1DLFVBQVUsdUJBQVEsOERBQVIsRUFBd0UsZ0JBQXhFLEVBQWdGO0FBQzlGO0FBQ0FDLGtCQUFjLElBQUlDLFFBQUosQ0FBYSxDQUN6QiwrQ0FEeUIsQ0FBYixDQUZnRjs7QUFNOUY7QUFDQUMsZUFBV0osU0FBU0ksU0FQMEU7O0FBUzlGO0FBQ0FDLFFBQUksbUNBVjBGO0FBVzlGQyxnQkFBWSxFQVhrRjtBQVk5RkMsZUFBVyxnQkFBWUMsMEJBWnVFO0FBYTlGQyxrQkFBYyw4QkFiZ0Y7QUFjOUZDLG1CQUFlLEtBZCtFO0FBZTlGQyxZQUFRLEtBZnNGO0FBZ0I5RkMsY0FBVSxvQ0FoQm9GO0FBaUI5RkMsb0JBQWdCLG1DQWpCOEU7O0FBbUI5RjtBQUNBQyxtQkFBZSxFQXBCK0U7O0FBc0I5RjtBQUNBQyxnQkFBWSw4QkF2QmtGOztBQXlCOUZDLHNCQUFrQixTQUFTQSxnQkFBVCxHQUE0QjtBQUM1QyxhQUFPLEtBQUtDLEtBQUwsS0FBZSxLQUFLQSxLQUFMLEdBQWEsRUFBNUIsQ0FBUDtBQUVELEtBNUI2RjtBQTZCOUZDLHVCQUFtQixTQUFTQSxpQkFBVCxDQUEyQkMsV0FBM0IsRUFBd0M7QUFDekQsVUFBTUMsSUFBSSxLQUFLQyxpQkFBTCxDQUF1QkYsWUFBWUcsV0FBWixFQUF2QixDQUFWO0FBQ0Esb0NBQTRCRixDQUE1QjtBQUNEO0FBaEM2RixHQUFoRixDQUFoQjs7QUFtQ0EsaUJBQUtHLFNBQUwsQ0FBZSwrQ0FBZixFQUFnRXRCLE9BQWhFO29CQUNlQSxPIiwiZmlsZSI6Ikxpc3QuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2JhY2tPZmZpY2VBY2NvdW50aW5nRW50aXRpZXNMaXN0Jyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuQmFja09mZmljZUFjY291bnRpbmdFbnRpdGllcy5MaXN0JywgW0xpc3RdLCB7XHJcbiAgLy8gVGVtcGxhdGVzXHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxwIGNsYXNzPVwibGlzdHZpZXctaGVhZGluZ1wiPnslOiAkLk5hbWUgJX08L3A+JyxcclxuICBdKSxcclxuXHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnYmFja29mZmljZWFjY291bnRpbmdlbnRpdGllc19saXN0JyxcclxuICBkZXRhaWxWaWV3OiAnJyxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLkJBQ0tPRkZJQ0VBQ0NPVU5USU5HRU5USVRZLFxyXG4gIHJlc291cmNlS2luZDogJ2JhY2tPZmZpY2VBY2NvdW50aW5nRW50aXRpZXMnLFxyXG4gIGVuYWJsZUFjdGlvbnM6IGZhbHNlLFxyXG4gIGV4cG9zZTogZmFsc2UsXHJcbiAgc2VjdXJpdHk6ICdFbnRpdGllcy9CYWNrT2ZmaWNlQWNjdEVudGl0eS9WaWV3JyxcclxuICBpbnNlcnRTZWN1cml0eTogJ0VudGl0aWVzL0JhY2tPZmZpY2VBY2N0RW50aXR5L0FkZCcsXHJcblxyXG4gIC8vIENhcmQgbGF5b3V0XHJcbiAgaXRlbUljb25DbGFzczogJycsXHJcblxyXG4gIC8vIE1ldHJpY3NcclxuICBlbnRpdHlOYW1lOiAnQmFja09mZmljZUFjY291bnRpbmdFbnRpdGllcycsXHJcblxyXG4gIGNyZWF0ZVRvb2xMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZVRvb2xMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50b29scyB8fCAodGhpcy50b29scyA9IHtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZm9ybWF0U2VhcmNoUXVlcnk6IGZ1bmN0aW9uIGZvcm1hdFNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5KSB7XHJcbiAgICBjb25zdCBxID0gdGhpcy5lc2NhcGVTZWFyY2hRdWVyeShzZWFyY2hRdWVyeS50b1VwcGVyQ2FzZSgpKTtcclxuICAgIHJldHVybiBgdXBwZXIoTmFtZSkgbGlrZSBcIiR7cX0lXCJgO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLlZpZXdzLkJhY2tPZmZpY2VBY2NvdW50aW5nRW50aXRpZXMuTGlzdCcsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=