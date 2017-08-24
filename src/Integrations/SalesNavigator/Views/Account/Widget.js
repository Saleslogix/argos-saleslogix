/*
* See copyright file.
*/
import declare from 'dojo/_base/declare';
import RelatedViewManager from 'argos/RelatedViewManager';
import _WidgetBase from '../../_WidgetBase';
import { getSalesNavigatorUrl } from '../../SalesNavigatorService';

const __class = declare('crm.Integrations.SalesNavigator.AccountWidget', [_WidgetBase], {
  id: 'sales_navigator_account',
  type: 'accounts',

  initSalesNavigator: function initSalesNavigator(entry) {
    getSalesNavigatorUrl(this.type, entry).then((result) => {
      this.iframeNode.contentWindow.location.replace(result);
    });
  },
});

const rvm = new RelatedViewManager();
rvm.registerType(__class.prototype.id, __class);
export default __class;
