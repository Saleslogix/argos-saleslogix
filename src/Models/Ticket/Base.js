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
  iconClass: 'expense-report',
  resourceKind: 'tickets',
  security: 'Entities/Ticket/View',
  modelName: MODEL_NAMES.TICKET,

  createPicklists: function createPicklists() {
    return this.picklists || (this.picklists = [{
      name: 'Source',
      property: 'ViaCode',
    }, {
      name: 'Ticket Status',
      property: 'StatusCode',
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
