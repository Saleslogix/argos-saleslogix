import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('salesOrderItemModel');
const salesorderResource = getResource('salesOrderModel');

const __class = declare('crm.Integrations.BOE.Models.SalesOrderItem.Base', [_ModelBase], {
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
    const rel = this.relationships || (this.relationships = [{
      name: 'SalesOrder',
      displayName: salesorderResource.entityDisplayName,
      type: 'ManyToOne',
      parentProperty: 'SalesOrder',
      parentPropertyType: 'object',
      relatedEntity: 'SalesOrder',
    }]);
    return rel;
  },
});
lang.setObject('icboe.Models.SalesOrderItem.Base', __class);
export default __class;
