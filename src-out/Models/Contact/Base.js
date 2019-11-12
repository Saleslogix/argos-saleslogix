define('crm/Models/Contact/Base', ['module', 'exports', 'dojo/_base/declare', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _ModelBase2, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('contactModel');
  var accountResource = (0, _I18n2.default)('accountModel');
  var activityResource = (0, _I18n2.default)('activityModel');
  var historyResource = (0, _I18n2.default)('historyModel');
  var addressResource = (0, _I18n2.default)('addressModel');
  var ticketResource = (0, _I18n2.default)('ticketModel');

  var __class = (0, _declare2.default)('crm.Models.Contact.Base', [_ModelBase3.default], {
    resourceKind: 'contacts',
    entityName: 'Contact',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    modelName: _Names2.default.CONTACT,
    iconClass: 'user',
    security: 'Entities/Contact/View',
    createPicklists: function createPicklists() {
      return this.picklists || (this.picklists = [{
        name: 'Title',
        property: 'Title'
        // TODO: Add once Title is a code picklist
        // options: {
        //   filterByLanguage: true,
        // },
      }, {
        name: 'Name Prefix',
        options: {
          filterByLanguage: true,
          storageMode: 'text'
        }
      }, {
        name: 'Name Suffix',
        options: {
          filterByLanguage: true,
          storageMode: 'text'
        }
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
        name: 'Addresses',
        displayName: addressResource.entityDisplayNamePlural,
        propertyName: 'Addresses',
        type: 'OneToMany',
        relatedEntity: 'Address',
        relatedProperty: 'EntityId'
      }, {
        name: 'History',
        displayName: historyResource.entityDisplayNamePlural,
        propertyName: 'History',
        type: 'OneToMany',
        relatedEntity: 'History',
        relatedProperty: 'ContactId',
        where: 'Type ne "atDatabaseChange"'
      }, {
        name: 'Activity',
        displayName: activityResource.entityDisplayNamePlural,
        propertyName: 'Activity',
        type: 'OneToMany',
        relatedEntity: 'Activity',
        relatedProperty: 'ContactId'
      }, {
        name: 'Tickets',
        displayName: ticketResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'Ticket',
        relatedProperty: 'Contact',
        relatedPropertyType: 'object'
      }]);
      return rel;
    }
  });
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbHMvQ29udGFjdC9CYXNlLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiYWNjb3VudFJlc291cmNlIiwiYWN0aXZpdHlSZXNvdXJjZSIsImhpc3RvcnlSZXNvdXJjZSIsImFkZHJlc3NSZXNvdXJjZSIsInRpY2tldFJlc291cmNlIiwiX19jbGFzcyIsInJlc291cmNlS2luZCIsImVudGl0eU5hbWUiLCJlbnRpdHlEaXNwbGF5TmFtZSIsImVudGl0eURpc3BsYXlOYW1lUGx1cmFsIiwibW9kZWxOYW1lIiwiQ09OVEFDVCIsImljb25DbGFzcyIsInNlY3VyaXR5IiwiY3JlYXRlUGlja2xpc3RzIiwicGlja2xpc3RzIiwibmFtZSIsInByb3BlcnR5Iiwib3B0aW9ucyIsImZpbHRlckJ5TGFuZ3VhZ2UiLCJzdG9yYWdlTW9kZSIsImNyZWF0ZVJlbGF0aW9uc2hpcHMiLCJyZWwiLCJyZWxhdGlvbnNoaXBzIiwiZGlzcGxheU5hbWUiLCJ0eXBlIiwicGFyZW50UHJvcGVydHkiLCJwYXJlbnRQcm9wZXJ0eVR5cGUiLCJyZWxhdGVkRW50aXR5IiwicmVsYXRlZFByb3BlcnR5VHlwZSIsInByb3BlcnR5TmFtZSIsInJlbGF0ZWRQcm9wZXJ0eSIsIndoZXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQW9CQSxNQUFNQSxXQUFXLG9CQUFZLGNBQVosQ0FBakI7QUFDQSxNQUFNQyxrQkFBa0Isb0JBQVksY0FBWixDQUF4QjtBQUNBLE1BQU1DLG1CQUFtQixvQkFBWSxlQUFaLENBQXpCO0FBQ0EsTUFBTUMsa0JBQWtCLG9CQUFZLGNBQVosQ0FBeEI7QUFDQSxNQUFNQyxrQkFBa0Isb0JBQVksY0FBWixDQUF4QjtBQUNBLE1BQU1DLGlCQUFpQixvQkFBWSxhQUFaLENBQXZCOztBQUVBLE1BQU1DLFVBQVUsdUJBQVEseUJBQVIsRUFBbUMscUJBQW5DLEVBQWlEO0FBQy9EQyxrQkFBYyxVQURpRDtBQUUvREMsZ0JBQVksU0FGbUQ7QUFHL0RDLHVCQUFtQlQsU0FBU1MsaUJBSG1DO0FBSS9EQyw2QkFBeUJWLFNBQVNVLHVCQUo2QjtBQUsvREMsZUFBVyxnQkFBWUMsT0FMd0M7QUFNL0RDLGVBQVcsTUFOb0Q7QUFPL0RDLGNBQVUsdUJBUHFEO0FBUS9EQyxxQkFBaUIsU0FBU0EsZUFBVCxHQUEyQjtBQUMxQyxhQUFPLEtBQUtDLFNBQUwsS0FBbUIsS0FBS0EsU0FBTCxHQUFpQixDQUFDO0FBQzFDQyxjQUFNLE9BRG9DO0FBRTFDQyxrQkFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBTjBDLE9BQUQsRUFPeEM7QUFDREQsY0FBTSxhQURMO0FBRURFLGlCQUFTO0FBQ1BDLDRCQUFrQixJQURYO0FBRVBDLHVCQUFhO0FBRk47QUFGUixPQVB3QyxFQWF4QztBQUNESixjQUFNLGFBREw7QUFFREUsaUJBQVM7QUFDUEMsNEJBQWtCLElBRFg7QUFFUEMsdUJBQWE7QUFGTjtBQUZSLE9BYndDLENBQXBDLENBQVA7QUFvQkQsS0E3QjhEO0FBOEIvREMseUJBQXFCLFNBQVNBLG1CQUFULEdBQStCO0FBQ2xELFVBQU1DLE1BQU0sS0FBS0MsYUFBTCxLQUF1QixLQUFLQSxhQUFMLEdBQXFCLENBQUM7QUFDdkRQLGNBQU0sU0FEaUQ7QUFFdkRRLHFCQUFheEIsZ0JBQWdCUSxpQkFGMEI7QUFHdkRpQixjQUFNLFdBSGlEO0FBSXZEQyx3QkFBZ0IsU0FKdUM7QUFLdkRDLDRCQUFvQixRQUxtQztBQU12REMsdUJBQWUsU0FOd0M7QUFPdkRDLDZCQUFxQjtBQVBrQyxPQUFELEVBUXJEO0FBQ0RiLGNBQU0sV0FETDtBQUVEUSxxQkFBYXJCLGdCQUFnQk0sdUJBRjVCO0FBR0RxQixzQkFBYyxXQUhiO0FBSURMLGNBQU0sV0FKTDtBQUtERyx1QkFBZSxTQUxkO0FBTURHLHlCQUFpQjtBQU5oQixPQVJxRCxFQWVyRDtBQUNEZixjQUFNLFNBREw7QUFFRFEscUJBQWF0QixnQkFBZ0JPLHVCQUY1QjtBQUdEcUIsc0JBQWMsU0FIYjtBQUlETCxjQUFNLFdBSkw7QUFLREcsdUJBQWUsU0FMZDtBQU1ERyx5QkFBaUIsV0FOaEI7QUFPREMsZUFBTztBQVBOLE9BZnFELEVBdUJyRDtBQUNEaEIsY0FBTSxVQURMO0FBRURRLHFCQUFhdkIsaUJBQWlCUSx1QkFGN0I7QUFHRHFCLHNCQUFjLFVBSGI7QUFJREwsY0FBTSxXQUpMO0FBS0RHLHVCQUFlLFVBTGQ7QUFNREcseUJBQWlCO0FBTmhCLE9BdkJxRCxFQThCckQ7QUFDRGYsY0FBTSxTQURMO0FBRURRLHFCQUFhcEIsZUFBZUssdUJBRjNCO0FBR0RnQixjQUFNLFdBSEw7QUFJREcsdUJBQWUsUUFKZDtBQUtERyx5QkFBaUIsU0FMaEI7QUFNREYsNkJBQXFCO0FBTnBCLE9BOUJxRCxDQUE1QyxDQUFaO0FBc0NBLGFBQU9QLEdBQVA7QUFDRDtBQXRFOEQsR0FBakQsQ0FBaEI7b0JBd0VlakIsTyIsImZpbGUiOiJCYXNlLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IF9Nb2RlbEJhc2UgZnJvbSAnYXJnb3MvTW9kZWxzL19Nb2RlbEJhc2UnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vTmFtZXMnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdjb250YWN0TW9kZWwnKTtcclxuY29uc3QgYWNjb3VudFJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2FjY291bnRNb2RlbCcpO1xyXG5jb25zdCBhY3Rpdml0eVJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2FjdGl2aXR5TW9kZWwnKTtcclxuY29uc3QgaGlzdG9yeVJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2hpc3RvcnlNb2RlbCcpO1xyXG5jb25zdCBhZGRyZXNzUmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYWRkcmVzc01vZGVsJyk7XHJcbmNvbnN0IHRpY2tldFJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3RpY2tldE1vZGVsJyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLk1vZGVscy5Db250YWN0LkJhc2UnLCBbX01vZGVsQmFzZV0sIHtcclxuICByZXNvdXJjZUtpbmQ6ICdjb250YWN0cycsXHJcbiAgZW50aXR5TmFtZTogJ0NvbnRhY3QnLFxyXG4gIGVudGl0eURpc3BsYXlOYW1lOiByZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZSxcclxuICBlbnRpdHlEaXNwbGF5TmFtZVBsdXJhbDogcmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5DT05UQUNULFxyXG4gIGljb25DbGFzczogJ3VzZXInLFxyXG4gIHNlY3VyaXR5OiAnRW50aXRpZXMvQ29udGFjdC9WaWV3JyxcclxuICBjcmVhdGVQaWNrbGlzdHM6IGZ1bmN0aW9uIGNyZWF0ZVBpY2tsaXN0cygpIHtcclxuICAgIHJldHVybiB0aGlzLnBpY2tsaXN0cyB8fCAodGhpcy5waWNrbGlzdHMgPSBbe1xyXG4gICAgICBuYW1lOiAnVGl0bGUnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1RpdGxlJyxcclxuICAgICAgLy8gVE9ETzogQWRkIG9uY2UgVGl0bGUgaXMgYSBjb2RlIHBpY2tsaXN0XHJcbiAgICAgIC8vIG9wdGlvbnM6IHtcclxuICAgICAgLy8gICBmaWx0ZXJCeUxhbmd1YWdlOiB0cnVlLFxyXG4gICAgICAvLyB9LFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnTmFtZSBQcmVmaXgnLFxyXG4gICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgZmlsdGVyQnlMYW5ndWFnZTogdHJ1ZSxcclxuICAgICAgICBzdG9yYWdlTW9kZTogJ3RleHQnLFxyXG4gICAgICB9LFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnTmFtZSBTdWZmaXgnLFxyXG4gICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgZmlsdGVyQnlMYW5ndWFnZTogdHJ1ZSxcclxuICAgICAgICBzdG9yYWdlTW9kZTogJ3RleHQnLFxyXG4gICAgICB9LFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbiAgY3JlYXRlUmVsYXRpb25zaGlwczogZnVuY3Rpb24gY3JlYXRlUmVsYXRpb25zaGlwcygpIHtcclxuICAgIGNvbnN0IHJlbCA9IHRoaXMucmVsYXRpb25zaGlwcyB8fCAodGhpcy5yZWxhdGlvbnNoaXBzID0gW3tcclxuICAgICAgbmFtZTogJ0FjY291bnQnLFxyXG4gICAgICBkaXNwbGF5TmFtZTogYWNjb3VudFJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lLFxyXG4gICAgICB0eXBlOiAnTWFueVRvT25lJyxcclxuICAgICAgcGFyZW50UHJvcGVydHk6ICdBY2NvdW50JyxcclxuICAgICAgcGFyZW50UHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ0FjY291bnQnLFxyXG4gICAgICByZWxhdGVkUHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ0FkZHJlc3NlcycsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiBhZGRyZXNzUmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgICAgIHByb3BlcnR5TmFtZTogJ0FkZHJlc3NlcycsXHJcbiAgICAgIHR5cGU6ICdPbmVUb01hbnknLFxyXG4gICAgICByZWxhdGVkRW50aXR5OiAnQWRkcmVzcycsXHJcbiAgICAgIHJlbGF0ZWRQcm9wZXJ0eTogJ0VudGl0eUlkJyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ0hpc3RvcnknLFxyXG4gICAgICBkaXNwbGF5TmFtZTogaGlzdG9yeVJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gICAgICBwcm9wZXJ0eU5hbWU6ICdIaXN0b3J5JyxcclxuICAgICAgdHlwZTogJ09uZVRvTWFueScsXHJcbiAgICAgIHJlbGF0ZWRFbnRpdHk6ICdIaXN0b3J5JyxcclxuICAgICAgcmVsYXRlZFByb3BlcnR5OiAnQ29udGFjdElkJyxcclxuICAgICAgd2hlcmU6ICdUeXBlIG5lIFwiYXREYXRhYmFzZUNoYW5nZVwiJyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ0FjdGl2aXR5JyxcclxuICAgICAgZGlzcGxheU5hbWU6IGFjdGl2aXR5UmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgICAgIHByb3BlcnR5TmFtZTogJ0FjdGl2aXR5JyxcclxuICAgICAgdHlwZTogJ09uZVRvTWFueScsXHJcbiAgICAgIHJlbGF0ZWRFbnRpdHk6ICdBY3Rpdml0eScsXHJcbiAgICAgIHJlbGF0ZWRQcm9wZXJ0eTogJ0NvbnRhY3RJZCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdUaWNrZXRzJyxcclxuICAgICAgZGlzcGxheU5hbWU6IHRpY2tldFJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gICAgICB0eXBlOiAnT25lVG9NYW55JyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ1RpY2tldCcsXHJcbiAgICAgIHJlbGF0ZWRQcm9wZXJ0eTogJ0NvbnRhY3QnLFxyXG4gICAgICByZWxhdGVkUHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgIH1dKTtcclxuICAgIHJldHVybiByZWw7XHJcbiAgfSxcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==