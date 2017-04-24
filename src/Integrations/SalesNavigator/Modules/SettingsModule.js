import declare from 'dojo/_base/declare';
import getResource from 'argos/I18n';
import SelectList from 'crm/Views/SelectList';
import _Module from './_Module';
import SalesNavigatorConfigurationView from '../Views/Settings/Configuration';
import { defaultSettings, getSettings, setSettings } from '../SalesNavigatorService';

const resource = getResource('salesNavigator');

const __class = declare('crm.Integrations.SalesNavigator.Modules.SettingsModule', [_Module], {
  init: function init() {
    const application = this.applicationModule.application;
    application.initNavigatorSettings = this.loadNavigatorSettingsOrDefault;
    application.saveNavigatorSettings = (settings) => {
      setSettings(settings);
    };
    application.salesNavigatorSettings = this.loadNavigatorSettingsOrDefault();
  },
  loadViews: function loadViews() {
    const am = this.applicationModule;

    am.registerView(new SalesNavigatorConfigurationView({
      groupsEnabled: false,
      disableRightDrawer: true,
      expose: false,
    }));

    am.registerView(new SelectList({
      id: 'sales_navigator_select_list',
      itemTemplate: new Simplate([
        '<h3>{%: $.$descriptor %}</h3>',
        '<h5>{%: $.description %}</h5>',
      ]),
    }));
  },
  loadCustomizations: function loadCustomizations() {
    // const am = this.applicationModule;

    // am.registerCustomization('list/actions', 'settings', {
    //   at: function at(row) {
    //     return row.name === 'viewLanguageOptions';
    //   },
    //   type: 'insert',
    //   where: 'after',
    //   value: {
    //     salesNavigatorConfiguration: {
    //       title: resource.salesNavigatorConfiguration,
    //       cls: 'fa fa-linkedin-square fa-2x',
    //     },
    //   },
    // });

    const {
      init,
      createActionsList,
    } = crm.Views.Settings.prototype;
    crm.Views.Settings.prototype.salesNavigatorConfiguration = function salesNavigatorConfiguration() {
      const view = this.app.getView(SalesNavigatorConfigurationView.prototype.id);
      if (view) {
        view.show();
      }
    };
    crm.Views.Settings.prototype.init = function addSalesNavigatorActions(...args) {
      init.apply(this, args);
      // createActions.apply(this, args);
      // this.actions.salesNavigatorConfiguration = {
      //   title: resource.salesNavigatorConfiguration,
      //   cls: 'fa fa-linkedin-square fa-2x',
      // };
      this.actionOrder.push('salesNavigatorConfiguration');
    };
    crm.Views.Settings.prototype.createActionsList = function createSalesNavigatorActionsList(...args) {
      createActionsList.apply(this, args);
      this.actionItems.salesNavigatorConfiguration = {
        title: resource.salesNavigatorConfiguration,
        cls: 'settings',
      };
    };
  },
  loadToolbars: function loadToolbars() {},
  loadNavigatorSettingsOrDefault: function loadNavigatorSettingsOrDefault() {
    const settings = getSettings();
    if (settings) {
      return settings;
    }
    return defaultSettings();
  },
});

export default __class;
