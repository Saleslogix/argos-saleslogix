define('crm/Integrations/BOE/Models/SalesOrder/SData', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/ErrorManager', 'argos/Models/Types', '../Names'], function (module, exports, _declare, _lang, _Base, _SDataModelBase2, _Manager, _ErrorManager, _Types, _Names) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Base2 = _interopRequireDefault(_Base);

  var _SDataModelBase3 = _interopRequireDefault(_SDataModelBase2);

  var _Manager2 = _interopRequireDefault(_Manager);

  var _ErrorManager2 = _interopRequireDefault(_ErrorManager);

  var _Types2 = _interopRequireDefault(_Types);

  var _Names2 = _interopRequireDefault(_Names);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.SalesOrder.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'salesorder_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryWhere: 'IsQuote eq false',
        queryOrderBy: 'ErpDocumentDate desc, OrderDate desc',
        querySelect: ['SalesOrderNumber', 'Account/AccountName', 'Status', 'ErpExtId', 'CustomerPurchaseOrderNumber', 'DocGrandTotal', // Document Total
        'GrandTotal', // Base Total
        'OrderDate', 'CreateDate', 'ModifyDate', 'CurrencyCode', 'BaseCurrencyCode', 'ErpSalesOrder/ERPStatus', 'ErpStatusDate', 'ErpDocumentDate']
      }, {
        name: 'detail',
        querySelect: ['SalesOrderNumber', 'ErpExtId', 'CustomerPurchaseOrderNumber', 'Account/AccountName', 'Opportunity/Description', 'Quote/QuoteNumber', 'CreateDate', 'ModifyDate', 'OrderDate', 'DueDate', 'ErpDocumentDate', 'Status', 'StatusDate', 'ErpShipTo/Name', 'ErpShipTo/Address/*', 'ErpBillTo/Name', 'ErpBillTo/Address/*', 'ErpPayFrom/Address/*', 'DocGrandTotal', // Document Total
        'GrandTotal', // Base Total
        'DocOrderTotal', 'GrandTotal', 'OrderTotal', 'ErpPaymentMethod', 'ErpPaymentTermId', 'ErpBackOrdered', 'ErpDropShip', 'ErpShipEarly', 'ErpInvoiceImmediately', 'ErpPartialShipAllowed', 'ErpTaxExempt', 'CurrencyCode', 'BaseCurrencyCode', 'ErpLogicalId', 'ErpAccountingEntityId', 'ExchangeRate', 'SyncStatus', 'AccountManager/*', 'ErpLocation', 'WarehouseLocation/Address/*', 'WarehouseLocation/Description', 'Location/Address/*', 'Location/Description', 'RequestedBy/NameLF', 'Carrier/CarrierName', 'ErpSalesOrder/ERPStatus', 'ErpStatusDate'],
        queryInclude: ['$permissions']
      }, {
        name: 'edit',
        querySelect: ['SalesOrderNumber', 'ErpExtId', 'CustomerPurchaseOrderNumber', 'Account/AccountName', 'Opportunity/Description', 'Quote/QuoteNumber', 'CreateDate', 'ModifyDate', 'OrderDate', 'DueDate', 'ErpDocumentDate', 'Status', 'StatusDate', 'ErpShipTo/Address/*', 'ErpBillTo/Address/*', 'ErpPayFrom/Address/*', 'GrandTotal', 'OrderTotal', 'ErpPaymentMethod', 'ErpPaymentTermId', 'ErpBackOrdered', 'ErpDropShip', 'ErpShipEarly', 'ErpInvoiceImmediately', 'ErpPartialShipAllowed', 'ErpTaxExempt', 'CurrencyCode', 'BaseCurrencyCode', 'ErpLogicalId', 'ErpAccountingEntityId', 'ExchangeRate', 'ErpSyncStatus', 'AccountManager/*', 'ErpLocation', 'WarehouseLocation/*', 'Location/*', 'RequestedBy/NameLF', 'Carrier/*'],
        queryInclude: ['$permissions']
      }];
    },
    isClosed: function isClosed($key, options) {
      var request = new Sage.SData.Client.SDataServiceOperationRequest(App.getService()).setResourceKind(this.resourceKind).setOperationName('isClosed');
      var entry = {
        $name: 'isClosed',
        request: {
          entity: {
            $key: $key
          }
        }
      };
      return new Promise(function (resolve, reject) {
        request.execute(entry, {
          success: function success(data) {
            var Result = data.response.Result;

            resolve(Result);
          },
          failure: function failure(response, o) {
            _ErrorManager2.default.addError(response, o, options, 'failure');
            reject(response);
          }
        });
      });
    },
    getEntry: function getEntry(key, options) {
      var results$ = this.inherited(getEntry, arguments);
      var closed$ = this.isClosed(key, options);
      return Promise.all([results$, closed$]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            entry = _ref2[0],
            closed = _ref2[1];

        entry.IsClosed = closed;
        return entry;
      });
    }
  });

  _Manager2.default.register(_Names2.default.SALESORDER, _Types2.default.SDATA, __class);
  _lang2.default.setObject('icboe.Models.SalesOrder.SData', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9TYWxlc09yZGVyL1NEYXRhLmpzIl0sIm5hbWVzIjpbIl9fY2xhc3MiLCJpZCIsImNyZWF0ZVF1ZXJ5TW9kZWxzIiwibmFtZSIsInF1ZXJ5V2hlcmUiLCJxdWVyeU9yZGVyQnkiLCJxdWVyeVNlbGVjdCIsInF1ZXJ5SW5jbHVkZSIsImlzQ2xvc2VkIiwiJGtleSIsIm9wdGlvbnMiLCJyZXF1ZXN0IiwiU2FnZSIsIlNEYXRhIiwiQ2xpZW50IiwiU0RhdGFTZXJ2aWNlT3BlcmF0aW9uUmVxdWVzdCIsIkFwcCIsImdldFNlcnZpY2UiLCJzZXRSZXNvdXJjZUtpbmQiLCJyZXNvdXJjZUtpbmQiLCJzZXRPcGVyYXRpb25OYW1lIiwiZW50cnkiLCIkbmFtZSIsImVudGl0eSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZXhlY3V0ZSIsInN1Y2Nlc3MiLCJkYXRhIiwiUmVzdWx0IiwicmVzcG9uc2UiLCJmYWlsdXJlIiwibyIsImFkZEVycm9yIiwiZ2V0RW50cnkiLCJrZXkiLCJyZXN1bHRzJCIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImNsb3NlZCQiLCJhbGwiLCJ0aGVuIiwiY2xvc2VkIiwiSXNDbG9zZWQiLCJyZWdpc3RlciIsIlNBTEVTT1JERVIiLCJTREFUQSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsTUFBTUEsVUFBVSx1QkFBUSw4Q0FBUixFQUF3RCwwQ0FBeEQsRUFBaUY7QUFDL0ZDLFFBQUksd0JBRDJGO0FBRS9GQyx1QkFBbUIsU0FBU0EsaUJBQVQsR0FBNkI7QUFDOUMsYUFBTyxDQUFDO0FBQ05DLGNBQU0sTUFEQTtBQUVOQyxvQkFBWSxrQkFGTjtBQUdOQyxzQkFBYyxzQ0FIUjtBQUlOQyxxQkFBYSxDQUNYLGtCQURXLEVBRVgs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QUVqQkwsb0JBQVFLLE1BQVI7QUFDRCxXQUpvQjtBQUtyQkUsbUJBQVMsaUJBQUNELFFBQUQsRUFBV0UsQ0FBWCxFQUFpQjtBQUN4QixtQ0FBYUMsUUFBYixDQUFzQkgsUUFBdEIsRUFBZ0NFLENBQWhDLEVBQW1DdkIsT0FBbkMsRUFBNEMsU0FBNUM7QUFDQWdCLG1CQUFPSyxRQUFQO0FBQ0Q7QUFSb0IsU0FBdkI7QUFVRCxPQVhNLENBQVA7QUFZRCxLQXJKOEY7QUFzSi9GSSxjQUFVLFNBQVNBLFFBQVQsQ0FBa0JDLEdBQWxCLEVBQXVCMUIsT0FBdkIsRUFBZ0M7QUFDeEMsVUFBTTJCLFdBQVcsS0FBS0MsU0FBTCxDQUFlSCxRQUFmLEVBQXlCSSxTQUF6QixDQUFqQjtBQUNBLFVBQU1DLFVBQVUsS0FBS2hDLFFBQUwsQ0FBYzRCLEdBQWQsRUFBbUIxQixPQUFuQixDQUFoQjtBQUNBLGFBQU9jLFFBQVFpQixHQUFSLENBQVksQ0FBQ0osUUFBRCxFQUFXRyxPQUFYLENBQVosRUFDSkUsSUFESSxDQUNDLGdCQUFxQjtBQUFBO0FBQUEsWUFBbkJyQixLQUFtQjtBQUFBLFlBQVpzQixNQUFZOztBQUN6QnRCLGNBQU11QixRQUFOLEdBQWlCRCxNQUFqQjtBQUNBLGVBQU90QixLQUFQO0FBQ0QsT0FKSSxDQUFQO0FBS0Q7QUE5SjhGLEdBQWpGLENBQWhCOztBQWlLQSxvQkFBUXdCLFFBQVIsQ0FBaUIsZ0JBQVlDLFVBQTdCLEVBQXlDLGdCQUFZQyxLQUFyRCxFQUE0RC9DLE9BQTVEO0FBQ0EsaUJBQUtnRCxTQUFMLENBQWUsK0JBQWYsRUFBZ0RoRCxPQUFoRDtvQkFDZUEsTyIsImZpbGUiOiJTRGF0YS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBCYXNlIGZyb20gJy4vQmFzZSc7XHJcbmltcG9ydCBfU0RhdGFNb2RlbEJhc2UgZnJvbSAnYXJnb3MvTW9kZWxzL19TRGF0YU1vZGVsQmFzZSc7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gJ2FyZ29zL01vZGVscy9NYW5hZ2VyJztcclxuaW1wb3J0IEVycm9yTWFuYWdlciBmcm9tICdhcmdvcy9FcnJvck1hbmFnZXInO1xyXG5pbXBvcnQgTU9ERUxfVFlQRVMgZnJvbSAnYXJnb3MvTW9kZWxzL1R5cGVzJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uL05hbWVzJztcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5Nb2RlbHMuU2FsZXNPcmRlci5TRGF0YScsIFtCYXNlLCBfU0RhdGFNb2RlbEJhc2VdLCB7XHJcbiAgaWQ6ICdzYWxlc29yZGVyX3NkYXRhX21vZGVsJyxcclxuICBjcmVhdGVRdWVyeU1vZGVsczogZnVuY3Rpb24gY3JlYXRlUXVlcnlNb2RlbHMoKSB7XHJcbiAgICByZXR1cm4gW3tcclxuICAgICAgbmFtZTogJ2xpc3QnLFxyXG4gICAgICBxdWVyeVdoZXJlOiAnSXNRdW90ZSBlcSBmYWxzZScsXHJcbiAgICAgIHF1ZXJ5T3JkZXJCeTogJ0VycERvY3VtZW50RGF0ZSBkZXNjLCBPcmRlckRhdGUgZGVzYycsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAgICAgJ1NhbGVzT3JkZXJOdW1iZXInLFxyXG4gICAgICAgICdBY2NvdW50L0FjY291bnROYW1lJyxcclxuICAgICAgICAnU3RhdHVzJyxcclxuICAgICAgICAnRXJwRXh0SWQnLFxyXG4gICAgICAgICdDdXN0b21lclB1cmNoYXNlT3JkZXJOdW1iZXInLFxyXG4gICAgICAgICdEb2NHcmFuZFRvdGFsJywgLy8gRG9jdW1lbnQgVG90YWxcclxuICAgICAgICAnR3JhbmRUb3RhbCcsIC8vIEJhc2UgVG90YWxcclxuICAgICAgICAnT3JkZXJEYXRlJyxcclxuICAgICAgICAnQ3JlYXRlRGF0ZScsXHJcbiAgICAgICAgJ01vZGlmeURhdGUnLFxyXG4gICAgICAgICdDdXJyZW5jeUNvZGUnLFxyXG4gICAgICAgICdCYXNlQ3VycmVuY3lDb2RlJyxcclxuICAgICAgICAnRXJwU2FsZXNPcmRlci9FUlBTdGF0dXMnLFxyXG4gICAgICAgICdFcnBTdGF0dXNEYXRlJyxcclxuICAgICAgICAnRXJwRG9jdW1lbnREYXRlJyxcclxuICAgICAgXSxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ2RldGFpbCcsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAgICAgJ1NhbGVzT3JkZXJOdW1iZXInLFxyXG4gICAgICAgICdFcnBFeHRJZCcsXHJcbiAgICAgICAgJ0N1c3RvbWVyUHVyY2hhc2VPcmRlck51bWJlcicsXHJcbiAgICAgICAgJ0FjY291bnQvQWNjb3VudE5hbWUnLFxyXG4gICAgICAgICdPcHBvcnR1bml0eS9EZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ1F1b3RlL1F1b3RlTnVtYmVyJyxcclxuICAgICAgICAnQ3JlYXRlRGF0ZScsXHJcbiAgICAgICAgJ01vZGlmeURhdGUnLFxyXG4gICAgICAgICdPcmRlckRhdGUnLFxyXG4gICAgICAgICdEdWVEYXRlJyxcclxuICAgICAgICAnRXJwRG9jdW1lbnREYXRlJyxcclxuICAgICAgICAnU3RhdHVzJyxcclxuICAgICAgICAnU3RhdHVzRGF0ZScsXHJcbiAgICAgICAgJ0VycFNoaXBUby9OYW1lJyxcclxuICAgICAgICAnRXJwU2hpcFRvL0FkZHJlc3MvKicsXHJcbiAgICAgICAgJ0VycEJpbGxUby9OYW1lJyxcclxuICAgICAgICAnRXJwQmlsbFRvL0FkZHJlc3MvKicsXHJcbiAgICAgICAgJ0VycFBheUZyb20vQWRkcmVzcy8qJyxcclxuICAgICAgICAnRG9jR3JhbmRUb3RhbCcsIC8vIERvY3VtZW50IFRvdGFsXHJcbiAgICAgICAgJ0dyYW5kVG90YWwnLCAvLyBCYXNlIFRvdGFsXHJcbiAgICAgICAgJ0RvY09yZGVyVG90YWwnLFxyXG4gICAgICAgICdHcmFuZFRvdGFsJyxcclxuICAgICAgICAnT3JkZXJUb3RhbCcsXHJcbiAgICAgICAgJ0VycFBheW1lbnRNZXRob2QnLFxyXG4gICAgICAgICdFcnBQYXltZW50VGVybUlkJyxcclxuICAgICAgICAnRXJwQmFja09yZGVyZWQnLFxyXG4gICAgICAgICdFcnBEcm9wU2hpcCcsXHJcbiAgICAgICAgJ0VycFNoaXBFYXJseScsXHJcbiAgICAgICAgJ0VycEludm9pY2VJbW1lZGlhdGVseScsXHJcbiAgICAgICAgJ0VycFBhcnRpYWxTaGlwQWxsb3dlZCcsXHJcbiAgICAgICAgJ0VycFRheEV4ZW1wdCcsXHJcbiAgICAgICAgJ0N1cnJlbmN5Q29kZScsXHJcbiAgICAgICAgJ0Jhc2VDdXJyZW5jeUNvZGUnLFxyXG4gICAgICAgICdFcnBMb2dpY2FsSWQnLFxyXG4gICAgICAgICdFcnBBY2NvdW50aW5nRW50aXR5SWQnLFxyXG4gICAgICAgICdFeGNoYW5nZVJhdGUnLFxyXG4gICAgICAgICdTeW5jU3RhdHVzJyxcclxuICAgICAgICAnQWNjb3VudE1hbmFnZXIvKicsXHJcbiAgICAgICAgJ0VycExvY2F0aW9uJyxcclxuICAgICAgICAnV2FyZWhvdXNlTG9jYXRpb24vQWRkcmVzcy8qJyxcclxuICAgICAgICAnV2FyZWhvdXNlTG9jYXRpb24vRGVzY3JpcHRpb24nLFxyXG4gICAgICAgICdMb2NhdGlvbi9BZGRyZXNzLyonLFxyXG4gICAgICAgICdMb2NhdGlvbi9EZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ1JlcXVlc3RlZEJ5L05hbWVMRicsXHJcbiAgICAgICAgJ0NhcnJpZXIvQ2Fycmllck5hbWUnLFxyXG4gICAgICAgICdFcnBTYWxlc09yZGVyL0VSUFN0YXR1cycsXHJcbiAgICAgICAgJ0VycFN0YXR1c0RhdGUnLFxyXG4gICAgICBdLFxyXG4gICAgICBxdWVyeUluY2x1ZGU6IFtcclxuICAgICAgICAnJHBlcm1pc3Npb25zJyxcclxuICAgICAgXSxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ2VkaXQnLFxyXG4gICAgICBxdWVyeVNlbGVjdDogW1xyXG4gICAgICAgICdTYWxlc09yZGVyTnVtYmVyJyxcclxuICAgICAgICAnRXJwRXh0SWQnLFxyXG4gICAgICAgICdDdXN0b21lclB1cmNoYXNlT3JkZXJOdW1iZXInLFxyXG4gICAgICAgICdBY2NvdW50L0FjY291bnROYW1lJyxcclxuICAgICAgICAnT3Bwb3J0dW5pdHkvRGVzY3JpcHRpb24nLFxyXG4gICAgICAgICdRdW90ZS9RdW90ZU51bWJlcicsXHJcbiAgICAgICAgJ0NyZWF0ZURhdGUnLFxyXG4gICAgICAgICdNb2RpZnlEYXRlJyxcclxuICAgICAgICAnT3JkZXJEYXRlJyxcclxuICAgICAgICAnRHVlRGF0ZScsXHJcbiAgICAgICAgJ0VycERvY3VtZW50RGF0ZScsXHJcbiAgICAgICAgJ1N0YXR1cycsXHJcbiAgICAgICAgJ1N0YXR1c0RhdGUnLFxyXG4gICAgICAgICdFcnBTaGlwVG8vQWRkcmVzcy8qJyxcclxuICAgICAgICAnRXJwQmlsbFRvL0FkZHJlc3MvKicsXHJcbiAgICAgICAgJ0VycFBheUZyb20vQWRkcmVzcy8qJyxcclxuICAgICAgICAnR3JhbmRUb3RhbCcsXHJcbiAgICAgICAgJ09yZGVyVG90YWwnLFxyXG4gICAgICAgICdFcnBQYXltZW50TWV0aG9kJyxcclxuICAgICAgICAnRXJwUGF5bWVudFRlcm1JZCcsXHJcbiAgICAgICAgJ0VycEJhY2tPcmRlcmVkJyxcclxuICAgICAgICAnRXJwRHJvcFNoaXAnLFxyXG4gICAgICAgICdFcnBTaGlwRWFybHknLFxyXG4gICAgICAgICdFcnBJbnZvaWNlSW1tZWRpYXRlbHknLFxyXG4gICAgICAgICdFcnBQYXJ0aWFsU2hpcEFsbG93ZWQnLFxyXG4gICAgICAgICdFcnBUYXhFeGVtcHQnLFxyXG4gICAgICAgICdDdXJyZW5jeUNvZGUnLFxyXG4gICAgICAgICdCYXNlQ3VycmVuY3lDb2RlJyxcclxuICAgICAgICAnRXJwTG9naWNhbElkJyxcclxuICAgICAgICAnRXJwQWNjb3VudGluZ0VudGl0eUlkJyxcclxuICAgICAgICAnRXhjaGFuZ2VSYXRlJyxcclxuICAgICAgICAnRXJwU3luY1N0YXR1cycsXHJcbiAgICAgICAgJ0FjY291bnRNYW5hZ2VyLyonLFxyXG4gICAgICAgICdFcnBMb2NhdGlvbicsXHJcbiAgICAgICAgJ1dhcmVob3VzZUxvY2F0aW9uLyonLFxyXG4gICAgICAgICdMb2NhdGlvbi8qJyxcclxuICAgICAgICAnUmVxdWVzdGVkQnkvTmFtZUxGJyxcclxuICAgICAgICAnQ2Fycmllci8qJyxcclxuICAgICAgXSxcclxuICAgICAgcXVlcnlJbmNsdWRlOiBbXHJcbiAgICAgICAgJyRwZXJtaXNzaW9ucycsXHJcbiAgICAgIF0sXHJcbiAgICB9XTtcclxuICB9LFxyXG4gIGlzQ2xvc2VkOiBmdW5jdGlvbiBpc0Nsb3NlZCgka2V5LCBvcHRpb25zKSB7XHJcbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhU2VydmljZU9wZXJhdGlvblJlcXVlc3QoQXBwLmdldFNlcnZpY2UoKSlcclxuICAgICAgLnNldFJlc291cmNlS2luZCh0aGlzLnJlc291cmNlS2luZClcclxuICAgICAgLnNldE9wZXJhdGlvbk5hbWUoJ2lzQ2xvc2VkJyk7XHJcbiAgICBjb25zdCBlbnRyeSA9IHtcclxuICAgICAgJG5hbWU6ICdpc0Nsb3NlZCcsXHJcbiAgICAgIHJlcXVlc3Q6IHtcclxuICAgICAgICBlbnRpdHk6IHtcclxuICAgICAgICAgICRrZXksXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICByZXF1ZXN0LmV4ZWN1dGUoZW50cnksIHtcclxuICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgeyByZXNwb25zZTogeyBSZXN1bHQgfSB9ID0gZGF0YTtcclxuICAgICAgICAgIHJlc29sdmUoUmVzdWx0KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhaWx1cmU6IChyZXNwb25zZSwgbykgPT4ge1xyXG4gICAgICAgICAgRXJyb3JNYW5hZ2VyLmFkZEVycm9yKHJlc3BvbnNlLCBvLCBvcHRpb25zLCAnZmFpbHVyZScpO1xyXG4gICAgICAgICAgcmVqZWN0KHJlc3BvbnNlKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZ2V0RW50cnk6IGZ1bmN0aW9uIGdldEVudHJ5KGtleSwgb3B0aW9ucykge1xyXG4gICAgY29uc3QgcmVzdWx0cyQgPSB0aGlzLmluaGVyaXRlZChnZXRFbnRyeSwgYXJndW1lbnRzKTtcclxuICAgIGNvbnN0IGNsb3NlZCQgPSB0aGlzLmlzQ2xvc2VkKGtleSwgb3B0aW9ucyk7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3Jlc3VsdHMkLCBjbG9zZWQkXSlcclxuICAgICAgLnRoZW4oKFtlbnRyeSwgY2xvc2VkXSkgPT4ge1xyXG4gICAgICAgIGVudHJ5LklzQ2xvc2VkID0gY2xvc2VkO1xyXG4gICAgICAgIHJldHVybiBlbnRyeTtcclxuICAgICAgfSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5NYW5hZ2VyLnJlZ2lzdGVyKE1PREVMX05BTUVTLlNBTEVTT1JERVIsIE1PREVMX1RZUEVTLlNEQVRBLCBfX2NsYXNzKTtcclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLk1vZGVscy5TYWxlc09yZGVyLlNEYXRhJywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==