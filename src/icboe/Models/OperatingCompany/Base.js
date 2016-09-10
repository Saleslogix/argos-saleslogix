import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('operatingCompanyModel');

const __class = declare('icboe.Models.OperatingCompany.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'operatingCompanies',
  entityName: 'AppIdMapping',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.OPERATINGCOMPANY,
  iconClass: '',
  detailViewId: '',
  listViewId: '',
  editViewId: '',
  createRelationships: function createRelationships() {
    let rel;
    rel = this.relationships || (this.relationships = [
    ]);
    return rel;
  },
});
export default __class;
