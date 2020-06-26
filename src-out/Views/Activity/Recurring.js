define("crm/Views/Activity/Recurring", ["exports", "dojo/_base/declare", "../../Format", "../../Validator", "argos/Edit", "../../Recurrence", "argos/I18n", "dojo/string"], function (_exports, _declare, _Format, _Validator, _Edit, _Recurrence, _I18n, _string) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _Format = _interopRequireDefault(_Format);
  _Validator = _interopRequireDefault(_Validator);
  _Edit = _interopRequireDefault(_Edit);
  _Recurrence = _interopRequireDefault(_Recurrence);
  _I18n = _interopRequireDefault(_I18n);
  _string = _interopRequireDefault(_string);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  var resource = (0, _I18n["default"])('activityRecurring');
  var dtFormatResource = (0, _I18n["default"])('activityEditDateTimeFormat');

  var __class = (0, _declare["default"])('crm.Views.Activity.Recurring', [_Edit["default"]], {
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
      this.connect(this.fields.EndDate, 'onChange', this.onEndDateChange); // these affect the StartDate:

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

      if (!_Recurrence["default"].isAfterCompletion(rp)) {
        showthese += 'RecurIterations,EndDate,';
      }

      this.fields.RecurrenceState.setValue('rstMaster'); // undone when Once panel selected
      // determine which fields to hide according to panel

      switch (rp) {
        case 0: // daily

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
      } // always show these:


      if (rp >= 0) {
        this.fields.Scale.show();
      }

      this.fields.Summary.show(); // refresh some field values

      this.fields.RecurPeriod.setValue(rp);
      this.fields.RecurPeriodSpec.setValue(_Recurrence["default"].getRecurPeriodSpec(rp, startDate, this.entry.Weekdays, interval));
      this.summarize();
    },
    summarize: function summarize() {
      this.fields.Summary.setValue(_Recurrence["default"].toString(this.getRecurrence()));
      this.fields.Scale.setValue(_Recurrence["default"].getPanel(parseInt(this.fields.RecurPeriod.getValue(), 10), true));
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

        this.fields.RecurIterations.setValue(this.entry.RecurIterations > 0 ? this.entry.RecurIterations : _Recurrence["default"].defaultIterations[rp]);
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
        this.fields.EndDate.setValue(_Recurrence["default"].calcEndDate(this.fields.StartDate.getValue(), this.getRecurrence()).toDate());
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

        var newEndDate = _Recurrence["default"].calcEndDate(this.fields.StartDate.getValue(), this.getRecurrence()).toDate();

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
        var iterations = _Recurrence["default"].calcRecurIterations(value, this.fields.StartDate.getValue(), this.fields.Interval.getValue(), this.fields.RecurPeriod.getValue());

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

      this.fields.StartDate.setValue(startDate); // weekday(s)/ordWeek/EndDate may need adjusting

      this.onStartDateChange(value, field);
    },
    onStartDateChange: function onStartDateChange(value, field) {
      // when field alters StartDate, other fields need to be adjusted
      var weekdays = _Recurrence["default"].getWeekdays(parseInt(this.fields.RecurPeriodSpec.getValue(), 10));

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

      startDate = _Recurrence["default"].calcDateOfNthWeekday(startDate, weekday, ordWeek).toDate();
      this.fields.StartDate.setValue(startDate);
      this.fields.EndDate.setValue(_Recurrence["default"].calcEndDate(startDate, this.getRecurrence()).toDate());
      this.fields.Day.setValue(startDate.getDate());
      this.fields.OrdWeekday.setValue(startDate.getDay());
      var weekData = this.createOrdData(this.formatSingleWeekday(startDate.getDay()));
      this.fields.OrdWeek.data = weekData;
      this.summarize();
      var key = this.fields.OrdWeek.getValue();

      if (_typeof(key) === 'object') {
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
      this.fields.RecurIterations.setValue(_Recurrence["default"].defaultIterations[recurPeriod]);
      this.fields.RecurPeriodSpec.setValue(_Recurrence["default"].getRecurPeriodSpec(recurPeriod, startDate, [], interval));
      this.fields.Weekdays.setValue(_Recurrence["default"].getWeekdays(this.fields.RecurPeriodSpec.getValue()));
      this.fields.Day.setValue(startDate.getDate());
      this.fields.OrdMonth.setValue(startDate.getMonth() + 1);
      this.fields.OrdWeek.setValue(0);
      this.fields.EndDate.setValue(_Recurrence["default"].calcEndDate(startDate, this.getRecurrence()).toDate());
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

      this.fields.RecurPeriodSpec.setValue(_Recurrence["default"].getRecurPeriodSpec(parseInt(this.fields.RecurPeriod.getValue(), 10), this.fields.StartDate.getValue(), weekdays, parseInt(this.fields.Interval.getValue(), 10)));
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

      return _Recurrence["default"].ordText[parseInt(selection, 10)];
    },
    preselectWeekdays: function preselectWeekdays() {
      var previousSelections = [];

      var weekdays = _Recurrence["default"].getWeekdays(this.fields.RecurPeriodSpec.getValue());

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

      for (var ord in _Recurrence["default"].ordText) {
        if (_Recurrence["default"].ordText.hasOwnProperty(ord)) {
          list.push({
            $key: ord,
            $descriptor: _string["default"].substitute(_Recurrence["default"].ordText[ord], [day])
          });
        }
      }

      return {
        $resources: list
      };
    },
    setValues: function setValues(values) {
      this.inherited(setValues, arguments); // calculate some values from the ones provided

      this.entry = values;
      this.entry.StartDate = argos.Convert.toDateFromString(values.StartDate); // TODO: Avoid global

      this.entry.EndDate = _Recurrence["default"].calcEndDate(values.StartDate, values).toDate();
      this.entry.Recurring = typeof values.Recurring === 'string' ? /^true$/i.test(values.Recurring) : values.Recurring;

      var ord = _Recurrence["default"].getOrd(this.entry);

      this.entry.Interval = values.RecurPeriodSpec % 65536;
      this.entry.AfterCompletion = _Recurrence["default"].isAfterCompletion(values.RecurPeriod);
      this.entry.Day = this.entry.StartDate.getDate();
      this.entry.Weekdays = _Recurrence["default"].getWeekdays(values.RecurPeriodSpec);
      this.entry.OrdWeek = ord.week;
      this.entry.OrdWeekday = ord.weekday;
      this.entry.OrdMonth = ord.month; // Even hidden and falsy fields need their values set (not from parent)

      for (var name in this.fields) {
        if (this.fields.hasOwnProperty(name)) {
          var field = this.fields[name]; // 0 (Daily panel) or false (AfterCompletion) are legitimate values!

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
      o.EndDate = _Recurrence["default"].calcEndDate(o.StartDate, o).toDate();
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
        formatValue: _Format["default"].bool
      }, {
        label: this.endingText,
        name: 'EndDate',
        property: 'EndDate',
        type: 'date',
        timeless: false,
        showTimePicker: false,
        dateFormatText: this.startingTimelessFormatText,
        minValue: new Date(1900, 0, 1),
        validator: [_Validator["default"].exists, _Validator["default"].isDateInRange]
      }]);
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});