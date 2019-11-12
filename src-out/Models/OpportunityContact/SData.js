define('crm/Models/OpportunityContact/SData', ['module', 'exports', 'dojo/_base/declare', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names'], function (module, exports, _declare, _Base, _SDataModelBase2, _Manager, _Types, _Names) {
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

  var __class = (0, _declare2.default)('crm.Models.OpportunityContact.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'opportunity_contact_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'Contact.NameLF',
        querySelect: ['Contact/Account/AccountName', 'Contact/AccountName', 'SalesRole', 'IsPrimary', 'Contact/NameLF', 'Contact/Title']
      }, {
        name: 'detail',
        querySelect: ['Opportunity/Description', 'Contact/Account/AccountName', 'Contact/AccountName', 'SalesRole', 'Contact/NameLF', 'Contact/Title', 'IsPrimary', 'Competitors/CompetitorName', 'Issues', 'PersonalBenefits', 'Standing', 'Strategy']
      }];
    }
  });

  _Manager2.default.register(_Names2.default.OPPORTUNITYCONTACT, _Types2.default.SDATA, __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbHMvT3Bwb3J0dW5pdHlDb250YWN0L1NEYXRhLmpzIl0sIm5hbWVzIjpbIl9fY2xhc3MiLCJpZCIsImNyZWF0ZVF1ZXJ5TW9kZWxzIiwibmFtZSIsInF1ZXJ5T3JkZXJCeSIsInF1ZXJ5U2VsZWN0IiwicmVnaXN0ZXIiLCJPUFBPUlRVTklUWUNPTlRBQ1QiLCJTREFUQSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE1BQU1BLFVBQVUsdUJBQVEscUNBQVIsRUFBK0MsMENBQS9DLEVBQXdFO0FBQ3RGQyxRQUFJLGlDQURrRjtBQUV0RkMsdUJBQW1CLFNBQVNBLGlCQUFULEdBQTZCO0FBQzlDLGFBQU8sQ0FBQztBQUNOQyxjQUFNLE1BREE7QUFFTkMsc0JBQWMsZ0JBRlI7QUFHTkMscUJBQWEsQ0FDWCw2QkFEVyxFQUVYLHFCQUZXLEVBR1gsV0FIVyxFQUlYLFdBSlcsRUFLWCxnQkFMVyxFQU1YLGVBTlc7QUFIUCxPQUFELEVBV0o7QUFDREYsY0FBTSxRQURMO0FBRURFLHFCQUFhLENBQ1gseUJBRFcsRUFFWCw2QkFGVyxFQUdYLHFCQUhXLEVBSVgsV0FKVyxFQUtYLGdCQUxXLEVBTVgsZUFOVyxFQU9YLFdBUFcsRUFRWCw0QkFSVyxFQVNYLFFBVFcsRUFVWCxrQkFWVyxFQVdYLFVBWFcsRUFZWCxVQVpXO0FBRlosT0FYSSxDQUFQO0FBNEJEO0FBL0JxRixHQUF4RSxDQUFoQjs7QUFrQ0Esb0JBQVFDLFFBQVIsQ0FBaUIsZ0JBQVlDLGtCQUE3QixFQUFpRCxnQkFBV0MsS0FBNUQsRUFBbUVSLE9BQW5FO29CQUNlQSxPIiwiZmlsZSI6IlNEYXRhLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IEJhc2UgZnJvbSAnLi9CYXNlJztcclxuaW1wb3J0IF9TRGF0YU1vZGVsQmFzZSBmcm9tICdhcmdvcy9Nb2RlbHMvX1NEYXRhTW9kZWxCYXNlJztcclxuaW1wb3J0IE1hbmFnZXIgZnJvbSAnYXJnb3MvTW9kZWxzL01hbmFnZXInO1xyXG5pbXBvcnQgTU9ERUxfVFlQRSBmcm9tICdhcmdvcy9Nb2RlbHMvVHlwZXMnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vTmFtZXMnO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5Nb2RlbHMuT3Bwb3J0dW5pdHlDb250YWN0LlNEYXRhJywgW0Jhc2UsIF9TRGF0YU1vZGVsQmFzZV0sIHtcclxuICBpZDogJ29wcG9ydHVuaXR5X2NvbnRhY3Rfc2RhdGFfbW9kZWwnLFxyXG4gIGNyZWF0ZVF1ZXJ5TW9kZWxzOiBmdW5jdGlvbiBjcmVhdGVRdWVyeU1vZGVscygpIHtcclxuICAgIHJldHVybiBbe1xyXG4gICAgICBuYW1lOiAnbGlzdCcsXHJcbiAgICAgIHF1ZXJ5T3JkZXJCeTogJ0NvbnRhY3QuTmFtZUxGJyxcclxuICAgICAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICAgICAnQ29udGFjdC9BY2NvdW50L0FjY291bnROYW1lJyxcclxuICAgICAgICAnQ29udGFjdC9BY2NvdW50TmFtZScsXHJcbiAgICAgICAgJ1NhbGVzUm9sZScsXHJcbiAgICAgICAgJ0lzUHJpbWFyeScsXHJcbiAgICAgICAgJ0NvbnRhY3QvTmFtZUxGJyxcclxuICAgICAgICAnQ29udGFjdC9UaXRsZScsXHJcbiAgICAgIF0sXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdkZXRhaWwnLFxyXG4gICAgICBxdWVyeVNlbGVjdDogW1xyXG4gICAgICAgICdPcHBvcnR1bml0eS9EZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ0NvbnRhY3QvQWNjb3VudC9BY2NvdW50TmFtZScsXHJcbiAgICAgICAgJ0NvbnRhY3QvQWNjb3VudE5hbWUnLFxyXG4gICAgICAgICdTYWxlc1JvbGUnLFxyXG4gICAgICAgICdDb250YWN0L05hbWVMRicsXHJcbiAgICAgICAgJ0NvbnRhY3QvVGl0bGUnLFxyXG4gICAgICAgICdJc1ByaW1hcnknLFxyXG4gICAgICAgICdDb21wZXRpdG9ycy9Db21wZXRpdG9yTmFtZScsXHJcbiAgICAgICAgJ0lzc3VlcycsXHJcbiAgICAgICAgJ1BlcnNvbmFsQmVuZWZpdHMnLFxyXG4gICAgICAgICdTdGFuZGluZycsXHJcbiAgICAgICAgJ1N0cmF0ZWd5JyxcclxuICAgICAgXSxcclxuICAgIH1dO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuTWFuYWdlci5yZWdpc3RlcihNT0RFTF9OQU1FUy5PUFBPUlRVTklUWUNPTlRBQ1QsIE1PREVMX1RZUEUuU0RBVEEsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=