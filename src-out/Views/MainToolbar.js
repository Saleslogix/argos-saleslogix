define("crm/Views/MainToolbar", ["exports", "dojo/_base/declare", "dojo/has", "argos/MainToolbar", "argos/I18n"], function (_exports, _declare, _has, _MainToolbar, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _has = _interopRequireDefault(_has);
  _MainToolbar = _interopRequireDefault(_MainToolbar);
  _I18n = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  var resource = (0, _I18n["default"])('mainToolbar');

  var __class = (0, _declare["default"])('crm.Views.MainToolbar', [_MainToolbar["default"]], {
    backTooltipText: resource.backTooltipText,
    showTools: function showTools(tools) {
      var isOnEdit;
      var isOnFirstView = App.isOnFirstView();

      if (tools) {
        for (var i = 0; i < tools.length; i++) {
          if (tools[i].id === 'cancel') {
            isOnEdit = true;
          }
        }
      }

      if (tools !== false) {
        tools = tools || []; // eslint-disable-line

        if (!isOnEdit && !isOnFirstView) {
          tools = tools.concat([{
            //eslint-disable-line
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
      var view = App.getPrimaryActiveView();

      if (view) {
        var scrollerNode = view.get('scroller');

        if ((0, _has["default"])('android')) {
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

  var _default = __class;
  _exports["default"] = _default;
});