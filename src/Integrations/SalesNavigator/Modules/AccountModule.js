import declare from 'dojo/_base/declare';
import getResource from 'argos/I18n';
import _Module from './_Module';
import AccountWidget from '../Views/Account/Widget';

const resource = getResource('salesNavigator');

const __class = declare('crm.Integrations.SalesNavigator.Modules.AccountModule', [_Module], {
  init: function init() {},
  loadViews: function loadViews() {},
  loadCustomizations: function loadCustomizations() {
    const am = this.applicationModule;

    am.registerCustomization('detail', 'account_detail', {
      at: function at(row) {
        return row.name === 'RelatedItemsSection';
      },
      type: 'insert',
      where: 'before',
      value: {
        title: resource.salesNavigator,
        list: true,
        name: 'SalesNavigatorSection',
        enableOffline: false,
        children: [{
          name: 'AccountSalesNavigator',
          relatedView: {
            widgetType: AccountWidget.prototype.id,
            id: AccountWidget.prototype.id,
          },
        }],
      },
    });
  },
  loadToolbars: function loadToolbars() {},
});

export default __class;
