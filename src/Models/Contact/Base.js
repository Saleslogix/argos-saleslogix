import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('contactModel');
const accountResource = getResource('accountModel');
const activityResource = getResource('activityModel');
const historyResource = getResource('historyModel');
const addressResource = getResource('addressModel');
const ticketResource = getResource('ticketModel');

const __class = declare('crm.Models.Contact.Base', [_ModelBase], {
  resourceKind: 'contacts',
  entityName: 'Contact',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.CONTACT,
  iconClass: 'user',
  security: 'Entities/Contact/View',
  createPicklists: function createPicklists() {
    return this.picklists || (this.picklists = [{
      name: 'Title',
      property: 'Title',
      // TODO: Add once Title is a code picklist
      // options: {
      //   filterByLanguage: true,
      // },
    }, {
      name: 'Name Prefix',
      options: {
        filterByLanguage: true,
        storageMode: 'text',
      },
    }, {
      name: 'Name Suffix',
      options: {
        filterByLanguage: true,
        storageMode: 'text',
      },
    }]);
  },
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
