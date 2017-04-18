import declare from 'dojo/_base/declare';
import getResource from 'argos/I18n';
import LeadDetailView from 'crm/Views/Lead/Detail';
import _Module from './_Module';
import LeadWidget from '../Views/Lead/Widget';

const resource = getResource('salesNavigator');

const __class = declare('crm.Integrations.SalesNavigator.Modules.LeadModule', [_Module], {
  init: function init() {},
  loadViews: function loadViews() {},
  loadCustomizations: function loadCustomizations() {
    const am = this.applicationModule;

    am.registerCustomization('detail', 'lead_detail', {
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
          name: 'LeadSalesNavigator',
          enableOffline: false,
          relatedView: {
            widgetType: LeadWidget.prototype.id,
            id: LeadWidget.prototype.id,
          },
        }],
      },
    });

    const { onTransitionAway } = LeadDetailView.prototype;
    LeadDetailView.prototype.onTransitionAway = function salesOnTransitionAway(...args) {
      if (this.relatedViewManagers) {
        const relatedView = this.relatedViewManagers[this.getRelatedViewId(LeadWidget.prototype)];
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
