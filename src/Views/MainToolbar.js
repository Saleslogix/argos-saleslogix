import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import domStyle from 'dojo/dom-style';
import has from 'dojo/has';
import MainToolbar from 'argos/MainToolbar';

/**
 * @class crm.Views.MainToolbar
 *
 *
 * @extends argos.MainToolbar
 *
 */
const __class = declare('crm.Views.MainToolbar', [MainToolbar], {
  showTools: function showTools(tools) {
    let hasLeftDrawer;
    let isOnEdit;
    const isOnFirstView = App.isOnFirstView();

    if (tools) {
      for (let i = 0; i < tools.length; i++) {
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
          cls: 'fa fa-bars fa-fw fa-lg',
          side: 'left',
          fn: this.toggleLeftDrawer,
          scope: this,
        });
      }

      if (!isOnEdit && !isOnFirstView) {
        tools = tools.concat([{ //eslint-disable-line
          id: 'back',
          cls: 'fa fa-angle-left fa-fw fa-lg',
          side: 'left',
          fn: this.navigateBack,
          scope: this,
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
    const state = App.snapper && App.snapper.state();
    const view = App.getPrimaryActiveView();

    if (view && state && state.state === 'closed') {
      const scrollerNode = view.get('scroller');
      if (has('android')) {
        // Hack to work around https://code.google.com/p/android/issues/detail?id=19625
        domStyle.set(scrollerNode, 'overflow', 'hidden');
        scrollerNode.scrollTop = 0;
        domStyle.set(scrollerNode, 'overflow', 'auto');
      } else {
        scrollerNode.scrollTop = 0;
      }
    }
  },
  _toggleDrawer: function _toggleDrawer(state) {
    const snapperState = App.snapper.state();
    if (snapperState.state === state) {
      App.snapper.close();
    } else {
      App.snapper.open(state);
    }
  },
});

lang.setObject('Mobile.SalesLogix.Views.MainToolbar', __class);
export default __class;
