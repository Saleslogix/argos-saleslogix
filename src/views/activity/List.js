/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

(function() {    
    Mobile.SalesLogix.Activity.List = Ext.extend(Sage.Platform.Mobile.List, {
        //Templates
        itemTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="{%: $.Type %}">',
            '<div data-action="selectEntry" class="list-item-selector"></div>',
            '{%! $$.contentTemplate %}',
            '</li>'
        ]),
        activityTimeTemplate: new Simplate([
            '{% if ($.Timeless) { %}',
            '<span class="p-meridiem">All-Day</span>',
            '{% } else { %}',
            '<span class="p-time">{%: Mobile.SalesLogix.Format.date($.StartDate, "h:mm") %}</span>',
            '<span class="p-meridiem">&nbsp;{%: Mobile.SalesLogix.Format.date($.StartDate, "tt") %}</span>,',
            '{% } %}'
        ]),
        contentTemplate: new Simplate([
            '<h3>',
            '{%= $$.activityTimeTemplate.apply($) %}',
            '<span class="p-description">&nbsp;{%: $.Description %}</span>',
            '</h3>',
            '<h4>{%: Mobile.SalesLogix.Format.date($.StartDate, "ddd M/d/yy", Sage.Platform.Mobile.Convert.toBoolean($.Timeless)) %} - {%= $$.nameTemplate.apply($) %}</h4>'
        ]),
        nameTemplate: new Simplate([
            '{% if ($.ContactName) { %}',
            '{%: $.ContactName %} / {%: $.AccountName %}',
            '{% } else if ($.AccountName) { %}',
            '{%: $.AccountName %}',
            '{% } else { %}',
            '{%: $.LeadName %}',
            '{% } %}'
        ]),

        //Localization
        titleText: 'Activities',      

        //View Properties
        id: 'activity_list',
        icon: 'content/images/icons/To_Do_24x24.png',
        detailView: 'activity_detail',
        insertView: 'activity_types_list',
        queryOrderBy: 'Timeless desc, StartDate desc',
        querySelect: [
            'Description',
            'StartDate',
            'Type',
            'AccountName',
            'ContactName',
            'LeadId',
            'LeadName',
            'UserId',
            'Timeless'
        ],
        resourceKind: 'activities',
                
        formatSearchQuery: function(query) {
            return String.format('upper(Description) like "%{0}%"', this.escapeSearchQuery(query.toUpperCase()));
        }
    });
})();
