/// <reference path="../ext/ext-core-debug.js"/>
/// <reference path="../platform/Application.js"/>
/// <reference path="../sdata/SDataService.js"/>

Ext.namespace("Mobile.SalesLogix");

/// common frequently used templates
Mobile.SalesLogix.Validator = (function() {     
    return {                
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
            message: "The value '{0}' is not an integer."
        },
        isDecimal: {
            test: /^[\d,.]+$/,
            message: "The value '{0}' is not a decimal."
        },
        isCurrency: {
            test: /^[\d,]+(\.\d{1,2})?$/,
            message: "The value '{0}' is not a valid currency number."
        },
        isPhoneNumber: { /* todo: remove, depreciated */ }
    };
})();    


