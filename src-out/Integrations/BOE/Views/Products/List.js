define("crm/Integrations/BOE/Views/Products/List", ["exports", "dojo/_base/declare", "dojo/_base/lang", "argos/List", "crm/Format", "../../Models/Names", "argos/I18n"], function (_exports, _declare, _lang, _List, _Format, _Names, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _List = _interopRequireDefault(_List);
  _Format = _interopRequireDefault(_Format);
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
  var resource = (0, _I18n["default"])('productsList');

  var __class = (0, _declare["default"])('crm.Integrations.BOE.Views.Products.List', [_List["default"]], {
    formatter: _Format["default"],
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.Name %}</p>', '{% if ($.Description) { %}', '<p class="micro-text">{%: $.Description %}</p>', '{% } %}', '{% if ($.Family) { %}', '<p class="micro-text"><label class="group-label">{%: $$.familyText %}</label> {%: $.Family %}</p>', '{% } %}', '{% if ($.Status) { %}', '<p class="micro-text"><label class="group-label">{%: $$.statusText %}</label> {%: $.Status %}</p>', '{% } %}', '{% if ($.Price) { %}', '<p class="micro-text"><label class="group-label">{%: $$.priceText %} </label>', '{% if (App.hasMultiCurrency() && $.CurrencyCode) { %}', '{%: $$.formatter.multiCurrency($.Price, $.CurrencyCode) %}', '{% } else { %}', '{%: $$.formatter.currency($.Price) %} ', '{% } %}</p>', '{% } %}']),
    // Localization
    titleText: resource.titleText,
    familyText: resource.familyText,
    statusText: resource.statusText,
    priceText: resource.priceText,
    // View Properties
    id: 'products_list',
    detailView: '',
    modelName: _Names["default"].PRODUCT,
    resourceKind: 'products',
    enableActions: false,
    expose: false,
    security: 'Entities/Product/View',
    insertSecurity: 'Entities/Product/Add',
    // Card layout
    itemIconClass: '',
    // Metrics
    entityName: 'Product',
    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {});
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return "upper(Name) like \"".concat(q, "%\" or upper(Family) like \"").concat(q, "%\" or ActualId like \"").concat(q, "%\"");
    }
  });

  _lang["default"].setObject('icboe.Views.Products.List', __class);

  var _default = __class;
  _exports["default"] = _default;
});