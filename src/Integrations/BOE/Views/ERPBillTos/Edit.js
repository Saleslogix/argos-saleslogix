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

import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import connect from 'dojo/_base/connect';
import Edit from 'argos/Edit';
import MODEL_NAMES from '../../Models/Names';
import format from 'crm/Format';
import validator from 'crm/Validator';
import getResource from 'argos/I18n';

const resource = getResource('erpBillTosEdit');

const __class = declare('crm.Integrations.BOE.Views.ERPBillTos.Edit', [Edit], {
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
  modelName: MODEL_NAMES.ERPBILLTO,
  associationMapping: {
    accounts: 'erpbilltoaccounts_edit',
  },
  associationView: null,
  associationContext: null,

  init: function init() {
    this.inherited(init, arguments);
  },
  applyContext: function applyContext() {
    this.inherited(applyContext, arguments);

    const found = this._getNavContext();
    const context = (found && found.options && found.options.source) || found;
    const lookup = {
      accounts: this.applyAccountContext,
      quotes: this.applyQuoteContext,
      salesOrders: this.applyOrderContext,
    };

    if (context && lookup[context.resourceKind]) {
      const view = App.getView(context.id);
      const entry = context.entry || (view && view.entry) || context;

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

    const message = this._buildRefreshMessage(entry, result);
    connect.publish('/app/refresh', [message]);

    this.onInsertCompleted(result);
  },
  onInsertCompleted: function onInsertCompleted(results) {
    if (this.associationView) {
      const view = App.getView(this.associationView);
      if (view) {
        view.inserting = true;
        view.options = {
          insert: true,
          fromContext: {
            BillTo: results,
            Context: this.associationContext,
          },
          autoSave: true,
        };
        view.onRefreshInsert();
      }
    }
    this.associationView = null;
    this.associationContext = null;
  },
  _getNavContext: function _getNavContext() {
    const navContext = App.queryNavigationContext((o) => {
      const context = (o.options && o.options.source) || o;

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
        required: true,
      }, {
        label: this.phoneText,
        name: 'MainPhone',
        property: 'MainPhone',
        type: 'phone',
        maxTextLength: 32,
        validator: validator.exceedsMaxTextLength,
      }, {
        name: 'Email',
        property: 'Email',
        label: this.emailText,
        type: 'text',
        inputType: 'email',
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
        where: (logicalId) => {
          return `filter eq "${logicalId}"`;
        },
      }, {
        label: this.statusText,
        name: 'Status',
        property: 'ErpStatus',
        picklist: 'ErpBillToStatus',
        requireSelection: false,
        title: this.statusTitleText,
        type: 'picklist',
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
        where: (logicalId) => {
          return `filter eq "${logicalId}"`;
        },
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
        where: (logicalId) => {
          return `filter eq "${logicalId}"`;
        },
      }, {
        emptyText: '',
        formatValue: format.address.bindDelegate(this, [true], true),
        label: this.addressText,
        name: 'Address',
        property: 'Address',
        type: 'address',
        view: 'address_edit',
      }, {
        label: this.faxText,
        name: 'Fax',
        property: 'Fax',
        type: 'phone',
        maxTextLength: 32,
        validator: validator.exceedsMaxTextLength,
      }, {
        name: 'ErpLogicalId',
        property: 'ErpLogicalId',
        type: 'hidden',
      }, {
        name: 'ErpAccountingEntityId',
        property: 'ErpAccountingEntityId',
        type: 'hidden',
      }, {
        name: 'Owner',
        label: this.ownerText,
        property: 'Owner',
        textProperty: 'OwnerDescription',
        type: 'lookup',
        view: 'owner_list',
      },
      ] },
    ]);
  },
});

lang.setObject('icboe.Views.ERPBillTos.Edit', __class);
export default __class;
