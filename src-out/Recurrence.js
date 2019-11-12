define('crm/Recurrence', ['module', 'exports', 'dojo/_base/lang', 'dojo/string', 'argos/I18n'], function (module, exports, _lang, _string, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _lang2 = _interopRequireDefault(_lang);

  var _string2 = _interopRequireDefault(_string);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('recurrence'); /* Copyright 2017 Infor
                                                     *
                                                     * Licensed under the Apache License, Version 2.0 (the "License");
                                                     * you may not use this file except in compliance with the License.
                                                     * You may obtain a copy of the License at
                                                     *
                                                     *    http://www.apache.org/licenses/LICENSE-2.0
                                                     *
                                                     * Unless required by applicable law or agreed to in writing, software
                                                     * distributed under the License is distributed on an "AS IS" BASIS,
                                                     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                     * See the License for the specific language governing permissions and
                                                     * limitations under the License.
                                                     */

  var dtFormatResource = (0, _I18n2.default)('recurrenceDateTimeFormat');

  /**
   * @class crm.Recurrence
   * @singleton
   */
  var __class = _lang2.default.setObject('crm.Recurrence', /** @lends crm.Recurrence */{
    // Localization
    neverText: resource.neverText,
    dailyText: resource.dailyText,
    weeklyText: resource.weeklyText,
    monthlyText: resource.monthlyText,
    yearlyText: resource.yearlyText,
    dayFormatText: dtFormatResource.dayFormatText,
    monthFormatText: dtFormatResource.monthFormatText,
    monthAndDayFormatText: dtFormatResource.monthAndDayFormatText,
    weekdayFormatText: dtFormatResource.weekdayFormatText,
    endDateFormatText: dtFormatResource.endDateFormatText,
    dateFormatText: dtFormatResource.endDateFormatText,
    timeFormatText: dtFormatResource.timeFormatText,
    timeFormatText24: dtFormatResource.timeFormatText24,
    singleActivitySummary: resource.singleActivitySummary,
    dailySummary: resource.dailySummary,
    dailyEverySummary: resource.dailyEverySummary,
    dailyAfterCompletionSummary: resource.dailyAfterCompletionSummary,
    dailyEveryAfterCompletionSummary: resource.dailyEveryAfterCompletionSummary,
    weeklySummary: resource.weeklySummary,
    weeklyEverySummary: resource.weeklyEverySummary,
    weeklyAfterCompletionSummary: resource.weeklyAfterCompletionSummary,
    weeklyEveryAfterCompletionSummary: resource.weeklyEveryAfterCompletionSummary,
    monthlyOrdSummary: resource.monthlyOrdSummary,
    monthlyEveryOrdSummary: resource.monthlyEveryOrdSummary,
    monthlySummary: resource.monthlySummary,
    monthlyEverySummary: resource.monthlyEverySummary,
    monthlyAfterCompletionSummary: resource.monthlyAfterCompletionSummary,
    monthlyEveryAfterCompletionSummary: resource.monthlyEveryAfterCompletionSummary,
    yearlySummary: resource.yearlySummary,
    yearlyEverySummary: resource.yearlyEverySummary,
    yearlyOrdSummary: resource.yearlyOrdSummary,
    yearlyEveryOrdSummary: resource.yearlyEveryOrdSummary,
    yearlyAfterCompletionSummary: resource.yearlyAfterCompletionSummary,
    yearlyEveryAfterCompletionSummary: resource.yearlyEveryAfterCompletionSummary,
    daySeparator: resource.daySeparator,
    weekDaysText: [resource.sunday, resource.monday, resource.tuesday, resource.wednesday, resource.thursday, resource.friday, resource.saturday],
    ordText: [resource.day, resource.first, resource.second, resource.third, resource.fourth, resource.last],

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
    8388608],
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
      label: 'weeklyText',
      Recurring: true,
      RecurPeriod: 2,
      basePeriodSpec: 0,
      weekdays: [0, 0, 0, 0, 0, 0, 0], // none selected by default
      RecurPeriodSpec: 0,
      RecurIterations: 8,
      RecurrenceState: 'rstMaster',
      calc: true
    }, {
      label: 'monthlyText',
      Recurring: true,
      RecurPeriod: 4,
      basePeriodSpec: 1048576,
      RecurPeriodSpec: 0,
      RecurIterations: 12,
      RecurrenceState: 'rstMaster'
    }, {
      label: 'yearlyText',
      Recurring: true,
      RecurPeriod: 7,
      basePeriodSpec: 38797312,
      RecurPeriodSpec: 0,
      RecurIterations: 5,
      RecurrenceState: 'rstMaster'
    }],

    createSimplifiedOptions: function createSimplifiedOptions(startDate) {
      this.recalculateSimplifiedPeriodSpec(startDate);

      var list = [];
      var currentDate = startDate || new Date();
      var wrapped = moment(currentDate);
      var day = currentDate.getDate();
      var ord = this.ordText[parseInt(((day - 1) / 7).toString(), 10) + 1];
      var textOptions = [null, // scale, replaced in loop
      day, wrapped.format(this.dayFormatText), wrapped.localeData().weekdays(wrapped), wrapped.localeData().monthsShort(wrapped), ord];

      for (var recurOption in this.simplifiedOptions) {
        if (this.simplifiedOptions.hasOwnProperty(recurOption)) {
          textOptions[0] = this.getPanel(this.simplifiedOptions[recurOption].RecurPeriod);
          this.simplifiedOptions[recurOption].RecurIterations = this.defaultIterations[this.simplifiedOptions[recurOption].RecurPeriod] || 0;

          if (this[this.simplifiedOptions[recurOption].label]) {
            list.push({
              $key: recurOption, // this.simplifiedOptions[recurOption].RecurPeriod,
              $descriptor: _string2.default.substitute(this[this.simplifiedOptions[recurOption].label], textOptions),
              recurrence: this.simplifiedOptions[recurOption]
            });
          }
        }
      }

      return {
        $resources: list
      };
    },
    getPanel: function getPanel(recurPeriod) {
      switch (recurPeriod) {
        case 0:
        case 1:
          return this.dailyText;
        case 2:
        case 3:
          return this.weeklyText;
        case 4:
        case 5:
        case 6:
          return this.monthlyText;
        case 7:
        case 8:
        case 9:
          return this.yearlyText;
        default:
          return this.neverText;
      }
    },
    isAfterCompletion: function isAfterCompletion(panel) {
      return '1369'.indexOf(panel) >= 0;
    },
    recalculateSimplifiedPeriodSpec: function recalculateSimplifiedPeriodSpec(startDate) {
      for (var recurOption in this.simplifiedOptions) {
        if (this.simplifiedOptions.hasOwnProperty(recurOption)) {
          var opt = this.simplifiedOptions[recurOption];
          this.simplifiedOptions[recurOption].RecurPeriodSpec = this.getRecurPeriodSpec(opt.RecurPeriod, startDate, opt.weekdays);
        }
      }
    },
    getWeekdays: function getWeekdays(rps, names) {
      // pass a RecurPeriodSpec (as long as RecurPeriod corresponds to a Spec with weekdays)
      var weekdays = [];
      for (var i = 0; i < this._weekDayValues.length; i++) {
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
      var nthWeek = 0;
      var weekday = entry.StartDate.getDay();
      var monthNum = entry.StartDate.getMonth() + 1;
      var ordBits = entry.RecurPeriodSpec % 524288;
      var monthBits = entry.RecurPeriodSpec % 4194304 - ordBits;

      if (entry && (entry.RecurPeriod === 5 || entry.RecurPeriod === 8)) {
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
    getRecurPeriodSpec: function getRecurPeriodSpec(recurPeriod, startDate, weekdays, inter) {
      var spec = 0;
      var interval = inter || this.interval;
      var weekDay = void 0;
      var nthWeek = void 0;
      var monthNum = void 0;

      if (!startDate) {
        return null;
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
            spec += weekdays[i] ? this._weekDayValues[i] : 0;
          }
          if (spec === 0) {
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
    createTextOptions: function createTextOptions(entry) {
      var weekdaysString = '';
      var recurPeriodSpec = parseInt(entry.RecurPeriodSpec, 10);
      var interval = recurPeriodSpec % 65536;
      var momentCurrentDate = moment(entry.StartDate);
      var currentDate = momentCurrentDate.toDate();
      var day = currentDate.getDate();
      var weekday = momentCurrentDate.format(this.weekdayFormatText);
      var weekdays = this.getWeekdays(recurPeriodSpec, true);
      var month = momentCurrentDate.localeData().months(momentCurrentDate);

      var timeFormatted = momentCurrentDate.format(this.timeFormatText);

      if (App && App.is24HourClock()) {
        timeFormatted = momentCurrentDate.format(this.timeFormatText24);
      }

      // eslint-disable-next-line guard-for-in
      for (var key in weekdays) {
        if (weekdays[key] && parseInt(key, 10) < weekdays.length - 1) {
          weekdays[key] = _string2.default.substitute(this.daySeparator, [weekdays[key]]);
        }
        weekdaysString += weekdays[key];
      }

      return [interval, timeFormatted, momentCurrentDate.format(this.dateFormatText), this.calcEndDate(currentDate, entry).format(this.endDateFormatText), weekdaysString, month, _string2.default.substitute(this.ordText[parseInt((day - 1) / 7, 10) + 1], [weekday]), day];
    },
    buildSummaryText: function buildSummaryText(entry, textOptions) {
      var rp = parseInt(entry.RecurPeriod, 10);
      switch (rp) {
        case -1:
          // occurs only once
          return this.singleActivitySummary;
        case 0:
          // daily
          return textOptions[0] <= 1 ? _string2.default.substitute(this.dailySummary, textOptions) : _string2.default.substitute(this.dailyEverySummary, textOptions);
        case 1:
          // daily after completion
          return textOptions[0] <= 1 ? _string2.default.substitute(this.dailyAfterCompletionSummary, textOptions) : _string2.default.substitute(this.dailyEveryAfterCompletionSummary, textOptions);
        case 2:
          // weekly
          return textOptions[0] <= 1 ? _string2.default.substitute(this.weeklySummary, textOptions) : _string2.default.substitute(this.weeklyEverySummary, textOptions);
        case 3:
          // weekly after completion
          return textOptions[0] <= 1 ? _string2.default.substitute(this.weeklyAfterCompletionSummary, textOptions) : _string2.default.substitute(this.weeklyEveryAfterCompletionSummary, textOptions);
        case 4:
          // monthly on day
          return textOptions[0] <= 1 ? _string2.default.substitute(this.monthlySummary, textOptions) : _string2.default.substitute(this.monthlyEverySummary, textOptions);
        case 5:
          // monthly on day ordinal
          return textOptions[0] <= 1 ? _string2.default.substitute(this.monthlyOrdSummary, textOptions) : _string2.default.substitute(this.monthlyEveryOrdSummary, textOptions);
        case 6:
          // monthly after completion
          return textOptions[0] <= 1 ? _string2.default.substitute(this.monthlyAfterCompletionSummary, textOptions) : _string2.default.substitute(this.monthlyEveryAfterCompletionSummary, textOptions);
        case 7:
          // yearly on day of the month
          return textOptions[0] <= 1 ? _string2.default.substitute(this.yearlySummary, textOptions) : _string2.default.substitute(this.yearlyEverySummary, textOptions);
        case 8:
          // yearly on day ordinal
          return textOptions[0] <= 1 ? _string2.default.substitute(this.yearlyOrdSummary, textOptions) : _string2.default.substitute(this.yearlyEveryOrdSummary, textOptions);
        case 9:
          // Yearly after completion
          return textOptions[0] <= 1 ? _string2.default.substitute(this.yearlyAfterCompletionSummary, textOptions) : _string2.default.substitute(this.yearlyEveryAfterCompletionSummary, textOptions);
        default:
          return '';
      }
    },
    toString: function toString(entry) {
      if (entry.RecurrenceState !== 'rstMaster' || !entry.StartDate) {
        if (entry.RecurrenceState === 'rsNotRecurring' && entry.StartDate) {
          return this.singleActivitySummary;
        }
        return '';
      }
      var textOptions = this.createTextOptions(entry);
      return this.buildSummaryText(entry, textOptions);
    },
    calcEndDate: function calcEndDate(date, entry) {
      var interval = entry.RecurPeriodSpec % 65536;
      var weekDay = void 0;
      var nthWeek = void 0;
      var tempDate = moment.isMoment(date) ? date.clone() : new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());

      tempDate = moment(tempDate);
      switch (parseInt(entry.RecurPeriod, 10)) {
        case 0:
          tempDate.add(interval * (entry.RecurIterations - 1), 'days');
          break;
        case 2:
          tempDate.add(interval * (entry.RecurIterations - 1), 'weeks');
          break;
        case 4:
          tempDate.add(interval * (entry.RecurIterations - 1), 'months');
          break;
        case 5:
          weekDay = tempDate.day();
          nthWeek = parseInt((tempDate.date() / 7).toString(), 10) + 1;
          tempDate.add(interval * (entry.RecurIterations - 1), 'months');
          tempDate = this.calcDateOfNthWeekday(tempDate.toDate(), weekDay, nthWeek);
          break;
        case 7:
          tempDate.add(interval * (entry.RecurIterations - 1), 'years');
          break;
        case 8:
          weekDay = tempDate.day();
          nthWeek = parseInt((tempDate.date() / 7).toString(), 10) + 1;
          tempDate.add(interval * (entry.RecurIterations - 1), 'years');
          tempDate = this.calcDateOfNthWeekday(tempDate.toDate(), weekDay, nthWeek);
          break;
        default:
        // RecurPeriod 1, 3, 6 & 9 are iterations after completion. No end date.
      }

      return tempDate;
    },
    calcDateOfNthWeekday: function calcDateOfNthWeekday(date, weekDay, nthWeek) {
      // calculate date of #nthWeek #weekDay  e.g. First Friday
      var tempDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      tempDate = moment(tempDate);

      if (nthWeek === 5) {
        // "last" - count backwards...
        tempDate.endOf('month');
        for (var i = 0; i < 7; i++) {
          if (tempDate.day() === weekDay) {
            break;
          }
          tempDate.subtract(1, 'days');
        }
      } else {
        // count from the beginning...
        tempDate.startOf('month');
        // get to the first day that matches...
        for (var _i = 0; _i < 7; _i++) {
          if (tempDate.day() === weekDay) {
            break;
          }
          tempDate.add(1, 'days');
        }
        // then add correct number of weeks (first week - add 0 etc.)
        tempDate.add(nthWeek - 1, 'weeks');
      }
      return tempDate;
    },
    calcRecurIterations: function calcRecurIterations(endDate, startDate, interval, recurPeriod) {
      // calculate number of occurances based on start and end dates
      var days = (endDate - startDate) / (1000 * 60 * 60 * 24);
      var years = endDate.getFullYear() - startDate.getFullYear();
      var result = void 0;

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

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZWN1cnJlbmNlLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiZHRGb3JtYXRSZXNvdXJjZSIsIl9fY2xhc3MiLCJzZXRPYmplY3QiLCJuZXZlclRleHQiLCJkYWlseVRleHQiLCJ3ZWVrbHlUZXh0IiwibW9udGhseVRleHQiLCJ5ZWFybHlUZXh0IiwiZGF5Rm9ybWF0VGV4dCIsIm1vbnRoRm9ybWF0VGV4dCIsIm1vbnRoQW5kRGF5Rm9ybWF0VGV4dCIsIndlZWtkYXlGb3JtYXRUZXh0IiwiZW5kRGF0ZUZvcm1hdFRleHQiLCJkYXRlRm9ybWF0VGV4dCIsInRpbWVGb3JtYXRUZXh0IiwidGltZUZvcm1hdFRleHQyNCIsInNpbmdsZUFjdGl2aXR5U3VtbWFyeSIsImRhaWx5U3VtbWFyeSIsImRhaWx5RXZlcnlTdW1tYXJ5IiwiZGFpbHlBZnRlckNvbXBsZXRpb25TdW1tYXJ5IiwiZGFpbHlFdmVyeUFmdGVyQ29tcGxldGlvblN1bW1hcnkiLCJ3ZWVrbHlTdW1tYXJ5Iiwid2Vla2x5RXZlcnlTdW1tYXJ5Iiwid2Vla2x5QWZ0ZXJDb21wbGV0aW9uU3VtbWFyeSIsIndlZWtseUV2ZXJ5QWZ0ZXJDb21wbGV0aW9uU3VtbWFyeSIsIm1vbnRobHlPcmRTdW1tYXJ5IiwibW9udGhseUV2ZXJ5T3JkU3VtbWFyeSIsIm1vbnRobHlTdW1tYXJ5IiwibW9udGhseUV2ZXJ5U3VtbWFyeSIsIm1vbnRobHlBZnRlckNvbXBsZXRpb25TdW1tYXJ5IiwibW9udGhseUV2ZXJ5QWZ0ZXJDb21wbGV0aW9uU3VtbWFyeSIsInllYXJseVN1bW1hcnkiLCJ5ZWFybHlFdmVyeVN1bW1hcnkiLCJ5ZWFybHlPcmRTdW1tYXJ5IiwieWVhcmx5RXZlcnlPcmRTdW1tYXJ5IiwieWVhcmx5QWZ0ZXJDb21wbGV0aW9uU3VtbWFyeSIsInllYXJseUV2ZXJ5QWZ0ZXJDb21wbGV0aW9uU3VtbWFyeSIsImRheVNlcGFyYXRvciIsIndlZWtEYXlzVGV4dCIsInN1bmRheSIsIm1vbmRheSIsInR1ZXNkYXkiLCJ3ZWRuZXNkYXkiLCJ0aHVyc2RheSIsImZyaWRheSIsInNhdHVyZGF5Iiwib3JkVGV4dCIsImRheSIsImZpcnN0Iiwic2Vjb25kIiwidGhpcmQiLCJmb3VydGgiLCJsYXN0IiwiaW50ZXJ2YWwiLCJkZWZhdWx0SXRlcmF0aW9ucyIsIl93ZWVrRGF5VmFsdWVzIiwic2ltcGxpZmllZE9wdGlvbnMiLCJsYWJlbCIsIlJlY3VycmluZyIsIlJlY3VyUGVyaW9kIiwiYmFzZVBlcmlvZFNwZWMiLCJSZWN1clBlcmlvZFNwZWMiLCJSZWN1ckl0ZXJhdGlvbnMiLCJSZWN1cnJlbmNlU3RhdGUiLCJ3ZWVrZGF5cyIsImNhbGMiLCJjcmVhdGVTaW1wbGlmaWVkT3B0aW9ucyIsInN0YXJ0RGF0ZSIsInJlY2FsY3VsYXRlU2ltcGxpZmllZFBlcmlvZFNwZWMiLCJsaXN0IiwiY3VycmVudERhdGUiLCJEYXRlIiwid3JhcHBlZCIsIm1vbWVudCIsImdldERhdGUiLCJvcmQiLCJwYXJzZUludCIsInRvU3RyaW5nIiwidGV4dE9wdGlvbnMiLCJmb3JtYXQiLCJsb2NhbGVEYXRhIiwibW9udGhzU2hvcnQiLCJyZWN1ck9wdGlvbiIsImhhc093blByb3BlcnR5IiwiZ2V0UGFuZWwiLCJwdXNoIiwiJGtleSIsIiRkZXNjcmlwdG9yIiwic3Vic3RpdHV0ZSIsInJlY3VycmVuY2UiLCIkcmVzb3VyY2VzIiwicmVjdXJQZXJpb2QiLCJpc0FmdGVyQ29tcGxldGlvbiIsInBhbmVsIiwiaW5kZXhPZiIsIm9wdCIsImdldFJlY3VyUGVyaW9kU3BlYyIsImdldFdlZWtkYXlzIiwicnBzIiwibmFtZXMiLCJpIiwibGVuZ3RoIiwiZ2V0T3JkIiwiZW50cnkiLCJudGhXZWVrIiwid2Vla2RheSIsIlN0YXJ0RGF0ZSIsImdldERheSIsIm1vbnRoTnVtIiwiZ2V0TW9udGgiLCJvcmRCaXRzIiwibW9udGhCaXRzIiwid2VlayIsIm1vbnRoIiwiaW50ZXIiLCJzcGVjIiwid2Vla0RheSIsImNyZWF0ZVRleHRPcHRpb25zIiwid2Vla2RheXNTdHJpbmciLCJyZWN1clBlcmlvZFNwZWMiLCJtb21lbnRDdXJyZW50RGF0ZSIsInRvRGF0ZSIsIm1vbnRocyIsInRpbWVGb3JtYXR0ZWQiLCJBcHAiLCJpczI0SG91ckNsb2NrIiwia2V5IiwiY2FsY0VuZERhdGUiLCJidWlsZFN1bW1hcnlUZXh0IiwicnAiLCJkYXRlIiwidGVtcERhdGUiLCJpc01vbWVudCIsImNsb25lIiwiZ2V0RnVsbFllYXIiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJnZXRTZWNvbmRzIiwiYWRkIiwiY2FsY0RhdGVPZk50aFdlZWtkYXkiLCJlbmRPZiIsInN1YnRyYWN0Iiwic3RhcnRPZiIsImNhbGNSZWN1ckl0ZXJhdGlvbnMiLCJlbmREYXRlIiwiZGF5cyIsInllYXJzIiwicmVzdWx0IiwiTWF0aCIsImZsb29yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQSxNQUFNQSxXQUFXLG9CQUFZLFlBQVosQ0FBakIsQyxDQXBCQTs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU1DLG1CQUFtQixvQkFBWSwwQkFBWixDQUF6Qjs7QUFFQTs7OztBQUlBLE1BQU1DLFVBQVUsZUFBS0MsU0FBTCxDQUFlLGdCQUFmLEVBQWlDLDRCQUE0QjtBQUMzRTtBQUNBQyxlQUFXSixTQUFTSSxTQUZ1RDtBQUczRUMsZUFBV0wsU0FBU0ssU0FIdUQ7QUFJM0VDLGdCQUFZTixTQUFTTSxVQUpzRDtBQUszRUMsaUJBQWFQLFNBQVNPLFdBTHFEO0FBTTNFQyxnQkFBWVIsU0FBU1EsVUFOc0Q7QUFPM0VDLG1CQUFlUixpQkFBaUJRLGFBUDJDO0FBUTNFQyxxQkFBaUJULGlCQUFpQlMsZUFSeUM7QUFTM0VDLDJCQUF1QlYsaUJBQWlCVSxxQkFUbUM7QUFVM0VDLHVCQUFtQlgsaUJBQWlCVyxpQkFWdUM7QUFXM0VDLHVCQUFtQlosaUJBQWlCWSxpQkFYdUM7QUFZM0VDLG9CQUFnQmIsaUJBQWlCWSxpQkFaMEM7QUFhM0VFLG9CQUFnQmQsaUJBQWlCYyxjQWIwQztBQWMzRUMsc0JBQWtCZixpQkFBaUJlLGdCQWR3QztBQWUzRUMsMkJBQXVCakIsU0FBU2lCLHFCQWYyQztBQWdCM0VDLGtCQUFjbEIsU0FBU2tCLFlBaEJvRDtBQWlCM0VDLHVCQUFtQm5CLFNBQVNtQixpQkFqQitDO0FBa0IzRUMsaUNBQTZCcEIsU0FBU29CLDJCQWxCcUM7QUFtQjNFQyxzQ0FBa0NyQixTQUFTcUIsZ0NBbkJnQztBQW9CM0VDLG1CQUFldEIsU0FBU3NCLGFBcEJtRDtBQXFCM0VDLHdCQUFvQnZCLFNBQVN1QixrQkFyQjhDO0FBc0IzRUMsa0NBQThCeEIsU0FBU3dCLDRCQXRCb0M7QUF1QjNFQyx1Q0FBbUN6QixTQUFTeUIsaUNBdkIrQjtBQXdCM0VDLHVCQUFtQjFCLFNBQVMwQixpQkF4QitDO0FBeUIzRUMsNEJBQXdCM0IsU0FBUzJCLHNCQXpCMEM7QUEwQjNFQyxvQkFBZ0I1QixTQUFTNEIsY0ExQmtEO0FBMkIzRUMseUJBQXFCN0IsU0FBUzZCLG1CQTNCNkM7QUE0QjNFQyxtQ0FBK0I5QixTQUFTOEIsNkJBNUJtQztBQTZCM0VDLHdDQUFvQy9CLFNBQVMrQixrQ0E3QjhCO0FBOEIzRUMsbUJBQWVoQyxTQUFTZ0MsYUE5Qm1EO0FBK0IzRUMsd0JBQW9CakMsU0FBU2lDLGtCQS9COEM7QUFnQzNFQyxzQkFBa0JsQyxTQUFTa0MsZ0JBaENnRDtBQWlDM0VDLDJCQUF1Qm5DLFNBQVNtQyxxQkFqQzJDO0FBa0MzRUMsa0NBQThCcEMsU0FBU29DLDRCQWxDb0M7QUFtQzNFQyx1Q0FBbUNyQyxTQUFTcUMsaUNBbkMrQjtBQW9DM0VDLGtCQUFjdEMsU0FBU3NDLFlBcENvRDtBQXFDM0VDLGtCQUFjLENBQ1p2QyxTQUFTd0MsTUFERyxFQUVaeEMsU0FBU3lDLE1BRkcsRUFHWnpDLFNBQVMwQyxPQUhHLEVBSVoxQyxTQUFTMkMsU0FKRyxFQUtaM0MsU0FBUzRDLFFBTEcsRUFNWjVDLFNBQVM2QyxNQU5HLEVBT1o3QyxTQUFTOEMsUUFQRyxDQXJDNkQ7QUE4QzNFQyxhQUFTLENBQ1AvQyxTQUFTZ0QsR0FERixFQUVQaEQsU0FBU2lELEtBRkYsRUFHUGpELFNBQVNrRCxNQUhGLEVBSVBsRCxTQUFTbUQsS0FKRixFQUtQbkQsU0FBU29ELE1BTEYsRUFNUHBELFNBQVNxRCxJQU5GLENBOUNrRTs7QUF1RDNFQyxjQUFVLENBdkRpRSxFQXVEOUQ7QUFDYkMsdUJBQW1CLENBQUU7QUFDbkIsS0FEaUIsRUFDZDtBQUNILEtBQUMsQ0FGZ0IsRUFHakIsQ0FIaUIsRUFHZDtBQUNILEtBQUMsQ0FKZ0IsRUFLakIsRUFMaUIsRUFLYjtBQUNKLE1BTmlCLEVBTWIsQ0FBQyxDQU5ZLEVBT2pCLENBUGlCLEVBT2Q7QUFDSCxLQVJpQixFQVFkLENBQUMsQ0FSYSxDQXhEd0Q7QUFrRTNFQyxvQkFBZ0IsQ0FDZCxNQURjLEVBQ047QUFDUixVQUZjLEVBRU47QUFDUixVQUhjLEVBR047QUFDUixXQUpjLEVBSUw7QUFDVCxXQUxjLEVBS0w7QUFDVCxXQU5jLEVBTUw7QUFDVCxXQVBjLENBbEUyRDtBQTJFM0VDLHVCQUFtQixDQUFDO0FBQ2xCQyxhQUFPLFdBRFc7QUFFbEJDLGlCQUFXLEtBRk87QUFHbEJDLG1CQUFhLENBQUMsQ0FISSxFQUdEO0FBQ2pCQyxzQkFBZ0IsQ0FKRTtBQUtsQkMsdUJBQWlCLENBTEM7QUFNbEJDLHVCQUFpQixDQU5DO0FBT2xCQyx1QkFBaUI7QUFQQyxLQUFELEVBUWhCO0FBQ0ROLGFBQU8sV0FETjtBQUVEQyxpQkFBVyxJQUZWO0FBR0RDLG1CQUFhLENBSFo7QUFJREMsc0JBQWdCLENBSmY7QUFLREMsdUJBQWlCLENBTGhCO0FBTURDLHVCQUFpQixDQU5oQixFQU1tQjtBQUNwQkMsdUJBQWlCO0FBUGhCLEtBUmdCLEVBZ0JoQjtBQUNETixhQUFPLFlBRE47QUFFREMsaUJBQVcsSUFGVjtBQUdEQyxtQkFBYSxDQUhaO0FBSURDLHNCQUFnQixDQUpmO0FBS0RJLGdCQUFVLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsQ0FMVCxFQUtnQztBQUNqQ0gsdUJBQWlCLENBTmhCO0FBT0RDLHVCQUFpQixDQVBoQjtBQVFEQyx1QkFBaUIsV0FSaEI7QUFTREUsWUFBTTtBQVRMLEtBaEJnQixFQTBCaEI7QUFDRFIsYUFBTyxhQUROO0FBRURDLGlCQUFXLElBRlY7QUFHREMsbUJBQWEsQ0FIWjtBQUlEQyxzQkFBZ0IsT0FKZjtBQUtEQyx1QkFBaUIsQ0FMaEI7QUFNREMsdUJBQWlCLEVBTmhCO0FBT0RDLHVCQUFpQjtBQVBoQixLQTFCZ0IsRUFrQ2hCO0FBQ0ROLGFBQU8sWUFETjtBQUVEQyxpQkFBVyxJQUZWO0FBR0RDLG1CQUFhLENBSFo7QUFJREMsc0JBQWdCLFFBSmY7QUFLREMsdUJBQWlCLENBTGhCO0FBTURDLHVCQUFpQixDQU5oQjtBQU9EQyx1QkFBaUI7QUFQaEIsS0FsQ2dCLENBM0V3RDs7QUF1SDNFRyw2QkFBeUIsU0FBU0EsdUJBQVQsQ0FBaUNDLFNBQWpDLEVBQTRDO0FBQ25FLFdBQUtDLCtCQUFMLENBQXFDRCxTQUFyQzs7QUFFQSxVQUFNRSxPQUFPLEVBQWI7QUFDQSxVQUFNQyxjQUFjSCxhQUFhLElBQUlJLElBQUosRUFBakM7QUFDQSxVQUFNQyxVQUFVQyxPQUFPSCxXQUFQLENBQWhCO0FBQ0EsVUFBTXZCLE1BQU11QixZQUFZSSxPQUFaLEVBQVo7QUFDQSxVQUFNQyxNQUFNLEtBQUs3QixPQUFMLENBQWE4QixTQUFTLENBQUMsQ0FBQzdCLE1BQU0sQ0FBUCxJQUFZLENBQWIsRUFBZ0I4QixRQUFoQixFQUFULEVBQXFDLEVBQXJDLElBQTJDLENBQXhELENBQVo7QUFDQSxVQUFNQyxjQUFjLENBQ2xCLElBRGtCLEVBQ1o7QUFDTi9CLFNBRmtCLEVBR2xCeUIsUUFBUU8sTUFBUixDQUFlLEtBQUt2RSxhQUFwQixDQUhrQixFQUlsQmdFLFFBQVFRLFVBQVIsR0FBcUJoQixRQUFyQixDQUE4QlEsT0FBOUIsQ0FKa0IsRUFLbEJBLFFBQVFRLFVBQVIsR0FBcUJDLFdBQXJCLENBQWlDVCxPQUFqQyxDQUxrQixFQU1sQkcsR0FOa0IsQ0FBcEI7O0FBU0EsV0FBSyxJQUFNTyxXQUFYLElBQTBCLEtBQUsxQixpQkFBL0IsRUFBa0Q7QUFDaEQsWUFBSSxLQUFLQSxpQkFBTCxDQUF1QjJCLGNBQXZCLENBQXNDRCxXQUF0QyxDQUFKLEVBQXdEO0FBQ3RESixzQkFBWSxDQUFaLElBQWlCLEtBQUtNLFFBQUwsQ0FBYyxLQUFLNUIsaUJBQUwsQ0FBdUIwQixXQUF2QixFQUFvQ3ZCLFdBQWxELENBQWpCO0FBQ0EsZUFBS0gsaUJBQUwsQ0FBdUIwQixXQUF2QixFQUFvQ3BCLGVBQXBDLEdBQXNELEtBQUtSLGlCQUFMLENBQXVCLEtBQUtFLGlCQUFMLENBQXVCMEIsV0FBdkIsRUFBb0N2QixXQUEzRCxLQUEyRSxDQUFqSTs7QUFFQSxjQUFJLEtBQUssS0FBS0gsaUJBQUwsQ0FBdUIwQixXQUF2QixFQUFvQ3pCLEtBQXpDLENBQUosRUFBcUQ7QUFDbkRZLGlCQUFLZ0IsSUFBTCxDQUFVO0FBQ1JDLG9CQUFNSixXQURFLEVBQ1c7QUFDbkJLLDJCQUFhLGlCQUFPQyxVQUFQLENBQWtCLEtBQUssS0FBS2hDLGlCQUFMLENBQXVCMEIsV0FBdkIsRUFBb0N6QixLQUF6QyxDQUFsQixFQUFtRXFCLFdBQW5FLENBRkw7QUFHUlcsMEJBQVksS0FBS2pDLGlCQUFMLENBQXVCMEIsV0FBdkI7QUFISixhQUFWO0FBS0Q7QUFDRjtBQUNGOztBQUVELGFBQU87QUFDTFEsb0JBQVlyQjtBQURQLE9BQVA7QUFHRCxLQTFKMEU7QUEySjNFZSxjQUFVLFNBQVNBLFFBQVQsQ0FBa0JPLFdBQWxCLEVBQStCO0FBQ3ZDLGNBQVFBLFdBQVI7QUFDRSxhQUFLLENBQUw7QUFDQSxhQUFLLENBQUw7QUFDRSxpQkFBTyxLQUFLdkYsU0FBWjtBQUNGLGFBQUssQ0FBTDtBQUNBLGFBQUssQ0FBTDtBQUNFLGlCQUFPLEtBQUtDLFVBQVo7QUFDRixhQUFLLENBQUw7QUFDQSxhQUFLLENBQUw7QUFDQSxhQUFLLENBQUw7QUFDRSxpQkFBTyxLQUFLQyxXQUFaO0FBQ0YsYUFBSyxDQUFMO0FBQ0EsYUFBSyxDQUFMO0FBQ0EsYUFBSyxDQUFMO0FBQ0UsaUJBQU8sS0FBS0MsVUFBWjtBQUNGO0FBQ0UsaUJBQU8sS0FBS0osU0FBWjtBQWhCSjtBQWtCRCxLQTlLMEU7QUErSzNFeUYsdUJBQW1CLFNBQVNBLGlCQUFULENBQTJCQyxLQUEzQixFQUFrQztBQUNuRCxhQUFPLE9BQU9DLE9BQVAsQ0FBZUQsS0FBZixLQUF5QixDQUFoQztBQUNELEtBakwwRTtBQWtMM0V6QixxQ0FBaUMsU0FBU0EsK0JBQVQsQ0FBeUNELFNBQXpDLEVBQW9EO0FBQ25GLFdBQUssSUFBTWUsV0FBWCxJQUEwQixLQUFLMUIsaUJBQS9CLEVBQWtEO0FBQ2hELFlBQUksS0FBS0EsaUJBQUwsQ0FBdUIyQixjQUF2QixDQUFzQ0QsV0FBdEMsQ0FBSixFQUF3RDtBQUN0RCxjQUFNYSxNQUFNLEtBQUt2QyxpQkFBTCxDQUF1QjBCLFdBQXZCLENBQVo7QUFDQSxlQUFLMUIsaUJBQUwsQ0FBdUIwQixXQUF2QixFQUFvQ3JCLGVBQXBDLEdBQXNELEtBQUttQyxrQkFBTCxDQUNwREQsSUFBSXBDLFdBRGdELEVBRXBEUSxTQUZvRCxFQUdwRDRCLElBQUkvQixRQUhnRCxDQUF0RDtBQUtEO0FBQ0Y7QUFDRixLQTdMMEU7QUE4TDNFaUMsaUJBQWEsU0FBU0EsV0FBVCxDQUFxQkMsR0FBckIsRUFBMEJDLEtBQTFCLEVBQWlDO0FBQUU7QUFDOUMsVUFBTW5DLFdBQVcsRUFBakI7QUFDQSxXQUFLLElBQUlvQyxJQUFJLENBQWIsRUFBZ0JBLElBQUksS0FBSzdDLGNBQUwsQ0FBb0I4QyxNQUF4QyxFQUFnREQsR0FBaEQsRUFBcUQ7QUFDbkQsWUFBSUQsS0FBSixFQUFXO0FBQ1QsY0FBSUQsTUFBTSxLQUFLM0MsY0FBTCxDQUFvQjZDLENBQXBCLENBQVYsRUFBa0M7QUFDaENwQyxxQkFBU3FCLElBQVQsQ0FBYyxLQUFLL0MsWUFBTCxDQUFrQjhELENBQWxCLENBQWQ7QUFDRDtBQUNGLFNBSkQsTUFJTztBQUNMcEMsbUJBQVNxQixJQUFULENBQWVhLE1BQU0sS0FBSzNDLGNBQUwsQ0FBb0I2QyxDQUFwQixDQUFQLEdBQWlDLENBQWpDLEdBQXFDLENBQW5EO0FBQ0Q7QUFDRjs7QUFFRCxhQUFPcEMsUUFBUDtBQUNELEtBM00wRTtBQTRNM0VzQyxZQUFRLFNBQVNBLE1BQVQsQ0FBZ0JDLEtBQWhCLEVBQXVCO0FBQzdCLFVBQUlDLFVBQVUsQ0FBZDtBQUNBLFVBQUlDLFVBQVVGLE1BQU1HLFNBQU4sQ0FBZ0JDLE1BQWhCLEVBQWQ7QUFDQSxVQUFJQyxXQUFXTCxNQUFNRyxTQUFOLENBQWdCRyxRQUFoQixLQUE2QixDQUE1QztBQUNBLFVBQU1DLFVBQVVQLE1BQU0xQyxlQUFOLEdBQXdCLE1BQXhDO0FBQ0EsVUFBTWtELFlBQVlSLE1BQU0xQyxlQUFOLEdBQXdCLE9BQXhCLEdBQWtDaUQsT0FBcEQ7O0FBRUEsVUFBSVAsVUFBVUEsTUFBTTVDLFdBQU4sS0FBc0IsQ0FBdEIsSUFBMkI0QyxNQUFNNUMsV0FBTixLQUFzQixDQUEzRCxDQUFKLEVBQW1FO0FBQ2pFNkMsa0JBQVU1QixTQUFTLENBQUNrQyxVQUFVLEtBQVgsRUFBa0JqQyxRQUFsQixFQUFULEVBQXVDLEVBQXZDLElBQTZDLENBQXZEO0FBQ0E0QixrQkFBVTdCLFNBQVMsQ0FBQ21DLFlBQVksTUFBYixFQUFxQmxDLFFBQXJCLEVBQVQsRUFBMEMsRUFBMUMsSUFBZ0QsQ0FBMUQ7QUFDQStCLG1CQUFXaEMsU0FBUyxDQUFDLENBQUMyQixNQUFNMUMsZUFBTixHQUF3QmtELFNBQXhCLEdBQW9DRCxPQUFyQyxJQUFnRCxPQUFqRCxFQUEwRGpDLFFBQTFELEVBQVQsRUFBK0UsRUFBL0UsQ0FBWDtBQUNEOztBQUVELGFBQU87QUFDTG1DLGNBQU1SLE9BREQ7QUFFTEMsd0JBRks7QUFHTFEsZUFBT0w7QUFIRixPQUFQO0FBS0QsS0E5TjBFO0FBK04zRVosd0JBQW9CLFNBQVNBLGtCQUFULENBQTRCTCxXQUE1QixFQUF5Q3hCLFNBQXpDLEVBQW9ESCxRQUFwRCxFQUE4RGtELEtBQTlELEVBQXFFO0FBQ3ZGLFVBQUlDLE9BQU8sQ0FBWDtBQUNBLFVBQUk5RCxXQUFXNkQsU0FBUyxLQUFLN0QsUUFBN0I7QUFDQSxVQUFJK0QsZ0JBQUo7QUFDQSxVQUFJWixnQkFBSjtBQUNBLFVBQUlJLGlCQUFKOztBQUVBLFVBQUksQ0FBQ3pDLFNBQUwsRUFBZ0I7QUFDZCxlQUFPLElBQVA7QUFDRDs7QUFFRCxjQUFRd0IsV0FBUjtBQUNFLGFBQUssQ0FBTDtBQUNFO0FBQ0E7QUFDRixhQUFLLENBQUw7QUFDRTtBQUNBO0FBQ0E7QUFDRixhQUFLLENBQUw7QUFDRTtBQUNBLGVBQUssSUFBSVMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJcEMsU0FBU3FDLE1BQTdCLEVBQXFDRCxHQUFyQyxFQUEwQztBQUN4Q2Usb0JBQVNuRCxTQUFTb0MsQ0FBVCxJQUFjLEtBQUs3QyxjQUFMLENBQW9CNkMsQ0FBcEIsQ0FBZCxHQUF1QyxDQUFoRDtBQUNEO0FBQ0QsY0FBSWUsU0FBUyxDQUFiLEVBQWdCO0FBQ2RBLG9CQUFRLEtBQUs1RCxjQUFMLENBQW9CWSxVQUFVd0MsTUFBVixFQUFwQixDQUFSO0FBQ0Q7O0FBRUQ7QUFDRixhQUFLLENBQUw7QUFDRTtBQUNBUSxpQkFBTyxPQUFQO0FBQ0E7QUFDRixhQUFLLENBQUw7QUFDRTtBQUNBQSxpQkFBTyxPQUFQO0FBQ0E7QUFDRixhQUFLLENBQUw7QUFDRTtBQUNBQyxvQkFBVWpELFVBQVV3QyxNQUFWLEtBQXFCLENBQS9CO0FBQ0FILG9CQUFVNUIsU0FBUyxDQUFDLENBQUNULFVBQVVPLE9BQVYsS0FBc0IsQ0FBdkIsSUFBNEIsQ0FBN0IsRUFBZ0NHLFFBQWhDLEVBQVQsRUFBcUQsRUFBckQsSUFBMkQsQ0FBckU7QUFDQXNDLGlCQUFTQyxVQUFVLE1BQVgsR0FBc0IsQ0FBQ1osVUFBVSxDQUFYLElBQWdCLEtBQTlDO0FBQ0E7QUFDRixhQUFLLENBQUw7QUFDRTtBQUNBVyxpQkFBTyxPQUFQO0FBQ0E7QUFDRixhQUFLLENBQUw7QUFDRTtBQUNBQSxpQkFBTyxRQUFQO0FBQ0E7QUFDRixhQUFLLENBQUw7QUFDRTtBQUNBQSxpQkFBTyxRQUFQO0FBQ0FDLG9CQUFVakQsVUFBVXdDLE1BQVYsS0FBcUIsQ0FBL0I7QUFDQUMscUJBQVd6QyxVQUFVMEMsUUFBVixLQUF1QixDQUFsQztBQUNBTCxvQkFBVTVCLFNBQVMsQ0FBQyxDQUFDVCxVQUFVTyxPQUFWLEtBQXNCLENBQXZCLElBQTRCLENBQTdCLEVBQWdDRyxRQUFoQyxFQUFULEVBQXFELEVBQXJELElBQTJELENBQXJFO0FBQ0FzQyxpQkFBU1AsV0FBVyxPQUFaLEdBQXdCUSxVQUFVLE1BQWxDLEdBQTZDLENBQUNaLFVBQVUsQ0FBWCxJQUFnQixLQUFyRTtBQUNBO0FBQ0YsYUFBSyxDQUFMO0FBQ0U7QUFDQVcsaUJBQU8sUUFBUDtBQUNBO0FBQ0Y7QUFDRTtBQUNBOUQscUJBQVcsQ0FBWDtBQXRESjs7QUF5REEsYUFBTzhELE9BQU85RCxRQUFkLENBcEV1RixDQW9FL0Q7QUFDekIsS0FwUzBFO0FBcVMzRWdFLHVCQUFtQixTQUFTQSxpQkFBVCxDQUEyQmQsS0FBM0IsRUFBa0M7QUFDbkQsVUFBSWUsaUJBQWlCLEVBQXJCO0FBQ0EsVUFBTUMsa0JBQWtCM0MsU0FBUzJCLE1BQU0xQyxlQUFmLEVBQWdDLEVBQWhDLENBQXhCO0FBQ0EsVUFBTVIsV0FBV2tFLGtCQUFrQixLQUFuQztBQUNBLFVBQU1DLG9CQUFvQi9DLE9BQU84QixNQUFNRyxTQUFiLENBQTFCO0FBQ0EsVUFBTXBDLGNBQWNrRCxrQkFBa0JDLE1BQWxCLEVBQXBCO0FBQ0EsVUFBTTFFLE1BQU11QixZQUFZSSxPQUFaLEVBQVo7QUFDQSxVQUFNK0IsVUFBVWUsa0JBQWtCekMsTUFBbEIsQ0FBeUIsS0FBS3BFLGlCQUE5QixDQUFoQjtBQUNBLFVBQU1xRCxXQUFXLEtBQUtpQyxXQUFMLENBQWlCc0IsZUFBakIsRUFBa0MsSUFBbEMsQ0FBakI7QUFDQSxVQUFNTixRQUFRTyxrQkFBa0J4QyxVQUFsQixHQUErQjBDLE1BQS9CLENBQXNDRixpQkFBdEMsQ0FBZDs7QUFFQSxVQUFJRyxnQkFBZ0JILGtCQUFrQnpDLE1BQWxCLENBQXlCLEtBQUtqRSxjQUE5QixDQUFwQjs7QUFFQSxVQUFJOEcsT0FBT0EsSUFBSUMsYUFBSixFQUFYLEVBQWdDO0FBQzlCRix3QkFBZ0JILGtCQUFrQnpDLE1BQWxCLENBQXlCLEtBQUtoRSxnQkFBOUIsQ0FBaEI7QUFDRDs7QUFFRDtBQUNBLFdBQUssSUFBTStHLEdBQVgsSUFBa0I5RCxRQUFsQixFQUE0QjtBQUMxQixZQUFJQSxTQUFTOEQsR0FBVCxLQUFpQmxELFNBQVNrRCxHQUFULEVBQWMsRUFBZCxJQUFvQjlELFNBQVNxQyxNQUFULEdBQWtCLENBQTNELEVBQThEO0FBQzVEckMsbUJBQVM4RCxHQUFULElBQWdCLGlCQUFPdEMsVUFBUCxDQUFrQixLQUFLbkQsWUFBdkIsRUFBcUMsQ0FBQzJCLFNBQVM4RCxHQUFULENBQUQsQ0FBckMsQ0FBaEI7QUFDRDtBQUNEUiwwQkFBa0J0RCxTQUFTOEQsR0FBVCxDQUFsQjtBQUNEOztBQUVELGFBQU8sQ0FDTHpFLFFBREssRUFFTHNFLGFBRkssRUFHTEgsa0JBQWtCekMsTUFBbEIsQ0FBeUIsS0FBS2xFLGNBQTlCLENBSEssRUFJTCxLQUFLa0gsV0FBTCxDQUFpQnpELFdBQWpCLEVBQThCaUMsS0FBOUIsRUFBcUN4QixNQUFyQyxDQUE0QyxLQUFLbkUsaUJBQWpELENBSkssRUFLTDBHLGNBTEssRUFNTEwsS0FOSyxFQU9MLGlCQUFPekIsVUFBUCxDQUFrQixLQUFLMUMsT0FBTCxDQUFhOEIsU0FBVSxDQUFDN0IsTUFBTSxDQUFQLElBQVksQ0FBdEIsRUFBMEIsRUFBMUIsSUFBZ0MsQ0FBN0MsQ0FBbEIsRUFBbUUsQ0FBQzBELE9BQUQsQ0FBbkUsQ0FQSyxFQVFMMUQsR0FSSyxDQUFQO0FBVUQsS0F4VTBFO0FBeVUzRWlGLHNCQUFrQixTQUFTQSxnQkFBVCxDQUEwQnpCLEtBQTFCLEVBQWlDekIsV0FBakMsRUFBOEM7QUFDOUQsVUFBTW1ELEtBQUtyRCxTQUFTMkIsTUFBTTVDLFdBQWYsRUFBNEIsRUFBNUIsQ0FBWDtBQUNBLGNBQVFzRSxFQUFSO0FBQ0UsYUFBSyxDQUFDLENBQU47QUFDRTtBQUNBLGlCQUFPLEtBQUtqSCxxQkFBWjtBQUNGLGFBQUssQ0FBTDtBQUNFO0FBQ0EsaUJBQVE4RCxZQUFZLENBQVosS0FBa0IsQ0FBbkIsR0FDTCxpQkFBT1UsVUFBUCxDQUFrQixLQUFLdkUsWUFBdkIsRUFBcUM2RCxXQUFyQyxDQURLLEdBRUwsaUJBQU9VLFVBQVAsQ0FBa0IsS0FBS3RFLGlCQUF2QixFQUEwQzRELFdBQTFDLENBRkY7QUFHRixhQUFLLENBQUw7QUFDRTtBQUNBLGlCQUFRQSxZQUFZLENBQVosS0FBa0IsQ0FBbkIsR0FDTCxpQkFBT1UsVUFBUCxDQUFrQixLQUFLckUsMkJBQXZCLEVBQW9EMkQsV0FBcEQsQ0FESyxHQUVMLGlCQUFPVSxVQUFQLENBQWtCLEtBQUtwRSxnQ0FBdkIsRUFBeUQwRCxXQUF6RCxDQUZGO0FBR0YsYUFBSyxDQUFMO0FBQ0U7QUFDQSxpQkFBUUEsWUFBWSxDQUFaLEtBQWtCLENBQW5CLEdBQ0wsaUJBQU9VLFVBQVAsQ0FBa0IsS0FBS25FLGFBQXZCLEVBQXNDeUQsV0FBdEMsQ0FESyxHQUVMLGlCQUFPVSxVQUFQLENBQWtCLEtBQUtsRSxrQkFBdkIsRUFBMkN3RCxXQUEzQyxDQUZGO0FBR0YsYUFBSyxDQUFMO0FBQ0U7QUFDQSxpQkFBUUEsWUFBWSxDQUFaLEtBQWtCLENBQW5CLEdBQ0wsaUJBQU9VLFVBQVAsQ0FBa0IsS0FBS2pFLDRCQUF2QixFQUFxRHVELFdBQXJELENBREssR0FFTCxpQkFBT1UsVUFBUCxDQUFrQixLQUFLaEUsaUNBQXZCLEVBQTBEc0QsV0FBMUQsQ0FGRjtBQUdGLGFBQUssQ0FBTDtBQUNFO0FBQ0EsaUJBQVFBLFlBQVksQ0FBWixLQUFrQixDQUFuQixHQUNMLGlCQUFPVSxVQUFQLENBQWtCLEtBQUs3RCxjQUF2QixFQUF1Q21ELFdBQXZDLENBREssR0FFTCxpQkFBT1UsVUFBUCxDQUFrQixLQUFLNUQsbUJBQXZCLEVBQTRDa0QsV0FBNUMsQ0FGRjtBQUdGLGFBQUssQ0FBTDtBQUNFO0FBQ0EsaUJBQVFBLFlBQVksQ0FBWixLQUFrQixDQUFuQixHQUNMLGlCQUFPVSxVQUFQLENBQWtCLEtBQUsvRCxpQkFBdkIsRUFBMENxRCxXQUExQyxDQURLLEdBRUwsaUJBQU9VLFVBQVAsQ0FBa0IsS0FBSzlELHNCQUF2QixFQUErQ29ELFdBQS9DLENBRkY7QUFHRixhQUFLLENBQUw7QUFDRTtBQUNBLGlCQUFRQSxZQUFZLENBQVosS0FBa0IsQ0FBbkIsR0FDTCxpQkFBT1UsVUFBUCxDQUFrQixLQUFLM0QsNkJBQXZCLEVBQXNEaUQsV0FBdEQsQ0FESyxHQUVMLGlCQUFPVSxVQUFQLENBQWtCLEtBQUsxRCxrQ0FBdkIsRUFBMkRnRCxXQUEzRCxDQUZGO0FBR0YsYUFBSyxDQUFMO0FBQ0U7QUFDQSxpQkFBUUEsWUFBWSxDQUFaLEtBQWtCLENBQW5CLEdBQ0wsaUJBQU9VLFVBQVAsQ0FBa0IsS0FBS3pELGFBQXZCLEVBQXNDK0MsV0FBdEMsQ0FESyxHQUVMLGlCQUFPVSxVQUFQLENBQWtCLEtBQUt4RCxrQkFBdkIsRUFBMkM4QyxXQUEzQyxDQUZGO0FBR0YsYUFBSyxDQUFMO0FBQ0E7QUFDRSxpQkFBUUEsWUFBWSxDQUFaLEtBQWtCLENBQW5CLEdBQ0wsaUJBQU9VLFVBQVAsQ0FBa0IsS0FBS3ZELGdCQUF2QixFQUF5QzZDLFdBQXpDLENBREssR0FFTCxpQkFBT1UsVUFBUCxDQUFrQixLQUFLdEQscUJBQXZCLEVBQThDNEMsV0FBOUMsQ0FGRjtBQUdGLGFBQUssQ0FBTDtBQUNBO0FBQ0UsaUJBQVFBLFlBQVksQ0FBWixLQUFrQixDQUFuQixHQUNMLGlCQUFPVSxVQUFQLENBQWtCLEtBQUtyRCw0QkFBdkIsRUFBcUQyQyxXQUFyRCxDQURLLEdBRUwsaUJBQU9VLFVBQVAsQ0FBa0IsS0FBS3BELGlDQUF2QixFQUEwRDBDLFdBQTFELENBRkY7QUFHRjtBQUNFLGlCQUFPLEVBQVA7QUF2REo7QUF5REQsS0FwWTBFO0FBcVkzRUQsY0FBVSxTQUFTQSxRQUFULENBQWtCMEIsS0FBbEIsRUFBeUI7QUFDakMsVUFBSUEsTUFBTXhDLGVBQU4sS0FBMEIsV0FBMUIsSUFBeUMsQ0FBQ3dDLE1BQU1HLFNBQXBELEVBQStEO0FBQzdELFlBQUlILE1BQU14QyxlQUFOLEtBQTBCLGdCQUExQixJQUE4Q3dDLE1BQU1HLFNBQXhELEVBQW1FO0FBQ2pFLGlCQUFPLEtBQUsxRixxQkFBWjtBQUNEO0FBQ0QsZUFBTyxFQUFQO0FBQ0Q7QUFDRCxVQUFNOEQsY0FBYyxLQUFLdUMsaUJBQUwsQ0FBdUJkLEtBQXZCLENBQXBCO0FBQ0EsYUFBTyxLQUFLeUIsZ0JBQUwsQ0FBc0J6QixLQUF0QixFQUE2QnpCLFdBQTdCLENBQVA7QUFDRCxLQTlZMEU7QUErWTNFaUQsaUJBQWEsU0FBU0EsV0FBVCxDQUFxQkcsSUFBckIsRUFBMkIzQixLQUEzQixFQUFrQztBQUM3QyxVQUFNbEQsV0FBV2tELE1BQU0xQyxlQUFOLEdBQXdCLEtBQXpDO0FBQ0EsVUFBSXVELGdCQUFKO0FBQ0EsVUFBSVosZ0JBQUo7QUFDQSxVQUFJMkIsV0FBVzFELE9BQU8yRCxRQUFQLENBQWdCRixJQUFoQixJQUF3QkEsS0FBS0csS0FBTCxFQUF4QixHQUNiLElBQUk5RCxJQUFKLENBQVMyRCxLQUFLSSxXQUFMLEVBQVQsRUFBNkJKLEtBQUtyQixRQUFMLEVBQTdCLEVBQThDcUIsS0FBS3hELE9BQUwsRUFBOUMsRUFBOER3RCxLQUFLSyxRQUFMLEVBQTlELEVBQStFTCxLQUFLTSxVQUFMLEVBQS9FLEVBQWtHTixLQUFLTyxVQUFMLEVBQWxHLENBREY7O0FBR0FOLGlCQUFXMUQsT0FBTzBELFFBQVAsQ0FBWDtBQUNBLGNBQVF2RCxTQUFTMkIsTUFBTTVDLFdBQWYsRUFBNEIsRUFBNUIsQ0FBUjtBQUNFLGFBQUssQ0FBTDtBQUNFd0UsbUJBQVNPLEdBQVQsQ0FBY3JGLFlBQVlrRCxNQUFNekMsZUFBTixHQUF3QixDQUFwQyxDQUFkLEVBQXVELE1BQXZEO0FBQ0E7QUFDRixhQUFLLENBQUw7QUFDRXFFLG1CQUFTTyxHQUFULENBQWNyRixZQUFZa0QsTUFBTXpDLGVBQU4sR0FBd0IsQ0FBcEMsQ0FBZCxFQUF1RCxPQUF2RDtBQUNBO0FBQ0YsYUFBSyxDQUFMO0FBQ0VxRSxtQkFBU08sR0FBVCxDQUFjckYsWUFBWWtELE1BQU16QyxlQUFOLEdBQXdCLENBQXBDLENBQWQsRUFBdUQsUUFBdkQ7QUFDQTtBQUNGLGFBQUssQ0FBTDtBQUNFc0Qsb0JBQVVlLFNBQVNwRixHQUFULEVBQVY7QUFDQXlELG9CQUFVNUIsU0FBUyxDQUFDdUQsU0FBU0QsSUFBVCxLQUFrQixDQUFuQixFQUFzQnJELFFBQXRCLEVBQVQsRUFBMkMsRUFBM0MsSUFBaUQsQ0FBM0Q7QUFDQXNELG1CQUFTTyxHQUFULENBQWNyRixZQUFZa0QsTUFBTXpDLGVBQU4sR0FBd0IsQ0FBcEMsQ0FBZCxFQUF1RCxRQUF2RDtBQUNBcUUscUJBQVcsS0FBS1Esb0JBQUwsQ0FBMEJSLFNBQVNWLE1BQVQsRUFBMUIsRUFBNkNMLE9BQTdDLEVBQXNEWixPQUF0RCxDQUFYO0FBQ0E7QUFDRixhQUFLLENBQUw7QUFDRTJCLG1CQUFTTyxHQUFULENBQWNyRixZQUFZa0QsTUFBTXpDLGVBQU4sR0FBd0IsQ0FBcEMsQ0FBZCxFQUF1RCxPQUF2RDtBQUNBO0FBQ0YsYUFBSyxDQUFMO0FBQ0VzRCxvQkFBVWUsU0FBU3BGLEdBQVQsRUFBVjtBQUNBeUQsb0JBQVU1QixTQUFTLENBQUN1RCxTQUFTRCxJQUFULEtBQWtCLENBQW5CLEVBQXNCckQsUUFBdEIsRUFBVCxFQUEyQyxFQUEzQyxJQUFpRCxDQUEzRDtBQUNBc0QsbUJBQVNPLEdBQVQsQ0FBY3JGLFlBQVlrRCxNQUFNekMsZUFBTixHQUF3QixDQUFwQyxDQUFkLEVBQXVELE9BQXZEO0FBQ0FxRSxxQkFBVyxLQUFLUSxvQkFBTCxDQUEwQlIsU0FBU1YsTUFBVCxFQUExQixFQUE2Q0wsT0FBN0MsRUFBc0RaLE9BQXRELENBQVg7QUFDQTtBQUNGO0FBQ0U7QUExQko7O0FBNkJBLGFBQU8yQixRQUFQO0FBQ0QsS0FyYjBFO0FBc2IzRVEsMEJBQXNCLFNBQVNBLG9CQUFULENBQThCVCxJQUE5QixFQUFvQ2QsT0FBcEMsRUFBNkNaLE9BQTdDLEVBQXNEO0FBQzFFO0FBQ0EsVUFBSTJCLFdBQVcsSUFBSTVELElBQUosQ0FBUzJELEtBQUtJLFdBQUwsRUFBVCxFQUE2QkosS0FBS3JCLFFBQUwsRUFBN0IsRUFBOENxQixLQUFLeEQsT0FBTCxFQUE5QyxDQUFmO0FBQ0F5RCxpQkFBVzFELE9BQU8wRCxRQUFQLENBQVg7O0FBRUEsVUFBSTNCLFlBQVksQ0FBaEIsRUFBbUI7QUFDakI7QUFDQTJCLGlCQUFTUyxLQUFULENBQWUsT0FBZjtBQUNBLGFBQUssSUFBSXhDLElBQUksQ0FBYixFQUFnQkEsSUFBSSxDQUFwQixFQUF1QkEsR0FBdkIsRUFBNEI7QUFDMUIsY0FBSStCLFNBQVNwRixHQUFULE9BQW1CcUUsT0FBdkIsRUFBZ0M7QUFDOUI7QUFDRDtBQUNEZSxtQkFBU1UsUUFBVCxDQUFrQixDQUFsQixFQUFxQixNQUFyQjtBQUNEO0FBQ0YsT0FURCxNQVNPO0FBQ0w7QUFDQVYsaUJBQVNXLE9BQVQsQ0FBaUIsT0FBakI7QUFDQTtBQUNBLGFBQUssSUFBSTFDLEtBQUksQ0FBYixFQUFnQkEsS0FBSSxDQUFwQixFQUF1QkEsSUFBdkIsRUFBNEI7QUFDMUIsY0FBSStCLFNBQVNwRixHQUFULE9BQW1CcUUsT0FBdkIsRUFBZ0M7QUFDOUI7QUFDRDtBQUNEZSxtQkFBU08sR0FBVCxDQUFhLENBQWIsRUFBZ0IsTUFBaEI7QUFDRDtBQUNEO0FBQ0FQLGlCQUFTTyxHQUFULENBQWNsQyxVQUFVLENBQXhCLEVBQTRCLE9BQTVCO0FBQ0Q7QUFDRCxhQUFPMkIsUUFBUDtBQUNELEtBbGQwRTtBQW1kM0VZLHlCQUFxQixTQUFTQSxtQkFBVCxDQUE2QkMsT0FBN0IsRUFBc0M3RSxTQUF0QyxFQUFpRGQsUUFBakQsRUFBMkRzQyxXQUEzRCxFQUF3RTtBQUMzRjtBQUNBLFVBQU1zRCxPQUFPLENBQUNELFVBQVU3RSxTQUFYLEtBQXlCLE9BQU8sRUFBUCxHQUFZLEVBQVosR0FBaUIsRUFBMUMsQ0FBYjtBQUNBLFVBQU0rRSxRQUFRRixRQUFRVixXQUFSLEtBQXdCbkUsVUFBVW1FLFdBQVYsRUFBdEM7QUFDQSxVQUFJYSxlQUFKOztBQUVBLGNBQVF2RSxTQUFTZSxXQUFULEVBQXNCLEVBQXRCLENBQVI7QUFDRSxhQUFLLENBQUw7QUFDQSxhQUFLLENBQUw7QUFDRXdELG1CQUFTRCxLQUFUO0FBQ0E7QUFDRixhQUFLLENBQUw7QUFDQSxhQUFLLENBQUw7QUFDRUMsbUJBQVVILFFBQVFuQyxRQUFSLEtBQXFCMUMsVUFBVTBDLFFBQVYsRUFBdEIsR0FBK0NxQyxRQUFRLEVBQWhFO0FBQ0E7QUFDRixhQUFLLENBQUw7QUFDRUMsbUJBQVNGLE9BQU8sQ0FBaEI7QUFDQTtBQUNGLGFBQUssQ0FBTDtBQUNFRSxtQkFBU0YsSUFBVDtBQUNBO0FBQ0Y7QUFDRTtBQWhCSjs7QUFtQkEsYUFBT0csS0FBS0MsS0FBTCxDQUFZRixTQUFTOUYsUUFBVixHQUFzQixDQUFqQyxDQUFQO0FBQ0Q7QUE3ZTBFLEdBQTdELENBQWhCOztvQkFnZmVwRCxPIiwiZmlsZSI6IlJlY3VycmVuY2UuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgc3RyaW5nIGZyb20gJ2Rvam8vc3RyaW5nJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3JlY3VycmVuY2UnKTtcclxuY29uc3QgZHRGb3JtYXRSZXNvdXJjZSA9IGdldFJlc291cmNlKCdyZWN1cnJlbmNlRGF0ZVRpbWVGb3JtYXQnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlJlY3VycmVuY2VcclxuICogQHNpbmdsZXRvblxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGxhbmcuc2V0T2JqZWN0KCdjcm0uUmVjdXJyZW5jZScsIC8qKiBAbGVuZHMgY3JtLlJlY3VycmVuY2UgKi97XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgbmV2ZXJUZXh0OiByZXNvdXJjZS5uZXZlclRleHQsXHJcbiAgZGFpbHlUZXh0OiByZXNvdXJjZS5kYWlseVRleHQsXHJcbiAgd2Vla2x5VGV4dDogcmVzb3VyY2Uud2Vla2x5VGV4dCxcclxuICBtb250aGx5VGV4dDogcmVzb3VyY2UubW9udGhseVRleHQsXHJcbiAgeWVhcmx5VGV4dDogcmVzb3VyY2UueWVhcmx5VGV4dCxcclxuICBkYXlGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLmRheUZvcm1hdFRleHQsXHJcbiAgbW9udGhGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLm1vbnRoRm9ybWF0VGV4dCxcclxuICBtb250aEFuZERheUZvcm1hdFRleHQ6IGR0Rm9ybWF0UmVzb3VyY2UubW9udGhBbmREYXlGb3JtYXRUZXh0LFxyXG4gIHdlZWtkYXlGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLndlZWtkYXlGb3JtYXRUZXh0LFxyXG4gIGVuZERhdGVGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLmVuZERhdGVGb3JtYXRUZXh0LFxyXG4gIGRhdGVGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLmVuZERhdGVGb3JtYXRUZXh0LFxyXG4gIHRpbWVGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLnRpbWVGb3JtYXRUZXh0LFxyXG4gIHRpbWVGb3JtYXRUZXh0MjQ6IGR0Rm9ybWF0UmVzb3VyY2UudGltZUZvcm1hdFRleHQyNCxcclxuICBzaW5nbGVBY3Rpdml0eVN1bW1hcnk6IHJlc291cmNlLnNpbmdsZUFjdGl2aXR5U3VtbWFyeSxcclxuICBkYWlseVN1bW1hcnk6IHJlc291cmNlLmRhaWx5U3VtbWFyeSxcclxuICBkYWlseUV2ZXJ5U3VtbWFyeTogcmVzb3VyY2UuZGFpbHlFdmVyeVN1bW1hcnksXHJcbiAgZGFpbHlBZnRlckNvbXBsZXRpb25TdW1tYXJ5OiByZXNvdXJjZS5kYWlseUFmdGVyQ29tcGxldGlvblN1bW1hcnksXHJcbiAgZGFpbHlFdmVyeUFmdGVyQ29tcGxldGlvblN1bW1hcnk6IHJlc291cmNlLmRhaWx5RXZlcnlBZnRlckNvbXBsZXRpb25TdW1tYXJ5LFxyXG4gIHdlZWtseVN1bW1hcnk6IHJlc291cmNlLndlZWtseVN1bW1hcnksXHJcbiAgd2Vla2x5RXZlcnlTdW1tYXJ5OiByZXNvdXJjZS53ZWVrbHlFdmVyeVN1bW1hcnksXHJcbiAgd2Vla2x5QWZ0ZXJDb21wbGV0aW9uU3VtbWFyeTogcmVzb3VyY2Uud2Vla2x5QWZ0ZXJDb21wbGV0aW9uU3VtbWFyeSxcclxuICB3ZWVrbHlFdmVyeUFmdGVyQ29tcGxldGlvblN1bW1hcnk6IHJlc291cmNlLndlZWtseUV2ZXJ5QWZ0ZXJDb21wbGV0aW9uU3VtbWFyeSxcclxuICBtb250aGx5T3JkU3VtbWFyeTogcmVzb3VyY2UubW9udGhseU9yZFN1bW1hcnksXHJcbiAgbW9udGhseUV2ZXJ5T3JkU3VtbWFyeTogcmVzb3VyY2UubW9udGhseUV2ZXJ5T3JkU3VtbWFyeSxcclxuICBtb250aGx5U3VtbWFyeTogcmVzb3VyY2UubW9udGhseVN1bW1hcnksXHJcbiAgbW9udGhseUV2ZXJ5U3VtbWFyeTogcmVzb3VyY2UubW9udGhseUV2ZXJ5U3VtbWFyeSxcclxuICBtb250aGx5QWZ0ZXJDb21wbGV0aW9uU3VtbWFyeTogcmVzb3VyY2UubW9udGhseUFmdGVyQ29tcGxldGlvblN1bW1hcnksXHJcbiAgbW9udGhseUV2ZXJ5QWZ0ZXJDb21wbGV0aW9uU3VtbWFyeTogcmVzb3VyY2UubW9udGhseUV2ZXJ5QWZ0ZXJDb21wbGV0aW9uU3VtbWFyeSxcclxuICB5ZWFybHlTdW1tYXJ5OiByZXNvdXJjZS55ZWFybHlTdW1tYXJ5LFxyXG4gIHllYXJseUV2ZXJ5U3VtbWFyeTogcmVzb3VyY2UueWVhcmx5RXZlcnlTdW1tYXJ5LFxyXG4gIHllYXJseU9yZFN1bW1hcnk6IHJlc291cmNlLnllYXJseU9yZFN1bW1hcnksXHJcbiAgeWVhcmx5RXZlcnlPcmRTdW1tYXJ5OiByZXNvdXJjZS55ZWFybHlFdmVyeU9yZFN1bW1hcnksXHJcbiAgeWVhcmx5QWZ0ZXJDb21wbGV0aW9uU3VtbWFyeTogcmVzb3VyY2UueWVhcmx5QWZ0ZXJDb21wbGV0aW9uU3VtbWFyeSxcclxuICB5ZWFybHlFdmVyeUFmdGVyQ29tcGxldGlvblN1bW1hcnk6IHJlc291cmNlLnllYXJseUV2ZXJ5QWZ0ZXJDb21wbGV0aW9uU3VtbWFyeSxcclxuICBkYXlTZXBhcmF0b3I6IHJlc291cmNlLmRheVNlcGFyYXRvcixcclxuICB3ZWVrRGF5c1RleHQ6IFtcclxuICAgIHJlc291cmNlLnN1bmRheSxcclxuICAgIHJlc291cmNlLm1vbmRheSxcclxuICAgIHJlc291cmNlLnR1ZXNkYXksXHJcbiAgICByZXNvdXJjZS53ZWRuZXNkYXksXHJcbiAgICByZXNvdXJjZS50aHVyc2RheSxcclxuICAgIHJlc291cmNlLmZyaWRheSxcclxuICAgIHJlc291cmNlLnNhdHVyZGF5LFxyXG4gIF0sXHJcbiAgb3JkVGV4dDogW1xyXG4gICAgcmVzb3VyY2UuZGF5LFxyXG4gICAgcmVzb3VyY2UuZmlyc3QsXHJcbiAgICByZXNvdXJjZS5zZWNvbmQsXHJcbiAgICByZXNvdXJjZS50aGlyZCxcclxuICAgIHJlc291cmNlLmZvdXJ0aCxcclxuICAgIHJlc291cmNlLmxhc3QsXHJcbiAgXSxcclxuXHJcbiAgaW50ZXJ2YWw6IDEsIC8vIHJlcGVhdCBldmVyeSBpbnRlcnZhbCBkYXlzL3dlZWtzL21vbnRocy95ZWFyc1xyXG4gIGRlZmF1bHRJdGVyYXRpb25zOiBbIC8vIGJ5IFJlY3VyUGVyaW9kLCAtMSBmb3IgQWZ0ZXIgQ29tcGxldGVkLiBDb25maWd1cmFibGUuXHJcbiAgICA3LCAvLyBkYXlzXHJcbiAgICAtMSxcclxuICAgIDgsIC8vIHdlZWtzXHJcbiAgICAtMSxcclxuICAgIDEyLCAvLyBtb250aHNcclxuICAgIDEyLCAtMSxcclxuICAgIDUsIC8vIHllYXJzXHJcbiAgICA1LCAtMSxcclxuICBdLFxyXG4gIF93ZWVrRGF5VmFsdWVzOiBbXHJcbiAgICAxMzEwNzIsIC8vIHN1blxyXG4gICAgMjYyMTQ0LCAvLyBtb25cclxuICAgIDUyNDI4OCwgLy8gdHVlXHJcbiAgICAxMDQ4NTc2LCAvLyB3ZWRcclxuICAgIDIwOTcxNTIsIC8vIHRodVxyXG4gICAgNDE5NDMwNCwgLy8gZnJpXHJcbiAgICA4Mzg4NjA4LCAvLyBzYXRcclxuICBdLFxyXG4gIHNpbXBsaWZpZWRPcHRpb25zOiBbe1xyXG4gICAgbGFiZWw6ICduZXZlclRleHQnLFxyXG4gICAgUmVjdXJyaW5nOiBmYWxzZSxcclxuICAgIFJlY3VyUGVyaW9kOiAtMSwgLy8gbm90IHJlY3VycmluZ1xyXG4gICAgYmFzZVBlcmlvZFNwZWM6IDAsXHJcbiAgICBSZWN1clBlcmlvZFNwZWM6IDAsXHJcbiAgICBSZWN1ckl0ZXJhdGlvbnM6IDAsXHJcbiAgICBSZWN1cnJlbmNlU3RhdGU6ICdyc05vdFJlY3VycmluZycsXHJcbiAgfSwge1xyXG4gICAgbGFiZWw6ICdkYWlseVRleHQnLFxyXG4gICAgUmVjdXJyaW5nOiB0cnVlLFxyXG4gICAgUmVjdXJQZXJpb2Q6IDAsXHJcbiAgICBiYXNlUGVyaW9kU3BlYzogMCxcclxuICAgIFJlY3VyUGVyaW9kU3BlYzogMCxcclxuICAgIFJlY3VySXRlcmF0aW9uczogNywgLy8gb3ZlcnJpZGUgZnJvbSB0aGlzLmRlZmF1bHRJdGVyYXRpb25zXHJcbiAgICBSZWN1cnJlbmNlU3RhdGU6ICdyc3RNYXN0ZXInLFxyXG4gIH0sIHtcclxuICAgIGxhYmVsOiAnd2Vla2x5VGV4dCcsXHJcbiAgICBSZWN1cnJpbmc6IHRydWUsXHJcbiAgICBSZWN1clBlcmlvZDogMixcclxuICAgIGJhc2VQZXJpb2RTcGVjOiAwLFxyXG4gICAgd2Vla2RheXM6IFswLCAwLCAwLCAwLCAwLCAwLCAwXSwgLy8gbm9uZSBzZWxlY3RlZCBieSBkZWZhdWx0XHJcbiAgICBSZWN1clBlcmlvZFNwZWM6IDAsXHJcbiAgICBSZWN1ckl0ZXJhdGlvbnM6IDgsXHJcbiAgICBSZWN1cnJlbmNlU3RhdGU6ICdyc3RNYXN0ZXInLFxyXG4gICAgY2FsYzogdHJ1ZSxcclxuICB9LCB7XHJcbiAgICBsYWJlbDogJ21vbnRobHlUZXh0JyxcclxuICAgIFJlY3VycmluZzogdHJ1ZSxcclxuICAgIFJlY3VyUGVyaW9kOiA0LFxyXG4gICAgYmFzZVBlcmlvZFNwZWM6IDEwNDg1NzYsXHJcbiAgICBSZWN1clBlcmlvZFNwZWM6IDAsXHJcbiAgICBSZWN1ckl0ZXJhdGlvbnM6IDEyLFxyXG4gICAgUmVjdXJyZW5jZVN0YXRlOiAncnN0TWFzdGVyJyxcclxuICB9LCB7XHJcbiAgICBsYWJlbDogJ3llYXJseVRleHQnLFxyXG4gICAgUmVjdXJyaW5nOiB0cnVlLFxyXG4gICAgUmVjdXJQZXJpb2Q6IDcsXHJcbiAgICBiYXNlUGVyaW9kU3BlYzogMzg3OTczMTIsXHJcbiAgICBSZWN1clBlcmlvZFNwZWM6IDAsXHJcbiAgICBSZWN1ckl0ZXJhdGlvbnM6IDUsXHJcbiAgICBSZWN1cnJlbmNlU3RhdGU6ICdyc3RNYXN0ZXInLFxyXG4gIH1dLFxyXG5cclxuICBjcmVhdGVTaW1wbGlmaWVkT3B0aW9uczogZnVuY3Rpb24gY3JlYXRlU2ltcGxpZmllZE9wdGlvbnMoc3RhcnREYXRlKSB7XHJcbiAgICB0aGlzLnJlY2FsY3VsYXRlU2ltcGxpZmllZFBlcmlvZFNwZWMoc3RhcnREYXRlKTtcclxuXHJcbiAgICBjb25zdCBsaXN0ID0gW107XHJcbiAgICBjb25zdCBjdXJyZW50RGF0ZSA9IHN0YXJ0RGF0ZSB8fCBuZXcgRGF0ZSgpO1xyXG4gICAgY29uc3Qgd3JhcHBlZCA9IG1vbWVudChjdXJyZW50RGF0ZSk7XHJcbiAgICBjb25zdCBkYXkgPSBjdXJyZW50RGF0ZS5nZXREYXRlKCk7XHJcbiAgICBjb25zdCBvcmQgPSB0aGlzLm9yZFRleHRbcGFyc2VJbnQoKChkYXkgLSAxKSAvIDcpLnRvU3RyaW5nKCksIDEwKSArIDFdO1xyXG4gICAgY29uc3QgdGV4dE9wdGlvbnMgPSBbXHJcbiAgICAgIG51bGwsIC8vIHNjYWxlLCByZXBsYWNlZCBpbiBsb29wXHJcbiAgICAgIGRheSxcclxuICAgICAgd3JhcHBlZC5mb3JtYXQodGhpcy5kYXlGb3JtYXRUZXh0KSxcclxuICAgICAgd3JhcHBlZC5sb2NhbGVEYXRhKCkud2Vla2RheXMod3JhcHBlZCksXHJcbiAgICAgIHdyYXBwZWQubG9jYWxlRGF0YSgpLm1vbnRoc1Nob3J0KHdyYXBwZWQpLFxyXG4gICAgICBvcmQsXHJcbiAgICBdO1xyXG5cclxuICAgIGZvciAoY29uc3QgcmVjdXJPcHRpb24gaW4gdGhpcy5zaW1wbGlmaWVkT3B0aW9ucykge1xyXG4gICAgICBpZiAodGhpcy5zaW1wbGlmaWVkT3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShyZWN1ck9wdGlvbikpIHtcclxuICAgICAgICB0ZXh0T3B0aW9uc1swXSA9IHRoaXMuZ2V0UGFuZWwodGhpcy5zaW1wbGlmaWVkT3B0aW9uc1tyZWN1ck9wdGlvbl0uUmVjdXJQZXJpb2QpO1xyXG4gICAgICAgIHRoaXMuc2ltcGxpZmllZE9wdGlvbnNbcmVjdXJPcHRpb25dLlJlY3VySXRlcmF0aW9ucyA9IHRoaXMuZGVmYXVsdEl0ZXJhdGlvbnNbdGhpcy5zaW1wbGlmaWVkT3B0aW9uc1tyZWN1ck9wdGlvbl0uUmVjdXJQZXJpb2RdIHx8IDA7XHJcblxyXG4gICAgICAgIGlmICh0aGlzW3RoaXMuc2ltcGxpZmllZE9wdGlvbnNbcmVjdXJPcHRpb25dLmxhYmVsXSkge1xyXG4gICAgICAgICAgbGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgJGtleTogcmVjdXJPcHRpb24sIC8vIHRoaXMuc2ltcGxpZmllZE9wdGlvbnNbcmVjdXJPcHRpb25dLlJlY3VyUGVyaW9kLFxyXG4gICAgICAgICAgICAkZGVzY3JpcHRvcjogc3RyaW5nLnN1YnN0aXR1dGUodGhpc1t0aGlzLnNpbXBsaWZpZWRPcHRpb25zW3JlY3VyT3B0aW9uXS5sYWJlbF0sIHRleHRPcHRpb25zKSxcclxuICAgICAgICAgICAgcmVjdXJyZW5jZTogdGhpcy5zaW1wbGlmaWVkT3B0aW9uc1tyZWN1ck9wdGlvbl0sXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAkcmVzb3VyY2VzOiBsaXN0LFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGdldFBhbmVsOiBmdW5jdGlvbiBnZXRQYW5lbChyZWN1clBlcmlvZCkge1xyXG4gICAgc3dpdGNoIChyZWN1clBlcmlvZCkge1xyXG4gICAgICBjYXNlIDA6XHJcbiAgICAgIGNhc2UgMTpcclxuICAgICAgICByZXR1cm4gdGhpcy5kYWlseVRleHQ7XHJcbiAgICAgIGNhc2UgMjpcclxuICAgICAgY2FzZSAzOlxyXG4gICAgICAgIHJldHVybiB0aGlzLndlZWtseVRleHQ7XHJcbiAgICAgIGNhc2UgNDpcclxuICAgICAgY2FzZSA1OlxyXG4gICAgICBjYXNlIDY6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9udGhseVRleHQ7XHJcbiAgICAgIGNhc2UgNzpcclxuICAgICAgY2FzZSA4OlxyXG4gICAgICBjYXNlIDk6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueWVhcmx5VGV4dDtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gdGhpcy5uZXZlclRleHQ7XHJcbiAgICB9XHJcbiAgfSxcclxuICBpc0FmdGVyQ29tcGxldGlvbjogZnVuY3Rpb24gaXNBZnRlckNvbXBsZXRpb24ocGFuZWwpIHtcclxuICAgIHJldHVybiAnMTM2OScuaW5kZXhPZihwYW5lbCkgPj0gMDtcclxuICB9LFxyXG4gIHJlY2FsY3VsYXRlU2ltcGxpZmllZFBlcmlvZFNwZWM6IGZ1bmN0aW9uIHJlY2FsY3VsYXRlU2ltcGxpZmllZFBlcmlvZFNwZWMoc3RhcnREYXRlKSB7XHJcbiAgICBmb3IgKGNvbnN0IHJlY3VyT3B0aW9uIGluIHRoaXMuc2ltcGxpZmllZE9wdGlvbnMpIHtcclxuICAgICAgaWYgKHRoaXMuc2ltcGxpZmllZE9wdGlvbnMuaGFzT3duUHJvcGVydHkocmVjdXJPcHRpb24pKSB7XHJcbiAgICAgICAgY29uc3Qgb3B0ID0gdGhpcy5zaW1wbGlmaWVkT3B0aW9uc1tyZWN1ck9wdGlvbl07XHJcbiAgICAgICAgdGhpcy5zaW1wbGlmaWVkT3B0aW9uc1tyZWN1ck9wdGlvbl0uUmVjdXJQZXJpb2RTcGVjID0gdGhpcy5nZXRSZWN1clBlcmlvZFNwZWMoXHJcbiAgICAgICAgICBvcHQuUmVjdXJQZXJpb2QsXHJcbiAgICAgICAgICBzdGFydERhdGUsXHJcbiAgICAgICAgICBvcHQud2Vla2RheXNcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBnZXRXZWVrZGF5czogZnVuY3Rpb24gZ2V0V2Vla2RheXMocnBzLCBuYW1lcykgeyAvLyBwYXNzIGEgUmVjdXJQZXJpb2RTcGVjIChhcyBsb25nIGFzIFJlY3VyUGVyaW9kIGNvcnJlc3BvbmRzIHRvIGEgU3BlYyB3aXRoIHdlZWtkYXlzKVxyXG4gICAgY29uc3Qgd2Vla2RheXMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fd2Vla0RheVZhbHVlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAobmFtZXMpIHtcclxuICAgICAgICBpZiAocnBzICYgdGhpcy5fd2Vla0RheVZhbHVlc1tpXSkge1xyXG4gICAgICAgICAgd2Vla2RheXMucHVzaCh0aGlzLndlZWtEYXlzVGV4dFtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHdlZWtkYXlzLnB1c2goKHJwcyAmIHRoaXMuX3dlZWtEYXlWYWx1ZXNbaV0pID8gMSA6IDApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHdlZWtkYXlzO1xyXG4gIH0sXHJcbiAgZ2V0T3JkOiBmdW5jdGlvbiBnZXRPcmQoZW50cnkpIHtcclxuICAgIGxldCBudGhXZWVrID0gMDtcclxuICAgIGxldCB3ZWVrZGF5ID0gZW50cnkuU3RhcnREYXRlLmdldERheSgpO1xyXG4gICAgbGV0IG1vbnRoTnVtID0gZW50cnkuU3RhcnREYXRlLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgY29uc3Qgb3JkQml0cyA9IGVudHJ5LlJlY3VyUGVyaW9kU3BlYyAlIDUyNDI4ODtcclxuICAgIGNvbnN0IG1vbnRoQml0cyA9IGVudHJ5LlJlY3VyUGVyaW9kU3BlYyAlIDQxOTQzMDQgLSBvcmRCaXRzO1xyXG5cclxuICAgIGlmIChlbnRyeSAmJiAoZW50cnkuUmVjdXJQZXJpb2QgPT09IDUgfHwgZW50cnkuUmVjdXJQZXJpb2QgPT09IDgpKSB7XHJcbiAgICAgIG50aFdlZWsgPSBwYXJzZUludCgob3JkQml0cyAvIDY1NTM2KS50b1N0cmluZygpLCAxMCkgKyAxO1xyXG4gICAgICB3ZWVrZGF5ID0gcGFyc2VJbnQoKG1vbnRoQml0cyAvIDUyNDI4OCkudG9TdHJpbmcoKSwgMTApIC0gMTtcclxuICAgICAgbW9udGhOdW0gPSBwYXJzZUludCgoKGVudHJ5LlJlY3VyUGVyaW9kU3BlYyAtIG1vbnRoQml0cyAtIG9yZEJpdHMpIC8gNDE5NDMwNCkudG9TdHJpbmcoKSwgMTApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHdlZWs6IG50aFdlZWssXHJcbiAgICAgIHdlZWtkYXksXHJcbiAgICAgIG1vbnRoOiBtb250aE51bSxcclxuICAgIH07XHJcbiAgfSxcclxuICBnZXRSZWN1clBlcmlvZFNwZWM6IGZ1bmN0aW9uIGdldFJlY3VyUGVyaW9kU3BlYyhyZWN1clBlcmlvZCwgc3RhcnREYXRlLCB3ZWVrZGF5cywgaW50ZXIpIHtcclxuICAgIGxldCBzcGVjID0gMDtcclxuICAgIGxldCBpbnRlcnZhbCA9IGludGVyIHx8IHRoaXMuaW50ZXJ2YWw7XHJcbiAgICBsZXQgd2Vla0RheTtcclxuICAgIGxldCBudGhXZWVrO1xyXG4gICAgbGV0IG1vbnRoTnVtO1xyXG5cclxuICAgIGlmICghc3RhcnREYXRlKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaCAocmVjdXJQZXJpb2QpIHtcclxuICAgICAgY2FzZSAwOlxyXG4gICAgICAgIC8vIGRhaWx5XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMTpcclxuICAgICAgICAvLyBkYWlseSBvY2N1cmFuY2VzICphZnRlciBjb21wbGV0aW9uKlxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMjpcclxuICAgICAgICAvLyB3ZWVrbHlcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdlZWtkYXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBzcGVjICs9ICh3ZWVrZGF5c1tpXSA/IHRoaXMuX3dlZWtEYXlWYWx1ZXNbaV0gOiAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNwZWMgPT09IDApIHtcclxuICAgICAgICAgIHNwZWMgKz0gdGhpcy5fd2Vla0RheVZhbHVlc1tzdGFydERhdGUuZ2V0RGF5KCldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMzpcclxuICAgICAgICAvLyB3ZWVrbHkgb2NjdXJhbmNlcyAqYWZ0ZXIgY29tcGxldGlvbipcclxuICAgICAgICBzcGVjID0gMTA0ODU3NjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSA0OlxyXG4gICAgICAgIC8vIG1vbnRobHkgb24gZGF5ICMjXHJcbiAgICAgICAgc3BlYyA9IDEwNDg1NzY7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgNTpcclxuICAgICAgICAvLyBtb250aGx5IG9uICNvcmQgI3dlZWtkYXlcclxuICAgICAgICB3ZWVrRGF5ID0gc3RhcnREYXRlLmdldERheSgpICsgMTtcclxuICAgICAgICBudGhXZWVrID0gcGFyc2VJbnQoKChzdGFydERhdGUuZ2V0RGF0ZSgpIC0gMSkgLyA3KS50b1N0cmluZygpLCAxMCkgKyAxO1xyXG4gICAgICAgIHNwZWMgPSAoKHdlZWtEYXkgKiA1MjQyODgpICsgKChudGhXZWVrIC0gMSkgKiA2NTUzNikpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDY6XHJcbiAgICAgICAgLy8gbW9udGhseSBvY2N1cmFuY2VzICphZnRlciBjb21wbGV0aW9uKlxyXG4gICAgICAgIHNwZWMgPSAxMDQ4NTc2O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDc6XHJcbiAgICAgICAgLy8geWVhcmx5IG9uICNtb250aCAjZGF5XHJcbiAgICAgICAgc3BlYyA9IDM4Nzk3MzEyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDg6XHJcbiAgICAgICAgLy8geWVhcmx5IG9uICNvcmQgI3dlZWtkYXkgb2YgI21vbnRoXHJcbiAgICAgICAgc3BlYyA9IDE4NTQ2Njg4O1xyXG4gICAgICAgIHdlZWtEYXkgPSBzdGFydERhdGUuZ2V0RGF5KCkgKyAxO1xyXG4gICAgICAgIG1vbnRoTnVtID0gc3RhcnREYXRlLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgICAgIG50aFdlZWsgPSBwYXJzZUludCgoKHN0YXJ0RGF0ZS5nZXREYXRlKCkgLSAxKSAvIDcpLnRvU3RyaW5nKCksIDEwKSArIDE7XHJcbiAgICAgICAgc3BlYyA9ICgobW9udGhOdW0gKiA0MTk0MzA0KSArICh3ZWVrRGF5ICogNTI0Mjg4KSArICgobnRoV2VlayAtIDEpICogNjU1MzYpKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSA5OlxyXG4gICAgICAgIC8vIHllYXJseSBvY2N1cmFuY2VzICphZnRlciBjb21wbGV0aW9uKlxyXG4gICAgICAgIHNwZWMgPSAzODc5NzMxMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICAvLyBOb3QgcmVjdXJyaW5nLCBoYXBwZW5zIG9ubHkgb25jZVxyXG4gICAgICAgIGludGVydmFsID0gMDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3BlYyArIGludGVydmFsOyAvLyArIGV2ZXJ5IGludGVydmFsIGRheXMvd2Vla3MvbW9udGhzL3llYXJzXHJcbiAgfSxcclxuICBjcmVhdGVUZXh0T3B0aW9uczogZnVuY3Rpb24gY3JlYXRlVGV4dE9wdGlvbnMoZW50cnkpIHtcclxuICAgIGxldCB3ZWVrZGF5c1N0cmluZyA9ICcnO1xyXG4gICAgY29uc3QgcmVjdXJQZXJpb2RTcGVjID0gcGFyc2VJbnQoZW50cnkuUmVjdXJQZXJpb2RTcGVjLCAxMCk7XHJcbiAgICBjb25zdCBpbnRlcnZhbCA9IHJlY3VyUGVyaW9kU3BlYyAlIDY1NTM2O1xyXG4gICAgY29uc3QgbW9tZW50Q3VycmVudERhdGUgPSBtb21lbnQoZW50cnkuU3RhcnREYXRlKTtcclxuICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbW9tZW50Q3VycmVudERhdGUudG9EYXRlKCk7XHJcbiAgICBjb25zdCBkYXkgPSBjdXJyZW50RGF0ZS5nZXREYXRlKCk7XHJcbiAgICBjb25zdCB3ZWVrZGF5ID0gbW9tZW50Q3VycmVudERhdGUuZm9ybWF0KHRoaXMud2Vla2RheUZvcm1hdFRleHQpO1xyXG4gICAgY29uc3Qgd2Vla2RheXMgPSB0aGlzLmdldFdlZWtkYXlzKHJlY3VyUGVyaW9kU3BlYywgdHJ1ZSk7XHJcbiAgICBjb25zdCBtb250aCA9IG1vbWVudEN1cnJlbnREYXRlLmxvY2FsZURhdGEoKS5tb250aHMobW9tZW50Q3VycmVudERhdGUpO1xyXG5cclxuICAgIGxldCB0aW1lRm9ybWF0dGVkID0gbW9tZW50Q3VycmVudERhdGUuZm9ybWF0KHRoaXMudGltZUZvcm1hdFRleHQpO1xyXG5cclxuICAgIGlmIChBcHAgJiYgQXBwLmlzMjRIb3VyQ2xvY2soKSkge1xyXG4gICAgICB0aW1lRm9ybWF0dGVkID0gbW9tZW50Q3VycmVudERhdGUuZm9ybWF0KHRoaXMudGltZUZvcm1hdFRleHQyNCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGd1YXJkLWZvci1pblxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gd2Vla2RheXMpIHtcclxuICAgICAgaWYgKHdlZWtkYXlzW2tleV0gJiYgcGFyc2VJbnQoa2V5LCAxMCkgPCB3ZWVrZGF5cy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgd2Vla2RheXNba2V5XSA9IHN0cmluZy5zdWJzdGl0dXRlKHRoaXMuZGF5U2VwYXJhdG9yLCBbd2Vla2RheXNba2V5XV0pO1xyXG4gICAgICB9XHJcbiAgICAgIHdlZWtkYXlzU3RyaW5nICs9IHdlZWtkYXlzW2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFtcclxuICAgICAgaW50ZXJ2YWwsXHJcbiAgICAgIHRpbWVGb3JtYXR0ZWQsXHJcbiAgICAgIG1vbWVudEN1cnJlbnREYXRlLmZvcm1hdCh0aGlzLmRhdGVGb3JtYXRUZXh0KSxcclxuICAgICAgdGhpcy5jYWxjRW5kRGF0ZShjdXJyZW50RGF0ZSwgZW50cnkpLmZvcm1hdCh0aGlzLmVuZERhdGVGb3JtYXRUZXh0KSxcclxuICAgICAgd2Vla2RheXNTdHJpbmcsXHJcbiAgICAgIG1vbnRoLFxyXG4gICAgICBzdHJpbmcuc3Vic3RpdHV0ZSh0aGlzLm9yZFRleHRbcGFyc2VJbnQoKChkYXkgLSAxKSAvIDcpLCAxMCkgKyAxXSwgW3dlZWtkYXldKSxcclxuICAgICAgZGF5LFxyXG4gICAgXTtcclxuICB9LFxyXG4gIGJ1aWxkU3VtbWFyeVRleHQ6IGZ1bmN0aW9uIGJ1aWxkU3VtbWFyeVRleHQoZW50cnksIHRleHRPcHRpb25zKSB7XHJcbiAgICBjb25zdCBycCA9IHBhcnNlSW50KGVudHJ5LlJlY3VyUGVyaW9kLCAxMCk7XHJcbiAgICBzd2l0Y2ggKHJwKSB7XHJcbiAgICAgIGNhc2UgLTE6XHJcbiAgICAgICAgLy8gb2NjdXJzIG9ubHkgb25jZVxyXG4gICAgICAgIHJldHVybiB0aGlzLnNpbmdsZUFjdGl2aXR5U3VtbWFyeTtcclxuICAgICAgY2FzZSAwOlxyXG4gICAgICAgIC8vIGRhaWx5XHJcbiAgICAgICAgcmV0dXJuICh0ZXh0T3B0aW9uc1swXSA8PSAxKSA/XHJcbiAgICAgICAgICBzdHJpbmcuc3Vic3RpdHV0ZSh0aGlzLmRhaWx5U3VtbWFyeSwgdGV4dE9wdGlvbnMpIDpcclxuICAgICAgICAgIHN0cmluZy5zdWJzdGl0dXRlKHRoaXMuZGFpbHlFdmVyeVN1bW1hcnksIHRleHRPcHRpb25zKTtcclxuICAgICAgY2FzZSAxOlxyXG4gICAgICAgIC8vIGRhaWx5IGFmdGVyIGNvbXBsZXRpb25cclxuICAgICAgICByZXR1cm4gKHRleHRPcHRpb25zWzBdIDw9IDEpID9cclxuICAgICAgICAgIHN0cmluZy5zdWJzdGl0dXRlKHRoaXMuZGFpbHlBZnRlckNvbXBsZXRpb25TdW1tYXJ5LCB0ZXh0T3B0aW9ucykgOlxyXG4gICAgICAgICAgc3RyaW5nLnN1YnN0aXR1dGUodGhpcy5kYWlseUV2ZXJ5QWZ0ZXJDb21wbGV0aW9uU3VtbWFyeSwgdGV4dE9wdGlvbnMpO1xyXG4gICAgICBjYXNlIDI6XHJcbiAgICAgICAgLy8gd2Vla2x5XHJcbiAgICAgICAgcmV0dXJuICh0ZXh0T3B0aW9uc1swXSA8PSAxKSA/XHJcbiAgICAgICAgICBzdHJpbmcuc3Vic3RpdHV0ZSh0aGlzLndlZWtseVN1bW1hcnksIHRleHRPcHRpb25zKSA6XHJcbiAgICAgICAgICBzdHJpbmcuc3Vic3RpdHV0ZSh0aGlzLndlZWtseUV2ZXJ5U3VtbWFyeSwgdGV4dE9wdGlvbnMpO1xyXG4gICAgICBjYXNlIDM6XHJcbiAgICAgICAgLy8gd2Vla2x5IGFmdGVyIGNvbXBsZXRpb25cclxuICAgICAgICByZXR1cm4gKHRleHRPcHRpb25zWzBdIDw9IDEpID9cclxuICAgICAgICAgIHN0cmluZy5zdWJzdGl0dXRlKHRoaXMud2Vla2x5QWZ0ZXJDb21wbGV0aW9uU3VtbWFyeSwgdGV4dE9wdGlvbnMpIDpcclxuICAgICAgICAgIHN0cmluZy5zdWJzdGl0dXRlKHRoaXMud2Vla2x5RXZlcnlBZnRlckNvbXBsZXRpb25TdW1tYXJ5LCB0ZXh0T3B0aW9ucyk7XHJcbiAgICAgIGNhc2UgNDpcclxuICAgICAgICAvLyBtb250aGx5IG9uIGRheVxyXG4gICAgICAgIHJldHVybiAodGV4dE9wdGlvbnNbMF0gPD0gMSkgP1xyXG4gICAgICAgICAgc3RyaW5nLnN1YnN0aXR1dGUodGhpcy5tb250aGx5U3VtbWFyeSwgdGV4dE9wdGlvbnMpIDpcclxuICAgICAgICAgIHN0cmluZy5zdWJzdGl0dXRlKHRoaXMubW9udGhseUV2ZXJ5U3VtbWFyeSwgdGV4dE9wdGlvbnMpO1xyXG4gICAgICBjYXNlIDU6XHJcbiAgICAgICAgLy8gbW9udGhseSBvbiBkYXkgb3JkaW5hbFxyXG4gICAgICAgIHJldHVybiAodGV4dE9wdGlvbnNbMF0gPD0gMSkgP1xyXG4gICAgICAgICAgc3RyaW5nLnN1YnN0aXR1dGUodGhpcy5tb250aGx5T3JkU3VtbWFyeSwgdGV4dE9wdGlvbnMpIDpcclxuICAgICAgICAgIHN0cmluZy5zdWJzdGl0dXRlKHRoaXMubW9udGhseUV2ZXJ5T3JkU3VtbWFyeSwgdGV4dE9wdGlvbnMpO1xyXG4gICAgICBjYXNlIDY6XHJcbiAgICAgICAgLy8gbW9udGhseSBhZnRlciBjb21wbGV0aW9uXHJcbiAgICAgICAgcmV0dXJuICh0ZXh0T3B0aW9uc1swXSA8PSAxKSA/XHJcbiAgICAgICAgICBzdHJpbmcuc3Vic3RpdHV0ZSh0aGlzLm1vbnRobHlBZnRlckNvbXBsZXRpb25TdW1tYXJ5LCB0ZXh0T3B0aW9ucykgOlxyXG4gICAgICAgICAgc3RyaW5nLnN1YnN0aXR1dGUodGhpcy5tb250aGx5RXZlcnlBZnRlckNvbXBsZXRpb25TdW1tYXJ5LCB0ZXh0T3B0aW9ucyk7XHJcbiAgICAgIGNhc2UgNzpcclxuICAgICAgICAvLyB5ZWFybHkgb24gZGF5IG9mIHRoZSBtb250aFxyXG4gICAgICAgIHJldHVybiAodGV4dE9wdGlvbnNbMF0gPD0gMSkgP1xyXG4gICAgICAgICAgc3RyaW5nLnN1YnN0aXR1dGUodGhpcy55ZWFybHlTdW1tYXJ5LCB0ZXh0T3B0aW9ucykgOlxyXG4gICAgICAgICAgc3RyaW5nLnN1YnN0aXR1dGUodGhpcy55ZWFybHlFdmVyeVN1bW1hcnksIHRleHRPcHRpb25zKTtcclxuICAgICAgY2FzZSA4OlxyXG4gICAgICAvLyB5ZWFybHkgb24gZGF5IG9yZGluYWxcclxuICAgICAgICByZXR1cm4gKHRleHRPcHRpb25zWzBdIDw9IDEpID9cclxuICAgICAgICAgIHN0cmluZy5zdWJzdGl0dXRlKHRoaXMueWVhcmx5T3JkU3VtbWFyeSwgdGV4dE9wdGlvbnMpIDpcclxuICAgICAgICAgIHN0cmluZy5zdWJzdGl0dXRlKHRoaXMueWVhcmx5RXZlcnlPcmRTdW1tYXJ5LCB0ZXh0T3B0aW9ucyk7XHJcbiAgICAgIGNhc2UgOTpcclxuICAgICAgLy8gWWVhcmx5IGFmdGVyIGNvbXBsZXRpb25cclxuICAgICAgICByZXR1cm4gKHRleHRPcHRpb25zWzBdIDw9IDEpID9cclxuICAgICAgICAgIHN0cmluZy5zdWJzdGl0dXRlKHRoaXMueWVhcmx5QWZ0ZXJDb21wbGV0aW9uU3VtbWFyeSwgdGV4dE9wdGlvbnMpIDpcclxuICAgICAgICAgIHN0cmluZy5zdWJzdGl0dXRlKHRoaXMueWVhcmx5RXZlcnlBZnRlckNvbXBsZXRpb25TdW1tYXJ5LCB0ZXh0T3B0aW9ucyk7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgdG9TdHJpbmc6IGZ1bmN0aW9uIHRvU3RyaW5nKGVudHJ5KSB7XHJcbiAgICBpZiAoZW50cnkuUmVjdXJyZW5jZVN0YXRlICE9PSAncnN0TWFzdGVyJyB8fCAhZW50cnkuU3RhcnREYXRlKSB7XHJcbiAgICAgIGlmIChlbnRyeS5SZWN1cnJlbmNlU3RhdGUgPT09ICdyc05vdFJlY3VycmluZycgJiYgZW50cnkuU3RhcnREYXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2luZ2xlQWN0aXZpdHlTdW1tYXJ5O1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIGNvbnN0IHRleHRPcHRpb25zID0gdGhpcy5jcmVhdGVUZXh0T3B0aW9ucyhlbnRyeSk7XHJcbiAgICByZXR1cm4gdGhpcy5idWlsZFN1bW1hcnlUZXh0KGVudHJ5LCB0ZXh0T3B0aW9ucyk7XHJcbiAgfSxcclxuICBjYWxjRW5kRGF0ZTogZnVuY3Rpb24gY2FsY0VuZERhdGUoZGF0ZSwgZW50cnkpIHtcclxuICAgIGNvbnN0IGludGVydmFsID0gZW50cnkuUmVjdXJQZXJpb2RTcGVjICUgNjU1MzY7XHJcbiAgICBsZXQgd2Vla0RheTtcclxuICAgIGxldCBudGhXZWVrO1xyXG4gICAgbGV0IHRlbXBEYXRlID0gbW9tZW50LmlzTW9tZW50KGRhdGUpID8gZGF0ZS5jbG9uZSgpIDpcclxuICAgICAgbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpLCBkYXRlLmdldEhvdXJzKCksIGRhdGUuZ2V0TWludXRlcygpLCBkYXRlLmdldFNlY29uZHMoKSk7XHJcblxyXG4gICAgdGVtcERhdGUgPSBtb21lbnQodGVtcERhdGUpO1xyXG4gICAgc3dpdGNoIChwYXJzZUludChlbnRyeS5SZWN1clBlcmlvZCwgMTApKSB7XHJcbiAgICAgIGNhc2UgMDpcclxuICAgICAgICB0ZW1wRGF0ZS5hZGQoKGludGVydmFsICogKGVudHJ5LlJlY3VySXRlcmF0aW9ucyAtIDEpKSwgJ2RheXMnKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAyOlxyXG4gICAgICAgIHRlbXBEYXRlLmFkZCgoaW50ZXJ2YWwgKiAoZW50cnkuUmVjdXJJdGVyYXRpb25zIC0gMSkpLCAnd2Vla3MnKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSA0OlxyXG4gICAgICAgIHRlbXBEYXRlLmFkZCgoaW50ZXJ2YWwgKiAoZW50cnkuUmVjdXJJdGVyYXRpb25zIC0gMSkpLCAnbW9udGhzJyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgNTpcclxuICAgICAgICB3ZWVrRGF5ID0gdGVtcERhdGUuZGF5KCk7XHJcbiAgICAgICAgbnRoV2VlayA9IHBhcnNlSW50KCh0ZW1wRGF0ZS5kYXRlKCkgLyA3KS50b1N0cmluZygpLCAxMCkgKyAxO1xyXG4gICAgICAgIHRlbXBEYXRlLmFkZCgoaW50ZXJ2YWwgKiAoZW50cnkuUmVjdXJJdGVyYXRpb25zIC0gMSkpLCAnbW9udGhzJyk7XHJcbiAgICAgICAgdGVtcERhdGUgPSB0aGlzLmNhbGNEYXRlT2ZOdGhXZWVrZGF5KHRlbXBEYXRlLnRvRGF0ZSgpLCB3ZWVrRGF5LCBudGhXZWVrKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSA3OlxyXG4gICAgICAgIHRlbXBEYXRlLmFkZCgoaW50ZXJ2YWwgKiAoZW50cnkuUmVjdXJJdGVyYXRpb25zIC0gMSkpLCAneWVhcnMnKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSA4OlxyXG4gICAgICAgIHdlZWtEYXkgPSB0ZW1wRGF0ZS5kYXkoKTtcclxuICAgICAgICBudGhXZWVrID0gcGFyc2VJbnQoKHRlbXBEYXRlLmRhdGUoKSAvIDcpLnRvU3RyaW5nKCksIDEwKSArIDE7XHJcbiAgICAgICAgdGVtcERhdGUuYWRkKChpbnRlcnZhbCAqIChlbnRyeS5SZWN1ckl0ZXJhdGlvbnMgLSAxKSksICd5ZWFycycpO1xyXG4gICAgICAgIHRlbXBEYXRlID0gdGhpcy5jYWxjRGF0ZU9mTnRoV2Vla2RheSh0ZW1wRGF0ZS50b0RhdGUoKSwgd2Vla0RheSwgbnRoV2Vlayk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgLy8gUmVjdXJQZXJpb2QgMSwgMywgNiAmIDkgYXJlIGl0ZXJhdGlvbnMgYWZ0ZXIgY29tcGxldGlvbi4gTm8gZW5kIGRhdGUuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRlbXBEYXRlO1xyXG4gIH0sXHJcbiAgY2FsY0RhdGVPZk50aFdlZWtkYXk6IGZ1bmN0aW9uIGNhbGNEYXRlT2ZOdGhXZWVrZGF5KGRhdGUsIHdlZWtEYXksIG50aFdlZWspIHtcclxuICAgIC8vIGNhbGN1bGF0ZSBkYXRlIG9mICNudGhXZWVrICN3ZWVrRGF5ICBlLmcuIEZpcnN0IEZyaWRheVxyXG4gICAgbGV0IHRlbXBEYXRlID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKTtcclxuICAgIHRlbXBEYXRlID0gbW9tZW50KHRlbXBEYXRlKTtcclxuXHJcbiAgICBpZiAobnRoV2VlayA9PT0gNSkge1xyXG4gICAgICAvLyBcImxhc3RcIiAtIGNvdW50IGJhY2t3YXJkcy4uLlxyXG4gICAgICB0ZW1wRGF0ZS5lbmRPZignbW9udGgnKTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcclxuICAgICAgICBpZiAodGVtcERhdGUuZGF5KCkgPT09IHdlZWtEYXkpIHtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0ZW1wRGF0ZS5zdWJ0cmFjdCgxLCAnZGF5cycpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBjb3VudCBmcm9tIHRoZSBiZWdpbm5pbmcuLi5cclxuICAgICAgdGVtcERhdGUuc3RhcnRPZignbW9udGgnKTtcclxuICAgICAgLy8gZ2V0IHRvIHRoZSBmaXJzdCBkYXkgdGhhdCBtYXRjaGVzLi4uXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHRlbXBEYXRlLmRheSgpID09PSB3ZWVrRGF5KSB7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGVtcERhdGUuYWRkKDEsICdkYXlzJyk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gdGhlbiBhZGQgY29ycmVjdCBudW1iZXIgb2Ygd2Vla3MgKGZpcnN0IHdlZWsgLSBhZGQgMCBldGMuKVxyXG4gICAgICB0ZW1wRGF0ZS5hZGQoKG50aFdlZWsgLSAxKSwgJ3dlZWtzJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGVtcERhdGU7XHJcbiAgfSxcclxuICBjYWxjUmVjdXJJdGVyYXRpb25zOiBmdW5jdGlvbiBjYWxjUmVjdXJJdGVyYXRpb25zKGVuZERhdGUsIHN0YXJ0RGF0ZSwgaW50ZXJ2YWwsIHJlY3VyUGVyaW9kKSB7XHJcbiAgICAvLyBjYWxjdWxhdGUgbnVtYmVyIG9mIG9jY3VyYW5jZXMgYmFzZWQgb24gc3RhcnQgYW5kIGVuZCBkYXRlc1xyXG4gICAgY29uc3QgZGF5cyA9IChlbmREYXRlIC0gc3RhcnREYXRlKSAvICgxMDAwICogNjAgKiA2MCAqIDI0KTtcclxuICAgIGNvbnN0IHllYXJzID0gZW5kRGF0ZS5nZXRGdWxsWWVhcigpIC0gc3RhcnREYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICBsZXQgcmVzdWx0O1xyXG5cclxuICAgIHN3aXRjaCAocGFyc2VJbnQocmVjdXJQZXJpb2QsIDEwKSkge1xyXG4gICAgICBjYXNlIDg6XHJcbiAgICAgIGNhc2UgNzpcclxuICAgICAgICByZXN1bHQgPSB5ZWFycztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSA1OlxyXG4gICAgICBjYXNlIDQ6XHJcbiAgICAgICAgcmVzdWx0ID0gKGVuZERhdGUuZ2V0TW9udGgoKSAtIHN0YXJ0RGF0ZS5nZXRNb250aCgpKSArICh5ZWFycyAqIDEyKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAyOlxyXG4gICAgICAgIHJlc3VsdCA9IGRheXMgLyA3O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDA6XHJcbiAgICAgICAgcmVzdWx0ID0gZGF5cztcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICAvLyBubyBjYXNlcyBzaG91bGQgZmFsbCBoZXJlXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoKHJlc3VsdCAvIGludGVydmFsKSArIDEpO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19