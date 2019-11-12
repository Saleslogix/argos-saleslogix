define('crm/Integrations/BOE/Models/Quote/Base', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _lang, _ModelBase2, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('quoteModel'); /* Copyright 2017 Infor
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
  var quoteItemsResource = (0, _I18n2.default)('quoteItemModel');
  var opportunityResource = (0, _I18n2.default)('opportunityModel');
  var salesorderResource = (0, _I18n2.default)('salesOrderModel');
  var billtoResource = (0, _I18n2.default)('erpBillToModel');
  var shiptoResource = (0, _I18n2.default)('erpShipToModel');
  var syncresultResource = (0, _I18n2.default)('syncResultModel');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.Quote.Base', [_ModelBase3.default], {
    contractName: 'dynamic',
    resourceKind: 'quotes',
    entityName: 'Quote',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    modelName: _Names2.default.QUOTE,
    iconClass: 'document',
    detailViewId: 'quote_detail',
    listViewId: 'quote_list',
    editViewId: 'quote_edit',
    createPicklists: function createPicklists() {
      return this.picklists || (this.picklists = [{
        name: 'SyncStatus',
        property: 'SyncStatus'
      }, {
        name: 'ErpQuoteStatus',
        property: 'ErpStatus'
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
        name: 'SalesOrder',
        displayName: salesorderResource.entityDisplayNamePlural,
        type: 'ManyToOne',
        relatedEntity: 'SalesOrder',
        parentProperty: 'SalesOrder',
        parentPropertyType: 'object'
      }, {
        name: 'BillTo',
        displayName: billtoResource.entityDisplayNamePlural,
        type: 'ManyToOne',
        relatedEntity: 'ERPBillTo',
        parentProperty: 'BillTo',
        parentPropertyType: 'object'
      }, {
        name: 'ShipTo',
        displayName: shiptoResource.entityDisplayNamePlural,
        type: 'ManyToOne',
        relatedEntity: 'ERPShipTo',
        parentProperty: 'ShipTo',
        parentPropertyType: 'object'
      }, {
        name: 'QuoteItem',
        displayName: quoteItemsResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'QuoteItem',
        relatedProperty: 'Quote',
        relatedPropertyType: 'object'
      }, {
        name: 'SyncHistory',
        displayName: syncresultResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'SyncResult',
        relatedProperty: 'EntityId',
        where: 'EntityType eq "Quote"'
      }]);
      return rel;
    }
  });
  _lang2.default.setObject('icboe.Models.Quote.Base', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9RdW90ZS9CYXNlLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiYWNjb3VudFJlc291cmNlIiwiY29udGFjdFJlc291cmNlIiwicXVvdGVJdGVtc1Jlc291cmNlIiwib3Bwb3J0dW5pdHlSZXNvdXJjZSIsInNhbGVzb3JkZXJSZXNvdXJjZSIsImJpbGx0b1Jlc291cmNlIiwic2hpcHRvUmVzb3VyY2UiLCJzeW5jcmVzdWx0UmVzb3VyY2UiLCJfX2NsYXNzIiwiY29udHJhY3ROYW1lIiwicmVzb3VyY2VLaW5kIiwiZW50aXR5TmFtZSIsImVudGl0eURpc3BsYXlOYW1lIiwiZW50aXR5RGlzcGxheU5hbWVQbHVyYWwiLCJtb2RlbE5hbWUiLCJRVU9URSIsImljb25DbGFzcyIsImRldGFpbFZpZXdJZCIsImxpc3RWaWV3SWQiLCJlZGl0Vmlld0lkIiwiY3JlYXRlUGlja2xpc3RzIiwicGlja2xpc3RzIiwibmFtZSIsInByb3BlcnR5IiwiY3JlYXRlUmVsYXRpb25zaGlwcyIsInJlbCIsInJlbGF0aW9uc2hpcHMiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJyZWxhdGVkRW50aXR5IiwicGFyZW50UHJvcGVydHkiLCJwYXJlbnRQcm9wZXJ0eVR5cGUiLCJyZWxhdGVkUHJvcGVydHkiLCJyZWxhdGVkUHJvcGVydHlUeXBlIiwid2hlcmUiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQSxNQUFNQSxXQUFXLG9CQUFZLFlBQVosQ0FBakIsQyxDQXJCQTs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE1BQU1DLGtCQUFrQixvQkFBWSxjQUFaLENBQXhCO0FBQ0EsTUFBTUMsa0JBQWtCLG9CQUFZLGNBQVosQ0FBeEI7QUFDQSxNQUFNQyxxQkFBcUIsb0JBQVksZ0JBQVosQ0FBM0I7QUFDQSxNQUFNQyxzQkFBc0Isb0JBQVksa0JBQVosQ0FBNUI7QUFDQSxNQUFN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ZUEsTyIsImZpbGUiOiJCYXNlLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IF9Nb2RlbEJhc2UgZnJvbSAnYXJnb3MvTW9kZWxzL19Nb2RlbEJhc2UnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vTmFtZXMnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdxdW90ZU1vZGVsJyk7XHJcbmNvbnN0IGFjY291bnRSZXNvdXJjZSA9IGdldFJlc291cmNlKCdhY2NvdW50TW9kZWwnKTtcclxuY29uc3QgY29udGFjdFJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2NvbnRhY3RNb2RlbCcpO1xyXG5jb25zdCBxdW90ZUl0ZW1zUmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgncXVvdGVJdGVtTW9kZWwnKTtcclxuY29uc3Qgb3Bwb3J0dW5pdHlSZXNvdXJjZSA9IGdldFJlc291cmNlKCdvcHBvcnR1bml0eU1vZGVsJyk7XHJcbmNvbnN0IHNhbGVzb3JkZXJSZXNvdXJjZSA9IGdldFJlc291cmNlKCdzYWxlc09yZGVyTW9kZWwnKTtcclxuY29uc3QgYmlsbHRvUmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXJwQmlsbFRvTW9kZWwnKTtcclxuY29uc3Qgc2hpcHRvUmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXJwU2hpcFRvTW9kZWwnKTtcclxuY29uc3Qgc3luY3Jlc3VsdFJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3N5bmNSZXN1bHRNb2RlbCcpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLk1vZGVscy5RdW90ZS5CYXNlJywgW19Nb2RlbEJhc2VdLCB7XHJcbiAgY29udHJhY3ROYW1lOiAnZHluYW1pYycsXHJcbiAgcmVzb3VyY2VLaW5kOiAncXVvdGVzJyxcclxuICBlbnRpdHlOYW1lOiAnUXVvdGUnLFxyXG4gIGVudGl0eURpc3BsYXlOYW1lOiByZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZSxcclxuICBlbnRpdHlEaXNwbGF5TmFtZVBsdXJhbDogcmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5RVU9URSxcclxuICBpY29uQ2xhc3M6ICdkb2N1bWVudCcsXHJcbiAgZGV0YWlsVmlld0lkOiAncXVvdGVfZGV0YWlsJyxcclxuICBsaXN0Vmlld0lkOiAncXVvdGVfbGlzdCcsXHJcbiAgZWRpdFZpZXdJZDogJ3F1b3RlX2VkaXQnLFxyXG4gIGNyZWF0ZVBpY2tsaXN0czogZnVuY3Rpb24gY3JlYXRlUGlja2xpc3RzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucGlja2xpc3RzIHx8ICh0aGlzLnBpY2tsaXN0cyA9IFt7XHJcbiAgICAgIG5hbWU6ICdTeW5jU3RhdHVzJyxcclxuICAgICAgcHJvcGVydHk6ICdTeW5jU3RhdHVzJyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ0VycFF1b3RlU3RhdHVzJyxcclxuICAgICAgcHJvcGVydHk6ICdFcnBTdGF0dXMnLFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbiAgY3JlYXRlUmVsYXRpb25zaGlwczogZnVuY3Rpb24gY3JlYXRlUmVsYXRpb25zaGlwcygpIHtcclxuICAgIGNvbnN0IHJlbCA9IHRoaXMucmVsYXRpb25zaGlwcyB8fCAodGhpcy5yZWxhdGlvbnNoaXBzID0gW3tcclxuICAgICAgbmFtZTogJ0FjY291bnQnLFxyXG4gICAgICBkaXNwbGF5TmFtZTogYWNjb3VudFJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gICAgICB0eXBlOiAnTWFueVRvT25lJyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ0FjY291bnQnLFxyXG4gICAgICBwYXJlbnRQcm9wZXJ0eTogJ0FjY291bnQnLFxyXG4gICAgICBwYXJlbnRQcm9wZXJ0eVR5cGU6ICdvYmplY3QnLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnUmVxdWVzdGVkQnknLFxyXG4gICAgICBkaXNwbGF5TmFtZTogY29udGFjdFJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gICAgICB0eXBlOiAnTWFueVRvT25lJyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ0NvbnRhY3QnLFxyXG4gICAgICBwYXJlbnRQcm9wZXJ0eTogJ1JlcXVlc3RlZEJ5JyxcclxuICAgICAgcGFyZW50UHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ09wcG9ydHVuaXR5JyxcclxuICAgICAgZGlzcGxheU5hbWU6IG9wcG9ydHVuaXR5UmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgICAgIHR5cGU6ICdNYW55VG9PbmUnLFxyXG4gICAgICByZWxhdGVkRW50aXR5OiAnT3Bwb3J0dW5pdHknLFxyXG4gICAgICBwYXJlbnRQcm9wZXJ0eTogJ09wcG9ydHVuaXR5JyxcclxuICAgICAgcGFyZW50UHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ1NhbGVzT3JkZXInLFxyXG4gICAgICBkaXNwbGF5TmFtZTogc2FsZXNvcmRlclJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gICAgICB0eXBlOiAnTWFueVRvT25lJyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ1NhbGVzT3JkZXInLFxyXG4gICAgICBwYXJlbnRQcm9wZXJ0eTogJ1NhbGVzT3JkZXInLFxyXG4gICAgICBwYXJlbnRQcm9wZXJ0eVR5cGU6ICdvYmplY3QnLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnQmlsbFRvJyxcclxuICAgICAgZGlzcGxheU5hbWU6IGJpbGx0b1Jlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gICAgICB0eXBlOiAnTWFueVRvT25lJyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ0VSUEJpbGxUbycsXHJcbiAgICAgIHBhcmVudFByb3BlcnR5OiAnQmlsbFRvJyxcclxuICAgICAgcGFyZW50UHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ1NoaXBUbycsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiBzaGlwdG9SZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICAgICAgdHlwZTogJ01hbnlUb09uZScsXHJcbiAgICAgIHJlbGF0ZWRFbnRpdHk6ICdFUlBTaGlwVG8nLFxyXG4gICAgICBwYXJlbnRQcm9wZXJ0eTogJ1NoaXBUbycsXHJcbiAgICAgIHBhcmVudFByb3BlcnR5VHlwZTogJ29iamVjdCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdRdW90ZUl0ZW0nLFxyXG4gICAgICBkaXNwbGF5TmFtZTogcXVvdGVJdGVtc1Jlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gICAgICB0eXBlOiAnT25lVG9NYW55JyxcclxuICAgICAgcmVsYXRlZEVudGl0eTogJ1F1b3RlSXRlbScsXHJcbiAgICAgIHJlbGF0ZWRQcm9wZXJ0eTogJ1F1b3RlJyxcclxuICAgICAgcmVsYXRlZFByb3BlcnR5VHlwZTogJ29iamVjdCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdTeW5jSGlzdG9yeScsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiBzeW5jcmVzdWx0UmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgICAgIHR5cGU6ICdPbmVUb01hbnknLFxyXG4gICAgICByZWxhdGVkRW50aXR5OiAnU3luY1Jlc3VsdCcsXHJcbiAgICAgIHJlbGF0ZWRQcm9wZXJ0eTogJ0VudGl0eUlkJyxcclxuICAgICAgd2hlcmU6ICdFbnRpdHlUeXBlIGVxIFwiUXVvdGVcIicsXHJcbiAgICB9LFxyXG4gICAgXSk7XHJcbiAgICByZXR1cm4gcmVsO1xyXG4gIH0sXHJcbn0pO1xyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuTW9kZWxzLlF1b3RlLkJhc2UnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19