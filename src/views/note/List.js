/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Note");

Mobile.SalesLogix.Note.List = Ext.extend(Sage.Platform.Mobile.List, {
    contentTemplate: new Simplate([
        '<div class="row defect-text-row">',
        '<div class="defect-text-wrap">',
        '{%: $.Notes %}',
        '</div>',
        '<div class="defect-text-more">',
        '{%: $$.moreText %}',
        '</div>',
        '</div>'
    ]),
    id: 'note_list',
    icon: 'content/images/note_24x24.gif',
    titleText: 'Notes',
    moreText: 'more >>',
    resourceKind: 'history',
    init: function() {
        Mobile.SalesLogix.Note.List.superclass.init.call(this);

        App.on('resize', this.onResize, this);
    },
    onResize: function() {
        this.el.select('.defect-text-row').each(function(el) {
            if (el.child('.defect-text-wrap').getHeight(true) < el.child('.defect-text-wrap a').getHeight())
                el.child('.defect-text-more').show();
            else
                el.child('.defect-text-more').hide();
        });
    },
    formatSearchQuery: function(query) {
        return String.format('Notes like "%{0}%"', query);
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Note.List.superclass.createRequest.call(this);

        request
            .setQueryArgs({
                'orderby': 'ModifyDate',
                'select': [
                    'Notes'
                ].join(',')
            });

        return request;
    },
    processFeed: function(feed) {
        Mobile.SalesLogix.Note.List.superclass.processFeed.call(this, feed);

        this.onResize();
    }
});
