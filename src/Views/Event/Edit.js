define('Mobile/SalesLogix/Views/Event/Edit', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Validator',
    'Sage/Platform/Mobile/Edit'
], function(
    declare,
    format,
    validator,
    Edit
) {

    return declare('Mobile.SalesLogix.Views.Event.Edit', [Edit], {
        //Localization
        titleText: 'Event',
        typeText: 'type',
        descriptionText: 'description',
        startDateText: 'start date',
        endDateText: 'end date',

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

        eventTypes: {
            "Vacation": "Vacation",
            "Business Trip": "Business Trip",
            "Conference": "Conference",
            "Holiday": "Holiday"
        },
        startup: function() {
            this.inherited(arguments);

            this.connect(this.fields['StartDate'], 'onChange', this.onStartDateChange);
        },
        onStartDateChange: function(val) {
            var endDate = this.fields['EndDate'].getValue();

            if (endDate < val)
                this.fields['EndDate'].setValue(val);
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
                    startDate = currentDate.clone().clearTime();

                if (startTime && (currentDate.compareTo(Date.today()) !== 0))
                {
                    startDate.set({
                        'hour': startTime.getHours(),
                        'minute': startTime.getMinutes()
                    });
                }
                else
                {
                    startTime = Date.now();
                    startDate.set({'hour': startTime.getHours()})
                        .add({
                            'minute': (Math.floor(startTime.getMinutes() / 15) * 15) + 15
                        });
                }

                var endDate = startDate.clone().add({minute:15});

                this.fields['StartDate'].setValue(startDate);
                this.fields['EndDate'].setValue(endDate);
            }
        },
        applyContext: function() {
            this.inherited(arguments);

            var found = App.queryNavigationContext(function(o) {
                var context = (o.options && o.options.source) || o;

                return (/^(useractivities||activities||events)$/.test(context.resourceKind));
            });

            var context = (found && found.options && found.options.source) || found,
                lookup = {
                    'useractivities': this.applyUserActivityContext,
                    'activities': this.applyUserActivityContext
                };

            if (context && lookup[context.resourceKind]) lookup[context.resourceKind].call(this, context);
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
                    validator.hasText
                ],
                textRenderer: this.formatTypeText.bindDelegate(this),
                data: this.createTypeData()
            },
            {
                label: this.descriptionText,
                name: 'Description',
                property: 'Description',
                type: 'text',
                maxTextLength: 64,
                validator: [
                    validator.exceedsMaxTextLength,
                    validator.hasText
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
});