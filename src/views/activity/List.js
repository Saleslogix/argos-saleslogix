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
        contentTemplate: new Simplate([            
            '<h3>',
            '<span class="p-time">{%: Mobile.SalesLogix.Format.date($.StartDate, "h:mm") %}</span>',
            '<span class="p-meridiem">&nbsp;{%: Mobile.SalesLogix.Format.date($.StartDate, "tt") %}</span>,',
            '<span class="p-description">&nbsp;{%: $.Description %}</span>',
            '</h3>',
            '<h4>{%: Mobile.SalesLogix.Format.date($.StartDate, "ddd M/d/yy") %} - {%= $$.nameTemplate.apply($) %}</h4>'
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
        detailViewForLead: 'activity_detail_for_lead',
        insertView: 'activity_types_list',
        queryOrderBy: 'StartDate desc',
        querySelect: [
            'Description',
            'StartDate',
            'Type',
            'AccountName',
            'ContactName',
            'LeadId',
            'LeadName',
            'UserId'
        ],
        resourceKind: 'activities',
        
        isActivityForLead: function(entry) {
            return entry && /^[\w]{12}$/.test(entry['LeadId']);
        },
        navigateToDetailView: function(key, descriptor) {
            var entry = this.entries[key];
            
            if (this.isActivityForLead(entry))
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
                Mobile.SalesLogix.Activity.List.superclass.navigateToDetailView.apply(this, arguments);
            }          
        },
        formatSearchQuery: function(query) {
            return String.format('upper(Description) like "{0}%"', query.toUpperCase());
        }
    });
})();