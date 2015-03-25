/*
 * See copyright file.
 */


define('crm/Views/RelatedContextWidget', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/event',
    'dojo/on',
    'dojo/string',
    'dojo/dom-class',
    'dojo/when',
    'dojo/_base/Deferred',
    'dojo/dom-construct',
    'dojo/query',
    'dojo/dom-attr',
    'dojo/_base/connect',
    'dojo/_base/array',
    'argos/Utility',
    'argos/Format',
    'argos/RelatedViewManager',
    'argos/_RelatedViewWidgetBase',
    'crm/Action',
    'argos/_ActionMixin'
], function(
    declare,
    lang,
    event,
    on,
    string,
    domClass,
    when,
    Deferred,
    domConstruct,
    query,
    domAttr,
    connect,
    array,
    utility,
    format,
    RelatedViewManager,
    _RelatedViewWidgetBase,
    action,
    _ActionMixin
) {
    var __class = declare('crm.Views.RelatedContextWidget', [_RelatedViewWidgetBase, _ActionMixin], {
        onInit: function(options) {
            this._isInitLoad = true;
            this.inherited(arguments);
        },
        onLoad: function() {

            if (!this.loadingNode) {
                this.loadingNode = domConstruct.toDom(this.loadingTemplate.apply(this));
                //domConstruct.place(this.loadingNode, this.containerNode, 'last', this);
            }

            var snapShot = this.getContextSnapShot();
            if (snapShot) {
                this.processSnapShot(snapShot);
            }

           // domClass.toggle(this.loadingNode, 'loading');
        },
        getContextSnapShot: function() {
            var ctx, snapShot;
            if ((this.owner) && (this.owner.options) && (this.owner.options.fromContext)) {
                ctx = this.owner.options.fromContext;
                snapShot = ctx.getContextSnapShot(this.owner.options.key);
            }

            return snapShot;
        },
        processSnapShot: function(snapShot) {
            if (snapShot) {
                domConstruct.place(snapShot, this.containerNode, 'last');
            }
        }
    });
    var rvm = new RelatedViewManager();
    rvm.registerType('relatedContext', __class);
    return __class;
});
