import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import format from 'crm/Format';
import Detail from 'argos/Detail';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('erpShipTosDetail');

/**
 * @class crm.Integrations.BOE.Views.ERPShipTos.Detail
 * @extends argos.Detail
 */
const __class = declare('crm.Integrations.BOE.Views.ERPShipTos.Detail', [Detail], /** @lends crm.Integrations.BOE.Views.ERPShipTos.Detail# */{
  // Localization
  titleText: resource.titleText,
  relatedItemsText: resource.relatedItemsText,
  entityText: resource.entityText,
  backOfficeIdText: resource.backOfficeIdText,
  nameText: resource.nameText,
  faxText: resource.faxText,
  phoneText: resource.phoneText,
  emailText: resource.emailText,
  addressText: resource.addressText,
  statusText: resource.statusText,
  syncStatusText: resource.syncStatusText,
  logicalIdText: resource.logicalIdText,
  accountingEntityIdText: resource.accountingEntityIdText,
  ownerText: resource.ownerText,
  billToText: resource.billToText,
  accountsText: resource.accountsText,
  contactAssociationsText: resource.contactAssociationsText,
  receivablesText: resource.receivablesText,
  invoicesText: resource.invoicesText,
  returnsText: resource.returnsText,
  quotesText: resource.quotesText,
  salesOrdersText: resource.salesOrdersText,
  syncHistoryText: resource.syncHistoryText,

  // View Properties
  id: 'erpshipto_detail',
  modelName: MODEL_NAMES.ERPSHIPTO,
  resourceKind: 'erpShipTos',
  enableOffline: true,

  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: this.actionsText,
      list: true,
      cls: 'action-list',
      name: 'QuickActionsSection',
      children: [],
    }, {
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        name: 'ErpExtId',
        property: 'ErpExtId',
        label: this.backOfficeIdText,
      }, {
        name: 'Name',
        property: 'Name',
        label: this.nameText,
      }, {
        name: 'Phone',
        property: 'MainPhone',
        label: this.phoneText,
      }, {
        name: 'Email',
        property: 'Email',
        label: this.emailText,
      }, {
        name: 'Address',
        property: 'Address',
        label: this.addressText,
        renderer: function renderer(val) {
          if (val) {
            return format.address(val);
          }
        },
      }, {
        name: 'Status',
        property: 'ErpStatus',
        label: this.statusText,
      }, {
        name: 'Owner',
        property: 'Owner.OwnerDescription',
        label: this.ownerText,
      }, {
        name: 'Fax',
        property: 'Fax',
        label: this.faxText,
      }, {
        name: 'SyncStatus',
        property: 'SyncStatus',
        label: this.syncStatusText,
        renderer: this.formatPicklist('SyncStatus'),
      }, {
        name: 'LogicalId',
        property: 'ErpLogicalId',
        label: this.logicalIdText,
      }, {
        name: 'AccountingEntityId',
        property: 'ErpAccountingEntityId',
        label: this.accountingEntityIdText,
      }],
    }, {
      title: this.relatedItemsText,
      name: 'RelatedItemsSection',
      list: true,
      children: [{
        name: 'Accounts',
        label: this.accountsText,
        where: function where(entry) {
          return `ErpShipToAccounts.ErpShipTo.Id eq "${entry.$key}"`;
        },
        view: 'shipto_accounts_related',
      }, {
        name: 'BillTos',
        label: this.billToText,
        where: (entry) => {
          return `ErpBillToShipTos.ErpShipTo.Id eq "${entry.$key}"`;
        },
        view: 'shipto_billtos_related',
      }, {
        name: 'Quotes',
        label: this.quotesText,
        where: (entry) => {
          return `ShipTo.Id eq "${entry.$key}"`;
        },
        view: 'shipto_quotes_related',
      }, {
        name: 'SalesOrders',
        label: this.salesOrdersText,
        where: (entry) => {
          return `ErpShipTo.Id eq "${entry.$key}"`;
        },
        view: 'shipto_orders_related',
      }, {
        name: 'Receivables',
        label: this.receivablesText,
        where: (entry) => {
          return `ErpShipTo.Id eq "${entry.$key}"`;
        },
        view: 'shipto_receivables_related',
      }, {
        name: 'Invoices',
        label: this.invoicesText,
        where: (entry) => {
          return `ErpShipTo.Id eq "${entry.$key}"`;
        },
        view: 'shipto_invoices_related',
      }, {
        name: 'Returns',
        label: this.returnsText,
        where: (entry) => {
          return `ErpShipTo.Id eq "${entry.$key}"`;
        },
        view: 'shipto_returns_related',
      }, {
        name: 'SyncHistory',
        label: this.syncHistoryText,
        where: (entry) => {
          return `EntityType eq "ERPShipTo" and EntityId eq "${entry.$key}"`;
        },
        view: 'shipto_synchistory_related',
      }],
    }]);
  },
  formatPicklist: function formatPicklist(property) {
    return format.picklist(this.app.picklistService, this._model, property);
  },
  formatMultiCurrency: function formatMultiCurrency(val) {
    if (App.hasMultiCurrency() && val) {
      if (this.entry.ErpInvoice.CurrencyCode) {
        return format.multiCurrency.call(null, val, this.entry.ErpInvoice.CurrencyCode);
      }
      return format.currency.call(null, val);
    }
    return format.currency.call(null, val);
  },
});

lang.setObject('icboe.Views.ERPShipTos.Detail', __class);
export default __class;
