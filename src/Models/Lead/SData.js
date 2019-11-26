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
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPE from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Models.Lead.SData', [Base, _SDataModelBase], {
  id: 'lead_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'LastNameUpper,FirstName',
      querySelect: [
        'Company',
        'LeadNameLastFirst',
        'WebAddress',
        'Email',
        'WorkPhone',
        'Mobile',
        'TollFree',
        'Title',
        'ModifyDate',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'Address/*',
        'BusinessDescription',
        'Company',
        'CreateDate',
        'CreateUser',
        'Email',
        'FirstName',
        'FullAddress',
        'Industry',
        'Interests',
        'LastName',
        'LeadNameLastFirst',
        'LeadNameFirstLast',
        'LeadSource/Description',
        'MiddleName',
        'Mobile',
        'Notes',
        'Owner/OwnerDescription',
        'Prefix',
        'SICCode',
        'Suffix',
        'Title',
        'TollFree',
        'WebAddress',
        'WorkPhone',
      ],
      queryInclude: [
        '$permissions',
      ],
    }];
  },
  getEntry: function getEntry(/* options */) {
    const results$ = this.inherited(getEntry, arguments);
    return results$.then((entry) => {
      return new Promise((resolve) => {
        Promise.all([App.picklistService.requestPicklist('Name Prefix', {
          language: ' ',
        }), App.picklistService.requestPicklist('Name Suffix', {
          language: ' ',
        }), App.picklistService.requestPicklist('Title', {
          language: ' ',
        })]).then(() => {
          resolve(entry);
        });
      });
    });
  },
});

Manager.register(MODEL_NAMES.LEAD, MODEL_TYPE.SDATA, __class);
export default __class;
