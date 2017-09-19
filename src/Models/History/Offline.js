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
import _OfflineModelBase from 'argos/Models/_OfflineModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';


const __class = declare('crm.Models.History.Offline', [Base, _OfflineModelBase], {
  id: 'history_offline_model',
  deleteEntry: function deleteEntry(entry) {
    return new Promise((resolve, reject) => {
      const store = this.getStore();
      store.query((doc, emit) => {
        if (doc.entityName === this.entityName && doc.entity && doc.entity.entityId === null || typeof doc.entity.entityId === 'undefined') {
          if (doc.entity.UID === entry.UID) {
            emit(doc);
          }
        }
      }).then((docs) => {
        if (docs && docs.length === 1) {
          const doc = docs[0];
          this._removeDoc(doc.key).then((result) => {
            this.onEntryDelete(entry);
            resolve(result);
          }, (err) => {
            reject(err);
          });
        } else {
          reject('No entry to delete.');
        }
      }, (err) => {
        reject(err);
      });
    });
  },
});


Manager.register(MODEL_NAMES.HISTORY, MODEL_TYPES.OFFLINE, __class);
export default __class;
