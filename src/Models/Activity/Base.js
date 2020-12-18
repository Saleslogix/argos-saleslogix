/* Copyright 2017 Infor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import ACTIVITY_TYPE_TEXT from './ActivityTypeText';
import ACTIVITY_TYPE_ICON from './ActivityTypeIcon';
import getResource from 'argos/I18n';

const resource = getResource('activityModel');
const attendeeResource = getResource('activityAttendeeModel');
const accountResource = getResource('accountModel');
const contactResource = getResource('contactModel');
const oppResource = getResource('opportunityModel');
const ticketResource = getResource('ticketModel');
const leadResource = getResource('leadModel');
const activityTypeResource = getResource('activityTypeText');

const __class = declare('crm.Models.Activity.Base', [_ModelBase], {
  modelName: MODEL_NAMES.ACTIVITY,
  entityName: 'Activity',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  iconClass: 'bullet-list',
  resourceKind: 'activities',
  contractName: 'system',
  recurringActivityIdSeparator: ';',

  activityTypeText: {
    atToDo: activityTypeResource.atToDoText,
    atPhoneCall: activityTypeResource.atPhoneCallText,
    atAppointment: activityTypeResource.atAppointmentText,
    atLiterature: activityTypeResource.atLiteratureText,
    atPersonal: activityTypeResource.atPersonalText,
    atQuestion: activityTypeResource.atQuestionText,
    atNote: activityTypeResource.atNoteText,
    atEMail: activityTypeResource.atEMailText,
  },

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
    }, {
      name: 'ActivityAttendees',
      displayName: attendeeResource.entityDisplayName,
      type: 'OneToMany',
      relatedEntity: 'ActivityAttendee',
      relatedProperty: 'ActivityId',
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
  getEntityDescription: function getEntityDescription(entry) {
    if (entry) {
      const type = entry.Type || '';
      const titleText = this.activityTypeText[type] ? `${this.activityTypeText[type]} - ${entry.Description}` : entry.$descriptor;
      return titleText;
    }
    return '';
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
