define("crm/Integrations/BOE/Models/ErpShipTo/Base", ["exports", "dojo/_base/declare", "dojo/_base/lang", "argos/Models/_ModelBase", "../Names", "argos/I18n"], function (_exports, _declare, _lang, _ModelBase2, _Names, _I18n) {
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
  var resource = (0, _I18n["default"])('erpShipToModel'); // const accountResource = getResource('accountModel');
  // const billtoResource = getResource('erpBillToModel');

  var quoteResource = (0, _I18n["default"])('quoteModel');
  var salesorderResource = (0, _I18n["default"])('salesOrderModel');
  var receivableResource = (0, _I18n["default"])('erpReceivableModel');
  var invoiceResource = (0, _I18n["default"])('erpInvoiceModel');
  var returnResource = (0, _I18n["default"])('returnModel');
  var syncresultResource = (0, _I18n["default"])('syncResultModel');

  var __class = (0, _declare["default"])('crm.Integrations.BOE.Models.ErpShipTo.Base', [_ModelBase2["default"]], {
    contractName: 'dynamic',
    resourceKind: 'erpShipTos',
    entityName: 'ERPShipTo',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    modelName: _Names["default"].ERPSHIPTO,
    iconClass: '',
    detailViewId: '',
    listViewId: 'erpShipto_list',
    editViewId: 'erpShipto_detail',
    createPicklists: function createPicklists() {
      return this.picklists || (this.picklists = [{
        name: 'SyncStatus',
        property: 'SyncStatus'
      }]);
    },
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = [// TODO: Update when ManyToMany relationship is supported
      // {
      //   name: 'Account',
      //   displayName: accountResource.entityDisplayName,
      //   type: 'ManyToMany',
      //   relatedEntity: 'Account',
      //   relatedProperty: 'ErpBillToAccounts.ErpBillTo',
      //   relatedPropertyType: 'object',
      // }, {
      //   name: 'BillTo',
      //   displayName: billtoResource.entityDisplayName,
      //   type: 'ManyToMany',
      //   relatedEntity: 'ERPBillTo',
      //   relatedProperty: 'ErpBillToShipTos.ErpShipTo',
      //   relatedPropertyType: 'object',
      // },
      {
        name: 'Quote',
        displayName: quoteResource.entityDisplayName,
        type: 'OneToMany',
        relatedEntity: 'Quote',
        relatedProperty: 'ShipTo',
        relatedPropertyType: 'object'
      }, {
        name: 'SalesOrder',
        displayName: salesorderResource.entityDisplayName,
        type: 'OneToMany',
        relatedEntity: 'SalesOrder',
        relatedProperty: 'ErpShipTo',
        relatedPropertyType: 'object'
      }, {
        name: 'Receivables',
        displayName: receivableResource.entityDisplayName,
        type: 'OneToMany',
        relatedEntity: 'ERPReceivable',
        relatedProperty: 'ErpShipTo',
        relatedPropertyType: 'object'
      }, {
        name: 'Invoice',
        displayName: invoiceResource.entityDisplayName,
        type: 'ManyToOne',
        relatedEntity: 'ERPInvoice',
        relatedProperty: 'ErpShipTo',
        relatedPropertyType: 'object'
      }, {
        name: 'Return',
        displayName: returnResource.entityDisplayName,
        type: 'ManyToOne',
        relatedEntity: 'Return',
        relatedProperty: 'ErpShipTo',
        relatedPropertyType: 'object'
      }, {
        name: 'SyncHistory',
        displayName: syncresultResource.entityDisplayName,
        type: 'OneToMany',
        relatedEntity: 'SyncResult',
        relatedProperty: 'EntityId',
        where: 'EntityType eq "ERPShipTo"'
      }]);
      return rel;
    }
  });

  _lang["default"].setObject('icboe.Models.ErpShipTo.Base', __class);

  var _default = __class;
  _exports["default"] = _default;
});