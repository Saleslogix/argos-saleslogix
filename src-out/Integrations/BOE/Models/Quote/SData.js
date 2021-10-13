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

  /* Copyright 2017 Infor
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

  const __class = (0, _declare2.default)('crm.Integrations.BOE.Models.Quotes.SData', [_Base2.default, _SDataModelBase3.default], {
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
      const request = new Sage.SData.Client.SDataServiceOperationRequest(App.getService()).setResourceKind(this.resourceKind).setOperationName('isClosed');
      const entry = {
        $name: 'isClosed',
        request: {
          entity: {
            $key
          }
        }
      };
      return new Promise((resolve, reject) => {
        request.execute(entry, {
          success: data => {
            const { response: { Result } } = data;
            resolve(Result);
          },
          failure: (response, o) => {
            _ErrorManager2.default.addError(response, o, options, 'failure');
            reject(response);
          }
        });
      });
    },
    getEntry: function getEntry(key, options) {
      const results$ = this.inherited(getEntry, arguments);
      const closed$ = this.isClosed(key, options);
      return Promise.all([results$, closed$]).then(([entry, closed]) => {
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