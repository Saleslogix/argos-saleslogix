/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.Activity.RelatedView
 *
 * @extends Sage.Platform.Mobile.RelatedViewWidget
 *
 * @requires Sage.Platform.Mobile.Convert
 *
 * @requires Mobile.SalesLogix.Format
 *
 * @requires moment
 */

define('Mobile/SalesLogix/Views/Activity/RelatedView', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/connect',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Convert',
    'Sage/Platform/Mobile/RelatedViewWidget',
    'moment',
    'Mobile/SalesLogix/Recurrence'
], function(
    declare,
    lang,
    connect,
    format,
    convert,
    RelatedViewWidget,
    moment,
    recur
) {
    return declare('Mobile.SalesLogix.Views.Activity.RelatedView', [RelatedViewWidget], {

        activitiesText: 'Actvities',
        completeText: 'Complete',
        completeOccurenceText: 'Complete Occurence',
        completeSeriesText: 'Complete Series',
        completeUnScheduledText: 'complete UnScheduled',
        byText:'by',

        id: 'relatedView_actvity',
        icon: 'content/images/icons/To_Do_24x24.png',
        itemIcon: 'content/images/icons/To_Do_24x24.png',
        title: "Activities",
        detailViewId: 'activity_detail',
        insertViewId: 'activity_types_list',
        listViewId: 'activity_related',
        completeViewId: 'activity_complete',
        listViewWhere: null,
        enabled: true,
        showAdd: true,
        enableItemActions: true,
        resourceKind: 'activities',
        contractName: 'system',
        recurringActivityIdSeparator: ';',
        include: ['Leader'],
        select: [
            'Description',
            'StartDate',
            'Type',
            'AccountId',
            'AccountName',
            'ConatactId',
            'ContactName',
            'PhoneNumber',
            'LeadId',
            'LeadName',
            'TicketId',
            'OpportunityId',
            'Leader',
            'UserId',
            'UserName',
            'Timeless',
            'Alarm',
            'Priority',
            'ModifyDate',
            'RecurrenceState',
            'Recurring',
            'Notes'
        ],
        where:null ,
        sort: 'StartDate Desc',
        relatedItemIconTemplate: new Simplate([
          '<img src="{%= $$.getActivityIcon($) %}" />'
        ]),
        relatedItemHeaderTemplate: new Simplate([
            '<h4><strong>{%: $$.getItemDescriptor($) %}</strong></h4>',
            '<h4> {%: $$.byText %} {%: Mobile.SalesLogix.Format.relativeDate($.StartDate, Sage.Platform.Mobile.Convert.toBoolean($.Timeless)) %}</h4>',
           // '<h4>{%: Mobile.SalesLogix.Format.formatByUser($.UserName) %} {%: $$.byText %} {%: Mobile.SalesLogix.Format.relativeDate($.StartDate, Sage.Platform.Mobile.Convert.toBoolean($.Timeless)) %}</h4>'
        ]),
        relatedItemDetailTemplate: new Simplate([
               '<div class="note-text-wrap">',
                '<h4>{%: $.Notes %} ... </h4>',
              '</div>'
        ]),
        activityIconByType: {
            'atToDo': 'content/images/icons/To_Do_24x24.png',
            'atPhoneCall': 'content/images/icons/Call_24x24.png',
            'atAppointment': 'content/images/icons/Meeting_24x24.png',
            'atLiterature': 'content/images/icons/Schedule_Literature_Request_24x24.gif',
            'atPersonal': 'content/images/icons/Personal_24x24.png',
            'atQuestion': 'content/images/icons/help_24.png',
            'atNote': 'content/images/icons/note_24.png',
            'atEMail': 'content/images/icons/letters_24.png'
        },
        nameTemplate: new Simplate([
          '{% if ($.ContactName) { %}',
          '{%: $.ContactName %} | {%: $.AccountName %}',
          '{% } else if ($.AccountName) { %}',
          '{%: $.AccountName %}',
          '{% } else { %}',
          '{%: $.LeadName %}',
          '{% } %}'
        ]),
        getActivityIcon: function(entry){
            var icon;
            icon = this.activityIconByType[entry.Type] ? this.activityIconByType[entry.Type] : 'content/images/icons/To_Do_24x24.png';
            return icon;
        },
        getItemDescriptor: function(entry) {
            if (entry) {
                entry['$descriptor'] = (entry.description) ? entry.description : entry.$descriptor;
                return  entry.$descriptor;
            }
            return '';
        },
        createActionLayout: function() {

            if (!this.actions) {
                this.actions = [];
            }
            this.actions.push({
                id: 'complete_uncshedule_activity',
                icon: 'content/images/icons/New_Note_24x24.png',
                label: this.completeUnScheduledText,
                action: 'onCompleteUnScheduled',
                fn: this.onCompleteUnScheduled.bindDelegate(this)
            });
            return this.actions;
        },
        createItemActionLayout: function() {

            if (!this.itemActions) {
                this.itemActions = [];
            }
            this.itemActions.push({
                id: 'complete',
                icon: 'content/images/icons/Clear_Activity_24x24.png',
                label: this.completeText,
                action: 'onComplete',
                enabled: this.checkCanComplete,
                exclude: this.isActivityRecurringSeries,
                fn: this.onComplete.bindDelegate(this)
            });
            this.itemActions.push({
                id: 'completeSeries',
                icon: 'content/images/icons/Clear_Activity_24x24.png',
                label: this.completeSeriesText,
                action: 'onCompleteSeries',
                enabled: this.checkCanComplete,
                include: this.isActivityRecurringSeries,
                fn: this.onCompleteSeries.bindDelegate(this)
            });
            this.itemActions.push({
                id: 'completeOccurence',
                icon: 'content/images/icons/Clear_Activity_24x24.png',
                label: this.completeOccurenceText,
                action: 'onCompleteOccurence',
                enabled: this.checkCanComplete,
                include: this.isActivityRecurringSeries,
                fn: this.onCompleteOccurence.bindDelegate(this)
            });
            return this.itemActions;
        },
        checkCanComplete: function(entry) {
            if (entry) {
                return (entry['Leader']['$key'] === App.context['user']['$key']);
            }
            return false;
        },
        isActivityRecurring: function(entry) {
            return entry && (entry['Recurring'] || entry['RecurrenceState'] == 'rstOccurrence');
        },
        isActivityRecurringSeries: function(entry) {
            return this.isActivityRecurring(entry) && !recur.isAfterCompletion(entry['RecurPeriod']);
        },
        navigateToCompleteView: function(entry, title) {
            var view, options;

            view = App.getView(this.completeViewId);

            if (view) {
                //environment.refreshActivityLists();
                options = {
                    title: title,
                    template: {}
                };
                options.entry = entry;
                view.show(options);
            }
        },
        onCompleteUnScheduled: function() {
            //this.completeActivity(key, entry, this.completeSeriesText, true);
        },
        onCompleteSeries: function(action, key, entry) {
            this.completeActivity(key, entry, this.completeSeriesText, true);
        },
        onCompleteOccurence: function(action, key, entry) {
            this.completeActivity(key, entry, this.completeOccurenceText, false);
        },
        onComplete: function(action, key, entry) {
            this.completeActivity(key, entry, this.completeText, false);
        },
        completeActivity: function(key, entry, title, isSeries){
            var request, service;
            service = this.store.service;
            // Check to ensure we have a composite key (meaning we have the occurance, not the master)
            if (this.isActivityRecurring(entry) && key.split(this.recurringActivityIdSeparator).length !== 2) {
                // Fetch the occurance, and continue on to the complete screen
                request = new Sage.SData.Client.SDataResourceCollectionRequest(service)
                    .setResourceKind('activities')
                    .setContractName('system')
                    .setQueryArg('where', "id eq '" + key + "'")
                    .setCount(1);

                request.read({
                    success: this.processOccurance,
                    scope: this
                });
            } else {
                this.navigateToCompleteView(entry, title);
            }
       },
        processOccurance: function(feed) {
            var entry;
            if (feed && feed.$resources && feed.$resources.length > 0) {
                entry = feed.$resources[0];
                this.navigateToCompleteView(entry,this.completeOccrenceText);
            }
        }
    
    });
});
