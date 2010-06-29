/// <reference path="../ext/ext-core-debug.js"/>
/// <reference path="../platform/Application.js"/>
/// <reference path="../sdata/SDataService.js"/>

Ext.namespace("Mobile.SalesLogix");

/// common frequently used templates
Mobile.SalesLogix.Template = (function() {
    return {
        nameLF: new Simplate([
            '{%= $["FirstName"] %}, {%= $["LastName"] %}'
        ])
    };
})();