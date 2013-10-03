/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Recurrence', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    'dijit/_Widget',
    'Sage/Platform/Mobile/_ActionMixin',
    'Sage/Platform/Mobile/_CustomizationMixin',
    'Sage/Platform/Mobile/_Templated',
    'moment'
], function(
    declare,
    lang,
    string,
    _Widget,
    _ActionMixin,
    _CustomizationMixin,
    _Templated,
    moment
) {
    return lang.setObject('Mobile.SalesLogix.Recurrence', {
        // Localization
        neverText: 'Never',
        daysText: 'days',
        dailyText: 'Daily',
        weeksText: 'weeks',
        weeklyText: 'Weekly',
        weeklyOnText: 'Weekly on ${3}', // eg. {weekly} on {friday}
        monthsText: 'months',
        monthlyText: 'Monthly',
        monthlyOnDayText: 'Monthly on day ${1}', // eg. {monthly} on day {15}
        monthlyOnText: 'Monthly on ${5} ${3}', // eg. {monthly} on {second} {Monday}
        yearsText: 'years',
        yearlyText: 'Yearly',
        yearlyOnText: 'Yearly on ${2}', // eg. {yearly} on {short_date}
        yearlyOnWeekdayText: 'Yearly on ${5} ${3} in ${4}', // eg. {yearly} on {first} {Thursday} in {April}
        everyText: 'every ${0} ${1}', // eg. every {2} {weeks}
        afterCompletionText: 'after completion',
        untilEndDateText: '${0} until ${1}', // eg. {daily} until {31/10/2012}
        ordText: [
            'day',
            'first',
            'second',
            'third',
            'fourth',
            'last'
        ],

        interval: 1, // repeat every interval days/weeks/months/years
        defaultIterations: [// by RecurPeriod, -1 for After Completed. Configurable.
            7, // days
            -1,
            8, // weeks
            -1,
            12, // months
            12,
            -1,
            5, // years
            5,
            -1
        ],
        _weekDayValues: [
            131072, // sun
            262144, // mon
            524288, // tue
            1048576, // wed
            2097152, // thu
            4194304, // fri
            8388608  // sat
        ],
        simplifiedOptions: [
            {
                label: 'neverText',
                Recurring: false,
                RecurPeriod: -1, // not recurring
                basePeriodSpec: 0,
                RecurPeriodSpec: 0,
                RecurIterations: 0,
                RecurrenceState: 'rsNotRecurring'
            },
            {
                label: 'dailyText',
                Recurring: true,
                RecurPeriod: 0,
                basePeriodSpec: 0,
                RecurPeriodSpec: 0,
                RecurIterations: 7, // override from this.defaultIterations
                RecurrenceState: 'rstMaster'
            },
            {
                label: 'weeklyOnText',
                Recurring: true,
                RecurPeriod: 2,
                basePeriodSpec: 0,
                weekdays: [0, 0, 0, 0, 0, 0, 0], // none selected by default
                RecurPeriodSpec: 0,
                RecurIterations: 8,
                RecurrenceState: 'rstMaster',
                calc: true
            },
            {
                label: 'monthlyOnDayText',
                Recurring: true,
                RecurPeriod: 4,
                basePeriodSpec: 1048576,
                RecurPeriodSpec: 0,
                RecurIterations: 12,
                RecurrenceState: 'rstMaster'
            },
            {
                label: 'monthlyOnText',
                Recurring: true,
                RecurPeriod: 5,
                basePeriodSpec: 0,
                RecurPeriodSpec: 0,
                RecurIterations: 12,
                RecurrenceState: 'rstMaster',
                calc: true
            },
            {
                label: 'yearlyOnText',
                Recurring: true,
                RecurPeriod: 7,
                basePeriodSpec: 38797312,
                RecurPeriodSpec: 0,
                RecurIterations: 5,
                RecurrenceState: 'rstMaster'
            },
            {
                // Need one more for Yearly on #ord #weekday of month
                label: 'yearlyOnWeekdayText',
                Recurring: true,
                RecurPeriod: 8,
                basePeriodSpec: 0,
                RecurPeriodSpec: 0,
                weekdays: [0, 0, 0, 0, 0, 0, 0],
                RecurIterations: 5,
                RecurrenceState: 'rstMaster'
            }
        ],

        createSimplifiedOptions: function(startDate) {

            this.recalculateSimplifiedPeriodSpec(startDate);

            var list = [],
                currentDate = startDate || new Date(),
                wrapped = moment(currentDate),
                day = currentDate.getDate(),
                ord = this.ordText[parseInt((day - 1) / 7, 10) + 1],
                textOptions = [
                    null, // scale, replaced in loop
                    day,
                    wrapped.format('DD'),
                    wrapped.lang().weekdays(wrapped),
                    wrapped.lang().monthsShort(wrapped),
                    ord
                ];

            for (var recurOption in this.simplifiedOptions) {
                textOptions[0] = this.getPanel(this.simplifiedOptions[recurOption].RecurPeriod);
                this.simplifiedOptions[recurOption].RecurIterations = this.defaultIterations[this.simplifiedOptions[recurOption].RecurPeriod];

                if (this[this.simplifiedOptions[recurOption].label]) {
                    list.push({
                        '$key': recurOption, // this.simplifiedOptions[recurOption].RecurPeriod,
                        '$descriptor': string.substitute(this[this.simplifiedOptions[recurOption].label], textOptions),
                        'recurrence': this.simplifiedOptions[recurOption]
                    });
                }
            }

            return {'$resources': list};
        },
        getPanel: function(recurPeriod, plural) {
            switch (recurPeriod) {
                case 0:
                case 1:
                    return plural ? this.daysText : this.dailyText;
                case 2:
                case 3:
                    return plural ? this.weeksText : this.weeklyText;
                case 4:
                case 5:
                case 6:
                    return plural ? this.monthsText : this.monthlyText;
                case 7:
                case 8:
                case 9:
                    return plural ? this.yearsText : this.yearlyText;
                default:
                    return this.neverText;
            }
        },
        isAfterCompletion: function(panel) {
            return 0 <= '1369'.indexOf(panel);
        },
        recalculateSimplifiedPeriodSpec: function(startDate) {
            var opt;
            for (var recurOption in this.simplifiedOptions) {
                opt = this.simplifiedOptions[recurOption];
                this.simplifiedOptions[recurOption].RecurPeriodSpec = this.getRecurPeriodSpec(
                    opt.RecurPeriod,
                    startDate,
                    opt.weekdays
                );
            }
        },
        getWeekdays: function(rps, names) { // pass a RecurPeriodSpec (as long as RecurPeriod corresponds to a Spec with weekdays)
            var weekdays = [];
            for (var i = 0; i < this._weekDayValues.length; i++) {
                if (names) {
                    if (rps & this._weekDayValues[i]) {
                        weekdays.push(moment().lang()._weekdays[i]);
                    }

                } else {
                    weekdays.push((rps & this._weekDayValues[i]) ? 1 : 0);
                }
            }

            return weekdays;
        },
        getOrd: function(entry) {
            var nthWeek = 0,
                weekday = entry['StartDate'].getDay(),
                monthNum = entry['StartDate'].getMonth() + 1,
                ordBits = entry.RecurPeriodSpec % 524288,
                monthBits = entry.RecurPeriodSpec % 4194304 - ordBits;

            if (entry && (5 == entry.RecurPeriod || 8 == entry.RecurPeriod)) {
                nthWeek = parseInt(ordBits / 65536, 10) + 1;
                weekday = parseInt(monthBits / 524288, 10) - 1;
                monthNum = parseInt((entry.RecurPeriodSpec - monthBits - ordBits) / 4194304, 10);
            }

            return {
                week: nthWeek,
                weekday: weekday,
                month: monthNum
            };
        },
        getRecurPeriodSpec: function(recurPeriod, startDate, weekdays, interval) {
            var spec = 0;
            interval = interval || this.interval;

            if (!startDate) {
                return;
            }

            switch (recurPeriod) {
                case 0:
                    // daily
                    break;
                case 1:
                    // daily occurances *after completion*
//
                    break;
                case 2:
                    // weekly
                    for (var i = 0; i < weekdays.length; i++) {
                        spec += (weekdays[i] ? this._weekDayValues[i] : 0);
                    }
                    if (0 === spec) {
                        spec += this._weekDayValues[startDate.getDay()];
                    }

                    break;
                case 3:
                    // weekly occurances *after completion*
                    spec = 1048576;
                    break;
                case 4:
                    // monthly on day ##
                    spec = 1048576;
                    break;
                case 5:
                    // monthly on #ord #weekday
                    var weekDay = startDate.getDay() + 1;
                    var nthWeek = parseInt((startDate.getDate() - 1) / 7, 10) + 1;
                    spec = ((weekDay * 524288) + ((nthWeek - 1) * 65536));
                    break;
                case 6:
                    // monthly occurances *after completion*
                    spec = 1048576;
                    break;
                case 7:
                    // yearly on #month #day
                    spec = 38797312;
                    break;
                case 8:
                    // yearly on #ord #weekday of #month
                    spec = 18546688;
                    weekDay = startDate.getDay() + 1;
                    var monthNum = startDate.getMonth() + 1;
                    nthWeek = parseInt((startDate.getDate() - 1) / 7, 10) + 1;
                    spec = ((monthNum * 4194304) + (weekDay * 524288) + ((nthWeek - 1) * 65536));
                    break;
                case 9:
                    // yearly occurances *after completion*
                    spec = 38797312;
                    break;
                default:
                    // Not recurring, happens only once
                    interval = 0;
            }

            return spec + interval; // + every interval days/weeks/months/years
        },

        toString: function(entry, dependsOnPanel) {
            if (entry.RecurrenceState != 'rstMaster' || !entry.StartDate) {
                return '';
            }

            var rp = parseInt(entry['RecurPeriod'], 10),
                recurPeriodSpec = parseInt(entry['RecurPeriodSpec'], 10),
                interval = recurPeriodSpec % 65536,
                text = (1 < interval)
                    ? string.substitute(this.everyText, [interval, this.getPanel(rp, true)])
                    : ((true === dependsOnPanel) ? '' : this.getPanel(rp)),
                currentDate = Sage.Platform.Mobile.Convert.toDateFromString(entry['StartDate']),
                day = currentDate.getDate(),
                weekday = moment(currentDate).format('dddd'),
                textOptions = [
                    text,
                    day,
                    moment(currentDate).format('MM/DD'),
                    this.getWeekdays(recurPeriodSpec, true),
                    moment(currentDate).format('MMMM'),
                    this.ordText[parseInt((day - 1) / 7, 10) + 1]
                ];

            switch (rp) {
                case 0:
                // daily
                case 1:
                    break;
                case 2:
                    // weekly
                    textOptions[2] = this.getWeekdays(recurPeriodSpec, true);
                    text = string.substitute(this.weeklyOnText, textOptions);
                    break;
                case 3:
                    break;
                case 4:
                    // monthly
                    text = string.substitute(this.monthlyOnDayText, textOptions);
                    break;
                case 5:
                    textOptions[3] = weekday;
                    text = string.substitute(this.monthlyOnText, textOptions);
                    break;
                case 6:
                    break;
                case 7:
                    // yearly
                    text = string.substitute(this.yearlyOnText, textOptions);
                    break;
                case 8:
                    textOptions[3] = weekday;
                    text = string.substitute(this.yearlyOnWeekdayText, textOptions);
                    break;
                case 9:
                    break;
                default:
                    return '';
            }

            if (this.isAfterCompletion(rp)) {
                text = string.substitute("${0} ${1}", [text, this.afterCompletionText]);
            } else {
                text = string.substitute(this.untilEndDateText, [text, this.calcEndDate(currentDate, entry).format('M/D/YYYY')]);
            }

            return text;
        },
        calcEndDate: function(date, entry) {
            var interval = entry['RecurPeriodSpec'] % 65536,
                tempDate = moment.isMoment(date) ? 
                    date.clone() :
                    new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());

            tempDate = moment(tempDate);
            switch (parseInt(entry['RecurPeriod'], 10)) {
                case 0:
                    tempDate.add((interval * (entry['RecurIterations'] - 1)), 'days');
                    break;
                case 2:
                    tempDate.add((interval * (entry['RecurIterations'] - 1)), 'weeks');
                    break;
                case 4:
                    tempDate.add((interval * (entry['RecurIterations'] - 1)), 'months');
                    break;
                case 5:
                    var weekDay = tempDate.day();
                    var nthWeek = parseInt(tempDate.date() / 7, 10) + 1;
                    tempDate.add((interval * (entry['RecurIterations'] - 1)), 'months');
                    tempDate = this.calcDateOfNthWeekday(tempDate.toDate(), weekDay, nthWeek);
                    break;
                case 7:
                    tempDate.add((interval * (entry['RecurIterations'] - 1)), 'years');
                    break;
                case 8:
                    weekDay = tempDate.day();
                    nthWeek = parseInt(tempDate.date() / 7, 10) + 1;
                    tempDate.add((interval * (entry['RecurIterations'] - 1)), 'years');
                    tempDate = this.calcDateOfNthWeekday(tempDate.toDate(), weekDay, nthWeek);
                    break;
                default:
                // RecurPeriod 1, 3, 6 & 9 are iterations after completion. No end date.
            }

            return tempDate;
        },
        calcDateOfNthWeekday: function(date, weekDay, nthWeek) {
            // calculate date of #nthWeek #weekDay  e.g. First Friday
            var tempDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()), i;
            tempDate = moment(tempDate);

            if (nthWeek === 5) {
                //"last" - count backwards...
                tempDate.endOf('month');
                for (i = 0; i < 7; i++) {
                    if (tempDate.day() === weekDay) {
                        break;
                    }
                    tempDate.subtract(1, 'days');
                }
            } else {
                // count from the beginning...
                tempDate.startOf('month');
                //get to the first day that matches...
                for (i = 0; i < 7; i++) {
                    if (tempDate.day() === weekDay) {
                        break;
                    }
                    tempDate.add(1, 'days');
                }
                //then add correct number of weeks (first week - add 0 etc.)
                tempDate.add((nthWeek - 1), 'weeks');
            }
            return tempDate;
        },
        calcRecurIterations: function(endDate, startDate, interval, recurPeriod) {
            // calculate number of occurances based on start and end dates
            var days = (endDate - startDate) / (1000 * 60 * 60 * 24),
                years = endDate.getFullYear() - startDate.getFullYear(),
                result;

            switch (parseInt(recurPeriod, 10)) {
                case 8:
                case 7:
                    result = years;
                    break;
                case 5:
                case 4:
                    result = (endDate.getMonth() - startDate.getMonth()) + (years * 12);
                    break;
                case 2:
                    result = days / 7;
                    break;
                case 0:
                    result = days;
                    break;
                default:
                // no cases should fall here
            }

            return Math.floor((result / interval) + 1);
        }
    });
});

