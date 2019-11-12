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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1BpY2tsaXN0U2VydmljZS5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwic2V0T2JqZWN0IiwiX3BpY2tsaXN0cyIsIl92aWV3TWFwcGluZyIsIl9zdG9yZSIsImNvbnRyYWN0TmFtZSIsInJlc291cmNlS2luZCIsImluY2x1ZGUiLCJzZWxlY3QiLCJvcmRlckJ5Iiwid2hlcmUiLCJnZXRQaWNrbGlzdEJ5S2V5Iiwia2V5IiwiZ2V0UGlja2xpc3RCeU5hbWUiLCJuYW1lIiwiaXRlcmFibGVLZXlzIiwiT2JqZWN0Iiwia2V5cyIsImkiLCJsZW5ndGgiLCJnZXRQaWNrbGlzdEl0ZW1CeUNvZGUiLCJwaWNrbGlzdE5hbWUiLCJpdGVtQ29kZSIsInBpY2tsaXN0IiwiaXRlbXMiLCJjb2RlIiwiZ2V0UGlja2xpc3RJdGVtVGV4dEJ5Q29kZSIsInBpY2tsaXN0SXRlbSIsInRleHQiLCJnZXRWaWV3UGlja2xpc3RzIiwidmlld0lkIiwicGlja2xpc3RJZHMiLCJwaWNrbGlzdHMiLCJwdXNoIiwiY29uc29sZSIsIndhcm4iLCJyZWdpc3RlclBpY2tsaXN0IiwicmVnaXN0ZXJQaWNrbGlzdFRvVmlldyIsImxvZyIsInJlcXVlc3RQaWNrbGlzdHMiLCJwcm9taXNlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJwcm9taXNlcyIsInJlcXVlc3RQaWNrbGlzdCIsImFsbCIsInRoZW4iLCJyZXNwb25zZSIsIm9wdGlvbnMiLCJzdG9yZSIsImdldFN0b3JlIiwicXVlcnlPcHRpb25zIiwicXVlcnkiLCJkYXRhIiwiJHJlc291cmNlcyIsIm8iLCJhZGRFcnJvciIsImdldFN0b3JlT3B0aW9ucyIsInNlcnZpY2UiLCJBcHAiLCJnZXRTZXJ2aWNlIiwic2NvcGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBLE1BQU1BLFVBQVUsZUFBS0MsU0FBTCxDQUFlLHNDQUFmLEVBQXVEO0FBQ3JFQyxnQkFB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LEdBQW9CO0FBQzVCLFVBQUksQ0FBQyxLQUFLL0MsTUFBVixFQUFrQjtBQUNoQixZQUFNNkMsVUFBVSxLQUFLUyxlQUFMLEVBQWhCO0FBQ0EsYUFBS3RELE1BQUwsR0FBYyxvQkFBVTZDLE9BQVYsQ0FBZDtBQUNEO0FBQ0QsYUFBTyxLQUFLN0MsTUFBWjtBQUNELEtBOUhvRTtBQStIckVzRCxxQkFBaUIsU0FBU0EsZUFBVCxHQUEyQjtBQUMxQyxVQUFNVCxVQUFVO0FBQ2RVLGlCQUFTQyxJQUFJQyxVQUFKLENBQWUsS0FBZixDQURLO0FBRWR4RCxzQkFBYyxLQUFLQSxZQUZMO0FBR2RDLHNCQUFjLEtBQUtBLFlBSEw7QUFJZEMsaUJBQVMsS0FBS0EsT0FKQTtBQUtkQyxnQkFBUSxLQUFLQSxNQUxDO0FBTWRDLGlCQUFTLEtBQUtBLE9BTkE7QUFPZEMsZUFBTyxLQUFLQSxLQVBFO0FBUWRvRCxlQUFPO0FBUk8sT0FBaEI7QUFVQSxhQUFPYixPQUFQO0FBQ0Q7QUEzSW9FLEdBQXZELENBQWhCLEMsQ0FuQkE7Ozs7Ozs7Ozs7Ozs7OztBQWdLQSxpQkFBS2hELFNBQUwsQ0FBZSx1QkFBZixFQUF3Q0QsT0FBeEM7b0JBQ2VBLE8iLCJmaWxlIjoiUGlja2xpc3RTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IEVycm9yTWFuYWdlciBmcm9tICdhcmdvcy9FcnJvck1hbmFnZXInO1xyXG5pbXBvcnQgU0RhdGEgZnJvbSAnYXJnb3MvU3RvcmUvU0RhdGEnO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGxhbmcuc2V0T2JqZWN0KCdjcm0uSW50ZWdyYXRpb25zLkJPRS5QaWNrbGlzdFNlcnZpY2UnLCB7XHJcbiAgX3BpY2tsaXN0czoge30sXHJcbiAgX3ZpZXdNYXBwaW5nOiB7fSxcclxuICBfc3RvcmU6IG51bGwsXHJcbiAgY29udHJhY3ROYW1lOiAnc3lzdGVtJyxcclxuICByZXNvdXJjZUtpbmQ6ICdwaWNrbGlzdHMnLFxyXG4gIGluY2x1ZGU6IFsnaXRlbXMnXSxcclxuICBzZWxlY3Q6IFtcclxuICAgICduYW1lJyxcclxuICAgICdhbGxvd011bHRpcGxlcycsXHJcbiAgICAndmFsdWVNdXN0RXhpc3QnLFxyXG4gICAgJ3JlcXVpcmVkJyxcclxuICAgICdhbHBoYVNvcnRlZCcsXHJcbiAgICAnbm9uZUVkaXRhYmxlJyxcclxuICAgICdtb2RpZnlEYXRlJyxcclxuICAgICdpdGVtcy90ZXh0JyxcclxuICAgICdpdGVtcy9jb2RlJyxcclxuICAgICdpdGVtcy9udW1iZXInLFxyXG4gIF0sXHJcbiAgb3JkZXJCeTogJ25hbWUnLFxyXG4gIHdoZXJlOiAnJyxcclxuICBnZXRQaWNrbGlzdEJ5S2V5OiBmdW5jdGlvbiBnZXRQaWNrbGlzdEJ5S2V5KGtleSkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3BpY2tsaXN0c1trZXldO1xyXG4gIH0sXHJcbiAgZ2V0UGlja2xpc3RCeU5hbWU6IGZ1bmN0aW9uIGdldFBpY2tsaXN0QnlOYW1lKG5hbWUpIHtcclxuICAgIGNvbnN0IGl0ZXJhYmxlS2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX3BpY2tsaXN0cyk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZXJhYmxlS2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAodGhpcy5fcGlja2xpc3RzW2l0ZXJhYmxlS2V5c1tpXV0ubmFtZSA9PT0gbmFtZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9waWNrbGlzdHNbaXRlcmFibGVLZXlzW2ldXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0sXHJcbiAgZ2V0UGlja2xpc3RJdGVtQnlDb2RlOiBmdW5jdGlvbiBnZXRQaWNrbGlzdEl0ZW1CeUNvZGUocGlja2xpc3ROYW1lLCBpdGVtQ29kZSkge1xyXG4gICAgY29uc3QgcGlja2xpc3QgPSB0aGlzLmdldFBpY2tsaXN0QnlOYW1lKHBpY2tsaXN0TmFtZSk7XHJcblxyXG4gICAgaWYgKHBpY2tsaXN0KSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGlja2xpc3QuaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAocGlja2xpc3QuaXRlbXNbaV0uY29kZSA9PT0gaXRlbUNvZGUpIHtcclxuICAgICAgICAgIHJldHVybiBwaWNrbGlzdC5pdGVtc1tpXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LFxyXG4gIGdldFBpY2tsaXN0SXRlbVRleHRCeUNvZGU6IGZ1bmN0aW9uIGdldFBpY2tsaXN0SXRlbUJ5Q29kZShwaWNrbGlzdE5hbWUsIGl0ZW1Db2RlKSB7XHJcbiAgICBjb25zdCBwaWNrbGlzdEl0ZW0gPSB0aGlzLmdldFBpY2tsaXN0SXRlbUJ5Q29kZShwaWNrbGlzdE5hbWUsIGl0ZW1Db2RlKTtcclxuICAgIGlmIChpdGVtQ29kZSAmJiBwaWNrbGlzdEl0ZW0pIHtcclxuICAgICAgcmV0dXJuIHBpY2tsaXN0SXRlbS50ZXh0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfSxcclxuICBnZXRWaWV3UGlja2xpc3RzOiBmdW5jdGlvbiBnZXRWaWV3UGlja2xpc3RzKHZpZXdJZCkge1xyXG4gICAgY29uc3QgcGlja2xpc3RJZHMgPSB0aGlzLl92aWV3TWFwcGluZ1t2aWV3SWRdO1xyXG4gICAgY29uc3QgcGlja2xpc3RzID0gW107XHJcbiAgICBpZiAocGlja2xpc3RJZHMgJiYgcGlja2xpc3RJZHMubGVuZ3RoKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGlja2xpc3RJZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAodGhpcy5fcGlja2xpc3RzW3BpY2tsaXN0SWRzW2ldXSkge1xyXG4gICAgICAgICAgcGlja2xpc3RzLnB1c2godGhpcy5fcGlja2xpc3RzW3BpY2tsaXN0SWRzW2ldXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUud2FybignUGlja2xpc3QgXCInICsgcGlja2xpc3RJZHNbaV0gKyAnXCIgaGFzIG5vdCBiZWVuIHJlZ2lzdGVyZWQnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcGlja2xpc3RzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfSxcclxuICByZWdpc3RlclBpY2tsaXN0OiBmdW5jdGlvbiByZWdpc3RlclBpY2tsaXN0KGtleSwgcGlja2xpc3QpIHtcclxuICAgIGlmICghdGhpcy5fcGlja2xpc3RzW2tleV0pIHtcclxuICAgICAgdGhpcy5fcGlja2xpc3RzW2tleV0gPSBwaWNrbGlzdDtcclxuICAgIH1cclxuICB9LFxyXG4gIHJlZ2lzdGVyUGlja2xpc3RUb1ZpZXc6IGZ1bmN0aW9uIHJlZ2lzdGVyUGlja2xpc3RUb1ZpZXcoa2V5LCB2aWV3SWQpIHtcclxuICAgIGlmICghdGhpcy5fdmlld01hcHBpbmdbdmlld0lkXSkge1xyXG4gICAgICB0aGlzLl92aWV3TWFwcGluZ1t2aWV3SWRdID0gW107XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuX3ZpZXdNYXBwaW5nW3ZpZXdJZF1ba2V5XSkge1xyXG4gICAgICB0aGlzLl92aWV3TWFwcGluZ1t2aWV3SWRdLnB1c2goa2V5KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdQaWNrbGlzdCBhbHJlYWR5IGV4aXN0cyBmb3IgdmlldyBcIicgKyB2aWV3SWQgKyAnXCInKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgfVxyXG4gICAgdGhpcy5yZWdpc3RlclBpY2tsaXN0KGtleSwgdHJ1ZSk7XHJcbiAgfSxcclxuICAvLyBXaWxsIHJlcXVlc3QgdGhlIHJlZ2lzdGVyZWQgcGlja2xpc3RzIGluIHRoaXMuX3BpY2tsaXN0c1xyXG4gIHJlcXVlc3RQaWNrbGlzdHM6IGZ1bmN0aW9uIHJlcXVlc3RQaWNrbGlzdHMoKSB7XHJcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCBpdGVyYWJsZUtleXMgPSBPYmplY3Qua2V5cyh0aGlzLl9waWNrbGlzdHMpO1xyXG4gICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZXJhYmxlS2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHByb21pc2VzLnB1c2godGhpcy5yZXF1ZXN0UGlja2xpc3QoaXRlcmFibGVLZXlzW2ldKSk7XHJcbiAgICAgIH1cclxuICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgIH0sIChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIHJlamVjdChyZXNwb25zZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcHJvbWlzZTtcclxuICB9LFxyXG4gIHJlcXVlc3RQaWNrbGlzdDogZnVuY3Rpb24gcmVxdWVzdFBpY2tsaXN0KG5hbWUsIG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IHN0b3JlID0gdGhpcy5nZXRTdG9yZSgpO1xyXG4gICAgICBjb25zdCBxdWVyeU9wdGlvbnMgPSB7XHJcbiAgICAgICAgd2hlcmU6IGBuYW1lIGVxICcke25hbWV9J2AsXHJcbiAgICAgIH07XHJcbiAgICAgIHN0b3JlLnF1ZXJ5KG51bGwsIHF1ZXJ5T3B0aW9ucykudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgIGxldCBwaWNrbGlzdCA9IG51bGw7XHJcbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YVswXSAmJiBkYXRhWzBdLml0ZW1zKSB7XHJcbiAgICAgICAgICBwaWNrbGlzdCA9IGRhdGFbMF07XHJcbiAgICAgICAgICBwaWNrbGlzdC5pdGVtcyA9IHBpY2tsaXN0Lml0ZW1zLiRyZXNvdXJjZXM7XHJcbiAgICAgICAgICB0aGlzLl9waWNrbGlzdHNbcGlja2xpc3QubmFtZV0gPSBwaWNrbGlzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzb2x2ZShwaWNrbGlzdCk7XHJcbiAgICAgIH0sIChyZXNwb25zZSwgbykgPT4ge1xyXG4gICAgICAgIEVycm9yTWFuYWdlci5hZGRFcnJvcihyZXNwb25zZSwgbywgb3B0aW9ucywgJ2ZhaWx1cmUnKTtcclxuICAgICAgICByZWplY3QocmVzcG9uc2UpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfSxcclxuICBnZXRTdG9yZTogZnVuY3Rpb24gZ2V0U3RvcmUoKSB7XHJcbiAgICBpZiAoIXRoaXMuX3N0b3JlKSB7XHJcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmdldFN0b3JlT3B0aW9ucygpO1xyXG4gICAgICB0aGlzLl9zdG9yZSA9IG5ldyBTRGF0YShvcHRpb25zKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9zdG9yZTtcclxuICB9LFxyXG4gIGdldFN0b3JlT3B0aW9uczogZnVuY3Rpb24gZ2V0U3RvcmVPcHRpb25zKCkge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgc2VydmljZTogQXBwLmdldFNlcnZpY2UoZmFsc2UpLFxyXG4gICAgICBjb250cmFjdE5hbWU6IHRoaXMuY29udHJhY3ROYW1lLFxyXG4gICAgICByZXNvdXJjZUtpbmQ6IHRoaXMucmVzb3VyY2VLaW5kLFxyXG4gICAgICBpbmNsdWRlOiB0aGlzLmluY2x1ZGUsXHJcbiAgICAgIHNlbGVjdDogdGhpcy5zZWxlY3QsXHJcbiAgICAgIG9yZGVyQnk6IHRoaXMub3JkZXJCeSxcclxuICAgICAgd2hlcmU6IHRoaXMud2hlcmUsXHJcbiAgICAgIHNjb3BlOiB0aGlzLFxyXG4gICAgfTtcclxuICAgIHJldHVybiBvcHRpb25zO1xyXG4gIH0sXHJcbn0pO1xyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuUGlja2xpc3RTZXJ2aWNlJywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==