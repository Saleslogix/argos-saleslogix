define('crm/Integrations/BOE/Models/SalesOrder/Base', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _lang, _ModelBase2, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('salesOrderModel'); /* Copyright 2017 Infor
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
  var contactResource = (0, _I18n2.default)('contactModel');
  var orderItemsResource = (0, _I18n2.default)('salesOrderItemModel');
  var opportunityResource = (0, _I18n2.default)('opportunityModel');
  var quoteResource = (0, _I18n2.default)('quoteModel');
  var billtoResource = (0, _I18n2.default)('erpBillToModel');
  var shiptoResource = (0, _I18n2.default)('erpShipToModel');
  var syncresultResource = (0, _I18n2.default)('syncResultModel');
  var invoiceitemResource = (0, _I18n2.default)('erpInvoiceItemModel');
  var shipmentitemResource = (0, _I18n2.default)('erpShipmentItemModel');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.SalesOrder.Base', [_ModelBase3.default], {
    contractName: 'dynamic',
    resourceKind: 'salesOrders',
    entityName: 'SalesOrder',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    modelName: _Names2.default.SALESORDER,
    iconClass: 'cart',
    detailViewId: 'salesorder_detail',
    listViewId: 'salesorder_list',
    editViewId: 'salesorder_edit',
    createPicklists: function createPicklists() {
      return this.picklists || (this.picklists = [{
        name: 'SyncStatus',
        property: 'SyncStatus'
      }, {
        name: 'ErpSalesOrderStatus',
        property: 'ERPSalesOrder.ERPStatus'
      }]);
    },
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = [{
        name: 'Account',
        displayName: accountResource.entityDisplayNamePlural,
        type: 'ManyToOne',
        relatedEntity: 'Account',
        parentProperty: 'Account',
        parentPropertyType: 'object'
      }, {
        name: 'RequestedBy',
        displayName: contactResource.entityDisplayNamePlural,
        type: 'ManyToOne',
        relatedEntity: 'Contact',
        parentProperty: 'RequestedBy',
        parentPropertyType: 'object'
      }, {
        name: 'Opportunity',
        displayName: opportunityResource.entityDisplayNamePlural,
        type: 'ManyToOne',
        relatedEntity: 'Opportunity',
        parentProperty: 'Opportunity',
        parentPropertyType: 'object'
      }, {
        name: 'Quote',
        displayName: quoteResource.entityDisplayNamePlural,
        type: 'ManyToOne',
        relatedEntity: 'Quote',
        parentProperty: 'Quote',
        parentPropertyType: 'object'
      }, {
        name: 'BillTo',
        displayName: billtoResource.entityDisplayNamePlural,
        type: 'ManyToOne',
        relatedEntity: 'ERPBillTo',
        parentProperty: 'ErpBillTo',
        parentPropertyType: 'object'
      }, {
        name: 'ShipTo',
        displayName: shiptoResource.entityDisplayNamePlural,
        type: 'ManyToOne',
        relatedEntity: 'ERPShipTo',
        parentProperty: 'ErpShipTo',
        parentPropertyType: 'object'
      }, {
        name: 'OrderItem',
        displayName: orderItemsResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'SalesOrderItem',
        relatedProperty: 'SalesOrder',
        relatedPropertyType: 'object'
      }, {
        name: 'InvoiceItem',
        displayName: invoiceitemResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'ERPInvoiceItem',
        relatedProperty: 'SalesOrder',
        relatedPropertyType: 'object'
      }, {
        name: 'ShipmentItem',
        displayName: shipmentitemResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'ERPShipmentItem',
        relatedProperty: 'SalesOrder',
        relatedPropertyType: 'object'
      }, {
        name: 'SyncHistory',
        displayName: syncresultResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'SyncResult',
        relatedProperty: 'EntityId',
        where: 'EntityType eq "SalesOrder"'
      }]);
      return rel;
    }
  });
  _lang2.default.setObject('icboe.Models.SalesOrder.Base', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9TYWxlc09yZGVyL0Jhc2UuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJhY2NvdW50UmVzb3VyY2UiLCJjb250YWN0UmVzb3VyY2UiLCJvcmRlckl0ZW1zUmVzb3VyY2UiLCJvcHBvcnR1bml0eVJlc291cmNlIiwicXVvdGVSZXNvdXJjZSIsImJpbGx0b1Jlc291cmNlIiwic2hpcHRvUmVzb3VyY2UiLCJzeW5jcmVzdWx0UmVzb3VyY2UiLCJpbnZvaWNlaXRlbVJlc291cmNlIiwic2hpcG1lbnRpdGVtUmVzb3VyY2UiLCJfX2NsYXNzIiwiY29udHJhY3ROYW1lIiwicmVzb3VyY2VLaW5kIiwiZW50aXR5TmFtZSIsImVudGl0eURpc3BsYXlOYW1lIiwiZW50aXR5RGlzcGxheU5hbWVQbHVyYWwiLCJtb2RlbE5hbWUiLCJTQUxFU09SREVSIiwiaWNvbkNsYXNzIiwiZGV0YWlsVmlld0lkIiwibGlzdFZpZXdJZCIsImVkaXRWaWV3SWQiLCJjcmVhdGVQaWNrbGlzdHMiLCJwaWNrbGlzdHMiLCJuYW1lIiwicHJvcGVydHkiLCJjcmVhdGVSZWxhdGlvbnNoaXBzIiwicmVsIiwicmVsYXRpb25zaGlwcyIsImRpc3BsYXlOYW1lIiwidHlwZSIsInJlbGF0ZWRFbnRpdHkiLCJwYXJlbnRQcm9wZXJ0eSIsInBhcmVudFByb3BlcnR5VHlwZSIsInJlbGF0ZWRQcm9wZXJ0eSIsInJlbGF0ZWRQcm9wZXJ0eVR5cGUiLCJ3aGVyZSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU1BLFdBQVcsb0JBQVksaUJBQVosQ0FBakIsQyxDQXJCQTs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE1BQU1DLGtCQUFrQixvQkFBWSxjQUFaLENBQXhCO0FBQ0EsTUFBTUMsa0JBQWtCLG9CQUFZLGNBQVosQ0FBeEI7QUFDQSxNQUFNQyxxQkFBcUIsb0JBQVkscUJBQVos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QUxoQjtBQU1EQyw2QkFBcUI7QUFOcEIsT0FqRHFELEVBd0RyRDtBQUNEWCxjQUFNLGNBREw7QUFFREsscUJBQWFwQixxQkFBcUJNLHVCQUZqQztBQUdEZSxjQUFNLFdBSEw7QUFJREMsdUJBQWUsaUJBSmQ7QUFLREcseUJBQWlCLFlBTGhCO0FBTURDLDZCQUFxQjtBQU5wQixPQXhEcUQsRUErRHJEO0FBQ0RYLGNBQU0sYUFETDtBQUVESyxxQkFBYXRCLG1CQUFtQlEsdUJBRi9CO0FBR0RlLGNBQU0sV0FITDtBQUlEQyx1QkFBZSxZQUpkO0FBS0RHLHlCQUFpQixVQUxoQjtBQU1ERSxlQUFPO0FBTk4sT0EvRHFELENBQTVDLENBQVo7QUF3RUEsYUFBT1QsR0FBUDtBQUNEO0FBOUZrRixHQUFyRSxDQUFoQjtBQWdHQSxpQkFBS1UsU0FBTCxDQUFlLDhCQUFmLEVBQStDM0IsT0FBL0M7b0JBQ2VBLE8iLCJmaWxlIjoiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBfTW9kZWxCYXNlIGZyb20gJ2FyZ29zL01vZGVscy9fTW9kZWxCYXNlJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uL05hbWVzJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnc2FsZXNPcmRlck1vZGVsJyk7XHJcbmNvbnN0IGFjY291bnRSZXNvdXJjZSA9IGdldFJlc291cmNlKCdhY2NvdW50TW9kZWwnKTtcclxuY29uc3QgY29udGFjdFJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2NvbnRhY3RNb2RlbCcpO1xyXG5jb25zdCBvcmRlckl0ZW1zUmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnc2FsZXNPcmRlckl0ZW1Nb2RlbCcpO1xyXG5jb25zdCBvcHBvcnR1bml0eVJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ29wcG9ydHVuaXR5TW9kZWwnKTtcclxuY29uc3QgcXVvdGVSZXNvdXJjZSA9IGdldFJlc291cmNlKCdxdW90ZU1vZGVsJyk7XHJcbmNvbnN0IGJpbGx0b1Jlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2VycEJpbGxUb01vZGVsJyk7XHJcbmNvbnN0IHNoaXB0b1Jlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2VycFNoaXBUb01vZGVsJyk7XHJcbmNvbnN0IHN5bmNyZXN1bHRSZXNvdXJjZSA9IGdldFJlc291cmNlKCdzeW5jUmVzdWx0TW9kZWwnKTtcclxuY29uc3QgaW52b2ljZWl0ZW1SZXNvdXJjZSA9IGdldFJlc291cmNlKCdlcnBJbnZvaWNlSXRlbU1vZGVsJyk7XHJcbmNvbnN0IHNoaXBtZW50aXRlbVJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2VycFNoaXBtZW50SXRlbU1vZGVsJyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuTW9kZWxzLlNhbGVzT3JkZXIuQmFzZScsIFtfTW9kZWxCYXNlXSwge1xyXG4gIGNvbnRyYWN0TmFtZTogJ2R5bmFtaWMnLFxyXG4gIHJlc291cmNlS2luZDogJ3NhbGVzT3JkZXJzJyxcclxuICBlbnRpdHlOYW1lOiAnU2FsZXNPcmRlcicsXHJcbiAgZW50aXR5RGlzcGxheU5hbWU6IHJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lLFxyXG4gIGVudGl0eURpc3BsYXlOYW1lUGx1cmFsOiByZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLlNBTEVTT1JERVIsXHJcbiAgaWNvbkNsYXNzOiAnY2FydCcsXHJcbiAgZGV0YWlsVmlld0lkOiAnc2FsZXNvcmRlcl9kZXRhaWwnLFxyXG4gIGxpc3RWaWV3SWQ6ICdzYWxlc29yZGVyX2xpc3QnLFxyXG4gIGVkaXRWaWV3SWQ6ICdzYWxlc29yZGVyX2VkaXQnLFxyXG4gIGNyZWF0ZVBpY2tsaXN0czogZnVuY3Rpb24gY3JlYXRlUGlja2xpc3RzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucGlja2xpc3RzIHx8ICh0aGlzLnBpY2tsaXN0cyA9IFt7XHJcbiAgICAgIG5hbWU6ICdTeW5jU3RhdHVzJyxcclxuICAgICAgcHJvcGVydHk6ICdTeW5jU3RhdHVzJyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ0VycFNhbGVzT3JkZXJTdGF0dXMnLFxyXG4gICAgICBwcm9wZXJ0eTogJ0VSUFNhbGVzT3JkZXIuRVJQU3RhdHVzJyxcclxuICAgIH1dKTtcclxuICB9LFxyXG4gIGNyZWF0ZVJlbGF0aW9uc2hpcHM6IGZ1bmN0aW9uIGNyZWF0ZVJlbGF0aW9uc2hpcHMoKSB7XHJcbiAgICBjb25zdCByZWwgPSB0aGlzLnJlbGF0aW9uc2hpcHMgfHwgKHRoaXMucmVsYXRpb25zaGlwcyA9IFt7XHJcbiAgICAgIG5hbWU6ICdBY2NvdW50JyxcclxuICAgICAgZGlzcGxheU5hbWU6IGFjY291bnRSZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICAgICAgdHlwZTogJ01hbnlUb09uZScsXHJcbiAgICAgIHJlbGF0ZWRFbnRpdHk6ICdBY2NvdW50JyxcclxuICAgICAgcGFyZW50UHJvcGVydHk6ICdBY2NvdW50JyxcclxuICAgICAgcGFyZW50UHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ1JlcXVlc3RlZEJ5JyxcclxuICAgICAgZGlzcGxheU5hbWU6IGNvbnRhY3RSZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICAgICAgdHlwZTogJ01hbnlUb09uZScsXHJcbiAgICAgIHJlbGF0ZWRFbnRpdHk6ICdDb250YWN0JyxcclxuICAgICAgcGFyZW50UHJvcGVydHk6ICdSZXF1ZXN0ZWRCeScsXHJcbiAgICAgIHBhcmVudFByb3BlcnR5VHlwZTogJ29iamVjdCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdPcHBvcnR1bml0eScsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiBvcHBvcnR1bml0eVJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gICAgICB0eXBlOiAnTWFueVRvT25lJyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ09wcG9ydHVuaXR5JyxcclxuICAgICAgcGFyZW50UHJvcGVydHk6ICdPcHBvcnR1bml0eScsXHJcbiAgICAgIHBhcmVudFByb3BlcnR5VHlwZTogJ29iamVjdCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdRdW90ZScsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiBxdW90ZVJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gICAgICB0eXBlOiAnTWFueVRvT25lJyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ1F1b3RlJyxcclxuICAgICAgcGFyZW50UHJvcGVydHk6ICdRdW90ZScsXHJcbiAgICAgIHBhcmVudFByb3BlcnR5VHlwZTogJ29iamVjdCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdCaWxsVG8nLFxyXG4gICAgICBkaXNwbGF5TmFtZTogYmlsbHRvUmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgICAgIHR5cGU6ICdNYW55VG9PbmUnLFxyXG4gICAgICByZWxhdGVkRW50aXR5OiAnRVJQQmlsbFRvJyxcclxuICAgICAgcGFyZW50UHJvcGVydHk6ICdFcnBCaWxsVG8nLFxyXG4gICAgICBwYXJlbnRQcm9wZXJ0eVR5cGU6ICdvYmplY3QnLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnU2hpcFRvJyxcclxuICAgICAgZGlzcGxheU5hbWU6IHNoaXB0b1Jlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gICAgICB0eXBlOiAnTWFueVRvT25lJyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ0VSUFNoaXBUbycsXHJcbiAgICAgIHBhcmVudFByb3BlcnR5OiAnRXJwU2hpcFRvJyxcclxuICAgICAgcGFyZW50UHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ09yZGVySXRlbScsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiBvcmRlckl0ZW1zUmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgICAgIHR5cGU6ICdPbmVUb01hbnknLFxyXG4gICAgICByZWxhdGVkRW50aXR5OiAnU2FsZXNPcmRlckl0ZW0nLFxyXG4gICAgICByZWxhdGVkUHJvcGVydHk6ICdTYWxlc09yZGVyJyxcclxuICAgICAgcmVsYXRlZFByb3BlcnR5VHlwZTogJ29iamVjdCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdJbnZvaWNlSXRlbScsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiBpbnZvaWNlaXRlbVJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gICAgICB0eXBlOiAnT25lVG9NYW55JyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ0VSUEludm9pY2VJdGVtJyxcclxuICAgICAgcmVsYXRlZFByb3BlcnR5OiAnU2FsZXNPcmRlcicsXHJcbiAgICAgIHJlbGF0ZWRQcm9wZXJ0eVR5cGU6ICdvYmplY3QnLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnU2hpcG1lbnRJdGVtJyxcclxuICAgICAgZGlzcGxheU5hbWU6IHNoaXBtZW50aXRlbVJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gICAgICB0eXBlOiAnT25lVG9NYW55JyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ0VSUFNoaXBtZW50SXRlbScsXHJcbiAgICAgIHJlbGF0ZWRQcm9wZXJ0eTogJ1NhbGVzT3JkZXInLFxyXG4gICAgICByZWxhdGVkUHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ1N5bmNIaXN0b3J5JyxcclxuICAgICAgZGlzcGxheU5hbWU6IHN5bmNyZXN1bHRSZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICAgICAgdHlwZTogJ09uZVRvTWFueScsXHJcbiAgICAgIHJlbGF0ZWRFbnRpdHk6ICdTeW5jUmVzdWx0JyxcclxuICAgICAgcmVsYXRlZFByb3BlcnR5OiAnRW50aXR5SWQnLFxyXG4gICAgICB3aGVyZTogJ0VudGl0eVR5cGUgZXEgXCJTYWxlc09yZGVyXCInLFxyXG4gICAgfSxcclxuICAgIF0pO1xyXG4gICAgcmV0dXJuIHJlbDtcclxuICB9LFxyXG59KTtcclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLk1vZGVscy5TYWxlc09yZGVyLkJhc2UnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19