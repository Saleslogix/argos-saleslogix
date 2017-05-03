import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('locationModel');

const __class = declare('crm.Integrations.BOE.Models.Location.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'slxLocations',
  entityName: 'SlxLocation',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.LOCATION,
  iconClass: 'map-pin',
  detailViewId: '',
  listViewId: 'locations_list',
  editViewId: '',
  createRelationships: function createRelationships() {
    return null;
  },
});
lang.setObject('icboe.Models.Location.Base', __class);
export default __class;
