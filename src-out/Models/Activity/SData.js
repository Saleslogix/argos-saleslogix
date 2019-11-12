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

      var results$ = this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbHMvQWN0aXZpdHkvU0RhdGEuanMiXSwibmFtZXMiOlsiX19jbGFzcyIsImlkIiwiY3JlYXRlUXVlcnlNb2RlbHMiLCJuYW1lIiwicXVlcnlPcmRlckJ5IiwicXVlcnlTZWxlY3QiLCJxdWVyeUluY2x1ZGUiLCJyZXNvdXJjZUtpbmQiLCJjb250cmFjdE5hbWUiLCJjcmVhdGVSZXF1ZXN0UHJvbWlzZSIsImtleSIsIm9wdGlvbnMiLCJyZXF1ZXN0IiwiU2FnZSIsIlNEYXRhIiwiQ2xpZW50IiwiU0RhdGFTaW5nbGVSZXNvdXJjZVJlcXVlc3QiLCJBcHAiLCJnZXRTZXJ2aWNlIiwic2V0UmVzb3VyY2VLaW5kIiwic2V0UmVzb3VyY2VTZWxlY3RvciIsInNldENvbnRyYWN0TmFtZSIsInNldFF1ZXJ5QXJnIiwiam9pbiIsImRlZiIsInJlYWQiLCJzdWNjZXNzIiwiZGF0YSIsInJlc29sdmUiLCJmYWlsdXJlIiwicmVzcG9uc2UiLCJvIiwiYWRkRXJyb3IiLCJyZWplY3QiLCJwcm9taXNlIiwiZ2V0RW50cnkiLCJyZXN1bHRzJCIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsInRoZW4iLCJlbnRyeSIsImxlYWRlciQiLCJMZWFkZXIiLCIka2V5IiwicXVlcnlNb2RlbCIsIl9nZXRRdWVyeU1vZGVsQnlOYW1lIiwicmVjdXJyZW5jZSQiLCJzcGxpdCIsInJlY3VycmluZ0FjdGl2aXR5SWRTZXBhcmF0b3IiLCJzaGlmdCIsInBpY2tsaXN0cyQiLCJQcm9taXNlIiwiYWxsIiwicGlja2xpc3RTZXJ2aWNlIiwicmVxdWVzdFBpY2tsaXN0IiwiVHlwZSIsImxlYWRlciIsInJlY3VycmVuY2UiLCJjb21wbGV0ZUFjdGl2aXR5IiwiY29tcGxldGVBY3Rpdml0eUVudHJ5IiwiJG5hbWUiLCJlbnRpdHkiLCJBY3Rpdml0eUlkIiwidXNlcklkIiwicmVzdWx0IiwiUmVzdWx0IiwiY29tcGxldGVEYXRlIiwiQ29tcGxldGVkRGF0ZSIsIlJlc3VsdENvZGUiLCJyZXN1bHRDb2RlIiwiU0RhdGFTZXJ2aWNlT3BlcmF0aW9uUmVxdWVzdCIsInNldE9wZXJhdGlvbk5hbWUiLCJleGVjdXRlIiwib25BY3Rpdml0eUNvbXBsZXRlZCIsImJpbmQiLCJlcnIiLCJzY29wZSIsImVuYWJsZU9mZmxpbmVTdXBwb3J0Iiwib01vZGVsIiwiTW9kZWxNYW5hZ2VyIiwiZ2V0TW9kZWwiLCJtb2RlbE5hbWUiLCJPRkZMSU5FIiwiZXJyb3IiLCJvbkVudHJ5VXBkYXRlZCIsIm9yZ2luYWxFbnRyeSIsInJlZ2lzdGVyIiwiQUNUSVZJVFkiLCJTREFUQSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxNQUFNQSxVQUFVLHVCQUFRLDJCQUFSLEVBQXFDLDBDQUFyQyxFQUE4RDtBQUM1RUMsUUFBSSxzQkFEd0U7O0FBRzVFQyx1QkFBbUIsU0FBU0EsaUJBQVQsR0FBNkI7QUFDOUMsYUFBTyxDQUFDO0FBQ05DLGNBQU0sTUFEQTtBQUVOQyxzQkFBYyxnQkFGUjtBQUdOQyxxQkFBYSxDQUNYLGFBRFcsRUFFWCxXQUZXLEVBR1gsTUFIVyxFQUlYLFdBSlcsRUFLWCxhQUxXLEVBTVgsV0FOVyxFQU9YLGFBUFcsRUFRWCxhQVJXLEVBU1gsUUFUVyxFQVVYLFVBVlcsRUFXWCxVQVhXLEVBWVgsZUFaVyxFQWFYLFFBYlcsRUFjWCxRQWRXLEVBZVgsVUFmVyxFQWdCWCxPQWhCVyxFQWlCWCxVQWpCVyxFQWtCWCxZQWxCVyxFQW1CWCxpQkFuQlcsRUFvQlgsV0FwQlcsQ0FIUDtBQXlCTkMsc0JBQWMsQ0FDWixjQURZLEVBRVosY0FGWSxDQXpCUjtBQTZCTkMsc0JBQWMsWUE3QlI7QUE4Qk5DLHNCQUFjO0FBOUJSLE9BQUQsRUErQko7QUFDREwsY0FBTSxRQURMO0FBRURFLHFCQUFhLENBQ1gsV0FEVyxFQUVYLGFBRlcsRUFHWCxPQUhXLEVBSVgsV0FKVyxFQUtYLFVBTFcsRUFN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QixFQUE2QztBQUMzRCxVQUFJcEUsSUFBSTRELG9CQUFSLEVBQThCO0FBQzVCLFlBQUk7QUFDRixjQUFNQyxTQUFTN0QsSUFBSThELFlBQUosQ0FBaUJDLFFBQWpCLENBQTBCLEtBQUtDLFNBQS9CLEVBQTBDLGdCQUFZQyxPQUF0RCxDQUFmO0FBQ0FKLGlCQUFPTSxjQUFQLENBQXNCNUMsS0FBdEIsRUFBNkI2QyxZQUE3QjtBQUNELFNBSEQsQ0FHRSxPQUFPRixLQUFQLEVBQWMsQ0FBRztBQUNqQjtBQUNEO0FBQ0Y7QUFDRjtBQXROMkUsR0FBOUQsQ0FBaEI7O0FBeU5BLG9CQUFRRyxRQUFSLENBQWlCLGdCQUFZQyxRQUE3QixFQUF1QyxnQkFBWUMsS0FBbkQsRUFBMER4RixPQUExRDtvQkFDZUEsTyIsImZpbGUiOiJTRGF0YS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBCYXNlIGZyb20gJy4vQmFzZSc7XHJcbmltcG9ydCBfU0RhdGFNb2RlbEJhc2UgZnJvbSAnYXJnb3MvTW9kZWxzL19TRGF0YU1vZGVsQmFzZSc7XHJcbmltcG9ydCBhbGwgZnJvbSAnZG9qby9wcm9taXNlL2FsbCc7XHJcbmltcG9ydCBEZWZlcnJlZCBmcm9tICdkb2pvL0RlZmVycmVkJztcclxuaW1wb3J0IEVycm9yTWFuYWdlciBmcm9tICdhcmdvcy9FcnJvck1hbmFnZXInO1xyXG5pbXBvcnQgTWFuYWdlciBmcm9tICdhcmdvcy9Nb2RlbHMvTWFuYWdlcic7XHJcbmltcG9ydCBNT0RFTF9UWVBFUyBmcm9tICdhcmdvcy9Nb2RlbHMvVHlwZXMnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vTmFtZXMnO1xyXG5pbXBvcnQgeyBnZXRQaWNrbGlzdEJ5QWN0aXZpdHlUeXBlIH0gZnJvbSAnLi9BY3Rpdml0eVR5cGVQaWNrbGlzdHMnO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5Nb2RlbHMuQWN0aXZpdHkuU0RhdGEnLCBbQmFzZSwgX1NEYXRhTW9kZWxCYXNlXSwge1xyXG4gIGlkOiAnYWN0aXZpdHlfc2RhdGFfbW9kZWwnLFxyXG5cclxuICBjcmVhdGVRdWVyeU1vZGVsczogZnVuY3Rpb24gY3JlYXRlUXVlcnlNb2RlbHMoKSB7XHJcbiAgICByZXR1cm4gW3tcclxuICAgICAgbmFtZTogJ2xpc3QnLFxyXG4gICAgICBxdWVyeU9yZGVyQnk6ICdTdGFydERhdGUgZGVzYycsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAgICAgJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICAnU3RhcnREYXRlJyxcclxuICAgICAgICAnVHlwZScsXHJcbiAgICAgICAgJ0FjY291bnRJZCcsXHJcbiAgICAgICAgJ0FjY291bnROYW1lJyxcclxuICAgICAgICAnQ29udGFjdElkJyxcclxuICAgICAgICAnQ29udGFjdE5hbWUnLFxyXG4gICAgICAgICdQaG9uZU51bWJlcicsXHJcbiAgICAgICAgJ0xlYWRJZCcsXHJcbiAgICAgICAgJ0xlYWROYW1lJyxcclxuICAgICAgICAnVGlja2V0SWQnLFxyXG4gICAgICAgICdPcHBvcnR1bml0eUlkJyxcclxuICAgICAgICAnTGVhZGVyJyxcclxuICAgICAgICAnVXNlcklkJyxcclxuICAgICAgICAnVGltZWxlc3MnLFxyXG4gICAgICAgICdBbGFybScsXHJcbiAgICAgICAgJ1ByaW9yaXR5JyxcclxuICAgICAgICAnTW9kaWZ5RGF0ZScsXHJcbiAgICAgICAgJ1JlY3VycmVuY2VTdGF0ZScsXHJcbiAgICAgICAgJ1JlY3VycmluZycsXHJcbiAgICAgIF0sXHJcbiAgICAgIHF1ZXJ5SW5jbHVkZTogW1xyXG4gICAgICAgICckZGVzY3JpcHRvcnMnLFxyXG4gICAgICAgICckcGVybWlzc2lvbnMnLFxyXG4gICAgICBdLFxyXG4gICAgICByZXNvdXJjZUtpbmQ6ICdhY3Rpdml0aWVzJyxcclxuICAgICAgY29udHJhY3ROYW1lOiAnc3lzdGVtJyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ2RldGFpbCcsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAgICAgJ0FjY291bnRJZCcsXHJcbiAgICAgICAgJ0FjY291bnROYW1lJyxcclxuICAgICAgICAnQWxhcm0nLFxyXG4gICAgICAgICdBbGFybVRpbWUnLFxyXG4gICAgICAgICdDYXRlZ29yeScsXHJcbiAgICAgICAgJ0NvbXBhbnknLFxyXG4gICAgICAgICdDb250YWN0SWQnLFxyXG4gICAgICAgICdDb250YWN0TmFtZScsXHJcbiAgICAgICAgJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICAnRHVyYXRpb24nLFxyXG4gICAgICAgICdMZWFkZXIvJGtleScsXHJcbiAgICAgICAgJ0xlYWRJZCcsXHJcbiAgICAgICAgJ0xlYWROYW1lJyxcclxuICAgICAgICAnTG9jYXRpb24nLFxyXG4gICAgICAgICdMb25nTm90ZXMnLFxyXG4gICAgICAgICdPcHBvcnR1bml0eUlkJyxcclxuICAgICAgICAnT3Bwb3J0dW5pdHlOYW1lJyxcclxuICAgICAgICAnUGhvbmVOdW1iZXInLFxyXG4gICAgICAgICdQcmlvcml0eScsXHJcbiAgICAgICAgJ1JvbGxvdmVyJyxcclxuICAgICAgICAnU3RhcnREYXRlJyxcclxuICAgICAgICAnRW5kRGF0ZScsXHJcbiAgICAgICAgJ1RpY2tldElkJyxcclxuICAgICAgICAnVGlja2V0TnVtYmVyJyxcclxuICAgICAgICAnVGltZWxlc3MnLFxyXG4gICAgICAgICdUeXBlJyxcclxuICAgICAgICAnUmVjdXJyaW5nJyxcclxuICAgICAgICAnUmVjdXJQZXJpb2QnLFxyXG4gICAgICAgICdSZWN1clBlcmlvZFNwZWMnLFxyXG4gICAgICAgICdSZWN1ckl0ZXJhdGlvbnMnLFxyXG4gICAgICAgICdSZWN1cnJlbmNlU3RhdGUnLFxyXG4gICAgICAgICdBbGxvd0FkZCcsXHJcbiAgICAgICAgJ0FsbG93RWRpdCcsXHJcbiAgICAgICAgJ0FsbG93RGVsZXRlJyxcclxuICAgICAgICAnQWxsb3dDb21wbGV0ZScsXHJcbiAgICAgIF0sXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdlZGl0JyxcclxuICAgICAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICAgICAnQWNjb3VudElkJyxcclxuICAgICAgICAnQWNjb3VudE5hbWUnLFxyXG4gICAgICAgICdBbGFybScsXHJcbiAgICAgICAgJ0FsYXJtVGltZScsXHJcbiAgICAgICAgJ0NhdGVnb3J5JyxcclxuICAgICAgICAnQ29tcGFueScsXHJcbiAgICAgICAgJ0NvbnRhY3RJZCcsXHJcbiAgICAgICAgJ0NvbnRhY3ROYW1lJyxcclxuICAgICAgICAnRGVzY3JpcHRpb24nLFxyXG4gICAgICAgICdEdXJhdGlvbicsXHJcbiAgICAgICAgJ0xlYWRlci8ka2V5JyxcclxuICAgICAgICAnTGVhZElkJyxcclxuICAgICAgICAnTGVhZE5hbWUnLFxyXG4gICAgICAgICdMb2NhdGlvbicsXHJcbiAgICAgICAgJ0xvbmdOb3RlcycsXHJcbiAgICAgICAgJ09wcG9ydHVuaXR5SWQnLFxyXG4gICAgICAgICdPcHBvcnR1bml0eU5hbWUnLFxyXG4gICAgICAgICdQaG9uZU51bWJlcicsXHJcbiAgICAgICAgJ1ByaW9yaXR5JyxcclxuICAgICAgICAnUm9sbG92ZXInLFxyXG4gICAgICAgICdTdGFydERhdGUnLFxyXG4gICAgICAgICdFbmREYXRlJyxcclxuICAgICAgICAnVGlja2V0SWQnLFxyXG4gICAgICAgICdUaWNrZXROdW1iZXInLFxyXG4gICAgICAgICdUaW1lbGVzcycsXHJcbiAgICAgICAgJ1R5cGUnLFxyXG4gICAgICAgICdSZWN1cnJpbmcnLFxyXG4gICAgICAgICdSZWN1clBlcmlvZCcsXHJcbiAgICAgICAgJ1JlY3VyUGVyaW9kU3BlYycsXHJcbiAgICAgICAgJ1JlY3VySXRlcmF0aW9ucycsXHJcbiAgICAgICAgJ1JlY3VycmVuY2VTdGF0ZScsXHJcbiAgICAgICAgJ0FsbG93QWRkJyxcclxuICAgICAgICAnQWxsb3dFZGl0JyxcclxuICAgICAgICAnQWxsb3dEZWxldGUnLFxyXG4gICAgICAgICdBbGxvd0NvbXBsZXRlJyxcclxuICAgICAgXSxcclxuICAgIH1dO1xyXG4gIH0sXHJcbiAgY3JlYXRlUmVxdWVzdFByb21pc2U6IGZ1bmN0aW9uIGNyZWF0ZVJlcXVlc3RQcm9taXNlKGtleSwgcXVlcnlTZWxlY3QsIHJlc291cmNlS2luZCwgY29udHJhY3ROYW1lLCBvcHRpb25zKSB7XHJcbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhU2luZ2xlUmVzb3VyY2VSZXF1ZXN0KEFwcC5nZXRTZXJ2aWNlKCkpXHJcbiAgICAgIC5zZXRSZXNvdXJjZUtpbmQocmVzb3VyY2VLaW5kKVxyXG4gICAgICAuc2V0UmVzb3VyY2VTZWxlY3RvcihgJyR7a2V5fSdgKVxyXG4gICAgICAuc2V0Q29udHJhY3ROYW1lKGNvbnRyYWN0TmFtZSlcclxuICAgICAgLnNldFF1ZXJ5QXJnKCdzZWxlY3QnLCBxdWVyeVNlbGVjdC5qb2luKCcsJykpO1xyXG4gICAgY29uc3QgZGVmID0gbmV3IERlZmVycmVkKCk7XHJcblxyXG4gICAgcmVxdWVzdC5yZWFkKHtcclxuICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcclxuICAgICAgICBkZWYucmVzb2x2ZShkYXRhKTtcclxuICAgICAgfSxcclxuICAgICAgZmFpbHVyZTogKHJlc3BvbnNlLCBvKSA9PiB7XHJcbiAgICAgICAgRXJyb3JNYW5hZ2VyLmFkZEVycm9yKHJlc3BvbnNlLCBvLCBvcHRpb25zLCAnZmFpbHVyZScpO1xyXG4gICAgICAgIGRlZi5yZWplY3QocmVzcG9uc2UpO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZGVmLnByb21pc2U7XHJcbiAgfSxcclxuICBnZXRFbnRyeTogZnVuY3Rpb24gZ2V0RW50cnkob3B0aW9ucykge1xyXG4gICAgY29uc3QgcmVzdWx0cyQgPSB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgcmV0dXJuIHJlc3VsdHMkLnRoZW4oKGVudHJ5KSA9PiB7XHJcbiAgICAgIGNvbnN0IGxlYWRlciQgPSB0aGlzLmNyZWF0ZVJlcXVlc3RQcm9taXNlKGVudHJ5LkxlYWRlci4ka2V5LCBbXHJcbiAgICAgICAgJ1VzZXJJbmZvL0ZpcnN0TmFtZScsXHJcbiAgICAgICAgJ1VzZXJJbmZvL0xhc3ROYW1lJyxcclxuICAgICAgXSwgJ3VzZXJzJywgJ2R5bmFtaWMnLCBvcHRpb25zKTtcclxuICAgICAgY29uc3QgcXVlcnlNb2RlbCA9IHRoaXMuX2dldFF1ZXJ5TW9kZWxCeU5hbWUoJ2RldGFpbCcpO1xyXG4gICAgICBjb25zdCByZWN1cnJlbmNlJCA9IHRoaXMuY3JlYXRlUmVxdWVzdFByb21pc2UoZW50cnkuJGtleS5zcGxpdCh0aGlzLnJlY3VycmluZ0FjdGl2aXR5SWRTZXBhcmF0b3IpLnNoaWZ0KCksXHJcbiAgICAgICAgcXVlcnlNb2RlbC5xdWVyeVNlbGVjdCxcclxuICAgICAgICB0aGlzLnJlc291cmNlS2luZCxcclxuICAgICAgICB0aGlzLmNvbnRyYWN0TmFtZSxcclxuICAgICAgICBvcHRpb25zKTtcclxuICAgICAgY29uc3QgcGlja2xpc3RzJCA9IFByb21pc2UuYWxsKFtcclxuICAgICAgICBBcHAucGlja2xpc3RTZXJ2aWNlLnJlcXVlc3RQaWNrbGlzdChnZXRQaWNrbGlzdEJ5QWN0aXZpdHlUeXBlKGVudHJ5LlR5cGUsICdDYXRlZ29yeScpKSxcclxuICAgICAgICBBcHAucGlja2xpc3RTZXJ2aWNlLnJlcXVlc3RQaWNrbGlzdChnZXRQaWNrbGlzdEJ5QWN0aXZpdHlUeXBlKGVudHJ5LlR5cGUsICdEZXNjcmlwdGlvbicpKSxcclxuICAgICAgICBBcHAucGlja2xpc3RTZXJ2aWNlLnJlcXVlc3RQaWNrbGlzdCgnUHJpb3JpdGllcycpLFxyXG4gICAgICBdKTtcclxuXHJcbiAgICAgIHJldHVybiBhbGwoW2xlYWRlciQsIHJlY3VycmVuY2UkLCBwaWNrbGlzdHMkXSlcclxuICAgICAgICAudGhlbigoW2xlYWRlciwgcmVjdXJyZW5jZV0pID0+IHtcclxuICAgICAgICAgIGVudHJ5LkxlYWRlciA9IGxlYWRlcjtcclxuICAgICAgICAgIGVudHJ5LnJlY3VycmVuY2UgPSByZWN1cnJlbmNlO1xyXG4gICAgICAgICAgcmV0dXJuIGVudHJ5O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBjb21wbGV0ZUFjdGl2aXR5OiBmdW5jdGlvbiBjb21wbGV0ZUFjdGl2aXR5KGVudHJ5KSB7XHJcbiAgICBjb25zdCBjb21wbGV0ZUFjdGl2aXR5RW50cnkgPSB7XHJcbiAgICAgICRuYW1lOiAnQWN0aXZpdHlDb21wbGV0ZScsXHJcbiAgICAgIHJlcXVlc3Q6IHtcclxuICAgICAgICBlbnRpdHk6IHtcclxuICAgICAgICAgICRrZXk6IGVudHJ5LiRrZXksXHJcbiAgICAgICAgfSxcclxuICAgICAgICBBY3Rpdml0eUlkOiBlbnRyeS4ka2V5LFxyXG4gICAgICAgIHVzZXJJZDogZW50cnkuTGVhZGVyLiRrZXksXHJcbiAgICAgICAgcmVzdWx0OiBlbnRyeS5SZXN1bHQsXHJcbiAgICAgICAgY29tcGxldGVEYXRlOiBlbnRyeS5Db21wbGV0ZWREYXRlLFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIGlmIChlbnRyeS5SZXN1bHRDb2RlKSB7XHJcbiAgICAgIGNvbXBsZXRlQWN0aXZpdHlFbnRyeS5yZXN1bHRDb2RlID0gZW50cnkuUmVzdWx0Q29kZTtcclxuICAgIH1cclxuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgU2FnZS5TRGF0YS5DbGllbnQuU0RhdGFTZXJ2aWNlT3BlcmF0aW9uUmVxdWVzdChBcHAuZ2V0U2VydmljZSgpKVxyXG4gICAgICAuc2V0UmVzb3VyY2VLaW5kKHRoaXMucmVzb3VyY2VLaW5kKVxyXG4gICAgICAuc2V0Q29udHJhY3ROYW1lKHRoaXMuY29udHJhY3ROYW1lKVxyXG4gICAgICAuc2V0T3BlcmF0aW9uTmFtZSgnQ29tcGxldGUnKTtcclxuICAgIGNvbnN0IGRlZiA9IG5ldyBEZWZlcnJlZCgpO1xyXG5cclxuICAgIHJlcXVlc3QuZXhlY3V0ZShjb21wbGV0ZUFjdGl2aXR5RW50cnksIHtcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcygpIHsgLy8gQ2FuIHdlIGdldCBiYWNrIHRoZSBoaXN0b3J5IHRvIGFkZCB0byB0aGUgT2ZmbGluZT9cclxuICAgICAgICB0aGlzLm9uQWN0aXZpdHlDb21wbGV0ZWQoZW50cnkpO1xyXG4gICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgIH0uYmluZCh0aGlzKSxcclxuICAgICAgZmFpbHVyZTogZnVuY3Rpb24gZmFpbHVyZShlcnIpIHtcclxuICAgICAgICBkZWYucmVqZWN0KGVycik7XHJcbiAgICAgIH0sXHJcbiAgICAgIHNjb3BlOiB0aGlzLFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZGVmLnByb21pc2U7XHJcbiAgfSxcclxuICBvbkFjdGl2aXR5Q29tcGxldGVkOiBmdW5jdGlvbiBvbkFjdGl2aXR5Q29tcGxldGVkKGVudHJ5KSB7XHJcbiAgICBpZiAoQXBwLmVuYWJsZU9mZmxpbmVTdXBwb3J0KSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3Qgb01vZGVsID0gQXBwLk1vZGVsTWFuYWdlci5nZXRNb2RlbCh0aGlzLm1vZGVsTmFtZSwgTU9ERUxfVFlQRVMuT0ZGTElORSk7XHJcbiAgICAgICAgb01vZGVsLm9uQWN0aXZpdHlDb21wbGV0ZWQoZW50cnkpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgICAgLy8gTG9nIGVycm9yXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIG9uRW50cnlVcGRhdGVkOiBmdW5jdGlvbiBvbkVudHJ5VXBkYXRlZChlbnRyeSwgb3JnaW5hbEVudHJ5KSB7XHJcbiAgICBpZiAoQXBwLmVuYWJsZU9mZmxpbmVTdXBwb3J0KSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3Qgb01vZGVsID0gQXBwLk1vZGVsTWFuYWdlci5nZXRNb2RlbCh0aGlzLm1vZGVsTmFtZSwgTU9ERUxfVFlQRVMuT0ZGTElORSk7XHJcbiAgICAgICAgb01vZGVsLm9uRW50cnlVcGRhdGVkKGVudHJ5LCBvcmdpbmFsRW50cnkpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikgeyAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICAgIC8vIExvZyBlcnJvclxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcblxyXG5NYW5hZ2VyLnJlZ2lzdGVyKE1PREVMX05BTUVTLkFDVElWSVRZLCBNT0RFTF9UWVBFUy5TREFUQSwgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==