define('crm/Integrations/BOE/Models/ErpInvoice/Base', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _lang, _ModelBase2, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('erpInvoiceModel'); /* Copyright 2017 Infor
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
  var invoiceItemResource = (0, _I18n2.default)('erpInvoiceItemModel');
  var receivableResource = (0, _I18n2.default)('erpReceivableModel');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.ErpInvoice.Base', [_ModelBase3.default], {
    contractName: 'dynamic',
    resourceKind: 'erpInvoices',
    entityName: 'ERPInvoice',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    modelName: _Names2.default.ERPINVOICE,
    iconClass: 'document',
    detailViewId: 'invoice_detail',
    listViewId: 'invoice_list',
    editViewId: '',
    createPicklists: function createPicklists() {
      return this.picklists || (this.picklists = [{
        name: 'ErpInvoiceStatus',
        property: 'ErpStatus'
      }]);
    },
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = [{
        name: 'Account',
        displayName: accountResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'Account',
        parentPropertyType: 'object',
        relatedEntity: 'Account'
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
        name: 'InvoiceItem',
        displayName: invoiceItemResource.entityDisplayName,
        type: 'OneToMany',
        relatedEntity: 'ERPInvoiceItem',
        relatedProperty: 'ErpInvoice',
        relatedPropertyType: 'object'
      }, {
        name: 'Receivable',
        displayName: receivableResource.entityDisplayName,
        type: 'OneToMany',
        relatedEntity: 'ERPReceivable',
        relatedProperty: 'ErpInvoice',
        relatedPropertyType: 'object'
      }]);
      return rel;
    }
  });
  _lang2.default.setObject('icboe.Models.ErpInvoice.Base', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9FcnBJbnZvaWNlL0Jhc2UuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJhY2NvdW50UmVzb3VyY2UiLCJiaWxsVG9SZXNvdXJjZSIsInNoaXBUb1Jlc291cmNlIiwiaW52b2ljZUl0ZW1SZXNvdXJjZSIsInJlY2VpdmFibGVSZXNvdXJjZSIsIl9fY2xhc3MiLCJjb250cmFjdE5hbWUiLCJyZXNvdXJjZUtpbmQiLCJlbnRpdHlOYW1lIiwiZW50aXR5RGlzcGxheU5hbWUiLCJlbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCIsIm1vZGVsTmFtZSIsIkVSUElOVk9JQ0UiLCJpY29uQ2xhc3MiLCJkZXRhaWxWaWV3SWQiLCJsaXN0Vmlld0lkIiwiZWRpdFZpZXdJZCIsImNyZWF0ZVBpY2tsaXN0cyIsInBpY2tsaXN0cyIsIm5hbWUiLCJwcm9wZXJ0eSIsImNyZWF0ZVJlbGF0aW9uc2hpcHMiLCJyZWwiLCJyZWxhdGlvbnNoaXBzIiwiZGlzcGxheU5hbWUiLCJ0eXBlIiwicGFyZW50UHJvcGVydHkiLCJwYXJlbnRQcm9wZXJ0eVR5cGUiLCJyZWxhdGVkRW50aXR5IiwicmVsYXRlZFByb3BlcnR5IiwicmVsYXRlZFByb3BlcnR5VHlwZSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU1BLFdBQVcsb0JBQVksaUJBQVosQ0FBakIsQyxDQXJCQTs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE1BQU1DLGtCQUFrQixvQkFBWSxjQUFaLENBQXhCO0FBQ0EsTUFBTUMsaUJBQWlCLG9CQUFZLGdCQUFaLENBQXZCO0FBQ0EsTUFBTUMsaUJBQWlCLG9CQUFZLGdCQUFaLENBQXZCO0FBQ0EsTUFBTUMsc0JBQXNCLG9CQUFZLHFCQUFaLENBQTVCO0FBQ0EsTUFBTUMscUJBQXFCLG9CQUFZLG9CQUFaLENBQTNCOztBQUVBLE1BQU1DLFVBQVUsdUJBQVEsNkNBQVIsRUFBdUQscUJBQXZELEVBQXFFO0FBQ25GQyxrQkFBYyxTQURxRTtBQUVuRkMsa0JBQWMsYUFGcUU7QUFHbkZDLGdCQUFZLFlBSHVFO0FBSW5GQyx1QkFBbUJWLFNBQVNVLGlCQUp1RDtBQUtuRkMsNkJBQXlCWCxTQUFTVyx1QkFMaUQ7QUFNbkZDLGVBQVcsZ0JBQVlDLFVBTjREO0FBT25GQyxlQUFXLFVBUHdFO0FBUW5GQyxrQkFBYyxnQkFScUU7QUFTbkZDLGdCQUFZLGNBVHVFO0FBVW5GQyxnQkFBWSxFQVZ1RTtBQVduRkMscUJBQWlCLFNBQVNBLGVBQVQsR0FBMkI7QUFDMUMsYUFBTyxLQUFLQyxTQUFMLEtBQW1CLEtBQUtBLFNBQUwsR0FBaUIsQ0FBQztBQUMxQ0MsY0FBTSxrQkFEb0M7QUFFMUNDLGtCQUFVO0FBRmdDLE9BQUQsQ0FBcEMsQ0FBUDtBQUlELEtBaEJrRjtBQWlCbkZDLHlCQUFxQixTQUFTQSxtQkFBVCxHQUErQjtBQUNsRCxVQUFNQyxNQUFNLEtBQUtDLGFBQUwsS0FBdUIsS0FBS0EsYUFBTCxHQUFxQixDQUFDO0FBQ3ZESixjQUFNLFNBRGlEO0FBRXZESyxxQkFBYXhCLGdCQUFnQlMsaUJBRjBCO0FBR3ZEZ0IsY0FBTSxXQUhpRDtBQUl2REMsd0JBQWdCLFNBSnVDO0FBS3ZEQyw0QkFBb0IsUUFMbUM7QUFNdkRDLHVCQUFlO0FBTndDLE9BQUQsRUFPckQ7QUFDRFQsY0FBTSxRQURMO0FBRURLLHFCQUFhdkIsZUFBZVEsaUJBRjNCO0FBR0RnQixjQUFNLFdBSEw7QUFJREMsd0JBQWdCLFdBSmY7QUFLREMsNEJBQW9CLFFBTG5CO0FBTURDLHVCQUFlO0FBTmQsT0FQcUQsRUFjckQ7QUFDRFQsY0FBTSxRQURMO0FBRURLLHFCQUFhdEIsZUFBZU8saUJBRjNCO0FBR0RnQixjQUFNLFdBSEw7QUFJREMsd0JBQWdCLFdBSmY7QUFLREMsNEJBQW9CLFFBTG5CO0FBTURDLHVCQUFlO0FBTmQsT0FkcUQsRUFxQnJEO0FBQ0RULGNBQU0sYUFETDtBQUVESyxxQkFBYXJCLG9CQUFvQk0saUJBRmhDO0FBR0RnQixjQUFNLFdBSEw7QUFJREcsdUJBQWUsZ0JBSmQ7QUFLREMseUJBQWlCLFlBTGhCO0FBTURDLDZCQUFxQjtBQU5wQixPQXJCcUQsRUE0QnJEO0FBQ0RYLGNBQU0sWUFETDtBQUVESyxxQkFBYXBCLG1CQUFtQkssaUJBRi9CO0FBR0RnQixjQUFNLFdBSEw7QUFJREcsdUJBQWUsZUFKZDtBQUtEQyx5QkFBaUIsWUFMaEI7QUFNREMsNkJBQXFCO0FBTnBCLE9BNUJxRCxDQUE1QyxDQUFaO0FBb0NBLGFBQU9SLEdBQVA7QUFDRDtBQXZEa0YsR0FBckUsQ0FBaEI7QUF5REEsaUJBQUtTLFNBQUwsQ0FBZSw4QkFBZixFQUErQzFCLE9BQS9DO29CQUNlQSxPIiwiZmlsZSI6IkJhc2UuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgX01vZGVsQmFzZSBmcm9tICdhcmdvcy9Nb2RlbHMvX01vZGVsQmFzZSc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi9OYW1lcyc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2VycEludm9pY2VNb2RlbCcpO1xyXG5jb25zdCBhY2NvdW50UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYWNjb3VudE1vZGVsJyk7XHJcbmNvbnN0IGJpbGxUb1Jlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2VycEJpbGxUb01vZGVsJyk7XHJcbmNvbnN0IHNoaXBUb1Jlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2VycFNoaXBUb01vZGVsJyk7XHJcbmNvbnN0IGludm9pY2VJdGVtUmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXJwSW52b2ljZUl0ZW1Nb2RlbCcpO1xyXG5jb25zdCByZWNlaXZhYmxlUmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXJwUmVjZWl2YWJsZU1vZGVsJyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuTW9kZWxzLkVycEludm9pY2UuQmFzZScsIFtfTW9kZWxCYXNlXSwge1xyXG4gIGNvbnRyYWN0TmFtZTogJ2R5bmFtaWMnLFxyXG4gIHJlc291cmNlS2luZDogJ2VycEludm9pY2VzJyxcclxuICBlbnRpdHlOYW1lOiAnRVJQSW52b2ljZScsXHJcbiAgZW50aXR5RGlzcGxheU5hbWU6IHJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lLFxyXG4gIGVudGl0eURpc3BsYXlOYW1lUGx1cmFsOiByZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLkVSUElOVk9JQ0UsXHJcbiAgaWNvbkNsYXNzOiAnZG9jdW1lbnQnLFxyXG4gIGRldGFpbFZpZXdJZDogJ2ludm9pY2VfZGV0YWlsJyxcclxuICBsaXN0Vmlld0lkOiAnaW52b2ljZV9saXN0JyxcclxuICBlZGl0Vmlld0lkOiAnJyxcclxuICBjcmVhdGVQaWNrbGlzdHM6IGZ1bmN0aW9uIGNyZWF0ZVBpY2tsaXN0cygpIHtcclxuICAgIHJldHVybiB0aGlzLnBpY2tsaXN0cyB8fCAodGhpcy5waWNrbGlzdHMgPSBbe1xyXG4gICAgICBuYW1lOiAnRXJwSW52b2ljZVN0YXR1cycsXHJcbiAgICAgIHByb3BlcnR5OiAnRXJwU3RhdHVzJyxcclxuICAgIH1dKTtcclxuICB9LFxyXG4gIGNyZWF0ZVJlbGF0aW9uc2hpcHM6IGZ1bmN0aW9uIGNyZWF0ZVJlbGF0aW9uc2hpcHMoKSB7XHJcbiAgICBjb25zdCByZWwgPSB0aGlzLnJlbGF0aW9uc2hpcHMgfHwgKHRoaXMucmVsYXRpb25zaGlwcyA9IFt7XHJcbiAgICAgIG5hbWU6ICdBY2NvdW50JyxcclxuICAgICAgZGlzcGxheU5hbWU6IGFjY291bnRSZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZSxcclxuICAgICAgdHlwZTogJ01hbnlUb09uZScsXHJcbiAgICAgIHBhcmVudFByb3BlcnR5OiAnQWNjb3VudCcsXHJcbiAgICAgIHBhcmVudFByb3BlcnR5VHlwZTogJ29iamVjdCcsXHJcbiAgICAgIHJlbGF0ZWRFbnRpdHk6ICdBY2NvdW50JyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ0JpbGxUbycsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiBiaWxsVG9SZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZSxcclxuICAgICAgdHlwZTogJ01hbnlUb09uZScsXHJcbiAgICAgIHBhcmVudFByb3BlcnR5OiAnRXJwQmlsbFRvJyxcclxuICAgICAgcGFyZW50UHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ0VSUEJpbGxUbycsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdTaGlwVG8nLFxyXG4gICAgICBkaXNwbGF5TmFtZTogc2hpcFRvUmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWUsXHJcbiAgICAgIHR5cGU6ICdNYW55VG9PbmUnLFxyXG4gICAgICBwYXJlbnRQcm9wZXJ0eTogJ0VycFNoaXBUbycsXHJcbiAgICAgIHBhcmVudFByb3BlcnR5VHlwZTogJ29iamVjdCcsXHJcbiAgICAgIHJlbGF0ZWRFbnRpdHk6ICdFUlBTaGlwVG8nLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnSW52b2ljZUl0ZW0nLFxyXG4gICAgICBkaXNwbGF5TmFtZTogaW52b2ljZUl0ZW1SZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZSxcclxuICAgICAgdHlwZTogJ09uZVRvTWFueScsXHJcbiAgICAgIHJlbGF0ZWRFbnRpdHk6ICdFUlBJbnZvaWNlSXRlbScsXHJcbiAgICAgIHJlbGF0ZWRQcm9wZXJ0eTogJ0VycEludm9pY2UnLFxyXG4gICAgICByZWxhdGVkUHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ1JlY2VpdmFibGUnLFxyXG4gICAgICBkaXNwbGF5TmFtZTogcmVjZWl2YWJsZVJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lLFxyXG4gICAgICB0eXBlOiAnT25lVG9NYW55JyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ0VSUFJlY2VpdmFibGUnLFxyXG4gICAgICByZWxhdGVkUHJvcGVydHk6ICdFcnBJbnZvaWNlJyxcclxuICAgICAgcmVsYXRlZFByb3BlcnR5VHlwZTogJ29iamVjdCcsXHJcbiAgICB9XSk7XHJcbiAgICByZXR1cm4gcmVsO1xyXG4gIH0sXHJcbn0pO1xyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuTW9kZWxzLkVycEludm9pY2UuQmFzZScsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=