import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('opportunityModel');
const accountResource = getResource('accountModel');
const activityResource = getResource('activityModel');
const historyResource = getResource('historyModel');

const __class = declare('crm.Models.Opportunity.Base', [_ModelBase], {
  entityName: 'Opportunity',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  iconClass: 'fa fa-money fa-2x',
  resourceKind: 'opportunities',
  modelName: MODEL_NAMES.OPPORTUNITY,
  security: 'Entities/Opportunity/View',

  createRelationships: function createRelationships() {
    const rel = this.relationships || (this.relationships = [{
      name: 'Account',
      displayName: accountResource.entityDisplayName,
      type: 'ManyToOne',
      parentProperty: 'Account',
      parentPropertyType: 'object',
      relatedEntity: 'Account',
      relatedPropertyType: 'object',
    }, {
      name: 'Reseller',
      displayName: resource.resellerText,
      type: 'ManyToOne',
      parentProperty: 'Reseller',
      parentPropertyType: 'object',
      relatedEntity: 'Account',
      relatedPropertyType: 'object',
    }, {
      name: 'History',
      displayName: historyResource.entityDisplayNamePlural,
      type: 'OneToMany',
      relatedEntity: 'History',
      relatedProperty: 'OpportunityId',
      where: 'Type ne "atDatabaseChange"',
    }, {
      name: 'Activity',
      displayName: activityResource.entityDisplayNamePlural,
      type: 'OneToMany',
      relatedEntity: 'Activity',
      relatedProperty: 'OpportunityId',
    }]);
    return rel;
  },
});
export default __class;
