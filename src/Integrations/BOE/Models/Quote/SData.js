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
import ErrorManager from 'argos/ErrorManager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Integrations.BOE.Models.Quotes.SData', [Base, _SDataModelBase], {
  id: 'quote_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'DocumentDate desc, CreateDate desc',
      querySelect: [
        'QuoteNumber',
        'ErpExtId',
        'Account/AccountName',
        'GrandTotal',
        'DocGrandTotal',
        'CreateDate',
        'ModifyDate',
        'CurrencyCode',
        'BaseCurrencyCode',
        'ErpStatus',
        'StatusDate',
        'Status',
        'DocumentDate',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'QuoteNumber',
        'ErpExtId',
        'Account/AccountName',
        'Account/AccountManager/*',
        'Account/ErpExtId',
        'Opportunity/Description',
        'GrandTotal',
        'CreateDate',
        'ModifyDate',
        'Status',
        'ShipTo/Name',
        'ShipTo/Address/*',
        'BillTo/Name',
        'BillTo/Address/*',
        'PayFrom/Address/*',
        'CurrencyCode',
        'BaseCurrencyCode',
        'Total',
        'DocTotal',
        'DocGrandTotal',
        'RequestedBy/NameLF',
        'ExpectedDeliveryDate',
        'StartDate',
        'EndDate',
        'DocumentDate',
        'Comments',
        'Type',
        'DropShip',
        'ShipEarly',
        'PartialShip',
        'AccountManager/*',
        'CustomerRFQNumber',
        'SalesOrder/*',
        'BillingContact/Address/*',
        'ShippingContact/Address/*',
        'ExchangeRate',
        'ErpLogicalId',
        'ErpAccountingEntityId',
        'SyncStatus',
        'ErpLocation',
        'Warehouse/Address/*',
        'Warehouse/Description',
        'Location/Address/*',
        'Location/Description',
        'Carrier/CarrierName',
        'QuoteItems/*',
        'ErpStatus',
        'StatusDate',
      ],
      queryInclude: [
        '$permissions',
      ],
    }, {
      name: 'edit',
      querySelect: [
        'QuoteNumber',
        'ErpExtId',
        'Account/AccountName',
        'Account/AccountManager/*',
        'Account/ErpExtId',
        'Opportunity/Description',
        'GrandTotal',
        'CreateDate',
        'ModifyDate',
        'Status',
        'ShipTo/Address/*',
        'BillTo/Address/*',
        'PayFrom/Address/*',
        'CurrencyCode',
        'BaseCurrencyCode',
        'Total',
        'RequestedBy/NameLF',
        'ExpectedDeliveryDate',
        'StartDate',
        'EndDate',
        'DocumentDate',
        'Comments',
        'Type',
        'DropShip',
        'ShipEarly',
        'PartialShip',
        'AccountManager/*',
        'CustomerRFQNumber',
        'BillingContact/Address/*',
        'ShippingContact/Address/*',
        'ErpLogicalId',
        'ErpAccountingEntityId',
        'ErpLocation',
        'Warehouse/*',
        'Location/*',
        'Carrier/*',
      ],
      queryInclude: [
        '$permissions',
      ],
    }];
  },
  isClosed: function isClosed($key, options) {
    const request = new Sage.SData.Client.SDataServiceOperationRequest(App.getService())
      .setResourceKind(this.resourceKind)
      .setOperationName('isClosed');
    const entry = {
      $name: 'isClosed',
      request: {
        entity: {
          $key,
        },
      },
    };
    return new Promise((resolve, reject) => {
      request.execute(entry, {
        success: (data) => {
          const { response: { Result } } = data;
          resolve(Result);
        },
        failure: (response, o) => {
          ErrorManager.addError(response, o, options, 'failure');
          reject(response);
        },
      });
    });
  },
  getEntry: function getEntry(key, options) {
    const results$ = this.inherited(arguments);
    const closed$ = this.isClosed(key, options);
    return Promise.all([results$, closed$])
      .then(([entry, closed]) => {
        entry.IsClosed = closed;
        return entry;
      });
  },
});

Manager.register(MODEL_NAMES.QUOTE, MODEL_TYPES.SDATA, __class);
lang.setObject('icboe.Models.Quotes.SData', __class);
export default __class;
