import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import action from 'crm/Action';
import crmFormat from 'crm/Format';
import List from 'argos/List';
import _GroupListMixin from 'crm/Views/_GroupListMixin';
import _MetricListMixin from 'crm/Views/_MetricListMixin';
import _RightDrawerListMixin from 'crm/Views/_RightDrawerListMixin';
import MODEL_NAMES from '../../Models/Names';
import utility from '../../Utility';
import getResource from 'argos/I18n';

const resource = getResource('erpInvoicesList');

/**
 * @class crm.Integrations.BOE.Views.ERPInvoces.List
 *
 * @extends argos.List
 */
const __class = declare('crm.Integrations.BOE.Views.ERPInvoices.List', [List, _RightDrawerListMixin, _MetricListMixin, _GroupListMixin], /** @lends crm.Integrations.BOE.Views.ERPInvoces.List# */ {
  formatter: crmFormat,
  util: utility,
  // Templates
  itemTemplate: new Simplate([
    '{% if ($.Account && $.Account.AccountName) { %}',
    '<p class="listview-heading"><label class="group-label">{%: $$.accountText %}</label> {%: $.Account.AccountName %}</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.invoiceNumberText %}</label> {%: $.InvoiceNumber %}</p>',
    '{% } else { %}',
    '<p class="listview-heading"><label class="group-label">{%: $$.invoiceNumberText %}</label> {%: $.InvoiceNumber %}</p>',
    '{% } %}',
    '<p class="micro-text"><label class="group-label">{%: $$.statusText %}</label> {%: $.ErpStatus %}</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.statusDateText %}</label> {%: $$.formatStatusDate($) %}</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.termsText %}</label> {%: $.ErpPaymentTermId %}</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.ownerText %} </label>{%: $.Owner.OwnerDescription %}</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.extendedBaseAmountText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.ErpExtendedBaseAmount, $.BaseCurrencyCode) %}',
    '</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.extendedAmountText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.ErpExtendedAmount, $.CurrencyCode) %}',
    '</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.totalBaseAmountText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.ErpTotalBaseAmount, $.BaseCurrencyCode) %}',
    '</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.totalAmountText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.GrandTotal, $.CurrencyCode) %}',
    '</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.totalAmountText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.GrandTotal, $.CurrencyCode) %}',
    '</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.documentDateText %}</label> {%: $$.formatter.date($.ErpDocumentDate) %}</p>',
  ]),

  // Localization
  titleText: resource.titleText,
  invoiceNumberText: resource.invoiceNumberText,
  accountText: resource.accountText,
  descriptionText: resource.descriptionText,
  statusText: resource.statusText,
  termsText: resource.termsText,
  statusDateText: resource.statusDateText,
  ownerText: resource.ownerText,
  totalAmountText: resource.totalAmountText,
  totalBaseAmountText: resource.totalBaseAmountText,
  extendedAmountText: resource.extendedAmountText,
  extendedBaseAmountText: resource.extendedBaseAmountText,
  unknownText: resource.unknownText,
  viewAccountActionText: resource.viewAccountActionText,
  documentDateText: resource.documentDateText,

  // View Properties
  id: 'invoice_list',
  detailView: 'invoice_detail',
  modelName: MODEL_NAMES.ERPINVOICE,
  resourceKind: 'erpInvoices',
  allowSelection: true,
  enableActions: true,
  expose: true,
  security: 'Entities/ErpInvoice/View',
  insertSecurity: 'Entities/ErpInvoice/Add',

  // Card layout
  itemIconClass: 'document2',

  // Groups
  groupsEnabled: true,
  enableDynamicGroupLayout: true,
  entityName: 'ERPInvoice',

  createActionLayout: function createActionLayout() {
    return this.actions || (this.actions = [{
      id: 'viewAccount',
      label: this.viewAccountActionText,
      enabled: action.hasProperty.bindDelegate(this, 'Account.$key'),
      fn: action.navigateToEntity.bindDelegate(this, {
        view: 'account_detail',
        keyProperty: 'Account.$key',
        textProperty: 'Account.AccountName',
      }),
    }]);
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `upper(Account.AccountName) like "${q}%" or upper(InvoiceNumber) like "${q}%"`;
  },
  formatStatusDate: function formatStatusDate(entry) {
    return (entry && entry.ErpStatusDate) ? this.formatter.relativeDate(entry.ErpStatusDate) : this.unknownText;
  },
});

lang.setObject('crm.Views.ERPInvoices.List', __class);
export default __class;
