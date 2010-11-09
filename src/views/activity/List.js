/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

(function() {
    Mobile.SalesLogix.Activity.Types = [
        {
            '$key': 'atAppointment',
            '$descriptor': 'Meeting'
        },
        {
            '$key': 'atLiterature',
            '$descriptor': 'Literature Request'
        },
        {
            '$key': 'atPersonal',
            '$descriptor': 'Personal Activity'
        },
        {
            '$key': 'atPhoneCall',
            '$descriptor': 'Phone Call'
        },
        {
            '$key': 'atToDo',
            '$descriptor': 'To-Do'
        }
    ];

    Mobile.SalesLogix.Activity.List = Ext.extend(Sage.Platform.Mobile.List, {
        //Templates
        contentTemplate: new Simplate([
            '<h3>{%: Mobile.SalesLogix.Format.date($.StartDate) %}, {%: $.AccountName %}</h3>',
            '<h4>{%: Mobile.SalesLogix.Activity.ActivityTypesLookup[$.Type] || $.Type %}, {%: $.Description %}</h4>'
        ]),

        //Localization
        titleText: 'Activities',

        //View Properties
        detailView: 'activity_detail',
        icon: 'content/images/icons/job_24.png',
        id: 'activity_list',
        insertView: 'activity_edit',
        queryOrderBy: 'StartDate desc',
        querySelect: [
            'StartDate',
            'AccountName',
            'Type',
            'Description'
        ],
        resourceKind: 'activities',

        init: function() {
            Mobile.SalesLogix.Activity.List.superclass.init.apply(this, arguments);

            var actTypes = {};
            Mobile.SalesLogix.Activity.Types.forEach(function(type){
                actTypes[type.$key] = type.$descriptor;
            });
            Mobile.SalesLogix.Activity.ActivityTypesLookup = actTypes;
        },
        detectLeadContext: function() {
            var hist = [], view, resourceKindPattern = /^(leads)$/;

            var found = App.queryNavigationContext(function(o) {
                hist.push(o);
                return resourceKindPattern.test(o.resourceKind) && o.key;
            });

            if (found) return true;
            //TODO: Context menu must also go into history, since its also a view.
            //Could have gotten here from context menu, bypassing details screen.
            //In this case, the first history item will be our resource kind
            //for eg: leads -> home -> login
            if (!found && resourceKindPattern.test(hist[0].resourceKind))
                return true;

            return false;
        },
        navigateToInsertView: function() {
            if (this.detectLeadContext())
                this.insertView = 'lead_related_activity_edit';
            else
                this.insertView = 'activity_edit';

            Mobile.SalesLogix.Activity.List.superclass.navigateToInsertView.apply(this, arguments);
        },
        formatSearchQuery: function(query) {
            return String.format('Description like "%{0}%"', query);
        }
    });
})();