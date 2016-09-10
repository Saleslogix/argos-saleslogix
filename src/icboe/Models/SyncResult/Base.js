import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('syncResultModel');

const __class = declare('icboe.Models.SyncResult.Base', [_ModelBase], {
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
    let rel;
    rel = this.relationships || (this.relationships = [
    ]);
    return rel;
  },
});
export default __class;
