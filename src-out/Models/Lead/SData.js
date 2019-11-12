define('crm/Models/Lead/SData', ['module', 'exports', 'dojo/_base/declare', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names'], function (module, exports, _declare, _Base, _SDataModelBase2, _Manager, _Types, _Names) {
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

  var __class = (0, _declare2.default)('crm.Models.Lead.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'lead_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'LastNameUpper,FirstName',
        querySelect: ['Company', 'LeadNameLastFirst', 'WebAddress', 'Email', 'WorkPhone', 'Mobile', 'TollFree', 'Title', 'ModifyDate']
      }, {
        name: 'detail',
        querySelect: ['Address/*', 'BusinessDescription', 'Company', 'CreateDate', 'CreateUser', 'Email', 'FirstName', 'FullAddress', 'Industry', 'Interests', 'LastName', 'LeadNameLastFirst', 'LeadNameFirstLast', 'LeadSource/Description', 'MiddleName', 'Mobile', 'Notes', 'Owner/OwnerDescription', 'Prefix', 'SICCode', 'Suffix', 'Title', 'TollFree', 'WebAddress', 'WorkPhone'],
        queryInclude: ['$permissions']
      }];
    },
    getEntry: function getEntry() /* options */{
      var results$ = this.inherited(arguments);
      return results$.then(function (entry) {
        return new Promise(function (resolve) {
          Promise.all([App.picklistService.requestPicklist('Name Prefix', {
            language: ' '
          }), App.picklistService.requestPicklist('Name Suffix', {
            language: ' '
          }), App.picklistService.requestPicklist('Title', {
            language: ' '
          })]).then(function () {
            resolve(entry);
          });
        });
      });
    }
  });

  _Manager2.default.register(_Names2.default.LEAD, _Types2.default.SDATA, __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbHMvTGVhZC9TRGF0YS5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiaWQiLCJjcmVhdGVRdWVyeU1vZGVscyIsIm5hbWUiLCJxdWVyeU9yZGVyQnkiLCJxdWVyeVNlbGVjdCIsInF1ZXJ5SW5jbHVkZSIsImdldEVudHJ5IiwicmVzdWx0cyQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJ0aGVuIiwiZW50cnkiLCJQcm9taXNlIiwicmVzb2x2ZSIsImFsbCIsIkFwcCIsInBpY2tsaXN0U2VydmljZSIsInJlcXVlc3RQaWNrbGlzdCIsImxhbmd1YWdlIiwicmVnaXN0ZXIiLCJMRUFEIiwiU0RBVEEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxNQUFNQSxVQUFVLHVCQUFRLHVCQUFSLEVBQWlDLDBDQUFqQyxFQUEwRDtBQUN4RUMsUUFBSSxrQkFEb0U7QUFFeEVDLHVCQUFtQixTQUFTQSxpQkFBVCxHQUE2QjtBQUM5QyxhQUFPLENBQUM7QUFDTkMsY0FBTSxNQURBO0FBRU5DLHNCQUFjLHlCQUZSO0FBR05DLHFCQUFhLENBQ1gsU0FEVyxFQUVYLG1CQUZXLEVBR1gsWUFIVyxFQUlYLE9BSlcsRUFLWCxXQUxXLEVBTVgsUUFOVyxFQU9YLFVBUFcsRUFRWCxPQVJXLEVBU1gsWUFUVztBQUhQLE9BQUQsRUFjSjtBQUNERixjQUFNLFFBREw7QUFFREUscUJBQWEsQ0FDWCxXQURXLEVBRVgscUJBRlcsRUFHWCxTQUhXLEVBSVgsWUFKVyxFQUtYLFlBTFcsRUFNWCxPQU5XLEVBT1gsV0FQVyxFQVFYLGFBUlcsRUFTWCxVQVRXLEVBVVgsV0FWVyxFQVdYLFVBWFcsRUFZWCxtQkFaVyxFQWFYLG1CQWJXLEVBY1gsd0JBZFcsRUFlWCxZQWZXLEVBZ0JYLFFBaEJXLEVBaUJYLE9BakJXLEVBa0JYLHdCQWxCVyxFQW1CWCxRQW5CVyxFQW9CWCxTQXBCVyxFQXFCWCxRQXJCVyxFQXNCWCxPQXRCVyxFQXVCWCxVQXZCVyxFQXdCWCxZQXhCVyxFQXlCWCxXQXpCVyxDQUZaO0FBNkJEQyxzQkFBYyxDQUNaLGNBRFk7QUE3QmIsT0FkSSxDQUFQO0FBK0NELEtBbER1RTtBQW1EeEVDLGNBQVUsU0FBU0EsUUFBVCxHQUFrQixhQUFlO0FBQ3pDLFVBQU1DLFdBQVcsS0FBS0MsU0FBTCxDQUFlQyxTQUFmLENBQWpCO0FBQ0EsYUFBT0YsU0FBU0csSUFBVCxDQUFjLFVBQUNDLEtBQUQsRUFBVztBQUM5QixlQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQWE7QUFDOUJELGtCQUFRRSxHQUFSLENBQVksQ0FBQ0MsSUFBSUMsZUFBSixDQUFvQkMsZUFBcEIsQ0FBb0MsYUFBcEMsRUFBbUQ7QUFDOURDLHNCQUFVO0FBRG9ELFdBQW5ELENBQUQsRUFFUkgsSUFBSUMsZUFBSixDQUFvQkMsZUFBcEIsQ0FBb0MsYUFBcEMsRUFBbUQ7QUFDckRDLHNCQUFVO0FBRDJDLFdBQW5ELENBRlEsRUFJUkgsSUFBSUMsZUFBSixDQUFvQkMsZUFBcEIsQ0FBb0MsT0FBcEMsRUFBNkM7QUFDL0NDLHNCQUFVO0FBRHFDLFdBQTdDLENBSlEsQ0FBWixFQU1LUixJQU5MLENBTVUsWUFBTTtBQUNkRyxvQkFBUUYsS0FBUjtBQUNELFdBUkQ7QUFTRCxTQVZNLENBQVA7QUFXRCxPQVpNLENBQVA7QUFhRDtBQWxFdUUsR0FBMUQsQ0FBaEI7O0FBcUVBLG9CQUFRUSxRQUFSLENBQWlCLGdCQUFZQyxJQUE3QixFQUFtQyxnQkFBV0MsS0FBOUMsRUFBcUR0QixPQUFyRDtvQkFDZUEsTyIsImZpbGUiOiJTRGF0YS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBCYXNlIGZyb20gJy4vQmFzZSc7XHJcbmltcG9ydCBfU0RhdGFNb2RlbEJhc2UgZnJvbSAnYXJnb3MvTW9kZWxzL19TRGF0YU1vZGVsQmFzZSc7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gJ2FyZ29zL01vZGVscy9NYW5hZ2VyJztcclxuaW1wb3J0IE1PREVMX1RZUEUgZnJvbSAnYXJnb3MvTW9kZWxzL1R5cGVzJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uL05hbWVzJztcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uTW9kZWxzLkxlYWQuU0RhdGEnLCBbQmFzZSwgX1NEYXRhTW9kZWxCYXNlXSwge1xyXG4gIGlkOiAnbGVhZF9zZGF0YV9tb2RlbCcsXHJcbiAgY3JlYXRlUXVlcnlNb2RlbHM6IGZ1bmN0aW9uIGNyZWF0ZVF1ZXJ5TW9kZWxzKCkge1xyXG4gICAgcmV0dXJuIFt7XHJcbiAgICAgIG5hbWU6ICdsaXN0JyxcclxuICAgICAgcXVlcnlPcmRlckJ5OiAnTGFzdE5hbWVVcHBlcixGaXJzdE5hbWUnLFxyXG4gICAgICBxdWVyeVNlbGVjdDogW1xyXG4gICAgICAgICdDb21wYW55JyxcclxuICAgICAgICAnTGVhZE5hbWVMYXN0Rmlyc3QnLFxyXG4gICAgICAgICdXZWJBZGRyZXNzJyxcclxuICAgICAgICAnRW1haWwnLFxyXG4gICAgICAgICdXb3JrUGhvbmUnLFxyXG4gICAgICAgICdNb2JpbGUnLFxyXG4gICAgICAgICdUb2xsRnJlZScsXHJcbiAgICAgICAgJ1RpdGxlJyxcclxuICAgICAgICAnTW9kaWZ5RGF0ZScsXHJcbiAgICAgIF0sXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdkZXRhaWwnLFxyXG4gICAgICBxdWVyeVNlbGVjdDogW1xyXG4gICAgICAgICdBZGRyZXNzLyonLFxyXG4gICAgICAgICdCdXNpbmVzc0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICAnQ29tcGFueScsXHJcbiAgICAgICAgJ0NyZWF0ZURhdGUnLFxyXG4gICAgICAgICdDcmVhdGVVc2VyJyxcclxuICAgICAgICAnRW1haWwnLFxyXG4gICAgICAgICdGaXJzdE5hbWUnLFxyXG4gICAgICAgICdGdWxsQWRkcmVzcycsXHJcbiAgICAgICAgJ0luZHVzdHJ5JyxcclxuICAgICAgICAnSW50ZXJlc3RzJyxcclxuICAgICAgICAnTGFzdE5hbWUnLFxyXG4gICAgICAgICdMZWFkTmFtZUxhc3RGaXJzdCcsXHJcbiAgICAgICAgJ0xlYWROYW1lRmlyc3RMYXN0JyxcclxuICAgICAgICAnTGVhZFNvdXJjZS9EZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ01pZGRsZU5hbWUnLFxyXG4gICAgICAgICdNb2JpbGUnLFxyXG4gICAgICAgICdOb3RlcycsXHJcbiAgICAgICAgJ093bmVyL093bmVyRGVzY3JpcHRpb24nLFxyXG4gICAgICAgICdQcmVmaXgnLFxyXG4gICAgICAgICdTSUNDb2RlJyxcclxuICAgICAgICAnU3VmZml4JyxcclxuICAgICAgICAnVGl0bGUnLFxyXG4gICAgICAgICdUb2xsRnJlZScsXHJcbiAgICAgICAgJ1dlYkFkZHJlc3MnLFxyXG4gICAgICAgICdXb3JrUGhvbmUnLFxyXG4gICAgICBdLFxyXG4gICAgICBxdWVyeUluY2x1ZGU6IFtcclxuICAgICAgICAnJHBlcm1pc3Npb25zJyxcclxuICAgICAgXSxcclxuICAgIH1dO1xyXG4gIH0sXHJcbiAgZ2V0RW50cnk6IGZ1bmN0aW9uIGdldEVudHJ5KC8qIG9wdGlvbnMgKi8pIHtcclxuICAgIGNvbnN0IHJlc3VsdHMkID0gdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICAgIHJldHVybiByZXN1bHRzJC50aGVuKChlbnRyeSkgPT4ge1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICBQcm9taXNlLmFsbChbQXBwLnBpY2tsaXN0U2VydmljZS5yZXF1ZXN0UGlja2xpc3QoJ05hbWUgUHJlZml4Jywge1xyXG4gICAgICAgICAgbGFuZ3VhZ2U6ICcgJyxcclxuICAgICAgICB9KSwgQXBwLnBpY2tsaXN0U2VydmljZS5yZXF1ZXN0UGlja2xpc3QoJ05hbWUgU3VmZml4Jywge1xyXG4gICAgICAgICAgbGFuZ3VhZ2U6ICcgJyxcclxuICAgICAgICB9KSwgQXBwLnBpY2tsaXN0U2VydmljZS5yZXF1ZXN0UGlja2xpc3QoJ1RpdGxlJywge1xyXG4gICAgICAgICAgbGFuZ3VhZ2U6ICcgJyxcclxuICAgICAgICB9KV0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgcmVzb2x2ZShlbnRyeSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5NYW5hZ2VyLnJlZ2lzdGVyKE1PREVMX05BTUVTLkxFQUQsIE1PREVMX1RZUEUuU0RBVEEsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=