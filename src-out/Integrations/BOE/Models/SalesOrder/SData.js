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