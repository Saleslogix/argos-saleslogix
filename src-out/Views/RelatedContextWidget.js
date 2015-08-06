define('crm/Views/RelatedContextWidget', ['exports', 'module', 'dojo/_base/declare', 'dojo/aspect', 'dojo/dom-construct', 'argos/RelatedViewManager', 'argos/_RelatedViewWidgetBase'], function (exports, module, _dojo_baseDeclare, _dojoAspect, _dojoDomConstruct, _argosRelatedViewManager, _argos_RelatedViewWidgetBase) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _aspect = _interopRequireDefault(_dojoAspect);

  var _domConstruct = _interopRequireDefault(_dojoDomConstruct);

  var _RelatedViewManager = _interopRequireDefault(_argosRelatedViewManager);

  var _RelatedViewWidgetBase2 = _interopRequireDefault(_argos_RelatedViewWidgetBase);

  var __class = (0, _declare['default'])('crm.Views.RelatedContextWidget', [_RelatedViewWidgetBase2['default']], {

    cls: 'related-context-widget',
    contextCls: null,
    contextWrapperTemplate: new Simplate(['<div class="context-snapshot {%: $$.contextCls %}"></div>']),
    onInit: function onInit() {
      var self = this;
      this.onLoad();
      if (this.owner) {
        _aspect['default'].after(this.owner, 'show', function after() {
          self.onRefreshView();
        });
      }
    },
    onLoad: function onLoad() {
      var snapShot = this.getContextSnapShot();
      if (snapShot) {
        this.processSnapShot(snapShot);
      }
    },
    getContextSnapShot: function getContextSnapShot() {
      var snapShot = undefined;
      if (this.owner && this.owner.options && this.owner.options.fromContext) {
        var ctx = this.owner.options.fromContext;
        snapShot = ctx.getContextSnapShot(this.owner.options);
      }
      return snapShot;
    },
    processSnapShot: function processSnapShot(snapShot) {
      if (this.containerNode && snapShot) {
        var wrapper = _domConstruct['default'].toDom(this.contextWrapperTemplate.apply(this));
        _domConstruct['default'].place(snapShot, wrapper, 'last');
        _domConstruct['default'].place(wrapper, this.containerNode, 'last');
      }
    },
    onRefreshView: function onRefreshView() {
      if (this.containerNode) {
        var node = _domConstruct['default'].toDom('<div></div>');
        _domConstruct['default'].place(node, this.containerNode, 'only');
        this.onLoad();
      }
    }
  });
  var rvm = new _RelatedViewManager['default']();
  rvm.registerType('relatedContext', __class);
  module.exports = __class;
});
