define('crm/Models/Contact/SData', ['module', 'exports', 'dojo/_base/declare', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names'], function (module, exports, _declare, _Base, _SDataModelBase2, _Manager, _Types, _Names) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Base2 = _interopRequireDefault(_Base);

  var _SDataModelBase3 = _interopRequireDefault(_SDataModelBase2);

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

  var __class = (0, _declare2.default)('crm.Models.Contact.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'contact_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'LastNameUpper,FirstName',
        querySelect: ['AccountName', 'Account/AccountName', 'NameLF', 'WorkPhone', 'Mobile', 'Email', 'Title', 'LastHistoryDate', 'ModifyDate']
      }, {
        name: 'detail',
        querySelect: ['Account/AccountName', 'AccountManager/UserInfo/FirstName', 'AccountManager/UserInfo/LastName', 'AccountName', 'Address/*', 'CuisinePreference', 'CreateDate', 'CreateUser', 'Email', 'Fax', 'FirstName', 'HomePhone', 'LastName', 'LocationCode', 'MiddleName', 'Mobile', 'Name', 'NameLF', 'Owner/OwnerDescription', 'Prefix', 'Suffix', 'Title', 'WebAddress', 'WorkPhone'],
        queryInclude: ['$permissions']
      }, {
        name: 'edit',
        querySelect: ['Account/AccountName', 'AccountManager/UserInfo/FirstName', 'AccountManager/UserInfo/LastName', 'AccountName', 'Address/*', 'CuisinePreference', 'CreateDate', 'CreateUser', 'Email', 'Fax', 'FirstName', 'HomePhone', 'LastName', 'LocationCode', 'MiddleName', 'Mobile', 'Name', 'NameLF', 'Owner/OwnerDescription', 'Prefix', 'Suffix', 'Title', 'WebAddress', 'WorkPhone'],
        queryInclude: ['$permissions']
      }];
    },
    getEntry: function getEntry() /* options */{
      var results$ = this.inherited(getEntry, arguments);
      return results$.then(function (entry) {
        return new Promise(function (resolve) {
          Promise.all([App.picklistService.requestPicklist('Name Prefix', {
            language: entry.LocationCode && entry.LocationCode.trim() || App.getCurrentLocale(),
            filterByLanguage: true
          }), App.picklistService.requestPicklist('Name Suffix', {
            language: entry.LocationCode && entry.LocationCode.trim() || App.getCurrentLocale(),
            filterByLanguage: true
          }), App.picklistService.requestPicklist('Title', {
            language: entry.LocationCode && entry.LocationCode.trim() || App.getCurrentLocale(),
            filterByLanguage: true
          })]).then(function () {
            resolve(entry);
          });
        });
      });
    }
  });

  _Manager2.default.register(_Names2.default.CONTACT, _Types2.default.SDATA, __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbHMvQ29udGFjdC9TRGF0YS5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiaWQiLCJjcmVhdGVRdWVyeU1vZGVscyIsIm5hbWUiLCJxdWVyeU9yZGVyQnkiLCJxdWVyeVNlbGVjdCIsInF1ZXJ5SW5jbHVkZSIsImdldEVudHJ5IiwicmVzdWx0cyQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJ0aGVuIiwiZW50cnkiLCJQcm9taXNlIiwicmVzb2x2ZSIsImFsbCIsIkFwcCIsInBpY2tsaXN0U2VydmljZSIsInJlcXVlc3RQaWNrbGlzdCIsImxhbmd1YWdlIiwiTG9jYXRpb25Db2RlIiwidHJpbSIsImdldEN1cnJlbnRMb2NhbGUiLCJmaWx0ZXJCeUxhbmd1YWdlIiwicmVnaXN0ZXIiLCJDT05UQUNUIiwiU0RBVEEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxNQUFNQSxVQUFVLHVCQUFRLDBCQUFSLEVBQW9DLDBDQUFwQyxFQUE2RDtBQUMzRUMsUUFBSSxxQkFEdUU7QUFFM0VDLHVCQUFtQixTQUFTQSxpQkFBVCxHQUE2QjtBQUM5QyxhQUFPLENBQUM7QUFDTkMsY0FBTSxNQURBO0FBRU5DLHNCQUFjLHlCQUZSO0FBR05DLHFCQUFhLENBQ1gsYUFEVyxFQUVYLHFCQUZXLEVBR1gsUUFIVyxFQUlYLFdBSlcsRUFLWCxRQUxXLEVBTVgsT0FOVyxFQU9YLE9BUFcsRUFRWCxpQkFSVyxFQVNYLFlBVFc7QUFIUCxPQUFELEVBY0o7QUFDREYsY0FBTSxRQURMO0FBRURFLHFCQUFhLENBQ1gscUJBRFcsRUFFWCxtQ0FGVyxFQUdYLGtDQUhXLEVBSVgsYUFKVyxFQUtYLFdBTFcsRUFNWCxtQkFOVyxFQU9YLFlBUFcsRUFRWCxZQVJXLEVBU1gsT0FUVyxFQVVYLEtBVlcsRUFXWCxXQVhXLEVBWVgsV0FaVyxFQWFYLFVBYlcsRUFjWCxjQWRXLEVBZVgsWUFmVyxFQWdCWCxRQWhCVyxFQWlCWCxNQWpCVyxFQWtCWCxRQWxCVyxFQW1CWCx3QkFuQlcsRUFvQlgsUUFwQlcsRUFxQlgsUUFyQlcsRUFzQlgsT0F0QlcsRUF1QlgsWUF2QlcsRUF3QlgsV0F4QlcsQ0FGWjtBQTRCREMsc0JBQWMsQ0FDWixjQURZO0FBNUJiLE9BZEksRUE2Q0o7QUFDREgsY0FBTSxNQURMO0FBRURFLHFCQUFhLENBQ1gscUJBRFcsRUFFWCxtQ0FGVyxFQUdYLGtDQUhXLEVBSVgsYUFKVyxFQUtYLFdBTFcsRUFNWCxtQkFOVyxFQU9YLFlBUFcsRUFRWCxZQVJXLEVBU1gsT0FUVyxFQVVYLEtBVlcsRUFXWCxXQVhXLEVBWVgsV0FaVyxFQWFYLFVBYlcsRUFjWCxjQWRXLEVBZVgsWUFmVyxFQWdCWCxRQWhCVyxFQWlCWCxNQWpCVyxFQWtCWCxRQWxCVyxFQW1CWCx3QkFuQlcsRUFvQlgsUUFwQlcsRUFxQlgsUUFyQlcsRUFzQlgsT0F0QlcsRUF1QlgsWUF2QlcsRUF3QlgsV0F4QlcsQ0FGWjtBQTRCREMsc0JBQWMsQ0FDWixjQURZO0FBNUJiLE9BN0NJLENBQVA7QUE2RUQsS0FoRjBFO0FBaUYzRUMsY0FBVSxTQUFTQSxRQUFULEdBQWtCLGFBQWU7QUFDekMsVUFBTUMsV0FBVyxLQUFLQyxTQUFMLENBQWVGLFFBQWYsRUFBeUJHLFNBQXpCLENBQWpCO0FBQ0EsYUFBT0YsU0FBU0csSUFBVCxDQUFjLFVBQUNDLEtBQUQsRUFBVztBQUM5QixlQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQWE7QUFDOUJELGtCQUFRRSxHQUFSLENBQVksQ0FBQ0MsSUFBSUMsZUFBSixDQUFvQkMsZUFBcEIsQ0FBb0MsYUFBcEMsRUFBbUQ7QUFDOURDLHNCQUFVUCxNQUFNUSxZQUFOLElBQXNCUixNQUFNUSxZQUFOLENBQW1CQyxJQUFuQixFQUF0QixJQUFtREwsSUFBSU0sZ0JBQUosRUFEQztBQUU5REMsOEJBQWtCO0FBRjRDLFdBQW5ELENBQUQsRUFHUlAsSUFBSUMsZUFBSixDQUFvQkMsZUFBcEIsQ0FBb0MsYUFBcEMsRUFBbUQ7QUFDckRDLHNCQUFVUCxNQUFNUSxZQUFOLElBQXNCUixNQUFNUSxZQUFOLENBQW1CQyxJQUFuQixFQUF0QixJQUFtREwsSUFBSU0sZ0JBQUosRUFEUjtBQUVyREMsOEJBQWtCO0FBRm1DLFdBQW5ELENBSFEsRUFNUlAsSUFBSUMsZUFBSixDQUFvQkMsZUFBcEIsQ0FBb0MsT0FBcEMsRUFBNkM7QUFDL0NDLHNCQUFVUCxNQUFNUSxZQUFOLElBQXNCUixNQUFNUSxZQUFOLENBQW1CQyxJQUFuQixFQUF0QixJQUFtREwsSUFBSU0sZ0JBQUosRUFEZDtBQUUvQ0MsOEJBQWtCO0FBRjZCLFdBQTdDLENBTlEsQ0FBWixFQVNLWixJQVRMLENBU1UsWUFBTTtBQUNkRyxvQkFBUUYsS0FBUjtBQUNELFdBWEQ7QUFZRCxTQWJNLENBQVA7QUFjRCxPQWZNLENBQVA7QUFnQkQ7QUFuRzBFLEdBQTdELENBQWhCOztBQXNHQSxvQkFBUVksUUFBUixDQUFpQixnQkFBWUMsT0FBN0IsRUFBc0MsZ0JBQVlDLEtBQWxELEVBQXlEMUIsT0FBekQ7b0JBQ2VBLE8iLCJmaWxlIjoiU0RhdGEuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgQmFzZSBmcm9tICcuL0Jhc2UnO1xyXG5pbXBvcnQgX1NEYXRhTW9kZWxCYXNlIGZyb20gJ2FyZ29zL01vZGVscy9fU0RhdGFNb2RlbEJhc2UnO1xyXG5pbXBvcnQgTWFuYWdlciBmcm9tICdhcmdvcy9Nb2RlbHMvTWFuYWdlcic7XHJcbmltcG9ydCBNT0RFTF9UWVBFUyBmcm9tICdhcmdvcy9Nb2RlbHMvVHlwZXMnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vTmFtZXMnO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5Nb2RlbHMuQ29udGFjdC5TRGF0YScsIFtCYXNlLCBfU0RhdGFNb2RlbEJhc2VdLCB7XHJcbiAgaWQ6ICdjb250YWN0X3NkYXRhX21vZGVsJyxcclxuICBjcmVhdGVRdWVyeU1vZGVsczogZnVuY3Rpb24gY3JlYXRlUXVlcnlNb2RlbHMoKSB7XHJcbiAgICByZXR1cm4gW3tcclxuICAgICAgbmFtZTogJ2xpc3QnLFxyXG4gICAgICBxdWVyeU9yZGVyQnk6ICdMYXN0TmFtZVVwcGVyLEZpcnN0TmFtZScsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAgICAgJ0FjY291bnROYW1lJyxcclxuICAgICAgICAnQWNjb3VudC9BY2NvdW50TmFtZScsXHJcbiAgICAgICAgJ05hbWVMRicsXHJcbiAgICAgICAgJ1dvcmtQaG9uZScsXHJcbiAgICAgICAgJ01vYmlsZScsXHJcbiAgICAgICAgJ0VtYWlsJyxcclxuICAgICAgICAnVGl0bGUnLFxyXG4gICAgICAgICdMYXN0SGlzdG9yeURhdGUnLFxyXG4gICAgICAgICdNb2RpZnlEYXRlJyxcclxuICAgICAgXSxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ2RldGFpbCcsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAgICAgJ0FjY291bnQvQWNjb3VudE5hbWUnLFxyXG4gICAgICAgICdBY2NvdW50TWFuYWdlci9Vc2VySW5mby9GaXJzdE5hbWUnLFxyXG4gICAgICAgICdBY2NvdW50TWFuYWdlci9Vc2VySW5mby9MYXN0TmFtZScsXHJcbiAgICAgICAgJ0FjY291bnROYW1lJyxcclxuICAgICAgICAnQWRkcmVzcy8qJyxcclxuICAgICAgICAnQ3Vpc2luZVByZWZlcmVuY2UnLFxyXG4gICAgICAgICdDcmVhdGVEYXRlJyxcclxuICAgICAgICAnQ3JlYXRlVXNlcicsXHJcbiAgICAgICAgJ0VtYWlsJyxcclxuICAgICAgICAnRmF4JyxcclxuICAgICAgICAnRmlyc3ROYW1lJyxcclxuICAgICAgICAnSG9tZVBob25lJyxcclxuICAgICAgICAnTGFzdE5hbWUnLFxyXG4gICAgICAgICdMb2NhdGlvbkNvZGUnLFxyXG4gICAgICAgICdNaWRkbGVOYW1lJyxcclxuICAgICAgICAnTW9iaWxlJyxcclxuICAgICAgICAnTmFtZScsXHJcbiAgICAgICAgJ05hbWVMRicsXHJcbiAgICAgICAgJ093bmVyL093bmVyRGVzY3JpcHRpb24nLFxyXG4gICAgICAgICdQcmVmaXgnLFxyXG4gICAgICAgICdTdWZmaXgnLFxyXG4gICAgICAgICdUaXRsZScsXHJcbiAgICAgICAgJ1dlYkFkZHJlc3MnLFxyXG4gICAgICAgICdXb3JrUGhvbmUnLFxyXG4gICAgICBdLFxyXG4gICAgICBxdWVyeUluY2x1ZGU6IFtcclxuICAgICAgICAnJHBlcm1pc3Npb25zJyxcclxuICAgICAgXSxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ2VkaXQnLFxyXG4gICAgICBxdWVyeVNlbGVjdDogW1xyXG4gICAgICAgICdBY2NvdW50L0FjY291bnROYW1lJyxcclxuICAgICAgICAnQWNjb3VudE1hbmFnZXIvVXNlckluZm8vRmlyc3ROYW1lJyxcclxuICAgICAgICAnQWNjb3VudE1hbmFnZXIvVXNlckluZm8vTGFzdE5hbWUnLFxyXG4gICAgICAgICdBY2NvdW50TmFtZScsXHJcbiAgICAgICAgJ0FkZHJlc3MvKicsXHJcbiAgICAgICAgJ0N1aXNpbmVQcmVmZXJlbmNlJyxcclxuICAgICAgICAnQ3JlYXRlRGF0ZScsXHJcbiAgICAgICAgJ0NyZWF0ZVVzZXInLFxyXG4gICAgICAgICdFbWFpbCcsXHJcbiAgICAgICAgJ0ZheCcsXHJcbiAgICAgICAgJ0ZpcnN0TmFtZScsXHJcbiAgICAgICAgJ0hvbWVQaG9uZScsXHJcbiAgICAgICAgJ0xhc3ROYW1lJyxcclxuICAgICAgICAnTG9jYXRpb25Db2RlJyxcclxuICAgICAgICAnTWlkZGxlTmFtZScsXHJcbiAgICAgICAgJ01vYmlsZScsXHJcbiAgICAgICAgJ05hbWUnLFxyXG4gICAgICAgICdOYW1lTEYnLFxyXG4gICAgICAgICdPd25lci9Pd25lckRlc2NyaXB0aW9uJyxcclxuICAgICAgICAnUHJlZml4JyxcclxuICAgICAgICAnU3VmZml4JyxcclxuICAgICAgICAnVGl0bGUnLFxyXG4gICAgICAgICdXZWJBZGRyZXNzJyxcclxuICAgICAgICAnV29ya1Bob25lJyxcclxuICAgICAgXSxcclxuICAgICAgcXVlcnlJbmNsdWRlOiBbXHJcbiAgICAgICAgJyRwZXJtaXNzaW9ucycsXHJcbiAgICAgIF0sXHJcbiAgICB9XTtcclxuICB9LFxyXG4gIGdldEVudHJ5OiBmdW5jdGlvbiBnZXRFbnRyeSgvKiBvcHRpb25zICovKSB7XHJcbiAgICBjb25zdCByZXN1bHRzJCA9IHRoaXMuaW5oZXJpdGVkKGdldEVudHJ5LCBhcmd1bWVudHMpO1xyXG4gICAgcmV0dXJuIHJlc3VsdHMkLnRoZW4oKGVudHJ5KSA9PiB7XHJcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgIFByb21pc2UuYWxsKFtBcHAucGlja2xpc3RTZXJ2aWNlLnJlcXVlc3RQaWNrbGlzdCgnTmFtZSBQcmVmaXgnLCB7XHJcbiAgICAgICAgICBsYW5ndWFnZTogZW50cnkuTG9jYXRpb25Db2RlICYmIGVudHJ5LkxvY2F0aW9uQ29kZS50cmltKCkgfHwgQXBwLmdldEN1cnJlbnRMb2NhbGUoKSxcclxuICAgICAgICAgIGZpbHRlckJ5TGFuZ3VhZ2U6IHRydWUsXHJcbiAgICAgICAgfSksIEFwcC5waWNrbGlzdFNlcnZpY2UucmVxdWVzdFBpY2tsaXN0KCdOYW1lIFN1ZmZpeCcsIHtcclxuICAgICAgICAgIGxhbmd1YWdlOiBlbnRyeS5Mb2NhdGlvbkNvZGUgJiYgZW50cnkuTG9jYXRpb25Db2RlLnRyaW0oKSB8fCBBcHAuZ2V0Q3VycmVudExvY2FsZSgpLFxyXG4gICAgICAgICAgZmlsdGVyQnlMYW5ndWFnZTogdHJ1ZSxcclxuICAgICAgICB9KSwgQXBwLnBpY2tsaXN0U2VydmljZS5yZXF1ZXN0UGlja2xpc3QoJ1RpdGxlJywge1xyXG4gICAgICAgICAgbGFuZ3VhZ2U6IGVudHJ5LkxvY2F0aW9uQ29kZSAmJiBlbnRyeS5Mb2NhdGlvbkNvZGUudHJpbSgpIHx8IEFwcC5nZXRDdXJyZW50TG9jYWxlKCksXHJcbiAgICAgICAgICBmaWx0ZXJCeUxhbmd1YWdlOiB0cnVlLFxyXG4gICAgICAgIH0pXSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICByZXNvbHZlKGVudHJ5KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9LFxyXG59KTtcclxuXHJcbk1hbmFnZXIucmVnaXN0ZXIoTU9ERUxfTkFNRVMuQ09OVEFDVCwgTU9ERUxfVFlQRVMuU0RBVEEsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=