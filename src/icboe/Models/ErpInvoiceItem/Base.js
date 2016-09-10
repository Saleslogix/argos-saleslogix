import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('erpInvoiceItemModel');

const __class = declare('icboe.Models.ErpInvoiceItem.Base', [_ModelBase], {
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
    let rel;
    rel = this.relationships || (this.relationships = []);
    return rel;
  },
});
export default __class;
