define('crm/Models/History/Offline', ['module', 'exports', 'dojo/_base/declare', './Base', 'argos/Models/_OfflineModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names'], function (module, exports, _declare, _Base, _OfflineModelBase2, _Manager, _Types, _Names) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Base2 = _interopRequireDefault(_Base);

  var _OfflineModelBase3 = _interopRequireDefault(_OfflineModelBase2);

  var _Manager2 = _interopRequireDefault(_Manager);

  var _Types2 = _interopRequireDefault(_Types);

  var _Names2 = _interopRequireDefault(_Names);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  var __class = (0, _declare2.default)('crm.Models.History.Offline', [_Base2.default, _OfflineModelBase3.default], {
    id: 'history_offline_model',
    deleteEntry: function deleteEntry(entry) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var store = _this.getStore();
        store.query(function (doc, emit) {
          if (doc.entityName === _this.entityName && doc.entity && doc.entity.entityId === null || typeof doc.entity.entityId === 'undefined') {
            if (doc.entity.UID === entry.UID) {
              emit(doc);
            }
          }
        }).then(function (docs) {
          if (docs && docs.length === 1) {
            var doc = docs[0];
            _this._removeDoc(doc.key).then(function (result) {
              _this.onEntryDelete(entry);
              resolve(result);
            }, function (err) {
              reject(err);
            });
          } else {
            reject('No entry to delete.');
          }
        }, function (err) {
          reject(err);
        });
      });
    }
  });

  _Manager2.default.register(_Names2.default.HISTORY, _Types2.default.OFFLINE, __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbHMvSGlzdG9yeS9PZmZsaW5lLmpzIl0sIm5hbWVzIjpbIl9fY2xhc3MiLCJpZCIsImRlbGV0ZUVudHJ5IiwiZW50cnkiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInN0b3JlIiwiZ2V0U3RvcmUiLCJxdWVyeSIsImRvYyIsImVtaXQiLCJlbnRpdHlOYW1lIiwiZW50aXR5IiwiZW50aXR5SWQiLCJVSUQiLCJ0aGVuIiwiZG9jcyIsImxlbmd0aCIsIl9yZW1vdmVEb2MiLCJrZXkiLCJyZXN1bHQiLCJvbkVudHJ5RGVsZXRlIiwiZXJyIiwicmVnaXN0ZXIiLCJISVNUT1JZIiwiT0ZGTElORSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE1BQU1BLFVBQVUsdUJBQVEsNEJBQVIsRUFBc0MsNENBQXRDLEVBQWlFO0FBQy9FQyxRQUFJLHVCQUQyRTtBQUUvRUMsaUJBQWEsU0FBU0EsV0FBVCxDQUFxQkMsS0FBckIsRUFBNEI7QUFBQTs7QUFDdkMsYUFBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDLFlBQU1DLFFBQVEsTUFBS0MsUUFBTCxFQUFkO0FBQ0FELGNBQU1FLEtBQU4sQ0FBWSxVQUFDQyxHQUFELEVBQU1DLElBQU4sRUFBZTtBQUN6QixjQUFJRCxJQUFJRSxVQUFKLEtBQW1CLE1BQUtBLFVBQXhCLElBQXNDRixJQUFJRyxNQUExQyxJQUFvREgsSUFBSUcsTUFBSixDQUFXQyxRQUFYLEtBQXdCLElBQTVFLElBQW9GLE9BQU9KLElBQUlHLE1BQUosQ0FBV0MsUUFBbEIsS0FBK0IsV0FBdkgsRUFBb0k7QUFDbEksZ0JBQUlKLElBQUlHLE1BQUosQ0FBV0UsR0FBWCxLQUFtQlosTUFBTVksR0FBN0IsRUFBa0M7QUFDaENKLG1CQUFLRCxHQUFMO0FBQ0Q7QUFDRjtBQUNGLFNBTkQsRUFNR00sSUFOSCxDQU1RLFVBQUNDLElBQUQsRUFBVTtBQUNoQixjQUFJQSxRQUFRQSxLQUFLQyxNQUFMLEtBQWdCLENBQTVCLEVBQStCO0FBQzdCLGdCQUFNUixNQUFNTyxLQUFLLENBQUwsQ0FBWjtBQUNBLGtCQUFLRSxVQUFMLENBQWdCVCxJQUFJVSxHQUFwQixFQUF5QkosSUFBekIsQ0FBOEIsVUFBQ0ssTUFBRCxFQUFZO0FBQ3hDLG9CQUFLQyxhQUFMLENBQW1CbkIsS0FBbkI7QUFDQUUsc0JBQVFnQixNQUFSO0FBQ0QsYUFIRCxFQUdHLFVBQUNFLEdBQUQsRUFBUztBQUNWakIscUJBQU9pQixHQUFQO0FBQ0QsYUFMRDtBQU1ELFdBUkQsTUFRTztBQUNMakIsbUJBQU8scUJBQVA7QUFDRDtBQUNGLFNBbEJELEVBa0JHLFVBQUNpQixHQUFELEVBQVM7QUFDVmpCLGlCQUFPaUIsR0FBUDtBQUNELFNBcEJEO0FBcUJELE9BdkJNLENBQVA7QUF3QkQ7QUEzQjhFLEdBQWpFLENBQWhCOztBQStCQSxvQkFBUUMsUUFBUixDQUFpQixnQkFBWUMsT0FBN0IsRUFBc0MsZ0JBQVlDLE9BQWxELEVBQTJEMUIsT0FBM0Q7b0JBQ2VBLE8iLCJmaWxlIjoiT2ZmbGluZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBCYXNlIGZyb20gJy4vQmFzZSc7XHJcbmltcG9ydCBfT2ZmbGluZU1vZGVsQmFzZSBmcm9tICdhcmdvcy9Nb2RlbHMvX09mZmxpbmVNb2RlbEJhc2UnO1xyXG5pbXBvcnQgTWFuYWdlciBmcm9tICdhcmdvcy9Nb2RlbHMvTWFuYWdlcic7XHJcbmltcG9ydCBNT0RFTF9UWVBFUyBmcm9tICdhcmdvcy9Nb2RlbHMvVHlwZXMnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vTmFtZXMnO1xyXG5cclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uTW9kZWxzLkhpc3RvcnkuT2ZmbGluZScsIFtCYXNlLCBfT2ZmbGluZU1vZGVsQmFzZV0sIHtcclxuICBpZDogJ2hpc3Rvcnlfb2ZmbGluZV9tb2RlbCcsXHJcbiAgZGVsZXRlRW50cnk6IGZ1bmN0aW9uIGRlbGV0ZUVudHJ5KGVudHJ5KSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCBzdG9yZSA9IHRoaXMuZ2V0U3RvcmUoKTtcclxuICAgICAgc3RvcmUucXVlcnkoKGRvYywgZW1pdCkgPT4ge1xyXG4gICAgICAgIGlmIChkb2MuZW50aXR5TmFtZSA9PT0gdGhpcy5lbnRpdHlOYW1lICYmIGRvYy5lbnRpdHkgJiYgZG9jLmVudGl0eS5lbnRpdHlJZCA9PT0gbnVsbCB8fCB0eXBlb2YgZG9jLmVudGl0eS5lbnRpdHlJZCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgIGlmIChkb2MuZW50aXR5LlVJRCA9PT0gZW50cnkuVUlEKSB7XHJcbiAgICAgICAgICAgIGVtaXQoZG9jKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4oKGRvY3MpID0+IHtcclxuICAgICAgICBpZiAoZG9jcyAmJiBkb2NzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgY29uc3QgZG9jID0gZG9jc1swXTtcclxuICAgICAgICAgIHRoaXMuX3JlbW92ZURvYyhkb2Mua2V5KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vbkVudHJ5RGVsZXRlKGVudHJ5KTtcclxuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgICAgfSwgKGVycikgPT4ge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWplY3QoJ05vIGVudHJ5IHRvIGRlbGV0ZS4nKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIChlcnIpID0+IHtcclxuICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9LFxyXG59KTtcclxuXHJcblxyXG5NYW5hZ2VyLnJlZ2lzdGVyKE1PREVMX05BTUVTLkhJU1RPUlksIE1PREVMX1RZUEVTLk9GRkxJTkUsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=