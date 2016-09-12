import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('placeModel');
const addressResource = getResource('addressModel');

const __class = declare('crm.Integrations.Contour.Models.Place.Base', [_ModelBase], {
  resourceKind: 'places',
  entityName: 'Place',
  entityDisplayName: 'Place',
  entityDisplayNamePlural: 'Places',
  modelName: MODEL_NAMES.PLACE,
  listViewId: 'pxSearch_locations',
  createRelationships: function createRelationships() {
    let rel;
    rel = this.relationships || (this.relationships = [{
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
