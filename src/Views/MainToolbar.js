import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import has from 'dojo/has';
import MainToolbar from 'argos/MainToolbar';
import getResource from 'argos/I18n';

const resource = getResource('mainToolbar');

/**
 * @class crm.Views.MainToolbar
 *
 *
 * @extends argos.MainToolbar
 *
 */
const __class = declare('crm.Views.MainToolbar', [MainToolbar], {
  backTooltipText: resource.backTooltipText,

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
          title: this.backTooltipText,
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
        $(scrollerNode).css('overflow', 'hidden');
        scrollerNode.scrollTop = 0;
        $(scrollerNode).css('overflow', 'auto');
      } else {
        scrollerNode.scrollTop = 0;
      }
    }
  },
});

lang.setObject('Mobile.SalesLogix.Views.MainToolbar', __class);
export default __class;
