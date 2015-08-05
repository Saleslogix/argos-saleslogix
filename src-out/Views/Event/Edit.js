define('crm/Views/Event/Edit', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', '../../Format', '../../Validator', 'argos/Edit', 'moment'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _Format, _Validator, _argosEdit, _moment) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _format = _interopRequireDefault(_Format);

  var _validator = _interopRequireDefault(_Validator);

  var _Edit = _interopRequireDefault(_argosEdit);

  var _moment2 = _interopRequireDefault(_moment);

  /**
   * @class crm.Views.Event.Edit
   *
   * @extends argos.Edit
   *
   * @requires crm.Format
   * @requires crm.Validator
   */
  var __class = (0, _declare['default'])('crm.Views.Event.Edit', [_Edit['default']], {
    //Localization
    titleText: 'Event',
    typeText: 'type',
    descriptionText: 'description',
    startDateText: 'start date',
    endDateText: 'end date',
    startingFormatText: 'M/D/YYYY h:mm A',

    //View Properties
    entityName: 'Event',
    id: 'event_edit',
    insertSecurity: null, //'Entities/Event/Add',
    updateSecurity: null, //'Entities/Event/Edit',
    querySelect: ['Description', 'EndDate', 'StartDate', 'UserId', 'Type'],
    resourceKind: 'events',

    eventTypesText: {
      'Vacation': 'Vacation',
      'Business Trip': 'Business Trip',
      'Conference': 'Conference',
      'Holiday': 'Holiday'
    },
    startup: function startup() {
      this.inherited(arguments);

      this.connect(this.fields['StartDate'], 'onChange', this.onStartDateChange);
    },
    onStartDateChange: function onStartDateChange(val) {
      var endDate = this.fields['EndDate'].getValue();

      if (endDate < val) {
        this.fields['EndDate'].setValue(val);
      }
    },
    formatTypeText: function formatTypeText(val, key, text) {
      return this.eventTypesText[key] || text;
    },
    createTypeData: function createTypeData() {
      var list = [],
          type;

      for (type in this.eventTypesText) {
        if (this.eventTypesText.hasOwnProperty(type)) {
          list.push({
            '$key': type,
            '$descriptor': this.eventTypesText[type]
          });
        }
      }

      return {
        '$resources': list
      };
    },
    applyUserActivityContext: function applyUserActivityContext(context) {
      var view, currentDate, userOptions, startTimeOption, startTime, startDate, endDate;

      view = App.getView(context.id);
      if (view && view.currentDate) {
        currentDate = (0, _moment2['default'])(view.currentDate).clone().startOf('day');
        userOptions = App.context['userOptions'];
        startTimeOption = userOptions && userOptions['Calendar:DayStartTime'];
        startTime = startTimeOption && (0, _moment2['default'])(startTimeOption, 'h:mma');
        startDate = currentDate.clone();

        if (startTime && !(0, _moment2['default'])(currentDate).isSame((0, _moment2['default'])())) {
          startDate.hours(startTime.hours());
          startDate.minutes(startTime.minutes());
        } else {
          startTime = (0, _moment2['default'])();
          startDate.hours(startTime.hours());
          startDate.add({
            'minutes': Math.floor(startTime.minutes() / 15) * 15 + 15
          });
        }

        endDate = startDate.clone().add({
          minutes: 15
        });

        this.fields['StartDate'].setValue(startDate.toDate());
        this.fields['EndDate'].setValue(endDate.toDate());
      }
    },
    applyContext: function applyContext() {
      this.inherited(arguments);

      var found, context, lookup;

      found = App.queryNavigationContext(function (o) {
        var context = o.options && o.options.source || o;

        return /^(useractivities||activities||events)$/.test(context.resourceKind);
      });

      context = found && found.options && found.options.source || found;
      lookup = {
        'useractivities': this.applyUserActivityContext,
        'activities': this.applyUserActivityContext
      };

      if (context && lookup[context.resourceKind]) {
        lookup[context.resourceKind].call(this, context);
      }
    },
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        label: this.typeText,
        name: 'Type',
        property: 'Type',
        type: 'select',
        view: 'select_list',
        requireSelection: false,
        maxTextLength: 64,
        validator: [_validator['default'].exceedsMaxTextLength, _validator['default'].notEmpty],
        textRenderer: this.formatTypeText.bindDelegate(this),
        data: this.createTypeData(),
        autoFocus: true
      }, {
        label: this.descriptionText,
        name: 'Description',
        property: 'Description',
        type: 'text',
        maxTextLength: 64,
        validator: [_validator['default'].exceedsMaxTextLength, _validator['default'].notEmpty]
      }, {
        label: this.startDateText,
        name: 'StartDate',
        property: 'StartDate',
        renderer: _format['default'].date,
        type: 'date',
        showTimePicker: true,
        formatString: this.startingFormatText,
        minValue: new Date(1900, 0, 1),
        validator: [_validator['default'].exists, _validator['default'].isDateInRange]
      }, {
        label: this.endDateText,
        name: 'EndDate',
        property: 'EndDate',
        renderer: _format['default'].date,
        type: 'date',
        showTimePicker: true,
        formatString: this.startingFormatText,
        minValue: new Date(1900, 0, 1),
        validator: [_validator['default'].exists, _validator['default'].isDateInRange]
      }]);
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.Event.Edit', __class);
  module.exports = __class;
});
