define('crm/Integrations/BOE/Modules/ShipToModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './_Module', 'crm/Views/Account/List', '../Views/ERPBillTos/List', '../Views/ERPInvoices/List', '../Views/Quotes/List', '../Views/ERPReceivables/List', '../Views/Returns/List', '../Views/SalesOrders/List', '../Views/ERPShipTos/Detail', '../Views/ERPShipTos/Edit', '../Views/ERPShipTos/List', '../Views/SyncResults/List', '../Models/ErpShipToAccount/Offline', '../Models/ErpShipToAccount/SData', '../Models/ErpShipTo/Offline', '../Models/ErpShipTo/SData'], function (module, exports, _declare, _lang, _Module2, _List, _List3, _List5, _List7, _List9, _List11, _List13, _Detail, _Edit, _List15, _List17) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Module3 = _interopRequireDefault(_Module2);

  var _List2 = _interopRequireDefault(_List);

  var _List4 = _interopRequireDefault(_List3);

  var _List6 = _interopRequireDefault(_List5);

  var _List8 = _interopRequireDefault(_List7);

  var _List10 = _interopRequireDefault(_List9);

  var _List12 = _interopRequireDefault(_List11);

  var _List14 = _interopRequireDefault(_List13);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _List16 = _interopRequireDefault(_List15);

  var _List18 = _interopRequireDefault(_List17);

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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Modules.ShipToModule', [_Module3.default], {
    init: function init() {
      App.picklistService.registerPicklistToView('SyncStatus', 'erpshipto_detail');
    },
    loadViews: function loadViews() {
      var am = this.applicationModule;
      am.registerView(new _List16.default());
      am.registerView(new _Detail2.default());
      am.registerView(new _Edit2.default());

      am.registerView(new _List2.default({
        id: 'shipto_accounts_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      am.registerView(new _List4.default({
        id: 'shipto_billtos_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      am.registerView(new _List8.default({
        id: 'shipto_quotes_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      am.registerView(new _List14.default({
        id: 'shipto_orders_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      am.registerView(new _List10.default({
        id: 'shipto_receivables_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      am.registerView(new _List6.default({
        id: 'shipto_invoices_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      am.registerView(new _List12.default({
        id: 'shipto_returns_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      am.registerView(new _List18.default({
        id: 'shipto_synchistory_related'
      }));
    },
    loadCustomizations: function loadCustomizations() {
      var am = this.applicationModule;
      am.registerCustomization('detail/tools', 'erpshipto_detail', {
        at: function at(tool) {
          return tool.id === 'edit';
        },
        type: 'remove'
      });
      am.registerCustomization('list/tools', 'shipto_accounts_related', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });
      am.registerCustomization('list/tools', 'shipto_receivables_related', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });
      am.registerCustomization('list/tools', 'shipto_invoices_related', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });
      am.registerCustomization('list/tools', 'shipto_returns_related', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });
    },
    loadToolbars: function loadToolbars() {}
  });

  _lang2.default.setObject('icboe.Modules.ShipToModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZHVsZXMvU2hpcFRvTW9kdWxlLmpzIl0sIm5hbWVzIjpbIl9fY2xhc3MiLCJpbml0IiwiQXBwIiwicGlja2xpc3RTZXJ2aWNlIiwicmVnaXN0ZXJQaWNrbGlzdFRvVmlldyIsImxvYWRWaWV3cyIsImFtIiwiYXBwbGljYXRpb25Nb2R1bGUiLCJyZWdpc3RlclZpZXciLCJpZCIsImV4cG9zZSIsImdyb3Vwc0VuYWJsZWQiLCJkZWZhdWx0U2VhcmNoVGVybSIsImxvYWRDdXN0b21pemF0aW9ucyIsInJlZ2lzdGVyQ3VzdG9taXphdGlvbiIsImF0IiwidG9vbCIsInR5cGUiLCJsb2FkVG9vbGJhcnMiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFrQ0EsTUFBTUEsVUFBVSx1QkFBUSwyQ0FBUixFQUFxRCxrQkFBckQsRUFBZ0U7QUFDOUVDLFVBQU0sU0FBU0EsSUFBVCxHQUFnQjtBQUNwQkMsVUFBSUMsZUFBSixDQUFvQkMsc0JBQXBCLENBQTJDLFlBQTNDLEVBQXlELGtCQUF6RDtBQUNELEtBSDZFO0FBSTlFQyxlQUFXLFNBQVNBLFNBQVQsR0FBcUI7QUFDOUIsVUFBTUMsS0FBSyxLQUFLQyxpQkFBaEI7QUFDQUQsU0FBR0UsWUFBSCxDQUFnQixxQkFBaEI7QUFDQUYsU0FBR0UsWUFBSCxDQUFnQixzQkFBaEI7QUFDQUYsU0FBR0UsWUFBSCxDQUFnQixvQkFBaEI7O0FBRUFGLFNBQUdFLFlBQUgsQ0FBZ0IsbUJBQWdCO0FBQzlCQyxZQUFJLHlCQUQwQjtBQUU5QkMsZ0JBQVEsS0FGc0I7QUFHOUJDLHVCQUFlLEtBSGU7QUFJOUJDLDJCQUFtQixTQUFTQSxpQkFBVCxHQUE2QjtBQUM5QyxpQkFBTyxFQUFQO0FBQ0Q7QUFONkIsT0FBaEIsQ0FBaEI7QUFRQU4sU0FBR0UsWUFBSCxDQUFnQixt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TUQsS0F0RzZFO0FBdUc5RUMsa0JBQWMsU0FBU0EsWUFBVCxHQUF3QixDQUNyQztBQXhHNkUsR0FBaEUsQ0FBaEI7O0FBMkdBLGlCQUFLQyxTQUFMLENBQWUsNEJBQWYsRUFBNkNuQixPQUE3QztvQkFDZUEsTyIsImZpbGUiOiJTaGlwVG9Nb2R1bGUuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgX01vZHVsZSBmcm9tICcuL19Nb2R1bGUnO1xyXG5pbXBvcnQgQWNjb3VudExpc3QgZnJvbSAnY3JtL1ZpZXdzL0FjY291bnQvTGlzdCc7XHJcbmltcG9ydCBCaWxsVG9MaXN0IGZyb20gJy4uL1ZpZXdzL0VSUEJpbGxUb3MvTGlzdCc7XHJcbmltcG9ydCBJbnZvaWNlTGlzdCBmcm9tICcuLi9WaWV3cy9FUlBJbnZvaWNlcy9MaXN0JztcclxuaW1wb3J0IFF1b3RlTGlzdCBmcm9tICcuLi9WaWV3cy9RdW90ZXMvTGlzdCc7XHJcbmltcG9ydCBSZWNlaXZhYmxlTGlzdCBmcm9tICcuLi9WaWV3cy9FUlBSZWNlaXZhYmxlcy9MaXN0JztcclxuaW1wb3J0IFJldHVybkxpc3QgZnJvbSAnLi4vVmlld3MvUmV0dXJucy9MaXN0JztcclxuaW1wb3J0IFNhbGVzT3JkZXJMaXN0IGZyb20gJy4uL1ZpZXdzL1NhbGVzT3JkZXJzL0xpc3QnO1xyXG5pbXBvcnQgU2hpcFRvRGV0YWlsIGZyb20gJy4uL1ZpZXdzL0VSUFNoaXBUb3MvRGV0YWlsJztcclxuaW1wb3J0IFNoaXBUb0VkaXQgZnJvbSAnLi4vVmlld3MvRVJQU2hpcFRvcy9FZGl0JztcclxuaW1wb3J0IFNoaXBUb0xpc3QgZnJvbSAnLi4vVmlld3MvRVJQU2hpcFRvcy9MaXN0JztcclxuaW1wb3J0IFN5bmNSZXN1bHRzTGlzdCBmcm9tICcuLi9WaWV3cy9TeW5jUmVzdWx0cy9MaXN0JztcclxuaW1wb3J0ICcuLi9Nb2RlbHMvRXJwU2hpcFRvQWNjb3VudC9PZmZsaW5lJztcclxuaW1wb3J0ICcuLi9Nb2RlbHMvRXJwU2hpcFRvQWNjb3VudC9TRGF0YSc7XHJcbmltcG9ydCAnLi4vTW9kZWxzL0VycFNoaXBUby9PZmZsaW5lJztcclxuaW1wb3J0ICcuLi9Nb2RlbHMvRXJwU2hpcFRvL1NEYXRhJztcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5Nb2R1bGVzLlNoaXBUb01vZHVsZScsIFtfTW9kdWxlXSwge1xyXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICBBcHAucGlja2xpc3RTZXJ2aWNlLnJlZ2lzdGVyUGlja2xpc3RUb1ZpZXcoJ1N5bmNTdGF0dXMnLCAnZXJwc2hpcHRvX2RldGFpbCcpO1xyXG4gIH0sXHJcbiAgbG9hZFZpZXdzOiBmdW5jdGlvbiBsb2FkVmlld3MoKSB7XHJcbiAgICBjb25zdCBhbSA9IHRoaXMuYXBwbGljYXRpb25Nb2R1bGU7XHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IFNoaXBUb0xpc3QoKSk7XHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IFNoaXBUb0RldGFpbCgpKTtcclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgU2hpcFRvRWRpdCgpKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IEFjY291bnRMaXN0KHtcclxuICAgICAgaWQ6ICdzaGlwdG9fYWNjb3VudHNfcmVsYXRlZCcsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIGdyb3Vwc0VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBkZWZhdWx0U2VhcmNoVGVybTogZnVuY3Rpb24gZGVmYXVsdFNlYXJjaFRlcm0oKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBCaWxsVG9MaXN0KHtcclxuICAgICAgaWQ6ICdzaGlwdG9fYmlsbHRvc19yZWxhdGVkJyxcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgICAgZ3JvdXBzRW5hYmxlZDogZmFsc2UsXHJcbiAgICAgIGRlZmF1bHRTZWFyY2hUZXJtOiBmdW5jdGlvbiBkZWZhdWx0U2VhcmNoVGVybSgpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgIH0sXHJcbiAgICB9KSk7XHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IFF1b3RlTGlzdCh7XHJcbiAgICAgIGlkOiAnc2hpcHRvX3F1b3Rlc19yZWxhdGVkJyxcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgICAgZ3JvdXBzRW5hYmxlZDogZmFsc2UsXHJcbiAgICAgIGRlZmF1bHRTZWFyY2hUZXJtOiBmdW5jdGlvbiBkZWZhdWx0U2VhcmNoVGVybSgpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgIH0sXHJcbiAgICB9KSk7XHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IFNhbGVzT3JkZXJMaXN0KHtcclxuICAgICAgaWQ6ICdzaGlwdG9fb3JkZXJzX3JlbGF0ZWQnLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICAgICAgZGVmYXVsdFNlYXJjaFRlcm06IGZ1bmN0aW9uIGRlZmF1bHRTZWFyY2hUZXJtKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgICAgfSxcclxuICAgIH0pKTtcclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgUmVjZWl2YWJsZUxpc3Qoe1xyXG4gICAgICBpZDogJ3NoaXB0b19yZWNlaXZhYmxlc19yZWxhdGVkJyxcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgICAgZ3JvdXBzRW5hYmxlZDogZmFsc2UsXHJcbiAgICAgIGRlZmF1bHRTZWFyY2hUZXJtOiBmdW5jdGlvbiBkZWZhdWx0U2VhcmNoVGVybSgpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgIH0sXHJcbiAgICB9KSk7XHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IEludm9pY2VMaXN0KHtcclxuICAgICAgaWQ6ICdzaGlwdG9faW52b2ljZXNfcmVsYXRlZCcsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIGdyb3Vwc0VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBkZWZhdWx0U2VhcmNoVGVybTogZnVuY3Rpb24gZGVmYXVsdFNlYXJjaFRlcm0oKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBSZXR1cm5MaXN0KHtcclxuICAgICAgaWQ6ICdzaGlwdG9fcmV0dXJuc19yZWxhdGVkJyxcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgICAgZ3JvdXBzRW5hYmxlZDogZmFsc2UsXHJcbiAgICAgIGRlZmF1bHRTZWFyY2hUZXJtOiBmdW5jdGlvbiBkZWZhdWx0U2VhcmNoVGVybSgpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgIH0sXHJcbiAgICB9KSk7XHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IFN5bmNSZXN1bHRzTGlzdCh7XHJcbiAgICAgIGlkOiAnc2hpcHRvX3N5bmNoaXN0b3J5X3JlbGF0ZWQnLFxyXG4gICAgfSkpO1xyXG4gIH0sXHJcbiAgbG9hZEN1c3RvbWl6YXRpb25zOiBmdW5jdGlvbiBsb2FkQ3VzdG9taXphdGlvbnMoKSB7XHJcbiAgICBjb25zdCBhbSA9IHRoaXMuYXBwbGljYXRpb25Nb2R1bGU7XHJcbiAgICBhbS5yZWdpc3RlckN1c3RvbWl6YXRpb24oJ2RldGFpbC90b29scycsICdlcnBzaGlwdG9fZGV0YWlsJywge1xyXG4gICAgICBhdDogZnVuY3Rpb24gYXQodG9vbCkge1xyXG4gICAgICAgIHJldHVybiB0b29sLmlkID09PSAnZWRpdCc7XHJcbiAgICAgIH0sXHJcbiAgICAgIHR5cGU6ICdyZW1vdmUnLFxyXG4gICAgfSk7XHJcbiAgICBhbS5yZWdpc3RlckN1c3RvbWl6YXRpb24oJ2xpc3QvdG9vbHMnLCAnc2hpcHRvX2FjY291bnRzX3JlbGF0ZWQnLCB7XHJcbiAgICAgIGF0OiAodG9vbCkgPT4ge1xyXG4gICAgICAgIHJldHVybiB0b29sLmlkID09PSAnbmV3JztcclxuICAgICAgfSxcclxuICAgICAgdHlwZTogJ3JlbW92ZScsXHJcbiAgICB9KTtcclxuICAgIGFtLnJlZ2lzdGVyQ3VzdG9taXphdGlvbignbGlzdC90b29scycsICdzaGlwdG9fcmVjZWl2YWJsZXNfcmVsYXRlZCcsIHtcclxuICAgICAgYXQ6ICh0b29sKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRvb2wuaWQgPT09ICduZXcnO1xyXG4gICAgICB9LFxyXG4gICAgICB0eXBlOiAncmVtb3ZlJyxcclxuICAgIH0pO1xyXG4gICAgYW0ucmVnaXN0ZXJDdXN0b21pemF0aW9uKCdsaXN0L3Rvb2xzJywgJ3NoaXB0b19pbnZvaWNlc19yZWxhdGVkJywge1xyXG4gICAgICBhdDogKHRvb2wpID0+IHtcclxuICAgICAgICByZXR1cm4gdG9vbC5pZCA9PT0gJ25ldyc7XHJcbiAgICAgIH0sXHJcbiAgICAgIHR5cGU6ICdyZW1vdmUnLFxyXG4gICAgfSk7XHJcbiAgICBhbS5yZWdpc3RlckN1c3RvbWl6YXRpb24oJ2xpc3QvdG9vbHMnLCAnc2hpcHRvX3JldHVybnNfcmVsYXRlZCcsIHtcclxuICAgICAgYXQ6ICh0b29sKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRvb2wuaWQgPT09ICduZXcnO1xyXG4gICAgICB9LFxyXG4gICAgICB0eXBlOiAncmVtb3ZlJyxcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgbG9hZFRvb2xiYXJzOiBmdW5jdGlvbiBsb2FkVG9vbGJhcnMoKSB7XHJcbiAgfSxcclxufSk7XHJcblxyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuTW9kdWxlcy5TaGlwVG9Nb2R1bGUnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19