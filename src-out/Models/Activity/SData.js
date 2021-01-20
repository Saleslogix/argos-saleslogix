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

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var __class = (0, _declare2.default)('crm.Models.Activity.SData', [_Base2.default, _SDataModelBase3.default], {
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
      var request = new Sage.SData.Client.SDataSingleResourceRequest(App.getService()).setResourceKind(resourceKind).setResourceSelector('\'' + key + '\'').setContractName(contractName).setQueryArg('select', querySelect.join(','));
      var def = new _Deferred2.default();

      request.read({
        success: function success(data) {
          def.resolve(data);
        },
        failure: function failure(response, o) {
          _ErrorManager2.default.addError(response, o, options, 'failure');
          def.reject(response);
        }
      });
      return def.promise;
    },
    getEntry: function getEntry(options) {
      var _this = this;

      var results$ = this.inherited(getEntry, arguments);
      return results$.then(function (entry) {
        var leader$ = _this.createRequestPromise(entry.Leader.$key, ['UserInfo/FirstName', 'UserInfo/LastName'], 'users', 'dynamic', options);
        var queryModel = _this._getQueryModelByName('detail');
        var recurrence$ = _this.createRequestPromise(entry.$key.split(_this.recurringActivityIdSeparator).shift(), queryModel.querySelect, _this.resourceKind, _this.contractName, options);
        var picklists$ = Promise.all([App.picklistService.requestPicklist((0, _ActivityTypePicklists.getPicklistByActivityType)(entry.Type, 'Category')), App.picklistService.requestPicklist((0, _ActivityTypePicklists.getPicklistByActivityType)(entry.Type, 'Description')), App.picklistService.requestPicklist('Priorities')]);

        return (0, _all2.default)([leader$, recurrence$, picklists$]).then(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              leader = _ref2[0],
              recurrence = _ref2[1];

          entry.Leader = leader;
          entry.recurrence = recurrence;
          return entry;
        });
      });
    },
    completeActivity: function completeActivity(entry) {
      var completeActivityEntry = {
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
      var request = new Sage.SData.Client.SDataServiceOperationRequest(App.getService()).setResourceKind(this.resourceKind).setContractName(this.contractName).setOperationName('Complete');
      var def = new _Deferred2.default();

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
          var oModel = App.ModelManager.getModel(this.modelName, _Types2.default.OFFLINE);
          oModel.onActivityCompleted(entry);
        } catch (error) {// eslint-disable-line
          // Log error
        }
      }
    },
    onEntryUpdated: function onEntryUpdated(entry, orginalEntry) {
      if (App.enableOfflineSupport) {
        try {
          var oModel = App.ModelManager.getModel(this.modelName, _Types2.default.OFFLINE);
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