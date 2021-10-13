define('crm/Views/MainToolbar', ['module', 'exports', 'dojo/_base/declare', 'dojo/has', 'argos/MainToolbar', 'argos/I18n'], function (module, exports, _declare, _has, _MainToolbar, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _has2 = _interopRequireDefault(_has);

  var _MainToolbar2 = _interopRequireDefault(_MainToolbar);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /* Copyright 2017 Infor
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const resource = (0, _I18n2.default)('mainToolbar');

  const __class = (0, _declare2.default)('crm.Views.MainToolbar', [_MainToolbar2.default], {
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
            scope: this
          }]);
        }
      }

      this.inherited(showTools, arguments);
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
        if ((0, _has2.default)('android')) {
          // Hack to work around https://code.google.com/p/android/issues/detail?id=19625
          $(scrollerNode).css('overflow', 'hidden');
          scrollerNode.scrollTop = 0;
          $(scrollerNode).css('overflow', 'auto');
        } else {
          scrollerNode.scrollTop = 0;
        }
      }
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});