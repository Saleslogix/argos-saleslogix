define('crm/Recurrence', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'dijit/_Widget', 'argos/_ActionMixin', 'argos/_CustomizationMixin', 'argos/_Templated', 'moment'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _dijit_Widget, _argos_ActionMixin, _argos_CustomizationMixin, _argos_Templated, _moment) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _string = _interopRequireDefault(_dojoString);

    var _Widget2 = _interopRequireDefault(_dijit_Widget);

    var _ActionMixin2 = _interopRequireDefault(_argos_ActionMixin);

    var _CustomizationMixin2 = _interopRequireDefault(_argos_CustomizationMixin);

    var _Templated2 = _interopRequireDefault(_argos_Templated);

    var _moment2 = _interopRequireDefault(_moment);

    /**
     * @class crm.Recurrence
     *
     * @requires argos._ActionMixin
     * @requires argos._CustomizationMixin
     * @requires argos._Templated
     *
     */
    var __class = _lang['default'].setObject('crm.Recurrence', {
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
        dayFormatText: 'DD',
        monthFormatText: 'MM',
        monthAndDayFormatText: 'MM/DD',
        weekdayFormatText: 'dddd',
        endDateFormatText: 'M/D/YYYY',
        weekDaysText: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        ordText: ['day', 'first', 'second', 'third', 'fourth', 'last'],

        interval: 1, // repeat every interval days/weeks/months/years
        defaultIterations: [// by RecurPeriod, -1 for After Completed. Configurable.
        7, // days
        -1, 8, // weeks
        -1, 12, // months
        12, -1, 5, // years
        5, -1],
        _weekDayValues: [131072, // sun
        262144, // mon
        524288, // tue
        1048576, // wed
        2097152, // thu
        4194304, // fri
        8388608 // sat
        ],
        simplifiedOptions: [{
            label: 'neverText',
            Recurring: false,
            RecurPeriod: -1, // not recurring
            basePeriodSpec: 0,
            RecurPeriodSpec: 0,
            RecurIterations: 0,
            RecurrenceState: 'rsNotRecurring'
        }, {
            label: 'dailyText',
            Recurring: true,
            RecurPeriod: 0,
            basePeriodSpec: 0,
            RecurPeriodSpec: 0,
            RecurIterations: 7, // override from this.defaultIterations
            RecurrenceState: 'rstMaster'
        }, {
            label: 'weeklyOnText',
            Recurring: true,
            RecurPeriod: 2,
            basePeriodSpec: 0,
            weekdays: [0, 0, 0, 0, 0, 0, 0], // none selected by default
            RecurPeriodSpec: 0,
            RecurIterations: 8,
            RecurrenceState: 'rstMaster',
            calc: true
        }, {
            label: 'monthlyOnDayText',
            Recurring: true,
            RecurPeriod: 4,
            basePeriodSpec: 1048576,
            RecurPeriodSpec: 0,
            RecurIterations: 12,
            RecurrenceState: 'rstMaster'
        }, {
            label: 'monthlyOnText',
            Recurring: true,
            RecurPeriod: 5,
            basePeriodSpec: 0,
            RecurPeriodSpec: 0,
            RecurIterations: 12,
            RecurrenceState: 'rstMaster',
            calc: true
        }, {
            label: 'yearlyOnText',
            Recurring: true,
            RecurPeriod: 7,
            basePeriodSpec: 38797312,
            RecurPeriodSpec: 0,
            RecurIterations: 5,
            RecurrenceState: 'rstMaster'
        }, {
            // Need one more for Yearly on #ord #weekday of month
            label: 'yearlyOnWeekdayText',
            Recurring: true,
            RecurPeriod: 8,
            basePeriodSpec: 0,
            RecurPeriodSpec: 0,
            weekdays: [0, 0, 0, 0, 0, 0, 0],
            RecurIterations: 5,
            RecurrenceState: 'rstMaster'
        }],

        createSimplifiedOptions: function createSimplifiedOptions(startDate) {
            this.recalculateSimplifiedPeriodSpec(startDate);

            var list = [],
                currentDate = startDate || new Date(),
                recurOption,
                wrapped = (0, _moment2['default'])(currentDate),
                day = currentDate.getDate(),
                ord = this.ordText[parseInt(((day - 1) / 7).toString(), 10) + 1],
                textOptions = [null, // scale, replaced in loop
            day, wrapped.format(this.dayFormatText), wrapped.lang().weekdays(wrapped), wrapped.lang().monthsShort(wrapped), ord];

            for (recurOption in this.simplifiedOptions) {
                if (this.simplifiedOptions.hasOwnProperty(recurOption)) {
                    textOptions[0] = this.getPanel(this.simplifiedOptions[recurOption].RecurPeriod);
                    this.simplifiedOptions[recurOption].RecurIterations = this.defaultIterations[this.simplifiedOptions[recurOption].RecurPeriod] || 0;

                    if (this[this.simplifiedOptions[recurOption].label]) {
                        list.push({
                            '$key': recurOption, // this.simplifiedOptions[recurOption].RecurPeriod,
                            '$descriptor': _string['default'].substitute(this[this.simplifiedOptions[recurOption].label], textOptions),
                            'recurrence': this.simplifiedOptions[recurOption]
                        });
                    }
                }
            }

            return { '$resources': list };
        },
        getPanel: function getPanel(recurPeriod, plural) {
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
        isAfterCompletion: function isAfterCompletion(panel) {
            return 0 <= '1369'.indexOf(panel);
        },
        recalculateSimplifiedPeriodSpec: function recalculateSimplifiedPeriodSpec(startDate) {
            var opt, recurOption;
            for (recurOption in this.simplifiedOptions) {
                if (this.simplifiedOptions.hasOwnProperty(recurOption)) {
                    opt = this.simplifiedOptions[recurOption];
                    this.simplifiedOptions[recurOption].RecurPeriodSpec = this.getRecurPeriodSpec(opt.RecurPeriod, startDate, opt.weekdays);
                }
            }
        },
        getWeekdays: function getWeekdays(rps, names) {
            // pass a RecurPeriodSpec (as long as RecurPeriod corresponds to a Spec with weekdays)
            var weekdays, i;

            weekdays = [];
            for (i = 0; i < this._weekDayValues.length; i++) {
                if (names) {
                    if (rps & this._weekDayValues[i]) {
                        weekdays.push(this.weekDaysText[i]);
                    }
                } else {
                    weekdays.push(rps & this._weekDayValues[i] ? 1 : 0);
                }
            }

            return weekdays;
        },
        getOrd: function getOrd(entry) {
            var nthWeek = 0,
                weekday = entry['StartDate'].getDay(),
                monthNum = entry['StartDate'].getMonth() + 1,
                ordBits = entry.RecurPeriodSpec % 524288,
                monthBits = entry.RecurPeriodSpec % 4194304 - ordBits;

            if (entry && (5 === entry.RecurPeriod || 8 === entry.RecurPeriod)) {
                nthWeek = parseInt((ordBits / 65536).toString(), 10) + 1;
                weekday = parseInt((monthBits / 524288).toString(), 10) - 1;
                monthNum = parseInt(((entry.RecurPeriodSpec - monthBits - ordBits) / 4194304).toString(), 10);
            }

            return {
                week: nthWeek,
                weekday: weekday,
                month: monthNum
            };
        },
        getRecurPeriodSpec: function getRecurPeriodSpec(recurPeriod, startDate, weekdays, interval) {
            var spec, weekDay, nthWeek, monthNum, i;

            spec = 0;
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
                    for (i = 0; i < weekdays.length; i++) {
                        spec += weekdays[i] ? this._weekDayValues[i] : 0;
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
                    weekDay = startDate.getDay() + 1;
                    nthWeek = parseInt(((startDate.getDate() - 1) / 7).toString(), 10) + 1;
                    spec = weekDay * 524288 + (nthWeek - 1) * 65536;
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
                    monthNum = startDate.getMonth() + 1;
                    nthWeek = parseInt(((startDate.getDate() - 1) / 7).toString(), 10) + 1;
                    spec = monthNum * 4194304 + weekDay * 524288 + (nthWeek - 1) * 65536;
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

        toString: function toString(entry, dependsOnPanel) {
            if (entry.RecurrenceState !== 'rstMaster' || !entry.StartDate) {
                return '';
            }

            var rp = parseInt(entry['RecurPeriod'], 10),
                recurPeriodSpec = parseInt(entry['RecurPeriodSpec'], 10),
                interval = recurPeriodSpec % 65536,
                text = 1 < interval ? _string['default'].substitute(this.everyText, [interval, this.getPanel(rp, true)]) : true === dependsOnPanel ? '' : this.getPanel(rp),
                currentDate = argos.Convert.toDateFromString(entry['StartDate']),
                day = currentDate.getDate(),
                weekday = (0, _moment2['default'])(currentDate).format(this.weekdayFormatText),
                textOptions = [text, day, (0, _moment2['default'])(currentDate).format(this.monthAndDayFormatText), this.getWeekdays(recurPeriodSpec, true), (0, _moment2['default'])(currentDate).format(this.monthFormatText), this.ordText[parseInt(((day - 1) / 7).toString(), 10) + 1]];

            switch (rp) {
                case 0:
                // daily
                case 1:
                    break;
                case 2:
                    // weekly
                    textOptions[2] = this.getWeekdays(recurPeriodSpec, true);
                    text = _string['default'].substitute(this.weeklyOnText, textOptions);
                    break;
                case 3:
                    break;
                case 4:
                    // monthly
                    text = _string['default'].substitute(this.monthlyOnDayText, textOptions);
                    break;
                case 5:
                    textOptions[3] = weekday;
                    text = _string['default'].substitute(this.monthlyOnText, textOptions);
                    break;
                case 6:
                    break;
                case 7:
                    // yearly
                    text = _string['default'].substitute(this.yearlyOnText, textOptions);
                    break;
                case 8:
                    textOptions[3] = weekday;
                    text = _string['default'].substitute(this.yearlyOnWeekdayText, textOptions);
                    break;
                case 9:
                    break;
                default:
                    return '';
            }

            if (this.isAfterCompletion(rp)) {
                text = _string['default'].substitute('${0} ${1}', [text, this.afterCompletionText]);
            } else {
                text = _string['default'].substitute(this.untilEndDateText, [text, this.calcEndDate(currentDate, entry).format(this.endDateFormatText)]);
            }

            return text;
        },
        calcEndDate: function calcEndDate(date, entry) {
            var interval = entry['RecurPeriodSpec'] % 65536,
                weekDay,
                nthWeek,
                tempDate = _moment2['default'].isMoment(date) ? date.clone() : new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());

            tempDate = (0, _moment2['default'])(tempDate);
            switch (parseInt(entry['RecurPeriod'], 10)) {
                case 0:
                    tempDate.add(interval * (entry['RecurIterations'] - 1), 'days');
                    break;
                case 2:
                    tempDate.add(interval * (entry['RecurIterations'] - 1), 'weeks');
                    break;
                case 4:
                    tempDate.add(interval * (entry['RecurIterations'] - 1), 'months');
                    break;
                case 5:
                    weekDay = tempDate.day();
                    nthWeek = parseInt((tempDate.date() / 7).toString(), 10) + 1;
                    tempDate.add(interval * (entry['RecurIterations'] - 1), 'months');
                    tempDate = this.calcDateOfNthWeekday(tempDate.toDate(), weekDay, nthWeek);
                    break;
                case 7:
                    tempDate.add(interval * (entry['RecurIterations'] - 1), 'years');
                    break;
                case 8:
                    weekDay = tempDate.day();
                    nthWeek = parseInt((tempDate.date() / 7).toString(), 10) + 1;
                    tempDate.add(interval * (entry['RecurIterations'] - 1), 'years');
                    tempDate = this.calcDateOfNthWeekday(tempDate.toDate(), weekDay, nthWeek);
                    break;
                default:
                // RecurPeriod 1, 3, 6 & 9 are iterations after completion. No end date.
            }

            return tempDate;
        },
        calcDateOfNthWeekday: function calcDateOfNthWeekday(date, weekDay, nthWeek) {
            // calculate date of #nthWeek #weekDay  e.g. First Friday
            var tempDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                i;
            tempDate = (0, _moment2['default'])(tempDate);

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
                tempDate.add(nthWeek - 1, 'weeks');
            }
            return tempDate;
        },
        calcRecurIterations: function calcRecurIterations(endDate, startDate, interval, recurPeriod) {
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
                    result = endDate.getMonth() - startDate.getMonth() + years * 12;
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

            return Math.floor(result / interval + 1);
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Recurrence', __class);
    module.exports = __class;
});
