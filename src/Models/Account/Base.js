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

const resource = getResource('accountModel');
const contactResource = getResource('contactModel');
const activityResource = getResource('activityModel');
const historyResource = getResource('historyModel');
const oppResource = getResource('opportunityModel');
const addressResource = getResource('addressModel');
const ticketResource = getResource('ticketModel');

const __class = declare('crm.Models.Account.Base', [_ModelBase], {
  resourceKind: 'accounts',
  entityName: 'Account',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.ACCOUNT,
  iconClass: 'spreadsheet',
  detailViewId: 'account_detail',
  listViewId: 'account_list',
  editViewId: 'account_edit',
  createPicklists: function createPicklists() {
    return this.picklists || (this.picklists = [{
      name: 'Account Type',
      property: 'Type',
    }, {
      name: 'Account Status',
      property: 'Status',
    }, {
      name: 'Industry',
      property: 'Industry',
    }]);
  },
  createRelationships: function createRelationships() {
    const rel = this.relationships || (this.relationships = [{
      name: 'Addresses',
      displayName: addressResource.entityDisplayNamePlural,
      type: 'OneToMany',
      relatedEntity: 'Address',
      relatedProperty: 'EntityId',
    }, {
      name: 'Contacts',
      displayName: contactResource.entityDisplayNamePlural,
      type: 'OneToMany',
      relatedEntity: 'Contact',
      relatedProperty: 'Account',
      relatedPropertyType: 'object',
    }, {
      name: 'History',
      displayName: historyResource.entityDisplayNamePlural,
      type: 'OneToMany',
      relatedEntity: 'History',
      relatedProperty: 'AccountId',
      where: 'Type ne "atDatabaseChange"',
    }, {
      name: 'Activities',
      displayName: activityResource.entityDisplayNamePlural,
      type: 'OneToMany',
      relatedEntity: 'Activity',
      relatedProperty: 'AccountId',
    }, {
      name: 'Opportunities',
      displayName: oppResource.entityDisplayNamePlural,
      type: 'OneToMany',
      relatedEntity: 'Opportunity',
      relatedProperty: 'Account',
      relatedPropertyType: 'object',
    }, {
      name: 'Tickets',
      displayName: ticketResource.entityDisplayNamePlural,
      type: 'OneToMany',
      relatedEntity: 'Ticket',
      relatedProperty: 'Account',
      relatedPropertyType: 'object',
    }]);
    return rel;
  },
});
export default __class;
