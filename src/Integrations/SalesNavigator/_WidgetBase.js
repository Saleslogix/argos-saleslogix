/*
* See copyright file.
*/
import declare from 'dojo/_base/declare';
import RelatedViewManager from 'argos/RelatedViewManager';
import _RelatedViewWidgetBase from 'argos/_RelatedViewWidgetBase';

/**
 * @class crm.Views._DashboardWidgetBase
 *
 *
 * @extends argos._RelatedViewWidgetBase
 *
 */
const __class = declare('crm.Integrations.SalesNavigator._WidgetBase', [_RelatedViewWidgetBase], {
  id: 'sales_navigator_base',
  currentState: null,
  container: null,
  entry: null,
  type: null,
  size: null,

  // Have to have style inlined due to less compiling the result incorrectly for this value
  relatedContentTemplate: new Simplate([
    '<div class="salesnavigator__container" data-dojo-attach-point="scriptContainerNode">',
    '<iframe class="salesnavigator-iframe" data-dojo-attach-point="iframeNode"/>',
    '</div>',
  ]),

  onLoad: function onLoad() {
    this.entry = this.parentEntry;
    this.container = this.scriptContainerNode;

    this.initSalesNavigator(this.entry);
  },
  initSalesNavigator: function initSalesNavigator() {},
});

const rvm = new RelatedViewManager();
rvm.registerType('sales_navigator_base', __class);
export default __class;
