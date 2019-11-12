define('crm/Validator', ['module', 'exports', 'dojo/_base/lang', 'argos/I18n'], function (module, exports, _lang, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _lang2 = _interopRequireDefault(_lang);

  var _I18n2 = _interopRequireDefault(_I18n);

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

  var resource = (0, _I18n2.default)('validators');

  /**
   * @class crm.Validator
   * @classdesc Validators for use in {@link argos.Edit} forms. To use validators, you add them to your view's layout:
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
   * @singleton
   */
  var __class = _lang2.default.setObject('crm.Validator', /** @lends crm.Validator */{
    /**
     * @property {Object} exists
     * Validator that ensures the field contains a value.
     */
    exists: {
      fn: function exists(value) {
        return !value;
      },
      message: resource.existsText
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
      message: resource.existsText
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
      message: resource.nameText
    },
    /**
     * @property {Object}
     * Validator that ensures a field is not empty.
     */
    notEmpty: {
      test: /.+/,
      message: resource.notEmptyText
    },
    /**
     * @deprecated
     * @property {Object}
     * Validator that ensures a field has text. **Warning** This does not work with unicode.
     */
    hasText: {
      test: /\w+/,
      message: resource.hasText
    },
    /**
     * @property {Object}
     * Validator that ensures a field is a valid number.
     */
    isInteger: {
      test: /^\d+$/,
      message: resource.isNumberText
    },

    /**
     * @property {Object}
     * Validator that ensures a field is a valid decimal.
     */
    isDecimal: {
      test: /^[\d.]+$/,
      message: resource.isNumberText
    },

    /**
     * @property {Object}
     * Validator that ensures a field is valid currency.
     */
    isCurrency: {
      fn: function isCurrency(value) {
        return !new RegExp('^[\\d]+(\\.\\d{1,' + (Mobile.CultureInfo.numberFormat.currencyDecimalDigits || '2') + '})?$').test(value);
      },
      message: resource.isCurrencyText
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
      message: resource.int32Text
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
      message: resource.maxLengthText
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
        var minValue = field.minValue;
        var maxValue = field.maxValue;

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
      message: resource.dateRangeText
    },

    /**
     * @property {Object}
     * @param {Number} greaterThan
     * Validator that ensures the field value is greater than the specified greaterThan option.
     * Combine with the lessThan validator to create a range.
     */
    isGreaterThan: {
      fn: function isGreaterThan(value, field) {
        var comp = field.greaterThan;

        if (typeof comp !== 'number' || Number.isNaN(comp)) {
          return false;
        }

        if (value > comp) {
          return false;
        }

        return true;
      },
      message: resource.isGreaterThanText
    },

    /**
     * @property {Object}
     * @param {Number} lessThan
     * Validator that ensures the field value is under the specified lessThan option.
     * Combine with the greaterThan validator to create a range.
     */
    isLessThan: {
      fn: function isLessThan(value, field) {
        var comp = field.lessThan;

        if (typeof comp !== 'number' || Number.isNaN(comp)) {
          return false;
        }

        if (value < comp) {
          return false;
        }

        return true;
      },
      message: resource.isLessThanText
    },
    /**
     * @property {Object}
     * @deprecated
     * @removed
     * Validator that ensures the field is a phone number.
     */
    isPhoneNumber: {}
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9WYWxpZGF0b3IuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwic2V0T2JqZWN0IiwiZXhpc3RzIiwiZm4iLCJ2YWx1ZSIsIm1lc3NhZ2UiLCJleGlzdHNUZXh0IiwicGlja2xpc3RFeGlzdHMiLCJ0ZXh0Iiwia2V5IiwibmFtZSIsInRlc3QiLCJGaXJzdE5hbWUiLCJMYXN0TmFtZSIsIm5hbWVUZXh0Iiwibm90RW1wdHkiLCJub3RFbXB0eVRleHQiLCJoYXNUZXh0IiwiaXNJbnRlZ2VyIiwiaXNOdW1iZXJUZXh0IiwiaXNEZWNpbWFsIiwiaXNDdXJyZW5jeSIsIlJlZ0V4cCIsIk1vYmlsZSIsIkN1bHR1cmVJbmZvIiwibnVtYmVyRm9ybWF0IiwiY3VycmVuY3lEZWNpbWFsRGlnaXRzIiwiaXNDdXJyZW5jeVRleHQiLCJpc0ludDMyIiwicGFyc2VJbnQiLCJpbnQzMlRleHQiLCJleGNlZWRzTWF4VGV4dExlbmd0aCIsIm1heFRleHRMZW5ndGgiLCJmaWVsZCIsImxlbmd0aCIsIm1heExlbmd0aFRleHQiLCJpc0RhdGVJblJhbmdlIiwibWluVmFsdWUiLCJtYXhWYWx1ZSIsIkRhdGUiLCJ2YWx1ZU9mIiwiZGF0ZVJhbmdlVGV4dCIsImlzR3JlYXRlclRoYW4iLCJjb21wIiwiZ3JlYXRlclRoYW4iLCJOdW1iZXIiLCJpc05hTiIsImlzR3JlYXRlclRoYW5UZXh0IiwiaXNMZXNzVGhhbiIsImxlc3NUaGFuIiwiaXNMZXNzVGhhblRleHQiLCJpc1Bob25lTnVtYmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBLE1BQU1BLFdBQVcsb0JBQVksWUFBWixDQUFqQjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQSxNQUFNQyxVQUFVLGVBQUtDLFNBQUwsQ0FBZSxlQUFmLEVBQWdDLDJCQUEyQjtBQUN6RTs7OztBQUlBQyxZQUFRO0FBQ05DLFVBQUksU0FBU0QsTUFBVCxD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QUFhSCxJQUFiLENBQWhDLEVBQW9EO0FBQ2xELGlCQUFPLEtBQVA7QUFDRDs7QUFFRCxZQUFJdkMsUUFBUXVDLElBQVosRUFBa0I7QUFDaEIsaUJBQU8sS0FBUDtBQUNEOztBQUVELGVBQU8sSUFBUDtBQUNELE9BYlM7QUFjVnRDLGVBQVNOLFNBQVNtRDtBQWRSLEtBaEw2RDtBQWdNekU7Ozs7OztBQU1BQyxtQkFBZTtBQXRNMEQsR0FBM0QsQ0FBaEI7O29CQXlNZW5ELE8iLCJmaWxlIjoiVmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgndmFsaWRhdG9ycycpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmFsaWRhdG9yXHJcbiAqIEBjbGFzc2Rlc2MgVmFsaWRhdG9ycyBmb3IgdXNlIGluIHtAbGluayBhcmdvcy5FZGl0fSBmb3Jtcy4gVG8gdXNlIHZhbGlkYXRvcnMsIHlvdSBhZGQgdGhlbSB0byB5b3VyIHZpZXcncyBsYXlvdXQ6XHJcbiAqXHJcbiAqICAgICAgQGV4YW1wbGVcclxuICogICAgICAgY3JlYXRlTGF5b3V0OiBmdW5jdGlvbigpIHtcclxuICogICAgICAgICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gKiAgICAgICAgICAgICAgICAgICBsYWJlbDogdGhpcy5hY2NvdW50VGV4dCxcclxuICogICAgICAgICAgICAgICAgICAgbmFtZTogJ0FjY291bnROYW1lJyxcclxuICogICAgICAgICAgICAgICAgICAgcHJvcGVydHk6ICdBY2NvdW50TmFtZScsXHJcbiAqICAgICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICogICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3Iubm90RW1wdHlcclxuICogICAgICAgICAgICAgICB9LCB7XHJcbiAqICAgICAgICAgICAgICAgICAgIGxhYmVsOiB0aGlzLndlYlRleHQsXHJcbiAqICAgICAgICAgICAgICAgICAgIG5hbWU6ICdXZWJBZGRyZXNzJyxcclxuICogICAgICAgICAgICAgICAgICAgcHJvcGVydHk6ICdXZWJBZGRyZXNzJyxcclxuICogICAgICAgICAgICAgICAgICAgcmVuZGVyZXI6IGZvcm1hdC5saW5rLFxyXG4gKiAgICAgICAgICAgICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAqICAgICAgICAgICAgICAgICAgIGlucHV0VHlwZTogJ3VybCcsXHJcbiAqICAgICAgICAgICAgICAgICAgIG1heFRleHRMZW5ndGg6IDEyOCxcclxuICogICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGhcclxuICogICAgICAgICAgICAgICB9XSk7XHJcbiAqICAgICAgIH1cclxuICogQHNpbmdsZXRvblxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGxhbmcuc2V0T2JqZWN0KCdjcm0uVmFsaWRhdG9yJywgLyoqIEBsZW5kcyBjcm0uVmFsaWRhdG9yICove1xyXG4gIC8qKlxyXG4gICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBleGlzdHNcclxuICAgKiBWYWxpZGF0b3IgdGhhdCBlbnN1cmVzIHRoZSBmaWVsZCBjb250YWlucyBhIHZhbHVlLlxyXG4gICAqL1xyXG4gIGV4aXN0czoge1xyXG4gICAgZm46IGZ1bmN0aW9uIGV4aXN0cyh2YWx1ZSkge1xyXG4gICAgICByZXR1cm4gIXZhbHVlO1xyXG4gICAgfSxcclxuICAgIG1lc3NhZ2U6IHJlc291cmNlLmV4aXN0c1RleHQsXHJcbiAgfSxcclxuXHJcbiAgcGlja2xpc3RFeGlzdHM6IHtcclxuICAgIGZuOiBmdW5jdGlvbiBwaWNrbGlzdEV4aXN0cyh2YWx1ZSkge1xyXG4gICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh2YWx1ZS50ZXh0ID09PSAnJyAmJiB2YWx1ZS5rZXkgPT09ICcnKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBtZXNzYWdlOiByZXNvdXJjZS5leGlzdHNUZXh0LFxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBuYW1lXHJcbiAgICogVmFsaWRhdG9yIHRoYXQgZW5zdXJlcyBhIEZpcnN0TmFtZSBhbmQgTGFzdE5hbWUgcHJvcGVydHkgaGF2ZSBiZWVuIHNwZWNpZmllZC5cclxuICAgKi9cclxuICBuYW1lOiB7XHJcbiAgICBmbjogZnVuY3Rpb24gbmFtZSh2YWx1ZSkge1xyXG4gICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gIS8uKy8udGVzdCh2YWx1ZS5GaXJzdE5hbWUgfHwgJycpIHx8ICEvLisvLnRlc3QodmFsdWUuTGFzdE5hbWUgfHwgJycpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuICAgIG1lc3NhZ2U6IHJlc291cmNlLm5hbWVUZXh0LFxyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogQHByb3BlcnR5IHtPYmplY3R9XHJcbiAgICogVmFsaWRhdG9yIHRoYXQgZW5zdXJlcyBhIGZpZWxkIGlzIG5vdCBlbXB0eS5cclxuICAgKi9cclxuICBub3RFbXB0eToge1xyXG4gICAgdGVzdDogLy4rLyxcclxuICAgIG1lc3NhZ2U6IHJlc291cmNlLm5vdEVtcHR5VGV4dCxcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIEBkZXByZWNhdGVkXHJcbiAgICogQHByb3BlcnR5IHtPYmplY3R9XHJcbiAgICogVmFsaWRhdG9yIHRoYXQgZW5zdXJlcyBhIGZpZWxkIGhhcyB0ZXh0LiAqKldhcm5pbmcqKiBUaGlzIGRvZXMgbm90IHdvcmsgd2l0aCB1bmljb2RlLlxyXG4gICAqL1xyXG4gIGhhc1RleHQ6IHtcclxuICAgIHRlc3Q6IC9cXHcrLyxcclxuICAgIG1lc3NhZ2U6IHJlc291cmNlLmhhc1RleHQsXHJcbiAgfSxcclxuICAvKipcclxuICAgKiBAcHJvcGVydHkge09iamVjdH1cclxuICAgKiBWYWxpZGF0b3IgdGhhdCBlbnN1cmVzIGEgZmllbGQgaXMgYSB2YWxpZCBudW1iZXIuXHJcbiAgICovXHJcbiAgaXNJbnRlZ2VyOiB7XHJcbiAgICB0ZXN0OiAvXlxcZCskLyxcclxuICAgIG1lc3NhZ2U6IHJlc291cmNlLmlzTnVtYmVyVGV4dCxcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBAcHJvcGVydHkge09iamVjdH1cclxuICAgKiBWYWxpZGF0b3IgdGhhdCBlbnN1cmVzIGEgZmllbGQgaXMgYSB2YWxpZCBkZWNpbWFsLlxyXG4gICAqL1xyXG4gIGlzRGVjaW1hbDoge1xyXG4gICAgdGVzdDogL15bXFxkLl0rJC8sXHJcbiAgICBtZXNzYWdlOiByZXNvdXJjZS5pc051bWJlclRleHQsXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogQHByb3BlcnR5IHtPYmplY3R9XHJcbiAgICogVmFsaWRhdG9yIHRoYXQgZW5zdXJlcyBhIGZpZWxkIGlzIHZhbGlkIGN1cnJlbmN5LlxyXG4gICAqL1xyXG4gIGlzQ3VycmVuY3k6IHtcclxuICAgIGZuOiBmdW5jdGlvbiBpc0N1cnJlbmN5KHZhbHVlKSB7XHJcbiAgICAgIHJldHVybiAhKG5ldyBSZWdFeHAoYF5bXFxcXGRdKyhcXFxcLlxcXFxkezEsJHtNb2JpbGUuQ3VsdHVyZUluZm8ubnVtYmVyRm9ybWF0LmN1cnJlbmN5RGVjaW1hbERpZ2l0cyB8fCAnMid9fSk/JGApLnRlc3QodmFsdWUpKTtcclxuICAgIH0sXHJcbiAgICBtZXNzYWdlOiByZXNvdXJjZS5pc0N1cnJlbmN5VGV4dCxcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBAcHJvcGVydHkge09iamVjdH1cclxuICAgKiBWYWxpZGF0b3IgdGhhdCBlbnN1cmVzIGEgZmllbGQgaXMgYSB2YWxpZCBJbnQzMi5cclxuICAgKi9cclxuICBpc0ludDMyOiB7XHJcbiAgICBmbjogZnVuY3Rpb24gaXNJbnQzMih2YWx1ZSkge1xyXG4gICAgICBpZiAodmFsdWUgJiYgKCEvXlxcZHsxLDEwfSQvLnRlc3QodmFsdWUpIHx8IHBhcnNlSW50KHZhbHVlLCAxMCkgPiAyMTQ3NDgzNjQ3KSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBtZXNzYWdlOiByZXNvdXJjZS5pbnQzMlRleHQsXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogQHByb3BlcnR5IHtPYmplY3R9XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG1heFRleHRMZW5ndGhcclxuICAgKiBWYWxpZGF0b3IgdGhhdCBlbnN1cmVzIGEgZmllbGQgZG9lcyBub3QgZXhlZWQgbWF4IGxlbmd0aC4gQ2hlY2tzIHRoZSBsZW5ndGggYWdhaW5zdCBmaWVsZCdzIG1heFRleHRMZW5ndGggcHJvcGVydHkuXHJcbiAgICovXHJcbiAgZXhjZWVkc01heFRleHRMZW5ndGg6IHtcclxuICAgIGZuOiBmdW5jdGlvbiBtYXhUZXh0TGVuZ3RoKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgICBpZiAodmFsdWUgJiYgZmllbGQgJiYgZmllbGQubWF4VGV4dExlbmd0aCAmJiB2YWx1ZS5sZW5ndGggPiBmaWVsZC5tYXhUZXh0TGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSxcclxuICAgIG1lc3NhZ2U6IHJlc291cmNlLm1heExlbmd0aFRleHQsXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogQHByb3BlcnR5IHtPYmplY3R9XHJcbiAgICogQHBhcmFtIHtEYXRlfSBtaW5WYWx1ZVxyXG4gICAqIEBwYXJhbSB7RGF0ZX0gbWF4VmFsdWVcclxuICAgKiBWYWxpZGF0b3IgdGhhdCBlbnN1cmVzIHRoZSBkYXRlIGlzIHdpdGhpbiBhIGNlcnRhaW4gcmFuZ2UuIENoZWNrcyB0aGUgZGF0ZSByYW5nZSBhZ2FpbnN0IHRoZSBmaWVsZCdzIG1pblZhbHVlIGFuZCBtYXhWYWx1ZSBwcm9wZXJ0aWVzLlxyXG4gICAqIElmIGJvdGggYXJlIHNwZWNpZmllZCBhIHJhbmdlIGJldHdlZW4gdGhlIHR3byBpcyB1c2VkLCBvdGhlcndpc2UgYSBsZXNzIHRoYW4gb3IgZ3JlYXRlciB0aGFuIGlzIHVzZWQuXHJcbiAgICovXHJcbiAgaXNEYXRlSW5SYW5nZToge1xyXG4gICAgZm46IGZ1bmN0aW9uIGlzRGF0ZUluUmFuZ2UodmFsdWUsIGZpZWxkKSB7XHJcbiAgICAgIGNvbnN0IG1pblZhbHVlID0gZmllbGQubWluVmFsdWU7XHJcbiAgICAgIGNvbnN0IG1heFZhbHVlID0gZmllbGQubWF4VmFsdWU7XHJcblxyXG4gICAgICAvLyBpZiB2YWx1ZSBpcyBlbXB0eSBvciBub3QgYSBkYXRlLCBpZ25vcmUgY29tcGFyaXNvblxyXG4gICAgICBpZiAoIXZhbHVlIHx8ICEodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKG1pblZhbHVlICYmIG1heFZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlLnZhbHVlT2YoKSA+IG1pblZhbHVlLnZhbHVlT2YoKSAmJiB2YWx1ZS52YWx1ZU9mKCkgPCBtYXhWYWx1ZS52YWx1ZU9mKCkpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAobWluVmFsdWUgJiYgdmFsdWUudmFsdWVPZigpID4gbWluVmFsdWUudmFsdWVPZigpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9IGVsc2UgaWYgKG1heFZhbHVlICYmIHZhbHVlLnZhbHVlT2YoKSA8IG1heFZhbHVlLnZhbHVlT2YoKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG4gICAgbWVzc2FnZTogcmVzb3VyY2UuZGF0ZVJhbmdlVGV4dCxcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBAcHJvcGVydHkge09iamVjdH1cclxuICAgKiBAcGFyYW0ge051bWJlcn0gZ3JlYXRlclRoYW5cclxuICAgKiBWYWxpZGF0b3IgdGhhdCBlbnN1cmVzIHRoZSBmaWVsZCB2YWx1ZSBpcyBncmVhdGVyIHRoYW4gdGhlIHNwZWNpZmllZCBncmVhdGVyVGhhbiBvcHRpb24uXHJcbiAgICogQ29tYmluZSB3aXRoIHRoZSBsZXNzVGhhbiB2YWxpZGF0b3IgdG8gY3JlYXRlIGEgcmFuZ2UuXHJcbiAgICovXHJcbiAgaXNHcmVhdGVyVGhhbjoge1xyXG4gICAgZm46IGZ1bmN0aW9uIGlzR3JlYXRlclRoYW4odmFsdWUsIGZpZWxkKSB7XHJcbiAgICAgIGNvbnN0IGNvbXAgPSBmaWVsZC5ncmVhdGVyVGhhbjtcclxuXHJcbiAgICAgIGlmICh0eXBlb2YgY29tcCAhPT0gJ251bWJlcicgfHwgTnVtYmVyLmlzTmFOKGNvbXApKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodmFsdWUgPiBjb21wKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBtZXNzYWdlOiByZXNvdXJjZS5pc0dyZWF0ZXJUaGFuVGV4dCxcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBAcHJvcGVydHkge09iamVjdH1cclxuICAgKiBAcGFyYW0ge051bWJlcn0gbGVzc1RoYW5cclxuICAgKiBWYWxpZGF0b3IgdGhhdCBlbnN1cmVzIHRoZSBmaWVsZCB2YWx1ZSBpcyB1bmRlciB0aGUgc3BlY2lmaWVkIGxlc3NUaGFuIG9wdGlvbi5cclxuICAgKiBDb21iaW5lIHdpdGggdGhlIGdyZWF0ZXJUaGFuIHZhbGlkYXRvciB0byBjcmVhdGUgYSByYW5nZS5cclxuICAgKi9cclxuICBpc0xlc3NUaGFuOiB7XHJcbiAgICBmbjogZnVuY3Rpb24gaXNMZXNzVGhhbih2YWx1ZSwgZmllbGQpIHtcclxuICAgICAgY29uc3QgY29tcCA9IGZpZWxkLmxlc3NUaGFuO1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiBjb21wICE9PSAnbnVtYmVyJyB8fCBOdW1iZXIuaXNOYU4oY29tcCkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh2YWx1ZSA8IGNvbXApIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuICAgIG1lc3NhZ2U6IHJlc291cmNlLmlzTGVzc1RoYW5UZXh0LFxyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogQHByb3BlcnR5IHtPYmplY3R9XHJcbiAgICogQGRlcHJlY2F0ZWRcclxuICAgKiBAcmVtb3ZlZFxyXG4gICAqIFZhbGlkYXRvciB0aGF0IGVuc3VyZXMgdGhlIGZpZWxkIGlzIGEgcGhvbmUgbnVtYmVyLlxyXG4gICAqL1xyXG4gIGlzUGhvbmVOdW1iZXI6IHt9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==