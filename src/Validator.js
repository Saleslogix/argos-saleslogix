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
 * @module crm/Validator
 */
import lang from 'dojo/_base/lang';
import getResource from 'argos/I18n';

const resource = getResource('validators');

/**
 * @class
 * @alias module:crm/Validator
 * @classdesc Validators for use in {@link argos.Edit} forms. To use validators, you add them to your view's layout:
 * @example
 *       createLayout: function() {
 *           return this.layout || (this.layout = [{
 *                   label: this.accountText,
 *                   name: 'AccountName',
 *                   property: 'AccountName',
 *                   type: 'text',
 *                   validator: validator.notEmpty
 *               }, {
 *                   label: this.webText,
 *                   name: 'WebAddress',
 *                   property: 'WebAddress',
 *                   renderer: format.link,
 *                   type: 'text',
 *                   inputType: 'url',
 *                   maxTextLength: 128,
 *                   validator: validator.exceedsMaxTextLength
 *               }]);
 *       }
 * @static
 */
const __class = lang.setObject('crm.Validator', /** @lends module:crm/Validator */{
  /**
   * @property {Object} exists
   * Validator that ensures the field contains a value.
   */
  exists: {
    fn: function exists(value) {
      return !value;
    },
    message: resource.existsText,
  },

  picklistExists: {
    fn: function picklistExists(value) {
      if (!value) {
        return true;
      }

      if (value.text === '' && value.key === '') {
        return true;
      }

      return false;
    },
    message: resource.existsText,
  },

  /**
   * @property {Object} name
   * Validator that ensures a FirstName and LastName property have been specified.
   */
  name: {
    fn: function name(value) {
      if (value) {
        return !/.+/.test(value.FirstName || '') || !/.+/.test(value.LastName || '');
      }
      return true;
    },
    message: resource.nameText,
  },
  /**
   * @property {Object}
   * Validator that ensures a field is not empty.
   */
  notEmpty: {
    test: /.+/,
    message: resource.notEmptyText,
  },
  /**
   * @deprecated
   * @property {Object}
   * Validator that ensures a field has text. **Warning** This does not work with unicode.
   */
  hasText: {
    test: /\w+/,
    message: resource.hasText,
  },
  /**
   * @property {Object}
   * Validator that ensures a field is a valid number.
   */
  isInteger: {
    test: /^\d+$/,
    message: resource.isNumberText,
  },

  /**
   * @property {Object}
   * Validator that ensures a field is a valid decimal.
   */
  isDecimal: {
    test: /^[\d.]+$/,
    message: resource.isNumberText,
  },

  /**
   * @property {Object}
   * Validator that ensures a field is valid currency.
   */
  isCurrency: {
    fn: function isCurrency(value) {
      return !(new RegExp('^[\\d]+(\\.\\d{1,2})?$').test(value));
    },
    message: resource.isCurrencyText,
  },

  /**
   * @property {Object}
   * Validator that ensures a field is a valid Int32.
   */
  isInt32: {
    fn: function isInt32(value) {
      if (value && (!/^\d{1,10}$/.test(value) || parseInt(value, 10) > 2147483647)) {
        return true;
      }
      return false;
    },
    message: resource.int32Text,
  },

  /**
   * @property {Object}
   * @param {Number} maxTextLength
   * Validator that ensures a field does not exeed max length. Checks the length against field's maxTextLength property.
   */
  exceedsMaxTextLength: {
    fn: function maxTextLength(value, field) {
      if (value && field && field.maxTextLength && value.length > field.maxTextLength) {
        return true;
      }
      return false;
    },
    message: resource.maxLengthText,
  },

  /**
   * @property {Object}
   * @param {Date} minValue
   * @param {Date} maxValue
   * Validator that ensures the date is within a certain range. Checks the date range against the field's minValue and maxValue properties.
   * If both are specified a range between the two is used, otherwise a less than or greater than is used.
   */
  isDateInRange: {
    fn: function isDateInRange(value, field) {
      const minValue = field.minValue;
      const maxValue = field.maxValue;

      // if value is empty or not a date, ignore comparison
      if (!value || !(value instanceof Date)) {
        return false;
      }

      if (minValue && maxValue) {
        if (value.valueOf() > minValue.valueOf() && value.valueOf() < maxValue.valueOf()) {
          return false;
        }
      } else if (minValue && value.valueOf() > minValue.valueOf()) {
        return false;
      } else if (maxValue && value.valueOf() < maxValue.valueOf()) {
        return false;
      }

      return true;
    },
    message: resource.dateRangeText,
  },

  /**
   * @property {Object}
   * @param {Number} greaterThan
   * Validator that ensures the field value is greater than the specified greaterThan option.
   * Combine with the lessThan validator to create a range.
   */
  isGreaterThan: {
    fn: function isGreaterThan(value, field) {
      const comp = field.greaterThan;

      if (typeof comp !== 'number' || Number.isNaN(comp)) {
        return false;
      }

      if (value > comp) {
        return false;
      }

      return true;
    },
    message: resource.isGreaterThanText,
  },

  /**
   * @property {Object}
   * @param {Number} lessThan
   * Validator that ensures the field value is under the specified lessThan option.
   * Combine with the greaterThan validator to create a range.
   */
  isLessThan: {
    fn: function isLessThan(value, field) {
      const comp = field.lessThan;

      if (typeof comp !== 'number' || Number.isNaN(comp)) {
        return false;
      }

      if (value < comp) {
        return false;
      }

      return true;
    },
    message: resource.isLessThanText,
  },
  /**
   * @property {Object}
   * @deprecated
   * @removed
   * Validator that ensures the field is a phone number.
   */
  isPhoneNumber: {},
});

export default __class;
