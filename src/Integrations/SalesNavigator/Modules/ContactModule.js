import declare from 'dojo/_base/declare';
import _Module from './_Module';
import '../Views/Contact/Widget';

const __class = declare('crm.Integrations.SalesNavigator.Modules.ContactModule', [_Module], {
  init: function init() {
  },
  loadViews: function loadViews() {
    // const am = this.applicationModule;
  },
  loadCustomizations: function loadCustomizations() {
    const am = this.applicationModule;

    am.registerCustomization('detail', 'contact_detail', {
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
          name: 'ContactSalesNavigator',
          relatedView: {
            widgetType: 'sales_navigator_contact',
            id: 'sales_navigator_contact',
          },
        }],
      },
    });
  },
  loadToolbars: function loadToolbars() {
  },
});

export default __class;
