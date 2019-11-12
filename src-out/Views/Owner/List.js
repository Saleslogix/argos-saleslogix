define('crm/Views/Owner/List', ['module', 'exports', 'dojo/_base/declare', 'argos/List', 'argos/I18n'], function (module, exports, _declare, _List, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _List2 = _interopRequireDefault(_List);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('ownerList');

  /**
   * @class crm.Views.Owner.List
   *
   * @extends argos.List
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

  var __class = (0, _declare2.default)('crm.Views.Owner.List', [_List2.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.OwnerDescription %}</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'owner_list',
    isCardView: false,
    security: 'Entities/Owner/View',
    queryOrderBy: 'OwnerDescription',
    querySelect: ['OwnerDescription', 'User/Enabled', 'User/Type', 'Type'],
    queryWhere: 'Type ne "Department"',
    resourceKind: 'owners',

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(OwnerDescription) like "%' + q + '%"';
    },
    processData: function processData(items) {
      var _this = this;

      if (items) {
        items = items.filter(function (item) {
          // eslint-disable-line
          return _this._userEnabled(item) && _this._isCorrectType(item);
        }, this);
      }

      this.inherited(arguments);
    },
    _userEnabled: function _userEnabled(item) {
      // If User is null, it is probably a team
      if (item.User === null || item.User.Enabled) {
        return true;
      }

      return false;
    },
    _isCorrectType: function _isCorrectType(item) {
      // If user is null, it is probably a team
      if (item.User === null) {
        return true;
      }

      // Filter out WebViewer, Retired, Template and AddOn users like the user list does
      return item.User.Type !== 3 && item.User.Type !== 5 && item.User.Type !== 6 && item.User.Type !== 7;
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9Pd25lci9MaXN0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsIml0ZW1UZW1wbGF0ZSIsIlNpbXBsYXRlIiwidGl0bGVUZXh0IiwiaWQiLCJpc0NhcmRWaWV3Iiwic2VjdXJpdHkiLCJxdWVyeU9yZGVyQnkiLCJxdWVyeVNlbGVjdCIsInF1ZXJ5V2hlcmUiLCJyZXNvdXJjZUtpbmQiLCJmb3JtYXRTZWFyY2hRdWVyeSIsInNlYXJjaFF1ZXJ5IiwicSIsImVzY2FwZVNlYXJjaFF1ZXJ5IiwidG9VcHBlckNhc2UiLCJwcm9jZXNzRGF0YSIsIml0ZW1zIiwiZmlsdGVyIiwiaXRlbSIsIl91c2VyRW5hYmxlZCIsIl9pc0NvcnJlY3RUeXBlIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiVXNlciIsIkVuYWJsZWQiLCJUeXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQSxNQUFNQSxXQUFXLG9CQUFZLFdBQVosQ0FBakI7O0FBRUE7Ozs7O0FBckJBOzs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsTUFBTUMsVUFBVSx1QkFBUSxzQkFBUixFQUFnQyxnQkFBaEMsRUFBd0M7QUFDdEQ7QUFDQUMsa0JBQWMsSUFBSUMsUUFBSixDQUFhLENBQ3pCLDJEQUR5QixDQUFiLENBRndDOztBQU10RDtBQUNBQyxlQUFXSixTQUFTSSxTQVBrQzs7QUFTdEQ7QUFDQUMsUUFBSSxZQVZrRDtBQVd0REMsZ0JBQVksS0FYMEM7QUFZdERDLGNBQVUscUJBWjRDO0FBYXREQyxrQkFBYyxrQkFid0M7QUFjdERDLGlCQUFhLENBQ1gsa0JBRFcsRUFFWCxjQUZXLEVBR1gsV0FIVyxFQUlYLE1BSlcsQ0FkeUM7QUFvQnREQyxnQkFBWSxzQkFwQjBDO0FBcUJ0REMsa0JBQWMsUUFyQndDOztBQXVCdERDLHVCQUFtQixTQUFTQSxpQkFBVCxDQUEyQkMsV0FBM0IsRUFBd0M7QUFDekQsVUFBTUMsSUFBSSxLQUFLQyxpQkFBTCxDQUF1QkYsWUFBWUcsV0FBWixFQUF2QixDQUFWO0FBQ0EsaURBQXlDRixDQUF6QztBQUNELEtBMUJxRDtBQTJCdERHLGlCQUFhLFNBQVNBLFdBQVQsQ0FBcUJDLEtBQXJCLEVBQTRCO0FBQUE7O0FBQ3ZDLFVBQUlBLEtBQUosRUFBVztBQUNUQSxnQkFBUUEsTUFBTUMsTUFBTixDQUFhLFVBQUNDLElBQUQsRUFBVTtBQUFFO0FBQy9CLGlCQUFPLE1BQUtDLFlBQUwsQ0FBa0JELElBQWxCLEtBQTJCLE1BQUtFLGNBQUwsQ0FBb0JGLElBQXBCLENBQWxDO0FBQ0QsU0FGTyxFQUVMLElBRkssQ0FBUjtBQUdEOztBQUVELFdBQUtHLFNBQUwsQ0FBZUMsU0FBZjtBQUNELEtBbkNxRDtBQW9DdERILGtCQUFjLFNBQVNBLFlBQVQsQ0FBc0JELElBQXRCLEVBQTRCO0FBQ3hDO0FBQ0EsVUFBSUEsS0FBS0ssSUFBTCxLQUFjLElBQWQsSUFBc0JMLEtBQUtLLElBQUwsQ0FBVUMsT0FBcEMsRUFBNkM7QUFDM0MsZUFBTyxJQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFQO0FBQ0QsS0EzQ3FEO0FBNEN0REosb0JBQWdCLFNBQVNBLGNBQVQsQ0FBd0JGLElBQXhCLEVBQThCO0FBQzVDO0FBQ0EsVUFBSUEsS0FBS0ssSUFBTCxLQUFjLElBQWxCLEVBQXdCO0FBQ3RCLGVBQU8sSUFBUDtBQUNEOztBQUVEO0FBQ0EsYUFBT0wsS0FBS0ssSUFBTCxDQUFVRSxJQUFWLEtBQW1CLENBQW5CLElBQXdCUCxLQUFLSyxJQUFMLENBQVVFLElBQVYsS0FBbUIsQ0FBM0MsSUFBZ0RQLEtBQUtLLElBQUwsQ0FBVUUsSUFBVixLQUFtQixDQUFuRSxJQUF3RVAsS0FBS0ssSUFBTCxDQUFVRSxJQUFWLEtBQW1CLENBQWxHO0FBQ0Q7QUFwRHFELEdBQXhDLENBQWhCOztvQkF1RGUxQixPIiwiZmlsZSI6Ikxpc3QuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnb3duZXJMaXN0Jyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5Pd25lci5MaXN0XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkxpc3RcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuT3duZXIuTGlzdCcsIFtMaXN0XSwge1xyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cImxpc3R2aWV3LWhlYWRpbmdcIj57JTogJC5Pd25lckRlc2NyaXB0aW9uICV9PC9wPicsXHJcbiAgXSksXHJcblxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ293bmVyX2xpc3QnLFxyXG4gIGlzQ2FyZFZpZXc6IGZhbHNlLFxyXG4gIHNlY3VyaXR5OiAnRW50aXRpZXMvT3duZXIvVmlldycsXHJcbiAgcXVlcnlPcmRlckJ5OiAnT3duZXJEZXNjcmlwdGlvbicsXHJcbiAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICdPd25lckRlc2NyaXB0aW9uJyxcclxuICAgICdVc2VyL0VuYWJsZWQnLFxyXG4gICAgJ1VzZXIvVHlwZScsXHJcbiAgICAnVHlwZScsXHJcbiAgXSxcclxuICBxdWVyeVdoZXJlOiAnVHlwZSBuZSBcIkRlcGFydG1lbnRcIicsXHJcbiAgcmVzb3VyY2VLaW5kOiAnb3duZXJzJyxcclxuXHJcbiAgZm9ybWF0U2VhcmNoUXVlcnk6IGZ1bmN0aW9uIGZvcm1hdFNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5KSB7XHJcbiAgICBjb25zdCBxID0gdGhpcy5lc2NhcGVTZWFyY2hRdWVyeShzZWFyY2hRdWVyeS50b1VwcGVyQ2FzZSgpKTtcclxuICAgIHJldHVybiBgdXBwZXIoT3duZXJEZXNjcmlwdGlvbikgbGlrZSBcIiUke3F9JVwiYDtcclxuICB9LFxyXG4gIHByb2Nlc3NEYXRhOiBmdW5jdGlvbiBwcm9jZXNzRGF0YShpdGVtcykge1xyXG4gICAgaWYgKGl0ZW1zKSB7XHJcbiAgICAgIGl0ZW1zID0gaXRlbXMuZmlsdGVyKChpdGVtKSA9PiB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICByZXR1cm4gdGhpcy5fdXNlckVuYWJsZWQoaXRlbSkgJiYgdGhpcy5faXNDb3JyZWN0VHlwZShpdGVtKTtcclxuICAgICAgfSwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIF91c2VyRW5hYmxlZDogZnVuY3Rpb24gX3VzZXJFbmFibGVkKGl0ZW0pIHtcclxuICAgIC8vIElmIFVzZXIgaXMgbnVsbCwgaXQgaXMgcHJvYmFibHkgYSB0ZWFtXHJcbiAgICBpZiAoaXRlbS5Vc2VyID09PSBudWxsIHx8IGl0ZW0uVXNlci5FbmFibGVkKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LFxyXG4gIF9pc0NvcnJlY3RUeXBlOiBmdW5jdGlvbiBfaXNDb3JyZWN0VHlwZShpdGVtKSB7XHJcbiAgICAvLyBJZiB1c2VyIGlzIG51bGwsIGl0IGlzIHByb2JhYmx5IGEgdGVhbVxyXG4gICAgaWYgKGl0ZW0uVXNlciA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGaWx0ZXIgb3V0IFdlYlZpZXdlciwgUmV0aXJlZCwgVGVtcGxhdGUgYW5kIEFkZE9uIHVzZXJzIGxpa2UgdGhlIHVzZXIgbGlzdCBkb2VzXHJcbiAgICByZXR1cm4gaXRlbS5Vc2VyLlR5cGUgIT09IDMgJiYgaXRlbS5Vc2VyLlR5cGUgIT09IDUgJiYgaXRlbS5Vc2VyLlR5cGUgIT09IDYgJiYgaXRlbS5Vc2VyLlR5cGUgIT09IDc7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=