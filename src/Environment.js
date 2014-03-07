/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Environment', [
    'dojo/_base/lang',
    'dojo/_base/window',
    'dojo/_base/array',
    'dojo/has',
    'dojo/on',
    'dojo/string',
    'dojo/dom-construct',
    'dojo/_base/sniff'
], function(
    lang,
    win,
    array,
    has,
    on,
    string,
    domConstruct
) {
    return lang.setObject('Mobile.SalesLogix.Environment', {
        // todo: open a new browser window for these when on a mobile device?
        // on a mobile device, launching an external handler can impact a view transition, and cause issues, which the timeout takes care of.
        // not the best way, perhaps a post-transition callback should be used for launching these? check transitioning, then queue if needed?
        initiateCall: function(number) {
            setTimeout(function() {
                window.location.href = string.substitute("tel:${0}", [number]);
            }, 500);
        },
        initiateEmail: function(email, subject, body) {
            setTimeout(function() {
                var mailtoUri = (subject)
                    ? string.substitute("mailto:${0}?subject=${1}&body=${2}", [email, subject, body || ''])
                    : string.substitute("mailto:${0}", [email]);
                window.location.href = mailtoUri;
            }, 1000); // 1 sec delay for iPad iOS5 to actually save nav state to local storage
        },
        showMapForAddress: function(address) {
            var hiddenLink, href, windowName = '_blank';

            href = string.substitute("http://maps.google.com/maps?q=${0}", [address]);

            if (has('ie')) {
                window.open(href, windowName);
            } else {
                hiddenLink = domConstruct.create('a', {
                    href: href,
                    target: windowName
                }, win.body(), 'last');

                on.emit(hiddenLink, 'click', {
                    bubbles: true,
                    cancelable: true
                });

                domConstruct.destroy(hiddenLink);
            }
        },
        attachmentViewsToRefresh: [
            'myattachment_list',
            'attachment_list',
            'attachment_related',
            'account_attachment_related',
            'contact_attachment_related',
            'lead_attachment_related',
            'opportunity_attachment_related',
            'ticket_attachment_related',
            'activity_attachment_related',
            'history_attachment_related'
        ],
        activityViewsToRefresh: [
            'myactivity_list',
            'activity_list',
            'activity_detail',
            'activity_related',
            'ticketactivity_related',
            'history_related',
            'history_list'
        ],
        detailViewsToRefreshOnUpdate: [
            'account_detail',
            'contact_detail',
            'opportunity_detail',
            'lead_detail',
            'ticket_detail'
        ],
        refreshStaleDetailViews: function() {
            // List of detail views that will need refreshed when a note is added or an activity is completed (possibly others??).
            // Otherwise the etag will change and the server will give a 412: Preconditioned failed when we attempt to edit/save.
            var views = Mobile.SalesLogix.Environment.detailViewsToRefreshOnUpdate || [];
            Mobile.SalesLogix.Environment.refreshViews(views);
        },
        refreshActivityLists: function() {
            var views = Mobile.SalesLogix.Environment.activityViewsToRefresh || [];
            Mobile.SalesLogix.Environment.refreshViews(views);
        },
        refreshAttachmentViews: function() {
            var views = Mobile.SalesLogix.Environment.attachmentViewsToRefresh || [];
            Mobile.SalesLogix.Environment.refreshViews(views);
        },
        refreshViews: function(views) {
            if (views && views.length > 0) {
                array.forEach(views, function(view_id) {
                    var view = App.getView(view_id);
                    if (view) {
                        view.refreshRequired = true;
                    }
                });
            }
        }
    });
});

