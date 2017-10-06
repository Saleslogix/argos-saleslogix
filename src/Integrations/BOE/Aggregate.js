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
 * @class crm.Integrations.BOE.Aggregate
 * @classdesc Aggregate functions. Currently used in metric widgets.
 * @singleton
 */
import lang from 'dojo/_base/lang';
import crmAggergate from '../../Aggregate';

const __class = lang.setObject('crm.Integrations.BOE.Aggregate', /** @lends crm.Integrations.BOE.Aggregate */{
  /**
   * Calculate Profit
   * @param {Array} data arrays of revenue and cost
   * @return {Number}
   */
  calcProfit: function calcProfit(revenue = 0, cost = 0) {
    const totalRevenue = crmAggergate.sum(revenue);
    const totalCost = crmAggergate.sum(cost);
    const profit = totalRevenue - totalCost;

    return profit;
  },
  /**
   * Calculate Margin
   * @param {Array} data arrays of revenue and cost
   * @return {Number}
   */
  calcMargin: function calcMargin(revenue = 0, cost = 0) {
    const profitTotal = icboe.Aggregate.calcProfit(revenue, cost);
    const revenueTotal = crmAggergate.sum(revenue);
    let margin;
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
    const revenuePastYear = crmAggergate.sum(pastYear);
    const revenueBetween = crmAggergate.sum(between);
    let revenueYoY;

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
    const profitPastYear = icboe.Aggregate.calcProfit(revenuePastYear, costPastYear);
    const profitBetween = icboe.Aggregate.calcProfit(revenueBetween, costBetween);
    let profitYoY;

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
    const marginPastYear = icboe.Aggregate.calcMargin(revenuePastYear, costPastYear);
    const marginBetween = icboe.Aggregate.calcMargin(revenueBetween, costBetween);
    let marginYoY;

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
    let temp = value;
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
  },
});
lang.setObject('icboe.Aggregate', __class);
export default __class;
