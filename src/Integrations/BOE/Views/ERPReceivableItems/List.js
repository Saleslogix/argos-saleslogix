import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import List from 'argos/List';
import format from 'crm/Format';
import _CardLayoutListMixin from 'crm/Views/_CardLayoutListMixin';
import _RightDrawerListMixin from 'crm/Views/_RightDrawerListMixin';
import _MetricListMixin from 'crm/Views/_MetricListMixin';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('erpReceivableItemsList');

const __class = declare('crm.Integrations.BOE.Views.ERPReceivableItems.List', [List, _RightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin], {
  formatter: format,
  itemTemplate: new Simplate([
    '<h3><label class="group-label">{%: $$.lineNumberText %}</label> {%: $.ErpLineNumber %}</h3>',
    '<h4><label class="group-label">{%: $$.receivablesIdText %}</label> {%: $.ErpReceivable.ErpExtId %}</h4>',
    '{% if ($.ErpInvoice && $.ErpInvoice.ErpExtId) { %}',
    '<h4><label class="group-label">{%: $$.invoiceIDText %}</label> {%: $.ErpInvoice.ErpExtId %}</h4>',
    '{% } %}',
    '<h4><label class="group-label">{%: $$.productNameText %}</label> {%: $.ProductName %}</h4>',
    '{% if ($.ErpLineTotalAmount) { %}',
    '<h4><label class="group-label">{%: $$.lineTotalText %}</label> ',
    '{% if (App.hasMultiCurrency() && $.ErpReceivable.CurrencyCode) { %}',
    '{%: $$.formatter.multiCurrency($.ErpLineTotalAmount, $.ErpReceivable.CurrencyCode) %}',
    '{% } else { %}',
    '{%: $$.formatter.currency($.ErpLineTotalAmount) %} ',
    '{% } %}</h4>',
    '{% } %}',
  ]),

  // Localization
  titleText: resource.titleText,
  lineNumberText: resource.lineNumberText,
  receivablesIdText: resource.receivablesIdText,
  productNameText: resource.productNameText,
  lineTotalText: resource.lineTotalText,
  invoiceIDText: resource.invoiceIDText,

  // Card layout
  itemIconClass: 'fa fa-check-circle-o fa-2x',

  // View Properties
  id: 'erpreceivable_items_list',
  modelName: MODEL_NAMES.ERPRECEIVABLEITEM,
  resourceKind: 'erpReceivableItems',
  detailView: 'erpreceivableitems_detail',
  expose: false,
  allowSelection: true,
  enableActions: true,
  security: 'Entities/Receivable/View',
  insertSecurity: 'Entities/Receivable/Add',

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('upper(ErpReceivable.ErpExtId) like "%${0}%" or upper(ErpInvoice.ErpExtId) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('icboe.Views.ERPReceivableItems.List', __class);
export default __class;
