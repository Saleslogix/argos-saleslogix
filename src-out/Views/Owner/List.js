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

      this.inherited(processData, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9Pd25lci9MaXN0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsIml0ZW1UZW1wbGF0ZSIsIlNpbXBsYXRlIiwidGl0bGVUZXh0IiwiaWQiLCJpc0NhcmRWaWV3Iiwic2VjdXJpdHkiLCJxdWVyeU9yZGVyQnkiLCJxdWVyeVNlbGVjdCIsInF1ZXJ5V2hlcmUiLCJyZXNvdXJjZUtpbmQiLCJmb3JtYXRTZWFyY2hRdWVyeSIsInNlYXJjaFF1ZXJ5IiwicSIsImVzY2FwZVNlYXJjaFF1ZXJ5IiwidG9VcHBlckNhc2UiLCJwcm9jZXNzRGF0YSIsIml0ZW1zIiwiZmlsdGVyIiwiaXRlbSIsIl91c2VyRW5hYmxlZCIsIl9pc0NvcnJlY3RUeXBlIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiVXNlciIsIkVuYWJsZWQiLCJUeXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQSxNQUFNQSxXQUFXLG9CQUFZLFdBQVosQ0FBakI7O0FBRUE7Ozs7O0FBckJBOzs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsTUFBTUMsVUFBVSx1QkFBUSxzQkFBUixFQUFnQyxnQkFBaEMsRUFBd0M7QUFDdEQ7QUFDQUMsa0JBQWMsSUFBSUMsUUFBSixDQUFhLENBQ3pCLDJEQUR5QixDQUFiLENBRndDOztBQU10RDtBQUNBQyxlQUFXSixTQUFTSSxTQVBrQzs7QUFTdEQ7QUFDQUMsUUFBSSxZQVZrRDtBQVd0REMsZ0JBQVksS0FYMEM7QUFZdERDLGNBQVUscUJBWjRDO0FBYXREQyxrQkFBYyxrQkFid0M7QUFjdERDLGlCQUFhLENBQ1gsa0JBRFcsRUFFWCxjQUZXLEVBR1gsV0FIVyxFQUlYLE1BSlcsQ0FkeUM7QUFvQnREQyxnQkFBWSxzQkFwQjBDO0FBcUJ0REMsa0JBQWMsUUFyQndDOztBQXVCdERDLHVCQUFtQixTQUFTQSxpQkFBVCxDQUEyQkMsV0FBM0IsRUFBd0M7QUFDekQsVUFBTUMsSUFBSSxLQUFLQyxpQkFBTCxDQUF1QkYsWUFBWUcsV0FBWixFQUF2QixDQUFWO0FBQ0EsaURBQXlDRixDQUF6QztBQUNELEtBMUJxRDtBQTJCdERHLGlCQUFhLFNBQVNBLFdBQVQsQ0FBcUJDLEtBQXJCLEVBQTRCO0FBQUE7O0FBQ3ZDLFVBQUlBLEtBQUosRUFBVztBQUNUQSxnQkFBUUEsTUFBTUMsTUFBTixDQUFhLFVBQUNDLElBQUQsRUFBVTtBQUFFO0FBQy9CLGlCQUFPLE1BQUtDLFlBQUwsQ0FBa0JELElBQWxCLEtBQTJCLE1BQUtFLGNBQUwsQ0FBb0JGLElBQXBCLENBQWxDO0FBQ0QsU0FGTyxFQUVMLElBRkssQ0FBUjtBQUdEOztBQUVELFdBQUtHLFNBQUwsQ0FBZU4sV0FBZixFQUE0Qk8sU0FBNUI7QUFDRCxLQW5DcUQ7QUFvQ3RESCxrQkFBYyxTQUFTQSxZQUFULENBQXNCRCxJQUF0QixFQUE0QjtBQUN4QztBQUNBLFVBQUlBLEtBQUtLLElBQUwsS0FBYyxJQUFkLElBQXNCTCxLQUFLSyxJQUFMLENBQVVDLE9BQXBDLEVBQTZDO0FBQzNDLGVBQU8sSUFBUDtBQUNEOztBQUVELGFBQU8sS0FBUDtBQUNELEtBM0NxRDtBQTRDdERKLG9CQUFnQixTQUFTQSxjQUFULENBQXdCRixJQUF4QixFQUE4QjtBQUM1QztBQUNBLFVBQUlBLEtBQUtLLElBQUwsS0FBYyxJQUFsQixFQUF3QjtBQUN0QixlQUFPLElBQVA7QUFDRDs7QUFFRDtBQUNBLGFBQU9MLEtBQUtLLElBQUwsQ0FBVUUsSUFBVixLQUFtQixDQUFuQixJQUF3QlAsS0FBS0ssSUFBTCxDQUFVRSxJQUFWLEtBQW1CLENBQTNDLElBQWdEUCxLQUFLSyxJQUFMLENBQVVFLElBQVYsS0FBbUIsQ0FBbkUsSUFBd0VQLEtBQUtLLElBQUwsQ0FBVUUsSUFBVixLQUFtQixDQUFsRztBQUNEO0FBcERxRCxHQUF4QyxDQUFoQjs7b0JBdURlMUIsTyIsImZpbGUiOiJMaXN0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IExpc3QgZnJvbSAnYXJnb3MvTGlzdCc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ293bmVyTGlzdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuT3duZXIuTGlzdFxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5MaXN0XHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLk93bmVyLkxpc3QnLCBbTGlzdF0sIHtcclxuICAvLyBUZW1wbGF0ZXNcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPHAgY2xhc3M9XCJsaXN0dmlldy1oZWFkaW5nXCI+eyU6ICQuT3duZXJEZXNjcmlwdGlvbiAlfTwvcD4nLFxyXG4gIF0pLFxyXG5cclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdvd25lcl9saXN0JyxcclxuICBpc0NhcmRWaWV3OiBmYWxzZSxcclxuICBzZWN1cml0eTogJ0VudGl0aWVzL093bmVyL1ZpZXcnLFxyXG4gIHF1ZXJ5T3JkZXJCeTogJ093bmVyRGVzY3JpcHRpb24nLFxyXG4gIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAnT3duZXJEZXNjcmlwdGlvbicsXHJcbiAgICAnVXNlci9FbmFibGVkJyxcclxuICAgICdVc2VyL1R5cGUnLFxyXG4gICAgJ1R5cGUnLFxyXG4gIF0sXHJcbiAgcXVlcnlXaGVyZTogJ1R5cGUgbmUgXCJEZXBhcnRtZW50XCInLFxyXG4gIHJlc291cmNlS2luZDogJ293bmVycycsXHJcblxyXG4gIGZvcm1hdFNlYXJjaFF1ZXJ5OiBmdW5jdGlvbiBmb3JtYXRTZWFyY2hRdWVyeShzZWFyY2hRdWVyeSkge1xyXG4gICAgY29uc3QgcSA9IHRoaXMuZXNjYXBlU2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkudG9VcHBlckNhc2UoKSk7XHJcbiAgICByZXR1cm4gYHVwcGVyKE93bmVyRGVzY3JpcHRpb24pIGxpa2UgXCIlJHtxfSVcImA7XHJcbiAgfSxcclxuICBwcm9jZXNzRGF0YTogZnVuY3Rpb24gcHJvY2Vzc0RhdGEoaXRlbXMpIHtcclxuICAgIGlmIChpdGVtcykge1xyXG4gICAgICBpdGVtcyA9IGl0ZW1zLmZpbHRlcigoaXRlbSkgPT4geyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJFbmFibGVkKGl0ZW0pICYmIHRoaXMuX2lzQ29ycmVjdFR5cGUoaXRlbSk7XHJcbiAgICAgIH0sIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW5oZXJpdGVkKHByb2Nlc3NEYXRhLCBhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgX3VzZXJFbmFibGVkOiBmdW5jdGlvbiBfdXNlckVuYWJsZWQoaXRlbSkge1xyXG4gICAgLy8gSWYgVXNlciBpcyBudWxsLCBpdCBpcyBwcm9iYWJseSBhIHRlYW1cclxuICAgIGlmIChpdGVtLlVzZXIgPT09IG51bGwgfHwgaXRlbS5Vc2VyLkVuYWJsZWQpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0sXHJcbiAgX2lzQ29ycmVjdFR5cGU6IGZ1bmN0aW9uIF9pc0NvcnJlY3RUeXBlKGl0ZW0pIHtcclxuICAgIC8vIElmIHVzZXIgaXMgbnVsbCwgaXQgaXMgcHJvYmFibHkgYSB0ZWFtXHJcbiAgICBpZiAoaXRlbS5Vc2VyID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZpbHRlciBvdXQgV2ViVmlld2VyLCBSZXRpcmVkLCBUZW1wbGF0ZSBhbmQgQWRkT24gdXNlcnMgbGlrZSB0aGUgdXNlciBsaXN0IGRvZXNcclxuICAgIHJldHVybiBpdGVtLlVzZXIuVHlwZSAhPT0gMyAmJiBpdGVtLlVzZXIuVHlwZSAhPT0gNSAmJiBpdGVtLlVzZXIuVHlwZSAhPT0gNiAmJiBpdGVtLlVzZXIuVHlwZSAhPT0gNztcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==