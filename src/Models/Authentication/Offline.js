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
import _OfflineModelBase from 'argos/Models/_OfflineModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import Deferred from 'dojo/Deferred';
import convert from 'argos/Convert';
import getResource from 'argos/I18n';


const resource = getResource('autenticationModel');

const __class = declare('crm.Models.Autentication.Offline', [_OfflineModelBase], {
  id: 'auth_offline_model',
  entityName: 'Authentication',
  modelName: 'Authentication',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  isSystem: true,
  createEntry: function createEntity(userId) {
    const entity = {}; // need to dynamicly create Properties;
    entity.$key = 'Auth_00000000000';
    entity.$descriptor = resource.entityDisplayName;
    entity.CreateDate = moment().toDate();
    entity.ModifyDate = moment().toDate();
    entity.UserId = userId;
    return entity;
  },
  initAuthentication: function initAuthentication(userId) {
    const def = new Deferred();
    const result = {
      entry: null,
      hasUserChanged: false,
      hasAuthenticatedToday: false,
    };
    this.getEntry('Auth_00000000000').then((entry) => {
      if (entry) {
        if (entry.UserId === userId) {
          result.hasUserChanged = false;
          result.hasAuthenticatedToday = this._hasAuthenticatedToday(entry);
        } else {
          result.hasUserChanged = true;
          result.hasAuthenticatedToday = false;
          entry.UserId = userId;
        }
        entry.ModifyDate = moment().toDate();
        result.entry = entry;
      }
      def.resolve(result);
    }, () => {
      const newEntry = this.createEntry(userId);
      this.insertEntry(newEntry);
      result.hasUserChanged = true;
      result.hasAuthenticatedToday = false;
      result.entry = newEntry;
      def.resolve(result);
    });
    return def.promise;
  },
  _hasAuthenticatedToday: function _hasAuthenticatedToday(entry) {
    if (entry.ModifyDate) {
      const currentDate = moment();
      const authDate = moment(convert.toDateFromString(entry.ModifyDate));
      if (authDate.isAfter(currentDate.startOf('day')) && authDate.isBefore(moment().endOf('day'))) {
        return true;
      }
    }
    return false;
  },
});

Manager.register('Authentication', MODEL_TYPES.OFFLINE, __class);
export default __class;
