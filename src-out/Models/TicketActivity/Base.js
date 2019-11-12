define('crm/Models/TicketActivity/Base', ['module', 'exports', 'dojo/_base/declare', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _ModelBase2, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('ticketActivityModel');

  var __class = (0, _declare2.default)('crm.Models.TicketActivity.Base', [_ModelBase3.default], {
    entityName: 'TicketActivity',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    iconClass: 'bullet-list',
    resourceKind: 'ticketActivities',
    security: 'Entities/Ticket/View',
    modelName: _Names2.default.TICKETACTIVITY,

    createPicklists: function createPicklists() {
      return this.picklists || (this.picklists = [{
        name: 'Ticket Activity',
        property: 'ActivityTypeCode'
      }, {
        name: 'Ticket Activity Public Access',
        property: 'PublicAccessCode'
      }]);
    },
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = []);
      return rel;
    }

  });
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbHMvVGlja2V0QWN0aXZpdHkvQmFzZS5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJlbnRpdHlOYW1lIiwiZW50aXR5RGlzcGxheU5hbWUiLCJlbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCIsImljb25DbGFzcyIsInJlc291cmNlS2luZCIsInNlY3VyaXR5IiwibW9kZWxOYW1lIiwiVElDS0VUQUNUSVZJVFkiLCJjcmVhdGVQaWNrbGlzdHMiLCJwaWNrbGlzdHMiLCJuYW1lIiwicHJvcGVydHkiLCJjcmVhdGVSZWxhdGlvbnNoaXBzIiwicmVsIiwicmVsYXRpb25zaGlwcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFvQkEsTUFBTUEsV0FBVyxvQkFBWSxxQkFBWixDQUFqQjs7QUFFQSxNQUFNQyxVQUFVLHVCQUFRLGdDQUFSLEVBQTBDLHFCQUExQyxFQUF3RDtBQUN0RUMsZ0JBQVksZ0JBRDBEO0FBRXRFQyx1QkFBbUJILFNBQVNHLGlCQUYwQztBQUd0RUMsNkJBQXlCSixTQUFTSSx1QkFIb0M7QUFJdEVDLGVBQVcsYUFKMkQ7QUFLdEVDLGtCQUFjLGtCQUx3RDtBQU10RUMsY0FBVSxzQkFONEQ7QUFPdEVDLGVBQVcsZ0JBQVlDLGNBUCtDOztBQVN0RUMscUJBQWlCLFNBQVNBLGVBQVQsR0FBMkI7QUFDMUMsYUFBTyxLQUFLQyxTQUFMLEtBQW1CLEtBQUtBLFNBQUwsR0FBaUIsQ0FBQztBQUMxQ0MsY0FBTSxpQkFEb0M7QUFFMUNDLGtCQUFVO0FBRmdDLE9BQUQsRUFHeEM7QUFDREQsY0FBTSwrQkFETDtBQUVEQyxrQkFBVTtBQUZULE9BSHdDLENBQXBDLENBQVA7QUFPRCxLQWpCcUU7QUFrQnRFQyx5QkFBcUIsU0FBU0EsbUJBQVQsR0FBK0I7QUFDbEQsVUFBTUMsTUFBTSxLQUFLQyxhQUFMLEtBQXVCLEtBQUtBLGFBQUwsR0FBcUIsRUFBNUMsQ0FBWjtBQUNBLGFBQU9ELEdBQVA7QUFDRDs7QUFyQnFFLEdBQXhELENBQWhCO29CQXdCZWQsTyIsImZpbGUiOiJCYXNlLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IF9Nb2RlbEJhc2UgZnJvbSAnYXJnb3MvTW9kZWxzL19Nb2RlbEJhc2UnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vTmFtZXMnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCd0aWNrZXRBY3Rpdml0eU1vZGVsJyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLk1vZGVscy5UaWNrZXRBY3Rpdml0eS5CYXNlJywgW19Nb2RlbEJhc2VdLCB7XHJcbiAgZW50aXR5TmFtZTogJ1RpY2tldEFjdGl2aXR5JyxcclxuICBlbnRpdHlEaXNwbGF5TmFtZTogcmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWUsXHJcbiAgZW50aXR5RGlzcGxheU5hbWVQbHVyYWw6IHJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gIGljb25DbGFzczogJ2J1bGxldC1saXN0JyxcclxuICByZXNvdXJjZUtpbmQ6ICd0aWNrZXRBY3Rpdml0aWVzJyxcclxuICBzZWN1cml0eTogJ0VudGl0aWVzL1RpY2tldC9WaWV3JyxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLlRJQ0tFVEFDVElWSVRZLFxyXG5cclxuICBjcmVhdGVQaWNrbGlzdHM6IGZ1bmN0aW9uIGNyZWF0ZVBpY2tsaXN0cygpIHtcclxuICAgIHJldHVybiB0aGlzLnBpY2tsaXN0cyB8fCAodGhpcy5waWNrbGlzdHMgPSBbe1xyXG4gICAgICBuYW1lOiAnVGlja2V0IEFjdGl2aXR5JyxcclxuICAgICAgcHJvcGVydHk6ICdBY3Rpdml0eVR5cGVDb2RlJyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ1RpY2tldCBBY3Rpdml0eSBQdWJsaWMgQWNjZXNzJyxcclxuICAgICAgcHJvcGVydHk6ICdQdWJsaWNBY2Nlc3NDb2RlJyxcclxuICAgIH1dKTtcclxuICB9LFxyXG4gIGNyZWF0ZVJlbGF0aW9uc2hpcHM6IGZ1bmN0aW9uIGNyZWF0ZVJlbGF0aW9uc2hpcHMoKSB7XHJcbiAgICBjb25zdCByZWwgPSB0aGlzLnJlbGF0aW9uc2hpcHMgfHwgKHRoaXMucmVsYXRpb25zaGlwcyA9IFtdKTtcclxuICAgIHJldHVybiByZWw7XHJcbiAgfSxcclxuXHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=