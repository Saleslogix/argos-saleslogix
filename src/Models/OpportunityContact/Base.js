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

const resource = getResource('opportunityContactModel');
const contactResource = getResource('contactModel');
const opportunityResource = getResource('opportunityModel');

const __class = declare('crm.Models.OpportunityContact.Base', [_ModelBase], {
  entityName: 'OpportunityContact',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  iconClass: 'user',
  resourceKind: 'opportunityContacts',
  modelName: MODEL_NAMES.OPPORTUNITYCONTACT,
  security: 'Entities/Contact/View',

  createPicklists: function createPicklists() {
    return this.picklists || (this.picklists = [{
      name: 'Role',
      property: 'SalesRole',
    }, {
      name: 'Standing',
      property: 'Standing',
    }]);
  },
  createRelationships: function createRelationships() {
    const rel = this.relationships || (this.relationships = [{
      name: 'Contact',
      displayName: contactResource.entityDisplayName,
      type: 'OneToOne',
      relatedEntity: 'Contact',
      relatedProperty: 'ContactId',
    }, {
      name: 'Opportunity',
      displayName: opportunityResource.entityDisplayNamePlural,
      type: 'OneToOne',
      relatedEntity: 'Opportunity',
      relatedProperty: 'OpportunityId',
    }]);
    return rel;
  },
});
export default __class;
