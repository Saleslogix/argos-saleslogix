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

/**
 * @module crm/PicklistService
 */
import lang from 'dojo/_base/lang';
import ErrorManager from 'argos/ErrorManager';
import SData from 'argos/Store/SData';

const PickListService = ICRMServicesSDK.PickListService;
const picklistFormat = ICRMCommonSDK.format.picklist;

/**
 * @class
 * @alias module:crm/PicklistService
 * @static
 */
const __class = lang.setObject('crm.PicklistService', /** @lends module:crm/PicklistService */{
  _picklists: {},
  _currentRequests: new Map(),

  // Previous properties
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

  init(service, storage) {
    this.service = new PickListService(storage, service);
  },
  getPicklistByKey(key) {
    return this.getPicklistByName(key);
  },
  getPicklistByName(name, languageCode) {
    if (languageCode) {
      const picklist = this._picklists[`${name}_${languageCode}`];
      if (picklist) {
        return picklist;
      }
    }
    return this._picklists[name] || false;
  },
  getPicklistItemByKey(picklistName, key, languageCode = App.getCurrentLocale()) {
    const picklist = this.getPicklistByName(picklistName, languageCode);

    if (picklist) {
      for (let i = 0; i < picklist.items.length; i++) {
        if (picklist.items[i].$key === key) {
          return picklist.items[i];
        }
      }
    }
    return false;
  },
  getPicklistItemByCode(picklistName, itemCode, languageCode = App.getCurrentLocale()) {
    const picklist = this.getPicklistByName(picklistName, languageCode);

    if (picklist) {
      for (let i = 0; i < picklist.items.length; i++) {
        if (picklist.items[i].code === itemCode) {
          return picklist.items[i];
        }
      }
    }
    return false;
  },
  getPicklistItemByText(picklistName, text) {
    const picklist = this.getPicklistByName(picklistName, '');

    if (picklist) {
      for (let i = 0; i < picklist.items.length; i++) {
        if (picklist.items[i].text === text) {
          return picklist.items[i];
        }
      }
    }
    return false;
  },
  getPicklistItemTextByCode(picklistName, itemCode, languageCode = App.getCurrentLocale()) {
    const picklistItem = this.getPicklistItemByCode(picklistName, itemCode, languageCode);
    if (itemCode && picklistItem) {
      return picklistItem.text;
    }
    return null;
  },
  getPicklistItemTextByKey(picklistName, key, languageCode = App.getCurrentLocale()) {
    const picklistItem = this.getPicklistItemByKey(picklistName, key, languageCode);
    if (key && picklistItem) {
      return picklistItem.text;
    }
    return null;
  },
  format(picklistCode /* , storageMode */) {
    const picklist = this.getPicklistByName(picklistCode);
    return picklistFormat(picklist);
  },
  registerPicklist(code, picklist) {
    if (!this._picklists[code]) {
      this._picklists[code] = picklist;
    }
  },
  requestPicklistsFromArray(picklists) {
    const promise = new Promise((resolve, reject) => {
      const promises = [];
      for (let i = 0; i < picklists.length; i++) {
        promises.push(this.requestPicklist(picklists[i].name, picklists[i].options));
      }
      Promise.all(promises).then(() => {
        resolve(true);
      }, (response) => {
        reject(response);
      });
    });
    return promise;
  },
  onPicklistSuccess(resolve, languageCode, name) {
    return (result) => {
      let picklist = null;
      if (result && result.items) {
        picklist = result;
        picklist.items = picklist.items.$resources.map(item => Object.assign({}, item, { id: item.$key }));
        if (languageCode) {
          this._picklists[`${picklist.name}_${languageCode}`] = picklist;
        } else {
          this._picklists[picklist.name] = picklist;
        }
      }
      this.removeRequest(name);
      resolve(picklist);
    };
  },
  onPicklistError(reject, name) {
    return (response, o) => {
      this.removeRequest(name);
      ErrorManager.addError(response, o, null, 'failure');
      reject(response);
    };
  },
  requestPicklist(name, queryOptions = {}) {
    // Avoid duplicating model requests
    if (this.hasRequest(name)) {
      return new Promise(resolve => resolve());
    }

    const pickListServiceOptions = Object.assign({}, {
      storageMode: 'code',
    }, queryOptions);
    const language = this.determineLanguage(pickListServiceOptions, queryOptions);
    const useCache = typeof queryOptions.useCache === 'boolean' ? queryOptions.useCache : true;

    return new Promise((resolve, reject) => {
      this.addRequest(name);
      const first = this.service.getFirstByName(
        name,
        this.onPicklistSuccess(resolve, language, name),
        this.onPicklistError(reject, name),
        { pickListServiceOptions, language, useCache }
      );

      if (first && first.options) {
        const request = this.service.setUpRequest(
          new Sage.SData.Client.SDataResourceCollectionRequest(App.getService(false))
            .setContractName(this.contractName),
          first.options
        );
        request.read(first.handlers);
      }
    }).catch(err => console.error(err)); // eslint-disable-line
  },
  determineLanguage(serviceOptions, queryOptions) {
    if (serviceOptions.filterByLanguage) {
      return (queryOptions.language && queryOptions.language.trim())
          || App.getCurrentLocale();
    }
    if (serviceOptions.filterByLanguage === false) {
      // This means disable fallback
      // Used for Name Prefix and Suffix we only want the filtered picklist.
      return queryOptions.language && queryOptions.language.trim() || ' ';
    }
    return queryOptions.language && queryOptions.language.trim() || App.getCurrentLocale();
  },

  /**
   * Simple requestMap to optimize requests to avoid overlap from model requests
   */
  addRequest(name) {
    return this._currentRequests.set(name, true);
  },
  removeRequest(name) {
    return this._currentRequests.delete(name);
  },
  hasRequest(name) {
    return this._currentRequests.has(name);
  },

  // Previous functions
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
  registerPicklistToView: function registerPicklistToView(code, viewId) {
    if (!this._viewMapping[viewId]) {
      this._viewMapping[viewId] = [];
    }
    if (!this._viewMapping[viewId][code]) {
      this._viewMapping[viewId].push(code);
    } else {
      console.log('Picklist already exists for view "' + viewId + '"'); // eslint-disable-line
    }
    this.registerPicklist(code, true);
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

// Backwards compatibility
lang.setObject('crm.Integrations.BOE.PicklistService', __class);
lang.setObject('icboe.PicklistService', __class);
export default __class;
