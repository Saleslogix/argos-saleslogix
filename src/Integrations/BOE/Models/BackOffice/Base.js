import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('backOfficeModel');
const backOfficeAccountingResource = getResource('backOfficeAccountingEntityModel');

const __class = declare('icboe.Models.BackOffice.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'backOffices',
  entityName: 'BackOffice',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.BACKOFFICE,
  iconClass: 'fa fa-building-o fa-2x',
  detailViewId: '',
  listViewId: 'backoffices_list',
  editViewId: '',
  createRelationships: function createRelationships() {
    let rel;
    rel = this.relationships || (this.relationships = [{
        name: 'BackOfficeAccountingEntity',
        displayName: backOfficeAccountingResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'BackOfficeAccountingEntity',
        relatedProperty: 'EntityId',
      },
    ]);
    return rel;
  },
});
export default __class;
