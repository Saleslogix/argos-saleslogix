import declare from 'dojo/_base/declare';
import aspect from 'dojo/aspect';
import RelatedViewManager from 'argos/RelatedViewManager';
import _RelatedViewWidgetBase from 'argos/_RelatedViewWidgetBase';


const __class = declare('crm.Views.RelatedContextWidget', [_RelatedViewWidgetBase], {

  cls: 'related-context-widget',
  contextCls: null,
  contextWrapperTemplate: new Simplate([
    '<div class="context-snapshot {%: $$.contextCls %}"></div>',
  ]),
  onInit: function onInit() {
    const self = this;
    this.onLoad();
    if (this.owner) {
      aspect.after(this.owner, 'show', () => {
        self.onRefreshView();
      });
    }
  },
  onLoad: function onLoad() {
    const snapShot = this.getContextSnapShot();
    if (snapShot) {
      this.processSnapShot(snapShot);
    }
  },
  getContextSnapShot: function getContextSnapShot() {
    let snapShot;
    if ((this.owner) && (this.owner.options) && (this.owner.options.fromContext)) {
      const ctx = this.owner.options.fromContext;
      snapShot = ctx.getContextSnapShot(this.owner.options);
    }
    return snapShot;
  },
  processSnapShot: function processSnapShot(snapShot) {
    if (this.containerNode && snapShot) {
      const wrapper = $(this.contextWrapperTemplate.apply(this));
      $(wrapper).append(snapShot);
      $(this.containerNode).append(wrapper);
    }
  },
  onRefreshView: function onRefreshView() {
    if (this.containerNode) {
      const node = $('<div></div>');
      $(this.containerNode).empty().append(node);
      this.onLoad();
    }
  },
});
const rvm = new RelatedViewManager();
rvm.registerType('relatedContext', __class);
export default __class;
