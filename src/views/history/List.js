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
            '{% if (!$.Timeless) { %}',
            '<span class="p-time">{%: Mobile.SalesLogix.Format.date($.CompletedDate, "h:mm") %}</span>',
            '<span class="p-meridiem">&nbsp;{%: Mobile.SalesLogix.Format.date($.CompletedDate, "tt") %}</span>,',
            '{% } %}',
            '<span class="p-description">&nbsp;{%: $.Description %}</span>',
            '</h3>',
            '<h4>{%: Mobile.SalesLogix.Format.date($.CompletedDate, "ddd M/d/yy") %} - {%= $$.nameTemplate.apply($) %}</h4>'
        ]),
        nameTemplate: new Simplate([
            '{% if ($.LeadName) { %}',
            '{%: $.LeadName %}',
            '{% } else if ($.ContactName && $.AccountName) { %}',
            '{%: $.ContactName %} / {%: $.AccountName %}',
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
        titleText: 'History',
        
        //View Properties
        detailView: 'history_detail',
        detailViewForLead: 'history_detail_for_lead',
        icon: 'content/images/icons/journal_24.png',
        id: 'history_related',
        insertView: 'history_edit',
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
            'LeadId'
        ],
        resourceKind: 'history',

        init: function() {
            Mobile.SalesLogix.History.List.superclass.init.apply(this, arguments);

            this.tools.tbar = [];
        },
        isHistoryForLead: function(entry) {
            return entry && /^[\w]{12}$/.test(entry['LeadId']);
        },
        navigateToDetailView: function(key, descriptor) {
            var entry = this.entries[key];
            
            if (this.isHistoryForLead(entry))
            {
                var view = App.getView(this.detailViewForLead);
                if (view)
                    view.show({
                        descriptor: descriptor,
                        key: key
                    });
            }
            else
            {
                Mobile.SalesLogix.History.List.superclass.navigateToDetailView.apply(this, arguments);
            }          
        },
        formatSearchQuery: function(query) {
            return String.format('upper(Description) like "%{0}%"', query.toUpperCase());
        }
    });
})();
