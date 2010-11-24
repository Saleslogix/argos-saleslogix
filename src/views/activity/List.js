/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

(function() {    
    Mobile.SalesLogix.Activity.List = Ext.extend(Sage.Platform.Mobile.List, {
        //Templates
        contentTemplate: new Simplate([
            '<h3>{%: Mobile.SalesLogix.Format.date($.StartDate, "h:mm") %}, {%: $.Description %}</h3>',
            '<h4>{%: Mobile.SalesLogix.Format.date($.StartDate) %} - {%: $$.activityTypeText[$.Type] || $.Type %}, {%: $.UserId %}</h4>'
        ]),

        //Localization
        titleText: 'Activities',
        activityTypeText: {
            'atToDo': 'To-Do',
            'atPhoneCall': 'Phone Call',
            'atAppointment': 'Meeting',
            'atLiterature': 'Literature Request',
            'atPersonal': 'Personal Activity'
        },

        //View Properties
        detailView: 'activity_detail',
        detailViewForLead: 'activity_detail_for_lead',
        icon: 'content/images/icons/job_24.png',
        id: 'activity_list',
        insertView: 'activity_types_list',
        queryOrderBy: 'StartDate desc',
        querySelect: [
            'Description',
            'StartDate',
            'Type',
            'UserId',
            'LeadId'
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
            return String.format('Description like "%{0}%"', query);
        }
    });
})();