define("crm/Integrations/BOE/Models/ErpShipmentItem/Base", ["exports", "dojo/_base/declare", "dojo/_base/lang", "argos/Models/_ModelBase", "../Names", "argos/I18n"], function (_exports, _declare, _lang, _ModelBase2, _Names, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _ModelBase2 = _interopRequireDefault(_ModelBase2);
  _Names = _interopRequireDefault(_Names);
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
  var resource = (0, _I18n["default"])('erpShipmentItemModel');
  var shipmentResource = (0, _I18n["default"])('erpShipmentModel');
  var salesOrderResource = (0, _I18n["default"])('salesOrderModel');

  var __class = (0, _declare["default"])('crm.Integrations.BOE.Models.ErpShipmentItem.Base', [_ModelBase2["default"]], {
    contractName: 'dynamic',
    resourceKind: 'erpShipmentItems',
    entityName: 'ERPShipmentItem',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    modelName: _Names["default"].ERPSHIPMENTITEM,
    iconClass: 'warehouse',
    detailViewId: 'erpshipment_items_detail',
    listViewId: 'erpshipment_items_list',
    editViewId: '',
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = [{
        name: 'Shipment',
        displayName: shipmentResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'ErpShipment',
        parentPropertyType: 'object',
        relatedEntity: 'ERPShipment'
      }, {
        name: 'SalesOrder',
        displayName: salesOrderResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'SalesOrder',
        parentPropertyType: 'object',
        relatedEntity: 'SalesOrder'
      }]);
      return rel;
    }
  });

  _lang["default"].setObject('icboe.Models.ErpShipmentItem.Base', __class);

  var _default = __class;
  _exports["default"] = _default;
});