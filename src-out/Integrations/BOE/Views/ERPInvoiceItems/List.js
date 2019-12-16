define('crm/Integrations/BOE/Views/ERPInvoiceItems/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'crm/Views/_MetricListMixin', 'crm/Views/_RightDrawerListMixin', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _List, _MetricListMixin2, _RightDrawerListMixin2, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _List2 = _interopRequireDefault(_List);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _Names2 = _interopRequireDefault(_Names);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('erpInvoiceItemsList');

  /**
   * @class crm.Integrations.BOE.Views.ERPInvoiceItems.List
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPInvoiceItems.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default], /** @lends crm.Integrations.BOE.Views.ERPInvoiceItems.List# */{
    itemTemplate: new Simplate(['<p class="listview-heading"><label class="group-label">{%: $$.productNameText %}</label> {%: $.ProductName %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.invoiceIdText %}</label> {%: $.ErpInvoice.InvoiceNumber %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.descriptionText %}</label> {%: $.Description %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.lineText %}</label> {%: $.ErpLineNumber %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.quantityText %}</label> {%: $.Quantity %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.priceText %}</label> {%: $.Price %}</p>', '{% if ($.ErpLineTotalAmount) { %}', '<p class="micro-text"> <label class="group-label">{%: $$.amountText %}</label> <strong>', '{% if (App.hasMultiCurrency() && $.ErpInvoice.CurrencyCode) { %}', '{%: crm.Format.multiCurrency($.ErpLineTotalAmount, $.ErpInvoice.CurrencyCode) %}', '{% } else { %}', '{%: crm.Format.currency($.ErpLineTotalAmount) %}', '{% } %}', '</strong></p>', '{% } %}']),

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
    modelName: _Names2.default.ERPINVOICEITEM,
    resourceKind: 'erpInvoiceItems',

    // Card layout
    itemIconClass: 'bullet-list',

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(ProductName) like "' + q + '%" or upper(ErpLineNumber) like "' + q + '%" or upper(Description) like "' + q + '%"';
    }
  });

  _lang2.default.setObject('crm.Views.ERPInvoiceItems.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});