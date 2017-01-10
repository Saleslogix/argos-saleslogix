import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('syncResultModel');

const __class = declare('crm.Integrations.BOE.Models.SyncResult.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'syncResults',
  entityName: 'SyncResult',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.SYNCRESULT,
  iconClass: '',
  detailViewId: '',
  listViewId: 'syncresult_list',
  editViewId: '',
  createRelationships: function createRelationships() {
    const rel = this.relationships || (this.relationships = [
    ]);
    return rel;
  },
});
lang.setObject('icboe.Models.SyncResult.Base', __class);
export default __class;
