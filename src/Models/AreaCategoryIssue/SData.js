/* Copyright 2021 Infor
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
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

function assignKeyDescriptor(values) {
  return values.map((v) => {
    return {
      $key: v,
      $descriptor: v,
    };
  });
}

const __class = declare('crm.Models.Integration.SData', [Base, _SDataModelBase], {
  id: 'areacategoryissue_sdata_model',
  getDistinctAreas: function getDistinctAreas() {
    const request = new Sage.SData.Client.SDataServiceOperationRequest(App.getService())
      .setResourceKind(this.resourceKind)
      .setOperationName('GetDistinctAreas');
    const entry = {
    };
    return new Promise((resolve, reject) => {
      request.execute(entry, {
        success: (data) => {
          const { response: { Result } } = data;
          resolve(assignKeyDescriptor(Result));
        },
        failure: (response) => {
          reject(response);
        },
      });
    });
  },
  getDistinctAreaCategories: function getDistinctAreaCategories(area = '') {
    const request = new Sage.SData.Client.SDataServiceOperationRequest(App.getService())
      .setResourceKind(this.resourceKind)
      .setOperationName('GetDistinctAreaCategories');
    const entry = {
      request: {
        area,
      },
    };
    return new Promise((resolve, reject) => {
      request.execute(entry, {
        success: (data) => {
          const { response: { Result } } = data;
          resolve(assignKeyDescriptor(Result));
        },
        failure: (response) => {
          reject(response);
        },
      });
    });
  },
  getDistinctAreaCategoryIssues: function getDistinctAreaCategoryIssues(area = '', category = '') {
    const request = new Sage.SData.Client.SDataServiceOperationRequest(App.getService())
      .setResourceKind(this.resourceKind)
      .setOperationName('GetDistinctAreaCategoryIssues');
    const entry = {
      request: {
        area,
        category,
      },
    };
    return new Promise((resolve, reject) => {
      request.execute(entry, {
        success: (data) => {
          const { response: { Result } } = data;
          resolve(assignKeyDescriptor(Result));
        },
        failure: (response) => {
          reject(response);
        },
      });
    });
  },
  getEntries: function getEntries(queryExpression, queryOptions) {
    const { area, category } = queryOptions;
    switch (queryExpression) {
      case 'area':
        return this.getDistinctAreas();
      case 'category':
        return this.getDistinctAreaCategories(area);
      case 'issue':
        return this.getDistinctAreaCategoryIssues(area, category);
      default:
        throw new Error('Invalid queryExpression');
    }
  },
});

Manager.register(MODEL_NAMES.AREACATEGORYISSUE, MODEL_TYPES.SDATA, __class);
export default __class;
