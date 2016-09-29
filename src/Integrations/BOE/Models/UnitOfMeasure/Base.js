import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('unitOfMeasureModel');

const __class = declare('crm.Integrations.BOE.Models.UnitOfMeasure.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'unitsOfMeasure',
  entityName: 'UnitOfMeasure',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.UNITOFMEASURE,
  iconClass: 'fa fa-building-o fa-2x',
  detailViewId: '',
  listViewId: 'unitofmeasure_list',
  editViewId: '',
  createRelationships: function createRelationships() {
    const rel = this.relationships || (this.relationships = [
    ]);
    return rel;
  },
});
lang.setObject('icboe.Models.UnitOfMeasure.Base', __class);
export default __class;
