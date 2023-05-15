define('crm/PicklistService', ['module', 'exports', 'dojo/_base/lang', 'argos/ErrorManager', 'argos/Store/SData'], function (module, exports, _lang, _ErrorManager, _SData) {
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

  var PickListService = ICRMServicesSDK.PickListService; /* Copyright 2017 Infor
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

  var picklistFormat = ICRMCommonSDK.format.picklist;

  /**
   * @class
   * @alias module:crm/PicklistService
   * @static
   */
  var __class = _lang2.default.setObject('crm.PicklistService', /** @lends module:crm/PicklistService */{
    _picklists: {},
    _currentRequests: new Map(),

    // Previous properties
    _viewMapping: {},
    _store: null,
    contractName: 'system',
    resourceKind: 'picklists',
    include: ['items'],
    select: ['name', 'allowMultiples', 'valueMustExist', 'required', 'alphaSorted', 'noneEditable', 'modifyDate', 'items/text', 'items/code', 'items/number'],
    orderBy: 'name',
    where: '',

    init: function init(service, storage) {
      this.service = new PickListService(storage, service);
    },
    getPicklistByKey: function getPicklistByKey(key) {
      return this.getPicklistByName(key);
    },
    getPicklistByName: function getPicklistByName(name, languageCode) {
      if (languageCode) {
        var picklist = this._picklists[name + '_' + languageCode];
        if (picklist) {
          return picklist;
        }
      }
      return this._picklists[name] || false;
    },
    getPicklistItemByKey: function getPicklistItemByKey(picklistName, key) {
      var languageCode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : App.getCurrentLocale();

      var picklist = this.getPicklistByName(picklistName, languageCode);

      if (picklist) {
        for (var i = 0; i < picklist.items.length; i++) {
          if (picklist.items[i].$key === key) {
            return picklist.items[i];
          }
        }
      }
      return false;
    },
    getPicklistItemByCode: function getPicklistItemByCode(picklistName, itemCode) {
      var languageCode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : App.getCurrentLocale();

      var picklist = this.getPicklistByName(picklistName, languageCode);

      if (picklist) {
        for (var i = 0; i < picklist.items.length; i++) {
          if (picklist.items[i].code === itemCode) {
            return picklist.items[i];
          }
        }
      }
      return false;
    },
    getPicklistItemByText: function getPicklistItemByText(picklistName, text) {
      var picklist = this.getPicklistByName(picklistName, '');

      if (picklist) {
        for (var i = 0; i < picklist.items.length; i++) {
          if (picklist.items[i].text === text) {
            return picklist.items[i];
          }
        }
      }
      return false;
    },
    getPicklistItemTextByCode: function getPicklistItemTextByCode(picklistName, itemCode) {
      var languageCode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : App.getCurrentLocale();

      var picklistItem = this.getPicklistItemByCode(picklistName, itemCode, languageCode);
      if (itemCode && picklistItem) {
        return picklistItem.text;
      }
      return null;
    },
    getPicklistItemTextByKey: function getPicklistItemTextByKey(picklistName, key) {
      var languageCode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : App.getCurrentLocale();

      var picklistItem = this.getPicklistItemByKey(picklistName, key, languageCode);
      if (key && picklistItem) {
        return picklistItem.text;
      }
      return null;
    },
    format: function format(picklistCode /* , storageMode */) {
      var picklist = this.getPicklistByName(picklistCode);
      return picklistFormat(picklist);
    },
    registerPicklist: function registerPicklist(code, picklist) {
      if (!this._picklists[code]) {
        this._picklists[code] = picklist;
      }
    },
    requestPicklistsFromArray: function requestPicklistsFromArray(picklists) {
      var _this = this;

      var promise = new Promise(function (resolve, reject) {
        var promises = [];
        for (var i = 0; i < picklists.length; i++) {
          promises.push(_this.requestPicklist(picklists[i].name, picklists[i].options));
        }
        Promise.all(promises).then(function () {
          resolve(true);
        }, function (response) {
          reject(response);
        });
      });
      return promise;
    },
    onPicklistSuccess: function onPicklistSuccess(resolve, languageCode, name) {
      var _this2 = this;

      return function (result) {
        var picklist = null;
        if (result && result.items) {
          picklist = result;
          picklist.items = picklist.items.$resources.map(function (item) {
            return Object.assign({}, item, { id: item.$key });
          });
          if (languageCode) {
            _this2._picklists[picklist.name + '_' + languageCode] = picklist;
          } else {
            _this2._picklists[picklist.name] = picklist;
          }
        }
        _this2.removeRequest(name);
        resolve(picklist);
      };
    },
    onPicklistError: function onPicklistError(reject, name) {
      var _this3 = this;

      return function (response, o) {
        _this3.removeRequest(name);
        _ErrorManager2.default.addError(response, o, null, 'failure');
        reject(response);
      };
    },
    requestPicklist: function requestPicklist(name) {
      var _this4 = this;

      var queryOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      // Avoid duplicating model requests
      if (this.hasRequest(name)) {
        return new Promise(function (resolve) {
          return resolve();
        });
      }

      var pickListServiceOptions = Object.assign({}, {
        storageMode: 'code'
      }, queryOptions);
      var language = this.determineLanguage(pickListServiceOptions, queryOptions);
      var useCache = typeof queryOptions.useCache === 'boolean' ? queryOptions.useCache : true;

      return new Promise(function (resolve, reject) {
        _this4.addRequest(name);
        var first = _this4.service.getFirstByName(name, _this4.onPicklistSuccess(resolve, language, name), _this4.onPicklistError(reject, name), { pickListServiceOptions: pickListServiceOptions, language: language, useCache: useCache });

        if (first && first.options) {
          var request = _this4.service.setUpRequest(new Sage.SData.Client.SDataResourceCollectionRequest(App.getService(false)).setContractName(_this4.contractName), first.options);
          request.read(first.handlers);
        }
      }).catch(function (err) {
        return console.error(err);
      }); // eslint-disable-line
    },
    determineLanguage: function determineLanguage(serviceOptions, queryOptions) {
      if (serviceOptions.filterByLanguage) {
        return queryOptions.language && queryOptions.language.trim() || App.getCurrentLocale();
      }
      if (serviceOptions.filterByLanguage === false) {
        // This means disable fallback
        // Used for Name Prefix and Suffix we only want the filtered picklist.
        return queryOptions.language && queryOptions.language.trim() || ' ';
      }
      return queryOptions.language && queryOptions.language.trim() || App.getCurrentLocale();
    },
    addRequest: function addRequest(name) {
      return this._currentRequests.set(name, true);
    },
    removeRequest: function removeRequest(name) {
      return this._currentRequests.delete(name);
    },
    hasRequest: function hasRequest(name) {
      return this._currentRequests.has(name);
    },


    // Previous functions
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
  });

  // Backwards compatibility
  _lang2.default.setObject('crm.Integrations.BOE.PicklistService', __class);
  _lang2.default.setObject('icboe.PicklistService', __class);
  exports.default = __class;
  module.exports = exports['default'];
});