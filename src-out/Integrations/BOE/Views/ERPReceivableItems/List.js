define("crm/Integrations/BOE/Views/ERPReceivableItems/List", ["exports", "dojo/_base/declare", "dojo/_base/lang", "argos/List", "crm/Format", "crm/Views/_RightDrawerListMixin", "crm/Views/_MetricListMixin", "../../Models/Names", "argos/I18n"], function (_exports, _declare, _lang, _List, _Format, _RightDrawerListMixin2, _MetricListMixin2, _Names, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _List = _interopRequireDefault(_List);
  _Format = _interopRequireDefault(_Format);
  _RightDrawerListMixin2 = _interopRequireDefault(_RightDrawerListMixin2);
  _MetricListMixin2 = _interopRequireDefault(_MetricListMixin2);
  _Names = _interopRequireDefault(_Names);
  _I18n = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  var resource = (0, _I18n["default"])('erpReceivableItemsList');

  var __class = (0, _declare["default"])('crm.Integrations.BOE.Views.ERPReceivableItems.List', [_List["default"], _RightDrawerListMixin2["default"], _MetricListMixin2["default"]], {
    formatter: _Format["default"],
    itemTemplate: new Simplate(['<p class="listview-heading"><label class="group-label">{%: $$.lineNumberText %}</label> {%: $.ErpLineNumber %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.receivablesIdText %}</label> {%: $.ErpReceivable.ErpExtId %}</p>', '{% if ($.ErpInvoice && $.ErpInvoice.ErpExtId) { %}', '<p class="micro-text"><label class="group-label">{%: $$.invoiceIDText %}</label> {%: $.ErpInvoice.ErpExtId %}</p>', '{% } %}', '<p class="micro-text"><label class="group-label">{%: $$.productNameText %}</label> {%: $.ProductName %}</p>', '{% if ($.ErpLineTotalAmount) { %}', '<p class="micro-text"><label class="group-label">{%: $$.lineTotalText %}</label> ', '{% if (App.hasMultiCurrency() && $.ErpReceivable.CurrencyCode) { %}', '{%: $$.formatter.multiCurrency($.ErpLineTotalAmount, $.ErpReceivable.CurrencyCode) %}', '{% } else { %}', '{%: $$.formatter.currency($.ErpLineTotalAmount) %} ', '{% } %}</p>', '{% } %}']),
    // Localization
    titleText: resource.titleText,
    lineNumberText: resource.lineNumberText,
    receivablesIdText: resource.receivablesIdText,
    productNameText: resource.productNameText,
    lineTotalText: resource.lineTotalText,
    invoiceIDText: resource.invoiceIDText,
    // Card layout
    itemIconClass: 'confirm',
    // View Properties
    id: 'erpreceivable_items_list',
    modelName: _Names["default"].ERPRECEIVABLEITEM,
    resourceKind: 'erpReceivableItems',
    detailView: 'erpreceivableitems_detail',
    expose: false,
    allowSelection: true,
    enableActions: true,
    security: 'Entities/Receivable/View',
    insertSecurity: 'Entities/Receivable/Add',
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return "upper(ErpReceivable.ErpExtId) like \"%".concat(q, "%\" or upper(ErpInvoice.ErpExtId) like \"%").concat(q, "%\"");
    }
  });

  _lang["default"].setObject('icboe.Views.ERPReceivableItems.List', __class);

  var _default = __class;
  _exports["default"] = _default;
});