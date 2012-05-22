define('Mobile/SalesLogix/Views/Activity/Recurring', [
    'dojo/_base/declare',
    'dojo/string',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Validator',
    'Sage/Platform/Mobile/Utility',
    'Sage/Platform/Mobile/Edit',
    'Mobile/SalesLogix/Recurrence'
], function(
    declare,
    string,
    format,
    validator,
    utility,
    Edit,
    recur
) {
    return declare('Mobile.SalesLogix.Views.Activity.Recurring', [Edit], {
        //Localization
        startingText: 'start date',
        endingTex: 'end date',
        repeatsText: 'repeats',
        everyText: 'every',
        afterCompletionText: 'after completed',
        singleWeekdayText: 'weekday',
        weekdaysText: 'weekday(s)',
        monthText: 'month',
        onText: 'on',
        occurrencesText: 'occurrences',
        summaryText: 'summary',
        ordText: [
            'first',
            'second',
            'third',
            'fourth',
            'last'
        ],
        yesText: 'Yes',
        noText: 'No',
        titleText: 'Recurrence',

        //View Properties
        weekdayNames: Date.CultureInfo.dayNames,
        weekdayNamesAbbreviated: Date.CultureInfo.abbreviatedDayNames,
        monthNames: Date.CultureInfo.monthNames,

        id: 'recurrence_edit',

        init: function() {
            this.inherited(arguments);
            this.connect(this.fields['AfterCompletion'], 'onChange', this.onAfterCompletionChange);
            this.connect(this.fields['Interval'], 'onChange', this.onIntervalChange);
            this.connect(this.fields['RecurIterations'], 'onChange', this.onRecurIterationsChange);
            this.connect(this.fields['EndDate'], 'onChange', this.onEndDateChange);
            // these necessarily affect the StartDate:
            this.connect(this.fields['Weekdays'], 'onChange', this.onStartDateChange); // One or more days on Weekly options
            this.connect(this.fields['OrdWeekday'], 'onChange', this.onStartDateChange); // Single day of week
            this.connect(this.fields['OrdWeek'], 'onChange', this.onStartDateChange); // 1st..last week of month
            this.connect(this.fields['OrdMonth'], 'onChange', this.onStartDateChange); // Month of year
        },
        resetUI: function() {
            // hide or reveal and set fields according to panel/RecurPeriod
            var rp = this.fields['RecurPeriod'].getValue(),
                panel = parseInt(rp),
                startDate = this.fields['StartDate'].getValue(),
                weekdays = recur.getWeekdays(this.fields['RecurPeriodSpec'].getValue()),
                interval = this.fields['RecurPeriodSpec'].getValue() % 65536,
                showthese = 'Interval,AfterCompletion,';

            if (!recur.isAfterCompletion(rp))
                    showthese += 'RecurIterations,EndDate,';

            this.fields['RecurrenceState'].setValue('rstMaster'); // undone when Once panel selected

            // determine which fields to hide according to panel
            switch (panel) {
                case 0: // daily
                case 1:
                    break;
                case 2: // weekly
                case 3:
                    showthese += 'Weekdays,';
                    break;
                case 4: // monthly
                    break;
                case 5:
                case 6:
                    showthese += 'OrdWeek,OrdWeekday,';
                    break;
                case 7: // yearly
                    break;
                case 8:
                    showthese += 'OrdWeek,OrdWeekday,OrdMonth,';
                    break;
                case 9:
                    break;
                default: // once
                    showthese = '';
                    // this.fields['RecurrenceState'].setValue('rsNotRecurring'); // Not recurring
            }

            for(var i in this.fields) {
                if (0 <= showthese.indexOf(i)) {
                    this.fields[i].show();
                } else {
                    this.fields[i].hide();
                }
            }
            // always show these:
            if (0 <= panel) this.fields['Scale'].show();
            this.fields['Summary'].show();

            // refresh some field values
            this.fields['RecurPeriod'].setValue(rp);
            this.fields['RecurPeriodSpec'].setValue(recur.getRecurPeriodSpec(panel, startDate, weekdays, interval));

            this.summarize();
        },
        summarize: function() {
            this.fields['Summary'].setValue(recur.toString(this.getRecurrence()));
            this.fields['Scale'].setValue(recur.getPanel(parseInt(this.fields['RecurPeriod'].getValue()), true));
        },
        onAfterCompletionChange: function(value, field) {
            var rp = parseInt(this.fields['RecurPeriod'].getValue());

            if (value) {
                rp += (0 <= '0258'.indexOf(rp)) ? 1 : 2;
                this.fields['RecurIterations'].hide();
                this.fields['EndDate'].hide();

            } else {
                rp -= (0 <= '69'.indexOf(rp)) ? (this.fields['OrdWeekday'].isHidden() ? 2 : 1) : 1;
                this.fields['RecurIterations'].show();
                this.fields['EndDate'].show();
            }

            this.fields['RecurPeriod'].setValue(rp);
            this.summarize();
        },
        onIntervalChange: function(value, field) {
            var currentSpec = parseInt(this.fields['RecurPeriodSpec'].getValue()),
                interval = currentSpec % 65536;

            value = parseInt(value);
            if (value && 0 < value) {
                this.fields['RecurPeriodSpec'].setValue(currentSpec - interval + parseInt(value));
                this.fields['EndDate'].setValue(recur.calcEndDate(
                    this.fields['StartDate'].getValue(),
                    this.getRecurrence()
                ));
            } else {
                // Invalid input, reset to current Interval
                field.setValue(interval);
            }

            this.summarize();
        },
        onRecurIterationsChange: function(value, field) {
            value = parseInt(value);
            if (value && 0 < value) {
                var newEndDate = recur.calcEndDate(
                    this.fields['StartDate'].getValue(),
                    this.getRecurrence()
                );

                if (newEndDate != this.fields['EndDate'].getValue())
                    this.fields['EndDate'].setValue(newEndDate);

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

                if (iterations != parseInt(this.fields['RecurIterations'].getValue()))
                    this.fields['RecurIterations'].setValue(iterations);

            } else {
                // can't end before start! reset.
                this.onRecurIterationsChange(this.fields['RecurIterations'].getValue());
            }

            this.summarize();
        },
        onStartDateChange: function(value, field) {
            // when field alters StartDate, other fields need to be adjusted
            var startDate = this.fields['StartDate'].getValue(),
                weekday = startDate.getDay(),
                weekdays = recur.getWeekdays(parseInt(this.fields['RecurPeriodSpec'].getValue())),
                ordWeek = parseInt((startDate.getDate() - 1)/7),
                month = parseInt(startDate.getMonth());

            value = parseInt(value.key);
            switch(field.name) {
                case 'Weekdays':
                    // only change StartDate if original weekday not included
                    for(var wd = 0; wd < 7; wd++)
                        if (weekdays[wd] && !weekdays[weekday])
                            weekday = wd;

                    break;
                case 'OrdWeekday':
                    weekday = value;
                    break;
                case 'OrdWeek':
                    ordWeek = value;
                    break;
                case 'OrdMonth':
                    startDate.setMonth(value);
                    break;
                default:
            }

            this.fields['StartDate'].setValue(recur.calcDateOfNthWeekday(
                startDate, weekday, ordWeek + 1
            ));
            this.fields['EndDate'].setValue(recur.calcEndDate(
                this.fields['StartDate'].getValue(),
                this.getRecurrence()
            ));

            this.summarize();
        },

        formatWeekdays: function(selections) {
            var values = []
                weekdays = [0,0,0,0,0,0,0];

            for (var key in selections) {
                if (selections[key]) {
                    values.push(Date.CultureInfo.abbreviatedDayNames[key]);
                    weekdays[key] = 1;
                }
            }
            this.fields['RecurPeriodSpec'].setValue(recur.getRecurPeriodSpec(
                parseInt(this.fields['RecurPeriod'].getValue()),
                this.fields['StartDate'].getValue(),
                weekdays,
                parseInt(this.fields['Interval'].getValue())
            ));

            return values.join(', ');
        },
        formatSingleWeekday: function(selection) {
            if (selection['$descriptor'])
                return selection['$descriptor'];

            return this.weekdayNames[parseInt(selection)];
        },
        formatMonth: function(selection) {
            if (selection['$descriptor'])
                return selection['$descriptor'];

            return this.monthNames[parseInt(selection) - 1];
        },
        formatOrd: function(selection) {
            if (selection['$descriptor'])
                return selection['$descriptor'];

            return this.ordText[parseInt(selection)];
        },
        preselectWeekdays: function() {
            var previousSelections = [],
                weekdays = recur.getWeekdays(this.fields['RecurPeriodSpec'].getValue());

            for(var i = 0; i < weekdays.length; i++) {
                if (weekdays[i]) {
                    previousSelections.push(i);
                }
            }
            return previousSelections;
        },
        createWeekdaysData: function() {
            var list = [];
            for (var weekday in this.weekdayNames)
            {
                list.push({
                    '$key': weekday,
                    '$descriptor': this.weekdayNames[weekday]
                });
            }
            return {'$resources': list};
        },
        createMonthsData: function() {
            var list = [];
            for (var month in this.monthNames)
            {
                list.push({
                    '$key': month,
                    '$descriptor': this.monthNames[month]
                });
            }
            return {'$resources': list};
        },
        createOrdData: function() {
            var list = [];
            for (var ord in this.ordText)
            {
                list.push({
                    '$key': ord,
                    '$descriptor': this.ordText[ord]
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
            this.entry.EndDate = recur.calcEndDate(values.StartDate, values);
            this.entry.Recurring = (typeof values.Recurring === 'string') ? /^true$/i.test(values.Recurring) : values.Recurring;
            ord = recur.getOrd(this.entry);
            this.entry.Interval = values.RecurPeriodSpec % 65536;
            this.entry.AfterCompletion = recur.isAfterCompletion(values.RecurPeriod);
            this.entry.Weekdays = recur.getWeekdays(values.RecurPeriodSpec);
            this.entry.OrdWeek = ord.week;
            this.entry.OrdWeekday = ord.weekday;
            this.entry.OrdMonth = ord.month;

            // Even hidden and falsy fields need their values set (not from parent)
            for(var name in this.fields)
            {
                field = this.fields[name];
                // 0 (Daily panel) or false (AfterCompletion) are legitimate values!
                if (undefined !== this.entry[name]) field.setValue(this.entry[name]);
            }

            this.resetUI();
        },
        getValues: function(all) {
            var o = this.getRecurrence();

            o['Recurring'] = (0 <= o['RecurPeriod']);
            o['EndDate'] = recur.calcEndDate( o.StartDate, o);

            return o;
        },
        getRecurrence: function() {
            return {
                'StartDate': this.fields['StartDate'].getValue(),
                'RecurPeriod': parseInt(this.fields['RecurPeriod'].getValue()),
                'RecurPeriodSpec': parseInt(this.fields['RecurPeriodSpec'].getValue()),
                'RecurIterations': parseInt(this.fields['RecurIterations'].getValue()),
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
                type: 'text',
                readonly: true
            },{
                label: this.startingText,
                name: 'StartDate',
                property: 'StartDate',
                type: 'date',
                dateFormatText: this.startingFormatText
            },{
                label: this.everyText,
                name: 'Interval',
                property: 'Interval',
                type: 'text',
                inputType: 'numeric',
                exclude: true,
                notificationTrigger: 'blur'
            },{
                label: '',
                name: 'Scale',
                property: 'Scale',
                type: 'text',
                exclude: true,
                readonly: true
            },{
                label: this.afterCompletionText,
                name: 'AfterCompletion',
                property: 'AfterCompletion',
                type: 'boolean',
                exclude: true,
                onText: this.yesText,
                offText: this.noText
            },{
                label: this.onText,
                title: this.onText,
                name: 'OrdWeek',
                property: 'OrdWeek',
                exclude: true,
                type: 'select',
                view: 'select_list',
                data: this.createOrdData(),
                textRenderer: this.formatOrd.bindDelegate(this)
            },{
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
            },{
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
            },{
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
            },{
                name: 'RecurIterations',
                property: 'RecurIterations',
                label: this.occurrencesText,
                type: 'text',
                inputType: 'numeric',
                include: true,
                notificationTrigger: 'blur'
            },{
                type: 'hidden',
                name: 'RecurPeriod',
                property: 'RecurPeriod',
                include: true
            },{
                type: 'hidden',
                name: 'RecurPeriodSpec',
                property: 'RecurPeriodSpec',
                include: true
            },{
                type: 'hidden',
                name: 'RecurrenceState',
                property: 'RecurrenceState',
                include: true
            },{
                type: 'hidden',
                name: 'Recurring',
                property: 'Recurring',
                include: true,
                formatValue: format.bool
            },{
                label: this.endingTex,
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