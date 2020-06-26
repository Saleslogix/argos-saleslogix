define("crm/Integrations/BOE/Utility", ["exports", "dojo/_base/lang", "argos/Models/Adapter", "./Models/Names", "../../Format"], function (_exports, _lang, _Adapter, _Names, _Format) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _lang = _interopRequireDefault(_lang);
  _Adapter = _interopRequireDefault(_Adapter);
  _Names = _interopRequireDefault(_Names);
  _Format = _interopRequireDefault(_Format);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

  /**
   * @class
   * @alias module:crm/Integrations/BOE/Utility
   * @classdesc Utility provides functions that are more javascript enhancers than application related code.
   * @static
   *
   */
  var __class = _lang["default"].setObject('crm.Integrations.BOE.Utility',
  /** @lends module:crm/Integrations/BOE/Utility */
  {
    // Lookup table for the aggregate functions used by DashboardWidget
    aggregateLookup: {
      calcProfit: function calcProfit(fn, widget, data) {
        var revenue = data[0];
        var cost = data[1];
        return fn.call(widget, revenue, cost);
      },
      calcMargin: function calcMargin(fn, widget, data) {
        var revenue = data[0];
        var cost = data[1];
        return fn.call(widget, revenue, cost);
      },
      calcYoYRevenue: function calcYoYRevenue(fn, widget, data) {
        var pastYear = data[0];
        var between = data[1];
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
    setFieldsFromIds: function setFieldsFromIds() {
      var mappedLookups = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var mappedProperties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var fields = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var scope = arguments.length > 3 ? arguments[3] : undefined;
      var entry = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var promises = [];
      fields.forEach(function (f, index) {
        var temp = scope.options.entry ? scope.options.entry[f] : null;
        var value = entry[f] || scope.entry[f] || temp;

        if (!value) {
          return;
        }

        var model = _Adapter["default"].getModel(_Names["default"][mappedLookups[index].toUpperCase()]);

        if (!model) {
          console.warn('Unable to locate model for ' + f); // eslint-disable-line

          return;
        }

        model.init();
        var options = {
          async: false,
          queryModelName: 'detail',
          query: "".concat(mappedProperties[index], " eq \"").concat(value, "\"")
        };
        var promise = model.getEntries(null, options);
        promises.push(promise);
        promise.then(function (entries) {
          var returned = entries[0];

          if (returned) {
            scope.fields[mappedLookups[index]].setSelection(returned);
            scope.fields[mappedLookups[index]].onChange(scope.fields[mappedLookups[index]].currentSelection, scope.fields[mappedLookups[index]]);
          }
        });
      });
      return Promise.all(promises);
    },
    formatMultiCurrency: function formatMultiCurrency(val, currencyCode) {
      var result = null;
      var tempVal = val || 0;

      if (App.hasMultiCurrency() && currencyCode) {
        result = _Format["default"].multiCurrency.call(null, tempVal, currencyCode);
      } else {
        result = _Format["default"].currency.call(null, tempVal);
      }

      return result || '';
    },
    getBaseCurrencyCode: function getBaseCurrencyCode() {
      if (App.context && App.context.systemOptions && App.context.systemOptions.BaseCurrency) {
        var results = App.context.systemOptions.BaseCurrency;
        return results;
      }

      return '';
    }
  });

  _lang["default"].setObject('icboe.Utility', __class);

  var _default = __class;
  _exports["default"] = _default;
});