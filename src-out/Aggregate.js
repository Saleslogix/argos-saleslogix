define('crm/Aggregate', ['module', 'exports', 'dojo/_base/lang'], function (module, exports, _lang) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _lang2 = _interopRequireDefault(_lang);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @class crm.Aggregate
   * @classdesc Aggregate functions. Currently used in metric widgets.
   * @singleton
   */
  var __class = _lang2.default.setObject('crm.Aggregate', /** @lends crm.Aggregate */{
    /**
     * Average
     * @param {Array} data Array of objects that contain a value property
     * @return {Number}
     */
    avg: function avg(data) {
      var aggr = window.crm.Aggregate;
      var average = aggr.sum(data) / aggr.count(data);
      return isNaN(average) ? 0 : average;
    },
    /**
     * Count
     * @param {Array} data Array of objects that contain a value property
     * @return {Number}
     */
    count: function count(data) {
      return data && data.length;
    },
    /**
     * First
     * @param {Array} data Array of objects that contain a value property
     * @returns
     * The first elements "value" property value
     */
    first: function first(data) {
      return data && data.length && data[0].value;
    },
    /**
     * Last
     * @param {Array} data Array of objects that contain a value property
     * @returns
     * The last elements "value" property value
     */
    last: function last(data) {
      return data && data.length && data[data.length - 1].value;
    },
    /**
     * Maximum
     * @param {Array} data Array of objects that contain a value property
     * @return {Number}
     */
    max: function max(data) {
      var flatten = data.map(function (item) {
        return item.value;
      });

      return Math.max.apply(null, flatten);
    },
    /**
     * Minimum
     * @param {Array} data Array of objects that contain a value property
     * @return {Number}
     */
    min: function min(data) {
      var flatten = data.map(function (item) {
        return item.value;
      });

      return flatten.length > 0 ? Math.min.apply(null, flatten) : 0;
    },
    /**
     * Sum
     * @param {Array} data Array of objects that contain a value property
     * @return {Number}
     */
    sum: function sum(data) {
      var total = 0;
      if (!Array.isArray(data)) {
        return total;
      }

      total = data.reduce(function (p, c) {
        return p + c.value;
      }, 0);

      return total;
    }
  }); /* Copyright 2017 Infor
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

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BZ2dyZWdhdGUuanMiXSwibmFtZXMiOlsiX19jbGFzcyIsInNldE9iamVjdCIsImF2ZyIsImRhdGEiLCJhZ2dyIiwid2luZG93IiwiY3JtIiwiQWdncmVnYXRlIiwiYXZlcmFnZSIsInN1bSIsImNvdW50IiwiaXNOYU4iLCJsZW5ndGgiLCJmaXJzdCIsInZhbHVlIiwibGFzdCIsIm1heCIsImZsYXR0ZW4iLCJtYXAiLCJpdGVtIiwiTWF0aCIsImFwcGx5IiwibWluIiwidG90YWwiLCJBcnJheSIsImlzQXJyYXkiLCJyZWR1Y2UiLCJwIiwiYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQWlCQTs7Ozs7QUFLQSxNQUFNQSxVQUFVLGVBQUtDLFNBQUwsQ0FBZSxlQUFmLEVBQWdDLDJCQUEyQjtBQUN6RTs7Ozs7QUFLQUMsU0FBSyxTQUFTQSxHQUFULENBQWFDLElBQWIsRUFBbUI7QUFDdEIsVUFBTUMsT0FBT0MsT0FBT0MsR0FBUCxDQUFXQyxTQUF4QjtBQUNBLFVBQU1DLFVBQVVKLEtBQUtLLEdBQUwsQ0FBU04sSUFBVCxJQUFpQkMsS0FBS00sS0FBTCxDQUFXUCxJQUFYLENBQWpDO0FBQ0EsYUFBT1EsTUFBTUgsT0FBTixJQUFpQixDQUFqQixHQUFxQkEsT0FBNUI7QUFDRCxLQVZ3RTtBQVd6RTs7Ozs7QUFLQUUsV0FBTyxTQUFTQSxLQUFULENBQWVQLElBQWYsRUFBcUI7QUFDMUIsYUFBT0EsUUFBUUEsS0FBS1MsTUFBcEI7QUFDRCxLQWxCd0U7QUFtQnpFOzs7Ozs7QUFNQUMsV0FBTyxTQUFTQSxLQUFULENBQWVWLElBQWYsRUFBcUI7QUFDMUIsYUFBT0EsUUFBUUEsS0FBS1MsTUFBYixJQUF1QlQsS0FBSyxDQUFMLEVBQVFXLEtBQXRDO0FBQ0QsS0EzQndFO0FBNEJ6RTs7Ozs7O0FBTUFDLFVBQU0sU0FBU0EsSUFBVCxDQUFjWixJQUFkLEVBQW9CO0FBQ3hCLGFBQU9BLFFBQVFBLEtBQUtTLE1BQWIsSUFBdUJULEtBQUtBLEtBQUtTLE1BQUwsR0FBYyxDQUFuQixFQUFzQkUsS0FBcEQ7QUFDRCxLQXBDd0U7QUFxQ3pFOzs7OztBQUtBRSxTQUFLLFNBQVNBLEdBQVQsQ0FBYWIsSUFBYixFQUFtQjtBQUN0QixVQUFNYyxVQUFVZCxLQUFLZSxHQUFMLENBQVMsVUFBQ0MsSUFBRCxFQUFVO0FBQ2pDLGVBQU9BLEtBQUtMLEtBQVo7QUFDRCxPQUZlLENBQWhCOztBQUlBLGFBQU9NLEtBQUtKLEdBQUwsQ0FBU0ssS0FBVCxDQUFlLElBQWYsRUFBcUJKLE9BQXJCLENBQVA7QUFDRCxLQWhEd0U7QUFpRHpFOzs7OztBQUtBSyxTQUFLLFNBQVNBLEdBQVQsQ0FBYW5CLElBQWIsRUFBbUI7QUFDdEIsVUFBTWMsVUFBVWQsS0FBS2UsR0FBTCxDQUFTLFVBQUNDLElBQUQsRUFBVTtBQUNqQyxlQUFPQSxLQUFLTCxLQUFaO0FBQ0QsT0FGZSxDQUFoQjs7QUFJQSxhQUFPRyxRQUFRTCxNQUFSLEdBQWlCLENBQWpCLEdBQXFCUSxLQUFLRSxHQUFMLENBQVNELEtBQVQsQ0FBZSxJQUFmLEVBQXFCSixPQUFyQixDQUFyQixHQUFxRCxDQUE1RDtBQUNELEtBNUR3RTtBQTZEekU7Ozs7O0FBS0FSLFNBQUssU0FBU0EsR0FBVCxDQUFhTixJQUFiLEVBQW1CO0FBQ3RCLFVBQUlvQixRQUFRLENBQVo7QUFDQSxVQUFJLENBQUNDLE1BQU1DLE9BQU4sQ0FBY3RCLElBQWQsQ0FBTCxFQUEwQjtBQUN4QixlQUFPb0IsS0FBUDtBQUNEOztBQUVEQSxjQUFRcEIsS0FBS3VCLE1BQUwsQ0FBWSxVQUFDQyxDQUFELEVBQUlDLENBQUosRUFBVTtBQUM1QixlQUFPRCxJQUFJQyxFQUFFZCxLQUFiO0FBQ0QsT0FGTyxFQUVMLENBRkssQ0FBUjs7QUFJQSxhQUFPUyxLQUFQO0FBQ0Q7QUE3RXdFLEdBQTNELENBQWhCLEMsQ0F0QkE7Ozs7Ozs7Ozs7Ozs7OztvQkFzR2V2QixPIiwiZmlsZSI6IkFnZ3JlZ2F0ZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5BZ2dyZWdhdGVcclxuICogQGNsYXNzZGVzYyBBZ2dyZWdhdGUgZnVuY3Rpb25zLiBDdXJyZW50bHkgdXNlZCBpbiBtZXRyaWMgd2lkZ2V0cy5cclxuICogQHNpbmdsZXRvblxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGxhbmcuc2V0T2JqZWN0KCdjcm0uQWdncmVnYXRlJywgLyoqIEBsZW5kcyBjcm0uQWdncmVnYXRlICove1xyXG4gIC8qKlxyXG4gICAqIEF2ZXJhZ2VcclxuICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhIEFycmF5IG9mIG9iamVjdHMgdGhhdCBjb250YWluIGEgdmFsdWUgcHJvcGVydHlcclxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAgICovXHJcbiAgYXZnOiBmdW5jdGlvbiBhdmcoZGF0YSkge1xyXG4gICAgY29uc3QgYWdnciA9IHdpbmRvdy5jcm0uQWdncmVnYXRlO1xyXG4gICAgY29uc3QgYXZlcmFnZSA9IGFnZ3Iuc3VtKGRhdGEpIC8gYWdnci5jb3VudChkYXRhKTtcclxuICAgIHJldHVybiBpc05hTihhdmVyYWdlKSA/IDAgOiBhdmVyYWdlO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogQ291bnRcclxuICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhIEFycmF5IG9mIG9iamVjdHMgdGhhdCBjb250YWluIGEgdmFsdWUgcHJvcGVydHlcclxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAgICovXHJcbiAgY291bnQ6IGZ1bmN0aW9uIGNvdW50KGRhdGEpIHtcclxuICAgIHJldHVybiBkYXRhICYmIGRhdGEubGVuZ3RoO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogRmlyc3RcclxuICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhIEFycmF5IG9mIG9iamVjdHMgdGhhdCBjb250YWluIGEgdmFsdWUgcHJvcGVydHlcclxuICAgKiBAcmV0dXJuc1xyXG4gICAqIFRoZSBmaXJzdCBlbGVtZW50cyBcInZhbHVlXCIgcHJvcGVydHkgdmFsdWVcclxuICAgKi9cclxuICBmaXJzdDogZnVuY3Rpb24gZmlyc3QoZGF0YSkge1xyXG4gICAgcmV0dXJuIGRhdGEgJiYgZGF0YS5sZW5ndGggJiYgZGF0YVswXS52YWx1ZTtcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIExhc3RcclxuICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhIEFycmF5IG9mIG9iamVjdHMgdGhhdCBjb250YWluIGEgdmFsdWUgcHJvcGVydHlcclxuICAgKiBAcmV0dXJuc1xyXG4gICAqIFRoZSBsYXN0IGVsZW1lbnRzIFwidmFsdWVcIiBwcm9wZXJ0eSB2YWx1ZVxyXG4gICAqL1xyXG4gIGxhc3Q6IGZ1bmN0aW9uIGxhc3QoZGF0YSkge1xyXG4gICAgcmV0dXJuIGRhdGEgJiYgZGF0YS5sZW5ndGggJiYgZGF0YVtkYXRhLmxlbmd0aCAtIDFdLnZhbHVlO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogTWF4aW11bVxyXG4gICAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgQXJyYXkgb2Ygb2JqZWN0cyB0aGF0IGNvbnRhaW4gYSB2YWx1ZSBwcm9wZXJ0eVxyXG4gICAqIEByZXR1cm4ge051bWJlcn1cclxuICAgKi9cclxuICBtYXg6IGZ1bmN0aW9uIG1heChkYXRhKSB7XHJcbiAgICBjb25zdCBmbGF0dGVuID0gZGF0YS5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgcmV0dXJuIGl0ZW0udmFsdWU7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gTWF0aC5tYXguYXBwbHkobnVsbCwgZmxhdHRlbik7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBNaW5pbXVtXHJcbiAgICogQHBhcmFtIHtBcnJheX0gZGF0YSBBcnJheSBvZiBvYmplY3RzIHRoYXQgY29udGFpbiBhIHZhbHVlIHByb3BlcnR5XHJcbiAgICogQHJldHVybiB7TnVtYmVyfVxyXG4gICAqL1xyXG4gIG1pbjogZnVuY3Rpb24gbWluKGRhdGEpIHtcclxuICAgIGNvbnN0IGZsYXR0ZW4gPSBkYXRhLm1hcCgoaXRlbSkgPT4ge1xyXG4gICAgICByZXR1cm4gaXRlbS52YWx1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBmbGF0dGVuLmxlbmd0aCA+IDAgPyBNYXRoLm1pbi5hcHBseShudWxsLCBmbGF0dGVuKSA6IDA7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBTdW1cclxuICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhIEFycmF5IG9mIG9iamVjdHMgdGhhdCBjb250YWluIGEgdmFsdWUgcHJvcGVydHlcclxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAgICovXHJcbiAgc3VtOiBmdW5jdGlvbiBzdW0oZGF0YSkge1xyXG4gICAgbGV0IHRvdGFsID0gMDtcclxuICAgIGlmICghQXJyYXkuaXNBcnJheShkYXRhKSkge1xyXG4gICAgICByZXR1cm4gdG90YWw7XHJcbiAgICB9XHJcblxyXG4gICAgdG90YWwgPSBkYXRhLnJlZHVjZSgocCwgYykgPT4ge1xyXG4gICAgICByZXR1cm4gcCArIGMudmFsdWU7XHJcbiAgICB9LCAwKTtcclxuXHJcbiAgICByZXR1cm4gdG90YWw7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=