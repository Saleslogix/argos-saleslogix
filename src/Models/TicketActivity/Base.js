import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('ticketActivityModel');

const __class = declare('crm.Models.TicketActivity.Base', [_ModelBase], {
  entityName: 'TicketActivity',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  iconClass: 'bullet-list',
  resourceKind: 'ticketActivities',
  security: 'Entities/Ticket/View',
  modelName: MODEL_NAMES.TICKETACTIVITY,

  createPicklists: function createPicklists() {
    return this.picklists || (this.picklists = [{
      name: 'Ticket Activity',
      property: 'ActivityTypeCode',
    }, {
      name: 'Ticket Activity Public Access',
      property: 'PublicAccessCode',
    }]);
  },
  createRelationships: function createRelationships() {
    const rel = this.relationships || (this.relationships = []);
    return rel;
  },

});
export default __class;
