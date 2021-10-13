define('crm/Models/Activity/SData', ['module', 'exports', 'dojo/_base/declare', './Base', 'argos/Models/_SDataModelBase', 'dojo/promise/all', 'dojo/Deferred', 'argos/ErrorManager', 'argos/Models/Manager', 'argos/Models/Types', '../Names', './ActivityTypePicklists'], function (module, exports, _declare, _Base, _SDataModelBase2, _all, _Deferred, _ErrorManager, _Manager, _Types, _Names, _ActivityTypePicklists) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Base2 = _interopRequireDefault(_Base);

  var _SDataModelBase3 = _interopRequireDefault(_SDataModelBase2);

  var _all2 = _interopRequireDefault(_all);

  var _Deferred2 = _interopRequireDefault(_Deferred);

  var _ErrorManager2 = _interopRequireDefault(_ErrorManager);

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

  const __class = (0, _declare2.default)('crm.Models.Activity.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'activity_sdata_model',

    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'StartDate desc',
        querySelect: ['Description', 'StartDate', 'Type', 'AccountId', 'AccountName', 'ContactId', 'ContactName', 'PhoneNumber', 'LeadId', 'LeadName', 'TicketId', 'OpportunityId', 'Leader', 'UserId', 'Timeless', 'Alarm', 'Priority', 'ModifyDate', 'RecurrenceState', 'Recurring'],
        queryInclude: ['$descriptors', '$permissions'],
        resourceKind: 'activities',
        contractName: 'system'
      }, {
        name: 'detail',
        querySelect: ['AccountId', 'AccountName', 'Alarm', 'AlarmTime', 'Category', 'Company', 'ContactId', 'ContactName', 'Description', 'Duration', 'Leader/$key', 'LeadId', 'LeadName', 'Location', 'LongNotes', 'OpportunityId', 'OpportunityName', 'PhoneNumber', 'Priority', 'Rollover', 'StartDate', 'EndDate', 'TicketId', 'TicketNumber', 'Timeless', 'Type', 'Recurring', 'RecurPeriod', 'RecurPeriodSpec', 'RecurIterations', 'RecurrenceState', 'AllowAdd', 'AllowEdit', 'AllowDelete', 'AllowComplete']
      }, {
        name: 'edit',
        querySelect: ['AccountId', 'AccountName', 'Alarm', 'AlarmTime', 'Category', 'Company', 'ContactId', 'ContactName', 'Description', 'Duration', 'Leader/$key', 'LeadId', 'LeadName', 'Location', 'LongNotes', 'OpportunityId', 'OpportunityName', 'PhoneNumber', 'Priority', 'Rollover', 'StartDate', 'EndDate', 'TicketId', 'TicketNumber', 'Timeless', 'Type', 'Recurring', 'RecurPeriod', 'RecurPeriodSpec', 'RecurIterations', 'RecurrenceState', 'AllowAdd', 'AllowEdit', 'AllowDelete', 'AllowComplete']
      }];
    },
    createRequestPromise: function createRequestPromise(key, querySelect, resourceKind, contractName, options) {
      const request = new Sage.SData.Client.SDataSingleResourceRequest(App.getService()).setResourceKind(resourceKind).setResourceSelector(`'${key}'`).setContractName(contractName).setQueryArg('select', querySelect.join(','));
      const def = new _Deferred2.default();

      request.read({
        success: data => {
          def.resolve(data);
        },
        failure: (response, o) => {
          _ErrorManager2.default.addError(response, o, options, 'failure');
          def.reject(response);
        }
      });
      return def.promise;
    },
    getEntry: function getEntry(options) {
      const results$ = this.inherited(getEntry, arguments);
      return results$.then(entry => {
        const leader$ = this.createRequestPromise(entry.Leader.$key, ['UserInfo/FirstName', 'UserInfo/LastName'], 'users', 'dynamic', options);
        const queryModel = this._getQueryModelByName('detail');
        const recurrence$ = this.createRequestPromise(entry.$key.split(this.recurringActivityIdSeparator).shift(), queryModel.querySelect, this.resourceKind, this.contractName, options);
        const picklists$ = Promise.all([App.picklistService.requestPicklist((0, _ActivityTypePicklists.getPicklistByActivityType)(entry.Type, 'Category')), App.picklistService.requestPicklist((0, _ActivityTypePicklists.getPicklistByActivityType)(entry.Type, 'Description')), App.picklistService.requestPicklist('Priorities')]);

        return (0, _all2.default)([leader$, recurrence$, picklists$]).then(([leader, recurrence]) => {
          entry.Leader = leader;
          entry.recurrence = recurrence;
          return entry;
        });
      });
    },
    completeActivity: function completeActivity(entry) {
      const completeActivityEntry = {
        $name: 'ActivityComplete',
        request: {
          entity: {
            $key: entry.$key
          },
          ActivityId: entry.$key,
          userId: entry.Leader.$key,
          result: entry.Result,
          completeDate: entry.CompletedDate
        }
      };
      if (entry.ResultCode) {
        completeActivityEntry.resultCode = entry.ResultCode;
      }
      const request = new Sage.SData.Client.SDataServiceOperationRequest(App.getService()).setResourceKind(this.resourceKind).setContractName(this.contractName).setOperationName('Complete');
      const def = new _Deferred2.default();

      request.execute(completeActivityEntry, {
        success: function success() {
          // Can we get back the history to add to the Offline?
          this.onActivityCompleted(entry);
          def.resolve();
        }.bind(this),
        failure: function failure(err) {
          def.reject(err);
        },
        scope: this
      });
      return def.promise;
    },
    onActivityCompleted: function onActivityCompleted(entry) {
      if (App.enableOfflineSupport) {
        try {
          const oModel = App.ModelManager.getModel(this.modelName, _Types2.default.OFFLINE);
          oModel.onActivityCompleted(entry);
        } catch (error) {// eslint-disable-line
          // Log error
        }
      }
    },
    onEntryUpdated: function onEntryUpdated(entry, orginalEntry) {
      if (App.enableOfflineSupport) {
        try {
          const oModel = App.ModelManager.getModel(this.modelName, _Types2.default.OFFLINE);
          oModel.onEntryUpdated(entry, orginalEntry);
        } catch (error) {// eslint-disable-line
          // Log error
        }
      }
    }
  });

  _Manager2.default.register(_Names2.default.ACTIVITY, _Types2.default.SDATA, __class);
  exports.default = __class;
  module.exports = exports['default'];
});