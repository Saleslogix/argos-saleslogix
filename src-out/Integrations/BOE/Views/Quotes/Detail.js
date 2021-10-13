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

  const resource = (0, _I18n2.default)('quoteDetail');

  const __class = (0, _declare2.default)('crm.Integrations.BOE.Views.Quotes.Detail', [_Detail2.default], {
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
      const promise = new Promise(resolve => {
        this.showBusy();
        const entry = {
          $name: 'CanPromoteQuote',
          request: {
            quoteId: this.entry.$key
          }
        };
        const request = new Sage.SData.Client.SDataServiceOperationRequest(this.getService()).setResourceKind('quotes').setContractName('dynamic').setOperationName('CanPromoteQuote');

        const canPromote = {
          value: false,
          result: ''
        };

        request.execute(entry, {
          success: result => {
            canPromote.value = result.response.Result;
            resolve(canPromote);
          },
          failure: err => {
            const response = JSON.parse(err.response)[0];
            canPromote.result = response.message;
            resolve(canPromote);
          },
          scope: this
        });
      });

      return promise;
    },
    _convertToSalesOrder: function _convertToSalesOrder() {
      this.showBusy();
      const convertQuoteEntry = {
        $name: 'ConvertQuoteToOrder',
        request: {
          QuoteId: this.entry.$key
        }
      };

      const request = new Sage.SData.Client.SDataServiceOperationRequest(this.getService()).setResourceKind('quotes').setContractName('dynamic').setOperationName('ConvertQuoteToOrder');

      request.execute(convertQuoteEntry, {
        success: result => {
          this.hideBusy();
          this.refreshRequired = true;
          const view = App.getView('salesorder_detail');
          const options = {
            key: result.response.Result,
            fromContext: this
          };
          if (view) {
            view.show(options);
          }
        },
        failure: err => {
          this.hideBusy();
          const options = {
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
      if (!this.entry.ErpLogicalId) {
        App.modal.createSimpleDialog({
          title: 'alert',
          content: this.accountingEntityRequiredText,
          getContent: () => {
            return;
          }
        }).then(() => {
          this.navigateToEditView();
        });
        return;
      }
      const view = App.getView('quote_line_edit');
      if (view) {
        const quoteItemView = App.getView('quote_lines_related');
        let count = 0;
        if (quoteItemView) {
          quoteItemView.getListCount({ where: `Quote.$key eq "${this.entry.$key}"` }).then(result => {
            count = result;
          });
        }
        const options = {
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
        const options = {
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
      if (this.entry) {
        if (!this.options.context) {
          this.options.context = {
            Quote: this.entry
          };
        } else {
          this.options.context.Quote = this.entry;
        }
        _PricingAvailabilityService2.default.getQuotePricing(this.entry).then(result => {
          this.handlePricingSuccess(result);
        });
      }
    },
    onRePrice: function onRePrice() {
      if (this.entry) {
        if (this.isQuoteClosed()) {
          const options = {
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
        _PricingAvailabilityService2.default.quoteRePrice(this.entry).then(result => {
          this.handlePricingSuccess(result);
        });
      }
    },
    onPromoteQuote: function onPromoteQuote() {
      const canPromotePromise = this._canPromote();
      canPromotePromise.then(val => {
        this.hideBusy();
        if (!val.value) {
          App.modal.createSimpleDialog({
            title: 'alert',
            content: val.result,
            getContent: () => {
              return;
            }
          });
          return;
        }
        const promote = new _Promote2.default();
        promote.promoteToBackOffice(this.entry, 'Quote', this);
      });
    },
    showBusy: function showBusy() {
      if (!this._busyIndicator || this._busyIndicator._destroyed) {
        this._busyIndicator = new _BusyIndicator2.default({ id: `${this.id}-busyIndicator` });
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
          disabled: () => {
            return this.isQuoteClosed();
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
          renderer: value => {
            return _Utility2.default.formatMultiCurrency(value, this.entry.BaseCurrencyCode);
          }
        }, {
          name: 'GrandTotal',
          property: 'GrandTotal',
          label: this.baseGrandTotalText,
          renderer: value => {
            return _Utility2.default.formatMultiCurrency(value, this.entry.BaseCurrencyCode);
          }
        }, {
          name: 'DocSubTotal',
          property: 'DocTotal',
          label: this.subTotalText,
          renderer: value => {
            return _Utility2.default.formatMultiCurrency(value, this.entry.CurrencyCode);
          }
        }, {
          name: 'DocGrandTotal',
          property: 'DocGrandTotal',
          label: this.grandTotalText,
          renderer: value => {
            return _Utility2.default.formatMultiCurrency(value, this.entry.CurrencyCode);
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
            return `Quote.$key eq "${entry.$key}"`;
          },
          view: 'quote_lines_related'
        }, {
          name: 'Attachments',
          label: this.attachmentsText,
          where: function where(entry) {
            return `quoteId eq "${entry.$key}"`;
          },
          view: 'quote_attachments_related'
        }, {
          name: 'QuotePersons',
          label: this.salesPersonsText,
          where: function where(entry) {
            return `Quote.Id eq "${entry.$key}"`;
          },
          view: 'quotepersons_related'
        }, {
          name: 'SyncHistory',
          label: this.syncHistoryText,
          where: entry => {
            return `EntityType eq "Quote" and EntityId eq "${entry.$key}"`;
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