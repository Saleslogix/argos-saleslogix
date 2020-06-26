define("crm/Integrations/BOE/Models/ErpShipmentItem/SData", ["exports", "dojo/_base/declare", "dojo/_base/lang", "./Base", "argos/Models/_SDataModelBase", "argos/Models/Manager", "argos/Models/Types", "../Names"], function (_exports, _declare, _lang, _Base, _SDataModelBase2, _Manager, _Types, _Names) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _Base = _interopRequireDefault(_Base);
  _SDataModelBase2 = _interopRequireDefault(_SDataModelBase2);
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
  var __class = (0, _declare["default"])('crm.Integrations.BOE.Models.ErpShipmentItem.SData', [_Base["default"], _SDataModelBase2["default"]], {
    id: 'erpshipmentitem_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'CreateDate desc',
        querySelect: ['ErpLineNumber', 'ErpShipment/ErpExtId', 'ProductName', 'ErpShippedQuantity', 'ErpShippedUOM', 'SalesOrder/SalesOrderNumber']
      }, {
        name: 'detail',
        querySelect: ['Description', 'ErpLineNumber', 'ErpShipment/ErpExtId', 'SalesOrder/SalesOrderNumber', 'ProductName', 'ErpShippedQuantity', 'ErpOrderQuantity', 'ErpBackOrderedQuantity', 'ErpBackOrderedUOM', 'ErpShippedUOM', 'ErpUPCId', 'ErpOrderUOM'],
        queryInclude: ['$permissions']
      }];
    }
  });

  _Manager["default"].register(_Names["default"].ERPSHIPMENTITEM, _Types["default"].SDATA, __class);

  _lang["default"].setObject('icboe.Models.ErpShipmentItem.SData', __class);

  var _default = __class;
  _exports["default"] = _default;
});