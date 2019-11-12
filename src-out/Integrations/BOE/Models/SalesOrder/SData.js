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
      var results$ = this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9TYWxlc09yZGVyL1NEYXRhLmpzIl0sIm5hbWVzIjpbIl9fY2xhc3MiLCJpZCIsImNyZWF0ZVF1ZXJ5TW9kZWxzIiwibmFtZSIsInF1ZXJ5V2hlcmUiLCJxdWVyeU9yZGVyQnkiLCJxdWVyeVNlbGVjdCIsInF1ZXJ5SW5jbHVkZSIsImlzQ2xvc2VkIiwiJGtleSIsIm9wdGlvbnMiLCJyZXF1ZXN0IiwiU2FnZSIsIlNEYXRhIiwiQ2xpZW50IiwiU0RhdGFTZXJ2aWNlT3BlcmF0aW9uUmVxdWVzdCIsIkFwcCIsImdldFNlcnZpY2UiLCJzZXRSZXNvdXJjZUtpbmQiLCJyZXNvdXJjZUtpbmQiLCJzZXRPcGVyYXRpb25OYW1lIiwiZW50cnkiLCIkbmFtZSIsImVudGl0eSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZXhlY3V0ZSIsInN1Y2Nlc3MiLCJkYXRhIiwiUmVzdWx0IiwicmVzcG9uc2UiLCJmYWlsdXJlIiwibyIsImFkZEVycm9yIiwiZ2V0RW50cnkiLCJrZXkiLCJyZXN1bHRzJCIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImNsb3NlZCQiLCJhbGwiLCJ0aGVuIiwiY2xvc2VkIiwiSXNDbG9zZWQiLCJyZWdpc3RlciIsIlNBTEVTT1JERVIiLCJTREFUQSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsTUFBTUEsVUFBVSx1QkFBUSw4Q0FBUixFQUF3RCwwQ0FBeEQsRUFBaUY7QUFDL0ZDLFFBQUksd0JBRDJGO0FBRS9GQyx1QkFBbUIsU0FBU0EsaUJBQVQsR0FBNkI7QUFDOUMsYUFBTyxDQUFDO0FBQ05DLGNBQU0sTUFEQTtBQUVOQyxvQkFBWSxrQkFGTjtBQUdOQyxzQkFBYyxzQ0FIUjtBQUlOQyxxQkFBYSxDQUNYLGtCQURXLEVBRVgs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QUVqQkwsb0JBQVFLLE1BQVI7QUFDRCxXQUpvQjtBQUtyQkUsbUJBQVMsaUJBQUNELFFBQUQsRUFBV0UsQ0FBWCxFQUFpQjtBQUN4QixtQ0FBYUMsUUFBYixDQUFzQkgsUUFBdEIsRUFBZ0NFLENBQWhDLEVBQW1DdkIsT0FBbkMsRUFBNEMsU0FBNUM7QUFDQWdCLG1CQUFPSyxRQUFQO0FBQ0Q7QUFSb0IsU0FBdkI7QUFVRCxPQVhNLENBQVA7QUFZRCxLQXJKOEY7QUFzSi9GSSxjQUFVLFNBQVNBLFFBQVQsQ0FBa0JDLEdBQWxCLEVBQXVCMUIsT0FBdkIsRUFBZ0M7QUFDeEMsVUFBTTJCLFdBQVcsS0FBS0MsU0FBTCxDQUFlQyxTQUFmLENBQWpCO0FBQ0EsVUFBTUMsVUFBVSxLQUFLaEMsUUFBTCxDQUFjNEIsR0FBZCxFQUFtQjFCLE9BQW5CLENBQWhCO0FBQ0EsYUFBT2MsUUFBUWlCLEdBQVIsQ0FBWSxDQUFDSixRQUFELEVBQVdHLE9BQVgsQ0FBWixFQUNKRSxJQURJLENBQ0MsZ0JBQXFCO0FBQUE7QUFBQSxZQUFuQnJCLEtBQW1CO0FBQUEsWUFBWnNCLE1BQVk7O0FBQ3pCdEIsY0FBTXVCLFFBQU4sR0FBaUJELE1BQWpCO0FBQ0EsZUFBT3RCLEtBQVA7QUFDRCxPQUpJLENBQVA7QUFLRDtBQTlKOEYsR0FBakYsQ0FBaEI7O0FBaUtBLG9CQUFRd0IsUUFBUixDQUFpQixnQkFBWUMsVUFBN0IsRUFBeUMsZ0JBQVlDLEtBQXJELEVBQTREL0MsT0FBNUQ7QUFDQSxpQkFBS2dELFNBQUwsQ0FBZSwrQkFBZixFQUFnRGhELE9BQWhEO29CQUNlQSxPIiwiZmlsZSI6IlNEYXRhLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IEJhc2UgZnJvbSAnLi9CYXNlJztcclxuaW1wb3J0IF9TRGF0YU1vZGVsQmFzZSBmcm9tICdhcmdvcy9Nb2RlbHMvX1NEYXRhTW9kZWxCYXNlJztcclxuaW1wb3J0IE1hbmFnZXIgZnJvbSAnYXJnb3MvTW9kZWxzL01hbmFnZXInO1xyXG5pbXBvcnQgRXJyb3JNYW5hZ2VyIGZyb20gJ2FyZ29zL0Vycm9yTWFuYWdlcic7XHJcbmltcG9ydCBNT0RFTF9UWVBFUyBmcm9tICdhcmdvcy9Nb2RlbHMvVHlwZXMnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vTmFtZXMnO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLk1vZGVscy5TYWxlc09yZGVyLlNEYXRhJywgW0Jhc2UsIF9TRGF0YU1vZGVsQmFzZV0sIHtcclxuICBpZDogJ3NhbGVzb3JkZXJfc2RhdGFfbW9kZWwnLFxyXG4gIGNyZWF0ZVF1ZXJ5TW9kZWxzOiBmdW5jdGlvbiBjcmVhdGVRdWVyeU1vZGVscygpIHtcclxuICAgIHJldHVybiBbe1xyXG4gICAgICBuYW1lOiAnbGlzdCcsXHJcbiAgICAgIHF1ZXJ5V2hlcmU6ICdJc1F1b3RlIGVxIGZhbHNlJyxcclxuICAgICAgcXVlcnlPcmRlckJ5OiAnRXJwRG9jdW1lbnREYXRlIGRlc2MsIE9yZGVyRGF0ZSBkZXNjJyxcclxuICAgICAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICAgICAnU2FsZXNPcmRlck51bWJlcicsXHJcbiAgICAgICAgJ0FjY291bnQvQWNjb3VudE5hbWUnLFxyXG4gICAgICAgICdTdGF0dXMnLFxyXG4gICAgICAgICdFcnBFeHRJZCcsXHJcbiAgICAgICAgJ0N1c3RvbWVyUHVyY2hhc2VPcmRlck51bWJlcicsXHJcbiAgICAgICAgJ0RvY0dyYW5kVG90YWwnLCAvLyBEb2N1bWVudCBUb3RhbFxyXG4gICAgICAgICdHcmFuZFRvdGFsJywgLy8gQmFzZSBUb3RhbFxyXG4gICAgICAgICdPcmRlckRhdGUnLFxyXG4gICAgICAgICdDcmVhdGVEYXRlJyxcclxuICAgICAgICAnTW9kaWZ5RGF0ZScsXHJcbiAgICAgICAgJ0N1cnJlbmN5Q29kZScsXHJcbiAgICAgICAgJ0Jhc2VDdXJyZW5jeUNvZGUnLFxyXG4gICAgICAgICdFcnBTYWxlc09yZGVyL0VSUFN0YXR1cycsXHJcbiAgICAgICAgJ0VycFN0YXR1c0RhdGUnLFxyXG4gICAgICAgICdFcnBEb2N1bWVudERhdGUnLFxyXG4gICAgICBdLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnZGV0YWlsJyxcclxuICAgICAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICAgICAnU2FsZXNPcmRlck51bWJlcicsXHJcbiAgICAgICAgJ0VycEV4dElkJyxcclxuICAgICAgICAnQ3VzdG9tZXJQdXJjaGFzZU9yZGVyTnVtYmVyJyxcclxuICAgICAgICAnQWNjb3VudC9BY2NvdW50TmFtZScsXHJcbiAgICAgICAgJ09wcG9ydHVuaXR5L0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICAnUXVvdGUvUXVvdGVOdW1iZXInLFxyXG4gICAgICAgICdDcmVhdGVEYXRlJyxcclxuICAgICAgICAnTW9kaWZ5RGF0ZScsXHJcbiAgICAgICAgJ09yZGVyRGF0ZScsXHJcbiAgICAgICAgJ0R1ZURhdGUnLFxyXG4gICAgICAgICdFcnBEb2N1bWVudERhdGUnLFxyXG4gICAgICAgICdTdGF0dXMnLFxyXG4gICAgICAgICdTdGF0dXNEYXRlJyxcclxuICAgICAgICAnRXJwU2hpcFRvL05hbWUnLFxyXG4gICAgICAgICdFcnBTaGlwVG8vQWRkcmVzcy8qJyxcclxuICAgICAgICAnRXJwQmlsbFRvL05hbWUnLFxyXG4gICAgICAgICdFcnBCaWxsVG8vQWRkcmVzcy8qJyxcclxuICAgICAgICAnRXJwUGF5RnJvbS9BZGRyZXNzLyonLFxyXG4gICAgICAgICdEb2NHcmFuZFRvdGFsJywgLy8gRG9jdW1lbnQgVG90YWxcclxuICAgICAgICAnR3JhbmRUb3RhbCcsIC8vIEJhc2UgVG90YWxcclxuICAgICAgICAnRG9jT3JkZXJUb3RhbCcsXHJcbiAgICAgICAgJ0dyYW5kVG90YWwnLFxyXG4gICAgICAgICdPcmRlclRvdGFsJyxcclxuICAgICAgICAnRXJwUGF5bWVudE1ldGhvZCcsXHJcbiAgICAgICAgJ0VycFBheW1lbnRUZXJtSWQnLFxyXG4gICAgICAgICdFcnBCYWNrT3JkZXJlZCcsXHJcbiAgICAgICAgJ0VycERyb3BTaGlwJyxcclxuICAgICAgICAnRXJwU2hpcEVhcmx5JyxcclxuICAgICAgICAnRXJwSW52b2ljZUltbWVkaWF0ZWx5JyxcclxuICAgICAgICAnRXJwUGFydGlhbFNoaXBBbGxvd2VkJyxcclxuICAgICAgICAnRXJwVGF4RXhlbXB0JyxcclxuICAgICAgICAnQ3VycmVuY3lDb2RlJyxcclxuICAgICAgICAnQmFzZUN1cnJlbmN5Q29kZScsXHJcbiAgICAgICAgJ0VycExvZ2ljYWxJZCcsXHJcbiAgICAgICAgJ0VycEFjY291bnRpbmdFbnRpdHlJZCcsXHJcbiAgICAgICAgJ0V4Y2hhbmdlUmF0ZScsXHJcbiAgICAgICAgJ1N5bmNTdGF0dXMnLFxyXG4gICAgICAgICdBY2NvdW50TWFuYWdlci8qJyxcclxuICAgICAgICAnRXJwTG9jYXRpb24nLFxyXG4gICAgICAgICdXYXJlaG91c2VMb2NhdGlvbi9BZGRyZXNzLyonLFxyXG4gICAgICAgICdXYXJlaG91c2VMb2NhdGlvbi9EZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ0xvY2F0aW9uL0FkZHJlc3MvKicsXHJcbiAgICAgICAgJ0xvY2F0aW9uL0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICAnUmVxdWVzdGVkQnkvTmFtZUxGJyxcclxuICAgICAgICAnQ2Fycmllci9DYXJyaWVyTmFtZScsXHJcbiAgICAgICAgJ0VycFNhbGVzT3JkZXIvRVJQU3RhdHVzJyxcclxuICAgICAgICAnRXJwU3RhdHVzRGF0ZScsXHJcbiAgICAgIF0sXHJcbiAgICAgIHF1ZXJ5SW5jbHVkZTogW1xyXG4gICAgICAgICckcGVybWlzc2lvbnMnLFxyXG4gICAgICBdLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnZWRpdCcsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAgICAgJ1NhbGVzT3JkZXJOdW1iZXInLFxyXG4gICAgICAgICdFcnBFeHRJZCcsXHJcbiAgICAgICAgJ0N1c3RvbWVyUHVyY2hhc2VPcmRlck51bWJlcicsXHJcbiAgICAgICAgJ0FjY291bnQvQWNjb3VudE5hbWUnLFxyXG4gICAgICAgICdPcHBvcnR1bml0eS9EZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ1F1b3RlL1F1b3RlTnVtYmVyJyxcclxuICAgICAgICAnQ3JlYXRlRGF0ZScsXHJcbiAgICAgICAgJ01vZGlmeURhdGUnLFxyXG4gICAgICAgICdPcmRlckRhdGUnLFxyXG4gICAgICAgICdEdWVEYXRlJyxcclxuICAgICAgICAnRXJwRG9jdW1lbnREYXRlJyxcclxuICAgICAgICAnU3RhdHVzJyxcclxuICAgICAgICAnU3RhdHVzRGF0ZScsXHJcbiAgICAgICAgJ0VycFNoaXBUby9BZGRyZXNzLyonLFxyXG4gICAgICAgICdFcnBCaWxsVG8vQWRkcmVzcy8qJyxcclxuICAgICAgICAnRXJwUGF5RnJvbS9BZGRyZXNzLyonLFxyXG4gICAgICAgICdHcmFuZFRvdGFsJyxcclxuICAgICAgICAnT3JkZXJUb3RhbCcsXHJcbiAgICAgICAgJ0VycFBheW1lbnRNZXRob2QnLFxyXG4gICAgICAgICdFcnBQYXltZW50VGVybUlkJyxcclxuICAgICAgICAnRXJwQmFja09yZGVyZWQnLFxyXG4gICAgICAgICdFcnBEcm9wU2hpcCcsXHJcbiAgICAgICAgJ0VycFNoaXBFYXJseScsXHJcbiAgICAgICAgJ0VycEludm9pY2VJbW1lZGlhdGVseScsXHJcbiAgICAgICAgJ0VycFBhcnRpYWxTaGlwQWxsb3dlZCcsXHJcbiAgICAgICAgJ0VycFRheEV4ZW1wdCcsXHJcbiAgICAgICAgJ0N1cnJlbmN5Q29kZScsXHJcbiAgICAgICAgJ0Jhc2VDdXJyZW5jeUNvZGUnLFxyXG4gICAgICAgICdFcnBMb2dpY2FsSWQnLFxyXG4gICAgICAgICdFcnBBY2NvdW50aW5nRW50aXR5SWQnLFxyXG4gICAgICAgICdFeGNoYW5nZVJhdGUnLFxyXG4gICAgICAgICdFcnBTeW5jU3RhdHVzJyxcclxuICAgICAgICAnQWNjb3VudE1hbmFnZXIvKicsXHJcbiAgICAgICAgJ0VycExvY2F0aW9uJyxcclxuICAgICAgICAnV2FyZWhvdXNlTG9jYXRpb24vKicsXHJcbiAgICAgICAgJ0xvY2F0aW9uLyonLFxyXG4gICAgICAgICdSZXF1ZXN0ZWRCeS9OYW1lTEYnLFxyXG4gICAgICAgICdDYXJyaWVyLyonLFxyXG4gICAgICBdLFxyXG4gICAgICBxdWVyeUluY2x1ZGU6IFtcclxuICAgICAgICAnJHBlcm1pc3Npb25zJyxcclxuICAgICAgXSxcclxuICAgIH1dO1xyXG4gIH0sXHJcbiAgaXNDbG9zZWQ6IGZ1bmN0aW9uIGlzQ2xvc2VkKCRrZXksIG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgU2FnZS5TRGF0YS5DbGllbnQuU0RhdGFTZXJ2aWNlT3BlcmF0aW9uUmVxdWVzdChBcHAuZ2V0U2VydmljZSgpKVxyXG4gICAgICAuc2V0UmVzb3VyY2VLaW5kKHRoaXMucmVzb3VyY2VLaW5kKVxyXG4gICAgICAuc2V0T3BlcmF0aW9uTmFtZSgnaXNDbG9zZWQnKTtcclxuICAgIGNvbnN0IGVudHJ5ID0ge1xyXG4gICAgICAkbmFtZTogJ2lzQ2xvc2VkJyxcclxuICAgICAgcmVxdWVzdDoge1xyXG4gICAgICAgIGVudGl0eToge1xyXG4gICAgICAgICAgJGtleSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHJlcXVlc3QuZXhlY3V0ZShlbnRyeSwge1xyXG4gICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB7IHJlc3BvbnNlOiB7IFJlc3VsdCB9IH0gPSBkYXRhO1xyXG4gICAgICAgICAgcmVzb2x2ZShSZXN1bHQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmFpbHVyZTogKHJlc3BvbnNlLCBvKSA9PiB7XHJcbiAgICAgICAgICBFcnJvck1hbmFnZXIuYWRkRXJyb3IocmVzcG9uc2UsIG8sIG9wdGlvbnMsICdmYWlsdXJlJyk7XHJcbiAgICAgICAgICByZWplY3QocmVzcG9uc2UpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBnZXRFbnRyeTogZnVuY3Rpb24gZ2V0RW50cnkoa2V5LCBvcHRpb25zKSB7XHJcbiAgICBjb25zdCByZXN1bHRzJCA9IHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICBjb25zdCBjbG9zZWQkID0gdGhpcy5pc0Nsb3NlZChrZXksIG9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFtyZXN1bHRzJCwgY2xvc2VkJF0pXHJcbiAgICAgIC50aGVuKChbZW50cnksIGNsb3NlZF0pID0+IHtcclxuICAgICAgICBlbnRyeS5Jc0Nsb3NlZCA9IGNsb3NlZDtcclxuICAgICAgICByZXR1cm4gZW50cnk7XHJcbiAgICAgIH0pO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuTWFuYWdlci5yZWdpc3RlcihNT0RFTF9OQU1FUy5TQUxFU09SREVSLCBNT0RFTF9UWVBFUy5TREFUQSwgX19jbGFzcyk7XHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5Nb2RlbHMuU2FsZXNPcmRlci5TRGF0YScsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=