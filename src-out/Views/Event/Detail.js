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
      this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9FdmVudC9EZXRhaWwuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJkdEZvcm1hdFJlc291cmNlIiwiX19jbGFzcyIsImFjdGlvbnNUZXh0Iiwic3RhcnRUaW1lVGV4dCIsImVuZFRpbWVUZXh0IiwidGl0bGVUZXh0IiwiZGVzY3JpcHRpb25UZXh0IiwidHlwZVRleHQiLCJ3aGVuVGV4dCIsInN0YXJ0RGF0ZUZvcm1hdFRleHQiLCJzdGFydERhdGVGb3JtYXRUZXh0MjQiLCJlbmREYXRlRm9ybWF0VGV4dCIsImVuZERhdGVGb3JtYXRUZXh0MjQiLCJlbnRpdHlUZXh0IiwiZXZlbnRUeXBlVGV4dCIsImF0VG9EbyIsInRvRG8iLCJhdFBob25lQ2FsbCIsInBob25lQ2FsbCIsImF0QXBwb2ludG1lbnQiLCJtZWV0aW5nIiwiYXRMaXRlcmF0dXJlIiwibGl0ZXJhdHVyZSIsImF0UGVyc29uYWwiLCJwZXJzb25hbCIsImlkIiwiZWRpdFZpZXciLCJzZWN1cml0eSIsInF1ZXJ5U2VsZWN0IiwicmVzb3VyY2VLaW5kIiwiZm9ybWF0RXZlbnRUeXBlIiwidmFsIiwiaW5pdCIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImNyZWF0ZUxheW91dCIsImxheW91dCIsInRpdGxlIiwiZGV0YWlsc1RleHQiLCJuYW1lIiwiY2hpbGRyZW4iLCJwcm9wZXJ0eSIsImxhYmVsIiwicmVuZGVyZXIiLCJiaW5kRGVsZWdhdGUiLCJkYXRlIiwiQXBwIiwiaXMyNEhvdXJDbG9jayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFvQkEsTUFBTUEsV0FBVyxvQkFBWSxhQUFaLENBQWpCO0FBQ0EsTUFBTUMsbUJBQW1CLG9CQUFZLDJCQUFaLENBQXpCOztBQUVBOzs7Ozs7O0FBT0EsTUFBTUMsVUFBVSx1QkFBUSx3QkFBUixFQUFrQyxrQkFBbEMsRUFBNEM7QUFDMUQ7QUFDQUMsaUJBQWFILFNBQVNHLFdBRm9DO0FBRzFEQyxtQkFBZUosU0FBU0ksYUFIa0M7QUFJMURDLGlCQUFhTCxTQUFTSyxXQUpvQztBQUsxREMsZUFBV04sU0FBU00sU0FMc0M7QUFNMURDLHFCQUFpQlAsU0FBU08sZUFOZ0M7QUFPMURDLGNBQVVSLFNBQVNRLFFBUHVDO0FBUTFEQyxjQUFVVCxTQUFTUyxRQVJ1QztBQVMxREMseUJBQXFCVCxpQkFBaUJTLG1CQVRvQjtBQVUxREMsMkJBQXVCVixpQkFBaUJVLHFCQVZrQjtBQVcxREMsdUJBQW1CWCxpQkFBaUJXLGlCQVhzQjtBQVkxREMseUJBQXFCWixpQkFBaUJZLG1CQVpvQjtBQWExREMsZ0JBQVlkLFNBQVNjLFVBYnFDO0FBYzFEQyxtQkFBZTtBQUNiQyxjQUFRaEIsU0FBU2lCLElBREo7QUFFYkMsbUJBQWFsQixTQUFTbUIsU0FGVDtBQUdiQyxxQkFBZXBCLFNBQVNxQixPQUhYO0FBSWJDLG9CQUFjdEIsU0FBU3VCLFVBSlY7QUFLYkMsa0JBQVl4QixTQUFTeUI7QUFMUixLQWQyQzs7QUFzQjFEO0FBQ0FDLFFBQUksY0F2QnNEO0FBd0IxREMsY0FBVSxZQXhCZ0Q7QUF5QjFEQyxjQUFVLElBekJnRCxFQXlCMUM7QUFDaEJDLGlCQUFhLENBQ1gsYUFEVyxFQUVYLFNBRlcsRUFHWCxXQUhXLEVBSVgsUUFKVyxFQUtYLE1BTFcsQ0ExQjZDO0FBaUMxREMsa0JBQWMsUUFqQzRDOztBQW1DMURDLHFCQUFpQixTQUFTQSxlQUFULENBQXlCQyxHQUF6QixFQUE4QjtBQUM3QyxhQUFPLEtBQUtqQixhQUFMLENBQW1CaUIsR0FBbkIsS0FBMkJBLEdBQWxDO0FBQ0QsS0FyQ3lEO0FBc0MxREMsVUFBTSxTQUFTQSxJQUFULEdBQWdCO0FBQ3BCLFdBQUtDLFNBQUwsQ0FBZUMsU0FBZjtBQUNELEtBeEN5RDtBQXlDMURDLGtCQUFjLFNBQVNBLFlBQVQsR0FBd0I7QUFDcEMsYUFBTyxLQUFLQyxNQUFMLEtBQWdCLEtBQUtBLE1BQUwsR0FBYyxDQUFDO0FBQ3BDQyxlQUFPLEtBQUtDLFdBRHdCO0FBRXBDQyxjQUFNLGdCQUY4QjtBQUdwQ0Msa0JBQVUsQ0FBQztBQUNURCxnQkFBTSxNQURHO0FBRVRFLG9CQUFVLE1BRkQ7QUFHVEMsaUJBQU8sS0FBS25DLFFBSEg7QUFJVG9DLG9CQUFVLEtBQUtiLGVBQUwsQ0FBcUJjLFlBQXJCLENBQWtDLElBQWxDO0FBSkQsU0FBRCxFQUtQO0FBQ0RMLGdCQUFNLGFBREw7QUFFREUsb0JBQVUsYUFGVDtBQUdEQyxpQkFBTyxLQUFLcEM7QUFIWCxTQUxPO0FBSDBCLE9BQUQsRUFhbEM7QUFDRCtCLGVBQU8sS0FBSzdCLFFBRFg7QUFFRCtCLGNBQU0sYUFGTDtBQUdEQyxrQkFBVSxDQUFDO0FBQ1RELGdCQUFNLFdBREc7QUFFVEUsb0JBQVUsV0FGRDtBQUdUQyxpQkFBTyxLQUFLdkMsYUFISDtBQUlUd0Msb0JBQVUsaUJBQU9FLElBQVAsQ0FBWUQsWUFBWixDQUNSLElBRFEsRUFDREUsSUFBSUMsYUFBSixFQUFELEdBQXdCLEtBQUtyQyxxQkFBN0IsR0FBcUQsS0FBS0QsbUJBRHhEO0FBSkQsU0FBRCxFQU1QO0FBQ0Q4QixnQkFBTSxTQURMO0FBRURFLG9CQUFVLFNBRlQ7QUFHREMsaUJBQU8sS0FBS3RDLFdBSFg7QUFJRHVDLG9CQUFVLGlCQUFPRSxJQUFQLENBQVlELFlBQVosQ0FDUixJQURRLEVBQ0RFLElBQUlDLGFBQUosRUFBRCxHQUF3QixLQUFLbkMsbUJBQTdCLEdBQW1ELEtBQUtELGlCQUR0RDtBQUpULFNBTk87QUFIVCxPQWJrQyxDQUE5QixDQUFQO0FBOEJEO0FBeEV5RCxHQUE1QyxDQUFoQjs7b0JBMkVlVixPIiwiZmlsZSI6IkRldGFpbC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnLi4vLi4vRm9ybWF0JztcclxuaW1wb3J0IERldGFpbCBmcm9tICdhcmdvcy9EZXRhaWwnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdldmVudERldGFpbCcpO1xyXG5jb25zdCBkdEZvcm1hdFJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2V2ZW50RGV0YWlsRGF0ZVRpbWVGb3JtYXQnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLkV2ZW50LkRldGFpbFxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5EZXRhaWxcclxuICpcclxuICogQHJlcXVpcmVzIGNybS5Gb3JtYXRcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuRXZlbnQuRGV0YWlsJywgW0RldGFpbF0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICBhY3Rpb25zVGV4dDogcmVzb3VyY2UuYWN0aW9uc1RleHQsXHJcbiAgc3RhcnRUaW1lVGV4dDogcmVzb3VyY2Uuc3RhcnRUaW1lVGV4dCxcclxuICBlbmRUaW1lVGV4dDogcmVzb3VyY2UuZW5kVGltZVRleHQsXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgZGVzY3JpcHRpb25UZXh0OiByZXNvdXJjZS5kZXNjcmlwdGlvblRleHQsXHJcbiAgdHlwZVRleHQ6IHJlc291cmNlLnR5cGVUZXh0LFxyXG4gIHdoZW5UZXh0OiByZXNvdXJjZS53aGVuVGV4dCxcclxuICBzdGFydERhdGVGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLnN0YXJ0RGF0ZUZvcm1hdFRleHQsXHJcbiAgc3RhcnREYXRlRm9ybWF0VGV4dDI0OiBkdEZvcm1hdFJlc291cmNlLnN0YXJ0RGF0ZUZvcm1hdFRleHQyNCxcclxuICBlbmREYXRlRm9ybWF0VGV4dDogZHRGb3JtYXRSZXNvdXJjZS5lbmREYXRlRm9ybWF0VGV4dCxcclxuICBlbmREYXRlRm9ybWF0VGV4dDI0OiBkdEZvcm1hdFJlc291cmNlLmVuZERhdGVGb3JtYXRUZXh0MjQsXHJcbiAgZW50aXR5VGV4dDogcmVzb3VyY2UuZW50aXR5VGV4dCxcclxuICBldmVudFR5cGVUZXh0OiB7XHJcbiAgICBhdFRvRG86IHJlc291cmNlLnRvRG8sXHJcbiAgICBhdFBob25lQ2FsbDogcmVzb3VyY2UucGhvbmVDYWxsLFxyXG4gICAgYXRBcHBvaW50bWVudDogcmVzb3VyY2UubWVldGluZyxcclxuICAgIGF0TGl0ZXJhdHVyZTogcmVzb3VyY2UubGl0ZXJhdHVyZSxcclxuICAgIGF0UGVyc29uYWw6IHJlc291cmNlLnBlcnNvbmFsLFxyXG4gIH0sXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnZXZlbnRfZGV0YWlsJyxcclxuICBlZGl0VmlldzogJ2V2ZW50X2VkaXQnLFxyXG4gIHNlY3VyaXR5OiBudWxsLCAvLyAnRW50aXRpZXMvRXZlbnQvVmlldycsXHJcbiAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICdEZXNjcmlwdGlvbicsXHJcbiAgICAnRW5kRGF0ZScsXHJcbiAgICAnU3RhcnREYXRlJyxcclxuICAgICdVc2VySWQnLFxyXG4gICAgJ1R5cGUnLFxyXG4gIF0sXHJcbiAgcmVzb3VyY2VLaW5kOiAnZXZlbnRzJyxcclxuXHJcbiAgZm9ybWF0RXZlbnRUeXBlOiBmdW5jdGlvbiBmb3JtYXRFdmVudFR5cGUodmFsKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ldmVudFR5cGVUZXh0W3ZhbF0gfHwgdmFsO1xyXG4gIH0sXHJcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICB0aXRsZTogdGhpcy5kZXRhaWxzVGV4dCxcclxuICAgICAgbmFtZTogJ0RldGFpbHNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbmFtZTogJ1R5cGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnVHlwZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMudHlwZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IHRoaXMuZm9ybWF0RXZlbnRUeXBlLmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZGVzY3JpcHRpb25UZXh0LFxyXG4gICAgICB9XSxcclxuICAgIH0sIHtcclxuICAgICAgdGl0bGU6IHRoaXMud2hlblRleHQsXHJcbiAgICAgIG5hbWU6ICdXaGVuU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIG5hbWU6ICdTdGFydERhdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU3RhcnREYXRlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zdGFydFRpbWVUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmb3JtYXQuZGF0ZS5iaW5kRGVsZWdhdGUoXHJcbiAgICAgICAgICB0aGlzLCAoQXBwLmlzMjRIb3VyQ2xvY2soKSkgPyB0aGlzLnN0YXJ0RGF0ZUZvcm1hdFRleHQyNCA6IHRoaXMuc3RhcnREYXRlRm9ybWF0VGV4dCksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRW5kRGF0ZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFbmREYXRlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5lbmRUaW1lVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZm9ybWF0LmRhdGUuYmluZERlbGVnYXRlKFxyXG4gICAgICAgICAgdGhpcywgKEFwcC5pczI0SG91ckNsb2NrKCkpID8gdGhpcy5lbmREYXRlRm9ybWF0VGV4dDI0IDogdGhpcy5lbmREYXRlRm9ybWF0VGV4dCksXHJcbiAgICAgIH1dLFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19