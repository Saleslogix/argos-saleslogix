/*
* See copyright file.
*/
import declare from 'dojo/_base/declare';
import RelatedViewManager from 'argos/RelatedViewManager';
import _WidgetBase from '../../_WidgetBase';
import SalesNavigatorUri from '../../SalesNavigatorUri';

const __class = declare('crm.Integrations.SalesNavigator.AccountWidget', [_WidgetBase], {
  id: 'sales_navigator_account',
  type: 'accounts',

  initSalesNavigator: function initSalesNavigator(entry) {
    const script = this.createEmptyScript().asJavascript();
    script.src = new SalesNavigatorUri()
      .asAccount()
      .setCompanyName(entry.AccountName)
      .setCompanyWebsite(entry.WebAddress)
      .setRecordId(entry.$key)
      .setHeight(this.size.height)
      .setWidth(this.size.width)
      .toString();

    this.applyScript(script);
  },
});

const rvm = new RelatedViewManager();
rvm.registerType(__class.prototype.id, __class);
export default __class;
