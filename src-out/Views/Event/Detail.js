define('crm/Views/Event/Detail', ['module', 'exports', 'dojo/_base/declare', '../../Format', 'argos/Detail', 'argos/I18n'], function (module, exports, _declare, _Format, _Detail, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Format2 = _interopRequireDefault(_Format);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  var resource = (0, _I18n2.default)('eventDetail');
  var dtFormatResource = (0, _I18n2.default)('eventDetailDateTimeFormat');

  /**
   * @class crm.Views.Event.Detail
   *
   * @extends argos.Detail
   *
   * @requires crm.Format
   */
  var __class = (0, _declare2.default)('crm.Views.Event.Detail', [_Detail2.default], {
    // Localization
    actionsText: resource.actionsText,
    startTimeText: resource.startTimeText,
    endTimeText: resource.endTimeText,
    titleText: resource.titleText,
    descriptionText: resource.descriptionText,
    typeText: resource.typeText,
    whenText: resource.whenText,
    startDateFormatText: dtFormatResource.startDateFormatText,
    startDateFormatText24: dtFormatResource.startDateFormatText24,
    endDateFormatText: dtFormatResource.endDateFormatText,
    endDateFormatText24: dtFormatResource.endDateFormatText24,
    entityText: resource.entityText,
    eventTypeText: {
      atToDo: resource.toDo,
      atPhoneCall: resource.phoneCall,
      atAppointment: resource.meeting,
      atLiterature: resource.literature,
      atPersonal: resource.personal
    },

    // View Properties
    id: 'event_detail',
    editView: 'event_edit',
    security: null, // 'Entities/Event/View',
    querySelect: ['Description', 'EndDate', 'StartDate', 'UserId', 'Type'],
    resourceKind: 'events',

    formatEventType: function formatEventType(val) {
      return this.eventTypeText[val] || val;
    },
    init: function init() {
      this.inherited(init, arguments);
    },
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          name: 'Type',
          property: 'Type',
          label: this.typeText,
          renderer: this.formatEventType.bindDelegate(this)
        }, {
          name: 'Description',
          property: 'Description',
          label: this.descriptionText
        }]
      }, {
        title: this.whenText,
        name: 'WhenSection',
        children: [{
          name: 'StartDate',
          property: 'StartDate',
          label: this.startTimeText,
          renderer: _Format2.default.date.bindDelegate(this, App.is24HourClock() ? this.startDateFormatText24 : this.startDateFormatText)
        }, {
          name: 'EndDate',
          property: 'EndDate',
          label: this.endTimeText,
          renderer: _Format2.default.date.bindDelegate(this, App.is24HourClock() ? this.endDateFormatText24 : this.endDateFormatText)
        }]
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9FdmVudC9EZXRhaWwuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJkdEZvcm1hdFJlc291cmNlIiwiX19jbGFzcyIsImFjdGlvbnNUZXh0Iiwic3RhcnRUaW1lVGV4dCIsImVuZFRpbWVUZXh0IiwidGl0bGVUZXh0IiwiZGVzY3JpcHRpb25UZXh0IiwidHlwZVRleHQiLCJ3aGVuVGV4dCIsInN0YXJ0RGF0ZUZvcm1hdFRleHQiLCJzdGFydERhdGVGb3JtYXRUZXh0MjQiLCJlbmREYXRlRm9ybWF0VGV4dCIsImVuZERhdGVGb3JtYXRUZXh0MjQiLCJlbnRpdHlUZXh0IiwiZXZlbnRUeXBlVGV4dCIsImF0VG9EbyIsInRvRG8iLCJhdFBob25lQ2FsbCIsInBob25lQ2FsbCIsImF0QXBwb2ludG1lbnQiLCJtZWV0aW5nIiwiYXRMaXRlcmF0dXJlIiwibGl0ZXJhdHVyZSIsImF0UGVyc29uYWwiLCJwZXJzb25hbCIsImlkIiwiZWRpdFZpZXciLCJzZWN1cml0eSIsInF1ZXJ5U2VsZWN0IiwicmVzb3VyY2VLaW5kIiwiZm9ybWF0RXZlbnRUeXBlIiwidmFsIiwiaW5pdCIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImNyZWF0ZUxheW91dCIsImxheW91dCIsInRpdGxlIiwiZGV0YWlsc1RleHQiLCJuYW1lIiwiY2hpbGRyZW4iLCJwcm9wZXJ0eSIsImxhYmVsIiwicmVuZGVyZXIiLCJiaW5kRGVsZWdhdGUiLCJkYXRlIiwiQXBwIiwiaXMyNEhvdXJDbG9jayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFvQkEsTUFBTUEsV0FBVyxvQkFBWSxhQUFaLENBQWpCO0FBQ0EsTUFBTUMsbUJBQW1CLG9CQUFZLDJCQUFaLENBQXpCOztBQUVBOzs7Ozs7O0FBT0EsTUFBTUMsVUFBVSx1QkFBUSx3QkFBUixFQUFrQyxrQkFBbEMsRUFBNEM7QUFDMUQ7QUFDQUMsaUJBQWFILFNBQVNHLFdBRm9DO0FBRzFEQyxtQkFBZUosU0FBU0ksYUFIa0M7QUFJMURDLGlCQUFhTCxTQUFTSyxXQUpvQztBQUsxREMsZUFBV04sU0FBU00sU0FMc0M7QUFNMURDLHFCQUFpQlAsU0FBU08sZUFOZ0M7QUFPMURDLGNBQVVSLFNBQVNRLFFBUHVDO0FBUTFEQyxjQUFVVCxTQUFTUyxRQVJ1QztBQVMxREMseUJBQXFCVCxpQkFBaUJTLG1CQVRvQjtBQVUxREMsMkJBQXVCVixpQkFBaUJVLHFCQVZrQjtBQVcxREMsdUJBQW1CWCxpQkFBaUJXLGlCQVhzQjtBQVkxREMseUJBQXFCWixpQkFBaUJZLG1CQVpvQjtBQWExREMsZ0JBQVlkLFNBQVNjLFVBYnFDO0FBYzFEQyxtQkFBZTtBQUNiQyxjQUFRaEIsU0FBU2lCLElBREo7QUFFYkMsbUJBQWFsQixTQUFTbUIsU0FGVDtBQUdiQyxxQkFBZXBCLFNBQVNxQixPQUhYO0FBSWJDLG9CQUFjdEIsU0FBU3VCLFVBSlY7QUFLYkMsa0JBQVl4QixTQUFTeUI7QUFMUixLQWQyQzs7QUFzQjFEO0FBQ0FDLFFBQUksY0F2QnNEO0FBd0IxREMsY0FBVSxZQXhCZ0Q7QUF5QjFEQyxjQUFVLElBekJnRCxFQXlCMUM7QUFDaEJDLGlCQUFhLENBQ1gsYUFEVyxFQUVYLFNBRlcsRUFHWCxXQUhXLEVBSVgsUUFKVyxFQUtYLE1BTFcsQ0ExQjZDO0FBaUMxREMsa0JBQWMsUUFqQzRDOztBQW1DMURDLHFCQUFpQixTQUFTQSxlQUFULENBQXlCQyxHQUF6QixFQUE4QjtBQUM3QyxhQUFPLEtBQUtqQixhQUFMLENBQW1CaUIsR0FBbkIsS0FBMkJBLEdBQWxDO0FBQ0QsS0FyQ3lEO0FBc0MxREMsVUFBTSxTQUFTQSxJQUFULEdBQWdCO0FBQ3BCLFdBQUtDLFNBQUwsQ0FBZUQsSUFBZixFQUFxQkUsU0FBckI7QUFDRCxLQXhDeUQ7QUF5QzFEQyxrQkFBYyxTQUFTQSxZQUFULEdBQXdCO0FBQ3BDLGFBQU8sS0FBS0MsTUFBTCxLQUFnQixLQUFLQSxNQUFMLEdBQWMsQ0FBQztBQUNwQ0MsZUFBTyxLQUFLQyxXQUR3QjtBQUVwQ0MsY0FBTSxnQkFGOEI7QUFHcENDLGtCQUFVLENBQUM7QUFDVEQsZ0JBQU0sTUFERztBQUVURSxvQkFBVSxNQUZEO0FBR1RDLGlCQUFPLEtBQUtuQyxRQUhIO0FBSVRvQyxvQkFBVSxLQUFLYixlQUFMLENBQXFCYyxZQUFyQixDQUFrQyxJQUFsQztBQUpELFNBQUQsRUFLUDtBQUNETCxnQkFBTSxhQURMO0FBRURFLG9CQUFVLGFBRlQ7QUFHREMsaUJBQU8sS0FBS3BDO0FBSFgsU0FMTztBQUgwQixPQUFELEVBYWxDO0FBQ0QrQixlQUFPLEtBQUs3QixRQURYO0FBRUQrQixjQUFNLGFBRkw7QUFHREMsa0JBQVUsQ0FBQztBQUNURCxnQkFBTSxXQURHO0FBRVRFLG9CQUFVLFdBRkQ7QUFHVEMsaUJBQU8sS0FBS3ZDLGFBSEg7QUFJVHdDLG9CQUFVLGlCQUFPRSxJQUFQLENBQVlELFlBQVosQ0FDUixJQURRLEVBQ0RFLElBQUlDLGFBQUosRUFBRCxHQUF3QixLQUFLckMscUJBQTdCLEdBQXFELEtBQUtELG1CQUR4RDtBQUpELFNBQUQsRUFNUDtBQUNEOEIsZ0JBQU0sU0FETDtBQUVERSxvQkFBVSxTQUZUO0FBR0RDLGlCQUFPLEtBQUt0QyxXQUhYO0FBSUR1QyxvQkFBVSxpQkFBT0UsSUFBUCxDQUFZRCxZQUFaLENBQ1IsSUFEUSxFQUNERSxJQUFJQyxhQUFKLEVBQUQsR0FBd0IsS0FBS25DLG1CQUE3QixHQUFtRCxLQUFLRCxpQkFEdEQ7QUFKVCxTQU5PO0FBSFQsT0Fia0MsQ0FBOUIsQ0FBUDtBQThCRDtBQXhFeUQsR0FBNUMsQ0FBaEI7O29CQTJFZVYsTyIsImZpbGUiOiJEZXRhaWwuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJy4uLy4uL0Zvcm1hdCc7XHJcbmltcG9ydCBEZXRhaWwgZnJvbSAnYXJnb3MvRGV0YWlsJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXZlbnREZXRhaWwnKTtcclxuY29uc3QgZHRGb3JtYXRSZXNvdXJjZSA9IGdldFJlc291cmNlKCdldmVudERldGFpbERhdGVUaW1lRm9ybWF0Jyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5FdmVudC5EZXRhaWxcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuRGV0YWlsXHJcbiAqXHJcbiAqIEByZXF1aXJlcyBjcm0uRm9ybWF0XHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLkV2ZW50LkRldGFpbCcsIFtEZXRhaWxdLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgYWN0aW9uc1RleHQ6IHJlc291cmNlLmFjdGlvbnNUZXh0LFxyXG4gIHN0YXJ0VGltZVRleHQ6IHJlc291cmNlLnN0YXJ0VGltZVRleHQsXHJcbiAgZW5kVGltZVRleHQ6IHJlc291cmNlLmVuZFRpbWVUZXh0LFxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIGRlc2NyaXB0aW9uVGV4dDogcmVzb3VyY2UuZGVzY3JpcHRpb25UZXh0LFxyXG4gIHR5cGVUZXh0OiByZXNvdXJjZS50eXBlVGV4dCxcclxuICB3aGVuVGV4dDogcmVzb3VyY2Uud2hlblRleHQsXHJcbiAgc3RhcnREYXRlRm9ybWF0VGV4dDogZHRGb3JtYXRSZXNvdXJjZS5zdGFydERhdGVGb3JtYXRUZXh0LFxyXG4gIHN0YXJ0RGF0ZUZvcm1hdFRleHQyNDogZHRGb3JtYXRSZXNvdXJjZS5zdGFydERhdGVGb3JtYXRUZXh0MjQsXHJcbiAgZW5kRGF0ZUZvcm1hdFRleHQ6IGR0Rm9ybWF0UmVzb3VyY2UuZW5kRGF0ZUZvcm1hdFRleHQsXHJcbiAgZW5kRGF0ZUZvcm1hdFRleHQyNDogZHRGb3JtYXRSZXNvdXJjZS5lbmREYXRlRm9ybWF0VGV4dDI0LFxyXG4gIGVudGl0eVRleHQ6IHJlc291cmNlLmVudGl0eVRleHQsXHJcbiAgZXZlbnRUeXBlVGV4dDoge1xyXG4gICAgYXRUb0RvOiByZXNvdXJjZS50b0RvLFxyXG4gICAgYXRQaG9uZUNhbGw6IHJlc291cmNlLnBob25lQ2FsbCxcclxuICAgIGF0QXBwb2ludG1lbnQ6IHJlc291cmNlLm1lZXRpbmcsXHJcbiAgICBhdExpdGVyYXR1cmU6IHJlc291cmNlLmxpdGVyYXR1cmUsXHJcbiAgICBhdFBlcnNvbmFsOiByZXNvdXJjZS5wZXJzb25hbCxcclxuICB9LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ2V2ZW50X2RldGFpbCcsXHJcbiAgZWRpdFZpZXc6ICdldmVudF9lZGl0JyxcclxuICBzZWN1cml0eTogbnVsbCwgLy8gJ0VudGl0aWVzL0V2ZW50L1ZpZXcnLFxyXG4gIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAnRGVzY3JpcHRpb24nLFxyXG4gICAgJ0VuZERhdGUnLFxyXG4gICAgJ1N0YXJ0RGF0ZScsXHJcbiAgICAnVXNlcklkJyxcclxuICAgICdUeXBlJyxcclxuICBdLFxyXG4gIHJlc291cmNlS2luZDogJ2V2ZW50cycsXHJcblxyXG4gIGZvcm1hdEV2ZW50VHlwZTogZnVuY3Rpb24gZm9ybWF0RXZlbnRUeXBlKHZhbCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZXZlbnRUeXBlVGV4dFt2YWxdIHx8IHZhbDtcclxuICB9LFxyXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChpbml0LCBhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgY3JlYXRlTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXlvdXQgfHwgKHRoaXMubGF5b3V0ID0gW3tcclxuICAgICAgdGl0bGU6IHRoaXMuZGV0YWlsc1RleHQsXHJcbiAgICAgIG5hbWU6ICdEZXRhaWxzU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIG5hbWU6ICdUeXBlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1R5cGUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnR5cGVUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiB0aGlzLmZvcm1hdEV2ZW50VHlwZS5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmRlc2NyaXB0aW9uVGV4dCxcclxuICAgICAgfV0sXHJcbiAgICB9LCB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLndoZW5UZXh0LFxyXG4gICAgICBuYW1lOiAnV2hlblNlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBuYW1lOiAnU3RhcnREYXRlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1N0YXJ0RGF0ZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc3RhcnRUaW1lVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZm9ybWF0LmRhdGUuYmluZERlbGVnYXRlKFxyXG4gICAgICAgICAgdGhpcywgKEFwcC5pczI0SG91ckNsb2NrKCkpID8gdGhpcy5zdGFydERhdGVGb3JtYXRUZXh0MjQgOiB0aGlzLnN0YXJ0RGF0ZUZvcm1hdFRleHQpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VuZERhdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRW5kRGF0ZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZW5kVGltZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZvcm1hdC5kYXRlLmJpbmREZWxlZ2F0ZShcclxuICAgICAgICAgIHRoaXMsIChBcHAuaXMyNEhvdXJDbG9jaygpKSA/IHRoaXMuZW5kRGF0ZUZvcm1hdFRleHQyNCA6IHRoaXMuZW5kRGF0ZUZvcm1hdFRleHQpLFxyXG4gICAgICB9XSxcclxuICAgIH1dKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==