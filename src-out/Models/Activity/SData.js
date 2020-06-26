define("crm/Models/Activity/SData", ["exports", "dojo/_base/declare", "./Base", "argos/Models/_SDataModelBase", "dojo/promise/all", "dojo/Deferred", "argos/ErrorManager", "argos/Models/Manager", "argos/Models/Types", "../Names", "./ActivityTypePicklists"], function (_exports, _declare, _Base, _SDataModelBase2, _all, _Deferred, _ErrorManager, _Manager, _Types, _Names, _ActivityTypePicklists) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _Base = _interopRequireDefault(_Base);
  _SDataModelBase2 = _interopRequireDefault(_SDataModelBase2);
  _all = _interopRequireDefault(_all);
  _Deferred = _interopRequireDefault(_Deferred);
  _ErrorManager = _interopRequireDefault(_ErrorManager);
  _Manager = _interopRequireDefault(_Manager);
  _Types = _interopRequireDefault(_Types);
  _Names = _interopRequireDefault(_Names);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  var __class = (0, _declare["default"])('crm.Models.Activity.SData', [_Base["default"], _SDataModelBase2["default"]], {
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
      var request = new Sage.SData.Client.SDataSingleResourceRequest(App.getService()).setResourceKind(resourceKind).setResourceSelector("'".concat(key, "'")).setContractName(contractName).setQueryArg('select', querySelect.join(','));
      var def = new _Deferred["default"]();
      request.read({
        success: function success(data) {
          def.resolve(data);
        },
        failure: function failure(response, o) {
          _ErrorManager["default"].addError(response, o, options, 'failure');

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
        return (0, _all["default"])([leader$, recurrence$, picklists$]).then(function (_ref) {
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
      var def = new _Deferred["default"]();
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
          var oModel = App.ModelManager.getModel(this.modelName, _Types["default"].OFFLINE);
          oModel.onActivityCompleted(entry);
        } catch (error) {// eslint-disable-line
          // Log error
        }
      }
    },
    onEntryUpdated: function onEntryUpdated(entry, orginalEntry) {
      if (App.enableOfflineSupport) {
        try {
          var oModel = App.ModelManager.getModel(this.modelName, _Types["default"].OFFLINE);
          oModel.onEntryUpdated(entry, orginalEntry);
        } catch (error) {// eslint-disable-line
          // Log error
        }
      }
    }
  });

  _Manager["default"].register(_Names["default"].ACTIVITY, _Types["default"].SDATA, __class);

  var _default = __class;
  _exports["default"] = _default;
});