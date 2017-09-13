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

import lang from 'dojo/_base/lang';
import ErrorManager from 'argos/ErrorManager';
import SData from 'argos/Store/SData';

const __class = lang.setObject('crm.Integrations.BOE.PicklistService', {
  _picklists: {},
  _viewMapping: {},
  _store: null,
  contractName: 'system',
  resourceKind: 'picklists',
  include: ['items'],
  select: [
    'name',
    'allowMultiples',
    'valueMustExist',
    'required',
    'alphaSorted',
    'noneEditable',
    'modifyDate',
    'items/text',
    'items/code',
    'items/number',
  ],
  orderBy: 'name',
  where: '',
  getPicklistByKey: function getPicklistByKey(key) {
    return this._picklists[key];
  },
  getPicklistByName: function getPicklistByName(name) {
    const iterableKeys = Object.keys(this._picklists);
    for (let i = 0; i < iterableKeys.length; i++) {
      if (this._picklists[iterableKeys[i]].name === name) {
        return this._picklists[iterableKeys[i]];
      }
    }
    return false;
  },
  getPicklistItemByCode: function getPicklistItemByCode(picklistName, itemCode) {
    const picklist = this.getPicklistByName(picklistName);

    if (picklist) {
      for (let i = 0; i < picklist.items.length; i++) {
        if (picklist.items[i].code === itemCode) {
          return picklist.items[i];
        }
      }
    }
    return false;
  },
  getPicklistItemTextByCode: function getPicklistItemByCode(picklistName, itemCode) {
    const picklistItem = this.getPicklistItemByCode(picklistName, itemCode);
    if (itemCode && picklistItem) {
      return picklistItem.text;
    }
    return null;
  },
  getViewPicklists: function getViewPicklists(viewId) {
    const picklistIds = this._viewMapping[viewId];
    const picklists = [];
    if (picklistIds && picklistIds.length) {
      for (let i = 0; i < picklistIds.length; i++) {
        if (this._picklists[picklistIds[i]]) {
          picklists.push(this._picklists[picklistIds[i]]);
        } else {
          console.warn('Picklist "' + picklistIds[i] + '" has not been registered'); // eslint-disable-line
        }
      }
      return picklists;
    }
    return null;
  },
  registerPicklist: function registerPicklist(key, picklist) {
    if (!this._picklists[key]) {
      this._picklists[key] = picklist;
    }
  },
  registerPicklistToView: function registerPicklistToView(key, viewId) {
    if (!this._viewMapping[viewId]) {
      this._viewMapping[viewId] = [];
    }
    if (!this._viewMapping[viewId][key]) {
      this._viewMapping[viewId].push(key);
    } else {
      console.log('Picklist already exists for view "' + viewId + '"'); // eslint-disable-line
    }
    this.registerPicklist(key, true);
  },
  // Will request the registered picklists in this._picklists
  requestPicklists: function requestPicklists() {
    const promise = new Promise((resolve, reject) => {
      const iterableKeys = Object.keys(this._picklists);
      const promises = [];
      for (let i = 0; i < iterableKeys.length; i++) {
        promises.push(this.requestPicklist(iterableKeys[i]));
      }
      Promise.all(promises).then(() => {
        resolve(true);
      }, (response) => {
        reject(response);
      });
    });
    return promise;
  },
  requestPicklist: function requestPicklist(name, options) {
    const promise = new Promise((resolve, reject) => {
      const store = this.getStore();
      const queryOptions = {
        where: `name eq '${name}'`,
      };
      store.query(null, queryOptions).then((data) => {
        let picklist = null;
        if (data && data[0] && data[0].items) {
          picklist = data[0];
          picklist.items = picklist.items.$resources;
          this._picklists[picklist.name] = picklist;
        }
        resolve(picklist);
      }, (response, o) => {
        ErrorManager.addError(response, o, options, 'failure');
        reject(response);
      });
    });
    return promise;
  },
  getStore: function getStore() {
    if (!this._store) {
      const options = this.getStoreOptions();
      this._store = new SData(options);
    }
    return this._store;
  },
  getStoreOptions: function getStoreOptions() {
    const options = {
      service: App.getService(false),
      contractName: this.contractName,
      resourceKind: this.resourceKind,
      include: this.include,
      select: this.select,
      orderBy: this.orderBy,
      where: this.where,
      scope: this,
    };
    return options;
  },
});
lang.setObject('icboe.PicklistService', __class);
export default __class;
