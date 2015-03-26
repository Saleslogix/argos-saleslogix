/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class crm.Views.Event.Edit
 *
 * @extends argos.Edit
 *
 * @requires crm.Format
 * @requires crm.Validator
 */
define('crm/Views/Event/Edit', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    '../../Format',
    '../../Validator',
    'argos/Edit',
    'moment'
], function(
    declare,
    lang,
    format,
    validator,
    Edit,
    moment
) {

    var __class = declare('crm.Views.Event.Edit', [Edit], {
        //Localization
        titleText: 'Event',
        typeText: 'type',
        descriptionText: 'description',
        startDateText: 'start date',
        endDateText: 'end date',
        startingFormatText: 'M/D/YYYY h:mm A',

        //View Properties
        entityName: 'Event',
        id: 'event_edit',
        insertSecurity: null, //'Entities/Event/Add',
        updateSecurity: null, //'Entities/Event/Edit',
        querySelect: [
            'Description',
            'EndDate',
            'StartDate',
            'UserId',
            'Type'
        ],
        resourceKind: 'events',

        eventTypesText: {
            'Vacation': 'Vacation',
            'Business Trip': 'Business Trip',
            'Conference': 'Conference',
            'Holiday': 'Holiday'
        },
        startup: function() {
            this.inherited(arguments);

            this.connect(this.fields['StartDate'], 'onChange', this.onStartDateChange);
        },
        onStartDateChange: function(val) {
            var endDate = this.fields['EndDate'].getValue();

            if (endDate < val) {
                this.fields['EndDate'].setValue(val);
            }
        },
        formatTypeText: function(val, key, text) {
            return this.eventTypesText[key] || text;
        },
        createTypeData: function() {
            var list = [], type;

            for (type in this.eventTypesText) {
                if (this.eventTypesText.hasOwnProperty(type)) {
                    list.push({
                        '$key': type,
                        '$descriptor': this.eventTypesText[type]
                    });
                }
            }

            return {'$resources': list};
        },
        applyUserActivityContext: function(context) {
            var view,
                currentDate,
                userOptions,
                startTimeOption,
                startTime,
                startDate,
                endDate;

            view = App.getView(context.id);
            if (view && view.currentDate) {
                currentDate = moment(view.currentDate).clone().startOf('day');
                userOptions = App.context['userOptions'];
                startTimeOption = userOptions && userOptions['Calendar:DayStartTime'];
                startTime = startTimeOption && moment(startTimeOption, 'h:mma');
                startDate = currentDate.clone();

                if (startTime && (!moment(currentDate).isSame(moment()))) {
                    startDate.hours(startTime.hours());
                    startDate.minutes(startTime.minutes());
                } else {
                    startTime = moment();
                    startDate.hours(startTime.hours());
                    startDate.add({
                            'minutes': (Math.floor(startTime.minutes() / 15) * 15) + 15
                        });
                }

                endDate = startDate.clone().add({minutes:15});

                this.fields['StartDate'].setValue(startDate.toDate());
                this.fields['EndDate'].setValue(endDate.toDate());
            }
        },
        applyContext: function() {
            this.inherited(arguments);

            var found,
                context,
                lookup;

            found = App.queryNavigationContext(function(o) {
                var context = (o.options && o.options.source) || o;

                return (/^(useractivities||activities||events)$/.test(context.resourceKind));
            });

            context = (found && found.options && found.options.source) || found;
            lookup = {
                    'useractivities': this.applyUserActivityContext,
                    'activities': this.applyUserActivityContext
            };

            if (context && lookup[context.resourceKind]) {
                lookup[context.resourceKind].call(this, context);
            }
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                    label: this.typeText,
                    name: 'Type',
                    property: 'Type',
                    type: 'select',
                    view: 'select_list',
                    requireSelection: false,
                    maxTextLength: 64,
                    validator: [
                        validator.exceedsMaxTextLength,
                        validator.notEmpty
                    ],
                    textRenderer: this.formatTypeText.bindDelegate(this),
                    data: this.createTypeData(),
                    autoFocus: true
                },
                {
                    label: this.descriptionText,
                    name: 'Description',
                    property: 'Description',
                    type: 'text',
                    maxTextLength: 64,
                    validator: [
                        validator.exceedsMaxTextLength,
                        validator.notEmpty
                    ]
                },
                {
                    label: this.startDateText,
                    name: 'StartDate',
                    property: 'StartDate',
                    renderer: format.date,
                    type: 'date',
                    showTimePicker: true,
                    formatString: this.startingFormatText,
                    minValue: (new Date(1900, 0, 1)),
                    validator: [
                        validator.exists,
                        validator.isDateInRange
                    ]
                },
                {
                    label: this.endDateText,
                    name: 'EndDate',
                    property: 'EndDate',
                    renderer: format.date,
                    type: 'date',
                    showTimePicker: true,
                    formatString: this.startingFormatText,
                    minValue: (new Date(1900, 0, 1)),
                    validator: [
                        validator.exists,
                        validator.isDateInRange
                    ]
                }]);
        }
    });

    lang.setObject('Mobile.SalesLogix.Views.Event.Edit', __class);
    return __class;
});

