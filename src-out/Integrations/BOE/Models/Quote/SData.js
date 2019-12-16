define('crm/Integrations/BOE/Models/Quote/SData', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/ErrorManager', 'argos/Models/Types', '../Names'], function (module, exports, _declare, _lang, _Base, _SDataModelBase2, _Manager, _ErrorManager, _Types, _Names) {
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.Quotes.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'quote_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'DocumentDate desc, CreateDate desc',
        querySelect: ['QuoteNumber', 'ErpExtId', 'Account/AccountName', 'GrandTotal', 'DocGrandTotal', 'CreateDate', 'ModifyDate', 'CurrencyCode', 'BaseCurrencyCode', 'ErpStatus', 'StatusDate', 'Status', 'DocumentDate']
      }, {
        name: 'detail',
        querySelect: ['QuoteNumber', 'ErpExtId', 'Account/AccountName', 'Account/AccountManager/*', 'Account/ErpExtId', 'Opportunity/Description', 'GrandTotal', 'CreateDate', 'ModifyDate', 'Status', 'ShipTo/Name', 'ShipTo/Address/*', 'BillTo/Name', 'BillTo/Address/*', 'PayFrom/Address/*', 'CurrencyCode', 'BaseCurrencyCode', 'Total', 'DocTotal', 'DocGrandTotal', 'RequestedBy/NameLF', 'ExpectedDeliveryDate', 'StartDate', 'EndDate', 'DocumentDate', 'Comments', 'Type', 'DropShip', 'ShipEarly', 'PartialShip', 'AccountManager/*', 'CustomerRFQNumber', 'SalesOrder/*', 'BillingContact/Address/*', 'ShippingContact/Address/*', 'ExchangeRate', 'ErpLogicalId', 'ErpAccountingEntityId', 'SyncStatus', 'ErpLocation', 'Warehouse/Address/*', 'Warehouse/Description', 'Location/Address/*', 'Location/Description', 'Carrier/CarrierName', 'QuoteItems/*', 'ErpStatus', 'StatusDate'],
        queryInclude: ['$permissions']
      }, {
        name: 'edit',
        querySelect: ['QuoteNumber', 'ErpExtId', 'Account/AccountName', 'Account/AccountManager/*', 'Account/ErpExtId', 'Opportunity/Description', 'GrandTotal', 'CreateDate', 'ModifyDate', 'Status', 'ShipTo/Address/*', 'BillTo/Address/*', 'PayFrom/Address/*', 'CurrencyCode', 'BaseCurrencyCode', 'Total', 'RequestedBy/NameLF', 'ExpectedDeliveryDate', 'StartDate', 'EndDate', 'DocumentDate', 'Comments', 'Type', 'DropShip', 'ShipEarly', 'PartialShip', 'AccountManager/*', 'CustomerRFQNumber', 'BillingContact/Address/*', 'ShippingContact/Address/*', 'ErpLogicalId', 'ErpAccountingEntityId', 'ErpLocation', 'Warehouse/*', 'Location/*', 'Carrier/*'],
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

  _Manager2.default.register(_Names2.default.QUOTE, _Types2.default.SDATA, __class);
  _lang2.default.setObject('icboe.Models.Quotes.SData', __class);
  exports.default = __class;
  module.exports = exports['default'];
});