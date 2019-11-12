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

  var picklistFormat = ICRMCommonSDK.format.picklist;

  /**
   * @class crm.PicklistService
   * @singleton
   */
  var __class = _lang2.default.setObject('crm.PicklistService', /** @lends crm.PicklistService */{
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
    onPicklistSuccess: function onPicklistSuccess(resolve, languageCode) {
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
        _this2.removeRequest(picklist.name);
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
        var first = _this4.service.getFirstByName(name, _this4.onPicklistSuccess(resolve, language), _this4.onPicklistError(reject, name), { pickListServiceOptions: pickListServiceOptions, language: language, useCache: useCache });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9QaWNrbGlzdFNlcnZpY2UuanMiXSwibmFtZXMiOlsiUGlja0xpc3RTZXJ2aWNlIiwiSUNSTVNlcnZpY2VzU0RLIiwicGlja2xpc3RGb3JtYXQiLCJJQ1JNQ29tbW9uU0RLIiwiZm9ybWF0IiwicGlja2xpc3QiLCJfX2NsYXNzIiwic2V0T2JqZWN0IiwiX3BpY2tsaXN0cyIsIl9jdXJyZW50UmVxdWVzdHMiLCJNYXAiLCJfdmlld01hcHBpbmciLCJfc3RvcmUiLCJjb250cmFjdE5hbWUiLCJyZXNvdXJjZUtpbmQiLCJpbmNsdWRlIiwic2VsZWN0Iiwib3JkZXJCeSIsIndoZXJlIiwiaW5pdCIsInNlcnZpY2UiLCJzdG9yYWdlIiwiZ2V0UGlja2xpc3RCeUtleSIsImtleSIsImdldFBpY2tsaXN0QnlOYW1lIiwibmFtZSIsImxhbmd1YWdlQ29kZSIsImdldFBpY2tsaXN0SXRlbUJ5S2V5IiwicGlja2xpc3ROYW1lIiwiQXBwIiwiZ2V0Q3VycmVudExvY2FsZSIsImkiLCJpdGVtcyIsImxlbmd0aCIsIiRrZXkiLCJnZXRQaWNrbGlzdEl0ZW1CeUNvZGUiLCJpdGVtQ29kZSIsImNvZGUiLCJnZXRQaWNrbGlzdEl0ZW1CeVRleHQiLCJ0ZXh0IiwiZ2V0UGlja2xpc3RJdGVtVGV4dEJ5Q29kZSIsInBpY2tsaXN0SXRlbSIsImdldFBpY2tsaXN0SXRlbVRleHRCeUtleSIsInBpY2tsaXN0Q29kZSIsInJlZ2lzdGVyUGlja2xpc3QiLCJyZXF1ZXN0UGlja2xpc3RzRnJvbUFycmF5IiwicGlja2xpc3RzIiwicHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicHJvbWlzZXMiLCJwdXNoIiwicmVxdWVzdFBpY2tsaXN0Iiwib3B0aW9ucyIsImFsbCIsInRoZW4iLCJyZXNwb25zZSIsIm9uUGlja2xpc3RTdWNjZXNzIiwicmVzdWx0IiwiJHJlc291cmNlcyIsIm1hcCIsIk9iamVjdCIsImFzc2lnbiIsIml0ZW0iLCJpZCIsInJlbW92ZVJlcXVlc3QiLCJvblBpY2tsaXN0RXJyb3IiLCJvIiwiYWRkRXJyb3IiLCJxdWVyeU9wdGlvbnMiLCJoYXNSZXF1ZXN0IiwicGlja0xpc3RTZXJ2aWNlT3B0aW9ucyIsInN0b3JhZ2VNb2RlIiwibGFuZ3VhZ2UiLCJkZXRlcm1pbmVMYW5ndWFnZSIsInVzZUNhY2hlIiwiYWRkUmVxdWVzdCIsImZpcnN0IiwiZ2V0Rmlyc3RCeU5hbWUiLCJyZXF1ZXN0Iiwic2V0VXBSZXF1ZXN0IiwiU2FnZSIsIlNEYXRhIiwiQ2xpZW50IiwiU0RhdGFSZXNvdXJjZUNvbGxlY3Rpb25SZXF1ZXN0IiwiZ2V0U2VydmljZSIsInNldENvbnRyYWN0TmFtZSIsInJlYWQiLCJoYW5kbGVycyIsImNhdGNoIiwiY29uc29sZSIsImVycm9yIiwiZXJyIiwic2VydmljZU9wdGlvbnMiLCJmaWx0ZXJCeUxhbmd1YWdlIiwidHJpbSIsInNldCIsImRlbGV0ZSIsImhhcyIsImdldFZpZXdQaWNrbGlzdHMiLCJ2aWV3SWQiLCJwaWNrbGlzdElkcyIsIndhcm4iLCJyZWdpc3RlclBpY2tsaXN0VG9WaWV3IiwibG9nIiwiZ2V0U3RvcmUiLCJnZXRTdG9yZU9wdGlvbnMiLCJzY29wZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkEsTUFBTUEsa0JBQWtCQyxnQkFBZ0JELGVBQXhDLEMsQ0FuQkE7Ozs7Ozs7Ozs7Ozs7OztBQW9CQSxNQUFNRSxpQkFBaUJDLGNBQWNDLE1BQWQsQ0FBcUJDLFFBQTVDOztBQUVBOzs7O0FBSUEsTUFBTUMsVUFBVSxlQUFLQyxTQUFMLENBQWUscUJBQWYsRUFBc0MsaUNBQWlDO0FBQ3JGQyxnQkFBWSxFQUR5RTtBQUVyRkMsc0JBQWtCLElBQUlDLEdBQUosRUFGbUU7O0FBSXJGO0FBQ0FDLGtCQUFjLEVBTHVFO0FBTXJGQyxZQUFRLElBTjZFO0FBT3JGQyxrQkFBYyxRQVB1RTtBQVFyRkMsa0JBQWMsV0FSdUU7QUFTckZDLGFBQVMsQ0FBQyxPQUFELENBVDRFO0FBVXJGQyxZQUFRLENBQ04sTUFE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O0FBL09vRixHQUF2RSxDQUFoQjs7QUFrUEE7QUFDQSxpQkFBSy9DLFNBQUwsQ0FBZSxzQ0FBZixFQUF1REQsT0FBdkQ7QUFDQSxpQkFBS0MsU0FBTCxDQUFlLHVCQUFmLEVBQXdDRCxPQUF4QztvQkFDZUEsTyIsImZpbGUiOiJQaWNrbGlzdFNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgRXJyb3JNYW5hZ2VyIGZyb20gJ2FyZ29zL0Vycm9yTWFuYWdlcic7XHJcbmltcG9ydCBTRGF0YSBmcm9tICdhcmdvcy9TdG9yZS9TRGF0YSc7XHJcblxyXG5jb25zdCBQaWNrTGlzdFNlcnZpY2UgPSBJQ1JNU2VydmljZXNTREsuUGlja0xpc3RTZXJ2aWNlO1xyXG5jb25zdCBwaWNrbGlzdEZvcm1hdCA9IElDUk1Db21tb25TREsuZm9ybWF0LnBpY2tsaXN0O1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uUGlja2xpc3RTZXJ2aWNlXHJcbiAqIEBzaW5nbGV0b25cclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBsYW5nLnNldE9iamVjdCgnY3JtLlBpY2tsaXN0U2VydmljZScsIC8qKiBAbGVuZHMgY3JtLlBpY2tsaXN0U2VydmljZSAqL3tcclxuICBfcGlja2xpc3RzOiB7fSxcclxuICBfY3VycmVudFJlcXVlc3RzOiBuZXcgTWFwKCksXHJcblxyXG4gIC8vIFByZXZpb3VzIHByb3BlcnRpZXNcclxuICBfdmlld01hcHBpbmc6IHt9LFxyXG4gIF9zdG9yZTogbnVsbCxcclxuICBjb250cmFjdE5hbWU6ICdzeXN0ZW0nLFxyXG4gIHJlc291cmNlS2luZDogJ3BpY2tsaXN0cycsXHJcbiAgaW5jbHVkZTogWydpdGVtcyddLFxyXG4gIHNlbGVjdDogW1xyXG4gICAgJ25hbWUnLFxyXG4gICAgJ2FsbG93TXVsdGlwbGVzJyxcclxuICAgICd2YWx1ZU11c3RFeGlzdCcsXHJcbiAgICAncmVxdWlyZWQnLFxyXG4gICAgJ2FscGhhU29ydGVkJyxcclxuICAgICdub25lRWRpdGFibGUnLFxyXG4gICAgJ21vZGlmeURhdGUnLFxyXG4gICAgJ2l0ZW1zL3RleHQnLFxyXG4gICAgJ2l0ZW1zL2NvZGUnLFxyXG4gICAgJ2l0ZW1zL251bWJlcicsXHJcbiAgXSxcclxuICBvcmRlckJ5OiAnbmFtZScsXHJcbiAgd2hlcmU6ICcnLFxyXG5cclxuICBpbml0KHNlcnZpY2UsIHN0b3JhZ2UpIHtcclxuICAgIHRoaXMuc2VydmljZSA9IG5ldyBQaWNrTGlzdFNlcnZpY2Uoc3RvcmFnZSwgc2VydmljZSk7XHJcbiAgfSxcclxuICBnZXRQaWNrbGlzdEJ5S2V5KGtleSkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0UGlja2xpc3RCeU5hbWUoa2V5KTtcclxuICB9LFxyXG4gIGdldFBpY2tsaXN0QnlOYW1lKG5hbWUsIGxhbmd1YWdlQ29kZSkge1xyXG4gICAgaWYgKGxhbmd1YWdlQ29kZSkge1xyXG4gICAgICBjb25zdCBwaWNrbGlzdCA9IHRoaXMuX3BpY2tsaXN0c1tgJHtuYW1lfV8ke2xhbmd1YWdlQ29kZX1gXTtcclxuICAgICAgaWYgKHBpY2tsaXN0KSB7XHJcbiAgICAgICAgcmV0dXJuIHBpY2tsaXN0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fcGlja2xpc3RzW25hbWVdIHx8IGZhbHNlO1xyXG4gIH0sXHJcbiAgZ2V0UGlja2xpc3RJdGVtQnlLZXkocGlja2xpc3ROYW1lLCBrZXksIGxhbmd1YWdlQ29kZSA9IEFwcC5nZXRDdXJyZW50TG9jYWxlKCkpIHtcclxuICAgIGNvbnN0IHBpY2tsaXN0ID0gdGhpcy5nZXRQaWNrbGlzdEJ5TmFtZShwaWNrbGlzdE5hbWUsIGxhbmd1YWdlQ29kZSk7XHJcblxyXG4gICAgaWYgKHBpY2tsaXN0KSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGlja2xpc3QuaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAocGlja2xpc3QuaXRlbXNbaV0uJGtleSA9PT0ga2V5KSB7XHJcbiAgICAgICAgICByZXR1cm4gcGlja2xpc3QuaXRlbXNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSxcclxuICBnZXRQaWNrbGlzdEl0ZW1CeUNvZGUocGlja2xpc3ROYW1lLCBpdGVtQ29kZSwgbGFuZ3VhZ2VDb2RlID0gQXBwLmdldEN1cnJlbnRMb2NhbGUoKSkge1xyXG4gICAgY29uc3QgcGlja2xpc3QgPSB0aGlzLmdldFBpY2tsaXN0QnlOYW1lKHBpY2tsaXN0TmFtZSwgbGFuZ3VhZ2VDb2RlKTtcclxuXHJcbiAgICBpZiAocGlja2xpc3QpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwaWNrbGlzdC5pdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChwaWNrbGlzdC5pdGVtc1tpXS5jb2RlID09PSBpdGVtQ29kZSkge1xyXG4gICAgICAgICAgcmV0dXJuIHBpY2tsaXN0Lml0ZW1zW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0sXHJcbiAgZ2V0UGlja2xpc3RJdGVtQnlUZXh0KHBpY2tsaXN0TmFtZSwgdGV4dCkge1xyXG4gICAgY29uc3QgcGlja2xpc3QgPSB0aGlzLmdldFBpY2tsaXN0QnlOYW1lKHBpY2tsaXN0TmFtZSwgJycpO1xyXG5cclxuICAgIGlmIChwaWNrbGlzdCkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBpY2tsaXN0Lml0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHBpY2tsaXN0Lml0ZW1zW2ldLnRleHQgPT09IHRleHQpIHtcclxuICAgICAgICAgIHJldHVybiBwaWNrbGlzdC5pdGVtc1tpXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LFxyXG4gIGdldFBpY2tsaXN0SXRlbVRleHRCeUNvZGUocGlja2xpc3ROYW1lLCBpdGVtQ29kZSwgbGFuZ3VhZ2VDb2RlID0gQXBwLmdldEN1cnJlbnRMb2NhbGUoKSkge1xyXG4gICAgY29uc3QgcGlja2xpc3RJdGVtID0gdGhpcy5nZXRQaWNrbGlzdEl0ZW1CeUNvZGUocGlja2xpc3ROYW1lLCBpdGVtQ29kZSwgbGFuZ3VhZ2VDb2RlKTtcclxuICAgIGlmIChpdGVtQ29kZSAmJiBwaWNrbGlzdEl0ZW0pIHtcclxuICAgICAgcmV0dXJuIHBpY2tsaXN0SXRlbS50ZXh0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfSxcclxuICBnZXRQaWNrbGlzdEl0ZW1UZXh0QnlLZXkocGlja2xpc3ROYW1lLCBrZXksIGxhbmd1YWdlQ29kZSA9IEFwcC5nZXRDdXJyZW50TG9jYWxlKCkpIHtcclxuICAgIGNvbnN0IHBpY2tsaXN0SXRlbSA9IHRoaXMuZ2V0UGlja2xpc3RJdGVtQnlLZXkocGlja2xpc3ROYW1lLCBrZXksIGxhbmd1YWdlQ29kZSk7XHJcbiAgICBpZiAoa2V5ICYmIHBpY2tsaXN0SXRlbSkge1xyXG4gICAgICByZXR1cm4gcGlja2xpc3RJdGVtLnRleHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9LFxyXG4gIGZvcm1hdChwaWNrbGlzdENvZGUgLyogLCBzdG9yYWdlTW9kZSAqLykge1xyXG4gICAgY29uc3QgcGlja2xpc3QgPSB0aGlzLmdldFBpY2tsaXN0QnlOYW1lKHBpY2tsaXN0Q29kZSk7XHJcbiAgICByZXR1cm4gcGlja2xpc3RGb3JtYXQocGlja2xpc3QpO1xyXG4gIH0sXHJcbiAgcmVnaXN0ZXJQaWNrbGlzdChjb2RlLCBwaWNrbGlzdCkge1xyXG4gICAgaWYgKCF0aGlzLl9waWNrbGlzdHNbY29kZV0pIHtcclxuICAgICAgdGhpcy5fcGlja2xpc3RzW2NvZGVdID0gcGlja2xpc3Q7XHJcbiAgICB9XHJcbiAgfSxcclxuICByZXF1ZXN0UGlja2xpc3RzRnJvbUFycmF5KHBpY2tsaXN0cykge1xyXG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwaWNrbGlzdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMucmVxdWVzdFBpY2tsaXN0KHBpY2tsaXN0c1tpXS5uYW1lLCBwaWNrbGlzdHNbaV0ub3B0aW9ucykpO1xyXG4gICAgICB9XHJcbiAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHtcclxuICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICB9LCAocmVzcG9uc2UpID0+IHtcclxuICAgICAgICByZWplY3QocmVzcG9uc2UpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfSxcclxuICBvblBpY2tsaXN0U3VjY2VzcyhyZXNvbHZlLCBsYW5ndWFnZUNvZGUpIHtcclxuICAgIHJldHVybiAocmVzdWx0KSA9PiB7XHJcbiAgICAgIGxldCBwaWNrbGlzdCA9IG51bGw7XHJcbiAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0Lml0ZW1zKSB7XHJcbiAgICAgICAgcGlja2xpc3QgPSByZXN1bHQ7XHJcbiAgICAgICAgcGlja2xpc3QuaXRlbXMgPSBwaWNrbGlzdC5pdGVtcy4kcmVzb3VyY2VzLm1hcChpdGVtID0+IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0sIHsgaWQ6IGl0ZW0uJGtleSB9KSk7XHJcbiAgICAgICAgaWYgKGxhbmd1YWdlQ29kZSkge1xyXG4gICAgICAgICAgdGhpcy5fcGlja2xpc3RzW2Ake3BpY2tsaXN0Lm5hbWV9XyR7bGFuZ3VhZ2VDb2RlfWBdID0gcGlja2xpc3Q7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuX3BpY2tsaXN0c1twaWNrbGlzdC5uYW1lXSA9IHBpY2tsaXN0O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLnJlbW92ZVJlcXVlc3QocGlja2xpc3QubmFtZSk7XHJcbiAgICAgIHJlc29sdmUocGlja2xpc3QpO1xyXG4gICAgfTtcclxuICB9LFxyXG4gIG9uUGlja2xpc3RFcnJvcihyZWplY3QsIG5hbWUpIHtcclxuICAgIHJldHVybiAocmVzcG9uc2UsIG8pID0+IHtcclxuICAgICAgdGhpcy5yZW1vdmVSZXF1ZXN0KG5hbWUpO1xyXG4gICAgICBFcnJvck1hbmFnZXIuYWRkRXJyb3IocmVzcG9uc2UsIG8sIG51bGwsICdmYWlsdXJlJyk7XHJcbiAgICAgIHJlamVjdChyZXNwb25zZSk7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgcmVxdWVzdFBpY2tsaXN0KG5hbWUsIHF1ZXJ5T3B0aW9ucyA9IHt9KSB7XHJcbiAgICAvLyBBdm9pZCBkdXBsaWNhdGluZyBtb2RlbCByZXF1ZXN0c1xyXG4gICAgaWYgKHRoaXMuaGFzUmVxdWVzdChuYW1lKSkge1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiByZXNvbHZlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBpY2tMaXN0U2VydmljZU9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB7XHJcbiAgICAgIHN0b3JhZ2VNb2RlOiAnY29kZScsXHJcbiAgICB9LCBxdWVyeU9wdGlvbnMpO1xyXG4gICAgY29uc3QgbGFuZ3VhZ2UgPSB0aGlzLmRldGVybWluZUxhbmd1YWdlKHBpY2tMaXN0U2VydmljZU9wdGlvbnMsIHF1ZXJ5T3B0aW9ucyk7XHJcbiAgICBjb25zdCB1c2VDYWNoZSA9IHR5cGVvZiBxdWVyeU9wdGlvbnMudXNlQ2FjaGUgPT09ICdib29sZWFuJyA/IHF1ZXJ5T3B0aW9ucy51c2VDYWNoZSA6IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5hZGRSZXF1ZXN0KG5hbWUpO1xyXG4gICAgICBjb25zdCBmaXJzdCA9IHRoaXMuc2VydmljZS5nZXRGaXJzdEJ5TmFtZShcclxuICAgICAgICBuYW1lLFxyXG4gICAgICAgIHRoaXMub25QaWNrbGlzdFN1Y2Nlc3MocmVzb2x2ZSwgbGFuZ3VhZ2UpLFxyXG4gICAgICAgIHRoaXMub25QaWNrbGlzdEVycm9yKHJlamVjdCwgbmFtZSksXHJcbiAgICAgICAgeyBwaWNrTGlzdFNlcnZpY2VPcHRpb25zLCBsYW5ndWFnZSwgdXNlQ2FjaGUgfVxyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYgKGZpcnN0ICYmIGZpcnN0Lm9wdGlvbnMpIHtcclxuICAgICAgICBjb25zdCByZXF1ZXN0ID0gdGhpcy5zZXJ2aWNlLnNldFVwUmVxdWVzdChcclxuICAgICAgICAgIG5ldyBTYWdlLlNEYXRhLkNsaWVudC5TRGF0YVJlc291cmNlQ29sbGVjdGlvblJlcXVlc3QoQXBwLmdldFNlcnZpY2UoZmFsc2UpKVxyXG4gICAgICAgICAgICAuc2V0Q29udHJhY3ROYW1lKHRoaXMuY29udHJhY3ROYW1lKSxcclxuICAgICAgICAgIGZpcnN0Lm9wdGlvbnNcclxuICAgICAgICApO1xyXG4gICAgICAgIHJlcXVlc3QucmVhZChmaXJzdC5oYW5kbGVycyk7XHJcbiAgICAgIH1cclxuICAgIH0pLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKGVycikpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgfSxcclxuICBkZXRlcm1pbmVMYW5ndWFnZShzZXJ2aWNlT3B0aW9ucywgcXVlcnlPcHRpb25zKSB7XHJcbiAgICBpZiAoc2VydmljZU9wdGlvbnMuZmlsdGVyQnlMYW5ndWFnZSkge1xyXG4gICAgICByZXR1cm4gKHF1ZXJ5T3B0aW9ucy5sYW5ndWFnZSAmJiBxdWVyeU9wdGlvbnMubGFuZ3VhZ2UudHJpbSgpKVxyXG4gICAgICAgICAgfHwgQXBwLmdldEN1cnJlbnRMb2NhbGUoKTtcclxuICAgIH1cclxuICAgIGlmIChzZXJ2aWNlT3B0aW9ucy5maWx0ZXJCeUxhbmd1YWdlID09PSBmYWxzZSkge1xyXG4gICAgICAvLyBUaGlzIG1lYW5zIGRpc2FibGUgZmFsbGJhY2tcclxuICAgICAgLy8gVXNlZCBmb3IgTmFtZSBQcmVmaXggYW5kIFN1ZmZpeCB3ZSBvbmx5IHdhbnQgdGhlIGZpbHRlcmVkIHBpY2tsaXN0LlxyXG4gICAgICByZXR1cm4gcXVlcnlPcHRpb25zLmxhbmd1YWdlICYmIHF1ZXJ5T3B0aW9ucy5sYW5ndWFnZS50cmltKCkgfHwgJyAnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHF1ZXJ5T3B0aW9ucy5sYW5ndWFnZSAmJiBxdWVyeU9wdGlvbnMubGFuZ3VhZ2UudHJpbSgpIHx8IEFwcC5nZXRDdXJyZW50TG9jYWxlKCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogU2ltcGxlIHJlcXVlc3RNYXAgdG8gb3B0aW1pemUgcmVxdWVzdHMgdG8gYXZvaWQgb3ZlcmxhcCBmcm9tIG1vZGVsIHJlcXVlc3RzXHJcbiAgICovXHJcbiAgYWRkUmVxdWVzdChuYW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFJlcXVlc3RzLnNldChuYW1lLCB0cnVlKTtcclxuICB9LFxyXG4gIHJlbW92ZVJlcXVlc3QobmFtZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRSZXF1ZXN0cy5kZWxldGUobmFtZSk7XHJcbiAgfSxcclxuICBoYXNSZXF1ZXN0KG5hbWUpIHtcclxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50UmVxdWVzdHMuaGFzKG5hbWUpO1xyXG4gIH0sXHJcblxyXG4gIC8vIFByZXZpb3VzIGZ1bmN0aW9uc1xyXG4gIGdldFZpZXdQaWNrbGlzdHM6IGZ1bmN0aW9uIGdldFZpZXdQaWNrbGlzdHModmlld0lkKSB7XHJcbiAgICBjb25zdCBwaWNrbGlzdElkcyA9IHRoaXMuX3ZpZXdNYXBwaW5nW3ZpZXdJZF07XHJcbiAgICBjb25zdCBwaWNrbGlzdHMgPSBbXTtcclxuICAgIGlmIChwaWNrbGlzdElkcyAmJiBwaWNrbGlzdElkcy5sZW5ndGgpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwaWNrbGlzdElkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICh0aGlzLl9waWNrbGlzdHNbcGlja2xpc3RJZHNbaV1dKSB7XHJcbiAgICAgICAgICBwaWNrbGlzdHMucHVzaCh0aGlzLl9waWNrbGlzdHNbcGlja2xpc3RJZHNbaV1dKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS53YXJuKCdQaWNrbGlzdCBcIicgKyBwaWNrbGlzdElkc1tpXSArICdcIiBoYXMgbm90IGJlZW4gcmVnaXN0ZXJlZCcpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBwaWNrbGlzdHM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9LFxyXG4gIHJlZ2lzdGVyUGlja2xpc3RUb1ZpZXc6IGZ1bmN0aW9uIHJlZ2lzdGVyUGlja2xpc3RUb1ZpZXcoY29kZSwgdmlld0lkKSB7XHJcbiAgICBpZiAoIXRoaXMuX3ZpZXdNYXBwaW5nW3ZpZXdJZF0pIHtcclxuICAgICAgdGhpcy5fdmlld01hcHBpbmdbdmlld0lkXSA9IFtdO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLl92aWV3TWFwcGluZ1t2aWV3SWRdW2NvZGVdKSB7XHJcbiAgICAgIHRoaXMuX3ZpZXdNYXBwaW5nW3ZpZXdJZF0ucHVzaChjb2RlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdQaWNrbGlzdCBhbHJlYWR5IGV4aXN0cyBmb3IgdmlldyBcIicgKyB2aWV3SWQgKyAnXCInKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgfVxyXG4gICAgdGhpcy5yZWdpc3RlclBpY2tsaXN0KGNvZGUsIHRydWUpO1xyXG4gIH0sXHJcbiAgZ2V0U3RvcmU6IGZ1bmN0aW9uIGdldFN0b3JlKCkge1xyXG4gICAgaWYgKCF0aGlzLl9zdG9yZSkge1xyXG4gICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5nZXRTdG9yZU9wdGlvbnMoKTtcclxuICAgICAgdGhpcy5fc3RvcmUgPSBuZXcgU0RhdGEob3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fc3RvcmU7XHJcbiAgfSxcclxuICBnZXRTdG9yZU9wdGlvbnM6IGZ1bmN0aW9uIGdldFN0b3JlT3B0aW9ucygpIHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgIHNlcnZpY2U6IEFwcC5nZXRTZXJ2aWNlKGZhbHNlKSxcclxuICAgICAgY29udHJhY3ROYW1lOiB0aGlzLmNvbnRyYWN0TmFtZSxcclxuICAgICAgcmVzb3VyY2VLaW5kOiB0aGlzLnJlc291cmNlS2luZCxcclxuICAgICAgaW5jbHVkZTogdGhpcy5pbmNsdWRlLFxyXG4gICAgICBzZWxlY3Q6IHRoaXMuc2VsZWN0LFxyXG4gICAgICBvcmRlckJ5OiB0aGlzLm9yZGVyQnksXHJcbiAgICAgIHdoZXJlOiB0aGlzLndoZXJlLFxyXG4gICAgICBzY29wZTogdGhpcyxcclxuICAgIH07XHJcbiAgICByZXR1cm4gb3B0aW9ucztcclxuICB9LFxyXG59KTtcclxuXHJcbi8vIEJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XHJcbmxhbmcuc2V0T2JqZWN0KCdjcm0uSW50ZWdyYXRpb25zLkJPRS5QaWNrbGlzdFNlcnZpY2UnLCBfX2NsYXNzKTtcclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLlBpY2tsaXN0U2VydmljZScsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=