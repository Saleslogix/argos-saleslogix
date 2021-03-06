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

const __class = declare('crm.Integrations.BOE.Models.SalesOrderItem.SData', [Base, _SDataModelBase], {
  id: 'salesorderitem_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'ErpLineNumber',
      querySelect: [
        'Description',
        'ErpLineNumber',
        'ExtendedPrice',
        'ErpStatus',
        'ErpStatusDate',
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
        'SlxLocation/Description',
        'SalesOrder/ErpLogicalId',
        'SalesOrder/SalesOrderNumber',
        'Salesorder/CurrencyCode',
        'Salesorder/BaseCurrencyCode',
        'Product/Name',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'Description',
        'ErpLineNumber',
        'ActualID',
        'Discount',
        'ExtendedPrice',
        'DocExtendedPrice',
        'CalculatedPrice',
        'DocCalculatedPrice',
        'DocTotalAmount',
        'ErpStatus',
        'Quantity',
        'Price',
        'ProductName',
        'CreateDate',
        'ModifyDate',
        'SalesOrder/SalesOrderNumber',
        'SalesOrder/CurrencyCode',
        'Salesorder/BaseCurrencyCode',
        'ErpShippedQuantity',
        'ErpOpenQuantity',
        'ErpDropShip',
        'ErpBackOrdered',
        'ErpPartialShipAllowed',
        'ErpFixedPriceItem',
        'ErpRushRequest',
        'ErpSubstituteItem',
        'SalesOrder/ErpLocation',
        'Product/*',
        'SlxLocation/*',
        'UnitOfMeasure/*',
      ],
      queryInclude: [
        '$permissions',
      ],
    }, {
      name: 'edit',
      querySelect: [
        'Description',
        'ErpLineNumber',
        'ErpLineTotalAmount',
        'ActualID',
        'Discount',
        'ErpStatus',
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
        'SalesOrder/SalesOrderNumber',
        'SalesOrder/CurrencyCode',
        'Salesorder/BaseCurrencyCode',
        'ErpShippedQuantity',
        'ErpOpenQuantity',
        'ErpDropShip',
        'ErpBackOrdered',
        'ErpPartialShipAllowed',
        'ErpFixedPriceItem',
        'ErpRushRequest',
        'ErpSubstituteItem',
        'SalesOrder/ErpLocation',
        'Product/*',
        'SlxLocation/*',
        'UnitOfMeasure/*',
      ],
      queryInclude: [
        '$permissions',
      ],
    },
    ];
  },
  updateItemWithWarehouse: function updateItemWithWarehouse(orderItem, warehouse) {
    const promise = new Promise((resolve) => {
      PricingAvailabilityService.updateOrderItemWarehouse(orderItem, warehouse.SlxLocation, warehouse.SlxLocationID, warehouse.ATPDate).then(() => {
        orderItem.SlxLocation = {
          $key: warehouse.SlxLocationID,
          description: warehouse.SlxLocation,
        };
        PricingAvailabilityService.getOrderItemPricing(orderItem).then((pricingData) => {
          const entry = this.createPricingEntryForUpdate(orderItem, pricingData);
          this.updateEntry(entry, { overwrite: true }).then((result) => {
            resolve(result);
          });
        });
      });
    });
    return promise;
  },
  createPricingEntryForUpdate: function createPricingEntryForUpdate(orderItem, pricingData) {
    const entry = {};
    entry.$key = orderItem.$key;
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

Manager.register(MODEL_NAMES.SALESORDERITEM, MODEL_TYPES.SDATA, __class);
lang.setObject('icboe.Models.SalesOrderItem.SData', __class);
export default __class;
