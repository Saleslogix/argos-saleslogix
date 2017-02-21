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
    let isOnEdit;
    const isOnFirstView = App.isOnFirstView();

    if (tools) {
      for (let i = 0; i < tools.length; i++) {
        if (tools[i].id === 'cancel') {
          isOnEdit = true;
        }
      }
    }

    if (tools !== false) {
      tools = tools || []; // eslint-disable-line

      if (!isOnEdit && !isOnFirstView) {
        tools = tools.concat([{ //eslint-disable-line
          id: 'back',
          svg: 'previous-page',
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
  onTitleClick: function onTitleClick() {
    const view = App.getPrimaryActiveView();

    if (view) {
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
});

lang.setObject('Mobile.SalesLogix.Views.MainToolbar', __class);
export default __class;
