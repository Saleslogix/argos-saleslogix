define("crm/Integrations/BOE/Modules/ShipmentLineModule", ["exports", "dojo/_base/declare", "dojo/_base/lang", "./_Module", "../Views/ERPShipmentItems/Detail", "../Models/ErpShipmentItem/Offline", "../Models/ErpShipmentItem/SData"], function (_exports, _declare, _lang, _Module2, _Detail, _Offline, _SData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _Module2 = _interopRequireDefault(_Module2);
  _Detail = _interopRequireDefault(_Detail);

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
  var __class = (0, _declare["default"])('crm.Integrations.BOE.Modules.ShipmentLineModule', [_Module2["default"]], {
    init: function init() {},
    loadViews: function loadViews() {
      var am = this.applicationModule;
      am.registerView(new _Detail["default"]());
    },
    loadCustomizations: function loadCustomizations() {
      var am = this.applicationModule;
      am.registerCustomization('detail/tools', 'erpshipment_items_detail', {
        at: function at(tool) {
          return tool.id === 'edit';
        },
        type: 'remove'
      });
    },
    loadToolbars: function loadToolbars() {}
  });

  _lang["default"].setObject('icboe.Modules.ShipmentLineModule', __class);

  var _default = __class;
  _exports["default"] = _default;
});