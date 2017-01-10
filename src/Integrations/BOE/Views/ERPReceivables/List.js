import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import List from 'argos/List';
import format from 'crm/Format';
import _CardLayoutListMixin from 'crm/Views/_CardLayoutListMixin';
import _RightDrawerListMixin from 'crm/Views/_RightDrawerListMixin';
import _MetricListMixin from 'crm/Views/_MetricListMixin';
import _GroupListMixin from 'crm/Views/_GroupListMixin';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';
import utility from '../../Utility';

const resource = getResource('erpReceivablesList');

const __class = declare('crm.Integrations.BOE.Views.ERPReceivables.List', [List, _RightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin, _GroupListMixin], {
  formatter: format,
  util: utility,
  itemTemplate: new Simplate([
    '<h3><label class="group-label">{%: $$.receivableIDText %}</label> {%: $.ErpExtId %}</h3>',
    '{% if ($.ErpInvoice && $.ErpInvoice.InvoiceNumber) { %}',
    '<h4><label class="group-label">{%: $$.invoiceIDText %}</label> {%: $.ErpInvoice.InvoiceNumber %}</h4>',
    '{% } %}',
    '{% if ($.Account && $.Account.AccountName) { %}',
    '<h4><label class="group-label">{%: $$.accountNameText %}</label> {%: $.Account.AccountName %}</h4>',
    '{% } %}',
    '<h4><label class="group-label">{%: $$.receivedBaseAmountText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.ReceivedBaseAmount, $.BaseCurrencyCode) %}',
    '</h4>',
    '<h4><label class="group-label">{%: $$.receivedAmountText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.ReceivedAmount, $.CurrencyCode) %}',
    '</h4>',
    '<h4><label class="group-label">{%: $$.receivableBaseAmountText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.ReceivableBaseAmount, $.BaseCurrencyCode) %}',
    '</h4>',
    '<h4><label class="group-label">{%: $$.receivableAmountText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.ReceivableAmount, $.CurrencyCode) %}',
    '</h4>',
    '<h4><label class="group-label">{%: $$.erpStatusText %}</label> {%: $.ErpStatus %}</h4>',
    '<h4><label class="group-label">{%: $$.erpStatusDateText %}</label> {%: $$.formatter.date($.ErpStatusDate) %}</h4>',
    '<h4><label class="group-label">{%: $$.documentDateText %}</label> {%: $$.formatter.date($.ErpDocumentDate) %}</h4>',
  ]),

  // Localization
  titleText: resource.titleText,
  receivableIDText: resource.receivableIDText,
  invoiceIDText: resource.invoiceIDText,
  erpStatusText: resource.erpStatusText,
  erpStatusDateText: resource.erpStatusDateText,
  receivedAmountText: resource.receivedAmountText,
  receivedBaseAmountText: resource.receivedBaseAmountText,
  receivableAmountText: resource.receivableAmountText,
  receivableBaseAmountText: resource.receivableBaseAmountText,
  accountNameText: resource.accountNameText,
  documentDateText: resource.documentDateText,

  // View Properties
  id: 'erpreceivables_list',
  detailView: 'erpreceivables_detail',
  modelName: MODEL_NAMES.ERPRECEIVABLE,
  resourceKind: 'erpReceivables',
  allowSelection: true,
  enableActions: true,
  expose: true,
  security: 'Entities/ErpReceivable/View',
  insertSecurity: 'Entities/ErpReceivable/Add',

  // Card layout
  itemIconClass: 'fa fa-check-circle-o fa-2x',

  // Groups
  enableDynamicGroupLayout: true,
  groupsEnabled: true,
  entityName: 'ERPReceivable',

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('upper(ErpExtId) like "%${0}%" or upper(Account.AccountName) like "%${0}%" or upper(ErpInvoice.InvoiceNumber) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('icboe.Views.ERPReceivables.List', __class);
export default __class;
