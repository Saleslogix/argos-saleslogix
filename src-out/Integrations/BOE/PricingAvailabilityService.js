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

  var resource = (0, _I18n2.default)('pricingAvailabilityService'); /* Copyright 2017 Infor
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

  var __class = _lang2.default.setObject('crm.Integrations.BOE.PricingAvailabilityService', {

    busyText: resource.busyText,
    checkOrderItemAvailText: resource.checkOrderItemAvailText,
    checkOrderItemPriceText: resource.checkOrderItemPriceText,
    checkQuoteItemPriceText: resource.checkQuoteItemPriceText,
    checkQuoteItemAvailText: resource.checkQuoteItemAvailText,

    _busyIndicator: null,
    createAlertDialog: function createAlertDialog(response) {
      return App.modal.createSimpleDialog({ title: 'alert', content: response, getContent: function getContent() {
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
      var _this = this;

      var promise = new Promise(function (resolve, reject) {
        var request = new Sage.SData.Client.SDataServiceOperationRequest(_this.getService()).setResourceKind('quotes').setOperationName('validateOrderTotal');

        var entry = {
          $name: 'ValidateOrderTotal',
          request: {
            QuoteId: quote.$key
          }
        };
        request.execute(entry, {
          success: function success() {
            resolve(true);
          },
          failure: function failure(result) {
            reject(result); // eslint-disable-line
          }
        });
      });
      return promise;
    },
    validateOrderTotal: function validateOrderTotal(order) {
      var _this2 = this;

      var promise = new Promise(function (resolve, reject) {
        var request = new Sage.SData.Client.SDataServiceOperationRequest(_this2.getService()).setResourceKind('salesOrders').setOperationName('validateOrderTotal');

        var entry = {
          $name: 'ValidateOrderTotal',
          request: {
            SalesOrderId: order.$key
          }
        };
        request.execute(entry, {
          success: function success() {
            resolve(true);
          },
          failure: function failure(result) {
            reject(result); // eslint-disable-line
          }
        });
      });
      return promise;
    },

    getOrderPricing: function getOrderPricing(order) {
      var _this3 = this;

      var options = {
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
      var promise = new Promise(function (resolve, reject) {
        return _this3.validateOrderTotal(order).then(function () {
          _this3.executeRequest(options).then(function (pricingData) {
            resolve(pricingData);
          }, function (error) {
            reject(error);
          });
        }, function (error) {
          reject(error);
        });
      });
      return promise;
    },
    getOrderItemAvailability: function getOrderItemAvailability(orderItem, order, product, quantity) {
      var options = {
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
      var options = {
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
      var options = {
        operationName: 'UpdateLineItemWithWarehouse',
        resourceKind: 'salesOrders',
        requestOptions: {
          entityName: 'SalesOrderItem',
          entityId: orderItem.$key,
          SlxLocationExtID: SlxLocation,
          SlxLocationID: SlxLoacationId,
          ATPDate: ATPDate,
          AvailableQuantity: quantity || 1
        }
      };
      return this.executeRequest(options);
    },
    getQuotePricing: function getQuotePricing(quote) {
      var _this4 = this;

      var options = {
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
      var promise = new Promise(function (resolve, reject) {
        return _this4.validateQuoteTotal(quote).then(function () {
          _this4.executeRequest(options).then(function (pricingData) {
            resolve(pricingData);
          }, function (error) {
            reject(error);
          });
        }, function (error) {
          reject(error);
        });
      });
      return promise;
    },
    getQuoteItemPricing: function getQuoteItemPricing(quoteItem, quote, product, quantity, slxLocation, unitOfMeasure) {
      var options = {
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
      var options = {
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
      var options = {
        operationName: 'UpdateLineItemWithWarehouse',
        resourceKind: 'quotes',
        requestOptions: {
          entityName: 'QuoteItem',
          entityId: quoteItem.$key,
          SlxLocationExtID: SlxLocation,
          SlxLocationID: SlxLoacationId,
          ATPDate: ATPDate,
          AvailableQuantity: quantity || quoteItem.Quantity || 1
        }
      };
      return this.executeRequest(options);
    },
    opportunityRePrice: function opportunityRePrice(opportunity) {
      var options = {
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
      var options = {
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
      var options = {
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
      var promise = new Promise(function (resolve, reject) {
        var data = {};
        if (results && results.Children && results.Children.length) {
          try {
            var item = results.Children[0];
            for (var prop in item.Properties) {
              if (!prop) {
                continue;
              }
              var propName = prop;
              if (propName && propName.search('.') !== -1) {
                propName = propName.split('.')[0];
              }
              var dataItem = {};
              dataItem.propertyName = propName;
              var toDouble = Number.parseFloat(item.Properties[prop]);
              var toDecimal = Number.parseInt(item.Properties[prop], 10);
              if (toDouble) {
                dataItem.type = 'numeric';
                dataItem.value = toDouble;
              } else if (toDecimal) {
                dataItem.type = 'numeric';
                dataItem.value = toDecimal;
              } else {
                var value = item.Properties[prop];
                if (value.search('#') !== -1) {
                  var values = value.split('#');
                  value = values[1];
                  data[dataItem.propertyName + 'Code'] = {
                    propertyName: dataItem.propertyName + 'Code',
                    type: 'text',
                    value: values[0]
                  };
                  dataItem.propertyName = dataItem.propertyName + 'Id';
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
      var promise = new Promise(function (resolve, reject) {
        try {
          var warehouses = [];
          if (result) {
            for (var i = 0; i < result.Children.length; i++) {
              var product = result.Children[i];
              var entity = {};
              for (var key in product.Properties) {
                if (key !== 'ProductCode') {
                  if (key.indexOf('.') > 0 && key.indexOf('ErpExtId') > 0) {
                    var propName = key.split('.');
                    var extId = product.Properties[key].split('#');
                    entity[propName[0]] = extId[0];
                    entity[propName[0] + 'ID'] = extId[1];
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
      var _this5 = this;

      var promise = new Promise(function (resolve, reject) {
        _this5.showBusy(options.description);
        var entry = {
          $name: options.operationName,
          request: {
            options: JSON.stringify(options.requestOptions)
          }
        };
        if (executeOptions) {
          entry = executeOptions;
        }
        var request = _this5.getRequest(options);
        request.execute(entry, {
          success: function success(data) {
            _this5.hideBusy();
            var result = '';
            try {
              result = data && data.response && data.response.Result ? JSON.parse(data.response.Result) : '';
              if (options.transform) {
                var _resolve = resolve;
                options.transform.call(_this5, result).then(function (tfdata) {
                  _resolve(tfdata);
                });
              } else {
                resolve(result);
              }
            } catch (error) {
              reject(error);
              _this5.hideBusy();
              _this5.createAlertDialog(error);
              console.log(error); // eslint-disable-line
            }
          },
          failure: function failure(error) {
            _this5.hideBusy();
            var response = JSON.parse(error.response)[0];
            _this5.createAlertDialog(response.message);
            reject(response);
          }
        });
      });
      return promise;
    },
    getRequest: function getRequest(options) {
      var request = new Sage.SData.Client.SDataServiceOperationRequest(this.getService()).setResourceKind(options.resourceKind).setOperationName(options.operationName);
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