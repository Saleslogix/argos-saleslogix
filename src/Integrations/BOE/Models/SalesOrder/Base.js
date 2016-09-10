import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('salesOrderModel');

const __class = declare('icboe.Models.SalesOrder.Base', [_ModelBase], {
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
    let rel;
    rel = this.relationships || (this.relationships = [
    ]);
    return rel;
  },
});
export default __class;
