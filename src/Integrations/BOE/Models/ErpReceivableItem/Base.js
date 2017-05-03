import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('erpReceivableItemModel');
const receivableResource = getResource('erpReceivableModel');
const invoiceResource = getResource('erpInvoiceModel');

const __class = declare('crm.Integrations.BOE.Models.ErpReceivableItem.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'erpReceivableItems',
  entityName: 'ERPReceivableItem',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.ERPRECEIVABLEITEM,
  iconClass: 'checkbox',
  detailViewId: 'erpreceivableitems_detail',
  listViewId: 'erpreceivable_items_list',
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
      name: 'Receivable',
      displayName: receivableResource.entityDisplayName,
      type: 'ManyToOne',
      parentProperty: 'ErpReceivable',
      parentPropertyType: 'object',
      relatedEntity: 'ERPReceivable',
    }]);
    return rel;
  },
});
lang.setObject('icboe.Models.ErpReceivableItem.Base', __class);
export default __class;
