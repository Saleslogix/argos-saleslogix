/// <reference path="../ext/ext-core-debug.js"/>
/// <reference path="../platform/Application.js"/>
/// <reference path="../sdata/SDataService.js"/>

Ext.namespace("Mobile.SalesLogix");

/// common frequently used templates
Mobile.SalesLogix.Validator = (function() {     
    return {
    	// localization
        existsText: "The field '{2}' must have a value.",
        nameText: "The field '{2}' must have a first and last name specified.",
        notEmptyText: "The field '{2}' cannot be empty.",
        hasTextText: "The field '{2}' must contain some text.",
        isIntegerText: "The value '{0}' is not a valid number.",
        isDecimalText: "The value '{0}' is not a valid number.",
        isCurrencyText: "The value '{0}' is not a valid currency number.",
        isInt32Text: "The field '{2}' value exceeds the allowed numeric range.",
        exceedsMaxTextLengthText: "The field '{2}' value exceeds the allowed limit in length.",
        isDateInRangeText: "The field '{2}' value is out of allowed date range.",

        exists: {
            fn: function(value) {
                return !value;
            },
            message: this.existsText
        },
        name: {
            fn: function(value) {
                if (value)
                    return !/\w+/.test(value.FirstName || '') || !/\w+/.test(value.LastName || '');
                return true;
            },
            message: this.nameText
        },
        notEmpty: {
            test: /.+/,
            message: this.notEmptyText
        },
        hasText: {
            test: /\w+/,
            message: this.hasTextText
        },
        isInteger: {
            test: /^\d+$/,
            message: this.isIntegerText
        },
        isDecimal: {
            // todo: localize - decimal/thousands
            test: /^[\d,.]+$/,
            message: this.isDecimalText
        },
        isCurrency: {
            // todo: localize - decimal/thousands
            test: /^[\d,]+(\.\d{1,2})?$/,
            message: this.isCurrencyText
        },
        isInt32: {
            fn: function(value, field) {
                if (value && (!/^\d{1,10}$/.test(value) || parseInt(value, 10) > 2147483647))
                    return true;
                return false;
            },
            message: this.isInt32Text
        },
        exceedsMaxTextLength: {
            fn: function(value, field) {
                if (value && field && field.maxTextLength && value.length > field.maxTextLength)
                    return true;
                return false;
            },
            message: this.exceedsMaxTextLengthText
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
            message: this.isDateInRangeText
        },
        isPhoneNumber: { /* todo: remove, depreciated */ }
    };
})();