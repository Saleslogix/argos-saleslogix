define('crm/Integrations/BOE/Models/ErpInvoiceItem/SData', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names'], function (module, exports, _declare, _lang, _Base, _SDataModelBase2, _Manager, _Types, _Names) {
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.ErpInvoiceItem.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'erpinvoiceitem_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'ErpLineNumber',
        querySelect: ['ErpLineNumber', 'ErpLineTotalAmount', 'Quantity', 'Price', 'ProductName', 'Description', 'ErpInvoice/CurrencyCode', 'ErpInvoice/InvoiceNumber']
      }, {
        name: 'detail',
        querySelect: ['ErpLineNumber', 'ExtendedPrice', 'ExtendedCost', 'ErpLineTotalAmount', 'ErpInvoice/InvoiceNumber', 'SalesOrder/SalesOrderNumber', 'UnitOfMeasure/Name', 'ErpRequestedDeliveryDate', 'Quantity', 'Price', 'ProductName', 'Description', 'BaseUnitPrice', 'SalesOrderLineReference', 'ErpUnitPricePerQuanity', 'ErpUnitPricePerQuanityUOM', 'ErpInvoice/CurrencyCode'],
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

  _Manager2.default.register(_Names2.default.ERPINVOICEITEM, _Types2.default.SDATA, __class);
  _lang2.default.setObject('icboe.Models.ErpInvoiceItem.SData', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9FcnBJbnZvaWNlSXRlbS9TRGF0YS5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiaWQiLCJjcmVhdGVRdWVyeU1vZGVscyIsIm5hbWUiLCJxdWVyeU9yZGVyQnkiLCJxdWVyeVNlbGVjdCIsInF1ZXJ5SW5jbHVkZSIsInJlZ2lzdGVyIiwiRVJQSU5WT0lDRUlURU0iLCJTREFUQSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxNQUFNQSxVQUFVLHVCQUFRLGtEQUFSLEVBQTRELDBDQUE1RCxFQUFxRjtBQUNuR0MsUUFBSSw0QkFEK0Y7QUFFbkdDLHVCQUFtQixTQUFTQSxpQkFBVCxHQUE2QjtBQUM5QyxhQUFPLENBQUM7QUFDTkMsY0FBTSxNQURBO0FBRU5DLHNCQUFjLGVBRlI7QUFHTkMscUJBQWEsQ0FDWCxlQURXLEVBRVgsb0JBRlcsRUFHWCxVQUhXLEVBSVgsT0FKVyxFQUtYLGFBTFcsRUFNWCxhQU5XLEVBT1gseUJBUFcsRUFRWCwwQkFSVztBQUhQLE9BQUQsRUFhSjtBQUNERixjQUFNLFFBREw7QUFFREUscUJBQWEsQ0FDWCxlQURXLEVBRVgsZUFGVyxFQUdYLGNBSFcsRUFJWCxvQkFKVyxFQUtYLDBCQUxXLEVBTVgsNkJBTlcsRUFPWCxvQkFQVyxFQVFYLDBCQVJXLEVBU1gsVUFUVyxFQVVYLE9BVlcsRUFXWCxhQVhXLEVBWVgsYUFaVyxFQWFYLGVBYlcsRUFjWCx5QkFkVyxFQWVYLHdCQWZXLEVBZ0JYLDJCQWhCVyxFQWlCWCx5QkFqQlcsQ0FGWjtBQXFCREMsc0JBQWMsQ0FDWixjQURZO0FBckJiLE9BYkksQ0FBUDtBQXVDRDtBQTFDa0csR0FBckYsQ0FBaEIsQyxDQXZCQTs7Ozs7Ozs7Ozs7Ozs7O0FBb0VBLG9CQUFRQyxRQUFSLENBQWlCLGdCQUFZQyxjQUE3QixFQUE2QyxnQkFBWUMsS0FBekQsRUFBZ0VULE9BQWhFO0FBQ0EsaUJBQUtVLFNBQUwsQ0FBZSxtQ0FBZixFQUFvRFYsT0FBcEQ7b0JBQ2VBLE8iLCJmaWxlIjoiU0RhdGEuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgQmFzZSBmcm9tICcuL0Jhc2UnO1xyXG5pbXBvcnQgX1NEYXRhTW9kZWxCYXNlIGZyb20gJ2FyZ29zL01vZGVscy9fU0RhdGFNb2RlbEJhc2UnO1xyXG5pbXBvcnQgTWFuYWdlciBmcm9tICdhcmdvcy9Nb2RlbHMvTWFuYWdlcic7XHJcbmltcG9ydCBNT0RFTF9UWVBFUyBmcm9tICdhcmdvcy9Nb2RlbHMvVHlwZXMnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vTmFtZXMnO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLk1vZGVscy5FcnBJbnZvaWNlSXRlbS5TRGF0YScsIFtCYXNlLCBfU0RhdGFNb2RlbEJhc2VdLCB7XHJcbiAgaWQ6ICdlcnBpbnZvaWNlaXRlbV9zZGF0YV9tb2RlbCcsXHJcbiAgY3JlYXRlUXVlcnlNb2RlbHM6IGZ1bmN0aW9uIGNyZWF0ZVF1ZXJ5TW9kZWxzKCkge1xyXG4gICAgcmV0dXJuIFt7XHJcbiAgICAgIG5hbWU6ICdsaXN0JyxcclxuICAgICAgcXVlcnlPcmRlckJ5OiAnRXJwTGluZU51bWJlcicsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAgICAgJ0VycExpbmVOdW1iZXInLFxyXG4gICAgICAgICdFcnBMaW5lVG90YWxBbW91bnQnLFxyXG4gICAgICAgICdRdWFudGl0eScsXHJcbiAgICAgICAgJ1ByaWNlJyxcclxuICAgICAgICAnUHJvZHVjdE5hbWUnLFxyXG4gICAgICAgICdEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ0VycEludm9pY2UvQ3VycmVuY3lDb2RlJyxcclxuICAgICAgICAnRXJwSW52b2ljZS9JbnZvaWNlTnVtYmVyJyxcclxuICAgICAgXSxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ2RldGFpbCcsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAgICAgJ0VycExpbmVOdW1iZXInLFxyXG4gICAgICAgICdFeHRlbmRlZFByaWNlJyxcclxuICAgICAgICAnRXh0ZW5kZWRDb3N0JyxcclxuICAgICAgICAnRXJwTGluZVRvdGFsQW1vdW50JyxcclxuICAgICAgICAnRXJwSW52b2ljZS9JbnZvaWNlTnVtYmVyJyxcclxuICAgICAgICAnU2FsZXNPcmRlci9TYWxlc09yZGVyTnVtYmVyJyxcclxuICAgICAgICAnVW5pdE9mTWVhc3VyZS9OYW1lJyxcclxuICAgICAgICAnRXJwUmVxdWVzdGVkRGVsaXZlcnlEYXRlJyxcclxuICAgICAgICAnUXVhbnRpdHknLFxyXG4gICAgICAgICdQcmljZScsXHJcbiAgICAgICAgJ1Byb2R1Y3ROYW1lJyxcclxuICAgICAgICAnRGVzY3JpcHRpb24nLFxyXG4gICAgICAgICdCYXNlVW5pdFByaWNlJyxcclxuICAgICAgICAnU2FsZXNPcmRlckxpbmVSZWZlcmVuY2UnLFxyXG4gICAgICAgICdFcnBVbml0UHJpY2VQZXJRdWFuaXR5JyxcclxuICAgICAgICAnRXJwVW5pdFByaWNlUGVyUXVhbml0eVVPTScsXHJcbiAgICAgICAgJ0VycEludm9pY2UvQ3VycmVuY3lDb2RlJyxcclxuICAgICAgXSxcclxuICAgICAgcXVlcnlJbmNsdWRlOiBbXHJcbiAgICAgICAgJyRwZXJtaXNzaW9ucycsXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAgXTtcclxuICB9LFxyXG59KTtcclxuXHJcbk1hbmFnZXIucmVnaXN0ZXIoTU9ERUxfTkFNRVMuRVJQSU5WT0lDRUlURU0sIE1PREVMX1RZUEVTLlNEQVRBLCBfX2NsYXNzKTtcclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLk1vZGVscy5FcnBJbnZvaWNlSXRlbS5TRGF0YScsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=