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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbHMvSGlzdG9yeS9TRGF0YS5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiaWQiLCJjcmVhdGVRdWVyeU1vZGVscyIsIm5hbWUiLCJxdWVyeU9yZGVyQnkiLCJxdWVyeVdoZXJlIiwicXVlcnlTZWxlY3QiLCJxdWVyeUluY2x1ZGUiLCJyZXF1ZXN0Q29tcGxldGVkVXNlciIsImVudHJ5IiwiZGVmIiwiY29tcGxldGVkVXNlciIsIkNvbXBsZXRlZFVzZXIiLCJyZXF1ZXN0IiwiU2FnZSIsIlNEYXRhIiwiQ2xpZW50IiwiU0RhdGFTaW5nbGVSZXNvdXJjZVJlcXVlc3QiLCJBcHAiLCJnZXRTZXJ2aWNlIiwic2V0Q29udHJhY3ROYW1lIiwic2V0UmVzb3VyY2VLaW5kIiwic2V0UmVzb3VyY2VTZWxlY3RvciIsInNldFF1ZXJ5QXJnIiwiam9pbiIsImFsbG93Q2FjaGVVc2UiLCJyZWFkIiwic3VjY2VzcyIsImRhdGEiLCJyZXNvbHZlIiwiZmFpbHVyZSIsInJlc3BvbnNlIiwibyIsImFkZEVycm9yIiwicmVqZWN0IiwicHJvbWlzZSIsImdldEVudHJ5IiwicmVzdWx0cyQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJ0aGVuIiwidXNlciIsInJlZ2lzdGVyIiwiSElTVE9SWSIsIlNEQVRBIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLE1BQU1BLFVBQVUsdUJBQVEsMEJBQVIsRUFBb0MsMENBQXBDLEVBQTZEO0FBQzNFQyxRQUFJLHFCQUR1RTtBQUUzRUMsdUJBQW1CLFNBQVNBLGlCQUFULEdBQTZCO0FBQzlDLGFBQU8sQ0FBQztBQUNOQyxjQUFNLE1BREE7QUFFTkMsc0JBQWMsb0JBRlI7QUFHTkMsb0JBQVksNEJBSE47QUFJTkMscUJBQWEsQ0FDWCxhQURXLEVBRVgsYUFGVyxFQUdYLFVBSFcsRUFJWCxlQUpXLEVBS1gsYUFMVyxFQU1YLFdBTlcsRUFPWCxVQVBXLEVBUVgsTUFSVyxFQVNYLFFBVFcsRUFVWCxlQVZXLEVBV1gsaUJBWFcsRUFZWCxXQVpXLEVBYVgsV0FiVyxFQWNYLFVBZFcsRUFlWCxZQWZXLEVBZ0JYLE9BaEJXO0FBSlAsT0FBRCxFQXNCSjtBQUNESCxjQUFNLFFBREw7QUFFREcscUJBQWEsQ0FDWCxXQURXLEVBRVgsYUFGVyxFQUdYLFVBSFcsRUFJWCxZQUpXLEVBS1gsZUFMVyxFQU1YLFdBTlcsRUFPWCxhQVBXLEVBUVgsZUFSVyxFQVNYLGFBVFcsRUFVWCxVQVZXLEVBV1gsT0FYVyxFQVlYLFdBWlcsRUFhWCxlQWJXLEVBY1gsaUJBZFcsRUFlWCxVQWZXLEVBZ0JYLFdBaEJXLEVBaUJYLFVBakJXLEVBa0JYLGNBbEJXLEVBbUJYLFFBbkJXLEVBb0JYLFVBcEJXLEVBcUJYLFVBckJXLEVBc0JYLE1BdEJXLEVBdUJYLFVBdkJXLEVBd0JYLFFBeEJXLENBRlo7QUE0QkRDLHNCQUFjLENBQ1osY0FEWTtBQTVCYixPQXRCSSxDQUFQO0FBc0RELEtBekQwRTtBQTBEM0VDLDBCQUFzQixTQUFTQSxvQkFBVCxDQUE4QkMsS0FBOUIsRUFBcUM7QUFDekQsVUFBTUMsTUFBTSx3QkFBWjtBQUNBLFVBQU1DLGdCQUFnQkYsTUFBTUcsYUFBNUI7O0FBRUEsVUFBSUQsYUFBSixFQUFtQjtBQUNqQixZQUFNRSxVQUFVLElBQUlDLEtBQUtDLEtBQUwsQ0FBV0MsTUFBWCxDQUFrQkMsMEJBQXRCLENBQWlEQyxJQUFJQyxVQUFKLEVBQWpELEVBQ2JDLGVBRGEsQ0FDRyxTQURILEVBRWJDLGVBRmEsQ0FFRyxPQUZILEVBR2JDLG1CQUhhLFFBR1dYLGFBSFgsU0FJYlksV0FKYSxDQUlELFFBSkMsRUFJUyxDQUNyQixvQkFEcUIsRUFFckIsbUJBRnFCLEVBR3JCQyxJQUhxQixDQUdoQixHQUhnQixDQUpULENBQWhCOztBQVNBWCxnQkFBUVksYUFBUixHQUF3QixJQUF4Qjs7QUFFQVosZ0JBQVFhLElBQVIsQ0FBYTtBQUNYQyxtQkFBUyxpQkFBQ0MsSUFBRCxFQUFVO0FBQ2pCbEIsZ0JBQUltQixPQUFKLENBQVlELElBQVo7QUFDRCxXQUhVO0FBSVhFLG1CQUFTLGlCQUFDQyxRQUFELEVBQVdDLENBQVgsRUFBaUI7QUFDeEIsbUNBQWFDLFFBQWIsQ0FBc0JGLFFBQXRCLEVBQWdDQyxDQUFoQyxFQUFtQyxFQUFuQyxFQUF1QyxTQUF2QztBQUNBdEIsZ0JBQUl3QixNQUFKLENBQVdILFFBQVg7QUFDRDtBQVBVLFNBQWI7QUFTRCxPQXJCRCxNQXFCTztBQUNMckIsWUFBSW1CLE9BQUosQ0FBWSxLQUFaO0FBQ0Q7O0FBRUQsYUFBT25CLElBQUl5QixPQUFYO0FBQ0QsS0F4RjBFO0FBeUYzRUMsY0FBVSxTQUFTQSxRQUFULEdBQW9CO0FBQUE7O0FBQzVCLFVBQU1DLFdBQVcsS0FBS0MsU0FBTCxDQUFlRixRQUFmLEVBQXlCRyxTQUF6QixDQUFqQjtBQUNBLGFBQU9GLFNBQVNHLElBQVQsQ0FBYyxVQUFDL0IsS0FBRCxFQUFXO0FBQzlCLGVBQU8sTUFBS0Qsb0JBQUwsQ0FBMEJDLEtBQTFCLEVBQWlDK0IsSUFBakMsQ0FBc0MsVUFBQ0MsSUFBRCxFQUFVO0FBQ3JELGNBQUlBLElBQUosRUFBVTtBQUNSaEMsa0JBQU1HLGFBQU4sR0FBc0I2QixJQUF0QjtBQUNEOztBQUVELGlCQUFPaEMsS0FBUDtBQUNELFNBTk0sQ0FBUDtBQU9ELE9BUk0sQ0FBUDtBQVNEO0FBcEcwRSxHQUE3RCxDQUFoQjs7QUF1R0Esb0JBQVFpQyxRQUFSLENBQWlCLGdCQUFZQyxPQUE3QixFQUFzQyxnQkFBWUMsS0FBbEQsRUFBeUQ1QyxPQUF6RDtvQkFDZUEsTyIsImZpbGUiOiJTRGF0YS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBEZWZlcnJlZCBmcm9tICdkb2pvL0RlZmVycmVkJztcclxuaW1wb3J0IEJhc2UgZnJvbSAnLi9CYXNlJztcclxuaW1wb3J0IF9TRGF0YU1vZGVsQmFzZSBmcm9tICdhcmdvcy9Nb2RlbHMvX1NEYXRhTW9kZWxCYXNlJztcclxuaW1wb3J0IE1hbmFnZXIgZnJvbSAnYXJnb3MvTW9kZWxzL01hbmFnZXInO1xyXG5pbXBvcnQgTU9ERUxfVFlQRVMgZnJvbSAnYXJnb3MvTW9kZWxzL1R5cGVzJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uL05hbWVzJztcclxuaW1wb3J0IEVycm9yTWFuYWdlciBmcm9tICdhcmdvcy9FcnJvck1hbmFnZXInO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5Nb2RlbHMuSGlzdG9yeS5TRGF0YScsIFtCYXNlLCBfU0RhdGFNb2RlbEJhc2VdLCB7XHJcbiAgaWQ6ICdoaXN0b3J5X3NkYXRhX21vZGVsJyxcclxuICBjcmVhdGVRdWVyeU1vZGVsczogZnVuY3Rpb24gY3JlYXRlUXVlcnlNb2RlbHMoKSB7XHJcbiAgICByZXR1cm4gW3tcclxuICAgICAgbmFtZTogJ2xpc3QnLFxyXG4gICAgICBxdWVyeU9yZGVyQnk6ICdDb21wbGV0ZWREYXRlIGRlc2MnLFxyXG4gICAgICBxdWVyeVdoZXJlOiAnVHlwZSBuZSBcImF0RGF0YWJhc2VDaGFuZ2VcIicsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAgICAgJ0FjY291bnROYW1lJyxcclxuICAgICAgICAnQ29udGFjdE5hbWUnLFxyXG4gICAgICAgICdMZWFkTmFtZScsXHJcbiAgICAgICAgJ0NvbXBsZXRlZERhdGUnLFxyXG4gICAgICAgICdEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ1N0YXJ0RGF0ZScsXHJcbiAgICAgICAgJ1RpbWVMZXNzJyxcclxuICAgICAgICAnVHlwZScsXHJcbiAgICAgICAgJ0xlYWRJZCcsXHJcbiAgICAgICAgJ09wcG9ydHVuaXR5SWQnLFxyXG4gICAgICAgICdPcHBvcnR1bml0eU5hbWUnLFxyXG4gICAgICAgICdBY2NvdW50SWQnLFxyXG4gICAgICAgICdDb250YWN0SWQnLFxyXG4gICAgICAgICdUaWNrZXRJZCcsXHJcbiAgICAgICAgJ01vZGlmeURhdGUnLFxyXG4gICAgICAgICdOb3RlcycsXHJcbiAgICAgIF0sXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdkZXRhaWwnLFxyXG4gICAgICBxdWVyeVNlbGVjdDogW1xyXG4gICAgICAgICdBY2NvdW50SWQnLFxyXG4gICAgICAgICdBY2NvdW50TmFtZScsXHJcbiAgICAgICAgJ0NhdGVnb3J5JyxcclxuICAgICAgICAnTW9kaWZ5RGF0ZScsXHJcbiAgICAgICAgJ0NvbXBsZXRlZERhdGUnLFxyXG4gICAgICAgICdDb250YWN0SWQnLFxyXG4gICAgICAgICdDb250YWN0TmFtZScsXHJcbiAgICAgICAgJ0NvbXBsZXRlZFVzZXInLFxyXG4gICAgICAgICdEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ0R1cmF0aW9uJyxcclxuICAgICAgICAnTm90ZXMnLFxyXG4gICAgICAgICdMb25nTm90ZXMnLFxyXG4gICAgICAgICdPcHBvcnR1bml0eUlkJyxcclxuICAgICAgICAnT3Bwb3J0dW5pdHlOYW1lJyxcclxuICAgICAgICAnUHJpb3JpdHknLFxyXG4gICAgICAgICdTdGFydERhdGUnLFxyXG4gICAgICAgICdUaWNrZXRJZCcsXHJcbiAgICAgICAgJ1RpY2tldE51bWJlcicsXHJcbiAgICAgICAgJ0xlYWRJZCcsXHJcbiAgICAgICAgJ0xlYWROYW1lJyxcclxuICAgICAgICAnVGltZWxlc3MnLFxyXG4gICAgICAgICdUeXBlJyxcclxuICAgICAgICAnVXNlck5hbWUnLFxyXG4gICAgICAgICdVc2VySWQnLFxyXG4gICAgICBdLFxyXG4gICAgICBxdWVyeUluY2x1ZGU6IFtcclxuICAgICAgICAnJHBlcm1pc3Npb25zJyxcclxuICAgICAgXSxcclxuICAgIH1dO1xyXG4gIH0sXHJcbiAgcmVxdWVzdENvbXBsZXRlZFVzZXI6IGZ1bmN0aW9uIHJlcXVlc3RDb21wbGV0ZWRVc2VyKGVudHJ5KSB7XHJcbiAgICBjb25zdCBkZWYgPSBuZXcgRGVmZXJyZWQoKTtcclxuICAgIGNvbnN0IGNvbXBsZXRlZFVzZXIgPSBlbnRyeS5Db21wbGV0ZWRVc2VyO1xyXG5cclxuICAgIGlmIChjb21wbGV0ZWRVc2VyKSB7XHJcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgU2FnZS5TRGF0YS5DbGllbnQuU0RhdGFTaW5nbGVSZXNvdXJjZVJlcXVlc3QoQXBwLmdldFNlcnZpY2UoKSlcclxuICAgICAgICAuc2V0Q29udHJhY3ROYW1lKCdkeW5hbWljJylcclxuICAgICAgICAuc2V0UmVzb3VyY2VLaW5kKCd1c2VycycpXHJcbiAgICAgICAgLnNldFJlc291cmNlU2VsZWN0b3IoYCcke2NvbXBsZXRlZFVzZXJ9J2ApXHJcbiAgICAgICAgLnNldFF1ZXJ5QXJnKCdzZWxlY3QnLCBbXHJcbiAgICAgICAgICAnVXNlckluZm8vRmlyc3ROYW1lJyxcclxuICAgICAgICAgICdVc2VySW5mby9MYXN0TmFtZScsXHJcbiAgICAgICAgXS5qb2luKCcsJykpO1xyXG5cclxuICAgICAgcmVxdWVzdC5hbGxvd0NhY2hlVXNlID0gdHJ1ZTtcclxuXHJcbiAgICAgIHJlcXVlc3QucmVhZCh7XHJcbiAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcclxuICAgICAgICAgIGRlZi5yZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmFpbHVyZTogKHJlc3BvbnNlLCBvKSA9PiB7XHJcbiAgICAgICAgICBFcnJvck1hbmFnZXIuYWRkRXJyb3IocmVzcG9uc2UsIG8sIHt9LCAnZmFpbHVyZScpO1xyXG4gICAgICAgICAgZGVmLnJlamVjdChyZXNwb25zZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkZWYucmVzb2x2ZShmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRlZi5wcm9taXNlO1xyXG4gIH0sXHJcbiAgZ2V0RW50cnk6IGZ1bmN0aW9uIGdldEVudHJ5KCkge1xyXG4gICAgY29uc3QgcmVzdWx0cyQgPSB0aGlzLmluaGVyaXRlZChnZXRFbnRyeSwgYXJndW1lbnRzKTtcclxuICAgIHJldHVybiByZXN1bHRzJC50aGVuKChlbnRyeSkgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0Q29tcGxldGVkVXNlcihlbnRyeSkudGhlbigodXNlcikgPT4ge1xyXG4gICAgICAgIGlmICh1c2VyKSB7XHJcbiAgICAgICAgICBlbnRyeS5Db21wbGV0ZWRVc2VyID0gdXNlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlbnRyeTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9LFxyXG59KTtcclxuXHJcbk1hbmFnZXIucmVnaXN0ZXIoTU9ERUxfTkFNRVMuSElTVE9SWSwgTU9ERUxfVFlQRVMuU0RBVEEsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=