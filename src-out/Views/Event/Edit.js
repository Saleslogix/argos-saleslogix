define('crm/Views/Event/Edit', ['module', 'exports', 'dojo/_base/declare', '../../Format', '../../Validator', 'argos/Edit', 'argos/I18n'], function (module, exports, _declare, _Format, _Validator, _Edit, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Format2 = _interopRequireDefault(_Format);

  var _Validator2 = _interopRequireDefault(_Validator);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('eventEdit'); /* Copyright 2017 Infor
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

  var dtFormatResource = (0, _I18n2.default)('eventEditDateTimeFormat');

  /**
   * @class crm.Views.Event.Edit
   *
   * @extends argos.Edit
   *
   * @requires crm.Format
   * @requires crm.Validator
   */
  var __class = (0, _declare2.default)('crm.Views.Event.Edit', [_Edit2.default], {
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
    insertSecurity: null, // 'Entities/Event/Add',
    updateSecurity: null, // 'Entities/Event/Edit',
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

        return (/^(useractivities||activities||events)$/.test(context.resourceKind)
        );
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
        validator: [_Validator2.default.exceedsMaxTextLength, _Validator2.default.notEmpty],
        textRenderer: this.formatTypeText.bindDelegate(this),
        data: this.createTypeData(),
        autoFocus: true
      }, {
        label: this.descriptionText,
        name: 'Description',
        property: 'Description',
        type: 'text',
        maxTextLength: 64,
        validator: [_Validator2.default.exceedsMaxTextLength, _Validator2.default.notEmpty]
      }, {
        label: this.startDateText,
        name: 'StartDate',
        property: 'StartDate',
        renderer: _Format2.default.date,
        type: 'date',
        showTimePicker: true,
        formatString: App.is24HourClock() ? this.startingFormatText24 : this.startingFormatText,
        minValue: new Date(1900, 0, 1),
        validator: [_Validator2.default.exists, _Validator2.default.isDateInRange]
      }, {
        label: this.endDateText,
        name: 'EndDate',
        property: 'EndDate',
        renderer: _Format2.default.date,
        type: 'date',
        showTimePicker: true,
        formatString: App.is24HourClock() ? this.startingFormatText24 : this.startingFormatText,
        minValue: new Date(1900, 0, 1),
        validator: [_Validator2.default.exists, _Validator2.default.isDateInRange]
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9FdmVudC9FZGl0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiZHRGb3JtYXRSZXNvdXJjZSIsIl9fY2xhc3MiLCJ0aXRsZVRleHQiLCJ0eXBlVGV4dCIsImRlc2NyaXB0aW9uVGV4dCIsInN0YXJ0RGF0ZVRleHQiLCJlbmREYXRlVGV4dCIsInN0YXJ0aW5nRm9ybWF0VGV4dCIsInN0YXJ0aW5nRm9ybWF0VGV4dDI0IiwiZW50aXR5TmFtZSIsImlkIiwiaW5zZXJ0U2VjdXJpdHkiLCJ1cGRhdGVTZWN1cml0eSIsInF1ZXJ5U2VsZWN0IiwicXVlcnlJbmNsdWRlIiwicmVzb3VyY2VLaW5kIiwiZXZlbnRUeXBlc1RleHQiLCJWYWNhdGlvbiIsIkNvbmZlcmVuY2UiLCJIb2xpZGF5Iiwic3RhcnR1cCIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImNvbm5lY3QiLCJmaWVsZHMiLCJTdGFydERhdGUiLCJvblN0YXJ0RGF0ZUNoYW5nZSIsInZhbCIsImVuZERhdGUiLCJFbmREYXRlIiwiZ2V0VmFsdWUiLCJzZXRWYWx1ZSIsImZvcm1hdFR5cGVUZXh0Iiwia2V5IiwidGV4dCIsImNyZWF0ZVR5cGVEYXRhIiwibGlzdCIsInR5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInB1c2giLCIka2V5IiwiJGRlc2NyaXB0b3IiLCIkcmVzb3VyY2VzIiwiYXBwbHlVc2VyQWN0aXZpdHlDb250ZXh0IiwiY29udGV4dCIsInZpZXciLCJBcHAiLCJnZXRWaWV3IiwiY3VycmVudERhdGUiLCJtb21lbnQiLCJjbG9uZSIsInN0YXJ0T2YiLCJ1c2VyT3B0aW9ucyIsInN0YXJ0VGltZU9wdGlvbiIsInN0YXJ0RGF0ZSIsInN0YXJ0VGltZSIsImlzU2FtZSIsImhvdXJzIiwibWludXRlcyIsImFkZCIsIk1hdGgiLCJmbG9vciIsInRvRGF0ZSIsImFwcGx5Q29udGV4dCIsImZvdW5kIiwicXVlcnlOYXZpZ2F0aW9uQ29udGV4dCIsIm8iLCJvcHRpb25zIiwic291cmNlIiwidGVzdCIsImxvb2t1cCIsInVzZXJhY3Rpdml0aWVzIiwiYWN0aXZpdGllcyIsImNhbGwiLCJjcmVhdGVMYXlvdXQiLCJsYXlvdXQiLCJsYWJlbCIsIm5hbWUiLCJwcm9wZXJ0eSIsInJlcXVpcmVTZWxlY3Rpb24iLCJtYXhUZXh0TGVuZ3RoIiwidmFsaWRhdG9yIiwiZXhjZWVkc01heFRleHRMZW5ndGgiLCJub3RFbXB0eSIsInRleHRSZW5kZXJlciIsImJpbmREZWxlZ2F0ZSIsImRhdGEiLCJhdXRvRm9jdXMiLCJyZW5kZXJlciIsImRhdGUiLCJzaG93VGltZVBpY2tlciIsImZvcm1hdFN0cmluZyIsImlzMjRIb3VyQ2xvY2siLCJtaW5WYWx1ZSIsIkRhdGUiLCJleGlzdHMiLCJpc0RhdGVJblJhbmdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsTUFBTUEsV0FBVyxvQkFBWSxXQUFaLENBQWpCLEMsQ0F0QkE7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxNQUFNQyxtQkFBbUIsb0JBQVkseUJBQVosQ0FBekI7O0FBRUE7Ozs7Ozs7O0FBUUEsTUFBTUMsVUFBVSx1QkFBUSxzQkFBUixFQUFnQyxnQkFBaEMsRUFBd0M7QUFDdEQ7QUFDQUMsZUFBV0gsU0FBU0csU0FGa0M7QUFHdERDLGNBQVVKLFNBQVNJLFFBSG1DO0FBSXREQyxxQkFBaUJMLFNBQVNLLGVBSjRCO0FBS3REQyxtQkFBZU4sU0FBU00sYUFMOEI7QUFNdERDLGlCQUFhUCxTQUFTTyxXQU5nQztBQU90REMsd0JBQW9CUCxpQkFBaUJPLGtCQVBpQjtBQVF0REMsMEJBQXNCUixpQkFBaUJRLG9CQVJlOztBQVV0RDtBQUNBQyxnQkFBWSxPQVgwQztBQVl0REMsUUFBSSxZQVprRDtBQWF0REMsb0JBQWdCLElBYnNDLEVBYWhDO0FBQ3RCQyxvQkFBZ0IsSUFkc0MsRUFjaEM7QUFDdEJDLGlCQUFhLENBQ1gsYUFEVyxFQUVYLFNBRlcsRUFHWCxXQUhXLEVBSVgsUUFKVyxFQUtYLE1BTFcsQ0FmeUM7QUFzQnRE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QVVDLGFBRkQ7QUFUVixPQXRDa0MsQ0FBOUIsQ0FBUDtBQW9ERDtBQXBLcUQsR0FBeEMsQ0FBaEI7O29CQXVLZS9GLE8iLCJmaWxlIjoiRWRpdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnLi4vLi4vRm9ybWF0JztcclxuaW1wb3J0IHZhbGlkYXRvciBmcm9tICcuLi8uLi9WYWxpZGF0b3InO1xyXG5pbXBvcnQgRWRpdCBmcm9tICdhcmdvcy9FZGl0JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2V2ZW50RWRpdCcpO1xyXG5jb25zdCBkdEZvcm1hdFJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2V2ZW50RWRpdERhdGVUaW1lRm9ybWF0Jyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5FdmVudC5FZGl0XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkVkaXRcclxuICpcclxuICogQHJlcXVpcmVzIGNybS5Gb3JtYXRcclxuICogQHJlcXVpcmVzIGNybS5WYWxpZGF0b3JcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuRXZlbnQuRWRpdCcsIFtFZGl0XSwge1xyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIHR5cGVUZXh0OiByZXNvdXJjZS50eXBlVGV4dCxcclxuICBkZXNjcmlwdGlvblRleHQ6IHJlc291cmNlLmRlc2NyaXB0aW9uVGV4dCxcclxuICBzdGFydERhdGVUZXh0OiByZXNvdXJjZS5zdGFydERhdGVUZXh0LFxyXG4gIGVuZERhdGVUZXh0OiByZXNvdXJjZS5lbmREYXRlVGV4dCxcclxuICBzdGFydGluZ0Zvcm1hdFRleHQ6IGR0Rm9ybWF0UmVzb3VyY2Uuc3RhcnRpbmdGb3JtYXRUZXh0LFxyXG4gIHN0YXJ0aW5nRm9ybWF0VGV4dDI0OiBkdEZvcm1hdFJlc291cmNlLnN0YXJ0aW5nRm9ybWF0VGV4dDI0LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBlbnRpdHlOYW1lOiAnRXZlbnQnLFxyXG4gIGlkOiAnZXZlbnRfZWRpdCcsXHJcbiAgaW5zZXJ0U2VjdXJpdHk6IG51bGwsIC8vICdFbnRpdGllcy9FdmVudC9BZGQnLFxyXG4gIHVwZGF0ZVNlY3VyaXR5OiBudWxsLCAvLyAnRW50aXRpZXMvRXZlbnQvRWRpdCcsXHJcbiAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICdEZXNjcmlwdGlvbicsXHJcbiAgICAnRW5kRGF0ZScsXHJcbiAgICAnU3RhcnREYXRlJyxcclxuICAgICdVc2VySWQnLFxyXG4gICAgJ1R5cGUnLFxyXG4gIF0sXHJcbiAgcXVlcnlJbmNsdWRlOiBbXHJcbiAgICAnJHBlcm1pc3Npb25zJyxcclxuICBdLFxyXG4gIHJlc291cmNlS2luZDogJ2V2ZW50cycsXHJcblxyXG4gIGV2ZW50VHlwZXNUZXh0OiB7XHJcbiAgICBWYWNhdGlvbjogJ1ZhY2F0aW9uJyxcclxuICAgICdCdXNpbmVzcyBUcmlwJzogJ0J1c2luZXNzIFRyaXAnLFxyXG4gICAgQ29uZmVyZW5jZTogJ0NvbmZlcmVuY2UnLFxyXG4gICAgSG9saWRheTogJ0hvbGlkYXknLFxyXG4gIH0sXHJcbiAgc3RhcnR1cDogZnVuY3Rpb24gc3RhcnR1cCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKHN0YXJ0dXAsIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLlN0YXJ0RGF0ZSwgJ29uQ2hhbmdlJywgdGhpcy5vblN0YXJ0RGF0ZUNoYW5nZSk7XHJcbiAgfSxcclxuICBvblN0YXJ0RGF0ZUNoYW5nZTogZnVuY3Rpb24gb25TdGFydERhdGVDaGFuZ2UodmFsKSB7XHJcbiAgICBjb25zdCBlbmREYXRlID0gdGhpcy5maWVsZHMuRW5kRGF0ZS5nZXRWYWx1ZSgpO1xyXG5cclxuICAgIGlmIChlbmREYXRlIDwgdmFsKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLkVuZERhdGUuc2V0VmFsdWUodmFsKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGZvcm1hdFR5cGVUZXh0OiBmdW5jdGlvbiBmb3JtYXRUeXBlVGV4dCh2YWwsIGtleSwgdGV4dCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZXZlbnRUeXBlc1RleHRba2V5XSB8fCB0ZXh0O1xyXG4gIH0sXHJcbiAgY3JlYXRlVHlwZURhdGE6IGZ1bmN0aW9uIGNyZWF0ZVR5cGVEYXRhKCkge1xyXG4gICAgY29uc3QgbGlzdCA9IFtdO1xyXG5cclxuICAgIGZvciAoY29uc3QgdHlwZSBpbiB0aGlzLmV2ZW50VHlwZXNUZXh0KSB7XHJcbiAgICAgIGlmICh0aGlzLmV2ZW50VHlwZXNUZXh0Lmhhc093blByb3BlcnR5KHR5cGUpKSB7XHJcbiAgICAgICAgbGlzdC5wdXNoKHtcclxuICAgICAgICAgICRrZXk6IHR5cGUsXHJcbiAgICAgICAgICAkZGVzY3JpcHRvcjogdGhpcy5ldmVudFR5cGVzVGV4dFt0eXBlXSxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICRyZXNvdXJjZXM6IGxpc3QsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgYXBwbHlVc2VyQWN0aXZpdHlDb250ZXh0OiBmdW5jdGlvbiBhcHBseVVzZXJBY3Rpdml0eUNvbnRleHQoY29udGV4dCkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KGNvbnRleHQuaWQpO1xyXG4gICAgaWYgKHZpZXcgJiYgdmlldy5jdXJyZW50RGF0ZSkge1xyXG4gICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG1vbWVudCh2aWV3LmN1cnJlbnREYXRlKS5jbG9uZSgpLnN0YXJ0T2YoJ2RheScpO1xyXG4gICAgICBjb25zdCB1c2VyT3B0aW9ucyA9IEFwcC5jb250ZXh0LnVzZXJPcHRpb25zO1xyXG4gICAgICBjb25zdCBzdGFydFRpbWVPcHRpb24gPSB1c2VyT3B0aW9ucyAmJiB1c2VyT3B0aW9uc1snQ2FsZW5kYXI6RGF5U3RhcnRUaW1lJ107XHJcbiAgICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IGN1cnJlbnREYXRlLmNsb25lKCk7XHJcbiAgICAgIGxldCBzdGFydFRpbWUgPSBzdGFydFRpbWVPcHRpb24gJiYgbW9tZW50KHN0YXJ0VGltZU9wdGlvbiwgJ2g6bW1hJyk7XHJcblxyXG4gICAgICBpZiAoc3RhcnRUaW1lICYmICghbW9tZW50KGN1cnJlbnREYXRlKS5pc1NhbWUobW9tZW50KCkpKSkge1xyXG4gICAgICAgIHN0YXJ0RGF0ZS5ob3VycyhzdGFydFRpbWUuaG91cnMoKSk7XHJcbiAgICAgICAgc3RhcnREYXRlLm1pbnV0ZXMoc3RhcnRUaW1lLm1pbnV0ZXMoKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3RhcnRUaW1lID0gbW9tZW50KCk7XHJcbiAgICAgICAgc3RhcnREYXRlLmhvdXJzKHN0YXJ0VGltZS5ob3VycygpKTtcclxuICAgICAgICBzdGFydERhdGUuYWRkKHtcclxuICAgICAgICAgIG1pbnV0ZXM6IChNYXRoLmZsb29yKHN0YXJ0VGltZS5taW51dGVzKCkgLyAxNSkgKiAxNSkgKyAxNSxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgZW5kRGF0ZSA9IHN0YXJ0RGF0ZS5jbG9uZSgpLmFkZCh7XHJcbiAgICAgICAgbWludXRlczogMTUsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5maWVsZHMuU3RhcnREYXRlLnNldFZhbHVlKHN0YXJ0RGF0ZS50b0RhdGUoKSk7XHJcbiAgICAgIHRoaXMuZmllbGRzLkVuZERhdGUuc2V0VmFsdWUoZW5kRGF0ZS50b0RhdGUoKSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhcHBseUNvbnRleHQ6IGZ1bmN0aW9uIGFwcGx5Q29udGV4dCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFwcGx5Q29udGV4dCwgYXJndW1lbnRzKTtcclxuXHJcbiAgICBjb25zdCBmb3VuZCA9IEFwcC5xdWVyeU5hdmlnYXRpb25Db250ZXh0KChvKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvbnRleHQgPSAoby5vcHRpb25zICYmIG8ub3B0aW9ucy5zb3VyY2UpIHx8IG87XHJcblxyXG4gICAgICByZXR1cm4gKC9eKHVzZXJhY3Rpdml0aWVzfHxhY3Rpdml0aWVzfHxldmVudHMpJC8udGVzdChjb250ZXh0LnJlc291cmNlS2luZCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgY29udGV4dCA9IChmb3VuZCAmJiBmb3VuZC5vcHRpb25zICYmIGZvdW5kLm9wdGlvbnMuc291cmNlKSB8fCBmb3VuZDtcclxuICAgIGNvbnN0IGxvb2t1cCA9IHtcclxuICAgICAgdXNlcmFjdGl2aXRpZXM6IHRoaXMuYXBwbHlVc2VyQWN0aXZpdHlDb250ZXh0LFxyXG4gICAgICBhY3Rpdml0aWVzOiB0aGlzLmFwcGx5VXNlckFjdGl2aXR5Q29udGV4dCxcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGNvbnRleHQgJiYgbG9va3VwW2NvbnRleHQucmVzb3VyY2VLaW5kXSkge1xyXG4gICAgICBsb29rdXBbY29udGV4dC5yZXNvdXJjZUtpbmRdLmNhbGwodGhpcywgY29udGV4dCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICBsYWJlbDogdGhpcy50eXBlVGV4dCxcclxuICAgICAgbmFtZTogJ1R5cGUnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1R5cGUnLFxyXG4gICAgICB0eXBlOiAnc2VsZWN0JyxcclxuICAgICAgdmlldzogJ3NlbGVjdF9saXN0JyxcclxuICAgICAgcmVxdWlyZVNlbGVjdGlvbjogZmFsc2UsXHJcbiAgICAgIG1heFRleHRMZW5ndGg6IDY0LFxyXG4gICAgICB2YWxpZGF0b3I6IFtcclxuICAgICAgICB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICAgICAgdmFsaWRhdG9yLm5vdEVtcHR5LFxyXG4gICAgICBdLFxyXG4gICAgICB0ZXh0UmVuZGVyZXI6IHRoaXMuZm9ybWF0VHlwZVRleHQuYmluZERlbGVnYXRlKHRoaXMpLFxyXG4gICAgICBkYXRhOiB0aGlzLmNyZWF0ZVR5cGVEYXRhKCksXHJcbiAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMuZGVzY3JpcHRpb25UZXh0LFxyXG4gICAgICBuYW1lOiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICBwcm9wZXJ0eTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICBtYXhUZXh0TGVuZ3RoOiA2NCxcclxuICAgICAgdmFsaWRhdG9yOiBbXHJcbiAgICAgICAgdmFsaWRhdG9yLmV4Y2VlZHNNYXhUZXh0TGVuZ3RoLFxyXG4gICAgICAgIHZhbGlkYXRvci5ub3RFbXB0eSxcclxuICAgICAgXSxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMuc3RhcnREYXRlVGV4dCxcclxuICAgICAgbmFtZTogJ1N0YXJ0RGF0ZScsXHJcbiAgICAgIHByb3BlcnR5OiAnU3RhcnREYXRlJyxcclxuICAgICAgcmVuZGVyZXI6IGZvcm1hdC5kYXRlLFxyXG4gICAgICB0eXBlOiAnZGF0ZScsXHJcbiAgICAgIHNob3dUaW1lUGlja2VyOiB0cnVlLFxyXG4gICAgICBmb3JtYXRTdHJpbmc6IChBcHAuaXMyNEhvdXJDbG9jaygpKSA/IHRoaXMuc3RhcnRpbmdGb3JtYXRUZXh0MjQgOiB0aGlzLnN0YXJ0aW5nRm9ybWF0VGV4dCxcclxuICAgICAgbWluVmFsdWU6IChuZXcgRGF0ZSgxOTAwLCAwLCAxKSksXHJcbiAgICAgIHZhbGlkYXRvcjogW1xyXG4gICAgICAgIHZhbGlkYXRvci5leGlzdHMsXHJcbiAgICAgICAgdmFsaWRhdG9yLmlzRGF0ZUluUmFuZ2UsXHJcbiAgICAgIF0sXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLmVuZERhdGVUZXh0LFxyXG4gICAgICBuYW1lOiAnRW5kRGF0ZScsXHJcbiAgICAgIHByb3BlcnR5OiAnRW5kRGF0ZScsXHJcbiAgICAgIHJlbmRlcmVyOiBmb3JtYXQuZGF0ZSxcclxuICAgICAgdHlwZTogJ2RhdGUnLFxyXG4gICAgICBzaG93VGltZVBpY2tlcjogdHJ1ZSxcclxuICAgICAgZm9ybWF0U3RyaW5nOiAoQXBwLmlzMjRIb3VyQ2xvY2soKSkgPyB0aGlzLnN0YXJ0aW5nRm9ybWF0VGV4dDI0IDogdGhpcy5zdGFydGluZ0Zvcm1hdFRleHQsXHJcbiAgICAgIG1pblZhbHVlOiAobmV3IERhdGUoMTkwMCwgMCwgMSkpLFxyXG4gICAgICB2YWxpZGF0b3I6IFtcclxuICAgICAgICB2YWxpZGF0b3IuZXhpc3RzLFxyXG4gICAgICAgIHZhbGlkYXRvci5pc0RhdGVJblJhbmdlLFxyXG4gICAgICBdLFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19