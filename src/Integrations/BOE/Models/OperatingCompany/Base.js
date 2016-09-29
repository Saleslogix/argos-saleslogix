import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('operatingCompanyModel');

const __class = declare('crm.Integrations.BOE.Models.OperatingCompany.Base', [_ModelBase], {
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
    const rel = this.relationships || (this.relationships = [
    ]);
    return rel;
  },
});
lang.setObject('icboe.Models.OperatingCompany.Base', __class);
export default __class;
