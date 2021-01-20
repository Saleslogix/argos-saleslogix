define('crm/Integrations/BOE/Views/Products/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'crm/Format', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _List, _Format, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _List2 = _interopRequireDefault(_List);

  var _Format2 = _interopRequireDefault(_Format);

  var _Names2 = _interopRequireDefault(_Names);

  var _I18n2 = _interopRequireDefault(_I18n);

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

  var resource = (0, _I18n2.default)('productsList');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.Products.List', [_List2.default], {
    formatter: _Format2.default,
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
    modelName: _Names2.default.PRODUCT,
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
      return 'upper(Name) like "' + q + '%" or upper(Family) like "' + q + '%" or ActualId like "' + q + '%"';
    }
  });

  _lang2.default.setObject('icboe.Views.Products.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});