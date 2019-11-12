define('crm/Integrations/BOE/Models/ErpShipTo/Base', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _lang, _ModelBase2, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('erpShipToModel');
  // const accountResource = getResource('accountModel');
  // const billtoResource = getResource('erpBillToModel');
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
  var receivableResource = (0, _I18n2.default)('erpReceivableModel');
  var invoiceResource = (0, _I18n2.default)('erpInvoiceModel');
  var returnResource = (0, _I18n2.default)('returnModel');
  var syncresultResource = (0, _I18n2.default)('syncResultModel');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.ErpShipTo.Base', [_ModelBase3.default], {
    contractName: 'dynamic',
    resourceKind: 'erpShipTos',
    entityName: 'ERPShipTo',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    modelName: _Names2.default.ERPSHIPTO,
    iconClass: '',
    detailViewId: '',
    listViewId: 'erpShipto_list',
    editViewId: 'erpShipto_detail',
    createPicklists: function createPicklists() {
      return this.picklists || (this.picklists = [{
        name: 'SyncStatus',
        property: 'SyncStatus'
      }]);
    },
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = [
      // TODO: Update when ManyToMany relationship is supported
      // {
      //   name: 'Account',
      //   displayName: accountResource.entityDisplayName,
      //   type: 'ManyToMany',
      //   relatedEntity: 'Account',
      //   relatedProperty: 'ErpBillToAccounts.ErpBillTo',
      //   relatedPropertyType: 'object',
      // }, {
      //   name: 'BillTo',
      //   displayName: billtoResource.entityDisplayName,
      //   type: 'ManyToMany',
      //   relatedEntity: 'ERPBillTo',
      //   relatedProperty: 'ErpBillToShipTos.ErpShipTo',
      //   relatedPropertyType: 'object',
      // },
      {
        name: 'Quote',
        displayName: quoteResource.entityDisplayName,
        type: 'OneToMany',
        relatedEntity: 'Quote',
        relatedProperty: 'ShipTo',
        relatedPropertyType: 'object'
      }, {
        name: 'SalesOrder',
        displayName: salesorderResource.entityDisplayName,
        type: 'OneToMany',
        relatedEntity: 'SalesOrder',
        relatedProperty: 'ErpShipTo',
        relatedPropertyType: 'object'
      }, {
        name: 'Receivables',
        displayName: receivableResource.entityDisplayName,
        type: 'OneToMany',
        relatedEntity: 'ERPReceivable',
        relatedProperty: 'ErpShipTo',
        relatedPropertyType: 'object'
      }, {
        name: 'Invoice',
        displayName: invoiceResource.entityDisplayName,
        type: 'ManyToOne',
        relatedEntity: 'ERPInvoice',
        relatedProperty: 'ErpShipTo',
        relatedPropertyType: 'object'
      }, {
        name: 'Return',
        displayName: returnResource.entityDisplayName,
        type: 'ManyToOne',
        relatedEntity: 'Return',
        relatedProperty: 'ErpShipTo',
        relatedPropertyType: 'object'
      }, {
        name: 'SyncHistory',
        displayName: syncresultResource.entityDisplayName,
        type: 'OneToMany',
        relatedEntity: 'SyncResult',
        relatedProperty: 'EntityId',
        where: 'EntityType eq "ERPShipTo"'
      }]);
      return rel;
    }
  });
  _lang2.default.setObject('icboe.Models.ErpShipTo.Base', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9FcnBTaGlwVG8vQmFzZS5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsInF1b3RlUmVzb3VyY2UiLCJzYWxlc29yZGVyUmVzb3VyY2UiLCJyZWNlaXZhYmxlUmVzb3VyY2UiLCJpbnZvaWNlUmVzb3VyY2UiLCJyZXR1cm5SZXNvdXJjZSIsInN5bmNyZXN1bHRSZXNvdXJjZSIsIl9fY2xhc3MiLCJjb250cmFjdE5hbWUiLCJyZXNvdXJjZUtpbmQiLCJlbnRpdHlOYW1lIiwiZW50aXR5RGlzcGxheU5hbWUiLCJlbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCIsIm1vZGVsTmFtZSIsIkVSUFNISVBUTyIsImljb25DbGFzcyIsImRldGFpbFZpZXdJZCIsImxpc3RWaWV3SWQiLCJlZGl0Vmlld0lkIiwiY3JlYXRlUGlja2xpc3RzIiwicGlja2xpc3RzIiwibmFtZSIsInByb3BlcnR5IiwiY3JlYXRlUmVsYXRpb25zaGlwcyIsInJlbCIsInJlbGF0aW9uc2hpcHMiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJyZWxhdGVkRW50aXR5IiwicmVsYXRlZFByb3BlcnR5IiwicmVsYXRlZFByb3BlcnR5VHlwZSIsIndoZXJlIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkEsTUFBTUEsV0FBVyxvQkFBWSxnQkFBWixDQUFqQjtBQUNBO0FBQ0E7QUF2QkE7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxNQUFNQyxnQkFBZ0Isb0JBQVksWUFBWixDQUF0QjtBQUNBLE1BQU1DLHFCQUFxQixvQkFBWSxpQkFBWixDQUEzQjtBQUNBLE1BQU1DLHFCQUFxQixvQkFBWSxvQkFBWixDQUEzQjtBQUNBLE1BQU1DLGtCQUFrQixvQkFBWSxpQkFBWixDQUF4QjtBQUNBLE1BQU1DLGlCQUFpQixvQkFBWSxhQUFaLENBQXZCO0FBQ0EsTUFBTUMscUJBQXFCLG9CQUFZLGlCQUFaLENBQTNCOztBQUVBLE1BQU1DLFVBQVUsdUJBQVEsNENBQVIsRUFBc0QscUJBQXRELEVBQW9FO0FBQ2xGQyxrQkFBYyxTQURvRTtBQUVsRkMsa0JBQWMsWUFGb0U7QUFHbEZDLGdCQUFZLFdBSHNFO0FBSWxGQyx1QkFBbUJYLFNBQVNXLGlCQUpzRDtBQUtsRkMsNkJBQXlCWixTQUFTWSx1QkFMZ0Q7QUFNbEZDLGVBQVcsZ0JBQVlDLFNBTjJEO0FBT2xGQyxlQUFXLEVBUHVFO0FBUWxGQyxrQkFBYyxFQVJvRTtBQVNsRkMsZ0JBQVksZ0JBVHNFO0FBVWxGQyxnQkFBWSxrQkFWc0U7QUFXbEZDLHFCQUFpQixTQUFTQSxlQUFULEdBQTJCO0FBQzFDLGFBQU8sS0FBS0MsU0FBTCxLQUFtQixLQUFLQSxTQUFMLEdBQWlCLENBQUM7QUFDMUNDLGNBQU0sWUFEb0M7QUFFMUNDLGtCQUFVO0FBRmdDLE9BQUQsQ0FBcEMsQ0FBUDtBQUlELEtBaEJpRjtBQWlCbEZDLHlCQUFxQixTQUFTQSxtQkFBVCxHQUErQjtBQUNsRCxVQUFNQyxNQUFNLEtBQUtDLGFBQUwsS0FBdUIsS0FBS0EsYUFBTCxHQUFxQjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFO0FBQ0VKLGNBQU0sT0FEUjtBQUVFSyxxQkFBYXpCLGNBQWNVLGlCQUY3QjtBQUdFZ0IsY0FBTSxXQUhSO0FBSUVDLHVCQUFlLE9BSmpCO0FBS0VDLHlCQUFpQixRQUxuQjtBQU1FQyw2QkFBcUI7QUFOdkIsT0FqQnNELEVBd0JuRDtBQUNEVCxjQUFNLFlBREw7QUFFREsscUJBQWF4QixtQkFBbUJTLGlCQUYvQjtBQUdEZ0IsY0FBTSxXQUhMO0FBSURDLHVCQUFlLFlBSmQ7QUFLREMseUJBQWlCLFdBTGhCO0FBTURDLDZCQUFxQjtBQU5wQixPQXhCbUQsRUErQm5EO0FBQ0RULGNBQU0sYUFETDtBQUVESyxxQkFBYXZCLG1CQUFtQlEsaUJBRi9CO0FBR0RnQixjQUFNLFdBSEw7QUFJREMsdUJBQWUsZUFKZDtBQUtEQyx5QkFBaUIsV0FMaEI7QUFNREMsNkJBQXFCO0FBTnBCLE9BL0JtRCxFQXNDbkQ7QUFDRFQsY0FBTSxTQURMO0FBRURLLHFCQUFhdEIsZ0JBQWdCTyxpQkFGNUI7QUFHRGdCLGNBQU0sV0FITDtBQUlEQyx1QkFBZSxZQUpkO0FBS0RDLHlCQUFpQixXQUxoQjtBQU1EQyw2QkFBcUI7QUFOcEIsT0F0Q21ELEVBNkNuRDtBQUNEVCxjQUFNLFFBREw7QUFFREsscUJBQWFyQixlQUFlTSxpQkFGM0I7QUFHRGdCLGNBQU0sV0FITDtBQUlEQyx1QkFBZSxRQUpkO0FBS0RDLHlCQUFpQixXQUxoQjtBQU1EQyw2QkFBcUI7QUFOcEIsT0E3Q21ELEVBb0RuRDtBQUNEVCxjQUFNLGFBREw7QUFFREsscUJBQWFwQixtQkFBbUJLLGlCQUYvQjtBQUdEZ0IsY0FBTSxXQUhMO0FBSURDLHVCQUFlLFlBSmQ7QUFLREMseUJBQWlCLFVBTGhCO0FBTURFLGVBQU87QUFOTixPQXBEbUQsQ0FBNUMsQ0FBWjtBQTREQSxhQUFPUCxHQUFQO0FBQ0Q7QUEvRWlGLEdBQXBFLENBQWhCO0FBaUZBLGlCQUFLUSxTQUFMLENBQWUsNkJBQWYsRUFBOEN6QixPQUE5QztvQkFDZUEsTyIsImZpbGUiOiJCYXNlLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IF9Nb2RlbEJhc2UgZnJvbSAnYXJnb3MvTW9kZWxzL19Nb2RlbEJhc2UnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vTmFtZXMnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdlcnBTaGlwVG9Nb2RlbCcpO1xyXG4vLyBjb25zdCBhY2NvdW50UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYWNjb3VudE1vZGVsJyk7XHJcbi8vIGNvbnN0IGJpbGx0b1Jlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2VycEJpbGxUb01vZGVsJyk7XHJcbmNvbnN0IHF1b3RlUmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgncXVvdGVNb2RlbCcpO1xyXG5jb25zdCBzYWxlc29yZGVyUmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnc2FsZXNPcmRlck1vZGVsJyk7XHJcbmNvbnN0IHJlY2VpdmFibGVSZXNvdXJjZSA9IGdldFJlc291cmNlKCdlcnBSZWNlaXZhYmxlTW9kZWwnKTtcclxuY29uc3QgaW52b2ljZVJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2VycEludm9pY2VNb2RlbCcpO1xyXG5jb25zdCByZXR1cm5SZXNvdXJjZSA9IGdldFJlc291cmNlKCdyZXR1cm5Nb2RlbCcpO1xyXG5jb25zdCBzeW5jcmVzdWx0UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnc3luY1Jlc3VsdE1vZGVsJyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuTW9kZWxzLkVycFNoaXBUby5CYXNlJywgW19Nb2RlbEJhc2VdLCB7XHJcbiAgY29udHJhY3ROYW1lOiAnZHluYW1pYycsXHJcbiAgcmVzb3VyY2VLaW5kOiAnZXJwU2hpcFRvcycsXHJcbiAgZW50aXR5TmFtZTogJ0VSUFNoaXBUbycsXHJcbiAgZW50aXR5RGlzcGxheU5hbWU6IHJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lLFxyXG4gIGVudGl0eURpc3BsYXlOYW1lUGx1cmFsOiByZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLkVSUFNISVBUTyxcclxuICBpY29uQ2xhc3M6ICcnLFxyXG4gIGRldGFpbFZpZXdJZDogJycsXHJcbiAgbGlzdFZpZXdJZDogJ2VycFNoaXB0b19saXN0JyxcclxuICBlZGl0Vmlld0lkOiAnZXJwU2hpcHRvX2RldGFpbCcsXHJcbiAgY3JlYXRlUGlja2xpc3RzOiBmdW5jdGlvbiBjcmVhdGVQaWNrbGlzdHMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5waWNrbGlzdHMgfHwgKHRoaXMucGlja2xpc3RzID0gW3tcclxuICAgICAgbmFtZTogJ1N5bmNTdGF0dXMnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1N5bmNTdGF0dXMnLFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbiAgY3JlYXRlUmVsYXRpb25zaGlwczogZnVuY3Rpb24gY3JlYXRlUmVsYXRpb25zaGlwcygpIHtcclxuICAgIGNvbnN0IHJlbCA9IHRoaXMucmVsYXRpb25zaGlwcyB8fCAodGhpcy5yZWxhdGlvbnNoaXBzID0gW1xyXG4gICAgLy8gVE9ETzogVXBkYXRlIHdoZW4gTWFueVRvTWFueSByZWxhdGlvbnNoaXAgaXMgc3VwcG9ydGVkXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIG5hbWU6ICdBY2NvdW50JyxcclxuICAgIC8vICAgZGlzcGxheU5hbWU6IGFjY291bnRSZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZSxcclxuICAgIC8vICAgdHlwZTogJ01hbnlUb01hbnknLFxyXG4gICAgLy8gICByZWxhdGVkRW50aXR5OiAnQWNjb3VudCcsXHJcbiAgICAvLyAgIHJlbGF0ZWRQcm9wZXJ0eTogJ0VycEJpbGxUb0FjY291bnRzLkVycEJpbGxUbycsXHJcbiAgICAvLyAgIHJlbGF0ZWRQcm9wZXJ0eVR5cGU6ICdvYmplY3QnLFxyXG4gICAgLy8gfSwge1xyXG4gICAgLy8gICBuYW1lOiAnQmlsbFRvJyxcclxuICAgIC8vICAgZGlzcGxheU5hbWU6IGJpbGx0b1Jlc291cmNlLmVudGl0eURpc3BsYXlOYW1lLFxyXG4gICAgLy8gICB0eXBlOiAnTWFueVRvTWFueScsXHJcbiAgICAvLyAgIHJlbGF0ZWRFbnRpdHk6ICdFUlBCaWxsVG8nLFxyXG4gICAgLy8gICByZWxhdGVkUHJvcGVydHk6ICdFcnBCaWxsVG9TaGlwVG9zLkVycFNoaXBUbycsXHJcbiAgICAvLyAgIHJlbGF0ZWRQcm9wZXJ0eVR5cGU6ICdvYmplY3QnLFxyXG4gICAgLy8gfSxcclxuICAgICAge1xyXG4gICAgICAgIG5hbWU6ICdRdW90ZScsXHJcbiAgICAgICAgZGlzcGxheU5hbWU6IHF1b3RlUmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWUsXHJcbiAgICAgICAgdHlwZTogJ09uZVRvTWFueScsXHJcbiAgICAgICAgcmVsYXRlZEVudGl0eTogJ1F1b3RlJyxcclxuICAgICAgICByZWxhdGVkUHJvcGVydHk6ICdTaGlwVG8nLFxyXG4gICAgICAgIHJlbGF0ZWRQcm9wZXJ0eVR5cGU6ICdvYmplY3QnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1NhbGVzT3JkZXInLFxyXG4gICAgICAgIGRpc3BsYXlOYW1lOiBzYWxlc29yZGVyUmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWUsXHJcbiAgICAgICAgdHlwZTogJ09uZVRvTWFueScsXHJcbiAgICAgICAgcmVsYXRlZEVudGl0eTogJ1NhbGVzT3JkZXInLFxyXG4gICAgICAgIHJlbGF0ZWRQcm9wZXJ0eTogJ0VycFNoaXBUbycsXHJcbiAgICAgICAgcmVsYXRlZFByb3BlcnR5VHlwZTogJ29iamVjdCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnUmVjZWl2YWJsZXMnLFxyXG4gICAgICAgIGRpc3BsYXlOYW1lOiByZWNlaXZhYmxlUmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWUsXHJcbiAgICAgICAgdHlwZTogJ09uZVRvTWFueScsXHJcbiAgICAgICAgcmVsYXRlZEVudGl0eTogJ0VSUFJlY2VpdmFibGUnLFxyXG4gICAgICAgIHJlbGF0ZWRQcm9wZXJ0eTogJ0VycFNoaXBUbycsXHJcbiAgICAgICAgcmVsYXRlZFByb3BlcnR5VHlwZTogJ29iamVjdCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnSW52b2ljZScsXHJcbiAgICAgICAgZGlzcGxheU5hbWU6IGludm9pY2VSZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZSxcclxuICAgICAgICB0eXBlOiAnTWFueVRvT25lJyxcclxuICAgICAgICByZWxhdGVkRW50aXR5OiAnRVJQSW52b2ljZScsXHJcbiAgICAgICAgcmVsYXRlZFByb3BlcnR5OiAnRXJwU2hpcFRvJyxcclxuICAgICAgICByZWxhdGVkUHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdSZXR1cm4nLFxyXG4gICAgICAgIGRpc3BsYXlOYW1lOiByZXR1cm5SZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZSxcclxuICAgICAgICB0eXBlOiAnTWFueVRvT25lJyxcclxuICAgICAgICByZWxhdGVkRW50aXR5OiAnUmV0dXJuJyxcclxuICAgICAgICByZWxhdGVkUHJvcGVydHk6ICdFcnBTaGlwVG8nLFxyXG4gICAgICAgIHJlbGF0ZWRQcm9wZXJ0eVR5cGU6ICdvYmplY3QnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1N5bmNIaXN0b3J5JyxcclxuICAgICAgICBkaXNwbGF5TmFtZTogc3luY3Jlc3VsdFJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lLFxyXG4gICAgICAgIHR5cGU6ICdPbmVUb01hbnknLFxyXG4gICAgICAgIHJlbGF0ZWRFbnRpdHk6ICdTeW5jUmVzdWx0JyxcclxuICAgICAgICByZWxhdGVkUHJvcGVydHk6ICdFbnRpdHlJZCcsXHJcbiAgICAgICAgd2hlcmU6ICdFbnRpdHlUeXBlIGVxIFwiRVJQU2hpcFRvXCInLFxyXG4gICAgICB9XSk7XHJcbiAgICByZXR1cm4gcmVsO1xyXG4gIH0sXHJcbn0pO1xyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuTW9kZWxzLkVycFNoaXBUby5CYXNlJywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==