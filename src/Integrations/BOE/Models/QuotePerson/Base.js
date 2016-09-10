import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('quotePersonModel');
const quoteResource = getResource('quoteModel');

const __class = declare('icboe.Models.QuotePerson.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'quotePersons',
  entityName: 'QuotePerson',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.QUOTEPERSON,
  iconClass: '',
  detailViewId: '',
  listViewId: 'quotePerson_list',
  editViewId: '',
  createRelationships: function createRelationships() {
    let rel;
    rel = this.relationships || (this.relationships = [{
        name: 'Quote',
        displayName: quoteResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'Quote',
        relatedProperty: 'EntityId',
      },
    ]);
    return rel;
  },
});
export default __class;
