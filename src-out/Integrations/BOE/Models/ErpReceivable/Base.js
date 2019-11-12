define('crm/Integrations/BOE/Models/ErpReceivable/Base', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _lang, _ModelBase2, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('erpReceivableModel'); /* Copyright 2017 Infor
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
  var billToResource = (0, _I18n2.default)('erpBillToModel');
  var shipToResource = (0, _I18n2.default)('erpShipToModel');
  var receivableItemResource = (0, _I18n2.default)('erpReceivableItemModel');
  var invoiceResource = (0, _I18n2.default)('erpInvoiceModel');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.ErpReceivable.Base', [_ModelBase3.default], {
    contractName: 'dynamic',
    resourceKind: 'erpReceivables',
    entityName: 'ERPReceivable',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    modelName: _Names2.default.ERPRECEIVABLE,
    iconClass: 'checkbox',
    detailViewId: 'erpreceivables_detail',
    listViewId: 'erpreceivables_list',
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
        name: 'Invoice',
        displayName: invoiceResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'ErpInvoice',
        parentPropertyType: 'object',
        relatedEntity: 'ERPInvoice'
      }, {
        name: 'BillTo',
        displayName: billToResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'ErpBillTo',
        parentPropertyType: 'object',
        relatedEntity: 'ERPBillTo'
      }, {
        name: 'ShipTo',
        displayName: shipToResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'ErpShipTo',
        parentPropertyType: 'object',
        relatedEntity: 'ERPShipTo'
      }, {
        name: 'ReceivableItem',
        displayName: receivableItemResource.entityDisplayName,
        type: 'OneToMany',
        relatedEntity: 'ERPReceivableItem',
        relatedProperty: 'ErpReceivable',
        relatedPropertyType: 'object'
      }]);
      return rel;
    }
  });
  _lang2.default.setObject('icboe.Models.ErpReceivable.Base', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9FcnBSZWNlaXZhYmxlL0Jhc2UuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJhY2NvdW50UmVzb3VyY2UiLCJiaWxsVG9SZXNvdXJjZSIsInNoaXBUb1Jlc291cmNlIiwicmVjZWl2YWJsZUl0ZW1SZXNvdXJjZSIsImludm9pY2VSZXNvdXJjZSIsIl9fY2xhc3MiLCJjb250cmFjdE5hbWUiLCJyZXNvdXJjZUtpbmQiLCJlbnRpdHlOYW1lIiwiZW50aXR5RGlzcGxheU5hbWUiLCJlbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCIsIm1vZGVsTmFtZSIsIkVSUFJFQ0VJVkFCTEUiLCJpY29uQ2xhc3MiLCJkZXRhaWxWaWV3SWQiLCJsaXN0Vmlld0lkIiwiZWRpdFZpZXdJZCIsImNyZWF0ZVJlbGF0aW9uc2hpcHMiLCJyZWwiLCJyZWxhdGlvbnNoaXBzIiwibmFtZSIsImRpc3BsYXlOYW1lIiwidHlwZSIsInBhcmVudFByb3BlcnR5IiwicGFyZW50UHJvcGVydHlUeXBlIiwicmVsYXRlZEVudGl0eSIsInJlbGF0ZWRQcm9wZXJ0eSIsInJlbGF0ZWRQcm9wZXJ0eVR5cGUiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQSxNQUFNQSxXQUFXLG9CQUFZLG9CQUFaLENBQWpCLEMsQ0FyQkE7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxNQUFNQyxrQkFBa0Isb0JBQVksY0FBWixDQUF4QjtBQUNBLE1BQU1DLGlCQUFpQixvQkFBWSxnQkFBWixDQUF2QjtBQUNBLE1BQU1DLGlCQUFpQixvQkFBWSxnQkFBWixDQUF2QjtBQUNBLE1BQU1DLHlCQUF5QixvQkFBWSx3QkFBWixDQUEvQjtBQUNBLE1BQU1DLGtCQUFrQixvQkFBWSxpQkFBWixDQUF4Qjs7QUFFQSxNQUFNQyxVQUFVLHVCQUFRLGdEQUFSLEVBQTBELHFCQUExRCxFQUF3RTtBQUN0RkMsa0JBQWMsU0FEd0U7QUFFdEZDLGtCQUFjLGdCQUZ3RTtBQUd0RkMsZ0JBQVksZUFIMEU7QUFJdEZDLHVCQUFtQlYsU0FBU1UsaUJBSjBEO0FBS3RGQyw2QkFBeUJYLFNBQVNXLHVCQUxvRDtBQU10RkMsZUFBVyxnQkFBWUMsYUFOK0Q7QUFPdEZDLGVBQVcsVUFQMkU7QUFRdEZDLGtCQUFjLHVCQVJ3RTtBQVN0RkMsZ0JBQVkscUJBVDBFO0FBVXRGQyxnQkFBWSxFQVYwRTtBQVd0RkMseUJBQXFCLFNBQVNBLG1CQUFULEdBQStCO0FBQ2xELFVBQU1DLE1BQU0sS0FBS0MsYUFBTCxLQUF1QixLQUFLQSxhQUFMLEdBQXFCLENBQUM7QUFDdkRDLGNBQU0sU0FEaUQ7QUFFdkRDLHFCQUFhckIsZ0JBQWdCUyxpQkFGMEI7QUFHdkRhLGNBQU0sV0FIaUQ7QUFJdkRDLHdCQUFnQixTQUp1QztBQUt2REMsNEJBQW9CLFFBTG1DO0FBTXZEQyx1QkFBZTtBQU53QyxPQUFELEVBT3JEO0FBQ0RMLGNBQU0sU0FETDtBQUVEQyxxQkFBYWpCLGdCQUFnQkssaUJBRjVCO0FBR0RhLGNBQU0sV0FITDtBQUlEQyx3QkFBZ0IsWUFKZjtBQUtEQyw0QkFBb0IsUUFMbkI7QUFNREMsdUJBQWU7QUFOZCxPQVBxRCxFQWNyRDtBQUNETCxjQUFNLFFBREw7QUFFREMscUJBQWFwQixlQUFlUSxpQkFGM0I7QUFHRGEsY0FBTSxXQUhMO0FBSURDLHdCQUFnQixXQUpmO0FBS0RDLDRCQUFvQixRQUxuQjtBQU1EQyx1QkFBZTtBQU5kLE9BZHFELEVBcUJyRDtBQUNETCxjQUFNLFFBREw7QUFFREMscUJBQWFuQixlQUFlTyxpQkFGM0I7QUFHRGEsY0FBTSxXQUhMO0FBSURDLHdCQUFnQixXQUpmO0FBS0RDLDRCQUFvQixRQUxuQjtBQU1EQyx1QkFBZTtBQU5kLE9BckJxRCxFQTRCckQ7QUFDREwsY0FBTSxnQkFETDtBQUVEQyxxQkFBYWxCLHVCQUF1Qk0saUJBRm5DO0FBR0RhLGNBQU0sV0FITDtBQUlERyx1QkFBZSxtQkFKZDtBQUtEQyx5QkFBaUIsZUFMaEI7QUFNREMsNkJBQXFCO0FBTnBCLE9BNUJxRCxDQUE1QyxDQUFaO0FBb0NBLGFBQU9ULEdBQVA7QUFDRDtBQWpEcUYsR0FBeEUsQ0FBaEI7QUFtREEsaUJBQUtVLFNBQUwsQ0FBZSxpQ0FBZixFQUFrRHZCLE9BQWxEO29CQUNlQSxPIiwiZmlsZSI6IkJhc2UuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgX01vZGVsQmFzZSBmcm9tICdhcmdvcy9Nb2RlbHMvX01vZGVsQmFzZSc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi9OYW1lcyc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2VycFJlY2VpdmFibGVNb2RlbCcpO1xyXG5jb25zdCBhY2NvdW50UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYWNjb3VudE1vZGVsJyk7XHJcbmNvbnN0IGJpbGxUb1Jlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2VycEJpbGxUb01vZGVsJyk7XHJcbmNvbnN0IHNoaXBUb1Jlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2VycFNoaXBUb01vZGVsJyk7XHJcbmNvbnN0IHJlY2VpdmFibGVJdGVtUmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXJwUmVjZWl2YWJsZUl0ZW1Nb2RlbCcpO1xyXG5jb25zdCBpbnZvaWNlUmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXJwSW52b2ljZU1vZGVsJyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuTW9kZWxzLkVycFJlY2VpdmFibGUuQmFzZScsIFtfTW9kZWxCYXNlXSwge1xyXG4gIGNvbnRyYWN0TmFtZTogJ2R5bmFtaWMnLFxyXG4gIHJlc291cmNlS2luZDogJ2VycFJlY2VpdmFibGVzJyxcclxuICBlbnRpdHlOYW1lOiAnRVJQUmVjZWl2YWJsZScsXHJcbiAgZW50aXR5RGlzcGxheU5hbWU6IHJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lLFxyXG4gIGVudGl0eURpc3BsYXlOYW1lUGx1cmFsOiByZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLkVSUFJFQ0VJVkFCTEUsXHJcbiAgaWNvbkNsYXNzOiAnY2hlY2tib3gnLFxyXG4gIGRldGFpbFZpZXdJZDogJ2VycHJlY2VpdmFibGVzX2RldGFpbCcsXHJcbiAgbGlzdFZpZXdJZDogJ2VycHJlY2VpdmFibGVzX2xpc3QnLFxyXG4gIGVkaXRWaWV3SWQ6ICcnLFxyXG4gIGNyZWF0ZVJlbGF0aW9uc2hpcHM6IGZ1bmN0aW9uIGNyZWF0ZVJlbGF0aW9uc2hpcHMoKSB7XHJcbiAgICBjb25zdCByZWwgPSB0aGlzLnJlbGF0aW9uc2hpcHMgfHwgKHRoaXMucmVsYXRpb25zaGlwcyA9IFt7XHJcbiAgICAgIG5hbWU6ICdBY2NvdW50JyxcclxuICAgICAgZGlzcGxheU5hbWU6IGFjY291bnRSZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZSxcclxuICAgICAgdHlwZTogJ01hbnlUb09uZScsXHJcbiAgICAgIHBhcmVudFByb3BlcnR5OiAnQWNjb3VudCcsXHJcbiAgICAgIHBhcmVudFByb3BlcnR5VHlwZTogJ29iamVjdCcsXHJcbiAgICAgIHJlbGF0ZWRFbnRpdHk6ICdBY2NvdW50JyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ0ludm9pY2UnLFxyXG4gICAgICBkaXNwbGF5TmFtZTogaW52b2ljZVJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lLFxyXG4gICAgICB0eXBlOiAnTWFueVRvT25lJyxcclxuICAgICAgcGFyZW50UHJvcGVydHk6ICdFcnBJbnZvaWNlJyxcclxuICAgICAgcGFyZW50UHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ0VSUEludm9pY2UnLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnQmlsbFRvJyxcclxuICAgICAgZGlzcGxheU5hbWU6IGJpbGxUb1Jlc291cmNlLmVudGl0eURpc3BsYXlOYW1lLFxyXG4gICAgICB0eXBlOiAnTWFueVRvT25lJyxcclxuICAgICAgcGFyZW50UHJvcGVydHk6ICdFcnBCaWxsVG8nLFxyXG4gICAgICBwYXJlbnRQcm9wZXJ0eVR5cGU6ICdvYmplY3QnLFxyXG4gICAgICByZWxhdGVkRW50aXR5OiAnRVJQQmlsbFRvJyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ1NoaXBUbycsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiBzaGlwVG9SZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZSxcclxuICAgICAgdHlwZTogJ01hbnlUb09uZScsXHJcbiAgICAgIHBhcmVudFByb3BlcnR5OiAnRXJwU2hpcFRvJyxcclxuICAgICAgcGFyZW50UHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ0VSUFNoaXBUbycsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdSZWNlaXZhYmxlSXRlbScsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiByZWNlaXZhYmxlSXRlbVJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lLFxyXG4gICAgICB0eXBlOiAnT25lVG9NYW55JyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ0VSUFJlY2VpdmFibGVJdGVtJyxcclxuICAgICAgcmVsYXRlZFByb3BlcnR5OiAnRXJwUmVjZWl2YWJsZScsXHJcbiAgICAgIHJlbGF0ZWRQcm9wZXJ0eVR5cGU6ICdvYmplY3QnLFxyXG4gICAgfV0pO1xyXG4gICAgcmV0dXJuIHJlbDtcclxuICB9LFxyXG59KTtcclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLk1vZGVscy5FcnBSZWNlaXZhYmxlLkJhc2UnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19