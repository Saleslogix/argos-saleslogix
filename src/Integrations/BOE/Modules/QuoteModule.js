import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _Module from './_Module';
import AttachmentList from '../../../Views/Attachment/List';
import BackOfficeList from '../Views/BackOffices/List';
import BackOfficeAccountingEntityList from '../Views/BackOfficeAccountingEntities/List';
import BillToList from '../Views/ERPBillTos/List';
import CarrierList from '../Views/Carriers/List';
import LocationList from '../Views/Locations/List';
import QuotePersonsList from '../Views/QuotePersons/List';
import QuoteLinesDetail from '../Views/QuoteLines/Detail';
import QuoteLinesList from '../Views/QuoteLines/List';
import QuotesDetail from '../Views/Quotes/Detail';
import QuotesEdit from '../Views/Quotes/Edit';
import QuotesList from '../Views/Quotes/List';
import ShipToList from '../Views/ERPShipTos/List';
import SyncResultsList from '../Views/SyncResults/List';
import '../Models/Quote/Offline';
import '../Models/Quote/SData';

const __class = declare('crm.Integrations.BOE.Modules.QuoteModule', [_Module], {
  defaultViews: ['quote_list'],
  init: function init() {
    App.picklistService.registerPicklistToView('SyncStatus', 'quote_detail');
    App.picklistService.registerPicklistToView('ErpQuoteStatus', 'quote_detail');
  },
  loadViews: function loadViews() {
    const am = this.applicationModule;

    am.registerView(new QuotesDetail());
    am.registerView(new QuotesEdit());

    am.registerView(new CarrierList({
      id: 'quote_carriers',
    }));

    am.registerView(new AttachmentList({
      id: 'quote_attachments_related',
      expose: false,
      defaultSearchTerm: function defaultSearchTerm() {
        return '';
      },
    }));

    am.registerView(new QuotePersonsList({
      id: 'quotepersons_related',
      hasSettings: false,
      expose: false,
    }));

    am.registerView(new QuoteLinesList({
      id: 'quote_lines_related',
      hasSettings: false,
      expose: false,
      addLineItems: function addLineItems() {
        if (!this.options.selectedEntry.ErpLogicalId) {
          App.modal.createSimpleDialog({
            title: 'alert',
            content: this.accountingEntityRequiredText,
            getContent: () => { return; },
          }).then(() => {
            const quoteEdit = App.getView('quote_edit');
            if (quoteEdit) {
              const options = {
                entry: this.options.selectedEntry,
                fromContext: this.options.fromContext,
              };
              quoteEdit.show(options);
            }
          });
          return;
        }
        const view = App.getView('quote_line_edit');
        if (view) {
          const quoteItemView = App.getView('quote_lines_related');
          let count = 0;
          if (quoteItemView) {
            quoteItemView.getListCount({ where: `Quote.$key eq "${this.options.selectedEntry.$key}"` }).then((result) => {
              count = result;
            });
          }
          const options = {
            insert: true,
            context: {
              Quote: this.options.selectedEntry,
              CurrentCount: count,
            },
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
            security: this.app.getViewSecurity(this.insertView, 'insert'),
          }],
        });
      },
    }));

    am.registerView(new BillToList({
      id: 'quote_billTos_related',
      hasSettings: false,
      expose: false,
      groupsEnabled: false,
    }));

    am.registerView(new ShipToList({
      id: 'quote_shipTos_related',
      hasSettings: false,
      expose: false,
      groupsEnabled: false,
    }));

    am.registerView(new BackOfficeList({
      id: 'quote_backoffice_related',
      hasSettings: false,
      groupsEnabled: false,
    }));

    am.registerView(new BackOfficeAccountingEntityList({
      id: 'quote_backofficeaccountingentity_related',
      hasSettings: false,
      groupsEnabled: false,
    }));

    am.registerView(new LocationList({
      id: 'quote_location_list',
      hasSettings: false,
    }));

    am.registerView(new LocationList({
      id: 'quote_warehouse_list',
      hasSettings: false,
    }));

    am.registerView(new SyncResultsList({
      id: 'quote_syncresult_related',
      hasSettings: false,
    }));

    am.registerView(new QuoteLinesDetail());

    am.registerView(new QuotesList());
  },
  loadCustomizations: function loadCustomizations() {
    const am = this.applicationModule;
    am.registerCustomization('list/tools', 'quotepersons_related', {
      at: function at(tool) {
        return tool.id === 'new';
      },
      type: 'remove',
    });
  },
  loadToolbars: function loadToolbars() {
  },
});

lang.setObject('icboe.Modules.QuoteModule', __class);
export default __class;
