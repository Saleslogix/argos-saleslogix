define('crm/Models/Activity/Base', ['module', 'exports', 'dojo/_base/declare', 'argos/Models/_ModelBase', '../Names', './ActivityTypeText', './ActivityTypeIcon', 'argos/I18n'], function (module, exports, _declare, _ModelBase2, _Names, _ActivityTypeText, _ActivityTypeIcon, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _ModelBase3 = _interopRequireDefault(_ModelBase2);

  var _Names2 = _interopRequireDefault(_Names);

  var _ActivityTypeText2 = _interopRequireDefault(_ActivityTypeText);

  var _ActivityTypeIcon2 = _interopRequireDefault(_ActivityTypeIcon);

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

  var resource = (0, _I18n2.default)('activityModel');
  var accountResource = (0, _I18n2.default)('accountModel');
  var contactResource = (0, _I18n2.default)('contactModel');
  var oppResource = (0, _I18n2.default)('opportunityModel');
  var ticketResource = (0, _I18n2.default)('ticketModel');
  var leadResource = (0, _I18n2.default)('leadModel');
  var activityTypeResource = (0, _I18n2.default)('activityTypeText');

  var __class = (0, _declare2.default)('crm.Models.Activity.Base', [_ModelBase3.default], {
    modelName: _Names2.default.ACTIVITY,
    entityName: 'Activity',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    iconClass: 'bullet-list',
    resourceKind: 'activities',
    contractName: 'system',
    recurringActivityIdSeparator: ';',

    activityTypeText: {
      atToDo: activityTypeResource.atToDoText,
      atPhoneCall: activityTypeResource.atPhoneCallText,
      atAppointment: activityTypeResource.atAppointmentText,
      atLiterature: activityTypeResource.atLiteratureText,
      atPersonal: activityTypeResource.atPersonalText,
      atQuestion: activityTypeResource.atQuestionText,
      atNote: activityTypeResource.atNoteText,
      atEMail: activityTypeResource.atEMailText
    },

    createPicklists: function createPicklists() {
      return this.picklists || (this.picklists = [{
        name: 'Priorities',
        property: 'Priorities'
      }]);
    },
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = [{
        name: 'Account',
        displayName: accountResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'AccountId',
        relatedEntity: 'Account'
      }, {
        name: 'Contact',
        displayName: contactResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'ContactId',
        relatedEntity: 'Contact'
      }, {
        name: 'Ticket',
        displayName: ticketResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'TicketId',
        relatedEntity: 'Ticket'
      }, {
        name: 'Opportunity',
        displayName: oppResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'OpportunityId',
        relatedEntity: 'Opportunity'
      }, {
        name: 'Lead',
        displayName: leadResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'LeadId',
        relatedEntity: 'Lead'
      }]);
      return rel;
    },
    getIconClass: function getIconClass(entry) {
      var cls = this.iconClass;
      if (entry && entry.Type) {
        cls = _ActivityTypeIcon2.default[entry.Type];
        if (cls) {
          cls = '' + cls;
        }
      }
      return cls;
    },
    getEntityDescription: function getEntityDescription(entry) {
      if (entry) {
        var type = entry.Type || '';
        var titleText = this.activityTypeText[type] ? this.activityTypeText[type] + ' - ' + entry.Description : entry.$descriptor;
        return titleText;
      }
      return '';
    },
    getTypeText: function getTypeText(entry) {
      var name = '';
      if (entry && entry.Type) {
        name = _ActivityTypeText2.default[entry.Type];
      }
      return name;
    },
    isActivityRecurring: function isActivityRecurring(entry) {
      return entry && (entry.Recurring || entry.RecurrenceState === 'rstOccurrence');
    }
  });
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbHMvQWN0aXZpdHkvQmFzZS5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsImFjY291bnRSZXNvdXJjZSIsImNvbnRhY3RSZXNvdXJjZSIsIm9wcFJlc291cmNlIiwidGlja2V0UmVzb3VyY2UiLCJsZWFkUmVzb3VyY2UiLCJhY3Rpdml0eVR5cGVSZXNvdXJjZSIsIl9fY2xhc3MiLCJtb2RlbE5hbWUiLCJBQ1RJVklUWSIsImVudGl0eU5hbWUiLCJlbnRpdHlEaXNwbGF5TmFtZSIsImVudGl0eURpc3BsYXlOYW1lUGx1cmFsIiwiaWNvbkNsYXNzIiwicmVzb3VyY2VLaW5kIiwiY29udHJhY3ROYW1lIiwicmVjdXJyaW5nQWN0aXZpdHlJZFNlcGFyYXRvciIsImFjdGl2aXR5VHlwZVRleHQiLCJhdFRvRG8iLCJhdFRvRG9UZXh0IiwiYXRQaG9uZUNhbGwiLCJhdFBob25lQ2FsbFRleHQiLCJhdEFwcG9pbnRtZW50IiwiYXRBcHBvaW50bWVudFRleHQiLCJhdExpdGVyYXR1cmUiLCJhdExpdGVyYXR1cmVUZXh0IiwiYXRQZXJzb25hbCIsImF0UGVyc29uYWxUZXh0IiwiYXRRdWVzdGlvbiIsImF0UXVlc3Rpb25UZXh0IiwiYXROb3RlIiwiYXROb3RlVGV4dCIsImF0RU1haWwiLCJhdEVNYWlsVGV4dCIsImNyZWF0ZVBpY2tsaXN0cyIsInBpY2tsaXN0cyIsIm5hbWUiLCJwcm9wZXJ0eSIsImNyZWF0ZVJlbGF0aW9uc2hpcHMiLCJyZWwiLCJyZWxhdGlvbnNoaXBzIiwiZGlzcGxheU5hbWUiLCJ0eXBlIiwicGFyZW50UHJvcGVydHkiLCJyZWxhdGVkRW50aXR5IiwiZ2V0SWNvbkNsYXNzIiwiZW50cnkiLCJjbHMiLCJUeXBlIiwiZ2V0RW50aXR5RGVzY3JpcHRpb24iLCJ0aXRsZVRleHQiLCJEZXNjcmlwdGlvbiIsIiRkZXNjcmlwdG9yIiwiZ2V0VHlwZVRleHQiLCJpc0FjdGl2aXR5UmVjdXJyaW5nIiwiUmVjdXJyaW5nIiwiUmVj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QUFDRjtBQUNELGFBQU9BLEdBQVA7QUFDRCxLQXRFK0Q7QUF1RWhFRSwwQkFBc0IsU0FBU0Esb0JBQVQsQ0FBOEJILEtBQTlCLEVBQXFDO0FBQ3pELFVBQUlBLEtBQUosRUFBVztBQUNULFlBQU1KLE9BQU9JLE1BQU1FLElBQU4sSUFBYyxFQUEzQjtBQUNBLFlBQU1FLFlBQVksS0FBS2pDLGdCQUFMLENBQXNCeUIsSUFBdEIsSUFBaUMsS0FBS3pCLGdCQUFMLENBQXNCeUIsSUFBdEIsQ0FBakMsV0FBa0VJLE1BQU1LLFdBQXhFLEdBQXdGTCxNQUFNTSxXQUFoSDtBQUNBLGVBQU9GLFNBQVA7QUFDRDtBQUNELGFBQU8sRUFBUDtBQUNELEtBOUUrRDtBQStFaEVHLGlCQUFhLFNBQVNBLFdBQVQsQ0FBcUJQLEtBQXJCLEVBQTRCO0FBQ3ZDLFVBQUlWLE9BQU8sRUFBWDtBQUNBLFVBQUlVLFNBQVNBLE1BQU1FLElBQW5CLEVBQXlCO0FBQ3ZCWixlQUFPLDJCQUFtQlUsTUFBTUUsSUFBekIsQ0FBUDtBQUNEO0FBQ0QsYUFBT1osSUFBUDtBQUNELEtBckYrRDtBQXNGaEVrQix5QkFBcUIsU0FBU0EsbUJBQVQsQ0FBNkJSLEtBQTdCLEVBQW9DO0FBQ3ZELGFBQU9BLFVBQVVBLE1BQU1TLFNBQU4sSUFBbUJULE1BQU1VLGVBQU4sS0FBMEIsZUFBdkQsQ0FBUDtBQUNEO0FBeEYrRCxHQUFsRCxDQUFoQjtvQkEwRmVqRCxPIiwiZmlsZSI6IkJhc2UuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgX01vZGVsQmFzZSBmcm9tICdhcmdvcy9Nb2RlbHMvX01vZGVsQmFzZSc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi9OYW1lcyc7XHJcbmltcG9ydCBBQ1RJVklUWV9UWVBFX1RFWFQgZnJvbSAnLi9BY3Rpdml0eVR5cGVUZXh0JztcclxuaW1wb3J0IEFDVElWSVRZX1RZUEVfSUNPTiBmcm9tICcuL0FjdGl2aXR5VHlwZUljb24nO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdhY3Rpdml0eU1vZGVsJyk7XHJcbmNvbnN0IGFjY291bnRSZXNvdXJjZSA9IGdldFJlc291cmNlKCdhY2NvdW50TW9kZWwnKTtcclxuY29uc3QgY29udGFjdFJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2NvbnRhY3RNb2RlbCcpO1xyXG5jb25zdCBvcHBSZXNvdXJjZSA9IGdldFJlc291cmNlKCdvcHBvcnR1bml0eU1vZGVsJyk7XHJcbmNvbnN0IHRpY2tldFJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3RpY2tldE1vZGVsJyk7XHJcbmNvbnN0IGxlYWRSZXNvdXJjZSA9IGdldFJlc291cmNlKCdsZWFkTW9kZWwnKTtcclxuY29uc3QgYWN0aXZpdHlUeXBlUmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYWN0aXZpdHlUeXBlVGV4dCcpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5Nb2RlbHMuQWN0aXZpdHkuQmFzZScsIFtfTW9kZWxCYXNlXSwge1xyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuQUNUSVZJVFksXHJcbiAgZW50aXR5TmFtZTogJ0FjdGl2aXR5JyxcclxuICBlbnRpdHlEaXNwbGF5TmFtZTogcmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWUsXHJcbiAgZW50aXR5RGlzcGxheU5hbWVQbHVyYWw6IHJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gIGljb25DbGFzczogJ2J1bGxldC1saXN0JyxcclxuICByZXNvdXJjZUtpbmQ6ICdhY3Rpdml0aWVzJyxcclxuICBjb250cmFjdE5hbWU6ICdzeXN0ZW0nLFxyXG4gIHJlY3VycmluZ0FjdGl2aXR5SWRTZXBhcmF0b3I6ICc7JyxcclxuXHJcbiAgYWN0aXZpdHlUeXBlVGV4dDoge1xyXG4gICAgYXRUb0RvOiBhY3Rpdml0eVR5cGVSZXNvdXJjZS5hdFRvRG9UZXh0LFxyXG4gICAgYXRQaG9uZUNhbGw6IGFjdGl2aXR5VHlwZVJlc291cmNlLmF0UGhvbmVDYWxsVGV4dCxcclxuICAgIGF0QXBwb2ludG1lbnQ6IGFjdGl2aXR5VHlwZVJlc291cmNlLmF0QXBwb2ludG1lbnRUZXh0LFxyXG4gICAgYXRMaXRlcmF0dXJlOiBhY3Rpdml0eVR5cGVSZXNvdXJjZS5hdExpdGVyYXR1cmVUZXh0LFxyXG4gICAgYXRQZXJzb25hbDogYWN0aXZpdHlUeXBlUmVzb3VyY2UuYXRQZXJzb25hbFRleHQsXHJcbiAgICBhdFF1ZXN0aW9uOiBhY3Rpdml0eVR5cGVSZXNvdXJjZS5hdFF1ZXN0aW9uVGV4dCxcclxuICAgIGF0Tm90ZTogYWN0aXZpdHlUeXBlUmVzb3VyY2UuYXROb3RlVGV4dCxcclxuICAgIGF0RU1haWw6IGFjdGl2aXR5VHlwZVJlc291cmNlLmF0RU1haWxUZXh0LFxyXG4gIH0sXHJcblxyXG4gIGNyZWF0ZVBpY2tsaXN0czogZnVuY3Rpb24gY3JlYXRlUGlja2xpc3RzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucGlja2xpc3RzIHx8ICh0aGlzLnBpY2tsaXN0cyA9IFt7XHJcbiAgICAgIG5hbWU6ICdQcmlvcml0aWVzJyxcclxuICAgICAgcHJvcGVydHk6ICdQcmlvcml0aWVzJyxcclxuICAgIH1dKTtcclxuICB9LFxyXG4gIGNyZWF0ZVJlbGF0aW9uc2hpcHM6IGZ1bmN0aW9uIGNyZWF0ZVJlbGF0aW9uc2hpcHMoKSB7XHJcbiAgICBjb25zdCByZWwgPSB0aGlzLnJlbGF0aW9uc2hpcHMgfHwgKHRoaXMucmVsYXRpb25zaGlwcyA9IFt7XHJcbiAgICAgIG5hbWU6ICdBY2NvdW50JyxcclxuICAgICAgZGlzcGxheU5hbWU6IGFjY291bnRSZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZSxcclxuICAgICAgdHlwZTogJ01hbnlUb09uZScsXHJcbiAgICAgIHBhcmVudFByb3BlcnR5OiAnQWNjb3VudElkJyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ0FjY291bnQnLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnQ29udGFjdCcsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiBjb250YWN0UmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWUsXHJcbiAgICAgIHR5cGU6ICdNYW55VG9PbmUnLFxyXG4gICAgICBwYXJlbnRQcm9wZXJ0eTogJ0NvbnRhY3RJZCcsXHJcbiAgICAgIHJlbGF0ZWRFbnRpdHk6ICdDb250YWN0JyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ1RpY2tldCcsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiB0aWNrZXRSZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZSxcclxuICAgICAgdHlwZTogJ01hbnlUb09uZScsXHJcbiAgICAgIHBhcmVudFByb3BlcnR5OiAnVGlja2V0SWQnLFxyXG4gICAgICByZWxhdGVkRW50aXR5OiAnVGlja2V0JyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ09wcG9ydHVuaXR5JyxcclxuICAgICAgZGlzcGxheU5hbWU6IG9wcFJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lLFxyXG4gICAgICB0eXBlOiAnTWFueVRvT25lJyxcclxuICAgICAgcGFyZW50UHJvcGVydHk6ICdPcHBvcnR1bml0eUlkJyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ09wcG9ydHVuaXR5JyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ0xlYWQnLFxyXG4gICAgICBkaXNwbGF5TmFtZTogbGVhZFJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lLFxyXG4gICAgICB0eXBlOiAnTWFueVRvT25lJyxcclxuICAgICAgcGFyZW50UHJvcGVydHk6ICdMZWFkSWQnLFxyXG4gICAgICByZWxhdGVkRW50aXR5OiAnTGVhZCcsXHJcbiAgICB9XSk7XHJcbiAgICByZXR1cm4gcmVsO1xyXG4gIH0sXHJcbiAgZ2V0SWNvbkNsYXNzOiBmdW5jdGlvbiBnZXRJY29uQ2xhc3MoZW50cnkpIHtcclxuICAgIGxldCBjbHMgPSB0aGlzLmljb25DbGFzcztcclxuICAgIGlmIChlbnRyeSAmJiBlbnRyeS5UeXBlKSB7XHJcbiAgICAgIGNscyA9IEFDVElWSVRZX1RZUEVfSUNPTltlbnRyeS5UeXBlXTtcclxuICAgICAgaWYgKGNscykge1xyXG4gICAgICAgIGNscyA9IGAke2Nsc31gO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2xzO1xyXG4gIH0sXHJcbiAgZ2V0RW50aXR5RGVzY3JpcHRpb246IGZ1bmN0aW9uIGdldEVudGl0eURlc2NyaXB0aW9uKGVudHJ5KSB7XHJcbiAgICBpZiAoZW50cnkpIHtcclxuICAgICAgY29uc3QgdHlwZSA9IGVudHJ5LlR5cGUgfHwgJyc7XHJcbiAgICAgIGNvbnN0IHRpdGxlVGV4dCA9IHRoaXMuYWN0aXZpdHlUeXBlVGV4dFt0eXBlXSA/IGAke3RoaXMuYWN0aXZpdHlUeXBlVGV4dFt0eXBlXX0gLSAke2VudHJ5LkRlc2NyaXB0aW9ufWAgOiBlbnRyeS4kZGVzY3JpcHRvcjtcclxuICAgICAgcmV0dXJuIHRpdGxlVGV4dDtcclxuICAgIH1cclxuICAgIHJldHVybiAnJztcclxuICB9LFxyXG4gIGdldFR5cGVUZXh0OiBmdW5jdGlvbiBnZXRUeXBlVGV4dChlbnRyeSkge1xyXG4gICAgbGV0IG5hbWUgPSAnJztcclxuICAgIGlmIChlbnRyeSAmJiBlbnRyeS5UeXBlKSB7XHJcbiAgICAgIG5hbWUgPSBBQ1RJVklUWV9UWVBFX1RFWFRbZW50cnkuVHlwZV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmFtZTtcclxuICB9LFxyXG4gIGlzQWN0aXZpdHlSZWN1cnJpbmc6IGZ1bmN0aW9uIGlzQWN0aXZpdHlSZWN1cnJpbmcoZW50cnkpIHtcclxuICAgIHJldHVybiBlbnRyeSAmJiAoZW50cnkuUmVjdXJyaW5nIHx8IGVudHJ5LlJlY3VycmVuY2VTdGF0ZSA9PT0gJ3JzdE9jY3VycmVuY2UnKTtcclxuICB9LFxyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19