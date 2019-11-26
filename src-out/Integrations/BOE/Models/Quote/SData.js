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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9RdW90ZS9TRGF0YS5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiaWQiLCJjcmVhdGVRdWVyeU1vZGVscyIsIm5hbWUiLCJxdWVyeU9yZGVyQnkiLCJxdWVyeVNlbGVjdCIsInF1ZXJ5SW5jbHVkZSIsImlzQ2xvc2VkIiwiJGtleSIsIm9wdGlvbnMiLCJyZXF1ZXN0IiwiU2FnZSIsIlNEYXRhIiwiQ2xpZW50IiwiU0RhdGFTZXJ2aWNlT3BlcmF0aW9uUmVxdWVzdCIsIkFwcCIsImdldFNlcnZpY2UiLCJzZXRSZXNvdXJjZUtpbmQiLCJyZXNvdXJjZUtpbmQiLCJzZXRPcGVyYXRpb25OYW1lIiwiZW50cnkiLCIkbmFtZSIsImVudGl0eSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZXhlY3V0ZSIsInN1Y2Nlc3MiLCJkYXRhIiwiUmVzdWx0IiwicmVzcG9uc2UiLCJmYWlsdXJlIiwibyIsImFkZEVycm9yIiwiZ2V0RW50cnkiLCJrZXkiLCJyZXN1bHRzJCIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImNsb3NlZCQiLCJhbGwiLCJ0aGVuIiwiY2xvc2VkIiwiSXNDbG9zZWQiLCJyZWdpc3RlciIsIlFVT1RFIiwiU0RBVEEiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLE1BQU1BLFVBQVUsdUJBQVEsMENBQVIsRUFBb0QsMENBQXBELEVBQTZFO0FBQzNGQyxRQUFJLG1CQUR1RjtBQUUzRkMsdUJBQW1CLFNBQVNBLGlCQUFULEdBQTZCO0FBQzlDLGFBQU8sQ0FBQztBQUNOQyxjQUFNLE1BREE7QUFFTkMsc0JBQWMsb0NBRlI7QUFHTkMscUJBQWEsQ0FDWCxhQURXLEVBRVgsVUFGVyxFQUdYLHFCQUhXLEVBSVgsWUFKVyxFQUtYLGVBTFcsRUFNWCxZ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QyxFQUFtQ3ZCLE9BQW5DLEVBQTRDLFNBQTVDO0FBQ0FnQixtQkFBT0ssUUFBUDtBQUNEO0FBUm9CLFNBQXZCO0FBVUQsT0FYTSxDQUFQO0FBWUQsS0FqSjBGO0FBa0ozRkksY0FBVSxTQUFTQSxRQUFULENBQWtCQyxHQUFsQixFQUF1QjFCLE9BQXZCLEVBQWdDO0FBQ3hDLFVBQU0yQixXQUFXLEtBQUtDLFNBQUwsQ0FBZUgsUUFBZixFQUF5QkksU0FBekIsQ0FBakI7QUFDQSxVQUFNQyxVQUFVLEtBQUtoQyxRQUFMLENBQWM0QixHQUFkLEVBQW1CMUIsT0FBbkIsQ0FBaEI7QUFDQSxhQUFPYyxRQUFRaUIsR0FBUixDQUFZLENBQUNKLFFBQUQsRUFBV0csT0FBWCxDQUFaLEVBQ0pFLElBREksQ0FDQyxnQkFBcUI7QUFBQTtBQUFBLFlBQW5CckIsS0FBbUI7QUFBQSxZQUFac0IsTUFBWTs7QUFDekJ0QixjQUFNdUIsUUFBTixHQUFpQkQsTUFBakI7QUFDQSxlQUFPdEIsS0FBUDtBQUNELE9BSkksQ0FBUDtBQUtEO0FBMUowRixHQUE3RSxDQUFoQjs7QUE2SkEsb0JBQVF3QixRQUFSLENBQWlCLGdCQUFZQyxLQUE3QixFQUFvQyxnQkFBWUMsS0FBaEQsRUFBdUQ5QyxPQUF2RDtBQUNBLGlCQUFLK0MsU0FBTCxDQUFlLDJCQUFmLEVBQTRDL0MsT0FBNUM7b0JBQ2VBLE8iLCJmaWxlIjoiU0RhdGEuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgQmFzZSBmcm9tICcuL0Jhc2UnO1xyXG5pbXBvcnQgX1NEYXRhTW9kZWxCYXNlIGZyb20gJ2FyZ29zL01vZGVscy9fU0RhdGFNb2RlbEJhc2UnO1xyXG5pbXBvcnQgTWFuYWdlciBmcm9tICdhcmdvcy9Nb2RlbHMvTWFuYWdlcic7XHJcbmltcG9ydCBFcnJvck1hbmFnZXIgZnJvbSAnYXJnb3MvRXJyb3JNYW5hZ2VyJztcclxuaW1wb3J0IE1PREVMX1RZUEVTIGZyb20gJ2FyZ29zL01vZGVscy9UeXBlcyc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi9OYW1lcyc7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuTW9kZWxzLlF1b3Rlcy5TRGF0YScsIFtCYXNlLCBfU0RhdGFNb2RlbEJhc2VdLCB7XHJcbiAgaWQ6ICdxdW90ZV9zZGF0YV9tb2RlbCcsXHJcbiAgY3JlYXRlUXVlcnlNb2RlbHM6IGZ1bmN0aW9uIGNyZWF0ZVF1ZXJ5TW9kZWxzKCkge1xyXG4gICAgcmV0dXJuIFt7XHJcbiAgICAgIG5hbWU6ICdsaXN0JyxcclxuICAgICAgcXVlcnlPcmRlckJ5OiAnRG9jdW1lbnREYXRlIGRlc2MsIENyZWF0ZURhdGUgZGVzYycsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAgICAgJ1F1b3RlTnVtYmVyJyxcclxuICAgICAgICAnRXJwRXh0SWQnLFxyXG4gICAgICAgICdBY2NvdW50L0FjY291bnROYW1lJyxcclxuICAgICAgICAnR3JhbmRUb3RhbCcsXHJcbiAgICAgICAgJ0RvY0dyYW5kVG90YWwnLFxyXG4gICAgICAgICdDcmVhdGVEYXRlJyxcclxuICAgICAgICAnTW9kaWZ5RGF0ZScsXHJcbiAgICAgICAgJ0N1cnJlbmN5Q29kZScsXHJcbiAgICAgICAgJ0Jhc2VDdXJyZW5jeUNvZGUnLFxyXG4gICAgICAgICdFcnBTdGF0dXMnLFxyXG4gICAgICAgICdTdGF0dXNEYXRlJyxcclxuICAgICAgICAnU3RhdHVzJyxcclxuICAgICAgICAnRG9jdW1lbnREYXRlJyxcclxuICAgICAgXSxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ2RldGFpbCcsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAgICAgJ1F1b3RlTnVtYmVyJyxcclxuICAgICAgICAnRXJwRXh0SWQnLFxyXG4gICAgICAgICdBY2NvdW50L0FjY291bnROYW1lJyxcclxuICAgICAgICAnQWNjb3VudC9BY2NvdW50TWFuYWdlci8qJyxcclxuICAgICAgICAnQWNjb3VudC9FcnBFeHRJZCcsXHJcbiAgICAgICAgJ09wcG9ydHVuaXR5L0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICAnR3JhbmRUb3RhbCcsXHJcbiAgICAgICAgJ0NyZWF0ZURhdGUnLFxyXG4gICAgICAgICdNb2RpZnlEYXRlJyxcclxuICAgICAgICAnU3RhdHVzJyxcclxuICAgICAgICAnU2hpcFRvL05hbWUnLFxyXG4gICAgICAgICdTaGlwVG8vQWRkcmVzcy8qJyxcclxuICAgICAgICAnQmlsbFRvL05hbWUnLFxyXG4gICAgICAgICdCaWxsVG8vQWRkcmVzcy8qJyxcclxuICAgICAgICAnUGF5RnJvbS9BZGRyZXNzLyonLFxyXG4gICAgICAgICdDdXJyZW5jeUNvZGUnLFxyXG4gICAgICAgICdCYXNlQ3VycmVuY3lDb2RlJyxcclxuICAgICAgICAnVG90YWwnLFxyXG4gICAgICAgICdEb2NUb3RhbCcsXHJcbiAgICAgICAgJ0RvY0dyYW5kVG90YWwnLFxyXG4gICAgICAgICdSZXF1ZXN0ZWRCeS9OYW1lTEYnLFxyXG4gICAgICAgICdFeHBlY3RlZERlbGl2ZXJ5RGF0ZScsXHJcbiAgICAgICAgJ1N0YXJ0RGF0ZScsXHJcbiAgICAgICAgJ0VuZERhdGUnLFxyXG4gICAgICAgICdEb2N1bWVudERhdGUnLFxyXG4gICAgICAgICdDb21tZW50cycsXHJcbiAgICAgICAgJ1R5cGUnLFxyXG4gICAgICAgICdEcm9wU2hpcCcsXHJcbiAgICAgICAgJ1NoaXBFYXJseScsXHJcbiAgICAgICAgJ1BhcnRpYWxTaGlwJyxcclxuICAgICAgICAnQWNjb3VudE1hbmFnZXIvKicsXHJcbiAgICAgICAgJ0N1c3RvbWVyUkZRTnVtYmVyJyxcclxuICAgICAgICAnU2FsZXNPcmRlci8qJyxcclxuICAgICAgICAnQmlsbGluZ0NvbnRhY3QvQWRkcmVzcy8qJyxcclxuICAgICAgICAnU2hpcHBpbmdDb250YWN0L0FkZHJlc3MvKicsXHJcbiAgICAgICAgJ0V4Y2hhbmdlUmF0ZScsXHJcbiAgICAgICAgJ0VycExvZ2ljYWxJZCcsXHJcbiAgICAgICAgJ0VycEFjY291bnRpbmdFbnRpdHlJZCcsXHJcbiAgICAgICAgJ1N5bmNTdGF0dXMnLFxyXG4gICAgICAgICdFcnBMb2NhdGlvbicsXHJcbiAgICAgICAgJ1dhcmVob3VzZS9BZGRyZXNzLyonLFxyXG4gICAgICAgICdXYXJlaG91c2UvRGVzY3JpcHRpb24nLFxyXG4gICAgICAgICdMb2NhdGlvbi9BZGRyZXNzLyonLFxyXG4gICAgICAgICdMb2NhdGlvbi9EZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ0NhcnJpZXIvQ2Fycmllck5hbWUnLFxyXG4gICAgICAgICdRdW90ZUl0ZW1zLyonLFxyXG4gICAgICAgICdFcnBTdGF0dXMnLFxyXG4gICAgICAgICdTdGF0dXNEYXRlJyxcclxuICAgICAgXSxcclxuICAgICAgcXVlcnlJbmNsdWRlOiBbXHJcbiAgICAgICAgJyRwZXJtaXNzaW9ucycsXHJcbiAgICAgIF0sXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdlZGl0JyxcclxuICAgICAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICAgICAnUXVvdGVOdW1iZXInLFxyXG4gICAgICAgICdFcnBFeHRJZCcsXHJcbiAgICAgICAgJ0FjY291bnQvQWNjb3VudE5hbWUnLFxyXG4gICAgICAgICdBY2NvdW50L0FjY291bnRNYW5hZ2VyLyonLFxyXG4gICAgICAgICdBY2NvdW50L0VycEV4dElkJyxcclxuICAgICAgICAnT3Bwb3J0dW5pdHkvRGVzY3JpcHRpb24nLFxyXG4gICAgICAgICdHcmFuZFRvdGFsJyxcclxuICAgICAgICAnQ3JlYXRlRGF0ZScsXHJcbiAgICAgICAgJ01vZGlmeURhdGUnLFxyXG4gICAgICAgICdTdGF0dXMnLFxyXG4gICAgICAgICdTaGlwVG8vQWRkcmVzcy8qJyxcclxuICAgICAgICAnQmlsbFRvL0FkZHJlc3MvKicsXHJcbiAgICAgICAgJ1BheUZyb20vQWRkcmVzcy8qJyxcclxuICAgICAgICAnQ3VycmVuY3lDb2RlJyxcclxuICAgICAgICAnQmFzZUN1cnJlbmN5Q29kZScsXHJcbiAgICAgICAgJ1RvdGFsJyxcclxuICAgICAgICAnUmVxdWVzdGVkQnkvTmFtZUxGJyxcclxuICAgICAgICAnRXhwZWN0ZWREZWxpdmVyeURhdGUnLFxyXG4gICAgICAgICdTdGFydERhdGUnLFxyXG4gICAgICAgICdFbmREYXRlJyxcclxuICAgICAgICAnRG9jdW1lbnREYXRlJyxcclxuICAgICAgICAnQ29tbWVudHMnLFxyXG4gICAgICAgICdUeXBlJyxcclxuICAgICAgICAnRHJvcFNoaXAnLFxyXG4gICAgICAgICdTaGlwRWFybHknLFxyXG4gICAgICAgICdQYXJ0aWFsU2hpcCcsXHJcbiAgICAgICAgJ0FjY291bnRNYW5hZ2VyLyonLFxyXG4gICAgICAgICdDdXN0b21lclJGUU51bWJlcicsXHJcbiAgICAgICAgJ0JpbGxpbmdDb250YWN0L0FkZHJlc3MvKicsXHJcbiAgICAgICAgJ1NoaXBwaW5nQ29udGFjdC9BZGRyZXNzLyonLFxyXG4gICAgICAgICdFcnBMb2dpY2FsSWQnLFxyXG4gICAgICAgICdFcnBBY2NvdW50aW5nRW50aXR5SWQnLFxyXG4gICAgICAgICdFcnBMb2NhdGlvbicsXHJcbiAgICAgICAgJ1dhcmVob3VzZS8qJyxcclxuICAgICAgICAnTG9jYXRpb24vKicsXHJcbiAgICAgICAgJ0NhcnJpZXIvKicsXHJcbiAgICAgIF0sXHJcbiAgICAgIHF1ZXJ5SW5jbHVkZTogW1xyXG4gICAgICAgICckcGVybWlzc2lvbnMnLFxyXG4gICAgICBdLFxyXG4gICAgfV07XHJcbiAgfSxcclxuICBpc0Nsb3NlZDogZnVuY3Rpb24gaXNDbG9zZWQoJGtleSwgb3B0aW9ucykge1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBTYWdlLlNEYXRhLkNsaWVudC5TRGF0YVNlcnZpY2VPcGVyYXRpb25SZXF1ZXN0KEFwcC5nZXRTZXJ2aWNlKCkpXHJcbiAgICAgIC5zZXRSZXNvdXJjZUtpbmQodGhpcy5yZXNvdXJjZUtpbmQpXHJcbiAgICAgIC5zZXRPcGVyYXRpb25OYW1lKCdpc0Nsb3NlZCcpO1xyXG4gICAgY29uc3QgZW50cnkgPSB7XHJcbiAgICAgICRuYW1lOiAnaXNDbG9zZWQnLFxyXG4gICAgICByZXF1ZXN0OiB7XHJcbiAgICAgICAgZW50aXR5OiB7XHJcbiAgICAgICAgICAka2V5LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgcmVxdWVzdC5leGVjdXRlKGVudHJ5LCB7XHJcbiAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHsgcmVzcG9uc2U6IHsgUmVzdWx0IH0gfSA9IGRhdGE7XHJcbiAgICAgICAgICByZXNvbHZlKFJlc3VsdCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWlsdXJlOiAocmVzcG9uc2UsIG8pID0+IHtcclxuICAgICAgICAgIEVycm9yTWFuYWdlci5hZGRFcnJvcihyZXNwb25zZSwgbywgb3B0aW9ucywgJ2ZhaWx1cmUnKTtcclxuICAgICAgICAgIHJlamVjdChyZXNwb25zZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGdldEVudHJ5OiBmdW5jdGlvbiBnZXRFbnRyeShrZXksIG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHJlc3VsdHMkID0gdGhpcy5pbmhlcml0ZWQoZ2V0RW50cnksIGFyZ3VtZW50cyk7XHJcbiAgICBjb25zdCBjbG9zZWQkID0gdGhpcy5pc0Nsb3NlZChrZXksIG9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFtyZXN1bHRzJCwgY2xvc2VkJF0pXHJcbiAgICAgIC50aGVuKChbZW50cnksIGNsb3NlZF0pID0+IHtcclxuICAgICAgICBlbnRyeS5Jc0Nsb3NlZCA9IGNsb3NlZDtcclxuICAgICAgICByZXR1cm4gZW50cnk7XHJcbiAgICAgIH0pO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuTWFuYWdlci5yZWdpc3RlcihNT0RFTF9OQU1FUy5RVU9URSwgTU9ERUxfVFlQRVMuU0RBVEEsIF9fY2xhc3MpO1xyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuTW9kZWxzLlF1b3Rlcy5TRGF0YScsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=