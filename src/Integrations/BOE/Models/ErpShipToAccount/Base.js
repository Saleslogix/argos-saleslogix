import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('erpShipToAccountModel');

const __class = declare('icboe.Models.ErpShipToAccount.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'erpShipToAccounts',
  entityName: 'ERPShipToAccount',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.ERPSHIPTOACCOUNT,
  iconClass: 'fa fa-truck fa-2x',
  detailViewId: 'erpshipto_detail',
  listViewId: 'erpshipto_list',
  editViewId: '',
  createRelationships: function createRelationships() {
    let rel;
    rel = this.relationships || (this.relationships = []);
    return rel;
  },
});
export default __class;
