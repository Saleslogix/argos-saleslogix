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