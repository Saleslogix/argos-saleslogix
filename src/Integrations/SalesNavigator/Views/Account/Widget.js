/*
* See copyright file.
*/
import declare from 'dojo/_base/declare';
import RelatedViewManager from 'argos/RelatedViewManager';
import _WidgetBase from '../../_WidgetBase';
import SalesNavigatorUri from '../../SalesNavigatorUri';
import WidgetTypes from '../../WidgetTypes';

const __class = declare('crm.Integrations.SalesNavigator.AccountWidget', [_WidgetBase], {
  id: 'sales_navigator_account',
  initSalesNavigator: function initSalesNavigator(entry, container, applyScript) {
    const {
      accounts: {
        // isResponsive,
        smallWidgetType,
      },
    } = App.salesNavigatorSettings;
    const height = WidgetTypes[smallWidgetType].height.minimum;

    // Use this function in the responsive listener
    // const size = getSizeFromWidthAndPreference(WidgetTypes.simple.width.minimum, smallWidgetType);

    const script = this.createEmptyScript().asJavascript();
    script.src = new SalesNavigatorUri()
      .asAccount()
      .setCompanyName(entry.AccountName)
      .setCompanyWebsite(entry.WebAddress)
      .setHeight(height)
      .toString();

    applyScript(script);
  },
});

const rvm = new RelatedViewManager();
rvm.registerType(__class.prototype.id, __class);
export default __class;
