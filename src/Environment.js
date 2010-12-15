/// <reference path="../../ext/ext-core-debug.js"/>
/// <reference path="../../platform/Application.js"/>
/// <reference path="../../platform/Format.js"/>
/// <reference path="../../sdata/SDataService.js"/>

Ext.namespace("Mobile.SalesLogix");

Mobile.SalesLogix.Environment = (function() {
    return {
        initiateCall: function(number) {
            setTimeout(function() {
                window.location.href = String.format("tel:{0}", number);
            }, 0);
        },
        initiateEmail: function(email) {
            setTimeout(function() {
                window.location.href = String.format("mailto:{0}", email);
            }, 0);
        },
        showMapForAddress: function(address) {
            setTimeout(function() {
                window.location.href = String.format("http://maps.google.com/maps?q={0}", address);
            }, 0);
        }
    };
})();
