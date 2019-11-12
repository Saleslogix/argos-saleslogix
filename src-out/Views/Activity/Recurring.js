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
      this.inherited(arguments);
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
      this.inherited(arguments);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BY3Rpdml0eS9SZWN1cnJpbmcuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJkdEZvcm1hdFJlc291cmNlIiwiX19jbGFzcyIsInN0YXJ0aW5nVGV4dCIsImVuZGluZ1RleHQiLCJyZXBlYXRzVGV4dCIsImV2ZXJ5VGV4dCIsImFmdGVyQ29tcGxldGlvblRleHQiLCJzaW5nbGVXZWVrZGF5VGV4dCIsIndlZWtkYXlzVGV4dCIsImRheU51bWJlclRleHQiLCJtb250aFRleHQiLCJvblRleHQiLCJvY2N1cnJlbmNlc1RleHQiLCJzdW1tYXJ5VGV4dCIsIndlZWtEYXlzVGV4dCIsInN1bmRheSIsIm1vbmRheSIsInR1ZXNkYXkiLCJ3ZWRuZXNkYXkiLCJ0aHVyc2RheSIsImZyaWRheSIsInNhdHVyZGF5IiwibW9udGhzVGV4dCIsImphbnVhcnkiLCJmZWJydWFyeSIsIm1hcmNoIiwiYXByaWwiLCJtYXkiLCJqdW5lIiwianVseSIsImF1Z3VzdCIsInNlcHRlbWJlciIsIm9jdG9iZXIiLCJub3ZlbWJlciIsImRlY2VtYmVyIiwiZnJlcXVlbmN5T3B0aW9uc1RleHQiLCJkYWlseVRleHQiLCJ3ZWVrbHlUZXh0IiwibW9udGhseVRleHQiLCJ5ZWFybHlUZXh0IiwicmVjdXJyaW5nRnJlcXVlbmN5VGV4dCIsImZyZXF1ZW5jeUludGVydmFsVGV4dCIsInllc1RleHQiLCJub1RleHQiLCJ0aXRsZVRleHQiLCJ3ZWVrbHlGcmVxdWVuY3lTaW5nbGVBZnRlckNvbXBsZXRpb24iLCJ3ZWVrbHlGcmVxdWVuY3lTaW5nbGUiLCJ3ZWVrbHlGcmVxdWVuY3lBZnRlckNvbXBsZXRpb24iLCJ3ZWVrbHlGcmVxdWVuY3kiLCJtb250aGx5RnJlcXVlbmN5QWZ0ZXJDb21wbGV0aW9uIiwibW9udGhseUZyZXF1ZW5jeSIsIm1vbnRobHlGcmVxdWVuY3lPcmRpbmFsQWZ0ZXJDb21wbGV0aW9uIiwibW9udGhseUZyZXF1ZW5jeU9yZGluYWwiLCJkYWlseUZyZXF1ZW5jeUFmdGVyQ29tcGxldGlvbiIsImRhaWx5RnJlcXVlbmN5Iiwic3RhcnRpbmdUaW1lbGVzc0Zvcm1hdFRleHQiLCJtb250aE5hbWVzIiwibW9tZW50IiwibW9udGhzU2hvcnQiLCJpZCIsImluaXQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJjb25uZWN0IiwiZmllbGRzIiwiQWZ0ZXJDb21wbGV0aW9uIiwib25BZnRlckNvbXBsZXRpb25DaGFuZ2UiLCJJbnRlcnZhbCIsIm9uSW50ZXJ2YWxDaGFuZ2UiLCJSZWN1ckl0ZXJhdGlvbnMiLCJvblJlY3VySXRlcmF0aW9uc0NoYW5nZSIsIkVuZERhdGUiLCJvbkVuZERhdGVDaGFuZ2UiLCJTY2FsZSIsIm9uU2NhbGVDaGFuZ2UiLCJEYXkiLCJvbkRheUNoYW5nZSIsIldlZWtkYXlzIiwib25TdGFydERhdGVDaGFuZ2UiLCJPcmRXZWVrZGF5IiwiT3JkV2VlayIsIk9yZE1vbnRoIiwiZGlzYWJsZSIsInJlc2V0VUkiLCJycCIsInBhcnNlSW50IiwiUmVjdXJQZXJpb2QiLCJnZXRWYWx1ZSIsInN0YXJ0RGF0ZSIsIlN0YXJ0RGF0ZSIsImludGVydmFsIiwiUmVjdXJQZXJpb2RTcGVjIiwic2hvd3RoZXNlIiwiaXNBZnRlckNvbXBsZXRpb24iLCJSZWN1cnJlbmNlU3RhdGUiLCJzZXRWYWx1ZSIsImZvcm1hdFdlZWtkYXlzIiwiZW50cnkiLCJkYXRhIiwiY3JlYXRlT3JkRGF0YSIsImZvcm1hdFNpbmdsZVdlZWtkYXkiLCJnZXREYXkiLCJpIiwiaW5kZXhPZiIsInNob3ciLCJoaWRlIiwiU3VtbWFyeSIsImdldFJlY3VyUGVyaW9kU3BlYyIsInN1bW1hcml6ZSIsInRvU3RyaW5nIiwiZ2V0UmVjdXJyZW5jZSIsImdldFBhbmVsIiwidmFsdWUiLCJkZWZhdWx0SXRlcmF0aW9ucyIsImZpZWxkIiwiY3VycmVudFNwZWMiLCJ0aGVWYWx1ZSIsImNhbGNFbmREYXRlIiwidG9EYXRlIiwibmV3RW5kRGF0ZSIsIml0ZXJhdGlvbnMiLCJjYWxjUmVjdXJJdGVyYXRpb25zIiwibWF4VmFsdWUiLCJkYXlzSW5Nb250aCIsInNldERhdGUiLCJnZXREYXRlIiwid2Vla2RheXMiLCJnZXRXZWVrZGF5cyIsInBhbmVsIiwia2V5Iiwid2Vla2RheSIsIm9yZFdlZWsiLCJuYW1lIiwid2QiLCJzZXRNb250aCIsImNhbGNEYXRlT2ZOdGhXZWVrZGF5Iiwid2Vla0RhdGEiLCIka2V5IiwiJHJlc291cmNlcyIsImlzTmFOIiwiYWZ0ZXJDb21wbGV0aW9uIiwicmVjdXJQZXJpb2QiLCJnZXRNb250aCIsInNlbGVjdGlvbnMiLCJ2YWx1ZXMiLCJwdXNoIiwiam9pbiIsInNlbGVjdGlvbiIsIiRkZXNjcmlwdG9yIiwiZm9ybWF0TW9udGgiLCJmb3JtYXRPcmQiLCJvcmRUZXh0IiwicHJlc2VsZWN0V2Vla2RheXMiLCJwcmV2aW91c1NlbGVjdGlvbnMiLCJsZW5ndGgiLCJjcmVhdGVTY2FsZURhdGEiLCJsaXN0Iiwib3B0IiwiaGFzT3duUHJvcGVydHkiLCJjcmVhdGVXZWVrZGF5c0RhdGEiLCJmb3JFYWNoIiwiaWR4IiwiY3JlYXRlTW9udGhzRGF0YSIsImRheSIsIm9yZCIsInN1YnN0aXR1dGUiLCJzZXRWYWx1ZXMiLCJhcmdvcyIsIkNvbnZlcnQiLCJ0b0RhdGVGcm9tU3RyaW5nIiwiUmVjdXJyaW5nIiwidGVzdCIsImdldE9yZCIsIndlZWsiLCJtb250aCIsImdldFZhbHVlcyIsIm8iLCJjcmVhdGVMYXlvdXQiLCJsYXlvdXQiLCJsYWJlbCIsInByb3BlcnR5IiwiZXhjbHVkZSIsInR5cGUiLCJyZWFkb25seSIsImRhdGVGb3JtYXRUZXh0Iiwic3RhcnRpbmdGb3JtYXRUZXh0IiwidGl0bGUiLCJ2aWV3IiwiaW5wdXRUeXBlIiwibm90aWZpY2F0aW9uVHJpZ2dlciIsIm9mZlRleHQiLCJ0ZXh0UmVuZGVyZXIiLCJiaW5kRGVsZWdhdGUiLCJzaW5nbGVTZWxlY3QiLCJmb3JtYXRWYWx1ZSIsImluY2x1ZGUiLCJib29sIiwidGltZWxlc3MiLCJzaG93VGltZVBpY2tl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LE9BN0ZrQyxFQXFHbEM7QUFDRFAsY0FBTSxRQURMO0FBRURsRCxjQUFNLGFBRkw7QUFHRGdELGtCQUFVLGFBSFQ7QUFJRGUsaUJBQVM7QUFKUixPQXJHa0MsRUEwR2xDO0FBQ0RiLGNBQU0sUUFETDtBQUVEbEQsY0FBTSxpQkFGTDtBQUdEZ0Qsa0JBQVUsaUJBSFQ7QUFJRGUsaUJBQVM7QUFKUixPQTFHa0MsRUErR2xDO0FBQ0RiLGNBQU0sUUFETDtBQUVEbEQsY0FBTSxpQkFGTDtBQUdEZ0Qsa0JBQVUsaUJBSFQ7QUFJRGUsaUJBQVM7QUFKUixPQS9Ha0MsRUFvSGxDO0FBQ0RiLGNBQU0sUUFETDtBQUVEbEQsY0FBTSxXQUZMO0FBR0RnRCxrQkFBVSxXQUhUO0FBSURlLGlCQUFTLElBSlI7QUFLREQscUJBQWEsaUJBQU9FO0FBTG5CLE9BcEhrQyxFQTBIbEM7QUFDRGpCLGVBQU8sS0FBS2hMLFVBRFg7QUFFRGlJLGNBQU0sU0FGTDtBQUdEZ0Qsa0JBQVUsU0FIVDtBQUlERSxjQUFNLE1BSkw7QUFLRGUsa0JBQVUsS0FMVDtBQU1EQyx3QkFBZ0IsS0FOZjtBQU9EZCx3QkFBZ0IsS0FBS2pJLDBCQVBwQjtBQVFEZ0osa0JBQVcsSUFBSUMsSUFBSixDQUFTLElBQVQsRUFBZSxDQUFmLEVBQWtCLENBQWxCLENBUlY7QUFTREMsbUJBQVcsQ0FDVCxvQkFBVUMsTUFERCxFQUVULG9CQUFVQyxhQUZEO0FBVFYsT0ExSGtDLENBQTlCLENBQVA7QUF3SUQ7QUFyb0I2RCxHQUFoRCxDQUFoQjs7b0JBd29CZTFNLE8iLCJmaWxlIjoiUmVjdXJyaW5nLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICcuLi8uLi9Gb3JtYXQnO1xyXG5pbXBvcnQgdmFsaWRhdG9yIGZyb20gJy4uLy4uL1ZhbGlkYXRvcic7XHJcbmltcG9ydCBFZGl0IGZyb20gJ2FyZ29zL0VkaXQnO1xyXG5pbXBvcnQgcmVjdXIgZnJvbSAnLi4vLi4vUmVjdXJyZW5jZSc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuaW1wb3J0IHN0cmluZyBmcm9tICdkb2pvL3N0cmluZyc7XHJcblxyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYWN0aXZpdHlSZWN1cnJpbmcnKTtcclxuY29uc3QgZHRGb3JtYXRSZXNvdXJjZSA9IGdldFJlc291cmNlKCdhY3Rpdml0eUVkaXREYXRlVGltZUZvcm1hdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuQWN0aXZpdHkuUmVjdXJyaW5nXHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkVkaXRcclxuICpcclxuICogQHJlcXVpcmVzIGFyZ29zLkVkaXRcclxuICogQHJlcXVpcmVzIGFyZ29zLlV0aWxpdHlcclxuICpcclxuICogQHJlcXVpcmVzIGNybS5Gb3JtYXRcclxuICogQHJlcXVpcmVzIGNybS5WYWxpZGF0b3JcclxuICogQHJlcXVpcmVzIGNybS5SZWN1cnJlbmNlXHJcbiAqXHJcbiAqIEByZXF1aXJlcyBtb21lbnRcclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuQWN0aXZpdHkuUmVjdXJyaW5nJywgW0VkaXRdLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgc3RhcnRpbmdUZXh0OiByZXNvdXJjZS5zdGFydGluZ1RleHQsXHJcbiAgZW5kaW5nVGV4dDogcmVzb3VyY2UuZW5kaW5nVGV4dCxcclxuICByZXBlYXRzVGV4dDogcmVzb3VyY2UucmVwZWF0c1RleHQsXHJcbiAgZXZlcnlUZXh0OiByZXNvdXJjZS5ldmVyeVRleHQsXHJcbiAgYWZ0ZXJDb21wbGV0aW9uVGV4dDogcmVzb3VyY2UuYWZ0ZXJDb21wbGV0aW9uVGV4dCxcclxuICBzaW5nbGVXZWVrZGF5VGV4dDogcmVzb3VyY2Uuc2luZ2xlV2Vla2RheVRleHQsXHJcbiAgd2Vla2RheXNUZXh0OiByZXNvdXJjZS53ZWVrZGF5c1RleHQsXHJcbiAgZGF5TnVtYmVyVGV4dDogcmVzb3VyY2UuZGF5TnVtYmVyVGV4dCxcclxuICBtb250aFRleHQ6IHJlc291cmNlLm1vbnRoVGV4dCxcclxuICBvblRleHQ6IHJlc291cmNlLm9uVGV4dCxcclxuICBvY2N1cnJlbmNlc1RleHQ6IHJlc291cmNlLm9jY3VycmVuY2VzVGV4dCxcclxuICBzdW1tYXJ5VGV4dDogcmVzb3VyY2Uuc3VtbWFyeVRleHQsXHJcbiAgd2Vla0RheXNUZXh0OiBbXHJcbiAgICByZXNvdXJjZS5zdW5kYXksXHJcbiAgICByZXNvdXJjZS5tb25kYXksXHJcbiAgICByZXNvdXJjZS50dWVzZGF5LFxyXG4gICAgcmVzb3VyY2Uud2VkbmVzZGF5LFxyXG4gICAgcmVzb3VyY2UudGh1cnNkYXksXHJcbiAgICByZXNvdXJjZS5mcmlkYXksXHJcbiAgICByZXNvdXJjZS5zYXR1cmRheSxcclxuICBdLFxyXG4gIG1vbnRoc1RleHQ6IFtcclxuICAgIHJlc291cmNlLmphbnVhcnksXHJcbiAgICByZXNvdXJjZS5mZWJydWFyeSxcclxuICAgIHJlc291cmNlLm1hcmNoLFxyXG4gICAgcmVzb3VyY2UuYXByaWwsXHJcbiAgICByZXNvdXJjZS5tYXksXHJcbiAgICByZXNvdXJjZS5qdW5lLFxyXG4gICAgcmVzb3VyY2UuanVseSxcclxuICAgIHJlc291cmNlLmF1Z3VzdCxcclxuICAgIHJlc291cmNlLnNlcHRlbWJlcixcclxuICAgIHJlc291cmNlLm9jdG9iZXIsXHJcbiAgICByZXNvdXJjZS5ub3ZlbWJlcixcclxuICAgIHJlc291cmNlLmRlY2VtYmVyLFxyXG4gIF0sXHJcbiAgZnJlcXVlbmN5T3B0aW9uc1RleHQ6IFtcclxuICAgIHJlc291cmNlLmRhaWx5VGV4dCxcclxuICAgIHJlc291cmNlLndlZWtseVRleHQsXHJcbiAgICByZXNvdXJjZS5tb250aGx5VGV4dCxcclxuICAgIHJlc291cmNlLnllYXJseVRleHQsXHJcbiAgXSxcclxuICByZWN1cnJpbmdGcmVxdWVuY3lUZXh0OiByZXNvdXJjZS5yZWN1cnJpbmdGcmVxdWVuY3lUZXh0LFxyXG4gIGZyZXF1ZW5jeUludGVydmFsVGV4dDogcmVzb3VyY2UuZnJlcXVlbmN5SW50ZXJ2YWxUZXh0LFxyXG4gIHllc1RleHQ6IHJlc291cmNlLnllc1RleHQsXHJcbiAgbm9UZXh0OiByZXNvdXJjZS5ub1RleHQsXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgd2Vla2x5RnJlcXVlbmN5U2luZ2xlQWZ0ZXJDb21wbGV0aW9uOiByZXNvdXJjZS53ZWVrbHlGcmVxdWVuY3lTaW5nbGVBZnRlckNvbXBsZXRpb24sXHJcbiAgd2Vla2x5RnJlcXVlbmN5U2luZ2xlOiByZXNvdXJjZS53ZWVrbHlGcmVxdWVuY3lTaW5nbGUsXHJcbiAgd2Vla2x5RnJlcXVlbmN5QWZ0ZXJDb21wbGV0aW9uOiByZXNvdXJjZS53ZWVrbHlGcmVxdWVuY3lBZnRlckNvbXBsZXRpb24sXHJcbiAgd2Vla2x5RnJlcXVlbmN5OiByZXNvdXJjZS53ZWVrbHlGcmVxdWVuY3ksXHJcbiAgbW9udGhseUZyZXF1ZW5jeUFmdGVyQ29tcGxldGlvbjogcmVzb3VyY2UubW9udGhseUZyZXF1ZW5jeUFmdGVyQ29tcGxldGlvbixcclxuICBtb250aGx5RnJlcXVlbmN5OiByZXNvdXJjZS5tb250aGx5RnJlcXVlbmN5LFxyXG4gIG1vbnRobHlGcmVxdWVuY3lPcmRpbmFsQWZ0ZXJDb21wbGV0aW9uOiByZXNvdXJjZS5tb250aGx5RnJlcXVlbmN5T3JkaW5hbEFmdGVyQ29tcGxldGlvbixcclxuICBtb250aGx5RnJlcXVlbmN5T3JkaW5hbDogcmVzb3VyY2UubW9udGhseUZyZXF1ZW5jeU9yZGluYWwsXHJcbiAgZGFpbHlGcmVxdWVuY3lBZnRlckNvbXBsZXRpb246IHJlc291cmNlLmRhaWx5RnJlcXVlbmN5QWZ0ZXJDb21wbGV0aW9uLFxyXG4gIGRhaWx5RnJlcXVlbmN5OiByZXNvdXJjZS5kYWlseUZyZXF1ZW5jeSxcclxuICBzdGFydGluZ1RpbWVsZXNzRm9ybWF0VGV4dDogZHRGb3JtYXRSZXNvdXJjZS5zdGFydGluZ1RpbWVsZXNzRm9ybWF0VGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgbW9udGhOYW1lczogbW9tZW50Lm1vbnRoc1Nob3J0LFxyXG5cclxuICBpZDogJ3JlY3VycmVuY2VfZWRpdCcsXHJcblxyXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLkFmdGVyQ29tcGxldGlvbiwgJ29uQ2hhbmdlJywgdGhpcy5vbkFmdGVyQ29tcGxldGlvbkNoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuSW50ZXJ2YWwsICdvbkNoYW5nZScsIHRoaXMub25JbnRlcnZhbENoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuUmVjdXJJdGVyYXRpb25zLCAnb25DaGFuZ2UnLCB0aGlzLm9uUmVjdXJJdGVyYXRpb25zQ2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5FbmREYXRlLCAnb25DaGFuZ2UnLCB0aGlzLm9uRW5kRGF0ZUNoYW5nZSk7XHJcbiAgICAvLyB0aGVzZSBhZmZlY3QgdGhlIFN0YXJ0RGF0ZTpcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5TY2FsZSwgJ29uQ2hhbmdlJywgdGhpcy5vblNjYWxlQ2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5EYXksICdvbkNoYW5nZScsIHRoaXMub25EYXlDaGFuZ2UpOyAvLyBEYXkgb2YgdGhlIG1vbnRoXHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuV2Vla2RheXMsICdvbkNoYW5nZScsIHRoaXMub25TdGFydERhdGVDaGFuZ2UpOyAvLyBPbmUgb3IgbW9yZSBkYXlzIG9uIFdlZWtseSBvcHRpb25zXHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuT3JkV2Vla2RheSwgJ29uQ2hhbmdlJywgdGhpcy5vblN0YXJ0RGF0ZUNoYW5nZSk7IC8vIFNpbmdsZSBkYXkgb2Ygd2Vla1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLk9yZFdlZWssICdvbkNoYW5nZScsIHRoaXMub25TdGFydERhdGVDaGFuZ2UpOyAvLyAxc3QuLmxhc3Qgd2VlayBvZiBtb250aCwgb3Igb24gRGF5ICNcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5PcmRNb250aCwgJ29uQ2hhbmdlJywgdGhpcy5vblN0YXJ0RGF0ZUNoYW5nZSk7IC8vIE1vbnRoIG9mIHllYXJcclxuICAgIHRoaXMuZmllbGRzLkVuZERhdGUuZGlzYWJsZSgpO1xyXG4gIH0sXHJcbiAgcmVzZXRVSTogZnVuY3Rpb24gcmVzZXRVSSgpIHtcclxuICAgIC8vIGhpZGUgb3IgcmV2ZWFsIGFuZCBzZXQgZmllbGRzIGFjY29yZGluZyB0byBwYW5lbC9SZWN1clBlcmlvZFxyXG4gICAgY29uc3QgcnAgPSBwYXJzZUludCh0aGlzLmZpZWxkcy5SZWN1clBlcmlvZC5nZXRWYWx1ZSgpLCAxMCk7XHJcbiAgICBjb25zdCBzdGFydERhdGUgPSB0aGlzLmZpZWxkcy5TdGFydERhdGUuZ2V0VmFsdWUoKTtcclxuICAgIGNvbnN0IGludGVydmFsID0gdGhpcy5maWVsZHMuUmVjdXJQZXJpb2RTcGVjLmdldFZhbHVlKCkgJSA2NTUzNjtcclxuICAgIGxldCBzaG93dGhlc2UgPSAnSW50ZXJ2YWwsQWZ0ZXJDb21wbGV0aW9uLCc7XHJcblxyXG4gICAgaWYgKCFyZWN1ci5pc0FmdGVyQ29tcGxldGlvbihycCkpIHtcclxuICAgICAgc2hvd3RoZXNlICs9ICdSZWN1ckl0ZXJhdGlvbnMsRW5kRGF0ZSwnO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmllbGRzLlJlY3VycmVuY2VTdGF0ZS5zZXRWYWx1ZSgncnN0TWFzdGVyJyk7IC8vIHVuZG9uZSB3aGVuIE9uY2UgcGFuZWwgc2VsZWN0ZWRcclxuXHJcbiAgICAvLyBkZXRlcm1pbmUgd2hpY2ggZmllbGRzIHRvIGhpZGUgYWNjb3JkaW5nIHRvIHBhbmVsXHJcbiAgICBzd2l0Y2ggKHJwKSB7XHJcbiAgICAgIGNhc2UgMDpcclxuICAgICAgICAvLyBkYWlseVxyXG4gICAgICBjYXNlIDE6IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAyOlxyXG4gICAgICAgIC8vIHdlZWtseVxyXG4gICAgICAgIHNob3d0aGVzZSArPSAnV2Vla2RheXMsJztcclxuICAgICAgICB0aGlzLmZvcm1hdFdlZWtkYXlzKHRoaXMuZW50cnkuV2Vla2RheXMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDM6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgNDpcclxuICAgICAgICAvLyBtb250aGx5XHJcbiAgICAgICAgc2hvd3RoZXNlICs9ICdEYXksT3JkV2Vlayc7XHJcbiAgICAgICAgaWYgKHRoaXMuZW50cnkgJiYgdGhpcy5lbnRyeS5TdGFydERhdGUpIHtcclxuICAgICAgICAgIHRoaXMuZmllbGRzLk9yZFdlZWsuZGF0YSA9IHRoaXMuY3JlYXRlT3JkRGF0YSh0aGlzLmZvcm1hdFNpbmdsZVdlZWtkYXkodGhpcy5lbnRyeS5TdGFydERhdGUuZ2V0RGF5KCkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgNTpcclxuICAgICAgICBzaG93dGhlc2UgKz0gJ09yZFdlZWssT3JkV2Vla2RheSwnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDY6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgNzpcclxuICAgICAgICAvLyB5ZWFybHlcclxuICAgICAgICBzaG93dGhlc2UgKz0gJ0RheSxPcmRXZWVrLE9yZE1vbnRoJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSA4OlxyXG4gICAgICAgIHNob3d0aGVzZSArPSAnT3JkV2VlayxPcmRXZWVrZGF5LE9yZE1vbnRoLCc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgOTpcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICAvLyBvbmNlXHJcbiAgICAgICAgc2hvd3RoZXNlID0gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBpIGluIHRoaXMuZmllbGRzKSB7XHJcbiAgICAgIGlmIChzaG93dGhlc2UuaW5kZXhPZihpKSA+PSAwKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZHNbaV0uc2hvdygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZmllbGRzW2ldLmhpZGUoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gYWx3YXlzIHNob3cgdGhlc2U6XHJcbiAgICBpZiAocnAgPj0gMCkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5TY2FsZS5zaG93KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmZpZWxkcy5TdW1tYXJ5LnNob3coKTtcclxuXHJcbiAgICAvLyByZWZyZXNoIHNvbWUgZmllbGQgdmFsdWVzXHJcbiAgICB0aGlzLmZpZWxkcy5SZWN1clBlcmlvZC5zZXRWYWx1ZShycCk7XHJcbiAgICB0aGlzLmZpZWxkcy5SZWN1clBlcmlvZFNwZWMuc2V0VmFsdWUocmVjdXIuZ2V0UmVjdXJQZXJpb2RTcGVjKHJwLCBzdGFydERhdGUsIHRoaXMuZW50cnkuV2Vla2RheXMsIGludGVydmFsKSk7XHJcblxyXG4gICAgdGhpcy5zdW1tYXJpemUoKTtcclxuICB9LFxyXG4gIHN1bW1hcml6ZTogZnVuY3Rpb24gc3VtbWFyaXplKCkge1xyXG4gICAgdGhpcy5maWVsZHMuU3VtbWFyeS5zZXRWYWx1ZShyZWN1ci50b1N0cmluZyh0aGlzLmdldFJlY3VycmVuY2UoKSkpO1xyXG4gICAgdGhpcy5maWVsZHMuU2NhbGUuc2V0VmFsdWUocmVjdXIuZ2V0UGFuZWwocGFyc2VJbnQodGhpcy5maWVsZHMuUmVjdXJQZXJpb2QuZ2V0VmFsdWUoKSwgMTApLCB0cnVlKSk7XHJcbiAgfSxcclxuICBvbkFmdGVyQ29tcGxldGlvbkNoYW5nZTogZnVuY3Rpb24gb25BZnRlckNvbXBsZXRpb25DaGFuZ2UodmFsdWUpIHtcclxuICAgIGxldCBycCA9IHBhcnNlSW50KHRoaXMuZmllbGRzLlJlY3VyUGVyaW9kLmdldFZhbHVlKCksIDEwKTtcclxuXHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgcnAgKz0gKCcwMjU4Jy5pbmRleE9mKHJwKSA+PSAwKSA/IDEgOiAyO1xyXG4gICAgICB0aGlzLmZpZWxkcy5SZWN1ckl0ZXJhdGlvbnMuc2V0VmFsdWUoLTEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKCc2OScuaW5kZXhPZihycCkgPj0gMCkge1xyXG4gICAgICAgIGlmIChwYXJzZUludCh0aGlzLmZpZWxkcy5PcmRXZWVrLmdldFZhbHVlKCksIDEwKSkge1xyXG4gICAgICAgICAgcnAgLT0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcnAgLT0gMjtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcnAgLT0gMTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmZpZWxkcy5SZWN1ckl0ZXJhdGlvbnMuc2V0VmFsdWUodGhpcy5lbnRyeS5SZWN1ckl0ZXJhdGlvbnMgPiAwID8gdGhpcy5lbnRyeS5SZWN1ckl0ZXJhdGlvbnMgOiByZWN1ci5kZWZhdWx0SXRlcmF0aW9uc1tycF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmllbGRzLlJlY3VyUGVyaW9kLnNldFZhbHVlKHJwKTtcclxuICAgIHRoaXMucmVzZXRVSSgpO1xyXG4gIH0sXHJcbiAgb25JbnRlcnZhbENoYW5nZTogZnVuY3Rpb24gb25JbnRlcnZhbENoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRTcGVjID0gcGFyc2VJbnQodGhpcy5maWVsZHMuUmVjdXJQZXJpb2RTcGVjLmdldFZhbHVlKCksIDEwKTtcclxuICAgIGNvbnN0IGludGVydmFsID0gY3VycmVudFNwZWMgJSA2NTUzNjtcclxuXHJcbiAgICBjb25zdCB0aGVWYWx1ZSA9IHBhcnNlSW50KHZhbHVlLCAxMCk7XHJcbiAgICBpZiAodGhlVmFsdWUgJiYgdGhlVmFsdWUgPiAwKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLlJlY3VyUGVyaW9kU3BlYy5zZXRWYWx1ZShjdXJyZW50U3BlYyAtIGludGVydmFsICsgcGFyc2VJbnQodGhlVmFsdWUsIDEwKSk7XHJcbiAgICAgIHRoaXMuZmllbGRzLkVuZERhdGUuc2V0VmFsdWUocmVjdXIuY2FsY0VuZERhdGUodGhpcy5maWVsZHMuU3RhcnREYXRlLmdldFZhbHVlKCksIHRoaXMuZ2V0UmVjdXJyZW5jZSgpKS50b0RhdGUoKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBJbnZhbGlkIGlucHV0LCByZXNldCB0byBjdXJyZW50IEludGVydmFsXHJcbiAgICAgIGZpZWxkLnNldFZhbHVlKGludGVydmFsKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnN1bW1hcml6ZSgpO1xyXG4gIH0sXHJcbiAgb25SZWN1ckl0ZXJhdGlvbnNDaGFuZ2U6IGZ1bmN0aW9uIG9uUmVjdXJJdGVyYXRpb25zQ2hhbmdlKHZhbHVlKSB7XHJcbiAgICBjb25zdCB0aGVWYWx1ZSA9IHBhcnNlSW50KHZhbHVlLCAxMCk7XHJcbiAgICBpZiAodGhlVmFsdWUgJiYgdGhlVmFsdWUgPiAwKSB7XHJcbiAgICAgIHRoaXMuZW50cnkuUmVjdXJJdGVyYXRpb25zID0gdmFsdWU7XHJcbiAgICAgIGNvbnN0IG5ld0VuZERhdGUgPSByZWN1ci5jYWxjRW5kRGF0ZSh0aGlzLmZpZWxkcy5TdGFydERhdGUuZ2V0VmFsdWUoKSwgdGhpcy5nZXRSZWN1cnJlbmNlKCkpLnRvRGF0ZSgpO1xyXG5cclxuICAgICAgaWYgKG5ld0VuZERhdGUgIT09IHRoaXMuZmllbGRzLkVuZERhdGUuZ2V0VmFsdWUoKSkge1xyXG4gICAgICAgIHRoaXMuZmllbGRzLkVuZERhdGUuc2V0VmFsdWUobmV3RW5kRGF0ZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIEludmFsaWQgaW5wdXQsIHJlc2V0IHRvIHZhbHVlIGNhbGN1bGF0ZWQgZnJvbSBFbmREYXRlXHJcbiAgICAgIHRoaXMub25FbmREYXRlQ2hhbmdlKHRoaXMuZmllbGRzLkVuZERhdGUuZ2V0VmFsdWUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zdW1tYXJpemUoKTtcclxuICB9LFxyXG4gIG9uRW5kRGF0ZUNoYW5nZTogZnVuY3Rpb24gb25FbmREYXRlQ2hhbmdlKHZhbHVlKSB7XHJcbiAgICBpZiAodmFsdWUgPj0gdGhpcy5maWVsZHMuU3RhcnREYXRlLmdldFZhbHVlKCkpIHtcclxuICAgICAgY29uc3QgaXRlcmF0aW9ucyA9IHJlY3VyLmNhbGNSZWN1ckl0ZXJhdGlvbnMoXHJcbiAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgdGhpcy5maWVsZHMuU3RhcnREYXRlLmdldFZhbHVlKCksXHJcbiAgICAgICAgdGhpcy5maWVsZHMuSW50ZXJ2YWwuZ2V0VmFsdWUoKSxcclxuICAgICAgICB0aGlzLmZpZWxkcy5SZWN1clBlcmlvZC5nZXRWYWx1ZSgpXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBpZiAoaXRlcmF0aW9ucyAhPT0gcGFyc2VJbnQodGhpcy5maWVsZHMuUmVjdXJJdGVyYXRpb25zLmdldFZhbHVlKCksIDEwKSkge1xyXG4gICAgICAgIHRoaXMuZmllbGRzLlJlY3VySXRlcmF0aW9ucy5zZXRWYWx1ZShpdGVyYXRpb25zKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gY2FuJ3QgZW5kIGJlZm9yZSBzdGFydCEgcmVzZXQuXHJcbiAgICAgIHRoaXMub25SZWN1ckl0ZXJhdGlvbnNDaGFuZ2UodGhpcy5maWVsZHMuUmVjdXJJdGVyYXRpb25zLmdldFZhbHVlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3VtbWFyaXplKCk7XHJcbiAgfSxcclxuICBvbkRheUNoYW5nZTogZnVuY3Rpb24gb25EYXlDaGFuZ2UodmFsdWUsIGZpZWxkKSB7XHJcbiAgICBjb25zdCBzdGFydERhdGUgPSB0aGlzLmZpZWxkcy5TdGFydERhdGUuZ2V0VmFsdWUoKTtcclxuICAgIGNvbnN0IG1heFZhbHVlID0gbW9tZW50KHN0YXJ0RGF0ZSkuZGF5c0luTW9udGgoKTtcclxuXHJcbiAgICBpZiAodmFsdWUgPiAwICYmIHZhbHVlIDw9IG1heFZhbHVlKSB7XHJcbiAgICAgIHN0YXJ0RGF0ZS5zZXREYXRlKHZhbHVlKTtcclxuICAgIH0gZWxzZSB7IC8vIHJlc2V0IGZpZWxkIHRvIGFjY2VwdGFibGUgdmFsdWVcclxuICAgICAgaWYgKHZhbHVlID4gMCkge1xyXG4gICAgICAgIHN0YXJ0RGF0ZS5zZXREYXRlKG1heFZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgICBmaWVsZC5zZXRWYWx1ZShzdGFydERhdGUuZ2V0RGF0ZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmZpZWxkcy5TdGFydERhdGUuc2V0VmFsdWUoc3RhcnREYXRlKTtcclxuICAgIC8vIHdlZWtkYXkocykvb3JkV2Vlay9FbmREYXRlIG1heSBuZWVkIGFkanVzdGluZ1xyXG4gICAgdGhpcy5vblN0YXJ0RGF0ZUNoYW5nZSh2YWx1ZSwgZmllbGQpO1xyXG4gIH0sXHJcbiAgb25TdGFydERhdGVDaGFuZ2U6IGZ1bmN0aW9uIG9uU3RhcnREYXRlQ2hhbmdlKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgLy8gd2hlbiBmaWVsZCBhbHRlcnMgU3RhcnREYXRlLCBvdGhlciBmaWVsZHMgbmVlZCB0byBiZSBhZGp1c3RlZFxyXG4gICAgY29uc3Qgd2Vla2RheXMgPSByZWN1ci5nZXRXZWVrZGF5cyhwYXJzZUludCh0aGlzLmZpZWxkcy5SZWN1clBlcmlvZFNwZWMuZ2V0VmFsdWUoKSwgMTApKTtcclxuICAgIGNvbnN0IHBhbmVsID0gcGFyc2VJbnQodGhpcy5maWVsZHMuUmVjdXJQZXJpb2QuZ2V0VmFsdWUoKSwgMTApO1xyXG4gICAgY29uc3QgdGhlVmFsdWUgPSBwYXJzZUludCh2YWx1ZS5rZXkgfHwgdmFsdWUsIDEwKTtcclxuICAgIGxldCBzdGFydERhdGUgPSB0aGlzLmZpZWxkcy5TdGFydERhdGUuZ2V0VmFsdWUoKTtcclxuICAgIGxldCB3ZWVrZGF5ID0gc3RhcnREYXRlLmdldERheSgpO1xyXG4gICAgbGV0IG9yZFdlZWsgPSBwYXJzZUludCgoKHN0YXJ0RGF0ZS5nZXREYXRlKCkgLSAxKSAvIDcpLCAxMCkgKyAxO1xyXG5cclxuICAgIHN3aXRjaCAoZmllbGQubmFtZSkge1xyXG4gICAgICBjYXNlICdXZWVrZGF5cyc6XHJcbiAgICAgICAgLy8gb25seSBjaGFuZ2UgU3RhcnREYXRlIGlmIG9yaWdpbmFsIHdlZWtkYXkgbm90IGluY2x1ZGVkXHJcbiAgICAgICAgZm9yIChsZXQgd2QgPSAwOyB3ZCA8IDc7IHdkKyspIHtcclxuICAgICAgICAgIGlmICh3ZWVrZGF5c1t3ZF0gJiYgIXdlZWtkYXlzW3dlZWtkYXldKSB7XHJcbiAgICAgICAgICAgIHdlZWtkYXkgPSB3ZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdPcmRXZWVrZGF5JzpcclxuICAgICAgICB3ZWVrZGF5ID0gdGhlVmFsdWU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ09yZFdlZWsnOlxyXG4gICAgICAgIGlmICh0aGVWYWx1ZSkge1xyXG4gICAgICAgICAgb3JkV2VlayA9IHRoZVZhbHVlO1xyXG4gICAgICAgICAgaWYgKHBhbmVsID09PSA0IHx8IHBhbmVsID09PSA3KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmllbGRzLlJlY3VyUGVyaW9kLnNldFZhbHVlKHBhbmVsICsgMSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRVSSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAocGFuZWwgPT09IDUgfHwgcGFuZWwgPT09IDgpIHtcclxuICAgICAgICAgIHRoaXMuZmllbGRzLlJlY3VyUGVyaW9kLnNldFZhbHVlKHBhbmVsIC0gMSk7XHJcbiAgICAgICAgICB0aGlzLnJlc2V0VUkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ09yZE1vbnRoJzpcclxuICAgICAgICBzdGFydERhdGUuc2V0TW9udGgodGhlVmFsdWUpO1xyXG4gICAgICAgIHdlZWtkYXkgPSBzdGFydERhdGUuZ2V0RGF5KCk7XHJcbiAgICAgICAgb3JkV2VlayA9IHBhcnNlSW50KCgoc3RhcnREYXRlLmdldERhdGUoKSAtIDEpIC8gNykudG9TdHJpbmcoKSwgMTApICsgMTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgIH1cclxuXHJcbiAgICBzdGFydERhdGUgPSByZWN1ci5jYWxjRGF0ZU9mTnRoV2Vla2RheShzdGFydERhdGUsIHdlZWtkYXksIG9yZFdlZWspLnRvRGF0ZSgpO1xyXG4gICAgdGhpcy5maWVsZHMuU3RhcnREYXRlLnNldFZhbHVlKHN0YXJ0RGF0ZSk7XHJcbiAgICB0aGlzLmZpZWxkcy5FbmREYXRlLnNldFZhbHVlKHJlY3VyLmNhbGNFbmREYXRlKHN0YXJ0RGF0ZSwgdGhpcy5nZXRSZWN1cnJlbmNlKCkpLnRvRGF0ZSgpKTtcclxuICAgIHRoaXMuZmllbGRzLkRheS5zZXRWYWx1ZShzdGFydERhdGUuZ2V0RGF0ZSgpKTtcclxuICAgIHRoaXMuZmllbGRzLk9yZFdlZWtkYXkuc2V0VmFsdWUoc3RhcnREYXRlLmdldERheSgpKTtcclxuXHJcbiAgICBjb25zdCB3ZWVrRGF0YSA9IHRoaXMuY3JlYXRlT3JkRGF0YSh0aGlzLmZvcm1hdFNpbmdsZVdlZWtkYXkoc3RhcnREYXRlLmdldERheSgpKSk7XHJcbiAgICB0aGlzLmZpZWxkcy5PcmRXZWVrLmRhdGEgPSB3ZWVrRGF0YTtcclxuICAgIHRoaXMuc3VtbWFyaXplKCk7XHJcbiAgICBsZXQga2V5ID0gdGhpcy5maWVsZHMuT3JkV2Vlay5nZXRWYWx1ZSgpO1xyXG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGtleSA9IGtleS4ka2V5O1xyXG4gICAgICB0aGlzLmZpZWxkcy5PcmRXZWVrLnNldFZhbHVlKHdlZWtEYXRhLiRyZXNvdXJjZXNba2V5XSk7XHJcbiAgICB9IGVsc2UgaWYgKCFpc05hTihwYXJzZUludChrZXksIDEwKSkpIHtcclxuICAgICAgdGhpcy5maWVsZHMuT3JkV2Vlay5zZXRWYWx1ZSh3ZWVrRGF0YS4kcmVzb3VyY2VzW2tleV0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25TY2FsZUNoYW5nZTogZnVuY3Rpb24gb25TY2FsZUNoYW5nZSh2YWx1ZSkge1xyXG4gICAgY29uc3Qgc3RhcnREYXRlID0gdGhpcy5maWVsZHMuU3RhcnREYXRlLmdldFZhbHVlKCk7XHJcbiAgICBjb25zdCBhZnRlckNvbXBsZXRpb24gPSB0aGlzLmZpZWxkcy5BZnRlckNvbXBsZXRpb24uZ2V0VmFsdWUoKSA/IDEgOiAwO1xyXG4gICAgY29uc3QgaW50ZXJ2YWwgPSBwYXJzZUludCh0aGlzLmZpZWxkcy5JbnRlcnZhbC5nZXRWYWx1ZSgpLCAxMCk7XHJcbiAgICBsZXQgcmVjdXJQZXJpb2QgPSBwYXJzZUludCh0aGlzLmZpZWxkcy5SZWN1clBlcmlvZC5nZXRWYWx1ZSgpLCAxMCk7XHJcblxyXG4gICAgc3dpdGNoIChwYXJzZUludCh2YWx1ZS5rZXksIDEwKSkge1xyXG4gICAgICBjYXNlIDA6XHJcbiAgICAgICAgLy8gZGF5c1xyXG4gICAgICAgIGlmIChyZWN1clBlcmlvZCA8IDIpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVjdXJQZXJpb2QgPSAwICsgYWZ0ZXJDb21wbGV0aW9uO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDE6XHJcbiAgICAgICAgLy8gd2Vla3NcclxuICAgICAgICBpZiAocmVjdXJQZXJpb2QgPiAxICYmIHJlY3VyUGVyaW9kIDwgNCkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZWN1clBlcmlvZCA9IDIgKyBhZnRlckNvbXBsZXRpb247XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMjpcclxuICAgICAgICAvLyBtb250aHNcclxuICAgICAgICBpZiAocmVjdXJQZXJpb2QgPiAzICYmIHJlY3VyUGVyaW9kIDwgNykge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZWN1clBlcmlvZCA9IDQgKyBhZnRlckNvbXBsZXRpb24gKyBhZnRlckNvbXBsZXRpb247XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMzpcclxuICAgICAgICAvLyB5ZWFyc1xyXG4gICAgICAgIGlmIChyZWN1clBlcmlvZCA+IDYpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVjdXJQZXJpb2QgPSA3ICsgYWZ0ZXJDb21wbGV0aW9uICsgYWZ0ZXJDb21wbGV0aW9uO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgfVxyXG4gICAgdGhpcy5maWVsZHMuUmVjdXJQZXJpb2Quc2V0VmFsdWUocmVjdXJQZXJpb2QpO1xyXG4gICAgdGhpcy5maWVsZHMuUmVjdXJJdGVyYXRpb25zLnNldFZhbHVlKHJlY3VyLmRlZmF1bHRJdGVyYXRpb25zW3JlY3VyUGVyaW9kXSk7XHJcbiAgICB0aGlzLmZpZWxkcy5SZWN1clBlcmlvZFNwZWMuc2V0VmFsdWUocmVjdXIuZ2V0UmVjdXJQZXJpb2RTcGVjKHJlY3VyUGVyaW9kLCBzdGFydERhdGUsIFtdLCBpbnRlcnZhbCkpO1xyXG4gICAgdGhpcy5maWVsZHMuV2Vla2RheXMuc2V0VmFsdWUocmVjdXIuZ2V0V2Vla2RheXModGhpcy5maWVsZHMuUmVjdXJQZXJpb2RTcGVjLmdldFZhbHVlKCkpKTtcclxuICAgIHRoaXMuZmllbGRzLkRheS5zZXRWYWx1ZShzdGFydERhdGUuZ2V0RGF0ZSgpKTtcclxuICAgIHRoaXMuZmllbGRzLk9yZE1vbnRoLnNldFZhbHVlKHN0YXJ0RGF0ZS5nZXRNb250aCgpICsgMSk7XHJcbiAgICB0aGlzLmZpZWxkcy5PcmRXZWVrLnNldFZhbHVlKDApO1xyXG4gICAgdGhpcy5maWVsZHMuRW5kRGF0ZS5zZXRWYWx1ZShyZWN1ci5jYWxjRW5kRGF0ZShzdGFydERhdGUsIHRoaXMuZ2V0UmVjdXJyZW5jZSgpKS50b0RhdGUoKSk7XHJcblxyXG4gICAgdGhpcy5yZXNldFVJKCk7XHJcbiAgfSxcclxuXHJcbiAgZm9ybWF0V2Vla2RheXM6IGZ1bmN0aW9uIGZvcm1hdFdlZWtkYXlzKHNlbGVjdGlvbnMpIHtcclxuICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xyXG4gICAgY29uc3Qgd2Vla2RheXMgPSBbMCwgMCwgMCwgMCwgMCwgMCwgMF07XHJcblxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gc2VsZWN0aW9ucykge1xyXG4gICAgICBpZiAoc2VsZWN0aW9uc1trZXldKSB7XHJcbiAgICAgICAgdmFsdWVzLnB1c2godGhpcy53ZWVrRGF5c1RleHRba2V5XSk7XHJcbiAgICAgICAgd2Vla2RheXNba2V5XSA9IDE7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuZmllbGRzLlJlY3VyUGVyaW9kU3BlYy5zZXRWYWx1ZShyZWN1ci5nZXRSZWN1clBlcmlvZFNwZWMoXHJcbiAgICAgIHBhcnNlSW50KHRoaXMuZmllbGRzLlJlY3VyUGVyaW9kLmdldFZhbHVlKCksIDEwKSxcclxuICAgICAgdGhpcy5maWVsZHMuU3RhcnREYXRlLmdldFZhbHVlKCksXHJcbiAgICAgIHdlZWtkYXlzLFxyXG4gICAgICBwYXJzZUludCh0aGlzLmZpZWxkcy5JbnRlcnZhbC5nZXRWYWx1ZSgpLCAxMClcclxuICAgICkpO1xyXG5cclxuICAgIHRoaXMuZW50cnkuV2Vla2RheXMgPSB3ZWVrZGF5cztcclxuICAgIHJldHVybiB2YWx1ZXMuam9pbignLCAnKTtcclxuICB9LFxyXG4gIGZvcm1hdFNpbmdsZVdlZWtkYXk6IGZ1bmN0aW9uIGZvcm1hdFNpbmdsZVdlZWtkYXkoc2VsZWN0aW9uKSB7XHJcbiAgICBpZiAoc2VsZWN0aW9uLiRkZXNjcmlwdG9yKSB7XHJcbiAgICAgIHJldHVybiBzZWxlY3Rpb24uJGRlc2NyaXB0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMud2Vla0RheXNUZXh0W3BhcnNlSW50KHNlbGVjdGlvbiwgMTApXTtcclxuICB9LFxyXG4gIGZvcm1hdE1vbnRoOiBmdW5jdGlvbiBmb3JtYXRNb250aChzZWxlY3Rpb24pIHtcclxuICAgIGlmIChzZWxlY3Rpb24uJGRlc2NyaXB0b3IpIHtcclxuICAgICAgcmV0dXJuIHNlbGVjdGlvbi4kZGVzY3JpcHRvcjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5tb250aHNUZXh0W3BhcnNlSW50KHNlbGVjdGlvbiwgMTApIC0gMV07XHJcbiAgfSxcclxuICBmb3JtYXRPcmQ6IGZ1bmN0aW9uIGZvcm1hdE9yZChzZWxlY3Rpb24pIHtcclxuICAgIGlmIChzZWxlY3Rpb24uJGRlc2NyaXB0b3IpIHtcclxuICAgICAgcmV0dXJuIHNlbGVjdGlvbi4kZGVzY3JpcHRvcjtcclxuICAgIH1cclxuICAgIHJldHVybiByZWN1ci5vcmRUZXh0W3BhcnNlSW50KHNlbGVjdGlvbiwgMTApXTtcclxuICB9LFxyXG4gIHByZXNlbGVjdFdlZWtkYXlzOiBmdW5jdGlvbiBwcmVzZWxlY3RXZWVrZGF5cygpIHtcclxuICAgIGNvbnN0IHByZXZpb3VzU2VsZWN0aW9ucyA9IFtdO1xyXG4gICAgY29uc3Qgd2Vla2RheXMgPSByZWN1ci5nZXRXZWVrZGF5cyh0aGlzLmZpZWxkcy5SZWN1clBlcmlvZFNwZWMuZ2V0VmFsdWUoKSk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3ZWVrZGF5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAod2Vla2RheXNbaV0pIHtcclxuICAgICAgICBwcmV2aW91c1NlbGVjdGlvbnMucHVzaChpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByZXZpb3VzU2VsZWN0aW9ucztcclxuICB9LFxyXG4gIGNyZWF0ZVNjYWxlRGF0YTogZnVuY3Rpb24gY3JlYXRlU2NhbGVEYXRhKCkge1xyXG4gICAgY29uc3QgbGlzdCA9IFtdO1xyXG5cclxuICAgIGZvciAoY29uc3Qgb3B0IGluIHRoaXMuZnJlcXVlbmN5T3B0aW9uc1RleHQpIHtcclxuICAgICAgaWYgKHRoaXMuZnJlcXVlbmN5T3B0aW9uc1RleHQuaGFzT3duUHJvcGVydHkob3B0KSkge1xyXG4gICAgICAgIGxpc3QucHVzaCh7XHJcbiAgICAgICAgICAka2V5OiBvcHQsXHJcbiAgICAgICAgICAkZGVzY3JpcHRvcjogdGhpcy5mcmVxdWVuY3lPcHRpb25zVGV4dFtvcHRdLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgJHJlc291cmNlczogbGlzdCxcclxuICAgIH07XHJcbiAgfSxcclxuICBjcmVhdGVXZWVrZGF5c0RhdGE6IGZ1bmN0aW9uIGNyZWF0ZVdlZWtkYXlzRGF0YSgpIHtcclxuICAgIGNvbnN0IGxpc3QgPSBbXTtcclxuXHJcbiAgICB0aGlzLndlZWtEYXlzVGV4dC5mb3JFYWNoKChuYW1lLCBpZHgpID0+IHtcclxuICAgICAgbGlzdC5wdXNoKHtcclxuICAgICAgICAka2V5OiBpZHgsXHJcbiAgICAgICAgJGRlc2NyaXB0b3I6IG5hbWUsXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgJHJlc291cmNlczogbGlzdCxcclxuICAgIH07XHJcbiAgfSxcclxuICBjcmVhdGVNb250aHNEYXRhOiBmdW5jdGlvbiBjcmVhdGVNb250aHNEYXRhKCkge1xyXG4gICAgY29uc3QgbGlzdCA9IFtdO1xyXG4gICAgdGhpcy5tb250aHNUZXh0LmZvckVhY2goKG5hbWUsIGlkeCkgPT4ge1xyXG4gICAgICBsaXN0LnB1c2goe1xyXG4gICAgICAgICRrZXk6IGlkeCxcclxuICAgICAgICAkZGVzY3JpcHRvcjogbmFtZSxcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICRyZXNvdXJjZXM6IGxpc3QsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgY3JlYXRlT3JkRGF0YTogZnVuY3Rpb24gY3JlYXRlT3JkRGF0YShkYXkgPSAnJykge1xyXG4gICAgY29uc3QgbGlzdCA9IFtdO1xyXG5cclxuICAgIGZvciAoY29uc3Qgb3JkIGluIHJlY3VyLm9yZFRleHQpIHtcclxuICAgICAgaWYgKHJlY3VyLm9yZFRleHQuaGFzT3duUHJvcGVydHkob3JkKSkge1xyXG4gICAgICAgIGxpc3QucHVzaCh7XHJcbiAgICAgICAgICAka2V5OiBvcmQsXHJcbiAgICAgICAgICAkZGVzY3JpcHRvcjogc3RyaW5nLnN1YnN0aXR1dGUocmVjdXIub3JkVGV4dFtvcmRdLCBbZGF5XSksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAkcmVzb3VyY2VzOiBsaXN0LFxyXG4gICAgfTtcclxuICB9LFxyXG4gIHNldFZhbHVlczogZnVuY3Rpb24gc2V0VmFsdWVzKHZhbHVlcykge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuXHJcbiAgICAvLyBjYWxjdWxhdGUgc29tZSB2YWx1ZXMgZnJvbSB0aGUgb25lcyBwcm92aWRlZFxyXG4gICAgdGhpcy5lbnRyeSA9IHZhbHVlcztcclxuICAgIHRoaXMuZW50cnkuU3RhcnREYXRlID0gYXJnb3MuQ29udmVydC50b0RhdGVGcm9tU3RyaW5nKHZhbHVlcy5TdGFydERhdGUpOyAvLyBUT0RPOiBBdm9pZCBnbG9iYWxcclxuICAgIHRoaXMuZW50cnkuRW5kRGF0ZSA9IHJlY3VyLmNhbGNFbmREYXRlKHZhbHVlcy5TdGFydERhdGUsIHZhbHVlcykudG9EYXRlKCk7XHJcbiAgICB0aGlzLmVudHJ5LlJlY3VycmluZyA9ICh0eXBlb2YgdmFsdWVzLlJlY3VycmluZyA9PT0gJ3N0cmluZycpID8gL150cnVlJC9pLnRlc3QodmFsdWVzLlJlY3VycmluZykgOiB2YWx1ZXMuUmVjdXJyaW5nO1xyXG4gICAgY29uc3Qgb3JkID0gcmVjdXIuZ2V0T3JkKHRoaXMuZW50cnkpO1xyXG4gICAgdGhpcy5lbnRyeS5JbnRlcnZhbCA9IHZhbHVlcy5SZWN1clBlcmlvZFNwZWMgJSA2NTUzNjtcclxuICAgIHRoaXMuZW50cnkuQWZ0ZXJDb21wbGV0aW9uID0gcmVjdXIuaXNBZnRlckNvbXBsZXRpb24odmFsdWVzLlJlY3VyUGVyaW9kKTtcclxuICAgIHRoaXMuZW50cnkuRGF5ID0gdGhpcy5lbnRyeS5TdGFydERhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgdGhpcy5lbnRyeS5XZWVrZGF5cyA9IHJlY3VyLmdldFdlZWtkYXlzKHZhbHVlcy5SZWN1clBlcmlvZFNwZWMpO1xyXG4gICAgdGhpcy5lbnRyeS5PcmRXZWVrID0gb3JkLndlZWs7XHJcbiAgICB0aGlzLmVudHJ5Lk9yZFdlZWtkYXkgPSBvcmQud2Vla2RheTtcclxuICAgIHRoaXMuZW50cnkuT3JkTW9udGggPSBvcmQubW9udGg7XHJcblxyXG4gICAgLy8gRXZlbiBoaWRkZW4gYW5kIGZhbHN5IGZpZWxkcyBuZWVkIHRoZWlyIHZhbHVlcyBzZXQgKG5vdCBmcm9tIHBhcmVudClcclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiB0aGlzLmZpZWxkcykge1xyXG4gICAgICBpZiAodGhpcy5maWVsZHMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgICBjb25zdCBmaWVsZCA9IHRoaXMuZmllbGRzW25hbWVdO1xyXG4gICAgICAgIC8vIDAgKERhaWx5IHBhbmVsKSBvciBmYWxzZSAoQWZ0ZXJDb21wbGV0aW9uKSBhcmUgbGVnaXRpbWF0ZSB2YWx1ZXMhXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmVudHJ5W25hbWVdICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgZmllbGQuc2V0VmFsdWUodGhpcy5lbnRyeVtuYW1lXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZXNldFVJKCk7XHJcbiAgfSxcclxuICBnZXRWYWx1ZXM6IGZ1bmN0aW9uIGdldFZhbHVlcygpIHtcclxuICAgIGNvbnN0IG8gPSB0aGlzLmdldFJlY3VycmVuY2UoKTtcclxuXHJcbiAgICBvLlJlY3VycmluZyA9IChvLlJlY3VyUGVyaW9kID49IDApO1xyXG4gICAgby5FbmREYXRlID0gcmVjdXIuY2FsY0VuZERhdGUoby5TdGFydERhdGUsIG8pLnRvRGF0ZSgpO1xyXG5cclxuICAgIHJldHVybiBvO1xyXG4gIH0sXHJcbiAgZ2V0UmVjdXJyZW5jZTogZnVuY3Rpb24gZ2V0UmVjdXJyZW5jZSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIFN0YXJ0RGF0ZTogdGhpcy5maWVsZHMuU3RhcnREYXRlLmdldFZhbHVlKCksXHJcbiAgICAgIFJlY3VyUGVyaW9kOiBwYXJzZUludCh0aGlzLmZpZWxkcy5SZWN1clBlcmlvZC5nZXRWYWx1ZSgpLCAxMCksXHJcbiAgICAgIFJlY3VyUGVyaW9kU3BlYzogcGFyc2VJbnQodGhpcy5maWVsZHMuUmVjdXJQZXJpb2RTcGVjLmdldFZhbHVlKCksIDEwKSxcclxuICAgICAgUmVjdXJJdGVyYXRpb25zOiBwYXJzZUludCh0aGlzLmZpZWxkcy5SZWN1ckl0ZXJhdGlvbnMuZ2V0VmFsdWUoKSwgMTApLFxyXG4gICAgICBSZWN1cnJlbmNlU3RhdGU6IHRoaXMuZmllbGRzLlJlY3VycmVuY2VTdGF0ZS5nZXRWYWx1ZSgpLFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5b3V0IHx8ICh0aGlzLmxheW91dCA9IFt7XHJcbiAgICAgIGxhYmVsOiB0aGlzLnN1bW1hcnlUZXh0LFxyXG4gICAgICBuYW1lOiAnU3VtbWFyeScsXHJcbiAgICAgIHByb3BlcnR5OiAnU3VtbWFyeScsXHJcbiAgICAgIGV4Y2x1ZGU6IHRydWUsXHJcbiAgICAgIHR5cGU6ICd0ZXh0YXJlYScsXHJcbiAgICAgIHJlYWRvbmx5OiB0cnVlLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5zdGFydGluZ1RleHQsXHJcbiAgICAgIG5hbWU6ICdTdGFydERhdGUnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1N0YXJ0RGF0ZScsXHJcbiAgICAgIHR5cGU6ICdkYXRlJyxcclxuICAgICAgZGF0ZUZvcm1hdFRleHQ6IHRoaXMuc3RhcnRpbmdGb3JtYXRUZXh0LFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5yZWN1cnJpbmdGcmVxdWVuY3lUZXh0LFxyXG4gICAgICB0aXRsZTogdGhpcy5yZWN1cnJpbmdGcmVxdWVuY3lUZXh0LFxyXG4gICAgICBuYW1lOiAnU2NhbGUnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1NjYWxlJyxcclxuICAgICAgdHlwZTogJ3NlbGVjdCcsXHJcbiAgICAgIHZpZXc6ICdzZWxlY3RfbGlzdCcsXHJcbiAgICAgIGV4Y2x1ZGU6IHRydWUsXHJcbiAgICAgIGRhdGE6IHRoaXMuY3JlYXRlU2NhbGVEYXRhKCksXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLmZyZXF1ZW5jeUludGVydmFsVGV4dCxcclxuICAgICAgdGl0bGU6IHRoaXMuZnJlcXVlbmN5SW50ZXJ2YWxUZXh0LFxyXG4gICAgICBuYW1lOiAnSW50ZXJ2YWwnLFxyXG4gICAgICBwcm9wZXJ0eTogJ0ludGVydmFsJyxcclxuICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICBpbnB1dFR5cGU6ICdudW1lcmljJyxcclxuICAgICAgZXhjbHVkZTogdHJ1ZSxcclxuICAgICAgbm90aWZpY2F0aW9uVHJpZ2dlcjogJ2JsdXInLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5hZnRlckNvbXBsZXRpb25UZXh0LFxyXG4gICAgICBuYW1lOiAnQWZ0ZXJDb21wbGV0aW9uJyxcclxuICAgICAgcHJvcGVydHk6ICdBZnRlckNvbXBsZXRpb24nLFxyXG4gICAgICB0eXBlOiAnYm9vbGVhbicsXHJcbiAgICAgIGV4Y2x1ZGU6IHRydWUsXHJcbiAgICAgIG9uVGV4dDogdGhpcy55ZXNUZXh0LFxyXG4gICAgICBvZmZUZXh0OiB0aGlzLm5vVGV4dCxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMub25UZXh0LFxyXG4gICAgICB0aXRsZTogdGhpcy5vblRleHQsXHJcbiAgICAgIG5hbWU6ICdPcmRXZWVrJyxcclxuICAgICAgcHJvcGVydHk6ICdPcmRXZWVrJyxcclxuICAgICAgZXhjbHVkZTogdHJ1ZSxcclxuICAgICAgdHlwZTogJ3NlbGVjdCcsXHJcbiAgICAgIHZpZXc6ICdzZWxlY3RfbGlzdCcsXHJcbiAgICAgIGRhdGE6IHRoaXMuY3JlYXRlT3JkRGF0YSgpLFxyXG4gICAgICB0ZXh0UmVuZGVyZXI6IHRoaXMuZm9ybWF0T3JkLmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMuZGF5TnVtYmVyVGV4dCxcclxuICAgICAgdGl0bGU6IHRoaXMuZGF5TnVtYmVyVGV4dCxcclxuICAgICAgbmFtZTogJ0RheScsXHJcbiAgICAgIHByb3BlcnR5OiAnRGF5JyxcclxuICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICBpbnB1dFR5cGU6ICdudW1lcmljJyxcclxuICAgICAgZXhjbHVkZTogdHJ1ZSxcclxuICAgICAgbm90aWZpY2F0aW9uVHJpZ2dlcjogJ2JsdXInLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy53ZWVrZGF5c1RleHQsXHJcbiAgICAgIHRpdGxlOiB0aGlzLndlZWtkYXlzVGV4dCxcclxuICAgICAgbmFtZTogJ1dlZWtkYXlzJyxcclxuICAgICAgcHJvcGVydHk6ICdXZWVrZGF5cycsXHJcbiAgICAgIGV4Y2x1ZGU6IHRydWUsXHJcbiAgICAgIHR5cGU6ICdzZWxlY3QnLFxyXG4gICAgICBzaW5nbGVTZWxlY3Q6IGZhbHNlLFxyXG4gICAgICB2aWV3OiAnc2VsZWN0X2xpc3QnLFxyXG4gICAgICBkYXRhOiB0aGlzLmNyZWF0ZVdlZWtkYXlzRGF0YSgpLFxyXG4gICAgICBwcmV2aW91c1NlbGVjdGlvbnM6IHRoaXMucHJlc2VsZWN0V2Vla2RheXMuYmluZERlbGVnYXRlKHRoaXMpLFxyXG4gICAgICB0ZXh0UmVuZGVyZXI6IHRoaXMuZm9ybWF0V2Vla2RheXMuYmluZERlbGVnYXRlKHRoaXMpLFxyXG4gICAgICBmb3JtYXRWYWx1ZTogdGhpcy5mb3JtYXRXZWVrZGF5cy5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLnNpbmdsZVdlZWtkYXlUZXh0LFxyXG4gICAgICB0aXRsZTogdGhpcy5zaW5nbGVXZWVrZGF5VGV4dCxcclxuICAgICAgbmFtZTogJ09yZFdlZWtkYXknLFxyXG4gICAgICBwcm9wZXJ0eTogJ09yZFdlZWtkYXknLFxyXG4gICAgICBleGNsdWRlOiB0cnVlLFxyXG4gICAgICB0eXBlOiAnc2VsZWN0JyxcclxuICAgICAgc2luZ2xlU2VsZWN0OiB0cnVlLFxyXG4gICAgICB2aWV3OiAnc2VsZWN0X2xpc3QnLFxyXG4gICAgICBkYXRhOiB0aGlzLmNyZWF0ZVdlZWtkYXlzRGF0YSgpLFxyXG4gICAgICB0ZXh0UmVuZGVyZXI6IHRoaXMuZm9ybWF0U2luZ2xlV2Vla2RheS5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLm1vbnRoVGV4dCxcclxuICAgICAgdGl0bGU6IHRoaXMubW9udGhUZXh0LFxyXG4gICAgICBuYW1lOiAnT3JkTW9udGgnLFxyXG4gICAgICBwcm9wZXJ0eTogJ09yZE1vbnRoJyxcclxuICAgICAgZXhjbHVkZTogdHJ1ZSxcclxuICAgICAgdHlwZTogJ3NlbGVjdCcsXHJcbiAgICAgIHNpbmdsZVNlbGVjdDogdHJ1ZSxcclxuICAgICAgdmlldzogJ3NlbGVjdF9saXN0JyxcclxuICAgICAgZGF0YTogdGhpcy5jcmVhdGVNb250aHNEYXRhKCksXHJcbiAgICAgIHRleHRSZW5kZXJlcjogdGhpcy5mb3JtYXRNb250aC5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdSZWN1ckl0ZXJhdGlvbnMnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1JlY3VySXRlcmF0aW9ucycsXHJcbiAgICAgIGxhYmVsOiB0aGlzLm9jY3VycmVuY2VzVGV4dCxcclxuICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICBpbnB1dFR5cGU6ICdudW1lcmljJyxcclxuICAgICAgaW5jbHVkZTogdHJ1ZSxcclxuICAgICAgbm90aWZpY2F0aW9uVHJpZ2dlcjogJ2JsdXInLFxyXG4gICAgfSwge1xyXG4gICAgICB0eXBlOiAnaGlkZGVuJyxcclxuICAgICAgbmFtZTogJ1JlY3VyUGVyaW9kJyxcclxuICAgICAgcHJvcGVydHk6ICdSZWN1clBlcmlvZCcsXHJcbiAgICAgIGluY2x1ZGU6IHRydWUsXHJcbiAgICB9LCB7XHJcbiAgICAgIHR5cGU6ICdoaWRkZW4nLFxyXG4gICAgICBuYW1lOiAnUmVjdXJQZXJpb2RTcGVjJyxcclxuICAgICAgcHJvcGVydHk6ICdSZWN1clBlcmlvZFNwZWMnLFxyXG4gICAgICBpbmNsdWRlOiB0cnVlLFxyXG4gICAgfSwge1xyXG4gICAgICB0eXBlOiAnaGlkZGVuJyxcclxuICAgICAgbmFtZTogJ1JlY3VycmVuY2VTdGF0ZScsXHJcbiAgICAgIHByb3BlcnR5OiAnUmVjdXJyZW5jZVN0YXRlJyxcclxuICAgICAgaW5jbHVkZTogdHJ1ZSxcclxuICAgIH0sIHtcclxuICAgICAgdHlwZTogJ2hpZGRlbicsXHJcbiAgICAgIG5hbWU6ICdSZWN1cnJpbmcnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1JlY3VycmluZycsXHJcbiAgICAgIGluY2x1ZGU6IHRydWUsXHJcbiAgICAgIGZvcm1hdFZhbHVlOiBmb3JtYXQuYm9vbCxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMuZW5kaW5nVGV4dCxcclxuICAgICAgbmFtZTogJ0VuZERhdGUnLFxyXG4gICAgICBwcm9wZXJ0eTogJ0VuZERhdGUnLFxyXG4gICAgICB0eXBlOiAnZGF0ZScsXHJcbiAgICAgIHRpbWVsZXNzOiBmYWxzZSxcclxuICAgICAgc2hvd1RpbWVQaWNrZXI6IGZhbHNlLFxyXG4gICAgICBkYXRlRm9ybWF0VGV4dDogdGhpcy5zdGFydGluZ1RpbWVsZXNzRm9ybWF0VGV4dCxcclxuICAgICAgbWluVmFsdWU6IChuZXcgRGF0ZSgxOTAwLCAwLCAxKSksXHJcbiAgICAgIHZhbGlkYXRvcjogW1xyXG4gICAgICAgIHZhbGlkYXRvci5leGlzdHMsXHJcbiAgICAgICAgdmFsaWRhdG9yLmlzRGF0ZUluUmFuZ2UsXHJcbiAgICAgIF0sXHJcbiAgICB9XSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=