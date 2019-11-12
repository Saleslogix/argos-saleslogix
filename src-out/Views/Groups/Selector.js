define('crm/Views/Groups/Selector', ['module', 'exports', 'dojo/_base/declare', 'argos/List', 'argos/Store/SData', 'argos/I18n'], function (module, exports, _declare, _List, _SData, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _List2 = _interopRequireDefault(_List);

  var _SData2 = _interopRequireDefault(_SData);

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

  var resource = (0, _I18n2.default)('groupsSelector');

  /**
   * @class crm.Views.Groups.Selector
   *
   * @extends argos.List
   * @requires argos.List
   *
   */
  var __class = (0, _declare2.default)('crm.Views.Groups.Selector', [_List2.default], {
    id: 'groups_configure',
    expose: false,
    enableSearch: false,
    icon: '',

    listViewId: 'groups_list',
    family: '',

    // Localization
    titleText: resource.titleText,
    isCardView: false,
    itemTemplate: new Simplate(['<h4>{%: $[$$.labelProperty] %}</h4>']),

    constructor: function constructor() {
      this.tools = {
        tbar: []
      };
    },

    activateEntry: function activateEntry(params) {
      if (this._selectionModel && this.isNavigationDisabled()) {
        this._selectionModel.toggle(params.key, this.entries[params.key] || params.descriptor, params.$source);
        if (this.options.singleSelect && this.options.singleSelectAction) {
          this.invokeSingleSelectAction();
        }
      }
    },

    createStore: function createStore() {
      if (!this.family) {
        throw new Error('The groups selector must have a family set.');
      }

      return this.createGroupStore(this.family);
    },

    createGroupStore: function createGroupStore(entityName) {
      var store = null;

      if (typeof entityName === 'string' && entityName !== '') {
        store = new _SData2.default({
          service: App.services.crm,
          resourceKind: 'groups',
          contractName: 'system',
          where: 'upper(family) eq \'' + entityName.toUpperCase() + '\'',
          orderBy: 'name asc',
          include: ['layout', 'tableAliases'],
          idProperty: '$key',
          applicationName: 'slx',
          scope: this
        });
      }

      return store;
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'name like "' + q + '%"';
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9Hcm91cHMvU2VsZWN0b3IuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiaWQiLCJleHBvc2UiLCJlbmFibGVTZWFyY2giLCJpY29uIiwibGlzdFZpZXdJZCIsImZhbWlseSIsInRpdGxlVGV4dCIsImlzQ2FyZFZpZXciLCJpdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsImNvbnN0cnVjdG9yIiwidG9vbHMiLCJ0YmFyIiwiYWN0aXZhdGVFbnRyeSIsInBhcmFtcyIsIl9zZWxlY3Rpb25Nb2RlbCIsImlzTmF2aWdhdGlvbkRpc2FibGVkIiwidG9nZ2xlIiwia2V5IiwiZW50cmllcyIsImRlc2NyaXB0b3IiLCIkc291cmNlIiwib3B0aW9ucyIsInNpbmdsZVNlbGVjdCIsInNpbmdsZVNlbGVjdEFjdGlvbiIsImludm9rZVNpbmdsZVNlbGVjdEFjdGlvbiIsImNyZWF0ZVN0b3JlIiwiRXJyb3IiLCJjcmVhdGVHcm91cFN0b3JlIiwiZW50aXR5TmFtZSIsInN0b3JlIiwic2VydmljZSIsIkFwcCIsInNlcnZpY2VzIiwiY3JtIiwicmVzb3VyY2VLaW5kIiwiY29udHJhY3ROYW1lIiwid2hlcmUiLCJ0b1VwcGVyQ2FzZSIsIm9yZGVyQnkiLCJpbmNsdWRlIiwiaWRQcm9wZXJ0eSIsImFwcGxpY2F0aW9uTmFtZSIsInNjb3BlIiwiZm9ybWF0U2VhcmNoUXVlcnkiLCJzZWFyY2hRdWVyeSIsInEiLCJlc2NhcGVTZWFyY2hRdWVyeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFvQkEsTUFBTUEsV0FBVyxvQkFBWSxnQkFBWixDQUFqQjs7QUFFQTs7Ozs7OztBQU9BLE1BQU1DLFVBQVUsdUJBQVEsMkJBQVIsRUFBcUMsZ0JBQXJDLEVBQTZDO0FBQzNEQyxRQUFJLGtCQUR1RDtBQUUzREMsWUFBUSxLQUZtRDtBQUczREMsa0JBQWMsS0FINkM7QUFJM0RDLFVBQU0sRUFKcUQ7O0FBTTNEQyxnQkFBWSxhQU4rQztBQU8zREMsWUFBUSxFQVBtRDs7QUFTM0Q7QUFDQUMsZUFBV1IsU0FBU1EsU0FWdUM7QUFXM0RDLGdCQUFZLEtBWCtDO0FBWTNEQyxrQkFBYyxJQUFJQyxRQUFKLENBQWEsQ0FDekIscUNBRHlCLENBQWIsQ0FaNkM7O0FBZ0IzREMsaUJBQWEsU0FBU0EsV0FBVCxHQUF1QjtBQUNsQyxXQUFLQyxLQUFMLEdBQWE7QUFDWEMsY0FBTTtBQURLLE9BQWI7QUFHRCxLQXBCMEQ7O0FBc0IzREMsbUJBQWUsU0FBU0EsYUFBVCxDQUF1QkMsTUFBdkIsRUFBK0I7QUFDNUMsVUFBSSxLQUFLQyxlQUFMLElBQXdCLEtBQUtDLG9CQUFMLEVBQTVCLEVBQXlEO0FBQ3ZELGFBQUtELGVBQUwsQ0FBcUJFLE1BQXJCLENBQTRCSCxPQUFPSSxHQUFuQyxFQUF3QyxLQUFLQyxPQUFMLENBQWFMLE9BQU9JLEdBQXBCLEtBQTRCSixPQUFPTSxVQUEzRSxFQUF1Rk4sT0FBT08sT0FBOUY7QUFDQSxZQUFJLEtBQUtDLE9BQUwsQ0FBYUMsWUFBYixJQUE2QixLQUFLRCxPQUFMLENBQWFFLGtCQUE5QyxFQUFrRTtBQUNoRSxlQUFLQyx3QkFBTDtBQUNEO0FBQ0Y7QUFDRixLQTdCMEQ7O0FBK0IzREMsaUJBQWEsU0FBU0EsV0FBVCxHQUF1QjtBQUNsQyxVQUFJLENBQUMsS0FBS3JCLE1BQVYsRUFBa0I7QUFDaEIsY0FBTSxJQUFJc0IsS0FBSixDQUFVLDZDQUFWLENBQU47QUFDRDs7QUFFRCxhQUFPLEtBQUtDLGdCQUFMLENBQXNCLEtBQUt2QixNQUEzQixDQUFQO0FBQ0QsS0FyQzBEOztBQXVDM0R1QixzQkFBa0IsU0FBU0EsZ0JBQVQsQ0FBMEJDLFVBQTFCLEVBQXNDO0FBQ3RELFVBQUlDLFFBQVEsSUFBWjs7QUFFQSxVQUFJLE9BQU9ELFVBQVAsS0FBc0IsUUFBdEIsSUFBa0NBLGVBQWUsRUFBckQsRUFBeUQ7QUFDdkRDLGdCQUFRLG9CQUFlO0FBQ3JCQyxtQkFBU0MsSUFBSUMsUUFBSixDQUFhQyxHQUREO0FBRXJCQyx3QkFBYyxRQUZPO0FBR3JCQyx3QkFBYyxRQUhPO0FBSXJCQyx5Q0FBNEJSLFdBQVdTLFdBQVgsRUFBNUIsT0FKcUI7QUFLckJDLG1CQUFTLFVBTFk7QUFNckJDLG1CQUFTLENBQUMsUUFBRCxFQUFXLGNBQVgsQ0FOWTtBQU9yQkMsc0JBQVksTUFQUztBQVFyQkMsMkJBQWlCLEtBUkk7QUFTckJDLGlCQUFPO0FBVGMsU0FBZixDQUFSO0FBV0Q7O0FBRUQsYUFBT2IsS0FBUDtBQUNELEtBekQwRDtBQTBEM0RjLHVCQUFtQixTQUFTQSxpQkFBVCxDQUEyQkMsV0FBM0IsRUFBd0M7QUFDekQsVUFBTUMsSUFBSSxLQUFLQyxpQkFBTCxDQUF1QkYsWUFBWVAsV0FBWixFQUF2QixDQUFWO0FBQ0EsNkJBQXFCUSxDQUFyQjtBQUNEO0FBN0QwRCxHQUE3QyxDQUFoQjs7b0JBZ0VlL0MsTyIsImZpbGUiOiJTZWxlY3Rvci5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBMaXN0IGZyb20gJ2FyZ29zL0xpc3QnO1xyXG5pbXBvcnQgU0RhdGFTdG9yZSBmcm9tICdhcmdvcy9TdG9yZS9TRGF0YSc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2dyb3Vwc1NlbGVjdG9yJyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5Hcm91cHMuU2VsZWN0b3JcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuTGlzdFxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuTGlzdFxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5Hcm91cHMuU2VsZWN0b3InLCBbTGlzdF0sIHtcclxuICBpZDogJ2dyb3Vwc19jb25maWd1cmUnLFxyXG4gIGV4cG9zZTogZmFsc2UsXHJcbiAgZW5hYmxlU2VhcmNoOiBmYWxzZSxcclxuICBpY29uOiAnJyxcclxuXHJcbiAgbGlzdFZpZXdJZDogJ2dyb3Vwc19saXN0JyxcclxuICBmYW1pbHk6ICcnLFxyXG5cclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBpc0NhcmRWaWV3OiBmYWxzZSxcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGg0PnslOiAkWyQkLmxhYmVsUHJvcGVydHldICV9PC9oND4nLFxyXG4gIF0pLFxyXG5cclxuICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnRvb2xzID0ge1xyXG4gICAgICB0YmFyOiBbXSxcclxuICAgIH07XHJcbiAgfSxcclxuXHJcbiAgYWN0aXZhdGVFbnRyeTogZnVuY3Rpb24gYWN0aXZhdGVFbnRyeShwYXJhbXMpIHtcclxuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25Nb2RlbCAmJiB0aGlzLmlzTmF2aWdhdGlvbkRpc2FibGVkKCkpIHtcclxuICAgICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwudG9nZ2xlKHBhcmFtcy5rZXksIHRoaXMuZW50cmllc1twYXJhbXMua2V5XSB8fCBwYXJhbXMuZGVzY3JpcHRvciwgcGFyYW1zLiRzb3VyY2UpO1xyXG4gICAgICBpZiAodGhpcy5vcHRpb25zLnNpbmdsZVNlbGVjdCAmJiB0aGlzLm9wdGlvbnMuc2luZ2xlU2VsZWN0QWN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5pbnZva2VTaW5nbGVTZWxlY3RBY3Rpb24oKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGNyZWF0ZVN0b3JlOiBmdW5jdGlvbiBjcmVhdGVTdG9yZSgpIHtcclxuICAgIGlmICghdGhpcy5mYW1pbHkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZ3JvdXBzIHNlbGVjdG9yIG11c3QgaGF2ZSBhIGZhbWlseSBzZXQuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlR3JvdXBTdG9yZSh0aGlzLmZhbWlseSk7XHJcbiAgfSxcclxuXHJcbiAgY3JlYXRlR3JvdXBTdG9yZTogZnVuY3Rpb24gY3JlYXRlR3JvdXBTdG9yZShlbnRpdHlOYW1lKSB7XHJcbiAgICBsZXQgc3RvcmUgPSBudWxsO1xyXG5cclxuICAgIGlmICh0eXBlb2YgZW50aXR5TmFtZSA9PT0gJ3N0cmluZycgJiYgZW50aXR5TmFtZSAhPT0gJycpIHtcclxuICAgICAgc3RvcmUgPSBuZXcgU0RhdGFTdG9yZSh7XHJcbiAgICAgICAgc2VydmljZTogQXBwLnNlcnZpY2VzLmNybSxcclxuICAgICAgICByZXNvdXJjZUtpbmQ6ICdncm91cHMnLFxyXG4gICAgICAgIGNvbnRyYWN0TmFtZTogJ3N5c3RlbScsXHJcbiAgICAgICAgd2hlcmU6IGB1cHBlcihmYW1pbHkpIGVxICcke2VudGl0eU5hbWUudG9VcHBlckNhc2UoKX0nYCxcclxuICAgICAgICBvcmRlckJ5OiAnbmFtZSBhc2MnLFxyXG4gICAgICAgIGluY2x1ZGU6IFsnbGF5b3V0JywgJ3RhYmxlQWxpYXNlcyddLFxyXG4gICAgICAgIGlkUHJvcGVydHk6ICcka2V5JyxcclxuICAgICAgICBhcHBsaWNhdGlvbk5hbWU6ICdzbHgnLFxyXG4gICAgICAgIHNjb3BlOiB0aGlzLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3RvcmU7XHJcbiAgfSxcclxuICBmb3JtYXRTZWFyY2hRdWVyeTogZnVuY3Rpb24gZm9ybWF0U2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkpIHtcclxuICAgIGNvbnN0IHEgPSB0aGlzLmVzY2FwZVNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5LnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgcmV0dXJuIGBuYW1lIGxpa2UgXCIke3F9JVwiYDtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==