define('crm/Integrations/BOE/Models/ErpReceivable/SData', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names'], function (module, exports, _declare, _lang, _Base, _SDataModelBase2, _Manager, _Types, _Names) {
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.ErpReceivable.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'erpreceivable_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'ErpDocumentDate desc, CreateDate desc',
        querySelect: ['ErpExtId', 'Account/AccountName', 'ErpInvoice/InvoiceNumber', 'ReceivableAmount', 'ReceivedAmount', 'ReceivableBaseAmount', 'ReceivedBaseAmount', 'ErpStatus', 'ErpStatusDate', 'CreateDate', 'CurrencyCode', 'BaseCurrencyCode', 'ErpDocumentDate']
      }, {
        name: 'detail',
        querySelect: ['ErpExtId', 'Account/AccountName', 'ErpInvoiceNumber', 'ReceivableAmount', 'ReceivedAmount', 'ReceivableBaseAmount', 'ReceivedBaseAmount', 'ErpStatus', 'ErpStatusDate', 'ErpPaymentTermId', 'ErpBillTo/Name', 'ErpBillTo/Address/*', 'ErpShipTo/Name', 'ErpShipTo/Address/*', 'ErpPayFrom/Address/*', 'ErpInvoice/*', 'CreateDate', 'CurrencyCode', 'ErpDocumentDate', 'BaseCurrencyCode'],
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

  _Manager2.default.register(_Names2.default.ERPRECEIVABLE, _Types2.default.SDATA, __class);
  _lang2.default.setObject('icboe.Models.ErpReceivable.SData', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9FcnBSZWNlaXZhYmxlL1NEYXRhLmpzIl0sIm5hbWVzIjpbIl9fY2xhc3MiLCJpZCIsImNyZWF0ZVF1ZXJ5TW9kZWxzIiwibmFtZSIsInF1ZXJ5T3JkZXJCeSIsInF1ZXJ5U2VsZWN0IiwicXVlcnlJbmNsdWRlIiwicmVnaXN0ZXIiLCJFUlBSRUNFSVZBQkxFIiwiU0RBVEEiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsTUFBTUEsVUFBVSx1QkFBUSxpREFBUixFQUEyRCwwQ0FBM0QsRUFBb0Y7QUFDbEdDLFFBQUksMkJBRDhGO0FBRWxHQyx1QkFBbUIsU0FBU0EsaUJBQVQsR0FBNkI7QUFDOUMsYUFBTyxDQUFDO0FBQ05DLGNBQU0sTUFEQTtBQUVOQyxzQkFBYyx1Q0FGUjtBQUdOQyxxQkFBYSxDQUNYLFVBRFcsRUFFWCxxQkFGVyxFQUdYLDBCQUhXLEVBSVgsa0JBSlcsRUFLWCxnQkFMVyxFQU1YLHNCQU5XLEVBT1gsb0JBUFcsRUFRWCxXQVJXLEVBU1gsZUFUVyxFQVVYLFlBVlcsRUFXWCxjQVhXLEVBWVgsa0JBWlcsRUFhWCxpQkFiVztBQUhQLE9BQUQsRUFrQko7QUFDREYsY0FBTSxRQURMO0FBRURFLHFCQUFhLENBQ1gsVUFEVyxFQUVYLHFCQUZXLEVBR1gsa0JBSFcsRUFJWCxrQkFKVyxFQUtYLGdCQUxXLEVBTVgsc0JBTlcsRUFPWCxvQkFQVyxFQVFYLFdBUlcsRUFTWCxlQVRXLEVBVVgsa0JBVlcsRUFXWCxnQkFYVyxFQVlYLHFCQVpXLEVBYVgsZ0JBYlcsRUFjWCxxQkFkVyxFQWVYLHNCQWZXLEVBZ0JYLGNBaEJXLEVBaUJYLFlBakJXLEVBa0JYLGNBbEJXLEVBbUJYLGlCQW5CVyxFQW9CWCxrQkFwQlcsQ0FGWjtBQXdCREMsc0JBQWMsQ0FDWixjQURZO0FBeEJiLE9BbEJJLENBQVA7QUErQ0Q7QUFsRGlHLEdBQXBGLENBQWhCLEMsQ0F2QkE7Ozs7Ozs7Ozs7Ozs7OztBQTRFQSxvQkFBUUMsUUFBUixDQUFpQixnQkFBWUMsYUFBN0IsRUFBNEMsZ0JBQVlDLEtBQXhELEVBQStEVCxPQUEvRDtBQUNBLGlCQUFLVSxTQUFMLENBQWUsa0NBQWYsRUFBbURWLE9BQW5EO29CQUNlQSxPIiwiZmlsZSI6IlNEYXRhLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IEJhc2UgZnJvbSAnLi9CYXNlJztcclxuaW1wb3J0IF9TRGF0YU1vZGVsQmFzZSBmcm9tICdhcmdvcy9Nb2RlbHMvX1NEYXRhTW9kZWxCYXNlJztcclxuaW1wb3J0IE1hbmFnZXIgZnJvbSAnYXJnb3MvTW9kZWxzL01hbmFnZXInO1xyXG5pbXBvcnQgTU9ERUxfVFlQRVMgZnJvbSAnYXJnb3MvTW9kZWxzL1R5cGVzJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uL05hbWVzJztcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5Nb2RlbHMuRXJwUmVjZWl2YWJsZS5TRGF0YScsIFtCYXNlLCBfU0RhdGFNb2RlbEJhc2VdLCB7XHJcbiAgaWQ6ICdlcnByZWNlaXZhYmxlX3NkYXRhX21vZGVsJyxcclxuICBjcmVhdGVRdWVyeU1vZGVsczogZnVuY3Rpb24gY3JlYXRlUXVlcnlNb2RlbHMoKSB7XHJcbiAgICByZXR1cm4gW3tcclxuICAgICAgbmFtZTogJ2xpc3QnLFxyXG4gICAgICBxdWVyeU9yZGVyQnk6ICdFcnBEb2N1bWVudERhdGUgZGVzYywgQ3JlYXRlRGF0ZSBkZXNjJyxcclxuICAgICAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICAgICAnRXJwRXh0SWQnLFxyXG4gICAgICAgICdBY2NvdW50L0FjY291bnROYW1lJyxcclxuICAgICAgICAnRXJwSW52b2ljZS9JbnZvaWNlTnVtYmVyJyxcclxuICAgICAgICAnUmVjZWl2YWJsZUFtb3VudCcsXHJcbiAgICAgICAgJ1JlY2VpdmVkQW1vdW50JyxcclxuICAgICAgICAnUmVjZWl2YWJsZUJhc2VBbW91bnQnLFxyXG4gICAgICAgICdSZWNlaXZlZEJhc2VBbW91bnQnLFxyXG4gICAgICAgICdFcnBTdGF0dXMnLFxyXG4gICAgICAgICdFcnBTdGF0dXNEYXRlJyxcclxuICAgICAgICAnQ3JlYXRlRGF0ZScsXHJcbiAgICAgICAgJ0N1cnJlbmN5Q29kZScsXHJcbiAgICAgICAgJ0Jhc2VDdXJyZW5jeUNvZGUnLFxyXG4gICAgICAgICdFcnBEb2N1bWVudERhdGUnLFxyXG4gICAgICBdLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnZGV0YWlsJyxcclxuICAgICAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICAgICAnRXJwRXh0SWQnLFxyXG4gICAgICAgICdBY2NvdW50L0FjY291bnROYW1lJyxcclxuICAgICAgICAnRXJwSW52b2ljZU51bWJlcicsXHJcbiAgICAgICAgJ1JlY2VpdmFibGVBbW91bnQnLFxyXG4gICAgICAgICdSZWNlaXZlZEFtb3VudCcsXHJcbiAgICAgICAgJ1JlY2VpdmFibGVCYXNlQW1vdW50JyxcclxuICAgICAgICAnUmVjZWl2ZWRCYXNlQW1vdW50JyxcclxuICAgICAgICAnRXJwU3RhdHVzJyxcclxuICAgICAgICAnRXJwU3RhdHVzRGF0ZScsXHJcbiAgICAgICAgJ0VycFBheW1lbnRUZXJtSWQnLFxyXG4gICAgICAgICdFcnBCaWxsVG8vTmFtZScsXHJcbiAgICAgICAgJ0VycEJpbGxUby9BZGRyZXNzLyonLFxyXG4gICAgICAgICdFcnBTaGlwVG8vTmFtZScsXHJcbiAgICAgICAgJ0VycFNoaXBUby9BZGRyZXNzLyonLFxyXG4gICAgICAgICdFcnBQYXlGcm9tL0FkZHJlc3MvKicsXHJcbiAgICAgICAgJ0VycEludm9pY2UvKicsXHJcbiAgICAgICAgJ0NyZWF0ZURhdGUnLFxyXG4gICAgICAgICdDdXJyZW5jeUNvZGUnLFxyXG4gICAgICAgICdFcnBEb2N1bWVudERhdGUnLFxyXG4gICAgICAgICdCYXNlQ3VycmVuY3lDb2RlJyxcclxuICAgICAgXSxcclxuICAgICAgcXVlcnlJbmNsdWRlOiBbXHJcbiAgICAgICAgJyRwZXJtaXNzaW9ucycsXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAgXTtcclxuICB9LFxyXG59KTtcclxuXHJcbk1hbmFnZXIucmVnaXN0ZXIoTU9ERUxfTkFNRVMuRVJQUkVDRUlWQUJMRSwgTU9ERUxfVFlQRVMuU0RBVEEsIF9fY2xhc3MpO1xyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuTW9kZWxzLkVycFJlY2VpdmFibGUuU0RhdGEnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19