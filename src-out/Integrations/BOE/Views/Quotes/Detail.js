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
      this.inherited(onTransitionTo, arguments);
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
      this.inherited(processEntry, arguments);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL1F1b3Rlcy9EZXRhaWwuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiaWQiLCJlZGl0VmlldyIsImxvY2F0aW9uVHlwZSIsInRpdGxlVGV4dCIsImFjdGlvbnNUZXh0IiwicmVsYXRlZEl0ZW1zVGV4dCIsInF1b3RlTnVtYmVyVGV4dCIsImFjY291bnRUZXh0IiwiY29tbWVudHNUZXh0Iiwib3Bwb3J0dW5pdHlUZXh0IiwiZGF0ZUNyZWF0ZWRUZXh0Iiwib3JkZXJJZFRleHQiLCJzdGF0dXNUZXh0Iiwic3ViVG90YWxUZXh0IiwiZ3JhbmRUb3RhbFRleHQiLCJiYXNlU3ViVG90YWxUZXh0IiwiYmFzZUdyYW5kVG90YWxUZXh0IiwiYmlsbFRvVGV4dCIsImJpbGxUb0FkZHJlc3NUZXh0Iiwic2hpcFRvVGV4dCIsInNoaXBUb0FkZHJlc3NUZXh0IiwicGF5RnJvbVRleHQiLCJzYWxlc09yZGVyVGV4dCIsInF1b3RlTGluZXNUZXh0IiwiYXR0YWNobWVudHNUZXh0Iiwic2FsZXNQZXJzb25zVGV4dCIsImFkZExpbmVJdGVtc1RleHQiLCJyZW1vdmVMaW5lSXRlbXNUZXh0IiwiaGFzV29uRXJyb3JUZXh0Iiwid29uU3RhdHVzQ29kZSIsImNvbnZlcnRRdW90ZVRleHQiLCJjb252ZXJ0UXVvdGVNZXNzYWdlIiwibmVlZFRvUHJvbW90ZUFjY291bnQiLCJiaWxsaW5nQWRkcmVzc1RleHQiLCJzaGlwcGluZ0FkZHJlc3NUZXh0IiwicHJvbW90ZVF1b3RlVGV4dCIsImVudGl0eVRleHQiLCJzeW5jU3RhdHVzVGV4dCIsImJhY2tPZmZpY2VUZXh0IiwiYWNjb3VudGluZ0VudGl0eVRleHQiLCJzdGFydERhdGVUZXh0IiwiZW5kRGF0ZVRleHQiLCJkb2N1bWVudERhdGVUZXh0IiwiZXhwZWN0ZWREZWxpdmVyeURhdGVUZXh0IiwiZHJvcFNoaXBBbGxvd2VkVGV4dCIsInNoaXBFYXJseUFsbG93ZWRUZXh0IiwicGFydGlhbFNoaXBBbGxvd2VkVGV4dCIsIndhcmVob3VzZVRleHQiLCJsb2NhdGlvblRleHQiLCJhY2NvdW50aW5nRW50aXR5UmVxdWlyZWRUZXh0IiwicmVxdWVzdGVkQnlUZXh0Iiwic3luY0hpc3RvcnlUZXh0IiwiY2FycmllclRleHQiLCJnZXRRdW90ZVRvdGFsVGV4dCIsImVycFN0YXR1c1RleHQiLCJlcnBTdGF0dXNEYXRlVGV4dCIsInJlZnJlc2hQcmljaW5nVGV4dCIsInByaWNpbmdVbmF2YWlsYWJsZVRleHQiLCJyZXNvdXJjZUtpbmQiLCJtb2RlbE5hbWUiLCJRVU9URSIsIl9idXN5SW5kaWNhdG9yIiwiZW5hYmxlT2ZmbGluZSIsIm9uVHJhbnNpdGlvblRvIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiQXBwIiwiYmFycyIsInRiYXIiLCJkaXNhYmxlVG9vbCIsImNvbnRleHQiLCJpbnRlZ3JhdGlvblNldHRpbmdzIiwiX2NhblByb21vdGUiLCJwcm9taXNlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJzaG93QnVzeSIsImVudHJ5IiwiJG5hbWUiLCJyZXF1ZXN0IiwicXVvdGVJZCIsIiRrZXkiLCJTYWdlIiwiU0RhdGEiLCJDbGllbnQiLCJTRGF0YVNlcnZpY2VPcGVyYXRpb25SZXF1ZXN0IiwiZ2V0U2VydmljZSIsInNldFJlc291cmNlS2luZCIsInNldENvbnRyYWN0TmFtZSIsInNldE9wZXJhdGlvbk5hbWUiLCJjYW5Qcm9tb3RlIiwidmFsdWUiLCJyZXN1bHQiLCJleGVjdXRlIiwic3VjY2VzcyIsInJlc3BvbnNlIiwiUmVzdWx0IiwiZmFpbHVyZSIsImVyciIsIkpTT04iLCJwYXJzZSIsIm1lc3NhZ2UiLCJzY29wZSIsIl9jb252ZXJ0VG9TYWxlc09yZGVyIiwiY29udmVydFF1b3RlRW50cnkiLCJRdW90ZUlkIiwiaGlkZUJ1c3kiLCJyZWZyZXNoUmVxdWlyZWQiLCJ2aWV3IiwiZ2V0VmlldyIsIm9wdGlvbnMiLCJrZXkiLCJmcm9tQ29udGV4dCIsInNob3ciLCJ0aXRsZSIsImNvbnRlbnQiLCJnZXRDb250ZW50IiwibW9kYWwiLCJjcmVhdGVTaW1wbGVEaWFsb2ciLCJjb25zb2xlIiwiZXJyb3IiLCJpc1F1b3RlQ2xvc2VkIiwiSXNDbG9zZWQiLCJwcm9jZXNzRW50cnkiLCJoYXNBY2Nlc3NUbyIsImVuYWJsZVRvb2wiLCJhZGRMaW5lSXRlbXMiLCJFcnBMb2dpY2FsSWQiLCJ0aGVuIiwibmF2aWdhdGVUb0VkaXRWaWV3IiwicXVvdGVJdGVtVmlldyIsImNvdW50IiwiZ2V0TGlzdENvdW50Iiwid2hlcmUiLCJpbnNlcnQiLCJRdW90ZSIsIkN1cnJlbnRDb3VudCIsImNvbXBsZXRlIiwiZGlzYWJsZUNsb3NlIiwiaGlkZSIsImNvbnZlcnRRdW90ZSIsIkFjY291bnQiLCJFcnBFeHRJZCIsIm5hdmlnYXRlVG9SZWxhdGVkVmlldyIsImJpbmQiLCJBY2NvdW50TmFtZSIsImhhbmRsZVByaWNpbmdTdWNjZXNzIiwiX3JlZnJlc2hDbGlja2VkIiwib25HZXRPcmRlclRvdGFsIiwiZ2V0UXVvdGVQcmljaW5nIiwib25SZVByaWNlIiwicXVvdGVSZVByaWNlIiwib25Qcm9tb3RlUXVvdGUiLCJjYW5Qcm9tb3RlUHJvbWlzZSIsInZhbCIsInByb21vdGUiLCJwcm9tb3RlVG9CYWNrT2ZmaWNlIiwiX2Rlc3Ryb3llZCIsInN0YXJ0Iiwic2hvd1Rvb2xiYXIiLCJhZGQiLCJmb3JtYXRQaWNrbGlzdCIsInByb3BlcnR5IiwicGlja2xpc3QiLCJhcHAiLCJwaWNrbGlzdFNlcnZpY2UiLCJfbW9kZWwiLCJjcmVhdGVMYXlvdXQiLCJsYXlvdXQiLCJsaXN0IiwiY2xzIiwibmFtZSIsImNoaWxkcmVuIiwibGFiZWwiLCJpY29uQ2xhc3MiLCJhY3Rpb24iLCJkaXNhYmxlZCIsInNlY3VyaXR5IiwiZGV0YWlsc1RleHQiLCJyZW5kZXJlciIsImRhdGEiLCJkYXRlIiwiZm9ybWF0TXVsdGlDdXJyZW5jeSIsIkJhc2VDdXJyZW5jeUNvZGUiLCJDdXJyZW5jeUNvZGUiLCJh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S3RKLGNBRkg7QUFHVDhHLGlCQUFPLFNBQVNBLEtBQVQsQ0FBZXhELEtBQWYsRUFBc0I7QUFDM0IsdUNBQXlCQSxNQUFNSSxJQUEvQjtBQUNELFdBTFE7QUFNVDJCLGdCQUFNO0FBTkcsU0FBRCxFQU9QO0FBQ0QrRCxnQkFBTSxhQURMO0FBRURFLGlCQUFPLEtBQUtySixlQUZYO0FBR0Q2RyxpQkFBTyxTQUFTQSxLQUFULENBQWV4RCxLQUFmLEVBQXNCO0FBQzNCLG9DQUFzQkEsTUFBTUksSUFBNUI7QUFDRCxXQUxBO0FBTUQyQixnQkFBTTtBQU5MLFNBUE8sRUFjUDtBQUNEK0QsZ0JBQU0sY0FETDtBQUVERSxpQkFBTyxLQUFLcEosZ0JBRlg7QUFHRDRHLGlCQUFPLFNBQVNBLEtBQVQsQ0FBZXhELEtBQWYsRUFBc0I7QUFDM0IscUNBQXVCQSxNQUFNSSxJQUE3QjtBQUNELFdBTEE7QUFNRDJCLGdCQUFNO0FBTkwsU0FkTyxFQXFCUDtBQUNEK0QsZ0JBQU0sYUFETDtBQUVERSxpQkFBTyxLQUFLMUgsZUFGWDtBQUdEa0YsaUJBQU8sZUFBQ3hELEtBQUQsRUFBVztBQUNoQiwrREFBaURBLE1BQU1JLElBQXZEO0FBQ0QsV0FMQTtBQU1EMkIsZ0JBQU07QUFOTCxTQXJCTztBQUpULE9BaFRrQyxDQUE5QixDQUFQO0FBa1ZEO0FBdG5CMkUsR0FBOUQsQ0FBaEI7O0FBeW5CQSxpQkFBS2tGLFNBQUwsQ0FBZSwyQkFBZixFQUE0Qy9MLE9BQTVDO29CQUNlQSxPIiwiZmlsZSI6IkRldGFpbC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnY3JtL0Zvcm1hdCc7XHJcbmltcG9ydCBEZXRhaWwgZnJvbSAnYXJnb3MvRGV0YWlsJztcclxuaW1wb3J0IEJ1c3lJbmRpY2F0b3IgZnJvbSAnYXJnb3MvRGlhbG9ncy9CdXN5SW5kaWNhdG9yJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuaW1wb3J0IFByaWNpbmdBdmFpbGFiaWxpdHlTZXJ2aWNlIGZyb20gJy4uLy4uL1ByaWNpbmdBdmFpbGFiaWxpdHlTZXJ2aWNlJztcclxuaW1wb3J0IFByb21vdGUgZnJvbSAnLi4vLi4vUHJvbW90ZSc7XHJcbmltcG9ydCB1dGlsaXR5IGZyb20gJy4uLy4uL1V0aWxpdHknO1xyXG5cclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3F1b3RlRGV0YWlsJyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuUXVvdGVzLkRldGFpbCcsIFtEZXRhaWxdLCB7XHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdxdW90ZV9kZXRhaWwnLFxyXG4gIGVkaXRWaWV3OiAncXVvdGVfZWRpdCcsXHJcbiAgbG9jYXRpb25UeXBlOiAnJyxcclxuXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgYWN0aW9uc1RleHQ6IHJlc291cmNlLmFjdGlvbnNUZXh0LFxyXG4gIHJlbGF0ZWRJdGVtc1RleHQ6IHJlc291cmNlLnJlbGF0ZWRJdGVtc1RleHQsXHJcbiAgcXVvdGVOdW1iZXJUZXh0OiByZXNvdXJjZS5xdW90ZU51bWJlclRleHQsXHJcbiAgYWNjb3VudFRleHQ6IHJlc291cmNlLmFjY291bnRUZXh0LFxyXG4gIGNvbW1lbnRzVGV4dDogcmVzb3VyY2UuY29tbWVudHNUZXh0LFxyXG4gIG9wcG9ydHVuaXR5VGV4dDogcmVzb3VyY2Uub3Bwb3J0dW5pdHlUZXh0LFxyXG4gIGRhdGVDcmVhdGVkVGV4dDogcmVzb3VyY2UuZGF0ZUNyZWF0ZWRUZXh0LFxyXG4gIG9yZGVySWRUZXh0OiByZXNvdXJjZS5vcmRlcklkVGV4dCxcclxuICBzdGF0dXNUZXh0OiByZXNvdXJjZS5zdGF0dXNUZXh0LFxyXG4gIHN1YlRvdGFsVGV4dDogcmVzb3VyY2Uuc3ViVG90YWxUZXh0LFxyXG4gIGdyYW5kVG90YWxUZXh0OiByZXNvdXJjZS5ncmFuZFRvdGFsVGV4dCxcclxuICBiYXNlU3ViVG90YWxUZXh0OiByZXNvdXJjZS5iYXNlU3ViVG90YWxUZXh0LFxyXG4gIGJhc2VHcmFuZFRvdGFsVGV4dDogcmVzb3VyY2UuYmFzZUdyYW5kVG90YWxUZXh0LFxyXG4gIGJpbGxUb1RleHQ6IHJlc291cmNlLmJpbGxUb1RleHQsXHJcbiAgYmlsbFRvQWRkcmVzc1RleHQ6IHJlc291cmNlLmJpbGxUb0FkZHJlc3NUZXh0LFxyXG4gIHNoaXBUb1RleHQ6IHJlc291cmNlLnNoaXBUb1RleHQsXHJcbiAgc2hpcFRvQWRkcmVzc1RleHQ6IHJlc291cmNlLnNoaXBUb0FkZHJlc3NUZXh0LFxyXG4gIHBheUZyb21UZXh0OiByZXNvdXJjZS5wYXlGcm9tVGV4dCxcclxuICBzYWxlc09yZGVyVGV4dDogcmVzb3VyY2Uuc2FsZXNPcmRlclRleHQsXHJcbiAgcXVvdGVMaW5lc1RleHQ6IHJlc291cmNlLnF1b3RlTGluZXNUZXh0LFxyXG4gIGF0dGFjaG1lbnRzVGV4dDogcmVzb3VyY2UuYXR0YWNobWVudHNUZXh0LFxyXG4gIHNhbGVzUGVyc29uc1RleHQ6IHJlc291cmNlLnNhbGVzUGVyc29uc1RleHQsXHJcbiAgYWRkTGluZUl0ZW1zVGV4dDogcmVzb3VyY2UuYWRkTGluZUl0ZW1zVGV4dCxcclxuICByZW1vdmVMaW5lSXRlbXNUZXh0OiByZXNvdXJjZS5yZW1vdmVMaW5lSXRlbXNUZXh0LFxyXG4gIGhhc1dvbkVycm9yVGV4dDogcmVzb3VyY2UuaGFzV29uRXJyb3JUZXh0LFxyXG4gIHdvblN0YXR1c0NvZGU6IHJlc291cmNlLndvblN0YXR1c0NvZGUsXHJcbiAgY29udmVydFF1b3RlVGV4dDogcmVzb3VyY2UuY29udmVydFF1b3RlVGV4dCxcclxuICBjb252ZXJ0UXVvdGVNZXNzYWdlOiByZXNvdXJjZS5jb252ZXJ0UXVvdGVNZXNzYWdlLFxyXG4gIG5lZWRUb1Byb21vdGVBY2NvdW50OiByZXNvdXJjZS5uZWVkVG9Qcm9tb3RlQWNjb3VudCxcclxuICBiaWxsaW5nQWRkcmVzc1RleHQ6IHJlc291cmNlLmJpbGxpbmdBZGRyZXNzVGV4dCxcclxuICBzaGlwcGluZ0FkZHJlc3NUZXh0OiByZXNvdXJjZS5zaGlwcGluZ0FkZHJlc3NUZXh0LFxyXG4gIHByb21vdGVRdW90ZVRleHQ6IHJlc291cmNlLnByb21vdGVRdW90ZVRleHQsXHJcbiAgZW50aXR5VGV4dDogcmVzb3VyY2UuZW50aXR5VGV4dCxcclxuICBzeW5jU3RhdHVzVGV4dDogcmVzb3VyY2Uuc3luY1N0YXR1c1RleHQsXHJcbiAgYmFja09mZmljZVRleHQ6IHJlc291cmNlLmJhY2tPZmZpY2VUZXh0LFxyXG4gIGFjY291bnRpbmdFbnRpdHlUZXh0OiByZXNvdXJjZS5hY2NvdW50aW5nRW50aXR5VGV4dCxcclxuICBzdGFydERhdGVUZXh0OiByZXNvdXJjZS5zdGFydERhdGVUZXh0LFxyXG4gIGVuZERhdGVUZXh0OiByZXNvdXJjZS5lbmREYXRlVGV4dCxcclxuICBkb2N1bWVudERhdGVUZXh0OiByZXNvdXJjZS5kb2N1bWVudERhdGVUZXh0LFxyXG4gIGV4cGVjdGVkRGVsaXZlcnlEYXRlVGV4dDogcmVzb3VyY2UuZXhwZWN0ZWREZWxpdmVyeURhdGVUZXh0LFxyXG4gIGRyb3BTaGlwQWxsb3dlZFRleHQ6IHJlc291cmNlLmRyb3BTaGlwQWxsb3dlZFRleHQsXHJcbiAgc2hpcEVhcmx5QWxsb3dlZFRleHQ6IHJlc291cmNlLnNoaXBFYXJseUFsbG93ZWRUZXh0LFxyXG4gIHBhcnRpYWxTaGlwQWxsb3dlZFRleHQ6IHJlc291cmNlLnBhcnRpYWxTaGlwQWxsb3dlZFRleHQsXHJcbiAgd2FyZWhvdXNlVGV4dDogcmVzb3VyY2Uud2FyZWhvdXNlVGV4dCxcclxuICBsb2NhdGlvblRleHQ6IHJlc291cmNlLmxvY2F0aW9uVGV4dCxcclxuICBhY2NvdW50aW5nRW50aXR5UmVxdWlyZWRUZXh0OiByZXNvdXJjZS5hY2NvdW50aW5nRW50aXR5UmVxdWlyZWRUZXh0LFxyXG4gIHJlcXVlc3RlZEJ5VGV4dDogcmVzb3VyY2UucmVxdWVzdGVkQnlUZXh0LFxyXG4gIHN5bmNIaXN0b3J5VGV4dDogcmVzb3VyY2Uuc3luY0hpc3RvcnlUZXh0LFxyXG4gIGNhcnJpZXJUZXh0OiByZXNvdXJjZS5jYXJyaWVyVGV4dCxcclxuICBnZXRRdW90ZVRvdGFsVGV4dDogcmVzb3VyY2UuZ2V0UXVvdGVUb3RhbFRleHQsXHJcbiAgZXJwU3RhdHVzVGV4dDogcmVzb3VyY2UuZXJwU3RhdHVzVGV4dCxcclxuICBlcnBTdGF0dXNEYXRlVGV4dDogcmVzb3VyY2UuZXJwU3RhdHVzRGF0ZVRleHQsXHJcbiAgcmVmcmVzaFByaWNpbmdUZXh0OiByZXNvdXJjZS5yZWZyZXNoUHJpY2luZ1RleHQsXHJcbiAgcHJpY2luZ1VuYXZhaWxhYmxlVGV4dDogcmVzb3VyY2UucHJpY2luZ1VuYXZhaWxhYmxlVGV4dCxcclxuXHJcbiAgcmVzb3VyY2VLaW5kOiAncXVvdGVzJyxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLlFVT1RFLFxyXG4gIF9idXN5SW5kaWNhdG9yOiBudWxsLFxyXG4gIGVuYWJsZU9mZmxpbmU6IHRydWUsXHJcblxyXG4gIG9uVHJhbnNpdGlvblRvOiBmdW5jdGlvbiBvblRyYW5zaXRpb25UbygpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKG9uVHJhbnNpdGlvblRvLCBhcmd1bWVudHMpO1xyXG4gICAgQXBwLmJhcnMudGJhci5kaXNhYmxlVG9vbCgnZWRpdCcpO1xyXG4gICAgaWYgKCF0aGlzLmxvY2F0aW9uVHlwZSkge1xyXG4gICAgICB0aGlzLmxvY2F0aW9uVHlwZSA9IEFwcC5jb250ZXh0LmludGVncmF0aW9uU2V0dGluZ3MgJiYgQXBwLmNvbnRleHQuaW50ZWdyYXRpb25TZXR0aW5nc1snQmFjayBPZmZpY2UgRXh0ZW5zaW9uJ10gJiZcclxuICAgICAgICBBcHAuY29udGV4dC5pbnRlZ3JhdGlvblNldHRpbmdzWydCYWNrIE9mZmljZSBFeHRlbnNpb24nXVsnVHlwZSBvZiBPcmRlciBMb2NhdGlvbiddIHx8ICcnO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgX2NhblByb21vdGU6IGZ1bmN0aW9uIF9jYW5Qcm9tb3RlKCkge1xyXG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKFxyXG4gICAgICAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2hvd0J1c3koKTtcclxuICAgICAgICBjb25zdCBlbnRyeSA9IHtcclxuICAgICAgICAgICRuYW1lOiAnQ2FuUHJvbW90ZVF1b3RlJyxcclxuICAgICAgICAgIHJlcXVlc3Q6IHtcclxuICAgICAgICAgICAgcXVvdGVJZDogdGhpcy5lbnRyeS4ka2V5LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgU2FnZS5TRGF0YS5DbGllbnQuU0RhdGFTZXJ2aWNlT3BlcmF0aW9uUmVxdWVzdCh0aGlzLmdldFNlcnZpY2UoKSlcclxuICAgICAgICAgIC5zZXRSZXNvdXJjZUtpbmQoJ3F1b3RlcycpXHJcbiAgICAgICAgICAuc2V0Q29udHJhY3ROYW1lKCdkeW5hbWljJylcclxuICAgICAgICAgIC5zZXRPcGVyYXRpb25OYW1lKCdDYW5Qcm9tb3RlUXVvdGUnKTtcclxuXHJcbiAgICAgICAgY29uc3QgY2FuUHJvbW90ZSA9IHtcclxuICAgICAgICAgIHZhbHVlOiBmYWxzZSxcclxuICAgICAgICAgIHJlc3VsdDogJycsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmVxdWVzdC5leGVjdXRlKGVudHJ5LCB7XHJcbiAgICAgICAgICBzdWNjZXNzOiAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIGNhblByb21vdGUudmFsdWUgPSByZXN1bHQucmVzcG9uc2UuUmVzdWx0O1xyXG4gICAgICAgICAgICByZXNvbHZlKGNhblByb21vdGUpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZhaWx1cmU6IChlcnIpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBKU09OLnBhcnNlKGVyci5yZXNwb25zZSlbMF07XHJcbiAgICAgICAgICAgIGNhblByb21vdGUucmVzdWx0ID0gcmVzcG9uc2UubWVzc2FnZTtcclxuICAgICAgICAgICAgcmVzb2x2ZShjYW5Qcm9tb3RlKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBzY29wZTogdGhpcyxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gcHJvbWlzZTtcclxuICB9LFxyXG4gIF9jb252ZXJ0VG9TYWxlc09yZGVyOiBmdW5jdGlvbiBfY29udmVydFRvU2FsZXNPcmRlcigpIHtcclxuICAgIHRoaXMuc2hvd0J1c3koKTtcclxuICAgIGNvbnN0IGNvbnZlcnRRdW90ZUVudHJ5ID0ge1xyXG4gICAgICAkbmFtZTogJ0NvbnZlcnRRdW90ZVRvT3JkZXInLFxyXG4gICAgICByZXF1ZXN0OiB7XHJcbiAgICAgICAgUXVvdGVJZDogdGhpcy5lbnRyeS4ka2V5LFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhU2VydmljZU9wZXJhdGlvblJlcXVlc3QodGhpcy5nZXRTZXJ2aWNlKCkpXHJcbiAgICAgIC5zZXRSZXNvdXJjZUtpbmQoJ3F1b3RlcycpXHJcbiAgICAgIC5zZXRDb250cmFjdE5hbWUoJ2R5bmFtaWMnKVxyXG4gICAgICAuc2V0T3BlcmF0aW9uTmFtZSgnQ29udmVydFF1b3RlVG9PcmRlcicpO1xyXG5cclxuICAgIHJlcXVlc3QuZXhlY3V0ZShjb252ZXJ0UXVvdGVFbnRyeSwge1xyXG4gICAgICBzdWNjZXNzOiAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgdGhpcy5oaWRlQnVzeSgpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuICAgICAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoJ3NhbGVzb3JkZXJfZGV0YWlsJyk7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgIGtleTogcmVzdWx0LnJlc3BvbnNlLlJlc3VsdCxcclxuICAgICAgICAgIGZyb21Db250ZXh0OiB0aGlzLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKHZpZXcpIHtcclxuICAgICAgICAgIHZpZXcuc2hvdyhvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWx1cmU6IChlcnIpID0+IHtcclxuICAgICAgICB0aGlzLmhpZGVCdXN5KCk7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgIHRpdGxlOiAnYWxlcnQnLFxyXG4gICAgICAgICAgY29udGVudDogZXJyLnN0YXR1c1RleHQsXHJcbiAgICAgICAgICBnZXRDb250ZW50OiBudWxsLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgQXBwLm1vZGFsLmNyZWF0ZVNpbXBsZURpYWxvZyhvcHRpb25zKTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7Ly8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICB9LFxyXG4gICAgICBzY29wZTogdGhpcyxcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgaXNRdW90ZUNsb3NlZDogZnVuY3Rpb24gaXNRdW90ZUNsb3NlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLmVudHJ5LklzQ2xvc2VkO1xyXG4gIH0sXHJcbiAgcHJvY2Vzc0VudHJ5OiBmdW5jdGlvbiBwcm9jZXNzRW50cnkoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChwcm9jZXNzRW50cnksIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgLy8gSU5GT1JDUk0tMTY4MjggLSBTaW5jZSB3ZSBhcmUgbWFudWFsbHkgdGFraW5nIG92ZXIgdGhlIGRpc2FibGUvZW5hYmxlIG9mXHJcbiAgICAvLyB0aGUgZWRpdCwgY2hlY2sgdGhlIHNlY3VyaXR5IGJlZm9yZSB3ZSBtaWdodCBwb3RlbnRpYWxseSByZS1lbmFibGUgaXQuXHJcbiAgICBpZiAoIUFwcC5oYXNBY2Nlc3NUbyh0aGlzLmVkaXRWaWV3KSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuaXNRdW90ZUNsb3NlZCgpKSB7XHJcbiAgICAgIEFwcC5iYXJzLnRiYXIuZGlzYWJsZVRvb2woJ2VkaXQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEFwcC5iYXJzLnRiYXIuZW5hYmxlVG9vbCgnZWRpdCcpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYWRkTGluZUl0ZW1zOiBmdW5jdGlvbiBhZGRMaW5lSXRlbXMoKSB7XHJcbiAgICBpZiAoIXRoaXMuZW50cnkuRXJwTG9naWNhbElkKSB7XHJcbiAgICAgIEFwcC5tb2RhbC5jcmVhdGVTaW1wbGVEaWFsb2coe1xyXG4gICAgICAgIHRpdGxlOiAnYWxlcnQnLFxyXG4gICAgICAgIGNvbnRlbnQ6IHRoaXMuYWNjb3VudGluZ0VudGl0eVJlcXVpcmVkVGV4dCxcclxuICAgICAgICBnZXRDb250ZW50OiAoKSA9PiB7IHJldHVybjsgfSxcclxuICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvRWRpdFZpZXcoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0VmlldygncXVvdGVfbGluZV9lZGl0Jyk7XHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICBjb25zdCBxdW90ZUl0ZW1WaWV3ID0gQXBwLmdldFZpZXcoJ3F1b3RlX2xpbmVzX3JlbGF0ZWQnKTtcclxuICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgaWYgKHF1b3RlSXRlbVZpZXcpIHtcclxuICAgICAgICBxdW90ZUl0ZW1WaWV3LmdldExpc3RDb3VudCh7IHdoZXJlOiBgUXVvdGUuJGtleSBlcSBcIiR7dGhpcy5lbnRyeS4ka2V5fVwiYCB9KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgIGNvdW50ID0gcmVzdWx0O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgaW5zZXJ0OiB0cnVlLFxyXG4gICAgICAgIGNvbnRleHQ6IHtcclxuICAgICAgICAgIFF1b3RlOiB0aGlzLmVudHJ5LFxyXG4gICAgICAgICAgQ3VycmVudENvdW50OiBjb3VudCxcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgICAgIHZpZXcuc2hvdyhvcHRpb25zKTtcclxuICAgIH0gLy8gVE9ETzogZGlyZWN0IHRvIGxpbmUgaXRlbXMgbGlzdCB2aWV3IGFuZCBhbGxvdyBtdWx0aS1zZWxlY3QuIE9uIHNhdmUgd2lsbCBhdHRhY2ggaXRlbXMgdG8gcXVvdGUgcHJvZHVjdCBhbmQgdXBkYXRlIHRoZSBxdW90ZS5cclxuICB9LFxyXG4gIGhpZGVCdXN5OiBmdW5jdGlvbiBoaWRlQnVzeSgpIHtcclxuICAgIHRoaXMuX2J1c3lJbmRpY2F0b3IuY29tcGxldGUoKTtcclxuICAgIEFwcC5tb2RhbC5kaXNhYmxlQ2xvc2UgPSBmYWxzZTtcclxuICAgIEFwcC5tb2RhbC5oaWRlKCk7XHJcbiAgfSxcclxuICBjb252ZXJ0UXVvdGU6IGZ1bmN0aW9uIGNvbnZlcnRRdW90ZSgpIHtcclxuICAgIGlmICghdGhpcy5lbnRyeS4ka2V5KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5lbnRyeS5BY2NvdW50LkVycEV4dElkKSB7XHJcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgdGl0bGU6ICd3YXJuaW5nJyxcclxuICAgICAgICBjb250ZW50OiByZXNvdXJjZS5uZWVkVG9Qcm9tb3RlQWNjb3VudCxcclxuICAgICAgICBnZXRDb250ZW50OiBudWxsLFxyXG4gICAgICB9O1xyXG4gICAgICBBcHAubW9kYWwuY3JlYXRlU2ltcGxlRGlhbG9nKG9wdGlvbnMpLnRoZW4odGhpcy5uYXZpZ2F0ZVRvUmVsYXRlZFZpZXcuYmluZCh0aGlzLCAnYWNjb3VudF9kZXRhaWwnLCAwLCB0aGlzLmVudHJ5LkFjY291bnQuQWNjb3VudE5hbWUpKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2NvbnZlcnRUb1NhbGVzT3JkZXIoKTtcclxuICB9LFxyXG4gIGhhbmRsZVByaWNpbmdTdWNjZXNzOiBmdW5jdGlvbiBoYW5kbGVQcmljaW5nU3VjY2VzcyhyZXN1bHQpIHtcclxuICAgIHRoaXMuX3JlZnJlc2hDbGlja2VkKCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH0sXHJcbiAgb25HZXRPcmRlclRvdGFsOiBmdW5jdGlvbiBvbkdldE9yZGVyVG90YWwoKSB7XHJcbiAgICBpZiAodGhpcy5lbnRyeSkge1xyXG4gICAgICBpZiAoIXRoaXMub3B0aW9ucy5jb250ZXh0KSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmNvbnRleHQgPSB7XHJcbiAgICAgICAgICBRdW90ZTogdGhpcy5lbnRyeSxcclxuICAgICAgICB9O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5jb250ZXh0LlF1b3RlID0gdGhpcy5lbnRyeTtcclxuICAgICAgfVxyXG4gICAgICBQcmljaW5nQXZhaWxhYmlsaXR5U2VydmljZS5nZXRRdW90ZVByaWNpbmcodGhpcy5lbnRyeSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVQcmljaW5nU3VjY2VzcyhyZXN1bHQpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uUmVQcmljZTogZnVuY3Rpb24gb25SZVByaWNlKCkge1xyXG4gICAgaWYgKHRoaXMuZW50cnkpIHtcclxuICAgICAgaWYgKHRoaXMuaXNRdW90ZUNsb3NlZCgpKSB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgIHRpdGxlOiAnYWxlcnQnLFxyXG4gICAgICAgICAgY29udGVudDogdGhpcy5wcmljaW5nVW5hdmFpbGFibGVUZXh0LFxyXG4gICAgICAgICAgZ2V0Q29udGVudDogbnVsbCxcclxuICAgICAgICB9O1xyXG4gICAgICAgIEFwcC5tb2RhbC5jcmVhdGVTaW1wbGVEaWFsb2cob3B0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghdGhpcy5vcHRpb25zLmNvbnRleHQpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMuY29udGV4dCA9IHtcclxuICAgICAgICAgIFF1b3RlOiB0aGlzLmVudHJ5LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmNvbnRleHQuUXVvdGUgPSB0aGlzLmVudHJ5O1xyXG4gICAgICB9XHJcbiAgICAgIFByaWNpbmdBdmFpbGFiaWxpdHlTZXJ2aWNlLnF1b3RlUmVQcmljZSh0aGlzLmVudHJ5KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICB0aGlzLmhhbmRsZVByaWNpbmdTdWNjZXNzKHJlc3VsdCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25Qcm9tb3RlUXVvdGU6IGZ1bmN0aW9uIG9uUHJvbW90ZVF1b3RlKCkge1xyXG4gICAgY29uc3QgY2FuUHJvbW90ZVByb21pc2UgPSB0aGlzLl9jYW5Qcm9tb3RlKCk7XHJcbiAgICBjYW5Qcm9tb3RlUHJvbWlzZS50aGVuKCh2YWwpID0+IHtcclxuICAgICAgdGhpcy5oaWRlQnVzeSgpO1xyXG4gICAgICBpZiAoIXZhbC52YWx1ZSkge1xyXG4gICAgICAgIEFwcC5tb2RhbC5jcmVhdGVTaW1wbGVEaWFsb2coe1xyXG4gICAgICAgICAgdGl0bGU6ICdhbGVydCcsXHJcbiAgICAgICAgICBjb250ZW50OiB2YWwucmVzdWx0LFxyXG4gICAgICAgICAgZ2V0Q29udGVudDogKCkgPT4geyByZXR1cm47IH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHByb21vdGUgPSBuZXcgUHJvbW90ZSgpO1xyXG4gICAgICBwcm9tb3RlLnByb21vdGVUb0JhY2tPZmZpY2UodGhpcy5lbnRyeSwgJ1F1b3RlJywgdGhpcyk7XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHNob3dCdXN5OiBmdW5jdGlvbiBzaG93QnVzeSgpIHtcclxuICAgIGlmICghdGhpcy5fYnVzeUluZGljYXRvciB8fCB0aGlzLl9idXN5SW5kaWNhdG9yLl9kZXN0cm95ZWQpIHtcclxuICAgICAgdGhpcy5fYnVzeUluZGljYXRvciA9IG5ldyBCdXN5SW5kaWNhdG9yKHsgaWQ6IGAke3RoaXMuaWR9LWJ1c3lJbmRpY2F0b3JgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fYnVzeUluZGljYXRvci5zdGFydCgpO1xyXG4gICAgQXBwLm1vZGFsLmRpc2FibGVDbG9zZSA9IHRydWU7XHJcbiAgICBBcHAubW9kYWwuc2hvd1Rvb2xiYXIgPSBmYWxzZTtcclxuICAgIEFwcC5tb2RhbC5hZGQodGhpcy5fYnVzeUluZGljYXRvcik7XHJcbiAgfSxcclxuICBmb3JtYXRQaWNrbGlzdDogZnVuY3Rpb24gZm9ybWF0UGlja2xpc3QocHJvcGVydHkpIHtcclxuICAgIHJldHVybiBmb3JtYXQucGlja2xpc3QodGhpcy5hcHAucGlja2xpc3RTZXJ2aWNlLCB0aGlzLl9tb2RlbCwgcHJvcGVydHkpO1xyXG4gIH0sXHJcbiAgY3JlYXRlTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXlvdXQgfHwgKHRoaXMubGF5b3V0ID0gW3tcclxuICAgICAgdGl0bGU6IHRoaXMuYWN0aW9uc1RleHQsXHJcbiAgICAgIGxpc3Q6IHRydWUsXHJcbiAgICAgIGNsczogJ2FjdGlvbi1saXN0JyxcclxuICAgICAgbmFtZTogJ1F1aWNrQWN0aW9uc1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBuYW1lOiAnQ29udmVydFF1b3RlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1F1b3RlTnVtYmVyJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5jb252ZXJ0UXVvdGVUZXh0LFxyXG4gICAgICAgIGljb25DbGFzczogJ2NhcnQnLFxyXG4gICAgICAgIGFjdGlvbjogJ2NvbnZlcnRRdW90ZScsXHJcbiAgICAgICAgZGlzYWJsZWQ6ICgpID0+IHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmlzUXVvdGVDbG9zZWQoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNlY3VyaXR5OiAnRW50aXRpZXMvUXVvdGUvQ29udmVydFRvU2FsZXNPcmRlcicsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnUHJvbW90ZVF1b3RlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1F1b3RlTnVtYmVyJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5wcm9tb3RlUXVvdGVUZXh0LFxyXG4gICAgICAgIGljb25DbGFzczogJ3VwbG9hZCcsXHJcbiAgICAgICAgYWN0aW9uOiAnb25Qcm9tb3RlUXVvdGUnLFxyXG4gICAgICAgIHNlY3VyaXR5OiAnRW50aXRpZXMvUXVvdGUvUHJvbW90ZScsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnR2V0T3JkZXJUb3RhbCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdRdW90ZU51bWJlcicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZ2V0UXVvdGVUb3RhbFRleHQsXHJcbiAgICAgICAgaWNvbkNsYXNzOiAnZmluYW5jZScsXHJcbiAgICAgICAgYWN0aW9uOiAnb25HZXRPcmRlclRvdGFsJyxcclxuICAgICAgICBzZWN1cml0eTogJ0VudGl0aWVzL1F1b3RlL0dldE9yZGVyVG90YWwnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0FkZExpbmVJdGVtcycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdRdW90ZU51bWJlcicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWRkTGluZUl0ZW1zVGV4dCxcclxuICAgICAgICBpY29uQ2xhc3M6ICdidWxsZXQtbGlzdCcsXHJcbiAgICAgICAgYWN0aW9uOiAnYWRkTGluZUl0ZW1zJyxcclxuICAgICAgICBzZWN1cml0eTogJ0VudGl0aWVzL1F1b3RlL0FkZCcsXHJcbiAgICAgICAgZGlzYWJsZWQ6IHRoaXMuaXNRdW90ZUNsb3NlZC5iaW5kKHRoaXMpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1JlUHJpY2UnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUXVvdGVOdW1iZXInLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJlZnJlc2hQcmljaW5nVGV4dCxcclxuICAgICAgICBpY29uQ2xhc3M6ICdmaW5hbmNlJyxcclxuICAgICAgICBhY3Rpb246ICdvblJlUHJpY2UnLFxyXG4gICAgICAgIHNlY3VyaXR5OiAnRW50aXRpZXMvUXVvdGUvQWRkJyxcclxuICAgICAgfV0sXHJcbiAgICB9LCB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmRldGFpbHNUZXh0LFxyXG4gICAgICBuYW1lOiAnRGV0YWlsc1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBuYW1lOiAnUXVvdGVOdW1iZXInLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUXVvdGVOdW1iZXInLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnF1b3RlTnVtYmVyVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdBY2NvdW50TmFtZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdBY2NvdW50LkFjY291bnROYW1lJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5hY2NvdW50VGV4dCxcclxuICAgICAgICB2aWV3OiAnYWNjb3VudF9kZXRhaWwnLFxyXG4gICAgICAgIGtleTogJ0FjY291bnQuJGtleScsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnUmVxdWVzdGVkQnknLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUmVxdWVzdGVkQnkuTmFtZUxGJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5yZXF1ZXN0ZWRCeVRleHQsXHJcbiAgICAgICAgdmlldzogJ2NvbnRhY3RfZGV0YWlsJyxcclxuICAgICAgICBrZXk6ICdSZXF1ZXN0ZWRCeS4ka2V5JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdPcHBvcnR1bml0eScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdPcHBvcnR1bml0eS5EZXNjcmlwdGlvbicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMub3Bwb3J0dW5pdHlUZXh0LFxyXG4gICAgICAgIHZpZXc6ICdvcHBvcnR1bml0eV9kZXRhaWwnLFxyXG4gICAgICAgIGtleTogJ09wcG9ydHVuaXR5LiRrZXknLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1NhbGVzT3JkZXInLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU2FsZXNPcmRlci5TYWxlc09yZGVyTnVtYmVyJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zYWxlc09yZGVyVGV4dCxcclxuICAgICAgICB2aWV3OiAnc2FsZXNvcmRlcl9kZXRhaWwnLFxyXG4gICAgICAgIGtleTogJ1NhbGVzT3JkZXIuJGtleScsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnT3JkZXJJZCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBFeHRJZCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMub3JkZXJJZFRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQmFja09mZmljZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBMb2dpY2FsSWQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmJhY2tPZmZpY2VUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcih2YWwpIHtcclxuICAgICAgICAgIGlmICh2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VycEFjY291bnRpbmdFbnRpdHlJZCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBBY2NvdW50aW5nRW50aXR5SWQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFjY291bnRpbmdFbnRpdHlUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcih2YWwpIHtcclxuICAgICAgICAgIGlmICh2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0NyZWF0ZURhdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ3JlYXRlRGF0ZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZGF0ZUNyZWF0ZWRUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0LmRhdGUoZGF0YSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTdGFydERhdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU3RhcnREYXRlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zdGFydERhdGVUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0LmRhdGUoZGF0YSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFbmREYXRlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VuZERhdGUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmVuZERhdGVUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0LmRhdGUoZGF0YSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFeHBlY3RlZERlbGl2ZXJ5RGF0ZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFeHBlY3RlZERlbGl2ZXJ5RGF0ZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZXhwZWN0ZWREZWxpdmVyeURhdGVUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0LmRhdGUoZGF0YSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdEb2N1bWVudERhdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRG9jdW1lbnREYXRlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5kb2N1bWVudERhdGVUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0LmRhdGUoZGF0YSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTdGF0dXMnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU3RhdHVzJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zdGF0dXNUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcih2YWwpIHtcclxuICAgICAgICAgIGlmICh2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1N5bmNTdGF0dXMnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU3luY1N0YXR1cycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc3luY1N0YXR1c1RleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IHRoaXMuZm9ybWF0UGlja2xpc3QoJ1N5bmNTdGF0dXMnKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFcnBTdGF0dXMnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwU3RhdHVzJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5lcnBTdGF0dXNUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiB0aGlzLmZvcm1hdFBpY2tsaXN0KCdFcnBTdGF0dXMnKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTdGF0dXNEYXRlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1N0YXR1c0RhdGUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmVycFN0YXR1c0RhdGVUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0LmRhdGUoZGF0YSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTdWJUb3RhbCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdUb3RhbCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYmFzZVN1YlRvdGFsVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdXRpbGl0eS5mb3JtYXRNdWx0aUN1cnJlbmN5KHZhbHVlLCB0aGlzLmVudHJ5LkJhc2VDdXJyZW5jeUNvZGUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnR3JhbmRUb3RhbCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdHcmFuZFRvdGFsJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5iYXNlR3JhbmRUb3RhbFRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHV0aWxpdHkuZm9ybWF0TXVsdGlDdXJyZW5jeSh2YWx1ZSwgdGhpcy5lbnRyeS5CYXNlQ3VycmVuY3lDb2RlKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0RvY1N1YlRvdGFsJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0RvY1RvdGFsJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zdWJUb3RhbFRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHV0aWxpdHkuZm9ybWF0TXVsdGlDdXJyZW5jeSh2YWx1ZSwgdGhpcy5lbnRyeS5DdXJyZW5jeUNvZGUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRG9jR3JhbmRUb3RhbCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdEb2NHcmFuZFRvdGFsJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5ncmFuZFRvdGFsVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdXRpbGl0eS5mb3JtYXRNdWx0aUN1cnJlbmN5KHZhbHVlLCB0aGlzLmVudHJ5LkN1cnJlbmN5Q29kZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdDb21tZW50cycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDb21tZW50cycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuY29tbWVudHNUZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0JpbGxUbycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdCaWxsVG8uTmFtZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYmlsbFRvVGV4dCxcclxuICAgICAgICB2aWV3OiAnZXJwYmlsbHRvX2RldGFpbCcsXHJcbiAgICAgICAga2V5OiAnQmlsbFRvLiRrZXknLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0JpbGxUb0FkZHJlc3MnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQmlsbFRvLkFkZHJlc3MnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmJpbGxUb0FkZHJlc3NUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0LmFkZHJlc3MoZGF0YSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdCaWxsaW5nQ29udGFjdEFkZHJlc3MnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQmlsbGluZ0NvbnRhY3QuQWRkcmVzcycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYmlsbGluZ0FkZHJlc3NUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0LmFkZHJlc3MoZGF0YSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTaGlwVG8nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU2hpcFRvLk5hbWUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnNoaXBUb1RleHQsXHJcbiAgICAgICAgdmlldzogJ2VycHNoaXB0b19kZXRhaWwnLFxyXG4gICAgICAgIGtleTogJ1NoaXBUby4ka2V5JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTaGlwVG9BZGRyZXNzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1NoaXBUby5BZGRyZXNzJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zaGlwVG9BZGRyZXNzVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIoZGF0YSkge1xyXG4gICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdC5hZGRyZXNzKGRhdGEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnTG9jYXRpb24nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnTG9jYXRpb24nLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmxvY2F0aW9uVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIoZGF0YSkge1xyXG4gICAgICAgICAgaWYgKHRoaXMubG9jYXRpb25UeXBlID09PSAnV2FyZWhvdXNlJykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5BZGRyZXNzICYmIGRhdGEuQWRkcmVzcy5GdWxsQWRkcmVzcykge1xyXG4gICAgICAgICAgICAgIHJldHVybiBmb3JtYXQuYWRkcmVzcyhkYXRhLkFkZHJlc3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhLkRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnV2FyZWhvdXNlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1dhcmVob3VzZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMud2FyZWhvdXNlVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIoZGF0YSkge1xyXG4gICAgICAgICAgaWYgKHRoaXMubG9jYXRpb25UeXBlICYmIHRoaXMubG9jYXRpb25UeXBlICE9PSAnV2FyZWhvdXNlJykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5BZGRyZXNzICYmIGRhdGEuQWRkcmVzcy5GdWxsQWRkcmVzcykge1xyXG4gICAgICAgICAgICAgIHJldHVybiBmb3JtYXQuYWRkcmVzcyhkYXRhLkFkZHJlc3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhLkRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnU2hpcHBpbmdDb250YWN0QWRkcmVzcycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTaGlwcGluZ0NvbnRhY3QuQWRkcmVzcycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc2hpcHBpbmdBZGRyZXNzVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIoZGF0YSkge1xyXG4gICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdC5hZGRyZXNzKGRhdGEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQ2FycmllcicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDYXJyaWVyLkNhcnJpZXJOYW1lJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5jYXJyaWVyVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIoZGF0YSkge1xyXG4gICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdEcm9wU2hpcCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdEcm9wU2hpcCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZHJvcFNoaXBBbGxvd2VkVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIoZGF0YSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdC55ZXNObyhkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1NoaXBFYXJseScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTaGlwRWFybHknLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnNoaXBFYXJseUFsbG93ZWRUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0Lnllc05vKGRhdGEpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnUGFydGlhbFNoaXAnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUGFydGlhbFNoaXAnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnBhcnRpYWxTaGlwQWxsb3dlZFRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQueWVzTm8oZGF0YSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfV0sXHJcbiAgICB9LCB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLnJlbGF0ZWRJdGVtc1RleHQsXHJcbiAgICAgIGxpc3Q6IHRydWUsXHJcbiAgICAgIG5hbWU6ICdSZWxhdGVkSXRlbXNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbmFtZTogJ1F1b3RlTGluZXMnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnF1b3RlTGluZXNUZXh0LFxyXG4gICAgICAgIHdoZXJlOiBmdW5jdGlvbiB3aGVyZShlbnRyeSkge1xyXG4gICAgICAgICAgcmV0dXJuIGBRdW90ZS4ka2V5IGVxIFwiJHtlbnRyeS4ka2V5fVwiYDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHZpZXc6ICdxdW90ZV9saW5lc19yZWxhdGVkJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdBdHRhY2htZW50cycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYXR0YWNobWVudHNUZXh0LFxyXG4gICAgICAgIHdoZXJlOiBmdW5jdGlvbiB3aGVyZShlbnRyeSkge1xyXG4gICAgICAgICAgcmV0dXJuIGBxdW90ZUlkIGVxIFwiJHtlbnRyeS4ka2V5fVwiYDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHZpZXc6ICdxdW90ZV9hdHRhY2htZW50c19yZWxhdGVkJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdRdW90ZVBlcnNvbnMnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnNhbGVzUGVyc29uc1RleHQsXHJcbiAgICAgICAgd2hlcmU6IGZ1bmN0aW9uIHdoZXJlKGVudHJ5KSB7XHJcbiAgICAgICAgICByZXR1cm4gYFF1b3RlLklkIGVxIFwiJHtlbnRyeS4ka2V5fVwiYDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHZpZXc6ICdxdW90ZXBlcnNvbnNfcmVsYXRlZCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnU3luY0hpc3RvcnknLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnN5bmNIaXN0b3J5VGV4dCxcclxuICAgICAgICB3aGVyZTogKGVudHJ5KSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gYEVudGl0eVR5cGUgZXEgXCJRdW90ZVwiIGFuZCBFbnRpdHlJZCBlcSBcIiR7ZW50cnkuJGtleX1cImA7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB2aWV3OiAncXVvdGVfc3luY3Jlc3VsdF9yZWxhdGVkJyxcclxuICAgICAgfV0sXHJcbiAgICB9XSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuVmlld3MuUXVvdGVzLkRldGFpbCcsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=