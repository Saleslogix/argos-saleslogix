/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

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
define('crm/Validator', [
    'dojo/_base/lang',
    'dojo/string'
], function(
    lang,
    string
) {
    var __class = lang.setObject('crm.Validator', {
        /**
         * @property {Object} exists
         * Validator that ensures the field contains a value.
         */
        exists: {
            fn: function(value) {
                return !value;
            },
            message: "The field '${2}' must have a value."
        },

        /**
         * @property {Object} name
         * Validator that ensures a FirstName and LastName property have been specified.
         */
        name: {
            fn: function(value) {
                if (value) {
                    return !/.+/.test(value.FirstName || '') || !/.+/.test(value.LastName || '');
                }
                return true;
            },
            message: "The field '${2}' must have a first and last name specified."
        },
        /**
         * @property {Object}
         * Validator that ensures a field is not empty.
         */
        notEmpty: {
            test: /.+/,
            message: "The field '${2}' cannot be empty."
        },
        /**
         * @deprecated
         * @property {Object}
         * Validator that ensures a field has text. **Warning** This does not work with unicode.
         */
        hasText: {
            test: /\w+/,
            message: "The field '${2}' must contain some text."
        },
        /**
         * @property {Object}
         * Validator that ensures a field is a valid number.
         */
        isInteger: {
            test: /^\d+$/,
            message: "The value '${0}' is not a valid number."
        },

        /**
         * @property {Object}
         * Validator that ensures a field is a valid decimal.
         */
        isDecimal: {
            test: /^[\d.]+$/,
            message: "The value '${0}' is not a valid number."
        },

        /**
         * @property {Object}
         * Validator that ensures a field is valid currency.
         */
        isCurrency: {
            fn: function(value) {
                return !(new RegExp(string.substitute('^[\\d]+(\\.\\d{1,${0}})?$', [
                    Mobile.CultureInfo.numberFormat.currencyDecimalDigits || '2'])).test(value));
            },
            message: "The value '${0}' is not a valid currency number."
        },

        /**
         * @property {Object}
         * Validator that ensures a field is a valid Int32.
         */
        isInt32: {
            fn: function(value) {
                if (value && (!/^\d{1,10}$/.test(value) || parseInt(value, 10) > 2147483647)) {
                    return true;
                }
                return false;
            },
            message: "The field '${2}' value exceeds the allowed numeric range."
        },

        /**
         * @property {Object}
         * @param {Number} maxTextLength
         * Validator that ensures a field does not exeed max length. Checks the length against field's maxTextLength property.
         */
        exceedsMaxTextLength: {
            fn: function(value, field) {
                if (value && field && field.maxTextLength && value.length > field.maxTextLength) {
                    return true;
                }
                return false;
            },
            message: "The field '${2}' value exceeds the allowed limit in length."
        },

        /**
         * @property {Object}
         * @param {Date} minValue
         * @param {Date} maxValue
         * Validator that ensures the date is within a certain range. Checks the date range against the field's minValue and maxValue properties.
         * If both are specified a range between the two is used, otherwise a less than or greater than is used.
         */
        isDateInRange: {
            fn: function(value, field) {
                var minValue = field.minValue,
                    maxValue = field.maxValue;

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
            message: "The field '${2}' value is out of allowed date range."
        },

        /**
         * @property {Object}
         * @deprecated
         * @removed
         * Validator that ensures the field is a phone number.
         */
        isPhoneNumber: {
        }
    });

    lang.setObject('Mobile.SalesLogix.Validator', __class);
    return __class;
});

