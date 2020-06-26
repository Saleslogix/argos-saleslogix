define("crm/Integrations/BOE/Models/SalesOrder/Base", ["exports", "dojo/_base/declare", "dojo/_base/lang", "argos/Models/_ModelBase", "../Names", "argos/I18n"], function (_exports, _declare, _lang, _ModelBase2, _Names, _I18n) {
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
  var resource = (0, _I18n["default"])('salesOrderModel');
  var accountResource = (0, _I18n["default"])('accountModel');
  var contactResource = (0, _I18n["default"])('contactModel');
  var orderItemsResource = (0, _I18n["default"])('salesOrderItemModel');
  var opportunityResource = (0, _I18n["default"])('opportunityModel');
  var quoteResource = (0, _I18n["default"])('quoteModel');
  var billtoResource = (0, _I18n["default"])('erpBillToModel');
  var shiptoResource = (0, _I18n["default"])('erpShipToModel');
  var syncresultResource = (0, _I18n["default"])('syncResultModel');
  var invoiceitemResource = (0, _I18n["default"])('erpInvoiceItemModel');
  var shipmentitemResource = (0, _I18n["default"])('erpShipmentItemModel');

  var __class = (0, _declare["default"])('crm.Integrations.BOE.Models.SalesOrder.Base', [_ModelBase2["default"]], {
    contractName: 'dynamic',
    resourceKind: 'salesOrders',
    entityName: 'SalesOrder',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    modelName: _Names["default"].SALESORDER,
    iconClass: 'cart',
    detailViewId: 'salesorder_detail',
    listViewId: 'salesorder_list',
    editViewId: 'salesorder_edit',
    createPicklists: function createPicklists() {
      return this.picklists || (this.picklists = [{
        name: 'SyncStatus',
        property: 'SyncStatus'
      }, {
        name: 'ErpSalesOrderStatus',
        property: 'ERPSalesOrder.ERPStatus'
      }]);
    },
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = [{
        name: 'Account',
        displayName: accountResource.entityDisplayNamePlural,
        type: 'ManyToOne',
        relatedEntity: 'Account',
        parentProperty: 'Account',
        parentPropertyType: 'object'
      }, {
        name: 'RequestedBy',
        displayName: contactResource.entityDisplayNamePlural,
        type: 'ManyToOne',
        relatedEntity: 'Contact',
        parentProperty: 'RequestedBy',
        parentPropertyType: 'object'
      }, {
        name: 'Opportunity',
        displayName: opportunityResource.entityDisplayNamePlural,
        type: 'ManyToOne',
        relatedEntity: 'Opportunity',
        parentProperty: 'Opportunity',
        parentPropertyType: 'object'
      }, {
        name: 'Quote',
        displayName: quoteResource.entityDisplayNamePlural,
        type: 'ManyToOne',
        relatedEntity: 'Quote',
        parentProperty: 'Quote',
        parentPropertyType: 'object'
      }, {
        name: 'BillTo',
        displayName: billtoResource.entityDisplayNamePlural,
        type: 'ManyToOne',
        relatedEntity: 'ERPBillTo',
        parentProperty: 'ErpBillTo',
        parentPropertyType: 'object'
      }, {
        name: 'ShipTo',
        displayName: shiptoResource.entityDisplayNamePlural,
        type: 'ManyToOne',
        relatedEntity: 'ERPShipTo',
        parentProperty: 'ErpShipTo',
        parentPropertyType: 'object'
      }, {
        name: 'OrderItem',
        displayName: orderItemsResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'SalesOrderItem',
        relatedProperty: 'SalesOrder',
        relatedPropertyType: 'object'
      }, {
        name: 'InvoiceItem',
        displayName: invoiceitemResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'ERPInvoiceItem',
        relatedProperty: 'SalesOrder',
        relatedPropertyType: 'object'
      }, {
        name: 'ShipmentItem',
        displayName: shipmentitemResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'ERPShipmentItem',
        relatedProperty: 'SalesOrder',
        relatedPropertyType: 'object'
      }, {
        name: 'SyncHistory',
        displayName: syncresultResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'SyncResult',
        relatedProperty: 'EntityId',
        where: 'EntityType eq "SalesOrder"'
      }]);
      return rel;
    }
  });

  _lang["default"].setObject('icboe.Models.SalesOrder.Base', __class);

  var _default = __class;
  _exports["default"] = _default;
});