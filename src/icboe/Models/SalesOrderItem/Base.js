import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('salesOrderItemModel');

const __class = declare('icboe.Models.SalesOrderItem.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'salesOrderItems',
  entityName: 'SalesOrderItem',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.SALESORDERITEM,
  iconClass: 'fa fa-list-ul fa-2x',
  detailViewId: 'salesorder_item_detail',
  listViewId: 'salessorder_items_list',
  editViewId: 'salesorder_item_edit',
  createRelationships: function createRelationships() {
    let rel;
    rel = this.relationships || (this.relationships = []);
    return rel;
  },
});
export default __class;
