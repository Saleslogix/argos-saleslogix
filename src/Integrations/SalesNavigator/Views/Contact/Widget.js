/*
* See copyright file.
*/
import declare from 'dojo/_base/declare';
import RelatedViewManager from 'argos/RelatedViewManager';
import _WidgetBase from '../../_WidgetBase';
import SalesNavigatorUri from '../../SalesNavigatorUri';
import { getSizeFromWidthAndPreference } from '../../SalesNavigatorService';
// import WidgetTypes from '../../WidgetTypes';

const __class = declare('crm.Integrations.SalesNavigator.ContactWidget', [_WidgetBase], {
  id: 'sales_navigator_contact',
  initSalesNavigator: function initSalesNavigator(entry, container, applyScript) {
    const {
      contacts: {
        // isResponsive,
        smallWidgetType,
      },
    } = App.salesNavigatorSettings;
    // const height = WidgetTypes[smallWidgetType].height.minimum;

    // Use this function in the responsive listener
    const size = getSizeFromWidthAndPreference(container.offsetWidth, smallWidgetType);

    const script = this.createEmptyScript().asJavascript();
    script.src = new SalesNavigatorUri()
      .asLead()
      // .setRecordId(entry.$key)
      .setFirstName(entry.FirstName)
      .setLastName(entry.LastName)
      .setEmail(entry.Email)
      .setCompanyName(entry.AccountName)
      .setCompanyWebsite(entry.WebAddress)
      .setHeight(size.height)
      .setWidth(size.width)
      .toString();

    applyScript(script);
  },
});

const rvm = new RelatedViewManager();
rvm.registerType(__class.prototype.id, __class);
export default __class;
