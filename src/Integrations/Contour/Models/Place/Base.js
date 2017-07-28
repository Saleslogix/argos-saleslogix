import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('placeModel'); // eslint-disable-line
const addressResource = getResource('addressModel');

const __class = declare('crm.Integrations.Contour.Models.Place.Base', [_ModelBase], {
  resourceKind: 'places',
  entityName: 'Place',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.PLACE,
  listViewId: 'pxSearch_locations',
  createRelationships: function createRelationships() {
    const rel = this.relationships || (this.relationships = [{
      name: 'Addresses',
      displayName: addressResource.entityDisplayNamePlural,
      type: 'OneToMany',
      relatedEntity: 'Address',
      relatedProperty: 'EntityId',
    }]);
    return rel;
  },
});
export default __class;
