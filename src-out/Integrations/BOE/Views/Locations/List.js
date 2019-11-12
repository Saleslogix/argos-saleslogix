define('crm/Integrations/BOE/Views/Locations/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _List, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('locationsList'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.Locations.List', [_List2.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="micro-text">{%: $.Name %}</p>', '<p class="listview-heading">{%: $.Description %}</p>', '<p class="micro-text">{%: $.ErpStatus %}</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'locations_list',
    detailView: '',
    modelName: _Names2.default.LOCATION,
    resourceKind: 'slxLocations',
    enableActions: false,
    expose: false,

    // Card layout
    itemIconClass: '',

    // Metrics
    entityName: 'SlxLocation',

    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {});
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(Description) like "' + q + '%" or upper(ErpLogicalId) like "' + q + '%"';
    }
  });

  _lang2.default.setObject('icboe.Views.Locations.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0xvY2F0aW9ucy9MaXN0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsIml0ZW1UZW1wbGF0ZSIsIlNpbXBsYXRlIiwidGl0bGVUZXh0IiwiaWQiLCJkZXRhaWxWaWV3IiwibW9kZWxOYW1lIiwiTE9DQVRJT04iLCJyZXNvdXJjZUtpbmQiLCJlbmFibGVBY3Rpb25zIiwiZXhwb3NlIiwiaXRlbUljb25DbGFzcyIsImVudGl0eU5hbWUiLCJjcmVhdGVUb29sTGF5b3V0IiwidG9vbHMiLCJmb3JtYXRTZWFyY2hRdWVyeSIsInNlYXJjaFF1ZXJ5IiwicSIsImVzY2FwZVNlYXJjaFF1ZXJ5IiwidG9VcHBlckNhc2UiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQSxNQUFNQSxXQUFXLG9CQUFZLGVBQVosQ0FBakIsQyxDQXJCQTs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE1BQU1DLFVBQVUsdUJBQVEsMkNBQVIsRUFBcUQsZ0JBQXJELEVBQTZEO0FBQzNFO0FBQ0FDLGtCQUFjLElBQUlDLFFBQUosQ0FBYSxDQUN6Qix5Q0FEeUIsRUFFekIsc0RBRnlCLEVBR3pCLDhDQUh5QixDQUFiLENBRjZEOztBQVEzRTtBQUNBQyxlQUFXSixTQUFTSSxTQVR1RDs7QUFXM0U7QUFDQUMsUUFBSSxnQkFadUU7QUFhM0VDLGdCQUFZLEVBYitEO0FBYzNFQyxlQUFXLGdCQUFZQyxRQWRvRDtBQWUzRUMsa0JBQWMsY0FmNkQ7QUFnQjNFQyxtQkFBZSxLQWhCNEQ7QUFpQjNFQyxZQUFRLEtBakJtRTs7QUFtQjNFO0FBQ0FDLG1CQUFlLEVBcEI0RDs7QUFzQjNFO0FBQ0FDLGdCQUFZLGFBdkIrRDs7QUF5QjNFQyxzQkFBa0IsU0FBU0EsZ0JBQVQsR0FBNEI7QUFDNUMsYUFBTyxLQUFLQyxLQUFMLEtBQWUsS0FBS0EsS0FBTCxHQUFhLEVBQTVCLENBQVA7QUFFRCxLQTVCMEU7QUE2QjNFQyx1QkFBbUIsU0FBU0EsaUJBQVQsQ0FBMkJDLFdBQTNCLEVBQXdDO0FBQ3pELFVBQU1DLElBQUksS0FBS0MsaUJBQUwsQ0FBdUJGLFlBQVlHLFdBQVosRUFBdkIsQ0FBVjtBQUNBLDJDQUFtQ0YsQ0FBbkMsd0NBQXVFQSxDQUF2RTtBQUNEO0FBaEMwRSxHQUE3RCxDQUFoQjs7QUFtQ0EsaUJBQUtHLFNBQUwsQ0FBZSw0QkFBZixFQUE2Q3BCLE9BQTdDO29CQUNlQSxPIiwiZmlsZSI6Ikxpc3QuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2xvY2F0aW9uc0xpc3QnKTtcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5WaWV3cy5Mb2NhdGlvbnMuTGlzdCcsIFtMaXN0XSwge1xyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj57JTogJC5OYW1lICV9PC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJsaXN0dmlldy1oZWFkaW5nXCI+eyU6ICQuRGVzY3JpcHRpb24gJX08L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj57JTogJC5FcnBTdGF0dXMgJX08L3A+JyxcclxuICBdKSxcclxuXHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnbG9jYXRpb25zX2xpc3QnLFxyXG4gIGRldGFpbFZpZXc6ICcnLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuTE9DQVRJT04sXHJcbiAgcmVzb3VyY2VLaW5kOiAnc2x4TG9jYXRpb25zJyxcclxuICBlbmFibGVBY3Rpb25zOiBmYWxzZSxcclxuICBleHBvc2U6IGZhbHNlLFxyXG5cclxuICAvLyBDYXJkIGxheW91dFxyXG4gIGl0ZW1JY29uQ2xhc3M6ICcnLFxyXG5cclxuICAvLyBNZXRyaWNzXHJcbiAgZW50aXR5TmFtZTogJ1NseExvY2F0aW9uJyxcclxuXHJcbiAgY3JlYXRlVG9vbExheW91dDogZnVuY3Rpb24gY3JlYXRlVG9vbExheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLnRvb2xzIHx8ICh0aGlzLnRvb2xzID0ge1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBmb3JtYXRTZWFyY2hRdWVyeTogZnVuY3Rpb24gZm9ybWF0U2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkpIHtcclxuICAgIGNvbnN0IHEgPSB0aGlzLmVzY2FwZVNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5LnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgcmV0dXJuIGB1cHBlcihEZXNjcmlwdGlvbikgbGlrZSBcIiR7cX0lXCIgb3IgdXBwZXIoRXJwTG9naWNhbElkKSBsaWtlIFwiJHtxfSVcImA7XHJcbiAgfSxcclxufSk7XHJcblxyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuVmlld3MuTG9jYXRpb25zLkxpc3QnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19