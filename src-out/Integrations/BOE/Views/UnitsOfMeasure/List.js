define('crm/Integrations/BOE/Views/UnitsOfMeasure/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'crm/Format', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _List, _Format, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _List2 = _interopRequireDefault(_List);

  var _Format2 = _interopRequireDefault(_Format);

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

  var resource = (0, _I18n2.default)('unitsOfMeasureList');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.UnitsOfMeasure.List', [_List2.default], {
    formatter: _Format2.default,
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.Name %}</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'unitofmeasure_list',
    detailView: '',
    modelName: _Names2.default.UNITOFMEASURE,
    resourceKind: 'unitsOfMeasure',
    enableActions: false,
    expose: false,

    // Card layout
    itemIconClass: '',

    // Metrics
    entityName: 'Unit of Measure',

    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {});
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(Name) like "' + q + '%"';
    }
  });

  _lang2.default.setObject('icboe.Views.UnitsOfMeasure.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL1VuaXRzT2ZNZWFzdXJlL0xpc3QuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiZm9ybWF0dGVyIiwiaXRlbVRlbXBsYXRlIiwiU2ltcGxhdGUiLCJ0aXRsZVRleHQiLCJpZCIsImRldGFpbFZpZXciLCJtb2RlbE5hbWUiLCJVTklUT0ZNRUFTVVJFIiwicmVzb3VyY2VLaW5kIiwiZW5hYmxlQWN0aW9ucyIsImV4cG9zZSIsIml0ZW1JY29uQ2xhc3MiLCJlbnRpdHlOYW1lIiwiY3JlYXRlVG9vbExheW91dCIsInRvb2xzIiwiZm9ybWF0U2VhcmNoUXVlcnkiLCJzZWFyY2hRdWVyeSIsInEiLCJlc2NhcGVTZWFyY2hRdWVyeSIsInRvVXBwZXJDYXNlIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsTUFBTUEsV0FBVyxvQkFBWSxvQkFBWixDQUFqQjs7QUFFQSxNQUFNQyxVQUFVLHVCQUFRLGdEQUFSLEVBQTBELGdCQUExRCxFQUFrRTtBQUNoRkMsK0JBRGdGO0FBRWhGO0FBQ0FDLGtCQUFjLElBQUlDLFFBQUosQ0FBYSxDQUN6QiwrQ0FEeUIsQ0FBYixDQUhrRTs7QUFPaEY7QUFDQUMsZUFBV0wsU0FBU0ssU0FSNEQ7O0FBVWhGO0FBQ0FDLFFBQUksb0JBWDRFO0FBWWhGQyxnQkFBWSxFQVpvRTtBQWFoRkMsZUFBVyxnQkFBWUMsYUFieUQ7QUFjaEZDLGtCQUFjLGdCQWRrRTtBQWVoRkMsbUJBQWUsS0FmaUU7QUFnQmhGQyxZQUFRLEtBaEJ3RTs7QUFrQmhGO0FBQ0FDLG1CQUFlLEVBbkJpRTs7QUFxQmhGO0FBQ0FDLGdCQUFZLGlCQXRCb0U7O0FBd0JoRkMsc0JBQWtCLFNBQVNBLGdCQUFULEdBQTRCO0FBQzVDLGFBQU8sS0FBS0MsS0FBTCxLQUFlLEtBQUtBLEtBQUwsR0FBYSxFQUE1QixDQUFQO0FBRUQsS0EzQitFO0FBNEJoRkMsdUJBQW1CLFNBQVNBLGlCQUFULENBQTJCQyxXQUEzQixFQUF3QztBQUN6RCxVQUFNQyxJQUFJLEtBQUtDLGlCQUFMLENBQXVCRixZQUFZRyxXQUFaLEVBQXZCLENBQVY7QUFDQSxvQ0FBNEJGLENBQTVCO0FBQ0Q7QUEvQitFLEdBQWxFLENBQWhCOztBQWtDQSxpQkFBS0csU0FBTCxDQUFlLGlDQUFmLEVBQWtEckIsT0FBbEQ7b0JBQ2VBLE8iLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBMaXN0IGZyb20gJ2FyZ29zL0xpc3QnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJ2NybS9Gb3JtYXQnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgndW5pdHNPZk1lYXN1cmVMaXN0Jyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuVW5pdHNPZk1lYXN1cmUuTGlzdCcsIFtMaXN0XSwge1xyXG4gIGZvcm1hdHRlcjogZm9ybWF0LFxyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cImxpc3R2aWV3LWhlYWRpbmdcIj57JTogJC5OYW1lICV9PC9wPicsXHJcbiAgXSksXHJcblxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ3VuaXRvZm1lYXN1cmVfbGlzdCcsXHJcbiAgZGV0YWlsVmlldzogJycsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5VTklUT0ZNRUFTVVJFLFxyXG4gIHJlc291cmNlS2luZDogJ3VuaXRzT2ZNZWFzdXJlJyxcclxuICBlbmFibGVBY3Rpb25zOiBmYWxzZSxcclxuICBleHBvc2U6IGZhbHNlLFxyXG5cclxuICAvLyBDYXJkIGxheW91dFxyXG4gIGl0ZW1JY29uQ2xhc3M6ICcnLFxyXG5cclxuICAvLyBNZXRyaWNzXHJcbiAgZW50aXR5TmFtZTogJ1VuaXQgb2YgTWVhc3VyZScsXHJcblxyXG4gIGNyZWF0ZVRvb2xMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZVRvb2xMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50b29scyB8fCAodGhpcy50b29scyA9IHtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZm9ybWF0U2VhcmNoUXVlcnk6IGZ1bmN0aW9uIGZvcm1hdFNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5KSB7XHJcbiAgICBjb25zdCBxID0gdGhpcy5lc2NhcGVTZWFyY2hRdWVyeShzZWFyY2hRdWVyeS50b1VwcGVyQ2FzZSgpKTtcclxuICAgIHJldHVybiBgdXBwZXIoTmFtZSkgbGlrZSBcIiR7cX0lXCJgO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLlZpZXdzLlVuaXRzT2ZNZWFzdXJlLkxpc3QnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19