define("crm/Views/Event/Edit", ["exports", "dojo/_base/declare", "../../Format", "../../Validator", "argos/Edit", "argos/I18n"], function (_exports, _declare, _Format, _Validator, _Edit, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _Format = _interopRequireDefault(_Format);
  _Validator = _interopRequireDefault(_Validator);
  _Edit = _interopRequireDefault(_Edit);
  _I18n = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  /* Copyright 2017 Infor
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
  var resource = (0, _I18n["default"])('eventEdit');
  var dtFormatResource = (0, _I18n["default"])('eventEditDateTimeFormat');

  var __class = (0, _declare["default"])('crm.Views.Event.Edit', [_Edit["default"]], {
    // Localization
    titleText: resource.titleText,
    typeText: resource.typeText,
    descriptionText: resource.descriptionText,
    startDateText: resource.startDateText,
    endDateText: resource.endDateText,
    startingFormatText: dtFormatResource.startingFormatText,
    startingFormatText24: dtFormatResource.startingFormatText24,
    // View Properties
    entityName: 'Event',
    id: 'event_edit',
    insertSecurity: null,
    // 'Entities/Event/Add',
    updateSecurity: null,
    // 'Entities/Event/Edit',
    querySelect: ['Description', 'EndDate', 'StartDate', 'UserId', 'Type'],
    queryInclude: ['$permissions'],
    resourceKind: 'events',
    eventTypesText: {
      Vacation: 'Vacation',
      'Business Trip': 'Business Trip',
      Conference: 'Conference',
      Holiday: 'Holiday'
    },
    startup: function startup() {
      this.inherited(startup, arguments);
      this.connect(this.fields.StartDate, 'onChange', this.onStartDateChange);
    },
    onStartDateChange: function onStartDateChange(val) {
      var endDate = this.fields.EndDate.getValue();

      if (endDate < val) {
        this.fields.EndDate.setValue(val);
      }
    },
    formatTypeText: function formatTypeText(val, key, text) {
      return this.eventTypesText[key] || text;
    },
    createTypeData: function createTypeData() {
      var list = [];

      for (var type in this.eventTypesText) {
        if (this.eventTypesText.hasOwnProperty(type)) {
          list.push({
            $key: type,
            $descriptor: this.eventTypesText[type]
          });
        }
      }

      return {
        $resources: list
      };
    },
    applyUserActivityContext: function applyUserActivityContext(context) {
      var view = App.getView(context.id);

      if (view && view.currentDate) {
        var currentDate = moment(view.currentDate).clone().startOf('day');
        var userOptions = App.context.userOptions;
        var startTimeOption = userOptions && userOptions['Calendar:DayStartTime'];
        var startDate = currentDate.clone();
        var startTime = startTimeOption && moment(startTimeOption, 'h:mma');

        if (startTime && !moment(currentDate).isSame(moment())) {
          startDate.hours(startTime.hours());
          startDate.minutes(startTime.minutes());
        } else {
          startTime = moment();
          startDate.hours(startTime.hours());
          startDate.add({
            minutes: Math.floor(startTime.minutes() / 15) * 15 + 15
          });
        }

        var endDate = startDate.clone().add({
          minutes: 15
        });
        this.fields.StartDate.setValue(startDate.toDate());
        this.fields.EndDate.setValue(endDate.toDate());
      }
    },
    applyContext: function applyContext() {
      this.inherited(applyContext, arguments);
      var found = App.queryNavigationContext(function (o) {
        var context = o.options && o.options.source || o;
        return /^(useractivities||activities||events)$/.test(context.resourceKind);
      });
      var context = found && found.options && found.options.source || found;
      var lookup = {
        useractivities: this.applyUserActivityContext,
        activities: this.applyUserActivityContext
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
        validator: [_Validator["default"].exceedsMaxTextLength, _Validator["default"].notEmpty],
        textRenderer: this.formatTypeText.bindDelegate(this),
        data: this.createTypeData(),
        autoFocus: true
      }, {
        label: this.descriptionText,
        name: 'Description',
        property: 'Description',
        type: 'text',
        maxTextLength: 64,
        validator: [_Validator["default"].exceedsMaxTextLength, _Validator["default"].notEmpty]
      }, {
        label: this.startDateText,
        name: 'StartDate',
        property: 'StartDate',
        renderer: _Format["default"].date,
        type: 'date',
        showTimePicker: true,
        formatString: App.is24HourClock() ? this.startingFormatText24 : this.startingFormatText,
        minValue: new Date(1900, 0, 1),
        validator: [_Validator["default"].exists, _Validator["default"].isDateInRange]
      }, {
        label: this.endDateText,
        name: 'EndDate',
        property: 'EndDate',
        renderer: _Format["default"].date,
        type: 'date',
        showTimePicker: true,
        formatString: App.is24HourClock() ? this.startingFormatText24 : this.startingFormatText,
        minValue: new Date(1900, 0, 1),
        validator: [_Validator["default"].exists, _Validator["default"].isDateInRange]
      }]);
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});