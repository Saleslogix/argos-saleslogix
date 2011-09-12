/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Event");


(function() {
    Mobile.SalesLogix.Event.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        //Localization
        titleText: 'Event',
        typeText: 'type',
        descriptionText: 'description',
        startDateText: 'start date',
        endDateText: 'end date',

        //View Properties
        entityName: 'Event',
        id: 'event_edit',
        querySelect: [
            'Description',
            'EndDate',
            'StartDate',
            'UserId',
            'Type'
        ],
        resourceKind: 'events',

        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    label: this.typeText,
                    name: 'Type',
                    type: 'text'
                },
                {
                    label: this.descriptionText,
                    name: 'Description',
                    type: 'text'
                },
                {
                    label: this.startDateText,
                    name: 'StartDate',
                    renderer: Mobile.SalesLogix.Format.date,
                    type: 'date',
                    showTimePicker: true,
                    formatString: this.startingFormatText,
                    minValue: (new Date(1900, 0, 1)),
                    validator: [
                        Mobile.SalesLogix.Validator.exists,
                        Mobile.SalesLogix.Validator.isDateInRange
                    ]
                },
                {
                    label: this.endDateText,
                    name: 'EndDate',
                    renderer: Mobile.SalesLogix.Format.date,
                    type: 'date',
                    showTimePicker: true,
                    formatString: this.startingFormatText,
                    minValue: (new Date(1900, 0, 1)),
                    validator: [
                        Mobile.SalesLogix.Validator.exists,
                        Mobile.SalesLogix.Validator.isDateInRange
                    ]
                }
            ]);
        }
    });
})();