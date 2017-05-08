import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import List from 'argos/List';
import getResource from 'argos/I18n';

const resource = getResource('opportunityProductList');

/**
 * @class crm.Views.OpportunityProduct.List
 *
 * @extends argos.List
 *
 * @requires crm.Format
 */
const __class = declare('crm.Views.OpportunityProduct.List', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="micro-text">',
    '{% if ($.Product) { %} {%: $.Product.Family %} | {% } %}',
    '{%: $.Program %} | {%: crm.Format.currency($.Price) %}',
    '</p>',
    '<p class="micro-text">',
    '{%: $.Quantity %} x {%: crm.Format.currency($.CalculatedPrice) %} ',
    '({%: crm.Format.percent($.Discount) %}) = ',
    '<strong>',
    '{% if (App.hasMultiCurrency()) { %}',
    '{%: crm.Format.multiCurrency($.ExtendedPrice, App.getBaseExchangeRate().code) %}',
    '{% } else { %}',
    '{%: crm.Format.currency($.ExtendedPrice) %}',
    '{% } %}',
    '</strong>',
    '</p>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'opportunityproduct_list',
  security: 'Entities/Opportunity/View',
  detailView: 'opportunityproduct_detail',
  insertView: 'opportunityproduct_edit',
  queryOrderBy: 'Sort',
  querySelect: [
    'Product/Name',
    'Product/Family',
    'Program',
    'Price',
    'Discount',
    'CalculatedPrice',
    'Quantity',
    'ExtendedPrice',
  ],
  resourceKind: 'opportunityproducts',
  allowSelection: true,
  enableActions: true,

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `(upper(Product.Name) like "${q}%" or upper(Product.Family) like "${q}%")`;
  },
});

lang.setObject('Mobile.SalesLogix.Views.OpportunityProduct.List', __class);
export default __class;
