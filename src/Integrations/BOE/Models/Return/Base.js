import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('returnModel');

const __class = declare('icboe.Models.Return.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'returns',
  entityName: 'Return',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.RETURN,
  iconClass: 'fa fa-recycle-o fa-2x',
  detailViewId: '',
  listViewId: 'returns_list',
  editViewId: '',
  createRelationships: function createRelationships() {
    let rel;
    rel = this.relationships || (this.relationships = [
    ]);
    return rel;
  },
});
export default __class;
