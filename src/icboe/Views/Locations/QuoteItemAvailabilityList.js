import declare from 'dojo/_base/declare';
import List from './PricingAvailabilityList';
import PricingAvailabilityService from '../../PricingAvailabilityService';
import MODEL_NAMES from '../../Models/Names';

const __class = declare('icboe.Views.Locations.QuoteItemAvailabilityList', [List], {
  // View Properties
  id: 'locations_quoteItemAvailabilityList',
  modelName: MODEL_NAMES.QUOTEITEM,
  processWarehouse: function processWarehouse(warehouse) {
    const promise = new Promise((resolve) => {
      this._model.updateItemWithWarehouse(this.options.quoteItem, warehouse).then((result) => {
        resolve(result);
      });
    });
    return promise;
  },
  getAvailability: function getAvailability() {
    const promise = new Promise((resolve) => {
      if (this.options && this.options.quoteItem) {
        PricingAvailabilityService.getQuoteItemAvailability(this.options.quoteItem).then((entries) => {
          resolve(entries);
        }, () => {
          resolve([]);
        });
      }
    });
    return promise;
  },
});

export default __class;
