define('crm/Views/OpportunityProduct/List', ['module', 'exports', 'dojo/_base/declare', 'argos/List', 'argos/I18n'], function (module, exports, _declare, _List, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _List2 = _interopRequireDefault(_List);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  const resource = (0, _I18n2.default)('opportunityProductList'); /* Copyright 2017 Infor
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

  const __class = (0, _declare2.default)('crm.Views.OpportunityProduct.List', [_List2.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="micro-text">', '{% if ($.Product) { %} {%: $.Product.Family %} | {% } %}', '{%: $.Program %} | {%: crm.Format.currency($.Price) %}', '</p>', '<p class="micro-text">', '{%: $.Quantity %} x {%: crm.Format.currency($.CalculatedPrice) %} ', '({%: crm.Format.percent($.Discount) %}) = ', '<strong>', '{% if (App.hasMultiCurrency()) { %}', '{%: crm.Format.multiCurrency($.ExtendedPrice, App.getBaseExchangeRate().code) %}', '{% } else { %}', '{%: crm.Format.currency($.ExtendedPrice) %}', '{% } %}', '</strong>', '</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'opportunityproduct_list',
    security: 'Entities/Opportunity/View',
    detailView: 'opportunityproduct_detail',
    insertView: 'opportunityproduct_edit',
    queryOrderBy: 'Sort',
    querySelect: ['Product/Name', 'Product/Family', 'Program', 'Price', 'Discount', 'CalculatedPrice', 'Quantity', 'ExtendedPrice'],
    resourceKind: 'opportunityproducts',
    allowSelection: true,
    enableActions: true,

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      const q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return `(upper(Product.Name) like "${q}%" or upper(Product.Family) like "${q}%")`;
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});