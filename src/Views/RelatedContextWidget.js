/*
 * See copyright file.
 */


define('crm/Views/RelatedContextWidget', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/aspect',
    'dojo/dom-construct',
    'argos/RelatedViewManager',
    'argos/_RelatedViewWidgetBase'
], function(
    declare,
    lang,
    aspect,
    domConstruct,
    RelatedViewManager,
    _RelatedViewWidgetBase
) {
    var rvm, __class;
    __class = declare('crm.Views.RelatedContextWidget', [_RelatedViewWidgetBase], {

        cls: 'related-context-widget',
        contextCls: null,
        contextWrapperTemplate: new Simplate([
         '<div class="context-snapshot {%: $$.contextCls %}"></div>'
        ]),
        onInit: function() {
            var self = this;
            this.onLoad();
            if (this.owner) {
                aspect.after(this.owner, 'show', function() {
                    self.onRefreshView();
                });
            }
        },
        onLoad: function() {
            var snapShot = this.getContextSnapShot();
            if (snapShot) {
                this.processSnapShot(snapShot);
            }
        },
        getContextSnapShot: function() {
            var ctx, snapShot;
            if ((this.owner) && (this.owner.options) && (this.owner.options.fromContext)) {
                ctx = this.owner.options.fromContext;
                snapShot = ctx.getContextSnapShot(this.owner.options);
            }
            return snapShot;
        },
        processSnapShot: function(snapShot) {
            var wrapper;
            if (this.containerNode && snapShot) {
                wrapper = domConstruct.toDom(this.contextWrapperTemplate.apply(this));
                domConstruct.place(snapShot, wrapper, 'last');
                domConstruct.place(wrapper, this.containerNode, 'last');
            }
        },
        onRefreshView: function() {
            var node;
            if (this.containerNode) {
                node = domConstruct.toDom('<div></div>');
                domConstruct.place(node, this.containerNode, 'only');
                this.onLoad();
            }
        }
    });
    rvm = new RelatedViewManager();
    rvm.registerType('relatedContext', __class);
    return __class;
});
