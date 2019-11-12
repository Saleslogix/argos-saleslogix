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

  _Manager2.default.register(_Names2.default.QUOTE, _Types2.default.SDATA, __class);
  _lang2.default.setObject('icboe.Models.Quotes.SData', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9RdW90ZS9TRGF0YS5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiaWQiLCJjcmVhdGVRdWVyeU1vZGVscyIsIm5hbWUiLCJxdWVyeU9yZGVyQnkiLCJxdWVyeVNlbGVjdCIsInF1ZXJ5SW5jbHVkZSIsImlzQ2xvc2VkIiwiJGtleSIsIm9wdGlvbnMiLCJyZXF1ZXN0IiwiU2FnZSIsIlNEYXRhIiwiQ2xpZW50IiwiU0RhdGFTZXJ2aWNlT3BlcmF0aW9uUmVxdWVzdCIsIkFwcCIsImdldFNlcnZpY2UiLCJzZXRSZXNvdXJjZUtpbmQiLCJyZXNvdXJjZUtpbmQiLCJzZXRPcGVyYXRpb25OYW1lIiwiZW50cnkiLCIkbmFtZSIsImVudGl0eSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZXhlY3V0ZSIsInN1Y2Nlc3MiLCJkYXRhIiwiUmVzdWx0IiwicmVzcG9uc2UiLCJmYWlsdXJlIiwibyIsImFkZEVycm9yIiwiZ2V0RW50cnkiLCJrZXkiLCJyZXN1bHRzJCIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImNsb3NlZCQiLCJhbGwiLCJ0aGVuIiwiY2xvc2VkIiwiSXNDbG9zZWQiLCJyZWdpc3RlciIsIlFVT1RFIiwiU0RBVEEiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLE1BQU1BLFVBQVUsdUJBQVEsMENBQVIsRUFBb0QsMENBQXBELEVBQTZFO0FBQzNGQyxRQUFJLG1CQUR1RjtBQUUzRkMsdUJBQW1CLFNBQVNBLGlCQUFULEdBQTZCO0FBQzlDLGFBQU8sQ0FBQztBQUNOQyxjQUFNLE1BREE7QUFFTkMsc0JBQWMsb0NBRlI7QUFHTkMscUJBQWEsQ0FDWCxhQURXLEVBRVgsVUFGVyxFQUdYLHFCQUhXLEVBSVgsWUFKVyxFQUtYLGVBTFcsRUFNWCxZQU5XLEVBT1gsWUFQVyxFQVFYLGNBUlcsRUFTWCxrQkFUVyxFQVVYLFdBVlcsRUFXWCxZQVhXLEVBWVgsUUFaVyxFQWFYLGNBYlc7QUFIUCxPQUFELEVBa0JKO0FBQ0RGLGNBQU0sUUFETDtBQUVERSxxQkFBYSxDQUNYLGFBRFcsRUFFWCxVQUZXLEVBR1gscUJBSFcsRUFJWCwwQkFKVyxFQUtYLGtCQUxXLEVBTVgseUJBTlcsRUFPWCxZQVBXLEVBUVgsWUFSVyxFQVNYLFlBVFcsRUFVWCxRQVZXLEVBV1gsYUFYVyxFQVlYLGtCQVpXLEVBYVgsYUFiVyxFQWNYLGtCQWRXLEVBZVgsbUJBZlcsRUFnQlgsY0FoQlcsRUFpQlgsa0JBakJXLEVBa0JYLE9BbEJXLEVBbUJYLFVBbkJXLEVBb0JYLGVBcEJXLEVBcUJYLG9CQXJCVyxFQXNCWCxzQkF0QlcsRUF1QlgsV0F2QlcsRUF3QlgsU0F4QlcsRUF5QlgsY0F6QlcsRUEwQlgsVUExQlcsRUEyQlgsTUEzQlcsRUE0QlgsVUE1QlcsRUE2QlgsV0E3QlcsRUE4QlgsYUE5QlcsRUErQlgsa0JBL0JXLEVBZ0NYLG1CQWhDVyxFQWlDWCxjQWpDVyxFQWtDWCwwQkFsQ1csRUFtQ1gsMkJBbkNXLEVBb0NYLGNBcENXLEVBcUNYLGNBckNXLEVBc0NYLHVCQXRDVyxFQXVDWCxZQXZDVyxFQXdDWCxhQXhDVyxFQXlDWCxxQkF6Q1csRUEwQ1gsdUJBMUNXLEVBMkNYLG9CQTNDVyxFQTRDWCxzQkE1Q1csRUE2Q1gscUJBN0NXLEVBOENYLGNBOUNXLEVBK0NYLFdBL0NXLEVBZ0RYLFlBaERXLENBRlo7QUFvRERDLHNCQUFjLENBQ1osY0FEWTtBQXBEYixPQWxCSSxFQXlFSjtBQUNESCxjQUFNLE1BREw7QUFFREUscUJBQWEsQ0FDWCxhQURXLEVBRVgsVUFGVyxFQUdYLHFCQUhXLEVBSVgsMEJBSlcsRUFLWCxrQkFMVyxFQU1YLHlCQU5XLEVBT1gsWUFQVyxFQVFYLFlBUlcsRUFTWCxZQVRXLEVBVVgsUUFWVyxFQVdYLGtCQVhXLEVBWVgsa0JBWlcsRUFhWCxtQkFiVyxFQWNYLGNBZFcsRUFlWCxrQkFmVyxFQWdCWCxPQWhCVyxFQWlCWCxvQkFqQlcsRUFrQlgsc0JBbEJXLEVBbUJYLFdBbkJXLEVBb0JYLFNBcEJXLEVBcUJYLGNBckJXLEVBc0JYLFVBdEJXLEVBdUJYLE1BdkJXLEVBd0JYLFVBeEJXLEVBeUJYLFdBekJXLEVBMEJYLGFBMUJXLEVBMkJYLGtCQTNCVyxFQTRCWCxtQkE1QlcsRUE2QlgsMEJBN0JXLEVBOEJYLDJCQTlCVyxFQStCWCxjQS9CVyxFQWdDWCx1QkFoQ1csRUFpQ1gsYUFqQ1csRUFrQ1gsYUFsQ1csRUFtQ1gsWUFuQ1csRUFvQ1gsV0FwQ1csQ0FGWjtBQXdDREMsc0JBQWMsQ0FDWixjQURZO0FBeENiLE9BekVJLENBQVA7QUFxSEQsS0F4SDBGO0FBeUgzRkMsY0FBVSxTQUFTQSxRQUFULENBQWtCQyxJQUFsQixFQUF3QkMsT0FBeEIsRUFBaUM7QUFDekMsVUFBTUMsVUFBVSxJQUFJQyxLQUFLQyxLQUFMLENBQVdDLE1BQVgsQ0FBa0JDLDRCQUF0QixDQUFtREMsSUFBSUMsVUFBSixFQUFuRCxFQUNiQyxlQURhLENBQ0csS0FBS0MsWUFEUixFQUViQyxnQkFGYSxDQUVJLFVBRkosQ0FBaEI7QUFHQSxVQUFNQyxRQUFRO0FBQ1pDLGVBQU8sVUFESztBQUVaWCxpQkFBUztBQUNQWSxrQkFBUTtBQUNOZDtBQURNO0FBREQ7QUFGRyxPQUFkO0FBUUEsYUFBTyxJQUFJZSxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDZixnQkFBUWdCLE9BQVIsQ0FBZ0JOLEtBQWhCLEVBQXVCO0FBQ3JCTyxtQkFBUyxpQkFBQ0MsSUFBRCxFQUFVO0FBQUEsZ0JBQ0dDLE1BREgsR0FDZ0JELElBRGhCLENBQ1RFLFFBRFMsQ0FDR0QsTUFESDs7QUFFakJMLG9CQUFRSyxNQUFSO0FBQ0QsV0FKb0I7QUFLckJFLG1CQUFTLGlCQUFDRCxRQUFELEVBQVdFLENBQVgsRUFBaUI7QUFDeEIsbUNBQWFDLFFBQWIsQ0FBc0JILFFBQXRCLEVBQWdDRSxDQUFoQyxFQUFtQ3ZCLE9BQW5DLEVBQTRDLFNBQTVDO0FBQ0FnQixtQkFBT0ssUUFBUDtBQUNEO0FBUm9CLFNBQXZCO0FBVUQsT0FYTSxDQUFQO0FBWUQsS0FqSjBGO0FBa0ozRkksY0FBVSxTQUFTQSxRQUFULENBQWtCQyxHQUFsQixFQUF1QjFCLE9BQXZCLEVBQWdDO0FBQ3hDLFVBQU0yQixXQUFXLEtBQUtDLFNBQUwsQ0FBZUMsU0FBZixDQUFqQjtBQUNBLFVBQU1DLFVBQVUsS0FBS2hDLFFBQUwsQ0FBYzRCLEdBQWQsRUFBbUIxQixPQUFuQixDQUFoQjtBQUNBLGFBQU9jLFFBQVFpQixHQUFSLENBQVksQ0FBQ0osUUFBRCxFQUFXRyxPQUFYLENBQVosRUFDSkUsSUFESSxDQUNDLGdCQUFxQjtBQUFBO0FBQUEsWUFBbkJyQixLQUFtQjtBQUFBLFlBQVpzQixNQUFZOztBQUN6QnRCLGNBQU11QixRQUFOLEdBQWlCRCxNQUFqQjtBQUNBLGVBQU90QixLQUFQO0FBQ0QsT0FKSSxDQUFQO0FBS0Q7QUExSjBGLEdBQTdFLENBQWhCOztBQTZKQSxvQkFBUXdCLFFBQVIsQ0FBaUIsZ0JBQVlDLEtBQTdCLEVBQW9DLGdCQUFZQyxLQUFoRCxFQUF1RDlDLE9BQXZEO0FBQ0EsaUJBQUsrQyxTQUFMLENBQWUsMkJBQWYsRUFBNEMvQyxPQUE1QztvQkFDZUEsTyIsImZpbGUiOiJTRGF0YS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBCYXNlIGZyb20gJy4vQmFzZSc7XHJcbmltcG9ydCBfU0RhdGFNb2RlbEJhc2UgZnJvbSAnYXJnb3MvTW9kZWxzL19TRGF0YU1vZGVsQmFzZSc7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gJ2FyZ29zL01vZGVscy9NYW5hZ2VyJztcclxuaW1wb3J0IEVycm9yTWFuYWdlciBmcm9tICdhcmdvcy9FcnJvck1hbmFnZXInO1xyXG5pbXBvcnQgTU9ERUxfVFlQRVMgZnJvbSAnYXJnb3MvTW9kZWxzL1R5cGVzJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uL05hbWVzJztcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5Nb2RlbHMuUXVvdGVzLlNEYXRhJywgW0Jhc2UsIF9TRGF0YU1vZGVsQmFzZV0sIHtcclxuICBpZDogJ3F1b3RlX3NkYXRhX21vZGVsJyxcclxuICBjcmVhdGVRdWVyeU1vZGVsczogZnVuY3Rpb24gY3JlYXRlUXVlcnlNb2RlbHMoKSB7XHJcbiAgICByZXR1cm4gW3tcclxuICAgICAgbmFtZTogJ2xpc3QnLFxyXG4gICAgICBxdWVyeU9yZGVyQnk6ICdEb2N1bWVudERhdGUgZGVzYywgQ3JlYXRlRGF0ZSBkZXNjJyxcclxuICAgICAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICAgICAnUXVvdGVOdW1iZXInLFxyXG4gICAgICAgICdFcnBFeHRJZCcsXHJcbiAgICAgICAgJ0FjY291bnQvQWNjb3VudE5hbWUnLFxyXG4gICAgICAgICdHcmFuZFRvdGFsJyxcclxuICAgICAgICAnRG9jR3JhbmRUb3RhbCcsXHJcbiAgICAgICAgJ0NyZWF0ZURhdGUnLFxyXG4gICAgICAgICdNb2RpZnlEYXRlJyxcclxuICAgICAgICAnQ3VycmVuY3lDb2RlJyxcclxuICAgICAgICAnQmFzZUN1cnJlbmN5Q29kZScsXHJcbiAgICAgICAgJ0VycFN0YXR1cycsXHJcbiAgICAgICAgJ1N0YXR1c0RhdGUnLFxyXG4gICAgICAgICdTdGF0dXMnLFxyXG4gICAgICAgICdEb2N1bWVudERhdGUnLFxyXG4gICAgICBdLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnZGV0YWlsJyxcclxuICAgICAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICAgICAnUXVvdGVOdW1iZXInLFxyXG4gICAgICAgICdFcnBFeHRJZCcsXHJcbiAgICAgICAgJ0FjY291bnQvQWNjb3VudE5hbWUnLFxyXG4gICAgICAgICdBY2NvdW50L0FjY291bnRNYW5hZ2VyLyonLFxyXG4gICAgICAgICdBY2NvdW50L0VycEV4dElkJyxcclxuICAgICAgICAnT3Bwb3J0dW5pdHkvRGVzY3JpcHRpb24nLFxyXG4gICAgICAgICdHcmFuZFRvdGFsJyxcclxuICAgICAgICAnQ3JlYXRlRGF0ZScsXHJcbiAgICAgICAgJ01vZGlmeURhdGUnLFxyXG4gICAgICAgICdTdGF0dXMnLFxyXG4gICAgICAgICdTaGlwVG8vTmFtZScsXHJcbiAgICAgICAgJ1NoaXBUby9BZGRyZXNzLyonLFxyXG4gICAgICAgICdCaWxsVG8vTmFtZScsXHJcbiAgICAgICAgJ0JpbGxUby9BZGRyZXNzLyonLFxyXG4gICAgICAgICdQYXlGcm9tL0FkZHJlc3MvKicsXHJcbiAgICAgICAgJ0N1cnJlbmN5Q29kZScsXHJcbiAgICAgICAgJ0Jhc2VDdXJyZW5jeUNvZGUnLFxyXG4gICAgICAgICdUb3RhbCcsXHJcbiAgICAgICAgJ0RvY1RvdGFsJyxcclxuICAgICAgICAnRG9jR3JhbmRUb3RhbCcsXHJcbiAgICAgICAgJ1JlcXVlc3RlZEJ5L05hbWVMRicsXHJcbiAgICAgICAgJ0V4cGVjdGVkRGVsaXZlcnlEYXRlJyxcclxuICAgICAgICAnU3RhcnREYXRlJyxcclxuICAgICAgICAnRW5kRGF0ZScsXHJcbiAgICAgICAgJ0RvY3VtZW50RGF0ZScsXHJcbiAgICAgICAgJ0NvbW1lbnRzJyxcclxuICAgICAgICAnVHlwZScsXHJcbiAgICAgICAgJ0Ryb3BTaGlwJyxcclxuICAgICAgICAnU2hpcEVhcmx5JyxcclxuICAgICAgICAnUGFydGlhbFNoaXAnLFxyXG4gICAgICAgICdBY2NvdW50TWFuYWdlci8qJyxcclxuICAgICAgICAnQ3VzdG9tZXJSRlFOdW1iZXInLFxyXG4gICAgICAgICdTYWxlc09yZGVyLyonLFxyXG4gICAgICAgICdCaWxsaW5nQ29udGFjdC9BZGRyZXNzLyonLFxyXG4gICAgICAgICdTaGlwcGluZ0NvbnRhY3QvQWRkcmVzcy8qJyxcclxuICAgICAgICAnRXhjaGFuZ2VSYXRlJyxcclxuICAgICAgICAnRXJwTG9naWNhbElkJyxcclxuICAgICAgICAnRXJwQWNjb3VudGluZ0VudGl0eUlkJyxcclxuICAgICAgICAnU3luY1N0YXR1cycsXHJcbiAgICAgICAgJ0VycExvY2F0aW9uJyxcclxuICAgICAgICAnV2FyZWhvdXNlL0FkZHJlc3MvKicsXHJcbiAgICAgICAgJ1dhcmVob3VzZS9EZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ0xvY2F0aW9uL0FkZHJlc3MvKicsXHJcbiAgICAgICAgJ0xvY2F0aW9uL0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICAnQ2Fycmllci9DYXJyaWVyTmFtZScsXHJcbiAgICAgICAgJ1F1b3RlSXRlbXMvKicsXHJcbiAgICAgICAgJ0VycFN0YXR1cycsXHJcbiAgICAgICAgJ1N0YXR1c0RhdGUnLFxyXG4gICAgICBdLFxyXG4gICAgICBxdWVyeUluY2x1ZGU6IFtcclxuICAgICAgICAnJHBlcm1pc3Npb25zJyxcclxuICAgICAgXSxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ2VkaXQnLFxyXG4gICAgICBxdWVyeVNlbGVjdDogW1xyXG4gICAgICAgICdRdW90ZU51bWJlcicsXHJcbiAgICAgICAgJ0VycEV4dElkJyxcclxuICAgICAgICAnQWNjb3VudC9BY2NvdW50TmFtZScsXHJcbiAgICAgICAgJ0FjY291bnQvQWNjb3VudE1hbmFnZXIvKicsXHJcbiAgICAgICAgJ0FjY291bnQvRXJwRXh0SWQnLFxyXG4gICAgICAgICdPcHBvcnR1bml0eS9EZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ0dyYW5kVG90YWwnLFxyXG4gICAgICAgICdDcmVhdGVEYXRlJyxcclxuICAgICAgICAnTW9kaWZ5RGF0ZScsXHJcbiAgICAgICAgJ1N0YXR1cycsXHJcbiAgICAgICAgJ1NoaXBUby9BZGRyZXNzLyonLFxyXG4gICAgICAgICdCaWxsVG8vQWRkcmVzcy8qJyxcclxuICAgICAgICAnUGF5RnJvbS9BZGRyZXNzLyonLFxyXG4gICAgICAgICdDdXJyZW5jeUNvZGUnLFxyXG4gICAgICAgICdCYXNlQ3VycmVuY3lDb2RlJyxcclxuICAgICAgICAnVG90YWwnLFxyXG4gICAgICAgICdSZXF1ZXN0ZWRCeS9OYW1lTEYnLFxyXG4gICAgICAgICdFeHBlY3RlZERlbGl2ZXJ5RGF0ZScsXHJcbiAgICAgICAgJ1N0YXJ0RGF0ZScsXHJcbiAgICAgICAgJ0VuZERhdGUnLFxyXG4gICAgICAgICdEb2N1bWVudERhdGUnLFxyXG4gICAgICAgICdDb21tZW50cycsXHJcbiAgICAgICAgJ1R5cGUnLFxyXG4gICAgICAgICdEcm9wU2hpcCcsXHJcbiAgICAgICAgJ1NoaXBFYXJseScsXHJcbiAgICAgICAgJ1BhcnRpYWxTaGlwJyxcclxuICAgICAgICAnQWNjb3VudE1hbmFnZXIvKicsXHJcbiAgICAgICAgJ0N1c3RvbWVyUkZRTnVtYmVyJyxcclxuICAgICAgICAnQmlsbGluZ0NvbnRhY3QvQWRkcmVzcy8qJyxcclxuICAgICAgICAnU2hpcHBpbmdDb250YWN0L0FkZHJlc3MvKicsXHJcbiAgICAgICAgJ0VycExvZ2ljYWxJZCcsXHJcbiAgICAgICAgJ0VycEFjY291bnRpbmdFbnRpdHlJZCcsXHJcbiAgICAgICAgJ0VycExvY2F0aW9uJyxcclxuICAgICAgICAnV2FyZWhvdXNlLyonLFxyXG4gICAgICAgICdMb2NhdGlvbi8qJyxcclxuICAgICAgICAnQ2Fycmllci8qJyxcclxuICAgICAgXSxcclxuICAgICAgcXVlcnlJbmNsdWRlOiBbXHJcbiAgICAgICAgJyRwZXJtaXNzaW9ucycsXHJcbiAgICAgIF0sXHJcbiAgICB9XTtcclxuICB9LFxyXG4gIGlzQ2xvc2VkOiBmdW5jdGlvbiBpc0Nsb3NlZCgka2V5LCBvcHRpb25zKSB7XHJcbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhU2VydmljZU9wZXJhdGlvblJlcXVlc3QoQXBwLmdldFNlcnZpY2UoKSlcclxuICAgICAgLnNldFJlc291cmNlS2luZCh0aGlzLnJlc291cmNlS2luZClcclxuICAgICAgLnNldE9wZXJhdGlvbk5hbWUoJ2lzQ2xvc2VkJyk7XHJcbiAgICBjb25zdCBlbnRyeSA9IHtcclxuICAgICAgJG5hbWU6ICdpc0Nsb3NlZCcsXHJcbiAgICAgIHJlcXVlc3Q6IHtcclxuICAgICAgICBlbnRpdHk6IHtcclxuICAgICAgICAgICRrZXksXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICByZXF1ZXN0LmV4ZWN1dGUoZW50cnksIHtcclxuICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgeyByZXNwb25zZTogeyBSZXN1bHQgfSB9ID0gZGF0YTtcclxuICAgICAgICAgIHJlc29sdmUoUmVzdWx0KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhaWx1cmU6IChyZXNwb25zZSwgbykgPT4ge1xyXG4gICAgICAgICAgRXJyb3JNYW5hZ2VyLmFkZEVycm9yKHJlc3BvbnNlLCBvLCBvcHRpb25zLCAnZmFpbHVyZScpO1xyXG4gICAgICAgICAgcmVqZWN0KHJlc3BvbnNlKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZ2V0RW50cnk6IGZ1bmN0aW9uIGdldEVudHJ5KGtleSwgb3B0aW9ucykge1xyXG4gICAgY29uc3QgcmVzdWx0cyQgPSB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgY29uc3QgY2xvc2VkJCA9IHRoaXMuaXNDbG9zZWQoa2V5LCBvcHRpb25zKTtcclxuICAgIHJldHVybiBQcm9taXNlLmFsbChbcmVzdWx0cyQsIGNsb3NlZCRdKVxyXG4gICAgICAudGhlbigoW2VudHJ5LCBjbG9zZWRdKSA9PiB7XHJcbiAgICAgICAgZW50cnkuSXNDbG9zZWQgPSBjbG9zZWQ7XHJcbiAgICAgICAgcmV0dXJuIGVudHJ5O1xyXG4gICAgICB9KTtcclxuICB9LFxyXG59KTtcclxuXHJcbk1hbmFnZXIucmVnaXN0ZXIoTU9ERUxfTkFNRVMuUVVPVEUsIE1PREVMX1RZUEVTLlNEQVRBLCBfX2NsYXNzKTtcclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLk1vZGVscy5RdW90ZXMuU0RhdGEnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19