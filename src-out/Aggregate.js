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