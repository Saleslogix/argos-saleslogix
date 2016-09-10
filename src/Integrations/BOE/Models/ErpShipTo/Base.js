import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('erpShipToModel');

const __class = declare('icboe.Models.ErpShipTo.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'erpShipTos',
  entityName: 'ERPShipTo',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.ERPSHIPTO,
  iconClass: '',
  detailViewId: '',
  listViewId: 'erpShipto_list',
  editViewId: 'erpShipto_detail',
  createRelationships: function createRelationships() {
    let rel;
    rel = this.relationships || (this.relationships = []);
    return rel;
  },
});
export default __class;
