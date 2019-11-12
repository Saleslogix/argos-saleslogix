define('crm/Integrations/BOE/Models/ErpShipTo/SData', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names'], function (module, exports, _declare, _lang, _Base, _SDataModelBase2, _Manager, _Types, _Names) {
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.ErpShipTo.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'erpshipto_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'CreateDate desc',
        querySelect: ['Name', 'Address/*', 'CreateDate', 'ErpShipToAccounts/*']
      }, {
        name: 'detail',
        querySelect: ['Name', 'Fax', 'MainPhone', 'Email', 'Address/*', 'ErpStatus', 'SyncStatus', 'ErpExtId', 'ErpLogicalId', 'ErpAccountingEntityId', 'Owner/OwnerDescription', 'ErpCustomerType', 'PaymentTermId', 'ErpPaymentMethod'],
        queryInclude: ['$permissions']
      }, {
        name: 'edit',
        querySelect: ['Name', 'Fax', 'MainPhone', 'Email', 'Address/*', 'ErpStatus', 'SyncStatus', 'ErpLogicalId', 'ErpAccountingEntityId', 'Owner/OwnerDescription', 'ErpCustomerType', 'PaymentTermId', 'ErpPaymentMethod'],
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

  _Manager2.default.register(_Names2.default.ERPSHIPTO, _Types2.default.SDATA, __class);
  _lang2.default.setObject('icboe.Models.ErpShipTo.SData', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9FcnBTaGlwVG8vU0RhdGEuanMiXSwibmFtZXMiOlsiX19jbGFzcyIsImlkIiwiY3JlYXRlUXVlcnlNb2RlbHMiLCJuYW1lIiwicXVlcnlPcmRlckJ5IiwicXVlcnlTZWxlY3QiLCJxdWVyeUluY2x1ZGUiLCJyZWdpc3RlciIsIkVSUFNISVBUTyIsIlNEQVRBIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE1BQU1BLFVBQVUsdUJBQVEsNkNBQVIsRUFBdUQsMENBQXZELEVBQWdGO0FBQzlGQyxRQUFJLHVCQUQwRjtBQUU5RkMsdUJBQW1CLFNBQVNBLGlCQUFULEdBQTZCO0FBQzlDLGFBQU8sQ0FBQztBQUNOQyxjQUFNLE1BREE7QUFFTkMsc0JBQWMsaUJBRlI7QUFHTkMscUJBQWEsQ0FDWCxNQURXLEVBRVgsV0FGVyxFQUdYLFlBSFcsRUFJWCxxQkFKVztBQUhQLE9BQUQsRUFTSjtBQUNERixjQUFNLFFBREw7QUFFREUscUJBQWEsQ0FDWCxNQURXLEVBRVgsS0FGVyxFQUdYLFdBSFcsRUFJWCxPQUpXLEVBS1gsV0FMVyxFQU1YLFdBTlcsRUFPWCxZQVBXLEVBUVgsVUFSVyxFQVNYLGNBVFcsRUFVWCx1QkFWVyxFQVdYLHdCQVhXLEVBWVgsaUJBWlcsRUFhWCxlQWJXLEVBY1gsa0JBZFcsQ0FGWjtBQWtCREMsc0JBQWMsQ0FDWixjQURZO0FBbEJiLE9BVEksRUE4Qko7QUFDREgsY0FBTSxNQURMO0FBRURFLHFCQUFhLENBQ1gsTUFEVyxFQUVYLEtBRlcsRUFHWCxXQUhXLEVBSVgsT0FKVyxFQUtYLFdBTFcsRUFNWCxXQU5XLEVBT1gsWUFQVyxFQVFYLGNBUlcsRUFTWCx1QkFUVyxFQVVYLHdCQVZXLEVBV1gsaUJBWFcsRUFZWCxlQVpXLEVBYVgsa0JBYlcsQ0FGWjtBQWlCREMsc0JBQWMsQ0FDWixjQURZO0FBakJiLE9BOUJJLENBQVA7QUFvREQ7QUF2RDZGLEdBQWhGLENBQWhCLEMsQ0F2QkE7Ozs7Ozs7Ozs7Ozs7OztBQWlGQSxvQkFBUUMsUUFBUixDQUFpQixnQkFBWUMsU0FBN0IsRUFBd0MsZ0JBQVlDLEtBQXBELEVBQTJEVCxPQUEzRDtBQUNBLGlCQUFLVSxTQUFMLENBQWUsOEJBQWYsRUFBK0NWLE9BQS9DO29CQUNlQSxPIiwiZmlsZSI6IlNEYXRhLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IEJhc2UgZnJvbSAnLi9CYXNlJztcclxuaW1wb3J0IF9TRGF0YU1vZGVsQmFzZSBmcm9tICdhcmdvcy9Nb2RlbHMvX1NEYXRhTW9kZWxCYXNlJztcclxuaW1wb3J0IE1hbmFnZXIgZnJvbSAnYXJnb3MvTW9kZWxzL01hbmFnZXInO1xyXG5pbXBvcnQgTU9ERUxfVFlQRVMgZnJvbSAnYXJnb3MvTW9kZWxzL1R5cGVzJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uL05hbWVzJztcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5Nb2RlbHMuRXJwU2hpcFRvLlNEYXRhJywgW0Jhc2UsIF9TRGF0YU1vZGVsQmFzZV0sIHtcclxuICBpZDogJ2VycHNoaXB0b19zZGF0YV9tb2RlbCcsXHJcbiAgY3JlYXRlUXVlcnlNb2RlbHM6IGZ1bmN0aW9uIGNyZWF0ZVF1ZXJ5TW9kZWxzKCkge1xyXG4gICAgcmV0dXJuIFt7XHJcbiAgICAgIG5hbWU6ICdsaXN0JyxcclxuICAgICAgcXVlcnlPcmRlckJ5OiAnQ3JlYXRlRGF0ZSBkZXNjJyxcclxuICAgICAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICAgICAnTmFtZScsXHJcbiAgICAgICAgJ0FkZHJlc3MvKicsXHJcbiAgICAgICAgJ0NyZWF0ZURhdGUnLFxyXG4gICAgICAgICdFcnBTaGlwVG9BY2NvdW50cy8qJyxcclxuICAgICAgXSxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ2RldGFpbCcsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAgICAgJ05hbWUnLFxyXG4gICAgICAgICdGYXgnLFxyXG4gICAgICAgICdNYWluUGhvbmUnLFxyXG4gICAgICAgICdFbWFpbCcsXHJcbiAgICAgICAgJ0FkZHJlc3MvKicsXHJcbiAgICAgICAgJ0VycFN0YXR1cycsXHJcbiAgICAgICAgJ1N5bmNTdGF0dXMnLFxyXG4gICAgICAgICdFcnBFeHRJZCcsXHJcbiAgICAgICAgJ0VycExvZ2ljYWxJZCcsXHJcbiAgICAgICAgJ0VycEFjY291bnRpbmdFbnRpdHlJZCcsXHJcbiAgICAgICAgJ093bmVyL093bmVyRGVzY3JpcHRpb24nLFxyXG4gICAgICAgICdFcnBDdXN0b21lclR5cGUnLFxyXG4gICAgICAgICdQYXltZW50VGVybUlkJyxcclxuICAgICAgICAnRXJwUGF5bWVudE1ldGhvZCcsXHJcbiAgICAgIF0sXHJcbiAgICAgIHF1ZXJ5SW5jbHVkZTogW1xyXG4gICAgICAgICckcGVybWlzc2lvbnMnLFxyXG4gICAgICBdLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnZWRpdCcsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAgICAgJ05hbWUnLFxyXG4gICAgICAgICdGYXgnLFxyXG4gICAgICAgICdNYWluUGhvbmUnLFxyXG4gICAgICAgICdFbWFpbCcsXHJcbiAgICAgICAgJ0FkZHJlc3MvKicsXHJcbiAgICAgICAgJ0VycFN0YXR1cycsXHJcbiAgICAgICAgJ1N5bmNTdGF0dXMnLFxyXG4gICAgICAgICdFcnBMb2dpY2FsSWQnLFxyXG4gICAgICAgICdFcnBBY2NvdW50aW5nRW50aXR5SWQnLFxyXG4gICAgICAgICdPd25lci9Pd25lckRlc2NyaXB0aW9uJyxcclxuICAgICAgICAnRXJwQ3VzdG9tZXJUeXBlJyxcclxuICAgICAgICAnUGF5bWVudFRlcm1JZCcsXHJcbiAgICAgICAgJ0VycFBheW1lbnRNZXRob2QnLFxyXG4gICAgICBdLFxyXG4gICAgICBxdWVyeUluY2x1ZGU6IFtcclxuICAgICAgICAnJHBlcm1pc3Npb25zJyxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgICBdO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuTWFuYWdlci5yZWdpc3RlcihNT0RFTF9OQU1FUy5FUlBTSElQVE8sIE1PREVMX1RZUEVTLlNEQVRBLCBfX2NsYXNzKTtcclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLk1vZGVscy5FcnBTaGlwVG8uU0RhdGEnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19