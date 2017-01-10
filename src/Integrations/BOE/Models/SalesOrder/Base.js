import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('salesOrderModel');
const accountResource = getResource('accountModel');
const contactResource = getResource('contactModel');
const orderItemsResource = getResource('salesOrderItemModel');
const opportunityResource = getResource('opportunityModel');
const quoteResource = getResource('quoteModel');
const billtoResource = getResource('erpBillToModel');
const shiptoResource = getResource('erpShipToModel');
const syncresultResource = getResource('syncResultModel');
const invoiceitemResource = getResource('erpInvoiceItemModel');
const shipmentitemResource = getResource('erpShipmentItemModel');

const __class = declare('crm.Integrations.BOE.Models.SalesOrder.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'salesOrders',
  entityName: 'SalesOrder',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.SALESORDER,
  iconClass: 'fa fa-shopping-cart fa-2x',
  detailViewId: 'salesorder_detail',
  listViewId: 'salesorder_list',
  editViewId: 'salesorder_edit',
  createRelationships: function createRelationships() {
    const rel = this.relationships || (this.relationships = [{
      name: 'Account',
      displayName: accountResource.entityDisplayNamePlural,
      type: 'ManyToOne',
      relatedEntity: 'Account',
      parentProperty: 'Account',
      parentPropertyType: 'object',
    }, {
      name: 'RequestedBy',
      displayName: contactResource.entityDisplayNamePlural,
      type: 'ManyToOne',
      relatedEntity: 'Contact',
      parentProperty: 'RequestedBy',
      parentPropertyType: 'object',
    }, {
      name: 'Opportunity',
      displayName: opportunityResource.entityDisplayNamePlural,
      type: 'ManyToOne',
      relatedEntity: 'Opportunity',
      parentProperty: 'Opportunity',
      parentPropertyType: 'object',
    }, {
      name: 'Quote',
      displayName: quoteResource.entityDisplayNamePlural,
      type: 'ManyToOne',
      relatedEntity: 'Quote',
      parentProperty: 'Quote',
      parentPropertyType: 'object',
    }, {
      name: 'BillTo',
      displayName: billtoResource.entityDisplayNamePlural,
      type: 'ManyToOne',
      relatedEntity: 'ERPBillTo',
      parentProperty: 'ErpBillTo',
      parentPropertyType: 'object',
    }, {
      name: 'ShipTo',
      displayName: shiptoResource.entityDisplayNamePlural,
      type: 'ManyToOne',
      relatedEntity: 'ERPShipTo',
      parentProperty: 'ErpShipTo',
      parentPropertyType: 'object',
    }, {
      name: 'OrderItem',
      displayName: orderItemsResource.entityDisplayNamePlural,
      type: 'OneToMany',
      relatedEntity: 'SalesOrderItem',
      relatedProperty: 'SalesOrder',
      relatedPropertyType: 'object',
    }, {
      name: 'InvoiceItem',
      displayName: invoiceitemResource.entityDisplayNamePlural,
      type: 'OneToMany',
      relatedEntity: 'ERPInvoiceItem',
      relatedProperty: 'SalesOrder',
      relatedPropertyType: 'object',
    }, {
      name: 'ShipmentItem',
      displayName: shipmentitemResource.entityDisplayNamePlural,
      type: 'OneToMany',
      relatedEntity: 'ERPShipmentItem',
      relatedProperty: 'SalesOrder',
      relatedPropertyType: 'object',
    }, {
      name: 'SyncHistory',
      displayName: syncresultResource.entityDisplayNamePlural,
      type: 'OneToMany',
      relatedEntity: 'SyncResult',
      relatedProperty: 'EntityId',
      where: 'EntityType eq "SalesOrder"',
    },
    ]);
    return rel;
  },
});
lang.setObject('icboe.Models.SalesOrder.Base', __class);
export default __class;
