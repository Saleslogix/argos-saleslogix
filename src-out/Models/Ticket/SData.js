define('crm/Models/Ticket/SData', ['module', 'exports', 'dojo/_base/declare', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names'], function (module, exports, _declare, _Base, _SDataModelBase2, _Manager, _Types, _Names) {
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

  var __class = (0, _declare2.default)('crm.Models.Ticket.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'ticket_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'TicketNumber',
        querySelect: ['Account/AccountName', 'Account/MainPhone', 'Area', 'Category', 'Issue', 'AssignedTo/OwnerDescription', 'Contact/NameLF', 'Contact/WorkPhone', 'ReceivedDate', 'StatusCode', 'Subject', 'TicketNumber', 'UrgencyCode', 'Urgency/Description', 'ModifyDate', 'CreateDate', 'NeededByDate']
      }, {
        name: 'detail',
        querySelect: ['Account/AccountName', 'Account/MainPhone', 'Area', 'AssignedDate', 'AssignedTo/OwnerDescription', 'Category', 'Contact/NameLF', 'Contact/WorkPhone', 'Contract/ReferenceNumber', 'Issue', 'NeededByDate', 'Notes', 'ViaCode', 'StatusCode', 'UrgencyCode', 'Subject', 'TicketNumber', 'TicketProblem/Notes', 'TicketSolution/Notes', 'Urgency/Description', 'Urgency/UrgencyCode', 'CompletedBy/OwnerDescription'],
        queryInclude: ['$permissions']
      }];
    }
  });

  _Manager2.default.register(_Names2.default.TICKET, _Types2.default.SDATA, __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbHMvVGlja2V0L1NEYXRhLmpzIl0sIm5hbWVzIjpbIl9fY2xhc3MiLCJpZCIsImNyZWF0ZVF1ZXJ5TW9kZWxzIiwibmFtZSIsInF1ZXJ5T3JkZXJCeSIsInF1ZXJ5U2VsZWN0IiwicXVlcnlJbmNsdWRlIiwicmVnaXN0ZXIiLCJUSUNLRVQiLCJTREFUQSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE1BQU1BLFVBQVUsdUJBQVEseUJBQVIsRUFBbUMsMENBQW5DLEVBQTREO0FBQzFFQyxRQUFJLG9CQURzRTtBQUUxRUMsdUJBQW1CLFNBQVNBLGlCQUFULEdBQTZCO0FBQzlDLGFBQU8sQ0FBQztBQUNOQyxjQUFNLE1BREE7QUFFTkMsc0JBQWMsY0FGUjtBQUdOQyxxQkFBYSxDQUNYLHFCQURXLEVBRVgsbUJBRlcsRUFHWCxNQUhXLEVBSVgsVUFKVyxFQUtYLE9BTFcsRUFNWCw2QkFOVyxFQU9YLGdCQVBXLEVBUVgsbUJBUlcsRUFTWCxjQVRXLEVBVVgsWUFWVyxFQVdYLFNBWFcsRUFZWCxjQVpXLEVBYVgsYUFiVyxFQWNYLHFCQWRXLEVBZVgsWUFmVyxFQWdCWCxZQWhCVyxFQWlCWCxjQWpCVztBQUhQLE9BQUQsRUFzQko7QUFDREYsY0FBTSxRQURMO0FBRURFLHFCQUFhLENBQ1gscUJBRFcsRUFFWCxtQkFGVyxFQUdYLE1BSFcsRUFJWCxjQUpXLEVBS1gsNkJBTFcsRUFNWCxVQU5XLEVBT1gsZ0JBUFcsRUFRWCxtQkFSVyxFQVNYLDBCQVRXLEVBVVgsT0FWVyxFQVdYLGNBWFcsRUFZWCxPQVpXLEVBYVgsU0FiVyxFQWNYLFlBZFcsRUFlWCxhQWZXLEVBZ0JYLFNBaEJXLEVBaUJYLGNBakJXLEVBa0JYLHFCQWxCVyxFQW1CWCxzQkFuQlcsRUFvQlgscUJBcEJXLEVBcUJYLHFCQXJCVyxFQXNCWCw4QkF0QlcsQ0FGWjtBQTBCREMsc0JBQWMsQ0FDWixjQURZO0FBMUJiLE9BdEJJLENBQVA7QUFvREQ7QUF2RHlFLEdBQTVELENBQWhCOztBQTBEQSxvQkFBUUMsUUFBUixDQUFpQixnQkFBWUMsTUFBN0IsRUFBcUMsZ0JBQVdDLEtBQWhELEVBQXVEVCxPQUF2RDtvQkFDZUEsTyIsImZpbGUiOiJTRGF0YS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBCYXNlIGZyb20gJy4vQmFzZSc7XHJcbmltcG9ydCBfU0RhdGFNb2RlbEJhc2UgZnJvbSAnYXJnb3MvTW9kZWxzL19TRGF0YU1vZGVsQmFzZSc7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gJ2FyZ29zL01vZGVscy9NYW5hZ2VyJztcclxuaW1wb3J0IE1PREVMX1RZUEUgZnJvbSAnYXJnb3MvTW9kZWxzL1R5cGVzJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uL05hbWVzJztcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uTW9kZWxzLlRpY2tldC5TRGF0YScsIFtCYXNlLCBfU0RhdGFNb2RlbEJhc2VdLCB7XHJcbiAgaWQ6ICd0aWNrZXRfc2RhdGFfbW9kZWwnLFxyXG4gIGNyZWF0ZVF1ZXJ5TW9kZWxzOiBmdW5jdGlvbiBjcmVhdGVRdWVyeU1vZGVscygpIHtcclxuICAgIHJldHVybiBbe1xyXG4gICAgICBuYW1lOiAnbGlzdCcsXHJcbiAgICAgIHF1ZXJ5T3JkZXJCeTogJ1RpY2tldE51bWJlcicsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAgICAgJ0FjY291bnQvQWNjb3VudE5hbWUnLFxyXG4gICAgICAgICdBY2NvdW50L01haW5QaG9uZScsXHJcbiAgICAgICAgJ0FyZWEnLFxyXG4gICAgICAgICdDYXRlZ29yeScsXHJcbiAgICAgICAgJ0lzc3VlJyxcclxuICAgICAgICAnQXNzaWduZWRUby9Pd25lckRlc2NyaXB0aW9uJyxcclxuICAgICAgICAnQ29udGFjdC9OYW1lTEYnLFxyXG4gICAgICAgICdDb250YWN0L1dvcmtQaG9uZScsXHJcbiAgICAgICAgJ1JlY2VpdmVkRGF0ZScsXHJcbiAgICAgICAgJ1N0YXR1c0NvZGUnLFxyXG4gICAgICAgICdTdWJqZWN0JyxcclxuICAgICAgICAnVGlja2V0TnVtYmVyJyxcclxuICAgICAgICAnVXJnZW5jeUNvZGUnLFxyXG4gICAgICAgICdVcmdlbmN5L0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICAnTW9kaWZ5RGF0ZScsXHJcbiAgICAgICAgJ0NyZWF0ZURhdGUnLFxyXG4gICAgICAgICdOZWVkZWRCeURhdGUnLFxyXG4gICAgICBdLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnZGV0YWlsJyxcclxuICAgICAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICAgICAnQWNjb3VudC9BY2NvdW50TmFtZScsXHJcbiAgICAgICAgJ0FjY291bnQvTWFpblBob25lJyxcclxuICAgICAgICAnQXJlYScsXHJcbiAgICAgICAgJ0Fzc2lnbmVkRGF0ZScsXHJcbiAgICAgICAgJ0Fzc2lnbmVkVG8vT3duZXJEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ0NhdGVnb3J5JyxcclxuICAgICAgICAnQ29udGFjdC9OYW1lTEYnLFxyXG4gICAgICAgICdDb250YWN0L1dvcmtQaG9uZScsXHJcbiAgICAgICAgJ0NvbnRyYWN0L1JlZmVyZW5jZU51bWJlcicsXHJcbiAgICAgICAgJ0lzc3VlJyxcclxuICAgICAgICAnTmVlZGVkQnlEYXRlJyxcclxuICAgICAgICAnTm90ZXMnLFxyXG4gICAgICAgICdWaWFDb2RlJyxcclxuICAgICAgICAnU3RhdHVzQ29kZScsXHJcbiAgICAgICAgJ1VyZ2VuY3lDb2RlJyxcclxuICAgICAgICAnU3ViamVjdCcsXHJcbiAgICAgICAgJ1RpY2tldE51bWJlcicsXHJcbiAgICAgICAgJ1RpY2tldFByb2JsZW0vTm90ZXMnLFxyXG4gICAgICAgICdUaWNrZXRTb2x1dGlvbi9Ob3RlcycsXHJcbiAgICAgICAgJ1VyZ2VuY3kvRGVzY3JpcHRpb24nLFxyXG4gICAgICAgICdVcmdlbmN5L1VyZ2VuY3lDb2RlJyxcclxuICAgICAgICAnQ29tcGxldGVkQnkvT3duZXJEZXNjcmlwdGlvbicsXHJcbiAgICAgIF0sXHJcbiAgICAgIHF1ZXJ5SW5jbHVkZTogW1xyXG4gICAgICAgICckcGVybWlzc2lvbnMnLFxyXG4gICAgICBdLFxyXG4gICAgfV07XHJcbiAgfSxcclxufSk7XHJcblxyXG5NYW5hZ2VyLnJlZ2lzdGVyKE1PREVMX05BTUVTLlRJQ0tFVCwgTU9ERUxfVFlQRS5TREFUQSwgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==