/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Event");

(function() {
    Mobile.SalesLogix.Event.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
        //Localization
        eventTypeText: {
            'atToDo': 'To-Do',
            'atPhoneCall': 'Phone Call',
            'atAppointment': 'Meeting',
            'atLiterature': 'Literature Request',
            'atPersonal': 'Personal Activity'
        },
        actionsText: 'Quick Actions',
        startTimeText: 'start date',
        endTimeText: 'end date',
        titleText: 'Event',
        descriptionText: 'description',
        typeText: 'type',
        whenText: 'When',
        startDateFormatText: 'M/d/yyyy h:mm:ss tt',
        endDateFormatText: 'M/d/yyyy h:mm:ss tt',

        //View Properties
        id: 'event_detail',
        editView: 'event_edit',
        querySelect: [
            'Description',
            'EndDate',
            'StartDate',
            'UserId',
            'Type'
        ],
        resourceKind: 'events',

        formatEventType: function(val) {
            return this.eventTypeText[val] || val;
        },
        init: function() {
            Mobile.SalesLogix.Activity.Detail.superclass.init.apply(this, arguments);

            this.tools.fbar = [{
                cls: '',
                fn: function() {
                    App.navigateToActivityInsertView.call(App, {"id": this.id});
                },
                icon: 'content/images/icons/To_Do_24x24.png',
                name: 'schedule',
                scope: this,
                title: this.fbarScheduleTitleText
            }];
        },
        processEntry: function(entry) {
            Mobile.SalesLogix.Activity.Detail.superclass.processEntry.apply(this, arguments);
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                options: {
                    title: this.detailsText
                },
                as: [{
                    name: 'Type',
                    label: this.typeText,
                    renderer: this.formatEventType.createDelegate(this)
                },{
                    name: 'Description',
                    label: this.descriptionText
                }]
            },{
                options: {
                    title: this.whenText
                },
                as: [{
                    name: 'StartDate',
                    label: this.startTimeText,
                    renderer: Mobile.SalesLogix.Format.date.createDelegate(
                        this, [this.startDateFormatText], true
                    )
                },{
                    name: 'EndDate',
                    label: this.endTimeText,
                    renderer: Mobile.SalesLogix.Format.date.createDelegate(
                        this, [this.endDateFormatText], true
                    )
                }]
            }]);
        }        
    });
})();
