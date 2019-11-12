define('crm/Integrations/BOE/Modules/SalesOrderModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './_Module', 'crm/Views/Attachment/List', '../Views/BackOffices/List', '../Views/BackOfficeAccountingEntities/List', '../Views/ERPBillTos/List', '../Views/Carriers/List', '../Views/ERPInvoiceItems/List', '../Views/Locations/List', '../Views/Products/List', '../Views/SalesOrders/List', '../Views/SalesOrders/Detail', '../Views/SalesOrders/Edit', '../Views/SalesOrderItems/List', '../Views/ERPSalesOrderPersons/List', '../Views/ERPShipTos/List', '../Views/ERPShipmentItems/List', '../Views/SyncResults/List', '../Models/SalesOrder/Offline', '../Models/SalesOrder/SData', '../Models/ErpSalesOrderPerson/Offline', '../Models/ErpSalesOrderPerson/SData'], function (module, exports, _declare, _lang, _Module2, _List, _List3, _List5, _List7, _List9, _List11, _List13, _List15, _List17, _Detail, _Edit, _List19, _List21, _List23, _List25, _List27) {
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

  var _List16 = _interopRequireDefault(_List15);

  var _List18 = _interopRequireDefault(_List17);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _List20 = _interopRequireDefault(_List19);

  var _List22 = _interopRequireDefault(_List21);

  var _List24 = _interopRequireDefault(_List23);

  var _List26 = _interopRequireDefault(_List25);

  var _List28 = _interopRequireDefault(_List27);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Modules.SalesOrderModule', [_Module3.default], {
    defaultViews: ['salesorder_list'],
    init: function init() {
      App.picklistService.registerPicklistToView('SyncStatus', 'salesorder_detail');
      App.picklistService.registerPicklistToView('ErpSalesOrderStatus', 'salesorder_detail');
    },
    loadViews: function loadViews() {
      var am = this.applicationModule;
      am.registerView(new _List18.default({
        expose: true
      }));

      am.registerView(new _Detail2.default());
      am.registerView(new _Edit2.default());
      am.registerView(new _List20.default({
        id: 'salesorder_items_related',
        hasSettings: false,
        expose: false,
        addLineItems: function addLineItems() {
          var _this = this;

          if (!this.options.selectedEntry.ErpLogicalId) {
            App.modal.createSimpleDialog({
              title: 'alert',
              content: this.accountingEntityRequiredText,
              getContent: function getContent() {
                return;
              }
            }).then(function () {
              var orderEdit = App.getView('salesorder_edit');
              if (orderEdit) {
                var options = {
                  entry: _this.options.selectedEntry,
                  fromContext: _this.options.fromContext
                };
                orderEdit.show(options);
              }
            });
            return;
          }
          var view = App.getView('salesorder_item_edit');
          if (view) {
            var options = {
              insert: true,
              context: {
                SalesOrder: this.options.selectedEntry
              }
            };
            this.refreshRequired = true;
            view.show(options);
          }
        },
        createToolLayout: function createToolLayout() {
          return this.tools || (this.tools = {
            tbar: [{
              id: 'new',
              svg: 'add',
              action: 'addLineItems',
              security: this.app.getViewSecurity(this.insertView, 'insert')
            }]
          });
        }
      }));

      am.registerView(new _List10.default({
        id: 'salesorder_carriers'
      }));

      am.registerView(new _List2.default({
        id: 'salesorder_attachments_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List12.default({
        id: 'salesorder_invoice_items_related',
        hasSettings: false,
        expose: false
      }));

      am.registerView(new _List26.default({
        id: 'salesorder_shipment_items_related',
        hasSettings: false,
        expose: false
      }));

      am.registerView(new _List16.default({
        id: 'salesorder_product_related',
        expose: false
      }));

      am.registerView(new _List4.default({
        id: 'salesorder_backoffice_related',
        hasSettings: false,
        groupsEnabled: false
      }));

      am.registerView(new _List6.default({
        id: 'salesorder_backofficeaccountingentity_related',
        hasSettings: false,
        groupsEnabled: false
      }));

      am.registerView(new _List14.default({
        id: 'order_location_list',
        hasSettings: false
      }));

      am.registerView(new _List14.default({
        id: 'order_warehouse_list',
        hasSettings: false
      }));

      am.registerView(new _List28.default({
        id: 'order_syncresult_related',
        hasSettings: false
      }));

      am.registerView(new _List8.default({
        id: 'salesorder_billTo_related',
        hasSettings: false,
        expose: false,
        groupsEnabled: false
      }));

      am.registerView(new _List24.default({
        id: 'salesorder_shipTo_related',
        hasSettings: false,
        expose: false,
        groupsEnabled: false
      }));

      am.registerView(new _List22.default({
        id: 'salesorder_salesperson_related',
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
      am.registerCustomization('list/tools', 'salesorder_invoice_items_related', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });

      am.registerCustomization('list/tools', 'salesorder_shipment_items_related', {
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

  _lang2.default.setObject('icboe.Modules.SalesOrderModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZHVsZXMvU2FsZXNPcmRlck1vZHVsZS5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiZGVmYXVsdFZpZXdzIiwiaW5pdCIsIkFwcCIsInBpY2tsaXN0U2VydmljZSIsInJlZ2lzdGVyUGlja2xpc3RUb1ZpZXciLCJsb2FkVmlld3MiLCJhbSIsImFwcGxpY2F0aW9uTW9kdWxlIiwicmVnaXN0ZXJWaWV3IiwiZXhwb3NlIiwiaWQiLCJoYXNTZXR0aW5ncyIsImFkZExpbmVJdGVtcyIsIm9wdGlvbnMiLCJzZWxlY3RlZEVudHJ5IiwiRXJwTG9naWNhbElkIiwibW9kYWwiLCJjcmVhdGVTaW1wbGVEaWFsb2ciLCJ0aXRsZSIsImNvbnRlbnQiLCJhY2NvdW50aW5nRW50aXR5UmVxdWlyZWRUZXh0IiwiZ2V0Q29udGVudCIsInRoZW4iLCJvcmRlckVkaXQiLCJnZXRWaWV3IiwiZW50cnkiLCJmcm9tQ29udGV4dCIsInNob3ciLCJ2aWV3IiwiaW5zZXJ0IiwiY29udGV4dCIsIlNhbGVzT3JkZXIiLCJyZWZyZXNoUmVxdWlyZWQiLCJjcmVhdGVUb29sTGF5b3V0IiwidG9vbHMiLCJ0YmFyIiwic3ZnIiwiYWN0aW9uIiwic2VjdXJpdHkiLCJhcHAiLCJnZXRWaWV3U2VjdXJpdHkiLCJpbnNlcnRWaWV3IiwiZGVmYXVsdFNlYXJjaFRlcm0iLCJncm91cHNFbmFibGVkIiwibG9hZEN1c3RvbWl6YXRpb25zIiwicmVnaXN0ZXJDdXN0b21pemF0aW9uIiwiYXQiLCJ0b29sIiwidHlwZSIsImxvYWRUb29sYmFycyIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVDQSxNQUFNQSxVQUFVLHVCQUFRLCtDQUFSLEVBQXlELGtCQUF6RCxFQUFvRTtBQUNsRkMsa0JBQWMsQ0FBQyxpQkFBRCxDQURvRTtBQUVsRkMsVUFBTSxTQUFT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QXBCLENBQWhCO0FBU0QsS0EzSWlGO0FBNElsRkUsd0JBQW9CLFNBQVNBLGtCQUFULEdBQThCO0FBQ2hELFVBQU10QyxLQUFLLEtBQUtDLGlCQUFoQjtBQUNBRCxTQUFHdUMscUJBQUgsQ0FBeUIsWUFBekIsRUFBdUMsa0NBQXZDLEVBQTJFO0FBQ3pFQyxZQUFJLFNBQVNBLEVBQVQsQ0FBWUMsSUFBWixFQUFrQjtBQUNwQixpQkFBT0EsS0FBS3JDLEVBQUwsS0FBWSxLQUFuQjtBQUNELFNBSHdFO0FBSXpFc0MsY0FBTTtBQUptRSxPQUEzRTs7QUFPQTFDLFNBQUd1QyxxQkFBSCxDQUF5QixZQUF6QixFQUF1QyxtQ0FBdkMsRUFBNEU7QUFDMUVDLFlBQUksU0FBU0EsRUFBVCxDQUFZQyxJQUFaLEVBQWtCO0FBQ3BCLGlCQUFPQSxLQUFLckMsRUFBTCxLQUFZLEtBQW5CO0FBQ0QsU0FIeUU7QUFJMUVzQyxjQUFNO0FBSm9FLE9BQTVFO0FBTUQsS0EzSmlGO0FBNEpsRkMsa0JBQWMsU0FBU0EsWUFBVCxHQUF3QixDQUNyQztBQTdKaUYsR0FBcEUsQ0FBaEIsQyxDQXZDQTs7Ozs7Ozs7Ozs7Ozs7O0FBc01BLGlCQUFLQyxTQUFMLENBQWUsZ0NBQWYsRUFBaURuRCxPQUFqRDtvQkFDZUEsTyIsImZpbGUiOiJTYWxlc09yZGVyTW9kdWxlLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IF9Nb2R1bGUgZnJvbSAnLi9fTW9kdWxlJztcclxuaW1wb3J0IEF0dGFjaG1lbnRMaXN0IGZyb20gJ2NybS9WaWV3cy9BdHRhY2htZW50L0xpc3QnO1xyXG5pbXBvcnQgQmFja09mZmljZUxpc3QgZnJvbSAnLi4vVmlld3MvQmFja09mZmljZXMvTGlzdCc7XHJcbmltcG9ydCBCYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eUxpc3QgZnJvbSAnLi4vVmlld3MvQmFja09mZmljZUFjY291bnRpbmdFbnRpdGllcy9MaXN0JztcclxuaW1wb3J0IEJpbGxUb0xpc3QgZnJvbSAnLi4vVmlld3MvRVJQQmlsbFRvcy9MaXN0JztcclxuaW1wb3J0IENhcnJpZXJMaXN0IGZyb20gJy4uL1ZpZXdzL0NhcnJpZXJzL0xpc3QnO1xyXG5pbXBvcnQgSW52b2ljZUl0ZW1zTGlzdCBmcm9tICcuLi9WaWV3cy9FUlBJbnZvaWNlSXRlbXMvTGlzdCc7XHJcbmltcG9ydCBMb2NhdGlvbkxpc3QgZnJvbSAnLi4vVmlld3MvTG9jYXRpb25zL0xpc3QnO1xyXG5pbXBvcnQgUHJvZHVjdExpc3QgZnJvbSAnLi4vVmlld3MvUHJvZHVjdHMvTGlzdCc7XHJcbmltcG9ydCBTYWxlc09yZGVyTGlzdCBmcm9tICcuLi9WaWV3cy9TYWxlc09yZGVycy9MaXN0JztcclxuaW1wb3J0IFNhbGVzT3JkZXJEZXRhaWwgZnJvbSAnLi4vVmlld3MvU2FsZXNPcmRlcnMvRGV0YWlsJztcclxuaW1wb3J0IFNhbGVzT3JkZXJFZGl0IGZyb20gJy4uL1ZpZXdzL1NhbGVzT3JkZXJzL0VkaXQnO1xyXG5pbXBvcnQgU2FsZXNPcmRlckl0ZW1MaXN0IGZyb20gJy4uL1ZpZXdzL1NhbGVzT3JkZXJJdGVtcy9MaXN0JztcclxuaW1wb3J0IFNhbGVzUGVyc29uTGlzdCBmcm9tICcuLi9WaWV3cy9FUlBTYWxlc09yZGVyUGVyc29ucy9MaXN0JztcclxuaW1wb3J0IFNoaXBUb0xpc3QgZnJvbSAnLi4vVmlld3MvRVJQU2hpcFRvcy9MaXN0JztcclxuaW1wb3J0IFNoaXBtZW50SXRlbXNMaXN0IGZyb20gJy4uL1ZpZXdzL0VSUFNoaXBtZW50SXRlbXMvTGlzdCc7XHJcbmltcG9ydCBTeW5jUmVzdWx0c0xpc3QgZnJvbSAnLi4vVmlld3MvU3luY1Jlc3VsdHMvTGlzdCc7XHJcbmltcG9ydCAnLi4vTW9kZWxzL1NhbGVzT3JkZXIvT2ZmbGluZSc7XHJcbmltcG9ydCAnLi4vTW9kZWxzL1NhbGVzT3JkZXIvU0RhdGEnO1xyXG5pbXBvcnQgJy4uL01vZGVscy9FcnBTYWxlc09yZGVyUGVyc29uL09mZmxpbmUnO1xyXG5pbXBvcnQgJy4uL01vZGVscy9FcnBTYWxlc09yZGVyUGVyc29uL1NEYXRhJztcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5Nb2R1bGVzLlNhbGVzT3JkZXJNb2R1bGUnLCBbX01vZHVsZV0sIHtcclxuICBkZWZhdWx0Vmlld3M6IFsnc2FsZXNvcmRlcl9saXN0J10sXHJcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIEFwcC5waWNrbGlzdFNlcnZpY2UucmVnaXN0ZXJQaWNrbGlzdFRvVmlldygnU3luY1N0YXR1cycsICdzYWxlc29yZGVyX2RldGFpbCcpO1xyXG4gICAgQXBwLnBpY2tsaXN0U2VydmljZS5yZWdpc3RlclBpY2tsaXN0VG9WaWV3KCdFcnBTYWxlc09yZGVyU3RhdHVzJywgJ3NhbGVzb3JkZXJfZGV0YWlsJyk7XHJcbiAgfSxcclxuICBsb2FkVmlld3M6IGZ1bmN0aW9uIGxvYWRWaWV3cygpIHtcclxuICAgIGNvbnN0IGFtID0gdGhpcy5hcHBsaWNhdGlvbk1vZHVsZTtcclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgU2FsZXNPcmRlckxpc3Qoe1xyXG4gICAgICBleHBvc2U6IHRydWUsXHJcbiAgICB9KSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBTYWxlc09yZGVyRGV0YWlsKCkpO1xyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBTYWxlc09yZGVyRWRpdCgpKTtcclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgU2FsZXNPcmRlckl0ZW1MaXN0KHtcclxuICAgICAgaWQ6ICdzYWxlc29yZGVyX2l0ZW1zX3JlbGF0ZWQnLFxyXG4gICAgICBoYXNTZXR0aW5nczogZmFsc2UsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIGFkZExpbmVJdGVtczogZnVuY3Rpb24gYWRkTGluZUl0ZW1zKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLnNlbGVjdGVkRW50cnkuRXJwTG9naWNhbElkKSB7XHJcbiAgICAgICAgICBBcHAubW9kYWwuY3JlYXRlU2ltcGxlRGlhbG9nKHtcclxuICAgICAgICAgICAgdGl0bGU6ICdhbGVydCcsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMuYWNjb3VudGluZ0VudGl0eVJlcXVpcmVkVGV4dCxcclxuICAgICAgICAgICAgZ2V0Q29udGVudDogKCkgPT4geyByZXR1cm47IH0sXHJcbiAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgb3JkZXJFZGl0ID0gQXBwLmdldFZpZXcoJ3NhbGVzb3JkZXJfZWRpdCcpO1xyXG4gICAgICAgICAgICBpZiAob3JkZXJFZGl0KSB7XHJcbiAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIGVudHJ5OiB0aGlzLm9wdGlvbnMuc2VsZWN0ZWRFbnRyeSxcclxuICAgICAgICAgICAgICAgIGZyb21Db250ZXh0OiB0aGlzLm9wdGlvbnMuZnJvbUNvbnRleHQsXHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICBvcmRlckVkaXQuc2hvdyhvcHRpb25zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldygnc2FsZXNvcmRlcl9pdGVtX2VkaXQnKTtcclxuICAgICAgICBpZiAodmlldykge1xyXG4gICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaW5zZXJ0OiB0cnVlLFxyXG4gICAgICAgICAgICBjb250ZXh0OiB7XHJcbiAgICAgICAgICAgICAgU2FsZXNPcmRlcjogdGhpcy5vcHRpb25zLnNlbGVjdGVkRW50cnksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgdGhpcy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgICAgICAgdmlldy5zaG93KG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgY3JlYXRlVG9vbExheW91dDogZnVuY3Rpb24gY3JlYXRlVG9vbExheW91dCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b29scyB8fCAodGhpcy50b29scyA9IHtcclxuICAgICAgICAgIHRiYXI6IFt7XHJcbiAgICAgICAgICAgIGlkOiAnbmV3JyxcclxuICAgICAgICAgICAgc3ZnOiAnYWRkJyxcclxuICAgICAgICAgICAgYWN0aW9uOiAnYWRkTGluZUl0ZW1zJyxcclxuICAgICAgICAgICAgc2VjdXJpdHk6IHRoaXMuYXBwLmdldFZpZXdTZWN1cml0eSh0aGlzLmluc2VydFZpZXcsICdpbnNlcnQnKSxcclxuICAgICAgICAgIH1dLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgQ2Fycmllckxpc3Qoe1xyXG4gICAgICBpZDogJ3NhbGVzb3JkZXJfY2FycmllcnMnLFxyXG4gICAgfSkpO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgQXR0YWNobWVudExpc3Qoe1xyXG4gICAgICBpZDogJ3NhbGVzb3JkZXJfYXR0YWNobWVudHNfcmVsYXRlZCcsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIGRlZmF1bHRTZWFyY2hUZXJtOiBmdW5jdGlvbiBkZWZhdWx0U2VhcmNoVGVybSgpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgIH0sXHJcbiAgICB9KSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBJbnZvaWNlSXRlbXNMaXN0KHtcclxuICAgICAgaWQ6ICdzYWxlc29yZGVyX2ludm9pY2VfaXRlbXNfcmVsYXRlZCcsXHJcbiAgICAgIGhhc1NldHRpbmdzOiBmYWxzZSxcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgIH0pKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IFNoaXBtZW50SXRlbXNMaXN0KHtcclxuICAgICAgaWQ6ICdzYWxlc29yZGVyX3NoaXBtZW50X2l0ZW1zX3JlbGF0ZWQnLFxyXG4gICAgICBoYXNTZXR0aW5nczogZmFsc2UsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICB9KSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBQcm9kdWN0TGlzdCh7XHJcbiAgICAgIGlkOiAnc2FsZXNvcmRlcl9wcm9kdWN0X3JlbGF0ZWQnLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgfSkpO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgQmFja09mZmljZUxpc3Qoe1xyXG4gICAgICBpZDogJ3NhbGVzb3JkZXJfYmFja29mZmljZV9yZWxhdGVkJyxcclxuICAgICAgaGFzU2V0dGluZ3M6IGZhbHNlLFxyXG4gICAgICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICAgIH0pKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IEJhY2tPZmZpY2VBY2NvdW50aW5nRW50aXR5TGlzdCh7XHJcbiAgICAgIGlkOiAnc2FsZXNvcmRlcl9iYWNrb2ZmaWNlYWNjb3VudGluZ2VudGl0eV9yZWxhdGVkJyxcclxuICAgICAgaGFzU2V0dGluZ3M6IGZhbHNlLFxyXG4gICAgICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICAgIH0pKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IExvY2F0aW9uTGlzdCh7XHJcbiAgICAgIGlkOiAnb3JkZXJfbG9jYXRpb25fbGlzdCcsXHJcbiAgICAgIGhhc1NldHRpbmdzOiBmYWxzZSxcclxuICAgIH0pKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IExvY2F0aW9uTGlzdCh7XHJcbiAgICAgIGlkOiAnb3JkZXJfd2FyZWhvdXNlX2xpc3QnLFxyXG4gICAgICBoYXNTZXR0aW5nczogZmFsc2UsXHJcbiAgICB9KSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBTeW5jUmVzdWx0c0xpc3Qoe1xyXG4gICAgICBpZDogJ29yZGVyX3N5bmNyZXN1bHRfcmVsYXRlZCcsXHJcbiAgICAgIGhhc1NldHRpbmdzOiBmYWxzZSxcclxuICAgIH0pKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IEJpbGxUb0xpc3Qoe1xyXG4gICAgICBpZDogJ3NhbGVzb3JkZXJfYmlsbFRvX3JlbGF0ZWQnLFxyXG4gICAgICBoYXNTZXR0aW5nczogZmFsc2UsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIGdyb3Vwc0VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgfSkpO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgU2hpcFRvTGlzdCh7XHJcbiAgICAgIGlkOiAnc2FsZXNvcmRlcl9zaGlwVG9fcmVsYXRlZCcsXHJcbiAgICAgIGhhc1NldHRpbmdzOiBmYWxzZSxcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgICAgZ3JvdXBzRW5hYmxlZDogZmFsc2UsXHJcbiAgICB9KSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBTYWxlc1BlcnNvbkxpc3Qoe1xyXG4gICAgICBpZDogJ3NhbGVzb3JkZXJfc2FsZXNwZXJzb25fcmVsYXRlZCcsXHJcbiAgICAgIGdyb3Vwc0VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBoYXNTZXR0aW5nczogZmFsc2UsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIGRlZmF1bHRTZWFyY2hUZXJtOiBmdW5jdGlvbiBkZWZhdWx0U2VhcmNoVGVybSgpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgIH0sXHJcbiAgICB9KSk7XHJcbiAgfSxcclxuICBsb2FkQ3VzdG9taXphdGlvbnM6IGZ1bmN0aW9uIGxvYWRDdXN0b21pemF0aW9ucygpIHtcclxuICAgIGNvbnN0IGFtID0gdGhpcy5hcHBsaWNhdGlvbk1vZHVsZTtcclxuICAgIGFtLnJlZ2lzdGVyQ3VzdG9taXphdGlvbignbGlzdC90b29scycsICdzYWxlc29yZGVyX2ludm9pY2VfaXRlbXNfcmVsYXRlZCcsIHtcclxuICAgICAgYXQ6IGZ1bmN0aW9uIGF0KHRvb2wpIHtcclxuICAgICAgICByZXR1cm4gdG9vbC5pZCA9PT0gJ25ldyc7XHJcbiAgICAgIH0sXHJcbiAgICAgIHR5cGU6ICdyZW1vdmUnLFxyXG4gICAgfSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJDdXN0b21pemF0aW9uKCdsaXN0L3Rvb2xzJywgJ3NhbGVzb3JkZXJfc2hpcG1lbnRfaXRlbXNfcmVsYXRlZCcsIHtcclxuICAgICAgYXQ6IGZ1bmN0aW9uIGF0KHRvb2wpIHtcclxuICAgICAgICByZXR1cm4gdG9vbC5pZCA9PT0gJ25ldyc7XHJcbiAgICAgIH0sXHJcbiAgICAgIHR5cGU6ICdyZW1vdmUnLFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBsb2FkVG9vbGJhcnM6IGZ1bmN0aW9uIGxvYWRUb29sYmFycygpIHtcclxuICB9LFxyXG59KTtcclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLk1vZHVsZXMuU2FsZXNPcmRlck1vZHVsZScsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=