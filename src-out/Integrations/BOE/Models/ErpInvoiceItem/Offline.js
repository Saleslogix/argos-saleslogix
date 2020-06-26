define("crm/Integrations/BOE/Models/ErpInvoiceItem/Offline", ["exports", "dojo/_base/declare", "./Base", "argos/Models/_OfflineModelBase", "argos/Models/Manager", "argos/Models/Types", "../Names"], function (_exports, _declare, _Base, _OfflineModelBase2, _Manager, _Types, _Names) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _Base = _interopRequireDefault(_Base);
  _OfflineModelBase2 = _interopRequireDefault(_OfflineModelBase2);
  _Manager = _interopRequireDefault(_Manager);
  _Types = _interopRequireDefault(_Types);
  _Names = _interopRequireDefault(_Names);

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
  var __class = (0, _declare["default"])('crm.Integrations.BOE.Models.ErpInvoiceItem.Offline', [_Base["default"], _OfflineModelBase2["default"]], {
    id: 'erpinvoiceitem_offline_model'
  });

  _Manager["default"].register(_Names["default"].ERPINVOICEITEM, _Types["default"].OFFLINE, __class);

  var _default = __class;
  _exports["default"] = _default;
});