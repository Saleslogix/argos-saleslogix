define("crm/Integrations/BOE/Aggregate", ["exports", "dojo/_base/lang", "../../Aggregate"], function (_exports, _lang, _Aggregate) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _lang = _interopRequireDefault(_lang);
  _Aggregate = _interopRequireDefault(_Aggregate);

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
  * @module crm/Integrations/BOE/Aggregate
  */

  /**
   * @class
   * @alias module:/crm/Integrations/BOE/Aggregate
   * @classdesc Aggregate functions. Currently used in metric widgets.
   * @static
   */
  var __class = _lang["default"].setObject('crm.Integrations.BOE.Aggregate',
  /** @lends module:crm/Integrations/BOE/Aggregate */
  {
    /**
     * Calculate Profit
     * @param {Array} data arrays of revenue and cost
     * @return {Number}
     */
    calcProfit: function calcProfit() {
      var revenue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var cost = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var totalRevenue = _Aggregate["default"].sum(revenue);

      var totalCost = _Aggregate["default"].sum(cost);

      var profit = totalRevenue - totalCost;
      return profit;
    },

    /**
     * Calculate Margin
     * @param {Array} data arrays of revenue and cost
     * @return {Number}
     */
    calcMargin: function calcMargin() {
      var revenue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var cost = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var profitTotal = icboe.Aggregate.calcProfit(revenue, cost);

      var revenueTotal = _Aggregate["default"].sum(revenue);

      var margin;

      if (revenueTotal !== 0) {
        margin = profitTotal / revenueTotal;
      } else {
        margin = 0;
      }

      return margin;
    },

    /**
     * Calculate YoY Revenue
     * @param {Array} data array of revenue in the past year and revenue between a set of years
     * @return {Number}
     */
    calcYoYRevenue: function calcYoYRevenue(pastYear, between) {
      var revenuePastYear = _Aggregate["default"].sum(pastYear);

      var revenueBetween = _Aggregate["default"].sum(between);

      var revenueYoY;

      if (revenueBetween !== 0) {
        revenueYoY = (revenuePastYear - revenueBetween) / revenueBetween;
      } else {
        revenueYoY = 0;
      }

      return revenueYoY;
    },

    /**
     * Calculate YoY Profit
     * @param {Array} data arrays of revenue in the past year, cost in the past year, revenue between two years, and cost between two years
     * @return {Number}
     */
    calcYoYProfit: function calcYoYProfit(revenuePastYear, costPastYear, revenueBetween, costBetween) {
      var profitPastYear = icboe.Aggregate.calcProfit(revenuePastYear, costPastYear);
      var profitBetween = icboe.Aggregate.calcProfit(revenueBetween, costBetween);
      var profitYoY;

      if (profitBetween !== 0) {
        profitYoY = (profitPastYear - profitBetween) / profitBetween;
      } else {
        profitYoY = 0;
      }

      return profitYoY;
    },

    /**
     * Calculate YoY Margin
     * @param {Array} data arrays of revenue in the past year, cost in the past year, revenue between two years, and cost between two years
     * @return {Number}
     */
    calcYoYMargin: function calcYoYMargin(revenuePastYear, costPastYear, revenueBetween, costBetween) {
      var marginPastYear = icboe.Aggregate.calcMargin(revenuePastYear, costPastYear);
      var marginBetween = icboe.Aggregate.calcMargin(revenueBetween, costBetween);
      var marginYoY;

      if (marginBetween !== 0) {
        marginYoY = (marginPastYear - marginBetween) / marginBetween;
      } else {
        marginYoY = 0;
      }

      return marginYoY;
    },

    /**
      * Change Color
      * @deprecated
      */
    changeColor: function changeColor(widget, value) {
      var temp = value;
      temp = temp * 100;

      if (temp > 0.01) {
        if (temp > 5) {
          if (temp > 10) {
            widget.domNode.parentElement.style['background-color'] = '#76b051';
          } else {
            widget.domNode.parentElement.style['background-color'] = '#56932e';
          }
        } else {
          widget.domNode.parentElement.style['background-color'] = '#397514';
        }
      } else if (temp < -0.01) {
        if (temp < -5) {
          if (temp < -10) {
            widget.domNode.parentElement.style['background-color'] = '#b94e4e';
          } else {
            widget.domNode.parentElement.style['background-color'] = '#a13030';
          }
        } else {
          widget.domNode.parentElement.style['background-color'] = '#880e0e';
        }
      }
    }
  });

  _lang["default"].setObject('icboe.Aggregate', __class);

  var _default = __class;
  _exports["default"] = _default;
});