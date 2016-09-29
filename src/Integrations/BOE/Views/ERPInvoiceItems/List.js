/**
 * @class .Views.ERPInvoces.List
 *
 * @extends argos.List
 * @requires argos.List
 * @requires argos.Format
 * @requires argos.Utility
 * @requires argos.Convert
 *
 * @requires crm.Action
 * @requires crm.Views._MetricListMixin
 * @requires crm.Views._CardLayoutListMixin
 * @requires crm.Views._RightDrawerListMixin
 *
 */
import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import List from 'argos/List';
import _MetricListMixin from 'crm/Views/_MetricListMixin';
import _CardLayoutListMixin from 'crm/Views/_CardLayoutListMixin';
import _RightDrawerListMixin from 'crm/Views/_RightDrawerListMixin';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('erpInvoiceItemsList');

const __class = declare('crm.Integrations.BOE.Views.ERPInvoiceItems.List', [List, _RightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin], {
  itemTemplate: new Simplate([
    '<h3><label class="group-label">{%: $$.productNameText %}</label> {%: $.ProductName %}</h3>',
    '<h4><label class="group-label">{%: $$.invoiceIdText %}</label> {%: $.ErpInvoice.InvoiceNumber %}</h4>',
    '<h4><label class="group-label">{%: $$.descriptionText %}</label> {%: $.Description %}</h4>',
    '<h4><label class="group-label">{%: $$.lineText %}</label> {%: $.ErpLineNumber %}</h4>',
    '<h4><label class="group-label">{%: $$.quantityText %}</label> {%: $.Quantity %}</h4>',
    '<h4><label class="group-label">{%: $$.priceText %}</label> {%: $.Price %}</h4>',
    '{% if ($.ErpLineTotalAmount) { %}',
    '<h4> <label class="group-label">{%: $$.amountText %}</label> <strong>',
    '{% if (App.hasMultiCurrency() && $.ErpInvoice.CurrencyCode) { %}',
    '{%: crm.Format.multiCurrency($.ErpLineTotalAmount, $.ErpInvoice.CurrencyCode) %}',
    '{% } else { %}',
    '{%: crm.Format.currency($.ErpLineTotalAmount) %}',
    '{% } %}',
    '</strong></h4>',
    '{% } %}',
  ]),

  // Localization
  titleText: resource.titleText,
  lineText: resource.lineText,
  quantityText: resource.quantityText,
  priceText: resource.priceText,
  amountText: resource.amountText,
  productNameText: resource.productNameText,
  descriptionText: resource.descriptionText,
  invoiceIdText: resource.invoiceIdText,

  // View Properties
  id: 'invoice_item_list',
  detailView: 'invoice_item_detail',
  allowSelection: true,
  enableActions: true,
  modelName: MODEL_NAMES.ERPINVOICEITEM,
  resourceKind: 'erpInvoiceItems',

  // Card layout
  itemIconClass: 'fa fa-list-ul fa-2x',

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('ProductName like "${0}%" or ErpLineNumber like "${0}%" or Description like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('crm.Views.ERPInvoiceItems.List', __class);
export default __class;
