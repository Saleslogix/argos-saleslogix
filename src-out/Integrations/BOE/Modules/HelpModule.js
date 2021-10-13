define('crm/Integrations/BOE/Modules/HelpModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './_Module', 'argos/I18n'], function (module, exports, _declare, _lang, _Module2, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Module3 = _interopRequireDefault(_Module2);

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

  const resource = (0, _I18n2.default)('helpModule');

  const __class = (0, _declare2.default)('crm.Integrations.BOE.Modules.HelpModule', [_Module3.default], {
    sectionTitleText: resource.sectionTitleText,
    init: function init() {},
    loadViews: function loadViews() {},
    loadCustomizations: function loadCustomizations() {
      const am = this.applicationModule;
      const onHelpRowCreated = crm.Views.Help.prototype.onHelpRowCreated;
      am.registerCustomization('detail', 'help', {
        at: row => {
          return row.name === 'HelpSection';
        },
        type: 'insert',
        where: 'after',
        value: {
          title: this.sectionTitleText,
          name: 'BOEHelpSection',
          children: [{
            name: 'BOEHelp',
            devRoot: 'argos-icboe',
            baseUrl: 'help/locales/icboe',
            fileName: 'help.html',
            defaultUrl: 'help/locales/icboe/en/help.html',
            onCreate: onHelpRowCreated
          }]
        }
      });
    },
    loadToolbars: function loadToolbars() {}
  });

  _lang2.default.setObject('icboe.Modules.HelpModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});