import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from './Names';

const __class = declare('crm.Models.LeadBase', [_ModelBase], {
  resourceKind: 'leads',
  entityName: 'Lead',
  entityDisplayName: 'Lead',
  entityDisplayNamePlural: 'Leads',
  iconClass: 'fa fa-filter fa-2x',
  security: 'Entities/Lead/View',
  modelName: MODEL_NAMES.LEAD,
  createRelationships: function createRelationships() {
    let rel;
    rel = this.relationships || (this.relationships = [{
      name: 'Addresses',
      displayName: 'Addresses',
      propertyName: 'Addresses',
      type: 'OneToMany',
      parentEntity: 'Lead',
      parentProperty: 'LeadId',
      parentPrimaryKey: true,
      childEntity: 'Lead_Address',
      childProperty: 'LeadId',
    }, {
      name: 'History',
      displayName: 'History',
      propertyName: 'History',
      type: 'OneToMany',
      parentEntity: 'Lead',
      parentProperty: 'LeadId',
      parentPrimaryKey: true,
      childEntity: 'History',
      childProperty: 'LeadId',
    }, {
      name: 'Activity',
      displayName: 'Activities',
      propertyName: 'Activity',
      type: 'OneToMany',
      parentEntity: 'Lead',
      parentProperty: 'LeadId',
      parentPrimaryKey: true,
      childEntity: 'Activity',
      childProperty: 'LeadId',
    }]);
    return rel;
  },
});
export default __class;
