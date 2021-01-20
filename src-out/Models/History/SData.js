define('crm/Models/History/SData', ['module', 'exports', 'dojo/_base/declare', 'dojo/Deferred', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names', 'argos/ErrorManager'], function (module, exports, _declare, _Deferred, _Base, _SDataModelBase2, _Manager, _Types, _Names, _ErrorManager) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Deferred2 = _interopRequireDefault(_Deferred);

  var _Base2 = _interopRequireDefault(_Base);

  var _SDataModelBase3 = _interopRequireDefault(_SDataModelBase2);

  var _Manager2 = _interopRequireDefault(_Manager);

  var _Types2 = _interopRequireDefault(_Types);

  var _Names2 = _interopRequireDefault(_Names);

  var _ErrorManager2 = _interopRequireDefault(_ErrorManager);

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

  var __class = (0, _declare2.default)('crm.Models.History.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'history_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'CompletedDate desc',
        queryWhere: 'Type ne "atDatabaseChange"',
        querySelect: ['AccountName', 'ContactName', 'LeadName', 'CompletedDate', 'Description', 'StartDate', 'TimeLess', 'Type', 'LeadId', 'OpportunityId', 'OpportunityName', 'AccountId', 'ContactId', 'TicketId', 'ModifyDate', 'Notes']
      }, {
        name: 'detail',
        querySelect: ['AccountId', 'AccountName', 'Category', 'ModifyDate', 'CompletedDate', 'ContactId', 'ContactName', 'CompletedUser', 'Description', 'Duration', 'Notes', 'LongNotes', 'OpportunityId', 'OpportunityName', 'Priority', 'StartDate', 'TicketId', 'TicketNumber', 'LeadId', 'LeadName', 'Timeless', 'Type', 'UserName', 'UserId'],
        queryInclude: ['$permissions']
      }];
    },
    requestCompletedUser: function requestCompletedUser(entry) {
      var def = new _Deferred2.default();
      var completedUser = entry.CompletedUser;

      if (completedUser) {
        var request = new Sage.SData.Client.SDataSingleResourceRequest(App.getService()).setContractName('dynamic').setResourceKind('users').setResourceSelector('\'' + completedUser + '\'').setQueryArg('select', ['UserInfo/FirstName', 'UserInfo/LastName'].join(','));

        request.allowCacheUse = true;

        request.read({
          success: function success(data) {
            def.resolve(data);
          },
          failure: function failure(response, o) {
            _ErrorManager2.default.addError(response, o, {}, 'failure');
            def.reject(response);
          }
        });
      } else {
        def.resolve(false);
      }

      return def.promise;
    },
    getEntry: function getEntry() {
      var _this = this;

      var results$ = this.inherited(getEntry, arguments);
      return results$.then(function (entry) {
        return _this.requestCompletedUser(entry).then(function (user) {
          if (user) {
            entry.CompletedUser = user;
          }

          return entry;
        });
      });
    }
  });

  _Manager2.default.register(_Names2.default.HISTORY, _Types2.default.SDATA, __class);
  exports.default = __class;
  module.exports = exports['default'];
});