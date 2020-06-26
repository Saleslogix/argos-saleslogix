define("crm/Views/UpdateToolbar", ["exports", "dojo/_base/declare", "argos/MainToolbar", "argos/I18n"], function (_exports, _declare, _MainToolbar, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
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
  var resource = (0, _I18n["default"])('updateToolbar');

  var __class = (0, _declare["default"])('crm.Views.UpdateToolbar', [_MainToolbar["default"]], {
    widgetTemplate: new Simplate(['<div class="update-toolbar">', '<h1 data-action="reload">{%= $.updateText %}</h1>', '</div>']),
    updateText: resource.updateText,
    managed: false,
    show: function show() {
      $('body').addClass('update-available');
      this.showTools([{
        id: 'cancel',
        side: 'right',
        fn: this.cancel,
        scope: this
      }]);
      this.inherited(show, arguments);
    },
    showTools: function showTools() {
      this.inherited(showTools, arguments);
    },
    hide: function hide() {
      $('body').removeClass('update-available');
    },
    reload: function reload() {
      App.reload();
    },
    cancel: function cancel() {
      this.hide();
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});