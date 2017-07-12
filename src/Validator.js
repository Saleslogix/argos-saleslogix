import lang from 'dojo/_base/lang';
import getResource from 'argos/I18n';

const resource = getResource('validators');

/**
 * @class crm.Validator
 * Validators for use in {@link argos.Edit} forms. To use validators, you add them to your view's layout:
 *
 *      @example
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
 */
const __class = lang.setObject('crm.Validator', {
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
      return !(new RegExp(`^[\\d]+(\\.\\d{1,${Mobile.CultureInfo.numberFormat.currencyDecimalDigits || '2'}})?$`).test(value));
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
   * @deprecated
   * @removed
   * Validator that ensures the field is a phone number.
   */
  isPhoneNumber: {},
});

lang.setObject('Mobile.SalesLogix.Validator', __class);
export default __class;
