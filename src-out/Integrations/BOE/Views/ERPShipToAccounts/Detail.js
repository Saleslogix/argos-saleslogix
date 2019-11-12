define('crm/Integrations/BOE/Views/ERPShipToAccounts/Detail', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'crm/Format', 'argos/Detail', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _Format, _Detail, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('erpShipToAccountsDetail');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPShipToAccounts.Detail', [_Detail2.default], {
    // Localization
    titleText: resource.titleText,
    actionsText: resource.actionsText,
    relatedItemsText: resource.relatedItemsText,
    nameText: resource.nameText,
    addressText: resource.addressText,
    statusText: resource.statusText,
    mainPhoneText: resource.mainPhoneText,
    faxText: resource.faxText,
    emailText: resource.emailText,
    paymentTermText: resource.paymentTermText,
    carrierText: resource.carrierText,
    entityText: resource.entityText,
    // Related Views
    accountsText: resource.accountsText,
    openQuotesText: resource.openQuotesText,
    salesOrdersText: resource.salesOrdersText,
    invoicesText: resource.invoicesText,
    shipmentsText: resource.shipmentsText,
    receivablesText: resource.receivablesText,
    returnsText: resource.returnsText,
    contactAssociationText: resource.contactAssociationText,
    shipToText: resource.shipToText,
    billToText: resource.billToText,
    salesPersonText: resource.salesPersonText,

    // Picklist Codes
    openCode: 'Open',
    newCode: 'New',
    approvedCode: 'Approved',
    workingCode: 'Working',
    partialShipCode: 'PartiallyShipped',
    partialPaidCode: 'PartialPaid',
    closedCode: 'Closed',
    disputeCode: 'Dispute',
    pickReadyCode: 'PickReady',
    releasedCode: 'Released',
    allocatedCode: 'Allocated',
    stagedCode: 'Staged',
    loadedCode: 'Loaded',

    // View Properties
    id: 'erpshiptoaccount_detail',
    modelName: _Names2.default.ERPSHIPTOACCOUNT,
    resourceKind: 'erpShipToAccounts',
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
          property: 'ErpShipTo.Name',
          label: this.nameText
        }, {
          name: 'Address',
          property: 'ErpShipTo.Address',
          label: this.addressText,
          renderer: function renderer(val) {
            if (val) {
              return _Format2.default.address(val);
            }
          }
        }, {
          name: 'ERPStatus',
          property: 'ErpShipTo.ErpStatus',
          label: this.statusText
        }, {
          name: 'MainPhone',
          property: 'ErpShipTo.MainPhone',
          label: this.mainPhoneText,
          renderer: function renderer(val) {
            if (val) {
              return _Format2.default.phone(val);
            }
          }
        }, {
          name: 'Fax',
          property: 'ErpShipTo.Fax',
          label: this.faxText
        }, {
          name: 'Email',
          property: 'ErpShipTo.Email',
          label: this.emailText,
          renderer: function renderer(val) {
            if (val) {
              return _Format2.default.mail(val);
            }
          }
        }, {
          name: 'ERPPaymentTerm',
          property: 'ErpShipTo.PaymentTermId',
          label: this.paymentTermText
        }, {
          name: 'Carrier',
          property: 'ErpShipTo.CarrierName',
          label: this.carrierText
        }]
      }, {
        title: this.relatedItemsText,
        list: true,
        name: 'RelatedItemsSection',
        children: [
        // {
        // name: 'ShipToAccounts',
        // label: this.accountsText,
        // where: function(entry) {
        // return 'ErpShipToAccounts.Id eq "' + entry.$key + '"';
        // },
        // view: 'erpshiptoaccount_accounts_related'
        // },
        {
          name: 'OpenQuotesList',
          label: this.openQuotesText,
          where: function where(entry) {
            return 'ShipTo.ErpShipToAccounts.Id eq "' + entry.$key + '" and (Status eq "' + this.openCode + '" or Status eq "' + this.newCode + '")';
          },
          view: 'erpshiptoaccount_quotes_related'
        }, {
          name: 'SalesOrders',
          label: this.salesOrdersText,
          where: function where(entry) {
            return 'ErpShipTo.ErpShipToAccounts.Id eq "' + entry.$key + '" and (Status eq "' + this.openCode + '" or Status eq "' + this.approvedCode + '" or Status eq "' + this.workingCode + '" or Status eq "' + this.partialShipCode + '")';
          },
          view: 'erpshiptoaccount_salesorders_related'
        },
        // {
        // name: 'OpenInvoices',
        // label: this.invoicesText,
        // where: function(entry) {
        // return 'ErpShipTo.ErpShipToAccounts.Id eq "' + entry.$key + '" and ErpStatus eq "Open"';
        // },
        // view: 'erpshiptoaccount_invoices_related'
        // },
        {
          name: 'Shipments',
          label: this.shipmentsText,
          where: function where(entry) {
            return 'ErpShipTo.ErpShipToAccounts.Id eq "' + entry.$key + '" and (ErpStatus eq "' + this.openCode + '" or ErpStatus eq "' + this.partialShipCode + '" or ErpStatus eq "' + this.releasedCode + '" or ErpStatus eq "' + this.allocatedCode + '" or ErpStatus eq "' + this.stagedCode + '" or ErpStatus eq "' + this.loadedCode + '")';
          },
          view: 'erpshiptoaccount_shipments_related'
        },
        // {
        // name: 'Receivables',
        // label: this.receivablesText,
        // where: function(entry) {
        // return 'ErpShipTo.ErpShipToAccounts.Id eq "' + entry.$key + '"';
        // },
        // view: 'erpshiptoaccount_receivables_related'
        // },
        {
          name: 'Returns',
          label: this.returnsText,
          where: function where(entry) {
            return 'ErpShipTo.ErpShipToAccounts.Id eq "' + entry.$key + '"';
          },
          view: 'erpshiptoaccount_returns_related'
        }, {
          name: 'ContactAssociations',
          label: this.contactAssociationText,
          where: function where(entry) {
            return 'Account.ErpShipToAccounts.Id eq "' + entry.$key + '"';
          },
          view: 'erpshiptoaccount_contactassociations_related'
        }]
      }]);
    }
  });

  _lang2.default.setObject('icboe.Views.ERPShipToAccounts.Detail', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0VSUFNoaXBUb0FjY291bnRzL0RldGFpbC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJ0aXRsZVRleHQiLCJhY3Rpb25zVGV4dCIsInJlbGF0ZWRJdGVtc1RleHQiLCJuYW1lVGV4dCIsImFkZHJlc3NUZXh0Iiwic3RhdHVzVGV4dCIsIm1haW5QaG9uZVRleHQiLCJmYXhUZXh0IiwiZW1haWxUZXh0IiwicGF5bWVudFRlcm1UZXh0IiwiY2FycmllclRleHQiLCJlbnRpdHlUZXh0IiwiYWNjb3VudHNUZXh0Iiwib3BlblF1b3Rlc1RleHQiLCJzYWxlc09yZGVyc1RleHQiLCJpbnZvaWNlc1RleHQiLCJzaGlwbWVudHNUZXh0IiwicmVjZWl2YWJsZXNUZXh0IiwicmV0dXJuc1RleHQiLCJjb250YWN0QXNzb2NpYXRpb25UZXh0Iiwic2hpcFRvVGV4dCIsImJpbGxUb1RleHQiLCJzYWxlc1BlcnNvblRleHQiLCJvcGVuQ29kZSIsIm5ld0NvZGUiLCJhcHByb3ZlZENvZGUiLCJ3b3JraW5nQ29kZSIsInBhcnRpYWxTaGlwQ29kZSIsInBhcnRpYWxQYWlkQ29kZSIsImNsb3NlZENvZGUiLCJkaXNwdXRlQ29kZSIsInBpY2tSZWFkeUNvZGUiLCJyZWxlYXNlZENvZGUiLCJhbGxvY2F0ZWRDb2RlIiwic3RhZ2VkQ29kZSIsImxvYWRlZENvZGUiLCJpZCIsIm1vZGVsTmFtZSIsIkVSUFNISVBUT0FDQ09VTlQiLCJyZXNvdXJjZUtpbmQiLCJlbmFibGVPZmZsaW5lIiwiY3JlYXRlTGF5b3V0IiwibGF5b3V0IiwidGl0bGUiLCJsaXN0IiwiY2xzIiwibmFtZSIsImNoaWxkcmVuIiwiZGV0YWlsc1RleHQiLCJwcm9wZXJ0eSIsImxhYmVsIiwicmVuZGVyZXIiLCJ2YWwiLCJhZGRyZXNzIiwicGhvbmUiLCJtYWlsIiwid2hlcmUiLCJlbnRyeSIsIiRrZXkiLCJ2aWV3Iiwic2V0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LEVBQXVEN0QsT0FBdkQ7b0JBQ2VBLE8iLCJmaWxlIjoiRGV0YWlsLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICdjcm0vRm9ybWF0JztcclxuaW1wb3J0IERldGFpbCBmcm9tICdhcmdvcy9EZXRhaWwnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXJwU2hpcFRvQWNjb3VudHNEZXRhaWwnKTtcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5WaWV3cy5FUlBTaGlwVG9BY2NvdW50cy5EZXRhaWwnLCBbRGV0YWlsXSwge1xyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIGFjdGlvbnNUZXh0OiByZXNvdXJjZS5hY3Rpb25zVGV4dCxcclxuICByZWxhdGVkSXRlbXNUZXh0OiByZXNvdXJjZS5yZWxhdGVkSXRlbXNUZXh0LFxyXG4gIG5hbWVUZXh0OiByZXNvdXJjZS5uYW1lVGV4dCxcclxuICBhZGRyZXNzVGV4dDogcmVzb3VyY2UuYWRkcmVzc1RleHQsXHJcbiAgc3RhdHVzVGV4dDogcmVzb3VyY2Uuc3RhdHVzVGV4dCxcclxuICBtYWluUGhvbmVUZXh0OiByZXNvdXJjZS5tYWluUGhvbmVUZXh0LFxyXG4gIGZheFRleHQ6IHJlc291cmNlLmZheFRleHQsXHJcbiAgZW1haWxUZXh0OiByZXNvdXJjZS5lbWFpbFRleHQsXHJcbiAgcGF5bWVudFRlcm1UZXh0OiByZXNvdXJjZS5wYXltZW50VGVybVRleHQsXHJcbiAgY2FycmllclRleHQ6IHJlc291cmNlLmNhcnJpZXJUZXh0LFxyXG4gIGVudGl0eVRleHQ6IHJlc291cmNlLmVudGl0eVRleHQsXHJcbiAgLy8gUmVsYXRlZCBWaWV3c1xyXG4gIGFjY291bnRzVGV4dDogcmVzb3VyY2UuYWNjb3VudHNUZXh0LFxyXG4gIG9wZW5RdW90ZXNUZXh0OiByZXNvdXJjZS5vcGVuUXVvdGVzVGV4dCxcclxuICBzYWxlc09yZGVyc1RleHQ6IHJlc291cmNlLnNhbGVzT3JkZXJzVGV4dCxcclxuICBpbnZvaWNlc1RleHQ6IHJlc291cmNlLmludm9pY2VzVGV4dCxcclxuICBzaGlwbWVudHNUZXh0OiByZXNvdXJjZS5zaGlwbWVudHNUZXh0LFxyXG4gIHJlY2VpdmFibGVzVGV4dDogcmVzb3VyY2UucmVjZWl2YWJsZXNUZXh0LFxyXG4gIHJldHVybnNUZXh0OiByZXNvdXJjZS5yZXR1cm5zVGV4dCxcclxuICBjb250YWN0QXNzb2NpYXRpb25UZXh0OiByZXNvdXJjZS5jb250YWN0QXNzb2NpYXRpb25UZXh0LFxyXG4gIHNoaXBUb1RleHQ6IHJlc291cmNlLnNoaXBUb1RleHQsXHJcbiAgYmlsbFRvVGV4dDogcmVzb3VyY2UuYmlsbFRvVGV4dCxcclxuICBzYWxlc1BlcnNvblRleHQ6IHJlc291cmNlLnNhbGVzUGVyc29uVGV4dCxcclxuXHJcbiAgLy8gUGlja2xpc3QgQ29kZXNcclxuICBvcGVuQ29kZTogJ09wZW4nLFxyXG4gIG5ld0NvZGU6ICdOZXcnLFxyXG4gIGFwcHJvdmVkQ29kZTogJ0FwcHJvdmVkJyxcclxuICB3b3JraW5nQ29kZTogJ1dvcmtpbmcnLFxyXG4gIHBhcnRpYWxTaGlwQ29kZTogJ1BhcnRpYWxseVNoaXBwZWQnLFxyXG4gIHBhcnRpYWxQYWlkQ29kZTogJ1BhcnRpYWxQYWlkJyxcclxuICBjbG9zZWRDb2RlOiAnQ2xvc2VkJyxcclxuICBkaXNwdXRlQ29kZTogJ0Rpc3B1dGUnLFxyXG4gIHBpY2tSZWFkeUNvZGU6ICdQaWNrUmVhZHknLFxyXG4gIHJlbGVhc2VkQ29kZTogJ1JlbGVhc2VkJyxcclxuICBhbGxvY2F0ZWRDb2RlOiAnQWxsb2NhdGVkJyxcclxuICBzdGFnZWRDb2RlOiAnU3RhZ2VkJyxcclxuICBsb2FkZWRDb2RlOiAnTG9hZGVkJyxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdlcnBzaGlwdG9hY2NvdW50X2RldGFpbCcsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5FUlBTSElQVE9BQ0NPVU5ULFxyXG4gIHJlc291cmNlS2luZDogJ2VycFNoaXBUb0FjY291bnRzJyxcclxuICBlbmFibGVPZmZsaW5lOiB0cnVlLFxyXG5cclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICB0aXRsZTogdGhpcy5hY3Rpb25zVGV4dCxcclxuICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgY2xzOiAnYWN0aW9uLWxpc3QnLFxyXG4gICAgICBuYW1lOiAnUXVpY2tBY3Rpb25zU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgIH0sIHtcclxuICAgICAgdGl0bGU6IHRoaXMuZGV0YWlsc1RleHQsXHJcbiAgICAgIG5hbWU6ICdEZXRhaWxzU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIG5hbWU6ICdOYW1lJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFNoaXBUby5OYW1lJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5uYW1lVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdBZGRyZXNzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFNoaXBUby5BZGRyZXNzJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5hZGRyZXNzVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIodmFsKSB7XHJcbiAgICAgICAgICBpZiAodmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXQuYWRkcmVzcyh2YWwpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRVJQU3RhdHVzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFNoaXBUby5FcnBTdGF0dXMnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnN0YXR1c1RleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnTWFpblBob25lJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFNoaXBUby5NYWluUGhvbmUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLm1haW5QaG9uZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKHZhbCkge1xyXG4gICAgICAgICAgaWYgKHZhbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0LnBob25lKHZhbCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdGYXgnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwU2hpcFRvLkZheCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZmF4VGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFbWFpbCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBTaGlwVG8uRW1haWwnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmVtYWlsVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIodmFsKSB7XHJcbiAgICAgICAgICBpZiAodmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXQubWFpbCh2YWwpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRVJQUGF5bWVudFRlcm0nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwU2hpcFRvLlBheW1lbnRUZXJtSWQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnBheW1lbnRUZXJtVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdDYXJyaWVyJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFNoaXBUby5DYXJyaWVyTmFtZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuY2FycmllclRleHQsXHJcbiAgICAgIH1dLFxyXG4gICAgfSwge1xyXG4gICAgICB0aXRsZTogdGhpcy5yZWxhdGVkSXRlbXNUZXh0LFxyXG4gICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICBuYW1lOiAnUmVsYXRlZEl0ZW1zU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vIG5hbWU6ICdTaGlwVG9BY2NvdW50cycsXHJcbiAgICAgICAgLy8gbGFiZWw6IHRoaXMuYWNjb3VudHNUZXh0LFxyXG4gICAgICAgIC8vIHdoZXJlOiBmdW5jdGlvbihlbnRyeSkge1xyXG4gICAgICAgIC8vIHJldHVybiAnRXJwU2hpcFRvQWNjb3VudHMuSWQgZXEgXCInICsgZW50cnkuJGtleSArICdcIic7XHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICAvLyB2aWV3OiAnZXJwc2hpcHRvYWNjb3VudF9hY2NvdW50c19yZWxhdGVkJ1xyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbmFtZTogJ09wZW5RdW90ZXNMaXN0JyxcclxuICAgICAgICAgIGxhYmVsOiB0aGlzLm9wZW5RdW90ZXNUZXh0LFxyXG4gICAgICAgICAgd2hlcmU6IGZ1bmN0aW9uIHdoZXJlKGVudHJ5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgU2hpcFRvLkVycFNoaXBUb0FjY291bnRzLklkIGVxIFwiJHtlbnRyeS4ka2V5fVwiIGFuZCAoU3RhdHVzIGVxIFwiJHt0aGlzLm9wZW5Db2RlfVwiIG9yIFN0YXR1cyBlcSBcIiR7dGhpcy5uZXdDb2RlfVwiKWA7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgdmlldzogJ2VycHNoaXB0b2FjY291bnRfcXVvdGVzX3JlbGF0ZWQnLFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIG5hbWU6ICdTYWxlc09yZGVycycsXHJcbiAgICAgICAgICBsYWJlbDogdGhpcy5zYWxlc09yZGVyc1RleHQsXHJcbiAgICAgICAgICB3aGVyZTogZnVuY3Rpb24gd2hlcmUoZW50cnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGBFcnBTaGlwVG8uRXJwU2hpcFRvQWNjb3VudHMuSWQgZXEgXCIke2VudHJ5LiRrZXl9XCIgYW5kIChTdGF0dXMgZXEgXCIke3RoaXMub3BlbkNvZGV9XCIgb3IgU3RhdHVzIGVxIFwiJHt0aGlzLmFwcHJvdmVkQ29kZX1cIiBvciBTdGF0dXMgZXEgXCIke3RoaXMud29ya2luZ0NvZGV9XCIgb3IgU3RhdHVzIGVxIFwiJHt0aGlzLnBhcnRpYWxTaGlwQ29kZX1cIilgO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHZpZXc6ICdlcnBzaGlwdG9hY2NvdW50X3NhbGVzb3JkZXJzX3JlbGF0ZWQnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vIG5hbWU6ICdPcGVuSW52b2ljZXMnLFxyXG4gICAgICAgIC8vIGxhYmVsOiB0aGlzLmludm9pY2VzVGV4dCxcclxuICAgICAgICAvLyB3aGVyZTogZnVuY3Rpb24oZW50cnkpIHtcclxuICAgICAgICAvLyByZXR1cm4gJ0VycFNoaXBUby5FcnBTaGlwVG9BY2NvdW50cy5JZCBlcSBcIicgKyBlbnRyeS4ka2V5ICsgJ1wiIGFuZCBFcnBTdGF0dXMgZXEgXCJPcGVuXCInO1xyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgLy8gdmlldzogJ2VycHNoaXB0b2FjY291bnRfaW52b2ljZXNfcmVsYXRlZCdcclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6ICdTaGlwbWVudHMnLFxyXG4gICAgICAgICAgbGFiZWw6IHRoaXMuc2hpcG1lbnRzVGV4dCxcclxuICAgICAgICAgIHdoZXJlOiBmdW5jdGlvbiB3aGVyZShlbnRyeSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYEVycFNoaXBUby5FcnBTaGlwVG9BY2NvdW50cy5JZCBlcSBcIiR7ZW50cnkuJGtleX1cIiBhbmQgKEVycFN0YXR1cyBlcSBcIiR7dGhpcy5vcGVuQ29kZX1cIiBvciBFcnBTdGF0dXMgZXEgXCIke3RoaXMucGFydGlhbFNoaXBDb2RlfVwiIG9yIEVycFN0YXR1cyBlcSBcIiR7dGhpcy5yZWxlYXNlZENvZGV9XCIgb3IgRXJwU3RhdHVzIGVxIFwiJHt0aGlzLmFsbG9jYXRlZENvZGV9XCIgb3IgRXJwU3RhdHVzIGVxIFwiJHt0aGlzLnN0YWdlZENvZGV9XCIgb3IgRXJwU3RhdHVzIGVxIFwiJHt0aGlzLmxvYWRlZENvZGV9XCIpYDtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB2aWV3OiAnZXJwc2hpcHRvYWNjb3VudF9zaGlwbWVudHNfcmVsYXRlZCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gbmFtZTogJ1JlY2VpdmFibGVzJyxcclxuICAgICAgICAvLyBsYWJlbDogdGhpcy5yZWNlaXZhYmxlc1RleHQsXHJcbiAgICAgICAgLy8gd2hlcmU6IGZ1bmN0aW9uKGVudHJ5KSB7XHJcbiAgICAgICAgLy8gcmV0dXJuICdFcnBTaGlwVG8uRXJwU2hpcFRvQWNjb3VudHMuSWQgZXEgXCInICsgZW50cnkuJGtleSArICdcIic7XHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICAvLyB2aWV3OiAnZXJwc2hpcHRvYWNjb3VudF9yZWNlaXZhYmxlc19yZWxhdGVkJ1xyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbmFtZTogJ1JldHVybnMnLFxyXG4gICAgICAgICAgbGFiZWw6IHRoaXMucmV0dXJuc1RleHQsXHJcbiAgICAgICAgICB3aGVyZTogZnVuY3Rpb24gd2hlcmUoZW50cnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGBFcnBTaGlwVG8uRXJwU2hpcFRvQWNjb3VudHMuSWQgZXEgXCIke2VudHJ5LiRrZXl9XCJgO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHZpZXc6ICdlcnBzaGlwdG9hY2NvdW50X3JldHVybnNfcmVsYXRlZCcsXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgbmFtZTogJ0NvbnRhY3RBc3NvY2lhdGlvbnMnLFxyXG4gICAgICAgICAgbGFiZWw6IHRoaXMuY29udGFjdEFzc29jaWF0aW9uVGV4dCxcclxuICAgICAgICAgIHdoZXJlOiBmdW5jdGlvbiB3aGVyZShlbnRyeSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYEFjY291bnQuRXJwU2hpcFRvQWNjb3VudHMuSWQgZXEgXCIke2VudHJ5LiRrZXl9XCJgO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHZpZXc6ICdlcnBzaGlwdG9hY2NvdW50X2NvbnRhY3Rhc3NvY2lhdGlvbnNfcmVsYXRlZCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyAsIHtcclxuICAgICAgICAvLyBuYW1lOiAnQmlsbC1UbycsXHJcbiAgICAgICAgLy8gbGFiZWw6IHRoaXMuYmlsbFRvVGV4dCxcclxuICAgICAgICAvLyB3aGVyZTogZnVuY3Rpb24oZW50cnkpIHtcclxuICAgICAgICAvLyByZXR1cm4gJ0VycEJpbGxUby5FcnBCaWxsVG9BY2NvdW50cy5JZCBlcSBcIicgKyBlbnRyeS4ka2V5ICsgJ1wiJztcclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIC8vIHZpZXc6ICdlcnBzaGlwdG9hY2NvdW50X2JpbGx0b19yZWxhdGVkJ1xyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vIG5hbWU6ICdTYWxlc1BlcnNvbicsXHJcbiAgICAgICAgLy8gbGFiZWw6IHRoaXMuc2FsZXNQZXJzb25UZXh0LFxyXG4gICAgICAgIC8vIHdoZXJlOiBmdW5jdGlvbihlbnRyeSkge1xyXG4gICAgICAgIC8vIHJldHVybiAnU2FsZXNPcmRlci5FcnBTaGlwVG8uRXJwU2hpcFRvQWNjb3VudHMuSWQgZXEgXCInICsgZW50cnkuJGtleSArICdcIic7XHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICAvLyB2aWV3OiAnZXJwc2hpcHRvYWNjb3VudF9zYWxlc3BlcnNvbl9yZWxhdGVkJ1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgXSxcclxuICAgIH1dKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5WaWV3cy5FUlBTaGlwVG9BY2NvdW50cy5EZXRhaWwnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19