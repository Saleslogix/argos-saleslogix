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
      this.inherited(arguments);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL1NhbGVzT3JkZXJzL0RldGFpbC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJ0aXRsZVRleHQiLCJhY3Rpb25zVGV4dCIsInJlbGF0ZWRJdGVtc1RleHQiLCJvcmRlck51bWJlclRleHQiLCJvcmRlcklkVGV4dCIsImN1c3RvbWVyUE9UZXh0IiwiYWNjb3VudFRleHQiLCJvcHBvcnR1bml0eVRleHQiLCJkYXRlQ3JlYXRlZFRleHQiLCJvcmRlckRhdGVUZXh0IiwiZHVlRGF0ZVRleHQiLCJkb2N1bWVudERhdGVUZXh0Iiwic3RhdHVzVGV4dCIsImN1cnJlbmN5Q29kZVRleHQiLCJzdWJUb3RhbFRleHQiLCJncmFuZFRvdGFsVGV4dCIsImJhc2VTdWJUb3RhbFRleHQiLCJiYXNlR3JhbmRUb3RhbFRleHQiLCJiaWxsVG9UZXh0IiwiYmlsbFRvQWRkcmVzc1RleHQiLCJzaGlwVG9UZXh0Iiwic2hpcFRvQWRkcmVzc1RleHQiLCJwYXlGcm9tVGV4dCIsInBheW1lbnRNZXRob2RUZXh0IiwicGF5bWVudFRlcm1UZXh0IiwiYmFja09yZGVyZWRUZXh0IiwiZHJvcFNoaXBBbGxvd2VkVGV4dCIsInNoaXBFYXJseUFsbG93ZWRUZXh0IiwiaW52b2ljZUltbWVkaWF0ZWx5VGV4dCIsInBhcnRpYWxTaGlwQWxsb3dlZFRleHQiLCJ0YXhFeGVtcHRUZXh0Iiwib3JkZXJJdGVtc1RleHQiLCJhdHRhY2htZW50c1RleHQiLCJzYWxlc1BlcnNvbnNUZXh0IiwiaW52b2ljZUl0ZW1zVGV4dCIsInNoaXBtZW50SXRlbXNUZXh0IiwiZW50aXR5VGV4dCIsImFkZExpbmVJdGVtc1RleHQiLCJxdW90ZVRleHQiLCJwcm9tb3RlT3JkZXJUZXh0Iiwic3luY1N0YXR1c1RleHQiLCJhY2NvdW50aW5nRW50aXR5VGV4dCIsImJhY2tPZmZpY2VUZXh0Iiwid2FyZWhvdXNlVGV4dCIsImxvY2F0aW9uVGV4dCIsImFjY291bnRpbmdFbnRpdHlSZXF1aXJlZFRleHQiLCJyZXF1ZXN0ZWRCeVRleHQiLCJzeW5jSGlzdG9yeVRleHQiLCJjYXJyaWVyVGV4dCIsImdldE9yZGVyVG90YWxUZXh0IiwiZXJwU3RhdHVzRGF0ZVRleHQiLCJlcnBTdGF0dXNUZXh0IiwicmVmcmVzaFByaWNpbmdUZXh0IiwicHJpY2luZ1VuYXZhaWxhYmxlVGV4dCIsImlkIiwiZWRpdFZpZXciLCJyZXNvdXJjZUtpbmQiLCJtb2RlbE5hbWUiLCJTQUxFU09SREVSIiwiZW5hYmxlT2ZmbGluZSIsIl9idXN5SW5kaWNhdG9yIiwibG9jYXRpb25UeXBlIiwib25UcmFuc2l0aW9uVG8iLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJBcHAiLCJiYXJzIiwidGJhciIsImRpc2FibGVUb29sIiwiY29udGV4dCIsImludGVncmF0aW9uU2V0dGluZ3MiLCJfY2FuUHJvbW90ZSIsInByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInNob3dCdXN5IiwiZW50cnkiLCIkbmFtZSIsInJlcXVlc3QiLCJzYWxlc09yZGVySWQiLCIka2V5IiwiU2FnZSIsIlNEYXRhIiwiQ2xpZW50IiwiU0RhdGFTZXJ2aWNlT3BlcmF0aW9uUmVxdWVzdCIsImdldFNlcnZpY2UiLCJzZXRSZXNvdXJjZUtpbmQiLCJzZXRDb250cmFjdE5hbWUiLCJzZXRPcGVyYXRpb25OYW1lIiwiY2FuUHJvbW90ZSIsInZhbHVlIiwicmVzdWx0IiwiZXhlY3V0ZSIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsIlJlc3VsdCIsImZhaWx1cmUiLCJlcnIiLCJKU09OIiwicGFyc2UiLCJtZXNzYWdlIiwic2NvcGUiLCJhZGRMaW5lSXRlbXMiLCJFcnBMb2dpY2FsSWQiLCJtb2RhbCIsImNyZWF0ZVNpbXBsZURpYWxvZyIsInRpdGxlIiwiY29udGVudCIsImdldENvbnRlbnQiLCJ0aGVuIiwibmF2aWdhdGVUb0VkaXRWaWV3IiwidmlldyIsImdldFZpZXciLCJvcHRpb25zIiwiaW5zZXJ0IiwiU2FsZXNPcmRlciIsInJlZnJlc2hSZXF1aXJlZCIsInNob3ciLCJoYW5kbGVQcmljaW5nU3VjY2VzcyIsIl9yZWZyZXNoQ2xpY2tlZCIsIm9uR2V0T3JkZXJUb3RhbCIsImdldE9yZGVyUHJpY2luZyIsIm9uUmVQcmljZSIsImlzU2FsZXNPcmRlckNsb3NlZCIsInNhbGVzT3JkZXJSZVByaWNlIiwib25Qcm9tb3RlT3JkZXIiLCJjYW5Qcm9tb3RlUHJvbWlzZSIsInZhbCIsImhpZGVCdXN5IiwicHJvbW90ZSIsInByb21vdGVUb0JhY2tPZmZpY2UiLCJJc0Nsb3NlZCIsInByb2Nlc3NFbnRyeSIsImhhc0FjY2Vzc1RvIiwiZW5hYmxlVG9vbCIsImNvbXBsZXRlIiwiZGlzYWJsZUNsb3NlIiwiaGlkZSIsIl9kZXN0cm95ZWQiLCJzdGFydCIsInNob3dUb29sYmFyIiwiYWRkIiwiZm9ybWF0UGlja2xpc3QiLCJwcm9wZXJ0eSIsInBpY2tsaXN0IiwiYXBwIiwicGlja2xpc3RTZXJ2aWNlIiwiX21vZGVsIiwiY3JlYXRlTGF5b3V0IiwibGF5b3V0IiwibGlzdCIsImNscyIsIm5hbWUiLCJjaGlsZHJlbiIsImxhYmVsIiwiaWNvbkNsYXNzIiwiYWN0aW9uIiwic2VjdXJpdHkiLCJkaXNhYmxlZCIsImJpbmQiLCJkZXRhaWxzVGV4dCIsInJlbmRlcmVyIiwiZGF0YSIsImRhdGUiLCJkZXNjcmlwdG9yIiwia2V5IiwiZm9ybWF0TXVsdGlDdXJyZW5jeSIsIkJhc2VDdXJyZW5jeUNvZGUiLCJDdXJyZW5jeUNvZGUiLCJhZGRyZXNzIiwieWVzTm8iLCJBZGRyZXNzIiwiRnVsbEFkZHJlc3MiLCJEZXNjcmlwdGlvbiIsIndoZXJlIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxNQUFNQSxXQUFXLG9CQUFZLG1CQUFaLENBQWpCOztBQUVBLE1BQU1DLFVBQVUsdUJBQVEsK0NBQVIsRUFBeUQsa0JBQXpELEVB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bEcsS0FBZixFQUFzQjtBQUMzQiwwQ0FBNEJBLE1BQU1JLElBQWxDO0FBQ0QsV0FMQTtBQU1EK0IsZ0JBQU07QUFOTCxTQW5DTztBQUpULE9BeFRrQyxDQUE5QixDQUFQO0FBd1dEO0FBaGxCZ0YsR0FBbkUsQ0FBaEI7O0FBbWxCQSxpQkFBS2dFLFNBQUwsQ0FBZSxnQ0FBZixFQUFpRGhMLE9BQWpEO29CQUNlQSxPIiwiZmlsZSI6IkRldGFpbC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnY3JtL0Zvcm1hdCc7XHJcbmltcG9ydCBEZXRhaWwgZnJvbSAnYXJnb3MvRGV0YWlsJztcclxuaW1wb3J0IEJ1c3lJbmRpY2F0b3IgZnJvbSAnYXJnb3MvRGlhbG9ncy9CdXN5SW5kaWNhdG9yJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuaW1wb3J0IFByaWNpbmdBdmFpbGFiaWxpdHlTZXJ2aWNlIGZyb20gJy4uLy4uL1ByaWNpbmdBdmFpbGFiaWxpdHlTZXJ2aWNlJztcclxuaW1wb3J0IFByb21vdGUgZnJvbSAnLi4vLi4vUHJvbW90ZSc7XHJcbmltcG9ydCB1dGlsaXR5IGZyb20gJy4uLy4uL1V0aWxpdHknO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnc2FsZXNPcmRlcnNEZXRhaWwnKTtcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5WaWV3cy5TYWxlc09yZGVycy5EZXRhaWwnLCBbRGV0YWlsXSwge1xyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIGFjdGlvbnNUZXh0OiByZXNvdXJjZS5hY3Rpb25zVGV4dCxcclxuICByZWxhdGVkSXRlbXNUZXh0OiByZXNvdXJjZS5yZWxhdGVkSXRlbXNUZXh0LFxyXG4gIG9yZGVyTnVtYmVyVGV4dDogcmVzb3VyY2Uub3JkZXJOdW1iZXJUZXh0LFxyXG4gIG9yZGVySWRUZXh0OiByZXNvdXJjZS5vcmRlcklkVGV4dCxcclxuICBjdXN0b21lclBPVGV4dDogcmVzb3VyY2UuY3VzdG9tZXJQT1RleHQsXHJcbiAgYWNjb3VudFRleHQ6IHJlc291cmNlLmFjY291bnRUZXh0LFxyXG4gIG9wcG9ydHVuaXR5VGV4dDogcmVzb3VyY2Uub3Bwb3J0dW5pdHlUZXh0LFxyXG4gIGRhdGVDcmVhdGVkVGV4dDogcmVzb3VyY2UuZGF0ZUNyZWF0ZWRUZXh0LFxyXG4gIG9yZGVyRGF0ZVRleHQ6IHJlc291cmNlLm9yZGVyRGF0ZVRleHQsXHJcbiAgZHVlRGF0ZVRleHQ6IHJlc291cmNlLmR1ZURhdGVUZXh0LFxyXG4gIGRvY3VtZW50RGF0ZVRleHQ6IHJlc291cmNlLmRvY3VtZW50RGF0ZVRleHQsXHJcbiAgc3RhdHVzVGV4dDogcmVzb3VyY2Uuc3RhdHVzVGV4dCxcclxuICBjdXJyZW5jeUNvZGVUZXh0OiByZXNvdXJjZS5jdXJyZW5jeUNvZGVUZXh0LFxyXG4gIHN1YlRvdGFsVGV4dDogcmVzb3VyY2Uuc3ViVG90YWxUZXh0LFxyXG4gIGdyYW5kVG90YWxUZXh0OiByZXNvdXJjZS5ncmFuZFRvdGFsVGV4dCxcclxuICBiYXNlU3ViVG90YWxUZXh0OiByZXNvdXJjZS5iYXNlU3ViVG90YWxUZXh0LFxyXG4gIGJhc2VHcmFuZFRvdGFsVGV4dDogcmVzb3VyY2UuYmFzZUdyYW5kVG90YWxUZXh0LFxyXG4gIGJpbGxUb1RleHQ6IHJlc291cmNlLmJpbGxUb1RleHQsXHJcbiAgYmlsbFRvQWRkcmVzc1RleHQ6IHJlc291cmNlLmJpbGxUb0FkZHJlc3NUZXh0LFxyXG4gIHNoaXBUb1RleHQ6IHJlc291cmNlLnNoaXBUb1RleHQsXHJcbiAgc2hpcFRvQWRkcmVzc1RleHQ6IHJlc291cmNlLnNoaXBUb0FkZHJlc3NUZXh0LFxyXG4gIHBheUZyb21UZXh0OiByZXNvdXJjZS5wYXlGcm9tVGV4dCxcclxuICBwYXltZW50TWV0aG9kVGV4dDogcmVzb3VyY2UucGF5bWVudE1ldGhvZFRleHQsXHJcbiAgcGF5bWVudFRlcm1UZXh0OiByZXNvdXJjZS5wYXltZW50VGVybVRleHQsXHJcbiAgYmFja09yZGVyZWRUZXh0OiByZXNvdXJjZS5iYWNrT3JkZXJlZFRleHQsXHJcbiAgZHJvcFNoaXBBbGxvd2VkVGV4dDogcmVzb3VyY2UuZHJvcFNoaXBBbGxvd2VkVGV4dCxcclxuICBzaGlwRWFybHlBbGxvd2VkVGV4dDogcmVzb3VyY2Uuc2hpcEVhcmx5QWxsb3dlZFRleHQsXHJcbiAgaW52b2ljZUltbWVkaWF0ZWx5VGV4dDogcmVzb3VyY2UuaW52b2ljZUltbWVkaWF0ZWx5VGV4dCxcclxuICBwYXJ0aWFsU2hpcEFsbG93ZWRUZXh0OiByZXNvdXJjZS5wYXJ0aWFsU2hpcEFsbG93ZWRUZXh0LFxyXG4gIHRheEV4ZW1wdFRleHQ6IHJlc291cmNlLnRheEV4ZW1wdFRleHQsXHJcbiAgb3JkZXJJdGVtc1RleHQ6IHJlc291cmNlLm9yZGVySXRlbXNUZXh0LFxyXG4gIGF0dGFjaG1lbnRzVGV4dDogcmVzb3VyY2UuYXR0YWNobWVudHNUZXh0LFxyXG4gIHNhbGVzUGVyc29uc1RleHQ6IHJlc291cmNlLnNhbGVzUGVyc29uc1RleHQsXHJcbiAgaW52b2ljZUl0ZW1zVGV4dDogcmVzb3VyY2UuaW52b2ljZUl0ZW1zVGV4dCxcclxuICBzaGlwbWVudEl0ZW1zVGV4dDogcmVzb3VyY2Uuc2hpcG1lbnRJdGVtc1RleHQsXHJcbiAgZW50aXR5VGV4dDogcmVzb3VyY2UuZW50aXR5VGV4dCxcclxuICBhZGRMaW5lSXRlbXNUZXh0OiByZXNvdXJjZS5hZGRMaW5lSXRlbXNUZXh0LFxyXG4gIHF1b3RlVGV4dDogcmVzb3VyY2UucXVvdGVUZXh0LFxyXG4gIHByb21vdGVPcmRlclRleHQ6IHJlc291cmNlLnByb21vdGVPcmRlclRleHQsXHJcbiAgc3luY1N0YXR1c1RleHQ6IHJlc291cmNlLnN5bmNTdGF0dXNUZXh0LFxyXG4gIGFjY291bnRpbmdFbnRpdHlUZXh0OiByZXNvdXJjZS5hY2NvdW50aW5nRW50aXR5VGV4dCxcclxuICBiYWNrT2ZmaWNlVGV4dDogcmVzb3VyY2UuYmFja09mZmljZVRleHQsXHJcbiAgd2FyZWhvdXNlVGV4dDogcmVzb3VyY2Uud2FyZWhvdXNlVGV4dCxcclxuICBsb2NhdGlvblRleHQ6IHJlc291cmNlLmxvY2F0aW9uVGV4dCxcclxuICBhY2NvdW50aW5nRW50aXR5UmVxdWlyZWRUZXh0OiByZXNvdXJjZS5hY2NvdW50aW5nRW50aXR5UmVxdWlyZWRUZXh0LFxyXG4gIHJlcXVlc3RlZEJ5VGV4dDogcmVzb3VyY2UucmVxdWVzdGVkQnlUZXh0LFxyXG4gIHN5bmNIaXN0b3J5VGV4dDogcmVzb3VyY2Uuc3luY0hpc3RvcnlUZXh0LFxyXG4gIGNhcnJpZXJUZXh0OiByZXNvdXJjZS5jYXJyaWVyVGV4dCxcclxuICBnZXRPcmRlclRvdGFsVGV4dDogcmVzb3VyY2UuZ2V0T3JkZXJUb3RhbFRleHQsXHJcbiAgZXJwU3RhdHVzRGF0ZVRleHQ6IHJlc291cmNlLmVycFN0YXR1c0RhdGVUZXh0LFxyXG4gIGVycFN0YXR1c1RleHQ6IHJlc291cmNlLmVycFN0YXR1c1RleHQsXHJcbiAgcmVmcmVzaFByaWNpbmdUZXh0OiByZXNvdXJjZS5yZWZyZXNoUHJpY2luZ1RleHQsXHJcbiAgcHJpY2luZ1VuYXZhaWxhYmxlVGV4dDogcmVzb3VyY2UucHJpY2luZ1VuYXZhaWxhYmxlVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdzYWxlc29yZGVyX2RldGFpbCcsXHJcbiAgZWRpdFZpZXc6ICdzYWxlc29yZGVyX2VkaXQnLFxyXG4gIHJlc291cmNlS2luZDogJ3NhbGVzT3JkZXJzJyxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLlNBTEVTT1JERVIsXHJcbiAgZW5hYmxlT2ZmbGluZTogdHJ1ZSxcclxuICBfYnVzeUluZGljYXRvcjogbnVsbCxcclxuICBsb2NhdGlvblR5cGU6ICcnLFxyXG5cclxuICBvblRyYW5zaXRpb25UbzogZnVuY3Rpb24gb25UcmFuc2l0aW9uVG8oKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgQXBwLmJhcnMudGJhci5kaXNhYmxlVG9vbCgnZWRpdCcpO1xyXG4gICAgaWYgKCF0aGlzLmxvY2F0aW9uVHlwZSkge1xyXG4gICAgICB0aGlzLmxvY2F0aW9uVHlwZSA9IEFwcC5jb250ZXh0LmludGVncmF0aW9uU2V0dGluZ3MgJiYgQXBwLmNvbnRleHQuaW50ZWdyYXRpb25TZXR0aW5nc1snQmFjayBPZmZpY2UgRXh0ZW5zaW9uJ10gJiZcclxuICAgICAgICBBcHAuY29udGV4dC5pbnRlZ3JhdGlvblNldHRpbmdzWydCYWNrIE9mZmljZSBFeHRlbnNpb24nXVsnVHlwZSBvZiBPcmRlciBMb2NhdGlvbiddIHx8ICcnO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgX2NhblByb21vdGU6IGZ1bmN0aW9uIF9jYW5Qcm9tb3RlKCkge1xyXG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKFxyXG4gICAgICAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2hvd0J1c3koKTtcclxuICAgICAgICBjb25zdCBlbnRyeSA9IHtcclxuICAgICAgICAgICRuYW1lOiAnQ2FuUHJvbW90ZVNhbGVzT3JkZXInLFxyXG4gICAgICAgICAgcmVxdWVzdDoge1xyXG4gICAgICAgICAgICBzYWxlc09yZGVySWQ6IHRoaXMuZW50cnkuJGtleSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhU2VydmljZU9wZXJhdGlvblJlcXVlc3QodGhpcy5nZXRTZXJ2aWNlKCkpXHJcbiAgICAgICAgICAuc2V0UmVzb3VyY2VLaW5kKCdzYWxlc09yZGVycycpXHJcbiAgICAgICAgICAuc2V0Q29udHJhY3ROYW1lKCdkeW5hbWljJylcclxuICAgICAgICAgIC5zZXRPcGVyYXRpb25OYW1lKCdDYW5Qcm9tb3RlU2FsZXNPcmRlcicpO1xyXG5cclxuICAgICAgICBjb25zdCBjYW5Qcm9tb3RlID0ge1xyXG4gICAgICAgICAgdmFsdWU6IGZhbHNlLFxyXG4gICAgICAgICAgcmVzdWx0OiAnJyxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXF1ZXN0LmV4ZWN1dGUoZW50cnksIHtcclxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgY2FuUHJvbW90ZS52YWx1ZSA9IHJlc3VsdC5yZXNwb25zZS5SZXN1bHQ7XHJcbiAgICAgICAgICAgIHJlc29sdmUoY2FuUHJvbW90ZSk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZmFpbHVyZTogKGVycikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IEpTT04ucGFyc2UoZXJyLnJlc3BvbnNlKVswXTtcclxuICAgICAgICAgICAgY2FuUHJvbW90ZS5yZXN1bHQgPSByZXNwb25zZS5tZXNzYWdlO1xyXG4gICAgICAgICAgICByZXNvbHZlKGNhblByb21vdGUpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHNjb3BlOiB0aGlzLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIHJldHVybiBwcm9taXNlO1xyXG4gIH0sXHJcbiAgYWRkTGluZUl0ZW1zOiBmdW5jdGlvbiBhZGRMaW5lSXRlbXMoKSB7XHJcbiAgICBpZiAoIXRoaXMuZW50cnkuRXJwTG9naWNhbElkKSB7XHJcbiAgICAgIEFwcC5tb2RhbC5jcmVhdGVTaW1wbGVEaWFsb2coe1xyXG4gICAgICAgIHRpdGxlOiAnYWxlcnQnLFxyXG4gICAgICAgIGNvbnRlbnQ6IHRoaXMuYWNjb3VudGluZ0VudGl0eVJlcXVpcmVkVGV4dCxcclxuICAgICAgICBnZXRDb250ZW50OiAoKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSxcclxuICAgICAgfSlcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLm5hdmlnYXRlVG9FZGl0VmlldygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoJ3NhbGVzb3JkZXJfaXRlbV9lZGl0Jyk7XHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgIGluc2VydDogdHJ1ZSxcclxuICAgICAgICBjb250ZXh0OiB7XHJcbiAgICAgICAgICBTYWxlc09yZGVyOiB0aGlzLmVudHJ5LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuICAgICAgdmlldy5zaG93KG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgaGFuZGxlUHJpY2luZ1N1Y2Nlc3M6IGZ1bmN0aW9uIGhhbmRsZVByaWNpbmdTdWNjZXNzKHJlc3VsdCkge1xyXG4gICAgdGhpcy5fcmVmcmVzaENsaWNrZWQoKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfSxcclxuICBvbkdldE9yZGVyVG90YWw6IGZ1bmN0aW9uIG9uR2V0T3JkZXJUb3RhbCgpIHtcclxuICAgIGlmICh0aGlzLmVudHJ5KSB7XHJcbiAgICAgIGlmICghdGhpcy5vcHRpb25zLmNvbnRleHQpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMuY29udGV4dCA9IHtcclxuICAgICAgICAgIFNhbGVzT3JkZXI6IHRoaXMuZW50cnksXHJcbiAgICAgICAgfTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMuY29udGV4dC5TYWxlc09yZGVyID0gdGhpcy5lbnRyeTtcclxuICAgICAgfVxyXG4gICAgICBQcmljaW5nQXZhaWxhYmlsaXR5U2VydmljZS5nZXRPcmRlclByaWNpbmcodGhpcy5lbnRyeSlcclxuICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmhhbmRsZVByaWNpbmdTdWNjZXNzKHJlc3VsdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvblJlUHJpY2U6IGZ1bmN0aW9uIG9uUmVQcmljZSgpIHtcclxuICAgIGlmICh0aGlzLmVudHJ5KSB7XHJcbiAgICAgIGlmICh0aGlzLmlzU2FsZXNPcmRlckNsb3NlZCgpKSB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgIHRpdGxlOiAnYWxlcnQnLFxyXG4gICAgICAgICAgY29udGVudDogdGhpcy5wcmljaW5nVW5hdmFpbGFibGVUZXh0LFxyXG4gICAgICAgICAgZ2V0Q29udGVudDogbnVsbCxcclxuICAgICAgICB9O1xyXG4gICAgICAgIEFwcC5tb2RhbC5jcmVhdGVTaW1wbGVEaWFsb2cob3B0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghdGhpcy5vcHRpb25zLmNvbnRleHQpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMuY29udGV4dCA9IHtcclxuICAgICAgICAgIFNhbGVzT3JkZXI6IHRoaXMuZW50cnksXHJcbiAgICAgICAgfTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMuY29udGV4dC5TYWxlc09yZGVyID0gdGhpcy5lbnRyeTtcclxuICAgICAgfVxyXG4gICAgICBQcmljaW5nQXZhaWxhYmlsaXR5U2VydmljZS5zYWxlc09yZGVyUmVQcmljZSh0aGlzLmVudHJ5KVxyXG4gICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgIHRoaXMuaGFuZGxlUHJpY2luZ1N1Y2Nlc3MocmVzdWx0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uUHJvbW90ZU9yZGVyOiBmdW5jdGlvbiBvblByb21vdGVPcmRlcigpIHtcclxuICAgIGNvbnN0IGNhblByb21vdGVQcm9taXNlID0gdGhpcy5fY2FuUHJvbW90ZSgpO1xyXG4gICAgY2FuUHJvbW90ZVByb21pc2UudGhlbigodmFsKSA9PiB7XHJcbiAgICAgIHRoaXMuaGlkZUJ1c3koKTtcclxuICAgICAgaWYgKCF2YWwudmFsdWUpIHtcclxuICAgICAgICBBcHAubW9kYWwuY3JlYXRlU2ltcGxlRGlhbG9nKHtcclxuICAgICAgICAgIHRpdGxlOiAnYWxlcnQnLFxyXG4gICAgICAgICAgY29udGVudDogdmFsLnJlc3VsdCxcclxuICAgICAgICAgIGdldENvbnRlbnQ6ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgcHJvbW90ZSA9IG5ldyBQcm9tb3RlKCk7XHJcbiAgICAgIHByb21vdGUucHJvbW90ZVRvQmFja09mZmljZSh0aGlzLmVudHJ5LCAnU2FsZXNPcmRlcicsIHRoaXMpO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBpc1NhbGVzT3JkZXJDbG9zZWQ6IGZ1bmN0aW9uIGlzU2FsZXNPcmRlckNsb3NlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLmVudHJ5LklzQ2xvc2VkO1xyXG4gIH0sXHJcbiAgcHJvY2Vzc0VudHJ5OiBmdW5jdGlvbiBwcm9jZXNzRW50cnkoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG5cclxuICAgIGlmICghQXBwLmhhc0FjY2Vzc1RvKHRoaXMuZWRpdFZpZXcpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pc1NhbGVzT3JkZXJDbG9zZWQoKSkge1xyXG4gICAgICBBcHAuYmFycy50YmFyLmRpc2FibGVUb29sKCdlZGl0Jyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBBcHAuYmFycy50YmFyLmVuYWJsZVRvb2woJ2VkaXQnKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGhpZGVCdXN5OiBmdW5jdGlvbiBoaWRlQnVzeSgpIHtcclxuICAgIHRoaXMuX2J1c3lJbmRpY2F0b3IuY29tcGxldGUoKTtcclxuICAgIEFwcC5tb2RhbC5kaXNhYmxlQ2xvc2UgPSBmYWxzZTtcclxuICAgIEFwcC5tb2RhbC5oaWRlKCk7XHJcbiAgfSxcclxuICBzaG93QnVzeTogZnVuY3Rpb24gc2hvd0J1c3koKSB7XHJcbiAgICBpZiAoIXRoaXMuX2J1c3lJbmRpY2F0b3IgfHwgdGhpcy5fYnVzeUluZGljYXRvci5fZGVzdHJveWVkKSB7XHJcbiAgICAgIHRoaXMuX2J1c3lJbmRpY2F0b3IgPSBuZXcgQnVzeUluZGljYXRvcih7XHJcbiAgICAgICAgaWQ6IGAke3RoaXMuaWR9LWJ1c3lJbmRpY2F0b3JgLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHRoaXMuX2J1c3lJbmRpY2F0b3Iuc3RhcnQoKTtcclxuICAgIEFwcC5tb2RhbC5kaXNhYmxlQ2xvc2UgPSB0cnVlO1xyXG4gICAgQXBwLm1vZGFsLnNob3dUb29sYmFyID0gZmFsc2U7XHJcbiAgICBBcHAubW9kYWwuYWRkKHRoaXMuX2J1c3lJbmRpY2F0b3IpO1xyXG4gIH0sXHJcbiAgZm9ybWF0UGlja2xpc3Q6IGZ1bmN0aW9uIGZvcm1hdFBpY2tsaXN0KHByb3BlcnR5KSB7XHJcbiAgICByZXR1cm4gZm9ybWF0LnBpY2tsaXN0KHRoaXMuYXBwLnBpY2tsaXN0U2VydmljZSwgdGhpcy5fbW9kZWwsIHByb3BlcnR5KTtcclxuICB9LFxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5b3V0IHx8ICh0aGlzLmxheW91dCA9IFt7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmFjdGlvbnNUZXh0LFxyXG4gICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICBjbHM6ICdhY3Rpb24tbGlzdCcsXHJcbiAgICAgIG5hbWU6ICdRdWlja0FjdGlvbnNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbmFtZTogJ1Byb21vdGVTYWxlc09yZGVyJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1NhbGVzT3JkZXJOdW1iZXInLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnByb21vdGVPcmRlclRleHQsXHJcbiAgICAgICAgaWNvbkNsYXNzOiAndXAtYXJyb3cnLFxyXG4gICAgICAgIGFjdGlvbjogJ29uUHJvbW90ZU9yZGVyJyxcclxuICAgICAgICBzZWN1cml0eTogJ0VudGl0aWVzL1NhbGVzT3JkZXIvUHJvbW90ZScsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnR2V0T3JkZXJUb3RhbCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTYWxlc09yZGVyTnVtYmVyJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5nZXRPcmRlclRvdGFsVGV4dCxcclxuICAgICAgICBpY29uQ2xhc3M6ICdmaW5hbmNlJyxcclxuICAgICAgICBhY3Rpb246ICdvbkdldE9yZGVyVG90YWwnLFxyXG4gICAgICAgIHNlY3VyaXR5OiAnRW50aXRpZXMvU2FsZXNPcmRlci9HZXRPcmRlclRvdGFsJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdBZGRMaW5lSXRlbXMnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU2FsZXNPcmRlck51bWJlcicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWRkTGluZUl0ZW1zVGV4dCxcclxuICAgICAgICBpY29uQ2xhc3M6ICdidWxsZXQtbGlzdCcsXHJcbiAgICAgICAgYWN0aW9uOiAnYWRkTGluZUl0ZW1zJyxcclxuICAgICAgICBzZWN1cml0eTogJ0VudGl0aWVzL1NhbGVzT3JkZXIvQWRkJyxcclxuICAgICAgICBkaXNhYmxlZDogdGhpcy5pc1NhbGVzT3JkZXJDbG9zZWQuYmluZCh0aGlzKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdSZVByaWNlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1NhbGVzT3JkZXJOdW1iZXInLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJlZnJlc2hQcmljaW5nVGV4dCxcclxuICAgICAgICBpY29uQ2xhc3M6ICdmaW5hbmNlJyxcclxuICAgICAgICBhY3Rpb246ICdvblJlUHJpY2UnLFxyXG4gICAgICAgIHNlY3VyaXR5OiAnRW50aXRpZXMvU2FsZXNPcmRlci9BZGQnLFxyXG4gICAgICB9XSxcclxuICAgIH0sIHtcclxuICAgICAgdGl0bGU6IHRoaXMuZGV0YWlsc1RleHQsXHJcbiAgICAgIG5hbWU6ICdEZXRhaWxzU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIG5hbWU6ICdTYWxlc09yZGVyTnVtYmVyJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1NhbGVzT3JkZXJOdW1iZXInLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLm9yZGVyTnVtYmVyVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFUlBPcmRlcklEJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycEV4dElkJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5vcmRlcklkVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFcnBEb2N1bWVudERhdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwRG9jdW1lbnREYXRlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5kb2N1bWVudERhdGVUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0LmRhdGUoZGF0YSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdDdXN0b21lclB1cmNoYXNlT3JkZXJOdW1iZXInLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ3VzdG9tZXJQdXJjaGFzZU9yZGVyTnVtYmVyJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5jdXN0b21lclBPVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdBY2NvdW50TmFtZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdBY2NvdW50LkFjY291bnROYW1lJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5hY2NvdW50VGV4dCxcclxuICAgICAgICBkZXNjcmlwdG9yOiAnQWNjb3VudC5BY2NvdW50TmFtZScsXHJcbiAgICAgICAgdmlldzogJ2FjY291bnRfZGV0YWlsJyxcclxuICAgICAgICBrZXk6ICdBY2NvdW50LiRrZXknLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1JlcXVlc3RlZEJ5JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1JlcXVlc3RlZEJ5Lk5hbWVMRicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucmVxdWVzdGVkQnlUZXh0LFxyXG4gICAgICAgIHZpZXc6ICdjb250YWN0X2RldGFpbCcsXHJcbiAgICAgICAga2V5OiAnUmVxdWVzdGVkQnkuJGtleScsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnT3Bwb3J0dW5pdHknLFxyXG4gICAgICAgIHByb3BlcnR5OiAnT3Bwb3J0dW5pdHkuRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLm9wcG9ydHVuaXR5VGV4dCxcclxuICAgICAgICB2aWV3OiAnb3Bwb3J0dW5pdHlfZGV0YWlsJyxcclxuICAgICAgICBrZXk6ICdPcHBvcnR1bml0eS4ka2V5JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdRdW90ZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdRdW90ZS5RdW90ZU51bWJlcicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucXVvdGVUZXh0LFxyXG4gICAgICAgIHZpZXc6ICdxdW90ZV9kZXRhaWwnLFxyXG4gICAgICAgIGtleTogJ1F1b3RlLiRrZXknLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0JhY2tPZmZpY2UnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwTG9naWNhbElkJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5iYWNrT2ZmaWNlVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIodmFsKSB7XHJcbiAgICAgICAgICBpZiAodmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFcnBBY2NvdW50aW5nRW50aXR5SWQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwQWNjb3VudGluZ0VudGl0eUlkJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5hY2NvdW50aW5nRW50aXR5VGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIodmFsKSB7XHJcbiAgICAgICAgICBpZiAodmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdEdWVEYXRlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0R1ZURhdGUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmR1ZURhdGVUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0LmRhdGUoZGF0YSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTdGF0dXMnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU3RhdHVzJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zdGF0dXNUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcih2YWwpIHtcclxuICAgICAgICAgIGlmICh2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1N5bmNTdGF0dXMnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU3luY1N0YXR1cycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc3luY1N0YXR1c1RleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IHRoaXMuZm9ybWF0UGlja2xpc3QoJ1N5bmNTdGF0dXMnKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFUlBTdGF0dXMnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRVJQU2FsZXNPcmRlci5FUlBTdGF0dXMnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmVycFN0YXR1c1RleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IHRoaXMuZm9ybWF0UGlja2xpc3QoJ0VSUFNhbGVzT3JkZXIuRVJQU3RhdHVzJyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwU3RhdHVzRGF0ZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBTdGF0dXNEYXRlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5lcnBTdGF0dXNEYXRlVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIoZGF0YSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdC5kYXRlKGRhdGEpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQ3VycmVuY3lDb2RlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0N1cnJlbmN5Q29kZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuY3VycmVuY3lDb2RlVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTdWJUb3RhbCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdPcmRlclRvdGFsJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5iYXNlU3ViVG90YWxUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiAodmFsdWUpID0+IHtcclxuICAgICAgICAgIHJldHVybiB1dGlsaXR5LmZvcm1hdE11bHRpQ3VycmVuY3kodmFsdWUsIHRoaXMuZW50cnkuQmFzZUN1cnJlbmN5Q29kZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdHcmFuZFRvdGFsJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0dyYW5kVG90YWwnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmJhc2VHcmFuZFRvdGFsVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdXRpbGl0eS5mb3JtYXRNdWx0aUN1cnJlbmN5KHZhbHVlLCB0aGlzLmVudHJ5LkJhc2VDdXJyZW5jeUNvZGUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRG9jU3ViVG90YWwnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRG9jT3JkZXJUb3RhbCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc3ViVG90YWxUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiAodmFsdWUpID0+IHtcclxuICAgICAgICAgIHJldHVybiB1dGlsaXR5LmZvcm1hdE11bHRpQ3VycmVuY3kodmFsdWUsIHRoaXMuZW50cnkuQ3VycmVuY3lDb2RlKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0RvY0dyYW5kVG90YWwnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRG9jR3JhbmRUb3RhbCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZ3JhbmRUb3RhbFRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHV0aWxpdHkuZm9ybWF0TXVsdGlDdXJyZW5jeSh2YWx1ZSwgdGhpcy5lbnRyeS5DdXJyZW5jeUNvZGUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQ3JlYXRlRGF0ZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDcmVhdGVEYXRlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5kYXRlQ3JlYXRlZFRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQuZGF0ZShkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ09yZGVyRGF0ZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdPcmRlckRhdGUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLm9yZGVyRGF0ZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQuZGF0ZShkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0NhcnJpZXInLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ2Fycmllci5DYXJyaWVyTmFtZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuY2FycmllclRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwUGF5bWVudE1ldGhvZCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBQYXltZW50TWV0aG9kJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5wYXltZW50TWV0aG9kVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFcnBQYXltZW50VGVybUlkJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFBheW1lbnRUZXJtSWQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnBheW1lbnRUZXJtVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFcnBCaWxsVG8nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwQmlsbFRvLk5hbWUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmJpbGxUb1RleHQsXHJcbiAgICAgICAgdmlldzogJ2VycGJpbGx0b19kZXRhaWwnLFxyXG4gICAgICAgIGtleTogJ0VycEJpbGxUby4ka2V5JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFcnBCaWxsVG9BZGRyZXNzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycEJpbGxUby5BZGRyZXNzJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5iaWxsVG9BZGRyZXNzVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIoZGF0YSkge1xyXG4gICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdC5hZGRyZXNzKGRhdGEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwU2hpcFRvJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFNoaXBUby5OYW1lJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zaGlwVG9UZXh0LFxyXG4gICAgICAgIHZpZXc6ICdlcnBzaGlwdG9fZGV0YWlsJyxcclxuICAgICAgICBrZXk6ICdFcnBTaGlwVG8uJGtleScsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwU2hpcFRvQWRkcmVzcycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBTaGlwVG8uQWRkcmVzcycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc2hpcFRvQWRkcmVzc1RleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXQuYWRkcmVzcyhkYXRhKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VycEJhY2tPcmRlcmVkJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycEJhY2tPcmRlcmVkJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5iYWNrT3JkZXJlZFRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQueWVzTm8oZGF0YSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFcnBEcm9wU2hpcCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBEcm9wU2hpcCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZHJvcFNoaXBBbGxvd2VkVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIoZGF0YSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdC55ZXNObyhkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VycFNoaXBFYXJseScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBTaGlwRWFybHknLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnNoaXBFYXJseUFsbG93ZWRUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0Lnllc05vKGRhdGEpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwSW52b2ljZUltbWVkaWF0ZWx5JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycEludm9pY2VJbW1lZGlhdGVseScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuaW52b2ljZUltbWVkaWF0ZWx5VGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIoZGF0YSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdC55ZXNObyhkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VycFBhcnRpYWxTaGlwQWxsb3dlZCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBQYXJ0aWFsU2hpcEFsbG93ZWQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnBhcnRpYWxTaGlwQWxsb3dlZFRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQueWVzTm8oZGF0YSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFcnBUYXhFeGVtcHQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwVGF4RXhlbXB0JyxcclxuICAgICAgICBsYWJlbDogdGhpcy50YXhFeGVtcHRUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0Lnllc05vKGRhdGEpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnTG9jYXRpb24nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnTG9jYXRpb24nLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmxvY2F0aW9uVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIoZGF0YSkge1xyXG4gICAgICAgICAgaWYgKHRoaXMubG9jYXRpb25UeXBlID09PSAnV2FyZWhvdXNlJykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5BZGRyZXNzICYmIGRhdGEuQWRkcmVzcy5GdWxsQWRkcmVzcykge1xyXG4gICAgICAgICAgICAgIHJldHVybiBmb3JtYXQuYWRkcmVzcyhkYXRhLkFkZHJlc3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhLkRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnV2FyZWhvdXNlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1dhcmVob3VzZUxvY2F0aW9uJyxcclxuICAgICAgICBsYWJlbDogdGhpcy53YXJlaG91c2VUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5sb2NhdGlvblR5cGUgJiYgdGhpcy5sb2NhdGlvblR5cGUgIT09ICdXYXJlaG91c2UnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLkFkZHJlc3MgJiYgZGF0YS5BZGRyZXNzLkZ1bGxBZGRyZXNzKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdC5hZGRyZXNzKGRhdGEuQWRkcmVzcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGEuRGVzY3JpcHRpb247XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFcnBQYXlGcm9tJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFBheUZyb20uQWRkcmVzcycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucGF5RnJvbVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXQuYWRkcmVzcyhkYXRhKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICB9XSxcclxuICAgIH0sIHtcclxuICAgICAgdGl0bGU6IHRoaXMucmVsYXRlZEl0ZW1zVGV4dCxcclxuICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgbmFtZTogJ1JlbGF0ZWRJdGVtc1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBuYW1lOiAnT3JkZXJJdGVtcycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMub3JkZXJJdGVtc1RleHQsXHJcbiAgICAgICAgd2hlcmU6IGZ1bmN0aW9uIHdoZXJlKGVudHJ5KSB7XHJcbiAgICAgICAgICByZXR1cm4gYFNhbGVzT3JkZXIuSWQgZXEgXCIke2VudHJ5LiRrZXl9XCJgO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdmlldzogJ3NhbGVzb3JkZXJfaXRlbXNfcmVsYXRlZCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRVJQSW52b2ljZUl0ZW1zUmVsYXRlZCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuaW52b2ljZUl0ZW1zVGV4dCxcclxuICAgICAgICB3aGVyZTogZnVuY3Rpb24gd2hlcmUoZW50cnkpIHtcclxuICAgICAgICAgIHJldHVybiBgU2FsZXNPcmRlci5JZCBlcSBcIiR7ZW50cnkuJGtleX1cImA7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB2aWV3OiAnc2FsZXNvcmRlcl9pbnZvaWNlX2l0ZW1zX3JlbGF0ZWQnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VSUFNoaXBtZW50SXRlbXNSZWxhdGVkJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zaGlwbWVudEl0ZW1zVGV4dCxcclxuICAgICAgICB3aGVyZTogZnVuY3Rpb24gd2hlcmUoZW50cnkpIHtcclxuICAgICAgICAgIHJldHVybiBgU2FsZXNPcmRlci5JZCBlcSBcIiR7ZW50cnkuJGtleX1cImA7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB2aWV3OiAnc2FsZXNvcmRlcl9zaGlwbWVudF9pdGVtc19yZWxhdGVkJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdBdHRhY2htZW50cycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYXR0YWNobWVudHNUZXh0LFxyXG4gICAgICAgIHdoZXJlOiBmdW5jdGlvbiB3aGVyZShlbnRyeSkge1xyXG4gICAgICAgICAgcmV0dXJuIGBzYWxlc09yZGVySWQgZXEgXCIke2VudHJ5LiRrZXl9XCJgO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdmlldzogJ3NhbGVzb3JkZXJfYXR0YWNobWVudHNfcmVsYXRlZCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnU3luY0hpc3RvcnknLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnN5bmNIaXN0b3J5VGV4dCxcclxuICAgICAgICB3aGVyZTogKGVudHJ5KSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gYEVudGl0eVR5cGUgZXEgXCJTYWxlc09yZGVyXCIgYW5kIEVudGl0eUlkIGVxIFwiJHtlbnRyeS4ka2V5fVwiYDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHZpZXc6ICdvcmRlcl9zeW5jcmVzdWx0X3JlbGF0ZWQnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1NhbGVzUGVyc29ucycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc2FsZXNQZXJzb25zVGV4dCxcclxuICAgICAgICB3aGVyZTogZnVuY3Rpb24gd2hlcmUoZW50cnkpIHtcclxuICAgICAgICAgIHJldHVybiBgU2FsZXNPcmRlci5JZCBlcSBcIiR7ZW50cnkuJGtleX1cImA7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB2aWV3OiAnc2FsZXNvcmRlcl9zYWxlc3BlcnNvbl9yZWxhdGVkJyxcclxuICAgICAgfV0sXHJcbiAgICB9XSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuVmlld3MuU2FsZXNPcmRlcnMuRGV0YWlsJywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==