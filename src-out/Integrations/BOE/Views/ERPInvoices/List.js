define('crm/Integrations/BOE/Views/ERPInvoices/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'crm/Action', 'crm/Format', 'argos/List', 'crm/Views/_GroupListMixin', 'crm/Views/_MetricListMixin', 'crm/Views/_RightDrawerListMixin', '../../Models/Names', '../../Utility', 'argos/I18n'], function (module, exports, _declare, _lang, _Action, _Format, _List, _GroupListMixin2, _MetricListMixin2, _RightDrawerListMixin2, _Names, _Utility, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Action2 = _interopRequireDefault(_Action);

  var _Format2 = _interopRequireDefault(_Format);

  var _List2 = _interopRequireDefault(_List);

  var _GroupListMixin3 = _interopRequireDefault(_GroupListMixin2);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _Names2 = _interopRequireDefault(_Names);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('erpInvoicesList');

  /**
   * @class crm.Integrations.BOE.Views.ERPInvoces.List
   *
   * @extends argos.List
   */
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPInvoices.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default, _GroupListMixin3.default], /** @lends crm.Integrations.BOE.Views.ERPInvoces.List# */{
    formatter: _Format2.default,
    util: _Utility2.default,
    // Templates
    itemTemplate: new Simplate(['{% if ($.Account && $.Account.AccountName) { %}', '<p class="listview-heading"><label class="group-label">{%: $$.accountText %}</label> {%: $.Account.AccountName %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.invoiceNumberText %}</label> {%: $.InvoiceNumber %}</p>', '{% } else { %}', '<p class="listview-heading"><label class="group-label">{%: $$.invoiceNumberText %}</label> {%: $.InvoiceNumber %}</p>', '{% } %}', '<p class="micro-text"><label class="group-label">{%: $$.statusText %}</label> {%: $.ErpStatus %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.statusDateText %}</label> {%: $$.formatStatusDate($) %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.termsText %}</label> {%: $.ErpPaymentTermId %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.ownerText %} </label>{%: $.Owner.OwnerDescription %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.extendedBaseAmountText %}</label> ', '{%: $$.util.formatMultiCurrency($.ErpExtendedBaseAmount, $.BaseCurrencyCode) %}', '</p>', '<p class="micro-text"><label class="group-label">{%: $$.extendedAmountText %}</label> ', '{%: $$.util.formatMultiCurrency($.ErpExtendedAmount, $.CurrencyCode) %}', '</p>', '<p class="micro-text"><label class="group-label">{%: $$.totalBaseAmountText %}</label> ', '{%: $$.util.formatMultiCurrency($.ErpTotalBaseAmount, $.BaseCurrencyCode) %}', '</p>', '<p class="micro-text"><label class="group-label">{%: $$.totalAmountText %}</label> ', '{%: $$.util.formatMultiCurrency($.GrandTotal, $.CurrencyCode) %}', '</p>', '<p class="micro-text"><label class="group-label">{%: $$.totalAmountText %}</label> ', '{%: $$.util.formatMultiCurrency($.GrandTotal, $.CurrencyCode) %}', '</p>', '<p class="micro-text"><label class="group-label">{%: $$.documentDateText %}</label> {%: $$.formatter.date($.ErpDocumentDate) %}</p>']),

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
    modelName: _Names2.default.ERPINVOICE,
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
        enabled: _Action2.default.hasProperty.bindDelegate(this, 'Account.$key'),
        fn: _Action2.default.navigateToEntity.bindDelegate(this, {
          view: 'account_detail',
          keyProperty: 'Account.$key',
          textProperty: 'Account.AccountName'
        })
      }]);
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(Account.AccountName) like "' + q + '%" or upper(InvoiceNumber) like "' + q + '%"';
    },
    formatStatusDate: function formatStatusDate(entry) {
      return entry && entry.ErpStatusDate ? this.formatter.relativeDate(entry.ErpStatusDate) : this.unknownText;
    }
  });

  _lang2.default.setObject('crm.Views.ERPInvoices.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});