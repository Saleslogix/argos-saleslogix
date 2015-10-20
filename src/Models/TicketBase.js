import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from './Names';

const resource = window.localeContext.getEntitySync('ticketModel').attributes;

const __class = declare('crm.Models.LeadBase', [_ModelBase], {
  entityName: 'Ticket',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  iconClass: 'fa fa-clipboard fa-2x',
  resourceKind: 'tickets',
  security: 'Entities/Ticket/View',
  modelName: MODEL_NAMES.TICKET,
});
export default __class;
