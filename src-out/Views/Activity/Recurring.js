define('crm/Views/Activity/Recurring', ['module', 'exports', 'dojo/_base/declare', '../../Format', '../../Validator', 'argos/Edit', '../../Recurrence', 'argos/I18n', 'dojo/string'], function (module, exports, _declare, _Format, _Validator, _Edit, _Recurrence, _I18n, _string) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Format2 = _interopRequireDefault(_Format);

  var _Validator2 = _interopRequireDefault(_Validator);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _Recurrence2 = _interopRequireDefault(_Recurrence);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _string2 = _interopRequireDefault(_string);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var resource = (0, _I18n2.default)('activityRecurring');
  var dtFormatResource = (0, _I18n2.default)('activityEditDateTimeFormat');

  /**
   * @class crm.Views.Activity.Recurring
   *
   * @extends argos.Edit
   *
   * @requires argos.Edit
   * @requires argos.Utility
   *
   * @requires crm.Format
   * @requires crm.Validator
   * @requires crm.Recurrence
   *
   * @requires moment
   *
   */
  var __class = (0, _declare2.default)('crm.Views.Activity.Recurring', [_Edit2.default], {
    // Localization
    startingText: resource.startingText,
    endingText: resource.endingText,
    repeatsText: resource.repeatsText,
    everyText: resource.everyText,
    afterCompletionText: resource.afterCompletionText,
    singleWeekdayText: resource.singleWeekdayText,
    weekdaysText: resource.weekdaysText,
    dayNumberText: resource.dayNumberText,
    monthText: resource.monthText,
    onText: resource.onText,
    occurrencesText: resource.occurrencesText,
    summaryText: resource.summaryText,
    weekDaysText: [resource.sunday, resource.monday, resource.tuesday, resource.wednesday, resource.thursday, resource.friday, resource.saturday],
    monthsText: [resource.january, resource.february, resource.march, resource.april, resource.may, resource.june, resource.july, resource.august, resource.september, resource.october, resource.november, resource.december],
    frequencyOptionsText: [resource.dailyText, resource.weeklyText, resource.monthlyText, resource.yearlyText],
    recurringFrequencyText: resource.recurringFrequencyText,
    frequencyIntervalText: resource.frequencyIntervalText,
    yesText: resource.yesText,
    noText: resource.noText,
    titleText: resource.titleText,
    weeklyFrequencySingleAfterCompletion: resource.weeklyFrequencySingleAfterCompletion,
    weeklyFrequencySingle: resource.weeklyFrequencySingle,
    weeklyFrequencyAfterCompletion: resource.weeklyFrequencyAfterCompletion,
    weeklyFrequency: resource.weeklyFrequency,
    monthlyFrequencyAfterCompletion: resource.monthlyFrequencyAfterCompletion,
    monthlyFrequency: resource.monthlyFrequency,
    monthlyFrequencyOrdinalAfterCompletion: resource.monthlyFrequencyOrdinalAfterCompletion,
    monthlyFrequencyOrdinal: resource.monthlyFrequencyOrdinal,
    dailyFrequencyAfterCompletion: resource.dailyFrequencyAfterCompletion,
    dailyFrequency: resource.dailyFrequency,
    startingTimelessFormatText: dtFormatResource.startingTimelessFormatText,

    // View Properties
    monthNames: moment.monthsShort,

    id: 'recurrence_edit',

    init: function init() {
      this.inherited(init, arguments);
      this.connect(this.fields.AfterCompletion, 'onChange', this.onAfterCompletionChange);
      this.connect(this.fields.Interval, 'onChange', this.onIntervalChange);
      this.connect(this.fields.RecurIterations, 'onChange', this.onRecurIterationsChange);
      this.connect(this.fields.EndDate, 'onChange', this.onEndDateChange);
      // these affect the StartDate:
      this.connect(this.fields.Scale, 'onChange', this.onScaleChange);
      this.connect(this.fields.Day, 'onChange', this.onDayChange); // Day of the month
      this.connect(this.fields.Weekdays, 'onChange', this.onStartDateChange); // One or more days on Weekly options
      this.connect(this.fields.OrdWeekday, 'onChange', this.onStartDateChange); // Single day of week
      this.connect(this.fields.OrdWeek, 'onChange', this.onStartDateChange); // 1st..last week of month, or on Day #
      this.connect(this.fields.OrdMonth, 'onChange', this.onStartDateChange); // Month of year
      this.fields.EndDate.disable();
    },
    resetUI: function resetUI() {
      // hide or reveal and set fields according to panel/RecurPeriod
      var rp = parseInt(this.fields.RecurPeriod.getValue(), 10);
      var startDate = this.fields.StartDate.getValue();
      var interval = this.fields.RecurPeriodSpec.getValue() % 65536;
      var showthese = 'Interval,AfterCompletion,';

      if (!_Recurrence2.default.isAfterCompletion(rp)) {
        showthese += 'RecurIterations,EndDate,';
      }

      this.fields.RecurrenceState.setValue('rstMaster'); // undone when Once panel selected

      // determine which fields to hide according to panel
      switch (rp) {
        case 0:
        // daily
        case 1:
          // eslint-disable-line
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
          if (this.entry && this.entry.StartDate) {
            this.fields.OrdWeek.data = this.createOrdData(this.formatSingleWeekday(this.entry.StartDate.getDay()));
          }
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
        if (showthese.indexOf(i) >= 0) {
          this.fields[i].show();
        } else {
          this.fields[i].hide();
        }
      }
      // always show these:
      if (rp >= 0) {
        this.fields.Scale.show();
      }
      this.fields.Summary.show();

      // refresh some field values
      this.fields.RecurPeriod.setValue(rp);
      this.fields.RecurPeriodSpec.setValue(_Recurrence2.default.getRecurPeriodSpec(rp, startDate, this.entry.Weekdays, interval));

      this.summarize();
    },
    summarize: function summarize() {
      this.fields.Summary.setValue(_Recurrence2.default.toString(this.getRecurrence()));
      this.fields.Scale.setValue(_Recurrence2.default.getPanel(parseInt(this.fields.RecurPeriod.getValue(), 10), true));
    },
    onAfterCompletionChange: function onAfterCompletionChange(value) {
      var rp = parseInt(this.fields.RecurPeriod.getValue(), 10);

      if (value) {
        rp += '0258'.indexOf(rp) >= 0 ? 1 : 2;
        this.fields.RecurIterations.setValue(-1);
      } else {
        if ('69'.indexOf(rp) >= 0) {
          if (parseInt(this.fields.OrdWeek.getValue(), 10)) {
            rp -= 1;
          } else {
            rp -= 2;
          }
        } else {
          rp -= 1;
        }
        this.fields.RecurIterations.setValue(this.entry.RecurIterations > 0 ? this.entry.RecurIterations : _Recurrence2.default.defaultIterations[rp]);
      }

      this.fields.RecurPeriod.setValue(rp);
      this.resetUI();
    },
    onIntervalChange: function onIntervalChange(value, field) {
      var currentSpec = parseInt(this.fields.RecurPeriodSpec.getValue(), 10);
      var interval = currentSpec % 65536;

      var theValue = parseInt(value, 10);
      if (theValue && theValue > 0) {
        this.fields.RecurPeriodSpec.setValue(currentSpec - interval + parseInt(theValue, 10));
        this.fields.EndDate.setValue(_Recurrence2.default.calcEndDate(this.fields.StartDate.getValue(), this.getRecurrence()).toDate());
      } else {
        // Invalid input, reset to current Interval
        field.setValue(interval);
      }

      this.summarize();
    },
    onRecurIterationsChange: function onRecurIterationsChange(value) {
      var theValue = parseInt(value, 10);
      if (theValue && theValue > 0) {
        this.entry.RecurIterations = value;
        var newEndDate = _Recurrence2.default.calcEndDate(this.fields.StartDate.getValue(), this.getRecurrence()).toDate();

        if (newEndDate !== this.fields.EndDate.getValue()) {
          this.fields.EndDate.setValue(newEndDate);
        }
      } else {
        // Invalid input, reset to value calculated from EndDate
        this.onEndDateChange(this.fields.EndDate.getValue());
      }

      this.summarize();
    },
    onEndDateChange: function onEndDateChange(value) {
      if (value >= this.fields.StartDate.getValue()) {
        var iterations = _Recurrence2.default.calcRecurIterations(value, this.fields.StartDate.getValue(), this.fields.Interval.getValue(), this.fields.RecurPeriod.getValue());

        if (iterations !== parseInt(this.fields.RecurIterations.getValue(), 10)) {
          this.fields.RecurIterations.setValue(iterations);
        }
      } else {
        // can't end before start! reset.
        this.onRecurIterationsChange(this.fields.RecurIterations.getValue());
      }

      this.summarize();
    },
    onDayChange: function onDayChange(value, field) {
      var startDate = this.fields.StartDate.getValue();
      var maxValue = moment(startDate).daysInMonth();

      if (value > 0 && value <= maxValue) {
        startDate.setDate(value);
      } else {
        // reset field to acceptable value
        if (value > 0) {
          startDate.setDate(maxValue);
        }
        field.setValue(startDate.getDate());
      }

      this.fields.StartDate.setValue(startDate);
      // weekday(s)/ordWeek/EndDate may need adjusting
      this.onStartDateChange(value, field);
    },
    onStartDateChange: function onStartDateChange(value, field) {
      // when field alters StartDate, other fields need to be adjusted
      var weekdays = _Recurrence2.default.getWeekdays(parseInt(this.fields.RecurPeriodSpec.getValue(), 10));
      var panel = parseInt(this.fields.RecurPeriod.getValue(), 10);
      var theValue = parseInt(value.key || value, 10);
      var startDate = this.fields.StartDate.getValue();
      var weekday = startDate.getDay();
      var ordWeek = parseInt((startDate.getDate() - 1) / 7, 10) + 1;

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
          weekday = theValue;
          break;
        case 'OrdWeek':
          if (theValue) {
            ordWeek = theValue;
            if (panel === 4 || panel === 7) {
              this.fields.RecurPeriod.setValue(panel + 1);
              this.resetUI();
            }
          } else if (panel === 5 || panel === 8) {
            this.fields.RecurPeriod.setValue(panel - 1);
            this.resetUI();
          }
          break;
        case 'OrdMonth':
          startDate.setMonth(theValue);
          weekday = startDate.getDay();
          ordWeek = parseInt(((startDate.getDate() - 1) / 7).toString(), 10) + 1;
          break;
        default:
      }

      startDate = _Recurrence2.default.calcDateOfNthWeekday(startDate, weekday, ordWeek).toDate();
      this.fields.StartDate.setValue(startDate);
      this.fields.EndDate.setValue(_Recurrence2.default.calcEndDate(startDate, this.getRecurrence()).toDate());
      this.fields.Day.setValue(startDate.getDate());
      this.fields.OrdWeekday.setValue(startDate.getDay());

      var weekData = this.createOrdData(this.formatSingleWeekday(startDate.getDay()));
      this.fields.OrdWeek.data = weekData;
      this.summarize();
      var key = this.fields.OrdWeek.getValue();
      if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
        key = key.$key;
        this.fields.OrdWeek.setValue(weekData.$resources[key]);
      } else if (!isNaN(parseInt(key, 10))) {
        this.fields.OrdWeek.setValue(weekData.$resources[key]);
      }
    },
    onScaleChange: function onScaleChange(value) {
      var startDate = this.fields.StartDate.getValue();
      var afterCompletion = this.fields.AfterCompletion.getValue() ? 1 : 0;
      var interval = parseInt(this.fields.Interval.getValue(), 10);
      var recurPeriod = parseInt(this.fields.RecurPeriod.getValue(), 10);

      switch (parseInt(value.key, 10)) {
        case 0:
          // days
          if (recurPeriod < 2) {
            return;
          }
          recurPeriod = 0 + afterCompletion;
          break;
        case 1:
          // weeks
          if (recurPeriod > 1 && recurPeriod < 4) {
            return;
          }
          recurPeriod = 2 + afterCompletion;
          break;
        case 2:
          // months
          if (recurPeriod > 3 && recurPeriod < 7) {
            return;
          }
          recurPeriod = 4 + afterCompletion + afterCompletion;
          break;
        case 3:
          // years
          if (recurPeriod > 6) {
            return;
          }
          recurPeriod = 7 + afterCompletion + afterCompletion;
          break;
        default:
      }
      this.fields.RecurPeriod.setValue(recurPeriod);
      this.fields.RecurIterations.setValue(_Recurrence2.default.defaultIterations[recurPeriod]);
      this.fields.RecurPeriodSpec.setValue(_Recurrence2.default.getRecurPeriodSpec(recurPeriod, startDate, [], interval));
      this.fields.Weekdays.setValue(_Recurrence2.default.getWeekdays(this.fields.RecurPeriodSpec.getValue()));
      this.fields.Day.setValue(startDate.getDate());
      this.fields.OrdMonth.setValue(startDate.getMonth() + 1);
      this.fields.OrdWeek.setValue(0);
      this.fields.EndDate.setValue(_Recurrence2.default.calcEndDate(startDate, this.getRecurrence()).toDate());

      this.resetUI();
    },

    formatWeekdays: function formatWeekdays(selections) {
      var values = [];
      var weekdays = [0, 0, 0, 0, 0, 0, 0];

      for (var key in selections) {
        if (selections[key]) {
          values.push(this.weekDaysText[key]);
          weekdays[key] = 1;
        }
      }
      this.fields.RecurPeriodSpec.setValue(_Recurrence2.default.getRecurPeriodSpec(parseInt(this.fields.RecurPeriod.getValue(), 10), this.fields.StartDate.getValue(), weekdays, parseInt(this.fields.Interval.getValue(), 10)));

      this.entry.Weekdays = weekdays;
      return values.join(', ');
    },
    formatSingleWeekday: function formatSingleWeekday(selection) {
      if (selection.$descriptor) {
        return selection.$descriptor;
      }

      return this.weekDaysText[parseInt(selection, 10)];
    },
    formatMonth: function formatMonth(selection) {
      if (selection.$descriptor) {
        return selection.$descriptor;
      }

      return this.monthsText[parseInt(selection, 10) - 1];
    },
    formatOrd: function formatOrd(selection) {
      if (selection.$descriptor) {
        return selection.$descriptor;
      }
      return _Recurrence2.default.ordText[parseInt(selection, 10)];
    },
    preselectWeekdays: function preselectWeekdays() {
      var previousSelections = [];
      var weekdays = _Recurrence2.default.getWeekdays(this.fields.RecurPeriodSpec.getValue());

      for (var i = 0; i < weekdays.length; i++) {
        if (weekdays[i]) {
          previousSelections.push(i);
        }
      }
      return previousSelections;
    },
    createScaleData: function createScaleData() {
      var list = [];

      for (var opt in this.frequencyOptionsText) {
        if (this.frequencyOptionsText.hasOwnProperty(opt)) {
          list.push({
            $key: opt,
            $descriptor: this.frequencyOptionsText[opt]
          });
        }
      }

      return {
        $resources: list
      };
    },
    createWeekdaysData: function createWeekdaysData() {
      var list = [];

      this.weekDaysText.forEach(function (name, idx) {
        list.push({
          $key: idx,
          $descriptor: name
        });
      });

      return {
        $resources: list
      };
    },
    createMonthsData: function createMonthsData() {
      var list = [];
      this.monthsText.forEach(function (name, idx) {
        list.push({
          $key: idx,
          $descriptor: name
        });
      });
      return {
        $resources: list
      };
    },
    createOrdData: function createOrdData() {
      var day = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var list = [];

      for (var ord in _Recurrence2.default.ordText) {
        if (_Recurrence2.default.ordText.hasOwnProperty(ord)) {
          list.push({
            $key: ord,
            $descriptor: _string2.default.substitute(_Recurrence2.default.ordText[ord], [day])
          });
        }
      }

      return {
        $resources: list
      };
    },
    setValues: function setValues(values) {
      this.inherited(setValues, arguments);

      // calculate some values from the ones provided
      this.entry = values;
      this.entry.StartDate = argos.Convert.toDateFromString(values.StartDate); // TODO: Avoid global
      this.entry.EndDate = _Recurrence2.default.calcEndDate(values.StartDate, values).toDate();
      this.entry.Recurring = typeof values.Recurring === 'string' ? /^true$/i.test(values.Recurring) : values.Recurring;
      var ord = _Recurrence2.default.getOrd(this.entry);
      this.entry.Interval = values.RecurPeriodSpec % 65536;
      this.entry.AfterCompletion = _Recurrence2.default.isAfterCompletion(values.RecurPeriod);
      this.entry.Day = this.entry.StartDate.getDate();
      this.entry.Weekdays = _Recurrence2.default.getWeekdays(values.RecurPeriodSpec);
      this.entry.OrdWeek = ord.week;
      this.entry.OrdWeekday = ord.weekday;
      this.entry.OrdMonth = ord.month;

      // Even hidden and falsy fields need their values set (not from parent)
      for (var name in this.fields) {
        if (this.fields.hasOwnProperty(name)) {
          var field = this.fields[name];
          // 0 (Daily panel) or false (AfterCompletion) are legitimate values!
          if (typeof this.entry[name] !== 'undefined') {
            field.setValue(this.entry[name]);
          }
        }
      }

      this.resetUI();
    },
    getValues: function getValues() {
      var o = this.getRecurrence();

      o.Recurring = o.RecurPeriod >= 0;
      o.EndDate = _Recurrence2.default.calcEndDate(o.StartDate, o).toDate();

      return o;
    },
    getRecurrence: function getRecurrence() {
      return {
        StartDate: this.fields.StartDate.getValue(),
        RecurPeriod: parseInt(this.fields.RecurPeriod.getValue(), 10),
        RecurPeriodSpec: parseInt(this.fields.RecurPeriodSpec.getValue(), 10),
        RecurIterations: parseInt(this.fields.RecurIterations.getValue(), 10),
        RecurrenceState: this.fields.RecurrenceState.getValue()
      };
    },
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
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
        label: this.recurringFrequencyText,
        title: this.recurringFrequencyText,
        name: 'Scale',
        property: 'Scale',
        type: 'select',
        view: 'select_list',
        exclude: true,
        data: this.createScaleData()
      }, {
        label: this.frequencyIntervalText,
        title: this.frequencyIntervalText,
        name: 'Interval',
        property: 'Interval',
        type: 'text',
        inputType: 'numeric',
        exclude: true,
        notificationTrigger: 'blur'
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
        label: this.dayNumberText,
        title: this.dayNumberText,
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
        formatValue: _Format2.default.bool
      }, {
        label: this.endingText,
        name: 'EndDate',
        property: 'EndDate',
        type: 'date',
        timeless: false,
        showTimePicker: false,
        dateFormatText: this.startingTimelessFormatText,
        minValue: new Date(1900, 0, 1),
        validator: [_Validator2.default.exists, _Validator2.default.isDateInRange]
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BY3Rpdml0eS9SZWN1cnJpbmcuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJkdEZvcm1hdFJlc291cmNlIiwiX19jbGFzcyIsInN0YXJ0aW5nVGV4dCIsImVuZGluZ1RleHQiLCJyZXBlYXRzVGV4dCIsImV2ZXJ5VGV4dCIsImFmdGVyQ29tcGxldGlvblRleHQiLCJzaW5nbGVXZWVrZGF5VGV4dCIsIndlZWtkYXlzVGV4dCIsImRheU51bWJlclRleHQiLCJtb250aFRleHQiLCJvblRleHQiLCJvY2N1cnJlbmNlc1RleHQiLCJzdW1tYXJ5VGV4dCIsIndlZWtEYXlzVGV4dCIsInN1bmRheSIsIm1vbmRheSIsInR1ZXNkYXkiLCJ3ZWRuZXNkYXkiLCJ0aHVyc2RheSIsImZyaWRheSIsInNhdHVyZGF5IiwibW9udGhzVGV4dCIsImphbnVhcnkiLCJmZWJydWFyeSIsIm1hcmNoIiwiYXByaWwiLCJtYXkiLCJqdW5lIiwianVseSIsImF1Z3VzdCIsInNlcHRlbWJlciIsIm9jdG9iZXIiLCJub3ZlbWJlciIsImRlY2VtYmVyIiwiZnJlcXVlbmN5T3B0aW9uc1RleHQiLCJkYWlseVRleHQiLCJ3ZWVrbHlUZXh0IiwibW9udGhseVRleHQiLCJ5ZWFybHlUZXh0IiwicmVjdXJyaW5nRnJlcXVlbmN5VGV4dCIsImZyZXF1ZW5jeUludGVydmFsVGV4dCIsInllc1RleHQiLCJub1RleHQiLCJ0aXRsZVRleHQiLCJ3ZWVrbHlGcmVxdWVuY3lTaW5nbGVBZnRlckNvbXBsZXRpb24iLCJ3ZWVrbHlGcmVxdWVuY3lTaW5nbGUiLCJ3ZWVrbHlGcmVxdWVuY3lBZnRlckNvbXBsZXRpb24iLCJ3ZWVrbHlGcmVxdWVuY3kiLCJtb250aGx5RnJlcXVlbmN5QWZ0ZXJDb21wbGV0aW9uIiwibW9udGhseUZyZXF1ZW5jeSIsIm1vbnRobHlGcmVxdWVuY3lPcmRpbmFsQWZ0ZXJDb21wbGV0aW9uIiwibW9udGhseUZyZXF1ZW5jeU9yZGluYWwiLCJkYWlseUZyZXF1ZW5jeUFmdGVyQ29tcGxldGlvbiIsImRhaWx5RnJlcXVlbmN5Iiwic3RhcnRpbmdUaW1lbGVzc0Zvcm1hdFRleHQiLCJtb250aE5hbWVzIiwibW9tZW50IiwibW9udGhzU2hvcnQiLCJpZCIsImluaXQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJjb25uZWN0IiwiZmllbGRzIiwiQWZ0ZXJDb21wbGV0aW9uIiwib25BZnRlckNvbXBsZXRpb25DaGFuZ2UiLCJJbnRlcnZhbCIsIm9uSW50ZXJ2YWxDaGFuZ2UiLCJSZWN1ckl0ZXJhdGlvbnMiLCJvblJlY3VySXRlcmF0aW9uc0NoYW5nZSIsIkVuZERhdGUiLCJvbkVuZERhdGVDaGFuZ2UiLCJTY2FsZSIsIm9uU2NhbGVDaGFuZ2UiLCJEYXkiLCJvbkRheUNoYW5nZSIsIldlZWtkYXlzIiwib25TdGFydERhdGVDaGFuZ2UiLCJPcmRXZWVrZGF5IiwiT3JkV2VlayIsIk9yZE1vbnRoIiwiZGlzYWJsZSIsInJlc2V0VUkiLCJycCIsInBhcnNlSW50IiwiUmVjdXJQZXJpb2QiLCJnZXRWYWx1ZSIsInN0YXJ0RGF0ZSIsIlN0YXJ0RGF0ZSIsImludGVydmFsIiwiUmVjdXJQZXJpb2RTcGVjIiwic2hvd3RoZXNlIiwiaXNBZnRlckNvbXBsZXRpb24iLCJSZWN1cnJlbmNlU3RhdGUiLCJzZXRWYWx1ZSIsImZvcm1hdFdlZWtkYXlzIiwiZW50cnkiLCJkYXRhIiwiY3JlYXRlT3JkRGF0YSIsImZvcm1hdFNpbmdsZVdlZWtkYXkiLCJnZXREYXkiLCJpIiwiaW5kZXhPZiIsInNob3ciLCJoaWRlIiwiU3VtbWFyeSIsImdldFJlY3VyUGVyaW9kU3BlYyIsInN1bW1hcml6ZSIsInRvU3RyaW5nIiwiZ2V0UmVjdXJyZW5jZSIsImdldFBhbmVsIiwidmFsdWUiLCJkZWZhdWx0SXRlcmF0aW9ucyIsImZpZWxkIiwiY3VycmVudFNwZWMiLCJ0aGVWYWx1ZSIsImNhbGNFbmREYXRlIiwidG9EYXRlIiwibmV3RW5kRGF0ZSIsIml0ZXJhdGlvbnMiLCJjYWxjUmVjdXJJdGVyYXRpb25zIiwibWF4VmFsdWUiLCJkYXlzSW5Nb250aCIsInNldERhdGUiLCJnZXREYXRlIiwid2Vla2RheXMiLCJnZXRXZWVrZGF5cyIsInBhbmVsIiwia2V5Iiwid2Vla2RheSIsIm9yZFdlZWsiLCJuYW1lIiwid2QiLCJzZXRNb250aCIsImNhbGNEYXRlT2ZOdGhXZWVrZGF5Iiwid2Vla0RhdGEiLCIka2V5IiwiJHJlc291cmNlcyIsImlzTmFOIiwiYWZ0ZXJDb21wbGV0aW9uIiwicmVjdXJQZXJpb2QiLCJnZXRNb250aCIsInNlbGVjdGlvbnMiLCJ2YWx1ZXMiLCJwdXNoIiwiam9pbiIsInNlbGVjdGlvbiIsIiRkZXNjcmlwdG9yIiwiZm9ybWF0TW9udGgiLCJmb3JtYXRPcmQiLCJvcmRUZXh0IiwicHJlc2VsZWN0V2Vla2RheXMiLCJwcmV2aW91c1NlbGVjdGlvbnMiLCJsZW5ndGgiLCJjcmVhdGVTY2FsZURhdGEiLCJsaXN0Iiwib3B0IiwiaGFzT3duUHJvcGVydHkiLCJjcmVhdGVXZWVrZGF5c0RhdGEiLCJmb3JFYWNoIiwiaWR4IiwiY3JlYXRlTW9udGhzRGF0YSIsImRheSIsIm9yZCIsInN1YnN0aXR1dGUiLCJzZXRWYWx1ZXMiLCJhcmdvcyIsIkNvbnZlcnQiLCJ0b0RhdGVGcm9tU3RyaW5nIiwiUmVjdXJyaW5nIiwidGVzdCIsImdldE9yZCIsIndlZWsiLCJtb250aCIsImdldFZhbHVlcyIsIm8iLCJjcmVhdGVMYXlvdXQiLCJsYXlvdXQiLCJsYWJlbCIsInByb3BlcnR5IiwiZXhjbHVkZSIsInR5cGUiLCJyZWFkb25seSIsImRhdGVGb3JtYXRUZXh0Iiwic3RhcnRpbmdGb3JtYXRUZXh0IiwidGl0bGUiLCJ2aWV3IiwiaW5wdXRUeXBlIiwibm90aWZpY2F0aW9uVHJpZ2dlciIsIm9mZlRleHQiLCJ0ZXh0UmVuZGVyZXIiLCJiaW5kRGVsZWdhdGUiLCJzaW5nbGVTZWxlY3QiLCJmb3JtYXRWYWx1ZSIsImluY2x1ZGUiLCJib29sIiwidGltZWxlc3MiLCJzaG93VGltZVBpY2tl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QkFBUyxJQU5SO0FBT0ROLDZCQUFxQjtBQVBwQixPQTdGa0MsRUFxR2xDO0FBQ0RQLGNBQU0sUUFETDtBQUVEbEQsY0FBTSxhQUZMO0FBR0RnRCxrQkFBVSxhQUhUO0FBSURlLGlCQUFTO0FBSlIsT0FyR2tDLEVBMEdsQztBQUNEYixjQUFNLFFBREw7QUFFRGxELGNBQU0saUJBRkw7QUFHRGdELGtCQUFVLGlCQUhUO0FBSURlLGlCQUFTO0FBSlIsT0ExR2tDLEVBK0dsQztBQUNEYixjQUFNLFFBREw7QUFFRGxELGNBQU0saUJBRkw7QUFHRGdELGtCQUFVLGlCQUhUO0FBSURlLGlCQUFTO0FBSlIsT0EvR2tDLEVBb0hsQztBQUNEYixjQUFNLFFBREw7QUFFRGxELGNBQU0sV0FGTDtBQUdEZ0Qsa0JBQVUsV0FIVDtBQUlEZSxpQkFBUyxJQUpSO0FBS0RELHFCQUFhLGlCQUFPRTtBQUxuQixPQXBIa0MsRUEwSGxDO0FBQ0RqQixlQUFPLEtBQUtoTCxVQURYO0FBRURpSSxjQUFNLFNBRkw7QUFHRGdELGtCQUFVLFNBSFQ7QUFJREUsY0FBTSxNQUpMO0FBS0RlLGtCQUFVLEtBTFQ7QUFNREMsd0JBQWdCLEtBTmY7QUFPRGQsd0JBQWdCLEtBQUtqSSwwQkFQcEI7QUFRRGdKLGtCQUFXLElBQUlDLElBQUosQ0FBUyxJQUFULEVBQWUsQ0FBZixFQUFrQixDQUFsQixDQVJWO0FBU0RDLG1CQUFXLENBQ1Qsb0JBQVVDLE1BREQsRUFFVCxvQkFBVUMsYUFGRDtBQVRWLE9BMUhrQyxDQUE5QixDQUFQO0FBd0lEO0FBcm9CNkQsR0FBaEQsQ0FBaEI7O29CQXdvQmUxTSxPIiwiZmlsZSI6IlJlY3VycmluZy5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnLi4vLi4vRm9ybWF0JztcclxuaW1wb3J0IHZhbGlkYXRvciBmcm9tICcuLi8uLi9WYWxpZGF0b3InO1xyXG5pbXBvcnQgRWRpdCBmcm9tICdhcmdvcy9FZGl0JztcclxuaW1wb3J0IHJlY3VyIGZyb20gJy4uLy4uL1JlY3VycmVuY2UnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCBzdHJpbmcgZnJvbSAnZG9qby9zdHJpbmcnO1xyXG5cclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2FjdGl2aXR5UmVjdXJyaW5nJyk7XHJcbmNvbnN0IGR0Rm9ybWF0UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYWN0aXZpdHlFZGl0RGF0ZVRpbWVGb3JtYXQnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLkFjdGl2aXR5LlJlY3VycmluZ1xyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5FZGl0XHJcbiAqXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5FZGl0XHJcbiAqIEByZXF1aXJlcyBhcmdvcy5VdGlsaXR5XHJcbiAqXHJcbiAqIEByZXF1aXJlcyBjcm0uRm9ybWF0XHJcbiAqIEByZXF1aXJlcyBjcm0uVmFsaWRhdG9yXHJcbiAqIEByZXF1aXJlcyBjcm0uUmVjdXJyZW5jZVxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgbW9tZW50XHJcbiAqXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLkFjdGl2aXR5LlJlY3VycmluZycsIFtFZGl0XSwge1xyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHN0YXJ0aW5nVGV4dDogcmVzb3VyY2Uuc3RhcnRpbmdUZXh0LFxyXG4gIGVuZGluZ1RleHQ6IHJlc291cmNlLmVuZGluZ1RleHQsXHJcbiAgcmVwZWF0c1RleHQ6IHJlc291cmNlLnJlcGVhdHNUZXh0LFxyXG4gIGV2ZXJ5VGV4dDogcmVzb3VyY2UuZXZlcnlUZXh0LFxyXG4gIGFmdGVyQ29tcGxldGlvblRleHQ6IHJlc291cmNlLmFmdGVyQ29tcGxldGlvblRleHQsXHJcbiAgc2luZ2xlV2Vla2RheVRleHQ6IHJlc291cmNlLnNpbmdsZVdlZWtkYXlUZXh0LFxyXG4gIHdlZWtkYXlzVGV4dDogcmVzb3VyY2Uud2Vla2RheXNUZXh0LFxyXG4gIGRheU51bWJlclRleHQ6IHJlc291cmNlLmRheU51bWJlclRleHQsXHJcbiAgbW9udGhUZXh0OiByZXNvdXJjZS5tb250aFRleHQsXHJcbiAgb25UZXh0OiByZXNvdXJjZS5vblRleHQsXHJcbiAgb2NjdXJyZW5jZXNUZXh0OiByZXNvdXJjZS5vY2N1cnJlbmNlc1RleHQsXHJcbiAgc3VtbWFyeVRleHQ6IHJlc291cmNlLnN1bW1hcnlUZXh0LFxyXG4gIHdlZWtEYXlzVGV4dDogW1xyXG4gICAgcmVzb3VyY2Uuc3VuZGF5LFxyXG4gICAgcmVzb3VyY2UubW9uZGF5LFxyXG4gICAgcmVzb3VyY2UudHVlc2RheSxcclxuICAgIHJlc291cmNlLndlZG5lc2RheSxcclxuICAgIHJlc291cmNlLnRodXJzZGF5LFxyXG4gICAgcmVzb3VyY2UuZnJpZGF5LFxyXG4gICAgcmVzb3VyY2Uuc2F0dXJkYXksXHJcbiAgXSxcclxuICBtb250aHNUZXh0OiBbXHJcbiAgICByZXNvdXJjZS5qYW51YXJ5LFxyXG4gICAgcmVzb3VyY2UuZmVicnVhcnksXHJcbiAgICByZXNvdXJjZS5tYXJjaCxcclxuICAgIHJlc291cmNlLmFwcmlsLFxyXG4gICAgcmVzb3VyY2UubWF5LFxyXG4gICAgcmVzb3VyY2UuanVuZSxcclxuICAgIHJlc291cmNlLmp1bHksXHJcbiAgICByZXNvdXJjZS5hdWd1c3QsXHJcbiAgICByZXNvdXJjZS5zZXB0ZW1iZXIsXHJcbiAgICByZXNvdXJjZS5vY3RvYmVyLFxyXG4gICAgcmVzb3VyY2Uubm92ZW1iZXIsXHJcbiAgICByZXNvdXJjZS5kZWNlbWJlcixcclxuICBdLFxyXG4gIGZyZXF1ZW5jeU9wdGlvbnNUZXh0OiBbXHJcbiAgICByZXNvdXJjZS5kYWlseVRleHQsXHJcbiAgICByZXNvdXJjZS53ZWVrbHlUZXh0LFxyXG4gICAgcmVzb3VyY2UubW9udGhseVRleHQsXHJcbiAgICByZXNvdXJjZS55ZWFybHlUZXh0LFxyXG4gIF0sXHJcbiAgcmVjdXJyaW5nRnJlcXVlbmN5VGV4dDogcmVzb3VyY2UucmVjdXJyaW5nRnJlcXVlbmN5VGV4dCxcclxuICBmcmVxdWVuY3lJbnRlcnZhbFRleHQ6IHJlc291cmNlLmZyZXF1ZW5jeUludGVydmFsVGV4dCxcclxuICB5ZXNUZXh0OiByZXNvdXJjZS55ZXNUZXh0LFxyXG4gIG5vVGV4dDogcmVzb3VyY2Uubm9UZXh0LFxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIHdlZWtseUZyZXF1ZW5jeVNpbmdsZUFmdGVyQ29tcGxldGlvbjogcmVzb3VyY2Uud2Vla2x5RnJlcXVlbmN5U2luZ2xlQWZ0ZXJDb21wbGV0aW9uLFxyXG4gIHdlZWtseUZyZXF1ZW5jeVNpbmdsZTogcmVzb3VyY2Uud2Vla2x5RnJlcXVlbmN5U2luZ2xlLFxyXG4gIHdlZWtseUZyZXF1ZW5jeUFmdGVyQ29tcGxldGlvbjogcmVzb3VyY2Uud2Vla2x5RnJlcXVlbmN5QWZ0ZXJDb21wbGV0aW9uLFxyXG4gIHdlZWtseUZyZXF1ZW5jeTogcmVzb3VyY2Uud2Vla2x5RnJlcXVlbmN5LFxyXG4gIG1vbnRobHlGcmVxdWVuY3lBZnRlckNvbXBsZXRpb246IHJlc291cmNlLm1vbnRobHlGcmVxdWVuY3lBZnRlckNvbXBsZXRpb24sXHJcbiAgbW9udGhseUZyZXF1ZW5jeTogcmVzb3VyY2UubW9udGhseUZyZXF1ZW5jeSxcclxuICBtb250aGx5RnJlcXVlbmN5T3JkaW5hbEFmdGVyQ29tcGxldGlvbjogcmVzb3VyY2UubW9udGhseUZyZXF1ZW5jeU9yZGluYWxBZnRlckNvbXBsZXRpb24sXHJcbiAgbW9udGhseUZyZXF1ZW5jeU9yZGluYWw6IHJlc291cmNlLm1vbnRobHlGcmVxdWVuY3lPcmRpbmFsLFxyXG4gIGRhaWx5RnJlcXVlbmN5QWZ0ZXJDb21wbGV0aW9uOiByZXNvdXJjZS5kYWlseUZyZXF1ZW5jeUFmdGVyQ29tcGxldGlvbixcclxuICBkYWlseUZyZXF1ZW5jeTogcmVzb3VyY2UuZGFpbHlGcmVxdWVuY3ksXHJcbiAgc3RhcnRpbmdUaW1lbGVzc0Zvcm1hdFRleHQ6IGR0Rm9ybWF0UmVzb3VyY2Uuc3RhcnRpbmdUaW1lbGVzc0Zvcm1hdFRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIG1vbnRoTmFtZXM6IG1vbWVudC5tb250aHNTaG9ydCxcclxuXHJcbiAgaWQ6ICdyZWN1cnJlbmNlX2VkaXQnLFxyXG5cclxuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoaW5pdCwgYXJndW1lbnRzKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5BZnRlckNvbXBsZXRpb24sICdvbkNoYW5nZScsIHRoaXMub25BZnRlckNvbXBsZXRpb25DaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLkludGVydmFsLCAnb25DaGFuZ2UnLCB0aGlzLm9uSW50ZXJ2YWxDaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLlJlY3VySXRlcmF0aW9ucywgJ29uQ2hhbmdlJywgdGhpcy5vblJlY3VySXRlcmF0aW9uc0NoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuRW5kRGF0ZSwgJ29uQ2hhbmdlJywgdGhpcy5vbkVuZERhdGVDaGFuZ2UpO1xyXG4gICAgLy8gdGhlc2UgYWZmZWN0IHRoZSBTdGFydERhdGU6XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuU2NhbGUsICdvbkNoYW5nZScsIHRoaXMub25TY2FsZUNoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuRGF5LCAnb25DaGFuZ2UnLCB0aGlzLm9uRGF5Q2hhbmdlKTsgLy8gRGF5IG9mIHRoZSBtb250aFxyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLldlZWtkYXlzLCAnb25DaGFuZ2UnLCB0aGlzLm9uU3RhcnREYXRlQ2hhbmdlKTsgLy8gT25lIG9yIG1vcmUgZGF5cyBvbiBXZWVrbHkgb3B0aW9uc1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLk9yZFdlZWtkYXksICdvbkNoYW5nZScsIHRoaXMub25TdGFydERhdGVDaGFuZ2UpOyAvLyBTaW5nbGUgZGF5IG9mIHdlZWtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5PcmRXZWVrLCAnb25DaGFuZ2UnLCB0aGlzLm9uU3RhcnREYXRlQ2hhbmdlKTsgLy8gMXN0Li5sYXN0IHdlZWsgb2YgbW9udGgsIG9yIG9uIERheSAjXHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuT3JkTW9udGgsICdvbkNoYW5nZScsIHRoaXMub25TdGFydERhdGVDaGFuZ2UpOyAvLyBNb250aCBvZiB5ZWFyXHJcbiAgICB0aGlzLmZpZWxkcy5FbmREYXRlLmRpc2FibGUoKTtcclxuICB9LFxyXG4gIHJlc2V0VUk6IGZ1bmN0aW9uIHJlc2V0VUkoKSB7XHJcbiAgICAvLyBoaWRlIG9yIHJldmVhbCBhbmQgc2V0IGZpZWxkcyBhY2NvcmRpbmcgdG8gcGFuZWwvUmVjdXJQZXJpb2RcclxuICAgIGNvbnN0IHJwID0gcGFyc2VJbnQodGhpcy5maWVsZHMuUmVjdXJQZXJpb2QuZ2V0VmFsdWUoKSwgMTApO1xyXG4gICAgY29uc3Qgc3RhcnREYXRlID0gdGhpcy5maWVsZHMuU3RhcnREYXRlLmdldFZhbHVlKCk7XHJcbiAgICBjb25zdCBpbnRlcnZhbCA9IHRoaXMuZmllbGRzLlJlY3VyUGVyaW9kU3BlYy5nZXRWYWx1ZSgpICUgNjU1MzY7XHJcbiAgICBsZXQgc2hvd3RoZXNlID0gJ0ludGVydmFsLEFmdGVyQ29tcGxldGlvbiwnO1xyXG5cclxuICAgIGlmICghcmVjdXIuaXNBZnRlckNvbXBsZXRpb24ocnApKSB7XHJcbiAgICAgIHNob3d0aGVzZSArPSAnUmVjdXJJdGVyYXRpb25zLEVuZERhdGUsJztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmZpZWxkcy5SZWN1cnJlbmNlU3RhdGUuc2V0VmFsdWUoJ3JzdE1hc3RlcicpOyAvLyB1bmRvbmUgd2hlbiBPbmNlIHBhbmVsIHNlbGVjdGVkXHJcblxyXG4gICAgLy8gZGV0ZXJtaW5lIHdoaWNoIGZpZWxkcyB0byBoaWRlIGFjY29yZGluZyB0byBwYW5lbFxyXG4gICAgc3dpdGNoIChycCkge1xyXG4gICAgICBjYXNlIDA6XHJcbiAgICAgICAgLy8gZGFpbHlcclxuICAgICAgY2FzZSAxOiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMjpcclxuICAgICAgICAvLyB3ZWVrbHlcclxuICAgICAgICBzaG93dGhlc2UgKz0gJ1dlZWtkYXlzLCc7XHJcbiAgICAgICAgdGhpcy5mb3JtYXRXZWVrZGF5cyh0aGlzLmVudHJ5LldlZWtkYXlzKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAzOlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDQ6XHJcbiAgICAgICAgLy8gbW9udGhseVxyXG4gICAgICAgIHNob3d0aGVzZSArPSAnRGF5LE9yZFdlZWsnO1xyXG4gICAgICAgIGlmICh0aGlzLmVudHJ5ICYmIHRoaXMuZW50cnkuU3RhcnREYXRlKSB7XHJcbiAgICAgICAgICB0aGlzLmZpZWxkcy5PcmRXZWVrLmRhdGEgPSB0aGlzLmNyZWF0ZU9yZERhdGEodGhpcy5mb3JtYXRTaW5nbGVXZWVrZGF5KHRoaXMuZW50cnkuU3RhcnREYXRlLmdldERheSgpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDU6XHJcbiAgICAgICAgc2hvd3RoZXNlICs9ICdPcmRXZWVrLE9yZFdlZWtkYXksJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSA2OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDc6XHJcbiAgICAgICAgLy8geWVhcmx5XHJcbiAgICAgICAgc2hvd3RoZXNlICs9ICdEYXksT3JkV2VlayxPcmRNb250aCc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgODpcclxuICAgICAgICBzaG93dGhlc2UgKz0gJ09yZFdlZWssT3JkV2Vla2RheSxPcmRNb250aCwnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDk6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgLy8gb25jZVxyXG4gICAgICAgIHNob3d0aGVzZSA9ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3QgaSBpbiB0aGlzLmZpZWxkcykge1xyXG4gICAgICBpZiAoc2hvd3RoZXNlLmluZGV4T2YoaSkgPj0gMCkge1xyXG4gICAgICAgIHRoaXMuZmllbGRzW2ldLnNob3coKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmZpZWxkc1tpXS5oaWRlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGFsd2F5cyBzaG93IHRoZXNlOlxyXG4gICAgaWYgKHJwID49IDApIHtcclxuICAgICAgdGhpcy5maWVsZHMuU2NhbGUuc2hvdygpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5maWVsZHMuU3VtbWFyeS5zaG93KCk7XHJcblxyXG4gICAgLy8gcmVmcmVzaCBzb21lIGZpZWxkIHZhbHVlc1xyXG4gICAgdGhpcy5maWVsZHMuUmVjdXJQZXJpb2Quc2V0VmFsdWUocnApO1xyXG4gICAgdGhpcy5maWVsZHMuUmVjdXJQZXJpb2RTcGVjLnNldFZhbHVlKHJlY3VyLmdldFJlY3VyUGVyaW9kU3BlYyhycCwgc3RhcnREYXRlLCB0aGlzLmVudHJ5LldlZWtkYXlzLCBpbnRlcnZhbCkpO1xyXG5cclxuICAgIHRoaXMuc3VtbWFyaXplKCk7XHJcbiAgfSxcclxuICBzdW1tYXJpemU6IGZ1bmN0aW9uIHN1bW1hcml6ZSgpIHtcclxuICAgIHRoaXMuZmllbGRzLlN1bW1hcnkuc2V0VmFsdWUocmVjdXIudG9TdHJpbmcodGhpcy5nZXRSZWN1cnJlbmNlKCkpKTtcclxuICAgIHRoaXMuZmllbGRzLlNjYWxlLnNldFZhbHVlKHJlY3VyLmdldFBhbmVsKHBhcnNlSW50KHRoaXMuZmllbGRzLlJlY3VyUGVyaW9kLmdldFZhbHVlKCksIDEwKSwgdHJ1ZSkpO1xyXG4gIH0sXHJcbiAgb25BZnRlckNvbXBsZXRpb25DaGFuZ2U6IGZ1bmN0aW9uIG9uQWZ0ZXJDb21wbGV0aW9uQ2hhbmdlKHZhbHVlKSB7XHJcbiAgICBsZXQgcnAgPSBwYXJzZUludCh0aGlzLmZpZWxkcy5SZWN1clBlcmlvZC5nZXRWYWx1ZSgpLCAxMCk7XHJcblxyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHJwICs9ICgnMDI1OCcuaW5kZXhPZihycCkgPj0gMCkgPyAxIDogMjtcclxuICAgICAgdGhpcy5maWVsZHMuUmVjdXJJdGVyYXRpb25zLnNldFZhbHVlKC0xKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICgnNjknLmluZGV4T2YocnApID49IDApIHtcclxuICAgICAgICBpZiAocGFyc2VJbnQodGhpcy5maWVsZHMuT3JkV2Vlay5nZXRWYWx1ZSgpLCAxMCkpIHtcclxuICAgICAgICAgIHJwIC09IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJwIC09IDI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJwIC09IDE7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5maWVsZHMuUmVjdXJJdGVyYXRpb25zLnNldFZhbHVlKHRoaXMuZW50cnkuUmVjdXJJdGVyYXRpb25zID4gMCA/IHRoaXMuZW50cnkuUmVjdXJJdGVyYXRpb25zIDogcmVjdXIuZGVmYXVsdEl0ZXJhdGlvbnNbcnBdKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmZpZWxkcy5SZWN1clBlcmlvZC5zZXRWYWx1ZShycCk7XHJcbiAgICB0aGlzLnJlc2V0VUkoKTtcclxuICB9LFxyXG4gIG9uSW50ZXJ2YWxDaGFuZ2U6IGZ1bmN0aW9uIG9uSW50ZXJ2YWxDaGFuZ2UodmFsdWUsIGZpZWxkKSB7XHJcbiAgICBjb25zdCBjdXJyZW50U3BlYyA9IHBhcnNlSW50KHRoaXMuZmllbGRzLlJlY3VyUGVyaW9kU3BlYy5nZXRWYWx1ZSgpLCAxMCk7XHJcbiAgICBjb25zdCBpbnRlcnZhbCA9IGN1cnJlbnRTcGVjICUgNjU1MzY7XHJcblxyXG4gICAgY29uc3QgdGhlVmFsdWUgPSBwYXJzZUludCh2YWx1ZSwgMTApO1xyXG4gICAgaWYgKHRoZVZhbHVlICYmIHRoZVZhbHVlID4gMCkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5SZWN1clBlcmlvZFNwZWMuc2V0VmFsdWUoY3VycmVudFNwZWMgLSBpbnRlcnZhbCArIHBhcnNlSW50KHRoZVZhbHVlLCAxMCkpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5FbmREYXRlLnNldFZhbHVlKHJlY3VyLmNhbGNFbmREYXRlKHRoaXMuZmllbGRzLlN0YXJ0RGF0ZS5nZXRWYWx1ZSgpLCB0aGlzLmdldFJlY3VycmVuY2UoKSkudG9EYXRlKCkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gSW52YWxpZCBpbnB1dCwgcmVzZXQgdG8gY3VycmVudCBJbnRlcnZhbFxyXG4gICAgICBmaWVsZC5zZXRWYWx1ZShpbnRlcnZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zdW1tYXJpemUoKTtcclxuICB9LFxyXG4gIG9uUmVjdXJJdGVyYXRpb25zQ2hhbmdlOiBmdW5jdGlvbiBvblJlY3VySXRlcmF0aW9uc0NoYW5nZSh2YWx1ZSkge1xyXG4gICAgY29uc3QgdGhlVmFsdWUgPSBwYXJzZUludCh2YWx1ZSwgMTApO1xyXG4gICAgaWYgKHRoZVZhbHVlICYmIHRoZVZhbHVlID4gMCkge1xyXG4gICAgICB0aGlzLmVudHJ5LlJlY3VySXRlcmF0aW9ucyA9IHZhbHVlO1xyXG4gICAgICBjb25zdCBuZXdFbmREYXRlID0gcmVjdXIuY2FsY0VuZERhdGUodGhpcy5maWVsZHMuU3RhcnREYXRlLmdldFZhbHVlKCksIHRoaXMuZ2V0UmVjdXJyZW5jZSgpKS50b0RhdGUoKTtcclxuXHJcbiAgICAgIGlmIChuZXdFbmREYXRlICE9PSB0aGlzLmZpZWxkcy5FbmREYXRlLmdldFZhbHVlKCkpIHtcclxuICAgICAgICB0aGlzLmZpZWxkcy5FbmREYXRlLnNldFZhbHVlKG5ld0VuZERhdGUpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBJbnZhbGlkIGlucHV0LCByZXNldCB0byB2YWx1ZSBjYWxjdWxhdGVkIGZyb20gRW5kRGF0ZVxyXG4gICAgICB0aGlzLm9uRW5kRGF0ZUNoYW5nZSh0aGlzLmZpZWxkcy5FbmREYXRlLmdldFZhbHVlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3VtbWFyaXplKCk7XHJcbiAgfSxcclxuICBvbkVuZERhdGVDaGFuZ2U6IGZ1bmN0aW9uIG9uRW5kRGF0ZUNoYW5nZSh2YWx1ZSkge1xyXG4gICAgaWYgKHZhbHVlID49IHRoaXMuZmllbGRzLlN0YXJ0RGF0ZS5nZXRWYWx1ZSgpKSB7XHJcbiAgICAgIGNvbnN0IGl0ZXJhdGlvbnMgPSByZWN1ci5jYWxjUmVjdXJJdGVyYXRpb25zKFxyXG4gICAgICAgIHZhbHVlLFxyXG4gICAgICAgIHRoaXMuZmllbGRzLlN0YXJ0RGF0ZS5nZXRWYWx1ZSgpLFxyXG4gICAgICAgIHRoaXMuZmllbGRzLkludGVydmFsLmdldFZhbHVlKCksXHJcbiAgICAgICAgdGhpcy5maWVsZHMuUmVjdXJQZXJpb2QuZ2V0VmFsdWUoKVxyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYgKGl0ZXJhdGlvbnMgIT09IHBhcnNlSW50KHRoaXMuZmllbGRzLlJlY3VySXRlcmF0aW9ucy5nZXRWYWx1ZSgpLCAxMCkpIHtcclxuICAgICAgICB0aGlzLmZpZWxkcy5SZWN1ckl0ZXJhdGlvbnMuc2V0VmFsdWUoaXRlcmF0aW9ucyk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGNhbid0IGVuZCBiZWZvcmUgc3RhcnQhIHJlc2V0LlxyXG4gICAgICB0aGlzLm9uUmVjdXJJdGVyYXRpb25zQ2hhbmdlKHRoaXMuZmllbGRzLlJlY3VySXRlcmF0aW9ucy5nZXRWYWx1ZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnN1bW1hcml6ZSgpO1xyXG4gIH0sXHJcbiAgb25EYXlDaGFuZ2U6IGZ1bmN0aW9uIG9uRGF5Q2hhbmdlKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgY29uc3Qgc3RhcnREYXRlID0gdGhpcy5maWVsZHMuU3RhcnREYXRlLmdldFZhbHVlKCk7XHJcbiAgICBjb25zdCBtYXhWYWx1ZSA9IG1vbWVudChzdGFydERhdGUpLmRheXNJbk1vbnRoKCk7XHJcblxyXG4gICAgaWYgKHZhbHVlID4gMCAmJiB2YWx1ZSA8PSBtYXhWYWx1ZSkge1xyXG4gICAgICBzdGFydERhdGUuc2V0RGF0ZSh2YWx1ZSk7XHJcbiAgICB9IGVsc2UgeyAvLyByZXNldCBmaWVsZCB0byBhY2NlcHRhYmxlIHZhbHVlXHJcbiAgICAgIGlmICh2YWx1ZSA+IDApIHtcclxuICAgICAgICBzdGFydERhdGUuc2V0RGF0ZShtYXhWYWx1ZSk7XHJcbiAgICAgIH1cclxuICAgICAgZmllbGQuc2V0VmFsdWUoc3RhcnREYXRlLmdldERhdGUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5maWVsZHMuU3RhcnREYXRlLnNldFZhbHVlKHN0YXJ0RGF0ZSk7XHJcbiAgICAvLyB3ZWVrZGF5KHMpL29yZFdlZWsvRW5kRGF0ZSBtYXkgbmVlZCBhZGp1c3RpbmdcclxuICAgIHRoaXMub25TdGFydERhdGVDaGFuZ2UodmFsdWUsIGZpZWxkKTtcclxuICB9LFxyXG4gIG9uU3RhcnREYXRlQ2hhbmdlOiBmdW5jdGlvbiBvblN0YXJ0RGF0ZUNoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIC8vIHdoZW4gZmllbGQgYWx0ZXJzIFN0YXJ0RGF0ZSwgb3RoZXIgZmllbGRzIG5lZWQgdG8gYmUgYWRqdXN0ZWRcclxuICAgIGNvbnN0IHdlZWtkYXlzID0gcmVjdXIuZ2V0V2Vla2RheXMocGFyc2VJbnQodGhpcy5maWVsZHMuUmVjdXJQZXJpb2RTcGVjLmdldFZhbHVlKCksIDEwKSk7XHJcbiAgICBjb25zdCBwYW5lbCA9IHBhcnNlSW50KHRoaXMuZmllbGRzLlJlY3VyUGVyaW9kLmdldFZhbHVlKCksIDEwKTtcclxuICAgIGNvbnN0IHRoZVZhbHVlID0gcGFyc2VJbnQodmFsdWUua2V5IHx8IHZhbHVlLCAxMCk7XHJcbiAgICBsZXQgc3RhcnREYXRlID0gdGhpcy5maWVsZHMuU3RhcnREYXRlLmdldFZhbHVlKCk7XHJcbiAgICBsZXQgd2Vla2RheSA9IHN0YXJ0RGF0ZS5nZXREYXkoKTtcclxuICAgIGxldCBvcmRXZWVrID0gcGFyc2VJbnQoKChzdGFydERhdGUuZ2V0RGF0ZSgpIC0gMSkgLyA3KSwgMTApICsgMTtcclxuXHJcbiAgICBzd2l0Y2ggKGZpZWxkLm5hbWUpIHtcclxuICAgICAgY2FzZSAnV2Vla2RheXMnOlxyXG4gICAgICAgIC8vIG9ubHkgY2hhbmdlIFN0YXJ0RGF0ZSBpZiBvcmlnaW5hbCB3ZWVrZGF5IG5vdCBpbmNsdWRlZFxyXG4gICAgICAgIGZvciAobGV0IHdkID0gMDsgd2QgPCA3OyB3ZCsrKSB7XHJcbiAgICAgICAgICBpZiAod2Vla2RheXNbd2RdICYmICF3ZWVrZGF5c1t3ZWVrZGF5XSkge1xyXG4gICAgICAgICAgICB3ZWVrZGF5ID0gd2Q7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnT3JkV2Vla2RheSc6XHJcbiAgICAgICAgd2Vla2RheSA9IHRoZVZhbHVlO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdPcmRXZWVrJzpcclxuICAgICAgICBpZiAodGhlVmFsdWUpIHtcclxuICAgICAgICAgIG9yZFdlZWsgPSB0aGVWYWx1ZTtcclxuICAgICAgICAgIGlmIChwYW5lbCA9PT0gNCB8fCBwYW5lbCA9PT0gNykge1xyXG4gICAgICAgICAgICB0aGlzLmZpZWxkcy5SZWN1clBlcmlvZC5zZXRWYWx1ZShwYW5lbCArIDEpO1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0VUkoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHBhbmVsID09PSA1IHx8IHBhbmVsID09PSA4KSB7XHJcbiAgICAgICAgICB0aGlzLmZpZWxkcy5SZWN1clBlcmlvZC5zZXRWYWx1ZShwYW5lbCAtIDEpO1xyXG4gICAgICAgICAgdGhpcy5yZXNldFVJKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdPcmRNb250aCc6XHJcbiAgICAgICAgc3RhcnREYXRlLnNldE1vbnRoKHRoZVZhbHVlKTtcclxuICAgICAgICB3ZWVrZGF5ID0gc3RhcnREYXRlLmdldERheSgpO1xyXG4gICAgICAgIG9yZFdlZWsgPSBwYXJzZUludCgoKHN0YXJ0RGF0ZS5nZXREYXRlKCkgLSAxKSAvIDcpLnRvU3RyaW5nKCksIDEwKSArIDE7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnREYXRlID0gcmVjdXIuY2FsY0RhdGVPZk50aFdlZWtkYXkoc3RhcnREYXRlLCB3ZWVrZGF5LCBvcmRXZWVrKS50b0RhdGUoKTtcclxuICAgIHRoaXMuZmllbGRzLlN0YXJ0RGF0ZS5zZXRWYWx1ZShzdGFydERhdGUpO1xyXG4gICAgdGhpcy5maWVsZHMuRW5kRGF0ZS5zZXRWYWx1ZShyZWN1ci5jYWxjRW5kRGF0ZShzdGFydERhdGUsIHRoaXMuZ2V0UmVjdXJyZW5jZSgpKS50b0RhdGUoKSk7XHJcbiAgICB0aGlzLmZpZWxkcy5EYXkuc2V0VmFsdWUoc3RhcnREYXRlLmdldERhdGUoKSk7XHJcbiAgICB0aGlzLmZpZWxkcy5PcmRXZWVrZGF5LnNldFZhbHVlKHN0YXJ0RGF0ZS5nZXREYXkoKSk7XHJcblxyXG4gICAgY29uc3Qgd2Vla0RhdGEgPSB0aGlzLmNyZWF0ZU9yZERhdGEodGhpcy5mb3JtYXRTaW5nbGVXZWVrZGF5KHN0YXJ0RGF0ZS5nZXREYXkoKSkpO1xyXG4gICAgdGhpcy5maWVsZHMuT3JkV2Vlay5kYXRhID0gd2Vla0RhdGE7XHJcbiAgICB0aGlzLnN1bW1hcml6ZSgpO1xyXG4gICAgbGV0IGtleSA9IHRoaXMuZmllbGRzLk9yZFdlZWsuZ2V0VmFsdWUoKTtcclxuICAgIGlmICh0eXBlb2Yga2V5ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBrZXkgPSBrZXkuJGtleTtcclxuICAgICAgdGhpcy5maWVsZHMuT3JkV2Vlay5zZXRWYWx1ZSh3ZWVrRGF0YS4kcmVzb3VyY2VzW2tleV0pO1xyXG4gICAgfSBlbHNlIGlmICghaXNOYU4ocGFyc2VJbnQoa2V5LCAxMCkpKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLk9yZFdlZWsuc2V0VmFsdWUod2Vla0RhdGEuJHJlc291cmNlc1trZXldKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uU2NhbGVDaGFuZ2U6IGZ1bmN0aW9uIG9uU2NhbGVDaGFuZ2UodmFsdWUpIHtcclxuICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IHRoaXMuZmllbGRzLlN0YXJ0RGF0ZS5nZXRWYWx1ZSgpO1xyXG4gICAgY29uc3QgYWZ0ZXJDb21wbGV0aW9uID0gdGhpcy5maWVsZHMuQWZ0ZXJDb21wbGV0aW9uLmdldFZhbHVlKCkgPyAxIDogMDtcclxuICAgIGNvbnN0IGludGVydmFsID0gcGFyc2VJbnQodGhpcy5maWVsZHMuSW50ZXJ2YWwuZ2V0VmFsdWUoKSwgMTApO1xyXG4gICAgbGV0IHJlY3VyUGVyaW9kID0gcGFyc2VJbnQodGhpcy5maWVsZHMuUmVjdXJQZXJpb2QuZ2V0VmFsdWUoKSwgMTApO1xyXG5cclxuICAgIHN3aXRjaCAocGFyc2VJbnQodmFsdWUua2V5LCAxMCkpIHtcclxuICAgICAgY2FzZSAwOlxyXG4gICAgICAgIC8vIGRheXNcclxuICAgICAgICBpZiAocmVjdXJQZXJpb2QgPCAyKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlY3VyUGVyaW9kID0gMCArIGFmdGVyQ29tcGxldGlvbjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAxOlxyXG4gICAgICAgIC8vIHdlZWtzXHJcbiAgICAgICAgaWYgKHJlY3VyUGVyaW9kID4gMSAmJiByZWN1clBlcmlvZCA8IDQpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVjdXJQZXJpb2QgPSAyICsgYWZ0ZXJDb21wbGV0aW9uO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDI6XHJcbiAgICAgICAgLy8gbW9udGhzXHJcbiAgICAgICAgaWYgKHJlY3VyUGVyaW9kID4gMyAmJiByZWN1clBlcmlvZCA8IDcpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVjdXJQZXJpb2QgPSA0ICsgYWZ0ZXJDb21wbGV0aW9uICsgYWZ0ZXJDb21wbGV0aW9uO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDM6XHJcbiAgICAgICAgLy8geWVhcnNcclxuICAgICAgICBpZiAocmVjdXJQZXJpb2QgPiA2KSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlY3VyUGVyaW9kID0gNyArIGFmdGVyQ29tcGxldGlvbiArIGFmdGVyQ29tcGxldGlvbjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgIH1cclxuICAgIHRoaXMuZmllbGRzLlJlY3VyUGVyaW9kLnNldFZhbHVlKHJlY3VyUGVyaW9kKTtcclxuICAgIHRoaXMuZmllbGRzLlJlY3VySXRlcmF0aW9ucy5zZXRWYWx1ZShyZWN1ci5kZWZhdWx0SXRlcmF0aW9uc1tyZWN1clBlcmlvZF0pO1xyXG4gICAgdGhpcy5maWVsZHMuUmVjdXJQZXJpb2RTcGVjLnNldFZhbHVlKHJlY3VyLmdldFJlY3VyUGVyaW9kU3BlYyhyZWN1clBlcmlvZCwgc3RhcnREYXRlLCBbXSwgaW50ZXJ2YWwpKTtcclxuICAgIHRoaXMuZmllbGRzLldlZWtkYXlzLnNldFZhbHVlKHJlY3VyLmdldFdlZWtkYXlzKHRoaXMuZmllbGRzLlJlY3VyUGVyaW9kU3BlYy5nZXRWYWx1ZSgpKSk7XHJcbiAgICB0aGlzLmZpZWxkcy5EYXkuc2V0VmFsdWUoc3RhcnREYXRlLmdldERhdGUoKSk7XHJcbiAgICB0aGlzLmZpZWxkcy5PcmRNb250aC5zZXRWYWx1ZShzdGFydERhdGUuZ2V0TW9udGgoKSArIDEpO1xyXG4gICAgdGhpcy5maWVsZHMuT3JkV2Vlay5zZXRWYWx1ZSgwKTtcclxuICAgIHRoaXMuZmllbGRzLkVuZERhdGUuc2V0VmFsdWUocmVjdXIuY2FsY0VuZERhdGUoc3RhcnREYXRlLCB0aGlzLmdldFJlY3VycmVuY2UoKSkudG9EYXRlKCkpO1xyXG5cclxuICAgIHRoaXMucmVzZXRVSSgpO1xyXG4gIH0sXHJcblxyXG4gIGZvcm1hdFdlZWtkYXlzOiBmdW5jdGlvbiBmb3JtYXRXZWVrZGF5cyhzZWxlY3Rpb25zKSB7XHJcbiAgICBjb25zdCB2YWx1ZXMgPSBbXTtcclxuICAgIGNvbnN0IHdlZWtkYXlzID0gWzAsIDAsIDAsIDAsIDAsIDAsIDBdO1xyXG5cclxuICAgIGZvciAoY29uc3Qga2V5IGluIHNlbGVjdGlvbnMpIHtcclxuICAgICAgaWYgKHNlbGVjdGlvbnNba2V5XSkge1xyXG4gICAgICAgIHZhbHVlcy5wdXNoKHRoaXMud2Vla0RheXNUZXh0W2tleV0pO1xyXG4gICAgICAgIHdlZWtkYXlzW2tleV0gPSAxO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmZpZWxkcy5SZWN1clBlcmlvZFNwZWMuc2V0VmFsdWUocmVjdXIuZ2V0UmVjdXJQZXJpb2RTcGVjKFxyXG4gICAgICBwYXJzZUludCh0aGlzLmZpZWxkcy5SZWN1clBlcmlvZC5nZXRWYWx1ZSgpLCAxMCksXHJcbiAgICAgIHRoaXMuZmllbGRzLlN0YXJ0RGF0ZS5nZXRWYWx1ZSgpLFxyXG4gICAgICB3ZWVrZGF5cyxcclxuICAgICAgcGFyc2VJbnQodGhpcy5maWVsZHMuSW50ZXJ2YWwuZ2V0VmFsdWUoKSwgMTApXHJcbiAgICApKTtcclxuXHJcbiAgICB0aGlzLmVudHJ5LldlZWtkYXlzID0gd2Vla2RheXM7XHJcbiAgICByZXR1cm4gdmFsdWVzLmpvaW4oJywgJyk7XHJcbiAgfSxcclxuICBmb3JtYXRTaW5nbGVXZWVrZGF5OiBmdW5jdGlvbiBmb3JtYXRTaW5nbGVXZWVrZGF5KHNlbGVjdGlvbikge1xyXG4gICAgaWYgKHNlbGVjdGlvbi4kZGVzY3JpcHRvcikge1xyXG4gICAgICByZXR1cm4gc2VsZWN0aW9uLiRkZXNjcmlwdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLndlZWtEYXlzVGV4dFtwYXJzZUludChzZWxlY3Rpb24sIDEwKV07XHJcbiAgfSxcclxuICBmb3JtYXRNb250aDogZnVuY3Rpb24gZm9ybWF0TW9udGgoc2VsZWN0aW9uKSB7XHJcbiAgICBpZiAoc2VsZWN0aW9uLiRkZXNjcmlwdG9yKSB7XHJcbiAgICAgIHJldHVybiBzZWxlY3Rpb24uJGRlc2NyaXB0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMubW9udGhzVGV4dFtwYXJzZUludChzZWxlY3Rpb24sIDEwKSAtIDFdO1xyXG4gIH0sXHJcbiAgZm9ybWF0T3JkOiBmdW5jdGlvbiBmb3JtYXRPcmQoc2VsZWN0aW9uKSB7XHJcbiAgICBpZiAoc2VsZWN0aW9uLiRkZXNjcmlwdG9yKSB7XHJcbiAgICAgIHJldHVybiBzZWxlY3Rpb24uJGRlc2NyaXB0b3I7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVjdXIub3JkVGV4dFtwYXJzZUludChzZWxlY3Rpb24sIDEwKV07XHJcbiAgfSxcclxuICBwcmVzZWxlY3RXZWVrZGF5czogZnVuY3Rpb24gcHJlc2VsZWN0V2Vla2RheXMoKSB7XHJcbiAgICBjb25zdCBwcmV2aW91c1NlbGVjdGlvbnMgPSBbXTtcclxuICAgIGNvbnN0IHdlZWtkYXlzID0gcmVjdXIuZ2V0V2Vla2RheXModGhpcy5maWVsZHMuUmVjdXJQZXJpb2RTcGVjLmdldFZhbHVlKCkpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2Vla2RheXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHdlZWtkYXlzW2ldKSB7XHJcbiAgICAgICAgcHJldmlvdXNTZWxlY3Rpb25zLnB1c2goaSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwcmV2aW91c1NlbGVjdGlvbnM7XHJcbiAgfSxcclxuICBjcmVhdGVTY2FsZURhdGE6IGZ1bmN0aW9uIGNyZWF0ZVNjYWxlRGF0YSgpIHtcclxuICAgIGNvbnN0IGxpc3QgPSBbXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IG9wdCBpbiB0aGlzLmZyZXF1ZW5jeU9wdGlvbnNUZXh0KSB7XHJcbiAgICAgIGlmICh0aGlzLmZyZXF1ZW5jeU9wdGlvbnNUZXh0Lmhhc093blByb3BlcnR5KG9wdCkpIHtcclxuICAgICAgICBsaXN0LnB1c2goe1xyXG4gICAgICAgICAgJGtleTogb3B0LFxyXG4gICAgICAgICAgJGRlc2NyaXB0b3I6IHRoaXMuZnJlcXVlbmN5T3B0aW9uc1RleHRbb3B0XSxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICRyZXNvdXJjZXM6IGxpc3QsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgY3JlYXRlV2Vla2RheXNEYXRhOiBmdW5jdGlvbiBjcmVhdGVXZWVrZGF5c0RhdGEoKSB7XHJcbiAgICBjb25zdCBsaXN0ID0gW107XHJcblxyXG4gICAgdGhpcy53ZWVrRGF5c1RleHQuZm9yRWFjaCgobmFtZSwgaWR4KSA9PiB7XHJcbiAgICAgIGxpc3QucHVzaCh7XHJcbiAgICAgICAgJGtleTogaWR4LFxyXG4gICAgICAgICRkZXNjcmlwdG9yOiBuYW1lLFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICRyZXNvdXJjZXM6IGxpc3QsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgY3JlYXRlTW9udGhzRGF0YTogZnVuY3Rpb24gY3JlYXRlTW9udGhzRGF0YSgpIHtcclxuICAgIGNvbnN0IGxpc3QgPSBbXTtcclxuICAgIHRoaXMubW9udGhzVGV4dC5mb3JFYWNoKChuYW1lLCBpZHgpID0+IHtcclxuICAgICAgbGlzdC5wdXNoKHtcclxuICAgICAgICAka2V5OiBpZHgsXHJcbiAgICAgICAgJGRlc2NyaXB0b3I6IG5hbWUsXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAkcmVzb3VyY2VzOiBsaXN0LFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGNyZWF0ZU9yZERhdGE6IGZ1bmN0aW9uIGNyZWF0ZU9yZERhdGEoZGF5ID0gJycpIHtcclxuICAgIGNvbnN0IGxpc3QgPSBbXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IG9yZCBpbiByZWN1ci5vcmRUZXh0KSB7XHJcbiAgICAgIGlmIChyZWN1ci5vcmRUZXh0Lmhhc093blByb3BlcnR5KG9yZCkpIHtcclxuICAgICAgICBsaXN0LnB1c2goe1xyXG4gICAgICAgICAgJGtleTogb3JkLFxyXG4gICAgICAgICAgJGRlc2NyaXB0b3I6IHN0cmluZy5zdWJzdGl0dXRlKHJlY3VyLm9yZFRleHRbb3JkXSwgW2RheV0pLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgJHJlc291cmNlczogbGlzdCxcclxuICAgIH07XHJcbiAgfSxcclxuICBzZXRWYWx1ZXM6IGZ1bmN0aW9uIHNldFZhbHVlcyh2YWx1ZXMpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKHNldFZhbHVlcywgYXJndW1lbnRzKTtcclxuXHJcbiAgICAvLyBjYWxjdWxhdGUgc29tZSB2YWx1ZXMgZnJvbSB0aGUgb25lcyBwcm92aWRlZFxyXG4gICAgdGhpcy5lbnRyeSA9IHZhbHVlcztcclxuICAgIHRoaXMuZW50cnkuU3RhcnREYXRlID0gYXJnb3MuQ29udmVydC50b0RhdGVGcm9tU3RyaW5nKHZhbHVlcy5TdGFydERhdGUpOyAvLyBUT0RPOiBBdm9pZCBnbG9iYWxcclxuICAgIHRoaXMuZW50cnkuRW5kRGF0ZSA9IHJlY3VyLmNhbGNFbmREYXRlKHZhbHVlcy5TdGFydERhdGUsIHZhbHVlcykudG9EYXRlKCk7XHJcbiAgICB0aGlzLmVudHJ5LlJlY3VycmluZyA9ICh0eXBlb2YgdmFsdWVzLlJlY3VycmluZyA9PT0gJ3N0cmluZycpID8gL150cnVlJC9pLnRlc3QodmFsdWVzLlJlY3VycmluZykgOiB2YWx1ZXMuUmVjdXJyaW5nO1xyXG4gICAgY29uc3Qgb3JkID0gcmVjdXIuZ2V0T3JkKHRoaXMuZW50cnkpO1xyXG4gICAgdGhpcy5lbnRyeS5JbnRlcnZhbCA9IHZhbHVlcy5SZWN1clBlcmlvZFNwZWMgJSA2NTUzNjtcclxuICAgIHRoaXMuZW50cnkuQWZ0ZXJDb21wbGV0aW9uID0gcmVjdXIuaXNBZnRlckNvbXBsZXRpb24odmFsdWVzLlJlY3VyUGVyaW9kKTtcclxuICAgIHRoaXMuZW50cnkuRGF5ID0gdGhpcy5lbnRyeS5TdGFydERhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgdGhpcy5lbnRyeS5XZWVrZGF5cyA9IHJlY3VyLmdldFdlZWtkYXlzKHZhbHVlcy5SZWN1clBlcmlvZFNwZWMpO1xyXG4gICAgdGhpcy5lbnRyeS5PcmRXZWVrID0gb3JkLndlZWs7XHJcbiAgICB0aGlzLmVudHJ5Lk9yZFdlZWtkYXkgPSBvcmQud2Vla2RheTtcclxuICAgIHRoaXMuZW50cnkuT3JkTW9udGggPSBvcmQubW9udGg7XHJcblxyXG4gICAgLy8gRXZlbiBoaWRkZW4gYW5kIGZhbHN5IGZpZWxkcyBuZWVkIHRoZWlyIHZhbHVlcyBzZXQgKG5vdCBmcm9tIHBhcmVudClcclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiB0aGlzLmZpZWxkcykge1xyXG4gICAgICBpZiAodGhpcy5maWVsZHMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgICBjb25zdCBmaWVsZCA9IHRoaXMuZmllbGRzW25hbWVdO1xyXG4gICAgICAgIC8vIDAgKERhaWx5IHBhbmVsKSBvciBmYWxzZSAoQWZ0ZXJDb21wbGV0aW9uKSBhcmUgbGVnaXRpbWF0ZSB2YWx1ZXMhXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmVudHJ5W25hbWVdICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgZmllbGQuc2V0VmFsdWUodGhpcy5lbnRyeVtuYW1lXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZXNldFVJKCk7XHJcbiAgfSxcclxuICBnZXRWYWx1ZXM6IGZ1bmN0aW9uIGdldFZhbHVlcygpIHtcclxuICAgIGNvbnN0IG8gPSB0aGlzLmdldFJlY3VycmVuY2UoKTtcclxuXHJcbiAgICBvLlJlY3VycmluZyA9IChvLlJlY3VyUGVyaW9kID49IDApO1xyXG4gICAgby5FbmREYXRlID0gcmVjdXIuY2FsY0VuZERhdGUoby5TdGFydERhdGUsIG8pLnRvRGF0ZSgpO1xyXG5cclxuICAgIHJldHVybiBvO1xyXG4gIH0sXHJcbiAgZ2V0UmVjdXJyZW5jZTogZnVuY3Rpb24gZ2V0UmVjdXJyZW5jZSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIFN0YXJ0RGF0ZTogdGhpcy5maWVsZHMuU3RhcnREYXRlLmdldFZhbHVlKCksXHJcbiAgICAgIFJlY3VyUGVyaW9kOiBwYXJzZUludCh0aGlzLmZpZWxkcy5SZWN1clBlcmlvZC5nZXRWYWx1ZSgpLCAxMCksXHJcbiAgICAgIFJlY3VyUGVyaW9kU3BlYzogcGFyc2VJbnQodGhpcy5maWVsZHMuUmVjdXJQZXJpb2RTcGVjLmdldFZhbHVlKCksIDEwKSxcclxuICAgICAgUmVjdXJJdGVyYXRpb25zOiBwYXJzZUludCh0aGlzLmZpZWxkcy5SZWN1ckl0ZXJhdGlvbnMuZ2V0VmFsdWUoKSwgMTApLFxyXG4gICAgICBSZWN1cnJlbmNlU3RhdGU6IHRoaXMuZmllbGRzLlJlY3VycmVuY2VTdGF0ZS5nZXRWYWx1ZSgpLFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5b3V0IHx8ICh0aGlzLmxheW91dCA9IFt7XHJcbiAgICAgIGxhYmVsOiB0aGlzLnN1bW1hcnlUZXh0LFxyXG4gICAgICBuYW1lOiAnU3VtbWFyeScsXHJcbiAgICAgIHByb3BlcnR5OiAnU3VtbWFyeScsXHJcbiAgICAgIGV4Y2x1ZGU6IHRydWUsXHJcbiAgICAgIHR5cGU6ICd0ZXh0YXJlYScsXHJcbiAgICAgIHJlYWRvbmx5OiB0cnVlLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5zdGFydGluZ1RleHQsXHJcbiAgICAgIG5hbWU6ICdTdGFydERhdGUnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1N0YXJ0RGF0ZScsXHJcbiAgICAgIHR5cGU6ICdkYXRlJyxcclxuICAgICAgZGF0ZUZvcm1hdFRleHQ6IHRoaXMuc3RhcnRpbmdGb3JtYXRUZXh0LFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5yZWN1cnJpbmdGcmVxdWVuY3lUZXh0LFxyXG4gICAgICB0aXRsZTogdGhpcy5yZWN1cnJpbmdGcmVxdWVuY3lUZXh0LFxyXG4gICAgICBuYW1lOiAnU2NhbGUnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1NjYWxlJyxcclxuICAgICAgdHlwZTogJ3NlbGVjdCcsXHJcbiAgICAgIHZpZXc6ICdzZWxlY3RfbGlzdCcsXHJcbiAgICAgIGV4Y2x1ZGU6IHRydWUsXHJcbiAgICAgIGRhdGE6IHRoaXMuY3JlYXRlU2NhbGVEYXRhKCksXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLmZyZXF1ZW5jeUludGVydmFsVGV4dCxcclxuICAgICAgdGl0bGU6IHRoaXMuZnJlcXVlbmN5SW50ZXJ2YWxUZXh0LFxyXG4gICAgICBuYW1lOiAnSW50ZXJ2YWwnLFxyXG4gICAgICBwcm9wZXJ0eTogJ0ludGVydmFsJyxcclxuICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICBpbnB1dFR5cGU6ICdudW1lcmljJyxcclxuICAgICAgZXhjbHVkZTogdHJ1ZSxcclxuICAgICAgbm90aWZpY2F0aW9uVHJpZ2dlcjogJ2JsdXInLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5hZnRlckNvbXBsZXRpb25UZXh0LFxyXG4gICAgICBuYW1lOiAnQWZ0ZXJDb21wbGV0aW9uJyxcclxuICAgICAgcHJvcGVydHk6ICdBZnRlckNvbXBsZXRpb24nLFxyXG4gICAgICB0eXBlOiAnYm9vbGVhbicsXHJcbiAgICAgIGV4Y2x1ZGU6IHRydWUsXHJcbiAgICAgIG9uVGV4dDogdGhpcy55ZXNUZXh0LFxyXG4gICAgICBvZmZUZXh0OiB0aGlzLm5vVGV4dCxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMub25UZXh0LFxyXG4gICAgICB0aXRsZTogdGhpcy5vblRleHQsXHJcbiAgICAgIG5hbWU6ICdPcmRXZWVrJyxcclxuICAgICAgcHJvcGVydHk6ICdPcmRXZWVrJyxcclxuICAgICAgZXhjbHVkZTogdHJ1ZSxcclxuICAgICAgdHlwZTogJ3NlbGVjdCcsXHJcbiAgICAgIHZpZXc6ICdzZWxlY3RfbGlzdCcsXHJcbiAgICAgIGRhdGE6IHRoaXMuY3JlYXRlT3JkRGF0YSgpLFxyXG4gICAgICB0ZXh0UmVuZGVyZXI6IHRoaXMuZm9ybWF0T3JkLmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMuZGF5TnVtYmVyVGV4dCxcclxuICAgICAgdGl0bGU6IHRoaXMuZGF5TnVtYmVyVGV4dCxcclxuICAgICAgbmFtZTogJ0RheScsXHJcbiAgICAgIHByb3BlcnR5OiAnRGF5JyxcclxuICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICBpbnB1dFR5cGU6ICdudW1lcmljJyxcclxuICAgICAgZXhjbHVkZTogdHJ1ZSxcclxuICAgICAgbm90aWZpY2F0aW9uVHJpZ2dlcjogJ2JsdXInLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy53ZWVrZGF5c1RleHQsXHJcbiAgICAgIHRpdGxlOiB0aGlzLndlZWtkYXlzVGV4dCxcclxuICAgICAgbmFtZTogJ1dlZWtkYXlzJyxcclxuICAgICAgcHJvcGVydHk6ICdXZWVrZGF5cycsXHJcbiAgICAgIGV4Y2x1ZGU6IHRydWUsXHJcbiAgICAgIHR5cGU6ICdzZWxlY3QnLFxyXG4gICAgICBzaW5nbGVTZWxlY3Q6IGZhbHNlLFxyXG4gICAgICB2aWV3OiAnc2VsZWN0X2xpc3QnLFxyXG4gICAgICBkYXRhOiB0aGlzLmNyZWF0ZVdlZWtkYXlzRGF0YSgpLFxyXG4gICAgICBwcmV2aW91c1NlbGVjdGlvbnM6IHRoaXMucHJlc2VsZWN0V2Vla2RheXMuYmluZERlbGVnYXRlKHRoaXMpLFxyXG4gICAgICB0ZXh0UmVuZGVyZXI6IHRoaXMuZm9ybWF0V2Vla2RheXMuYmluZERlbGVnYXRlKHRoaXMpLFxyXG4gICAgICBmb3JtYXRWYWx1ZTogdGhpcy5mb3JtYXRXZWVrZGF5cy5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLnNpbmdsZVdlZWtkYXlUZXh0LFxyXG4gICAgICB0aXRsZTogdGhpcy5zaW5nbGVXZWVrZGF5VGV4dCxcclxuICAgICAgbmFtZTogJ09yZFdlZWtkYXknLFxyXG4gICAgICBwcm9wZXJ0eTogJ09yZFdlZWtkYXknLFxyXG4gICAgICBleGNsdWRlOiB0cnVlLFxyXG4gICAgICB0eXBlOiAnc2VsZWN0JyxcclxuICAgICAgc2luZ2xlU2VsZWN0OiB0cnVlLFxyXG4gICAgICB2aWV3OiAnc2VsZWN0X2xpc3QnLFxyXG4gICAgICBkYXRhOiB0aGlzLmNyZWF0ZVdlZWtkYXlzRGF0YSgpLFxyXG4gICAgICB0ZXh0UmVuZGVyZXI6IHRoaXMuZm9ybWF0U2luZ2xlV2Vla2RheS5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLm1vbnRoVGV4dCxcclxuICAgICAgdGl0bGU6IHRoaXMubW9udGhUZXh0LFxyXG4gICAgICBuYW1lOiAnT3JkTW9udGgnLFxyXG4gICAgICBwcm9wZXJ0eTogJ09yZE1vbnRoJyxcclxuICAgICAgZXhjbHVkZTogdHJ1ZSxcclxuICAgICAgdHlwZTogJ3NlbGVjdCcsXHJcbiAgICAgIHNpbmdsZVNlbGVjdDogdHJ1ZSxcclxuICAgICAgdmlldzogJ3NlbGVjdF9saXN0JyxcclxuICAgICAgZGF0YTogdGhpcy5jcmVhdGVNb250aHNEYXRhKCksXHJcbiAgICAgIHRleHRSZW5kZXJlcjogdGhpcy5mb3JtYXRNb250aC5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdSZWN1ckl0ZXJhdGlvbnMnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1JlY3VySXRlcmF0aW9ucycsXHJcbiAgICAgIGxhYmVsOiB0aGlzLm9jY3VycmVuY2VzVGV4dCxcclxuICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICBpbnB1dFR5cGU6ICdudW1lcmljJyxcclxuICAgICAgaW5jbHVkZTogdHJ1ZSxcclxuICAgICAgbm90aWZpY2F0aW9uVHJpZ2dlcjogJ2JsdXInLFxyXG4gICAgfSwge1xyXG4gICAgICB0eXBlOiAnaGlkZGVuJyxcclxuICAgICAgbmFtZTogJ1JlY3VyUGVyaW9kJyxcclxuICAgICAgcHJvcGVydHk6ICdSZWN1clBlcmlvZCcsXHJcbiAgICAgIGluY2x1ZGU6IHRydWUsXHJcbiAgICB9LCB7XHJcbiAgICAgIHR5cGU6ICdoaWRkZW4nLFxyXG4gICAgICBuYW1lOiAnUmVjdXJQZXJpb2RTcGVjJyxcclxuICAgICAgcHJvcGVydHk6ICdSZWN1clBlcmlvZFNwZWMnLFxyXG4gICAgICBpbmNsdWRlOiB0cnVlLFxyXG4gICAgfSwge1xyXG4gICAgICB0eXBlOiAnaGlkZGVuJyxcclxuICAgICAgbmFtZTogJ1JlY3VycmVuY2VTdGF0ZScsXHJcbiAgICAgIHByb3BlcnR5OiAnUmVjdXJyZW5jZVN0YXRlJyxcclxuICAgICAgaW5jbHVkZTogdHJ1ZSxcclxuICAgIH0sIHtcclxuICAgICAgdHlwZTogJ2hpZGRlbicsXHJcbiAgICAgIG5hbWU6ICdSZWN1cnJpbmcnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1JlY3VycmluZycsXHJcbiAgICAgIGluY2x1ZGU6IHRydWUsXHJcbiAgICAgIGZvcm1hdFZhbHVlOiBmb3JtYXQuYm9vbCxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMuZW5kaW5nVGV4dCxcclxuICAgICAgbmFtZTogJ0VuZERhdGUnLFxyXG4gICAgICBwcm9wZXJ0eTogJ0VuZERhdGUnLFxyXG4gICAgICB0eXBlOiAnZGF0ZScsXHJcbiAgICAgIHRpbWVsZXNzOiBmYWxzZSxcclxuICAgICAgc2hvd1RpbWVQaWNrZXI6IGZhbHNlLFxyXG4gICAgICBkYXRlRm9ybWF0VGV4dDogdGhpcy5zdGFydGluZ1RpbWVsZXNzRm9ybWF0VGV4dCxcclxuICAgICAgbWluVmFsdWU6IChuZXcgRGF0ZSgxOTAwLCAwLCAxKSksXHJcbiAgICAgIHZhbGlkYXRvcjogW1xyXG4gICAgICAgIHZhbGlkYXRvci5leGlzdHMsXHJcbiAgICAgICAgdmFsaWRhdG9yLmlzRGF0ZUluUmFuZ2UsXHJcbiAgICAgIF0sXHJcbiAgICB9XSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=