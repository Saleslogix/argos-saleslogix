define('crm/Integrations/BOE/Models/SalesOrder/Base', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _lang, _ModelBase2, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _ModelBase3 = _interopRequireDefault(_ModelBase2);

  var _Names2 = _interopRequireDefault(_Names);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  const resource = (0, _I18n2.default)('salesOrderModel'); /* Copyright 2017 Infor
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

  const accountResource = (0, _I18n2.default)('accountModel');
  const contactResource = (0, _I18n2.default)('contactModel');
  const orderItemsResource = (0, _I18n2.default)('salesOrderItemModel');
  const opportunityResource = (0, _I18n2.default)('opportunityModel');
  const quoteResource = (0, _I18n2.default)('quoteModel');
  const billtoResource = (0, _I18n2.default)('erpBillToModel');
  const shiptoResource = (0, _I18n2.default)('erpShipToModel');
  const syncresultResource = (0, _I18n2.default)('syncResultModel');
  const invoiceitemResource = (0, _I18n2.default)('erpInvoiceItemModel');
  const shipmentitemResource = (0, _I18n2.default)('erpShipmentItemModel');

  const __class = (0, _declare2.default)('crm.Integrations.BOE.Models.SalesOrder.Base', [_ModelBase3.default], {
    contractName: 'dynamic',
    resourceKind: 'salesOrders',
    entityName: 'SalesOrder',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    modelName: _Names2.default.SALESORDER,
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
      const rel = this.relationships || (this.relationships = [{
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
  _lang2.default.setObject('icboe.Models.SalesOrder.Base', __class);
  exports.default = __class;
  module.exports = exports['default'];
});