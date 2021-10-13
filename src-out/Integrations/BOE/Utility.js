define('crm/Integrations/BOE/Utility', ['module', 'exports', 'dojo/_base/lang', 'argos/Models/Adapter', './Models/Names', '../../Format'], function (module, exports, _lang, _Adapter, _Names, _Format) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _lang2 = _interopRequireDefault(_lang);

  var _Adapter2 = _interopRequireDefault(_Adapter);

  var _Names2 = _interopRequireDefault(_Names);

  var _Format2 = _interopRequireDefault(_Format);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @class
   * @alias module:crm/Integrations/BOE/Utility
   * @classdesc Utility provides functions that are more javascript enhancers than application related code.
   * @static
   *
   */
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

  /**
   * @module crm/Integrations/BOE/Utility
   */
  const __class = _lang2.default.setObject('crm.Integrations.BOE.Utility', /** @lends module:crm/Integrations/BOE/Utility */{
    // Lookup table for the aggregate functions used by DashboardWidget
    aggregateLookup: {
      calcProfit: function calcProfit(fn, widget, data) {
        const revenue = data[0];
        const cost = data[1];

        return fn.call(widget, revenue, cost);
      },
      calcMargin: function calcMargin(fn, widget, data) {
        const revenue = data[0];
        const cost = data[1];

        return fn.call(widget, revenue, cost);
      },
      calcYoYRevenue: function calcYoYRevenue(fn, widget, data) {
        const pastYear = data[0];
        const between = data[1];

        return fn.call(widget, pastYear, between);
      },
      calcYoYProfit: function calcYoYProfit(fn, widget, data) {
        return fn.call(widget, data[0], data[2], data[1], data[3]);
      },
      calcYoYMargin: function calcYoYMargin(fn, widget, data) {
        return fn.call(widget, data[0], data[2], data[1], data[3]);
      },
      sum: function sum(fn, widget, data) {
        return fn.call(widget, data);
      }
    },
    /**
     * @params
     * mappedLookups: Array of lookup names that must match the model names
     * mappedProperties: Array of the properties on the entry with the searched id
     * fields: Array of field names from the edit view
     * scope: 'this' of the edit view
     * @return
     * Returns a promise that is resolved once all entries are returned
     */
    setFieldsFromIds: function setFieldsFromIds(mappedLookups = [], mappedProperties = [], fields = [], scope, entry = {}) {
      const promises = [];
      fields.forEach((f, index) => {
        const temp = scope.options.entry ? scope.options.entry[f] : null;
        const value = entry[f] || scope.entry[f] || temp;
        if (!value) {
          return;
        }
        const model = _Adapter2.default.getModel(_Names2.default[mappedLookups[index].toUpperCase()]);
        if (!model) {
          console.warn('Unable to locate model for ' + f); // eslint-disable-line
          return;
        }
        model.init();
        const options = {
          async: false,
          queryModelName: 'detail',
          query: `${mappedProperties[index]} eq "${value}"`
        };
        const promise = model.getEntries(null, options);
        promises.push(promise);
        promise.then(entries => {
          const returned = entries[0];
          if (returned) {
            scope.fields[mappedLookups[index]].setSelection(returned);
            scope.fields[mappedLookups[index]].onChange(scope.fields[mappedLookups[index]].currentSelection, scope.fields[mappedLookups[index]]);
          }
        });
      });
      return Promise.all(promises);
    },
    formatMultiCurrency: function formatMultiCurrency(val, currencyCode) {
      let result = null;
      const tempVal = val || 0;
      if (App.hasMultiCurrency() && currencyCode) {
        result = _Format2.default.multiCurrency.call(null, tempVal, currencyCode);
      } else {
        result = _Format2.default.currency.call(null, tempVal);
      }
      return result || '';
    },
    getBaseCurrencyCode: function getBaseCurrencyCode() {
      if (App.context && App.context.systemOptions && App.context.systemOptions.BaseCurrency) {
        const results = App.context.systemOptions.BaseCurrency;
        return results;
      }

      return '';
    }
  });

  _lang2.default.setObject('icboe.Utility', __class);
  exports.default = __class;
  module.exports = exports['default'];
});