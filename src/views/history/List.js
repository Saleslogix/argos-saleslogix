/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.History");

(function() {
    Mobile.SalesLogix.History.List = Ext.extend(Sage.Platform.Mobile.List, {
        //Templates
        itemTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="{%: $.Type %}">',
            '<div data-action="selectEntry" class="list-item-selector"></div>',
            '{%! $$.contentTemplate %}',
            '</li>'
        ]),
        contentTemplate: new Simplate([
            '<h3>',
            '{% if ($.Type === "atNote") { %}',
            '<span class="p-time">{%: $$.formatDate($.ModifyDate) %}</span>',
            '<span class="p-meridiem">&nbsp;{%: $$.formatMeridiem($.ModifyDate) %}</span>,',
            '{% } else { %}',
            '<span class="p-time">{%: $$.formatDate($.CompletedDate) %}</span>',
            '<span class="p-meridiem">&nbsp;{%: $$.formatMeridiem($.CompletedDate) %}</span>,',
            '{% } %}',
            '<span class="p-description">&nbsp;{%: $.Description %}</span>',
            '</h3>',
            '<h4>{%= $$.nameTemplate.apply($) %}</h4>',
            '<div class="note-text-item">',
                '<div class="note-text-wrap">',
                    '{%: $.LongNotes %}',
                '</div>',
                '<div class="note-text-more"></div>',
            '</div>'
        ]),
        nameTemplate: new Simplate([
            '{% if ($.LeadName && $.AccountName) { %}',
            '{%: $.LeadName %}, {%: $.AccountName %}',
            '{% } else if ($.LeadName) { %}',
            '{%: $.LeadName %}',
            '{% } else if ($.ContactName && $.AccountName) { %}',
            '{%: $.ContactName %}, {%: $.AccountName %}',
            '{% } else if ($.ContactName) { %}',
            '{%: $.ContactName %}',
            '{% } else { %}',
            '{%: $.AccountName %}',
            '{% } %}'
        ]),
 
        //Localization
        activityTypeText: {
            'atToDo': 'To-Do',
            'atPhoneCall': 'Phone Call',
            'atAppointment': 'Meeting',
            'atLiterature': 'Literature Request',
            'atPersonal': 'Personal Activity',
            'atQuestion': 'Question',
            'atEMail': 'E-mail'
        },
        titleText: 'Notes/History',
        
        //View Properties
        detailView: 'history_detail',
        icon: 'content/images/icons/journal_24.png',
        id: 'history_list',
        insertView: 'history_note_edit',
        queryOrderBy: 'CompletedDate desc',
        querySelect: [
            'AccountName',
            'ContactName',
            'LeadName',
            'CompletedDate',
            'Description',
            'StartDate',
            'TimeLess',
            'Type',
            'LeadId',
            'ModifyDate',
            'LongNotes'
        ],
        queryWhere: 'Type ne "atDatabaseChange"',
        resourceKind: 'history',

        formatDate: function(date) {
            var toDateFromString = Sage.Platform.Mobile.Convert.toDateFromString,
                formatDate = Mobile.SalesLogix.Format.date;

            if (toDateFromString(date).between(Date.today(), Date.today().add({hours:24})))
                return formatDate(date, "h:mm");

            return formatDate(date, "M/d/yy");
        },
        formatMeridiem: function(date) {
            var toDateFromString = Sage.Platform.Mobile.Convert.toDateFromString,
                formatDate = Mobile.SalesLogix.Format.date;

            if (toDateFromString(date).between(Date.today(), Date.today().add({hours:24})))
                return formatDate(date, "tt");

            return "";
        },
        init: function() {
            Mobile.SalesLogix.History.List.superclass.init.apply(this, arguments);

            App.on('resize', this.onResize, this);
        },
        formatSearchQuery: function(query) {
            return String.format('upper(Description) like "%{0}%"', query.toUpperCase());
        },
        onResize: function() {
            this.el.select('.note-text-item').each(function(el) {
                if (el.getHeight(true) < el.child('.note-text-wrap').getHeight())
                    el.child('.note-text-more').show();
                else
                    el.child('.note-text-more').hide();
            });
        },
        processFeed: function(feed) {
            Mobile.SalesLogix.History.List.superclass.processFeed.call(this, feed);

            this.onResize();
        }
    });
})();
