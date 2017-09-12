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

import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Integrations.BOE.Models.ErpInvoice.SData', [Base, _SDataModelBase], {
  id: 'erpinvoice_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'ErpDocumentDate desc, CreateDate desc',
      querySelect: [
        'InvoiceNumber',
        'Account/AccountName',
        'ERPShipTo/BuyerContact/NameLF',
        'ERPShipTo/BuyerContact/Email',
        'ERPShipTo/BuyerContact/Mobile',
        'ERPShipTo/BuyerContact/HomePhone',
        'ERPShipTo/BuyerContact/FirstName',
        'ERPShipTo/BuyerContact/LastName',
        'ERPShipTo/BuyerContact/MiddleName',
        'ErpStatusDate',
        'ModifyDate',
        'ErpStatus',
        'ErpPaymentTermId',
        'ErpTotalBaseAmount',
        'GrandTotal',
        'CurrencyCode',
        'ErpExtendedBaseAmount',
        'ErpExtendedAmount',
        'BaseCurrencyCode',
        'Owner/OwnerDescription',
        'ErpDocumentDate',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'InvoiceNumber',
        'Account/AccountName',
        'GrandTotal',
        'ErpTotalBaseAmount',
        'CurrencyCode',
        'ErpExtendedBaseAmount',
        'ErpExtendedAmount',
        'BaseCurrencyCode',
        'Description',
        'ErpStatus',
        'ErpStatusDate',
        'ErpDocumentDate',
        'ErpPaymentTermId',
        'Owner/OwnerDescription',
        'ErpBillTo/Name',
        'ErpBillTo/MainPhone',
        'ErpBillTo/Address/*',
        'ErpShipTo/Name',
        'ErpShipTo/MainPhone',
        'ErpShipTo/Address/*',
      ],
      queryInclude: [
        '$permissions',
      ],
    },
    ];
  },
});

Manager.register(MODEL_NAMES.ERPINVOICE, MODEL_TYPES.SDATA, __class);
lang.setObject('icboe.Models.ErpInvoice.SData', __class);
export default __class;
