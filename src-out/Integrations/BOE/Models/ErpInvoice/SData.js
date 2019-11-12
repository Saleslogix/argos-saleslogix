define('crm/Integrations/BOE/Models/ErpInvoice/SData', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names'], function (module, exports, _declare, _lang, _Base, _SDataModelBase2, _Manager, _Types, _Names) {
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.ErpInvoice.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'erpinvoice_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'ErpDocumentDate desc, CreateDate desc',
        querySelect: ['InvoiceNumber', 'Account/AccountName', 'ERPShipTo/BuyerContact/NameLF', 'ERPShipTo/BuyerContact/Email', 'ERPShipTo/BuyerContact/Mobile', 'ERPShipTo/BuyerContact/HomePhone', 'ERPShipTo/BuyerContact/FirstName', 'ERPShipTo/BuyerContact/LastName', 'ERPShipTo/BuyerContact/MiddleName', 'ErpStatusDate', 'ModifyDate', 'ErpStatus', 'ErpPaymentTermId', 'ErpTotalBaseAmount', 'GrandTotal', 'CurrencyCode', 'ErpExtendedBaseAmount', 'ErpExtendedAmount', 'BaseCurrencyCode', 'Owner/OwnerDescription', 'ErpDocumentDate']
      }, {
        name: 'detail',
        querySelect: ['InvoiceNumber', 'Account/AccountName', 'GrandTotal', 'ErpTotalBaseAmount', 'CurrencyCode', 'ErpExtendedBaseAmount', 'ErpExtendedAmount', 'BaseCurrencyCode', 'Description', 'ErpStatus', 'ErpStatusDate', 'ErpDocumentDate', 'ErpPaymentTermId', 'Owner/OwnerDescription', 'ErpBillTo/Name', 'ErpBillTo/MainPhone', 'ErpBillTo/Address/*', 'ErpShipTo/Name', 'ErpShipTo/MainPhone', 'ErpShipTo/Address/*'],
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

  _Manager2.default.register(_Names2.default.ERPINVOICE, _Types2.default.SDATA, __class);
  _lang2.default.setObject('icboe.Models.ErpInvoice.SData', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9FcnBJbnZvaWNlL1NEYXRhLmpzIl0sIm5hbWVzIjpbIl9fY2xhc3MiLCJpZCIsImNyZWF0ZVF1ZXJ5TW9kZWxzIiwibmFtZSIsInF1ZXJ5T3JkZXJCeSIsInF1ZXJ5U2VsZWN0IiwicXVlcnlJbmNsdWRlIiwicmVnaXN0ZXIiLCJFUlBJTlZPSUNFIiwiU0RBVEEiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsTUFBTUEsVUFBVSx1QkFBUSw4Q0FBUixFQUF3RCwwQ0FBeEQsRUFBaUY7QUFDL0ZDLFFBQUksd0JBRDJGO0FBRS9GQyx1QkFBbUIsU0FBU0EsaUJBQVQsR0FBNkI7QUFDOUMsYUFBTyxDQUFDO0FBQ05DLGNBQU0sTUFEQTtBQUVOQyxzQkFBYyx1Q0FGUjtBQUdOQyxxQkFBYSxDQUNYLGVBRFcsRUFFWCxxQkFGVyxFQUdYLCtCQUhXLEVBSVgsOEJBSlcsRUFLWCwrQkFMVyxFQU1YLGtDQU5XLEVBT1gsa0NBUFcsRUFRWCxpQ0FSVyxFQVNYLG1DQVRXLEVBVVgsZUFWVyxFQVdYLFlBWFcsRUFZWCxXQVpXLEVBYVgsa0JBYlcsRUFjWCxvQkFkVyxFQWVYLFlBZlcsRUFnQlgsY0FoQlcsRUFpQlgsdUJBakJXLEVBa0JYLG1CQWxCVyxFQW1CWCxrQkFuQlcsRUFvQlgsd0JBcEJXLEVBcUJYLGlCQXJCVztBQUhQLE9BQUQsRUEwQko7QUFDREYsY0FBTSxRQURMO0FBRURFLHFCQUFhLENBQ1gsZUFEVyxFQUVYLHFCQUZXLEVBR1gsWUFIVyxFQUlYLG9CQUpXLEVBS1gsY0FMVyxFQU1YLHVCQU5XLEVBT1gsbUJBUFcsRUFRWCxrQkFSVyxFQVNYLGFBVFcsRUFVWCxXQVZXLEVBV1gsZUFYVyxFQVlYLGlCQVpXLEVBYVgsa0JBYlcsRUFjWCx3QkFkVyxFQWVYLGdCQWZXLEVBZ0JYLHFCQWhCVyxFQWlCWCxxQkFqQlcsRUFrQlgsZ0JBbEJXLEVBbUJYLHFCQW5CVyxFQW9CWCxxQkFwQlcsQ0FGWjtBQXdCREMsc0JBQWMsQ0FDWixjQURZO0FBeEJiLE9BMUJJLENBQVA7QUF1REQ7QUExRDhGLEdBQWpGLENBQWhCLEMsQ0F2QkE7Ozs7Ozs7Ozs7Ozs7OztBQW9GQSxvQkFBUUMsUUFBUixDQUFpQixnQkFBWUMsVUFBN0IsRUFBeUMsZ0JBQVlDLEtBQXJELEVBQTREVCxPQUE1RDtBQUNBLGlCQUFLVSxTQUFMLENBQWUsK0JBQWYsRUFBZ0RWLE9BQWhEO29CQUNlQSxPIiwiZmlsZSI6IlNEYXRhLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IEJhc2UgZnJvbSAnLi9CYXNlJztcclxuaW1wb3J0IF9TRGF0YU1vZGVsQmFzZSBmcm9tICdhcmdvcy9Nb2RlbHMvX1NEYXRhTW9kZWxCYXNlJztcclxuaW1wb3J0IE1hbmFnZXIgZnJvbSAnYXJnb3MvTW9kZWxzL01hbmFnZXInO1xyXG5pbXBvcnQgTU9ERUxfVFlQRVMgZnJvbSAnYXJnb3MvTW9kZWxzL1R5cGVzJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uL05hbWVzJztcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5Nb2RlbHMuRXJwSW52b2ljZS5TRGF0YScsIFtCYXNlLCBfU0RhdGFNb2RlbEJhc2VdLCB7XHJcbiAgaWQ6ICdlcnBpbnZvaWNlX3NkYXRhX21vZGVsJyxcclxuICBjcmVhdGVRdWVyeU1vZGVsczogZnVuY3Rpb24gY3JlYXRlUXVlcnlNb2RlbHMoKSB7XHJcbiAgICByZXR1cm4gW3tcclxuICAgICAgbmFtZTogJ2xpc3QnLFxyXG4gICAgICBxdWVyeU9yZGVyQnk6ICdFcnBEb2N1bWVudERhdGUgZGVzYywgQ3JlYXRlRGF0ZSBkZXNjJyxcclxuICAgICAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICAgICAnSW52b2ljZU51bWJlcicsXHJcbiAgICAgICAgJ0FjY291bnQvQWNjb3VudE5hbWUnLFxyXG4gICAgICAgICdFUlBTaGlwVG8vQnV5ZXJDb250YWN0L05hbWVMRicsXHJcbiAgICAgICAgJ0VSUFNoaXBUby9CdXllckNvbnRhY3QvRW1haWwnLFxyXG4gICAgICAgICdFUlBTaGlwVG8vQnV5ZXJDb250YWN0L01vYmlsZScsXHJcbiAgICAgICAgJ0VSUFNoaXBUby9CdXllckNvbnRhY3QvSG9tZVBob25lJyxcclxuICAgICAgICAnRVJQU2hpcFRvL0J1eWVyQ29udGFjdC9GaXJzdE5hbWUnLFxyXG4gICAgICAgICdFUlBTaGlwVG8vQnV5ZXJDb250YWN0L0xhc3ROYW1lJyxcclxuICAgICAgICAnRVJQU2hpcFRvL0J1eWVyQ29udGFjdC9NaWRkbGVOYW1lJyxcclxuICAgICAgICAnRXJwU3RhdHVzRGF0ZScsXHJcbiAgICAgICAgJ01vZGlmeURhdGUnLFxyXG4gICAgICAgICdFcnBTdGF0dXMnLFxyXG4gICAgICAgICdFcnBQYXltZW50VGVybUlkJyxcclxuICAgICAgICAnRXJwVG90YWxCYXNlQW1vdW50JyxcclxuICAgICAgICAnR3JhbmRUb3RhbCcsXHJcbiAgICAgICAgJ0N1cnJlbmN5Q29kZScsXHJcbiAgICAgICAgJ0VycEV4dGVuZGVkQmFzZUFtb3VudCcsXHJcbiAgICAgICAgJ0VycEV4dGVuZGVkQW1vdW50JyxcclxuICAgICAgICAnQmFzZUN1cnJlbmN5Q29kZScsXHJcbiAgICAgICAgJ093bmVyL093bmVyRGVzY3JpcHRpb24nLFxyXG4gICAgICAgICdFcnBEb2N1bWVudERhdGUnLFxyXG4gICAgICBdLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnZGV0YWlsJyxcclxuICAgICAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICAgICAnSW52b2ljZU51bWJlcicsXHJcbiAgICAgICAgJ0FjY291bnQvQWNjb3VudE5hbWUnLFxyXG4gICAgICAgICdHcmFuZFRvdGFsJyxcclxuICAgICAgICAnRXJwVG90YWxCYXNlQW1vdW50JyxcclxuICAgICAgICAnQ3VycmVuY3lDb2RlJyxcclxuICAgICAgICAnRXJwRXh0ZW5kZWRCYXNlQW1vdW50JyxcclxuICAgICAgICAnRXJwRXh0ZW5kZWRBbW91bnQnLFxyXG4gICAgICAgICdCYXNlQ3VycmVuY3lDb2RlJyxcclxuICAgICAgICAnRGVzY3JpcHRpb24nLFxyXG4gICAgICAgICdFcnBTdGF0dXMnLFxyXG4gICAgICAgICdFcnBTdGF0dXNEYXRlJyxcclxuICAgICAgICAnRXJwRG9jdW1lbnREYXRlJyxcclxuICAgICAgICAnRXJwUGF5bWVudFRlcm1JZCcsXHJcbiAgICAgICAgJ093bmVyL093bmVyRGVzY3JpcHRpb24nLFxyXG4gICAgICAgICdFcnBCaWxsVG8vTmFtZScsXHJcbiAgICAgICAgJ0VycEJpbGxUby9NYWluUGhvbmUnLFxyXG4gICAgICAgICdFcnBCaWxsVG8vQWRkcmVzcy8qJyxcclxuICAgICAgICAnRXJwU2hpcFRvL05hbWUnLFxyXG4gICAgICAgICdFcnBTaGlwVG8vTWFpblBob25lJyxcclxuICAgICAgICAnRXJwU2hpcFRvL0FkZHJlc3MvKicsXHJcbiAgICAgIF0sXHJcbiAgICAgIHF1ZXJ5SW5jbHVkZTogW1xyXG4gICAgICAgICckcGVybWlzc2lvbnMnLFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICAgIF07XHJcbiAgfSxcclxufSk7XHJcblxyXG5NYW5hZ2VyLnJlZ2lzdGVyKE1PREVMX05BTUVTLkVSUElOVk9JQ0UsIE1PREVMX1RZUEVTLlNEQVRBLCBfX2NsYXNzKTtcclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLk1vZGVscy5FcnBJbnZvaWNlLlNEYXRhJywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==