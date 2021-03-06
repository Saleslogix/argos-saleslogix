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
 * @module crm/SalesProcessUtility
 */
import lang from 'dojo/_base/lang';
import when from 'dojo/when';
import Deferred from 'dojo/_base/Deferred';
import SData from 'argos/Store/SData';

/**
 * @class
 * @alias module:crm/SalesProcessUtility
 * @static
 */
const __class = lang.setObject('crm.SalesProcessUtility', /** @lends module:crm/SalesProcessUtility */{
  store: null,
  service: null,
  contractName: 'dynamic',
  resourceKind: 'salesProcesses',
  queryInclude: [
    '$permissions',
  ],
  querySelect: ['Name', 'EntityId'],
  queryOrderBy: '',
  queryWhere: '',
  maxItems: 100,

  getStore: function getStore() {
    if (!this.store) {
      this.store = this.createStore();
    }
    return this.store;
  },
  createStore: function createStore() {
    const options = this.getStoreOptions();
    const store = new SData(options);
    return store;
  },
  getStoreOptions: function getStoreOptions() {
    const options = {
      service: App.getService(false),
      contractName: this.contractName,
      resourceKind: this.resourceKind,
      include: this.queryInclude,
      select: this.querySelect,
      orderBy: this.queryOrderBy,
      where: this.queryWhere,
      start: 0,
      count: this.maxItems,
      scope: this,
    };
    return options;
  },
  /**
   * Returns an promise with sales process entry.
   * @param {Object} options Options for creating the request
   * @param {String} entitiyId
   *
   */
  getSalesProcessByEntityId: function getSalesProcessByEntityId(entityId) {
    const deferred = new Deferred();
    const store = this.getStore();
    const options = {
      where: `EntityId eq "${entityId}"`,
    };
    const queryResults = store.query(null, options);
    when(queryResults, (feed) => {
      let salesProcess = null;
      if (feed && feed.length > 0) {
        salesProcess = feed[0];
      }
      deferred.resolve(salesProcess);
    }, (err) => {
      deferred.reject(err);
    });
    return deferred.promise;
  },
});
export default __class;
