define('crm/Integrations/BOE/Modules/ReceivableModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './_Module', '../Views/ERPReceivables/Detail', '../Views/ERPReceivables/List', '../Views/ERPReceivableItems/List', '../Models/ErpReceivable/Offline', '../Models/ErpReceivable/SData'], function (module, exports, _declare, _lang, _Module2, _Detail, _List, _List3) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Module3 = _interopRequireDefault(_Module2);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _List2 = _interopRequireDefault(_List);

  var _List4 = _interopRequireDefault(_List3);

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

  const __class = (0, _declare2.default)('crm.Integrations.BOE.Modules.ReceivableModule', [_Module3.default], {
    defaultViews: ['erpreceivables_list'],
    init: function init() {},
    loadViews: function loadViews() {
      const am = this.applicationModule;

      am.registerView(new _Detail2.default());
      am.registerView(new _List2.default({
        expose: true
      }));

      am.registerView(new _List4.default({
        id: 'erpreceivable_items_related',
        expose: false
      }));
    },
    loadCustomizations: function loadCustomizations() {
      const am = this.applicationModule;

      am.registerCustomization('detail/tools', 'erpreceivables_detail', {
        at: function at(tool) {
          return tool.id === 'edit';
        },
        type: 'remove'
      });

      am.registerCustomization('list/tools', 'erpreceivables_list', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });

      am.registerCustomization('list/tools', 'erpreceivable_items_related', {
        at: function at(tool) {
          return tool.id === 'new';
        },
        type: 'remove'
      });

      am.registerCustomization('detail/tools', 'erpreceivable_items_detail', {
        at: function at(tool) {
          return tool.id === 'edit';
        },
        type: 'remove'
      });
    },
    loadToolbars: function loadToolbars() {}
  });

  _lang2.default.setObject('icboe.Modules.ReceivableModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});