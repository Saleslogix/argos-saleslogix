define('crm/Integrations/BOE/Views/SalesOrders/Detail', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'crm/Format', 'argos/Detail', 'argos/Dialogs/BusyIndicator', '../../Models/Names', 'argos/I18n', '../../PricingAvailabilityService', '../../Promote', '../../Utility'], function (module, exports, _declare, _lang, _Format, _Detail, _BusyIndicator, _Names, _I18n, _PricingAvailabilityService, _Promote, _Utility) {
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

  var resource = (0, _I18n2.default)('salesOrdersDetail');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.SalesOrders.Detail', [_Detail2.default], {
    // Localization
    titleText: resource.titleText,
    actionsText: resource.actionsText,
    relatedItemsText: resource.relatedItemsText,
    orderNumberText: resource.orderNumberText,
    orderIdText: resource.orderIdText,
    customerPOText: resource.customerPOText,
    accountText: resource.accountText,
    opportunityText: resource.opportunityText,
    dateCreatedText: resource.dateCreatedText,
    orderDateText: resource.orderDateText,
    dueDateText: resource.dueDateText,
    documentDateText: resource.documentDateText,
    statusText: resource.statusText,
    currencyCodeText: resource.currencyCodeText,
    subTotalText: resource.subTotalText,
    grandTotalText: resource.grandTotalText,
    baseSubTotalText: resource.baseSubTotalText,
    baseGrandTotalText: resource.baseGrandTotalText,
    billToText: resource.billToText,
    billToAddressText: resource.billToAddressText,
    shipToText: resource.shipToText,
    shipToAddressText: resource.shipToAddressText,
    payFromText: resource.payFromText,
    paymentMethodText: resource.paymentMethodText,
    paymentTermText: resource.paymentTermText,
    backOrderedText: resource.backOrderedText,
    dropShipAllowedText: resource.dropShipAllowedText,
    shipEarlyAllowedText: resource.shipEarlyAllowedText,
    invoiceImmediatelyText: resource.invoiceImmediatelyText,
    partialShipAllowedText: resource.partialShipAllowedText,
    taxExemptText: resource.taxExemptText,
    orderItemsText: resource.orderItemsText,
    attachmentsText: resource.attachmentsText,
    salesPersonsText: resource.salesPersonsText,
    invoiceItemsText: resource.invoiceItemsText,
    shipmentItemsText: resource.shipmentItemsText,
    entityText: resource.entityText,
    addLineItemsText: resource.addLineItemsText,
    quoteText: resource.quoteText,
    promoteOrderText: resource.promoteOrderText,
    syncStatusText: resource.syncStatusText,
    accountingEntityText: resource.accountingEntityText,
    backOfficeText: resource.backOfficeText,
    warehouseText: resource.warehouseText,
    locationText: resource.locationText,
    accountingEntityRequiredText: resource.accountingEntityRequiredText,
    requestedByText: resource.requestedByText,
    syncHistoryText: resource.syncHistoryText,
    carrierText: resource.carrierText,
    getOrderTotalText: resource.getOrderTotalText,
    erpStatusDateText: resource.erpStatusDateText,
    erpStatusText: resource.erpStatusText,
    refreshPricingText: resource.refreshPricingText,
    pricingUnavailableText: resource.pricingUnavailableText,

    // View Properties
    id: 'salesorder_detail',
    editView: 'salesorder_edit',
    resourceKind: 'salesOrders',
    modelName: _Names2.default.SALESORDER,
    enableOffline: true,
    _busyIndicator: null,
    locationType: '',

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
          $name: 'CanPromoteSalesOrder',
          request: {
            salesOrderId: _this.entry.$key
          }
        };
        var request = new Sage.SData.Client.SDataServiceOperationRequest(_this.getService()).setResourceKind('salesOrders').setContractName('dynamic').setOperationName('CanPromoteSalesOrder');

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
    addLineItems: function addLineItems() {
      var _this2 = this;

      if (!this.entry.ErpLogicalId) {
        App.modal.createSimpleDialog({
          title: 'alert',
          content: this.accountingEntityRequiredText,
          getContent: function getContent() {
            return;
          }
        }).then(function () {
          _this2.navigateToEditView();
        });
        return;
      }
      var view = App.getView('salesorder_item_edit');
      if (view) {
        var options = {
          insert: true,
          context: {
            SalesOrder: this.entry
          }
        };
        this.refreshRequired = true;
        view.show(options);
      }
    },
    handlePricingSuccess: function handlePricingSuccess(result) {
      this._refreshClicked();
      return result;
    },
    onGetOrderTotal: function onGetOrderTotal() {
      var _this3 = this;

      if (this.entry) {
        if (!this.options.context) {
          this.options.context = {
            SalesOrder: this.entry
          };
        } else {
          this.options.context.SalesOrder = this.entry;
        }
        _PricingAvailabilityService2.default.getOrderPricing(this.entry).then(function (result) {
          _this3.handlePricingSuccess(result);
        });
      }
    },
    onRePrice: function onRePrice() {
      var _this4 = this;

      if (this.entry) {
        if (this.isSalesOrderClosed()) {
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
            SalesOrder: this.entry
          };
        } else {
          this.options.context.SalesOrder = this.entry;
        }
        _PricingAvailabilityService2.default.salesOrderRePrice(this.entry).then(function (result) {
          _this4.handlePricingSuccess(result);
        });
      }
    },
    onPromoteOrder: function onPromoteOrder() {
      var _this5 = this;

      var canPromotePromise = this._canPromote();
      canPromotePromise.then(function (val) {
        _this5.hideBusy();
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
        promote.promoteToBackOffice(_this5.entry, 'SalesOrder', _this5);
      });
    },
    isSalesOrderClosed: function isSalesOrderClosed() {
      return this.entry.IsClosed;
    },
    processEntry: function processEntry() {
      this.inherited(processEntry, arguments);

      if (!App.hasAccessTo(this.editView)) {
        return;
      }

      if (this.isSalesOrderClosed()) {
        App.bars.tbar.disableTool('edit');
      } else {
        App.bars.tbar.enableTool('edit');
      }
    },
    hideBusy: function hideBusy() {
      this._busyIndicator.complete();
      App.modal.disableClose = false;
      App.modal.hide();
    },
    showBusy: function showBusy() {
      if (!this._busyIndicator || this._busyIndicator._destroyed) {
        this._busyIndicator = new _BusyIndicator2.default({
          id: this.id + '-busyIndicator'
        });
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
      var _this6 = this;

      return this.layout || (this.layout = [{
        title: this.actionsText,
        list: true,
        cls: 'action-list',
        name: 'QuickActionsSection',
        children: [{
          name: 'PromoteSalesOrder',
          property: 'SalesOrderNumber',
          label: this.promoteOrderText,
          iconClass: 'up-arrow',
          action: 'onPromoteOrder',
          security: 'Entities/SalesOrder/Promote'
        }, {
          name: 'GetOrderTotal',
          property: 'SalesOrderNumber',
          label: this.getOrderTotalText,
          iconClass: 'finance',
          action: 'onGetOrderTotal',
          security: 'Entities/SalesOrder/GetOrderTotal'
        }, {
          name: 'AddLineItems',
          property: 'SalesOrderNumber',
          label: this.addLineItemsText,
          iconClass: 'bullet-list',
          action: 'addLineItems',
          security: 'Entities/SalesOrder/Add',
          disabled: this.isSalesOrderClosed.bind(this)
        }, {
          name: 'RePrice',
          property: 'SalesOrderNumber',
          label: this.refreshPricingText,
          iconClass: 'finance',
          action: 'onRePrice',
          security: 'Entities/SalesOrder/Add'
        }]
      }, {
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          name: 'SalesOrderNumber',
          property: 'SalesOrderNumber',
          label: this.orderNumberText
        }, {
          name: 'ERPOrderID',
          property: 'ErpExtId',
          label: this.orderIdText
        }, {
          name: 'ErpDocumentDate',
          property: 'ErpDocumentDate',
          label: this.documentDateText,
          renderer: function renderer(data) {
            return _Format2.default.date(data);
          }
        }, {
          name: 'CustomerPurchaseOrderNumber',
          property: 'CustomerPurchaseOrderNumber',
          label: this.customerPOText
        }, {
          name: 'AccountName',
          property: 'Account.AccountName',
          label: this.accountText,
          descriptor: 'Account.AccountName',
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
          name: 'Quote',
          property: 'Quote.QuoteNumber',
          label: this.quoteText,
          view: 'quote_detail',
          key: 'Quote.$key'
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
          name: 'DueDate',
          property: 'DueDate',
          label: this.dueDateText,
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
          name: 'ERPStatus',
          property: 'ERPSalesOrder.ERPStatus',
          label: this.erpStatusText,
          renderer: this.formatPicklist('ERPSalesOrder.ERPStatus')
        }, {
          name: 'ErpStatusDate',
          property: 'ErpStatusDate',
          label: this.erpStatusDateText,
          renderer: function renderer(data) {
            return _Format2.default.date(data);
          }
        }, {
          name: 'CurrencyCode',
          property: 'CurrencyCode',
          label: this.currencyCodeText
        }, {
          name: 'SubTotal',
          property: 'OrderTotal',
          label: this.baseSubTotalText,
          renderer: function renderer(value) {
            return _Utility2.default.formatMultiCurrency(value, _this6.entry.BaseCurrencyCode);
          }
        }, {
          name: 'GrandTotal',
          property: 'GrandTotal',
          label: this.baseGrandTotalText,
          renderer: function renderer(value) {
            return _Utility2.default.formatMultiCurrency(value, _this6.entry.BaseCurrencyCode);
          }
        }, {
          name: 'DocSubTotal',
          property: 'DocOrderTotal',
          label: this.subTotalText,
          renderer: function renderer(value) {
            return _Utility2.default.formatMultiCurrency(value, _this6.entry.CurrencyCode);
          }
        }, {
          name: 'DocGrandTotal',
          property: 'DocGrandTotal',
          label: this.grandTotalText,
          renderer: function renderer(value) {
            return _Utility2.default.formatMultiCurrency(value, _this6.entry.CurrencyCode);
          }
        }, {
          name: 'CreateDate',
          property: 'CreateDate',
          label: this.dateCreatedText,
          renderer: function renderer(data) {
            return _Format2.default.date(data);
          }
        }, {
          name: 'OrderDate',
          property: 'OrderDate',
          label: this.orderDateText,
          renderer: function renderer(data) {
            return _Format2.default.date(data);
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
          name: 'ErpPaymentMethod',
          property: 'ErpPaymentMethod',
          label: this.paymentMethodText
        }, {
          name: 'ErpPaymentTermId',
          property: 'ErpPaymentTermId',
          label: this.paymentTermText
        }, {
          name: 'ErpBillTo',
          property: 'ErpBillTo.Name',
          label: this.billToText,
          view: 'erpbillto_detail',
          key: 'ErpBillTo.$key'
        }, {
          name: 'ErpBillToAddress',
          property: 'ErpBillTo.Address',
          label: this.billToAddressText,
          renderer: function renderer(data) {
            if (data) {
              return _Format2.default.address(data);
            }
          }
        }, {
          name: 'ErpShipTo',
          property: 'ErpShipTo.Name',
          label: this.shipToText,
          view: 'erpshipto_detail',
          key: 'ErpShipTo.$key'
        }, {
          name: 'ErpShipToAddress',
          property: 'ErpShipTo.Address',
          label: this.shipToAddressText,
          renderer: function renderer(data) {
            if (data) {
              return _Format2.default.address(data);
            }
          }
        }, {
          name: 'ErpBackOrdered',
          property: 'ErpBackOrdered',
          label: this.backOrderedText,
          renderer: function renderer(data) {
            return _Format2.default.yesNo(data);
          }
        }, {
          name: 'ErpDropShip',
          property: 'ErpDropShip',
          label: this.dropShipAllowedText,
          renderer: function renderer(data) {
            return _Format2.default.yesNo(data);
          }
        }, {
          name: 'ErpShipEarly',
          property: 'ErpShipEarly',
          label: this.shipEarlyAllowedText,
          renderer: function renderer(data) {
            return _Format2.default.yesNo(data);
          }
        }, {
          name: 'ErpInvoiceImmediately',
          property: 'ErpInvoiceImmediately',
          label: this.invoiceImmediatelyText,
          renderer: function renderer(data) {
            return _Format2.default.yesNo(data);
          }
        }, {
          name: 'ErpPartialShipAllowed',
          property: 'ErpPartialShipAllowed',
          label: this.partialShipAllowedText,
          renderer: function renderer(data) {
            return _Format2.default.yesNo(data);
          }
        }, {
          name: 'ErpTaxExempt',
          property: 'ErpTaxExempt',
          label: this.taxExemptText,
          renderer: function renderer(data) {
            return _Format2.default.yesNo(data);
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
          property: 'WarehouseLocation',
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
          name: 'ErpPayFrom',
          property: 'ErpPayFrom.Address',
          label: this.payFromText,
          renderer: function renderer(data) {
            if (data) {
              return _Format2.default.address(data);
            }
          }
        }]
      }, {
        title: this.relatedItemsText,
        list: true,
        name: 'RelatedItemsSection',
        children: [{
          name: 'OrderItems',
          label: this.orderItemsText,
          where: function where(entry) {
            return 'SalesOrder.Id eq "' + entry.$key + '"';
          },
          view: 'salesorder_items_related'
        }, {
          name: 'ERPInvoiceItemsRelated',
          label: this.invoiceItemsText,
          where: function where(entry) {
            return 'SalesOrder.Id eq "' + entry.$key + '"';
          },
          view: 'salesorder_invoice_items_related'
        }, {
          name: 'ERPShipmentItemsRelated',
          label: this.shipmentItemsText,
          where: function where(entry) {
            return 'SalesOrder.Id eq "' + entry.$key + '"';
          },
          view: 'salesorder_shipment_items_related'
        }, {
          name: 'Attachments',
          label: this.attachmentsText,
          where: function where(entry) {
            return 'salesOrderId eq "' + entry.$key + '"';
          },
          view: 'salesorder_attachments_related'
        }, {
          name: 'SyncHistory',
          label: this.syncHistoryText,
          where: function where(entry) {
            return 'EntityType eq "SalesOrder" and EntityId eq "' + entry.$key + '"';
          },
          view: 'order_syncresult_related'
        }, {
          name: 'SalesPersons',
          label: this.salesPersonsText,
          where: function where(entry) {
            return 'SalesOrder.Id eq "' + entry.$key + '"';
          },
          view: 'salesorder_salesperson_related'
        }]
      }]);
    }
  });

  _lang2.default.setObject('icboe.Views.SalesOrders.Detail', __class);
  exports.default = __class;
  module.exports = exports['default'];
});