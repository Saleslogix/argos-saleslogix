define('crm/Integrations/BOE/Models/ErpShipment/Base', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _lang, _ModelBase2, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('erpShipmentModel'); /* Copyright 2017 Infor
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

  var accountResource = (0, _I18n2.default)('accountModel');
  var shipToResource = (0, _I18n2.default)('erpShipToModel');
  var shipmentItemResource = (0, _I18n2.default)('erpShipmentItemModel');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.ErpShipment.Base', [_ModelBase3.default], {
    contractName: 'dynamic',
    resourceKind: 'erpShipments',
    entityName: 'ERPShipment',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    modelName: _Names2.default.ERPSHIPMENT,
    iconClass: 'warehouse',
    detailViewId: 'erpshipments_detail',
    listViewId: 'erpshipments_list',
    editViewId: '',
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = [{
        name: 'Account',
        displayName: accountResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'Account',
        parentPropertyType: 'object',
        relatedEntity: 'Account'
      }, {
        name: 'ShipTo',
        displayName: shipToResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'ErpShipTo',
        parentPropertyType: 'object',
        relatedEntity: 'ERPShipTo'
      }, {
        name: 'ShipmentItem',
        displayName: shipmentItemResource.entityDisplayName,
        type: 'OneToMany',
        relatedEntity: 'ERPShipmentItem',
        relatedProperty: 'ErpShipment',
        relatedPropertyType: 'object'
      }]);
      return rel;
    }
  });
  _lang2.default.setObject('icboe.Models.ErpShipment.Base', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9FcnBTaGlwbWVudC9CYXNlLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiYWNjb3VudFJlc291cmNlIiwic2hpcFRvUmVzb3VyY2UiLCJzaGlwbWVudEl0ZW1SZXNvdXJjZSIsIl9fY2xhc3MiLCJjb250cmFjdE5hbWUiLCJyZXNvdXJjZUtpbmQiLCJlbnRpdHlOYW1lIiwiZW50aXR5RGlzcGxheU5hbWUiLCJlbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCIsIm1vZGVsTmFtZSIsIkVSUFNISVBNRU5UIiwiaWNvbkNsYXNzIiwiZGV0YWlsVmlld0lkIiwibGlzdFZpZXdJZCIsImVkaXRWaWV3SWQiLCJjcmVhdGVSZWxhdGlvbnNoaXBzIiwicmVsIiwicmVsYXRpb25zaGlwcyIsIm5hbWUiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJwYXJlbnRQcm9wZXJ0eSIsInBhcmVudFByb3BlcnR5VHlwZSIsInJlbGF0ZWRFbnRpdHkiLCJyZWxhdGVkUHJvcGVydHkiLCJyZWxhdGVkUHJvcGVydHlUeXBlIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkEsTUFBTUEsV0FBVyxvQkFBWSxrQkFBWixDQUFqQixDLENBckJBOzs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsTUFBTUMsa0JBQWtCLG9CQUFZLGNBQVosQ0FBeEI7QUFDQSxNQUFNQyxpQkFBaUIsb0JBQVksZ0JBQVosQ0FBdkI7QUFDQSxNQUFNQyx1QkFBdUIsb0JBQVksc0JBQVosQ0FBN0I7O0FBRUEsTUFBTUMsVUFBVSx1QkFBUSw4Q0FBUixFQUF3RCxxQkFBeEQsRUFBc0U7QUFDcEZDLGtCQUFjLFNBRHNFO0FBRXBGQyxrQkFBYyxjQUZzRTtBQUdwRkMsZ0JBQVksYUFId0U7QUFJcEZDLHVCQUFtQlIsU0FBU1EsaUJBSndEO0FBS3BGQyw2QkFBeUJULFNBQVNTLHVCQUxrRDtBQU1wRkMsZUFBVyxnQkFBWUMsV0FONkQ7QUFPcEZDLGVBQVcsV0FQeUU7QUFRcEZDLGtCQUFjLHFCQVJzRTtBQVNwRkMsZ0JBQVksbUJBVHdFO0FBVXBGQyxnQkFBWSxFQVZ3RTtBQVdwRkMseUJBQXFCLFNBQVNBLG1CQUFULEdBQStCO0FBQ2xELFVBQU1DLE1BQU0sS0FBS0MsYUFBTCxLQUF1QixLQUFLQSxhQUFMLEdBQXFCLENBQUM7QUFDdkRDLGNBQU0sU0FEaUQ7QUFFdkRDLHFCQUFhbkIsZ0JBQWdCTyxpQkFGMEI7QUFHdkRhLGNBQU0sV0FIaUQ7QUFJdkRDLHdCQUFnQixTQUp1QztBQUt2REMsNEJBQW9CLFFBTG1DO0FBTXZEQyx1QkFBZTtBQU53QyxPQUFELEVBT3JEO0FBQ0RMLGNBQU0sUUFETDtBQUVEQyxxQkFBYWxCLGVBQWVNLGlCQUYzQjtBQUdEYSxjQUFNLFdBSEw7QUFJREMsd0JBQWdCLFdBSmY7QUFLREMsNEJBQW9CLFFBTG5CO0FBTURDLHVCQUFlO0FBTmQsT0FQcUQsRUFjckQ7QUFDREwsY0FBTSxjQURMO0FBRURDLHFCQUFhakIscUJBQXFCSyxpQkFGakM7QUFHRGEsY0FBTSxXQUhMO0FBSURHLHVCQUFlLGlCQUpkO0FBS0RDLHlCQUFpQixhQUxoQjtBQU1EQyw2QkFBcUI7QUFOcEIsT0FkcUQsQ0FBNUMsQ0FBWjtBQXNCQSxhQUFPVCxHQUFQO0FBQ0Q7QUFuQ21GLEdBQXRFLENBQWhCO0FBcUNBLGlCQUFLVSxTQUFMLENBQWUsK0JBQWYsRUFBZ0R2QixPQUFoRDtvQkFDZUEsTyIsImZpbGUiOiJCYXNlLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IF9Nb2RlbEJhc2UgZnJvbSAnYXJnb3MvTW9kZWxzL19Nb2RlbEJhc2UnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vTmFtZXMnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdlcnBTaGlwbWVudE1vZGVsJyk7XHJcbmNvbnN0IGFjY291bnRSZXNvdXJjZSA9IGdldFJlc291cmNlKCdhY2NvdW50TW9kZWwnKTtcclxuY29uc3Qgc2hpcFRvUmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXJwU2hpcFRvTW9kZWwnKTtcclxuY29uc3Qgc2hpcG1lbnRJdGVtUmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXJwU2hpcG1lbnRJdGVtTW9kZWwnKTtcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5Nb2RlbHMuRXJwU2hpcG1lbnQuQmFzZScsIFtfTW9kZWxCYXNlXSwge1xyXG4gIGNvbnRyYWN0TmFtZTogJ2R5bmFtaWMnLFxyXG4gIHJlc291cmNlS2luZDogJ2VycFNoaXBtZW50cycsXHJcbiAgZW50aXR5TmFtZTogJ0VSUFNoaXBtZW50JyxcclxuICBlbnRpdHlEaXNwbGF5TmFtZTogcmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWUsXHJcbiAgZW50aXR5RGlzcGxheU5hbWVQbHVyYWw6IHJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuRVJQU0hJUE1FTlQsXHJcbiAgaWNvbkNsYXNzOiAnd2FyZWhvdXNlJyxcclxuICBkZXRhaWxWaWV3SWQ6ICdlcnBzaGlwbWVudHNfZGV0YWlsJyxcclxuICBsaXN0Vmlld0lkOiAnZXJwc2hpcG1lbnRzX2xpc3QnLFxyXG4gIGVkaXRWaWV3SWQ6ICcnLFxyXG4gIGNyZWF0ZVJlbGF0aW9uc2hpcHM6IGZ1bmN0aW9uIGNyZWF0ZVJlbGF0aW9uc2hpcHMoKSB7XHJcbiAgICBjb25zdCByZWwgPSB0aGlzLnJlbGF0aW9uc2hpcHMgfHwgKHRoaXMucmVsYXRpb25zaGlwcyA9IFt7XHJcbiAgICAgIG5hbWU6ICdBY2NvdW50JyxcclxuICAgICAgZGlzcGxheU5hbWU6IGFjY291bnRSZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZSxcclxuICAgICAgdHlwZTogJ01hbnlUb09uZScsXHJcbiAgICAgIHBhcmVudFByb3BlcnR5OiAnQWNjb3VudCcsXHJcbiAgICAgIHBhcmVudFByb3BlcnR5VHlwZTogJ29iamVjdCcsXHJcbiAgICAgIHJlbGF0ZWRFbnRpdHk6ICdBY2NvdW50JyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ1NoaXBUbycsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiBzaGlwVG9SZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZSxcclxuICAgICAgdHlwZTogJ01hbnlUb09uZScsXHJcbiAgICAgIHBhcmVudFByb3BlcnR5OiAnRXJwU2hpcFRvJyxcclxuICAgICAgcGFyZW50UHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ0VSUFNoaXBUbycsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdTaGlwbWVudEl0ZW0nLFxyXG4gICAgICBkaXNwbGF5TmFtZTogc2hpcG1lbnRJdGVtUmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWUsXHJcbiAgICAgIHR5cGU6ICdPbmVUb01hbnknLFxyXG4gICAgICByZWxhdGVkRW50aXR5OiAnRVJQU2hpcG1lbnRJdGVtJyxcclxuICAgICAgcmVsYXRlZFByb3BlcnR5OiAnRXJwU2hpcG1lbnQnLFxyXG4gICAgICByZWxhdGVkUHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgIH1dKTtcclxuICAgIHJldHVybiByZWw7XHJcbiAgfSxcclxufSk7XHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5Nb2RlbHMuRXJwU2hpcG1lbnQuQmFzZScsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=