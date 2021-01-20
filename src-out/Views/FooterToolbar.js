define('crm/Views/FooterToolbar', ['module', 'exports', 'dojo/_base/declare', 'argos/MainToolbar'], function (module, exports, _declare, _MainToolbar) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _MainToolbar2 = _interopRequireDefault(_MainToolbar);

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

  var __class = (0, _declare2.default)('crm.Views.FooterToolbar', [_MainToolbar2.default], {
    // Localization
    copyrightText: '',

    widgetTemplate: new Simplate(['<div class="footer-toolbar {%= $.cls %}">', '<hr />', '<div data-dojo-attach-point="contentNode"></div>', '<span data-dojo-attach-point="copyrightNode" class="copyright">{%= $.copyrightText %}</span>', '<span data-dojo-attach-point="version" class="copyright">{%= App.getVersionInfo() %}</span>', '</div>']),
    toolTemplate: new Simplate(['<button class="button toolButton toolButton-{%= $.side || "right" %} {%= $.cls %}" data-action="invokeTool" data-tool="{%= $.id %}">', '{% if ($.icon) { %}', '<img src="{%= $.icon %}" alt="{%= $.id %}" />', '{% } %}', '<span>{%: $.title %}</span>', '</button>']),
    attributeMap: {
      footerContents: {
        node: 'contentNode',
        type: 'innerHTML'
      }
    },
    showTools: function showTools(tools) {
      var contents = [];
      if (tools && tools.length <= 0 || tools !== false) {
        this.show();
      } else if (tools === false) {
        this.hide();
      }

      // skip parent implementation
      argos.MainToolbar.superclass.showTools.apply(this, arguments); // TODO: Avoid global

      if (tools) {
        for (var i = 0; i < tools.length; i++) {
          contents.push(this.toolTemplate.apply(tools[i]));
        }
        this.set('footerContents', contents.join(''));
      }
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});