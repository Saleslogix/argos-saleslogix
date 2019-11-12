define('crm/Integrations/BOE/Views/ERPBillToAccounts/Detail', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'crm/Format', 'argos/Detail', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _Format, _Detail, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('erpBillToAccountsDetail');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPBillToAccounts.Detail', [_Detail2.default], {
    // Localization
    titleText: resource.titleText,
    actionsText: resource.actionsText,
    relatedItemsText: resource.relatedItemsText,
    // Details Section
    nameText: resource.nameText,
    addressText: resource.addressText,
    erpStatusText: resource.erpStatusText,
    // More Details Section
    mainPhoneText: resource.mainPhoneText,
    faxText: resource.faxText,
    emailText: resource.emailText,
    erpPaymentTermText: resource.erpPaymentTermText,
    accountsText: resource.accountsText,
    openQuotesText: resource.openQuotesText,
    salesOrdersText: resource.salesOrdersText,
    invoicesText: resource.invoicesText,
    receivablesText: resource.receivablesText,
    returnsText: resource.returnsText,
    entityText: resource.entityText,

    // Picklist Codes
    openCode: 'Open',
    newCode: 'New',
    approvedCode: 'Approved',
    workingCode: 'Working',
    partialShipCode: 'PartiallyShipped',
    partialPaidCode: 'PartialPaid',
    closedCode: 'Closed',
    disputeCode: 'Dispute',

    // View Properties
    id: 'erpbilltoaccounts_detail',
    modelName: _Names2.default.ERPBILLTOACCOUNT,
    resourceKind: 'erpBillToAccounts',
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
          name: 'Name',
          property: 'ErpBillTo.Name',
          label: this.nameText
        }, {
          name: 'Address',
          property: 'ErpBillTo.Address',
          label: this.addressText,
          renderer: function renderer(val) {
            if (val) {
              return _Format2.default.address(val);
            }
          }
        }, {
          name: 'Status',
          property: 'ErpBillTo.ErpStatus',
          label: this.erpStatusText
        }, {
          name: 'MainPhone',
          property: 'ErpBillTo.MainPhone',
          label: this.mainPhoneText,
          renderer: function renderer(val) {
            if (val) {
              return _Format2.default.phone(val);
            }
          }
        }, {
          name: 'Fax',
          property: 'ErpBillTo.Fax',
          label: this.faxText
        }, {
          name: 'Email',
          property: 'ErpBillTo.Email',
          label: this.emailText,
          renderer: function renderer(val) {
            if (val) {
              return _Format2.default.mail(val);
            }
          }
        }, {
          name: 'ERPPaymentTerm',
          property: 'ErpBillTo.PaymentTermId',
          label: this.erpPaymentTermText
        }]
      }, {
        title: this.relatedItemsText,
        list: true,
        name: 'RelatedItemsSection',
        children: [{
          name: 'Accounts',
          label: this.accountsText,
          where: function where(entry) {
            return 'ErpBillToAccounts.Id eq "' + entry.$key + '"';
          },
          view: 'billtoaccount_accounts_related'
        }, {
          name: 'OpenQuotesList',
          label: this.openQuotesText,
          where: function where(entry) {
            return 'BillTo.ErpBillToAccounts.Id eq "' + entry.$key + '" and (Status eq "' + this.openCode + '" or Status eq "' + this.newCode + '")';
          },
          view: 'billtoaccount_openquotes_related'
        }, {
          name: 'SalesOrders',
          label: this.salesOrdersText,
          where: function where(entry) {
            return 'ErpBillTo.ErpBillToAccounts.Id eq "' + entry.$key + '" and (Status eq "' + this.openCode + '" or Status eq "' + this.approvedCode + '" or Status eq "' + this.workingCode + '" or Status eq "' + this.partialShipCode + '")';
          },
          view: 'billtoaccount_salesorders_related'
        }, {
          name: 'OpenInvoices',
          label: this.invoicesText,
          where: function where(entry) {
            return 'ErpBillTo.ErpBillToAccounts.Id eq "' + entry.$key + '" and (ErpStatus eq "' + this.openCode + '" or ErpStatus eq "' + this.partialPaidCode + '" or ErpStatus eq "' + this.disputeCode + '")';
          },
          view: 'billtoaccount_openinvoices_related'
        }, {
          name: 'Receivables',
          label: this.receivablesText,
          where: function where(entry) {
            return 'ErpBillTo.ErpBillToAccounts.Id eq "' + entry.$key + '"';
          },
          view: 'billtoaccount_receivables_related'
        }, {
          name: 'Returns',
          label: this.returnsText,
          where: function where(entry) {
            return 'ErpBillTo.ErpBillToAccounts.Id eq "' + entry.$key + '"';
          },
          view: 'billtoaccount_returns_related'
        }]
      }]);
    }
  });

  _lang2.default.setObject('icboe.Views.ERPBillToAccounts.Detail', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0VSUEJpbGxUb0FjY291bnRzL0RldGFpbC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJ0aXRsZVRleHQiLCJhY3Rpb25zVGV4dCIsInJlbGF0ZWRJdGVtc1RleHQiLCJuYW1lVGV4dCIsImFkZHJlc3NUZXh0IiwiZXJwU3RhdHVzVGV4dCIsIm1haW5QaG9uZVRleHQiLCJmYXhUZXh0IiwiZW1haWxUZXh0IiwiZXJwUGF5bWVudFRlcm1UZXh0IiwiYWNjb3VudHNUZXh0Iiwib3BlblF1b3Rlc1RleHQiLCJzYWxlc09yZGVyc1RleHQiLCJpbnZvaWNlc1RleHQiLCJyZWNlaXZhYmxlc1RleHQiLCJyZXR1cm5zVGV4dCIsImVudGl0eVRleHQiLCJvcGVuQ29kZSIsIm5ld0NvZGUiLCJhcHByb3ZlZENvZGUiLCJ3b3JraW5nQ29kZSIsInBhcnRpYWxTaGlwQ29kZSIsInBhcnRpYWxQYWlkQ29kZSIsImNsb3NlZENvZGUiLCJkaXNwdXRlQ29kZSIsImlkIiwibW9kZWxOYW1lIiwiRVJQQklMTFRPQUNDT1VOVCIsInJlc291cmNlS2luZCIsImVuYWJsZU9mZmxpbmUiLCJjcmVhdGVMYXlvdXQiLCJsYXlvdXQiLCJ0aXRsZSIsImxpc3QiLCJjbHMiLCJuYW1lIiwiY2hpbGRyZW4iLCJkZXRhaWxzVGV4dCIsInByb3BlcnR5IiwibGFiZWwiLCJyZW5kZXJlciIsInZhbCIsImFkZHJlc3MiLCJwaG9uZSIsIm1haWwiLCJ3aGVyZSIsImVudHJ5IiwiJGtleSIsInZpZXciLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxNQUFNQSxXQUFXLG9CQUFZLHlCQUFaLENBQWpCOztBQUVBLE1BQU1DLFVBQVUsdUJBQVEscURBQVIsRUFBK0Qsa0JBQS9ELEVBQXlFO0FBQ3ZGO0FBQ0FDLGVBQVdGLFNB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RURJLGlCQUFPLEtBQUt6QixlQUZYO0FBR0QrQixpQkFBTyxTQUFTQSxLQUFULENBQWVDLEtBQWYsRUFBc0I7QUFDM0IsMkRBQTZDQSxNQUFNQyxJQUFuRDtBQUNELFdBTEE7QUFNREMsZ0JBQU07QUFOTCxTQTVCTyxFQW1DUDtBQUNEYixnQkFBTSxTQURMO0FBRURJLGlCQUFPLEtBQUt4QixXQUZYO0FBR0Q4QixpQkFBTyxTQUFTQSxLQUFULENBQWVDLEtBQWYsRUFBc0I7QUFDM0IsMkRBQTZDQSxNQUFNQyxJQUFuRDtBQUNELFdBTEE7QUFNREMsZ0JBQU07QUFOTCxTQW5DTztBQUpULE9BckRrQyxDQUE5QixDQUFQO0FBcUdEO0FBNUlzRixHQUF6RSxDQUFoQjs7QUErSUEsaUJBQUtDLFNBQUwsQ0FBZSxzQ0FBZixFQUF1RGxELE9BQXZEO29CQUNlQSxPIiwiZmlsZSI6IkRldGFpbC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnY3JtL0Zvcm1hdCc7XHJcbmltcG9ydCBEZXRhaWwgZnJvbSAnYXJnb3MvRGV0YWlsJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2VycEJpbGxUb0FjY291bnRzRGV0YWlsJyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuRVJQQmlsbFRvQWNjb3VudHMuRGV0YWlsJywgW0RldGFpbF0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBhY3Rpb25zVGV4dDogcmVzb3VyY2UuYWN0aW9uc1RleHQsXHJcbiAgcmVsYXRlZEl0ZW1zVGV4dDogcmVzb3VyY2UucmVsYXRlZEl0ZW1zVGV4dCxcclxuICAvLyBEZXRhaWxzIFNlY3Rpb25cclxuICBuYW1lVGV4dDogcmVzb3VyY2UubmFtZVRleHQsXHJcbiAgYWRkcmVzc1RleHQ6IHJlc291cmNlLmFkZHJlc3NUZXh0LFxyXG4gIGVycFN0YXR1c1RleHQ6IHJlc291cmNlLmVycFN0YXR1c1RleHQsXHJcbiAgLy8gTW9yZSBEZXRhaWxzIFNlY3Rpb25cclxuICBtYWluUGhvbmVUZXh0OiByZXNvdXJjZS5tYWluUGhvbmVUZXh0LFxyXG4gIGZheFRleHQ6IHJlc291cmNlLmZheFRleHQsXHJcbiAgZW1haWxUZXh0OiByZXNvdXJjZS5lbWFpbFRleHQsXHJcbiAgZXJwUGF5bWVudFRlcm1UZXh0OiByZXNvdXJjZS5lcnBQYXltZW50VGVybVRleHQsXHJcbiAgYWNjb3VudHNUZXh0OiByZXNvdXJjZS5hY2NvdW50c1RleHQsXHJcbiAgb3BlblF1b3Rlc1RleHQ6IHJlc291cmNlLm9wZW5RdW90ZXNUZXh0LFxyXG4gIHNhbGVzT3JkZXJzVGV4dDogcmVzb3VyY2Uuc2FsZXNPcmRlcnNUZXh0LFxyXG4gIGludm9pY2VzVGV4dDogcmVzb3VyY2UuaW52b2ljZXNUZXh0LFxyXG4gIHJlY2VpdmFibGVzVGV4dDogcmVzb3VyY2UucmVjZWl2YWJsZXNUZXh0LFxyXG4gIHJldHVybnNUZXh0OiByZXNvdXJjZS5yZXR1cm5zVGV4dCxcclxuICBlbnRpdHlUZXh0OiByZXNvdXJjZS5lbnRpdHlUZXh0LFxyXG5cclxuICAvLyBQaWNrbGlzdCBDb2Rlc1xyXG4gIG9wZW5Db2RlOiAnT3BlbicsXHJcbiAgbmV3Q29kZTogJ05ldycsXHJcbiAgYXBwcm92ZWRDb2RlOiAnQXBwcm92ZWQnLFxyXG4gIHdvcmtpbmdDb2RlOiAnV29ya2luZycsXHJcbiAgcGFydGlhbFNoaXBDb2RlOiAnUGFydGlhbGx5U2hpcHBlZCcsXHJcbiAgcGFydGlhbFBhaWRDb2RlOiAnUGFydGlhbFBhaWQnLFxyXG4gIGNsb3NlZENvZGU6ICdDbG9zZWQnLFxyXG4gIGRpc3B1dGVDb2RlOiAnRGlzcHV0ZScsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnZXJwYmlsbHRvYWNjb3VudHNfZGV0YWlsJyxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLkVSUEJJTExUT0FDQ09VTlQsXHJcbiAgcmVzb3VyY2VLaW5kOiAnZXJwQmlsbFRvQWNjb3VudHMnLFxyXG4gIGVuYWJsZU9mZmxpbmU6IHRydWUsXHJcblxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5b3V0IHx8ICh0aGlzLmxheW91dCA9IFt7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmFjdGlvbnNUZXh0LFxyXG4gICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICBjbHM6ICdhY3Rpb24tbGlzdCcsXHJcbiAgICAgIG5hbWU6ICdRdWlja0FjdGlvbnNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgfSwge1xyXG4gICAgICB0aXRsZTogdGhpcy5kZXRhaWxzVGV4dCxcclxuICAgICAgbmFtZTogJ0RldGFpbHNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbmFtZTogJ05hbWUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwQmlsbFRvLk5hbWUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLm5hbWVUZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0FkZHJlc3MnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwQmlsbFRvLkFkZHJlc3MnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFkZHJlc3NUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcih2YWwpIHtcclxuICAgICAgICAgIGlmICh2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdC5hZGRyZXNzKHZhbCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTdGF0dXMnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwQmlsbFRvLkVycFN0YXR1cycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZXJwU3RhdHVzVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdNYWluUGhvbmUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwQmlsbFRvLk1haW5QaG9uZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMubWFpblBob25lVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIodmFsKSB7XHJcbiAgICAgICAgICBpZiAodmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXQucGhvbmUodmFsKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0ZheCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBCaWxsVG8uRmF4JyxcclxuICAgICAgICBsYWJlbDogdGhpcy5mYXhUZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VtYWlsJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycEJpbGxUby5FbWFpbCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZW1haWxUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcih2YWwpIHtcclxuICAgICAgICAgIGlmICh2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdC5tYWlsKHZhbCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFUlBQYXltZW50VGVybScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBCaWxsVG8uUGF5bWVudFRlcm1JZCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZXJwUGF5bWVudFRlcm1UZXh0LFxyXG4gICAgICB9XSxcclxuICAgIH0sIHtcclxuICAgICAgdGl0bGU6IHRoaXMucmVsYXRlZEl0ZW1zVGV4dCxcclxuICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgbmFtZTogJ1JlbGF0ZWRJdGVtc1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBuYW1lOiAnQWNjb3VudHMnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFjY291bnRzVGV4dCxcclxuICAgICAgICB3aGVyZTogZnVuY3Rpb24gd2hlcmUoZW50cnkpIHtcclxuICAgICAgICAgIHJldHVybiBgRXJwQmlsbFRvQWNjb3VudHMuSWQgZXEgXCIke2VudHJ5LiRrZXl9XCJgO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdmlldzogJ2JpbGx0b2FjY291bnRfYWNjb3VudHNfcmVsYXRlZCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnT3BlblF1b3Rlc0xpc3QnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLm9wZW5RdW90ZXNUZXh0LFxyXG4gICAgICAgIHdoZXJlOiBmdW5jdGlvbiB3aGVyZShlbnRyeSkge1xyXG4gICAgICAgICAgcmV0dXJuIGBCaWxsVG8uRXJwQmlsbFRvQWNjb3VudHMuSWQgZXEgXCIke2VudHJ5LiRrZXl9XCIgYW5kIChTdGF0dXMgZXEgXCIke3RoaXMub3BlbkNvZGV9XCIgb3IgU3RhdHVzIGVxIFwiJHt0aGlzLm5ld0NvZGV9XCIpYDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHZpZXc6ICdiaWxsdG9hY2NvdW50X29wZW5xdW90ZXNfcmVsYXRlZCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnU2FsZXNPcmRlcnMnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnNhbGVzT3JkZXJzVGV4dCxcclxuICAgICAgICB3aGVyZTogZnVuY3Rpb24gd2hlcmUoZW50cnkpIHtcclxuICAgICAgICAgIHJldHVybiBgRXJwQmlsbFRvLkVycEJpbGxUb0FjY291bnRzLklkIGVxIFwiJHtlbnRyeS4ka2V5fVwiIGFuZCAoU3RhdHVzIGVxIFwiJHt0aGlzLm9wZW5Db2RlfVwiIG9yIFN0YXR1cyBlcSBcIiR7dGhpcy5hcHByb3ZlZENvZGV9XCIgb3IgU3RhdHVzIGVxIFwiJHt0aGlzLndvcmtpbmdDb2RlfVwiIG9yIFN0YXR1cyBlcSBcIiR7dGhpcy5wYXJ0aWFsU2hpcENvZGV9XCIpYDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHZpZXc6ICdiaWxsdG9hY2NvdW50X3NhbGVzb3JkZXJzX3JlbGF0ZWQnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ09wZW5JbnZvaWNlcycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuaW52b2ljZXNUZXh0LFxyXG4gICAgICAgIHdoZXJlOiBmdW5jdGlvbiB3aGVyZShlbnRyeSkge1xyXG4gICAgICAgICAgcmV0dXJuIGBFcnBCaWxsVG8uRXJwQmlsbFRvQWNjb3VudHMuSWQgZXEgXCIke2VudHJ5LiRrZXl9XCIgYW5kIChFcnBTdGF0dXMgZXEgXCIke3RoaXMub3BlbkNvZGV9XCIgb3IgRXJwU3RhdHVzIGVxIFwiJHt0aGlzLnBhcnRpYWxQYWlkQ29kZX1cIiBvciBFcnBTdGF0dXMgZXEgXCIke3RoaXMuZGlzcHV0ZUNvZGV9XCIpYDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHZpZXc6ICdiaWxsdG9hY2NvdW50X29wZW5pbnZvaWNlc19yZWxhdGVkJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdSZWNlaXZhYmxlcycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucmVjZWl2YWJsZXNUZXh0LFxyXG4gICAgICAgIHdoZXJlOiBmdW5jdGlvbiB3aGVyZShlbnRyeSkge1xyXG4gICAgICAgICAgcmV0dXJuIGBFcnBCaWxsVG8uRXJwQmlsbFRvQWNjb3VudHMuSWQgZXEgXCIke2VudHJ5LiRrZXl9XCJgO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdmlldzogJ2JpbGx0b2FjY291bnRfcmVjZWl2YWJsZXNfcmVsYXRlZCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnUmV0dXJucycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucmV0dXJuc1RleHQsXHJcbiAgICAgICAgd2hlcmU6IGZ1bmN0aW9uIHdoZXJlKGVudHJ5KSB7XHJcbiAgICAgICAgICByZXR1cm4gYEVycEJpbGxUby5FcnBCaWxsVG9BY2NvdW50cy5JZCBlcSBcIiR7ZW50cnkuJGtleX1cImA7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB2aWV3OiAnYmlsbHRvYWNjb3VudF9yZXR1cm5zX3JlbGF0ZWQnLFxyXG4gICAgICB9XSxcclxuICAgIH1dKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5WaWV3cy5FUlBCaWxsVG9BY2NvdW50cy5EZXRhaWwnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19