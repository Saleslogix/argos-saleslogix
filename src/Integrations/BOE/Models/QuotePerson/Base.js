import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('quotePersonModel');
const quoteResource = getResource('quoteModel');

const __class = declare('crm.Integrations.BOE.Models.QuotePerson.Base', [_ModelBase], {
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
    const rel = this.relationships || (this.relationships = [{
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
lang.setObject('icboe.Models.QuotePerson.Base', __class);
export default __class;
