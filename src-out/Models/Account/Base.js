define('crm/Models/Account/Base', ['module', 'exports', 'dojo/_base/declare', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _ModelBase2, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('accountModel');
  var contactResource = (0, _I18n2.default)('contactModel');
  var activityResource = (0, _I18n2.default)('activityModel');
  var historyResource = (0, _I18n2.default)('historyModel');
  var oppResource = (0, _I18n2.default)('opportunityModel');
  var addressResource = (0, _I18n2.default)('addressModel');
  var ticketResource = (0, _I18n2.default)('ticketModel');

  var __class = (0, _declare2.default)('crm.Models.Account.Base', [_ModelBase3.default], {
    resourceKind: 'accounts',
    entityName: 'Account',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    modelName: _Names2.default.ACCOUNT,
    iconClass: 'spreadsheet',
    detailViewId: 'account_detail',
    listViewId: 'account_list',
    editViewId: 'account_edit',
    createPicklists: function createPicklists() {
      return this.picklists || (this.picklists = [{
        name: 'Account Type',
        property: 'Type'
      }, {
        name: 'Account Status',
        property: 'Status'
      }, {
        name: 'Industry',
        property: 'Industry'
      }]);
    },
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = [{
        name: 'Addresses',
        displayName: addressResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'Address',
        relatedProperty: 'EntityId'
      }, {
        name: 'Contacts',
        displayName: contactResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'Contact',
        relatedProperty: 'Account',
        relatedPropertyType: 'object'
      }, {
        name: 'History',
        displayName: historyResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'History',
        relatedProperty: 'AccountId',
        where: 'Type ne "atDatabaseChange"'
      }, {
        name: 'Activities',
        displayName: activityResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'Activity',
        relatedProperty: 'AccountId'
      }, {
        name: 'Opportunities',
        displayName: oppResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'Opportunity',
        relatedProperty: 'Account',
        relatedPropertyType: 'object'
      }, {
        name: 'Tickets',
        displayName: ticketResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'Ticket',
        relatedProperty: 'Account',
        relatedPropertyType: 'object'
      }]);
      return rel;
    }
  });
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbHMvQWNjb3VudC9CYXNlLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiY29udGFjdFJlc291cmNlIiwiYWN0aXZpdHlSZXNvdXJjZSIsImhpc3RvcnlSZXNvdXJjZSIsIm9wcFJlc291cmNlIiwiYWRkcmVzc1Jlc291cmNlIiwidGlja2V0UmVzb3VyY2UiLCJfX2NsYXNzIiwicmVzb3VyY2VLaW5kIiwiZW50aXR5TmFtZSIsImVudGl0eURpc3BsYXlOYW1lIiwiZW50aXR5RGlzcGxheU5hbWVQbHVyYWwiLCJtb2RlbE5hbWUiLCJBQ0NPVU5UIiwiaWNvbkNsYXNzIiwiZGV0YWlsVmlld0lkIiwibGlzdFZpZXdJZCIsImVkaXRWaWV3SWQiLCJjcmVhdGVQaWNrbGlzdHMiLCJwaWNrbGlzdHMiLCJuYW1lIiwicHJvcGVydHkiLCJjcmVhdGVSZWxhdGlvbnNoaXBzIiwicmVsIiwicmVsYXRpb25zaGlwcyIsImRpc3BsYXlOYW1lIiwidHlwZSIsInJlbGF0ZWRFbnRpdHkiLCJyZWxhdGVkUHJvcGVydHkiLCJyZWxhdGVkUHJvcGVydHlUeXBlIiwid2hlcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBLE1BQU1BLFdBQVcsb0JBQVksY0FBWixDQUFqQjtBQUNBLE1BQU1DLGtCQUFrQixvQkFBWSxjQUFaLENBQXhCO0FBQ0EsTUFBTUMsbUJBQW1CLG9CQUFZLGVBQVosQ0FBekI7QUFDQSxNQUFNQyxrQkFBa0Isb0JBQVksY0FBWixDQUF4QjtBQUNBLE1BQU1DLGNBQWMsb0JBQVksa0JBQVosQ0FBcEI7QUFDQSxNQUFNQyxrQkFBa0Isb0JBQVksY0FBWixDQUF4QjtBQUNBLE1BQU1DLGlCQUFpQixvQkFBWSxhQUFaLENBQXZCOztBQUVBLE1BQU1DLFVBQVUsdUJBQVEseUJBQVIsRUFBbUMscUJBQW5DLEVBQWlEO0FBQy9EQyxrQkFBYyxVQURpRDtBQUUvREMsZ0JBQVksU0FGbUQ7QUFHL0RDLHVCQUFtQlYsU0FBU1UsaUJBSG1DO0FBSS9EQyw2QkFBeUJYLFNBQVNXLHVCQUo2QjtBQUsvREMsZUFBVyxnQkFBWUMsT0FMd0M7QUFNL0RDLGVBQVcsYUFOb0Q7QUFPL0RDLGtCQUFjLGdCQVBpRDtBQVEvREMsZ0JBQVksY0FSbUQ7QUFTL0RDLGdCQUFZLGNBVG1EO0FBVS9EQyxxQkFBaUIsU0FBU0EsZUFBVCxHQUEyQjtBQUMxQyxhQUFPLEtBQUtDLFNBQUwsS0FBbUIsS0FBS0EsU0FBTCxHQUFpQixDQUFDO0FBQzFDQyxjQUFNLGNBRG9DO0FBRTFDQyxrQkFBVTtBQUZnQyxPQUFELEVBR3hDO0FBQ0RELGNBQU0sZ0JBREw7QUFFREMsa0JBQVU7QUFGVCxPQUh3QyxFQU14QztBQUNERCxjQUFNLFVBREw7QUFFREMsa0JBQVU7QUFGVCxPQU53QyxDQUFwQyxDQUFQO0FBVUQsS0FyQjhEO0FBc0IvREMseUJBQXFCLFNBQVNBLG1CQUFULEdBQStCO0FBQ2xELFVBQU1DLE1BQU0sS0FBS0MsYUFBTCxLQUF1QixLQUFLQSxhQUFMLEdBQXFCLENBQUM7QUFDdkRKLGNBQU0sV0FEaUQ7QUFFdkRLLHFCQUFhcEIsZ0JBQWdCTSx1QkFGMEI7QUFHdkRlLGNBQU0sV0FIaUQ7QUFJdkRDLHVCQUFlLFNBSndDO0FBS3ZEQyx5QkFBaUI7QUFMc0MsT0FBRCxFQU1yRDtBQUNEUixjQUFNLFVBREw7QUFFREsscUJBQWF4QixnQkFBZ0JVLHVCQUY1QjtBQUdEZSxjQUFNLFdBSEw7QUFJREMsdUJBQWUsU0FKZDtBQUtEQyx5QkFBaUIsU0FMaEI7QUFNREMsNkJBQXFCO0FBTnBCLE9BTnFELEVBYXJEO0FBQ0RULGNBQU0sU0FETDtBQUVESyxxQkFBYXRCLGdCQUFnQlEsdUJBRjVCO0FBR0RlLGNBQU0sV0FITDtBQUlEQyx1QkFBZSxTQUpkO0FBS0RDLHlCQUFpQixXQUxoQjtBQU1ERSxlQUFPO0FBTk4sT0FicUQsRUFvQnJEO0FBQ0RWLGNBQU0sWUFETDtBQUVESyxxQkFBYXZCLGlCQUFpQlMsdUJBRjdCO0FBR0RlLGNBQU0sV0FITDtBQUlEQyx1QkFBZSxVQUpkO0FBS0RDLHlCQUFpQjtBQUxoQixPQXBCcUQsRUEwQnJEO0FBQ0RSLGNBQU0sZUFETDtBQUVESyxxQkFBYXJCLFlBQVlPLHVCQUZ4QjtBQUdEZSxjQUFNLFdBSEw7QUFJREMsdUJBQWUsYUFKZDtBQUtEQyx5QkFBaUIsU0FMaEI7QUFNREMsNkJBQXFCO0FBTnBCLE9BMUJxRCxFQWlDckQ7QUFDRFQsY0FBTSxTQURMO0FBRURLLHFCQUFhbkIsZUFBZUssdUJBRjNCO0FBR0RlLGNBQU0sV0FITDtBQUlEQyx1QkFBZSxRQUpkO0FBS0RDLHlCQUFpQixTQUxoQjtBQU1EQyw2QkFBcUI7QUFOcEIsT0FqQ3FELENBQTVDLENBQVo7QUF5Q0EsYUFBT04sR0FBUDtBQUNEO0FBakU4RCxHQUFqRCxDQUFoQjtvQkFtRWVoQixPIiwiZmlsZSI6IkJhc2UuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgX01vZGVsQmFzZSBmcm9tICdhcmdvcy9Nb2RlbHMvX01vZGVsQmFzZSc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi9OYW1lcyc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2FjY291bnRNb2RlbCcpO1xyXG5jb25zdCBjb250YWN0UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnY29udGFjdE1vZGVsJyk7XHJcbmNvbnN0IGFjdGl2aXR5UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYWN0aXZpdHlNb2RlbCcpO1xyXG5jb25zdCBoaXN0b3J5UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnaGlzdG9yeU1vZGVsJyk7XHJcbmNvbnN0IG9wcFJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ29wcG9ydHVuaXR5TW9kZWwnKTtcclxuY29uc3QgYWRkcmVzc1Jlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2FkZHJlc3NNb2RlbCcpO1xyXG5jb25zdCB0aWNrZXRSZXNvdXJjZSA9IGdldFJlc291cmNlKCd0aWNrZXRNb2RlbCcpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5Nb2RlbHMuQWNjb3VudC5CYXNlJywgW19Nb2RlbEJhc2VdLCB7XHJcbiAgcmVzb3VyY2VLaW5kOiAnYWNjb3VudHMnLFxyXG4gIGVudGl0eU5hbWU6ICdBY2NvdW50JyxcclxuICBlbnRpdHlEaXNwbGF5TmFtZTogcmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWUsXHJcbiAgZW50aXR5RGlzcGxheU5hbWVQbHVyYWw6IHJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuQUNDT1VOVCxcclxuICBpY29uQ2xhc3M6ICdzcHJlYWRzaGVldCcsXHJcbiAgZGV0YWlsVmlld0lkOiAnYWNjb3VudF9kZXRhaWwnLFxyXG4gIGxpc3RWaWV3SWQ6ICdhY2NvdW50X2xpc3QnLFxyXG4gIGVkaXRWaWV3SWQ6ICdhY2NvdW50X2VkaXQnLFxyXG4gIGNyZWF0ZVBpY2tsaXN0czogZnVuY3Rpb24gY3JlYXRlUGlja2xpc3RzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucGlja2xpc3RzIHx8ICh0aGlzLnBpY2tsaXN0cyA9IFt7XHJcbiAgICAgIG5hbWU6ICdBY2NvdW50IFR5cGUnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1R5cGUnLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnQWNjb3VudCBTdGF0dXMnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1N0YXR1cycsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdJbmR1c3RyeScsXHJcbiAgICAgIHByb3BlcnR5OiAnSW5kdXN0cnknLFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbiAgY3JlYXRlUmVsYXRpb25zaGlwczogZnVuY3Rpb24gY3JlYXRlUmVsYXRpb25zaGlwcygpIHtcclxuICAgIGNvbnN0IHJlbCA9IHRoaXMucmVsYXRpb25zaGlwcyB8fCAodGhpcy5yZWxhdGlvbnNoaXBzID0gW3tcclxuICAgICAgbmFtZTogJ0FkZHJlc3NlcycsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiBhZGRyZXNzUmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgICAgIHR5cGU6ICdPbmVUb01hbnknLFxyXG4gICAgICByZWxhdGVkRW50aXR5OiAnQWRkcmVzcycsXHJcbiAgICAgIHJlbGF0ZWRQcm9wZXJ0eTogJ0VudGl0eUlkJyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ0NvbnRhY3RzJyxcclxuICAgICAgZGlzcGxheU5hbWU6IGNvbnRhY3RSZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICAgICAgdHlwZTogJ09uZVRvTWFueScsXHJcbiAgICAgIHJlbGF0ZWRFbnRpdHk6ICdDb250YWN0JyxcclxuICAgICAgcmVsYXRlZFByb3BlcnR5OiAnQWNjb3VudCcsXHJcbiAgICAgIHJlbGF0ZWRQcm9wZXJ0eVR5cGU6ICdvYmplY3QnLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnSGlzdG9yeScsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiBoaXN0b3J5UmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgICAgIHR5cGU6ICdPbmVUb01hbnknLFxyXG4gICAgICByZWxhdGVkRW50aXR5OiAnSGlzdG9yeScsXHJcbiAgICAgIHJlbGF0ZWRQcm9wZXJ0eTogJ0FjY291bnRJZCcsXHJcbiAgICAgIHdoZXJlOiAnVHlwZSBuZSBcImF0RGF0YWJhc2VDaGFuZ2VcIicsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdBY3Rpdml0aWVzJyxcclxuICAgICAgZGlzcGxheU5hbWU6IGFjdGl2aXR5UmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgICAgIHR5cGU6ICdPbmVUb01hbnknLFxyXG4gICAgICByZWxhdGVkRW50aXR5OiAnQWN0aXZpdHknLFxyXG4gICAgICByZWxhdGVkUHJvcGVydHk6ICdBY2NvdW50SWQnLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnT3Bwb3J0dW5pdGllcycsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiBvcHBSZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICAgICAgdHlwZTogJ09uZVRvTWFueScsXHJcbiAgICAgIHJlbGF0ZWRFbnRpdHk6ICdPcHBvcnR1bml0eScsXHJcbiAgICAgIHJlbGF0ZWRQcm9wZXJ0eTogJ0FjY291bnQnLFxyXG4gICAgICByZWxhdGVkUHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ1RpY2tldHMnLFxyXG4gICAgICBkaXNwbGF5TmFtZTogdGlja2V0UmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgICAgIHR5cGU6ICdPbmVUb01hbnknLFxyXG4gICAgICByZWxhdGVkRW50aXR5OiAnVGlja2V0JyxcclxuICAgICAgcmVsYXRlZFByb3BlcnR5OiAnQWNjb3VudCcsXHJcbiAgICAgIHJlbGF0ZWRQcm9wZXJ0eVR5cGU6ICdvYmplY3QnLFxyXG4gICAgfV0pO1xyXG4gICAgcmV0dXJuIHJlbDtcclxuICB9LFxyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19