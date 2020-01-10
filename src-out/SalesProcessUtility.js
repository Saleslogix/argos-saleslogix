define('crm/SalesProcessUtility', ['module', 'exports', 'dojo/_base/lang', 'dojo/when', 'dojo/_base/Deferred', 'argos/Store/SData'], function (module, exports, _lang, _when, _Deferred, _SData) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _lang2 = _interopRequireDefault(_lang);

  var _when2 = _interopRequireDefault(_when);

  var _Deferred2 = _interopRequireDefault(_Deferred);

  var _SData2 = _interopRequireDefault(_SData);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @class
   * @alias module:crm/SalesProcessUtility
   * @static
   */
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
  var __class = _lang2.default.setObject('crm.SalesProcessUtility', /** @lends module:crm/SalesProcessUtility */{
    store: null,
    service: null,
    contractName: 'dynamic',
    resourceKind: 'salesProcesses',
    queryInclude: ['$permissions'],
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
      var options = this.getStoreOptions();
      var store = new _SData2.default(options);
      return store;
    },
    getStoreOptions: function getStoreOptions() {
      var options = {
        service: App.getService(false),
        contractName: this.contractName,
        resourceKind: this.resourceKind,
        include: this.queryInclude,
        select: this.querySelect,
        orderBy: this.queryOrderBy,
        where: this.queryWhere,
        start: 0,
        count: this.maxItems,
        scope: this
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
      var deferred = new _Deferred2.default();
      var store = this.getStore();
      var options = {
        where: 'EntityId eq "' + entityId + '"'
      };
      var queryResults = store.query(null, options);
      (0, _when2.default)(queryResults, function (feed) {
        var salesProcess = null;
        if (feed && feed.length > 0) {
          salesProcess = feed[0];
        }
        deferred.resolve(salesProcess);
      }, function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }
  });
  exports.default = __class;
  module.exports = exports['default'];
});