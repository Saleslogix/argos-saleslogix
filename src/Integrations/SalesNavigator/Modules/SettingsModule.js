import declare from 'dojo/_base/declare';
import _Module from './_Module';
import SalesNavigatorConfigurationView from '../Views/Settings/Configuration';

const __class = declare('crm.Integrations.SalesNavigator.Modules.SettingsModule', [_Module], {
  init: function init() {
    const application = this.applicationModule.application;
    application.salesNavigatorSettings = this.loadNavigatorSettingsOrDefault();
  },
  loadViews: function loadViews() {
    const am = this.applicationModule;

    am.registerView(new SalesNavigatorConfigurationView({
      groupsEnabled: false,
      disableRightDrawer: true,
      expose: false,
      createToolLayout: function createToolLayout() {
        return this.tools;
      },
    }));
  },
  loadCustomizations: function loadCustomizations() {
    // const am = this.applicationModule;
    const {
      init,
    } = crm.Views.Settings.prototype;
    crm.Views.Settings.prototype.salesNavigatorConfiguration = function salesNavigatorConfiguration() {
      const view = this.app.getView('sales_navigator_configuration_edit');
      if (view) {
        view.show();
      }
    };
    crm.Views.Settings.prototype.init = function addSalesNavigatorActions(...args) {
      init.apply(this, args);
      // createActions.apply(this, args);
      this.actions.salesNavigatorConfiguration = {
        title: 'Sales Navigator Configuration',
        cls: 'fa fa-linkedin-square fa-2x',
      };
      this.actionOrder.push('salesNavigatorConfiguration');
    };
  },
  loadToolbars: function loadToolbars() {
  },
  loadNavigatorSettingsOrDefault: function loadNavigatorSettingsOrDefault() {
    const settings = localStorage.getItem('salesNavigatorSettings');
    if (settings) {
      return settings;
    }
    return {
      accounts: {
        isResponsive: true,
        smallScreenView: 'simple',
      },
      contacts: {
        isResponsive: true,
        smallScreenView: 'simple',
      },
      leads: {
        isResponsive: true,
        smallScreenView: 'simple',
      },
    };
  },
});

export default __class;
