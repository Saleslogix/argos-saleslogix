import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import ACTIVITY_TYPE_TEXT from './ActivityTypeText';
import ACTIVITY_TYPE_ICON from './ActivityTypeIcon';
import getResource from 'argos/I18n';

const resource = getResource('activityModel');
const accountResource = getResource('accountModel');
const contactResource = getResource('contactModel');
const oppResource = getResource('opportunityModel');
const ticketResource = getResource('ticketModel');
const leadResource = getResource('leadModel');

const __class = declare('crm.Models.Activity.Base', [_ModelBase], {
  modelName: MODEL_NAMES.ACTIVITY,
  entityName: 'Activity',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  iconClass: 'bullet-list',
  resourceKind: 'activities',
  contractName: 'system',
  recurringActivityIdSeparator: ';',

  createPicklists: function createPicklists() {
    return this.picklists || (this.picklists = [{
      name: 'Priorities',
      property: 'Priorities',
    }]);
  },
  createRelationships: function createRelationships() {
    const rel = this.relationships || (this.relationships = [{
      name: 'Account',
      displayName: accountResource.entityDisplayName,
      type: 'ManyToOne',
      parentProperty: 'AccountId',
      relatedEntity: 'Account',
    }, {
      name: 'Contact',
      displayName: contactResource.entityDisplayName,
      type: 'ManyToOne',
      parentProperty: 'ContactId',
      relatedEntity: 'Contact',
    }, {
      name: 'Ticket',
      displayName: ticketResource.entityDisplayName,
      type: 'ManyToOne',
      parentProperty: 'TicketId',
      relatedEntity: 'Ticket',
    }, {
      name: 'Opportunity',
      displayName: oppResource.entityDisplayName,
      type: 'ManyToOne',
      parentProperty: 'OpportunityId',
      relatedEntity: 'Opportunity',
    }, {
      name: 'Lead',
      displayName: leadResource.entityDisplayName,
      type: 'ManyToOne',
      parentProperty: 'LeadId',
      relatedEntity: 'Lead',
    }]);
    return rel;
  },
  getIconClass: function getIconClass(entry) {
    let cls = this.iconClass;
    if (entry && entry.Type) {
      cls = ACTIVITY_TYPE_ICON[entry.Type];
      if (cls) {
        cls = `${cls}`;
      }
    }
    return cls;
  },
  getTypeText: function getTypeText(entry) {
    let name = '';
    if (entry && entry.Type) {
      name = ACTIVITY_TYPE_TEXT[entry.Type];
    }
    return name;
  },
  isActivityRecurring: function isActivityRecurring(entry) {
    return entry && (entry.Recurring || entry.RecurrenceState === 'rstOccurrence');
  },
});
export default __class;
