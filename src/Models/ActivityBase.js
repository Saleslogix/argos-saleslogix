import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from './Names';

const __class = declare('crm.Models.ActivityBase', [_ModelBase], {
  modelName: MODEL_NAMES.ACTIVITY,
  entityName: 'Activity',
  entityDisplayName: 'Activity',
  entityDisplayNamePlural: 'Activities',
  iconClass: 'fa fa-list-ul fa-2x',
  resourceKind: 'activities',
  contractName: 'system',
  recurringActivityIdSeparator: ';',
  activityIndicatorIconByType: {
    'atToDo': 'fa fa-list-ul',
    'atPhoneCall': 'fa fa-phone',
    'atAppointment': 'fa fa-calendar-o',
    'atLiterature': 'fa fa-book',
    'atPersonal': 'fa fa-check-square-o',
    'atQuestion': 'fa fa-question-circle',
    'atNote': 'fa fa-file-text-o',
    'atEMail': 'fa fa-envelope',
  },
  activityTypeText: {
    'atToDo': 'To-Do',
    'atPhoneCall': 'Phone Call',
    'atAppointment': 'Meeting',
    'atLiterature': 'Lit Request',
    'atPersonal': 'Personal',
    'atQuestion': 'Question',
    'atNote': 'Note',
    'atEMail': 'Email',
  },
  createRelationships: function createRelationships() {
    let rel;
    rel = this.relationships || (this.relationships = [ {
      name: 'Account',
      displayName: 'Account',
      propertyName: 'Account',
      type: 'ManyToOne',
      parentEntity: 'Activity',
      parentProperty: 'AccountId',
      childEntity: 'Account',
      childProperty: 'AccountId',
      childDataPath: 'Id',
      queryModelName: 'detail',
    }, {
      name: 'Contact',
      displayName: 'Contacts',
      propertyName: 'Contact',
      type: 'ManyToOne',
      parentEntity: 'Activity',
      parentProperty: 'ContactId',
      childEntity: 'Contact',
      childProperty: 'ContactId',
      childDataPath: 'Id',
      queryModelName: 'detail',
    }, {
      name: 'Ticket',
      displayName: 'Ticket',
      propertyName: 'Ticket',
      type: 'ManyToOne',
      parentEntity: 'Activity',
      parentProperty: 'TicketId',
      childEntity: 'Ticket',
      childProperty: 'TicketId',
      childDataPath: 'Id',
      queryModelName: 'detail',
    }, {
      name: 'Opportunity',
      displayName: 'Opportunity',
      propertyName: 'Opportunnity',
      type: 'ManyToOne',
      parentEntity: 'Activity',
      parentProperty: 'OpportunityId',
      childEntity: 'OpportunityId',
      childProperty: 'OpportunityId',
      childDataPath: 'Id',
      queryModelName: 'detail',
    }, {
      name: 'Lead',
      displayName: 'Lead',
      propertyName: 'Lead',
      type: 'ManyToOne',
      parentEntity: 'Activity',
      parentProperty: 'LeadId',
      childEntity: 'Lead',
      childProperty: 'LeadId',
      childDataPath: 'Id',
      queryModelName: 'detail',
    }]);
    return rel;
  },
  getIconClass: function getIconClass(entry) {
    let cls = this.iconClass;
    if (entry && entry.Type) {
      cls = this.activityIndicatorIconByType[entry.Type];
      if (cls) {
        cls = cls + ' fa-2x';
      }
    }
    return cls;
  },
  getTypeText: function getTypeText(entry) {
    let name = '';
    if (entry && entry.Type) {
      name = this.activityTypeText[entry.Type];
    }
    return name;
  },
});
export default __class;
