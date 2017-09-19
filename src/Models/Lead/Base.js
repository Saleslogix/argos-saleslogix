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

const resource = getResource('leadModel');
const activityResource = getResource('activityModel');
const historyResource = getResource('historyModel');
const addressResource = getResource('addressModel');


const __class = declare('crm.Models.Lead.Base', [_ModelBase], {
  resourceKind: 'leads',
  entityName: 'Lead',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  iconClass: 'filter',
  security: 'Entities/Lead/View',
  modelName: MODEL_NAMES.LEAD,
  createPicklists: function createPicklists() {
    return this.picklists || (this.picklists = [{
      name: 'Title',
      property: 'Title',
      // TODO: Add once Title is a code picklist
      // options: {
      //   filterByLanguage: false,
      //   language: ' ',
      // },
    }, {
      name: 'Industry',
      property: 'Industry',
    }, {
      name: 'Name Prefix',
      options: {
        filterByLanguage: false,
        language: ' ',
        storageMode: 'text',
      },
    }, {
      name: 'Name Suffix',
      options: {
        filterByLanguage: false,
        language: ' ',
        storageMode: 'text',
      },
    }]);
  },
  createRelationships: function createRelationships() {
    const rel = this.relationships || (this.relationships = [{
      name: 'Addresses',
      displayName: addressResource.entityDisplayNamePlural,
      propertyName: 'Addresses',
      type: 'OneToMany',
      relatedEntity: 'LeadAddress',
      relatedProperty: 'LeadId',
    }, {
      name: 'History',
      displayName: historyResource.entityDisplayNamePlural,
      propertyName: 'History',
      type: 'OneToMany',
      relatedEntity: 'History',
      relatedProperty: 'LeadId',
      where: 'Type ne "atDatabaseChange"',
    }, {
      name: 'Activity',
      displayName: activityResource.entityDisplayNamePlural,
      propertyName: 'Activity',
      type: 'OneToMany',
      relatedEntity: 'Activity',
      relatedProperty: 'LeadId',
    }]);
    return rel;
  },
});
export default __class;
