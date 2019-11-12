define('crm/Integrations/BOE/Views/ERPInvoices/Detail', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'crm/Format', 'argos/Detail', '../../Models/Names', '../../Utility', 'argos/I18n'], function (module, exports, _declare, _lang, _Format, _Detail, _Names, _Utility, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Format2 = _interopRequireDefault(_Format);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _Names2 = _interopRequireDefault(_Names);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('erpInvoicesDetail'); /* Copyright 2017 Infor
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

  /**
   * @class crm.Views.Account.Detail
   *
   *
   * @extends argos.Detail
   * @requires argos.Detail
   * @requires crm.Format
   * @requires crm.Template
   *
   */


  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPInvoices.Detail', [_Detail2.default], {
    // Localization
    titleText: resource.titleText,
    accountText: resource.accountText,
    statusText: resource.statusText,
    ownerText: resource.ownerText,
    termsText: resource.termsText,
    statusDateText: resource.statusDateText,
    unknownText: resource.unknownText,
    descriptionText: resource.descriptionText,
    invoiceNumberText: resource.invoiceNumberText,
    extendedBaseAmountText: resource.extendedBaseAmountText,
    extendedAmountText: resource.extendedAmountText,
    totalBaseAmountText: resource.totalBaseAmountText,
    totalAmountText: resource.totalAmountText,
    nameText: resource.nameText,
    mainPhoneText: resource.mainPhoneText,
    addressText: resource.addressText,
    actionsText: resource.actionsText,
    relatedItemsText: resource.relatedItemsText,
    invoiceItemsText: resource.invoiceItemsText,
    receivablesText: resource.receivablesText,
    billToText: resource.billToText,
    shipToText: resource.shipToText,
    salesPersonsText: resource.salesPersonsText,
    entityText: resource.entityText,
    documentDateText: resource.documentDateText,

    // View Properties
    id: 'invoice_detail',
    modelName: _Names2.default.ERPINVOICE,
    resourceKind: 'erpInvoices',
    enableOffline: true,

    callMainPhone: function callMainPhone() {
      this.recordCallToHistory(_lang2.default.hitch(this, function initiateCall() {
        App.initiateCall(this.entry.MainPhone);
      }));
    },
    formatPicklist: function formatPicklist(property) {
      return _Format2.default.picklist(this.app.picklistService, this._model, property);
    },
    createLayout: function createLayout() {
      var _this = this;

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
          name: 'InvoiceNumber',
          property: 'InvoiceNumber',
          label: this.invoiceNumberText
        }, {
          name: 'AccountName',
          property: 'Account.AccountName',
          label: this.accountText,
          descriptor: 'AccountName',
          view: 'account_detail',
          key: 'Account.$key'
        }, {
          name: 'Description',
          property: 'Description',
          label: this.descriptionText
        }, {
          label: this.extendedBaseAmountText,
          name: 'ErpExtendedBaseAmount',
          property: 'ErpExtendedBaseAmount',
          renderer: function renderer(value) {
            return _Utility2.default.formatMultiCurrency(value, _this.entry.BaseCurrencyCode);
          }
        }, {
          label: this.extendedAmountText,
          name: 'ErpExtendedAmount',
          property: 'ErpExtendedAmount',
          renderer: function renderer(value) {
            return _Utility2.default.formatMultiCurrency(value, _this.entry.CurrencyCode);
          }
        }, {
          label: this.totalBaseAmountText,
          name: 'ErpTotalBaseAmount',
          property: 'ErpTotalBaseAmount',
          renderer: function renderer(value) {
            return _Utility2.default.formatMultiCurrency(value, _this.entry.BaseCurrencyCode);
          }
        }, {
          label: this.totalAmountText,
          name: 'GrandTotal',
          property: 'GrandTotal',
          renderer: function renderer(value) {
            return _Utility2.default.formatMultiCurrency(value, _this.entry.CurrencyCode);
          }
        }, {
          name: 'ErpStatus',
          property: 'ErpStatus',
          label: this.statusText,
          renderer: this.formatPicklist('ErpStatus')
        }, {
          name: 'ErpStatusDate',
          property: 'ErpStatusDate',
          label: this.statusDateText,
          renderer: _Format2.default.date.bindDelegate(this, null, true)
        }, {
          name: 'ErpDocumentDate',
          property: 'ErpDocumentDate',
          label: this.documentDateText,
          renderer: function renderer(data) {
            return _Format2.default.date(data);
          }
        }, {
          name: 'ErpPaymentTermId',
          property: 'ErpPaymentTermId',
          label: this.termsText
        }]
      }, {
        title: this.billToText,
        name: 'BillToSection',
        children: [{
          name: 'BillToName',
          property: 'ErpBillTo.Name',
          label: this.nameText,
          view: 'erpbillto_detail',
          key: 'ErpBillTo.$key'
        }, {
          name: 'BillToMainPhone',
          property: 'ErpBillTo.MainPhone',
          label: this.mainPhoneText
        }, {
          name: 'BillToAddress',
          property: 'ErpBillTo.Address',
          label: this.addressText,
          renderer: function renderer(val) {
            if (val) {
              return _Format2.default.address(val);
            }
          }
        }]
      }, {
        title: this.shipToText,
        name: 'ShipSection',
        children: [{
          name: 'ShipToName',
          property: 'ErpShipTo.Name',
          label: this.nameText,
          view: 'erpshipto_detail',
          key: 'ErpShipTo.$key'
        }, {
          name: 'ShipToMainPhone',
          property: 'ErpShipTo.MainPhone',
          label: this.mainPhoneText
        }, {
          name: 'ShipToAddress',
          property: 'ErpShipTo.Address',
          label: this.addressText,
          renderer: function renderer(val) {
            if (val) {
              return _Format2.default.address(val);
            }
          }
        }]
      }, {
        title: this.relatedItemsText,
        list: true,
        name: 'RelatedItemsSection',
        children: [{
          name: 'ERPInvoiceItemsRelated',
          label: this.invoiceItemsText,
          where: this.formatRelatedQuery.bindDelegate(this, 'ErpInvoice.Id eq "${0}"'),
          view: 'invoice_items_related'
        }, {
          name: 'ERPReceivable',
          label: this.receivablesText,
          where: this.formatRelatedQuery.bindDelegate(this, 'ErpInvoice.Id eq "${0}"'),
          view: 'invoice_receivables_related'
        }]
      }]);
    }
  });

  _lang2.default.setObject('icboe.Views.ERPInvoices.Detail', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0VSUEludm9pY2VzL0RldGFpbC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJ0aXRsZVRleHQiLCJhY2NvdW50VGV4dCIsInN0YXR1c1RleHQiLCJvd25lclRleHQiLCJ0ZXJtc1RleHQiLCJzdGF0dXNEYXRlVGV4dCIsInVua25vd25UZXh0IiwiZGVzY3JpcHRpb25UZXh0IiwiaW52b2ljZU51bWJlclRleHQiLCJleHRlbmRlZEJhc2VBbW91bnRUZXh0IiwiZXh0ZW5kZWRBbW91bnRUZXh0IiwidG90YWxCYXNlQW1vdW50VGV4dCIsInRvdGFsQW1vdW50VGV4dCIsIm5hbWVUZXh0IiwibWFpblBob25lVGV4dCIsImFkZHJlc3NUZXh0IiwiYWN0aW9uc1RleHQiLCJyZWxhdGVkSXRlbXNUZXh0IiwiaW52b2ljZUl0ZW1zVGV4dCIsInJlY2VpdmFibGVzVGV4dCIsImJpbGxUb1RleHQiLCJzaGlwVG9UZXh0Iiwic2FsZXNQZXJzb25zVGV4dCIsImVudGl0eVRleHQiLCJkb2N1bWVudERhdGVUZXh0IiwiaWQiLCJtb2RlbE5hbWUiLCJFUlBJTlZPSUNFIiwicmVzb3VyY2VLaW5kIiwiZW5hYmxlT2ZmbGluZSIsImNhbGxNYWluUGhvbmUiLCJyZWNvcmRDYWxsVG9IaXN0b3J5IiwiaGl0Y2giLCJpbml0aWF0ZUNhbGwiLCJBcHAiLCJlbnRyeSIsIk1haW5QaG9uZSIsImZvcm1hdFBpY2tsaXN0IiwicHJvcGVydHkiLCJwaWNrbGlzdCIsImFwcCIsInBpY2tsaXN0U2VydmljZSIsIl9tb2RlbCIsImNyZWF0ZUxheW91dCIsImxheW91dCIsInRpdGxlIiwibGlzdCIsImNscyIsIm5hbWUiLCJjaGlsZHJlbiIsImRldGFpbHNUZXh0IiwibGFiZWwiLCJkZXNjcmlwdG9yIiwidmlldyIsImtleSIsInJlbmRlcmVyIiwidmFsdWUiLCJmb3JtYXRNdWx0aUN1cnJlbmN5IiwiQmFzZUN1cnJlbmN5Q29kZSIsIkN1cnJlbmN5Q29kZSIsImRhdGUiLCJiaW5kRGVsZWdhdGUiLCJkYXRhIiwidmFsIiwiYWRkcmVzcyIsIndoZXJlIiwiZm9ybWF0UmVsYXRlZFF1ZXJ5Iiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUNBLE1BQU1BLFdBQVcsb0JBQVksbUJBQVosQ0FBakIsQyxDQWpDQTs7Ozs7Ozs7Ozs7Ozs7O0FBZUE7Ozs7Ozs7Ozs7OztBQW9CQSxNQUFNQyxVQUFVLHVCQUFRLCtDQUFSLEVBQXlELGtCQUF6RCxFQUFtRTtBQUNqRjtBQUNBQyxlQUFXRixTQUFTRSxTQUY2RDtBQUdqRkMsaUJBQWFILFNBQVNHLFdBSDJEO0FBSWpGQyxnQkFBWUosU0FBU0ksVUFKNEQ7QUFLakZDLGVBQVdMLFNBQVNLLFNBTDZEO0FBTWpGQyxlQUFXTixTQUFTTSxTQU42RDtBQU9qRkMsb0JBQWdCUCxTQUFTTyxjQVB3RDtBQVFqRkMsaUJBQWFSLFNBQVNRLFdBUjJEO0FBU2pGQyxxQkFBaUJULFNBQVNTLGVBVHVEO0FBVWpGQyx1QkFBbUJWLFNBQVNVLGlCQVZxRDtBQVdqRkMsNEJBQXdCWCxTQUFTVyxzQkFYZ0Q7QUFZakZDLHdCQUFvQlosU0FBU1ksa0JBWm9EO0FBYWpGQyx5QkFBcUJiLFNBQVNhLG1CQWJtRDtBQWNqRkMscUJBQWlCZCxTQUFTYyxlQWR1RDtBQWVqRkMsY0FBVWYsU0FBU2UsUUFmOEQ7QUFnQmpGQyxtQkFBZWhCLFNBQVNnQixhQWhCeUQ7QUFpQmpGQyxpQkFBYWpCLFNBQVNpQixXQWpCMkQ7QUFrQmpGQyxpQkFBYWxCLFNBQVNrQixXQWxCMkQ7QUFtQmpGQyxzQkFBa0JuQixTQUFTbUIsZ0JBbkJzRDtBQW9CakZDLHNCQUFrQnBCLFNBQVNvQixnQkFwQnNEO0FBcUJqRkMscUJBQWlCckIsU0FBU3FCLGVBckJ1RDtBQXNCakZDLGdCQUFZdEIsU0FBU3NCLFVBdEI0RDtBQXVCakZDLGdCQUFZdkIsU0FBU3VCLFVBdkI0RDtB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Um9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuQWNjb3VudC5EZXRhaWxcclxuICpcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuRGV0YWlsXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5EZXRhaWxcclxuICogQHJlcXVpcmVzIGNybS5Gb3JtYXRcclxuICogQHJlcXVpcmVzIGNybS5UZW1wbGF0ZVxyXG4gKlxyXG4gKi9cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICdjcm0vRm9ybWF0JztcclxuaW1wb3J0IERldGFpbCBmcm9tICdhcmdvcy9EZXRhaWwnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuaW1wb3J0IHV0aWxpdHkgZnJvbSAnLi4vLi4vVXRpbGl0eSc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2VycEludm9pY2VzRGV0YWlsJyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuRVJQSW52b2ljZXMuRGV0YWlsJywgW0RldGFpbF0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBhY2NvdW50VGV4dDogcmVzb3VyY2UuYWNjb3VudFRleHQsXHJcbiAgc3RhdHVzVGV4dDogcmVzb3VyY2Uuc3RhdHVzVGV4dCxcclxuICBvd25lclRleHQ6IHJlc291cmNlLm93bmVyVGV4dCxcclxuICB0ZXJtc1RleHQ6IHJlc291cmNlLnRlcm1zVGV4dCxcclxuICBzdGF0dXNEYXRlVGV4dDogcmVzb3VyY2Uuc3RhdHVzRGF0ZVRleHQsXHJcbiAgdW5rbm93blRleHQ6IHJlc291cmNlLnVua25vd25UZXh0LFxyXG4gIGRlc2NyaXB0aW9uVGV4dDogcmVzb3VyY2UuZGVzY3JpcHRpb25UZXh0LFxyXG4gIGludm9pY2VOdW1iZXJUZXh0OiByZXNvdXJjZS5pbnZvaWNlTnVtYmVyVGV4dCxcclxuICBleHRlbmRlZEJhc2VBbW91bnRUZXh0OiByZXNvdXJjZS5leHRlbmRlZEJhc2VBbW91bnRUZXh0LFxyXG4gIGV4dGVuZGVkQW1vdW50VGV4dDogcmVzb3VyY2UuZXh0ZW5kZWRBbW91bnRUZXh0LFxyXG4gIHRvdGFsQmFzZUFtb3VudFRleHQ6IHJlc291cmNlLnRvdGFsQmFzZUFtb3VudFRleHQsXHJcbiAgdG90YWxBbW91bnRUZXh0OiByZXNvdXJjZS50b3RhbEFtb3VudFRleHQsXHJcbiAgbmFtZVRleHQ6IHJlc291cmNlLm5hbWVUZXh0LFxyXG4gIG1haW5QaG9uZVRleHQ6IHJlc291cmNlLm1haW5QaG9uZVRleHQsXHJcbiAgYWRkcmVzc1RleHQ6IHJlc291cmNlLmFkZHJlc3NUZXh0LFxyXG4gIGFjdGlvbnNUZXh0OiByZXNvdXJjZS5hY3Rpb25zVGV4dCxcclxuICByZWxhdGVkSXRlbXNUZXh0OiByZXNvdXJjZS5yZWxhdGVkSXRlbXNUZXh0LFxyXG4gIGludm9pY2VJdGVtc1RleHQ6IHJlc291cmNlLmludm9pY2VJdGVtc1RleHQsXHJcbiAgcmVjZWl2YWJsZXNUZXh0OiByZXNvdXJjZS5yZWNlaXZhYmxlc1RleHQsXHJcbiAgYmlsbFRvVGV4dDogcmVzb3VyY2UuYmlsbFRvVGV4dCxcclxuICBzaGlwVG9UZXh0OiByZXNvdXJjZS5zaGlwVG9UZXh0LFxyXG4gIHNhbGVzUGVyc29uc1RleHQ6IHJlc291cmNlLnNhbGVzUGVyc29uc1RleHQsXHJcbiAgZW50aXR5VGV4dDogcmVzb3VyY2UuZW50aXR5VGV4dCxcclxuICBkb2N1bWVudERhdGVUZXh0OiByZXNvdXJjZS5kb2N1bWVudERhdGVUZXh0LFxyXG5cclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdpbnZvaWNlX2RldGFpbCcsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5FUlBJTlZPSUNFLFxyXG4gIHJlc291cmNlS2luZDogJ2VycEludm9pY2VzJyxcclxuICBlbmFibGVPZmZsaW5lOiB0cnVlLFxyXG5cclxuICBjYWxsTWFpblBob25lOiBmdW5jdGlvbiBjYWxsTWFpblBob25lKCkge1xyXG4gICAgdGhpcy5yZWNvcmRDYWxsVG9IaXN0b3J5KGxhbmcuaGl0Y2godGhpcywgZnVuY3Rpb24gaW5pdGlhdGVDYWxsKCkge1xyXG4gICAgICBBcHAuaW5pdGlhdGVDYWxsKHRoaXMuZW50cnkuTWFpblBob25lKTtcclxuICAgIH0pKTtcclxuICB9LFxyXG4gIGZvcm1hdFBpY2tsaXN0OiBmdW5jdGlvbiBmb3JtYXRQaWNrbGlzdChwcm9wZXJ0eSkge1xyXG4gICAgcmV0dXJuIGZvcm1hdC5waWNrbGlzdCh0aGlzLmFwcC5waWNrbGlzdFNlcnZpY2UsIHRoaXMuX21vZGVsLCBwcm9wZXJ0eSk7XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICB0aXRsZTogdGhpcy5hY3Rpb25zVGV4dCxcclxuICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgY2xzOiAnYWN0aW9uLWxpc3QnLFxyXG4gICAgICBuYW1lOiAnUXVpY2tBY3Rpb25zU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgIH0sIHtcclxuICAgICAgdGl0bGU6IHRoaXMuZGV0YWlsc1RleHQsXHJcbiAgICAgIG5hbWU6ICdEZXRhaWxzU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIG5hbWU6ICdJbnZvaWNlTnVtYmVyJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0ludm9pY2VOdW1iZXInLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmludm9pY2VOdW1iZXJUZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0FjY291bnROYW1lJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0FjY291bnQuQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFjY291bnRUZXh0LFxyXG4gICAgICAgIGRlc2NyaXB0b3I6ICdBY2NvdW50TmFtZScsXHJcbiAgICAgICAgdmlldzogJ2FjY291bnRfZGV0YWlsJyxcclxuICAgICAgICBrZXk6ICdBY2NvdW50LiRrZXknLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5kZXNjcmlwdGlvblRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5leHRlbmRlZEJhc2VBbW91bnRUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdFcnBFeHRlbmRlZEJhc2VBbW91bnQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwRXh0ZW5kZWRCYXNlQW1vdW50JyxcclxuICAgICAgICByZW5kZXJlcjogKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdXRpbGl0eS5mb3JtYXRNdWx0aUN1cnJlbmN5KHZhbHVlLCB0aGlzLmVudHJ5LkJhc2VDdXJyZW5jeUNvZGUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5leHRlbmRlZEFtb3VudFRleHQsXHJcbiAgICAgICAgbmFtZTogJ0VycEV4dGVuZGVkQW1vdW50JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycEV4dGVuZGVkQW1vdW50JyxcclxuICAgICAgICByZW5kZXJlcjogKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdXRpbGl0eS5mb3JtYXRNdWx0aUN1cnJlbmN5KHZhbHVlLCB0aGlzLmVudHJ5LkN1cnJlbmN5Q29kZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnRvdGFsQmFzZUFtb3VudFRleHQsXHJcbiAgICAgICAgbmFtZTogJ0VycFRvdGFsQmFzZUFtb3VudCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBUb3RhbEJhc2VBbW91bnQnLFxyXG4gICAgICAgIHJlbmRlcmVyOiAodmFsdWUpID0+IHtcclxuICAgICAgICAgIHJldHVybiB1dGlsaXR5LmZvcm1hdE11bHRpQ3VycmVuY3kodmFsdWUsIHRoaXMuZW50cnkuQmFzZUN1cnJlbmN5Q29kZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnRvdGFsQW1vdW50VGV4dCxcclxuICAgICAgICBuYW1lOiAnR3JhbmRUb3RhbCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdHcmFuZFRvdGFsJyxcclxuICAgICAgICByZW5kZXJlcjogKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdXRpbGl0eS5mb3JtYXRNdWx0aUN1cnJlbmN5KHZhbHVlLCB0aGlzLmVudHJ5LkN1cnJlbmN5Q29kZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFcnBTdGF0dXMnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwU3RhdHVzJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zdGF0dXNUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiB0aGlzLmZvcm1hdFBpY2tsaXN0KCdFcnBTdGF0dXMnKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFcnBTdGF0dXNEYXRlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFN0YXR1c0RhdGUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnN0YXR1c0RhdGVUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmb3JtYXQuZGF0ZS5iaW5kRGVsZWdhdGUodGhpcywgbnVsbCwgdHJ1ZSksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwRG9jdW1lbnREYXRlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycERvY3VtZW50RGF0ZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZG9jdW1lbnREYXRlVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIoZGF0YSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdC5kYXRlKGRhdGEpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwUGF5bWVudFRlcm1JZCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBQYXltZW50VGVybUlkJyxcclxuICAgICAgICBsYWJlbDogdGhpcy50ZXJtc1RleHQsXHJcbiAgICAgIH1dLFxyXG4gICAgfSwge1xyXG4gICAgICB0aXRsZTogdGhpcy5iaWxsVG9UZXh0LFxyXG4gICAgICBuYW1lOiAnQmlsbFRvU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIG5hbWU6ICdCaWxsVG9OYW1lJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycEJpbGxUby5OYW1lJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5uYW1lVGV4dCxcclxuICAgICAgICB2aWV3OiAnZXJwYmlsbHRvX2RldGFpbCcsXHJcbiAgICAgICAga2V5OiAnRXJwQmlsbFRvLiRrZXknLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0JpbGxUb01haW5QaG9uZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBCaWxsVG8uTWFpblBob25lJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5tYWluUGhvbmVUZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0JpbGxUb0FkZHJlc3MnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwQmlsbFRvLkFkZHJlc3MnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFkZHJlc3NUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiAodmFsKSA9PiB7XHJcbiAgICAgICAgICBpZiAodmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXQuYWRkcmVzcyh2YWwpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH1dLFxyXG4gICAgfSwge1xyXG4gICAgICB0aXRsZTogdGhpcy5zaGlwVG9UZXh0LFxyXG4gICAgICBuYW1lOiAnU2hpcFNlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBuYW1lOiAnU2hpcFRvTmFtZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBTaGlwVG8uTmFtZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMubmFtZVRleHQsXHJcbiAgICAgICAgdmlldzogJ2VycHNoaXB0b19kZXRhaWwnLFxyXG4gICAgICAgIGtleTogJ0VycFNoaXBUby4ka2V5JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTaGlwVG9NYWluUGhvbmUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwU2hpcFRvLk1haW5QaG9uZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMubWFpblBob25lVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTaGlwVG9BZGRyZXNzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFNoaXBUby5BZGRyZXNzJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5hZGRyZXNzVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogKHZhbCkgPT4ge1xyXG4gICAgICAgICAgaWYgKHZhbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0LmFkZHJlc3ModmFsKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICB9XSxcclxuICAgIH0sIHtcclxuICAgICAgdGl0bGU6IHRoaXMucmVsYXRlZEl0ZW1zVGV4dCxcclxuICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgbmFtZTogJ1JlbGF0ZWRJdGVtc1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBuYW1lOiAnRVJQSW52b2ljZUl0ZW1zUmVsYXRlZCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuaW52b2ljZUl0ZW1zVGV4dCxcclxuICAgICAgICB3aGVyZTogdGhpcy5mb3JtYXRSZWxhdGVkUXVlcnkuYmluZERlbGVnYXRlKHRoaXMsICdFcnBJbnZvaWNlLklkIGVxIFwiJHswfVwiJyksXHJcbiAgICAgICAgdmlldzogJ2ludm9pY2VfaXRlbXNfcmVsYXRlZCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRVJQUmVjZWl2YWJsZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucmVjZWl2YWJsZXNUZXh0LFxyXG4gICAgICAgIHdoZXJlOiB0aGlzLmZvcm1hdFJlbGF0ZWRRdWVyeS5iaW5kRGVsZWdhdGUodGhpcywgJ0VycEludm9pY2UuSWQgZXEgXCIkezB9XCInKSxcclxuICAgICAgICB2aWV3OiAnaW52b2ljZV9yZWNlaXZhYmxlc19yZWxhdGVkJyxcclxuICAgICAgfSxcclxuICAgICAgXSxcclxuICAgIH1dKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5WaWV3cy5FUlBJbnZvaWNlcy5EZXRhaWwnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19