define('crm/Models/Account/SData', ['module', 'exports', 'dojo/_base/declare', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names'], function (module, exports, _declare, _Base, _SDataModelBase2, _Manager, _Types, _Names) {
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

  var __class = (0, _declare2.default)('crm.Models.Account.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'account_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'AccountNameUpper',
        querySelect: ['AccountName', 'AccountManager/UserInfo/UserName', 'AccountManager/UserInfo/LastName', 'AccountManager/UserInfo/FirstName', 'Owner/OwnerDescription', 'WebAddress', 'Industry', 'LeadSource/Description', 'MainPhone', 'Fax', 'Status', 'SubType', 'Type', 'ModifyDate']
      }, {
        name: 'detail',
        querySelect: ['AccountManager/UserInfo/FirstName', 'AccountManager/UserInfo/LastName', 'AccountName', 'Address/*', 'BusinessDescription', 'CreateDate', 'CreateUser', 'Description', 'Fax', 'GlobalSyncID', 'ImportSource', 'Industry', 'LeadSource/Description', 'MainPhone', 'Notes', 'Owner/OwnerDescription', 'Status', 'SubType', 'Type', 'WebAddress'],
        queryInclude: ['$permissions']
      }];
    },
    getEntry: function getEntry() /* options */{
      var results$ = this.inherited(arguments);
      return results$.then(function (entry) {
        return new Promise(function (resolve) {
          App.picklistService.requestPicklist('Account ' + entry.Type).then(function () {
            resolve(entry);
          });
        });
      });
    }
  });

  _Manager2.default.register(_Names2.default.ACCOUNT, _Types2.default.SDATA, __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbHMvQWNjb3VudC9TRGF0YS5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiaWQiLCJjcmVhdGVRdWVyeU1vZGVscyIsIm5hbWUiLCJxdWVyeU9yZGVyQnkiLCJxdWVyeVNlbGVjdCIsInF1ZXJ5SW5jbHVkZSIsImdldEVudHJ5IiwicmVzdWx0cyQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJ0aGVuIiwiZW50cnkiLCJQcm9taXNlIiwicmVzb2x2ZSIsIkFwcCIsInBpY2tsaXN0U2VydmljZSIsInJlcXVlc3RQaWNrbGlzdCIsIlR5cGUiLCJyZWdpc3RlciIsIkFDQ09VTlQiLCJTREFUQSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE1BQU1BLFVBQVUsdUJBQVEsMEJBQVIsRUFBb0MsMENBQXBDLEVBQTZEO0FBQzNFQyxRQUFJLHFCQUR1RTtBQUUzRUMsdUJBQW1CLFNBQVNBLGlCQUFULEdBQTZCO0FBQzlDLGFBQU8sQ0FBQztBQUNOQyxjQUFNLE1BREE7QUFFTkMsc0JBQWMsa0JBRlI7QUFHTkMscUJBQWEsQ0FDWCxhQURXLEVBRVgsa0NBRlcsRUFHWCxrQ0FIVyxFQUlYLG1DQUpXLEVBS1gsd0JBTFcsRUFNWCxZQU5XLEVBT1gsVUFQVyxFQVFYLHdCQVJXLEVBU1gsV0FUVyxFQVVYLEtBVlcsRUFXWCxRQVhXLEVBWVgsU0FaVyxFQWFYLE1BYlcsRUFjWCxZQWRXO0FBSFAsT0FBRCxFQW1CSjtBQUNERixjQUFNLFFBREw7QUFFREUscUJBQWEsQ0FDWCxtQ0FEVyxFQUVYLGtDQUZXLEVBR1gsYUFIVyxFQUlYLFdBSlcsRUFLWCxxQkFMVyxFQU1YLFlBTlcsRUFPWCxZQVBXLEVBUVgsYUFSVyxFQVNYLEtBVFcsRUFVWCxjQVZXLEVBV1gsY0FYVyxFQVlYLFVBWlcsRUFhWCx3QkFiVyxFQWNYLFdBZFcsRUFlWCxPQWZXLEVBZ0JYLHdCQWhCVyxFQWlCWCxRQWpCVyxFQWtCWCxTQWxCVyxFQW1CWCxNQW5CVyxFQW9CWCxZQXBCVyxDQUZaO0FBd0JEQyxzQkFBYyxDQUNaLGNBRFk7QUF4QmIsT0FuQkksQ0FBUDtBQStDRCxLQWxEMEU7QUFtRDNFQyxjQUFVLFNBQVNBLFFBQVQsR0FBa0IsYUFBZTtBQUN6QyxVQUFNQyxXQUFXLEtBQUtDLFNBQUwsQ0FBZUMsU0FBZixDQUFqQjtBQUNBLGFBQU9GLFNBQVNHLElBQVQsQ0FBYyxVQUFDQyxLQUFELEVBQVc7QUFDOUIsZUFBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFhO0FBQzlCQyxjQUFJQyxlQUFKLENBQW9CQyxlQUFwQixjQUErQ0wsTUFBTU0sSUFBckQsRUFBNkRQLElBQTdELENBQWtFLFlBQU07QUFDdEVHLG9CQUFRRixLQUFSO0FBQ0QsV0FGRDtBQUdELFNBSk0sQ0FBUDtBQUtELE9BTk0sQ0FBUDtBQU9EO0FBNUQwRSxHQUE3RCxDQUFoQjs7QUErREEsb0JBQVFPLFFBQVIsQ0FBaUIsZ0JBQVlDLE9BQTdCLEVBQXNDLGdCQUFZQyxLQUFsRCxFQUF5RHJCLE9BQXpEO29CQUNlQSxPIiwiZmlsZSI6IlNEYXRhLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IEJhc2UgZnJvbSAnLi9CYXNlJztcclxuaW1wb3J0IF9TRGF0YU1vZGVsQmFzZSBmcm9tICdhcmdvcy9Nb2RlbHMvX1NEYXRhTW9kZWxCYXNlJztcclxuaW1wb3J0IE1hbmFnZXIgZnJvbSAnYXJnb3MvTW9kZWxzL01hbmFnZXInO1xyXG5pbXBvcnQgTU9ERUxfVFlQRVMgZnJvbSAnYXJnb3MvTW9kZWxzL1R5cGVzJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uL05hbWVzJztcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uTW9kZWxzLkFjY291bnQuU0RhdGEnLCBbQmFzZSwgX1NEYXRhTW9kZWxCYXNlXSwge1xyXG4gIGlkOiAnYWNjb3VudF9zZGF0YV9tb2RlbCcsXHJcbiAgY3JlYXRlUXVlcnlNb2RlbHM6IGZ1bmN0aW9uIGNyZWF0ZVF1ZXJ5TW9kZWxzKCkge1xyXG4gICAgcmV0dXJuIFt7XHJcbiAgICAgIG5hbWU6ICdsaXN0JyxcclxuICAgICAgcXVlcnlPcmRlckJ5OiAnQWNjb3VudE5hbWVVcHBlcicsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAgICAgJ0FjY291bnROYW1lJyxcclxuICAgICAgICAnQWNjb3VudE1hbmFnZXIvVXNlckluZm8vVXNlck5hbWUnLFxyXG4gICAgICAgICdBY2NvdW50TWFuYWdlci9Vc2VySW5mby9MYXN0TmFtZScsXHJcbiAgICAgICAgJ0FjY291bnRNYW5hZ2VyL1VzZXJJbmZvL0ZpcnN0TmFtZScsXHJcbiAgICAgICAgJ093bmVyL093bmVyRGVzY3JpcHRpb24nLFxyXG4gICAgICAgICdXZWJBZGRyZXNzJyxcclxuICAgICAgICAnSW5kdXN0cnknLFxyXG4gICAgICAgICdMZWFkU291cmNlL0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICAnTWFpblBob25lJyxcclxuICAgICAgICAnRmF4JyxcclxuICAgICAgICAnU3RhdHVzJyxcclxuICAgICAgICAnU3ViVHlwZScsXHJcbiAgICAgICAgJ1R5cGUnLFxyXG4gICAgICAgICdNb2RpZnlEYXRlJyxcclxuICAgICAgXSxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ2RldGFpbCcsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAgICAgJ0FjY291bnRNYW5hZ2VyL1VzZXJJbmZvL0ZpcnN0TmFtZScsXHJcbiAgICAgICAgJ0FjY291bnRNYW5hZ2VyL1VzZXJJbmZvL0xhc3ROYW1lJyxcclxuICAgICAgICAnQWNjb3VudE5hbWUnLFxyXG4gICAgICAgICdBZGRyZXNzLyonLFxyXG4gICAgICAgICdCdXNpbmVzc0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICAnQ3JlYXRlRGF0ZScsXHJcbiAgICAgICAgJ0NyZWF0ZVVzZXInLFxyXG4gICAgICAgICdEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ0ZheCcsXHJcbiAgICAgICAgJ0dsb2JhbFN5bmNJRCcsXHJcbiAgICAgICAgJ0ltcG9ydFNvdXJjZScsXHJcbiAgICAgICAgJ0luZHVzdHJ5JyxcclxuICAgICAgICAnTGVhZFNvdXJjZS9EZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ01haW5QaG9uZScsXHJcbiAgICAgICAgJ05vdGVzJyxcclxuICAgICAgICAnT3duZXIvT3duZXJEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ1N0YXR1cycsXHJcbiAgICAgICAgJ1N1YlR5cGUnLFxyXG4gICAgICAgICdUeXBlJyxcclxuICAgICAgICAnV2ViQWRkcmVzcycsXHJcbiAgICAgIF0sXHJcbiAgICAgIHF1ZXJ5SW5jbHVkZTogW1xyXG4gICAgICAgICckcGVybWlzc2lvbnMnLFxyXG4gICAgICBdLFxyXG4gICAgfV07XHJcbiAgfSxcclxuICBnZXRFbnRyeTogZnVuY3Rpb24gZ2V0RW50cnkoLyogb3B0aW9ucyAqLykge1xyXG4gICAgY29uc3QgcmVzdWx0cyQgPSB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgcmV0dXJuIHJlc3VsdHMkLnRoZW4oKGVudHJ5KSA9PiB7XHJcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgIEFwcC5waWNrbGlzdFNlcnZpY2UucmVxdWVzdFBpY2tsaXN0KGBBY2NvdW50ICR7ZW50cnkuVHlwZX1gKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgIHJlc29sdmUoZW50cnkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuTWFuYWdlci5yZWdpc3RlcihNT0RFTF9OQU1FUy5BQ0NPVU5ULCBNT0RFTF9UWVBFUy5TREFUQSwgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==