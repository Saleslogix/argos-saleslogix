import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';

const resource = window.localeContext.getEntitySync('leadModel').attributes;

const __class = declare('crm.Models.Lead.Base', [_ModelBase], {
  resourceKind: 'leads',
  entityName: 'Lead',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  iconClass: 'fa fa-filter fa-2x',
  security: 'Entities/Lead/View',
  modelName: MODEL_NAMES.OPPORTUNITY,
  createRelationships: function createRelationships() {
    let rel;
    rel = this.relationships || (this.relationships = [{
      name: 'Addresses',
      displayName: 'Addresses',
      propertyName: 'Addresses',
      type: 'OneToMany',
      relatedEntity: 'LeadAddress',
      relatedProperty: 'LeadId',
    }, {
      name: 'History',
      displayName: 'History',
      propertyName: 'History',
      type: 'OneToMany',
      relatedEntity: 'History',
      relatedProperty: 'LeadId',
      where: 'Type ne "atDatabaseChange"',
    }, {
      name: 'Activity',
      displayName: 'Activities',
      propertyName: 'Activity',
      type: 'OneToMany',
      relatedEntity: 'Activity',
      relatedProperty: 'LeadId',
    }]);
    return rel;
  },
});
export default __class;
