define('crm/Views/Activity/Recurring', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/_base/array', '../../Format', '../../Validator', 'argos/Edit', '../../Recurrence', 'moment'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojo_baseArray, _Format, _Validator, _argosEdit, _Recurrence, _moment) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _array = _interopRequireDefault(_dojo_baseArray);

  var _format = _interopRequireDefault(_Format);

  var _validator = _interopRequireDefault(_Validator);

  var _Edit = _interopRequireDefault(_argosEdit);

  var _recur = _interopRequireDefault(_Recurrence);

  var _moment2 = _interopRequireDefault(_moment);

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
  var __class = (0, _declare['default'])('crm.Views.Activity.Recurring', [_Edit['default']], {
    // Localization
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
    weekDaysText: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    monthsText: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    frequencyOptionsText: ['days', 'weeks', 'months', 'years'],
    recurringFrequencyText: 'Recurring Frequency',
    yesText: 'Yes',
    noText: 'No',
    titleText: 'Recurrence',

    // View Properties
    monthNames: _moment2['default'].monthsShort,

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
    },
    resetUI: function resetUI() {
      // hide or reveal and set fields according to panel/RecurPeriod
      var rp = parseInt(this.fields.RecurPeriod.getValue(), 10);
      var startDate = this.fields.StartDate.getValue();
      var interval = this.fields.RecurPeriodSpec.getValue() % 65536;
      var showthese = 'Interval,AfterCompletion,';

      if (!_recur['default'].isAfterCompletion(rp)) {
        showthese += 'RecurIterations,EndDate,';
      }

      this.fields.RecurrenceState.setValue('rstMaster'); // undone when Once panel selected

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
      this.fields.RecurPeriodSpec.setValue(_recur['default'].getRecurPeriodSpec(rp, startDate, this.entry.Weekdays, interval));

      this.summarize();
    },
    summarize: function summarize() {
      this.fields.Summary.setValue(_recur['default'].toString(this.getRecurrence()));
      this.fields.Scale.setValue(_recur['default'].getPanel(parseInt(this.fields.RecurPeriod.getValue(), 10), true));
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
        this.fields.RecurIterations.setValue(this.entry.RecurIterations > 0 ? this.entry.RecurIterations : _recur['default'].defaultIterations[rp]);
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
        this.fields.EndDate.setValue(_recur['default'].calcEndDate(this.fields.StartDate.getValue(), this.getRecurrence()).toDate());
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
        var newEndDate = _recur['default'].calcEndDate(this.fields.StartDate.getValue(), this.getRecurrence()).toDate();

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
      if (value > this.fields.StartDate.getValue()) {
        var iterations = _recur['default'].calcRecurIterations(value, this.fields.StartDate.getValue(), this.fields.Interval.getValue(), this.fields.RecurPeriod.getValue());

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
      var maxValue = startDate.getDaysInMonth(); // <-- from lib date.js

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
      var weekdays = _recur['default'].getWeekdays(parseInt(this.fields.RecurPeriodSpec.getValue(), 10));
      var panel = parseInt(this.fields.RecurPeriod.getValue(), 10);
      var theValue = parseInt(value.key || value, 10);
      var startDate = this.fields.StartDate.getValue();
      var weekday = startDate.getDay();
      var ordWeek = parseInt(((startDate.getDate() - 1) / 7).toString(), 10) + 1;

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

      startDate = _recur['default'].calcDateOfNthWeekday(startDate, weekday, ordWeek).toDate();
      this.fields.StartDate.setValue(startDate);
      this.fields.EndDate.setValue(_recur['default'].calcEndDate(startDate, this.getRecurrence()).toDate());
      this.fields.Day.setValue(startDate.getDate());
      this.fields.OrdWeekday.setValue(startDate.getDay());

      this.summarize();
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
      this.fields.RecurIterations.setValue(_recur['default'].defaultIterations[recurPeriod]);
      this.fields.RecurPeriodSpec.setValue(_recur['default'].getRecurPeriodSpec(recurPeriod, startDate, [], interval));
      this.fields.Weekdays.setValue(_recur['default'].getWeekdays(this.fields.RecurPeriodSpec.getValue()));
      this.fields.Day.setValue(startDate.getDate());
      this.fields.OrdMonth.setValue(startDate.getMonth() + 1);
      this.fields.OrdWeek.setValue(0);
      this.fields.EndDate.setValue(_recur['default'].calcEndDate(startDate, this.getRecurrence()).toDate());

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
      this.fields.RecurPeriodSpec.setValue(_recur['default'].getRecurPeriodSpec(parseInt(this.fields.RecurPeriod.getValue(), 10), this.fields.StartDate.getValue(), weekdays, parseInt(this.fields.Interval.getValue(), 10)));

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
      return _recur['default'].ordText[parseInt(selection, 10)];
    },
    preselectWeekdays: function preselectWeekdays() {
      var previousSelections = [];
      var weekdays = _recur['default'].getWeekdays(this.fields.RecurPeriodSpec.getValue());

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
            '$key': opt,
            '$descriptor': this.frequencyOptionsText[opt]
          });
        }
      }

      return {
        '$resources': list
      };
    },
    createWeekdaysData: function createWeekdaysData() {
      var list = [];

      _array['default'].forEach(this.weekDaysText, function makeWeekdayList(name, idx) {
        list.push({
          '$key': idx,
          '$descriptor': name
        });
      });

      return {
        '$resources': list
      };
    },
    createMonthsData: function createMonthsData() {
      var list = [];
      _array['default'].forEach(this.monthsText, function makeMonthList(name, idx) {
        list.push({
          '$key': idx,
          '$descriptor': name
        });
      });
      return {
        '$resources': list
      };
    },
    createOrdData: function createOrdData() {
      var list = [];

      for (var ord in _recur['default'].ordText) {
        if (_recur['default'].ordText.hasOwnProperty(ord)) {
          list.push({
            '$key': ord,
            '$descriptor': _recur['default'].ordText[ord]
          });
        }
      }

      return {
        '$resources': list
      };
    },
    setValues: function setValues(values) {
      this.inherited(arguments);

      // calculate some values from the ones provided
      this.entry = values;
      this.entry.StartDate = argos.Convert.toDateFromString(values.StartDate);
      this.entry.EndDate = _recur['default'].calcEndDate(values.StartDate, values).toDate();
      this.entry.Recurring = typeof values.Recurring === 'string' ? /^true$/i.test(values.Recurring) : values.Recurring;
      var ord = _recur['default'].getOrd(this.entry);
      this.entry.Interval = values.RecurPeriodSpec % 65536;
      this.entry.AfterCompletion = _recur['default'].isAfterCompletion(values.RecurPeriod);
      this.entry.Day = this.entry.StartDate.getDate();
      this.entry.Weekdays = _recur['default'].getWeekdays(values.RecurPeriodSpec);
      this.entry.OrdWeek = ord.week;
      this.entry.OrdWeekday = ord.weekday;
      this.entry.OrdMonth = ord.month;

      // Even hidden and falsy fields need their values set (not from parent)
      for (var _name in this.fields) {
        if (this.fields.hasOwnProperty(_name)) {
          var field = this.fields[_name];
          // 0 (Daily panel) or false (AfterCompletion) are legitimate values!
          if (typeof this.entry[_name] !== 'undefined') {
            field.setValue(this.entry[_name]);
          }
        }
      }

      this.resetUI();
    },
    getValues: function getValues() {
      var o = this.getRecurrence();

      o.Recurring = o.RecurPeriod >= 0;
      o.EndDate = _recur['default'].calcEndDate(o.StartDate, o).toDate();

      return o;
    },
    getRecurrence: function getRecurrence() {
      return {
        'StartDate': this.fields.StartDate.getValue(),
        'RecurPeriod': parseInt(this.fields.RecurPeriod.getValue(), 10),
        'RecurPeriodSpec': parseInt(this.fields.RecurPeriodSpec.getValue(), 10),
        'RecurIterations': parseInt(this.fields.RecurIterations.getValue(), 10),
        'RecurrenceState': this.fields.RecurrenceState.getValue()
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
        formatValue: _format['default'].bool
      }, {
        label: this.endingText,
        name: 'EndDate',
        property: 'EndDate',
        type: 'date',
        timeless: false,
        showTimePicker: false,
        dateFormatText: this.startingFormatText,
        minValue: new Date(1900, 0, 1),
        validator: [_validator['default'].exists, _validator['default'].isDateInRange]
      }]);
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.Activity.Recurring', __class);
  module.exports = __class;
});
