define('crm/Models/UserActivity/Base', ['module', 'exports', 'dojo/_base/declare', '../Activity/Base', '../Names', 'argos/I18n'], function (module, exports, _declare, _Base, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Base2 = _interopRequireDefault(_Base);

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

  var resource = (0, _I18n2.default)('userActivityModel');

  var __class = (0, _declare2.default)('crm.Models.UserActivity.Base', [_Base2.default], {
    modelName: _Names2.default.USERACTIVITY,
    entityName: 'UserActivity',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    iconClass: 'bullet-list',
    resourceKind: 'userActivities',
    contractName: 'system',
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = []);
      return rel;
    }
  });
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbHMvVXNlckFjdGl2aXR5L0Jhc2UuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwibW9kZWxOYW1lIiwiVVNFUkFDVElWSVRZIiwiZW50aXR5TmFtZSIsImVudGl0eURpc3BsYXlOYW1lIiwiZW50aXR5RGlzcGxheU5hbWVQbHVyYWwiLCJpY29uQ2xhc3MiLCJyZXNvdXJjZUtpbmQiLCJjb250cmFjdE5hbWUiLCJjcmVhdGVSZWxhdGlvbnNoaXBzIiwicmVsIiwicmVsYXRpb25zaGlwcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFvQkEsTUFBTUEsV0FBVyxvQkFBWSxtQkFBWixDQUFqQjs7QUFFQSxNQUFNQyxVQUFVLHVCQUFRLDhCQUFSLEVBQXdDLGdCQUF4QyxFQUF3RDtBQUN0RUMsZUFBVyxnQkFBWUMsWUFEK0M7QUFFdEVDLGdCQUFZLGNBRjBEO0FBR3RFQyx1QkFBbUJMLFNBQVNLLGlCQUgwQztBQUl0RUMsNkJBQXlCTixTQUFTTSx1QkFKb0M7QUFLdEVDLGVBQVcsYUFMMkQ7QUFNdEVDLGtCQUFjLGdCQU53RDtBQU90RUMsa0JBQWMsUUFQd0Q7QUFRdEVDLHlCQUFxQixTQUFTQSxtQkFBVCxHQUErQjtBQUNsRCxVQUFNQyxNQUFNLEtBQUtDLGFBQUwsS0FBdUIsS0FBS0EsYUFBTCxHQUFxQixFQUE1QyxDQUFaO0FBQ0EsYUFBT0QsR0FBUDtBQUNEO0FBWHFFLEdBQXhELENBQWhCO29CQWFlVixPIiwiZmlsZSI6IkJhc2UuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgQWN0aXZpdHlCYXNlIGZyb20gJy4uL0FjdGl2aXR5L0Jhc2UnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vTmFtZXMnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCd1c2VyQWN0aXZpdHlNb2RlbCcpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5Nb2RlbHMuVXNlckFjdGl2aXR5LkJhc2UnLCBbQWN0aXZpdHlCYXNlXSwge1xyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuVVNFUkFDVElWSVRZLFxyXG4gIGVudGl0eU5hbWU6ICdVc2VyQWN0aXZpdHknLFxyXG4gIGVudGl0eURpc3BsYXlOYW1lOiByZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZSxcclxuICBlbnRpdHlEaXNwbGF5TmFtZVBsdXJhbDogcmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgaWNvbkNsYXNzOiAnYnVsbGV0LWxpc3QnLFxyXG4gIHJlc291cmNlS2luZDogJ3VzZXJBY3Rpdml0aWVzJyxcclxuICBjb250cmFjdE5hbWU6ICdzeXN0ZW0nLFxyXG4gIGNyZWF0ZVJlbGF0aW9uc2hpcHM6IGZ1bmN0aW9uIGNyZWF0ZVJlbGF0aW9uc2hpcHMoKSB7XHJcbiAgICBjb25zdCByZWwgPSB0aGlzLnJlbGF0aW9uc2hpcHMgfHwgKHRoaXMucmVsYXRpb25zaGlwcyA9IFtdKTtcclxuICAgIHJldHVybiByZWw7XHJcbiAgfSxcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==