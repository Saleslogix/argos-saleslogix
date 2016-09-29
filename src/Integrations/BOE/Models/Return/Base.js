import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('returnModel');

const __class = declare('crm.Integrations.BOE.Models.Return.Base', [_ModelBase], {
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
    const rel = this.relationships || (this.relationships = [
    ]);
    return rel;
  },
});
lang.setObject('icboe.Models.Return.Base', __class);
export default __class;
