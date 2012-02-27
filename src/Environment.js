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
            initiateEmail: function(email, subject, body) {
                setTimeout(function() {
                    var mailtoUri = (subject)
                        ? dojo.string.substitute("mailto:${0}?subject=${1}&body=${2}", [email, subject, body||''])
                        : dojo.string.substitute("mailto:${0}", [email])
                    window.location.href = mailtoUri;
                }, 50);
            },
            showMapForAddress: function(address) {
                setTimeout(function() {
                    var eventFire = function(node, eventType){
                        if (node.fireEvent) { // for IE
                            node.fireEvent('on' + eventType);
                            node[eventType]();
                        } else {
                            var event = document.createEvent('MouseEvents');
                            event.initMouseEvent(eventType, true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                            node.dispatchEvent(event);

                            // FF 3.6-4 do not follow untrusted events, fixed in FF5+
                            // https://bugzilla.mozilla.org/show_bug.cgi?id=666604
                            if (dojo.isFF < 5)
                                window.open(node.href);
                        }
                    };

                    var hiddenLink = dojo.create('a', {
                        href: dojo.string.substitute("http://maps.google.com/maps?q=${0}", [address]),
                        target: '_blank'
                    }, dojo.body(), 'last');

                    eventFire(hiddenLink, 'click');

                    dojo.destroy(hiddenLink);

                }, 50);
            }
        };

    })();
});
