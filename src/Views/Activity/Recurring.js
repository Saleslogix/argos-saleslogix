/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Activity/Recurring', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/string',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Validator',
    'Sage/Platform/Mobile/Utility',
    'Sage/Platform/Mobile/Edit',
    'Mobile/SalesLogix/Recurrence',
    'moment'
], function(
    declare,
    array,
    string,
    format,
    validator,
    utility,
    Edit,
    recur,
    moment
) {
    return declare('Mobile.SalesLogix.Views.Activity.Recurring', [Edit], {
        //Localization
        startingText: 'start date',
        endingText: 'end date',
        repeatsText: 'repeats',
        everyText: 'every',
        afterCompletionText: 'after completed',
        singleWeekdayText: 'weekday',
        weekdaysText: 'weekday(s)',
        dayText: 'day',
        monthText: 'month',
        onText: 'on',
        occurrencesText: 'occurrences',
        summaryText: 'summary',
        frequencyOptionsText: [
            'days',
            'weeks',
            'months',
            'years'
        ],
        recurringFrequencyText: 'Recurring Frequency',
        yesText: 'Yes',
        noText: 'No',
        titleText: 'Recurrence',

        //View Properties
        monthNames: moment.monthsShort,

        id: 'recurrence_edit',

        init: function() {
            this.inherited(arguments);
            this.connect(this.fields['AfterCompletion'], 'onChange', this.onAfterCompletionChange);
            this.connect(this.fields['Interval'], 'onChange', this.onIntervalChange);
            this.connect(this.fields['RecurIterations'], 'onChange', this.onRecurIterationsChange);
            this.connect(this.fields['EndDate'], 'onChange', this.onEndDateChange);
            // these affect the StartDate:
            this.connect(this.fields['Scale'], 'onChange', this.onScaleChange);
            this.connect(this.fields['Day'], 'onChange', this.onDayChange); // Day of the month
            this.connect(this.fields['Weekdays'], 'onChange', this.onStartDateChange); // One or more days on Weekly options
            this.connect(this.fields['OrdWeekday'], 'onChange', this.onStartDateChange); // Single day of week
            this.connect(this.fields['OrdWeek'], 'onChange', this.onStartDateChange); // 1st..last week of month, or on Day #
            this.connect(this.fields['OrdMonth'], 'onChange', this.onStartDateChange); // Month of year
        },
        resetUI: function() {
            // hide or reveal and set fields according to panel/RecurPeriod
            var rp = parseInt(this.fields['RecurPeriod'].getValue(), 10),
                startDate = this.fields['StartDate'].getValue(),
                interval = this.fields['RecurPeriodSpec'].getValue() % 65536,
                showthese = 'Interval,AfterCompletion,';

            if (!recur.isAfterCompletion(rp)) {
                showthese += 'RecurIterations,EndDate,';
            }

            this.fields['RecurrenceState'].setValue('rstMaster'); // undone when Once panel selected

            // determine which fields to hide according to panel
            switch (rp) {
                case 0:
                // daily
                case 1:
                    break;
                case 2:
                    // weekly
                    showthese += 'Weekdays,';
                    this.formatWeekdays(this.entry.Weekdays);
                    break;
                case 3:
                    break;
                case 4:
                    // monthly
                    showthese += 'Day,OrdWeek';
                    break;
                case 5:
                    showthese += 'OrdWeek,OrdWeekday,';
                    break;
                case 6:
                    break;
                case 7:
                    // yearly
                    showthese += 'Day,OrdWeek,OrdMonth';
                    break;
                case 8:
                    showthese += 'OrdWeek,OrdWeekday,OrdMonth,';
                    break;
                case 9:
                    break;
                default:
                    // once
                    showthese = '';
            }

            for (var i in this.fields) {
                if (0 <= showthese.indexOf(i)) {
                    this.fields[i].show();
                } else {
                    this.fields[i].hide();
                }
            }
            // always show these:
            if (0 <= rp) {
                this.fields['Scale'].show();
            }
            this.fields['Summary'].show();

            // refresh some field values
            this.fields['RecurPeriod'].setValue(rp);
            this.fields['RecurPeriodSpec'].setValue(recur.getRecurPeriodSpec(rp, startDate, this.entry.Weekdays, interval));

            this.summarize();
        },
        summarize: function() {
            this.fields['Summary'].setValue(recur.toString(this.getRecurrence()));
            this.fields['Scale'].setValue(recur.getPanel(parseInt(this.fields['RecurPeriod'].getValue(), 10), true));
        },
        onAfterCompletionChange: function(value, field) {
            var rp = parseInt(this.fields['RecurPeriod'].getValue(), 10);

            if (value) {
                rp += (0 <= '0258'.indexOf(rp)) ? 1 : 2;
                this.fields['RecurIterations'].setValue(-1);

            } else {
                rp -= (0 <= '69'.indexOf(rp)) ? (parseInt(this.fields['OrdWeek'].getValue(), 10) ? 1 : 2) : 1;
                this.fields['RecurIterations'].setValue(0 < this.entry.RecurIterations ? this.entry.RecurIterations : recur.defaultIterations[rp]);
            }

            this.fields['RecurPeriod'].setValue(rp);
            this.resetUI();
        },
        onIntervalChange: function(value, field) {
            var currentSpec = parseInt(this.fields['RecurPeriodSpec'].getValue(), 10),
                interval = currentSpec % 65536;

            value = parseInt(value, 10);
            if (value && 0 < value) {
                this.fields['RecurPeriodSpec'].setValue(currentSpec - interval + parseInt(value, 10));
                this.fields['EndDate'].setValue(recur.calcEndDate(this.fields['StartDate'].getValue(), this.getRecurrence()).toDate());
            } else {
                // Invalid input, reset to current Interval
                field.setValue(interval);
            }

            this.summarize();
        },
        onRecurIterationsChange: function(value, field) {
            value = parseInt(value, 10);
            if (value && 0 < value) {
                this.entry.RecurIterations = value;
                var newEndDate = recur.calcEndDate(this.fields['StartDate'].getValue(), this.getRecurrence()).toDate();

                if (newEndDate != this.fields['EndDate'].getValue()) {
                    this.fields['EndDate'].setValue(newEndDate);
                }

            } else {
                // Invalid input, reset to value calculated from EndDate
                this.onEndDateChange(this.fields['EndDate'].getValue());
            }

            this.summarize();
        },
        onEndDateChange: function(value, field) {
            if (value > this.fields['StartDate'].getValue()) {
                var iterations = recur.calcRecurIterations(
                    value,
                    this.fields['StartDate'].getValue(),
                    this.fields['Interval'].getValue(),
                    this.fields['RecurPeriod'].getValue()
                );

                if (iterations !== parseInt(this.fields['RecurIterations'].getValue(), 10)) {
                    this.fields['RecurIterations'].setValue(iterations);
                }

            } else {
                // can't end before start! reset.
                this.onRecurIterationsChange(this.fields['RecurIterations'].getValue());
            }

            this.summarize();
        },
        onDayChange: function(value, field) {
            var startDate = this.fields['StartDate'].getValue(),
                maxValue = startDate.getDaysInMonth(); // <-- from lib date.js

            if (0 < value && value <= maxValue) {
                startDate.setDate(value);

            } else { // reset field to acceptable value
                if (0 < value) {
                    startDate.setDate(maxValue);
                }
                field.setValue(startDate.getDate());
            }

            this.fields['StartDate'].setValue(startDate);
            // weekday(s)/ordWeek/EndDate may need adjusting
            this.onStartDateChange(value, field);
        },
        onStartDateChange: function(value, field) {
            // when field alters StartDate, other fields need to be adjusted
            var startDate = this.fields['StartDate'].getValue(),
                weekday = startDate.getDay(),
                weekdays = recur.getWeekdays(parseInt(this.fields['RecurPeriodSpec'].getValue(), 10)),
                ordWeek = parseInt((startDate.getDate() - 1) / 7, 10) + 1,
                panel = parseInt(this.fields['RecurPeriod'].getValue(), 10);

            value = parseInt(value.key || value, 10);
            switch (field.name) {
                case 'Weekdays':
                    // only change StartDate if original weekday not included
                    for (var wd = 0; wd < 7; wd++) {
                        if (weekdays[wd] && !weekdays[weekday]) {
                            weekday = wd;
                        }
                    }

                    break;
                case 'OrdWeekday':
                    weekday = value;
                    break;
                case 'OrdWeek':
                    if (value) {
                        ordWeek = value;
                        if (panel == 4 || panel == 7) {
                            this.fields['RecurPeriod'].setValue(panel + 1);
                            this.resetUI();
                        }
                    } else if (panel == 5 || panel == 8) {
                        this.fields['RecurPeriod'].setValue(panel - 1);
                        this.resetUI();
                    }
                    break;
                case 'OrdMonth':
                    startDate.setMonth(value);
                    weekday = startDate.getDay();
                    ordWeek = parseInt((startDate.getDate() - 1) / 7, 10) + 1;
                    break;
                default:
            }

            startDate = recur.calcDateOfNthWeekday(startDate, weekday, ordWeek).toDate();
            this.fields['StartDate'].setValue(startDate);
            this.fields['EndDate'].setValue(recur.calcEndDate(startDate, this.getRecurrence()).toDate());
            this.fields['Day'].setValue(startDate.getDate());
            this.fields['OrdWeekday'].setValue(startDate.getDay());

            this.summarize();
        },
        onScaleChange: function(value, field) {
            var startDate = this.fields['StartDate'].getValue(),
                afterCompletion = this.fields['AfterCompletion'].getValue() ? 1 : 0,
                interval = parseInt(this.fields['Interval'].getValue(), 10),
                recurPeriod = parseInt(this.fields['RecurPeriod'].getValue(), 10);

            switch (parseInt(value.key, 10)) {
                case 0:
                    // days
                    if (2 > recurPeriod) {
                        return;
                    }
                    recurPeriod = 0 + afterCompletion;
                    break;
                case 1:
                    // weeks
                    if (1 < recurPeriod && recurPeriod < 4) {
                        return;
                    }
                    recurPeriod = 2 + afterCompletion;
                    break;
                case 2:
                    // months
                    if (3 < recurPeriod && recurPeriod < 7) {
                        return;
                    }
                    recurPeriod = 4 + afterCompletion + afterCompletion;
                    break;
                case 3:
                    // years
                    if (6 < recurPeriod) {
                        return;
                    }
                    recurPeriod = 7 + afterCompletion + afterCompletion;
                    break;
                default:
            }
            this.fields['RecurPeriod'].setValue(recurPeriod);
            this.fields['RecurIterations'].setValue(recur.defaultIterations[recurPeriod]);
            this.fields['RecurPeriodSpec'].setValue(recur.getRecurPeriodSpec(recurPeriod, startDate, [], interval));
            this.fields['Weekdays'].setValue(recur.getWeekdays(this.fields['RecurPeriodSpec'].getValue()));
            this.fields['Day'].setValue(startDate.getDate());
            this.fields['OrdMonth'].setValue(startDate.getMonth() + 1);
            this.fields['OrdWeek'].setValue(0);
            this.fields['EndDate'].setValue(recur.calcEndDate(startDate, this.getRecurrence()).toDate());

            this.resetUI();
        },

        formatWeekdays: function(selections) {
            var values = [],
                weekdays = [0, 0, 0, 0, 0, 0, 0];

            for (var key in selections) {
                if (selections[key]) {
                    values.push(moment().lang()._weekdaysShort[key]);
                    weekdays[key] = 1;
                }
            }
            this.fields['RecurPeriodSpec'].setValue(recur.getRecurPeriodSpec(
                parseInt(this.fields['RecurPeriod'].getValue(), 10),
                this.fields['StartDate'].getValue(),
                weekdays,
                parseInt(this.fields['Interval'].getValue(), 10)
            ));

            this.entry.Weekdays = weekdays;
            return values.join(', ');
        },
        formatSingleWeekday: function(selection) {
            if (selection['$descriptor']) {
                return selection['$descriptor'];
            }

            return moment().lang()._weekdays[parseInt(selection, 10)];
        },
        formatMonth: function(selection) {
            if (selection['$descriptor']) {
                return selection['$descriptor'];
            }

            return moment().lang()._months[parseInt(selection, 10) - 1];
        },
        formatOrd: function(selection) {
            if (selection['$descriptor']) {
                return selection['$descriptor'];
            }

            return recur.ordText[parseInt(selection, 10)];
        },
        preselectWeekdays: function() {
            var previousSelections = [],
                weekdays = recur.getWeekdays(this.fields['RecurPeriodSpec'].getValue());

            for (var i = 0; i < weekdays.length; i++) {
                if (weekdays[i]) {
                    previousSelections.push(i);
                }
            }
            return previousSelections;
        },
        createScaleData: function() {
            var list = [];
            for (var opt in this.frequencyOptionsText) {
                list.push({
                    '$key': opt,
                    '$descriptor': this.frequencyOptionsText[opt]
                });
            }
            return {'$resources': list};
        },
        createWeekdaysData: function() {
            var list = [];
            array.forEach(moment().lang()._weekdays, function(name, idx) {
                list.push({
                    '$key': idx,
                    '$descriptor': name
                });
            });
            return {'$resources': list};
        },
        createMonthsData: function() {
            var list = [];
            array.forEach(moment.months, function(name, idx) {
                list.push({
                    '$key': idx,
                    '$descriptor': name 
                });
            });
            return {'$resources': list};
        },
        createOrdData: function() {
            var list = [];
            for (var ord in recur.ordText) {
                list.push({
                    '$key': ord,
                    '$descriptor': recur.ordText[ord]
                });
            }
            return {'$resources': list};
        },
        setValues: function(values, initial) {
            this.inherited(arguments);
            var field, ord;

            // calculate some values from the ones provided
            this.entry = values;
            this.entry.StartDate = Sage.Platform.Mobile.Convert.toDateFromString(values['StartDate']);
            this.entry.EndDate = recur.calcEndDate(values.StartDate, values).toDate();
            this.entry.Recurring = (typeof values.Recurring === 'string') ? /^true$/i.test(values.Recurring) : values.Recurring;
            ord = recur.getOrd(this.entry);
            this.entry.Interval = values.RecurPeriodSpec % 65536;
            this.entry.AfterCompletion = recur.isAfterCompletion(values.RecurPeriod);
            this.entry.Day = this.entry.StartDate.getDate();
            this.entry.Weekdays = recur.getWeekdays(values.RecurPeriodSpec);
            this.entry.OrdWeek = ord.week;
            this.entry.OrdWeekday = ord.weekday;
            this.entry.OrdMonth = ord.month;

            // Even hidden and falsy fields need their values set (not from parent)
            for (var name in this.fields) {
                field = this.fields[name];
                // 0 (Daily panel) or false (AfterCompletion) are legitimate values!
                if (undefined !== this.entry[name]) {
                    field.setValue(this.entry[name]);
                }
            }

            this.resetUI();
        },
        getValues: function(all) {
            var o = this.getRecurrence();

            o['Recurring'] = (0 <= o['RecurPeriod']);
            o['EndDate'] = recur.calcEndDate(o.StartDate, o).toDate();

            return o;
        },
        getRecurrence: function() {
            return {
                'StartDate': this.fields['StartDate'].getValue(),
                'RecurPeriod': parseInt(this.fields['RecurPeriod'].getValue(), 10),
                'RecurPeriodSpec': parseInt(this.fields['RecurPeriodSpec'].getValue(), 10),
                'RecurIterations': parseInt(this.fields['RecurIterations'].getValue(), 10),
                'RecurrenceState': this.fields['RecurrenceState'].getValue()
            };
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    label: this.summaryText,
                    name: 'Summary',
                    property: 'Summary',
                    exclude: true,
                    type: 'textarea',
                    readonly: true
                }, {
                    label: this.startingText,
                    name: 'StartDate',
                    property: 'StartDate',
                    type: 'date',
                    dateFormatText: this.startingFormatText
                }, {
                    label: this.everyText,
                    name: 'Interval',
                    property: 'Interval',
                    type: 'text',
                    inputType: 'numeric',
                    exclude: true,
                    notificationTrigger: 'blur'
                }, {
                    label: '',
                    title: this.recurringFrequencyText,
                    name: 'Scale',
                    property: 'Scale',
                    type: 'select',
                    view: 'select_list',
                    exclude: true,
                    data: this.createScaleData()
                }, {
                    label: this.afterCompletionText,
                    name: 'AfterCompletion',
                    property: 'AfterCompletion',
                    type: 'boolean',
                    exclude: true,
                    onText: this.yesText,
                    offText: this.noText
                }, {
                    label: this.onText,
                    title: this.onText,
                    name: 'OrdWeek',
                    property: 'OrdWeek',
                    exclude: true,
                    type: 'select',
                    view: 'select_list',
                    data: this.createOrdData(),
                    textRenderer: this.formatOrd.bindDelegate(this)
                }, {
                    label: this.dayText,
                    title: this.dayText,
                    name: 'Day',
                    property: 'Day',
                    type: 'text',
                    inputType: 'numeric',
                    exclude: true,
                    notificationTrigger: 'blur'
                }, {
                    label: this.weekdaysText,
                    title: this.weekdaysText,
                    name: 'Weekdays',
                    property: 'Weekdays',
                    exclude: true,
                    type: 'select',
                    singleSelect: false,
                    view: 'select_list',
                    data: this.createWeekdaysData(),
                    previousSelections: this.preselectWeekdays.bindDelegate(this),
                    textRenderer: this.formatWeekdays.bindDelegate(this),
                    formatValue: this.formatWeekdays.bindDelegate(this)
                }, {
                    label: this.singleWeekdayText,
                    title: this.singleWeekdayText,
                    name: 'OrdWeekday',
                    property: 'OrdWeekday',
                    exclude: true,
                    type: 'select',
                    singleSelect: true,
                    view: 'select_list',
                    data: this.createWeekdaysData(),
                    textRenderer: this.formatSingleWeekday.bindDelegate(this)
                }, {
                    label: this.monthText,
                    title: this.monthText,
                    name: 'OrdMonth',
                    property: 'OrdMonth',
                    exclude: true,
                    type: 'select',
                    singleSelect: true,
                    view: 'select_list',
                    data: this.createMonthsData(),
                    textRenderer: this.formatMonth.bindDelegate(this)
                }, {
                    name: 'RecurIterations',
                    property: 'RecurIterations',
                    label: this.occurrencesText,
                    type: 'text',
                    inputType: 'numeric',
                    include: true,
                    notificationTrigger: 'blur'
                }, {
                    type: 'hidden',
                    name: 'RecurPeriod',
                    property: 'RecurPeriod',
                    include: true
                }, {
                    type: 'hidden',
                    name: 'RecurPeriodSpec',
                    property: 'RecurPeriodSpec',
                    include: true
                }, {
                    type: 'hidden',
                    name: 'RecurrenceState',
                    property: 'RecurrenceState',
                    include: true
                }, {
                    type: 'hidden',
                    name: 'Recurring',
                    property: 'Recurring',
                    include: true,
                    formatValue: format.bool
                }, {
                    label: this.endingText,
                    name: 'EndDate',
                    property: 'EndDate',
                    type: 'date',
                    timeless: false,
                    showTimePicker: false,
                    dateFormatText: this.startingFormatText,
                    minValue: (new Date(1900, 0, 1)),
                    validator: [
                        validator.exists,
                        validator.isDateInRange
                    ]
                }]);
        }
    });
});

