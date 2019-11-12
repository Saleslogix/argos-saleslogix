define('crm/Integrations/BOE/Views/ERPShipTos/Edit', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/_base/connect', 'argos/Edit', '../../Models/Names', 'crm/Format', 'crm/Validator', 'argos/I18n'], function (module, exports, _declare, _lang, _connect, _Edit, _Names, _Format, _Validator, _I18n) {
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

  var resource = (0, _I18n2.default)('erpShipTosEdit');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPShipTos.Edit', [_Edit2.default], {
    // View Properties
    id: 'erpshipto_edit',
    detailView: 'erpshipto_detail',
    insertSecurity: 'Entities/ErpShipTo/Add',
    updateSecurity: 'Entities/ErpShipTo/Edit',
    resourceKind: 'erpShipTos',
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
    modelName: _Names2.default.ERPSHIPTO,
    associationMapping: {
      accounts: 'erpshiptoaccount_edit'
    },
    associationView: null,
    associationContext: null,

    init: function init() {
      this.inherited(arguments);
    },
    applyContext: function applyContext() {
      this.inherited(arguments);
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
              ShipTo: results,
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
          property: 'ErpCustomerType',
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
          picklist: 'ErpShipToStatus',
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
          label: this.ownerText,
          name: 'Owner',
          property: 'Owner',
          textProperty: 'OwnerDescription',
          type: 'lookup',
          view: 'owner_list'
        }] }]);
    }
  });

  _lang2.default.setObject('icboe.Views.ERPShipTos.Edit', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0VSUFNoaXBUb3MvRWRpdC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJpZCIsImRldGFpbFZpZXciLCJpbnNlcnRTZWN1cml0eSIsInVwZGF0ZVNlY3VyaXR5IiwicmVzb3VyY2VLaW5kIiwidGl0bGVUZXh0IiwibmFtZVRleHQiLCJwaG9uZVRleHQiLCJlbWFpbFRleHQiLCJjdXN0b21lclR5cGVUZXh0IiwiY3VzdG9tZXJUeXBlVGl0bGVUZXh0Iiwic3RhdHVzVGV4dCIsInN0YXR1c1RpdGxlVGV4dCIsInBheW1lbnRUZXJtVGV4dCIsInBheW1lbnRUZXJtVGl0bGVUZXh0IiwicGF5bWVudE1ldGhvZFRleHQiLCJwYXltZW50TWV0aG9kVGl0bGVUZXh0IiwiYWRkcmVzc1RleHQiLCJmYXhUZXh0Iiwib3duZXJUZXh0IiwibW9kZWxOYW1lIiwiRVJQU0hJUFRPIiwiYXNzb2NpYXRpb25NYXBwaW5nIiwiYWNjb3VudHMiLCJhc3NvY2lhdGlvblZpZXciLCJhc3NvY2lhdGlvbkNvbnRleHQiLCJpbml0IiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiYXBwbHlDb250ZXh0IiwiZm91bmQiLCJfZ2V0TmF2Q29udGV4dCIsImNvbnRleHQiLCJvcHRpb25zIiwic291cmNlIiwibG9va3VwIiwiYXBwbHlBY2NvdW50Q29udGV4dCIsInF1b3RlcyIsImFwcGx5UXVvdGVDb250ZXh0Iiwic2FsZXNPcmRlcnMiLCJhcHBseU9yZGVyQ29udGV4dCIsInZpZXciLCJBcHAiLCJnZXRWaWV3IiwiZW50cnkiLCIka2V5IiwiY2FsbCIsInVzZXIiLCJEZWZhdWx0T3duZXIiLCJmaWVsZHMiLCJPd25lciIsImRpc2FibGUiLCJhY2NvdW50IiwiZGVmYXVsdE93bmVyIiwiRXJwTG9naWNhbElkIiwic2V0VmFsdWUiLCJDdXN0b21lclR5cGUiLCJlbmFibGUiLCJQYXltZW50VGVybSIsIlBheW1lbnRNZXRob2QiLCJFcnBBY2NvdW50aW5nRW50aXR5SWQiLCJBZGRyZXNzIiwiTmFtZSIsIkFjY291bnROYW1lIiwicXVvdGUiLCJBY2NvdW50Iiwib3JkZXIiLCJvbkFkZENvbXBsZXRlIiwicmVzdWx0IiwiYnVzeSIsImJhcnMiLCJ0YmFyIiwiZW5hYmxlVG9vbCIsIm1lc3NhZ2UiLCJfYnVpbGRSZWZyZXNoTWVzc2FnZSIsInB1Ymxpc2giLCJvbkluc2VydENvbXBsZXRlZCIsInJlc3VsdHMiLCJpbnNlcnRpbmciLCJpbnNlcnQiLCJmcm9tQ29udGV4dCIsIlNoaXBUbyIsIkNvbnRleHQiLCJhdXRvU2F2ZSIsIm9uUmVmcmVzaEluc2VydCIsIm5hdkNvbnRleHQiLCJxdWVyeU5hdmlnYXRpb25Db250ZXh0IiwibyIsInRlc3QiLCJrZXkiLCJjcmVhdGVMYXlvdXQiLCJsYXlvdXQiLCJ0aXRsZSIsImRldGFpbHNUZXh0IiwibmFtZSIsImNoaWxkcmVuIiwibGFiZWwiLCJwcm9wZXJ0eSIsInR5cGUiLCJlbXB0eVRleHQiLCJhdXRvRm9jdXMiLCJyZXF1aXJlZCIsIm1heFRleHRMZW5ndGgiLCJ2YWxpZGF0b3IiLCJleGNlZWRzTWF4VGV4dExlbmd0aCIsImlucHV0VHlwZSIsInBpY2tsaXN0IiwicmVxdWlyZVNlbGVjdGlvbiIsImRlcGVuZHNPbiIsInN0b3JhZ2VNb2RlIiwid2hlcmUiLCJsb2dpY2FsSWQiLCJmb3JtYXRWYWx1ZSIsImFkZHJlc3MiLCJiaW5kRGVsZWdhdGUiLCJ0ZXh0UHJvcGVydHkiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsTUFBTUEsV0FBVyxvQkFBWSxnQkFBWixDQUFqQjs7QUFFQSxNQUFNQyxVQUFVLHVCQUFRLDRDQUFSLEVBQXNELGdCQUF0RCxFQUE4RDtBQUM1RTtBQUNBQyxRQUFJLGdCQUZ3RTtBQUc1RUMsZ0JBQVksa0JBSGdFO0FBSTVFQyxvQkFBZ0Isd0JB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LCJmaWxlIjoiRWRpdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBjb25uZWN0IGZyb20gJ2Rvam8vX2Jhc2UvY29ubmVjdCc7XHJcbmltcG9ydCBFZGl0IGZyb20gJ2FyZ29zL0VkaXQnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICdjcm0vRm9ybWF0JztcclxuaW1wb3J0IHZhbGlkYXRvciBmcm9tICdjcm0vVmFsaWRhdG9yJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXJwU2hpcFRvc0VkaXQnKTtcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5WaWV3cy5FUlBTaGlwVG9zLkVkaXQnLCBbRWRpdF0sIHtcclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ2VycHNoaXB0b19lZGl0JyxcclxuICBkZXRhaWxWaWV3OiAnZXJwc2hpcHRvX2RldGFpbCcsXHJcbiAgaW5zZXJ0U2VjdXJpdHk6ICdFbnRpdGllcy9FcnBTaGlwVG8vQWRkJyxcclxuICB1cGRhdGVTZWN1cml0eTogJ0VudGl0aWVzL0VycFNoaXBUby9FZGl0JyxcclxuICByZXNvdXJjZUtpbmQ6ICdlcnBTaGlwVG9zJyxcclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBuYW1lVGV4dDogcmVzb3VyY2UubmFtZVRleHQsXHJcbiAgcGhvbmVUZXh0OiByZXNvdXJjZS5waG9uZVRleHQsXHJcbiAgZW1haWxUZXh0OiByZXNvdXJjZS5lbWFpbFRleHQsXHJcbiAgY3VzdG9tZXJUeXBlVGV4dDogcmVzb3VyY2UuY3VzdG9tZXJUeXBlVGV4dCxcclxuICBjdXN0b21lclR5cGVUaXRsZVRleHQ6IHJlc291cmNlLmN1c3RvbWVyVHlwZVRpdGxlVGV4dCxcclxuICBzdGF0dXNUZXh0OiByZXNvdXJjZS5zdGF0dXNUZXh0LFxyXG4gIHN0YXR1c1RpdGxlVGV4dDogcmVzb3VyY2Uuc3RhdHVzVGl0bGVUZXh0LFxyXG4gIHBheW1lbnRUZXJtVGV4dDogcmVzb3VyY2UucGF5bWVudFRlcm1UZXh0LFxyXG4gIHBheW1lbnRUZXJtVGl0bGVUZXh0OiByZXNvdXJjZS5wYXltZW50VGVybVRpdGxlVGV4dCxcclxuICBwYXltZW50TWV0aG9kVGV4dDogcmVzb3VyY2UucGF5bWVudE1ldGhvZFRleHQsXHJcbiAgcGF5bWVudE1ldGhvZFRpdGxlVGV4dDogcmVzb3VyY2UucGF5bWVudE1ldGhvZFRpdGxlVGV4dCxcclxuICBhZGRyZXNzVGV4dDogcmVzb3VyY2UuYWRkcmVzc1RleHQsXHJcbiAgZmF4VGV4dDogcmVzb3VyY2UuZmF4VGV4dCxcclxuICBvd25lclRleHQ6IHJlc291cmNlLm93bmVyVGV4dCxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLkVSUFNISVBUTyxcclxuICBhc3NvY2lhdGlvbk1hcHBpbmc6IHtcclxuICAgIGFjY291bnRzOiAnZXJwc2hpcHRvYWNjb3VudF9lZGl0JyxcclxuICB9LFxyXG4gIGFzc29jaWF0aW9uVmlldzogbnVsbCxcclxuICBhc3NvY2lhdGlvbkNvbnRleHQ6IG51bGwsXHJcblxyXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgYXBwbHlDb250ZXh0OiBmdW5jdGlvbiBhcHBseUNvbnRleHQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgY29uc3QgZm91bmQgPSB0aGlzLl9nZXROYXZDb250ZXh0KCk7XHJcblxyXG4gICAgY29uc3QgY29udGV4dCA9IChmb3VuZCAmJiBmb3VuZC5vcHRpb25zICYmIGZvdW5kLm9wdGlvbnMuc291cmNlKSB8fCBmb3VuZDtcclxuICAgIGNvbnN0IGxvb2t1cCA9IHtcclxuICAgICAgYWNjb3VudHM6IHRoaXMuYXBwbHlBY2NvdW50Q29udGV4dCxcclxuICAgICAgcXVvdGVzOiB0aGlzLmFwcGx5UXVvdGVDb250ZXh0LFxyXG4gICAgICBzYWxlc09yZGVyczogdGhpcy5hcHBseU9yZGVyQ29udGV4dCxcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGNvbnRleHQgJiYgbG9va3VwW2NvbnRleHQucmVzb3VyY2VLaW5kXSkge1xyXG4gICAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoY29udGV4dC5pZCk7XHJcbiAgICAgIGNvbnN0IGVudHJ5ID0gY29udGV4dC5lbnRyeSB8fCAodmlldyAmJiB2aWV3LmVudHJ5KSB8fCBjb250ZXh0O1xyXG5cclxuICAgICAgaWYgKCFlbnRyeSB8fCAhZW50cnkuJGtleSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBsb29rdXBbY29udGV4dC5yZXNvdXJjZUtpbmRdLmNhbGwodGhpcywgZW50cnksIEFwcC5jb250ZXh0LnVzZXIuRGVmYXVsdE93bmVyKTtcclxuICAgICAgdGhpcy5hc3NvY2lhdGlvbkNvbnRleHQgPSBlbnRyeTtcclxuICAgICAgdGhpcy5hc3NvY2lhdGlvblZpZXcgPSB0aGlzLmFzc29jaWF0aW9uTWFwcGluZ1tjb250ZXh0LnJlc291cmNlS2luZF07XHJcbiAgICB9XHJcbiAgICB0aGlzLmZpZWxkcy5Pd25lci5kaXNhYmxlKCk7XHJcbiAgfSxcclxuICBhcHBseUFjY291bnRDb250ZXh0OiBmdW5jdGlvbiBhcHBseUFjY291bnRDb250ZXh0KGFjY291bnQsIGRlZmF1bHRPd25lcikge1xyXG4gICAgaWYgKGFjY291bnQuRXJwTG9naWNhbElkKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLkVycExvZ2ljYWxJZC5zZXRWYWx1ZShhY2NvdW50LkVycExvZ2ljYWxJZCk7XHJcbiAgICAgIHRoaXMuZmllbGRzLkN1c3RvbWVyVHlwZS5lbmFibGUoKTtcclxuICAgICAgdGhpcy5maWVsZHMuUGF5bWVudFRlcm0uZW5hYmxlKCk7XHJcbiAgICAgIHRoaXMuZmllbGRzLlBheW1lbnRNZXRob2QuZW5hYmxlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZpZWxkcy5DdXN0b21lclR5cGUuZGlzYWJsZSgpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5QYXltZW50VGVybS5kaXNhYmxlKCk7XHJcbiAgICAgIHRoaXMuZmllbGRzLlBheW1lbnRNZXRob2QuZGlzYWJsZSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5maWVsZHMuRXJwQWNjb3VudGluZ0VudGl0eUlkLnNldFZhbHVlKGFjY291bnQuRXJwQWNjb3VudGluZ0VudGl0eUlkKTtcclxuICAgIHRoaXMuZmllbGRzLk93bmVyLnNldFZhbHVlKGFjY291bnQuT3duZXIgPyBhY2NvdW50Lk93bmVyIDogZGVmYXVsdE93bmVyKTtcclxuICAgIGlmIChhY2NvdW50LkFkZHJlc3MgIT09IG51bGwpIHtcclxuICAgICAgdGhpcy5maWVsZHMuQWRkcmVzcy5zZXRWYWx1ZShhY2NvdW50LkFkZHJlc3MpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5OYW1lLnNldFZhbHVlKGFjY291bnQuQWNjb3VudE5hbWUpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXBwbHlRdW90ZUNvbnRleHQ6IGZ1bmN0aW9uIGFwcGx5UXVvdGVDb250ZXh0KHF1b3RlLCBkZWZhdWx0T3duZXIpIHtcclxuICAgIHRoaXMuZmllbGRzLkVycExvZ2ljYWxJZC5zZXRWYWx1ZShxdW90ZS5FcnBMb2dpY2FsSWQpO1xyXG4gICAgdGhpcy5maWVsZHMuRXJwQWNjb3VudGluZ0VudGl0eUlkLnNldFZhbHVlKHF1b3RlLkVycEFjY291bnRpbmdFbnRpdHlJZCk7XHJcbiAgICB0aGlzLmZpZWxkcy5Pd25lci5zZXRWYWx1ZShxdW90ZS5BY2NvdW50Lk93bmVyID8gcXVvdGUuQWNjb3VudC5Pd25lciA6IGRlZmF1bHRPd25lcik7XHJcbiAgICBpZiAocXVvdGUuQWNjb3VudC5BZGRyZXNzICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLkFkZHJlc3Muc2V0VmFsdWUocXVvdGUuQWNjb3VudC5BZGRyZXNzKTtcclxuICAgICAgdGhpcy5maWVsZHMuTmFtZS5zZXRWYWx1ZShxdW90ZS5BY2NvdW50LkFjY291bnROYW1lKTtcclxuICAgIH1cclxuICAgIHJldHVybjtcclxuICB9LFxyXG4gIGFwcGx5T3JkZXJDb250ZXh0OiBmdW5jdGlvbiBhcHBseU9yZGVyQ29udGV4dChvcmRlciwgZGVmYXVsdE93bmVyKSB7XHJcbiAgICB0aGlzLmZpZWxkcy5FcnBMb2dpY2FsSWQuc2V0VmFsdWUob3JkZXIuRXJwTG9naWNhbElkKTtcclxuICAgIHRoaXMuZmllbGRzLkVycEFjY291bnRpbmdFbnRpdHlJZC5zZXRWYWx1ZShvcmRlci5FcnBBY2NvdW50aW5nRW50aXR5SWQpO1xyXG4gICAgdGhpcy5maWVsZHMuT3duZXIuc2V0VmFsdWUob3JkZXIuQWNjb3VudC5Pd25lciA/IG9yZGVyLkFjY291bnQuT3duZXIgOiBkZWZhdWx0T3duZXIpO1xyXG4gICAgaWYgKG9yZGVyLkFjY291bnQuQWRkcmVzcyAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5BZGRyZXNzLnNldFZhbHVlKG9yZGVyLkFjY291bnQuQWRkcmVzcyk7XHJcbiAgICAgIHRoaXMuZmllbGRzLk5hbWUuc2V0VmFsdWUob3JkZXIuQWNjb3VudC5BY2NvdW50TmFtZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm47XHJcbiAgfSxcclxuICBvbkFkZENvbXBsZXRlOiBmdW5jdGlvbiBvbkFkZENvbXBsZXRlKGVudHJ5LCByZXN1bHQpIHtcclxuICAgIC8vIHRoaXMuZW5hYmxlKCk7IE1ha2UgdGhlIGFzc29jaWF0aW9uIHJlY29yZCBlbmFibGUgdGhlIHZpZXdcclxuICAgIHRoaXMuYnVzeSA9IGZhbHNlO1xyXG5cclxuICAgIGlmIChBcHAuYmFycy50YmFyKSB7XHJcbiAgICAgIEFwcC5iYXJzLnRiYXIuZW5hYmxlVG9vbCgnc2F2ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLl9idWlsZFJlZnJlc2hNZXNzYWdlKGVudHJ5LCByZXN1bHQpO1xyXG4gICAgY29ubmVjdC5wdWJsaXNoKCcvYXBwL3JlZnJlc2gnLCBbbWVzc2FnZV0pO1xyXG5cclxuICAgIHRoaXMub25JbnNlcnRDb21wbGV0ZWQocmVzdWx0KTtcclxuICB9LFxyXG4gIG9uSW5zZXJ0Q29tcGxldGVkOiBmdW5jdGlvbiBvbkluc2VydENvbXBsZXRlZChyZXN1bHRzKSB7XHJcbiAgICBpZiAodGhpcy5hc3NvY2lhdGlvblZpZXcpIHtcclxuICAgICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KHRoaXMuYXNzb2NpYXRpb25WaWV3KTtcclxuICAgICAgaWYgKHZpZXcpIHtcclxuICAgICAgICB2aWV3Lmluc2VydGluZyA9IHRydWU7XHJcbiAgICAgICAgdmlldy5vcHRpb25zID0ge1xyXG4gICAgICAgICAgaW5zZXJ0OiB0cnVlLFxyXG4gICAgICAgICAgZnJvbUNvbnRleHQ6IHtcclxuICAgICAgICAgICAgU2hpcFRvOiByZXN1bHRzLFxyXG4gICAgICAgICAgICBDb250ZXh0OiB0aGlzLmFzc29jaWF0aW9uQ29udGV4dCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBhdXRvU2F2ZTogdHJ1ZSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZpZXcub25SZWZyZXNoSW5zZXJ0KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuYXNzb2NpYXRpb25WaWV3ID0gbnVsbDtcclxuICAgIHRoaXMuYXNzb2NpYXRpb25Db250ZXh0ID0gbnVsbDtcclxuICB9LFxyXG4gIF9nZXROYXZDb250ZXh0OiBmdW5jdGlvbiBfZ2V0TmF2Q29udGV4dCgpIHtcclxuICAgIGNvbnN0IG5hdkNvbnRleHQgPSBBcHAucXVlcnlOYXZpZ2F0aW9uQ29udGV4dCgobykgPT4ge1xyXG4gICAgICBjb25zdCBjb250ZXh0ID0gKG8ub3B0aW9ucyAmJiBvLm9wdGlvbnMuc291cmNlKSB8fCBvO1xyXG5cclxuICAgICAgaWYgKC9eKGFjY291bnRzfHF1b3Rlc3xzYWxlc09yZGVycykkLy50ZXN0KGNvbnRleHQucmVzb3VyY2VLaW5kKSAmJiBjb250ZXh0LmtleSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBuYXZDb250ZXh0O1xyXG4gIH0sXHJcbiAgY3JlYXRlTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXlvdXQgfHwgKHRoaXMubGF5b3V0ID0gW3tcclxuICAgICAgdGl0bGU6IHRoaXMuZGV0YWlsc1RleHQsXHJcbiAgICAgIG5hbWU6ICdEZXRhaWxzU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLm5hbWVUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdOYW1lJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ05hbWUnLFxyXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnBob25lVGV4dCxcclxuICAgICAgICBuYW1lOiAnTWFpblBob25lJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ01haW5QaG9uZScsXHJcbiAgICAgICAgdHlwZTogJ3Bob25lJyxcclxuICAgICAgICBtYXhUZXh0TGVuZ3RoOiAzMixcclxuICAgICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFbWFpbCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFbWFpbCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZW1haWxUZXh0LFxyXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICBpbnB1dFR5cGU6ICdlbWFpbCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQ3VzdG9tZXJUeXBlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycEN1c3RvbWVyVHlwZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuY3VzdG9tZXJUeXBlVGV4dCxcclxuICAgICAgICB0eXBlOiAncGlja2xpc3QnLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLmN1c3RvbWVyVHlwZVRpdGxlVGV4dCxcclxuICAgICAgICBwaWNrbGlzdDogJ0N1c3RvbWVyIFR5cGVzJyxcclxuICAgICAgICByZXF1aXJlU2VsZWN0aW9uOiBmYWxzZSxcclxuICAgICAgICBkZXBlbmRzT246ICdFcnBMb2dpY2FsSWQnLFxyXG4gICAgICAgIHN0b3JhZ2VNb2RlOiAnY29kZScsXHJcbiAgICAgICAgd2hlcmU6IChsb2dpY2FsSWQpID0+IHtcclxuICAgICAgICAgIHJldHVybiBgZmlsdGVyIGVxIFwiJHtsb2dpY2FsSWR9XCJgO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5zdGF0dXNUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdTdGF0dXMnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwU3RhdHVzJyxcclxuICAgICAgICBwaWNrbGlzdDogJ0VycFNoaXBUb1N0YXR1cycsXHJcbiAgICAgICAgcmVxdWlyZVNlbGVjdGlvbjogZmFsc2UsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMuc3RhdHVzVGl0bGVUZXh0LFxyXG4gICAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5wYXltZW50VGVybVRleHQsXHJcbiAgICAgICAgbmFtZTogJ1BheW1lbnRUZXJtJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1BheW1lbnRUZXJtSWQnLFxyXG4gICAgICAgIHBpY2tsaXN0OiAnUGF5bWVudFRlcm0nLFxyXG4gICAgICAgIHJlcXVpcmVTZWxlY3Rpb246IGZhbHNlLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLnBheW1lbnRUZXJtVGl0bGVUZXh0LFxyXG4gICAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICAgICAgc3RvcmFnZU1vZGU6ICdjb2RlJyxcclxuICAgICAgICBkZXBlbmRzT246ICdFcnBMb2dpY2FsSWQnLFxyXG4gICAgICAgIHdoZXJlOiAobG9naWNhbElkKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gYGZpbHRlciBlcSBcIiR7bG9naWNhbElkfVwiYDtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMucGF5bWVudE1ldGhvZFRleHQsXHJcbiAgICAgICAgbmFtZTogJ1BheW1lbnRNZXRob2QnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwUGF5bWVudE1ldGhvZCcsXHJcbiAgICAgICAgcGlja2xpc3Q6ICdQYXltZW50TWV0aG9kQ29kZScsXHJcbiAgICAgICAgcmVxdWlyZVNlbGVjdGlvbjogZmFsc2UsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMucGF5bWVudE1ldGhvZFRpdGxlVGV4dCxcclxuICAgICAgICB0eXBlOiAncGlja2xpc3QnLFxyXG4gICAgICAgIHN0b3JhZ2VNb2RlOiAnY29kZScsXHJcbiAgICAgICAgZGVwZW5kc09uOiAnRXJwTG9naWNhbElkJyxcclxuICAgICAgICB3aGVyZTogKGxvZ2ljYWxJZCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGBmaWx0ZXIgZXEgXCIke2xvZ2ljYWxJZH1cImA7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgICAgZm9ybWF0VmFsdWU6IGZvcm1hdC5hZGRyZXNzLmJpbmREZWxlZ2F0ZSh0aGlzLCBbdHJ1ZV0sIHRydWUpLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFkZHJlc3NUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdBZGRyZXNzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0FkZHJlc3MnLFxyXG4gICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcclxuICAgICAgICB2aWV3OiAnYWRkcmVzc19lZGl0JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmZheFRleHQsXHJcbiAgICAgICAgbmFtZTogJ0ZheCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdGYXgnLFxyXG4gICAgICAgIHR5cGU6ICdwaG9uZScsXHJcbiAgICAgICAgbWF4VGV4dExlbmd0aDogMzIsXHJcbiAgICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwTG9naWNhbElkJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycExvZ2ljYWxJZCcsXHJcbiAgICAgICAgdHlwZTogJ2hpZGRlbicsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwQWNjb3VudGluZ0VudGl0eUlkJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycEFjY291bnRpbmdFbnRpdHlJZCcsXHJcbiAgICAgICAgdHlwZTogJ2hpZGRlbicsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5vd25lclRleHQsXHJcbiAgICAgICAgbmFtZTogJ093bmVyJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ093bmVyJyxcclxuICAgICAgICB0ZXh0UHJvcGVydHk6ICdPd25lckRlc2NyaXB0aW9uJyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICB2aWV3OiAnb3duZXJfbGlzdCcsXHJcbiAgICAgIH0sXHJcbiAgICAgIF0gfSxcclxuICAgIF0pO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLlZpZXdzLkVSUFNoaXBUb3MuRWRpdCcsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=