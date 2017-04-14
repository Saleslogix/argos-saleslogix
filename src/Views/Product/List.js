import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import List from 'argos/List';
import getResource from 'argos/I18n';

const resource = getResource('productList');

/**
 * @class crm.Views.Product.List
 *
 * @extends argos.List
 *
 * @requires crm.Format
 */
const __class = declare('crm.Views.Product.List', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: $.Name %} | {%: $.Description %}</p>',
    '<p class="micro-text">',
    '{%: $.Family %}',
    '</p>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'product_list',
  security: 'Entities/Product/View',
  queryOrderBy: 'Name',
  querySelect: [
    'Description',
    'Name',
    'Family',
    'Price',
    'Program',
    'FixedCost',
  ],
  resourceKind: 'products',

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `(upper(Name) like "${q}%" or upper(Family) like "${q}%")`;
  },
});

lang.setObject('Mobile.SalesLogix.Views.Product.List', __class);
export default __class;
