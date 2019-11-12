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
      this.inherited(arguments);

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
      this.inherited(arguments);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9FdmVudC9FZGl0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiZHRGb3JtYXRSZXNvdXJjZSIsIl9fY2xhc3MiLCJ0aXRsZVRleHQiLCJ0eXBlVGV4dCIsImRlc2NyaXB0aW9uVGV4dCIsInN0YXJ0RGF0ZVRleHQiLCJlbmREYXRlVGV4dCIsInN0YXJ0aW5nRm9ybWF0VGV4dCIsInN0YXJ0aW5nRm9ybWF0VGV4dDI0IiwiZW50aXR5TmFtZSIsImlkIiwiaW5zZXJ0U2VjdXJpdHkiLCJ1cGRhdGVTZWN1cml0eSIsInF1ZXJ5U2VsZWN0IiwicXVlcnlJbmNsdWRlIiwicmVzb3VyY2VLaW5kIiwiZXZlbnRUeXBlc1RleHQiLCJWYWNhdGlvbiIsIkNvbmZlcmVuY2UiLCJIb2xpZGF5Iiwic3RhcnR1cCIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImNvbm5lY3QiLCJmaWVsZHMiLCJTdGFydERhdGUiLCJvblN0YXJ0RGF0ZUNoYW5nZSIsInZhbCIsImVuZERhdGUiLCJFbmREYXRlIiwiZ2V0VmFsdWUiLCJzZXRWYWx1ZSIsImZvcm1hdFR5cGVUZXh0Iiwia2V5IiwidGV4dCIsImNyZWF0ZVR5cGVEYXRhIiwibGlzdCIsInR5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInB1c2giLCIka2V5IiwiJGRlc2NyaXB0b3IiLCIkcmVzb3VyY2VzIiwiYXBwbHlVc2VyQWN0aXZpdHlDb250ZXh0IiwiY29udGV4dCIsInZpZXciLCJBcHAiLCJnZXRWaWV3IiwiY3VycmVudERhdGUiLCJtb21lbnQiLCJjbG9uZSIsInN0YXJ0T2YiLCJ1c2VyT3B0aW9ucyIsInN0YXJ0VGltZU9wdGlvbiIsInN0YXJ0RGF0ZSIsInN0YXJ0VGltZSIsImlzU2FtZSIsImhvdXJzIiwibWludXRlcyIsImFkZCIsIk1hdGgiLCJmbG9vciIsInRvRGF0ZSIsImFwcGx5Q29udGV4dCIsImZvdW5kIiwicXVlcnlOYXZpZ2F0aW9uQ29udGV4dCIsIm8iLCJvcHRpb25zIiwic291cmNlIiwidGVzdCIsImxvb2t1cCIsInVzZXJhY3Rpdml0aWVzIiwiYWN0aXZpdGllcyIsImNhbGwiLCJjcmVhdGVMYXlvdXQiLCJsYXlvdXQiLCJsYWJlbCIsIm5hbWUiLCJwcm9wZXJ0eSIsInJlcXVpcmVTZWxlY3Rpb24iLCJtYXhUZXh0TGVuZ3RoIiwidmFsaWRhdG9yIiwiZXhjZWVkc01heFRleHRMZW5ndGgiLCJub3RFbXB0eSIsInRleHRSZW5kZXJlciIsImJpbmREZWxlZ2F0ZSIsImRhdGEiLCJhdXRvRm9jdXMiLCJyZW5kZXJlciIsImRhdGUiLCJzaG93VGltZVBpY2tlciIsImZvcm1hdFN0cmluZyIsImlzMjRIb3VyQ2xvY2siLCJtaW5WYWx1ZSIsIkRhdGUiLCJleGlzdHMiLCJpc0RhdGVJblJhbmdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsTUFBTUEsV0FBVyxvQkFBWSxXQUFaLENBQWpCLEMsQ0F0QkE7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxNQUFNQyxtQkFBbUIsb0JBQVkseUJBQVosQ0FBekI7O0FBRUE7Ozs7Ozs7O0FBUUEsTUFBTUMsVUFBVSx1QkFBUSxzQkFBUixFQUFnQyxnQkFBaEMsRUFBd0M7QUFDdEQ7QUFDQUMsZUFBV0gsU0FBU0csU0FGa0M7QUFHdERDLGNBQVVKLFNBQVNJLFFBSG1DO0FBSXREQyxxQkFBaUJMLFNBQVNLLGVBSjRCO0FBS3REQyxtQkFBZU4sU0FBU00sYUFMOEI7QUFNdERDLGlCQUFhUCxTQUFTTyxXQU5nQztBQU90REMsd0JBQW9CUCxpQkFBaUJPLGtCQVBpQjtBQVF0REMsMEJBQXNCUixpQkFBaUJRLG9CQVJlOztBQVV0RDtBQUNBQyxnQkFBWSxPQVgwQztBQVl0REMsUUFBSSxZQVprRDtBQWF0REMsb0JBQWdCLElBYnNDLEVBYWhDO0FBQ3RCQyxvQkFBZ0IsSUFkc0MsRUFjaEM7QUFDdEJDLGlCQUFhLENBQ1gsYUFEVyxFQUVYLFNBRlcsRUFHWCxXQUhXLEVBSVgsUUFKVyxFQUtYLE1BTFcsQ0FmeUM7QUFzQnRE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QUFQO0FBb0REO0FBcEtxRCxHQUF4QyxDQUFoQjs7b0JBdUtlL0YsTyIsImZpbGUiOiJFZGl0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICcuLi8uLi9Gb3JtYXQnO1xyXG5pbXBvcnQgdmFsaWRhdG9yIGZyb20gJy4uLy4uL1ZhbGlkYXRvcic7XHJcbmltcG9ydCBFZGl0IGZyb20gJ2FyZ29zL0VkaXQnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXZlbnRFZGl0Jyk7XHJcbmNvbnN0IGR0Rm9ybWF0UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXZlbnRFZGl0RGF0ZVRpbWVGb3JtYXQnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLkV2ZW50LkVkaXRcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuRWRpdFxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgY3JtLkZvcm1hdFxyXG4gKiBAcmVxdWlyZXMgY3JtLlZhbGlkYXRvclxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5FdmVudC5FZGl0JywgW0VkaXRdLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgdHlwZVRleHQ6IHJlc291cmNlLnR5cGVUZXh0LFxyXG4gIGRlc2NyaXB0aW9uVGV4dDogcmVzb3VyY2UuZGVzY3JpcHRpb25UZXh0LFxyXG4gIHN0YXJ0RGF0ZVRleHQ6IHJlc291cmNlLnN0YXJ0RGF0ZVRleHQsXHJcbiAgZW5kRGF0ZVRleHQ6IHJlc291cmNlLmVuZERhdGVUZXh0LFxyXG4gIHN0YXJ0aW5nRm9ybWF0VGV4dDogZHRGb3JtYXRSZXNvdXJjZS5zdGFydGluZ0Zvcm1hdFRleHQsXHJcbiAgc3RhcnRpbmdGb3JtYXRUZXh0MjQ6IGR0Rm9ybWF0UmVzb3VyY2Uuc3RhcnRpbmdGb3JtYXRUZXh0MjQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGVudGl0eU5hbWU6ICdFdmVudCcsXHJcbiAgaWQ6ICdldmVudF9lZGl0JyxcclxuICBpbnNlcnRTZWN1cml0eTogbnVsbCwgLy8gJ0VudGl0aWVzL0V2ZW50L0FkZCcsXHJcbiAgdXBkYXRlU2VjdXJpdHk6IG51bGwsIC8vICdFbnRpdGllcy9FdmVudC9FZGl0JyxcclxuICBxdWVyeVNlbGVjdDogW1xyXG4gICAgJ0Rlc2NyaXB0aW9uJyxcclxuICAgICdFbmREYXRlJyxcclxuICAgICdTdGFydERhdGUnLFxyXG4gICAgJ1VzZXJJZCcsXHJcbiAgICAnVHlwZScsXHJcbiAgXSxcclxuICBxdWVyeUluY2x1ZGU6IFtcclxuICAgICckcGVybWlzc2lvbnMnLFxyXG4gIF0sXHJcbiAgcmVzb3VyY2VLaW5kOiAnZXZlbnRzJyxcclxuXHJcbiAgZXZlbnRUeXBlc1RleHQ6IHtcclxuICAgIFZhY2F0aW9uOiAnVmFjYXRpb24nLFxyXG4gICAgJ0J1c2luZXNzIFRyaXAnOiAnQnVzaW5lc3MgVHJpcCcsXHJcbiAgICBDb25mZXJlbmNlOiAnQ29uZmVyZW5jZScsXHJcbiAgICBIb2xpZGF5OiAnSG9saWRheScsXHJcbiAgfSxcclxuICBzdGFydHVwOiBmdW5jdGlvbiBzdGFydHVwKCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuXHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuU3RhcnREYXRlLCAnb25DaGFuZ2UnLCB0aGlzLm9uU3RhcnREYXRlQ2hhbmdlKTtcclxuICB9LFxyXG4gIG9uU3RhcnREYXRlQ2hhbmdlOiBmdW5jdGlvbiBvblN0YXJ0RGF0ZUNoYW5nZSh2YWwpIHtcclxuICAgIGNvbnN0IGVuZERhdGUgPSB0aGlzLmZpZWxkcy5FbmREYXRlLmdldFZhbHVlKCk7XHJcblxyXG4gICAgaWYgKGVuZERhdGUgPCB2YWwpIHtcclxuICAgICAgdGhpcy5maWVsZHMuRW5kRGF0ZS5zZXRWYWx1ZSh2YWwpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZm9ybWF0VHlwZVRleHQ6IGZ1bmN0aW9uIGZvcm1hdFR5cGVUZXh0KHZhbCwga2V5LCB0ZXh0KSB7XHJcbiAgICByZXR1cm4gdGhpcy5ldmVudFR5cGVzVGV4dFtrZXldIHx8IHRleHQ7XHJcbiAgfSxcclxuICBjcmVhdGVUeXBlRGF0YTogZnVuY3Rpb24gY3JlYXRlVHlwZURhdGEoKSB7XHJcbiAgICBjb25zdCBsaXN0ID0gW107XHJcblxyXG4gICAgZm9yIChjb25zdCB0eXBlIGluIHRoaXMuZXZlbnRUeXBlc1RleHQpIHtcclxuICAgICAgaWYgKHRoaXMuZXZlbnRUeXBlc1RleHQuaGFzT3duUHJvcGVydHkodHlwZSkpIHtcclxuICAgICAgICBsaXN0LnB1c2goe1xyXG4gICAgICAgICAgJGtleTogdHlwZSxcclxuICAgICAgICAgICRkZXNjcmlwdG9yOiB0aGlzLmV2ZW50VHlwZXNUZXh0W3R5cGVdLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgJHJlc291cmNlczogbGlzdCxcclxuICAgIH07XHJcbiAgfSxcclxuICBhcHBseVVzZXJBY3Rpdml0eUNvbnRleHQ6IGZ1bmN0aW9uIGFwcGx5VXNlckFjdGl2aXR5Q29udGV4dChjb250ZXh0KSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoY29udGV4dC5pZCk7XHJcbiAgICBpZiAodmlldyAmJiB2aWV3LmN1cnJlbnREYXRlKSB7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbW9tZW50KHZpZXcuY3VycmVudERhdGUpLmNsb25lKCkuc3RhcnRPZignZGF5Jyk7XHJcbiAgICAgIGNvbnN0IHVzZXJPcHRpb25zID0gQXBwLmNvbnRleHQudXNlck9wdGlvbnM7XHJcbiAgICAgIGNvbnN0IHN0YXJ0VGltZU9wdGlvbiA9IHVzZXJPcHRpb25zICYmIHVzZXJPcHRpb25zWydDYWxlbmRhcjpEYXlTdGFydFRpbWUnXTtcclxuICAgICAgY29uc3Qgc3RhcnREYXRlID0gY3VycmVudERhdGUuY2xvbmUoKTtcclxuICAgICAgbGV0IHN0YXJ0VGltZSA9IHN0YXJ0VGltZU9wdGlvbiAmJiBtb21lbnQoc3RhcnRUaW1lT3B0aW9uLCAnaDptbWEnKTtcclxuXHJcbiAgICAgIGlmIChzdGFydFRpbWUgJiYgKCFtb21lbnQoY3VycmVudERhdGUpLmlzU2FtZShtb21lbnQoKSkpKSB7XHJcbiAgICAgICAgc3RhcnREYXRlLmhvdXJzKHN0YXJ0VGltZS5ob3VycygpKTtcclxuICAgICAgICBzdGFydERhdGUubWludXRlcyhzdGFydFRpbWUubWludXRlcygpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzdGFydFRpbWUgPSBtb21lbnQoKTtcclxuICAgICAgICBzdGFydERhdGUuaG91cnMoc3RhcnRUaW1lLmhvdXJzKCkpO1xyXG4gICAgICAgIHN0YXJ0RGF0ZS5hZGQoe1xyXG4gICAgICAgICAgbWludXRlczogKE1hdGguZmxvb3Ioc3RhcnRUaW1lLm1pbnV0ZXMoKSAvIDE1KSAqIDE1KSArIDE1LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBlbmREYXRlID0gc3RhcnREYXRlLmNsb25lKCkuYWRkKHtcclxuICAgICAgICBtaW51dGVzOiAxNSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLmZpZWxkcy5TdGFydERhdGUuc2V0VmFsdWUoc3RhcnREYXRlLnRvRGF0ZSgpKTtcclxuICAgICAgdGhpcy5maWVsZHMuRW5kRGF0ZS5zZXRWYWx1ZShlbmREYXRlLnRvRGF0ZSgpKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFwcGx5Q29udGV4dDogZnVuY3Rpb24gYXBwbHlDb250ZXh0KCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuXHJcbiAgICBjb25zdCBmb3VuZCA9IEFwcC5xdWVyeU5hdmlnYXRpb25Db250ZXh0KChvKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvbnRleHQgPSAoby5vcHRpb25zICYmIG8ub3B0aW9ucy5zb3VyY2UpIHx8IG87XHJcblxyXG4gICAgICByZXR1cm4gKC9eKHVzZXJhY3Rpdml0aWVzfHxhY3Rpdml0aWVzfHxldmVudHMpJC8udGVzdChjb250ZXh0LnJlc291cmNlS2luZCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgY29udGV4dCA9IChmb3VuZCAmJiBmb3VuZC5vcHRpb25zICYmIGZvdW5kLm9wdGlvbnMuc291cmNlKSB8fCBmb3VuZDtcclxuICAgIGNvbnN0IGxvb2t1cCA9IHtcclxuICAgICAgdXNlcmFjdGl2aXRpZXM6IHRoaXMuYXBwbHlVc2VyQWN0aXZpdHlDb250ZXh0LFxyXG4gICAgICBhY3Rpdml0aWVzOiB0aGlzLmFwcGx5VXNlckFjdGl2aXR5Q29udGV4dCxcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGNvbnRleHQgJiYgbG9va3VwW2NvbnRleHQucmVzb3VyY2VLaW5kXSkge1xyXG4gICAgICBsb29rdXBbY29udGV4dC5yZXNvdXJjZUtpbmRdLmNhbGwodGhpcywgY29udGV4dCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICBsYWJlbDogdGhpcy50eXBlVGV4dCxcclxuICAgICAgbmFtZTogJ1R5cGUnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1R5cGUnLFxyXG4gICAgICB0eXBlOiAnc2VsZWN0JyxcclxuICAgICAgdmlldzogJ3NlbGVjdF9saXN0JyxcclxuICAgICAgcmVxdWlyZVNlbGVjdGlvbjogZmFsc2UsXHJcbiAgICAgIG1heFRleHRMZW5ndGg6IDY0LFxyXG4gICAgICB2YWxpZGF0b3I6IFtcclxuICAgICAgICB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICAgICAgdmFsaWRhdG9yLm5vdEVtcHR5LFxyXG4gICAgICBdLFxyXG4gICAgICB0ZXh0UmVuZGVyZXI6IHRoaXMuZm9ybWF0VHlwZVRleHQuYmluZERlbGVnYXRlKHRoaXMpLFxyXG4gICAgICBkYXRhOiB0aGlzLmNyZWF0ZVR5cGVEYXRhKCksXHJcbiAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMuZGVzY3JpcHRpb25UZXh0LFxyXG4gICAgICBuYW1lOiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICBwcm9wZXJ0eTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICBtYXhUZXh0TGVuZ3RoOiA2NCxcclxuICAgICAgdmFsaWRhdG9yOiBbXHJcbiAgICAgICAgdmFsaWRhdG9yLmV4Y2VlZHNNYXhUZXh0TGVuZ3RoLFxyXG4gICAgICAgIHZhbGlkYXRvci5ub3RFbXB0eSxcclxuICAgICAgXSxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMuc3RhcnREYXRlVGV4dCxcclxuICAgICAgbmFtZTogJ1N0YXJ0RGF0ZScsXHJcbiAgICAgIHByb3BlcnR5OiAnU3RhcnREYXRlJyxcclxuICAgICAgcmVuZGVyZXI6IGZvcm1hdC5kYXRlLFxyXG4gICAgICB0eXBlOiAnZGF0ZScsXHJcbiAgICAgIHNob3dUaW1lUGlja2VyOiB0cnVlLFxyXG4gICAgICBmb3JtYXRTdHJpbmc6IChBcHAuaXMyNEhvdXJDbG9jaygpKSA/IHRoaXMuc3RhcnRpbmdGb3JtYXRUZXh0MjQgOiB0aGlzLnN0YXJ0aW5nRm9ybWF0VGV4dCxcclxuICAgICAgbWluVmFsdWU6IChuZXcgRGF0ZSgxOTAwLCAwLCAxKSksXHJcbiAgICAgIHZhbGlkYXRvcjogW1xyXG4gICAgICAgIHZhbGlkYXRvci5leGlzdHMsXHJcbiAgICAgICAgdmFsaWRhdG9yLmlzRGF0ZUluUmFuZ2UsXHJcbiAgICAgIF0sXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLmVuZERhdGVUZXh0LFxyXG4gICAgICBuYW1lOiAnRW5kRGF0ZScsXHJcbiAgICAgIHByb3BlcnR5OiAnRW5kRGF0ZScsXHJcbiAgICAgIHJlbmRlcmVyOiBmb3JtYXQuZGF0ZSxcclxuICAgICAgdHlwZTogJ2RhdGUnLFxyXG4gICAgICBzaG93VGltZVBpY2tlcjogdHJ1ZSxcclxuICAgICAgZm9ybWF0U3RyaW5nOiAoQXBwLmlzMjRIb3VyQ2xvY2soKSkgPyB0aGlzLnN0YXJ0aW5nRm9ybWF0VGV4dDI0IDogdGhpcy5zdGFydGluZ0Zvcm1hdFRleHQsXHJcbiAgICAgIG1pblZhbHVlOiAobmV3IERhdGUoMTkwMCwgMCwgMSkpLFxyXG4gICAgICB2YWxpZGF0b3I6IFtcclxuICAgICAgICB2YWxpZGF0b3IuZXhpc3RzLFxyXG4gICAgICAgIHZhbGlkYXRvci5pc0RhdGVJblJhbmdlLFxyXG4gICAgICBdLFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19