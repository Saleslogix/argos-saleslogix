define('crm/Integrations/BOE/Models/ErpBillTo/Base', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _lang, _ModelBase2, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('erpBillToModel');
  // const accountResource = getResource('accountModel');
  // const shiptoResource = getResource('erpShipToModel');
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

  var quoteResource = (0, _I18n2.default)('quoteModel');
  var salesorderResource = (0, _I18n2.default)('salesOrderModel');
  var invoiceResource = (0, _I18n2.default)('erpInvoiceModel');
  var returnResource = (0, _I18n2.default)('returnModel');
  var syncresultResource = (0, _I18n2.default)('syncResultModel');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.ErpBillTo.Base', [_ModelBase3.default], {
    contractName: 'dynamic',
    resourceKind: 'erpBillTos',
    entityName: 'ERPBillTo',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    modelName: _Names2.default.ERPBILLTO,
    iconClass: '',
    detailViewId: 'erpbillto_detail',
    listViewId: 'erpbillto_list',
    editViewId: '',
    createPicklists: function createPicklists() {
      return this.picklists || (this.picklists = [{
        name: 'SyncStatus',
        property: 'SyncStatus'
      }]);
    },
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = [
      // TODO: Update with ManyToMany relationship when available in core.
      // {
      //   name: 'Account',
      //   displayName: accountResource.entityDisplayName,
      //   type: 'ManyToMany',
      //   relatedEntity: 'Account',
      //   relatedProperty: 'ErpBillToAccounts.ErpBillTo',
      //   relatedPropertyType: 'object',
      // }, {
      //   name: 'ShipTo',
      //   displayName: shiptoResource.entityDisplayName,
      //   type: 'ManyToMany',
      //   relatedEntity: 'ERPShipTo',
      //   relatedProperty: 'ErpBillToShipTos.ErpBillTo',
      //   relatedPropertyType: 'object',
      // },
      {
        name: 'Quote',
        displayName: quoteResource.entityDisplayName,
        type: 'OneToMany',
        relatedEntity: 'Quote',
        relatedProperty: 'BillTo',
        relatedPropertyType: 'object'
      }, {
        name: 'SalesOrder',
        displayName: salesorderResource.entityDisplayName,
        type: 'OneToMany',
        relatedEntity: 'SalesOrder',
        relatedProperty: 'ErpBillTo',
        relatedPropertyType: 'object'
      }, {
        name: 'Invoice',
        displayName: invoiceResource.entityDisplayName,
        type: 'ManyToOne',
        relatedEntity: 'ERPInvoice',
        relatedProperty: 'ErpBillTo',
        relatedPropertyType: 'object'
      }, {
        name: 'Return',
        displayName: returnResource.entityDisplayName,
        type: 'ManyToOne',
        relatedEntity: 'Return',
        relatedProperty: 'ErpBillTo',
        relatedPropertyType: 'object'
      }, {
        name: 'SyncHistory',
        displayName: syncresultResource.entityDisplayName,
        type: 'OneToMany',
        relatedEntity: 'SyncResult',
        relatedProperty: 'EntityId',
        where: 'EntityType eq "ERPBillTo"'
      }]);
      return rel;
    }
  });
  _lang2.default.setObject('icboe.Models.ErpBillTo.Base', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9FcnBCaWxsVG8vQmFzZS5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsInF1b3RlUmVzb3VyY2UiLCJzYWxlc29yZGVyUmVzb3VyY2UiLCJpbnZvaWNlUmVzb3VyY2UiLCJyZXR1cm5SZXNvdXJjZSIsInN5bmNyZXN1bHRSZXNvdXJjZSIsIl9fY2xhc3MiLCJjb250cmFjdE5hbWUiLCJyZXNvdXJjZUtpbmQiLCJlbnRpdHlOYW1lIiwiZW50aXR5RGlzcGxheU5hbWUiLCJlbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCIsIm1vZGVsTmFtZSIsIkVSUEJJTExUTyIsImljb25DbGFzcyIsImRldGFpbFZpZXdJZCIsImxpc3RWaWV3SWQiLCJlZGl0Vmlld0lkIiwiY3JlYXRlUGlja2xpc3RzIiwicGlja2xpc3RzIiwibmFtZSIsInByb3BlcnR5IiwiY3JlYXRlUmVsYXRpb25zaGlwcyIsInJlbCIsInJlbGF0aW9uc2hpcHMiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJyZWxhdGVkRW50aXR5IiwicmVsYXRlZFByb3BlcnR5IiwicmVsYXRlZFByb3BlcnR5VHlwZSIsIndoZXJlIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkEsTUFBTUEsV0FBVyxvQkFBWSxnQkFBWixDQUFqQjtBQUNBO0FBQ0E7QUF2QkE7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxNQUFNQyxnQkFBZ0Isb0JBQVksWUFBWixDQUF0QjtBQUNBLE1BQU1DLHFCQUFxQixvQkFBWSxpQkFBWixDQUEzQjtBQUNBLE1BQU1DLGtCQUFrQixvQkFBWSxpQkFBWixDQUF4QjtBQUNBLE1BQU1DLGlCQUFpQixvQkFBWSxhQUFaLENBQXZCO0FBQ0EsTUFBTUMscUJBQXFCLG9CQUFZLGlCQUFaLENBQTNCOztBQUVBLE1BQU1DLFVBQVUsdUJBQVEsNENBQVIsRUFBc0QscUJBQXRELEVBQW9FO0FBQ2xGQyxrQkFBYyxTQURvRTtBQUVsRkMsa0JBQWMsWUFGb0U7QUFHbEZDLGdCQUFZLFdBSHNFO0FBSWxGQyx1QkFBbUJWLFNBQVNVLGlCQUpzRDtBQUtsRkMsNkJBQXlCWCxTQUFTVyx1QkFMZ0Q7QUFNbEZDLGVBQVcsZ0JBQVlDLFNBTjJEO0FBT2xGQyxlQUFXLEVBUHVFO0FBUWxGQyxrQkFBYyxrQkFSb0U7QUFTbEZDLGdCQUFZLGdCQVRzRTtBQVVsRkMsZ0JBQVksRUFWc0U7QUFXbEZDLHFCQUFpQixTQUFTQSxlQUFULEdBQTJCO0FBQzFDLGFBQU8sS0FBS0MsU0FBTCxLQUFtQixLQUFLQSxTQUFMLEdBQWlCLENBQUM7QUFDMUNDLGNBQU0sWUFEb0M7QUFFMUNDLGtCQUFVO0FBRmdDLE9BQUQsQ0FBcEMsQ0FBUDtBQUlELEtBaEJpRjtBQWlCbEZDLHlCQUFxQixTQUFTQSxtQkFBVCxHQUErQjtBQUNsRCxVQUFNQyxNQUFNLEtBQUtDLGFBQUwsS0FBdUIsS0FBS0EsYUFBTCxHQUFxQjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFO0FBQ0VKLGNBQU0sT0FEUjtBQUVFSyxxQkFBYXhCLGNBQWNTLGlCQUY3QjtBQUdFZ0IsY0FBTSxXQUhSO0FBSUVDLHVCQUFlLE9BSmpCO0FBS0VDLHlCQUFpQixRQUxuQjtBQU1FQyw2QkFBcUI7QUFOdkIsT0FqQnNELEVBd0JuRDtBQUNEVCxjQUFNLFlBREw7QUFFREsscUJBQWF2QixtQkFBbUJRLGlCQUYvQjtBQUdEZ0IsY0FBTSxXQUhMO0FBSURDLHVCQUFlLFlBSmQ7QUFLREMseUJBQWlCLFdBTGhCO0FBTURDLDZCQUFxQjtBQU5wQixPQXhCbUQsRUErQm5EO0FBQ0RULGNBQU0sU0FETDtBQUVESyxxQkFBYXRCLGdCQUFnQk8saUJBRjVCO0FBR0RnQixjQUFNLFdBSEw7QUFJREMsdUJBQWUsWUFKZDtBQUtEQyx5QkFBaUIsV0FMaEI7QUFNREMsNkJBQXFCO0FBTnBCLE9BL0JtRCxFQXNDbkQ7QUFDRFQsY0FBTSxRQURMO0FBRURLLHFCQUFhckIsZUFBZU0saUJBRjNCO0FBR0RnQixjQUFNLFdBSEw7QUFJREMsdUJBQWUsUUFKZDtBQUtEQyx5QkFBaUIsV0FMaEI7QUFNREMsNkJBQXFCO0FBTnBCLE9BdENtRCxFQTZDbkQ7QUFDRFQsY0FBTSxhQURMO0FBRURLLHFCQUFhcEIsbUJBQW1CSyxpQkFGL0I7QUFHRGdCLGNBQU0sV0FITDtBQUlEQyx1QkFBZSxZQUpkO0FBS0RDLHlCQUFpQixVQUxoQjtBQU1ERSxlQUFPO0FBTk4sT0E3Q21ELENBQTVDLENBQVo7QUFxREEsYUFBT1AsR0FBUDtBQUNEO0FBeEVpRixHQUFwRSxDQUFoQjtBQTBFQSxpQkFBS1EsU0FBTCxDQUFlLDZCQUFmLEVBQThDekIsT0FBOUM7b0JBQ2VBLE8iLCJmaWxlIjoiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBfTW9kZWxCYXNlIGZyb20gJ2FyZ29zL01vZGVscy9fTW9kZWxCYXNlJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uL05hbWVzJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXJwQmlsbFRvTW9kZWwnKTtcclxuLy8gY29uc3QgYWNjb3VudFJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2FjY291bnRNb2RlbCcpO1xyXG4vLyBjb25zdCBzaGlwdG9SZXNvdXJjZSA9IGdldFJlc291cmNlKCdlcnBTaGlwVG9Nb2RlbCcpO1xyXG5jb25zdCBxdW90ZVJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3F1b3RlTW9kZWwnKTtcclxuY29uc3Qgc2FsZXNvcmRlclJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3NhbGVzT3JkZXJNb2RlbCcpO1xyXG5jb25zdCBpbnZvaWNlUmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXJwSW52b2ljZU1vZGVsJyk7XHJcbmNvbnN0IHJldHVyblJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3JldHVybk1vZGVsJyk7XHJcbmNvbnN0IHN5bmNyZXN1bHRSZXNvdXJjZSA9IGdldFJlc291cmNlKCdzeW5jUmVzdWx0TW9kZWwnKTtcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5Nb2RlbHMuRXJwQmlsbFRvLkJhc2UnLCBbX01vZGVsQmFzZV0sIHtcclxuICBjb250cmFjdE5hbWU6ICdkeW5hbWljJyxcclxuICByZXNvdXJjZUtpbmQ6ICdlcnBCaWxsVG9zJyxcclxuICBlbnRpdHlOYW1lOiAnRVJQQmlsbFRvJyxcclxuICBlbnRpdHlEaXNwbGF5TmFtZTogcmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWUsXHJcbiAgZW50aXR5RGlzcGxheU5hbWVQbHVyYWw6IHJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuRVJQQklMTFRPLFxyXG4gIGljb25DbGFzczogJycsXHJcbiAgZGV0YWlsVmlld0lkOiAnZXJwYmlsbHRvX2RldGFpbCcsXHJcbiAgbGlzdFZpZXdJZDogJ2VycGJpbGx0b19saXN0JyxcclxuICBlZGl0Vmlld0lkOiAnJyxcclxuICBjcmVhdGVQaWNrbGlzdHM6IGZ1bmN0aW9uIGNyZWF0ZVBpY2tsaXN0cygpIHtcclxuICAgIHJldHVybiB0aGlzLnBpY2tsaXN0cyB8fCAodGhpcy5waWNrbGlzdHMgPSBbe1xyXG4gICAgICBuYW1lOiAnU3luY1N0YXR1cycsXHJcbiAgICAgIHByb3BlcnR5OiAnU3luY1N0YXR1cycsXHJcbiAgICB9XSk7XHJcbiAgfSxcclxuICBjcmVhdGVSZWxhdGlvbnNoaXBzOiBmdW5jdGlvbiBjcmVhdGVSZWxhdGlvbnNoaXBzKCkge1xyXG4gICAgY29uc3QgcmVsID0gdGhpcy5yZWxhdGlvbnNoaXBzIHx8ICh0aGlzLnJlbGF0aW9uc2hpcHMgPSBbXHJcbiAgICAvLyBUT0RPOiBVcGRhdGUgd2l0aCBNYW55VG9NYW55IHJlbGF0aW9uc2hpcCB3aGVuIGF2YWlsYWJsZSBpbiBjb3JlLlxyXG4gICAgLy8ge1xyXG4gICAgLy8gICBuYW1lOiAnQWNjb3VudCcsXHJcbiAgICAvLyAgIGRpc3BsYXlOYW1lOiBhY2NvdW50UmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWUsXHJcbiAgICAvLyAgIHR5cGU6ICdNYW55VG9NYW55JyxcclxuICAgIC8vICAgcmVsYXRlZEVudGl0eTogJ0FjY291bnQnLFxyXG4gICAgLy8gICByZWxhdGVkUHJvcGVydHk6ICdFcnBCaWxsVG9BY2NvdW50cy5FcnBCaWxsVG8nLFxyXG4gICAgLy8gICByZWxhdGVkUHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgIC8vIH0sIHtcclxuICAgIC8vICAgbmFtZTogJ1NoaXBUbycsXHJcbiAgICAvLyAgIGRpc3BsYXlOYW1lOiBzaGlwdG9SZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZSxcclxuICAgIC8vICAgdHlwZTogJ01hbnlUb01hbnknLFxyXG4gICAgLy8gICByZWxhdGVkRW50aXR5OiAnRVJQU2hpcFRvJyxcclxuICAgIC8vICAgcmVsYXRlZFByb3BlcnR5OiAnRXJwQmlsbFRvU2hpcFRvcy5FcnBCaWxsVG8nLFxyXG4gICAgLy8gICByZWxhdGVkUHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgIC8vIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBuYW1lOiAnUXVvdGUnLFxyXG4gICAgICAgIGRpc3BsYXlOYW1lOiBxdW90ZVJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lLFxyXG4gICAgICAgIHR5cGU6ICdPbmVUb01hbnknLFxyXG4gICAgICAgIHJlbGF0ZWRFbnRpdHk6ICdRdW90ZScsXHJcbiAgICAgICAgcmVsYXRlZFByb3BlcnR5OiAnQmlsbFRvJyxcclxuICAgICAgICByZWxhdGVkUHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTYWxlc09yZGVyJyxcclxuICAgICAgICBkaXNwbGF5TmFtZTogc2FsZXNvcmRlclJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lLFxyXG4gICAgICAgIHR5cGU6ICdPbmVUb01hbnknLFxyXG4gICAgICAgIHJlbGF0ZWRFbnRpdHk6ICdTYWxlc09yZGVyJyxcclxuICAgICAgICByZWxhdGVkUHJvcGVydHk6ICdFcnBCaWxsVG8nLFxyXG4gICAgICAgIHJlbGF0ZWRQcm9wZXJ0eVR5cGU6ICdvYmplY3QnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0ludm9pY2UnLFxyXG4gICAgICAgIGRpc3BsYXlOYW1lOiBpbnZvaWNlUmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWUsXHJcbiAgICAgICAgdHlwZTogJ01hbnlUb09uZScsXHJcbiAgICAgICAgcmVsYXRlZEVudGl0eTogJ0VSUEludm9pY2UnLFxyXG4gICAgICAgIHJlbGF0ZWRQcm9wZXJ0eTogJ0VycEJpbGxUbycsXHJcbiAgICAgICAgcmVsYXRlZFByb3BlcnR5VHlwZTogJ29iamVjdCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnUmV0dXJuJyxcclxuICAgICAgICBkaXNwbGF5TmFtZTogcmV0dXJuUmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWUsXHJcbiAgICAgICAgdHlwZTogJ01hbnlUb09uZScsXHJcbiAgICAgICAgcmVsYXRlZEVudGl0eTogJ1JldHVybicsXHJcbiAgICAgICAgcmVsYXRlZFByb3BlcnR5OiAnRXJwQmlsbFRvJyxcclxuICAgICAgICByZWxhdGVkUHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTeW5jSGlzdG9yeScsXHJcbiAgICAgICAgZGlzcGxheU5hbWU6IHN5bmNyZXN1bHRSZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZSxcclxuICAgICAgICB0eXBlOiAnT25lVG9NYW55JyxcclxuICAgICAgICByZWxhdGVkRW50aXR5OiAnU3luY1Jlc3VsdCcsXHJcbiAgICAgICAgcmVsYXRlZFByb3BlcnR5OiAnRW50aXR5SWQnLFxyXG4gICAgICAgIHdoZXJlOiAnRW50aXR5VHlwZSBlcSBcIkVSUEJpbGxUb1wiJyxcclxuICAgICAgfV0pO1xyXG4gICAgcmV0dXJuIHJlbDtcclxuICB9LFxyXG59KTtcclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLk1vZGVscy5FcnBCaWxsVG8uQmFzZScsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=