define('crm/Integrations/BOE/Modules/ShipToAccountModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './_Module', '../Views/ERPShipToAccounts/List', '../Views/ERPShipToAccounts/Detail', '../Views/ERPShipToAccounts/Edit', 'crm/Views/Account/List', '../Views/Quotes/List', '../Views/SalesOrders/List', '../Views/ERPInvoices/List', '../Views/ERPShipments/List', '../Views/ERPReceivables/List', '../Views/Returns/List', '../Views/ERPContactAssociations/List', '../Views/ERPSalesOrderPersons/List', '../Views/ERPBillToAccounts/List', '../Views/ERPShipTos/List', '../Models/ErpShipToAccount/Offline', '../Models/ErpShipToAccount/SData'], function (module, exports, _declare, _lang, _Module2, _List, _Detail, _Edit, _List3, _List5, _List7, _List9, _List11, _List13, _List15, _List17, _List19, _List21, _List23) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Module3 = _interopRequireDefault(_Module2);

  var _List2 = _interopRequireDefault(_List);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _List4 = _interopRequireDefault(_List3);

  var _List6 = _interopRequireDefault(_List5);

  var _List8 = _interopRequireDefault(_List7);

  var _List10 = _interopRequireDefault(_List9);

  var _List12 = _interopRequireDefault(_List11);

  var _List14 = _interopRequireDefault(_List13);

  var _List16 = _interopRequireDefault(_List15);

  var _List18 = _interopRequireDefault(_List17);

  var _List20 = _interopRequireDefault(_List19);

  var _List22 = _interopRequireDefault(_List21);

  var _List24 = _interopRequireDefault(_List23);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Modules.ShipToAccountModule', [_Module3.default], {
    init: function init() {},
    loadViews: function loadViews() {
      var am = this.applicationModule;

      am.registerView(new _Detail2.default());
      am.registerView(new _Edit2.default());
      am.registerView(new _List2.default());

      am.registerView(new _List2.default({
        id: 'erpshiptoaccount_related',
        groupsEnabled: false,
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List4.default({
        id: 'erpshiptoaccount_accounts',
        groupsEnabled: false,
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List4.default({
        id: 'erpshiptoaccount_accounts_related',
        groupsEnabled: false,
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List6.default({
        id: 'erpshiptoaccount_quotes_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List8.default({
        id: 'erpshiptoaccount_salesorders_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List10.default({
        id: 'erpshiptoaccount_invoices_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List12.default({
        id: 'erpshiptoaccount_shipments_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List14.default({
        id: 'erpshiptoaccount_receivables_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List16.default({
        id: 'erpshiptoaccount_returns_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List18.default({
        id: 'erpshiptoaccount_contactassociations_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List22.default({
        id: 'erpshiptoaccount_billto_related',
        groupsEnabled: false,
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List24.default({
        id: 'erpshiptoaccount_erpshiptos',
        groupsEnabled: false,
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List20.default({
        id: 'erpshiptoaccount_salesperson_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
    },
    loadCustomizations: function loadCustomizations() {
      var am = this.applicationModule;
      am.registerCustomization('detail/tools', 'erpshiptoaccount_detail', {
        at: function at(tool) {
          return tool.id === 'edit';
        },
        type: 'remove'
      });
      am.registerCustomization('list/tools', 'erpshiptoaccount_invoices_related', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });
      am.registerCustomization('list/tools', 'erpshiptoaccount_shipments_related', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });
      am.registerCustomization('list/tools', 'erpshiptoaccount_receivables_related', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });
      am.registerCustomization('list/tools', 'erpshiptoaccount_returns_related', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });
      am.registerCustomization('list/tools', 'erpshiptoaccount_contactassociations_related', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });
      am.registerCustomization('list/tools', 'erpshiptoaccount_salesperson_related', {
        at: function at(tool) {
          return tool.id === 'new';
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

  _lang2.default.setObject('icboe.Modules.ShipToAccountModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZHVsZXMvU2hpcFRvQWNjb3VudE1vZHVsZS5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiaW5pdCIsImxvYWRWaWV3cyIsImFtIiwiYXBwbGljYXRpb25Nb2R1bGUiLCJyZWdpc3RlclZpZXciLCJpZCIsImdyb3Vwc0VuYWJsZWQiLCJleHBvc2UiLCJkZWZhdWx0U2VhcmNoVGVybSIsImhhc1NldHRpbmdzIiwibG9hZEN1c3RvbWl6YXRpb25zIiwicmVnaXN0ZXJDdXN0b21pemF0aW9uIiwiYXQiLCJ0b29sIiwidHlwZSIsImxvYWRUb29sYmFycyIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUNBLE1BQU1BLFVBQVUsdUJBQVEsa0RBQVIsRUFBNEQsa0JBQTVELEVBQXVFO0FBQ3JGQyxVQUFNLFNBQVNBLElBQVQsR0FBZ0IsQ0FDckIsQ0FGb0Y7QUFHckZDLGVBQVcsU0FBU0EsU0FBVCxHQUFxQjtBQUM5QixVQUFNQyxLQUFLLEtBQUtDLGlCQUFoQjs7QUFFQUQsU0FBR0UsWUFBSCxDQUFnQixzQkFBaEI7QUFDQUYsU0FBR0UsWUFBSCxDQUFnQixvQkFBaEI7QUFDQUYsU0FBR0UsWUFBSCxDQUFnQixvQkFBaEI7O0FBRUFGLFNBQUdFLFlBQUgsQ0FBZ0IsbUJBQXNCO0FBQ3BDQyxZQUFJLDBCQURnQztBQUVwQ0MsdUJBQWUsS0FGcUI7QUFHcENDLGdCQUFRLEtBSDRCO0FBSXBDQywyQkFBbUIsU0FBU0EsaUJBQVQsR0FBNkI7QUFDOUMsaUJBQU8sRUFBUDtBQUNEO0FBTm1DLE9BQXRCLENBQWhCOztBQVNBTixTQUFHRSxZQUFILENBQWdCLG1CQUFnQjtBQUM5QkMsWUFBSSwyQkFEMEI7QUFFOUJDLHVCQUFlLEtBRmU7QUFHOUJDLGdCQUFRLEtBSHNCO0FBSTlCQywyQkFBbUIsU0FBU0EsaUJBQVQsR0FBNkI7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O0FBQ3pFQyxZQUFJLFNBQVNBLEVBQVQsQ0FBWUMsSUFBWixFQUFrQjtBQUNwQixpQkFBT0EsS0FBS1IsRUFBTCxLQUFZLEtBQW5CO0FBQ0QsU0FId0U7QUFJekVTLGNBQU07QUFKbUUsT0FBM0U7QUFNQVosU0FBR1MscUJBQUgsQ0FBeUIsWUFBekIsRUFBdUMsOENBQXZDLEVBQXVGO0FBQ3JGQyxZQUFJLFNBQVNBLEVBQVQsQ0FBWUMsSUFBWixFQUFrQjtBQUNwQixpQkFBT0EsS0FBS1IsRUFBTCxLQUFZLEtBQW5CO0FBQ0QsU0FIb0Y7QUFJckZTLGNBQU07QUFKK0UsT0FBdkY7QUFNQVosU0FBR1MscUJBQUgsQ0FBeUIsWUFBekIsRUFBdUMsc0NBQXZDLEVBQStFO0FBQzdFQyxZQUFJLFNBQVNBLEVBQVQsQ0FBWUMsSUFBWixFQUFrQjtBQUNwQixpQkFBT0EsS0FBS1IsRUFBTCxLQUFZLEtBQW5CO0FBQ0QsU0FINEU7QUFJN0VTLGNBQU07QUFKdUUsT0FBL0U7QUFNRCxLQW5Mb0Y7QUFvTHJGQyxrQkFBYyxTQUFTQSxZQUFULEdBQXdCLENBQ3JDO0FBckxvRixHQUF2RSxDQUFoQixDLENBbkNBOzs7Ozs7Ozs7Ozs7Ozs7QUEyTkEsaUJBQUtDLFNBQUwsQ0FBZSxtQ0FBZixFQUFvRGpCLE9BQXBEO29CQUNlQSxPIiwiZmlsZSI6IlNoaXBUb0FjY291bnRNb2R1bGUuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgX01vZHVsZSBmcm9tICcuL19Nb2R1bGUnO1xyXG5pbXBvcnQgU2hpcFRvQWNjb3VudExpc3QgZnJvbSAnLi4vVmlld3MvRVJQU2hpcFRvQWNjb3VudHMvTGlzdCc7XHJcbmltcG9ydCBTaGlwVG9BY2NvdW50RGV0YWlsIGZyb20gJy4uL1ZpZXdzL0VSUFNoaXBUb0FjY291bnRzL0RldGFpbCc7XHJcbmltcG9ydCBTaGlwVG9BY2NvdW50RWRpdCBmcm9tICcuLi9WaWV3cy9FUlBTaGlwVG9BY2NvdW50cy9FZGl0JztcclxuaW1wb3J0IEFjY291bnRMaXN0IGZyb20gJ2NybS9WaWV3cy9BY2NvdW50L0xpc3QnO1xyXG5pbXBvcnQgUXVvdGVzTGlzdCBmcm9tICcuLi9WaWV3cy9RdW90ZXMvTGlzdCc7XHJcbmltcG9ydCBTYWxlc09yZGVyc0xpc3QgZnJvbSAnLi4vVmlld3MvU2FsZXNPcmRlcnMvTGlzdCc7XHJcbmltcG9ydCBJbnZvaWNlc0xpc3QgZnJvbSAnLi4vVmlld3MvRVJQSW52b2ljZXMvTGlzdCc7XHJcbmltcG9ydCBTaGlwbWVudHNMaXN0IGZyb20gJy4uL1ZpZXdzL0VSUFNoaXBtZW50cy9MaXN0JztcclxuaW1wb3J0IFJlY2VpdmFibGVzTGlzdCBmcm9tICcuLi9WaWV3cy9FUlBSZWNlaXZhYmxlcy9MaXN0JztcclxuaW1wb3J0IFJldHVybnNMaXN0IGZyb20gJy4uL1ZpZXdzL1JldHVybnMvTGlzdCc7XHJcbmltcG9ydCBDb250YWN0QXNzb2NpYXRpb25zTGlzdCBmcm9tICcuLi9WaWV3cy9FUlBDb250YWN0QXNzb2NpYXRpb25zL0xpc3QnO1xyXG5pbXBvcnQgU2FsZXNQZXJzb25MaXN0IGZyb20gJy4uL1ZpZXdzL0VSUFNhbGVzT3JkZXJQZXJzb25zL0xpc3QnO1xyXG5pbXBvcnQgQmlsbFRvTGlzdCBmcm9tICcuLi9WaWV3cy9FUlBCaWxsVG9BY2NvdW50cy9MaXN0JztcclxuaW1wb3J0IFNoaXBUb0xpc3QgZnJvbSAnLi4vVmlld3MvRVJQU2hpcFRvcy9MaXN0JztcclxuaW1wb3J0ICcuLi9Nb2RlbHMvRXJwU2hpcFRvQWNjb3VudC9PZmZsaW5lJztcclxuaW1wb3J0ICcuLi9Nb2RlbHMvRXJwU2hpcFRvQWNjb3VudC9TRGF0YSc7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuTW9kdWxlcy5TaGlwVG9BY2NvdW50TW9kdWxlJywgW19Nb2R1bGVdLCB7XHJcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICB9LFxyXG4gIGxvYWRWaWV3czogZnVuY3Rpb24gbG9hZFZpZXdzKCkge1xyXG4gICAgY29uc3QgYW0gPSB0aGlzLmFwcGxpY2F0aW9uTW9kdWxlO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgU2hpcFRvQWNjb3VudERldGFpbCgpKTtcclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgU2hpcFRvQWNjb3VudEVkaXQoKSk7XHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IFNoaXBUb0FjY291bnRMaXN0KCkpO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgU2hpcFRvQWNjb3VudExpc3Qoe1xyXG4gICAgICBpZDogJ2VycHNoaXB0b2FjY291bnRfcmVsYXRlZCcsXHJcbiAgICAgIGdyb3Vwc0VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICBkZWZhdWx0U2VhcmNoVGVybTogZnVuY3Rpb24gZGVmYXVsdFNlYXJjaFRlcm0oKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgQWNjb3VudExpc3Qoe1xyXG4gICAgICBpZDogJ2VycHNoaXB0b2FjY291bnRfYWNjb3VudHMnLFxyXG4gICAgICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgICAgZGVmYXVsdFNlYXJjaFRlcm06IGZ1bmN0aW9uIGRlZmF1bHRTZWFyY2hUZXJtKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgICAgfSxcclxuICAgIH0pKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IEFjY291bnRMaXN0KHtcclxuICAgICAgaWQ6ICdlcnBzaGlwdG9hY2NvdW50X2FjY291bnRzX3JlbGF0ZWQnLFxyXG4gICAgICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgICAgZGVmYXVsdFNlYXJjaFRlcm06IGZ1bmN0aW9uIGRlZmF1bHRTZWFyY2hUZXJtKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgICAgfSxcclxuICAgIH0pKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IFF1b3Rlc0xpc3Qoe1xyXG4gICAgICBpZDogJ2VycHNoaXB0b2FjY291bnRfcXVvdGVzX3JlbGF0ZWQnLFxyXG4gICAgICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICAgICAgaGFzU2V0dGluZ3M6IGZhbHNlLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICBkZWZhdWx0U2VhcmNoVGVybTogZnVuY3Rpb24gZGVmYXVsdFNlYXJjaFRlcm0oKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgU2FsZXNPcmRlcnNMaXN0KHtcclxuICAgICAgaWQ6ICdlcnBzaGlwdG9hY2NvdW50X3NhbGVzb3JkZXJzX3JlbGF0ZWQnLFxyXG4gICAgICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICAgICAgaGFzU2V0dGluZ3M6IGZhbHNlLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICBkZWZhdWx0U2VhcmNoVGVybTogZnVuY3Rpb24gZGVmYXVsdFNlYXJjaFRlcm0oKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgSW52b2ljZXNMaXN0KHtcclxuICAgICAgaWQ6ICdlcnBzaGlwdG9hY2NvdW50X2ludm9pY2VzX3JlbGF0ZWQnLFxyXG4gICAgICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICAgICAgaGFzU2V0dGluZ3M6IGZhbHNlLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICBkZWZhdWx0U2VhcmNoVGVybTogZnVuY3Rpb24gZGVmYXVsdFNlYXJjaFRlcm0oKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgU2hpcG1lbnRzTGlzdCh7XHJcbiAgICAgIGlkOiAnZXJwc2hpcHRvYWNjb3VudF9zaGlwbWVudHNfcmVsYXRlZCcsXHJcbiAgICAgIGdyb3Vwc0VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBoYXNTZXR0aW5nczogZmFsc2UsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIGRlZmF1bHRTZWFyY2hUZXJtOiBmdW5jdGlvbiBkZWZhdWx0U2VhcmNoVGVybSgpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgIH0sXHJcbiAgICB9KSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBSZWNlaXZhYmxlc0xpc3Qoe1xyXG4gICAgICBpZDogJ2VycHNoaXB0b2FjY291bnRfcmVjZWl2YWJsZXNfcmVsYXRlZCcsXHJcbiAgICAgIGdyb3Vwc0VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBoYXNTZXR0aW5nczogZmFsc2UsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIGRlZmF1bHRTZWFyY2hUZXJtOiBmdW5jdGlvbiBkZWZhdWx0U2VhcmNoVGVybSgpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgIH0sXHJcbiAgICB9KSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBSZXR1cm5zTGlzdCh7XHJcbiAgICAgIGlkOiAnZXJwc2hpcHRvYWNjb3VudF9yZXR1cm5zX3JlbGF0ZWQnLFxyXG4gICAgICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICAgICAgaGFzU2V0dGluZ3M6IGZhbHNlLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICBkZWZhdWx0U2VhcmNoVGVybTogZnVuY3Rpb24gZGVmYXVsdFNlYXJjaFRlcm0oKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgQ29udGFjdEFzc29jaWF0aW9uc0xpc3Qoe1xyXG4gICAgICBpZDogJ2VycHNoaXB0b2FjY291bnRfY29udGFjdGFzc29jaWF0aW9uc19yZWxhdGVkJyxcclxuICAgICAgZ3JvdXBzRW5hYmxlZDogZmFsc2UsXHJcbiAgICAgIGhhc1NldHRpbmdzOiBmYWxzZSxcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgICAgZGVmYXVsdFNlYXJjaFRlcm06IGZ1bmN0aW9uIGRlZmF1bHRTZWFyY2hUZXJtKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgICAgfSxcclxuICAgIH0pKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IEJpbGxUb0xpc3Qoe1xyXG4gICAgICBpZDogJ2VycHNoaXB0b2FjY291bnRfYmlsbHRvX3JlbGF0ZWQnLFxyXG4gICAgICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgICAgZGVmYXVsdFNlYXJjaFRlcm06IGZ1bmN0aW9uIGRlZmF1bHRTZWFyY2hUZXJtKCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgICAgfSxcclxuICAgIH0pKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IFNoaXBUb0xpc3Qoe1xyXG4gICAgICBpZDogJ2VycHNoaXB0b2FjY291bnRfZXJwc2hpcHRvcycsXHJcbiAgICAgIGdyb3Vwc0VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICBkZWZhdWx0U2VhcmNoVGVybTogZnVuY3Rpb24gZGVmYXVsdFNlYXJjaFRlcm0oKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgU2FsZXNQZXJzb25MaXN0KHtcclxuICAgICAgaWQ6ICdlcnBzaGlwdG9hY2NvdW50X3NhbGVzcGVyc29uX3JlbGF0ZWQnLFxyXG4gICAgICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICAgICAgaGFzU2V0dGluZ3M6IGZhbHNlLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICBkZWZhdWx0U2VhcmNoVGVybTogZnVuY3Rpb24gZGVmYXVsdFNlYXJjaFRlcm0oKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG4gIH0sXHJcbiAgbG9hZEN1c3RvbWl6YXRpb25zOiBmdW5jdGlvbiBsb2FkQ3VzdG9taXphdGlvbnMoKSB7XHJcbiAgICBjb25zdCBhbSA9IHRoaXMuYXBwbGljYXRpb25Nb2R1bGU7XHJcbiAgICBhbS5yZWdpc3RlckN1c3RvbWl6YXRpb24oJ2RldGFpbC90b29scycsICdlcnBzaGlwdG9hY2NvdW50X2RldGFpbCcsIHtcclxuICAgICAgYXQ6IGZ1bmN0aW9uIGF0KHRvb2wpIHtcclxuICAgICAgICByZXR1cm4gdG9vbC5pZCA9PT0gJ2VkaXQnO1xyXG4gICAgICB9LFxyXG4gICAgICB0eXBlOiAncmVtb3ZlJyxcclxuICAgIH0pO1xyXG4gICAgYW0ucmVnaXN0ZXJDdXN0b21pemF0aW9uKCdsaXN0L3Rvb2xzJywgJ2VycHNoaXB0b2FjY291bnRfaW52b2ljZXNfcmVsYXRlZCcsIHtcclxuICAgICAgYXQ6IGZ1bmN0aW9uIGF0KHRvb2wpIHtcclxuICAgICAgICByZXR1cm4gdG9vbC5pZCA9PT0gJ25ldyc7XHJcbiAgICAgIH0sXHJcbiAgICAgIHR5cGU6ICdyZW1vdmUnLFxyXG4gICAgfSk7XHJcbiAgICBhbS5yZWdpc3RlckN1c3RvbWl6YXRpb24oJ2xpc3QvdG9vbHMnLCAnZXJwc2hpcHRvYWNjb3VudF9zaGlwbWVudHNfcmVsYXRlZCcsIHtcclxuICAgICAgYXQ6IGZ1bmN0aW9uIGF0KHRvb2wpIHtcclxuICAgICAgICByZXR1cm4gdG9vbC5pZCA9PT0gJ25ldyc7XHJcbiAgICAgIH0sXHJcbiAgICAgIHR5cGU6ICdyZW1vdmUnLFxyXG4gICAgfSk7XHJcbiAgICBhbS5yZWdpc3RlckN1c3RvbWl6YXRpb24oJ2xpc3QvdG9vbHMnLCAnZXJwc2hpcHRvYWNjb3VudF9yZWNlaXZhYmxlc19yZWxhdGVkJywge1xyXG4gICAgICBhdDogZnVuY3Rpb24gYXQodG9vbCkge1xyXG4gICAgICAgIHJldHVybiB0b29sLmlkID09PSAnbmV3JztcclxuICAgICAgfSxcclxuICAgICAgdHlwZTogJ3JlbW92ZScsXHJcbiAgICB9KTtcclxuICAgIGFtLnJlZ2lzdGVyQ3VzdG9taXphdGlvbignbGlzdC90b29scycsICdlcnBzaGlwdG9hY2NvdW50X3JldHVybnNfcmVsYXRlZCcsIHtcclxuICAgICAgYXQ6IGZ1bmN0aW9uIGF0KHRvb2wpIHtcclxuICAgICAgICByZXR1cm4gdG9vbC5pZCA9PT0gJ25ldyc7XHJcbiAgICAgIH0sXHJcbiAgICAgIHR5cGU6ICdyZW1vdmUnLFxyXG4gICAgfSk7XHJcbiAgICBhbS5yZWdpc3RlckN1c3RvbWl6YXRpb24oJ2xpc3QvdG9vbHMnLCAnZXJwc2hpcHRvYWNjb3VudF9jb250YWN0YXNzb2NpYXRpb25zX3JlbGF0ZWQnLCB7XHJcbiAgICAgIGF0OiBmdW5jdGlvbiBhdCh0b29sKSB7XHJcbiAgICAgICAgcmV0dXJuIHRvb2wuaWQgPT09ICduZXcnO1xyXG4gICAgICB9LFxyXG4gICAgICB0eXBlOiAncmVtb3ZlJyxcclxuICAgIH0pO1xyXG4gICAgYW0ucmVnaXN0ZXJDdXN0b21pemF0aW9uKCdsaXN0L3Rvb2xzJywgJ2VycHNoaXB0b2FjY291bnRfc2FsZXNwZXJzb25fcmVsYXRlZCcsIHtcclxuICAgICAgYXQ6IGZ1bmN0aW9uIGF0KHRvb2wpIHtcclxuICAgICAgICByZXR1cm4gdG9vbC5pZCA9PT0gJ25ldyc7XHJcbiAgICAgIH0sXHJcbiAgICAgIHR5cGU6ICdyZW1vdmUnLFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBsb2FkVG9vbGJhcnM6IGZ1bmN0aW9uIGxvYWRUb29sYmFycygpIHtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5Nb2R1bGVzLlNoaXBUb0FjY291bnRNb2R1bGUnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19