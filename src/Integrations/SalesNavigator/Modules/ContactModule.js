import declare from 'dojo/_base/declare';
import getResource from 'argos/I18n';
import _Module from './_Module';
import ContactWidget from '../Views/Contact/Widget';

const resource = getResource('salesNavigator');

const __class = declare('crm.Integrations.SalesNavigator.Modules.ContactModule', [_Module], {
  init: function init() {},
  loadViews: function loadViews() {},
  loadCustomizations: function loadCustomizations() {
    const am = this.applicationModule;

    am.registerCustomization('detail', 'contact_detail', {
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
          name: 'ContactSalesNavigator',
          enableOffline: false,
          relatedView: {
            widgetType: ContactWidget.prototype.id,
            id: ContactWidget.prototype.id,
          },
        }],
      },
    });
  },
  loadToolbars: function loadToolbars() {},
});

export default __class;
