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
      var results$ = this.inherited(getEntry, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbHMvTGVhZC9TRGF0YS5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiaWQiLCJjcmVhdGVRdWVyeU1vZGVscyIsIm5hbWUiLCJxdWVyeU9yZGVyQnkiLCJxdWVyeVNlbGVjdCIsInF1ZXJ5SW5jbHVkZSIsImdldEVudHJ5IiwicmVzdWx0cyQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJ0aGVuIiwiZW50cnkiLCJQcm9taXNlIiwicmVzb2x2ZSIsImFsbCIsIkFwcCIsInBpY2tsaXN0U2VydmljZSIsInJlcXVlc3RQaWNrbGlzdCIsImxhbmd1YWdlIiwicmVnaXN0ZXIiLCJMRUFEIiwiU0RBVEEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxNQUFNQSxVQUFVLHVCQUFRLHVCQUFSLEVBQWlDLDBDQUFqQyxFQUEwRDtBQUN4RUMsUUFBSSxrQkFEb0U7QUFFeEVDLHVCQUFtQixTQUFTQSxpQkFBVCxHQUE2QjtBQUM5QyxhQUFPLENBQUM7QUFDTkMsY0FBTSxNQURBO0FBRU5DLHNCQUFjLHlCQUZSO0FBR05DLHFCQUFhLENBQ1gsU0FEVyxFQUVYLG1CQUZXLEVBR1gsWUFIVyxFQUlYLE9BSlcsRUFLWCxXQUxXLEVBTVgsUUFOVyxFQU9YLFVBUFcsRUFRWCxPQVJXLEVBU1gsWUFUVztBQUhQLE9BQUQsRUFjSjtBQUNERixjQUFNLFFBREw7QUFFREUscUJBQWEsQ0FDWCxXQURXLEVBRVgscUJBRlcsRUFHWCxTQUhXLEVBSVgsWUFKVyxFQUtYLFlBTFcsRUFNWCxPQU5XLEVBT1gsV0FQVyxFQVFYLGFBUlcsRUFTWCxVQVRXLEVBVVgsV0FWVyxFQVdYLFVBWFcsRUFZWCxtQkFaVyxFQWFYLG1CQWJXLEVBY1gsd0JBZFcsRUFlWCxZQWZXLEVBZ0JYLFFBaEJXLEVBaUJYLE9BakJXLEVBa0JYLHdCQWxCVyxFQW1CWCxRQW5CVyxFQW9CWCxTQXBCVyxFQXFCWCxRQXJCVyxFQXNCWCxPQXRCVyxFQXVCWCxVQXZCVyxFQXdCWCxZQXhCVyxFQXlCWCxXQXpCVyxDQUZaO0FBNkJEQyxzQkFBYyxDQUNaLGNBRFk7QUE3QmIsT0FkSSxDQUFQO0FBK0NELEtBbER1RTtBQW1EeEVDLGNBQVUsU0FBU0EsUUFBVCxHQUFrQixhQUFlO0FBQ3pDLFVBQU1DLFdBQVcsS0FBS0MsU0FBTCxDQUFlRixRQUFmLEVBQXlCRyxTQUF6QixDQUFqQjtBQUNBLGFBQU9GLFNBQVNHLElBQVQsQ0FBYyxVQUFDQyxLQUFELEVBQVc7QUFDOUIsZUFBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFhO0FBQzlCRCxrQkFBUUUsR0FBUixDQUFZLENBQUNDLElBQUlDLGVBQUosQ0FBb0JDLGVBQXBCLENBQW9DLGFBQXBDLEVBQW1EO0FBQzlEQyxzQkFBVTtBQURvRCxXQUFuRCxDQUFELEVBRVJILElBQUlDLGVBQUosQ0FBb0JDLGVBQXBCLENBQW9DLGFBQXBDLEVBQW1EO0FBQ3JEQyxzQkFBVTtBQUQyQyxXQUFuRCxDQUZRLEVBSVJILElBQUlDLGVBQUosQ0FBb0JDLGVBQXBCLENBQW9DLE9BQXBDLEVBQTZDO0FBQy9DQyxzQkFBVTtBQURxQyxXQUE3QyxDQUpRLENBQVosRUFNS1IsSUFOTCxDQU1VLFlBQU07QUFDZEcsb0JBQVFGLEtBQVI7QUFDRCxXQVJEO0FBU0QsU0FWTSxDQUFQO0FBV0QsT0FaTSxDQUFQO0FBYUQ7QUFsRXVFLEdBQTFELENBQWhCOztBQXFFQSxvQkFBUVEsUUFBUixDQUFpQixnQkFBWUMsSUFBN0IsRUFBbUMsZ0JBQVdDLEtBQTlDLEVBQXFEdEIsT0FBckQ7b0JBQ2VBLE8iLCJmaWxlIjoiU0RhdGEuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgQmFzZSBmcm9tICcuL0Jhc2UnO1xyXG5pbXBvcnQgX1NEYXRhTW9kZWxCYXNlIGZyb20gJ2FyZ29zL01vZGVscy9fU0RhdGFNb2RlbEJhc2UnO1xyXG5pbXBvcnQgTWFuYWdlciBmcm9tICdhcmdvcy9Nb2RlbHMvTWFuYWdlcic7XHJcbmltcG9ydCBNT0RFTF9UWVBFIGZyb20gJ2FyZ29zL01vZGVscy9UeXBlcyc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi9OYW1lcyc7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLk1vZGVscy5MZWFkLlNEYXRhJywgW0Jhc2UsIF9TRGF0YU1vZGVsQmFzZV0sIHtcclxuICBpZDogJ2xlYWRfc2RhdGFfbW9kZWwnLFxyXG4gIGNyZWF0ZVF1ZXJ5TW9kZWxzOiBmdW5jdGlvbiBjcmVhdGVRdWVyeU1vZGVscygpIHtcclxuICAgIHJldHVybiBbe1xyXG4gICAgICBuYW1lOiAnbGlzdCcsXHJcbiAgICAgIHF1ZXJ5T3JkZXJCeTogJ0xhc3ROYW1lVXBwZXIsRmlyc3ROYW1lJyxcclxuICAgICAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICAgICAnQ29tcGFueScsXHJcbiAgICAgICAgJ0xlYWROYW1lTGFzdEZpcnN0JyxcclxuICAgICAgICAnV2ViQWRkcmVzcycsXHJcbiAgICAgICAgJ0VtYWlsJyxcclxuICAgICAgICAnV29ya1Bob25lJyxcclxuICAgICAgICAnTW9iaWxlJyxcclxuICAgICAgICAnVG9sbEZyZWUnLFxyXG4gICAgICAgICdUaXRsZScsXHJcbiAgICAgICAgJ01vZGlmeURhdGUnLFxyXG4gICAgICBdLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnZGV0YWlsJyxcclxuICAgICAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICAgICAnQWRkcmVzcy8qJyxcclxuICAgICAgICAnQnVzaW5lc3NEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ0NvbXBhbnknLFxyXG4gICAgICAgICdDcmVhdGVEYXRlJyxcclxuICAgICAgICAnQ3JlYXRlVXNlcicsXHJcbiAgICAgICAgJ0VtYWlsJyxcclxuICAgICAgICAnRmlyc3ROYW1lJyxcclxuICAgICAgICAnRnVsbEFkZHJlc3MnLFxyXG4gICAgICAgICdJbmR1c3RyeScsXHJcbiAgICAgICAgJ0ludGVyZXN0cycsXHJcbiAgICAgICAgJ0xhc3ROYW1lJyxcclxuICAgICAgICAnTGVhZE5hbWVMYXN0Rmlyc3QnLFxyXG4gICAgICAgICdMZWFkTmFtZUZpcnN0TGFzdCcsXHJcbiAgICAgICAgJ0xlYWRTb3VyY2UvRGVzY3JpcHRpb24nLFxyXG4gICAgICAgICdNaWRkbGVOYW1lJyxcclxuICAgICAgICAnTW9iaWxlJyxcclxuICAgICAgICAnTm90ZXMnLFxyXG4gICAgICAgICdPd25lci9Pd25lckRlc2NyaXB0aW9uJyxcclxuICAgICAgICAnUHJlZml4JyxcclxuICAgICAgICAnU0lDQ29kZScsXHJcbiAgICAgICAgJ1N1ZmZpeCcsXHJcbiAgICAgICAgJ1RpdGxlJyxcclxuICAgICAgICAnVG9sbEZyZWUnLFxyXG4gICAgICAgICdXZWJBZGRyZXNzJyxcclxuICAgICAgICAnV29ya1Bob25lJyxcclxuICAgICAgXSxcclxuICAgICAgcXVlcnlJbmNsdWRlOiBbXHJcbiAgICAgICAgJyRwZXJtaXNzaW9ucycsXHJcbiAgICAgIF0sXHJcbiAgICB9XTtcclxuICB9LFxyXG4gIGdldEVudHJ5OiBmdW5jdGlvbiBnZXRFbnRyeSgvKiBvcHRpb25zICovKSB7XHJcbiAgICBjb25zdCByZXN1bHRzJCA9IHRoaXMuaW5oZXJpdGVkKGdldEVudHJ5LCBhcmd1bWVudHMpO1xyXG4gICAgcmV0dXJuIHJlc3VsdHMkLnRoZW4oKGVudHJ5KSA9PiB7XHJcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgIFByb21pc2UuYWxsKFtBcHAucGlja2xpc3RTZXJ2aWNlLnJlcXVlc3RQaWNrbGlzdCgnTmFtZSBQcmVmaXgnLCB7XHJcbiAgICAgICAgICBsYW5ndWFnZTogJyAnLFxyXG4gICAgICAgIH0pLCBBcHAucGlja2xpc3RTZXJ2aWNlLnJlcXVlc3RQaWNrbGlzdCgnTmFtZSBTdWZmaXgnLCB7XHJcbiAgICAgICAgICBsYW5ndWFnZTogJyAnLFxyXG4gICAgICAgIH0pLCBBcHAucGlja2xpc3RTZXJ2aWNlLnJlcXVlc3RQaWNrbGlzdCgnVGl0bGUnLCB7XHJcbiAgICAgICAgICBsYW5ndWFnZTogJyAnLFxyXG4gICAgICAgIH0pXSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICByZXNvbHZlKGVudHJ5KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9LFxyXG59KTtcclxuXHJcbk1hbmFnZXIucmVnaXN0ZXIoTU9ERUxfTkFNRVMuTEVBRCwgTU9ERUxfVFlQRS5TREFUQSwgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==