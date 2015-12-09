import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
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
    '<h3>{%: $.Name %} | {%: $.Description %}</h3>',
    '<h4>',
    '{%: $.Family %}',
    '</h4>',
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
    return string.substitute('(upper(Name) like "${0}%" or upper(Family) like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.Product.List', __class);
export default __class;
