/*
* See copyright file.
*/
import declare from 'dojo/_base/declare';
import RelatedViewManager from 'argos/RelatedViewManager';
import _RelatedViewWidgetBase from 'argos/_RelatedViewWidgetBase';
import { createEmptyScript as serviceScriptCreate } from './SalesNavigatorService';

/**
 * @class crm.Views._DashboardWidgetBase
 *
 *
 * @extends argos._RelatedViewWidgetBase
 *
 */
const __class = declare('crm.Integrations.SalesNavigator._WidgetBase', [_RelatedViewWidgetBase], {
  id: 'sales_navigator_base',

  // Have to have style inlined due to less compiling the result incorrectly for this value
  relatedContentTemplate: new Simplate([
    '<div class="salesnavigator__container" style="margin-left: calc(-1 * ((100vw - 100%) / 2));" data-dojo-attach-point="scriptContainerNode"></div>',
  ]),

  onLoad: function onLoad() {
    const entry = this.parentEntry;
    const container = this.scriptContainerNode;

    const applyScript = (script) => {
      $(container).append(script);
    };

    this.initSalesNavigator(entry, container, applyScript);
  },
  initSalesNavigator: function initSalesNavigator() {},
  createEmptyScript: function createEmptyScript() {
    return serviceScriptCreate();
  },
});

const rvm = new RelatedViewManager();
rvm.registerType('sales_navigator_base', __class);
export default __class;
