import declare from 'dojo/_base/declare';
import _EditBase from 'argos/_EditBase';

/**
 * @class crm.Views.OfflineOptions.Edit
 *
 * @extends argos.Edit
 *
 */
const __class = declare('crm.Integrations.SalesNavigator.Settings.Configuration', [_EditBase], {
  // Localization
  titleText: 'Sales Navigator Configuration',
  // View Properties
  id: 'sales_navigator_configuration_edit',
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      label: 'Responsive Account Widget',
      name: 'AccountResponsive',
      property: 'AccountResponsive',
      type: 'boolean',
    }, {
      label: 'Small Account Widget Type',
      name: 'AccountSmallWidgetType',
      property: 'AccountSmallWidgetType',
      title: 'Small Account Widget Type',
      type: 'select',
      view: 'sales_navigator_small_widget_types',
    }, {
      label: 'Responsive Contact Widget',
      name: 'ContactResponsive',
      property: 'ContactResponsive',
      type: 'boolean',
    }, {
      label: 'Small Contact Widget Type',
      name: 'ContactSmallWidgetType',
      property: 'ContactSmallWidgetType',
      title: 'Small Contact Widget Type',
      type: 'select',
      view: 'sales_navigator_small_widget_types',
    }, {
      label: 'Responsive Lead Widget',
      name: 'LeadResponsive',
      property: 'LeadResponsive',
      type: 'boolean',
    }, {
      label: 'Small Lead Widget Type',
      name: 'LeadSmallWidgetType',
      property: 'LeadSmallWidgetType',
      title: 'Small Lead Widget Type',
      type: 'select',
      view: 'sales_navigator_small_widget_types',
    }]);
  },
  requestData: function requestData() {
    return new Promise(resolve => resolve());
  },
  onRefreshUpdate: function onRefreshUpdate() {
    this.requestData();
  },
});

export default __class;
