define('crm/Integrations/BOE/Models/ErpInvoiceItem/Base', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _lang, _ModelBase2, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('erpInvoiceItemModel'); /* Copyright 2017 Infor
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

  var invoiceResource = (0, _I18n2.default)('erpInvoiceModel');
  var salesOrderResource = (0, _I18n2.default)('saleOrderModel');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.ErpInvoiceItem.Base', [_ModelBase3.default], {
    contractName: 'dynamic',
    resourceKind: 'erpInvoiceItems',
    entityName: 'ERPInvoiceItem',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    modelName: _Names2.default.ERPINVOICEITEM,
    iconClass: 'bullet-list',
    detailViewId: 'invoice_item_detail',
    listViewId: 'invoice_item_list',
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
  _lang2.default.setObject('icboe.Models.ErpInvoiceItem.Base', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9FcnBJbnZvaWNlSXRlbS9CYXNlLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiaW52b2ljZVJlc291cmNlIiwic2FsZXNPcmRlclJlc291cmNlIiwiX19jbGFzcyIsImNvbnRyYWN0TmFtZSIsInJlc291cmNlS2luZCIsImVudGl0eU5hbWUiLCJlbnRpdHlEaXNwbGF5TmFtZSIsImVudGl0eURpc3BsYXlOYW1lUGx1cmFsIiwibW9kZWxOYW1lIiwiRVJQSU5WT0lDRUlURU0iLCJpY29uQ2xhc3MiLCJkZXRhaWxWaWV3SWQiLCJsaXN0Vmlld0lkIiwiZWRpdFZpZXdJZCIsImNyZWF0ZVJlbGF0aW9uc2hpcHMiLCJyZWwiLCJyZWxhdGlvbnNoaXBzIiwibmFtZSIsImRpc3BsYXlOYW1lIiwidHlwZSIsInBhcmVudFByb3BlcnR5IiwicGFyZW50UHJvcGVydHlUeXBlIiwicmVsYXRlZEVudGl0eSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU1BLFdBQVcsb0JBQVkscUJBQVosQ0FBakIsQyxDQXJCQTs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE1BQU1DLGtCQUFrQixvQkFBWSxpQkFBWixDQUF4QjtBQUNBLE1BQU1DLHFCQUFxQixvQkFBWSxnQkFBWixDQUEzQjs7QUFFQSxNQUFNQyxVQUFVLHVCQUFRLGlEQUFSLEVBQTJELHFCQUEzRCxFQUF5RTtBQUN2RkMsa0JBQWMsU0FEeUU7QUFFdkZDLGtCQUFjLGlCQUZ5RTtBQUd2RkMsZ0JBQVksZ0JBSDJFO0FBSXZGQyx1QkFBbUJQLFNBQVNPLGlCQUoyRDtBQUt2RkMsNkJBQXlCUixTQUFTUSx1QkFMcUQ7QUFNdkZDLGVBQVcsZ0JBQVlDLGNBTmdFO0FBT3ZGQyxlQUFXLGFBUDRFO0FBUXZGQyxrQkFBYyxxQkFSeUU7QUFTdkZDLGdCQUFZLG1CQVQyRTtBQVV2RkMsZ0JBQVksRUFWMkU7QUFXdkZDLHlCQUFxQixTQUFTQSxtQkFBVCxHQUErQjtBQUNsRCxVQUFNQyxNQUFNLEtBQUtDLGFBQUwsS0FBdUIsS0FBS0EsYUFBTCxHQUFxQixDQUFDO0FBQ3ZEQyxjQUFNLFNBRGlEO0FBRXZEQyxxQkFBYWxCLGdCQUFnQk0saUJBRjBCO0FBR3ZEYSxjQUFNLFdBSGlEO0FBSXZEQyx3QkFBZ0IsWUFKdUM7QUFLdkRDLDRCQUFvQixRQUxtQztBQU12REMsdUJBQWU7QUFOd0MsT0FBRCxFQU9yRDtBQUNETCxjQUFNLFlBREw7QUFFREMscUJBQWFqQixtQkFBbUJLLGlCQUYvQjtBQUdEYSxjQUFNLFdBSEw7QUFJREMsd0JBQWdCLFlBSmY7QUFLREMsNEJBQW9CLFFBTG5CO0FBTURDLHVCQUFlO0FBTmQsT0FQcUQsQ0FBNUMsQ0FBWjtBQWVBLGFBQU9QLEdBQVA7QUFDRDtBQTVCc0YsR0FBekUsQ0FBaEI7QUE4QkEsaUJBQUtRLFNBQUwsQ0FBZSxrQ0FBZixFQUFtRHJCLE9BQW5EO29CQUNlQSxPIiwiZmlsZSI6IkJhc2UuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgX01vZGVsQmFzZSBmcm9tICdhcmdvcy9Nb2RlbHMvX01vZGVsQmFzZSc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi9OYW1lcyc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2VycEludm9pY2VJdGVtTW9kZWwnKTtcclxuY29uc3QgaW52b2ljZVJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2VycEludm9pY2VNb2RlbCcpO1xyXG5jb25zdCBzYWxlc09yZGVyUmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnc2FsZU9yZGVyTW9kZWwnKTtcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5Nb2RlbHMuRXJwSW52b2ljZUl0ZW0uQmFzZScsIFtfTW9kZWxCYXNlXSwge1xyXG4gIGNvbnRyYWN0TmFtZTogJ2R5bmFtaWMnLFxyXG4gIHJlc291cmNlS2luZDogJ2VycEludm9pY2VJdGVtcycsXHJcbiAgZW50aXR5TmFtZTogJ0VSUEludm9pY2VJdGVtJyxcclxuICBlbnRpdHlEaXNwbGF5TmFtZTogcmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWUsXHJcbiAgZW50aXR5RGlzcGxheU5hbWVQbHVyYWw6IHJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuRVJQSU5WT0lDRUlURU0sXHJcbiAgaWNvbkNsYXNzOiAnYnVsbGV0LWxpc3QnLFxyXG4gIGRldGFpbFZpZXdJZDogJ2ludm9pY2VfaXRlbV9kZXRhaWwnLFxyXG4gIGxpc3RWaWV3SWQ6ICdpbnZvaWNlX2l0ZW1fbGlzdCcsXHJcbiAgZWRpdFZpZXdJZDogJycsXHJcbiAgY3JlYXRlUmVsYXRpb25zaGlwczogZnVuY3Rpb24gY3JlYXRlUmVsYXRpb25zaGlwcygpIHtcclxuICAgIGNvbnN0IHJlbCA9IHRoaXMucmVsYXRpb25zaGlwcyB8fCAodGhpcy5yZWxhdGlvbnNoaXBzID0gW3tcclxuICAgICAgbmFtZTogJ0ludm9pY2UnLFxyXG4gICAgICBkaXNwbGF5TmFtZTogaW52b2ljZVJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lLFxyXG4gICAgICB0eXBlOiAnTWFueVRvT25lJyxcclxuICAgICAgcGFyZW50UHJvcGVydHk6ICdFcnBJbnZvaWNlJyxcclxuICAgICAgcGFyZW50UHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ0VSUEludm9pY2UnLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnU2FsZXNPcmRlcicsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiBzYWxlc09yZGVyUmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWUsXHJcbiAgICAgIHR5cGU6ICdNYW55VG9PbmUnLFxyXG4gICAgICBwYXJlbnRQcm9wZXJ0eTogJ1NhbGVzT3JkZXInLFxyXG4gICAgICBwYXJlbnRQcm9wZXJ0eVR5cGU6ICdvYmplY3QnLFxyXG4gICAgICByZWxhdGVkRW50aXR5OiAnU2FsZXNPcmRlcicsXHJcbiAgICB9XSk7XHJcbiAgICByZXR1cm4gcmVsO1xyXG4gIH0sXHJcbn0pO1xyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuTW9kZWxzLkVycEludm9pY2VJdGVtLkJhc2UnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19