define('crm/Models/Ticket/Base', ['module', 'exports', 'dojo/_base/declare', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _ModelBase2, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _ModelBase3 = _interopRequireDefault(_ModelBase2);

  var _Names2 = _interopRequireDefault(_Names);

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

  var resource = (0, _I18n2.default)('ticketModel');
  var accountResource = (0, _I18n2.default)('accountModel');
  var contactResource = (0, _I18n2.default)('contactModel');
  var activityResource = (0, _I18n2.default)('activityModel');
  var historyResource = (0, _I18n2.default)('historyModel');

  var __class = (0, _declare2.default)('crm.Models.Ticket.Base', [_ModelBase3.default], {
    entityName: 'Ticket',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    iconClass: 'expense-report',
    resourceKind: 'tickets',
    security: 'Entities/Ticket/View',
    modelName: _Names2.default.TICKET,

    createPicklists: function createPicklists() {
      return this.picklists || (this.picklists = [{
        name: 'Source',
        property: 'ViaCode'
      }, {
        name: 'Ticket Status',
        property: 'StatusCode'
      }]);
    },
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = [{
        name: 'Account',
        displayName: accountResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'Account',
        parentPropertyType: 'object',
        relatedEntity: 'Account',
        relatedPropertyType: 'object'
      }, {
        name: 'Contact',
        displayName: contactResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'Contact',
        parentPropertyType: 'object',
        relatedEntity: 'Contact',
        relatedPropertyType: 'object'
      }, {
        name: 'History',
        displayName: historyResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'History',
        relatedProperty: 'TicketId',
        where: 'Type ne "atDatabaseChange"'
      }, {
        name: 'Activity',
        displayName: activityResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'Activity',
        relatedProperty: 'TicketId'
      }]);
      return rel;
    }

  });
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbHMvVGlja2V0L0Jhc2UuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJhY2NvdW50UmVzb3VyY2UiLCJjb250YWN0UmVzb3VyY2UiLCJhY3Rpdml0eVJlc291cmNlIiwiaGlzdG9yeVJlc291cmNlIiwiX19jbGFzcyIsImVudGl0eU5hbWUiLCJlbnRpdHlEaXNwbGF5TmFtZSIsImVudGl0eURpc3BsYXlOYW1lUGx1cmFsIiwiaWNvbkNsYXNzIiwicmVzb3VyY2VLaW5kIiwic2VjdXJpdHkiLCJtb2RlbE5hbWUiLCJUSUNLRVQiLCJjcmVhdGVQaWNrbGlzdHMiLCJwaWNrbGlzdHMiLCJuYW1lIiwicHJvcGVydHkiLCJjcmVhdGVSZWxhdGlvbnNoaXBzIiwicmVsIiwicmVsYXRpb25zaGlwcyIsImRpc3BsYXlOYW1lIiwidHlwZSIsInBhcmVudFByb3BlcnR5IiwicGFyZW50UHJvcGVydHlUeXBlIiwicmVsYXRlZEVudGl0eSIsInJlbGF0ZWRQcm9wZXJ0eVR5cGUiLCJyZWxhdGVkUHJvcGVydHkiLCJ3aGVyZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFvQkEsTUFBTUEsV0FBVyxvQkFBWSxhQUFaLENBQWpCO0FBQ0EsTUFBTUMsa0JBQWtCLG9CQUFZLGNBQVosQ0FBeEI7QUFDQSxNQUFNQyxrQkFBa0Isb0JBQVksY0FBWixDQUF4QjtBQUNBLE1BQU1DLG1CQUFtQixvQkFBWSxlQUFaLENBQXpCO0FBQ0EsTUFBTUMsa0JBQWtCLG9CQUFZLGNBQVosQ0FBeEI7O0FBRUEsTUFBTUMsVUFBVSx1QkFBUSx3QkFBUixFQUFrQyxxQkFBbEMsRUFBZ0Q7QUFDOURDLGdCQUFZLFFBRGtEO0FBRTlEQyx1QkFBbUJQLFNBQVNPLGlCQUZrQztBQUc5REMsNkJBQXlCUixTQUFTUSx1QkFINEI7QUFJOURDLGVBQVcsZ0JBSm1EO0FBSzlEQyxrQkFBYyxTQUxnRDtBQU05REMsY0FBVSxzQkFOb0Q7QUFPOURDLGVBQVcsZ0JBQVlDLE1BUHVDOztBQVM5REMscUJBQWlCLFNBQVNBLGVBQVQsR0FBMkI7QUFDMUMsYUFBTyxLQUFLQyxTQUFMLEtBQW1CLEtBQUtBLFNBQUwsR0FBaUIsQ0FBQztBQUMxQ0MsY0FBTSxRQURvQztBQUUxQ0Msa0JBQVU7QUFGZ0MsT0FBRCxFQUd4QztBQUNERCxjQUFNLGVBREw7QUFFREMsa0JBQVU7QUFGVCxPQUh3QyxDQUFwQyxDQUFQO0FBT0QsS0FqQjZEO0FBa0I5REMseUJBQXFCLFNBQVNBLG1CQUFULEdBQStCO0FBQ2xELFVBQU1DLE1BQU0sS0FBS0MsYUFBTCxLQUF1QixLQUFLQSxhQUFMLEdBQXFCLENBQUM7QUFDdkRKLGNBQU0sU0FEaUQ7QUFFdkRLLHFCQUFhcEIsZ0JBQWdCTSxpQkFGMEI7QUFHdkRlLGNBQU0sV0FIaUQ7QUFJdkRDLHdCQUFnQixTQUp1QztBQUt2REMsNEJBQW9CLFFBTG1DO0FBTXZEQyx1QkFBZSxTQU53QztBQU92REMsNkJBQXFCO0FBUGtDLE9BQUQsRUFRckQ7QUFDRFYsY0FBTSxTQURMO0FBRURLLHFCQUFhbkIsZ0JBQWdCSyxpQkFGNUI7QUFHRGUsY0FBTSxXQUhMO0FBSURDLHdCQUFnQixTQUpmO0FBS0RDLDRCQUFvQixRQUxuQjtBQU1EQyx1QkFBZSxTQU5kO0FBT0RDLDZCQUFxQjtBQVBwQixPQVJxRCxFQWdCckQ7QUFDRFYsY0FBTSxTQURMO0FBRURLLHFCQUFhakIsZ0JBQWdCSSx1QkFGNUI7QUFHRGMsY0FBTSxXQUhMO0FBSURHLHVCQUFlLFNBSmQ7QUFLREUseUJBQWlCLFVBTGhCO0FBTURDLGVBQU87QUFOTixPQWhCcUQsRUF1QnJEO0FBQ0RaLGNBQU0sVUFETDtBQUVESyxxQkFBYWxCLGlCQUFpQkssdUJBRjdCO0FBR0RjLGNBQU0sV0FITDtBQUlERyx1QkFBZSxVQUpkO0FBS0RFLHlCQUFpQjtBQUxoQixPQXZCcUQsQ0FBNUMsQ0FBWjtBQThCQSxhQUFPUixHQUFQO0FBQ0Q7O0FBbEQ2RCxHQUFoRCxDQUFoQjtvQkFxRGVkLE8iLCJmaWxlIjoiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBfTW9kZWxCYXNlIGZyb20gJ2FyZ29zL01vZGVscy9fTW9kZWxCYXNlJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uL05hbWVzJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgndGlja2V0TW9kZWwnKTtcclxuY29uc3QgYWNjb3VudFJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2FjY291bnRNb2RlbCcpO1xyXG5jb25zdCBjb250YWN0UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnY29udGFjdE1vZGVsJyk7XHJcbmNvbnN0IGFjdGl2aXR5UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYWN0aXZpdHlNb2RlbCcpO1xyXG5jb25zdCBoaXN0b3J5UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnaGlzdG9yeU1vZGVsJyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLk1vZGVscy5UaWNrZXQuQmFzZScsIFtfTW9kZWxCYXNlXSwge1xyXG4gIGVudGl0eU5hbWU6ICdUaWNrZXQnLFxyXG4gIGVudGl0eURpc3BsYXlOYW1lOiByZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZSxcclxuICBlbnRpdHlEaXNwbGF5TmFtZVBsdXJhbDogcmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgaWNvbkNsYXNzOiAnZXhwZW5zZS1yZXBvcnQnLFxyXG4gIHJlc291cmNlS2luZDogJ3RpY2tldHMnLFxyXG4gIHNlY3VyaXR5OiAnRW50aXRpZXMvVGlja2V0L1ZpZXcnLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuVElDS0VULFxyXG5cclxuICBjcmVhdGVQaWNrbGlzdHM6IGZ1bmN0aW9uIGNyZWF0ZVBpY2tsaXN0cygpIHtcclxuICAgIHJldHVybiB0aGlzLnBpY2tsaXN0cyB8fCAodGhpcy5waWNrbGlzdHMgPSBbe1xyXG4gICAgICBuYW1lOiAnU291cmNlJyxcclxuICAgICAgcHJvcGVydHk6ICdWaWFDb2RlJyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ1RpY2tldCBTdGF0dXMnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1N0YXR1c0NvZGUnLFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbiAgY3JlYXRlUmVsYXRpb25zaGlwczogZnVuY3Rpb24gY3JlYXRlUmVsYXRpb25zaGlwcygpIHtcclxuICAgIGNvbnN0IHJlbCA9IHRoaXMucmVsYXRpb25zaGlwcyB8fCAodGhpcy5yZWxhdGlvbnNoaXBzID0gW3tcclxuICAgICAgbmFtZTogJ0FjY291bnQnLFxyXG4gICAgICBkaXNwbGF5TmFtZTogYWNjb3VudFJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lLFxyXG4gICAgICB0eXBlOiAnTWFueVRvT25lJyxcclxuICAgICAgcGFyZW50UHJvcGVydHk6ICdBY2NvdW50JyxcclxuICAgICAgcGFyZW50UHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ0FjY291bnQnLFxyXG4gICAgICByZWxhdGVkUHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ0NvbnRhY3QnLFxyXG4gICAgICBkaXNwbGF5TmFtZTogY29udGFjdFJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lLFxyXG4gICAgICB0eXBlOiAnTWFueVRvT25lJyxcclxuICAgICAgcGFyZW50UHJvcGVydHk6ICdDb250YWN0JyxcclxuICAgICAgcGFyZW50UHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ0NvbnRhY3QnLFxyXG4gICAgICByZWxhdGVkUHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ0hpc3RvcnknLFxyXG4gICAgICBkaXNwbGF5TmFtZTogaGlzdG9yeVJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gICAgICB0eXBlOiAnT25lVG9NYW55JyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ0hpc3RvcnknLFxyXG4gICAgICByZWxhdGVkUHJvcGVydHk6ICdUaWNrZXRJZCcsXHJcbiAgICAgIHdoZXJlOiAnVHlwZSBuZSBcImF0RGF0YWJhc2VDaGFuZ2VcIicsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdBY3Rpdml0eScsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiBhY3Rpdml0eVJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gICAgICB0eXBlOiAnT25lVG9NYW55JyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ0FjdGl2aXR5JyxcclxuICAgICAgcmVsYXRlZFByb3BlcnR5OiAnVGlja2V0SWQnLFxyXG4gICAgfV0pO1xyXG4gICAgcmV0dXJuIHJlbDtcclxuICB9LFxyXG5cclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==