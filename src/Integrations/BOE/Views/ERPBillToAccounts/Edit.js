import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import Edit from 'argos/Edit';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('erpBillToAccountsEdit');

const __class = declare('crm.Integrations.BOE.Views.ERPBillToAccounts.Edit', [Edit], {
  // View Properties
  id: 'erpbilltoaccounts_edit',
  detailView: 'erpbilltoaccounts_detail',
  insertSecurity: 'Entities/ErpBillTo/Add',
  updateSecurity: 'Entities/ErpBillTo/Edit',
  resourceKind: 'erpBillToAccounts',
  titleText: resource.titleText,
  billToText: resource.billToText,
  accountText: resource.accountText,
  modelName: MODEL_NAMES.ERPSHIPTOACCOUNT,

  init: function init() {
    this.inherited(arguments);
  },
  applyContext: function applyContext() {
    this.inherited(arguments);
    if (this.options && this.options.fromContext) {
      this.fields.ErpBillTo.disable();
      this.fields.Account.disable();
      this.fields.ErpBillTo.setValue(this.options.fromContext.BillTo);
      this.fields.Account.setValue(this.options.fromContext.Context);
    } else {
      this.fields.ErpBillTo.enable();
      this.fields.Account.enable();
    }
    if (this.options && this.options.autoSave) {
      this.save();
    }
  },
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        label: this.billToText,
        name: 'ErpBillTo',
        property: 'ErpBillTo',
        type: 'lookup',
        emptyText: '',
        autoFocus: true,
        required: true,
        valueTextProperty: 'Name',
        view: 'erpbilltoaccount_erpbilltos',
      }, {
        label: this.accountText,
        name: 'Account',
        property: 'Account',
        type: 'lookup',
        emptyText: '',
        required: true,
        valueTextProperty: 'AccountName',
        view: 'erpbilltoaccount_accounts',
      },
      ] },
    ]);
  },
});

lang.setObject('icboe.Views.ERPBillToAccounts.Edit', __class);
export default __class;
