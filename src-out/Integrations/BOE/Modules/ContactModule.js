define('crm/Integrations/BOE/Modules/ContactModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './_Module', '../Views/ERPContactAssociations/List', '../Views/Quotes/List', '../Views/SalesOrders/List', '../Views/SyncResults/List', 'argos/I18n'], function (module, exports, _declare, _lang, _Module2, _List, _List3, _List5, _List7, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Module3 = _interopRequireDefault(_Module2);

  var _List2 = _interopRequireDefault(_List);

  var _List4 = _interopRequireDefault(_List3);

  var _List6 = _interopRequireDefault(_List5);

  var _List8 = _interopRequireDefault(_List7);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  var resource = (0, _I18n2.default)('contactModule');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Modules.ContactModule', [_Module3.default], {
    // Localization
    erpStatusText: resource.erpStatusText,
    erpContactIdText: resource.erpContactIdText,
    erpAccountAssociationsText: resource.erpAccountAssociationsText,
    relatedERPItemsText: resource.relatedERPItemsText,
    addQuoteText: resource.addQuoteText,
    addOrderText: resource.addOrderText,
    quotesText: resource.quotesText,
    ordersText: resource.ordersText,
    syncHistoryText: resource.syncHistoryText,

    init: function init() {},
    loadViews: function loadViews() {
      var am = this.applicationModule;

      am.registerView(new _List2.default({
        id: 'contact_account_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        title: this.erpAccountAssociationsText,
        createToolLayout: function createToolLayout() {
          return this.tools;
        }
      }));

      am.registerView(new _List4.default({
        id: 'contact_quotes_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        queryOrderBy: 'CreateDate asc'
      }));

      am.registerView(new _List6.default({
        id: 'contact_salesorders_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        queryOrderBy: 'CreateDate asc'
      }));

      am.registerView(new _List8.default({
        id: 'contact_syncresults_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false
      }));
    },
    loadCustomizations: function loadCustomizations() {
      var am = this.applicationModule;

      // Row names to match in the detail and more detail sections.
      // These are the last item in the section.
      var detailRowMatch = 'AccountManager.UserInfo';

      am.registerCustomization('models/detail/querySelect', 'contact_sdata_model', {
        at: function at() {
          return true;
        },
        type: 'insert',
        where: 'after',
        value: 'ErpStatus'
      });
      am.registerCustomization('models/detail/querySelect', 'contact_sdata_model', {
        at: function at() {
          return true;
        },
        type: 'insert',
        where: 'after',
        value: 'ErpExtId'
      });

      am.registerCustomization('models/relationships', 'contact_offline_model', {
        at: function at(relationship) {
          return relationship.name === 'Tickets';
        },
        type: 'insert',
        where: 'after',
        value: [{
          name: 'AccountAssociation',
          displayName: (0, _I18n2.default)('erpContactAssociationModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'ERPContactAccount',
          relatedProperty: 'Contact',
          relatedPropertyType: 'object'
        }, {
          name: 'Quote',
          displayName: (0, _I18n2.default)('quoteModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'Quote',
          relatedProperty: 'Contact',
          relatedPropertyType: 'object'
        }, {
          name: 'SalesOrder',
          displayName: (0, _I18n2.default)('salesOrderModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'SalesOrder',
          relatedProperty: 'Contact',
          relatedPropertyType: 'object'
        }, {
          name: 'SyncHistory',
          displayName: (0, _I18n2.default)('syncResultModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'SyncResult',
          relatedProperty: 'EntityId',
          where: 'EntityType eq "Contact"'
        }]
      });

      am.registerCustomization('models/relationships', 'contact_sdata_model', {
        at: function at(relationship) {
          return relationship.name === 'Tickets';
        },
        type: 'insert',
        where: 'after',
        value: [{
          name: 'AccountAssociation',
          displayName: (0, _I18n2.default)('erpContactAssociationModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'ERPContactAccount',
          relatedProperty: 'Contact',
          relatedPropertyType: 'object'
        }, {
          name: 'Quote',
          displayName: (0, _I18n2.default)('quoteModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'Quote',
          relatedProperty: 'RequestedBy',
          relatedPropertyType: 'object'
        }, {
          name: 'SalesOrder',
          displayName: (0, _I18n2.default)('salesOrderModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'SalesOrder',
          relatedProperty: 'RequestedBy',
          relatedPropertyType: 'object'
        }, {
          name: 'SyncHistory',
          displayName: (0, _I18n2.default)('syncResultModel').entityDisplayNamePlural,
          type: 'OneToMany',
          relatedEntity: 'SyncResult',
          relatedProperty: 'EntityId',
          where: 'EntityType eq "Contact"'
        }]
      });
      _lang2.default.extend(crm.Views.Contact.Detail, {
        _onAddQuoteClick: function _onAddQuoteClick() {
          var view = App.getView('quote_edit');
          view.show({
            detailView: 'quote_detail',
            fromContext: this,
            insert: true
          });
        },
        _onAddOrderClick: function _onAddOrderClick() {
          var view = App.getView('salesorder_edit');
          view.show({
            detailView: 'salesorder_detail',
            fromContext: this,
            insert: true
          });
        }
      });

      /*
       * Quick Actions
       */
      am.registerCustomization('detail', 'contact_detail', {
        at: function at(row) {
          return row.name === 'ViewAddressAction';
        },
        type: 'insert',
        where: 'after',
        value: [{
          name: 'AddQuote',
          property: 'NameLF',
          label: this.addQuoteText,
          iconClass: 'document',
          action: '_onAddQuoteClick',
          security: 'Entities/Quote/Add'
        }, {
          name: 'AddOrder',
          property: 'AccountName',
          label: this.addOrderText,
          iconClass: 'cart',
          action: '_onAddOrderClick',
          security: 'Entities/SalesOrder/Add'
        }]
      });

      /*
       * Details
       */
      am.registerCustomization('detail', 'contact_detail', {
        at: function at(row) {
          return row.name === detailRowMatch;
        },
        type: 'insert',
        where: 'after',
        value: [{
          label: this.erpStatusText,
          property: 'ErpStatus'
        }, {
          label: this.erpContactIdText,
          property: 'ErpExtId'
        }]
      });

      /*
       * Related Items
       */
      am.registerCustomization('detail', 'contact_detail', {
        at: function at(row) {
          return row.name === 'RelatedItemsSection';
        },
        type: 'insert',
        where: 'after',
        value: {
          title: this.relatedERPItemsText,
          list: true,
          name: 'RelatedERPItemsSection',
          enableOffline: false,
          children: [{
            name: 'AccountAssociations',
            label: this.erpAccountAssociationsText,
            where: function where(entry) {
              return 'Contact.Id eq "' + entry.$key + '"';
            },
            view: 'contact_account_related'
          }, {
            name: 'Quotes',
            label: this.quotesText,
            where: function where(entry) {
              return 'RequestedBy.Id eq "' + entry.$key + '"';
            },
            view: 'contact_quotes_related'
          }, {
            name: 'SalesOrders',
            label: this.ordersText,
            where: function where(entry) {
              return 'RequestedBy.Id eq "' + entry.$key + '"';
            },
            view: 'contact_salesorders_related'
          }, {
            name: 'SyncHistory',
            label: this.syncHistoryText,
            where: function where(entry) {
              return 'EntityType eq "Contact" and EntityId eq "' + entry.$key + '"';
            },
            view: 'contact_syncresults_related'
          }]
        }
      });
    },
    loadToolbars: function loadToolbars() {}
  });

  _lang2.default.setObject('icboe.Modules.ContactModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZHVsZXMvQ29udGFjdE1vZHVsZS5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJlcnBTdGF0dXNUZXh0IiwiZXJwQ29udGFjdElkVGV4dCIsImVycEFjY291bnRBc3NvY2lhdGlvbnNUZXh0IiwicmVsYXRlZEVSUEl0ZW1zVGV4dCIsImFkZFF1b3RlVGV4dCIsImFkZE9yZGVyVGV4dCIsInF1b3Rlc1RleHQiLCJvcmRlcnNUZXh0Iiwic3luY0hpc3RvcnlUZXh0IiwiaW5pdCIsImxvYWRWaWV3cyIsImFtIiwiYXBwbGljYXRpb25Nb2R1bGUiLCJyZWdpc3RlclZpZXciLCJpZCIsImdyb3Vwc0VuYWJsZWQiLCJoYXNTZXR0aW5ncyIsImV4cG9zZSIsInRpdGxlIiwiY3JlYXRlVG9vbExheW91dCIsInRvb2xzIiwicXVlcnlPcmRlckJ5IiwibG9hZEN1c3RvbWl6YXRpb25zIiwiZGV0YWlsUm93TWF0Y2giLCJyZWdpc3RlckN1c3RvbWl6YXRpb24iLCJhdCIsInR5cGUiLCJ3aGVyZSIsInZhbHVlIiwicmVsYXRpb25zaGlwIiwibmFtZSIsImRpc3BsYXlOYW1lIiwiZW50aXR5RGlzcGxheU5hbWVQbHVyYWwiLCJyZWxhdGVkRW50aXR5IiwicmVsYXRlZFByb3BlcnR5IiwicmVsYXRlZFByb3BlcnR5VHlwZSIsImV4dGVuZCIsImNybSIsIlZpZXdzIiwiQ29udGFjdCIsIkRldGFpbCIsIl9vbkFkZFF1b3RlQ2xpY2siLCJ2aWV3IiwiQXBwIiwiZ2V0VmlldyIsInNob3ciLCJkZXRhaWxWaWV3IiwiZnJvbUNvbnRleHQiLCJpbnNlcnQiLCJfb25BZGRPcmRlckNsaWNrIiwicm93IiwicHJvcGVydHkiLCJsYWJlbCIsImljb25DbGFzcyIsImFjdGlvbiIsInNlY3VyaXR5IiwibGlzdCIsImVuYWJsZU9mZmxpbmUiLCJjaGlsZHJlbiIsImVudHJ5IiwiJGtleSIsImxvYWRUb29sYmFy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Rkg7QUFHVHlCLG1CQUFPLFNBQVNBLEtBQVQsQ0FBZWdDLEtBQWYsRUFBc0I7QUFDM0IseUNBQXlCQSxNQUFNQyxJQUEvQjtBQUNELGFBTFE7QUFNVGxCLGtCQUFNO0FBTkcsV0FBRCxFQU9QO0FBQ0RaLGtCQUFNLFFBREw7QUFFRHNCLG1CQUFPLEtBQUs5QyxVQUZYO0FBR0RxQixtQkFBTyxTQUFTQSxLQUFULENBQWVnQyxLQUFmLEVBQXNCO0FBQzNCLDZDQUE2QkEsTUFBTUMsSUFBbkM7QUFDRCxhQUxBO0FBTURsQixrQkFBTTtBQU5MLFdBUE8sRUFjUDtBQUNEWixrQkFBTSxhQURMO0FBRURzQixtQkFBTyxLQUFLN0MsVUFGWDtBQUdEb0IsbUJBQU8sU0FBU0EsS0FBVCxDQUFlZ0MsS0FBZixFQUFzQjtBQUMzQiw2Q0FBNkJBLE1BQU1DLElBQW5DO0FBQ0QsYUFMQTtBQU1EbEIsa0JBQU07QUFOTCxXQWRPLEVBcUJQO0FBQ0RaLGtCQUFNLGFBREw7QUFFRHNCLG1CQUFPLEtBQUs1QyxlQUZYO0FBR0RtQixtQkFBTyxlQUFDZ0MsS0FBRCxFQUFXO0FBQ2hCLG1FQUFtREEsTUFBTUMsSUFBekQ7QUFDRCxhQUxBO0FBTURsQixrQkFBTTtBQU5MLFdBckJPO0FBTEw7QUFONEMsT0FBckQ7QUEwQ0QsS0F4UDhFO0FBeVAvRW1CLGtCQUFjLFNBQVNBLFlBQVQsR0FBd0IsQ0FDckM7QUExUDhFLEdBQWpFLENBQWhCOztBQTZQQSxpQkFBS0MsU0FBTCxDQUFlLDZCQUFmLEVBQThDL0QsT0FBOUM7b0JBQ2VBLE8iLCJmaWxlIjoiQ29udGFjdE1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBfTW9kdWxlIGZyb20gJy4vX01vZHVsZSc7XHJcbmltcG9ydCBFcnBDb250YWN0QXNzb2NpYXRpb25zTGlzdCBmcm9tICcuLi9WaWV3cy9FUlBDb250YWN0QXNzb2NpYXRpb25zL0xpc3QnO1xyXG5pbXBvcnQgUXVvdGVzTGlzdCBmcm9tICcuLi9WaWV3cy9RdW90ZXMvTGlzdCc7XHJcbmltcG9ydCBTYWxlc09yZGVyc0xpc3QgZnJvbSAnLi4vVmlld3MvU2FsZXNPcmRlcnMvTGlzdCc7XHJcbmltcG9ydCBTeW5jUmVzdWx0c0xpc3QgZnJvbSAnLi4vVmlld3MvU3luY1Jlc3VsdHMvTGlzdCc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2NvbnRhY3RNb2R1bGUnKTtcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5Nb2R1bGVzLkNvbnRhY3RNb2R1bGUnLCBbX01vZHVsZV0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICBlcnBTdGF0dXNUZXh0OiByZXNvdXJjZS5lcnBTdGF0dXNUZXh0LFxyXG4gIGVycENvbnRhY3RJZFRleHQ6IHJlc291cmNlLmVycENvbnRhY3RJZFRleHQsXHJcbiAgZXJwQWNjb3VudEFzc29jaWF0aW9uc1RleHQ6IHJlc291cmNlLmVycEFjY291bnRBc3NvY2lhdGlvbnNUZXh0LFxyXG4gIHJlbGF0ZWRFUlBJdGVtc1RleHQ6IHJlc291cmNlLnJlbGF0ZWRFUlBJdGVtc1RleHQsXHJcbiAgYWRkUXVvdGVUZXh0OiByZXNvdXJjZS5hZGRRdW90ZVRleHQsXHJcbiAgYWRkT3JkZXJUZXh0OiByZXNvdXJjZS5hZGRPcmRlclRleHQsXHJcbiAgcXVvdGVzVGV4dDogcmVzb3VyY2UucXVvdGVzVGV4dCxcclxuICBvcmRlcnNUZXh0OiByZXNvdXJjZS5vcmRlcnNUZXh0LFxyXG4gIHN5bmNIaXN0b3J5VGV4dDogcmVzb3VyY2Uuc3luY0hpc3RvcnlUZXh0LFxyXG5cclxuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xyXG4gIH0sXHJcbiAgbG9hZFZpZXdzOiBmdW5jdGlvbiBsb2FkVmlld3MoKSB7XHJcbiAgICBjb25zdCBhbSA9IHRoaXMuYXBwbGljYXRpb25Nb2R1bGU7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBFcnBDb250YWN0QXNzb2NpYXRpb25zTGlzdCh7XHJcbiAgICAgIGlkOiAnY29udGFjdF9hY2NvdW50X3JlbGF0ZWQnLFxyXG4gICAgICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICAgICAgaGFzU2V0dGluZ3M6IGZhbHNlLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICB0aXRsZTogdGhpcy5lcnBBY2NvdW50QXNzb2NpYXRpb25zVGV4dCxcclxuICAgICAgY3JlYXRlVG9vbExheW91dDogZnVuY3Rpb24gY3JlYXRlVG9vbExheW91dCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b29scztcclxuICAgICAgfSxcclxuICAgIH0pKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IFF1b3Rlc0xpc3Qoe1xyXG4gICAgICBpZDogJ2NvbnRhY3RfcXVvdGVzX3JlbGF0ZWQnLFxyXG4gICAgICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICAgICAgaGFzU2V0dGluZ3M6IGZhbHNlLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICBxdWVyeU9yZGVyQnk6ICdDcmVhdGVEYXRlIGFzYycsXHJcbiAgICB9KSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJWaWV3KG5ldyBTYWxlc09yZGVyc0xpc3Qoe1xyXG4gICAgICBpZDogJ2NvbnRhY3Rfc2FsZXNvcmRlcnNfcmVsYXRlZCcsXHJcbiAgICAgIGdyb3Vwc0VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBoYXNTZXR0aW5nczogZmFsc2UsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIHF1ZXJ5T3JkZXJCeTogJ0NyZWF0ZURhdGUgYXNjJyxcclxuICAgIH0pKTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IFN5bmNSZXN1bHRzTGlzdCh7XHJcbiAgICAgIGlkOiAnY29udGFjdF9zeW5jcmVzdWx0c19yZWxhdGVkJyxcclxuICAgICAgZ3JvdXBzRW5hYmxlZDogZmFsc2UsXHJcbiAgICAgIGhhc1NldHRpbmdzOiBmYWxzZSxcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgIH0pKTtcclxuICB9LFxyXG4gIGxvYWRDdXN0b21pemF0aW9uczogZnVuY3Rpb24gbG9hZEN1c3RvbWl6YXRpb25zKCkge1xyXG4gICAgY29uc3QgYW0gPSB0aGlzLmFwcGxpY2F0aW9uTW9kdWxlO1xyXG5cclxuICAgIC8vIFJvdyBuYW1lcyB0byBtYXRjaCBpbiB0aGUgZGV0YWlsIGFuZCBtb3JlIGRldGFpbCBzZWN0aW9ucy5cclxuICAgIC8vIFRoZXNlIGFyZSB0aGUgbGFzdCBpdGVtIGluIHRoZSBzZWN0aW9uLlxyXG4gICAgY29uc3QgZGV0YWlsUm93TWF0Y2ggPSAnQWNjb3VudE1hbmFnZXIuVXNlckluZm8nO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyQ3VzdG9taXphdGlvbignbW9kZWxzL2RldGFpbC9xdWVyeVNlbGVjdCcsICdjb250YWN0X3NkYXRhX21vZGVsJywge1xyXG4gICAgICBhdDogKCkgPT4geyByZXR1cm4gdHJ1ZTsgfSxcclxuICAgICAgdHlwZTogJ2luc2VydCcsXHJcbiAgICAgIHdoZXJlOiAnYWZ0ZXInLFxyXG4gICAgICB2YWx1ZTogJ0VycFN0YXR1cycsXHJcbiAgICB9KTtcclxuICAgIGFtLnJlZ2lzdGVyQ3VzdG9taXphdGlvbignbW9kZWxzL2RldGFpbC9xdWVyeVNlbGVjdCcsICdjb250YWN0X3NkYXRhX21vZGVsJywge1xyXG4gICAgICBhdDogKCkgPT4geyByZXR1cm4gdHJ1ZTsgfSxcclxuICAgICAgdHlwZTogJ2luc2VydCcsXHJcbiAgICAgIHdoZXJlOiAnYWZ0ZXInLFxyXG4gICAgICB2YWx1ZTogJ0VycEV4dElkJyxcclxuICAgIH0pO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyQ3VzdG9taXphdGlvbignbW9kZWxzL3JlbGF0aW9uc2hpcHMnLCAnY29udGFjdF9vZmZsaW5lX21vZGVsJywge1xyXG4gICAgICBhdDogKHJlbGF0aW9uc2hpcCkgPT4geyByZXR1cm4gcmVsYXRpb25zaGlwLm5hbWUgPT09ICdUaWNrZXRzJzsgfSxcclxuICAgICAgdHlwZTogJ2luc2VydCcsXHJcbiAgICAgIHdoZXJlOiAnYWZ0ZXInLFxyXG4gICAgICB2YWx1ZTogW3tcclxuICAgICAgICBuYW1lOiAnQWNjb3VudEFzc29jaWF0aW9uJyxcclxuICAgICAgICBkaXNwbGF5TmFtZTogZ2V0UmVzb3VyY2UoJ2VycENvbnRhY3RBc3NvY2lhdGlvbk1vZGVsJykuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgICAgICAgdHlwZTogJ09uZVRvTWFueScsXHJcbiAgICAgICAgcmVsYXRlZEVudGl0eTogJ0VSUENvbnRhY3RBY2NvdW50JyxcclxuICAgICAgICByZWxhdGVkUHJvcGVydHk6ICdDb250YWN0JyxcclxuICAgICAgICByZWxhdGVkUHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdRdW90ZScsXHJcbiAgICAgICAgZGlzcGxheU5hbWU6IGdldFJlc291cmNlKCdxdW90ZU1vZGVsJykuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgICAgICAgdHlwZTogJ09uZVRvTWFueScsXHJcbiAgICAgICAgcmVsYXRlZEVudGl0eTogJ1F1b3RlJyxcclxuICAgICAgICByZWxhdGVkUHJvcGVydHk6ICdDb250YWN0JyxcclxuICAgICAgICByZWxhdGVkUHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTYWxlc09yZGVyJyxcclxuICAgICAgICBkaXNwbGF5TmFtZTogZ2V0UmVzb3VyY2UoJ3NhbGVzT3JkZXJNb2RlbCcpLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gICAgICAgIHR5cGU6ICdPbmVUb01hbnknLFxyXG4gICAgICAgIHJlbGF0ZWRFbnRpdHk6ICdTYWxlc09yZGVyJyxcclxuICAgICAgICByZWxhdGVkUHJvcGVydHk6ICdDb250YWN0JyxcclxuICAgICAgICByZWxhdGVkUHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTeW5jSGlzdG9yeScsXHJcbiAgICAgICAgZGlzcGxheU5hbWU6IGdldFJlc291cmNlKCdzeW5jUmVzdWx0TW9kZWwnKS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICAgICAgICB0eXBlOiAnT25lVG9NYW55JyxcclxuICAgICAgICByZWxhdGVkRW50aXR5OiAnU3luY1Jlc3VsdCcsXHJcbiAgICAgICAgcmVsYXRlZFByb3BlcnR5OiAnRW50aXR5SWQnLFxyXG4gICAgICAgIHdoZXJlOiAnRW50aXR5VHlwZSBlcSBcIkNvbnRhY3RcIicsXHJcbiAgICAgIH1dLFxyXG4gICAgfSk7XHJcblxyXG4gICAgYW0ucmVnaXN0ZXJDdXN0b21pemF0aW9uKCdtb2RlbHMvcmVsYXRpb25zaGlwcycsICdjb250YWN0X3NkYXRhX21vZGVsJywge1xyXG4gICAgICBhdDogKHJlbGF0aW9uc2hpcCkgPT4geyByZXR1cm4gcmVsYXRpb25zaGlwLm5hbWUgPT09ICdUaWNrZXRzJzsgfSxcclxuICAgICAgdHlwZTogJ2luc2VydCcsXHJcbiAgICAgIHdoZXJlOiAnYWZ0ZXInLFxyXG4gICAgICB2YWx1ZTogW3tcclxuICAgICAgICBuYW1lOiAnQWNjb3VudEFzc29jaWF0aW9uJyxcclxuICAgICAgICBkaXNwbGF5TmFtZTogZ2V0UmVzb3VyY2UoJ2VycENvbnRhY3RBc3NvY2lhdGlvbk1vZGVsJykuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgICAgICAgdHlwZTogJ09uZVRvTWFueScsXHJcbiAgICAgICAgcmVsYXRlZEVudGl0eTogJ0VSUENvbnRhY3RBY2NvdW50JyxcclxuICAgICAgICByZWxhdGVkUHJvcGVydHk6ICdDb250YWN0JyxcclxuICAgICAgICByZWxhdGVkUHJvcGVydHlUeXBlOiAnb2JqZWN0JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdRdW90ZScsXHJcbiAgICAgICAgZGlzcGxheU5hbWU6IGdldFJlc291cmNlKCdxdW90ZU1vZGVsJykuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgICAgICAgdHlwZTogJ09uZVRvTWFueScsXHJcbiAgICAgICAgcmVsYXRlZEVudGl0eTogJ1F1b3RlJyxcclxuICAgICAgICByZWxhdGVkUHJvcGVydHk6ICdSZXF1ZXN0ZWRCeScsXHJcbiAgICAgICAgcmVsYXRlZFByb3BlcnR5VHlwZTogJ29iamVjdCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnU2FsZXNPcmRlcicsXHJcbiAgICAgICAgZGlzcGxheU5hbWU6IGdldFJlc291cmNlKCdzYWxlc09yZGVyTW9kZWwnKS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICAgICAgICB0eXBlOiAnT25lVG9NYW55JyxcclxuICAgICAgICByZWxhdGVkRW50aXR5OiAnU2FsZXNPcmRlcicsXHJcbiAgICAgICAgcmVsYXRlZFByb3BlcnR5OiAnUmVxdWVzdGVkQnknLFxyXG4gICAgICAgIHJlbGF0ZWRQcm9wZXJ0eVR5cGU6ICdvYmplY3QnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1N5bmNIaXN0b3J5JyxcclxuICAgICAgICBkaXNwbGF5TmFtZTogZ2V0UmVzb3VyY2UoJ3N5bmNSZXN1bHRNb2RlbCcpLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gICAgICAgIHR5cGU6ICdPbmVUb01hbnknLFxyXG4gICAgICAgIHJlbGF0ZWRFbnRpdHk6ICdTeW5jUmVzdWx0JyxcclxuICAgICAgICByZWxhdGVkUHJvcGVydHk6ICdFbnRpdHlJZCcsXHJcbiAgICAgICAgd2hlcmU6ICdFbnRpdHlUeXBlIGVxIFwiQ29udGFjdFwiJyxcclxuICAgICAgfV0sXHJcbiAgICB9KTtcclxuICAgIGxhbmcuZXh0ZW5kKGNybS5WaWV3cy5Db250YWN0LkRldGFpbCwge1xyXG4gICAgICBfb25BZGRRdW90ZUNsaWNrOiBmdW5jdGlvbiBfb25BZGRRdW90ZUNsaWNrKCkge1xyXG4gICAgICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0VmlldygncXVvdGVfZWRpdCcpO1xyXG4gICAgICAgIHZpZXcuc2hvdyh7XHJcbiAgICAgICAgICBkZXRhaWxWaWV3OiAncXVvdGVfZGV0YWlsJyxcclxuICAgICAgICAgIGZyb21Db250ZXh0OiB0aGlzLFxyXG4gICAgICAgICAgaW5zZXJ0OiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gICAgICBfb25BZGRPcmRlckNsaWNrOiBmdW5jdGlvbiBfb25BZGRPcmRlckNsaWNrKCkge1xyXG4gICAgICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldygnc2FsZXNvcmRlcl9lZGl0Jyk7XHJcbiAgICAgICAgdmlldy5zaG93KHtcclxuICAgICAgICAgIGRldGFpbFZpZXc6ICdzYWxlc29yZGVyX2RldGFpbCcsXHJcbiAgICAgICAgICBmcm9tQ29udGV4dDogdGhpcyxcclxuICAgICAgICAgIGluc2VydDogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIC8qXHJcbiAgICAgKiBRdWljayBBY3Rpb25zXHJcbiAgICAgKi9cclxuICAgIGFtLnJlZ2lzdGVyQ3VzdG9taXphdGlvbignZGV0YWlsJywgJ2NvbnRhY3RfZGV0YWlsJywge1xyXG4gICAgICBhdDogZnVuY3Rpb24gYXQocm93KSB7XHJcbiAgICAgICAgcmV0dXJuIHJvdy5uYW1lID09PSAnVmlld0FkZHJlc3NBY3Rpb24nO1xyXG4gICAgICB9LFxyXG4gICAgICB0eXBlOiAnaW5zZXJ0JyxcclxuICAgICAgd2hlcmU6ICdhZnRlcicsXHJcbiAgICAgIHZhbHVlOiBbe1xyXG4gICAgICAgIG5hbWU6ICdBZGRRdW90ZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdOYW1lTEYnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFkZFF1b3RlVGV4dCxcclxuICAgICAgICBpY29uQ2xhc3M6ICdkb2N1bWVudCcsXHJcbiAgICAgICAgYWN0aW9uOiAnX29uQWRkUXVvdGVDbGljaycsXHJcbiAgICAgICAgc2VjdXJpdHk6ICdFbnRpdGllcy9RdW90ZS9BZGQnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0FkZE9yZGVyJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0FjY291bnROYW1lJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5hZGRPcmRlclRleHQsXHJcbiAgICAgICAgaWNvbkNsYXNzOiAnY2FydCcsXHJcbiAgICAgICAgYWN0aW9uOiAnX29uQWRkT3JkZXJDbGljaycsXHJcbiAgICAgICAgc2VjdXJpdHk6ICdFbnRpdGllcy9TYWxlc09yZGVyL0FkZCcsXHJcbiAgICAgIH1dLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLypcclxuICAgICAqIERldGFpbHNcclxuICAgICAqL1xyXG4gICAgYW0ucmVnaXN0ZXJDdXN0b21pemF0aW9uKCdkZXRhaWwnLCAnY29udGFjdF9kZXRhaWwnLCB7XHJcbiAgICAgIGF0OiBmdW5jdGlvbiBhdChyb3cpIHtcclxuICAgICAgICByZXR1cm4gcm93Lm5hbWUgPT09IGRldGFpbFJvd01hdGNoO1xyXG4gICAgICB9LFxyXG4gICAgICB0eXBlOiAnaW5zZXJ0JyxcclxuICAgICAgd2hlcmU6ICdhZnRlcicsXHJcbiAgICAgIHZhbHVlOiBbe1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmVycFN0YXR1c1RleHQsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBTdGF0dXMnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZXJwQ29udGFjdElkVGV4dCxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycEV4dElkJyxcclxuICAgICAgfV0sXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKlxyXG4gICAgICogUmVsYXRlZCBJdGVtc1xyXG4gICAgICovXHJcbiAgICBhbS5yZWdpc3RlckN1c3RvbWl6YXRpb24oJ2RldGFpbCcsICdjb250YWN0X2RldGFpbCcsIHtcclxuICAgICAgYXQ6IGZ1bmN0aW9uIGF0KHJvdykge1xyXG4gICAgICAgIHJldHVybiByb3cubmFtZSA9PT0gJ1JlbGF0ZWRJdGVtc1NlY3Rpb24nO1xyXG4gICAgICB9LFxyXG4gICAgICB0eXBlOiAnaW5zZXJ0JyxcclxuICAgICAgd2hlcmU6ICdhZnRlcicsXHJcbiAgICAgIHZhbHVlOiB7XHJcbiAgICAgICAgdGl0bGU6IHRoaXMucmVsYXRlZEVSUEl0ZW1zVGV4dCxcclxuICAgICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICAgIG5hbWU6ICdSZWxhdGVkRVJQSXRlbXNTZWN0aW9uJyxcclxuICAgICAgICBlbmFibGVPZmZsaW5lOiBmYWxzZSxcclxuICAgICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICAgIG5hbWU6ICdBY2NvdW50QXNzb2NpYXRpb25zJyxcclxuICAgICAgICAgIGxhYmVsOiB0aGlzLmVycEFjY291bnRBc3NvY2lhdGlvbnNUZXh0LFxyXG4gICAgICAgICAgd2hlcmU6IGZ1bmN0aW9uIHdoZXJlKGVudHJ5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgQ29udGFjdC5JZCBlcSBcIiR7ZW50cnkuJGtleX1cImA7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgdmlldzogJ2NvbnRhY3RfYWNjb3VudF9yZWxhdGVkJyxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICBuYW1lOiAnUXVvdGVzJyxcclxuICAgICAgICAgIGxhYmVsOiB0aGlzLnF1b3Rlc1RleHQsXHJcbiAgICAgICAgICB3aGVyZTogZnVuY3Rpb24gd2hlcmUoZW50cnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGBSZXF1ZXN0ZWRCeS5JZCBlcSBcIiR7ZW50cnkuJGtleX1cImA7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgdmlldzogJ2NvbnRhY3RfcXVvdGVzX3JlbGF0ZWQnLFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIG5hbWU6ICdTYWxlc09yZGVycycsXHJcbiAgICAgICAgICBsYWJlbDogdGhpcy5vcmRlcnNUZXh0LFxyXG4gICAgICAgICAgd2hlcmU6IGZ1bmN0aW9uIHdoZXJlKGVudHJ5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgUmVxdWVzdGVkQnkuSWQgZXEgXCIke2VudHJ5LiRrZXl9XCJgO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHZpZXc6ICdjb250YWN0X3NhbGVzb3JkZXJzX3JlbGF0ZWQnLFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIG5hbWU6ICdTeW5jSGlzdG9yeScsXHJcbiAgICAgICAgICBsYWJlbDogdGhpcy5zeW5jSGlzdG9yeVRleHQsXHJcbiAgICAgICAgICB3aGVyZTogKGVudHJ5KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBgRW50aXR5VHlwZSBlcSBcIkNvbnRhY3RcIiBhbmQgRW50aXR5SWQgZXEgXCIke2VudHJ5LiRrZXl9XCJgO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHZpZXc6ICdjb250YWN0X3N5bmNyZXN1bHRzX3JlbGF0ZWQnLFxyXG4gICAgICAgIH1dLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBsb2FkVG9vbGJhcnM6IGZ1bmN0aW9uIGxvYWRUb29sYmFycygpIHtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5Nb2R1bGVzLkNvbnRhY3RNb2R1bGUnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19