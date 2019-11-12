define('crm/Integrations/BOE/Models/ErpShipmentItem/SData', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names'], function (module, exports, _declare, _lang, _Base, _SDataModelBase2, _Manager, _Types, _Names) {
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.ErpShipmentItem.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'erpshipmentitem_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'CreateDate desc',
        querySelect: ['ErpLineNumber', 'ErpShipment/ErpExtId', 'ProductName', 'ErpShippedQuantity', 'ErpShippedUOM', 'SalesOrder/SalesOrderNumber']
      }, {
        name: 'detail',
        querySelect: ['Description', 'ErpLineNumber', 'ErpShipment/ErpExtId', 'SalesOrder/SalesOrderNumber', 'ProductName', 'ErpShippedQuantity', 'ErpOrderQuantity', 'ErpBackOrderedQuantity', 'ErpBackOrderedUOM', 'ErpShippedUOM', 'ErpUPCId', 'ErpOrderUOM'],
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

  _Manager2.default.register(_Names2.default.ERPSHIPMENTITEM, _Types2.default.SDATA, __class);
  _lang2.default.setObject('icboe.Models.ErpShipmentItem.SData', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9FcnBTaGlwbWVudEl0ZW0vU0RhdGEuanMiXSwibmFtZXMiOlsiX19jbGFzcyIsImlkIiwiY3JlYXRlUXVlcnlNb2RlbHMiLCJuYW1lIiwicXVlcnlPcmRlckJ5IiwicXVlcnlTZWxlY3QiLCJxdWVyeUluY2x1ZGUiLCJyZWdpc3RlciIsIkVSUFNISVBNRU5USVRFTSIsIlNEQVRBIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE1BQU1BLFVBQVUsdUJBQVEsbURBQVIsRUFBNkQsMENBQTdELEVBQXNGO0FBQ3BHQyxRQUFJLDZCQURnRztBQUVwR0MsdUJBQW1CLFNBQVNBLGlCQUFULEdBQTZCO0FBQzlDLGFBQU8sQ0FBQztBQUNOQyxjQUFNLE1BREE7QUFFTkMsc0JBQWMsaUJBRlI7QUFHTkMscUJBQWEsQ0FDWCxlQURXLEVBRVgsc0JBRlcsRUFHWCxhQUhXLEVBSVgsb0JBSlcsRUFLWCxlQUxXLEVBTVgsNkJBTlc7QUFIUCxPQUFELEVBV0o7QUFDREYsY0FBTSxRQURMO0FBRURFLHFCQUFhLENBQ1gsYUFEVyxFQUVYLGVBRlcsRUFHWCxzQkFIVyxFQUlYLDZCQUpXLEVBS1gsYUFMVyxFQU1YLG9CQU5XLEVBT1gsa0JBUFcsRUFRWCx3QkFSVyxFQVNYLG1CQVRXLEVBVVgsZUFWVyxFQVdYLFVBWFcsRUFZWCxhQVpXLENBRlo7QUFnQkRDLHNCQUFjLENBQ1osY0FEWTtBQWhCYixPQVhJLENBQVA7QUFnQ0Q7QUFuQ21HLEdBQXRGLENBQWhCLEMsQ0F2QkE7Ozs7Ozs7Ozs7Ozs7OztBQTZEQSxvQkFBUUMsUUFBUixDQUFpQixnQkFBWUMsZUFBN0IsRUFBOEMsZ0JBQVlDLEtBQTFELEVBQWlFVCxPQUFqRTtBQUNBLGlCQUFLVSxTQUFMLENBQWUsb0NBQWYsRUFBcURWLE9BQXJEO29CQUNlQSxPIiwiZmlsZSI6IlNEYXRhLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IEJhc2UgZnJvbSAnLi9CYXNlJztcclxuaW1wb3J0IF9TRGF0YU1vZGVsQmFzZSBmcm9tICdhcmdvcy9Nb2RlbHMvX1NEYXRhTW9kZWxCYXNlJztcclxuaW1wb3J0IE1hbmFnZXIgZnJvbSAnYXJnb3MvTW9kZWxzL01hbmFnZXInO1xyXG5pbXBvcnQgTU9ERUxfVFlQRVMgZnJvbSAnYXJnb3MvTW9kZWxzL1R5cGVzJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uL05hbWVzJztcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5Nb2RlbHMuRXJwU2hpcG1lbnRJdGVtLlNEYXRhJywgW0Jhc2UsIF9TRGF0YU1vZGVsQmFzZV0sIHtcclxuICBpZDogJ2VycHNoaXBtZW50aXRlbV9zZGF0YV9tb2RlbCcsXHJcbiAgY3JlYXRlUXVlcnlNb2RlbHM6IGZ1bmN0aW9uIGNyZWF0ZVF1ZXJ5TW9kZWxzKCkge1xyXG4gICAgcmV0dXJuIFt7XHJcbiAgICAgIG5hbWU6ICdsaXN0JyxcclxuICAgICAgcXVlcnlPcmRlckJ5OiAnQ3JlYXRlRGF0ZSBkZXNjJyxcclxuICAgICAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICAgICAnRXJwTGluZU51bWJlcicsXHJcbiAgICAgICAgJ0VycFNoaXBtZW50L0VycEV4dElkJyxcclxuICAgICAgICAnUHJvZHVjdE5hbWUnLFxyXG4gICAgICAgICdFcnBTaGlwcGVkUXVhbnRpdHknLFxyXG4gICAgICAgICdFcnBTaGlwcGVkVU9NJyxcclxuICAgICAgICAnU2FsZXNPcmRlci9TYWxlc09yZGVyTnVtYmVyJyxcclxuICAgICAgXSxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ2RldGFpbCcsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAgICAgJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICAnRXJwTGluZU51bWJlcicsXHJcbiAgICAgICAgJ0VycFNoaXBtZW50L0VycEV4dElkJyxcclxuICAgICAgICAnU2FsZXNPcmRlci9TYWxlc09yZGVyTnVtYmVyJyxcclxuICAgICAgICAnUHJvZHVjdE5hbWUnLFxyXG4gICAgICAgICdFcnBTaGlwcGVkUXVhbnRpdHknLFxyXG4gICAgICAgICdFcnBPcmRlclF1YW50aXR5JyxcclxuICAgICAgICAnRXJwQmFja09yZGVyZWRRdWFudGl0eScsXHJcbiAgICAgICAgJ0VycEJhY2tPcmRlcmVkVU9NJyxcclxuICAgICAgICAnRXJwU2hpcHBlZFVPTScsXHJcbiAgICAgICAgJ0VycFVQQ0lkJyxcclxuICAgICAgICAnRXJwT3JkZXJVT00nLFxyXG4gICAgICBdLFxyXG4gICAgICBxdWVyeUluY2x1ZGU6IFtcclxuICAgICAgICAnJHBlcm1pc3Npb25zJyxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgICBdO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuTWFuYWdlci5yZWdpc3RlcihNT0RFTF9OQU1FUy5FUlBTSElQTUVOVElURU0sIE1PREVMX1RZUEVTLlNEQVRBLCBfX2NsYXNzKTtcclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLk1vZGVscy5FcnBTaGlwbWVudEl0ZW0uU0RhdGEnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19