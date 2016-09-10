import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('erpShipmentModel');

const __class = declare('icboe.Models.ErpShipment.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'erpShipments',
  entityName: 'ERPShipment',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.ERPSHIPMENT,
  iconClass: 'fa fa-truck fa-2x',
  detailViewId: 'erpshipments_detail',
  listViewId: 'erpshipments_list',
  editViewId: '',
  createRelationships: function createRelationships() {
    let rel;
    rel = this.relationships || (this.relationships = []);
    return rel;
  },
});
export default __class;
