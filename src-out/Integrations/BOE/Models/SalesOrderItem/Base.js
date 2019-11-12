define('crm/Integrations/BOE/Models/SalesOrderItem/Base', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _lang, _ModelBase2, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('salesOrderItemModel'); /* Copyright 2017 Infor
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

  var salesorderResource = (0, _I18n2.default)('salesOrderModel');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.SalesOrderItem.Base', [_ModelBase3.default], {
    contractName: 'dynamic',
    resourceKind: 'salesOrderItems',
    entityName: 'SalesOrderItem',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    modelName: _Names2.default.SALESORDERITEM,
    iconClass: 'bullet-list',
    detailViewId: 'salesorder_item_detail',
    listViewId: 'salessorder_items_list',
    editViewId: 'salesorder_item_edit',
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = [{
        name: 'SalesOrder',
        displayName: salesorderResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'SalesOrder',
        parentPropertyType: 'object',
        relatedEntity: 'SalesOrder'
      }]);
      return rel;
    }
  });
  _lang2.default.setObject('icboe.Models.SalesOrderItem.Base', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9TYWxlc09yZGVySXRlbS9CYXNlLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwic2FsZXNvcmRlclJlc291cmNlIiwiX19jbGFzcyIsImNvbnRyYWN0TmFtZSIsInJlc291cmNlS2luZCIsImVudGl0eU5hbWUiLCJlbnRpdHlEaXNwbGF5TmFtZSIsImVudGl0eURpc3BsYXlOYW1lUGx1cmFsIiwibW9kZWxOYW1lIiwiU0FMRVNPUkRFUklURU0iLCJpY29uQ2xhc3MiLCJkZXRhaWxWaWV3SWQiLCJsaXN0Vmlld0lkIiwiZWRpdFZpZXdJZCIsImNyZWF0ZVJlbGF0aW9uc2hpcHMiLCJyZWwiLCJyZWxhdGlvbnNoaXBzIiwibmFtZSIsImRpc3BsYXlOYW1lIiwidHlwZSIsInBhcmVudFByb3BlcnR5IiwicGFyZW50UHJvcGVydHlUeXBlIiwicmVsYXRlZEVudGl0eSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU1BLFdBQVcsb0JBQVkscUJBQVosQ0FBakIsQyxDQXJCQTs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE1BQU1DLHFCQUFxQixvQkFBWSxpQkFBWixDQUEzQjs7QUFFQSxNQUFNQyxVQUFVLHVCQUFRLGlEQUFSLEVBQTJELHFCQUEzRCxFQUF5RTtBQUN2RkMsa0JBQWMsU0FEeUU7QUFFdkZDLGtCQUFjLGlCQUZ5RTtBQUd2RkMsZ0JBQVksZ0JBSDJFO0FBSXZGQyx1QkFBbUJOLFNBQVNNLGlCQUoyRDtBQUt2RkMsNkJBQXlCUCxTQUFTTyx1QkFMcUQ7QUFNdkZDLGVBQVcsZ0JBQVlDLGNBTmdFO0FBT3ZGQyxlQUFXLGFBUDRFO0FBUXZGQyxrQkFBYyx3QkFSeUU7QUFTdkZDLGdCQUFZLHdCQVQyRTtBQVV2RkMsZ0JBQVksc0JBVjJFO0FBV3ZGQyx5QkFBcUIsU0FBU0EsbUJBQVQsR0FBK0I7QUFDbEQsVUFBTUMsTUFBTSxLQUFLQyxhQUFMLEtBQXVCLEtBQUtBLGFBQUwsR0FBcUIsQ0FBQztBQUN2REMsY0FBTSxZQURpRDtBQUV2REMscUJBQWFqQixtQkFBbUJLLGlCQUZ1QjtBQUd2RGEsY0FBTSxXQUhpRDtBQUl2REMsd0JBQWdCLFlBSnVDO0FBS3ZEQyw0QkFBb0IsUUFMbUM7QUFNdkRDLHVCQUFlO0FBTndDLE9BQUQsQ0FBNUMsQ0FBWjtBQVFBLGFBQU9QLEdBQVA7QUFDRDtBQXJCc0YsR0FBekUsQ0FBaEI7QUF1QkEsaUJBQUtRLFNBQUwsQ0FBZSxrQ0FBZixFQUFtRHJCLE9BQW5EO29CQUNlQSxPIiwiZmlsZSI6IkJhc2UuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgX01vZGVsQmFzZSBmcm9tICdhcmdvcy9Nb2RlbHMvX01vZGVsQmFzZSc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi9OYW1lcyc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3NhbGVzT3JkZXJJdGVtTW9kZWwnKTtcclxuY29uc3Qgc2FsZXNvcmRlclJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3NhbGVzT3JkZXJNb2RlbCcpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLk1vZGVscy5TYWxlc09yZGVySXRlbS5CYXNlJywgW19Nb2RlbEJhc2VdLCB7XHJcbiAgY29udHJhY3ROYW1lOiAnZHluYW1pYycsXHJcbiAgcmVzb3VyY2VLaW5kOiAnc2FsZXNPcmRlckl0ZW1zJyxcclxuICBlbnRpdHlOYW1lOiAnU2FsZXNPcmRlckl0ZW0nLFxyXG4gIGVudGl0eURpc3BsYXlOYW1lOiByZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZSxcclxuICBlbnRpdHlEaXNwbGF5TmFtZVBsdXJhbDogcmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5TQUxFU09SREVSSVRFTSxcclxuICBpY29uQ2xhc3M6ICdidWxsZXQtbGlzdCcsXHJcbiAgZGV0YWlsVmlld0lkOiAnc2FsZXNvcmRlcl9pdGVtX2RldGFpbCcsXHJcbiAgbGlzdFZpZXdJZDogJ3NhbGVzc29yZGVyX2l0ZW1zX2xpc3QnLFxyXG4gIGVkaXRWaWV3SWQ6ICdzYWxlc29yZGVyX2l0ZW1fZWRpdCcsXHJcbiAgY3JlYXRlUmVsYXRpb25zaGlwczogZnVuY3Rpb24gY3JlYXRlUmVsYXRpb25zaGlwcygpIHtcclxuICAgIGNvbnN0IHJlbCA9IHRoaXMucmVsYXRpb25zaGlwcyB8fCAodGhpcy5yZWxhdGlvbnNoaXBzID0gW3tcclxuICAgICAgbmFtZTogJ1NhbGVzT3JkZXInLFxyXG4gICAgICBkaXNwbGF5TmFtZTogc2FsZXNvcmRlclJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lLFxyXG4gICAgICB0eXBlOiAnTWFueVRvT25lJyxcclxuICAgICAgcGFyZW50UHJvcGVydHk6ICdTYWxlc09yZGVyJyxcclxuICAgICAgcGFyZW50UHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ1NhbGVzT3JkZXInLFxyXG4gICAgfV0pO1xyXG4gICAgcmV0dXJuIHJlbDtcclxuICB9LFxyXG59KTtcclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLk1vZGVscy5TYWxlc09yZGVySXRlbS5CYXNlJywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==