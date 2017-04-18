import declare from 'dojo/_base/declare';
import getResource from 'argos/I18n';
import AccountDetailView from 'crm/Views/Account/Detail';
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
        cls: 'sales_navigator_section',
        list: false,
        name: 'SalesNavigatorSection',
        enableOffline: false,
        children: [{
          name: 'AccountSalesNavigator',
          enableOffline: false,
          relatedView: {
            widgetType: AccountWidget.prototype.id,
            id: AccountWidget.prototype.id,
          },
        }],
      },
    });

    const { onTransitionAway } = AccountDetailView.prototype;
    AccountDetailView.prototype.onTransitionAway = function salesOnTransitionAway(...args) {
      if (this.relatedViewManagers) {
        const relatedView = this.relatedViewManagers[this.getRelatedViewId(AccountWidget.prototype)];
        if (relatedView) {
          relatedView.destroyViews();
          this.refreshRequired = true;
        }
      }
      onTransitionAway.apply(this, args);
    };
  },
  loadToolbars: function loadToolbars() {},
});

export default __class;
