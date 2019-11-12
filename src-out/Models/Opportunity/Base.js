define('crm/Models/Opportunity/Base', ['module', 'exports', 'dojo/_base/declare', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _ModelBase2, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('opportunityModel');
  var accountResource = (0, _I18n2.default)('accountModel');
  var activityResource = (0, _I18n2.default)('activityModel');
  var historyResource = (0, _I18n2.default)('historyModel');

  var __class = (0, _declare2.default)('crm.Models.Opportunity.Base', [_ModelBase3.default], {
    entityName: 'Opportunity',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    iconClass: 'finance',
    resourceKind: 'opportunities',
    modelName: _Names2.default.OPPORTUNITY,
    security: 'Entities/Opportunity/View',

    createPicklists: function createPicklists() {
      return this.picklists || (this.picklists = [{
        name: 'Opportunity Type',
        property: 'Type'
      }, {
        name: 'Opportunity Status',
        property: 'Status'
      }, {
        name: 'Opportunity Probability',
        property: 'CloseProbability'
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
        name: 'Reseller',
        displayName: resource.resellerText,
        type: 'ManyToOne',
        parentProperty: 'Reseller',
        parentPropertyType: 'object',
        relatedEntity: 'Account',
        relatedPropertyType: 'object'
      }, {
        name: 'History',
        displayName: historyResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'History',
        relatedProperty: 'OpportunityId',
        where: 'Type ne "atDatabaseChange"'
      }, {
        name: 'Activity',
        displayName: activityResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'Activity',
        relatedProperty: 'OpportunityId'
      }]);
      return rel;
    }
  });
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbHMvT3Bwb3J0dW5pdHkvQmFzZS5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsImFjY291bnRSZXNvdXJjZSIsImFjdGl2aXR5UmVzb3VyY2UiLCJoaXN0b3J5UmVzb3VyY2UiLCJfX2NsYXNzIiwiZW50aXR5TmFtZSIsImVudGl0eURpc3BsYXlOYW1lIiwiZW50aXR5RGlzcGxheU5hbWVQbHVyYWwiLCJpY29uQ2xhc3MiLCJyZXNvdXJjZUtpbmQiLCJtb2RlbE5hbWUiLCJPUFBPUlRVTklUWSIsInNlY3VyaXR5IiwiY3JlYXRlUGlja2xpc3RzIiwicGlja2xpc3RzIiwibmFtZSIsInByb3BlcnR5IiwiY3JlYXRlUmVsYXRpb25zaGlwcyIsInJlbCIsInJlbGF0aW9uc2hpcHMiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJwYXJlbnRQcm9wZXJ0eSIsInBhcmVudFByb3BlcnR5VHlwZSIsInJlbGF0ZWRFbnRpdHkiLCJyZWxhdGVkUHJvcGVydHlUeXBlIiwicmVzZWxsZXJUZXh0IiwicmVsYXRlZFByb3BlcnR5Iiwid2hlcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBLE1BQU1BLFdBQVcsb0JBQVksa0JBQVosQ0FBakI7QUFDQSxNQUFNQyxrQkFBa0Isb0JBQVksY0FBWixDQUF4QjtBQUNBLE1BQU1DLG1CQUFtQixvQkFBWSxlQUFaLENBQXpCO0FBQ0EsTUFBTUMsa0JBQWtCLG9CQUFZLGNBQVosQ0FBeEI7O0FBRUEsTUFBTUMsVUFBVSx1QkFBUSw2QkFBUixFQUF1QyxxQkFBdkMsRUFBcUQ7QUFDbkVDLGdCQUFZLGFBRHVEO0FBRW5FQyx1QkFBbUJOLFNBQVNNLGlCQUZ1QztBQUduRUMsNkJBQXlCUCxTQUFTTyx1QkFIaUM7QUFJbkVDLGVBQVcsU0FKd0Q7QUFLbkVDLGtCQUFjLGVBTHFEO0FBTW5FQyxlQUFXLGdCQUFZQyxXQU40QztBQU9uRUMsY0FBVSwyQkFQeUQ7O0FBU25FQyxxQkFBaUIsU0FBU0EsZUFBVCxHQUEyQjtBQUMxQyxhQUFPLEtBQUtDLFNBQUwsS0FBbUIsS0FBS0EsU0FBTCxHQUFpQixDQUFDO0FBQzFDQyxjQUFNLGtCQURvQztBQUUxQ0Msa0JBQVU7QUFGZ0MsT0FBRCxFQUd4QztBQUNERCxjQUFNLG9CQURMO0FBRURDLGtCQUFVO0FBRlQsT0FId0MsRUFNeEM7QUFDREQsY0FBTSx5QkFETDtBQUVEQyxrQkFBVTtBQUZULE9BTndDLENBQXBDLENBQVA7QUFVRCxLQXBCa0U7QUFxQm5FQyx5QkFBcUIsU0FBU0EsbUJBQVQsR0FBK0I7QUFDbEQsVUFBTUMsTUFBTSxLQUFLQyxhQUFMLEtBQXVCLEtBQUtBLGFBQUwsR0FBcUIsQ0FBQztBQUN2REosY0FBTSxTQURpRDtBQUV2REsscUJBQWFuQixnQkFBZ0JLLGlCQUYwQjtBQUd2RGUsY0FBTSxXQUhpRDtBQUl2REMsd0JBQWdCLFNBSnVDO0FBS3ZEQyw0QkFBb0IsUUFMbUM7QUFNdkRDLHVCQUFlLFNBTndDO0FBT3ZEQyw2QkFBcUI7QUFQa0MsT0FBRCxFQVFyRDtBQUNEVixjQUFNLFVBREw7QUFFREsscUJBQWFwQixTQUFTMEIsWUFGckI7QUFHREwsY0FBTSxXQUhMO0FBSURDLHdCQUFnQixVQUpmO0FBS0RDLDRCQUFvQixRQUxuQjtBQU1EQyx1QkFBZSxTQU5kO0FBT0RDLDZCQUFxQjtBQVBwQixPQVJxRCxFQWdCckQ7QUFDRFYsY0FBTSxTQURMO0FBRURLLHFCQUFhakIsZ0JBQWdCSSx1QkFGNUI7QUFHRGMsY0FBTSxXQUhMO0FBSURHLHVCQUFlLFNBSmQ7QUFLREcseUJBQWlCLGVBTGhCO0FBTURDLGVBQU87QUFOTixPQWhCcUQsRUF1QnJEO0FBQ0RiLGNBQU0sVUFETDtBQUVESyxxQkFBYWxCLGlCQUFpQkssdUJBRjdCO0FBR0RjLGNBQU0sV0FITDtBQUlERyx1QkFBZSxVQUpkO0FBS0RHLHlCQUFpQjtBQUxoQixPQXZCcUQsQ0FBNUMsQ0FBWjtBQThCQSxhQUFPVCxHQUFQO0FBQ0Q7QUFyRGtFLEdBQXJELENBQWhCO29CQXVEZWQsTyIsImZpbGUiOiJCYXNlLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IF9Nb2RlbEJhc2UgZnJvbSAnYXJnb3MvTW9kZWxzL19Nb2RlbEJhc2UnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vTmFtZXMnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdvcHBvcnR1bml0eU1vZGVsJyk7XHJcbmNvbnN0IGFjY291bnRSZXNvdXJjZSA9IGdldFJlc291cmNlKCdhY2NvdW50TW9kZWwnKTtcclxuY29uc3QgYWN0aXZpdHlSZXNvdXJjZSA9IGdldFJlc291cmNlKCdhY3Rpdml0eU1vZGVsJyk7XHJcbmNvbnN0IGhpc3RvcnlSZXNvdXJjZSA9IGdldFJlc291cmNlKCdoaXN0b3J5TW9kZWwnKTtcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uTW9kZWxzLk9wcG9ydHVuaXR5LkJhc2UnLCBbX01vZGVsQmFzZV0sIHtcclxuICBlbnRpdHlOYW1lOiAnT3Bwb3J0dW5pdHknLFxyXG4gIGVudGl0eURpc3BsYXlOYW1lOiByZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZSxcclxuICBlbnRpdHlEaXNwbGF5TmFtZVBsdXJhbDogcmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgaWNvbkNsYXNzOiAnZmluYW5jZScsXHJcbiAgcmVzb3VyY2VLaW5kOiAnb3Bwb3J0dW5pdGllcycsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5PUFBPUlRVTklUWSxcclxuICBzZWN1cml0eTogJ0VudGl0aWVzL09wcG9ydHVuaXR5L1ZpZXcnLFxyXG5cclxuICBjcmVhdGVQaWNrbGlzdHM6IGZ1bmN0aW9uIGNyZWF0ZVBpY2tsaXN0cygpIHtcclxuICAgIHJldHVybiB0aGlzLnBpY2tsaXN0cyB8fCAodGhpcy5waWNrbGlzdHMgPSBbe1xyXG4gICAgICBuYW1lOiAnT3Bwb3J0dW5pdHkgVHlwZScsXHJcbiAgICAgIHByb3BlcnR5OiAnVHlwZScsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdPcHBvcnR1bml0eSBTdGF0dXMnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1N0YXR1cycsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdPcHBvcnR1bml0eSBQcm9iYWJpbGl0eScsXHJcbiAgICAgIHByb3BlcnR5OiAnQ2xvc2VQcm9iYWJpbGl0eScsXHJcbiAgICB9XSk7XHJcbiAgfSxcclxuICBjcmVhdGVSZWxhdGlvbnNoaXBzOiBmdW5jdGlvbiBjcmVhdGVSZWxhdGlvbnNoaXBzKCkge1xyXG4gICAgY29uc3QgcmVsID0gdGhpcy5yZWxhdGlvbnNoaXBzIHx8ICh0aGlzLnJlbGF0aW9uc2hpcHMgPSBbe1xyXG4gICAgICBuYW1lOiAnQWNjb3VudCcsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiBhY2NvdW50UmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWUsXHJcbiAgICAgIHR5cGU6ICdNYW55VG9PbmUnLFxyXG4gICAgICBwYXJlbnRQcm9wZXJ0eTogJ0FjY291bnQnLFxyXG4gICAgICBwYXJlbnRQcm9wZXJ0eVR5cGU6ICdvYmplY3QnLFxyXG4gICAgICByZWxhdGVkRW50aXR5OiAnQWNjb3VudCcsXHJcbiAgICAgIHJlbGF0ZWRQcm9wZXJ0eVR5cGU6ICdvYmplY3QnLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnUmVzZWxsZXInLFxyXG4gICAgICBkaXNwbGF5TmFtZTogcmVzb3VyY2UucmVzZWxsZXJUZXh0LFxyXG4gICAgICB0eXBlOiAnTWFueVRvT25lJyxcclxuICAgICAgcGFyZW50UHJvcGVydHk6ICdSZXNlbGxlcicsXHJcbiAgICAgIHBhcmVudFByb3BlcnR5VHlwZTogJ29iamVjdCcsXHJcbiAgICAgIHJlbGF0ZWRFbnRpdHk6ICdBY2NvdW50JyxcclxuICAgICAgcmVsYXRlZFByb3BlcnR5VHlwZTogJ29iamVjdCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdIaXN0b3J5JyxcclxuICAgICAgZGlzcGxheU5hbWU6IGhpc3RvcnlSZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICAgICAgdHlwZTogJ09uZVRvTWFueScsXHJcbiAgICAgIHJlbGF0ZWRFbnRpdHk6ICdIaXN0b3J5JyxcclxuICAgICAgcmVsYXRlZFByb3BlcnR5OiAnT3Bwb3J0dW5pdHlJZCcsXHJcbiAgICAgIHdoZXJlOiAnVHlwZSBuZSBcImF0RGF0YWJhc2VDaGFuZ2VcIicsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdBY3Rpdml0eScsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiBhY3Rpdml0eVJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gICAgICB0eXBlOiAnT25lVG9NYW55JyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ0FjdGl2aXR5JyxcclxuICAgICAgcmVsYXRlZFByb3BlcnR5OiAnT3Bwb3J0dW5pdHlJZCcsXHJcbiAgICB9XSk7XHJcbiAgICByZXR1cm4gcmVsO1xyXG4gIH0sXHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=