define('crm/Integrations/BOE/Models/ErpContactAssociation/SData', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names'], function (module, exports, _declare, _lang, _Base, _SDataModelBase2, _Manager, _Types, _Names) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.ErpContactAssociation.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'erpcontactassociation_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'CreateDate desc',
        querySelect: ['Contact/NameLF', 'Account/AccountName', 'CreateDate']
      }, {
        name: 'detail',
        querySelect: ['Contact/NameLF', 'Account/AccountName', 'CreateDate'],
        queryInclude: ['$permissions']
      }];
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

  _Manager2.default.register(_Names2.default.ERPCONTACTASSOCIATION, _Types2.default.SDATA, __class);
  _lang2.default.setObject('icboe.Models.ErpContactAssociation.SData', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9FcnBDb250YWN0QXNzb2NpYXRpb24vU0RhdGEuanMiXSwibmFtZXMiOlsiX19jbGFzcyIsImlkIiwiY3JlYXRlUXVlcnlNb2RlbHMiLCJuYW1lIiwicXVlcnlPcmRlckJ5IiwicXVlcnlTZWxlY3QiLCJxdWVyeUluY2x1ZGUiLCJyZWdpc3RlciIsIkVSUENPTlRBQ1RBU1NPQ0lBVElPTiIsIlNEQVRBIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE1BQU1BLFVBQVUsdUJBQVEseURBQVIsRUFBbUUsMENBQW5FLEVBQTRGO0FBQzFHQyxRQUFJLG1DQURzRztBQUUxR0MsdUJBQW1CLFNBQVNBLGlCQUFULEdBQTZCO0FBQzlDLGFBQU8sQ0FBQztBQUNOQyxjQUFNLE1BREE7QUFFTkMsc0JBQWMsaUJBRlI7QUFHTkMscUJBQWEsQ0FDWCxnQkFEVyxFQUVYLHFCQUZXLEVBR1gsWUFIVztBQUhQLE9BQUQsRUFRSjtBQUNERixjQUFNLFFBREw7QUFFREUscUJBQWEsQ0FDWCxnQkFEVyxFQUVYLHFCQUZXLEVBR1gsWUFIVyxDQUZaO0FBT0RDLHNCQUFjLENBQ1osY0FEWTtBQVBiLE9BUkksQ0FBUDtBQW9CRDtBQXZCeUcsR0FBNUYsQ0FBaEIsQyxDQXZCQTs7Ozs7Ozs7Ozs7Ozs7O0FBaURBLG9CQUFRQyxRQUFSLENBQWlCLGdCQUFZQyxxQkFBN0IsRUFBb0QsZ0JBQVlDLEtBQWhFLEVBQXVFVCxPQUF2RTtBQUNBLGlCQUFLVSxTQUFMLENBQWUsMENBQWYsRUFBMkRWLE9BQTNEO29CQUNlQSxPIiwiZmlsZSI6IlNEYXRhLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IEJhc2UgZnJvbSAnLi9CYXNlJztcclxuaW1wb3J0IF9TRGF0YU1vZGVsQmFzZSBmcm9tICdhcmdvcy9Nb2RlbHMvX1NEYXRhTW9kZWxCYXNlJztcclxuaW1wb3J0IE1hbmFnZXIgZnJvbSAnYXJnb3MvTW9kZWxzL01hbmFnZXInO1xyXG5pbXBvcnQgTU9ERUxfVFlQRVMgZnJvbSAnYXJnb3MvTW9kZWxzL1R5cGVzJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uL05hbWVzJztcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5Nb2RlbHMuRXJwQ29udGFjdEFzc29jaWF0aW9uLlNEYXRhJywgW0Jhc2UsIF9TRGF0YU1vZGVsQmFzZV0sIHtcclxuICBpZDogJ2VycGNvbnRhY3Rhc3NvY2lhdGlvbl9zZGF0YV9tb2RlbCcsXHJcbiAgY3JlYXRlUXVlcnlNb2RlbHM6IGZ1bmN0aW9uIGNyZWF0ZVF1ZXJ5TW9kZWxzKCkge1xyXG4gICAgcmV0dXJuIFt7XHJcbiAgICAgIG5hbWU6ICdsaXN0JyxcclxuICAgICAgcXVlcnlPcmRlckJ5OiAnQ3JlYXRlRGF0ZSBkZXNjJyxcclxuICAgICAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICAgICAnQ29udGFjdC9OYW1lTEYnLFxyXG4gICAgICAgICdBY2NvdW50L0FjY291bnROYW1lJyxcclxuICAgICAgICAnQ3JlYXRlRGF0ZScsXHJcbiAgICAgIF0sXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdkZXRhaWwnLFxyXG4gICAgICBxdWVyeVNlbGVjdDogW1xyXG4gICAgICAgICdDb250YWN0L05hbWVMRicsXHJcbiAgICAgICAgJ0FjY291bnQvQWNjb3VudE5hbWUnLFxyXG4gICAgICAgICdDcmVhdGVEYXRlJyxcclxuICAgICAgXSxcclxuICAgICAgcXVlcnlJbmNsdWRlOiBbXHJcbiAgICAgICAgJyRwZXJtaXNzaW9ucycsXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAgXTtcclxuICB9LFxyXG59KTtcclxuXHJcbk1hbmFnZXIucmVnaXN0ZXIoTU9ERUxfTkFNRVMuRVJQQ09OVEFDVEFTU09DSUFUSU9OLCBNT0RFTF9UWVBFUy5TREFUQSwgX19jbGFzcyk7XHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5Nb2RlbHMuRXJwQ29udGFjdEFzc29jaWF0aW9uLlNEYXRhJywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==