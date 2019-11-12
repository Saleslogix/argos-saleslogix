define('crm/Models/OpportunityContact/Base', ['module', 'exports', 'dojo/_base/declare', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _ModelBase2, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('opportunityContactModel');
  var contactResource = (0, _I18n2.default)('contactModel');
  var opportunityResource = (0, _I18n2.default)('opportunityModel');

  var __class = (0, _declare2.default)('crm.Models.OpportunityContact.Base', [_ModelBase3.default], {
    entityName: 'OpportunityContact',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    iconClass: 'user',
    resourceKind: 'opportunityContacts',
    modelName: _Names2.default.OPPORTUNITYCONTACT,
    security: 'Entities/Contact/View',

    createPicklists: function createPicklists() {
      return this.picklists || (this.picklists = [{
        name: 'Role',
        property: 'SalesRole'
      }, {
        name: 'Standing',
        property: 'Standing'
      }]);
    },
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = [{
        name: 'Contact',
        displayName: contactResource.entityDisplayName,
        type: 'OneToOne',
        relatedEntity: 'Contact',
        relatedProperty: 'ContactId'
      }, {
        name: 'Opportunity',
        displayName: opportunityResource.entityDisplayNamePlural,
        type: 'OneToOne',
        relatedEntity: 'Opportunity',
        relatedProperty: 'OpportunityId'
      }]);
      return rel;
    }
  });
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbHMvT3Bwb3J0dW5pdHlDb250YWN0L0Jhc2UuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJjb250YWN0UmVzb3VyY2UiLCJvcHBvcnR1bml0eVJlc291cmNlIiwiX19jbGFzcyIsImVudGl0eU5hbWUiLCJlbnRpdHlEaXNwbGF5TmFtZSIsImVudGl0eURpc3BsYXlOYW1lUGx1cmFsIiwiaWNvbkNsYXNzIiwicmVzb3VyY2VLaW5kIiwibW9kZWxOYW1lIiwiT1BQT1JUVU5JVFlDT05UQUNUIiwic2VjdXJpdHkiLCJjcmVhdGVQaWNrbGlzdHMiLCJwaWNrbGlzdHMiLCJuYW1lIiwicHJvcGVydHkiLCJjcmVhdGVSZWxhdGlvbnNoaXBzIiwicmVsIiwicmVsYXRpb25zaGlwcyIsImRpc3BsYXlOYW1lIiwidHlwZSIsInJlbGF0ZWRFbnRpdHkiLCJyZWxhdGVkUHJvcGVydHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBLE1BQU1BLFdBQVcsb0JBQVkseUJBQVosQ0FBakI7QUFDQSxNQUFNQyxrQkFBa0Isb0JBQVksY0FBWixDQUF4QjtBQUNBLE1BQU1DLHNCQUFzQixvQkFBWSxrQkFBWixDQUE1Qjs7QUFFQSxNQUFNQyxVQUFVLHVCQUFRLG9DQUFSLEVBQThDLHFCQUE5QyxFQUE0RDtBQUMxRUMsZ0JBQVksb0JBRDhEO0FBRTFFQyx1QkFBbUJMLFNBQVNLLGlCQUY4QztBQUcxRUMsNkJBQXlCTixTQUFTTSx1QkFId0M7QUFJMUVDLGVBQVcsTUFKK0Q7QUFLMUVDLGtCQUFjLHFCQUw0RDtBQU0xRUMsZUFBVyxnQkFBWUMsa0JBTm1EO0FBTzFFQyxjQUFVLHVCQVBnRTs7QUFTMUVDLHFCQUFpQixTQUFTQSxlQUFULEdBQTJCO0FBQzFDLGFBQU8sS0FBS0MsU0FBTCxLQUFtQixLQUFLQSxTQUFMLEdBQWlCLENBQUM7QUFDMUNDLGNBQU0sTUFEb0M7QUFFMUNDLGtCQUFVO0FBRmdDLE9BQUQsRUFHeEM7QUFDREQsY0FBTSxVQURMO0FBRURDLGtCQUFVO0FBRlQsT0FId0MsQ0FBcEMsQ0FBUDtBQU9ELEtBakJ5RTtBQWtCMUVDLHlCQUFxQixTQUFTQSxtQkFBVCxHQUErQjtBQUNsRCxVQUFNQyxNQUFNLEtBQUtDLGFBQUwsS0FBdUIsS0FBS0EsYUFBTCxHQUFxQixDQUFDO0FBQ3ZESixjQUFNLFNBRGlEO0FBRXZESyxxQkFBYWxCLGdCQUFnQkksaUJBRjBCO0FBR3ZEZSxjQUFNLFVBSGlEO0FBSXZEQyx1QkFBZSxTQUp3QztBQUt2REMseUJBQWlCO0FBTHNDLE9BQUQsRUFNckQ7QUFDRFIsY0FBTSxhQURMO0FBRURLLHFCQUFhakIsb0JBQW9CSSx1QkFGaEM7QUFHRGMsY0FBTSxVQUhMO0FBSURDLHVCQUFlLGFBSmQ7QUFLREMseUJBQWlCO0FBTGhCLE9BTnFELENBQTVDLENBQVo7QUFhQSxhQUFPTCxHQUFQO0FBQ0Q7QUFqQ3lFLEdBQTVELENBQWhCO29CQW1DZWQsTyIsImZpbGUiOiJCYXNlLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IF9Nb2RlbEJhc2UgZnJvbSAnYXJnb3MvTW9kZWxzL19Nb2RlbEJhc2UnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vTmFtZXMnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdvcHBvcnR1bml0eUNvbnRhY3RNb2RlbCcpO1xyXG5jb25zdCBjb250YWN0UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnY29udGFjdE1vZGVsJyk7XHJcbmNvbnN0IG9wcG9ydHVuaXR5UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnb3Bwb3J0dW5pdHlNb2RlbCcpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5Nb2RlbHMuT3Bwb3J0dW5pdHlDb250YWN0LkJhc2UnLCBbX01vZGVsQmFzZV0sIHtcclxuICBlbnRpdHlOYW1lOiAnT3Bwb3J0dW5pdHlDb250YWN0JyxcclxuICBlbnRpdHlEaXNwbGF5TmFtZTogcmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWUsXHJcbiAgZW50aXR5RGlzcGxheU5hbWVQbHVyYWw6IHJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gIGljb25DbGFzczogJ3VzZXInLFxyXG4gIHJlc291cmNlS2luZDogJ29wcG9ydHVuaXR5Q29udGFjdHMnLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuT1BQT1JUVU5JVFlDT05UQUNULFxyXG4gIHNlY3VyaXR5OiAnRW50aXRpZXMvQ29udGFjdC9WaWV3JyxcclxuXHJcbiAgY3JlYXRlUGlja2xpc3RzOiBmdW5jdGlvbiBjcmVhdGVQaWNrbGlzdHMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5waWNrbGlzdHMgfHwgKHRoaXMucGlja2xpc3RzID0gW3tcclxuICAgICAgbmFtZTogJ1JvbGUnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1NhbGVzUm9sZScsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdTdGFuZGluZycsXHJcbiAgICAgIHByb3BlcnR5OiAnU3RhbmRpbmcnLFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbiAgY3JlYXRlUmVsYXRpb25zaGlwczogZnVuY3Rpb24gY3JlYXRlUmVsYXRpb25zaGlwcygpIHtcclxuICAgIGNvbnN0IHJlbCA9IHRoaXMucmVsYXRpb25zaGlwcyB8fCAodGhpcy5yZWxhdGlvbnNoaXBzID0gW3tcclxuICAgICAgbmFtZTogJ0NvbnRhY3QnLFxyXG4gICAgICBkaXNwbGF5TmFtZTogY29udGFjdFJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lLFxyXG4gICAgICB0eXBlOiAnT25lVG9PbmUnLFxyXG4gICAgICByZWxhdGVkRW50aXR5OiAnQ29udGFjdCcsXHJcbiAgICAgIHJlbGF0ZWRQcm9wZXJ0eTogJ0NvbnRhY3RJZCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdPcHBvcnR1bml0eScsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiBvcHBvcnR1bml0eVJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gICAgICB0eXBlOiAnT25lVG9PbmUnLFxyXG4gICAgICByZWxhdGVkRW50aXR5OiAnT3Bwb3J0dW5pdHknLFxyXG4gICAgICByZWxhdGVkUHJvcGVydHk6ICdPcHBvcnR1bml0eUlkJyxcclxuICAgIH1dKTtcclxuICAgIHJldHVybiByZWw7XHJcbiAgfSxcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==