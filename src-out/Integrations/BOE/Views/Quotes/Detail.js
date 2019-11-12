define('crm/Integrations/BOE/Views/Quotes/Detail', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'crm/Format', 'argos/Detail', 'argos/Dialogs/BusyIndicator', '../../Models/Names', 'argos/I18n', '../../PricingAvailabilityService', '../../Promote', '../../Utility'], function (module, exports, _declare, _lang, _Format, _Detail, _BusyIndicator, _Names, _I18n, _PricingAvailabilityService, _Promote, _Utility) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Format2 = _interopRequireDefault(_Format);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _BusyIndicator2 = _interopRequireDefault(_BusyIndicator);

  var _Names2 = _interopRequireDefault(_Names);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _PricingAvailabilityService2 = _interopRequireDefault(_PricingAvailabilityService);

  var _Promote2 = _interopRequireDefault(_Promote);

  var _Utility2 = _interopRequireDefault(_Utility);

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

  var resource = (0, _I18n2.default)('quoteDetail');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.Quotes.Detail', [_Detail2.default], {
    // View Properties
    id: 'quote_detail',
    editView: 'quote_edit',
    locationType: '',

    titleText: resource.titleText,
    actionsText: resource.actionsText,
    relatedItemsText: resource.relatedItemsText,
    quoteNumberText: resource.quoteNumberText,
    accountText: resource.accountText,
    commentsText: resource.commentsText,
    opportunityText: resource.opportunityText,
    dateCreatedText: resource.dateCreatedText,
    orderIdText: resource.orderIdText,
    statusText: resource.statusText,
    subTotalText: resource.subTotalText,
    grandTotalText: resource.grandTotalText,
    baseSubTotalText: resource.baseSubTotalText,
    baseGrandTotalText: resource.baseGrandTotalText,
    billToText: resource.billToText,
    billToAddressText: resource.billToAddressText,
    shipToText: resource.shipToText,
    shipToAddressText: resource.shipToAddressText,
    payFromText: resource.payFromText,
    salesOrderText: resource.salesOrderText,
    quoteLinesText: resource.quoteLinesText,
    attachmentsText: resource.attachmentsText,
    salesPersonsText: resource.salesPersonsText,
    addLineItemsText: resource.addLineItemsText,
    removeLineItemsText: resource.removeLineItemsText,
    hasWonErrorText: resource.hasWonErrorText,
    wonStatusCode: resource.wonStatusCode,
    convertQuoteText: resource.convertQuoteText,
    convertQuoteMessage: resource.convertQuoteMessage,
    needToPromoteAccount: resource.needToPromoteAccount,
    billingAddressText: resource.billingAddressText,
    shippingAddressText: resource.shippingAddressText,
    promoteQuoteText: resource.promoteQuoteText,
    entityText: resource.entityText,
    syncStatusText: resource.syncStatusText,
    backOfficeText: resource.backOfficeText,
    accountingEntityText: resource.accountingEntityText,
    startDateText: resource.startDateText,
    endDateText: resource.endDateText,
    documentDateText: resource.documentDateText,
    expectedDeliveryDateText: resource.expectedDeliveryDateText,
    dropShipAllowedText: resource.dropShipAllowedText,
    shipEarlyAllowedText: resource.shipEarlyAllowedText,
    partialShipAllowedText: resource.partialShipAllowedText,
    warehouseText: resource.warehouseText,
    locationText: resource.locationText,
    accountingEntityRequiredText: resource.accountingEntityRequiredText,
    requestedByText: resource.requestedByText,
    syncHistoryText: resource.syncHistoryText,
    carrierText: resource.carrierText,
    getQuoteTotalText: resource.getQuoteTotalText,
    erpStatusText: resource.erpStatusText,
    erpStatusDateText: resource.erpStatusDateText,
    refreshPricingText: resource.refreshPricingText,
    pricingUnavailableText: resource.pricingUnavailableText,

    resourceKind: 'quotes',
    modelName: _Names2.default.QUOTE,
    _busyIndicator: null,
    enableOffline: true,

    onTransitionTo: function onTransitionTo() {
      this.inherited(arguments);
      App.bars.tbar.disableTool('edit');
      if (!this.locationType) {
        this.locationType = App.context.integrationSettings && App.context.integrationSettings['Back Office Extension'] && App.context.integrationSettings['Back Office Extension']['Type of Order Location'] || '';
      }
    },
    _canPromote: function _canPromote() {
      var _this = this;

      var promise = new Promise(function (resolve) {
        _this.showBusy();
        var entry = {
          $name: 'CanPromoteQuote',
          request: {
            quoteId: _this.entry.$key
          }
        };
        var request = new Sage.SData.Client.SDataServiceOperationRequest(_this.getService()).setResourceKind('quotes').setContractName('dynamic').setOperationName('CanPromoteQuote');

        var canPromote = {
          value: false,
          result: ''
        };

        request.execute(entry, {
          success: function success(result) {
            canPromote.value = result.response.Result;
            resolve(canPromote);
          },
          failure: function failure(err) {
            var response = JSON.parse(err.response)[0];
            canPromote.result = response.message;
            resolve(canPromote);
          },
          scope: _this
        });
      });

      return promise;
    },
    _convertToSalesOrder: function _convertToSalesOrder() {
      var _this2 = this;

      this.showBusy();
      var convertQuoteEntry = {
        $name: 'ConvertQuoteToOrder',
        request: {
          QuoteId: this.entry.$key
        }
      };

      var request = new Sage.SData.Client.SDataServiceOperationRequest(this.getService()).setResourceKind('quotes').setContractName('dynamic').setOperationName('ConvertQuoteToOrder');

      request.execute(convertQuoteEntry, {
        success: function success(result) {
          _this2.hideBusy();
          _this2.refreshRequired = true;
          var view = App.getView('salesorder_detail');
          var options = {
            key: result.response.Result,
            fromContext: _this2
          };
          if (view) {
            view.show(options);
          }
        },
        failure: function failure(err) {
          _this2.hideBusy();
          var options = {
            title: 'alert',
            content: err.statusText,
            getContent: null
          };
          App.modal.createSimpleDialog(options);
          console.error(err); // eslint-disable-line
        },
        scope: this
      });
    },
    isQuoteClosed: function isQuoteClosed() {
      return this.entry.IsClosed;
    },
    processEntry: function processEntry() {
      this.inherited(arguments);

      // INFORCRM-16828 - Since we are manually taking over the disable/enable of
      // the edit, check the security before we might potentially re-enable it.
      if (!App.hasAccessTo(this.editView)) {
        return;
      }

      if (this.isQuoteClosed()) {
        App.bars.tbar.disableTool('edit');
      } else {
        App.bars.tbar.enableTool('edit');
      }
    },
    addLineItems: function addLineItems() {
      var _this3 = this;

      if (!this.entry.ErpLogicalId) {
        App.modal.createSimpleDialog({
          title: 'alert',
          content: this.accountingEntityRequiredText,
          getContent: function getContent() {
            return;
          }
        }).then(function () {
          _this3.navigateToEditView();
        });
        return;
      }
      var view = App.getView('quote_line_edit');
      if (view) {
        var quoteItemView = App.getView('quote_lines_related');
        var count = 0;
        if (quoteItemView) {
          quoteItemView.getListCount({ where: 'Quote.$key eq "' + this.entry.$key + '"' }).then(function (result) {
            count = result;
          });
        }
        var options = {
          insert: true,
          context: {
            Quote: this.entry,
            CurrentCount: count
          }
        };
        this.refreshRequired = true;
        view.show(options);
      } // TODO: direct to line items list view and allow multi-select. On save will attach items to quote product and update the quote.
    },
    hideBusy: function hideBusy() {
      this._busyIndicator.complete();
      App.modal.disableClose = false;
      App.modal.hide();
    },
    convertQuote: function convertQuote() {
      if (!this.entry.$key) {
        return;
      }
      if (!this.entry.Account.ErpExtId) {
        var options = {
          title: 'warning',
          content: resource.needToPromoteAccount,
          getContent: null
        };
        App.modal.createSimpleDialog(options).then(this.navigateToRelatedView.bind(this, 'account_detail', 0, this.entry.Account.AccountName));
        return;
      }

      this._convertToSalesOrder();
    },
    handlePricingSuccess: function handlePricingSuccess(result) {
      this._refreshClicked();
      return result;
    },
    onGetOrderTotal: function onGetOrderTotal() {
      var _this4 = this;

      if (this.entry) {
        if (!this.options.context) {
          this.options.context = {
            Quote: this.entry
          };
        } else {
          this.options.context.Quote = this.entry;
        }
        _PricingAvailabilityService2.default.getQuotePricing(this.entry).then(function (result) {
          _this4.handlePricingSuccess(result);
        });
      }
    },
    onRePrice: function onRePrice() {
      var _this5 = this;

      if (this.entry) {
        if (this.isQuoteClosed()) {
          var options = {
            title: 'alert',
            content: this.pricingUnavailableText,
            getContent: null
          };
          App.modal.createSimpleDialog(options);
          return;
        }
        if (!this.options.context) {
          this.options.context = {
            Quote: this.entry
          };
        } else {
          this.options.context.Quote = this.entry;
        }
        _PricingAvailabilityService2.default.quoteRePrice(this.entry).then(function (result) {
          _this5.handlePricingSuccess(result);
        });
      }
    },
    onPromoteQuote: function onPromoteQuote() {
      var _this6 = this;

      var canPromotePromise = this._canPromote();
      canPromotePromise.then(function (val) {
        _this6.hideBusy();
        if (!val.value) {
          App.modal.createSimpleDialog({
            title: 'alert',
            content: val.result,
            getContent: function getContent() {
              return;
            }
          });
          return;
        }
        var promote = new _Promote2.default();
        promote.promoteToBackOffice(_this6.entry, 'Quote', _this6);
      });
    },
    showBusy: function showBusy() {
      if (!this._busyIndicator || this._busyIndicator._destroyed) {
        this._busyIndicator = new _BusyIndicator2.default({ id: this.id + '-busyIndicator' });
      }
      this._busyIndicator.start();
      App.modal.disableClose = true;
      App.modal.showToolbar = false;
      App.modal.add(this._busyIndicator);
    },
    formatPicklist: function formatPicklist(property) {
      return _Format2.default.picklist(this.app.picklistService, this._model, property);
    },
    createLayout: function createLayout() {
      var _this7 = this;

      return this.layout || (this.layout = [{
        title: this.actionsText,
        list: true,
        cls: 'action-list',
        name: 'QuickActionsSection',
        children: [{
          name: 'ConvertQuote',
          property: 'QuoteNumber',
          label: this.convertQuoteText,
          iconClass: 'cart',
          action: 'convertQuote',
          disabled: function disabled() {
            return _this7.isQuoteClosed();
          },
          security: 'Entities/Quote/ConvertToSalesOrder'
        }, {
          name: 'PromoteQuote',
          property: 'QuoteNumber',
          label: this.promoteQuoteText,
          iconClass: 'upload',
          action: 'onPromoteQuote',
          security: 'Entities/Quote/Promote'
        }, {
          name: 'GetOrderTotal',
          property: 'QuoteNumber',
          label: this.getQuoteTotalText,
          iconClass: 'finance',
          action: 'onGetOrderTotal',
          security: 'Entities/Quote/GetOrderTotal'
        }, {
          name: 'AddLineItems',
          property: 'QuoteNumber',
          label: this.addLineItemsText,
          iconClass: 'bullet-list',
          action: 'addLineItems',
          security: 'Entities/Quote/Add',
          disabled: this.isQuoteClosed.bind(this)
        }, {
          name: 'RePrice',
          property: 'QuoteNumber',
          label: this.refreshPricingText,
          iconClass: 'finance',
          action: 'onRePrice',
          security: 'Entities/Quote/Add'
        }]
      }, {
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          name: 'QuoteNumber',
          property: 'QuoteNumber',
          label: this.quoteNumberText
        }, {
          name: 'AccountName',
          property: 'Account.AccountName',
          label: this.accountText,
          view: 'account_detail',
          key: 'Account.$key'
        }, {
          name: 'RequestedBy',
          property: 'RequestedBy.NameLF',
          label: this.requestedByText,
          view: 'contact_detail',
          key: 'RequestedBy.$key'
        }, {
          name: 'Opportunity',
          property: 'Opportunity.Description',
          label: this.opportunityText,
          view: 'opportunity_detail',
          key: 'Opportunity.$key'
        }, {
          name: 'SalesOrder',
          property: 'SalesOrder.SalesOrderNumber',
          label: this.salesOrderText,
          view: 'salesorder_detail',
          key: 'SalesOrder.$key'
        }, {
          name: 'OrderId',
          property: 'ErpExtId',
          label: this.orderIdText
        }, {
          name: 'BackOffice',
          property: 'ErpLogicalId',
          label: this.backOfficeText,
          renderer: function renderer(val) {
            if (val) {
              return val;
            }
            return '';
          }
        }, {
          name: 'ErpAccountingEntityId',
          property: 'ErpAccountingEntityId',
          label: this.accountingEntityText,
          renderer: function renderer(val) {
            if (val) {
              return val;
            }
            return '';
          }
        }, {
          name: 'CreateDate',
          property: 'CreateDate',
          label: this.dateCreatedText,
          renderer: function renderer(data) {
            return _Format2.default.date(data);
          }
        }, {
          name: 'StartDate',
          property: 'StartDate',
          label: this.startDateText,
          renderer: function renderer(data) {
            return _Format2.default.date(data);
          }
        }, {
          name: 'EndDate',
          property: 'EndDate',
          label: this.endDateText,
          renderer: function renderer(data) {
            return _Format2.default.date(data);
          }
        }, {
          name: 'ExpectedDeliveryDate',
          property: 'ExpectedDeliveryDate',
          label: this.expectedDeliveryDateText,
          renderer: function renderer(data) {
            return _Format2.default.date(data);
          }
        }, {
          name: 'DocumentDate',
          property: 'DocumentDate',
          label: this.documentDateText,
          renderer: function renderer(data) {
            return _Format2.default.date(data);
          }
        }, {
          name: 'Status',
          property: 'Status',
          label: this.statusText,
          renderer: function renderer(val) {
            if (val) {
              return val;
            }
            return '';
          }
        }, {
          name: 'SyncStatus',
          property: 'SyncStatus',
          label: this.syncStatusText,
          renderer: this.formatPicklist('SyncStatus')
        }, {
          name: 'ErpStatus',
          property: 'ErpStatus',
          label: this.erpStatusText,
          renderer: this.formatPicklist('ErpStatus')
        }, {
          name: 'StatusDate',
          property: 'StatusDate',
          label: this.erpStatusDateText,
          renderer: function renderer(data) {
            return _Format2.default.date(data);
          }
        }, {
          name: 'SubTotal',
          property: 'Total',
          label: this.baseSubTotalText,
          renderer: function renderer(value) {
            return _Utility2.default.formatMultiCurrency(value, _this7.entry.BaseCurrencyCode);
          }
        }, {
          name: 'GrandTotal',
          property: 'GrandTotal',
          label: this.baseGrandTotalText,
          renderer: function renderer(value) {
            return _Utility2.default.formatMultiCurrency(value, _this7.entry.BaseCurrencyCode);
          }
        }, {
          name: 'DocSubTotal',
          property: 'DocTotal',
          label: this.subTotalText,
          renderer: function renderer(value) {
            return _Utility2.default.formatMultiCurrency(value, _this7.entry.CurrencyCode);
          }
        }, {
          name: 'DocGrandTotal',
          property: 'DocGrandTotal',
          label: this.grandTotalText,
          renderer: function renderer(value) {
            return _Utility2.default.formatMultiCurrency(value, _this7.entry.CurrencyCode);
          }
        }, {
          name: 'Comments',
          property: 'Comments',
          label: this.commentsText
        }, {
          name: 'BillTo',
          property: 'BillTo.Name',
          label: this.billToText,
          view: 'erpbillto_detail',
          key: 'BillTo.$key'
        }, {
          name: 'BillToAddress',
          property: 'BillTo.Address',
          label: this.billToAddressText,
          renderer: function renderer(data) {
            if (data) {
              return _Format2.default.address(data);
            }
          }
        }, {
          name: 'BillingContactAddress',
          property: 'BillingContact.Address',
          label: this.billingAddressText,
          renderer: function renderer(data) {
            if (data) {
              return _Format2.default.address(data);
            }
          }
        }, {
          name: 'ShipTo',
          property: 'ShipTo.Name',
          label: this.shipToText,
          view: 'erpshipto_detail',
          key: 'ShipTo.$key'
        }, {
          name: 'ShipToAddress',
          property: 'ShipTo.Address',
          label: this.shipToAddressText,
          renderer: function renderer(data) {
            if (data) {
              return _Format2.default.address(data);
            }
          }
        }, {
          name: 'Location',
          property: 'Location',
          label: this.locationText,
          renderer: function renderer(data) {
            if (this.locationType === 'Warehouse') {
              return false;
            }
            if (data) {
              if (data.Address && data.Address.FullAddress) {
                return _Format2.default.address(data.Address);
              }
              return data.Description;
            }
          }
        }, {
          name: 'Warehouse',
          property: 'Warehouse',
          label: this.warehouseText,
          renderer: function renderer(data) {
            if (this.locationType && this.locationType !== 'Warehouse') {
              return false;
            }
            if (data) {
              if (data.Address && data.Address.FullAddress) {
                return _Format2.default.address(data.Address);
              }
              return data.Description;
            }
          }
        }, {
          name: 'ShippingContactAddress',
          property: 'ShippingContact.Address',
          label: this.shippingAddressText,
          renderer: function renderer(data) {
            if (data) {
              return _Format2.default.address(data);
            }
          }
        }, {
          name: 'Carrier',
          property: 'Carrier.CarrierName',
          label: this.carrierText,
          renderer: function renderer(data) {
            if (data) {
              return data;
            }
            return '';
          }
        }, {
          name: 'DropShip',
          property: 'DropShip',
          label: this.dropShipAllowedText,
          renderer: function renderer(data) {
            return _Format2.default.yesNo(data);
          }
        }, {
          name: 'ShipEarly',
          property: 'ShipEarly',
          label: this.shipEarlyAllowedText,
          renderer: function renderer(data) {
            return _Format2.default.yesNo(data);
          }
        }, {
          name: 'PartialShip',
          property: 'PartialShip',
          label: this.partialShipAllowedText,
          renderer: function renderer(data) {
            return _Format2.default.yesNo(data);
          }
        }]
      }, {
        title: this.relatedItemsText,
        list: true,
        name: 'RelatedItemsSection',
        children: [{
          name: 'QuoteLines',
          label: this.quoteLinesText,
          where: function where(entry) {
            return 'Quote.$key eq "' + entry.$key + '"';
          },
          view: 'quote_lines_related'
        }, {
          name: 'Attachments',
          label: this.attachmentsText,
          where: function where(entry) {
            return 'quoteId eq "' + entry.$key + '"';
          },
          view: 'quote_attachments_related'
        }, {
          name: 'QuotePersons',
          label: this.salesPersonsText,
          where: function where(entry) {
            return 'Quote.Id eq "' + entry.$key + '"';
          },
          view: 'quotepersons_related'
        }, {
          name: 'SyncHistory',
          label: this.syncHistoryText,
          where: function where(entry) {
            return 'EntityType eq "Quote" and EntityId eq "' + entry.$key + '"';
          },
          view: 'quote_syncresult_related'
        }]
      }]);
    }
  });

  _lang2.default.setObject('icboe.Views.Quotes.Detail', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL1F1b3Rlcy9EZXRhaWwuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiaWQiLCJlZGl0VmlldyIsImxvY2F0aW9uVHlwZSIsInRpdGxlVGV4dCIsImFjdGlvbnNUZXh0IiwicmVsYXRlZEl0ZW1zVGV4dCIsInF1b3RlTnVtYmVyVGV4dCIsImFjY291bnRUZXh0IiwiY29tbWVudHNUZXh0Iiwib3Bwb3J0dW5pdHlUZXh0IiwiZGF0ZUNyZWF0ZWRUZXh0Iiwib3JkZXJJZFRleHQiLCJzdGF0dXNUZXh0Iiwic3ViVG90YWxUZXh0IiwiZ3JhbmRUb3RhbFRleHQiLCJiYXNlU3ViVG90YWxUZXh0IiwiYmFzZUdyYW5kVG90YWxUZXh0IiwiYmlsbFRvVGV4dCIsImJpbGxUb0FkZHJlc3NUZXh0Iiwic2hpcFRvVGV4dCIsInNoaXBUb0FkZHJlc3NUZXh0IiwicGF5RnJvbVRleHQiLCJzYWxlc09yZGVyVGV4dCIsInF1b3RlTGluZXNUZXh0IiwiYXR0YWNobWVudHNUZXh0Iiwic2FsZXNQZXJzb25zVGV4dCIsImFkZExpbmVJdGVtc1RleHQiLCJyZW1vdmVMaW5lSXRlbXNUZXh0IiwiaGFzV29uRXJyb3JUZXh0Iiwid29uU3RhdHVzQ29kZSIsImNvbnZlcnRRdW90ZVRleHQiLCJjb252ZXJ0UXVvdGVNZXNzYWdlIiwibmVlZFRvUHJvbW90ZUFjY291bnQiLCJiaWxsaW5nQWRkcmVzc1RleHQiLCJzaGlwcGluZ0FkZHJlc3NUZXh0IiwicHJvbW90ZVF1b3RlVGV4dCIsImVudGl0eVRleHQiLCJzeW5jU3RhdHVzVGV4dCIsImJhY2tPZmZpY2VUZXh0IiwiYWNjb3VudGluZ0VudGl0eVRleHQiLCJzdGFydERhdGVUZXh0IiwiZW5kRGF0ZVRleHQiLCJkb2N1bWVudERhdGVUZXh0IiwiZXhwZWN0ZWREZWxpdmVyeURhdGVUZXh0IiwiZHJvcFNoaXBBbGxvd2VkVGV4dCIsInNoaXBFYXJseUFsbG93ZWRUZXh0IiwicGFydGlhbFNoaXBBbGxvd2VkVGV4dCIsIndhcmVob3VzZVRleHQiLCJsb2NhdGlvblRleHQiLCJhY2NvdW50aW5nRW50aXR5UmVxdWlyZWRUZXh0IiwicmVxdWVzdGVkQnlUZXh0Iiwic3luY0hpc3RvcnlUZXh0IiwiY2FycmllclRleHQiLCJnZXRRdW90ZVRvdGFsVGV4dCIsImVycFN0YXR1c1RleHQiLCJlcnBTdGF0dXNEYXRlVGV4dCIsInJlZnJlc2hQcmljaW5nVGV4dCIsInByaWNpbmdVbmF2YWlsYWJsZVRleHQiLCJyZXNvdXJjZUtpbmQiLCJtb2RlbE5hbWUiLCJRVU9URSIsIl9idXN5SW5kaWNhdG9yIiwiZW5hYmxlT2ZmbGluZSIsIm9uVHJhbnNpdGlvblRvIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiQXBwIiwiYmFycyIsInRiYXIiLCJkaXNhYmxlVG9vbCIsImNvbnRleHQiLCJpbnRlZ3JhdGlvblNldHRpbmdzIiwiX2NhblByb21vdGUiLCJwcm9taXNlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJzaG93QnVzeSIsImVudHJ5IiwiJG5hbWUiLCJyZXF1ZXN0IiwicXVvdGVJZCIsIiRrZXkiLCJTYWdlIiwiU0RhdGEiLCJDbGllbnQiLCJTRGF0YVNlcnZpY2VPcGVyYXRpb25SZXF1ZXN0IiwiZ2V0U2VydmljZSIsInNldFJlc291cmNlS2luZCIsInNldENvbnRyYWN0TmFtZSIsInNldE9wZXJhdGlvbk5hbWUiLCJjYW5Qcm9tb3RlIiwidmFsdWUiLCJyZXN1bHQiLCJleGVjdXRlIiwic3VjY2VzcyIsInJlc3BvbnNlIiwiUmVzdWx0IiwiZmFpbHVyZSIsImVyciIsIkpTT04iLCJwYXJzZSIsIm1lc3NhZ2UiLCJzY29wZSIsIl9jb252ZXJ0VG9TYWxlc09yZGVyIiwiY29udmVydFF1b3RlRW50cnkiLCJRdW90ZUlkIiwiaGlkZUJ1c3kiLCJyZWZyZXNoUmVxdWlyZWQiLCJ2aWV3IiwiZ2V0VmlldyIsIm9wdGlvbnMiLCJrZXkiLCJmcm9tQ29udGV4dCIsInNob3ciLCJ0aXRsZSIsImNvbnRlbnQiLCJnZXRDb250ZW50IiwibW9kYWwiLCJjcmVhdGVTaW1wbGVEaWFsb2ciLCJjb25zb2xlIiwiZXJyb3IiLCJpc1F1b3RlQ2xvc2VkIiwiSXNDbG9zZWQiLCJwcm9jZXNzRW50cnkiLCJoYXNBY2Nlc3NUbyIsImVuYWJsZVRvb2wiLCJhZGRMaW5lSXRlbXMiLCJFcnBMb2dpY2FsSWQiLCJ0aGVuIiwibmF2aWdhdGVUb0VkaXRWaWV3IiwicXVvdGVJdGVtVmlldyIsImNvdW50IiwiZ2V0TGlzdENvdW50Iiwid2hlcmUiLCJpbnNlcnQiLCJRdW90ZSIsIkN1cnJlbnRDb3VudCIsImNvbXBsZXRlIiwiZGlzYWJsZUNsb3NlIiwiaGlkZSIsImNvbnZlcnRRdW90ZSIsIkFjY291bnQiLCJFcnBFeHRJZCIsIm5hdmlnYXRlVG9SZWxhdGVkVmlldyIsImJpbmQiLCJBY2NvdW50TmFtZSIsImhhbmRsZVByaWNpbmdTdWNjZXNzIiwiX3JlZnJlc2hDbGlja2VkIiwib25HZXRPcmRlclRvdGFsIiwiZ2V0UXVvdGVQcmljaW5nIiwib25SZVByaWNlIiwicXVvdGVSZVByaWNlIiwib25Qcm9tb3RlUXVvdGUiLCJjYW5Qcm9tb3RlUHJvbWlzZSIsInZhbCIsInByb21vdGUiLCJwcm9tb3RlVG9CYWNrT2ZmaWNlIiwiX2Rlc3Ryb3llZCIsInN0YXJ0Iiwic2hvd1Rvb2xiYXIiLCJhZGQiLCJmb3JtYXRQaWNrbGlzdCIsInByb3BlcnR5IiwicGlja2xpc3QiLCJhcHAiLCJwaWNrbGlzdFNlcnZpY2UiLCJfbW9kZWwiLCJjcmVhdGVMYXlvdXQiLCJsYXlvdXQiLCJsaXN0IiwiY2xzIiwibmFtZSIsImNoaWxkcmVuIiwibGFiZWwiLCJpY29uQ2xhc3MiLCJhY3Rpb24iLCJkaXNhYmxlZCIsInNlY3VyaXR5IiwiZGV0YWlsc1RleHQiLCJyZW5kZXJlciIsImRhdGEiLCJkYXRlIiwiZm9ybWF0TXVsdGlDdXJyZW5jeSIsIkJhc2VDdXJyZW5jeUNvZGUiLCJDdXJyZW5jeUNvZGUiLCJh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S0FBVCxDQUFleEQsS0FBZixFQUFzQjtBQUMzQix1Q0FBeUJBLE1BQU1JLElBQS9CO0FBQ0QsV0FMUTtBQU1UMkIsZ0JBQU07QUFORyxTQUFELEVBT1A7QUFDRCtELGdCQUFNLGFBREw7QUFFREUsaUJBQU8sS0FBS3JKLGVBRlg7QUFHRDZHLGlCQUFPLFNBQVNBLEtBQVQsQ0FBZXhELEtBQWYsRUFBc0I7QUFDM0Isb0NBQXNCQSxNQUFNSSxJQUE1QjtBQUNELFdBTEE7QUFNRDJCLGdCQUFNO0FBTkwsU0FQTyxFQWNQO0FBQ0QrRCxnQkFBTSxjQURMO0FBRURFLGlCQUFPLEtBQUtwSixnQkFGWDtBQUdENEcsaUJBQU8sU0FBU0EsS0FBVCxDQUFleEQsS0FBZixFQUFzQjtBQUMzQixxQ0FBdUJBLE1BQU1JLElBQTdCO0FBQ0QsV0FMQTtBQU1EMkIsZ0JBQU07QUFOTCxTQWRPLEVBcUJQO0FBQ0QrRCxnQkFBTSxhQURMO0FBRURFLGlCQUFPLEtBQUsxSCxlQUZYO0FBR0RrRixpQkFBTyxlQUFDeEQsS0FBRCxFQUFXO0FBQ2hCLCtEQUFpREEsTUFBTUksSUFBdkQ7QUFDRCxXQUxBO0FBTUQyQixnQkFBTTtBQU5MLFNBckJPO0FBSlQsT0FoVGtDLENBQTlCLENBQVA7QUFrVkQ7QUF0bkIyRSxHQUE5RCxDQUFoQjs7QUF5bkJBLGlCQUFLa0YsU0FBTCxDQUFlLDJCQUFmLEVBQTRDL0wsT0FBNUM7b0JBQ2VBLE8iLCJmaWxlIjoiRGV0YWlsLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICdjcm0vRm9ybWF0JztcclxuaW1wb3J0IERldGFpbCBmcm9tICdhcmdvcy9EZXRhaWwnO1xyXG5pbXBvcnQgQnVzeUluZGljYXRvciBmcm9tICdhcmdvcy9EaWFsb2dzL0J1c3lJbmRpY2F0b3InO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5pbXBvcnQgUHJpY2luZ0F2YWlsYWJpbGl0eVNlcnZpY2UgZnJvbSAnLi4vLi4vUHJpY2luZ0F2YWlsYWJpbGl0eVNlcnZpY2UnO1xyXG5pbXBvcnQgUHJvbW90ZSBmcm9tICcuLi8uLi9Qcm9tb3RlJztcclxuaW1wb3J0IHV0aWxpdHkgZnJvbSAnLi4vLi4vVXRpbGl0eSc7XHJcblxyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgncXVvdGVEZXRhaWwnKTtcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5WaWV3cy5RdW90ZXMuRGV0YWlsJywgW0RldGFpbF0sIHtcclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ3F1b3RlX2RldGFpbCcsXHJcbiAgZWRpdFZpZXc6ICdxdW90ZV9lZGl0JyxcclxuICBsb2NhdGlvblR5cGU6ICcnLFxyXG5cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBhY3Rpb25zVGV4dDogcmVzb3VyY2UuYWN0aW9uc1RleHQsXHJcbiAgcmVsYXRlZEl0ZW1zVGV4dDogcmVzb3VyY2UucmVsYXRlZEl0ZW1zVGV4dCxcclxuICBxdW90ZU51bWJlclRleHQ6IHJlc291cmNlLnF1b3RlTnVtYmVyVGV4dCxcclxuICBhY2NvdW50VGV4dDogcmVzb3VyY2UuYWNjb3VudFRleHQsXHJcbiAgY29tbWVudHNUZXh0OiByZXNvdXJjZS5jb21tZW50c1RleHQsXHJcbiAgb3Bwb3J0dW5pdHlUZXh0OiByZXNvdXJjZS5vcHBvcnR1bml0eVRleHQsXHJcbiAgZGF0ZUNyZWF0ZWRUZXh0OiByZXNvdXJjZS5kYXRlQ3JlYXRlZFRleHQsXHJcbiAgb3JkZXJJZFRleHQ6IHJlc291cmNlLm9yZGVySWRUZXh0LFxyXG4gIHN0YXR1c1RleHQ6IHJlc291cmNlLnN0YXR1c1RleHQsXHJcbiAgc3ViVG90YWxUZXh0OiByZXNvdXJjZS5zdWJUb3RhbFRleHQsXHJcbiAgZ3JhbmRUb3RhbFRleHQ6IHJlc291cmNlLmdyYW5kVG90YWxUZXh0LFxyXG4gIGJhc2VTdWJUb3RhbFRleHQ6IHJlc291cmNlLmJhc2VTdWJUb3RhbFRleHQsXHJcbiAgYmFzZUdyYW5kVG90YWxUZXh0OiByZXNvdXJjZS5iYXNlR3JhbmRUb3RhbFRleHQsXHJcbiAgYmlsbFRvVGV4dDogcmVzb3VyY2UuYmlsbFRvVGV4dCxcclxuICBiaWxsVG9BZGRyZXNzVGV4dDogcmVzb3VyY2UuYmlsbFRvQWRkcmVzc1RleHQsXHJcbiAgc2hpcFRvVGV4dDogcmVzb3VyY2Uuc2hpcFRvVGV4dCxcclxuICBzaGlwVG9BZGRyZXNzVGV4dDogcmVzb3VyY2Uuc2hpcFRvQWRkcmVzc1RleHQsXHJcbiAgcGF5RnJvbVRleHQ6IHJlc291cmNlLnBheUZyb21UZXh0LFxyXG4gIHNhbGVzT3JkZXJUZXh0OiByZXNvdXJjZS5zYWxlc09yZGVyVGV4dCxcclxuICBxdW90ZUxpbmVzVGV4dDogcmVzb3VyY2UucXVvdGVMaW5lc1RleHQsXHJcbiAgYXR0YWNobWVudHNUZXh0OiByZXNvdXJjZS5hdHRhY2htZW50c1RleHQsXHJcbiAgc2FsZXNQZXJzb25zVGV4dDogcmVzb3VyY2Uuc2FsZXNQZXJzb25zVGV4dCxcclxuICBhZGRMaW5lSXRlbXNUZXh0OiByZXNvdXJjZS5hZGRMaW5lSXRlbXNUZXh0LFxyXG4gIHJlbW92ZUxpbmVJdGVtc1RleHQ6IHJlc291cmNlLnJlbW92ZUxpbmVJdGVtc1RleHQsXHJcbiAgaGFzV29uRXJyb3JUZXh0OiByZXNvdXJjZS5oYXNXb25FcnJvclRleHQsXHJcbiAgd29uU3RhdHVzQ29kZTogcmVzb3VyY2Uud29uU3RhdHVzQ29kZSxcclxuICBjb252ZXJ0UXVvdGVUZXh0OiByZXNvdXJjZS5jb252ZXJ0UXVvdGVUZXh0LFxyXG4gIGNvbnZlcnRRdW90ZU1lc3NhZ2U6IHJlc291cmNlLmNvbnZlcnRRdW90ZU1lc3NhZ2UsXHJcbiAgbmVlZFRvUHJvbW90ZUFjY291bnQ6IHJlc291cmNlLm5lZWRUb1Byb21vdGVBY2NvdW50LFxyXG4gIGJpbGxpbmdBZGRyZXNzVGV4dDogcmVzb3VyY2UuYmlsbGluZ0FkZHJlc3NUZXh0LFxyXG4gIHNoaXBwaW5nQWRkcmVzc1RleHQ6IHJlc291cmNlLnNoaXBwaW5nQWRkcmVzc1RleHQsXHJcbiAgcHJvbW90ZVF1b3RlVGV4dDogcmVzb3VyY2UucHJvbW90ZVF1b3RlVGV4dCxcclxuICBlbnRpdHlUZXh0OiByZXNvdXJjZS5lbnRpdHlUZXh0LFxyXG4gIHN5bmNTdGF0dXNUZXh0OiByZXNvdXJjZS5zeW5jU3RhdHVzVGV4dCxcclxuICBiYWNrT2ZmaWNlVGV4dDogcmVzb3VyY2UuYmFja09mZmljZVRleHQsXHJcbiAgYWNjb3VudGluZ0VudGl0eVRleHQ6IHJlc291cmNlLmFjY291bnRpbmdFbnRpdHlUZXh0LFxyXG4gIHN0YXJ0RGF0ZVRleHQ6IHJlc291cmNlLnN0YXJ0RGF0ZVRleHQsXHJcbiAgZW5kRGF0ZVRleHQ6IHJlc291cmNlLmVuZERhdGVUZXh0LFxyXG4gIGRvY3VtZW50RGF0ZVRleHQ6IHJlc291cmNlLmRvY3VtZW50RGF0ZVRleHQsXHJcbiAgZXhwZWN0ZWREZWxpdmVyeURhdGVUZXh0OiByZXNvdXJjZS5leHBlY3RlZERlbGl2ZXJ5RGF0ZVRleHQsXHJcbiAgZHJvcFNoaXBBbGxvd2VkVGV4dDogcmVzb3VyY2UuZHJvcFNoaXBBbGxvd2VkVGV4dCxcclxuICBzaGlwRWFybHlBbGxvd2VkVGV4dDogcmVzb3VyY2Uuc2hpcEVhcmx5QWxsb3dlZFRleHQsXHJcbiAgcGFydGlhbFNoaXBBbGxvd2VkVGV4dDogcmVzb3VyY2UucGFydGlhbFNoaXBBbGxvd2VkVGV4dCxcclxuICB3YXJlaG91c2VUZXh0OiByZXNvdXJjZS53YXJlaG91c2VUZXh0LFxyXG4gIGxvY2F0aW9uVGV4dDogcmVzb3VyY2UubG9jYXRpb25UZXh0LFxyXG4gIGFjY291bnRpbmdFbnRpdHlSZXF1aXJlZFRleHQ6IHJlc291cmNlLmFjY291bnRpbmdFbnRpdHlSZXF1aXJlZFRleHQsXHJcbiAgcmVxdWVzdGVkQnlUZXh0OiByZXNvdXJjZS5yZXF1ZXN0ZWRCeVRleHQsXHJcbiAgc3luY0hpc3RvcnlUZXh0OiByZXNvdXJjZS5zeW5jSGlzdG9yeVRleHQsXHJcbiAgY2FycmllclRleHQ6IHJlc291cmNlLmNhcnJpZXJUZXh0LFxyXG4gIGdldFF1b3RlVG90YWxUZXh0OiByZXNvdXJjZS5nZXRRdW90ZVRvdGFsVGV4dCxcclxuICBlcnBTdGF0dXNUZXh0OiByZXNvdXJjZS5lcnBTdGF0dXNUZXh0LFxyXG4gIGVycFN0YXR1c0RhdGVUZXh0OiByZXNvdXJjZS5lcnBTdGF0dXNEYXRlVGV4dCxcclxuICByZWZyZXNoUHJpY2luZ1RleHQ6IHJlc291cmNlLnJlZnJlc2hQcmljaW5nVGV4dCxcclxuICBwcmljaW5nVW5hdmFpbGFibGVUZXh0OiByZXNvdXJjZS5wcmljaW5nVW5hdmFpbGFibGVUZXh0LFxyXG5cclxuICByZXNvdXJjZUtpbmQ6ICdxdW90ZXMnLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuUVVPVEUsXHJcbiAgX2J1c3lJbmRpY2F0b3I6IG51bGwsXHJcbiAgZW5hYmxlT2ZmbGluZTogdHJ1ZSxcclxuXHJcbiAgb25UcmFuc2l0aW9uVG86IGZ1bmN0aW9uIG9uVHJhbnNpdGlvblRvKCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICAgIEFwcC5iYXJzLnRiYXIuZGlzYWJsZVRvb2woJ2VkaXQnKTtcclxuICAgIGlmICghdGhpcy5sb2NhdGlvblR5cGUpIHtcclxuICAgICAgdGhpcy5sb2NhdGlvblR5cGUgPSBBcHAuY29udGV4dC5pbnRlZ3JhdGlvblNldHRpbmdzICYmIEFwcC5jb250ZXh0LmludGVncmF0aW9uU2V0dGluZ3NbJ0JhY2sgT2ZmaWNlIEV4dGVuc2lvbiddICYmXHJcbiAgICAgICAgQXBwLmNvbnRleHQuaW50ZWdyYXRpb25TZXR0aW5nc1snQmFjayBPZmZpY2UgRXh0ZW5zaW9uJ11bJ1R5cGUgb2YgT3JkZXIgTG9jYXRpb24nXSB8fCAnJztcclxuICAgIH1cclxuICB9LFxyXG4gIF9jYW5Qcm9tb3RlOiBmdW5jdGlvbiBfY2FuUHJvbW90ZSgpIHtcclxuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZShcclxuICAgICAgKHJlc29sdmUpID0+IHtcclxuICAgICAgICB0aGlzLnNob3dCdXN5KCk7XHJcbiAgICAgICAgY29uc3QgZW50cnkgPSB7XHJcbiAgICAgICAgICAkbmFtZTogJ0NhblByb21vdGVRdW90ZScsXHJcbiAgICAgICAgICByZXF1ZXN0OiB7XHJcbiAgICAgICAgICAgIHF1b3RlSWQ6IHRoaXMuZW50cnkuJGtleSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhU2VydmljZU9wZXJhdGlvblJlcXVlc3QodGhpcy5nZXRTZXJ2aWNlKCkpXHJcbiAgICAgICAgICAuc2V0UmVzb3VyY2VLaW5kKCdxdW90ZXMnKVxyXG4gICAgICAgICAgLnNldENvbnRyYWN0TmFtZSgnZHluYW1pYycpXHJcbiAgICAgICAgICAuc2V0T3BlcmF0aW9uTmFtZSgnQ2FuUHJvbW90ZVF1b3RlJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNhblByb21vdGUgPSB7XHJcbiAgICAgICAgICB2YWx1ZTogZmFsc2UsXHJcbiAgICAgICAgICByZXN1bHQ6ICcnLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJlcXVlc3QuZXhlY3V0ZShlbnRyeSwge1xyXG4gICAgICAgICAgc3VjY2VzczogKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICBjYW5Qcm9tb3RlLnZhbHVlID0gcmVzdWx0LnJlc3BvbnNlLlJlc3VsdDtcclxuICAgICAgICAgICAgcmVzb2x2ZShjYW5Qcm9tb3RlKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBmYWlsdXJlOiAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gSlNPTi5wYXJzZShlcnIucmVzcG9uc2UpWzBdO1xyXG4gICAgICAgICAgICBjYW5Qcm9tb3RlLnJlc3VsdCA9IHJlc3BvbnNlLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgIHJlc29sdmUoY2FuUHJvbW90ZSk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgc2NvcGU6IHRoaXMsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfSxcclxuICBfY29udmVydFRvU2FsZXNPcmRlcjogZnVuY3Rpb24gX2NvbnZlcnRUb1NhbGVzT3JkZXIoKSB7XHJcbiAgICB0aGlzLnNob3dCdXN5KCk7XHJcbiAgICBjb25zdCBjb252ZXJ0UXVvdGVFbnRyeSA9IHtcclxuICAgICAgJG5hbWU6ICdDb252ZXJ0UXVvdGVUb09yZGVyJyxcclxuICAgICAgcmVxdWVzdDoge1xyXG4gICAgICAgIFF1b3RlSWQ6IHRoaXMuZW50cnkuJGtleSxcclxuICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBTYWdlLlNEYXRhLkNsaWVudC5TRGF0YVNlcnZpY2VPcGVyYXRpb25SZXF1ZXN0KHRoaXMuZ2V0U2VydmljZSgpKVxyXG4gICAgICAuc2V0UmVzb3VyY2VLaW5kKCdxdW90ZXMnKVxyXG4gICAgICAuc2V0Q29udHJhY3ROYW1lKCdkeW5hbWljJylcclxuICAgICAgLnNldE9wZXJhdGlvbk5hbWUoJ0NvbnZlcnRRdW90ZVRvT3JkZXInKTtcclxuXHJcbiAgICByZXF1ZXN0LmV4ZWN1dGUoY29udmVydFF1b3RlRW50cnksIHtcclxuICAgICAgc3VjY2VzczogKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIHRoaXMuaGlkZUJ1c3koKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgICAgICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KCdzYWxlc29yZGVyX2RldGFpbCcpO1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICBrZXk6IHJlc3VsdC5yZXNwb25zZS5SZXN1bHQsXHJcbiAgICAgICAgICBmcm9tQ29udGV4dDogdGhpcyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh2aWV3KSB7XHJcbiAgICAgICAgICB2aWV3LnNob3cob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBmYWlsdXJlOiAoZXJyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5oaWRlQnVzeSgpO1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICB0aXRsZTogJ2FsZXJ0JyxcclxuICAgICAgICAgIGNvbnRlbnQ6IGVyci5zdGF0dXNUZXh0LFxyXG4gICAgICAgICAgZ2V0Q29udGVudDogbnVsbCxcclxuICAgICAgICB9O1xyXG4gICAgICAgIEFwcC5tb2RhbC5jcmVhdGVTaW1wbGVEaWFsb2cob3B0aW9ucyk7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpOy8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgfSxcclxuICAgICAgc2NvcGU6IHRoaXMsXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGlzUXVvdGVDbG9zZWQ6IGZ1bmN0aW9uIGlzUXVvdGVDbG9zZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbnRyeS5Jc0Nsb3NlZDtcclxuICB9LFxyXG4gIHByb2Nlc3NFbnRyeTogZnVuY3Rpb24gcHJvY2Vzc0VudHJ5KCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuXHJcbiAgICAvLyBJTkZPUkNSTS0xNjgyOCAtIFNpbmNlIHdlIGFyZSBtYW51YWxseSB0YWtpbmcgb3ZlciB0aGUgZGlzYWJsZS9lbmFibGUgb2ZcclxuICAgIC8vIHRoZSBlZGl0LCBjaGVjayB0aGUgc2VjdXJpdHkgYmVmb3JlIHdlIG1pZ2h0IHBvdGVudGlhbGx5IHJlLWVuYWJsZSBpdC5cclxuICAgIGlmICghQXBwLmhhc0FjY2Vzc1RvKHRoaXMuZWRpdFZpZXcpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pc1F1b3RlQ2xvc2VkKCkpIHtcclxuICAgICAgQXBwLmJhcnMudGJhci5kaXNhYmxlVG9vbCgnZWRpdCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgQXBwLmJhcnMudGJhci5lbmFibGVUb29sKCdlZGl0Jyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhZGRMaW5lSXRlbXM6IGZ1bmN0aW9uIGFkZExpbmVJdGVtcygpIHtcclxuICAgIGlmICghdGhpcy5lbnRyeS5FcnBMb2dpY2FsSWQpIHtcclxuICAgICAgQXBwLm1vZGFsLmNyZWF0ZVNpbXBsZURpYWxvZyh7XHJcbiAgICAgICAgdGl0bGU6ICdhbGVydCcsXHJcbiAgICAgICAgY29udGVudDogdGhpcy5hY2NvdW50aW5nRW50aXR5UmVxdWlyZWRUZXh0LFxyXG4gICAgICAgIGdldENvbnRlbnQ6ICgpID0+IHsgcmV0dXJuOyB9LFxyXG4gICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICB0aGlzLm5hdmlnYXRlVG9FZGl0VmlldygpO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KCdxdW90ZV9saW5lX2VkaXQnKTtcclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIGNvbnN0IHF1b3RlSXRlbVZpZXcgPSBBcHAuZ2V0VmlldygncXVvdGVfbGluZXNfcmVsYXRlZCcpO1xyXG4gICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICBpZiAocXVvdGVJdGVtVmlldykge1xyXG4gICAgICAgIHF1b3RlSXRlbVZpZXcuZ2V0TGlzdENvdW50KHsgd2hlcmU6IGBRdW90ZS4ka2V5IGVxIFwiJHt0aGlzLmVudHJ5LiRrZXl9XCJgIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgY291bnQgPSByZXN1bHQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICBpbnNlcnQ6IHRydWUsXHJcbiAgICAgICAgY29udGV4dDoge1xyXG4gICAgICAgICAgUXVvdGU6IHRoaXMuZW50cnksXHJcbiAgICAgICAgICBDdXJyZW50Q291bnQ6IGNvdW50LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuICAgICAgdmlldy5zaG93KG9wdGlvbnMpO1xyXG4gICAgfSAvLyBUT0RPOiBkaXJlY3QgdG8gbGluZSBpdGVtcyBsaXN0IHZpZXcgYW5kIGFsbG93IG11bHRpLXNlbGVjdC4gT24gc2F2ZSB3aWxsIGF0dGFjaCBpdGVtcyB0byBxdW90ZSBwcm9kdWN0IGFuZCB1cGRhdGUgdGhlIHF1b3RlLlxyXG4gIH0sXHJcbiAgaGlkZUJ1c3k6IGZ1bmN0aW9uIGhpZGVCdXN5KCkge1xyXG4gICAgdGhpcy5fYnVzeUluZGljYXRvci5jb21wbGV0ZSgpO1xyXG4gICAgQXBwLm1vZGFsLmRpc2FibGVDbG9zZSA9IGZhbHNlO1xyXG4gICAgQXBwLm1vZGFsLmhpZGUoKTtcclxuICB9LFxyXG4gIGNvbnZlcnRRdW90ZTogZnVuY3Rpb24gY29udmVydFF1b3RlKCkge1xyXG4gICAgaWYgKCF0aGlzLmVudHJ5LiRrZXkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLmVudHJ5LkFjY291bnQuRXJwRXh0SWQpIHtcclxuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICB0aXRsZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgIGNvbnRlbnQ6IHJlc291cmNlLm5lZWRUb1Byb21vdGVBY2NvdW50LFxyXG4gICAgICAgIGdldENvbnRlbnQ6IG51bGwsXHJcbiAgICAgIH07XHJcbiAgICAgIEFwcC5tb2RhbC5jcmVhdGVTaW1wbGVEaWFsb2cob3B0aW9ucykudGhlbih0aGlzLm5hdmlnYXRlVG9SZWxhdGVkVmlldy5iaW5kKHRoaXMsICdhY2NvdW50X2RldGFpbCcsIDAsIHRoaXMuZW50cnkuQWNjb3VudC5BY2NvdW50TmFtZSkpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fY29udmVydFRvU2FsZXNPcmRlcigpO1xyXG4gIH0sXHJcbiAgaGFuZGxlUHJpY2luZ1N1Y2Nlc3M6IGZ1bmN0aW9uIGhhbmRsZVByaWNpbmdTdWNjZXNzKHJlc3VsdCkge1xyXG4gICAgdGhpcy5fcmVmcmVzaENsaWNrZWQoKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfSxcclxuICBvbkdldE9yZGVyVG90YWw6IGZ1bmN0aW9uIG9uR2V0T3JkZXJUb3RhbCgpIHtcclxuICAgIGlmICh0aGlzLmVudHJ5KSB7XHJcbiAgICAgIGlmICghdGhpcy5vcHRpb25zLmNvbnRleHQpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMuY29udGV4dCA9IHtcclxuICAgICAgICAgIFF1b3RlOiB0aGlzLmVudHJ5LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmNvbnRleHQuUXVvdGUgPSB0aGlzLmVudHJ5O1xyXG4gICAgICB9XHJcbiAgICAgIFByaWNpbmdBdmFpbGFiaWxpdHlTZXJ2aWNlLmdldFF1b3RlUHJpY2luZyh0aGlzLmVudHJ5KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICB0aGlzLmhhbmRsZVByaWNpbmdTdWNjZXNzKHJlc3VsdCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25SZVByaWNlOiBmdW5jdGlvbiBvblJlUHJpY2UoKSB7XHJcbiAgICBpZiAodGhpcy5lbnRyeSkge1xyXG4gICAgICBpZiAodGhpcy5pc1F1b3RlQ2xvc2VkKCkpIHtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgdGl0bGU6ICdhbGVydCcsXHJcbiAgICAgICAgICBjb250ZW50OiB0aGlzLnByaWNpbmdVbmF2YWlsYWJsZVRleHQsXHJcbiAgICAgICAgICBnZXRDb250ZW50OiBudWxsLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgQXBwLm1vZGFsLmNyZWF0ZVNpbXBsZURpYWxvZyhvcHRpb25zKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuY29udGV4dCkge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5jb250ZXh0ID0ge1xyXG4gICAgICAgICAgUXVvdGU6IHRoaXMuZW50cnksXHJcbiAgICAgICAgfTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMuY29udGV4dC5RdW90ZSA9IHRoaXMuZW50cnk7XHJcbiAgICAgIH1cclxuICAgICAgUHJpY2luZ0F2YWlsYWJpbGl0eVNlcnZpY2UucXVvdGVSZVByaWNlKHRoaXMuZW50cnkpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlUHJpY2luZ1N1Y2Nlc3MocmVzdWx0KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvblByb21vdGVRdW90ZTogZnVuY3Rpb24gb25Qcm9tb3RlUXVvdGUoKSB7XHJcbiAgICBjb25zdCBjYW5Qcm9tb3RlUHJvbWlzZSA9IHRoaXMuX2NhblByb21vdGUoKTtcclxuICAgIGNhblByb21vdGVQcm9taXNlLnRoZW4oKHZhbCkgPT4ge1xyXG4gICAgICB0aGlzLmhpZGVCdXN5KCk7XHJcbiAgICAgIGlmICghdmFsLnZhbHVlKSB7XHJcbiAgICAgICAgQXBwLm1vZGFsLmNyZWF0ZVNpbXBsZURpYWxvZyh7XHJcbiAgICAgICAgICB0aXRsZTogJ2FsZXJ0JyxcclxuICAgICAgICAgIGNvbnRlbnQ6IHZhbC5yZXN1bHQsXHJcbiAgICAgICAgICBnZXRDb250ZW50OiAoKSA9PiB7IHJldHVybjsgfSxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgcHJvbW90ZSA9IG5ldyBQcm9tb3RlKCk7XHJcbiAgICAgIHByb21vdGUucHJvbW90ZVRvQmFja09mZmljZSh0aGlzLmVudHJ5LCAnUXVvdGUnLCB0aGlzKTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgc2hvd0J1c3k6IGZ1bmN0aW9uIHNob3dCdXN5KCkge1xyXG4gICAgaWYgKCF0aGlzLl9idXN5SW5kaWNhdG9yIHx8IHRoaXMuX2J1c3lJbmRpY2F0b3IuX2Rlc3Ryb3llZCkge1xyXG4gICAgICB0aGlzLl9idXN5SW5kaWNhdG9yID0gbmV3IEJ1c3lJbmRpY2F0b3IoeyBpZDogYCR7dGhpcy5pZH0tYnVzeUluZGljYXRvcmAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9idXN5SW5kaWNhdG9yLnN0YXJ0KCk7XHJcbiAgICBBcHAubW9kYWwuZGlzYWJsZUNsb3NlID0gdHJ1ZTtcclxuICAgIEFwcC5tb2RhbC5zaG93VG9vbGJhciA9IGZhbHNlO1xyXG4gICAgQXBwLm1vZGFsLmFkZCh0aGlzLl9idXN5SW5kaWNhdG9yKTtcclxuICB9LFxyXG4gIGZvcm1hdFBpY2tsaXN0OiBmdW5jdGlvbiBmb3JtYXRQaWNrbGlzdChwcm9wZXJ0eSkge1xyXG4gICAgcmV0dXJuIGZvcm1hdC5waWNrbGlzdCh0aGlzLmFwcC5waWNrbGlzdFNlcnZpY2UsIHRoaXMuX21vZGVsLCBwcm9wZXJ0eSk7XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICB0aXRsZTogdGhpcy5hY3Rpb25zVGV4dCxcclxuICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgY2xzOiAnYWN0aW9uLWxpc3QnLFxyXG4gICAgICBuYW1lOiAnUXVpY2tBY3Rpb25zU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIG5hbWU6ICdDb252ZXJ0UXVvdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUXVvdGVOdW1iZXInLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmNvbnZlcnRRdW90ZVRleHQsXHJcbiAgICAgICAgaWNvbkNsYXNzOiAnY2FydCcsXHJcbiAgICAgICAgYWN0aW9uOiAnY29udmVydFF1b3RlJyxcclxuICAgICAgICBkaXNhYmxlZDogKCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuaXNRdW90ZUNsb3NlZCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VjdXJpdHk6ICdFbnRpdGllcy9RdW90ZS9Db252ZXJ0VG9TYWxlc09yZGVyJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdQcm9tb3RlUXVvdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUXVvdGVOdW1iZXInLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnByb21vdGVRdW90ZVRleHQsXHJcbiAgICAgICAgaWNvbkNsYXNzOiAndXBsb2FkJyxcclxuICAgICAgICBhY3Rpb246ICdvblByb21vdGVRdW90ZScsXHJcbiAgICAgICAgc2VjdXJpdHk6ICdFbnRpdGllcy9RdW90ZS9Qcm9tb3RlJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdHZXRPcmRlclRvdGFsJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1F1b3RlTnVtYmVyJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5nZXRRdW90ZVRvdGFsVGV4dCxcclxuICAgICAgICBpY29uQ2xhc3M6ICdmaW5hbmNlJyxcclxuICAgICAgICBhY3Rpb246ICdvbkdldE9yZGVyVG90YWwnLFxyXG4gICAgICAgIHNlY3VyaXR5OiAnRW50aXRpZXMvUXVvdGUvR2V0T3JkZXJUb3RhbCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQWRkTGluZUl0ZW1zJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1F1b3RlTnVtYmVyJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5hZGRMaW5lSXRlbXNUZXh0LFxyXG4gICAgICAgIGljb25DbGFzczogJ2J1bGxldC1saXN0JyxcclxuICAgICAgICBhY3Rpb246ICdhZGRMaW5lSXRlbXMnLFxyXG4gICAgICAgIHNlY3VyaXR5OiAnRW50aXRpZXMvUXVvdGUvQWRkJyxcclxuICAgICAgICBkaXNhYmxlZDogdGhpcy5pc1F1b3RlQ2xvc2VkLmJpbmQodGhpcyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnUmVQcmljZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdRdW90ZU51bWJlcicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucmVmcmVzaFByaWNpbmdUZXh0LFxyXG4gICAgICAgIGljb25DbGFzczogJ2ZpbmFuY2UnLFxyXG4gICAgICAgIGFjdGlvbjogJ29uUmVQcmljZScsXHJcbiAgICAgICAgc2VjdXJpdHk6ICdFbnRpdGllcy9RdW90ZS9BZGQnLFxyXG4gICAgICB9XSxcclxuICAgIH0sIHtcclxuICAgICAgdGl0bGU6IHRoaXMuZGV0YWlsc1RleHQsXHJcbiAgICAgIG5hbWU6ICdEZXRhaWxzU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIG5hbWU6ICdRdW90ZU51bWJlcicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdRdW90ZU51bWJlcicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucXVvdGVOdW1iZXJUZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0FjY291bnROYW1lJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0FjY291bnQuQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFjY291bnRUZXh0LFxyXG4gICAgICAgIHZpZXc6ICdhY2NvdW50X2RldGFpbCcsXHJcbiAgICAgICAga2V5OiAnQWNjb3VudC4ka2V5JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdSZXF1ZXN0ZWRCeScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdSZXF1ZXN0ZWRCeS5OYW1lTEYnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJlcXVlc3RlZEJ5VGV4dCxcclxuICAgICAgICB2aWV3OiAnY29udGFjdF9kZXRhaWwnLFxyXG4gICAgICAgIGtleTogJ1JlcXVlc3RlZEJ5LiRrZXknLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ09wcG9ydHVuaXR5JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ09wcG9ydHVuaXR5LkRlc2NyaXB0aW9uJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5vcHBvcnR1bml0eVRleHQsXHJcbiAgICAgICAgdmlldzogJ29wcG9ydHVuaXR5X2RldGFpbCcsXHJcbiAgICAgICAga2V5OiAnT3Bwb3J0dW5pdHkuJGtleScsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnU2FsZXNPcmRlcicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTYWxlc09yZGVyLlNhbGVzT3JkZXJOdW1iZXInLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnNhbGVzT3JkZXJUZXh0LFxyXG4gICAgICAgIHZpZXc6ICdzYWxlc29yZGVyX2RldGFpbCcsXHJcbiAgICAgICAga2V5OiAnU2FsZXNPcmRlci4ka2V5JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdPcmRlcklkJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycEV4dElkJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5vcmRlcklkVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdCYWNrT2ZmaWNlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycExvZ2ljYWxJZCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYmFja09mZmljZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKHZhbCkge1xyXG4gICAgICAgICAgaWYgKHZhbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwQWNjb3VudGluZ0VudGl0eUlkJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycEFjY291bnRpbmdFbnRpdHlJZCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWNjb3VudGluZ0VudGl0eVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKHZhbCkge1xyXG4gICAgICAgICAgaWYgKHZhbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQ3JlYXRlRGF0ZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDcmVhdGVEYXRlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5kYXRlQ3JlYXRlZFRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQuZGF0ZShkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1N0YXJ0RGF0ZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTdGFydERhdGUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnN0YXJ0RGF0ZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQuZGF0ZShkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VuZERhdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRW5kRGF0ZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZW5kRGF0ZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQuZGF0ZShkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0V4cGVjdGVkRGVsaXZlcnlEYXRlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0V4cGVjdGVkRGVsaXZlcnlEYXRlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5leHBlY3RlZERlbGl2ZXJ5RGF0ZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQuZGF0ZShkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0RvY3VtZW50RGF0ZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdEb2N1bWVudERhdGUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmRvY3VtZW50RGF0ZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQuZGF0ZShkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1N0YXR1cycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTdGF0dXMnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnN0YXR1c1RleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKHZhbCkge1xyXG4gICAgICAgICAgaWYgKHZhbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnU3luY1N0YXR1cycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTeW5jU3RhdHVzJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zeW5jU3RhdHVzVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogdGhpcy5mb3JtYXRQaWNrbGlzdCgnU3luY1N0YXR1cycpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VycFN0YXR1cycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBTdGF0dXMnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmVycFN0YXR1c1RleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IHRoaXMuZm9ybWF0UGlja2xpc3QoJ0VycFN0YXR1cycpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1N0YXR1c0RhdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU3RhdHVzRGF0ZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZXJwU3RhdHVzRGF0ZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQuZGF0ZShkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1N1YlRvdGFsJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1RvdGFsJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5iYXNlU3ViVG90YWxUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiAodmFsdWUpID0+IHtcclxuICAgICAgICAgIHJldHVybiB1dGlsaXR5LmZvcm1hdE11bHRpQ3VycmVuY3kodmFsdWUsIHRoaXMuZW50cnkuQmFzZUN1cnJlbmN5Q29kZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdHcmFuZFRvdGFsJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0dyYW5kVG90YWwnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmJhc2VHcmFuZFRvdGFsVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdXRpbGl0eS5mb3JtYXRNdWx0aUN1cnJlbmN5KHZhbHVlLCB0aGlzLmVudHJ5LkJhc2VDdXJyZW5jeUNvZGUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRG9jU3ViVG90YWwnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRG9jVG90YWwnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnN1YlRvdGFsVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdXRpbGl0eS5mb3JtYXRNdWx0aUN1cnJlbmN5KHZhbHVlLCB0aGlzLmVudHJ5LkN1cnJlbmN5Q29kZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdEb2NHcmFuZFRvdGFsJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0RvY0dyYW5kVG90YWwnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmdyYW5kVG90YWxUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiAodmFsdWUpID0+IHtcclxuICAgICAgICAgIHJldHVybiB1dGlsaXR5LmZvcm1hdE11bHRpQ3VycmVuY3kodmFsdWUsIHRoaXMuZW50cnkuQ3VycmVuY3lDb2RlKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0NvbW1lbnRzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0NvbW1lbnRzJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5jb21tZW50c1RleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQmlsbFRvJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0JpbGxUby5OYW1lJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5iaWxsVG9UZXh0LFxyXG4gICAgICAgIHZpZXc6ICdlcnBiaWxsdG9fZGV0YWlsJyxcclxuICAgICAgICBrZXk6ICdCaWxsVG8uJGtleScsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQmlsbFRvQWRkcmVzcycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdCaWxsVG8uQWRkcmVzcycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYmlsbFRvQWRkcmVzc1RleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXQuYWRkcmVzcyhkYXRhKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0JpbGxpbmdDb250YWN0QWRkcmVzcycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdCaWxsaW5nQ29udGFjdC5BZGRyZXNzJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5iaWxsaW5nQWRkcmVzc1RleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXQuYWRkcmVzcyhkYXRhKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1NoaXBUbycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTaGlwVG8uTmFtZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc2hpcFRvVGV4dCxcclxuICAgICAgICB2aWV3OiAnZXJwc2hpcHRvX2RldGFpbCcsXHJcbiAgICAgICAga2V5OiAnU2hpcFRvLiRrZXknLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1NoaXBUb0FkZHJlc3MnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU2hpcFRvLkFkZHJlc3MnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnNoaXBUb0FkZHJlc3NUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0LmFkZHJlc3MoZGF0YSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdMb2NhdGlvbicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdMb2NhdGlvbicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMubG9jYXRpb25UZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5sb2NhdGlvblR5cGUgPT09ICdXYXJlaG91c2UnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLkFkZHJlc3MgJiYgZGF0YS5BZGRyZXNzLkZ1bGxBZGRyZXNzKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdC5hZGRyZXNzKGRhdGEuQWRkcmVzcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGEuRGVzY3JpcHRpb247XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdXYXJlaG91c2UnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnV2FyZWhvdXNlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy53YXJlaG91c2VUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5sb2NhdGlvblR5cGUgJiYgdGhpcy5sb2NhdGlvblR5cGUgIT09ICdXYXJlaG91c2UnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLkFkZHJlc3MgJiYgZGF0YS5BZGRyZXNzLkZ1bGxBZGRyZXNzKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdC5hZGRyZXNzKGRhdGEuQWRkcmVzcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGEuRGVzY3JpcHRpb247XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTaGlwcGluZ0NvbnRhY3RBZGRyZXNzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1NoaXBwaW5nQ29udGFjdC5BZGRyZXNzJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zaGlwcGluZ0FkZHJlc3NUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0LmFkZHJlc3MoZGF0YSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdDYXJyaWVyJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0NhcnJpZXIuQ2Fycmllck5hbWUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmNhcnJpZXJUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0Ryb3BTaGlwJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0Ryb3BTaGlwJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5kcm9wU2hpcEFsbG93ZWRUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0Lnllc05vKGRhdGEpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnU2hpcEVhcmx5JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1NoaXBFYXJseScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc2hpcEVhcmx5QWxsb3dlZFRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQueWVzTm8oZGF0YSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdQYXJ0aWFsU2hpcCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdQYXJ0aWFsU2hpcCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucGFydGlhbFNoaXBBbGxvd2VkVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIoZGF0YSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdC55ZXNObyhkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9XSxcclxuICAgIH0sIHtcclxuICAgICAgdGl0bGU6IHRoaXMucmVsYXRlZEl0ZW1zVGV4dCxcclxuICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgbmFtZTogJ1JlbGF0ZWRJdGVtc1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBuYW1lOiAnUXVvdGVMaW5lcycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucXVvdGVMaW5lc1RleHQsXHJcbiAgICAgICAgd2hlcmU6IGZ1bmN0aW9uIHdoZXJlKGVudHJ5KSB7XHJcbiAgICAgICAgICByZXR1cm4gYFF1b3RlLiRrZXkgZXEgXCIke2VudHJ5LiRrZXl9XCJgO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdmlldzogJ3F1b3RlX2xpbmVzX3JlbGF0ZWQnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0F0dGFjaG1lbnRzJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5hdHRhY2htZW50c1RleHQsXHJcbiAgICAgICAgd2hlcmU6IGZ1bmN0aW9uIHdoZXJlKGVudHJ5KSB7XHJcbiAgICAgICAgICByZXR1cm4gYHF1b3RlSWQgZXEgXCIke2VudHJ5LiRrZXl9XCJgO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdmlldzogJ3F1b3RlX2F0dGFjaG1lbnRzX3JlbGF0ZWQnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1F1b3RlUGVyc29ucycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc2FsZXNQZXJzb25zVGV4dCxcclxuICAgICAgICB3aGVyZTogZnVuY3Rpb24gd2hlcmUoZW50cnkpIHtcclxuICAgICAgICAgIHJldHVybiBgUXVvdGUuSWQgZXEgXCIke2VudHJ5LiRrZXl9XCJgO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdmlldzogJ3F1b3RlcGVyc29uc19yZWxhdGVkJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTeW5jSGlzdG9yeScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc3luY0hpc3RvcnlUZXh0LFxyXG4gICAgICAgIHdoZXJlOiAoZW50cnkpID0+IHtcclxuICAgICAgICAgIHJldHVybiBgRW50aXR5VHlwZSBlcSBcIlF1b3RlXCIgYW5kIEVudGl0eUlkIGVxIFwiJHtlbnRyeS4ka2V5fVwiYDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHZpZXc6ICdxdW90ZV9zeW5jcmVzdWx0X3JlbGF0ZWQnLFxyXG4gICAgICB9XSxcclxuICAgIH1dKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5WaWV3cy5RdW90ZXMuRGV0YWlsJywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==