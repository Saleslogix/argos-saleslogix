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
import PricingAvailabilityService from '../../PricingAvailabilityService';

const __class = declare('crm.Integrations.BOE.Models.QuoteItem.SData', [Base, _SDataModelBase], {
  id: 'quoteitem_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'ErpLineNumber',
      querySelect: [
        'Description',
        'ErpLineNumber',
        'ErpLineTotalAmount',
        'ErpStatus',
        'ErpStatusDate',
        'Quantity',
        'Price',
        'ExtendedPrice',
        'DocExtendedPrice',
        'CalculatedPrice',
        'DocCalculatedPrice',
        'DocTotalAmount',
        'ErpUnitPrice',
        'ProductName',
        'CreateDate',
        'ModifyDate',
        'Quote/ErpLogicalId',
        'Quote/QuoteNumber',
        'Quote/CurrencyCode',
        'Quote/BaseCurrencyCode',
        'SlxLocation/Description',
        'Product/Name',
        'UnitOfMeasure/*',
        'SlxLocation/*',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'Description',
        'ErpLineNumber',
        'ExtendedPrice',
        'ActualId',
        'Discount',
        'CalculatedPrice',
        'Status',
        'Quantity',
        'Price',
        'ExtendedPrice',
        'DocExtendedPrice',
        'CalculatedPrice',
        'DocTotalAmount',
        'DocCalculatedPrice',
        'ProductName',
        'CreateDate',
        'ModifyDate',
        'Quote/QuoteNumber',
        'OpenQuantity',
        'DropShip',
        'FixedPrice',
        'RushRequest',
        'Quote/CurrencyCode',
        'Quote/BaseCurrencyCode',
        'Quote/ErpLogicalId',
        'Product/*',
        'UnitOfMeasure/*',
        'SlxLocation/*',
        'Product/Name',
      ],
      queryInclude: [
        '$permissions',
      ],
    }, {
      name: 'edit',
      querySelect: [
        'Description',
        'ExtendedPrice',
        'ActualId',
        'Discount',
        'CalculatedPrice',
        'Status',
        'Quantity',
        'Price',
        'ExtendedPrice',
        'DocExtendedPrice',
        'CalculatedPrice',
        'DocCalculatedPrice',
        'DocTotalAmount',
        'ProductName',
        'CreateDate',
        'ModifyDate',
        'Quote/QuoteNumber',
        'Quote/ErpLogicalId',
        'OpenQuantity',
        'DropShip',
        'FixedPrice',
        'RushRequest',
        'Quote/CurrencyCode',
        'Quote/BaseCurrencyCode',
        'Product/*',
        'UnitOfMeasure/*',
        'SlxLocation/*',
      ],
      queryInclude: [
        '$permissions',
      ],
    },
    ];
  },
  updateItemWithWarehouse: function updateItemWithWarehouse(quoteItem, warehouse) {
    const promise = new Promise((resolve) => {
      PricingAvailabilityService.updateQuoteItemWarehouse(quoteItem, warehouse.SlxLocation, warehouse.SlxLocationID, warehouse.ATPDate).then(() => {
        quoteItem.SlxLocation = {
          $key: warehouse.SlxLocationID,
          description: warehouse.SlxLocation,
        };
        PricingAvailabilityService.getQuoteItemPricing(quoteItem).then((pricingData) => {
          const entry = this.createPricingEntryForUpdate(quoteItem, pricingData);
          this.updateEntry(entry, { overwrite: true }).then((result) => {
            resolve(result);
          });
        });
      });
    });
    return promise;
  },
  createPricingEntryForUpdate: function createPricingEntryForUpdate(quoteItem, pricingData) {
    const entry = {};
    entry.$key = quoteItem.$key;
    if (pricingData) {
      if (pricingData.DocCalculatedPrice) {
        entry.DocCalculatedPrice = pricingData.DocCalculatedPrice.value;
      }
      if (pricingData.DocExtendedPrice) {
        entry.DocExtendedPrice = pricingData.DocExtendedPrice.value;
      }
      if (pricingData.DocTotalAmount) {
        entry.DocTotalAmount = pricingData.DocTotalAmount.value;
      }
    }
    return entry;
  },
});

Manager.register(MODEL_NAMES.QUOTEITEM, MODEL_TYPES.SDATA, __class);
lang.setObject('icboe.Models.QuoteItem.SData', __class);
export default __class;
