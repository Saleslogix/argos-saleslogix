define('crm/Views/MainToolbar', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/dom-style', 'dojo/has', 'argos/MainToolbar'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoDomStyle, _dojoHas, _argosMainToolbar) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _domStyle = _interopRequireDefault(_dojoDomStyle);

  var _has = _interopRequireDefault(_dojoHas);

  var _MainToolbar = _interopRequireDefault(_argosMainToolbar);

  /**
   * @class crm.Views.MainToolbar
   *
   *
   * @extends argos.MainToolbar
   *
   */
  var __class = (0, _declare['default'])('crm.Views.MainToolbar', [_MainToolbar['default']], {
    showTools: function showTools(tools) {
      var hasLeftDrawer = undefined;
      var isOnEdit = undefined;
      var isOnFirstView = App.isOnFirstView();

      if (tools) {
        for (var i = 0; i < tools.length; i++) {
          if (tools[i].id === 'toggleLeftDrawer') {
            hasLeftDrawer = true;
          }

          if (tools[i].id === 'back') {
            hasLeftDrawer = true;
          }

          if (tools[i].id === 'cancel') {
            isOnEdit = true;
          }
        }
      }

      if (tools !== false) {
        tools = tools || []; // eslint-disable-line

        if (!hasLeftDrawer) {
          tools.unshift({
            id: 'toggleLeftDrawer',
            'cls': 'fa fa-bars fa-fw fa-lg',
            side: 'left',
            fn: this.toggleLeftDrawer,
            scope: this
          });
        }

        if (!isOnEdit && !isOnFirstView) {
          tools = tools.concat([{ //eslint-disable-line
            id: 'back',
            cls: 'fa fa-angle-left fa-fw fa-lg',
            side: 'left',
            fn: this.navigateBack,
            scope: this
          }]);
        }
      }

      this.inherited(arguments);
    },
    navigateBack: function navigateBack() {
      ReUI.back();
    },
    navigateToHomeView: function navigateToHomeView() {
      App.navigateToHomeView();
    },
    toggleRightDrawer: function toggleRightDrawer() {
      this._toggleDrawer('right');
    },
    toggleLeftDrawer: function toggleLeftDrawer() {
      this._toggleDrawer('left');
    },
    onTitleClick: function onTitleClick() {
      var state = App.snapper && App.snapper.state();
      var view = App.getPrimaryActiveView();

      if (view && state && state.state === 'closed') {
        var scrollerNode = view.get('scroller');
        if ((0, _has['default'])('android')) {
          // Hack to work around https://code.google.com/p/android/issues/detail?id=19625
          _domStyle['default'].set(scrollerNode, 'overflow', 'hidden');
          scrollerNode.scrollTop = 0;
          _domStyle['default'].set(scrollerNode, 'overflow', 'auto');
        } else {
          scrollerNode.scrollTop = 0;
        }
      }
    },
    _toggleDrawer: function _toggleDrawer(state) {
      var snapperState = App.snapper.state();
      if (snapperState.state === state) {
        App.snapper.close();
      } else {
        App.snapper.open(state);
      }
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.MainToolbar', __class);
  module.exports = __class;
});
