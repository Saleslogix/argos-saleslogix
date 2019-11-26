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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbHMvQWN0aXZpdHkvU0RhdGEuanMiXSwibmFtZXMiOlsiX19jbGFzcyIsImlkIiwiY3JlYXRlUXVlcnlNb2RlbHMiLCJuYW1lIiwicXVlcnlPcmRlckJ5IiwicXVlcnlTZWxlY3QiLCJxdWVyeUluY2x1ZGUiLCJyZXNvdXJjZUtpbmQiLCJjb250cmFjdE5hbWUiLCJjcmVhdGVSZXF1ZXN0UHJvbWlzZSIsImtleSIsIm9wdGlvbnMiLCJyZXF1ZXN0IiwiU2FnZSIsIlNEYXRhIiwiQ2xpZW50IiwiU0RhdGFTaW5nbGVSZXNvdXJjZVJlcXVlc3QiLCJBcHAiLCJnZXRTZXJ2aWNlIiwic2V0UmVzb3VyY2VLaW5kIiwic2V0UmVzb3VyY2VTZWxlY3RvciIsInNldENvbnRyYWN0TmFtZSIsInNldFF1ZXJ5QXJnIiwiam9pbiIsImRlZiIsInJlYWQiLCJzdWNjZXNzIiwiZGF0YSIsInJlc29sdmUiLCJmYWlsdXJlIiwicmVzcG9uc2UiLCJvIiwiYWRkRXJyb3IiLCJyZWplY3QiLCJwcm9taXNlIiwiZ2V0RW50cnkiLCJyZXN1bHRzJCIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsInRoZW4iLCJlbnRyeSIsImxlYWRlciQiLCJMZWFkZXIiLCIka2V5IiwicXVlcnlNb2RlbCIsIl9nZXRRdWVyeU1vZGVsQnlOYW1lIiwicmVjdXJyZW5jZSQiLCJzcGxpdCIsInJlY3VycmluZ0FjdGl2aXR5SWRTZXBhcmF0b3IiLCJzaGlmdCIsInBpY2tsaXN0cyQiLCJQcm9taXNlIiwiYWxsIiwicGlja2xpc3RTZXJ2aWNlIiwicmVxdWVzdFBpY2tsaXN0IiwiVHlwZSIsImxlYWRlciIsInJlY3VycmVuY2UiLCJjb21wbGV0ZUFjdGl2aXR5IiwiY29tcGxldGVBY3Rpdml0eUVudHJ5IiwiJG5hbWUiLCJlbnRpdHkiLCJBY3Rpdml0eUlkIiwidXNlcklkIiwicmVzdWx0IiwiUmVzdWx0IiwiY29tcGxldGVEYXRlIiwiQ29tcGxldGVkRGF0ZSIsIlJlc3VsdENvZGUiLCJyZXN1bHRDb2RlIiwiU0RhdGFTZXJ2aWNlT3BlcmF0aW9uUmVxdWVzdCIsInNldE9wZXJhdGlvbk5hbWUiLCJleGVjdXRlIiwib25BY3Rpdml0eUNvbXBsZXRlZCIsImJpbmQiLCJlcnIiLCJzY29wZSIsImVuYWJsZU9mZmxpbmVTdXBwb3J0Iiwib01vZGVsIiwiTW9kZWxNYW5hZ2VyIiwiZ2V0TW9kZWwiLCJtb2RlbE5hbWUiLCJPRkZMSU5FIiwiZXJyb3IiLCJvbkVudHJ5VXBkYXRlZCIsIm9yZ2luYWxFbnRyeSIsInJlZ2lzdGVyIiwiQUNUSVZJVFkiLCJTREFUQSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxNQUFNQSxVQUFVLHVCQUFRLDJCQUFSLEVBQXFDLDBDQUFyQyxFQUE4RDtBQUM1RUMsUUFBSSxzQkFEd0U7O0FBRzVFQyx1QkFBbUIsU0FBU0EsaUJBQVQsR0FBNkI7QUFDOUMsYUFBTyxDQUFDO0FBQ05DLGNBQU0sTUFEQTtBQUVOQyxzQkFBYyxnQkFGUjtBQUdOQyxxQkFBYSxDQUNYLGFBRFcsRUFFWCxXQUZXLEVBR1gsTUFIVyxFQUlYLFdBSlcsRUFLWCxhQUxXLEVBTVgsV0FOVyxFQU9YLGFBUFcsRUFRWCxhQVJXLEVBU1gsUUFUVyxFQVVYLFVBVlcsRUFXWCxVQVhXLEVBWVgsZUFaVyxFQWFYLFFBYlcsRUFjWCxRQWRXLEVBZVgsVUFmVyxFQWdCWCxPQWhCVyxFQWlCWCxVQWpCVyxFQWtCWCxZQWxCVyxFQW1CWCxpQkFuQlcsRUFvQlgsV0FwQlcsQ0FIUDtBQXlCTkMsc0JBQWMsQ0FDWixjQURZLEVBRVosY0FGWSxDQXpCUjtBQTZCTkMsc0JBQWMsWUE3QlI7QUE4Qk5DLHNCQUFjO0FBOUJSLE9BQUQsRUErQko7QUFDREwsY0FBTSxRQURMO0FBRURFLHFCQUFhLENBQ1gsV0FEVyxFQUVYLGFBRlcsRUFHWCxPQUhXLEVBSVgsV0FKVyxFQUtYLFVBTFcsRUFN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LEVBQStCNkMsWUFBL0IsRUFBNkM7QUFDM0QsVUFBSXBFLElBQUk0RCxvQkFBUixFQUE4QjtBQUM1QixZQUFJO0FBQ0YsY0FBTUMsU0FBUzdELElBQUk4RCxZQUFKLENBQWlCQyxRQUFqQixDQUEwQixLQUFLQyxTQUEvQixFQUEwQyxnQkFBWUMsT0FBdEQsQ0FBZjtBQUNBSixpQkFBT00sY0FBUCxDQUFzQjVDLEtBQXRCLEVBQTZCNkMsWUFBN0I7QUFDRCxTQUhELENBR0UsT0FBT0YsS0FBUCxFQUFjLENBQUc7QUFDakI7QUFDRDtBQUNGO0FBQ0Y7QUF0TjJFLEdBQTlELENBQWhCOztBQXlOQSxvQkFBUUcsUUFBUixDQUFpQixnQkFBWUMsUUFBN0IsRUFBdUMsZ0JBQVlDLEtBQW5ELEVBQTBEeEYsT0FBMUQ7b0JBQ2VBLE8iLCJmaWxlIjoiU0RhdGEuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgQmFzZSBmcm9tICcuL0Jhc2UnO1xyXG5pbXBvcnQgX1NEYXRhTW9kZWxCYXNlIGZyb20gJ2FyZ29zL01vZGVscy9fU0RhdGFNb2RlbEJhc2UnO1xyXG5pbXBvcnQgYWxsIGZyb20gJ2Rvam8vcHJvbWlzZS9hbGwnO1xyXG5pbXBvcnQgRGVmZXJyZWQgZnJvbSAnZG9qby9EZWZlcnJlZCc7XHJcbmltcG9ydCBFcnJvck1hbmFnZXIgZnJvbSAnYXJnb3MvRXJyb3JNYW5hZ2VyJztcclxuaW1wb3J0IE1hbmFnZXIgZnJvbSAnYXJnb3MvTW9kZWxzL01hbmFnZXInO1xyXG5pbXBvcnQgTU9ERUxfVFlQRVMgZnJvbSAnYXJnb3MvTW9kZWxzL1R5cGVzJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uL05hbWVzJztcclxuaW1wb3J0IHsgZ2V0UGlja2xpc3RCeUFjdGl2aXR5VHlwZSB9IGZyb20gJy4vQWN0aXZpdHlUeXBlUGlja2xpc3RzJztcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uTW9kZWxzLkFjdGl2aXR5LlNEYXRhJywgW0Jhc2UsIF9TRGF0YU1vZGVsQmFzZV0sIHtcclxuICBpZDogJ2FjdGl2aXR5X3NkYXRhX21vZGVsJyxcclxuXHJcbiAgY3JlYXRlUXVlcnlNb2RlbHM6IGZ1bmN0aW9uIGNyZWF0ZVF1ZXJ5TW9kZWxzKCkge1xyXG4gICAgcmV0dXJuIFt7XHJcbiAgICAgIG5hbWU6ICdsaXN0JyxcclxuICAgICAgcXVlcnlPcmRlckJ5OiAnU3RhcnREYXRlIGRlc2MnLFxyXG4gICAgICBxdWVyeVNlbGVjdDogW1xyXG4gICAgICAgICdEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ1N0YXJ0RGF0ZScsXHJcbiAgICAgICAgJ1R5cGUnLFxyXG4gICAgICAgICdBY2NvdW50SWQnLFxyXG4gICAgICAgICdBY2NvdW50TmFtZScsXHJcbiAgICAgICAgJ0NvbnRhY3RJZCcsXHJcbiAgICAgICAgJ0NvbnRhY3ROYW1lJyxcclxuICAgICAgICAnUGhvbmVOdW1iZXInLFxyXG4gICAgICAgICdMZWFkSWQnLFxyXG4gICAgICAgICdMZWFkTmFtZScsXHJcbiAgICAgICAgJ1RpY2tldElkJyxcclxuICAgICAgICAnT3Bwb3J0dW5pdHlJZCcsXHJcbiAgICAgICAgJ0xlYWRlcicsXHJcbiAgICAgICAgJ1VzZXJJZCcsXHJcbiAgICAgICAgJ1RpbWVsZXNzJyxcclxuICAgICAgICAnQWxhcm0nLFxyXG4gICAgICAgICdQcmlvcml0eScsXHJcbiAgICAgICAgJ01vZGlmeURhdGUnLFxyXG4gICAgICAgICdSZWN1cnJlbmNlU3RhdGUnLFxyXG4gICAgICAgICdSZWN1cnJpbmcnLFxyXG4gICAgICBdLFxyXG4gICAgICBxdWVyeUluY2x1ZGU6IFtcclxuICAgICAgICAnJGRlc2NyaXB0b3JzJyxcclxuICAgICAgICAnJHBlcm1pc3Npb25zJyxcclxuICAgICAgXSxcclxuICAgICAgcmVzb3VyY2VLaW5kOiAnYWN0aXZpdGllcycsXHJcbiAgICAgIGNvbnRyYWN0TmFtZTogJ3N5c3RlbScsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdkZXRhaWwnLFxyXG4gICAgICBxdWVyeVNlbGVjdDogW1xyXG4gICAgICAgICdBY2NvdW50SWQnLFxyXG4gICAgICAgICdBY2NvdW50TmFtZScsXHJcbiAgICAgICAgJ0FsYXJtJyxcclxuICAgICAgICAnQWxhcm1UaW1lJyxcclxuICAgICAgICAnQ2F0ZWdvcnknLFxyXG4gICAgICAgICdDb21wYW55JyxcclxuICAgICAgICAnQ29udGFjdElkJyxcclxuICAgICAgICAnQ29udGFjdE5hbWUnLFxyXG4gICAgICAgICdEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ0R1cmF0aW9uJyxcclxuICAgICAgICAnTGVhZGVyLyRrZXknLFxyXG4gICAgICAgICdMZWFkSWQnLFxyXG4gICAgICAgICdMZWFkTmFtZScsXHJcbiAgICAgICAgJ0xvY2F0aW9uJyxcclxuICAgICAgICAnTG9uZ05vdGVzJyxcclxuICAgICAgICAnT3Bwb3J0dW5pdHlJZCcsXHJcbiAgICAgICAgJ09wcG9ydHVuaXR5TmFtZScsXHJcbiAgICAgICAgJ1Bob25lTnVtYmVyJyxcclxuICAgICAgICAnUHJpb3JpdHknLFxyXG4gICAgICAgICdSb2xsb3ZlcicsXHJcbiAgICAgICAgJ1N0YXJ0RGF0ZScsXHJcbiAgICAgICAgJ0VuZERhdGUnLFxyXG4gICAgICAgICdUaWNrZXRJZCcsXHJcbiAgICAgICAgJ1RpY2tldE51bWJlcicsXHJcbiAgICAgICAgJ1RpbWVsZXNzJyxcclxuICAgICAgICAnVHlwZScsXHJcbiAgICAgICAgJ1JlY3VycmluZycsXHJcbiAgICAgICAgJ1JlY3VyUGVyaW9kJyxcclxuICAgICAgICAnUmVjdXJQZXJpb2RTcGVjJyxcclxuICAgICAgICAnUmVjdXJJdGVyYXRpb25zJyxcclxuICAgICAgICAnUmVjdXJyZW5jZVN0YXRlJyxcclxuICAgICAgICAnQWxsb3dBZGQnLFxyXG4gICAgICAgICdBbGxvd0VkaXQnLFxyXG4gICAgICAgICdBbGxvd0RlbGV0ZScsXHJcbiAgICAgICAgJ0FsbG93Q29tcGxldGUnLFxyXG4gICAgICBdLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnZWRpdCcsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAgICAgJ0FjY291bnRJZCcsXHJcbiAgICAgICAgJ0FjY291bnROYW1lJyxcclxuICAgICAgICAnQWxhcm0nLFxyXG4gICAgICAgICdBbGFybVRpbWUnLFxyXG4gICAgICAgICdDYXRlZ29yeScsXHJcbiAgICAgICAgJ0NvbXBhbnknLFxyXG4gICAgICAgICdDb250YWN0SWQnLFxyXG4gICAgICAgICdDb250YWN0TmFtZScsXHJcbiAgICAgICAgJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICAnRHVyYXRpb24nLFxyXG4gICAgICAgICdMZWFkZXIvJGtleScsXHJcbiAgICAgICAgJ0xlYWRJZCcsXHJcbiAgICAgICAgJ0xlYWROYW1lJyxcclxuICAgICAgICAnTG9jYXRpb24nLFxyXG4gICAgICAgICdMb25nTm90ZXMnLFxyXG4gICAgICAgICdPcHBvcnR1bml0eUlkJyxcclxuICAgICAgICAnT3Bwb3J0dW5pdHlOYW1lJyxcclxuICAgICAgICAnUGhvbmVOdW1iZXInLFxyXG4gICAgICAgICdQcmlvcml0eScsXHJcbiAgICAgICAgJ1JvbGxvdmVyJyxcclxuICAgICAgICAnU3RhcnREYXRlJyxcclxuICAgICAgICAnRW5kRGF0ZScsXHJcbiAgICAgICAgJ1RpY2tldElkJyxcclxuICAgICAgICAnVGlja2V0TnVtYmVyJyxcclxuICAgICAgICAnVGltZWxlc3MnLFxyXG4gICAgICAgICdUeXBlJyxcclxuICAgICAgICAnUmVjdXJyaW5nJyxcclxuICAgICAgICAnUmVjdXJQZXJpb2QnLFxyXG4gICAgICAgICdSZWN1clBlcmlvZFNwZWMnLFxyXG4gICAgICAgICdSZWN1ckl0ZXJhdGlvbnMnLFxyXG4gICAgICAgICdSZWN1cnJlbmNlU3RhdGUnLFxyXG4gICAgICAgICdBbGxvd0FkZCcsXHJcbiAgICAgICAgJ0FsbG93RWRpdCcsXHJcbiAgICAgICAgJ0FsbG93RGVsZXRlJyxcclxuICAgICAgICAnQWxsb3dDb21wbGV0ZScsXHJcbiAgICAgIF0sXHJcbiAgICB9XTtcclxuICB9LFxyXG4gIGNyZWF0ZVJlcXVlc3RQcm9taXNlOiBmdW5jdGlvbiBjcmVhdGVSZXF1ZXN0UHJvbWlzZShrZXksIHF1ZXJ5U2VsZWN0LCByZXNvdXJjZUtpbmQsIGNvbnRyYWN0TmFtZSwgb3B0aW9ucykge1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBTYWdlLlNEYXRhLkNsaWVudC5TRGF0YVNpbmdsZVJlc291cmNlUmVxdWVzdChBcHAuZ2V0U2VydmljZSgpKVxyXG4gICAgICAuc2V0UmVzb3VyY2VLaW5kKHJlc291cmNlS2luZClcclxuICAgICAgLnNldFJlc291cmNlU2VsZWN0b3IoYCcke2tleX0nYClcclxuICAgICAgLnNldENvbnRyYWN0TmFtZShjb250cmFjdE5hbWUpXHJcbiAgICAgIC5zZXRRdWVyeUFyZygnc2VsZWN0JywgcXVlcnlTZWxlY3Quam9pbignLCcpKTtcclxuICAgIGNvbnN0IGRlZiA9IG5ldyBEZWZlcnJlZCgpO1xyXG5cclxuICAgIHJlcXVlc3QucmVhZCh7XHJcbiAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgZGVmLnJlc29sdmUoZGF0YSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWx1cmU6IChyZXNwb25zZSwgbykgPT4ge1xyXG4gICAgICAgIEVycm9yTWFuYWdlci5hZGRFcnJvcihyZXNwb25zZSwgbywgb3B0aW9ucywgJ2ZhaWx1cmUnKTtcclxuICAgICAgICBkZWYucmVqZWN0KHJlc3BvbnNlKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGRlZi5wcm9taXNlO1xyXG4gIH0sXHJcbiAgZ2V0RW50cnk6IGZ1bmN0aW9uIGdldEVudHJ5KG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHJlc3VsdHMkID0gdGhpcy5pbmhlcml0ZWQoZ2V0RW50cnksIGFyZ3VtZW50cyk7XHJcbiAgICByZXR1cm4gcmVzdWx0cyQudGhlbigoZW50cnkpID0+IHtcclxuICAgICAgY29uc3QgbGVhZGVyJCA9IHRoaXMuY3JlYXRlUmVxdWVzdFByb21pc2UoZW50cnkuTGVhZGVyLiRrZXksIFtcclxuICAgICAgICAnVXNlckluZm8vRmlyc3ROYW1lJyxcclxuICAgICAgICAnVXNlckluZm8vTGFzdE5hbWUnLFxyXG4gICAgICBdLCAndXNlcnMnLCAnZHluYW1pYycsIG9wdGlvbnMpO1xyXG4gICAgICBjb25zdCBxdWVyeU1vZGVsID0gdGhpcy5fZ2V0UXVlcnlNb2RlbEJ5TmFtZSgnZGV0YWlsJyk7XHJcbiAgICAgIGNvbnN0IHJlY3VycmVuY2UkID0gdGhpcy5jcmVhdGVSZXF1ZXN0UHJvbWlzZShlbnRyeS4ka2V5LnNwbGl0KHRoaXMucmVjdXJyaW5nQWN0aXZpdHlJZFNlcGFyYXRvcikuc2hpZnQoKSxcclxuICAgICAgICBxdWVyeU1vZGVsLnF1ZXJ5U2VsZWN0LFxyXG4gICAgICAgIHRoaXMucmVzb3VyY2VLaW5kLFxyXG4gICAgICAgIHRoaXMuY29udHJhY3ROYW1lLFxyXG4gICAgICAgIG9wdGlvbnMpO1xyXG4gICAgICBjb25zdCBwaWNrbGlzdHMkID0gUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgIEFwcC5waWNrbGlzdFNlcnZpY2UucmVxdWVzdFBpY2tsaXN0KGdldFBpY2tsaXN0QnlBY3Rpdml0eVR5cGUoZW50cnkuVHlwZSwgJ0NhdGVnb3J5JykpLFxyXG4gICAgICAgIEFwcC5waWNrbGlzdFNlcnZpY2UucmVxdWVzdFBpY2tsaXN0KGdldFBpY2tsaXN0QnlBY3Rpdml0eVR5cGUoZW50cnkuVHlwZSwgJ0Rlc2NyaXB0aW9uJykpLFxyXG4gICAgICAgIEFwcC5waWNrbGlzdFNlcnZpY2UucmVxdWVzdFBpY2tsaXN0KCdQcmlvcml0aWVzJyksXHJcbiAgICAgIF0pO1xyXG5cclxuICAgICAgcmV0dXJuIGFsbChbbGVhZGVyJCwgcmVjdXJyZW5jZSQsIHBpY2tsaXN0cyRdKVxyXG4gICAgICAgIC50aGVuKChbbGVhZGVyLCByZWN1cnJlbmNlXSkgPT4ge1xyXG4gICAgICAgICAgZW50cnkuTGVhZGVyID0gbGVhZGVyO1xyXG4gICAgICAgICAgZW50cnkucmVjdXJyZW5jZSA9IHJlY3VycmVuY2U7XHJcbiAgICAgICAgICByZXR1cm4gZW50cnk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGNvbXBsZXRlQWN0aXZpdHk6IGZ1bmN0aW9uIGNvbXBsZXRlQWN0aXZpdHkoZW50cnkpIHtcclxuICAgIGNvbnN0IGNvbXBsZXRlQWN0aXZpdHlFbnRyeSA9IHtcclxuICAgICAgJG5hbWU6ICdBY3Rpdml0eUNvbXBsZXRlJyxcclxuICAgICAgcmVxdWVzdDoge1xyXG4gICAgICAgIGVudGl0eToge1xyXG4gICAgICAgICAgJGtleTogZW50cnkuJGtleSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIEFjdGl2aXR5SWQ6IGVudHJ5LiRrZXksXHJcbiAgICAgICAgdXNlcklkOiBlbnRyeS5MZWFkZXIuJGtleSxcclxuICAgICAgICByZXN1bHQ6IGVudHJ5LlJlc3VsdCxcclxuICAgICAgICBjb21wbGV0ZURhdGU6IGVudHJ5LkNvbXBsZXRlZERhdGUsXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgaWYgKGVudHJ5LlJlc3VsdENvZGUpIHtcclxuICAgICAgY29tcGxldGVBY3Rpdml0eUVudHJ5LnJlc3VsdENvZGUgPSBlbnRyeS5SZXN1bHRDb2RlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBTYWdlLlNEYXRhLkNsaWVudC5TRGF0YVNlcnZpY2VPcGVyYXRpb25SZXF1ZXN0KEFwcC5nZXRTZXJ2aWNlKCkpXHJcbiAgICAgIC5zZXRSZXNvdXJjZUtpbmQodGhpcy5yZXNvdXJjZUtpbmQpXHJcbiAgICAgIC5zZXRDb250cmFjdE5hbWUodGhpcy5jb250cmFjdE5hbWUpXHJcbiAgICAgIC5zZXRPcGVyYXRpb25OYW1lKCdDb21wbGV0ZScpO1xyXG4gICAgY29uc3QgZGVmID0gbmV3IERlZmVycmVkKCk7XHJcblxyXG4gICAgcmVxdWVzdC5leGVjdXRlKGNvbXBsZXRlQWN0aXZpdHlFbnRyeSwge1xyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKCkgeyAvLyBDYW4gd2UgZ2V0IGJhY2sgdGhlIGhpc3RvcnkgdG8gYWRkIHRvIHRoZSBPZmZsaW5lP1xyXG4gICAgICAgIHRoaXMub25BY3Rpdml0eUNvbXBsZXRlZChlbnRyeSk7XHJcbiAgICAgICAgZGVmLnJlc29sdmUoKTtcclxuICAgICAgfS5iaW5kKHRoaXMpLFxyXG4gICAgICBmYWlsdXJlOiBmdW5jdGlvbiBmYWlsdXJlKGVycikge1xyXG4gICAgICAgIGRlZi5yZWplY3QoZXJyKTtcclxuICAgICAgfSxcclxuICAgICAgc2NvcGU6IHRoaXMsXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBkZWYucHJvbWlzZTtcclxuICB9LFxyXG4gIG9uQWN0aXZpdHlDb21wbGV0ZWQ6IGZ1bmN0aW9uIG9uQWN0aXZpdHlDb21wbGV0ZWQoZW50cnkpIHtcclxuICAgIGlmIChBcHAuZW5hYmxlT2ZmbGluZVN1cHBvcnQpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBvTW9kZWwgPSBBcHAuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKHRoaXMubW9kZWxOYW1lLCBNT0RFTF9UWVBFUy5PRkZMSU5FKTtcclxuICAgICAgICBvTW9kZWwub25BY3Rpdml0eUNvbXBsZXRlZChlbnRyeSk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICAvLyBMb2cgZXJyb3JcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25FbnRyeVVwZGF0ZWQ6IGZ1bmN0aW9uIG9uRW50cnlVcGRhdGVkKGVudHJ5LCBvcmdpbmFsRW50cnkpIHtcclxuICAgIGlmIChBcHAuZW5hYmxlT2ZmbGluZVN1cHBvcnQpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBvTW9kZWwgPSBBcHAuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKHRoaXMubW9kZWxOYW1lLCBNT0RFTF9UWVBFUy5PRkZMSU5FKTtcclxuICAgICAgICBvTW9kZWwub25FbnRyeVVwZGF0ZWQoZW50cnksIG9yZ2luYWxFbnRyeSk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgICAgLy8gTG9nIGVycm9yXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG59KTtcclxuXHJcbk1hbmFnZXIucmVnaXN0ZXIoTU9ERUxfTkFNRVMuQUNUSVZJVFksIE1PREVMX1RZUEVTLlNEQVRBLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19