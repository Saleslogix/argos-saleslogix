/*
* See copyright file.
*/
import declare from 'dojo/_base/declare';
import RelatedViewManager from 'argos/RelatedViewManager';
import _RelatedViewWidgetBase from 'argos/_RelatedViewWidgetBase';
import getResource from 'argos/I18n';

const resource = getResource('salesNavigatorWidgetBase');

/**
 * @class crm.Views._DashboardWidgetBase
 *
 *
 * @extends argos._RelatedViewWidgetBase
 *
 */
const __class = declare('crm.Integrations.SalesNavigator._WidgetBase', [_RelatedViewWidgetBase], {
  id: 'sales_navigator_base',
  titleText: resource.titleText,

  relatedContentTemplate: new Simplate([
    '<iframe data-dojo-attach-point="iframeNode"></iframe>',
  ]),

  onLoad: function onLoad() {
    const entry = this.parentEntry;
    const iframe = this.iframeNode;
    const applyScript = (script) => {
      iframe.contentWindow.document.body.appendChild(script);
    };
    iframe.onload = () => {
      this.initSalesNavigator(entry, iframe, applyScript);
    };
  },
  initSalesNavigator: function initSalesNavigator() {},
  createEmptyScript: function createEmptyScript() {
    const script = this.iframeNode.contentWindow.document.createElement('script');
    script.asJavascript = function asJavascript() {
      this.type = 'text/javascript';
      return this;
    };
    return script;
  },
});

const rvm = new RelatedViewManager();
rvm.registerType('sales_navigator_base', __class);
export default __class;
