import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _Module from './_Module';
import ErpContactAssociationsList from '../Views/ERPContactAssociations/List';
import QuotesList from '../Views/Quotes/List';
import SalesOrdersList from '../Views/SalesOrders/List';
import SyncResultsList from '../Views/SyncResults/List';
import getResource from 'argos/I18n';

const resource = getResource('contactModule');

const __class = declare('icboe.Modules.ContactModule', [_Module], {
  // Localization
  erpStatusText: resource.erpStatusText,
  erpContactIdText: resource.erpContactIdText,
  erpAccountAssociationsText: resource.erpAccountAssociationsText,
  relatedERPItemsText: resource.relatedERPItemsText,
  addQuoteText: resource.addQuoteText,
  addOrderText: resource.addOrderText,
  quotesText: resource.quotesText,
  ordersText: resource.ordersText,
  syncHistoryText: resource.syncHistoryText,

  init: function init() {
  },
  loadViews: function loadViews() {
    const am = this.applicationModule;

    am.registerView(new ErpContactAssociationsList({
      id: 'contact_account_related',
      groupsEnabled: false,
      disableRightDrawer: true,
      expose: false,
      title: this.erpAccountAssociationsText,
      createToolLayout: function createToolLayout() {
        return this.tools;
      },
    }));

    am.registerView(new QuotesList({
      id: 'contact_quotes_related',
      groupsEnabled: false,
      disableRightDrawer: true,
      expose: false,
      queryOrderBy: 'CreateDate asc',
    }));

    am.registerView(new SalesOrdersList({
      id: 'contact_salesorders_related',
      groupsEnabled: false,
      disableRightDrawer: true,
      expose: false,
      queryOrderBy: 'CreateDate asc',
    }));

    am.registerView(new SyncResultsList({
      id: 'contact_syncresults_related',
      groupsEnabled: false,
      disableRightDrawer: true,
      expose: false,
    }));
  },
  loadCustomizations: function loadCustomizations() {
    const am = this.applicationModule;

    // Row names to match in the detail and more detail sections.
    // These are the last item in the section.
    const detailRowMatch = 'AccountManager.UserInfo';

    lang.extend(crm.Views.Contact.Detail, {
      querySelect: crm.Views.Contact.Detail.prototype.querySelect.concat([
        'ErpStatus',// ERP Status
        'ErpExtId', // ERP Contact Id
      ]),
      _onAddQuoteClick: function _onAddQuoteClick() {
        const view = App.getView('quote_edit');
        view.show({
          entry: this.entry,
          detailView: 'quote_detail',
          fromContext: this,
          insert: true,
        });
      },
      _onAddOrderClick: function _onAddOrderClick() {
        const view = App.getView('salesorder_edit');
        view.show({
          entry: this.entry,
          detailView: 'salesorder_detail',
          fromContext: this,
          insert: true,
        });
      },
    });

    /*
     * Quick Actions
     */
    am.registerCustomization('detail', 'contact_detail', {
       at: function at(row) {
         return row.name === 'ViewAddressAction';
       },
       type: 'insert',
       where: 'after',
       value: [{
         name: 'AddQuote',
         property: 'NameLF',
         label: this.addQuoteText,
         iconClass: 'fa fa-file-text-o fa-2x',
         action: '_onAddQuoteClick',
         security: 'Entities/Quote/Add',
       }, {
         name: 'AddOrder',
         property: 'AccountName',
         label: this.addOrderText,
         iconClass: 'fa fa-shopping-cart fa-2x',
         action: '_onAddOrderClick',
         security: 'Entities/SalesOrder/Add',
       }],
    });

    /*
     * Details
     */
    am.registerCustomization('detail', 'contact_detail', {
      at: function at(row) {
        return row.name === detailRowMatch;
      },
      type: 'insert',
      where: 'after',
      value: [{
        label: this.erpStatusText,
        property: 'ErpStatus',
      }, {
        label: this.erpContactIdText,
        property: 'ErpExtId',
      }],
    });

     /*
     * Related Items
     */
    am.registerCustomization('detail', 'contact_detail', {
      at: function at(row) {
        return row.name === 'RelatedItemsSection';
      },
      type: 'insert',
      where: 'after',
      value: {
        title: this.relatedERPItemsText,
        list: true,
        name: 'RelatedERPItemsSection',
        children: [{
          name: 'AccountAssociations',
          label: this.erpAccountAssociationsText,
          where: function where(entry) {
            return 'Contact.Id eq "' + entry.$key + '"';
          },
          view: 'contact_account_related',
        }, {
          name: 'Quotes',
          label: this.quotesText,
          where: function where(entry) {
            return 'RequestedBy.Id eq "' + entry.$key + '"';
          },
          view: 'contact_quotes_related',
        }, {
          name: 'SalesOrders',
          label: this.ordersText,
          where: function where(entry) {
            return 'RequestedBy.Id eq "' + entry.$key + '"';
          },
          view: 'contact_salesorders_related',
        }, {
          name: 'SyncHistory',
          label: this.syncHistoryText,
          where: (entry) => {
            return `EntityType eq "Contact" and EntityId eq "${entry.$key}"`;
          },
          view: 'contact_syncresults_related',
        }],
      },
    });
  },
  loadToolbars: function loadToolbars() {
  },
});

export default __class;
