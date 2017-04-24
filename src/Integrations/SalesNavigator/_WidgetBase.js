/*
* See copyright file.
*/
import declare from 'dojo/_base/declare';
import RelatedViewManager from 'argos/RelatedViewManager';
import _RelatedViewWidgetBase from 'argos/_RelatedViewWidgetBase';
import {
  createEmptyScript as serviceScriptCreate,
  getSizeFromWidthAndPreference,
} from './SalesNavigatorService';

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
    '<div class="salesnavigator__container" style="margin-left: calc(-1 * ((100vw - 100%) / 2));" data-dojo-attach-point="scriptContainerNode"></div>',
  ]),

  applyScript: function applyScript(script) {
    $(this.container).append(script);
  },
  onLoad: function onLoad() {
    this.entry = this.parentEntry;
    this.container = this.scriptContainerNode;

    this.getSettings()
      .setSize(this.container.offsetWidth)
      .setupResponsiveListener();

    this.initSalesNavigator(this.entry);
  },
  initSalesNavigator: function initSalesNavigator() {},
  createEmptyScript: function createEmptyScript() {
    return serviceScriptCreate();
  },
  handleResize: function handleResize() {
    const tempSize = getSizeFromWidthAndPreference(this.container.offsetWidth, this.smallWidgetType);
    if (tempSize.width !== this.size.width) {
      this.redraw();
    }
  },
  getSettings: function getSettings() {
    const settings = App.salesNavigatorSettings[this.type];
    if (settings) {
      this.isResponsive = settings.isResponsive;
      this.smallWidgetType = settings.smallWidgetType;
    }
    return this;
  },
  setSize: function setSize(width) {
    this.size = getSizeFromWidthAndPreference(width, this.smallWidgetType);
    return this;
  },
  setupResponsiveListener: function setupResponsiveListener() {
    if (this.isResponsive) {
      window.addEventListener('resize', this.handleResize.bind(this));
    }
    return this;
  },
  redraw: function redraw() {
    $(this.container).empty();
    this.setSize(this.container.offsetWidth)
      .initSalesNavigator(this.entry, this.container, this.applyScript);
  },
  destroy: function destroy() {
    window.removeEventListener('resize', this.handleResize);
    this.inherited(arguments);
  },
});

const rvm = new RelatedViewManager();
rvm.registerType('sales_navigator_base', __class);
export default __class;
