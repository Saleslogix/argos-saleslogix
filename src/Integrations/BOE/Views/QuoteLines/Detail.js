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
import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import connect from 'dojo/_base/connect';
import format from 'crm/Format';
import Detail from 'argos/Detail';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';
import utility from '../../Utility';
import PricingAvailabilityService from '../../PricingAvailabilityService';

const resource = getResource('quoteItemsDetail');

const __class = declare('crm.Integrations.BOE.Views.QuoteLines.Detail', [Detail], {
  // Localization
  titleText: resource.titleText,
  lineText: resource.lineText,
  quantityText: resource.quantityText,
  priceText: resource.priceText,
  extendedAmountText: resource.extendedAmountText,
  productNameText: resource.productNameText,
  descriptionText: resource.descriptionText,
  quoteIDText: resource.quoteIDText,
  skuText: resource.skuText,
  baseExtendedAmountText: resource.baseExtendedAmountText,
  baseAdjustedPriceText: resource.baseAdjustedPriceText,
  discountText: resource.discountText,
  adjustedPriceText: resource.adjustedPriceText,
  statusText: resource.statusText,
  openQuantityText: resource.openQuantityText,
  dropShipText: resource.dropShipText,
  fixedPriceText: resource.fixedPriceText,
  rushRequestText: resource.rushRequestText,
  warehouseText: resource.warehouseText,
  detailsText: resource.detailsText,
  relatedItemsText: resource.relatedItemsText,
  entityText: resource.entityText,
  confirmDeleteText: resource.confirmDeleteText,
  unitOfMeasureText: resource.unitOfMeasureText,
  locationText: resource.locationText,
  totalAmountText: resource.totalAmountText,
  availableQuantityText: resource.availableQuantityText,
  checkWarehouseAvailabilityText: resource.checkWarehouseAvailabilityText,
  // View Properties
  id: 'quote_line_detail',
  editView: 'quote_line_edit',
  resourceKind: 'quoteItems',
  modelName: MODEL_NAMES.QUOTEITEM,
  entityName: 'QuoteItem',
  enableOffline: true,

  createEntryForDelete: function createEntryForDelete(e) {
    const entry = {
      $key: e.$key,
      $etag: e.$etag,
      $name: e.$name,
    };
    return entry;
  },
  processEntry: function processEntry() {
    this.inherited(processEntry, arguments);
    if (this.options && this.options.fromContext && this.options.fromContext.readOnly) {
      if (App.bars && App.bars.tbar) {
        App.bars.tbar.disableTool('removeQuoteLine');
        App.bars.tbar.disableTool('edit');
      }
    }
  },
  removeQuoteLine: function removeQuoteLine() {
    // TODO: [INFORCRM-7712] Implement this in the model (model needs remove call)
    App.modal.createSimpleDialog({
      title: 'alert',
      content: this.confirmDeleteText,
      getContent: () => { },
    }).then(() => {
      const entry = this.createEntryForDelete(this.entry);
      const request = this.store._createEntryRequest(this.entry.$key, {});

      if (request) {
        request.delete(entry, {
          success: this.onDeleteSuccess,
          failure: this.onRequestDataFailure,
          scope: this,
        });
      }
    });
  },
  onAvailability: function onAvailability() {
    PricingAvailabilityService.getQuoteItemAvailability(this.entry)
      .then((result) => {
        const [warehouse] = result;
        const { ErrorCode, AvailableQuantity } = warehouse;
        if (ErrorCode) {
          App.modal.createSimpleAlert({ title: ErrorCode });
        } else if (AvailableQuantity) {
          App.modal.createSimpleAlert({ title: this.availableQuantityText + AvailableQuantity });
        }
      });
  },
  onDeleteSuccess: function onDeleteSuccess() {
    const views = [
      App.getView('quote_lines_related'),
      App.getView('quote_detail'),
      App.getView('quote_list'),
    ];

    views.forEach((view) => {
      if (view) {
        view.refreshRequired = true;
      }
    }, this);

    connect.publish('/app/refresh', [{
      resourceKind: this.resourceKind,
    }]);
    ReUI.back();
  },
  refreshRequiredFor: function refreshRequiredFor(options) {
    if (this.options) {
      return !!options; // if options provided, then refresh
    }

    return true;
  },
  createToolLayout: function createToolLayout() {
    if (this.tools) {
      return this.tools;
    }
    const tools = this.inherited(createToolLayout, arguments);
    if (tools && tools.tbar) {
      tools.tbar.push({
        id: 'removeQuoteLine',
        svg: 'close',
        action: 'removeQuoteLine',
        title: this.removeQuoteLineText,
        security: 'Entities/Quote/Delete',
      });
    }
    return tools;
  },
  createLayout: function createLayout() {
    const { code: baseCurrencyCode } = App.getBaseExchangeRate();

    return this.layout || (this.layout = [{
      title: this.actionsText,
      list: true,
      cls: 'action-list',
      name: 'QuickActionsSection',
      children: [{
        name: 'CheckAvailability',
        property: 'SlxLocation.Name',
        label: this.checkWarehouseAvailabilityText,
        iconClass: 'redo', // check for a better icon
        action: 'onAvailability',
        disabled: () => {
          return App.warehouseDiscovery === 'auto';
        },
        security: 'Entities/SalesOrder/Add',
      }],
    }, {
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        name: 'LineNumber',
        property: 'ErpLineNumber',
        label: this.lineText,
      }, {
        name: 'QuoteNumber',
        property: 'Quote.QuoteNumber',
        label: this.quoteIDText,
        view: 'quote_detail',
        key: 'Quote.$key',
      }, {
        name: 'ProductName',
        property: 'ProductName',
        label: this.productNameText,
      }, {
        name: 'Description',
        property: 'Description',
        label: this.descriptionText,
      }, {
        name: 'ActualId',
        property: 'ActualId',
        label: this.skuText,
      }, {
        name: 'Price',
        property: 'Price',
        label: this.priceText,
        renderer: (value) => {
          const code = this.entry.Quote.BaseCurrencyCode || baseCurrencyCode;
          return utility.formatMultiCurrency(value, code);
        },
      }, {
        name: 'Discount',
        property: 'Discount',
        label: this.discountText,
        renderer: (value) => {
          const code = this.entry.Quote.BaseCurrencyCode || baseCurrencyCode;
          return utility.formatMultiCurrency(value, code);
        },
      }, {
        name: 'CalculatedPrice',
        property: 'CalculatedPrice',
        label: this.baseAdjustedPriceText,
        renderer: (value) => {
          const code = this.entry.Quote.BaseCurrencyCode || baseCurrencyCode;
          return utility.formatMultiCurrency(value, code);
        },
      }, {
        name: 'DocCalculatedPrice',
        property: 'DocCalculatedPrice',
        label: this.adjustedPriceText,
        renderer: value => utility.formatMultiCurrency(value, this.entry.Quote.CurrencyCode),
      }, {
        name: 'Quantity',
        property: 'Quantity',
        label: this.quantityText,
        renderer: function renderer(val) {
          return format.fixedLocale(val, 2);
        },
      }, {
        name: 'UnitOfMeasure',
        property: 'UnitOfMeasure',
        label: this.unitOfMeasureText,
        renderer: function renderer(val) {
          if (val && val.Name) {
            return val.Name;
          }
          return null;
        },
      }, {
        label: this.baseExtendedAmountText,
        name: 'ExtendedPrice',
        property: 'ExtendedPrice',
        renderer: (value) => {
          const code = this.entry.Quote.BaseCurrencyCode || baseCurrencyCode;
          return utility.formatMultiCurrency(value, code);
        },
      }, {
        name: 'DocExtendedPrice',
        property: 'DocExtendedPrice',
        label: this.extendedAmountText,
        renderer: value => utility.formatMultiCurrency(value, this.entry.Quote.CurrencyCode),
      }, {
        name: 'DocTotalAmount',
        property: 'DocTotalAmount',
        label: this.totalAmountText,
        renderer: value => utility.formatMultiCurrency(value, this.entry.Quote.CurrencyCode),
      }, {
        name: 'Status',
        property: 'Status',
        label: this.statusText,
      }, {
        name: 'SlxLocation',
        property: 'SlxLocation.Description',
        label: this.warehouseText,
      }, {
        name: 'OpenQuantity',
        property: 'OpenQuantity',
        label: this.openQuantityText,
        renderer: function renderer(val) {
          return format.fixedLocale(val, 2);
        },
      }, {
        name: 'DropShip',
        property: 'DropShip',
        label: this.dropShipText,
        renderer: function renderer(data) {
          return format.yesNo(data);
        },
      }, {
        name: 'FixedPrice',
        property: 'FixedPrice',
        label: this.fixedPriceText,
        renderer: value => utility.formatMultiCurrency(value, this.entry.Quote.CurrencyCode),
      }, {
        name: 'RushRequest',
        property: 'RushRequest',
        label: this.rushRequestText,
        renderer: function renderer(data) {
          return format.yesNo(data);
        },
      }],
    }, {
      title: this.relatedItemsText,
      list: true,
      name: 'RelatedItemsSection',
      children: [],
    }]);
  },
});

lang.setObject('icboe.Views.QuoteLines.Detail', __class);
export default __class;
