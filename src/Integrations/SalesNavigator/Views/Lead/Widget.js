/*
* See copyright file.
*/
import declare from 'dojo/_base/declare';
import RelatedViewManager from 'argos/RelatedViewManager';
import _WidgetBase from '../../_WidgetBase';
import { getSalesNavigatorUrl } from '../../SalesNavigatorService';

const __class = declare('crm.Integrations.SalesNavigator.LeadWidget', [_WidgetBase], {
  id: 'sales_navigator_lead',
  type: 'leads',
  initSalesNavigator: function initSalesNavigator(entry) {
    const script = this.createEmptyScript();
    getSalesNavigatorUrl(this.type, entry).then((result) => {
      script.src = result;
      this.applyScript(script);
    });
  },
});

const rvm = new RelatedViewManager();
rvm.registerType(__class.prototype.id, __class);
export default __class;
