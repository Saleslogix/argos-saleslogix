import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';

const resource = window.localeContext.getEntitySync('contactModel').attributes;
const accountResource = window.localeContext.getEntitySync('accountModel').attributes;
const activityResource = window.localeContext.getEntitySync('activityModel').attributes;
const historyResource = window.localeContext.getEntitySync('historyModel').attributes;
const addressResource = window.localeContext.getEntitySync('addressModel').attributes;
const ticketResource = window.localeContext.getEntitySync('ticketModel').attributes;

const __class = declare('crm.Models.Contact.Base', [_ModelBase], {
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
      name: 'Account',
      displayName: accountResource.entityDisplayName,
      type: 'ManyToOne',
      parentProperty: 'Account',
      parentPropertyType: 'object',
      relatedEntity: 'Account',
      relatedPropertyType: 'object',
    }, {
      name: 'Addresses',
      displayName: addressResource.entityDisplayNamePlural,
      propertyName: 'Addresses',
      type: 'OneToMany',
      relatedEntity: 'Address',
      relatedProperty: 'EntityId',
    }, {
      name: 'History',
      displayName: historyResource.entityDisplayNamePlural,
      propertyName: 'History',
      type: 'OneToMany',
      relatedEntity: 'History',
      relatedProperty: 'ContactId',
      where: 'Type ne "atDatabaseChange"',
    }, {
      name: 'Activity',
      displayName: activityResource.entityDisplayNamePlural,
      propertyName: 'Activity',
      type: 'OneToMany',
      relatedEntity: 'Activity',
      relatedProperty: 'ContactId',
    }, {
      name: 'Tickets',
      displayName: ticketResource.entityDisplayNamePlural,
      type: 'OneToMany',
      relatedEntity: 'Ticket',
      relatedProperty: 'Contact',
      relatedPropertyType: 'object',
    }]);
    return rel;
  },
});
export default __class;
