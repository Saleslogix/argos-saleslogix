define('crm/Integrations/BOE/Modules/QuoteModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './_Module', '../../../Views/Attachment/List', '../Views/BackOffices/List', '../Views/BackOfficeAccountingEntities/List', '../Views/ERPBillTos/List', '../Views/Carriers/List', '../Views/Locations/List', '../Views/QuotePersons/List', '../Views/QuoteLines/Detail', '../Views/QuoteLines/List', '../Views/Quotes/Detail', '../Views/Quotes/Edit', '../Views/Quotes/List', '../Views/ERPShipTos/List', '../Views/SyncResults/List', '../Models/Quote/Offline', '../Models/Quote/SData'], function (module, exports, _declare, _lang, _Module2, _List, _List3, _List5, _List7, _List9, _List11, _List13, _Detail, _List15, _Detail3, _Edit, _List17, _List19, _List21) {
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

  var _List16 = _interopRequireDefault(_List15);

  var _Detail4 = _interopRequireDefault(_Detail3);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _List18 = _interopRequireDefault(_List17);

  var _List20 = _interopRequireDefault(_List19);

  var _List22 = _interopRequireDefault(_List21);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Modules.QuoteModule', [_Module3.default], {
    defaultViews: ['quote_list'],
    init: function init() {
      App.picklistService.registerPicklistToView('SyncStatus', 'quote_detail');
      App.picklistService.registerPicklistToView('ErpQuoteStatus', 'quote_detail');
    },
    loadViews: function loadViews() {
      var am = this.applicationModule;

      am.registerView(new _Detail4.default());
      am.registerView(new _Edit2.default());

      am.registerView(new _List10.default({
        id: 'quote_carriers'
      }));

      am.registerView(new _List2.default({
        id: 'quote_attachments_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      am.registerView(new _List14.default({
        id: 'quotepersons_related',
        hasSettings: false,
        expose: false
      }));

      am.registerView(new _List16.default({
        id: 'quote_lines_related',
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
              var quoteEdit = App.getView('quote_edit');
              if (quoteEdit) {
                var options = {
                  entry: _this.options.selectedEntry,
                  fromContext: _this.options.fromContext
                };
                quoteEdit.show(options);
              }
            });
            return;
          }
          var view = App.getView('quote_line_edit');
          if (view) {
            var quoteItemView = App.getView('quote_lines_related');
            var count = 0;
            if (quoteItemView) {
              quoteItemView.getListCount({ where: 'Quote.$key eq "' + this.options.selectedEntry.$key + '"' }).then(function (result) {
                count = result;
              });
            }
            var options = {
              insert: true,
              context: {
                Quote: this.options.selectedEntry,
                CurrentCount: count
              }
            };
            this.refreshRequired = true;
            view.show(options);
          } // TODO: direct to line items list view and allow multi-select. On save will attach items to quote product and update the quote.
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

      am.registerView(new _List8.default({
        id: 'quote_billTos_related',
        hasSettings: false,
        expose: false,
        groupsEnabled: false
      }));

      am.registerView(new _List20.default({
        id: 'quote_shipTos_related',
        hasSettings: false,
        expose: false,
        groupsEnabled: false
      }));

      am.registerView(new _List4.default({
        id: 'quote_backoffice_related',
        hasSettings: false,
        groupsEnabled: false
      }));

      am.registerView(new _List6.default({
        id: 'quote_backofficeaccountingentity_related',
        hasSettings: false,
        groupsEnabled: false
      }));

      am.registerView(new _List12.default({
        id: 'quote_location_list',
        hasSettings: false
      }));

      am.registerView(new _List12.default({
        id: 'quote_warehouse_list',
        hasSettings: false
      }));

      am.registerView(new _List22.default({
        id: 'quote_syncresult_related',
        hasSettings: false
      }));

      am.registerView(new _Detail2.default());

      am.registerView(new _List18.default());
    },
    loadCustomizations: function loadCustomizations() {
      var am = this.applicationModule;
      am.registerCustomization('list/tools', 'quotepersons_related', {
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

  _lang2.default.setObject('icboe.Modules.QuoteModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZHVsZXMvUXVvdGVNb2R1bGUuanMiXSwibmFtZXMiOlsiX19jbGFzcyIsImRlZmF1bHRWaWV3cyIsImluaXQiLCJBcHAiLCJwaWNrbGlzdFNlcnZpY2UiLCJyZWdpc3RlclBpY2tsaXN0VG9WaWV3IiwibG9hZFZpZXdzIiwiYW0iLCJhcHBsaWNhdGlvbk1vZHVsZSIsInJlZ2lzdGVyVmlldyIsImlkIiwiZXhwb3NlIiwiZGVmYXVsdFNlYXJjaFRlcm0iLCJoYXNTZXR0aW5ncyIsImFkZExpbmVJdGVtcyIsIm9wdGlvbnMiLCJzZWxlY3RlZEVudHJ5IiwiRXJwTG9naWNhbElkIiwibW9kYWwiLCJjcmVhdGVTaW1wbGVEaWFsb2ciLCJ0aXRsZSIsImNvbnRlbnQiLCJhY2NvdW50aW5nRW50aXR5UmVxdWlyZWRUZXh0IiwiZ2V0Q29udGVudCIsInRoZW4iLCJxdW90ZUVkaXQiLCJnZXRWaWV3IiwiZW50cnkiLCJmcm9tQ29udGV4dCIsInNob3ciLCJ2aWV3IiwicXVvdGVJdGVtVmlldyIsImNvdW50IiwiZ2V0TGlzdENvdW50Iiwid2hlcmUiLCIka2V5IiwicmVzdWx0IiwiaW5zZXJ0IiwiY29udGV4dCIsIlF1b3RlIiwiQ3VycmVudENvdW50IiwicmVmcmVzaFJlcXVpcmVkIiwiY3JlYXRlVG9vbExheW91dCIsInRvb2xzIiwidGJhciIsInN2ZyIsImFjdGlvbiIsInNlY3VyaXR5IiwiYXBwIiwiZ2V0Vmlld1NlY3VyaXR5IiwiaW5zZXJ0VmlldyIsImdyb3Vwc0VuYWJsZWQiLCJsb2FkQ3VzdG9taXphdGlvbnMiLCJyZWdpc3RlckN1c3RvbWl6YXRpb24iLCJhdCIsInRvb2wiLCJ0eXBlIiwibG9hZFRvb2xiYXJzIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQ0EsTUFBTUEsVUFBVSx1QkFBUSwwQ0FBUixF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O0FBaUk3RTJDLHdCQUFvQixTQUFTQSxrQkFBVCxHQUE4QjtBQUNoRCxVQUFNN0MsS0FBSyxLQUFLQyxpQkFBaEI7QUFDQUQsU0FBRzhDLHFCQUFILENBQXlCLFlBQXpCLEVBQXVDLHNCQUF2QyxFQUErRDtBQUM3REMsWUFBSSxTQUFTQSxFQUFULENBQVlDLElBQVosRUFBa0I7QUFDcEIsaUJBQU9BLEtBQUs3QyxFQUFMLEtBQVksS0FBbkI7QUFDRCxTQUg0RDtBQUk3RDhDLGNBQU07QUFKdUQsT0FBL0Q7QUFNRCxLQXpJNEU7QUEwSTdFQyxrQkFBYyxTQUFTQSxZQUFULEdBQXdCLENBQ3JDO0FBM0k0RSxHQUEvRCxDQUFoQixDLENBbkNBOzs7Ozs7Ozs7Ozs7Ozs7QUFpTEEsaUJBQUtDLFNBQUwsQ0FBZSwyQkFBZixFQUE0QzFELE9BQTVDO29CQUNlQSxPIiwiZmlsZSI6IlF1b3RlTW9kdWxlLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IF9Nb2R1bGUgZnJvbSAnLi9fTW9kdWxlJztcclxuaW1wb3J0IEF0dGFjaG1lbnRMaXN0IGZyb20gJy4uLy4uLy4uL1ZpZXdzL0F0dGFjaG1lbnQvTGlzdCc7XHJcbmltcG9ydCBCYWNrT2ZmaWNlTGlzdCBmcm9tICcuLi9WaWV3cy9CYWNrT2ZmaWNlcy9MaXN0JztcclxuaW1wb3J0IEJhY2tPZmZpY2VBY2NvdW50aW5nRW50aXR5TGlzdCBmcm9tICcuLi9WaWV3cy9CYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0aWVzL0xpc3QnO1xyXG5pbXBvcnQgQmlsbFRvTGlzdCBmcm9tICcuLi9WaWV3cy9FUlBCaWxsVG9zL0xpc3QnO1xyXG5pbXBvcnQgQ2Fycmllckxpc3QgZnJvbSAnLi4vVmlld3MvQ2FycmllcnMvTGlzdCc7XHJcbmltcG9ydCBMb2NhdGlvbkxpc3QgZnJvbSAnLi4vVmlld3MvTG9jYXRpb25zL0xpc3QnO1xyXG5pbXBvcnQgUXVvdGVQZXJzb25zTGlzdCBmcm9tICcuLi9WaWV3cy9RdW90ZVBlcnNvbnMvTGlzdCc7XHJcbmltcG9ydCBRdW90ZUxpbmVzRGV0YWlsIGZyb20gJy4uL1ZpZXdzL1F1b3RlTGluZXMvRGV0YWlsJztcclxuaW1wb3J0IFF1b3RlTGluZXNMaXN0IGZyb20gJy4uL1ZpZXdzL1F1b3RlTGluZXMvTGlzdCc7XHJcbmltcG9ydCBRdW90ZXNEZXRhaWwgZnJvbSAnLi4vVmlld3MvUXVvdGVzL0RldGFpbCc7XHJcbmltcG9ydCBRdW90ZXNFZGl0IGZyb20gJy4uL1ZpZXdzL1F1b3Rlcy9FZGl0JztcclxuaW1wb3J0IFF1b3Rlc0xpc3QgZnJvbSAnLi4vVmlld3MvUXVvdGVzL0xpc3QnO1xyXG5pbXBvcnQgU2hpcFRvTGlzdCBmcm9tICcuLi9WaWV3cy9FUlBTaGlwVG9zL0xpc3QnO1xyXG5pbXBvcnQgU3luY1Jlc3VsdHNMaXN0IGZyb20gJy4uL1ZpZXdzL1N5bmNSZXN1bHRzL0xpc3QnO1xyXG5pbXBvcnQgJy4uL01vZGVscy9RdW90ZS9PZmZsaW5lJztcclxuaW1wb3J0ICcuLi9Nb2RlbHMvUXVvdGUvU0RhdGEnO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLk1vZHVsZXMuUXVvdGVNb2R1bGUnLCBbX01vZHVsZV0sIHtcclxuICBkZWZhdWx0Vmlld3M6IFsncXVvdGVfbGlzdCddLFxyXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICBBcHAucGlja2xpc3RTZXJ2aWNlLnJlZ2lzdGVyUGlja2xpc3RUb1ZpZXcoJ1N5bmNTdGF0dXMnLCAncXVvdGVfZGV0YWlsJyk7XHJcbiAgICBBcHAucGlja2xpc3RTZXJ2aWNlLnJlZ2lzdGVyUGlja2xpc3RUb1ZpZXcoJ0VycFF1b3RlU3RhdHVzJywgJ3F1b3RlX2RldGFpbCcpO1xyXG4gIH0sXHJcbiAgbG9hZFZpZXdzOiBmdW5jdGlvbiBsb2FkVmlld3MoKSB7XHJcbiAgICBjb25zdCBhbSA9IHRoaXMuYXBwbGljYXRpb25Nb2R1bGU7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBRdW90ZXNEZXRhaWwoKSk7XHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IFF1b3Rlc0VkaXQoKSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBDYXJyaWVyTGlzdCh7XHJcbiAgICAgIGlkOiAncXVvdGVfY2FycmllcnMnLFxyXG4gICAgfSkpO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgQXR0YWNobWVudExpc3Qoe1xyXG4gICAgICBpZDogJ3F1b3RlX2F0dGFjaG1lbnRzX3JlbGF0ZWQnLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICBkZWZhdWx0U2VhcmNoVGVybTogZnVuY3Rpb24gZGVmYXVsdFNlYXJjaFRlcm0oKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgUXVvdGVQZXJzb25zTGlzdCh7XHJcbiAgICAgIGlkOiAncXVvdGVwZXJzb25zX3JlbGF0ZWQnLFxyXG4gICAgICBoYXNTZXR0aW5nczogZmFsc2UsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICB9KSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBRdW90ZUxpbmVzTGlzdCh7XHJcbiAgICAgIGlkOiAncXVvdGVfbGluZXNfcmVsYXRlZCcsXHJcbiAgICAgIGhhc1NldHRpbmdzOiBmYWxzZSxcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgICAgYWRkTGluZUl0ZW1zOiBmdW5jdGlvbiBhZGRMaW5lSXRlbXMoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuc2VsZWN0ZWRFbnRyeS5FcnBMb2dpY2FsSWQpIHtcclxuICAgICAgICAgIEFwcC5tb2RhbC5jcmVhdGVTaW1wbGVEaWFsb2coe1xyXG4gICAgICAgICAgICB0aXRsZTogJ2FsZXJ0JyxcclxuICAgICAgICAgICAgY29udGVudDogdGhpcy5hY2NvdW50aW5nRW50aXR5UmVxdWlyZWRUZXh0LFxyXG4gICAgICAgICAgICBnZXRDb250ZW50OiAoKSA9PiB7IHJldHVybjsgfSxcclxuICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBxdW90ZUVkaXQgPSBBcHAuZ2V0VmlldygncXVvdGVfZWRpdCcpO1xyXG4gICAgICAgICAgICBpZiAocXVvdGVFZGl0KSB7XHJcbiAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIGVudHJ5OiB0aGlzLm9wdGlvbnMuc2VsZWN0ZWRFbnRyeSxcclxuICAgICAgICAgICAgICAgIGZyb21Db250ZXh0OiB0aGlzLm9wdGlvbnMuZnJvbUNvbnRleHQsXHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICBxdW90ZUVkaXQuc2hvdyhvcHRpb25zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0VmlldygncXVvdGVfbGluZV9lZGl0Jyk7XHJcbiAgICAgICAgaWYgKHZpZXcpIHtcclxuICAgICAgICAgIGNvbnN0IHF1b3RlSXRlbVZpZXcgPSBBcHAuZ2V0VmlldygncXVvdGVfbGluZXNfcmVsYXRlZCcpO1xyXG4gICAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAgIGlmIChxdW90ZUl0ZW1WaWV3KSB7XHJcbiAgICAgICAgICAgIHF1b3RlSXRlbVZpZXcuZ2V0TGlzdENvdW50KHsgd2hlcmU6IGBRdW90ZS4ka2V5IGVxIFwiJHt0aGlzLm9wdGlvbnMuc2VsZWN0ZWRFbnRyeS4ka2V5fVwiYCB9KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICBjb3VudCA9IHJlc3VsdDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBpbnNlcnQ6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbnRleHQ6IHtcclxuICAgICAgICAgICAgICBRdW90ZTogdGhpcy5vcHRpb25zLnNlbGVjdGVkRW50cnksXHJcbiAgICAgICAgICAgICAgQ3VycmVudENvdW50OiBjb3VudCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICB0aGlzLnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgICAgICAgICB2aWV3LnNob3cob3B0aW9ucyk7XHJcbiAgICAgICAgfSAvLyBUT0RPOiBkaXJlY3QgdG8gbGluZSBpdGVtcyBsaXN0IHZpZXcgYW5kIGFsbG93IG11bHRpLXNlbGVjdC4gT24gc2F2ZSB3aWxsIGF0dGFjaCBpdGVtcyB0byBxdW90ZSBwcm9kdWN0IGFuZCB1cGRhdGUgdGhlIHF1b3RlLlxyXG4gICAgICB9LFxyXG4gICAgICBjcmVhdGVUb29sTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVUb29sTGF5b3V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvb2xzIHx8ICh0aGlzLnRvb2xzID0ge1xyXG4gICAgICAgICAgdGJhcjogW3tcclxuICAgICAgICAgICAgaWQ6ICduZXcnLFxyXG4gICAgICAgICAgICBzdmc6ICdhZGQnLFxyXG4gICAgICAgICAgICBhY3Rpb246ICdhZGRMaW5lSXRlbXMnLFxyXG4gICAgICAgICAgICBzZWN1cml0eTogdGhpcy5hcHAuZ2V0Vmlld1NlY3VyaXR5KHRoaXMuaW5zZXJ0VmlldywgJ2luc2VydCcpLFxyXG4gICAgICAgICAgfV0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgICB9KSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBCaWxsVG9MaXN0KHtcclxuICAgICAgaWQ6ICdxdW90ZV9iaWxsVG9zX3JlbGF0ZWQnLFxyXG4gICAgICBoYXNTZXR0aW5nczogZmFsc2UsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIGdyb3Vwc0VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgfSkpO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgU2hpcFRvTGlzdCh7XHJcbiAgICAgIGlkOiAncXVvdGVfc2hpcFRvc19yZWxhdGVkJyxcclxuICAgICAgaGFzU2V0dGluZ3M6IGZhbHNlLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICAgIH0pKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IEJhY2tPZmZpY2VMaXN0KHtcclxuICAgICAgaWQ6ICdxdW90ZV9iYWNrb2ZmaWNlX3JlbGF0ZWQnLFxyXG4gICAgICBoYXNTZXR0aW5nczogZmFsc2UsXHJcbiAgICAgIGdyb3Vwc0VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgfSkpO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgQmFja09mZmljZUFjY291bnRpbmdFbnRpdHlMaXN0KHtcclxuICAgICAgaWQ6ICdxdW90ZV9iYWNrb2ZmaWNlYWNjb3VudGluZ2VudGl0eV9yZWxhdGVkJyxcclxuICAgICAgaGFzU2V0dGluZ3M6IGZhbHNlLFxyXG4gICAgICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICAgIH0pKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IExvY2F0aW9uTGlzdCh7XHJcbiAgICAgIGlkOiAncXVvdGVfbG9jYXRpb25fbGlzdCcsXHJcbiAgICAgIGhhc1NldHRpbmdzOiBmYWxzZSxcclxuICAgIH0pKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IExvY2F0aW9uTGlzdCh7XHJcbiAgICAgIGlkOiAncXVvdGVfd2FyZWhvdXNlX2xpc3QnLFxyXG4gICAgICBoYXNTZXR0aW5nczogZmFsc2UsXHJcbiAgICB9KSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBTeW5jUmVzdWx0c0xpc3Qoe1xyXG4gICAgICBpZDogJ3F1b3RlX3N5bmNyZXN1bHRfcmVsYXRlZCcsXHJcbiAgICAgIGhhc1NldHRpbmdzOiBmYWxzZSxcclxuICAgIH0pKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IFF1b3RlTGluZXNEZXRhaWwoKSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBRdW90ZXNMaXN0KCkpO1xyXG4gIH0sXHJcbiAgbG9hZEN1c3RvbWl6YXRpb25zOiBmdW5jdGlvbiBsb2FkQ3VzdG9taXphdGlvbnMoKSB7XHJcbiAgICBjb25zdCBhbSA9IHRoaXMuYXBwbGljYXRpb25Nb2R1bGU7XHJcbiAgICBhbS5yZWdpc3RlckN1c3RvbWl6YXRpb24oJ2xpc3QvdG9vbHMnLCAncXVvdGVwZXJzb25zX3JlbGF0ZWQnLCB7XHJcbiAgICAgIGF0OiBmdW5jdGlvbiBhdCh0b29sKSB7XHJcbiAgICAgICAgcmV0dXJuIHRvb2wuaWQgPT09ICduZXcnO1xyXG4gICAgICB9LFxyXG4gICAgICB0eXBlOiAncmVtb3ZlJyxcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgbG9hZFRvb2xiYXJzOiBmdW5jdGlvbiBsb2FkVG9vbGJhcnMoKSB7XHJcbiAgfSxcclxufSk7XHJcblxyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuTW9kdWxlcy5RdW90ZU1vZHVsZScsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=