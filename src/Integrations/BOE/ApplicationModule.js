import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import getResource from 'argos/I18n';
import Application from 'argos/Application';
import ApplicationModule from 'argos/ApplicationModule';
import AccountAssociationModule from './Modules/AccountAssociationModule';
import AccountModule from './Modules/AccountModule';
import BillToAccountModule from './Modules/BillToAccountModule';
import BillToModule from './Modules/BillToModule';
import ContactModule from './Modules/ContactModule';
import ContactAssociationModule from './Modules/ContactAssociationModule';
import HelpModule from './Modules/HelpModule';
import InvoiceLineModule from './Modules/InvoiceLineModule';
import InvoiceModule from './Modules/InvoiceModule';
import OpportunityModule from './Modules/OpportunityModule';
import PayFromModule from './Modules/PayFromModule';
// import PicklistService from './PicklistService';
import ProductModule from './Modules/ProductModule';
import QuoteModule from './Modules/QuoteModule';
import QuotePersonModule from './Modules/QuotePersonModule';
import QuoteLineModule from './Modules/QuoteLineModule';
import ReceivableLineModule from './Modules/ReceivableLineModule';
import ReceivableModule from './Modules/ReceivableModule';
import ReturnLineModule from './Modules/ReturnLineModule';
import ReturnModule from './Modules/ReturnModule';
import SalesOrderItemModule from './Modules/SalesOrderItemModule';
import SalesOrderModule from './Modules/SalesOrderModule';
import ShipmentLineModule from './Modules/ShipmentLineModule';
import ShipmentModule from './Modules/ShipmentModule';
import ShipToAccountModule from './Modules/ShipToAccountModule';
import ShipToModule from './Modules/ShipToModule';
import RecentlyViewedList from '../../Views/RecentlyViewed/List';

import './Models/SyncResult/Offline';
import './Models/SyncResult/SData';
import './Models/BackOffice/Offline';
import './Models/BackOffice/SData';
import './Models/BackOfficeAccountingEntity/Offline';
import './Models/BackOfficeAccountingEntity/SData';
import './Models/Location/Offline';
import './Models/Location/SData';
import './Models/OperatingCompany/Offline';
import './Models/OperatingCompany/SData';
import './Models/UnitOfMeasure/Offline';
import './Models/UnitOfMeasure/SData';
import 'argos/TabWidget';

// const resource = getResource('icboeApplicationModule');

const __class = declare('crm.Integrations.BOE.ApplicationModule', [ApplicationModule], {
  modules: null,
  init: function init() {
    this.inherited(arguments);

    // App.picklistService = PicklistService;
    App.enableDashboards = this.enableDashboards;
    this.modules = [
      new AccountAssociationModule(this),
      new AccountModule(this),
      new BillToAccountModule(this),
      new BillToModule(this),
      new ContactModule(this),
      new ContactAssociationModule(this),
      new HelpModule(this),
      new InvoiceLineModule(this),
      new InvoiceModule(this),
      new OpportunityModule(this),
      new PayFromModule(this),
      new ProductModule(this),
      new QuoteModule(this),
      new QuotePersonModule(this),
      new QuoteLineModule(this),
      new ReceivableLineModule(this),
      new ReceivableModule(this),
      new ReturnLineModule(this),
      new ReturnModule(this),
      new SalesOrderItemModule(this),
      new SalesOrderModule(this),
      new ShipmentLineModule(this),
      new ShipmentModule(this),
      new ShipToAccountModule(this),
      new ShipToModule(this),
    ];

    this.modules.forEach((mod) => {
      mod.init();
    });
  },
  initDynamic: function init() {
    if (!this.isIntegrationEnabled()) {
      return;
    }

    this.modules.forEach((mod) => {
      mod.initDynamic();
    });

    this.inherited(arguments);
  },
  isIntegrationEnabled: function isIntegrationEnabled() {
    const results = this.application.context.integrations.filter(integration => integration.Name === 'Back Office Extension')[0];
    return results && results.Enabled;
  },
  loadViewsDynamic: function loadViewsDynamic() {
    if (!this.isIntegrationEnabled()) {
      return;
    }

    this.modules.forEach((module) => {
      module.loadViews();
    });
  },
  loadCustomizationsDynamic: function loadCustomizations() {
    if (!this.isIntegrationEnabled()) {
      return;
    }

    this.modules.forEach((module) => {
      module.loadCustomizations();
    });
    this.registerDefaultViews();

    lang.extend(argos._ListBase, { // TODO: Avoid global
      navigateToInsertView: function navigateToInsertView(additionalOptions) {
        const view = this.app.getView(this.insertView || this.editView);
        let options = {
          detailView: this.detailView,
          returnTo: this.id,
          insert: true,
        };

        // Pass along the selected entry (related list could get it from a quick action)
        if (this.options.selectedEntry) {
          options.selectedEntry = this.options.selectedEntry;
        }

        if (additionalOptions) {
          options = lang.mixin(options, additionalOptions);
        }

        if (view) {
          view.show(options);
        }
      },
    });

    lang.extend(argos._EditBase, {// TODO: Avoid global
      onInsertCompleted: function onInsertCompleted(entry) {
        if (this.options && this.options.detailView) {
          const view = App.getView(this.options.detailView);
          if (view) {
            view.show({
              key: entry.$key,
              title: entry.$descriptor,
              description: entry.$descriptor,
            }, {
              returnTo: -1,
            });
          }
        }
        if (this.options && this.options.returnTo) {
          const returnTo = this.options.returnTo;
          const view = App.getView(returnTo);
          if (view) {
            view.show();
          } else {
            window.location.hash = returnTo;
          }
        } else {
          ReUI.back();
        }
      },
    });

    lang.extend(crm.Views.MetricWidget, {
      itemTemplate: new Simplate([
        '<h1 class="metric-value" {%: $$.getValueStyle() %} >{%: $$.formatter($.value) %}</h1>',
        '<span class="metric-title">{%: $$.title %}</span>',
      ]),
      setValueColor: function setValueColor(color) {
        this.valueColor = color;
      },
      getValueStyle: function getValueStyle() {
        if (this.valueColor) {
          return `style=color:${this.valueColor}`;
        }
        return '';
      },
    });

    lang.extend(argos.TabWidget, {// TODO: Avoid global
      tabListItemTemplate: new Simplate([
        '<li data-key="{%: $.name %}" class="tab" role="presentation" data-action="selectedTab">',
        '<a href="#{%: $$.id %}_{%: $.name %}">{%: ($.title || $.options.title) %}</a>',
        '</li>',
      ]),
    });

    // Recently viewed support
    const originalMappings = RecentlyViewedList.prototype.entityMappings;
    const originalText = RecentlyViewedList.prototype.entityText;

    RecentlyViewedList.prototype.entityText = Object.assign({}, originalText, {
      ERPShipment: getResource('erpShipmentModel').entityDisplayNamePlural,
      SalesOrder: getResource('salesOrderModel').entityDisplayNamePlural,
      ERPReceivable: getResource('erpReceivableModel').entityDisplayNamePlural,
      Quote: getResource('quoteModel').entityDisplayNamePlural,
      ERPInvoice: getResource('erpInvoiceModel').entityDisplayNamePlural,
    });

    RecentlyViewedList.prototype.entityMappings = Object.assign({}, originalMappings, {
      ERPShipment: {
        iconClass: 'warehouse',
      },
      SalesOrder: {
        iconClass: 'cart',
      },
      ERPReceivable: {
        iconClass: 'checkbox',
      },
      Quote: {
        iconClass: 'document',
      },
      ERPInvoice: {
        iconClass: 'document2',
      },
    });
  },
  loadToolbarsDynamic: function loadToolbars() {
    if (!this.isIntegrationEnabled()) {
      return;
    }

    this.modules.forEach((module) => {
      module.loadToolbars();
    });
  },
  loadAppStatePromises: function loadAppStatePromises() {
    this.inherited(arguments);
    // this.registerAppStatePromise({
    //   seq: 2,
    //   description: resource.picklistsText,
    //   items: [{
    //     name: 'picklist-requests',
    //     description: resource.retrievingPicklistsText,
    //     fn: () => {
    //       PicklistService.requestPicklists();
    //     },
    //   }],
    // });
  },
  registerDefaultViews: function registerDefaultViews() {
    const self = this;
    const originalGetDefaultViews = Application.prototype.getDefaultViews;
    lang.extend(Application, {
      getDefaultViews: function getDefaultViews() {
        const views = originalGetDefaultViews.apply(this, arguments) || [];
        self.modules.forEach((module) => {
          module.registerDefaultViews(views);
        });
        return views;
      },
    });
  },
});

lang.setObject('icboe.ApplicationModule', __class);
export default __class;
