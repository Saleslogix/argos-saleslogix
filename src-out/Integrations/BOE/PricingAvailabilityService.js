define('crm/Integrations/BOE/PricingAvailabilityService', ['module', 'exports', 'dojo/_base/lang', 'argos/Dialogs/BusyIndicator', 'argos/I18n'], function (module, exports, _lang, _BusyIndicator, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _lang2 = _interopRequireDefault(_lang);

  var _BusyIndicator2 = _interopRequireDefault(_BusyIndicator);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  const resource = (0, _I18n2.default)('pricingAvailabilityService'); /* Copyright 2017 Infor
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

  const __class = _lang2.default.setObject('crm.Integrations.BOE.PricingAvailabilityService', {

    busyText: resource.busyText,
    checkOrderItemAvailText: resource.checkOrderItemAvailText,
    checkOrderItemPriceText: resource.checkOrderItemPriceText,
    checkQuoteItemPriceText: resource.checkQuoteItemPriceText,
    checkQuoteItemAvailText: resource.checkQuoteItemAvailText,

    _busyIndicator: null,
    createAlertDialog: function createAlertDialog(response) {
      return App.modal.createSimpleDialog({ title: 'alert', content: response, getContent: () => {
          return;
        }, leftButton: 'cancel', rightButton: 'confirm' });
    },
    hideBusy: function hideBusy() {
      App.modal.disableClose = false;
      App.modal.showToolbar = true;
      this._busyIndicator.complete(true);
      App.modal.hide();
    },
    showBusy: function showBusy(desc) {
      if (!this._busyIndicator || this._busyIndicator._destroyed) {
        this._busyIndicator = new _BusyIndicator2.default({
          id: 'pricingavialability-busyIndicator',
          label: desc || this.busyText
        });
      }
      this._busyIndicator.start();
      App.modal.disableClose = true;
      App.modal.showToolbar = false;
      App.modal.add(this._busyIndicator);
    },
    validateQuoteTotal: function validateQuoteTotal(quote) {
      const promise = new Promise((resolve, reject) => {
        const request = new Sage.SData.Client.SDataServiceOperationRequest(this.getService()).setResourceKind('quotes').setOperationName('validateOrderTotal');

        const entry = {
          $name: 'ValidateOrderTotal',
          request: {
            QuoteId: quote.$key
          }
        };
        request.execute(entry, {
          success: () => {
            resolve(true);
          },
          failure: result => {
            reject(result); // eslint-disable-line
          }
        });
      });
      return promise;
    },
    validateOrderTotal: function validateOrderTotal(order) {
      const promise = new Promise((resolve, reject) => {
        const request = new Sage.SData.Client.SDataServiceOperationRequest(this.getService()).setResourceKind('salesOrders').setOperationName('validateOrderTotal');

        const entry = {
          $name: 'ValidateOrderTotal',
          request: {
            SalesOrderId: order.$key
          }
        };
        request.execute(entry, {
          success: () => {
            resolve(true);
          },
          failure: result => {
            reject(result); // eslint-disable-line
          }
        });
      });
      return promise;
    },

    getOrderPricing: function getOrderPricing(order) {
      const options = {
        resourceKind: 'salesOrders',
        operationName: 'requestPricingAvailability',
        requestOptions: {
          childEntityName: 'SalesOrderItem',
          entityName: 'SalesOrder',
          entityId: order.$key,
          serviceName: 'OrderTotal'
        },
        transform: this.transformPricing
      };
      const promise = new Promise((resolve, reject) => {
        return this.validateOrderTotal(order).then(() => {
          this.executeRequest(options).then(pricingData => {
            resolve(pricingData);
          }, error => {
            reject(error);
          });
        }, error => {
          reject(error);
        });
      });
      return promise;
    },
    getOrderItemAvailability: function getOrderItemAvailability(orderItem, order, product, quantity) {
      const options = {
        resourceKind: 'salesOrders',
        operationName: 'requestPricingAvailability',
        description: this.checkOrderItemAvailText,
        requestOptions: {
          childEntityIds: orderItem.$key,
          childEntityName: 'SalesOrderItem',
          entityName: 'SalesOrder',
          quantity: quantity ? quantity : orderItem.Quantity || 1,
          entityId: order ? order.$key : orderItem.SalesOrder.$key,
          serviceName: 'AvailableToPromise'
        },
        transform: this.transformAvailability
      };
      return this.executeRequest(options);
    },
    getOrderItemPricing: function getOrderItemPricing(orderItem, order, product, quantity, slxLocation, unitOfMeasure) {
      const options = {
        resourceKind: 'salesOrders',
        operationName: 'requestPricingAvailability',
        description: this.checkOrderItemPriceText,
        requestOptions: {
          childEntityIds: product ? product.$key : orderItem.Product ? orderItem.Product.$key : null, // eslint-disable-line
          childEntityName: 'Product',
          itemEntityName: 'SalesOrderItem',
          entityName: 'SalesOrder',
          entityId: order ? order.$key : orderItem.SalesOrder ? orderItem.SalesOrder.$key : null, // eslint-disable-line
          quantity: quantity ? quantity : orderItem.Quantity || 1,
          unitOfMeasureId: unitOfMeasure ? unitOfMeasure.$key : orderItem.UnitOfMeasure ? orderItem.UnitOfMeasure.$key : null, // eslint-disable-line
          slxLocationId: slxLocation ? slxLocation.$key : orderItem.SlxLocation ? orderItem.SlxLocation.$key : null, // eslint-disable-line
          serviceName: 'OrderLineTotal'
        },
        transform: this.transformPricing
      };
      return this.executeRequest(options);
    },
    updateOrderItemWarehouse: function updateOrderItemWarehouse(orderItem, SlxLocation, SlxLoacationId, ATPDate, quantity) {
      const options = {
        operationName: 'UpdateLineItemWithWarehouse',
        resourceKind: 'salesOrders',
        requestOptions: {
          entityName: 'SalesOrderItem',
          entityId: orderItem.$key,
          SlxLocationExtID: SlxLocation,
          SlxLocationID: SlxLoacationId,
          ATPDate,
          AvailableQuantity: quantity || 1
        }
      };
      return this.executeRequest(options);
    },
    getQuotePricing: function getQuotePricing(quote) {
      const options = {
        resourceKind: 'quotes',
        operationName: 'requestPricingAvailability',
        requestOptions: {
          childEntityName: 'QuoteItem',
          entityName: 'Quote',
          entityId: quote.$key,
          serviceName: 'QuoteOrderTotal'
        },
        transform: this.transformPricing
      };
      const promise = new Promise((resolve, reject) => {
        return this.validateQuoteTotal(quote).then(() => {
          this.executeRequest(options).then(pricingData => {
            resolve(pricingData);
          }, error => {
            reject(error);
          });
        }, error => {
          reject(error);
        });
      });
      return promise;
    },
    getQuoteItemPricing: function getQuoteItemPricing(quoteItem, quote, product, quantity, slxLocation, unitOfMeasure) {
      const options = {
        resourceKind: 'quotes',
        operationName: 'requestPricingAvailability',
        description: this.checkQuoteItemPriceText,
        requestOptions: {
          childEntityIds: product ? product.$key : quoteItem.Product ? quoteItem.Product.$key : null, // eslint-disable-line
          childEntityName: 'Product',
          itemEntityName: 'QuoteItem',
          entityName: 'Quote',
          entityId: quote ? quote.$key : quoteItem.Quote.$key,
          quantity: quantity ? quantity : quoteItem.Quantity || 1,
          unitOfMeasureId: unitOfMeasure ? unitOfMeasure.$key : quoteItem.UnitOfMeasure ? quoteItem.UnitOfMeasure.$key : null, // eslint-disable-line
          slxLocationId: slxLocation ? slxLocation.$key : quoteItem.SlxLocation ? quoteItem.SlxLocation.$key : null, // eslint-disable-line
          serviceName: 'QuoteOrderLineTotal'
        },
        transform: this.transformPricing
      };
      return this.executeRequest(options);
    },
    getQuoteItemAvailability: function getQuoteItemAvailability(quoteItem, quote, product, quantity, unitOfMeasure) {
      const options = {
        resourceKind: 'quotes',
        operationName: 'requestPricingAvailability',
        description: this.checkQuoteItemAvailText,
        requestOptions: {
          childEntityIds: quoteItem.$key,
          childEntityName: 'QuoteItem',
          entityName: 'Quote',
          quantity: quantity ? quantity : quoteItem.Quantity || 1,
          entityId: quote ? quote.$key : quoteItem.Quote.$key,
          unitOfMeasureId: unitOfMeasure ? unitOfMeasure.$key : quoteItem.UnitOfMeasure ? quoteItem.UnitOfMeasure.$key : null, // eslint-disable-line
          serviceName: 'QuoteAvailableToPromise'
        },
        transform: this.transformAvailability
      };
      return this.executeRequest(options);
    },
    updateQuoteItemWarehouse: function updateQuoteItemWarehouse(quoteItem, SlxLocation, SlxLoacationId, ATPDate, quantity) {
      const options = {
        operationName: 'UpdateLineItemWithWarehouse',
        resourceKind: 'quotes',
        requestOptions: {
          entityName: 'QuoteItem',
          entityId: quoteItem.$key,
          SlxLocationExtID: SlxLocation,
          SlxLocationID: SlxLoacationId,
          ATPDate,
          AvailableQuantity: quantity || quoteItem.Quantity || 1
        }
      };
      return this.executeRequest(options);
    },
    opportunityRePrice: function opportunityRePrice(opportunity) {
      const options = {
        operationName: 'RePriceOpportunity',
        resourceKind: 'opportunities',
        requestOptions: {
          entityId: opportunity.$key,
          childEntityName: 'Product',
          itemEntityName: 'OpportunityProduct',
          entityName: 'Opportunity',
          serviceName: 'OpportunityOrderLineTotal'
        }
      };
      return this.executeRequest(options);
    },
    quoteRePrice: function quoteRePrice(quote) {
      const options = {
        operationName: 'RePriceQuote',
        resourceKind: 'quotes',
        requestOptions: {
          entityId: quote.$key,
          childEntityName: 'Product',
          itemEntityName: 'QuoteItem',
          entityName: 'Quote',
          serviceName: 'QuoteOrderLineTotal',
          secondaryServiceName: 'QuoteOrderTotal'
        }
      };
      return this.executeRequest(options);
    },
    salesOrderRePrice: function salesOrderRePrice(saleOrder) {
      const options = {
        operationName: 'RePriceOrder',
        resourceKind: 'salesorders',
        requestOptions: {
          entityId: saleOrder.$key,
          childEntityName: 'Product',
          itemEntityName: 'SalesOrderItem',
          entityName: 'SalesOrder',
          serviceName: 'OrderLineTotal',
          secondaryServiceName: 'OrderTotal'
        }
      };
      return this.executeRequest(options);
    },
    transformPricing: function transformPricing(results) {
      const promise = new Promise((resolve, reject) => {
        const data = {};
        if (results && results.Children && results.Children.length) {
          try {
            const item = results.Children[0];
            for (const prop in item.Properties) {
              if (!prop) {
                continue;
              }
              let propName = prop;
              if (propName && propName.search('.') !== -1) {
                propName = propName.split('.')[0];
              }
              const dataItem = {};
              dataItem.propertyName = propName;
              const toDouble = Number.parseFloat(item.Properties[prop]);
              const toDecimal = Number.parseInt(item.Properties[prop], 10);
              if (toDouble) {
                dataItem.type = 'numeric';
                dataItem.value = toDouble;
              } else if (toDecimal) {
                dataItem.type = 'numeric';
                dataItem.value = toDecimal;
              } else {
                let value = item.Properties[prop];
                if (value.search('#') !== -1) {
                  const values = value.split('#');
                  value = values[1];
                  data[`${dataItem.propertyName}Code`] = {
                    propertyName: `${dataItem.propertyName}Code`,
                    type: 'text',
                    value: values[0]
                  };
                  dataItem.propertyName = `${dataItem.propertyName}Id`;
                }
                dataItem.type = 'text';
                dataItem.value = value;
              }
              data[dataItem.propertyName] = dataItem;
            }
          } catch (err) {
            console.error(err); // eslint-disable-line
            reject(err);
          }
          resolve(data);
        }
      });
      return promise;
    },
    transformAvailability: function transformAvailability(result) {
      const promise = new Promise((resolve, reject) => {
        try {
          const warehouses = [];
          if (result) {
            for (let i = 0; i < result.Children.length; i++) {
              const product = result.Children[i];
              const entity = {};
              for (const key in product.Properties) {
                if (key !== 'ProductCode') {
                  if (key.indexOf('.') > 0 && key.indexOf('ErpExtId') > 0) {
                    const propName = key.split('.');
                    const extId = product.Properties[key].split('#');
                    entity[propName[0]] = extId[0];
                    entity[`${propName[0]}ID`] = extId[1];
                  } else {
                    entity[key] = product.Properties[key];
                  }
                }
              }
              entity.$key = entity.SlxLocation;
              warehouses.push(entity);
            }
          }
          resolve(warehouses);
        } catch (error) {
          reject(error);
        }
      });
      return promise;
    },
    executeRequest: function executeRequest(options, executeOptions) {
      const promise = new Promise((resolve, reject) => {
        this.showBusy(options.description);
        let entry = {
          $name: options.operationName,
          request: {
            options: JSON.stringify(options.requestOptions)
          }
        };
        if (executeOptions) {
          entry = executeOptions;
        }
        const request = this.getRequest(options);
        request.execute(entry, {
          success: data => {
            this.hideBusy();
            let result = '';
            try {
              result = data && data.response && data.response.Result ? JSON.parse(data.response.Result) : '';
              if (options.transform) {
                const _resolve = resolve;
                options.transform.call(this, result).then(tfdata => {
                  _resolve(tfdata);
                });
              } else {
                resolve(result);
              }
            } catch (error) {
              reject(error);
              this.hideBusy();
              this.createAlertDialog(error);
              console.log(error); // eslint-disable-line
            }
          },
          failure: error => {
            this.hideBusy();
            const response = JSON.parse(error.response)[0];
            this.createAlertDialog(response.message);
            reject(response);
          }
        });
      });
      return promise;
    },
    getRequest: function getRequest(options) {
      const request = new Sage.SData.Client.SDataServiceOperationRequest(this.getService()).setResourceKind(options.resourceKind).setOperationName(options.operationName);
      return request;
    },
    getService: function getService() {
      return App.getService(false);
    }
  });

  _lang2.default.setObject('icboe.PricingAvailabilityService', __class);
  exports.default = __class;
  module.exports = exports['default'];
});