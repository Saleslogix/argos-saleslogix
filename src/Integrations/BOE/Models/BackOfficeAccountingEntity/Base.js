import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('backOfficeAccountingEntityModel');

const __class = declare('crm.Integrations.BOE.Models.BackOfficeAccountingEntities.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'backOfficeAccountingEntities',
  entityName: 'BackOfficeAcctEntity',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.BACKOFFICEACCOUNTINGENTITY,
  iconClass: 'fa fa-building-o fa-2x',
  detailViewId: '',
  listViewId: 'backofficeaccountingentities_list',
  editViewId: '',
  createRelationships: function createRelationships() {
    const rel = this.relationships || (this.relationships = [
    ]);
    return rel;
  },
});
lang.setObject('icboe.Models.BackOfficeAccountingEntities.Base', __class);
export default __class;
