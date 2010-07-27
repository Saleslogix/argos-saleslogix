/// <reference path="../ext/ext-core-debug.js"/>
/// <reference path="../platform/Application.js"/>
/// <reference path="../sdata/SDataService.js"/>

Ext.namespace("Mobile.SalesLogix");

/// common frequently used templates
Mobile.SalesLogix.Validator = (function() {     
    return {                
        notEmpty: {
            test: /.+/,
            message: "'{1}' cannot be empty."
        },
        hasText: {
            test: /\w+/,
            message: "'{1}' cannot be empty."
        },
        isInteger: {
            test: /^\d+$/,
            message: "'{0}' is not an integer."
        },
        isDecimal: {
            test: /^[\d,.]+$/,
            message: "'{0}' is not a decimal."
        },
        isPhoneNumber: {
            fn: function(phoneNumber) {
                var phoneRegExp = /^[\w\d)( ]+$/i;
                if (!phoneRegExp.test(phoneNumber) || /(?:x{2,})|(?:x\d+x)/i.test(phoneNumber)) {
                    return "'{0}' is not a valid phone number."
                }
                return false;
            }
        }
    };
})();    


