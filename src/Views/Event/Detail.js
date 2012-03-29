/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

define('Mobile/SalesLogix/Views/Event/Detail', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Detail'
], function(
    declare,
    format,
    Detail
) {

    return declare('Mobile.SalesLogix.Views.Event.Detail', [Detail], {
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
        security: null, //'Entities/Event/View',
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
            this.inherited(arguments);
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                title: this.detailsText,
                name: 'DetailsSection',
                children: [{
                    name: 'Type',
                    property: 'Type',
                    label: this.typeText,
                    renderer: this.formatEventType.bindDelegate(this)
                },{
                    name: 'Description',
                    property: 'Description',
                    label: this.descriptionText
                }]
            },{
                title: this.whenText,
                name: 'WhenSection',
                children: [{
                    name: 'StartDate',
                    property: 'StartDate',
                    label: this.startTimeText,
                    renderer: format.date.bindDelegate(
                        this, this.startDateFormatText)
                },{
                    name: 'EndDate',
                    property: 'EndDate',
                    label: this.endTimeText,
                    renderer: format.date.bindDelegate(
                        this, this.endDateFormatText)
                }]
            }]);
        }        
    });
});