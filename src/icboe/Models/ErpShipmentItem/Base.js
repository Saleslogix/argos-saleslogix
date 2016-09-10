import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('erpShipmentItemModel');

const __class = declare('icboe.Models.ErpShipmentItem.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'erpShipmentItems',
  entityName: 'ERPShipmentItem',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.ERPSHIPMENTITEM,
  iconClass: 'fa fa-truck fa-2x',
  detailViewId: 'erpshipment_items_detail',
  listViewId: 'erpshipment_items_list',
  editViewId: '',
  createRelationships: function createRelationships() {
    let rel;
    rel = this.relationships || (this.relationships = []);
    return rel;
  },
});
export default __class;
