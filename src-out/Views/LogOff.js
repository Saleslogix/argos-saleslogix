define('crm/Views/LogOff', ['module', 'exports', 'dojo/_base/declare', 'argos/View', 'argos/I18n'], function (module, exports, _declare, _View, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _View2 = _interopRequireDefault(_View);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('logOff'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Views.LogOff', [_View2.default], {
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

  exports.default = __class;
  module.exports = exports['default'];
});