import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _Module from './_Module';
import ERPInvoiceDetail from '../Views/ERPInvoices/Detail';
import ERPInvoiceList from '../Views/ERPInvoices/List';
import ERPInvoiceItemDetail from '../Views/ERPInvoiceItems/Detail';
import ERPInvoiceItemList from '../Views/ERPInvoiceItems/List';
import ERPReceivablesList from '../Views/ERPReceivables/List';
import '../Models/ErpInvoice/Offline';
import '../Models/ErpInvoice/SData';
import '../Models/ErpInvoiceItem/Offline';
import '../Models/ErpInvoiceItem/SData';
import '../Models/ErpInvoicePerson/Offline';
import '../Models/ErpInvoicePerson/SData';

const __class = declare('crm.Integrations.BOE.Modules.InvoiceModule', [_Module], {
  defaultViews: ['invoice_list'],
  init: function init() {
    App.picklistService.registerPicklistToView('ErpInvoiceStatus');
  },
  loadViews: function loadViews() {
    const am = this.applicationModule;
    am.registerView(new ERPInvoiceList());
    am.registerView(new ERPInvoiceDetail());
    am.registerView(new ERPInvoiceItemDetail());
    am.registerView(new ERPInvoiceItemList({
      id: 'invoice_items_related',
      hasSettings: false,
      expose: false,
    }));
    am.registerView(new ERPReceivablesList({
      id: 'invoice_receivables_related',
      groupsEnabled: false,
      hasSettings: false,
      expose: false,
    }));
  },
  loadCustomizations: function loadCustomizations() {
    const am = this.applicationModule;
    am.registerCustomization('detail/tools', 'invoice_detail', {
      at: function at(tool) {
        return tool.id === 'edit';
      },
      type: 'remove',
    });

    am.registerCustomization('detail/tools', 'invoice_item_detail', {
      at: function at(tool) {
        return tool.id === 'edit';
      },
      type: 'remove',
    });

    am.registerCustomization('list/tools', 'invoice_list', {
      at: function at(tool) {
        return tool.id === 'new';
      },
      type: 'remove',
    });

    am.registerCustomization('list/tools', 'invoice_items_related', {
      at: function at(tool) {
        return tool.id === 'new';
      },
      type: 'remove',
    });
  },
  loadToolbars: function loadToolbars() {
  },
});

lang.setObject('icboe.Modules.InvoiceModule', __class);
export default __class;
