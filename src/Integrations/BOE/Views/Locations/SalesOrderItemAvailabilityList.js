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
