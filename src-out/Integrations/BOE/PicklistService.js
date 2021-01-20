define('crm/Integrations/BOE/PicklistService', ['module', 'exports', 'dojo/_base/lang', 'argos/ErrorManager', 'argos/Store/SData'], function (module, exports, _lang, _ErrorManager, _SData) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _lang2 = _interopRequireDefault(_lang);

  var _ErrorManager2 = _interopRequireDefault(_ErrorManager);

  var _SData2 = _interopRequireDefault(_SData);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var __class = _lang2.default.setObject('crm.Integrations.BOE.PicklistService', {
    _picklists: {},
    _viewMapping: {},
    _store: null,
    contractName: 'system',
    resourceKind: 'picklists',
    include: ['items'],
    select: ['name', 'allowMultiples', 'valueMustExist', 'required', 'alphaSorted', 'noneEditable', 'modifyDate', 'items/text', 'items/code', 'items/number'],
    orderBy: 'name',
    where: '',
    getPicklistByKey: function getPicklistByKey(key) {
      return this._picklists[key];
    },
    getPicklistByName: function getPicklistByName(name) {
      var iterableKeys = Object.keys(this._picklists);
      for (var i = 0; i < iterableKeys.length; i++) {
        if (this._picklists[iterableKeys[i]].name === name) {
          return this._picklists[iterableKeys[i]];
        }
      }
      return false;
    },
    getPicklistItemByCode: function getPicklistItemByCode(picklistName, itemCode) {
      var picklist = this.getPicklistByName(picklistName);

      if (picklist) {
        for (var i = 0; i < picklist.items.length; i++) {
          if (picklist.items[i].code === itemCode) {
            return picklist.items[i];
          }
        }
      }
      return false;
    },
    getPicklistItemTextByCode: function getPicklistItemByCode(picklistName, itemCode) {
      var picklistItem = this.getPicklistItemByCode(picklistName, itemCode);
      if (itemCode && picklistItem) {
        return picklistItem.text;
      }
      return null;
    },
    getViewPicklists: function getViewPicklists(viewId) {
      var picklistIds = this._viewMapping[viewId];
      var picklists = [];
      if (picklistIds && picklistIds.length) {
        for (var i = 0; i < picklistIds.length; i++) {
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
      var _this = this;

      var promise = new Promise(function (resolve, reject) {
        var iterableKeys = Object.keys(_this._picklists);
        var promises = [];
        for (var i = 0; i < iterableKeys.length; i++) {
          promises.push(_this.requestPicklist(iterableKeys[i]));
        }
        Promise.all(promises).then(function () {
          resolve(true);
        }, function (response) {
          reject(response);
        });
      });
      return promise;
    },
    requestPicklist: function requestPicklist(name, options) {
      var _this2 = this;

      var promise = new Promise(function (resolve, reject) {
        var store = _this2.getStore();
        var queryOptions = {
          where: 'name eq \'' + name + '\''
        };
        store.query(null, queryOptions).then(function (data) {
          var picklist = null;
          if (data && data[0] && data[0].items) {
            picklist = data[0];
            picklist.items = picklist.items.$resources;
            _this2._picklists[picklist.name] = picklist;
          }
          resolve(picklist);
        }, function (response, o) {
          _ErrorManager2.default.addError(response, o, options, 'failure');
          reject(response);
        });
      });
      return promise;
    },
    getStore: function getStore() {
      if (!this._store) {
        var options = this.getStoreOptions();
        this._store = new _SData2.default(options);
      }
      return this._store;
    },
    getStoreOptions: function getStoreOptions() {
      var options = {
        service: App.getService(false),
        contractName: this.contractName,
        resourceKind: this.resourceKind,
        include: this.include,
        select: this.select,
        orderBy: this.orderBy,
        where: this.where,
        scope: this
      };
      return options;
    }
  }); /* Copyright 2017 Infor
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

  _lang2.default.setObject('icboe.PicklistService', __class);
  exports.default = __class;
  module.exports = exports['default'];
});