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
import List from './PricingAvailabilityList';
import PricingAvailabilityService from '../../PricingAvailabilityService';
import MODEL_NAMES from '../../Models/Names';

const __class = declare('crm.Integrations.BOE.Views.Locations.SalesOrderItemAvailabilityList', [List], {
  // View Properties
  id: 'locations_salesOrderItemAvailabilityList',
  modelName: MODEL_NAMES.SALESORDERITEM,
  processWarehouse: function processWarehouse(warehouse) {
    const promise = new Promise((resolve) => {
      this._model.updateItemWithWarehouse(this.options.orderItem, warehouse).then((result) => {
        resolve(result);
      });
    });
    return promise;
  },
  getAvailability: function getAvailabilityy() {
    const promise = new Promise((resolve) => {
      if (this.options && this.options.orderItem) {
        PricingAvailabilityService.getOrderItemAvailability(this.options.orderItem).then((entries) => {
          resolve(entries);
        }, () => {
          resolve([]);
        });
      }
    });
    return promise;
  },
});

lang.setObject('icboe.Views.Locations.SalesOrderItemAvailabilityList', __class);
export default __class;
