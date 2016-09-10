import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('erpReceivableItemModel');

const __class = declare('icboe.Models.ErpReceivableItem.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'erpReceivableItems',
  entityName: 'ERPReceivableItem',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.ERPRECEIVABLEITEM,
  iconClass: 'fa fa-check-circle-o fa-2x',
  detailViewId: 'erpreceivableitems_detail',
  listViewId: 'erpreceivable_items_list',
  editViewId: '',
  createRelationships: function createRelationships() {
    let rel;
    rel = this.relationships || (this.relationships = []);
    return rel;
  },
});
export default __class;
