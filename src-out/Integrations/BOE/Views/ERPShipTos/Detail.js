define('crm/Integrations/BOE/Views/ERPShipTos/Detail', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'crm/Format', 'argos/Detail', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _Format, _Detail, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Format2 = _interopRequireDefault(_Format);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _Names2 = _interopRequireDefault(_Names);

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

  var resource = (0, _I18n2.default)('erpShipTosDetail');

  /**
   * @class crm.Integrations.BOE.Views.ERPShipTos.Detail
   * @extends argos.Detail
   */
  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPShipTos.Detail', [_Detail2.default], /** @lends crm.Integrations.BOE.Views.ERPShipTos.Detail# */{
    // Localization
    titleText: resource.titleText,
    relatedItemsText: resource.relatedItemsText,
    entityText: resource.entityText,
    backOfficeIdText: resource.backOfficeIdText,
    nameText: resource.nameText,
    faxText: resource.faxText,
    phoneText: resource.phoneText,
    emailText: resource.emailText,
    addressText: resource.addressText,
    statusText: resource.statusText,
    syncStatusText: resource.syncStatusText,
    logicalIdText: resource.logicalIdText,
    accountingEntityIdText: resource.accountingEntityIdText,
    ownerText: resource.ownerText,
    billToText: resource.billToText,
    accountsText: resource.accountsText,
    contactAssociationsText: resource.contactAssociationsText,
    receivablesText: resource.receivablesText,
    invoicesText: resource.invoicesText,
    returnsText: resource.returnsText,
    quotesText: resource.quotesText,
    salesOrdersText: resource.salesOrdersText,
    syncHistoryText: resource.syncHistoryText,

    // View Properties
    id: 'erpshipto_detail',
    modelName: _Names2.default.ERPSHIPTO,
    resourceKind: 'erpShipTos',
    enableOffline: true,

    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        title: this.actionsText,
        list: true,
        cls: 'action-list',
        name: 'QuickActionsSection',
        children: []
      }, {
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          name: 'ErpExtId',
          property: 'ErpExtId',
          label: this.backOfficeIdText
        }, {
          name: 'Name',
          property: 'Name',
          label: this.nameText
        }, {
          name: 'Phone',
          property: 'MainPhone',
          label: this.phoneText
        }, {
          name: 'Email',
          property: 'Email',
          label: this.emailText
        }, {
          name: 'Address',
          property: 'Address',
          label: this.addressText,
          renderer: function renderer(val) {
            if (val) {
              return _Format2.default.address(val);
            }
          }
        }, {
          name: 'Status',
          property: 'ErpStatus',
          label: this.statusText
        }, {
          name: 'Owner',
          property: 'Owner.OwnerDescription',
          label: this.ownerText
        }, {
          name: 'Fax',
          property: 'Fax',
          label: this.faxText
        }, {
          name: 'SyncStatus',
          property: 'SyncStatus',
          label: this.syncStatusText,
          renderer: this.formatPicklist('SyncStatus')
        }, {
          name: 'LogicalId',
          property: 'ErpLogicalId',
          label: this.logicalIdText
        }, {
          name: 'AccountingEntityId',
          property: 'ErpAccountingEntityId',
          label: this.accountingEntityIdText
        }]
      }, {
        title: this.relatedItemsText,
        name: 'RelatedItemsSection',
        list: true,
        children: [{
          name: 'Accounts',
          label: this.accountsText,
          where: function where(entry) {
            return 'ErpShipToAccounts.ErpShipTo.Id eq "' + entry.$key + '"';
          },
          view: 'shipto_accounts_related'
        }, {
          name: 'BillTos',
          label: this.billToText,
          where: function where(entry) {
            return 'ErpBillToShipTos.ErpShipTo.Id eq "' + entry.$key + '"';
          },
          view: 'shipto_billtos_related'
        }, {
          name: 'Quotes',
          label: this.quotesText,
          where: function where(entry) {
            return 'ShipTo.Id eq "' + entry.$key + '"';
          },
          view: 'shipto_quotes_related'
        }, {
          name: 'SalesOrders',
          label: this.salesOrdersText,
          where: function where(entry) {
            return 'ErpShipTo.Id eq "' + entry.$key + '"';
          },
          view: 'shipto_orders_related'
        }, {
          name: 'Receivables',
          label: this.receivablesText,
          where: function where(entry) {
            return 'ErpShipTo.Id eq "' + entry.$key + '"';
          },
          view: 'shipto_receivables_related'
        }, {
          name: 'Invoices',
          label: this.invoicesText,
          where: function where(entry) {
            return 'ErpShipTo.Id eq "' + entry.$key + '"';
          },
          view: 'shipto_invoices_related'
        }, {
          name: 'Returns',
          label: this.returnsText,
          where: function where(entry) {
            return 'ErpShipTo.Id eq "' + entry.$key + '"';
          },
          view: 'shipto_returns_related'
        }, {
          name: 'SyncHistory',
          label: this.syncHistoryText,
          where: function where(entry) {
            return 'EntityType eq "ERPShipTo" and EntityId eq "' + entry.$key + '"';
          },
          view: 'shipto_synchistory_related'
        }]
      }]);
    },
    formatPicklist: function formatPicklist(property) {
      return _Format2.default.picklist(this.app.picklistService, this._model, property);
    },
    formatMultiCurrency: function formatMultiCurrency(val) {
      if (App.hasMultiCurrency() && val) {
        if (this.entry.ErpInvoice.CurrencyCode) {
          return _Format2.default.multiCurrency.call(null, val, this.entry.ErpInvoice.CurrencyCode);
        }
        return _Format2.default.currency.call(null, val);
      }
      return _Format2.default.currency.call(null, val);
    }
  });

  _lang2.default.setObject('icboe.Views.ERPShipTos.Detail', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0VSUFNoaXBUb3MvRGV0YWlsLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsInRpdGxlVGV4dCIsInJlbGF0ZWRJdGVtc1RleHQiLCJlbnRpdHlUZXh0IiwiYmFja09mZmljZUlkVGV4dCIsIm5hbWVUZXh0IiwiZmF4VGV4dCIsInBob25lVGV4dCIsImVtYWlsVGV4dCIsImFkZHJlc3NUZXh0Iiwic3RhdHVzVGV4dCIsInN5bmNTdGF0dXNUZXh0IiwibG9naWNhbElkVGV4dCIsImFjY291bnRpbmdFbnRpdHlJZFRleHQiLCJvd25lclRleHQiLCJiaWxsVG9UZXh0IiwiYWNjb3VudHNUZXh0IiwiY29udGFjdEFzc29jaWF0aW9uc1RleHQiLCJyZWNlaXZhYmxlc1RleHQiLCJpbnZvaWNlc1RleHQiLCJyZXR1cm5zVGV4dCIsInF1b3Rlc1RleHQiLCJzYWxlc09yZGVyc1RleHQiLCJzeW5jSGlzdG9yeVRleHQiLCJpZCIsIm1vZGVsTmFtZSIsIkVSUFNISVBUTyIsInJlc291cmNlS2luZCIsImVuYWJsZU9mZmxpbmUiLCJjcmVhdGVMYXlvdXQiLCJsYXlvdXQiLCJ0aXRsZSIsImFjdGlvbnNUZXh0IiwibGlzdCIsImNscyIsIm5hbWUiLCJjaGlsZHJlbiIsImRldGFpbHNUZXh0IiwicHJvcGVydHkiLCJsYWJlbCIsInJlbmRlcmVyIiwidmFsIiwiYWRkcmVzcyIsImZvcm1hdFBpY2tsaXN0Iiwid2hlcmUiLCJlbnRyeSIsIiRrZXkiLCJ2aWV3IiwicGlja2xpc3QiLCJhcHAiLCJwaWNrbGlzdFNlcnZpY2UiLCJfbW9kZWwiLCJmb3JtYXRNdWx0aUN1cnJlbmN5IiwiQXBwIiwiaGFzTXVsdGlDdXJyZW5jeSIsIkVycEludm9pY2UiLCJDdXJyZW5jeUNvZGUiLCJtdWx0aUN1cnJlbmN5IiwiY2FsbCIsImN1cnJlbmN5Iiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7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QUFnQ2pCLEdBQWhDLEVBQXFDLEtBQUtJLEtBQUwsQ0FBV1UsVUFBWCxDQUFzQkMsWUFBM0QsQ0FBUDtBQUNEO0FBQ0QsZUFBTyxpQkFBT0csUUFBUCxDQUFnQkQsSUFBaEIsQ0FBcUIsSUFBckIsRUFBMkJqQixHQUEzQixDQUFQO0FBQ0Q7QUFDRCxhQUFPLGlCQUFPa0IsUUFBUCxDQUFnQkQsSUFBaEIsQ0FBcUIsSUFBckIsRUFBMkJqQixHQUEzQixDQUFQO0FBQ0Q7QUF2SzBJLEdBQTdILENBQWhCOztBQTBLQSxpQkFBS21CLFNBQUwsQ0FBZSwrQkFBZixFQUFnRDVELE9BQWhEO29CQUNlQSxPIiwiZmlsZSI6IkRldGFpbC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnY3JtL0Zvcm1hdCc7XHJcbmltcG9ydCBEZXRhaWwgZnJvbSAnYXJnb3MvRGV0YWlsJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2VycFNoaXBUb3NEZXRhaWwnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuRVJQU2hpcFRvcy5EZXRhaWxcclxuICogQGV4dGVuZHMgYXJnb3MuRGV0YWlsXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuRVJQU2hpcFRvcy5EZXRhaWwnLCBbRGV0YWlsXSwgLyoqIEBsZW5kcyBjcm0uSW50ZWdyYXRpb25zLkJPRS5WaWV3cy5FUlBTaGlwVG9zLkRldGFpbCMgKi97XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgcmVsYXRlZEl0ZW1zVGV4dDogcmVzb3VyY2UucmVsYXRlZEl0ZW1zVGV4dCxcclxuICBlbnRpdHlUZXh0OiByZXNvdXJjZS5lbnRpdHlUZXh0LFxyXG4gIGJhY2tPZmZpY2VJZFRleHQ6IHJlc291cmNlLmJhY2tPZmZpY2VJZFRleHQsXHJcbiAgbmFtZVRleHQ6IHJlc291cmNlLm5hbWVUZXh0LFxyXG4gIGZheFRleHQ6IHJlc291cmNlLmZheFRleHQsXHJcbiAgcGhvbmVUZXh0OiByZXNvdXJjZS5waG9uZVRleHQsXHJcbiAgZW1haWxUZXh0OiByZXNvdXJjZS5lbWFpbFRleHQsXHJcbiAgYWRkcmVzc1RleHQ6IHJlc291cmNlLmFkZHJlc3NUZXh0LFxyXG4gIHN0YXR1c1RleHQ6IHJlc291cmNlLnN0YXR1c1RleHQsXHJcbiAgc3luY1N0YXR1c1RleHQ6IHJlc291cmNlLnN5bmNTdGF0dXNUZXh0LFxyXG4gIGxvZ2ljYWxJZFRleHQ6IHJlc291cmNlLmxvZ2ljYWxJZFRleHQsXHJcbiAgYWNjb3VudGluZ0VudGl0eUlkVGV4dDogcmVzb3VyY2UuYWNjb3VudGluZ0VudGl0eUlkVGV4dCxcclxuICBvd25lclRleHQ6IHJlc291cmNlLm93bmVyVGV4dCxcclxuICBiaWxsVG9UZXh0OiByZXNvdXJjZS5iaWxsVG9UZXh0LFxyXG4gIGFjY291bnRzVGV4dDogcmVzb3VyY2UuYWNjb3VudHNUZXh0LFxyXG4gIGNvbnRhY3RBc3NvY2lhdGlvbnNUZXh0OiByZXNvdXJjZS5jb250YWN0QXNzb2NpYXRpb25zVGV4dCxcclxuICByZWNlaXZhYmxlc1RleHQ6IHJlc291cmNlLnJlY2VpdmFibGVzVGV4dCxcclxuICBpbnZvaWNlc1RleHQ6IHJlc291cmNlLmludm9pY2VzVGV4dCxcclxuICByZXR1cm5zVGV4dDogcmVzb3VyY2UucmV0dXJuc1RleHQsXHJcbiAgcXVvdGVzVGV4dDogcmVzb3VyY2UucXVvdGVzVGV4dCxcclxuICBzYWxlc09yZGVyc1RleHQ6IHJlc291cmNlLnNhbGVzT3JkZXJzVGV4dCxcclxuICBzeW5jSGlzdG9yeVRleHQ6IHJlc291cmNlLnN5bmNIaXN0b3J5VGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdlcnBzaGlwdG9fZGV0YWlsJyxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLkVSUFNISVBUTyxcclxuICByZXNvdXJjZUtpbmQ6ICdlcnBTaGlwVG9zJyxcclxuICBlbmFibGVPZmZsaW5lOiB0cnVlLFxyXG5cclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICB0aXRsZTogdGhpcy5hY3Rpb25zVGV4dCxcclxuICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgY2xzOiAnYWN0aW9uLWxpc3QnLFxyXG4gICAgICBuYW1lOiAnUXVpY2tBY3Rpb25zU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgIH0sIHtcclxuICAgICAgdGl0bGU6IHRoaXMuZGV0YWlsc1RleHQsXHJcbiAgICAgIG5hbWU6ICdEZXRhaWxzU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIG5hbWU6ICdFcnBFeHRJZCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBFeHRJZCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYmFja09mZmljZUlkVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdOYW1lJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ05hbWUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLm5hbWVUZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1Bob25lJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ01haW5QaG9uZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucGhvbmVUZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VtYWlsJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VtYWlsJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5lbWFpbFRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQWRkcmVzcycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdBZGRyZXNzJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5hZGRyZXNzVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIodmFsKSB7XHJcbiAgICAgICAgICBpZiAodmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXQuYWRkcmVzcyh2YWwpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnU3RhdHVzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFN0YXR1cycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc3RhdHVzVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdPd25lcicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdPd25lci5Pd25lckRlc2NyaXB0aW9uJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5vd25lclRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRmF4JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0ZheCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZmF4VGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTeW5jU3RhdHVzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1N5bmNTdGF0dXMnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnN5bmNTdGF0dXNUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiB0aGlzLmZvcm1hdFBpY2tsaXN0KCdTeW5jU3RhdHVzJyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnTG9naWNhbElkJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycExvZ2ljYWxJZCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMubG9naWNhbElkVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdBY2NvdW50aW5nRW50aXR5SWQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwQWNjb3VudGluZ0VudGl0eUlkJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5hY2NvdW50aW5nRW50aXR5SWRUZXh0LFxyXG4gICAgICB9XSxcclxuICAgIH0sIHtcclxuICAgICAgdGl0bGU6IHRoaXMucmVsYXRlZEl0ZW1zVGV4dCxcclxuICAgICAgbmFtZTogJ1JlbGF0ZWRJdGVtc1NlY3Rpb24nLFxyXG4gICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBuYW1lOiAnQWNjb3VudHMnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFjY291bnRzVGV4dCxcclxuICAgICAgICB3aGVyZTogZnVuY3Rpb24gd2hlcmUoZW50cnkpIHtcclxuICAgICAgICAgIHJldHVybiBgRXJwU2hpcFRvQWNjb3VudHMuRXJwU2hpcFRvLklkIGVxIFwiJHtlbnRyeS4ka2V5fVwiYDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHZpZXc6ICdzaGlwdG9fYWNjb3VudHNfcmVsYXRlZCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQmlsbFRvcycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYmlsbFRvVGV4dCxcclxuICAgICAgICB3aGVyZTogKGVudHJ5KSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gYEVycEJpbGxUb1NoaXBUb3MuRXJwU2hpcFRvLklkIGVxIFwiJHtlbnRyeS4ka2V5fVwiYDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHZpZXc6ICdzaGlwdG9fYmlsbHRvc19yZWxhdGVkJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdRdW90ZXMnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnF1b3Rlc1RleHQsXHJcbiAgICAgICAgd2hlcmU6IChlbnRyeSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGBTaGlwVG8uSWQgZXEgXCIke2VudHJ5LiRrZXl9XCJgO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdmlldzogJ3NoaXB0b19xdW90ZXNfcmVsYXRlZCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnU2FsZXNPcmRlcnMnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnNhbGVzT3JkZXJzVGV4dCxcclxuICAgICAgICB3aGVyZTogKGVudHJ5KSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gYEVycFNoaXBUby5JZCBlcSBcIiR7ZW50cnkuJGtleX1cImA7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB2aWV3OiAnc2hpcHRvX29yZGVyc19yZWxhdGVkJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdSZWNlaXZhYmxlcycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucmVjZWl2YWJsZXNUZXh0LFxyXG4gICAgICAgIHdoZXJlOiAoZW50cnkpID0+IHtcclxuICAgICAgICAgIHJldHVybiBgRXJwU2hpcFRvLklkIGVxIFwiJHtlbnRyeS4ka2V5fVwiYDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHZpZXc6ICdzaGlwdG9fcmVjZWl2YWJsZXNfcmVsYXRlZCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnSW52b2ljZXMnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmludm9pY2VzVGV4dCxcclxuICAgICAgICB3aGVyZTogKGVudHJ5KSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gYEVycFNoaXBUby5JZCBlcSBcIiR7ZW50cnkuJGtleX1cImA7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB2aWV3OiAnc2hpcHRvX2ludm9pY2VzX3JlbGF0ZWQnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1JldHVybnMnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJldHVybnNUZXh0LFxyXG4gICAgICAgIHdoZXJlOiAoZW50cnkpID0+IHtcclxuICAgICAgICAgIHJldHVybiBgRXJwU2hpcFRvLklkIGVxIFwiJHtlbnRyeS4ka2V5fVwiYDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHZpZXc6ICdzaGlwdG9fcmV0dXJuc19yZWxhdGVkJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTeW5jSGlzdG9yeScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc3luY0hpc3RvcnlUZXh0LFxyXG4gICAgICAgIHdoZXJlOiAoZW50cnkpID0+IHtcclxuICAgICAgICAgIHJldHVybiBgRW50aXR5VHlwZSBlcSBcIkVSUFNoaXBUb1wiIGFuZCBFbnRpdHlJZCBlcSBcIiR7ZW50cnkuJGtleX1cImA7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB2aWV3OiAnc2hpcHRvX3N5bmNoaXN0b3J5X3JlbGF0ZWQnLFxyXG4gICAgICB9XSxcclxuICAgIH1dKTtcclxuICB9LFxyXG4gIGZvcm1hdFBpY2tsaXN0OiBmdW5jdGlvbiBmb3JtYXRQaWNrbGlzdChwcm9wZXJ0eSkge1xyXG4gICAgcmV0dXJuIGZvcm1hdC5waWNrbGlzdCh0aGlzLmFwcC5waWNrbGlzdFNlcnZpY2UsIHRoaXMuX21vZGVsLCBwcm9wZXJ0eSk7XHJcbiAgfSxcclxuICBmb3JtYXRNdWx0aUN1cnJlbmN5OiBmdW5jdGlvbiBmb3JtYXRNdWx0aUN1cnJlbmN5KHZhbCkge1xyXG4gICAgaWYgKEFwcC5oYXNNdWx0aUN1cnJlbmN5KCkgJiYgdmFsKSB7XHJcbiAgICAgIGlmICh0aGlzLmVudHJ5LkVycEludm9pY2UuQ3VycmVuY3lDb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdC5tdWx0aUN1cnJlbmN5LmNhbGwobnVsbCwgdmFsLCB0aGlzLmVudHJ5LkVycEludm9pY2UuQ3VycmVuY3lDb2RlKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZm9ybWF0LmN1cnJlbmN5LmNhbGwobnVsbCwgdmFsKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmb3JtYXQuY3VycmVuY3kuY2FsbChudWxsLCB2YWwpO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLlZpZXdzLkVSUFNoaXBUb3MuRGV0YWlsJywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==