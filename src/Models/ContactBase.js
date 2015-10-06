import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from './Names';

const resource = window.localeContext.getEntitySync('contactModel').attributes;

const __class = declare('crm.Models.ContactBase', [_ModelBase], {
  resourceKind: 'contacts',
  entityName: 'Contact',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.CONTACT,
  iconClass: 'fa fa-user fa-lg',
  security: 'Entities/Contact/View',
  createRelationships: function createRelationships() {
    let rel;
    rel = this.relationships || (this.relationships = [{
      name: 'Addresses',
      displayName: 'Addresses',
      propertyName: 'Addresses',
      type: 'OneToMany',
      parentEntity: 'Contact',
      parentProperty: 'ContactId',
      parentPrimaryKey: true,
      childEntity: 'Address',
      childProperty: 'EntityId',
    }, {
      name: 'History',
      displayName: 'History',
      propertyName: 'History',
      type: 'OneToMany',
      parentEntity: 'Contact',
      parentProperty: 'ContactId',
      parentPrimaryKey: true,
      childEntity: 'History',
      childProperty: 'ContactId',
    }, {
      name: 'Activity',
      displayName: 'Activities',
      propertyName: 'Activity',
      type: 'OneToMany',
      parentEntity: 'Contact',
      parentProperty: 'ContactId',
      parentPrimaryKey: true,
      childEntity: 'Activity',
      childProperty: 'ContactId',
    }]);
    return rel;
  },
});
export default __class;
