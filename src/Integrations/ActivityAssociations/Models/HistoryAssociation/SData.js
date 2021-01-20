/* Copyright 2020 Infor
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

const __class = declare('crm.Integrations.ActivityAssociations.Models.HistoryAssociation.SData', [Base, _SDataModelBase], {
  id: 'history_association_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'EntityName',
      querySelect: [
        'EntityType',
        'EntityId',
        'EntityName',
        'IsPrimary',
        'HistoryId',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'EntityType',
        'EntityId',
        'EntityName',
        'IsPrimary',
        'HistoryId',
      ],
      queryInclude: [
        '$permissions',
      ],
    }, {
      name: 'edit',
      querySelect: [
        'EntityType',
        'EntityId',
        'EntityName',
        'IsPrimary',
        'HistoryId',
      ],
      queryInclude: [
        '$permissions',
      ],
    }];
  },
});

Manager.register(MODEL_NAMES.HISTORYASSOCIATION, MODEL_TYPES.SDATA, __class);
export default __class;
