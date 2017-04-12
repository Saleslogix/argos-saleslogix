import declare from 'dojo/_base/declare';
import _Module from './_Module';
import '../Views/Lead/Widget';

const __class = declare('crm.Integrations.SalesNavigator.Modules.LeadModule', [_Module], {
  init: function init() {
  },
  loadViews: function loadViews() {
    // const am = this.applicationModule;
  },
  loadCustomizations: function loadCustomizations() {
    const am = this.applicationModule;

    am.registerCustomization('detail', 'lead_detail', {
      at: function at(row) {
        return row.name === 'RelatedItemsSection';
      },
      type: 'insert',
      where: 'before',
      value: {
        title: 'Sales Navigator',
        list: true,
        name: 'SalesNavigatorSection',
        enableOffline: false,
        children: [{
          name: 'LeadSalesNavigator',
          relatedView: {
            widgetType: 'sales_navigator_lead',
            id: 'sales_navigator_lead',
          },
        }],
      },
    });
  },
  loadToolbars: function loadToolbars() {
  },
});

export default __class;
