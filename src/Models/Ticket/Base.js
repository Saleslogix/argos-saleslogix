import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('ticketModel');
const accountResource = getResource('accountModel');
const contactResource = getResource('contactModel');
const activityResource = getResource('activityModel');
const historyResource = getResource('historyModel');

const __class = declare('crm.Models.Ticket.Base', [_ModelBase], {
  entityName: 'Ticket',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  iconClass: 'fa fa-clipboard fa-2x',
  resourceKind: 'tickets',
  security: 'Entities/Ticket/View',
  modelName: MODEL_NAMES.TICKET,

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
      name: 'Contact',
      displayName: contactResource.entityDisplayName,
      type: 'ManyToOne',
      parentProperty: 'Contact',
      parentPropertyType: 'object',
      relatedEntity: 'Contact',
      relatedPropertyType: 'object',
    }, {
      name: 'History',
      displayName: historyResource.entityDisplayNamePlural,
      type: 'OneToMany',
      relatedEntity: 'History',
      relatedProperty: 'TicketId',
      where: 'Type ne "atDatabaseChange"',
    }, {
      name: 'Activity',
      displayName: activityResource.entityDisplayNamePlural,
      type: 'OneToMany',
      relatedEntity: 'Activity',
      relatedProperty: 'TicketId',
    }]);
    return rel;
  },

});
export default __class;
