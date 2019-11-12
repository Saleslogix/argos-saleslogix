define('crm/Models/UserActivity/SData', ['module', 'exports', 'dojo/_base/declare', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Convert', 'argos/Models/Types', '../Names'], function (module, exports, _declare, _Base, _SDataModelBase2, _Manager, _Convert, _Types, _Names) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Base2 = _interopRequireDefault(_Base);

  var _SDataModelBase3 = _interopRequireDefault(_SDataModelBase2);

  var _Manager2 = _interopRequireDefault(_Manager);

  var _Convert2 = _interopRequireDefault(_Convert);

  var _Types2 = _interopRequireDefault(_Types);

  var _Names2 = _interopRequireDefault(_Names);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var __class = (0, _declare2.default)('crm.Models.UserActivity.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'useractivity_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'Activity.StartDate desc',
        querySelect: ['Alarm', 'AlarmTime', 'Status', 'Activity/Description', 'Activity/StartDate', 'Activity/EndDate', 'Activity/Type', 'Activity/AccountName', 'Activity/AccountId', 'Activity/ContactId', 'Activity/ContactName', 'Activity/Leader', 'Activity/LeadName', 'Activity/LeadId', 'Activity/OpportunityId', 'Activity/TicketId', 'Activity/UserId', 'Activity/Timeless', 'Activity/PhoneNumber', 'Activity/Recurring', 'Activity/Alarm', 'Activity/ModifyDate', 'Activity/Priority'],
        queryInclude: ['$descriptors', '$permissions']
      }, {
        name: 'myday',
        queryWhere: function queryWhere() {
          var now = moment();
          var todayStart = now.clone().startOf('day');
          var todayEnd = todayStart.clone().endOf('day');

          var theQuery = '((Activity.Timeless eq false and Activity.StartDate between @' + _Convert2.default.toIsoStringFromDate(todayStart.toDate()) + '@ and @' + _Convert2.default.toIsoStringFromDate(todayEnd.toDate()) + '@) or (Activity.Timeless eq true and Activity.StartDate between @' + todayStart.format('YYYY-MM-DDT00:00:00[Z]') + '@ and @' + todayEnd.format('YYYY-MM-DDT23:59:59[Z]') + '@))';
          var userQuery = '(User.Id eq "' + App.context.user.$key + '" and Status ne "asDeclned" and Activity.Type ne "atLiterature")';

          return [userQuery, theQuery].join(' and ');
        },
        queryOrderBy: 'Activity.StartDate desc',
        querySelect: ['Alarm', 'AlarmTime', 'Status', 'Activity/Description', 'Activity/StartDate', 'Activity/EndDate', 'Activity/Type', 'Activity/AccountName', 'Activity/AccountId', 'Activity/ContactId', 'Activity/ContactName', 'Activity/Leader', 'Activity/LeadName', 'Activity/LeadId', 'Activity/OpportunityId', 'Activity/TicketId', 'Activity/UserId', 'Activity/Timeless', 'Activity/PhoneNumber', 'Activity/Recurring', 'Activity/Alarm', 'Activity/ModifyDate', 'Activity/Priority'],
        queryInclude: ['$descriptors', '$permissions']
      }];
    },
    getMyDayQuery: function getMyDayQuery() {
      var queryModel = this._getQueryModelByName('myday');
      return queryModel && queryModel.queryWhere();
    }
  }); /* Copyright 2017 Infor
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

  _Manager2.default.register(_Names2.default.USERACTIVITY, _Types2.default.SDATA, __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbHMvVXNlckFjdGl2aXR5L1NEYXRhLmpzIl0sIm5hbWVzIjpbIl9fY2xhc3MiLCJpZCIsImNyZWF0ZVF1ZXJ5TW9kZWxzIiwibmFtZSIsInF1ZXJ5T3JkZXJCeSIsInF1ZXJ5U2VsZWN0IiwicXVlcnlJbmNsdWRlIiwicXVlcnlXaGVyZSIsIm5vdyIsIm1vbWVudCIsInRvZGF5U3RhcnQiLCJjbG9uZSIsInN0YXJ0T2YiLCJ0b2RheUVuZCIsImVuZE9mIiwidGhlUXVlcnkiLCJ0b0lzb1N0cmluZ0Zyb21EYXRlIiwidG9EYXRlIiwiZm9ybWF0IiwidXNlclF1ZXJ5IiwiQXBwIiwiY29udGV4dCIsInVzZXIiLCIka2V5Iiwiam9pbiIsImdldE15RGF5UXVlcnkiLCJxdWVyeU1vZGVsIiwiX2dldFF1ZXJ5TW9kZWxCeU5hbWUiLCJyZWdpc3RlciIsIlVTRVJBQ1RJVklUWSIsIlNEQVRBIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLE1BQU1BLFVBQVUsdUJBQVEsK0JBQVIsRUFBeUMsMENBQXpDLEVBQWtFO0FBQ2hGQyxRQUFJLDBCQUQ0RTtBQUVoRkMsdUJBQW1CLFNBQVNBLGlCQUFULEdBQTZCO0FBQzlDLGFBQU8sQ0FBQztBQUNOQyxjQUFNLE1BREE7QUFFTkMsc0JBQWMseUJBRlI7QUFHTkMscUJBQWEsQ0FDWCxPQURXLEVBRVgsV0FGVyxFQUdYLFFBSFcsRUFJWCxzQkFKVyxFQUtYLG9CQUxXLEVBTVgsa0JBTlcsRUFPWCxlQVBXLEVBUVgsc0JBUlcsRUFTWCxvQkFUVyxFQVVYLG9CQVZXLEVBV1gsc0JBWFcsRUFZWCxpQkFaVyxFQWFYLG1CQWJXLEVBY1gsaUJBZFcsRUFlWCx3QkFmVyxFQWdCWCxtQkFoQlcsRUFpQlgsaUJBakJXLEVBa0JYLG1CQWxCVyxFQW1CWCxzQkFuQlcsRUFvQlgsb0JBcEJXLEVBcUJYLGdCQXJCVyxFQXNCWCxxQkF0QlcsRUF1QlgsbUJBdkJXLENBSFA7QUE0Qk5DLHNCQUFjLENBQ1osY0FEWSxFQUVaLGNBRlk7QUE1QlIsT0FBRCxFQWdDSjtBQUNESCxjQUFNLE9BREw7QUFFREksb0JBQVksU0FBU0EsVUFBVCxHQUFzQjtBQUNoQyxjQUFNQyxNQUFNQyxRQUFaO0FBQ0EsY0FBTUMsYUFBYUYsSUFBSUcsS0FBSixHQUFZQyxPQUFaLENBQW9CLEtBQXBCLENBQW5CO0FBQ0EsY0FBTUMsV0FBV0gsV0FBV0MsS0FBWCxHQUFtQkcsS0FBbkIsQ0FBeUIsS0FBekIsQ0FBakI7O0FBRUEsY0FBTUMsNkVBQTJFLGtCQUFRQyxtQkFBUixDQUE0Qk4sV0FBV08sTUFBWCxFQUE1QixDQUEzRSxlQUFxSSxrQkFBUUQsbUJBQVIsQ0FBNEJILFNBQVNJLE1BQVQsRUFBNUIsQ0FBckkseUVBQXVQUCxXQUFXUSxNQUFYLENBQWtCLHdCQUFsQixDQUF2UCxlQUE0U0wsU0FBU0ssTUFBVCxDQUFnQix3QkFBaEIsQ0FBNVMsUUFBTjtBQUVBLGNBQU1DLDhCQUE0QkMsSUFBSUMsT0FBSixDQUFZQyxJQUFaLENBQWlCQyxJQUE3QyxxRUFBTjs7QUFFQSxpQkFBTyxDQUFDSixTQUFELEVBQVlKLFFBQVosRUFBc0JTLElBQXRCLENBQTJCLE9BQTNCLENBQVA7QUFDRCxTQVpBO0FBYURwQixzQkFBYyx5QkFiYjtBQWNEQyxxQkFBYSxDQUNYLE9BRFcsRUFFWCxXQUZXLEVBR1gsUUFIVyxFQUlYLHNCQUpXLEVBS1gsb0JBTFcsRUFNWCxrQkFOVyxFQU9YLGVBUFcsRUFRWCxzQkFSVyxFQVNYLG9CQVRXLEVBVVgsb0JBVlcsRUFXWCxzQkFYVyxFQVlYLGlCQVpXLEVBYVgsbUJBYlcsRUFjWCxpQkFkVyxFQWVYLHdCQWZXLEVBZ0JYLG1CQWhCVyxFQWlCWCxpQkFqQlcsRUFrQlgsbUJBbEJXLEVBbUJYLHNCQW5CVyxFQW9CWCxvQkFwQlcsRUFxQlgsZ0JBckJXLEVBc0JYLHFCQXRCVyxFQXVCWCxtQkF2QlcsQ0FkWjtBQXVDREMsc0JBQWMsQ0FDWixjQURZLEVBRVosY0FGWTtBQXZDYixPQWhDSSxDQUFQO0FBNkVELEtBaEYrRTtBQWlGaEZtQixtQkFBZSxTQUFTQSxhQUFULEdBQXlCO0FBQ3RDLFVBQU1DLGFBQWEsS0FBS0Msb0JBQUwsQ0FBMEIsT0FBMUIsQ0FBbkI7QUFDQSxhQUFPRCxjQUFjQSxXQUFXbkIsVUFBWCxFQUFyQjtBQUNEO0FBcEYrRSxHQUFsRSxDQUFoQixDLENBeEJBOzs7Ozs7Ozs7Ozs7Ozs7QUErR0Esb0JBQVFxQixRQUFSLENBQWlCLGdCQUFZQyxZQUE3QixFQUEyQyxnQkFBWUMsS0FBdkQsRUFBOEQ5QixPQUE5RDtvQkFDZUEsTyIsImZpbGUiOiJTRGF0YS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBCYXNlIGZyb20gJy4vQmFzZSc7XHJcbmltcG9ydCBfU0RhdGFNb2RlbEJhc2UgZnJvbSAnYXJnb3MvTW9kZWxzL19TRGF0YU1vZGVsQmFzZSc7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gJ2FyZ29zL01vZGVscy9NYW5hZ2VyJztcclxuaW1wb3J0IGNvbnZlcnQgZnJvbSAnYXJnb3MvQ29udmVydCc7XHJcbmltcG9ydCBNT0RFTF9UWVBFUyBmcm9tICdhcmdvcy9Nb2RlbHMvVHlwZXMnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vTmFtZXMnO1xyXG5cclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uTW9kZWxzLlVzZXJBY3Rpdml0eS5TRGF0YScsIFtCYXNlLCBfU0RhdGFNb2RlbEJhc2VdLCB7XHJcbiAgaWQ6ICd1c2VyYWN0aXZpdHlfc2RhdGFfbW9kZWwnLFxyXG4gIGNyZWF0ZVF1ZXJ5TW9kZWxzOiBmdW5jdGlvbiBjcmVhdGVRdWVyeU1vZGVscygpIHtcclxuICAgIHJldHVybiBbe1xyXG4gICAgICBuYW1lOiAnbGlzdCcsXHJcbiAgICAgIHF1ZXJ5T3JkZXJCeTogJ0FjdGl2aXR5LlN0YXJ0RGF0ZSBkZXNjJyxcclxuICAgICAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICAgICAnQWxhcm0nLFxyXG4gICAgICAgICdBbGFybVRpbWUnLFxyXG4gICAgICAgICdTdGF0dXMnLFxyXG4gICAgICAgICdBY3Rpdml0eS9EZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ0FjdGl2aXR5L1N0YXJ0RGF0ZScsXHJcbiAgICAgICAgJ0FjdGl2aXR5L0VuZERhdGUnLFxyXG4gICAgICAgICdBY3Rpdml0eS9UeXBlJyxcclxuICAgICAgICAnQWN0aXZpdHkvQWNjb3VudE5hbWUnLFxyXG4gICAgICAgICdBY3Rpdml0eS9BY2NvdW50SWQnLFxyXG4gICAgICAgICdBY3Rpdml0eS9Db250YWN0SWQnLFxyXG4gICAgICAgICdBY3Rpdml0eS9Db250YWN0TmFtZScsXHJcbiAgICAgICAgJ0FjdGl2aXR5L0xlYWRlcicsXHJcbiAgICAgICAgJ0FjdGl2aXR5L0xlYWROYW1lJyxcclxuICAgICAgICAnQWN0aXZpdHkvTGVhZElkJyxcclxuICAgICAgICAnQWN0aXZpdHkvT3Bwb3J0dW5pdHlJZCcsXHJcbiAgICAgICAgJ0FjdGl2aXR5L1RpY2tldElkJyxcclxuICAgICAgICAnQWN0aXZpdHkvVXNlcklkJyxcclxuICAgICAgICAnQWN0aXZpdHkvVGltZWxlc3MnLFxyXG4gICAgICAgICdBY3Rpdml0eS9QaG9uZU51bWJlcicsXHJcbiAgICAgICAgJ0FjdGl2aXR5L1JlY3VycmluZycsXHJcbiAgICAgICAgJ0FjdGl2aXR5L0FsYXJtJyxcclxuICAgICAgICAnQWN0aXZpdHkvTW9kaWZ5RGF0ZScsXHJcbiAgICAgICAgJ0FjdGl2aXR5L1ByaW9yaXR5JyxcclxuICAgICAgXSxcclxuICAgICAgcXVlcnlJbmNsdWRlOiBbXHJcbiAgICAgICAgJyRkZXNjcmlwdG9ycycsXHJcbiAgICAgICAgJyRwZXJtaXNzaW9ucycsXHJcbiAgICAgIF0sXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdteWRheScsXHJcbiAgICAgIHF1ZXJ5V2hlcmU6IGZ1bmN0aW9uIHF1ZXJ5V2hlcmUoKSB7XHJcbiAgICAgICAgY29uc3Qgbm93ID0gbW9tZW50KCk7XHJcbiAgICAgICAgY29uc3QgdG9kYXlTdGFydCA9IG5vdy5jbG9uZSgpLnN0YXJ0T2YoJ2RheScpO1xyXG4gICAgICAgIGNvbnN0IHRvZGF5RW5kID0gdG9kYXlTdGFydC5jbG9uZSgpLmVuZE9mKCdkYXknKTtcclxuXHJcbiAgICAgICAgY29uc3QgdGhlUXVlcnkgPSBgKChBY3Rpdml0eS5UaW1lbGVzcyBlcSBmYWxzZSBhbmQgQWN0aXZpdHkuU3RhcnREYXRlIGJldHdlZW4gQCR7Y29udmVydC50b0lzb1N0cmluZ0Zyb21EYXRlKHRvZGF5U3RhcnQudG9EYXRlKCkpfUAgYW5kIEAke2NvbnZlcnQudG9Jc29TdHJpbmdGcm9tRGF0ZSh0b2RheUVuZC50b0RhdGUoKSl9QCkgb3IgKEFjdGl2aXR5LlRpbWVsZXNzIGVxIHRydWUgYW5kIEFjdGl2aXR5LlN0YXJ0RGF0ZSBiZXR3ZWVuIEAke3RvZGF5U3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREVDAwOjAwOjAwW1pdJyl9QCBhbmQgQCR7dG9kYXlFbmQuZm9ybWF0KCdZWVlZLU1NLUREVDIzOjU5OjU5W1pdJyl9QCkpYFxyXG4gICAgICAgIDtcclxuICAgICAgICBjb25zdCB1c2VyUXVlcnkgPSBgKFVzZXIuSWQgZXEgXCIke0FwcC5jb250ZXh0LnVzZXIuJGtleX1cIiBhbmQgU3RhdHVzIG5lIFwiYXNEZWNsbmVkXCIgYW5kIEFjdGl2aXR5LlR5cGUgbmUgXCJhdExpdGVyYXR1cmVcIilgO1xyXG5cclxuICAgICAgICByZXR1cm4gW3VzZXJRdWVyeSwgdGhlUXVlcnldLmpvaW4oJyBhbmQgJyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHF1ZXJ5T3JkZXJCeTogJ0FjdGl2aXR5LlN0YXJ0RGF0ZSBkZXNjJyxcclxuICAgICAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICAgICAnQWxhcm0nLFxyXG4gICAgICAgICdBbGFybVRpbWUnLFxyXG4gICAgICAgICdTdGF0dXMnLFxyXG4gICAgICAgICdBY3Rpdml0eS9EZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ0FjdGl2aXR5L1N0YXJ0RGF0ZScsXHJcbiAgICAgICAgJ0FjdGl2aXR5L0VuZERhdGUnLFxyXG4gICAgICAgICdBY3Rpdml0eS9UeXBlJyxcclxuICAgICAgICAnQWN0aXZpdHkvQWNjb3VudE5hbWUnLFxyXG4gICAgICAgICdBY3Rpdml0eS9BY2NvdW50SWQnLFxyXG4gICAgICAgICdBY3Rpdml0eS9Db250YWN0SWQnLFxyXG4gICAgICAgICdBY3Rpdml0eS9Db250YWN0TmFtZScsXHJcbiAgICAgICAgJ0FjdGl2aXR5L0xlYWRlcicsXHJcbiAgICAgICAgJ0FjdGl2aXR5L0xlYWROYW1lJyxcclxuICAgICAgICAnQWN0aXZpdHkvTGVhZElkJyxcclxuICAgICAgICAnQWN0aXZpdHkvT3Bwb3J0dW5pdHlJZCcsXHJcbiAgICAgICAgJ0FjdGl2aXR5L1RpY2tldElkJyxcclxuICAgICAgICAnQWN0aXZpdHkvVXNlcklkJyxcclxuICAgICAgICAnQWN0aXZpdHkvVGltZWxlc3MnLFxyXG4gICAgICAgICdBY3Rpdml0eS9QaG9uZU51bWJlcicsXHJcbiAgICAgICAgJ0FjdGl2aXR5L1JlY3VycmluZycsXHJcbiAgICAgICAgJ0FjdGl2aXR5L0FsYXJtJyxcclxuICAgICAgICAnQWN0aXZpdHkvTW9kaWZ5RGF0ZScsXHJcbiAgICAgICAgJ0FjdGl2aXR5L1ByaW9yaXR5JyxcclxuICAgICAgXSxcclxuICAgICAgcXVlcnlJbmNsdWRlOiBbXHJcbiAgICAgICAgJyRkZXNjcmlwdG9ycycsXHJcbiAgICAgICAgJyRwZXJtaXNzaW9ucycsXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAgXTtcclxuICB9LFxyXG4gIGdldE15RGF5UXVlcnk6IGZ1bmN0aW9uIGdldE15RGF5UXVlcnkoKSB7XHJcbiAgICBjb25zdCBxdWVyeU1vZGVsID0gdGhpcy5fZ2V0UXVlcnlNb2RlbEJ5TmFtZSgnbXlkYXknKTtcclxuICAgIHJldHVybiBxdWVyeU1vZGVsICYmIHF1ZXJ5TW9kZWwucXVlcnlXaGVyZSgpO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuTWFuYWdlci5yZWdpc3RlcihNT0RFTF9OQU1FUy5VU0VSQUNUSVZJVFksIE1PREVMX1RZUEVTLlNEQVRBLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19