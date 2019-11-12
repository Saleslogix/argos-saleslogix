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

      var results$ = this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbHMvSGlzdG9yeS9TRGF0YS5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiaWQiLCJjcmVhdGVRdWVyeU1vZGVscyIsIm5hbWUiLCJxdWVyeU9yZGVyQnkiLCJxdWVyeVdoZXJlIiwicXVlcnlTZWxlY3QiLCJxdWVyeUluY2x1ZGUiLCJyZXF1ZXN0Q29tcGxldGVkVXNlciIsImVudHJ5IiwiZGVmIiwiY29tcGxldGVkVXNlciIsIkNvbXBsZXRlZFVzZXIiLCJyZXF1ZXN0IiwiU2FnZSIsIlNEYXRhIiwiQ2xpZW50IiwiU0RhdGFTaW5nbGVSZXNvdXJjZVJlcXVlc3QiLCJBcHAiLCJnZXRTZXJ2aWNlIiwic2V0Q29udHJhY3ROYW1lIiwic2V0UmVzb3VyY2VLaW5kIiwic2V0UmVzb3VyY2VTZWxlY3RvciIsInNldFF1ZXJ5QXJnIiwiam9pbiIsImFsbG93Q2FjaGVVc2UiLCJyZWFkIiwic3VjY2VzcyIsImRhdGEiLCJyZXNvbHZlIiwiZmFpbHVyZSIsInJlc3BvbnNlIiwibyIsImFkZEVycm9yIiwicmVqZWN0IiwicHJvbWlzZSIsImdldEVudHJ5IiwicmVzdWx0cyQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJ0aGVuIiwidXNlciIsInJlZ2lzdGVyIiwiSElTVE9SWSIsIlNEQVRBIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLE1BQU1BLFVBQVUsdUJBQVEsMEJBQVIsRUFBb0MsMENBQXBDLEVBQTZEO0FBQzNFQyxRQUFJLHFCQUR1RTtBQUUzRUMsdUJBQW1CLFNBQVNBLGlCQUFULEdBQTZCO0FBQzlDLGFBQU8sQ0FBQztBQUNOQyxjQUFNLE1BREE7QUFFTkMsc0JBQWMsb0JBRlI7QUFHTkMsb0JBQVksNEJBSE47QUFJTkMscUJBQWEsQ0FDWCxhQURXLEVBRVgsYUFGVyxFQUdYLFVBSFcsRUFJWCxlQUpXLEVBS1gsYUFMVyxFQU1YLFdBTlcsRUFPWCxVQVBXLEVBUVgsTUFSVyxFQVNYLFFBVFcsRUFVWCxlQVZXLEVBV1gsaUJBWFcsRUFZWCxXQVpXLEVBYVgsV0FiVyxFQWNYLFVBZFcsRUFlWCxZQWZXLEVBZ0JYLE9BaEJXO0FBSlAsT0FBRCxFQXNCSjtBQUNESCxjQUFNLFFBREw7QUFFREcscUJBQWEsQ0FDWCxXQURXLEVBRVgsYUFGVyxFQUdYLFVBSFcsRUFJWCxZQUpXLEVBS1gsZUFMVyxFQU1YLFdBTlcsRUFPWCxhQVBXLEVBUVgsZUFSVyxFQVNYLGFBVFcsRUFVWCxVQVZXLEVBV1gsT0FYVyxFQVlYLFdBWlcsRUFhWCxlQWJXLEVBY1gsaUJBZFcsRUFlWCxVQWZXLEVBZ0JYLFdBaEJXLEVBaUJYLFVBakJXLEVBa0JYLGNBbEJXLEVBbUJYLFFBbkJXLEVBb0JYLFVBcEJXLEVBcUJYLFVBckJXLEVBc0JYLE1BdEJXLEVBdUJYLFVBdkJXLEVBd0JYLFFBeEJXLENBRlo7QUE0QkRDLHNCQUFjLENBQ1osY0FEWTtBQTVCYixPQXRCSSxDQUFQO0FBc0RELEtBekQwRTtBQTBEM0VDLDBCQUFzQixTQUFTQSxvQkFBVCxDQUE4QkMsS0FBOUIsRUFBcUM7QUFDekQsVUFBTUMsTUFBTSx3QkFBWjtBQUNBLFVBQU1DLGdCQUFnQkYsTUFBTUcsYUFBNUI7O0FBRUEsVUFBSUQsYUFBSixFQUFtQjtBQUNqQixZQUFNRSxVQUFVLElBQUlDLEtBQUtDLEtBQUwsQ0FBV0MsTUFBWCxDQUFrQkMsMEJBQXRCLENBQWlEQyxJQUFJQyxVQUFKLEVBQWpELEVBQ2JDLGVBRGEsQ0FDRyxTQURILEVBRWJDLGVBRmEsQ0FFRyxPQUZILEVBR2JDLG1CQUhhLFFBR1dYLGFBSFgsU0FJYlksV0FKYSxDQUlELFFBSkMsRUFJUyxDQUNyQixvQkFEcUIsRUFFckIsbUJBRnFCLEVBR3JCQyxJQUhxQixDQUdoQixHQUhnQixDQUpULENBQWhCOztBQVNBWCxnQkFBUVksYUFBUixHQUF3QixJQUF4Qjs7QUFFQVosZ0JBQVFhLElBQVIsQ0FBYTtBQUNYQyxtQkFBUyxpQkFBQ0MsSUFBRCxFQUFVO0FBQ2pCbEIsZ0JBQUltQixPQUFKLENBQVlELElBQVo7QUFDRCxXQUhVO0FBSVhFLG1CQUFTLGlCQUFDQyxRQUFELEVBQVdDLENBQVgsRUFBaUI7QUFDeEIsbUNBQWFDLFFBQWIsQ0FBc0JGLFFBQXRCLEVBQWdDQyxDQUFoQyxFQUFtQyxFQUFuQyxFQUF1QyxTQUF2QztBQUNBdEIsZ0JBQUl3QixNQUFKLENBQVdILFFBQVg7QUFDRDtBQVBVLFNBQWI7QUFTRCxPQXJCRCxNQXFCTztBQUNMckIsWUFBSW1CLE9BQUosQ0FBWSxLQUFaO0FBQ0Q7O0FBRUQsYUFBT25CLElBQUl5QixPQUFYO0FBQ0QsS0F4RjBFO0FBeUYzRUMsY0FBVSxTQUFTQSxRQUFULEdBQW9CO0FBQUE7O0FBQzVCLFVBQU1DLFdBQVcsS0FBS0MsU0FBTCxDQUFlQyxTQUFmLENBQWpCO0FBQ0EsYUFBT0YsU0FBU0csSUFBVCxDQUFjLFVBQUMvQixLQUFELEVBQVc7QUFDOUIsZUFBTyxNQUFLRCxvQkFBTCxDQUEwQkMsS0FBMUIsRUFBaUMrQixJQUFqQyxDQUFzQyxVQUFDQyxJQUFELEVBQVU7QUFDckQsY0FBSUEsSUFBSixFQUFVO0FBQ1JoQyxrQkFBTUcsYUFBTixHQUFzQjZCLElBQXRCO0FBQ0Q7O0FBRUQsaUJBQU9oQyxLQUFQO0FBQ0QsU0FOTSxDQUFQO0FBT0QsT0FSTSxDQUFQO0FBU0Q7QUFwRzBFLEdBQTdELENBQWhCOztBQXVHQSxvQkFBUWlDLFFBQVIsQ0FBaUIsZ0JBQVlDLE9BQTdCLEVBQXNDLGdCQUFZQyxLQUFsRCxFQUF5RDVDLE9BQXpEO29CQUNlQSxPIiwiZmlsZSI6IlNEYXRhLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IERlZmVycmVkIGZyb20gJ2Rvam8vRGVmZXJyZWQnO1xyXG5pbXBvcnQgQmFzZSBmcm9tICcuL0Jhc2UnO1xyXG5pbXBvcnQgX1NEYXRhTW9kZWxCYXNlIGZyb20gJ2FyZ29zL01vZGVscy9fU0RhdGFNb2RlbEJhc2UnO1xyXG5pbXBvcnQgTWFuYWdlciBmcm9tICdhcmdvcy9Nb2RlbHMvTWFuYWdlcic7XHJcbmltcG9ydCBNT0RFTF9UWVBFUyBmcm9tICdhcmdvcy9Nb2RlbHMvVHlwZXMnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vTmFtZXMnO1xyXG5pbXBvcnQgRXJyb3JNYW5hZ2VyIGZyb20gJ2FyZ29zL0Vycm9yTWFuYWdlcic7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLk1vZGVscy5IaXN0b3J5LlNEYXRhJywgW0Jhc2UsIF9TRGF0YU1vZGVsQmFzZV0sIHtcclxuICBpZDogJ2hpc3Rvcnlfc2RhdGFfbW9kZWwnLFxyXG4gIGNyZWF0ZVF1ZXJ5TW9kZWxzOiBmdW5jdGlvbiBjcmVhdGVRdWVyeU1vZGVscygpIHtcclxuICAgIHJldHVybiBbe1xyXG4gICAgICBuYW1lOiAnbGlzdCcsXHJcbiAgICAgIHF1ZXJ5T3JkZXJCeTogJ0NvbXBsZXRlZERhdGUgZGVzYycsXHJcbiAgICAgIHF1ZXJ5V2hlcmU6ICdUeXBlIG5lIFwiYXREYXRhYmFzZUNoYW5nZVwiJyxcclxuICAgICAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICAgICAnQWNjb3VudE5hbWUnLFxyXG4gICAgICAgICdDb250YWN0TmFtZScsXHJcbiAgICAgICAgJ0xlYWROYW1lJyxcclxuICAgICAgICAnQ29tcGxldGVkRGF0ZScsXHJcbiAgICAgICAgJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICAnU3RhcnREYXRlJyxcclxuICAgICAgICAnVGltZUxlc3MnLFxyXG4gICAgICAgICdUeXBlJyxcclxuICAgICAgICAnTGVhZElkJyxcclxuICAgICAgICAnT3Bwb3J0dW5pdHlJZCcsXHJcbiAgICAgICAgJ09wcG9ydHVuaXR5TmFtZScsXHJcbiAgICAgICAgJ0FjY291bnRJZCcsXHJcbiAgICAgICAgJ0NvbnRhY3RJZCcsXHJcbiAgICAgICAgJ1RpY2tldElkJyxcclxuICAgICAgICAnTW9kaWZ5RGF0ZScsXHJcbiAgICAgICAgJ05vdGVzJyxcclxuICAgICAgXSxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ2RldGFpbCcsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAgICAgJ0FjY291bnRJZCcsXHJcbiAgICAgICAgJ0FjY291bnROYW1lJyxcclxuICAgICAgICAnQ2F0ZWdvcnknLFxyXG4gICAgICAgICdNb2RpZnlEYXRlJyxcclxuICAgICAgICAnQ29tcGxldGVkRGF0ZScsXHJcbiAgICAgICAgJ0NvbnRhY3RJZCcsXHJcbiAgICAgICAgJ0NvbnRhY3ROYW1lJyxcclxuICAgICAgICAnQ29tcGxldGVkVXNlcicsXHJcbiAgICAgICAgJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICAnRHVyYXRpb24nLFxyXG4gICAgICAgICdOb3RlcycsXHJcbiAgICAgICAgJ0xvbmdOb3RlcycsXHJcbiAgICAgICAgJ09wcG9ydHVuaXR5SWQnLFxyXG4gICAgICAgICdPcHBvcnR1bml0eU5hbWUnLFxyXG4gICAgICAgICdQcmlvcml0eScsXHJcbiAgICAgICAgJ1N0YXJ0RGF0ZScsXHJcbiAgICAgICAgJ1RpY2tldElkJyxcclxuICAgICAgICAnVGlja2V0TnVtYmVyJyxcclxuICAgICAgICAnTGVhZElkJyxcclxuICAgICAgICAnTGVhZE5hbWUnLFxyXG4gICAgICAgICdUaW1lbGVzcycsXHJcbiAgICAgICAgJ1R5cGUnLFxyXG4gICAgICAgICdVc2VyTmFtZScsXHJcbiAgICAgICAgJ1VzZXJJZCcsXHJcbiAgICAgIF0sXHJcbiAgICAgIHF1ZXJ5SW5jbHVkZTogW1xyXG4gICAgICAgICckcGVybWlzc2lvbnMnLFxyXG4gICAgICBdLFxyXG4gICAgfV07XHJcbiAgfSxcclxuICByZXF1ZXN0Q29tcGxldGVkVXNlcjogZnVuY3Rpb24gcmVxdWVzdENvbXBsZXRlZFVzZXIoZW50cnkpIHtcclxuICAgIGNvbnN0IGRlZiA9IG5ldyBEZWZlcnJlZCgpO1xyXG4gICAgY29uc3QgY29tcGxldGVkVXNlciA9IGVudHJ5LkNvbXBsZXRlZFVzZXI7XHJcblxyXG4gICAgaWYgKGNvbXBsZXRlZFVzZXIpIHtcclxuICAgICAgY29uc3QgcmVxdWVzdCA9IG5ldyBTYWdlLlNEYXRhLkNsaWVudC5TRGF0YVNpbmdsZVJlc291cmNlUmVxdWVzdChBcHAuZ2V0U2VydmljZSgpKVxyXG4gICAgICAgIC5zZXRDb250cmFjdE5hbWUoJ2R5bmFtaWMnKVxyXG4gICAgICAgIC5zZXRSZXNvdXJjZUtpbmQoJ3VzZXJzJylcclxuICAgICAgICAuc2V0UmVzb3VyY2VTZWxlY3RvcihgJyR7Y29tcGxldGVkVXNlcn0nYClcclxuICAgICAgICAuc2V0UXVlcnlBcmcoJ3NlbGVjdCcsIFtcclxuICAgICAgICAgICdVc2VySW5mby9GaXJzdE5hbWUnLFxyXG4gICAgICAgICAgJ1VzZXJJbmZvL0xhc3ROYW1lJyxcclxuICAgICAgICBdLmpvaW4oJywnKSk7XHJcblxyXG4gICAgICByZXF1ZXN0LmFsbG93Q2FjaGVVc2UgPSB0cnVlO1xyXG5cclxuICAgICAgcmVxdWVzdC5yZWFkKHtcclxuICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgZGVmLnJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWlsdXJlOiAocmVzcG9uc2UsIG8pID0+IHtcclxuICAgICAgICAgIEVycm9yTWFuYWdlci5hZGRFcnJvcihyZXNwb25zZSwgbywge30sICdmYWlsdXJlJyk7XHJcbiAgICAgICAgICBkZWYucmVqZWN0KHJlc3BvbnNlKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRlZi5yZXNvbHZlKGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGVmLnByb21pc2U7XHJcbiAgfSxcclxuICBnZXRFbnRyeTogZnVuY3Rpb24gZ2V0RW50cnkoKSB7XHJcbiAgICBjb25zdCByZXN1bHRzJCA9IHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICByZXR1cm4gcmVzdWx0cyQudGhlbigoZW50cnkpID0+IHtcclxuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdENvbXBsZXRlZFVzZXIoZW50cnkpLnRoZW4oKHVzZXIpID0+IHtcclxuICAgICAgICBpZiAodXNlcikge1xyXG4gICAgICAgICAgZW50cnkuQ29tcGxldGVkVXNlciA9IHVzZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZW50cnk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5NYW5hZ2VyLnJlZ2lzdGVyKE1PREVMX05BTUVTLkhJU1RPUlksIE1PREVMX1RZUEVTLlNEQVRBLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19