define('crm/Integrations/BOE/Views/ERPBillTos/Edit', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/_base/connect', 'argos/Edit', '../../Models/Names', 'crm/Format', 'crm/Validator', 'argos/I18n'], function (module, exports, _declare, _lang, _connect, _Edit, _Names, _Format, _Validator, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _connect2 = _interopRequireDefault(_connect);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _Names2 = _interopRequireDefault(_Names);

  var _Format2 = _interopRequireDefault(_Format);

  var _Validator2 = _interopRequireDefault(_Validator);

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

  var resource = (0, _I18n2.default)('erpBillTosEdit');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPBillTos.Edit', [_Edit2.default], {
    // View Properties
    id: 'erpbillto_edit',
    detailView: 'erpbillto_detail',
    insertSecurity: 'Entities/ErpBillTo/Add',
    updateSecurity: 'Entities/ErpBillTo/Edit',
    resourceKind: 'erpBillTos',
    titleText: resource.titleText,
    nameText: resource.nameText,
    phoneText: resource.phoneText,
    emailText: resource.emailText,
    customerTypeText: resource.customerTypeText,
    customerTypeTitleText: resource.customerTypeTitleText,
    statusText: resource.statusText,
    statusTitleText: resource.statusTitleText,
    paymentTermText: resource.paymentTermText,
    paymentTermTitleText: resource.paymentTermTitleText,
    paymentMethodText: resource.paymentMethodText,
    paymentMethodTitleText: resource.paymentMethodTitleText,
    addressText: resource.addressText,
    faxText: resource.faxText,
    ownerText: resource.ownerText,
    modelName: _Names2.default.ERPBILLTO,
    associationMapping: {
      accounts: 'erpbilltoaccounts_edit'
    },
    associationView: null,
    associationContext: null,

    init: function init() {
      this.inherited(init, arguments);
    },
    applyContext: function applyContext() {
      this.inherited(applyContext, arguments);

      var found = this._getNavContext();
      var context = found && found.options && found.options.source || found;
      var lookup = {
        accounts: this.applyAccountContext,
        quotes: this.applyQuoteContext,
        salesOrders: this.applyOrderContext
      };

      if (context && lookup[context.resourceKind]) {
        var view = App.getView(context.id);
        var entry = context.entry || view && view.entry || context;

        if (!entry || !entry.$key) {
          return;
        }
        lookup[context.resourceKind].call(this, entry, App.context.user.DefaultOwner);
        this.associationContext = entry;
        this.associationView = this.associationMapping[context.resourceKind];
      }
      this.fields.Owner.disable();
    },
    applyAccountContext: function applyAccountContext(account, defaultOwner) {
      if (account.ErpLogicalId) {
        this.fields.ErpLogicalId.setValue(account.ErpLogicalId);
        this.fields.CustomerType.enable();
        this.fields.PaymentTerm.enable();
        this.fields.PaymentMethod.enable();
      } else {
        this.fields.CustomerType.disable();
        this.fields.PaymentTerm.disable();
        this.fields.PaymentMethod.disable();
      }
      this.fields.ErpAccountingEntityId.setValue(account.ErpAccountingEntityId);
      this.fields.Owner.setValue(account.Owner ? account.Owner : defaultOwner);
      if (account.Address !== null) {
        this.fields.Address.setValue(account.Address);
        this.fields.Name.setValue(account.AccountName);
      }
    },
    applyQuoteContext: function applyQuoteContext(quote, defaultOwner) {
      this.fields.ErpLogicalId.setValue(quote.ErpLogicalId);
      this.fields.ErpAccountingEntityId.setValue(quote.ErpAccountingEntityId);
      this.fields.Owner.setValue(quote.Account.Owner ? quote.Account.Owner : defaultOwner);
      if (quote.Account.Address !== null) {
        this.fields.Address.setValue(quote.Account.Address);
        this.fields.Name.setValue(quote.Account.AccountName);
      }
      return;
    },
    applyOrderContext: function applyOrderContext(order, defaultOwner) {
      this.fields.ErpLogicalId.setValue(order.ErpLogicalId);
      this.fields.ErpAccountingEntityId.setValue(order.ErpAccountingEntityId);
      this.fields.Owner.setValue(order.Account.Owner ? order.Account.Owner : defaultOwner);
      if (order.Account.Address !== null) {
        this.fields.Address.setValue(order.Account.Address);
        this.fields.Name.setValue(order.Account.AccountName);
      }
      return;
    },
    onAddComplete: function onAddComplete(entry, result) {
      // this.enable(); Make the association record enable the view
      this.busy = false;

      if (App.bars.tbar) {
        App.bars.tbar.enableTool('save');
      }

      var message = this._buildRefreshMessage(entry, result);
      _connect2.default.publish('/app/refresh', [message]);

      this.onInsertCompleted(result);
    },
    onInsertCompleted: function onInsertCompleted(results) {
      if (this.associationView) {
        var view = App.getView(this.associationView);
        if (view) {
          view.inserting = true;
          view.options = {
            insert: true,
            fromContext: {
              BillTo: results,
              Context: this.associationContext
            },
            autoSave: true
          };
          view.onRefreshInsert();
        }
      }
      this.associationView = null;
      this.associationContext = null;
    },
    _getNavContext: function _getNavContext() {
      var navContext = App.queryNavigationContext(function (o) {
        var context = o.options && o.options.source || o;

        if (/^(accounts|quotes|salesOrders)$/.test(context.resourceKind) && context.key) {
          return true;
        }

        return false;
      });
      return navContext;
    },
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          label: this.nameText,
          name: 'Name',
          property: 'Name',
          type: 'text',
          emptyText: '',
          autoFocus: true,
          required: true
        }, {
          label: this.phoneText,
          name: 'MainPhone',
          property: 'MainPhone',
          type: 'phone',
          maxTextLength: 32,
          validator: _Validator2.default.exceedsMaxTextLength
        }, {
          name: 'Email',
          property: 'Email',
          label: this.emailText,
          type: 'text',
          inputType: 'email'
        }, {
          name: 'CustomerType',
          property: 'CustomerType',
          label: this.customerTypeText,
          type: 'picklist',
          title: this.customerTypeTitleText,
          picklist: 'Customer Types',
          requireSelection: false,
          dependsOn: 'ErpLogicalId',
          storageMode: 'code',
          where: function where(logicalId) {
            return 'filter eq "' + logicalId + '"';
          }
        }, {
          label: this.statusText,
          name: 'Status',
          property: 'ErpStatus',
          picklist: 'ErpBillToStatus',
          requireSelection: false,
          title: this.statusTitleText,
          type: 'picklist'
        }, {
          label: this.paymentTermText,
          name: 'PaymentTerm',
          property: 'PaymentTermId',
          picklist: 'PaymentTerm',
          requireSelection: false,
          title: this.paymentTermTitleText,
          type: 'picklist',
          storageMode: 'code',
          dependsOn: 'ErpLogicalId',
          where: function where(logicalId) {
            return 'filter eq "' + logicalId + '"';
          }
        }, {
          label: this.paymentMethodText,
          name: 'PaymentMethod',
          property: 'ErpPaymentMethod',
          picklist: 'PaymentMethodCode',
          requireSelection: false,
          title: this.paymentMethodTitleText,
          type: 'picklist',
          storageMode: 'code',
          dependsOn: 'ErpLogicalId',
          where: function where(logicalId) {
            return 'filter eq "' + logicalId + '"';
          }
        }, {
          emptyText: '',
          formatValue: _Format2.default.address.bindDelegate(this, [true], true),
          label: this.addressText,
          name: 'Address',
          property: 'Address',
          type: 'address',
          view: 'address_edit'
        }, {
          label: this.faxText,
          name: 'Fax',
          property: 'Fax',
          type: 'phone',
          maxTextLength: 32,
          validator: _Validator2.default.exceedsMaxTextLength
        }, {
          name: 'ErpLogicalId',
          property: 'ErpLogicalId',
          type: 'hidden'
        }, {
          name: 'ErpAccountingEntityId',
          property: 'ErpAccountingEntityId',
          type: 'hidden'
        }, {
          name: 'Owner',
          label: this.ownerText,
          property: 'Owner',
          textProperty: 'OwnerDescription',
          type: 'lookup',
          view: 'owner_list'
        }] }]);
    }
  });

  _lang2.default.setObject('icboe.Views.ERPBillTos.Edit', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0VSUEJpbGxUb3MvRWRpdC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJpZCIsImRldGFpbFZpZXciLCJpbnNlcnRTZWN1cml0eSIsInVwZGF0ZVNlY3VyaXR5IiwicmVzb3VyY2VLaW5kIiwidGl0bGVUZXh0IiwibmFtZVRleHQiLCJwaG9uZVRleHQiLCJlbWFpbFRleHQiLCJjdXN0b21lclR5cGVUZXh0IiwiY3VzdG9tZXJUeXBlVGl0bGVUZXh0Iiwic3RhdHVzVGV4dCIsInN0YXR1c1RpdGxlVGV4dCIsInBheW1lbnRUZXJtVGV4dCIsInBheW1lbnRUZXJtVGl0bGVUZXh0IiwicGF5bWVudE1ldGhvZFRleHQiLCJwYXltZW50TWV0aG9kVGl0bGVUZXh0IiwiYWRkcmVzc1RleHQiLCJmYXhUZXh0Iiwib3duZXJUZXh0IiwibW9kZWxOYW1lIiwiRVJQQklMTFRPIiwiYXNzb2NpYXRpb25NYXBwaW5nIiwiYWNjb3VudHMiLCJhc3NvY2lhdGlvblZpZXciLCJhc3NvY2lhdGlvbkNvbnRleHQiLCJpbml0IiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiYXBwbHlDb250ZXh0IiwiZm91bmQiLCJfZ2V0TmF2Q29udGV4dCIsImNvbnRleHQiLCJvcHRpb25zIiwic291cmNlIiwibG9va3VwIiwiYXBwbHlBY2NvdW50Q29udGV4dCIsInF1b3RlcyIsImFwcGx5UXVvdGVDb250ZXh0Iiwic2FsZXNPcmRlcnMiLCJhcHBseU9yZGVyQ29udGV4dCIsInZpZXciLCJBcHAiLCJnZXRWaWV3IiwiZW50cnkiLCIka2V5IiwiY2FsbCIsInVzZXIiLCJEZWZhdWx0T3duZXIiLCJmaWVsZHMiLCJPd25lciIsImRpc2FibGUiLCJhY2NvdW50IiwiZGVmYXVsdE93bmVyIiwiRXJwTG9naWNhbElkIiwic2V0VmFsdWUiLCJDdXN0b21lclR5cGUiLCJlbmFibGUiLCJQYXltZW50VGVybSIsIlBheW1lbnRNZXRob2QiLCJFcnBBY2NvdW50aW5nRW50aXR5SWQiLCJBZGRyZXNzIiwiTmFtZSIsIkFjY291bnROYW1lIiwicXVvdGUiLCJBY2NvdW50Iiwib3JkZXIiLCJvbkFkZENvbXBsZXRlIiwicmVzdWx0IiwiYnVzeSIsImJhcnMiLCJ0YmFyIiwiZW5hYmxlVG9vbCIsIm1lc3NhZ2UiLCJfYnVpbGRSZWZyZXNoTWVzc2FnZSIsInB1Ymxpc2giLCJvbkluc2VydENvbXBsZXRlZCIsInJlc3VsdHMiLCJpbnNlcnRpbmciLCJpbnNlcnQiLCJmcm9tQ29udGV4dCIsIkJpbGxUbyIsIkNvbnRleHQiLCJhdXRvU2F2ZSIsIm9uUmVmcmVzaEluc2VydCIsIm5hdkNvbnRleHQiLCJxdWVyeU5hdmlnYXRpb25Db250ZXh0IiwibyIsInRlc3QiLCJrZXkiLCJjcmVhdGVMYXlvdXQiLCJsYXlvdXQiLCJ0aXRsZSIsImRldGFpbHNUZXh0IiwibmFtZSIsImNoaWxkcmVuIiwibGFiZWwiLCJwcm9wZXJ0eSIsInR5cGUiLCJlbXB0eVRleHQiLCJhdXRvRm9jdXMiLCJyZXF1aXJlZCIsIm1heFRleHRMZW5ndGgiLCJ2YWxpZGF0b3IiLCJleGNlZWRzTWF4VGV4dExlbmd0aCIsImlucHV0VHlwZSIsInBpY2tsaXN0IiwicmVxdWlyZVNlbGVjdGlvbiIsImRlcGVuZHNPbiIsInN0b3JhZ2VNb2RlIiwid2hlcmUiLCJsb2dpY2FsSWQiLCJmb3JtYXRWYWx1ZSIsImFkZHJlc3MiLCJiaW5kRGVsZWdhdGUiLCJ0ZXh0UHJvcGVydHkiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsTUFBTUEsV0FBVyxvQkFBWSxnQkFBWixDQUFqQjs7QUFFQSxNQUFNQyxVQUFVLHVCQUFRLDRDQUFSLEVBQXNELGdCQUF0RCxFQUE4RDtBQUM1RTtBQUNBQyxRQUFJLGdCQUZ3RTtBQUc1RUMsZ0JBQVksa0JBSGdFO0FBSTVFQyxvQkFBZ0Isd0JB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ZixFQUE4Q3JILE9BQTlDO29CQUNlQSxPIiwiZmlsZSI6IkVkaXQuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgY29ubmVjdCBmcm9tICdkb2pvL19iYXNlL2Nvbm5lY3QnO1xyXG5pbXBvcnQgRWRpdCBmcm9tICdhcmdvcy9FZGl0JztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnY3JtL0Zvcm1hdCc7XHJcbmltcG9ydCB2YWxpZGF0b3IgZnJvbSAnY3JtL1ZhbGlkYXRvcic7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2VycEJpbGxUb3NFZGl0Jyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuRVJQQmlsbFRvcy5FZGl0JywgW0VkaXRdLCB7XHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdlcnBiaWxsdG9fZWRpdCcsXHJcbiAgZGV0YWlsVmlldzogJ2VycGJpbGx0b19kZXRhaWwnLFxyXG4gIGluc2VydFNlY3VyaXR5OiAnRW50aXRpZXMvRXJwQmlsbFRvL0FkZCcsXHJcbiAgdXBkYXRlU2VjdXJpdHk6ICdFbnRpdGllcy9FcnBCaWxsVG8vRWRpdCcsXHJcbiAgcmVzb3VyY2VLaW5kOiAnZXJwQmlsbFRvcycsXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgbmFtZVRleHQ6IHJlc291cmNlLm5hbWVUZXh0LFxyXG4gIHBob25lVGV4dDogcmVzb3VyY2UucGhvbmVUZXh0LFxyXG4gIGVtYWlsVGV4dDogcmVzb3VyY2UuZW1haWxUZXh0LFxyXG4gIGN1c3RvbWVyVHlwZVRleHQ6IHJlc291cmNlLmN1c3RvbWVyVHlwZVRleHQsXHJcbiAgY3VzdG9tZXJUeXBlVGl0bGVUZXh0OiByZXNvdXJjZS5jdXN0b21lclR5cGVUaXRsZVRleHQsXHJcbiAgc3RhdHVzVGV4dDogcmVzb3VyY2Uuc3RhdHVzVGV4dCxcclxuICBzdGF0dXNUaXRsZVRleHQ6IHJlc291cmNlLnN0YXR1c1RpdGxlVGV4dCxcclxuICBwYXltZW50VGVybVRleHQ6IHJlc291cmNlLnBheW1lbnRUZXJtVGV4dCxcclxuICBwYXltZW50VGVybVRpdGxlVGV4dDogcmVzb3VyY2UucGF5bWVudFRlcm1UaXRsZVRleHQsXHJcbiAgcGF5bWVudE1ldGhvZFRleHQ6IHJlc291cmNlLnBheW1lbnRNZXRob2RUZXh0LFxyXG4gIHBheW1lbnRNZXRob2RUaXRsZVRleHQ6IHJlc291cmNlLnBheW1lbnRNZXRob2RUaXRsZVRleHQsXHJcbiAgYWRkcmVzc1RleHQ6IHJlc291cmNlLmFkZHJlc3NUZXh0LFxyXG4gIGZheFRleHQ6IHJlc291cmNlLmZheFRleHQsXHJcbiAgb3duZXJUZXh0OiByZXNvdXJjZS5vd25lclRleHQsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5FUlBCSUxMVE8sXHJcbiAgYXNzb2NpYXRpb25NYXBwaW5nOiB7XHJcbiAgICBhY2NvdW50czogJ2VycGJpbGx0b2FjY291bnRzX2VkaXQnLFxyXG4gIH0sXHJcbiAgYXNzb2NpYXRpb25WaWV3OiBudWxsLFxyXG4gIGFzc29jaWF0aW9uQ29udGV4dDogbnVsbCxcclxuXHJcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGluaXQsIGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBhcHBseUNvbnRleHQ6IGZ1bmN0aW9uIGFwcGx5Q29udGV4dCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFwcGx5Q29udGV4dCwgYXJndW1lbnRzKTtcclxuXHJcbiAgICBjb25zdCBmb3VuZCA9IHRoaXMuX2dldE5hdkNvbnRleHQoKTtcclxuICAgIGNvbnN0IGNvbnRleHQgPSAoZm91bmQgJiYgZm91bmQub3B0aW9ucyAmJiBmb3VuZC5vcHRpb25zLnNvdXJjZSkgfHwgZm91bmQ7XHJcbiAgICBjb25zdCBsb29rdXAgPSB7XHJcbiAgICAgIGFjY291bnRzOiB0aGlzLmFwcGx5QWNjb3VudENvbnRleHQsXHJcbiAgICAgIHF1b3RlczogdGhpcy5hcHBseVF1b3RlQ29udGV4dCxcclxuICAgICAgc2FsZXNPcmRlcnM6IHRoaXMuYXBwbHlPcmRlckNvbnRleHQsXHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChjb250ZXh0ICYmIGxvb2t1cFtjb250ZXh0LnJlc291cmNlS2luZF0pIHtcclxuICAgICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KGNvbnRleHQuaWQpO1xyXG4gICAgICBjb25zdCBlbnRyeSA9IGNvbnRleHQuZW50cnkgfHwgKHZpZXcgJiYgdmlldy5lbnRyeSkgfHwgY29udGV4dDtcclxuXHJcbiAgICAgIGlmICghZW50cnkgfHwgIWVudHJ5LiRrZXkpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgbG9va3VwW2NvbnRleHQucmVzb3VyY2VLaW5kXS5jYWxsKHRoaXMsIGVudHJ5LCBBcHAuY29udGV4dC51c2VyLkRlZmF1bHRPd25lcik7XHJcbiAgICAgIHRoaXMuYXNzb2NpYXRpb25Db250ZXh0ID0gZW50cnk7XHJcbiAgICAgIHRoaXMuYXNzb2NpYXRpb25WaWV3ID0gdGhpcy5hc3NvY2lhdGlvbk1hcHBpbmdbY29udGV4dC5yZXNvdXJjZUtpbmRdO1xyXG4gICAgfVxyXG4gICAgdGhpcy5maWVsZHMuT3duZXIuZGlzYWJsZSgpO1xyXG4gIH0sXHJcbiAgYXBwbHlBY2NvdW50Q29udGV4dDogZnVuY3Rpb24gYXBwbHlBY2NvdW50Q29udGV4dChhY2NvdW50LCBkZWZhdWx0T3duZXIpIHtcclxuICAgIGlmIChhY2NvdW50LkVycExvZ2ljYWxJZCkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5FcnBMb2dpY2FsSWQuc2V0VmFsdWUoYWNjb3VudC5FcnBMb2dpY2FsSWQpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5DdXN0b21lclR5cGUuZW5hYmxlKCk7XHJcbiAgICAgIHRoaXMuZmllbGRzLlBheW1lbnRUZXJtLmVuYWJsZSgpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5QYXltZW50TWV0aG9kLmVuYWJsZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5maWVsZHMuQ3VzdG9tZXJUeXBlLmRpc2FibGUoKTtcclxuICAgICAgdGhpcy5maWVsZHMuUGF5bWVudFRlcm0uZGlzYWJsZSgpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5QYXltZW50TWV0aG9kLmRpc2FibGUoKTtcclxuICAgIH1cclxuICAgIHRoaXMuZmllbGRzLkVycEFjY291bnRpbmdFbnRpdHlJZC5zZXRWYWx1ZShhY2NvdW50LkVycEFjY291bnRpbmdFbnRpdHlJZCk7XHJcbiAgICB0aGlzLmZpZWxkcy5Pd25lci5zZXRWYWx1ZShhY2NvdW50Lk93bmVyID8gYWNjb3VudC5Pd25lciA6IGRlZmF1bHRPd25lcik7XHJcbiAgICBpZiAoYWNjb3VudC5BZGRyZXNzICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLkFkZHJlc3Muc2V0VmFsdWUoYWNjb3VudC5BZGRyZXNzKTtcclxuICAgICAgdGhpcy5maWVsZHMuTmFtZS5zZXRWYWx1ZShhY2NvdW50LkFjY291bnROYW1lKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFwcGx5UXVvdGVDb250ZXh0OiBmdW5jdGlvbiBhcHBseVF1b3RlQ29udGV4dChxdW90ZSwgZGVmYXVsdE93bmVyKSB7XHJcbiAgICB0aGlzLmZpZWxkcy5FcnBMb2dpY2FsSWQuc2V0VmFsdWUocXVvdGUuRXJwTG9naWNhbElkKTtcclxuICAgIHRoaXMuZmllbGRzLkVycEFjY291bnRpbmdFbnRpdHlJZC5zZXRWYWx1ZShxdW90ZS5FcnBBY2NvdW50aW5nRW50aXR5SWQpO1xyXG4gICAgdGhpcy5maWVsZHMuT3duZXIuc2V0VmFsdWUocXVvdGUuQWNjb3VudC5Pd25lciA/IHF1b3RlLkFjY291bnQuT3duZXIgOiBkZWZhdWx0T3duZXIpO1xyXG4gICAgaWYgKHF1b3RlLkFjY291bnQuQWRkcmVzcyAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5BZGRyZXNzLnNldFZhbHVlKHF1b3RlLkFjY291bnQuQWRkcmVzcyk7XHJcbiAgICAgIHRoaXMuZmllbGRzLk5hbWUuc2V0VmFsdWUocXVvdGUuQWNjb3VudC5BY2NvdW50TmFtZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm47XHJcbiAgfSxcclxuICBhcHBseU9yZGVyQ29udGV4dDogZnVuY3Rpb24gYXBwbHlPcmRlckNvbnRleHQob3JkZXIsIGRlZmF1bHRPd25lcikge1xyXG4gICAgdGhpcy5maWVsZHMuRXJwTG9naWNhbElkLnNldFZhbHVlKG9yZGVyLkVycExvZ2ljYWxJZCk7XHJcbiAgICB0aGlzLmZpZWxkcy5FcnBBY2NvdW50aW5nRW50aXR5SWQuc2V0VmFsdWUob3JkZXIuRXJwQWNjb3VudGluZ0VudGl0eUlkKTtcclxuICAgIHRoaXMuZmllbGRzLk93bmVyLnNldFZhbHVlKG9yZGVyLkFjY291bnQuT3duZXIgPyBvcmRlci5BY2NvdW50Lk93bmVyIDogZGVmYXVsdE93bmVyKTtcclxuICAgIGlmIChvcmRlci5BY2NvdW50LkFkZHJlc3MgIT09IG51bGwpIHtcclxuICAgICAgdGhpcy5maWVsZHMuQWRkcmVzcy5zZXRWYWx1ZShvcmRlci5BY2NvdW50LkFkZHJlc3MpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5OYW1lLnNldFZhbHVlKG9yZGVyLkFjY291bnQuQWNjb3VudE5hbWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuO1xyXG4gIH0sXHJcbiAgb25BZGRDb21wbGV0ZTogZnVuY3Rpb24gb25BZGRDb21wbGV0ZShlbnRyeSwgcmVzdWx0KSB7XHJcbiAgICAvLyB0aGlzLmVuYWJsZSgpOyBNYWtlIHRoZSBhc3NvY2lhdGlvbiByZWNvcmQgZW5hYmxlIHRoZSB2aWV3XHJcbiAgICB0aGlzLmJ1c3kgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoQXBwLmJhcnMudGJhcikge1xyXG4gICAgICBBcHAuYmFycy50YmFyLmVuYWJsZVRvb2woJ3NhdmUnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtZXNzYWdlID0gdGhpcy5fYnVpbGRSZWZyZXNoTWVzc2FnZShlbnRyeSwgcmVzdWx0KTtcclxuICAgIGNvbm5lY3QucHVibGlzaCgnL2FwcC9yZWZyZXNoJywgW21lc3NhZ2VdKTtcclxuXHJcbiAgICB0aGlzLm9uSW5zZXJ0Q29tcGxldGVkKHJlc3VsdCk7XHJcbiAgfSxcclxuICBvbkluc2VydENvbXBsZXRlZDogZnVuY3Rpb24gb25JbnNlcnRDb21wbGV0ZWQocmVzdWx0cykge1xyXG4gICAgaWYgKHRoaXMuYXNzb2NpYXRpb25WaWV3KSB7XHJcbiAgICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLmFzc29jaWF0aW9uVmlldyk7XHJcbiAgICAgIGlmICh2aWV3KSB7XHJcbiAgICAgICAgdmlldy5pbnNlcnRpbmcgPSB0cnVlO1xyXG4gICAgICAgIHZpZXcub3B0aW9ucyA9IHtcclxuICAgICAgICAgIGluc2VydDogdHJ1ZSxcclxuICAgICAgICAgIGZyb21Db250ZXh0OiB7XHJcbiAgICAgICAgICAgIEJpbGxUbzogcmVzdWx0cyxcclxuICAgICAgICAgICAgQ29udGV4dDogdGhpcy5hc3NvY2lhdGlvbkNvbnRleHQsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgYXV0b1NhdmU6IHRydWUsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB2aWV3Lm9uUmVmcmVzaEluc2VydCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmFzc29jaWF0aW9uVmlldyA9IG51bGw7XHJcbiAgICB0aGlzLmFzc29jaWF0aW9uQ29udGV4dCA9IG51bGw7XHJcbiAgfSxcclxuICBfZ2V0TmF2Q29udGV4dDogZnVuY3Rpb24gX2dldE5hdkNvbnRleHQoKSB7XHJcbiAgICBjb25zdCBuYXZDb250ZXh0ID0gQXBwLnF1ZXJ5TmF2aWdhdGlvbkNvbnRleHQoKG8pID0+IHtcclxuICAgICAgY29uc3QgY29udGV4dCA9IChvLm9wdGlvbnMgJiYgby5vcHRpb25zLnNvdXJjZSkgfHwgbztcclxuXHJcbiAgICAgIGlmICgvXihhY2NvdW50c3xxdW90ZXN8c2FsZXNPcmRlcnMpJC8udGVzdChjb250ZXh0LnJlc291cmNlS2luZCkgJiYgY29udGV4dC5rZXkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbmF2Q29udGV4dDtcclxuICB9LFxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5b3V0IHx8ICh0aGlzLmxheW91dCA9IFt7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmRldGFpbHNUZXh0LFxyXG4gICAgICBuYW1lOiAnRGV0YWlsc1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBsYWJlbDogdGhpcy5uYW1lVGV4dCxcclxuICAgICAgICBuYW1lOiAnTmFtZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdOYW1lJyxcclxuICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICBhdXRvRm9jdXM6IHRydWUsXHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5waG9uZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ01haW5QaG9uZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdNYWluUGhvbmUnLFxyXG4gICAgICAgIHR5cGU6ICdwaG9uZScsXHJcbiAgICAgICAgbWF4VGV4dExlbmd0aDogMzIsXHJcbiAgICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRW1haWwnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRW1haWwnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmVtYWlsVGV4dCxcclxuICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgaW5wdXRUeXBlOiAnZW1haWwnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0N1c3RvbWVyVHlwZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDdXN0b21lclR5cGUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmN1c3RvbWVyVHlwZVRleHQsXHJcbiAgICAgICAgdHlwZTogJ3BpY2tsaXN0JyxcclxuICAgICAgICB0aXRsZTogdGhpcy5jdXN0b21lclR5cGVUaXRsZVRleHQsXHJcbiAgICAgICAgcGlja2xpc3Q6ICdDdXN0b21lciBUeXBlcycsXHJcbiAgICAgICAgcmVxdWlyZVNlbGVjdGlvbjogZmFsc2UsXHJcbiAgICAgICAgZGVwZW5kc09uOiAnRXJwTG9naWNhbElkJyxcclxuICAgICAgICBzdG9yYWdlTW9kZTogJ2NvZGUnLFxyXG4gICAgICAgIHdoZXJlOiAobG9naWNhbElkKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gYGZpbHRlciBlcSBcIiR7bG9naWNhbElkfVwiYDtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc3RhdHVzVGV4dCxcclxuICAgICAgICBuYW1lOiAnU3RhdHVzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFN0YXR1cycsXHJcbiAgICAgICAgcGlja2xpc3Q6ICdFcnBCaWxsVG9TdGF0dXMnLFxyXG4gICAgICAgIHJlcXVpcmVTZWxlY3Rpb246IGZhbHNlLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLnN0YXR1c1RpdGxlVGV4dCxcclxuICAgICAgICB0eXBlOiAncGlja2xpc3QnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMucGF5bWVudFRlcm1UZXh0LFxyXG4gICAgICAgIG5hbWU6ICdQYXltZW50VGVybScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdQYXltZW50VGVybUlkJyxcclxuICAgICAgICBwaWNrbGlzdDogJ1BheW1lbnRUZXJtJyxcclxuICAgICAgICByZXF1aXJlU2VsZWN0aW9uOiBmYWxzZSxcclxuICAgICAgICB0aXRsZTogdGhpcy5wYXltZW50VGVybVRpdGxlVGV4dCxcclxuICAgICAgICB0eXBlOiAncGlja2xpc3QnLFxyXG4gICAgICAgIHN0b3JhZ2VNb2RlOiAnY29kZScsXHJcbiAgICAgICAgZGVwZW5kc09uOiAnRXJwTG9naWNhbElkJyxcclxuICAgICAgICB3aGVyZTogKGxvZ2ljYWxJZCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGBmaWx0ZXIgZXEgXCIke2xvZ2ljYWxJZH1cImA7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnBheW1lbnRNZXRob2RUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdQYXltZW50TWV0aG9kJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFBheW1lbnRNZXRob2QnLFxyXG4gICAgICAgIHBpY2tsaXN0OiAnUGF5bWVudE1ldGhvZENvZGUnLFxyXG4gICAgICAgIHJlcXVpcmVTZWxlY3Rpb246IGZhbHNlLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLnBheW1lbnRNZXRob2RUaXRsZVRleHQsXHJcbiAgICAgICAgdHlwZTogJ3BpY2tsaXN0JyxcclxuICAgICAgICBzdG9yYWdlTW9kZTogJ2NvZGUnLFxyXG4gICAgICAgIGRlcGVuZHNPbjogJ0VycExvZ2ljYWxJZCcsXHJcbiAgICAgICAgd2hlcmU6IChsb2dpY2FsSWQpID0+IHtcclxuICAgICAgICAgIHJldHVybiBgZmlsdGVyIGVxIFwiJHtsb2dpY2FsSWR9XCJgO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIGZvcm1hdFZhbHVlOiBmb3JtYXQuYWRkcmVzcy5iaW5kRGVsZWdhdGUodGhpcywgW3RydWVdLCB0cnVlKSxcclxuICAgICAgICBsYWJlbDogdGhpcy5hZGRyZXNzVGV4dCxcclxuICAgICAgICBuYW1lOiAnQWRkcmVzcycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdBZGRyZXNzJyxcclxuICAgICAgICB0eXBlOiAnYWRkcmVzcycsXHJcbiAgICAgICAgdmlldzogJ2FkZHJlc3NfZWRpdCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5mYXhUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdGYXgnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRmF4JyxcclxuICAgICAgICB0eXBlOiAncGhvbmUnLFxyXG4gICAgICAgIG1heFRleHRMZW5ndGg6IDMyLFxyXG4gICAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4Y2VlZHNNYXhUZXh0TGVuZ3RoLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VycExvZ2ljYWxJZCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBMb2dpY2FsSWQnLFxyXG4gICAgICAgIHR5cGU6ICdoaWRkZW4nLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VycEFjY291bnRpbmdFbnRpdHlJZCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBBY2NvdW50aW5nRW50aXR5SWQnLFxyXG4gICAgICAgIHR5cGU6ICdoaWRkZW4nLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ093bmVyJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5vd25lclRleHQsXHJcbiAgICAgICAgcHJvcGVydHk6ICdPd25lcicsXHJcbiAgICAgICAgdGV4dFByb3BlcnR5OiAnT3duZXJEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgdmlldzogJ293bmVyX2xpc3QnLFxyXG4gICAgICB9LFxyXG4gICAgICBdIH0sXHJcbiAgICBdKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5WaWV3cy5FUlBCaWxsVG9zLkVkaXQnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19