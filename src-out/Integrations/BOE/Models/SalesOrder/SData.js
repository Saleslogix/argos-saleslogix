define("crm/Integrations/BOE/Models/SalesOrder/SData", ["exports", "dojo/_base/declare", "dojo/_base/lang", "./Base", "argos/Models/_SDataModelBase", "argos/Models/Manager", "argos/ErrorManager", "argos/Models/Types", "../Names"], function (_exports, _declare, _lang, _Base, _SDataModelBase2, _Manager, _ErrorManager, _Types, _Names) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _Base = _interopRequireDefault(_Base);
  _SDataModelBase2 = _interopRequireDefault(_SDataModelBase2);
  _Manager = _interopRequireDefault(_Manager);
  _ErrorManager = _interopRequireDefault(_ErrorManager);
  _Types = _interopRequireDefault(_Types);
  _Names = _interopRequireDefault(_Names);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  var __class = (0, _declare["default"])('crm.Integrations.BOE.Models.SalesOrder.SData', [_Base["default"], _SDataModelBase2["default"]], {
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
            _ErrorManager["default"].addError(response, o, options, 'failure');

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

  _Manager["default"].register(_Names["default"].SALESORDER, _Types["default"].SDATA, __class);

  _lang["default"].setObject('icboe.Models.SalesOrder.SData', __class);

  var _default = __class;
  _exports["default"] = _default;
});