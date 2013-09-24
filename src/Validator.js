/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Validator', [
    'dojo/_base/lang',
    'dojo/string'
], function(
    lang,
    string
) {
    return lang.setObject('Mobile.SalesLogix.Validator', {
        exists: {
            fn: function(value) {
                return !value;
            },
            message: "The field '${2}' must have a value."
        },
        name: {
            fn: function(value) {
                if (value) {
                    return !/.+/.test(value.FirstName || '') || !/.+/.test(value.LastName || '');
                }
                return true;
            },
            message: "The field '${2}' must have a first and last name specified."
        },
        notEmpty: {
            test: /.+/,
            message: "The field '${2}' cannot be empty."
        },
        /*
         * deprecated
         * WARN: hasText will not work with unicode
         */
        hasText: {
            test: /\w+/,
            message: "The field '${2}' must contain some text."
        },
        isInteger: {
            test: /^\d+$/,
            message: "The value '${0}' is not a valid number."
        },
        isDecimal: {
            test: /^[\d.]+$/,
            message: "The value '${0}' is not a valid number."
        },
        isCurrency: {
            fn: function(value, field) {
                return !(new RegExp(string.substitute('^[\\d]+(\\.\\d{1,${0}})?$', [
                    Mobile.CultureInfo.numberFormat.currencyDecimalDigits || '2'])).test(value));
            },
            message: "The value '${0}' is not a valid currency number."
        },
        isInt32: {
            fn: function(value, field) {
                if (value && (!/^\d{1,10}$/.test(value) || parseInt(value, 10) > 2147483647)) {
                    return true;
                }
                return false;
            },
            message: "The field '${2}' value exceeds the allowed numeric range."
        },
        exceedsMaxTextLength: {
            fn: function(value, field) {
                if (value && field && field.maxTextLength && value.length > field.maxTextLength) {
                    return true;
                }
                return false;
            },
            message: "The field '${2}' value exceeds the allowed limit in length."
        },
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
        isPhoneNumber: { /* todo: remove, depreciated */}
    });
});

