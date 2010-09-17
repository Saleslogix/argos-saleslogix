/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataResourceCollectionRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/List.js"/>

Ext.namespace("Mobile.SalesLogix.Note");

Mobile.SalesLogix.Note.List = Ext.extend(Sage.Platform.Mobile.List, {
    titleText: 'Note',
    fbartitleText: 'note',
    moveToNextPage: 'more &gt;&gt;',
    contentTemplate: new Simplate([
        '<div class="row defect-text-row">',
        '<div class="defect-text-wrap">',
        '<a href="#note_detail" target="_detail" data-key="{%= $key %}" data-descriptor="{%: $descriptor %}">',
        '<h3>{%= $["Notes"] %}</h3>',
        '</a>',
        '</div>',
        '<div class="defect-text-more">',
        '<a href="#note_detail" target="_detail" data-key="{%= $key %}" data-descriptor="{%: $descriptor %}">more &gt;&gt;</a>',
        '</div>',
        '</div>'
    ]),
    constructor: function(o) {
        Mobile.SalesLogix.Note.List.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'note_list',
            title: this.titleText,
            resourceKind: 'history',
            pageSize: 25,
            icon: 'content/images/Note_24x24.gif'
        });

        Ext.apply(this.tools || {}, {
            fbar: [{
                name: 'test',
                title: this.titleText,
                cls: 'tool-note',
                icon: 'content/images/Note_32x32.gif',
                fn: function() { alert("one"); },
                scope: this
            },{
                name: 'test2',
                title: this.titleText,
                icon: 'content/images/Whats_New_3D_Files_32x32.gif',
                fn: function() { alert("two");},
                scope: this
            }]
        })
    },
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
