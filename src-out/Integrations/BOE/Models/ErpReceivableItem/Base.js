define('crm/Integrations/BOE/Models/ErpReceivableItem/Base', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _lang, _ModelBase2, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('erpReceivableItemModel'); /* Copyright 2017 Infor
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

  var receivableResource = (0, _I18n2.default)('erpReceivableModel');
  var invoiceResource = (0, _I18n2.default)('erpInvoiceModel');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.ErpReceivableItem.Base', [_ModelBase3.default], {
    contractName: 'dynamic',
    resourceKind: 'erpReceivableItems',
    entityName: 'ERPReceivableItem',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    modelName: _Names2.default.ERPRECEIVABLEITEM,
    iconClass: 'checkbox',
    detailViewId: 'erpreceivableitems_detail',
    listViewId: 'erpreceivable_items_list',
    editViewId: '',
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = [{
        name: 'Invoice',
        displayName: invoiceResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'ErpInvoice',
        parentPropertyType: 'object',
        relatedEntity: 'ERPInvoice'
      }, {
        name: 'Receivable',
        displayName: receivableResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'ErpReceivable',
        parentPropertyType: 'object',
        relatedEntity: 'ERPReceivable'
      }]);
      return rel;
    }
  });
  _lang2.default.setObject('icboe.Models.ErpReceivableItem.Base', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9FcnBSZWNlaXZhYmxlSXRlbS9CYXNlLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwicmVjZWl2YWJsZVJlc291cmNlIiwiaW52b2ljZVJlc291cmNlIiwiX19jbGFzcyIsImNvbnRyYWN0TmFtZSIsInJlc291cmNlS2luZCIsImVudGl0eU5hbWUiLCJlbnRpdHlEaXNwbGF5TmFtZSIsImVudGl0eURpc3BsYXlOYW1lUGx1cmFsIiwibW9kZWxOYW1lIiwiRVJQUkVDRUlWQUJMRUlURU0iLCJpY29uQ2xhc3MiLCJkZXRhaWxWaWV3SWQiLCJsaXN0Vmlld0lkIiwiZWRpdFZpZXdJZCIsImNyZWF0ZVJlbGF0aW9uc2hpcHMiLCJyZWwiLCJyZWxhdGlvbnNoaXBzIiwibmFtZSIsImRpc3BsYXlOYW1lIiwidHlwZSIsInBhcmVudFByb3BlcnR5IiwicGFyZW50UHJvcGVydHlUeXBlIiwicmVsYXRlZEVudGl0eSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU1BLFdBQVcsb0JBQVksd0JBQVosQ0FBakIsQyxDQXJCQTs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE1BQU1DLHFCQUFxQixvQkFBWSxvQkFBWixDQUEzQjtBQUNBLE1BQU1DLGtCQUFrQixvQkFBWSxpQkFBWixDQUF4Qjs7QUFFQSxNQUFNQyxVQUFVLHVCQUFRLG9EQUFSLEVBQThELHFCQUE5RCxFQUE0RTtBQUMxRkMsa0JBQWMsU0FENEU7QUFFMUZDLGtCQUFjLG9CQUY0RTtBQUcxRkMsZ0JBQVksbUJBSDhFO0FBSTFGQyx1QkFBbUJQLFNBQVNPLGlCQUo4RDtBQUsxRkMsNkJBQXlCUixTQUFTUSx1QkFMd0Q7QUFNMUZDLGVBQVcsZ0JBQVlDLGlCQU5tRTtBQU8xRkMsZUFBVyxVQVArRTtBQVExRkMsa0JBQWMsMkJBUjRFO0FBUzFGQyxnQkFBWSwwQkFUOEU7QUFVMUZDLGdCQUFZLEVBVjhFO0FBVzFGQyx5QkFBcUIsU0FBU0EsbUJBQVQsR0FBK0I7QUFDbEQsVUFBTUMsTUFBTSxLQUFLQyxhQUFMLEtBQXVCLEtBQUtBLGFBQUwsR0FBcUIsQ0FBQztBQUN2REMsY0FBTSxTQURpRDtBQUV2REMscUJBQWFqQixnQkFBZ0JLLGlCQUYwQjtBQUd2RGEsY0FBTSxXQUhpRDtBQUl2REMsd0JBQWdCLFlBSnVDO0FBS3ZEQyw0QkFBb0IsUUFMbUM7QUFNdkRDLHVCQUFlO0FBTndDLE9BQUQsRUFPckQ7QUFDREwsY0FBTSxZQURMO0FBRURDLHFCQUFhbEIsbUJBQW1CTSxpQkFGL0I7QUFHRGEsY0FBTSxXQUhMO0FBSURDLHdCQUFnQixlQUpmO0FBS0RDLDRCQUFvQixRQUxuQjtBQU1EQyx1QkFBZTtBQU5kLE9BUHFELENBQTVDLENBQVo7QUFlQSxhQUFPUCxHQUFQO0FBQ0Q7QUE1QnlGLEdBQTVFLENBQWhCO0FBOEJBLGlCQUFLUSxTQUFMLENBQWUscUNBQWYsRUFBc0RyQixPQUF0RDtvQkFDZUEsTyIsImZpbGUiOiJCYXNlLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IF9Nb2RlbEJhc2UgZnJvbSAnYXJnb3MvTW9kZWxzL19Nb2RlbEJhc2UnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vTmFtZXMnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdlcnBSZWNlaXZhYmxlSXRlbU1vZGVsJyk7XHJcbmNvbnN0IHJlY2VpdmFibGVSZXNvdXJjZSA9IGdldFJlc291cmNlKCdlcnBSZWNlaXZhYmxlTW9kZWwnKTtcclxuY29uc3QgaW52b2ljZVJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2VycEludm9pY2VNb2RlbCcpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLk1vZGVscy5FcnBSZWNlaXZhYmxlSXRlbS5CYXNlJywgW19Nb2RlbEJhc2VdLCB7XHJcbiAgY29udHJhY3ROYW1lOiAnZHluYW1pYycsXHJcbiAgcmVzb3VyY2VLaW5kOiAnZXJwUmVjZWl2YWJsZUl0ZW1zJyxcclxuICBlbnRpdHlOYW1lOiAnRVJQUmVjZWl2YWJsZUl0ZW0nLFxyXG4gIGVudGl0eURpc3BsYXlOYW1lOiByZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZSxcclxuICBlbnRpdHlEaXNwbGF5TmFtZVBsdXJhbDogcmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5FUlBSRUNFSVZBQkxFSVRFTSxcclxuICBpY29uQ2xhc3M6ICdjaGVja2JveCcsXHJcbiAgZGV0YWlsVmlld0lkOiAnZXJwcmVjZWl2YWJsZWl0ZW1zX2RldGFpbCcsXHJcbiAgbGlzdFZpZXdJZDogJ2VycHJlY2VpdmFibGVfaXRlbXNfbGlzdCcsXHJcbiAgZWRpdFZpZXdJZDogJycsXHJcbiAgY3JlYXRlUmVsYXRpb25zaGlwczogZnVuY3Rpb24gY3JlYXRlUmVsYXRpb25zaGlwcygpIHtcclxuICAgIGNvbnN0IHJlbCA9IHRoaXMucmVsYXRpb25zaGlwcyB8fCAodGhpcy5yZWxhdGlvbnNoaXBzID0gW3tcclxuICAgICAgbmFtZTogJ0ludm9pY2UnLFxyXG4gICAgICBkaXNwbGF5TmFtZTogaW52b2ljZVJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lLFxyXG4gICAgICB0eXBlOiAnTWFueVRvT25lJyxcclxuICAgICAgcGFyZW50UHJvcGVydHk6ICdFcnBJbnZvaWNlJyxcclxuICAgICAgcGFyZW50UHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ0VSUEludm9pY2UnLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnUmVjZWl2YWJsZScsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiByZWNlaXZhYmxlUmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWUsXHJcbiAgICAgIHR5cGU6ICdNYW55VG9PbmUnLFxyXG4gICAgICBwYXJlbnRQcm9wZXJ0eTogJ0VycFJlY2VpdmFibGUnLFxyXG4gICAgICBwYXJlbnRQcm9wZXJ0eVR5cGU6ICdvYmplY3QnLFxyXG4gICAgICByZWxhdGVkRW50aXR5OiAnRVJQUmVjZWl2YWJsZScsXHJcbiAgICB9XSk7XHJcbiAgICByZXR1cm4gcmVsO1xyXG4gIH0sXHJcbn0pO1xyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuTW9kZWxzLkVycFJlY2VpdmFibGVJdGVtLkJhc2UnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19