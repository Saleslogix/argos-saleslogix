import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _Module from './_Module';
import ShipToAccountList from '../Views/ERPShipToAccounts/List';
import ShipToAccountDetail from '../Views/ERPShipToAccounts/Detail';
import ShipToAccountEdit from '../Views/ERPShipToAccounts/Edit';
import AccountList from 'crm/Views/Account/List';
import QuotesList from '../Views/Quotes/List';
import SalesOrdersList from '../Views/SalesOrders/List';
import InvoicesList from '../Views/ERPInvoices/List';
import ShipmentsList from '../Views/ERPShipments/List';
import ReceivablesList from '../Views/ERPReceivables/List';
import ReturnsList from '../Views/Returns/List';
import ContactAssociationsList from '../Views/ERPContactAssociations/List';
import SalesPersonList from '../Views/ERPSalesOrderPersons/List';
import BillToList from '../Views/ERPBillToAccounts/List';
import ShipToList from '../Views/ERPShipTos/List';
import '../Models/ErpShipToAccount/Offline';
import '../Models/ErpShipToAccount/SData';

const __class = declare('crm.Integrations.BOE.Modules.ShipToAccountModule', [_Module], {
  init: function init() {
  },
  loadViews: function loadViews() {
    const am = this.applicationModule;

    am.registerView(new ShipToAccountDetail());
    am.registerView(new ShipToAccountEdit());
    am.registerView(new ShipToAccountList());

    am.registerView(new ShipToAccountList({
      id: 'erpshiptoaccount_related',
      groupsEnabled: false,
      expose: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));

    am.registerView(new AccountList({
      id: 'erpshiptoaccount_accounts',
      groupsEnabled: false,
      expose: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));

    am.registerView(new AccountList({
      id: 'erpshiptoaccount_accounts_related',
      groupsEnabled: false,
      expose: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));

    am.registerView(new QuotesList({
      id: 'erpshiptoaccount_quotes_related',
      groupsEnabled: false,
      hasSettings: false,
      expose: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));

    am.registerView(new SalesOrdersList({
      id: 'erpshiptoaccount_salesorders_related',
      groupsEnabled: false,
      hasSettings: false,
      expose: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));

    am.registerView(new InvoicesList({
      id: 'erpshiptoaccount_invoices_related',
      groupsEnabled: false,
      hasSettings: false,
      expose: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));

    am.registerView(new ShipmentsList({
      id: 'erpshiptoaccount_shipments_related',
      groupsEnabled: false,
      hasSettings: false,
      expose: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));

    am.registerView(new ReceivablesList({
      id: 'erpshiptoaccount_receivables_related',
      groupsEnabled: false,
      hasSettings: false,
      expose: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));

    am.registerView(new ReturnsList({
      id: 'erpshiptoaccount_returns_related',
      groupsEnabled: false,
      hasSettings: false,
      expose: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));

    am.registerView(new ContactAssociationsList({
      id: 'erpshiptoaccount_contactassociations_related',
      groupsEnabled: false,
      hasSettings: false,
      expose: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));

    am.registerView(new BillToList({
      id: 'erpshiptoaccount_billto_related',
      groupsEnabled: false,
      expose: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));

    am.registerView(new ShipToList({
      id: 'erpshiptoaccount_erpshiptos',
      groupsEnabled: false,
      expose: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));

    am.registerView(new SalesPersonList({
      id: 'erpshiptoaccount_salesperson_related',
      groupsEnabled: false,
      hasSettings: false,
      expose: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));
  },
  loadCustomizations: function loadCustomizations() {
    const am = this.applicationModule;
    am.registerCustomization('detail/tools', 'erpshiptoaccount_detail', {
      at: function at(tool) {
        return tool.id === 'edit';
      },
      type: 'remove',
    });
    am.registerCustomization('list/tools', 'erpshiptoaccount_invoices_related', {
      at: function at(tool) {
        return tool.id === 'new';
      },
      type: 'remove',
    });
    am.registerCustomization('list/tools', 'erpshiptoaccount_shipments_related', {
      at: function at(tool) {
        return tool.id === 'new';
      },
      type: 'remove',
    });
    am.registerCustomization('list/tools', 'erpshiptoaccount_receivables_related', {
      at: function at(tool) {
        return tool.id === 'new';
      },
      type: 'remove',
    });
    am.registerCustomization('list/tools', 'erpshiptoaccount_returns_related', {
      at: function at(tool) {
        return tool.id === 'new';
      },
      type: 'remove',
    });
    am.registerCustomization('list/tools', 'erpshiptoaccount_contactassociations_related', {
      at: function at(tool) {
        return tool.id === 'new';
      },
      type: 'remove',
    });
    am.registerCustomization('list/tools', 'erpshiptoaccount_salesperson_related', {
      at: function at(tool) {
        return tool.id === 'new';
      },
      type: 'remove',
    });
  },
  loadToolbars: function loadToolbars() {
  },
});

lang.setObject('icboe.Modules.ShipToAccountModule', __class);
export default __class;
