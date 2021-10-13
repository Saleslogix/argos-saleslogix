define('crm/Models/Authentication/Offline', ['module', 'exports', 'dojo/_base/declare', 'argos/Models/_OfflineModelBase', 'argos/Models/Manager', 'argos/Models/Types', 'dojo/Deferred', 'argos/Convert', 'argos/I18n'], function (module, exports, _declare, _OfflineModelBase2, _Manager, _Types, _Deferred, _Convert, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _OfflineModelBase3 = _interopRequireDefault(_OfflineModelBase2);

  var _Manager2 = _interopRequireDefault(_Manager);

  var _Types2 = _interopRequireDefault(_Types);

  var _Deferred2 = _interopRequireDefault(_Deferred);

  var _Convert2 = _interopRequireDefault(_Convert);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('autenticationModel'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Models.Autentication.Offline', [_OfflineModelBase3.default], {
    id: 'auth_offline_model',
    entityName: 'Authentication',
    modelName: 'Authentication',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    isSystem: true,
    createEntry: function createEntity(userId) {
      var entity = {}; // need to dynamicly create Properties;
      entity.$key = 'Auth_00000000000';
      entity.$descriptor = resource.entityDisplayName;
      entity.CreateDate = moment().toDate();
      entity.ModifyDate = moment().toDate();
      entity.UserId = userId;
      return entity;
    },
    initAuthentication: function initAuthentication(userId) {
      var _this = this;

      var def = new _Deferred2.default();
      var result = {
        entry: null,
        hasUserChanged: false,
        hasAuthenticatedToday: false
      };
      this.getEntry('Auth_00000000000').then(function (entry) {
        if (entry) {
          if (entry.UserId === userId) {
            result.hasUserChanged = false;
            result.hasAuthenticatedToday = _this._hasAuthenticatedToday(entry);
          } else {
            result.hasUserChanged = true;
            result.hasAuthenticatedToday = false;
            entry.UserId = userId;
          }
          entry.ModifyDate = moment().toDate();
          result.entry = entry;
        }
        def.resolve(result);
      }, function () {
        var newEntry = _this.createEntry(userId);
        _this.insertEntry(newEntry);
        result.hasUserChanged = true;
        result.hasAuthenticatedToday = false;
        result.entry = newEntry;
        def.resolve(result);
      });
      return def.promise;
    },
    _hasAuthenticatedToday: function _hasAuthenticatedToday(entry) {
      if (entry.ModifyDate) {
        var currentDate = moment();
        var authDate = moment(_Convert2.default.toDateFromString(entry.ModifyDate));
        if (authDate.isAfter(currentDate.startOf('day')) && authDate.isBefore(moment().endOf('day'))) {
          return true;
        }
      }
      return false;
    }
  });

  _Manager2.default.register('Authentication', _Types2.default.OFFLINE, __class);
  exports.default = __class;
  module.exports = exports['default'];
});