define('crm/Integrations/BOE/Models/BackOfficeAccountingEntity/Base', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _lang, _ModelBase2, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _ModelBase3 = _interopRequireDefault(_ModelBase2);

  var _Names2 = _interopRequireDefault(_Names);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('backOfficeAccountingEntityModel'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.BackOfficeAccountingEntities.Base', [_ModelBase3.default], {
    contractName: 'dynamic',
    resourceKind: 'backOfficeAccountingEntities',
    entityName: 'BackOfficeAcctEntity',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    modelName: _Names2.default.BACKOFFICEACCOUNTINGENTITY,
    iconClass: 'spreadsheet',
    detailViewId: '',
    listViewId: 'backofficeaccountingentities_list',
    editViewId: '',
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = []);
      return rel;
    }
  });
  _lang2.default.setObject('icboe.Models.BackOfficeAccountingEntities.Base', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9CYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eS9CYXNlLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsImNvbnRyYWN0TmFtZSIsInJlc291cmNlS2luZCIsImVudGl0eU5hbWUiLCJlbnRpdHlEaXNwbGF5TmFtZSIsImVudGl0eURpc3BsYXlOYW1lUGx1cmFsIiwibW9kZWxOYW1lIiwiQkFDS09GRklDRUFDQ09VTlRJTkdFTlRJVFkiLCJpY29uQ2xhc3MiLCJkZXRhaWxWaWV3SWQiLCJsaXN0Vmlld0lkIiwiZWRpdFZpZXdJZCIsImNyZWF0ZVJlbGF0aW9uc2hpcHMiLCJyZWwiLCJyZWxhdGlvbnNoaXBzIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkEsTUFBTUEsV0FBVyxvQkFBWSxpQ0FBWixDQUFqQixDLENBckJBOzs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsTUFBTUMsVUFBVSx1QkFBUSwrREFBUixFQUF5RSxxQkFBekUsRUFBdUY7QUFDckdDLGtCQUFjLFNBRHVGO0FBRXJHQyxrQkFBYyw4QkFGdUY7QUFHckdDLGdCQUFZLHNCQUh5RjtBQUlyR0MsdUJBQW1CTCxTQUFTSyxpQkFKeUU7QUFLckdDLDZCQUF5Qk4sU0FBU00sdUJBTG1FO0FBTXJHQyxlQUFXLGdCQUFZQywwQkFOOEU7QUFPckdDLGVBQVcsYUFQMEY7QUFRckdDLGtCQUFjLEVBUnVGO0FBU3JHQyxnQkFBWSxtQ0FUeUY7QUFVckdDLGdCQUFZLEVBVnlGO0FBV3JHQyx5QkFBcUIsU0FBU0EsbUJBQVQsR0FBK0I7QUFDbEQsVUFBTUMsTUFBTSxLQUFLQyxhQUFMLEtBQXVCLEtBQUtBLGFBQUwsR0FBcUIsRUFBNUMsQ0FBWjtBQUVBLGFBQU9ELEdBQVA7QUFDRDtBQWZvRyxHQUF2RixDQUFoQjtBQWlCQSxpQkFBS0UsU0FBTCxDQUFlLGdEQUFmLEVBQWlFZixPQUFqRTtvQkFDZUEsTyIsImZpbGUiOiJCYXNlLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IF9Nb2RlbEJhc2UgZnJvbSAnYXJnb3MvTW9kZWxzL19Nb2RlbEJhc2UnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vTmFtZXMnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdiYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0eU1vZGVsJyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuTW9kZWxzLkJhY2tPZmZpY2VBY2NvdW50aW5nRW50aXRpZXMuQmFzZScsIFtfTW9kZWxCYXNlXSwge1xyXG4gIGNvbnRyYWN0TmFtZTogJ2R5bmFtaWMnLFxyXG4gIHJlc291cmNlS2luZDogJ2JhY2tPZmZpY2VBY2NvdW50aW5nRW50aXRpZXMnLFxyXG4gIGVudGl0eU5hbWU6ICdCYWNrT2ZmaWNlQWNjdEVudGl0eScsXHJcbiAgZW50aXR5RGlzcGxheU5hbWU6IHJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lLFxyXG4gIGVudGl0eURpc3BsYXlOYW1lUGx1cmFsOiByZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLkJBQ0tPRkZJQ0VBQ0NPVU5USU5HRU5USVRZLFxyXG4gIGljb25DbGFzczogJ3NwcmVhZHNoZWV0JyxcclxuICBkZXRhaWxWaWV3SWQ6ICcnLFxyXG4gIGxpc3RWaWV3SWQ6ICdiYWNrb2ZmaWNlYWNjb3VudGluZ2VudGl0aWVzX2xpc3QnLFxyXG4gIGVkaXRWaWV3SWQ6ICcnLFxyXG4gIGNyZWF0ZVJlbGF0aW9uc2hpcHM6IGZ1bmN0aW9uIGNyZWF0ZVJlbGF0aW9uc2hpcHMoKSB7XHJcbiAgICBjb25zdCByZWwgPSB0aGlzLnJlbGF0aW9uc2hpcHMgfHwgKHRoaXMucmVsYXRpb25zaGlwcyA9IFtcclxuICAgIF0pO1xyXG4gICAgcmV0dXJuIHJlbDtcclxuICB9LFxyXG59KTtcclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLk1vZGVscy5CYWNrT2ZmaWNlQWNjb3VudGluZ0VudGl0aWVzLkJhc2UnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19