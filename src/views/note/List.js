/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Note");

(function() {
    Mobile.SalesLogix.Note.List = Ext.extend(Sage.Platform.Mobile.List, {
        //Templates
        contentTemplate: new Simplate([
            '<div class="row note-text-row">',
            '<div class="note-text-wrap">',
                '<div>',
                    '<span class="p-time">{%: Mobile.SalesLogix.Format.date($.CreateDate, "h:mm") %}</span>',
                    '<span class="p-meridiem">&nbsp;{%: Mobile.SalesLogix.Format.date($.CreateDate, "tt") %}</span>,',
                    '<span class="p-date">&nbsp;{%: Mobile.SalesLogix.Format.date($.CreateDate, "ddd M/dd/yy") %}</span>',
                    '<span class="p-username"> - {%: $.UserName %}</span>',
                '</div>',
                '{%: $.Notes %}',
            '</div>',
            '<div class="note-text-more"></div>',
            '</div>'
        ]),

        //Localization
        moreText: 'more >>',
        titleText: 'Notes',

        //View Properties
        id: 'note_list',
        icon: 'content/images/icons/note_24.png',
        insertView: 'note_edit',
        detailView: 'note_detail',
        queryOrderBy: 'ModifyDate desc',
        querySelect: [
            'CreateDate',
            'Description',
            'Notes',
            'UserName',
            'Type'
        ],
        resourceKind: 'history',

        init: function() {
            Mobile.SalesLogix.Note.List.superclass.init.call(this);

            App.on('resize', this.onResize, this);
        },
        onResize: function() {
            this.el.select('.note-text-row').each(function(el) {
                if (el.getHeight(true) < el.child('.note-text-wrap').getHeight())
                    el.child('.note-text-more').show();
                else
                    el.child('.note-text-more').hide();
            });
        },
        formatSearchQuery: function(query) {
            return String.format('upper(Notes) like "%{0}%"', query.toUpperCase());
        },
        processFeed: function(feed) {
            Mobile.SalesLogix.Note.List.superclass.processFeed.call(this, feed);

            this.onResize();
        }
    });
})();