define('crm/Integrations/BOE/Aggregate', ['module', 'exports', 'dojo/_base/lang', '../../Aggregate'], function (module, exports, _lang, _Aggregate) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _lang2 = _interopRequireDefault(_lang);

  var _Aggregate2 = _interopRequireDefault(_Aggregate);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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
  var __class = _lang2.default.setObject('crm.Integrations.BOE.Aggregate', /** @lends crm.Integrations.BOE.Aggregate */{
    /**
     * Calculate Profit
     * @param {Array} data arrays of revenue and cost
     * @return {Number}
     */
    calcProfit: function calcProfit() {
      var revenue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var cost = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var totalRevenue = _Aggregate2.default.sum(revenue);
      var totalCost = _Aggregate2.default.sum(cost);
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
      var revenueTotal = _Aggregate2.default.sum(revenue);
      var margin = void 0;
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
      var revenuePastYear = _Aggregate2.default.sum(pastYear);
      var revenueBetween = _Aggregate2.default.sum(between);
      var revenueYoY = void 0;

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
      var profitYoY = void 0;

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
      var marginYoY = void 0;

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
  _lang2.default.setObject('icboe.Aggregate', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL0FnZ3JlZ2F0ZS5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwic2V0T2JqZWN0IiwiY2FsY1Byb2ZpdCIsInJldmVudWUiLCJjb3N0IiwidG90YWxSZXZlbnVlIiwic3VtIiwidG90YWxDb3N0IiwicHJvZml0IiwiY2FsY01hcmdpbiIsInByb2ZpdFRvdGFsIiwiaWNib2UiLCJBZ2dyZWdhdGUiLCJyZXZlbnVlVG90YWwiLCJtYXJnaW4iLCJjYWxjWW9ZUmV2ZW51ZSIsInBhc3RZZWFyIiwiYmV0d2VlbiIsInJldmVudWVQYXN0WWVhciIsInJldmVudWVCZXR3ZWVuIiwicmV2ZW51ZVlvWSIsImNhbGNZb1lQcm9maXQiLCJjb3N0UGFzdFllYXIiLCJjb3N0QmV0d2VlbiIsInByb2ZpdFBhc3RZZWFyIiwicHJvZml0QmV0d2VlbiIsInByb2ZpdFlvWSIsImNhbGNZb1lNYXJnaW4iLCJtYXJnaW5QYXN0WWVhciIsIm1hcmdpbkJldHdlZW4iLCJtYXJnaW5Zb1kiLCJjaGFuZ2VDb2xvciIsIndpZGdldCIsInZhbHVlIiwidGVtcCIsImRvbU5vZGUiLCJwYXJlbnRFbGVtZW50Iiwic3R5bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFlQTs7Ozs7QUFRQSxNQUFNQSxVQUFVLGVBQUtDLFNBQUwsQ0FBZSxnQ0FBZixFQUFpRCw0Q0FBNEM7QUFDM0c7Ozs7O0FBS0FDLGdCQUFZLFNBQVNBLFVBQVQsR0FBMkM7QUFBQSxVQUF2QkMsT0FBdUIsdUVBQWIsQ0FBYTtBQUFBLFVBQVZDLElBQVUsdUVBQUgsQ0FBRzs7QUFDckQsVUFBTUMsZUFBZSxvQkFBYUMsR0FBYixDQUFpQkgsT0FBakIsQ0FBckI7QUFDQSxVQUFNSSxZQUFZLG9CQUFhRCxHQUFiLENBQWlCRixJQUFqQixDQUFsQjtBQUNBLFVBQU1JLFNBQVNILGVBQWVFLFNBQTlCOztBQUVBLGFBQU9DLE1BQVA7QUFD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QUE2QkMsS0FBN0IsQ0FBbUMsa0JBQW5DLElBQXlELFNBQXpEO0FBQ0Q7QUFDRixTQU5ELE1BTU87QUFDTEwsaUJBQU9HLE9BQVAsQ0FBZUMsYUFBZixDQUE2QkMsS0FBN0IsQ0FBbUMsa0JBQW5DLElBQXlELFNBQXpEO0FBQ0Q7QUFDRixPQVZELE1BVU8sSUFBSUgsT0FBTyxDQUFDLElBQVosRUFBa0I7QUFDdkIsWUFBSUEsT0FBTyxDQUFDLENBQVosRUFBZTtBQUNiLGNBQUlBLE9BQU8sQ0FBQyxFQUFaLEVBQWdCO0FBQ2RGLG1CQUFPRyxPQUFQLENBQWVDLGFBQWYsQ0FBNkJDLEtBQTdCLENBQW1DLGtCQUFuQyxJQUF5RCxTQUF6RDtBQUNELFdBRkQsTUFFTztBQUNMTCxtQkFBT0csT0FBUCxDQUFlQyxhQUFmLENBQTZCQyxLQUE3QixDQUFtQyxrQkFBbkMsSUFBeUQsU0FBekQ7QUFDRDtBQUNGLFNBTkQsTUFNTztBQUNMTCxpQkFBT0csT0FBUCxDQUFlQyxhQUFmLENBQTZCQyxLQUE3QixDQUFtQyxrQkFBbkMsSUFBeUQsU0FBekQ7QUFDRDtBQUNGO0FBQ0Y7QUFoSDBHLEdBQTdGLENBQWhCO0FBa0hBLGlCQUFLcEMsU0FBTCxDQUFlLGlCQUFmLEVBQWtDRCxPQUFsQztvQkFDZUEsTyIsImZpbGUiOiJBZ2dyZWdhdGUuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5JbnRlZ3JhdGlvbnMuQk9FLkFnZ3JlZ2F0ZVxyXG4gKiBAY2xhc3NkZXNjIEFnZ3JlZ2F0ZSBmdW5jdGlvbnMuIEN1cnJlbnRseSB1c2VkIGluIG1ldHJpYyB3aWRnZXRzLlxyXG4gKiBAc2luZ2xldG9uXHJcbiAqL1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgY3JtQWdnZXJnYXRlIGZyb20gJy4uLy4uL0FnZ3JlZ2F0ZSc7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gbGFuZy5zZXRPYmplY3QoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLkFnZ3JlZ2F0ZScsIC8qKiBAbGVuZHMgY3JtLkludGVncmF0aW9ucy5CT0UuQWdncmVnYXRlICove1xyXG4gIC8qKlxyXG4gICAqIENhbGN1bGF0ZSBQcm9maXRcclxuICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhIGFycmF5cyBvZiByZXZlbnVlIGFuZCBjb3N0XHJcbiAgICogQHJldHVybiB7TnVtYmVyfVxyXG4gICAqL1xyXG4gIGNhbGNQcm9maXQ6IGZ1bmN0aW9uIGNhbGNQcm9maXQocmV2ZW51ZSA9IDAsIGNvc3QgPSAwKSB7XHJcbiAgICBjb25zdCB0b3RhbFJldmVudWUgPSBjcm1BZ2dlcmdhdGUuc3VtKHJldmVudWUpO1xyXG4gICAgY29uc3QgdG90YWxDb3N0ID0gY3JtQWdnZXJnYXRlLnN1bShjb3N0KTtcclxuICAgIGNvbnN0IHByb2ZpdCA9IHRvdGFsUmV2ZW51ZSAtIHRvdGFsQ29zdDtcclxuXHJcbiAgICByZXR1cm4gcHJvZml0O1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlIE1hcmdpblxyXG4gICAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgYXJyYXlzIG9mIHJldmVudWUgYW5kIGNvc3RcclxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAgICovXHJcbiAgY2FsY01hcmdpbjogZnVuY3Rpb24gY2FsY01hcmdpbihyZXZlbnVlID0gMCwgY29zdCA9IDApIHtcclxuICAgIGNvbnN0IHByb2ZpdFRvdGFsID0gaWNib2UuQWdncmVnYXRlLmNhbGNQcm9maXQocmV2ZW51ZSwgY29zdCk7XHJcbiAgICBjb25zdCByZXZlbnVlVG90YWwgPSBjcm1BZ2dlcmdhdGUuc3VtKHJldmVudWUpO1xyXG4gICAgbGV0IG1hcmdpbjtcclxuICAgIGlmIChyZXZlbnVlVG90YWwgIT09IDApIHtcclxuICAgICAgbWFyZ2luID0gcHJvZml0VG90YWwgLyByZXZlbnVlVG90YWw7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBtYXJnaW4gPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtYXJnaW47XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBDYWxjdWxhdGUgWW9ZIFJldmVudWVcclxuICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhIGFycmF5IG9mIHJldmVudWUgaW4gdGhlIHBhc3QgeWVhciBhbmQgcmV2ZW51ZSBiZXR3ZWVuIGEgc2V0IG9mIHllYXJzXHJcbiAgICogQHJldHVybiB7TnVtYmVyfVxyXG4gICAqL1xyXG4gIGNhbGNZb1lSZXZlbnVlOiBmdW5jdGlvbiBjYWxjWW9ZUmV2ZW51ZShwYXN0WWVhciwgYmV0d2Vlbikge1xyXG4gICAgY29uc3QgcmV2ZW51ZVBhc3RZZWFyID0gY3JtQWdnZXJnYXRlLnN1bShwYXN0WWVhcik7XHJcbiAgICBjb25zdCByZXZlbnVlQmV0d2VlbiA9IGNybUFnZ2VyZ2F0ZS5zdW0oYmV0d2Vlbik7XHJcbiAgICBsZXQgcmV2ZW51ZVlvWTtcclxuXHJcbiAgICBpZiAocmV2ZW51ZUJldHdlZW4gIT09IDApIHtcclxuICAgICAgcmV2ZW51ZVlvWSA9IChyZXZlbnVlUGFzdFllYXIgLSByZXZlbnVlQmV0d2VlbikgLyByZXZlbnVlQmV0d2VlbjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldmVudWVZb1kgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXZlbnVlWW9ZO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlIFlvWSBQcm9maXRcclxuICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhIGFycmF5cyBvZiByZXZlbnVlIGluIHRoZSBwYXN0IHllYXIsIGNvc3QgaW4gdGhlIHBhc3QgeWVhciwgcmV2ZW51ZSBiZXR3ZWVuIHR3byB5ZWFycywgYW5kIGNvc3QgYmV0d2VlbiB0d28geWVhcnNcclxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAgICovXHJcbiAgY2FsY1lvWVByb2ZpdDogZnVuY3Rpb24gY2FsY1lvWVByb2ZpdChyZXZlbnVlUGFzdFllYXIsIGNvc3RQYXN0WWVhciwgcmV2ZW51ZUJldHdlZW4sIGNvc3RCZXR3ZWVuKSB7XHJcbiAgICBjb25zdCBwcm9maXRQYXN0WWVhciA9IGljYm9lLkFnZ3JlZ2F0ZS5jYWxjUHJvZml0KHJldmVudWVQYXN0WWVhciwgY29zdFBhc3RZZWFyKTtcclxuICAgIGNvbnN0IHByb2ZpdEJldHdlZW4gPSBpY2JvZS5BZ2dyZWdhdGUuY2FsY1Byb2ZpdChyZXZlbnVlQmV0d2VlbiwgY29zdEJldHdlZW4pO1xyXG4gICAgbGV0IHByb2ZpdFlvWTtcclxuXHJcbiAgICBpZiAocHJvZml0QmV0d2VlbiAhPT0gMCkge1xyXG4gICAgICBwcm9maXRZb1kgPSAocHJvZml0UGFzdFllYXIgLSBwcm9maXRCZXR3ZWVuKSAvIHByb2ZpdEJldHdlZW47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwcm9maXRZb1kgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwcm9maXRZb1k7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBDYWxjdWxhdGUgWW9ZIE1hcmdpblxyXG4gICAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgYXJyYXlzIG9mIHJldmVudWUgaW4gdGhlIHBhc3QgeWVhciwgY29zdCBpbiB0aGUgcGFzdCB5ZWFyLCByZXZlbnVlIGJldHdlZW4gdHdvIHllYXJzLCBhbmQgY29zdCBiZXR3ZWVuIHR3byB5ZWFyc1xyXG4gICAqIEByZXR1cm4ge051bWJlcn1cclxuICAgKi9cclxuICBjYWxjWW9ZTWFyZ2luOiBmdW5jdGlvbiBjYWxjWW9ZTWFyZ2luKHJldmVudWVQYXN0WWVhciwgY29zdFBhc3RZZWFyLCByZXZlbnVlQmV0d2VlbiwgY29zdEJldHdlZW4pIHtcclxuICAgIGNvbnN0IG1hcmdpblBhc3RZZWFyID0gaWNib2UuQWdncmVnYXRlLmNhbGNNYXJnaW4ocmV2ZW51ZVBhc3RZZWFyLCBjb3N0UGFzdFllYXIpO1xyXG4gICAgY29uc3QgbWFyZ2luQmV0d2VlbiA9IGljYm9lLkFnZ3JlZ2F0ZS5jYWxjTWFyZ2luKHJldmVudWVCZXR3ZWVuLCBjb3N0QmV0d2Vlbik7XHJcbiAgICBsZXQgbWFyZ2luWW9ZO1xyXG5cclxuICAgIGlmIChtYXJnaW5CZXR3ZWVuICE9PSAwKSB7XHJcbiAgICAgIG1hcmdpbllvWSA9IChtYXJnaW5QYXN0WWVhciAtIG1hcmdpbkJldHdlZW4pIC8gbWFyZ2luQmV0d2VlbjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG1hcmdpbllvWSA9IDA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWFyZ2luWW9ZO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICAqIENoYW5nZSBDb2xvclxyXG4gICAgKiBAZGVwcmVjYXRlZFxyXG4gICAgKi9cclxuICBjaGFuZ2VDb2xvcjogZnVuY3Rpb24gY2hhbmdlQ29sb3Iod2lkZ2V0LCB2YWx1ZSkge1xyXG4gICAgbGV0IHRlbXAgPSB2YWx1ZTtcclxuICAgIHRlbXAgPSB0ZW1wICogMTAwO1xyXG5cclxuICAgIGlmICh0ZW1wID4gMC4wMSkge1xyXG4gICAgICBpZiAodGVtcCA+IDUpIHtcclxuICAgICAgICBpZiAodGVtcCA+IDEwKSB7XHJcbiAgICAgICAgICB3aWRnZXQuZG9tTm9kZS5wYXJlbnRFbGVtZW50LnN0eWxlWydiYWNrZ3JvdW5kLWNvbG9yJ10gPSAnIzc2YjA1MSc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHdpZGdldC5kb21Ob2RlLnBhcmVudEVsZW1lbnQuc3R5bGVbJ2JhY2tncm91bmQtY29sb3InXSA9ICcjNTY5MzJlJztcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgd2lkZ2V0LmRvbU5vZGUucGFyZW50RWxlbWVudC5zdHlsZVsnYmFja2dyb3VuZC1jb2xvciddID0gJyMzOTc1MTQnO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRlbXAgPCAtMC4wMSkge1xyXG4gICAgICBpZiAodGVtcCA8IC01KSB7XHJcbiAgICAgICAgaWYgKHRlbXAgPCAtMTApIHtcclxuICAgICAgICAgIHdpZGdldC5kb21Ob2RlLnBhcmVudEVsZW1lbnQuc3R5bGVbJ2JhY2tncm91bmQtY29sb3InXSA9ICcjYjk0ZTRlJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgd2lkZ2V0LmRvbU5vZGUucGFyZW50RWxlbWVudC5zdHlsZVsnYmFja2dyb3VuZC1jb2xvciddID0gJyNhMTMwMzAnO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB3aWRnZXQuZG9tTm9kZS5wYXJlbnRFbGVtZW50LnN0eWxlWydiYWNrZ3JvdW5kLWNvbG9yJ10gPSAnIzg4MGUwZSc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG59KTtcclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLkFnZ3JlZ2F0ZScsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=