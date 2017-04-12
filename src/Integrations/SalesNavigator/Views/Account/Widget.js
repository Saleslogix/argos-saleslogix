/*
* See copyright file.
*/
import declare from 'dojo/_base/declare';
import RelatedViewManager from 'argos/RelatedViewManager';
import _WidgetBase from '../../_WidgetBase';
import SalesNavigatorUri from '../../SalesNavigatorUri';

const __class = declare('crm.Integrations.SalesNavigator.AccountWidget', [_WidgetBase], {
  id: 'sales_navigator_base',
  initSalesNavigator: function initSalesNavigator(entry, container, applyScript) {
    const script = this.createEmptyScript().asJavascript();
    script.src = new SalesNavigatorUri()
      .asAccount()
      .setCompanyName(entry.AccountName)
      .setCompanyWebsite(entry.WebAddress)
      .toString();
    applyScript(script);
  },
});

const rvm = new RelatedViewManager();
rvm.registerType('sales_navigator_account', __class);
export default __class;
