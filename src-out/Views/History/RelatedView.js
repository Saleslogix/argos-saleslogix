define('crm/Views/History/RelatedView', ['module', 'exports', 'dojo/_base/declare', 'argos/RelatedViewWidget', 'argos/I18n', 'dojo/string', '../../Format'], function (module, exports, _declare, _RelatedViewWidget, _I18n, _string, _Format) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _RelatedViewWidget2 = _interopRequireDefault(_RelatedViewWidget);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _string2 = _interopRequireDefault(_string);

  var _Format2 = _interopRequireDefault(_Format);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('historyRelated');

  /**
   * @class crm.Views.History.RelatedView
   *
   * @extends argos.RelatedViewWidget
   *
   * @requires argos.Convert
   *
   * @requires crm.Format
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

  var __class = (0, _declare2.default)('crm.Views.History.RelatedView', [_RelatedViewWidget2.default], {
    // Localization
    regardingText: resource.regardingText,
    byText: resource.byText,
    titleText: resource.titleText,

    id: 'relatedNotes',
    detailViewId: 'history_detail',
    listViewId: 'history_related',
    listViewWhere: null,
    enabled: true,
    showTab: false,
    enableActions: false,
    showTotalInTab: false,
    hideWhenNoData: true,
    resourceKind: 'history',
    select: ['Type', 'ModifyDate', 'CompleteDate', 'UserName', 'Description', 'Notes', 'AccountName'],
    where: null,
    sort: 'ModifyDate desc',
    pageSize: 3,
    Format: _Format2.default,
    relatedItemIconTemplate: new Simplate(['<div class="user-icon">{%: crm.Format.formatUserInitial($.UserName) %}</div>']),
    relatedItemHeaderTemplate: new Simplate(['<p class="micro-text"><strong>{%: $$.getDescription($) %} </strong></p>', '{% if($.UserName) { %}', '<p class="micro-text">{%= $$.getHeader($) %}</p>', '{% } else { %}', '<p class="micro-text">{%: $$.Format.date($.ModifyDate) %}</p>', '{% } %}']),
    relatedItemDetailTemplate: new Simplate(['<div class="note-text-wrap">', '<p class="micro-text">{%: $.Notes %} ... </p>', '</div>']),
    relatedViewHeaderTemplate: new Simplate(['<div class="line-bar"></div>']),
    getDescription: function getDescription(entry) {
      return entry.Description ? entry.Description : entry.$descriptor;
    },
    getHeader: function getHeader(entry) {
      return _string2.default.substitute(this.byText, [_Format2.default.formatByUser(entry.UserName), _Format2.default.date(entry.ModifyDate)]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9IaXN0b3J5L1JlbGF0ZWRWaWV3LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsInJlZ2FyZGluZ1RleHQiLCJieVRleHQiLCJ0aXRsZVRleHQiLCJpZCIsImRldGFpbFZpZXdJZCIsImxpc3RWaWV3SWQiLCJsaXN0Vmlld1doZXJlIiwiZW5hYmxlZCIsInNob3dUYWIiLCJlbmFibGVBY3Rpb25zIiwic2hvd1RvdGFsSW5UYWIiLCJoaWRlV2hlbk5vRGF0YSIsInJlc291cmNlS2luZCIsInNlbGVjdCIsIndoZXJlIiwic29ydCIsInBhZ2VTaXplIiwiRm9ybWF0IiwicmVsYXRlZEl0ZW1JY29uVGVtcGxhdGUiLCJTaW1wbGF0ZSIsInJlbGF0ZWRJdGVtSGVhZGVyVGVtcGxhdGUiLCJyZWxhdGVkSXRlbURldGFpbFRlbXBsYXRlIiwicmVsYXRlZFZpZXdIZWFkZXJUZW1wbGF0ZSIsImdldERlc2NyaXB0aW9uIiwiZW50cnkiLCJEZXNjcmlwdGlvbiIsIiRkZXNjcmlwdG9yIiwiZ2V0SGVhZGVyIiwic3Vic3RpdHV0ZSIsImZvcm1hdEJ5VXNlciIsIlVzZXJOYW1lIiwiZGF0ZSIsIk1vZGlmeURhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQSxNQUFNQSxXQUFXLG9CQUFZLGdCQUFaLENBQWpCOztBQUVBOzs7Ozs7Ozs7O0FBdkJBOzs7Ozs7Ozs7Ozs7Ozs7QUFpQ0EsTUFBTUMsVUFBVSx1QkFBUSwrQkFBUixFQUF5Qyw2QkFBekMsRUFBOEQ7QUFDNUU7QUFDQUMsbUJBQWVGLFNBQVNFLGFBRm9EO0FBRzVFQyxZQUFRSCxTQUFTRyxNQUgyRDtBQUk1RUMsZUFBV0osU0FBU0ksU0FKd0Q7O0FBTTVFQyxRQUFJLGNBTndFO0FBTzVFQyxrQkFBYyxnQkFQOEQ7QUFRNUVDLGdCQUFZLGlCQVJnRTtBQVM1RUMsbUJBQWUsSUFUNkQ7QUFVNUVDLGFBQVMsSUFWbUU7QUFXNUVDLGFBQVMsS0FYbUU7QUFZNUVDLG1CQUFlLEtBWjZEO0FBYTVFQyxvQkFBZ0IsS0FiNEQ7QUFjNUVDLG9CQUFnQixJQWQ0RDtBQWU1RUMsa0JBQWMsU0FmOEQ7QUFnQjVFQyxZQUFRLENBQUMsTUFBRCxFQUFTLFlBQVQsRUFBdUIsY0FBdkIsRUFBdUMsVUFBdkMsRUFBbUQsYUFBbkQsRUFBa0UsT0FBbEUsRUFBMkUsYUFBM0UsQ0FoQm9FO0FBaUI1RUMsV0FBTyxJQWpCcUU7QUFrQjVFQyxVQUFNLGlCQWxCc0U7QUFtQjVFQyxjQUFVLENBbkJrRTtBQW9CNUVDLDRCQXBCNEU7QUFxQjVFQyw2QkFBeUIsSUFBSUMsUUFBSixDQUFhLENBQ3BDLDhFQURvQyxDQUFiLENBckJtRDtBQXdCNUVDLCtCQUEyQixJQUFJRCxRQUFKLENBQWEsQ0FDdEMseUVBRHNDLEVBRXRDLHdCQUZzQyxFQUd0QyxrREFIc0MsRUFJdEMsZ0JBSnNDLEVBS3RDLCtEQUxzQyxFQU10QyxTQU5zQyxDQUFiLENBeEJpRDtBQWdDNUVFLCtCQUEyQixJQUFJRixRQUFKLENBQWEsQ0FDdEMsOEJBRHNDLEVBRXRDLCtDQUZzQyxFQUd0QyxRQUhzQyxDQUFiLENBaENpRDtBQXFDNUVHLCtCQUEyQixJQUFJSCxRQUFKLENBQWEsQ0FDdEMsOEJBRHNDLENBQWIsQ0FyQ2lEO0FBd0M1RUksb0JBQWdCLFNBQVNBLGNBQVQsQ0FBd0JDLEtBQXhCLEVBQStCO0FBQzdDLGFBQVFBLE1BQU1DLFdBQVAsR0FBc0JELE1BQU1DLFdBQTVCLEdBQTBDRCxNQUFNRSxXQUF2RDtBQUNELEtBMUMyRTtBQTJDNUVDLGVBQVcsU0FBU0EsU0FBVCxDQUFtQkgsS0FBbkIsRUFBMEI7QUFDbkMsYUFBTyxpQkFBT0ksVUFBUCxDQUFrQixLQUFLM0IsTUFBdkIsRUFBK0IsQ0FBQyxpQkFBTzRCLFlBQVAsQ0FBb0JMLE1BQU1NLFFBQTFCLENBQUQsRUFBc0MsaUJBQU9DLElBQVAsQ0FBWVAsTUFBTVEsVUFBbEIsQ0FBdEMsQ0FBL0IsQ0FBUDtBQUNEO0FBN0MyRSxHQUE5RCxDQUFoQjs7b0JBZ0RlakMsTyIsImZpbGUiOiJSZWxhdGVkVmlldy5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBSZWxhdGVkVmlld1dpZGdldCBmcm9tICdhcmdvcy9SZWxhdGVkVmlld1dpZGdldCc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuaW1wb3J0IHN0cmluZyBmcm9tICdkb2pvL3N0cmluZyc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnLi4vLi4vRm9ybWF0JztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2hpc3RvcnlSZWxhdGVkJyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5IaXN0b3J5LlJlbGF0ZWRWaWV3XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLlJlbGF0ZWRWaWV3V2lkZ2V0XHJcbiAqXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5Db252ZXJ0XHJcbiAqXHJcbiAqIEByZXF1aXJlcyBjcm0uRm9ybWF0XHJcbiAqXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLkhpc3RvcnkuUmVsYXRlZFZpZXcnLCBbUmVsYXRlZFZpZXdXaWRnZXRdLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgcmVnYXJkaW5nVGV4dDogcmVzb3VyY2UucmVnYXJkaW5nVGV4dCxcclxuICBieVRleHQ6IHJlc291cmNlLmJ5VGV4dCxcclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuXHJcbiAgaWQ6ICdyZWxhdGVkTm90ZXMnLFxyXG4gIGRldGFpbFZpZXdJZDogJ2hpc3RvcnlfZGV0YWlsJyxcclxuICBsaXN0Vmlld0lkOiAnaGlzdG9yeV9yZWxhdGVkJyxcclxuICBsaXN0Vmlld1doZXJlOiBudWxsLFxyXG4gIGVuYWJsZWQ6IHRydWUsXHJcbiAgc2hvd1RhYjogZmFsc2UsXHJcbiAgZW5hYmxlQWN0aW9uczogZmFsc2UsXHJcbiAgc2hvd1RvdGFsSW5UYWI6IGZhbHNlLFxyXG4gIGhpZGVXaGVuTm9EYXRhOiB0cnVlLFxyXG4gIHJlc291cmNlS2luZDogJ2hpc3RvcnknLFxyXG4gIHNlbGVjdDogWydUeXBlJywgJ01vZGlmeURhdGUnLCAnQ29tcGxldGVEYXRlJywgJ1VzZXJOYW1lJywgJ0Rlc2NyaXB0aW9uJywgJ05vdGVzJywgJ0FjY291bnROYW1lJ10sXHJcbiAgd2hlcmU6IG51bGwsXHJcbiAgc29ydDogJ01vZGlmeURhdGUgZGVzYycsXHJcbiAgcGFnZVNpemU6IDMsXHJcbiAgRm9ybWF0OiBmb3JtYXQsXHJcbiAgcmVsYXRlZEl0ZW1JY29uVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGRpdiBjbGFzcz1cInVzZXItaWNvblwiPnslOiBjcm0uRm9ybWF0LmZvcm1hdFVzZXJJbml0aWFsKCQuVXNlck5hbWUpICV9PC9kaXY+JyxcclxuICBdKSxcclxuICByZWxhdGVkSXRlbUhlYWRlclRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxzdHJvbmc+eyU6ICQkLmdldERlc2NyaXB0aW9uKCQpICV9IDwvc3Ryb25nPjwvcD4nLFxyXG4gICAgJ3slIGlmKCQuVXNlck5hbWUpIHsgJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPnslPSAkJC5nZXRIZWFkZXIoJCkgJX08L3A+JyxcclxuICAgICd7JSB9IGVsc2UgeyAlfScsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+eyU6ICQkLkZvcm1hdC5kYXRlKCQuTW9kaWZ5RGF0ZSkgJX08L3A+JyxcclxuICAgICd7JSB9ICV9JyxcclxuICBdKSxcclxuICByZWxhdGVkSXRlbURldGFpbFRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxkaXYgY2xhc3M9XCJub3RlLXRleHQtd3JhcFwiPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+eyU6ICQuTm90ZXMgJX0gLi4uIDwvcD4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcbiAgcmVsYXRlZFZpZXdIZWFkZXJUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGNsYXNzPVwibGluZS1iYXJcIj48L2Rpdj4nLFxyXG4gIF0pLFxyXG4gIGdldERlc2NyaXB0aW9uOiBmdW5jdGlvbiBnZXREZXNjcmlwdGlvbihlbnRyeSkge1xyXG4gICAgcmV0dXJuIChlbnRyeS5EZXNjcmlwdGlvbikgPyBlbnRyeS5EZXNjcmlwdGlvbiA6IGVudHJ5LiRkZXNjcmlwdG9yO1xyXG4gIH0sXHJcbiAgZ2V0SGVhZGVyOiBmdW5jdGlvbiBnZXRIZWFkZXIoZW50cnkpIHtcclxuICAgIHJldHVybiBzdHJpbmcuc3Vic3RpdHV0ZSh0aGlzLmJ5VGV4dCwgW2Zvcm1hdC5mb3JtYXRCeVVzZXIoZW50cnkuVXNlck5hbWUpLCBmb3JtYXQuZGF0ZShlbnRyeS5Nb2RpZnlEYXRlKV0pO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19