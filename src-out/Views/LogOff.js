define("crm/Views/LogOff", ["exports", "dojo/_base/declare", "argos/View", "argos/I18n"], function (_exports, _declare, _View, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _View = _interopRequireDefault(_View);
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
  var resource = (0, _I18n["default"])('logOff');

  var __class = (0, _declare["default"])('crm.Views.LogOff', [_View["default"]], {
    // Templates
    widgetTemplate: new Simplate(['<div class="panel">', '<div class="wrapper">', '<div data-title="{%: $.titleText %}" class="signin {%= $.cls %}" hideBackButton="true">', '<p>{%= $.messageText %}</p>', '<p><a href="#" class="hyperlink" data-action="login">{%: $.loginText %}</a></p>', '</div>', '</div>', '</div>']),
    // Localization
    messageText: resource.messageText,
    loginText: resource.loginText,
    titleText: resource.titleText,
    id: 'logoff',
    login: function login() {
      window.location.reload();
    },
    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        bbar: false,
        tbar: false
      });
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});