import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('locationModel');

const __class = declare('icboe.Models.Location.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'slxLocations',
  entityName: 'SlxLocation',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.LOCATION,
  iconClass: 'fa fa-map-marker fa-2x',
  detailViewId: '',
  listViewId: 'locations_list',
  editViewId: '',
  createRelationships: function createRelationships() {
    return null;
  },
});
export default __class;
