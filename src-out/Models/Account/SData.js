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
      var results$ = this.inherited(getEntry, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbHMvQWNjb3VudC9TRGF0YS5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiaWQiLCJjcmVhdGVRdWVyeU1vZGVscyIsIm5hbWUiLCJxdWVyeU9yZGVyQnkiLCJxdWVyeVNlbGVjdCIsInF1ZXJ5SW5jbHVkZSIsImdldEVudHJ5IiwicmVzdWx0cyQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJ0aGVuIiwiZW50cnkiLCJQcm9taXNlIiwicmVzb2x2ZSIsIkFwcCIsInBpY2tsaXN0U2VydmljZSIsInJlcXVlc3RQaWNrbGlzdCIsIlR5cGUiLCJyZWdpc3RlciIsIkFDQ09VTlQiLCJTREFUQSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE1BQU1BLFVBQVUsdUJBQVEsMEJBQVIsRUFBb0MsMENBQXBDLEVBQTZEO0FBQzNFQyxRQUFJLHFCQUR1RTtBQUUzRUMsdUJBQW1CLFNBQVNBLGlCQUFULEdBQTZCO0FBQzlDLGFBQU8sQ0FBQztBQUNOQyxjQUFNLE1BREE7QUFFTkMsc0JBQWMsa0JBRlI7QUFHTkMscUJBQWEsQ0FDWCxhQURXLEVBRVgsa0NBRlcsRUFHWCxrQ0FIVyxFQUlYLG1DQUpXLEVBS1gsd0JBTFcsRUFNWCxZQU5XLEVBT1gsVUFQVyxFQVFYLHdCQVJXLEVBU1gsV0FUVyxFQVVYLEtBVlcsRUFXWCxRQVhXLEVBWVgsU0FaVyxFQWFYLE1BYlcsRUFjWCxZQWRXO0FBSFAsT0FBRCxFQW1CSjtBQUNERixjQUFNLFFBREw7QUFFREUscUJBQWEsQ0FDWCxtQ0FEVyxFQUVYLGtDQUZXLEVBR1gsYUFIVyxFQUlYLFdBSlcsRUFLWCxxQkFMVyxFQU1YLFlBTlcsRUFPWCxZQVBXLEVBUVgsYUFSVyxFQVNYLEtBVFcsRUFVWCxjQVZXLEVBV1gsY0FYVyxFQVlYLFVBWlcsRUFhWCx3QkFiVyxFQWNYLFdBZFcsRUFlWCxPQWZXLEVBZ0JYLHdCQWhCVyxFQWlCWCxRQWpCVyxFQWtCWCxTQWxCVyxFQW1CWCxNQW5CVyxFQW9CWCxZQXBCVyxDQUZaO0FBd0JEQyxzQkFBYyxDQUNaLGNBRFk7QUF4QmIsT0FuQkksQ0FBUDtBQStDRCxLQWxEMEU7QUFtRDNFQyxjQUFVLFNBQVNBLFFBQVQsR0FBa0IsYUFBZTtBQUN6QyxVQUFNQyxXQUFXLEtBQUtDLFNBQUwsQ0FBZUYsUUFBZixFQUF5QkcsU0FBekIsQ0FBakI7QUFDQSxhQUFPRixTQUFTRyxJQUFULENBQWMsVUFBQ0MsS0FBRCxFQUFXO0FBQzlCLGVBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBYTtBQUM5QkMsY0FBSUMsZUFBSixDQUFvQkMsZUFBcEIsY0FBK0NMLE1BQU1NLElBQXJELEVBQTZEUCxJQUE3RCxDQUFrRSxZQUFNO0FBQ3RFRyxvQkFBUUYsS0FBUjtBQUNELFdBRkQ7QUFHRCxTQUpNLENBQVA7QUFLRCxPQU5NLENBQVA7QUFPRDtBQTVEMEUsR0FBN0QsQ0FBaEI7O0FBK0RBLG9CQUFRTyxRQUFSLENBQWlCLGdCQUFZQyxPQUE3QixFQUFzQyxnQkFBWUMsS0FBbEQsRUFBeURyQixPQUF6RDtvQkFDZUEsTyIsImZpbGUiOiJTRGF0YS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBCYXNlIGZyb20gJy4vQmFzZSc7XHJcbmltcG9ydCBfU0RhdGFNb2RlbEJhc2UgZnJvbSAnYXJnb3MvTW9kZWxzL19TRGF0YU1vZGVsQmFzZSc7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gJ2FyZ29zL01vZGVscy9NYW5hZ2VyJztcclxuaW1wb3J0IE1PREVMX1RZUEVTIGZyb20gJ2FyZ29zL01vZGVscy9UeXBlcyc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi9OYW1lcyc7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLk1vZGVscy5BY2NvdW50LlNEYXRhJywgW0Jhc2UsIF9TRGF0YU1vZGVsQmFzZV0sIHtcclxuICBpZDogJ2FjY291bnRfc2RhdGFfbW9kZWwnLFxyXG4gIGNyZWF0ZVF1ZXJ5TW9kZWxzOiBmdW5jdGlvbiBjcmVhdGVRdWVyeU1vZGVscygpIHtcclxuICAgIHJldHVybiBbe1xyXG4gICAgICBuYW1lOiAnbGlzdCcsXHJcbiAgICAgIHF1ZXJ5T3JkZXJCeTogJ0FjY291bnROYW1lVXBwZXInLFxyXG4gICAgICBxdWVyeVNlbGVjdDogW1xyXG4gICAgICAgICdBY2NvdW50TmFtZScsXHJcbiAgICAgICAgJ0FjY291bnRNYW5hZ2VyL1VzZXJJbmZvL1VzZXJOYW1lJyxcclxuICAgICAgICAnQWNjb3VudE1hbmFnZXIvVXNlckluZm8vTGFzdE5hbWUnLFxyXG4gICAgICAgICdBY2NvdW50TWFuYWdlci9Vc2VySW5mby9GaXJzdE5hbWUnLFxyXG4gICAgICAgICdPd25lci9Pd25lckRlc2NyaXB0aW9uJyxcclxuICAgICAgICAnV2ViQWRkcmVzcycsXHJcbiAgICAgICAgJ0luZHVzdHJ5JyxcclxuICAgICAgICAnTGVhZFNvdXJjZS9EZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ01haW5QaG9uZScsXHJcbiAgICAgICAgJ0ZheCcsXHJcbiAgICAgICAgJ1N0YXR1cycsXHJcbiAgICAgICAgJ1N1YlR5cGUnLFxyXG4gICAgICAgICdUeXBlJyxcclxuICAgICAgICAnTW9kaWZ5RGF0ZScsXHJcbiAgICAgIF0sXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdkZXRhaWwnLFxyXG4gICAgICBxdWVyeVNlbGVjdDogW1xyXG4gICAgICAgICdBY2NvdW50TWFuYWdlci9Vc2VySW5mby9GaXJzdE5hbWUnLFxyXG4gICAgICAgICdBY2NvdW50TWFuYWdlci9Vc2VySW5mby9MYXN0TmFtZScsXHJcbiAgICAgICAgJ0FjY291bnROYW1lJyxcclxuICAgICAgICAnQWRkcmVzcy8qJyxcclxuICAgICAgICAnQnVzaW5lc3NEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ0NyZWF0ZURhdGUnLFxyXG4gICAgICAgICdDcmVhdGVVc2VyJyxcclxuICAgICAgICAnRGVzY3JpcHRpb24nLFxyXG4gICAgICAgICdGYXgnLFxyXG4gICAgICAgICdHbG9iYWxTeW5jSUQnLFxyXG4gICAgICAgICdJbXBvcnRTb3VyY2UnLFxyXG4gICAgICAgICdJbmR1c3RyeScsXHJcbiAgICAgICAgJ0xlYWRTb3VyY2UvRGVzY3JpcHRpb24nLFxyXG4gICAgICAgICdNYWluUGhvbmUnLFxyXG4gICAgICAgICdOb3RlcycsXHJcbiAgICAgICAgJ093bmVyL093bmVyRGVzY3JpcHRpb24nLFxyXG4gICAgICAgICdTdGF0dXMnLFxyXG4gICAgICAgICdTdWJUeXBlJyxcclxuICAgICAgICAnVHlwZScsXHJcbiAgICAgICAgJ1dlYkFkZHJlc3MnLFxyXG4gICAgICBdLFxyXG4gICAgICBxdWVyeUluY2x1ZGU6IFtcclxuICAgICAgICAnJHBlcm1pc3Npb25zJyxcclxuICAgICAgXSxcclxuICAgIH1dO1xyXG4gIH0sXHJcbiAgZ2V0RW50cnk6IGZ1bmN0aW9uIGdldEVudHJ5KC8qIG9wdGlvbnMgKi8pIHtcclxuICAgIGNvbnN0IHJlc3VsdHMkID0gdGhpcy5pbmhlcml0ZWQoZ2V0RW50cnksIGFyZ3VtZW50cyk7XHJcbiAgICByZXR1cm4gcmVzdWx0cyQudGhlbigoZW50cnkpID0+IHtcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgQXBwLnBpY2tsaXN0U2VydmljZS5yZXF1ZXN0UGlja2xpc3QoYEFjY291bnQgJHtlbnRyeS5UeXBlfWApLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgcmVzb2x2ZShlbnRyeSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5NYW5hZ2VyLnJlZ2lzdGVyKE1PREVMX05BTUVTLkFDQ09VTlQsIE1PREVMX1RZUEVTLlNEQVRBLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19