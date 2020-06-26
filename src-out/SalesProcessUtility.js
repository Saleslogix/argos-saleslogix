define("crm/SalesProcessUtility", ["exports", "dojo/_base/lang", "dojo/when", "dojo/_base/Deferred", "argos/Store/SData"], function (_exports, _lang, _when, _Deferred, _SData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _lang = _interopRequireDefault(_lang);
  _when = _interopRequireDefault(_when);
  _Deferred = _interopRequireDefault(_Deferred);
  _SData = _interopRequireDefault(_SData);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

  /**
   * @class
   * @alias module:crm/SalesProcessUtility
   * @static
   */
  var __class = _lang["default"].setObject('crm.SalesProcessUtility',
  /** @lends module:crm/SalesProcessUtility */
  {
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
      var store = new _SData["default"](options);
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
      var deferred = new _Deferred["default"]();
      var store = this.getStore();
      var options = {
        where: "EntityId eq \"".concat(entityId, "\"")
      };
      var queryResults = store.query(null, options);
      (0, _when["default"])(queryResults, function (feed) {
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

  var _default = __class;
  _exports["default"] = _default;
});