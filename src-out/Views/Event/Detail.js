/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
/**
 * @class crm.Views.Event.Detail
 *
 * @extends argos.Detail
 *
 * @requires crm.Format
 */
define('crm/Views/Event/Detail', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    '../../Format',
    'argos/Detail'
], function (declare, lang, format, Detail) {
    var __class = declare('crm.Views.Event.Detail', [Detail], {
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
        startDateFormatText: 'M/D/YYYY h:mm:ss A',
        endDateFormatText: 'M/D/YYYY h:mm:ss A',
        //View Properties
        id: 'event_detail',
        editView: 'event_edit',
        security: null,
        querySelect: [
            'Description',
            'EndDate',
            'StartDate',
            'UserId',
            'Type'
        ],
        resourceKind: 'events',
        formatEventType: function (val) {
            return this.eventTypeText[val] || val;
        },
        init: function () {
            this.inherited(arguments);
        },
        createLayout: function () {
            return this.layout || (this.layout = [{
                    title: this.detailsText,
                    name: 'DetailsSection',
                    children: [{
                            name: 'Type',
                            property: 'Type',
                            label: this.typeText,
                            renderer: this.formatEventType.bindDelegate(this)
                        }, {
                            name: 'Description',
                            property: 'Description',
                            label: this.descriptionText
                        }]
                }, {
                    title: this.whenText,
                    name: 'WhenSection',
                    children: [{
                            name: 'StartDate',
                            property: 'StartDate',
                            label: this.startTimeText,
                            renderer: format.date.bindDelegate(this, this.startDateFormatText)
                        }, {
                            name: 'EndDate',
                            property: 'EndDate',
                            label: this.endTimeText,
                            renderer: format.date.bindDelegate(this, this.endDateFormatText)
                        }]
                }]);
        }
    });
    lang.setObject('Mobile.SalesLogix.Views.Event.Detail', __class);
    return __class;
});
