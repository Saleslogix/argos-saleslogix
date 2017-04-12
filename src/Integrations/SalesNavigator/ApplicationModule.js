import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import ApplicationModule from 'argos/ApplicationModule';
import AccountModule from './Modules/AccountModule';
import ContactModule from './Modules/ContactModule';
import LeadModule from './Modules/LeadModule';
import SettingsModule from './Modules/SettingsModule';

const __class = declare('crm.Integrations.SalesNavigator.ApplicationModule', [ApplicationModule], {
  modules: null,
  init: function init() {
    this.inherited(arguments);

    this.modules = [
      new AccountModule(this),
      new ContactModule(this),
      new LeadModule(this),
      new SettingsModule(this),
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
    // const results = this.application.context.integrations.filter(integration => integration.Name === 'Back Office Extension')[0];
    // return results && results.Enabled;
    return true;
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
  },
  registerDefaultViews: function registerDefaultViews() {
    const self = this;
    const originalGetDefaultViews = crm.Application.prototype.getDefaultViews;
    lang.extend(crm.Application, {
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
