define('crm/Integrations/BOE/Modules/BillToAccountModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './_Module', '../../../Views/Account/List', '../Views/ERPBillToAccounts/List', '../Views/ERPBillToAccounts/Edit', '../Views/ERPBillToAccounts/Detail', '../Views/ERPBillTos/List', '../Views/ERPInvoices/List', '../Views/Quotes/List', '../Views/ERPReceivables/List', '../Views/Returns/List', '../Views/SalesOrders/List', '../Models/ErpBillToAccount/Offline', '../Models/ErpBillToAccount/SData'], function (module, exports, _declare, _lang, _Module2, _List, _List3, _Edit, _Detail, _List5, _List7, _List9, _List11, _List13, _List15) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Module3 = _interopRequireDefault(_Module2);

  var _List2 = _interopRequireDefault(_List);

  var _List4 = _interopRequireDefault(_List3);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _List6 = _interopRequireDefault(_List5);

  var _List8 = _interopRequireDefault(_List7);

  var _List10 = _interopRequireDefault(_List9);

  var _List12 = _interopRequireDefault(_List11);

  var _List14 = _interopRequireDefault(_List13);

  var _List16 = _interopRequireDefault(_List15);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Modules.BillToAccountModule', [_Module3.default], {
    init: function init() {},
    loadViews: function loadViews() {
      var am = this.applicationModule;

      am.registerView(new _Detail2.default());
      am.registerView(new _Edit2.default());
      am.registerView(new _List4.default());

      am.registerView(new _List2.default({
        id: 'billtoaccount_accounts_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List2.default({
        id: 'billtoaccount_accounts',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List6.default({
        id: 'billtoaccount_erpbilltos',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List10.default({
        id: 'billtoaccount_openquotes_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List16.default({
        id: 'billtoaccount_salesorders_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List8.default({
        id: 'billtoaccount_openinvoices_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List12.default({
        id: 'billtoaccount_receivables_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List14.default({
        id: 'billtoaccount_returns_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
    },
    loadCustomizations: function loadCustomizations() {
      this.applicationModule.registerCustomization('detail/tools', 'erpbilltoaccounts_detail', {
        at: function at(tool) {
          return tool.id === 'edit';
        },
        type: 'remove'
      });
    },
    loadToolbars: function loadToolbars() {}
  }); /* Copyright 2017 Infor
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

  _lang2.default.setObject('icboe.Modules.BillToAccountModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZHVsZXMvQmlsbFRvQWNjb3VudE1vZHVsZS5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiaW5pdCIsImxvYWRWaWV3cyIsImFtIiwiYXBwbGljYXRpb25Nb2R1bGUiLCJyZWdpc3RlclZpZXciLCJpZCIsImV4cG9zZSIsImdyb3Vwc0VuYWJsZWQiLCJkZWZhdWx0U2VhcmNoVGVybSIsImxvYWRDdXN0b21pemF0aW9ucyIsInJlZ2lzdGVyQ3VzdG9taXphdGlvbiIsImF0IiwidG9vbCIsInR5cGUiLCJsb2FkVG9vbGJhcnMiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUErQkEsTUFBTUEsVUFBVSx1QkFBUSxrREFBUixFQUE0RCxrQkFBNUQsRUFBdUU7QUFDckZDLFVBQU0sU0FBU0EsSUFBVCxHQUFnQixDQUNyQixDQUZvRjtBQUdyRkMsZUFBVyxTQUFTQSxTQUFULEdBQXFCO0FBQzlCLFVBQU1DLEtBQUssS0FBS0MsaUJBQWhCOztBQUVBRCxTQUFHRSxZQUFILENBQWdCLHNCQUFoQjtBQUNBRixTQUFHRSxZQUFILENBQWdCLG9CQUFoQjtBQUNBRixTQUFHRSxZQUFILENBQWdCLG9CQUFoQjs7QUFFQUYsU0FBR0UsWUFBSCxDQUFnQixtQkFBZ0I7QUFDOUJDLFlBQUksZ0NBRDBCO0FBRTlCQyxnQkFBUSxLQUZzQjtBQUc5QkMsdUJBQWUsS0FIZTtBQUk5QkMsMkJBQW1CLFNBQVNBLGlCQUFULEdBQTZCO0FBQzlDLGlCQUFPLEVBQVA7QUFDRDtBQU42QixPQUFoQixDQUFoQjs7QUFTQU4sU0FBR0UsWUFBSCxDQUFnQixtQkFBZ0I7QUFDOUJDLFlBQUksd0JBRDBCO0FBRTlCQyxnQkFBUSxLQUZzQjtBQUc5QkMsdUJBQWUsS0FIZTtBQUk5QkMsMkJBQW1CLFNBQVNBLGlCQUFULEdBQTZCO0FBQzlDLGlCQUFPLEVBQVA7QUFDRDtBQU42QixPQUFoQixDQUFoQjs7QUFTQU4sU0FBR0UsWUFBSCxDQUFnQixtQkFBZ0I7QUFDOUJDLFlBQUksMEJBRDBCO0FBRTlCQyxnQkFBUSxLQUZzQjtBQUc5QkMsdUJBQWUsS0FIZTtBQUk5QkMsMkJBQW1CLFNBQVNBLGlCQUFULEdBQTZCO0FBQzlDLGlCQUFPLEVBQVA7QUFDRDtBQU42QixPQUFoQixDQUFoQjs7QUFTQU4sU0FBR0UsWUFBSCxDQUFnQixvQkFBZTtBQUM3QkMsWUFBSSxrQ0FEeUI7QUFFN0JDLGdCQUFRLEtBRnFCO0FBRzdCQyx1QkFBZSxLQUhjO0FBSTdCQywyQkFBbUIsU0FBU0EsaUJBQVQsR0FBNkI7QUFDOUMsaUJBQU8sRUFBUDtBQUNEO0FBTjRCLE9BQWYsQ0FBaEI7O0FBU0FOLFNBQUdFLFlBQUgsQ0FBZ0Isb0JBQW9CO0FBQ2xDQyxZQUFJLG1DQUQ4QjtBQUVsQ0MsZ0JBQVEsS0FGMEI7QUFHbENDLHVCQUFlLEtBSG1CO0FBSWxDQywyQkFBbUIsU0FBU0EsaUJBQVQsR0FBNkI7QUFDOUMsaUJBQU8sRUFBUDtBQUNEO0FBTmlDLE9BQXBCLENBQWhCOztBQVNBTixTQUFHRSxZQUFILENBQWdCLG1CQUFpQjtBQUMvQkMsWUFBSSxvQ0FEMkI7QUFFL0JDLGdCQUFRLEtBRnVCO0FBRy9CQyx1QkFBZSxLQUhnQjtBQUkvQkMsMkJBQW1CLFNBQVNBLGlCQUFULEdBQTZCO0FBQzlDLGlCQUFPLEVBQVA7QUFDRDtBQU44QixPQUFqQixDQUFoQjs7QUFTQU4sU0FBR0UsWUFBSCxDQUFnQixvQkFBb0I7QUFDbENDLFlBQUksbUNBRDhCO0FBRWxDQyxnQkFBUSxLQUYwQjtBQUdsQ0MsdUJBQWUsS0FIbUI7QUFJbENDLDJCQUFtQixTQUFTQSxpQkFBVCxHQUE2QjtBQUM5QyxpQkFBTyxFQUFQO0FBQ0Q7QUFOaUMsT0FBcEIsQ0FBaEI7O0FBU0FOLFNBQUdFLFlBQUgsQ0FBZ0Isb0JBQWdCO0FBQzlCQyxZQUFJLCtCQUQwQjtBQUU5QkMsZ0JBQVEsS0FGc0I7QUFHOUJDLHVCQUFlLEtBSGU7QUFJOUJDLDJCQUFtQixTQUFTQSxpQkFBVCxHQUE2QjtBQUM5QyxpQkFBTyxFQUFQO0FBQ0Q7QUFONkIsT0FBaEIsQ0FBaEI7QUFRRCxLQWpGb0Y7QUFrRnJGQyx3QkFBb0IsU0FBU0Esa0JBQVQsR0FBOEI7QUFDaEQsV0FBS04saUJBQUwsQ0FBdUJPLHFCQUF2QixDQUE2QyxjQUE3QyxFQUE2RCwwQkFBN0QsRUFBeUY7QUFDdkZDLFlBQUksU0FBU0EsRUFBVCxDQUFZQyxJQUFaLEVBQWtCO0FBQ3BCLGlCQUFPQSxLQUFLUCxFQUFMLEtBQVksTUFBbkI7QUFDRCxTQUhzRjtBQUl2RlEsY0FBTTtBQUppRixPQUF6RjtBQU1ELEtBekZvRjtBQTBGckZDLGtCQUFjLFNBQVNBLFlBQVQsR0FBd0IsQ0FDckM7QUEzRm9GLEdBQXZFLENBQWhCLEMsQ0EvQkE7Ozs7Ozs7Ozs7Ozs7OztBQTZIQSxpQkFBS0MsU0FBTCxDQUFlLG1DQUFmLEVBQW9EaEIsT0FBcEQ7b0JBQ2VBLE8iLCJmaWxlIjoiQmlsbFRvQWNjb3VudE1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBfTW9kdWxlIGZyb20gJy4vX01vZHVsZSc7XHJcbmltcG9ydCBBY2NvdW50TGlzdCBmcm9tICcuLi8uLi8uLi9WaWV3cy9BY2NvdW50L0xpc3QnO1xyXG5pbXBvcnQgQmlsbFRvQWNjb3VudExpc3QgZnJvbSAnLi4vVmlld3MvRVJQQmlsbFRvQWNjb3VudHMvTGlzdCc7XHJcbmltcG9ydCBCaWxsVG9BY2NvdW50RWRpdCBmcm9tICcuLi9WaWV3cy9FUlBCaWxsVG9BY2NvdW50cy9FZGl0JztcclxuaW1wb3J0IEJpbGxUb0FjY291bnREZXRhaWwgZnJvbSAnLi4vVmlld3MvRVJQQmlsbFRvQWNjb3VudHMvRGV0YWlsJztcclxuaW1wb3J0IEJpbGxUb3NMaXN0IGZyb20gJy4uL1ZpZXdzL0VSUEJpbGxUb3MvTGlzdCc7XHJcbmltcG9ydCBJbnZvaWNlc0xpc3QgZnJvbSAnLi4vVmlld3MvRVJQSW52b2ljZXMvTGlzdCc7XHJcbmltcG9ydCBRdW90ZXNMaXN0IGZyb20gJy4uL1ZpZXdzL1F1b3Rlcy9MaXN0JztcclxuaW1wb3J0IFJlY2VpdmFibGVzTGlzdCBmcm9tICcuLi9WaWV3cy9FUlBSZWNlaXZhYmxlcy9MaXN0JztcclxuaW1wb3J0IFJldHVybnNMaXN0IGZyb20gJy4uL1ZpZXdzL1JldHVybnMvTGlzdCc7XHJcbmltcG9ydCBTYWxlc09yZGVyc0xpc3QgZnJvbSAnLi4vVmlld3MvU2FsZXNPcmRlcnMvTGlzdCc7XHJcbmltcG9ydCAnLi4vTW9kZWxzL0VycEJpbGxUb0FjY291bnQvT2ZmbGluZSc7XHJcbmltcG9ydCAnLi4vTW9kZWxzL0VycEJpbGxUb0FjY291bnQvU0RhdGEnO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLk1vZHVsZXMuQmlsbFRvQWNjb3VudE1vZHVsZScsIFtfTW9kdWxlXSwge1xyXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgfSxcclxuICBsb2FkVmlld3M6IGZ1bmN0aW9uIGxvYWRWaWV3cygpIHtcclxuICAgIGNvbnN0IGFtID0gdGhpcy5hcHBsaWNhdGlvbk1vZHVsZTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IEJpbGxUb0FjY291bnREZXRhaWwoKSk7XHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IEJpbGxUb0FjY291bnRFZGl0KCkpO1xyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBCaWxsVG9BY2NvdW50TGlzdCgpKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IEFjY291bnRMaXN0KHtcclxuICAgICAgaWQ6ICdiaWxsdG9hY2NvdW50X2FjY291bnRzX3JlbGF0ZWQnLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICAgICAgZGVmYXVsdFNlYXJjaFRlcm06IGZ1bmN0aW9uIGRlZmF1bHRTZWFyY2hUZXJtKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgICAgfSxcclxuICAgIH0pKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IEFjY291bnRMaXN0KHtcclxuICAgICAgaWQ6ICdiaWxsdG9hY2NvdW50X2FjY291bnRzJyxcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgICAgZ3JvdXBzRW5hYmxlZDogZmFsc2UsXHJcbiAgICAgIGRlZmF1bHRTZWFyY2hUZXJtOiBmdW5jdGlvbiBkZWZhdWx0U2VhcmNoVGVybSgpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgIH0sXHJcbiAgICB9KSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBCaWxsVG9zTGlzdCh7XHJcbiAgICAgIGlkOiAnYmlsbHRvYWNjb3VudF9lcnBiaWxsdG9zJyxcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgICAgZ3JvdXBzRW5hYmxlZDogZmFsc2UsXHJcbiAgICAgIGRlZmF1bHRTZWFyY2hUZXJtOiBmdW5jdGlvbiBkZWZhdWx0U2VhcmNoVGVybSgpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgIH0sXHJcbiAgICB9KSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBRdW90ZXNMaXN0KHtcclxuICAgICAgaWQ6ICdiaWxsdG9hY2NvdW50X29wZW5xdW90ZXNfcmVsYXRlZCcsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIGdyb3Vwc0VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBkZWZhdWx0U2VhcmNoVGVybTogZnVuY3Rpb24gZGVmYXVsdFNlYXJjaFRlcm0oKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgU2FsZXNPcmRlcnNMaXN0KHtcclxuICAgICAgaWQ6ICdiaWxsdG9hY2NvdW50X3NhbGVzb3JkZXJzX3JlbGF0ZWQnLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICAgICAgZGVmYXVsdFNlYXJjaFRlcm06IGZ1bmN0aW9uIGRlZmF1bHRTZWFyY2hUZXJtKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgICAgfSxcclxuICAgIH0pKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IEludm9pY2VzTGlzdCh7XHJcbiAgICAgIGlkOiAnYmlsbHRvYWNjb3VudF9vcGVuaW52b2ljZXNfcmVsYXRlZCcsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIGdyb3Vwc0VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBkZWZhdWx0U2VhcmNoVGVybTogZnVuY3Rpb24gZGVmYXVsdFNlYXJjaFRlcm0oKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgUmVjZWl2YWJsZXNMaXN0KHtcclxuICAgICAgaWQ6ICdiaWxsdG9hY2NvdW50X3JlY2VpdmFibGVzX3JlbGF0ZWQnLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICAgICAgZGVmYXVsdFNlYXJjaFRlcm06IGZ1bmN0aW9uIGRlZmF1bHRTZWFyY2hUZXJtKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgICAgfSxcclxuICAgIH0pKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IFJldHVybnNMaXN0KHtcclxuICAgICAgaWQ6ICdiaWxsdG9hY2NvdW50X3JldHVybnNfcmVsYXRlZCcsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIGdyb3Vwc0VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBkZWZhdWx0U2VhcmNoVGVybTogZnVuY3Rpb24gZGVmYXVsdFNlYXJjaFRlcm0oKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG4gIH0sXHJcbiAgbG9hZEN1c3RvbWl6YXRpb25zOiBmdW5jdGlvbiBsb2FkQ3VzdG9taXphdGlvbnMoKSB7XHJcbiAgICB0aGlzLmFwcGxpY2F0aW9uTW9kdWxlLnJlZ2lzdGVyQ3VzdG9taXphdGlvbignZGV0YWlsL3Rvb2xzJywgJ2VycGJpbGx0b2FjY291bnRzX2RldGFpbCcsIHtcclxuICAgICAgYXQ6IGZ1bmN0aW9uIGF0KHRvb2wpIHtcclxuICAgICAgICByZXR1cm4gdG9vbC5pZCA9PT0gJ2VkaXQnO1xyXG4gICAgICB9LFxyXG4gICAgICB0eXBlOiAncmVtb3ZlJyxcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgbG9hZFRvb2xiYXJzOiBmdW5jdGlvbiBsb2FkVG9vbGJhcnMoKSB7XHJcbiAgfSxcclxufSk7XHJcblxyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuTW9kdWxlcy5CaWxsVG9BY2NvdW50TW9kdWxlJywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==