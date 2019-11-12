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
      var results$ = this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbHMvQ29udGFjdC9TRGF0YS5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiaWQiLCJjcmVhdGVRdWVyeU1vZGVscyIsIm5hbWUiLCJxdWVyeU9yZGVyQnkiLCJxdWVyeVNlbGVjdCIsInF1ZXJ5SW5jbHVkZSIsImdldEVudHJ5IiwicmVzdWx0cyQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJ0aGVuIiwiZW50cnkiLCJQcm9taXNlIiwicmVzb2x2ZSIsImFsbCIsIkFwcCIsInBpY2tsaXN0U2VydmljZSIsInJlcXVlc3RQaWNrbGlzdCIsImxhbmd1YWdlIiwiTG9jYXRpb25Db2RlIiwidHJpbSIsImdldEN1cnJlbnRMb2NhbGUiLCJmaWx0ZXJCeUxhbmd1YWdlIiwicmVnaXN0ZXIiLCJDT05UQUNUIiwiU0RBVEEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxNQUFNQSxVQUFVLHVCQUFRLDBCQUFSLEVBQW9DLDBDQUFwQyxFQUE2RDtBQUMzRUMsUUFBSSxxQkFEdUU7QUFFM0VDLHVCQUFtQixTQUFTQSxpQkFBVCxHQUE2QjtBQUM5QyxhQUFPLENBQUM7QUFDTkMsY0FBTSxNQURBO0FBRU5DLHNCQUFjLHlCQUZSO0FBR05DLHFCQUFhLENBQ1gsYUFEVyxFQUVYLHFCQUZXLEVBR1gsUUFIVyxFQUlYLFdBSlcsRUFLWCxRQUxXLEVBTVgsT0FOVyxFQU9YLE9BUFcsRUFRWCxpQkFSVyxFQVNYLFlBVFc7QUFIUCxPQUFELEVBY0o7QUFDREYsY0FBTSxRQURMO0FBRURFLHFCQUFhLENBQ1gscUJBRFcsRUFFWCxtQ0FGVyxFQUdYLGtDQUhXLEVBSVgsYUFKVyxFQUtYLFdBTFcsRUFNWCxtQkFOVyxFQU9YLFlBUFcsRUFRWCxZQVJXLEVBU1gsT0FUVyxFQVVYLEtBVlcsRUFXWCxXQVhXLEVBWVgsV0FaVyxFQWFYLFVBYlcsRUFjWCxjQWRXLEVBZVgsWUFmVyxFQWdCWCxRQWhCVyxFQWlCWCxNQWpCVyxFQWtCWCxRQWxCVyxFQW1CWCx3QkFuQlcsRUFvQlgsUUFwQlcsRUFxQlgsUUFyQlcsRUFzQlgsT0F0QlcsRUF1QlgsWUF2QlcsRUF3QlgsV0F4QlcsQ0FGWjtBQTRCREMsc0JBQWMsQ0FDWixjQURZO0FBNUJiLE9BZEksRUE2Q0o7QUFDREgsY0FBTSxNQURMO0FBRURFLHFCQUFhLENBQ1gscUJBRFcsRUFFWCxtQ0FGVyxFQUdYLGtDQUhXLEVBSVgsYUFKVyxFQUtYLFdBTFcsRUFNWCxtQkFOVyxFQU9YLFlBUFcsRUFRWCxZQVJXLEVBU1gsT0FUVyxFQVVYLEtBVlcsRUFXWCxXQVhXLEVBWVgsV0FaVyxFQWFYLFVBYlcsRUFjWCxjQWRXLEVBZVgsWUFmVyxFQWdCWCxRQWhCVyxFQWlCWCxNQWpCVyxFQWtCWCxRQWxCVyxFQW1CWCx3QkFuQlcsRUFvQlgsUUFwQlcsRUFxQlgsUUFyQlcsRUFzQlgsT0F0QlcsRUF1QlgsWUF2QlcsRUF3QlgsV0F4QlcsQ0FGWjtBQTRCREMsc0JBQWMsQ0FDWixjQURZO0FBNUJiLE9BN0NJLENBQVA7QUE2RUQsS0FoRjBFO0FBaUYzRUMsY0FBVSxTQUFTQSxRQUFULEdBQWtCLGFBQWU7QUFDekMsVUFBTUMsV0FBVyxLQUFLQyxTQUFMLENBQWVDLFNBQWYsQ0FBakI7QUFDQSxhQUFPRixTQUFTRyxJQUFULENBQWMsVUFBQ0MsS0FBRCxFQUFXO0FBQzlCLGVBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBYTtBQUM5QkQsa0JBQVFFLEdBQVIsQ0FBWSxDQUFDQyxJQUFJQyxlQUFKLENBQW9CQyxlQUFwQixDQUFvQyxhQUFwQyxFQUFtRDtBQUM5REMsc0JBQVVQLE1BQU1RLFlBQU4sSUFBc0JSLE1BQU1RLFlBQU4sQ0FBbUJDLElBQW5CLEVBQXRCLElBQW1ETCxJQUFJTSxnQkFBSixFQURDO0FBRTlEQyw4QkFBa0I7QUFGNEMsV0FBbkQsQ0FBRCxFQUdSUCxJQUFJQyxlQUFKLENBQW9CQyxlQUFwQixDQUFvQyxhQUFwQyxFQUFtRDtBQUNyREMsc0JBQVVQLE1BQU1RLFlBQU4sSUFBc0JSLE1BQU1RLFlBQU4sQ0FBbUJDLElBQW5CLEVBQXRCLElBQW1ETCxJQUFJTSxnQkFBSixFQURSO0FBRXJEQyw4QkFBa0I7QUFGbUMsV0FBbkQsQ0FIUSxFQU1SUCxJQUFJQyxlQUFKLENBQW9CQyxlQUFwQixDQUFvQyxPQUFwQyxFQUE2QztBQUMvQ0Msc0JBQVVQLE1BQU1RLFlBQU4sSUFBc0JSLE1BQU1RLFlBQU4sQ0FBbUJDLElBQW5CLEVBQXRCLElBQW1ETCxJQUFJTSxnQkFBSixFQURkO0FBRS9DQyw4QkFBa0I7QUFGNkIsV0FBN0MsQ0FOUSxDQUFaLEVBU0taLElBVEwsQ0FTVSxZQUFNO0FBQ2RHLG9CQUFRRixLQUFSO0FBQ0QsV0FYRDtBQVlELFNBYk0sQ0FBUDtBQWNELE9BZk0sQ0FBUDtBQWdCRDtBQW5HMEUsR0FBN0QsQ0FBaEI7O0FBc0dBLG9CQUFRWSxRQUFSLENBQWlCLGdCQUFZQyxPQUE3QixFQUFzQyxnQkFBWUMsS0FBbEQsRUFBeUQxQixPQUF6RDtvQkFDZUEsTyIsImZpbGUiOiJTRGF0YS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBCYXNlIGZyb20gJy4vQmFzZSc7XHJcbmltcG9ydCBfU0RhdGFNb2RlbEJhc2UgZnJvbSAnYXJnb3MvTW9kZWxzL19TRGF0YU1vZGVsQmFzZSc7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gJ2FyZ29zL01vZGVscy9NYW5hZ2VyJztcclxuaW1wb3J0IE1PREVMX1RZUEVTIGZyb20gJ2FyZ29zL01vZGVscy9UeXBlcyc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi9OYW1lcyc7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLk1vZGVscy5Db250YWN0LlNEYXRhJywgW0Jhc2UsIF9TRGF0YU1vZGVsQmFzZV0sIHtcclxuICBpZDogJ2NvbnRhY3Rfc2RhdGFfbW9kZWwnLFxyXG4gIGNyZWF0ZVF1ZXJ5TW9kZWxzOiBmdW5jdGlvbiBjcmVhdGVRdWVyeU1vZGVscygpIHtcclxuICAgIHJldHVybiBbe1xyXG4gICAgICBuYW1lOiAnbGlzdCcsXHJcbiAgICAgIHF1ZXJ5T3JkZXJCeTogJ0xhc3ROYW1lVXBwZXIsRmlyc3ROYW1lJyxcclxuICAgICAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICAgICAnQWNjb3VudE5hbWUnLFxyXG4gICAgICAgICdBY2NvdW50L0FjY291bnROYW1lJyxcclxuICAgICAgICAnTmFtZUxGJyxcclxuICAgICAgICAnV29ya1Bob25lJyxcclxuICAgICAgICAnTW9iaWxlJyxcclxuICAgICAgICAnRW1haWwnLFxyXG4gICAgICAgICdUaXRsZScsXHJcbiAgICAgICAgJ0xhc3RIaXN0b3J5RGF0ZScsXHJcbiAgICAgICAgJ01vZGlmeURhdGUnLFxyXG4gICAgICBdLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnZGV0YWlsJyxcclxuICAgICAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICAgICAnQWNjb3VudC9BY2NvdW50TmFtZScsXHJcbiAgICAgICAgJ0FjY291bnRNYW5hZ2VyL1VzZXJJbmZvL0ZpcnN0TmFtZScsXHJcbiAgICAgICAgJ0FjY291bnRNYW5hZ2VyL1VzZXJJbmZvL0xhc3ROYW1lJyxcclxuICAgICAgICAnQWNjb3VudE5hbWUnLFxyXG4gICAgICAgICdBZGRyZXNzLyonLFxyXG4gICAgICAgICdDdWlzaW5lUHJlZmVyZW5jZScsXHJcbiAgICAgICAgJ0NyZWF0ZURhdGUnLFxyXG4gICAgICAgICdDcmVhdGVVc2VyJyxcclxuICAgICAgICAnRW1haWwnLFxyXG4gICAgICAgICdGYXgnLFxyXG4gICAgICAgICdGaXJzdE5hbWUnLFxyXG4gICAgICAgICdIb21lUGhvbmUnLFxyXG4gICAgICAgICdMYXN0TmFtZScsXHJcbiAgICAgICAgJ0xvY2F0aW9uQ29kZScsXHJcbiAgICAgICAgJ01pZGRsZU5hbWUnLFxyXG4gICAgICAgICdNb2JpbGUnLFxyXG4gICAgICAgICdOYW1lJyxcclxuICAgICAgICAnTmFtZUxGJyxcclxuICAgICAgICAnT3duZXIvT3duZXJEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ1ByZWZpeCcsXHJcbiAgICAgICAgJ1N1ZmZpeCcsXHJcbiAgICAgICAgJ1RpdGxlJyxcclxuICAgICAgICAnV2ViQWRkcmVzcycsXHJcbiAgICAgICAgJ1dvcmtQaG9uZScsXHJcbiAgICAgIF0sXHJcbiAgICAgIHF1ZXJ5SW5jbHVkZTogW1xyXG4gICAgICAgICckcGVybWlzc2lvbnMnLFxyXG4gICAgICBdLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnZWRpdCcsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAgICAgJ0FjY291bnQvQWNjb3VudE5hbWUnLFxyXG4gICAgICAgICdBY2NvdW50TWFuYWdlci9Vc2VySW5mby9GaXJzdE5hbWUnLFxyXG4gICAgICAgICdBY2NvdW50TWFuYWdlci9Vc2VySW5mby9MYXN0TmFtZScsXHJcbiAgICAgICAgJ0FjY291bnROYW1lJyxcclxuICAgICAgICAnQWRkcmVzcy8qJyxcclxuICAgICAgICAnQ3Vpc2luZVByZWZlcmVuY2UnLFxyXG4gICAgICAgICdDcmVhdGVEYXRlJyxcclxuICAgICAgICAnQ3JlYXRlVXNlcicsXHJcbiAgICAgICAgJ0VtYWlsJyxcclxuICAgICAgICAnRmF4JyxcclxuICAgICAgICAnRmlyc3ROYW1lJyxcclxuICAgICAgICAnSG9tZVBob25lJyxcclxuICAgICAgICAnTGFzdE5hbWUnLFxyXG4gICAgICAgICdMb2NhdGlvbkNvZGUnLFxyXG4gICAgICAgICdNaWRkbGVOYW1lJyxcclxuICAgICAgICAnTW9iaWxlJyxcclxuICAgICAgICAnTmFtZScsXHJcbiAgICAgICAgJ05hbWVMRicsXHJcbiAgICAgICAgJ093bmVyL093bmVyRGVzY3JpcHRpb24nLFxyXG4gICAgICAgICdQcmVmaXgnLFxyXG4gICAgICAgICdTdWZmaXgnLFxyXG4gICAgICAgICdUaXRsZScsXHJcbiAgICAgICAgJ1dlYkFkZHJlc3MnLFxyXG4gICAgICAgICdXb3JrUGhvbmUnLFxyXG4gICAgICBdLFxyXG4gICAgICBxdWVyeUluY2x1ZGU6IFtcclxuICAgICAgICAnJHBlcm1pc3Npb25zJyxcclxuICAgICAgXSxcclxuICAgIH1dO1xyXG4gIH0sXHJcbiAgZ2V0RW50cnk6IGZ1bmN0aW9uIGdldEVudHJ5KC8qIG9wdGlvbnMgKi8pIHtcclxuICAgIGNvbnN0IHJlc3VsdHMkID0gdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICAgIHJldHVybiByZXN1bHRzJC50aGVuKChlbnRyeSkgPT4ge1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICBQcm9taXNlLmFsbChbQXBwLnBpY2tsaXN0U2VydmljZS5yZXF1ZXN0UGlja2xpc3QoJ05hbWUgUHJlZml4Jywge1xyXG4gICAgICAgICAgbGFuZ3VhZ2U6IGVudHJ5LkxvY2F0aW9uQ29kZSAmJiBlbnRyeS5Mb2NhdGlvbkNvZGUudHJpbSgpIHx8IEFwcC5nZXRDdXJyZW50TG9jYWxlKCksXHJcbiAgICAgICAgICBmaWx0ZXJCeUxhbmd1YWdlOiB0cnVlLFxyXG4gICAgICAgIH0pLCBBcHAucGlja2xpc3RTZXJ2aWNlLnJlcXVlc3RQaWNrbGlzdCgnTmFtZSBTdWZmaXgnLCB7XHJcbiAgICAgICAgICBsYW5ndWFnZTogZW50cnkuTG9jYXRpb25Db2RlICYmIGVudHJ5LkxvY2F0aW9uQ29kZS50cmltKCkgfHwgQXBwLmdldEN1cnJlbnRMb2NhbGUoKSxcclxuICAgICAgICAgIGZpbHRlckJ5TGFuZ3VhZ2U6IHRydWUsXHJcbiAgICAgICAgfSksIEFwcC5waWNrbGlzdFNlcnZpY2UucmVxdWVzdFBpY2tsaXN0KCdUaXRsZScsIHtcclxuICAgICAgICAgIGxhbmd1YWdlOiBlbnRyeS5Mb2NhdGlvbkNvZGUgJiYgZW50cnkuTG9jYXRpb25Db2RlLnRyaW0oKSB8fCBBcHAuZ2V0Q3VycmVudExvY2FsZSgpLFxyXG4gICAgICAgICAgZmlsdGVyQnlMYW5ndWFnZTogdHJ1ZSxcclxuICAgICAgICB9KV0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgcmVzb2x2ZShlbnRyeSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5NYW5hZ2VyLnJlZ2lzdGVyKE1PREVMX05BTUVTLkNPTlRBQ1QsIE1PREVMX1RZUEVTLlNEQVRBLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19