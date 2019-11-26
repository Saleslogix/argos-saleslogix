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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL1NhbGVzT3JkZXJzL0RldGFpbC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJ0aXRsZVRleHQiLCJhY3Rpb25zVGV4dCIsInJlbGF0ZWRJdGVtc1RleHQiLCJvcmRlck51bWJlclRleHQiLCJvcmRlcklkVGV4dCIsImN1c3RvbWVyUE9UZXh0IiwiYWNjb3VudFRleHQiLCJvcHBvcnR1bml0eVRleHQiLCJkYXRlQ3JlYXRlZFRleHQiLCJvcmRlckRhdGVUZXh0IiwiZHVlRGF0ZVRleHQiLCJkb2N1bWVudERhdGVUZXh0Iiwic3RhdHVzVGV4dCIsImN1cnJlbmN5Q29kZVRleHQiLCJzdWJUb3RhbFRleHQiLCJncmFuZFRvdGFsVGV4dCIsImJhc2VTdWJUb3RhbFRleHQiLCJiYXNlR3JhbmRUb3RhbFRleHQiLCJiaWxsVG9UZXh0IiwiYmlsbFRvQWRkcmVzc1RleHQiLCJzaGlwVG9UZXh0Iiwic2hpcFRvQWRkcmVzc1RleHQiLCJwYXlGcm9tVGV4dCIsInBheW1lbnRNZXRob2RUZXh0IiwicGF5bWVudFRlcm1UZXh0IiwiYmFja09yZGVyZWRUZXh0IiwiZHJvcFNoaXBBbGxvd2VkVGV4dCIsInNoaXBFYXJseUFsbG93ZWRUZXh0IiwiaW52b2ljZUltbWVkaWF0ZWx5VGV4dCIsInBhcnRpYWxTaGlwQWxsb3dlZFRleHQiLCJ0YXhFeGVtcHRUZXh0Iiwib3JkZXJJdGVtc1RleHQiLCJhdHRhY2htZW50c1RleHQiLCJzYWxlc1BlcnNvbnNUZXh0IiwiaW52b2ljZUl0ZW1zVGV4dCIsInNoaXBtZW50SXRlbXNUZXh0IiwiZW50aXR5VGV4dCIsImFkZExpbmVJdGVtc1RleHQiLCJxdW90ZVRleHQiLCJwcm9tb3RlT3JkZXJUZXh0Iiwic3luY1N0YXR1c1RleHQiLCJhY2NvdW50aW5nRW50aXR5VGV4dCIsImJhY2tPZmZpY2VUZXh0Iiwid2FyZWhvdXNlVGV4dCIsImxvY2F0aW9uVGV4dCIsImFjY291bnRpbmdFbnRpdHlSZXF1aXJlZFRleHQiLCJyZXF1ZXN0ZWRCeVRleHQiLCJzeW5jSGlzdG9yeVRleHQiLCJjYXJyaWVyVGV4dCIsImdldE9yZGVyVG90YWxUZXh0IiwiZXJwU3RhdHVzRGF0ZVRleHQiLCJlcnBTdGF0dXNUZXh0IiwicmVmcmVzaFByaWNpbmdUZXh0IiwicHJpY2luZ1VuYXZhaWxhYmxlVGV4dCIsImlkIiwiZWRpdFZpZXciLCJyZXNvdXJjZUtpbmQiLCJtb2RlbE5hbWUiLCJTQUxFU09SREVSIiwiZW5hYmxlT2ZmbGluZSIsIl9idXN5SW5kaWNhdG9yIiwibG9jYXRpb25UeXBlIiwib25UcmFuc2l0aW9uVG8iLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJBcHAiLCJiYXJzIiwidGJhciIsImRpc2FibGVUb29sIiwiY29udGV4dCIsImludGVncmF0aW9uU2V0dGluZ3MiLCJfY2FuUHJvbW90ZSIsInByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInNob3dCdXN5IiwiZW50cnkiLCIkbmFtZSIsInJlcXVlc3QiLCJzYWxlc09yZGVySWQiLCIka2V5IiwiU2FnZSIsIlNEYXRhIiwiQ2xpZW50IiwiU0RhdGFTZXJ2aWNlT3BlcmF0aW9uUmVxdWVzdCIsImdldFNlcnZpY2UiLCJzZXRSZXNvdXJjZUtpbmQiLCJzZXRDb250cmFjdE5hbWUiLCJzZXRPcGVyYXRpb25OYW1lIiwiY2FuUHJvbW90ZSIsInZhbHVlIiwicmVzdWx0IiwiZXhlY3V0ZSIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsIlJlc3VsdCIsImZhaWx1cmUiLCJlcnIiLCJKU09OIiwicGFyc2UiLCJtZXNzYWdlIiwic2NvcGUiLCJhZGRMaW5lSXRlbXMiLCJFcnBMb2dpY2FsSWQiLCJtb2RhbCIsImNyZWF0ZVNpbXBsZURpYWxvZyIsInRpdGxlIiwiY29udGVudCIsImdldENvbnRlbnQiLCJ0aGVuIiwibmF2aWdhdGVUb0VkaXRWaWV3IiwidmlldyIsImdldFZpZXciLCJvcHRpb25zIiwiaW5zZXJ0IiwiU2FsZXNPcmRlciIsInJlZnJlc2hSZXF1aXJlZCIsInNob3ciLCJoYW5kbGVQcmljaW5nU3VjY2VzcyIsIl9yZWZyZXNoQ2xpY2tlZCIsIm9uR2V0T3JkZXJUb3RhbCIsImdldE9yZGVyUHJpY2luZyIsIm9uUmVQcmljZSIsImlzU2FsZXNPcmRlckNsb3NlZCIsInNhbGVzT3JkZXJSZVByaWNlIiwib25Qcm9tb3RlT3JkZXIiLCJjYW5Qcm9tb3RlUHJvbWlzZSIsInZhbCIsImhpZGVCdXN5IiwicHJvbW90ZSIsInByb21vdGVUb0JhY2tPZmZpY2UiLCJJc0Nsb3NlZCIsInByb2Nlc3NFbnRyeSIsImhhc0FjY2Vzc1RvIiwiZW5hYmxlVG9vbCIsImNvbXBsZXRlIiwiZGlzYWJsZUNsb3NlIiwiaGlkZSIsIl9kZXN0cm95ZWQiLCJzdGFydCIsInNob3dUb29sYmFyIiwiYWRkIiwiZm9ybWF0UGlja2xpc3QiLCJwcm9wZXJ0eSIsInBpY2tsaXN0IiwiYXBwIiwicGlja2xpc3RTZXJ2aWNlIiwiX21vZGVsIiwiY3JlYXRlTGF5b3V0IiwibGF5b3V0IiwibGlzdCIsImNscyIsIm5hbWUiLCJjaGlsZHJlbiIsImxhYmVsIiwiaWNvbkNsYXNzIiwiYWN0aW9uIiwic2VjdXJpdHkiLCJkaXNhYmxlZCIsImJpbmQiLCJkZXRhaWxzVGV4dCIsInJlbmRlcmVyIiwiZGF0YSIsImRhdGUiLCJkZXNjcmlwdG9yIiwia2V5IiwiZm9ybWF0TXVsdGlDdXJyZW5jeSIsIkJhc2VDdXJyZW5jeUNvZGUiLCJDdXJyZW5jeUNvZGUiLCJhZGRyZXNzIiwieWVzTm8iLCJBZGRyZXNzIiwiRnVsbEFkZHJlc3MiLCJEZXNjcmlwdGlvbiIsIndoZXJlIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxNQUFNQSxXQUFXLG9CQUFZLG1CQUFaLENBQWpCOztBQUVBLE1BQU1DLFVBQVUsdUJBQVEsK0NBQVIsRUFBeUQsa0JBQXpELEVB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QUFHRDZJLGlCQUFPLFNBQVNBLEtBQVQsQ0FBZWxHLEtBQWYsRUFBc0I7QUFDM0IsMENBQTRCQSxNQUFNSSxJQUFsQztBQUNELFdBTEE7QUFNRCtCLGdCQUFNO0FBTkwsU0FuQ087QUFKVCxPQXhUa0MsQ0FBOUIsQ0FBUDtBQXdXRDtBQWhsQmdGLEdBQW5FLENBQWhCOztBQW1sQkEsaUJBQUtnRSxTQUFMLENBQWUsZ0NBQWYsRUFBaURoTCxPQUFqRDtvQkFDZUEsTyIsImZpbGUiOiJEZXRhaWwuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJ2NybS9Gb3JtYXQnO1xyXG5pbXBvcnQgRGV0YWlsIGZyb20gJ2FyZ29zL0RldGFpbCc7XHJcbmltcG9ydCBCdXN5SW5kaWNhdG9yIGZyb20gJ2FyZ29zL0RpYWxvZ3MvQnVzeUluZGljYXRvcic7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi8uLi9Nb2RlbHMvTmFtZXMnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCBQcmljaW5nQXZhaWxhYmlsaXR5U2VydmljZSBmcm9tICcuLi8uLi9QcmljaW5nQXZhaWxhYmlsaXR5U2VydmljZSc7XHJcbmltcG9ydCBQcm9tb3RlIGZyb20gJy4uLy4uL1Byb21vdGUnO1xyXG5pbXBvcnQgdXRpbGl0eSBmcm9tICcuLi8uLi9VdGlsaXR5JztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3NhbGVzT3JkZXJzRGV0YWlsJyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuU2FsZXNPcmRlcnMuRGV0YWlsJywgW0RldGFpbF0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBhY3Rpb25zVGV4dDogcmVzb3VyY2UuYWN0aW9uc1RleHQsXHJcbiAgcmVsYXRlZEl0ZW1zVGV4dDogcmVzb3VyY2UucmVsYXRlZEl0ZW1zVGV4dCxcclxuICBvcmRlck51bWJlclRleHQ6IHJlc291cmNlLm9yZGVyTnVtYmVyVGV4dCxcclxuICBvcmRlcklkVGV4dDogcmVzb3VyY2Uub3JkZXJJZFRleHQsXHJcbiAgY3VzdG9tZXJQT1RleHQ6IHJlc291cmNlLmN1c3RvbWVyUE9UZXh0LFxyXG4gIGFjY291bnRUZXh0OiByZXNvdXJjZS5hY2NvdW50VGV4dCxcclxuICBvcHBvcnR1bml0eVRleHQ6IHJlc291cmNlLm9wcG9ydHVuaXR5VGV4dCxcclxuICBkYXRlQ3JlYXRlZFRleHQ6IHJlc291cmNlLmRhdGVDcmVhdGVkVGV4dCxcclxuICBvcmRlckRhdGVUZXh0OiByZXNvdXJjZS5vcmRlckRhdGVUZXh0LFxyXG4gIGR1ZURhdGVUZXh0OiByZXNvdXJjZS5kdWVEYXRlVGV4dCxcclxuICBkb2N1bWVudERhdGVUZXh0OiByZXNvdXJjZS5kb2N1bWVudERhdGVUZXh0LFxyXG4gIHN0YXR1c1RleHQ6IHJlc291cmNlLnN0YXR1c1RleHQsXHJcbiAgY3VycmVuY3lDb2RlVGV4dDogcmVzb3VyY2UuY3VycmVuY3lDb2RlVGV4dCxcclxuICBzdWJUb3RhbFRleHQ6IHJlc291cmNlLnN1YlRvdGFsVGV4dCxcclxuICBncmFuZFRvdGFsVGV4dDogcmVzb3VyY2UuZ3JhbmRUb3RhbFRleHQsXHJcbiAgYmFzZVN1YlRvdGFsVGV4dDogcmVzb3VyY2UuYmFzZVN1YlRvdGFsVGV4dCxcclxuICBiYXNlR3JhbmRUb3RhbFRleHQ6IHJlc291cmNlLmJhc2VHcmFuZFRvdGFsVGV4dCxcclxuICBiaWxsVG9UZXh0OiByZXNvdXJjZS5iaWxsVG9UZXh0LFxyXG4gIGJpbGxUb0FkZHJlc3NUZXh0OiByZXNvdXJjZS5iaWxsVG9BZGRyZXNzVGV4dCxcclxuICBzaGlwVG9UZXh0OiByZXNvdXJjZS5zaGlwVG9UZXh0LFxyXG4gIHNoaXBUb0FkZHJlc3NUZXh0OiByZXNvdXJjZS5zaGlwVG9BZGRyZXNzVGV4dCxcclxuICBwYXlGcm9tVGV4dDogcmVzb3VyY2UucGF5RnJvbVRleHQsXHJcbiAgcGF5bWVudE1ldGhvZFRleHQ6IHJlc291cmNlLnBheW1lbnRNZXRob2RUZXh0LFxyXG4gIHBheW1lbnRUZXJtVGV4dDogcmVzb3VyY2UucGF5bWVudFRlcm1UZXh0LFxyXG4gIGJhY2tPcmRlcmVkVGV4dDogcmVzb3VyY2UuYmFja09yZGVyZWRUZXh0LFxyXG4gIGRyb3BTaGlwQWxsb3dlZFRleHQ6IHJlc291cmNlLmRyb3BTaGlwQWxsb3dlZFRleHQsXHJcbiAgc2hpcEVhcmx5QWxsb3dlZFRleHQ6IHJlc291cmNlLnNoaXBFYXJseUFsbG93ZWRUZXh0LFxyXG4gIGludm9pY2VJbW1lZGlhdGVseVRleHQ6IHJlc291cmNlLmludm9pY2VJbW1lZGlhdGVseVRleHQsXHJcbiAgcGFydGlhbFNoaXBBbGxvd2VkVGV4dDogcmVzb3VyY2UucGFydGlhbFNoaXBBbGxvd2VkVGV4dCxcclxuICB0YXhFeGVtcHRUZXh0OiByZXNvdXJjZS50YXhFeGVtcHRUZXh0LFxyXG4gIG9yZGVySXRlbXNUZXh0OiByZXNvdXJjZS5vcmRlckl0ZW1zVGV4dCxcclxuICBhdHRhY2htZW50c1RleHQ6IHJlc291cmNlLmF0dGFjaG1lbnRzVGV4dCxcclxuICBzYWxlc1BlcnNvbnNUZXh0OiByZXNvdXJjZS5zYWxlc1BlcnNvbnNUZXh0LFxyXG4gIGludm9pY2VJdGVtc1RleHQ6IHJlc291cmNlLmludm9pY2VJdGVtc1RleHQsXHJcbiAgc2hpcG1lbnRJdGVtc1RleHQ6IHJlc291cmNlLnNoaXBtZW50SXRlbXNUZXh0LFxyXG4gIGVudGl0eVRleHQ6IHJlc291cmNlLmVudGl0eVRleHQsXHJcbiAgYWRkTGluZUl0ZW1zVGV4dDogcmVzb3VyY2UuYWRkTGluZUl0ZW1zVGV4dCxcclxuICBxdW90ZVRleHQ6IHJlc291cmNlLnF1b3RlVGV4dCxcclxuICBwcm9tb3RlT3JkZXJUZXh0OiByZXNvdXJjZS5wcm9tb3RlT3JkZXJUZXh0LFxyXG4gIHN5bmNTdGF0dXNUZXh0OiByZXNvdXJjZS5zeW5jU3RhdHVzVGV4dCxcclxuICBhY2NvdW50aW5nRW50aXR5VGV4dDogcmVzb3VyY2UuYWNjb3VudGluZ0VudGl0eVRleHQsXHJcbiAgYmFja09mZmljZVRleHQ6IHJlc291cmNlLmJhY2tPZmZpY2VUZXh0LFxyXG4gIHdhcmVob3VzZVRleHQ6IHJlc291cmNlLndhcmVob3VzZVRleHQsXHJcbiAgbG9jYXRpb25UZXh0OiByZXNvdXJjZS5sb2NhdGlvblRleHQsXHJcbiAgYWNjb3VudGluZ0VudGl0eVJlcXVpcmVkVGV4dDogcmVzb3VyY2UuYWNjb3VudGluZ0VudGl0eVJlcXVpcmVkVGV4dCxcclxuICByZXF1ZXN0ZWRCeVRleHQ6IHJlc291cmNlLnJlcXVlc3RlZEJ5VGV4dCxcclxuICBzeW5jSGlzdG9yeVRleHQ6IHJlc291cmNlLnN5bmNIaXN0b3J5VGV4dCxcclxuICBjYXJyaWVyVGV4dDogcmVzb3VyY2UuY2FycmllclRleHQsXHJcbiAgZ2V0T3JkZXJUb3RhbFRleHQ6IHJlc291cmNlLmdldE9yZGVyVG90YWxUZXh0LFxyXG4gIGVycFN0YXR1c0RhdGVUZXh0OiByZXNvdXJjZS5lcnBTdGF0dXNEYXRlVGV4dCxcclxuICBlcnBTdGF0dXNUZXh0OiByZXNvdXJjZS5lcnBTdGF0dXNUZXh0LFxyXG4gIHJlZnJlc2hQcmljaW5nVGV4dDogcmVzb3VyY2UucmVmcmVzaFByaWNpbmdUZXh0LFxyXG4gIHByaWNpbmdVbmF2YWlsYWJsZVRleHQ6IHJlc291cmNlLnByaWNpbmdVbmF2YWlsYWJsZVRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnc2FsZXNvcmRlcl9kZXRhaWwnLFxyXG4gIGVkaXRWaWV3OiAnc2FsZXNvcmRlcl9lZGl0JyxcclxuICByZXNvdXJjZUtpbmQ6ICdzYWxlc09yZGVycycsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5TQUxFU09SREVSLFxyXG4gIGVuYWJsZU9mZmxpbmU6IHRydWUsXHJcbiAgX2J1c3lJbmRpY2F0b3I6IG51bGwsXHJcbiAgbG9jYXRpb25UeXBlOiAnJyxcclxuXHJcbiAgb25UcmFuc2l0aW9uVG86IGZ1bmN0aW9uIG9uVHJhbnNpdGlvblRvKCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQob25UcmFuc2l0aW9uVG8sIGFyZ3VtZW50cyk7XHJcbiAgICBBcHAuYmFycy50YmFyLmRpc2FibGVUb29sKCdlZGl0Jyk7XHJcbiAgICBpZiAoIXRoaXMubG9jYXRpb25UeXBlKSB7XHJcbiAgICAgIHRoaXMubG9jYXRpb25UeXBlID0gQXBwLmNvbnRleHQuaW50ZWdyYXRpb25TZXR0aW5ncyAmJiBBcHAuY29udGV4dC5pbnRlZ3JhdGlvblNldHRpbmdzWydCYWNrIE9mZmljZSBFeHRlbnNpb24nXSAmJlxyXG4gICAgICAgIEFwcC5jb250ZXh0LmludGVncmF0aW9uU2V0dGluZ3NbJ0JhY2sgT2ZmaWNlIEV4dGVuc2lvbiddWydUeXBlIG9mIE9yZGVyIExvY2F0aW9uJ10gfHwgJyc7XHJcbiAgICB9XHJcbiAgfSxcclxuICBfY2FuUHJvbW90ZTogZnVuY3Rpb24gX2NhblByb21vdGUoKSB7XHJcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoXHJcbiAgICAgIChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zaG93QnVzeSgpO1xyXG4gICAgICAgIGNvbnN0IGVudHJ5ID0ge1xyXG4gICAgICAgICAgJG5hbWU6ICdDYW5Qcm9tb3RlU2FsZXNPcmRlcicsXHJcbiAgICAgICAgICByZXF1ZXN0OiB7XHJcbiAgICAgICAgICAgIHNhbGVzT3JkZXJJZDogdGhpcy5lbnRyeS4ka2V5LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgU2FnZS5TRGF0YS5DbGllbnQuU0RhdGFTZXJ2aWNlT3BlcmF0aW9uUmVxdWVzdCh0aGlzLmdldFNlcnZpY2UoKSlcclxuICAgICAgICAgIC5zZXRSZXNvdXJjZUtpbmQoJ3NhbGVzT3JkZXJzJylcclxuICAgICAgICAgIC5zZXRDb250cmFjdE5hbWUoJ2R5bmFtaWMnKVxyXG4gICAgICAgICAgLnNldE9wZXJhdGlvbk5hbWUoJ0NhblByb21vdGVTYWxlc09yZGVyJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNhblByb21vdGUgPSB7XHJcbiAgICAgICAgICB2YWx1ZTogZmFsc2UsXHJcbiAgICAgICAgICByZXN1bHQ6ICcnLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJlcXVlc3QuZXhlY3V0ZShlbnRyeSwge1xyXG4gICAgICAgICAgc3VjY2VzczogKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICBjYW5Qcm9tb3RlLnZhbHVlID0gcmVzdWx0LnJlc3BvbnNlLlJlc3VsdDtcclxuICAgICAgICAgICAgcmVzb2x2ZShjYW5Qcm9tb3RlKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBmYWlsdXJlOiAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gSlNPTi5wYXJzZShlcnIucmVzcG9uc2UpWzBdO1xyXG4gICAgICAgICAgICBjYW5Qcm9tb3RlLnJlc3VsdCA9IHJlc3BvbnNlLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgIHJlc29sdmUoY2FuUHJvbW90ZSk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgc2NvcGU6IHRoaXMsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfSxcclxuICBhZGRMaW5lSXRlbXM6IGZ1bmN0aW9uIGFkZExpbmVJdGVtcygpIHtcclxuICAgIGlmICghdGhpcy5lbnRyeS5FcnBMb2dpY2FsSWQpIHtcclxuICAgICAgQXBwLm1vZGFsLmNyZWF0ZVNpbXBsZURpYWxvZyh7XHJcbiAgICAgICAgdGl0bGU6ICdhbGVydCcsXHJcbiAgICAgICAgY29udGVudDogdGhpcy5hY2NvdW50aW5nRW50aXR5UmVxdWlyZWRUZXh0LFxyXG4gICAgICAgIGdldENvbnRlbnQ6ICgpID0+IHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9LFxyXG4gICAgICB9KVxyXG4gICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMubmF2aWdhdGVUb0VkaXRWaWV3KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldygnc2FsZXNvcmRlcl9pdGVtX2VkaXQnKTtcclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgaW5zZXJ0OiB0cnVlLFxyXG4gICAgICAgIGNvbnRleHQ6IHtcclxuICAgICAgICAgIFNhbGVzT3JkZXI6IHRoaXMuZW50cnksXHJcbiAgICAgICAgfSxcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgICB2aWV3LnNob3cob3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBoYW5kbGVQcmljaW5nU3VjY2VzczogZnVuY3Rpb24gaGFuZGxlUHJpY2luZ1N1Y2Nlc3MocmVzdWx0KSB7XHJcbiAgICB0aGlzLl9yZWZyZXNoQ2xpY2tlZCgpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9LFxyXG4gIG9uR2V0T3JkZXJUb3RhbDogZnVuY3Rpb24gb25HZXRPcmRlclRvdGFsKCkge1xyXG4gICAgaWYgKHRoaXMuZW50cnkpIHtcclxuICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuY29udGV4dCkge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5jb250ZXh0ID0ge1xyXG4gICAgICAgICAgU2FsZXNPcmRlcjogdGhpcy5lbnRyeSxcclxuICAgICAgICB9O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5jb250ZXh0LlNhbGVzT3JkZXIgPSB0aGlzLmVudHJ5O1xyXG4gICAgICB9XHJcbiAgICAgIFByaWNpbmdBdmFpbGFiaWxpdHlTZXJ2aWNlLmdldE9yZGVyUHJpY2luZyh0aGlzLmVudHJ5KVxyXG4gICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgIHRoaXMuaGFuZGxlUHJpY2luZ1N1Y2Nlc3MocmVzdWx0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uUmVQcmljZTogZnVuY3Rpb24gb25SZVByaWNlKCkge1xyXG4gICAgaWYgKHRoaXMuZW50cnkpIHtcclxuICAgICAgaWYgKHRoaXMuaXNTYWxlc09yZGVyQ2xvc2VkKCkpIHtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgdGl0bGU6ICdhbGVydCcsXHJcbiAgICAgICAgICBjb250ZW50OiB0aGlzLnByaWNpbmdVbmF2YWlsYWJsZVRleHQsXHJcbiAgICAgICAgICBnZXRDb250ZW50OiBudWxsLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgQXBwLm1vZGFsLmNyZWF0ZVNpbXBsZURpYWxvZyhvcHRpb25zKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuY29udGV4dCkge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5jb250ZXh0ID0ge1xyXG4gICAgICAgICAgU2FsZXNPcmRlcjogdGhpcy5lbnRyeSxcclxuICAgICAgICB9O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5jb250ZXh0LlNhbGVzT3JkZXIgPSB0aGlzLmVudHJ5O1xyXG4gICAgICB9XHJcbiAgICAgIFByaWNpbmdBdmFpbGFiaWxpdHlTZXJ2aWNlLnNhbGVzT3JkZXJSZVByaWNlKHRoaXMuZW50cnkpXHJcbiAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5oYW5kbGVQcmljaW5nU3VjY2VzcyhyZXN1bHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25Qcm9tb3RlT3JkZXI6IGZ1bmN0aW9uIG9uUHJvbW90ZU9yZGVyKCkge1xyXG4gICAgY29uc3QgY2FuUHJvbW90ZVByb21pc2UgPSB0aGlzLl9jYW5Qcm9tb3RlKCk7XHJcbiAgICBjYW5Qcm9tb3RlUHJvbWlzZS50aGVuKCh2YWwpID0+IHtcclxuICAgICAgdGhpcy5oaWRlQnVzeSgpO1xyXG4gICAgICBpZiAoIXZhbC52YWx1ZSkge1xyXG4gICAgICAgIEFwcC5tb2RhbC5jcmVhdGVTaW1wbGVEaWFsb2coe1xyXG4gICAgICAgICAgdGl0bGU6ICdhbGVydCcsXHJcbiAgICAgICAgICBjb250ZW50OiB2YWwucmVzdWx0LFxyXG4gICAgICAgICAgZ2V0Q29udGVudDogKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBwcm9tb3RlID0gbmV3IFByb21vdGUoKTtcclxuICAgICAgcHJvbW90ZS5wcm9tb3RlVG9CYWNrT2ZmaWNlKHRoaXMuZW50cnksICdTYWxlc09yZGVyJywgdGhpcyk7XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGlzU2FsZXNPcmRlckNsb3NlZDogZnVuY3Rpb24gaXNTYWxlc09yZGVyQ2xvc2VkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZW50cnkuSXNDbG9zZWQ7XHJcbiAgfSxcclxuICBwcm9jZXNzRW50cnk6IGZ1bmN0aW9uIHByb2Nlc3NFbnRyeSgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKHByb2Nlc3NFbnRyeSwgYXJndW1lbnRzKTtcclxuXHJcbiAgICBpZiAoIUFwcC5oYXNBY2Nlc3NUbyh0aGlzLmVkaXRWaWV3KSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuaXNTYWxlc09yZGVyQ2xvc2VkKCkpIHtcclxuICAgICAgQXBwLmJhcnMudGJhci5kaXNhYmxlVG9vbCgnZWRpdCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgQXBwLmJhcnMudGJhci5lbmFibGVUb29sKCdlZGl0Jyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBoaWRlQnVzeTogZnVuY3Rpb24gaGlkZUJ1c3koKSB7XHJcbiAgICB0aGlzLl9idXN5SW5kaWNhdG9yLmNvbXBsZXRlKCk7XHJcbiAgICBBcHAubW9kYWwuZGlzYWJsZUNsb3NlID0gZmFsc2U7XHJcbiAgICBBcHAubW9kYWwuaGlkZSgpO1xyXG4gIH0sXHJcbiAgc2hvd0J1c3k6IGZ1bmN0aW9uIHNob3dCdXN5KCkge1xyXG4gICAgaWYgKCF0aGlzLl9idXN5SW5kaWNhdG9yIHx8IHRoaXMuX2J1c3lJbmRpY2F0b3IuX2Rlc3Ryb3llZCkge1xyXG4gICAgICB0aGlzLl9idXN5SW5kaWNhdG9yID0gbmV3IEJ1c3lJbmRpY2F0b3Ioe1xyXG4gICAgICAgIGlkOiBgJHt0aGlzLmlkfS1idXN5SW5kaWNhdG9yYCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9idXN5SW5kaWNhdG9yLnN0YXJ0KCk7XHJcbiAgICBBcHAubW9kYWwuZGlzYWJsZUNsb3NlID0gdHJ1ZTtcclxuICAgIEFwcC5tb2RhbC5zaG93VG9vbGJhciA9IGZhbHNlO1xyXG4gICAgQXBwLm1vZGFsLmFkZCh0aGlzLl9idXN5SW5kaWNhdG9yKTtcclxuICB9LFxyXG4gIGZvcm1hdFBpY2tsaXN0OiBmdW5jdGlvbiBmb3JtYXRQaWNrbGlzdChwcm9wZXJ0eSkge1xyXG4gICAgcmV0dXJuIGZvcm1hdC5waWNrbGlzdCh0aGlzLmFwcC5waWNrbGlzdFNlcnZpY2UsIHRoaXMuX21vZGVsLCBwcm9wZXJ0eSk7XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICB0aXRsZTogdGhpcy5hY3Rpb25zVGV4dCxcclxuICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgY2xzOiAnYWN0aW9uLWxpc3QnLFxyXG4gICAgICBuYW1lOiAnUXVpY2tBY3Rpb25zU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIG5hbWU6ICdQcm9tb3RlU2FsZXNPcmRlcicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTYWxlc09yZGVyTnVtYmVyJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5wcm9tb3RlT3JkZXJUZXh0LFxyXG4gICAgICAgIGljb25DbGFzczogJ3VwLWFycm93JyxcclxuICAgICAgICBhY3Rpb246ICdvblByb21vdGVPcmRlcicsXHJcbiAgICAgICAgc2VjdXJpdHk6ICdFbnRpdGllcy9TYWxlc09yZGVyL1Byb21vdGUnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0dldE9yZGVyVG90YWwnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU2FsZXNPcmRlck51bWJlcicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZ2V0T3JkZXJUb3RhbFRleHQsXHJcbiAgICAgICAgaWNvbkNsYXNzOiAnZmluYW5jZScsXHJcbiAgICAgICAgYWN0aW9uOiAnb25HZXRPcmRlclRvdGFsJyxcclxuICAgICAgICBzZWN1cml0eTogJ0VudGl0aWVzL1NhbGVzT3JkZXIvR2V0T3JkZXJUb3RhbCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQWRkTGluZUl0ZW1zJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1NhbGVzT3JkZXJOdW1iZXInLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFkZExpbmVJdGVtc1RleHQsXHJcbiAgICAgICAgaWNvbkNsYXNzOiAnYnVsbGV0LWxpc3QnLFxyXG4gICAgICAgIGFjdGlvbjogJ2FkZExpbmVJdGVtcycsXHJcbiAgICAgICAgc2VjdXJpdHk6ICdFbnRpdGllcy9TYWxlc09yZGVyL0FkZCcsXHJcbiAgICAgICAgZGlzYWJsZWQ6IHRoaXMuaXNTYWxlc09yZGVyQ2xvc2VkLmJpbmQodGhpcyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnUmVQcmljZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTYWxlc09yZGVyTnVtYmVyJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5yZWZyZXNoUHJpY2luZ1RleHQsXHJcbiAgICAgICAgaWNvbkNsYXNzOiAnZmluYW5jZScsXHJcbiAgICAgICAgYWN0aW9uOiAnb25SZVByaWNlJyxcclxuICAgICAgICBzZWN1cml0eTogJ0VudGl0aWVzL1NhbGVzT3JkZXIvQWRkJyxcclxuICAgICAgfV0sXHJcbiAgICB9LCB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmRldGFpbHNUZXh0LFxyXG4gICAgICBuYW1lOiAnRGV0YWlsc1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBuYW1lOiAnU2FsZXNPcmRlck51bWJlcicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTYWxlc09yZGVyTnVtYmVyJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5vcmRlck51bWJlclRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRVJQT3JkZXJJRCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBFeHRJZCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMub3JkZXJJZFRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwRG9jdW1lbnREYXRlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycERvY3VtZW50RGF0ZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZG9jdW1lbnREYXRlVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIoZGF0YSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdC5kYXRlKGRhdGEpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQ3VzdG9tZXJQdXJjaGFzZU9yZGVyTnVtYmVyJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0N1c3RvbWVyUHVyY2hhc2VPcmRlck51bWJlcicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuY3VzdG9tZXJQT1RleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQWNjb3VudC5BY2NvdW50TmFtZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWNjb3VudFRleHQsXHJcbiAgICAgICAgZGVzY3JpcHRvcjogJ0FjY291bnQuQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIHZpZXc6ICdhY2NvdW50X2RldGFpbCcsXHJcbiAgICAgICAga2V5OiAnQWNjb3VudC4ka2V5JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdSZXF1ZXN0ZWRCeScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdSZXF1ZXN0ZWRCeS5OYW1lTEYnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJlcXVlc3RlZEJ5VGV4dCxcclxuICAgICAgICB2aWV3OiAnY29udGFjdF9kZXRhaWwnLFxyXG4gICAgICAgIGtleTogJ1JlcXVlc3RlZEJ5LiRrZXknLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ09wcG9ydHVuaXR5JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ09wcG9ydHVuaXR5LkRlc2NyaXB0aW9uJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5vcHBvcnR1bml0eVRleHQsXHJcbiAgICAgICAgdmlldzogJ29wcG9ydHVuaXR5X2RldGFpbCcsXHJcbiAgICAgICAga2V5OiAnT3Bwb3J0dW5pdHkuJGtleScsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnUXVvdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUXVvdGUuUXVvdGVOdW1iZXInLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnF1b3RlVGV4dCxcclxuICAgICAgICB2aWV3OiAncXVvdGVfZGV0YWlsJyxcclxuICAgICAgICBrZXk6ICdRdW90ZS4ka2V5JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdCYWNrT2ZmaWNlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycExvZ2ljYWxJZCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYmFja09mZmljZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKHZhbCkge1xyXG4gICAgICAgICAgaWYgKHZhbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwQWNjb3VudGluZ0VudGl0eUlkJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycEFjY291bnRpbmdFbnRpdHlJZCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWNjb3VudGluZ0VudGl0eVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKHZhbCkge1xyXG4gICAgICAgICAgaWYgKHZhbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRHVlRGF0ZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdEdWVEYXRlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5kdWVEYXRlVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIoZGF0YSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdC5kYXRlKGRhdGEpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnU3RhdHVzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1N0YXR1cycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc3RhdHVzVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIodmFsKSB7XHJcbiAgICAgICAgICBpZiAodmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTeW5jU3RhdHVzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1N5bmNTdGF0dXMnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnN5bmNTdGF0dXNUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiB0aGlzLmZvcm1hdFBpY2tsaXN0KCdTeW5jU3RhdHVzJyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRVJQU3RhdHVzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VSUFNhbGVzT3JkZXIuRVJQU3RhdHVzJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5lcnBTdGF0dXNUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiB0aGlzLmZvcm1hdFBpY2tsaXN0KCdFUlBTYWxlc09yZGVyLkVSUFN0YXR1cycpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VycFN0YXR1c0RhdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwU3RhdHVzRGF0ZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZXJwU3RhdHVzRGF0ZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQuZGF0ZShkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0N1cnJlbmN5Q29kZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDdXJyZW5jeUNvZGUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmN1cnJlbmN5Q29kZVRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnU3ViVG90YWwnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnT3JkZXJUb3RhbCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYmFzZVN1YlRvdGFsVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdXRpbGl0eS5mb3JtYXRNdWx0aUN1cnJlbmN5KHZhbHVlLCB0aGlzLmVudHJ5LkJhc2VDdXJyZW5jeUNvZGUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnR3JhbmRUb3RhbCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdHcmFuZFRvdGFsJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5iYXNlR3JhbmRUb3RhbFRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHV0aWxpdHkuZm9ybWF0TXVsdGlDdXJyZW5jeSh2YWx1ZSwgdGhpcy5lbnRyeS5CYXNlQ3VycmVuY3lDb2RlKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0RvY1N1YlRvdGFsJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0RvY09yZGVyVG90YWwnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnN1YlRvdGFsVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdXRpbGl0eS5mb3JtYXRNdWx0aUN1cnJlbmN5KHZhbHVlLCB0aGlzLmVudHJ5LkN1cnJlbmN5Q29kZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdEb2NHcmFuZFRvdGFsJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0RvY0dyYW5kVG90YWwnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmdyYW5kVG90YWxUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiAodmFsdWUpID0+IHtcclxuICAgICAgICAgIHJldHVybiB1dGlsaXR5LmZvcm1hdE11bHRpQ3VycmVuY3kodmFsdWUsIHRoaXMuZW50cnkuQ3VycmVuY3lDb2RlKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0NyZWF0ZURhdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ3JlYXRlRGF0ZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZGF0ZUNyZWF0ZWRUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0LmRhdGUoZGF0YSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdPcmRlckRhdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnT3JkZXJEYXRlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5vcmRlckRhdGVUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0LmRhdGUoZGF0YSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdDYXJyaWVyJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0NhcnJpZXIuQ2Fycmllck5hbWUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmNhcnJpZXJUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VycFBheW1lbnRNZXRob2QnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwUGF5bWVudE1ldGhvZCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucGF5bWVudE1ldGhvZFRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwUGF5bWVudFRlcm1JZCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBQYXltZW50VGVybUlkJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5wYXltZW50VGVybVRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwQmlsbFRvJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycEJpbGxUby5OYW1lJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5iaWxsVG9UZXh0LFxyXG4gICAgICAgIHZpZXc6ICdlcnBiaWxsdG9fZGV0YWlsJyxcclxuICAgICAgICBrZXk6ICdFcnBCaWxsVG8uJGtleScsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwQmlsbFRvQWRkcmVzcycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBCaWxsVG8uQWRkcmVzcycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYmlsbFRvQWRkcmVzc1RleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXQuYWRkcmVzcyhkYXRhKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VycFNoaXBUbycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBTaGlwVG8uTmFtZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc2hpcFRvVGV4dCxcclxuICAgICAgICB2aWV3OiAnZXJwc2hpcHRvX2RldGFpbCcsXHJcbiAgICAgICAga2V5OiAnRXJwU2hpcFRvLiRrZXknLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VycFNoaXBUb0FkZHJlc3MnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwU2hpcFRvLkFkZHJlc3MnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnNoaXBUb0FkZHJlc3NUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0LmFkZHJlc3MoZGF0YSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFcnBCYWNrT3JkZXJlZCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBCYWNrT3JkZXJlZCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYmFja09yZGVyZWRUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0Lnllc05vKGRhdGEpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwRHJvcFNoaXAnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwRHJvcFNoaXAnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmRyb3BTaGlwQWxsb3dlZFRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQueWVzTm8oZGF0YSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFcnBTaGlwRWFybHknLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwU2hpcEVhcmx5JyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zaGlwRWFybHlBbGxvd2VkVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIoZGF0YSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdC55ZXNObyhkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VycEludm9pY2VJbW1lZGlhdGVseScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBJbnZvaWNlSW1tZWRpYXRlbHknLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmludm9pY2VJbW1lZGlhdGVseVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQueWVzTm8oZGF0YSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFcnBQYXJ0aWFsU2hpcEFsbG93ZWQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwUGFydGlhbFNoaXBBbGxvd2VkJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5wYXJ0aWFsU2hpcEFsbG93ZWRUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0Lnllc05vKGRhdGEpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwVGF4RXhlbXB0JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFRheEV4ZW1wdCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMudGF4RXhlbXB0VGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIoZGF0YSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdC55ZXNObyhkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0xvY2F0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0xvY2F0aW9uJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5sb2NhdGlvblRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIGlmICh0aGlzLmxvY2F0aW9uVHlwZSA9PT0gJ1dhcmVob3VzZScpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuQWRkcmVzcyAmJiBkYXRhLkFkZHJlc3MuRnVsbEFkZHJlc3MpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0LmFkZHJlc3MoZGF0YS5BZGRyZXNzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YS5EZXNjcmlwdGlvbjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1dhcmVob3VzZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdXYXJlaG91c2VMb2NhdGlvbicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMud2FyZWhvdXNlVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIoZGF0YSkge1xyXG4gICAgICAgICAgaWYgKHRoaXMubG9jYXRpb25UeXBlICYmIHRoaXMubG9jYXRpb25UeXBlICE9PSAnV2FyZWhvdXNlJykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5BZGRyZXNzICYmIGRhdGEuQWRkcmVzcy5GdWxsQWRkcmVzcykge1xyXG4gICAgICAgICAgICAgIHJldHVybiBmb3JtYXQuYWRkcmVzcyhkYXRhLkFkZHJlc3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhLkRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwUGF5RnJvbScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBQYXlGcm9tLkFkZHJlc3MnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnBheUZyb21UZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0LmFkZHJlc3MoZGF0YSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgfV0sXHJcbiAgICB9LCB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLnJlbGF0ZWRJdGVtc1RleHQsXHJcbiAgICAgIGxpc3Q6IHRydWUsXHJcbiAgICAgIG5hbWU6ICdSZWxhdGVkSXRlbXNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbmFtZTogJ09yZGVySXRlbXMnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLm9yZGVySXRlbXNUZXh0LFxyXG4gICAgICAgIHdoZXJlOiBmdW5jdGlvbiB3aGVyZShlbnRyeSkge1xyXG4gICAgICAgICAgcmV0dXJuIGBTYWxlc09yZGVyLklkIGVxIFwiJHtlbnRyeS4ka2V5fVwiYDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHZpZXc6ICdzYWxlc29yZGVyX2l0ZW1zX3JlbGF0ZWQnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VSUEludm9pY2VJdGVtc1JlbGF0ZWQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmludm9pY2VJdGVtc1RleHQsXHJcbiAgICAgICAgd2hlcmU6IGZ1bmN0aW9uIHdoZXJlKGVudHJ5KSB7XHJcbiAgICAgICAgICByZXR1cm4gYFNhbGVzT3JkZXIuSWQgZXEgXCIke2VudHJ5LiRrZXl9XCJgO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdmlldzogJ3NhbGVzb3JkZXJfaW52b2ljZV9pdGVtc19yZWxhdGVkJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFUlBTaGlwbWVudEl0ZW1zUmVsYXRlZCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc2hpcG1lbnRJdGVtc1RleHQsXHJcbiAgICAgICAgd2hlcmU6IGZ1bmN0aW9uIHdoZXJlKGVudHJ5KSB7XHJcbiAgICAgICAgICByZXR1cm4gYFNhbGVzT3JkZXIuSWQgZXEgXCIke2VudHJ5LiRrZXl9XCJgO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdmlldzogJ3NhbGVzb3JkZXJfc2hpcG1lbnRfaXRlbXNfcmVsYXRlZCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQXR0YWNobWVudHMnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmF0dGFjaG1lbnRzVGV4dCxcclxuICAgICAgICB3aGVyZTogZnVuY3Rpb24gd2hlcmUoZW50cnkpIHtcclxuICAgICAgICAgIHJldHVybiBgc2FsZXNPcmRlcklkIGVxIFwiJHtlbnRyeS4ka2V5fVwiYDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHZpZXc6ICdzYWxlc29yZGVyX2F0dGFjaG1lbnRzX3JlbGF0ZWQnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1N5bmNIaXN0b3J5JyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zeW5jSGlzdG9yeVRleHQsXHJcbiAgICAgICAgd2hlcmU6IChlbnRyeSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGBFbnRpdHlUeXBlIGVxIFwiU2FsZXNPcmRlclwiIGFuZCBFbnRpdHlJZCBlcSBcIiR7ZW50cnkuJGtleX1cImA7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB2aWV3OiAnb3JkZXJfc3luY3Jlc3VsdF9yZWxhdGVkJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTYWxlc1BlcnNvbnMnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnNhbGVzUGVyc29uc1RleHQsXHJcbiAgICAgICAgd2hlcmU6IGZ1bmN0aW9uIHdoZXJlKGVudHJ5KSB7XHJcbiAgICAgICAgICByZXR1cm4gYFNhbGVzT3JkZXIuSWQgZXEgXCIke2VudHJ5LiRrZXl9XCJgO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdmlldzogJ3NhbGVzb3JkZXJfc2FsZXNwZXJzb25fcmVsYXRlZCcsXHJcbiAgICAgIH1dLFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLlZpZXdzLlNhbGVzT3JkZXJzLkRldGFpbCcsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=