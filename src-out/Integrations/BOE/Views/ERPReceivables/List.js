define('crm/Integrations/BOE/Views/ERPReceivables/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'crm/Format', 'crm/Views/_RightDrawerListMixin', 'crm/Views/_MetricListMixin', 'crm/Views/_GroupListMixin', '../../Models/Names', 'argos/I18n', '../../Utility'], function (module, exports, _declare, _lang, _List, _Format, _RightDrawerListMixin2, _MetricListMixin2, _GroupListMixin2, _Names, _I18n, _Utility) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _List2 = _interopRequireDefault(_List);

  var _Format2 = _interopRequireDefault(_Format);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _GroupListMixin3 = _interopRequireDefault(_GroupListMixin2);

  var _Names2 = _interopRequireDefault(_Names);

  var _I18n2 = _interopRequireDefault(_I18n);

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

  var resource = (0, _I18n2.default)('erpReceivablesList');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPReceivables.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default, _GroupListMixin3.default], {
    formatter: _Format2.default,
    util: _Utility2.default,
    itemTemplate: new Simplate(['<p class="micro-text"><label class="group-label">{%: $$.receivableIDText %}</label> {%: $.ErpExtId %}</p>', '{% if ($.ErpInvoice && $.ErpInvoice.InvoiceNumber) { %}', '<p class="micro-text"><label class="group-label">{%: $$.invoiceIDText %}</label> {%: $.ErpInvoice.InvoiceNumber %}</p>', '{% } %}', '{% if ($.Account && $.Account.AccountName) { %}', '<p class="micro-text"><label class="group-label">{%: $$.accountNameText %}</label> {%: $.Account.AccountName %}</p>', '{% } %}', '<p class="micro-text"><label class="group-label">{%: $$.receivedBaseAmountText %}</label> ', '{%: $$.util.formatMultiCurrency($.ReceivedBaseAmount, $.BaseCurrencyCode) %}', '</p>', '<p class="micro-text"><label class="group-label">{%: $$.receivedAmountText %}</label> ', '{%: $$.util.formatMultiCurrency($.ReceivedAmount, $.CurrencyCode) %}', '</p>', '<p class="micro-text"><label class="group-label">{%: $$.receivableBaseAmountText %}</label> ', '{%: $$.util.formatMultiCurrency($.ReceivableBaseAmount, $.BaseCurrencyCode) %}', '</p>', '<p class="micro-text"><label class="group-label">{%: $$.receivableAmountText %}</label> ', '{%: $$.util.formatMultiCurrency($.ReceivableAmount, $.CurrencyCode) %}', '</p>', '<p class="micro-text"><label class="group-label">{%: $$.erpStatusText %}</label> {%: $.ErpStatus %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.erpStatusDateText %}</label> {%: $$.formatter.date($.ErpStatusDate) %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.documentDateText %}</label> {%: $$.formatter.date($.ErpDocumentDate) %}</p>']),

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
    modelName: _Names2.default.ERPRECEIVABLE,
    resourceKind: 'erpReceivables',
    allowSelection: true,
    enableActions: true,
    expose: true,
    security: 'Entities/ErpReceivable/View',
    insertSecurity: 'Entities/ErpReceivable/Add',

    // Card layout
    itemIconClass: 'confirm',

    // Groups
    enableDynamicGroupLayout: true,
    groupsEnabled: true,
    entityName: 'ERPReceivable',

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(ErpExtId) like "%' + q + '%" or upper(Account.AccountName) like "%' + q + '%" or upper(ErpInvoice.InvoiceNumber) like "%' + q + '%"';
    }
  });

  _lang2.default.setObject('icboe.Views.ERPReceivables.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});