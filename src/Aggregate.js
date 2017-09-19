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

import lang from 'dojo/_base/lang';

/**
 * @class crm.Aggregate
 * @classdesc Aggregate functions. Currently used in metric widgets.
 * @singleton
 */
const __class = lang.setObject('crm.Aggregate', /** @lends crm.Aggregate */{
  /**
   * Average
   * @param {Array} data Array of objects that contain a value property
   * @return {Number}
   */
  avg: function avg(data) {
    const aggr = window.crm.Aggregate;
    const average = aggr.sum(data) / aggr.count(data);
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
    const flatten = data.map((item) => {
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
    const flatten = data.map((item) => {
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
    let total = 0;
    if (!Array.isArray(data)) {
      return total;
    }

    total = data.reduce((p, c) => {
      return p + c.value;
    }, 0);

    return total;
  },
});

export default __class;
