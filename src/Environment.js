/// <reference path="../../ext/ext-core-debug.js"/>
/// <reference path="../../platform/Application.js"/>
/// <reference path="../../platform/Format.js"/>
/// <reference path="../../sdata/SDataService.js"/>

define('Mobile/SalesLogix/Environment', [], function() {

    dojo.setObject('Mobile.SalesLogix.Environment', null);
    return Mobile.SalesLogix.Environment = (function() {
        // todo: open a new browser window for these when on a mobile device?
        // on a mobile device, launching an external handler can impact a view transition, and cause issues, which the timeout takes care of.
        // not the best way, perhaps a post-transition callback should be used for launching these? check transitioning, then queue if needed?
        return {
            initiateCall: function(number) {
                setTimeout(function() {
                    window.location.href = dojo.string.substitute("tel:${0}", [number]);
                }, 50);
            },
            initiateEmail: function(email) {
                setTimeout(function() {
                    window.location.href = dojo.string.substitute("mailto:${0}", [email]);
                }, 50);
            },
            showMapForAddress: function(address) {
                setTimeout(function() {
                    window.location.href = dojo.string.substitute("http://maps.google.com/maps?q=${0}", [address]);
                }, 50);
            }
        };

    })();
});
