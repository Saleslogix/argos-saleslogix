import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('carrierModel');

const __class = declare('crm.Integrations.BOE.Models.Carrier.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'carriers',
  entityName: 'Carrier',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.CARRIER,
  iconClass: 'fa fa-building-o fa-2x',
  detailViewId: '',
  listViewId: 'carriers_list',
  editViewId: '',
  createRelationships: function createRelationships() {
    const rel = this.relationships || (this.relationships = []);
    return rel;
  },
});
lang.setObject('icboe.Models.Carrier.Base', __class);
export default __class;
