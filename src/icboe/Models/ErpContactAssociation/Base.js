import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('erpContactAssociationModel');

const __class = declare('icboe.Models.ErpContactAssociation.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'erpContactAccounts',
  entityName: 'ERPContactAccount',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.ERPCONTACTASSOCIATION,
  iconClass: 'fa fa-building-o fa-2x',
  detailViewId: '',
  listViewId: 'erpcontactassociations_list',
  editViewId: '',
  createRelationships: function createRelationships() {
    let rel;
    rel = this.relationships || (this.relationships = []);
    return rel;
  },
});
export default __class;
