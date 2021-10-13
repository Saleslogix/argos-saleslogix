define('crm/Integrations/BOE/Modules/_Module', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang'], function (module, exports, _declare, _lang) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Modules._Module', null, {
    applicationModule: null,
    defaultViews: null,
    constructor: function constructor(applicationModule) {
      this.applicationModule = applicationModule;
    },
    init: function init() {},
    initDynamic: function initDynamic() {},
    loadViews: function loadViews() {},
    loadCustomizations: function loadCustomizations() {},
    loadToolbars: function loadToolbars() {},
    registerDefaultViews: function registerDefaultViews(views) {
      if (this.defaultViews && views) {
        this.defaultViews.forEach(function (defaultView) {
          var idx = views.indexOf(defaultView);
          if (idx === -1) {
            views.push(defaultView);
          }
        });
      }
    }
  });

  _lang2.default.setObject('icboe.Modules._Module', __class);
  exports.default = __class;
  module.exports = exports['default'];
});