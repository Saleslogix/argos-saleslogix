define('crm/Integrations/Contour/Models/Place/Base', ['module', 'exports', 'dojo/_base/declare', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _ModelBase2, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('placeModel'); // eslint-disable-line
  var addressResource = (0, _I18n2.default)('addressModel');

  var __class = (0, _declare2.default)('crm.Integrations.Contour.Models.Place.Base', [_ModelBase3.default], {
    resourceKind: 'places',
    entityName: 'Place',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    modelName: _Names2.default.PLACE,
    listViewId: 'pxSearch_locations',
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = [{
        name: 'Addresses',
        displayName: addressResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'Address',
        relatedProperty: 'EntityId'
      }]);
      return rel;
    }
  });
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQ29udG91ci9Nb2RlbHMvUGxhY2UvQmFzZS5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsImFkZHJlc3NSZXNvdXJjZSIsIl9fY2xhc3MiLCJyZXNvdXJjZUtpbmQiLCJlbnRpdHlOYW1lIiwiZW50aXR5RGlzcGxheU5hbWUiLCJlbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCIsIm1vZGVsTmFtZSIsIlBMQUNFIiwibGlzdFZpZXdJZCIsImNyZWF0ZVJlbGF0aW9uc2hpcHMiLCJyZWwiLCJyZWxhdGlvbnNoaXBzIiwibmFtZSIsImRpc3BsYXlOYW1lIiwidHlwZSIsInJlbGF0ZWRFbnRpdHkiLCJyZWxhdGVkUHJvcGVydHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBLE1BQU1BLFdBQVcsb0JBQVksWUFBWixDQUFqQixDLENBQTRDO0FBQzVDLE1BQU1DLGtCQUFrQixvQkFBWSxjQUFaLENBQXhCOztBQUVBLE1BQU1DLFVBQVUsdUJBQVEsNENBQVIsRUFBc0QscUJBQXRELEVBQW9FO0FBQ2xGQyxrQkFBYyxRQURvRTtBQUVsRkMsZ0JBQVksT0FGc0U7QUFHbEZDLHVCQUFtQkwsU0FBU0ssaUJBSHNEO0FBSWxGQyw2QkFBeUJOLFNBQVNNLHVCQUpnRDtBQUtsRkMsZUFBVyxnQkFBWUMsS0FMMkQ7QUFNbEZDLGdCQUFZLG9CQU5zRTtBQU9sRkMseUJBQXFCLFNBQVNBLG1CQUFULEdBQStCO0FBQ2xELFVBQU1DLE1BQU0sS0FBS0MsYUFBTCxLQUF1QixLQUFLQSxhQUFMLEdBQXFCLENBQUM7QUFDdkRDLGNBQU0sV0FEaUQ7QUFFdkRDLHFCQUFhYixnQkFBZ0JLLHVCQUYwQjtBQUd2RFMsY0FBTSxXQUhpRDtBQUl2REMsdUJBQWUsU0FKd0M7QUFLdkRDLHlCQUFpQjtBQUxzQyxPQUFELENBQTVDLENBQVo7QUFPQSxhQUFPTixHQUFQO0FBQ0Q7QUFoQmlGLEdBQXBFLENBQWhCO29CQWtCZVQsTyIsImZpbGUiOiJCYXNlLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IF9Nb2RlbEJhc2UgZnJvbSAnYXJnb3MvTW9kZWxzL19Nb2RlbEJhc2UnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vTmFtZXMnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdwbGFjZU1vZGVsJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuY29uc3QgYWRkcmVzc1Jlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2FkZHJlc3NNb2RlbCcpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQ29udG91ci5Nb2RlbHMuUGxhY2UuQmFzZScsIFtfTW9kZWxCYXNlXSwge1xyXG4gIHJlc291cmNlS2luZDogJ3BsYWNlcycsXHJcbiAgZW50aXR5TmFtZTogJ1BsYWNlJyxcclxuICBlbnRpdHlEaXNwbGF5TmFtZTogcmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWUsXHJcbiAgZW50aXR5RGlzcGxheU5hbWVQbHVyYWw6IHJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuUExBQ0UsXHJcbiAgbGlzdFZpZXdJZDogJ3B4U2VhcmNoX2xvY2F0aW9ucycsXHJcbiAgY3JlYXRlUmVsYXRpb25zaGlwczogZnVuY3Rpb24gY3JlYXRlUmVsYXRpb25zaGlwcygpIHtcclxuICAgIGNvbnN0IHJlbCA9IHRoaXMucmVsYXRpb25zaGlwcyB8fCAodGhpcy5yZWxhdGlvbnNoaXBzID0gW3tcclxuICAgICAgbmFtZTogJ0FkZHJlc3NlcycsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiBhZGRyZXNzUmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgICAgIHR5cGU6ICdPbmVUb01hbnknLFxyXG4gICAgICByZWxhdGVkRW50aXR5OiAnQWRkcmVzcycsXHJcbiAgICAgIHJlbGF0ZWRQcm9wZXJ0eTogJ0VudGl0eUlkJyxcclxuICAgIH1dKTtcclxuICAgIHJldHVybiByZWw7XHJcbiAgfSxcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==