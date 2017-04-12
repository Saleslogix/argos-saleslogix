import declare from 'dojo/_base/declare';
import getResource from 'argos/I18n';
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
        list: true,
        name: 'SalesNavigatorSection',
        enableOffline: false,
        children: [{
          name: 'LeadSalesNavigator',
          relatedView: {
            widgetType: LeadWidget.prototype.id,
            id: LeadWidget.prototype.id,
          },
        }],
      },
    });
  },
  loadToolbars: function loadToolbars() {},
});

export default __class;
