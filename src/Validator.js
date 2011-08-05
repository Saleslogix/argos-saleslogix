/// <reference path="../ext/ext-core-debug.js"/>
/// <reference path="../platform/Application.js"/>
/// <reference path="../sdata/SDataService.js"/>

Ext.namespace("Mobile.SalesLogix");

/// common frequently used templates
Mobile.SalesLogix.Validator = (function() {     
    return {
        exists: {
            fn: function(value) {
                return !value;
            },
            message: "The field '{2}' must have a value."
        },
        name: {
            fn: function(value) {
                if (value)
                    return !/\w+/.test(value.FirstName || '') || !/\w+/.test(value.LastName || '');
                return true;
            },
            message: "The field '{2}' must have a first and last name specified."
        },
        notEmpty: {
            test: /.+/,
            message: "The field '{2}' cannot be empty."
        },
        hasText: {
            test: /\w+/,
            message: "The field '{2}' must contain some text."
        },
        isInteger: {
            test: /^\d+$/,
            message: "The value '{0}' is not a valid number."
        },
        isDecimal: {
            test: /^[\d,.]+$/,
            message: "The value '{0}' is not a valid number."
        },
        isCurrency: {
            test: /^[\d,]+(\.\d{1,2})?$/,
            message: "The value '{0}' is not a valid currency number."
        },
        isInt32: {
            fn: function(value, field) {
                if (value && (!/^\d{1,10}$/.test(value) || parseInt(value, 10) > 2147483647))
                    return true;
                return false;
            },
            message: "The field '{2}' value exceeds the allowed numeric range."
        },
        exceedsMaxTextLength: {
            fn: function(value, field) {
                if (value && field && field.maxTextLength && value.length > field.maxTextLength)
                    return true;
                return false;
            },
            message: "The field '{2}' value exceeds the allowed limit in length."
        },
        isDateInRange: {
            fn: function(value, field) {
                var minValue = field.minValue,
                    maxValue = field.maxValue;
                //If value is empty, ignore comparison
                if (!value) return false;

                if (minValue && value instanceof Date && value.compareTo(minValue) === 1) return false;
                if (maxValue && value instanceof Date && value.compareTo(maxValue) === -1) return false;
                return true;
            },
            message: "The field '{2}' value is out of allowed date range."
        },
        isPhoneNumber: { /* todo: remove, depreciated */ }
    };
})();    


