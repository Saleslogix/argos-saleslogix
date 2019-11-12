define('crm/Models/Lead/Base', ['module', 'exports', 'dojo/_base/declare', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _ModelBase2, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('leadModel');
  var activityResource = (0, _I18n2.default)('activityModel');
  var historyResource = (0, _I18n2.default)('historyModel');
  var addressResource = (0, _I18n2.default)('addressModel');

  var __class = (0, _declare2.default)('crm.Models.Lead.Base', [_ModelBase3.default], {
    resourceKind: 'leads',
    entityName: 'Lead',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    iconClass: 'filter',
    security: 'Entities/Lead/View',
    modelName: _Names2.default.LEAD,
    createPicklists: function createPicklists() {
      return this.picklists || (this.picklists = [{
        name: 'Title',
        property: 'Title'
        // TODO: Add once Title is a code picklist
        // options: {
        //   filterByLanguage: false,
        //   language: ' ',
        // },
      }, {
        name: 'Industry',
        property: 'Industry'
      }, {
        name: 'Name Prefix',
        options: {
          filterByLanguage: false,
          language: ' ',
          storageMode: 'text'
        }
      }, {
        name: 'Name Suffix',
        options: {
          filterByLanguage: false,
          language: ' ',
          storageMode: 'text'
        }
      }]);
    },
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = [{
        name: 'Addresses',
        displayName: addressResource.entityDisplayNamePlural,
        propertyName: 'Addresses',
        type: 'OneToMany',
        relatedEntity: 'LeadAddress',
        relatedProperty: 'LeadId'
      }, {
        name: 'History',
        displayName: historyResource.entityDisplayNamePlural,
        propertyName: 'History',
        type: 'OneToMany',
        relatedEntity: 'History',
        relatedProperty: 'LeadId',
        where: 'Type ne "atDatabaseChange"'
      }, {
        name: 'Activity',
        displayName: activityResource.entityDisplayNamePlural,
        propertyName: 'Activity',
        type: 'OneToMany',
        relatedEntity: 'Activity',
        relatedProperty: 'LeadId'
      }]);
      return rel;
    }
  });
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbHMvTGVhZC9CYXNlLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiYWN0aXZpdHlSZXNvdXJjZSIsImhpc3RvcnlSZXNvdXJjZSIsImFkZHJlc3NSZXNvdXJjZSIsIl9fY2xhc3MiLCJyZXNvdXJjZUtpbmQiLCJlbnRpdHlOYW1lIiwiZW50aXR5RGlzcGxheU5hbWUiLCJlbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCIsImljb25DbGFzcyIsInNlY3VyaXR5IiwibW9kZWxOYW1lIiwiTEVBRCIsImNyZWF0ZVBpY2tsaXN0cyIsInBpY2tsaXN0cyIsIm5hbWUiLCJwcm9wZXJ0eSIsIm9wdGlvbnMiLCJmaWx0ZXJCeUxhbmd1YWdlIiwibGFuZ3VhZ2UiLCJzdG9yYWdlTW9kZSIsImNyZWF0ZVJlbGF0aW9uc2hpcHMiLCJyZWwiLCJyZWxhdGlvbnNoaXBzIiwiZGlzcGxheU5hbWUiLCJwcm9wZXJ0eU5hbWUiLCJ0eXBlIiwicmVsYXRlZEVudGl0eSIsInJlbGF0ZWRQcm9wZXJ0eSIsIndoZXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQW9CQSxNQUFNQSxXQUFXLG9CQUFZLFdBQVosQ0FBakI7QUFDQSxNQUFNQyxtQkFBbUIsb0JBQVksZUFBWixDQUF6QjtBQUNBLE1BQU1DLGtCQUFrQixvQkFBWSxjQUFaLENBQXhCO0FBQ0EsTUFBTUMsa0JBQWtCLG9CQUFZLGNBQVosQ0FBeEI7O0FBR0EsTUFBTUMsVUFBVSx1QkFBUSxzQkFBUixFQUFnQyxxQkFBaEMsRUFBOEM7QUFDNURDLGtCQUFjLE9BRDhDO0FBRTVEQyxnQkFBWSxNQUZnRDtBQUc1REMsdUJBQW1CUCxTQUFTTyxpQkFIZ0M7QUFJNURDLDZCQUF5QlIsU0FBU1EsdUJBSjBCO0FBSzVEQyxlQUFXLFFBTGlEO0FBTTVEQyxjQUFVLG9CQU5rRDtBQU81REMsZUFBVyxnQkFBWUMsSUFQcUM7QUFRNURDLHFCQUFpQixTQUFTQSxlQUFULEdBQTJCO0FBQzFDLGFBQU8sS0FBS0MsU0FBTCxLQUFtQixLQUFLQSxTQUFMLEdBQWlCLENBQUM7QUFDMUNDLGNBQU0sT0FEb0M7QUFFMUNDLGtCQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVAwQyxPQUFELEVBUXhDO0FBQ0RELGNBQU0sVUFETDtBQUVEQyxrQkFBVTtBQUZULE9BUndDLEVBV3hDO0FBQ0RELGNBQU0sYUFETDtBQUVERSxpQkFBUztBQUNQQyw0QkFBa0IsS0FEWDtBQUVQQyxvQkFBVSxHQUZIO0FBR1BDLHVCQUFhO0FBSE47QUFGUixPQVh3QyxFQWtCeEM7QUFDREwsY0FBTSxhQURMO0FBRURFLGlCQUFTO0FBQ1BDLDRCQUFrQixLQURYO0FBRVBDLG9CQUFVLEdBRkg7QUFHUEMsdUJBQWE7QUFITjtBQUZSLE9BbEJ3QyxDQUFwQyxDQUFQO0FBMEJELEtBbkMyRDtBQW9DNURDLHlCQUFxQixTQUFTQSxtQkFBVCxHQUErQjtBQUNsRCxVQUFNQyxNQUFNLEtBQUtDLGFBQUwsS0FBdUIsS0FBS0EsYUFBTCxHQUFxQixDQUFDO0FBQ3ZEUixjQUFNLFdBRGlEO0FBRXZEUyxxQkFBYXJCLGdCQUFnQkssdUJBRjBCO0FBR3ZEaUIsc0JBQWMsV0FIeUM7QUFJdkRDLGNBQU0sV0FKaUQ7QUFLdkRDLHVCQUFlLGFBTHdDO0FBTXZEQyx5QkFBaUI7QUFOc0MsT0FBRCxFQU9yRDtBQUNEYixjQUFNLFNBREw7QUFFRFMscUJBQWF0QixnQkFBZ0JNLHVCQUY1QjtBQUdEaUIsc0JBQWMsU0FIYjtBQUlEQyxjQUFNLFdBSkw7QUFLREMsdUJBQWUsU0FMZDtBQU1EQyx5QkFBaUIsUUFOaEI7QUFPREMsZUFBTztBQVBOLE9BUHFELEVBZXJEO0FBQ0RkLGNBQU0sVUFETDtBQUVEUyxxQkFBYXZCLGlCQUFpQk8sdUJBRjdCO0FBR0RpQixzQkFBYyxVQUhiO0FBSURDLGNBQU0sV0FKTDtBQUtEQyx1QkFBZSxVQUxkO0FBTURDLHlCQUFpQjtBQU5oQixPQWZxRCxDQUE1QyxDQUFaO0FBdUJBLGFBQU9OLEdBQVA7QUFDRDtBQTdEMkQsR0FBOUMsQ0FBaEI7b0JBK0RlbEIsTyIsImZpbGUiOiJCYXNlLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IF9Nb2RlbEJhc2UgZnJvbSAnYXJnb3MvTW9kZWxzL19Nb2RlbEJhc2UnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vTmFtZXMnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdsZWFkTW9kZWwnKTtcclxuY29uc3QgYWN0aXZpdHlSZXNvdXJjZSA9IGdldFJlc291cmNlKCdhY3Rpdml0eU1vZGVsJyk7XHJcbmNvbnN0IGhpc3RvcnlSZXNvdXJjZSA9IGdldFJlc291cmNlKCdoaXN0b3J5TW9kZWwnKTtcclxuY29uc3QgYWRkcmVzc1Jlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2FkZHJlc3NNb2RlbCcpO1xyXG5cclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uTW9kZWxzLkxlYWQuQmFzZScsIFtfTW9kZWxCYXNlXSwge1xyXG4gIHJlc291cmNlS2luZDogJ2xlYWRzJyxcclxuICBlbnRpdHlOYW1lOiAnTGVhZCcsXHJcbiAgZW50aXR5RGlzcGxheU5hbWU6IHJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lLFxyXG4gIGVudGl0eURpc3BsYXlOYW1lUGx1cmFsOiByZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICBpY29uQ2xhc3M6ICdmaWx0ZXInLFxyXG4gIHNlY3VyaXR5OiAnRW50aXRpZXMvTGVhZC9WaWV3JyxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLkxFQUQsXHJcbiAgY3JlYXRlUGlja2xpc3RzOiBmdW5jdGlvbiBjcmVhdGVQaWNrbGlzdHMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5waWNrbGlzdHMgfHwgKHRoaXMucGlja2xpc3RzID0gW3tcclxuICAgICAgbmFtZTogJ1RpdGxlJyxcclxuICAgICAgcHJvcGVydHk6ICdUaXRsZScsXHJcbiAgICAgIC8vIFRPRE86IEFkZCBvbmNlIFRpdGxlIGlzIGEgY29kZSBwaWNrbGlzdFxyXG4gICAgICAvLyBvcHRpb25zOiB7XHJcbiAgICAgIC8vICAgZmlsdGVyQnlMYW5ndWFnZTogZmFsc2UsXHJcbiAgICAgIC8vICAgbGFuZ3VhZ2U6ICcgJyxcclxuICAgICAgLy8gfSxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ0luZHVzdHJ5JyxcclxuICAgICAgcHJvcGVydHk6ICdJbmR1c3RyeScsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdOYW1lIFByZWZpeCcsXHJcbiAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICBmaWx0ZXJCeUxhbmd1YWdlOiBmYWxzZSxcclxuICAgICAgICBsYW5ndWFnZTogJyAnLFxyXG4gICAgICAgIHN0b3JhZ2VNb2RlOiAndGV4dCcsXHJcbiAgICAgIH0sXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdOYW1lIFN1ZmZpeCcsXHJcbiAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICBmaWx0ZXJCeUxhbmd1YWdlOiBmYWxzZSxcclxuICAgICAgICBsYW5ndWFnZTogJyAnLFxyXG4gICAgICAgIHN0b3JhZ2VNb2RlOiAndGV4dCcsXHJcbiAgICAgIH0sXHJcbiAgICB9XSk7XHJcbiAgfSxcclxuICBjcmVhdGVSZWxhdGlvbnNoaXBzOiBmdW5jdGlvbiBjcmVhdGVSZWxhdGlvbnNoaXBzKCkge1xyXG4gICAgY29uc3QgcmVsID0gdGhpcy5yZWxhdGlvbnNoaXBzIHx8ICh0aGlzLnJlbGF0aW9uc2hpcHMgPSBbe1xyXG4gICAgICBuYW1lOiAnQWRkcmVzc2VzJyxcclxuICAgICAgZGlzcGxheU5hbWU6IGFkZHJlc3NSZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICAgICAgcHJvcGVydHlOYW1lOiAnQWRkcmVzc2VzJyxcclxuICAgICAgdHlwZTogJ09uZVRvTWFueScsXHJcbiAgICAgIHJlbGF0ZWRFbnRpdHk6ICdMZWFkQWRkcmVzcycsXHJcbiAgICAgIHJlbGF0ZWRQcm9wZXJ0eTogJ0xlYWRJZCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdIaXN0b3J5JyxcclxuICAgICAgZGlzcGxheU5hbWU6IGhpc3RvcnlSZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICAgICAgcHJvcGVydHlOYW1lOiAnSGlzdG9yeScsXHJcbiAgICAgIHR5cGU6ICdPbmVUb01hbnknLFxyXG4gICAgICByZWxhdGVkRW50aXR5OiAnSGlzdG9yeScsXHJcbiAgICAgIHJlbGF0ZWRQcm9wZXJ0eTogJ0xlYWRJZCcsXHJcbiAgICAgIHdoZXJlOiAnVHlwZSBuZSBcImF0RGF0YWJhc2VDaGFuZ2VcIicsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdBY3Rpdml0eScsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiBhY3Rpdml0eVJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gICAgICBwcm9wZXJ0eU5hbWU6ICdBY3Rpdml0eScsXHJcbiAgICAgIHR5cGU6ICdPbmVUb01hbnknLFxyXG4gICAgICByZWxhdGVkRW50aXR5OiAnQWN0aXZpdHknLFxyXG4gICAgICByZWxhdGVkUHJvcGVydHk6ICdMZWFkSWQnLFxyXG4gICAgfV0pO1xyXG4gICAgcmV0dXJuIHJlbDtcclxuICB9LFxyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19