import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import ACTIVITY_TYPE_TEXT from './ActivityTypeText';
import ACTIVITY_TYPE_ICON from './ActivityTypeIcon';

const resource = window.localeContext.getEntitySync('activityModel').attributes;

const __class = declare('crm.Models.Activity.Base', [_ModelBase], {
  modelName: MODEL_NAMES.ACTIVITY,
  entityName: 'Activity',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  iconClass: 'fa fa-list-ul fa-2x',
  resourceKind: 'activities',
  contractName: 'system',
  recurringActivityIdSeparator: ';',

  createRelationships: function createRelationships() {
    let rel;
    rel = this.relationships || (this.relationships = [ {
      name: 'Account',
      displayName: 'Account',
      type: 'ManyToOne',
      parentProperty: 'AccountId',
      relatedEntity: 'Account',
    }, {
      name: 'Contact',
      displayName: 'Contacts',
      type: 'ManyToOne',
      parentProperty: 'ContactId',
      relatedEntity: 'Contact',
    }, {
      name: 'Ticket',
      displayName: 'Ticket',
      type: 'ManyToOne',
      parentProperty: 'TicketId',
      relatedEntity: 'Ticket',
    }, {
      name: 'Opportunity',
      displayName: 'Opportunity',
      type: 'ManyToOne',
      parentProperty: 'OpportunityId',
      relatedEntity: 'Opportunity',
    }, {
      name: 'Lead',
      displayName: 'Lead',
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
        cls = cls + ' fa-2x';
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
});
export default __class;
