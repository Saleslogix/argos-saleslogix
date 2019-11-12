define('crm/Models/TicketActivity/SData', ['module', 'exports', 'dojo/_base/declare', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names'], function (module, exports, _declare, _Base, _SDataModelBase2, _Manager, _Types, _Names) {
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

  var __class = (0, _declare2.default)('crm.Models.TicketActivity.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'ticket_activity_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'AssignedDate asc',
        querySelect: ['ActivityDescription', 'ActivityTypeCode', 'AssignedDate', 'CompletedDate', 'ElapsedUnits', 'FollowUp', 'PublicAccessCode', 'Rate', 'RateTypeDescription/Amount', 'RateTypeDescription/RateTypeCode', 'RateTypeDescription/TypeDescription', 'TotalFee', 'TotalLabor', 'TotalParts', 'Units', 'Ticket/Account/AccountName', 'Ticket/TicketNumber', 'Ticket/Contact/Name', 'User/UserInfo/LastName', 'User/UserInfo/FirstName'],
        queryInclude: ['$permissions']
      }, {
        name: 'detail',
        querySelect: ['ActivityDescription', 'ActivityTypeCode', 'AssignedDate', 'CompletedDate', 'ElapsedUnits', 'FollowUp', 'PublicAccessCode', 'Rate', 'RateTypeDescription/Amount', 'RateTypeDescription/RateTypeCode', 'RateTypeDescription/TypeDescription', 'TotalFee', 'TotalLabor', 'TotalParts', 'Units', 'Ticket/Account/AccountName', 'Ticket/TicketNumber', 'Ticket/Contact/Name', 'User/UserInfo/LastName', 'User/UserInfo/FirstName']
      }, {
        name: 'edit',
        querySelect: ['ActivityDescription', 'ActivityTypeCode', 'AssignedDate', 'CompletedDate', 'PublicAccessCode', 'User/UserName', 'User/UserInfo/FirstName', 'User/UserInfo/LastName'],
        queryInclude: ['$permissions']
      }];
    }
  });

  _Manager2.default.register(_Names2.default.TICKETACTIVITY, _Types2.default.SDATA, __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbHMvVGlja2V0QWN0aXZpdHkvU0RhdGEuanMiXSwibmFtZXMiOlsiX19jbGFzcyIsImlkIiwiY3JlYXRlUXVlcnlNb2RlbHMiLCJuYW1lIiwicXVlcnlPcmRlckJ5IiwicXVlcnlTZWxlY3QiLCJxdWVyeUluY2x1ZGUiLCJyZWdpc3RlciIsIlRJQ0tFVEFDVElWSVRZIiwiU0RBVEEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxNQUFNQSxVQUFVLHVCQUFRLGlDQUFSLEVBQTJDLDBDQUEzQyxFQUFvRTtBQUNsRkMsUUFBSSw2QkFEOEU7QUFFbEZDLHVCQUFtQixTQUFTQSxpQkFBVCxHQUE2QjtBQUM5QyxhQUFPLENBQUM7QUFDTkMsY0FBTSxNQURBO0FBRU5DLHNCQUFjLGtCQUZSO0FBR05DLHFCQUFhLENBQ1gscUJBRFcsRUFFWCxrQkFGVyxFQUdYLGNBSFcsRUFJWCxlQUpXLEVBS1gsY0FMVyxFQU1YLFVBTlcsRUFPWCxrQkFQVyxFQVFYLE1BUlcsRUFTWCw0QkFUVyxFQVVYLGtDQVZXLEVBV1gscUNBWFcsRUFZWCxVQVpXLEVBYVgsWUFiVyxFQWNYLFlBZFcsRUFlWCxPQWZXLEVBZ0JYLDRCQWhCVyxFQWlCWCxxQkFqQlcsRUFrQlgscUJBbEJXLEVBbUJYLHdCQW5CVyxFQW9CWCx5QkFwQlcsQ0FIUDtBQXlCTkMsc0JBQWMsQ0FDWixjQURZO0FBekJSLE9BQUQsRUE0Qko7QUFDREgsY0FBTSxRQURMO0FBRURFLHFCQUFhLENBQ1gscUJBRFcsRUFFWCxrQkFGVyxFQUdYLGNBSFcsRUFJWCxlQUpXLEVBS1gsY0FMVyxFQU1YLFVBTlcsRUFPWCxrQkFQVyxFQVFYLE1BUlcsRUFTWCw0QkFUVyxFQVVYLGtDQVZXLEVBV1gscUNBWFcsRUFZWCxVQVpXLEVBYVgsWUFiVyxFQWNYLFlBZFcsRUFlWCxPQWZXLEVBZ0JYLDRCQWhCVyxFQWlCWCxxQkFqQlcsRUFrQlgscUJBbEJXLEVBbUJYLHdCQW5CVyxFQW9CWCx5QkFwQlc7QUFGWixPQTVCSSxFQW9ESjtBQUNERixjQUFNLE1BREw7QUFFREUscUJBQWEsQ0FDWCxxQkFEVyxFQUVYLGtCQUZXLEVBR1gsY0FIVyxFQUlYLGVBSlcsRUFLWCxrQkFMVyxFQU1YLGVBTlcsRUFPWCx5QkFQVyxFQVFYLHdCQVJXLENBRlo7QUFZREMsc0JBQWMsQ0FDWixjQURZO0FBWmIsT0FwREksQ0FBUDtBQW9FRDtBQXZFaUYsR0FBcEUsQ0FBaEI7O0FBMEVBLG9CQUFRQyxRQUFSLENBQWlCLGdCQUFZQyxjQUE3QixFQUE2QyxnQkFBV0MsS0FBeEQsRUFBK0RULE9BQS9EO29CQUNlQSxPIiwiZmlsZSI6IlNEYXRhLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IEJhc2UgZnJvbSAnLi9CYXNlJztcclxuaW1wb3J0IF9TRGF0YU1vZGVsQmFzZSBmcm9tICdhcmdvcy9Nb2RlbHMvX1NEYXRhTW9kZWxCYXNlJztcclxuaW1wb3J0IE1hbmFnZXIgZnJvbSAnYXJnb3MvTW9kZWxzL01hbmFnZXInO1xyXG5pbXBvcnQgTU9ERUxfVFlQRSBmcm9tICdhcmdvcy9Nb2RlbHMvVHlwZXMnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vTmFtZXMnO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5Nb2RlbHMuVGlja2V0QWN0aXZpdHkuU0RhdGEnLCBbQmFzZSwgX1NEYXRhTW9kZWxCYXNlXSwge1xyXG4gIGlkOiAndGlja2V0X2FjdGl2aXR5X3NkYXRhX21vZGVsJyxcclxuICBjcmVhdGVRdWVyeU1vZGVsczogZnVuY3Rpb24gY3JlYXRlUXVlcnlNb2RlbHMoKSB7XHJcbiAgICByZXR1cm4gW3tcclxuICAgICAgbmFtZTogJ2xpc3QnLFxyXG4gICAgICBxdWVyeU9yZGVyQnk6ICdBc3NpZ25lZERhdGUgYXNjJyxcclxuICAgICAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICAgICAnQWN0aXZpdHlEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ0FjdGl2aXR5VHlwZUNvZGUnLFxyXG4gICAgICAgICdBc3NpZ25lZERhdGUnLFxyXG4gICAgICAgICdDb21wbGV0ZWREYXRlJyxcclxuICAgICAgICAnRWxhcHNlZFVuaXRzJyxcclxuICAgICAgICAnRm9sbG93VXAnLFxyXG4gICAgICAgICdQdWJsaWNBY2Nlc3NDb2RlJyxcclxuICAgICAgICAnUmF0ZScsXHJcbiAgICAgICAgJ1JhdGVUeXBlRGVzY3JpcHRpb24vQW1vdW50JyxcclxuICAgICAgICAnUmF0ZVR5cGVEZXNjcmlwdGlvbi9SYXRlVHlwZUNvZGUnLFxyXG4gICAgICAgICdSYXRlVHlwZURlc2NyaXB0aW9uL1R5cGVEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ1RvdGFsRmVlJyxcclxuICAgICAgICAnVG90YWxMYWJvcicsXHJcbiAgICAgICAgJ1RvdGFsUGFydHMnLFxyXG4gICAgICAgICdVbml0cycsXHJcbiAgICAgICAgJ1RpY2tldC9BY2NvdW50L0FjY291bnROYW1lJyxcclxuICAgICAgICAnVGlja2V0L1RpY2tldE51bWJlcicsXHJcbiAgICAgICAgJ1RpY2tldC9Db250YWN0L05hbWUnLFxyXG4gICAgICAgICdVc2VyL1VzZXJJbmZvL0xhc3ROYW1lJyxcclxuICAgICAgICAnVXNlci9Vc2VySW5mby9GaXJzdE5hbWUnLFxyXG4gICAgICBdLFxyXG4gICAgICBxdWVyeUluY2x1ZGU6IFtcclxuICAgICAgICAnJHBlcm1pc3Npb25zJyxcclxuICAgICAgXSxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ2RldGFpbCcsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAgICAgJ0FjdGl2aXR5RGVzY3JpcHRpb24nLFxyXG4gICAgICAgICdBY3Rpdml0eVR5cGVDb2RlJyxcclxuICAgICAgICAnQXNzaWduZWREYXRlJyxcclxuICAgICAgICAnQ29tcGxldGVkRGF0ZScsXHJcbiAgICAgICAgJ0VsYXBzZWRVbml0cycsXHJcbiAgICAgICAgJ0ZvbGxvd1VwJyxcclxuICAgICAgICAnUHVibGljQWNjZXNzQ29kZScsXHJcbiAgICAgICAgJ1JhdGUnLFxyXG4gICAgICAgICdSYXRlVHlwZURlc2NyaXB0aW9uL0Ftb3VudCcsXHJcbiAgICAgICAgJ1JhdGVUeXBlRGVzY3JpcHRpb24vUmF0ZVR5cGVDb2RlJyxcclxuICAgICAgICAnUmF0ZVR5cGVEZXNjcmlwdGlvbi9UeXBlRGVzY3JpcHRpb24nLFxyXG4gICAgICAgICdUb3RhbEZlZScsXHJcbiAgICAgICAgJ1RvdGFsTGFib3InLFxyXG4gICAgICAgICdUb3RhbFBhcnRzJyxcclxuICAgICAgICAnVW5pdHMnLFxyXG4gICAgICAgICdUaWNrZXQvQWNjb3VudC9BY2NvdW50TmFtZScsXHJcbiAgICAgICAgJ1RpY2tldC9UaWNrZXROdW1iZXInLFxyXG4gICAgICAgICdUaWNrZXQvQ29udGFjdC9OYW1lJyxcclxuICAgICAgICAnVXNlci9Vc2VySW5mby9MYXN0TmFtZScsXHJcbiAgICAgICAgJ1VzZXIvVXNlckluZm8vRmlyc3ROYW1lJyxcclxuICAgICAgXSxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ2VkaXQnLFxyXG4gICAgICBxdWVyeVNlbGVjdDogW1xyXG4gICAgICAgICdBY3Rpdml0eURlc2NyaXB0aW9uJyxcclxuICAgICAgICAnQWN0aXZpdHlUeXBlQ29kZScsXHJcbiAgICAgICAgJ0Fzc2lnbmVkRGF0ZScsXHJcbiAgICAgICAgJ0NvbXBsZXRlZERhdGUnLFxyXG4gICAgICAgICdQdWJsaWNBY2Nlc3NDb2RlJyxcclxuICAgICAgICAnVXNlci9Vc2VyTmFtZScsXHJcbiAgICAgICAgJ1VzZXIvVXNlckluZm8vRmlyc3ROYW1lJyxcclxuICAgICAgICAnVXNlci9Vc2VySW5mby9MYXN0TmFtZScsXHJcbiAgICAgIF0sXHJcbiAgICAgIHF1ZXJ5SW5jbHVkZTogW1xyXG4gICAgICAgICckcGVybWlzc2lvbnMnLFxyXG4gICAgICBdLFxyXG4gICAgfV07XHJcbiAgfSxcclxufSk7XHJcblxyXG5NYW5hZ2VyLnJlZ2lzdGVyKE1PREVMX05BTUVTLlRJQ0tFVEFDVElWSVRZLCBNT0RFTF9UWVBFLlNEQVRBLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19