/*
* See copyright file.
*/
import declare from 'dojo/_base/declare';
import RelatedViewManager from 'argos/RelatedViewManager';
import _WidgetBase from '../../_WidgetBase';
import SalesNavigatorUri from '../../SalesNavigatorUri';
// import getResource from 'argos/I18n';

// const resource = getResource('salesNavigator');

/**
 * @class crm.Views._DashboardWidgetBase
 *
 *
 * @extends argos._RelatedViewWidgetBase
 *
 */
const __class = declare('crm.Integrations.SalesNavigator.ContactWidget', [_WidgetBase], {
  id: 'sales_navigator_base',
  initSalesNavigator: function initSalesNavigator(entry, iframe, applyScript) {
    const script = this.createEmptyScript().asJavascript();
    script.src = new SalesNavigatorUri().toString();
    applyScript(script);
  },
});

const rvm = new RelatedViewManager();
rvm.registerType('sales_navigator_contact', __class);
export default __class;
