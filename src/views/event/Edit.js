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

        eventTypes: {
            "Vacation": "Vacation",
            "Business Trip": "Business Trip",
            "Conference": "Conference",
            "Holiday": "Holiday"
        },

        formatTypeText: function(val, key, text) {
            return this.eventTypes[key] || text;
        },
        createTypeData: function() {
            var list = [];

            for (var type in this.eventTypes)
            {
                list.push({
                    '$key': type,
                    '$descriptor': this.eventTypes[type]
                });
            }

            return {'$resources': list};
        },
        applyUserActivityContext: function(context) {
            var view = App.getView(context.id);
            if (view && view.currentDate)
            {
                var currentDate = view.currentDate.clone().clearTime(),
                    userOptions = App.context['userOptions'],
                    startTimeOption = userOptions && userOptions['Calendar:DayStartTime'],
                    startTime = startTimeOption && Date.parse(startTimeOption),
                    startDate,
                    endDate;

                if (startTime && (currentDate.compareTo(Date.today()) !== 0))
                {
                    startDate = currentDate.clone().set({
                        'hour': startTime.getHours(),
                        'minute': startTime.getMinutes()
                    });
                    endDate = startDate.clone().add({minute:15});
                }
                else
                {
                    startTime = Date.now(),
                    startDate = Date.now().clearTime().set({
                        'hour': startTime.getHours()
                    }).add({
                        'minute': (Math.floor(startTime.getMinutes() / 15) * 15) + 15
                    });
                    endDate = startDate.clone().add({minute:15});
                }

                this.fields['StartDate'].setValue(startDate);
                this.fields['EndDate'].setValue(endDate);
            }
        },
        applyContext: function() {
            Mobile.SalesLogix.Event.Edit.superclass.applyContext.apply(this, arguments);
            var found = App.queryNavigationContext(function(o) {
                var context = (o.options && o.options.source) || o;

                return (/^(useractivities)$/.test(context.resourceKind));
            });

            var context = (found && found.options && found.options.source) || found,
                lookup = {
                    'useractivities': this.applyUserActivityContext
                };

            if (context && lookup[context.resourceKind]) lookup[context.resourceKind].call(this, context);
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    label: this.typeText,
                    name: 'Type',
                    type: 'select',
                    view: 'select_list',
                    requireSelection: false,
                    maxTextLength: 64,
                    validator: [
                        Mobile.SalesLogix.Validator.exceedsMaxTextLength,
                        Mobile.SalesLogix.Validator.hasText
                    ],
                    textRenderer: this.formatTypeText.createDelegate(this),
                    data: this.createTypeData()
                },
                {
                    label: this.descriptionText,
                    name: 'Description',
                    type: 'text',
                    maxTextLength: 64,
                    validator: [
                        Mobile.SalesLogix.Validator.exceedsMaxTextLength,
                        Mobile.SalesLogix.Validator.hasText
                    ]
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