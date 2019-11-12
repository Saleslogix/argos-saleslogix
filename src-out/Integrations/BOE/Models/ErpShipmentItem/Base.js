define('crm/Integrations/BOE/Models/ErpShipmentItem/Base', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _lang, _ModelBase2, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('erpShipmentItemModel'); /* Copyright 2017 Infor
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

  var shipmentResource = (0, _I18n2.default)('erpShipmentModel');
  var salesOrderResource = (0, _I18n2.default)('salesOrderModel');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.ErpShipmentItem.Base', [_ModelBase3.default], {
    contractName: 'dynamic',
    resourceKind: 'erpShipmentItems',
    entityName: 'ERPShipmentItem',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    modelName: _Names2.default.ERPSHIPMENTITEM,
    iconClass: 'warehouse',
    detailViewId: 'erpshipment_items_detail',
    listViewId: 'erpshipment_items_list',
    editViewId: '',
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = [{
        name: 'Shipment',
        displayName: shipmentResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'ErpShipment',
        parentPropertyType: 'object',
        relatedEntity: 'ERPShipment'
      }, {
        name: 'SalesOrder',
        displayName: salesOrderResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'SalesOrder',
        parentPropertyType: 'object',
        relatedEntity: 'SalesOrder'
      }]);
      return rel;
    }
  });
  _lang2.default.setObject('icboe.Models.ErpShipmentItem.Base', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9FcnBTaGlwbWVudEl0ZW0vQmFzZS5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsInNoaXBtZW50UmVzb3VyY2UiLCJzYWxlc09yZGVyUmVzb3VyY2UiLCJfX2NsYXNzIiwiY29udHJhY3ROYW1lIiwicmVzb3VyY2VLaW5kIiwiZW50aXR5TmFtZSIsImVudGl0eURpc3BsYXlOYW1lIiwiZW50aXR5RGlzcGxheU5hbWVQbHVyYWwiLCJtb2RlbE5hbWUiLCJFUlBTSElQTUVOVElURU0iLCJpY29uQ2xhc3MiLCJkZXRhaWxWaWV3SWQiLCJsaXN0Vmlld0lkIiwiZWRpdFZpZXdJZCIsImNyZWF0ZVJlbGF0aW9uc2hpcHMiLCJyZWwiLCJyZWxhdGlvbnNoaXBzIiwibmFtZSIsImRpc3BsYXlOYW1lIiwidHlwZSIsInBhcmVudFByb3BlcnR5IiwicGFyZW50UHJvcGVydHlUeXBlIiwicmVsYXRlZEVudGl0eSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU1BLFdBQVcsb0JBQVksc0JBQVosQ0FBakIsQyxDQXJCQTs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE1BQU1DLG1CQUFtQixvQkFBWSxrQkFBWixDQUF6QjtBQUNBLE1BQU1DLHFCQUFxQixvQkFBWSxpQkFBWixDQUEzQjs7QUFFQSxNQUFNQyxVQUFVLHVCQUFRLGtEQUFSLEVBQTRELHFCQUE1RCxFQUEwRTtBQUN4RkMsa0JBQWMsU0FEMEU7QUFFeEZDLGtCQUFjLGtCQUYwRTtBQUd4RkMsZ0JBQVksaUJBSDRFO0FBSXhGQyx1QkFBbUJQLFNBQVNPLGlCQUo0RDtBQUt4RkMsNkJBQXlCUixTQUFTUSx1QkFMc0Q7QUFNeEZDLGVBQVcsZ0JBQVlDLGVBTmlFO0FBT3hGQyxlQUFXLFdBUDZFO0FBUXhGQyxrQkFBYywwQkFSMEU7QUFTeEZDLGdCQUFZLHdCQVQ0RTtBQVV4RkMsZ0JBQVksRUFWNEU7QUFXeEZDLHlCQUFxQixTQUFTQSxtQkFBVCxHQUErQjtBQUNsRCxVQUFNQyxNQUFNLEtBQUtDLGFBQUwsS0FBdUIsS0FBS0EsYUFBTCxHQUFxQixDQUFDO0FBQ3ZEQyxjQUFNLFVBRGlEO0FBRXZEQyxxQkFBYWxCLGlCQUFpQk0saUJBRnlCO0FBR3ZEYSxjQUFNLFdBSGlEO0FBSXZEQyx3QkFBZ0IsYUFKdUM7QUFLdkRDLDRCQUFvQixRQUxtQztBQU12REMsdUJBQWU7QUFOd0MsT0FBRCxFQU9yRDtBQUNETCxjQUFNLFlBREw7QUFFREMscUJBQWFqQixtQkFBbUJLLGlCQUYvQjtBQUdEYSxjQUFNLFdBSEw7QUFJREMsd0JBQWdCLFlBSmY7QUFLREMsNEJBQW9CLFFBTG5CO0FBTURDLHVCQUFlO0FBTmQsT0FQcUQsQ0FBNUMsQ0FBWjtBQWVBLGFBQU9QLEdBQVA7QUFDRDtBQTVCdUYsR0FBMUUsQ0FBaEI7QUE4QkEsaUJBQUtRLFNBQUwsQ0FBZSxtQ0FBZixFQUFvRHJCLE9BQXBEO29CQUNlQSxPIiwiZmlsZSI6IkJhc2UuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgX01vZGVsQmFzZSBmcm9tICdhcmdvcy9Nb2RlbHMvX01vZGVsQmFzZSc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi9OYW1lcyc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2VycFNoaXBtZW50SXRlbU1vZGVsJyk7XHJcbmNvbnN0IHNoaXBtZW50UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXJwU2hpcG1lbnRNb2RlbCcpO1xyXG5jb25zdCBzYWxlc09yZGVyUmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnc2FsZXNPcmRlck1vZGVsJyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuTW9kZWxzLkVycFNoaXBtZW50SXRlbS5CYXNlJywgW19Nb2RlbEJhc2VdLCB7XHJcbiAgY29udHJhY3ROYW1lOiAnZHluYW1pYycsXHJcbiAgcmVzb3VyY2VLaW5kOiAnZXJwU2hpcG1lbnRJdGVtcycsXHJcbiAgZW50aXR5TmFtZTogJ0VSUFNoaXBtZW50SXRlbScsXHJcbiAgZW50aXR5RGlzcGxheU5hbWU6IHJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lLFxyXG4gIGVudGl0eURpc3BsYXlOYW1lUGx1cmFsOiByZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLkVSUFNISVBNRU5USVRFTSxcclxuICBpY29uQ2xhc3M6ICd3YXJlaG91c2UnLFxyXG4gIGRldGFpbFZpZXdJZDogJ2VycHNoaXBtZW50X2l0ZW1zX2RldGFpbCcsXHJcbiAgbGlzdFZpZXdJZDogJ2VycHNoaXBtZW50X2l0ZW1zX2xpc3QnLFxyXG4gIGVkaXRWaWV3SWQ6ICcnLFxyXG4gIGNyZWF0ZVJlbGF0aW9uc2hpcHM6IGZ1bmN0aW9uIGNyZWF0ZVJlbGF0aW9uc2hpcHMoKSB7XHJcbiAgICBjb25zdCByZWwgPSB0aGlzLnJlbGF0aW9uc2hpcHMgfHwgKHRoaXMucmVsYXRpb25zaGlwcyA9IFt7XHJcbiAgICAgIG5hbWU6ICdTaGlwbWVudCcsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiBzaGlwbWVudFJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lLFxyXG4gICAgICB0eXBlOiAnTWFueVRvT25lJyxcclxuICAgICAgcGFyZW50UHJvcGVydHk6ICdFcnBTaGlwbWVudCcsXHJcbiAgICAgIHBhcmVudFByb3BlcnR5VHlwZTogJ29iamVjdCcsXHJcbiAgICAgIHJlbGF0ZWRFbnRpdHk6ICdFUlBTaGlwbWVudCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdTYWxlc09yZGVyJyxcclxuICAgICAgZGlzcGxheU5hbWU6IHNhbGVzT3JkZXJSZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZSxcclxuICAgICAgdHlwZTogJ01hbnlUb09uZScsXHJcbiAgICAgIHBhcmVudFByb3BlcnR5OiAnU2FsZXNPcmRlcicsXHJcbiAgICAgIHBhcmVudFByb3BlcnR5VHlwZTogJ29iamVjdCcsXHJcbiAgICAgIHJlbGF0ZWRFbnRpdHk6ICdTYWxlc09yZGVyJyxcclxuICAgIH1dKTtcclxuICAgIHJldHVybiByZWw7XHJcbiAgfSxcclxufSk7XHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5Nb2RlbHMuRXJwU2hpcG1lbnRJdGVtLkJhc2UnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19