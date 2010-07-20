/// <reference path="../ext/ext-core-debug.js"/>
/// <reference path="../platform/Application.js"/>
/// <reference path="../sdata/SDataService.js"/>

Ext.namespace("Mobile.SalesLogix");

/// common frequently used templates
Mobile.SalesLogix.Validator = (function() {     
    return {                
        notEmpty: {
            test: /.+/,
            message: "'{0}' cannot be empty."
        },
        hasText: {
            test: /\w+/,
            message: "'{0}' cannot be empty."
        },
        isInteger: {
            test: /^\d+$/,
            message: "'{1}' is not an integer."
        }
    };
})();    


