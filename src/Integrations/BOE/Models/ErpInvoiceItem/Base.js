import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('erpInvoiceItemModel');
const invoiceResource = getResource('erpInvoiceModel');
const salesOrderResource = getResource('saleOrderModel');

const __class = declare('crm.Integrations.BOE.Models.ErpInvoiceItem.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'erpInvoiceItems',
  entityName: 'ERPInvoiceItem',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.ERPINVOICEITEM,
  iconClass: 'fa fa-list-ul fa-2x',
  detailViewId: 'invoice_item_detail',
  listViewId: 'invoice_item_list',
  editViewId: '',
  createRelationships: function createRelationships() {
    const rel = this.relationships || (this.relationships = [{
      name: 'Invoice',
      displayName: invoiceResource.entityDisplayName,
      type: 'ManyToOne',
      parentProperty: 'ErpInvoice',
      parentPropertyType: 'object',
      relatedEntity: 'ERPInvoice',
    }, {
      name: 'SalesOrder',
      displayName: salesOrderResource.entityDisplayName,
      type: 'ManyToOne',
      parentProperty: 'SalesOrder',
      parentPropertyType: 'object',
      relatedEntity: 'SalesOrder',
    }]);
    return rel;
  },
});
lang.setObject('icboe.Models.ErpInvoiceItem.Base', __class);
export default __class;
