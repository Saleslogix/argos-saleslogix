/*
* See copyright file.
*/
import declare from 'dojo/_base/declare';
import RelatedViewManager from 'argos/RelatedViewManager';
import _WidgetBase from '../../_WidgetBase';
import SalesNavigatorUri from '../../SalesNavigatorUri';

const __class = declare('crm.Integrations.SalesNavigator.ContactWidget', [_WidgetBase], {
  id: 'sales_navigator_contact',
  type: 'contacts',

  initSalesNavigator: function initSalesNavigator(entry) {
    const script = this.createEmptyScript();
    script.src = new SalesNavigatorUri()
      .asLead()
      .setFirstName(entry.FirstName)
      .setLastName(entry.LastName)
      .setEmail(entry.Email)
      .setRecordId(entry.$key)
      .setCompanyName(entry.AccountName)
      .setCompanyWebsite(entry.WebAddress)
      .toString();

    this.applyScript(script);
  },
});

const rvm = new RelatedViewManager();
rvm.registerType(__class.prototype.id, __class);
export default __class;
