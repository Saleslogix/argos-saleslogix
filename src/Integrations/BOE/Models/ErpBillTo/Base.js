import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('erpBillToModel');
// const accountResource = getResource('accountModel');
// const shiptoResource = getResource('erpShipToModel');
const quoteResource = getResource('quoteModel');
const salesorderResource = getResource('salesOrderModel');
const invoiceResource = getResource('erpInvoiceModel');
const returnResource = getResource('returnModel');
const syncresultResource = getResource('syncResultModel');

const __class = declare('crm.Integrations.BOE.Models.ErpBillTo.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'erpBillTos',
  entityName: 'ERPBillTo',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.ERPBILLTO,
  iconClass: '',
  detailViewId: 'erpbillto_detail',
  listViewId: 'erpbillto_list',
  editViewId: '',
  createRelationships: function createRelationships() {
    const rel = this.relationships || (this.relationships = [
    // TODO: Update with ManyToMany relationship when available in core.
    // {
    //   name: 'Account',
    //   displayName: accountResource.entityDisplayName,
    //   type: 'ManyToMany',
    //   relatedEntity: 'Account',
    //   relatedProperty: 'ErpBillToAccounts.ErpBillTo',
    //   relatedPropertyType: 'object',
    // }, {
    //   name: 'ShipTo',
    //   displayName: shiptoResource.entityDisplayName,
    //   type: 'ManyToMany',
    //   relatedEntity: 'ERPShipTo',
    //   relatedProperty: 'ErpBillToShipTos.ErpBillTo',
    //   relatedPropertyType: 'object',
    // },
      {
        name: 'Quote',
        displayName: quoteResource.entityDisplayName,
        type: 'OneToMany',
        relatedEntity: 'Quote',
        relatedProperty: 'BillTo',
        relatedPropertyType: 'object',
      }, {
        name: 'SalesOrder',
        displayName: salesorderResource.entityDisplayName,
        type: 'OneToMany',
        relatedEntity: 'SalesOrder',
        relatedProperty: 'ErpBillTo',
        relatedPropertyType: 'object',
      }, {
        name: 'Invoice',
        displayName: invoiceResource.entityDisplayName,
        type: 'ManyToOne',
        relatedEntity: 'ERPInvoice',
        relatedProperty: 'ErpBillTo',
        relatedPropertyType: 'object',
      }, {
        name: 'Return',
        displayName: returnResource.entityDisplayName,
        type: 'ManyToOne',
        relatedEntity: 'Return',
        relatedProperty: 'ErpBillTo',
        relatedPropertyType: 'object',
      }, {
        name: 'SyncHistory',
        displayName: syncresultResource.entityDisplayName,
        type: 'OneToMany',
        relatedEntity: 'SyncResult',
        relatedProperty: 'EntityId',
        where: 'EntityType eq "ERPBillTo"',
      }]);
    return rel;
  },
});
lang.setObject('icboe.Models.ErpBillTo.Base', __class);
export default __class;
