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
          secondaryServiceName: 'QuoteTotal'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ByaWNpbmdBdmFpbGFiaWxpdHlTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsInNldE9iamVjdCIsImJ1c3lUZXh0IiwiY2hlY2tPcmRlckl0ZW1BdmFpbFRleHQiLCJjaGVja09yZGVySXRlbVByaWNlVGV4dCIsImNoZWNrUXVvdGVJdGVtUHJpY2VUZXh0IiwiY2hlY2tRdW90ZUl0ZW1BdmFpbFRleHQiLCJfYnVzeUluZGljYXRvciIsImNyZWF0ZUFsZXJ0RGlhbG9nIiwicmVzcG9uc2UiLCJBcHAiLCJtb2RhbCIsImNyZWF0ZVNpbXBsZURpYWxvZyIsInRpdGxlIiwiY29udGVudCIsImdldENvbnRlbnQiLCJsZWZ0QnV0dG9uIiwicmlnaHRCdXR0b24iLCJoaWRlQnVzeSIsImRpc2FibGVDbG9zZSIsInNob3dUb29sYmFyIiwiY29tcGxldGUiLCJoaWRlIiwic2hvd0J1c3kiLCJkZXNjIiwiX2Rlc3Ryb3llZCIsImlkIiwibGFiZWwiLCJzdGFydCIsImFkZCIsInZhbGlkYXRlUXVvdGVUb3RhbCIsInF1b3RlIiwicHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVxdWVzdCIsIlNhZ2UiLCJTRGF0YSIsIkNsaWVudCIsIlNEYXRhU2VydmljZU9wZXJhdGlvblJlcXVlc3QiLCJnZXRTZXJ2aWNlIiwic2V0UmVzb3VyY2VLaW5kIiwic2V0T3BlcmF0aW9uTmFtZSIsImVudHJ5IiwiJG5hbWUiLCJRdW90ZUlkIiwiJGtleSIsImV4ZWN1dGUiLCJzdWNjZXNzIiwiZmFpbHVyZSIsInJlc3VsdCIsInZhbGlkYXRlT3JkZXJUb3RhbCIsIm9yZGVyIiwiU2FsZXNPcmRlcklkIiwiZ2V0T3JkZXJQcmljaW5nIiwib3B0aW9ucyIsInJlc291cmNlS2luZCIsIm9wZXJhdGlvbk5hbWUiLCJyZXF1ZXN0T3B0aW9ucyIsImNoaWxkRW50aXR5TmFtZSIsImVudGl0eU5hbWUiLCJlbnRpdHlJZCIsInNlcnZpY2VOYW1lIiwidHJhbnNmb3JtIiwidHJhbnNmb3JtUHJpY2luZyIsInRoZW4iLCJleGVjdXRlUmVxdWVzdCIsInByaWNpbmdEYXRhIiwiZXJyb3IiLCJnZXRPcmRlckl0ZW1BdmFpbGFiaWxpdHkiLCJvcmRlckl0ZW0iLCJwcm9kdWN0IiwicXVhbnRpdHkiLCJkZXNjcmlwdGlvbiIsImNoaWxkRW50aXR5SWRzIiwiUXVhbnRpdHkiLCJTYWxlc09yZGVyIiwidHJhbnNmb3JtQXZhaWxhYmlsaXR5IiwiZ2V0T3JkZXJJdGVtUHJpY2luZyIsInNseExvY2F0aW9uIiwidW5pdE9mTWVhc3VyZSIsIlByb2R1Y3QiLCJpdGVtRW50aXR5TmFtZSIsInVuaXRPZk1lYXN1cmVJZCIsIlVuaXRPZk1lYXN1cmUiLCJzbHhMb2NhdGlvbklkIiwiU2x4TG9jYXRpb24iLCJ1cGRhdGVPcmRlckl0ZW1XYXJlaG91c2UiLCJTbHhMb2FjYXRpb25JZCIsIkFUUERhdGUiLCJTbHhMb2NhdGlvbkV4dElEIiwiU2x4TG9jYXRpb25JRCIsIkF2YWlsYWJsZVF1YW50aXR5IiwiZ2V0UXVvdGVQcmljaW5nIiwiZ2V0UXVvdGVJdGVtUHJpY2luZyIsInF1b3RlSXRlbSIsIlF1b3RlIiwiZ2V0UXVvdGVJdGVtQXZhaWxhYmlsaXR5IiwidXBkYXRlUXVvdGVJdGVtV2FyZWhvdXNlIiwicXVvdGVSZVByaWNlIiwic2Vjb25kYXJ5U2VydmljZU5hbWUiLCJzYWxlc09yZGVyUmVQcmljZSIsInNhbGVPcmRlciIsInJlc3VsdHMiLCJkYXRhIiwiQ2hpbGRyZW4iLCJsZW5ndGgiLCJpdGVtIiwicHJvcCIsIlByb3BlcnRpZXMiLCJwcm9wTmFtZSIsInNlYXJjaCIsInNwbGl0IiwiZGF0YUl0ZW0iLCJwcm9wZXJ0eU5hbWUiLCJ0b0RvdWJsZSIsIk51bWJlciIsInBhcnNlRmxvYXQiLCJ0b0RlY2ltYWwiLCJwYXJzZUludCIsInR5cGUiLCJ2YWx1ZSIsInZhbHVlcyIsImVyciIsImNvbnNvbGUiLCJ3YXJlaG91c2VzIiwiaSIsImVudGl0eSIsImtleSIsImluZGV4T2YiLCJleHRJZCIsInB1c2giLCJleGVjdXRlT3B0aW9ucyIsIkpTT04iLCJzdHJpbmdpZnkiLCJnZXRSZXF1ZXN0IiwiUmVzdWx0IiwicGFyc2UiLCJfcmVzb2x2ZSIsImNhbGwiLCJ0ZmRhdGEiLCJsb2ciLCJtZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQSxNQUFNQSxXQUFXLG9CQUFZLDRCQUFaLENBQWpCLEMsQ0FuQkE7Ozs7Ozs7Ozs7Ozs7OztBQXFCQSxNQUFNQyxVQUFVLGVBQUtDLFNBQUwsQ0FBZSxpREFBZixFQUFrRTs7QUFFaEZDLGNBQVVILFNBQVNHLFFBRjZEO0FBR2hGQyw2QkFBeUJKLFNBQVNJLHVCQUg4QztBQUloRkMsNkJBQXlCTCxTQUFTSyx1QkFKOEM7QUFLaEZDLDZCQUF5Qk4sU0FBU00sdUJBTDhDO0FBTWhGQyw2QkFBeUJQLFNBQVNPLHVCQU44Qzs7QUFRaEZDLG9CQUFnQixJQVJnRTtBQVNoRkMsdUJBQW1CLFNBQVNBLGlCQUFULENBQTJCQyxRQUEzQixFQUFxQztBQUN0RCxhQUFPQyxJQUFJQyxLQUFKLENBQVVDLGtCQUFWLENBQTZCLEVBQUVDLE9BQU8sT0FBVCxFQUFrQkMsU0FBU0wsUUFBM0IsRUFBcUNNLFlBQVksc0JBQU07QUFBRTtBQUFTLFNBQWxFLEVBQW9FQyxZQUFZLFFBQWhGLEVBQTBGQyxhQUFhLFNBQXZHLEVBQTdCLENBQVA7QUFDRCxLQVgrRTtBQVloRkMsY0FBVSxTQUFTQSxRQUFULEdBQW9CO0FBQzVCUixVQUFJQyxLQUFKLENBQVVRLFlBQVYsR0FBeUIsS0FBekI7QUFDQVQsVUFBSUMsS0FBSixDQUFVUyxXQUFWLEdBQXdCLElBQXhCO0FBQ0EsV0FBS2IsY0FBTCxDQUFvQmMsUUFBcEIsQ0FBNkIsSUFBN0I7QUFDQVgsVUFBSUMsS0FBSixDQUFVVyxJQUFWO0FBQ0QsS0FqQitFO0FBa0JoRkMsY0FBVSxTQUFTQSxRQUFULENBQWtCQyxJQUFsQixFQUF3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aEI7O0FBOFlBLGlCQUFLeEMsU0FBTCxDQUFlLGtDQUFmLEVBQW1ERCxPQUFuRDtvQkFDZUEsTyIsImZpbGUiOiJQcmljaW5nQXZhaWxhYmlsaXR5U2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBCdXN5SW5kaWNhdG9yIGZyb20gJ2FyZ29zL0RpYWxvZ3MvQnVzeUluZGljYXRvcic7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3ByaWNpbmdBdmFpbGFiaWxpdHlTZXJ2aWNlJyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gbGFuZy5zZXRPYmplY3QoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLlByaWNpbmdBdmFpbGFiaWxpdHlTZXJ2aWNlJywge1xyXG5cclxuICBidXN5VGV4dDogcmVzb3VyY2UuYnVzeVRleHQsXHJcbiAgY2hlY2tPcmRlckl0ZW1BdmFpbFRleHQ6IHJlc291cmNlLmNoZWNrT3JkZXJJdGVtQXZhaWxUZXh0LFxyXG4gIGNoZWNrT3JkZXJJdGVtUHJpY2VUZXh0OiByZXNvdXJjZS5jaGVja09yZGVySXRlbVByaWNlVGV4dCxcclxuICBjaGVja1F1b3RlSXRlbVByaWNlVGV4dDogcmVzb3VyY2UuY2hlY2tRdW90ZUl0ZW1QcmljZVRleHQsXHJcbiAgY2hlY2tRdW90ZUl0ZW1BdmFpbFRleHQ6IHJlc291cmNlLmNoZWNrUXVvdGVJdGVtQXZhaWxUZXh0LFxyXG5cclxuICBfYnVzeUluZGljYXRvcjogbnVsbCxcclxuICBjcmVhdGVBbGVydERpYWxvZzogZnVuY3Rpb24gY3JlYXRlQWxlcnREaWFsb2cocmVzcG9uc2UpIHtcclxuICAgIHJldHVybiBBcHAubW9kYWwuY3JlYXRlU2ltcGxlRGlhbG9nKHsgdGl0bGU6ICdhbGVydCcsIGNvbnRlbnQ6IHJlc3BvbnNlLCBnZXRDb250ZW50OiAoKSA9PiB7IHJldHVybjsgfSwgbGVmdEJ1dHRvbjogJ2NhbmNlbCcsIHJpZ2h0QnV0dG9uOiAnY29uZmlybScgfSk7XHJcbiAgfSxcclxuICBoaWRlQnVzeTogZnVuY3Rpb24gaGlkZUJ1c3koKSB7XHJcbiAgICBBcHAubW9kYWwuZGlzYWJsZUNsb3NlID0gZmFsc2U7XHJcbiAgICBBcHAubW9kYWwuc2hvd1Rvb2xiYXIgPSB0cnVlO1xyXG4gICAgdGhpcy5fYnVzeUluZGljYXRvci5jb21wbGV0ZSh0cnVlKTtcclxuICAgIEFwcC5tb2RhbC5oaWRlKCk7XHJcbiAgfSxcclxuICBzaG93QnVzeTogZnVuY3Rpb24gc2hvd0J1c3koZGVzYykge1xyXG4gICAgaWYgKCF0aGlzLl9idXN5SW5kaWNhdG9yIHx8IHRoaXMuX2J1c3lJbmRpY2F0b3IuX2Rlc3Ryb3llZCkge1xyXG4gICAgICB0aGlzLl9idXN5SW5kaWNhdG9yID0gbmV3IEJ1c3lJbmRpY2F0b3Ioe1xyXG4gICAgICAgIGlkOiAncHJpY2luZ2F2aWFsYWJpbGl0eS1idXN5SW5kaWNhdG9yJyxcclxuICAgICAgICBsYWJlbDogZGVzYyB8fCB0aGlzLmJ1c3lUZXh0LFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHRoaXMuX2J1c3lJbmRpY2F0b3Iuc3RhcnQoKTtcclxuICAgIEFwcC5tb2RhbC5kaXNhYmxlQ2xvc2UgPSB0cnVlO1xyXG4gICAgQXBwLm1vZGFsLnNob3dUb29sYmFyID0gZmFsc2U7XHJcbiAgICBBcHAubW9kYWwuYWRkKHRoaXMuX2J1c3lJbmRpY2F0b3IpO1xyXG4gIH0sXHJcbiAgdmFsaWRhdGVRdW90ZVRvdGFsOiBmdW5jdGlvbiB2YWxpZGF0ZVF1b3RlVG90YWwocXVvdGUpIHtcclxuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgU2FnZS5TRGF0YS5DbGllbnQuU0RhdGFTZXJ2aWNlT3BlcmF0aW9uUmVxdWVzdCh0aGlzLmdldFNlcnZpY2UoKSlcclxuICAgICAgICAuc2V0UmVzb3VyY2VLaW5kKCdxdW90ZXMnKVxyXG4gICAgICAgIC5zZXRPcGVyYXRpb25OYW1lKCd2YWxpZGF0ZU9yZGVyVG90YWwnKTtcclxuXHJcbiAgICAgIGNvbnN0IGVudHJ5ID0ge1xyXG4gICAgICAgICRuYW1lOiAnVmFsaWRhdGVPcmRlclRvdGFsJyxcclxuICAgICAgICByZXF1ZXN0OiB7XHJcbiAgICAgICAgICBRdW90ZUlkOiBxdW90ZS4ka2V5LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcbiAgICAgIHJlcXVlc3QuZXhlY3V0ZShlbnRyeSwge1xyXG4gICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWlsdXJlOiAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICByZWplY3QocmVzdWx0KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcHJvbWlzZTtcclxuICB9LFxyXG4gIHZhbGlkYXRlT3JkZXJUb3RhbDogZnVuY3Rpb24gdmFsaWRhdGVPcmRlclRvdGFsKG9yZGVyKSB7XHJcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhU2VydmljZU9wZXJhdGlvblJlcXVlc3QodGhpcy5nZXRTZXJ2aWNlKCkpXHJcbiAgICAgICAgLnNldFJlc291cmNlS2luZCgnc2FsZXNPcmRlcnMnKVxyXG4gICAgICAgIC5zZXRPcGVyYXRpb25OYW1lKCd2YWxpZGF0ZU9yZGVyVG90YWwnKTtcclxuXHJcbiAgICAgIGNvbnN0IGVudHJ5ID0ge1xyXG4gICAgICAgICRuYW1lOiAnVmFsaWRhdGVPcmRlclRvdGFsJyxcclxuICAgICAgICByZXF1ZXN0OiB7XHJcbiAgICAgICAgICBTYWxlc09yZGVySWQ6IG9yZGVyLiRrZXksXHJcbiAgICAgICAgfSxcclxuICAgICAgfTtcclxuICAgICAgcmVxdWVzdC5leGVjdXRlKGVudHJ5LCB7XHJcbiAgICAgICAgc3VjY2VzczogKCkgPT4ge1xyXG4gICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhaWx1cmU6IChyZXN1bHQpID0+IHtcclxuICAgICAgICAgIHJlamVjdChyZXN1bHQpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBwcm9taXNlO1xyXG4gIH0sXHJcblxyXG4gIGdldE9yZGVyUHJpY2luZzogZnVuY3Rpb24gZ2V0T3JkZXJQcmljaW5nKG9yZGVyKSB7XHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICByZXNvdXJjZUtpbmQ6ICdzYWxlc09yZGVycycsXHJcbiAgICAgIG9wZXJhdGlvbk5hbWU6ICdyZXF1ZXN0UHJpY2luZ0F2YWlsYWJpbGl0eScsXHJcbiAgICAgIHJlcXVlc3RPcHRpb25zOiB7XHJcbiAgICAgICAgY2hpbGRFbnRpdHlOYW1lOiAnU2FsZXNPcmRlckl0ZW0nLFxyXG4gICAgICAgIGVudGl0eU5hbWU6ICdTYWxlc09yZGVyJyxcclxuICAgICAgICBlbnRpdHlJZDogb3JkZXIuJGtleSxcclxuICAgICAgICBzZXJ2aWNlTmFtZTogJ09yZGVyVG90YWwnLFxyXG4gICAgICB9LFxyXG4gICAgICB0cmFuc2Zvcm06IHRoaXMudHJhbnNmb3JtUHJpY2luZyxcclxuICAgIH07XHJcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZU9yZGVyVG90YWwob3JkZXIpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZXhlY3V0ZVJlcXVlc3Qob3B0aW9ucykudGhlbigocHJpY2luZ0RhdGEpID0+IHtcclxuICAgICAgICAgIHJlc29sdmUocHJpY2luZ0RhdGEpO1xyXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBwcm9taXNlO1xyXG4gIH0sXHJcbiAgZ2V0T3JkZXJJdGVtQXZhaWxhYmlsaXR5OiBmdW5jdGlvbiBnZXRPcmRlckl0ZW1BdmFpbGFiaWxpdHkob3JkZXJJdGVtLCBvcmRlciwgcHJvZHVjdCwgcXVhbnRpdHkpIHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgIHJlc291cmNlS2luZDogJ3NhbGVzT3JkZXJzJyxcclxuICAgICAgb3BlcmF0aW9uTmFtZTogJ3JlcXVlc3RQcmljaW5nQXZhaWxhYmlsaXR5JyxcclxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuY2hlY2tPcmRlckl0ZW1BdmFpbFRleHQsXHJcbiAgICAgIHJlcXVlc3RPcHRpb25zOiB7XHJcbiAgICAgICAgY2hpbGRFbnRpdHlJZHM6IG9yZGVySXRlbS4ka2V5LFxyXG4gICAgICAgIGNoaWxkRW50aXR5TmFtZTogJ1NhbGVzT3JkZXJJdGVtJyxcclxuICAgICAgICBlbnRpdHlOYW1lOiAnU2FsZXNPcmRlcicsXHJcbiAgICAgICAgcXVhbnRpdHk6IChxdWFudGl0eSkgPyBxdWFudGl0eSA6IG9yZGVySXRlbS5RdWFudGl0eSB8fCAxLFxyXG4gICAgICAgIGVudGl0eUlkOiBvcmRlciA/IG9yZGVyLiRrZXkgOiBvcmRlckl0ZW0uU2FsZXNPcmRlci4ka2V5LFxyXG4gICAgICAgIHNlcnZpY2VOYW1lOiAnQXZhaWxhYmxlVG9Qcm9taXNlJyxcclxuICAgICAgfSxcclxuICAgICAgdHJhbnNmb3JtOiB0aGlzLnRyYW5zZm9ybUF2YWlsYWJpbGl0eSxcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhpcy5leGVjdXRlUmVxdWVzdChvcHRpb25zKTtcclxuICB9LFxyXG4gIGdldE9yZGVySXRlbVByaWNpbmc6IGZ1bmN0aW9uIGdldE9yZGVySXRlbVByaWNpbmcob3JkZXJJdGVtLCBvcmRlciwgcHJvZHVjdCwgcXVhbnRpdHksIHNseExvY2F0aW9uLCB1bml0T2ZNZWFzdXJlKSB7XHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICByZXNvdXJjZUtpbmQ6ICdzYWxlc09yZGVycycsXHJcbiAgICAgIG9wZXJhdGlvbk5hbWU6ICdyZXF1ZXN0UHJpY2luZ0F2YWlsYWJpbGl0eScsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmNoZWNrT3JkZXJJdGVtUHJpY2VUZXh0LFxyXG4gICAgICByZXF1ZXN0T3B0aW9uczoge1xyXG4gICAgICAgIGNoaWxkRW50aXR5SWRzOiAocHJvZHVjdCkgPyBwcm9kdWN0LiRrZXkgOiAob3JkZXJJdGVtLlByb2R1Y3QpID8gb3JkZXJJdGVtLlByb2R1Y3QuJGtleSA6IG51bGwsIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICBjaGlsZEVudGl0eU5hbWU6ICdQcm9kdWN0JyxcclxuICAgICAgICBpdGVtRW50aXR5TmFtZTogJ1NhbGVzT3JkZXJJdGVtJyxcclxuICAgICAgICBlbnRpdHlOYW1lOiAnU2FsZXNPcmRlcicsXHJcbiAgICAgICAgZW50aXR5SWQ6IChvcmRlcikgPyBvcmRlci4ka2V5IDogKG9yZGVySXRlbS5TYWxlc09yZGVyKSA/IG9yZGVySXRlbS5TYWxlc09yZGVyLiRrZXkgOiBudWxsLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgICAgcXVhbnRpdHk6IChxdWFudGl0eSkgPyBxdWFudGl0eSA6IG9yZGVySXRlbS5RdWFudGl0eSB8fCAxLFxyXG4gICAgICAgIHVuaXRPZk1lYXN1cmVJZDogKHVuaXRPZk1lYXN1cmUpID8gdW5pdE9mTWVhc3VyZS4ka2V5IDogKG9yZGVySXRlbS5Vbml0T2ZNZWFzdXJlKSA/IG9yZGVySXRlbS5Vbml0T2ZNZWFzdXJlLiRrZXkgOiBudWxsLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgICAgc2x4TG9jYXRpb25JZDogKHNseExvY2F0aW9uKSA/IHNseExvY2F0aW9uLiRrZXkgOiAob3JkZXJJdGVtLlNseExvY2F0aW9uKSA/IG9yZGVySXRlbS5TbHhMb2NhdGlvbi4ka2V5IDogbnVsbCwgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICAgIHNlcnZpY2VOYW1lOiAnT3JkZXJMaW5lVG90YWwnLFxyXG4gICAgICB9LFxyXG4gICAgICB0cmFuc2Zvcm06IHRoaXMudHJhbnNmb3JtUHJpY2luZyxcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhpcy5leGVjdXRlUmVxdWVzdChvcHRpb25zKTtcclxuICB9LFxyXG4gIHVwZGF0ZU9yZGVySXRlbVdhcmVob3VzZTogZnVuY3Rpb24gdXBkYXRlT3JkZXJJdGVtV2FyZWhvdXNlKG9yZGVySXRlbSwgU2x4TG9jYXRpb24sIFNseExvYWNhdGlvbklkLCBBVFBEYXRlLCBxdWFudGl0eSkge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgb3BlcmF0aW9uTmFtZTogJ1VwZGF0ZUxpbmVJdGVtV2l0aFdhcmVob3VzZScsXHJcbiAgICAgIHJlc291cmNlS2luZDogJ3NhbGVzT3JkZXJzJyxcclxuICAgICAgcmVxdWVzdE9wdGlvbnM6IHtcclxuICAgICAgICBlbnRpdHlOYW1lOiAnU2FsZXNPcmRlckl0ZW0nLFxyXG4gICAgICAgIGVudGl0eUlkOiBvcmRlckl0ZW0uJGtleSxcclxuICAgICAgICBTbHhMb2NhdGlvbkV4dElEOiBTbHhMb2NhdGlvbixcclxuICAgICAgICBTbHhMb2NhdGlvbklEOiBTbHhMb2FjYXRpb25JZCxcclxuICAgICAgICBBVFBEYXRlLFxyXG4gICAgICAgIEF2YWlsYWJsZVF1YW50aXR5OiBxdWFudGl0eSB8fCAxLFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGlzLmV4ZWN1dGVSZXF1ZXN0KG9wdGlvbnMpO1xyXG4gIH0sXHJcbiAgZ2V0UXVvdGVQcmljaW5nOiBmdW5jdGlvbiBnZXRRdW90ZVByaWNpbmcocXVvdGUpIHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgIHJlc291cmNlS2luZDogJ3F1b3RlcycsXHJcbiAgICAgIG9wZXJhdGlvbk5hbWU6ICdyZXF1ZXN0UHJpY2luZ0F2YWlsYWJpbGl0eScsXHJcbiAgICAgIHJlcXVlc3RPcHRpb25zOiB7XHJcbiAgICAgICAgY2hpbGRFbnRpdHlOYW1lOiAnUXVvdGVJdGVtJyxcclxuICAgICAgICBlbnRpdHlOYW1lOiAnUXVvdGUnLFxyXG4gICAgICAgIGVudGl0eUlkOiBxdW90ZS4ka2V5LFxyXG4gICAgICAgIHNlcnZpY2VOYW1lOiAnUXVvdGVPcmRlclRvdGFsJyxcclxuICAgICAgfSxcclxuICAgICAgdHJhbnNmb3JtOiB0aGlzLnRyYW5zZm9ybVByaWNpbmcsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVRdW90ZVRvdGFsKHF1b3RlKS50aGVuKCgpID0+IHtcclxuICAgICAgICB0aGlzLmV4ZWN1dGVSZXF1ZXN0KG9wdGlvbnMpLnRoZW4oKHByaWNpbmdEYXRhKSA9PiB7XHJcbiAgICAgICAgICByZXNvbHZlKHByaWNpbmdEYXRhKTtcclxuICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcHJvbWlzZTtcclxuICB9LFxyXG4gIGdldFF1b3RlSXRlbVByaWNpbmc6IGZ1bmN0aW9uIGdldFF1b3RlSXRlbVByaWNpbmcocXVvdGVJdGVtLCBxdW90ZSwgcHJvZHVjdCwgcXVhbnRpdHksIHNseExvY2F0aW9uLCB1bml0T2ZNZWFzdXJlKSB7XHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICByZXNvdXJjZUtpbmQ6ICdxdW90ZXMnLFxyXG4gICAgICBvcGVyYXRpb25OYW1lOiAncmVxdWVzdFByaWNpbmdBdmFpbGFiaWxpdHknLFxyXG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5jaGVja1F1b3RlSXRlbVByaWNlVGV4dCxcclxuICAgICAgcmVxdWVzdE9wdGlvbnM6IHtcclxuICAgICAgICBjaGlsZEVudGl0eUlkczogKHByb2R1Y3QpID8gcHJvZHVjdC4ka2V5IDogKHF1b3RlSXRlbS5Qcm9kdWN0KSA/IHF1b3RlSXRlbS5Qcm9kdWN0LiRrZXkgOiBudWxsLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgICAgY2hpbGRFbnRpdHlOYW1lOiAnUHJvZHVjdCcsXHJcbiAgICAgICAgaXRlbUVudGl0eU5hbWU6ICdRdW90ZUl0ZW0nLFxyXG4gICAgICAgIGVudGl0eU5hbWU6ICdRdW90ZScsXHJcbiAgICAgICAgZW50aXR5SWQ6IChxdW90ZSkgPyBxdW90ZS4ka2V5IDogcXVvdGVJdGVtLlF1b3RlLiRrZXksXHJcbiAgICAgICAgcXVhbnRpdHk6IChxdWFudGl0eSkgPyBxdWFudGl0eSA6IHF1b3RlSXRlbS5RdWFudGl0eSB8fCAxLFxyXG4gICAgICAgIHVuaXRPZk1lYXN1cmVJZDogKHVuaXRPZk1lYXN1cmUpID8gdW5pdE9mTWVhc3VyZS4ka2V5IDogKHF1b3RlSXRlbS5Vbml0T2ZNZWFzdXJlKSA/IHF1b3RlSXRlbS5Vbml0T2ZNZWFzdXJlLiRrZXkgOiBudWxsLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgICAgc2x4TG9jYXRpb25JZDogKHNseExvY2F0aW9uKSA/IHNseExvY2F0aW9uLiRrZXkgOiAocXVvdGVJdGVtLlNseExvY2F0aW9uKSA/IHF1b3RlSXRlbS5TbHhMb2NhdGlvbi4ka2V5IDogbnVsbCwgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICAgIHNlcnZpY2VOYW1lOiAnUXVvdGVPcmRlckxpbmVUb3RhbCcsXHJcbiAgICAgIH0sXHJcbiAgICAgIHRyYW5zZm9ybTogdGhpcy50cmFuc2Zvcm1QcmljaW5nLFxyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGlzLmV4ZWN1dGVSZXF1ZXN0KG9wdGlvbnMpO1xyXG4gIH0sXHJcbiAgZ2V0UXVvdGVJdGVtQXZhaWxhYmlsaXR5OiBmdW5jdGlvbiBnZXRRdW90ZUl0ZW1BdmFpbGFiaWxpdHkocXVvdGVJdGVtLCBxdW90ZSwgcHJvZHVjdCwgcXVhbnRpdHksIHVuaXRPZk1lYXN1cmUpIHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgIHJlc291cmNlS2luZDogJ3F1b3RlcycsXHJcbiAgICAgIG9wZXJhdGlvbk5hbWU6ICdyZXF1ZXN0UHJpY2luZ0F2YWlsYWJpbGl0eScsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmNoZWNrUXVvdGVJdGVtQXZhaWxUZXh0LFxyXG4gICAgICByZXF1ZXN0T3B0aW9uczoge1xyXG4gICAgICAgIGNoaWxkRW50aXR5SWRzOiBxdW90ZUl0ZW0uJGtleSxcclxuICAgICAgICBjaGlsZEVudGl0eU5hbWU6ICdRdW90ZUl0ZW0nLFxyXG4gICAgICAgIGVudGl0eU5hbWU6ICdRdW90ZScsXHJcbiAgICAgICAgcXVhbnRpdHk6IChxdWFudGl0eSkgPyBxdWFudGl0eSA6IHF1b3RlSXRlbS5RdWFudGl0eSB8fCAxLFxyXG4gICAgICAgIGVudGl0eUlkOiAocXVvdGUpID8gcXVvdGUuJGtleSA6IHF1b3RlSXRlbS5RdW90ZS4ka2V5LFxyXG4gICAgICAgIHVuaXRPZk1lYXN1cmVJZDogKHVuaXRPZk1lYXN1cmUpID8gdW5pdE9mTWVhc3VyZS4ka2V5IDogKHF1b3RlSXRlbS5Vbml0T2ZNZWFzdXJlKSA/IHF1b3RlSXRlbS5Vbml0T2ZNZWFzdXJlLiRrZXkgOiBudWxsLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgICAgc2VydmljZU5hbWU6ICdRdW90ZUF2YWlsYWJsZVRvUHJvbWlzZScsXHJcbiAgICAgIH0sXHJcbiAgICAgIHRyYW5zZm9ybTogdGhpcy50cmFuc2Zvcm1BdmFpbGFiaWxpdHksXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoaXMuZXhlY3V0ZVJlcXVlc3Qob3B0aW9ucyk7XHJcbiAgfSxcclxuICB1cGRhdGVRdW90ZUl0ZW1XYXJlaG91c2U6IGZ1bmN0aW9uIHVwZGF0ZVF1b3RlSXRlbVdhcmVob3VzZShxdW90ZUl0ZW0sIFNseExvY2F0aW9uLCBTbHhMb2FjYXRpb25JZCwgQVRQRGF0ZSwgcXVhbnRpdHkpIHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgIG9wZXJhdGlvbk5hbWU6ICdVcGRhdGVMaW5lSXRlbVdpdGhXYXJlaG91c2UnLFxyXG4gICAgICByZXNvdXJjZUtpbmQ6ICdxdW90ZXMnLFxyXG4gICAgICByZXF1ZXN0T3B0aW9uczoge1xyXG4gICAgICAgIGVudGl0eU5hbWU6ICdRdW90ZUl0ZW0nLFxyXG4gICAgICAgIGVudGl0eUlkOiBxdW90ZUl0ZW0uJGtleSxcclxuICAgICAgICBTbHhMb2NhdGlvbkV4dElEOiBTbHhMb2NhdGlvbixcclxuICAgICAgICBTbHhMb2NhdGlvbklEOiBTbHhMb2FjYXRpb25JZCxcclxuICAgICAgICBBVFBEYXRlLFxyXG4gICAgICAgIEF2YWlsYWJsZVF1YW50aXR5OiBxdWFudGl0eSB8fCBxdW90ZUl0ZW0uUXVhbnRpdHkgfHwgMSxcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhpcy5leGVjdXRlUmVxdWVzdChvcHRpb25zKTtcclxuICB9LFxyXG4gIHF1b3RlUmVQcmljZTogZnVuY3Rpb24gcXVvdGVSZVByaWNlKHF1b3RlKSB7XHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICBvcGVyYXRpb25OYW1lOiAnUmVQcmljZVF1b3RlJyxcclxuICAgICAgcmVzb3VyY2VLaW5kOiAncXVvdGVzJyxcclxuICAgICAgcmVxdWVzdE9wdGlvbnM6IHtcclxuICAgICAgICBlbnRpdHlJZDogcXVvdGUuJGtleSxcclxuICAgICAgICBjaGlsZEVudGl0eU5hbWU6ICdQcm9kdWN0JyxcclxuICAgICAgICBpdGVtRW50aXR5TmFtZTogJ1F1b3RlSXRlbScsXHJcbiAgICAgICAgZW50aXR5TmFtZTogJ1F1b3RlJyxcclxuICAgICAgICBzZXJ2aWNlTmFtZTogJ1F1b3RlT3JkZXJMaW5lVG90YWwnLFxyXG4gICAgICAgIHNlY29uZGFyeVNlcnZpY2VOYW1lOiAnUXVvdGVUb3RhbCcsXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoaXMuZXhlY3V0ZVJlcXVlc3Qob3B0aW9ucyk7XHJcbiAgfSxcclxuICBzYWxlc09yZGVyUmVQcmljZTogZnVuY3Rpb24gc2FsZXNPcmRlclJlUHJpY2Uoc2FsZU9yZGVyKSB7XHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICBvcGVyYXRpb25OYW1lOiAnUmVQcmljZU9yZGVyJyxcclxuICAgICAgcmVzb3VyY2VLaW5kOiAnc2FsZXNvcmRlcnMnLFxyXG4gICAgICByZXF1ZXN0T3B0aW9uczoge1xyXG4gICAgICAgIGVudGl0eUlkOiBzYWxlT3JkZXIuJGtleSxcclxuICAgICAgICBjaGlsZEVudGl0eU5hbWU6ICdQcm9kdWN0JyxcclxuICAgICAgICBpdGVtRW50aXR5TmFtZTogJ1NhbGVzT3JkZXJJdGVtJyxcclxuICAgICAgICBlbnRpdHlOYW1lOiAnU2FsZXNPcmRlcicsXHJcbiAgICAgICAgc2VydmljZU5hbWU6ICdPcmRlckxpbmVUb3RhbCcsXHJcbiAgICAgICAgc2Vjb25kYXJ5U2VydmljZU5hbWU6ICdPcmRlclRvdGFsJyxcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhpcy5leGVjdXRlUmVxdWVzdChvcHRpb25zKTtcclxuICB9LFxyXG4gIHRyYW5zZm9ybVByaWNpbmc6IGZ1bmN0aW9uIHRyYW5zZm9ybVByaWNpbmcocmVzdWx0cykge1xyXG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3QgZGF0YSA9IHt9O1xyXG4gICAgICBpZiAocmVzdWx0cyAmJiByZXN1bHRzLkNoaWxkcmVuICYmIHJlc3VsdHMuQ2hpbGRyZW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IGl0ZW0gPSByZXN1bHRzLkNoaWxkcmVuWzBdO1xyXG4gICAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIGl0ZW0uUHJvcGVydGllcykge1xyXG4gICAgICAgICAgICBpZiAoIXByb3ApIHtcclxuICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcHJvcE5hbWUgPSBwcm9wO1xyXG4gICAgICAgICAgICBpZiAocHJvcE5hbWUgJiYgcHJvcE5hbWUuc2VhcmNoKCcuJykgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgcHJvcE5hbWUgPSBwcm9wTmFtZS5zcGxpdCgnLicpWzBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGFJdGVtID0ge307XHJcbiAgICAgICAgICAgIGRhdGFJdGVtLnByb3BlcnR5TmFtZSA9IHByb3BOYW1lO1xyXG4gICAgICAgICAgICBjb25zdCB0b0RvdWJsZSA9IE51bWJlci5wYXJzZUZsb2F0KGl0ZW0uUHJvcGVydGllc1twcm9wXSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRvRGVjaW1hbCA9IE51bWJlci5wYXJzZUludChpdGVtLlByb3BlcnRpZXNbcHJvcF0sIDEwKTtcclxuICAgICAgICAgICAgaWYgKHRvRG91YmxlKSB7XHJcbiAgICAgICAgICAgICAgZGF0YUl0ZW0udHlwZSA9ICdudW1lcmljJztcclxuICAgICAgICAgICAgICBkYXRhSXRlbS52YWx1ZSA9IHRvRG91YmxlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRvRGVjaW1hbCkge1xyXG4gICAgICAgICAgICAgIGRhdGFJdGVtLnR5cGUgPSAnbnVtZXJpYyc7XHJcbiAgICAgICAgICAgICAgZGF0YUl0ZW0udmFsdWUgPSB0b0RlY2ltYWw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgbGV0IHZhbHVlID0gaXRlbS5Qcm9wZXJ0aWVzW3Byb3BdO1xyXG4gICAgICAgICAgICAgIGlmICh2YWx1ZS5zZWFyY2goJyMnKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IHZhbHVlLnNwbGl0KCcjJyk7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlc1sxXTtcclxuICAgICAgICAgICAgICAgIGRhdGFbYCR7ZGF0YUl0ZW0ucHJvcGVydHlOYW1lfUNvZGVgXSA9IHtcclxuICAgICAgICAgICAgICAgICAgcHJvcGVydHlOYW1lOiBgJHtkYXRhSXRlbS5wcm9wZXJ0eU5hbWV9Q29kZWAsXHJcbiAgICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlc1swXSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBkYXRhSXRlbS5wcm9wZXJ0eU5hbWUgPSBgJHtkYXRhSXRlbS5wcm9wZXJ0eU5hbWV9SWRgO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBkYXRhSXRlbS50eXBlID0gJ3RleHQnO1xyXG4gICAgICAgICAgICAgIGRhdGFJdGVtLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGF0YVtkYXRhSXRlbS5wcm9wZXJ0eU5hbWVdID0gZGF0YUl0ZW07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXNvbHZlKGRhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBwcm9taXNlO1xyXG4gIH0sXHJcbiAgdHJhbnNmb3JtQXZhaWxhYmlsaXR5OiBmdW5jdGlvbiB0cmFuc2Zvcm1BdmFpbGFiaWxpdHkocmVzdWx0KSB7XHJcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHdhcmVob3VzZXMgPSBbXTtcclxuICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdC5DaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0ID0gcmVzdWx0LkNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBjb25zdCBlbnRpdHkgPSB7fTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gcHJvZHVjdC5Qcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGtleSAhPT0gJ1Byb2R1Y3RDb2RlJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleS5pbmRleE9mKCcuJykgPiAwICYmIGtleS5pbmRleE9mKCdFcnBFeHRJZCcpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBwcm9wTmFtZSA9IGtleS5zcGxpdCgnLicpO1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBleHRJZCA9IHByb2R1Y3QuUHJvcGVydGllc1trZXldLnNwbGl0KCcjJyk7XHJcbiAgICAgICAgICAgICAgICAgIGVudGl0eVtwcm9wTmFtZVswXV0gPSBleHRJZFswXTtcclxuICAgICAgICAgICAgICAgICAgZW50aXR5W2Ake3Byb3BOYW1lWzBdfUlEYF0gPSBleHRJZFsxXTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGVudGl0eVtrZXldID0gcHJvZHVjdC5Qcm9wZXJ0aWVzW2tleV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVudGl0eS4ka2V5ID0gZW50aXR5LlNseExvY2F0aW9uO1xyXG4gICAgICAgICAgICB3YXJlaG91c2VzLnB1c2goZW50aXR5KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzb2x2ZSh3YXJlaG91c2VzKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBwcm9taXNlO1xyXG4gIH0sXHJcbiAgZXhlY3V0ZVJlcXVlc3Q6IGZ1bmN0aW9uIGV4ZWN1dGVSZXF1ZXN0KG9wdGlvbnMsIGV4ZWN1dGVPcHRpb25zKSB7XHJcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0aGlzLnNob3dCdXN5KG9wdGlvbnMuZGVzY3JpcHRpb24pO1xyXG4gICAgICBsZXQgZW50cnkgPSB7XHJcbiAgICAgICAgJG5hbWU6IG9wdGlvbnMub3BlcmF0aW9uTmFtZSxcclxuICAgICAgICByZXF1ZXN0OiB7XHJcbiAgICAgICAgICBvcHRpb25zOiBKU09OLnN0cmluZ2lmeShvcHRpb25zLnJlcXVlc3RPcHRpb25zKSxcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG4gICAgICBpZiAoZXhlY3V0ZU9wdGlvbnMpIHtcclxuICAgICAgICBlbnRyeSA9IGV4ZWN1dGVPcHRpb25zO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSB0aGlzLmdldFJlcXVlc3Qob3B0aW9ucyk7XHJcbiAgICAgIHJlcXVlc3QuZXhlY3V0ZShlbnRyeSwge1xyXG4gICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmhpZGVCdXN5KCk7XHJcbiAgICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSAoZGF0YSAmJiBkYXRhLnJlc3BvbnNlICYmIGRhdGEucmVzcG9uc2UuUmVzdWx0KSA/IEpTT04ucGFyc2UoZGF0YS5yZXNwb25zZS5SZXN1bHQpIDogJyc7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnRyYW5zZm9ybSkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IF9yZXNvbHZlID0gcmVzb2x2ZTtcclxuICAgICAgICAgICAgICBvcHRpb25zLnRyYW5zZm9ybS5jYWxsKHRoaXMsIHJlc3VsdCkudGhlbigodGZkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBfcmVzb2x2ZSh0ZmRhdGEpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgdGhpcy5oaWRlQnVzeSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFsZXJ0RGlhbG9nKGVycm9yKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWlsdXJlOiAoZXJyb3IpID0+IHtcclxuICAgICAgICAgIHRoaXMuaGlkZUJ1c3koKTtcclxuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gSlNPTi5wYXJzZShlcnJvci5yZXNwb25zZSlbMF07XHJcbiAgICAgICAgICB0aGlzLmNyZWF0ZUFsZXJ0RGlhbG9nKHJlc3BvbnNlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgcmVqZWN0KHJlc3BvbnNlKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfSxcclxuICBnZXRSZXF1ZXN0OiBmdW5jdGlvbiBnZXRSZXF1ZXN0KG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgU2FnZS5TRGF0YS5DbGllbnQuU0RhdGFTZXJ2aWNlT3BlcmF0aW9uUmVxdWVzdCh0aGlzLmdldFNlcnZpY2UoKSlcclxuICAgICAgLnNldFJlc291cmNlS2luZChvcHRpb25zLnJlc291cmNlS2luZClcclxuICAgICAgLnNldE9wZXJhdGlvbk5hbWUob3B0aW9ucy5vcGVyYXRpb25OYW1lKTtcclxuICAgIHJldHVybiByZXF1ZXN0O1xyXG4gIH0sXHJcbiAgZ2V0U2VydmljZTogZnVuY3Rpb24gZ2V0U2VydmljZSgpIHtcclxuICAgIHJldHVybiBBcHAuZ2V0U2VydmljZShmYWxzZSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuUHJpY2luZ0F2YWlsYWJpbGl0eVNlcnZpY2UnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19