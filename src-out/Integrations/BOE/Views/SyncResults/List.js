define('crm/Integrations/BOE/Views/SyncResults/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'crm/Format', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _List, _Format, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('syncResultsList');
  var dtFormatResource = (0, _I18n2.default)('syncResultsListDateTimeFormat');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.SyncResults.List', [_List2.default], {
    formatter: _Format2.default,
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading"><label class="group-label">{%: $$.directionText %}: </label>{%: $.RunName %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.statusText %}: </label>{%: $.HttpStatus %}</p>', '{% if ($.ErrorMessage) { %}', '<p class="micro-text"><label class="group-label">{%: $$.errorMessageText %}: </label>{%: $.ErrorMessage %}</p>', '{% } %}', '{% if ($.SyncedFrom) { %}', '<p class="micro-text"><label class="group-label">{%: $$.sentFromText %}: </label>{%: $.SyncedFrom.Name %}</p>', '{% } %}', '{% if ($.SyncedTo) { %}', '<p class="micro-text"><label class="group-label">{%: $$.processedByText %}: </label>{%: $.SyncedTo.Name %}</p>', '{% } %}', '<p class="micro-text"><label class="group-label">{%: $$.loggedText %}: </label>{%: $$.formatter.date($.Stamp, $$.dateFormatText) %}</p>']),

    // Localization
    titleText: resource.titleText,
    directionText: resource.directionText,
    userText: resource.userText,
    sentFromText: resource.sentFromText,
    processedByText: resource.processedByText,
    loggedText: resource.loggedText,
    statusText: resource.statusText,
    errorMessageText: resource.errorMessageText,
    dateFormatText: dtFormatResource.dateFormatText,

    // View Properties
    id: 'syncresult_list',
    detailView: '',
    modelName: _Names2.default.SYNCRESULT,
    resourceKind: 'syncResults',
    enableActions: false,
    groupsEnabled: false,
    hasSettings: false,
    expose: false,

    // Card layout
    itemIconClass: '',

    // Metrics
    entityName: 'SyncResult',

    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {});
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(HttpStatus) like "' + q + '%"';
    }
  });

  _lang2.default.setObject('icboe.Views.SyncResults.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL1N5bmNSZXN1bHRzL0xpc3QuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJkdEZvcm1hdFJlc291cmNlIiwiX19jbGFzcyIsImZvcm1hdHRlciIsIml0ZW1UZW1wbGF0ZSIsIlNpbXBsYXRlIiwidGl0bGVUZXh0IiwiZGlyZWN0aW9uVGV4dCIsInVzZXJUZXh0Iiwic2VudEZyb21UZXh0IiwicHJvY2Vzc2VkQnlUZXh0IiwibG9nZ2VkVGV4dCIsInN0YXR1c1RleHQiLCJlcnJvck1lc3NhZ2VUZXh0IiwiZGF0ZUZvcm1hdFRleHQiLCJpZCIsImRldGFpbFZpZXciLCJtb2RlbE5hbWUiLCJTWU5DUkVTVUxUIiwicmVzb3VyY2VLaW5kIiwiZW5hYmxlQWN0aW9ucyIsImdyb3Vwc0VuYWJsZWQiLCJoYXNTZXR0aW5ncyIsImV4cG9zZSIsIml0ZW1JY29uQ2xhc3MiLCJlbnRpdHlOYW1lIiwiY3JlYXRlVG9vbExheW91dCIsInRvb2xzIiwiZm9ybWF0U2VhcmNoUXVlcnkiLCJzZWFyY2hRdWVyeSIsInEiLCJlc2NhcGVTZWFyY2hRdWVyeSIsInRvVXBwZXJDYXNlIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsTUFBTUEsV0FBVyxvQkFBWSxpQkFBWixDQUFqQjtBQUNBLE1BQU1DLG1CQUFtQixvQkFBWSwrQkFBWixDQUF6Qjs7QUFFQSxNQUFNQyxVQUFVLHVCQUFRLDZDQUFSLEVBQXVELGdCQUF2RCxFQUErRDtBQUM3RUMsK0JBRDZFO0FBRTdFO0FBQ0FDLGtCQUFjLElBQUlDLFFBQUosQ0FBYSxDQUN6Qiw4R0FEeUIsRUFFekIsd0dBRnlCLEVBR3pCLDZCQUh5QixFQUl6QixnSEFKeUIsRUFLekIsU0FMeUIsRUFNekIsMkJBTnlCLEVBT3pCLCtHQVB5QixFQVF6QixTQVJ5QixFQVN6Qix5QkFUeUIsRUFVekIsZ0hBVnlCLEVBV3pCLFNBWHlCLEVBWXpCLHlJQVp5QixDQUFiLENBSCtEOztBQWtCN0U7QUFDQUMsZUFBV04sU0FBU00sU0FuQnlEO0FBb0I3RUMsbUJBQWVQLFNBQVNPLGFBcEJxRDtBQXFCN0VDLGNBQVVSLFNBQVNRLFFBckIwRDtBQXNCN0VDLGtCQUFjVCxTQUFTUyxZQXRCc0Q7QUF1QjdFQyxxQkFBaUJWLFNBQVNVLGVBdkJtRDtBQXdCN0VDLGdCQUFZWCxTQUFTVyxVQXhCd0Q7QUF5QjdFQyxnQkFBWVosU0FBU1ksVUF6QndEO0FBMEI3RUMsc0JBQWtCYixTQUFTYSxnQkExQmtEO0FBMkI3RUMsb0JBQWdCYixpQkFBaUJhLGNBM0I0Qzs7QUE2QjdFO0FBQ0FDLFFBQUksaUJBOUJ5RTtBQStCN0VDLGdCQUFZLEVBL0JpRTtBQWdDN0VDLGVBQVcsZ0JBQVlDLFVBaENzRDtBQWlDN0VDLGtCQUFjLGFBakMrRDtBQWtDN0VDLG1CQUFlLEtBbEM4RDtBQW1DN0VDLG1CQUFlLEtBbkM4RDtBQW9DN0VDLGlCQUFhLEtBcENnRTtBQXFDN0VDLFlBQVEsS0FyQ3FFOztBQXVDN0U7QUFDQUMsbUJBQWUsRUF4QzhEOztBQTBDN0U7QUFDQUMsZ0JBQVksWUEzQ2lFOztBQTZDN0VDLHNCQUFrQixTQUFTQSxnQkFBVCxHQUE0QjtBQUM1QyxhQUFPLEtBQUtDLEtBQUwsS0FBZSxLQUFLQSxLQUFMLEdBQWEsRUFBNUIsQ0FBUDtBQUVELEtBaEQ0RTtBQWlEN0VDLHVCQUFtQixTQUFTQSxpQkFBVCxDQUEyQkMsV0FBM0IsRUFBd0M7QUFDekQsVUFBTUMsSUFBSSxLQUFLQyxpQkFBTCxDQUF1QkYsWUFBWUcsV0FBWixFQUF2QixDQUFWO0FBQ0EsMENBQWtDRixDQUFsQztBQUNEO0FBcEQ0RSxHQUEvRCxDQUFoQjs7QUF1REEsaUJBQUtHLFNBQUwsQ0FBZSw4QkFBZixFQUErQy9CLE9BQS9DO29CQUNlQSxPIiwiZmlsZSI6Ikxpc3QuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICdjcm0vRm9ybWF0JztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3N5bmNSZXN1bHRzTGlzdCcpO1xyXG5jb25zdCBkdEZvcm1hdFJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3N5bmNSZXN1bHRzTGlzdERhdGVUaW1lRm9ybWF0Jyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuU3luY1Jlc3VsdHMuTGlzdCcsIFtMaXN0XSwge1xyXG4gIGZvcm1hdHRlcjogZm9ybWF0LFxyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cImxpc3R2aWV3LWhlYWRpbmdcIj48bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5kaXJlY3Rpb25UZXh0ICV9OiA8L2xhYmVsPnslOiAkLlJ1bk5hbWUgJX08L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj48bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5zdGF0dXNUZXh0ICV9OiA8L2xhYmVsPnslOiAkLkh0dHBTdGF0dXMgJX08L3A+JyxcclxuICAgICd7JSBpZiAoJC5FcnJvck1lc3NhZ2UpIHsgJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLmVycm9yTWVzc2FnZVRleHQgJX06IDwvbGFiZWw+eyU6ICQuRXJyb3JNZXNzYWdlICV9PC9wPicsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgICAneyUgaWYgKCQuU3luY2VkRnJvbSkgeyAlfScsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PGxhYmVsIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JTogJCQuc2VudEZyb21UZXh0ICV9OiA8L2xhYmVsPnslOiAkLlN5bmNlZEZyb20uTmFtZSAlfTwvcD4nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gICAgJ3slIGlmICgkLlN5bmNlZFRvKSB7ICV9JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj48bGFiZWwgY2xhc3M9XCJncm91cC1sYWJlbFwiPnslOiAkJC5wcm9jZXNzZWRCeVRleHQgJX06IDwvbGFiZWw+eyU6ICQuU3luY2VkVG8uTmFtZSAlfTwvcD4nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxsYWJlbCBjbGFzcz1cImdyb3VwLWxhYmVsXCI+eyU6ICQkLmxvZ2dlZFRleHQgJX06IDwvbGFiZWw+eyU6ICQkLmZvcm1hdHRlci5kYXRlKCQuU3RhbXAsICQkLmRhdGVGb3JtYXRUZXh0KSAlfTwvcD4nLFxyXG4gIF0pLFxyXG5cclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBkaXJlY3Rpb25UZXh0OiByZXNvdXJjZS5kaXJlY3Rpb25UZXh0LFxyXG4gIHVzZXJUZXh0OiByZXNvdXJjZS51c2VyVGV4dCxcclxuICBzZW50RnJvbVRleHQ6IHJlc291cmNlLnNlbnRGcm9tVGV4dCxcclxuICBwcm9jZXNzZWRCeVRleHQ6IHJlc291cmNlLnByb2Nlc3NlZEJ5VGV4dCxcclxuICBsb2dnZWRUZXh0OiByZXNvdXJjZS5sb2dnZWRUZXh0LFxyXG4gIHN0YXR1c1RleHQ6IHJlc291cmNlLnN0YXR1c1RleHQsXHJcbiAgZXJyb3JNZXNzYWdlVGV4dDogcmVzb3VyY2UuZXJyb3JNZXNzYWdlVGV4dCxcclxuICBkYXRlRm9ybWF0VGV4dDogZHRGb3JtYXRSZXNvdXJjZS5kYXRlRm9ybWF0VGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdzeW5jcmVzdWx0X2xpc3QnLFxyXG4gIGRldGFpbFZpZXc6ICcnLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuU1lOQ1JFU1VMVCxcclxuICByZXNvdXJjZUtpbmQ6ICdzeW5jUmVzdWx0cycsXHJcbiAgZW5hYmxlQWN0aW9uczogZmFsc2UsXHJcbiAgZ3JvdXBzRW5hYmxlZDogZmFsc2UsXHJcbiAgaGFzU2V0dGluZ3M6IGZhbHNlLFxyXG4gIGV4cG9zZTogZmFsc2UsXHJcblxyXG4gIC8vIENhcmQgbGF5b3V0XHJcbiAgaXRlbUljb25DbGFzczogJycsXHJcblxyXG4gIC8vIE1ldHJpY3NcclxuICBlbnRpdHlOYW1lOiAnU3luY1Jlc3VsdCcsXHJcblxyXG4gIGNyZWF0ZVRvb2xMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZVRvb2xMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50b29scyB8fCAodGhpcy50b29scyA9IHtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZm9ybWF0U2VhcmNoUXVlcnk6IGZ1bmN0aW9uIGZvcm1hdFNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5KSB7XHJcbiAgICBjb25zdCBxID0gdGhpcy5lc2NhcGVTZWFyY2hRdWVyeShzZWFyY2hRdWVyeS50b1VwcGVyQ2FzZSgpKTtcclxuICAgIHJldHVybiBgdXBwZXIoSHR0cFN0YXR1cykgbGlrZSBcIiR7cX0lXCJgO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLlZpZXdzLlN5bmNSZXN1bHRzLkxpc3QnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19