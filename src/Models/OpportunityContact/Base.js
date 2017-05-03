import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('opportunityContactModel');
const contactResource = getResource('contactModel');
const opportunityResource = getResource('opportunityModel');

const __class = declare('crm.Models.OpportunityContact.Base', [_ModelBase], {
  entityName: 'OpportunityContact',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  iconClass: 'user',
  resourceKind: 'opportunityContacts',
  modelName: MODEL_NAMES.OPPORTUNITYCONTACT,
  security: 'Entities/Contact/View',

  createPicklists: function createPicklists() {
    return this.picklists || (this.picklists = [{
      name: 'Role',
      property: 'SalesRole',
    }, {
      name: 'Standing',
      property: 'Standing',
    }]);
  },
  createRelationships: function createRelationships() {
    const rel = this.relationships || (this.relationships = [{
      name: 'Contact',
      displayName: contactResource.entityDisplayName,
      type: 'OneToOne',
      relatedEntity: 'Contact',
      relatedProperty: 'ContactId',
    }, {
      name: 'Opportunity',
      displayName: opportunityResource.entityDisplayNamePlural,
      type: 'OneToOne',
      relatedEntity: 'Opportunity',
      relatedProperty: 'OpportunityId',
    }]);
    return rel;
  },
});
export default __class;
